// =====================================================================
//  Sociology Unit 3 Day 6 · Sociology Case File (Unit 3 test review project)
//  Screens in strict order: pick a real person → for each test part (Soc.9, Soc.4, Soc.10, Soc.11):
//  quick review check(s) like the test, then a case-file entry (tap the evidence, pick the idea, write it
//  with the test's own sentence starter) → headline → the infographic + turn in.
//  Students never see scores; the first-try count goes only to the teacher dashboard.
//  Progress saves on the device ("Welcome back"). Test T. can skip everything (🧪 bar).
// =====================================================================
(function () {
  "use strict";
  const G = window.CF;
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 3;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isT = () => !!(window.classIsTestT && window.classIsTestT());
  const SECS = G.sections;
  const secById = id => SECS.find(s => s.id === id);

  // ---------- screen list ----------
  const SCREENS = [{ kind: "pick", label: "Pick your person" }];
  SECS.forEach(s => {
    s.checks.forEach((c, i) => SCREENS.push({ kind: "check", sec: s.id, check: c, label: s.name + ": review check " + (i + 1) }));
    SCREENS.push({ kind: "entry", sec: s.id, label: s.name + ": case file entry" });
  });
  SCREENS.push({ kind: "headline", label: "Headline" });
  SCREENS.push({ kind: "poster", label: "Infographic + turn in" });
  const N = SCREENS.length;
  const CHECKS = SCREENS.filter(x => x.kind === "check");

  // ---------- state ----------
  const fresh = () => ({ v: 1, name: "", step: -1, person: "", other: "", done: {}, miss: {}, e: {}, headline: "", turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(G.key)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 1 || !st.done) st = fresh();
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    if (now && st.name && now !== st.name.trim().toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(G.key, JSON.stringify(st)); } catch (e) {} };
  const entry = id => (st.e[id] = st.e[id] || { fact: "", own: "", term: "", text: "" });
  const person = () => G.people.find(p => p.id === st.person) || null;
  const personName = () => person() ? person().name : (st.other || "your person");
  let timers = [];
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  let solveFn = null;

  // ---------- frame ----------
  document.body.insertAdjacentHTML("afterbegin", `<div class="hud noprint" id="hud" hidden aria-label="Your progress"><div class="hud-in">
      <span class="brand">SOCIOLOGY CASE FILE</span><div class="prog" aria-hidden="true"><span id="progFill"></span></div>
      <span class="stepct" id="stepCt"></span></div></div>
    <main id="wrap"><p class="welcome noprint" id="welcome" role="status" hidden></p><section id="app" aria-live="polite"></section>
      <div class="foot noprint">Progress saves on this device. Your teacher sees your work after you turn it in. <button type="button" id="restartBtn">Start over</button></div></main>`);
  const app = $("app");
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    $("progFill").style.width = Math.round(Math.min(st.step + 1, N) / N * 100) + "%";
    $("stepCt").textContent = "Step " + (st.step + 1) + " of " + N;
  }
  const toTop = () => window.scrollTo(0, 0);
  function go(i) { clearTimers(); st.step = Math.max(0, Math.min(i, N - 1)); save(); render(); toTop(); }
  const backBtn = () => st.step > 0 ? `<button type="button" class="backbtn" id="backBtn">← Back</button>` : "";
  const bindBack = () => { const b = $("backBtn"); if (b) b.onclick = () => go(st.step - 1); };

  // ---------- title ----------
  function intro() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title-card">
      <p class="eyebrow">Sociology · Unit 3 · Day 6 · Test review project</p>
      <h1 class="big-title">SOCIOLOGY CASE FILE<small>Crack a real famous person with sociology.</small></h1>
      <p class="hook">Malala. Steve Jobs. Muhammad Ali. Shohei Ohtani. Serena Williams. Pick one and prove sociology made them who they are.</p>
      <div class="show" aria-hidden="true">${G.people.map(p => `<span>${p.icon} ${esc(p.name)}</span>`).join("")}</div>
      <div class="title-tiles"><span>🗂️ <b>4</b> case-file entries</span><span>✓ <b>7</b> quick test checks</span><span>🖼️ Ends in <b>your infographic</b></span><span>⏱ <b>35–40</b> min</span></div>
      <p class="goal"><b>Today's goal:</b> Review every part of the Unit 3 test by using it on one real person.</p>
      <ol class="steps"><li>Pick a real person.</li><li>For each test part, answer a quick check, then fill in that part of the case file.</li><li>Your answers turn into an infographic. Turn it in.</li></ol>
      <div class="title-start" style="margin-top:12px"><div class="namebox"><label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(pre)}"></div>
        <button type="button" class="big" id="startBtn">Open the case file →</button></div>
      <p id="introMsg" class="msg center" role="status"></p>
      <details class="small-print"><summary>Iowa standards for today</summary>${G.stdText.map(s => `<p><b>${esc(s[0])}</b> ${esc(s[1])}</p>`).join("")}</details></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ \p{Lu}\.$/u.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad center"; $("nameBox").focus(); return; }
      st.name = fixed;
      try { if (!localStorage.getItem("site-student-name")) localStorage.setItem("site-student-name", fixed); } catch (e) {}
      go(0);
      try { if (window.classTestSkip) window.classTestSkip.refresh(); } catch (e) {}
    };
    solveFn = null;
  }

  // ---------- 1. pick a person ----------
  function pickView() {
    app.innerHTML = `<section class="scene anim"><p class="kicker">Step 1 · Your case</p><h2>Who's your case file on?</h2>
      <p class="mute" style="margin:0">Each one comes with a real fact file. Pick the person you'd most like to crack.</p>
      <div class="people">${G.people.map(p => `<button type="button" class="pcard${st.person === p.id ? " on" : ""}" data-p="${p.id}" style="--pc:${p.color}"><span class="pi">${p.icon}</span><b>${esc(p.name)}</b><span>${esc(p.tag)}</span></button>`).join("")}
        <button type="button" class="pcard other${st.person === "other" ? " on" : ""}" data-p="other"><span class="pi">✍️</span><b>Someone else</b><span>You bring the facts</span></button></div>
      <div class="otherbox" id="otherBox" ${st.person === "other" ? "" : "hidden"}><label for="otherName"><b>Who?</b> Pick a real person whose life story you actually know. You'll type a real fact for each part.</label><br>
        <input id="otherName" maxlength="40" placeholder="Full name of a real famous person" value="${esc(st.other)}"></div>
      <p id="pickMsg" class="msg" role="status"></p>
      <div class="rowend">${backBtn()}<button type="button" class="next" id="nextBtn">Start the case file →</button></div></section>`;
    app.querySelectorAll(".pcard").forEach(b => b.onclick = () => {
      const changed = st.person && st.person !== b.dataset.p;
      if (changed && Object.keys(st.e).length && !confirm("Switch people? Your case-file entries will be cleared.")) return;
      if (changed) st.e = {};
      st.person = b.dataset.p; save();
      app.querySelectorAll(".pcard").forEach(x => x.classList.toggle("on", x === b));
      $("otherBox").hidden = st.person !== "other";
      if (st.person === "other") $("otherName").focus();
    });
    $("otherName").oninput = ev => { st.other = ev.target.value; save(); };
    $("nextBtn").onclick = () => {
      if (!st.person) { $("pickMsg").textContent = "Tap a person first."; $("pickMsg").className = "msg bad"; return; }
      if (st.person === "other" && !isT() && !/\S+\s+\S+/.test(st.other.trim())) { $("pickMsg").textContent = "Type the person's full name (first and last)."; $("pickMsg").className = "msg bad"; return; }
      go(st.step + 1);
    };
    bindBack();
    solveFn = () => { if (!st.person) st.person = G.people[0].id; save(); go(st.step + 1); };
  }

  // ---------- review checks (graded, first-try to dashboard) ----------
  function shuffled(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  let lastOrder = "";
  function order(c) {
    let o = shuffled(c.choices.map((t, i) => ({ t, i })));
    if (o.map(x => x.i).join("") === lastOrder && o.length > 1) o.push(o.shift());
    lastOrder = o.map(x => x.i).join("");
    return o;
  }
  function checkView(scr) {
    const s = secById(scr.sec), c = scr.check;
    const nIn = s.checks.indexOf(c) + 1;
    app.innerHTML = `<section class="scene anim"><div class="checkcard"><span class="secbadge">${s.icon} ${esc(s.name)} · ${esc(s.sub)} · ${esc(s.short)}</span>
      <p class="kicker">Quick test check ${nIn} of ${s.checks.length}</p><h2>${esc(c.q)}</h2>
      <div class="qbox" id="qbox"><div class="choices" id="choices"></div><p class="lock" id="lock"></p><div id="fb"></div></div>
      <div class="rowend">${backBtn()}<span id="nextSlot"></span></div></div></section>`;
    bindBack();
    const q = $("qbox");
    const setOff = off => q.querySelectorAll(".choice").forEach(b => b.disabled = off);
    const draw = () => {
      $("choices").innerHTML = order(c).map((x, i) => `<button type="button" class="choice" data-i="${x.i}"><span class="l">${"ABCD"[i]}</span><span>${esc(x.t)}</span></button>`).join("");
      q.querySelectorAll(".choice").forEach(b => b.onclick = () => pick(+b.dataset.i));
    };
    const finish = () => {
      setOff(true);
      const r = q.querySelector(`.choice[data-i="${c.answer}"]`); if (r) r.classList.add("right");
      $("lock").textContent = "";
      $("fb").innerHTML = `<div class="fb ok">✓ ${esc(c.why)}</div>`;
      $("nextSlot").innerHTML = `<button type="button" class="next" id="nextBtn">${SCREENS[st.step + 1].kind === "entry" ? "Fill in the case file" : "Next"} →</button>`;
      $("nextBtn").onclick = () => go(st.step + 1);
      solveFn = null;
    };
    const pick = i => {
      if (st.done[c.id]) return;
      if (i === c.answer) {
        st.done[c.id] = true;
        if (window.classFirstTry) window.classFirstTry.right(c.id);
        save(); finish(); return;
      }
      st.miss[c.id] = (st.miss[c.id] || 0) + 1;
      if (window.classFirstTry) window.classFirstTry.wrong();
      save();
      q.classList.remove("shake"); void q.offsetWidth; q.classList.add("shake");
      $("fb").innerHTML = `<div class="fb no">Not quite. ${esc(c.hint)} The choices got mixed up.</div>`;
      draw(); setOff(true);
      let left = isT() ? 0 : LOCK;
      const tick = () => { if (left <= 0) { setOff(false); $("lock").textContent = ""; return; } $("lock").textContent = "Try again in " + left + "…"; left--; later(tick, 1000); };
      tick();
    };
    draw();
    solveFn = () => pick(c.answer);
    if (st.done[c.id]) finish();
  }

  // ---------- case-file entry ----------
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const TERM_WORDS = {
    "Family": ["family", "dad", "mom", "parent", "father", "mother", "grand"], "School": ["school", "coach", "teacher"], "Peers": ["peer", "friend"],
    "Mass media": ["media", "tv", "news", "internet", "social media", "online"], "Religion": ["religion", "religious", "faith", "church", "islam", "god"],
    "The workplace": ["work", "job", "boss"], "Strain theory": ["strain"], "Differential association": ["differential", "association"],
    "Labeling theory": ["label"], "Looking-glass self": ["looking", "glass", "mirror"], "Generalized other": ["generalized", "general"],
    "In-group vs. out-group": ["in-group", "out-group", "ingroup", "outgroup", "in group", "out group"], "Primary group": ["primary"],
    "Secondary group": ["secondary"], "Conformity": ["conform"]
  };
  function entryView(scr) {
    const s = secById(scr.sec), p = person(), E = entry(s.id);
    const own = !p;
    const order = p ? (E.order || (E.order = shuffled(SECS.map(x => x.id)))) : [];
    save();
    const factDone = own ? E.own.trim().length >= 30 || (isT() && E.own.trim()) : E.fact === s.id;
    const termOk = () => E.term && (!s.answers || own || s.answers[p.id] === E.term);
    app.innerHTML = `<section class="scene anim"><span class="secbadge">${s.icon} ${esc(s.name)} · ${esc(s.sub)} · ${esc(s.short)}</span>
      <p class="kicker">Case file entry · ${esc(personName())}</p><h2>${esc(s.poster)}</h2>
      <div class="grid">
        <div class="panel"><div class="filehead"><span class="fi">${p ? p.icon : "✍️"}</span><div><b><span class="real">REAL</span>${esc(personName())}</b><span>${p ? "Fact file" : "Your own facts"}</span></div></div>
          ${p ? `<div class="facts" id="facts">${order.map((id, i) => `<button type="button" class="factbtn" data-f="${id}"><span class="fn">${i + 1}</span><span>${esc(p.facts[id])}</span></button>`).join("")}</div>`
              : `<label for="ownFact">Type one real fact about ${esc(personName())} for this part:</label><p class="mute" style="margin:2px 0 6px">${esc(s.factQ.replace(/^Tap the fact/, "A fact"))}</p><textarea class="ownfact" id="ownFact" data-junk-skip>${esc(E.own)}</textarea>`}
          <div id="factFb"></div></div>
        <div>
          <div class="stage" id="st1"><h3><span class="n">1</span>${p ? esc(s.factQ) : "Type your fact (left)"}</h3><p class="lock" id="flock"></p></div>
          <div class="stage" id="st2"><h3><span class="n">2</span>${esc(s.termQ)}</h3><div class="terms" id="terms">${s.terms.map(t => `<button type="button" class="term" data-t="${esc(t)}">${esc(t)}</button>`).join("")}</div><p class="termdef" id="termDef"></p><div id="termFb"></div></div>
          <div class="stage" id="st3"><h3><span class="n">3</span>Write it</h3>
            <label for="w_${s.id}">${esc(s.writeQ)}</label>
            <p class="stem"><b>Start like this:</b> ${esc(s.stem)}</p>
            <textarea id="w_${s.id}" rows="4" data-starter="${esc(s.stem)}">${esc(E.text)}</textarea></div>
          <p id="entryMsg" class="msg" role="status"></p>
          <div class="rowend">${backBtn()}<button type="button" class="next" id="nextBtn">Save this entry →</button></div>
        </div></div></section>`;
    bindBack();
    const st1 = $("st1"), st2 = $("st2"), st3 = $("st3");
    const paint = () => {
      const fOk = own ? (E.own.trim().length >= 30 || (isT() && !!E.own.trim())) : E.fact === s.id;
      st1.classList.toggle("donestage", fOk);
      st2.classList.toggle("locked", !fOk);
      st2.classList.toggle("donestage", fOk && !!termOk());
      st3.classList.toggle("locked", !(fOk && termOk()));
      app.querySelectorAll(".term").forEach(b => { b.classList.toggle("on", b.dataset.t === E.term); b.classList.toggle("right", b.dataset.t === E.term && !!s.answers && !own && termOk()); });
      $("termDef").textContent = E.term && termOk() ? E.term + ": " + (G.defs[E.term] || "") : "";
      if (p) app.querySelectorAll(".factbtn").forEach(b => { b.classList.toggle("right", b.dataset.f === s.id && fOk); b.classList.toggle("dim", fOk && b.dataset.f !== s.id); b.disabled = fOk; });
    };
    // step 1: the evidence
    let flocked = false;
    if (p) app.querySelectorAll(".factbtn").forEach(b => b.onclick = () => {
      if (flocked || E.fact === s.id) return;
      if (b.dataset.f === s.id) { E.fact = s.id; save(); $("factFb").innerHTML = ""; paint(); return; }
      const other = secById(b.dataset.f);
      b.classList.remove("no"); void b.offsetWidth; b.classList.add("no");
      $("factFb").innerHTML = `<div class="fb no">That fact fits a different part of the case file (${esc(other.name)}). ${esc(s.factQ.replace(/^Tap /, "Look for "))}</div>`;
      flocked = true; let left = isT() ? 0 : 2;
      const tick = () => { if (left <= 0) { flocked = false; $("flock").textContent = ""; return; } $("flock").textContent = "Look again in " + left + "…"; left--; later(tick, 1000); };
      tick();
    });
    if (own) $("ownFact").oninput = ev => { E.own = ev.target.value; save(); paint(); };
    // step 2: the idea
    app.querySelectorAll(".term").forEach(b => b.onclick = () => {
      E.term = b.dataset.t; save();
      if (s.answers && !own && s.answers[p.id] !== E.term) {
        $("termFb").innerHTML = `<div class="fb no">Look at your fact again. Who is doing the teaching there?</div>`;
      } else $("termFb").innerHTML = "";
      paint();
    });
    // step 3: the writing
    const box = $("w_" + s.id);
    box.addEventListener("input", ev => { E.text = ev.target.value; save(); });
    $("nextBtn").onclick = () => {
      const msg = $("entryMsg");
      const prob = entryProblem(s, E, box, own);
      if (prob) { msg.textContent = prob; msg.className = "msg bad"; return; }
      go(st.step + 1);
    };
    paint();
    solveFn = () => {
      if (p) E.fact = s.id; else if (!E.own) E.own = "Test T. sample fact about this person for this part of the case file.";
      if (!E.term) E.term = s.answers && p ? s.answers[p.id] : s.terms[0];
      if (!E.text) E.text = "Test T. sample answer: " + s.stem.replace(/___/g, "…");
      save(); render();
    };
  }
  function entryProblem(s, E, box, own) {
    if (isT()) return "";
    if (own && E.own.trim().length < 30) return "Type one real fact (a full sentence) on the left.";
    if (!own && E.fact !== s.id) return "Tap the fact that fits this part first.";
    if (!E.term) return "Pick the idea in step 2.";
    if (s.answers && !own && s.answers[person().id] !== E.term) return "Check step 2 again.";
    const v = (box.value || "").trim();
    if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: s.stem, source: "from the fact file" }); if (junk) return junk; }
    if (v.length < 60) return "Write a little more (at least 2 full sentences).";
    if (/_{2,}/.test(v)) return "Fill in the blanks with your own words.";
    const words = (TERM_WORDS[E.term] || []).concat([plain(E.term)]);
    if (!words.some(w => plain(v).includes(w))) return "Use the idea you picked (" + E.term + ") in your answer.";
    if (!/\b(because|since|so|for example|example|shows?)\b/i.test(v)) return "Explain it. Use \"because\" or \"for example.\"";
    return "";
  }

  // ---------- headline ----------
  function headlineView() {
    app.innerHTML = `<section class="scene anim"><p class="kicker">Almost done · ${esc(personName())}</p><h2>Give your case file a headline</h2>
      <label for="hl"><b>One line that sums up what made ${esc(personName())} who they are.</b></label>
      <input class="headline-in" id="hl" maxlength="70" autocomplete="off" value="${esc(st.headline)}" placeholder="Write your headline">
      <ul class="examples"><li>Like: "A garage workbench built Apple"</li><li>Like: "Booed, fined, and still No. 1"</li></ul>
      <p id="hlMsg" class="msg" role="status"></p>
      <div class="rowend">${backBtn()}<button type="button" class="next" id="nextBtn">Build my infographic →</button></div></section>`;
    bindBack();
    $("hl").oninput = ev => { st.headline = ev.target.value; save(); };
    $("nextBtn").onclick = () => {
      const v = st.headline.trim();
      if (!isT() && (v.split(/\s+/).length < 3 || v.length < 12)) { $("hlMsg").textContent = "Write a headline with at least 3 words."; $("hlMsg").className = "msg bad"; return; }
      go(st.step + 1);
    };
    solveFn = () => { if (!st.headline) st.headline = "Test T. sample headline"; save(); go(st.step + 1); };
  }

  // ---------- the infographic + turn in ----------
  function posterHtml() {
    const p = person();
    const color = p ? p.color : "#1f6f8b";
    const used = [];
    const panels = SECS.map(s => {
      const E = entry(s.id);
      if (E.term && !used.includes(E.term)) used.push(E.term);
      const fact = p ? p.facts[s.id] : E.own;
      return `<div class="pp"><p class="pt"><span class="ic">${s.icon}</span><b>${esc(s.name)}</b><span class="sd">${esc(s.short)}</span></p>
        <p class="q">${esc(s.poster)}</p>
        <span class="chip">${esc(E.term || "—")}</span>
        <p class="ev"><i>The evidence</i>${esc(fact || "—")}</p>
        <p class="mine"><i>My case</i>${esc(E.text || "—")}</p></div>`;
    }).join("");
    return `<article class="poster" style="--pc:${color}">
      <header class="ph"><span class="pe">${p ? p.icon : "✍️"}</span><div><p class="eye">Sociology case file</p><h1>${esc(personName())}</h1>
        <p class="hl">"${esc(st.headline || "")}"</p><p class="by">Case file by ${esc(st.name)} · Unit 3: Socialization, the Self &amp; Groups</p></div><span class="stamp">CASE CLOSED</span></header>
      <div class="pgrid">${panels}</div>
      <div class="pkeys"><h3>🔑 Key words for the test</h3><ul>${used.map(t => `<li><b>${esc(t)}:</b> ${esc(G.defs[t] || "")}</li>`).join("")}</ul></div>
      <div class="pfoot"><span>Iowa: SS.9-12.Soc.4 · Soc.9 · Soc.10 · Soc.11</span><span>Facts: ${p ? "class fact file" : "student's own research"}</span></div></article>`;
  }
  function posterView() {
    app.innerHTML = `<section class="scene anim"><p class="kicker noprint">Your infographic</p><h2 class="noprint">Case closed. Here's your infographic.</h2>
      <div class="posterwrap">${posterHtml()}</div>
      <div class="posteractions">${backBtn()}<button type="button" class="printbtn" id="printBtn">🖨️ Print it</button><button type="button" class="big" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn it in"}</button></div>
      <p id="sendMsg" class="msg center" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can go back, fix an entry, and turn it in again." : "Check it over. Use ← Back to fix anything first."}</p>
      ${st.turnedIn ? `<p class="center"><span class="turned" id="turnedTag">✓ Turned in</span></p>` : ""}
      <p class="galnote mute noprint">Tip: this is a study sheet for the test. Every key word on it is on the test.</p></section>`;
    bindBack();
    $("printBtn").onclick = () => window.print();
    $("sendBtn").onclick = send;
    solveFn = null;
  }
  function buildAnswers() {
    const a = { "Standard": G.standard };
    const ft = list => list.filter(x => st.done[x.check.id] && !st.miss[x.check.id]).length;
    a["First-try correct"] = ft(CHECKS) + " of " + CHECKS.length;
    a["First-try by standard"] = SECS.map(s => { const l = CHECKS.filter(x => x.sec === s.id); return s.std + ": " + ft(l) + " of " + l.length; }).join(" · ");
    const tries = m => m ? " (after " + m + " wrong " + (m === 1 ? "try" : "tries") + ")" : " (first try)";
    CHECKS.forEach((x, i) => { const s = secById(x.sec); a[(i + 1) + ". " + s.short + " check: " + x.check.q] = x.check.choices[x.check.answer] + tries(st.miss[x.check.id] || 0); });
    a["Person"] = personName() + (person() ? "" : " (student's choice)");
    const qs = [];
    SECS.forEach(s => {
      const E = entry(s.id);
      a[s.name + " (" + s.short + ") · evidence"] = person() ? person().facts[s.id] : E.own;
      a[s.name + " (" + s.short + ") · idea"] = E.term;
      a["Writing: " + s.name + " (" + s.short + ") · " + s.writeQ] = (E.text || "").trim();
      qs.push(s.writeQ + " (Starter: " + s.stem + ")");
    });
    a["Headline"] = st.headline.trim();
    a["Questions on the page"] = qs;
    return a;
  }
  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    if (!isT()) {
      const missing = SECS.find(s => { const E = entry(s.id); return !E.term || (E.text || "").trim().length < 60; });
      if (missing) { msg.textContent = "The " + missing.name + " entry isn't finished. Go back and finish it."; msg.className = "msg bad center"; return; }
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad center"; return; }
    btn.disabled = true; msg.textContent = "Sending your case file…"; msg.className = "msg center";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: G.assignmentId, assignmentTitle: G.title, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your case file. You're done."; msg.className = "msg good center";
      btn.textContent = "Turned in ✓"; btn.disabled = false;
      if (!$("turnedTag")) msg.insertAdjacentHTML("afterend", `<p class="center"><span class="turned" id="turnedTag">✓ Turned in</span></p>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad center"; btn.disabled = false; }
  }

  // ---------- render ----------
  let firstRender = true;
  function render() {
    clearTimers();
    if (!firstRender) $("welcome").hidden = true;
    firstRender = false;
    // A real student can't land on a screen past unfinished work (e.g. after a refresh).
    if (!isT() && st.step > 0) {
      for (let i = 0; i < st.step; i++) {
        const x = SCREENS[i];
        const ok = x.kind === "pick" ? !!st.person : x.kind === "check" ? !!st.done[x.check.id] : x.kind === "entry" ? !!(st.e[x.sec] && st.e[x.sec].term && (st.e[x.sec].text || "").trim().length >= 60) : x.kind === "headline" ? st.headline.trim().length >= 12 : true;
        if (!ok) { st.step = i; save(); break; }
      }
    }
    hud();
    if (st.step < 0) return intro();
    const scr = SCREENS[st.step];
    if (scr.kind === "pick") return pickView();
    if (scr.kind === "check") return checkView(scr);
    if (scr.kind === "entry") return entryView(scr);
    if (scr.kind === "headline") return headlineView();
    return posterView();
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your case file on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    save(); render(); toTop();
  };
  if (st.step >= 0) {
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " You're on step " + (st.step + 1) + " of " + N + ".")}</span> <button type="button" class="notyou" id="notYouBtn">Not you? Start fresh</button>`;
    $("welcome").hidden = false;
    $("notYouBtn").onclick = () => {
      st = fresh();
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      try { localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      save(); location.reload();
    };
  }
  window.__cf = { get state() { return JSON.parse(JSON.stringify(st)); }, screens: SCREENS.map(x => x.kind + ":" + (x.sec || "") + ":" + (x.check ? x.check.id : "")), answers: () => buildAnswers() };
  render();

  // ---------- Test T. skip bar (shared/turnin.js) ----------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => N + 1,
      index: () => st.step + 1,
      label: i => i === 0 ? "Title" : "Step " + i + ": " + SCREENS[i - 1].label,
      go: i => {
        if (!st.name) st.name = "Test T.";
        const t = i - 1;
        if (t >= 1 && !st.person) st.person = G.people[0].id;
        for (let j = 0; j < t && j < N; j++) {
          const x = SCREENS[j];
          if (x.kind === "check") st.done[x.check.id] = true;
          if (x.kind === "entry") {
            const s = secById(x.sec), E = entry(s.id), p = person();
            if (p) E.fact = s.id; else if (!E.own) E.own = "Test T. sample fact about this person for this part of the case file.";
            if (!E.term) E.term = s.answers && p ? s.answers[p.id] : s.terms[0];
            if (!E.text) E.text = "Test T. sample answer: " + s.stem.replace(/___/g, "…");
          }
          if (x.kind === "headline" && !st.headline) st.headline = "Test T. sample headline";
        }
        st.step = t; save(); render(); toTop();
      },
      solve: () => { if (solveFn) solveFn(); }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
