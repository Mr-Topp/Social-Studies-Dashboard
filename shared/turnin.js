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
const TEACHER_TOOLS_URL = "https://script.google.com/macros/s/AKfycbwiVW6Cufw8Dqnwqka-s8eCDvzhh2B-riUzfU80vlIu4CtejXpxgzXiP-pqlqOY-M6o5g/exec";

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

    if (nameState(body.studentName) !== "ok") {
      return fakeResponse(400, { error: nameState(body.studentName) === "tooMuch" ? guardText("tooMuch") : NAME_HELP });
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

  // --- Name guard: first name + last initial ONLY ------------------------
  // If a student types a whole last name, the box turns red and nothing else on the
  // page works (no buttons, links, Enter, or game clicks) until it's just one letter.
  // The page itself never even sees the full last name.
  const NOT_A_PERSON = /country|leader|island|team|place|region|map|law|city|town|nation|party|pet|character|flag|state\d/;
  function isNameBox(el) {
    if (!el || el.tagName !== "INPUT" || (el.type && !/^(text|search)$/i.test(el.type))) return false;
    if (el.dataset.studentName === "1") return true;
    let label = el.getAttribute("aria-label") || "";
    if (el.id) { const l = document.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(el.id) : el.id) + '"]'); if (l) label += " " + l.textContent; }
    const tag = (el.id + " " + (el.name || "") + " " + (el.placeholder || "") + " " + label).toLowerCase();
    if (NOT_A_PERSON.test(tag)) return false;
    return /student.?name|turn.?name|player.?name|your name|namebox|xname|^name | name$|first and last|first name|last initial|jordan m|nombre/.test(tag) || el.id.toLowerCase() === "name";
  }
  // "ok", "empty", "needInitial" (just a first name), or "tooMuch" (a whole last name or extra words)
  function nameState(raw) {
    const words = String(raw || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "empty";
    if (words.length === 1) return "needInitial";
    if (words.length === 2 && /^\p{L}\.?$/u.test(words[1]) && /\p{L}/u.test(words[0])) return "ok";
    return "tooMuch";
  }
  window.classNameState = nameState;
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs && window.SiteLang.isEs());
  function guardText(state) {
    if (state === "tooMuch") return isEs()
      ? "Solo la inicial de tu apellido, no el apellido completo. Ejemplo: Jordan M."
      : "Only your last INITIAL, not your whole last name. Example: Jordan M.";
    return isEs() ? "Agrega la inicial de tu apellido. Ejemplo: Jordan M." : "Add your last initial. Example: Jordan M.";
  }
  function showGuard(box, state) {
    let msg = box.nextElementSibling && box.nextElementSibling.classList.contains("name-guard") ? box.nextElementSibling : null;
    if (!state) {
      if (msg) msg.remove();
      box.style.outline = ""; box.removeAttribute("aria-invalid");
      return;
    }
    if (!msg) {
      msg = document.createElement("p");
      msg.className = "name-guard"; msg.setAttribute("role", "alert");
      msg.style.cssText = "color:#b00020;font-weight:700;margin:6px 0 8px;font-size:1rem;line-height:1.3";
      box.insertAdjacentElement("afterend", msg);
    }
    msg.textContent = "⚠ " + guardText(state);
    box.style.outline = "3px solid #b00020"; box.setAttribute("aria-invalid", "true");
  }
  const visible = el => el.isConnected && !el.disabled && el.getClientRects().length > 0;
  // A visible name box that has something typed in it but isn't "First L." yet.
  function badBox() {
    for (const el of document.querySelectorAll("input")) {
      if (!isNameBox(el) || !visible(el)) continue;
      const s = nameState(el.value);
      if (s === "tooMuch" || s === "needInitial") return { el, s };
    }
    return null;
  }
  function allowed(target, box) {
    if (!target || !target.closest) return false;
    return target === box || target.closest("label") && target.closest("label").control === box ||
      target.closest(".name-guard, #langSwitch, .lang-switch");
  }

  // Typing: once they start a whole last name, warn right away and keep it from the page.
  window.addEventListener("input", e => {
    const box = e.target;
    if (!isNameBox(box)) return;
    const s = nameState(box.value);
    if (s === "tooMuch") { showGuard(box, s); e.stopImmediatePropagation(); }
    else showGuard(box, null);
  }, true);
  ["change", "keyup"].forEach(type => window.addEventListener(type, e => {
    if (isNameBox(e.target) && nameState(e.target.value) === "tooMuch") e.stopImmediatePropagation();
  }, true));
  // Leaving the box with a good name: tidy it to "Jordan M."
  window.addEventListener("blur", e => {
    const box = e.target;
    if (!isNameBox(box) || nameState(box.value) !== "ok") return;
    const fixed = shortName(box.value);
    if (fixed && fixed !== box.value) { box.value = fixed; box.dispatchEvent(new Event("input", { bubbles: true })); }
  }, true);
  // Trying to move on: block every click, tap, Enter, and form submit until the name is fixed.
  function block(e) {
    const bad = badBox();
    if (!bad || allowed(e.target, bad.el)) return;
    e.stopImmediatePropagation();
    if (e.type === "click" || e.type === "submit") {
      e.preventDefault();
      showGuard(bad.el, bad.s);
      bad.el.scrollIntoView({ block: "center", behavior: "smooth" });
      bad.el.focus({ preventScroll: true });
    }
  }
  ["click", "submit", "pointerdown", "mousedown"].forEach(type => window.addEventListener(type, block, true));
  window.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const bad = badBox();
    if (!bad) return;
    if (e.target === bad.el && e.key === " ") return; // spaces are fine while typing
    if (e.target === bad.el || !allowed(e.target, bad.el)) {
      e.preventDefault(); e.stopImmediatePropagation();
      showGuard(bad.el, bad.s); bad.el.focus();
    }
  }, true);

  // Every name box (even ones a game adds later): right hint, and no Chromebook autofill of a full name.
  // The student's home page (the main Activities page) saves the name they tapped on this Chromebook,
  // so empty name boxes fill in by themselves. They can still change it.
  let savedName = "";
  try { savedName = shortName(localStorage.getItem("site-student-name") || ""); } catch (e) {}
  if (nameState(savedName) !== "ok") savedName = "";
  function fixNameBoxes() {
    document.querySelectorAll("input").forEach(input => {
      if (!isNameBox(input)) return;
      // Wait until the page has finished loading (some activities reset their name box while loading),
      // and never refill a box the student typed in themselves.
      if (savedName && !input.value && input.dataset.nameTouched !== "1" && document.readyState !== "loading" && !/teacher-submissions/.test(location.pathname) && !window.NO_FEEDBACK_POPUP && !window.HUB_PAGE) {
        input.dataset.nameFilled = "1";
        input.value = savedName;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (input.dataset.nameGuard) return;
      input.dataset.nameGuard = "1";
      input.placeholder = "First name + last initial (like Jordan M.)";
      input.setAttribute("autocomplete", "off");
      if (nameState(input.value) === "tooMuch") showGuard(input, "tooMuch"); // an old saved full name
    });
  }
  new MutationObserver(fixNameBoxes).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("input", e => { if (e.isTrusted && isNameBox(e.target)) e.target.dataset.nameTouched = "1"; }, true);
  window.addEventListener("load", () => setTimeout(fixNameBoxes, 50));

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
    const ft = body.answers && typeof body.answers === "object" ? String(body.answers["First-try correct"] || "") : "";
    list.push({ token, id: body.assignmentId, title: meta.title || body.assignmentTitle || "Your activity", page: location.pathname + location.hash, at: Date.now(), seen: false, ft, who: shortName(body.studentName || "") });
    saveReceipts(list);
  }
  async function toolsPost(payload) {
    const res = await fetch(TEACHER_TOOLS_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    return res.json();
  }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  async function showFeedback() {
    if (!TEACHER_TOOLS_URL || /teacher-submissions/.test(location.pathname) || window.NO_FEEDBACK_POPUP) return;
    const waiting = loadReceipts().filter(r => !r.seen && Date.now() - r.at < 45 * 864e5);
    if (!waiting.length) return;
    let got;
    try { got = await toolsPost({ action: "feedback", tokens: waiting.map(r => r.token) }); } catch (e) { return; }
    // Only the student who's signed in now sees their cards (Chromebooks get shared). The sheet says whose
    // turn-in each card is; older receipts without that are matched by the name saved with the receipt.
    let nowName = ""; try { nowName = shortName(localStorage.getItem("site-student-name") || ""); } catch (e) {}
    if (!nowName) return;
    const sameKid = (a, b) => !!a && !!b && a.toLowerCase() === b.toLowerCase();
    const byTok = new Map(waiting.map(r => [r.token, r]));
    const ready = ((got && got.items) || []).filter(x => x.graded && sameKid(x.who || (byTok.get(x.token) || {}).who, nowName)).slice(0, 3);
    if (!ready.length) return;
    const byToken = new Map(waiting.map(r => [r.token, r]));
    renderFeedback(ready, byToken, false);
  }
  // Draws the feedback card. preview = true: the teacher's test student sees a sample (nothing is saved or sent).
  function renderFeedback(ready, byToken, preview) {
    if (document.querySelector(".fb-wrap")) return;
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
    wrap.innerHTML = `<div class="fb-card">${preview ? '<p class="fb-sub" style="background:#dbe8fb;color:#1c3f78;border-radius:8px;padding:4px 10px;font-weight:700">🧪 Teacher preview: this is the card students see when you grade their work. Sample feedback.</p>' : ""}<h2>Your feedback is ready</h2><p class="fb-sub">Read it, then fix it or keep going.</p>` +
      ready.map(x => {
        const r = byToken.get(x.token) || {}, lvl = x.flagged ? "" : (x.level ? `<span class="fb-lvl fb-l${esc(x.level)}">Level ${esc(x.level)} of 4 · ${({ 1: "let's fix this", 2: "almost there", 3: "nice work", 4: "excellent" })[x.level] || ""}</span>` : "");
        const msg = x.flagged ? "Your teacher wants to talk with you about this one." : (x.feedback || "Your teacher graded this one.");
        const fix = !x.flagged && +x.level <= 2 && r.page ? `<a class="fb-fix" href="${esc(r.page)}" data-t="${esc(x.token)}">Fix it now</a>` : "";
        return `<div class="fb-item"><b>${esc(x.title || r.title)}</b>${lvl}<p>${esc(msg)}</p><div class="fb-btns">${fix}<button class="fb-ok" data-t="${esc(x.token)}">Got it</button></div></div>`;
      }).join("") + `<button class="fb-ok fb-close" data-all="1">Got it, start today's work</button></div>`;
    document.body.appendChild(wrap);
    const done = token => {
      if (preview) return;
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
  window.classFeedbackPreview = items => renderFeedback(items, new Map(items.map(x => [x.token, x])), true);
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

  // --- 🔊 Read to me (every activity page) ---------------------------------------------------
  // Reads what's on the screen right now out loud with the Chromebook's own voice.
  // If the student highlights some words first, it reads just those. Not on the teacher pages or the student home page.
  function addReadAloud() {
    if (!("speechSynthesis" in window) || window.HUB_PAGE || window.NO_FEEDBACK_POPUP || /teacher-submissions|setup-|update-teacher/.test(location.pathname)) return;
    if (document.getElementById("readAloudBtn")) return;
    const css = document.createElement("style");
    css.textContent = "#readAloudBtn{position:fixed;right:14px;bottom:14px;z-index:9990;display:flex;align-items:center;gap:6px;min-height:44px;padding:8px 16px;border:2px solid #fff;border-radius:999px;background:#19364b;color:#fff;font:800 16px/1 system-ui,Segoe UI,Arial,sans-serif;box-shadow:0 4px 14px #0004;cursor:pointer}" +
      "#readAloudBtn[aria-pressed=true]{background:#a33d36}#readAloudBtn:focus-visible{outline:3px solid #2b6cb0;outline-offset:2px}@media print{#readAloudBtn{display:none}}";
    document.head.appendChild(css);
    const btn = document.createElement("button");
    btn.id = "readAloudBtn"; btn.type = "button"; btn.setAttribute("aria-pressed", "false"); btn.setAttribute("data-no-es", "");
    btn.title = "Reads what's on your screen. Highlight words first to hear just those.";
    const es = () => !!(window.SiteLang && window.SiteLang.isEs && window.SiteLang.isEs());
    const label = on => { btn.textContent = on ? (es() ? "⏹ Parar" : "⏹ Stop") : (es() ? "🔊 Léemelo" : "🔊 Read to me"); btn.setAttribute("aria-pressed", String(on)); };
    label(false);
    // Text that's showing on the screen right now (skips hidden screens, buttons' icons, and this button).
    function screenText() {
      const sel = String(window.getSelection ? window.getSelection() : "").trim();
      if (sel.length > 1) return sel;
      const out = [], vh = window.innerHeight, vw = window.innerWidth;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          const el = n.parentElement;
          if (!el || !n.nodeValue.trim() || el.closest("script,style,noscript,#readAloudBtn,.lang-switch,[aria-hidden=true]")) return NodeFilter.FILTER_REJECT;
          const r = document.createRange(); r.selectNodeContents(n);
          const box = r.getBoundingClientRect();
          if (!box.width || !box.height || box.bottom < 0 || box.top > vh || box.right < 0 || box.left > vw) return NodeFilter.FILTER_REJECT;
          const cs = getComputedStyle(el);
          return cs.visibility === "hidden" || +cs.opacity === 0 ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        }
      });
      let n; while ((n = walker.nextNode())) out.push(n.nodeValue.trim());
      return out.join(" ").replace(/Standard\s+SS\.9-12\.[A-Za-z]+\.\d+\s*[—-]?/g, "Standard: ").replace(/SS\.9-12\.[A-Za-z]+\.\d+/g, " ")
        .replace(/[→↗←▶✓✔⚠🔊]/g, " ").replace(/\s+/g, " ").trim();
    }
    btn.addEventListener("click", () => {
      const synth = window.speechSynthesis;
      if (synth.speaking) { synth.cancel(); label(false); return; }
      const text = screenText();
      if (!text) return;
      const u = new SpeechSynthesisUtterance(text.slice(0, 6000));
      u.rate = 0.95; u.lang = es() ? "es-US" : "en-US";
      u.onend = u.onerror = () => label(false);
      synth.cancel(); synth.speak(u); label(true);
    });
    // Keep the highlighted words when the button is pressed.
    btn.addEventListener("mousedown", e => e.preventDefault());
    document.body.appendChild(btn);
    window.addEventListener("pagehide", () => window.speechSynthesis.cancel());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addReadAloud); else addReadAloud();

  if (document.readyState === "complete") showFeedback(); else window.addEventListener("load", showFeedback);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fixNameBoxes);
  else fixNameBoxes();
  // Name boxes that show up later (like on a game's last screen) get filled in too.
  if (savedName && window.MutationObserver) {
    let queued = false;
    const later = () => { if (queued) return; queued = true; setTimeout(() => { queued = false; fixNameBoxes(); }, 120); };
    const start = () => new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
    if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
  }
})();
