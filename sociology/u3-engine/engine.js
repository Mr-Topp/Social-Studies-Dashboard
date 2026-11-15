// =====================================================================
//  Sociology Unit 3 engine (Days 2-5). Each page sets window.U3GAME = {...} and loads this file.
//  Screens, one at a time, in strict order:
//    q    = something to read on the left + one graded question on the right
//           (wrong: short hint, choices reshuffle, 3-second lock; right: the "why" + a reveal)
//    read = same as q, but for a book in the student's hands: "find it" box + optional scene help,
//           and the question opens only after "I read it" (short wait so it can't be skipped)
//    pick = an opinion choice (not graded, every answer is OK), then a reveal
//    info = read and go on
//  Then a wrap-up screen, then one written answer + turn in (shared/turnin.js).
//  No scores on screen (students never see scores); the first-try count goes only to the teacher dashboard.
//  Progress saves on the device ("Welcome back"). Test T. can skip everything (🧪 bar).
// =====================================================================
(function () {
  "use strict";
  const G = window.U3GAME;
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 3, READ_Q = 2, READ_BOOK = 8;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isT = () => !!(window.classIsTestT && window.classIsTestT());
  const STEPS = G.steps;
  const N = STEPS.length;
  const TOTAL = N + 2;   // steps, wrap-up, writing
  // Graded items: every question, plus a "prove it" tap for steps that have one.
  const graded = [];
  STEPS.forEach(s => {
    if (s.kind !== "q" && s.kind !== "read") return;
    graded.push({ id: s.id, std: s.std });
    if (s.proof) graded.push({ id: s.id + "~p", std: s.std });
  });
  // Fact cards mark tappable "prove it" chunks: [[the proof]] and {{other words}}.
  const evHtml = h => String(h || "").replace(/\[\[([\s\S]*?)\]\]/g, '<span class="ev" data-ok="1">$1</span>').replace(/\{\{([\s\S]*?)\}\}/g, '<span class="ev">$1</span>');

  // ---------- state ----------
  const fresh = () => ({ v: 1, name: "", step: -1, done: {}, miss: {}, picks: {}, opened: {}, writing: "", turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(G.key)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 1 || !st.done) st = fresh();
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    if (now && st.name && now !== st.name.trim().toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(G.key, JSON.stringify(st)); } catch (e) {} };
  const firstTry = list => (list || graded).filter(s => st.done[s.id] && !st.miss[s.id]).length;
  let anim = false, timers = [];
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  // ---------- page frame ----------
  document.body.insertAdjacentHTML("afterbegin", `<div class="hud" id="hud" hidden aria-label="Your progress"><div class="hud-in">
      <span class="brand">${esc(G.brand)}</span><div class="prog" aria-hidden="true"><span id="progFill"></span></div>
      <span class="stepct" id="stepCt"></span></div></div>
    <main id="wrap"><p class="welcome" id="welcome" role="status" hidden></p><section id="app" aria-live="polite"></section>
      <div class="foot">Progress saves on this device. Your teacher sees your work after you turn it in. <button type="button" id="restartBtn">Start over</button></div></main>`);
  const app = $("app");

  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    if (!show) return;
    $("progFill").style.width = Math.round(Math.min(st.step, TOTAL) / TOTAL * 100) + "%";
    $("stepCt").textContent = st.step < N ? (G.stepWord || "Step") + " " + (st.step + 1) + " of " + N : st.step === N ? "Wrap-up" : "Last step";
  }
  function toTop() { window.scrollTo(0, 0); }
  function goNext() { clearTimers(); st.step = Math.min(st.step + 1, TOTAL - 1); anim = true; save(); render(); toTop(); }

  // ---------- title ----------
  function intro() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title-card">
      <p class="eyebrow">${esc(G.eyebrow)}</p>
      <h1 class="big-title">${G.titleHtml}</h1>
      <p class="hook">${esc(G.hook)}</p>
      ${G.chips ? `<div class="show" aria-hidden="true">${G.chips.map(c => `<span>${esc(c)}</span>`).join("")}</div>` : ""}
      <div class="title-tiles">${G.tiles.map(t => `<span>${t}</span>`).join("")}</div>
      ${G.book ? `<p class="book">${G.book}</p>` : ""}
      <p class="goal"><b>Today's goal:</b> ${esc(G.goal)}</p>
      <ol class="steps">${G.how.map(h => `<li>${esc(h)}</li>`).join("")}</ol>
      <div class="title-start" style="margin-top:12px"><div class="namebox"><label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(pre)}"></div>
        <button type="button" class="big" id="startBtn">${esc(G.startLabel)} →</button></div>
      <p id="introMsg" class="msg center" role="status"></p>
      <details class="small-print"><summary>Iowa standards for today</summary>${G.stdText.map(s => `<p><b>${esc(s[0])}</b> ${esc(s[1])}</p>`).join("")}</details></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ \p{Lu}\.$/u.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad center"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 0; anim = true; save(); render(); toTop();
    };
  }

  // ---------- a step ----------
  function shuffled(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  let lastOrder = "";
  let solveFn = null;
  function stepView() {
    const s = STEPS[st.step];
    const left = s.kind === "read" ? readPanel(s) : `<div class="panel" id="panel">${evHtml(s.left)}</div>`;
    app.innerHTML = `<section class="scene"><p class="kicker">${esc(s.kicker || "")}</p><h2>${esc(s.title)}</h2>
      <div class="grid">${left}<div class="qbox" id="qbox"></div></div></section>`;
    if (s.kind === "read") {
      const hb = $("helpBtn");
      if (hb) hb.onclick = () => { const h = $("helpText"); h.hidden = !h.hidden; hb.textContent = h.hidden ? "Stuck? Scene help" : "Hide scene help"; };
      if (!st.opened[s.id] && !st.done[s.id]) return readGate(s);
    }
    if (s.kind === "info") return infoView(s);
    if (s.kind === "pick") return pickView(s);
    return askView(s);
  }
  function readPanel(s) {
    return `<div class="panel"><div class="findit"><span class="ft">📖 In your book</span><p>${esc(s.find)}</p></div>
      ${s.left || ""}
      ${s.help ? `<button type="button" class="helpbtn" id="helpBtn">Stuck? Scene help</button><div class="helptext" id="helpText" hidden>${s.help}</div>` : ""}</div>`;
  }
  function readGate(s) {
    const q = $("qbox");
    q.innerHTML = `<p class="qt" style="font-size:1.05rem;font-weight:800">Read that part of the book first. Then come back for the question.</p>
      <button type="button" class="next readbtn" id="readBtn" disabled>I read it →</button><p class="lock" id="readLock"></p>`;
    let left = isT() ? 0 : READ_BOOK;
    const tick = () => {
      if (left <= 0) { $("readBtn").disabled = false; $("readLock").textContent = ""; return; }
      $("readLock").textContent = "Read first. The button opens in " + left + "…"; left--; later(tick, 1000);
    };
    tick();
    $("readBtn").onclick = () => { st.opened[s.id] = true; save(); askView(s); };
  }
  function infoView(s) {
    $("qbox").innerHTML = `${s.right || ""}<div class="rowend"><button type="button" class="next" id="nextBtn">${esc(s.nextLabel || "Next")} →</button></div>`;
    $("nextBtn").onclick = goNext; solveFn = null;
  }
  function choicesHtml(list) {
    return list.map((c, i) => `<button type="button" class="choice" data-i="${c.i}"><span class="l">${"ABCD"[i]}</span><span>${esc(c.t)}</span></button>`).join("");
  }
  function order(s) {
    let o = shuffled(s.choices.map((t, i) => ({ t, i })));
    const sig = o.map(x => x.i).join("");
    if (sig === lastOrder && o.length > 1) o.push(o.shift());
    lastOrder = o.map(x => x.i).join("");
    return o;
  }
  function askView(s) {
    const q = $("qbox");
    const done = !!st.done[s.id];
    q.innerHTML = `<span class="tag">${esc(s.tag || "Question")}</span><p class="qt">${esc(s.q)}</p>
      <div class="choices" id="choices"></div><p class="lock" id="lock"></p><div id="fb"></div><div id="after"></div>`;
    const draw = () => { $("choices").innerHTML = choicesHtml(order(s)); bind(); };
    const setOff = off => q.querySelectorAll(".choice").forEach(b => b.disabled = off);
    const pid = s.id + "~p";
    const proofStage = () => {
      setOff(true);
      const r = q.querySelector(`.choice[data-i="${s.answer}"]`); if (r) r.classList.add("right");
      $("lock").textContent = "";
      $("fb").innerHTML = `<div class="fb ok">✓ Right: ${esc(s.choices[s.answer].replace(/[.!]$/, ""))}. Now prove it.</div><div class="prove"><b>🔎</b> ${esc(s.proof)}</div><p class="lock" id="plock"></p><div id="pfb"></div>`;
      const panel = $("panel"); panel.classList.add("proofing");
      const evs = [...panel.querySelectorAll(".ev")];
      evs.forEach(e => { e.setAttribute("role", "button"); e.tabIndex = 0; });
      let plocked = false;
      const tap = el => {
        if (plocked || st.done[pid]) return;
        if (el.dataset.ok) {
          st.done[pid] = true;
          if (window.classFirstTry) window.classFirstTry.right(pid);
          save(); hud(); finish(); return;
        }
        st.miss[pid] = (st.miss[pid] || 0) + 1;
        if (window.classFirstTry) window.classFirstTry.wrong();
        save();
        el.classList.remove("evno"); void el.offsetWidth; el.classList.add("evno");
        $("pfb").innerHTML = `<div class="fb no">That part doesn't prove it. ${esc(s.proofHint || "Find the words that show who is doing the teaching.")}</div>`;
        plocked = true; panel.classList.add("plocked");
        let left = isT() ? 0 : 2;
        const tick = () => { if (left <= 0) { plocked = false; panel.classList.remove("plocked"); el.classList.remove("evno"); $("plock").textContent = ""; return; } $("plock").textContent = "Look again in " + left + "…"; left--; later(tick, 1000); };
        tick();
      };
      evs.forEach(e => { e.onclick = () => tap(e); e.onkeydown = ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); tap(e); } }; });
      solveFn = () => { plocked = false; const ok = panel.querySelector(".ev[data-ok]"); if (ok) tap(ok); };
    };
    const finish = () => {
      if (s.proof && !st.done[pid]) return proofStage();
      setOff(true);
      const r = q.querySelector(`.choice[data-i="${s.answer}"]`); if (r) r.classList.add("right");
      $("lock").textContent = "";
      const panel = $("panel");
      if (panel && s.proof) { panel.classList.remove("proofing"); const ok = panel.querySelector(".ev[data-ok]"); if (ok) ok.classList.add("evok"); }
      $("fb").innerHTML = `<div class="fb ok">✓ ${esc(s.why)}</div>`;
      $("after").innerHTML = (s.reveal ? `<div class="reveal"><span class="rt">${esc(s.revealTitle || "What happened")}</span>${s.reveal}</div>` : "") +
        `<div class="rowend"><button type="button" class="next" id="nextBtn">${st.step === N - 1 ? "Wrap it up" : "Next"} →</button></div>`;
      $("nextBtn").onclick = goNext;
      solveFn = null;
    };
    const pick = i => {
      if (st.done[s.id]) return;
      if (i === s.answer) {
        st.done[s.id] = true;
        if (window.classFirstTry) window.classFirstTry.right(s.id);
        save(); hud(); finish(); return;
      }
      st.miss[s.id] = (st.miss[s.id] || 0) + 1;
      if (window.classFirstTry) window.classFirstTry.wrong();
      save(); hud();
      q.classList.remove("shake"); void q.offsetWidth; q.classList.add("shake");
      $("fb").innerHTML = `<div class="fb no">Not quite. ${esc(s.hint)} The choices got mixed up.</div>`;
      draw(); setOff(true);
      let left = isT() ? 0 : LOCK;
      const tick = () => { if (left <= 0) { setOff(false); $("lock").textContent = ""; return; } $("lock").textContent = "Try again in " + left + "…"; left--; later(tick, 1000); };
      tick();
    };
    function bind() { q.querySelectorAll(".choice").forEach(b => b.onclick = () => pick(+b.dataset.i)); }
    draw();
    solveFn = () => pick(s.answer);
    if (done) return finish();
    if (anim && !isT()) { setOff(true); later(() => { if (!st.done[s.id]) setOff(false); }, READ_Q * 1000); }
  }
  function pickView(s) {
    const q = $("qbox");
    q.innerHTML = `<span class="tag">${esc(s.tag || "Your call")}</span><p class="opinion">No wrong answer here. Pick what you really think.</p><p class="qt">${esc(s.q)}</p>
      <div class="choices" id="choices">${s.options.map((t, i) => `<button type="button" class="choice" data-i="${i}"><span class="l">${"ABCD"[i]}</span><span>${esc(t)}</span></button>`).join("")}</div><div id="after"></div>`;
    const show = () => {
      const i = st.picks[s.id];
      q.querySelectorAll(".choice").forEach(b => b.classList.toggle("pickme", +b.dataset.i === i));
      const extra = typeof s.after === "function" ? s.after(i, st) : (s.after || "");
      $("after").innerHTML = (extra ? `<div class="reveal"><span class="rt">${esc(s.afterTitle || "What happened")}</span>${extra}</div>` : "") +
        `<div class="rowend"><button type="button" class="next" id="nextBtn">${st.step === N - 1 ? "Wrap it up" : "Next"} →</button></div>`;
      $("nextBtn").onclick = goNext;
    };
    q.querySelectorAll(".choice").forEach(b => b.onclick = () => { st.picks[s.id] = +b.dataset.i; save(); show(); });
    solveFn = () => { if (st.picks[s.id] == null) { st.picks[s.id] = 0; save(); } show(); };
    if (st.picks[s.id] != null) show();
  }

  // ---------- wrap-up ----------
  function endView() {
    solveFn = null;
    app.innerHTML = `<section class="scene"><p class="kicker">${esc(G.end.kicker)}</p><h2>${esc(G.end.title)}</h2>${G.end.html(st)}
      <div class="rowend"><button type="button" class="next" id="nextBtn">Last step: write it →</button></div></section>`;
    $("nextBtn").onclick = goNext;
  }

  // ---------- writing + turn in ----------
  const W = G.write;
  function writeView() {
    solveFn = null;
    app.innerHTML = `<section class="scene write"><p class="kicker">Last step · ${esc(st.name)}</p><h2>${esc(W.heading || "Write it")}</h2>
      <label for="w1">${esc(W.label)}</label><p class="help">${esc(W.help)}</p>
      <p class="stem"><b>Start like this:</b> ${esc(W.stem)}</p>
      <textarea id="w1" rows="5" data-starter="${esc(W.stem)}">${esc(st.writing || "")}</textarea>
      <div class="rowend"><button type="button" class="big" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button></div>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      ${st.turnedIn ? `<p class="turned" id="turnedTag">✓ Turned in</p>` : ""}</section>`;
    $("w1").addEventListener("input", ev => { st.writing = ev.target.value; save(); });
    $("sendBtn").onclick = send;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem() {
    if (isT()) return "";
    const box = $("w1"), v = (box.value || "").trim();
    if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: W.stem, source: "from today" }); if (junk) return junk; }
    if (v.length < W.min) return "Write a little more (2–3 full sentences).";
    if (/_{2,}/.test(v)) return "Fill in the blanks with your own words.";
    const stemWords = new Set(plain(W.stem).match(/[\p{L}']+/gu) || []);
    const own = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(x => !stemWords.has(x)));
    if (own.size < 6) return "Add more of your own ideas. " + W.more;
    for (const g of W.mustAll) if (!g.words.some(x => plain(v).includes(plain(x)))) return g.msg;
    return "";
  }
  function buildAnswers() {
    const a = { "Standard": G.standard };
    a["First-try correct"] = firstTry() + " of " + graded.length;
    const stds = [...new Set(graded.map(s => s.std))];
    a["First-try by standard"] = stds.map(sd => { const l = graded.filter(s => s.std === sd); return sd + ": " + firstTry(l) + " of " + l.length; }).join(" · ");
    let n = 0;
    const tries = m => m ? " (after " + m + " wrong " + (m === 1 ? "try" : "tries") + ")" : " (first try)";
    STEPS.forEach(s => {
      if (s.kind === "q" || s.kind === "read") {
        n++; a[n + ". " + s.label] = s.choices[s.answer] + tries(st.miss[s.id] || 0);
        if (s.proof) { const ok = (s.left.match(/\[\[([\s\S]*?)\]\]/) || [])[1] || ""; a[n + ". " + s.label + " · proof"] = "\"" + ok.replace(/<[^>]+>/g, "") + "\"" + tries(st.miss[s.id + "~p"] || 0); }
      }
      else if (s.kind === "pick") { const i = st.picks[s.id]; a["Pick · " + s.label] = i == null ? "—" : s.options[i]; }
    });
    a["Writing: " + W.short] = ($("w1").value || "").trim();
    return a;
  }
  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    const prob = writingProblem();
    if (prob) { msg.textContent = prob; msg.className = "msg bad"; $("w1").focus({ preventScroll: true }); return; }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }
    btn.disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: G.assignmentId, assignmentTitle: G.title, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      btn.textContent = "Turned in ✓"; btn.disabled = false;
      if (!$("turnedTag")) msg.insertAdjacentHTML("afterend", `<p class="turned" id="turnedTag">✓ Turned in</p>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; btn.disabled = false; }
  }

  // ---------- render ----------
  let firstRender = true;
  function render() {
    clearTimers();
    if (!firstRender) $("welcome").hidden = true;
    firstRender = false;
    hud();
    app.classList.toggle("anim", anim);
    try {
      if (st.step < 0) { solveFn = null; return intro(); }
      if (st.step < N) return stepView();
      if (st.step === N) return endView();
      return writeView();
    } finally { anim = false; }
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    save(); render(); toTop();
  };
  if (st.step >= 0) {
    const where = st.step < N ? (G.stepWord || "step").toLowerCase() + " " + (st.step + 1) + " of " + N : st.step === N ? "the wrap-up" : "the last step";
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " You're on " + where + ".")}</span> <button type="button" class="notyou" id="notYouBtn">Not you? Start fresh</button>`;
    $("welcome").hidden = false;
    $("notYouBtn").onclick = () => {
      st = fresh();
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      try { localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      save(); location.reload();
    };
  }
  window.__u3 = { get state() { return JSON.parse(JSON.stringify(st)); }, steps: STEPS.map(s => ({ id: s.id, kind: s.kind, answer: s.answer, choices: s.choices })) };
  render();

  // ---------- Test T. skip bar (shared/turnin.js) ----------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL + 1,
      index: () => st.step < 0 ? 0 : Math.min(st.step, TOTAL - 1) + 1,
      label: i => i === 0 ? "Title" : i <= N ? (G.stepWord || "Step") + " " + i + ": " + STEPS[i - 1].label : i === N + 1 ? "Wrap-up" : "Writing + turn in",
      go: i => {
        if (!st.name) st.name = "Test T.";
        const t = i - 1;
        for (let j = 0; j < t && j < N; j++) {
          const s = STEPS[j];
          if (s.kind === "q" || s.kind === "read") { st.done[s.id] = true; st.opened[s.id] = true; if (s.proof) st.done[s.id + "~p"] = true; }
          if (s.kind === "pick" && st.picks[s.id] == null) st.picks[s.id] = 0;
        }
        anim = false; st.step = t; save(); render(); toTop();
      },
      solve: () => {
        const s = STEPS[st.step]; if (!s) return;
        if (s.kind === "read" && !st.opened[s.id]) { st.opened[s.id] = true; save(); render(); }
        if (solveFn) solveFn();
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
