/* We the People bell ringer engine (one bell ringer per page).
   index.html sets window.BELL = { id, assignmentId, std } from the ?r= link and shared/assignments.js
   Flow: type name -> 2 multiple-choice checks (a wrong pick shows a hint and reshuffles) -> finish the sentence -> turn in.
   Turn-in goes through shared/turnin.js (classTurnIn), so it lands on the teacher dashboard under its course/unit/day.
   Progress is kept on this Chromebook under the student's name, so they pick up where they left off. */
(function () {
  "use strict";
  const CFG = window.BELL || {};
  const r = (window.BELL_RINGERS || {})[CFG.id];
  const app = document.getElementById("app"), hdr = document.getElementById("hdr");
  if (!r) { app.textContent = "This bell ringer didn't load. Refresh the page."; return; }
  const meta = (window.CLASS_ASSIGNMENTS || {})[CFG.assignmentId] || {};
  const TITLE = meta.title || r.title;
  const MINWORDS = 8;
  const N = r.qs.length;              // multiple-choice checks
  const TOTAL = N + 1;                // + the finish-the-sentence
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const isTest = () => !!(window.classIsTestT && window.classIsTestT());
  const nameOk = n => window.classNameState ? window.classNameState(n) === "ok" : /\S+ \S/.test(n || "");

  // ---- saved progress (per student name, on this Chromebook) ----
  const KEY = "bell:" + CFG.id + ":";
  let name = "";
  try { name = localStorage.getItem("site-student-name") || localStorage.getItem("bell:last-name") || ""; } catch (e) {}
  const fresh = () => ({ step: 0, wrong: Array(N).fill(0), draft: "", done: false });
  let st = fresh();
  function load() { st = fresh(); if (!nameOk(name)) return; try { const v = JSON.parse(localStorage.getItem(KEY + name.toLowerCase())); if (v && typeof v === "object") st = Object.assign(fresh(), v); } catch (e) {} }
  function save() { if (!nameOk(name)) return; try { localStorage.setItem(KEY + name.toLowerCase(), JSON.stringify(st)); localStorage.setItem("bell:last-name", name); } catch (e) {} }
  if (!nameOk(name) && window.classIsTestT && window.classIsTestT()) name = "Test T.";
  load();
  const welcomeBack = st.step > 0 && !st.done;

  // ---- page frame (reading + picture stay put; only the question box changes) ----
  function steps() {
    return Array.from({ length: TOTAL }, (_, k) => `<span class="${st.done || k < st.step ? "ok" : k === st.step ? "on" : ""}"></span>`).join("");
  }
  hdr.innerHTML = `<div class="in"><span class="kicker">Bell ringer · about 5 min</span><h1>${esc(r.title)}</h1><div class="steps" id="steps"></div>
    <div class="namebar"><label for="studentName">Your name</label><input type="text" id="studentName" data-student-name="1" autocomplete="off" placeholder="Like Jordan M." value="${esc(name)}"></div></div>`;
  const im = r.image;
  app.innerHTML = `<div class="layout">
    <section class="card reading ${r.serious ? "serious" : ""}"><div class="goal"><b>Today's goal:</b> ${esc(r.goal)}</div>${r.html}</section>
    <div class="side">
      ${im ? `<figure class="fig"><div class="imgwrap"><img src="${esc(im.src)}" alt="${esc(im.caption)}" title="Click to make it bigger"></div><figcaption>${esc(im.caption)} <span class="credit">Public domain · Wikimedia Commons (${esc(im.file.replace(/\.[a-z]+$/i, ""))})</span></figcaption></figure>` : ""}
      <section class="card" id="qbox">
        <div id="welcome"></div><div id="q"></div>
      </section>
    </div></div>`;
  if (welcomeBack) $("welcome").innerHTML = `<div class="welcome">Welcome back! You're on check ${st.step + 1} of ${TOTAL}.</div>`;

  $("studentName").addEventListener("input", e => {
    const v = e.target.value.replace(/\s+/g, " ").trim();
    if (v === name) return;
    name = v; $("welcome").innerHTML = ""; load(); draw();
  });

  // ---- the question box ----
  function draw() {
    $("steps").innerHTML = steps();
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
      const q = r.qs[st.step];
      const order = shuffle(q.c.map((t, k) => ({ t, k })));
      box.innerHTML = `<span class="qtag">Check ${st.step + 1} of ${TOTAL}</span><div class="qtext">${esc(q.q)}</div>
        ${order.map(o => `<button class="choice" type="button" data-k="${o.k}">${esc(o.t)}</button>`).join("")}<div id="fb"></div>`;
      box.querySelectorAll(".choice").forEach(b => b.onclick = () => answer(+b.dataset.k));
      return;
    }
    // finish the sentence
    box.innerHTML = `<span class="qtag">Check ${TOTAL} of ${TOTAL} · In your words</span>
      <label class="qtext" for="ans" style="display:block">Finish this sentence using the reading: ${esc(r.stem)}…</label>
      <textarea id="ans" placeholder="Finish the sentence in your own words.">${esc(st.draft)}</textarea>
      <div class="count" id="cnt"></div>
      <button class="btn green" id="go" type="button">Turn in</button><div class="status" id="status"></div>`;
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
    const q = r.qs[st.step];
    if (k === 0) {
      $("q").querySelectorAll(".choice").forEach(b => { b.disabled = true; if (+b.dataset.k === 0) b.classList.add("right"); });
      $("fb").innerHTML = `<div class="fb good"><span><b>Right!</b> ${esc(q.why)}</span><button class="btn" id="nx" type="button">Next →</button></div>`;
      $("nx").onclick = () => { st.step++; save(); draw(); };
    } else {
      st.wrong[st.step]++; save();
      draw();   // reshuffle, nothing left marked red
      $("fb").innerHTML = `<div class="fb try"><b>Not quite.</b> ${esc(q.hint)} The choices have been mixed up. Try again.</div>`;
    }
  }


  // Answer must connect to the reading (at least one real word from it) and can't be copied from it.
  const plainWords = t => (String(t).replace(/<[^>]+>/g, " ").toLowerCase().match(/[a-z0-9']+/g) || []);
  const READ_WORDS = plainWords(r.html + " " + r.goal + " " + r.title + " " + r.qs.map(q => q.c[0] + " " + q.why).join(" "));
  const COMMON = "with that this they them then than have from what when were will your just like more some only also into make made want been very much many most same each over even ever does done good well know said says ones such here gets back down life time year years used uses kind sure else best felt feel love food favorite about after again against because before being between could every other people their there these thing think those through under where which while would should things really still";
  const COMMON_SET = new Set(COMMON.split(" "));
  const root = w => w.replace(/'s$/, "").slice(0, 5);
  const READ_ROOTS = new Set(READ_WORDS.filter(w => w.length >= 4 && !COMMON_SET.has(w)).map(root));
  function ownWords(text) {
    const mine = plainWords(text);
    if (!mine.some(w => w.length >= 4 && !COMMON_SET.has(w) && READ_ROOTS.has(root(w))))
      return "Connect your answer to today's reading. Use at least one idea or word from it.";
    const src = " " + plainWords(r.html).join(" ") + " ";
    for (let i = 0; i + 8 <= mine.length; i++) if (src.includes(" " + mine.slice(i, i + 8).join(" ") + " "))
      return "That part is copied from the reading. Finish the sentence in your own words.";
    return "";
  }

  async function turnIn() {
    const ans = $("ans"), status = $("status"), go = $("go");
    const text = ans.value.trim();
    const w = text.split(/\s+/).filter(Boolean).length;
    status.className = "status bad";
    if (!nameOk(name)) { status.textContent = "Type your first name and last initial at the top, like Jordan M."; $("studentName").focus(); return; }
    if (!isTest() && w < MINWORDS) { status.textContent = ""; $("cnt").style.color = "#9c443a"; ans.focus(); return; }
    if (!isTest() && window.classJunkStop) { const m = window.classJunkStop(ans, { starter: r.stem, source: "from today's reading" }); if (m) { status.textContent = m; return; } }
    if (!isTest()) { const m = ownWords(text); if (m) { status.textContent = m; ans.focus(); return; } }
    const full = r.stem + " " + text;
    const firstTry = st.wrong.filter(x => x === 0).length;
    const answers = {
      "Standard": CFG.std || "",
      "Reading": "We the People bell ringer: " + r.title,
      "First-try correct": firstTry + " of " + N
    };
    r.qs.forEach((q, i) => { answers["Check " + (i + 1) + " · " + q.q] = i < st.step ? q.c[0] + (st.wrong[i] ? " (after " + st.wrong[i] + " wrong " + (st.wrong[i] === 1 ? "try" : "tries") + ")" : " (first try)") : "Skipped in teacher preview"; });
    answers["Writing: Finish this sentence using the reading: " + r.stem + "…"] = full;
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
    if (!confirm("Start over? This clears only this bell ringer's progress on this device.")) return;
    try { localStorage.removeItem(KEY + name.toLowerCase()); } catch (e) {}
    st = fresh(); $("welcome").innerHTML = ""; draw();
  };

  // ---- Test T. hook (shared/turnin.js draws the 🧪 bar) ----
  (window.classTestHooks = window.classTestHooks || []).push({
    count: () => TOTAL + 1,
    index: () => st.done ? TOTAL : st.step,
    label: i => i < N ? "Check " + (i + 1) : i === N ? "Finish the sentence" : "Turned in",
    go: i => { if (i >= TOTAL) { st.done = true; st.answer = st.answer || "(Test T. preview)"; } else { st.done = false; st.step = i; } save(); draw(); },
    solve: () => { if (!st.done && st.step < N) answer(0); }
  });
  if (window.classTestSkip) window.classTestSkip.refresh();
})();
