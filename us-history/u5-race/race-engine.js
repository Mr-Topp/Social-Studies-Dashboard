// =====================================================================
//  RACE BOARD ENGINE  (U.S. History Unit 5: Day 2 + Day 3 games)
//  Four made-up Iowans race on a board of lights (how well each one is doing).
//  Each round: real news → guess who wins/loses (not graded) → your move →
//  results + one quick "why" check (graded on first try, reshuffles on a miss).
//  Optional Part 2 (Day 3): Cold War credit events with a vote + one check each.
//  Ends with a final board, 1–2 short written answers, and turn-in.
//  Page supplies window.RACE = {...config} before loading this file.
//  Turn-in via shared/turnin.js (same payload shape as the other games).
//  Test T. can jump/skip/answer everything through the 🧪 bar (classTestHooks).
// =====================================================================
(function () {
  "use strict";
  const C = window.RACE;
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 4;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const TT = () => !!(window.classIsTestT && window.classIsTestT());
  const P = C.people, R = C.rounds, E = C.credit ? C.credit.events : [];
  const N = C.lights || 12;
  const clamp = v => Math.max(1, Math.min(N, v));
  const first = s => String(s).split(",")[0];

  // ---------- steps ----------
  const STEPS = [{ type: "pick", short: "Pick your person" }];
  R.forEach((r, i) => {
    STEPS.push({ type: "news", r: i, short: r.yr + " · News + guess" });
    STEPS.push({ type: "move", r: i, short: r.yr + " · Your move" });
    STEPS.push({ type: "result", r: i, short: r.yr + " · Results" });
    STEPS.push({ type: "rcheck", r: i, short: r.yr + " · Quick check" });
  });
  if (C.credit) {
    STEPS.push({ type: "cwintro", short: "Part 2 · The Wall" });
    E.forEach((e, i) => STEPS.push({ type: "cw", e: i, short: e.yr + " · Credit + check" }));
  }
  STEPS.push({ type: "finalboard", short: "Final board" });
  C.prompts.forEach((p, k) => STEPS.push({ type: "write", k, short: "Write " + (k + 1) + (C.prompts.length > 1 ? " of " + C.prompts.length : "") }));
  const TOTAL = STEPS.length;
  const CHECKS = R.map((r, i) => Object.assign({ id: "r" + i }, r.check)).concat(E.map((e, i) => Object.assign({ id: "e" + i }, e.check)));

  // ---------- state ----------
  const fresh = () => ({ name: "", step: -1, me: null, guesses: {}, moves: {}, votes: {}, wrong: {}, done: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(C.key)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.moves) st = fresh();
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(C.key); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(C.key, JSON.stringify(st)); } catch (e) {} };
  const meP = () => P.find(p => p.id === st.me) || P[0];

  // Levels after rounds 0..n-1 (deterministic from the student's moves).
  function levels(n) {
    const lv = {}; P.forEach(p => lv[p.id] = p.start);
    const flags = {};
    for (let i = 0; i < n; i++) {
      const r = R[i], fx = Object.assign({}, r.fx);
      const mv = st.me != null && st.moves[i] != null ? r.moves[st.me][st.moves[i]] : null;
      if (st.me != null) laterHits(i).forEach(h => { fx[st.me] = (fx[st.me] || 0) + h.d; });
      if (mv) {
        fx[st.me] = (fx[st.me] || 0) + (mv.fx || 0);
        if (r.cushion && flags[r.cushion]) fx[st.me] += 1;
        if (mv.flag) flags[mv.flag] = true;
      }
      P.forEach(p => lv[p.id] = clamp(lv[p.id] + (fx[p.id] || 0)));
    }
    return lv;
  }
  // Delayed payoffs: a move in round k can carry later: {"2": +1} with laterSay {"2": "..."}.
  function laterHits(i) {
    const out = [];
    for (let k = 0; k < i; k++) {
      const m = st.moves[k] != null && st.me ? R[k].moves[st.me][st.moves[k]] : null;
      if (m && m.later && m.later[i] != null) out.push({ d: m.later[i], say: (m.laterSay || {})[i] || "", from: R[k].yr });
    }
    return out;
  }
  const cushionHit = i => { const r = R[i]; if (!r.cushion) return false; for (let k = 0; k < i; k++) { const m = st.moves[k] != null ? R[k].moves[st.me][st.moves[k]] : null; if (m && m.flag === r.cushion) return true; } return false; };
  const word = v => { const f = v / N; return f >= .8 ? "Rich" : f >= .6 ? "Comfortable" : f >= .4 ? "Doing OK" : f >= .25 ? "Getting by" : "Struggling"; };

  // ---------- art ----------
  const av = p => `<svg class="av" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="${p.col}"/><circle cx="20" cy="17" r="8" fill="${p.skin}"/><path d="M8 36c2-8 8-10 12-10s10 2 12 10" fill="${p.shirt}"/></svg>`;
  function board(lv, prev, reasons) {
    $("board").hidden = false; $("legend").hidden = false;
    $("board").classList.toggle("wide", !!reasons);
    $("board").innerHTML = P.map(p => {
      const v = lv[p.id], d = prev ? v - prev[p.id] : 0;
      const arrow = d > 0 ? "▲" : d < 0 ? "▼" : "—", cls = d > 0 ? "up" : d < 0 ? "dn" : "same";
      const tag = reasons ? `<span class="tag ${cls}">${arrow} <span class="rsn">${esc(reasons[p.id])}</span></span>` : prev ? `<span class="tag ${cls}">${d > 0 ? "▲ Better off" : d < 0 ? "▼ Worse off" : "— Same"}</span>` : `<span class="tag same">${word(v)}</span>`;
      return `<div class="lane${st.me === p.id ? " me" : ""}"><div class="who">${av(p)}<div>${esc(first(p.n))}${st.me === p.id ? " (you)" : ""}<small>${esc(p.j)}</small></div></div>
        <div class="lights" style="grid-template-columns:repeat(${N},minmax(0,1fr))" role="img" aria-label="${esc(first(p.n))}: ${v} of ${N}, ${word(v)}">${Array.from({ length: N }, (_, k) => `<i class="${k < v ? "on" : ""}" style="${k < v ? `background:${p.col};color:${p.col}` : ""}"></i>`).join("")}</div>${tag}</div>`;
    }).join("");
  }
  function hideBoard() { $("board").hidden = true; $("legend").hidden = true; }
  const app = () => $("app");
  const show = h => { app().innerHTML = h; };
  function chrome(s) {
    $("yr").textContent = s && s.r != null ? R[s.r].yr : s && s.e != null ? E[s.e].yr : s && s.type === "cwintro" ? C.credit.years : s && (s.type === "finalboard" || s.type === "write") ? C.endYear : C.startYear;
    $("stepn").textContent = st.step >= 0 ? "Step " + (st.step + 1) + " of " + TOTAL : "";
  }
  const next = (label) => `<button type="button" class="go" id="nextBtn">${label || "Next →"}</button>`;
  function bindNext() { const b = $("nextBtn"); if (b) b.onclick = () => { st.step++; save(); render(); window.scrollTo(0, 0); }; }

  // ---------- quick check (graded first try; reshuffle + short lock after a miss) ----------
  let lockT = null;
  function check(c, mount, after) {
    const box = $(mount);
    const draw = (msg) => {
      const done = !!st.done[c.id];
      const opts = done ? [c.right].concat(c.wrong) : shuffle([c.right].concat(c.wrong));
      box.innerHTML = `<div class="chk"><p class="q">✔ Quick check: ${c.q}</p><div class="choices">${opts.map(o => `<button type="button" class="ch${done && o === c.right ? " right" : ""}"${done ? " disabled" : ""}>${esc(o)}</button>`).join("")}</div><p class="fb ${done ? "ok" : msg ? "no" : ""}" id="fb_${c.id}" aria-live="polite">${done ? "✓ " + esc(c.why) : msg || ""}</p></div>`;
      if (done) { after(); return; }
      box.querySelectorAll(".ch").forEach(b => b.onclick = () => {
        if (b.textContent === c.right) { st.done[c.id] = true; save(); draw(); return; }
        st.wrong[c.id] = (st.wrong[c.id] || 0) + 1; save();
        box.querySelectorAll(".ch").forEach(x => x.disabled = true);
        let left = TT() ? 0 : LOCK;
        const tick = () => { const f = $("fb_" + c.id); if (f) f.textContent = "Not quite. " + c.hint + (left > 0 ? " Try again in " + left + "…" : ""); };
        tick(); clearInterval(lockT);
        if (!left) { draw("Not quite. " + c.hint + " The choices were mixed up."); return; }
        lockT = setInterval(() => { left--; if (left <= 0) { clearInterval(lockT); draw("Not quite. " + c.hint + " The choices were mixed up. Try again."); } else tick(); }, 1000);
      });
    };
    draw();
  }

  // ---------- screens ----------
  function title() {
    hideBoard();
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    show(`<div class="card"><p class="note" style="margin:0">${esc(C.kicker)}</p><h1>${C.hook}</h1>
      ${C.recap ? `<p class="sub">⏪ ${C.recap}</p>` : ""}
      <div class="steps">${C.how.map(h => `<span>${h}</span>`).join("")}</div>
      <p class="sub"><b>${esc(C.chips)}</b></p>
      <label for="nameBox">Your name (first name + last initial)</label>
      <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go" id="startBtn">Start ▶</button></div>
      <p id="introMsg" class="msg bad" role="status"></p>
      <p class="note">Made-up people. Real events. Standards: ${esc(C.standard.replace(/SS\.9-12\./g, ""))}.</p></div>`);
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("nameBox").focus(); return; }
      try { if (window.classClaimDevice) window.classClaimDevice(fixed); } catch (e) {}
      st = fresh(); st.name = fixed; st.step = 0; save(); render(); window.scrollTo(0, 0);
    };
  }
  function pick() {
    board(levels(0));
    show(`<div class="card"><h2>${esc(C.pickHead)}</h2><p class="ask">Pick your person:</p>
      <div class="btns">${P.map(p => `<button type="button" class="pick${st.me === p.id ? " sel" : ""}" data-id="${p.id}">${av(p)}<div><b>${esc(first(p.n))}</b><span>${esc(p.j)}</span></div></button>`).join("")}</div>
      <p class="note">${esc(C.pickNote)}</p></div>`);
    app().querySelectorAll(".pick").forEach(b => b.onclick = () => {
      if (st.me && st.me !== b.dataset.id && Object.keys(st.moves).length) { st.moves = {}; st.guesses = {}; }
      st.me = b.dataset.id; st.step++; save(); render();
    });
  }
  function news(s) {
    const r = R[s.r]; board(levels(s.r));
    show(`<div class="card"><span class="news">NEWS · ${esc(r.yr)}</span><h2>${esc(r.head)}</h2><p class="sub">${esc(r.sub)}</p>
      <p class="ask">Guess: ${esc(r.ask)} <span class="note">(no wrong answer yet)</span></p>
      <div class="btns">${P.map(p => `<button type="button" class="pick${st.guesses[s.r] === p.id ? " sel" : ""}" data-id="${p.id}">${av(p)}<div><b>${esc(first(p.n))}</b><span>${esc(p.j)}</span></div></button>`).join("")}</div></div>`);
    app().querySelectorAll(".pick").forEach(b => b.onclick = () => { st.guesses[s.r] = b.dataset.id; st.step++; save(); render(); });
  }
  function move(s) {
    const r = R[s.r], me = meP(); board(levels(s.r));
    const ms = r.moves[me.id];
    show(`<div class="card"><span class="news">${esc(r.yr)}</span><h2>Your move, ${esc(first(me.n))}.</h2><p class="ask">${esc(first(me.n))}: ${esc(r.why[me.id])}. What do you do?</p><p class="note" style="margin:-4px 0 8px">Some choices pay off (or come back to bite you) in a later round.</p>
      <div class="btns two">${shuffle(ms.map((m, k) => [m, k])).map(([m, k]) => `<button type="button" class="pick${st.moves[s.r] === k ? " sel" : ""}" data-k="${k}"><div><b>${esc(m.t)}</b><span>${esc(m.s)}</span></div></button>`).join("")}</div></div>`);
    app().querySelectorAll(".pick").forEach(b => b.onclick = () => { st.moves[s.r] = +b.dataset.k; st.step++; save(); render(); });
  }
  function result(s) {
    const r = R[s.r], me = meP(), prev = levels(s.r), lv = levels(s.r + 1);
    const hits = laterHits(s.r), rs = Object.assign({}, r.why), mm = r.moves[me.id][st.moves[s.r] != null ? st.moves[s.r] : 0];
    if ((mm.fx || 0) !== 0 || hits.length) rs[me.id] = (r.why[me.id] + " + your choices").replace(". No change + your choices", " + your choices");
    board(lv, prev, rs);
    const best = P.find(p => p.id === r.best), g = st.guesses[s.r], m = r.moves[me.id][st.moves[s.r] != null ? st.moves[s.r] : 0];
    show(`<div class="card"><p class="verdict ${g === best.id ? "ok" : ""}">${g === best.id ? "✓ You called it! It was " + esc(first(best.n)) + "." : "It was " + esc(first(best.n)) + "! (You guessed " + esc(first((P.find(p => p.id === g) || best).n)) + ".)"} <span class="mvline"><b>Your move:</b> ${esc(m.say)}${cushionHit(s.r) ? " " + esc(r.cushionSay) : ""}${hits.map(h => " <b>From " + esc(h.from) + ":</b> " + esc(h.say)).join("")}</span></p>
      <div class="idea">${r.idea}</div>${next("Quick check →")}</div>`);
    bindNext();
  }
  function rcheck(s) {
    const r = R[s.r], lv = levels(s.r + 1), prev = levels(s.r); hideBoard();
    show(`<div class="card"><span class="news">${esc(r.yr)} · ${esc(r.head)}</span><div class="idea" style="margin-top:8px">${r.idea}</div><div id="chkBox"></div><div id="after"></div></div>`);
    check(CHECKS.find(c => c.id === "r" + s.r), "chkBox", () => { if (!$("nextBtn")) { $("after").innerHTML = next(s.r + 1 < R.length ? "Next year →" : (C.credit ? "Part 2 →" : "Final board →")); bindNext(); } });
  }
  function cwIntro() {
    hideBoard();
    show(`<div class="card"><span class="news">PART 2</span><h2>${esc(C.credit.head)}</h2><p class="sub">${esc(C.credit.sub)}</p>
      <div class="credit">${C.credit.who.map(w => `<div><b>${esc(w.n)}</b><span class="note">${esc(w.j)}</span></div>`).join("")}</div>
      <p class="ask">${esc(C.credit.how)}</p>${next("Start Part 2 →")}</div>`);
    bindNext();
  }
  function cwcheck(s) {
    const e = E[s.e]; hideBoard();
    show(`<div class="card"><span class="news">${esc(e.yr)}</span><h2>${esc(e.head)}</h2><p class="sub">${e.sub}</p><div id="chkBox"></div><div id="after"></div></div>`);
    check(CHECKS.find(c => c.id === "e" + s.e), "chkBox", () => { if (!$("nextBtn")) { $("after").innerHTML = next(s.e + 1 < E.length ? "Next →" : "Final board →"); bindNext(); } });
  }
  function credits() { const t = {}; C.credit.who.forEach(w => t[w.id] = 0); Object.values(st.votes).forEach(v => { if (t[v] != null) t[v]++; }); return t; }
  function cw(s) {
    const e = E[s.e]; hideBoard();
    const voted = st.votes[s.e];
    const t = credits();
    show(`<div class="card"><span class="news">NEWS · ${esc(e.yr)}</span><h2>${esc(e.head)}</h2><p class="sub">${e.sub}</p>
      <p class="ask">Who gets the most credit for THIS? <span class="note">(your call, no wrong answer)</span></p>
      <div class="btns three">${C.credit.who.map(w => `<button type="button" class="pick${voted === w.id ? " sel" : ""}" data-id="${w.id}"><div><b>${esc(w.n)}</b><span>${"★".repeat(t[w.id]) || "No stars yet"}</span></div></button>`).join("")}</div>
      <div id="cwAfter"></div></div>`);
    const after = () => {
      $("cwAfter").innerHTML = `<div class="say2" style="margin-top:8px">${e.says.map(x => `<div><b>${esc(x[0])}:</b> ${esc(x[1])}</div>`).join("")}</div><div id="chkBox"></div><div id="after"></div>`;
      check(CHECKS.find(c => c.id === "e" + s.e), "chkBox", () => { if (!$("nextBtn")) { $("after").innerHTML = next(s.e + 1 < E.length ? "Next →" : "Final board →"); bindNext(); } });
    };
    app().querySelectorAll(".pick").forEach(b => b.onclick = () => { st.votes[s.e] = b.dataset.id; save(); cw(s); });
    if (voted) after();
  }
  function finalBoard() {
    const lv = levels(R.length), start = levels(0), rs = {};
    P.forEach(p => { const d = lv[p.id] - start[p.id]; rs[p.id] = (d > 0 ? "Up " + d : d < 0 ? "Down " + (-d) : "Back where they started") + " · now " + word(lv[p.id]); });
    board(lv, start, rs);
    const t = C.credit ? credits() : null;
    show(`<div class="card"><h2>${esc(C.finalHead)}</h2>
      ${t ? `<p style="margin:0 0 6px"><b>Your Cold War credit stars:</b> ${C.credit.who.map(w => esc(w.n) + " " + ("★".repeat(t[w.id]) || "0")).join(" · ")}</p>` : ""}
      <div class="idea">${C.finalIdea}</div>${next("Last step: write it up →")}</div>`);
    bindNext();
  }
  function writeProblem(p, v, box) {
    if (TT()) return "";
    if (window.classJunkStop && box) { const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" }); if (junk) return junk; }
    if (v.length < p.min) return "Write a little more (1–2 full sentences).";
    if (/_{2,}/.test(v)) return "Fill in the blanks (___) with your own words.";
    if (/\(\s*did\s*\/\s*did not\s*\)/i.test(v)) return "Pick one: did OR did not. Delete the other.";
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshWords.size < p.newWords) return "Add more of your own ideas. Use details from the game.";
    const has = w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v) + " ");
    if (p.mustAll.some(g => !g.some(has))) return p.mustMsg;
    return "";
  }
  function write(s) {
    hideBoard();
    const p = C.prompts[s.k], last = s.k === C.prompts.length - 1, sent = st.turnedIn;
    show(`<div class="card"><span class="news">LAST STEP${C.prompts.length > 1 ? " · " + (s.k + 1) + " OF " + C.prompts.length : ""}</span>
      ${p.id === "credit" && C.credit ? (() => { const t = credits(), srt = C.credit.who.slice().sort((a, b) => t[b.id] - t[a.id]), tie = t[srt[0].id] === t[srt[1].id]; return `<p class="sub">⭐ ${tie ? "Your stars are split" : "Your stars went mostly to <b>" + esc(srt[0].n) + "</b>"} (${C.credit.who.map(w => esc(w.n) + " " + t[w.id]).join(" · ")}). Back up your pick, or change your mind.</p>`; })() : ""}
      <div class="write"><p class="prompt" style="font-size:1.15rem">${esc(p.label)}</p><p class="stem">Start like this: <i>${esc(p.stem)}</i> <button type="button" class="mini" id="stemBtn">Use the sentence starter</button></p>
      <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea></div>
      ${last ? `<button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Turn in ▶"}</button>` : `<button type="button" class="go" id="wNext">Next →</button>`}
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${last && sent ? "✓ Turned in. You can fix your answers and turn in again." : ""}</p></div>`);
    const box = $("w_" + p.id);
    box.addEventListener("input", () => { st.writing[p.id] = box.value; save(); });
    $("stemBtn").onclick = () => { if (!box.value.trim()) { box.value = p.stem; st.writing[p.id] = box.value; save(); } box.focus(); const i = box.value.indexOf("___"); if (i >= 0) box.setSelectionRange(i, i + 3); };
    if (!last) $("wNext").onclick = () => { const bad = writeProblem(p, (box.value || "").trim(), box); if (bad) { $("sendMsg").textContent = bad; $("sendMsg").className = "msg bad"; box.focus(); return; } st.step++; save(); render(); };
    else $("sendBtn").onclick = send;
  }

  const plain = s => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  async function send() {
    const msg = $("sendMsg");
    const notDone = CHECKS.find(c => !st.done[c.id]);
    if (notDone && !TT()) { msg.textContent = "Finish every quick check first (use Back to find it)."; msg.className = "msg bad"; return; }
    for (const p of C.prompts) {
      const box = $("w_" + p.id), v = ((box ? box.value : st.writing[p.id]) || "").trim();
      const bad = writeProblem(p, v, box);
      if (bad) { msg.textContent = (C.prompts.length > 1 ? "Answer " + (C.prompts.indexOf(p) + 1) + ": " : "") + bad; msg.className = "msg bad"; if (box) box.focus(); return; }
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }
    const me = meP(), lv = levels(R.length), start = levels(0);
    const answers = { "Standard": C.standard };
    answers["First-try correct"] = CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    C.prompts.forEach(p => { const box = $("w_" + p.id); answers[(p.std ? p.std + " · " : "") + "Writing: " + p.short] = ((box ? box.value : st.writing[p.id]) || "").trim(); });
    CHECKS.forEach(c => { const w = st.wrong[c.id]; answers[c.std + " · " + c.short] = c.right + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    answers["Played as"] = first(me.n) + " (" + me.j + ")";
    answers["Guesses (not graded)"] = R.filter((r, i) => st.guesses[i] === r.best).length + " of " + R.length + " right · " + R.map((r, i) => r.yr + ": " + (P.find(p => p.id === st.guesses[i]) ? first(P.find(p => p.id === st.guesses[i]).n) : "-")).join(" | ");
    answers["Moves"] = R.map((r, i) => r.yr + ": " + (st.moves[i] != null ? r.moves[me.id][st.moves[i]].t : "-")).join(" | ");
    answers["Final board"] = P.map(p => first(p.n) + " " + start[p.id] + "→" + lv[p.id]).join(" · ");
    if (C.credit) { const t = credits(); answers["Cold War credit votes"] = C.credit.who.map(w => w.n + " " + t[w.id]).join(" · "); }
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: C.assignmentId, assignmentTitle: C.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work."; msg.className = "msg good";
      $("sendBtn").textContent = "✓ Turned in";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------- router ----------
  let firstRender = true;
  function render() {
    if (!firstRender && $("welcome")) $("welcome").hidden = true;
    firstRender = false; clearInterval(lockT);
    if (st.step < 0) { chrome(null); return title(); }
    if (st.step > 0 && !st.me) st.step = 0;
    const s = STEPS[Math.min(st.step, TOTAL - 1)];
    chrome(s);
    if (s.type === "pick") return pick();
    if (s.type === "news") return news(s);
    if (s.type === "move") return move(s);
    if (s.type === "result") return result(s);
    if (s.type === "rcheck") return rcheck(s);
    if (s.type === "cwcheck") return cwcheck(s);
    if (s.type === "cwintro") return cwIntro();
    if (s.type === "cw") return cw(s);
    if (s.type === "finalboard") return finalBoard();
    return write(s);
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; st.step = name ? 0 : -1; save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0 && st.name) {
    const w = $("welcome");
    w.innerHTML = `<span>👋 Welcome back, ${esc(st.name)}! You're on step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}.</span>`;
    const notMe = document.createElement("button"); notMe.type = "button"; notMe.textContent = "Not " + st.name + "? Start fresh";
    notMe.onclick = () => { try { localStorage.removeItem(C.key); localStorage.removeItem("site-student-name"); } catch (e) {} st = fresh(); save(); location.reload(); };
    w.appendChild(notMe); w.hidden = false;
  }
  render();

  // ---------- Test T. skip bar (shared/turnin.js) ----------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => STEPS[i].short,
      go: i => {
        if (!st.name) st.name = "Test T.";
        if (!st.me) st.me = P[0].id;
        R.forEach((r, k) => { if (st.guesses[k] == null) st.guesses[k] = r.best; if (st.moves[k] == null) st.moves[k] = 0; });
        E.forEach((e, k) => { if (st.votes[k] == null) st.votes[k] = C.credit.who[0].id; });
        st.step = i; save(); render();
      },
      solve: () => {
        const s = STEPS[Math.min(st.step, TOTAL - 1)]; if (!s) return;
        if (s.type === "pick" && !st.me) { st.me = P[0].id; st.step++; }
        else if (s.type === "news" && st.guesses[s.r] == null) { st.guesses[s.r] = R[s.r].best; st.step++; }
        else if (s.type === "move" && st.moves[s.r] == null) { st.moves[s.r] = 0; st.step++; }
        else if (s.type === "rcheck") st.done["r" + s.r] = true;
        else if (s.type === "cw") { if (st.votes[s.e] == null) st.votes[s.e] = C.credit.who[0].id; st.done["e" + s.e] = true; }
        save(); render();
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
