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
    5: "The 1800s (Q90–99)",
    6: "Modern America (Q100–118)",
    7: "Symbols, Holidays & Final Review (Q119–128)"
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

window.CLASS_ASSIGNMENTS = {
  // ---- World History · Unit 1 ----
  "divide-africa-day1":          { course: "world-history", unit: 1, day: 1, title: "Day 1 · Divide Africa", path: "divide-africa/", std: ["SS.9-12.WH.24"] },
  "day-2-hanoi-rat-hunt":        { course: "world-history", unit: 1, day: 2, title: "Day 2 · The Great Hanoi Rat Hunt (Reading)", path: "day-2-hanoi/", std: ["SS.9-12.WH.27", "SS.9-12.WH.24"] },
  "pacific-case-files":          { course: "world-history", unit: 1, day: 3, title: "Day 3 · Pacific Case Files", path: "pacific-case-files/", std: ["SS.9-12.WH.27", "SS.9-12.WH.25"] },
  "wwi-alliance-chain-reaction": { course: "world-history", unit: 1, day: 4, title: "Day 4 · WWI Alliance Chain Reaction", path: "wwi-alliance-chain-reaction/", std: ["SS.9-12.WH.29"] },
  "write-the-peace-treaty":      { course: "world-history", unit: 1, day: 5, title: "Day 5 · Cartoon Decoder", path: "write-the-peace-treaty/", std: ["SS.9-12.WH.31"] },
  "day6-world-in-crisis":        { course: "world-history", unit: 1, day: 6, title: "Day 6 · A World in Crisis", path: "day6-world-in-crisis/", std: ["SS.9-12.WH.31", "SS.9-12.WH.30"] },
  "day7-maus-reading-checks":    { course: "world-history", unit: 1, day: 7, title: "Day 7 · Maus I (Reading)", path: "day7-maus/", std: ["SS.9-12.WH.30", "SS.9-12.WH.33"] },
  "day7-warning-signs":          { course: "world-history", unit: 1, day: 7, title: "Day 7 · Spot the Warning Signs (now in Day 8)" },
  "day8-wwii-combined":          { course: "world-history", unit: 1, day: 8, title: "Day 8 · WWII Decisions & Warning Signs", path: "day8-wwii-decision-map/", std: ["SS.9-12.WH.29", "SS.9-12.WH.30"] },
  "day8-wwii-decision-map":      { course: "world-history", unit: 1, day: 8, title: "Day 8 · Decision Map (older version)" },
  "day9-maus2-reading-checks":   { course: "world-history", unit: 1, day: 9, title: "Day 9 · Maus II (Reading)", path: "day9-maus2/", std: ["SS.9-12.WH.30", "SS.9-12.WH.33"] },

  // ---- U.S. History · Unit 1 (Roaring 20s & Great Depression) · outside links, no dashboard turn-in (turnIn: false) ----
  "ush-u1-gd-assignment":     { course: "us-history", unit: 1, day: 1, turnIn: false, std: [], title: "Days 1–3 · Great Depression Assignment (Word)", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAIG6nonFrZTpOf7Br6vdQGAVsfVh9lwF7Tub5K5XmvHl8?e=5uRa7c" },
  "ush-u1-cinderella-man":    { course: "us-history", unit: 1, day: 4, turnIn: false, std: [], title: "Days 4–5 · Cinderella Man (Movie)", path: "https://www.youtube.com/watch?v=ADPpVYZm-eM&t=1646s" },
  "ush-u1-cinderella-material": { course: "us-history", unit: 1, day: 4, turnIn: false, std: [], title: "Days 4–5 · Cinderella Man Material", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAaaJk3W85dR4h3vaWo2FlTAV6B_M1nBDfCpMYw1j9tULw?e=5KfSha" },
  "ush-u1-summative-review":  { course: "us-history", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6add779bca99907cdd239286" },
  "ush-u1-summative":         { course: "us-history", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Summative", path: "https://drive.google.com/file/d/1T2wc7ijh28jghIDy52xqhfodpFvVWHsM/view?usp=sharing" },
  "ush-u1-summative-key":     { course: "us-history", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Summative Teacher Key", path: "https://drive.google.com/file/d/1graudmE3cWwLWBhDBhm1yrE_Gl8sh18D/view?usp=sharing" },

  // ---- U.S. History · Unit 2 (World War II) ----
  "wwii-graphic-reading-day1":   { course: "us-history", unit: 2, day: 1, title: "Day 1 · Maus I (Reading)", path: "wwii-graphic-reading/#day1", std: ["SS.9-12.US.29", "SS.9-12.US.30"] },
  "wwii-graphic-reading-day2":   { course: "us-history", unit: 2, day: 2, title: "Day 2 · Maus II (Reading)", path: "wwii-graphic-reading/#day2", std: ["SS.9-12.US.29", "SS.9-12.US.30"] },
  "wwii-graphic-reading-day3":   { course: "us-history", unit: 2, day: 3, title: "Day 3 · Anne Frank’s Diary (Reading)", path: "wwii-graphic-reading/#day3", std: ["SS.9-12.US.30"] },
  "wwii-graphic-reading-day4":   { course: "us-history", unit: 2, day: 4, title: "Day 4 · Fight on the Home Front (Reading)", path: "wwii-graphic-reading/#day4", std: ["SS.9-12.US.29", "SS.9-12.US.31", "SS.9-12.US.33"] },
  "wwii-graphic-reading-day5":   { course: "us-history", unit: 2, day: 5, title: "Day 5 · Japanese American Incarceration Comics (Reading)", path: "wwii-graphic-reading/#day5", std: ["SS.9-12.US.31", "SS.9-12.US.33"] },

  // ---- Sociology · Unit 1 ----
  "sociology-day-1-reading":                  { course: "sociology", unit: 1, day: 1, title: "Day 1 · What Is Sociology? (Reading)", path: "sociology/day-1-reading/", std: ["SS.9-12.Soc.2"] },
  "sociology-day-2-sociological-imagination": { course: "sociology", unit: 1, day: 2, title: "Day 2 · The Sociological Imagination (Reading)", path: "sociology/day-2-sociological-imagination/", std: ["SS.9-12.Soc.2"] },
  "sociology-day-3-founders":                 { course: "sociology", unit: 1, day: 3, title: "Day 3 · Origins and Founders (Reading)", path: "sociology/day-3-founders/", std: ["SS.9-12.Soc.4"] },
  "sociology-day-4-perspectives":             { course: "sociology", unit: 1, day: 4, title: "Day 4 · Sociological Perspectives (Reading)", path: "sociology/day-4-perspectives/", std: ["SS.9-12.Soc.4"] },
  "sociology-theory-casebook":                { course: "sociology", unit: 1, day: 4, title: "Day 4 · Theory Casebook", path: "day-4-theory-casebook/", std: ["SS.9-12.Soc.4"] },
  "sociology-day-7-research-ethics":          { course: "sociology", unit: 1, day: 7, title: "Day 7 · Ethics in Sociological Research (Reading)", path: "sociology/day-7-research-ethics/", std: ["SS.9-12.Soc.1"] },
  "sociology-unit1-review-seahaven":          { course: "sociology", unit: 1, title: "Unit 1 Review · Escape from Seahaven", path: "sociology-ethics-review/", std: ["SS.9-12.Soc.2", "SS.9-12.Soc.4", "SS.9-12.Soc.1"] },

  // ---- Sociology · Unit 2 ----
  "sociology-unit2-day1-first-shift":         { course: "sociology", unit: 2, day: 1, title: "Day 1 · First Shift: Status, Roles & Norms", path: "sociology/unit2-day1-first-shift/", std: ["SS.9-12.Soc.5", "SS.9-12.Soc.6", "SS.9-12.Soc.7"] },
  "sociology-unit2-arrival-culture":          { course: "sociology", unit: 2, day: 2, title: "Day 2 · The Arrival: A New Culture", path: "sociology/arrival-culture/", std: ["SS.9-12.Soc.5", "SS.9-12.Soc.6"] },
  "sociology-unit2-day3-culture-shock":      { course: "sociology", unit: 2, day: 3, title: "Day 3 · Culture Shock Exchange", path: "sociology/unit2-day3-culture-shock-exchange/", std: ["SS.9-12.Soc.6", "SS.9-12.Soc.5"] },

  // ---- Government · Unit 1 ----
  "gov-stranded-day1":                { course: "government", unit: 1, day: 1, title: "Day 1 · Stranded: Govern or Collapse", path: "civics/stranded-government/", std: ["SS.9-12.Gov.1", "SS.9-12.Gov.5"] },
  "gov-my-country-day3":              { course: "government", unit: 1, day: 3, title: "Day 3 · My Country, My Rules", path: "civics/my-country-my-rules/", std: ["SS.9-12.Gov.1", "SS.9-12.Gov.4"] },
  "gov-articles-day5":                { course: "government", unit: 1, day: 5, title: "Day 5 · 13 States. One Mess.", path: "civics/articles-confederation-game/", std: ["SS.9-12.Gov.9"] },
  "gov-missing-constitution-day7":    { course: "government", unit: 1, day: 7, title: "Day 7 · The Missing Constitution", path: "civics/missing-constitution/", std: ["SS.9-12.Gov.4"] },
  "gov-democracy-visualized-day1":    { course: "government", unit: 1, day: 1, title: "Day 1 · Purposes of Government (Reading)", path: "civics/democracy-visualized/#day1", std: ["SS.9-12.Gov.1"] },
  "gov-democracy-visualized-day2":    { course: "government", unit: 1, day: 2, title: "Day 2 · Social Contract & Rule of Law (Reading)", path: "civics/democracy-visualized/#day2", std: ["SS.9-12.Gov.14"] },
  "gov-democracy-visualized-day7":    { course: "government", unit: 1, day: 7, title: "Day 7 · The Constitution (Reading)", path: "civics/democracy-visualized/#day7", std: ["SS.9-12.Gov.4"] },
  "gov-democracy-visualized-day9":    { course: "government", unit: 1, day: 9, title: "Day 9 · Federalism & Iowa Government (Reading)", path: "civics/democracy-visualized/#day9", std: ["SS.9-12.Gov.9"] },
  // ---- Government · Unit 1 · printed/outside resources from the Schoology day posts (links only, no turn-in) ----
  "gov-u1-d2-why-government": { course: "government", unit: 1, day: 2, turnIn: false, std: [], title: "Day 2 · Why Government? — iCivics (Printed)", path: "https://linkschool.org/wp-content/uploads/2024/06/Rising-7th-Grade-History.pdf" },
  "gov-u1-d2-why-government-key": { course: "government", unit: 1, day: 2, turnIn: false, std: [], title: "Day 2 · Why Government? Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/10454/assets/why_government_answer_key.pdf" },
  "gov-u1-d2-blooket": { course: "government", unit: 1, day: 2, turnIn: false, std: [], title: "Day 2 · Blooket", path: "https://dashboard.blooket.com/set/68cade675c6118507c3aacd4" },
  "gov-u1-d3-my-country-example": { course: "government", unit: 1, day: 3, turnIn: false, std: [], title: "Day 3 · My Country, My Rules Example", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQCdMhmH97u4SL9wlKVMH2n5AaYxphYqCYYHfmlLN1e0YKc?e=R3Rinw" },
  "gov-u1-d4-scavenger-hunt": { course: "government", unit: 1, day: 4, turnIn: false, std: [], title: "Day 4 · Founding-Idea Scavenger Hunt (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQADcWjqUzgBQoSnVOb7LNykAVObTUGWWPE1nDh5aqajXe8?e=IA4y6k" },
  "gov-u1-d5-aofc-together": { course: "government", unit: 1, day: 5, turnIn: false, std: [], title: "Day 5 · Articles of Confederation — Do Together", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQCUY660iFbdRqkeKEGH08rrATBTFIPSfFWgWYozVo_zlrI?e=Ygx6GN" },
  "gov-u1-d5-aoc": { course: "government", unit: 1, day: 5, turnIn: false, std: [], title: "Day 5 · Articles of Confederation (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDWzKQ8oz4RTKNS8_jCz9waAY1mQa7tEb58TEevIc7SvPU?e=8ERHfh" },
  "gov-u1-d6-compromises": { course: "government", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Constitutional Compromises — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/2624198/assets/major_clash_student_docs.pdf" },
  "gov-u1-d6-compromises-key": { course: "government", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Constitutional Compromises Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/2624198/assets/major_clash_answer_key.pdf" },
  "gov-u1-d6-fed-antifed": { course: "government", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Federalists vs. Anti-Federalists — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/403058/assets/federalists_and_anti-federalists_student_docs.pdf" },
  "gov-u1-d6-fed-antifed-key": { course: "government", unit: 1, day: 6, turnIn: false, std: [], title: "Day 6 · Federalists vs. Anti-Federalists Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/403058/assets/federalists_and_anti-federalists_answer_key.pdf" },
  "gov-u1-d7-notes": { course: "government", unit: 1, day: 7, turnIn: false, std: [], title: "Day 7 · Constitution Notes (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAwfWzZ2W9DTKAoWz9NNRRZAQfnJhpOBpCul4BVRPJmELU?e=dveBI4" },
  "gov-u1-d8-notes": { course: "government", unit: 1, day: 8, turnIn: false, std: [], title: "Day 8 · Bill of Rights Notes (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQCqn_k7nmtPSaVOcFMTyTGVAaV1F9ctGn30rNW751H_Sn8?e=LWjXHe" },
  "gov-u1-d8-matching": { course: "government", unit: 1, day: 8, turnIn: false, std: [], title: "Day 8 · Matching the Bill of Rights (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:p:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDkLW0Q7EiKRo61374-4jmZAboewXYpSzSZjYvdtkPRmYo?e=S6EmYZ" },
  "gov-u1-d8-do-i-have-a-right": { course: "government", unit: 1, day: 8, turnIn: false, std: [], title: "Day 8 · Do I Have a Right? — iCivics Game", path: "https://ed.icivics.org/resources/game/42/do-i-have-a-right" },
  "gov-u1-d9-fed-state-local": { course: "government", unit: 1, day: 9, turnIn: false, std: [], title: "Day 9 · Federal, State, Local or Shared? — Do Together", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAeTpymm_epSYB6uzJUoRCDAejc7s4Awhkr0Kqt5LPrTCA?e=B8W7yf" },
  "gov-u1-d9-federal-in-federalism": { course: "government", unit: 1, day: 9, turnIn: false, std: [], title: "Day 9 · The Federal in Federalism — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/562135/assets/the_federal_in_federalism_student_docs.pdf" },
  "gov-u1-d9-federal-in-federalism-key": { course: "government", unit: 1, day: 9, turnIn: false, std: [], title: "Day 9 · The Federal in Federalism Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/562135/assets/the_federal_in_federalism_answer_key.pdf" },
  "gov-u1-d10-review": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6a998e452d347390093ca079" },
  "gov-u1-d10-summative": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQCGLRsv7tXsQaDgBtq4yXFXAQuZIvlcnW9JtWfAPvag2J0?e=g8xWZh" },
  "gov-u1-d10-summative-key": { course: "government", unit: 1, day: 10, turnIn: false, std: [], title: "Day 10 · Summative Answer Key", path: "https://linnmarcsd-my.sharepoint.com/:b:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDTO0_A_K1YT5edC-U6trraAf9vzCIwAMgZy0LwzzLgsvg?e=rRINiN" },

  // ---- Government · Unit 2 ----
  "gov-unit2-day1-the-feed":          { course: "government", unit: 2, day: 1, title: "Day 1 · Decision Desk: Ideology vs. Party", path: "civics/unit2-day1-the-feed/", std: ["SS.9-12.Gov.12"] },
  "gov-unit2-day2-fair-game":         { course: "government", unit: 2, day: 2, title: "Day 2 · Fair Game: Comparing the Parties", path: "civics/unit2-day2-fair-game/", std: ["SS.9-12.Gov.12"] },
  "gov-unit2-day2-lobby-day":         { course: "government", unit: 2, day: 4, title: "Day 4 · Lobby Day: Interest Groups & Media", path: "civics/unit2-day2-lobby-day/", std: ["SS.9-12.Gov.12"] },
  // ---- Government · Unit 2 · activities from the Schoology day posts (links only, no turn-in) ----
  "gov-u2-d1-poster": { course: "government", unit: 2, day: 1, turnIn: false, std: [], title: "Days 1–3 · Political Party Poster (Printed)", path: "https://docs.google.com/document/d/1Z8OsrG8eBL8005dEy6XuV9o7wvWctfCvm4g2-h-AmFQ/edit?usp=sharing" },
  "gov-u2-d1-poster-directions": { course: "government", unit: 2, day: 1, turnIn: false, std: [], title: "Days 1–3 · Political Party Poster Directions", path: "https://linnmarcsd-my.sharepoint.com/:p:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDKPVnodH6XRaNjq_Hy3NjXATRK4fMXb5Pi0YSG_d-qA_k?e=C064xb" },
  "gov-u2-d2-pew-quiz": { course: "government", unit: 2, day: 2, turnIn: false, std: [], title: "Day 2 · Pew Political Typology Quiz (Optional)", path: "https://www.pewresearch.org/politics/quiz/political-typology/" },
  "gov-u2-d3-signal-break": { course: "government", unit: 2, day: 3, turnIn: false, std: [], title: "Day 3 · Signal Break (Game)", path: "https://signal-break-classroom.neotboy.chatgpt.site/" },
  "gov-u2-d4-interest-groups": { course: "government", unit: 2, day: 4, turnIn: false, std: [], title: "Day 4 · Interest Groups — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/166930/assets/interest_groups_student_docs.pdf" },
  "gov-u2-d4-interest-groups-key": { course: "government", unit: 2, day: 4, turnIn: false, std: [], title: "Day 4 · Interest Groups Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/166930/assets/interest_groups_answer_key.pdf" },
  "gov-u2-d5-election-sim": { course: "government", unit: 2, day: 5, turnIn: false, std: [], title: "Day 5 · Presidential Election Simulation (2 Player)", path: "https://misterharms.com/games/electoral-college-map-game" },
  "gov-u2-d5-win-white-house": { course: "government", unit: 2, day: 5, turnIn: false, std: [], title: "Day 5 · Win the White House — iCivics Game", path: "https://ed.icivics.org/resources/game/67038/win-the-white-house" },
  "gov-u2-d6-civics-exam": { course: "government", unit: 2, day: 6, turnIn: false, std: [], title: "Day 6 · Civics Exam (Google Form)", path: "https://docs.google.com/forms/d/e/1FAIpQLSfDhGXMg7OP24DFhTdPQnHNsOoGgSS-pnDWpKadJ1U2smjpoA/viewform?usp=publish-editor" },
  "gov-u2-d7-review": { course: "government", unit: 2, day: 7, turnIn: false, std: [], title: "Day 7 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6aa09dfe760efeaa1135c5b7" },
  "gov-u2-d7-summative": { course: "government", unit: 2, day: 7, turnIn: false, std: [], title: "Day 7 · Summative", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQAsHiWOSrOESo-agkGYeF-6AcU5jvfuw1oM0UYp-KPoIKo?e=9mAl4u" },
  "gov-u2-d7-summative-key": { course: "government", unit: 2, day: 7, turnIn: false, std: [], title: "Day 7 · Summative Answer Key", path: "https://linnmarcsd-my.sharepoint.com/:w:/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDHa8vAMIBIQq5Z_igFdj6EAYotMPKNH6Y9D9sYH6g1-IY?e=Xz0RaZ" },

  // ---- Government · Unit 3 (Judicial) · activities from the Schoology day posts (links only, no turn-in) ----
  "gov-u3-argument-wars": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Days 1–2 · Argument Wars — iCivics Game", path: "https://ed.icivics.org/games/argument-wars" },
  "gov-u3-court-quest": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Days 1–2 · Court Quest — iCivics Game", path: "https://ed.icivics.org/node/853/resource#game-page-flash-game-container" },
  "gov-u3-d1-interpreting": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Day 1 · Interpreting the Constitution — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/587/assets/interpreting_the_constitution_student_docs.pdf" },
  "gov-u3-d1-interpreting-key": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Day 1 · Interpreting the Constitution Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/587/assets/interpreting_the_constitution_answer_key.pdf" },
  "gov-u3-d1-supreme": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Day 1 · Supreme in Supreme Court — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/616/assets/supreme_in_supreme_court_student_docs.pdf" },
  "gov-u3-d1-supreme-key": { course: "government", unit: 3, day: 1, turnIn: false, std: [], title: "Day 1 · Supreme in Supreme Court Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/616/assets/supreme_in_supreme_court_answer_key.pdf" },
  "gov-u3-d2-case-project-example": { course: "government", unit: 3, day: 2, turnIn: false, std: [], title: "Day 2 · Supreme Court Case Project Example", path: "https://linnmarcsd-my.sharepoint.com/:p/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQD0fz0PCgvAQpJPlX--T7xSAXLSoDIix8Gs28wZ_90Rbb0?e=5oLw6R" },
  "gov-u3-d3-review": { course: "government", unit: 3, day: 3, turnIn: false, std: [], title: "Day 3 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6abe6bb22cd0b625b10babad" },
  "gov-u3-d3-summative": { course: "government", unit: 3, day: 3, turnIn: false, std: [], title: "Day 3 · Judicial Summative", path: "https://linnmarcsd-my.sharepoint.com/:w/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQA6E-D0L4FZSqQHsenxDH2oAeCuLKZWepPZbSuON2jwoDc?e=64u4TI" },
  // ---- Government · Unit 4 (Legislative) ----
  "gov-u4-d1-branches-of-power": { course: "government", unit: 4, day: 1, turnIn: false, std: [], title: "Day 1 · Branches of Power — iCivics Game", path: "https://ed.icivics.org/resources/game/74/branches-of-power" },
  "gov-u4-d1-first-branch": { course: "government", unit: 4, day: 1, turnIn: false, std: [], title: "Day 1 · First Branch — iCivics (Printed)", path: "https://ed.icivics.org/resources/lesson_plan/3018136/first-branch-legislative" },
  "gov-u4-congress-drop": { course: "government", unit: 4, day: 1, turnIn: false, std: [], title: "Days 1–2 · Congress Drop (Game)", path: "https://congress-drop-live.floot.app/" },
  "gov-u4-lawcraft": { course: "government", unit: 4, day: 2, turnIn: false, std: [], title: "Days 2–3 · LawCraft — iCivics Game", path: "https://ed.icivics.org/resources/game/593/lawcraft" },
  "gov-u4-d2-poster": { course: "government", unit: 4, day: 2, turnIn: false, std: [], title: "Day 2 · Bill to Law Poster (Printed)", path: "https://linnmarcsd-my.sharepoint.com/:b/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQDZKivJQTMCToTLxsbAvRx-AeG08DTtcj8cNcXV4pUvvK0?e=4TfkoA" },
  "gov-u4-d3-scenario-game": { course: "government", unit: 4, day: 3, turnIn: false, std: [], title: "Day 3 · Congress Scenario Game", path: "https://capitol-crisis-live.floot.app/" },
  "gov-u4-d4-review": { course: "government", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6ac2eab3b78211c196153a34" },
  "gov-u4-d4-summative": { course: "government", unit: 4, day: 4, turnIn: false, std: [], title: "Day 4 · Legislative Summative", path: "https://docs.google.com/document/d/1xCF77ZzM9EnyxgAWGcdPArbRrlAvzOpACsMcbn4hEOc/edit?usp=sharing" },
  // ---- Government · Unit 5 (Executive) ----
  "gov-u5-d1-for-the-president": { course: "government", unit: 5, day: 1, turnIn: false, std: [], title: "Day 1 · For the President: All in a Day's Work — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/613/assets/for_the_president_all_in_a_days_work_student_docs.pdf" },
  "gov-u5-d1-for-the-president-key": { course: "government", unit: 5, day: 1, turnIn: false, std: [], title: "Day 1 · For the President Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/613/assets/for_the_president_all_in_a_days_work_answer_key.pdf" },
  "gov-u5-d2-second-branch": { course: "government", unit: 5, day: 2, turnIn: false, std: [], title: "Day 2 · Second Branch: The Executive — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/3184562/assets/second_branch_the_executive_hs_student_docs.pdf" },
  "gov-u5-d2-second-branch-key": { course: "government", unit: 5, day: 2, turnIn: false, std: [], title: "Day 2 · Second Branch Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/3184562/assets/second_branch_the_executive_hs_answer_key.pdf" },
  "gov-u5-d3-very-big-branch": { course: "government", unit: 5, day: 3, turnIn: false, std: [], title: "Day 3 · A Very Big Branch — iCivics (Printed)", path: "https://ed.icivics.org/resource-assets/lesson_plan/317985/assets/a_very_big_branch_student_docs.pdf" },
  "gov-u5-d3-very-big-branch-key": { course: "government", unit: 5, day: 3, turnIn: false, std: [], title: "Day 3 · A Very Big Branch Answer Key", path: "https://ed.icivics.org/resource-assets/lesson_plan/317985/assets/a_very_big_branch_answer_key.pdf" },
  "gov-u5-d3-executive-command": { course: "government", unit: 5, day: 3, turnIn: false, std: [], title: "Day 3 · Executive Command — iCivics Game", path: "https://ed.icivics.org/games/executive-command" },
  "gov-u5-d4-review": { course: "government", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Summative Review (Blooket)", path: "https://dashboard.blooket.com/set/6ac83efba124fe7811777ef9" },
  "gov-u5-d4-summative": { course: "government", unit: 5, day: 4, turnIn: false, std: [], title: "Day 4 · Executive Summative", path: "https://linnmarcsd-my.sharepoint.com/:w/g/personal/fynnley_toppert_linnmar_k12_ia_us/IQCzCufjdG-FT7lgR_cdXoIEAcIqSvc7-LB8rbHBlK7eOIM?e=aTJ8tU" },

  // ---- Civics (Iowa civics test prep) · Friday 1 ----
  "civics-test-s1-presentation":     { course: "civics", hideLink: true, unit: 1, title: "Founders' Files (Slides)", path: "civics/civics-test-s1-presentation/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.4"] },
  "civics-test-s1-founders-defense":  { course: "civics", unit: 1, title: "Founders' Defense", path: "civics/civics-test-s1-founders-defense/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.4"] },

  // ---- Civics (Iowa civics test prep) · Fridays 2–7 (exit tickets on each Friday's presentation) ----
  "civics-f2-presentation": { course: "civics", hideLink: true, unit: 2, title: "How the Government Works (Slides)", path: "civics/friday2-government-presentation/", std: ["SS.9-12.Gov.6", "SS.9-12.Gov.7", "SS.9-12.Gov.8"] },
  "civics-f2-government-arcade": { course: "civics", unit: 2, title: "Government Arcade", path: "civics/day2-government-arcade/", std: ["SS.9-12.Gov.6", "SS.9-12.Gov.7", "SS.9-12.Gov.8", "SS.9-12.Gov.9", "SS.9-12.Gov.18"] },
  "civics-f3-presentation": { course: "civics", hideLink: true, unit: 3, title: "Rights & Responsibilities (Slides)", path: "civics/friday3-rights-presentation/", std: ["SS.9-12.Gov.14", "SS.9-12.Gov.17"] },
  "civics-f3-pixel-town": { course: "civics", unit: 3, title: "Pixel Town: Civic Quest", path: "civics/pixel-town-day3-game/", std: ["SS.9-12.Gov.13", "SS.9-12.Gov.14", "SS.9-12.Gov.17"] },
  "civics-f4-presentation": { course: "civics", hideLink: true, unit: 4, title: "The 1776 Files (Slides)", path: "civics/friday4-1776-presentation/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.15"] },
  "civics-f4-1776-files": { course: "civics", unit: 4, title: "The 1776 Files", path: "civics/friday4-1776-files-game/", std: ["SS.9-12.Gov.3", "SS.9-12.Gov.15"] },
  "civics-f5-presentation": { course: "civics", hideLink: true, unit: 5, title: "The 1800s (Slides)", path: "civics/friday5-1800s-civics-presentation/", std: ["SS.9-12.Gov.14", "SS.9-12.Gov.15", "SS.9-12.Gov.3"] },
  "civics-f5-1800s-express": { course: "civics", unit: 5, title: "The 1800s Express", path: "civics/friday5-1800s-express-game/", std: ["SS.9-12.Gov.14", "SS.9-12.Gov.15", "SS.9-12.Gov.3"] },
  "civics-f6-presentation": { course: "civics", hideLink: true, unit: 6, title: "Modern America (Slides)", path: "civics/friday6-modern-america-presentation/", std: ["SS.9-12.Gov.11", "SS.9-12.Gov.14", "SS.9-12.Gov.15"] },
  "civics-f7-presentation": { course: "civics", hideLink: true, unit: 7, title: "Symbols, Holidays & Final Review (Slides)", path: "civics/friday7-symbols-final-review-presentation/", std: ["SS.9-12.Gov.16"] },
  // Added 2026-11-01: past Drive assignments the review team rated STRONG, linked on their lesson days (Google Drive)
  "ush-p1u1-d1-packet": { course: "us-history", unit: 1, day: 1, part: 1, title: "Day 1 · Unit 1 Student Packet, Day 1 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, std: ["SS.9-12.US.2", "SS.9-12.US.1"] },
  "ush-p1u1-d2-packet": { course: "us-history", unit: 1, day: 2, part: 1, title: "Day 2 · Unit 1 Student Packet, Day 2 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, std: ["SS.9-12.US.2"] },
  "ush-p1u1-d3-packet": { course: "us-history", unit: 1, day: 3, part: 1, title: "Day 3 · Unit 1 Student Packet, Day 3 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, std: ["SS.9-12.US.3", "SS.9-12.US.2"] },
  "ush-p1u1-d3-federalists": { course: "us-history", unit: 1, day: 3, part: 1, title: "Day 3 · Federalists vs. Anti-Federalists (Reading)", path: "https://drive.google.com/open?id=1A5hmrLDCYXa4IKU8kd3R3j5i7t-RWqdd7VNMewvjqa0", turnIn: false, std: ["SS.9-12.US.3", "SS.9-12.US.2"] },
  "ush-p1u1-d4-packet": { course: "us-history", unit: 1, day: 4, part: 1, title: "Day 4 · Unit 1 Student Packet, Day 4 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, std: ["SS.9-12.US.2"] },
  "ush-p1u1-d4-seven-principles": { course: "us-history", unit: 1, day: 4, part: 1, title: "Day 4 · Seven Principles: How the Constitution Works (Reading)", path: "https://drive.google.com/open?id=1AHhdJuc2ZG1zFpiVs9Sxf5hkIrhZtVQ25pZ5eZRzmSo", turnIn: false, std: ["SS.9-12.US.2"] },
  "ush-p1u1-d5-packet": { course: "us-history", unit: 1, day: 5, part: 1, title: "Day 5 · Unit 1 Student Packet, Day 5 section", path: "https://drive.google.com/open?id=1-O0FuUrpaHeRNvMSvtS_bwbD0_tz1EZh5eebEFfjbjk", turnIn: false, std: ["SS.9-12.US.1"] },
  "ush-p1u4-d2-haymarket": { course: "us-history", unit: 4, day: 2, part: 1, title: "Day 2 · Haymarket Affair Worksheet", path: "https://drive.google.com/open?id=12pgD7FK8Z_xgHZwUhsGsGj-I9KM27Q22d0vUVF0YxSQ", turnIn: false, std: ["SS.9-12.US.14"] },
  "ush-p1u4-d2-labor-investigation": { course: "us-history", unit: 4, day: 2, part: 1, title: "Day 2 · Organized Labor Investigation (Reading)", path: "https://drive.google.com/open?id=1wfoU-m0Ke2md-f6vZ-JFdQ-IpQ-lqIJ8ExR5_t5m05E", turnIn: false, std: ["SS.9-12.US.14"] },
  "ush-p1u4-d5-tr-thdh": { course: "us-history", unit: 4, day: 5, part: 1, title: "Day 5 · Theodore Roosevelt and Progressivism Worksheet", path: "https://drive.google.com/open?id=1b2d60z-NBhqn3rQBXyn8L15ZufpBuC2-hm7wZ1pNOO4", turnIn: false, std: ["SS.9-12.US.16", "SS.9-12.US.14"] },
  "ush-p1u4-d5-trust-busting": { course: "us-history", unit: 4, day: 5, part: 1, title: "Day 5 · Theodore Roosevelt and Trust-Busting (Reading)", path: "https://drive.google.com/open?id=1rpMNqAHvTlzFM6tcKbth2gNwGwTSr1R4iQ4Y5kCClYY", turnIn: false, std: ["SS.9-12.US.16", "SS.9-12.US.14"] },
  "ush-p1u4-d6-suffrage-slides": { course: "us-history", unit: 4, day: 6, part: 1, title: "Day 6 · Background on Woman Suffrage (Slides activity)", path: "https://drive.google.com/open?id=1GjfpbLhFJIp0SH66GcJ0kLrn2k498RhM-ZKkK3tmCNc", turnIn: false, std: ["SS.9-12.US.15", "SS.9-12.US.18"] },
  "ush-u1-d3-hoover": { course: "us-history", unit: 1, day: 3, title: "Day 3 · Herbert Hoover Worksheet", path: "https://drive.google.com/open?id=1YRo56kP-wiGkUGsEPkv2xymekeG_Rp7W9snxmh9gUQo", turnIn: false, std: ["SS.9-12.US.25", "SS.9-12.US.27", "SS.9-12.US.28"] },
  "ush-u1-d3-new-deal-cards": { course: "us-history", unit: 1, day: 3, title: "Day 3 · FDR New Deal Matching Game", path: "https://drive.google.com/open?id=1rU8GSXLTfY1s3l5MaDP3A95HlQmJSLs7", turnIn: false, std: ["SS.9-12.US.25", "SS.9-12.US.27"] },
  "ush-u1-d3-new-deal-key": { course: "us-history", unit: 1, day: 3, title: "Day 3 · FDR New Deal Matching Answer Key", path: "https://drive.google.com/open?id=15UsD54tB5kRQZZmMp7lGnBMYbNlcVoKyiE04P7CCoVs", turnIn: false, std: ["SS.9-12.US.25", "SS.9-12.US.27"] },
  "ush-u2-d8-home-front-sim": { course: "us-history", unit: 2, day: 8, title: "Day 8 · Home Front Ration Simulation", path: "https://drive.google.com/open?id=17CH8_SpnMz54iIJ7oA4YMdqyCD1PmgtzhjqlirbH0ig", turnIn: false, std: ["SS.9-12.US.34"] },
  "ush-u2-d8-homefront-dfq": { course: "us-history", unit: 2, day: 8, title: "Day 8 · WWII Homefront Focus Questions (Slides activity)", path: "https://drive.google.com/open?id=19uhpIhcWPXHX5nfJpYNVjO5_nYmZ6cwd9m0PCWxUUdo", turnIn: false, std: ["SS.9-12.US.34"] },
  "ush-u3-d1-truman-doctrine": { course: "us-history", unit: 3, day: 1, title: "Day 1 · The Truman Doctrine: America Steps In (Reading)", path: "https://drive.google.com/open?id=11BS7ufS9cp8tpELqEBStfMjMkzv3C_ag1ZNkLt3nqFE", turnIn: false, std: ["SS.9-12.US.37", "SS.9-12.US.39"] },
  "ush-u3-d1-cold-war-origins": { course: "us-history", unit: 3, day: 1, title: "Day 1 · The Origins of the Cold War (Reading)", path: "https://drive.google.com/open?id=1SAPXvaXqUYcICqKA52mE1CGj8CYKwPPEU-dLHd17ws8", turnIn: false, std: ["SS.9-12.US.37", "SS.9-12.US.40"] },
  "ush-u3-d3-korea-doc": { course: "us-history", unit: 3, day: 3, title: "Day 3 · The Korean War (Reading)", path: "https://drive.google.com/open?id=1hLtciIl1rjuDHikiBMYyXWuXMLXm71YUfISknkxVzZ4", turnIn: false, std: ["SS.9-12.US.35", "SS.9-12.US.37", "SS.9-12.US.40"] },
  "ush-u3-d5-cuba-reading": { course: "us-history", unit: 3, day: 5, title: "Day 5 · Bay of Pigs and Cuban Missile Crisis (Reading)", path: "https://drive.google.com/open?id=1jnCeFsvXB9JYH-Ey-3AsKZPfMBbQj8tL4vHs6zGqmXQ", turnIn: false, std: ["SS.9-12.US.35", "SS.9-12.US.37", "SS.9-12.US.40"] },
  "ush-u3-d5-cuba-webquest": { course: "us-history", unit: 3, day: 5, title: "Day 5 · Cuban Missile Crisis Webquest", path: "https://drive.google.com/open?id=1Y1hyE8ikfbFXq5TNa_eqKPhIhTiuq_XJb9qfbkuzS9A", turnIn: false, std: ["SS.9-12.US.35", "SS.9-12.US.37", "SS.9-12.US.40"] },
  "ush-u3-d6-vietnam-opposition": { course: "us-history", unit: 3, day: 6, title: "Day 6 · Opposition to the Vietnam War (Reading)", path: "https://drive.google.com/open?id=1kqzbONo56vuZ1-XLaLc8dicHWc-CaVnJJVxc1yF0yKk", turnIn: false, std: ["SS.9-12.US.35", "SS.9-12.US.40"] },
  "ush-u3-d6-vietnam-beginnings": { course: "us-history", unit: 3, day: 6, title: "Day 6 · Why the U.S. Entered Vietnam (Reading)", path: "https://drive.google.com/open?id=1hFdZJ1w5oA_aq0hUCEKO8p5CPBmdbVulESFdo6BAwpA", turnIn: false, std: ["SS.9-12.US.35", "SS.9-12.US.37"] },
  "ush-u4-d1-brown": { course: "us-history", unit: 4, day: 1, title: "Day 1 · Brown v. Board of Education (Reading)", path: "https://drive.google.com/open?id=1pxiIVxsTUsj_hUfu4soi6QbPW42EQnl9lK_JhnBaNGw", turnIn: false, std: ["SS.9-12.US.42", "SS.9-12.US.43", "SS.9-12.US.44"] },
  "ush-u4-d2-protest": { course: "us-history", unit: 4, day: 2, title: "Day 2 · Protest, Resistance, and Change (Reading)", path: "https://drive.google.com/open?id=1XqSnYEfwlvEDxfpGRGNyGxwE_gyE3AjjpFnFYFW_4B0", turnIn: false, std: ["SS.9-12.US.42", "SS.9-12.US.43", "SS.9-12.US.44"] },
  "ush-u4-d3-movements": { course: "us-history", unit: 4, day: 3, title: "Day 3 · Movements: Who Else Fought (Reading)", path: "https://drive.google.com/open?id=1FNDhLY72kcVwEFqzjrPeX0YXaWGa3qnmU4089DgfUS4", turnIn: false, std: ["SS.9-12.US.42", "SS.9-12.US.44"] },
  "ush-u5-d1-reagan": { course: "us-history", unit: 5, day: 1, title: "Day 1 · Reagan and the Conservative Resurgence (Reading)", path: "https://drive.google.com/open?id=1a6bbloVBoDFMVpRsal0NmjfspPM3QXN8UPW72RzKS9A", turnIn: false, std: ["SS.9-12.US.46", "SS.9-12.US.47", "SS.9-12.US.49"] },
  "ush-u5-d4-end-cold-war": { course: "us-history", unit: 5, day: 4, title: "Day 4 · End of the Cold War (Reading)", path: "https://drive.google.com/open?id=1DHUmfABax-NAMi2QIk-JDiJIcWKmyRJKRWzS5SRz3Gs", turnIn: false, std: ["SS.9-12.US.48", "SS.9-12.US.49", "SS.9-12.US.50"] },
  "ush-u5-d4-world-transformed": { course: "us-history", unit: 5, day: 4, title: "Day 4 · A World Transformed + Timeline (Reading)", path: "https://drive.google.com/open?id=144YSHJ1k5ZuEILjM2BinPkr8M2tb1W5xPE4sKdlG-Gg", turnIn: false, std: ["SS.9-12.US.48", "SS.9-12.US.50"] },
  "ush-u6-d1-911": { course: "us-history", unit: 6, day: 1, title: "Day 1 · 9/11 Two-Part Reading (Reading)", path: "https://drive.google.com/open?id=1YvtAUDBxO3B11PREwBZyvhiD_ll8XXxmQ_MTa8NFJTE", turnIn: false, std: ["SS.9-12.US.52", "SS.9-12.US.53", "SS.9-12.US.55"] },
  "ush-u6-d2-recession-sim": { course: "us-history", unit: 6, day: 2, title: "Day 2 · Surviving the Great Recession Simulation", path: "https://drive.google.com/open?id=1zFcxwRTL40rquiQBlg9A8C9xy3fNwyI6BXLamTr59fo", turnIn: false, std: ["SS.9-12.US.53", "SS.9-12.US.55"] },
  "ush-u6-d2-recession-reading": { course: "us-history", unit: 6, day: 2, title: "Day 2 · What Was the Great Recession? (Reading)", path: "https://drive.google.com/open?id=1kUwEOzdYwcGyATzIfbCpZ498Mrp_g7xUXbrZekEVxnk", turnIn: false, std: ["SS.9-12.US.53"] },
  "ush-u6-d4-disability": { course: "us-history", unit: 6, day: 4, title: "Day 4 · Disability Rights Movement (Reading)", path: "https://drive.google.com/open?id=1p0738lXhj-rBV8fjOGyWGFtrV2cdwxeome7AjGoW-gI", turnIn: false, std: ["SS.9-12.US.51", "SS.9-12.US.56"] },
  "wh-p1u1-d4-ch17": { course: "world-history", unit: 1, day: 4, part: 1, title: "Day 4 · Chapter 17: Conquest of the Aztec and Inca (Reading)", path: "https://drive.google.com/open?id=1Be517gii6s8MtMj3-Oe1_IPOewOVteOnpXY5ql4GbN0", turnIn: false, std: ["SS.9-12.WH.3", "SS.9-12.WH.1"] },
  "wh-p1u1-d5-found-poem": { course: "world-history", unit: 1, day: 5, part: 1, title: "Day 5 · Slave Trade and Found Poem (Slides activity)", path: "https://drive.google.com/open?id=1ZSwkOooOSI--PJrQa2FhoUukqbt98tZUupEiWn3L_Rw", turnIn: false, std: ["SS.9-12.WH.1", "SS.9-12.WH.3", "SS.9-12.WH.4"] },
  "wh-u2-d4-mao": { course: "world-history", unit: 2, day: 4, title: "Day 4 · Mao Zedong's China (Reading)", path: "https://drive.google.com/open?id=1JzDh5PPnzoNuHVz6w_Lo7KGIlE-5DlAM3Y_Hx_Fd3VU", turnIn: false, std: ["SS.9-12.WH.34", "SS.9-12.WH.35", "SS.9-12.WH.38"] },
  "wh-u2-d6-india": { course: "world-history", unit: 2, day: 6, title: "Day 6 · The Indian Subcontinent Achieves Freedom (Reading)", path: "https://drive.google.com/open?id=11oyS3ZKwI03fpZHa6FI7Cpo331yY4-QaLikv7dYoYn0", turnIn: false, std: ["SS.9-12.WH.36", "SS.9-12.WH.34"] },
  "wh-u2-d7-africa-doc": { course: "world-history", unit: 2, day: 7, title: "Day 7 · New Nations in Africa (Reading)", path: "https://drive.google.com/open?id=1rYuR06gcXLtHd_3MQigCF4LF62ILM9jgYSYyxDsFeIQ", turnIn: false, std: ["SS.9-12.WH.36", "SS.9-12.WH.34", "SS.9-12.WH.37"] },
  "wh-u2-d8-vietnam-doc": { course: "world-history", unit: 2, day: 8, title: "Day 8 · The Beginnings of the Vietnam War (Reading)", path: "https://drive.google.com/open?id=1hFdZJ1w5oA_aq0hUCEKO8p5CPBmdbVulESFdo6BAwpA", turnIn: false, std: ["SS.9-12.WH.36", "SS.9-12.WH.37", "SS.9-12.WH.34"] },
  "wh-u2-d11-berlin-wall": { course: "world-history", unit: 2, day: 11, title: "Day 11 · The Fall of the Berlin Wall (Reading)", path: "https://drive.google.com/open?id=19TEWDbCnxiEwOPMHpAux8BVNsinyG5qKcCREzR0ZuBQ", turnIn: false, std: ["SS.9-12.WH.34", "SS.9-12.WH.37", "SS.9-12.WH.35"] },
  "wh-u2-d11-us-berlin-wall": { course: "world-history", unit: 2, day: 11, title: "Day 11 · The U.S. and the Berlin Wall (Reading)", path: "https://drive.google.com/open?id=1ZjLAqi334enEqQxycbnhAFdA34ZY9teaCvsF1IS_9n0", turnIn: false, std: ["SS.9-12.WH.34", "SS.9-12.WH.37"] },
  "soc-u1-d5-scientific-method": { course: "sociology", unit: 1, day: 5, title: "Day 5 · Crash Course: Scientific Method Questions", path: "https://drive.google.com/open?id=1OKH-p3brWdiSjryrCJE06-utsoV9erDGv_ztK_VR0os", turnIn: false, std: ["SS.9-12.Soc.1"] },
  "soc-u1-d6-research-methods": { course: "sociology", unit: 1, day: 6, title: "Day 6 · Crash Course: Research Methods Questions", path: "https://drive.google.com/open?id=1RKy8GHhNhsoUZ-gw8rbSSpPyEu0NmPjnFJD1ZPqYSX0", turnIn: false, std: ["SS.9-12.Soc.1"] },
  "soc-u1-d6-experiment-chart": { course: "sociology", unit: 1, day: 6, title: "Day 6 · Famous Experiments Ethics Chart", path: "https://drive.google.com/open?id=1dVGWlc064giIBIBj08foW1VzOQDNjcFm6W-fArL8E74", turnIn: false, std: ["SS.9-12.Soc.1"] },
  "soc-u2-d4-social-movements": { course: "sociology", unit: 2, day: 4, title: "Day 4 · Social Movements (Reading)", path: "https://drive.google.com/open?id=1LZIUX1gabFDQLvIhtzJUhKshmoZffvX4DXY6Gq5547g", turnIn: false, std: ["SS.9-12.Soc.7", "SS.9-12.Soc.8"] },
  "soc-u2-d4-collective-behavior": { course: "sociology", unit: 2, day: 4, title: "Day 4 · Collective Behavior & Movements Questions", path: "https://drive.google.com/open?id=1M8EwVKHGDaYIDpLp59xDN9hhsw1kGZ7-iKVbZ-6kpsc", turnIn: false, std: ["SS.9-12.Soc.7", "SS.9-12.Soc.8"] },
  "soc-u2-d5-institutions": { course: "sociology", unit: 2, day: 5, title: "Day 5 · How Social Institutions Shape People, Day 1 section (Reading)", path: "https://drive.google.com/open?id=1VsocS6lgQyKgYZjft3vjaKE_Gu3VIthg2mm2Z04Ij1w", turnIn: false, std: ["SS.9-12.Soc.5", "SS.9-12.Soc.6", "SS.9-12.Soc.7", "SS.9-12.Soc.8"] },
  "soc-u3-d1-socialization": { course: "sociology", unit: 3, day: 1, title: "Day 1 · Crash Course: Socialization Fill-in", path: "https://drive.google.com/open?id=19qO_9QNxn-EMr26EYmV0JwvggFwiE79o-bSezTTFPvg", turnIn: false, std: ["SS.9-12.Soc.9"] },
  "soc-u3-d5-cults": { course: "sociology", unit: 3, day: 5, title: "Day 5 · How Cults Connect to Sociology (Reading)", path: "https://drive.google.com/open?id=1euCEmykOCZdTwezBNsualRmjw2vuv4nYW0M65oLeTj4", turnIn: false, std: ["SS.9-12.Soc.11"] },
  "soc-u4-d2-power-stratification": { course: "sociology", unit: 4, day: 2, title: "Day 2 · Power and Social Stratification (Reading)", path: "https://drive.google.com/open?id=1n9760ZCbQwEkyehSUWKpsLDU2tMmuSW2xsG3VSKC7ME", turnIn: false, std: ["SS.9-12.Soc.12", "SS.9-12.Soc.13"] },
  "soc-u4-d6-movements-inequality": { course: "sociology", unit: 4, day: 6, title: "Day 6 · Social Movements and Inequality (Reading)", path: "https://drive.google.com/open?id=1_1sWnA6DzuEZlgG_HKDASxd4KDD4S9vhvxR2yUc1ytY", turnIn: false, std: ["SS.9-12.Soc.15"] },
  "gov-u6-d1-checks-balances-doc": { course: "government", unit: 6, day: 1, title: "Day 1 · Checks and Balances (Reading)", path: "https://drive.google.com/open?id=1etuyfGaggPmCvaJt6AMEcYTcKuaRMEqqQhkU44AIBe4", turnIn: false, std: ["SS.9-12.Gov.4", "SS.9-12.Gov.9"] },
  "gov-u6-d1-federalist-51": { course: "government", unit: 6, day: 1, title: "Day 1 · Exploring Federalist No. 51 (Reading)", path: "https://drive.google.com/open?id=1Bt4Wp6hZnBURK5aCZLh017AeWEhOfmdFm5Sie2jFhfo", turnIn: false, std: ["SS.9-12.Gov.4", "SS.9-12.Gov.9"] },
  "gov-u6-d2-iowa-diagrams": { course: "government", unit: 6, day: 2, title: "Day 2 · Iowa Government Structure Diagrams", path: "https://drive.google.com/open?id=1sbQm3POEgR3-JLyWDH7Y2LZYedUANq7yvIMVmi2KoU8", turnIn: false, std: ["SS.9-12.Gov.18", "SS.9-12.Gov.20"] },
  "gov-u6-d2-marion-local": { course: "government", unit: 6, day: 2, title: "Day 2 · Local Governments: Marion (Reading)", path: "https://drive.google.com/open?id=1Mrcx2EpKQyCXqDadGEarMcEnl9P3mfjl9Dsp5DaN-kM", turnIn: false, std: ["SS.9-12.Gov.20"] }
};

// Iowa standard wording (Iowa Academic Standards for Social Studies) for every standard an in-use activity covers.
window.CLASS_STANDARDS = {
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
  "SS.9-12.Gov.20": "Identify the functions and organizational structures of Iowa's local governments."
};

// Works out the class for any id, even one not listed above.
window.classCourseFor = function (id) {
  id = String(id || "");
  const known = window.CLASS_ASSIGNMENTS[id];
  if (known) return known.course;
  if (id.startsWith("sociology-")) return "sociology";
  if (id.startsWith("civics-")) return "civics";
  if (id.startsWith("gov-")) return "government";
  if (id.startsWith("ush-") || id.startsWith("us-history-") || id.startsWith("wwii-graphic-reading")) return "us-history";
  return "world-history";
};
