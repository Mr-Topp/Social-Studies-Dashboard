// =====================================================================
//  PROVE IT LAB  ·  Sociology Unit 1 · Day 5 (Part 1) + Day 6 (Part 2)
//  Rebuilt 2026-11-15 (Fynn: connect Prove It Lab + Research Rivals as Part 1 and Part 2;
//  students must prove themselves before moving on; more fun, less all over the place;
//  he likes the lab as it is, so the lab, Kai and Dr. Ruiz stay).
//
//  PART 1 (Day 5, turns in as soc-u1-d5-prove-hot-take, SS.9-12.Soc.1)
//    Pick Kai's hot take → Ask → Research → Predict (IV/DV) → Design → Run → Peer review
//    → Supported? → Cause? → Headline → Post your Community Note → BOSS: Kai's Comeback → Lab report
//  PART 2 (Day 6, turns in as soc-u1-d6-study-people, SS.9-12.Soc.1 + Soc.3)
//    Recap → Try 5 tools on your topic → Match → 3 clients → Real ethics case → The $500 deal
//    → Mixed methods → Ending → BOSS: Kai's Comeback 2 → Research report
//
//  "Prove it" rules (real students):
//   • A wrong answer locks for 2 s, then gives a NEW question on the same skill (never the same one reshuffled).
//   • Boss: a wrong call-out loses that card AND adds a fresh card of the same kind to Kai's pile.
//   • Part 2 stays locked until Part 1 is turned in on this Chromebook, or the student beats
//     Part 1's boss right there (for kids who did Part 1 on another Chromebook).
//  Test T. skips everything (locks, gates, writing rules) — hook at the bottom.
//  Kai, Dr. Ruiz, the lab, clients and all game numbers are made up. Real cases are labeled.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u1-prove-it-lab-v1";
  const OLD_D5 = "soc-u1-d5-prove-hot-take-v4";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const PARTS = {
    1: { id: "soc-u1-d5-prove-hot-take", title: "Sociology · Unit 1 · Day 5 · Prove It Lab, Part 1: Test the Hot Take", std: "SS.9-12.Soc.1" },
    2: { id: "soc-u1-d6-study-people", title: "Sociology · Unit 1 · Day 6 · Prove It Lab, Part 2: Research Rivals", std: "SS.9-12.Soc.1, SS.9-12.Soc.3" }
  };
  const DAYS = 4;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const pickOne = a => a[Math.floor(Math.random() * a.length)];
  const isT = () => !!(window.classIsTestT && window.classIsTestT());
  const lockSecs = () => (isT() ? 0 : 2);

  // =================================================================
  //  DATA
  // =================================================================
  const TOPICS = {
    sleep: {
      ic: "📱", name: "Phones & sleep", take: "Scrolling till 2 a.m. doesn't mess up your sleep 😤", views: 2400000,
      iv: "Phone use after midnight", dv: "Hours of sleep", dvShort: "hours of sleep", ivShort: "late-night phone use", decoy: "Favorite app",
      ga: "📱 On phone after midnight", gb: "😴 Phone off by midnight", who: "on their phone after midnight", than: "than students who put the phone away",
      unit: "Hours of sleep a night (average)", max: 10, va: 6.1, vb: 7.4, fmt: v => v.toFixed(1) + " h",
      more: "sleep more", less: "sleep less",
      q: ["Do students on phones after midnight sleep fewer hours?", "Is it bad for anyone to use their phone late at night?", "Why do so many students stay up on their phones?", "Should students turn off their phones at 11 p.m.?"],
      lead: "“Phones at night mess up your sleep, right?”", survey: "“How many hours did you sleep last night?”", record: "Sleep tracker watch, 7 nights",
      notes: ["Doctors say screens before bed can make you fall asleep later.", "Caffeine and energy drinks also cut teen sleep."],
      fan: "“phones help me fall asleep fr, trust me 🙏”",
      factor: "Energy drinks", fic: "⚡",
      cause: "phones after midnight CAUSE less sleep",
      bold: "PROVEN: Late-night phones wreck your sleep 🔥", subtle: "New study: late-night phones cut your sleep", careful: "Late-phone students slept less. A pattern, not proof.",
      kaiLine: "Your data doesn't back Kai up: late-phone students slept LESS.",
      r: {
        survey: { found: "You surveyed 300 students. <b>41%</b> are on their phone after midnight most nights.", no: "WHY they stay up." },
        interview: { found: "“After my shift, my phone is the only time I get to talk to my friends.”", no: "How many students feel that way." },
        observe: { found: "At the 7 a.m. bus stop, <b>9 of 14</b> kids were on their phones and 3 were half asleep.", no: "What they did last night, or why." },
        experiment: { found: "Half the kids (a coin flip picked who) left phones in the kitchen for a week. That group slept <b>40 min more</b>.", no: "Lots of kids won't agree to give up their phone, so it's hard to run." },
        content: { found: "You counted 100 TikToks about sleep. <b>62</b> joked about “running on no sleep.”", no: "Whether real teens actually sleep that little." }
      }
    },
    jobs: {
      ic: "💼", name: "Jobs & grades", take: "Having a job tanks your grades. Facts 💯", views: 1700000,
      iv: "Hours worked per week", dv: "GPA", dvShort: "GPA", ivShort: "hours worked", decoy: "Where they work",
      ga: "💼 Works 20+ hours a week", gb: "📚 Works less or no job", who: "who work 20+ hours a week", than: "than students who work less",
      unit: "GPA (average, out of 4.0)", max: 4, va: 2.7, vb: 3.0, fmt: v => v.toFixed(1),
      more: "have higher GPAs", less: "have lower GPAs",
      q: ["Do students who work 20+ hours a week have lower GPAs?", "Are jobs good or bad for teenagers in general?", "Why do so many students work 20+ hours a week?", "Should teens be allowed to work 20+ hours a week?"],
      lead: "“Jobs hurt your grades, right?”", survey: "“What's your GPA?” (students report it)", record: "Real GPAs from the office, with permission",
      notes: ["Working a lot (around 20+ hours a week) goes with lower grades.", "Working just a few hours a week shows little link to grades."],
      fan: "“my job never hurt MY grades so it's fine 💅”",
      factor: "Family needs the money", fic: "🏠",
      cause: "working a lot CAUSES lower grades",
      bold: "PROVEN: Jobs tank your grades 🔥", subtle: "New study: working lowers your grades", careful: "Students working 20+ hours had lower GPAs. A pattern, not proof.",
      kaiLine: "Your data backs Kai up a little: long work hours went with lower GPAs. (Only for long hours, though.)",
      r: {
        survey: { found: "You surveyed 300 students. <b>38%</b> work during the school year.", no: "WHY they work, or how it feels." },
        interview: { found: "“I close at Casey's on school nights. My family needs the money, so homework waits.”", no: "How many students are in the same spot." },
        observe: { found: "In 1st-period study hall, <b>11 of 25</b> students had their heads down.", no: "Why they're tired, or whether they work." },
        experiment: { cant: true, found: "You can't flip a coin to decide which teens get jobs. That would mess with real people's lives.", no: "Some questions can't be tested this way. It wouldn't be fair or safe." },
        content: { found: "You counted 80 “Now Hiring” posts. <b>55</b> said “flexible hours for students.”", no: "How working actually affects grades." }
      }
    },
    social: {
      ic: "📸", name: "Social media & mood", take: "Social media makes everybody miserable 😭", views: 3100000,
      iv: "Hours on social media a day", dv: "Mood rating (1–5)", dvShort: "mood", ivShort: "time on social media", decoy: "Number of followers",
      ga: "📸 3+ hours a day", gb: "🌤️ Under 1 hour a day", who: "on social media 3+ hours a day", than: "than students who use it less",
      unit: "Mood, 1–5 (average)", max: 5, va: 2.9, vb: 3.6, fmt: v => v.toFixed(1),
      more: "rate their mood higher", less: "rate their mood lower",
      q: ["Do students on social media 3+ hours a day rate their mood lower?", "Is social media good or bad for people's mood these days?", "Why do students spend 3+ hours a day on social media?", "Should our school block social media after 3 hours a day?"],
      lead: "“Social media makes you sad, right?”", survey: "“Rate your mood this week, 1 to 5.”", record: "Screen-time report + a daily mood check-in, 7 days",
      notes: ["Heavy users report feeling down more often.", "Researchers still argue: does scrolling cause it, or do sad people scroll more?"],
      fan: "“social media is literally the worst thing ever invented 😭”",
      factor: "Already feeling down", fic: "😶",
      cause: "social media CAUSES a worse mood",
      bold: "PROVEN: Social media makes you miserable 🔥", subtle: "New study: social media lowers your mood", careful: "Heavy scrollers rated their mood lower. A pattern, not proof.",
      kaiLine: "Your data backs Kai up a little: heavy scrollers rated their mood lower. (“Everybody” is too much, though.)",
      r: {
        survey: { found: "You surveyed 300 students. <b>1 in 3</b> spend 3+ hours a day on social media.", no: "WHY they scroll, or how it feels." },
        interview: { found: "“I scroll when I'm bored. Then I see everyone's perfect life and feel worse.”", no: "How many students feel that way." },
        observe: { found: "In the lunchroom, <b>23 of 40</b> students were on their phones instead of talking.", no: "How they feel, or why." },
        experiment: { found: "Half the kids (a coin flip picked who) took a 1-week social media break. Kids on the break felt a little happier.", no: "Whether it lasts, and some kids quit the break early." },
        content: { found: "You counted 100 posts from teen accounts. <b>70</b> showed only the best parts of people's lives.", no: "How the people looking at them actually feel." }
      }
    },
    sports: {
      ic: "🏀", name: "Sports & grades", take: "Athletes don't care about school lol 🏈", views: 1100000,
      iv: "Plays a school sport", dv: "GPA", dvShort: "GPA", ivShort: "playing a sport", decoy: "Team jersey number",
      ga: "🏀 Plays a school sport", gb: "🎮 No school sport", who: "who play a school sport", than: "than students who don't",
      unit: "GPA (average, out of 4.0)", max: 4, va: 3.2, vb: 2.9, fmt: v => v.toFixed(1),
      more: "have higher GPAs", less: "have lower GPAs",
      q: ["Do students who play a school sport have different GPAs?", "Are athletes smarter than everyone else at our school?", "Why do so many athletes care more about sports?", "Should athletes need a 3.0 GPA to play on a team?"],
      lead: "“Athletes slack off in school, right?”", survey: "“What's your GPA?” (students report it)", record: "Real GPAs from the office, with permission",
      notes: ["Students in school activities tend to have slightly higher grades.", "Many teams make players pass their classes to stay on the team."],
      fan: "“jocks never study, everybody knows that 🙄”",
      factor: "Grade rules to play", fic: "📋",
      cause: "sports CAUSE higher grades",
      bold: "PROVEN: Sports make you smarter 🔥", subtle: "New study: sports raise your grades", careful: "Athletes had slightly higher GPAs. A pattern, not proof.",
      kaiLine: "Your data doesn't back Kai up: athletes had slightly HIGHER GPAs. (GPA can't measure “caring,” though.)",
      r: {
        survey: { found: "You surveyed 300 students. <b>45%</b> play a school sport.", no: "WHY they play, or how they balance school." },
        interview: { found: "“Coach checks our grades every week. If I fail, I sit.”", no: "How many athletes say the same thing." },
        observe: { found: "At the after-practice study table, <b>18 of 20</b> players were doing homework.", no: "What their grades are, or why." },
        experiment: { cant: true, found: "You can't flip a coin to make kids join or quit a team. It wouldn't be fair.", no: "Some questions can't be tested this way. It wouldn't be fair or safe." },
        content: { found: "You counted 60 local sports articles. <b>Only 4</b> mentioned players' schoolwork.", no: "What athletes are actually like in class." }
      }
    }
  };
  const TOPIC_ORDER = ["sleep", "jobs", "social", "sports"];

  const MEASURES = { leading: { ic: "👍", t: "Yes/no question", cost: 0 }, survey: { ic: "📝", t: "Short survey", cost: 1 }, record: { ic: "📊", t: "Tracked data", cost: 2 } };
  const SAMPLES = {
    friends: { ic: "🍕", t: "6 friends", d: "Your lunch table. Easy.", cost: 0 },
    oneclass: { ic: "🏫", t: "One class", d: "25 juniors in 3rd period.", cost: 1 },
    random: { ic: "🎲", t: "100 at random", d: "Every grade. Lots of permission slips.", cost: 3 }
  };
  const measureLine = (k, t) => k === "leading" ? t.lead : k === "survey" ? t.survey : t.record;

  // ---- Part 1 call-out stamps + Kai's sloppy "studies" (boss + extra peer-review questions) ----
  const STAMPS1 = {
    leading: { ic: "👍", t: "Leading question", s: "Pushes one answer" },
    small: { ic: "🔢", t: "Sample too small", s: "Too few people" },
    biased: { ic: "🎯", t: "Biased sample", s: "Wrong group of people" },
    cause: { ic: "🔗", t: "Pattern ≠ proof", s: "Correlation, not causation" },
    testable: { ic: "❓", t: "Can't be tested", s: "A “should” or opinion question" },
    objective: { ic: "🙈", t: "Not objective", s: "Feelings picked the answer" },
    outside: { ic: "🔍", t: "Outside factor", s: "Something else could cause it" }
  };
  const BANK1 = [
    { id: "L1", type: "leading", post: "I asked 200 followers: “School starts WAY too early, right?” 96% said yes. Science 🔥", why: "“…right?” pushes people to say yes. That's a <b>leading question</b>." },
    { id: "L2", type: "leading", post: "Poll: “Isn't pineapple on pizza obviously gross?” 88% agreed. Case closed 🍍", why: "“Obviously gross” tells people what to think. <b>Leading question</b>." },
    { id: "L3", type: "leading", post: "Asked my whole grade: “Don't you hate the new phone rule?” 91% said yes 💯", why: "“Don't you hate…” pushes a yes. <b>Leading question</b>." },
    { id: "S1", type: "small", post: "My 3 cousins drink coffee and all got A's. Coffee = smart ☕", why: "3 people can't speak for everyone. <b>Sample too small</b>." },
    { id: "S2", type: "small", post: "2 of my friends quit TikTok and felt happier. So quitting works for everyone 📉", why: "2 people? One weird week could flip it. <b>Sample too small</b>." },
    { id: "S3", type: "small", post: "I studied with music ONE time and aced the quiz. Music works, period 🎧", why: "One person, one time. <b>Sample too small</b>." },
    { id: "B1", type: "biased", post: "Surveyed 100 people AT THE GYM: 90% work out 5 days a week. So most teens are super fit 💪", why: "People at a gym don't match all teens. <b>Biased sample</b>." },
    { id: "B2", type: "biased", post: "Asked 80 people in line for new Jordans: 95% say $200 sneakers are worth it. Everyone agrees 👟", why: "Sneaker fans in a sneaker line? <b>Biased sample</b>." },
    { id: "B3", type: "biased", post: "Polled my gaming Discord (300 people!): 80% game 4+ hours a day. Totally normal for teens 🎮", why: "Lots of people, but all gamers. <b>Biased sample</b>." },
    { id: "C1", type: "cause", post: "Kids who eat breakfast get better grades. So breakfast MAKES you smarter 🥞", why: "They go together, but that's not proof one causes the other. <b>Correlation ≠ causation</b>." },
    { id: "C2", type: "cause", post: "Towns that sell more ice cream have more drownings. Ice cream is dangerous 🍦", why: "Hot weather raises both. <b>Correlation ≠ causation</b>." },
    { id: "C3", type: "cause", post: "Teens with more followers say they're happier. Followers CAUSE happiness 📸", why: "Maybe happy people just post more. <b>Correlation ≠ causation</b>." },
    { id: "T1", type: "testable", post: "My research question: “Is TikTok good or bad?” 🤔", why: "“Good or bad” is an opinion. Nothing to measure. <b>Can't be tested</b>." },
    { id: "T2", type: "testable", post: "My research question: “Should phones be banned at school?” 📵", why: "“Should” asks for an opinion, not data. <b>Can't be tested</b>." },
    { id: "T3", type: "testable", post: "My research question: “Is rap better than country?” 🎤", why: "“Better” is taste. You can't measure it. <b>Can't be tested</b>." },
    { id: "O1", type: "objective", post: "Doing a study on phones. I already KNOW they're fine, so I'm tossing any data that says otherwise 😤", why: "He's letting his opinion pick the results. <b>Not objective</b>." },
    { id: "O2", type: "objective", post: "Study on my own mixtape: I rated it myself. 10/10. Objective 🔥", why: "You can't fairly judge your own thing. <b>Not objective</b>." },
    { id: "O3", type: "objective", post: "I only kept the numbers that made my side look good. The rest were “wrong” 😇", why: "Cherry-picking data. <b>Not objective</b>." }
  ];
  const OUTSIDE = [
    { id: "X1", type: "outside", post: "Fair survey, 200 random students: teens who own a car work more hours. But older students are more likely to have BOTH 🚗", why: "Age could explain both. <b>Outside factor</b>." },
    { id: "X2", type: "outside", post: "Fair survey, 300 random students: kids who play an instrument have higher GPAs. But their families are more likely to pay for tutors too 🎺", why: "Money for tutors could raise GPA. <b>Outside factor</b>." },
    { id: "X3", type: "outside", post: "Fair survey, 150 random students: teens who drink more coffee sleep less. But they also have way more homework ☕", why: "Homework could cut sleep too. <b>Outside factor</b>." }
  ];

  // ---- Part 1 extra "Supported?" and "Cause?" questions (used after a wrong answer) ----
  const SUP_TXT = { yes: "✅ Supported: the data matched the prediction", no: "❌ Not supported: the data went the other way", cant: "🤷 Can't tell: the runs flipped, so the data is broken" };
  const SUPPORT_CASES = [
    { hyp: "Students who eat breakfast will score HIGHER on a quiz than students who skip it.", unit: "Quiz score (average)", max: 100, runs: [[["🥞 Ate breakfast", 81], ["🚫 Skipped it", 74]], [["🥞 Ate breakfast", 83], ["🚫 Skipped it", 75]]], ans: "yes" },
    { hyp: "Students who study with music will score HIGHER than students who study in quiet.", unit: "Quiz score (average)", max: 100, runs: [[["🎧 Music", 71], ["🔇 Quiet", 79]], [["🎧 Music", 70], ["🔇 Quiet", 80]]], ans: "no" },
    { hyp: "Teens who text after 11 p.m. will feel MORE tired in 1st period.", unit: "Tired, 1–5 (average)", max: 5, runs: [[["💬 Texts after 11", 4.1], ["😴 Stops by 11", 3.0]], [["💬 Texts after 11", 2.8], ["😴 Stops by 11", 3.9]]], ans: "cant" },
    { hyp: "Students who game 3+ hours a day will have LOWER GPAs.", unit: "GPA (average)", max: 4, runs: [[["🎮 3+ hours", 2.6], ["📚 Under 1 hour", 3.0]], [["🎮 3+ hours", 2.7], ["📚 Under 1 hour", 3.0]]], ans: "yes" }
  ];
  const CAUSE_CASES = [
    { post: "Teens who eat dinner with their family get better grades. So family dinner CAUSES better grades. PROVE ME WRONG 😤",
      options: ["Not proven. Family time or money could explain both", "Proven. Better grades always come from family dinners", "Proven, because lots of families were in the study", "Disproven. Food has nothing to do with school"] },
    { post: "Towns that sell more ice cream have more drownings. Ice cream CAUSES drowning. Ban it 🍦",
      options: ["Not proven. Hot weather could cause both of them", "Proven. The two numbers rise and fall together", "Proven, because it happened in lots of towns", "Disproven. Ice cream and swimming never connect"] },
    { post: "Teens with more followers say they're happier. Followers CAUSE happiness. Go get followers 📸",
      options: ["Not proven. Happy people might just post more", "Proven. More followers clearly make people happier", "Proven, because it showed up in a big survey", "Disproven. Followers and mood can't be linked"] }
  ];

  // ---- Part 2 ----
  const TOOLS = ["survey", "interview", "observe", "experiment", "content"];
  const TOOL = {
    survey: { ic: "📋", name: "Survey", what: "Same questions to lots of people", gets: "A number: how many people" },
    interview: { ic: "🎙️", name: "Interview", what: "Long talks with follow-up questions", gets: "Reasons, in people's own words" },
    observe: { ic: "👀", name: "Observation", what: "Watch what people do in a real place", gets: "What people actually do" },
    experiment: { ic: "🧪", name: "Experiment", what: "Change one thing, compare two groups", gets: "Whether one thing causes another" },
    content: { ic: "📺", name: "Content analysis", what: "Count what shows up in media", gets: "What shows up in media" }
  };
  const HAWTHORNE = "📌 <span class=\"tr-tag real\">Real case</span> In the <b>Hawthorne studies</b> (1920s–30s, a factory in Illinois), workers seemed to work harder just because they knew researchers were watching. People act different when watched.";
  const MATCH_QS = [
    { q: "How many students do this?", a: "survey" }, { q: "Why do they do it?", a: "interview" }, { q: "What do people actually do?", a: "observe" },
    { q: "Does one thing cause another?", a: "experiment" }, { q: "What does media show?", a: "content" }
  ];
  const CLIENT_SLOTS = ["observe", "interview", "experiment"];
  const CLIENTS = {
    observe: [
      { id: "casey", ic: "⛽", who: "Casey's store manager", ask: "We moved the pizza warmer by the door. Do customers stop and look, or walk right past?",
        wrong: { survey: "Customers said they “always check it out.” Then you watched: most walked right past. People don't always do what they say.", interview: "3 long talks about pizza feelings. Still no idea how many people stop.", experiment: "You'd have to move the warmer around for weeks. The manager just wants to know what's happening now.", content: "You counted pizza posts online. That's not this store." } },
      { id: "hyvee", ic: "🛒", who: "Hy-Vee store manager", ask: "We added 4 self-checkouts. Do shoppers actually use them, or still wait for a cashier?",
        wrong: { survey: "Shoppers said they “love self-checkout.” Then you watched: most still lined up for a cashier.", interview: "3 long talks about checkout feelings. Still no idea what most shoppers actually do.", experiment: "You'd have to close lanes for weeks. The manager just wants to know what's happening now.", content: "You counted self-checkout memes. That's not this store." } }
    ],
    interview: [
      { id: "counselor", ic: "🏫", who: "School counselor", ask: "Some juniors stop coming after winter break. I need to know WHY.",
        wrong: { survey: "Top answer: “Other.” A checkbox can't explain a real reason.", observe: "You watched the hallway. The kids who stopped coming weren't there.", experiment: "You can't make students drop out to compare. That would hurt people.", content: "The school's posts show pep rallies. Nothing about why kids leave." } },
      { id: "youth", ic: "🏀", who: "Youth center director", ask: "Teens stopped coming to our Friday game nights. What's keeping them away?",
        wrong: { survey: "Top answer: “Other.” A checkbox can't explain the real reason.", observe: "You watched Friday night. The teens who stopped coming weren't there to watch.", experiment: "You can't randomly ban teens to compare. That's not fair.", content: "You counted the center's Instagram posts. Nothing about why teens left." } }
    ],
    experiment: [
      { id: "city", ic: "🚌", who: "City council", ask: "If we give teens a free bus pass, will they miss less school BECAUSE of it?",
        wrong: { survey: "Teens said a bus pass “would help.” Saying isn't proof it works.", interview: "Great stories about bad bus routes. Still not proof a pass changes attendance.", observe: "You watched the bus stop. Nobody had the pass yet, so there's nothing to compare.", content: "You counted bus ads. They tell you nothing about attendance." } },
      { id: "principal", ic: "⏰", who: "High school principal", ask: "If we start school 45 minutes later, will students be late less BECAUSE of it?",
        wrong: { survey: "Students said a later start “would help.” Saying isn't proof it works.", interview: "Great stories about bad mornings. Still not proof a later start changes tardies.", observe: "You watched the front door at 7:45. Nothing changed yet, so there's nothing to compare.", content: "You counted news stories about start times. That's other schools, not proof for yours." } }
    ]
  };
  const CLIENT_WHY = {
    observe: "<b>Observation</b>: when you want to know what people actually DO, watch them.",
    interview: "<b>Interview</b>: talk and ask follow-ups to find the real reasons.",
    experiment: "<b>Experiment</b>: change one thing for one group, not the other, then compare."
  };
  const ETHICS = {
    consent: { ic: "✋", t: "Informed consent", s: "Ask first, tell the truth" },
    confid: { ic: "🔒", t: "Confidentiality", s: "Keep names private" },
    harm: { ic: "🩹", t: "Do no harm", s: "Don't hurt people" },
    honesty: { ic: "🧾", t: "Honesty", s: "Report real results" }
  };
  const ETHICS_CASES = [
    { tag: "Real case · Facebook, 2012", ans: "consent", q: "Critics said Facebook broke a big research rule. Which one?",
      text: "For one week, Facebook secretly changed what <b>689,003 users</b> saw in their News Feeds. Some saw fewer happy posts, some saw fewer sad posts, to see if moods spread. Users were never told. (It came out in 2014.)",
      why: "<b>Informed consent</b>: people must know about a study and agree to it. Facebook's users never did, and people were furious." },
    { tag: "Real case · Stanford, 1971", ans: "harm", q: "Which research rule did this study break?",
      text: "College students were picked to play guards or prisoners in a fake prison. Some “guards” got cruel, and some “prisoners” broke down. It was stopped after 6 days instead of 2 weeks.",
      why: "<b>Do no harm</b>: a study can't hurt people, in body or mind." },
    { tag: "Real case · the Netherlands, 2011", ans: "honesty", q: "Which research rule did he break?",
      text: "A famous social psychologist, Diederik Stapel, admitted he made up the data in dozens of his studies. Many of his articles had to be taken back.",
      why: "<b>Honesty</b>: report only real results. Fake data breaks trust in ALL research." },
    { tag: "Made-up case", ans: "confid", q: "Which research rule did this break?",
      text: "A student researcher interviews classmates about problems at home, then shares the notes, with everyone's names, in a group chat.",
      why: "<b>Confidentiality</b>: keep people's names and private info secret." }
  ];
  const MIXED = [
    { kai: "HOW MANY teens does this affect, and WHY? one tool can't do both 😏", ans: ["survey", "interview"], hint: "Which tool counts lots of people? Which one gets reasons in their own words?",
      why: "<b>Mixed methods</b>: a survey shows HOW MANY, interviews show WHY. Each fills in what the other misses." },
    { kai: "people SAY one thing and DO another 🙄 find out what they SAY and what they actually DO", ans: ["survey", "observe"], hint: "Which tool asks lots of people? Which one watches what they really do?",
      why: "<b>Mixed methods</b>: a survey shows what people SAY, observation shows what they DO." },
    { kai: "does it actually CAUSE anything? and WHY do teens think it happens? 😏", ans: ["experiment", "interview"], hint: "Which tool tests cause? Which one gets reasons in people's own words?",
      why: "<b>Mixed methods</b>: an experiment tests CAUSE, interviews explain WHY." }
  ];
  const STAMPS2 = {
    survey: { ic: "📋", t: "Survey", s: "How many?" }, interview: { ic: "🎙️", t: "Interview", s: "Why? Own words" }, observe: { ic: "👀", t: "Observation", s: "What do they do?" },
    experiment: { ic: "🧪", t: "Experiment", s: "Does it cause it?" }, content: { ic: "📺", t: "Content analysis", s: "What's in media?" }, ethics: { ic: "🚫", t: "Not allowed", s: "Breaks an ethics rule" }
  };
  const BANK2 = [
    { id: "v1", type: "survey", post: "Find out what percent of Marion teens have a part-time job.", why: "“What percent” = count lots of people. <b>Survey</b>." },
    { id: "v2", type: "survey", post: "Find out how many students at our school ride the bus.", why: "“How many” = <b>survey</b>." },
    { id: "v3", type: "survey", post: "Find out how common it is for teens to sleep under 7 hours.", why: "“How common” = <b>survey</b>." },
    { id: "i1", type: "interview", post: "Find out WHY some teens quit sports after middle school.", why: "“Why” in their own words = <b>interview</b>." },
    { id: "i2", type: "interview", post: "Find out what it's like, in their own words, to be the new kid at a big high school.", why: "Feelings in their own words = <b>interview</b>." },
    { id: "i3", type: "interview", post: "Find out WHY some students pick online school over in-person.", why: "Reasons = <b>interview</b>." },
    { id: "o1", type: "observe", post: "Find out if students really sit with the same group at lunch every day.", why: "What people actually DO = <b>observation</b>." },
    { id: "o2", type: "observe", post: "Find out if shoppers actually read nutrition labels, or just grab and go.", why: "Watch what they really do = <b>observation</b>." },
    { id: "o3", type: "observe", post: "Find out who actually dances at a school dance and who stays by the wall.", why: "Watch the room = <b>observation</b>." },
    { id: "e1", type: "experiment", post: "Find out if a 10-minute break CAUSES higher quiz scores.", why: "CAUSE = give one group the break, not the other. <b>Experiment</b>." },
    { id: "e2", type: "experiment", post: "Find out if reminder texts CAUSE more homework to get turned in.", why: "Text one group, not the other, compare. <b>Experiment</b>." },
    { id: "e3", type: "experiment", post: "Find out if free breakfast CAUSES fewer tardies.", why: "Change one thing, compare groups. <b>Experiment</b>." },
    { id: "c1", type: "content", post: "Find out how often music videos show expensive cars and jewelry.", why: "Counting what's in media = <b>content analysis</b>." },
    { id: "c2", type: "content", post: "Find out if local news shows teens more as trouble or as helpers.", why: "Counting news stories = <b>content analysis</b>." },
    { id: "c3", type: "content", post: "Find out what jobs women have in the top 50 TV ads.", why: "Counting ads = <b>content analysis</b>." },
    { id: "x1", type: "ethics", post: "Find out how teens really talk by secretly reading their text messages.", why: "No permission, no privacy. <b>Not allowed</b>." },
    { id: "x2", type: "ethics", post: "Find out how students feel about school, then post their answers online with full names.", why: "Names must stay private. <b>Not allowed</b>." },
    { id: "x3", type: "ethics", post: "Find out how stress works by telling a class they failed a test (they didn't).", why: "That hurts people. <b>Not allowed</b>." },
    { id: "x4", type: "ethics", post: "Find out about 14-year-olds' home lives with a survey, but skip asking any parents.", why: "Under 18 needs a parent's OK too. <b>Not allowed</b>." }
  ];

  const TAUNTS = ["lol the lab is lost 😂", "see? science is just vibes 😤", "take ur time, i'm going viral 🔥", "my followers could've told u that 💅", "oop 😬"];
  const NERVOUS = ["wait… that's actually right 😳", "ok lucky guess 🙄", "hm. keep going I guess 😒", "why is the lab kid kinda good 😬", "…my comments are getting weird 😶"];

  // =================================================================
  //  STATE
  // =================================================================
  const freshP1 = () => ({ s: 0, topic: null, srcs: {}, hyp: null, draft: {}, measure: null, sample: null, built: false, ran: false, fix: null, headline: null, posted: false, boss: null, writing: {}, turnedIn: false, last: null, seen: [] });
  const freshP2 = () => ({ s: 0, topic: null, pred: {}, predOpt: {}, open: null, match: {}, mqOrder: null, badMatch: [], cl: { slot: 0, v: {}, tried: {}, missed: {} }, deal: null, mixedSel: [], boss: null, writing: {}, turnedIn: false });
  const fresh = () => ({ v: 1, name: "", part: 0, p1: freshP1(), p2: freshP2(), checks: {}, proved: false, startViews: Date.now() });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false, v: 0 });
  const P = () => st["p" + st.part];
  const T1 = () => TOPICS[st.p1.topic];
  const T2 = () => TOPICS[st.p2.topic];

  function oldDay5Done() { try { const d = JSON.parse(localStorage.getItem(OLD_D5)); return !!(d && d.turnedIn); } catch (e) { return false; } }
  const part2Open = () => isT() || st.p1.turnedIn || st.proved || oldDay5Done();

  // URL ?part=1 / ?part=2 (dashboard links) opens that part.
  const urlPart = (/[?&]part=(\d)/.exec(location.search) || [])[1];

  // =================================================================
  //  SCREEN LISTS
  // =================================================================
  const P1_NAMES = ["Pick a hot take", "Ask", "Research", "Predict", "Design", "Run it", "Peer review", "Supported?", "Cause?", "Headline", "Post it", "Kai's Comeback", "Lab report"];
  const P2_NAMES = ["Your topic", "Try 5 tools", "Match", "Clients", "Real case", "The $500 call", "Mixed methods", "Results", "Kai's Comeback", "Research report"];
  const BOSS_AT = { 1: 11, 2: 8 };

  // =================================================================
  //  SHARED UI
  // =================================================================
  const stage = $("stage"), side = $("side");
  const coach = html => `<div class="coach"><span class="av" aria-hidden="true">👩🏽‍🔬</span><div class="bubble"><span class="who">Dr. Ruiz</span>${html}</div></div>`;
  const reveal = html => `<p class="reveal">💡 ${html}</p>`;
  const kaiPostHtml = (body, opts) => {
    const o = opts || {};
    return `<div class="post${o.big ? " big" : ""}${o.cls ? " " + o.cls : ""}"><div class="ph"><span class="pav">😤</span><b>@kai.grindset</b><span class="ver">✔</span></div><p class="pb">${body}</p>` +
      (o.stats === false ? "" : `<p class="ps"><span id="${o.viewId || ""}">👁 ${o.views || "live"}</span><span>💬 ${o.comments || "4.2K"}</span></p>`) + (o.ctx || "") + `</div>`;
  };
  function fmtViews(n) { return n >= 1e6 ? (n / 1e6).toFixed(1) + "M views" : Math.round(n / 1e3) + "K views"; }
  function btn(label, onclick, cls) { const b = document.createElement("button"); b.type = "button"; b.className = "go" + (cls ? " " + cls : ""); b.textContent = label; b.onclick = onclick; return b; }
  function nextBtn(label) { const b = btn(label || "Next →", () => { P().s++; save(); render(); }); b.id = "nextBtn"; return b; }
  function stageCard(html) { stage.innerHTML = html || ""; stage.scrollTop = 0; return stage; }
  let kaiLine = "";
  function kai(text, bump) { kaiLine = text; const k = $("kaisay"); if (k) { k.textContent = "😤 Kai: “" + text + "”"; if (bump) { k.classList.remove("bump"); void k.offsetWidth; k.classList.add("bump"); } } }
  const taunt = n => kai(TAUNTS[n % TAUNTS.length], true);
  let nervousN = 0;
  const nervous = () => kai(NERVOUS[nervousN++ % NERVOUS.length], true);
  let locked = false;

  // Countdown after a wrong answer, then call done().
  function wrongWait(fb, text, done) {
    locked = true;
    let left = lockSecs();
    const tick = () => {
      fb.className = "msg bad";
      if (left <= 0) { locked = false; done(); return; }
      fb.innerHTML = "❌ " + text + ` <span class="new">new question in ${left}…</span>`;
      left--; setTimeout(tick, 1000);
    };
    tick();
  }

  // Multiple choice. variants[i] = { html (case/setup), q, options (first is right), hint, why }.
  // Wrong → 2 s lock → the NEXT variant (a new question on the same skill).
  function mcq(box, id, variants, onRight, opts) {
    const o = opts || {}, c = chk(id), V = variants[c.v % variants.length];
    const wrap = document.createElement("div"); wrap.className = "check"; box.appendChild(wrap);
    if (c.done) { wrap.classList.add("solved"); wrap.innerHTML = `<span class="stamp">✔ Proved it</span>` + reveal(V.why); return wrap; }
    wrap.innerHTML = (V.html || "") + `<p class="q">${V.q}${c.v ? `<span class="new">NEW QUESTION</span>` : ""}</p>`;
    const area = document.createElement("div"); area.className = "opts" + (o.one || V.options.length === 3 ? " one" : "");
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    shuffle(V.options.map((t, n) => ({ t, n }))).forEach(op => {
      const b = document.createElement("button"); b.type = "button"; b.className = "opt"; b.innerHTML = op.t;
      b.onclick = () => {
        if (locked) return;
        if (op.n === 0) { c.done = true; save(); nervous(); onRight(); return; }
        c.wrong++; save(); taunt(c.wrong - 1);
        wrap.classList.remove("spark"); void wrap.offsetWidth; wrap.classList.add("spark");
        area.querySelectorAll("button").forEach(x => x.disabled = true);
        wrongWait(fb, "Not quite. " + V.hint, () => { c.v++; save(); render(); });
      };
      area.appendChild(b);
    });
    wrap.appendChild(area); wrap.appendChild(fb);
    return wrap;
  }

  // Call-out stamps. variants[i] = { html, q, ans (stamp key), hint, why }. Same wrong rule as mcq.
  function stampCheck(box, id, variants, stamps, onRight) {
    const c = chk(id), V = variants[c.v % variants.length];
    const wrap = document.createElement("div"); wrap.className = "check"; box.appendChild(wrap);
    if (c.done) { wrap.classList.add("solved"); wrap.innerHTML = `<span class="stamp">✔ Proved it</span>` + reveal(V.why); return wrap; }
    wrap.innerHTML = (V.html || "") + `<p class="q">${V.q}${c.v ? `<span class="new">NEW QUESTION</span>` : ""}</p>`;
    const keys = Object.keys(stamps);
    const area = document.createElement("div"); area.className = "stamps" + (keys.length === 4 ? " two" : "");
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    shuffle(keys).forEach(k => {
      const S = stamps[k];
      const b = document.createElement("button"); b.type = "button"; b.className = "sbtn"; b.dataset.k = k;
      b.innerHTML = `<span class="si">${S.ic}</span>${S.t}<small>${S.s}</small>`;
      b.onclick = () => {
        if (locked) return;
        if (k === V.ans) { c.done = true; save(); nervous(); onRight(); return; }
        c.wrong++; save(); taunt(c.wrong - 1);
        wrap.classList.remove("spark"); void wrap.offsetWidth; wrap.classList.add("spark");
        b.classList.add("nope"); area.querySelectorAll("button").forEach(x => x.disabled = true);
        wrongWait(fb, "Not quite. " + V.hint, () => { c.v++; save(); render(); });
      };
      area.appendChild(b);
    });
    wrap.appendChild(area); wrap.appendChild(fb);
    return wrap;
  }

  // =================================================================
  //  TOP BAR + SIDE PANEL
  // =================================================================
  function top() {
    const p1done = st.p1.turnedIn, open2 = part2Open();
    $("parts").innerHTML =
      `<span class="ptab ${st.part === 1 ? "now" : p1done ? "done" : ""}">Part 1 · Day 5${p1done ? " ✓" : ""}</span>` +
      `<span class="ptab ${st.part === 2 ? "now" : st.p2.turnedIn ? "done" : open2 ? "" : "locked"}">Part 2 · Day 6${st.p2.turnedIn ? " ✓" : open2 ? "" : " 🔒"}</span>`;
    const names = st.part === 1 ? P1_NAMES : st.part === 2 ? P2_NAMES : [];
    const s = st.part ? P().s : 0;
    $("stepname").textContent = st.part && !(st.part === 2 && !open2) ? (s + 1) + "/" + names.length + " · " + names[s] : "";
    $("track").innerHTML = st.part && !(st.part === 2 && !open2) ? names.map((n, i) => `<li class="${i === BOSS_AT[st.part] ? "boss " : ""}${i < s ? "done" : i === s ? "now" : ""}" title="${esc(n)}"></li>`).join("") : "";
  }

  function sideP1() {
    const p = st.p1, t = T1();
    if (!t) { side.innerHTML = kaiPostHtml("4 hot takes in 1 hour. scientists stay mad 😎", { views: "6.9M views", big: true }) + `<p class="kaisay" id="kaisay"></p>`; kai(kaiLine || "go ahead lab kid, try to prove me wrong lol"); return; }
    const L = noteLines();
    const ctx = p.posted ? `<div class="ctx">📌 <b>Readers added context</b><br>${esc(headlineSet()[p.headline] || "")}</div>` : "";
    side.innerHTML = kaiPostHtml(esc(t.take), { viewId: "views", views: fmtViews(viewsNow()), big: true, ctx }) + `<p class="kaisay" id="kaisay"></p>` +
      `<div class="note"><p class="note-h"><span>📝 Your Community Note</span><span>${L.filter(x => x.on).length}/${L.length}</span></p><ul>${L.map(x => `<li class="${x.on ? (x.k === p.last ? "fresh" : "") : "empty"}">${x.on ? x.html : x.ph}</li>`).join("")}</ul></div>`;
    kai(kaiLine || "my post is going VIRAL 🔥 go ahead, try to prove me wrong lol");
  }
  function viewsNow() { const t = T1(); if (!t) return 0; const secs = (Date.now() - (st.startViews || Date.now())) / 1000; return t.views + Math.min(secs, 3600) * (st.p1.posted ? 90 : 1300); }
  setInterval(() => { const v = $("views"); if (v && st.part === 1 && T1()) v.textContent = "👁 " + fmtViews(viewsNow()); }, 1000);

  function noteLines() {
    const p = st.p1, t = T1();
    const sup = supportAnswer();
    return [
      { k: "q", on: chk("p1q").done, ph: "❓ Research question", html: `❓ <b>Question:</b> ${esc(t.q[0])}` },
      { k: "factor", on: p.s > 2, ph: "🔍 What else to watch for", html: `🔍 <b>Watch for:</b> ${t.fic} ${esc(t.factor)}` },
      { k: "hyp", on: chk("p1vars").done, ph: "🔮 Prediction + variables", html: `🔮 <b>Prediction:</b> ${esc(p.hyp ? t[p.hyp] : "")} · <b>IV:</b> ${esc(t.iv)} · <b>DV:</b> ${esc(t.dv)}` },
      { k: "study", on: p.built, ph: "🧪 How you studied it", html: `🧪 <b>Study:</b> ${p.measure ? MEASURES[p.measure].t : ""} · ${p.sample ? SAMPLES[p.sample].t : ""}` },
      { k: "found", on: p.ran, ph: "📊 What you found", html: `📊 <b>Found:</b> ${p.ran ? foundLine() : ""}` },
      { k: "sup", on: chk("p1sup").done, ph: "✅ Was your prediction right?", html: `${sup === "yes" ? "✅" : sup === "no" ? "❌" : "🤷"} <b>Prediction:</b> ${{ yes: "supported", no: "not supported", cant: "can't tell (broken data)" }[sup]}` },
      { k: "cause", on: chk("p1cause").done, ph: "⚖️ Does it prove cause?", html: `⚖️ <b>Cause?</b> ${broken() ? "Can't say. Data too broken." : "Pattern, not proof."}` },
      { k: "headline", on: !!p.headline, ph: "📰 Your headline", html: `📰 <b>Headline:</b> “${esc(headlineSet()[p.headline] || "")}”` }
    ];
  }
  function addNote(k) { st.p1.last = k; save(); }

  function sideP2() {
    const p = st.p2, t = T2();
    const tried = TOOLS.filter(k => k in p.pred);
    const lines = [
      { on: tried.length === 5, ph: "🧰 Try all 5 tools", html: `🧰 <b>Tried all 5 tools</b> on ${t ? t.ic + " " + esc(t.name) : "your topic"}` },
      { on: chk("p2match").done, ph: "🧩 Match each tool to its job", html: "🧩 <b>Matched</b> every tool to its job" },
      { on: p.s > 3, ph: "📞 Help 3 clients", html: `📞 <b>Clients:</b> 3 for 3` },
      { on: chk("p2ethics").done, ph: "⚖️ Crack a real ethics case", html: "⚖️ <b>Ethics:</b> cracked a real case" },
      { on: !!p.deal, ph: "🧾 The $500 call", html: p.deal === "lie" ? "💰 <b>Took the $500</b> 😬" : "🧾 <b>Stayed honest</b>" },
      { on: chk("p2mixed").done, ph: "🔀 Out-research Kai", html: "🔀 <b>Mixed methods:</b> 2 tools beat 1" }
    ];
    side.innerHTML = kaiPostHtml("research? just ask my followers lol 😎 why do scientists need FIVE “tools” 💀", { views: "880K views", big: true }) + `<p class="kaisay" id="kaisay"></p>` +
      `<div class="note"><p class="note-h"><span>🗂️ Lab case board</span><span>${lines.filter(x => x.on).length}/${lines.length}</span></p>
       <div class="toolbelt">${TOOLS.map(k => `<span class="${tried.includes(k) ? "on" : ""}" title="${TOOL[k].name}">${TOOL[k].ic}</span>`).join("")}</div>
       <ul>${lines.map(x => `<li class="${x.on ? "" : "empty"}">${x.on ? x.html : x.ph}</li>`).join("")}</ul></div>`;
    kai(kaiLine || "research? just ask my followers lol 😎");
  }

  // =================================================================
  //  HUB (title)
  // =================================================================
  function hub() {
    $("wrap").classList.add("solo"); side.innerHTML = "";
    const p1 = st.p1, p2 = st.p2, open2 = part2Open();
    stageCard(`<div class="title">
      <div>
        <h1>Prove It Lab</h1>
        <p class="hook">Kai posts viral hot takes about teen life. You fact-check one for real, like a sociologist.</p>
        <ul class="facts"><li>🧪 Part 1 (Day 5): test a hot take with the scientific method</li><li>🧰 Part 2 (Day 6): pick the right research tools and stay ethical</li><li>⚔️ Each part ends with a boss round: Kai fights back</li><li>⏱ About 25 min each</li></ul>
        <p class="goal">🎯 <b>Goal:</b> use the scientific method and research tools to find out if a claim is true.</p>
        <label for="nameBox">Your name</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="Jordan M." value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
      </div>
      <div class="partcards">
        <button type="button" class="partcard${p1.turnedIn ? " done" : ""}" id="go1"><span class="pi">🔥</span><span class="pt">Part 1 · Test the Hot Take</span><span class="pstate">${p1.turnedIn ? "✓ Turned in" : p1.s ? "Continue" : "Start"}</span><span class="pd">Day 5 · Ask → Predict → Test → Conclude</span></button>
        <button type="button" class="partcard${p2.turnedIn ? " done" : open2 ? "" : " locked"}" id="go2"><span class="pi">${open2 ? "🧰" : "🔒"}</span><span class="pt">Part 2 · Research Rivals</span><span class="pstate">${p2.turnedIn ? "✓ Turned in" : open2 ? (p2.s ? "Continue" : "Start") : "Locked"}</span><span class="pd">${open2 ? "Day 6 · 5 research tools + ethics" : "Opens after you finish Part 1"}</span></button>
        ${kaiPostHtml("Scrolling till 2 a.m. doesn't mess up your sleep 😤", { views: "2.4M views", stats: true })}
      </div></div>`);
    const go = part => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.part = part; save(); render();
    };
    $("go1").onclick = () => go(1);
    $("go2").onclick = () => go(2);
  }

  // =================================================================
  //  PART 1
  // =================================================================
  function flawOf(m, s) { if (m === "leading") return "junk"; if (s === "friends") return "noisy"; if (s === "oneclass") return "narrow"; return "none"; }
  const flaw = () => flawOf(st.p1.measure, st.p1.sample);
  const broken = () => flaw() === "junk" || flaw() === "noisy";
  function supportAnswer() {
    const t = T1(); if (!t || !st.p1.hyp) return "yes";
    if (broken()) return "cant";
    return (st.p1.hyp === "more") === (t.va > t.vb) ? "yes" : "no";
  }
  function dataFor(m, s, run) {
    const t = T1();
    if (m === "leading") { const yes = { random: [93, 94], oneclass: [95, 92], friends: [100, 83] }[s][run]; return { unit: "Said YES", rows: [{ l: "👍 YES", v: yes, max: 100, txt: yes + "%" }] }; }
    let a = t.va, b = t.vb; const gap = a - b;
    if (s === "friends") { if (run === 1) { a = t.vb + gap * 0.4; b = t.va - gap * 0.4; } else { a = t.va + gap * 0.6; b = t.vb - gap * 0.6; } }
    else if (s === "oneclass") { a = t.va + gap * 0.3 + (run ? 0.05 : 0); b = t.vb - gap * 0.3; }
    else { const d = (run ? 0.1 : 0) * Math.sign(gap || 1) * (m === "survey" ? 1 : 0.5); a = t.va + d; b = t.vb - d; }
    a = Math.max(0, Math.min(t.max, a)); b = Math.max(0, Math.min(t.max, b));
    return { unit: t.unit, rows: [{ l: t.ga, v: a, max: t.max, txt: t.fmt(a) }, { l: t.gb, v: b, max: t.max, txt: t.fmt(b) }] };
  }
  const barRows = rows => rows.map(r => `<div class="brow"><span>${r.l}</span><span class="bt"><span style="width:${Math.max(2, Math.round(r.v / r.max * 100))}%"></span></span><b>${r.txt}</b></div>`).join("");
  function charts(m, s) {
    const p = st.p1; m = m || p.measure; s = s || p.sample;
    return `<div class="charts">${[0, 1].map(run => { const d = dataFor(m, s, run); return `<div class="chart"><p class="chart-t">Run ${run + 1}${run && s === "friends" ? " (6 different friends)" : ""}</p><p class="chart-u">${d.unit}</p>${barRows(d.rows)}</div>`; }).join("")}</div><p class="madeup">Made-up game data</p>`;
  }
  function foundLine() {
    const d = dataFor(st.p1.measure, st.p1.sample, 0);
    if (d.rows.length === 1) return d.rows[0].txt + " said YES";
    const d2 = dataFor(st.p1.measure, st.p1.sample, 1);
    const flipped = (d.rows[0].v > d.rows[1].v) !== (d2.rows[0].v > d2.rows[1].v);
    return `${d.rows[0].txt} vs. ${d.rows[1].txt}${flipped ? " (runs flipped!)" : ""}`;
  }
  function headlineSet() {
    const t = T1(), f = flaw();
    if (!t) return {};
    if (f === "junk") { const y = dataFor(st.p1.measure, st.p1.sample, 0).rows[0].txt; return { bold: y + " agree with us. Case closed! 🔥", subtle: "Survey: most students agree with us", honest: "Our question pushed people to say yes. We'll redo it." }; }
    if (f === "noisy") return { bold: t.bold, subtle: t.subtle, honest: "Only 6 people, and our runs flipped. We'll redo it." };
    if (f === "narrow") return { bold: t.bold, subtle: t.subtle, honest: "We found a pattern, but only in one class of juniors." };
    return { bold: t.bold, subtle: t.subtle, honest: t.careful };
  }

  // 0 · Pick a hot take
  function p1pick() {
    const box = stageCard(`<span class="kick">Part 1 · Day 5</span><h2>Pick the hot take you want to test</h2>` +
      coach("Kai posted all 4 of these, and they're blowing up. Pick the one <b>you</b> want to fact-check. Every step you finish adds a line to your <b>Community Note</b> on his post (right side).") +
      `<div class="picks two" id="topics"></div>`);
    TOPIC_ORDER.forEach(k => {
      const t = TOPICS[k];
      const b = document.createElement("button"); b.type = "button"; b.className = "pick topic"; b.dataset.topic = k;
      b.innerHTML = `<span class="ic">${t.ic}</span><span class="t">${t.name}</span><span class="take">“${t.take}”</span><span class="d">👁 ${fmtViews(t.views)}</span>`;
      b.onclick = () => { st.p1.topic = k; st.startViews = Date.now(); st.p1.s = 1; kaiLine = ""; save(); render(); };
      $("topics").appendChild(b);
    });
    return box;
  }

  // 1 · Ask
  function p1ask() {
    const t = T1();
    const box = stageCard(`<h2>Ask: turn the hot take into a research question</h2>` +
      coach("A hot take isn't testable yet. A good <b>research question</b> names a group and 2 things you can measure. Skip “Should” and “Why” questions."));
    const others = TOPIC_ORDER.filter(k => k !== st.p1.topic);
    const variants = [st.p1.topic].concat(shuffleSeed(others)).map(k => ({
      html: `<div class="case"><p class="tag">${k === st.p1.topic ? "Your hot take" : "Kai's other hot take"}</p>${TOPICS[k].ic} “${esc(TOPICS[k].take)}”</div>`,
      q: "Which research question can you actually test?", options: TOPICS[k].q,
      hint: "Find the one with a group of students AND two things you could count.",
      why: "<b>Research question</b> = step 1 of the <b>scientific method</b>. It names who and what you'll measure."
    }));
    mcq(box, "p1q", variants, () => { addNote("q"); render(); }, { one: true });
    if (chk("p1q").done) box.appendChild(nextBtn("Next: Research →"));
  }
  // Stable "random" order for a session, so a refresh doesn't change which variant comes next.
  function shuffleSeed(a) { const key = "ord:" + a.join(","); st.ord = st.ord || {}; if (!st.ord[key]) { st.ord[key] = shuffle(a); save(); } return st.ord[key]; }

  // 2 · Research (sort the sources)
  function p1research() {
    const t = T1(), p = st.p1;
    const box = stageCard(`<h2>Research: what's already known?</h2>` +
      coach("Before you build anything, check what's already known. Flip each card. <b>Keep</b> real research. <b>Toss</b> anything that's just someone's opinion."));
    const cards = shuffleSeed(["n0", "n1", "fan"]);
    const grid = document.createElement("div"); grid.className = "sources"; box.appendChild(grid);
    const fb = document.createElement("p"); fb.className = "msg";
    cards.forEach(id => {
      const isFan = id === "fan", val = p.srcs[id];
      const el = document.createElement("div");
      if (!val) {
        const open = p.srcs.open === id;
        const b = document.createElement(open ? "div" : "button"); if (!open) b.type = "button"; b.className = "src face"; b.innerHTML = `<span class="ic">📄</span>Flip me`;
        if (open) {
          b.className = "src";
          b.innerHTML =`<span class="lab" style="color:var(--muted)">${isFan ? "💬 Comment on Kai's post" : "📚 Research summary"}</span><span>${isFan ? esc(t.fan) : esc(t.notes[+id[1]])}</span>`;
          const row = document.createElement("div"); row.className = "row";
          [["keep", "✅ Keep"], ["toss", "🗑️ Toss"]].forEach(([k, lab]) => {
            const kb = document.createElement("button"); kb.type = "button"; kb.className = "opt"; kb.style.minHeight = "36px"; kb.style.padding = "4px 10px"; kb.textContent = lab; kb.dataset.sort = k;
            kb.onclick = ev => {
              ev.stopPropagation();
              const right = isFan ? "toss" : "keep";
              p.srcs[id] = right; p.srcs.open = null; save();
              if (k !== right) { kai(isFan ? "ok my fan's opinion counts as science tho 😤" : "lol you tossed real research 💀", true); render(); const m = $("srcMsg"); if (m) { m.className = "msg bad"; m.textContent = isFan ? "Careful: that's one person's opinion, not research. Tossed it for you." : "Careful: that's a research summary from studies of lots of people. Kept it for you."; } return; }
              render();
            };
            row.appendChild(kb);
          });
          b.appendChild(row);
        } else b.onclick = () => { p.srcs.open = id; save(); render(); };
        b.dataset.src = id;
        grid.appendChild(b);
      } else {
        el.className = "src " + val;
        el.innerHTML = `<span class="lab">${val === "keep" ? "✅ Kept · research" : "🗑️ Tossed · opinion"}</span><span>${isFan ? esc(t.fan) : esc(t.notes[+id[1]])}</span>`;
        grid.appendChild(el);
      }
    });
    fb.id = "srcMsg"; box.appendChild(fb);
    const all = cards.every(id => p.srcs[id]);
    if (all) {
      box.insertAdjacentHTML("beforeend", `<div class="factor"><b>🔍 Outside factor to watch:</b> ${t.fic} ${esc(t.factor)}. This could ALSO change ${esc(t.dvShort)}. Keep it in mind.</div>` +
        reveal("<b>Background research</b> = learning what studies already found. Scientists stay <b>objective</b>: evidence beats opinions."));
      const nb = nextBtn("Next: Predict →"); nb.onclick = () => { addNote("factor"); p.s++; save(); render(); }; box.appendChild(nb);
    }
  }

  // 3 · Predict + IV/DV
  let wire = { pick: null, iv: null, dv: null, order: null, v: -1 };
  function p1predict() {
    const t = T1(), p = st.p1;
    const box = stageCard(`<h2>Predict: make a hypothesis</h2>`);
    if (!p.hyp) {
      box.insertAdjacentHTML("beforeend", coach("A <b>hypothesis</b> is your best guess, said so you can test it. Tap what YOU think will happen. Being wrong is allowed!") +
        `<p class="hyp"><span class="tag">🔮 Finish the hypothesis</span><br><b>Students ${esc(t.who)} will…</b></p>`);
      const row = document.createElement("div"); row.className = "picks two";
      [["more", "⬆️"], ["less", "⬇️"]].forEach(([k, ic]) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "pick"; b.dataset.hyp = k;
        b.innerHTML = `<span class="ic">${ic}</span><span class="t">${esc(t[k])}</span><span class="d">${esc(t.than)}</span>`;
        b.onclick = () => { p.hyp = k; save(); render(); };
        row.appendChild(b);
      });
      box.appendChild(row); return;
    }
    const c = chk("p1vars");
    const order = [p.topic].concat(shuffleSeed(TOPIC_ORDER.filter(k => k !== p.topic)));
    const vk = order[c.v % order.length], V = TOPICS[vk];
    const hypText = vk === p.topic ? `Students ${t.who} will ${t[p.hyp]} ${t.than}.` : `Students ${V.who} will ${V.less} ${V.than}.`;
    if (c.done) {
      box.insertAdjacentHTML("beforeend", `<p class="hyp"><span class="tag">🔮 Your hypothesis</span><br><b>${esc(`Students ${t.who} will ${t[p.hyp]} ${t.than}.`)}</b></p>` +
        `<div class="check solved"><span class="stamp">⚡ Powered on</span><div class="machine" style="margin-top:6px"><div class="socket full"><span class="sk">🔌 IV: what's different between groups</span><b>${esc(t.iv)}</b></div><div class="socket full"><span class="sk">📟 DV: the result you measure</span><b>${esc(t.dv)}</b></div></div></div>` +
        reveal(`The <b>dependent variable</b> (${esc(t.dvShort)}) depends on the <b>independent variable</b> (${esc(t.ivShort)}).`));
      box.appendChild(nextBtn("Next: Design your study →")); return;
    }
    box.insertAdjacentHTML("beforeend", coach("Now name your 2 variables. <b>IV</b> = what's different between your 2 groups. <b>DV</b> = the result you measure. Tap a card, then a box.") +
      (c.v ? `<p class="hyp"><span class="tag">🔮 New one: another hot take</span><span class="new">NEW QUESTION</span><br><b>${esc(hypText)}</b></p>` : `<p class="hyp"><span class="tag">🔮 Your hypothesis</span><br><b>${esc(hypText)}</b></p>`));
    const tiles = [V.iv, V.dv, V.factor, V.decoy];
    if (wire.v !== c.v || !wire.order) wire = { pick: null, iv: null, dv: null, order: shuffle([0, 1, 2, 3]), v: c.v };
    const m = document.createElement("div"); m.className = "machine"; m.style.marginTop = "6px"; box.appendChild(m);
    const fb = document.createElement("p"); fb.className = "msg"; box.appendChild(fb);
    function draw() {
      m.innerHTML = "";
      [["iv", "🔌 IV", "What's different between the 2 groups"], ["dv", "📟 DV", "The result you measure"]].forEach(([k, lab, sub]) => {
        const s = document.createElement("button"); s.type = "button"; s.className = "socket" + (wire[k] != null ? " full" : "") + (wire.pick != null && wire[k] == null ? " ready" : ""); s.dataset.socket = k; s.disabled = locked;
        s.innerHTML = `<span class="sk">${lab}</span><span class="sub">${sub}</span>` + (wire[k] != null ? `<b>${esc(tiles[wire[k]])}</b>` : `<span class="empty">⬚ empty</span>`);
        s.onclick = () => { if (locked) return; if (wire.pick != null) { wire[k] = wire.pick; wire.pick = null; } else if (wire[k] != null) wire[k] = null; draw(); };
        m.appendChild(s);
      });
      const row = document.createElement("div"); row.className = "tiles";
      wire.order.forEach(i => {
        if (wire.iv === i || wire.dv === i) return;
        const b = document.createElement("button"); b.type = "button"; b.className = "tile" + (wire.pick === i ? " picked" : ""); b.textContent = tiles[i]; b.dataset.tile = i; b.disabled = locked;
        b.onclick = () => { wire.pick = wire.pick === i ? null : i; draw(); };
        row.appendChild(b);
      });
      m.appendChild(row);
      const go = btn("⚡ Power on", power); go.id = "powerBtn"; go.disabled = locked || wire.iv == null || wire.dv == null; go.style.gridColumn = "1/-1"; m.appendChild(go);
    }
    function power() {
      if (locked) return;
      if (wire.iv === 0 && wire.dv === 1) { c.done = true; save(); nervous(); addNote("hyp"); render(); return; }
      c.wrong++; save(); taunt(c.wrong - 1);
      m.classList.remove("spark"); void m.offsetWidth; m.classList.add("spark");
      locked = true; draw();
      wrongWait(fb, "Not quite. The IV is what's different between the groups. The DV is the result you check.", () => { c.v++; save(); render(); });
    }
    draw();
  }

  // 4 · Design (lab-day budget)
  function p1design() {
    const t = T1(), p = st.p1, d = p.draft;
    if (!d.measure && !d.sample) kai("just ask ur friends lol 😇 it's free");
    const used = (d.measure ? MEASURES[d.measure].cost : 0) + (d.sample ? SAMPLES[d.sample].cost : 0), left = DAYS - used;
    const box = stageCard(`<h2>Design: build your study</h2>` +
      coach(`You get <b>${DAYS} lab days</b>. Better choices cost more days, so you can't have everything. Pick what matters most.`) +
      `<p class="budget">📅 Lab days left: <b id="leftN">${left}</b></p>`);
    [["measure", `1️⃣ How will you measure ${esc(t.dvShort)}?`, MEASURES], ["sample", "2️⃣ Who will you study? (your <b>sample</b>)", SAMPLES]].forEach(([slot, label, set]) => {
      const sec = document.createElement("div"); sec.className = "slot"; sec.innerHTML = `<h3>${label}</h3>`;
      const row = document.createElement("div"); row.className = "picks"; row.style.gridTemplateColumns = "repeat(3,1fr)";
      Object.keys(set).forEach(k => {
        const o = set[k], others = used - (d[slot] ? set[d[slot]].cost : 0), tooMuch = others + o.cost > DAYS && d[slot] !== k;
        const b = document.createElement("button"); b.type = "button"; b.className = "pick" + (d[slot] === k ? " sel" : ""); b.dataset.slot = slot; b.dataset.id = k; b.disabled = tooMuch;
        b.innerHTML = `<span class="t">${o.ic} ${o.t}</span><span class="d">${esc(slot === "measure" ? measureLine(k, t) : o.d)}</span><span class="cost">${o.cost ? o.cost + " lab day" + (o.cost > 1 ? "s" : "") : "free"}</span>${tooMuch ? `<span class="off">Not enough lab days</span>` : ""}`;
        b.onclick = () => { d[slot] = k; save(); render(); };
        row.appendChild(b);
      });
      sec.appendChild(row); box.appendChild(sec);
    });
    if (d.measure && d.sample) {
      const b = btn("🔒 Lock in my study →", () => { p.measure = d.measure; p.sample = d.sample; p.built = true; p.s++; addNote("study"); save(); render(); });
      b.id = "nextBtn"; box.appendChild(b);
    }
  }

  // 5 · Run it
  function p1run() {
    const p = st.p1;
    const box = stageCard(`<h2>Run it: collect your data</h2>`);
    if (!p.ran) {
      box.insertAdjacentHTML("beforeend", coach("Real scientists run a study more than once. If a result is real, it should <b>repeat</b>. Hit run.") +
        `<div class="runbox"><div><div class="beaker">🧪</div></div></div>`);
      const b = btn("▶ Run it twice", () => { p.ran = true; addNote("found"); save(); render(); }); b.id = "runBtn"; box.appendChild(b); return;
    }
    const f = flaw();
    box.insertAdjacentHTML("beforeend", `<p class="react">${{ none: "✅ Both runs match.", narrow: "✅ Both runs match.", noisy: "😵 Whoa. A different 6 friends FLIPPED the results!", junk: "🤔 Almost everyone said YES. Slam dunk?" }[f]}</p>` + charts());
    if (f === "noisy") kai("LMAO your data can't make up its mind 😂", true);
    else if (f === "junk") kai("see?? everybody agrees with me 😎", true);
    else kai("ok those bars look… kinda real 😬", true);
    box.appendChild(nextBtn("Next: Peer review →"));
  }

  // 6 · Peer review (diagnose the data, then maybe fix it)
  function p1review() {
    const p = st.p1, t = T1();
    const box = stageCard(`<h2>Peer review: what's the biggest problem?</h2>` +
      coach("<b>Peer review</b> = another scientist checks your work. Every study has a weak spot. Call out yours."));
    const c = chk("p1rev");
    if (!p.reviewKey) { p.reviewKey = { junk: "leading", noisy: "small", narrow: "biased", none: "outside" }[flaw()]; save(); }
    const reviewKey = p.reviewKey;
    const firstM = p.fix && p.fix.to && p.fix.slot === "measure" ? p.fix.from : p.measure;
    const firstS = p.fix && p.fix.to && p.fix.slot === "sample" ? p.fix.from : p.sample;
    const pool = reviewKey === "outside" ? OUTSIDE : BANK1.filter(x => x.type === reviewKey);
    const own = { html: `<div class="case"><p class="tag">Your study · ${MEASURES[firstM].ic} ${MEASURES[firstM].t} · ${SAMPLES[firstS].ic} ${SAMPLES[firstS].t}</p>${charts(firstM, firstS).replace('<p class="madeup">Made-up game data</p>', "").replace(/<p class="chart-u">[^<]*<\/p>/g, "")}</div>`,
      q: "Dr. Ruiz: “What's the biggest problem with this data?”", ans: reviewKey,
      hint: { leading: "Read your question out loud. Does it push one answer?", small: "How many people? Did the runs match?", biased: "Your question was about ALL students. Who was in your study?", outside: "Your sample and question look fair. What did your research say to watch for?" }[reviewKey],
      why: { leading: "<b>Leading question</b>: it pushes people toward one answer.", small: "<b>Sample too small</b>: with 6 people, one person can swing it.", biased: "<b>Biased sample</b>: one class of juniors doesn't match the whole school.", outside: `<b>Outside factor</b>: ${esc(t.factor)} could change ${esc(t.dvShort)} too.` }[reviewKey] };
    const variants = [own].concat(shuffleSeed(pool.map(x => x.id)).map(id => { const x = pool.find(y => y.id === id); return { html: kaiPostHtml(esc(x.post), { stats: false }), q: "New one. What's the biggest problem with Kai's study?", ans: reviewKey, hint: own.hint, why: x.why }; }));
    const stamps = { leading: STAMPS1.leading, small: STAMPS1.small, biased: STAMPS1.biased, outside: STAMPS1.outside };
    stampCheck(box, "p1rev", variants, stamps, () => render());
    if (!c.done) return;
    if (reviewKey === "outside") { box.insertAdjacentHTML("beforeend", `<p class="react">💪 Your study is solid. Just remember ${t.fic} ${esc(t.factor)} when you explain it.</p>`); box.appendChild(nextBtn("Next: Was your prediction right? →")); return; }
    if (!p.fix) {
      const slot = reviewKey === "leading" ? "measure" : "sample", to = reviewKey === "leading" ? "survey" : "random", set = slot === "measure" ? MEASURES : SAMPLES;
      box.insertAdjacentHTML("beforeend", `<h3>🔧 Dr. Ruiz gives you extra lab time. Fix it?</h3>`);
      const row = document.createElement("div"); row.className = "picks two";
      [[to, set[to].ic, "Fix it: " + set[to].t, slot === "measure" ? measureLine(to, t) : set[to].d], ["keep", "✋", "Keep it", "Go with what you have. Kai will notice."]].forEach(([id, ic, tt, dd]) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "pick"; b.dataset.fix = id;
        b.innerHTML = `<span class="t">${ic} ${esc(tt)}</span><span class="d">${esc(dd)}</span>`;
        b.onclick = () => { p.fix = id === "keep" ? { slot, from: p[slot], to: null } : { slot, from: p[slot], to: id }; if (id !== "keep") p[slot] = id; addNote("study"); save(); render(); };
        row.appendChild(b);
      });
      box.appendChild(row); return;
    }
    if (p.fix.to) {
      const after = flaw();
      box.insertAdjacentHTML("beforeend", `<p class="react">🔧 You redid it. ${after === "none" ? "✅ Both runs match now." : { noisy: "⚠️ Better question, but 6 people still flip.", narrow: "⚠️ Better question, but still only one class.", junk: "⚠️ Better sample, but the question still pushes yes." }[after]}</p>` + charts());
      addNoteQuiet("found");
    } else box.insertAdjacentHTML("beforeend", `<p class="react">✋ You kept it. Be ready to defend it.</p>`);
    box.appendChild(nextBtn("Next: Was your prediction right? →"));
  }
  function addNoteQuiet(k) { if (st.p1.last !== k) { st.p1.last = k; save(); sideP1(); } }

  // 7 · Supported?
  function p1support() {
    const p = st.p1, t = T1(), ans = supportAnswer();
    const box = stageCard(`<h2>Was your prediction right?</h2>`);
    const ownOpts = [SUP_TXT[ans]].concat(Object.keys(SUP_TXT).filter(k => k !== ans).map(k => SUP_TXT[k]));
    const variants = [{ html: `<p class="hyp"><span class="tag">🔮 Your hypothesis</span><br><b>${esc(`Students ${t.who} will ${t[p.hyp]} ${t.than}.`)}</b></p>` + charts(),
      q: "Compare your prediction to your chart. Was it supported?", options: ownOpts,
      hint: "Which group's bar is higher? Did both runs match? Then reread your prediction.",
      why: ans === "no" ? "A hypothesis can be <b>wrong</b>. That's still good science: now you know more." : ans === "cant" ? "Broken data can't <b>support</b> or <b>reject</b> a hypothesis." : "<b>Supported</b> = the data matched your prediction. It doesn't mean proven forever." }]
      .concat(shuffleSeed(SUPPORT_CASES.map((x, i) => i)).map(i => { const S = SUPPORT_CASES[i];
        return { html: `<p class="hyp"><span class="tag">🔮 Kai's hypothesis</span><br><b>${esc(S.hyp)}</b></p><div class="charts">${S.runs.map((r, n) => `<div class="chart"><p class="chart-t">Run ${n + 1}</p><p class="chart-u">${S.unit}</p>${barRows(r.map(([l, v]) => ({ l, v, max: S.max, txt: String(v) })))}</div>`).join("")}</div>`,
          q: "Was Kai's prediction supported?", options: [SUP_TXT[S.ans]].concat(Object.keys(SUP_TXT).filter(k => k !== S.ans).map(k => SUP_TXT[k])),
          hint: "Check which bar is higher in BOTH runs, then reread the prediction.", why: { yes: "Both runs matched the prediction: <b>supported</b>.", no: "The data went the other way: <b>not supported</b>.", cant: "The runs flipped, so you <b>can't tell</b>." }[S.ans] }; }));
    mcq(box, "p1sup", variants, () => { addNote("sup"); render(); }, { one: true });
    if (chk("p1sup").done) box.appendChild(nextBtn("Next: Does it prove cause? →"));
  }

  // 8 · Cause?
  function p1cause() {
    const t = T1(), br = broken();
    const box = stageCard(`<h2>Kai goes live: “PROVE IT”</h2>`);
    const own = { html: kaiPostHtml(br ? "lol your data is a mess. so was I right or not? 😤" : `ok lab kid. your chart shows a pattern. but does ${esc(t.ivShort)} actually CAUSE it? PROVE IT 😤`, { stats: false }),
      q: "What's the honest answer to Kai?",
      options: br ? ["Can't say. Our data is too broken to show a pattern", "Yes. Most people in our study agreed with the idea", "Yes, because we ran our study two separate times", "No. Broken data proves the opposite is true"]
        : ["Not proven. Two things going together isn't proof", "Yes. Our chart proves that one causes the other", "Yes, because both of our runs matched up", "No. Our whole study turned out to be useless"],
      hint: br ? "Did your study even show a clear pattern?" : "Think about your outside factor. Could it explain the pattern instead?",
      why: "<b>Correlation</b> = two things go together. <b>Causation</b> = one makes the other happen. A pattern alone isn't proof." };
    const variants = [own].concat(shuffleSeed(CAUSE_CASES.map((x, i) => i)).map(i => ({ html: kaiPostHtml(esc(CAUSE_CASES[i].post), { stats: false }), q: "New one. What's the honest answer?", options: CAUSE_CASES[i].options,
      hint: "Could something ELSE explain why these two go together?", why: own.why })));
    mcq(box, "p1cause", variants, () => { addNote("cause"); render(); });
    if (chk("p1cause").done) box.appendChild(nextBtn("Next: Write your headline →"));
  }

  // 9 · Headline
  function p1headline() {
    const p = st.p1, H = headlineSet();
    const box = stageCard(`<h2>Pick the headline for your Community Note</h2>` +
      coach("Bold headlines get more views. But a good scientist only says what the data <b>really</b> shows. That's called being <b>objective</b>."));
    const list = document.createElement("div"); list.className = "headlines"; box.appendChild(list);
    shuffleSeed(["bold", "subtle", "honest"]).forEach(k => {
      const b = document.createElement("button"); b.type = "button"; b.className = "hl"; b.dataset.hl = k;
      b.innerHTML = `<span>“${esc(H[k])}”</span><span class="views">${{ bold: "📈 goes viral", subtle: "📊 lots of views", honest: "📉 fewer views" }[k]}</span>`;
      b.onclick = () => { p.headline = k; p.s++; addNote("headline"); save(); render(); };
      list.appendChild(b);
    });
  }

  // 10 · Post it → ending
  function endingId1() {
    const f = flaw(), h = st.p1.headline;
    if (h === "bold" || h === "subtle") return broken() ? "played" : "factcheck";
    if (f === "none") return "holds";
    return f === "narrow" ? "small" : "backlab";
  }
  const ENDINGS1 = {
    holds: { icon: "🏆", cls: "good", t: "The Study Holds Up", line: "Another school repeats your study and finds the same pattern. Your note matched the evidence.", kai: "readers added context to MY post?? 😭 my views are tanking" },
    small: { icon: "🔍", cls: "mid", t: "Honest, But Small", line: "Your note was honest, but one class can't speak for the whole school. Next time: a random sample.", kai: "lol one class of juniors 😂 still… ur note is kinda fair" },
    factcheck: { icon: "🚨", cls: "warn", t: "Fact-Checked", line: "Your data was decent, but your headline said one thing CAUSES another. Now YOUR note got a correction.", kai: "LMAO the fact-checker got fact-checked 🤣" },
    played: { icon: "😈", cls: "badend", t: "Played by Bad Data", line: "Your headline went viral, but your study was broken. Readers figured it out fast.", kai: "see? lab kids make stuff up too 😈" },
    backlab: { icon: "🔁", cls: "mid", t: "Back to the Lab", line: "You admitted the problem in public. That's honest science. Next week, you redo it right.", kai: "ok respect for admitting it I guess 😒" }
  };
  function causedBy1() {
    const p = st.p1, out = [];
    const firstM = p.fix && p.fix.to && p.fix.slot === "measure" ? p.fix.from : p.measure;
    const firstS = p.fix && p.fix.to && p.fix.slot === "sample" ? p.fix.from : p.sample;
    out.push({ leading: "👍 Yes/no question → pushed people to say yes", survey: "📝 Short survey → fair answers", record: "📊 Tracked data → solid numbers" }[firstM]);
    out.push({ friends: "🍕 6 friends → results jumped around", oneclass: "🏫 One class → only juniors", random: "🎲 100 at random → matched the whole school" }[firstS]);
    if (p.fix && p.fix.to) out.push("🔧 Fixed it → " + (p.fix.slot === "measure" ? MEASURES : SAMPLES)[p.fix.to].t);
    else if (p.fix) out.push("✋ Kept the problem → it stayed in your data");
    const s = supportAnswer();
    out.push(s === "cant" ? "🤷 Data too broken to test your prediction" : s === "yes" ? "✅ Your prediction was supported" : "❌ Your prediction wasn't supported (that's OK!)");
    out.push(p.headline === "bold" ? "🔥 Bold headline → claimed proof of cause" : p.headline === "subtle" ? "📊 “New study” headline → quietly claimed cause" : "🧊 Careful headline → matched the evidence");
    return out;
  }
  function p1post() {
    const p = st.p1, t = T1();
    if (!p.posted) {
      const box = stageCard(`<h2>Your Community Note is ready</h2>` + coach("Read your note on the right. Every line came from a step you proved. Ready to post it under Kai's post?") + `<div class="runbox"><div style="font-size:4rem">📌</div></div>`);
      const b = btn("📌 Post my Community Note", () => { p.posted = true; save(); render(); }); b.id = "postBtn"; box.appendChild(b); return;
    }
    const eid = endingId1(), E = ENDINGS1[eid];
    kai(E.kai, true);
    const box = stageCard(`<div class="ending ${E.cls}"><div class="e">${E.icon}</div><h2>${E.t}</h2><p>${E.line}</p><p><b>${esc(broken() ? "Kai's hot take: can't tell yet. Your data was too broken to check it." : t.kaiLine)}</b></p></div>
      <div class="caused"><p><b>Caused by:</b></p><ul>${causedBy1().map(c => `<li>${c}</li>`).join("")}</ul></div>`);
    const b = nextBtn("⚔️ Kai's not done. Face his comeback →"); b.classList.add("kai"); box.appendChild(b);
  }

  // =================================================================
  //  BOSS: Kai's Comeback (both parts)
  // =================================================================
  const BOSS_CFG = {
    1: { bank: BANK1, stamps: STAMPS1, types: ["leading", "small", "biased", "cause", "testable", "objective"], count: 5, must: ["cause"], q: "Call it out: what's wrong with Kai's “study”?",
      intro: "Kai's mad. He's firing back with his OWN “studies.” Slam the stamp that calls out what's wrong. Miss one and he gets another comeback.", winKai: "ok FINE. I'm deleting my account 😭 (jk… but ok)", key: "p1boss" },
    2: { bank: BANK2, stamps: STAMPS2, types: ["survey", "interview", "observe", "experiment", "content", "ethics"], count: 5, must: ["ethics"], q: "Which tool should the lab use? (Or is the plan not allowed?)",
      intro: "Kai's back with requests from his followers. Pick the right tool for each one, or stamp “Not allowed” if the plan breaks an ethics rule. Miss one and he sends another.", winKai: "…ok your lab is actually legit. don't tell anyone 😶", key: "p2boss" }
  };
  function bossInit(part) {
    const cfg = BOSS_CFG[part];
    const others = shuffle(cfg.types.filter(x => !cfg.must.includes(x))).slice(0, cfg.count - cfg.must.length);
    const types = shuffle(cfg.must.concat(others));
    const seen = part === 1 ? (st.p1.seen || []) : [];
    const q = types.map(ty => { const opts = cfg.bank.filter(x => x.type === ty && !seen.includes(x.id)); return (opts.length ? pickOne(opts) : pickOne(cfg.bank.filter(x => x.type === ty))).id; });
    return { queue: q, pos: 0, first: {}, result: null, won: false, misses: 0 };
  }
  function bossScreen(part, onWin, standalone) {
    const cfg = BOSS_CFG[part];
    const b = standalone ? (st.proveBoss = st.proveBoss || bossInit(1)) : (P().boss = P().boss || bossInit(part));
    save();
    if (b.won) {
      const box = stageCard(`<div class="ko"><div class="e">🏆</div><h2>You beat Kai's Comeback!</h2><p>${b.misses ? "It took " + b.misses + " extra comeback" + (b.misses > 1 ? "s" : "") + ", but you proved it." : "Flawless. Not one miss."}</p></div>` +
        `<p class="kaisay" style="margin-top:10px">😤 Kai: “${cfg.winKai}”</p>`);
      kai(cfg.winKai, true);
      onWin(box); return;
    }
    const left = b.queue.length - b.pos;
    const card = cfg.bank.find(x => x.id === b.queue[b.pos]);
    const box = stageCard(`<div class="boss"><div class="bosshead"><h2>⚔️ Kai's Comeback${part === 2 ? " 2" : ""}</h2><span class="lives">Comebacks left: <span>${"😤".repeat(left)}</span></span></div>` +
      (b.pos === 0 && !b.result ? coach(cfg.intro) : "") + `<div id="bossCard"></div></div>`);
    const holder = $("bossCard");
    if (b.result) {
      // Show why, then the next card.
      const R = b.result, rc = cfg.bank.find(x => x.id === R.id);
      holder.innerHTML = `<div class="check ${R.ok ? "solved" : ""}">${kaiPostHtml(esc(rc.post), { stats: false })}<p class="q" style="margin-top:6px">${R.ok ? "💥 CALLED OUT!" : "❌ Kai dodged it. +1 comeback for Kai."}</p>${reveal(rc.why)}</div>`;
      const nb = btn(b.pos >= b.queue.length ? "Finish him →" : "Next comeback →", () => { b.result = null; if (b.pos >= b.queue.length) b.won = true; save(); render(); }, "kai"); nb.id = "nextBtn";
      holder.appendChild(nb);
      return;
    }
    const wrap = document.createElement("div"); wrap.className = "check bosspost"; holder.appendChild(wrap);
    wrap.innerHTML = kaiPostHtml(esc(card.post), { stats: false }) + `<p class="q" style="margin-top:6px">${cfg.q}</p>`;
    const area = document.createElement("div"); area.className = "stamps"; wrap.appendChild(area);
    shuffle(cfg.types).forEach(k => {
      const S = cfg.stamps[k];
      const sb = document.createElement("button"); sb.type = "button"; sb.className = "sbtn"; sb.dataset.k = k;
      sb.innerHTML = `<span class="si">${S.ic}</span>${S.t}<small>${S.s}</small>`;
      sb.onclick = () => {
        if (locked) return;
        const ok = k === card.type;
        if (!(card.type in b.first)) b.first[card.type] = ok;
        if (part === 1) { st.p1.seen = (st.p1.seen || []).concat(card.id); }
        b.pos++;
        if (!ok) {
          b.misses++;
          const used = b.queue.concat(st.p1.seen || []);
          const fresh2 = cfg.bank.filter(x => x.type === card.type && !used.includes(x.id));
          b.queue.push((fresh2.length ? pickOne(fresh2) : pickOne(cfg.bank.filter(x => x.type === card.type && x.id !== card.id))).id);
          taunt(b.misses - 1);
          wrap.classList.remove("spark"); void wrap.offsetWidth; wrap.classList.add("spark");
          area.querySelectorAll("button").forEach(x => x.disabled = true); sb.classList.add("nope");
          locked = true;
          const fb = document.createElement("p"); fb.className = "msg bad"; wrap.appendChild(fb);
          let n = lockSecs();
          const tick = () => { if (n <= 0) { locked = false; b.result = { id: card.id, ok: false }; save(); render(); return; } fb.textContent = "❌ Nope… " + n; n--; setTimeout(tick, 1000); };
          tick(); save(); return;
        }
        nervous();
        b.result = { id: card.id, ok: true }; save(); render();
      };
      area.appendChild(sb);
    });
  }
  function p1boss() {
    bossScreen(1, box => { box.appendChild(nextBtn("📝 Last step: your lab report →")); });
  }

  // 12 · Lab report + turn in
  const PROMPTS1 = [
    { id: "hyp", short: "A new hypothesis (IV + DV)", label: "1. Make a new prediction about a different hot take. Fill in the blanks.",
      stem: "I predict students who ___ will ___ than students who ___. The IV is ___ and the DV is ___.", min: 70, newWords: 4, junkStarter: "",
      go4: "Go deeper (optional): would finding this pattern prove cause? Why?",
      mustAll: [["iv", "independent"], ["dv", "dependent"]], mustMsg: "In answer 1, name the IV AND the DV." },
    { id: "why", short: "A choice that changed my evidence", label: "2. Which choice made your evidence stronger or weaker? Why?",
      stem: "My evidence got stronger/weaker when I ___ because ___.", min: 60, newWords: 5,
      mustAll: [["sample", "random", "friend", "class", "junior", "question", "leading", "yes/no", "survey", "record", "tracked", "grades", "gpa", "headline", "cause", "repeat", "run", "6 ", "100", "25", "fix", "factor", "energy", "money", "mood", "rule"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name a choice (sample, question, headline…) AND say why (use “because”)." }
  ];
  function p1report() { reportScreen(1, PROMPTS1, ENDINGS1[endingId1()], T1()); }

  // =================================================================
  //  PART 2
  // =================================================================
  function p2lock() {
    $("wrap").classList.add("solo"); side.innerHTML = "";
    const p1 = st.p1;
    const box = stageCard(`<div class="lockcard"><div class="e">🔒</div><h2>Part 2 is locked</h2>
      <p>You have to prove Part 1 first.${p1.s ? ` On this Chromebook, you're on Part 1 step ${p1.s + 1} of ${P1_NAMES.length}.` : ""}</p></div>`);
    const row = document.createElement("div"); row.className = "row"; row.style.justifyContent = "center";
    row.appendChild(btn(p1.s ? "Finish Part 1 →" : "Start Part 1 →", () => { st.part = 1; save(); render(); }));
    box.appendChild(row);
    box.insertAdjacentHTML("beforeend", `<p style="text-align:center;margin-top:16px">Did Part 1 on a <b>different Chromebook</b>?</p>`);
    const r2 = document.createElement("div"); r2.className = "row"; r2.style.justifyContent = "center";
    const pb = btn("⚔️ Prove it here: beat Kai's Comeback", () => { st.proving = true; save(); render(); }, "kai"); pb.id = "proveBtn"; r2.appendChild(pb);
    box.appendChild(r2);
  }
  function p2prove() {
    $("wrap").classList.add("solo"); side.innerHTML = "";
    bossScreen(1, box => { st.proved = true; st.proving = false; save(); box.appendChild(btn("🔓 Open Part 2 →", () => { render(); })); }, true);
  }

  // 0 · Recap + topic
  function p2topic() {
    const p = st.p2;
    if (!p.topic) { p.topic = st.p1.topic || null; save(); }
    const box = stageCard(`<span class="kick">Part 2 · Day 6</span><h2>Research Rivals</h2>` +
      coach(`${st.p1.topic ? `Yesterday you fact-checked <b>${TOPICS[st.p1.topic].ic} ${TOPICS[st.p1.topic].name}</b>.` : "In Part 1, you fact-checked one of Kai's hot takes."} Now Kai says research is “just asking followers.” Sociologists actually have <b>5 research tools</b>. Try all 5, then use them to beat him.`) +
      `<h3>Pick your topic for today</h3><div class="picks two" id="topics"></div>`);
    TOPIC_ORDER.forEach(k => {
      const t = TOPICS[k];
      const b = document.createElement("button"); b.type = "button"; b.className = "pick topic" + (p.topic === k ? " sel" : ""); b.dataset.topic = k;
      b.innerHTML = `<span class="t">${t.ic} ${t.name}${k === st.p1.topic ? " · yesterday's" : ""}</span><span class="take">“${t.take}”</span>`;
      b.onclick = () => { p.topic = k; save(); render(); };
      $("topics").appendChild(b);
    });
    if (p.topic) box.appendChild(nextBtn("Open the toolbox →"));
  }

  // 1 · Try all 5 tools
  function p2tools() {
    const p = st.p2, t = T2();
    const left = TOOLS.filter(k => !(k in p.pred)).length;
    const box = stageCard(`<h2>Try each tool on ${t.ic} ${esc(t.name)}</h2>` +
      coach(left === 5 ? "Tap a tool. Guess what it gets you first, then see what it found." : left ? `${left} more to try. Each tool sees a different piece of the picture.` : "That's all 5. Every tool finds something, and every tool misses something."));
    const row = document.createElement("div"); row.className = "tools"; box.appendChild(row);
    TOOLS.forEach(k => {
      const b = document.createElement("button"); b.type = "button"; b.className = "tool" + ((k in p.pred) ? " tried" : "") + (p.open === k ? " sel" : ""); b.dataset.tool = k;
      b.innerHTML = `<span class="ti">${TOOL[k].ic}</span><span class="tn">${TOOL[k].name}</span>`;
      b.onclick = () => { p.open = k; if (!p.predOpt[k]) p.predOpt[k] = shuffle([k, pickOne(TOOLS.filter(x => x !== k))]); save(); render(); };
      row.appendChild(b);
    });
    if (p.open) {
      const k = p.open, r = t.r[k], tl = TOOL[k];
      const res = document.createElement("div"); res.className = "toolres"; box.appendChild(res);
      if (!(k in p.pred)) {
        res.innerHTML = `<p><b>🔮 Guess first:</b> a <b>${tl.ic} ${tl.name}</b> (${tl.what.toLowerCase()}) gets you…</p>`;
        const pr = document.createElement("div"); pr.className = "opts";
        p.predOpt[k].forEach(opt => {
          const b = document.createElement("button"); b.type = "button"; b.className = "opt"; b.dataset.pred = opt; b.textContent = TOOL[opt].gets;
          b.onclick = () => { p.pred[k] = opt === k; save(); render(); };
          pr.appendChild(b);
        });
        res.appendChild(pr);
      } else {
        res.innerHTML = `<p><b>${tl.ic} ${tl.name}</b> · ${p.pred[k] ? "✅ Good guess!" : "🤔 Not quite. It gets you: " + tl.gets.toLowerCase() + "."}</p>
          <p>${r.cant ? `<span class="tr-tag bad">🚫 Can't run it</span>` : `<span class="tr-tag good">✅ Found</span>`} ${r.found}</p>
          <p><span class="tr-tag bad">🚫 Can't tell you</span> ${r.no}</p>${k === "observe" ? `<p>${HAWTHORNE}</p>` : ""}<p class="madeup">Made-up game data${k === "observe" ? " (except the real case)" : ""}</p>`;
      }
    }
    if (!left) box.appendChild(nextBtn("Next: Match the tools →"));
  }

  // 2 · Match
  let matchPick = null;
  function p2match() {
    const p = st.p2, c = chk("p2match");
    const box = stageCard(`<h2>Match each tool to its job</h2>`);
    if (c.done) {
      box.insertAdjacentHTML("beforeend", `<div class="check solved"><span class="stamp">✔ All matched</span>${MATCH_QS.map(m => `<p>${TOOL[m.a].ic} <b>${TOOL[m.a].name}</b> → ${m.q}</p>`).join("")}</div>` + reveal("Pick the tool by the <b>question</b>, not by what's easiest."));
      box.appendChild(nextBtn("Next: Clients →")); return;
    }
    box.insertAdjacentHTML("beforeend", coach("Tap a question, then tap the tool that answers it best. All 5, then check."));
    const wrap = document.createElement("div"); wrap.className = "check"; box.appendChild(wrap);
    const fb = document.createElement("p"); fb.className = "msg";
    if (!p.mqOrder) { p.mqOrder = shuffle([0, 1, 2, 3, 4]); save(); }
    function draw() {
      wrap.innerHTML = "";
      const qs = document.createElement("div"); qs.className = "mq"; wrap.appendChild(qs);
      p.mqOrder.forEach(i => {
        const m = MATCH_QS[i], got = p.match[i], bad = p.badMatch.includes(i) && got;
        const b = document.createElement("button"); b.type = "button"; b.className = "mqbtn" + (matchPick === i ? " picked" : "") + (got ? " full" : "") + (bad ? " bad" : ""); b.disabled = locked; b.dataset.mq = i;
        b.innerHTML = `<span class="mq-q">${m.q}</span><span class="mq-a">${got ? (bad ? "✗ " : "") + TOOL[got].ic + " " + TOOL[got].name : "⬚ tap, then a tool"}</span>`;
        b.onclick = () => { if (locked) return; matchPick = matchPick === i ? null : i; draw(); };
        qs.appendChild(b);
      });
      const used = Object.values(p.match);
      const row = document.createElement("div"); row.className = "tools"; wrap.appendChild(row);
      TOOLS.forEach(k => {
        const b = document.createElement("button"); b.type = "button"; b.className = "tool" + (used.includes(k) ? " used" : ""); b.dataset.tool = k; b.disabled = locked;
        b.innerHTML = `<span class="ti">${TOOL[k].ic}</span><span class="tn">${TOOL[k].name}</span>`;
        b.onclick = () => {
          if (locked) return;
          if (matchPick == null) { fb.className = "msg"; fb.textContent = "👆 Tap a question first, then a tool."; return; }
          Object.keys(p.match).forEach(q => { if (p.match[q] === k) delete p.match[q]; });
          p.match[matchPick] = k; p.badMatch = p.badMatch.filter(x => x !== matchPick); matchPick = null; save(); draw();
        };
        row.appendChild(b);
      });
      const go = btn("✔ Check my matches", () => {
        const wrongN = MATCH_QS.filter((m, i) => p.match[i] !== m.a).length;
        if (!wrongN) { c.done = true; save(); nervous(); render(); return; }
        c.wrong++; taunt(c.wrong - 1);
        p.badMatch = MATCH_QS.map((m, i) => i).filter(i => p.match[i] !== MATCH_QS[i].a);
        save(); locked = true; draw();
        let n = lockSecs();
        const tick = () => { if (n <= 0) { locked = false; fb.className = "msg bad"; fb.textContent = wrongN + (wrongN === 1 ? " match is" : " matches are") + " marked ✗. Tap a ✗, then pick a different tool."; draw(); return; } fb.className = "msg bad"; fb.textContent = "❌ " + wrongN + " wrong… " + n; n--; setTimeout(tick, 1000); };
        tick();
      });
      go.id = "matchBtn"; go.disabled = locked || Object.keys(p.match).length < 5; wrap.appendChild(go);
      wrap.appendChild(fb);
    }
    draw();
  }

  // 3 · Clients (a wrong tool = that client walks out and a NEW client with the same kind of question comes in)
  function p2clients() {
    const p = st.p2, cl = p.cl;
    const box = stageCard(`<h2>Clients: pick the right tool</h2>`);
    const solved = CLIENT_SLOTS.slice(0, cl.slot);
    if (solved.length) box.insertAdjacentHTML("beforeend", `<div class="check solved" style="padding:6px 12px">${solved.map(s => { const C = CLIENTS[s][(cl.v[s] || 0) % CLIENTS[s].length]; return `<p>✔ ${C.ic} <b>${C.who}</b> → ${CLIENT_WHY[s]}</p>`; }).join("")}</div>`);
    if (cl.slot >= CLIENT_SLOTS.length) { box.insertAdjacentHTML("beforeend", reveal("3 for 3. You picked by the <b>question</b>, not by habit.")); box.appendChild(nextBtn("Next: A real case →")); return; }
    if (!cl.slot && !cl.v.observe) box.insertAdjacentHTML("beforeend", coach("Read what the client REALLY wants to know. Pick the tool that answers that kind of question. Pick wrong and the client walks out."));
    const slot = CLIENT_SLOTS[cl.slot], vi = cl.v[slot] || 0, C = CLIENTS[slot][vi % CLIENTS[slot].length], cid = "p2c_" + slot, c = chk(cid);
    const wrap = document.createElement("div"); wrap.className = "check"; box.appendChild(wrap);
    wrap.innerHTML = `<div class="coach"><span class="av">${C.ic}</span><div class="bubble"><span class="who">${esc(C.who)} · made up${vi ? ` <span class="new">NEW CLIENT</span>` : ""}</span><b>“${esc(C.ask)}”</b></div></div>`;
    const fb = document.createElement("div"); fb.className = "msg";
    const row = document.createElement("div"); row.className = "tools"; wrap.appendChild(row); wrap.appendChild(fb);
    shuffleSeed(TOOLS.slice()).forEach(k => {
      const b = document.createElement("button"); b.type = "button"; b.className = "tool"; b.dataset.tool = k;
      b.innerHTML = `<span class="ti">${TOOL[k].ic}</span><span class="tn">${TOOL[k].name}</span>`;
      b.onclick = () => {
        if (locked) return;
        if (k === slot) { c.done = true; cl.slot++; save(); nervous(); render(); return; }
        c.wrong++; taunt(c.wrong - 1); save();
        row.querySelectorAll("button").forEach(x => x.disabled = true); b.classList.add("nope");
        locked = true;
        let n = lockSecs() + 2;
        const tick = () => {
          fb.className = "msg bad";
          if (n <= 0) { locked = false; cl.v[slot] = vi + 1; save(); render(); return; }
          fb.innerHTML = `${TOOL[k].ic} <b>${TOOL[k].name}?</b> ${esc(C.wrong[k])}<br>🚪 The client walks out. <span class="new">new client in ${n}…</span>`;
          n--; setTimeout(tick, 1000);
        };
        tick();
      };
      row.appendChild(b);
    });
  }

  // 4 · Real ethics case
  function p2ethics() {
    const box = stageCard(`<h2>Case file: did these researchers break the rules?</h2>` +
      coach("Researchers have to follow <b>ethics</b> rules. These are real cases. Stamp the rule that was broken."));
    const variants = ETHICS_CASES.map(E => ({ html: `<div class="case"><p class="tag">${E.tag}</p>${E.text}</div>`, q: E.q, ans: E.ans,
      hint: "Ask first? Keep names private? Hurt anyone? Real results?", why: E.why }));
    stampCheck(box, "p2ethics", variants, ETHICS, () => render());
    if (chk("p2ethics").done) box.appendChild(nextBtn("Next: Your phone is ringing →"));
  }

  // 5 · The $500 call
  function p2deal() {
    const p = st.p2;
    const box = stageCard(`<h2>📱 Your lab's phone rings</h2><div class="phone"><p>A homework-app company: “We'll pay your lab <b>$500</b> if your report says our app <b>raises grades</b>.”</p><p>Your data only shows students <i>like</i> the app. It says nothing about grades.</p></div>`);
    if (!p.deal) {
      const row = document.createElement("div"); row.className = "picks two"; row.style.marginTop = "10px";
      [["truth", "🧾", "Report what the data shows", "No $500."], ["lie", "💰", "Take the $500", "Write what they want."]].forEach(([id, ic, tt, dd]) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "pick"; b.dataset.deal = id;
        b.innerHTML = `<span class="ic">${ic}</span><span class="t">${tt}</span><span class="d">${dd}</span>`;
        b.onclick = () => { p.deal = id; save(); if (id === "lie") kai("LEAKED 🧾 the lab took $500 to say an app raises grades 💀", true); else kai("wait you said no to $500?? 😳", true); render(); };
        row.appendChild(b);
      });
      box.appendChild(row); return;
    }
    box.insertAdjacentHTML("beforeend", p.deal === "truth"
      ? `<p class="react" style="margin-top:10px">🧾 You told the truth. The company hangs up. Dr. Ruiz nods.</p>` + reveal("<b>Honesty</b>: report what the data shows, even when someone pays you not to. Staying <b>objective</b> means money can't pick your results.")
      : `<p class="react" style="margin-top:10px">💰 You took the money… and Kai found out.</p>${kaiPostHtml("LEAKED 🧾 the lab took $500 to say an app raises grades. their data never showed that.", { views: "1.9M views" })}` + reveal("<b>Honesty</b>: faking results breaks trust in ALL research. That's why it's an ethics rule."));
    box.appendChild(nextBtn("Next: Kai's final challenge →"));
  }

  // 6 · Mixed methods
  function p2mixed() {
    const p = st.p2, t = T2(), c = chk("p2mixed"), V = MIXED[c.v % MIXED.length];
    const box = stageCard(`<h2>Final challenge: out-research Kai</h2>` + kaiPostHtml(`${esc(t.name.toLowerCase())}: ${esc(V.kai)}`, { stats: false }));
    if (c.done) {
      const extra = V.ans[0] === "survey" && V.ans[1] === "interview" ? `<div class="toolres"><p><span class="tr-tag good">📋 How many</span> ${t.r.survey.found}</p><p><span class="tr-tag good">🎙️ Why</span> ${t.r.interview.found}</p><p class="madeup">Made-up game data</p></div>` : "";
      box.insertAdjacentHTML("beforeend", `<div class="check solved"><span class="stamp">✔ Mixed methods</span>${extra}</div>` + reveal(V.why) + `<p class="react">😤 Kai: “…ok that's actually kinda solid.”</p>`);
      box.appendChild(nextBtn("See your results →")); return;
    }
    box.insertAdjacentHTML("beforeend", coach(`One tool can't answer both parts. Pick the <b>2 tools</b> that do.${c.v ? ` <span class="new">NEW QUESTION</span>` : ""}`));
    const wrap = document.createElement("div"); wrap.className = "check"; box.appendChild(wrap);
    const sel = p.mixedSel || [];
    const row = document.createElement("div"); row.className = "tools"; wrap.appendChild(row);
    const fb = document.createElement("p"); fb.className = "msg";
    TOOLS.forEach(k => {
      const b = document.createElement("button"); b.type = "button"; b.className = "tool" + (sel.includes(k) ? " sel" : ""); b.dataset.tool = k; b.disabled = locked;
      b.innerHTML = `<span class="ti">${TOOL[k].ic}</span><span class="tn">${TOOL[k].name}</span>`;
      b.onclick = () => { if (locked) return; let s = sel.slice(); if (s.includes(k)) s = s.filter(x => x !== k); else { s.push(k); if (s.length > 2) s.shift(); } p.mixedSel = s; save(); render(); };
      row.appendChild(b);
    });
    const go = btn(sel.length === 2 ? "Use both tools →" : "Pick " + (2 - sel.length) + " more", () => {
      if (V.ans.every(a => sel.includes(a))) { c.done = true; save(); nervous(); render(); return; }
      c.wrong++; taunt(c.wrong - 1); save();
      row.querySelectorAll("button").forEach(x => x.disabled = true); go.disabled = true;
      wrongWait(fb, "Not quite. " + V.hint, () => { c.v++; p.mixedSel = []; save(); render(); });
    });
    go.id = "mixedBtn"; go.disabled = sel.length !== 2 || locked;
    wrap.appendChild(go); wrap.appendChild(fb);
  }

  // 7 · Results
  const ENDINGS2 = {
    trusted: { icon: "🏆", cls: "good", t: "The Lab Kai Can't Beat", line: "You found the right tool for every question, and you stayed honest. Clients trust your lab." },
    leaked: { icon: "🧾", cls: "badend", t: "Good Tools, Broken Trust", line: "You knew your tools, but the $500 leak follows you. Now nobody's sure your reports are real." }
  };
  const endingId2 = () => (st.p2.deal === "lie" ? "leaked" : "trusted");
  function causedBy2(forTeacher) {
    const t = T2(), out = [];
    const miss = id => !forTeacher ? "" : chk(id).wrong ? ` (after ${chk(id).wrong} ${chk(id).wrong === 1 ? "miss" : "misses"})` : " (first try)";
    out.push(`🧰 Tried all 5 tools on ${t.ic} ${t.name}`);
    out.push("🧩 Matched each tool to its question" + miss("p2match"));
    CLIENT_SLOTS.forEach(s => out.push(`📞 ${TOOL[s].name} client` + miss("p2c_" + s)));
    out.push("⚖️ Named the broken ethics rule in a real case" + miss("p2ethics"));
    out.push(st.p2.deal === "truth" ? "🧾 Turned down the $500 → stayed honest" : "💰 Took the $500 → it leaked");
    out.push("🔀 Picked 2 tools that cover each other" + miss("p2mixed"));
    return out;
  }
  function p2results() {
    const E = ENDINGS2[endingId2()];
    const box = stageCard(`<div class="ending ${E.cls}"><div class="e">${E.icon}</div><h2>${E.t}</h2><p>${E.line}</p></div>
      <div class="caused"><p><b>Caused by:</b></p><ul>${causedBy2().map(c => `<li>${c}</li>`).join("")}</ul></div>`);
    const b = nextBtn("⚔️ Kai's not done. Face Comeback 2 →"); b.classList.add("kai"); box.appendChild(b);
  }
  function p2boss() { bossScreen(2, box => { box.appendChild(nextBtn("📝 Last step: your research report →")); }); }

  const PROMPTS2 = [
    { id: "method", short: "My question, method, strength, and limit", label: "1. Pitch a study about teen life. Which tool would you use, and what's one limit?",
      stem: "I'd study ___. I'd use ___ because ___. One limit is ___.", min: 80, newWords: 6,
      mustAll: [["survey", "interview", "observ", "experiment", "content analysis", "content", "ads", "media", "watch", "count"], ["limit", "but", "however", "slow", "small", "watched", "lie", "honest", "cost", "can't", "cannot", "weak", "although", "fake", "time", "bias", "random", "won't", "wont"]],
      mustMsg: "Answer 1: name a tool AND one limit." },
    { id: "mixed", short: "Why two methods beat one", label: "2. Why is a survey AND interviews stronger than just one?",
      stem: "Both are stronger because the survey shows ___, and interviews show ___.", min: 60, newWords: 4,
      mustAll: [["how many", "how common", "number", "numbers", "percent", "%", "many", "pattern", "count", "lots of"], ["why", "reason", "story", "stories", "feel", "detail", "explain", "cause", "own words"]],
      go4: "Go deeper: which tool would you add third, and what would it catch that these two miss?",
      mustMsg: "Answer 2: say what the survey shows (how many) AND what interviews show (why)." }
  ];
  function p2report() { reportScreen(2, PROMPTS2, ENDINGS2[endingId2()], T2()); }

  // =================================================================
  //  REPORT + TURN IN (both parts)
  // =================================================================
  function reportScreen(part, prompts, E, t) {
    const p = st["p" + part];
    const box = stageCard(`<p class="react">${E.icon} ${E.t} · ${t.ic} ${esc(t.name)} · ⚔️ Beat Kai's Comeback</p>
      <div class="report" id="report"><p class="rt">📝 ${part === 1 ? "Lab report" : "Research report"} · 1–2 sentences each</p></div>`);
    const rep = $("report");
    prompts.forEach(q => rep.insertAdjacentHTML("beforeend", `<label for="w${part}_${q.id}">${q.label}</label><p class="stem">✏️ ${esc(q.stem)}</p>${q.go4 ? `<p class="go4">⭐ ${q.go4}</p>` : ""}<textarea id="w${part}_${q.id}" rows="2">${esc(p.writing[q.id] || "")}</textarea>`));
    rep.insertAdjacentHTML("beforeend", `<div class="row"><button type="button" class="go" id="sendBtn">${p.turnedIn ? "Turn in again" : "📨 Turn in"}</button><span class="turned" id="turnedBadge" ${p.turnedIn ? "" : "hidden"}>✓ Turned in</span><span id="afterSend" class="row"></span></div>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${p.turnedIn ? "Already turned in. You can fix your writing and turn it in again." : ""}</p>`);
    prompts.forEach(q => $(`w${part}_${q.id}`).addEventListener("input", e => { p.writing[q.id] = e.target.value; save(); }));
    $("sendBtn").onclick = () => send(part, prompts);
    if (p.turnedIn) afterSend(part);
  }
  function afterSend(part) {
    const a = $("afterSend"); if (!a) return;
    a.innerHTML = "";
    if (part === 1) {
      const gb = btn("🔓 Part 2 unlocked (Day 6) →", () => { st.part = 2; save(); render(); }); gb.style.marginTop = "8px"; a.appendChild(gb);
    } else a.insertAdjacentHTML("beforeend", `<span class="react">🎉 You finished both parts!</span>`);
  }
  async function send(part, prompts) {
    const msg = $("sendMsg"), p = st["p" + part];
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const q of (isT() ? [] : prompts)) {
      const box = $(`w${part}_${q.id}`), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: "junkStarter" in q ? q.junkStarter : q.stem, source: "from today" });
        if (junk) { msg.textContent = "For " + q.short + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < q.min) { msg.textContent = "Write a little more for: " + q.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + q.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemWords = new Set(plain(q.stem).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < q.newWords) { msg.textContent = "Add more of your own ideas for: " + q.short + ". Use details from today."; msg.className = "msg bad"; box.focus(); return; }
      const pv = " " + plain(v) + " ";
      if (q.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(pv)))) { msg.textContent = q.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const P_ = PARTS[part];
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: P_.id, assignmentTitle: P_.title, answers: part === 1 ? answers1() : answers2() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      p.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work."; msg.className = "msg good";
      $("sendBtn").textContent = "Turn in again"; $("turnedBadge").hidden = false; $("sendBtn").disabled = false;
      top(); afterSend(part);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  const line = id => (chk(id).wrong ? "after " + chk(id).wrong + " wrong " + (chk(id).wrong === 1 ? "try" : "tries") : "first try");
  function bossLine(b, cfg) {
    const types = Object.keys(b.first || {});
    const right = types.filter(k => b.first[k]).length;
    return { right, total: types.length, text: types.map(k => cfg.stamps[k].t + (b.first[k] ? " ✓" : " ✗ (missed first try)")).join(", ") + (b.misses ? ` · ${b.misses} extra comeback${b.misses > 1 ? "s" : ""}` : " · no misses") };
  }
  function answers1() {
    const p = st.p1, t = T1(), a = { "Standard": PARTS[1].std };
    const ids = ["p1q", "p1vars", "p1rev", "p1sup", "p1cause"];
    const b = bossLine(p.boss || st.proveBoss || {}, BOSS_CFG[1]);
    const right = ids.filter(id => chk(id).done && !chk(id).wrong).length + b.right, total = ids.length + b.total;
    a["First-try correct"] = right + " of " + total;
    a["First-try by standard"] = "Soc.1: " + right + " of " + total;
    a["Hot take tested"] = t.name + ": “" + t.take + "”";
    a["Pick the focused research question"] = t.q[0] + " (" + line("p1q") + ")";
    a["Hypothesis"] = "Students " + t.who + " will " + t[p.hyp] + " " + t.than + ".";
    a["Wire the IV and DV"] = "IV = " + t.iv + " · DV = " + t.dv + " (" + line("p1vars") + ")";
    const firstM = p.fix && p.fix.to && p.fix.slot === "measure" ? p.fix.from : p.measure;
    const firstS = p.fix && p.fix.to && p.fix.slot === "sample" ? p.fix.from : p.sample;
    a["Choice · How to measure"] = MEASURES[firstM].t + ": " + measureLine(firstM, t);
    a["Choice · Sample"] = SAMPLES[firstS].t + " (" + SAMPLES[firstS].d + ")";
    a["Diagnose your own data"] = STAMPS1[p.reviewKey].t + " (" + line("p1rev") + ")";
    a["Choice · Peer-review fix"] = !p.fix ? "No fix needed" : p.fix.to ? "Swapped to: " + (p.fix.slot === "measure" ? MEASURES : SAMPLES)[p.fix.to].t : "Kept the problem";
    a["Did the data support my hypothesis?"] = { yes: "Supported", no: "Not supported", cant: "Can't tell (broken data)" }[supportAnswer()] + " (" + line("p1sup") + ")";
    a["Pattern vs. proof of cause"] = (broken() ? "Can't say: data too broken to show a pattern" : "Not proven: going together isn't proof") + " (" + line("p1cause") + ")";
    a["Choice · Headline"] = headlineSet()[p.headline] + ({ bold: " (bold claim)", subtle: " (quiet cause claim)", honest: " (careful claim)" }[p.headline] || "");
    a["Boss · Kai's Comeback (call out the flaw)"] = b.text;
    a["Ending"] = ENDINGS1[endingId1()].t;
    a["Caused by"] = causedBy1().join(" | ");
    a["Data problem left at the end"] = { none: "None", noisy: "Tiny sample (6 friends)", narrow: "One class only", junk: "Leading question" }[flaw()];
    PROMPTS1.forEach(q => { a["Writing: " + q.short] = ($("w1_" + q.id).value || "").trim(); });
    return a;
  }
  function answers2() {
    const p = st.p2, t = T2(), a = { "Standard": PARTS[2].std };
    const ids = ["p2match", "p2c_observe", "p2c_interview", "p2c_experiment", "p2ethics", "p2mixed"];
    const b = bossLine(p.boss || {}, BOSS_CFG[2]);
    const right = ids.filter(id => chk(id).done && !chk(id).wrong).length + b.right, total = ids.length + b.total;
    a["First-try correct"] = right + " of " + total;
    a["First-try by standard"] = "Soc.1/Soc.3 (methods + ethics): " + right + " of " + total;
    a["Topic"] = t.name + (p.topic === st.p1.topic ? " (kept from Part 1)" : "");
    a["Match each tool to its question"] = "Survey→how many, Interview→why, Observation→what people do, Experiment→cause, Content analysis→media (" + line("p2match") + ")";
    CLIENT_SLOTS.forEach(s => { a["Client · " + TOOL[s].name + " question"] = TOOL[s].name + " (" + line("p2c_" + s) + ")"; });
    const ec = ETHICS_CASES[chk("p2ethics").v % ETHICS_CASES.length];
    a["Research ethics: real case"] = ec.tag + " → " + ETHICS[ec.ans].t + " (" + line("p2ethics") + ")";
    a["Choice · $500 deal"] = p.deal === "lie" ? "Took the $500 to fake results" : "Reported the real results";
    const mv = MIXED[chk("p2mixed").v % MIXED.length];
    a["Mixed methods"] = mv.ans.map(k => TOOL[k].name).join(" + ") + " (" + line("p2mixed") + ")";
    a["Boss · Kai's Comeback 2 (tool or not allowed)"] = b.text;
    a["Ending"] = ENDINGS2[endingId2()].t;
    a["Caused by"] = causedBy2(true).join(" | ");
    PROMPTS2.forEach(q => { a["Writing: " + q.short] = ($("w2_" + q.id).value || "").trim(); });
    return a;
  }

  // =================================================================
  //  RENDER
  // =================================================================
  const P1_SCREENS = [p1pick, p1ask, p1research, p1predict, p1design, p1run, p1review, p1support, p1cause, p1headline, p1post, p1boss, p1report];
  const P2_SCREENS = [p2topic, p2tools, p2match, p2clients, p2ethics, p2deal, p2mixed, p2results, p2boss, p2report];
  function render() {
    locked = false;
    const w = $("welcome"); if (w && !firstRender) w.remove();
    firstRender = false;
    if (st.part === 1 && st.p1.s >= 1 && !st.p1.topic) st.p1.s = 0;
    if (st.part === 2 && st.p2.s >= 1 && !st.p2.topic) st.p2.s = 0;
    top();
    if (!st.part || !st.name) { st.part = 0; hub(); return; }
    if (st.part === 2 && !part2Open()) { top(); if (st.proving) p2prove(); else p2lock(); return; }
    $("wrap").classList.remove("solo");
    if (st.part === 1) { sideP1(); (P1_SCREENS[st.p1.s] || p1pick)(); }
    else { sideP2(); (P2_SCREENS[st.p2.s] || p2topic)(); }
    top();
    if (welcomeText) { stage.insertAdjacentHTML("afterbegin", `<p class="welcome" id="welcome">${esc(welcomeText)}</p>`); welcomeText = ""; }
    if (window.classTestSkip) window.classTestSkip.refresh();
    fit();
  }
  let firstRender = true, welcomeText = "";
  // The shared site script adds a "Working as…" line above the game. Size the game to the space left,
  // so every screen fits without scrolling the page.
  function fit() { const sh = $("shell"); if (!sh) return; const topY = Math.max(0, sh.getBoundingClientRect().top); const h = Math.max(420, innerHeight - topY) + "px"; if (sh.style.height !== h) sh.style.height = h; }
  addEventListener("resize", fit); setInterval(fit, 700); setTimeout(fit, 50);
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this Chromebook.")) return;
    const name = st.name; st = fresh(); st.name = name; wire = { pick: null, iv: null, dv: null, order: null, v: -1 }; matchPick = null; kaiLine = "";
    save(); render();
  };

  if (urlPart && st.name && (urlPart === "1" || urlPart === "2")) st.part = +urlPart;
  if (st.part && st.name) welcomeText = "Welcome back, " + st.name + "!";
  render();
  window.__pil = { state: () => JSON.parse(JSON.stringify(st)) };

  // =================================================================
  //  TEST T. skip bar (shared/turnin.js): jump to any screen, answer the current one.
  // =================================================================
  try {
    const LABELS = ["Title"].concat(P1_NAMES.map(n => "P1 · " + n), P2_NAMES.map(n => "P2 · " + n));
    function fillP1(upTo) {
      const p = st.p1;
      if (!p.topic) { p.topic = TOPIC_ORDER[0]; st.startViews = Date.now(); }
      if (upTo > 1) chk("p1q").done = true;
      if (upTo > 2) { p.srcs.n0 = "keep"; p.srcs.n1 = "keep"; p.srcs.fan = "toss"; p.srcs.open = null; }
      if (upTo > 3) { p.hyp = p.hyp || "more"; chk("p1vars").done = true; }
      if (upTo > 4 && !p.built) { p.measure = p.draft.measure || "survey"; p.sample = p.draft.sample || "random"; p.built = true; }
      if (upTo > 5) p.ran = true;
      if (upTo > 6) { p.reviewKey = p.reviewKey || { junk: "leading", noisy: "small", narrow: "biased", none: "outside" }[flaw()]; chk("p1rev").done = true; if (p.reviewKey !== "outside" && !p.fix) p.fix = { slot: p.reviewKey === "leading" ? "measure" : "sample", from: p[p.reviewKey === "leading" ? "measure" : "sample"], to: null }; }
      if (upTo > 7) chk("p1sup").done = true;
      if (upTo > 8) chk("p1cause").done = true;
      if (upTo > 9) p.headline = p.headline || "honest";
      if (upTo > 10) p.posted = true;
      if (upTo > 11) { p.boss = p.boss || bossInit(1); p.boss.won = true; p.boss.result = null; }
    }
    function fillP2(upTo) {
      const p = st.p2;
      if (!p.topic) p.topic = st.p1.topic || TOPIC_ORDER[0];
      if (upTo > 1) TOOLS.forEach(k => { if (!(k in p.pred)) p.pred[k] = true; });
      if (upTo > 2) { MATCH_QS.forEach((m, i) => p.match[i] = m.a); p.badMatch = []; chk("p2match").done = true; }
      if (upTo > 3) { CLIENT_SLOTS.forEach(s => chk("p2c_" + s).done = true); p.cl.slot = 3; }
      if (upTo > 4) chk("p2ethics").done = true;
      if (upTo > 5) p.deal = p.deal || "truth";
      if (upTo > 6) chk("p2mixed").done = true;
      if (upTo > 8) { p.boss = p.boss || bossInit(2); p.boss.won = true; p.boss.result = null; }
    }
    const tDone = id => { const c = chk(id); if (c.done) return false; c.done = true; save(); render(); return true; };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => LABELS.length,
      index: () => !st.part ? 0 : st.part === 1 ? 1 + st.p1.s : 1 + P1_NAMES.length + st.p2.s,
      label: i => LABELS[i],
      go: i => {
        if (!st.name) st.name = "Test T.";
        st.proving = false; wire = { pick: null, iv: null, dv: null, order: null, v: -1 }; matchPick = null;
        if (i === 0) { st.part = 0; }
        else if (i <= P1_NAMES.length) { st.part = 1; fillP1(i - 1); st.p1.s = i - 1; }
        else { st.part = 2; fillP1(99); const s = i - 1 - P1_NAMES.length; fillP2(s); st.p2.s = s; }
        save(); render();
      },
      solve: () => {
        const click = sel => { const b = document.querySelector(sel); if (b) b.click(); };
        if (st.part === 2 && !part2Open()) return;
        const boss = st.part && P().s === BOSS_AT[st.part];
        if (boss) { const b = P().boss; if (b && !b.won) { b.won = true; b.result = null; save(); render(); } return; }
        if (st.part === 1) {
          const s = st.p1.s, p = st.p1;
          if (s === 0) click(".topic");
          else if (s === 1) tDone("p1q");
          else if (s === 2) { ["n0", "n1"].forEach(k => p.srcs[k] = "keep"); p.srcs.fan = "toss"; save(); render(); }
          else if (s === 3) { if (!p.hyp) { p.hyp = "more"; save(); render(); } else if (tDone("p1vars")) addNote("hyp"); }
          else if (s === 4) { p.draft.measure = p.draft.measure || "survey"; p.draft.sample = p.draft.sample || "random"; save(); render(); }
          else if (s === 5) { if (!p.ran) click("#runBtn"); }
          else if (s === 6) { if (!tDone("p1rev")) click("[data-fix]"); }
          else if (s === 7) tDone("p1sup");
          else if (s === 8) tDone("p1cause");
          else if (s === 9) click('[data-hl="honest"]');
          else if (s === 10) click("#postBtn");
        } else if (st.part === 2) {
          const s = st.p2.s, p = st.p2;
          if (s === 1) { fillP2(2); save(); render(); }
          else if (s === 2) { fillP2(3); save(); render(); }
          else if (s === 3) { const slot = CLIENT_SLOTS[p.cl.slot]; if (slot) { chk("p2c_" + slot).done = true; p.cl.slot++; save(); render(); } }
          else if (s === 4) tDone("p2ethics");
          else if (s === 5) click('[data-deal="truth"]');
          else if (s === 6) tDone("p2mixed");
        }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
