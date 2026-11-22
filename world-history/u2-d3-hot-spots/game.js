// =====================================================================
//  HOT SPOTS: KOREA · WORLD REPORTER  (World History · Unit 2 · Day 3 · "Hot Spots: Why Fight Far From Home?")
//  2026-11-14 (Fynn: "swap it"): replaces the first Hot Seat game. Built on U.S. History's
//  War Reporter engine (U3 D2), rewritten for the WORLD view and the WH Day 3 goals:
//   1. why the superpowers backed sides far from home  → the 7-link cause → effect chain
//   2. what local groups AND superpowers each wanted (WH.37) → 4 "Whose goal?" source proofs
//      + propaganda from BOTH sides (Chinese radio, North Korean radio, MacArthur's press office)
//   3. locate other hot spots on a map (WH.34) → Hot Spot Radar (Cuba, Vietnam, Afghanistan + Berlin)
//  Credibility is tracked for the teacher only (no meter, number or rank on screen). Printing propaganda
//  gets flagged by your editor. The Korea map's front line moves as the chain grows.
//  Ends with a neutral front page (the chain, no score or rank), the real cost, and 2 short answers.
//  The ending, misses and credibility still go to the teacher in the turn-in data.
//  Same assignmentId as the old Hot Seat. Turn-in: shared/turnin.js classTurnIn. Test T. can skip everything.
// =====================================================================
(function () {
  "use strict";
  const KEY = "wh-u2-d3-hot-spots-v2";
  const CFG = {
    assignmentId: "wh-u2-d3-hot-spots",
    title: "World History · Unit 2 · Day 3 · Hot Spots: Korea (Why Fight Far From Home?)",
    standard: "SS.9-12.WH.34, SS.9-12.WH.37",
    oldApi: "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit"
  };
  const LOCK = 5;
  const L = s => s;
  const F = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m));
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const TT = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };

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

  // =====================================================================
  //  THE ROUNDS (Korea, told from every side). effects[0] is right.
  //  spin: index of the wrong effect a propaganda desk is pushing; spinBy: whose desk.
  //  proof: a "Whose goal?" source check (WH.37). sources[0] is right.
  // =====================================================================
  const ROUNDS = [
    { id: "r1", got: "Two rival Koreas", date: "1945–48", title: "A Line on the Map", from: "split", to: "split",
      cause: "1945: Japan loses World War II. Soviet troops take the North. U.S. troops take the South. By 1948, each half has its own government, and BOTH leaders claim all of Korea.",
      q: "What did splitting Korea cause?",
      effects: ["Two rival Koreas, each wanting to rule the whole country", "One united Korea, run for a few years by the United Nations", "Japan kept ruling the South as a colony until 1950"],
      hint: "The USSR backed one half and the U.S. backed the other. Did either leader want to share?",
      link: "Korea split",
      proof: { q: "Whose goal? Which source shows what a KOREAN leader wanted?",
        sources: [
          ["🇰🇵 Soviet report · Jan. 1950 (summary)", "Kim Il Sung, North Korea's leader, asks Stalin to let him attack the South and unite Korea under communism."],
          ["🇺🇸 U.S. Army officers · Aug. 1945 (summary)", "Two officers pick the 38th parallel as the dividing line in one night, using a small map."],
          ["🗺️ Map note · 1945", "The 38th parallel cuts Korea about in half."]],
        hint: "Find the source where a Korean leader says what HE wants." },
      key: "<b>Local goals</b> = what people IN the hot spot wanted. Kim (North) and Rhee (South) BOTH wanted one Korea, under themselves." },
    { id: "r2", got: "UN defends the South", date: "JUN 1950", title: "Invasion", from: "split", to: "seoul",
      cause: "June 25, 1950: North Korea invades the South, with Soviet tanks and Stalin's OK. Stalin wants a communist Korea, but he won't send a Soviet army. In three days, Seoul falls.",
      q: "What did the United Nations do?",
      effects: ["Voted to defend the South. 16 countries sent troops.", "Nothing, because the USSR used its veto to block any action", "Sent peacekeepers to keep the two Korean armies apart"],
      hint: "That summer the USSR was boycotting the UN, so it wasn't there to vote no.",
      link: "North invades",
      proof: { q: "Whose goal? Which source shows why the U.S. cared about a country so far away?",
        sources: [
          ["🇺🇸 President Truman · June 27, 1950", "“Communism has passed beyond [secret plots] to conquer independent nations and will now use armed invasion and war.”"],
          ["📠 News cable · June 28, 1950", "“Seoul has fallen. South Korean troops are retreating south.”"],
          ["📁 File · Korea, 1945", "“Japan ruled Korea from 1910 to 1945.”"]],
        hint: "Find the source that talks about communism spreading." },
      key: "<b>Proxy war</b> = the superpowers fight THROUGH other countries' armies, not head-on. The USSR armed the North. The U.S. led the UN side to <b>contain</b> communism." },
    { id: "r3", got: "Inchon landing", date: "SEP 1950", title: "Trapped at Pusan", from: "pusan", to: "split",
      cause: "Summer 1950: UN troops from the U.S., Britain, and other countries are pushed into a small corner around Pusan, at the southern tip of Korea.",
      q: "What did the UN commander, U.S. General MacArthur, do to break out?",
      effects: ["Landed troops behind enemy lines at Inchon, near Seoul", "Pulled every UN soldier out of Pusan by ship to Japan", "Asked China to send its army to help push North Korea back"],
      hint: "Look at the map. Where is Inchon compared to the enemy army?",
      link: "UN defends the South", key: "<b>Inchon</b> = MacArthur's surprise landing, Sept. 15, 1950. It pushed the North Koreans back to the 38th." },
    { id: "r4", got: "China attacks", date: "NOV 1950", title: "Too Close to China", from: "yalu", to: "jan51",
      cause: "Fall 1950: UN troops cross the 38th parallel and race north toward the Yalu River, China's border. China became communist just one year ago.",
      q: "What did pushing toward China cause?",
      effects: ["China sent hundreds of thousands of troops to attack", "Only a few Chinese volunteers joined the fight, on their own", "The Soviet Union told North Korea to surrender to the UN"],
      spin: 1, spinBy: "beijing",
      hint: "Look at who lives on the other side of the Yalu River. And how many came?",
      link: "Inchon landing",
      proof: { q: "Whose goal? Which source shows what CHINA wanted?",
        sources: [
          ["🇨🇳 China's warning · Oct. 3, 1950", "If U.S. troops cross the 38th parallel, China will fight. (Message from China's leaders, sent through India.)"],
          ["👨‍✈️ MacArthur to Truman · Oct. 15, 1950", "Chance that China fights? “Very little.”"],
          ["📣 MacArthur's press office · Nov. 1950", "“The boys will be home by Christmas.”"]],
        hint: "Which source comes from China, and says what China will do?" },
      key: "China called its army the “People's Volunteers,” but about 300,000 soldiers came at first. Mao's goal: keep U.S. troops away from China's border. UN troops retreat, and Seoul falls again in January 1951." },
    { id: "r5", got: "Stalemate", date: "1951–53", title: "Stuck", from: "jan51", to: "stale",
      cause: "1951: China's huge army and the UN's air power are evenly matched. Neither side can break through.",
      q: "What did that cause?",
      effects: ["Two years of fighting over the same hills near the 38th", "A quick UN win and one united Korea by the end of 1951", "North Korea gave up after a huge bombing raid on Pyongyang"],
      hint: "If neither side can break through, does the line move much?",
      link: "China attacks", key: "<b>Stalemate</b> = neither side can win, so the fighting gets stuck." },
    { id: "r6", got: "MacArthur fired", date: "APR 1951", title: "Keep It Small", from: "stale", to: "stale",
      cause: "1951: MacArthur wants to bomb China, maybe with atomic bombs. China's ally is the USSR, which has atomic bombs too. MacArthur says in public: “There is no substitute for victory.”",
      q: "What did MacArthur's public fight with President Truman cause?",
      effects: ["Truman fired him to keep Korea from turning into a world war", "The UN put MacArthur in charge of all its member countries", "Truman let him bomb China so the war would end faster"],
      spin: 2, spinBy: "press",
      hint: "If the U.S. bombs China, who might join the fight next?",
      link: "Stalemate",
      key: "Truman on the radio, April 11, 1951: “We are trying to prevent a third world war.” <b>Limited war</b> = fighting to hold a line, not to crush the enemy, so the war doesn't spread." },
    { id: "r7", got: "Armistice", date: "JUL 1953", title: "The Shooting Stops", from: "stale", to: "stale",
      cause: "Peace talks drag on for two years while soldiers keep dying. In March 1953, Stalin dies, and the new Soviet leaders want calmer times.",
      q: "What did the talks finally cause?",
      effects: ["An armistice: the fighting stopped, but no peace treaty", "A full peace treaty that made Korea one united country again", "North Korea won the war, and the Americans went home"],
      spin: 2, spinBy: "pyongyang",
      hint: "Was Korea ever reunited? Is it still split today?",
      link: "MacArthur fired",
      proof: { q: "Whose goal? Which source shows SOUTH Korea's leader did NOT want this ending?",
        sources: [
          ["🇰🇷 Syngman Rhee · 1953 (summary)", "South Korea's president refuses to sign the armistice. He wants to keep fighting until Korea is one country."],
          ["☭ Soviet leaders · spring 1953 (summary)", "After Stalin dies, they push China and North Korea to make a deal."],
          ["🇺🇳 UN Command · July 27, 1953 (summary)", "The armistice is signed at Panmunjom, near the 38th parallel."]],
        hint: "Find the source about South Korea's leader." },
      key: "<b>Armistice</b> = an agreement to stop fighting. No peace treaty was ever signed. Korea is still split near the 38th." }
  ];
  // The made-up hot spots step (real map + real facts), after the chain.
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
  const RADAR_STEP = ROUNDS.length + 1;
  const STEPS = ROUNDS.length + 3;   // rounds, radar, ending, memo

  // ---------- state ----------
  function fresh() { return { v: 1, name: "", step: 0, ph: "effect", cred: 10, wrong: {}, misses: [], links: 0, line: "split", radar: 0, done: {}, writing: {}, turnedIn: false }; }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1) st = fresh();
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  let mapFrom = null, justLinked = false;
  // Credibility goes to the teacher in the turn-in data only. Students never see it.
  function cred(n) { st.cred = Math.max(0, Math.min(10, st.cred + n)); }

  // ---------- HUD ----------
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const r = ROUNDS[st.step - 1];
    const d = (r ? r.date : st.step === RADAR_STEP ? "RADAR 1948–89" : "JUL 1953").split(" ");
    $("calMo").textContent = d.length > 1 ? d[0] : "—"; $("calYr").textContent = d[d.length - 1];
    $("stepText").textContent = "Step " + Math.min(st.step, STEPS) + " of " + STEPS;
    $("stepFill").style.width = Math.round(Math.min(st.step, STEPS) / STEPS * 100) + "%";
    $("pressMood").textContent = st.misses.some(m => m.spin) ? "fooled you" : "spinning";
    document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px");
  }

  // ---------- pieces ----------
  // Propaganda desks from BOTH sides (WH.37: groups pushing their own story). All use the "press" look.
  const WHO = { editor: ["🧑‍💼", "Your editor"], press: ["📣", "MacArthur's press office (U.S.)", "press"], beijing: ["📻", "Chinese state radio", "press"], pyongyang: ["📻", "North Korean state radio", "press"], cable: ["📠", "News cable"] };
  const bub = (who, text, cls) => `<div class="bub ${WHO[who][2] || who}${cls ? " " + cls : ""}"><span class="av" aria-hidden="true">${WHO[who][0]}</span><div class="bt"><b>${esc(WHO[who][1])}</b><p>${text}</p></div></div>`;
  function jobStrip(steps, now) {
    return `<ol class="job" aria-label="Your job">${steps.map((t, i) => `<li class="${i < now ? "did" : i === now ? "now" : ""}"${i === now ? ' aria-current="step"' : ""}>${esc(t)}</li>`).join("")}</ol>`;
  }
  // The chain so far (the thing students are building).
  function chainHtml(n, newest) {
    const pills = ROUNDS.slice(0, n).map((r, i) => `<li class="${newest && i === n - 1 ? "new" : ""}">${esc(r.got)}</li>`).join("");
    return `<div class="chainbox"><p class="ch-h">🔗 Your cause → effect chain</p><ol class="chain"><li class="start">1945: Korea split</li>${pills}${n < ROUNDS.length ? `<li class="todo">?</li>` : ""}</ol></div>`;
  }
  function scene(o) {
    const map = o.map === false ? "" : `<div class="map-wrap">${mapSvg({ line: st.line })}</div>`;
    return `<section class="scene"><div class="sc-top"><h2>${esc(o.title)}</h2></div>
      ${o.job ? `<div class="sc-job">${o.job}</div>` : ""}
      <div class="board${map ? "" : " nomap"}">${map}<div class="side">${o.body}</div></div></section>`;
  }
  function nextBtn(label) { return `<button type="button" class="go" id="nextBtn">${esc(label)}</button>`; }
  let goStep = function (n) { st.step = n; st.ph = "effect"; save(); render(); window.scrollTo(0, 0); }

  // A multiple-choice pick with lock + reshuffle on a wrong answer.
  let lockTimer = null;
  function mountPick(boxId, pickId, options, isRight, onRight, onWrong, hint, render1) {
    const box = $(boxId); if (!box) return;
    const msg = document.createElement("p"); msg.className = "msg"; msg.setAttribute("role", "status"); msg.setAttribute("aria-live", "polite");
    const area = document.createElement("div"); area.className = "choices";
    box.append(area, msg);
    let last = "", locked = false;
    function draw() {
      area.replaceChildren();
      let order = shuffle(options.map((_, n) => n));
      if (order.join() === last && order.length > 1) order.push(order.shift());
      last = order.join();
      order.forEach(n => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice reply";
        b.innerHTML = render1(options[n], n);
        b.onclick = () => {
          if (locked) return;
          if (isRight(n)) { if (window.classFirstTry) window.classFirstTry.right(pickId); onRight(); return; }
          st.wrong[pickId] = (st.wrong[pickId] || 0) + 1;
          if (window.classFirstTry) window.classFirstTry.wrong();
          const extra = onWrong(n) || "";
          save(); hud();
          locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
          let left = TT() ? 0 : LOCK;
          const tick = () => {
            msg.className = "msg try";
            if (left <= 0) { locked = false; msg.innerHTML = extra + "✖ " + esc(hint) + " The choices were mixed up. Try again."; draw(); return; }
            msg.innerHTML = extra + "✖ " + esc(hint) + " ⏳ " + left;
            left--; lockTimer = setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
  }

  // ---------- one round ----------
  function roundScreen(app, i) {
    const r = ROUNDS[i - 1];
    const hasProof = !!r.proof;
    const job = jobStrip(["Read what happened", "Pick what it caused", hasProof ? "Whose goal? Find the source" : "Add it to your chain"], st.ph === "effect" ? 1 : st.ph === "proof" ? 2 : 3);
    const causeCard = `<div class="cause"><span class="c-tag">⚡ CAUSE · ${esc(r.date)}</span><p>${esc(r.cause)}</p></div>`;
    const pressBub = r.spin != null && st.ph === "effect" ? bub(r.spinBy || "press", "Psst, reporter. Print this: <span class=\"spinq\">“" + esc(r.effects[r.spin]) + "”</span>") : "";
    if (st.ph === "effect") {
      app.innerHTML = scene({ title: r.title, job, body: chainHtml(st.links) + causeCard + pressBub + `<div class="pick"><p class="pick-h">🔍 ${esc(r.q)}</p><div id="pickBox"></div></div>` });
      mountPick("pickBox", r.id, r.effects, n => n === 0,
        () => { st.links++; justLinked = true; mapFrom = st.line; st.line = r.to; st.ph = hasProof ? "proof" : "done"; save(); render(); },
        n => {
          const spin = n === r.spin;
          cred(spin ? -2 : -1);
          const desk = WHO[r.spinBy || "press"][1];
          st.misses.push({ label: (spin ? "Printed propaganda from " + desk + ": “" : "Wrong link: “") + r.effects[n] + "”", n: spin ? -2 : -1, spin });
          return spin ? `<span class="spinwarn">🧑‍💼 Your editor flags the story: that was the propaganda line from ${esc(desk)}. Run a correction.</span><br>` : "";
        },
        r.hint, t => `<span class="r-ico" aria-hidden="true">➡️</span><span class="r-t">${esc(t)}</span>`);
      return;
    }
    const linked = `<div class="linked${justLinked ? " slam" : ""}">✔ <b>${esc(r.effects[0])}</b></div>`;
    justLinked = false;
    if (st.ph === "proof") {
      app.innerHTML = scene({ title: r.title, job, body: chainHtml(st.links, true) + causeCard + linked + `<div class="pick proof"><p class="pick-h">📄 ${esc(r.proof.q)}</p><div id="pickBox"></div></div>` });
      mountPick("pickBox", r.id + "p", r.proof.sources, n => n === 0,
        () => { st.ph = "done"; save(); render(); },
        () => { cred(-1); st.misses.push({ label: "Wrong source: " + r.proof.sources[0][0].replace(/^\S+\s/, "") + " showed whose goal", n: -1 }); return ""; },
        r.proof.hint, s => `<span class="src-h">${esc(s[0])}</span><span class="src-q">${esc(s[1])}</span>`);
      return;
    }
    const last = i === ROUNDS.length;
    app.innerHTML = scene({ title: r.title, job, body: chainHtml(st.links, !hasProof) + causeCard + linked + (hasProof ? `<div class="linked proved">📄 Whose goal: <b>${esc(r.proof.sources[0][0])}</b></div>` : "") +
      `<div class="reveal"><span class="nw">💡 KEY IDEA</span><p>${r.key}</p></div>` + nextBtn(last ? "Zoom out: the whole world →" : "Next event →") });
    $("nextBtn").onclick = () => goStep(i + 1);
    const tgt = $("nextBtn"); if (tgt && tgt.scrollIntoView) setTimeout(() => tgt.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
  }

  // ---------- Hot Spot Radar (real world map: Natural Earth outlines, see worldmap.js) ----------
  const realFile = (line, src) => `<div class="real"><p><b class="real-b">📜 Real</b> ${line}</p>${src ? `<p class="src">Source: ${src}</p>` : ""}</div>`;
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
        cred(-1); st.misses.push({ label: "Wrong spot on the map: looked for " + sp.name, n: -1 });
        save(); hud();
        b.classList.add("shake");
        locked = true;
        const all = document.querySelectorAll(".radar button.pin");
        all.forEach(x => { x.disabled = true; });
        let left = TT() ? 0 : LOCK;
        const tick = () => {
          msg.className = "msg try";
          if (left <= 0) { locked = false; msg.textContent = "✖ " + sp.hint; all.forEach(x => { x.disabled = false; x.classList.remove("shake"); }); return; }
          msg.textContent = "✖ " + sp.hint + " ⏳ " + left;
          left--; lockTimer = setTimeout(tick, 1000);
        };
        tick();
      };
    });
  }
  function radarScreen(app) {
    const job = n => jobStrip(["Read the mission", "Tap the hot spot", "See why both sides cared"], n);
    if (!window.HOTSPOT_MAP) { app.innerHTML = scene({ title: "Hot Spot Radar", map: false, body: `<p class="msg try">The map didn't load. Refresh the page.</p>` }); return; }
    const i = Math.min(st.radar || 0, 3);
    if (i >= 3) {
      const body = `<p class="rad-h">📡 Bonus hot spot: <b>Berlin</b>. No big battle, but the world held its breath.</p>` + radarBoard(false) + bothSides(SPOTS.berlin) + nextBtn("See your front page →");
      app.innerHTML = scene({ title: "Hot Spot Radar", map: false, job: job(2), body });
      $("nextBtn").onclick = () => goStep(RADAR_STEP + 1);
      return;
    }
    const key = RADAR_ORDER[i], sp = SPOTS[key];
    if (st.done[sp.id]) {
      const body = `<p class="rad-h">✔ Found <b>${esc(sp.name)}</b>!</p>` + radarBoard(false) + bothSides(sp) + nextBtn(i < 2 ? "Next hot spot →" : "One more →");
      app.innerHTML = scene({ title: "Hot Spot Radar", map: false, job: job(2), body });
      $("nextBtn").onclick = () => { st.radar = i + 1; save(); render(); window.scrollTo(0, 0); };
      return;
    }
    const intro = i === 0 ? `<span class="m-k">Korea wasn't the only place the superpowers fought through someone else. Find 3 more hot spots!</span>` : "";
    const body = `<div class="mission">${intro}<span class="m-n">📡 ${i + 1} of 3</span><p>${esc(sp.mission)}</p><b>Tap it on the map.</b></div><p class="msg r-msg" id="rMsg" role="status" aria-live="polite"></p>` + radarBoard(true);
    app.innerHTML = scene({ title: "Hot Spot Radar", map: false, job: job(1), body });
    mountRadar(key, () => render());
  }

  // ---------- ending ----------
  // ENDINGS / endKey go to the teacher in the turn-in data only. The student's front page shows no rank.
  const ENDINGS = {
    legend: { e: "🏆", t: "Front-Page Legend", text: "Your chain is solid, you knew what every side wanted, and no propaganda got past you. Readers around the world trust you." },
    solid: { e: "📰", t: "Solid Reporter", text: "You got the story right in the end, but a few wrong links or bits of propaganda made it into print." },
    spun: { e: "📣", t: "Spun by the Propaganda Desks", text: "Too much propaganda and too many wrong links. Readers stopped trusting your paper." }
  };
  const endKey = () => st.cred >= 9 ? "legend" : st.cred >= 6 ? "solid" : "spun";
  function endingScreen(app) {
    const body = `<div class="front"><p class="masthead" aria-hidden="true">THE WORLD DISPATCH · KOREA 1950–1953</p>
        <div class="headline"><span class="e-big" aria-hidden="true">📰</span><h3>${esc("Korea's Hot War, Start to Finish")}</h3></div>
        <p>${esc("You reported the whole war as one chain: Korea split into two rival halves, the North invaded, the UN defended the South, MacArthur landed at Inchon, China attacked, the war got stuck in a stalemate, Truman fired MacArthur, and an armistice stopped the shooting. Then you tracked the Cold War to more hot spots: Cuba, Vietnam, Afghanistan, and Berlin.")}</p>
        ${chainHtml(ROUNDS.length)}</div>
      <div class="memorial"><p class="m-h">THE REAL COST</p>
        <p>🕯️ Millions of Koreans died, many of them civilians.</p><p>🕯️ Hundreds of thousands of Chinese soldiers died.</p>
        <p>🕯️ About 36,500 Americans died, plus soldiers from Britain, Turkey, and other UN countries.</p>
        <p>🗺️ Korea is still split near the 38th parallel today. The U.S. and the USSR never fought each other head-on.</p>
        <p class="src">U.S. Department of Defense; Office of the Historian. South Korea was ruled by dictators until 1987 and is now a democracy. North Korea is still a communist dictatorship.</p></div>
      <div class="reveal"><span class="nw">💡 NEXT TIME</span><p><b>Korea → Vietnam (Day 6)</b>: another split country, another hot spot. But this time the fight starts as a fight for freedom from France.</p></div>` + nextBtn("Write your story →");
    app.innerHTML = scene({ title: "Your Front Page", map: false, job: jobStrip(["See your front page", "Read the real cost", "Write your story"], 1), body });
    $("nextBtn").onclick = () => goStep(STEPS);
  }

  // ---------- writing + turn in ----------
  // Writing (WH.37 + WH.34). From the first Hot Seat, with "peek" notes for kids who missed a day.
  const SIDES = [["kim", "north korea", "north"], ["rhee", "south korea", "south"], ["stalin", "ussr", "soviet", "russia"], ["mao", "china", "chinese"], ["truman", "u.s", "=us", "=usa", "america", "united states", "united nations", "=un", "u.n"]];
  const PROMPTS = [
    { id: "sides", short: "What two sides wanted in Korea", label: "1. Pick TWO sides in the Korean War. What did each one want? Did they get it?",
      stem: "___ wanted ___. But ___ wanted ___. In the end, ___.", min: 50, newWords: 5, minSides: 2,
      mustAll: [["want", "goal", "tried", "hope", "wish"]],
      mustMsg: "In answer 1, name TWO sides (like Kim, Rhee, Stalin, Mao or Truman) and say what each one wanted." },
    { id: "hotspot", short: "Why a hot spot mattered to both sides", label: "2. Pick ONE hot spot from the map (not Korea). Why did it matter to BOTH the U.S. and the USSR?",
      stem: "___ mattered to the U.S. because ___. It mattered to the USSR because ___.", min: 60, newWords: 6,
      mustAll: [["cuba", "vietnam", "afghanistan", "berlin"], ["u.s", "=us", "=usa", "america", "united states", "kennedy", "carter"], ["ussr", "soviet", "russia", "khrushchev", "moscow"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name Cuba, Vietnam, Afghanistan or Berlin, give a reason for the U.S. AND for the USSR, and use “because.”" }
  ];
  function peek(id) {
    if (id === "sides") return `<details class="peek"><summary>🎯 Peek: what each side wanted</summary><ul>
      <li>🇰🇵 Kim (North Korea): one Korea, under him → ✖</li><li>🇰🇷 Rhee (South Korea): one Korea, under him → ✖ (he refused to sign the armistice)</li>
      <li><span class="ussr-f">☭</span> Stalin (USSR): a communist Korea, without a Soviet army or a war with the U.S. → half</li>
      <li>🇺🇸 Truman (U.S. + UN): stop communism spreading, without a world war → ✔ (the South stayed free)</li>
      <li>🇨🇳 Mao (China): keep U.S. troops away from China's border → ✔</li></ul></details>`;
    return `<details class="peek"><summary>📡 Peek at your radar notes</summary><ul>` +
      ["cuba", "vietnam", "afghanistan", "berlin"].map(k => `<li><b>${SPOTS[k].name} (${SPOTS[k].years})</b> · U.S.: ${esc(SPOTS[k].us)} · USSR: ${esc(SPOTS[k].su)}</li>`).join("") + `</ul></details>`;
  }
  function memoScreen(app) {
    const page = p => `<div class="vpage"><label for="w_${p.id}">${esc(p.label)}</label>${peek(p.id)}<p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea></div>`;
    const body = `<div class="memo"><p class="vm-h">YOUR STORY FOR TOMORROW'S PAPER</p>` + PROMPTS.map(page).join("") +
      `<label for="nameBox2" class="namel">Your name</label><input id="nameBox2" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">` +
      `<div class="vrow"><button type="button" class="go" id="sendBtn"${st.turnedIn ? " disabled" : ""}>${st.turnedIn ? "✓ Turned in" : "📮 Turn in"}</button></div><p id="sendMsg" class="msg${st.turnedIn ? " good" : ""}" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in." : ""}</p></div>`;
    app.innerHTML = scene({ title: "Write Your Story", map: false, job: jobStrip(["Answer question 1", "Answer question 2", "Turn in"], 0), body });
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = sendWork;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function hasWord(text, w) {
    const whole = w.charAt(0) === "=";
    const core = plain(whole ? w.slice(1) : w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("(^|[^\\p{L}])" + core + (whole ? "(?![\\p{L}])" : ""), "iu").test(text);
  }
  function writingProblem(p) {
    if (TT()) return "";
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" }); if (junk) return "For " + p.short + ": " + junk; }
    if (v.length < p.min) { box.focus(); return "Write a little more for: " + p.short + " (1–2 full sentences)."; }
    if (/_{2,}/.test(v)) { box.focus(); return "Fill in the blanks with your own words for: " + p.short + "."; }
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshW.size < p.newWords) { box.focus(); return "Add more of your own ideas for: " + p.short + ". Use details from today."; }
    const t = plain(v);
    if (p.minSides && SIDES.filter(g => g.some(w => hasWord(t, w))).length < p.minSides) { box.focus(); return p.mustMsg; }
    if (p.mustAll.some(g => !g.some(w => hasWord(t, w)))) { box.focus(); return p.mustMsg; }
    return "";
  }
  async function sendWork() {
    if (st.turnedIn) return;
    const msg = $("sendMsg");
    const bad = t => { msg.textContent = t; msg.className = "msg try"; };
    const nm = window.classShortName ? window.classShortName($("nameBox2").value) : $("nameBox2").value.trim();
    if (!/^\S+ [A-Z]\.$/.test(nm)) { bad("Type your first name and last initial, like Jordan M."); $("nameBox2").focus(); return; }
    st.name = nm; save();
    for (const p of PROMPTS) { const err = writingProblem(p); if (err) { bad(err); return; } }
    const ids = [];
    ROUNDS.forEach(r => { ids.push(r.id); if (r.proof) ids.push(r.id + "p"); });
    RADAR_ORDER.forEach(k => ids.push(SPOTS[k].id));
    const answers = { "Standard": CFG.standard };
    answers["First-try correct"] = ids.filter(id => !st.wrong[id]).length + " of " + ids.length;
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    ROUNDS.forEach(r => {
      answers["Cause → effect · " + r.title] = r.effects[0] + (st.wrong[r.id] ? " (after " + st.wrong[r.id] + " wrong)" : " (first try)");
      if (r.proof) answers["Whose goal · " + r.title] = r.proof.sources[0][0] + (st.wrong[r.id + "p"] ? " (after " + st.wrong[r.id + "p"] + " wrong)" : " (first try)");
    });
    RADAR_ORDER.forEach(k => { const sp = SPOTS[k]; answers["Map · " + sp.name] = st.done[sp.id] ? (st.wrong[sp.id] ? "Found (after " + st.wrong[sp.id] + " wrong)" : "Found (first try)") : "Not found"; });
    answers["Ending"] = ENDINGS[endKey()].t;
    answers["Caused by"] = st.misses.length ? st.misses.map(m => m.label + " (" + m.n + ")").join(" · ") : "No misses";
    answers["Credibility at the end"] = st.cred + "/10";
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(CFG.oldApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: CFG.assignmentId, assignmentTitle: CFG.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.innerHTML = `<span class="stamp slam">📮 PRINTED</span> ✓ Turned in! You're done.`; msg.className = "msg good";
      $("sendBtn").textContent = "✓ Turned in";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg try"; $("sendBtn").disabled = false; }
  }

  // ---------- title + render ----------
  function title(app) {
    app.innerHTML = `<section class="title-card"><div class="t-grid"><div class="t-left">
        <p class="t-kick">World History · Unit 2 · Day 3</p>
        <h1>Hot Spots: Korea</h1>
        <p class="hook">1950. You report for a world news service. Two superpowers are fighting in Korea, without fighting each other. Get the chain right, find out what every side wanted, and don't print the propaganda.</p>
        <ol class="how"><li><b>Pick</b> what each event caused</li><li><b>Find</b> whose goal it was</li><li><b>Spot</b> other hot spots on a world map</li></ol>
        <div class="t-chips"><span>🔗 7 events</span><span>🎯 4 goals</span><span>📡 3 map finds</span><span>⏱️ 20 min</span></div>
        <p class="goal"><b>Goal:</b> explain why the U.S. and USSR backed sides in wars far from home, what each side wanted, and where other hot spots were.</p>
        <div class="t-start"><label for="nameBox">Your name</label>
        <div class="t-row"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <button type="button" class="go start" id="startBtn">Start →</button></div>
        <p id="introMsg" class="msg" role="status"></p></div>
        <p class="fict">You and your news service are made up. Every event, date, and quote is real. Cards marked “summary” retell a real record in plain words.</p>
      </div>
      <div class="t-art" aria-hidden="true"><div class="map-wrap mini">${mapSvg({ line: "pusan" })}</div>
        <div class="t-cast"><span>🧑‍💼</span><span class="vs">VS</span><span>📣📻</span></div></div></div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg try"; $("nameBox").focus(); return; }
      st.name = fixed; save(); goStep(1);
    };
  }
  let first = true;
  function render() {
    clearTimeout(lockTimer);
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    const app = $("app");
    if (st.step < 1) { hud(); return title(app); }
    if (st.step <= ROUNDS.length) roundScreen(app, st.step);
    else if (st.step === RADAR_STEP) radarScreen(app);
    else if (st.step === RADAR_STEP + 1) endingScreen(app);
    else memoScreen(app);
    hud();
    if (mapFrom) { const f = mapFrom; mapFrom = null; setTimeout(() => tweenMap(f, st.line), 200); }
  }
  // Keep the map at the round's starting line when a round opens.
  const _goStep = goStep;
  goStep = function (n) { const r = ROUNDS[n - 1]; if (r && st.line !== r.from) { mapFrom = st.line; st.line = r.from; } _goStep(n); };

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name, done = st.turnedIn; st = fresh(); st.name = name; st.turnedIn = done;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) {
    const nm = st.name || "";
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + nm + "! You're on step " + Math.min(st.step, STEPS) + " of " + STEPS + ".")}</span> <button type="button" class="notyou" id="notYouBtn">${esc("Not " + nm + "? Start fresh")}</button>`;
    $("welcome").hidden = false;
    $("notYouBtn").onclick = () => {
      st = fresh(); if (window.classFirstTry) window.classFirstTry.reset();
      try { localStorage.removeItem(KEY); localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      location.reload();
    };
  }
  window.addEventListener("resize", () => { if (st.step >= 1) document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px"); });
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => STEPS,
      index: () => Math.max(0, Math.min(st.step, STEPS) - 1),
      label: i => i < ROUNDS.length ? (i + 1) + ". " + ROUNDS[i].title : i === ROUNDS.length ? "Hot Spot Radar" : i === ROUNDS.length + 1 ? "Your front page" : "Write your story",
      go: i => {
        if (!st.name) st.name = "Test T.";
        // Fill in earlier rounds as solved so the chain and map look right.
        st.links = Math.min(i, ROUNDS.length);
        const r = ROUNDS[i];
        st.line = r ? r.from : "stale";
        st.step = i + 1; st.ph = "effect"; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        if (st.step === RADAR_STEP) {
          const k = RADAR_ORDER[Math.min(st.radar || 0, 3)];
          if (!k) { goStep(RADAR_STEP + 1); return; }
          if (!st.done[SPOTS[k].id]) st.done[SPOTS[k].id] = true; else st.radar = (st.radar || 0) + 1;
          save(); render(); return;
        }
        const r = ROUNDS[st.step - 1]; if (!r) return;
        if (st.ph === "effect") { st.links++; mapFrom = st.line; st.line = r.to; st.ph = r.proof ? "proof" : "done"; }
        else if (st.ph === "proof") st.ph = "done";
        save(); render();
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
