// =====================================================================
//  WRITE THE PEACE — World History Unit 1 Day 5 (Treaty of Versailles)
//  Students write 6 clauses of the 1919 peace while Clemenceau, Lloyd George
//  and Wilson push back. Their terms move 4 meters and lead to one of 4
//  what-if futures. Then the real 1919 treaty, two real cartoons, and the
//  real road to World War II are revealed and checked as evidence.
//  Turn-in goes through shared/turnin.js (same address as the old page).
// =====================================================================
(function () {
  "use strict";
  const KEY = "write-the-peace-treaty-v2";
  const API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const ID = "write-the-peace-treaty";
  const TITLE = "Day 5 · Treaty of Versailles: Write the Peace";
  const STANDARD = "SS.9-12.WH.31, SS.9-12.WH.29";
  const LOCK = 5;
  const PAT = 4;
  const START = { A: 30, S: 30, E: 50, L: 40 };
  const REAL = [0, 0, 0, 1, 0, 1];

  const $ = id => document.getElementById(id);
  const T = s => (window.SiteLang ? window.SiteLang.t(s) : s);
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = v => Math.max(0, Math.min(100, v));

  // ---------------- People and meters ----------------
  const LEADERS = [
    { k: "C", name: "Clemenceau", country: "France", face: "🐯", wants: "🛡️ Never invaded again" },
    { k: "G", name: "Lloyd George", country: "Britain", face: "🦁", wants: "💰 Make Germany pay" },
    { k: "W", name: "Wilson", country: "United States", face: "🦅", wants: "🕊️ A fair peace" }
  ];
  const METERS = [
    { k: "A", icon: "😠", label: "Germany's anger" },
    { k: "S", icon: "🛡️", label: "France's safety" },
    { k: "E", icon: "💰", label: "Europe's economy" },
    { k: "L", icon: "🕊️", label: "League's strength" }
  ];
  const REACT = {
    C: { "1": "France is safer!", "0": "Acceptable.", "-1": "Too soft!", "-2": "You betray France!" },
    G: { "1": "I can sell that!", "0": "Fine.", "-1": "My voters hate this.", "-2": "Britain can't accept this!" },
    W: { "1": "A fair peace!", "0": "Acceptable.", "-1": "Seeds of revenge.", "-2": "This breaks my Fourteen Points!" }
  };

  // ---------------- The six clauses ----------------
  // Card = title (1–4 words) + at most one short line. Dots on the card show which meters move (not which way).
  const CLAUSES = [
    {
      short: "War guilt", icon: "⚖️", title: "Who takes the blame?",
      sit: "8 million soldiers are dead.",
      say: ["Germany started it!", "Put the Kaiser on trial!", "Revenge won't last."],
      opts: [
        { i: "📝", t: "ALL blame on Germany", s: "", d: { A: 20, S: 5 }, p: [1, 0, -1], res: "France cheers. Germans of every party are furious." },
        { i: "👑", t: "Kaiser on trial", s: "Germany's emperor, not the people.", d: { A: 5 }, p: [-1, 1, 0], res: "Germans grumble but aren't branded guilty." },
        { i: "🤝", t: "No blame clause", s: "", d: { A: -5, S: -5 }, p: [-2, -1, 1], res: "Germans relax. The French feel betrayed." }
      ],
      concept: "<b>War guilt clause</b> = says who caused the war."
    },
    {
      short: "Payments", icon: "💰", title: "Who pays for the damage?",
      sit: "German armies wrecked northern France.",
      say: ["Germany pays it all!", "Pay, but keep trade.", "Don't starve them."],
      opts: [
        { i: "💸", t: "A giant bill", s: "Billions, for decades.", d: { A: 20, E: -25, S: 10 }, p: [1, 0, -1], res: "France rebuilds. Germany's money sinks." },
        { i: "🧾", t: "A smaller bill", s: "What Germany can afford.", d: { A: 5, E: -5, S: 5 }, p: [-1, 1, 1], res: "Germany can pay. France wants more." },
        { i: "🚫", t: "No payments", s: "", d: { A: -5, E: 5, S: -10 }, p: [-2, -2, 0], res: "France pays to fix damage it didn't cause." }
      ],
      concept: "<b>Reparations</b> = payments a loser makes for war damage."
    },
    {
      short: "Army", icon: "🪖", title: "How big can Germany's army be?",
      sit: "",
      say: ["They outnumber us. Shrink their army!", "Cut their navy too!", "Everyone should disarm."],
      opts: [
        { i: "✂️", t: "100,000 soldiers max", s: "No tanks, warplanes, or submarines.", d: { A: 10, S: 15 }, p: [1, 1, 0], res: "France feels safer. German officers feel humiliated." },
        { i: "🕊️", t: "Everyone disarms", s: "", d: { A: -5, S: -5, L: 10 }, p: [-1, -1, 1], res: "Germany calls it fair. France hates it." },
        { i: "⚔️", t: "No limits", s: "", d: { A: -10, S: -20 }, p: [-2, -1, -1], res: "Germany is pleased. France is terrified." }
      ],
      concept: "<b>Arms limits</b> = caps on army size."
    },
    {
      short: "Rhineland", icon: "🗺️", title: "What about the Rhineland?",
      sit: "German land on France's border.",
      say: ["Invaded in 1870 and 1914. Never again!", "Taking land makes enemies.", "Those people are German."],
      opts: [
        { i: "🧱", t: "Cut it off", s: "A separate country.", d: { A: 20, S: 15 }, p: [1, -1, -2], res: "France has a wall. Millions of Germans are cut off." },
        { i: "💂", t: "Guard it", s: "No German troops. Allies guard it.", d: { A: 5, S: 10 }, p: [0, 1, 1], res: "France gets a buffer. Germans hate the foreign troops." },
        { i: "🏞️", t: "Leave it alone", s: "", d: { A: -5, S: -10 }, p: [-2, 0, 1], res: "Germans are relieved. France feels open to attack." }
      ],
      concept: "<b>Demilitarized zone</b> = an area where no army is allowed."
    },
    {
      short: "New map", icon: "🧭", title: "Who gets their own country?",
      sit: "Four empires just collapsed.",
      say: ["Surround Germany with strong nations!", "Britain keeps its colonies.", "Peoples choose their government."],
      opts: [
        { i: "🗺️", t: "New nations, Europe only", s: "Colonies stay colonies.", d: { A: 5, S: 5, L: -5 }, p: [1, 1, 0], res: "Poland is born. Colonies feel cheated." },
        { i: "🌍", t: "Freedom for everyone", s: "Even colonies like India.", d: { L: 10 }, p: [-1, -2, 1], res: "Colonies celebrate. Britain and France are furious." },
        { i: "🧩", t: "German speakers join Germany", s: "Austria can join.", d: { A: -15, S: -15 }, p: [-2, -1, 1], res: "Germans cheer. Germany ends up bigger than before." }
      ],
      concept: "<b>Self-determination</b> = peoples choose their own government."
    },
    {
      short: "League", icon: "🕊️", title: "How do you stop the next war?",
      sit: "",
      say: ["The League needs an army!", "No world army!", "Talk before war."],
      opts: [
        { i: "🛡️", t: "League with an army", s: "", d: { L: 25, S: 5 }, p: [1, -1, -1], res: "The League has teeth. Americans fear new wars." },
        { i: "🗣️", t: "League, no army", s: "Talk only.", d: { L: 10 }, p: [-1, 1, 1], res: "Wilson gets his League. It can talk, not force." },
        { i: "👀", t: "No League", s: "", d: { L: -20, S: -5 }, p: [0, 0, -2], res: "Wilson's dream dies. Nobody guards the peace." }
      ],
      concept: "<b>League of Nations</b> = a world group to stop wars."
    }
  ];

  const WALKOUT = {
    C: { line: "🐯 Clemenceau walks out!", gone: "🐯 Clemenceau walked out.", cost: "France stops trusting its allies.", d: { A: 10, S: -10, L: -5 } },
    G: { line: "🦁 Lloyd George walks out!", gone: "🦁 Lloyd George walked out.", cost: "Britain backs away from Europe.", d: { S: -10, L: -10 } },
    W: { line: "🦅 Wilson walks out!", gone: "🦅 Wilson walked out.", cost: "America goes home and stays out.", d: { L: -15 } }
  };

  // ---------------- Evidence checks (6) ----------------
  const CHECKS = {
    selfdet: {
      std: "WH.31", short: "Check 1 · Self-determination",
      label: "Wilson's test",
      prompt: "🔒 Wilson's test: what does he want?",
      options: ["People choose their own government.", "Strong nations choose for weak ones.", "Winners keep the land they won."],
      hint: "Consent = agreeing. Who must agree?",
      why: "Peoples choose who rules them."
    },
    art231: {
      std: "WH.31", short: "Check 2 · Article 231 (war guilt)",
      label: "Article 231",
      prompt: "Why did Germans hate this?",
      options: ["It blamed Germany for all the harm.", "It gave Germany's army to France.", "It made Germany join the League."],
      hint: "Responsibility = blame. Who is blamed?",
      why: "The blame was also why Germany had to pay."
    },
    dyson: {
      std: "WH.29", short: "Check 3 · Dyson cartoon (1940 Class)",
      label: "Dyson, 1919",
      prompt: "“1940 Class” = boys drafted in 1940. Dyson's prediction?",
      options: ["It will cause a new war.", "It will keep him safe forever.", "He'll grow up a peace leader."],
      hint: "Why would a peace treaty make him cry?",
      why: "World War II began in 1939."
    },
    china: {
      std: "WH.31", short: "Check 4 · China cartoon (Shandong)",
      label: "Bradley, 1915",
      prompt: "Why were Chinese students furious in 1919?",
      options: ["Japan's demands beat China's rights.", "China's rights beat Japan's demands.", "Japan dropped its demands for China."],
      hint: "Who holds “Demands”?",
      why: "Students protested. China refused to sign."
    },
    chain: {
      std: "WH.29", short: "Check 6 · Road to WWII",
      label: "Lloyd George",
      prompt: "He warned: unfair peace → revenge. Which link proves it?",
      options: ["Hitler vows to tear it up.", "The Depression costs Germans jobs.", "French troops seize the Ruhr."],
      hint: "Which link strikes back at the treaty?",
      why: "Then he broke the treaty, step by step."
    }
  };
  // Check 5 is the aftershock stamp round (Russia, India, the Depression). It counts as one check.
  CHECKS.after = {
    std: "WH.31", short: "Check 5 · Aftershocks (Russia, India, Depression)",
    options: ["Russia → Revolution · India → Foreign control · Depression → Hard times"]
  };
  const CHECK_IDS = ["selfdet", "art231", "dyson", "china", "after", "chain"];

  // ---------------- Steps ----------------
  const STEPS = [
    { id: "brief", name: "Meet the Big Three" },
    { id: "c0", name: "Clause 1: War guilt" }, { id: "c1", name: "Clause 2: Payments" }, { id: "c2", name: "Clause 3: Army" },
    { id: "c3", name: "Clause 4: Rhineland" }, { id: "c4", name: "Clause 5: New map" }, { id: "c5", name: "Clause 6: League" },
    { id: "sign", name: "Signing day" }, { id: "future", name: "Your future" }, { id: "real", name: "The real treaty" },
    { id: "dyson", name: "Cartoon 1" }, { id: "china", name: "Cartoon 2" }, { id: "after", name: "Aftershocks" }, { id: "chain", name: "The real road to war" },
    { id: "write", name: "Write and turn in" }
  ];

  // ---------------- Save ----------------
  const fresh = () => ({ step: -1, picks: [null, null, null, null, null, null], checks: {}, hot: {}, miss: {}, fut: 0, chain: 0, writing: { w1: "", w2: "" }, name: "", turnedIn: false });
  let st = null, hadSave = false;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) { st = null; }
  if (!st || typeof st !== "object" || !Array.isArray(st.picks)) st = fresh(); else hadSave = true;
  ["checks", "hot", "miss", "writing"].forEach(k => { if (!st[k] || typeof st[k] !== "object") st[k] = k === "writing" ? { w1: "", w2: "" } : {}; });
  // The old Cartoon Decoder saved first-try marks under this same page address. Start clean for the new game.
  if (!hadSave && window.classFirstTry) window.classFirstTry.reset();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // ---------------- The model ----------------
  // Runs the clauses picked so far. Returns meters, patience, walkouts, and a log for "Caused by".
  function simulate(picks) {
    const m = Object.assign({}, START), pat = { C: PAT, G: PAT, W: PAT }, out = { C: false, G: false, W: false };
    const log = [], walk = {};
    picks.forEach((pi, i) => {
      if (pi == null) return;
      const o = CLAUSES[i].opts[pi];
      Object.keys(o.d).forEach(k => { m[k] = clamp(m[k] + o.d[k]); });
      log.push({ label: o.t, d: o.d });
      ["C", "G", "W"].forEach((k, j) => {
        if (out[k]) return;
        pat[k] = Math.min(PAT, pat[k] + o.p[j]);
        if (pat[k] <= 0) { pat[k] = 0; out[k] = true; walk[k] = i; }
      });
    });
    return { m, pat, out, log, walk };
  }
  function addFx(m, d, log, label) { Object.keys(d).forEach(k => { m[k] = clamp(m[k] + d[k]); }); if (log && label) log.push({ label, d }); }
  // Signing day: walkout costs + the U.S. Senate (real: it voted the treaty down).
  function signing(picks) {
    const r = simulate(picks), items = [];
    ["C", "G", "W"].forEach(k => { if (r.out[k]) { addFx(r.m, WALKOUT[k].d, r.log, WALKOUT[k].line); items.push({ kind: "walk", k, d: WALKOUT[k].d }); } });
    const senate = { L: picks[5] === 0 ? -15 : -10 };
    addFx(r.m, senate, r.log, "U.S. Senate votes NO");
    items.push({ kind: "senate", d: senate });
    return Object.assign(r, { items });
  }
  // What-if future, 1919–1939.
  function future(picks) {
    const r = signing(picks), ev = [];
    if (r.m.E < 35) { const d = { A: 10 }; addFx(r.m, d, r.log, "1923: money becomes worthless"); ev.push({ year: "1923", h: "Money melts", t: "Germany prints money until it's worthless.", d, cause: "Caused by: a huge bill" }); }
    else { const d = { A: -5 }; addFx(r.m, d, r.log, "1923: Germany rebuilds"); ev.push({ year: "1923", h: "Back to work", t: "Factories restart. Anger cools a little.", d, cause: "Caused by: an affordable bill" }); }
    { const d = { A: 5 }; addFx(r.m, d, r.log, "1929: the Great Depression"); ev.push({ year: "1929", h: "The crash", t: "The Great Depression hits. (Real.)", d, cause: "Caused by: a worldwide crash" }); }
    const strong = r.m.A >= 60;
    if (strong) ev.push({ year: "1933", h: "A strongman wins", t: "Voters pick a leader who vows revenge.", d: {}, cause: "Caused by: high anger" });
    else ev.push({ year: "1933", h: "Calm votes", t: "Voters stick with normal leaders.", d: {}, cause: "Caused by: anger stayed low" });
    let end;
    if (strong && r.m.L < 40) { end = "1940"; ev.push({ year: "1936", h: "Nobody stops him", t: "He rebuilds the army. No one stops him.", d: {}, cause: "Caused by: a weak League" }); }
    else if (strong) { end = "close"; ev.push({ year: "1936", h: "The guard holds", t: "He breaks the treaty. The League stops him.", d: {}, cause: "Caused by: a strong League" }); }
    else if (r.m.S < 20 || r.m.L < 25) { end = "unchecked"; ev.push({ year: "1936", h: "Nobody on guard", t: "Germany builds Europe's biggest army. Everyone races to arm.", d: {}, cause: "Caused by: no guard" }); }
    else { end = "long"; ev.push({ year: "1936", h: "Talk, not tanks", t: "Fights go to the League, not the battlefield.", d: {}, cause: "Caused by: strong League, safe France" }); }
    return Object.assign(r, { ev, end });
  }
  const ENDINGS = {
    "1940": { name: "The 1940 Class", text: "War returns in 1939. The babies of 1919 get drafted." },
    "close": { name: "Close Call", text: "A dangerous leader rose, but your guard held.", meters: ["A", "L"] },
    "unchecked": { name: "Germany Unchained", text: "No limits, no guard. An arms race becomes war.", meters: ["S", "L"] },
    "long": { name: "The Long Peace", text: "No second world war. Nobody got this ending in real life.", meters: ["A", "S", "L"] }
  };
  // "Caused by" trail: the biggest pushes on the meters that decided the ending (meter + direction).
  const TRAIL = { "1940": [["A", 1], ["L", -1]], close: [["A", 1], ["L", 1]], unchecked: [["S", -1], ["L", -1]], long: [["A", -1], ["S", 1], ["L", 1]] };
  function trail(r) {
    let items = [];
    TRAIL[r.end].forEach(([k, sign]) => {
      const hits = r.log.filter(e => e.d[k] && Math.sign(e.d[k]) === sign).map(e => ({ label: e.label, k, v: e.d[k] }));
      hits.sort((x, y) => Math.abs(y.v) - Math.abs(x.v));
      items = items.concat(hits.slice(0, 2));
    });
    items.sort((x, y) => Math.abs(y.v) - Math.abs(x.v));
    return items.slice(0, 4);
  }

  // ---------------- Drawing helpers ----------------
  const app = $("app");
  function meterHtml(k) { const mm = METERS.find(x => x.k === k); return mm.icon + " " + T(mm.label); }
  function drawMeters(m, d) {
    $("meters").innerHTML = METERS.map(mm => {
      const dv = d && d[mm.k];
      const chip = dv ? `<span class="delta ${dv > 0 ? "up" : "down"}">${dv > 0 ? "+" : "−"}${Math.abs(dv)}</span>` : "";
      const icon = mm.k === "A" ? (m.A >= 65 ? "🤬" : m.A >= 50 ? "😠" : m.A >= 35 ? "😒" : "🙂") : mm.icon;
      return `<div class="meter m-${mm.k}${mm.k === "A" && m.A >= 60 ? " danger" : ""}"><div class="mlabel"><span><span class="micon">${icon}</span> <span>${mm.label}</span></span>${chip}</div><div class="bar"><i style="width:${m[mm.k]}%"></i></div></div>`;
    }).join("");
  }
  function deltaList(d) {
    const ks = Object.keys(d || {}).filter(k => d[k]);
    if (!ks.length) return "";
    return `<p class="deltas">` + ks.map(k => `<span class="dchip m-${k}" title="${METERS.find(x => x.k === k).label}">${METERS.find(x => x.k === k).icon} <span class="delta ${d[k] > 0 ? "up" : "down"}">${d[k] > 0 ? "+" : "−"}${Math.abs(d[k])}</span></span>`).join("") + `</p>`;
  }
  function fxDots(d) {
    return `<span class="fx" aria-hidden="true">` + Object.keys(d).filter(k => d[k]).map(k => `<span class="fxi">${METERS.find(x => x.k === k).icon}<i>${Math.abs(d[k]) >= 15 ? "●●" : "●"}</i></span>`).join("") + `</span>`;
  }
  function pips(n, gone) {
    if (gone) return `<span class="pips">🚪 <span>Walked out</span></span>`;
    let s = ""; for (let i = 0; i < PAT; i++) s += i < n ? "●" : `<span class="off">●</span>`;
    return `<span class="pips" title="Patience">${s}</span>`;
  }
  function leadersHtml(r, opts) {
    opts = opts || {};
    return `<div class="leaders">` + LEADERS.map((L, j) => {
      const gone = r.out[L.k] && !(opts.justLeft === L.k);
      let extra = "";
      if (opts.say) extra = `<div class="bubble say">${opts.say[j]}</div>`;
      else if (opts.wants) extra = `<div class="bubble">${L.wants}</div>`;
      if (opts.react && !gone) { const v = opts.react[j]; extra += `<div class="react r${v < 0 ? "m" + (-v) : v}">${REACT[L.k][String(Math.max(-2, Math.min(1, v)))]}</div>`; }
      let mood = "", shake = "";
      if (opts.react && !gone) { const v = opts.react[j]; mood = `<span class="mood">${v >= 1 ? "😊" : v === 0 ? "😐" : v === -1 ? "😠" : "😡"}</span>`; if (v < 0) shake = " shake"; }
      if (r.out[L.k]) mood = `<span class="mood">🚪</span>`;
      return `<div class="leader${r.out[L.k] ? " gone" : ""}${shake}"><div class="face" aria-hidden="true">${L.face}${mood}</div><div><div class="lname">${L.name}</div><div class="lcountry">${L.country}</div>${pips(r.pat[L.k], r.out[L.k])}${extra}</div></div>`;
    }).join("") + `</div>`;
  }
  function header() {
    const on = st.step >= 0;
    $("stepbox").hidden = !on; $("restartBtn").hidden = !on;
    if (on) {
      const n = Math.min(st.step + 1, STEPS.length);
      $("steptext").textContent = "Step " + n + " of " + STEPS.length + ": " + STEPS[Math.min(st.step, STEPS.length - 1)].name;
      $("fill").style.width = Math.round(st.step / STEPS.length * 100) + "%";
    }
  }
  function nextBtn(label, fn) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.textContent = label;
    b.onclick = fn; return b;
  }
  // Re-draw, then bring the new thing into view (the first selector that matches; its last match).
  function rerender(sels) {
    render();
    for (const sel of sels || []) { const all = app.querySelectorAll(sel); if (all.length) { const t = all[all.length - 1]; try { t.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {} return; } }
  }
  function advance() { st.step++; save(); render(); window.scrollTo(0, 0); }
  function el(html) { const d = document.createElement("div"); d.innerHTML = html; return d; }

  // ---------------- Evidence check widget ----------------
  let locked = false;
  function checkWidget(id, onDone) {
    const q = CHECKS[id], box = document.createElement("div");
    const rec = st.checks[id] || (st.checks[id] = { done: false, wrong: 0 });
    if (rec.done) {
      box.className = "done-check";
      box.innerHTML = `<span class="stamp green">DECODED</span><p><b>✓ <span>${q.options[0]}</span></b></p><p>${q.why}</p>`;
      return box;
    }
    box.className = "check";
    box.innerHTML = `<p class="file-tab" aria-hidden="true">📁 🔎</p><p class="file-q">${q.prompt}</p><div class="choices"></div><p class="msg" role="status" aria-live="polite"></p>`;
    const area = box.querySelector(".choices"), fb = box.querySelector(".msg");
    let last = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(q.options.map((t, n) => ({ t, n })));
      if (order.map(o => o.n).join() === last) order.push(order.shift());
      last = order.map(o => o.n).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            rec.done = true; if (window.classFirstTry) window.classFirstTry.right("v2-" + id);
            save(); onDone();
          } else {
            rec.wrong = (rec.wrong || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
            locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; }); box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
            let left = LOCK;
            const tick = () => {
              fb.className = "msg bad";
              fb.textContent = "Not quite. " + q.hint + " Try again in " + left + "…";
              if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + q.hint + " Try again."; draw(); return; }
              setTimeout(tick, 1000);
            };
            tick();
          }
        };
        area.appendChild(b);
      });
    }
    draw();
    return box;
  }

  // ---------------- Hotspot widget (find it on the cartoon) ----------------
  function picture(src, alt, spots, key, done) {
    // spots: [{x,y,w,h,label,task,hint}] in percent. key: save slot. done(): all found.
    const found = st.hot[key] || 0;
    const wrap = document.createElement("div");
    wrap.className = "pic";
    wrap.innerHTML = `<img src="${src}" alt="${alt}">`;
    spots.forEach((s, i) => {
      if (i > found) return;
      const b = document.createElement("button"); b.type = "button";
      b.className = "hot" + (i < found ? " found" : "") + (i === found && (st.miss[key + i] || 0) >= 3 ? " pulse" : "");
      b.style.cssText = `left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%`;
      b.setAttribute("aria-label", i < found ? s.label : s.task);
      if (i < found) { b.innerHTML = `<span class="tag">${s.label}</span>`; b.tabIndex = -1; }
      b.onclick = e => {
        e.stopPropagation();
        if (i !== found) return;
        st.hot[key] = found + 1; save(); rerender(found + 1 >= spots.length ? [".check"] : []);
      };
      wrap.appendChild(b);
    });
    wrap.onclick = () => {
      if (found >= spots.length) return;
      st.miss[key + found] = (st.miss[key + found] || 0) + 1; save();
      if (st.miss[key + found] === 3) render();
      const msg = document.getElementById("miss-" + key);
      if (msg) msg.textContent = (st.miss[key + found] >= 3 ? "Look for the dashed red box. " : "Not there. ") + spots[found].hint;
    };
    return wrap;
  }

  // ---------------- Screens ----------------
  function titleScreen() {
    $("meterWrap").hidden = true;
    app.innerHTML = `<section class="card title-card">
      <div>
        <h1>Write the Peace</h1>
        <p class="hook">WWI is over. Write a peace that lasts.</p>
        <div class="facts"><span>✍️ 6 clauses</span><span>🔮 Your future</span><span>⏱️ 30 min</span></div>
        <p class="goal"><b>Goal:</b> Explain how the 1919 peace punished Germany and led to WWII.</p>
        <button type="button" class="go big" id="startBtn">Start →</button>
        <div id="welcomeSlot"></div>
        <p class="heads">Heads up: war deaths, no graphic images. <span class="src">SS.9-12.WH.31, WH.29</span></p>
      </div>
      <div class="table-scene" aria-hidden="true">
        <div class="tbl"><span class="scroll">📜</span></div>
        <div class="seat s1"><span>🐯</span></div>
        <div class="seat s2"><span>🦁</span></div>
        <div class="seat s3"><span>🦅</span></div>
        <div class="seat s4 you"><span>✍️</span><small>YOU</small></div>
        <div class="seal-mini">1919</div>
      </div>
    </section>`;
    $("startBtn").onclick = () => { st.step = 0; save(); render(); window.scrollTo(0, 0); };
  }

  function briefScreen() {
    const r = simulate([]);
    $("meterWrap").hidden = false; drawMeters(r.m);
    app.innerHTML = `<section class="card">
      <p class="kicker">Paris, 1919</p>
      <h2>You write the treaty.</h2>
      <p class="small">(Made-up role. Real leaders.)</p>
      ${leadersHtml(r, { wants: true })}
      <div class="germany">🇩🇪 <span><b>Germany</b> gets no say.</span></div>
      <div class="tiles">
        <div class="tile"><b aria-hidden="true">●●●●</b><span>Patience. 0 = walkout.</span></div>
        <div class="tile"><b aria-hidden="true">😠●●</b><span>Dots = meters you move.</span></div>
        <div class="tile"><b aria-hidden="true">🎯</b><span>Goal: peace for 20 years.</span></div>
      </div>
    </section>`;
    app.appendChild(nextBtn("Take your seat →", advance));
  }

  function clauseScreen(i) {
    const c = CLAUSES[i], pick = st.picks[i];
    const before = simulate(st.picks.slice(0, i));
    $("meterWrap").hidden = false;
    const card = document.createElement("section"); card.className = "card";
    if (pick == null) {
      drawMeters(before.m);
      const lockedC5 = i === 4 && !(st.checks.selfdet && st.checks.selfdet.done);
      card.innerHTML = `<h2><span aria-hidden="true">${c.icon}</span> <span>${c.title}</span></h2>${c.sit && !lockedC5 ? `<p class="sit">${c.sit}</p>` : ""}${leadersHtml(before, lockedC5 ? {} : { say: c.say })}`;
      app.appendChild(card);
      // Clause 5: Wilson's card must be decoded first.
      if (lockedC5) {
        card.appendChild(el(`<div class="doc"><p class="doc-h src">📜 <span>Woodrow Wilson, speech to Congress, February 11, 1918</span></p><p class="doc-text">“Peoples may now be dominated and governed only by their own consent.”</p><p class="small">consent = agreement</p></div>`));
        card.appendChild(checkWidget("selfdet", () => rerender([".opts"])));
        return;
      }
      const opts = document.createElement("div"); opts.className = "opts";
      shuffle(c.opts.map((o, n) => n)).forEach(n => {
        const o = c.opts[n];
        const b = document.createElement("button"); b.type = "button"; b.className = "opt";
        b.innerHTML = `<span class="opt-icon" aria-hidden="true">${o.i}</span><b>${o.t}</b>${o.s ? `<span>${o.s}</span>` : ""}${fxDots(o.d)}`;
        b.onclick = () => { st.picks[i] = n; save(); rerender([".result"]); };
        opts.appendChild(b);
      });
      card.appendChild(opts);
      return;
    }
    // Result
    const o = c.opts[pick];
    const after = simulate(st.picks.slice(0, i + 1));
    drawMeters(after.m, o.d);
    const leftNow = ["C", "G", "W"].find(k => after.walk[k] === i);
    card.innerHTML = `<h2><span aria-hidden="true">${c.icon}</span> <span>${c.title}</span></h2>
      <div class="opts one"><div class="opt picked"><span class="opt-icon" aria-hidden="true">${o.i}</span><b>${o.t}</b><span class="stamp">SIGNED</span></div></div>
      <div class="result"><p><b>${o.res}</b></p>${deltaList(o.d)}</div>
      ${leadersHtml(after, { react: o.p.map((v, j) => before.out[LEADERS[j].k] ? 0 : v), justLeft: leftNow })}
      ${leftNow ? `<div class="walkout shake"><span class="door" aria-hidden="true">🚪</span><p><b>${WALKOUT[leftNow].line}</b></p><p>${WALKOUT[leftNow].cost}</p><p class="small">Real 1919: Italy's leader did this.</p></div>` : ""}
      <p class="concept">${c.concept}</p>`;
    app.appendChild(card);
    app.appendChild(nextBtn(i < 5 ? "Next clause →" : "Go to signing day →", advance));
  }

  function signScreen() {
    const r = signing(st.picks);
    $("meterWrap").hidden = false;
    const tot = {}; r.items.forEach(it => Object.keys(it.d).forEach(k => { tot[k] = (tot[k] || 0) + it.d[k]; }));
    drawMeters(r.m, tot);
    const rows = r.items.map(it => {
      if (it.kind === "walk") return `<div class="event"><span class="year">!</span><div><b>${WALKOUT[it.k].gone}</b><p>${WALKOUT[it.k].cost}</p>${deltaList(it.d)}</div></div>`;
      return `<div class="event real"><span class="year">1920</span><div><b>The U.S. Senate votes NO.</b><p>${st.picks[5] === 2 ? "America pulls back from Europe. (Real.)" : "America never joins the League. (Real.)"}</p>${st.picks[5] === 0 ? `<p class="small">Senators fear a League army.</p>` : ""}${deltaList(it.d)}</div></div>`;
    }).join("");
    app.innerHTML = `<section class="card">
      <p class="kicker">June 28, 1919</p>
      <h2>Signing day</h2>
      <p>Germany must sign. Germans call it a <b>Diktat</b>: a forced peace.</p>
      ${leadersHtml(r)}
      <div class="future">${rows}</div>
    </section>`;
    app.appendChild(nextBtn("See the future you caused →", advance));
  }

  function futureScreen() {
    const r = future(st.picks), shown = Math.min(st.fut || 0, r.ev.length);
    $("meterWrap").hidden = false;
    // Meters show the effect of the years revealed so far.
    const s = signing(st.picks);
    let lastD = null;
    r.ev.slice(0, shown).forEach(e => { addFx(s.m, e.d); if (Object.keys(e.d).length) lastD = e.d; });
    drawMeters(s.m, shown ? lastD : null);
    const card = document.createElement("section"); card.className = "card";
    const done = shown >= r.ev.length;
    card.innerHTML = `<p class="kicker"><span class="whatif">WHAT-IF</span> <span>1919–1939</span></p>` + (done ? "" : `<h2>Twenty years later…</h2><p class="small">Made-up newspaper, real causes.</p>`);
    const chips = done ? [] : r.ev.slice(0, Math.max(0, shown - 1));
    if (chips.length) card.appendChild(el(`<div class="yearchips">${chips.map(e => `<span class="ychip"><b>${e.year}</b> <span>${e.h}</span></span>`).join("")}</div>`).firstChild);
    if (shown && !done) { const e = r.ev[shown - 1]; card.appendChild(el(`<div class="future"><div class="paper"><div class="mast"><span>THE WORLD HERALD</span><span>${e.year}</span></div><div class="headline">${e.h}</div><p>${e.t}</p>${deltaList(e.d)}<span class="cause">${e.cause}</span></div></div>`).firstChild); }
    app.appendChild(card);
    if (!done) { app.appendChild(nextBtn(shown ? "Next year →" : "Jump to 1923 →", () => { st.fut = shown + 1; save(); rerender([".ending", ".paper"]); })); return; }
    const E = ENDINGS[r.end];
    const tr = trail(r);
    card.appendChild(el(`<div class="ending end-${r.end}"><p class="kicker">Your ending</p><h2>${E.name}</h2><p>${E.text}</p><div class="trail"><b>Caused by:</b><ul>${tr.map(x => `<li><span>${T(x.label)}</span> (${METERS.find(m => m.k === x.k).icon} ${x.v > 0 ? "+" : "−"}${Math.abs(x.v)})</li>`).join("")}</ul></div></div>`).firstChild);
    card.appendChild(el(`<p class="concept"><b>Big idea:</b> A harsh peace makes people want revenge. A peace nobody enforces can't stop it.</p>`).firstChild);
    app.appendChild(nextBtn("Now see the REAL treaty →", advance));
  }

  // A few real facts, shown under the 1919 pick (only where the card title isn't enough).
  const REAL_FACTS = ["", "132 billion gold marks (1921)", "", "", "Germany lost 13% of its land.", ""];
  function realScreen() {
    $("meterWrap").hidden = true;
    const nSame = CLAUSES.filter((c, i) => st.picks[i] === REAL[i]).length;
    const card = document.createElement("section"); card.className = "card";
    if (!st.realOpen) {
      const rows = CLAUSES.map((c, i) => {
        const mine = c.opts[st.picks[i]], real = c.opts[REAL[i]], same = st.picks[i] === REAL[i];
        return `<div class="vrow" style="animation-delay:${i * 0.12}s"><span class="vr-c" title="${c.short}">${c.icon}</span><span class="vr-you" title="${mine.t}">${mine.i}</span><span class="vr-real"><span class="vs-i" aria-hidden="true">${real.i}</span><span><b>${real.t}</b>${REAL_FACTS[i] ? `<small>${REAL_FACTS[i]}</small>` : ""}</span></span><span class="vr-st ${same ? "same" : "diff"}" aria-label="${same ? "Same" : "Different"}">${same ? "✓" : "✗"}</span></div>`;
      }).join("");
      card.innerHTML = `<h2>The real treaty</h2>
        <div class="scoreboard"><span class="big">${nSame}/6</span><span><span>match.</span> <span>Real treaty →</span> <b>${ENDINGS[future(REAL).end].name}</b></span></div>
        <div class="vtable"><div class="vrow vhead"><span></span><span>You</span><span>1919</span><span></span></div>${rows}</div>`;
      app.appendChild(card);
      app.appendChild(nextBtn("Open Article 231 →", () => { st.realOpen = true; save(); render(); window.scrollTo(0, 0); }));
      return;
    }
    card.innerHTML = `<h2>Article 231</h2>
      <div class="doc"><p class="doc-h src">📜 <span>Treaty of Versailles, Article 231 (1919)</span></p><p class="doc-text">“…Germany accepts the responsibility of Germany and her allies for causing all the loss and damage…”</p></div>`;
    app.appendChild(card);
    card.appendChild(checkWidget("art231", () => rerender(["button.go"])));
    if (st.checks.art231 && st.checks.art231.done) app.appendChild(nextBtn("Decode the evidence →", advance));
  }

  function dysonScreen() {
    $("meterWrap").hidden = true;
    const spots = [
      { x: 9, y: 85, w: 22, h: 13, label: "Peace treaty", task: "The peace treaty", hint: "Look on the ground, bottom left." },
      { x: 1, y: 39, w: 22, h: 13, label: "1940 Class", task: "The child's label", hint: "Look above the crying child's head." }
    ];
    const found = st.hot.dyson || 0;
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<h2>The weeping child</h2>
      <div class="cartoon-layout"><figure class="cartoon" id="fig"></figure><div id="side"></div></div>`;
    app.appendChild(card);
    const fig = card.querySelector("#fig");
    fig.appendChild(picture("versailles-1919.jpg", "1919 cartoon: four leaders leave a building past a crying child", spots, "dyson"));
    fig.appendChild(el(`<figcaption>“Peace and Future Cannon Fodder,” Will Dyson, <i>Daily Herald</i> (London), May 1919. Public domain. The man with the cane is Clemenceau, nicknamed “The Tiger.”</figcaption>`).firstChild);
    const side = card.querySelector("#side");
    side.appendChild(el(`<p>Clemenceau, “The Tiger,” says: <b>“Curious! I seem to hear a child weeping!”</b></p>`).firstChild);
    if (found < spots.length) {
      side.appendChild(el(`<p class="task">👆 <span>Tap:</span> <span>${spots[found].task}</span></p>`).firstChild);
      side.appendChild(el(`<p class="missmsg" id="miss-dyson" role="status" aria-live="polite"></p>`).firstChild);
      return;
    }
    side.appendChild(el(`<p class="task ok">✓ <span>Found both!</span></p>`).firstChild);
    side.appendChild(checkWidget("dyson", () => rerender(["button.go"])));
    if (st.checks.dyson && st.checks.dyson.done) side.appendChild(nextBtn("Next cartoon →", advance));
  }

  function chinaScreen() {
    $("meterWrap").hidden = true;
    const spots = [
      { x: 53, y: 39, w: 18, h: 19, label: "Demands", task: "Japan's sign", hint: "Find the short man labeled JAPAN." },
      { x: 34, y: 15, w: 12, h: 21, label: "My Rights", task: "The paper China holds", hint: "Look at China's raised hand." }
    ];
    const found = st.hot.china || 0;
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<h2>China vs. Japan</h2>
      <div class="cartoon-layout"><figure class="cartoon" id="fig"></figure><div id="side"></div></div>`;
    app.appendChild(card);
    const fig = card.querySelector("#fig");
    fig.appendChild(picture("china-1915.jpg", "1915 cartoon of China and Japan, each holding a paper", spots, "china"));
    fig.appendChild(el(`<figcaption>Luther D. Bradley, <i>Chicago Daily News</i>, March 13, 1915. Public domain. <a href="https://www.loc.gov/pictures/item/2009616341/" target="_blank" rel="noopener">Library of Congress record ↗</a></figcaption>`).firstChild);
    const side = card.querySelector("#side");
    side.appendChild(el(`<p>1915: Japan demands more control over China.</p>`).firstChild);
    if (found < spots.length) {
      side.appendChild(el(`<p class="task">👆 <span>Tap:</span> <span>${spots[found].task}</span></p>`).firstChild);
      side.appendChild(el(`<p class="missmsg" id="miss-china" role="status" aria-live="polite"></p>`).firstChild);
      return;
    }
    side.appendChild(el(`<p class="task ok">✓ <span>Found both!</span></p>`).firstChild);
    side.appendChild(el(`<p><b>1919:</b> <span>The treaty gave Germany's Shandong rights to Japan.</span></p>`).firstChild);
    side.appendChild(checkWidget("china", () => rerender(["button.go"])));
    if (st.checks.china && st.checks.china.done) side.appendChild(nextBtn("Track the aftershocks →", advance));
  }

  // ---------------- Aftershocks: 3 more real cartoons, stamped by the change they show ----------------
  const STAMPS = [
    { k: "rev", i: "🔥", t: "REVOLUTION", s: "Old rulers thrown out" },
    { k: "for", i: "⛓️", t: "FOREIGN CONTROL", s: "Outsiders run your land" },
    { k: "hard", i: "📉", t: "HARD TIMES", s: "Money trouble everywhere" }
  ];
  const AFTER = [
    { id: "russia", place: "Russia", flag: "🇷🇺", year: "1921", answer: "rev",
      media: `<img src="https://tile.loc.gov/storage-services/service/pnp/acd/2a10000/2a10700/2a10785r.jpg" alt="1921 cartoon: Lenin beside a patient labeled Russia on an operating table" loading="lazy">`,
      credit: `“Lenine calls for return of intellectuals,” Lute Pease, about 1921. <a href="https://www.loc.gov/item/2016683903/" target="_blank" rel="noopener">Library of Congress record ↗</a>`,
      sit: "1917: Lenin's Communists seize power.",
      look: "RUSSIA is on the operating table.",
      hint: "Lenin seized power by force.",
      why: "War and hunger sparked the revolution." },
    { id: "india", place: "India", flag: "🇮🇳", year: "1920s", answer: "for",
      media: `<iframe class="pdfframe" title="Historical cartoon about India's independence struggle" src="https://www.mkgandhi.org/ebks/Gandhi-in-cartoons.pdf#page=46&amp;zoom=70&amp;toolbar=0&amp;navpanes=0" loading="lazy"></iframe>`,
      credit: `European cartoon about India, from the Gandhi Heritage Portal's collection of historical cartoons. If it doesn't show, <a href="https://www.mkgandhi.org/ebks/Gandhi-in-cartoons.pdf#page=46" target="_blank" rel="noopener">open the cartoon here ↗</a> (page 46).`,
      sit: "After the war, Britain still rules India.",
      look: "Gandhi leads India. British troops block it.",
      hint: "Who ran India: Indians or Britain?",
      why: "Gandhi led peaceful protests. Freedom came in 1947." },
    { id: "dep", place: "Great Depression", flag: "🌎", year: "1930", answer: "hard",
      media: `<img src="https://tile.loc.gov/storage-services/service/pnp/ppmsc/03300/03389r.jpg" alt="1930 cartoon: a well-dressed man and a jobless man selling apples on a city street" loading="lazy">`,
      credit: `“The Philanthropist,” Herbert Block, December 5, 1930. <a href="https://www.loc.gov/pictures/item/00652174/" target="_blank" rel="noopener">Library of Congress record ↗</a>`,
      sit: "1929: a worldwide crash.",
      look: "A jobless man sells apples for 5¢.",
      hint: "Why sell apples for a nickel?",
      why: "In Germany, hard times helped Hitler win votes." }
  ];
  function stampOf(k) { return STAMPS.find(x => x.k === k); }
  let stampLock = false;
  function afterScreen() {
    $("meterWrap").hidden = true;
    st.stamps = st.stamps || {}; st.stampMiss = st.stampMiss || {};
    const idx = AFTER.findIndex(a => !st.stamps[a.id]);
    const card = document.createElement("section"); card.className = "card";
    const pins = [`<div class="pin done"><span class="pin-f">🇨🇳</span><b>China</b><span class="pin-s">⛓️ FOREIGN CONTROL</span></div>`]
      .concat(AFTER.map((a, n) => {
        const s = st.stamps[a.id] ? stampOf(a.answer) : null;
        return `<div class="pin${s ? " done" : n === idx ? " now" : ""}"><span class="pin-f">${a.flag}</span><b>${a.place}</b><span class="pin-s">${s ? s.i + " " + s.t : "?"}</span></div>`;
      })).join("");
    card.innerHTML = `<h2>Aftershocks</h2>
      <div class="pins">${pins}</div>`;
    app.appendChild(card);
    if (idx < 0) {
      card.appendChild(el(`<div class="done-check"><span class="stamp green">DECODED</span><p><b>After WWI: revolution, foreign control, and hard times.</b></p></div>`).firstChild);
      app.appendChild(nextBtn("See the real road to war →", advance));
      return;
    }
    const a = AFTER[idx];
    const box = el(`<div class="cartoon-layout aftershock">
      <figure class="cartoon"><div class="pic-frame">${a.media}</div><figcaption>${a.credit}</figcaption></figure>
      <div><p class="kicker">${a.flag} ${a.year}</p><p>${a.sit}</p><p class="task">👀 <span>${a.look}</span></p>
      <p class="file-q">Stamp its aftershock:</p><div class="stamps"></div><p class="msg" role="status" aria-live="polite"></p></div></div>`).firstChild;
    card.appendChild(box);
    const area = box.querySelector(".stamps"), fb = box.querySelector(".msg");
    let last = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(STAMPS);
      if (order.map(o => o.k).join() === last) order.push(order.shift());
      last = order.map(o => o.k).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "stampbtn";
        b.innerHTML = `<span class="opt-icon" aria-hidden="true">${o.i}</span><b>${o.t}</b><span>${o.s}</span>`;
        b.onclick = () => {
          if (stampLock) return;
          if (o.k === a.answer) {
            st.stamps[a.id] = true;
            if (idx === AFTER.length - 1) {
              const miss = AFTER.reduce((n, x) => n + (st.stampMiss[x.id] || 0), 0);
              st.checks.after = { done: true, wrong: miss };
              if (window.classFirstTry) window.classFirstTry.right("v2-after");
            }
            save();
            area.replaceChildren(el(`<div class="stamped"><span class="stamp green">${o.i} ${o.t}</span><p>${a.why}</p></div>`).firstChild);
            fb.textContent = "";
            box.querySelector(".pic-frame").insertAdjacentHTML("beforeend", `<span class="stamp big-stamp">${o.t}</span>`);
            area.querySelector(".stamped").appendChild(nextBtn(idx < AFTER.length - 1 ? "Next cartoon →" : "Close the file →", () => rerender([".pins"])));
          } else {
            st.stampMiss[a.id] = (st.stampMiss[a.id] || 0) + 1;
            if (window.classFirstTry) window.classFirstTry.wrong();
            save();
            stampLock = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
            box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
            let left = LOCK;
            const tick = () => {
              fb.className = "msg bad";
              fb.textContent = "Not quite. " + a.hint + " Try again in " + left + "…";
              if (left-- <= 0) { stampLock = false; fb.textContent = "Not quite. " + a.hint + " Try again."; draw(); return; }
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

  const LINKS = [
    { year: "1919", i: "✍️", t: "Germany signs a “forced peace.”", m: "Forced peace", link: "the treaty" },
    { year: "1923", i: "💸", t: "Germany misses payments. French troops seize the Ruhr, its factory region.", m: "Ruhr seized", link: "reparations" },
    { year: "1929", i: "📉", t: "Depression: millions of Germans jobless.", m: "Depression", link: "a weak economy" },
    { year: "1933", i: "📢", t: "Hitler takes power, vowing to tear up the treaty.", m: "Hitler vows: tear it up", link: "anger at the treaty" },
    { year: "1936", i: "🪖", t: "Hitler's troops enter the Rhineland. Nobody stops him.", m: "Rhineland", link: "Rhineland rule broken" },
    { year: "1939", i: "💥", t: "Germany invades Poland. WWII begins.", m: "WWII", link: "land lost to Poland" }
  ];
  function chainScreen() {
    $("meterWrap").hidden = true;
    const shown = Math.min(st.chain || 0, LINKS.length), testing = (st.chain || 0) > LINKS.length;
    const card = document.createElement("section"); card.className = "card";
    const quote = `<div class="doc"><p class="doc-h src">📜 <span>British Prime Minister David Lloyd George, March 1919</span></p><p class="doc-text">“If she feels that she has been unjustly treated… she will find means of exacting retribution…”</p><p class="small">= If Germany feels cheated, it will get revenge.</p></div>`;
    card.innerHTML = `` + (testing ? "" : `<h2>The real road to WWII</h2>`) + (shown === 0 ? quote : "");
    const ch = document.createElement("div"); ch.className = "chain";
    LINKS.slice(0, shown).forEach((L, i) => {
      if (i) ch.appendChild(el(`<div class="joint" aria-hidden="true"></div>`).firstChild);
      const now = i === shown - 1 && !testing;
      if (!now) { ch.appendChild(el(`<div class="link mini"><span class="link-i" aria-hidden="true">${L.i}</span><span class="year">${L.year}</span><b>${L.m}</b></div>`).firstChild); return; }
      ch.appendChild(el(`<div class="link"><span class="link-i" aria-hidden="true">${L.i}</span><span class="year">${L.year}</span><div><b>${L.t}</b><br><span class="cause">🔗 <span>${L.link}</span></span></div></div>`).firstChild);
    });
    if (shown) card.appendChild(ch);
    app.appendChild(card);
    if (!testing) { app.appendChild(nextBtn(shown === LINKS.length ? "Test his warning →" : shown ? "Next link →" : "Was he right? →", () => { st.chain = (st.chain || 0) + 1; save(); rerender([shown === LINKS.length ? ".check" : ".link:last-child"]); })); return; }
    card.appendChild(checkWidget("chain", () => rerender(["button.go"])));
    if (st.checks.chain && st.checks.chain.done) {
      const mine = future(st.picks).end;
      card.appendChild(el(`<div class="result"><p><b><span>Your ending:</span> <span>${ENDINGS[mine].name}</span>. <span>Real history:</span> <span>${ENDINGS["1940"].name}</span>.</b></p></div>`).firstChild);
      app.appendChild(nextBtn("Last step: write and turn in →", advance));
    }
  }

  const PROMPTS = [
    { id: "w1", short: "Compare", label: "1. Your treaty vs. 1919", stem: "I wrote ___. The real treaty ___. My choice led to ___.",
      must: ["blame", "guilt", "kaiser", "trial", "pay", "paid", "bill", "reparation", "money", "army", "armies", "soldier", "troop", "disarm", "limit", "weapon", "rhineland", "border", "map", "countr", "colon", "poland", "freedom", "league", "anger", "angry", "mad", "strongman", "hitler", "depression", "economy", "safe", "walk"],
      mustMsg: "Name one real clause you wrote (blame, payments, army, Rhineland, new map, or League) and what it did." },
    { id: "w2", short: "Explain why", label: "2. How the treaty led to WWII", stem: "The treaty led to WWII because ___. My evidence is ___.",
      must: ["blame", "guilt", "231", "pay", "paid", "reparation", "bill", "money", "debt", "land", "territor", "army", "soldier", "troop", "rhineland", "hitler", "anger", "angry", "mad", "revenge", "humiliat", "cartoon", "1940", "dyson", "child", "depression", "inflation", "lloyd", "unfair", "harsh", "punish", "diktat", "forced"],
      mustMsg: "Name a real piece of evidence: a treaty term (blame, payments, army, land), a cartoon, or a link from the chain." }
  ];
  function writeScreen() {
    $("meterWrap").hidden = true;
    const r = future(st.picks);
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<div class="memo-head"><span class="memo-icon" aria-hidden="true">📨</span><div><p class="kicker">Memo · 1945</p><h2>What went wrong in 1919?</h2></div></div>
      <div class="memo">
      ${PROMPTS.map(p => `<label for="${p.id}">${p.label}</label><p class="stem">✏️ <b>${p.stem}</b></p><textarea id="${p.id}" placeholder="${p.stem}"></textarea>`).join("")}
      <label for="studentName">First name + last initial</label>
      <input id="studentName" type="text" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)">
      </div>
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p class="msg" id="sendMsg" role="status" aria-live="polite"></p>
      ${st.turnedIn ? `<p class="turned" id="turnedBox">✓ Turned in</p>` : ""}
      <details class="sources"><summary>Sources</summary><p>Treaty of Versailles (1919), Articles 42–43, 119, 156, 160, 227, 231, 428 and Part I (League of Nations). Woodrow Wilson, Fourteen Points (Jan. 8, 1918) and speech to Congress (Feb. 11, 1918). David Lloyd George, Fontainebleau Memorandum (March 25, 1919). Cartoons: Will Dyson, Daily Herald, May 1919; Luther D. Bradley, Chicago Daily News, 1915 (Library of Congress); Lute Pease, “Lenine calls for return of intellectuals,” about 1921 (Library of Congress); a European cartoon of Gandhi and India, from the Gandhi Heritage Portal’s collection “Gandhi in Cartoons” (page 46); Herbert Block, “The Philanthropist,” December 5, 1930 (Library of Congress). The treaty writer is a made-up role, and the “Your future” years are a what-if built from real causes.</p></details>`;
    app.appendChild(card);
    PROMPTS.forEach(p => { const t = $(p.id); t.value = st.writing[p.id] || ""; t.addEventListener("input", () => { st.writing[p.id] = t.value; save(); }); });
    const nm = $("studentName"); nm.value = st.name || ""; nm.addEventListener("input", () => { st.name = nm.value; save(); });
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    msg.className = "msg";
    for (const p of PROMPTS) {
      const box = $(p.id), v = box.value.trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: isEs() ? T(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (isEs() ? "En " + T(p.short) : "For " + p.short) + ": " + junk; return; }
      }
      if (/_{2,}/.test(v)) { msg.className = "msg bad"; msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; box.focus(); return; }
      if (v.split(/\s+/).filter(Boolean).length < 10) { msg.className = "msg bad"; msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; box.focus(); return; }
      const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      if (p.must) {
        const extra = (window.SiteLang && window.SiteLang.must(p.id)) || [];
        const words = p.must.concat(...extra);
        if (!words.some(w => plain(v).includes(plain(w)))) { msg.className = "msg bad"; msg.textContent = p.mustMsg; box.focus(); return; }
      }
    }
    const nameBox = $("studentName");
    const name = window.classShortName ? window.classShortName(nameBox.value) : nameBox.value.trim();
    if (!/^\S+ [A-Z]\.$/.test(name)) { msg.className = "msg bad"; msg.textContent = "Type your first name and last initial, like Jordan M."; nameBox.focus(); return; }
    st.name = name; save();

    const r = future(st.picks);
    const answers = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => st.checks[id] && st.checks[id].done && !st.checks[id].wrong).length;
    answers["First-try correct"] = right + " of " + CHECK_IDS.length;
    const by = {};
    CHECK_IDS.forEach(id => { const s = CHECKS[id].std; by[s] = by[s] || [0, 0]; by[s][1]++; if (st.checks[id] && st.checks[id].done && !st.checks[id].wrong) by[s][0]++; });
    answers["First-try by standard"] = Object.keys(by).sort().map(k => k + ": " + by[k][0] + " of " + by[k][1]).join(" · ");
    CHECK_IDS.forEach(id => { const w = (st.checks[id] && st.checks[id].wrong) || 0; answers[CHECKS[id].short] = CHECKS[id].options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    CLAUSES.forEach((c, i) => { answers["Choice · Clause " + (i + 1) + " " + c.short] = c.opts[st.picks[i]].t; });
    answers["Aftershock stamps"] = AFTER.map(a => a.place + ": " + (((st.stampMiss || {})[a.id] || 0) ? (st.stampMiss[a.id] + " wrong") : "first try")).join(" · ");
    answers["Ending reached"] = ENDINGS[r.end].name;
    answers["Clauses that matched the real treaty"] = CLAUSES.filter((c, i) => st.picks[i] === REAL[i]).length + " of 6";
    const gone = LEADERS.filter(L => r.out[L.k]).map(L => L.name);
    answers["Leaders who walked out"] = gone.length ? gone.join(", ") : "None";
    answers["Final meters"] = "Germany's anger " + r.m.A + " · France's safety " + r.m.S + " · Economy " + r.m.E + " · League " + r.m.L;
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = $(p.id).value.trim(); });

    btn.disabled = true; msg.textContent = "Sending your work…";
    try {
      const res = await window.classTurnIn(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: name, assignmentId: ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.className = "msg good"; msg.textContent = "Turned in! You're done.";
      btn.textContent = "Turned in ✓";
      if (!$("turnedBox")) btn.insertAdjacentHTML("afterend", `<p class="turned" id="turnedBox">✓ Turned in</p>`);
      btn.disabled = false;
    } catch (err) {
      msg.className = "msg bad"; msg.textContent = (err && err.message) || "Could not turn in. Try again."; btn.disabled = false;
    }
  }

  // ---------------- Router ----------------
  function render() {
    header();
    app.innerHTML = "";
    if (st.step < 0) return titleScreen();
    const s = STEPS[Math.min(st.step, STEPS.length - 1)].id;
    if (s === "brief") return briefScreen();
    if (s[0] === "c" && s.length === 2) return clauseScreen(+s[1]);
    if (s === "sign") return signScreen();
    if (s === "future") return futureScreen();
    if (s === "real") return realScreen();
    if (s === "dyson") return dysonScreen();
    if (s === "china") return chinaScreen();
    if (s === "after") return afterScreen();
    if (s === "chain") return chainScreen();
    return writeScreen();
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };

  render();
  if (hadSave && st.step >= 0) {
    const n = Math.min(st.step + 1, STEPS.length);
    const w = document.createElement("p"); w.className = "welcome"; w.id = "welcome"; w.setAttribute("role", "status");
    w.textContent = "Welcome back! You're on step " + n + " of " + STEPS.length + ": " + STEPS[Math.min(st.step, STEPS.length - 1)].name + ".";
    app.insertBefore(w, app.firstChild);
  }

  // For testing only: lets a test script read the model. Changes nothing.
  window.__peace = { simulate, signing, future, CLAUSES, REAL };
})();
