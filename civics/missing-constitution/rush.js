/* =====================================================================
   PRINCIPLE RUSH  (Government Unit 1, Day 7: The Constitution)
   20 real moments, all from the Day 7 slides. Students name the principle
   or fact behind each one and build a streak.
   - Wrong answer: streak resets, the reason shows, and that question comes
     back at the end. Only first tries count toward the score.
   - Halfway break after 10. Exit ticket (from the Day 7 slides) at the end.
   Saved on this device. Turn-in goes through shared/turnin.js (classTurnIn).
   ===================================================================== */
(function () {
  "use strict";
  const KEY = "gov-day7-principle-rush-v1";
  const API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const ASSIGNMENT_ID = "gov-missing-constitution-day7";
  const TITLE = "Day 7 · Principle Rush";
  const STANDARD = "SS.9-12.Gov.3, SS.9-12.Gov.4";

  // Answer choices that are principles (short "means" line helps struggling readers).
  const P = {
    ps:  ["🗳️", "Popular sovereignty", "The people are the source of power"],
    rep: ["🙋", "Republicanism", "Voters pick representatives"],
    lg:  ["📏", "Limited government", "Power has written limits"],
    rol: ["⚖️", "Rule of law", "No one is above the law"],
    sop: ["🧱", "Separation of powers", "Three branches, three jobs"],
    cb:  ["🔁", "Checks and balances", "Each branch can limit the others"],
    av:  ["✍️", "Amending (Article V)", "How the Constitution changes"]
  };
  const pr = k => ({ e: P[k][0], t: P[k][1], s: P[k][2] });
  const tx = (e, t, s) => ({ e, t, s: s || "" });

  // ---------- The 20 questions (in Day 7 slide order). opts[0] is always the right one. ----------
  const QS = [
    { id: "q1", std: "SS.9-12.Gov.4", short: "Voters elect the governor", e: "📣", real: true,
      scene: "Iowans vote for their governor. Whoever gets the most votes gets the job.",
      ask: "Which principle is this?", opts: [pr("ps"), pr("sop"), pr("rol")],
      why: "Popular sovereignty: the people are the source of the government's power. We use that power when we vote.",
      src: "Day 7 slides · The People Hold the Power" },
    { id: "q2", std: "SS.9-12.Gov.4", short: "“We the People”", e: "📜", real: true,
      scene: "The very first words of the Constitution are “We the People.”",
      ask: "Which principle do those words show?", opts: [pr("ps"), pr("lg"), pr("cb")],
      why: "Popular sovereignty. The Constitution starts with the people because the people give government its power.",
      src: "U.S. Constitution, Preamble (1787)" },
    { id: "q3", std: "SS.9-12.Gov.4", short: "Electing lawmakers", e: "🏛️", real: false,
      scene: "You don't vote on every law yourself. You elect lawmakers, and they vote. If they do a bad job, you can vote them out.",
      ask: "Which principle is this?", opts: [pr("rep"), pr("rol"), pr("av")],
      why: "Republicanism: we elect lawmakers who answer to voters.",
      src: "Day 7 slides · The People Hold the Power" },
    { id: "q4", std: "SS.9-12.Gov.4", short: "A list of what leaders can't do", e: "📋", real: true,
      scene: "The Constitution lists what leaders are allowed to do, and what they are not allowed to do.",
      ask: "Which principle is this?", opts: [pr("lg"), pr("ps"), pr("sop")],
      why: "Limited government: government may only do what the people allow.",
      src: "Day 7 slides · The People Hold the Power" },
    { id: "q5", std: "SS.9-12.Gov.4", short: "Nixon tapes", e: "📼", real: true,
      scene: "1974: President Nixon refuses to hand over secret White House tapes. The Supreme Court rules 8–0: hand them over.",
      ask: "Which principle is this?", opts: [pr("rol"), pr("rep"), pr("av")],
      why: "Rule of law: everyone must obey the law, even the President. The tapes showed Nixon helped cover up the Watergate break-in. Sixteen days later, he resigned.",
      src: "United States v. Nixon (1974)" },
    { id: "q6", std: "SS.9-12.Gov.4", short: "Three branches, three jobs", e: "🗂️", real: true,
      scene: "Congress makes laws. The President carries them out. The courts decide what laws mean.",
      ask: "Which principle is this?", opts: [pr("sop"), pr("cb"), pr("lg")],
      why: "Separation of powers: the government's work is split among three branches, each with its own job.",
      src: "U.S. Constitution, Articles I, II, III" },
    { id: "q7", std: "SS.9-12.Gov.3", short: "Montesquieu", e: "📖", real: true,
      scene: "A French thinker warned that if one person held all three powers, freedom would be destroyed. The Framers used his idea.",
      ask: "Who was he?", opts: [tx("🖋️", "Montesquieu"), tx("🖋️", "John Locke"), tx("🖋️", "James Madison")],
      why: "Montesquieu. His warning is why the Constitution splits power into three branches.",
      src: "Day 7 slides · Power Is Split Into Three Branches" },
    { id: "q8", std: "SS.9-12.Gov.4", short: "Who enforces laws", e: "📢", real: false,
      scene: "Congress passes a new law. Now someone has to make sure people actually follow it.",
      ask: "Which branch carries out, or enforces, the laws?", opts: [tx("🦅", "Executive", "The President"), tx("🏛️", "Legislative", "Congress"), tx("👩‍⚖️", "Judicial", "The courts")],
      why: "The executive branch carries out the laws. Congress makes them. Courts decide what they mean.",
      src: "Day 7 slides · Power Is Split Into Three Branches" },
    { id: "q9", std: "SS.9-12.Gov.3", short: "Veto", e: "✋", real: true,
      scene: "Congress passes a bill. The President vetoes it, which means he rejects it.",
      ask: "Which principle is this?", opts: [pr("cb"), pr("ps"), pr("av")],
      why: "Checks and balances: the President can check Congress with a veto.",
      src: "U.S. Constitution, Article I" },
    { id: "q10", std: "SS.9-12.Gov.3", short: "Veto override vote", e: "📨", real: true,
      scene: "Congress wants the bill to become law anyway, even after the President's veto.",
      ask: "What vote does Congress need to override a veto?", opts: [tx("✌️", "Two-thirds of both houses"), tx("➗", "Just over half"), tx("💯", "Every single member")],
      why: "Two-thirds of both houses. That's hard: Presidents have vetoed about 2,600 bills, and Congress overrode only 112.",
      src: "Day 7 slides · Each Branch Can Check the Others" },
    { id: "q11", std: "SS.9-12.Gov.3", short: "Bork vote", e: "👨‍⚖️", real: true,
      scene: "1987: The President picks Robert Bork for the Supreme Court. The Senate votes 58–42 against him.",
      ask: "Which principle is this?", opts: [pr("cb"), pr("rol"), pr("rep")],
      why: "Checks and balances: the Senate must approve judges, so it can check the President's picks.",
      src: "Senate vote, Oct. 23, 1987" },
    { id: "q12", std: "SS.9-12.Gov.3", short: "38 states to ratify", e: "📮", real: true,
      scene: "Two-thirds of both houses of Congress propose a new amendment. Now the states get a say.",
      ask: "How many of the 50 states must ratify (approve) it?", opts: [tx("🗺️", "38 states"), tx("🗺️", "26 states"), tx("🗺️", "50 states")],
      why: "Three-fourths of the states, which is 38 of 50. Article V makes it hard on purpose.",
      src: "U.S. Constitution, Article V" },
    { id: "q13", std: "SS.9-12.Gov.3", short: "27th Amendment took 203 years", e: "🎓", real: true,
      scene: "The 27th Amendment was proposed in 1789. It finally passed in 1992, after a college student got a C on a paper about it and started a campaign.",
      ask: "Why is it so hard to add an amendment?", opts: [tx("🗺️", "Three-fourths of the states (38) must approve it"), tx("🦅", "The President must sign it, and can veto it"), tx("💯", "Every one of the 50 states must approve it")],
      why: "Article V needs two-thirds of Congress to propose it and three-fourths of the states (38) to ratify it. It's hard on purpose. Only 27 amendments have ever been ratified.",
      src: "National Archives, 27th Amendment (1992)" },
    { id: "q14", std: "SS.9-12.Gov.3", short: "Ending slavery", e: "⛓️", real: true,
      scene: "1865: Right after the Civil War, an amendment ended slavery in the United States.",
      ask: "Which amendment?", opts: [tx("📜", "The 13th"), tx("📜", "The 19th"), tx("📜", "The 21st")],
      why: "The 13th Amendment (1865) ended slavery. The 14th (1868) made people born here citizens and promised equal protection.",
      src: "U.S. Constitution, 13th Amendment" },
    { id: "q15", std: "SS.9-12.Gov.3", short: "Women's vote", e: "🙋‍♀️", real: true,
      scene: "1920: After decades of protests, an amendment gave women the right to vote.",
      ask: "Which amendment?", opts: [tx("📜", "The 19th"), tx("📜", "The 26th"), tx("📜", "The 14th")],
      why: "The 19th Amendment (1920) gave women the vote.",
      src: "U.S. Constitution, 19th Amendment" },
    { id: "q16", std: "SS.9-12.Gov.3", short: "Voting age 18", e: "🪖", real: true,
      scene: "Young men could be drafted to fight in Vietnam at 18, but in most states couldn't vote until 21. In 1971, an amendment changed that.",
      ask: "Which amendment lowered the voting age to 18?", opts: [tx("📜", "The 26th"), tx("📜", "The 14th"), tx("📜", "The 21st")],
      why: "The 26th Amendment (1971). It's why you can vote when you turn 18.",
      src: "U.S. Constitution, 26th Amendment" },
    { id: "q17", std: "SS.9-12.Gov.3", short: "18th and 21st Amendments", e: "🍺", real: true,
      scene: "1919: The 18th Amendment banned making and selling alcohol. Fourteen years later, the ban was gone.",
      ask: "How was the 18th Amendment undone?", opts: [tx("📜", "Another amendment (the 21st) repealed it"), tx("👩‍⚖️", "The Supreme Court struck it down"), tx("✋", "The President vetoed it")],
      why: "The 21st Amendment (1933) repealed, or canceled, the 18th. Only another amendment can undo an amendment.",
      src: "U.S. Constitution, 18th and 21st Amendments" },
    { id: "q18", std: "SS.9-12.Gov.4", short: "Warrants", e: "🚓", real: false,
      scene: "Police in Marion want to search a house. For most searches, they need a warrant (a judge's OK) first.",
      ask: "What is this an example of?", opts: [tx("🛡️", "A right limiting how government keeps order"), tx("🚨", "A rule that lets police search anytime to keep people safe"), tx("🗳️", "The people choosing their own leaders")],
      why: "Government keeps order, but rights limit how. The 4th Amendment protects you from unreasonable searches.",
      src: "U.S. Constitution, 4th Amendment" },
    { id: "q19", std: "SS.9-12.Gov.4", short: "Derecho emergency limits", e: "🌪️", real: true,
      scene: "2020: After the derecho, Gov. Kim Reynolds issued a disaster proclamation, and the Iowa National Guard came to Cedar Rapids.",
      ask: "How does Iowa law limit a governor's emergency power?", opts: [tx("📅", "It ends after 30 days unless renewed, and lawmakers can cancel it"), tx("🗳️", "It lasts until the next election, and then voters decide"), tx("⚖️", "It lasts one year, and only a judge can end it early")],
      why: "In Iowa, a disaster proclamation ends after 30 days unless the governor renews it. Lawmakers can cancel it.",
      src: "Iowa Code §29C.6" },
    { id: "q20", std: "SS.9-12.Gov.4", short: "School bag search", e: "🎒", real: true,
      scene: "A school official wants to search a student's bag.",
      ask: "What does the school need first?", opts: [tx("🤔", "Reasonable suspicion (a good reason)"), tx("📝", "A warrant signed by a judge"), tx("🚫", "Nothing. Schools can search anytime")],
      why: "Reasonable suspicion, a lower bar than police need. That's from the case New Jersey v. T.L.O. (1985).",
      src: "New Jersey v. T.L.O. (1985)" }
  ];
  const N = QS.length;
  const QBY = Object.fromEntries(QS.map(q => [q.id, q]));

  // ---------- Writing (the Day 7 exit ticket) ----------
  const PROMPT = {
    id: "w1", short: "Two principles",
    label: "Pick two principles from today. How do they work together to keep power balanced? Use one fact from today, like the Nixon tapes or the Bork vote.",
    stem: "___ and ___ balance power because… For example, …",
    must: ["popular sovereignty", "sovereignty", "republicanism", "limited government", "rule of law", "separation", "checks", "balances", "amend", "article v"],
    mustMsg: "Name at least one principle from today, like checks and balances or rule of law.",
    detail: ["nixon", "tape", "watergate", "bork", "veto", "override", "two-thirds", "two thirds", "2/3", "senate", "montesquieu", "derecho", "warrant", "amendment", "26th", "19th", "13th", "14th", "21st", "18th", "38 states", "three-fourths", "8-0", "8–0", "58", "emergency", "30 days", "t.l.o", "reasonable suspicion", "we the people"],
    detailMsg: "Add one fact from today, like the Nixon tapes, the Bork vote, or a veto override."
  };

  // ---------- Helpers ----------
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());

  const fresh = () => ({ v: 1, screen: "title", queue: QS.map(q => q.id), cur: null, order: null, picked: null, res: {}, streak: 0, best: 0, halfwaySeen: false, started: 0, finished: 0, writing: "", name: "", turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 1) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const app = $("app");

  const solved = () => QS.filter(q => (st.res[q.id] || {}).done).length;
  const firstTry = () => QS.filter(q => (st.res[q.id] || {}).done && !(st.res[q.id] || {}).wrong).length;

  function hud() {
    const on = st.screen === "q" || st.screen === "half";
    $("hud").hidden = !on;
    if (!on) return;
    $("progTxt").textContent = solved() + " of " + N + " done";
    $("rightTxt").textContent = firstTry() + " right on the first try";
    $("progFill").style.width = Math.round(solved() / N * 100) + "%";
    $("streakNum").textContent = st.streak;
    $("streakBox").classList.toggle("hot", st.streak >= 3);
  }

  function show(screen) { $("welcome").hidden = true; st.screen = screen; save(); render(); window.scrollTo(0, 0); }

  // ---------- Title ----------
  function titleScreen() {
    app.innerHTML = `<section class="title">
      <div>
        <p class="kicker">Government · Unit 1 · Day 7</p>
        <h1>PRINCIPLE RUSH</h1>
        <p class="hook">20 moments from today's lesson. Name the rule behind each one.</p>
        <div class="steps">
          <div class="step"><span class="e" aria-hidden="true">📼</span><b>Read the moment</b><small>All from today's slides</small></div>
          <div class="step"><span class="e" aria-hidden="true">👆</span><b>Pick 1 of 3</b><small>Name the principle or fact</small></div>
          <div class="step"><span class="e" aria-hidden="true">🔥</span><b>Build a streak</b><small>Miss one? It comes back later</small></div>
        </div>
        <div class="chips"><span>⏱️ <b>About 15 min</b></span><span>❓ <b>20 questions</b></span><span>✍️ <b>1 exit ticket</b></span></div>
        <button type="button" class="go" id="startBtn">START ▶</button>
        <p class="fine">Only your first try on each question counts toward your score.</p>
      </div>
      <div class="sample" aria-hidden="true">
        <span class="tag">EXAMPLE</span>
        <p>🚓 Iowa's governor gets pulled over for speeding and gets a ticket, just like anyone else.</p>
        <div class="opts"><span>🔁 Checks and balances</span><span class="ok">⚖️ Rule of law ✓</span><span>🗳️ Popular sovereignty</span></div>
      </div>
    </section>`;
    $("startBtn").onclick = () => { if (!st.started) st.started = Date.now(); nextQ(); };
  }

  // ---------- Questions ----------
  function nextQ() {
    document.querySelectorAll(".pop").forEach(x => x.remove());
    if (!st.queue.length) { st.finished = st.finished || Date.now(); return show("end"); }
    if (!st.halfwaySeen && solved() >= 10 && st.screen !== "half") { st.halfwaySeen = true; return show("half"); }
    st.cur = st.queue[0];
    st.order = shuffle([0, 1, 2]);
    st.picked = null;
    show("q");
  }

  function qScreen() {
    const q = QBY[st.cur];
    if (!q) return nextQ();
    if (!st.order) st.order = shuffle([0, 1, 2]);
    const r = st.res[q.id] || {};
    const back = r.wrong ? `<span class="tagreal ex">COMING BACK</span>` : "";
    app.innerHTML = `<section class="qwrap">
      <article class="card">
        <div class="meta"><span class="${q.real ? "tagreal" : "tagreal ex"}">${q.real ? "REAL" : "EXAMPLE"}</span>${back}<span class="e" aria-hidden="true">${q.e}</span></div>
        <p class="scene">${esc(q.scene)}</p>
        <p class="src">${esc(q.src)}</p>
      </article>
      <div>
        <p class="ask">${esc(q.ask)}</p>
        <div class="opts" id="opts">${st.order.map(n => { const o = q.opts[n]; return `<button type="button" class="opt" data-n="${n}"><span class="oe" aria-hidden="true">${o.e}</span><span>${esc(o.t)}${o.s ? `<small>${esc(o.s)}</small>` : ""}</span></button>`; }).join("")}</div>
        <div id="fb"></div>
      </div>
    </section>`;
    $("opts").querySelectorAll(".opt").forEach(b => b.onclick = () => answer(q, +b.dataset.n, b));
    if (st.picked != null) replayPick(q);
  }

  function answer(q, n, btn) {
    if (st.picked != null) return;
    st.picked = n;
    const r = st.res[q.id] || (st.res[q.id] = { wrong: 0, done: false, tries: [] });
    r.tries.push(q.opts[n].t);
    if (n === 0) {
      r.done = true;
      st.streak++; st.best = Math.max(st.best, st.streak);
      st.queue.shift();
      if (window.classFirstTry) window.classFirstTry.right(q.id);
      if (st.streak >= 3 && !r.wrong) popup(st.streak >= 5 ? "🔥 " + st.streak + " IN A ROW!" : "🔥 " + st.streak + " streak");
    } else {
      r.wrong++;
      st.streak = 0;
      st.queue.push(st.queue.shift());   // comes back at the end
      if (window.classFirstTry) window.classFirstTry.wrong();
    }
    save(); hud(); replayPick(q);
  }

  function replayPick(q) {
    const n = st.picked, ok = n === 0;
    $("opts").querySelectorAll(".opt").forEach(b => {
      const m = +b.dataset.n;
      b.disabled = true;
      if (m === n) b.classList.add(ok ? "right" : "wrong");
      else if (m === 0 && ok) b.classList.add("right");
      else b.classList.add("dim");
    });
    const last = !st.queue.length;
    $("fb").innerHTML = ok
      ? `<div class="fb good" role="status"><b class="h">✓ Right!</b>${esc(q.why)}</div><button type="button" class="go" id="nextBtn">${last ? "Finish ▶" : "Next ▶"}</button>`
      : `<div class="fb bad" role="status"><b class="h">Not this one.</b>${esc(q.why)}<span class="back">↻ This question comes back at the end. Your streak starts over.</span></div><button type="button" class="go" id="nextBtn">Got it ▶</button>`;
    $("nextBtn").onclick = nextQ;
    const nb = $("nextBtn");
    if (nb.getBoundingClientRect().bottom > window.innerHeight) nb.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function popup(text) {
    const d = document.createElement("div");
    d.className = "pop"; d.textContent = text; d.setAttribute("aria-hidden", "true");
    document.body.appendChild(d); setTimeout(() => d.remove(), 1200);
  }

  // ---------- Halfway ----------
  function halfScreen() {
    app.innerHTML = `<section class="panel">
      <p class="kicker" style="color:#a8770c">Halfway</p>
      <h2>10 down, ${N - solved()} to go.</h2>
      <div class="stats"><p>✅ <b>${firstTry()}</b> right on the first try</p><p>🔥 Best streak: <b>${st.best}</b></p></div>
      <p>Next up: checks and balances, amendments, and how rights limit what government can do.</p>
      <button type="button" class="go" id="goOn">Keep going ▶</button>
    </section>`;
    $("goOn").onclick = nextQ;
  }

  // ---------- End + exit ticket + turn in ----------
  function mins() { const ms = (st.finished || Date.now()) - (st.started || Date.now()); return Math.max(1, Math.round(ms / 60000)); }
  function endScreen() {
    const ft = firstTry();
    const head = ft >= 18 ? "Constitution expert." : ft >= 14 ? "Strong work." : ft >= 10 ? "You got there." : "You finished. Now lock it in.";
    app.innerHTML = `<section class="panel">
      <p class="kicker" style="color:#a8770c">All 20 done · ${esc(head)}</p>
      <h2>One last step: your exit ticket ↓</h2>
      <div class="stats"><p>✅ <b>${ft} of ${N}</b> right on the first try</p><p>🔥 Best streak: <b>${st.best}</b></p><p>⏱️ About <b>${mins()}</b> min</p></div>
      <div class="sheet"><label for="w1">✍️ Exit ticket: ${esc(PROMPT.label)}</label><p class="stem">Start: <i>${esc(PROMPT.stem)}</i></p><textarea id="w1" rows="4">${esc(st.writing)}</textarea></div>
      <div class="sheet"><label for="studentName">First name + last initial</label><input id="studentName" type="text" autocomplete="off" maxlength="60" placeholder="Like Jordan M." value="${esc(st.name)}"></div>
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in. You can fix your writing and turn it in again." : ""}</p>
      <h3 style="margin:18px 0 4px">How you did on each one</h3>
      <div class="plist">${QS.map(q => { const r = st.res[q.id] || {}; const c = !r.wrong ? "g" : r.wrong === 1 ? "m" : "b"; return `<div class="pitem ${c}">${q.e} ${esc(q.short)}<small>${!r.wrong ? "First try" : r.wrong === 1 ? "Second try" : r.wrong + " misses"} · ${esc(q.opts[0].t)}</small></div>`; }).join("")}</div>
    </section>`;
    $("w1").addEventListener("input", e => { st.writing = e.target.value; save(); });
    $("studentName").addEventListener("input", e => { st.name = e.target.value; save(); });
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg"), box = $("w1"), v = (box.value || "").trim();
    const stop = t => { msg.textContent = t; msg.className = "msg wait"; box.focus(); };
    if (!isTestT()) {
      if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: PROMPT.stem, source: "from today" }); if (junk) { msg.textContent = junk; msg.className = "msg wait"; return; } }
      if (v.length < 40) return stop("Write a little more: 1–2 full sentences.");
      if (/_{2,}/.test(v)) return stop("Fill in the blanks with your own words.");
      const allW = plain(v).match(/[\p{L}']+/gu) || [];
      if (allW.length < 12) return stop("Write it as full sentences: which two principles, and how they work together.");
      if (!PROMPT.must.some(w => plain(v).includes(w))) return stop(PROMPT.mustMsg);
      if (!PROMPT.detail.some(w => plain(v).includes(w))) return stop(PROMPT.detailMsg);
    }
    const nameBox = $("studentName");
    const name = window.classShortName ? window.classShortName(nameBox.value) : nameBox.value.trim();
    if (!/^\S+ [A-Z]\.$/.test(name)) { msg.textContent = "Type your first name and last initial, like Jordan M."; msg.className = "msg wait"; nameBox.focus(); return; }
    st.name = name; save();

    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = firstTry() + " of " + N;
    const byStd = {};
    QS.forEach(q => { byStd[q.std] = byStd[q.std] || [0, 0]; byStd[q.std][1]++; const r = st.res[q.id] || {}; if (r.done && !r.wrong) byStd[q.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    answers["Writing: " + PROMPT.short] = v;
    QS.forEach(q => { const r = st.res[q.id] || {}; answers[q.short] = q.opts[0].t + (r.wrong ? " (after " + r.wrong + " wrong " + (r.wrong === 1 ? "try" : "tries") + ")" : " (first try)"); });
    answers["Best streak"] = String(st.best);
    answers["Minutes"] = String(mins());

    const btn = $("sendBtn");
    btn.disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      btn.textContent = "Turn in again"; btn.disabled = false;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg wait"; btn.disabled = false; }
  }

  // ---------- Router ----------
  function render() {
    document.body.dataset.screen = st.screen;
    hud();
    if (st.screen === "q") return qScreen();
    if (st.screen === "half") return halfScreen();
    if (st.screen === "end") return endScreen();
    return titleScreen();
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; save();
    if (window.classFirstTry) window.classFirstTry.reset();
    render(); window.scrollTo(0, 0);
  };
  if (st.screen !== "title") { $("welcome").textContent = "Welcome back! You've finished " + solved() + " of " + N + "."; $("welcome").hidden = false; }
  render();

  // ---------- Test T. skip bar (shared/turnin.js) ----------
  try {
    const SCREENS = [{ s: "title", label: "Title" }].concat(QS.map((q, i) => ({ s: "q", i, label: "Q" + (i + 1) + " · " + q.short })), [{ s: "end", label: "End + exit ticket" }]);
    const fillTo = i => { QS.slice(0, i).forEach(q => { if (!(st.res[q.id] || {}).done) { st.res[q.id] = { wrong: 0, done: true, tries: [q.opts[0].t] }; } }); st.queue = QS.slice(i).map(q => q.id).filter(id => !(st.res[id] || {}).done); };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => SCREENS.length,
      index: () => st.screen === "title" ? 0 : st.screen === "end" ? SCREENS.length - 1 : Math.max(1, QS.findIndex(q => q.id === st.cur) + 1),
      label: i => SCREENS[i].label,
      go: i => {
        const t = SCREENS[i];
        if (!st.name) st.name = "Test T.";
        if (!st.started) st.started = Date.now();
        st.halfwaySeen = true;
        if (t.s === "title") { st.screen = "title"; }
        else if (t.s === "end") { fillTo(N); st.finished = Date.now(); st.screen = "end"; }
        else { fillTo(t.i); st.cur = QS[t.i].id; if (st.queue[0] !== st.cur) st.queue = [st.cur].concat(st.queue.filter(x => x !== st.cur)); st.order = shuffle([0, 1, 2]); st.picked = null; st.screen = "q"; }
        save(); render();
      },
      solve: () => { if (st.screen !== "q" || st.picked != null) return; const b = document.querySelector('.opt[data-n="0"]'); if (b) b.click(); }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}

  window.PrincipleRush = { QS, PROMPT, state: () => st };
})();
