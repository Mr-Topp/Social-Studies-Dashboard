// List of every activity that turns work in, and which class it belongs to.
// The teacher dashboard uses this to put each turn-in under the right tab,
// grouped by unit and sorted by day (matching the Schoology day posts).
// To add a new activity: copy one line, change the id, title, course, unit, day, and path (its folder).
// course must be one of: "us-history", "world-history", "sociology", "government", "civics"
window.CLASS_COURSES = {
  "us-history":    "U.S. History",
  "world-history": "World History",
  "sociology":     "Sociology",
  "government":    "Government",
  "civics":        "Civics"
};

// Unit names for each class (same order and numbers as the Schoology unit pages).
window.CLASS_UNITS = {
  "us-history": {
    1: "Roaring 20s & the Great Depression",
    2: "World War II",
    3: "The Cold War",
    4: "Civil Rights",
    5: "Rise of Conservatism",
    6: "Modern America"
  },
  "world-history": {
    1: "Imperialism & the World Wars (1800–1945)",
    2: "Cold War & Decolonization",
    3: "The World Since 1991"
  },
  "sociology": {
    1: "Foundations, Perspectives & Methods",
    2: "Culture, Institutions & Society",
    3: "Socialization, the Self & Groups",
    4: "Stratification & Inequality"
  },
  "government": {
    1: "Foundations of the U.S. Constitution",
    2: "Political Beliefs, Linkage Institutions & Citizenship",
    3: "Judicial Branch",
    4: "Legislative Branch",
    5: "Executive Branch",
    6: "Checks & Balances and Iowa Government"
  },
  "civics": {
    1: "Founders' Files (Civics Test Q1–15)",
    2: "How the Government Works (Q16–62)",
    3: "Rights & Responsibilities (Q63–72)",
    4: "The 1776 Files (Q73–89)",
    5: "Civil War to Modern America (Q90–118)",
    6: "Symbols & Holidays (Q119–128)",
    7: "Iowa Civics Exam (Summative)"
  }
};

// Part 1 units (the first half of the course). Kept separate so the current Unit 1–6 numbers stay the same.
window.CLASS_UNITS_PART1 = {
  "us-history": {
    1: "Founding & Citizenship",
    2: "Civil War & Reconstruction",
    3: "Westward & Industrial Expansion",
    4: "Progressive Era"
  },
  "world-history": {
    1: "Exploration & Global Trade",
    2: "Expanding Empires",
    3: "Renaissance, Reformation & New Ideas",
    4: "Revolutions & Industrialization"
  }
};

// Fynn's green sheet: how many days each unit runs and the date of its LAST day.
// The last day of every unit is the SUMMATIVE (test) day, even when the test isn't made yet.
// The dashboard shows that date on the summative row and puts red "not made yet" notes on anything missing.
// Where each class really is, pinned by Fynn. The student home page shows that day as "Today" and
// moves forward evenly (weekdays only) to the unit's test date on the green sheet below.
// To re-pin: change unit/day and set date to the day it's true (e.g. Fynn says "Gov is on Day 7").
// 2026-11-02: everyone is on Unit 1 Day 5. Nov 2-3 are no-school days, so Day 5 is Wed Nov 4.
window.CLASS_TODAY = {
  "us-history":    { unit: 1, day: 5, date: "2026-11-04" },
  "world-history": { unit: 1, day: 5, date: "2026-11-04" },
  "sociology":     { unit: 1, day: 5, date: "2026-11-04" },
  "government":    { unit: 1, day: 5, date: "2026-11-04" }
};

// Work Fynn counts as DONE for every student on the student home page (shows "✓ Done", never "missing").
//   unit + throughDay: everything in that unit up to and including that day (and earlier units) is done.
//   ids: specific activities that are done for everyone.
//   label: what the student sees instead of "✓ Done". With a label, the teacher dashboard also shows it like
//          CLASS_DONE_FOR_ALL below (✓ + label, counts as done, no score; overrides EX). Paper columns are never touched.
// This only changes what students see as missing. It doesn't add grades or turn-ins to the teacher dashboard.
window.CLASS_CLEARED = {
  // Fynn 11-03: these show "Completed in class" on the student page AND the teacher dashboard (✓, counts as done, no score),
  // same as World History's Divide Africa, so the whole page matches. U.S. History Unit 1 was exempt before; now Completed in class.
  "us-history":    { unit: 1, throughDay: 4, label: "Completed in class" },
  "sociology":     { unit: 1, throughDay: 4, label: "Completed in class" },
  "government":    { unit: 1, throughDay: 4, label: "Completed in class" },
  "world-history": { ids: ["divide-africa-day1"], label: "Completed in class" },  // Scramble for Africa: everyone did it
  "civics":        { ids: ["civics-test-s1-presentation", "civics-test-s1-founders-defense", "civics-f2-presentation", "civics-f2-government-arcade",
                           "civics-f3-presentation", "civics-f3-pixel-town", "civics-f4-presentation", "civics-f4-1776-files",
                           "civics-f5-presentation", "civics-f5-1800s-express", "civics-f6-presentation"] }  // everything posted through 11/2
};

// Activities every student in the class gets credit for as "Completed in class" on the TEACHER dashboard
// (shown with a check, no score, so it doesn't count toward mastery). Real turn-ins still show over it.
window.CLASS_DONE_FOR_ALL = {
  "divide-africa-day1": "Completed in class",
  "civics-test-s1-founders-defense": "Completed in class"   // Friday 1 Founders' Defense: everyone did it (Fynn, 11-03)
};

// 🔒 LOCKED by Fynn (2026-11-02). Don't change unit day counts or test dates without his yes in your chat (see CLAUDE.md).
// 2026-11-02: Fynn combined days so every unit fits Mon–Thu class days (Dec 2 no school): U.S. History U3 6→5,
// Government U3 4→3, Sociology U3 8→7, World History U2 12→9. Test dates unchanged.
// 2026-11-03: Fynn said every last summative is by Wed Jan 6. U.S. History U6 4→3 and World History U3 8→7:
// the last lesson day is now a short lesson + the test on 1/6 (cut slides are hidden in the decks, not deleted).
window.CLASS_CALENDAR = {
  "us-history":    { 1: { days: 6,  summative: "2026-11-05" }, 2: { days: 8,  summative: "2026-11-19" }, 3: { days: 5, summative: "2026-12-03" },
                     4: { days: 4,  summative: "2026-12-10" }, 5: { days: 4,  summative: "2026-12-17" }, 6: { days: 3, summative: "2027-01-06" } },
  "world-history": { 1: { days: 14, summative: "2026-11-19" }, 2: { days: 9, summative: "2026-12-10" }, 3: { days: 7, summative: "2027-01-06" } },
  "sociology":     { 1: { days: 10, summative: "2026-11-12" }, 2: { days: 6,  summative: "2026-11-24" }, 3: { days: 7, summative: "2026-12-10" }, 4: { days: 7, summative: "2027-01-06" } },
  "government":    { 1: { days: 10, summative: "2026-11-12" }, 2: { days: 6,  summative: "2026-11-24" }, 3: { days: 3, summative: "2026-12-03" },
                     4: { days: 4,  summative: "2026-12-10" }, 5: { days: 4,  summative: "2026-12-17" }, 6: { days: 3, summative: "2027-01-06" } }
};

// Days with no school: [first day off, last day off]. Lesson-day estimates on the student home page and the
// teacher dashboard's To-do tab skip these. Winter break per Fynn (11/2/26).
// From the district calendar (Fynn's photo, 2026-11-02). Each pair is first and last day off (inclusive).
window.CLASS_NO_SCHOOL = [
  ["2026-10-23", "2026-10-23"],   // no school (after end of 1st quarter)
  ["2026-11-02", "2026-11-03"],   // no school
  ["2026-11-25", "2026-11-27"],   // Thanksgiving break
  ["2026-12-02", "2026-12-02"],   // mid-quarter day, no school for students
  ["2026-12-21", "2027-01-01"],   // winter break (school is back Mon Jan 4)
  ["2027-01-11", "2027-01-11"],   // no school
  ["2027-01-18", "2027-01-18"]    // no school (MLK Day)
];

// Part 1 units (first half of U.S. History and World History): not on the green sheet, so no dates.
// The summative is the day right after the last lesson day.
window.CLASS_CALENDAR_PART1 = {
  "us-history":    { 1: { days: 6 }, 2: { days: 6 }, 3: { days: 7 }, 4: { days: 8 } },
  "world-history": { 1: { days: 6 }, 2: { days: 6 }, 3: { days: 7 }, 4: { days: 9 } }
};

window.CLASS_ASSIGNMENTS = {
  // ---- World History · Unit 1 ----
  "divide-africa-day1":          { course: "world-history", unit: 1, day: 1, title: "Day 1 · Divide Africa", path: "divide-africa/", std: ["SS.9-12.WH.24"] },
  "day-2-hanoi-rat-hunt":        { course: "world-history", unit: 1, day: 2, title: "Day 2 · The Great Hanoi Rat Hunt (Reading)", path: "day-2-hanoi/", std: ["SS.9-12.WH.27", "SS.9-12.WH.24"] },
  "pacific-case-files":          { course: "world-history", unit: 1, day: 3, title: "Day 3 · Pacific Case Files", path: "pacific-case-files/", std: ["SS.9-12.WH.27", "SS.9-12.WH.25"] },
  "wwi-alliance-chain-reaction": { course: "world-history", unit: 1, day: 4, title: "Day 4 · WWI Alliance Chain Reaction", path: "wwi-alliance-chain-reaction/", std: ["SS.9-12.WH.29"] },
  "write-the-peace-treaty":      { course: "world-history", unit: 1, day: 5, title: "Day 5 · Treaty of Versailles: Did They Get to Choose?", path: "write-the-peace-treaty/", std: ["SS.9-12.WH.31", "SS.9-12.WH.29"] },
  "day6-world-in-crisis":        { course: "world-history", unit: 1, day: 6, title: "Day 6 · A World in Crisis", path: "day6-world-in-crisis/", std: ["SS.9-12.WH.31", "SS.9-12.WH.30"] },
  "day7-maus-reading-checks":    { course: "world-history", unit: 1, day: 7, title: "Day 7 · Maus I (Reading)", path: "day7-maus/", std: ["SS.9-12.WH.30", "SS.9-12.WH.33"] },
  "day7-warning-signs":          { course: "world-history", unit: 1, day: 7, title: "Day 7 · Spot the Warning Signs (now in Day 8)" },
  "day8-road-to-war":            { course: "world-history", unit: 1, day: 8, title: "Day 8 · When Should Someone Step In? 1930s Comics (Reading)", path: "day8-road-to-war/", std: ["SS.9-12.WH.29", "SS.9-12.WH.30"] },
  "day8-wwii-combined":          { course: "world-history", unit: 1, day: 8, title: "Day 8 · Hold the Line, 1931–1939 (older version)" },
  "day8-wwii-decision-map":      { course: "world-history", unit: 1, day: 8, title: "Day 8 · Decision Map (older version)" },
  "day9-maus2-reading-checks":   { course: "world-history", unit: 1, day: 9, title: "Day 9 · Maus II (Reading)", path: "day9-maus2/", std: ["SS.9-12.WH.30", "SS.9-12.WH.33"] },
  "day10-wwii-comics":           { course: "world-history", unit: 1, day: 10, title: "Day 10 · What Wins a War? 1940s War Comics (Reading)", path: "day10-wwii-comics/", std: ["SS.9-12.WH.32", "SS.9-12.WH.33"] },  // public-domain 1940s comics fact-check (Fynn, 11-03)
  "day11-wwii-peace":            { course: "world-history", unit: 1, day: 11, title: "Day 11 · Never Again? A 1945 Comic's Peace Plan (Reading)", path: "day11-wwii-peace/", std: ["SS.9-12.WH.31", "SS.9-12.WH.29"] },  // public-domain 1945 True Comics #44 fact-check (Fynn, 11-03)
  "wh-u1-jojo-rabbit":          { course: "world-history", unit: 1, day: 12, turnIn: false, std: [], title: "Days 12–13 · Jojo Rabbit (Movie)", path: "https://www.youtube.com/watch?v=JZx3dMqjfK4" },  // Fynn 11-10: movie days; test moved to Day 14 (still Thu 11/19)
  "wh-u1-jojo-spot-it":          { course: "world-history", unit: 1, day: 12, turnIn: false, std: [], title: "Days 12–13 · Jojo Rabbit Spot-It Guide (Printed)", path: "https://mr-topp.github.io/Social-Studies-Dashboard/world-history/jojo-rabbit-spot-it-guide.pdf" },  // same style as the Truman Show guide (Fynn, 11-10)

  // ---- U.S. History · Unit 1 (Roaring 20s & Great Depression) · outside links, no dashboard turn-in (turnIn: false) ----
  "ush-u1-gd-assignment":     { course: "us-history", unit: 1, day: 1, turnIn: false, std: [], title: "Days 1–3 · Great Depression Project (Word)", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAIG6nonFrZTpOf7Br6vdQGAVsfVh9lwF7Tub5K5XmvHl8?e=5uRa7c" },
  "ush-u1-cinderella-man":    { course: "us-history", unit: 1, day: 4, turnIn: false, std: [], title: "Days 4–5 · Cinderella Man (Movie)", path: "https://www.youtube.com/watch?v=ADPpVYZm-eM&t=1646s" },
  "ush-u1-cinderella-material": { course: "us-history", unit: 1, day: 4, turnIn: false, std: [], title: "Days 4–5 · Cinderella Man Material", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAaaJk3W85dR4h3vaWo2FlTAV6B_M1nBDfCpMYw1j9tULw?e=5KfSha" },
  "ush-u1-summative-review":  { course: "us-history", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6add779bca99907cdd239286" },
  "ush-u1-summative":         { course: "us-history", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Summative", path: "https://drive.google.com/file/d/1T2wc7ijh28jghIDy52xqhfodpFvVWHsM/view?usp=sharing" },
  "ush-u1-summative-key":     { course: "us-history", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Teacher Key", path: "https://drive.google.com/file/d/1graudmE3cWwLWBhDBhm1yrE_Gl8sh18D/view?usp=sharing" },

  // ---- U.S. History · Unit 2 (World War II) ----
  "wwii-graphic-reading-day1":   { course: "us-history", unit: 2, day: 1, title: "Day 1 · Maus I (Reading)", path: "wwii-graphic-reading/#day1", std: ["SS.9-12.US.29", "SS.9-12.US.30"] },
  "wwii-graphic-reading-day2":   { course: "us-history", unit: 2, day: 2, title: "Day 2 · Maus II (Reading)", path: "wwii-graphic-reading/#day2", std: ["SS.9-12.US.29", "SS.9-12.US.30"] },
  "wwii-graphic-reading-day3":   { course: "us-history", unit: 2, day: 3, title: "Day 3 · Anne Frank’s Diary (Reading)", path: "wwii-graphic-reading/#day3", std: ["SS.9-12.US.30"] },
  "wwii-graphic-reading-day4":   { course: "us-history", unit: 2, day: 4, title: "Day 4 · America Joins the War: Fight on the Home Front (Reading)", path: "wwii-graphic-reading/#day4", std: ["SS.9-12.US.29", "SS.9-12.US.31", "SS.9-12.US.33"] },
  "wwii-graphic-reading-day5":   { course: "us-history", unit: 2, day: 5, title: "Day 5 · Japanese American Incarceration Comics (Reading)", path: "wwii-graphic-reading/#day5", std: ["SS.9-12.US.31", "SS.9-12.US.33"] },

  // ---- Sociology · Unit 1 ----
  "sociology-day-1-reading":                  { course: "sociology", unit: 1, day: 1, title: "Day 1 · What Is Sociology? (Reading)", path: "sociology/day-1-reading/", std: ["SS.9-12.Soc.2"] },
  "sociology-day-2-sociological-imagination": { course: "sociology", unit: 1, day: 2, title: "Day 2 · The Sociological Imagination (Reading)", path: "sociology/day-2-sociological-imagination/", std: ["SS.9-12.Soc.2"] },
  "sociology-day-3-founders":                 { course: "sociology", unit: 1, day: 3, title: "Day 3 · Origins and Founders (Reading)", path: "sociology/day-3-founders/", std: ["SS.9-12.Soc.4"] },
  "sociology-day-4-perspectives":             { course: "sociology", unit: 1, day: 4, title: "Day 4 · Sociological Perspectives (Reading)", path: "sociology/day-4-perspectives/", std: ["SS.9-12.Soc.4"] },
  "sociology-theory-casebook":                { course: "sociology", unit: 1, day: 4, title: "Day 4 · Theory Casebook", path: "day-4-theory-casebook/", std: ["SS.9-12.Soc.4"] },
  "sociology-day-7-research-ethics":          { course: "sociology", unit: 1, day: 7, title: "Day 7 · Ethics in Sociological Research (Reading)", path: "sociology/day-7-research-ethics/", std: ["SS.9-12.Soc.1", "SS.9-12.Soc.3"] },
  "sociology-unit1-review-seahaven":          { course: "sociology", unit: 1, day: 8, title: "Days 8–9 · Unit 1 Review · The Truman Show + Escape from Seahaven", path: "sociology-ethics-review/", std: ["SS.9-12.Soc.2", "SS.9-12.Soc.4", "SS.9-12.Soc.1", "SS.9-12.Soc.3"] },
  "soc-u1-d8-truman-spot-it": { course: "sociology", unit: 1, day: 8, turnIn: false, std: [], title: "Days 8–9 · Truman Show Spot-It Guide (Printed)", path: "https://mr-topp.github.io/Social-Studies-Dashboard/sociology/printables/truman-show-spot-it-guide.pdf" },  // Fynn 11-10: printed viewing guide for the movie

  // ---- Sociology · Unit 2 ----
  "sociology-unit2-day1-first-shift":         { course: "sociology", unit: 2, day: 1, title: "Day 1 · Why Did That Blow Up?", path: "sociology/u2-d1-why-blow-up/", std: ["SS.9-12.Soc.5", "SS.9-12.Soc.7"] },
  "sociology-unit2-arrival-culture":          { course: "sociology", unit: 2, day: 2, title: "Day 2 · Mother Tongue (Reading)", path: "sociology/u2-d2-mother-tongue/", std: ["SS.9-12.Soc.5", "SS.9-12.Soc.6"] },
  "sociology-unit2-day3-culture-shock":      { course: "sociology", unit: 2, day: 3, title: "Day 3 · Who Decides What’s Normal? (Reading)", path: "sociology/unit2-day3-culture-shock-exchange/", alt: true, std: ["SS.9-12.Soc.6", "SS.9-12.Soc.5"] },
  "sociology-unit2-itchy-feet-culture":     { course: "sociology", unit: 2, day: 3, title: "Day 3 · Whose Normal? Itchy Feet Comics (Reading)", path: "sociology/u2-itchy-feet-culture/", std: ["SS.9-12.Soc.5", "SS.9-12.Soc.6"] },

  // ---- Government · Unit 1 ----
  "gov-stranded-day1":                { course: "government", unit: 1, day: 1, title: "Day 1 · Stranded: Govern or Collapse", path: "civics/stranded-government/", std: ["SS.9-12.Gov.1", "SS.9-12.Gov.5"] },
  "gov-my-country-day3":              { course: "government", unit: 1, day: 3, title: "Day 3 · My Country, My Rules", path: "civics/my-country-my-rules/", std: ["SS.9-12.Gov.1", "SS.9-12.Gov.4"] },
  "gov-articles-day5":                { course: "government", unit: 1, day: 5, title: "Day 5 · 13 States. One Mess.", path: "civics/articles-confederation-game/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.9"] },
  "gov-missing-constitution-day7":    { course: "government", unit: 1, day: 7, title: "Day 7 · Principle Rush", path: "civics/missing-constitution/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.4"] },
  "gov-democracy-visualized-day1":    { course: "government", unit: 1, day: 1, title: "Day 1 · Purposes of Government (Reading)", path: "civics/democracy-visualized/#day1", std: ["SS.9-12.Gov.1"] },
  "gov-democracy-visualized-day2":    { course: "government", unit: 1, day: 2, title: "Day 2 · Who Counts as 'We the People'? (Reading)", path: "civics/democracy-visualized/#day2", std: ["SS.9-12.Gov.14"] },
  "gov-democracy-visualized-day7":    { course: "government", unit: 1, day: 7, title: "Day 7 · The Constitution (Reading)", path: "civics/democracy-visualized/#day7", std: ["SS.9-12.Gov.4"] },
  "gov-democracy-visualized-day9":    { course: "government", unit: 1, day: 9, title: "Day 9 · Federalism & Iowa Government (Reading)", path: "civics/democracy-visualized/#day9", std: ["SS.9-12.Gov.9"] },
  // ---- Government · Unit 1 · printed/outside resources from the Schoology day posts (links only, no turn-in) ----
  // 2026-11-03 (Fynn): his own printouts (notes, scavenger hunt, posters, "Do Together" sheets) are alternatives (alt: true); iCivics stays main. Later 11-03: the Day 4 Founding-Idea Scavenger Hunt is the main Day 4 activity (not alt).
  "gov-u1-d2-why-government": { course: "government", unit: 1, day: 2, turnIn: false, std: [], title: "Day 2 · Why Government? — iCivics (Printed)", path: "https://linkschool.org/wp-content/uploads/2024/06/Rising-7th-Grade-History.pdf" },
  "gov-u1-d2-why-government-key": { course: "government", unit: 1, day: 2, turnIn: false, std: [], title: "Day 2 · Why Government? Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/10454/assets/why_government_answer_key.pdf" },
  "gov-u1-d2-blooket": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Blooket", path: "https://dashboard.blooket.com/set/68cade675c6118507c3aacd4" },
  "gov-u1-d3-my-country-example": { course: "government", unit: 1, day: 3, turnIn: false, std: [], title: "Day 3 · My Country, My Rules Example", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQCdMhmH97u4SL9wlKVMH2n5AaYxphYqCYYHfmlLN1e0YKc?e=R3Rinw" },
  "gov-u1-d4-scavenger-hunt": { course: "government", unit: 1, day: 4, turnIn: false, std: [], title: "Day 4 · Founding-Idea Scavenger Hunt (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQADcWjqUzgBQoSnVOb7LNykAVObTUGWWPE1nDh5aqajXe8?e=IA4y6k" },
  "gov-u1-d5-aofc-together": { course: "government", unit: 1, day: 5, turnIn: false, std: [], title: "Day 5 · Articles of Confederation — Do Together", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQCUY660iFbdRqkeKEGH08rrATBTFIPSfFWgWYozVo_zlrI?e=Ygx6GN" },
  "gov-u1-d5-aoc": { course: "government", unit: 1, day: 5, turnIn: false, std: [], title: "Day 5 · Articles of Confederation (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDWzKQ8oz4RTKNS8_jCz9waAY1mQa7tEb58TEevIc7SvPU?e=8ERHfh" },
  "gov-u1-d6-compromises": { course: "government", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Constitutional Compromises — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/2624198/assets/major_clash_student_docs.pdf" },
  "gov-u1-d6-compromises-key": { course: "government", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Constitutional Compromises Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/2624198/assets/major_clash_answer_key.pdf" },
  "gov-u1-d6-fed-antifed": { course: "government", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Federalists vs. Anti-Federalists — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/403058/assets/federalists_and_anti-federalists_student_docs.pdf" },
  "gov-u1-d6-fed-antifed-key": { course: "government", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Federalists vs. Anti-Federalists Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/403058/assets/federalists_and_anti-federalists_answer_key.pdf" },
  "gov-u1-d7-notes": { alt: true, course: "government", unit: 1, day: 7, turnIn: false, std: [], title: "Day 7 · Constitution Notes (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAwfWzZ2W9DTKAoWz9NNRRZAQfnJhpOBpCul4BVRPJmELU?e=dveBI4" },
  "gov-u1-d8-notes": { alt: true, course: "government", unit: 1, day: 8, turnIn: false, std: [], title: "Day 8 · Bill of Rights Notes (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQCqn_k7nmtPSaVOcFMTyTGVAaV1F9ctGn30rNW751H_Sn8?e=LWjXHe" },
  "gov-u1-d8-matching": { alt: true, course: "government", unit: 1, day: 8, turnIn: false, std: [], title: "Day 8 · Matching the Bill of Rights (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:p:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDkLW0Q7EiKRo61374-4jmZAboewXYpSzSZjYvdtkPRmYo?e=S6EmYZ" },
  "gov-u1-d8-do-i-have-a-right": { course: "government", unit: 1, day: 8, turnIn: false, std: [], title: "Day 8 · Do I Have a Right? — iCivics Game", path: "https://ed.icivics.org/resources/game/42/do-i-have-a-right" },
  "gov-u1-d9-fed-state-local": { course: "government", unit: 1, day: 9, turnIn: false, std: [], title: "Day 9 · Federal, State, Local or Shared? — Do Together", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAeTpymm_epSYB6uzJUoRCDAejc7s4Awhkr0Kqt5LPrTCA?e=B8W7yf" },
  "gov-u1-d9-federal-in-federalism": { course: "government", unit: 1, day: 9, turnIn: false, std: [], title: "Day 9 · The Federal in Federalism — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/562135/assets/the_federal_in_federalism_student_docs.pdf" },
  "gov-u1-d9-federal-in-federalism-key": { course: "government", unit: 1, day: 9, turnIn: false, std: [], title: "Day 9 · The Federal in Federalism Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/562135/assets/the_federal_in_federalism_answer_key.pdf" },
  "gov-u1-d10-review": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6a998e452d347390093ca079" },
  "gov-u1-d10-summative": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative (Form A)", path: "https://docs.google.com/document/d/1bPK0sJephh52TJ1rgAYxJZsMLDww9mJv70ehzwZ9Lwg/edit" },
  "gov-u1-d10-summative-key": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1vLWWdJ2LGh9r6m43fp2tjtsrogpXLBeNqNzMYsZRkzA/edit" },
  "gov-u1-d10-summative-b": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/15R3ZLrOHgREA6ocrjb3Ea32TgMvbUq9KOoTaa_ECmEg/edit" },
  "gov-u1-d10-summative-b-key": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1MGUsuWkPxp8TE-3tqjqwRJu9kHeNohFXwlyvEgCDCCk/edit" },

  // ---- Government · Unit 2 ----
  "gov-unit2-day1-the-feed":          { course: "government", unit: 2, day: 1, title: "Day 1 · Decision Desk: Ideology vs. Party", path: "civics/unit2-day1-the-feed/", std: ["SS.9-12.Gov.12"] },
  "gov-unit2-day2-fair-game":         { course: "government", unit: 2, day: 2, title: "Day 2 · Fair Game: Comparing the Parties", path: "civics/unit2-day2-fair-game/", std: ["SS.9-12.Gov.12"] },
  // 2026-11-06: Lobby Day (civics/unit2-day2-lobby-day/) taken off Gov U2 Day 4 by Fynn. Game files kept on the site.
  // ---- Government · Unit 2 · activities from the Schoology day posts (links only, no turn-in) ----
  "gov-u2-d1-poster": { alt: true, course: "government", unit: 2, day: 1, turnIn: false, std: [], title: "Days 1–3 · Political Party Poster (Printed)", path: "https://docs.google.com/document/d/1Z8OsrG8eBL8005dEy6XuV9o7wvWctfCvm4g2-h-AmFQ/edit?usp=sharing" },
  "gov-u2-d1-poster-directions": { alt: true, course: "government", unit: 2, day: 1, turnIn: false, std: [], title: "Days 1–3 · Political Party Poster Directions", path: "https://linnmarcsd-my.sharepoint.com/:p:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDKPVnodH6XRaNjq_Hy3NjXATRK4fMXb5Pi0YSG_d-qA_k?e=C064xb" },
  "gov-u2-d2-pew-quiz": { course: "government", unit: 2, day: 2, turnIn: false, std: [], title: "Day 2 · Pew Political Typology Quiz (Optional)", path: "https://www.pewresearch.org/politics/quiz/political-typology/" },
  "gov-u2-d3-signal-break": { course: "government", unit: 2, day: 3, std: ["SS.9-12.Gov.12"], title: "Day 3 · Signal Break: Check It, Call It, Clap Back", path: "civics/unit2-day3-signal-break/" },  // rebuilt one-player on GitHub 11-06 (was a ChatGPT site)
  "gov-u2-d4-interest-groups": { course: "government", unit: 2, day: 4, turnIn: false, std: [], title: "Day 4 · Interest Groups — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/166930/assets/interest_groups_student_docs.pdf" },
  "gov-u2-d4-interest-groups-key": { course: "government", unit: 2, day: 4, turnIn: false, std: [], title: "Day 4 · Interest Groups Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/166930/assets/interest_groups_answer_key.pdf" },
  "gov-u2-d5-election-sim": { course: "government", unit: 2, day: 5, turnIn: false, std: [], title: "Day 5 · Presidential Election Simulation (2 Player)", path: "https://misterharms.com/games/electoral-college-map-game" },
  "gov-u2-d5-win-white-house": { course: "government", unit: 2, day: 5, turnIn: false, std: [], title: "Day 5 · Win the White House — iCivics Game", path: "https://ed.icivics.org/resources/game/67038/win-the-white-house" },
  "gov-u2-d7-review": { course: "government", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6aa09dfe760efeaa1135c5b7" },
  "gov-u2-d7-summative": { course: "government", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative (Form A)", path: "https://docs.google.com/document/d/1NmA1UFbPv7QwTpiHTMQpCrG0rt2Izql-IlULiUNJP4E/edit" },
  "gov-u2-d7-summative-key": { course: "government", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1DWdlvVGbelbw67HFCcnoqWVC-HfvNo9qAzjZnekLw8M/edit" },
  "gov-u2-d7-summative-b": { course: "government", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1SyZAzGGwCH0uyDBtytaV6ui6-8K3xadyr0pJLjg1g84/edit" },
  "gov-u2-d7-summative-b-key": { course: "government", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1W92Z1z-g8y8l_pLm3EEnX2N23FEiiqcPfc-uvSH-zZg/edit" },

  // ---- Government · Unit 3 (Judicial) · activities from the Schoology day posts (links only, no turn-in) ----
  "gov-u3-argument-wars": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Days 1–2 · Argument Wars — iCivics Game", path: "https://ed.icivics.org/games/argument-wars" },
  "gov-u3-court-quest": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Days 1–2 · Court Quest — iCivics Game", path: "https://ed.icivics.org/node/853/resource#game-page-flash-game-container" },
  "gov-u3-d1-interpreting": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Day 1 · Interpreting the Constitution — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/587/assets/interpreting_the_constitution_student_docs.pdf" },
  "gov-u3-d1-interpreting-key": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Day 1 · Interpreting the Constitution Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/587/assets/interpreting_the_constitution_answer_key.pdf" },
  "gov-u3-d1-supreme": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Day 1 · Supreme in Supreme Court — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/616/assets/supreme_in_supreme_court_student_docs.pdf" },
  "gov-u3-d1-supreme-key": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Day 1 · Supreme in Supreme Court Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/616/assets/supreme_in_supreme_court_answer_key.pdf" },
  "gov-u3-d3-review": { course: "government", unit: 3, day: 3, turnIn: false, std: [], title: "Day 3 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6abe6bb22cd0b625b10babad" },
  "gov-u3-d3-summative": { course: "government", unit: 3, day: 3, turnIn: false, std: [], title: "Day 3 · Summative (Form A)", path: "https://docs.google.com/document/d/1BUi3bKaezpBSho1mBfYRdvJpifLrjXTcnNTNiNS0kO4/edit" },
  // ---- Government · Unit 4 (Legislative) ----
  "gov-u4-d1-branches-of-power": { course: "government", unit: 4, day: 1, turnIn: false, std: [], title: "Day 1 · Branches of Power — iCivics Game", path: "https://ed.icivics.org/resources/game/74/branches-of-power" },
  "gov-u4-d1-first-branch": { course: "government", unit: 4, day: 1, turnIn: false, std: [], title: "Day 1 · First Branch — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/3018136/assets/first_branch_legislative_student_docs.pdf" },
  "gov-u4-d1-first-branch-key": { course: "government", unit: 4, day: 1, turnIn: false, std: [], title: "Day 1 · First Branch Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/3018136/assets/first_branch_legislative_answer_key.pdf" },
  "gov-u4-congress-drop": { course: "government", unit: 4, day: 1, turnIn: false, std: [], title: "Days 1–2 · Congress Drop (Game)", path: "https://congress-drop-live.floot.app/" },
  "gov-u4-lawcraft": { course: "government", unit: 4, day: 2, turnIn: false, std: [], title: "Days 2–3 · LawCraft — iCivics Game", path: "https://ed.icivics.org/resources/game/593/lawcraft" },
  "gov-u4-d2-poster": { course: "government", unit: 4, day: 2, turnIn: false, std: [], title: "Day 2 · Bill to Law Poster (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:b/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDZKivJQTMCToTLxsbAvRx-AeG08DTtcj8cNcXV4pUvvK0?e=4TfkoA" },
  "gov-u4-d3-scenario-game": { course: "government", unit: 4, day: 3, turnIn: false, std: [], title: "Day 3 · Congress Scenario Game", path: "https://capitol-crisis-live.floot.app/" },
  "gov-u4-d4-review": { course: "government", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6ac2eab3b78211c196153a34" },
  "gov-u4-d4-summative": { course: "government", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative (Form A)", path: "https://docs.google.com/document/d/1MiIKkU530EnGMifHeJOS7g4BUqXKAWj-8_UcA42A3dY/edit" },
  "gov-u4-d4-summative-key": { course: "government", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1BzHReLaarxqJx_vO1VyZYyBexp_4E0jGPzb_WAioXd8/edit" },
  "gov-u4-d4-summative-b": { course: "government", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1joh-VkR8GS0GPpA9WOfOQ6U3XHFUs4wODQSMmXlMb6k/edit" },
  "gov-u4-d4-summative-b-key": { course: "government", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1IFHeof9sOgtTQEBg2OGJaR01mJUQ6nYTyQHG2cULFN4/edit" },
  // ---- Government · Unit 5 (Executive) ----
  "gov-u5-d1-for-the-president": { course: "government", unit: 5, day: 1, turnIn: false, std: [], title: "Day 1 · For the President: All in a Day's Work — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/613/assets/for_the_president_all_in_a_days_work_student_docs.pdf" },
  "gov-u5-d1-for-the-president-key": { course: "government", unit: 5, day: 1, turnIn: false, std: [], title: "Day 1 · For the President Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/613/assets/for_the_president_all_in_a_days_work_answer_key.pdf" },
  "gov-u5-d2-second-branch": { course: "government", unit: 5, day: 2, turnIn: false, std: [], title: "Day 2 · Second Branch: The Executive — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/3184562/assets/second_branch_the_executive_hs_student_docs.pdf" },
  "gov-u5-d2-second-branch-key": { course: "government", unit: 5, day: 2, turnIn: false, std: [], title: "Day 2 · Second Branch Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/3184562/assets/second_branch_the_executive_hs_answer_key.pdf" },
  "gov-u5-d3-very-big-branch": { course: "government", unit: 5, day: 3, turnIn: false, std: [], title: "Day 3 · A Very Big Branch — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/317985/assets/a_very_big_branch_student_docs.pdf" },
  "gov-u5-d3-very-big-branch-key": { course: "government", unit: 5, day: 3, turnIn: false, std: [], title: "Day 3 · A Very Big Branch Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/317985/assets/a_very_big_branch_answer_key.pdf" },
  "gov-u5-d3-executive-command": { course: "government", unit: 5, day: 3, turnIn: false, std: [], title: "Day 3 · Executive Command — iCivics Game", path: "https://ed.icivics.org/games/executive-command" },
  "gov-u5-d4-review": { course: "government", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6ac83efba124fe7811777ef9" },
  "gov-u5-d4-summative": { course: "government", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative (Form A)", path: "https://docs.google.com/document/d/1bTewtv1mo3XVDmLlmCS7zSZB-VR46EdjzjQILEc6sZU/edit" },
  "gov-u5-d4-summative-key": { course: "government", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1yqdUXgLqraXwGceG1LL0AavIehOYcV_P7syh6fWQoPY/edit" },
  "gov-u5-d4-summative-b": { course: "government", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1RujuNZhDqN9DkbH-LXEj4fNodEIt7PNKOR03gHmw5Q4/edit" },
  "gov-u5-d4-summative-b-key": { course: "government", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1wfowiAK-1Vbxdh91CyARvdC0M42ib77nyA5gy9t6ys0/edit" },

  // ---- Civics (Iowa civics test prep) · Friday 1 ----
  "civics-test-s1-presentation":     { course: "civics", hideLink: true, unit: 1, title: "Founders' Files (Slides)", path: "civics/civics-test-s1-presentation/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.4"] },
  "civics-f1-guided-notes": { course: "civics", unit: 1, turnIn: false, std: [], title: "Guided Notes (Printed)", path: "https://docs.google.com/document/d/1YQIGUBhrlyLUvl1X3PZ89RKvNSBMzGc8JjyqR3vd7i4/edit" },  // Fynn 11-04: guided notes that follow each Friday's slides
  "civics-test-s1-founders-defense":  { course: "civics", unit: 1, title: "Founders' Defense", path: "civics/civics-test-s1-founders-defense/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.4"] },

  // ---- Civics (Iowa civics test prep) · Fridays 2–6 (exit tickets on each Friday's presentation); Friday 7 = exam ----
  // 2026-11-03 (Fynn): match Schoology. F5 = Civil War to Modern America (one condensed deck), F6 = Symbols & Holidays + Smithsonian Symbols & Holidays activity, F7 = Iowa Civics Exam.
  "civics-f2-presentation": { course: "civics", hideLink: true, unit: 2, title: "How the Government Works (Slides)", path: "civics/friday2-government-presentation/", std: ["SS.9-12.Gov.6", "SS.9-12.Gov.7", "SS.9-12.Gov.8"] },
  "civics-f2-guided-notes": { course: "civics", unit: 2, turnIn: false, std: [], title: "Guided Notes (Printed)", path: "https://docs.google.com/document/d/1n3soabsHYYQPlXds_pPP9W0Af5hunOIiwj4vrICcFeI/edit" },
  "civics-f2-government-arcade": { course: "civics", unit: 2, title: "Government Arcade", path: "civics/day2-government-arcade/", std: ["SS.9-12.Gov.6", "SS.9-12.Gov.7", "SS.9-12.Gov.8", "SS.9-12.Gov.9", "SS.9-12.Gov.18"] },
  "civics-f3-presentation": { course: "civics", hideLink: true, unit: 3, title: "Rights & Responsibilities (Slides)", path: "civics/friday3-rights-presentation/", std: ["SS.9-12.Gov.14", "SS.9-12.Gov.17"] },
  "civics-f3-guided-notes": { course: "civics", unit: 3, turnIn: false, std: [], title: "Guided Notes (Printed)", path: "https://docs.google.com/document/d/1hm_kz0zwperMkO8ox_lNnQ26rc620emsuHXwC8KAU7s/edit" },
  "civics-f3-pixel-town": { course: "civics", unit: 3, title: "Pixel Town: Civic Quest", path: "civics/pixel-town-day3-game/", std: ["SS.9-12.Gov.13", "SS.9-12.Gov.14", "SS.9-12.Gov.17"] },
  "civics-f4-presentation": { course: "civics", hideLink: true, unit: 4, title: "The 1776 Files (Slides)", path: "civics/friday4-1776-presentation/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.15"] },
  "civics-f4-guided-notes": { course: "civics", unit: 4, turnIn: false, std: [], title: "Guided Notes (Printed)", path: "https://docs.google.com/document/d/1agkcCQPRCA8DauGJsZ-kvETpvGs8zTA7z9mvLKscE8Q/edit" },
  "civics-f4-1776-files": { course: "civics", unit: 4, title: "The 1776 Files", path: "civics/friday4-1776-files-game/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.15"] },
  "civics-f5-presentation": { course: "civics", hideLink: true, unit: 5, title: "Civil War to Modern America (Slides)", path: "civics/friday5-1800s-civics-presentation/", std: ["SS.9-12.Gov.14", "SS.9-12.Gov.15", "SS.9-12.Gov.11", "SS.9-12.Gov.3"] },
  "civics-f5-guided-notes": { course: "civics", unit: 5, turnIn: false, std: [], title: "Guided Notes (Printed)", path: "https://docs.google.com/document/d/1BFQGIFA_-01GeFIJosKBPaRZx-eeBWdERGMufHrJYIU/edit" },
  "civics-f5-1800s-express": { course: "civics", unit: 5, title: "The 1800s Express", path: "civics/friday5-1800s-express-game/", std: ["SS.9-12.Gov.14", "SS.9-12.Gov.15", "SS.9-12.Gov.3"] },
  "civics-f6-presentation": { course: "civics", hideLink: true, unit: 6, title: "Symbols & Holidays (Slides)", path: "civics/friday6-geography-symbols-presentation/", std: ["SS.9-12.Gov.16"] },
  "civics-f6-guided-notes": { course: "civics", unit: 6, turnIn: false, std: [], title: "Guided Notes (Printed)", path: "https://docs.google.com/document/d/1JTsF4k27CqjNfuLqtajE4yUC4TrbaGGyQID7QWLizOs/edit" },
  "civics-f6-smithsonian-symbols": { course: "civics", unit: 6, turnIn: false, std: [], title: "Smithsonian: Preparing for the Oath · Symbols & Holidays", path: "https://americanhistory.si.edu/education/resources/preparing-oath-symbols-holidays" },
  "civics-f7-exam": { course: "civics", unit: 7, turnIn: false, std: [], title: "Iowa Civics Exam (Summative)", path: "https://docs.google.com/forms/d/1joEmHjcHzjwr7SpNKqNYyS8fifEKlgE61OfEEUMRV8g/viewform" },
  // Added 2026-11-01: past Drive assignments rated Strong by Fynn's student panel + teacher review, linked on their lesson days
  "gov-u1-d1-drive1": { course: "government", unit: 1, day: 1, title: "Day 1 · Foundations of Government Packet, Why Government? section (Page 1)", path: "https://drive.google.com/open?id=1PcQjjqcDXeLLRwC-ly-qZzidjIfQhanFafBKWr9r4TA", turnIn: false, alt: true, std: ["SS.9-12.Gov.1", "SS.9-12.Gov.5"] },
  "gov-u1-d2-drive1": { course: "government", unit: 1, day: 2, title: "Day 2 · The Social Contract: Why We Give Up Power (Reading)", path: "https://drive.google.com/open?id=1oohpyMr1OzbXdJOKfxJ2cCwjCsiBXNASs0uYD3dhNTQ", turnIn: false, alt: true, std: ["SS.9-12.Gov.2", "SS.9-12.Gov.4"] },
  "gov-u1-d2-drive2": { course: "government", unit: 1, day: 2, title: "Day 2 · Foundations of Government Packet, Social Contract section (Page 2)", path: "https://drive.google.com/open?id=1PcQjjqcDXeLLRwC-ly-qZzidjIfQhanFafBKWr9r4TA", turnIn: false, alt: true, std: ["SS.9-12.Gov.2", "SS.9-12.Gov.4"] },
  "gov-u1-d3-drive1": { course: "government", unit: 1, day: 3, title: "Day 3 · Foundations of Government Packet, Types of Government and Federal/Unitary/Confederate section (Pages 3-4)", path: "https://drive.google.com/open?id=1PcQjjqcDXeLLRwC-ly-qZzidjIfQhanFafBKWr9r4TA", turnIn: false, alt: true, std: ["SS.9-12.Gov.1"] },
  "gov-u1-d5-drive1": { course: "government", unit: 1, day: 5, title: "Day 5 · Strengths and Challenges Under the Articles of Confederation (Reading)", path: "https://drive.google.com/open?id=16Hv3VVG3pftBn7NaQVkHPNavs1a2EnkDVq-kbd42G6c", turnIn: false, alt: true, std: ["SS.9-12.Gov.3"] },
  "gov-u1-d6-drive1": { course: "government", unit: 1, day: 6, title: "Day 6 · The Key Compromises and Ratification (Reading)", path: "https://drive.google.com/open?id=1LsgHYfz5y2ThigFhtacFq8ppKEho32PYzSyxh5fvmbk", turnIn: false, alt: true, std: ["SS.9-12.Gov.2", "SS.9-12.Gov.3", "SS.9-12.Gov.4"] },
  "gov-u1-d7-drive1": { course: "government", unit: 1, day: 7, title: "Day 7 · The Structure of the Constitution: The Blueprint of America (Reading)", path: "https://drive.google.com/open?id=1KkObvxI5vaed1N1bihXVR5kyj4pJpAd5UtHaDeyHIGE", turnIn: false, alt: true, std: ["SS.9-12.Gov.1", "SS.9-12.Gov.3", "SS.9-12.Gov.4", "SS.9-12.Gov.5"] },
  "gov-u2-d5-drive1": { course: "government", unit: 2, day: 5, title: "Day 5 · Unit 2 Notes Packet, Day 6 section (Iowa Elections, Districting and Electoral College)", path: "https://drive.google.com/open?id=1kdCfpKq3o-Qmht9k84wkRVb_6kETd1mSz2nYdBp0Cyw", turnIn: false, alt: true, std: ["SS.9-12.Gov.13", "SS.9-12.Gov.14"] },
  "gov-u3-d1-drive1": { course: "government", unit: 3, day: 1, title: "Day 1 · What Is the Judicial Branch? (Reading and Notes)", path: "https://drive.google.com/open?id=1Ky8bgHdNQZQSTVWjvbxdB3uGSpzATI1uof041w4tgik", turnIn: false, alt: true, std: ["SS.9-12.Gov.8"] },
  "gov-u3-d2-drive1": { course: "government", unit: 3, day: 2, title: "Day 2 · Judicial Review: The Power of the Courts (Reading and Notes)", path: "https://drive.google.com/open?id=1YIREDoTRymqLnCKvlCtyupL7wYPD98awoU4Mda7igX4", turnIn: false, alt: true, std: ["SS.9-12.Gov.8"] },
  "gov-u3-d2-drive2": { course: "government", unit: 3, day: 2, title: "Day 2 · Most Influential Supreme Court Cases: Still Law or Overturned? (Reading)", path: "https://drive.google.com/open?id=1SHaUP5v750697VBAu5bxP50k-IxWTRtxjLARaYUmQPI", turnIn: false, alt: true, std: ["SS.9-12.Gov.8"] },
  "gov-u3-d3-summative-key": { course: "government", unit: 3, day: 3, turnIn: false, std: [], title: "Day 3 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1qA_UY34uAMF9BM_25JJLiQIb-4Ba-2kkxHdAuzeQTEI/edit" },
  "gov-u3-d3-summative-b": { course: "government", unit: 3, day: 3, turnIn: false, std: [], title: "Day 3 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1s4o_zbPanvUOwjXJPLwppV49u07MTdRjHPHOC-LLLng/edit" },
  "gov-u3-d3-summative-b-key": { course: "government", unit: 3, day: 3, turnIn: false, std: [], title: "Day 3 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1v1jwH15QylfL27XqzFmb-4ntu-bENlYE7qMp4B9O9Ho/edit" },
  "gov-u4-d1-drive1": { course: "government", unit: 4, day: 1, title: "Day 1 · Representation and Responsibilities of Congress (Reading and Notes)", path: "https://drive.google.com/open?id=1zqXOUwZr0_qrju6aHKM1Ip-xCpr0RIDKf51Z4eo98ro", turnIn: false, alt: true, std: ["SS.9-12.Gov.6"] },
  "gov-u4-d2-drive1": { course: "government", unit: 4, day: 2, title: "Day 2 · Legislative Branch Packet, Bill to Law and Write Your Own Bill section (Pages 2-3)", path: "https://drive.google.com/open?id=1eO4J00iy1rQuubR-0OadW8YuIZRL7JXgs5zNMf400iw", turnIn: false, alt: true, std: ["SS.9-12.Gov.6"] },
  "gov-u4-d3-drive1": { course: "government", unit: 4, day: 3, title: "Day 3 · The Powers of Congress (Reading)", path: "https://drive.google.com/open?id=1lURtcrZc9DqkaIvGHUDVIs28uFPzwoHj6uXqQ_mIuWk", turnIn: false, alt: true, std: ["SS.9-12.Gov.6"] },
  "soc-u1-d2-drive1": { course: "sociology", unit: 1, day: 2, title: "Day 2 · Is It Just Me or a Bigger Pattern? Writing Prompt", path: "https://drive.google.com/open?id=1QtcPoD-6uhTiTG3F9fZJIyr-Xd-CGOZxG7xS5eFPc3U", turnIn: false, std: ["SS.9-12.Soc.2"] },
  "soc-u1-d4-drive1": { course: "sociology", unit: 1, day: 4, title: "Day 4 · Founders and the Three Perspectives Worksheet", path: "https://drive.google.com/open?id=16qZYOtlzYwsw1vbr8-6WPzFCBV2LLYUyZYy2OqmvzQI", turnIn: false, alt: true, std: ["SS.9-12.Soc.4"] },
  "soc-u1-d7-drive1": { course: "sociology", unit: 1, day: 7, title: "Day 7 · Spot the Ethics Problem: Five Research Stories", path: "https://drive.google.com/open?id=1k6DV6CpvuCKoSJVKBjGhDvkbkYk0x8ddM14qGXSeh2o", turnIn: false, alt: true, std: ["SS.9-12.Soc.1", "SS.9-12.Soc.3"] },
  "soc-u2-d4-drive1": { course: "sociology", unit: 2, day: 4, title: "Day 4 · Social Movements (Reading)", path: "https://drive.google.com/open?id=1LZIUX1gabFDQLvIhtzJUhKshmoZffvX4DXY6Gq5547g", turnIn: false, alt: true, std: ["SS.9-12.Soc.7", "SS.9-12.Soc.8"] },
  "soc-u2-d4-drive2": { course: "sociology", unit: 2, day: 4, title: "Day 4 · Collective Behavior and Movements Questions", path: "https://drive.google.com/open?id=1M8EwVKHGDaYIDpLp59xDN9hhsw1kGZ7-iKVbZ-6kpsc", turnIn: false, alt: true, std: ["SS.9-12.Soc.7", "SS.9-12.Soc.8"] },
  "soc-u2-d5-drive1": { course: "sociology", unit: 2, day: 5, title: "Day 5 · How Social Institutions Shape People, Day 1 section (Reading)", path: "https://drive.google.com/open?id=1CoXxodwlk_-mZ6Yc9Zqxgy15yDGViHtteGdPGqUctKY", turnIn: false, alt: true, std: ["SS.9-12.Soc.5", "SS.9-12.Soc.6", "SS.9-12.Soc.7", "SS.9-12.Soc.8"] },
  "soc-u3-d5-drive1": { course: "sociology", unit: 3, day: 5, title: "Day 5 · How Cults Connect to Sociology (Reading)", path: "https://drive.google.com/open?id=1euCEmykOCZdTwezBNsualRmjw2vuv4nYW0M65oLeTj4", turnIn: false, alt: true, std: ["SS.9-12.Soc.11"] },
  "soc-u4-d2-drive1": { course: "sociology", unit: 4, day: 2, title: "Day 2 · Power and Social Stratification (Reading)", path: "https://drive.google.com/open?id=1n9760ZCbQwEkyehSUWKpsLDU2tMmuSW2xsG3VSKC7ME", turnIn: false, alt: true, std: ["SS.9-12.Soc.12", "SS.9-12.Soc.13"] },
  "soc-u4-d6-drive1": { course: "sociology", unit: 4, day: 6, title: "Day 6 · Social Movements and Inequality (Reading)", path: "https://drive.google.com/open?id=1_1sWnA6DzuEZlgG_HKDASxd4KDD4S9vhvxR2yUc1ytY", turnIn: false, alt: true, std: ["SS.9-12.Soc.15"] },
  "ush-p1u1-d1-drive1": { course: "us-history", unit: 1, day: 1, part: 1, title: "Day 1 · Unit 1 Student Packet, Day 1 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, alt: true, std: ["SS.9-12.US.2", "SS.9-12.US.1"] },
  "ush-p1u1-d2-drive1": { course: "us-history", unit: 1, day: 2, part: 1, title: "Day 2 · Unit 1 Student Packet, Day 2 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, alt: true, std: ["SS.9-12.US.2"] },
  "ush-p1u1-d2-articles": { course: "us-history", unit: 1, day: 2, part: 1, title: "Day 2 · Clerk of a Broke Congress", path: "us-history/p1u1-d2-articles/", std: ["SS.9-12.US.2"] },  // polished + re-linked (Fynn, 11-03)
  "ush-p1u1-d3-drive1": { course: "us-history", unit: 1, day: 3, part: 1, title: "Day 3 · Unit 1 Student Packet, Day 3 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, alt: true, std: ["SS.9-12.US.3", "SS.9-12.US.2"] },
  "ush-p1u1-d3-drive2": { course: "us-history", unit: 1, day: 3, part: 1, title: "Day 3 · Federalists vs. Anti-Federalists (Reading)", path: "https://drive.google.com/open?id=1A5hmrLDCYXa4IKU8kd3R3j5i7t-RWqdd7VNMewvjqa0", turnIn: false, alt: true, std: ["SS.9-12.US.3", "SS.9-12.US.2"] },
  "ush-p1u1-d4-drive1": { course: "us-history", unit: 1, day: 4, part: 1, title: "Day 4 · Unit 1 Student Packet, Day 4 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, alt: true, std: ["SS.9-12.US.2"] },
  "ush-p1u1-d4-drive2": { course: "us-history", unit: 1, day: 4, part: 1, title: "Day 4 · Seven Principles: How the Constitution Works (Reading)", path: "https://drive.google.com/open?id=1AHhdJuc2ZG1zFpiVs9Sxf5hkIrhZtVQ25pZ5eZRzmSo", turnIn: false, alt: true, std: ["SS.9-12.US.2"] },
  "ush-p1u1-d5-drive1": { course: "us-history", unit: 1, day: 5, part: 1, title: "Day 5 · Unit 1 Student Packet, Day 5 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, alt: true, std: ["SS.9-12.US.1"] },
  "ush-p1u1-d5-citizenship": { course: "us-history", unit: 1, day: 5, part: 1, title: "Day 5 · Who Counted? 1776–1870", path: "us-history/p1u1-d5-citizenship/", std: ["SS.9-12.US.1"] },  // polished + re-linked (Fynn, 11-03)
  "ush-p1u4-d5-roosevelt-reading": { course: "us-history", unit: 4, day: 5, part: 1, title: "Day 5 · Theodore Roosevelt and the Square Deal (Reading)", path: "us-history/p1u4-d5-roosevelt-reading/", std: ["SS.9-12.US.16", "SS.9-12.US.14"] },  // online version of the TR and Progressivism worksheet (Fynn, 11-03)
  "ush-p1u4-d2-labor": { course: "us-history", unit: 4, day: 2, part: 1, title: "Day 2 · Union Leader: Haymarket to Pullman", path: "us-history/p1u4-d2-labor/", std: ["SS.9-12.US.14"] },  // polished + re-linked (Fynn, 11-03)
  "ush-p1u4-d6-drive1": { course: "us-history", unit: 4, day: 6, part: 1, title: "Day 6 · Background on Woman Suffrage (Slides activity)", path: "https://drive.google.com/open?id=1GjfpbLhFJIp0SH66GcJ0kLrn2k498RhM-ZKkK3tmCNc", turnIn: false, alt: true, std: ["SS.9-12.US.15", "SS.9-12.US.18"] },
  "ush-p1u4-d6-suffrage": { course: "us-history", unit: 4, day: 6, part: 1, title: "Day 6 · Road to the 19th Amendment", path: "us-history/p1u4-d6-suffrage/", std: ["SS.9-12.US.15", "SS.9-12.US.18"] },  // polished + re-linked (Fynn, 11-03)
  "ush-u1-d1-drive1": { course: "us-history", unit: 1, day: 1, title: "Day 1 · The Roaring 20s: A Decade of Change (Reading)", path: "https://drive.google.com/open?id=1K1LFExboUX07qG-vQ0sHYh5Y81wa6CbEsnNgHPdPxSA", turnIn: false, alt: true, std: ["SS.9-12.US.23", "SS.9-12.US.24", "SS.9-12.US.26", "SS.9-12.US.27"] },
  "ush-u1-d2-drive1": { course: "us-history", unit: 1, day: 2, title: "Day 2 · The Great Depression: Causes and Effects (Reading)", path: "https://drive.google.com/open?id=1zQ4MZKiLMs7iD_KQecKr6wDibbZ3nhEo9zNn-k40h_Y", turnIn: false, alt: true, std: ["SS.9-12.US.25", "SS.9-12.US.26"] },
  "ush-u2-d1-drive1": { course: "us-history", unit: 2, day: 1, title: "Day 1 · America Entering World War II (Reading)", path: "https://drive.google.com/open?id=16RfY5OMPOT7RUSlrgPQYiboVHWLZlVg50xwttc3-JPA", turnIn: false, alt: true, std: ["SS.9-12.US.29", "SS.9-12.US.33"] },
  "ush-u2-d2-drive1": { course: "us-history", unit: 2, day: 2, title: "Day 2 · Pearl Harbor: The Attack That Changed Everything (Reading)", path: "https://drive.google.com/open?id=1fqnMxYc6ab7BfNJ5g7JdBJeG_KowDs8r_6jQm-5zN_E", turnIn: false, alt: true, std: ["SS.9-12.US.29", "SS.9-12.US.32", "SS.9-12.US.33"] },
  "ush-u2-d3-drive1": { course: "us-history", unit: 2, day: 3, title: "Day 3 · America and the Holocaust: Help and Failure (Reading)", path: "https://drive.google.com/open?id=1tbFf2Ig7T_oCmUEj1Q1xl2OoaAjpQ-vZD5H3gnKKiwY", turnIn: false, alt: true, std: ["SS.9-12.US.29", "SS.9-12.US.30", "SS.9-12.US.33"] },
  "ush-u2-d3-drive2": { course: "us-history", unit: 2, day: 3, title: "Day 3 · The Holocaust: Understanding History's Darkest Time (Reading)", path: "https://drive.google.com/open?id=14SLMIa6sCIN-5K2bcR3pyz9lcR_mlI_s5-R51TQI3jc", turnIn: false, alt: true, std: ["SS.9-12.US.30", "SS.9-12.US.33"] },
  "ush-u2-d4-drive1": { course: "us-history", unit: 2, day: 4, title: "Day 4 · WWII Home Front Reading and Ration Budget Simulation", path: "https://drive.google.com/open?id=1na5i33GjiNZ3gfpGQxB9Ckx8EyUqEqlHgGHuWjgckt4", turnIn: false, alt: true, std: ["SS.9-12.US.29", "SS.9-12.US.31"] },
  "gov-u5-d2-executive-order-court": { course: "government", unit: 5, day: 2, title: "Day 2 · Executive Order Court", path: "civics/gov-u5-d2-executive-order-court/", std: ["SS.9-12.Gov.7"] },  // replaces Case File 9066 here (Fynn, 11-03); that activity is saved, unlinked
  "ush-u2-d8-drive1": { course: "us-history", unit: 2, day: 8, title: "Day 8 · WWII Home Front Ration Budget Simulation, simulation section", path: "https://drive.google.com/open?id=1na5i33GjiNZ3gfpGQxB9Ckx8EyUqEqlHgGHuWjgckt4", turnIn: false, alt: true, std: ["SS.9-12.US.34"] },
  "ush-u3-d1-drive1": { course: "us-history", unit: 3, day: 1, title: "Day 1 · The Truman Doctrine and Marshall Plan (Reading)", path: "https://drive.google.com/open?id=11BS7ufS9cp8tpELqEBStfMjMkzv3C_ag1ZNkLt3nqFE", turnIn: false, alt: true, std: ["SS.9-12.US.37", "SS.9-12.US.39"] },
  "ush-u3-d3-drive1": { course: "us-history", unit: 3, day: 2, title: "Day 2 · The Korean War (Reading)", path: "https://drive.google.com/open?id=1hLtciIl1rjuDHikiBMYyXWuXMLXm71YUfISknkxVzZ4", turnIn: false, alt: true, std: ["SS.9-12.US.35", "SS.9-12.US.37", "SS.9-12.US.40"] },
  "ush-u3-d5-drive1": { course: "us-history", unit: 3, day: 3, title: "Day 3 · Bay of Pigs and Cuban Missile Crisis (Reading)", path: "https://drive.google.com/open?id=1jnCeFsvXB9JYH-Ey-3AsKZPfMBbQj8tL4vHs6zGqmXQ", turnIn: false, alt: true, std: ["SS.9-12.US.35", "SS.9-12.US.37", "SS.9-12.US.40"] },
  "ush-u3-d6-drive1": { course: "us-history", unit: 3, day: 4, title: "Day 4 · Opposition to the Vietnam War (Reading)", path: "https://drive.google.com/open?id=1kqzbONo56vuZ1-XLaLc8dicHWc-CaVnJJVxc1yF0yKk", turnIn: false, alt: true, std: ["SS.9-12.US.35", "SS.9-12.US.40"] },
  "ush-u4-d1-drive1": { course: "us-history", unit: 4, day: 1, title: "Day 1 · Brown v. Board of Education (Reading)", path: "https://drive.google.com/open?id=1pxiIVxsTUsj_hUfu4soi6QbPW42EQnl9lK_JhnBaNGw", turnIn: false, alt: true, std: ["SS.9-12.US.42", "SS.9-12.US.43", "SS.9-12.US.44"] },
  "ush-u4-d2-drive1": { course: "us-history", unit: 4, day: 2, title: "Day 2 · Protest, Resistance, and Change (Reading)", path: "https://drive.google.com/open?id=1XqSnYEfwlvEDxfpGRGNyGxwE_gyE3AjjpFnFYFW_4B0", turnIn: false, alt: true, std: ["SS.9-12.US.42", "SS.9-12.US.43", "SS.9-12.US.44"] },
  "ush-u4-d3-drive1": { course: "us-history", unit: 4, day: 3, title: "Day 3 · Movements: Who Else Fought (Reading)", path: "https://drive.google.com/open?id=1FNDhLY72kcVwEFqzjrPeX0YXaWGa3qnmU4089DgfUS4", turnIn: false, alt: true, std: ["SS.9-12.US.42", "SS.9-12.US.44"] },
  "ush-u5-d1-drive1": { course: "us-history", unit: 5, day: 1, title: "Day 1 · Reagan and the Conservative Resurgence (Reading)", path: "https://drive.google.com/open?id=1a6bbloVBoDFMVpRsal0NmjfspPM3QXN8UPW72RzKS9A", turnIn: false, alt: true, std: ["SS.9-12.US.46", "SS.9-12.US.47", "SS.9-12.US.49"] },
  "ush-u5-d4-drive1": { course: "us-history", unit: 5, day: 4, title: "Day 4 · End of the Cold War (Reading)", path: "https://drive.google.com/open?id=1DHUmfABax-NAMi2QIk-JDiJIcWKmyRJKRWzS5SRz3Gs", turnIn: false, alt: true, std: ["SS.9-12.US.48", "SS.9-12.US.49", "SS.9-12.US.50"] },
  "ush-u5-d4-drive2": { course: "us-history", unit: 5, day: 4, title: "Day 4 · A World Transformed, with Timeline (Reading)", path: "https://drive.google.com/open?id=144YSHJ1k5ZuEILjM2BinPkr8M2tb1W5xPE4sKdlG-Gg", turnIn: false, alt: true, std: ["SS.9-12.US.48", "SS.9-12.US.50"] },
  "ush-u6-d1-drive1": { course: "us-history", unit: 6, day: 1, title: "Day 1 · 9/11 Two-Part Reading (Reading)", path: "https://drive.google.com/open?id=1YvtAUDBxO3B11PREwBZyvhiD_ll8XXxmQ_MTa8NFJTE", turnIn: false, alt: true, std: ["SS.9-12.US.52", "SS.9-12.US.53", "SS.9-12.US.55"] },
  "ush-u6-d2-drive1": { course: "us-history", unit: 6, day: 2, title: "Day 2 · What Was the Great Recession? (Reading)", path: "https://drive.google.com/open?id=1kUwEOzdYwcGyATzIfbCpZ498Mrp_g7xUXbrZekEVxnk", turnIn: false, alt: true, std: ["SS.9-12.US.53"] },
  "ush-u6-d4-drive1": { course: "us-history", unit: 6, day: 2, title: "Day 2 · Disability Rights Movement (Reading)", path: "https://drive.google.com/open?id=1p0738lXhj-rBV8fjOGyWGFtrV2cdwxeome7AjGoW-gI", turnIn: false, alt: true, std: ["SS.9-12.US.51", "SS.9-12.US.56"] },
  "wh-p1u1-d4-drive1": { course: "world-history", unit: 1, day: 4, part: 1, title: "Day 4 · Chapter 17: Conquest of the Aztec and Inca (Reading)", path: "https://drive.google.com/open?id=1foIyU8uSEJ61f73SYIQUPL7nEFOyebShUnsr6RixOFc", turnIn: false, alt: true, std: ["SS.9-12.WH.3", "SS.9-12.WH.1"] },
  "wh-p1u1-d5-equiano-poem": { course: "world-history", unit: 1, day: 5, part: 1, title: "Day 5 · Equiano's Words: A Middle Passage Found Poem", path: "world-history/p1u1-d5-equiano-poem/", std: ["SS.9-12.WH.1", "SS.9-12.WH.3", "SS.9-12.WH.4"] },  // online version of the Slave Trade + Found Poem slides (Fynn, 11-03)
  "wh-u1-d3-drive1": { course: "world-history", unit: 1, day: 3, title: "Day 3 · Meiji Restoration Activity Packet", path: "https://drive.google.com/open?id=1FnB5lDcISN20C0a-_pfahNnIYSCYgCsn1iRKLEQkzhY", turnIn: false, alt: true, std: ["SS.9-12.WH.27", "SS.9-12.WH.25", "SS.9-12.WH.26"] },
  "wh-u1-d5-drive1": { course: "world-history", unit: 1, day: 5, title: "Day 5 · Treaty of Versailles: What Was at Stake? (Reading)", path: "https://drive.google.com/open?id=1ZvP5rShM5FSjB4Gi7TsxxGmaw2wogq6ej8y6rLGFJAw", turnIn: false, alt: true, std: ["SS.9-12.WH.31", "SS.9-12.WH.33"] },
  "wh-u1-d6-drive1": { course: "world-history", unit: 1, day: 6, title: "Day 6 · The Rise of Totalitarian Leaders (Reading)", path: "https://drive.google.com/open?id=13_33ACZIYW2kariAHlED_bg7TQ2wzj130l5RQm7zwiU", turnIn: false, alt: true, std: ["SS.9-12.WH.31", "SS.9-12.WH.30"] },
  "wh-u1-d8-drive1": { course: "world-history", unit: 1, day: 8, title: "Day 8 · America and the Holocaust: Help and Failure (Reading)", path: "https://drive.google.com/open?id=1tbFf2Ig7T_oCmUEj1Q1xl2OoaAjpQ-vZD5H3gnKKiwY", turnIn: false, alt: true, std: ["SS.9-12.WH.29", "SS.9-12.WH.30"] },
  "wh-u1-summative": { course: "world-history", unit: 1, day: 14, turnIn: false, std: [], title: "Day 14 · Summative (Form A)", path: "https://docs.google.com/document/d/1N_nSVYkfx_SaNllrzwxUJ-l-PS16s9vzgAovSESogyU/edit" },
  "wh-u1-summative-key": { course: "world-history", unit: 1, day: 14, turnIn: false, std: [], title: "Day 14 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1HHTavdEXzkiZdBCyzrwgaHmasybKVkE4rGbCL67C4t8/edit" },
  "wh-u1-summative-b": { course: "world-history", unit: 1, day: 14, turnIn: false, std: [], title: "Day 14 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1cdglPZyne8Ky7scLnS68CLJ8gJEYwXgttk1M729US7I/edit" },
  "wh-u1-summative-b-key": { course: "world-history", unit: 1, day: 14, turnIn: false, std: [], title: "Day 14 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1ij1KduLyGtF2ECcCb-xX0P3QA1Hd_XUWyUBlw59BOds/edit" },
  "wh-u2-d4-drive1": { course: "world-history", unit: 2, day: 2, title: "Day 2 · Mao Zedong's China (Reading)", path: "https://drive.google.com/open?id=1JzDh5PPnzoNuHVz6w_Lo7KGIlE-5DlAM3Y_Hx_Fd3VU", turnIn: false, alt: true, std: ["SS.9-12.WH.34", "SS.9-12.WH.35", "SS.9-12.WH.38"] },
  "wh-u2-d6-drive1": { course: "world-history", unit: 2, day: 4, title: "Day 4 · The Indian Subcontinent Achieves Freedom (Reading)", path: "https://drive.google.com/open?id=11oyS3ZKwI03fpZHa6FI7Cpo331yY4-QaLikv7dYoYn0", turnIn: false, alt: true, std: ["SS.9-12.WH.36", "SS.9-12.WH.34"] },
  "wh-u2-d7-drive1": { course: "world-history", unit: 2, day: 5, title: "Day 5 · New Nations in Africa (Reading)", path: "https://drive.google.com/open?id=1rYuR06gcXLtHd_3MQigCF4LF62ILM9jgYSYyxDsFeIQ", turnIn: false, alt: true, std: ["SS.9-12.WH.36", "SS.9-12.WH.34", "SS.9-12.WH.37"] },
  "wh-u2-d8-drive1": { course: "world-history", unit: 2, day: 6, title: "Day 6 · The Beginnings of the Vietnam War (Reading)", path: "https://drive.google.com/open?id=1hFdZJ1w5oA_aq0hUCEKO8p5CPBmdbVulESFdo6BAwpA", turnIn: false, alt: true, std: ["SS.9-12.WH.36", "SS.9-12.WH.37", "SS.9-12.WH.34"] },
  "wh-u2-d11-drive1": { course: "world-history", unit: 2, day: 8, title: "Day 8 · The Fall of the Berlin Wall (Reading)", path: "https://drive.google.com/open?id=19TEWDbCnxiEwOPMHpAux8BVNsinyG5qKcCREzR0ZuBQ", turnIn: false, alt: true, std: ["SS.9-12.WH.34", "SS.9-12.WH.37", "SS.9-12.WH.35"] },
  "wh-u2-d11-drive2": { course: "world-history", unit: 2, day: 8, title: "Day 8 · The U.S. and the Berlin Wall (Reading and Fill-in)", path: "https://drive.google.com/open?id=1ZjLAqi334enEqQxycbnhAFdA34ZY9teaCvsF1IS_9n0", turnIn: false, alt: true, std: ["SS.9-12.WH.34", "SS.9-12.WH.37"] },
  "gov-u6-d1-checks-balances-doc": { course: "government", unit: 6, day: 1, title: "Day 1 · Checks and Balances (Reading)", path: "https://drive.google.com/open?id=1etuyfGaggPmCvaJt6AMEcYTcKuaRMEqqQhkU44AIBe4", turnIn: false, alt: true, std: ["SS.9-12.Gov.4", "SS.9-12.Gov.9"] },
  "gov-u6-d1-federalist-51": { course: "government", unit: 6, day: 1, title: "Day 1 · Exploring Federalist No. 51 (Reading)", path: "https://drive.google.com/open?id=1Bt4Wp6hZnBURK5aCZLh017AeWEhOfmdFm5Sie2jFhfo", turnIn: false, alt: true, std: ["SS.9-12.Gov.4", "SS.9-12.Gov.9"] },
  "gov-u6-d2-iowa-diagrams": { course: "government", unit: 6, day: 2, title: "Day 2 · Iowa Government Structure Diagrams", path: "https://drive.google.com/open?id=1sbQm3POEgR3-JLyWDH7Y2LZYedUANq7yvIMVmi2KoU8", turnIn: false, alt: true, std: ["SS.9-12.Gov.18", "SS.9-12.Gov.20"] },
  "gov-u6-d2-marion-local": { course: "government", unit: 6, day: 2, title: "Day 2 · Local Governments: Marion (Reading)", path: "https://drive.google.com/open?id=1Mrcx2EpKQyCXqDadGEarMcEnl9P3mfjl9Dsp5DaN-kM", turnIn: false, alt: true, std: ["SS.9-12.Gov.20"] },

  // ---- Added 2026-11-02: activities that were already built but not listed here yet ----
  "soc-u1-d5-prove-hot-take": { course: "sociology", unit: 1, day: 5, title: "Day 5 · Prove It Lab", path: "sociology/u1-d5-prove-hot-take/", std: ["SS.9-12.Soc.1"] },
  "soc-u1-d6-study-people": { course: "sociology", unit: 1, day: 6, title: "Day 6 · Research Rivals", path: "sociology/u1-d6-study-people/", std: ["SS.9-12.Soc.1", "SS.9-12.Soc.3"] },
  "soc-u1-summative": { course: "sociology", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative (Form A)", path: "https://docs.google.com/document/d/18I-54X4zp2SSFxJdkUDqyXNG_js25ZRcmNiaBoTFzug/edit" },
  "soc-u1-summative-key": { course: "sociology", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1A2yW1-otWk4xMh09Vrcb9UxPlEu2rKJ-crQz6jlTWWM/edit" },
  "soc-u1-summative-b": { course: "sociology", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/16ITBZ-XNZra9i9jgJrI43AzzRk7d7gIKhh7Ch6KIJ_c/edit" },
  "soc-u1-summative-b-key": { course: "sociology", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1PwuQVKOKl1dhfnBfhT3VSpmYioC2po0pp4FfEdPvfxs/edit" },
  "soc-u2-d4-montgomery-story": { course: "sociology", unit: 2, day: 4, title: "Day 4 · Walk to Freedom (Reading)", path: "sociology/u2-d4-montgomery-story/", std: ["SS.9-12.Soc.7", "SS.9-12.Soc.8"] },
  "soc-u2-d5-everyday-life": { course: "sociology", unit: 2, day: 5, title: "Day 5 · Five Bosses, One Tuesday", path: "sociology/u2-d5-everyday-life/", std: ["SS.9-12.Soc.5", "SS.9-12.Soc.6", "SS.9-12.Soc.7", "SS.9-12.Soc.8"] },
  "soc-u2-summative": { course: "sociology", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative (Form A)", path: "https://docs.google.com/document/d/1lC1qd5y9xG3ZZ2ePi_1GH4-0K7uUxpGUU6SeL3U0Yi0/edit" },
  "soc-u2-summative-key": { course: "sociology", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1zAjdjk2b4aiVY-PxtDzQItYtBQRkegg_yA8_bdbQC8o/edit" },
  "soc-u2-summative-b": { course: "sociology", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1tuEH_xHnJqa1wikRnpdwBJNIh6Lcm8mxz87XZt18tKI/edit" },
  "soc-u2-summative-b-key": { course: "sociology", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/18YBwSgNxFZGoF4S8M9fWZVlMUqWn9x_eFe-lNGIC-Go/edit" },
  "soc-u3-d1-who-taught-you": { course: "sociology", unit: 3, day: 1, title: "Day 1 · Raise Remi: Born or Taught?", path: "sociology/u3-d1-who-taught-you/", std: ["SS.9-12.Soc.9"] },
  "soc-u3-d5-groups-change-us": { course: "sociology", unit: 3, day: 5, title: "Day 5 · The Group Pressure Lab", path: "sociology/u3-d5-groups-change-us/", std: ["SS.9-12.Soc.10", "SS.9-12.Soc.11"] },
  "soc-u4-d2-bad-day": { course: "sociology", unit: 4, day: 2, title: "Day 2 · Same Bad Day, Three Wallets", path: "sociology/u4-d2-bad-day/", std: ["SS.9-12.Soc.12", "SS.9-12.Soc.13"] },
  "soc-u4-d6-fight-inequality": { course: "sociology", unit: 4, day: 6, title: "Day 6 · The Organizer's Toolkit", path: "sociology/u4-d6-fight-inequality/", std: ["SS.9-12.Soc.15"] },
  // 2026-11-02 overnight: Sociology "not made yet" days filled in (Fynn said yes to linking finished drafts that pass every check).
  "soc-u3-d2-who-shapes-you": { course: "sociology", unit: 3, day: 2, title: "Day 2 · Push Wars", path: "sociology/u3-d2-who-shapes-you/", std: ["SS.9-12.Soc.9"] },
  "soc-u3-d3-break-a-rule": { course: "sociology", unit: 3, day: 3, title: "Day 3 · Teen Court: Rule Breakers", path: "sociology/u3-d3-break-a-rule/", std: ["SS.9-12.Soc.4", "SS.9-12.Soc.9"] },
  "soc-u3-d4-who-decides-you": { course: "sociology", unit: 3, day: 4, title: "Day 4 · Mirror Week", path: "sociology/u3-d4-who-decides-you/", std: ["SS.9-12.Soc.10"] },
  "soc-u3-d6-unit3-review": { course: "sociology", unit: 3, day: 6, title: "Day 6 · Unit 3 Review · Born Reckless?", path: "sociology/u3-d6-unit3-review/", std: ["SS.9-12.Soc.4", "SS.9-12.Soc.9", "SS.9-12.Soc.10", "SS.9-12.Soc.11"] },
  "soc-u3-summative": { course: "sociology", unit: 3, day: 7, turnIn: false, std: [], title: "Day 7 · Summative (Form A)", path: "https://docs.google.com/document/d/1nTiupsHhzojGAUp0iuQtEXDabJORbcE3qo29D6dU12Q/edit" },
  "soc-u3-summative-key": { course: "sociology", unit: 3, day: 7, turnIn: false, std: [], title: "Day 7 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1IEugKRMKiYiKL1T_e6ejOt51fK40eatViiS_Nk3i-Y8/edit" },
  "soc-u3-summative-b": { course: "sociology", unit: 3, day: 7, turnIn: false, std: [], title: "Day 7 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1IgNhvxwXzIVDVGzTVZZPBwp-MfkrV3Eq1KU1lWJ4HxA/edit" },
  "soc-u3-summative-b-key": { course: "sociology", unit: 3, day: 7, turnIn: false, std: [], title: "Day 7 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1zRTGOhV7rlFAUOM2hpHsVyWT0_EuM6J6veBqJKNwJSQ/edit" },
  "soc-u4-d1-start-equal": { course: "sociology", unit: 4, day: 1, title: "Day 1 · The Ladder Test", path: "sociology/u4-d1-start-equal/", std: ["SS.9-12.Soc.12"] },
  "soc-u4-d3-rich-countries": { course: "sociology", unit: 4, day: 3, title: "Day 3 · The Cobalt Deal", path: "sociology/u4-d3-rich-countries/", std: ["SS.9-12.Soc.12"] },
  "soc-u4-d4-institutions": { course: "sociology", unit: 4, day: 4, title: "Day 4 · Fair on Paper", path: "sociology/u4-d4-institutions/", std: ["SS.9-12.Soc.14"] },
  "soc-u4-d5-inequality-conflict": { course: "sociology", unit: 4, day: 5, title: "Day 5 · Kettle Creek on Edge", path: "sociology/u4-d5-inequality-conflict/", std: ["SS.9-12.Soc.13"] },
  "soc-u4-summative": { course: "sociology", unit: 4, day: 7, turnIn: false, std: [], title: "Day 7 · Summative (Form A)", path: "https://docs.google.com/document/d/1Au_XiycHP27XJ2nYf8txrwNvpSbA0JlFHjrzn1gMzAk/edit" },
  "soc-u4-summative-key": { course: "sociology", unit: 4, day: 7, turnIn: false, std: [], title: "Day 7 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1qJ1K7U3rIC6wtp919J1TetJyZd68-6e8eo_uXOYYnYc/edit" },
  "soc-u4-summative-b": { course: "sociology", unit: 4, day: 7, turnIn: false, std: [], title: "Day 7 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1xCnIjtykl2BY7kdR6eG3lbgAU1I8gtbWti3q9WN_X0A/edit" },
  "soc-u4-summative-b-key": { course: "sociology", unit: 4, day: 7, turnIn: false, std: [], title: "Day 7 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1BYgrejYw3YkhbIBVp7AVjdWcBvlJlgChPajg3IEE1KE/edit" },
  "gov-u6-d1-checks-balances": { course: "government", unit: 6, day: 1, title: "Day 1 · Branch Wars", path: "civics/gov-u6-d1-checks-balances/", std: ["SS.9-12.Gov.4", "SS.9-12.Gov.9"] },
  "gov-u6-d2-iowa-government": { course: "government", unit: 6, day: 2, title: "Day 2 · Who Do I Call?", path: "civics/gov-u6-d2-iowa-government/", std: ["SS.9-12.Gov.18", "SS.9-12.Gov.19", "SS.9-12.Gov.20"] },
  "gov-u6-summative": { course: "government", unit: 6, day: 3, turnIn: false, std: [], title: "Day 3 · Summative (Form A)", path: "https://docs.google.com/document/d/1mgeuXFsoF4RqhfZRCk395Q0cm-IzRfjxZSRgsi4uJfc/edit" },
  "gov-u6-summative-key": { course: "government", unit: 6, day: 3, turnIn: false, std: [], title: "Day 3 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1fzCSACgRUni5XW_UhA-PHCw6-AlI4v_4oWINChsxlT4/edit" },
  "gov-u6-summative-b": { course: "government", unit: 6, day: 3, turnIn: false, std: [], title: "Day 3 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/153bu1ze13krsVUkC-9pKfehMf8hFmJ_19NF-Np5KNdU/edit" },
  "gov-u6-summative-b-key": { course: "government", unit: 6, day: 3, turnIn: false, std: [], title: "Day 3 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1GYVf_Ur6rbTj9WQ7z7uXdznmyumRYkAulokWkSW7wmA/edit" },
  "wh-u2-d4-china": { course: "world-history", unit: 2, day: 2, title: "Day 2 · Paper Harvest: Can One Leader Remake a Country?", path: "world-history/u2-d4-china/", std: ["SS.9-12.WH.34", "SS.9-12.WH.35", "SS.9-12.WH.38"] },
  "wh-u2-d1-cold-war": { course: "world-history", unit: 2, day: 1, title: "Day 1 · Both Sides of the Line: How Do Allies Become Enemies?", path: "world-history/u2-d1-cold-war/", std: ["SS.9-12.WH.34", "SS.9-12.WH.35", "SS.9-12.WH.37"] },  // reworked from U.S. History's Cold War Desk (Fynn, 11-03)
  "wh-u2-d3-hot-spots": { course: "world-history", unit: 2, day: 3, title: "Day 3 · Hot Seat: Korea", path: "world-history/u2-d3-hot-spots/", std: ["SS.9-12.WH.34", "SS.9-12.WH.37"] },  // reworked from U.S. History's Korea game (Fynn, 11-03)
  "wh-u2-d6-empires-end": { course: "world-history", unit: 2, day: 4, title: "Day 4 · Break the Grip: How Do Colonies Get Free?", path: "world-history/u2-d6-empires-end/", std: ["SS.9-12.WH.36", "SS.9-12.WH.34"] },
  "wh-u2-d7-africa": { course: "world-history", unit: 2, day: 5, title: "Day 5 · The Day After Freedom", path: "world-history/u2-d7-africa/", std: ["SS.9-12.WH.36", "SS.9-12.WH.34", "SS.9-12.WH.37"] },
  "wh-u2-d8-vietnam": { course: "world-history", unit: 2, day: 6, title: "Day 6 · Vietnam: Who Should Decide a Nation's Future?", path: "world-history/u2-d8-vietnam/", std: ["SS.9-12.WH.36", "SS.9-12.WH.37", "SS.9-12.WH.34"] },
  "wh-u2-d11-1989": { course: "world-history", unit: 2, day: 8, title: "Day 8 · 1989: How Does a Wall Come Down?", path: "world-history/u2-d11-1989/", std: ["SS.9-12.WH.34", "SS.9-12.WH.37", "SS.9-12.WH.35", "SS.9-12.WH.36", "SS.9-12.WH.38"] },
  "wh-u2-summative": { course: "world-history", unit: 2, day: 9, turnIn: false, std: [], title: "Day 9 · Summative (Form A)", path: "https://docs.google.com/document/d/1YFj_px08poenmQpqm3WYT56F2gXNchms8Dg9kygPHOs/edit" },
  "wh-u2-summative-key": { course: "world-history", unit: 2, day: 9, turnIn: false, std: [], title: "Day 9 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/17l-SIxascsuKEQwuzM7Zg2YwmIa9h0Yn_Yg8lJ-M19Q/edit" },
  "wh-u2-summative-b": { course: "world-history", unit: 2, day: 9, turnIn: false, std: [], title: "Day 9 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1EQov3YSzUS9bPeZoLe5PqiWOPBPy1lPFW0LlBkAkHwc/edit" },
  "wh-u2-summative-b-key": { course: "world-history", unit: 2, day: 9, turnIn: false, std: [], title: "Day 9 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1nK7QwQfkYX2iAcbKLk5R0qMCG41UcQwiR1Gz0HpAg8A/edit" },
  "wh-u3-summative": { course: "world-history", unit: 3, day: 7, turnIn: false, std: [], title: "Day 7 · Summative (Form A)", path: "https://docs.google.com/document/d/1dYA9oqOHGXjjFQfsTps3lUb2Cx5lCA8D548LFonLYJk/edit" },
  "wh-u3-d2-globalization": { course: "world-history", unit: 3, day: 2, title: "Day 2 · Follow the Cobalt", path: "world-history/u3-d2-globalization/", std: ["SS.9-12.WH.39", "SS.9-12.WH.42"] },  // reworked from Sociology's Cobalt Deal (Fynn, 11-03)
  "wh-u3-summative-key": { course: "world-history", unit: 3, day: 7, turnIn: false, std: [], title: "Day 7 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1Y5NPohAR1-7BCtC9pY0mqUjIup3Ig82hXEatOSbaAqk/edit" },
  "wh-u3-summative-b": { course: "world-history", unit: 3, day: 7, turnIn: false, std: [], title: "Day 7 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1X2h-4hPOAECy1gAfBqPWGjq_VWzk7mN9RqELlCMaNXE/edit" },
  "wh-u3-summative-b-key": { course: "world-history", unit: 3, day: 7, turnIn: false, std: [], title: "Day 7 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/14EhjH5yrA-fr3-PVS4PS934X6dZJDR_dG-FLJ6OgOEU/edit" },
  // 2026-11-03: graphic-novel readings for the To-do days (Fynn chose free-to-share comics; Pop Culture and Terrorism left for later).
  "wh-u2-d7-secret-comic": { course: "world-history", unit: 2, day: 7, title: "Day 7 · Who Paid for This Hero? Apartheid's Secret Comic (Reading)", path: "world-history/u2-d7-secret-comic/", std: ["SS.9-12.WH.35", "SS.9-12.WH.37", "SS.9-12.WH.38"] },
  "wh-u3-d1-trade-comic": { course: "world-history", unit: 3, day: 1, title: "Day 1 · Made Everywhere? A 2008 Trade Comic (Reading)", path: "world-history/u3-d1-trade-comic/", std: ["SS.9-12.WH.39"] },
  "wh-u3-d3-rule-makers": { course: "world-history", unit: 3, day: 3, title: "Day 3 · Who Makes the World's Rules? UN, WTO & EU Comics (Reading)", path: "world-history/u3-d3-rule-makers/", std: ["SS.9-12.WH.41"] },
  "wh-u3-d4-pushback-comics": { course: "world-history", unit: 3, day: 4, title: "Day 4 · Walls, Taxes, or Coffee? Two Comics on Pushing Back (Reading)", path: "world-history/u3-d4-pushback-comics/", std: ["SS.9-12.WH.42"] },
  "ush-u1-d3-responses-iowans": { course: "us-history", unit: 1, day: 3, title: "Day 3 · Hoover vs. the New Deal", path: "us-history/u1-d3-responses-iowans/", std: ["SS.9-12.US.25", "SS.9-12.US.27", "SS.9-12.US.28"] },
  "ush-u2-d6-arsenal-race": { course: "us-history", unit: 2, day: 6, title: "Day 6 · Arsenal Race: What Wins a War?", path: "world-history/u1-d10-arsenal-race/", std: ["SS.9-12.US.29", "SS.9-12.US.33"] },  // moved from WH U1 D10 to USH U2 D6 "How Did the Allies Beat Germany?" (Fynn, 11-03)
  "ush-u2-d7-war-with-japan": { course: "us-history", unit: 2, day: 7, title: "Day 7 · How Did the War with Japan End? 1945 War Comics (Reading)", path: "us-history/u2-d7-war-with-japan/", std: ["SS.9-12.US.29", "SS.9-12.US.32", "SS.9-12.US.33", "SS.9-12.US.34"] },  // public-domain True Comics #46 + Science Comics #1 fact-check, code talkers photo, slurs covered (Fynn, 11-03)
  "ush-u2-summative": { course: "us-history", unit: 2, day: 8, turnIn: false, std: [], title: "Day 8 · Summative (Form A)", path: "https://docs.google.com/document/d/1HOtp5NyVQgp270DWdXv6rkrvKOR4FZSZD78UtFjUXqc/edit" },
  "ush-u2-summative-key": { course: "us-history", unit: 2, day: 8, turnIn: false, std: [], title: "Day 8 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1t0_epwRfMktvykGRK53lplNJ10TacCy2kU_1AIklNsA/edit" },
  "ush-u2-summative-b": { course: "us-history", unit: 2, day: 8, turnIn: false, std: [], title: "Day 8 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1dqX1TH9wITkeA1xgbczrqtQhCHMs-wYy_TJU82_XmGc/edit" },
  "ush-u2-summative-b-key": { course: "us-history", unit: 2, day: 8, turnIn: false, std: [], title: "Day 8 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1wuFmdfd-oZZWHh7MIyOZMYdXbIpbPJGDVa2ZbF6KD5E/edit" },
  "ush-u3-d1-fear-at-home": { course: "us-history", unit: 3, day: 1, title: "Day 1 · Is This Tomorrow? A 1947 Red Scare Comic (Reading)", path: "us-history/u3-d1-fear-at-home/", std: ["SS.9-12.US.36", "SS.9-12.US.40", "SS.9-12.US.41"] },  // real public-domain 1947 comic + Red Scare fact files; reading comes before the game (Fynn, 11-13)
  "ush-u3-d1-allies-enemies": { course: "us-history", unit: 3, day: 1, title: "Day 1 · The Cold War Desk", path: "us-history/u3-d1-allies-enemies/", std: ["SS.9-12.US.37"] },  // containment only; the Red Scare moved to the comic reading (Fynn, 11-13)
  "ush-u3-d3-korea": { course: "us-history", unit: 3, day: 2, title: "Day 2 · The Line That Moved: Korea", path: "us-history/u3-d3-korea/", std: ["SS.9-12.US.35", "SS.9-12.US.37", "SS.9-12.US.40"] },
  "ush-u3-d3-duck-and-cover": { course: "us-history", unit: 3, day: 3, title: "Day 3 · Bert the Turtle Says Duck and Cover: A 1951 Government Comic (Reading)", path: "us-history/u3-d3-duck-and-cover/", std: ["SS.9-12.US.38", "SS.9-12.US.40"] },  // real public-domain 1951 FCDA comic; matches Day 3 slides on the arms race and civil defense (Fynn, 11-13)
  "ush-u3-d5-nuclear-brink": { course: "us-history", unit: 3, day: 3, title: "Day 3 · Thirteen Days: Crisis Room", path: "us-history/u3-d5-nuclear-brink/", std: ["SS.9-12.US.37", "SS.9-12.US.40"] },
  "ush-u3-d6-vietnam": { course: "us-history", unit: 3, day: 4, title: "Day 4 · Front Page: A Nation Divided", path: "us-history/u3-d6-vietnam/", std: ["SS.9-12.US.35", "SS.9-12.US.37", "SS.9-12.US.38", "SS.9-12.US.40", "SS.9-12.US.41"] },
  "ush-u3-summative": { course: "us-history", unit: 3, day: 5, turnIn: false, std: [], title: "Day 5 · Summative (Form A)", path: "https://docs.google.com/document/d/14X4oYNxTI_dz7iyeBgjea7gIZouf0nXnJ7xM8vpKuaA/edit" },
  "ush-u3-summative-key": { course: "us-history", unit: 3, day: 5, turnIn: false, std: [], title: "Day 5 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1tiCbtvQ8ySC4rsEp44Kr_xjz0c-0jQi6Yo6n11AEE1w/edit" },
  "ush-u3-summative-b": { course: "us-history", unit: 3, day: 5, turnIn: false, std: [], title: "Day 5 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1TenDcnji0sBNf-2hlW6G7ChER3wKrR0U1MRBvftKLaM/edit" },
  "ush-u3-summative-b-key": { course: "us-history", unit: 3, day: 5, turnIn: false, std: [], title: "Day 5 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1-6uMPpJHAyvhnKMvYZOZNiQsEiyR7H-LhsnqcN0wg3k/edit" },
  "ush-u4-d1-montgomery-story": { course: "us-history", unit: 4, day: 1, title: "Day 1 · Walk to Freedom: The Montgomery Bus Boycott (Reading)", path: "us-history/u4-d1-montgomery-story/", std: ["SS.9-12.US.42", "SS.9-12.US.43", "SS.9-12.US.44"] },
  "ush-u4-d2-nonviolence": { course: "us-history", unit: 4, day: 2, title: "Day 2 · The Nonviolence Strategy File", path: "us-history/u4-d2-nonviolence/", std: ["SS.9-12.US.42", "SS.9-12.US.43", "SS.9-12.US.44"] },
  "ush-u4-d3-who-else": { course: "us-history", unit: 4, day: 3, title: "Day 3 · Build the Exhibit: Who Else Fought?", path: "us-history/u4-d3-who-else/", std: ["SS.9-12.US.42", "SS.9-12.US.44"] },
  "ush-u4-summative": { course: "us-history", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative (Form A)", path: "https://docs.google.com/document/d/1Sstjf-pPJKzOxthUwMt_Zp0eDwHACWuZxugIXqXHPnI/edit" },
  "ush-u4-summative-key": { course: "us-history", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1pKHn0HtOVu_y5lYWCngm-aX6c0Ko7YkxSw9BY8JzjtU/edit" },
  "ush-u4-summative-b": { course: "us-history", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1v7SAHHCaUB4Goaek_YNRLKQtMVh77cP0TjBKriQYaRU/edit" },
  "ush-u4-summative-b-key": { course: "us-history", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1FuTuhqA38SCq2eMffGHWSCiDsXTkOernF0jE0NTG4ig/edit" },
  "ush-u5-d1-voters-change": { course: "us-history", unit: 5, day: 1, title: "Day 1 · Election Desk 1980", path: "us-history/u5-d1-voters-change/", std: ["SS.9-12.US.46", "SS.9-12.US.47", "SS.9-12.US.49"] },
  "ush-u5-d2-new-right": { course: "us-history", unit: 5, day: 2, title: "Day 2 · Decision Desk: The New Right", path: "us-history/u5-d2-new-right/", std: ["SS.9-12.US.46", "SS.9-12.US.49"] },  // reworked from Government's Decision Desk (Fynn, 11-03)
  "ush-u5-d4-cold-war-ends": { course: "us-history", unit: 5, day: 3, title: "Day 3 · Who Ended the Cold War?", path: "us-history/u5-d4-cold-war-ends/", std: ["SS.9-12.US.48", "SS.9-12.US.49"] },
  "ush-u5-summative": { course: "us-history", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative (Form A)", path: "https://docs.google.com/document/d/1ng6L41yAM_YTamlOvtNjj-wl_Zz6tU1ajxAkzUI5IZY/edit" },
  "ush-u5-summative-key": { course: "us-history", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1B3WYAFlmwR-Pvz3cfjMa2EcV2zXgb8518mxNzcQm8lU/edit" },
  "ush-u5-summative-b": { course: "us-history", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1gWMt_6RveHu7CvnYo1a_kn_g3I1T302P9IwUAUOMEQE/edit" },
  "ush-u5-summative-b-key": { course: "us-history", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1WJQiAboY4s_GhJUsm6bHzePOuErxmwMubym2f-cuy8Q/edit" },
  "ush-u6-d1-superpower": { course: "us-history", unit: 6, day: 1, title: "Day 1 · Superpower Decision Desk", path: "us-history/u6-d1-superpower/", std: ["SS.9-12.US.52", "SS.9-12.US.53", "SS.9-12.US.55", "SS.9-12.US.56"] },
  "ush-u6-d2-crisis": { course: "us-history", unit: 6, day: 2, title: "Day 2 · Surviving 2008", path: "us-history/u6-d2-crisis/", std: ["SS.9-12.US.53", "SS.9-12.US.54", "SS.9-12.US.55"] },
  "ush-u6-d4-still-fighting": { course: "us-history", unit: 6, day: 2, title: "Day 2 · The Fight for Access", path: "us-history/u6-d4-still-fighting/", std: ["SS.9-12.US.51", "SS.9-12.US.56"] },
  "ush-u6-summative": { course: "us-history", unit: 6, day: 3, turnIn: false, std: [], title: "Day 3 · Summative (Form A)", path: "https://docs.google.com/document/d/1kfR9ih8nqgtcLrofuqdmRW1QkTlEbHh7EwXSxsI_pH4/edit" },
  "ush-u6-summative-key": { course: "us-history", unit: 6, day: 3, turnIn: false, std: [], title: "Day 3 · Summative Form A Teacher Key", path: "https://docs.google.com/document/d/1tDsdYTIRf7fGXvybvdHV8XClFsI4kiI63_7HlrlOfzQ/edit" },
  "ush-u6-summative-b": { course: "us-history", unit: 6, day: 3, turnIn: false, std: [], title: "Day 3 · Summative (Form B · retake)", path: "https://docs.google.com/document/d/1tr9Lre90hUby5YHi_M3slA4aNEI9Z9O0Uu69EdUBqH8/edit" },
  "ush-u6-summative-b-key": { course: "us-history", unit: 6, day: 3, turnIn: false, std: [], title: "Day 3 · Summative Form B Teacher Key", path: "https://docs.google.com/document/d/1IBiXm-IPy-S3IiMHaYTykLe4Hbn1flDVWIOR1ordUZM/edit" },
};

// Iowa standard wording (Iowa Academic Standards for Social Studies) for every standard an in-use activity covers.
// Every standard each class must show evidence on this term (credit needs at least a Level 1 on each one).
// The mastery grid shows all of these, even before any activity is tagged with one.
window.CLASS_COURSE_STANDARDS = {
  "sociology": [
    "SS.9-12.Soc.1",
    "SS.9-12.Soc.2",
    "SS.9-12.Soc.3",
    "SS.9-12.Soc.4",
    "SS.9-12.Soc.5",
    "SS.9-12.Soc.6",
    "SS.9-12.Soc.7",
    "SS.9-12.Soc.8",
    "SS.9-12.Soc.9",
    "SS.9-12.Soc.10",
    "SS.9-12.Soc.11",
    "SS.9-12.Soc.12",
    "SS.9-12.Soc.13",
    "SS.9-12.Soc.14",
    "SS.9-12.Soc.15"
  ],
  "government": [
    "SS.9-12.Gov.1",
    "SS.9-12.Gov.2",
    "SS.9-12.Gov.3",
    "SS.9-12.Gov.4",
    "SS.9-12.Gov.5",
    "SS.9-12.Gov.6",
    "SS.9-12.Gov.7",
    "SS.9-12.Gov.8",
    "SS.9-12.Gov.9",
    "SS.9-12.Gov.10",
    "SS.9-12.Gov.11",
    "SS.9-12.Gov.12",
    "SS.9-12.Gov.13",
    "SS.9-12.Gov.14",
    "SS.9-12.Gov.15",
    "SS.9-12.Gov.16",
    "SS.9-12.Gov.17",
    "SS.9-12.Gov.18",
    "SS.9-12.Gov.19",
    "SS.9-12.Gov.20"
  ],
  "us-history": [
    "SS.9-12.US.23",
    "SS.9-12.US.24",
    "SS.9-12.US.25",
    "SS.9-12.US.26",
    "SS.9-12.US.27",
    "SS.9-12.US.28",
    "SS.9-12.US.29",
    "SS.9-12.US.30",
    "SS.9-12.US.31",
    "SS.9-12.US.32",
    "SS.9-12.US.33",
    "SS.9-12.US.34",
    "SS.9-12.US.35",
    "SS.9-12.US.36",
    "SS.9-12.US.37",
    "SS.9-12.US.38",
    "SS.9-12.US.39",
    "SS.9-12.US.40",
    "SS.9-12.US.41",
    "SS.9-12.US.42",
    "SS.9-12.US.43",
    "SS.9-12.US.44",
    "SS.9-12.US.45",
    "SS.9-12.US.46",
    "SS.9-12.US.47",
    "SS.9-12.US.48",
    "SS.9-12.US.49",
    "SS.9-12.US.50",
    "SS.9-12.US.51",
    "SS.9-12.US.52",
    "SS.9-12.US.53",
    "SS.9-12.US.54",
    "SS.9-12.US.55",
    "SS.9-12.US.56"
  ],
  "world-history": [
    "SS.9-12.WH.24",
    "SS.9-12.WH.25",
    "SS.9-12.WH.26",
    "SS.9-12.WH.27",
    "SS.9-12.WH.28",
    "SS.9-12.WH.29",
    "SS.9-12.WH.30",
    "SS.9-12.WH.31",
    "SS.9-12.WH.32",
    "SS.9-12.WH.33",
    "SS.9-12.WH.34",
    "SS.9-12.WH.35",
    "SS.9-12.WH.36",
    "SS.9-12.WH.37",
    "SS.9-12.WH.38",
    "SS.9-12.WH.39",
    "SS.9-12.WH.40",
    "SS.9-12.WH.41",
    "SS.9-12.WH.42",
    "SS.9-12.WH.43"
  ]
};

window.CLASS_STANDARDS = {
  // Part 1 standards (first half of U.S. and World History): exact state wording, Jan 2026 set (via Common Planner).
  "SS.9-12.US.4": "Evaluate the multiple causes and effects of the Civil War.",
  "SS.9-12.US.5": "Analyze the consequences of the Civil War and Reconstruction.",
  "SS.9-12.US.7": "Assess the impact of exemplary Americans and Iowans who displayed civic virtues in the Civil War and Reconstruction.",
  "SS.9-12.US.8": "Evaluate the impact of inventions and technological innovations on American society and culture.",
  "SS.9-12.US.19": "Evaluate the multiple causes and effects of the Spanish-American War, the Philippine–American War, and World War I.",
  "SS.9-12.WH.2": "Evaluate the impacts of the Columbian Exchange on global populations and environments.",
  "SS.9-12.WH.5": "Explain how and why land-based and maritime empires expanded from 1450 - 1750.",
  "SS.9-12.WH.7": "Map the development and expansion of land-based and maritime empires from 1450 to 1750.",
  "SS.9-12.WH.8": "Assess how the artistic accomplishments of an empire reflected and reinforced their values and beliefs from 1450 to 1750.",
  "SS.9-12.WH.9": "Evaluate the long-term impacts of expanding empires from 1450 to 1750 in world history.",
  "SS.9-12.WH.10": "Explain how the Renaissance changed European societies from 1450 to 1750.",
  "SS.9-12.WH.13": "Describe the ways in which various groups supported and/or resisted the Reformation.",
  "SS.9-12.WH.14": "Analyze the role of printing and the printing press in the development of new intellectual and belief systems.",
  "SS.9-12.WH.15": "Explain the causes of political revolutions in the period of 1750 to 1826.",
  "SS.9-12.WH.17": "Explain the intellectual context that shaped and spread revolutions in the Atlantic world from 1750 to 1826.",
  "SS.9-12.WH.18": "Analyze how revolutions from 1750 to 1826 impacted various groups of people.",
  "SS.9-12.WH.19": "Assess to what extent the revolutions changed political, economic, and/or social systems from 1750-1826.",
  "SS.9-12.WH.20": "Explain the factors that led to the start of the Industrial Revolution in Britain in 1750.",
  "SS.9-12.WH.21": "Compare and contrast the industrialization of two or more countries in the 19th century.",
  "SS.9-12.WH.22": "Analyze how the Industrial Revolution changed societies from 1750 to 1900.",
  "SS.9-12.WH.23": "Compare ideological responses to industrialization and the Industrial Revolution.",
  "SS.9-12.WH.24": "Describe the economic, political and cultural factors that contributed to a new wave of European imperialism in the 19th century.",
  "SS.9-12.WH.25": "Compare and contrast the different imperialist systems created by European and other imperialist nations.",
  "SS.9-12.WH.27": "Compare the responses of resistance and adaptation to Western imperialism in the 19th century.",
  "SS.9-12.WH.29": "Analyze the causes that led to the outbreak of World War I and World War II.",
  "SS.9-12.WH.30": "Compare and contrast the rise of dictators including their methods of repression and persecution, specifically addressing the causes and impact of the Holocaust.",
  "SS.9-12.WH.31": "Assess the political and economic consequences and cultural developments after World War I and World War II.",
  "SS.9-12.WH.33": "Compare the experiences and perspectives of individuals affected by total war during World War I and World War II.",
  "SS.9-12.US.29": "Evaluate the multiple causes and effects of World War II.",
  "SS.9-12.US.30": "Evaluate the American response to the Holocaust.",
  "SS.9-12.US.31": "Analyze how labor and government actions during World War II influenced American economic systems, urbanization, and cultural development.",
  "SS.9-12.US.33": "Analyze diverse ideologies through primary and secondary sources, noting the impact on social, economic, and political institutions during World War II.",
  "SS.9-12.Soc.1": "Analyze the components of a sociological investigation.",
  "SS.9-12.Soc.2": "Compare and contrast the sociological perspective and how it differs from other social sciences.",
  "SS.9-12.Soc.4": "Explain the sociological theories that are the basis of sociology.",
  "SS.9-12.Soc.5": "Describe the components of culture.",
  "SS.9-12.Soc.6": "Analyze how culture influences individuals, including themselves.",
  "SS.9-12.Soc.7": "Evaluate important social institutions and how they respond to social needs.",
  "SS.9-12.Gov.1": "Analyze the origins of government with attention to the purpose(s) of government, and alternative models from other nations and groups.",
  "SS.9-12.Gov.3": "Analyze important founding and historical documents to the United States and the State of Iowa.",
  "SS.9-12.Gov.4": "Analyze the underlying principles established by the United States Constitution.",
  "SS.9-12.Gov.5": "Analyze the role of the government in maintaining order.",
  "SS.9-12.Gov.9": "Assess how the United States federal system divides powers between national and state governments.",
  "SS.9-12.Gov.12": "Critique the influence of intermediary institutions on government and policy.",
  "SS.9-12.Gov.6": "Analyze the function, duties, and authority of the legislative branch, including the process of lawmaking and the power of the purse.",
  "SS.9-12.Gov.7": "Analyze the function, duties, and authority of the executive branch, including the scope of presidential powers, executive orders, executive agreements, and the president's role in foreign and domestic policy.",
  "SS.9-12.Gov.8": "Analyze the function, duties, and authority of the judicial branch, including the power of judicial review and interpretation of laws.",
  "SS.9-12.Gov.11": "Analyze the historical, contemporary, and emerging patterns of political action and activism.",
  "SS.9-12.Gov.15": "Assess the contributions of exemplary Iowans and Americans who have played a role in promoting civic virtues and democratic principles.",
  "SS.9-12.Gov.16": "Analyze the concept of civic virtue and its importance to a well-functioning democracy.",
  "SS.9-12.Gov.17": "Analyze the rights, liberties, duties, and responsibilities of citizens of the United States and the state of Iowa.",
  "SS.9-12.Gov.13": "Analyze the electoral process and election systems in the United States, specifically Iowa election law including registration requirements, paper ballots, and absentee voting.",
  "SS.9-12.Gov.18": "Identify the function, duties, and authority of the government of the state of Iowa.",
  "SS.9-12.Gov.14": "Analyze the role of citizens in the U.S. political system, with attention to the definition of who is a citizen, the expansion of that definition over time.",
  "SS.9-12.Soc.11": "Explain the social construction of groups and their impact on the life chances of individuals.",
  "SS.9-12.Soc.12": "Explain the concept of social stratification and its influence on societal structures and individual opportunities.",
  "SS.9-12.Soc.13": "Analyze the effects of social inequality on groups and individuals.",
  "SS.9-12.Soc.15": "Evaluate how people and groups have responded to social inequality.",
  "SS.9-12.WH.34": "Map how communism and decolonization changed the global order from 1945 to 1991.",
  "SS.9-12.WH.35": "Compare and contrast the methods of control used by various forms of government during the Cold War.",
  "SS.9-12.WH.36": "Analyze the causes of decolonization within the context of the Cold War.",
  "SS.9-12.WH.37": "Explain how various groups promoted their interests and goals within the context of the Cold War.",
  "SS.9-12.Gov.19": "Identify the function, duties, and authority of the sovereign Meskwaki Nation tribal government.",
  "SS.9-12.Gov.20": "Identify the functions and organizational structures of Iowa's local governments.",
  // Added 2026-11-02 from the official Iowa standards PDF (January 2026), word for word:
  "SS.9-12.Gov.2": "Analyze the Enlightenment principles that informed the structure and principles of the United States government and its institutions.",
  "SS.9-12.Gov.10": "Analyze the basic requirements and responsibilities to serve in public office.",
  "SS.9-12.Soc.3": "Evaluate the strengths and weaknesses of the major methods of sociological research",
  "SS.9-12.Soc.8": "Assess how social institutions and cultures change and evolve.",
  "SS.9-12.Soc.9": "Describe the process of socialization across the life course.",
  "SS.9-12.Soc.10": "Explain the process of the social construction of the self.",
  "SS.9-12.Soc.14": "Explain the relationship between social institutions and inequality.",
  "SS.9-12.US.1": "Analyze change, continuity, and context of American citizenship from 1776 to 1870.",
  "SS.9-12.US.2": "Analyze diverse ideologies through primary and secondary sources, noting the impact on social, economic, and political institutions.",
  "SS.9-12.US.3": "Assess the impact of exemplary Americans who displayed civic virtues in the creation of the United States of America.",
  "SS.9-12.US.14": "Analyze how labor and government actions during the Progressive Era influenced American economic systems, urbanization, and cultural development.",
  "SS.9-12.US.15": "Assess the impact of social movements, including reactionary movements, in creating reform in the United States.",
  "SS.9-12.US.16": "Assess the goals of the Progressive Era through the changes and continuities of the period to determine the influence of reformers.",
  "SS.9-12.US.18": "Assess the impact of exemplary Americans and Iowans who displayed civic virtues in the Progressive Era.",
  "SS.9-12.US.23": "Evaluate the impact of social changes on the development of modern American culture.",
  "SS.9-12.US.24": "Evaluate the impact of inventions and technological innovations on American society and culture.",
  "SS.9-12.US.25": "Analyze how labor and government actions during the 1920s and the Great Depression influenced American economic systems, urbanization, and cultural development.",
  "SS.9-12.US.26": "Explain the patterns of immigration and migration during the 1920s and the Great Depression and the influence on American economic, social, and political systems.",
  "SS.9-12.US.27": "Analyze diverse ideologies through primary and secondary sources, noting the impact on social, economic, and political institutions in the 1920s and the Great Depression.",
  "SS.9-12.US.28": "Assess the impact of exemplary Americans and Iowans who displayed civic virtues in the 1920s and the Great Depression.",
  "SS.9-12.US.32": "Evaluate the impact of inventions and technological innovations on American society and culture.",
  "SS.9-12.US.34": "Assess the impact of exemplary Americans and Iowans who displayed civic virtues in World War II.",
  "SS.9-12.US.35": "Compare and corroborate interpretations of the multiple causes and effects of the Korean War to the Vietnam War.",
  "SS.9-12.US.36": "Analyze the roots of domestic communism and anti-communism during the Cold War.",
  "SS.9-12.US.37": "Analyze the American policy of containment as a response to the threat of Communism during the Cold War.",
  "SS.9-12.US.38": "Evaluate the impact of inventions and technological innovations on American society and culture.",
  "SS.9-12.US.39": "Analyze how labor and government actions during the Cold War influenced American economic systems, urbanization, and cultural development.",
  "SS.9-12.US.40": "Analyze diverse ideologies through primary and secondary sources, noting the impact on social, economic, and political institutions during the Cold War Era.",
  "SS.9-12.US.41": "Assess the impact of exemplary Americans and Iowans who displayed civic virtues during the Cold War.",
  "SS.9-12.US.42": "Assess the impact of social movements, including reactionary movements, in creating reform in the United States.",
  "SS.9-12.US.43": "Analyze how government actions impact American opinion of the U.S. political system.",
  "SS.9-12.US.44": "Analyze diverse ideologies through primary and secondary sources, noting the impact on social, economic, and political institutions during the Civil Right Era.",
  "SS.9-12.US.45": "Assess the impact of exemplary Americans and Iowans who displayed civic virtues.",
  "SS.9-12.US.46": "Assess the impact of social movements, including reactionary movements, in creating reform in the United States.",
  "SS.9-12.US.47": "Explain how American policies towards globalization impacted various economic growth, labor markets, the environment, and income distribution.",
  "SS.9-12.US.48": "Evaluate the Rise of Conservatism's influence on American foreign policy, including its role in ending the Cold War, promoting military intervention, and shaping international relations.",
  "SS.9-12.US.49": "Analyze diverse ideologies through primary and secondary sources, noting the impact on social, economic, and political institutions from the late 60s through 1990.",
  "SS.9-12.US.50": "Assess the impact of exemplary Americans and Iowans who displayed civic virtues.",
  "SS.9-12.US.51": "Assess the impact of social movements, including reactionary movements, in creating reform in the United States.",
  "SS.9-12.US.52": "Evaluate American foreign policy after the Cold War.",
  "SS.9-12.US.53": "Assess government responses to domestic challenges.",
  "SS.9-12.US.54": "Explain how American policies towards globalization impacted various economic growth, labor markets, the environment, and income distribution.",
  "SS.9-12.US.55": "Analyze diverse ideologies through primary and secondary sources, noting the impact on social, economic, and political institutions from 1990 to the present.",
  "SS.9-12.US.56": "Assess the impact of exemplary Americans and Iowans who displayed civic virtues.",
  "SS.9-12.WH.1": "Compare and contrast the causes and effects of two or more Early Modern trade systems from 1450 to 1750.",
  "SS.9-12.WH.3": "Analyze the interactions between Europeans and peoples of other regions around the world, considering multiple perspectives from 1450 - 1750.",
  "SS.9-12.WH.4": "Interpret growing global connections from 1450- 1750 through analysis of primary sources.",
  "SS.9-12.WH.26": "Analyze how industrialization and imperialism influenced the movement of people around the world between 1800 and 1914.",
  "SS.9-12.WH.28": "Explain how 19th-century political, social, and economic changes influenced the conceptual development of modernity.",
  "SS.9-12.WH.32": "Analyze how new technology contributed to the major turning points in World War I and World War II.",
  "SS.9-12.WH.38": "Analyze the impact of mass atrocities committed during the Cold War.",
  "SS.9-12.WH.39": "Evaluate the effects of globalization since the 1990s.",
  "SS.9-12.WH.40": "Compare and contrast how different regions have adapted and adopted popular culture since the 1990s.",
  "SS.9-12.WH.41": "Explain how global institutions have influenced political and economic relationships since the 1900s.",
  "SS.9-12.WH.42": "Explain various responses to increasing globalization since the 1990s",
  "SS.9-12.WH.43": "Analyze the development of terrorist organizations and the efforts to combat them."
};

// Works out the class for any id, even one not listed above.
window.classCourseFor = function (id) {
  id = String(id || "");
  const known = window.CLASS_ASSIGNMENTS[id];
  if (known) return known.course;
  if (id.startsWith("sociology-") || id.startsWith("soc-")) return "sociology";
  if (id.startsWith("civics-")) return "civics";
  if (id.startsWith("gov-")) return "government";
  if (id.startsWith("ush-") || id.startsWith("us-history-") || id.startsWith("wwii-graphic-reading")) return "us-history";
  return "world-history";
};

// ---- Which lesson was the class's LAST class day? (Fynn, 11-05) ----
// The feedback card only shows feedback on work from the class day before today, and only work the student
// turned in. Same day-counting rules as the student home page (index.html: unitPlan / dayOnDate):
// core classes meet Mon–Thu, skipping CLASS_NO_SCHOOL; Civics meets Fridays (no green-sheet dates).
(function () {
  const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const off = d => (window.CLASS_NO_SCHOOL || []).some(([a, z]) => { const i = iso(d); return i >= a && i <= z; });
  const isClass = (course, d) => !off(d) && (course === "civics" ? d.getDay() === 5 : d.getDay() >= 1 && d.getDay() <= 4);
  const between = (a, b) => { let n = 0; const d = new Date(a + "T12:00:00"), end = new Date(b + "T12:00:00"); while (d < end) { d.setDate(d.getDate() + 1); if (isClass("", d)) n++; } return n; };
  const step = (s, n) => { const d = new Date(s + "T12:00:00"), dir = n < 0 ? -1 : 1; for (let k = Math.abs(n); k > 0;) { d.setDate(d.getDate() + dir); if (isClass("", d)) k--; } return iso(d); };
  function plan(course, u) {
    const cal = (window.CLASS_CALENDAR || {})[course], c = cal && cal[u];
    if (!c || !c.summative) return null;
    const pin = (window.CLASS_TODAY || {})[course];
    if (pin && pin.unit === u) return { from: pin.date, fromDay: pin.day, days: c.days, test: c.summative };
    const prev = cal[u - 1];
    return prev && prev.summative ? { from: step(prev.summative, 1), fromDay: 1, days: c.days, test: c.summative } : null;
  }
  // The class day before today (a date), e.g. Thursday when it's Monday.
  window.classLastClassDay = function (course, today) {
    const d = new Date((today || iso(new Date())) + "T12:00:00");
    for (let i = 0; i < 60; i++) { d.setDate(d.getDate() - 1); if (isClass(course, d)) return iso(d); }
    return "";
  };
  // { unit, day } of the lesson a class had on that date (Part 2 units on the green sheet), or null.
  window.classLessonOn = function (course, date) {
    const cal = (window.CLASS_CALENDAR || {})[course];
    if (!cal || !date) return null;
    for (const u of Object.keys(cal).map(Number).sort((a, b) => a - b)) {
      const p = plan(course, u);
      if (!p || date > p.test) continue;
      const first = p.fromDay > 1 ? step(p.from, -(p.fromDay - 1)) : p.from;
      if (date < first) return null;
      const day = date >= p.test ? p.days : date <= p.from ? Math.max(1, p.fromDay - between(date, p.from)) : Math.min(p.days - 1, p.fromDay + between(p.from, date));
      return { unit: u, day };
    }
    return null;
  };
  // True when this activity was part of the class's lesson on its last class day.
  // Civics has no dated calendar, so there it's work turned in on the last Friday (atMs = when it was turned in).
  window.classFromLastClassDay = function (id, atMs, today) {
    const a = (window.CLASS_ASSIGNMENTS || {})[id];
    if (!a) return false;
    const last = window.classLastClassDay(a.course, today);
    if (!last) return false;
    if (a.course === "civics") return !!atMs && iso(new Date(atMs)) === last;
    if (a.part === 1 || !a.day) return false;
    const l = window.classLessonOn(a.course, last);
    if (!l || l.unit !== a.unit) return false;
    const m = String(a.title || "").match(/^Days (\d+)[–-](\d+)/);   // "Days 1–3 · ..." covers each of those days
    return m ? +m[1] <= l.day && l.day <= +m[2] : a.day === l.day;
  };
})();
