# Rules for working on Fynn's class site

## Locked: unit calendar and combined lesson days (Fynn decided 2026-11-02)

Do NOT change any of these without Fynn saying yes to that exact change in your current chat.
If you think the calendar doesn't fit, tell Fynn and ask with multiple-choice options. Don't "fix" it yourself.

- **Test dates stay on Fynn's green sheet.** World History Unit 1 test is **Thu 11/19** (not 11/17).
- **Core classes meet Monday–Thursday.** No-school days are in `CLASS_NO_SCHOOL` in `shared/assignments.js`
  (including Nov 2–3, Thanksgiving Nov 25–27, Wed Dec 2, winter break Dec 21–Jan 1, Jan 11, Jan 18).
- **Combined days (Fynn chose "keep test dates, combine days" over the other version):**
  - U.S. History Unit 3 = 5 days: Day 1 = Allies to Enemies + Fear at Home; Day 2 Korea; Day 3 Thirteen Days; Day 4 Vietnam; Day 5 Review + test (Thu 12/3)
  - Government Unit 3 (Judicial) = 3 days: Day 1 What is the judicial branch; Day 2 Judicial review; Day 3 review Blooket + test (Thu 12/3). **All Blookets go on summative days** (Fynn, 11-03)
  - Sociology Unit 3 = 7 days: Day 5 = Groups change how we act + Us vs. them; Day 6 review; Day 7 test (Thu 12/10)
  - World History Unit 2 = 9 days: Day 1 = Cold War + Containment; Day 2 = Control + Mao's China; Day 7 = Cambodia + Apartheid; Day 9 test (Thu 12/10)
- The four slide decks for those units are labeled to match ("DAY 1, PART 2", "Day 1 Exit Ticket (Part 2)", etc.).
- Where this lives: `CLASS_CALENDAR`, `CLASS_TODAY`, `CLASS_NO_SCHOOL` and activity `day:` numbers in `shared/assignments.js`;
  deck day `plan`s in `teacher-submissions/presentations.js`; day goals in `shared/targets.js`.

## Always: Test T. can skip everything (Fynn decided 2026-11-03)

Every student page (existing and anything new) must let the test student **"Test T."** skip through everything,
so Fynn can see all the content without playing it. Real students stay locked exactly as before.
- `shared/turnin.js` draws the 🧪 bar (Back · Skip · Answer it · Jump · Fill writing · Unlock all) when
  `window.classIsTestT()` is true (device set with `?teacher-test`, or the name "Test T.").
- Every game/reader must register a hook so Back/Skip/Jump/Answer work — see the comment block
  "TEST T. SKIP MODE" at the bottom of `shared/turnin.js`, and copy the pattern at the bottom of
  `us-history/u6-d1-superpower/game.js`. `shared/unit-game.js`, `shared/flip-reader.js` and
  `sociology/reading-reader.js` already do it.
- Behind `classIsTestT()` only: skip reading timers, wrong-answer locks, writing rules (length, keywords, blanks),
  and "finish everything first" gates. The shared writing check already passes Test T.
- Before delivering a new page, check it as Test T.: every screen reachable from the Jump list, no errors.

## Working with other chats

Fynn often has more than one chat working on this site at the same time. Before changing anything shared
(`shared/assignments.js`, `shared/turnin.js`, `index.html`, `teacher-submissions/`), pull first, read the latest
commits, and don't undo another chat's work unless Fynn says to.

## Locked: no grades and no student lookups on the student site (Fynn decided 2026-11-02)

Students see their grades in **PowerSchool**, not here. Fynn chose "no grades, no PINs."
- The student home page and activities never show levels, scores, first-try scores, or paper grades. A turned-in
  activity shows "✓ Turned in", the teacher's feedback tip, and a "Fix it" button when the work needs another try.
- Teacher Tools never sends grades, scores or answers to the public site, and never sends class lists (students type
  their name). **Changed by Fynn 2026-11-03 ("look up by name only"):** `my_work` returns, for the name a student
  types, only which activities that student turned in and which ones the teacher marked M (missing) or EX, so the
  student's to-do matches the teacher dashboard on any Chromebook. Fynn knows a kid could type a classmate's name and
  see that to-do list. Feedback cards are still reached only with the private receipt kept on the student's Chromebook.
- Never write a student's name, language status, background, or accommodations into any file here. This site is public.
- Grades, paper grades and EX stay on the teacher dashboard, behind the teacher code.
