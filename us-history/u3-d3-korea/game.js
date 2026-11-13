// =====================================================================
//  THE LINE THAT MOVED: KOREA  (U.S. History · Unit 3 · Day 2)
//  (Renamed from "Hold the Line: Korea" so it isn't confused with World History's "Hold the Line, 1931–1939".)
//  You advise President Truman, June 1950 to July 1953.
//  Core loop: a front-line map of Korea swings with each decision (your line, with the
//  real line ghosted behind it). Every choice moves three things on the board:
//  World War III risk, support at home, and MacArthur (the rival who wants a bigger war).
//  6 decisions carry forward to 5 endings. 6 evidence checks are part of the world
//  (reporters at the press briefing, cables, the Constitution, the armistice paper).
//  2026-11-13 (Fynn): simplified + shortened. Light look, 2 meters (war risk + MacArthur), a 3-step
//  "Your job" strip on every screen, check + choice on ONE screen, 15 screens instead of 25.
//  Word budget (Fynn, 2026-11-03): ≤35 words of reading per screen, short cards, one-line reveals.
//  Turn-in goes through shared/turnin.js (classTurnIn), same payload shape as shared/unit-game.js.
//  Spanish: es.js sets window.KOREA_ES (keys = the exact English strings below).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u3-d3-korea-v3";
  const CFG = {
    assignmentId: "ush-u3-d3-korea",
    title: "U.S. History · Unit 3 · Day 2 · The Line That Moved: Korea",
    standard: "SS.9-12.US.35, SS.9-12.US.37, SS.9-12.US.40",
    oldApi: "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit"
  };
  const TOTAL = 10;          // steps after the title screen
  const LOCK = 5;            // seconds the choices lock after a wrong answer

  // ---------- language helpers ----------
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  function L(s) { if (!isEs()) return s; const d = window.KOREA_ES || {}; return d[s] != null ? d[s] : s; }
  function F(s, o) { return L(s).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m)); }
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // ---------- state ----------
  function fresh() {
    return { v: 3, name: "", step: 0, phase: 0, m: { risk: 2, mac: 4 }, f: {}, line: "split",
      picks: {}, pickTitles: {}, wrong: {}, done: {}, trail: [], writing: {}, result: null, events: {}, turnedIn: false };
  }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 3 || !st.m) st = fresh();
  // Shared Chromebooks: if a different student is signed in on the home page now, don't show the last kid's game.
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  function clampM() {
    const m = st.m;
    ["risk", "mac"].forEach(k => { m[k] = Math.max(0, Math.min(10, m[k])); });
  }
  let pending = null;   // meter changes to animate after the next render
  let mapFrom = null;   // front line to slide FROM on the next render
  function applyFx(fx) {
    ["risk", "mac"].forEach(k => { if (fx[k]) st.m[k] += fx[k]; });
    fx = Object.assign({}, fx); delete fx.support;
    clampM();
    pending = Object.assign({}, fx);
    return fxTags(fx);
  }
  const sg = n => (n > 0 ? "+" : "−") + Math.abs(n);
  function fxTags(fx) {
    const out = [];
    if (fx.risk) out.push(`<span class="tag ${fx.risk > 0 ? "down" : "up"}">🌍 ${sg(fx.risk)} ${esc(L("war risk"))}</span>`);
    if (fx.mac) out.push(`<span class="tag mac">👨‍✈️ ${sg(fx.mac)} ${esc(L("MacArthur power"))}</span>`);
    return out.join("");
  }
  function fxText(fx) {
    const out = [];
    if (fx.risk) out.push("war risk " + sg(fx.risk));
    if (fx.mac) out.push("MacArthur power " + sg(fx.mac));
    return out.join(", ");
  }
  function addTrail(label, fx) { const f = Object.assign({}, fx); delete f.support; st.trail.push({ label, fx: f }); }

  // ---------- characters ----------
  const WHO = {
    cable: ["📠", "Cable"], truman: ["👨‍💼", "Truman"], mac: ["👨‍✈️", "MacArthur"], reporter: ["🎤", "Reporter"],
    china: ["📨", "China"], you: ["🧑‍💼", "You"]
  };
  const bub = (who, text, cls) => `<div class="bub ${who}${cls ? " " + cls : ""}"><span class="av" aria-hidden="true">${WHO[who][0]}</span><div class="bt"><b>${esc(L(WHO[who][1]))}</b><p>${L(text)}</p></div></div>`;
  const bubbles = list => `<div class="bubbles">${list.map(b => bub(b[0], b[1], b[2])).join("")}</div>`;
  const realFile = (line, src) => `<div class="real"><p><b class="real-b">📜 ${esc(L("Real"))}</b> ${L(line)}</p>${src ? `<p class="src">${esc(L("Source:"))} ${L(src)}</p>` : ""}</div>`;
  const whatIf = t => `<p class="whatif">🔮 ${esc(L(t))}</p>`;
  const srcLine = t => `<p class="src">${L(t)}</p>`;
  const newWord = html => `<div class="reveal"><span class="nw">💡 ${esc(L("KEY IDEA"))}</span><p>${L(html)}</p></div>`;

  // =====================================================================
  //  THE MAP (the game board). Simple diagram, north at top.
  // =====================================================================
  const PX = lon => (lon - 124) * 40, PY = lat => (43.3 - lat) * 48;
  const pt = p => PX(p[0]).toFixed(1) + "," + PY(p[1]).toFixed(1);
  const KOREA = [[124.4, 40.0], [125.5, 40.6], [126.6, 41.4], [127.6, 41.4], [128.2, 41.9], [129.0, 42.1], [129.7, 42.4], [130.4, 42.6], [130.7, 42.3],
    [130.0, 41.9], [129.7, 41.0], [129.2, 40.7], [128.1, 40.0], [127.5, 39.4], [128.0, 38.7], [128.6, 38.0], [129.4, 37.0], [129.5, 36.0], [129.4, 35.5], [129.1, 35.1],
    [128.6, 34.9], [127.7, 34.7], [126.6, 34.4], [126.3, 34.7], [126.4, 35.1], [126.5, 35.9], [126.3, 36.5], [126.6, 37.0], [126.6, 37.45], [126.2, 37.8],
    [125.4, 37.8], [125.2, 38.3], [125.0, 38.6], [125.2, 39.2], [125.4, 39.6], [124.8, 39.8], [124.4, 40.0]];
  const CHINA = [[124, 43.3], [124, 40.0]].concat(KOREA.slice(0, 9)).concat([[131, 42.6], [131, 43.3]]);
  // Front lines: 4 points from west to east. Everything north of the line = North Korea (+ China later).
  const LINES = {
    split: [[124, 38], [127, 38], [128.5, 38], [131, 38]],
    seoul: [[124, 37.25], [127, 37.3], [128.5, 37.35], [131, 37.4]],
    pusan: [[124, 34.0], [128.35, 34.0], [128.35, 36.1], [131, 36.45]],
    neck: [[124, 39.55], [126, 39.5], [127.6, 39.3], [131, 39.3]],
    yalu: [[124, 40.1], [126.5, 40.3], [128, 41.0], [131, 41.4]],
    jan51: [[124, 36.95], [127, 37.05], [128.5, 37.3], [131, 37.4]],
    stale: [[124, 37.7], [126.7, 37.85], [128.2, 38.3], [131, 38.65]]
  };
  // Where the REAL front line was on each step (the ghost line).
  const REAL = { 1: "split", 2: "seoul", 3: "pusan", 4: "split", 5: "jan51", 6: "stale", 7: "stale", 8: "stale", 9: "stale", 10: "stale" };
  function northPoly(line) { return [[124, 43.3], [131, 43.3]].concat(line.slice().reverse()).map(pt).join(" "); }
  const linePts = line => line.map(pt).join(" ");
  const sameLine = (a, b) => a.every((p, i) => Math.abs(p[0] - b[i][0]) < .05 && Math.abs(p[1] - b[i][1]) < .05);
  function mapSvg(o) {
    const line = LINES[o.line], real = LINES[o.real || o.line];
    const ghost = o.real && !sameLine(line, real);
    const city = (lon, lat, name, anchor, dx) => `<circle cx="${PX(lon)}" cy="${PY(lat)}" r="4.5" class="city"/><text x="${PX(lon) + (dx || 7)}" y="${PY(lat) + 4}" text-anchor="${anchor || "start"}" class="ct">${esc(L(name))}</text>`;
    const hills = o.hills ? `<text x="${PX(127.0)}" y="${PY(38.2) + 5}" class="hill" text-anchor="middle">⛰️</text><text x="${PX(128.1)}" y="${PY(38.55) + 5}" class="hill" text-anchor="middle">⛰️</text>` : "";
    return `<svg class="kmap" viewBox="0 0 280 445" role="img" aria-label="${esc(F("Map of Korea. Your front line: {p}.", { p: L(LINE_NAMES[o.line]) }))}">
      <defs><clipPath id="kclip"><polygon points="${KOREA.map(pt).join(" ")}"/></clipPath></defs>
      <rect width="280" height="445" class="sea"/>
      <polygon points="${CHINA.map(pt).join(" ")}" class="china"/>
      <text x="${PX(126.6)}" y="${PY(42.5)}" class="cn" text-anchor="middle">${esc(L("CHINA"))}</text>
      <polygon points="${KOREA.map(pt).join(" ")}" class="land"/>
      <g clip-path="url(#kclip)"><polygon id="northFill" points="${northPoly(line)}" class="nfill"/></g>
      <line x1="0" x2="280" y1="${PY(38)}" y2="${PY(38)}" class="p38"/>
      <text x="4" y="${PY(38) - 4}" class="p38t">${esc(L("38th"))}</text>
      <text x="${PX(124.9)}" y="${PY(40.55)}" class="river">${esc(L("Yalu R."))}</text>
      ${ghost ? `<polyline points="${linePts(real)}" class="ghost" clip-path="url(#kclip)"/>` : ""}
      <polyline id="frontLine" points="${linePts(line)}" class="front" clip-path="url(#kclip)"/>
      ${city(125.75, 39.03, "Pyongyang")}${city(126.98, 37.57, "Seoul")}${city(126.62, 37.46, "Inchon", "end", -7)}${city(129.04, 35.1, "Pusan", "end", -7)}
      ${hills}
      <text x="276" y="438" class="jp" text-anchor="end">${esc(L("JAPAN ↘"))}</text>
    </svg>
    <div class="legend"><span><i class="lg n"></i>${esc(L("North + allies"))}</span><span><i class="lg s"></i>${esc(L("South + UN"))}</span>${ghost ? `<span><i class="lg g"></i>${esc(L("Real line"))}</span>` : ""}</div>`;
  }
  const LINE_NAMES = { split: "the 38th parallel", seoul: "south of Seoul", pusan: "a small corner around Pusan", neck: "north of Pyongyang", yalu: "near the Yalu River, China's border", jan51: "south of Seoul", stale: "near the 38th parallel" };
  // Slide the front line from one position to another.
  function tweenMap(fromKey, toKey) {
    const a = LINES[fromKey], b = LINES[toKey];
    const fill = $("northFill"), fl = $("frontLine");
    if (!a || !b || !fill || !fl || fromKey === toKey) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 1 : 1400, t0 = performance.now();
    const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const frame = now => {
      const t = Math.min(1, (now - t0) / dur), e = ease(t);
      const mid = a.map((p, i) => [p[0] + (b[i][0] - p[0]) * e, p[1] + (b[i][1] - p[1]) * e]);
      fill.setAttribute("points", northPoly(mid)); fl.setAttribute("points", linePts(mid));
      if (t < 1) requestAnimationFrame(frame);
    };
    fill.setAttribute("points", northPoly(a)); fl.setAttribute("points", linePts(a));
    const box = fill.closest(".map-wrap");
    if (box) { box.classList.remove("swing"); void box.offsetWidth; box.classList.add("swing"); }
    requestAnimationFrame(frame);
  }
  function moveLine(to) { if (st.line !== to) { mapFrom = st.line; st.line = to; } }

  // ---------- HUD (game board) ----------
  const DATES = { 1: "JUN 1950", 2: "JUN 1950", 3: "SEP 1950", 4: "OCT 1950", 5: "DEC 1950", 6: "APR 1951", 7: "1952", 8: "JUL 1953", 9: "JUL 1953", 10: "JUL 1953" };
  function macMood() {
    if (st.f.fired) return ["😶", "fired"];
    if (st.f.macMood === "angry") return ["😠", "furious"];
    if (st.f.macMood === "happy") return ["😎", "pleased"];
    if (st.m.mac >= 7) return ["😎", "a hero"];
    return ["🧐", "watching"];
  }
  function hud() {
    const m = st.m;
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const d = (DATES[st.step] || "JUL 1953").split(" ");
    $("calMo").textContent = d.length > 1 ? L(d[0]) : "—"; $("calYr").textContent = d[d.length - 1];
    $("stepText").textContent = F("Step {x} of {y}", { x: Math.min(st.step, TOTAL), y: TOTAL });
    $("stepFill").style.width = Math.round(Math.min(st.step, TOTAL) / TOTAL * 100) + "%";
    $("mRisk").style.width = m.risk * 10 + "%"; $("nRisk").textContent = m.risk + "/10";
    $("mMac").style.width = m.mac * 10 + "%"; $("nMac").textContent = m.mac + "/10";
    const mm = macMood();
    $("macFace").textContent = mm[0]; $("macMood").textContent = L(mm[1]);
    $("riskFace").textContent = m.risk >= 8 ? "🔥" : m.risk >= 5 ? "⚠️" : "🕊️";
    document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px");
    $("hudRisk").classList.toggle("warn", m.risk >= 8);
    $("hudMac").classList.toggle("down", !!st.f.fired);
    $("hudMac").classList.toggle("warn", m.mac >= 8 && !st.f.fired);
  }
  // Animated "+2 🌍" pop-ups on the board after a choice.
  function pops(fx) {
    const map = { risk: ["hudRisk", "🌍"], mac: ["hudMac", "👨‍✈️"] };
    Object.keys(map).forEach(k => {
      const n = fx[k]; if (!n) return;
      const el = $(map[k][0]); if (!el) return;
      const good = k === "risk" ? n < 0 : null;
      const p = document.createElement("span");
      p.className = "pop " + (good === null ? "mac" : good ? "good" : "bad");
      p.textContent = sg(n) + " " + map[k][1];
      p.setAttribute("aria-hidden", "true");
      el.appendChild(p);
      el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
      setTimeout(() => p.remove(), 2000);
    });
  }

  // ---------- scene frame: map on the left, speech on the right ----------
  // The 3-step "Your job" strip (Fynn, 11-13: exactly three things to do, plain words).
  function jobStrip(steps, now) {
    if (!steps) return "";
    return `<ol class="job" aria-label="${esc(L("Your job"))}">${steps.map((t, i) => `<li class="${i < now ? "did" : i === now ? "now" : ""}"${i === now ? ' aria-current="step"' : ""}>${esc(L(t))}</li>`).join("")}</ol>`;
  }
  function scene(o) {
    const real = st.step === 4 && st.phase === 9 ? "yalu" : REAL[st.step];
    const map = o.map === false ? "" : `<div class="map-wrap">${mapSvg({ line: st.line, real, hills: o.hills })}</div>`;
    return `<section class="scene">
      <div class="sc-top"><h2>${esc(L(o.title))}</h2></div>
      ${o.job ? `<div class="sc-job">${jobStrip(o.job, o.jobNow)}</div>` : ""}<div class="board${map ? "" : " nomap"}">${map}<div class="side">${o.bubbles && o.bubbles.length ? bubbles(o.bubbles) : ""}<div class="sc-body">${o.body || ""}</div></div></div></section>`;
  }
  function nextBtn(label) { return `<button type="button" class="go" id="nextBtn">${esc(L(label || "Next →"))}</button>`; }
  function wireNext(fn) { const b = $("nextBtn"); if (b) b.onclick = fn || advance; }
  function advance() { st.step++; st.phase = 0; st.result = null; save(); render(); window.scrollTo(0, 0); }
  function toPhase(n) { st.phase = n; save(); render(); window.scrollTo(0, 0); }

  // ---------- evidence checks (in-world) ----------
  const CHECKS = {
    c1: { std: "US.35", short: "Why Korea was split", who: "reporter", kind: "press", stamp: "BRIEFED",
      prompt: "“Why is Korea split in two?”",
      options: ["The USSR and U.S. each took half in 1945", "Koreans voted to make two countries", "Japan split it up before it lost the war", "The UN drew it to end a civil war"],
      hint: "Who took each half in 1945?" },
    c2: { std: "US.37", short: "Truman: communism spreading by war (containment)", who: "reporter", kind: "press", stamp: "ON THE RECORD",
      prompt: "“Why does the President care about Korea?”",
      options: ["He sees communism spreading by war", "He thinks communism will fade away soon", "He fears Korea will invade the U.S.", "He wants Korea's land for U.S. bases"],
      hint: "What will communism “now use”?" },
    c3: { std: "US.40", short: "China's warning about the 38th", who: "reporter", kind: "cable", stamp: "WARNING NOTED",
      prompt: "“What is China saying?”",
      options: ["Cross the 38th and China will fight", "China will help the UN unite Korea", "China will stay out no matter what", "China wants U.S. troops to stay"],
      hint: "Read China's cable, not MacArthur's." },
    c4: { std: "US.40", short: "Civilian control: President commands", who: "reporter", kind: "doc", stamp: "COMMANDER IN CHIEF",
      prompt: "“Who is MacArthur's boss?”",
      options: ["The President, a civilian", "The top general in the Army", "The UN's leaders in New York", "No one. Generals run wars."],
      hint: "Read Article II." },
    c5: { std: "US.35", short: "1951–53: stalemate", who: "reporter", kind: "press", stamp: "STUCK",
      prompt: "“What does the map show for 1951–53?”",
      options: ["Neither side could push the other out", "The North took all of South Korea", "The UN pushed all the way to China", "Both armies went home in 1951"],
      hint: "Compare the line in 1951 and 1953." },
    c6: { std: "US.35", short: "Armistice, no peace treaty", who: "reporter", kind: "doc", stamp: "SHOOTING STOPS",
      prompt: "“So is the Korean War over?”",
      options: ["The shooting stopped, but no treaty", "Yes, a peace treaty ended it in 1953", "No, the armies still fight every day", "Yes, Korea became one country again"],
      hint: "Find the ✖ on the paper." }
  };
  const CHECK_ORDER = ["c1", "c2", "c3", "c4", "c5", "c6"];

  let lockTimer = null;
  function mountCheck(id, onDone) {
    const q = CHECKS[id];
    const box = $("checkBox");
    if (!box) return;
    box.innerHTML = `<div class="check ${q.kind}"><p class="qlabel" aria-hidden="true">🔍</p>${bub(q.who, q.prompt, "ask")}<p class="msg" id="qMsg" role="status" aria-live="polite"></p><div class="choices" id="qChoices"></div></div>`;
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
  const checkDone = id => `<div class="check done ${CHECKS[id].kind}"><span class="stamp${justSolved === id ? " slam" : ""}">✔ ${esc(L(CHECKS[id].stamp))}</span></div>`;
  const solved = id => () => { justSolved = id; render(true); };

  // ---------- decision cards ----------
  function mountChoices(choices, onPick, locked) {
    const box = $("choiceBox");
    box.innerHTML = `<p class="pick-h">${esc(L("Your advice:"))}</p><div class="cards n${choices.length}${locked ? " locked" : ""}" id="cChoices"${locked ? ' aria-disabled="true"' : ""}></div>` + (locked ? `<p class="locked-note">🔒 ${esc(L("Answer the question above to unlock your choices."))}</p>` : "");
    const area = $("cChoices");
    choices.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "dcard";
      b.innerHTML = `<span class="d-ico" aria-hidden="true">${c.icon}</span><b class="d-t">${esc(L(c.title))}</b>
        <span class="d-chips"><span class="chip g">👍 ${esc(L(c.good))}</span><span class="chip c">💸 ${esc(L(c.cost))}</span></span>`;
      if (locked) b.disabled = true;
      b.onclick = () => onPick(i);
      area.appendChild(b);
    });
  }
  function decide(stepId, c) {
    const fx = typeof c.fx === "function" ? c.fx() : c.fx;
    st.picks[stepId] = c.label;
    st.pickTitles[stepId] = c.title;
    const tags = applyFx(fx);
    if (c.flag) Object.assign(st.f, c.flag);
    if (c.mood) st.f.macMood = c.mood;
    if (c.line) moveLine(typeof c.line === "function" ? c.line() : c.line);
    addTrail(c.trail, fx);
    const text = typeof c.result === "function" ? c.result() : c.result;
    st.result = { tags, text, who: c.who || "cable", real: c.real, src: c.src, whatIf: c.whatIf, reveal: c.reveal, icon: c.icon };
    st.phase = 9; save(); render(); window.scrollTo(0, 0);
  }
  // Result card: stamp (what you chose) + meter tags + one line + real line + one-line concept.
  function resultHtml(r, stepId) {
    if (!r) return "";
    const stampText = stepId && st.pickTitles[stepId] ? L(st.pickTitles[stepId]) : r.stamp ? L(r.stamp) : "";
    const stamp = stampText ? `<span class="stamp pick slam">✔ ${esc(stampText)}</span>` : "";
    const body = bub(r.who, r.text);
    return `<div class="result flip" id="resultBox">${r.icon ? `<div class="r-big" aria-hidden="true">${r.icon}</div>` : ""}<div class="r-main">${stamp}<div class="tags">${r.tags || ""}</div>${body}${r.whatIf ? whatIf(r.whatIf) : ""}${r.real ? realFile(r.real, r.src) : ""}${r.reveal ? newWord(r.reveal) : ""}</div></div>`;
  }
  // A decision step, one short screen at a time:
  //   intro (optional) → evidence + check (optional) → choice cards → result.
  function decisionStep(app, o) {
    const base = { title: o.title, hills: o.hills };
    if (o.enter) o.enter();
    if (st.phase === 9) {
      app.innerHTML = scene(Object.assign({}, base, { job: ["Pick your advice", "See what happened", "Tap Next"], jobNow: 1, body: resultHtml(st.result, o.id) + nextBtn(o.nextLabel) }));
      return wireNext();
    }
    const say = typeof o.say === "function" ? o.say() : o.say;
    const pre = typeof o.pre === "function" ? o.pre() : (o.pre || "");
    const needCheck = o.check && !st.done[o.check];
    const job = o.check ? ["Read the source", "Answer the question", "Pick your advice"] : ["Read what's happening", "Pick your advice", "See what happens"];
    const jobNow = o.check ? (needCheck ? 1 : 2) : 1;
    app.innerHTML = scene(Object.assign({}, base, { job, jobNow, bubbles: [].concat(o.checkSay || [], say || []),
      body: pre + (o.evidence || "") + (o.check ? (needCheck ? `<div id="checkBox"></div>` : checkDone(o.check)) : "") + (o.body || "") + `<div id="choiceBox"></div>` }));
    const ch = o.choices();
    mountChoices(ch, i => decide(o.id, ch[i]), needCheck);
    if (needCheck) mountCheck(o.check, solved(o.check));
  }
  // Apply a one-time event (meters + map) the first time a screen is shown.
  function eventOnce(id, fx, line, trail) {
    if (st.events[id]) return st.events[id];
    if (line) moveLine(line);
    const tags = applyFx(fx);
    if (trail) addTrail(trail, fx);
    st.events[id] = tags || " ";
    save();
    return st.events[id];
  }

  // =====================================================================
  //  STEPS
  // =====================================================================
  const S = {};
  const doc = (head, lines, src, cls) => `<div class="paper ${cls || ""}"><p class="p-h">${esc(L(head))}</p>${lines.map(l => `<p>${L(l)}</p>`).join("")}${src ? `<p class="src">${L(src)}</p>` : ""}</div>`;

  // 1 · The line on the map (check 1) — one screen
  S[1] = app => {
    const how = `<div class="board-explain">
          <div><span class="be-i" aria-hidden="true">🗺️</span><b>${esc(L("Your choices move the front line"))}</b></div>
          <div><span class="be-i" aria-hidden="true">🌍</span><b>${esc(L("Keep World War III risk low"))}</b></div>
          <div class="rival"><span class="be-i" aria-hidden="true">👨‍✈️</span><b>${esc(L("MacArthur wants a bigger war"))}</b></div>
        </div><p class="fict">${esc(L("You are a made-up adviser. 📜 = real history."))}</p>`;
    const file = doc("📁 FILE: KOREA, 1945", ["Japan ruled Korea, 1910–1945.", "1945: Japan loses World War II.", "Soviet troops take the North. U.S. troops take the South."], "U.S. State Department, Office of the Historian");
    if (st.done.c1) {
      app.innerHTML = scene({ title: "The Line on the Map", job: ["Read the file", "Answer the question", "Tap Next"], jobNow: 2, bubbles: [["cable", "June 25, 1950: North Korea invades South Korea."]],
        body: how + checkDone("c1") + `<div id="after">${newWord("<b>38th parallel</b> = the map line that split Korea in 1945.")}${nextBtn("To the White House →")}</div>` });
      return wireNext();
    }
    app.innerHTML = scene({ title: "The Line on the Map", job: ["Read the file", "Answer the question", "Tap Next"], jobNow: 1, bubbles: [["cable", "June 25, 1950: North Korea invades South Korea."]], body: how + file + `<div id="checkBox"></div>` });
    mountCheck("c1", solved("c1"));
  };

  // 2 · Invasion (check 2 + decision 1)
  const CONT = "<b>Containment</b> = stopping communism from spreading to new countries.";
  const D1 = [
    { icon: "🇺🇳", title: "Go to the UN", label: "Ask the UN to defend South Korea, with U.S. troops leading", good: "16 nations join", cost: "takes time", trail: "Went to the UN", fx: { support: 1 },
      result: "The UN votes to defend the South. 16 nations send troops.", real: "The USSR was skipping UN meetings, so it couldn't block the vote.", src: "UN Security Council votes, June 27 and July 7, 1950", reveal: CONT },
    { icon: "🪖", title: "Send troops alone", label: "Send U.S. troops alone, without the UN", good: "fast", cost: "no allies", trail: "Sent troops alone", fx: { risk: 2 },
      result: "The USSR calls it an American invasion. Allies hang back.", real: "Truman went to the UN. 16 nations sent troops.", src: "Office of the Historian", reveal: CONT },
    { icon: "✈️", title: "Ships and planes only", label: "Send only ships and planes, no ground troops", good: "fewer U.S. dead", cost: "may not stop tanks", trail: "Ships and planes only", fx: { risk: -1, support: -1 },
      result: "Planes can't stop tanks. The North keeps rolling south.", real: "Truman sent ships and planes June 27, then soldiers June 30.", src: "Truman Library", reveal: CONT }
  ];
  S[2] = app => decisionStep(app, { id: "d1", check: "c2", title: "Invasion",
    enter: () => { if (!st.events.inv) { moveLine("seoul"); st.events.inv = " "; save(); } },
    checkSay: [["cable", "Seoul falls in three days. The South is collapsing."]],
    evidence: doc("🇺🇸 PRESIDENT TRUMAN · JUNE 27, 1950", ["“Communism has passed beyond [secret plots] to conquer independent nations and will now use armed invasion and war.”"], "Statement by the President on the situation in Korea. Truman Library", "quote"),
    say: [],
    choices: () => D1 });

  // 3 · Pusan corner → Inchon (decision 2)
  const D2 = [
    { icon: "⚓", title: "Approve Inchon", label: "Approve MacArthur's surprise landing at Inchon", good: "one big blow", cost: "huge gamble", trail: "Approved Inchon", fx: { mac: 3 }, mood: "happy", line: "split",
      result: "It works! Seoul is retaken in two weeks. MacArthur is a hero.", real: "Inchon landing: September 15, 1950.", src: "Naval History and Heritage Command",
      reveal: "<b>Inchon</b> = a surprise landing from the sea, behind enemy lines." },
    { icon: "🪖", title: "Break out slowly", label: "Skip Inchon. Break out from Pusan slowly", good: "safer plan", cost: "more U.S. dead", trail: "Slow breakout from Pusan", fx: { support: -2, mac: 1 }, mood: "angry", line: "split",
      result: "Inch by inch, the line climbs back north. More soldiers die.", whatIf: "What if: this never happened.", real: "Truman approved Inchon. It worked.", src: "Naval History and Heritage Command",
      reveal: "<b>Inchon</b> = a surprise landing from the sea, behind enemy lines." }
  ];
  S[3] = app => {
    if (st.phase === 0 && !st.events.pusan) { moveLine("pusan"); st.events.pusan = " "; save(); }
    decisionStep(app, { id: "d2", title: "Trapped at Pusan",
      say: [["cable", "UN troops are trapped around Pusan."], ["mac", "Land behind them at Inchon. One blow ends it."]],
      body: `<div class="tide"><span class="t-ico" aria-hidden="true">🌊</span><div><b>${esc(L("Inchon: tides rise and fall about 30 feet."))}</b><p>${esc(L("A few hours a day to land."))}</p><p class="src">${esc(L("Naval History and Heritage Command"))}</p></div></div>` +
        srcLine("Truman never asked Congress to declare war. He agreed with a reporter who called it a “police action,” June 29, 1950."),
      choices: () => D2 });
  };

  // 4 · How far north? (check 3 + decision 3)
  const D3 = [
    { icon: "🛑", title: "Stop at the 38th", label: "Stop at the 38th parallel. The South is safe", good: "South is safe", cost: "North survives", trail: "Stopped at the 38th", fx: { risk: -1, support: -1, mac: 2 }, mood: "angry", flag: { path: "p38" },
      result: "MacArthur fumes. Critics call you “soft on communism.”", real: "Truman let MacArthur push north toward China.", src: "Office of the Historian",
      reveal: "<b>Containment</b> = save the South. Going north meant taking the North." },
    { icon: "⛰️", title: "Stop halfway", label: "Cross, but stop north of Pyongyang, far from China", good: "space from China", cost: "half a win", trail: "Stopped halfway north", fx: { risk: 1, mac: 1 }, mood: "angry", flag: { path: "neck" }, line: "neck",
      result: "UN troops take Pyongyang and hold there.", real: "Britain suggested an empty safety zone near China. It never happened.", src: "Foreign Relations of the United States, 1950",
      reveal: "<b>Containment</b> = save the South. Going north meant taking the North." },
    { icon: "🏞️", title: "Push to the Yalu", label: "Push all the way to the Yalu River and unite Korea", good: "unite Korea", cost: "China's border", trail: "Pushed to the Yalu", fx: { risk: 3, support: 1, mac: 1 }, mood: "happy", flag: { path: "yalu" }, line: "yalu",
      result: "UN troops race north. Talk spreads: home by Christmas!", real: "This really happened. Some troops reached the Yalu.", src: "U.S. Army Center of Military History",
      reveal: "<b>Containment</b> = save the South. Going north meant taking the North." }
  ];
  S[4] = app => decisionStep(app, { id: "d3", check: "c3", title: "How Far North?",
    evidence: `<div class="cables">` +
      doc("📨 CHINA · OCT 3, 1950", ["“If U.S. troops cross the 38th parallel, China will fight.”"], "Zhou Enlai to India's ambassador, who passed it on (short version)", "cable") +
      doc("👨‍✈️ MACARTHUR · OCT 15, 1950", ["Chance China fights? “Very little.”"], "Wake Island meeting with Truman, notes", "cable") + `</div>`,
    say: [["mac", "Let me go to the Yalu and unite Korea."]],
    choices: () => D3 });

  // 5 · China's move (event) → MacArthur's demand (decision 4)
  const LW = "<b>Limited war</b> = fighting for a small goal so the war won't spread.";
  const HOLD = { icon: "🧱", title: "Fight only in Korea", label: "Refuse. Fight only inside Korea", good: "war stays small", cost: "MacArthur furious", trail: "Kept the war in Korea", fx: { risk: -1, support: -1, mac: 2 }, mood: "angry",
    result: "MacArthur complains to reporters. The war stays in Korea.", real: "This was Truman's choice.", src: "Office of the Historian", reveal: LW };
  const D4X = [
    { icon: "💣", title: "Bomb China", label: "Let MacArthur bomb China's bases", good: "hit their bases", cost: "USSR may join", trail: "Bombed China", fx: { risk: 4 }, mood: "happy", flag: { widened: true },
      result: "Allies panic. China's partner, the USSR, has atomic bombs too.", whatIf: "What if: this never happened.", real: "Truman refused to bomb China.", src: "Office of the Historian", reveal: LW },
    { icon: "☢️", title: "Hint at the A-bomb", label: "Hint that the U.S. might use the atomic bomb", good: "scare China", cost: "scare allies", trail: "Hinted at the A-bomb", fx: { risk: 2 }, mood: "happy",
      result: "Britain's leader rushes to Washington, alarmed.", real: "Truman said it on Nov 30, 1950: “active consideration.”", src: "Truman's press conference, November 30, 1950", reveal: LW },
    HOLD
  ];
  // Stopped at the 38th: China isn't fighting, so holding there costs no extra support (review fix 11/3: the
  // cautious path that listened to China's warning used to fall to "Lost the Home Front").
  const HOLD38 = { icon: "🧱", title: "Hold at the 38th", label: "Refuse. Hold the line at the 38th", good: "war stays small", cost: "MacArthur furious", trail: "Held at the 38th", fx: { risk: -1, mac: 2 }, mood: "angry",
    result: "MacArthur complains to reporters. The line holds at the 38th.", real: "Truman never let the war spread to China.", src: "Office of the Historian", reveal: LW };
  const D4S = [
    { icon: "🏞️", title: "Go north now", label: "Let MacArthur go north now and finish North Korea", good: "finish the North", cost: "China's warning", trail: "Went north late", fx: { risk: 3, support: -1 }, mood: "happy", line: "jan51",
      result: "China attacks. Your line falls back past Seoul.", whatIf: "What if: this never happened.", real: "China entered when UN troops went north.", src: "Office of the Historian", reveal: LW },
    HOLD38
  ];
  const CHINA_EVT = {
    yalu: { say: [["cable", "About 300,000 Chinese troops attack."], ["cable", "UN troops retreat in freezing cold. Seoul falls again."]], fx: { support: -2, risk: 1 }, line: "jan51", trail: "China struck hard",
      body: () => realFile("Chosin Reservoir, Nov–Dec 1950. Seoul fell again January 4, 1951.", "U.S. Marine Corps History Division") },
    neck: { say: [["cable", "China attacks! Your shorter line bends back to the 38th."]], fx: { support: -1 }, line: "split", trail: "China hit your line",
      body: () => whatIf("What if: no one knows how this would have gone.") + realFile("China really did attack, and pushed UN troops past Seoul.", "Office of the Historian") },
    p38: { say: [["cable", "China stays out… for now."], ["cable", "North Korea's army escapes north and rebuilds."]], fx: { mac: 1 }, trail: "China waited (what if)",
      body: () => whatIf("What if: historians still argue about this.") + realFile("UN troops crossed. China attacked and pushed them past Seoul.", "Office of the Historian") }
  };
  S[5] = app => {
    const path = st.f.path || "yalu", E = CHINA_EVT[path];
    decisionStep(app, { id: "d4", title: path === "p38" ? "The North Rebuilds" : "China Attacks",
      enter: () => eventOnce("china", E.fx, E.line, E.trail),
      pre: () => `<div class="tags">${st.events.china && st.events.china.trim() ? st.events.china : fxTags(E.fx)}</div>` + E.body(),
      say: () => E.say.concat(path === "p38" ? [["mac", "Let me go north and finish them."]] : [["mac", "Bomb China's bases. Use Taiwan's army too."]]),
      choices: () => path === "p38" ? D4S : D4X });
  };

  // 6 · The General Goes Public (check 4 + decision 5)
  const CIV = "<b>Civilian control</b> = an elected civilian, not a general, commands the military.";
  const D5 = [
    { icon: "📝", title: "Fire MacArthur", label: "Fire MacArthur", good: "President in charge", cost: "fire a hero", trail: "Fired MacArthur", flag: { fired: true }, mood: "",
      fx: () => ({ risk: -2, support: st.m.mac >= 9 ? -3 : -2 }), who: "truman",
      result: "“We are trying to prevent a third world war.”", real: "Fired April 11, 1951. Huge crowds cheered MacArthur at home.", src: "Truman radio address, April 11, 1951", reveal: CIV },
    { icon: "🤫", title: "Warn him quietly", label: "Keep MacArthur but warn him in private", good: "keep a hero", cost: "he may not listen", trail: "Warned MacArthur quietly", flag: { warned: true }, mood: "happy",
      fx: () => (st.m.mac >= 7 ? { risk: 2 } : { risk: 1 }),
      result: () => (st.m.mac >= 7 ? "He ignores you. He's too popular to scare." : "He goes quiet… for now."), real: "He'd been warned in December 1950. Truman fired him anyway.", src: "Truman Library", reveal: CIV },
    { icon: "🎖️", title: "Let him run it", label: "Let MacArthur run the war his way", good: "go for victory", cost: "World War III", trail: "Let MacArthur run it", flag: { gave: true, widened: true }, mood: "happy",
      fx: { risk: 4, support: 1, mac: 2 },
      result: "Bombs fall on China. Everyone waits for Moscow.", whatIf: "What if: this never happened.", real: "Truman refused. He fired MacArthur.", src: "Office of the Historian", reveal: CIV }
  ];
  S[6] = app => {
    if (st.phase === 0 && !st.events.spring) { moveLine("stale"); st.events.spring = " "; save(); }
    decisionStep(app, { id: "d5", check: "c4", title: "The General Goes Public",
      checkSay: [["cable", "April 1951: MacArthur's letter is read in Congress."], ["mac", "“There is no substitute for victory.”"]],
      evidence: doc("📜 U.S. CONSTITUTION · ARTICLE II", ["“The President shall be Commander in Chief…”"], "Article II, Section 2. MacArthur's letter to Rep. Joseph Martin, read April 5, 1951", "parchment"),
      say: [],
      choices: () => D5 });
  };

  // 7 · Stuck: the stalemate (check 5 + decision 6)
  const D6 = [
    { icon: "🗽", title: "No forced returns", label: "Refuse to force any prisoner to go home", good: "prisoners choose", cost: "war drags on", trail: "Refused forced returns", fx: { support: -1 },
      result: "Talks get stuck. The fighting goes on for over a year.", real: "More than 20,000 prisoners chose not to go home.", src: "David Cheng Chang, The Hijacked War (2020)",
      reveal: "<b>Stalemate</b> = neither side can win, so the fighting gets stuck." },
    { icon: "🚌", title: "Send all back", label: "Send every prisoner home, even by force", good: "faster deal", cost: "forced home", trail: "Sent all prisoners back", fx: { support: 1, risk: -1 }, flag: { forced: true },
      result: "The deal comes sooner. Some prisoners are dragged home.", whatIf: "What if: this never happened.", real: "The U.S. refused to force anyone home.", src: "Office of the Historian",
      reveal: "<b>Stalemate</b> = neither side can win, so the fighting gets stuck." }
  ];
  S[7] = app => {
    let extra = "";
    if (st.f.warned && !st.f.fired) extra = eventOnce("loose", { risk: 1 }, null, "MacArthur talked to the press again");
    const evidence = `<div class="hillrow"><span>⛰️ ${esc(L("Heartbreak Ridge, 1951"))}</span><span>⛰️ ${esc(L("Pork Chop Hill, 1953"))}</span></div>` +
      `<div class="moved"><div><b>1950</b><span class="mbar big"></span><small>${esc(L("line swings 300+ miles"))}</small></div><div><b>1951–53</b><span class="mbar tiny"></span><small>${esc(L("line barely moves"))}</small></div></div>` +
      (extra && extra.trim() ? `<div class="tags">${extra}</div>` + bub("cable", "MacArthur talks to reporters again.") : "") + srcLine("U.S. Army Center of Military History");
    const say = [["cable", "1951–1953: armies fight over the same hills near the 38th parallel."]];
    if (st.done.c5) {
      app.innerHTML = scene({ title: "Stuck", hills: true, job: ["Read the chart", "Answer the question", "Tap Next"], jobNow: 2, bubbles: say,
        body: evidence + checkDone("c5") + `<div id="after">${newWord("<b>Stalemate</b> = neither side can win, so the fighting gets stuck.")}${nextBtn("Next →")}</div>` });
      return wireNext();
    }
    app.innerHTML = scene({ title: "Stuck", hills: true, job: ["Read the chart", "Answer the question", "Tap Next"], jobNow: 1, bubbles: say, body: evidence + `<div id="checkBox"></div>` });
    mountCheck("c5", solved("c5"));
  };

  // 8 · The shooting stops (check 6)
  S[8] = app => {
    const say = [["cable", "1952: Eisenhower wins. “I shall go to Korea.”"]];
    if (st.done.c6) {
      app.innerHTML = scene({ title: "The Shooting Stops", job: ["Read the armistice", "Answer the question", "Tap Next"], jobNow: 2, body: checkDone("c6") + `<div id="after">${newWord("<b>Armistice</b> = a deal to stop fighting, not a peace treaty.")}${nextBtn("See your ending →")}</div>` });
      return wireNext();
    }
    const body = doc("📜 ARMISTICE · JULY 27, 1953", ["✔ Fighting stops.", "✔ A DMZ splits Korea.", "✖ No peace treaty. Still none."], "Korean Armistice Agreement. National Archives. DMZ = demilitarized zone, about 2.5 miles wide.", "parchment") + `<div id="checkBox"></div>`;
    app.innerHTML = scene({ title: "The Shooting Stops", job: ["Read the armistice", "Answer the question", "Tap Next"], jobNow: 1, bubbles: say, body });
    mountCheck("c6", solved("c6"));
  };

  // 9 · Ending (war-room report), then the real cost
  const ENDINGS = {
    brink: { e: "💥", title: "Brink of World War III", text: "Your advice kept widening the war. In real life, Truman refused to bomb China. The war stayed in Korea." },
    general: { e: "👨‍✈️", title: "The General Ran the War", text: "You never stopped MacArthur. In real life, Truman fired him so a civilian stayed in charge." },
    held: { e: "🧱", title: "Held the Line", text: "A painful draw. South Korea survived, and the war never spread. That's a limited war." },
    costly: { e: "⚖️", title: "A Costly Draw", text: "South Korea survived. But your choices pushed the world close to a much bigger war." }
  };
  function endingKey() {
    const m = st.m;
    if (m.risk >= 8 && st.f.widened) return "brink";
    if (!st.f.fired) return "general";
    if (m.risk <= 4) return "held";
    return "costly";
  }
  S[9] = app => {
    const k = endingKey(), E = ENDINGS[k];
    if (st.ending !== k) { st.ending = k; save(); }
    const trail = st.trail.map(t => `<li><span>${esc(L(t.label))}</span><span class="tags">${fxTags(t.fx)}</span></li>`).join("");
    const body = `<div class="front ${k}"><p class="masthead" aria-hidden="true">${esc(L("WAR ROOM REPORT · JULY 1953"))}</p>
        <div class="headline"><span class="e-big" aria-hidden="true">${E.e}</span><h3>${esc(L(E.title))}</h3></div>
        <p>${esc(L(E.text))}</p>
        <div class="finalm"><span>🌍 ${esc(L("War risk"))} <b>${st.m.risk}/10</b></span><span>👨‍✈️ ${esc(L("MacArthur's power"))} <b>${st.m.mac}/10</b></span></div>
        <h4 class="cb">${esc(L("Caused by:"))}</h4><ul class="trail">${trail}</ul></div>` +
      `<div class="memorial"><p class="m-h">${esc(L("THE REAL COST"))}</p>
          <p>🕯️ ${esc(L("About 36,500 Americans died."))}</p>
          <p>🕯️ ${esc(L("Millions of Koreans died, many of them civilians."))}</p>
          <p>🗺️ ${esc(L("Korea is still split near the 38th parallel today."))}</p>
          <p class="src">${esc(L("U.S. Department of Defense; Office of the Historian. South Korea was ruled by dictators until 1987 and is now a democracy. North Korea is still a communist dictatorship."))}</p></div>` +
      nextBtn("Write your memo →");
    app.innerHTML = scene({ title: "Your Ending", map: false, job: ["See your ending", "Read the real cost", "Write your memo"], jobNow: 1, body });
    wireNext();
  };

  // 10 · Memo to the President + turn in (two short pages)
  const PROMPTS = [
    { id: "contain", short: "Did containment work in Korea?", label: "1. Did containment work in Korea? Give one fact.",
      stem: "Containment did / did not work in Korea because ___.", min: 50, newWords: 5,
      mustAll: [["contain"], ["38th", "south korea", "north korea", "north", "china", "chinese", "un ", "u.n", "united nations", "armistice", "stalemate", "treaty", "died", "dead", "death", "communis", "border", "seoul", "truman", "macarthur", "limited", "dmz", "troops", "soldiers", "democracy", "free", "inchon", "pusan", "yalu"], ["because", "since", "so "]],
      mustMsg: "In answer 1, use the word containment, give one fact (like the 38th parallel or South Korea), and explain with “because.”" },
    { id: "fire", short: "Why Truman fired MacArthur", label: "2. Why did Truman fire MacArthur? How did it keep the war limited?",
      stem: "Truman fired MacArthur because ___. This kept the war limited because ___.", min: 60, newWords: 6,
      mustAll: [["macarthur", "general"], ["limit", "world war", "china", "civilian", "president", "bomb", "spread", "wider", "bigger", "ussr", "soviet", "atomic"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name MacArthur, say what Truman wanted to avoid (like a war with China), and use “because.”" }
  ];
  S[10] = app => {
    const page = p => `<div class="vpage"><label for="w_${p.id}">${esc(L(p.label))}</label><p class="stem">${esc(L(p.stem))}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea></div>`;
    const tail = `<label for="nameBox2" class="namel">${esc(L("Your name"))}</label><input id="nameBox2" maxlength="60" autocomplete="off" placeholder="${esc(L("First name + last initial (like Jordan M.)"))}" value="${esc(st.name)}">` +
      `<div class="vrow"><button type="button" class="go" id="sendBtn">📮 ${esc(L(st.turnedIn ? "Turn in again" : "Turn in"))}</button></div><p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? esc(L("✓ Turned in. You can fix your writing and turn it in again.")) : ""}</p>`;
    const body = `<div class="memo"><p class="vm-h">${esc(L("TOP SECRET · MEMO TO THE PRESIDENT"))}</p>` + PROMPTS.map(page).join("") + tail + `</div>`;
    app.innerHTML = scene({ title: "Your Memo", map: false, job: ["Answer question 1", "Answer question 2", "Turn in"], jobNow: 0, body });
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = sendWork;
  };

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  // Returns a message if the answer isn't ready yet, or "" if it's fine.
  function writingProblem(p) {
    if (window.classIsTestT && window.classIsTestT()) return "";   // Test T. (teacher) skips the writing rules
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
    const CH = { d1: "Response to the invasion", d2: "Inchon or slow breakout", d3: "How far north", d4: "MacArthur's demand to widen the war", d5: "What to do about MacArthur" };
    Object.keys(CH).forEach(k => { if (st.picks[k]) answers["Choice · " + CH[k]] = st.picks[k]; });
    const E = ENDINGS[st.ending || endingKey()];
    answers["Ending"] = E.title;
    answers["Caused by"] = st.trail.map(t => t.label + (Object.keys(t.fx).length ? " (" + fxText(t.fx) + ")" : "")).join(" · ");
    answers["Final meters"] = "World War III risk " + st.m.risk + "/10 · MacArthur's power " + st.m.mac + "/10";
    $("sendBtn").disabled = true; msg.textContent = L("Sending your work…"); msg.className = "msg";
    try {
      const res = await window.classTurnIn(CFG.oldApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: CFG.assignmentId, assignmentTitle: CFG.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || L("Your work did not save. Try again."));
      st.turnedIn = true; save();
      msg.innerHTML = `<span class="stamp slam">📮 ${esc(L("DELIVERED"))}</span> ${esc(L("✓ Turned in! You're done."))}`; msg.className = "msg good";
      $("sendBtn").textContent = L("✓ Turned in");
    } catch (err) { msg.textContent = err.message || L("Could not turn in. Try again."); msg.className = "msg try"; $("sendBtn").disabled = false; }
  }

  // =====================================================================
  //  TITLE SCREEN + RENDER
  // =====================================================================
  function title(app) {
    app.innerHTML = `<section class="title-card">
      <div class="t-grid"><div class="t-left">
        <p class="t-kick">${esc(L("U.S. History · Unit 3 · Day 2"))}</p>
        <h1>${esc(L("The Line That Moved: Korea"))}</h1>
        <p class="hook">${esc(L("1950. A war swings up and down Korea. You advise the President."))}</p>
        <div class="t-chips"><span>🗺️ ${esc(L("5 choices"))}</span><span>🔍 ${esc(L("6 checks"))}</span><span>⏱️ ${esc(L("15–20 min"))}</span></div>
        <p class="goal"><b>${esc(L("Goal:"))}</b> ${esc(L("explain why the U.S. fought in Korea and why the war stayed limited."))}</p>
        <div class="t-start"><label for="nameBox">${esc(L("Your name"))}</label>
        <div class="t-row"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="${esc(L("First name + last initial (like Jordan M.)"))}" value="${esc(st.name)}">
        <button type="button" class="go start" id="startBtn">${esc(L("Start →"))}</button></div>
        <p id="introMsg" class="msg" role="status"></p></div>
      </div>
      <div class="t-art" aria-hidden="true"><div class="map-wrap mini">${mapSvg({ line: "pusan" })}</div>
        <div class="t-cast"><span>👨‍💼</span><span class="vs">VS</span><span>👨‍✈️</span></div></div></div>
    </section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = L("Type your first name and last initial, like Jordan M."); $("introMsg").className = "msg try"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; st.phase = 0; save(); render(); window.scrollTo(0, 0);
    };
  }

  let first = true;
  function render(scrollToNew) {
    clearTimeout(lockTimer);
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    const app = $("app");
    if (st.step < 1) { hud(); return title(app); }
    (S[st.step] || S[TOTAL])(app);
    justSolved = null;
    hud();
    if (pending) { const p = pending; pending = null; setTimeout(() => pops(p), 60); }
    if (mapFrom) { const f = mapFrom; mapFrom = null; setTimeout(() => tweenMap(f, st.line), 250); }
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
  window.addEventListener("resize", () => { if (st.step >= 1) document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px"); });
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current check/decision.
  // Screens = each step's parts: intro · check · choice cards · result (and the ending/memo pages).
  try {
    const NAMES = { 1: "The line on the map", 2: "Invasion", 3: "Trapped at Pusan", 4: "How far north?", 5: "China attacks", 6: "The general goes public", 7: "Stuck", 8: "The shooting stops", 9: "Your ending", 10: "Your memo" };
    const DEC = { 2: "c2", 3: null, 4: "c3", 5: null, 6: "c4" };   // decision steps (check id or none)
    const SCR = [];
    for (let n = 1; n <= TOTAL; n++) {
      if (n in DEC) { SCR.push({ s: n, k: "choices" }, { s: n, k: "result" }); }
      else SCR.push({ s: n, k: "one" });
    }
    const kindNow = () => { const n = Math.max(1, Math.min(st.step, TOTAL)); return n in DEC ? (st.phase === 9 ? "result" : "choices") : "one"; };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => SCR.length,
      index: () => { const n = Math.max(1, Math.min(st.step, TOTAL)), k = kindNow(); return Math.max(0, SCR.findIndex(x => x.s === n && x.k === k)); },
      label: i => { const x = SCR[i]; return NAMES[x.s] + (x.k === "result" ? " · result" : ""); },
      go: i => {
        const x = SCR[i]; if (!x) return;
        if (!st.name) st.name = "Test T.";
        st.step = x.s; st.result = null; st.phase = 0;
        save(); render(); window.scrollTo(0, 0);
        if (x.k === "result") { const c = DEC[x.s]; if (c && !st.done[c]) { st.done[c] = true; save(); render(); } const b = document.querySelector("#cChoices .dcard"); if (b) b.click(); }
      },
      solve: () => {
        const n = Math.max(1, Math.min(st.step, TOTAL)), chk = { 1: "c1", 7: "c5", 8: "c6" }[n] || DEC[n];
        if (chk && !st.done[chk]) { st.done[chk] = true; save(); justSolved = chk; render(true); }
        else if (n in DEC && st.phase !== 9) { const b = document.querySelector("#cChoices .dcard"); if (b) b.click(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
