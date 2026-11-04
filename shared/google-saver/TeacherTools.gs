/**
 * TEACHER TOOLS  (Google Apps Script)
 * Lets the teacher dashboard (1) change a student's grade on a turn-in and (2) edit a class list,
 * and (3) shows students their feedback card on their next activity (only for their own turn-ins),
 * and (4) feeds each student's own home page (their class list name + their own grades and what's missing),
 * and (5) saves links you add from the dashboard's To-do tab to fill in a lesson day that isn't made yet,
 * and (7) saves paper grades you type on the dashboard (paper columns, 1-4 / EX exempt / M missing) and "exempt everyone",
 * Students never see grades on the site (they use PowerSchool), so nothing about one student is ever sent out:
 * no grades, no class lists. Wrong teacher codes are limited, so nobody can sit and guess.
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
    // Student home page (the main Activities page): class list names, and one student's own work.
    if (body.action === "class_list") return json(classList(body));
    if (body.action === "my_work") return json(myWork(body));
    // Lets the update page check which version is running. Shares nothing.
    if (body.action === "version") return json({ ok: true, version: 10, can: ["links", "student-links", "paper", "no-grades", "student-todo", "online-grade", "name-caps"] });
  } catch (err) { return json({ ok: false, error: "Try again later." }); }
  var check = codeCheck(body.code);
  if (check === "locked") return json({ ok: false, error: "Too many wrong teacher codes. Wait 15 minutes, then try again." });
  if (check !== "ok") return json({ ok: false, error: "That teacher code didn't work." });
  try {
    if (body.action === "ping") return json({ ok: true });
    if (body.action === "set_grade") return json(setGrade(body));
    if (body.action === "set_roster") return json(setRoster(body));
    if (body.action === "set_link") return json(setLink(body));
    if (body.action === "paper_task") return json(setPaperTask(body));
    if (body.action === "marks") return json(setMarks(body));
    if (body.action === "col_exempt") return json(setColExempt(body));
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

// ---------- Links from the To-do tab ----------
// Saves one "link" row: a link you pasted to fill in a lesson day (course, unit, day). Newest row per link id wins,
// so "remove" just saves a newer row marked removed. The AI grader and students' pages skip these rows.
function setLink(b) {
  var course = String(b.course || "");
  if (COURSES.indexOf(course) < 0) return { ok: false, error: "Unknown class." };
  var id = clean(b.id, 40).replace(/[^a-z0-9-]/gi, "") || Utilities.getUuid().replace(/-/g, "").slice(0, 12);
  var remove = !!b.remove, url = clean(b.url, 500), title = clean(b.title, 120);
  var unit = parseInt(b.unit, 10) || 0, day = parseInt(b.day, 10) || 0, part = parseInt(b.part, 10) === 1 ? 1 : 2;
  if (!remove) {
    if (!/^https:\/\/\S+$/i.test(url)) return { ok: false, error: "Paste the whole link. It starts with https://" };
    if (!title) return { ok: false, error: "Give it a name." };
    if (!unit || !day) return { ok: false, error: "Missing the unit or day." };
  }
  withLock(function (sh) {
    var c = cols(sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]);
    var row = new Array(Object.keys(c).length).fill("");
    var now = new Date().toISOString();
    var set = function (k, v) { if (k in c) row[c[k]] = v; };
    set("Key", "link|" + course + "|" + id + "|" + now);
    set("Turned in", now); set("Student", "Teacher"); set("Class", course);
    set("Activity ID", "dashboard-link"); set("Activity", "Link added from the dashboard"); set("Kind", "link");
    set("Source", "teacher");
    set("Answers", JSON.stringify({ id: id, course: course, part: part, unit: unit, day: day, title: title, url: url, removed: remove }));
    sh.appendRow(row);
  });
  return { ok: true, id: id };
}

// ---------- Paper grades and exemptions (PowerSchool-style) ----------
// paper_task: adds or removes a paper column on a lesson day (one "paper-task" row; newest row per id wins).
// marks: what you type in a box. One "mark" row per student per activity, updated in place:
//   "1"-"4" = level (paper columns, or online work whose turn-in didn't save; Fynn 11-04), "EX" = exempt (any activity),
//   "M" = missing (paper columns), "" = clear.
// col_exempt: "Exempt everyone" for one activity in one class (one "col" row; newest row per activity wins).
// The AI grader skips all of these rows (Kind isn't "turn-in"). Students' pages only learn what's exempt.
var STD_OK = /^SS\.9-12\.(WH|US|Gov|Soc)\.\d+$/;
function cellText(v) { v = String(v); return /^[=+\-@]/.test(v) ? "'" + v : v; }
function teacherRow(c, key, course, actId, actTitle, kind, student, answers) {
  var width = Math.max.apply(null, Object.keys(c).map(function (k) { return c[k]; })) + 1;
  var row = new Array(width).fill(""), now = new Date().toISOString();
  var set = function (k, v) { if (k in c) row[c[k]] = v; };
  set("Key", key + "|" + now); set("Turned in", now); set("Student", student); set("Class", course);
  set("Activity ID", actId); set("Activity", cellText(actTitle)); set("Kind", kind); set("Type", kind);
  set("Source", "teacher"); set("Answers", JSON.stringify(answers));
  return row;
}
function setPaperTask(b) {
  var course = String(b.course || "");
  if (COURSES.indexOf(course) < 0) return { ok: false, error: "Unknown class." };
  var id = clean(b.id, 40).replace(/[^a-z0-9]/gi, "").toLowerCase() || Utilities.getUuid().replace(/-/g, "").slice(0, 12);
  var remove = !!b.remove, title = clean(b.title, 100);
  var unit = parseInt(b.unit, 10) || 0, day = parseInt(b.day, 10) || 0, part = parseInt(b.part, 10) === 1 ? 1 : 2;
  var std = (Array.isArray(b.std) ? b.std : []).map(function (x) { return String(x); }).filter(function (x) { return STD_OK.test(x); }).slice(0, 8);
  if (!remove) {
    if (!title) return { ok: false, error: "Give the paper a name." };
    if (!unit || !day) return { ok: false, error: "Pick the unit and day." };
  }
  withLock(function (sh) {
    var c = cols(sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]);
    sh.appendRow(teacherRow(c, "paper-task|" + course + "|" + id, course, "paper-task", "Paper column added from the dashboard", "paper-task", "Teacher",
      { id: id, course: course, part: part, unit: unit, day: day, title: title, std: std, removed: remove }));
  });
  return { ok: true, id: id };
}
function setMarks(b) {
  var course = String(b.course || "");
  if (COURSES.indexOf(course) < 0) return { ok: false, error: "Unknown class." };
  var items = (Array.isArray(b.items) ? b.items : []).slice(0, 300).map(function (x) {
    return { act: clean(x.activity, 80), student: clean(x.student, 40), value: String(x.value == null ? "" : x.value).trim().toUpperCase(), title: clean(x.title, 120) };
  });
  for (var k = 0; k < items.length; k++) {
    var it = items[k], paper = /^paper-[a-z0-9]{1,40}$/.test(it.act);
    if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(it.act) || !it.student) return { ok: false, error: "Missing the student or activity." };
    if (!(it.value === "" || it.value === "EX" || /^[1-4]$/.test(it.value) || (paper && it.value === "M"))) return { ok: false, error: "Type 1-4, EX or M." };
  }
  var saved = [];
  withLock(function (sh) {
    var data = sh.getDataRange().getValues(), c = cols(data[0]);
    var kindCol = ("Kind" in c) ? c["Kind"] : c["Type"], at = {};
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][kindCol]) !== "mark" || String(data[i][c["Class"]]).trim() !== course) continue;
      at[String(data[i][c["Activity ID"]]) + "|" + String(data[i][c["Student"]]).trim()] = i;
    }
    var add = [], today = new Date().toISOString().slice(0, 10);
    items.forEach(function (it) {
      var a = { Mark: "", "Teacher graded": today };
      if (/^[1-4]$/.test(it.value)) a["Teacher level"] = it.value; else a.Mark = it.value;
      var i = at[it.act + "|" + it.student];
      if (i != null) {
        var old; try { old = JSON.parse(String(data[i][c["Answers"]] || "{}")); } catch (e) { old = {}; }
        delete old["Teacher level"]; old.Mark = a.Mark; old["Teacher graded"] = today;
        if (a["Teacher level"]) old["Teacher level"] = a["Teacher level"];
        sh.getRange(i + 1, c["Answers"] + 1).setValue(JSON.stringify(old));
        var t = data[i][c["Turned in"]]; saved.push({ activity: it.act, student: it.student, at: t instanceof Date ? t.toISOString() : String(t) });
      } else if (it.value) {
        var row = teacherRow(c, "mark|" + course + "|" + it.act + "|" + it.student, course, it.act, it.title || it.act, "mark", cellText(it.student), a);
        add.push(row); at[it.act + "|" + it.student] = -1;
        saved.push({ activity: it.act, student: it.student, at: row[c["Turned in"]] });
      }
    });
    if (add.length) sh.getRange(sh.getLastRow() + 1, 1, add.length, add[0].length).setValues(add);
  });
  return { ok: true, saved: saved };
}
function setColExempt(b) {
  var course = String(b.course || ""), act = clean(b.activity, 80);
  if (COURSES.indexOf(course) < 0) return { ok: false, error: "Unknown class." };
  if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(act)) return { ok: false, error: "Missing the activity." };
  withLock(function (sh) {
    var c = cols(sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]);
    sh.appendRow(teacherRow(c, "col|" + course + "|" + act, course, "col-setting", "Exempt everyone (dashboard)", "col", "Teacher",
      { activity: act, exempt: !!b.exempt }));
  });
  return { ok: true };
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
            // No level number goes to students. "fix" only says whether to offer the Fix it button (level 1 or 2).
      items.push({ token: tokens[k], who: shortName(data[i][c["Student"]]), title: String(data[i][c["Activity"]] || ""), graded: !!level, fix: !flagged && +level <= 2, flagged: flagged, feedback: flagged ? "" : fb });
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

// ---------- Student home page ----------
// class_list: just the names on the newest class list (first name + last initial), so students can tap theirs.
// my_work: one student's turn-ins in one class (grade, first-try score, the student-facing feedback sentence),
// plus which activities anyone in the class has turned in (ids only, no names) so the page knows what's due.
// Never returns other students' answers, the teacher's reasons, or anything about how a grade was made.
function shortName(raw) {
  var words = String(raw || "").replace(/[^A-Za-zÀ-ɏ'.\- ]/g, " ").trim().split(/\s+/).filter(function (w) { return w; });
  if (!words.length) return "";
  var first = words[0].replace(/\.+$/, ""); first = first.charAt(0).toUpperCase() + first.slice(1);
  if (words.length === 1) return first;
  var last = words[words.length - 1].replace(/[^A-Za-zÀ-ɏ]/g, "");
  return last ? first + " " + last.charAt(0).toUpperCase() + "." : first;
}
function firstKey(n) { return String(n || "").split(" ")[0].toLowerCase().replace(/[^a-zÀ-ɏ]/g, ""); }
function initialOf(n) { var p = String(n || "").trim().split(/\s+/); return p.length > 1 ? p[p.length - 1].replace(/[^A-Za-z]/g, "").charAt(0).toLowerCase() : ""; }
function courseRows(course) {
  var data = sheet().getDataRange().getValues(), c = cols(data[0]);
  var kindCol = ("Kind" in c) ? c["Kind"] : c["Type"];
  var roster = [], rosterAt = -1, rows = [], links = {}, pins = {}, colEx = {}, exempt = {}, papers = {}, marks = {};
  for (var i = 1; i < data.length; i++) {
    var r = data[i];
    if (String(r[c["Class"]]).trim() !== course) continue;
    var id = String(r[c["Activity ID"]] || "").trim();
    var when = r[c["Turned in"]] instanceof Date ? r[c["Turned in"]].getTime() : new Date(r[c["Turned in"]]).getTime();
    var a; try { a = JSON.parse(String(r[c["Answers"]] || "{}")); } catch (e) { a = {}; }
    if (id === "class-roster") {
      if ((when || 0) >= rosterAt && Array.isArray(a.students)) {
        rosterAt = when || 0; roster = a.students.map(shortName).filter(function (n) { return n; });
        pins = {}; var p = (a.pins && typeof a.pins === "object") ? a.pins : {};
        Object.keys(p).forEach(function (n) { if (/^\d{4}$/.test(String(p[n]))) pins[shortName(n)] = String(p[n]); });
      }
      continue;
    }
    var kind = kindCol == null ? "turn-in" : String(r[kindCol] || "turn-in");
    if (kind === "link") { if (a && a.id) links[a.id] = a; continue; }   // rows are in time order, so the newest wins
    if (kind === "col") { if (a && a.activity) colEx[a.activity] = !!a.exempt; continue; }
    if (kind === "mark") { var who = shortName(r[c["Student"]]); exempt[id + "|" + who] = a.Mark === "EX"; marks[id + "|" + who] = a; continue; }
    if (kind === "paper-task") { if (a && a.id) papers[a.id] = a; continue; }
    if (kind === "progress" || kind === "roster" || !id) continue;
    rows.push({ name: shortName(r[c["Student"]]), id: id, at: isNaN(when) ? "" : new Date(when).toISOString(), a: a });
  }
  var exAll = Object.keys(colEx).filter(function (k) { return colEx[k]; });
  // Paper columns still in use (name + day only), so students' pages can show their paper grades on that day.
  var paperCols = Object.keys(papers).map(function (k) { return papers[k]; }).filter(function (p) { return !p.removed; })
    .map(function (p) { return { id: "paper-" + p.id, part: +p.part === 1 ? 1 : 2, unit: +p.unit || 0, day: +p.day || 0, title: String(p.title || "") }; });
  return { roster: roster, rows: rows, links: links, pins: pins, exemptAll: exAll, exempt: exempt, paperCols: paperCols, marks: marks };
}
function classList(b) {
  var course = String(b.course || "");
  if (COURSES.indexOf(course) < 0) return { ok: false, error: "Unknown class." };
  var d = courseRows(course);
  // Links you added from the To-do tab, so they show on students' home pages too.
  // Answer keys and summatives are never sent to students.
  var links = Object.keys(d.links).map(function (k) { return d.links[k]; }).filter(function (l) {
    return !l.removed && /^https:\/\//i.test(String(l.url || "")) && !/answer key|teacher key|summative/i.test(String(l.title || ""));
  }).map(function (l) { return { id: String(l.id), part: +l.part === 1 ? 1 : 2, unit: +l.unit || 0, day: +l.day || 0, title: String(l.title), url: String(l.url) }; });
  // Names are NOT sent, so no class list is ever public. Students type their own name.
  return { ok: true, names: [], links: links, exemptAll: d.exemptAll, paperCols: d.paperCols };
}
function myWork(b) {
  // Fynn 11-03 (replaces the 11-02 "no student lookups" rule): a student picks their name and gets ONLY their own
  // to-do facts: which activities they turned in, which ones you marked M (missing) or EX. Never grades, scores or answers.
  var course = String(b.course || "");
  if (COURSES.indexOf(course) < 0) return { ok: false, error: "Unknown class." };
  var d = courseRows(course), done = {};
  d.rows.forEach(function (r) { done[r.id] = true; });
  var me = shortName(b.name), mine = {}, missing = {}, exempt = {};
  if (me) {
    var meFirst = firstKey(me), meInit = initialOf(me);
    // A first name alone and the same first name + last initial count as one student, and capitals don't matter
    // ("JORDAN M." = "Jordan M.") -- same rule as the teacher dashboard (Fynn, 11-04).
    var same = function (n) {
      n = shortName(n);
      if (!n || firstKey(n) !== meFirst) return false;
      var nInit = initialOf(n);
      return !nInit || !meInit || nInit === meInit;
    };
    d.rows.forEach(function (r) { if (same(r.name)) mine[r.id] = true; });
    Object.keys(d.marks).forEach(function (k) {
      var cut = k.lastIndexOf("|"), id = k.slice(0, cut), who = k.slice(cut + 1), m = d.marks[k] || {};
      if (!same(who)) return;
      if (/^[1-4]$/.test(String(m["Teacher level"] || ""))) mine[id] = true;   // you graded it by hand: shows "✓ Turned in" (no grade sent)
      if (m.Mark === "M") missing[id] = true; else delete missing[id];
      if (m.Mark === "EX") exempt[id] = true; else delete exempt[id];
    });
  }
  return { ok: true, items: [], classDone: Object.keys(done), exemptAll: d.exemptAll || {}, noGrades: true,
           mine: Object.keys(mine), missing: Object.keys(missing).filter(function (id) { return !mine[id]; }), exempt: Object.keys(exempt) };
}

// Wrong-code limits (see codeCheck below).
var CODE_LIMIT = 10, LOCK_SECS = 900;

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
function codeCheck(code) {
  var cache = CacheService.getScriptCache(), fails = Number(cache.get("codefail") || 0);
  if (fails >= CODE_LIMIT) return "locked";
  if (codeOk(code)) return "ok";
  cache.put("codefail", String(fails + 1), LOCK_SECS);
  return "bad";
}
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
