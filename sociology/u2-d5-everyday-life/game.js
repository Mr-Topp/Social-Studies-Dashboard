// =====================================================================
//  SEVEN BOSSES, ONE TUESDAY  (Sociology Unit 2 Day 5)
//  A day-planner game. Each part of Dani's day has a few time slots and more
//  demands than slots. Every demand comes from a social institution ("boss").
//  Whatever doesn't fit gets dropped, and that boss's hidden rule bites.
//  Meters carry through the whole day; the ending depends on what got dropped.
//  6 evidence checks are woven in (each unlocks the next part). Saves on this device.
//  Turn-in goes through shared/turnin.js (same payload shape as shared/unit-game.js).
//  Dani, Leo, Mom, Grandma, Ms. Ortiz, Rick, Fresh Fare and Cedar Valley Plant are made up.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u2-d5-everyday-life-v2";
  const ASSIGNMENT_ID = "soc-u2-d5-everyday-life";
  const TITLE = "Sociology · Unit 2 · Day 5 · What Shapes Your Everyday Life?";
  const STANDARD = "SS.9-12.Soc.5, SS.9-12.Soc.6, SS.9-12.Soc.7, SS.9-12.Soc.8";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;   // seconds the choices lock after a wrong answer

  // ---------- The seven bosses (social institutions) ----------
  const BOSS = {
    family:     { i: "🏠", n: "Family" },
    education:  { i: "🎓", n: "Education" },
    economy:    { i: "💼", n: "Economy" },
    health:     { i: "❤️", n: "Health care" },
    religion:   { i: "⛪", n: "Religion" },
    government: { i: "🏛️", n: "Government" },
    media:      { i: "📱", n: "Media" },
    you:        { i: "😴", n: "You" }
  };
  const BOSS_ORDER = ["family", "education", "economy", "health", "religion", "government", "media"];
  const METERS = [["school", "🎓", "School"], ["job", "💼", "Job"], ["family", "🏠", "Family"], ["health", "❤️", "Health"], ["energy", "⚡", "Energy"]];

  // ---------- Hidden rules (found when you hit them). Kept short: students skip long text. ----------
  const RULES = {
    F1: { b: "family", t: "Leo (8) can't be left alone." },
    E1: { b: "education", t: "Late work = half credit." },
    E2: { b: "education", t: "Quiz retakes: study hall only." },
    S1: { b: "education", t: "Phone out in class? Teacher keeps it till 3:10." },
    J1: { b: "economy", t: "Miss a shift = a write-up. Two = you're off." },
    J2: { b: "economy", t: "No kids in the back room." },
    H1: { b: "health", t: "Pharmacy closes at 6 PM." },
    G1: { b: "government", t: "Last Route 7 bus now leaves at 6:40 PM." },
    R1: { b: "religion", t: "Two no-shows = lose your pantry spot." },
    A1: { b: "government", t: "U.S. law (ACA): big employers must offer insurance at 30+ hours a week, or pay a fine." },
    M1: { b: "economy", t: "App posts shifts Tuesday night." }
  };

  // ---------- The five parts of the day ----------
  // card: b boss, who, t title, s slots, cash cost, give (fx when played),
  //       skip (text when dropped), dfx (fx when dropped), rule (found when dropped), prule (found when played),
  //       flag (set when played), dflag (set when dropped)
  const ROUNDS = [
    { clock: "4 demands. 3 slots.", id: "morning", name: "Morning", time: "6:30–8:00 AM", sky: "dawn", icon: "🌅", slots: 3, times: ["6:30", "7:00", "7:30"],
      setup: "Mom left for work at 5:30. Leo (8) is with you.",
      cards: [
        { id: "leoBus", b: "family", who: "Mom's text", t: "Walk Leo to bus", s: 1, give: { family: 1 },
          skip: "Missed bus. Mom left work, lost pay.", dfx: { family: -2 }, rule: "F1", dflag: "momLostPay" },
        { id: "chemHW", b: "education", who: "Ms. Ortiz · due 1st hour", t: "Finish chem worksheet", s: 2, give: { school: 2, energy: -1 },
          skip: "Turned in late.", dfx: { school: -2 }, rule: "E1" },
        { id: "breakfast", b: "family", who: "Mom's sticky note", t: "Eat breakfast", s: 1, give: { energy: 2 },
          skip: "Starving all through 1st hour.", dfx: { energy: -1, health: -1 } },
        { id: "feed", b: "media", who: "Your phone", t: "Scroll your feed", s: 1, give: {}, info: true, prule: "G1", flag: "knowsBus",
          skip: "Missed a news alert.", dfx: {} }
      ],
      idea: "<b>Social institution</b>: rules and roles that meet a need." },

    { clock: "3 demands. 2 slots.", id: "school", name: "School Day", time: "8:00 AM–3:10 PM", sky: "day", icon: "🏫", slots: 2, times: ["Lunch", "Study hall"],
      setup: "Two free moments today: lunch and study hall.",
      cards: [
        { id: "lunch", b: "economy", who: "Lunch line", t: "Buy lunch", s: 1, cash: 3, give: { energy: 2 },
          skip: "Running on empty by 5th hour.", dfx: { energy: -2 } },
        { id: "retake", b: "education", who: "Ms. Ortiz", t: "Retake chem quiz", s: 1, give: { school: 2, energy: -1 },
          skip: "Missed the only retake time.", dfx: { school: -1 }, rule: "E2" },
        { id: "callMom", b: "family", who: "Mom: “Call me at lunch”", t: "Call Mom back", s: 1, give: { family: 1 },
          skip: "Mom: “You didn't call back?”", dfx: { family: -1 } }
      ],
      idea: "<b>Values</b>: what matters. <b>Norms</b>: how to act. <b>Sanctions</b>: punishments." },

    { clock: "4 bosses. 3 hours.", id: "after", name: "After School", time: "3:10–6:00 PM", sky: "after", icon: "🛒", slots: 3, times: ["3:10", "4:00", "5:00"],
      setup: "Leo's bus comes at 3:30. Your shift starts at 4.",
      cards: [
        { id: "shift", b: "economy", who: "Rick · Fresh Fare", t: "Work shift 4–6", s: 2, give: { job: 2, energy: -2 },
          skip: "Rick: “No call, no show.”", dfx: { job: -3 }, rule: "J1" },
        { id: "leo", b: "family", who: "Mom", t: "Meet Leo's bus", s: 1, give: { family: 1 },
          skip: "Leo alone. Mom left work, lost pay.", dfx: { family: -2 }, rule: "F1", dflag: "momLostPay" },
        { id: "pharmacy", b: "health", who: "Pharmacy text", t: "Pick up Leo's inhaler", s: 1, cash: 10, give: { health: 2 }, flag: "inhaler",
          skip: "Inhaler almost empty.", dfx: {}, rule: "H1", dflag: "noInhaler" },
        { id: "tutor", b: "education", who: "Ms. Ortiz", t: "Chem tutoring", s: 1, give: { school: 2, energy: -1 },
          skip: "Still lost.", dfx: { school: -1 } }
      ],
      idea: "<b>Institutions connect</b>: work affects health care." },

    { clock: "Pantry, test, or paycheck?", id: "evening", name: "Evening", time: "6:00–9:00 PM", sky: "evening", icon: "🌆", slots: 3, times: ["6:00", "7:00", "8:00"],
      setup: "Mom's home at 6:30 with Leo. Three hours left.",
      cards: [
        { id: "pantry", b: "religion", who: "Grandma's church · 6–8", t: "Church food pantry", s: 2, give: { family: 1, energy: -1 },
          skip: "Grandma: “Families waited.”", dfx: { family: -1 }, rule: "R1" },
        { id: "study", b: "education", who: "Ms. Ortiz · test tomorrow", t: "Study for chem test", s: 2, give: { school: 3, energy: -1 },
          skip: "No studying. Test at 8 AM.", dfx: { school: -2 } },
        { id: "dinner", b: "family", who: "Leo: “I'm hungry”", t: "Make dinner with Leo", s: 1, give: { family: 1, energy: 1, health: 1 },
          skip: "Chips again.", dfx: { health: -1 } },
        { id: "close", b: "economy", who: "Rick · Fresh Fare · 6–9", t: "Extra closing shift", s: 3, give: { job: 3, energy: -3 },
          skip: "Rick: “k.”", dfx: {} }
      ],
      idea: "<b>Internalized</b> values feel like your own idea." },

    { clock: "3 demands. 2 slots.", id: "night", name: "Night", time: "9:00–11:00 PM", sky: "night", icon: "🌙", slots: 2, times: ["9:00", "10:00"],
      setup: "Two hours till bed. Chem test at 8 AM.",
      cards: [
        { id: "sleep", b: "you", who: "Your body", t: "Bed on time", s: 2, give: { energy: 3, health: 1 },
          skip: "Up past midnight.", dfx: { energy: -1 } },
        { id: "talk", b: "family", who: "Mom", t: "Talk with Mom", s: 1, give: { family: 2 },
          skip: "Mom: “Later, I guess.”", dfx: { family: -1 } },
        { id: "app", b: "economy", who: "Fresh Fare app", t: "Check work app", s: 1, give: { job: 1 }, prule: "M1",
          skip: "Surprise: 3 closing shifts!", dfx: { job: -2 }, rule: "M1" }
      ],
      idea: "" }
  ];

  // ---------- Text-message decisions (every choice costs something) ----------
  const DECISIONS = {
    phone: { r: 1, short: "Phone in 5th hour", when: "1:45 PM · Chem class", from: "Rick · Fresh Fare", boss: "economy",
      texts: ["Come in at 3:30 instead of 4?", "Answer now or I ask Kayla."],
      note: "Class rule: phones stay in pockets.",
      ask: "What does Dani do?",
      options: [
        { ic: "📱", label: "Answer under desk", fx: { job: 1, school: -1, family: -1 }, rule: "S1",
          res: "Ms. Ortiz takes your phone. That's a <b>formal sanction</b>: an official punishment." },
        { ic: "🔔", label: "Wait for the bell", fx: { job: -2 },
          res: "Rick gave Kayla the hours. “k.” That's an <b>informal sanction</b>." },
        { ic: "🚪", label: "Ask to step out", fx: { job: 1, school: -2 },
          res: "You followed the <b>norm</b>, but missed the test review." }
      ] },
    leoWork: { r: 2, short: "Leo at 4:00", when: "3:55 PM · Fresh Fare lot", from: "Leo, 8", boss: "family",
      texts: ["Can I come to your work? I'll be quiet!"],
      note: "Shift starts at 4. Mom works till 6.",
      ask: "Where does Leo go?",
      options: [
        { ic: "🛋️", label: "Break room", fx: { job: -2 }, rule: "J2",
          res: "Rick: “No kids in the back.” You get a warning." },
        { ic: "💵", label: "Pay neighbor $10", fx: {}, cash: 10,
          res: "Leo is safe. Your cash is gone." },
        { ic: "👵", label: "Call Grandma", fx: { family: -1 }, flag: "grandmaLeft",
          res: "Grandma leaves pantry setup. She's tired, and says so." }
      ] },
    nextWeek: { r: 4, short: "Next week's plan", when: "9:00 PM", from: "Mom", boss: "economy",
      texts: ["New machines. The plant cut my hours to 24.",
              "Under 30 hours = no insurance. I took a night job.",
              "Watch Leo nights?"],
      lostPay: "Today's lost pay hurt too.",
      rule: "A1",
      ask: "Who watches Leo?",
      options: [
        { ic: "📅", label: "Work weekends only", fx: { job: -3, family: 1 },
          res: "Rick: “Then fewer hours.” Less pay." },
        { ic: "👵", label: "Ask Grandma", fx: { family: -1, job: 1 },
          res: "Grandma says yes, but quits pantry nights." },
        { ic: "💻", label: "Online school at home", fx: { school: -2, family: 1 },
          res: "You watch Leo. No more Ms. Ortiz." }
      ] }
  };

  // ---------- Evidence checks (6) ----------
  // options[0] is right; the screen always shuffles them.
  const CHECKS = [
    { id: "c1", std: "Soc.6", short: "Tourist calls tip refusal rude = ethnocentrism", unlock: "Unlock: School Day",
      frame: "phone", ftitle: "📱 7:55 AM",
      ev: "<span class=\"notif\"><b>🎥 @tripwithtyler</b><span>Tokyo waiter chased me down to return my tip. RUDE. 😤</span></span><span class=\"notif\"><b>💬 Top comment</b><span>In Japan, tips aren't expected.</span></span>",
      cite: "Fact source: Japan National Tourism Organization",
      q: "The tourist calls the waiter rude. That's…",
      options: ["Ethnocentrism: judging Japan by U.S. rules", "Relativism: seeing Japan by its own rules", "A law that Japan's government wrote", "Following Japan's norms like a local"],
      hint: "Whose rules is the tourist using?",
      why: "Judging another culture by your own rules = ethnocentrism." },
    { id: "c2", std: "Soc.5", short: "Respect learning = value · phone basket = material culture", unlock: "Unlock: After School",
      frame: "wall", ftitle: "🧱 Ms. Ortiz's wall",
      terms: ["<b>Value:</b> what a group thinks matters.", "<b>Material culture:</b> things you can touch."],
      ev: "<span class=\"poster\">WE RESPECT LEARNING</span><span class=\"rulecard\">📵 Phones stay in pockets.</span><span class=\"basket\">🧺 Phone basket</span>",
      q: "Which match is right?",
      options: ["“Respect learning” = value. Basket = material.", "“Respect learning” = value. Basket = nonmaterial.", "“Respect learning” = norm. Basket = material.", "“Respect learning” = norm. Basket = nonmaterial."],
      hint: "Value = what matters. Material = you can touch it.",
      why: "The poster is a value (nonmaterial). The basket is material culture." },
    { id: "c3", std: "Soc.7", short: "Leo's insurance comes through Mom's job", unlock: "Unlock: Evening",
      frame: "receipt", ftitle: "🧾 Pharmacy receipt",
      ev: "<span class=\"rl\"><span>ITEM</span><span>Leo's inhaler</span></span><span class=\"rl\"><span>COPAY</span><span>$10.00</span></span><span class=\"rl\"><span>PLAN</span><span>Cedar Valley Plant employee plan (Mom)</span></span>",
      real: "Real: 54% of Americans get insurance through work.",
      cite: "U.S. Census Bureau, 2023",
      q: "Why could Mom's hour cut hit Leo's inhaler?",
      options: ["His insurance comes through Mom's job", "The pharmacy only serves plant families", "Mom's boss sets medicine prices", "Leo's school decides his medicine"],
      hint: "Read the PLAN line.",
      why: "Leo's insurance comes through Mom's job. Economy and health care are connected." },
    { id: "c4", std: "Soc.6", short: "Pantry feeling = internalized value", unlock: "Unlock: Night",
      frame: "thought", ftitle: "💭 Inside Dani's head",
      terms: ["<b>Internalize:</b> a taught value becomes part of you."],
      ev: "“Nobody makes me go. Skipping just feels wrong. Grandma says, ‘We show up.’”",
      q: "What does Dani's feeling show?",
      options: ["Dani internalized a family and church value", "Dani is obeying a city volunteer law", "Dani fears a punishment from the pastor", "Dani is breaking a norm at church"],
      hint: "Nobody forces Dani. Where's the feeling from?",
      why: "A value from family and church became Dani's own. That's internalizing." },
    { id: "c5", std: "Soc.8", short: "One change spreads to other institutions", unlock: "Unlock: The Ending",
      frame: "chain", ftitle: "🔗 Chain reaction",
      ev: "<span class=\"lnk\">🏭 New machines</span><span class=\"lnk\">⏬ Mom's hours cut</span><span class=\"lnk\">❤️ Insurance at risk</span><span class=\"lnk\">🌙 Mom's night job</span><span class=\"lnk\">🏠 Dani watches Leo</span>",
      real: "Real: U.S. women working or job-hunting.",
      cite: "U.S. Bureau of Labor Statistics",
      bars: true,
      q: "What do the chain and chart show?",
      options: ["One institution's change spreads to others", "Institutions stay the same no matter what", "Only the economy feels job changes", "Families change alone, without institutions"],
      hint: "Follow the arrows.",
      why: "One change spread into family, health care, school, and jobs." },
    { id: "c6", std: "Soc.7", short: "Ending = institutions' rules collided", unlock: "File Dani's day",
      frame: "file", ftitle: "", ev: "",
      q: "Why did Dani's day end this way?",
      options: ["Rules from several institutions crashed", "Dani just needed better time skills", "Random bad luck nobody could see", "Dani's personality, not the rules"],
      hint: "Whose rules wanted Dani's hours?",
      why: "Every boss met a need. Together they wanted more hours than a day has." }
  ];

  const ENDINGS = {
    er:     { i: "🌙", t: "The Long Night", text: "Leo's okay. Dani got home from urgent care at 2 AM." },
    empty:  { i: "🪫", t: "Running on Empty", text: "Dani crashed at midnight. Tomorrow starts tired." },
    job:    { i: "📵", t: "Off the Schedule", text: "Rick takes Dani off next week's schedule. Less money." },
    school: { i: "✉️", t: "The Letter Home", text: "Chem drops to an F. A letter goes home." },
    family: { i: "🪑", t: "The Empty Chair", text: "Mom and Leo eat without Dani again." },
    held:   { i: "🧩", t: "Held Together (For Now)", text: "Nothing broke today. But Dani is wiped out." }
  };

  const PROMPTS = [
    { id: "why", short: "Why Dani dropped something", min: 60, newWords: 5,
      label: "1. Explain one drop:",
      stem: "Dani dropped ___ because ___ crashed into ___.",
      mustAll: [["family", "mom", "leo", "grandma", "school", "education", "chem", "ortiz", "teacher", "job", "work", "economy", "store", "rick", "shift", "fresh fare", "plant", "health", "pharmacy", "inhaler", "insurance", "church", "religion", "pantry", "government", "bus", "law", "city", "media", "app", "phone", "news"],
                ["because", "so ", "since", "but", "when", "couldn", "could not", "same time", "both"]],
      mustMsg: "In answer 1, name what got dropped and the institutions whose rules crashed (use \"because\")." },
    { id: "norm", short: "Norm and value for the new student", min: 50, newWords: 3,
      label: "2. New kid shouts answers, phone out:",
      stem: "She breaks the norm of ___ from the value of ___.",
      mustAll: [["hand", "raise", "shout", "interrupt", "quiet", "turn", "wait", "listen", "talk", "phone", "pocket", "away", "call", "speak", "blurt"],
                ["respect", "learn", "order", "fair", "focus", "education", "attention", "polite", "manners", "kind", "others", "everyone", "turn", "school", "class", "safe", "equal"]],
      mustMsg: "In answer 2, name the norm (a rule for how to act) AND the value behind it (what matters, like respect)." }
  ];

  // ---------- Steps, in strict order ----------
  const has = (st, r, id) => !!(st.plans[r] && st.plans[r].includes(id));
  const STEPS = [
    { k: "plan", r: 0 }, { k: "result", r: 0 }, { k: "check", c: 0 },
    { k: "plan", r: 1 }, { k: "decide", d: "phone" }, { k: "result", r: 1 }, { k: "check", c: 1 },
    { k: "plan", r: 2 }, { k: "decide", d: "leoWork", when: st => has(st, 2, "shift") && has(st, 2, "leo") }, { k: "result", r: 2 }, { k: "check", c: 2 },
    { k: "plan", r: 3 }, { k: "result", r: 3 }, { k: "check", c: 3 },
    { k: "decide", d: "nextWeek" }, { k: "plan", r: 4 }, { k: "result", r: 4 }, { k: "check", c: 4 },
    { k: "ending" }, { k: "write" }
  ];
  const partOf = i => { const s = STEPS[i]; if (!s) return 5; if (s.r != null) return s.r + 1; if (s.d) return DECISIONS[s.d].r + 1; if (s.c != null) return Math.min(s.c, 4) + 1; return 5; };

  // ---------- State + rules of play (no page needed, so it can be tested) ----------
  const START = { school: 5, job: 5, family: 5, health: 5, energy: 6 };
  function fresh() {
    return { v: 2, name: "", step: -1, m: Object.assign({}, START), cash: 14, plans: {}, out: {}, dec: {}, rules: [], flags: {},
      penalty: 0, crashes: 0, wrong: {}, done: {}, trail: [], writing: {}, ending: "", turnedIn: false };
  }
  const clamp = v => Math.max(0, Math.min(10, v));
  function applyFx(st, fx) { Object.keys(fx || {}).forEach(k => { if (k in st.m) st.m[k] = clamp(st.m[k] + fx[k]); }); }
  function addRule(st, id) { if (id && !st.rules.includes(id)) { st.rules.push(id); return id; } return ""; }
  function slotsFor(st, r) { return Math.max(1, ROUNDS[r].slots - (st.planPenalty && st.planPenalty[r] || 0)); }
  function crashCheck(st, lines) {
    if (st.m.energy > 0) return;
    st.crashes++; st.m.energy = 2; st.penalty = 1;
    lines.push({ k: "crash", text: "Crashed! One less slot next.", fx: {} });
    st.trail.push({ k: "event", t: "Crashed: no energy", fx: { energy: -1 } });
  }
  // Lock in a round's plan: played cards give, dropped cards cost, hidden rules show up.
  function lockRound(st, r, picked) {
    const R = ROUNDS[r], lines = [];
    st.plans[r] = picked.slice();
    st.penalty = 0;
    R.cards.forEach(c => {
      if (picked.includes(c.id)) {
        applyFx(st, c.give); if (c.cash) st.cash -= c.cash;
        if (c.flag) st.flags[c.flag] = 1;
        lines.push({ k: "did", id: c.id, text: "", fx: Object.assign({}, c.give, c.cash ? { cash: -c.cash } : {}), rule: addRule(st, c.prule) });
      } else {
        applyFx(st, c.dfx);
        if (c.dflag) st.flags[c.dflag] = 1;
        lines.push({ k: "drop", id: c.id, text: c.skip, fx: Object.assign({}, c.dfx), rule: addRule(st, c.rule) });
        if (Object.keys(c.dfx || {}).length || c.rule || c.dflag) st.trail.push({ k: "drop", id: c.id, fx: Object.assign({}, c.dfx) });
      }
    });
    // Evening: the city bus (government) decides how Dani gets home from the pantry.
    if (R.id === "evening" && picked.includes("pantry")) {
      if (st.flags.knowsBus) lines.push({ k: "note", b: "government", text: "You knew about the 6:40 bus. Grandma drives you home. 🚗", fx: {} });
      else { const fx = { energy: -2 }; applyFx(st, fx); lines.push({ k: "note", b: "government", text: "Last bus left at 6:40. You walked home in the cold.", fx, rule: addRule(st, "G1") }); st.trail.push({ k: "event", t: "Missed last bus, walked home", fx }); }
    }
    // Night: Leo's inhaler.
    if (R.id === "night") {
      if (st.flags.noInhaler) {
        const fx = { health: -2, energy: -2, school: -1 }; applyFx(st, fx); st.flags.er = 1;
        lines.push({ k: "note", b: "health", text: "11:40 PM: Leo wheezing, inhaler empty. Urgent care.", fx });
        st.trail.push({ k: "event", t: "Inhaler ran out: urgent care", fx });
      } else {
        const fx = { health: 1 }; applyFx(st, fx);
        lines.push({ k: "note", b: "health", text: "11:40 PM: Leo coughs, uses his inhaler, sleeps.", fx });
      }
    }
    crashCheck(st, lines);
    if (st.penalty) { st.planPenalty = st.planPenalty || {}; st.planPenalty[r + 1] = 1; }
    st.out[r] = lines;
  }
  function decide(st, d, i) {
    const D = DECISIONS[d], o = D.options[i];
    st.dec[d] = i;
    applyFx(st, o.fx); if (o.cash) st.cash -= o.cash; if (o.flag) st.flags[o.flag] = 1;
    st.decRule = st.decRule || {};
    st.decRule[d] = addRule(st, o.rule) || "";
    if (D.rule) addRule(st, D.rule);
    st.trail.push({ k: "chose", d, i, fx: Object.assign({}, o.fx) });
  }
  function endingFor(st) {
    const low = [["job", st.m.job], ["school", st.m.school], ["family", st.m.family]].filter(x => x[1] <= 2).sort((a, b) => a[1] - b[1]);
    if (st.m.health <= 2 || st.crashes >= 2) return st.flags.er ? "er" : "empty";
    if (low.length) return low[0][0];
    return st.flags.er ? "er" : "held";
  }
  window.SevenBosses = { ROUNDS, DECISIONS, CHECKS, ENDINGS, RULES, STEPS, fresh, lockRound, decide, endingFor, slotsFor };
  if (typeof document === "undefined" || !document.getElementById("app")) return;

  // =====================================================================
  //  On the page
  // =====================================================================
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs && window.SiteLang.isEs());
  const tr = s => (window.SiteLang && window.SiteLang.t ? window.SiteLang.t(s) : s);
  const app = $("app");

  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 2 || !st.m) st = fresh();
  try {
    const who = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (who && st.name && who.toLowerCase() !== st.name.toLowerCase()) { st = fresh(); localStorage.setItem(KEY, JSON.stringify(st)); if (window.classFirstTry) window.classFirstTry.reset(); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const cardById = id => { for (const R of ROUNDS) for (const c of R.cards) if (c.id === id) return c; return null; };
  const stepOk = i => !STEPS[i] || !STEPS[i].when || STEPS[i].when(st);
  function nextStep() { st.step++; while (st.step < STEPS.length && !stepOk(st.step)) st.step++; save(); render(true); }

  // ---------- Small pieces ----------
  const bossTag = b => `<span class="btag b-${b}"><span aria-hidden="true">${BOSS[b].i}</span> <span>${esc(BOSS[b].n)}</span></span>`;
  function fxTags(fx) {
    const order = ["school", "job", "family", "health", "energy", "cash"];
    const icon = { school: "🎓", job: "💼", family: "🏠", health: "❤️", energy: "⚡", cash: "💵" };
    return order.filter(k => fx && fx[k]).map(k => {
      const v = fx[k], up = v > 0;
      const txt = k === "cash" ? (up ? "+$" + v : "−$" + Math.abs(v)) : (up ? "+" + v : "−" + Math.abs(v));
      return `<span class="fx ${up ? "up" : "down"}">${icon[k]} ${txt}</span>`;
    }).join("");
  }
  function ruleBox(id) {
    if (!id) return "";
    const R = RULES[id];
    return `<div class="rule"><p class="rk">🔓 <span class="stamp rnew">NEW RULE</span> ${bossTag(R.b)}</p><p class="rt">${esc(R.t)}</p></div>`;
  }
  let prevM = null;
  function dropCount() { return st.trail.filter(x => x.k === "drop").length; }
  function clockLine() {
    if (st.step < 0) return "";
    const s = STEPS[Math.min(st.step, STEPS.length - 1)];
    if (s.k === "plan") return ROUNDS[s.r].clock;
    if (s.k === "result") return (st.out[s.r] || []).filter(l => l.k === "drop").length + " dropped. Mine now.";
    if (s.k === "check") return "Pick the key.";
    if (s.k === "decide") return "Every choice costs.";
    if (s.k === "ending") return "Same time tomorrow.";
    return "Still ticking.";
  }
  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    if (!show) { prevM = null; return; }
    $("meters").innerHTML = METERS.map(([k, icon, label]) => {
      const v = st.m[k], low = v <= 2;
      const bump = prevM && prevM[k] !== v ? (v > prevM[k] ? " bump-up" : " bump-down") : "";
      return `<div class="meter${low ? " low" : ""}${bump}"><span class="ml"><span aria-hidden="true">${icon}</span> <span>${esc(label)}</span></span><span class="mt" aria-hidden="true"><span style="width:${v * 10}%"></span></span><span class="mv">${v}</span></div>`;
    }).join("") + `<div class="meter cash${prevM && prevM.cash !== st.cash ? " bump-down" : ""}"><span class="ml"><span aria-hidden="true">💵</span> <span>Cash</span></span><span class="mv">$${st.cash}</span></div>`;
    prevM = Object.assign({ cash: st.cash }, st.m);
    const met = bossesMet();
    $("bosses").innerHTML = BOSS_ORDER.map(b => `<span class="chip${met.has(b) ? " on" : ""}" title="${esc(BOSS[b].n)}"><span aria-hidden="true">${BOSS[b].i}</span><span class="cn">${esc(BOSS[b].n)}</span></span>`).join("");
    $("bossCount").textContent = met.size;
    $("ruleCount").textContent = st.rules.length;
    const p = st.step >= STEPS.length ? 5 : partOf(st.step);
    $("partTag").textContent = st.step >= 18 ? "Day report" : "Part " + p + " of 5";
    const d = dropCount();
    $("rivalMood").textContent = d >= 8 ? "😈" : d >= 4 ? "😏" : "🙂";
    $("rivalSay").textContent = clockLine();
    $("rival").classList.remove("talk"); void $("rival").offsetWidth; $("rival").classList.add("talk");
  }
  function bossesMet() {
    const met = new Set();
    const lastRound = st.step < 0 ? -1 : Math.max(...STEPS.slice(0, Math.min(st.step, STEPS.length - 1) + 1).map(s => s.r != null ? s.r : (s.d ? DECISIONS[s.d].r : -1)));
    for (let r = 0; r <= lastRound && r < ROUNDS.length; r++) ROUNDS[r].cards.forEach(c => { if (BOSS_ORDER.includes(c.b)) met.add(c.b); });
    st.rules.forEach(id => met.add(RULES[id].b));
    Object.keys(st.dec).forEach(d => met.add(DECISIONS[d].boss));
    return met;
  }
  function openRulebook() {
    const list = st.rules.length ? st.rules.map(id => `<li>${bossTag(RULES[id].b)}<span class="rbt">${esc(RULES[id].t)}</span></li>`).join("") : `<li class="empty">No hidden rules found yet. You find them by hitting them.</li>`;
    $("rulebookList").innerHTML = list;
    const d = $("rulebook");
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
  }

  function skyHead(R, p) {
    return `<div class="sky sky-${R.sky}"><span class="sun" aria-hidden="true">${R.icon}</span><div><p class="when">${esc(R.time)}</p><h2>${esc(R.name)}</h2></div></div>`;
  }

  // ---------- Intro ----------
  function intro() {
    app.innerHTML = `<section class="intro card">
      <div class="cover" aria-hidden="true"><span class="clock">⏰</span><span class="orb o1">🏠</span><span class="orb o2">🎓</span><span class="orb o3">💼</span><span class="orb o4">❤️</span><span class="orb o5">⛪</span><span class="orb o6">🏛️</span><span class="orb o7">📱</span></div>
      <h1>Seven Bosses, One Tuesday</h1>
      <p class="hook">Dani is 16. Seven bosses want Dani's hours.</p>
      <ul class="plan-list"><li><b>🗓️ Plan</b> <span>Dani's day</span></li><li><b>🔓 Find</b> <span>hidden rules</span></li><li><b>⏱️ About</b> <span>25 minutes</span></li></ul>
      <p class="goal"><b>Goal:</b> <span>Explain how institutions meet needs, shape us, and change.</span></p>
      <div class="namebox"><label for="nameBox" class="sr">Your name: first name + last initial</label>
      <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}"></div>
      <p id="introMsg" class="msg" role="status"></p>
      <button type="button" class="go big" id="startBtn">Start Dani's Tuesday →</button>
      <p class="fine">Made-up people. Real facts.</p></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 0; save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------- Plan a part of the day ----------
  let picks = [];
  function plan(r) {
    const R = ROUNDS[r], n = slotsFor(st, r);
    picks = picks.filter(id => R.cards.some(c => c.id === id));
    const used = () => picks.reduce((a, id) => a + R.cards.find(c => c.id === id).s, 0);
    const cashLeft = () => st.cash - picks.reduce((a, id) => a + (R.cards.find(c => c.id === id).cash || 0), 0);
    const p = r + 1;
    app.innerHTML = `<section class="card round">${skyHead(R, p)}
      <p class="setup">${esc(R.setup)}</p>
      ${n < R.slots ? `<p class="warn">😴 <span>Dani crashed: one less slot.</span></p>` : ""}
      <div class="board">
        <div class="planner"><p class="ph">🗓️ <span>Dani's planner</span></p><ol class="slots" id="slots"></ol><p class="filled" id="filled"></p></div>
        <div class="handwrap"><p class="ph">📥 <span>Demands</span>${r === 0 ? ` <span class="sub">Tap to add</span>` : ""}</p><div class="hand" id="hand"></div></div>
      </div>
      <button type="button" class="go" id="lockBtn">Lock in my plan →</button>
      <p class="msg" id="planMsg" role="status" aria-live="polite"></p></section>`;
    function draw() {
      const u = used();
      const times = R.times.slice(0, n);
      let html = "", i = 0;
      picks.forEach(id => {
        const c = R.cards.find(x => x.id === id);
        for (let k = 0; k < c.s && i < n; k++, i++) html += `<li class="slot full b-${c.b}${k ? " cont" : ""}"><span class="tm">${esc(times[i])}</span>${k ? `<span class="cn2">⋮</span>` : `<button type="button" class="slotbtn" data-id="${c.id}"><span aria-hidden="true">${BOSS[c.b].i}</span> <span>${esc(c.t)}</span> <span class="x" aria-label="Remove">✕</span></button>`}</li>`;
      });
      for (; i < n; i++) html += `<li class="slot open"><span class="tm">${esc(times[i])}</span><span class="emp">Empty</span></li>`;
      $("slots").innerHTML = html;
      $("filled").textContent = "Slots filled: " + u + " of " + n;
      $("hand").innerHTML = R.cards.map(c => {
        const inP = picks.includes(c.id);
        const fits = inP || (u + c.s <= n);
        const cash = inP || !c.cash || cashLeft() >= c.cash;
        const lockTxt = c.rule && !st.rules.includes(c.rule) ? `<span class="pc-lock">🔒 <span>Hidden rule</span></span>` : (c.rule ? `<span class="pc-lock known">📕 <span>Rule known</span></span>` : "");
        const give = c.info ? `<span class="fx info">🔍 <span>Info</span></span>` : fxTags(Object.assign({}, c.give, c.cash ? { cash: -c.cash } : {}));
        const why = !cash ? `<span class="pc-no">Need $${c.cash}</span>` : (!fits ? `<span class="pc-no">Doesn't fit</span>` : "");
        return `<button type="button" class="pcard b-${c.b}${inP ? " in" : ""}${(!fits || !cash) ? " nofit" : ""}" data-id="${c.id}" aria-pressed="${inP}" ${(!fits || !cash) ? 'aria-disabled="true"' : ""}>
          <span class="pc-top">${bossTag(c.b)}<span class="pc-cost" aria-label="Time slots">${"⏱".repeat(c.s)}</span></span>
          <span class="pc-who">${esc(c.who)}</span><span class="pc-t">${esc(c.t)}</span>
          <span class="pc-give">${give}</span>${lockTxt}${why}${inP ? `<span class="pc-in">✓ <span>Planned</span></span>` : ""}</button>`;
      }).join("");
      $("lockBtn").disabled = u < n;
      $("lockBtn").classList.toggle("ready", u >= n);
      document.querySelectorAll("#hand .pcard, #slots .slotbtn").forEach(b => b.onclick = () => toggle(b.dataset.id));
    }
    function toggle(id) {
      const c = R.cards.find(x => x.id === id);
      const msg = $("planMsg");
      if (picks.includes(id)) { picks = picks.filter(x => x !== id); msg.textContent = ""; }
      else if (c.cash && cashLeft() < c.cash) { msg.textContent = "Not enough cash for that one."; msg.className = "msg bad"; return; }
      else if (used() + c.s > n) { msg.textContent = "No room. Take something out of the planner first."; msg.className = "msg bad"; return; }
      else { picks.push(id); msg.textContent = ""; }
      msg.className = "msg"; draw();
    }
    $("lockBtn").onclick = () => {
      if (used() < n) { $("planMsg").textContent = "Fill every slot in Dani's planner first."; $("planMsg").className = "msg bad"; return; }
      lockRound(st, r, picks); picks = []; nextStep();
    };
    draw();
  }

  // ---------- A text-message decision ----------
  function decideView(d) {
    const D = DECISIONS[d], p = D.r + 1;
    const chosen = st.dec[d];
    const texts = D.texts.concat(d === "nextWeek" && st.flags.momLostPay ? [D.lostPay] : []);
    let html = `<section class="card decide">
      <div class="phone"><p class="ph-top"><span class="ph-when">${esc(D.when)}</span></p>
        <p class="ph-from">${bossTag(D.boss)} <span>${esc(D.from)}</span></p>
        ${chosen == null ? texts.map(t => `<p class="bubble">${esc(t)}</p>`).join("") + (D.note ? `<p class="ph-note">${esc(D.note)}</p>` : "") : ""}</div>`;
    if (chosen == null) {
      html += `<h3 class="ask">${esc(D.ask)}</h3><div class="opts" id="opts"></div>`;
    } else {
      const o = D.options[chosen];
      html += `<p class="picked"><span class="oic" aria-hidden="true">${o.ic}</span> <span>You chose:</span> <b>${esc(o.label)}</b></p><div class="result reply"><p>${o.res}</p><p class="fxrow">${fxTags(Object.assign({}, o.fx, o.cash ? { cash: -o.cash } : {}))}</p></div>${D.rule ? ruleBox(D.rule) : ""}
        <button type="button" class="go" id="nextBtn">Next →</button>`;
    }
    html += `</section>`;
    app.innerHTML = html;
    if (chosen == null) {
      const box = $("opts");
      shuffle(D.options.map((o, i) => i)).forEach(i => {
        const o = D.options[i];
        const b = document.createElement("button"); b.type = "button"; b.className = "opt";
        const broke = o.cash && st.cash < o.cash;
        b.innerHTML = `<span class="oic" aria-hidden="true">${o.ic}</span><span class="olb">${esc(o.label)}</span>${broke ? `<span class="pc-no">Need $${o.cash}</span>` : ""}`;
        if (broke) { b.disabled = true; }
        b.onclick = () => { decide(st, d, i); save(); render(true); };
        box.appendChild(b);
      });
    } else $("nextBtn").onclick = () => nextStep();
  }

  // ---------- What happened ----------
  function result(r) {
    const R = ROUNDS[r], lines = st.out[r] || [];
    const did = lines.filter(l => l.k === "did"), drop = lines.filter(l => l.k === "drop"), other = lines.filter(l => l.k === "note" || l.k === "crash");
    let n = 0;
    const tile = l => {
      const c = l.id ? cardById(l.id) : null, delay = `style="animation-delay:${(n++) * 0.18}s"`;
      const stamp = l.k === "did" ? `<span class="stamp ok">DONE</span>` : l.k === "drop" ? `<span class="stamp no">DROPPED</span>` : "";
      return `<li class="tile ${l.k}${c ? " b-" + c.b : ""}" ${delay}>${stamp}${c ? `<p class="tt">${bossTag(c.b)}</p><p class="tn">${esc(c.t)}</p>` : (l.b ? `<p class="tt">${bossTag(l.b)}</p>` : `<p class="tt">⚠️</p>`)}${l.text ? `<p class="bub">${esc(l.text)}</p>` : ""}<p class="fxrow">${fxTags(l.fx)}</p>${ruleBox(l.rule)}</li>`;
    };
    const chip = l => { const c = cardById(l.id); return `<li class="dchip b-${c.b}" title="${esc(c.t)}"><span class="stamp ok">DONE</span> <span aria-hidden="true">${BOSS[c.b].i}</span> ${fxTags(l.fx)}${ruleBox(l.rule)}</li>`; };
    app.innerHTML = `<section class="card resultc">${skyHead(R, r + 1)}
      <ul class="dchips">${did.map(chip).join("")}</ul>
      <ul class="tiles">${drop.map(tile).join("")}${other.map(tile).join("")}</ul>
      ${R.idea ? `<div class="idea"><span class="bulb" aria-hidden="true">💡</span><div><p>${R.idea}</p></div></div>` : ""}
      <button type="button" class="go wait" id="nextBtn" disabled><span class="wbar" aria-hidden="true"></span><span class="wtxt">Read the cards… 3</span></button></section>`;
    $("nextBtn").onclick = () => nextStep();
    // A short read-first pause. The button counts down and fills up, so it never looks broken.
    let left = 3;
    const tickNext = () => {
      const b = $("nextBtn"); if (!b || !b.classList.contains("wait")) return;
      left--;
      if (left > 0) { b.querySelector(".wtxt").textContent = "Read the cards… " + left; setTimeout(tickNext, 1000); return; }
      b.disabled = false; b.classList.remove("wait"); b.classList.add("ready"); b.textContent = tr("Next →");
    };
    if (window.classIsTestT && window.classIsTestT()) { left = 1; tickNext(); }   // Test T.: no read-first pause
    else setTimeout(tickNext, 1000);
  }

  // ---------- Evidence check (must be right to move on) ----------
  let locked = false;
  function frameHtml(C) {
    if (!C.ev && !C.terms) return "";
    const bars = C.bars ? `<span class="mini"><span class="mb" style="--w:34%"><i>1950</i><b>34%</b></span><span class="mb" style="--w:60%"><i>1999</i><b>60%</b></span></span>` : "";
    const ev = C.ev ? `<div class="frame f-${C.frame}"><p class="ft">${esc(C.ftitle)}</p><div class="evbody">${C.ev}</div>${bars}${C.real ? `<p class="real">${esc(C.real)}</p>` : ""}${C.cite ? `<p class="cite">${esc(C.cite)}</p>` : ""}</div>` : "";
    const terms = C.terms ? `<div class="terms"><p class="tk" aria-label="Key words">📘</p>${C.terms.map(t => `<p>${t}</p>`).join("")}</div>` : "";
    return `<div class="evrow">${ev}${terms}</div>`;
  }
  function checkBlock(C, host, onRight) {
    const done = st.done[C.id];
    host.innerHTML = `<div class="check"><div class="lockhead"><span class="padlock${done ? " open" : ""}" id="pad_${C.id}" aria-hidden="true">${done ? "🔓" : "🔒"}</span><p class="ck">${esc(C.unlock)}</p>${done ? `<span class="stamp ok big">UNLOCKED</span>` : ""}</div>${frameHtml(C)}<p class="q"><span class="qb">${esc(C.q)}</span></p><div class="choices keys" id="ch_${C.id}"></div><p class="msg" id="fb_${C.id}" aria-live="polite"></p></div>`;
    const area = $("ch_" + C.id), fb = $("fb_" + C.id), pad = $("pad_" + C.id);
    if (done) {
      area.outerHTML = `<p class="answered">✓ ${esc(C.options[0])}</p><p class="why">${esc(C.why)}</p>`;
      return;
    }
    let lastOrder = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(C.options.map((t, n) => ({ t, n })));
      for (let k = 0; k < 12 && order.map(o => o.n).join() === lastOrder; k++) order = shuffle(order);   // a reshuffle always looks different
      lastOrder = order.map(o => o.n).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            st.done[C.id] = true; if (window.classFirstTry) window.classFirstTry.right(C.id); save(); onRight();
          } else {
            st.wrong[C.id] = (st.wrong[C.id] || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
            pad.classList.remove("shake"); void pad.offsetWidth; pad.classList.add("shake");
            locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
            let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;   // Test T.: no wait
            const tick = () => {
              if (!fb.isConnected) { locked = false; return; }
              fb.textContent = "Not quite. " + C.hint + " The choices will mix up. Try again in " + left + "…"; fb.className = "msg bad";
              if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + C.hint + " Try again."; fb.className = "msg"; draw(); return; }
              setTimeout(tick, 1000);
            };
            tick();
          }
        };
        area.appendChild(b);
      });
    }
    draw();
  }
  function checkView(c) {
    const C = CHECKS[c];
    app.innerHTML = `<section class="card checkc"><div id="ckhost"></div><div id="ckend"></div></section>`;
    const after = () => { checkBlock(C, $("ckhost"), after); $("ckend").innerHTML = `<button type="button" class="go" id="nextBtn">Next →</button>`; $("nextBtn").onclick = () => nextStep(); };
    if (st.done[C.id]) after(); else checkBlock(C, $("ckhost"), after);
  }

  // ---------- Ending ----------
  // Which trail entries pushed Dani toward this ending (they go first, starred).
  function isKey(x) {
    const e = st.ending, fx = x.fx || {};
    if (e === "er") return x.id === "pharmacy" || /inhaler/.test(x.t || "");
    if (e === "empty") return (fx.health < 0) || (fx.energy < 0);
    if (e === "job" || e === "school" || e === "family") return fx[e] < 0;
    return false;
  }
  function trailHtml() {
    const sorted = st.trail.filter(isKey).concat(st.trail.filter(x => !isKey(x)));
    const items = sorted.map(x => {
      const star = isKey(x) ? " key" : "";
      return trailItem(x).replace("<li>", `<li class="${star.trim()}">${star ? `<span class="star">⭐ <span>Big cause</span></span> ` : ""}`);
    });
    const more = items.length - 6;
    return `<ul class="trail">${items.slice(0, 6).join("")}</ul>${more > 0 ? `<p class="fine">+ ${more} more</p>` : ""}`;
  }
  function trailItem(x) {
    return [x].map(x => {
      if (x.k === "drop") { const c = cardById(x.id); return `<li><span class="lk" title="Dropped">❌</span> ${bossTag(c.b)} <span>${esc(c.t)}</span></li>`; }
      if (x.k === "chose") { const D = DECISIONS[x.d]; return `<li><span class="lk" title="Chose">💬</span> ${bossTag(D.boss)} <span>${esc(D.options[x.i].label)}</span></li>`; }
      return `<li><span class="lk" title="Event">⚠️</span> <span>${esc(x.t)}</span></li>`;
    })[0];
  }
  function endingView() {
    if (!st.ending) { st.ending = endingFor(st); save(); }
    const E = ENDINGS[st.ending];
    app.innerHTML = `<section class="card endc">
      <div class="endhead e-${st.ending}"><span class="ei" aria-hidden="true">${E.i}</span><div><p class="when">Dani's Tuesday is over</p><h2>${esc(E.t)}</h2></div></div>
      <p class="etext">${esc(E.text)}</p>
      <p class="every">Every boss met a need. Together, they wanted too many hours.</p>
      <h3 class="rh">Caused by:</h3>${trailHtml()}
      <p class="fine">1 of 6 endings.</p>
      <div id="ckhost"></div><div id="ckend"></div></section>`;
    const after = () => { checkBlock(CHECKS[5], $("ckhost"), after); $("ckend").innerHTML = `<button type="button" class="go" id="nextBtn">Last step: 2 short answers →</button>`; $("nextBtn").onclick = () => nextStep(); };
    if (st.done.c6) after(); else checkBlock(CHECKS[5], $("ckhost"), after);
  }

  // ---------- Write + turn in ----------
  function writeView() {
    const E = ENDINGS[st.ending || endingFor(st)];
    app.innerHTML = `<section class="card writec journal"><h2>📓 Journal <span class="e-mini" title="${esc(E.t)}">${E.i}</span></h2>
      ${PROMPTS.map(p => `<label for="w_${p.id}">${esc(p.label)}</label><p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in" : ""}</p></section>`;
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = send;
  }
  async function send() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const testT = window.classIsTestT && window.classIsTestT();   // Test T. (teacher) skips the writing rules
    for (const p of (testT ? [] : PROMPTS)) {
      const box = $("w_" + p.id), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: isEs() ? tr(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (isEs() ? "En " + tr(p.short) : "For " + p.short) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemWords = new Set(plain(p.stem + " " + tr(p.stem)).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < p.newWords) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "msg bad"; box.focus(); return; }
      let groups = p.mustAll;
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      const txt = plain(v);
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(txt)))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    const answers = { "Standard": STANDARD };
    const right = CHECKS.filter(c => !st.wrong[c.id]).length;
    answers["First-try correct"] = right + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECKS.forEach(c => { answers[c.short] = c.options[0] + (st.wrong[c.id] ? " (after " + st.wrong[c.id] + " wrong " + (st.wrong[c.id] === 1 ? "try" : "tries") + ")" : " (first try)"); });
    ROUNDS.forEach((R, r) => {
      if (!st.plans[r]) return;
      const kept = R.cards.filter(c => st.plans[r].includes(c.id)).map(c => c.t).join(", ");
      const dropped = R.cards.filter(c => !st.plans[r].includes(c.id)).map(c => c.t).join(", ");
      answers["Choice · " + R.name + " plan"] = "Did: " + kept + " | Dropped: " + dropped;
    });
    Object.keys(DECISIONS).forEach(d => { if (st.dec[d] != null) answers["Choice · " + DECISIONS[d].short] = DECISIONS[d].options[st.dec[d]].label; });
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    const E = ENDINGS[st.ending || endingFor(st)];
    answers["Ending"] = E.t;
    answers["Caused by"] = st.trail.map(x => x.k === "drop" ? "Dropped " + cardById(x.id).t : x.k === "chose" ? "Chose " + DECISIONS[x.d].options[x.i].label : x.t).join("; ");
    answers["Meters at end"] = "School " + st.m.school + " · Job " + st.m.job + " · Family " + st.m.family + " · Health " + st.m.health + " · Energy " + st.m.energy + " · Cash $" + st.cash;
    answers["Hidden rules found"] = st.rules.length + " of " + Object.keys(RULES).length;
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. You're done!"; msg.className = "msg good";
      $("sendBtn").textContent = "Turned in ✓"; $("sendBtn").disabled = false;
      $("sendBtn").onclick = send;

    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------- Router ----------
  let first = true;
  function render(scroll) {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    locked = false;
    hud();
    if (st.step < 0) return intro();
    const s = STEPS[Math.min(st.step, STEPS.length - 1)];
    if (s.k === "plan") plan(s.r);
    else if (s.k === "decide") decideView(s.d);
    else if (s.k === "result") result(s.r);
    else if (s.k === "check") checkView(s.c);
    else if (s.k === "ending") endingView();
    else writeView();
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $("restartBtn").onclick = () => {
    if (!confirm(tr("Start over? This clears your work on this device."))) return;
    const name = st.name; st = fresh(); st.name = name; picks = [];
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  $("rulebookBtn").onclick = openRulebook;
  $("rulebookClose").onclick = () => { const d = $("rulebook"); if (d.close) d.close(); else d.removeAttribute("open"); };
  if (st.step >= 0 && $("welcome")) {
    const shown = STEPS.map((s, i) => i).filter(stepOk);
    const at = Math.max(1, shown.indexOf(Math.min(st.step, STEPS.length - 1)) + 1);
    // Shared Chromebooks: a different student can wipe the last kid's game and writing in one tap.
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " — you're on step " + at + " of " + shown.length + ".")}</span> <button type="button" class="notme" id="notMeBtn">${esc("Not " + st.name + "? Start fresh")}</button>`;
    $("welcome").hidden = false;
    $("notMeBtn").onclick = () => {
      st = fresh(); picks = [];
      if (window.classFirstTry) window.classFirstTry.reset();
      save(); $("welcome").hidden = true; render(); window.scrollTo(0, 0);
    };
  }
  render();

  // ---------- Test T. skip bar (shared/turnin.js) ----------
  // The teacher signed in as Test T. can jump to any screen or answer the current check.
  try {
    // Fill a round's planner in card order (whatever fits), for Test T. only.
    const tPlan = r => {
      const R = ROUNDS[r], n = slotsFor(st, r); let used = 0, cash = st.cash; const out = [];
      R.cards.forEach(c => { if (used + c.s <= n && (!c.cash || cash >= c.cash)) { out.push(c.id); used += c.s; cash -= c.cash || 0; } });
      return out;
    };
    const tFirstOk = d => { const D = DECISIONS[d]; const i = D.options.findIndex(o => !o.cash || st.cash >= o.cash); return i < 0 ? 0 : i; };
    const TK = { plan: "plan", result: "what happened", decide: "text", check: "check" };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => STEPS.length + 1,
      index: () => st.step < 0 ? 0 : Math.min(st.step, STEPS.length - 1) + 1,
      label: i => {
        if (i === 0) return "Title";
        const s = STEPS[i - 1];
        if (s.k === "ending") return "Ending + last check";
        if (s.k === "write") return "Journal + turn in";
        const part = "Part " + partOf(i - 1);
        if (s.k === "decide") return part + " text: " + DECISIONS[s.d].short;
        if (s.k === "check") return part + " check";
        return part + " " + TK[s.k] + " (" + ROUNDS[s.r].name + ")";
      },
      go: i => {
        if (!st.name) st.name = "Test T.";
        const t = i - 1;
        // safe defaults (first choice that fits) for plans and texts the jump skips past
        for (let j = 0; j < t && j < STEPS.length; j++) {
          const s = STEPS[j];
          if (s.k === "plan" && !st.plans[s.r]) lockRound(st, s.r, tPlan(s.r));
          else if (s.k === "decide" && st.dec[s.d] == null && stepOk(j)) decide(st, s.d, tFirstOk(s.d));
        }
        if (t < STEPS.findIndex(s => s.k === "ending")) st.ending = "";
        picks = []; locked = false;
        st.step = t; save(); render(true);
      },
      solve: () => {
        if (st.step < 0) return;
        const s = STEPS[Math.min(st.step, STEPS.length - 1)];
        if (s.k === "plan") { picks = tPlan(s.r); render(); }
        else if (s.k === "decide") { if (st.dec[s.d] == null) { const b = document.querySelector("#opts .opt:not([disabled])"); if (b) b.click(); } }
        else if (s.k === "check") { const C = CHECKS[s.c]; if (!st.done[C.id]) { st.done[C.id] = true; save(); render(); } }
        else if (s.k === "ending") { if (!st.done.c6) { st.done.c6 = true; save(); render(); } }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
