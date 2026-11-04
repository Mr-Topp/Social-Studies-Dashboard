// =====================================================================
//  BOTH SIDES OF THE LINE  (World History · Unit 2 · Day 1 · combined day: Cold War + Containment)
//  Reworked from U.S. History's "The Cold War Desk" (same engine, map, cards, checks, airlift).
//  Part 1 (1945–1947), the Moscow desk: the student is a young aide on the Soviet side at Yalta,
//  Potsdam, and after. Two calls (Germany's factories, Poland's vote) trade 🛡️ "Moscow feels safe"
//  against 🤝 "Ally trust." That trade-off is how allies become enemies. Then the real map: the Iron Curtain.
//  Part 2 (1947–1955), the Washington desk: containment cards on the map of Europe against Orlov.
//  7 budget tokens; force raises War Risk; doing nothing lets countries fall. Broken trust from Part 1
//  starts War Risk higher. Ends with containment going global (Kennan, China, Korea, Warsaw Pact).
//  Ending = Moscow desk result (3) x Washington desk result (3), with a "Caused by" trail.
//  7 evidence checks woven into play. Strict order. Saves on this device.
//  Turn-in: shared/turnin.js classTurnIn, same payload shape as shared/unit-game.js finish().
//  Made up: the player, Orlov, Mr. Price, and the game's what-ifs ("In this game").
//  Real: every quote, date, and number shown (sources in the small gray lines).
// =====================================================================
(function () {
  "use strict";
  const KEY = "wh-u2-d1-cold-war-v1";
  const ASSIGNMENT_ID = "wh-u2-d1-cold-war";
  const TITLE = "World History · Unit 2 · Day 1 · Both Sides of the Line: How Do Allies Become Enemies?";
  const STANDARD = "SS.9-12.WH.34, SS.9-12.WH.35, SS.9-12.WH.37";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, TOTAL = 11, TOKENS = 7, TRUST = 4;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (window.SiteLang ? window.SiteLang.t(s) : s);

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
  const NATO_TILES = ["nor", "uk", "den", "ben", "fra", "ita"];          // 1949 founders on this map
  const NATO_LATER = ["gre", "tur", "wger"];                              // Greece + Turkey 1952, W. Germany 1955
  const WARSAW = ["ussr", "eger", "pol", "cze", "hun", "rom", "bul"];     // Warsaw Pact, May 14, 1955
  const RISK = { 5: ["gre", "tur"], 6: ["fra", "ita"], 7: ["berlin"] };
  // Real history: in 1945 the Soviet army is there ("occ"); one-party communist rule comes later.
  // Poland, Romania, Bulgaria 1946–47; Hungary 1947; Czechoslovakia Feb. 1948; East Germany Oct. 1949.
  const HIST = { 4: ["pol", "rom", "bul"], 5: ["hun"], 6: ["cze"], 9: ["eger"] };
  const HIST_NEWS = { 4: "📰 1946–47: Communists take over Poland, Romania, Bulgaria", 5: "📰 1947: Communists take over Hungary", 6: "📰 Feb. 1948: Communists seize Czechoslovakia", 9: "📰 1949: East Germany becomes communist" };
  const histRed = id => Object.keys(HIST).some(s => +s <= st.step && HIST[s].includes(id));

  // ---------------- State ----------------
  const fresh = () => ({ v: 1, name: "", step: 0, safety: 3, trust: TRUST, price: "calm", startWar: 0,
    tokens: TOKENS, war: 0, lost: [], curtain: false, nato: false, orlov: "calm",
    picks: {}, checks: {}, airlift: 0, ticks: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this device, start that student fresh.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const signedIn = window.classShortName ? window.classShortName(raw) : raw.trim();
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());   // Test T. (teacher): no lockouts / writing rules

  // ---------------- Steps ----------------
  const STEP = [null,
    { year: "1945", t: "1945 · Yalta" },
    { year: "1945", t: "1945 · Germany" },
    { year: "1946", t: "1946 · Poland's Vote" },
    { year: "1947", t: "1947 · The Line" },
    { year: "1947", t: "1947 · Greece and Turkey" },
    { year: "1948", t: "1948 · Hungry Europe" },
    { year: "1948", t: "1948 · Berlin Blockade" },
    { year: "1949", t: "1949 · Two Alliances" },
    { year: "1955", t: "1955 · The Whole World" },
    { year: "1955", t: "Your ending" },
    { year: "1955", t: "Your report" }];
  const part = () => (st.step >= 5 ? 2 : 1);

  // ---------------- Evidence checks (options[0] is right) ----------------
  const ORLOV_AV = ["🧔", "av", "Orlov · Soviet aide"];
  const PRICE_AV = ["👨‍💼", "av us", "Mr. Price · U.S. aide"];
  const CHECKS = {
    c_yalta: { std: "WH.35", short: "Yalta: what Stalin agreed Poland would get",
      tag: "Yalta deal on Poland · February 1945",
      quote: "“…free and unfettered elections as soon as possible on the basis of universal suffrage and secret ballot.”",
      gloss: "unfettered = with nothing holding them back · universal suffrage = all adults can vote",
      who: PRICE_AV, q: "What did Stalin agree Poland would get?",
      options: ["Free, secret votes for all adults", "Secret votes, but only for communists", "Leaders picked by the Soviet army", "A free vote run by Britain and the U.S."],
      hint: "Read the end: who votes, and how?",
      reveal: "Stalin signed a promise: <b>free elections</b> in Poland.",
      unlock: "📌 Promise pinned: free votes in Poland" },
    c_germany: { std: "WH.37", short: "Germany: what it would hand over for war damage",
      tag: "Yalta deal: how Germany pays for war damage · Feb. 1945",
      quote: "“…equipment, machine tools, ships, rolling stock…”",
      gloss: "rolling stock = train cars",
      who: ORLOV_AV, q: "Germany pays for war damage. With what?",
      options: ["Its machines, ships, and trains", "Money borrowed from America", "Its soldiers, sent to fight Japan", "Ships carrying food to Britain"],
      hint: "Read the list. Are those things money, people, or machines?",
      reveal: "<b>Reparations</b> = payment for war damage. The USSR suffered the most damage.",
      unlock: "🏭 Germany's factories are on the table" },
    c_stalin: { std: "WH.37", short: "Stalin's reason: why he wanted friendly neighbors",
      tag: "Stalin answers Churchill · Pravda (Soviet newspaper), March 14, 1946",
      quote: "“The Germans launched the invasion of the USSR through Finland, Poland, Rumania, Bulgaria, and Hungary.”",
      gloss: "Rumania = Romania · WWII dead: USSR about 27 million, U.S. about 400,000",
      who: ORLOV_AV, q: "Why does Stalin want friendly countries next door?",
      options: ["Hitler's army came in that way", "Those countries asked to join the USSR", "He needed their oil to rebuild", "Churchill gave them to him at Yalta"],
      hint: "How did Germany get into the USSR?",
      reveal: "Moscow's view: a <b>buffer zone</b> of friendly countries keeps invaders out.",
      unlock: "🛡️ Moscow's reason: never be invaded again" },
    c_truman: { std: "WH.37", short: "Truman Doctrine: what Truman promised",
      tag: "Truman's speech to Congress · March 12, 1947",
      quote: "“…support free peoples who are resisting attempted subjugation by armed minorities or by outside pressures.”",
      gloss: "subjugation = being taken over",
      who: PRICE_AV, q: "What is Truman promising?",
      options: ["Back countries fighting off a takeover", "Free Eastern Europe by invading the USSR", "Pull U.S. troops out of free countries", "Let armed minorities run their countries"],
      hint: "Who does Truman support, and against what?",
      reveal: "<b>Truman Doctrine</b>: help free countries fight off communist takeovers.",
      unlock: "📜 Truman Doctrine card unlocked" },
    c_marshall: { std: "WH.37", short: "Marshall Plan: what Marshall said it fights",
      tag: "George Marshall, U.S. Secretary of State · June 5, 1947",
      quote: "“Our policy is directed not against any country or doctrine but against hunger, poverty, desperation, and chaos.”",
      gloss: "doctrine = a set of beliefs",
      who: ["📰", "av gray", "Reporter"], q: "What does Marshall say the plan fights?",
      options: ["Hunger and poverty in Europe", "The Soviet Union and Stalin", "The communist doctrine itself", "Chaos caused by Soviet spies"],
      hint: "He lists four things. Are they countries or problems?",
      reveal: "Marshall's idea: <b>hungry, desperate people</b> turn to communism. Fix that first.",
      unlock: "💰 Marshall Plan card unlocked" },
    c_nato: { std: "WH.34", short: "NATO: what Article 5 promises",
      tag: "North Atlantic Treaty, Article 5 · April 4, 1949",
      quote: "“…an armed attack against one or more of them… shall be considered an attack against them all.”",
      gloss: "",
      who: ["🇫🇷", "av us", "Your allies"], q: "What does signing promise?",
      options: ["Defend any member that is attacked", "Defend only the country that got hit", "Let the USSR join the alliance", "Stop sending aid to Europe"],
      hint: "An attack on one counts as an attack on whom?",
      reveal: "<b>NATO</b>: an attack on one member is an attack on all.",
      unlock: "🤝 NATO card unlocked" },
    c_kennan: { std: "WH.34", short: "Kennan: what containment means",
      tag: "George Kennan, U.S. diplomat · July 1947",
      quote: "“…a long-term, patient but firm and vigilant containment of Russian expansive tendencies.”",
      gloss: "vigilant = always watching · expansive tendencies = the urge to spread",
      who: ["🌍", "av gold", "World desk"], q: "What kind of plan is Kennan describing?",
      options: ["Hold them back for as long as it takes", "Win one quick war against the Soviets", "Split the world evenly with Stalin", "Bring all U.S. troops home from Europe"],
      hint: "Look at “long-term” and “patient.” Fast, or slow and steady?",
      reveal: "<b>Containment</b>: don't conquer the USSR. Just keep blocking its spread, year after year.",
      unlock: "🌍 The big idea behind every Washington card" }
  };
  const CHECK_IDS = ["c_yalta", "c_germany", "c_stalin", "c_truman", "c_marshall", "c_nato", "c_kennan"];

  // ---------------- Decisions ----------------
  // chips: [class, text]. cost = tokens (Washington desk). fx applied on pick.
  const D = {
    2: [
      { id: "ship", ic: "🚂", t: "Ship it east", d: "Take the factories home.", chips: [["good", "🛡️ +2"], ["bad", "🤝 −1"]] },
      { id: "leave", ic: "🏭", t: "Leave them", d: "Let Germany rebuild.", chips: [["bad", "🛡️ −1"]] }
    ],
    3: [
      { id: "free", ic: "🗳️", t: "Free vote", d: "Keep the Yalta promise.", chips: [["bad", "🛡️ −1"]] },
      { id: "share", ic: "🤝", t: "Share power", d: "Others vote. We keep the police.", chips: [["good", "🛡️ +1"], ["bad", "🤝 −1"]] },
      { id: "win", ic: "🔒", t: "Make sure we win", d: "Jail the other side.", chips: [["good", "🛡️ +3"], ["bad", "🤝 −2"]] }
    ],
    5: [
      { id: "aid", ic: "📜", t: "Aid + advisers", d: "$400 million, no U.S. troops.", cost: 1, chips: [["cost", "💵 −1"]], unlock: "c_truman" },
      { id: "troops", ic: "🪖", t: "Combat troops", d: "Fight the rebels ourselves.", cost: 2, chips: [["cost", "💵 −2"], ["bad", "🔥 +3"]] },
      { id: "out", ic: "🙈", t: "Stay out", d: "Not our problem.", cost: 0, chips: [["cost", "💵 0"], ["bad", "🟥 ?"]] }
    ],
    6: [
      { id: "big", ic: "💰", t: "Rebuild big", d: "Billions, mostly gifts.", cost: 3, chips: [["cost", "💵 −3"]], unlock: "c_marshall" },
      { id: "loan", ic: "💸", t: "Small loan", d: "Cheap. They pay it back.", cost: 1, chips: [["cost", "💵 −1"], ["bad", "🟥 ?"]] },
      { id: "none", ic: "🏠", t: "Keep it home", d: "Americans need the money.", cost: 0, chips: [["cost", "💵 0"], ["bad", "🟥 ?"]] }
    ],
    7: [
      { id: "airlift", ic: "🛩️", t: "Fly it in", d: "Food and coal by plane.", cost: 2, chips: [["cost", "💵 −2"]] },
      { id: "tanks", ic: "🚚", t: "Send tanks", d: "Force the roads open.", cost: 1, chips: [["cost", "💵 −1"], ["bad", "🔥 +4"]] },
      { id: "pull", ic: "🏳️", t: "Pull out", d: "Give up West Berlin.", cost: 0, chips: [["cost", "💵 0"], ["bad", "🟥 +1"]] }
    ],
    8: [
      { id: "sign", ic: "🤝", t: "Sign NATO", d: "12 nations defend each other.", cost: 1, chips: [["cost", "💵 −1"], ["bad", "🔥 +1"]], unlock: "c_nato" },
      { id: "alone", ic: "🧍", t: "Go it alone", d: "No promises to anyone.", cost: 0, chips: [["cost", "💵 0"], ["bad", "🔥 +2"]] }
    ]
  };
  const airliftCost = () => (st.picks[6] === "big" ? 2 : 3);
  const cardCost = (step, c) => (step === 7 && c.id === "airlift" ? airliftCost() : (c.cost || 0));

  function loseTiles(ids) { st.lastLost = ids; ids.forEach(id => { if (!st.lost.includes(id)) st.lost.push(id); }); }
  function applyPick(step, id) {
    const c = D[step].find(x => x.id === id);
    st.lastLost = [];
    if (step >= 5) st.tokens = clamp(st.tokens - cardCost(step, c), 0, TOKENS);
    if (step === 2) { if (id === "ship") { st.safety += 2; st.trust -= 1; st.price = "worried"; } else { st.safety -= 1; st.price = "pleased"; } }
    if (step === 3) {
      if (id === "free") { st.safety -= 1; st.price = "pleased"; }
      else if (id === "share") { st.safety += 1; st.trust -= 1; st.price = "worried"; }
      else { st.safety += 3; st.trust -= 2; st.price = "angry"; }
    }
    if (step === 5) { if (id === "troops") { st.war += 3; st.orlov = "angry"; } else if (id === "out") { loseTiles(["gre", "tur"]); st.orlov = "smug"; } else st.orlov = "blocked"; }
    if (step === 6) { if (id === "loan") { loseTiles(["ita"]); st.orlov = "smug"; } else if (id === "none") { loseTiles(["fra", "ita"]); st.orlov = "smug"; } else st.orlov = "blocked"; }
    if (step === 7) { if (id === "tanks") { st.war += 4; st.orlov = "angry"; } else if (id === "pull") { loseTiles(["berlin"]); st.orlov = "smug"; } else st.orlov = "nervous"; }
    if (step === 8) { if (id === "sign") { st.war += 1; st.nato = true; st.orlov = "angry"; } else { st.war += 2; st.orlov = "smug"; } }
    st.safety = clamp(st.safety, 0, 10); st.trust = clamp(st.trust, 0, TRUST);
    st.war = clamp(st.war, 0, 10);
  }

  // Things that happen when a step opens (once).
  function onEnter(step) {
    if (st.ticks[step]) return;
    const info = {};
    if (step === 4) { st.curtain = true; info.draw = true; }
    if (step === 5) {
      // Broken trust carries over: the rivalry starts hotter.
      st.startWar = st.trust <= 1 ? 2 : st.trust === 2 ? 1 : 0;
      st.war = clamp(st.war + st.startWar, 0, 10);
    }
    st.ticks[step] = info;
  }

  // ---------------- Results ----------------
  // stamp: [class, text]; line: one sentence; real: small gray line.
  function result(step, id) {
    const R = {
      2: { ship: { stamp: ["warn", "Shipped east"], line: "Whole factories go east by train. Price: “Now Germany can't feed itself.”", real: "Real: the Soviets took apart many factories in their zone and shipped them home." },
           leave: { stamp: ["", "Left to rebuild"], line: "In this game, the factories stay. Orlov: “What if Germany attacks us again?”", real: "Real: the Soviets shipped the factories east." } },
      3: { free: { stamp: ["", "Free vote"], line: "In this game, Poland votes freely and picks leaders Moscow doesn't trust.", real: "Real: the January 1947 vote was rigged. Communists took over." },
           share: { stamp: ["warn", "Shared power"], line: "Communists keep the police and army. Price: “That's not a free country.”", real: "Real: that's how 1945 started. Then the 1947 vote was rigged." },
           win: { stamp: ["bad", "Rigged"], line: "Secret police jail the other side. Communists “win.” Price: “You broke Yalta.”", real: "Real: this is what happened in January 1947." } },
      5: { aid: { stamp: ["", "Held"], line: "Greece's government wins. Turkey stays with the West.", real: "Real: Congress approved $400 million in 1947." },
           troops: { stamp: ["warn", "Held, barely"], line: "The rebels lose, but Orlov rushes troops to the border.", real: "Real: Truman sent aid and advisers, not combat troops." },
           out: { stamp: ["bad", "Lost"], line: "In this game, Greece and Turkey fall to communism.", real: "Real: Truman sent $400 million in aid instead." } },
      6: { big: { stamp: ["", "Rebuilt"], line: "Factories restart. Communist votes drop. Orlov bans the East from taking the aid.", real: "Real: about $13 billion, 1948–1952." },
           loan: { stamp: ["bad", "Lost"], line: "Not enough. In this game, Italy votes communist.", real: "Real: the U.S. gave about $13 billion, mostly gifts." },
           none: { stamp: ["bad", "Lost"], line: "In this game, France and Italy turn communist.", real: "Real: the U.S. gave about $13 billion, mostly gifts." } },
      7: { airlift: { stamp: ["", "Berlin fed"], line: "Planes land for almost a year. Stalin lifts the blockade in May 1949.", real: "Real: 2.3 million tons of food and coal flown in." },
           tanks: { stamp: ["warn", "Standoff"], line: "Orlov rolls out tanks too. The world holds its breath.", real: "Real: Truman chose planes, not tanks." },
           pull: { stamp: ["bad", "Lost"], line: "In this game, West Berlin goes communist.", real: "Real: Truman refused to give up Berlin." } },
      8: { sign: { stamp: ["", "Alliance"], line: "12 nations sign. Orlov: “Then we need our own alliance.”", real: "Real: the Soviets formed the Warsaw Pact in 1955, after West Germany joined NATO." },
           alone: { stamp: ["warn", "Alone"], line: "Orlov tests you everywhere. Your allies feel alone.", real: "Real: the U.S. signed NATO on April 4, 1949." } }
    };
    return R[step][id];
  }
  const REVEAL = {
    1: "<b>Yalta</b>: the Big Three planned Europe after the war. They split Germany into zones for now.",
    2: "<b>Two goals clash</b>: Moscow wanted Germany weak. Washington wanted Germany working.",
    3: "<b>Two systems</b>: democracy = many parties, free votes. Soviet communism = one party, secret police.",
    4: "<b>Iron Curtain</b>: the line between the free West and the Soviet-controlled East.",
    5: "<b>Containment</b>: stop communism from spreading to new countries.",
    6: "<b>Marshall Plan</b>: U.S. money rebuilt Western Europe, so communism lost its pull.",
    7: "<b>Berlin Airlift</b>: planes fed West Berlin, and no one fired a shot.",
    8: "<b>Cold War</b>: two armed sides that never fought each other directly."
  };

  // ---------------- HUD ----------------
  const ORLOV = { calm: ["🙂", "Watching"], smug: ["😏", "Smug"], angry: ["😠", "Furious"], blocked: ["😤", "Blocked"], nervous: ["😬", "Nervous"] };
  const PRICE = { calm: ["🙂", "Watching"], pleased: ["😊", "Hopeful"], worried: ["😟", "Worried"], angry: ["😠", "Angry"] };
  let last = {};
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    document.body.classList.toggle("home", on && part() === 1);
    if (!on) return;
    const date = `<div class="date"><span>YEAR</span><b>${STEP[st.step].year}</b></div>`;
    let h;
    if (part() === 1) {
      const hearts = Array.from({ length: TRUST }, (_, i) => `<i class="${i >= st.trust ? "gone" : ""}">🤝</i>`).join("");
      const p = PRICE[st.price] || PRICE.calm;
      h = date + `<span class="hm" title="Your desk"><span class="ic">☭</span><span class="lbl">Moscow desk</span></span>
        <span class="hm" id="mSafe"><span class="ic">🛡️</span><span class="lbl">Moscow feels safe</span><span class="bar"><span id="safeBar" style="width:${st.safety * 10}%"></span></span><b>${st.safety}/10</b></span>
        <span class="hm" id="mTrust"><span class="lbl">Ally trust</span><span class="hearts" aria-label="Ally trust ${st.trust} of ${TRUST}">${hearts}</span></span>
        <span class="steppill">${"Step " + st.step + " of " + TOTAL}</span>
        <span class="rival" id="rival"><span class="face">${p[0]}</span><span><b>Mr. Price</b><small>${p[1]}</small></span></span>`;
    } else {
      const toks = Array.from({ length: TOKENS }, (_, i) => `<i class="${i >= st.tokens ? "spent" : ""}">💵</i>`).join("");
      const o = ORLOV[st.orlov] || ORLOV.calm;
      h = date + `<span class="hm" id="mTok" title="Budget"><span class="tok" aria-label="Budget tokens">${toks}</span><b>${st.tokens}</b></span>
        <span class="hm" id="mWar"><span class="ic">🔥</span><span class="lbl">War risk</span><span class="bar"><span id="warBar" style="width:${st.war * 10}%"></span></span><b>${st.war}/10</b></span>
        <span class="hm" id="mLost"><span class="ic">🟥</span><span class="lbl">Countries lost</span><b>${st.lost.length}</b></span>
        <span class="steppill">${"Step " + st.step + " of " + TOTAL}</span>
        <span class="rival" id="rival"><span class="face">${o[0]}</span><span><b>Orlov</b><small>${o[1]}</small></span></span>`;
    }
    $("hudIn").innerHTML = h;
    const now = { tok: st.tokens, war: st.war, lost: st.lost.length, safe: st.safety, trust: st.trust, rival: st.orlov + st.price };
    [["tok", "mTok"], ["war", "mWar"], ["lost", "mLost"], ["safe", "mSafe"], ["trust", "mTrust"], ["rival", "rival"]].forEach(([k, el]) => {
      if (last[k] != null && last[k] !== now[k] && $(el)) $(el).classList.add(k === "rival" ? "react" : "bump");
    });
    last = now;
  }

  // ---------------- Shared pieces ----------------
  const app = $("app");
  let locked = false, justSolved = null, justPicked = false;
  const say = (av, cls, who, text) => `<div class="say"><span class="${cls}">${av}</span><p class="bub"><small>${who}</small>${text}</p></div>`;
  const orlovSays = text => say(ORLOV_AV[0], ORLOV_AV[1], ORLOV_AV[2], text);
  const priceSays = text => say(PRICE_AV[0], PRICE_AV[1], PRICE_AV[2], text);
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
    const pre49 = st.step < 9, pact = st.step >= 9;
    const tiles = TILES.map(([id, c, r, cs, rs, full, code, start]) => {
      const lost = st.lost.includes(id);
      if (start === "occ" && histRed(id)) start = "red";
      if (pre49 && id === "wger") { full = "Germany (West)"; code = "GER-W"; }
      if (pre49 && id === "eger") { full = "Germany (Soviet)"; code = "GER-E"; }
      const cls = ["tile", lost ? "lost" : start, risk.includes(id) ? "risk" : "", flips.includes(id) ? "flip" : "", id === "ussr" ? "ussr" : "", id === "eger" ? "has-berlin" : ""].join(" ");
      const inNato = st.nato && !lost && (NATO_TILES.includes(id) || (pact && NATO_LATER.includes(id)));
      const badge = inNato ? `<span class="badge">🛡️</span>` : pact && WARSAW.includes(id) ? `<span class="badge">⭐</span>` : "";
      const berlin = id === "eger" ? `<span class="berlin ${st.lost.includes("berlin") ? "lost" : ""} ${risk.includes("berlin") ? "risk" : ""}">${st.lost.includes("berlin") ? "🟥" : "🏙️"}<span class="bl"> W. Berlin</span></span>` : "";
      return `<div class="${cls}" style="grid-column:${c} / span ${cs};grid-row:${r} / span ${rs}"><span class="full">${full}</span><span class="code">${code}</span>${badge}${berlin}</div>`;
    }).join("") + `<div class="tile usa" style="grid-column:1 / span 1;grid-row:2 / span 3"><span>🇺🇸</span><span class="full">U.S.</span><span class="code">U.S.</span><span class="sub">→</span></div>`;
    const curtain = st.curtain ? `<svg class="curtain ${opts.drawCurtain ? "draw" : ""}" viewBox="0 0 8 6" preserveAspectRatio="none" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M4,0.1 L4,4 L6,4 L6,5 L7,5 L7,4 L8,4"/></svg>` : "";
    return `<div class="board" aria-label="Map of Europe"><div class="grid">${tiles}${curtain}</div>
      <div class="legend"><span><i class="sw f"></i>Free elections, many parties</span><span><i class="sw o"></i>🪖 Soviet army there</span><span><i class="sw r"></i>Communist, one-party rule</span>${st.curtain ? "<span>▬ Iron Curtain</span>" : ""}${st.nato ? "<span>🛡️ NATO</span>" : ""}${pact ? "<span>⭐ Warsaw Pact</span>" : ""}</div></div>`;
  }

  // Part 1: the promises board (Yalta promises, stamped KEPT or BROKEN as time goes on).
  function promisesHtml() {
    const s = st.step;
    const vote = s >= 4 ? "broken" : st.picks[3] ? (st.picks[3] === "free" ? "kept" : "broken") : s === 3 ? "cur" : "";
    const pins = [
      { id: "vote", f: "🗳️", n: "Free votes in Poland", sub: s >= 4 ? "Real: rigged, 1947" : st.picks[3] === "free" ? "In this game" : "Yalta promise", st: vote },
      { id: "zones", f: "🇩🇪", n: "Germany in 4 zones", sub: "Yalta plan", st: s === 2 ? "cur" : "" },
      { id: "japan", f: "⚔️", n: "USSR fights Japan", sub: s >= 3 ? "Aug. 8, 1945" : "Yalta promise", st: s >= 3 ? "kept" : "" },
      { id: "un", f: "🌐", n: "Join the United Nations", sub: s >= 3 ? "Oct. 1945" : "Yalta promise", st: s >= 3 ? "kept" : "" }
    ];
    const fresh = s === 1 && !st.ticks.pinsSeen;
    if (fresh) { st.ticks.pinsSeen = true; save(); }
    return `<p class="news">📌 Yalta promises</p><div class="wall" aria-label="Yalta promises board">${pins.map(p =>
      `<div class="pin ${p.st} ${fresh ? "new" : ""}"><span class="pf">${p.f}</span>${p.n}<span class="ps">${p.sub}</span></div>`).join("")}</div>`;
  }
  function tableScene(step) {
    const seats = {
      1: [["🇺🇸", "Roosevelt"], ["🇬🇧", "Churchill"], ["☭", "Stalin"]],
      2: [["🇺🇸", "Truman"], ["🇬🇧", "Britain"], ["☭", "Stalin"]],
      3: [["📰", "Pravda"], ["☭", "Stalin"], ["🇵🇱", "Poland"]]
    }[step] || [];
    return `<div class="scene" aria-hidden="true">${seats.map(([f, n]) => `<span class="bench"><span class="bf">${f}</span>${n}</span>`).join("")}<span class="witness"><span class="bf">🧑</span>You</span></div>`;
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
          let left = isTestT() ? 0 : LOCK;
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
      const chips = step === 7 && c.id === "airlift" ? [["cost", "💵 −" + cost]] : c.chips;
      const broke = step >= 5 && cost > st.tokens;
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
        <h1>Both Sides of the Line</h1>
        <p class="hook">1945: three allies win a war. By 1949, they're enemies.</p>
        <ul class="facts"><li>☭ Sit at Moscow's desk</li><li>🇺🇸 Then switch to Washington's</li><li>🗺️ Stop the spread without a war</li><li>🔎 7 quick checks · 🏁 many endings · 25 min</li></ul>
        <p class="goal">🎯 <b>Goal:</b> explain how allies became enemies, and what containment was.</p>
        <label for="nameBox">Name (like Jordan M.)</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="Jordan M." value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Take the Moscow desk →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        <div class="vsbox"><div class="who red"><span class="big">☭</span><b>Desk 1</b><small>Moscow · with Orlov</small></div><div class="vs">VS</div><div class="who"><span class="big">🇺🇸</span><b>Desk 2</b><small>Washington · with Mr. Price</small></div></div>
        <p class="ticker">📺 1945 → 1955</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; onEnter(1); save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Part 1: the Moscow desk ----------------
  function tableStep(step, o) {
    const box = card();
    box.innerHTML = `<span class="kicker">${o.kicker}</span><div class="split"><div id="left">${tableScene(step)}${promisesHtml()}</div><div id="right"></div></div>`;
    const right = $("right");
    if (!chk(o.check).done) {
      right.innerHTML = (o.intro || "") + docHtml(o.check);
      mountCheck(right, o.check, () => { render(); scrollToEl($("deck") || $("nextBtn")); });
      return;
    }
    if (!D[step]) {
      right.innerHTML = solvedHtml(o.check) + reveal(REVEAL[step]);
      nextBtn(right);
      return;
    }
    if (!st.picks[step]) {
      right.innerHTML = solvedHtml(o.check) + (o.before || "");
      deck(right, step, o.ask);
      return;
    }
    right.innerHTML = resultHtml(step) + reveal(REVEAL[step]);
    nextBtn(right);
  }
  function step1() {
    tableStep(1, {
      kicker: "February 1945 · Yalta · Moscow desk",
      intro: `<p class="bridge">☭ You're a young aide for the Soviet Union (USSR).</p>` +
        orlovSays("We beat Hitler together! Now we plan Europe.") + priceSays("First, Poland."),
      check: "c_yalta"
    });
  }
  function step2() {
    tableStep(2, {
      kicker: "July 1945 · Potsdam, Germany",
      intro: priceSays("Truman leads us now. Roosevelt died in April."),
      check: "c_germany",
      before: orlovSays("Germany wrecked our country. Make it pay.") + priceSays("If Germany starves, all of Europe suffers."),
      ask: "Factories in our zone?"
    });
  }
  function step3() {
    tableStep(3, {
      kicker: "March 1946 · Moscow",
      intro: orlovSays("Churchill just called our side an “iron curtain.” Stalin answers in the paper today."),
      check: "c_stalin",
      before: `<div class="twoview"><div class="tv-m"><b>☭ Moscow sees</b>A shield against invasion</div><div class="tv-w"><b>🇺🇸 Washington sees</b>A broken promise</div></div>`,
      ask: "Poland votes soon. Your advice?"
    });
  }
  function step4() {
    const box = card();
    const draw = !!(st.ticks[4] && st.ticks[4].draw);
    if (draw) { st.ticks[4].draw = false; save(); }
    const P = st.picks;
    const yourG = { ship: "Shipped east", leave: "Left them" }[P[2]] || "—";
    const yourP = { free: "Free vote", share: "Shared power", win: "Made sure we won" }[P[3]] || "—";
    box.innerHTML = `<span class="kicker">1946–1947 · Europe splits</span>
      <div class="split"><div>${HIST_NEWS[4] ? `<p class="news">${HIST_NEWS[4]}</p>` : ""}${board({ drawCurtain: draw })}</div><div id="right">
        <div class="doc"><p class="dtag">📄 Winston Churchill · Fulton, Missouri · March 5, 1946</p><p class="quote">“From Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent.”</p><p class="gloss">Stettin and Trieste = cities at the top and bottom of the line</p></div>
        <table class="cmp"><tr><th>Your Moscow desk</th><th>You chose</th><th>Real history</th></tr>
          <tr><td>🏭 Germany</td><td>${yourG}</td><td>Shipped east</td></tr>
          <tr><td>🗳️ Poland</td><td>${yourP}</td><td>Rigged, 1947</td></tr></table>
        ${reveal(REVEAL[4])}
        ${reveal("<b>Allies → enemies</b>: each side's move to feel safe looked like a threat to the other.")}
      </div></div>`;
    nextBtn($("right"), "🔁 Switch desks: go to Washington →");
  }

  // ---------------- Part 2: the Washington desk (map) ----------------
  function mapStep(step, o) {
    const box = card();
    const bo = Object.assign({}, o.boardOpts || {}, { flips: st.picks[step] && justPicked ? (st.lastLost || []) : [] });
    box.innerHTML = `<span class="kicker">${o.kicker}</span><div class="split"><div id="left">${HIST_NEWS[step] ? `<p class="news">${HIST_NEWS[step]}</p>` : ""}${board(bo)}</div><div id="right"></div></div>`;
    const right = $("right");
    if (!st.picks[step]) {
      if (o.check && !chk(o.check).done) {
        right.innerHTML = (o.intro || "") + docHtml(o.check);
        mountCheck(right, o.check, () => { render(); scrollToEl($("deck")); });
        return;
      }
      right.innerHTML = (o.check ? solvedHtml(o.check) : "") + (o.before || "");
      deck(right, step, o.ask);
      return;
    }
    if (o.mid && o.mid(right)) return;
    right.innerHTML = resultHtml(step) + (o.after ? o.after() : "") + reveal(REVEAL[step]);
    nextBtn(right);
  }

  function step5() {
    const carry = st.startWar ? `<div class="fx"><span class="chip bad">🔥 +${st.startWar} broken trust from 1945–46</span></div>` : "";
    mapStep(5, {
      kicker: "February 1947 · Greece and Turkey · Washington desk",
      intro: `<p class="bridge">🇺🇸 New desk. Now you work for Washington.</p>` + carry +
        `<ul class="how"><li>💵 Spend 7 tokens wisely</li><li>🔥 Too much force = war</li><li>🟥 Do nothing = countries fall</li></ul>` +
        orlovSays("Greek rebels are winning. Turkey will bend next."),
      check: "c_truman",
      ask: "Your move?"
    });
  }
  function step6() {
    mapStep(6, {
      kicker: "Winter 1947–48 · Western Europe",
      intro: orlovSays("Hungry people vote communist. France and Italy are almost ours."),
      check: "c_marshall",
      ask: "Your move?",
      after: () => st.picks[6] === "big" ? orlovSays("Moscow calls it a U.S. trap. We'll build our own aid club.") + `<p class="real">Real: the Soviets kept the East out and started Comecon, their own aid club, Jan. 1949.</p>` : ""
    });
  }
  function step7() {
    mapStep(7, {
      kicker: "June 1948 · Berlin",
      before: orlovSays("Your new German money splits Germany for good. So we close the roads.") +
        say("📦", "av gold", "West Berlin", "We're trapped inside the Soviet zone. 36 days of food left.") +
        `<p class="real">Real: the West brought in a new money, the Deutsche Mark, in June 1948.</p>`,
      ask: "Your move?",
      mid: right => {
        if (st.picks[7] !== "airlift" || st.airlift >= 10) return false;
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
  function step8() {
    mapStep(8, {
      kicker: "April 1949 · Two alliances",
      intro: say("🇫🇷", "av us", "Your allies", "Will America really defend us?"),
      check: "c_nato",
      ask: "Make a promise to Europe?"
    });
  }
  function step9() {
    const box = card();
    box.innerHTML = `<span class="kicker">1949–1955 · The whole world</span>
      <div class="split"><div>${HIST_NEWS[9] ? `<p class="news">${HIST_NEWS[9]}</p>` : ""}${board()}</div><div id="right"></div></div>`;
    const right = $("right");
    const banners = `<div class="banner"><span class="bi">💥</span><span>SOVIETS TEST AN ATOMIC BOMB<small>August 29, 1949</small></span></div>
      <div class="banner"><span class="bi">🇨🇳</span><span>COMMUNISTS WIN CHINA<small>October 1, 1949</small></span></div>
      <div class="banner"><span class="bi">🇰🇷</span><span>WAR IN KOREA<small>June 25, 1950</small></span></div>`;
    if (!chk("c_kennan").done) {
      right.innerHTML = banners + docHtml("c_kennan");
      mountCheck(right, "c_kennan", () => { render(); scrollToEl($("nextBtn")); });
      return;
    }
    right.innerHTML = solvedHtml("c_kennan") +
      `<p class="ask">🌍 Containment goes global</p>
      <div class="globe"><span>🇬🇷 Greece 1947</span><span>🇩🇪 Berlin 1948</span><span>🇰🇷 Korea 1950</span><span class="next">🇻🇳 Vietnam: later this unit</span></div>
      <div class="twoview"><div class="tv-m"><b>⭐ Warsaw Pact, 1955</b>Moscow's alliance in the East</div><div class="tv-w"><b>🛡️ NATO, 1949</b>Washington's alliance in the West</div></div>`;
    nextBtn(right, "🏁 See your ending →");
  }

  // ---------------- Ending ----------------
  function moscowId() { return st.trust >= 4 ? "open" : st.trust >= 2 ? "cracked" : "curtain"; }
  function abroadId() { return st.war >= 7 ? "war" : st.lost.length >= 1 ? "dom" : "held"; }
  const MOSCOW = {
    open: ["🚪", "Moscow desk: you kept trust, but Moscow felt less safe. (Real: Stalin chose control.)"],
    cracked: ["⚖️", "Moscow desk: you mixed safety and promises. Trust cracked."],
    curtain: ["🧱", "Moscow desk: Moscow felt safe. The West saw a takeover. Trust broke, like real history."]
  };
  const WASH = {
    held: { icon: "🛡️", t: "Contained, With No War", line: "Washington desk: no war, no countries lost. That's containment." },
    war: { icon: "🔥", t: "One Spark From World War III", line: "Washington desk: your force pushed the world toward war." },
    dom: { icon: "🟥", t: "The Spread Gains Ground", line: "Washington desk: you lost ground to communism. Containment slipped." }
  };
  function causedBy() {
    const P = st.picks;
    return [
      { ship: "🚂 Shipped German factories east", leave: "🏭 Left Germany's factories" }[P[2]],
      { free: "🗳️ Free vote in Poland", share: "🤝 Shared power in Poland", win: "🔒 Rigged Poland's vote" }[P[3]],
      { aid: "📜 Aid to Greece, no troops", troops: "🪖 Troops to Greece", out: "🙈 Stayed out of Greece" }[P[5]],
      { big: "💰 Marshall Plan rebuilt Europe", loan: "💸 Small loan, Italy lost", none: "🏠 No aid, France and Italy lost" }[P[6]],
      { airlift: "🛩️ Airlift fed Berlin", tanks: "🚚 Tanks at Berlin", pull: "🏳️ Gave up West Berlin" }[P[7]],
      P[8] === "sign" ? "🤝 Signed NATO" : "🧍 Went it alone"
    ].filter(Boolean);
  }
  function step10() {
    const box = card();
    const m = MOSCOW[moscowId()], w = WASH[abroadId()];
    box.innerHTML = `<div class="ending ${abroadId()}"><div class="e-icon">${w.icon}</div><h2>${w.t}</h2>
      <p class="abroad moscow">${m[0]} <span>${m[1]}</span></p>
      <p class="abroad ${abroadId()}">🇺🇸 <span>${w.line}</span></p>
      <div class="statrow"><span class="chip">🛡️ ${st.safety}/10</span><span class="chip">🤝 ${st.trust}/${TRUST}</span><span class="chip">🟥 ${st.lost.length}</span><span class="chip">🔥 ${st.war}/10</span></div></div>
      <div class="caused"><p class="ctag">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>`;
    nextBtn(box, "📝 Write your report →");
  }

  // ---------------- Report + turn in ----------------
  const PROMPTS = [
    { id: "split", short: "Allies to enemies: both sides", label: "1. Why did the allies become enemies? Give BOTH sides.",
      stem: "The Soviets wanted ___ because ___. The U.S. feared ___.", go4: "Bonus: was one side more to blame? Why?", min: 60, newWords: 5,
      mustAll: [["safe", "secur", "invad", "invasion", "attack", "germany", "german", "buffer", "loyal", "friendly", "border", "protect", "million", "losses", "shield", "neighbor"],
        ["communis", "spread", "election", "vote", "free", "takeover", "take over", "control", "iron curtain", "poland", "promise", "democra", "rigged"]],
      mustMsg: "In answer 1, give the Soviet side (like safety from invasion) AND the U.S. side (like fear of communism spreading)." },
    { id: "contain", short: "Containment: what it was and what worked", label: "2. What was containment? Which move worked best? Why?",
      stem: "Containment meant ___. The ___ worked best because ___.", go4: "Bonus: how did the Soviets answer that move?", min: 60, newWords: 5,
      mustAll: [["stop", "block", "spread", "contain", "keep", "limit"],
        ["truman", "greece", "turkey", "aid", "marshall", "airlift", "berlin", "nato", "doctrine", "alliance", "plane", "money", "advisers"],
        ["because", "since", "so "]],
      mustMsg: "In answer 2, say what containment means, name one move (like the Marshall Plan or NATO), and say why (use “because”)." }
  ];
  function step11() {
    const box = card();
    const w = WASH[abroadId()];
    box.innerHTML = `<p class="mini-end">${w.icon} <b>${w.t}</b></p>
      <div class="report" id="report"><p class="report-tag">📝 Your report from both desks</p></div>`;
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
    for (const p of (isTestT() ? [] : PROMPTS)) {   // Test T. (teacher) skips the writing rules
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
    2: ["1945 · Moscow desk: Germany's factories", { ship: "Ship them to the USSR", leave: "Leave them so Germany can rebuild" }],
    3: ["1946 · Moscow desk: Poland's vote", { free: "Free vote (keep the Yalta promise)", share: "Share power, keep the police", win: "Make sure communists win (rigged)" }],
    5: ["1947 · Greece and Turkey", { aid: "Aid + advisers (Truman Doctrine)", troops: "U.S. combat troops", out: "Stay out" }],
    6: ["1948 · Rebuilding Europe", { big: "Rebuild big (Marshall Plan)", loan: "Small loan", none: "Keep the money home" }],
    7: ["1948 · Berlin Blockade", { airlift: "Berlin Airlift", tanks: "Send tanks", pull: "Pull out of Berlin" }],
    8: ["1949 · NATO", { sign: "Sign NATO", alone: "Go it alone" }]
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
    a["Ending"] = WASH[abroadId()].t + " · " + MOSCOW[moscowId()][1];
    a["Caused by"] = causedBy().join(" | ");
    a["Game meters at the end"] = "Moscow feels safe: " + st.safety + "/10 · Ally trust: " + st.trust + "/" + TRUST + " · Countries lost: " + st.lost.length + " · War risk: " + st.war + "/10 · Tokens left: " + st.tokens;
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }

  // ---------------- Render ----------------
  const STEPS = [title, step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11];
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

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen (steps 1–11) or answer the current check/call.
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step - 1, TOTAL - 1)),
      label: i => STEP[i + 1].t,
      go: i => {
        if (!st.name) st.name = "Test T.";
        st.step = i + 1;
        for (let k = 1; k <= st.step; k++) onEnter(k);   // map/meter setup that normally happens on the way
        save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const s = st.step;
        const ids = { 1: "c_yalta", 2: "c_germany", 3: "c_stalin", 5: "c_truman", 6: "c_marshall", 8: "c_nato", 9: "c_kennan" };
        if (ids[s] && !chk(ids[s]).done && !st.picks[s]) { chk(ids[s]).done = true; justSolved = ids[s]; save(); render(); return; }
        if (D[s] && !st.picks[s]) { const b = document.querySelector("#deck .dcard:not([disabled])"); if (b) b.click(); return; }
        if (s === 7 && st.picks[7] === "airlift" && st.airlift < 10) { st.airlift = 10; justPicked = true; save(); render(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
