// =====================================================================
//  FIVE BOSSES, ONE TUESDAY  (Sociology Unit 2 Day 5, review day)
//  Dani's Tuesday in 4 parts. Each part: fill the planner (more demands than slots),
//  see what got dropped and which rule bit, then answer ONE review check that matches
//  that day's review slide (Soc.5 football, Soc.6 tipping, Soc.7 institutions/needs,
//  Soc.8 Rosie). Ending = the boss Dani dropped most. Then 2 short answers + turn in.
//  The 5 bosses match the 5 institutions taught in the Unit 2 slides.
//  Dani, Leo, Mom, Grandma, Ms. Ortiz, Rick, Fresh Fare and Riverside High are made up.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u2-d5-everyday-life-v3";
  const ASSIGNMENT_ID = "soc-u2-d5-everyday-life";
  const TITLE = "Sociology · Unit 2 · Day 5 · Five Bosses, One Tuesday";
  const STANDARD = "SS.9-12.Soc.5, SS.9-12.Soc.6, SS.9-12.Soc.7, SS.9-12.Soc.8";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;   // seconds the choices lock after a wrong answer

  // ---------- The five bosses = the five institutions from the slides ----------
  const BOSS = {
    family:     { i: "🏠", n: "Family",     need: "Who cares for us?" },
    education:  { i: "🎓", n: "Education",  need: "How do we learn skills?" },
    religion:   { i: "⛪", n: "Religion",   need: "What gives life meaning?" },
    economy:    { i: "💼", n: "Economy",    need: "How do we get what we need?" },
    government: { i: "🏛️", n: "Government", need: "Who makes the rules?" }
  };
  const BOSS_ORDER = ["family", "education", "religion", "economy", "government"];

  // ---------- Rules Dani runs into (formal norms with sanctions) ----------
  const RULES = {
    F1: { b: "family",     t: "Leo (8) can't be left alone." },
    E1: { b: "education",  t: "Late work = half credit." },
    E2: { b: "education",  t: "Quiz retakes: study hall only." },
    S1: { b: "education",  t: "Phone out in class? The teacher keeps it till 3:10." },
    J1: { b: "economy",    t: "Miss a shift = a write-up. Two = you're off the schedule." },
    R1: { b: "religion",   t: "Two no-shows = you lose your pantry spot." },
    G1: { b: "government", t: "City notice: the last Route 7 bus now leaves at 6:40 PM." }
  };

  // ---------- The four parts of the day ----------
  const ROUNDS = [
    { id: "morning", name: "Morning", time: "6:30–8:00 AM", sky: "dawn", icon: "🌅", slots: 3, times: ["6:30", "7:00", "7:30"],
      setup: "Mom left for work at 5:30. Leo (8) is with you.",
      cards: [
        { id: "leoBus", b: "family", who: "Mom's text", t: "Walk Leo to the bus", s: 1,
          skip: "Leo missed the bus. Mom left work and lost pay.", rule: "F1" },
        { id: "chemHW", b: "education", who: "Ms. Ortiz · due 1st hour", t: "Finish chem worksheet", s: 2,
          skip: "Turned in late.", rule: "E1" },
        { id: "breakfast", b: "family", who: "Mom's sticky note", t: "Eat breakfast", s: 1,
          skip: "Starving all through 1st hour." },
        { id: "busNote", b: "government", who: "City Transit app", t: "Read the bus change notice", s: 1, prule: "G1", flag: "knowsBus",
          skip: "Swiped the city's bus alert away without reading it." }
      ],
      idea: "<b>Social institution</b>: an organized system that meets a need. Two of them wanted the same 30 minutes." },

    { id: "school", name: "School Day", time: "8:00 AM–3:10 PM", sky: "day", icon: "🏫", slots: 2, times: ["Lunch", "Study hall"],
      setup: "Two free moments today: lunch and study hall.",
      cards: [
        { id: "lunch", b: "economy", who: "Lunch line · $3", t: "Buy lunch", s: 1,
          skip: "Running on empty by 5th hour." },
        { id: "retake", b: "education", who: "Ms. Ortiz", t: "Retake chem quiz", s: 1,
          skip: "Missed the only retake time.", rule: "E2" },
        { id: "callMom", b: "family", who: "Mom: “Call me at lunch”", t: "Call Mom back", s: 1,
          skip: "Mom: “You didn't call back?”" }
      ],
      idea: "<b>Norm</b>: a rule for how to act. <b>Sanction</b>: the response when you follow it or break it." },

    { id: "after", name: "After School", time: "3:10–6:00 PM", sky: "after", icon: "🛒", slots: 3, times: ["3:10", "4:00", "5:00"],
      setup: "Leo's bus comes at 3:30. Your shift starts at 4.",
      cards: [
        { id: "shift", b: "economy", who: "Rick · Fresh Fare", t: "Work shift 4–6", s: 2,
          skip: "Rick: “No call, no show.”", rule: "J1" },
        { id: "leo", b: "family", who: "Mom", t: "Meet Leo's bus", s: 1,
          skip: "Leo got home to an empty house. Mom left work and lost pay.", rule: "F1" },
        { id: "tutor", b: "education", who: "Ms. Ortiz", t: "Chem tutoring", s: 1,
          skip: "Still lost on tomorrow's test." },
        { id: "truck", b: "religion", who: "Grandma's church", t: "Unload the pantry truck", s: 1,
          skip: "Grandma unloaded 40 boxes by herself." }
      ],
      idea: "<b>Role conflict</b>: two of Dani's statuses (worker, big sibling) want the same hour." },

    { id: "evening", name: "Evening", time: "6:00–9:00 PM", sky: "evening", icon: "🌆", slots: 3, times: ["6:00", "7:00", "8:00"],
      setup: "Mom's home at 6:30 with Leo. Chem test at 8 AM tomorrow.",
      cards: [
        { id: "pantry", b: "religion", who: "Grandma's church · 6–8", t: "Food pantry night", s: 2,
          skip: "Grandma: “Families waited.”", rule: "R1" },
        { id: "study", b: "education", who: "Ms. Ortiz · test tomorrow", t: "Study for chem test", s: 2,
          skip: "No studying. Test at 8 AM." },
        { id: "dinner", b: "family", who: "Leo: “I'm hungry”", t: "Make dinner with Leo", s: 1,
          skip: "Chips for dinner again." },
        { id: "close", b: "economy", who: "Rick · Fresh Fare · 6–9", t: "Extra closing shift", s: 2,
          skip: "Rick: “k.” He gives the hours to Kayla." }
      ],
      idea: "Every boss meets a real need. Together they want more hours than a day has." }
  ];

  // ---------- One text-message decision (School Day) ----------
  const DECISION = { short: "Phone in chem class", when: "1:45 PM · Chem class", from: "Rick · Fresh Fare", boss: "economy",
    texts: ["Come in at 3:30 instead of 4?", "Answer now or I ask Kayla."],
    note: "Class rule: phones stay in pockets.",
    ask: "What does Dani do?",
    options: [
      { ic: "📱", label: "Answer under the desk", hit: "education", rule: "S1",
        res: "Ms. Ortiz takes your phone. That's a <b>formal sanction</b>: an official, written punishment." },
      { ic: "🔔", label: "Wait for the bell", hit: "economy",
        res: "Rick gave Kayla the hours and texted “k.” That's an <b>informal sanction</b>: unwritten, but you feel it." },
      { ic: "🚪", label: "Ask to step out", hit: "education",
        res: "You followed the <b>norm</b> and got the hours, but missed the test review." }
    ] };

  // ---------- Review checks: one per part, each matches a Day 5 review slide ----------
  // options[0] is right; the screen always shuffles them.
  const CHECKS = [
    { id: "c1", std: "Soc.5", slide: "Culture on a Friday Night", short: "Chant + school pride = nonmaterial culture",
      frame: "phone", ftitle: "📣 Riverside High · 7:45 AM text",
      ev: "<span class=\"notif\"><b>Friday: home game vs. Marion</b><span>Wear black and gold. Jerseys $15 at lunch. Foam fingers at the gate.</span></span><span class=\"notif\"><b>Student section</b><span>Learn the chant: “R-H-S, we never rest!” Show your pride.</span></span>",
      terms: ["<b>Material culture:</b> things you can touch.", "<b>Nonmaterial culture:</b> ideas, values, chants, norms."],
      q: "In this text, which one is nonmaterial culture?",
      options: ["The chant and the school pride", "The $15 jerseys sold at lunch", "The foam fingers at the gate", "The bleachers and the football field"],
      hint: "Which one can you NOT pick up and hold?",
      why: "A chant and school pride are ideas you share, not objects. That's nonmaterial culture." },
    { id: "c2", std: "Soc.6", slide: "Tipping Shows How Culture Shapes You", short: "Tourist calls tip refusal rude = ethnocentrism",
      frame: "phone", ftitle: "📱 Dani's feed · lunch",
      ev: "<span class=\"notif\"><b>🎥 @tripwithtyler</b><span>Tokyo waiter chased me down to give my tip back. RUDE. 😤</span></span><span class=\"notif\"><b>💬 Top comment</b><span>In Japan, tips aren't expected. Good service is already the job.</span></span>",
      cite: "Fact source: Japan National Tourism Organization",
      terms: ["<b>Ethnocentrism:</b> judging another culture by your own rules.", "<b>Cultural relativism:</b> understanding it by its own rules first."],
      q: "The tourist calls the waiter rude. That's…",
      options: ["Ethnocentrism: judging Japan by U.S. rules", "Relativism: seeing Japan by its own rules", "A law that Japan's government wrote", "Following Japan's norms like a local"],
      hint: "Whose rules is the tourist using to judge?",
      why: "He judged Japan by U.S. tipping rules. That's ethnocentrism." },
    { id: "c3", std: "Soc.7", slide: "Each Institution Answers a Need", short: "City bus rule = government (who makes the rules)",
      frame: "receipt", ftitle: "🚌 City Transit notice",
      ev: "<span class=\"rl\"><span>FROM</span><span>City Council, Transit Dept.</span></span><span class=\"rl\"><span>CHANGE</span><span>Last Route 7 bus now leaves at 6:40 PM</span></span><span class=\"rl\"><span>WHY</span><span>Budget vote at Monday's council meeting</span></span>",
      needs: true,
      q: "Which institution is behind this change?",
      options: ["Government: it answers “Who makes the rules?”", "Economy: it answers “How do we get what we need?”", "Family: it answers “Who cares for us?”", "Education: it answers “How do we learn skills?”"],
      hint: "Read the FROM and WHY lines. Who voted?",
      why: "The city council voted on it. Government is the institution that makes the rules and runs public services." },
    { id: "c4", std: "Soc.8", slide: "Rosie Shows How Change Spreads", short: "Working women rising = change spreads across institutions",
      frame: "thought", ftitle: "💬 Grandma, at the pantry",
      ev: "“My grandma built bomber parts in 1943 while her husband was overseas. After the war she kept working. My mom worked. I worked. Your mom works. That's why somebody like you walks Leo to the bus.”",
      bars: true,
      cite: "Source: U.S. Bureau of Labor Statistics",
      q: "What do Grandma's story and the chart show?",
      options: ["A change in work spread into family and child care", "Women's jobs went back to normal after the war", "Only the economy changed; families stayed the same", "Institutions change alone without touching others"],
      hint: "Grandma links the factory job to who watches Leo. Follow that link.",
      why: "More women working (economy) changed who cares for kids (family) and what older siblings do. Change in one institution spreads to others." }
  ];

  const ENDINGS = {
    family:     { i: "🪑", t: "The Empty Chair", text: "Mom and Leo eat without Dani again. Mom lost pay covering for Leo." },
    education:  { i: "✉️", t: "The Letter Home", text: "Chem drops to an F. A letter goes home." },
    religion:   { i: "📦", t: "Short-Handed at the Pantry", text: "Grandma ran the pantry alone. One more no-show and Dani loses the spot." },
    economy:    { i: "📵", t: "Off the Schedule", text: "Rick takes Dani off next week's schedule. Less money." },
    government: { i: "🥶", t: "The Long Walk Home", text: "The last bus left at 6:40. Dani walked home in the cold." }
  };

  const PROMPTS = [
    { id: "why", short: "Why Dani dropped something", min: 60, newWords: 5,
      label: "1. Pick one thing Dani dropped. Which two institutions wanted the same time?",
      stem: "Dani dropped ___ because the ___ and the ___ wanted the same time.",
      mustAll: [["family", "mom", "leo", "grandma", "school", "education", "chem", "ortiz", "teacher", "job", "work", "economy", "store", "rick", "shift", "fresh fare", "church", "religion", "pantry", "government", "bus", "city", "law", "rule"],
                ["because", "so ", "since", "but", "when", "couldn", "could not", "same time", "both"]],
      mustMsg: "In answer 1, name what got dropped and the institutions that wanted the same time (use \"because\")." },
    { id: "norm", short: "Exit ticket: the new student", min: 50, newWords: 3,
      label: "2. Exit ticket: A new student interrupts, never raises a hand, and dresses very differently. Explain with unit terms.",
      stem: "The student is breaking the norm of ___, which comes from the value of ___.",
      mustAll: [["hand", "raise", "shout", "interrupt", "quiet", "turn", "wait", "listen", "talk", "speak", "blurt", "dress", "clothes"],
                ["respect", "learn", "order", "fair", "focus", "education", "attention", "polite", "manners", "kind", "others", "everyone", "turn", "school", "class", "safe", "equal"]],
      mustMsg: "In answer 2, name the norm (a rule for how to act) AND the value behind it (what matters, like respect)." }
  ];

  // ---------- Steps, in strict order ----------
  const STEPS = [
    { k: "plan", r: 0 }, { k: "result", r: 0 }, { k: "check", c: 0 },
    { k: "plan", r: 1 }, { k: "decide" }, { k: "result", r: 1 }, { k: "check", c: 1 },
    { k: "plan", r: 2 }, { k: "result", r: 2 }, { k: "check", c: 2 },
    { k: "plan", r: 3 }, { k: "result", r: 3 }, { k: "check", c: 3 },
    { k: "ending" }, { k: "write" }
  ];
  const partOf = i => { const s = STEPS[i]; if (!s) return 4; if (s.r != null) return s.r + 1; if (s.k === "decide") return 2; if (s.c != null) return s.c + 1; return 4; };

  // ---------- State + rules of play ----------
  function fresh() {
    return { v: 3, name: "", step: -1, plans: {}, out: {}, dec: null, rules: [], flags: {},
      hits: { family: 0, education: 0, religion: 0, economy: 0, government: 0 }, trail: [],
      wrong: {}, done: {}, writing: {}, ending: "", turnedIn: false };
  }
  function addRule(st, id) { if (id && !st.rules.includes(id)) { st.rules.push(id); return id; } return ""; }
  function lockRound(st, r, picked) {
    const R = ROUNDS[r], lines = [];
    st.plans[r] = picked.slice();
    R.cards.forEach(c => {
      if (picked.includes(c.id)) {
        if (c.flag) st.flags[c.flag] = 1;
        lines.push({ k: "did", id: c.id, rule: addRule(st, c.prule) });
      } else {
        st.hits[c.b]++;
        st.trail.push({ k: "drop", id: c.id });
        lines.push({ k: "drop", id: c.id, text: c.skip, rule: c.rule ? (addRule(st, c.rule) || c.rule) : "" });
      }
    });
    // Evening pantry: how Dani gets home depends on the city's bus rule (government).
    if (R.id === "evening" && picked.includes("pantry")) {
      if (st.flags.knowsBus) lines.push({ k: "note", b: "government", text: "You read the bus notice this morning, so Grandma drives you home. 🚗" });
      else { st.hits.government++; st.trail.push({ k: "event", b: "government", t: "Missed the 6:40 bus, walked home" }); lines.push({ k: "note", b: "government", text: "The last bus left at 6:40. You walked home in the cold.", rule: "G1" }); addRule(st, "G1"); }
    }
    st.out[r] = lines;
  }
  function decide(st, i) {
    const o = DECISION.options[i];
    st.dec = i; st.hits[o.hit]++;
    addRule(st, o.rule);
    st.trail.push({ k: "chose", i, b: o.hit });
  }
  function endingFor(st) {
    let best = "family";
    BOSS_ORDER.forEach(b => { if (st.hits[b] > st.hits[best]) best = b; });
    return best;
  }
  window.FiveBosses = { ROUNDS, DECISION, CHECKS, ENDINGS, RULES, STEPS, fresh, lockRound, decide, endingFor };
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
  if (!st || typeof st !== "object" || st.v !== 3 || !st.hits) st = fresh();
  try {
    const who = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (who && st.name && who.toLowerCase() !== st.name.toLowerCase()) { st = fresh(); localStorage.setItem(KEY, JSON.stringify(st)); if (window.classFirstTry) window.classFirstTry.reset(); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const cardById = id => { for (const R of ROUNDS) for (const c of R.cards) if (c.id === id) return c; return null; };
  function nextStep() { st.step++; save(); render(true); }

  // ---------- Small pieces ----------
  const bossTag = b => `<span class="btag b-${b}"><span aria-hidden="true">${BOSS[b].i}</span> <span>${esc(BOSS[b].n)}</span></span>`;
  const job = t => `<p class="job"><b>Your job:</b> <span>${esc(t)}</span></p>`;
  function ruleBox(id) {
    if (!id) return "";
    const R = RULES[id];
    return `<div class="rule"><p class="rk">📏 <span>The rule</span> ${bossTag(R.b)}</p><p class="rt">${esc(R.t)}</p></div>`;
  }
  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    if (!show) return;
    const s = STEPS[Math.min(st.step, STEPS.length - 1)];
    const p = partOf(Math.min(st.step, STEPS.length - 1));
    $("partTag").textContent = s.k === "ending" || s.k === "write" ? "Wrap-up" : "Part " + p + " of 4 · " + ROUNDS[p - 1].name;
    $("bosses").innerHTML = BOSS_ORDER.map(b => `<span class="chip b-${b}${st.hits[b] ? " hit" : ""}" title="${esc(BOSS[b].n)}: dropped ${st.hits[b]}"><span aria-hidden="true">${BOSS[b].i}</span><span class="cn">${esc(BOSS[b].n)}</span>${st.hits[b] ? `<span class="hn">❌${st.hits[b]}</span>` : ""}</span>`).join("");
  }
  function skyHead(R) {
    return `<div class="sky sky-${R.sky}"><span class="sun" aria-hidden="true">${R.icon}</span><div><p class="when">${esc(R.time)}</p><h2>${esc(R.name)}</h2></div></div>`;
  }

  // ---------- Intro ----------
  function intro() {
    app.innerHTML = `<section class="intro card">
      <div class="cover" aria-hidden="true"><span class="clock">⏰</span><span class="orb o1">🏠</span><span class="orb o2">🎓</span><span class="orb o3">⛪</span><span class="orb o4">💼</span><span class="orb o5">🏛️</span></div>
      <h1>Five Bosses, One Tuesday</h1>
      <p class="hook">Dani is 16. Five institutions want Dani's time today. There aren't enough hours.</p>
      <ol class="howto">
        <li><b>Plan</b> each part of Dani's day. Whatever doesn't fit gets dropped.</li>
        <li><b>See</b> what got dropped and which rule bit.</li>
        <li><b>Unlock</b> the next part with one review question from today's slides.</li>
      </ol>
      <p class="goal"><b>Done =</b> <span>4 parts, then 2 short answers, then Turn in. About 20 minutes.</span></p>
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
    const R = ROUNDS[r], n = R.slots;
    picks = picks.filter(id => R.cards.some(c => c.id === id));
    const used = () => picks.reduce((a, id) => a + R.cards.find(c => c.id === id).s, 0);
    app.innerHTML = `<section class="card round">${skyHead(R)}
      ${job("Tap demands to fill Dani's " + n + " slots. Whatever's left gets dropped.")}
      <p class="setup">${esc(R.setup)}</p>
      <div class="board">
        <div class="planner"><p class="ph">🗓️ <span>Dani's planner</span></p><ol class="slots" id="slots"></ol><p class="filled" id="filled"></p></div>
        <div class="handwrap"><p class="ph">📥 <span>Demands</span></p><div class="hand" id="hand"></div></div>
      </div>
      <button type="button" class="go" id="lockBtn">Lock in my plan →</button>
      <p class="msg" id="planMsg" role="status" aria-live="polite"></p></section>`;
    function draw() {
      const u = used();
      let html = "", i = 0;
      picks.forEach(id => {
        const c = R.cards.find(x => x.id === id);
        for (let k = 0; k < c.s && i < n; k++, i++) html += `<li class="slot full b-${c.b}${k ? " cont" : ""}"><span class="tm">${esc(R.times[i])}</span>${k ? `<span class="cn2">⋮</span>` : `<button type="button" class="slotbtn" data-id="${c.id}"><span aria-hidden="true">${BOSS[c.b].i}</span> <span>${esc(c.t)}</span> <span class="x" aria-label="Remove">✕</span></button>`}</li>`;
      });
      for (; i < n; i++) html += `<li class="slot open"><span class="tm">${esc(R.times[i])}</span><span class="emp">Empty</span></li>`;
      $("slots").innerHTML = html;
      $("filled").textContent = "Slots filled: " + u + " of " + n;
      $("hand").innerHTML = R.cards.map(c => {
        const inP = picks.includes(c.id), fits = inP || (u + c.s <= n);
        return `<button type="button" class="pcard b-${c.b}${inP ? " in" : ""}${!fits ? " nofit" : ""}" data-id="${c.id}" aria-pressed="${inP}" ${!fits ? 'aria-disabled="true"' : ""}>
          <span class="pc-top">${bossTag(c.b)}<span class="pc-cost">${c.s === 1 ? "1 slot" : c.s + " slots"}</span></span>
          <span class="pc-who">${esc(c.who)}</span><span class="pc-t">${esc(c.t)}</span>
          ${!fits ? `<span class="pc-no">Doesn't fit</span>` : ""}${inP ? `<span class="pc-in">✓ <span>Planned</span></span>` : ""}</button>`;
      }).join("");
      $("lockBtn").disabled = u < n;
      $("lockBtn").classList.toggle("ready", u >= n);
      document.querySelectorAll("#hand .pcard, #slots .slotbtn").forEach(b => b.onclick = () => toggle(b.dataset.id));
    }
    function toggle(id) {
      const c = R.cards.find(x => x.id === id), msg = $("planMsg");
      if (picks.includes(id)) picks = picks.filter(x => x !== id);
      else if (used() + c.s > n) { msg.textContent = "No room. Tap something in the planner to take it out first."; msg.className = "msg bad"; return; }
      else picks.push(id);
      msg.textContent = ""; msg.className = "msg"; draw();
    }
    $("lockBtn").onclick = () => {
      if (used() < n) { $("planMsg").textContent = "Fill every slot in Dani's planner first."; $("planMsg").className = "msg bad"; return; }
      lockRound(st, r, picks); picks = []; nextStep();
    };
    draw();
  }

  // ---------- The text-message decision ----------
  function decideView() {
    const D = DECISION, chosen = st.dec;
    let html = `<section class="card decide">${chosen == null ? job("Read Rick's text. Pick what Dani does. Every choice costs something.") : ""}
      <div class="phone"><p class="ph-top"><span class="ph-when">${esc(D.when)}</span></p>
        <p class="ph-from">${bossTag(D.boss)} <span>${esc(D.from)}</span></p>
        ${D.texts.map(t => `<p class="bubble">${esc(t)}</p>`).join("")}<p class="ph-note">${esc(D.note)}</p></div>`;
    if (chosen == null) html += `<h3 class="ask">${esc(D.ask)}</h3><div class="opts" id="opts"></div>`;
    else {
      const o = D.options[chosen];
      html += `<p class="picked"><span class="oic" aria-hidden="true">${o.ic}</span> <span>You chose:</span> <b>${esc(o.label)}</b></p><div class="result reply"><p>${o.res}</p><p class="cost">Cost: ${bossTag(o.hit)}</p></div>${ruleBox(o.rule)}
        <button type="button" class="go" id="nextBtn">Next →</button>`;
    }
    app.innerHTML = html + `</section>`;
    if (chosen == null) {
      const box = $("opts");
      shuffle(D.options.map((o, i) => i)).forEach(i => {
        const o = D.options[i], b = document.createElement("button");
        b.type = "button"; b.className = "opt";
        b.innerHTML = `<span class="oic" aria-hidden="true">${o.ic}</span><span class="olb">${esc(o.label)}</span>`;
        b.onclick = () => { decide(st, i); save(); render(true); };
        box.appendChild(b);
      });
    } else $("nextBtn").onclick = () => nextStep();
  }

  // ---------- What happened ----------
  function result(r) {
    const R = ROUNDS[r], lines = st.out[r] || [];
    const did = lines.filter(l => l.k === "did"), drop = lines.filter(l => l.k === "drop"), notes = lines.filter(l => l.k === "note");
    let n = 0;
    const tile = l => {
      const c = l.id ? cardById(l.id) : null, delay = `style="animation-delay:${(n++) * 0.18}s"`;
      return `<li class="tile ${l.k}${c ? " b-" + c.b : ""}" ${delay}>${l.k === "drop" ? `<span class="stamp no">DROPPED</span>` : ""}<p class="tt">${bossTag(c ? c.b : l.b)}</p>${c ? `<p class="tn">${esc(c.t)}</p>` : ""}<p class="bub">${esc(l.text)}</p>${ruleBox(l.rule)}</li>`;
    };
    app.innerHTML = `<section class="card resultc">${skyHead(R)}
      ${job("Read what got dropped and what it cost Dani.")}
      <p class="donel"><b>✓ Done:</b> ${did.map(l => { const c = cardById(l.id); return `<span class="dchip b-${c.b}"><span aria-hidden="true">${BOSS[c.b].i}</span> ${esc(c.t)}</span>`; }).join(" ")}</p>
      ${did.filter(l => l.rule).map(l => ruleBox(l.rule)).join("")}
      <ul class="tiles">${drop.map(tile).join("")}${notes.map(tile).join("")}</ul>
      ${R.idea ? `<div class="idea"><span class="bulb" aria-hidden="true">💡</span><div><p>${R.idea}</p></div></div>` : ""}
      <button type="button" class="go wait" id="nextBtn" disabled><span class="wbar" aria-hidden="true"></span><span class="wtxt">Read the cards… 3</span></button></section>`;
    $("nextBtn").onclick = () => nextStep();
    let left = 3;
    const tickNext = () => {
      const b = $("nextBtn"); if (!b || !b.classList.contains("wait")) return;
      left--;
      if (left > 0) { b.querySelector(".wtxt").textContent = "Read the cards… " + left; setTimeout(tickNext, 1000); return; }
      b.disabled = false; b.classList.remove("wait"); b.classList.add("ready"); b.textContent = tr("Next: review check →");
    };
    if (window.classIsTestT && window.classIsTestT()) { left = 1; tickNext(); }
    else setTimeout(tickNext, 1000);
  }

  // ---------- Review check (must be right to move on) ----------
  let locked = false;
  function frameHtml(C) {
    const bars = C.bars ? `<span class="mini"><span class="mbt">U.S. women working or job-hunting</span><span class="mb" style="--w:34%"><i>1950</i><b>34%</b></span><span class="mb" style="--w:60%"><i>1999</i><b>60%</b></span></span>` : "";
    const ev = `<div class="frame f-${C.frame}"><p class="ft">${esc(C.ftitle)}</p><div class="evbody">${C.ev}</div>${bars}${C.cite ? `<p class="cite">${esc(C.cite)}</p>` : ""}</div>`;
    const needs = C.needs ? `<div class="terms"><p class="tk">📘 <span>Each institution answers a need</span></p>${BOSS_ORDER.map(b => `<p>${BOSS[b].i} <b>${esc(BOSS[b].n)}:</b> ${esc(BOSS[b].need)}</p>`).join("")}</div>` : "";
    const terms = C.terms ? `<div class="terms"><p class="tk">📘 <span>Key words</span></p>${C.terms.map(t => `<p>${t}</p>`).join("")}</div>` : "";
    return `<div class="evrow">${ev}${terms}${needs}</div>`;
  }
  function checkBlock(C, host, onRight) {
    const done = st.done[C.id];
    const last = C.id === "c4";
    host.innerHTML = `<p class="slidetag">📽️ <span>From today's slides:</span> <b>${esc(C.slide)}</b> <span class="std">${esc(C.std)}</span></p>
      ${done ? "" : job("Read the clue. Pick the right answer to " + (last ? "finish Dani's day." : "unlock the next part."))}
      <div class="check">${frameHtml(C)}<p class="q"><span class="qb">${esc(C.q)}</span></p><div class="choices keys" id="ch_${C.id}"></div><p class="msg" id="fb_${C.id}" aria-live="polite"></p></div>`;
    const area = $("ch_" + C.id), fb = $("fb_" + C.id);
    if (done) { area.outerHTML = `<p class="answered">✓ ${esc(C.options[0])}</p><p class="why">${esc(C.why)}</p>`; return; }
    let lastOrder = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(C.options.map((t, n) => ({ t, n })));
      for (let k = 0; k < 12 && order.map(o => o.n).join() === lastOrder; k++) order = shuffle(order);
      lastOrder = order.map(o => o.n).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) { st.done[C.id] = true; if (window.classFirstTry) window.classFirstTry.right(C.id); save(); onRight(); return; }
          st.wrong[C.id] = (st.wrong[C.id] || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
          locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;
          const tick = () => {
            if (!fb.isConnected) { locked = false; return; }
            fb.textContent = "Not quite. " + C.hint + " The choices will mix up. Try again in " + left + "…"; fb.className = "msg bad";
            if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + C.hint + " Try again."; fb.className = "msg"; draw(); return; }
            setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
  }
  function checkView(c) {
    const C = CHECKS[c];
    app.innerHTML = `<section class="card checkc"><div id="ckhost"></div><div id="ckend"></div></section>`;
    const label = c < 3 ? "Unlocked! Next: " + ROUNDS[c + 1].name + " →" : "See how Dani's day ended →";
    const after = () => { checkBlock(C, $("ckhost"), after); $("ckend").innerHTML = `<button type="button" class="go" id="nextBtn">${esc(label)}</button>`; $("nextBtn").onclick = () => nextStep(); };
    if (st.done[C.id]) after(); else checkBlock(C, $("ckhost"), after);
  }

  // ---------- Ending ----------
  function trailLabel(x) {
    if (x.k === "drop") return "Dropped: " + cardById(x.id).t;
    if (x.k === "chose") return "Phone in class: " + DECISION.options[x.i].label;
    return x.t;
  }
  function endingView() {
    if (!st.ending) { st.ending = endingFor(st); save(); }
    const E = ENDINGS[st.ending];
    const rows = BOSS_ORDER.map(b => {
      const items = st.trail.filter(x => (x.k === "drop" ? cardById(x.id).b : x.b) === b).map(trailLabel);
      return `<li class="${b === st.ending ? "key" : ""}">${bossTag(b)} <b>${items.length}</b> <span class="fine">${esc(items.join(" · ") || "Nothing dropped")}</span></li>`;
    }).join("");
    app.innerHTML = `<section class="card endc">
      <div class="endhead e-${st.ending}"><span class="ei" aria-hidden="true">${E.i}</span><div><p class="when">Dani's Tuesday is over</p><h2>${esc(E.t)}</h2></div></div>
      <p class="etext">${esc(E.text)}</p>
      <p class="every">Every boss met a real need. Together, they wanted more hours than a day has.</p>
      <h3 class="rh">What Dani dropped, by boss:</h3><ul class="trail">${rows}</ul>
      <p class="fine">You got 1 of 5 endings. Your ending = the boss Dani dropped most.</p>
      <button type="button" class="go" id="nextBtn">Last step: 2 short answers →</button></section>`;
    $("nextBtn").onclick = () => nextStep();
  }

  // ---------- Write + turn in ----------
  function writeView() {
    app.innerHTML = `<section class="card writec journal"><h2>📓 Two short answers</h2>
      ${job("Fill in each sentence starter with your own words. Then tap Turn in.")}
      ${PROMPTS.map(p => `<label for="w_${p.id}">${esc(p.label)}</label><p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in" : ""}</p></section>`;
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = send;
  }
  async function send() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const testT = window.classIsTestT && window.classIsTestT();
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
      const esWords = window.SiteLang && window.SiteLang.must && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      const txt = plain(v);
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(txt)))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    const answers = { "Standard": STANDARD };
    const right = CHECKS.filter(c => !st.wrong[c.id]).length;
    answers["First-try correct"] = right + " of " + CHECKS.length;
    answers["First-try by standard"] = CHECKS.map(c => c.std + ": " + (st.wrong[c.id] ? "0" : "1") + " of 1").join(" · ");
    CHECKS.forEach(c => { answers[c.std + " · " + c.short] = c.options[0] + (st.wrong[c.id] ? " (after " + st.wrong[c.id] + " wrong " + (st.wrong[c.id] === 1 ? "try" : "tries") + ")" : " (first try)"); });
    ROUNDS.forEach((R, r) => {
      if (!st.plans[r]) return;
      const kept = R.cards.filter(c => st.plans[r].includes(c.id)).map(c => c.t).join(", ");
      const dropped = R.cards.filter(c => !st.plans[r].includes(c.id)).map(c => c.t).join(", ");
      answers["Choice · " + R.name + " plan"] = "Did: " + kept + " | Dropped: " + dropped;
    });
    if (st.dec != null) answers["Choice · " + DECISION.short] = DECISION.options[st.dec].label;
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    answers["Ending"] = ENDINGS[st.ending || endingFor(st)].t;
    answers["Dropped by boss"] = BOSS_ORDER.map(b => BOSS[b].n + " " + st.hits[b]).join(" · ");
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. You're done!"; msg.className = "msg good";
      $("sendBtn").textContent = "Turned in ✓"; $("sendBtn").disabled = false; $("sendBtn").onclick = send;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------- Router ----------
  let first = true;
  function render(scroll) {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false; locked = false;
    hud();
    if (st.step < 0) return intro();
    const s = STEPS[Math.min(st.step, STEPS.length - 1)];
    if (s.k === "plan") plan(s.r);
    else if (s.k === "decide") decideView();
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
  if (st.step >= 0 && $("welcome")) {
    const at = Math.min(st.step, STEPS.length - 1) + 1;
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " — you're on step " + at + " of " + STEPS.length + ".")}</span> <button type="button" class="notme" id="notMeBtn">${esc("Not " + st.name + "? Start fresh")}</button>`;
    $("welcome").hidden = false;
    $("notMeBtn").onclick = () => {
      st = fresh(); picks = [];
      if (window.classFirstTry) window.classFirstTry.reset();
      save(); $("welcome").hidden = true; render(); window.scrollTo(0, 0);
    };
  }
  render();

  // ---------- Test T. skip bar (shared/turnin.js) ----------
  try {
    const tPlan = r => { const R = ROUNDS[r]; let used = 0; const out = []; R.cards.forEach(c => { if (used + c.s <= R.slots) { out.push(c.id); used += c.s; } }); return out; };
    const TK = { plan: "plan", result: "what happened", check: "review check" };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => STEPS.length + 1,
      index: () => st.step < 0 ? 0 : Math.min(st.step, STEPS.length - 1) + 1,
      label: i => {
        if (i === 0) return "Title";
        const s = STEPS[i - 1];
        if (s.k === "ending") return "Ending";
        if (s.k === "write") return "2 short answers + turn in";
        if (s.k === "decide") return "Part 2 text: phone in class";
        return "Part " + partOf(i - 1) + " " + TK[s.k] + (s.k === "check" ? " (" + CHECKS[s.c].std + ")" : " (" + ROUNDS[s.r].name + ")");
      },
      go: i => {
        if (!st.name) st.name = "Test T.";
        const t = i - 1;
        for (let j = 0; j < t && j < STEPS.length; j++) {
          const s = STEPS[j];
          if (s.k === "plan" && !st.plans[s.r]) lockRound(st, s.r, tPlan(s.r));
          else if (s.k === "decide" && st.dec == null) decide(st, 0);
        }
        if (t < STEPS.findIndex(s => s.k === "ending")) st.ending = "";
        picks = []; locked = false;
        st.step = t; save(); render(true);
      },
      solve: () => {
        if (st.step < 0) return;
        const s = STEPS[Math.min(st.step, STEPS.length - 1)];
        if (s.k === "plan") { picks = tPlan(s.r); render(); }
        else if (s.k === "decide") { if (st.dec == null) { const b = document.querySelector("#opts .opt"); if (b) b.click(); } }
        else if (s.k === "check") { const C = CHECKS[s.c]; if (!st.done[C.id]) { st.done[C.id] = true; save(); render(); } }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
