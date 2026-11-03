// =====================================================================
//  THE COLD WAR DESK  (U.S. History · Unit 3 · Day 1 · combined day)
//  Part 1 (1945–1949): you're a young State Department aide moving containment cards on a map of
//  Europe against Orlov, a made-up Soviet counterpart. 7 budget tokens; force raises War Risk;
//  doing nothing lets countries fall. The historical path (aid, Marshall Plan, airlift, NATO)
//  costs exactly 7 tokens, so early mistakes lock you out of later moves.
//  Part 2 (1950–1954): the same aide is now a Red Scare suspect. Each file asks you to name names.
//  Naming raises Fear and adds new names to the wall (the snowball). Refusing costs Career hearts,
//  and high Fear makes refusing cost more. Ends with the Army–McCarthy hearings and the 1954 vote.
//  Ending = abroad result (3) x home result (4), with a "Caused by" trail.
//  5 evidence checks woven into play. Strict order. Saves on this device.
//  Turn-in: shared/turnin.js classTurnIn, same payload shape as shared/unit-game.js finish().
//  Made up: the player, Orlov, Rep. Garrity, Ruth, Leo, Dana, and the game's what-ifs.
//  Real: every quote, date, and number shown (sources in the small gray lines).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u3-d1-allies-enemies-v2";
  const ASSIGNMENT_ID = "ush-u3-d1-allies-enemies";
  const TITLE = "U.S. History · Unit 3 · Day 1 · The Cold War Desk";
  const STANDARD = "SS.9-12.US.36, SS.9-12.US.37, SS.9-12.US.40";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, TOTAL = 13, TOKENS = 7, HEARTS = 4;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (window.SiteLang ? window.SiteLang.t(s) : s);
  if (isEs()) document.body.classList.add("es");

  // ---------------- Map ----------------
  // [id, col, row, colspan, rowspan, full name, short code, start]
  const TILES = [
    ["nor", 4, 1, 1, 1, "Norway", "NOR", "free"],
    ["uk", 2, 2, 1, 1, "Britain", "UK", "free"],
    ["den", 4, 2, 1, 1, "Denmark", "DEN", "free"],
    ["ussr", 7, 1, 2, 3, "USSR", "USSR", "red"],
    ["ben", 3, 3, 1, 1, "Belgium", "BEL", "free"],
    ["wger", 4, 3, 1, 1, "W. Germany", "W.GER", "free"],
    ["eger", 5, 3, 1, 1, "E. Germany", "E.GER", "occ"],
    ["pol", 6, 3, 1, 1, "Poland", "POL", "occ"],
    ["fra", 2, 4, 2, 1, "France", "FRA", "free"],
    ["cze", 5, 4, 1, 1, "Czecho- slovakia", "CZE", "occ"],
    ["hun", 6, 4, 1, 1, "Hungary", "HUN", "occ"],
    ["rom", 7, 4, 1, 1, "Romania", "ROM", "occ"],
    ["ita", 4, 5, 1, 2, "Italy", "ITA", "free"],
    ["bul", 7, 5, 1, 1, "Bulgaria", "BUL", "occ"],
    ["tur", 8, 5, 1, 2, "Turkey", "TUR", "free"],
    ["gre", 6, 6, 1, 1, "Greece", "GRE", "free"]
  ];
  const NATO_TILES = ["nor", "uk", "den", "ben", "fra", "ita"];
  const RISK = { 2: ["gre", "tur"], 3: ["fra", "ita"], 4: ["berlin"] };
  // Real history: in 1945 the Soviet army/pressure is there ("occ"); one-party communist rule comes later.
  // Poland, Romania, Bulgaria 1946–47; Hungary 1947; Czechoslovakia Feb. 1948; East Germany Oct. 1949.
  const HIST = { 2: ["pol", "rom", "bul"], 3: ["hun"], 4: ["cze"], 6: ["eger"] };
  const HIST_NEWS = { 2: "📰 1946–47: Communists take over Poland, Romania, Bulgaria", 3: "📰 1947: Communists take over Hungary", 4: "📰 Feb. 1948: Communists seize Czechoslovakia" };
  const histRed = id => Object.keys(HIST).some(s => +s <= st.step && HIST[s].includes(id));

  // ---------------- State ----------------
  const fresh = () => ({ v: 2, name: "", step: 0, tokens: TOKENS, war: 0, lost: [], curtain: false, nato: false, orlov: "calm",
    picks: {}, checks: {}, airlift: 0, fear: 0, fearParts: null, career: HEARTS, named: 0, jobs: 0, wall: [], hale: "hungry",
    ticks: {}, tvDrop: false, writing: {}, atReport: false, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 2) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this device, start that student fresh.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const signedIn = window.classShortName ? window.classShortName(raw) : raw.trim();
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });

  // ---------------- Steps ----------------
  const STEP = [null,
    { year: "1945", t: "1945 · The Line" },
    { year: "1947", t: "1947 · Greece and Turkey" },
    { year: "1948", t: "1948 · Hungry Europe" },
    { year: "1948", t: "1948 · Berlin Blockade" },
    { year: "1949", t: "1949 · NATO" },
    { year: "1949", t: "1949 · Two Shocks" },
    { year: "1950", t: "1950 · The List" },
    { year: "1950", t: "1950 · One Senator" },
    { year: "1951", t: "1951 · Hollywood" },
    { year: "1953", t: "1953 · The Oath" },
    { year: "1954", t: "1954 · Live on TV" },
    { year: "1954", t: "Your ending" },
    { year: "1954", t: "Your report" }];
  const part = () => (st.step >= 7 ? 2 : 1);

  // ---------------- Evidence checks (options[0] is right) ----------------
  const CHECKS = {
    c_truman: { std: "US.37", short: "Truman Doctrine: what Truman promised",
      tag: "Truman's speech to Congress · March 12, 1947",
      quote: "“…support free peoples who are resisting attempted subjugation by armed minorities or by outside pressures.”",
      gloss: "subjugation = being taken over",
      who: ["🏛️", "av us", "Congress clerk"], q: "What is Truman promising?",
      options: ["Back countries fighting off a takeover", "Free Eastern Europe by invading the USSR", "Pull U.S. troops out of free countries", "Let armed minorities run their countries"],
      hint: "Who does Truman support, and against what?",
      reveal: "<b>Truman Doctrine</b>: help free countries fight off communist takeovers.",
      unlock: "📜 Truman Doctrine card unlocked" },
    c_marshall: { std: "US.37", short: "Marshall Plan: what Marshall said it fights",
      tag: "George Marshall, Secretary of State · June 5, 1947",
      quote: "“Our policy is directed not against any country or doctrine but against hunger, poverty, desperation, and chaos.”",
      gloss: "doctrine = a set of beliefs",
      who: ["📰", "av gray", "Reporter"], q: "What does Marshall say the plan fights?",
      options: ["Hunger and poverty in Europe", "The Soviet Union and Stalin", "The communist doctrine itself", "Chaos caused by Soviet spies"],
      hint: "He lists four things. Are they countries or problems?",
      reveal: "Marshall's idea: <b>hungry, desperate people</b> turn to communism. Fix that first.",
      unlock: "💰 Marshall Plan card unlocked" },
    c_nato: { std: "US.37", short: "NATO: what Article 5 promises",
      tag: "North Atlantic Treaty, Article 5 · April 4, 1949",
      quote: "“…an armed attack against one or more of them… shall be considered an attack against them all.”",
      gloss: "",
      who: ["🎖️", "av us", "General"], q: "What does signing promise?",
      options: ["Defend any member that is attacked", "Defend only the country that got hit", "Let the USSR join the alliance", "Stop sending aid to Europe"],
      hint: "An attack on one counts as an attack on whom?",
      reveal: "<b>NATO</b>: an attack on one member is an attack on all.",
      unlock: "🤝 NATO card unlocked" },
    c_smith: { std: "US.40", short: "Smith's Declaration of Conscience: what she defended",
      tag: "Sen. Margaret Chase Smith (R-Maine) · June 1, 1950",
      quote: "“The right to criticize; the right to hold unpopular beliefs; the right to protest; the right of independent thought.”",
      gloss: "",
      who: ["📰", "av gray", "Reporter"], q: "What is Smith defending?",
      options: ["People's right to disagree out loud", "McCarthy's right to make his lists", "The Communist Party's secret plans", "Senators' right to accuse anyone"],
      hint: "Read her list of rights. Who uses them?",
      reveal: "<b>Declaration of Conscience</b>: Smith, a Republican, stood up to McCarthy.",
      unlock: "🎤 Speak-up card unlocked" },
    c_welch: { std: "US.36", short: "Welch at the Army–McCarthy hearings: why it hurt McCarthy",
      tag: "",
      quote: "",
      gloss: "",
      who: ["🧓", "av gold", "Your neighbor"], q: "Why did this moment hurt McCarthy?",
      options: ["Viewers saw him bully someone live", "It proved the Army hid real spies", "Welch showed McCarthy was a spy", "TV networks banned his speeches"],
      hint: "Look at the TV. Who was watching, and what did they see?",
      reveal: "<b>Army–McCarthy hearings</b>: on live TV, millions saw McCarthy bully people.",
      unlock: "📺 The spell breaks · 😨 −2" }
  };
  const CHECK_IDS = ["c_truman", "c_marshall", "c_nato", "c_smith", "c_welch"];

  // ---------------- Decisions ----------------
  // chips: [class, text]. cost = tokens. fx applied on pick.
  const D = {
    1: [
      { id: "push", ic: "🪖", t: "Push them out", d: "Make Soviet troops leave.", cost: 2, chips: [["cost", "💵 −2"], ["bad", "🔥 +4"]] },
      { id: "hold", ic: "🧱", t: "Hold the line", d: "Accept it. Stop the spread.", cost: 0, chips: [["cost", "💵 0"], ["bad", "😞 East stays Soviet"]] }
    ],
    2: [
      { id: "aid", ic: "📜", t: "Aid + advisers", d: "$400 million, no U.S. troops.", cost: 1, chips: [["cost", "💵 −1"]], unlock: "c_truman" },
      { id: "troops", ic: "🪖", t: "Combat troops", d: "Fight the rebels ourselves.", cost: 2, chips: [["cost", "💵 −2"], ["bad", "🔥 +3"]] },
      { id: "out", ic: "🙈", t: "Stay out", d: "Not our problem.", cost: 0, chips: [["cost", "💵 0"], ["bad", "🟥 ?"]] }
    ],
    3: [
      { id: "big", ic: "💰", t: "Rebuild big", d: "Billions, mostly gifts.", cost: 3, chips: [["cost", "💵 −3"]], unlock: "c_marshall" },
      { id: "loan", ic: "💸", t: "Small loan", d: "Cheap. They pay it back.", cost: 1, chips: [["cost", "💵 −1"], ["bad", "🟥 ?"]] },
      { id: "none", ic: "🏠", t: "Keep it home", d: "Americans need the money.", cost: 0, chips: [["cost", "💵 0"], ["bad", "🟥 ?"]] }
    ],
    4: [
      { id: "airlift", ic: "🛩️", t: "Fly it in", d: "Food and coal by plane.", cost: 2, chips: [["cost", "💵 −2"]] },
      { id: "tanks", ic: "🚚", t: "Send tanks", d: "Force the roads open.", cost: 1, chips: [["cost", "💵 −1"], ["bad", "🔥 +4"]] },
      { id: "pull", ic: "🏳️", t: "Pull out", d: "Give up West Berlin.", cost: 0, chips: [["cost", "💵 0"], ["bad", "🟥 +1"]] }
    ],
    5: [
      { id: "sign", ic: "🤝", t: "Sign NATO", d: "12 nations defend each other.", cost: 1, chips: [["cost", "💵 −1"], ["bad", "🔥 +1"]], unlock: "c_nato" },
      { id: "alone", ic: "🧍", t: "Go it alone", d: "No promises to anyone.", cost: 0, chips: [["cost", "💵 0"], ["bad", "🔥 +2"]] }
    ],
    7: [
      { id: "name", ic: "📛", t: "Name Ruth", d: "You're cleared.", chips: [["bad", "😨 +2"], ["bad", "📌 +2 names"]] },
      { id: "refuse", ic: "✋", t: "Refuse", d: "“I won't name anyone.”", chips: "refuse" }
    ],
    8: [
      { id: "back", ic: "🎤", t: "Back Smith", d: "Say it on the record.", chips: "refuse", unlock: "c_smith" },
      { id: "silent", ic: "🤐", t: "No comment", d: "Stay out of it.", chips: [["bad", "😨 +1"]] }
    ],
    9: [
      { id: "name", ic: "📛", t: "Name Leo", d: "Your name stays off the list.", chips: [["bad", "😨 +2"], ["bad", "📌 +2 names"]] },
      { id: "refuse", ic: "✋", t: "Refuse", d: "“Leo is no spy.”", chips: "refuse" }
    ],
    10: [
      { id: "name", ic: "📛", t: "List Dana", d: "You keep your job.", chips: [["bad", "😨 +2"], ["bad", "📌 +2 names"]] },
      { id: "refuse", ic: "✋", t: "Protect Dana", d: "“Dana is loyal.”", chips: "refuse" },
      { id: "quiet", ic: "🤐", t: "Stay quiet", d: "Not your fight.", chips: [["bad", "😨 +1"], ["bad", "🚫 Dana?"]] }
    ],
    11: [
      { id: "condemn", ic: "⚖️", t: "Censure him", d: "An official Senate scolding.", chips: [["good", "😨 −1"]] },
      { id: "defend", ic: "🛡️", t: "Defend him", d: "He fights communists.", chips: [["bad", "😨 +1"]] }
    ]
  };
  const speakCost = () => (st.fear >= 7 ? 2 : 1);
  const refuseChips = () => [["bad", "❤️ −" + speakCost()], ["good", "😨 −1"]];
  const airliftCost = () => (st.picks[3] === "big" ? 2 : 3);
  const cardCost = (step, c) => (step === 4 && c.id === "airlift" ? airliftCost() : (c.cost || 0));

  function loseTiles(ids) { st.lastLost = ids; ids.forEach(id => { if (!st.lost.includes(id)) st.lost.push(id); }); }
  function applyPick(step, id) {
    const c = D[step].find(x => x.id === id);
    st.lastLost = [];
    if (step <= 5) st.tokens = clamp(st.tokens - cardCost(step, c), 0, TOKENS);
    if (step === 1) { if (id === "push") { st.war += 4; st.orlov = "angry"; } else st.orlov = "smug"; st.curtain = true; }
    if (step === 2) { if (id === "troops") { st.war += 3; st.orlov = "angry"; } else if (id === "out") { loseTiles(["gre", "tur"]); st.orlov = "smug"; } else st.orlov = "blocked"; }
    if (step === 3) { if (id === "loan") { loseTiles(["ita"]); st.orlov = "smug"; } else if (id === "none") { loseTiles(["fra", "ita"]); st.orlov = "smug"; } else st.orlov = "blocked"; }
    if (step === 4) { if (id === "tanks") { st.war += 4; st.orlov = "angry"; } else if (id === "pull") { loseTiles(["berlin"]); st.orlov = "smug"; } else st.orlov = "nervous"; }
    if (step === 5) { if (id === "sign") { st.war += 1; st.nato = true; st.orlov = "angry"; } else { st.war += 2; st.orlov = "smug"; } }
    st.war = clamp(st.war, 0, 10);
    const file = { 7: "ruth", 9: "leo", 10: "dana" }[step];
    if (file) {
      const pin = st.wall.find(p => p.id === file);
      if (id === "quiet") {
        st.fear += 1; st.jobs++; st.hale = "pleased";
        if (pin) pin.st = "black";
      } else if (id === "name") {
        st.fear += 2; st.named++; st.jobs++; st.hale = "pleased";
        if (pin) pin.st = "black";
        const by = pin ? pin.n : "";
        st.wall.push({ id: file + "q1", f: "❓", n: "New name", s: "named by " + by, st: "q", fresh: true }, { id: file + "q2", f: "❓", n: "New name", s: "named by " + by, st: "q", fresh: true });
      } else {
        st.career = clamp(st.career - speakCost(), 0, HEARTS); st.fear -= 1; st.hale = "angry";
        if (pin) pin.st = "safe";
      }
    }
    if (step === 8) { if (id === "back") { st.career = clamp(st.career - speakCost(), 0, HEARTS); st.fear -= 1; st.hale = "angry"; } else { st.fear += 1; st.hale = "pleased"; } }
    if (step === 11) { st.fear += id === "condemn" ? -1 : 1; }
    st.fear = clamp(st.fear, 0, 10);
  }

  // Things that happen when a step opens (once).
  function onEnter(step) {
    if (st.ticks[step]) return;
    const info = {};
    if (step === 6) {
      const lost = st.lost.length, warUp = st.war >= 7 ? 2 : st.war >= 4 ? 1 : 0;
      st.fearParts = { news: 2, lost, war: warUp };
      st.fear = clamp(2 + lost + warUp, 0, 10);
    }
    if (step === 7) {
      st.wall = [{ id: "you", f: "🧑‍💼", n: "You", s: "State Dept. aide", st: "you" }, { id: "ruth", f: "👩‍💼", n: "Ruth K.", s: "Typist", st: "cur", fresh: true }];
      st.hale = "hungry";
    }
    if (step >= 8 && step <= 11) {
      const open = st.wall.filter(p => p.st === "q");
      if (open.length) { open.forEach(p => { p.st = "black"; }); st.jobs += open.length; st.fear = clamp(st.fear + 1, 0, 10); info.snow = open.length; }
    }
    if (step === 9) {
      st.fear = clamp(st.fear + 1, 0, 10); info.spy = true;
      st.wall.push({ id: "spy", f: "🕵️", n: "J. Rosenberg", s: "Real spy case", st: "spy", fresh: true });
      st.wall.push({ id: "leo", f: "🎬", n: "Leo M.", s: "Movie writer", st: "cur", fresh: true });
      st.hale = "hungry";
    }
    if (step === 10) { st.wall.push({ id: "dana", f: "🧔", n: "Dana P.", s: "Your desk mate", st: "cur", fresh: true }); st.hale = "hungry"; }
    st.ticks[step] = info;
  }

  // ---------------- Results ----------------
  // stamp: [class, text]; line: one sentence; real: small gray line; reveal: one-line concept.
  function result(step, id) {
    const R = {
      1: { push: { stamp: ["bad", "Stalemate"], line: "Stalin won't budge. You burned tokens and nearly started a war." },
           hold: { stamp: ["warn", "Line drawn"], line: "Millions in the East lose their freedom. The West stays free." } },
      2: { aid: { stamp: ["", "Held"], line: "Greece's government wins. Turkey stays with the West.", real: "Real: Congress approved $400 million in 1947." },
           troops: { stamp: ["warn", "Held, barely"], line: "The rebels lose, but Orlov rushes troops to the border.", real: "Real: Truman sent aid and advisers, not combat troops." },
           out: { stamp: ["bad", "Lost"], line: "In this game, Greece and Turkey fall to communism.", real: "Real: Truman sent $400 million in aid instead." } },
      3: { big: { stamp: ["", "Rebuilt"], line: "Factories restart. Communist votes drop. Orlov bans the East from taking aid.", real: "Real: about $13 billion, 1948–1952." },
           loan: { stamp: ["bad", "Lost"], line: "Not enough. In this game, Italy votes communist.", real: "Real: the U.S. gave about $13 billion, mostly gifts." },
           none: { stamp: ["bad", "Lost"], line: "In this game, France and Italy turn communist.", real: "Real: the U.S. gave about $13 billion, mostly gifts." } },
      4: { airlift: { stamp: ["", "Berlin fed"], line: "Planes land for almost a year. Orlov gives up in May 1949.", real: "Real: 2.3 million tons of food and coal flown in." },
           tanks: { stamp: ["warn", "Standoff"], line: "Orlov rolls out tanks too. The world holds its breath.", real: "Real: Truman chose planes, not tanks." },
           pull: { stamp: ["bad", "Lost"], line: "In this game, West Berlin goes communist.", real: "Real: Truman refused to give up Berlin." } },
      5: { sign: { stamp: ["", "Alliance"], line: "12 nations sign. Orlov answers with his own alliance.", real: "Real: the Soviets formed the Warsaw Pact in 1955." },
           alone: { stamp: ["warn", "Alone"], line: "Orlov tests you everywhere. Your allies feel alone.", real: "Real: the U.S. signed NATO on April 4, 1949." } },
      7: { name: { stamp: ["bad", "Blacklisted"], line: "Ruth is fired. Now Garrity wants her names." },
           refuse: { stamp: ["", "No names"], line: "Garrity calls you a troublemaker. Ruth keeps her job." } },
      8: { back: { stamp: ["", "On record"], line: "Garrity is furious. Two coworkers quietly thank you.", real: "Real: only 6 senators joined Smith." },
           silent: { stamp: ["warn", "No comment"], line: "Silence lets the fear grow.", real: "Real: only 6 senators joined Smith." } },
      9: { name: { stamp: ["bad", "Blacklisted"], line: "Leo's studio drops him. No one will hire him.", real: "Real: hundreds of Hollywood workers were blacklisted." },
           refuse: { stamp: ["", "No names"], line: "Garrity threatens to jail you for not answering.", real: "Real: the Hollywood Ten went to jail for refusing HUAC's questions." } },
      10: { name: { stamp: ["bad", "Blacklisted"], line: "Dana is fired. No proof was ever shown." },
            refuse: { stamp: ["", "No names"], line: "Your boss moves you to the basement office." },
            quiet: { stamp: ["bad", "Blacklisted"], line: "Someone else lists Dana. Dana is fired. You said nothing." } },
      11: { condemn: { stamp: ["", "Censured"], line: "The Senate censures McCarthy, 67–22. His power fades.", real: "Real: vote of December 2, 1954." },
            defend: { stamp: ["warn", "Censured anyway"], line: "You lose. The Senate censures McCarthy, 67–22.", real: "Real: vote of December 2, 1954." } }
    };
    return R[step][id];
  }
  const REVEAL = {
    1: "<b>Iron Curtain</b>: the line between the free West and communist East.",
    2: "<b>Containment</b>: stop communism from spreading to new countries.",
    3: "<b>Marshall Plan</b>: U.S. money rebuilt Western Europe, so communism lost its pull.",
    4: "<b>Berlin Airlift</b>: planes fed West Berlin, and no one fired a shot.",
    5: "<b>Cold War</b>: two armed camps that never fought each other directly.",
    7: "<b>HUAC</b> (House Un-American Activities Committee): questioned people about communist ties.",
    8: "<b>Civic virtue</b>: standing up for others' rights, even when it's risky.",
    9: "<b>Blacklist</b>: a list of people no one would hire.",
    10: "<b>Loyalty oath</b>: a promise you're not a communist, required to keep many jobs.",
    11: "<b>McCarthyism</b>: accusing people of disloyalty (betraying the country) without proof."
  };

  // ---------------- HUD ----------------
  const ORLOV = { calm: ["🙂", "Watching"], smug: ["😏", "Smug"], angry: ["😠", "Furious"], blocked: ["😤", "Blocked"], nervous: ["😬", "Nervous"] };
  const HALE = { hungry: ["🧐", "Wants names"], pleased: ["😏", "Pleased"], angry: ["😠", "Angry"], beaten: ["😓", "Losing power"] };
  let last = {};
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    document.body.classList.toggle("home", on && part() === 2);
    document.body.classList.toggle("fearhot", on && part() === 2 && st.fear >= 7 && st.step < 12);
    if (!on) return;
    const date = `<div class="date"><span>YEAR</span><b>${STEP[st.step].year}</b></div>`;
    let h;
    if (part() === 1) {
      const toks = Array.from({ length: TOKENS }, (_, i) => `<i class="${i >= st.tokens ? "spent" : ""}">💵</i>`).join("");
      const o = ORLOV[st.orlov] || ORLOV.calm;
      h = date + `<span class="hm" id="mTok" title="Budget"><span class="tok" aria-label="Budget tokens">${toks}</span><b>${st.tokens}</b></span>
        <span class="hm" id="mWar"><span class="ic">🔥</span><span class="lbl">War risk</span><span class="bar"><span id="warBar" style="width:${st.war * 10}%"></span></span><b>${st.war}/10</b></span>
        <span class="hm" id="mLost"><span class="ic">🟥</span><span class="lbl">Countries lost</span><b>${st.lost.length}</b></span>
        <span class="steppill">${"Step " + st.step + " of " + TOTAL}</span>
        <span class="rival" id="rival"><span class="face">${o[0]}</span><span><b>Orlov</b><small>${o[1]}</small></span></span>`;
    } else {
      const hearts = Array.from({ length: HEARTS }, (_, i) => `<i class="${i >= st.career ? "gone" : ""}">❤️</i>`).join("");
      const hl = HALE[st.hale] || HALE.hungry;
      h = date + `<span class="hm" id="mFear"><span class="ic">😨</span><span class="lbl">Fear</span><span class="bar"><span id="fearBar" style="width:${st.fear * 10}%"></span></span><b>${st.fear}/10</b></span>
        <span class="hm" id="mCareer"><span class="lbl">Career</span><span class="hearts">${hearts}</span></span>
        <span class="hm" id="mJobs"><span class="ic">🚫</span><span class="lbl">Jobs lost</span><b>${st.jobs}</b></span>
        <span class="steppill">${"Step " + st.step + " of " + TOTAL}</span>
        <span class="rival" id="rival"><span class="face">${hl[0]}</span><span><b>Rep. Garrity</b><small>${hl[1]}</small></span></span>`;
    }
    $("hudIn").innerHTML = h;
    const now = { tok: st.tokens, war: st.war, lost: st.lost.length, fear: st.fear, career: st.career, jobs: st.jobs, rival: st.orlov + st.hale };
    [["tok", "mTok"], ["war", "mWar"], ["lost", "mLost"], ["fear", "mFear"], ["career", "mCareer"], ["jobs", "mJobs"], ["rival", "rival"]].forEach(([k, el]) => {
      if (last[k] != null && last[k] !== now[k] && $(el)) $(el).classList.add(k === "rival" ? "react" : "bump");
    });
    last = now;
  }

  // ---------------- Shared pieces ----------------
  const app = $("app");
  let locked = false, justSolved = null, justPicked = false;
  const say = (av, cls, who, text) => `<div class="say"><span class="${cls}">${av}</span><p class="bub"><small>${who}</small>${text}</p></div>`;
  const orlovSays = text => say("😏", "av", "Orlov", text);
  const haleSays = text => say("🧐", "av", "Rep. Garrity", text);
  const reveal = html => `<p class="reveal">💡 ${html}</p>`;
  function card() { app.innerHTML = `<section class="card" id="stepCard"></section>`; return $("stepCard"); }
  function nextBtn(box, label) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn";
    b.textContent = label || ("Next: " + STEP[st.step + 1].t + " →");
    b.onclick = goNext; box.appendChild(b); return b;
  }
  function goNext() { st.step++; onEnter(st.step); save(); render(); window.scrollTo(0, 0); }
  function scrollToEl(el) { if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60); }

  function board(opts) {
    opts = opts || {};
    const risk = RISK[st.step] && !st.picks[st.step] ? RISK[st.step] : [];
    const flips = (opts.flips || []).slice();
    st.histSeen = st.histSeen || {};
    if (HIST[st.step] && !st.histSeen[st.step]) { st.histSeen[st.step] = true; flips.push(...HIST[st.step]); save(); }
    const pre49 = st.step < 6;
    const tiles = TILES.map(([id, c, r, cs, rs, full, code, start]) => {
      const lost = st.lost.includes(id);
      if (start === "occ" && histRed(id)) start = "red";
      if (pre49 && id === "wger") { full = "Germany (West)"; code = "GER-W"; }
      if (pre49 && id === "eger") { full = "Germany (Soviet)"; code = "GER-E"; }
      const cls = ["tile", lost ? "lost" : start, risk.includes(id) ? "risk" : "", flips.includes(id) ? "flip" : "", id === "ussr" ? "ussr" : "", id === "eger" ? "has-berlin" : ""].join(" ");
      const badge = st.nato && NATO_TILES.includes(id) && !lost ? `<span class="badge">🛡️</span>` : "";
      const berlin = id === "eger" ? `<span class="berlin ${st.lost.includes("berlin") ? "lost" : ""} ${risk.includes("berlin") ? "risk" : ""}">${st.lost.includes("berlin") ? "🟥" : "🏙️"}<span class="bl"> W. Berlin</span></span>` : "";
      return `<div class="${cls}" style="grid-column:${c} / span ${cs};grid-row:${r} / span ${rs}"><span class="full">${full}</span><span class="code">${code}</span>${badge}${berlin}</div>`;
    }).join("") + `<div class="tile usa" style="grid-column:1 / span 1;grid-row:2 / span 3"><span>🇺🇸</span><span class="full">U.S.</span><span class="code">U.S.</span><span class="sub">→</span></div>`;
    const curtain = st.curtain ? `<svg class="curtain ${opts.drawCurtain ? "draw" : ""}" viewBox="0 0 8 6" preserveAspectRatio="none" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M4,0.1 L4,4 L6,4 L6,5 L7,5 L7,4 L8,4"/></svg>` : "";
    return `<div class="board" aria-label="Map of Europe"><div class="grid">${tiles}${curtain}</div>
      <div class="legend"><span><i class="sw f"></i>Free elections + capitalism</span><span><i class="sw o"></i>🪖 Soviet army or pressure</span><span><i class="sw r"></i>Communist, one-party rule</span>${st.curtain ? "<span>▬ Iron Curtain</span>" : ""}${st.nato ? "<span>🛡️ NATO</span>" : ""}</div></div>`;
  }

  function wallHtml() {
    const pins = st.wall.map(p => {
      const cls = ["pin", p.st === "cur" ? "cur" : p.st, p.fresh ? "new" : ""].join(" ");
      return `<div class="${cls}"><span class="pf">${p.f}</span>${esc(p.n)}<span class="ps">${esc(p.s)}</span></div>`;
    }).join("");
    st.wall.forEach(p => { p.fresh = false; });
    save();
    return `<div class="wall" aria-label="Suspect wall">${pins}</div>`;
  }

  // An evidence check on a document/screen. def.options[0] is right.
  function mountCheck(box, id, onRight) {
    const def = CHECKS[id], c = chk(id);
    if (c.done) return;
    const wrap = document.createElement("div"); wrap.className = "check"; wrap.id = "check";
    wrap.innerHTML = say(def.who[0], def.who[1], def.who[2], `<span class="check-tag">🔎 Evidence check</span><br>${def.q}`);
    const area = document.createElement("div"); area.className = "opts";
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    function draw() {
      area.replaceChildren();
      shuffle(def.options.map((t, n) => ({ t, n }))).forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "opt"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            c.done = true; justSolved = id; if (window.classFirstTry) window.classFirstTry.right(id);
            save(); onRight(); return;
          }
          c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong(); save();
          wrap.classList.remove("spark"); void wrap.offsetWidth; wrap.classList.add("spark");
          locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
          let left = LOCK;
          const tick = () => {
            fb.className = "msg bad";
            if (left <= 0) { locked = false; fb.className = "msg"; fb.textContent = "Not quite. " + def.hint + " Try again."; draw(); return; }
            fb.textContent = "Not quite. " + def.hint + " The choices will mix up. Try again in " + left + "…";
            left--; setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
    wrap.appendChild(area); wrap.appendChild(fb);
    box.appendChild(wrap);
  }
  function docHtml(id) {
    const d = CHECKS[id];
    return `<div class="doc"><p class="dtag">📄 ${d.tag}</p><p class="quote">${d.quote}</p>${d.gloss ? `<p class="gloss">${d.gloss}</p>` : ""}</div>`;
  }
  function solvedHtml(id) {
    const d = CHECKS[id];
    const slam = justSolved === id; if (slam) justSolved = null;
    return `<div class="solved ${slam ? "slam" : ""}">✔ ${d.unlock}</div>${reveal(d.reveal)}`;
  }

  // Decision cards.
  function deck(box, step, ask) {
    box.insertAdjacentHTML("beforeend", `<p class="ask">${ask}</p>`);
    const wrap = document.createElement("div"); wrap.className = "deck"; wrap.id = "deck";
    D[step].forEach(c => {
      const cost = cardCost(step, c);
      const chips = c.chips === "refuse" ? refuseChips() : step === 4 && c.id === "airlift" ? [["cost", "💵 −" + cost]] : c.chips;
      const broke = step <= 5 && cost > st.tokens;
      const isNew = c.unlock && chk(c.unlock).done;
      const b = document.createElement("button"); b.type = "button";
      b.className = "dcard" + (isNew ? " unlock newcard" : "");
      b.disabled = broke;
      b.innerHTML = `${isNew ? `<span class="newtag">NEW</span>` : ""}<span class="ci">${c.ic}</span><span class="dtext"><span class="ct">${c.t}</span><span class="cd">${c.d}</span>
        <span class="chips">${chips.map(([k, t]) => `<span class="chip ${k}">${t}</span>`).join("")}</span>${broke ? `<span class="lockt">Not enough 💵</span>` : ""}</span>`;
      b.onclick = () => {
        if (st.picks[step]) return;
        st.picks[step] = c.id; applyPick(step, c.id); justPicked = true; save(); render();
        scrollToEl($("result"));
      };
      wrap.appendChild(b);
    });
    box.appendChild(wrap);
  }
  function resultHtml(step) {
    const id = st.picks[step], r = result(step, id), c = D[step].find(x => x.id === id);
    const slam = justPicked; justPicked = false;
    return `<div class="result" id="result"><span class="stamp ${r.stamp[0]} ${slam ? "slam" : ""}">${r.stamp[1]}</span>
      <span class="youpicked">${c.ic} <span>${c.t}</span></span>
      <p class="rline">${r.line}</p>${r.real ? `<p class="real">${r.real}</p>` : ""}</div>`;
  }

  // ---------------- Title ----------------
  function title() {
    app.innerHTML = `<section class="card titlecard">
      <div>
        <h1>The Cold War Desk</h1>
        <p class="hook">Your old ally is now your rival.</p>
        <ul class="facts"><li>🗺️ Out-move the Soviets</li><li>🎙️ Survive the Red Scare</li><li>🏁 Many endings · 25 min</li></ul>
        <p class="goal">🎯 <b>Goal:</b> explain containment and the Red Scare.</p>
        <label for="nameBox">Name (like Jordan M.)</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="Jordan M." value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Take your desk →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        <div class="vsbox"><div class="who"><span class="big">🧑‍💼</span><b>You</b><small>🇺🇸</small></div><div class="vs">VS</div><div class="who red"><span class="big">😏</span><b>Orlov</b><small>☭</small></div></div>
        <p class="ticker">📺 1945 → 1954</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; onEnter(1); save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Part 1: the map ----------------
  function mapStep(step, o) {
    const box = card();
    const bo = Object.assign({}, o.boardOpts || {}, { flips: st.picks[step] && justPicked ? (st.lastLost || []) : [] });
    box.innerHTML = `<span class="kicker">${o.kicker}</span><div class="split"><div id="left">${HIST_NEWS[step] ? `<p class="news">${HIST_NEWS[step]}</p>` : ""}${board(bo)}</div><div id="right"></div></div>`;
    const right = $("right");
    if (!st.picks[step]) {
      if (o.check && !chk(o.check).done) {
        right.innerHTML = docHtml(o.check);
        mountCheck(right, o.check, () => { render(); scrollToEl($("deck")); });
        return;
      }
      right.innerHTML = (o.check ? solvedHtml(o.check) : "") + (o.before || "");
      if (o.extra) o.extra(right);
      deck(right, step, o.ask);
      return;
    }
    if (o.mid && o.mid(right)) return;
    right.innerHTML = resultHtml(step) + (o.after ? o.after() : "") + reveal(REVEAL[step]);
    nextBtn(right);
  }

  function step1() {
    const picked = !!st.picks[1];
    mapStep(1, {
      kicker: "May 1945 · Europe",
      boardOpts: { drawCurtain: picked && justPicked },
      before: `<ul class="how"><li>💵 Spend 7 tokens wisely</li><li>🔥 Too much force = war</li><li>🟥 Do nothing = countries fall</li></ul>` +
        orlovSays("We won together. Now my army stays in the East."),
      ask: "Your move?",
      after: () => `<div class="doc"><p class="dtag">📄 Winston Churchill · March 5, 1946</p><p class="quote">“An iron curtain has descended across the Continent.”</p></div>`
    });
  }
  function step2() {
    mapStep(2, {
      kicker: "February 1947 · Greece and Turkey",
      before: orlovSays("Greek rebels are winning. Turkey will bend next."),
      check: "c_truman",
      ask: "Your move?"
    });
  }
  function step3() {
    mapStep(3, {
      kicker: "Winter 1947–48 · Western Europe",
      before: orlovSays("Hungry people vote communist. France and Italy are almost mine."),
      check: "c_marshall",
      ask: "Your move?"
    });
  }
  function step4() {
    mapStep(4, {
      kicker: "June 1948 · Berlin",
      before: say("📦", "av gold", "West Berlin", "We're trapped inside the Soviet zone. Every road is blocked. 36 days of food left.") +
        orlovSays("Give me West Berlin, and the food flows again."),
      ask: "Your move?",
      mid: right => {
        if (st.picks[4] !== "airlift" || st.airlift >= 10) return false;
        airliftGame(right); return true;
      }
    });
  }
  function airliftGame(right) {
    right.innerHTML = `<p class="ask">🛩️ Tap the planes to land them!</p>
      <div class="sky" id="sky"><div class="city">🏙️ West Berlin · Tempelhof</div></div>
      <p class="food">📦 <span class="bar"><span id="foodBar" style="width:${st.airlift * 10}%"></span></span> <span id="foodN">${st.airlift}/10</span></p>`;
    const sky = $("sky");
    [[12, 4.2, 0], [52, 5.4, 1.6], [30, 3.6, 2.8]].forEach(([top, dur, delay], i) => {
      const p = document.createElement("button"); p.type = "button"; p.className = "plane"; p.textContent = "✈️";
      p.setAttribute("aria-label", "Land plane");
      p.style.top = top + "px"; p.style.animationDuration = dur + "s"; p.style.animationDelay = delay + "s";
      p.onclick = () => {
        if (st.airlift >= 10) return;
        st.airlift++; save();
        $("foodBar").style.width = st.airlift * 10 + "%"; $("foodN").textContent = st.airlift + "/10";
        p.classList.add("landed");
        setTimeout(() => { p.classList.remove("landed"); p.style.animationDelay = "0s"; }, 350);
        if (st.airlift >= 10) setTimeout(() => { justPicked = true; render(); scrollToEl($("result")); }, 400);
      };
      sky.appendChild(p);
      if (i === 0) setTimeout(() => p.focus({ preventScroll: true }), 50);
    });
  }
  function step5() {
    mapStep(5, {
      kicker: "April 1949 · Washington",
      before: say("🇫🇷", "av us", "Your allies", "Will America really defend us?"),
      check: "c_nato",
      ask: "Make a promise to Europe?"
    });
  }
  function step6() {
    const box = card();
    const f = st.fearParts || { news: 2, lost: 0, war: 0 };
    box.innerHTML = `<span class="kicker">August–October 1949</span>
      <div class="split"><div>${board()}</div><div>
        <div class="banner"><span class="bi">💥</span><span>SOVIETS TEST ATOMIC BOMB<small>August 29, 1949</small></span></div>
        <div class="banner"><span class="bi">🇨🇳</span><span>COMMUNISTS WIN CHINA<small>October 1, 1949</small></span></div>
        <div class="banner"><span class="bi">🇩🇪</span><span>EAST GERMANY GOES COMMUNIST<small>October 7, 1949</small></span></div>
        <div class="fx"><span class="chip bad">😨 +2 news</span>${f.lost ? `<span class="chip bad">${"😨 +" + f.lost + " lost"}</span>` : ""}${f.war ? `<span class="chip bad">${"😨 +" + f.war + " war"}</span>` : ""}</div>
        ${reveal("<b>Red Scare</b>: fear of hidden communists. Some spies were real; most accused weren't.")}
        ${say("📨", "av", "A letter for you", "You worked at State. Now Congress wants you.")}
      </div></div>`;
    nextBtn(box.querySelector(".split > div:last-child"), "🎙️ Go to the hearing →");
  }

  // ---------------- Part 2: the hearing room ----------------
  function fileHtml(id) {
    const F = {
      ruth: ["👩‍💼", "Ruth K. · typist", ["📅 One communist meeting, 1938", "🕵️ Spy proof: none"]],
      leo: ["🎬", "Leo M. · movie writer", ["📅 Left-wing club, 1940", "🕵️ Spy proof: none"]],
      dana: ["🧔", "Dana P. · desk mate", ["✍️ Won't sign the oath", "🕵️ Spy proof: none"]]
    }[id];
    return `<div class="file"><div class="fh"><span class="pf">${F[0]}</span><span>${F[1]}</span></div><ul>${F[2].map(x => `<li>${x}</li>`).join("")}</ul></div>`;
  }
  function tickHtml(step) {
    const t = st.ticks[step] || {};
    return t.snow ? `<p class="tick">${"📌 " + t.snow + " more people named and fired"}</p>` : "";
  }
  function hearing(step, o) {
    const box = card();
    box.innerHTML = `<span class="kicker">${o.kicker}</span><div class="split"><div>${wallHtml()}${o.news ? o.news() : ""}${scene(step)}</div><div id="right"></div></div>`;
    const right = $("right");
    if (!st.picks[step]) {
      if (o.check && !chk(o.check).done) {
        right.innerHTML = tickHtml(step) + (o.doc || "");
        mountCheck(right, o.check, () => { render(); scrollToEl($("deck")); });
        return;
      }
      right.innerHTML = (o.check ? solvedHtml(o.check) : tickHtml(step)) + (o.before ? o.before() : "");
      deck(right, step, o.ask);
      return;
    }
    right.innerHTML = resultHtml(step) + reveal(REVEAL[step]);
    nextBtn(right);
  }
  function scene(step) {
    if (step === 8) return `<div class="scene" aria-hidden="true"><span class="bench"><span class="bf">👩‍⚖️</span>Sen. Smith</span><span class="flash">📸</span><span class="witness"><span class="bf">🧑‍💼</span>You</span></div>`;
    const h = HALE[st.hale] || HALE.hungry;
    return `<div class="scene" aria-hidden="true"><span class="bench"><span class="bf">${h[0]}</span>Rep. Garrity</span><span class="flash">📸</span><span class="mic">🎙️</span><span class="witness"><span class="bf">🧑‍💼</span>You</span></div>`;
  }
  function step7() {
    hearing(7, {
      kicker: "February 1950 · HUAC hearing room",
      news: () => `<div class="banner"><span class="bi">📺</span><span>Sen. Joseph McCarthy: “I have here in my hand a list of 205…”<small>Wheeling, West Virginia · Feb. 9, 1950</small></span></div>`,
      before: () => haleSays("Give me Ruth's name, and you're cleared.") + fileHtml("ruth"),
      ask: "Name names?"
    });
  }
  function step8() {
    hearing(8, {
      kicker: "June 1950 · U.S. Senate",
      doc: `<div class="doc"><p class="dtag">📄 ${CHECKS.c_smith.tag}</p><p class="quote">${CHECKS.c_smith.quote}</p></div>`,
      check: "c_smith",
      before: () => say("📰", "av gray", "Reporter", "Most senators are too scared to agree with her. What do you say?"),
      ask: "Speak up?"
    });
  }
  function step9() {
    hearing(9, {
      kicker: "1951 · HUAC hearing room",
      news: () => `<div class="banner"><span class="bi">🕵️</span><span>REAL SPIES: The Rosenbergs are convicted of spying for the Soviets.<small>1951 · Historians still argue about Ethel's role.</small></span></div>`,
      before: () => haleSays("Spies are real! Name your friend Leo, or you're next.") + fileHtml("leo"),
      ask: "Name names?"
    });
  }
  function step10() {
    hearing(10, {
      kicker: "1953 · Your office",
      before: () => haleSays("Your office now requires a loyalty oath. Dana won't sign. List Dana as a risk.") + fileHtml("dana"),
      ask: "Your call?"
    });
  }
  function step11() {
    const box = card();
    const tv = `<div class="tv"><div class="screen"><span class="live">● LIVE · ARMY–McCARTHY HEARINGS</span>
      <p class="quote">“Have you no sense of decency, sir, at long last?”</p>
      <p class="cite">Joseph Welch, the Army's lawyer, to Sen. McCarthy · June 9, 1954</p></div><div class="knobs"><i></i><i></i></div></div>`;
    box.innerHTML = `<span class="kicker">June 1954 · Your living room</span><div class="split"><div>${tv}${wallHtml()}</div><div id="right"></div></div>`;
    const right = $("right");
    if (!chk("c_welch").done) {
      right.innerHTML = tickHtml(11) + say("📺", "av gray", "On TV", "Millions are watching. McCarthy just attacked a young lawyer from Welch's law firm.");
      mountCheck(right, "c_welch", () => {
        if (!st.tvDrop) { st.tvDrop = true; st.fear = clamp(st.fear - 2, 0, 10); st.hale = "beaten"; save(); }
        render(); scrollToEl($("deck"));
      });
      return;
    }
    if (!st.picks[11]) {
      right.innerHTML = solvedHtml("c_welch") +
        say("🏛️", "av us", "December 1954", "The Senate votes on McCarthy.");
      deck(right, 11, "Your letter to your senator:");
      return;
    }
    right.innerHTML = resultHtml(11) + reveal(REVEAL[11]);
    nextBtn(right, "🏁 See your ending →");
  }

  // ---------------- Ending ----------------
  function abroadId() { return st.war >= 7 ? "war" : st.lost.length >= 1 ? "dom" : "held"; }
  function homeId() { return st.career <= 0 ? (st.named ? "black2" : "black") : st.fear >= 6 ? "witch" : st.named >= 1 ? "saved" : "free"; }
  const ABROAD = {
    held: ["🛡️", "Abroad: no war, no countries lost. That's containment."],
    war: ["🔥", "Abroad: your force pushed the world toward World War III."],
    dom: ["🟥", "Abroad: you lost ground to communism. Containment slipped."]
  };
  const HOME = {
    free: { icon: "🗽", t: "Contained, and Still Free", line: "At home, you named no one and kept your job. The fear faded." },
    saved: { icon: "🎭", t: "Safe, at a Price", line: "You kept your job. Others lost theirs because of names you gave." },
    black: { icon: "🚫", t: "Blacklisted, Not Broken", line: "You named no one and lost your career. Many real Americans paid that price." },
    black2: { icon: "🚫", t: "Blacklisted Anyway", line: "You gave names and still lost your career. Fear spared no one." },
    witch: { icon: "😨", t: "Witch Hunt", line: "Fear ran wild. People lost jobs with no proof." }
  };
  function causedBy() {
    const L = [];
    const P = st.picks;
    L.push(P[1] === "push" ? "🪖 Tried to push Soviets out" : "🧱 Held the line in 1945");
    L.push({ aid: "📜 Aid to Greece, no troops", troops: "🪖 Troops to Greece", out: "🙈 Stayed out of Greece" }[P[2]]);
    L.push({ big: "💰 Marshall Plan rebuilt Europe", loan: "💸 Small loan, Italy lost", none: "🏠 No aid, France and Italy lost" }[P[3]]);
    L.push({ airlift: "🛩️ Airlift fed Berlin", tanks: "🚚 Tanks at Berlin", pull: "🏳️ Gave up West Berlin" }[P[4]]);
    L.push(P[5] === "sign" ? "🤝 Signed NATO" : "🧍 Went it alone");
    L.push(P[7] === "name" ? "📛 Named Ruth" : "✋ Protected Ruth");
    L.push(P[8] === "back" ? "🎤 Backed Smith on record" : "🤐 No comment on Smith");
    L.push(P[9] === "name" ? "📛 Named Leo" : "✋ Protected Leo");
    L.push({ name: "📛 Listed Dana", refuse: "✋ Protected Dana", quiet: "🤐 Stayed quiet about Dana" }[P[10]]);
    return L;
  }
  function step12() {
    const box = card();
    const a = ABROAD[abroadId()], h = HOME[homeId()];
    box.innerHTML = `<div class="ending ${homeId()}"><div class="e-icon">${h.icon}</div><h2>${h.t}</h2>
      <p class="abroad ${abroadId()}">${a[0]} <span>${a[1]}</span></p><p>🏠 <span>${h.line}</span></p>
      <div class="statrow"><span class="chip">🟥 ${st.lost.length}</span><span class="chip">🔥 ${st.war}/10</span><span class="chip">😨 ${st.fear}/10</span><span class="chip">🚫 ${st.jobs}</span><span class="chip">❤️ ${st.career}</span></div></div>
      <div class="caused"><p class="ctag">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>`;
    nextBtn(box, "📝 Write your statement →");
  }

  // ---------------- Report + turn in ----------------
  const PROMPTS = [
    { id: "contain", short: "Containment: the move that did the most", label: "1. Best move to contain communism? Why?",
      stem: "The ___ did the most to contain communism because ___.", go4: "Bonus: how would Stalin see it?", min: 60, newWords: 5,
      mustAll: [["truman", "greece", "turkey", "aid", "marshall", "plan", "airlift", "berlin", "nato", "doctrine", "alliance", "plane", "money", "advisers"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name one U.S. move AND say why (use “because”)." },
    { id: "fear", short: "Red Scare: safer or less free", label: "2. Red Scare: safer, or less free? Why?",
      stem: "Fear of communism made the U.S. ___ because ___.", go4: "Bonus: one point for the other side.", min: 60, newWords: 5,
      mustAll: [["safe", "free"], ["mccarthy", "blacklist", "oath", "loyalty", "rosenberg", "spy", "spies", "proof", "hearing", "fired", "job", "smith", "welch", "name", "huac", "hollywood", "accus", "list", "bomb", "decency"], ["because", "since", "so "]],
      mustMsg: "In answer 2, say safer OR less free, use one fact from today, and say why (use “because”)." }
  ];
  function step13() {
    const box = card();
    const h = HOME[homeId()];
    box.innerHTML = `<p class="mini-end">${h.icon} <b>${h.t}</b></p>
      <div class="report" id="report"><p class="report-tag">📝 Your statement for the record</p></div>`;
    const rep = $("report");
    PROMPTS.forEach(p => {
      rep.insertAdjacentHTML("beforeend", `<label for="w_${p.id}">${p.label}</label><p class="stem">✏️ ${esc(p.stem)}</p><p class="go4">⭐ ${p.go4}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`);
    });
    rep.insertAdjacentHTML("beforeend", `<button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      <p class="turned" id="turnedBadge" ${st.turnedIn ? "" : "hidden"}>✓ Turned in</p>
      <p class="replay" id="replay" ${st.turnedIn ? "" : "hidden"}>🔁 Another ending? Press “Start over” below.</p>`);
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const p of PROMPTS) {
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
      const pv = " " + plain(v) + " ";
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(pv)))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      $("sendBtn").textContent = "Turned in ✓"; $("turnedBadge").hidden = false; $("replay").hidden = false;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  const CHOICE_LABEL = {
    1: ["1945 · Soviet troops in the East", { push: "Push them out (rollback)", hold: "Hold the line (accept it, stop the spread)" }],
    2: ["1947 · Greece and Turkey", { aid: "Aid + advisers (Truman Doctrine)", troops: "U.S. combat troops", out: "Stay out" }],
    3: ["1948 · Rebuilding Europe", { big: "Rebuild big (Marshall Plan)", loan: "Small loan", none: "Keep the money home" }],
    4: ["1948 · Berlin Blockade", { airlift: "Berlin Airlift", tanks: "Send tanks", pull: "Pull out of Berlin" }],
    5: ["1949 · NATO", { sign: "Sign NATO", alone: "Go it alone" }],
    7: ["1950 · Name Ruth?", { name: "Named Ruth", refuse: "Refused to name anyone" }],
    8: ["1950 · Back Margaret Chase Smith?", { back: "Backed Smith on the record", silent: "No comment" }],
    9: ["1951 · Name Leo?", { name: "Named Leo", refuse: "Refused" }],
    10: ["1953 · List Dana?", { name: "Listed Dana as a risk", refuse: "Protected Dana", quiet: "Stayed quiet (Dana fired anyway)" }],
    11: ["1954 · Letter on McCarthy", { condemn: "Censure McCarthy", defend: "Defend McCarthy" }]
  };
  function buildAnswers() {
    const a = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => chk(id).done && !chk(id).wrong).length;
    a["First-try correct"] = right + " of " + CHECK_IDS.length;
    const by = {};
    CHECK_IDS.forEach(id => { const s = CHECKS[id].std; by[s] = by[s] || [0, 0]; by[s][1]++; if (chk(id).done && !chk(id).wrong) by[s][0]++; });
    a["First-try by standard"] = Object.keys(by).sort().map(k => k + ": " + by[k][0] + " of " + by[k][1]).join(" · ");
    CHECK_IDS.forEach(id => {
      const w = chk(id).wrong;
      a[CHECKS[id].short] = CHECKS[id].options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    Object.keys(CHOICE_LABEL).forEach(k => { const [lab, map] = CHOICE_LABEL[k]; a["Choice · " + lab] = st.picks[k] ? map[st.picks[k]] : "—"; });
    a["Ending"] = HOME[homeId()].t + " · " + ABROAD[abroadId()][1];
    a["Caused by"] = causedBy().join(" | ");
    a["Game meters at the end"] = "Countries lost: " + st.lost.length + " · War risk: " + st.war + "/10 · Tokens left: " + st.tokens + " · Fear: " + st.fear + "/10 · Career: " + st.career + "/" + HEARTS + " · Jobs lost: " + st.jobs + " · Names given: " + st.named;
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }

  // ---------------- Render ----------------
  const STEPS = [title, step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11, step12, step13];
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    locked = false;
    hud();
    (STEPS[st.step] || title)();
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; last = {};
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) { $("welcome").textContent = "Welcome back, " + st.name + " — you're on step " + st.step + " of " + TOTAL + "."; $("welcome").hidden = false; }
  render();
})();
