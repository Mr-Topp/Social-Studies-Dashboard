/**
 * TEACHER TOOLS  (Google Apps Script)
 * Lets the teacher dashboard (1) change a student's grade on a turn-in and (2) edit a class list.
 * It edits the "Class Turn-ins" Google Sheet. It does not replace or touch the turn-in saver script.
 *
 * SETUP (one time, about 5 minutes) — also shown step by step at teacher-submissions/setup-teacher-tools.html
 *  1. Signed in to your school Google account, go to script.google.com and click "New project".
 *  2. Delete what's there, paste this whole file, click Save. Name the project "Teacher Tools".
 *  3. Project Settings (gear icon) > Script Properties > Add script property:
 *        Property: TEACHER_CODE     Value: the same code you type into the dashboard
 *  4. Deploy > New deployment > type "Web app".   Execute as: Me    Who has access: Anyone
 *     Click Deploy, allow access, and copy the Web app URL (ends in /exec). Send it to Claude.
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

// ---------- Helpers ----------
function sheet() { return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME); }
function cols(header) { var c = {}; header.forEach(function (h, i) { c[String(h).trim()] = i; }); return c; }
function withLock(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { fn(sheet()); } finally { lock.releaseLock(); }
}
function codeOk(code) {
  var real = PropertiesService.getScriptProperties().getProperty("TEACHER_CODE");
  return !!real && String(code || "").trim() === String(real).trim();
}
function clean(v, max) { return String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
