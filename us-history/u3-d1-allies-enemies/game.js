// =====================================================================
//  THE COLD WAR DESK  (U.S. History · Unit 3 · Day 1 · containment only)
//  1945–1949: you're a young State Department aide moving containment cards on a map of
//  Europe against Orlov, a made-up Soviet counterpart. 9 budget tokens; force raises War Risk;
//  doing nothing lets countries fall. The historical path (aid, Marshall Plan, airlift, NATO)
//  costs 7 tokens, so one forceful mistake still leaves room for the later moves.
//  8 steps: 5 moves, "1949 · Two Shocks", the ending, one writing answer + turn in.
//  3 endings: Contained, No War / On the Brink (war risk 7+) / The Spread (any country lost),
//  with a "Caused by" trail. 3 evidence checks woven into play. Strict order. Saves on this device.
//  Turn-in: shared/turnin.js classTurnIn, same payload shape as shared/unit-game.js finish().
//  Made up: the player, Orlov, and the game's what-ifs.
//  Real: every quote, date, and number shown (sources in the small gray lines).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u3-d1-allies-enemies-v3";
  const ASSIGNMENT_ID = "ush-u3-d1-allies-enemies";
  const TITLE = "U.S. History · Unit 3 · Day 1 · The Cold War Desk";
  const STANDARD = "SS.9-12.US.37";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, TOTAL = 8, TOKENS = 9;

  const $ = id => document.getElementById(id);
  const isT = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };   // Test T. (teacher preview)
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
  const fresh = () => ({ v: 3, name: "", step: 0, tokens: TOKENS, war: 0, lost: [], curtain: false, nato: false, orlov: "calm",
    picks: {}, checks: {}, airlift: 0, ticks: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 3) st = fresh();
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
    { year: "1949", t: "Your ending" },
    { year: "1949", t: "Your report" }];

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
  };
  const CHECK_IDS = ["c_truman", "c_marshall", "c_nato"];

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
  };
  const cardCost = (step, c) => c.cost || 0;   // Berlin Airlift is always 2

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
  }

  // Things that happen when a step opens (once).
  function onEnter(step) {
    if (st.ticks[step]) return;
    const info = {};
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
    };
    return R[step][id];
  }
  const REVEAL = {
    1: "<b>Iron Curtain</b>: the line between the free West and communist East.",
    2: "<b>Containment</b>: stop communism from spreading to new countries.",
    3: "<b>Marshall Plan</b>: U.S. money rebuilt Western Europe, so communism lost its pull.",
    4: "<b>Berlin Airlift</b>: planes fed West Berlin, and no one fired a shot.",
    5: "<b>Cold War</b>: two armed camps that never fought each other directly.",
  };

  // ---------------- HUD ----------------
  const ORLOV = { calm: ["🙂", "Watching"], smug: ["😏", "Smug"], angry: ["😠", "Furious"], blocked: ["😤", "Blocked"], nervous: ["😬", "Nervous"] };
  let last = {};
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const date = `<div class="date"><span>YEAR</span><b>${STEP[st.step].year}</b></div>`;
    const toks = Array.from({ length: TOKENS }, (_, i) => `<i class="${i >= st.tokens ? "spent" : ""}">💵</i>`).join("");
    const o = ORLOV[st.orlov] || ORLOV.calm;
    $("hudIn").innerHTML = date + `<span class="hm" id="mTok" title="Budget"><span class="tok" aria-label="Budget tokens">${toks}</span><b>${st.tokens}</b></span>
      <span class="hm" id="mWar"><span class="ic">🔥</span><span class="lbl">War risk</span><span class="bar"><span id="warBar" style="width:${st.war * 10}%"></span></span><b>${st.war}/10</b></span>
      <span class="hm" id="mLost"><span class="ic">🟥</span><span class="lbl">Countries lost</span><b>${st.lost.length}</b></span>
      <span class="steppill">${"Step " + st.step + " of " + TOTAL}</span>
      <span class="rival" id="rival"><span class="face">${o[0]}</span><span><b>Orlov</b><small>${o[1]}</small></span></span>`;
    const now = { tok: st.tokens, war: st.war, lost: st.lost.length, rival: st.orlov };
    [["tok", "mTok"], ["war", "mWar"], ["lost", "mLost"], ["rival", "rival"]].forEach(([k, el]) => {
      if (last[k] != null && last[k] !== now[k] && $(el)) $(el).classList.add(k === "rival" ? "react" : "bump");
    });
    last = now;
  }

  // ---------------- Shared pieces ----------------
  const app = $("app");
  let locked = false, justSolved = null, justPicked = false;
  const say = (av, cls, who, text) => `<div class="say"><span class="${cls}">${av}</span><p class="bub"><small>${who}</small>${text}</p></div>`;
  const orlovSays = text => say("😏", "av", "Orlov", text);
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


  // An evidence check on a document/screen. def.options[0] is right.
  function mountCheck(box, id, onRight) {
    const def = CHECKS[id], c = chk(id);
    if (c.done) return;
    const wrap = document.createElement("div"); wrap.className = "check"; wrap.id = "check";
    wrap.innerHTML = say(def.who[0], def.who[1], def.who[2], `<span class="check-tag">🔎 Evidence check</span><br>${def.q}`);
    const area = document.createElement("div"); area.className = "opts";
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    let lastOrder = "";
    function draw() {
      area.replaceChildren();
      // Wrong answers always come back in a NEW order (never the same order twice in a row).
      let order, key, tries = 0;
      do { order = shuffle(def.options.map((t, n) => ({ t, n }))); key = order.map(o => o.n).join(""); } while (key === lastOrder && ++tries < 50);
      lastOrder = key;
      order.forEach(o => {
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
          let left = isT() ? 0 : LOCK;   // Test T. skips the wrong-answer wait
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
      const chips = c.chips;
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
        <ul class="facts"><li>🗺️ Out-move the Soviets</li><li>🏁 3 endings · 15 min</li></ul>
        <p class="goal">🎯 <b>Goal:</b> explain how the U.S. tried to contain communism.</p>
        <label for="nameBox">Name (like Jordan M.)</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="Jordan M." value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Take your desk →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        <div class="vsbox"><div class="who"><span class="big">🧑‍💼</span><b>You</b><small>🇺🇸</small></div><div class="vs">VS</div><div class="who red"><span class="big">😏</span><b>Orlov</b><small>☭</small></div></div>
        <p class="ticker">📺 1945 → 1949</p>
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
      before: `<ul class="how"><li>💵 Spend 9 tokens wisely</li><li>🔥 Too much force = war</li><li>🟥 Do nothing = countries fall</li></ul>` +
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
    box.innerHTML = `<span class="kicker">August–October 1949</span>
      <div class="split"><div>${board()}</div><div>
        <div class="banner"><span class="bi">💥</span><span>SOVIETS TEST ATOMIC BOMB<small>August 29, 1949</small></span></div>
        <div class="banner"><span class="bi">🇨🇳</span><span>COMMUNISTS WIN CHINA<small>October 1, 1949</small></span></div>
        <div class="banner"><span class="bi">🇩🇪</span><span>EAST GERMANY GOES COMMUNIST<small>October 7, 1949</small></span></div>
        ${orlovSays("Now we have the bomb too. And China has gone communist.")}
        ${reveal("<b>Two shocks</b>: the Soviet bomb and a communist China made containment harder and the Cold War scarier.")}
      </div></div>`;
    nextBtn(box.querySelector(".split > div:last-child"), "🏁 See your ending →");
  }

  // ---------------- Ending ----------------
  function endId() { return st.war >= 7 ? "brink" : st.lost.length >= 1 ? "spread" : "held"; }
  const ENDS = {
    held: { icon: "🛡️", t: "Contained, No War", line: "No war, and no new countries lost. That's containment: stop the spread without fighting." },
    brink: { icon: "🔥", t: "On the Brink", line: "You used too much force. Your moves pushed the world toward World War III." },
    spread: { icon: "🟥", t: "The Spread", line: "Communism spread to new countries. Containment slipped." }
  };
  function causedBy() {
    const L = [];
    const P = st.picks;
    L.push(P[1] === "push" ? "🪖 Tried to push Soviets out" : "🧱 Held the line in 1945");
    L.push({ aid: "📜 Aid to Greece, no troops", troops: "🪖 Troops to Greece", out: "🙈 Stayed out of Greece" }[P[2]]);
    L.push({ big: "💰 Marshall Plan rebuilt Europe", loan: "💸 Small loan, Italy lost", none: "🏠 No aid, France and Italy lost" }[P[3]]);
    L.push({ airlift: "🛩️ Airlift fed Berlin", tanks: "🚚 Tanks at Berlin", pull: "🏳️ Gave up West Berlin" }[P[4]]);
    L.push(P[5] === "sign" ? "🤝 Signed NATO" : "🧍 Went it alone");
    return L;
  }
  function step7() {
    const box = card();
    const e = ENDS[endId()];
    box.innerHTML = `<div class="ending ${endId()}"><div class="e-icon">${e.icon}</div><h2>${e.t}</h2>
      <p>${e.line}</p>
      <div class="statrow"><span class="chip">🟥 Lost: ${st.lost.length}</span><span class="chip">🔥 War risk: ${st.war}/10</span><span class="chip">💵 Left: ${st.tokens}</span></div></div>
      <div class="caused"><p class="ctag">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>`;
    nextBtn(box, "📝 Write your answer →");
  }

  // ---------------- Report + turn in ----------------
  const PROMPTS = [
    { id: "contain", short: "Containment: the move that did the most", label: "Best move to contain communism? Why?",
      stem: "The ___ did the most to contain communism because ___.", go4: "Bonus: how would Stalin see it?", min: 60, newWords: 5,
      mustAll: [["truman", "greece", "turkey", "aid", "marshall", "plan", "airlift", "berlin", "nato", "doctrine", "alliance", "plane", "money", "advisers"], ["because", "since", "so "]],
      mustMsg: "Name one U.S. move AND say why (use “because”)." }
  ];
  function step8() {
    const box = card();
    const e = ENDS[endId()];
    box.innerHTML = `<p class="mini-end">${e.icon} <b>${e.t}</b></p>
      <div class="report" id="report"><p class="report-tag">📝 Your answer for the record</p></div>`;
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
    const testT = isT();   // Test T. (teacher) skips the writing rules
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
    a["Ending"] = ENDS[endId()].t;
    a["Caused by"] = causedBy().join(" | ");
    a["Game meters at the end"] = "Countries lost: " + st.lost.length + " · War risk: " + st.war + "/10 · Tokens left: " + st.tokens + "/" + TOKENS;
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }

  // ---------------- Render ----------------
  const STEPS = [title, step1, step2, step3, step4, step5, step6, step7, step8];
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
  // The teacher signed in as Test T. can jump to any screen (steps 1–8) or answer the current one.
  try {
    const CHK_AT = { 2: "c_truman", 3: "c_marshall", 5: "c_nato" };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL) - 1),
      label: i => STEP[i + 1].t,
      go: i => {
        const to = i + 1;
        if (!st.name) st.name = "Test T.";
        // Walk the years in order: skipped moves get the first card the budget allows.
        for (let k = 1; k <= to; k++) {
          onEnter(k);
          if (k < to && D[k] && !st.picks[k]) {
            const c = D[k].find(x => cardCost(k, x) <= st.tokens) || D[k][D[k].length - 1];
            st.picks[k] = c.id; applyPick(k, c.id);
            if (k === 4 && c.id === "airlift") st.airlift = 10;
          }
        }
        st.step = to; justPicked = false; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const k = st.step, id = CHK_AT[k];
        if (k < 1) return;
        if (id && !chk(id).done && !st.picks[k]) {
          chk(id).done = true; justSolved = id;
          save(); render();
        } else if (D[k] && !st.picks[k]) { const b = document.querySelector("#deck .dcard:not([disabled])"); if (b) b.click(); }
        else if (k === 4 && st.picks[4] === "airlift" && st.airlift < 10) { st.airlift = 10; justPicked = true; save(); render(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
