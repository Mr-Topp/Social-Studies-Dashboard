// =====================================================================
//  UNIT SHOWDOWN · World History Unit 1 review (Days 12–13, replaces the Jojo Rabbit days)
//  Fynn 11-14: "my kind of review, not a gross packet or worksheet" → picked Unit Showdown;
//  "use the summative as the guide" → 8 rounds = the 8 parts of the Unit 1 test (Form A);
//  "they have two whole periods" (80–90 min blocks) → ONE game that runs across both days.
//  Content: rounds.js. Each round: 🎲 Bet → 📸 Source Snap → 🧩 Build It → 🔎 Second Source
//  → 🛠️ Fix It (catch the mistake in a sample Explain It) → ⚡ Lightning (3) → results/power move.
//  ✍️ Halftime Explain It after Round 4 (turn-in #1 = Day 12) and Final Explain It after Round 8
//  (turn-in #2 = Day 13). Students keep going at their own pace across both days.
//  Points only on the first try; wrong answers lock and reshuffle. Class Race via shared/arena.js
//  (computer rivals when offline). Turn-in: shared/turnin.js. Test T. can skip everything.
// =====================================================================
(function () {
  "use strict";
  const R = window.SHOWDOWN_ROUNDS;
  const KEY = "wh-u1-showdown-v2";
  const ARENA = "wh-u1-showdown";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const HALVES = {
    1: { id: "wh-u1-d12-showdown", title: "World History · Unit 1 · Day 12 · Unit Showdown: Halftime (Rounds 1–4: WH.24, 25, 27, 29)", from: 0, to: 4, name: "Halftime" },
    2: { id: "wh-u1-d13-showdown", title: "World History · Unit 1 · Day 13 · Unit Showdown: Final (Rounds 5–8: WH.30, 31, 32, 33)", from: 4, to: 8, name: "Final" }
  };
  const LOCK = 5, LIGHT_LOCK = 3, LIGHT_PTS = 50, WRITE_PTS = 250, BANK_PTS = 100, STEAL_PTS = 150;
  const BETS = {
    safe: { icon: "🛡️", name: "Play it safe", win: 100, lose: 0, line: "+100 per first-try answer. No risk." },
    bold: { icon: "🔥", name: "Go bold", win: 200, lose: 100, line: "+200 per first-try answer. −100 per miss." },
    allin: { icon: "💣", name: "All in", win: 300, lose: 200, line: "+300 per first-try answer. −200 per miss." }
  };
  const BETCHECKS = ["s", "b", "t", "f"];   // snap, build, second source, fix
  const CHECKNAME = { s: "📸 Source Snap", b: "🧩 Build It", t: "🔎 Second Source", f: "🛠️ Fix It" };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const TT = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };
  const plain = s => String(s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

  // ---------------- Screens ----------------
  const SCR = [];
  R.forEach((r, i) => {
    ["bet", "snap", "build", "snap2", "fix", "light", "result"].forEach(k => SCR.push({ k, r: i }));
    if (i === 3) SCR.push({ k: "write", h: 1 });
  });
  SCR.push({ k: "write", h: 2 }, { k: "done" });
  const firstOfRound = i => SCR.findIndex(s => s.r === i);

  const fresh = () => ({ v: 2, name: "", step: -1, score: 0, bets: {}, miss: {}, done: {}, power: {}, pick: {}, writing: {}, turnedIn: {}, lockUntil: 0, bots: null, skipped1: false, fixPhase: {} });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 2) st = fresh();
  try {
    const nowName = localStorage.getItem("site-student-name") || "";
    const short = window.classShortName || (x => x);
    if (st.name && nowName && short(st.name).toLowerCase() !== short(nowName).toLowerCase()) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const app = $("app");

  // ---------------- Class race ----------------
  let live = [];
  const BOTNAMES = ["Bot Ironclad", "Bot Zeppelin", "Bot Telegraph"];
  function bots() { if (!st.bots) st.bots = BOTNAMES.map(n => ({ name: n, s: 0 })); return st.bots; }
  const others = () => (window.Arena && Arena.live) ? live.filter(p => !p.me && p.name !== st.name) : [];
  function board() {
    const lo = others(), isLive = lo.length > 0;
    const rows = (isLive ? lo.map(p => ({ name: p.name, s: Number(p.score) || 0 })) : bots().map(b => ({ name: b.name, s: b.s })))
      .concat([{ name: "You", s: st.score, me: true }]).sort((a, b) => b.s - a.s);
    return { rows, isLive };
  }
  function leader() { const b = board(); const top = b.rows.find(r => !r.me); return top ? Object.assign({ isLive: b.isLive }, top) : null; }
  function paintRace() {
    const el = $("race"); if (!el) return;
    if (st.step < 0) { el.hidden = true; $("wrap").classList.add("notrace"); return; }
    el.hidden = false; $("wrap").classList.remove("notrace");
    const b = board();
    el.innerHTML = `<div class="rt">🏁 Class race <span class="tag ${b.isLive ? "live" : ""}">${b.isLive ? "LIVE" : "vs. bots"}</span></div><ol>${b.rows.slice(0, 6).map((r, i) => `<li class="${r.me ? "me" : ""}"><span class="n">${i + 1}</span><span class="nm">${esc(r.name)}</span><span class="sc">${r.s.toLocaleString()}</span></li>`).join("")}</ol>`;
  }
  function botsMove(scale) { if (others().length) return; bots().forEach((b, i) => { b.s += Math.round([150, 190, 120][i] * scale * (0.4 + Math.random())); }); }
  function push() { if (window.Arena && Arena.live) Arena.update({ score: st.score, stage: stageName() }); }
  function startArena() {
    if (!window.Arena || startArena.on) return; startArena.on = true;
    Arena.join({
      game: ARENA, name: st.name,
      onBoard(players) { live = players; paintRace(); },
      onEvent(ev) {
        if (ev && ev.kind === "steal") {
          const amt = Math.max(0, Math.min(st.score, Number(ev.data && ev.data.amount) || 0));
          st.score -= amt; save(); hud();
          toast(`⚡ ${ev.from} stole ${amt} points from you! Win them back.`, "bad");
        }
      }
    });
    setTimeout(push, 800);
  }

  // ---------------- HUD ----------------
  function stageName() { const s = SCR[st.step]; return !s ? "" : s.r != null ? "Round " + (s.r + 1) : s.k === "write" ? HALVES[s.h].name + " Explain It" : "Finished"; }
  const roundDone = i => BETCHECKS.every(c => st.done[i + c]);
  const roundPerfect = i => BETCHECKS.every(c => st.done[i + c] && !st.miss[i + c]);
  function hud() {
    const h = $("hud"); if (!h) return;
    h.hidden = st.step < 0;
    $("score").textContent = st.score.toLocaleString();
    const s = SCR[st.step] || {};
    const dot = i => `<span class="${roundDone(i) ? (roundPerfect(i) ? "dot perfect" : "dot done") : (s.r === i ? "dot on" : "dot")}" title="Round ${i + 1}: ${esc(R[i].title)}">${i + 1}</span>`;
    const wdot = hh => `<span class="dot fin ${st.turnedIn[hh] ? "done" : ""} ${s.k === "write" && s.h === hh ? "on" : ""}" title="${HALVES[hh].name} Explain It">✍️</span>`;
    $("dots").innerHTML = [0, 1, 2, 3].map(dot).join("") + wdot(1) + `<span class="dsep" aria-hidden="true"></span>` + [4, 5, 6, 7].map(dot).join("") + wdot(2);
    const b = s.r != null && st.bets[s.r] ? BETS[st.bets[s.r]] : null;
    $("betChip").textContent = b ? b.icon + " " + b.name : "";
    $("betChip").hidden = !b;
    $("stepTxt").textContent = s.r != null ? `Round ${s.r + 1} of 8 · ${R[s.r].std}` : s.k === "write" ? HALVES[s.h].name + " Explain It" : s.k === "done" ? "Done" : "";
    paintRace();
  }
  function pop(txt, cls) {
    const host = $("scoreBox"); if (!host) return;
    const p = document.createElement("span"); p.className = "pop " + (cls || "good"); p.textContent = txt;
    host.appendChild(p); setTimeout(() => p.remove(), 1900);
    host.classList.remove("bump"); void host.offsetWidth; host.classList.add("bump");
  }
  function toast(m, cls) { const t = $("toast"); t.textContent = m; t.className = "toast show " + (cls || ""); clearTimeout(toast.t); toast.t = setTimeout(() => t.className = "toast", 3600); }
  function addPts(n) { if (!n) return; st.score += n; pop((n > 0 ? "+" : "−") + Math.abs(n), n > 0 ? "good" : "bad"); push(); }
  const next = () => { st.step++; save(); render(); window.scrollTo(0, 0); };

  // ---------------- Pieces ----------------
  function shell(top, body, cls) { app.innerHTML = `<section class="card ${cls || ""}">${top}<div class="body">${body}</div></section>`; }
  function roundTop(i, label) {
    const r = R[i];
    return `<div class="rtop ${r.serious ? "serious" : ""}"><span class="ricon" aria-hidden="true">${r.icon}</span><div><p class="kick">Round ${i + 1} of 8 · ${esc(r.std)} · Test Part ${r.part}${label ? " · " + label : ""}</p><h2>${esc(r.title)}</h2></div></div>`;
  }
  function source(img, alt, cite, quote) {
    return `<figure class="src"><a href="${esc(img)}" target="_blank" rel="noopener" title="Open full size"><img src="${esc(img)}" alt="${esc(alt)}"></a>${quote ? `<blockquote>${esc(quote)}</blockquote>` : ""}<figcaption>${cite} <span class="zoom">🔍 Tap the picture to open it full size</span></figcaption></figure>`;
  }
  const nextBtn = (label) => `<button type="button" class="go" id="nextBtn">${label} →</button>`;
  function wire() { const b = $("nextBtn"); if (b) b.onclick = next; }
  const locked = () => !TT() && Date.now() < (st.lockUntil || 0);

  function miss(id, r, isLight) {
    st.miss[id] = (st.miss[id] || 0) + 1;
    if (st.miss[id] === 1) {
      if (!isLight) { const b = BETS[st.bets[r] || "safe"]; if (b.lose) addPts(-b.lose); }
      try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    }
    st.lockUntil = Date.now() + (TT() ? 0 : (isLight ? LIGHT_LOCK : LOCK) * 1000); save(); hud();
  }
  function lockMsg(fb, hint, redraw) {
    const tick = () => {
      const left = Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000);
      if (left <= 0 || TT()) { fb.className = "fb try"; fb.innerHTML = "Not quite. " + hint + " Try again."; redraw(); return; }
      fb.className = "fb try"; fb.innerHTML = "Not quite. " + hint + ` <span class="cd">Mixing up… ${left}</span>`;
      setTimeout(tick, 250);
    };
    tick();
  }
  function right(id, r, isLight) {
    if (st.done[id]) return;
    st.done[id] = true;
    if (!st.miss[id]) addPts(isLight ? LIGHT_PTS : BETS[st.bets[r] || "safe"].win);
    try { window.classFirstTry && window.classFirstTry.right(id); } catch (e) {}
    botsMove(isLight ? 0.3 : 1); save(); hud();
  }
  // Multiple-choice block used by Snap, Second Source, and Lightning.
  function mc(box, fb, id, r, options, hint, onDone, isLight) {
    function draw() {
      if (st.done[id]) return onDone();
      box.innerHTML = shuffle(options.map((t, n) => ({ t, n }))).map(o => `<button type="button" class="opt" data-n="${o.n}">${esc(o.t)}</button>`).join("");
      box.querySelectorAll(".opt").forEach(b => {
        b.disabled = locked();
        b.onclick = () => {
          if (locked()) return;
          if (b.dataset.n === "0") { right(id, r, isLight); onDone(); }
          else { box.querySelectorAll(".opt").forEach(x => x.disabled = true); miss(id, r, isLight); lockMsg(fb, hint, draw); }
        };
      });
    }
    if (locked() && !st.done[id]) { box.innerHTML = ""; lockMsg(fb, hint, draw); } else draw();
  }

  // ---------------- Title ----------------
  function title() {
    const signed = (() => { try { return window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : ""; } catch (e) { return ""; } })();
    const nm = st.name || signed || "";
    app.innerHTML = `<section class="card title">
      <div class="marquee"><p class="tk">World History · Unit 1 Review · Days 12–13</p><h1>UNIT SHOWDOWN</h1><p class="tsub">Empires → World Wars → Peace</p></div>
      <p class="hook">Thursday's test has 8 parts. This Showdown has 8 rounds, one for each part. Your class is racing you.</p>
      <div class="plan">
        <div><b>🎲 Bet</b><span>How sure are you?</span></div>
        <div><b>📸 Sources</b><span>Read real sources from the unit.</span></div>
        <div><b>🧩 Build</b><span>Sort or order the evidence.</span></div>
        <div><b>🛠️ Fix It</b><span>Catch the mistake in a test answer.</span></div>
        <div><b>⚡ Lightning</b><span>3 quick bonus questions.</span></div>
      </div>
      <p class="what">Rounds 1–4 today, then a ✍️ Halftime Explain It (turn in). Rounds 5–8 next class, then a ✍️ Final Explain It (turn in). Your progress saves on this Chromebook.</p>
      <p class="goal">🎯 <b>Goal:</b> show you're ready for all 8 parts of the Unit 1 test.</p>
      <p class="rules">Points only count on your <b>first try</b>. Wrong answers lock for a few seconds and mix up. Guessing costs you.</p>
      <div class="startrow"><label for="nameBox">Your name</label><input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(nm)}"><button type="button" class="go big" id="startBtn">Enter the Showdown →</button></div>
      <p id="introMsg" class="msg" role="status"></p>
      <p class="skip2"><button type="button" class="light small" id="start5">Already turned in Halftime on a different Chromebook? Start at Round 5</button></p></section>`;
    const go = (to) => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = to; if (to > 0) st.skipped1 = true; save(); startArena(); render(); window.scrollTo(0, 0);
    };
    $("startBtn").onclick = () => go(0);
    $("start5").onclick = () => { if (confirm("Start at Round 5? Only do this if you already turned in the Halftime Explain It on another Chromebook.")) go(firstOfRound(4)); };
  }

  // ---------------- Round screens ----------------
  function bet(i) {
    const r = R[i];
    const cards = Object.keys(BETS).map(k => { const b = BETS[k]; return `<button type="button" class="betcard ${k}" data-k="${k}"><span class="bi" aria-hidden="true">${b.icon}</span><b>${b.name}</b><span>${b.line}</span></button>`; }).join("");
    shell(roundTop(i, "Place your bet"),
      `<p class="ican">🎯 ${esc(r.ican)}</p>
       <p class="betq"><b>How sure are you on this topic?</b> Your bet counts on 4 challenges: two sources, Build It, and Fix It. Bet big if you know it. Play safe if you don't.</p>
       <div class="bets">${cards}</div>`, "betscreen");
    app.querySelectorAll(".betcard").forEach(b => b.onclick = () => { st.bets[i] = b.dataset.k; next(); });
  }

  function snapLike(i, s, id, tag, nextLabel) {
    const left = s.img ? source(s.img, s.alt, s.cite, s.quote) : `<div class="file">${s.file}</div>`;
    shell(roundTop(i, tag),
      `<div class="split">${left}<div class="qside"><p class="qtag">${tag} · use the source</p><h3>${s.ask}</h3><div class="opts" id="opts"></div><p class="fb" id="fb" aria-live="polite"></p><div id="after"></div></div></div>`);
    const fb = $("fb"), box = $("opts");
    mc(box, fb, id, i, s.options, s.hint, () => {
      box.innerHTML = `<p class="answered">✓ ${esc(s.options[0])}</p>`;
      fb.className = "fb good"; fb.innerHTML = "✓ " + s.why;
      $("after").innerHTML = nextBtn(nextLabel); wire();
    });
  }

  function build(i) {
    const r = R[i], b = r.build, id = i + "b";
    const head = b.img ? source(b.img, b.imgAlt, b.imgCite) : "";
    shell(roundTop(i, "🧩 Build It"),
      `<div class="${b.img ? "split" : ""}">${head}<div class="qside"><p class="qtag">🧩 Build It${b.type === "order" ? " · put it in order" : " · tap a label for each row"}</p><h3>${esc(b.ask)}</h3><div id="rows"></div><p class="fb" id="fb" aria-live="polite"></p><div id="after"></div></div></div>`);
    const fb = $("fb"), rows = $("rows");
    function done() {
      if (b.type === "order") rows.innerHTML = `<ol class="chain done">${b.rows.map(x => `<li><span aria-hidden="true">${x.icon}</span> ${esc(x.t)}</li>`).join("")}</ol>`;
      else rows.innerHTML = b.rows.map(x => `<div class="row done"><span class="ri" aria-hidden="true">${x.icon}</span><p>${esc(x.t)}</p><span class="lab">${esc(x.a)}</span></div>`).join("");
      fb.className = "fb good"; fb.innerHTML = "✓ " + b.why;
      $("after").innerHTML = nextBtn("Next: 🔎 Second Source"); wire();
    }
    function drawSort() {
      if (st.done[id]) return done();
      const picks = {};
      const labs = shuffle(b.labels);
      rows.innerHTML = b.rows.map((x, n) => `<div class="row" data-n="${n}"><span class="ri" aria-hidden="true">${x.icon}</span><p>${esc(x.t)}</p><div class="chips">${labs.map(l => `<button type="button" class="chip" data-l="${esc(l)}">${esc(l)}</button>`).join("")}</div></div>`).join("") +
        `<button type="button" class="go" id="checkBtn" disabled>Check my answers</button>`;
      rows.querySelectorAll(".row").forEach(rw => rw.querySelectorAll(".chip").forEach(c => c.onclick = () => {
        if (locked()) return;
        picks[rw.dataset.n] = c.dataset.l;
        rw.querySelectorAll(".chip").forEach(x => x.classList.toggle("on", x === c));
        rw.classList.add("picked");
        $("checkBtn").disabled = Object.keys(picks).length < b.rows.length;
      }));
      $("checkBtn").onclick = () => {
        if (locked()) return;
        const wrong = b.rows.filter((x, n) => picks[n] !== x.a).length;
        if (!wrong) { right(id, i); done(); return; }
        rows.querySelectorAll("button").forEach(x => x.disabled = true);
        miss(id, i); lockMsg(fb, `${wrong} of ${b.rows.length} ${wrong === 1 ? "row is" : "rows are"} off. ${b.hint}`, drawSort);
      };
    }
    function drawOrder() {
      if (st.done[id]) return done();
      const built = [];
      const mixed = shuffle(b.rows.map((x, n) => ({ x, n })));
      function paint() {
        rows.innerHTML = `<ol class="chain">${built.map(n => `<li><span aria-hidden="true">${b.rows[n].icon}</span> ${esc(b.rows[n].t)}</li>`).join("")}${built.length < b.rows.length ? `<li class="slot">Tap event #${built.length + 1}…</li>` : ""}</ol>
          <div class="pool">${mixed.filter(o => !built.includes(o.n)).map(o => `<button type="button" class="opt ev" data-n="${o.n}"><span aria-hidden="true">${o.x.icon}</span> ${esc(o.x.t)}</button>`).join("")}</div>`;
        rows.querySelectorAll(".ev").forEach(btn => {
          btn.disabled = locked();
          btn.onclick = () => {
            if (locked()) return;
            const n = +btn.dataset.n;
            if (n === built.length) { built.push(n); if (built.length === b.rows.length) { right(id, i); done(); } else paint(); }
            else { rows.querySelectorAll("button").forEach(x => x.disabled = true); miss(id, i); lockMsg(fb, "That's not next. " + b.hint + " The chain starts over.", drawOrder); }
          };
        });
      }
      paint();
    }
    const draw = b.type === "order" ? drawOrder : drawSort;
    if (locked() && !st.done[id]) lockMsg(fb, b.hint, draw); else draw();
  }

  function fix(i) {
    const r = R[i], f = r.fix, id = i + "f";
    shell(roundTop(i, "🛠️ Fix It"),
      `<p class="qtag">🛠️ Fix It · be the teacher</p>
       <h3>${esc(f.intro)} <b>One sentence has a mistake.</b> Tap it.</h3>
       <div class="paper" id="paper"></div>
       <div id="fixArea"></div><p class="fb" id="fb" aria-live="polite"></p><div id="after"></div>`, "fixscreen");
    const fb = $("fb"), paper = $("paper"), area = $("fixArea");
    const phase = () => st.fixPhase[i] || 1;
    function done() {
      paper.innerHTML = f.lines.map((t, n) => n === f.wrong ? `<p class="ln fixed"><s>${esc(t)}</s><br><b>✓ ${esc(f.fixes[0])}</b></p>` : `<p class="ln">${esc(t)}</p>`).join("");
      area.innerHTML = ""; fb.className = "fb good"; fb.innerHTML = "✓ " + f.why;
      $("after").innerHTML = nextBtn("Next: ⚡ Lightning bonus"); wire();
    }
    function draw() {
      if (st.done[id]) return done();
      if (phase() === 1) {
        area.innerHTML = "";
        paper.innerHTML = f.lines.map((t, n) => `<button type="button" class="ln pick" data-n="${n}">${esc(t)}</button>`).join("");
        paper.querySelectorAll(".pick").forEach(b => {
          b.disabled = locked();
          b.onclick = () => {
            if (locked()) return;
            if (+b.dataset.n === f.wrong) { st.fixPhase[i] = 2; save(); fb.className = "fb"; fb.textContent = ""; draw(); }
            else { paper.querySelectorAll("button").forEach(x => x.disabled = true); miss(id, i); lockMsg(fb, "That sentence is fine. " + f.hint, draw); }
          };
        });
      } else {
        paper.innerHTML = f.lines.map((t, n) => n === f.wrong ? `<p class="ln bad">✗ ${esc(t)}</p>` : `<p class="ln">${esc(t)}</p>`).join("");
        area.innerHTML = `<p class="step2"><b>Found it!</b> Now pick the sentence that fixes it.</p><div class="opts" id="opts"></div>`;
        const box = $("opts");
        box.innerHTML = shuffle(f.fixes.map((t, n) => ({ t, n }))).map(o => `<button type="button" class="opt" data-n="${o.n}">${esc(o.t)}</button>`).join("");
        box.querySelectorAll(".opt").forEach(b => {
          b.disabled = locked();
          b.onclick = () => {
            if (locked()) return;
            if (b.dataset.n === "0") { right(id, i); done(); }
            else { box.querySelectorAll(".opt").forEach(x => x.disabled = true); miss(id, i); lockMsg(fb, "That's still not right. " + f.hint, draw); }
          };
        });
      }
    }
    if (locked() && !st.done[id]) lockMsg(fb, f.hint, draw); else draw();
  }

  function light(i) {
    const r = R[i], L = r.lightning;
    const k = L.findIndex((q, n) => !st.done[i + "l" + n]);
    shell(roundTop(i, "⚡ Lightning"),
      `<div class="lightning"><p class="qtag">⚡ Lightning bonus · +${LIGHT_PTS} each on the first try</p>
       <div class="lnum">${L.map((q, n) => `<span class="${st.done[i + "l" + n] ? "ok" : n === k ? "on" : ""}">${n + 1}</span>`).join("")}</div>
       ${k < 0 ? `<p class="answered">⚡ Lightning done!</p>` : `<h3>${esc(L[k].q)}</h3><div class="opts" id="opts"></div>`}
       <p class="fb" id="fb" aria-live="polite"></p><div id="after"></div></div>`, "lightscreen");
    if (k < 0) { $("after").innerHTML = nextBtn("See round " + (i + 1) + " results"); wire(); return; }
    mc($("opts"), $("fb"), i + "l" + k, i, L[k].options, "Think about what you learned in this round.", () => { setTimeout(() => light(i), TT() ? 0 : 450); }, true);
  }

  function result(i) {
    const r = R[i], perfect = roundPerfect(i), bt = BETS[st.bets[i] || "safe"];
    const line = c => {
      const m = st.miss[i + c] || 0;
      return `<li class="${m ? "miss" : "hit"}"><span>${CHECKNAME[c]}</span><b>${m ? "✗ missed first try" + (bt.lose ? " (−" + bt.lose + ")" : "") : "✓ first try (+" + bt.win + ")"}</b></li>`;
    };
    const lightN = r.lightning.filter((q, n) => !st.miss[i + "l" + n]).length;
    const L = leader();
    const powerBox = !perfect ? `<p class="nopower">Get all 4 challenges right on the first try to earn a power move.</p>` :
      st.power[i] ? `<p class="powered">${st.power[i] === "steal" ? "⚡ You stole " + STEAL_PTS + " points!" : "💰 You banked +" + BANK_PTS + "."}</p>` :
      `<div class="power"><p><b>Perfect round! Pick a power move:</b></p><div class="pw">
         <button type="button" class="pcard" data-p="steal"><span aria-hidden="true">⚡</span><b>Steal ${STEAL_PTS}</b><span>Take them from the leader${L ? ": " + esc(L.name) : ""}.</span></button>
         <button type="button" class="pcard" data-p="bank"><span aria-hidden="true">💰</span><b>Bank +${BANK_PTS}</b><span>Safe points. No drama.</span></button></div></div>`;
    const nxt = SCR[st.step + 1];
    const label = nxt.k === "write" ? `✍️ ${HALVES[nxt.h].name} Explain It` : `Round ${i + 2}: ${esc(R[i + 1].title)}`;
    shell(roundTop(i, "Results"),
      `<div class="res ${perfect ? "perfect" : ""}"><p class="big">${perfect ? "🔥 PERFECT ROUND" : "Round " + (i + 1) + " done"}</p>
        <p class="betline">You bet <b>${bt.icon} ${bt.name}</b>.</p>
        <ul class="tally">${BETCHECKS.map(line).join("")}<li class="hit"><span>⚡ Lightning</span><b>${lightN} of 3 first try</b></li></ul>
        <div class="remember"><b>Remember for Test Part ${r.part}:</b> ${r.build.why}</div>
        ${powerBox}</div>
        <div id="after">${(!perfect || st.power[i]) ? nextBtn(label) : ""}</div>`);
    app.querySelectorAll(".pcard").forEach(b => b.onclick = () => {
      const p = b.dataset.p; st.power[i] = p;
      if (p === "bank") addPts(BANK_PTS);
      else {
        const L2 = leader();
        if (L2 && L2.isLive && window.Arena) Arena.send(L2.name, "steal", { amount: STEAL_PTS });
        else if (L2) { const bot = bots().find(x => x.name === L2.name); if (bot) bot.s = Math.max(0, bot.s - STEAL_PTS); }
        if (L2) toast(`⚡ You stole ${STEAL_PTS} from ${L2.name}!`);
        addPts(STEAL_PTS);
      }
      save(); render();
    });
    wire();
  }

  // ---------------- Explain It (halftime + final) ----------------
  function write(h) {
    const H = HALVES[h], list = R.slice(H.from, H.to), pick = st.pick[h];
    const r = pick != null ? R[pick] : null;
    const choices = list.map((x, n) => { const idx = H.from + n; return `<button type="button" class="topic ${pick === idx ? "on" : ""}" data-n="${idx}"><span aria-hidden="true">${x.icon}</span><b>${esc(x.std)}</b> ${esc(x.title)}</button>`; }).join("");
    const after = st.turnedIn[h] ? (h === 1 ? nextBtn("Keep going: Round 5") : nextBtn("See the final standings")) : "";
    app.innerHTML = `<section class="card final"><div class="rtop"><span class="ricon" aria-hidden="true">✍️</span><div><p class="kick">${H.name} Explain It · +${WRITE_PTS} points · just like the test</p><h2>Pick ONE topic. Explain it.</h2></div></div>
      <div class="body"><p class="ican">Every part of Thursday's test ends with one Explain It (8 points). Practice one now. Pick a topic you want to get better at.</p>
      <div class="topics">${choices}</div>
      ${r ? `<label for="wbox" class="wlab">${esc(r.write.label)}</label>
      <p class="stem">Start with: <b>“${esc(r.write.stem)}”</b></p>
      <textarea id="wbox" rows="5" placeholder="Use the starter, then add one real fact from the unit…">${esc(st.writing[h] || "")}</textarea>
      <p class="tip">A strong answer = the starter + a real fact (a name, place, date, or event) + <b>because…</b> to explain why it matters.</p>
      <button type="button" class="go big" id="sendBtn">${st.turnedIn[h] ? "Turn in again" : "Turn in my " + H.name}</button>
      <p id="sendMsg" class="msg ${st.turnedIn[h] ? "good" : ""}" role="status" aria-live="polite">${st.turnedIn[h] ? "✓ Turned in! Your teacher can see your work." : ""}</p>` : `<p class="msg">👆 Tap a topic to start writing.</p>`}
      <div id="after">${after}</div></div></section>`;
    app.querySelectorAll(".topic").forEach(b => b.onclick = () => { if (st.pick[h] !== +b.dataset.n) { st.pick[h] = +b.dataset.n; save(); write(h); const w = $("wbox"); if (w) w.focus(); } });
    wire();
    if (!r) return;
    $("wbox").addEventListener("input", e => { st.writing[h] = e.target.value; save(); });
    $("sendBtn").onclick = () => send(h);
  }

  async function send(h) {
    const H = HALVES[h], msg = $("sendMsg"), box = $("wbox"), r = R[st.pick[h]];
    const v = (box.value || "").trim();
    if (!TT()) {
      if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: r.write.stem, source: "from the unit" }); if (junk) { msg.textContent = junk; msg.className = "msg bad"; return; } }
      if (v.split(/\s+/).filter(Boolean).length < 15) { msg.textContent = "Write a little more: use the starter, then add a fact and a “because.” (2 full sentences)"; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks (___) with your own words."; msg.className = "msg bad"; box.focus(); return; }
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }
    const list = R.map((x, n) => ({ x, n })).slice(H.from, H.to);
    const ids = n => BETCHECKS.map(c => n + c).concat([0, 1, 2].map(k => n + "l" + k));
    const firstRight = n => ids(n).filter(id => st.done[id] && !st.miss[id]).length;
    const answers = { "Standard": list.map(o => "SS.9-12." + o.x.std).join(", ") };
    const played = list.filter(o => ids(o.n).some(id => st.done[id]));
    answers["First-try correct"] = played.reduce((a, o) => a + firstRight(o.n), 0) + " of " + played.length * 7;
    answers["First-try by standard"] = list.map(o => o.x.std + ": " + (ids(o.n).some(id => st.done[id]) ? firstRight(o.n) + " of 7" : "not played")).join(" · ");
    answers["Bet vs. results (confidence check)"] = list.map(o => o.x.std + " bet " + (st.bets[o.n] ? BETS[st.bets[o.n]].name : "—") + " → " + BETCHECKS.filter(c => st.done[o.n + c] && !st.miss[o.n + c]).length + "/4").join(" · ");
    list.forEach(o => {
      const tag = id => !st.done[id] ? "not done" : st.miss[id] ? "after " + st.miss[id] + " wrong " + (st.miss[id] === 1 ? "try" : "tries") : "first try";
      answers[o.x.std + " · 📸 " + plain(o.x.snap.ask).slice(0, 70) + "…"] = o.x.snap.options[0] + " (" + tag(o.n + "s") + ")";
      answers[o.x.std + " · 🧩 " + o.x.build.ask] = tag(o.n + "b");
      answers[o.x.std + " · 🔎 " + plain(o.x.snap2.ask).slice(0, 70) + "…"] = o.x.snap2.options[0] + " (" + tag(o.n + "t") + ")";
      answers[o.x.std + " · 🛠️ Fix It (spot + fix the mistake)"] = tag(o.n + "f");
      answers[o.x.std + " · ⚡ Lightning"] = [0, 1, 2].map(k => tag(o.n + "l" + k)).join(" · ");
    });
    if (h === 2 && st.skipped1) answers["Note"] = "Started at Round 5 on this Chromebook (said Halftime was turned in on another one).";
    answers["Explain It topic"] = "SS.9-12." + r.std + " · " + r.title;
    answers["Writing: Explain It (" + r.std + ")"] = v;
    answers["Showdown points"] = String(st.score);
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: H.id, assignmentTitle: H.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      if (!st.turnedIn[h]) addPts(WRITE_PTS);
      st.turnedIn[h] = true; save(); write(h); hud();
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  function doneScreen() {
    const b = board(), place = b.rows.findIndex(x => x.me) + 1;
    app.innerHTML = `<section class="card done"><div class="marquee small"><p class="tk">All 8 rounds complete</p><h1>${place === 1 ? "🏆 CHAMPION" : "SHOWDOWN OVER"}</h1><p class="tsub">${st.score.toLocaleString()} points · #${place} ${b.isLive ? "in your class right now" : "vs. the bots"}</p></div>
      <div class="body"><p class="turned">${st.turnedIn[2] ? "✓ Turned in. Your teacher can see your work." : "Don't forget to turn in your Final Explain It."}</p>
      <ol class="final-board">${b.rows.slice(0, 8).map((x, n) => `<li class="${x.me ? "me" : ""}"><span>${n + 1}. ${esc(x.name)}</span><b>${x.s.toLocaleString()}</b></li>`).join("")}</ol>
      <p class="next">You've practiced all 8 parts of the Unit 1 test. Next up: the real thing.</p>
      <button type="button" class="light" id="backFinal">← Back to my Final Explain It</button></div></section>`;
    $("backFinal").onclick = () => { st.step = SCR.length - 2; save(); render(); };
  }

  // ---------------- Render ----------------
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    if (st.step >= SCR.length) st.step = SCR.length - 1;
    hud();
    if (st.step < 0) return title();
    const s = SCR[st.step];
    if (s.k === "bet") return bet(s.r);
    if (s.k === "snap") return snapLike(s.r, R[s.r].snap, s.r + "s", "📸 Source Snap", "Next: 🧩 Build It");
    if (s.k === "build") return build(s.r);
    if (s.k === "snap2") return snapLike(s.r, R[s.r].snap2, s.r + "t", "🔎 Second Source", "Next: 🛠️ Fix It");
    if (s.k === "fix") return fix(s.r);
    if (s.k === "light") return light(s.r);
    if (s.k === "result") return result(s.r);
    if (s.k === "write") return write(s.h);
    return doneScreen();
  }

  if ($("restartBtn")) $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your Showdown on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0) startArena();
  render();

  // ---------------- Test T. skip mode ----------------
  try {
    const LBL = { bet: "🎲 Bet", snap: "📸 Snap", build: "🧩 Build", snap2: "🔎 Source 2", fix: "🛠️ Fix It", light: "⚡ Lightning", result: "Results" };
    const solveTo = n => SCR.slice(0, n).forEach(s => {
      if (s.r == null) return;
      if (s.k === "bet" && !st.bets[s.r]) st.bets[s.r] = "safe";
      if (s.k === "snap") st.done[s.r + "s"] = true;
      if (s.k === "build") st.done[s.r + "b"] = true;
      if (s.k === "snap2") st.done[s.r + "t"] = true;
      if (s.k === "fix") st.done[s.r + "f"] = true;
      if (s.k === "light") [0, 1, 2].forEach(k => st.done[s.r + "l" + k] = true);
      if (s.k === "result" && roundPerfect(s.r) && !st.power[s.r]) st.power[s.r] = "bank";
    });
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => SCR.length,
      index: () => Math.max(0, Math.min(st.step, SCR.length - 1)),
      label: n => { const s = SCR[n]; return s.r != null ? "R" + (s.r + 1) + " " + R[s.r].std + " · " + LBL[s.k] : s.k === "write" ? "✍️ " + HALVES[s.h].name + " Explain It" : "Done"; },
      go: n => { if (!st.name) st.name = "Test T."; solveTo(n); st.step = n; st.lockUntil = 0; save(); render(); window.scrollTo(0, 0); },
      solve: () => {
        const s = SCR[st.step]; if (!s) return;
        st.lockUntil = 0;
        if (s.k === "bet") { st.bets[s.r] = st.bets[s.r] || "safe"; st.step++; }
        else if (s.k === "snap") right(s.r + "s", s.r);
        else if (s.k === "build") right(s.r + "b", s.r);
        else if (s.k === "snap2") right(s.r + "t", s.r);
        else if (s.k === "fix") right(s.r + "f", s.r);
        else if (s.k === "light") [0, 1, 2].forEach(k => right(s.r + "l" + k, s.r, true));
        else if (s.k === "result" && roundPerfect(s.r) && !st.power[s.r]) st.power[s.r] = "bank";
        else if (s.k === "write" && st.pick[s.h] == null) st.pick[s.h] = HALVES[s.h].from;
        save(); render();
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
