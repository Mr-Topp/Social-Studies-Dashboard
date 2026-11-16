// Bell ringer page engine (U.S. History, World History, Sociology).
// Each bell ringer folder has a tiny index.html that sets window.BELL = { reading, assignmentId }
// and loads: shared/assignments.js, shared/turnin.js, shared/wtp-bell/readings.js, then this file.
// Flow: short reading + picture -> 2 multiple-choice checks (wrong answer = hint + reshuffle) -> finish the sentence -> turn in.
(function () {
  "use strict";
  const CFG = window.BELL || {};
  const r = (window.WTP_READINGS || {})[CFG.reading];
  const meta = (window.CLASS_ASSIGNMENTS || {})[CFG.assignmentId] || {};
  const STD = (meta.std || []).join(", ");
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const MINWORDS = 8;
  const hdr = document.getElementById("hdr"), app = document.getElementById("app");
  if (!r) { app.textContent = "This bell ringer is missing. Tell your teacher."; return; }
  document.title = r.title + " · Bell Ringer";

  const KEY = "bell:" + CFG.assignmentId;
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { step: 0, wrong: {} }; } catch (e) { return { step: 0, wrong: {} }; } };
  let st = load();
  st.wrong = st.wrong || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const isTest = () => !!(window.classIsTestT && window.classIsTestT());
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const n = r.qs.length, total = n + 1;
  const savedName = () => { try { return localStorage.getItem("site-student-name") || ""; } catch (e) { return ""; } };

  function figure() {
    const im = r.img; if (!im) return "";
    const base = (document.querySelector('script[src*="wtp-bell/bell.js"]') || {}).src || "";
    const local = base.replace(/bell\.js.*$/, "") + im.local;
    const remote = "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(im.file.replace(/ /g, "_")) + "?width=800";
    return `<figure class="fig"><div class="imgwrap"><img src="${local}" data-remote="${remote}" alt="${esc(im.cap)}"><span class="imgmsg">Picture didn't load.</span></div>` +
      `<figcaption>${esc(im.cap)} <span class="credit">Click the picture to zoom. Source: Wikimedia Commons (public domain)</span></figcaption></figure>`;
  }

  function render(fresh) {
    hdr.innerHTML = `<a class="back" href="../../">← My work</a><div><h1>${esc(r.title)}</h1><div class="sub">Bell ringer · about 5 minutes</div></div>` +
      `<div class="steps">${Array.from({ length: total }, (_, k) => `<span class="${k < st.step || st.done ? "ok" : k === st.step ? "on" : ""}"></span>`).join("")}</div>`;
    const welcome = fresh && st.step > 0 && !st.done ? `<div class="welcome">Welcome back! You're on check ${st.step + 1} of ${total}.</div>` : "";
    app.innerHTML = `${welcome}<div class="reader"><section class="card reading ${r.serious ? "serious" : ""}"><div class="goal"><b>Today's goal:</b> ${esc(r.goal)}</div>${r.html}</section>` +
      `<div class="side">${figure()}<section class="card" id="qbox"></section></div></div>`;
    const img = app.querySelector(".imgwrap img");
    if (img) img.onerror = () => { if (img.dataset.remote && img.src !== img.dataset.remote) { img.src = img.dataset.remote; } else { img.parentNode.classList.add("noimg"); img.remove(); } };
    drawQ();
  }

  function drawQ(note) {
    const box = document.getElementById("qbox");
    if (st.done) {
      box.innerHTML = `<div class="donecard"><div class="big">✅</div><h2>Nice work${st.name ? ", " + esc(st.name.split(" ")[0]) : ""}! <span class="stamp">✓ Turned in</span></h2>` +
        `<p>Your answer:<br><i>${esc(st.answer || "")}</i></p><a class="btn" href="../../" style="display:inline-block;text-decoration:none">Back to my work</a></div>`;
      return;
    }
    if (st.step < n) {
      const q = r.qs[st.step];
      const order = shuffle(q.c.map((t, k) => ({ t, k })));
      box.innerHTML = `<span class="qtag">Check ${st.step + 1} of ${total}</span><div class="qtext">${esc(q.q)}</div>` +
        order.map(o => `<button class="choice" type="button" data-k="${o.k}">${esc(o.t)}</button>`).join("") + `<div id="fb">${note || ""}</div>`;
      box.querySelectorAll(".choice").forEach(b => b.onclick = () => answer(+b.dataset.k));
      return;
    }
    box.innerHTML = `<span class="qtag">Check ${total} of ${total} · In your words</span>` +
      `<label for="ans" style="display:block"><span class="qtext" style="display:block">Finish this sentence using the reading.</span><span class="stem" style="display:block">${esc(r.stem)}…</span></label>` +
      `<textarea id="ans" placeholder="Finish the sentence in your own words.">${esc(st.draft || "")}</textarea>` +
      `<div class="count" id="cnt"></div><label class="stem" for="studentName" style="display:block;margin-top:10px">Your name</label>` +
      `<input type="text" id="studentName" data-student-name="1" autocomplete="off" value="${esc(st.name || savedName())}" placeholder="First name and last initial (Jordan M.)">` +
      `<button class="btn green" id="go" type="button" disabled>Turn in</button><div id="msg"></div>`;
    const ans = document.getElementById("ans"), nm = document.getElementById("studentName"), go = document.getElementById("go"), cnt = document.getElementById("cnt");
    const check = () => {
      const w = ans.value.trim().split(/\s+/).filter(Boolean).length;
      const ok = (w >= MINWORDS || isTest()) && nm.value.trim().length >= 2;
      cnt.textContent = w >= MINWORDS ? "Looks good." : `Write at least ${MINWORDS} words (you have ${w}).`;
      go.disabled = !ok;
      st.draft = ans.value; save();
    };
    ans.oninput = check; nm.oninput = check; check();
    go.onclick = () => turnIn(ans.value.trim(), nm.value.trim(), go);
  }

  function answer(k) {
    const q = r.qs[st.step];
    if (k === 0) {
      if (window.classFirstTry) window.classFirstTry.right("q" + st.step);
      const box = document.getElementById("qbox");
      box.querySelectorAll(".choice").forEach(b => { b.disabled = true; if (+b.dataset.k === 0) { b.style.borderColor = "var(--green)"; b.style.background = "var(--greenbg)"; } });
      document.getElementById("fb").innerHTML = `<div class="fb good"><b>Right!</b> ${esc(q.why)}</div><button class="btn" id="nx" type="button">Next check →</button>`;
      document.getElementById("nx").onclick = () => { st.step++; save(); render(false); };
    } else {
      if (window.classFirstTry) window.classFirstTry.wrong();
      st.wrong[st.step] = (st.wrong[st.step] || 0) + 1; save();
      drawQ(`<div class="fb try"><b>Not quite.</b> ${esc(q.hint)} The choices have been mixed up. Try again.</div>`);
    }
  }

  async function turnIn(text, name, btn) {
    const msg = document.getElementById("msg");
    msg.innerHTML = ""; btn.disabled = true; btn.textContent = "Turning in…";
    const answers = { "Standard": STD };
    r.qs.forEach((q, i) => { answers["Check " + (i + 1) + ": " + q.q] = q.c[0] + (st.wrong[i] ? " (after " + st.wrong[i] + " wrong " + (st.wrong[i] === 1 ? "try" : "tries") + ")" : " (first try)"); });
    answers["Writing: Finish the sentence"] = r.stem + " " + text;
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName: name, assignmentId: CFG.assignmentId, assignmentTitle: meta.title || r.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.done = true; st.name = name; st.answer = r.stem + " " + text; save(); render(false);
    } catch (e) {
      msg.innerHTML = `<div class="err">${esc(e.message)}</div>`; btn.disabled = false; btn.textContent = "Turn in";
    }
  }

  document.addEventListener("click", e => {
    const t = e.target;
    if (t.matches && t.matches(".imgwrap img")) {
      const z = document.createElement("div"); z.className = "zoom";
      z.innerHTML = `<img src="${t.src}" alt="${esc(t.alt)}">`; z.onclick = () => z.remove(); document.body.appendChild(z);
    }
  });
  document.getElementById("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears only this bell ringer's progress on this device.")) return;
    st = { step: 0, wrong: {} }; save(); if (window.classFirstTry) window.classFirstTry.reset(); render(false);
  };

  // Test T. skip mode (shared/turnin.js draws the 🧪 bar): Back · Skip · Jump · Answer it.
  (window.classTestHooks = window.classTestHooks || []).push({
    count: () => total, index: () => (st.done ? n : Math.min(st.step, n)),
    label: i => (i < n ? "Check " + (i + 1) : "Finish the sentence"),
    go: i => { st.done = false; st.step = Math.max(0, Math.min(i, n)); save(); render(false); },
    solve: () => { if (!st.done && st.step < n) answer(0); }
  });
  if (window.classTestSkip) window.classTestSkip.refresh();

  render(true);
})();
