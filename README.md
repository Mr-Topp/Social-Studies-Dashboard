# Social Studies Activities

Classroom websites for U.S. History, World History, Sociology, Government, and Civics (Linn-Mar · Compass Alternative Center).

- **Student home page:** https://mr-topp.github.io/Social-Studies-Dashboard/ (students pick their class and type their name)
- **Teacher dashboard:** https://mr-topp.github.io/Social-Studies-Dashboard/teacher-submissions/ (one code, a tab per class, plus a To-do tab)
- **All activities list:** https://mr-topp.github.io/Social-Studies-Dashboard/all.html

## Where things live

| What | File |
|---|---|
| Every activity, its class, unit, day, and standards | `shared/assignments.js` |
| Unit names, green-sheet calendar, no-school days | `shared/assignments.js` (top of file) |
| Slide decks for each unit | `teacher-submissions/presentations.js` |
| Daily "I can" goals | `shared/targets.js` |
| Videos on lesson days (teacher dashboard only) | `teacher-submissions/videos.js`, `part1-schoology.js`, `video-order.js`, `video-channels.js` |
| Turning in work | `shared/turnin.js` |
| Google Sheet saver + Teacher Tools (Apps Script) | `shared/google-saver/` |

Class pages are in `us-history/`, `world-history/`, `sociology/`, and `civics/` (Government + Civics).
Older World History pages (Unit 1 World Wars, e.g. `day7-maus/`, `pacific-case-files/`) sit at the top level.
Leave them there: their links are already posted in Schoology.

## Adding an activity

Every activity that turns in work uses `shared/turnin.js`. The address of the Google Sheet saver is at the top of that file.
To put a new activity on the dashboard, add one line to `shared/assignments.js`. See `CLAUDE.md` for the locked rules.

The teacher code is stored in the Apps Script's settings, never in this public site.

**Never write a student's name or background into any file here: this site is public.**
