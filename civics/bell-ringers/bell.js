/* We the People bell ringer engine.
   index.html sets window.BELL = { ids, assignmentId, std } from the ?r= link and shared/assignments.js.
   A link can hold one reading (?r=courts) or several (?r=courts,gault,equal). Fynn (11-15) wanted stacked
   bell ringers to be ONE assignment, so several readings = one page, one turn-in.
   Flow: type name -> for each reading: read it + 2 multiple-choice checks (a wrong pick shows a hint and reshuffles)
   -> finish ONE sentence (with 2+ readings, the student picks which reading's sentence starter) -> turn in.
   Turn-in goes through shared/turnin.js (classTurnIn), so it lands on the teacher dashboard under its course/unit/day.
   Progress is kept on this Chromebook under the student's name, so they pick up where they left off. */
(function () {
  "use strict";
  const CFG = window.BELL || {};
  const ALL = window.BELL_RINGERS || {};
  const ids = (CFG.ids || (CFG.id ? [CFG.id] : [])).filter(id => ALL[id]);
  const app = document.getElementById("app"), hdr = document.getElementById("hdr");
  if (!ids.length || ids.length !== (CFG.ids || [CFG.id]).length) { app.textContent = "This bell ringer didn't load. Refresh the page."; return; }
  const parts = ids.map(id => ALL[id]);
  const MULTI = parts.length > 1;
  const meta = (window.CLASS_ASSIGNMENTS || {})[CFG.assignmentId] || {};
  const TITLE = meta.title || parts[0].title;
  const SHOWN_TITLE = MULTI ? (meta.title || parts.map(p => p.title).join(" + ")).replace(/^Days? [\d–-]+ · /, "").replace(/^Bell Ringer: /, "").replace(/ \(Reading\)$/, "") : parts[0].title;
  const MINWORDS = 8;
  // Every check in order: { p: reading index, j: check index in that reading, q }
  const CHECKS = []; parts.forEach((r, p) => r.qs.forEach((q, j) => CHECKS.push({ p, j, q })));
  const N = CHECKS.length;            // multiple-choice checks
  const TOTAL = N + 1;                // + the finish-the-sentence
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const isTest = () => !!(window.classIsTestT && window.classIsTestT());
  const nameOk = n => window.classNameState ? window.classNameState(n) === "ok" : /\S+ \S/.test(n || "");

  // ---- saved progress (per student name, on this Chromebook) ----
  const KEY = "bell:" + ids.join(",") + ":";
  let name = "";
  try { name = localStorage.getItem("site-student-name") || localStorage.getItem("bell:last-name") || ""; } catch (e) {}
  const fresh = () => ({ step: 0, wrong: Array(N).fill(0), draft: "", pick: MULTI ? -1 : 0, done: false });
  let st = fresh();
  function load() { st = fresh(); if (!nameOk(name)) return; try { const v = JSON.parse(localStorage.getItem(KEY + name.toLowerCase())); if (v && typeof v === "object") st = Object.assign(fresh(), v); } catch (e) {} }
  function save() { if (!nameOk(name)) return; try { localStorage.setItem(KEY + name.toLowerCase(), JSON.stringify(st)); localStorage.setItem("bell:last-name", name); } catch (e) {} }
  if (!nameOk(name) && window.classIsTestT && window.classIsTestT()) name = "Test T.";
  load();
  const welcomeBack = st.step > 0 && !st.done;
  let view = -1;   // which reading is on screen (-1 = follow the current check)

  // Which reading goes with the current step. The writing step shows the reading of the starter they picked.
  const partOfStep = () => st.step < N ? CHECKS[st.step].p : (st.pick >= 0 ? st.pick : parts.length - 1);
  const shownPart = () => view >= 0 ? view : partOfStep();
  const reached = p => st.done || st.step >= N || CHECKS[st.step].p >= p;

  // ---- page frame ----
  const mins = 5 * parts.length;
  hdr.innerHTML = `<div class="in"><span class="kicker">Bell ringer · about ${mins} min</span><h1>${esc(SHOWN_TITLE)}</h1><div class="steps" id="steps"></div>
    <div class="namebar"><label for="studentName">Your name</label><input type="text" id="studentName" data-student-name="1" autocomplete="off" placeholder="Like Jordan M." value="${esc(name)}"></div></div>`;
  app.innerHTML = `${MULTI ? `<nav class="ptabs" id="ptabs" aria-label="Readings"></nav>` : ""}<div class="layout">
    <section class="card reading" id="reading"></section>
    <div class="side"><div id="figbox"></div>
      <section class="card" id="qbox"><div id="welcome"></div><div id="q"></div></section>
    </div></div>`;
  if (welcomeBack) $("welcome").innerHTML = `<div class="welcome">Welcome back! You're on check ${st.step + 1} of ${TOTAL}.</div>`;

  function steps() {
    return Array.from({ length: TOTAL }, (_, k) => `<span class="${st.done || k < st.step ? "ok" : k === st.step ? "on" : ""}"></span>`).join("");
  }
  function drawReading() {
    const p = shownPart(), r = parts[p];
    const box = $("reading");
    box.className = "card reading" + (r.serious ? " serious" : "");
    box.innerHTML = `${MULTI ? `<span class="qtag">Reading ${p + 1} of ${parts.length}</span>` : ""}<div class="goal"><b>${MULTI ? "Goal" : "Today's goal"}:</b> ${esc(r.goal)}</div>${MULTI ? `<h2 class="rtitle">${esc(r.title)}</h2>` : ""}${r.html}`;
    const im = r.image;
    $("figbox").innerHTML = im ? `<figure class="fig"><div class="imgwrap"><img src="${esc(im.src)}" alt="${esc(im.caption)}" title="Click to make it bigger"></div><figcaption>${esc(im.caption)} <span class="credit">Public domain · Wikimedia Commons (${esc(im.file.replace(/\.[a-z]+$/i, ""))})</span></figcaption></figure>` : "";
    if (MULTI) {
      const cur = partOfStep();
      $("ptabs").innerHTML = parts.map((r2, k) => {
        const ok = reached(k), on = k === p;
        const doneMark = st.done || st.step >= N || (st.step < N && CHECKS[st.step].p > k) ? "✓ " : "";
        return `<button type="button" class="ptab${on ? " on" : ""}" data-p="${k}" ${ok ? "" : "disabled"} title="${ok ? "" : "Finish the reading before this one first"}">${doneMark}${k + 1}. ${esc(r2.title)}</button>`;
      }).join("") + (view >= 0 && view !== cur ? `<button type="button" class="ptab back" data-p="-1">↩ Back to my question</button>` : "");
      $("ptabs").querySelectorAll(".ptab").forEach(b => b.onclick = () => { const k = +b.dataset.p; view = k === partOfStep() ? -1 : k; drawReading(); });
    }
  }

  $("studentName").addEventListener("input", e => {
    const v = e.target.value.replace(/\s+/g, " ").trim();
    if (v === name) return;
    name = v; $("welcome").innerHTML = ""; load(); view = -1; draw();
  });

  // ---- the question box ----
  function draw() {
    $("steps").innerHTML = steps();
    drawReading();
    const box = $("q");
    if (!nameOk(name) && !isTest()) {
      box.innerHTML = `<p class="locked">Type your name at the top (first name and last initial) to start the checks.</p>`;
      return;
    }
    if (st.done) {
      box.innerHTML = `<div class="donecard"><div class="big">✅</div><h2>Nice work! <span class="stamp">✓ TURNED IN</span></h2>
        <p>Your answer:<br><i>${esc(st.answer || "")}</i></p></div>`;
      return;
    }
    if (st.step < N) {
      const c = CHECKS[st.step], q = c.q;
      const order = shuffle(q.c.map((t, k) => ({ t, k })));
      const newPart = MULTI && c.j === 0 && c.p > 0 ? `<div class="nextread">📖 New reading! Read <b>${esc(parts[c.p].title)}</b> on the left first.</div>` : "";
      box.innerHTML = `${newPart}<span class="qtag">Check ${st.step + 1} of ${TOTAL}${MULTI ? " · Reading " + (c.p + 1) : ""}</span><div class="qtext">${esc(q.q)}</div>
        ${order.map(o => `<button class="choice" type="button" data-k="${o.k}">${esc(o.t)}</button>`).join("")}<div id="fb"></div>`;
      box.querySelectorAll(".choice").forEach(b => b.onclick = () => answer(+b.dataset.k));
      return;
    }
    // finish the sentence (with several readings: pick one starter first)
    const picker = MULTI ? `<div class="qtext">Pick ONE sentence to finish:</div><div class="picks">${parts.map((r, k) =>
      `<button type="button" class="choice pick${st.pick === k ? " right" : ""}" data-k="${k}"><small>Reading ${k + 1}</small> ${esc(r.stem)}…</button>`).join("")}</div>` : "";
    const r = st.pick >= 0 ? parts[st.pick] : null;
    box.innerHTML = `<span class="qtag">Check ${TOTAL} of ${TOTAL} · In your words</span>${picker}
      ${r ? `<label class="qtext" for="ans" style="display:block">${MULTI ? "Finish it using Reading " + (st.pick + 1) + ": " : "Finish this sentence using the reading: "}${esc(r.stem)}…</label>
      <textarea id="ans" placeholder="Finish the sentence in your own words.">${esc(st.draft)}</textarea>
      <div class="count" id="cnt"></div>
      <button class="btn green" id="go" type="button">Turn in</button><div class="status" id="status"></div>` : ""}`;
    box.querySelectorAll(".pick").forEach(b => b.onclick = () => { st.pick = +b.dataset.k; view = -1; save(); draw(); const a = $("ans"); if (a) a.focus(); });
    if (!r) return;
    const ans = $("ans"), cnt = $("cnt");
    const check = () => {
      const w = ans.value.trim().split(/\s+/).filter(Boolean).length;
      cnt.style.color = ""; cnt.textContent = w >= MINWORDS ? "Looks good." : `Write at least ${MINWORDS} words (you have ${w}).`;
      st.draft = ans.value; save();
    };
    ans.oninput = check; check();
    $("go").onclick = turnIn;
  }

  function answer(k) {
    const q = CHECKS[st.step].q;
    if (k === 0) {
      $("q").querySelectorAll(".choice").forEach(b => { b.disabled = true; if (+b.dataset.k === 0) b.classList.add("right"); });
      const last = st.step === N - 1, nextNew = !last && CHECKS[st.step + 1].p !== CHECKS[st.step].p;
      $("fb").innerHTML = `<div class="fb good"><span><b>Right!</b> ${esc(q.why)}</span><button class="btn" id="nx" type="button">${nextNew ? "Next reading →" : "Next →"}</button></div>`;
      $("nx").onclick = () => { st.step++; view = -1; save(); draw(); };
    } else {
      st.wrong[st.step]++; save();
      draw();   // reshuffle, nothing left marked red
      $("fb").innerHTML = `<div class="fb try"><b>Not quite.</b> ${esc(q.hint)} The choices have been mixed up. Try again.</div>`;
    }
  }

  // Answer must connect to the reading (at least one real word from it) and can't be copied from it.
  const plainWords = t => (String(t).replace(/<[^>]+>/g, " ").toLowerCase().match(/[a-z0-9']+/g) || []);
  const COMMON = "with that this they them then than have from what when were will your just like more some only also into make made want been very much many most same each over even ever does done good well know said says ones such here gets back down life time year years used uses kind sure else best felt feel love food favorite about after again against because before being between could every other people their there these thing think those through under where which while would should things really still";
  const COMMON_SET = new Set(COMMON.split(" "));
  const root = w => w.replace(/'s$/, "").slice(0, 5);
  function ownWords(text, r) {
    const readWords = plainWords(r.html + " " + r.goal + " " + r.title + " " + r.qs.map(q => q.c[0] + " " + q.why).join(" "));
    const roots = new Set(readWords.filter(w => w.length >= 4 && !COMMON_SET.has(w)).map(root));
    const mine = plainWords(text);
    if (!mine.some(w => w.length >= 4 && !COMMON_SET.has(w) && roots.has(root(w))))
      return "Connect your answer to the reading. Use at least one idea or word from it.";
    const src = " " + plainWords(r.html).join(" ") + " ";
    for (let i = 0; i + 8 <= mine.length; i++) if (src.includes(" " + mine.slice(i, i + 8).join(" ") + " "))
      return "That part is copied from the reading. Finish the sentence in your own words.";
    return "";
  }

  async function turnIn() {
    const ans = $("ans"), status = $("status"), go = $("go");
    const r = parts[st.pick];
    const text = ans.value.trim();
    const w = text.split(/\s+/).filter(Boolean).length;
    status.className = "status bad";
    if (!nameOk(name)) { status.textContent = "Type your first name and last initial at the top, like Jordan M."; $("studentName").focus(); return; }
    if (!isTest() && w < MINWORDS) { status.textContent = ""; $("cnt").style.color = "#9c443a"; ans.focus(); return; }
    if (!isTest() && window.classJunkStop) { const m = window.classJunkStop(ans, { starter: r.stem, source: "from the reading" }); if (m) { status.textContent = m; return; } }
    if (!isTest()) { const m = ownWords(text, r); if (m) { status.textContent = m; ans.focus(); return; } }
    const full = r.stem + " " + text;
    const firstTry = st.wrong.filter(x => x === 0).length;
    const answers = {
      "Standard": CFG.std || "",
      "Reading": "We the People bell ringer: " + parts.map(p => p.title).join(" + "),
      "First-try correct": firstTry + " of " + N
    };
    CHECKS.forEach((c, i) => {
      const label = (MULTI ? "Reading " + (c.p + 1) + " · " : "") + "Check " + (MULTI ? c.j + 1 : i + 1) + " · " + c.q.q;
      answers[label] = i < st.step ? c.q.c[0] + (st.wrong[i] ? " (after " + st.wrong[i] + " wrong " + (st.wrong[i] === 1 ? "try" : "tries") + ")" : " (first try)") : "Skipped in teacher preview";
    });
    answers["Writing: Finish this sentence using " + (MULTI ? "Reading " + (st.pick + 1) + " (" + r.title + ")" : "the reading") + ": " + r.stem + "…"] = full;
    go.disabled = true; status.className = "status"; status.textContent = "Sending your work…";
    try {
      if (!window.classTurnIn) throw Error("Turn-in connection did not load. Refresh and try again; your work is saved.");
      const res = await window.classTurnIn("", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName: name, assignmentId: CFG.assignmentId, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw Error(data.error || "Could not send your work.");
      st.done = true; st.answer = full; save(); draw();
    } catch (e) {
      status.className = "status bad"; status.textContent = e.message || "Could not turn in. Your work is saved; try again."; go.disabled = false;
    }
  }

  draw();

  // ---- picture zoom ----
  document.addEventListener("click", e => {
    const t = e.target;
    if (t.matches && t.matches(".imgwrap img")) { const z = document.createElement("div"); z.className = "zoom"; z.innerHTML = `<img src="${t.src}" alt="${esc(t.alt)}">`; z.onclick = () => z.remove(); document.body.appendChild(z); }
  });

  // ---- Start over (bottom of page): clears only this bell ringer for this name on this Chromebook ----
  $("restartBtn").onclick = () => {
    if (st.done && !isTest()) return;   // stays locked after turn-in (Fynn, 11-22); Test T. can still restart
    if (!confirm("Start over? This clears only this bell ringer's progress on this device.")) return;
    try { localStorage.removeItem(KEY + name.toLowerCase()); } catch (e) {}
    st = fresh(); view = -1; $("welcome").innerHTML = ""; draw();
  };

  // ---- Test T. hook (shared/turnin.js draws the 🧪 bar) ----
  (window.classTestHooks = window.classTestHooks || []).push({
    count: () => TOTAL + 1,
    index: () => st.done ? TOTAL : st.step,
    label: i => i < N ? (MULTI ? "Reading " + (CHECKS[i].p + 1) + " · Check " + (CHECKS[i].j + 1) : "Check " + (i + 1)) : i === N ? "Finish the sentence" : "Turned in",
    go: i => { if (i >= TOTAL) { st.done = true; st.answer = st.answer || "(Test T. preview)"; } else { st.done = false; st.step = i; if (i === N && st.pick < 0) st.pick = 0; } view = -1; save(); draw(); },
    solve: () => { if (!st.done && st.step < N) answer(0); }
  });
  if (window.classTestSkip) window.classTestSkip.refresh();
})();
