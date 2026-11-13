// =====================================================================
//  THE LINE THAT MOVED: KOREA · WAR REPORTER  (U.S. History · Unit 3 · Day 2)
//  Rebuilt 2026-11-13 (Fynn picked "best for the standards"): students build the Korean War's
//  CAUSE → EFFECT chain, exactly in the order of the Day 2 slides (38th parallel, invasion, UN +
//  containment, Inchon, China enters, stalemate, MacArthur fired, armistice).
//  You are a made-up war reporter. Each round: an event happens (cause) → you pick what it caused →
//  on 3 rounds you prove it with the right real source (corroboration, US.35 / US.40).
//  Rival: MacArthur's press office slips you spin ("home by Christmas"). Printing spin costs credibility.
//  One meter: Credibility. The map's front line moves as your chain grows.
//  Ends with your front-page chain, "Caused by" misses, the real cost, and 2 short answers.
//  Turn-in: shared/turnin.js classTurnIn, same payload shape as before. Test T. can skip everything.
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u3-d3-korea-v4";
  const CFG = {
    assignmentId: "ush-u3-d3-korea",
    title: "U.S. History · Unit 3 · Day 2 · The Line That Moved: Korea",
    standard: "SS.9-12.US.35, SS.9-12.US.37, SS.9-12.US.40",
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

  // =====================================================================
  //  THE ROUNDS (straight from the Day 2 slides). effects[0] is right.
  //  spin: true = MacArthur's press office is pushing this one.
  // =====================================================================
  const ROUNDS = [
    { id: "r1", got: "Two rival Koreas", date: "1945", title: "A Line on the Map", from: "split", to: "split",
      cause: "1945: Japan loses World War II. Soviet troops take North Korea. U.S. troops take the South. The line between them is the 38th parallel.",
      q: "What did splitting Korea cause?",
      effects: ["Two rival Koreas: a communist North and a U.S.-backed South", "One united Korea, run by the United Nations", "Japan kept ruling the South until 1950"],
      hint: "The USSR backed one half and the U.S. backed the other. What does that make?",
      link: "Korea split", key: "<b>38th parallel</b> = the map line that split Korea in two in 1945." },
    { id: "r2", got: "UN defends the South", date: "JUN 1950", title: "Invasion", from: "split", to: "seoul",
      cause: "June 25, 1950: North Korea's army invades the South. In three days it takes Seoul, the capital.",
      q: "What did President Truman do because of the invasion?",
      effects: ["Sent U.S. troops, and the UN voted to defend the South", "Asked Congress to declare war on North Korea first", "Stayed out, since Korea was too far from America"],
      hint: "He saw it as a test of containment. Did he ask Congress first?",
      link: "North invades",
      proof: { q: "Prove it: which source shows WHY Truman cared about Korea?",
        sources: [
          ["🇺🇸 President Truman · June 27, 1950", "“Communism has passed beyond [secret plots] to conquer independent nations and will now use armed invasion and war.”"],
          ["📠 News cable · June 28, 1950", "“Seoul has fallen. South Korean troops are retreating south.”"],
          ["📁 File · Korea, 1945", "“Japan ruled Korea from 1910 to 1945.”"]],
        hint: "Find the source that talks about communism spreading." },
      key: "<b>Containment</b> = stopping communism from spreading to new countries. Korea was its first real war." },
    { id: "r3", got: "Inchon landing", date: "SEP 1950", title: "Trapped at Pusan", from: "pusan", to: "split",
      cause: "Summer 1950: UN troops are pushed into a small corner around Pusan, at the southern tip of Korea.",
      q: "What did General MacArthur do to break out?",
      effects: ["Landed troops behind enemy lines at Inchon, near Seoul", "Pulled every UN soldier out of Korea by ship", "Asked China to help push North Korea back"],
      hint: "Look at the map. Where is Inchon compared to the enemy army?",
      link: "UN defends the South", key: "<b>Inchon</b> = MacArthur's surprise landing, Sept. 15, 1950. It pushed the North Koreans back to the 38th." },
    { id: "r4", got: "China attacks", date: "NOV 1950", title: "Too Close to China", from: "yalu", to: "jan51",
      cause: "Fall 1950: UN troops cross the 38th parallel and race north toward the Yalu River, China's border.",
      q: "What did pushing toward China cause?",
      effects: ["China sent hundreds of thousands of soldiers to attack", "The war ended and troops were home by Christmas", "The Soviet Union handed North Korea over to the UN"],
      spin: 1,
      hint: "Look at who lives on the other side of the Yalu River.",
      link: "Inchon landing",
      proof: { q: "Prove it: which source PREDICTED this?",
        sources: [
          ["📨 China's warning · Oct. 3, 1950", "“If U.S. troops cross the 38th parallel, China will fight.”"],
          ["👨‍✈️ MacArthur to Truman · Oct. 15, 1950", "Chance that China fights? “Very little.”"],
          ["📣 MacArthur's press office · Nov. 1950", "“The boys will be home by Christmas.”"]],
        hint: "Which source said China WOULD fight?" },
      key: "China joins the war. UN troops retreat in freezing cold, and Seoul falls again in January 1951." },
    { id: "r5", got: "Stalemate", date: "1951–53", title: "Stuck", from: "jan51", to: "stale",
      cause: "1951: China's huge army and the UN's air power are evenly matched. Neither side can break through.",
      q: "What did that cause?",
      effects: ["Two years of fighting over the same hills near the 38th", "A quick UN win and one united Korea by 1951", "North Korea gave up after one big bombing raid"],
      spin: 2,
      hint: "If neither side can break through, does the line move much?",
      link: "China attacks", key: "<b>Stalemate</b> = neither side can win, so the fighting gets stuck." },
    { id: "r6", got: "MacArthur fired", date: "APR 1951", title: "The General vs. the President", from: "stale", to: "stale",
      cause: "1951: MacArthur wants to bomb China, maybe with atomic bombs. He criticizes the President in public: “There is no substitute for victory.”",
      q: "What did MacArthur's public fight with the President cause?",
      effects: ["Truman fired him to keep the war from spreading", "Congress made MacArthur the new commander in chief", "Truman let him bomb China to win faster"],
      spin: 2,
      hint: "Who is in charge of the military: the general or the President?",
      link: "Stalemate",
      proof: { q: "Prove it: which source shows Truman's REASON for firing him?",
        sources: [
          ["🇺🇸 Truman on the radio · April 11, 1951", "“We are trying to prevent a third world war.”"],
          ["👨‍✈️ MacArthur's letter · April 5, 1951", "“There is no substitute for victory.”"],
          ["📰 Newspaper · April 1951", "“Huge crowds cheer MacArthur's return home.”"]],
        hint: "Find Truman's own words." },
      key: "<b>Civilian control</b> = an elected civilian (the President), not a general, commands the military." },
    { id: "r7", got: "Armistice", date: "JUL 1953", title: "The Shooting Stops", from: "stale", to: "stale",
      cause: "Peace talks drag on for two years while soldiers keep dying. By 1953, both sides are worn out.",
      q: "What did the talks finally cause?",
      effects: ["An armistice: the fighting stopped, but no peace treaty", "A peace treaty that made Korea one country again", "A new war that spread into China and the USSR"],
      hint: "Was Korea ever reunited? Is it still split today?",
      link: "MacArthur fired", key: "<b>Armistice</b> = an agreement to stop fighting. No peace treaty was ever signed. Korea is still split near the 38th." }
  ];
  const STEPS = ROUNDS.length + 2;   // rounds, then ending, then memo

  // ---------- state ----------
  function fresh() { return { v: 4, name: "", step: 0, ph: "effect", cred: 10, wrong: {}, misses: [], links: 0, line: "split", writing: {}, turnedIn: false }; }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 4) st = fresh();
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  let mapFrom = null, popCred = 0, justLinked = false;
  function cred(n) { st.cred = Math.max(0, Math.min(10, st.cred + n)); popCred = n; }

  // ---------- HUD ----------
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const r = ROUNDS[st.step - 1];
    const d = (r ? r.date : "JUL 1953").split(" ");
    $("calMo").textContent = d.length > 1 ? d[0] : "—"; $("calYr").textContent = d[d.length - 1];
    $("stepText").textContent = "Step " + Math.min(st.step, STEPS) + " of " + STEPS;
    $("stepFill").style.width = Math.round(Math.min(st.step, STEPS) / STEPS * 100) + "%";
    $("mCred").style.width = st.cred * 10 + "%"; $("nCred").textContent = st.cred + "/10";
    $("credFace").textContent = st.cred >= 8 ? "😎" : st.cred >= 5 ? "🙂" : "😬";
    $("nLinks").textContent = st.links + "/" + ROUNDS.length;
    $("pressMood").textContent = st.misses.some(m => m.spin) ? "fooled you" : "spinning";
    document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px");
    if (popCred) {
      const el = $("hudCred"), p = document.createElement("span");
      p.className = "pop " + (popCred > 0 ? "good" : "bad"); p.textContent = (popCred > 0 ? "+" : "−") + Math.abs(popCred) + " 📰"; p.setAttribute("aria-hidden", "true");
      el.appendChild(p); el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); setTimeout(() => p.remove(), 2000);
      popCred = 0;
    }
  }

  // ---------- pieces ----------
  const WHO = { editor: ["🧑‍💼", "Your editor"], press: ["📣", "MacArthur's press office"], cable: ["📠", "News cable"] };
  const bub = (who, text, cls) => `<div class="bub ${who}${cls ? " " + cls : ""}"><span class="av" aria-hidden="true">${WHO[who][0]}</span><div class="bt"><b>${esc(WHO[who][1])}</b><p>${text}</p></div></div>`;
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
    const job = jobStrip(["Read what happened", "Pick what it caused", hasProof ? "Prove it with a source" : "Add it to your chain"], st.ph === "effect" ? 1 : st.ph === "proof" ? 2 : 3);
    const causeCard = `<div class="cause"><span class="c-tag">⚡ CAUSE · ${esc(r.date)}</span><p>${esc(r.cause)}</p></div>`;
    const pressBub = r.spin != null && st.ph === "effect" ? bub("press", "Psst, reporter. Print this: <span class=\"spinq\">“" + esc(r.effects[r.spin]) + "”</span>") : "";
    if (st.ph === "effect") {
      app.innerHTML = scene({ title: r.title, job, body: chainHtml(st.links) + causeCard + pressBub + `<div class="pick"><p class="pick-h">🔍 ${esc(r.q)}</p><div id="pickBox"></div></div>` });
      mountPick("pickBox", r.id, r.effects, n => n === 0,
        () => { st.links++; justLinked = true; mapFrom = st.line; st.line = r.to; st.ph = hasProof ? "proof" : "done"; save(); render(); },
        n => {
          const spin = n === r.spin;
          cred(spin ? -2 : -1);
          st.misses.push({ label: (spin ? "Printed the press office's spin: “" : "Wrong link: “") + r.effects[n] + "”", n: spin ? -2 : -1, spin });
          return spin ? `<span class="spinwarn">📣 That was MacArthur's spin. −2 credibility. Run a correction.</span><br>` : "";
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
        () => { cred(-1); st.misses.push({ label: "Used the wrong source: " + r.proof.sources[0][0].replace(/^\S+\s/, "") + " was the proof", n: -1 }); return ""; },
        r.proof.hint, s => `<span class="src-h">${esc(s[0])}</span><span class="src-q">${esc(s[1])}</span>`);
      return;
    }
    const last = i === ROUNDS.length;
    app.innerHTML = scene({ title: r.title, job, body: chainHtml(st.links, !hasProof) + causeCard + linked + (hasProof ? `<div class="linked proved">📄 Proved with: <b>${esc(r.proof.sources[0][0])}</b></div>` : "") +
      `<div class="reveal"><span class="nw">💡 KEY IDEA</span><p>${r.key}</p></div>` + nextBtn(last ? "See your front page →" : "Next event →") });
    $("nextBtn").onclick = () => goStep(i + 1);
    const tgt = $("nextBtn"); if (tgt && tgt.scrollIntoView) setTimeout(() => tgt.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
  }

  // ---------- ending ----------
  const ENDINGS = {
    legend: { e: "🏆", t: "Front-Page Legend", text: "Your chain is solid and your readers trust you. You saw through the spin and backed every link with proof." },
    solid: { e: "📰", t: "Solid Reporter", text: "You got the story right in the end, but a few wrong links or bits of spin made it into print." },
    spun: { e: "📣", t: "Spun by the Press Office", text: "Too much spin and too many wrong links. Readers stopped trusting your paper." }
  };
  const endKey = () => st.cred >= 9 ? "legend" : st.cred >= 6 ? "solid" : "spun";
  function endingScreen(app) {
    const E = ENDINGS[endKey()];
    const misses = st.misses.length ? st.misses.map(m => `<li><span>${esc(m.label)}</span><span class="tag down">📰 ${m.n} credibility</span></li>`).join("") : `<li><span>No misses. Every link was right the first time.</span></li>`;
    const body = `<div class="front"><p class="masthead" aria-hidden="true">THE KOREA DISPATCH · JULY 1953</p>
        <div class="headline"><span class="e-big" aria-hidden="true">${E.e}</span><h3>${esc(E.t)}</h3></div>
        <p>${esc(E.text)}</p>
        <div class="finalm"><span>📰 Credibility <b>${st.cred}/10</b></span><span>🔗 Links <b>${st.links}/${ROUNDS.length}</b></span></div>
        ${chainHtml(ROUNDS.length)}
        <h4 class="cb">Caused by:</h4><ul class="trail">${misses}</ul></div>
      <div class="memorial"><p class="m-h">THE REAL COST</p>
        <p>🕯️ About 36,500 Americans died.</p><p>🕯️ Millions of Koreans died, many of them civilians.</p>
        <p>🗺️ Korea is still split near the 38th parallel today.</p>
        <p class="src">U.S. Department of Defense; Office of the Historian. South Korea was ruled by dictators until 1987 and is now a democracy. North Korea is still a communist dictatorship.</p></div>
      <div class="reveal"><span class="nw">💡 NEXT TIME</span><p><b>Korea → Vietnam</b>: the same cause (containment), but very different effects.</p></div>` + nextBtn("Write your story →");
    app.innerHTML = scene({ title: "Your Front Page", map: false, job: jobStrip(["See your front page", "Read the real cost", "Write your story"], 1), body });
    $("nextBtn").onclick = () => goStep(STEPS);
  }

  // ---------- writing + turn in ----------
  const KW = ["38th", "split", "north korea", "south korea", "invade", "invasion", "un ", "u.n", "united nations", "truman", "inchon", "pusan", "china", "chinese", "stalemate", "macarthur", "fired", "armistice", "treaty", "contain", "communis", "yalu", "seoul", "troops", "soldiers", "border", "hills"];
  const PROMPTS = [
    { id: "link", short: "One link in the chain", label: "1. Pick one link in your chain. Explain how the cause led to the effect.",
      stem: "___ caused ___ because ___.", min: 50, newWords: 5,
      mustAll: [KW, ["because", "since", "so ", "led to", "caused"]],
      mustMsg: "In answer 1, name a real event from your chain (like China joining or Inchon) and explain it with “because.”" },
    { id: "contain", short: "Did containment work in Korea?", label: "2. Did containment work in Korea? Give one fact and one cost.",
      stem: "Containment did / did not work in Korea because ___. One cost was ___.", min: 60, newWords: 6,
      mustAll: [["contain"], KW.concat(["died", "dead", "death", "36,500", "million", "cost", "free", "democracy", "communist"]), ["because", "since", "so "]],
      mustMsg: "In answer 2, use the word containment, give one fact (like South Korea staying non-communist), and use “because.”" }
  ];
  function memoScreen(app) {
    const page = p => `<div class="vpage"><label for="w_${p.id}">${esc(p.label)}</label><p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea></div>`;
    const body = `<div class="memo"><p class="vm-h">YOUR STORY FOR TOMORROW'S PAPER</p>${chainHtml(ROUNDS.length)}` + PROMPTS.map(page).join("") +
      `<label for="nameBox2" class="namel">Your name</label><input id="nameBox2" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">` +
      `<div class="vrow"><button type="button" class="go" id="sendBtn">📮 ${st.turnedIn ? "Turn in again" : "Turn in"}</button></div><p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in. You can fix your writing and turn it in again." : ""}</p></div>`;
    app.innerHTML = scene({ title: "Write Your Story", map: false, job: jobStrip(["Answer question 1", "Answer question 2", "Turn in"], 0), body });
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = sendWork;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem(p) {
    if (TT()) return "";
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" }); if (junk) return "For " + p.short + ": " + junk; }
    if (v.length < p.min) { box.focus(); return "Write a little more for: " + p.short + " (1–2 full sentences)."; }
    if (/_{2,}/.test(v)) { box.focus(); return "Fill in the blanks with your own words for: " + p.short + "."; }
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshW.size < p.newWords) { box.focus(); return "Add more of your own ideas for: " + p.short + ". Use details from today."; }
    const pv = " " + plain(v) + " ";
    if (p.mustAll.some(g => !g.some(w => pv.includes(plain(w))))) { box.focus(); return p.mustMsg; }
    return "";
  }
  async function sendWork() {
    const msg = $("sendMsg");
    const bad = t => { msg.textContent = t; msg.className = "msg try"; };
    const nm = window.classShortName ? window.classShortName($("nameBox2").value) : $("nameBox2").value.trim();
    if (!/^\S+ [A-Z]\.$/.test(nm)) { bad("Type your first name and last initial, like Jordan M."); $("nameBox2").focus(); return; }
    st.name = nm; save();
    for (const p of PROMPTS) { const err = writingProblem(p); if (err) { bad(err); return; } }
    const ids = [];
    ROUNDS.forEach(r => { ids.push(r.id); if (r.proof) ids.push(r.id + "p"); });
    const answers = { "Standard": CFG.standard };
    answers["First-try correct"] = ids.filter(id => !st.wrong[id]).length + " of " + ids.length;
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    ROUNDS.forEach(r => {
      answers["Cause → effect · " + r.title] = r.effects[0] + (st.wrong[r.id] ? " (after " + st.wrong[r.id] + " wrong)" : " (first try)");
      if (r.proof) answers["Proof · " + r.title] = r.proof.sources[0][0] + (st.wrong[r.id + "p"] ? " (after " + st.wrong[r.id + "p"] + " wrong)" : " (first try)");
    });
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
        <p class="t-kick">U.S. History · Unit 3 · Day 2</p>
        <h1>The Line That Moved: Korea</h1>
        <p class="hook">1950. You're a war reporter in Korea. Every event causes the next one. Get the chain right, and don't print the spin.</p>
        <ol class="how"><li><b>Read</b> what happened</li><li><b>Pick</b> what it caused</li><li><b>Prove</b> it with a real source</li></ol>
        <div class="t-chips"><span>🔗 7 events</span><span>📄 3 proofs</span><span>⏱️ 15–20 min</span></div>
        <p class="goal"><b>Goal:</b> explain the causes and effects of the Korean War, and why the U.S. fought it to contain communism.</p>
        <div class="t-start"><label for="nameBox">Your name</label>
        <div class="t-row"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <button type="button" class="go start" id="startBtn">Start →</button></div>
        <p id="introMsg" class="msg" role="status"></p></div>
        <p class="fict">You and your newspaper are made up. Every event, date, and quote is real.</p>
      </div>
      <div class="t-art" aria-hidden="true"><div class="map-wrap mini">${mapSvg({ line: "pusan" })}</div>
        <div class="t-cast"><span>🧑‍💼</span><span class="vs">VS</span><span>📣</span></div></div></div></section>`;
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
    else if (st.step === ROUNDS.length + 1) endingScreen(app);
    else memoScreen(app);
    hud();
    if (mapFrom) { const f = mapFrom; mapFrom = null; setTimeout(() => tweenMap(f, st.line), 200); }
  }
  // Keep the map at the round's starting line when a round opens.
  const _goStep = goStep;
  goStep = function (n) { const r = ROUNDS[n - 1]; if (r && st.line !== r.from) { mapFrom = st.line; st.line = r.from; } _goStep(n); };

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
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
      label: i => i < ROUNDS.length ? (i + 1) + ". " + ROUNDS[i].title : i === ROUNDS.length ? "Your front page" : "Write your story",
      go: i => {
        if (!st.name) st.name = "Test T.";
        // Fill in earlier rounds as solved so the chain and map look right.
        st.links = Math.min(i, ROUNDS.length);
        const r = ROUNDS[i];
        st.line = r ? r.from : "stale";
        st.step = i + 1; st.ph = "effect"; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const r = ROUNDS[st.step - 1]; if (!r) return;
        if (st.ph === "effect") { st.links++; mapFrom = st.line; st.line = r.to; st.ph = r.proof ? "proof" : "done"; }
        else if (st.ph === "proof") st.ph = "done";
        save(); render();
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
