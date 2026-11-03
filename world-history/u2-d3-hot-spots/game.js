// =====================================================================
//  HOT SEAT: KOREA  (World History · Unit 2 · Day 3 · "Hot Spots: Why Fight Far From Home?")
//  Reworked from U.S. History's "The Line That Moved: Korea" (same engine: swinging front-line map,
//  meters, in-world checks, decision cards, endings, two-part writing). This version is NOT U.S.-centered:
//  the student sits in every side's seat (the two Koreas, Stalin, Truman/UN, Mao, Rhee), then zooms out
//  to a real world map (Natural Earth outlines, worldmap.js) to find other Cold War hot spots.
//  Meters: Big-war risk (superpowers fighting each other) and Cost to Koreans. The seat panel shows whose
//  seat you are in. 7 quick checks: 4 "what did this side want?" (WH.37) + 3 map finds (WH.34).
//  Word budget: short cards, one-line results. Turn-in through shared/turnin.js (classTurnIn).
//  English only.
// =====================================================================
(function () {
  "use strict";
  const KEY = "wh-u2-d3-hot-spots-v1";
  const CFG = {
    assignmentId: "wh-u2-d3-hot-spots",
    title: "World History · Unit 2 · Day 3 · Hot Seat: Korea (Why Fight Far From Home?)",
    standard: "SS.9-12.WH.34, SS.9-12.WH.37",
    oldApi: "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit"
  };
  const TOTAL = 11;          // steps after the title screen
  const LOCK = 5;            // seconds the choices lock after a wrong answer

  const L = s => s;
  function F(s, o) { return String(s).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m)); }
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // ---------- state ----------
  function fresh() {
    return { v: 1, name: "", step: 0, phase: 0, m: { risk: 2, cost: 1 }, f: {}, line: "split", radar: 0,
      picks: {}, pickTitles: {}, wrong: {}, done: {}, trail: [], writing: {}, result: null, events: {}, turnedIn: false };
  }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1 || !st.m) st = fresh();
  // Shared Chromebooks: if a different student is signed in on the home page now, don't show the last kid's game.
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const METERS = ["risk", "cost"];
  function clampM() { METERS.forEach(k => { st.m[k] = Math.max(0, Math.min(10, st.m[k])); }); }
  let pending = null;   // meter changes to animate after the next render
  let mapFrom = null;   // front line to slide FROM on the next render
  function applyFx(fx) {
    METERS.forEach(k => { if (fx[k]) st.m[k] += fx[k]; });
    clampM();
    pending = Object.assign({}, fx);
    return fxTags(fx);
  }
  const sg = n => (n > 0 ? "+" : "−") + Math.abs(n);
  function fxTags(fx) {
    const out = [];
    if (fx.risk) out.push(`<span class="tag ${fx.risk > 0 ? "down" : "up"}">💥 ${sg(fx.risk)} big-war risk</span>`);
    if (fx.cost) out.push(`<span class="tag ${fx.cost > 0 ? "down" : "up"}">🏚️ ${sg(fx.cost)} cost to Koreans</span>`);
    return out.join("");
  }
  function fxText(fx) {
    const out = [];
    if (fx.risk) out.push("big-war risk " + sg(fx.risk));
    if (fx.cost) out.push("cost to Koreans " + sg(fx.cost));
    return out.join(", ");
  }
  function addTrail(label, fx) { st.trail.push({ label, fx: Object.assign({}, fx) }); }

  // ---------- characters (leaders only "speak" in real, sourced words) ----------
  const WHO = {
    wire: ["📻", "News wire"], analyst: ["🕵️", "Analyst"], kim: ["🇰🇵", "Kim Il Sung · North Korea"],
    truman: ["🇺🇸", "Truman · U.S."], zhou: ["🇨🇳", "Zhou Enlai · China"]
  };
  const bub = (who, text, cls) => `<div class="bub ${who}${cls ? " " + cls : ""}"><span class="av" aria-hidden="true">${WHO[who][0]}</span><div class="bt"><b>${esc(WHO[who][1])}</b><p>${text}</p></div></div>`;
  const bubbles = list => `<div class="bubbles">${list.map(b => bub(b[0], b[1], b[2])).join("")}</div>`;
  const realFile = (line, src) => `<div class="real"><p><b class="real-b">📜 Real</b> ${line}</p>${src ? `<p class="src">Source: ${src}</p>` : ""}</div>`;
  const whatIf = t => `<p class="whatif">🔮 ${esc(t)}</p>`;
  const srcLine = t => `<p class="src">${t}</p>`;
  const newWord = html => `<div class="reveal"><span class="nw">💡 KEY IDEA</span><p>${html}</p></div>`;

  // =====================================================================
  //  THE KOREA MAP (the game board). Simple diagram, north at top.
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
  // Where the REAL front line was (the ghost line), by step, and by result screen (phase 9).
  function realLine() {
    const s = st.step, done = st.phase === 9;
    if (s <= 3) return "split";
    if (s === 4) return done ? "pusan" : "seoul";
    if (s === 5) return done ? "yalu" : "split";
    if (s === 6) return done ? "jan51" : "yalu";
    return "stale";
  }
  function northPoly(line) { return [[124, 43.3], [131, 43.3]].concat(line.slice().reverse()).map(pt).join(" "); }
  const linePts = line => line.map(pt).join(" ");
  const sameLine = (a, b) => a.every((p, i) => Math.abs(p[0] - b[i][0]) < .05 && Math.abs(p[1] - b[i][1]) < .05);
  const LINE_NAMES = { split: "the 38th parallel", seoul: "south of Seoul", pusan: "a small corner around Pusan", neck: "north of Pyongyang", yalu: "near the Yalu River, China's border", jan51: "south of Seoul", stale: "near the 38th parallel" };
  function mapSvg(o) {
    const line = LINES[o.line], real = LINES[o.real || o.line];
    const ghost = o.real && !sameLine(line, real);
    const city = (lon, lat, name, anchor, dx) => `<circle cx="${PX(lon)}" cy="${PY(lat)}" r="4.5" class="city"/><text x="${PX(lon) + (dx || 7)}" y="${PY(lat) + 4}" text-anchor="${anchor || "start"}" class="ct">${esc(name)}</text>`;
    const hills = o.hills ? `<text x="${PX(127.0)}" y="${PY(38.2) + 5}" class="hill" text-anchor="middle">⛰️</text><text x="${PX(128.1)}" y="${PY(38.55) + 5}" class="hill" text-anchor="middle">⛰️</text>` : "";
    return `<svg class="kmap" viewBox="0 0 280 445" role="img" aria-label="${esc(F("Map of Korea. Your front line: {p}.", { p: LINE_NAMES[o.line] }))}">
      <defs><clipPath id="kclip"><polygon points="${KOREA.map(pt).join(" ")}"/></clipPath></defs>
      <rect width="280" height="445" class="sea"/>
      <polygon points="${CHINA.map(pt).join(" ")}" class="china"/>
      <text x="${PX(126.6)}" y="${PY(42.5)}" class="cn" text-anchor="middle">CHINA</text>
      <polygon points="${KOREA.map(pt).join(" ")}" class="land"/>
      <g clip-path="url(#kclip)"><polygon id="northFill" points="${northPoly(line)}" class="nfill"/></g>
      <line x1="0" x2="280" y1="${PY(38)}" y2="${PY(38)}" class="p38"/>
      <text x="4" y="${PY(38) - 4}" class="p38t">38th</text>
      <text x="${PX(124.9)}" y="${PY(40.55)}" class="river">Yalu R.</text>
      ${ghost ? `<polyline points="${linePts(real)}" class="ghost" clip-path="url(#kclip)"/>` : ""}
      <polyline id="frontLine" points="${linePts(line)}" class="front" clip-path="url(#kclip)"/>
      ${city(125.75, 39.03, "Pyongyang")}${city(126.98, 37.57, "Seoul")}${city(126.62, 37.46, "Inchon", "end", -7)}${city(129.04, 35.1, "Pusan", "end", -7)}
      ${hills}
      <text x="276" y="438" class="jp" text-anchor="end">JAPAN ↘</text>
    </svg>
    <div class="legend"><span><i class="lg n"></i>North + allies</span><span><i class="lg s"></i>South + UN</span>${ghost ? `<span><i class="lg g"></i>Real line</span>` : ""}</div>`;
  }
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

  // =====================================================================
  //  THE WORLD RADAR (real map: Natural Earth outlines, see worldmap.js)
  // =====================================================================
  function worldSvg(o) {
    const M = window.HOTSPOT_MAP;
    if (!M) return "";
    const found = (o && o.found) || [];
    const cls = g => "w-" + g + (found.indexOf(g) >= 0 ? " lit" : "");
    const paths = ["land", "germany", "cuba", "vietnam", "afghanistan", "korea", "china", "usa", "ussr"]
      .filter(g => M.paths[g]).map(g => `<path d="${M.paths[g]}" class="${cls(g)}"/>`).join("");
    const lab = (k, t, c) => { const p = M.labels[k]; return `<text x="${p[0]}" y="${p[1]}" class="wl ${c || ""}" text-anchor="middle">${t}</text>`; };
    return `<svg class="wmap" viewBox="0 0 ${M.w} ${M.h.toFixed(0)}" role="img" aria-label="World map. The United States is blue. The Soviet Union is red. China is pink.">
      <rect width="${M.w}" height="${M.h.toFixed(0)}" class="w-sea"/>${paths}
      ${lab("usa", "U.S.", "big")}${lab("ussr", "USSR", "big")}${lab("china", "CHINA")}${lab("pacific", "PACIFIC OCEAN", "sea")}${lab("atlantic", "ATLANTIC OCEAN", "sea")}${lab("africa", "AFRICA")}${lab("india", "INDIA")}
    </svg>`;
  }
  const SPOTS = {
    cuba: { id: "m1", name: "Cuba", group: "cuba", years: "1962",
      mission: "1962: Soviet nuclear missiles show up here, 90 miles from Florida.",
      hint: "Look for an island just south of the U.S.",
      us: "Missiles this close could hit U.S. cities in minutes.",
      su: "Protect Cuba, its new communist ally, and answer U.S. missiles in Turkey.",
      real: "The Cuban Missile Crisis. After 13 days, the USSR took the missiles out.", src: "JFK Presidential Library" },
    vietnam: { id: "m2", name: "Vietnam", group: "vietnam", years: "1965–1973",
      mission: "1965–1973: U.S. troops fight here. The USSR and China arm the other side.",
      hint: "Look south of China, on the coast.",
      us: "Feared that if one country fell to communism, its neighbors would fall like dominoes.",
      su: "Help a communist ally beat the U.S., without sending a Soviet army.",
      real: "About 58,000 Americans and over a million Vietnamese died. More on Day 6.", src: "National Archives; Office of the Historian" },
    afghanistan: { id: "m3", name: "Afghanistan", group: "afghanistan", years: "1979–1989",
      mission: "1979: the USSR sends its own army here, right on its southern border.",
      hint: "Look for a country touching the USSR, west of China.",
      us: "Feared a Soviet push toward Middle East oil. Secretly armed Afghan fighters.",
      su: "Keep a friendly communist government on its border.",
      real: "Soviet troops left in 1989, after about 10 years of war.", src: "Office of the Historian" },
    berlin: { name: "Berlin", group: "germany", years: "1948–1961",
      us: "West Berlin was a free city deep inside East Germany. Leaving would break a promise.",
      su: "West Berlin was a hole in its side. Millions of East Germans fled west, many through it.",
      real: "1948–49: the USSR blocked the roads, so the U.S. and Britain flew in food. 1961: the Berlin Wall.", src: "Office of the Historian" }
  };
  const RADAR_ORDER = ["cuba", "vietnam", "afghanistan"];

  // ---------- HUD (game board) ----------
  const DATES = { 1: ["AUG", "1945"], 2: ["JAN", "1950"], 3: ["APR", "1950"], 4: ["JUN", "1950"], 5: ["OCT", "1950"], 6: ["OCT", "1950"], 7: ["JUN", "1953"], 8: ["JUL", "1953"], 9: ["RADAR", "1948–89"], 10: ["JUL", "1953"], 11: ["REPORT", "TODAY"] };
  const SEATS = { 1: ["🗺️", "Briefing: Korea"], 2: ["🇰🇵", "Kim Il Sung · North Korea"], 3: ["☭", "Stalin · USSR"], 4: ["🇺🇸", "Truman · U.S."], 5: ["🇺🇳", "U.S. + UN"], 6: ["🇨🇳", "Mao Zedong · China"], 7: ["🇰🇷", "Syngman Rhee · South Korea"], 8: ["🤝", "All five sides"], 9: ["📡", "Hot Spot Radar"], 10: ["🏁", "Results"], 11: ["✏️", "Your report"] };
  function hud() {
    const m = st.m;
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const d = DATES[st.step] || DATES[TOTAL];
    $("calMo").textContent = d[0]; $("calYr").textContent = d[1];
    $("stepText").textContent = F("Step {x} of {y}", { x: Math.min(st.step, TOTAL), y: TOTAL });
    $("stepFill").style.width = Math.round(Math.min(st.step, TOTAL) / TOTAL * 100) + "%";
    $("mRisk").style.width = m.risk * 10 + "%"; $("nRisk").textContent = m.risk + "/10";
    $("mCost").style.width = m.cost * 10 + "%"; $("nCost").textContent = m.cost + "/10";
    const seat = SEATS[st.step] || SEATS[TOTAL];
    $("seatFace").textContent = seat[0]; $("seatFace").classList.toggle("ussr", seat[0] === "☭");
    $("seatName").textContent = seat[1];
    $("riskFace").textContent = m.risk >= 8 ? "🔥" : m.risk >= 5 ? "⚠️" : "🕊️";
    $("costFace").textContent = m.cost >= 8 ? "😢" : m.cost >= 5 ? "😟" : "🙂";
    document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px");
    $("hudRisk").classList.toggle("warn", m.risk >= 8);
    $("hudCost").classList.toggle("warn", m.cost >= 8);
  }
  // Animated "+2 💥" pop-ups on the board after a choice.
  function pops(fx) {
    const map = { risk: ["hudRisk", "💥"], cost: ["hudCost", "🏚️"] };
    Object.keys(map).forEach(k => {
      const n = fx[k]; if (!n) return;
      const el = $(map[k][0]); if (!el) return;
      const p = document.createElement("span");
      p.className = "pop " + (n < 0 ? "good" : "bad");
      p.textContent = sg(n) + " " + map[k][1];
      p.setAttribute("aria-hidden", "true");
      el.appendChild(p);
      el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
      setTimeout(() => p.remove(), 2000);
    });
  }
  function seatBump() { const el = $("hudSeat"); if (el) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); } }

  // ---------- scene frame: map on the left, speech on the right ----------
  function scene(o) {
    const map = o.map === false ? "" : `<div class="map-wrap">${mapSvg({ line: st.line, real: realLine(), hills: o.hills })}</div>`;
    const seat = o.seat ? `<span class="seat-tag">${esc(o.seat)}</span>` : "";
    return `<section class="scene">
      <div class="sc-top">${seat}<h2>${esc(o.title)}</h2></div>
      <div class="board${map ? "" : " nomap"}">${map}<div class="side">${o.bubbles && o.bubbles.length ? bubbles(o.bubbles) : ""}<div class="sc-body">${o.body || ""}</div></div></div></section>`;
  }
  function nextBtn(label) { return `<button type="button" class="go" id="nextBtn">${esc(label || "Next →")}</button>`; }
  function wireNext(fn) { const b = $("nextBtn"); if (b) b.onclick = fn || advance; }
  function advance() { st.step++; st.phase = 0; st.result = null; save(); render(); window.scrollTo(0, 0); seatBump(); }
  function toPhase(n) { st.phase = n; save(); render(); window.scrollTo(0, 0); }

  // ---------- evidence checks (in-world) ----------
  // options[0] is always the right answer (the buttons are shuffled on screen).
  const CHECKS = {
    c1: { std: "WH.37", short: "What both Korean leaders wanted", kind: "doc", stamp: "GOALS FOUND",
      prompt: "Before you advise Kim: what did BOTH Korean leaders want?",
      options: ["One Korea, run by their own side", "Two Koreas, split for good", "U.S. and Soviet troops to stay forever", "To stay out of the Cold War completely"],
      hint: "Kim can't sleep over what? Rhee wants to march where?" },
    c2: { std: "WH.37", short: "Why Stalin sent no Soviet army (proxy war)", kind: "cable", stamp: "ON THE RECORD",
      prompt: "Why won't Stalin send Soviet soldiers to Korea?",
      options: ["He doesn't want to fight the U.S. head-on", "He thinks North Korea will lose no matter what", "The UN has banned Soviet troops", "He doesn't care who wins Korea"],
      hint: "Who might Soviet soldiers end up fighting?" },
    c3: { std: "WH.37", short: "What Truman wanted in Korea (containment)", kind: "press", stamp: "GOAL FOUND",
      prompt: "What does Truman want in Korea?",
      options: ["Stop communism spreading by war", "Take North Korea's land for U.S. bases", "Punish Japan for ruling Korea", "Let Koreans settle it with no outsiders"],
      hint: "Read the quote. What will communism “now use”?" },
    c4: { std: "WH.37", short: "Why China entered (U.S. troops at its border)", kind: "doc", stamp: "MOTIVE FOUND",
      prompt: "Why does Mao care so much about Korea?",
      options: ["Keep U.S. troops far from China", "Take Korea back as a Chinese colony", "Help the UN unite Korea", "Obey Stalin's order to invade Japan"],
      hint: "Find the Yalu River on the map. What country is right across it?" },
    m1: { std: "WH.34", short: "Map: found Cuba", radar: "cuba" },
    m2: { std: "WH.34", short: "Map: found Vietnam", radar: "vietnam" },
    m3: { std: "WH.34", short: "Map: found Afghanistan", radar: "afghanistan" }
  };
  const CHECK_ORDER = ["c1", "c2", "c3", "c4", "m1", "m2", "m3"];

  let lockTimer = null;
  function mountCheck(id, onDone) {
    const q = CHECKS[id];
    const box = $("checkBox");
    if (!box) return;
    box.innerHTML = `<div class="check ${q.kind}"><p class="qlabel" aria-hidden="true">🔍</p>${bub("analyst", esc(q.prompt), "ask")}<p class="msg" id="qMsg" role="status" aria-live="polite"></p><div class="choices" id="qChoices"></div></div>`;
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
        b.innerHTML = `<span class="r-ico" aria-hidden="true">💬</span><span class="r-t">${esc(q.options[n])}</span>`;
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
              if (left <= 0) { locked = false; msg.textContent = F("✖ {h}", { h: q.hint }); draw(); return; }
              msg.textContent = F("✖ {h} ⏳ {n}", { h: q.hint, n: left });
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
  const checkDone = id => `<div class="check done ${CHECKS[id].kind}"><span class="stamp${justSolved === id ? " slam" : ""}">✔ ${esc(CHECKS[id].stamp)}</span></div>`;
  const solved = id => () => { justSolved = id; render(true); };

  // ---------- decision cards ----------
  function mountChoices(choices, onPick, head) {
    const box = $("choiceBox");
    box.innerHTML = `<p class="pick-h">${esc(head || "Your advice:")}</p><div class="cards n${choices.length}" id="cChoices"></div>`;
    const area = $("cChoices");
    choices.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "dcard";
      b.innerHTML = `<span class="d-ico" aria-hidden="true">${c.icon}</span><b class="d-t">${esc(c.title)}</b>
        <span class="d-chips"><span class="chip g">👍 ${esc(c.good)}</span><span class="chip c">💸 ${esc(c.cost)}</span></span>`;
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
    if (c.line) moveLine(typeof c.line === "function" ? c.line() : c.line);
    addTrail(c.trail, fx);
    const text = typeof c.result === "function" ? c.result() : c.result;
    st.result = { tags, text, real: c.real, src: c.src, whatIf: c.whatIf, reveal: c.reveal, icon: c.icon };
    st.phase = 9; save(); render(); window.scrollTo(0, 0);
  }
  // Result card: stamp (what you chose) + meter tags + one line + real line + one-line concept.
  function resultHtml(r, stepId) {
    if (!r) return "";
    const stampText = stepId && st.pickTitles[stepId] ? st.pickTitles[stepId] : "";
    const stamp = stampText ? `<span class="stamp pick slam">✔ ${esc(stampText)}</span>` : "";
    return `<div class="result flip" id="resultBox">${r.icon ? `<div class="r-big" aria-hidden="true">${r.icon}</div>` : ""}<div class="r-main">${stamp}<div class="tags">${r.tags || ""}</div>${bub("wire", r.text)}${r.whatIf ? whatIf(r.whatIf) : ""}${r.real ? realFile(r.real, r.src) : ""}${r.reveal ? newWord(r.reveal) : ""}</div></div>`;
  }
  // A decision step, one short screen at a time:
  //   intro (optional) → evidence + check (optional) → choice cards → result.
  function decisionStep(app, o) {
    const base = { title: o.title, hills: o.hills, seat: o.seat };
    if (o.intro && st.phase === 0) {
      if (o.intro.enter) o.intro.enter();
      const ib = typeof o.intro.body === "function" ? o.intro.body() : (o.intro.body || "");
      app.innerHTML = scene(Object.assign({}, base, { bubbles: o.intro.say, body: ib + nextBtn(o.intro.next) }));
      return wireNext(() => toPhase(1));
    }
    if (st.phase === 9) {
      app.innerHTML = scene(Object.assign({}, base, { body: resultHtml(st.result, o.id) + nextBtn(o.nextLabel) }));
      return wireNext();
    }
    if (o.check && !st.done[o.check]) {
      app.innerHTML = scene(Object.assign({}, base, { bubbles: o.checkSay, body: (o.evidence || "") + `<div id="checkBox"></div>` }));
      return mountCheck(o.check, solved(o.check));
    }
    const say = typeof o.say === "function" ? o.say() : o.say;
    app.innerHTML = scene(Object.assign({}, base, { bubbles: say, body: (o.check ? checkDone(o.check) : "") + (o.body || "") + `<div id="choiceBox"></div>` }));
    const ch = o.choices();
    mountChoices(ch, i => decide(o.id, ch[i]), o.pickHead);
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
  const evTags = id => (st.events[id] && st.events[id].trim() ? `<div class="tags">${st.events[id]}</div>` : "");

  // =====================================================================
  //  STEPS
  // =====================================================================
  const S = {};
  const doc = (head, lines, src, cls) => `<div class="paper ${cls || ""}"><p class="p-h">${esc(head)}</p>${lines.map(l => `<p>${l}</p>`).join("")}${src ? `<p class="src">${src}</p>` : ""}</div>`;

  // 1 · Briefing: why is there a line?
  S[1] = app => {
    if (st.phase === 0) {
      const body = `<div class="board-explain">
          <div><span class="be-i" aria-hidden="true">🪑</span><b>Sit in 5 seats</b></div>
          <div><span class="be-i" aria-hidden="true">🗺️</span><b>Watch the line move</b></div>
          <div class="rival"><span class="be-i" aria-hidden="true">💥</span><b>Don't let the superpowers clash</b></div>
        </div>` +
        `<p class="fict">You are a made-up adviser in each seat. The leaders are real. 📜 = real history.</p>` +
        nextBtn("Why is there a line? →");
      app.innerHTML = scene({ title: "A Line Across Korea", seat: "Briefing", bubbles: [["wire", "Korea, 1945. Five sides will fight over this map."]], body });
      return wireNext(() => toPhase(1));
    }
    const body = doc("📁 FILE: KOREA, 1945–1948", ["Japan ruled Korea, 1910–1945.", "1945: Japan loses World War II.", "Soviet troops take the North. U.S. troops take the South.", "1948: two governments. <b>Each says it should rule ALL of Korea.</b>"], "Office of the Historian, U.S. State Department") +
      newWord("<b>38th parallel</b> = the map line that split Korea in 1945.") + nextBtn("Take the first seat →");
    app.innerHTML = scene({ title: "A Line Across Korea", seat: "Briefing", body });
    wireNext();
  };

  // 2 · Seat 1: the two Koreas (check 1 + decision 1, advising Kim)
  const LOCAL = "<b>Local goals</b> = what people IN the hot spot wanted. Here, both sides wanted one Korea.";
  const D1 = [
    { icon: "📨", title: "Ask Stalin for a green light", label: "Ask Stalin to approve an attack on the South", good: "a superpower backs you", cost: "Stalin calls the shots", trail: "Kim asked Stalin", fx: { risk: 1 },
      result: "Kim sends Stalin request after request.", real: "Kim kept asking. In January 1950, Stalin agreed to meet him.", src: "Soviet telegrams, Jan. 1950. Wilson Center Digital Archive", reveal: LOCAL },
    { icon: "⚔️", title: "Attack alone, now", label: "Attack the South alone, without asking Stalin", good: "surprise", cost: "no Soviet tanks", trail: "Kim attacked alone (what if)", fx: { risk: 1, cost: 1 },
      result: "Without Soviet tanks and fuel, the attack stalls.", whatIf: "What if: this never happened.", real: "Kim never attacked without Stalin's OK.", src: "Wilson Center Digital Archive", reveal: LOCAL },
    { icon: "⏳", title: "Wait. Win over the South", label: "Wait and try to win support in the South", good: "no war", cost: "Korea stays split", trail: "Kim waited (what if)", fx: { risk: -1 },
      result: "Kim waits. The split gets harder to undo.", whatIf: "What if: this never happened.", real: "Kim chose war. He kept asking Stalin to approve it.", src: "Wilson Center Digital Archive", reveal: LOCAL }
  ];
  S[2] = app => decisionStep(app, { id: "d1", check: "c1", title: "North vs. South", seat: "Seat 1 · North Korea",
    evidence: `<div class="cables">` +
      doc("🇰🇵 NORTH · KIM IL SUNG", ["Communist. Backed by the USSR.", "“Lately I do not sleep at night, thinking about … the unification [joining together] of the whole country.”"], "Kim to the Soviet ambassador, Jan. 19, 1950 (Soviet telegram). Wilson Center Digital Archive", "quote") +
      doc("🇰🇷 SOUTH · SYNGMAN RHEE", ["Anti-communist. Backed by the U.S.", "Often talked of a “march north” to unite Korea."], "Allan R. Millett, The War for Korea, 1945–1950", "quote") + `</div>` +
      srcLine("1949: small battles break out along the 38th parallel."),
    say: [["wire", "1950. You advise Kim Il Sung. How does he get one Korea?"]],
    choices: () => D1 });

  // 3 · Seat 2: Stalin (check 2 + decision 2)
  const PROXY = "<b>Proxy war</b> = big powers back sides in someone else's war, so they don't fight each other head-on.";
  const D2 = [
    { icon: "🤝", title: "Yes, but no Soviet army", label: "Approve the attack, send weapons, but no Soviet soldiers", good: "no war with the U.S.", cost: "Kim's on his own", trail: "Stalin: yes, no army", fx: { risk: 1 },
      result: "Soviet tanks and guns roll to North Korea.", real: "Stalin said yes. He sent tanks, guns and advisers, but no army.", src: "Wilson Center Digital Archive", reveal: PROXY },
    { icon: "🪖", title: "Yes, and send Soviet troops", label: "Approve the attack and send Soviet soldiers too", good: "win fast", cost: "war with the U.S.", trail: "Stalin sent an army (what if)", fx: { risk: 4 }, flag: { widened: true },
      result: "Soviet and U.S. soldiers may now meet in battle.", whatIf: "What if: this never happened.", real: "Stalin never sent an army. Later, Soviet pilots flew in secret.", src: "Wilson Center Digital Archive", reveal: PROXY },
    { icon: "✋", title: "Say no", label: "Refuse to approve an attack", good: "no war", cost: "Kim is angry", trail: "Stalin said no (what if)", fx: { risk: -1 },
      result: "Kim keeps asking… and asking.", whatIf: "What if: this never happened.", real: "Stalin said yes in the spring of 1950.", src: "Wilson Center Digital Archive", reveal: PROXY }
  ];
  S[3] = app => decisionStep(app, { id: "d2", check: "c2", title: "Stalin's Green Light", seat: "Seat 2 · USSR",
    checkSay: [["wire", "Moscow, spring 1950. Kim visits Stalin."]],
    evidence: doc("📜 MOSCOW · SPRING 1950", ["Kim asks: may I attack the South?", "Stalin: <b>Yes.</b>", "But <b>no Soviet soldiers</b> will fight.", "If you need help, ask Mao in China."], "Summary of Soviet records, not exact words. Wilson Center Digital Archive; historian Kathryn Weathersby", "cable"),
    say: [["wire", "Now you sit in Stalin's chair. Kim is waiting."]],
    choices: () => D2 });

  // 4 · Seat 3: Truman (check 3 + decision 3)
  const CONT = "<b>Containment</b> = stopping communism from spreading to new countries.";
  const D3 = [
    { icon: "🇺🇳", title: "Go to the UN", label: "Ask the UN to defend South Korea, with U.S. troops leading", good: "16 nations join", cost: "a bigger war", trail: "Went to the UN", fx: { cost: 1 }, line: "pusan",
      result: "The UN votes to defend the South. By August, its troops are trapped at Pusan.", real: "The USSR was skipping UN meetings, so it couldn't block the vote.", src: "UN Security Council votes, June 27 and July 7, 1950", reveal: CONT },
    { icon: "🪖", title: "Send troops alone", label: "Send U.S. troops alone, without the UN", good: "fast", cost: "no allies", trail: "Sent U.S. troops alone (what if)", fx: { risk: 2 }, line: "pusan",
      result: "The USSR calls it an American invasion. The North still pushes to Pusan.", whatIf: "What if: this never happened.", real: "Truman went to the UN. 16 nations sent troops.", src: "Office of the Historian", reveal: CONT },
    { icon: "✈️", title: "Ships and planes only", label: "Send only ships and planes, no ground troops", good: "fewer U.S. dead", cost: "can't stop tanks", trail: "Ships and planes only (what if)", fx: { cost: 2 }, line: "pusan",
      result: "Planes can't stop tanks. The North rolls all the way to Pusan.", real: "Truman sent ships and planes June 27, then soldiers June 30.", src: "Truman Library", reveal: CONT }
  ];
  S[4] = app => decisionStep(app, { id: "d3", check: "c3", title: "Invasion!", seat: "Seat 3 · United States",
    intro: { next: "Take Truman's seat →", enter: () => eventOnce("inv", { cost: 2 }, "seoul", "North Korea invaded"),
      say: [["wire", "June 25, 1950: North Korea invades the South."], ["wire", "Seoul falls in three days."]],
      body: () => evTags("inv") },
    evidence: doc("🇺🇸 PRESIDENT TRUMAN · JUNE 27, 1950", ["“Communism has passed beyond [secret plots] to conquer independent nations and will now use armed invasion and war.”"], "Statement by the President on the situation in Korea. Truman Library", "quote"),
    say: [["wire", "The South is collapsing. What does the U.S. do?"]],
    choices: () => D3 });

  // 5 · Seat 3 again: how far north? (decision 4)
  const D4 = [
    { icon: "🛑", title: "Stop at the 38th", label: "Stop at the 38th parallel. The South is safe", good: "South is safe", cost: "North survives", trail: "Stopped at the 38th (what if)", fx: { risk: -1 }, flag: { path: "p38" },
      result: "UN troops hold the 38th. Rhee is furious.", whatIf: "What if: this never happened.", real: "UN troops crossed. South Korean troops went first, Oct. 1.", src: "U.S. Army Center of Military History",
      reveal: "Crossing the 38th changed the goal: from <b>saving the South</b> to <b>taking the North</b>." },
    { icon: "⛰️", title: "Stop halfway", label: "Cross, but stop north of Pyongyang, far from China", good: "space from China", cost: "half a win", trail: "Stopped halfway north (what if)", fx: { risk: 1, cost: 1 }, flag: { path: "neck" }, line: "neck",
      result: "UN troops take Pyongyang and dig in.", whatIf: "What if: this never happened.", real: "Britain suggested a safe zone near China. It never happened.", src: "Foreign Relations of the United States, 1950",
      reveal: "Crossing the 38th changed the goal: from <b>saving the South</b> to <b>taking the North</b>." },
    { icon: "🏞️", title: "Push to the Yalu", label: "Push all the way to the Yalu River and unite Korea", good: "unite Korea", cost: "China's border", trail: "Pushed to the Yalu", fx: { risk: 2, cost: 1 }, flag: { path: "yalu" }, line: "yalu",
      result: "UN troops race north toward China's border.", real: "This really happened. Some troops reached the Yalu in late October.", src: "U.S. Army Center of Military History",
      reveal: "Crossing the 38th changed the goal: from <b>saving the South</b> to <b>taking the North</b>." }
  ];
  S[5] = app => decisionStep(app, { id: "d4", title: "Over the Line?", seat: "Seat 3 · U.S. + UN",
    intro: { next: "Decide: how far north? →", enter: () => eventOnce("inchon", { cost: 1 }, "split", "UN landed at Inchon"),
      say: [["wire", "Sept. 15, 1950: UN troops land at Inchon, behind the North's army."], ["wire", "The North's army breaks. The line flips back to the 38th."]],
      body: () => evTags("inchon") + srcLine("Naval History and Heritage Command") },
    body: `<div class="cables">` +
      doc("🇰🇷 RHEE WANTS", ["March north. Unite Korea now."], "", "cable") +
      doc("🇨🇳 CHINA WARNS · OCT. 3, 1950", ["“If U.S. troops cross the 38th parallel, China will fight.”"], "Zhou Enlai to India's ambassador, who passed it on (short version)", "cable") + `</div>`,
    say: [["wire", "Still Truman's seat. The UN army reaches the 38th."]],
    choices: () => D4 });

  // 6 · Seat 4: Mao (check 4 + decision 5)
  const BUFFER = "<b>Buffer</b> = a safe zone between you and an enemy. China wanted North Korea as its buffer.";
  const D5 = [
    { icon: "🇨🇳", title: "Send Chinese troops", label: "Send Chinese troops into Korea", good: "push the U.S. back", cost: "huge losses", trail: "China sent troops", fx: { risk: 1, cost: 2 }, line: "jan51", flag: { chinaIn: true },
      result: "About 300,000 Chinese troops strike. UN troops fall back past Seoul.", real: "China came in, Oct. 1950. Seoul fell again Jan. 4, 1951.", src: "Office of the Historian", reveal: BUFFER },
    { icon: "🧱", title: "Guard the border only", label: "Guard China's side of the border, but don't enter Korea", good: "fewer Chinese die", cost: "U.S. at the Yalu", trail: "China only guarded the border (what if)", fx: { risk: -1 },
      result: "Chinese troops wait at the river. U.S. troops stay close.", whatIf: "What if: this never happened.", real: "China didn't wait. It attacked in late October 1950.", src: "Office of the Historian", reveal: BUFFER },
    { icon: "☭", title: "Ask Stalin's army to fight", label: "Ask Stalin to send the Soviet army", good: "a big partner", cost: "Stalin may say no", trail: "Asked Stalin for an army", fx: { risk: 1 },
      result: "Stalin says no army. China must decide alone.", real: "Stalin sent no army. Soviet pilots flew in secret, starting Nov. 1950.", src: "Wilson Center Digital Archive", reveal: BUFFER }
  ];
  const D5S = [
    { icon: "👀", title: "Stay out and watch", label: "Stay out. U.S. troops are not at China's border", good: "no war with U.S.", cost: "North stays weak", trail: "China stayed out (what if)", fx: { risk: -1 },
      result: "China watches from across the Yalu.", whatIf: "What if: this never happened.", real: "UN troops really crossed the 38th. Then China came in.", src: "Office of the Historian", reveal: BUFFER },
    { icon: "🇨🇳", title: "Send troops anyway", label: "Send Chinese troops into Korea anyway", good: "save North Korea", cost: "huge losses", trail: "China sent troops", fx: { risk: 1, cost: 2 }, line: "jan51", flag: { chinaIn: true },
      result: "Chinese troops pour south. Seoul falls again.", real: "China came in, Oct. 1950, after UN troops crossed the 38th.", src: "Office of the Historian", reveal: BUFFER }
  ];
  S[6] = app => decisionStep(app, { id: "d5", check: "c4", title: "China's Choice", seat: "Seat 4 · China",
    checkSay: [["wire", "Beijing, October 1950. China's leaders argue for days."]],
    evidence: doc("🇨🇳 CHINA · OCTOBER 1950", ["1949: Mao's Communists win China's civil war.", "June 1950: the U.S. Navy moves between China and Taiwan.", "Now UN troops head north, toward the Yalu River."], "Office of the Historian", "parchment"),
    say: () => [["wire", st.f.path === "p38" ? "What if: UN troops stopped at the 38th. You're Mao. What now?" : "UN troops are close to China's border. You're Mao. What now?"]],
    choices: () => (st.f.path === "p38" ? D5S : D5) });

  // 7 · Seat 5: Rhee (stalemate intro + decision 6)
  const D6 = [
    { icon: "✍️", title: "Sign the deal", label: "Sign the armistice and accept a split Korea", good: "shooting stops", cost: "Korea stays split", trail: "Rhee signed (what if)", fx: { risk: -1 },
      result: "South Korea signs. The war ends a little sooner.", whatIf: "What if: this never happened.", real: "No South Korean leader ever signed the armistice.", src: "Encyclopaedia Britannica, “Korean War: Armistice”",
      reveal: "Local leaders had <b>their own goals</b>, even against their own superpower." },
    { icon: "🔓", title: "Free the prisoners", label: "Wreck the deal: let 27,000 North Korean prisoners walk free", good: "prisoners go free", cost: "talks nearly die", trail: "Rhee freed 27,000 prisoners", fx: { cost: 1 },
      result: "Guards let 27,000 prisoners walk out. The talks almost collapse.", real: "June 18, 1953: Rhee really did this.", src: "Encyclopaedia Britannica, “Korean War: Armistice”",
      reveal: "Local leaders had <b>their own goals</b>, even against their own superpower." },
    { icon: "⚔️", title: "Fight on alone", label: "Keep fighting to unite Korea, even without the U.S.", good: "keep the dream", cost: "no U.S. help", trail: "Rhee fought on (what if)", fx: { risk: 1, cost: 2 },
      result: "Without U.S. troops, the South can't win alone.", whatIf: "What if: this never happened.", real: "Rhee threatened this. On July 9 he agreed to accept the deal, after U.S. promises.", src: "Encyclopaedia Britannica, “Korean War: Armistice”",
      reveal: "Local leaders had <b>their own goals</b>, even against their own superpower." }
  ];
  S[7] = app => decisionStep(app, { id: "d6", title: "Stuck", seat: "Seat 5 · South Korea", hills: true,
    intro: { next: "Take Rhee's seat →", enter: () => eventOnce("stale", { cost: 2 }, "stale", "Two years of stalemate"),
      say: [["wire", "1951–1953: both sides dig in near the 38th."], ["wire", "Peace talks drag on for two years."]],
      body: () => evTags("stale") +
        `<div class="moved"><div><b>1950</b><span class="mbar big"></span><small>line swings 300+ miles</small></div><div><b>1951–53</b><span class="mbar tiny"></span><small>line barely moves</small></div></div>` +
        newWord("<b>Stalemate</b> = neither side can win, so the fighting gets stuck.") + srcLine("U.S. Army Center of Military History") },
    body: doc("🇰🇷 SYNGMAN RHEE · JUNE 1953", ["A deal is almost done. It leaves Korea split.", "Rhee still wants one Korea. He hates the deal."], "Encyclopaedia Britannica", "parchment"),
    say: [["wire", "Last seat. You advise Syngman Rhee."]],
    choices: () => D6 });

  // 8 · The shooting stops + scoreboard (no check)
  S[8] = app => {
    if (st.phase === 0) {
      const body = doc("📜 ARMISTICE · JULY 27, 1953", ["<b>Armistice</b> = a deal to stop fighting.", "✔ Fighting stops.", "✔ A DMZ splits Korea.", "✖ No peace treaty. Still none.", "Signed by: UN Command, North Korea, China. <b>Not South Korea.</b>"], "Korean Armistice Agreement. National Archives. DMZ = demilitarized zone, about 2.5 miles wide.", "parchment") +
        nextBtn("Who got what they wanted? →");
      app.innerHTML = scene({ title: "The Shooting Stops", seat: "All sides", body });
      return wireNext(() => toPhase(1));
    }
    const row = (flag, side, goal, got, mark) => `<li><span class="sb-f" aria-hidden="true">${flag}</span><span class="sb-s"><b>${side}</b> wanted ${goal}</span><span class="sb-r ${mark}">${got}</span></li>`;
    const body = `<div class="score"><p class="score-h">🏆 SCOREBOARD · 1953</p><ul>` +
      row("🇰🇵", "Kim", "one Korea under him", "✖ No", "no") +
      row("🇰🇷", "Rhee", "one Korea under him", "✖ No", "no") +
      row("<span class=\"ussr-f\">☭</span>", "Stalin", "a win, with no war vs. the U.S.", "½ Half", "half") +
      row("🇨🇳", "Mao", "no U.S. troops on his border", "✔ Yes", "yes") +
      row("🇺🇸", "U.S. + UN", "to save South Korea", "✔ Yes", "yes") + `</ul></div>` +
      newWord("<b>Hot spot</b> = a place where the Cold War turned into real fighting, or almost did.") + nextBtn("Korea wasn't the only one →");
    app.innerHTML = scene({ title: "Who Got What They Wanted?", seat: "All sides", body });
    wireNext();
  };

  // 9 · Hot Spot Radar: find 3 more hot spots on a real world map (checks m1–m3), then Berlin as a bonus.
  function radarFound() {
    const out = ["korea"];
    RADAR_ORDER.forEach(k => { if (st.done[SPOTS[k].id]) out.push(SPOTS[k].group); });
    if (st.radar >= 3) out.push("germany");
    return out;
  }
  function radarBoard(clickable) {
    const M = window.HOTSPOT_MAP;
    const found = radarFound();
    const pin = (key, label) => {
      const p = M.pins[key], x = (p[0] / M.w * 100).toFixed(2), y = (p[1] / M.h * 100).toFixed(2);
      const grp = key === "berlin" ? "germany" : key;
      const isFound = found.indexOf(grp) >= 0;
      const attrs = `style="left:${x}%;top:${y}%" data-spot="${key}"`;
      if (isFound) return `<span class="pin found${key === "korea" ? " home" : ""}" ${attrs}><span class="pin-dot" aria-hidden="true">★</span><span class="pin-l">${esc(label)}</span></span>`;
      return clickable ? `<button type="button" class="pin" ${attrs} aria-label="Mystery hot spot"><span class="pin-dot" aria-hidden="true">?</span></button>`
        : `<span class="pin idle" ${attrs}><span class="pin-dot" aria-hidden="true">?</span></span>`;
    };
    return `<div class="radar"><div class="sweep" aria-hidden="true"></div>${worldSvg({ found })}
      ${pin("korea", "Korea")}${pin("berlin", "Berlin")}${pin("cuba", "Cuba")}${pin("vietnam", "Vietnam")}${pin("afghanistan", "Afghanistan")}</div>
      <div class="wlegend"><span><i class="lg us"></i>U.S.</span><span><i class="lg su"></i>USSR</span><span><i class="lg cn"></i>China (communist after 1949)</span><span class="wsrc">Map: Natural Earth (public domain). Borders are today's, except the USSR.</span></div>`;
  }
  function bothSides(sp) {
    return `<div class="both flip"><p class="both-h">📍 ${esc(sp.name.toUpperCase())} · ${esc(sp.years)} · WHY BOTH SIDES CARED</p>
      <div class="both-g"><div class="bs us"><b>🇺🇸 U.S.</b><p>${esc(sp.us)}</p></div><div class="bs su"><b><span class="ussr-f">☭</span> USSR</b><p>${esc(sp.su)}</p></div></div>
      ${realFile(esc(sp.real), sp.src)}</div>`;
  }
  function mountRadar(key, onDone) {
    const sp = SPOTS[key], id = sp.id;
    const msg = $("rMsg");
    let locked = false;
    document.querySelectorAll(".radar button.pin").forEach(b => {
      b.onclick = () => {
        if (locked) return;
        if (b.dataset.spot === key) {
          st.done[id] = true;
          if (window.classFirstTry) window.classFirstTry.right(id);
          save(); onDone();
          return;
        }
        st.wrong[id] = (st.wrong[id] || 0) + 1;
        if (window.classFirstTry) window.classFirstTry.wrong();
        save();
        b.classList.add("shake");
        locked = true;
        const all = document.querySelectorAll(".radar button.pin");
        all.forEach(x => { x.disabled = true; });
        let left = LOCK;
        const tick = () => {
          msg.className = "msg try";
          if (left <= 0) { locked = false; msg.textContent = F("✖ {h}", { h: sp.hint }); all.forEach(x => { x.disabled = false; x.classList.remove("shake"); }); return; }
          msg.textContent = F("✖ {h} ⏳ {n}", { h: sp.hint, n: left });
          left--; lockTimer = setTimeout(tick, 1000);
        };
        tick();
      };
    });
  }
  S[9] = app => {
    if (!window.HOTSPOT_MAP) { app.innerHTML = scene({ title: "Hot Spot Radar", map: false, body: `<p class="msg try">The map didn't load. Refresh the page.</p>` }); return; }
    const i = Math.min(st.radar || 0, 3);
    if (i >= 3) {
      const body = `<p class="rad-h">📡 Bonus hot spot: <b>Berlin</b>. No big battle, but the world held its breath.</p>` + radarBoard(false) + bothSides(SPOTS.berlin) + nextBtn("See your results →");
      app.innerHTML = scene({ title: "Hot Spot Radar", seat: "The whole world", map: false, body });
      return wireNext();
    }
    const key = RADAR_ORDER[i], sp = SPOTS[key];
    if (st.done[sp.id]) {
      const body = `<p class="rad-h">✔ Found <b>${esc(sp.name)}</b>!</p>` + radarBoard(false) + bothSides(sp) + nextBtn(i < 2 ? "Next hot spot →" : "One more →");
      app.innerHTML = scene({ title: "Hot Spot Radar", seat: "The whole world", map: false, body });
      return wireNext(() => { st.radar = i + 1; save(); render(); window.scrollTo(0, 0); });
    }
    const intro = i === 0 ? `<span class="m-k">Korea wasn't the only hot spot. Find 3 more!</span>` : "";
    const body = `<div class="mission">${intro}<span class="m-n">📡 ${i + 1} of 3</span><p>${esc(sp.mission)}</p><b>Tap it on the map.</b></div><p class="msg r-msg" id="rMsg" role="status" aria-live="polite"></p>` + radarBoard(true);
    app.innerHTML = scene({ title: "Hot Spot Radar", seat: "The whole world", map: false, body });
    mountRadar(key, () => render());
  };

  // 10 · Ending (results report), then the real cost
  const ENDINGS = {
    brink: { e: "💥", title: "Superpowers Face to Face", text: "Your choices put Soviet and American soldiers in the same war. In real life, they never fought each other head-on. That's what made Korea a proxy war." },
    ruins: { e: "🏚️", title: "Korea Paid the Price", text: "The superpowers stayed safe at home. Korea was wrecked, and the line ended about where it started. That's close to what really happened." },
    cool: { e: "🕊️", title: "A Cooler War", text: "In your version, fewer Koreans died and the superpowers stayed apart. In real life, the war killed millions." },
    frozen: { e: "🧊", title: "A Frozen Line", text: "Three years of war. The line ended near the 38th, where it started. No one got one Korea." }
  };
  function endingKey() {
    const m = st.m;
    if (st.f.widened && m.risk >= 8) return "brink";
    if (m.cost >= 9) return "ruins";
    if (m.risk <= 4 && m.cost <= 7) return "cool";
    return "frozen";
  }
  S[10] = app => {
    const k = endingKey(), E = ENDINGS[k];
    if (st.ending !== k) { st.ending = k; save(); }
    if (st.phase === 1) {
      const body = `<div class="memorial"><p class="m-h">THE REAL COST</p>
          <p>🕯️ Millions of Koreans died, many of them civilians.</p>
          <p>🕯️ Hundreds of thousands of Chinese soldiers died.</p>
          <p>🕯️ About 36,500 Americans died.</p>
          <p>🗺️ Korea is still split today.</p>
          <p class="src">U.S. Department of Defense; Office of the Historian. South Korea was ruled by dictators until it became a democracy in 1987. North Korea is still a communist dictatorship.</p></div>` +
        nextBtn("Write your report →");
      app.innerHTML = scene({ title: "The Real Cost", map: false, body });
      return wireNext();
    }
    const trail = st.trail.filter(t => Object.keys(t.fx).length).map(t => `<li><span>${esc(t.label)}</span><span class="tags">${fxTags(t.fx)}</span></li>`).join("");
    const body = `<div class="front ${k}"><p class="masthead" aria-hidden="true">HOT SEAT REPORT · KOREA 1950–1953</p>
        <div class="headline"><span class="e-big" aria-hidden="true">${E.e}</span><h3>${esc(E.title)}</h3></div>
        <p>${esc(E.text)}</p>
        <div class="finalm"><span>💥 Big-war risk <b>${st.m.risk}/10</b></span><span>🏚️ Cost to Koreans <b>${st.m.cost}/10</b></span></div>
        <h4 class="cb">Caused by:</h4><ul class="trail">${trail}</ul></div>` +
      nextBtn("The real cost →");
    app.innerHTML = scene({ title: "Your Results", map: false, body });
    wireNext(() => toPhase(1));
  };

  // 11 · Hot spot report + turn in (two short pages)
  const SIDES = [["kim", "north korea", "north"], ["rhee", "south korea", "south"], ["stalin", "ussr", "soviet", "russia"], ["mao", "china", "chinese"], ["truman", "u.s", "=us", "=usa", "america", "united states", "united nations", "=un", "u.n"]];
  const PROMPTS = [
    { id: "sides", short: "What two sides wanted in Korea", label: "1. Pick TWO sides in the Korean War. What did each one want? Did they get it?",
      stem: "___ wanted ___. But ___ wanted ___. In the end, ___.", min: 50, newWords: 5, minSides: 2,
      mustAll: [["want", "goal", "tried", "hope", "wish"]],
      mustMsg: "In answer 1, name TWO sides (like Kim, Stalin, Truman, Mao or Rhee) and say what each one wanted." },
    { id: "hotspot", short: "Why a hot spot mattered to both sides", label: "2. Pick ONE hot spot from the map (not Korea). Why did it matter to BOTH the U.S. and the USSR?",
      stem: "___ mattered to the U.S. because ___. It mattered to the USSR because ___.", min: 60, newWords: 6,
      mustAll: [["cuba", "vietnam", "afghanistan", "berlin"], ["u.s", "=us", "=usa", "america", "united states", "kennedy", "carter"], ["ussr", "soviet", "russia", "khrushchev", "moscow"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name Cuba, Vietnam, Afghanistan or Berlin, give a reason for the U.S. AND for the USSR, and use “because.”" }
  ];
  // "Peek" notes so a student who forgot (or missed a day) can still write from what the game showed.
  function peek(id) {
    if (id === "sides") return `<details class="peek"><summary>🪑 Peek at the 5 seats</summary><ul>
      <li>🇰🇵 Kim (North Korea): one Korea, under him → ✖</li><li>🇰🇷 Rhee (South Korea): one Korea, under him → ✖</li>
      <li><span class="ussr-f">☭</span> Stalin (USSR): help Kim, but no war with the U.S. → half</li><li>🇺🇸 Truman (U.S. + UN): stop communism spreading by war → ✔</li>
      <li>🇨🇳 Mao (China): keep U.S. troops away from China → ✔</li></ul></details>`;
    return `<details class="peek"><summary>📡 Peek at your radar notes</summary><ul>` +
      ["cuba", "vietnam", "afghanistan", "berlin"].map(k => `<li><b>${SPOTS[k].name} (${SPOTS[k].years})</b> · U.S.: ${esc(SPOTS[k].us)} · USSR: ${esc(SPOTS[k].su)}</li>`).join("") + `</ul></details>`;
  }
  S[11] = app => {
    const pg = st.phase === 1 ? 1 : 0;
    const page = (p, i) => `<div class="vpage"${i !== pg ? " hidden" : ""}><label for="w_${p.id}">${esc(p.label)}</label>${peek(p.id)}<p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea></div>`;
    const tail = pg === 0
      ? `<button type="button" class="go" id="pageBtn">Next page →</button><p id="pageMsg" class="msg" role="status" aria-live="polite"></p>`
      : `<label for="nameBox2" class="namel">Your name</label><input id="nameBox2" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">` +
        `<div class="vrow"><button type="button" class="back" id="backBtn">← Page 1</button><button type="button" class="go" id="sendBtn">📮 ${st.turnedIn ? "Turn in again" : "Turn in"}</button></div><p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in. You can fix your writing and turn it in again." : ""}</p>`;
    const body = `<div class="memo"><p class="vm-h">CLASSIFIED · HOT SPOT REPORT · ${pg + 1}/2</p>` + PROMPTS.map(page).join("") + tail + `</div>`;
    app.innerHTML = scene({ title: "Your Report", map: false, body });
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
  // "=us" means the whole word "us" (so "US" counts, but "usually" doesn't).
  function hasWord(text, w) {
    const whole = w.charAt(0) === "=";
    const core = plain(whole ? w.slice(1) : w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("(^|[^\\p{L}])" + core + (whole ? "(?![\\p{L}])" : ""), "iu").test(text);
  }
  // Returns a message if the answer isn't ready yet, or "" if it's fine.
  function writingProblem(p) {
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: p.stem, source: "from today", sourceEs: "de hoy" });
      if (junk) return F("For {s}: ", { s: p.short }) + junk;
    }
    if (v.length < p.min) { box.focus(); return F("Write a little more for: {s} (1–2 full sentences).", { s: p.short }); }
    if (/_{2,}/.test(v)) { box.focus(); return F("Fill in the blanks with your own words for: {s}.", { s: p.short }); }
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshW.size < p.newWords) { box.focus(); return F("Add more of your own ideas for: {s}. Use details from today.", { s: p.short }); }
    const t = plain(v);
    if (p.minSides && SIDES.filter(g => g.some(w => hasWord(t, w))).length < p.minSides) { box.focus(); return p.mustMsg; }
    if (p.mustAll.some(g => !g.some(w => hasWord(t, w)))) { box.focus(); return p.mustMsg; }
    return "";
  }
  async function sendWork() {
    const msg = $("sendMsg");
    const bad = t => { msg.textContent = t; msg.className = "msg try"; };
    const nm = window.classShortName ? window.classShortName($("nameBox2").value) : $("nameBox2").value.trim();
    if (!/^\S+ [A-Z]\.$/.test(nm)) { bad("Type your first name and last initial, like Jordan M."); $("nameBox2").focus(); return; }
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
    CHECK_ORDER.forEach(id => {
      const q = CHECKS[id];
      const ans = q.radar ? "Tapped " + SPOTS[q.radar].name : q.options[0];
      answers[q.short] = ans + (st.wrong[id] ? " (after " + st.wrong[id] + " wrong " + (st.wrong[id] === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    const CH = { d1: "Kim's seat: how to unite Korea", d2: "Stalin's seat: answer to Kim", d3: "Truman's seat: response to the invasion", d4: "U.S./UN seat: how far north", d5: "Mao's seat: China's move", d6: "Rhee's seat: the armistice deal" };
    Object.keys(CH).forEach(k => { if (st.picks[k]) answers["Choice · " + CH[k]] = st.picks[k]; });
    const E = ENDINGS[st.ending || endingKey()];
    answers["Ending"] = E.title;
    answers["Caused by"] = st.trail.filter(t => Object.keys(t.fx).length).map(t => t.label + " (" + fxText(t.fx) + ")").join(" · ");
    answers["Final meters"] = "Big-war risk " + st.m.risk + "/10 · Cost to Koreans " + st.m.cost + "/10";
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(CFG.oldApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: CFG.assignmentId, assignmentTitle: CFG.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.innerHTML = `<span class="stamp slam">📮 DELIVERED</span> ✓ Turned in! You're done.`; msg.className = "msg good";
      $("sendBtn").textContent = "✓ Turned in";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg try"; $("sendBtn").disabled = false; }
  }

  // =====================================================================
  //  TITLE SCREEN + RENDER
  // =====================================================================
  function title(app) {
    app.innerHTML = `<section class="title-card">
      <div class="t-grid"><div class="t-left">
        <p class="t-kick">World History · Unit 2 · Day 3</p>
        <h1>Hot Seat: Korea</h1>
        <p class="hook">1950. Five sides. One line across Korea. Sit in every seat.</p>
        <div class="t-chips"><span>🪑 5 seats</span><span>🔍 7 checks</span><span>📡 world radar</span><span>⏱️ 25 min</span></div>
        <p class="goal"><b>Goal:</b> explain what each side wanted in Korea, and find other Cold War hot spots on a map.</p>
        <div class="t-start"><label for="nameBox">Your name</label>
        <div class="t-row"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <button type="button" class="go start" id="startBtn">Start →</button></div>
        <p id="introMsg" class="msg" role="status"></p></div>
      </div>
      <div class="t-art" aria-hidden="true"><div class="radar mini">${worldSvg({ found: ["korea"] })}<span class="blip" style="${blipPos("korea")}"></span><span class="blip b2" style="${blipPos("cuba")}"></span><span class="blip b3" style="${blipPos("berlin")}"></span></div>
        <div class="t-cast"><span>🇰🇵</span><span>🇰🇷</span><span class="ussr-f">☭</span><span>🇨🇳</span><span>🇺🇸</span></div></div></div>
    </section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg try"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; st.phase = 0; save(); render(); window.scrollTo(0, 0);
    };
  }
  function blipPos(k) {
    const M = window.HOTSPOT_MAP; if (!M) return "display:none";
    const p = M.pins[k]; return `left:${(p[0] / M.w * 100).toFixed(2)}%;top:${(p[1] / M.h * 100).toFixed(2)}%`;
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
    if (!confirm("Start over? This clears your work on this device.")) return;
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
})();
