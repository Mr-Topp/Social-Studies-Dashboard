# AI grader for written answers

An hourly scheduled task reads new turn-ins in Fynn's "Class Turn-ins" Google Sheet, grades each student's
**written answers** 1–4 against the Iowa standard for that activity, and saves the grade inside the turn-in.
The teacher dashboard (`teacher-submissions/index.html`) reads it from there and counts it toward mastery right away.

The spreadsheet ID is given in the scheduled task's prompt. Use the **Google Sheets** connector.

## 1. Find turn-ins that need grading

The tab is `Turn-ins`. Row 1 is the header. Columns (current layout): Key | Turned in | Student | Class | Activity ID |
Activity | Kind | Page | Source | Answers. Always find the columns by header name, not by letter.

1. Read the header and the first two columns: `get_values` on `'Turn-ins'!A1:B`.
2. Candidates are rows turned in during the **last 21 days** (by "Turned in").
3. For each candidate, read its whole row (`'Turn-ins'!A{n}:J{n}`; batch nearby rows into one range). Check that the Key
   you read matches the Key from step 1. If not, rows have shifted: read A:B again and re-locate.
4. Skip grading a row when (it may still need the AI check in 3b):
   - Answers already has `"AI level"` or `"AI graded"`, or
   - Kind is not `turn-in` (for example `progress`), or
   - Answers does not parse as JSON.
5. If a row has **no student-written text** (only multiple choice, sequences, matches, scores), mark it so it's
   not checked again: add only `"AI graded":"no written answer"` (no level). The dashboard ignores that.

## 2. Work out what the student was asked and which standard it is

- The registry is `shared/assignments.js`: `CLASS_ASSIGNMENTS[activityId]` gives the title, the page (`path`) and the
  standards (`std`). `CLASS_STANDARDS` has the exact wording of each standard. If Answers has a `"Standard"` key, it wins.
- **Written answers** are free-text values the student typed, such as `reflection`, `Answer`, `U.S. connection`, keys
  that are the question itself (Great Hanoi Rat Hunt), or text inside the `checkN` entries of the WWII reading.
  If a key like `"Exit question"` holds the question, use it.
- **Use the saved question first.** Turn-ins from 2026-10-31 on include `"Questions on the page"` (the exact wording of every written question the student saw), and the WWII readings include `U.S. question:` inside each `checkN`. Grade against that wording.
- When the question text isn't in the turn-in, open the activity's page in the repo and find the label for the text box.
  **Questions change over time.** If the turn-in is older than the page's last change, find the wording that was live
  on the turn-in date with `git log -p --since/--until -- <folder>`. Known older wording (turn-ins before 2026-10-30):
  - WWI Alliance Chain Reaction `reflection`: "What made the war spread to more countries?"
  - Pacific Case Files `reflection`: "What is one way a country gained power?"
- Grade against what the lesson taught (the page's own reading, cases and facts), not outside knowledge.

## 3. Grade on Fynn's 1–4 scale

Give **one level per turn-in** for all of its written answers together.

| Level | Meaning |
|---|---|
| 4 | Everything a 3 has, plus stronger reasoning: accurate specific evidence and a connection or cause-and-effect beyond the basics. |
| 3 | Proficient. Accurate, answers what was asked, and **explains** (not just names), with at least one correct, specific detail from the lesson. |
| 2 | A right idea that is vague, incomplete (only part of the question), only names or lists without explaining, or has a real factual error. |
| 1 | Mostly incorrect, off-topic, blank, a word or two that shows no understanding, or not the student's own words. |

Rules:
- Spelling, grammar and capitalization never lower a grade. These are alternative high school students; short and
  plain is fine if it is accurate and explains.
- If the question has several parts (Hanoi has four), weigh all of them. Missing parts pull the level down.
- **Copied or AI work**: follow the AI check in 3b. Flag anything unsafe or inappropriate too.
- Be consistent: similar answers get the same level. Don't guess when the answer is ambiguous; grade what's on the page.

The reason is one short sentence for the teacher (under 120 characters), in plain words, saying what earned or cost
the level. No student names in the reason.

Also write **`"AI student feedback"`**: what the student will see on a card the next time they open an activity.
- Talk to the student ("You…"), at about a 12-year-old reading level, 1–2 short sentences, under 200 characters.
- First what they did well (specific), then **one** clear next step tied to the question (for a 4: one way to go further).
- Don't mention the level number, spelling, or other students. Be warm and direct, never sarcastic.
- **Never mention AI, a grader, a computer, or automatic grading.** Write it the way the teacher would say it.
- Example: "You explained why the French paid for rat tails. Next step: add what some people did to earn more money."
- Flagged (copied) work: leave `"AI student feedback"` out. The student card just says the teacher will talk with them.

## 3b. AI check (every turn-in with written answers)

Every turn-in with student-written text gets an AI check, including rows graded before this check existed.
A row needs the check when Answers has no `"AI checked"` key. Add `"AI checked":"YYYY-MM-DD"` when you check it.
For a row that already has `"AI level"` or `"Teacher level"`, add only `"AI checked"` (and `"AI flag"` if needed);
never change its level, reason or feedback.

Evidence to weigh (AI detectors are unreliable, so flag only on real evidence, and never on spelling or good writing alone):
1. **Pasted writing.** Turn-ins from 2026-11-02 on include `"Writing check"` (typed vs. pasted characters) and, when
   most of the writing was pasted, `"Pasted writing"`. Pasting from the page's own reading is not cheating; compare
   the pasted text to the lesson. Mostly pasted text that is NOT from the lesson is strong evidence.
2. **AI leftovers**: "As an AI", "Certainly!", "Here's a…", "I hope this helps", markdown headings or bullet lists,
   bolded labels, "In conclusion," a restated prompt, or text in a different language than the question.
3. **Style far beyond the student and the lesson**: polished essay voice, vocabulary the lesson never used
   ("multifaceted", "pivotal", "underscores", "a testament to"), em-dashes everywhere, perfect three-part lists,
   facts or names that are not in the lesson, or writing that is very different from this student's other turn-ins
   (look at their other rows in the sheet).

Decide:
- **Clear AI or copied work** (leftovers, or mostly pasted text that isn't from the lesson): level **1**,
  `"AI flag":"Likely AI or copied: <the evidence in a few words>. Talk with the student."`, no student feedback.
- **Possible AI** (style signs only, or partial pasting): grade it normally, add
  `"AI flag":"Possible AI: <the evidence in a few words>. Check with the student."`, and leave out
  `"AI student feedback"` so the student's card says the teacher wants to talk with them.
- **No real evidence**: no flag. Short, plain or misspelled answers are normal for these students.

The flag shows in the dashboard's "Possible AI or copied work" list. It is a reason to talk with the student, not a grade by itself.

## 3c. Spanish turn-ins

Some turn-ins come from the Spanish Sociology page (`sociology/espanol/`). They have `"Language":"Spanish"`, their
multiple-choice data is in English, and the written answers are usually in Spanish. Never write anything about the
student's background, language status, or country in the sheet.

- Grade Spanish writing exactly like English writing, on the same 1–4 scale. Writing in Spanish never lowers a grade.
- Grade against `"Questions on the page (English)"` when it's there (it's the English of the Spanish questions the student saw).
- AI check: writing in Spanish is never evidence by itself. Pasting from the page's own Spanish reading is lesson text.
- Add `"English translation"` to the Answers JSON: an object with one entry per student-written answer, same key as in
  Answers, value = a faithful English translation of what the student wrote (keep the student's meaning and mistakes; don't improve it).
  If the student wrote in English, skip that answer. The dashboard shows this next to the work.
- Write `"AI student feedback"` in simple Latin American Spanish (tú), same rules as English feedback.
  `"AI reason"` and `"AI flag"` stay in English for the teacher.

## 4. Save the grade (safely)

Rows can shift when new turn-ins arrive, so **never write by row number**. Use one `update_spreadsheet` call with a
`findReplace` request per turn-in, limited to the Answers column:

```json
{"findReplace": {"find": "<unique end of that Answers cell, ending with }>",
  "replacement": "<same text without the last }>,\"AI level\":\"3\",\"AI reason\":\"...\",\"AI student feedback\":\"...\",\"AI graded\":\"YYYY-MM-DD\"}",
  "matchCase": true, "matchEntireCell": false, "searchByRegex": false, "includeFormulas": false,
  "range": {"sheetId": <Turn-ins sheetId>, "startRowIndex": 1, "startColumnIndex": <Answers col index>, "endColumnIndex": <+1>}}}
```

- Pick a `find` that appears in **exactly one** Answers cell (check against every Answers cell you read; lengthen it
  until unique). Two cells that are completely identical may share one grade.
- Values are JSON strings: `"AI level":"3"`. Escape quotes in the reason with `json.dumps`. Add `"AI flag"` only when flagging.
- After the call, every reply must say `occurrencesChanged: 1` (or the count of identical cells). If one says 0,
  re-read and retry that one once. Never change anything else in the sheet.
- Get the sheetId once with `get_spreadsheet` and `fields: ["sheets.properties.sheetId","sheets.properties.title"]`.

## 5. Finish

End with one line: how many turn-ins were graded, how many were AI-checked, how many had no written answer, and any flags (activity and level,
no names). If nothing was new, say so in one line and stop.
