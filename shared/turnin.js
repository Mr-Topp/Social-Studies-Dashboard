// =====================================================================
//  WHERE STUDENT WORK GOES
//  Every activity that turns in work uses this one file.
//
//  Paste your Google Apps Script web-app address between the quotes.
//  It looks like: https://script.google.com/macros/s/AKfy.../exec
//  While it is empty, work keeps going to the old site, so nothing breaks.
// =====================================================================
const GOOGLE_SAVER_URL = "https://script.google.com/macros/s/AKfycbwWV93yudtLuny7OwiCluP5nyF7OZ4lJ5c7RBD1vDTYl_ezOYFAXx00XJLctKTdzZmENw/exec";

// Teacher Tools web app (shared/google-saver/TeacherTools.gs). Turns on: grade changes and class-list
// editing on the dashboard, and the feedback card students see on their next activity.
// Paste its /exec address between the quotes after the one-time setup (teacher-submissions/setup-teacher-tools.html).
const TEACHER_TOOLS_URL = "https://script.google.com/macros/s/AKfycbxbiHdWfmdn70dg0CLlSF_6dtyyQeYN44DCUAtl6qD-mjWrnH5WThqzFt9OBDdwP1KIhQ/exec";

(function () {
  "use strict";

  // --- Names: first name + last initial, like "Jordan M." -------------
  function shortName(raw) {
    const words = String(raw || "").replace(/[^\p{L}\p{M}'.\- ]/gu, " ").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "";
    const cap = w => w.charAt(0).toUpperCase() + w.slice(1);
    const first = cap(words[0].replace(/\.+$/, ""));
    if (words.length === 1) return first;
    const last = words[words.length - 1].replace(/[^\p{L}]/gu, "");
    return last ? first + " " + last.charAt(0).toUpperCase() + "." : first;
  }
  window.classShortName = shortName;

  const NAME_HELP = "Type your first name and last initial, like Jordan M.";

  function fakeResponse(status, data) {
    return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
  }

  // Some older activities did not include an id; fill it in from the address.
  function fillMissingId(url, body) {
    if (body.assignmentId) return;
    if (/sociology-theory-showdown/.test(url)) {
      body.assignmentId = /video-progress/.test(url) ? "sociology-theory-casebook-video" : "sociology-theory-casebook";
      if (/video-progress/.test(url)) body.kind = "progress";
    }
  }


  // --- First-try score -----------------------------------------------------------
  // Pages call classFirstTry.wrong() on a miss and classFirstTry.right("item-id") when a
  // question is answered correctly. Each item counts once, even after a refresh.
  // classTurnIn() then adds "First-try correct: X of Y" to the turn-in automatically.
  window.classFirstTry = (function () {
    const key = "firsttry:" + location.pathname;
    let st;
    try { st = JSON.parse(localStorage.getItem(key)); } catch (e) {}
    if (!st || typeof st !== "object" || !st.done) st = { done: {}, miss: false };
    const save = () => { try { localStorage.setItem(key, JSON.stringify(st)); } catch (e) {} };
    return {
      wrong() { st.miss = true; save(); },
      right(id) { id = String(id); if (!(id in st.done)) st.done[id] = !st.miss; st.miss = false; save(); },
      count() { const v = Object.values(st.done); return { right: v.filter(Boolean).length, total: v.length }; },
      text() { const c = this.count(); return c.right + " of " + c.total; },
      reset() { st = { done: {}, miss: false }; save(); }
    };
  })();

  // Activities call classTurnIn(oldAddress, fetchOptions) instead of fetch().
  window.classTurnIn = async function (oldUrl, options) {
    let body;
    try { body = JSON.parse(options && options.body || "{}"); } catch (e) { body = {}; }

    // Add the first-try score (second, right after the standard) if the page tracked one.
    if (body.answers && typeof body.answers === "object" && !Array.isArray(body.answers) && !("First-try correct" in body.answers)) {
      const c = window.classFirstTry.count();
      if (c.total) {
        const out = {};
        if ("Standard" in body.answers) out.Standard = body.answers.Standard;
        out["First-try correct"] = c.right + " of " + c.total;
        Object.keys(body.answers).forEach(k => { if (!(k in out)) out[k] = body.answers[k]; });
        body.answers = out;
      }
    }

    // Save the exact wording of the written questions on the page, so grading always uses
    // the question the student actually saw (even if the activity is reworded later).
    if (body.answers && typeof body.answers === "object" && !Array.isArray(body.answers) && !("Questions on the page" in body.answers)) {
      const qs = [];
      document.querySelectorAll("textarea").forEach(t => {
        let txt = "";
        if (t.id) { const l = document.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(t.id) : t.id) + '"]'); if (l) txt = l.textContent; }
        if (!txt) { const l = t.closest("label"); if (l) txt = l.textContent; }
        if (!txt) txt = t.getAttribute("aria-label") || "";
        txt = txt.replace(/\s+/g, " ").trim();
        if (txt.length > 8 && !qs.includes(txt)) qs.push(txt);
      });
      if (qs.length) body.answers["Questions on the page"] = qs;
    }

    // Student used the Español switch: tag it, and save the English wording of the questions too.
    if (window.SiteLang && window.SiteLang.isEs() && body.answers && typeof body.answers === "object" && !Array.isArray(body.answers)) {
      body.answers.Language = "Spanish";
      const qs = body.answers["Questions on the page"];
      if (Array.isArray(qs)) {
        const en = qs.map(q => window.SiteLang.toEn(q) || q);
        if (en.some((q, i) => q !== qs[i])) body.answers["Questions on the page (English)"] = en;
      }
    }

    // Writing check: how much of the written answers was typed vs. pasted in (see "Writing check" below).
    if (body.answers && typeof body.answers === "object" && !Array.isArray(body.answers) && !("Writing check" in body.answers)) {
      const w = writingSummary();
      if (w) { body.answers["Writing check"] = w.text; if (w.mostlyPasted) body.answers["Pasted writing"] = w.detail; }
    }

    const name = shortName(body.studentName);
    if (!name || !/ [A-Z]\.$/.test(name)) return fakeResponse(400, { error: NAME_HELP });
    body.studentName = name;

    // Old site: same as before, just with the shorter name.
    if (!GOOGLE_SAVER_URL) {
      const res = await fetch(oldUrl, Object.assign({}, options, { body: JSON.stringify(body) }));
      if (res.status === 400) {
        const data = await res.clone().json().catch(() => ({}));
        // The old site only knows older activities. Say so plainly instead of "Unknown assignment."
        if (/unknown assignment/i.test(data.error || "")) {
          return fakeResponse(400, { error: "Turn-in for this activity isn't switched on yet. Keep this page open and tell your teacher." });
        }
      }
      return res;
    }

    // Google Sheet saver.
    fillMissingId(oldUrl, body);
    // A private receipt for this turn-in, kept on this Chromebook, so the student's feedback can find them later.
    const receipt = newReceipt();
    if (body.answers && typeof body.answers === "object" && !Array.isArray(body.answers)) body.answers.Receipt = receipt;
    const meta = (window.CLASS_ASSIGNMENTS || {})[body.assignmentId];
    body.action = "submit";
    body.course = window.classCourseFor ? window.classCourseFor(body.assignmentId) : "";
    if (!body.assignmentTitle && meta) body.assignmentTitle = meta.title;
    body.page = location.pathname;

    try {
      const res = await fetch(GOOGLE_SAVER_URL, {
        method: "POST",
        // text/plain keeps the browser from blocking the request to Google.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(body),
        redirect: "follow"
      });
      const data = await res.json().catch(() => ({}));
      if (data && data.ok) { saveReceipt(receipt, body); return fakeResponse(200, data); }
      return fakeResponse(400, { error: (data && data.error) || "Your work did not save. Try again." });
    } catch (e) {
      return fakeResponse(503, { error: "Could not reach the turn-in system. Check your internet and try again." });
    }
  };

  // --- Make name boxes ask for first name + last initial ---------------
  function fixNameBoxes() {
    document.querySelectorAll("input").forEach(input => {
      const tag = (input.id + " " + input.name + " " + (input.placeholder || "")).toLowerCase();
      if (!/student.?name|your name|^name | name$|first and last/.test(tag) && input.id.toLowerCase() !== "name") return;
      if (input.type && !/text|search/.test(input.type)) return;
      input.placeholder = "First name + last initial (like Jordan M.)";
      input.setAttribute("autocomplete", "off");
      input.addEventListener("blur", () => {
        const fixed = shortName(input.value);
        if (fixed && fixed !== input.value) {
          input.value = fixed;
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
    });
  }

  // --- Outside pictures that don't load (blocked by a school filter, site down) ----
  // Show a short note with a link instead of a broken-image icon.
  function isOutside(img) {
    try { return img.currentSrc || img.src ? new URL(img.currentSrc || img.src, location.href).origin !== location.origin : false; }
    catch (e) { return false; }
  }
  function noteFor(img) {
    let note = img.nextElementSibling;
    if (note && note.classList.contains("img-fallback")) return note;
    note = document.createElement("p");
    note.className = "img-fallback";
    note.setAttribute("role", "note");
    note.style.cssText = "margin:8px 0;padding:10px 12px;border:2px dashed #b9ad97;border-radius:10px;background:#fffdf8;color:#22313b;font:600 .95rem/1.4 system-ui,Segoe UI,Arial,sans-serif;text-align:left";
    img.insertAdjacentElement("afterend", note);
    return note;
  }
  function showFallback(img) {
    if (!(img instanceof HTMLImageElement) || !isOutside(img)) return;
    const src = img.currentSrc || img.src, note = noteFor(img);
    note.textContent = "Picture didn't load" + (img.alt ? " (" + img.alt.slice(0, 90) + ")" : "") + ". ";
    const a = document.createElement("a");
    a.href = src; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Open it here ↗";
    note.appendChild(a);
    img.dataset.fallbackHidden = "1";
    img.style.display = "none";
    note.hidden = false;
  }
  document.addEventListener("error", e => { if (e.target && e.target.tagName === "IMG") showFallback(e.target); }, true);
  document.addEventListener("load", e => {
    const img = e.target;
    if (!img || img.tagName !== "IMG" || img.dataset.fallbackHidden !== "1") return;
    img.style.display = ""; delete img.dataset.fallbackHidden;
    const note = img.nextElementSibling;
    if (note && note.classList.contains("img-fallback")) note.hidden = true;
  }, true);
  // Same idea when an image's address changes later and it was hidden before.
  function checkAll() { document.querySelectorAll("img").forEach(img => { if (img.complete && img.src && !img.naturalWidth) showFallback(img); }); }
  if (document.readyState === "complete") checkAll(); else window.addEventListener("load", checkAll);


  // --- Feedback card on the next activity ----------------------------------------------
  // After the hourly AI grader (or the teacher) grades a turn-in, the student sees a short card the
  // next time they open any class activity: level, what went well, one next step. Fix it now / Got it.
  const RECEIPTS = "class-feedback-receipts";
  function newReceipt() {
    const a = new Uint8Array(16);
    (window.crypto || window.msCrypto).getRandomValues(a);
    return Array.from(a, b => b.toString(16).padStart(2, "0")).join("");
  }
  function loadReceipts() { try { return JSON.parse(localStorage.getItem(RECEIPTS)) || []; } catch (e) { return []; } }
  function saveReceipts(list) { try { localStorage.setItem(RECEIPTS, JSON.stringify(list.slice(-40))); } catch (e) {} }
  function saveReceipt(token, body) {
    const meta = (window.CLASS_ASSIGNMENTS || {})[body.assignmentId] || {};
    const list = loadReceipts().filter(r => r.token !== token);
    list.push({ token, id: body.assignmentId, title: meta.title || body.assignmentTitle || "Your activity", page: location.pathname + location.hash, at: Date.now(), seen: false });
    saveReceipts(list);
  }
  async function toolsPost(payload) {
    const res = await fetch(TEACHER_TOOLS_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    return res.json();
  }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  async function showFeedback() {
    if (!TEACHER_TOOLS_URL || /teacher-submissions/.test(location.pathname)) return;
    const waiting = loadReceipts().filter(r => !r.seen && Date.now() - r.at < 45 * 864e5);
    if (!waiting.length) return;
    let got;
    try { got = await toolsPost({ action: "feedback", tokens: waiting.map(r => r.token) }); } catch (e) { return; }
    const ready = ((got && got.items) || []).filter(x => x.graded).slice(0, 3);
    if (!ready.length) return;
    const byToken = new Map(waiting.map(r => [r.token, r]));
    const css = document.createElement("style");
    css.textContent = ".fb-wrap{position:fixed;inset:0;z-index:99999;background:#0f1c2bcc;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:20px 12px;font:17px/1.5 system-ui,Segoe UI,Arial,sans-serif}" +
      ".fb-card{background:#fffdf8;color:#22313b;max-width:560px;width:100%;border-radius:16px;padding:20px;box-shadow:0 20px 60px #0008}" +
      ".fb-card h2{margin:0 0 4px;font-size:1.35rem;color:#19364b}.fb-sub{margin:0 0 12px;color:#536571}" +
      ".fb-item{border-top:1px solid #e3dccb;padding:12px 0}.fb-item b{display:block;color:#19364b}" +
      ".fb-lvl{display:inline-block;border-radius:8px;padding:2px 10px;font-weight:900;margin:6px 0}.fb-l1{background:#f8dcd8;color:#8e2a20}.fb-l2{background:#fff1c9;color:#7a5a00}.fb-l3{background:#dff0e2;color:#1f5e2c}.fb-l4{background:#dbe8fb;color:#1c3f78}" +
      ".fb-item p{margin:4px 0 8px}.fb-btns{display:flex;gap:8px;flex-wrap:wrap}" +
      ".fb-btns a,.fb-btns button{font:800 16px system-ui,Arial,sans-serif;border:0;border-radius:10px;padding:10px 14px;cursor:pointer;text-decoration:none}" +
      ".fb-fix{background:#a33d36;color:#fff}.fb-ok{background:#e7e0d1;color:#19364b}.fb-close{width:100%;margin-top:6px;background:#19364b!important;color:#fff}" +
      ".fb-card :focus-visible{outline:3px solid #2b6cb0;outline-offset:2px}";
    document.head.appendChild(css);
    const wrap = document.createElement("div");
    wrap.className = "fb-wrap"; wrap.setAttribute("role", "dialog"); wrap.setAttribute("aria-modal", "true"); wrap.setAttribute("aria-label", "Your feedback");
    wrap.innerHTML = `<div class="fb-card"><h2>Your feedback is ready</h2><p class="fb-sub">Read it, then fix it or keep going.</p>` +
      ready.map(x => {
        const r = byToken.get(x.token) || {}, lvl = x.flagged ? "" : (x.level ? `<span class="fb-lvl fb-l${esc(x.level)}">Level ${esc(x.level)} of 4 · ${({ 1: "let's fix this", 2: "almost there", 3: "nice work", 4: "excellent" })[x.level] || ""}</span>` : "");
        const msg = x.flagged ? "Your teacher wants to talk with you about this one." : (x.feedback || "Your teacher graded this one.");
        const fix = !x.flagged && +x.level <= 2 && r.page ? `<a class="fb-fix" href="${esc(r.page)}" data-t="${esc(x.token)}">Fix it now</a>` : "";
        return `<div class="fb-item"><b>${esc(x.title || r.title)}</b>${lvl}<p>${esc(msg)}</p><div class="fb-btns">${fix}<button class="fb-ok" data-t="${esc(x.token)}">Got it</button></div></div>`;
      }).join("") + `<button class="fb-ok fb-close" data-all="1">Got it, start today's work</button></div>`;
    document.body.appendChild(wrap);
    const done = token => {
      const list = loadReceipts(); list.forEach(r => { if (r.token === token) r.seen = true; }); saveReceipts(list);
      toolsPost({ action: "seen", token }).catch(() => {});
    };
    wrap.querySelectorAll("[data-t]").forEach(b => b.addEventListener("click", () => {
      done(b.dataset.t);
      if (b.tagName === "BUTTON") { const item = b.closest(".fb-item"); item.remove(); if (!wrap.querySelector(".fb-item")) wrap.remove(); }
    }));
    wrap.querySelector("[data-all]").addEventListener("click", () => { ready.forEach(x => done(x.token)); wrap.remove(); });
    // "Got it" unlocks after 2 seconds so the feedback gets read, not skipped. "Fix it now" works right away.
    const oks = wrap.querySelectorAll(".fb-ok"); oks.forEach(b => { b.disabled = true; b.style.opacity = ".55"; });
    setTimeout(() => oks.forEach(b => { b.disabled = false; b.style.opacity = ""; }), 2000);
    const first = wrap.querySelector("a,button"); if (first) first.focus();
  }
  // --- Writing check -------------------------------------------------------------------
  // Counts what students type vs. paste into written-answer boxes, so copied or AI-written text
  // shows up on the teacher dashboard. Students get a short heads-up the moment they paste.
  // Counts are kept on this device per page and box, so a refresh doesn't reset them.
  const WKEY = "writingcheck:" + location.pathname;
  let wdata;
  try { wdata = JSON.parse(localStorage.getItem(WKEY)) || {}; } catch (e) { wdata = {}; }
  const wsave = () => { try { localStorage.setItem(WKEY, JSON.stringify(wdata)); } catch (e) {} };
  const wid = t => t.id || t.name || ("box" + [...document.querySelectorAll("textarea")].indexOf(t));
  const wstat = t => (wdata[wid(t)] = wdata[wid(t)] || { typed: 0, pasted: 0, pastes: 0 });
  function pasteNotice(t) {
    let n = t.nextElementSibling;
    if (!n || !n.classList || !n.classList.contains("paste-note")) {
      n = document.createElement("p");
      n.className = "paste-note"; n.setAttribute("role", "status");
      n.style.cssText = "margin:6px 0 0;padding:8px 10px;border-radius:8px;background:#fff4d6;color:#5c4300;font:700 .9rem/1.35 system-ui,Segoe UI,Arial,sans-serif";
      t.insertAdjacentElement("afterend", n);
    }
    n.textContent = "Heads up: pasted writing shows up for your teacher. Write your answer in your own words.";
  }
  function onPasteLike(t, text) {
    if (!t || t.tagName !== "TEXTAREA") return;
    const len = String(text || "").trim().length; if (!len) return;
    const s = wstat(t); s.pasted += len; s.pastes++; wsave();
    if (len >= 25) pasteNotice(t);
  }
  document.addEventListener("paste", e => onPasteLike(e.target, e.clipboardData && e.clipboardData.getData("text")), true);
  document.addEventListener("drop", e => onPasteLike(e.target, e.dataTransfer && e.dataTransfer.getData("text")), true);
  document.addEventListener("input", e => {
    const t = e.target; if (!t || t.tagName !== "TEXTAREA") return;
    if (e.inputType === "insertText" && e.data) { wstat(t).typed += e.data.length; wsave(); }
    else if (e.inputType === "insertReplacementText" && e.data) { wstat(t).typed += e.data.length; wsave(); }
  }, true);
  function writingSummary() {
    let typed = 0, pasted = 0, pastes = 0, written = 0, boxes = 0;
    document.querySelectorAll("textarea").forEach(t => {
      const len = (t.value || "").trim().length; if (!len) return;
      const s = wdata[wid(t)] || { typed: 0, pasted: 0, pastes: 0 };
      written += len; boxes++; typed += s.typed; pasted += Math.min(s.pasted, len); pastes += s.pastes;
    });
    if (!boxes) return null;
    const share = written ? Math.round(pasted / written * 100) : 0;
    const text = "Typed about " + typed + " characters, pasted about " + pasted + (pastes ? " (" + pastes + " paste" + (pastes === 1 ? "" : "s") + ")" : "") + " · final writing " + written + " characters";
    return { text, mostlyPasted: pasted >= 40 && share >= 50, detail: "About " + share + "% of the final writing was pasted in" };
  }

  if (document.readyState === "complete") showFeedback(); else window.addEventListener("load", showFeedback);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fixNameBoxes);
  else fixNameBoxes();
})();
