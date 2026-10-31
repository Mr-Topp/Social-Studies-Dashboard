/**
 * TEACHER TOOLS  (Google Apps Script)
 * Lets the teacher dashboard (1) change a student's grade on a turn-in and (2) edit a class list,
 * and (3) shows students their feedback card on their next activity (only for their own turn-ins).
 * It edits the "Class Turn-ins" Google Sheet. It does not replace or touch the turn-in saver script.
 *
 * SETUP (one time, about 5 minutes) — also shown step by step at teacher-submissions/setup-teacher-tools.html
 *  1. Signed in to your school Google account, go to script.google.com and click "New project".
 *  2. Delete what's there, paste this whole file, click Save. Name the project "Teacher Tools".
 *  3. Deploy > New deployment > type "Web app".   Execute as: Me    Who has access: Anyone
 *     Click Deploy, allow access, and copy the Web app URL (ends in /exec). Send it to Claude.
 *  (Your teacher code is checked against your turn-in saver, so there's nothing else to set up.)
 *
 * If you ever edit this script: Deploy > Manage deployments > pencil > Version: New version > Deploy (same URL).
 */

var SPREADSHEET_ID = "1CYUhw9DAZSUP55WBfnGYkHt3HIhLfVFInGlCdmObZEs";
var SHEET_NAME = "Turn-ins";
var COURSES = ["us-history", "world-history", "sociology", "government", "civics"];

function doGet() {
  return json({ ok: true, message: "Teacher tools are running." });
}

function doPost(e) {
  var body;
  try { body = JSON.parse((e && e.postData && e.postData.contents) || "{}"); }
  catch (err) { return json({ ok: false, error: "Bad request." }); }
  // Students' feedback cards: no teacher code, but a student can only reach a turn-in with its private receipt.
  try {
    if (body.action === "feedback") return json(feedback(body));
    if (body.action === "seen") return json(seen(body));
  } catch (err) { return json({ ok: false, error: "Try again later." }); }
  if (!codeOk(body.code)) return json({ ok: false, error: "That teacher code didn't work." });
  try {
    if (body.action === "ping") return json({ ok: true });
    if (body.action === "set_grade") return json(setGrade(body));
    if (body.action === "set_roster") return json(setRoster(body));
    return json({ ok: false, error: "Unknown request." });
  } catch (err) {
    return json({ ok: false, error: "The sheet had a problem. Try again in a minute." });
  }
}

// ---------- Change a grade ----------
// Finds the turn-in by its time, activity and the name exactly as the student typed it,
// then saves "Teacher level" (1-4) and an optional note into its Answers. Level "" clears it.
function setGrade(b) {
  var level = String(b.level == null ? "" : b.level).trim();
  if (level && !/^[1-4]$/.test(level)) return { ok: false, error: "Pick a level from 1 to 4." };
  var when = new Date(b.submittedAt).getTime();
  if (isNaN(when) || !b.assignmentId || !b.studentName) return { ok: false, error: "Missing turn-in details." };
  var result = { ok: false, error: "Couldn't find that turn-in. Refresh and try again." };
  withLock(function (sh) {
    var data = sh.getDataRange().getValues(), c = cols(data[0]);
    for (var i = 1; i < data.length; i++) {
      var r = data[i];
      if (String(r[c["Activity ID"]]) !== String(b.assignmentId)) continue;
      if (String(r[c["Student"]]).trim() !== String(b.studentName).trim()) continue;
      var t = r[c["Turned in"]] instanceof Date ? r[c["Turned in"]].getTime() : new Date(r[c["Turned in"]]).getTime();
      if (t !== when) continue;
      var a; try { a = JSON.parse(String(r[c["Answers"]] || "{}")); } catch (e) { return; }
      if (level) {
        a["Teacher level"] = level;
        a["Teacher note"] = clean(b.note, 300);
        a["Teacher graded"] = new Date().toISOString().slice(0, 10);
      } else {
        delete a["Teacher level"]; delete a["Teacher note"]; delete a["Teacher graded"];
      }
      sh.getRange(i + 1, c["Answers"] + 1).setValue(JSON.stringify(a));
      result = { ok: true };
      return;
    }
  });
  return result;
}

// ---------- Edit a class list ----------
// Adds a new "roster" row; the dashboard uses the newest list for each class.
function setRoster(b) {
  var course = String(b.course || "");
  if (COURSES.indexOf(course) < 0) return { ok: false, error: "Unknown class." };
  var names = (b.students || []).map(function (n) { return clean(n, 40); }).filter(function (n) { return n; });
  if (names.length > 60) return { ok: false, error: "That list is too long." };
  withLock(function (sh) {
    var c = cols(sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]);
    var row = new Array(Object.keys(c).length).fill("");
    var now = new Date().toISOString();
    var set = function (k, v) { if (k in c) row[c[k]] = v; };
    set("Key", "roster|" + course + "|" + now);
    set("Turned in", now); set("Student", "Teacher"); set("Class", course);
    set("Activity ID", "class-roster"); set("Activity", "Class list"); set("Kind", "roster");
    set("Source", "teacher"); set("Answers", JSON.stringify({ students: names }));
    sh.appendRow(row);
  });
  return { ok: true, count: names.length };
}

// ---------- Student feedback cards ----------
// Returns only level + the student-facing sentence for turn-ins whose private Receipt matches.
function feedback(b) {
  var tokens = (b.tokens || []).map(String).filter(function (t) { return /^[a-f0-9]{32}$/.test(t); }).slice(0, 40);
  if (!tokens.length) return { ok: true, items: [] };
  var sh = sheet(), data = sh.getDataRange().getValues(), c = cols(data[0]), items = [];
  for (var i = 1; i < data.length && items.length < tokens.length; i++) {
    var cell = String(data[i][c["Answers"]] || "");
    for (var k = 0; k < tokens.length; k++) {
      if (cell.indexOf(tokens[k]) < 0) continue;
      var a; try { a = JSON.parse(cell); } catch (e) { break; }
      if (a.Receipt !== tokens[k]) break;
      var t = /^[1-4]$/.test(String(a["Teacher level"] || "")) ? String(a["Teacher level"]) : "";
      var level = t || (/^[1-4]$/.test(String(a["AI level"] || "")) ? String(a["AI level"]) : "");
      var flagged = !t && !!a["AI flag"];
      var fb = t ? (a["Teacher note"] ? String(a["Teacher note"]) : String(a["AI student feedback"] || "")) : String(a["AI student feedback"] || "");
      items.push({ token: tokens[k], title: String(data[i][c["Activity"]] || ""), graded: !!level, level: flagged ? "" : level, flagged: flagged, feedback: flagged ? "" : fb });
      break;
    }
  }
  return { ok: true, items: items };
}
// Marks that the student saw their feedback (shown on the teacher dashboard).
function seen(b) {
  var token = String(b.token || "");
  if (!/^[a-f0-9]{32}$/.test(token)) return { ok: false };
  var ok = false;
  withLock(function (sh) {
    var data = sh.getDataRange().getValues(), c = cols(data[0]);
    for (var i = 1; i < data.length; i++) {
      var cell = String(data[i][c["Answers"]] || "");
      if (cell.indexOf(token) < 0) continue;
      var a; try { a = JSON.parse(cell); } catch (e) { return; }
      if (a.Receipt !== token) continue;
      if (!a["Student saw feedback"]) { a["Student saw feedback"] = new Date().toISOString().slice(0, 10); sh.getRange(i + 1, c["Answers"] + 1).setValue(JSON.stringify(a)); }
      ok = true; return;
    }
  });
  return { ok: ok };
}

// ---------- Helpers ----------
function sheet() { return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME); }
function cols(header) { var c = {}; header.forEach(function (h, i) { c[String(h).trim()] = i; }); return c; }
function withLock(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { fn(sheet()); } finally { lock.releaseLock(); }
}
// Checks the teacher code. If you set a TEACHER_CODE script property it uses that; otherwise it asks your
// turn-in saver whether the code works (so there's nothing to type in here). Remembered for 30 minutes.
var SAVER_URL = "https://script.google.com/macros/s/AKfycbwWV93yudtLuny7OwiCluP5nyF7OZ4lJ5c7RBD1vDTYl_ezOYFAXx00XJLctKTdzZmENw/exec";
function codeOk(code) {
  code = String(code || "").trim();
  if (!code) return false;
  var real = PropertiesService.getScriptProperties().getProperty("TEACHER_CODE");
  if (real) return code === String(real).trim();
  var key = "ok_" + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, code)).slice(0, 40);
  var cache = CacheService.getScriptCache();
  if (cache.get(key) === "1") return true;
  try {
    var res = UrlFetchApp.fetch(SAVER_URL, { method: "post", contentType: "text/plain", payload: JSON.stringify({ action: "list", code: code }), muteHttpExceptions: true, followRedirects: true });
    var ok = !!JSON.parse(res.getContentText()).ok;
    if (ok) cache.put(key, "1", 1800);
    return ok;
  } catch (e) { return false; }
}
function clean(v, max) { return String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
