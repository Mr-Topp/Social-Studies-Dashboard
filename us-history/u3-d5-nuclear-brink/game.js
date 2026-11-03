// =====================================================================
//  THIRTEEN DAYS: CRISIS ROOM  (U.S. History · Unit 3 · Day 3)
//  The Cuban Missile Crisis, Oct. 16–28, 1962, as a 13-day countdown.
//  Core loop: each day an event hits the crisis room, the student plays one move card,
//  and the board reacts: DEFCON / war danger, the Soviet missile-building clock, U.S. firmness,
//  and Gen. Stone (a made-up hawk) who always pushes the biggest move.
//  The tension that models the day's idea: look weak and the missiles stay; push too hard and
//  DEFCON hits 1. Only "firm + a way out" (the real Kennedy path) gets the deal.
//  Hitting DEFCON 1 before the last day = a labeled what-if, then "rewind to this morning".
//  5 evidence checks live in the world (spy photo, TV speech, UN, Letter 1, the deal).
//  Word budget (Fynn, 2026-11-03): ≤35 words per screen, short cards, one-line reveals.
//  Turn-in: shared/turnin.js classTurnIn, same payload shape as shared/unit-game.js finish().
//  Spanish: es.js sets window.CRISIS_ES (keys = the exact English strings below).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u3-d5-nuclear-brink-v2";
  const CFG = {
    assignmentId: "ush-u3-d5-nuclear-brink",
    title: "U.S. History · Unit 3 · Day 3 · Thirteen Days: Crisis Room",
    standard: "SS.9-12.US.37, SS.9-12.US.40",
    oldApi: "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit"
  };
  const TOTAL = 12;
  const LOCK = 5;

  // ---------- language helpers ----------
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  window.__crisisMiss = window.__crisisMiss || new Set();
  function L(s) {
    if (!isEs()) return s;
    const d = window.CRISIS_ES || {};
    if (d[s] != null) return d[s];
    window.__crisisMiss.add(s);
    return s;
  }
  function F(s, o) { return L(s).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m)); }
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const clone = o => JSON.parse(JSON.stringify(o));

  // ---------- state ----------
  function fresh() {
    return { v: 2, name: "", step: 0, phase: 0, m: { risk: 2, ready: 20, firm: 3 }, stone: 0, f: {}, found: [],
      picks: {}, pickTitles: {}, wrong: {}, done: {}, trail: [], writing: {}, result: null, turnedIn: false,
      snap: null, booms: [], ending: null, ticked: {}, flipped: [] };
  }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 2 || !st.m) st = fresh();
  if (!Array.isArray(st.flipped)) st.flipped = [];
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const clampM = () => {
    const m = st.m;
    m.risk = Math.max(0, Math.min(10, m.risk));
    m.ready = Math.max(0, Math.min(100, m.ready));
    m.firm = Math.max(0, Math.min(10, m.firm));
    st.stone = Math.max(-4, Math.min(4, st.stone));
  };
  const defcon = r => r >= 10 ? 1 : r >= 7 ? 2 : r >= 5 ? 3 : r >= 3 ? 4 : 5;
  function isOpener() { return st.step === 1 && st.phase === 0; }   // step 1, phase 0 = "Before the crisis: 1950s fear"
  let pending = null;
  function applyFx(fx) {
    ["risk", "ready", "firm"].forEach(k => { if (fx[k]) st.m[k] += fx[k]; });
    if (fx.stone) st.stone += fx.stone;
    const hit = st.m.risk >= 10;
    clampM();
    pending = Object.assign({}, fx);
    return hit;
  }
  const sg = n => (n > 0 ? "+" : "−") + Math.abs(n);
  function fxTags(fx) {
    const out = [];
    if (fx.risk) out.push(`<span class="tag ${fx.risk > 0 ? "down" : "up"}">☢️ ${sg(fx.risk)} ${esc(L("danger"))}</span>`);
    if (fx.ready) out.push(`<span class="tag ${fx.ready > 0 ? "down" : "up"}">🚀 ${sg(fx.ready)}%</span>`);
    if (fx.firm) out.push(`<span class="tag ${fx.firm > 0 ? "up" : "down"}">💪 ${sg(fx.firm)} ${esc(L("firmness"))}</span>`);
    return out.join("");
  }
  function fxText(fx) {
    const out = [];
    if (fx.risk) out.push("danger " + sg(fx.risk));
    if (fx.ready) out.push("missiles " + sg(fx.ready) + "%");
    if (fx.firm) out.push("firmness " + sg(fx.firm));
    return out.join(", ");
  }

  // ---------- characters ----------
  const WHO = {
    aide: ["🧑‍💼", "Your aide"], analyst: ["🕵️", "Photo analyst"], stone: ["🎖️", "Gen. Stone"], navy: ["⚓", "Navy radio"],
    stevenson: ["🎙️", "Adlai Stevenson, U.S. at the UN"], radio: ["📻", "Radio Moscow"], khr: ["🧔", "Khrushchev"],
    reel: ["🎞️", "1950s newsreel"]
  };
  const bub = (who, text) => `<div class="bub ${who}"><span class="av" aria-hidden="true">${WHO[who][0]}</span><div class="bt"><b>${esc(L(WHO[who][1]))}</b><p>${L(text)}</p></div></div>`;
  const bubbles = list => list && list.length ? `<div class="bubbles">${list.map(b => bub(b[0], b[1])).join("")}</div>` : "";
  const realLine = (line, src) => `<div class="real"><p><b class="real-b">📜 ${esc(L("Real"))}</b> ${L(line)}</p>${src ? `<p class="src">${esc(L("Source:"))} ${L(src)}</p>` : ""}</div>`;
  const srcLine = t => `<p class="src">${L(t)}</p>`;
  const fict = t => `<p class="fict">${esc(L(t))}</p>`;
  const newWord = html => `<div class="reveal"><span class="nw">💡 ${esc(L("NEW WORD"))}</span><p>${L(html)}</p></div>`;

  // ---------- calendar ----------
  const DAYS = { 1: [1, "TUE", 16], 2: [5, "SAT", 20], 3: [7, "MON", 22], 4: [9, "WED", 24], 5: [10, "THU", 25], 6: [11, "FRI", 26], 7: [12, "SAT", 27], 8: [12, "SAT", 27], 9: [12, "SAT", 27], 10: [13, "SUN", 28], 11: [13, "SUN", 28], 12: [13, "SUN", 28] };
  const dayOf = s => DAYS[Math.max(1, Math.min(TOTAL, s))];

  // ---------- HUD ----------
  function stoneMood() {
    const s = st.stone;
    if (s <= -3) return ["😡", "furious"];
    if (s <= -1) return ["😠", "angry"];
    if (s === 0) return ["😐", "watching"];
    if (s <= 2) return ["😏", "pleased"];
    return ["😁", "thrilled"];
  }
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const m = st.m, d = dayOf(st.step), dc = defcon(m.risk);
    if (isOpener()) {   // "Before the crisis" round: the calendar shows the 1950s, not a crisis day
      $("calDay").textContent = L("BEFORE"); $("calNum").textContent = "’50s"; $("calMo").textContent = "1950s";
      $("dayText").textContent = L("BEFORE THE CRISIS · 1950s");
    } else {
    $("calDay").textContent = F("DAY {n}", { n: d[0] });
    $("calNum").textContent = d[2];
    $("calMo").textContent = L(d[1]) + " · " + L("OCT");
    $("dayText").textContent = F("DAY {n} OF 13", { n: d[0] }) + " · " + L(d[1]) + " " + L("OCT") + " " + d[2];
    }
    $("stepText").textContent = F("Step {x} of {y}", { x: Math.min(st.step, TOTAL), y: TOTAL });
    $("stepFill").style.width = Math.round(Math.min(st.step, TOTAL) / TOTAL * 100) + "%";
    $("dcNum").textContent = dc; $("dcNum").className = "dc d" + dc;
    $("dcLab").innerHTML = esc(F("DEFCON {n}", { n: dc })) + `<span class="dsuf"> · ${esc(L(dc === 1 ? "nuclear war" : dc === 2 ? "one step from war" : "war danger"))}</span>`;
    $("mRisk").style.width = m.risk * 10 + "%"; $("nRisk").textContent = m.risk + "/10";
    $("mReady").style.width = m.ready + "%"; $("nReady").textContent = m.ready + "%";
    $("readyLab").textContent = L(m.ready >= 100 ? "Missiles READY TO FIRE" : "Soviet missiles ready");
    $("mFirm").style.width = m.firm * 10 + "%"; $("nFirm").textContent = m.firm + "/10";
    const sm = st.step >= 10 && st.ending === "nuke" ? ["😶", "silent"] : stoneMood();
    $("stoneFace").textContent = sm[0]; $("stoneMood").textContent = L(sm[1]);
    $("hudRisk").classList.toggle("warn", m.risk >= 7);
    $("hudReady").classList.toggle("warn", m.ready >= 100);
    $("hudFirm").classList.toggle("warn", m.firm < 5);
  }
  function pops(fx) {
    const map = { risk: ["hudRisk", "☢️"], ready: ["hudReady", "🚀"], firm: ["hudFirm", "💪"], stone: ["hudStone", "🎖️"] };
    Object.keys(map).forEach(k => {
      const n = fx[k]; if (!n) return;
      const el = $(map[k][0]); if (!el) return;
      const good = k === "firm" ? n > 0 : k === "stone" ? n < 0 : n < 0;
      const p = document.createElement("span");
      p.className = "pop " + (good ? "good" : "bad");
      p.textContent = sg(n) + (k === "ready" ? "%" : "") + " " + map[k][1];
      p.setAttribute("aria-hidden", "true");
      el.appendChild(p);
      el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
      setTimeout(() => p.remove(), 2000);
    });
  }

  // ---------- scene frame ----------
  function scene(o) {
    const d = dayOf(st.step);
    const chap = o.chap ? L(o.chap) : F("Day {n}", { n: d[0] }) + " · " + L(d[1]) + " " + L("Oct.") + " " + d[2] + ", 1962";
    return `<section class="scene ${o.stage || ""}${o.black ? " black" : ""}">
      <div class="sc-top"><span class="chap">${esc(chap)}</span><h2>${esc(L(o.title))}</h2></div>
      <div class="stage${o.bubbles && o.bubbles.length ? "" : " bare"}"><div class="stage-art" aria-hidden="true">${o.art || ""}</div>${bubbles(o.bubbles)}</div>
      <div class="sc-body">${o.body || ""}</div></section>`;
  }
  const nextBtn = (label) => `<button type="button" class="go" id="nextBtn">${esc(L(label || "Next →"))}</button>`;
  function wireNext(fn) { const b = $("nextBtn"); if (b) b.onclick = fn || (() => goStep(st.step + 1)); }
  function toPhase(p) { st.phase = p; save(); render(); window.scrollTo(0, 0); }

  // Entering a step: the missile clock ticks, events fire, then a snapshot for "rewind".
  const TICK = { 2: 10, 3: 15, 4: 15, 5: 15, 6: 15, 7: 15, 9: 10 };
  function goStep(n) {
    st.step = n; st.phase = 0; st.result = null;
    if (!st.ticked[n]) {
      st.ticked[n] = true;
      const fx = {};
      if (TICK[n]) fx.ready = TICK[n];
      if (n === 7) fx.risk = Math.min(2, 9 - st.m.risk) > 0 ? Math.min(2, 9 - st.m.risk) : 0;   // U-2 shot down: danger jumps (never straight to war)
      if (Object.keys(fx).some(k => fx[k])) { applyFx(fx); if (n === 7 && fx.risk) st.trail.push({ label: "U-2 shot down (event)", fx: { risk: fx.risk } }); }
      st.snap = clone({ m: st.m, stone: st.stone, f: st.f, trail: st.trail, picks: st.picks, pickTitles: st.pickTitles });
    }
    save(); render(); window.scrollTo(0, 0);
  }

  // =====================================================================
  //  EVIDENCE CHECKS (in-world). options[0] is right; shown shuffled.
  // =====================================================================
  const CHECKS = {
    c0: { std: "US.40", short: "1950s fear: how it changed home life", who: "reel", kind: "reelq", icon: "🎞️", stamp: "ON FILM",
      prompt: "How did fear change home life?",
      options: ["Kids drilled for attacks, and the U.S. spent on science", "Families stopped buying cars and moved back to cities", "Schools cut science classes to pay for more bombs", "Fear ended once the U.S. tested its H-bomb"],
      hint: "Look at the desk-drill and Sputnik cards." },
    c1: { std: "US.40", short: "U-2 photo: what it proves", who: "analyst", kind: "board", icon: "🔍", stamp: "CONFIRMED",
      prompt: "So what does this photo prove?",
      options: ["Soviets are building missile bases in Cuba", "Cuba is building a new airport runway", "U.S. troops have already landed on the island", "U.S. missiles are being shipped to Cuba"],
      hint: "Read the labels you found." },
    c2: { std: "US.37", short: "Kennedy's warning: missile from Cuba = Soviet attack", who: "aide", kind: "tv", icon: "📺", stamp: "ON AIR",
      prompt: "What's the warning to Moscow?",
      options: ["A missile from Cuba means the U.S. hits the USSR", "The U.S. will fight back against Cuba only", "The UN will vote before anyone is allowed to fight back", "Cuba may keep missiles not aimed at the U.S."],
      hint: "Who gets blamed for a missile from Cuba?" },
    c3: { std: "US.40", short: "UN: spy photos as proof", who: "stevenson", kind: "un", icon: "🏛️", stamp: "EXPOSED",
      prompt: "Why show our spy photos to the whole world?",
      options: ["To prove the Soviets lied about the missiles", "To show off how good U.S. cameras were", "To ask the UN to send its own peace troops to Cuba", "To scare Cuba into holding new elections"],
      hint: "The Soviets had said there were no missiles." },
    c4: { std: "US.40", short: "Letter 1: Khrushchev's offer", who: "aide", kind: "letter", icon: "📜", stamp: "DECODED",
      prompt: "What is Khrushchev offering?",
      options: ["Missiles go if the U.S. won't invade Cuba", "Missiles go if the U.S. pays for them", "Cuba gets invaded unless the quarantine ends", "The USSR gives up Berlin to keep Cuba"],
      hint: "Armaments = weapons. What's his condition?" },
    c5: { std: "US.37", short: "How the crisis ended: both sides gave", who: "aide", kind: "letter", icon: "⚖️", stamp: "DEAL",
      prompt: "So who won?",
      options: ["Both sides gave something up to make a deal", "The U.S. won by force and gave up nothing", "The USSR won and kept its missiles in Cuba", "The UN forced both sides to leave Cuba and Turkey"],
      hint: "Look at both columns." }
  };
  const CHECK_ORDER = ["c0", "c1", "c2", "c3", "c4", "c5"];

  let lockTimer = null;
  function mountCheck(id, onDone) {
    const q = CHECKS[id];
    const box = $("checkBox");
    if (!box) return;
    clearTimeout(lockTimer);
    box.innerHTML = `<div class="check ${q.kind}"><p class="qlabel" aria-hidden="true">${q.icon}</p>${bub(q.who, q.prompt)}<p class="msg" id="qMsg" role="status" aria-live="polite"></p><div class="choices" id="qChoices"></div></div>`;
    const area = $("qChoices"), msg = $("qMsg");
    let locked = false, last = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(q.options.map((t, n) => n));
      if (order.join() === last && order.length > 1) order.push(order.shift());
      last = order.join();
      order.forEach(n => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "choice reply";
        b.innerHTML = `<span class="r-ico" aria-hidden="true">💬</span><span class="r-t">${esc(L(q.options[n]))}</span>`;
        b.onclick = () => {
          if (locked) return;
          if (n === 0) {
            st.done[id] = true;
            if (window.classFirstTry) window.classFirstTry.right(id);
            save(); onDone();
          } else {
            st.wrong[id] = (st.wrong[id] || 0) + 1;
            if (window.classFirstTry) window.classFirstTry.wrong();
            save();
            b.classList.add("shake");
            locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
            let left = LOCK;
            const tick = () => {
              msg.className = "msg try";
              if (left <= 0) { locked = false; msg.textContent = F("✖ {h}", { h: L(q.hint) }); draw(); return; }
              msg.textContent = F("✖ {h} ⏳ {n}", { h: L(q.hint), n: left });
              left--; lockTimer = setTimeout(tick, 1000);
            };
            tick();
          }
        };
        area.appendChild(b);
      });
    }
    draw();
  }
  let justSolved = null;
  const checkDone = id => `<div class="check done"><span class="stamp${justSolved === id ? " slam" : ""}">✔ ${esc(L(CHECKS[id].stamp))}</span></div>`;
  const solved = (id, after) => () => { justSolved = id; if (after) after(); save(); render(true); };

  // =====================================================================
  //  MOVE CARDS
  // =====================================================================
  function chipsFor(c) {
    const fx = typeof c.fx === "function" ? c.fx() : c.fx;
    const out = [];
    if (fx.risk) {
      const doom = fx.risk > 0 && st.m.risk + fx.risk >= 10;
      out.push(`<span class="chip ${doom ? "doom" : fx.risk > 0 ? "c" : "g"}">☢️ ${sg(fx.risk)}${doom ? " ⚠️" : ""}</span>`);
    } else out.push(`<span class="chip n">☢️ 0</span>`);
    if (fx.ready) out.push(`<span class="chip ${fx.ready > 0 ? "c" : "g"}">🚀 ${sg(fx.ready)}%</span>`);
    if (fx.firm) out.push(`<span class="chip ${fx.firm > 0 ? "g" : "c"}">💪 ${sg(fx.firm)}</span>`);
    return out.join("");
  }
  function mountChoices(choices, onPick) {
    const box = $("choiceBox");
    box.innerHTML = `<p class="pick-h">${esc(L("Play a card:"))}</p><div class="cards n${choices.length}" id="cChoices"></div>`;
    const area = $("cChoices");
    choices.forEach((c, i) => {
      const b = document.createElement("button");
      const warred = (st.warCards && st.warCards[st.step] || []).includes(c.title);
      b.type = "button"; b.className = "dcard" + (c.hawk ? " hawk" : "") + (warred ? " warred" : "");
      if (warred) { b.disabled = true; b.setAttribute("aria-label", L(c.title) + ": " + L("caused a nuclear war")); }
      b.innerHTML = `${warred ? `<span class="hawk-tag">💥 ${esc(L("CAUSED WAR"))}</span>` : c.hawk ? `<span class="hawk-tag">🎖️ ${esc(L("STONE'S PICK"))}</span>` : ""}<span class="d-ico" aria-hidden="true">${c.icon}</span><b class="d-t">${esc(L(c.title))}</b><span class="d-l">${esc(L(c.line))}</span><span class="d-chips">${chipsFor(c)}</span>`;
      b.onclick = () => onPick(i);
      area.appendChild(b);
    });
  }
  function decide(stepId, c, label) {
    const fx = typeof c.fx === "function" ? c.fx() : c.fx;
    st.pickPhase = st.phase;
    st.picks[stepId] = c.title + " (" + c.line + ")";
    st.pickTitles[stepId] = c.title;
    const hit = applyFx(fx);
    if (c.flag) Object.assign(st.f, c.flag);
    st.trail.push({ label: c.trail || c.title, fx: Object.assign({}, fx) });
    st.result = { fx, text: c.result, who: c.who, icon: c.icon, whatif: !!c.whatif };
    if (hit && st.step < 9) {
      st.booms.push({ day: dayOf(st.step)[0], card: c.title });
      st.warCards = st.warCards || {}; (st.warCards[st.step] = st.warCards[st.step] || []).push(c.title);
      st.phase = 8;
    } else st.phase = 9;
    if (c.after) c.after();
    save(); render(); window.scrollTo(0, 0);
  }
  function resultHtml(r, stepId) {
    if (!r) return "";
    const stamp = st.pickTitles[stepId] ? `<span class="stamp slam">✔ ${esc(L(st.pickTitles[stepId]))}</span>${r.whatif ? `<span class="whatif">${esc(L("WHAT-IF"))}</span>` : ""}` : "";
    return `<div class="result flip" id="resultBox"><div class="r-big" aria-hidden="true">${r.icon || ""}</div><div class="r-main">${stamp}<div class="tags">${fxTags(r.fx)}</div>${r.who ? bub(r.who, r.text) : `<p>${L(r.text)}</p>`}</div></div>`;
  }
  // Rewind after a what-if nuclear war (before the last day).
  function boomScreen(app, base) {
    const b = st.booms[st.booms.length - 1] || {};
    const body = `<div class="boom"><p style="font-size:3rem;margin:0" aria-hidden="true">☢️</p><h3>${esc(L("DEFCON 1"))}</h3>
      <p>${esc(F("WHAT-IF: “{c}” set off a nuclear war.", { c: L(b.card || "") }))}</p>
      <p>${esc(L("Each move made the other side push back harder."))}</p></div>` +
      `<button type="button" class="go rew" id="rewBtn">⏪ ${esc(L("Rewind to this morning"))}</button>`;
    app.innerHTML = scene(Object.assign({}, base, { stage: "st-boom", art: "", bubbles: [], title: "What-if" }));
    app.querySelector(".sc-body").innerHTML = body;
    $("rewBtn").onclick = () => {
      if (st.snap) { const s = clone(st.snap); st.m = s.m; st.stone = s.stone; st.f = s.f; st.trail = s.trail; st.picks = s.picks; st.pickTitles = s.pickTitles; }
      st.phase = st.pickPhase || 0; st.result = null; save(); render(); window.scrollTo(0, 0);
    };
  }
  // A decision step: intro (optional) → evidence + check (optional) → move cards → result.
  function decisionStep(app, o) {
    const base = { title: o.title, stage: o.stage, art: o.art, black: o.black };
    if (st.phase === 8) return boomScreen(app, base);
    if (st.phase === 9) {
      const extra = typeof o.afterBody === "function" ? o.afterBody() : (o.afterBody || "");
      app.innerHTML = scene(Object.assign({}, base, { body: resultHtml(st.result, o.id) + extra + (o.real ? realLine(o.real[0], o.real[1]) : "") + (o.reveal ? newWord(o.reveal) : "") + nextBtn(o.nextLabel) }));
      return wireNext(o.next);
    }
    if (o.intro && st.phase === 0) {
      app.innerHTML = scene(Object.assign({}, base, { bubbles: o.intro.say, body: (o.intro.body || "") + nextBtn(o.intro.next) }));
      return wireNext(() => toPhase(1));
    }
    if (o.check && !st.done[o.check]) {
      app.innerHTML = scene(Object.assign({}, base, { bubbles: o.checkSay, body: (o.evidence || "") + `<div id="checkBox"></div>` }));
      return mountCheck(o.check, solved(o.check));
    }
    const say = typeof o.say === "function" ? o.say() : o.say;
    const body = typeof o.body === "function" ? o.body() : (o.body || "");
    app.innerHTML = scene(Object.assign({}, base, { bubbles: say, body: (o.check ? checkDone(o.check) : "") + body + `<div id="choiceBox"></div>` }));
    const ch = o.choices();
    mountChoices(ch, i => decide(o.id, ch[i]));
  }

  // =====================================================================
  //  STEPS
  // =====================================================================
  const S = {};

  // ---- 1 · The photos (photo hunt + check 1) ----
  const SPOTS = [
    { id: "trailers", x: 27, y: 62, label: "MISSILE TRAILERS" },
    { id: "launcher", x: 58, y: 44, label: "MISSILE LAUNCHER" },
    { id: "tents", x: 80, y: 73, label: "TENTS FOR TROOPS" }
  ];
  function u2Svg() {
    let trees = "";
    const T = [[40, 90], [80, 120], [60, 300], [110, 360], [640, 90], [690, 140], [600, 380], [670, 340], [330, 380], [380, 400], [250, 110], [470, 110], [520, 380], [150, 200], [690, 250]];
    T.forEach(([x, y], i) => { trees += `<circle cx="${x}" cy="${y}" r="${18 + (i % 3) * 6}" fill="#3e4636"/><circle cx="${x + 18}" cy="${y + 8}" r="${14 + (i % 2) * 5}" fill="#454d3c"/>`; });
    let tents = "";
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) tents += `<polygon points="${540 + c * 26},${300 + r * 22} ${552 + c * 26},${288 + r * 22} ${564 + c * 26},${300 + r * 22}" fill="#d9d6c8" stroke="#555" stroke-width="1"/>`;
    let trailers = "";
    for (let i = 0; i < 4; i++) trailers += `<g transform="rotate(-18 ${150 + i * 34} ${255 + i * 10})"><rect x="${120 + i * 34}" y="${250 + i * 10}" width="70" height="10" rx="4" fill="#e8e4d6" stroke="#444"/><rect x="${116 + i * 34}" y="${251 + i * 10}" width="8" height="8" fill="#777"/></g>`;
    return `<svg viewBox="0 0 720 420" role="img" aria-label="${esc(L("Drawing of a spy-plane photo: a jungle clearing with long missile trailers, a launcher, and rows of tents."))}">
      <defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .22"/></feComponentTransfer><feBlend in2="SourceGraphic" mode="multiply"/></filter></defs>
      <rect width="720" height="420" fill="#7d8070"/>
      <path d="M190 160 Q360 120 520 170 Q640 220 600 330 Q520 360 380 340 Q220 330 160 290 Q120 220 190 160Z" fill="#b3ae98"/>
      <path d="M0 210 Q120 190 200 230 Q320 280 420 250 Q560 210 720 260" stroke="#cfc9b2" stroke-width="16" fill="none"/>
      ${trees}${trailers}
      <rect x="380" y="170" width="120" height="34" rx="4" fill="#cfcab6" stroke="#444"/><rect x="392" y="180" width="96" height="10" rx="5" fill="#f2efe4" stroke="#333"/><line x1="380" y1="204" x2="365" y2="222" stroke="#333" stroke-width="3"/><line x1="500" y1="204" x2="515" y2="222" stroke="#333" stroke-width="3"/>
      ${tents}
      <rect width="720" height="420" fill="#000" opacity="0" filter="url(#grain)"/>
      <rect x="0" y="0" width="720" height="30" fill="#111"/><text x="12" y="20" fill="#fff" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="1">U-2 PHOTO · SAN CRISTÓBAL, CUBA · OCT. 14, 1962</text>
    </svg>`;
  }
  function boardHtml(interactive) {
    const spots = SPOTS.map(s => {
      const f = st.found.includes(s.id);
      if (!interactive && !f) return "";
      return `<button type="button" class="hot${f ? " found" : ""}" data-spot="${s.id}" style="left:${s.x}%;top:${s.y}%" aria-label="${esc(f ? L(s.label) : L("Look closer"))}"${f ? " disabled" : ""}>${f ? `<span class="tagl">${esc(L(s.label))}</span>` : ""}</button>`;
    }).join("");
    return `<div class="board">${u2Svg()}<span class="draw-note">${esc(L("GAME DRAWING"))}</span>${spots}</div>` +
      srcLine("Drawing based on the real CIA photo board. Real labels: “8 missile trailers,” “erector launcher equipment,” “tent areas.” Real photo: JFK Library.");
  }
  // ---- 1a · Before the crisis: 1950s fear (flip 4 newsreels + check 0) ----
  const REELS = [
    { id: "duck", icon: "🐢", yr: "1950s", t: "Duck and cover", l: "Kids drill under desks." },
    { id: "hbomb", icon: "💥", yr: "1952", t: "H-bomb", l: "Hundreds of times Hiroshima's power." },
    { id: "roads", icon: "🛣️", yr: "1956", t: "Interstates", l: "Partly for defense. Suburbs boom." },
    { id: "sputnik", icon: "🛰️", yr: "1957", t: "Sputnik", l: "U.S. pays for NASA, science." }
  ];
  function opener(app) {
    const base = { title: "Before the Crisis", chap: "1950s", stage: "st-reel", art: "📺" };
    const all = REELS.every(r => st.flipped.includes(r.id));
    const fear = st.flipped.length;
    const reels = `<div class="fearbar" aria-label="${esc(F("Fear at home: {n} of 4", { n: fear }))}"><span aria-hidden="true">😨</span><b>${esc(L("Fear at home"))}</b><div class="trk"><span style="width:${fear * 25}%"></span></div></div>` +
      `<div class="reels">${REELS.map(r => {
        const f = st.flipped.includes(r.id);
        return `<button type="button" class="reelc${f ? " on" : ""}" data-reel="${r.id}"${f ? " disabled" : ""} aria-label="${esc(f ? L(r.t) + ": " + L(r.l) : r.yr + " · " + L("tap to play"))}">
          <span class="r-yr">${esc(r.yr)}</span><span class="r-ic" aria-hidden="true">${f ? r.icon : "🎞️"}</span>${f ? `<b>${esc(L(r.t))}</b><span class="r-l">${esc(L(r.l))}</span>` : `<span class="r-tap">▶ ${esc(L("PLAY"))}</span>`}</button>`;
      }).join("")}</div>` +
      srcLine("Real events: “Duck and Cover” school film, 1952; “Ivy Mike” H-bomb test, Nov. 1, 1952; Interstate Highway Act, 1956; Sputnik, Oct. 4, 1957; NASA, 1958.");
    if (st.done.c0) {
      app.innerHTML = scene(Object.assign({}, base, { body: reels + checkDone("c0") + `<div id="after">${newWord("<b>Arms race</b> = U.S. and USSR racing to build more, bigger nukes.")}${nextBtn("To October 1962 →")}</div>` }));
      return wireNext(() => toPhase(1));
    }
    app.innerHTML = scene(Object.assign({}, base, { bubbles: [["reel", "Americans fear the bomb. Play all 4 reels."]], body: reels + (all ? `<div id="checkBox"></div>` : "") }));
    app.querySelectorAll(".reelc:not(.on)").forEach(b => b.onclick = () => {
      if (!st.flipped.includes(b.dataset.reel)) st.flipped.push(b.dataset.reel);
      save(); render();
      if (REELS.every(r => st.flipped.includes(r.id))) setTimeout(() => { const c = $("checkBox"); if (c && c.scrollIntoView) c.scrollIntoView({ behavior: "smooth", block: "center" }); }, 60);
    });
    if (all) mountCheck("c0", solved("c0"));
  }

  S[1] = app => {
    const art = "✈️";
    if (st.phase === 0) return opener(app);
    if (st.done.c1) {
      const body = checkDone("c1") + `<div id="after">` + realLine("1961, Bay of Pigs: CIA-trained Cuban exiles invaded. They lost in 3 days.", "About 1,400 exiles landed April 17, 1961. Afterward, Castro turned to the USSR for protection. JFK Library") +
        nextBtn("Call your crisis team →") + `</div>`;
      app.innerHTML = scene({ title: "The Photos", art, bubbles: [["analyst", "Why Cuba? Our invasion there failed last year."]], body });
      return wireNext();
    }
    const allFound = SPOTS.every(s => st.found.includes(s.id));
    const howto = !allFound ? `<div class="howto"><div><span class="hi" aria-hidden="true">☢️</span><b>${esc(L("DEFCON 1 = nuclear war. Avoid it."))}</b></div><div><span class="hi" aria-hidden="true">🚀</span><b>${esc(L("Missiles get built every day."))}</b></div><div><span class="hi" aria-hidden="true">💪</span><b>${esc(L("Look weak, and they stay."))}</b></div></div>` : "";
    const body = howto + boardHtml(true) + `<p class="found-n" id="foundN">🔍 ${esc(F("Tap the 3 circles. Found: {n} of 3", { n: st.found.length }))}</p>` + (allFound ? `<div id="checkBox"></div>` : "");
    app.innerHTML = scene({ title: "The Photos", art, bubbles: [["analyst", "Spy-plane photos from Cuba. Tap the circles."]], body });
    app.querySelectorAll(".hot:not(.found)").forEach(b => b.onclick = () => {
      if (!st.found.includes(b.dataset.spot)) st.found.push(b.dataset.spot);
      save(); render();
      if (SPOTS.every(s => st.found.includes(s.id))) setTimeout(() => { const c = $("checkBox"); if (c && c.scrollIntoView) c.scrollIntoView({ behavior: "smooth", block: "center" }); }, 60);
    });
    if (allFound) mountCheck("c1", solved("c1"));
  };

  // ---- 2 · The crisis team: first move ----
  const MOVE1 = [
    { icon: "✈️", title: "Airstrike", line: "Bomb the missile bases", hawk: true, fx: { risk: 3, ready: -40, firm: 2, stone: 2 }, flag: { struck: true, q: true }, who: "stone", whatif: true,
      result: "Direct hits! But we can't promise we got them all." },
    { icon: "🪖", title: "Invasion", line: "Troops land in about a week", fx: { risk: 3, firm: 3, stone: 2 }, flag: { invade: true, q: true }, who: "stone", whatif: true,
      result: "Troops are pouring into Florida. Moscow sees it all." },
    { icon: "🚢", title: "Quarantine", line: "Navy stops ships bringing weapons", fx: { risk: 1, firm: 2, stone: -1 }, flag: { q: true }, who: "aide",
      result: "Navy ships head out. It gives the Soviet leader time to back down." },
    { icon: "✉️", title: "Talk first", line: "Private warning, nothing public", fx: { ready: 15, firm: -2, stone: -2 }, flag: { talk: true }, who: "aide", whatif: true,
      result: "Moscow's answer: the weapons are only “defensive.” Building speeds up." }
  ];
  S[2] = app => decisionStep(app, { id: "move1", title: "The Crisis Team", art: "🗂️",
    say: [["aide", "Your team is split. First move?"], ["stone", "Bomb them before they're ready!"]],
    body: realLine("A real general said the quarantine was as weak as giving in to Hitler.", "Gen. Curtis LeMay to Kennedy, Oct. 19, 1962: “almost as bad as the appeasement at Munich.” White House tapes, Miller Center") + fict("Gen. Stone is made up."),
    choices: () => MOVE1,
    real: ["Kennedy chose the quarantine on Oct. 20.", "JFK Library"],
    reveal: "<b>Containment</b> = the U.S. plan to stop communism from spreading." });

  // ---- 3 · The TV speech (check 2) ----
  const SPEECH = [
    { icon: "📺", title: "Firm warning", line: "Read the warning. Stay calm.", fx: { risk: 1, firm: 1 }, who: "aide",
      result: "Millions watched. Schools ran duck-and-cover drills." },
    { icon: "⏰", title: "Ultimatum", line: "48 hours, or we strike", hawk: true, fx: { risk: 3, firm: 3, stone: 2 }, who: "stone", whatif: true,
      result: "Now they know we mean it! Soviet forces go on full alert." },
    { icon: "🤫", title: "Stay quiet", line: "No speech. Keep it secret.", fx: { ready: 10, firm: -2, stone: -2 }, who: "aide", whatif: true,
      result: "Rumors spread. Moscow thinks you're scared." }
  ];
  function speechIntro() {
    if (st.f.struck) return "You bombed Cuba. Now explain it on TV.";
    if (st.f.invade) return "Troops are massing. Now go on TV.";
    if (st.f.talk) return "Talking failed. Now go on TV.";
    return "Tonight you go on TV.";
  }
  S[3] = app => decisionStep(app, { id: "speech", check: "c2", title: "The Speech", art: "📺",
    checkSay: [["aide", speechIntro()]],
    evidence: `<div class="tv"><div class="screen"><span class="live">● LIVE · OCT. 22, 1962</span><p class="q">“${esc(L("…any nuclear missile launched from Cuba… [is] an attack by the Soviet Union on the United States…"))}”</p><p class="gloss">${esc(L("“Full retaliatory response” = hit back with everything."))}</p></div></div>` + srcLine("President Kennedy, TV address, Oct. 22, 1962. JFK Library"),
    say: [["stone", "Give them 48 hours. Then we hit them."]],
    choices: () => SPEECH,
    real: ["Kennedy gave the firm warning. U.S. forces went to DEFCON 3.", "JFK Library; U.S. Air Force history"],
    reveal: "<b>Mutually assured destruction</b> = if one side fires nukes, both sides get destroyed." });

  // ---- 4 · The quarantine line ----
  function seaSvg() {
    const turned = st.phase === 9 && st.pickTitles.line && /Let them turn|Stop & search/.test(st.pickTitles.line);
    const fired = st.phase === 9 && st.pickTitles.line === "Warning shots";
    return `<div class="sea${turned ? " turned" : ""}${fired ? " fired" : ""}"><svg viewBox="0 0 720 230" role="img" aria-label="${esc(L("Map: Soviet ships sail toward a line of U.S. Navy ships around Cuba."))}">
      <rect width="720" height="230" fill="#2f79b8"/><path d="M0 60 Q360 20 720 60" stroke="#ffffff22" stroke-width="40" fill="none"/>
      <path d="M40 210 Q140 170 260 190 Q320 200 300 230 L40 230Z" fill="#6aa84f" stroke="#2c5d1f" stroke-width="3"/>
      <text x="120" y="218" fill="#fff" font-family="Arial Black,Arial" font-size="18" font-weight="900">CUBA</text>
      <path d="M380 230 Q420 110 560 20" stroke="#fff" stroke-width="4" stroke-dasharray="12 9" fill="none"/>
      <text x="300" y="40" fill="#fff" font-family="Arial,sans-serif" font-size="14" font-weight="900" letter-spacing="1">${esc(L("QUARANTINE LINE"))}</text>
      <text x="420" y="150" font-size="30">⚓</text><text x="470" y="95" font-size="30">⚓</text><text x="520" y="45" font-size="30">⚓</text>
      <g class="shipR" style="transform-origin:600px 120px"><text x="580" y="130" font-size="40">🚢</text><text x="640" y="80" font-size="34">🚢</text><text x="630" y="190" font-size="34">🚢</text></g>
      <circle class="flash" cx="560" cy="110" r="40" fill="#ffd166"/>
    </svg></div>`;
  }
  const rangeBox = () => `<div class="range"><span>🚀 ${esc(L("Missiles in Cuba can reach:"))}</span><span class="city">Washington, D.C.</span><span class="city">${esc(L("Cape Canaveral"))}</span><span class="city">${esc(L("Mexico City"))}</span></div>` + srcLine("Kennedy's list of cities in range. TV address, Oct. 22, 1962. JFK Library.");
  const LINE_Q = [
    { icon: "🛑", title: "Stop & search", line: "Board ships that cross", fx: { risk: 1, firm: 2, stone: 1 }, who: "navy",
      result: "We search one cargo ship. No weapons. The rest stay back." },
    { icon: "🔙", title: "Let them turn", line: "Let ships that turn back go", fx: { risk: -1, stone: -1 }, who: "navy",
      result: "Soviet ships stop dead in the water. Then they turn around." },
    { icon: "💥", title: "Warning shots", line: "Fire across their bows", hawk: true, fx: { risk: 3, firm: 2, stone: 2 }, who: "stone", whatif: true,
      result: "Shots fired! A Soviet sub is right below that ship." }
  ];
  const LINE_NOQ = [
    { icon: "🚢", title: "Quarantine now", line: "Navy stops weapon ships", fx: { risk: 1, firm: 3, stone: -1 }, flag: { q: true }, who: "navy",
      result: "Ships race out to set the line. Late, but it's there." },
    { icon: "✈️", title: "Airstrike now", line: "Bomb the missile bases", hawk: true, fx: { risk: 3, ready: -40, firm: 2, stone: 2 }, flag: { struck: true }, who: "stone", whatif: true,
      result: "Bombs away! Some missiles survive. Moscow is furious." },
    { icon: "⏳", title: "Keep talking", line: "Wait for Moscow to answer", fx: { ready: 15, firm: -1, stone: -2 }, who: "aide", whatif: true,
      result: "More ships unload in Cuba. Moscow stalls." }
  ];
  S[4] = app => decisionStep(app, { id: "line", title: "The Line", stage: "st-sea", art: "⚓",
    say: () => st.f.q ? [["navy", "Soviet ships nearing the line. Subs are with them."], ["stone", "Fire warning shots!"]]
      : [["navy", "No line at sea. Soviet ships are unloading in Cuba."], ["stone", "Enough talk. Bomb them!"]],
    body: () => rangeBox() + seaSvg(),
    choices: () => st.f.q ? LINE_Q : LINE_NOQ,
    afterBody: () => seaSvg(),
    real: ["Soviet ships stopped and turned back. “The other fellow just blinked.”", "Secretary of State Dean Rusk, Oct. 24, 1962"],
    reveal: "<b>Brinkmanship</b> = pushing to the edge of war so the other side backs down." });

  // ---- 5 · The UN showdown (check 3) ----
  S[5] = app => {
    const art = "🏛️";
    if (st.done.c3) {
      const body = checkDone("c3") + `<div id="after">${bubbles([["aide", "The world saw the proof. Allies back us now."]])}${nextBtn("Friday →")}</div>`;
      app.innerHTML = scene({ title: "The UN Showdown", stage: "st-un", art, body });
      return wireNext();
    }
    const body = `<div class="board" style="max-width:420px">${u2Svg()}<span class="draw-note">${esc(L("GAME DRAWING"))}</span></div>` +
      srcLine("Oct. 25, 1962: U.S. Ambassador Adlai Stevenson showed the spy photos at the UN. The Soviet ambassador would not answer. UN; JFK Library") + `<div id="checkBox"></div>`;
    app.innerHTML = scene({ title: "The UN Showdown", stage: "st-un", art, bubbles: [["stevenson", "“I am prepared to wait for my answer until hell freezes over.”"]], body });
    mountCheck("c3", solved("c3", () => { applyFx({ firm: 1 }); st.trail.push({ label: "Showed the photos at the UN", fx: { firm: 1 } }); }));
  };

  // ---- 6 · Letter 1 (check 4) + invasion forces ----
  const TROOPS = [
    { icon: "🪖", title: "Launch invasion", line: "Troops hit the beaches", hawk: true, fx: { risk: 4, firm: 2, stone: 2 }, flag: { launched: true }, who: "stone", whatif: true,
      result: "Troops are landing! Over 40,000 Soviet soldiers wait for them." },
    { icon: "⏸️", title: "Keep troops ready", line: "Ready, but don't go", fx: { risk: 1, firm: 1 }, who: "aide",
      result: "The troops wait in Florida. Moscow can see them." },
    { icon: "🏳️", title: "Stand down", line: "Send the troops home", fx: { risk: -1, firm: -2, stone: -2 }, who: "aide", whatif: true,
      result: "Danger drops. But Moscow wonders if you'll back down." }
  ];
  S[6] = app => decisionStep(app, { id: "troops", check: "c4", title: "Letter 1", art: "📜",
    checkSay: [["aide", "Letter 1 from Khrushchev!"]],
    evidence: `<div class="letters one"><div class="tele"><p class="th">📠 ${esc(L("KHRUSHCHEV, SOVIET LEADER"))}</p><p class="q">“${esc(L("…pull on the ends of the rope… the knot of war…"))}”</p><p><span class="ask">${esc(L("Promise not to invade Cuba, and “the question of armaments would disappear.”"))}</span></p></div></div>` + srcLine("Khrushchev to Kennedy, Oct. 26, 1962 (parts). JFK Library"),
    say: [["stone", "Invasion forces are ready. Just say go."]],
    body: `<div class="inv"><span>📜 ${esc(L("Letter 1 in hand"))}</span></div>`,
    choices: () => TROOPS,
    real: ["Kennedy kept the invasion force ready, but did not send it.", "JFK Library"],
    reveal: "<b>Deterrence</b> = making an attack too costly for the other side to try." });

  // ---- 7 · Black Saturday: U-2 shot down ----
  const PLANE = [
    { icon: "🕊️", title: "Hold fire", line: "Don't hit back today", fx: { firm: -1, stone: -2 }, who: "aide",
      result: "No strike. Gen. Stone storms out of the room." },
    { icon: "💣", title: "Bomb the site", line: "Hit the missile that fired", hawk: true, fx: { risk: 3, firm: 1, stone: 2 }, flag: { struck: true }, who: "stone", whatif: true,
      result: "Site destroyed. Soviet soldiers killed. Moscow must answer." }
  ];
  S[7] = app => decisionStep(app, { id: "plane", title: "Plane Down", stage: "st-black", black: true, art: "✈️💥",
    say: [["navy", "A U-2 was shot down over Cuba. The pilot is dead."], ["stone", "We said we'd hit back. Bomb that site!"]],
    body: realLine("Maj. Rudolf Anderson Jr., the crisis's only U.S. combat death.", "Oct. 27, 1962. U.S. Air Force; JFK Library"),
    choices: () => PLANE,
    real: ["Kennedy held fire. Soviet officers in Cuba fired without Moscow's OK.", "JFK Library; National Security Archive"],
    reveal: "<b>Escalation</b> = each attack leads to a bigger attack back." });

  // ---- 8 · Black Saturday: the submarine ----
  const SUB = [
    { icon: "💥", title: "Signal charges", line: "Small blasts: “Come up!”", fx: { risk: 2, firm: 1, stone: 1 }, flag: { charges: true }, who: "navy",
      result: "Blasts rock the sub. It still won't come up." },
    { icon: "👀", title: "Just follow it", line: "Track it. No blasts.", fx: { firm: -1, stone: -1 }, who: "navy", whatif: true,
      result: "We trail the sub all night. It slips away." }
  ];
  S[8] = app => decisionStep(app, { id: "sub", title: "The Submarine", stage: "st-sub", black: true, art: `<div class="sonar"><div class="sweep"></div><div class="blip"></div></div>`,
    say: [["navy", "Soviet sub under our ships. It won't come up."], ["stone", "Make it come up. Drop charges."]],
    choices: () => SUB,
    afterBody: () => `<div class="secret"><p class="sh">🔒 ${esc(L("INSIDE SUB B-59 · REAL"))}</p><p>${esc(L(st.f.charges ? "Your blasts did this:" : "Real U.S. ships did drop signal charges:"))}</p><p>${esc(L("The crew thought war had started. The captain wanted to fire a nuclear torpedo."))}</p><p>${esc(L("Officer Vasili Arkhipov said no."))}</p><p class="src">${esc(L("A crew member's later account. Some details are disputed. National Security Archive"))}</p></div>` });

  // ---- 9 · Letter 2: the final call ----
  const FINAL = [
    { icon: "🤫", title: "Secret deal", line: "Yes to Letter 1. Turkey in secret.", fx: { risk: -3, stone: -2 } },
    { icon: "📢", title: "Public trade", line: "Accept Letter 2 on the radio", fx: { risk: -3, firm: -3, stone: -3 } },
    { icon: "💣", title: "Strike Monday", line: "Reject both letters", hawk: true, fx: () => ({ risk: st.m.ready >= 100 ? 5 : 4, firm: 2, stone: 3 }) }
  ];
  S[9] = app => {
    const base = { title: "Letter 2", stage: "st-black", black: true, art: "📻" };
    if (st.phase === 9) return goStep(10);
    app.innerHTML = scene(Object.assign({}, base, {
      bubbles: [["radio", "Letter 2, on public radio: Turkey missiles out too."], ["stone", "Reject both. Strike Monday."]],
      body: `<div class="letters"><div class="tele"><p class="th">📠 ${esc(L("LETTER 1"))}</p><p><span class="ask">${esc(L("No invasion → missiles leave"))}</span></p></div><div class="tele new"><p class="th">📻 ${esc(L("LETTER 2 · PUBLIC"))}</p><p><span class="ask">${esc(L("U.S. missiles out of Turkey (next to the USSR)"))}</span></p></div></div>` +
        srcLine("Turkey borders the USSR. U.S. Jupiter nuclear missiles were there. Khrushchev's letters, Oct. 26–27, 1962. JFK Library") + `<div id="choiceBox"></div>`
    }));
    mountChoices(FINAL, i => {
      const c = FINAL[i];
      st.final = c.title;
      decide("final", c);
    });
  };

  // ---- 10 · Ending ----
  const ENDINGS = {
    deal: { e: "🤝", title: "The Secret Deal", head: "MISSILES TO LEAVE CUBA", bad: false,
      text: "Sunday, 9 a.m.: Radio Moscow says the missiles go home. You stayed firm AND gave Khrushchev a way out." },
    public: { e: "📢", title: "Peace, at a Price", head: "U.S. TRADES AWAY TURKEY MISSILES", bad: true,
      text: "The missiles leave Cuba. But allies feel sold out on live radio. Critics call you weak." },
    stay: { e: "🚀", title: "The Missiles Stay", head: "SOVIET MISSILES STAY IN CUBA", bad: true,
      text: "Khrushchev saw weakness. He took your promises and stalled. Nukes now sit 90 miles from Florida." },
    warcuba: { e: "🔥", title: "War in Cuba", head: "U.S. AND SOVIET TROOPS AT WAR", bad: true,
      text: "U.S. bombs fall Monday. Soviet troops in Cuba fight back. Nobody knows where it stops." },
    nuke: { e: "☢️", title: "Nuclear War", head: "NUCLEAR WAR", bad: true,
      text: "One attack led to another. Missiles fly both ways. Millions die in hours." }
  };
  function endingKey() {
    const f = st.final;
    if (f === "Strike Monday") return st.m.risk >= 10 ? "nuke" : "warcuba";
    if (f === "Public trade") return "public";
    if (st.m.firm >= 5) return "deal";
    return "stay";
  }
  S[10] = app => {
    const k = endingKey(), E = ENDINGS[k];
    if (st.ending !== k) { st.ending = k; save(); }
    const dc = defcon(st.m.risk);
    const trail = st.trail.filter(t => Object.keys(t.fx).some(x => x !== "stone" && t.fx[x])).map(t => `<li><span>${esc(L(t.label))}</span><span class="tags">${fxTags(t.fx)}</span></li>`).join("");
    const body = `<div class="front${E.bad ? " bad" : ""}"><p class="masthead" aria-hidden="true">${esc(L("THE MORNING WIRE · SUNDAY, OCT. 28, 1962"))}</p>
        ${k !== "deal" ? `<span class="stamp slam">${esc(L("WHAT-IF"))}</span>` : ""}
        <div class="headline"><span class="e-big" aria-hidden="true">${E.e}</span><h3>${esc(L(E.title))}</h3></div>
        <p>${esc(L(E.text))}</p>
        <div class="finalm"><span>☢️ ${esc(F("DEFCON {n}", { n: dc }))}</span><span>🚀 ${esc(L("Missiles"))} <b>${st.m.ready}%</b></span><span>💪 ${esc(L("Firmness"))} <b>${st.m.firm}/10</b></span>${st.booms.length ? `<span>⏪ ${esc(F("Rewinds: {n}", { n: st.booms.length }))}</span>` : ""}</div>
        <h4 class="cb">${esc(L("Caused by:"))}</h4><ul class="trail">${trail}</ul></div>` + nextBtn("What really happened →");
    app.innerHTML = scene({ title: "Your Ending", stage: k === "nuke" ? "st-boom" : "st-dawn", art: E.e, body });
    wireNext();
  };

  // ---- 11 · What really happened (check 5) ----
  S[11] = app => {
    const art = "☎️";
    const deal = `<div class="deal"><div class="su"><h4>🇸🇺 ${esc(L("USSR gave"))}</h4><p>🚀 ${esc(L("Missiles out of Cuba"))}</p></div><div class="us"><h4>🇺🇸 ${esc(L("U.S. gave"))}</h4><p>🤝 ${esc(L("No invasion of Cuba (public)"))}</p><p>🇹🇷 ${esc(L("Missiles out of Turkey (secret)"))}</p></div></div>` +
      srcLine("Real deal, Oct. 27–28, 1962. The Turkey part stayed secret for years. JFK Library");
    if (st.done.c5) {
      const body = checkDone("c5") + `<div id="after">${newWord("<b>Compromise</b> = each side gives up something to end a fight.")}<div class="after"><span>☎️ ${esc(L("1963: hotline, Washington–Moscow"))}</span><span>🚫 ${esc(L("1963: ban on nuclear tests in the air"))}</span></div>${nextBtn("Write your memo →")}</div>`;
      app.innerHTML = scene({ title: "What Really Happened", stage: "st-dawn", art, body });
      return wireNext();
    }
    app.innerHTML = scene({ title: "What Really Happened", stage: "st-dawn", art, bubbles: [["aide", "This is the real deal Kennedy and Khrushchev made."]], body: deal + `<div id="checkBox"></div>` });
    mountCheck("c5", solved("c5"));
  };

  // ---- 12 · Memo + turn in ----
  const PROMPTS = [
    { id: "ended", short: "Why the crisis ended without war", label: "1. Why did the real crisis end without nuclear war?",
      stem: "The crisis ended without war because ___. One piece of evidence is ___.", min: 60, newWords: 6,
      mustAll: [["deal", "trade", "turkey", "promise", "invade", "invasion", "quarantine", "blockade", "letter", "compromise", "gave", "hold", "held", "talk", "back down", "backed", "arkhipov", "secret", "agree"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name what ended it (like the deal, the letters, or the quarantine) and use “because.”" },
    { id: "compare", short: "My move vs. Kennedy's move", label: "2. Compare one of your moves to Kennedy's real move.",
      stem: "I chose ___, but Kennedy chose ___. My move made the danger go up / down because ___.", min: 60, newWords: 6,
      mustAll: [["airstrike", "air strike", "bomb", "invasion", "invade", "quarantine", "blockade", "talk", "speech", "ultimatum", "warning", "ship", "troop", "hold", "fire", "charge", "sub", "letter", "deal", "turkey", "trade", "strike", "search"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name one move (like quarantine or airstrike) and explain with “because.”" }
  ];
  S[12] = app => {
    const pg = st.phase === 1 ? 1 : 0;
    const page = (p, i) => `<div class="vpage"${i !== pg ? " hidden" : ""}><label for="w_${p.id}">${esc(L(p.label))}</label><p class="stem">${esc(L(p.stem))}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea></div>`;
    const tail = pg === 0
      ? `<button type="button" class="go" id="pageBtn">${esc(L("Next page →"))}</button><p id="pageMsg" class="msg" role="status" aria-live="polite"></p>`
      : `<label for="nameBox2">${esc(L("Your name"))}</label><input id="nameBox2" maxlength="60" autocomplete="off" placeholder="${esc(L("First name + last initial (like Jordan M.)"))}" value="${esc(st.name)}">` +
        `<div class="vrow"><button type="button" class="back" id="backBtn">← ${esc(L("Page 1"))}</button><button type="button" class="go" id="sendBtn">📨 ${esc(L(st.turnedIn ? "Turn in again" : "Turn in"))}</button></div><p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? esc(L("✓ Turned in. You can fix your writing and turn it in again.")) : ""}</p>`;
    const body = `<div class="memo"><span class="ts" aria-hidden="true">${esc(L("TOP SECRET"))}</span><p class="memo-h">📝 ${esc(L("MEMO TO THE NEXT PRESIDENT"))} · ${pg + 1}/2</p>` + PROMPTS.map(page).join("") + tail + `</div>`;
    app.innerHTML = scene({ title: "Your Memo", stage: "st-dawn", art: "📝", body });
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    if (pg === 0) {
      $("pageBtn").onclick = () => {
        const err = writingProblem(PROMPTS[0]);
        if (err) { $("pageMsg").textContent = err; $("pageMsg").className = "msg try"; return; }
        toPhase(1);
      };
    } else {
      $("backBtn").onclick = () => toPhase(0);
      $("sendBtn").onclick = sendWork;
    }
  };

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem(p) {
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: L(p.stem), source: "from today", sourceEs: "de hoy" });
      if (junk) return F("For {s}: ", { s: L(p.short) }) + junk;
    }
    if (v.length < p.min) { box.focus(); return F("Write a little more for: {s} (1–2 full sentences).", { s: L(p.short) }); }
    if (/_{2,}/.test(v)) { box.focus(); return F("Fill in the blanks with your own words for: {s}.", { s: L(p.short) }); }
    const stemText = p.stem + " " + L(p.stem);
    const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
    const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshW.size < p.newWords) { box.focus(); return F("Add more of your own ideas for: {s}. Use details from today.", { s: L(p.short) }); }
    let groups = p.mustAll;
    const esWords = window.SiteLang && window.SiteLang.must(p.id);
    if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
    if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) { box.focus(); return L(p.mustMsg); }
    return "";
  }
  async function sendWork() {
    const msg = $("sendMsg");
    const bad = t => { msg.textContent = t; msg.className = "msg try"; };
    const nm = window.classShortName ? window.classShortName($("nameBox2").value) : $("nameBox2").value.trim();
    if (!/^\S+ [A-Z]\.$/.test(nm)) { bad(L("Type your first name and last initial, like Jordan M.")); $("nameBox2").focus(); return; }
    st.name = nm; save();
    for (const p of PROMPTS) { const err = writingProblem(p); if (err) { bad(err); return; } }
    // ----- payload (same shape as shared/unit-game.js finish()) -----
    const answers = { "Standard": CFG.standard };
    const right = CHECK_ORDER.filter(id => !st.wrong[id]).length;
    answers["First-try correct"] = right + " of " + CHECK_ORDER.length;
    const byStd = {};
    CHECK_ORDER.forEach(id => { const s = CHECKS[id].std; byStd[s] = byStd[s] || [0, 0]; byStd[s][1]++; if (!st.wrong[id]) byStd[s][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    CHECK_ORDER.forEach(id => { const q = CHECKS[id]; answers[q.short] = q.options[0] + (st.wrong[id] ? " (after " + st.wrong[id] + " wrong " + (st.wrong[id] === 1 ? "try" : "tries") + ")" : " (first try)"); });
    const CH = { move1: "First move (crisis team)", speech: "TV speech", line: "The quarantine line", troops: "Invasion forces", plane: "U-2 shot down", sub: "Soviet submarine", final: "Khrushchev's two letters" };
    Object.keys(CH).forEach(k => { if (st.picks[k]) answers["Choice · " + CH[k]] = st.picks[k]; });
    const E = ENDINGS[st.ending || endingKey()];
    answers["Ending"] = E.title + (st.ending === "deal" ? " (closest to real history)" : " (what-if)");
    answers["Caused by"] = st.trail.filter(t => Object.keys(t.fx).some(x => x !== "stone" && t.fx[x])).map(t => t.label + " (" + fxText(t.fx) + ")").join(" · ");
    answers["Final meters"] = "DEFCON " + defcon(st.m.risk) + " (danger " + st.m.risk + "/10) · Soviet missiles ready " + st.m.ready + "% · U.S. firmness " + st.m.firm + "/10";
    answers["What-if nuclear wars (rewound)"] = st.booms.length ? st.booms.map(b => "Day " + b.day + ": " + b.card).join(" · ") : "None";
    $("sendBtn").disabled = true; msg.textContent = L("Sending your work…"); msg.className = "msg";
    try {
      const res = await window.classTurnIn(CFG.oldApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: CFG.assignmentId, assignmentTitle: CFG.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || L("Your work did not save. Try again."));
      st.turnedIn = true; save();
      msg.innerHTML = `<span class="stamp slam">📨 ${esc(L("DELIVERED"))}</span> ${esc(L("✓ Turned in! You're done."))}`; msg.className = "msg good";
      $("sendBtn").textContent = L("✓ Turned in");
    } catch (err) { msg.textContent = err.message || L("Could not turn in. Try again."); msg.className = "msg try"; $("sendBtn").disabled = false; }
  }

  // =====================================================================
  //  TITLE + RENDER
  // =====================================================================
  function title(app) {
    app.innerHTML = `<section class="title-card">
      <div class="t-grid"><div class="t-left">
        <p class="t-kick">${esc(L("U.S. History · Cold War"))}</p>
        <h1>${esc(L("Thirteen Days"))}</h1>
        <p class="hook">${esc(L("Soviet nukes, 90 miles from Florida. You run the crisis room."))}</p>
        <div class="t-chips"><span>🃏 ${esc(L("7 big calls"))}</span><span>🔍 ${esc(L("6 checks"))}</span><span>⏱️ ${esc(L("25 min"))}</span></div>
        <p class="goal"><b>${esc(L("Goal:"))}</b> ${esc(L("explain how nuclear fear grew, then nearly caused war."))}</p>
        <label for="nameBox">${esc(L("Your name"))}</label>
        <div class="t-row"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="${esc(L("First name + last initial (like Jordan M.)"))}" value="${esc(st.name)}">
        <button type="button" class="go start" id="startBtn">${esc(L("Start →"))}</button></div>
        <p id="introMsg" class="msg" role="status"></p>
      </div>
      <div class="t-art" aria-hidden="true"><div class="calbig"><span>${esc(L("OCTOBER 1962"))}</span><b>13</b><small>${esc(L("DAYS"))}</small></div>
        <div><div class="dial"><span class="d5">5</span><span class="d4">4</span><span class="d3">3</span><span class="d2">2</span><span class="d1">1</span></div><p class="dial-l" style="text-align:center;margin:4px 0 0">DEFCON</p></div>
        <div class="t-cast"><span>🧑‍💼</span><span class="vs">VS</span><span>🎖️</span><span>⏳</span></div></div></div>
    </section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = L("Type your first name and last initial, like Jordan M."); $("introMsg").className = "msg try"; $("nameBox").focus(); return; }
      st.name = fixed;
      goStep(1);
    };
  }

  function render(scrollToNew) {
    const app = $("app");
    clearTimeout(lockTimer);
    if (st.step < 1) { hud(); return title(app); }
    (S[st.step] || S[TOTAL])(app);
    justSolved = null;
    hud();
    if (pending) { const p = pending; pending = null; setTimeout(() => pops(p), 60); }
    if (scrollToNew) {
      const target = $("after") || $("choiceBox");
      if (target && target.scrollIntoView) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 40);
    }
  }

  $("restartBtn").onclick = () => {
    if (!confirm(L("Start over? This clears your work on this device."))) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) {
    // Shared Chromebooks: the game already starts clean if the signed-in name (site-student-name) is someone else.
    // "Not you?" lets the next kid wipe this saved game on the spot.
    const nm = st.name || "";
    $("welcome").innerHTML = `<span>${esc(F("Welcome back, {n}! You're on step {x} of {y}.", { n: nm, x: Math.min(st.step, TOTAL), y: TOTAL }))}</span> <button type="button" class="notyou" id="notYouBtn">${esc(F("Not {n}? Start fresh", { n: nm }))}</button>`;
    $("welcome").hidden = false;
    $("notYouBtn").onclick = () => {
      st = fresh();
      if (window.classFirstTry) window.classFirstTry.reset();
      try { localStorage.removeItem(KEY); localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      location.reload();
    };
  }
  render();
})();
