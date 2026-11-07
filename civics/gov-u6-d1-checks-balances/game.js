// =====================================================================
//  BRANCH WARS  (Government Unit 6 · Day 1 · Checks & Balances)
//  3 rounds. Each round one branch makes a power move (its bar jumps).
//  You answer the quick checks, then pick the counter-move.
//  Goal: keep Congress 📜, President ✒️ and Courts 🔨 within 2 of each other.
//  7 checks (6 Gov.4, 1 Gov.9), 3 counter-moves, 4 endings, 2 writing answers.
//  A wrong answer = you stalled, so that round's attacker grabs +1 (once per check).
//  Students never see a count of their wrong answers (teacher-only, in the turn-in).
//  Polished 11/3 from the old UnitGame version: same assignmentId, new save key.
//  Turn-in via shared/turnin.js (same payload shape as UnitGame finish()).
// =====================================================================
(function () {
  "use strict";
  const KEY = "gov-u6-d1-checks-balances-v3";
  const ASSIGNMENT_ID = "gov-u6-d1-checks-balances";
  const TITLE = "Government · Unit 6 · Day 1 · Branch Wars: Checks & Balances";
  const STANDARD = "SS.9-12.Gov.4";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());   // Test T. (teacher) skips locks and writing rules
  const START = { C: 5, P: 5, J: 5 };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = n => Math.max(1, Math.min(10, n));

  const BR = { C: { name: "Congress", icon: "📜", cls: "c" }, P: { name: "President", icon: "✒️", cls: "p" }, J: { name: "Courts", icon: "🔨", cls: "j" } };

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite, cls) => `<div class="exhibit ${cls || ""}"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const mc = t => `<div class="mcrow"><span class="mcface" aria-hidden="true">📣</span><div class="say"><span class="who-s">Announcer</span>${t}</div></div>`;
  const vs = (a, b) => `<div class="vs"><span class="fbadge ${BR[a].cls}">${BR[a].icon} ${BR[a].name}</span><b>VS</b><span class="fbadge ${BR[b].cls}">${BR[b].icon} ${BR[b].name}</span></div>`;
  const parch = (who, q) => `<div class="parch"><p class="quote">“${q}”</p><p class="qwho">${who}</p></div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  const voteRow = (label, yes, total, need) => {
    const pct = Math.round(yes / total * 100), np = Math.round(need / total * 100);
    return `<div class="vrow"><span class="vl">${label}</span><span class="vbar"><span class="yes" style="width:${pct}%"></span><span class="need" style="left:${np}%"></span></span><span class="vn"><b>${yes}</b> / ${total}</span></div>`;
  };

  // ---------------- Rounds (HUD chips + word help) ----------------
  const ROUNDS = [
    { icon:"🥊", tag:"Veto Showdown", foe:"P", terms:[["Veto","the President blocks a bill"],["Override","Congress passes it anyway"],["Two-thirds","2 out of every 3 votes"]] },
    { icon:"🔨", tag:"Court Check", foe:"J", terms:[["Judicial review","courts check laws"],["Warrant","a judge's OK to search"],["Confirm","the Senate approves a judge pick"]] },
    { icon:"💰", tag:"Power of the Purse", foe:"P", terms:[["Spending law","Congress approves how money is used"],["Impeach","the House charges an official"],["Convict","the Senate finds an official guilty"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1].
  // hit: the round's power move, applied once when the step first opens.
  // event: a counter-move. fx moves the bars.
  const STEPS = [
    { id:"c1", type:"check", r:0, std:"Gov.4", kicker:"The rule", short:"Why divide power?", stamp:"CHECKS",
      scene:()=>ex("THREE BRANCHES",ln("📜","Congress makes laws")+ln("✒️","President carries out laws")+ln("🔨","Courts review laws")),
      ask:"Why split power between branches?", options:["Each branch can check another","One branch can act alone","Courts run the whole government","The President makes every law"],
      miss:["Checks stop one branch from taking all the power.","The game is about shared power.","Courts review laws, but do not run everything."],
      hint:"A check helps stop a power grab.", reveal:"Checks and balances let each branch limit the others." },

    { id:"c2", type:"check", r:0, std:"Gov.4", kicker:"Round 1 · Veto", short:"What is a veto?", stamp:"VETO",
      hit:{P:1}, hitText:"The President blocks a bill.",
      scene:()=>vs("P","C")+ex("THE BILL",ln("📜","Congress passes a bill")+ln("✒️","President says NO")),
      ask:"What is the President's check?", options:["Veto the bill","Strike down a law","Confirm a judge","Impeach a member of Congress"],
      miss:["That is the President's veto.","Courts can strike down laws.","The Senate confirms judges."],
      hint:"The President can say no to a bill.", reveal:"A veto blocks a bill passed by Congress." },

    { id:"c3", type:"check", r:0, std:"Gov.4", kicker:"Round 1 · Override", short:"Can Congress override?", stamp:"VOTE",
      scene:()=>ex("OVERRIDE VOTE",voteRow("House",300,435,290)+voteRow("Senate",64,100,67)+"<p class=\"vkey\"><span class=\"needk\"></span> 2/3 needed in both</p>"),
      ask:"Does Congress override the veto?",
      options:["No. The Senate needs 67","Yes. Both got over half","No. The House needs 435","Yes. The House reached 290"],
      miss:["The Senate is short of 67 votes.","An override needs 2/3, not just over half.","The House reached its 2/3 mark.","Both chambers must reach 2/3."],
      hint:"Both bars must pass the line.", reveal:"Congress can override a veto with 2/3 of the House and Senate." },

    { id:"e1", type:"event", r:0, kicker:"Round 1 · Your move", short:"Respond to a veto",
      scene:()=>mc("The veto stands. What should Congress do?"), ask:"Choose a move.",
      cards:[
        {icon:"🛠️",t:"Revise the bill",line:"Find more votes; try again",fx:{C:1,P:-1},res:"The Senate reaches 67. Congress overrides the veto.",cause:"Revised bill and won votes"},
        {icon:"📜",t:"Override now",line:"Vote again with the same numbers",fx:{C:-1,P:1},res:"The Senate still has only 64 votes. The veto stands.",cause:"Tried an override too soon"},
        {icon:"🏳️",t:"Drop the bill",line:"No new vote",fx:{C:-1,P:1},res:"The veto ends this bill.",cause:"Accepted the veto"}
      ],
      reveal:"Use the override only when both chambers have 2/3." },

    { id:"c4", type:"check", r:1, std:"Gov.4", kicker:"Round 2 · Court review", short:"What is judicial review?", stamp:"REVIEW",
      hit:{J:1}, hitText:"The Court blocks a law.",
      scene:()=>vs("J","C")+ex("NEW LAW",ln("📱","Police may search any phone")+ln("📜","No warrant needed")),
      ask:"What check can the Court use?", options:["Judicial review","A veto","Senate confirmation","Power of the purse"],
      miss:["Courts can review laws and strike ones that break the Constitution.","The President vetoes bills.","The Senate confirms the President's judge picks."],
      hint:"Courts can strike laws that break the Constitution.",
      reveal:"Judicial review lets courts strike down unconstitutional laws.",
      real:"In Riley v. California (2014), the Supreme Court said police usually need a warrant to search a phone." },

    { id:"e2", type:"event", r:1, kicker:"Round 2 · Open seat", short:"Check a judge pick",
      scene:()=>ex("WHO DOES WHAT?",ln("✒️","President picks a judge")+ln("📜","Senate votes to confirm")),
      ask:"Choose the Senate's move.",
      cards:[
        {icon:"🎤",t:"Hold a hearing",line:"Ask questions, then vote",fx:{C:1},res:"The Senate holds a hearing and votes. It confirms the judge.",cause:"Held hearing and voted"},
        {icon:"✅",t:"Approve at once",line:"Skip questions and vote",fx:{P:1,C:-1},res:"The Senate skips its check on the President's pick.",cause:"Skipped the Senate check"},
        {icon:"🚫",t:"Never vote",line:"Leave the seat open",fx:{J:-1,C:1},res:"The seat stays open. The Senate never uses its confirmation power.",cause:"Left the seat open"}
      ],
      reveal:"The President picks. The Senate confirms or rejects." },

    { id:"c5", type:"check", r:2, std:"Gov.4", kicker:"Round 3 · Spending", short:"Who controls federal spending?", stamp:"THE PURSE",
      hit:{P:2}, hitText:"The President spends money Congress refused.",
      scene:()=>vs("P","C")+ex("FEDERAL FUNDS",ln("✒️","President orders $5 billion spent")+ln("📜","Congress did not approve it")),
      ask:"Which branch controls federal spending?",
      options:["Congress, by passing spending laws","The President, in an emergency","Courts, in each case","State governors"],
      miss:["Federal spending needs Congress's approval.","An emergency does not give the President Congress's spending power.","Courts decide cases, not the budget."],
      hint:"Who writes the laws that approve spending?", reveal:"Congress controls federal spending: the power of the purse." },

    { id:"e3", type:"event", r:2, kicker:"Round 3 · Your move", short:"Stop spending without approval",
      scene:()=>mc("The President spent the money anyway. You lead Congress."),
      ask:"Choose a check.",
      cards:[
        {icon:"💰",t:"Block more funds",line:"Set spending in a new law",fx:{C:1,P:-1},res:"Congress uses its spending power to limit the next payment.",cause:"Set limits in a spending law"},
        {icon:"🔥",t:"Impeach at once",line:"Skip an investigation",fx:{C:1,P:-1},res:"The House can impeach, but a Senate trial still follows.",cause:"Started impeachment at once"},
        {icon:"🤷",t:"Allow the spending",line:"Take no action",fx:{C:-1,P:2},res:"The President gets more control of federal funds.",cause:"Allowed spending without approval"}
      ],
      reveal:"Congress can check spending by writing the budget into law." },

    { id:"c6", type:"check", r:2, std:"Gov.4", kicker:"Round 3 · Removal", short:"Who can remove a president?", stamp:"TRIAL",
      scene:()=>ex("IMPEACHMENT",ln("📜","House votes to impeach")+ln("📜","Senate holds a trial")+ln("✓","2/3 of Senate needed to remove")),
      ask:"What must happen to remove a president?",
      options:["2/3 of the Senate votes to convict","The House impeaches by itself","The Court orders removal","The President vetoes the charges"],
      miss:["The Senate must convict by 2/3 vote to remove.","The House impeaches; the Senate holds the trial.","Courts do not remove a president.","A president cannot veto impeachment."],
      hint:"The House charges. The Senate holds the trial.", reveal:"The House impeaches. A 2/3 Senate vote removes the president." },

    { id:"c7", type:"check", r:2, std:"Gov.4", kicker:"Final check · Judges", short:"Who checks a judge pick?", stamp:"CONFIRM",
      scene:()=>vs("P","C")+ex("JUDGE PICK",ln("✒️","President names a judge")+ln("📜","Senate can approve or reject")),
      ask:"How does the Senate check the President?",
      options:["Confirm or reject the judge","Veto the judge's court rulings","Choose the judge for the President","Remove the judge by impeachment"],
      miss:["The Senate votes to confirm or reject the pick.","A veto applies to bills, not court rulings.","The President nominates. The Senate votes.","Impeachment is a separate process."],
      hint:"The President picks; the Senate votes.",
      reveal:"Senate confirmation is a check on the President's power to appoint judges." },

    { id:"end", type:"ending", r:2, kicker:"Final bell" },
    { id:"write", type:"write", r:2, kicker:"Quick reflection" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const EVENTS = STEPS.filter(s => s.type === "event");
  const HITS = STEPS.filter(s => s.hit);

  const PROMPTS = [
    { id:"check", short:"Checks and balances", label:"Name one check from the game. How did it limit a branch's power?",
      bank:["veto","override","judicial review","confirmation","spending law","impeachment"],
      stem:"One check is ___. It limits power by ___.", min:35, newWords:3,
      mustAll:[["veto","override","judicial review","confirm","confirmation","spending","purse","impeach"],["because","stop","limit","block","check","prevent","keep"]],
      mustMsg:"Name a check (like a veto or judicial review) and say how it limits power." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: Object.assign({}, START), picks: {}, wrong: {}, done: {}, hits: {}, stall: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.fx || !st.picks) st = fresh();
  st.hits = st.hits || {}; st.stall = st.stall || {};
  // Shared Chromebooks: a different student signed in on this device starts clean.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const bars = () => [st.fx.C, st.fx.P, st.fx.J];
  const spread = () => Math.max(...bars()) - Math.min(...bars());
  const balanced = () => spread() <= 2;
  const roundDone = i => STEPS.filter(s => s.r === i && (s.type === "check" || s.type === "event")).every(s => s.type === "check" ? st.done[s.id] : st.picks[s.id] != null);
  function addFx(fx) { Object.keys(fx || {}).forEach(k => { st.fx[k] = clamp(st.fx[k] + fx[k]); }); }

  // ---------------- HUD ----------------
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    [["C", "c"], ["P", "p"], ["J", "j"]].forEach(([k, id]) => { $(id + "Fill").style.width = (st.fx[k] * 10) + "%"; $(id + "Num").textContent = st.fx[k]; });
    const ok = balanced();
    $("balance").textContent = ok ? "Balanced" : "Tipping!";
    $("balance").className = ok ? "ok" : "off";
    // The scale tips when the bars are out of balance (left if the President or Congress is on top, right if the Courts are).
    const v = st.fx, top = ["P", "C", "J"].reduce((a, k) => v[k] > v[a] ? k : a, "P");
    const beam = document.getElementById("beam"); if (beam) beam.setAttribute("transform", `rotate(${ok ? 0 : top === "J" ? 16 : -16} 30 10)`);
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    const off = ["ending", "write"].includes(step.type);
    $("rounds").innerHTML = ROUNDS.map((p, i) => `<span class="${roundDone(i) ? "won" : i === step.r && !off ? "now" : ""}">${roundDone(i) ? "✓" : p.icon} <i>R${i + 1}</i>${i === step.r && !off ? " " + p.tag : ""}</span>`).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
  }
  function bump(k, delta) {
    const el = $("m" + k); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + (delta > 0 ? "up" : "down");
    f.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  const snap = () => Object.assign({}, st.fx);
  function moved(before) {
    hud();
    ["C", "P", "J"].forEach(k => bump(k, st.fx[k] - before[k]));
    const sc = $("scaleBox"); if (sc && balanced() !== (Math.max(before.C, before.P, before.J) - Math.min(before.C, before.P, before.J) <= 2)) { sc.classList.remove("shake"); void sc.offsetWidth; sc.classList.add("shake"); }
    drawRing();
  }
  const fxChips = fx => ["C", "P", "J"].filter(k => fx[k]).map(k => `<span class="fx ${BR[k].cls}">${BR[k].icon} ${fx[k] > 0 ? "+" : "−"}${Math.abs(fx[k])}</span>`).join("") || `<span class="fx n">±0</span>`;
  const fxPlain = fx => "(" + (["C", "P", "J"].filter(k => fx[k]).map(k => BR[k].icon + " " + (fx[k] > 0 ? "+" : "−") + Math.abs(fx[k])).join(" ") || "±0") + ")";
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    host.querySelectorAll(".stamp").forEach(s => s.remove());
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // The ring: three fighters who grow and shrink with their power.
  function ringHtml() {
    return `<div class="ring" id="ring" aria-label="Fighters in the ring">${["C", "P", "J"].map(k => `<div class="fighter ${BR[k].cls}" id="f${k}"><span class="crown" aria-hidden="true">👑</span><span class="ftok" aria-hidden="true">${BR[k].icon}</span><span class="fname">${BR[k].name}</span></div>`).join("")}</div>`;
  }
  function drawRing() {
    const v = bars(), top = Math.max(...v);
    ["C", "P", "J"].forEach(k => {
      const f = $("f" + k); if (!f) return;
      f.style.setProperty("--s", (0.62 + st.fx[k] * 0.075).toFixed(2));
      f.classList.toggle("king", !balanced() && st.fx[k] === top);
    });
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml) {
    const off = ["ending", "write"].includes(step.type);
    const R = ROUNDS[step.r];
    const termsBtn = off ? "" : `<button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Word help</button>`;
    app.innerHTML = `<div class="board"><div class="scene" id="scene"><p class="kick">${esc(step.kicker)}</p>${ringHtml()}<div id="hitBox"></div>${sceneHtml}</div>
      <div class="play" id="play">${termsBtn ? `<div class="ptop">${termsBtn}</div>` : ""}<div id="termsBox"></div>${playHtml}</div></div>`;
    drawRing();
    if ($("termsBtn")) $("termsBtn").onclick = () => {
      const box = $("termsBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="terms">${R.terms.map(t => `<p><b>${t[0]}</b>: ${t[1]}</p>`).join("")}</div>`;
      $("termsBtn").setAttribute("aria-expanded", String(!open));
    };
    // The round's power move lands the first time this step opens.
    if (step.hit) {
      const fresh = !st.hits[step.id];
      if (fresh) { const b = snap(); addFx(step.hit); st.hits[step.id] = true; save(); setTimeout(() => moved(b), 350); }
      $("hitBox").innerHTML = `<div class="hit${fresh ? " new" : ""}"><span>💥 ${esc(step.hitText)}</span><span class="fxrow">${fxChips(step.hit)}</span></div>`;
    }
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "ending") return "🔔 Final bell ▶";
    if (nx.r !== step.r) return "Next: " + ROUNDS[nx.r].icon + " Round " + (nx.r + 1) + " ▶";
    return "Next ▶";
  }
  function nextBtn(step) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn";
    b.textContent = nextLabel(step);
    b.onclick = () => { st.step++; save(); render(); window.scrollTo(0, 0); };
    return b;
  }
  function addNext(step, html, quiet, extra) {
    const a = $("after"); if (!a || a.dataset.done) return; a.dataset.done = "1";
    if (html) a.insertAdjacentHTML("beforeend", reveal(html) + (extra ? src(extra) : ""));
    a.appendChild(nextBtn(step));
    if (!quiet) { const n = $("nextBtn"); if (n && n.scrollIntoView) n.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  }

  // ---- Title ----
  function title() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title">
      <div class="tart" aria-hidden="true">
        <p class="poster">TONIGHT · 3 ROUNDS</p>
        <div class="ring big">${["C", "P", "J"].map(k => `<div class="fighter ${BR[k].cls}" style="--s:1.05"><span class="ftok">${BR[k].icon}</span><span class="fname">${BR[k].name}</span></div>`).join("")}</div>
        ${mc("One rule: nobody gets to be king.")}
      </div>
      <div class="tcopy">
        <p class="tk">Government · Unit 6 · Day 1</p>
        <h1>Branch Wars</h1>
        <p class="recap">Three branches. Each can check the others.</p>
        <ul class="how"><li><span>1</span>Spot the power move</li><li><span>2</span>Name the check</li><li><span>3</span>Choose a response</li></ul>
        <p class="tline">🎯 Keep any one branch from taking over.</p>
        <p class="tchips"><span>⏱️ 20–25 min</span><span>🛡️ 7 checks</span><span>🥊 3 power moves</span><span>✏️ 1 short answer</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">🔔 Ring the bell</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">Some events are made up. The checks are based on the Constitution. Standard: SS.9-12.Gov.4.</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("nameBox").focus(); return; }
      try { if (window.classClaimDevice) window.classClaimDevice(fixed); } catch (e) {}
      st = fresh(); st.name = fixed; st.step = 0;
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      save(); render(); window.scrollTo(0, 0);
    };
    $("nameBox").addEventListener("keydown", e => { if (e.key === "Enter") $("startBtn").click(); });
  }

  // ---- Wrong-answer lock ----
  let locked = false;
  function runLock(text, msgEl, onDone, secs) {
    locked = true;
    let left = secs;
    const tick = () => {
      if (!document.body.contains(msgEl)) { locked = false; return; }
      msgEl.innerHTML = `💭 Not quite. ${esc(text)} <span class="cd">${left}</span>`;
      msgEl.className = "msg bad";
      if (left-- <= 0) { locked = false; msgEl.innerHTML = `💭 ${esc(text)} Try again.`; onDone(); return; }
      setTimeout(tick, 1000);
    };
    tick();
  }
  function markWrong(step, why) {
    const before = snap();
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    // Stalling lets this round's attacker grab +1 (only once per check, so one slip can't wreck the game).
    const foe = ROUNDS[step.r].foe;
    let grabbed = false;
    if (!st.stall[step.id]) { st.stall[step.id] = true; st.fx[foe] = clamp(st.fx[foe] + 1); grabbed = true; }
    st.lockUntil = Date.now() + (isTestT() ? 0 : LOCK) * 1000;
    st.lockMsg = why;
    save(); moved(before);
    stamp(grabbed ? "⏳ STALLED · " + BR[foe].icon + " +1" : "⏳ STALLED", "bad");
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    st.done[step.id] = true; save(); hud();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><p class="warn">⏳ A miss lets ${BR[ROUNDS[step.r].foe].icon} ${BR[ROUNDS[step.r].foe].name} grab power.</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) return solved(step, true);
    draw(step);
    if (lockLeft() > 0) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || step.hint, $("qmsg"), () => draw(step), lockLeft()); }
  }
  function draw(step) {
    const area = $("replies"); if (!area) return;
    const before = [...area.querySelectorAll(".reply")].map(x => x.textContent).join("|");
    let order = shuffle(step.options.map((t, n) => ({ t, n })));
    for (let k = 0; k < 8 && before && order.map(o => o.t).join("|") === before; k++) order = shuffle(order);
    area.replaceChildren();
    order.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "reply"; b.textContent = o.t;
      b.onclick = () => pick(step, o, b);
      area.appendChild(b);
    });
  }
  function pick(step, o, btn) {
    if (locked) return;
    if (o.n === 0) { btn.classList.add("right"); markRight(step); setTimeout(() => solved(step, false), 450); return; }
    btn.classList.add("wrong");
    const why = (step.miss && step.miss[o.n - 1]) || step.hint;
    markWrong(step, why);
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, $("qmsg"), () => draw(step), isTestT() ? 0 : LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>✓ ${esc(step.options[0])}</span></div>`;
    const w = document.querySelector("#play .warn"); if (w) w.remove();
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet, step.real);
  }

  // ---- Event: a counter-move ----
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><span class="dline">${esc(c.line)}</span></button>`; }).join("")}</div><p class="peek">📜 ✒️ 🔨 You'll see the effect after you pick.</p>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      const before = snap();
      st.picks[step.id] = i;
      addFx(c.fx);
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span><b>${esc(c.t)}</b><br><span class="dline">${esc(c.line)}</span></span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${esc(c.res)}</p>`;
    if (!quiet) stamp(balanced() ? "BALANCED" : "TIPPING!", balanced() ? "" : "bad");
    addNext(step, step.reveal, quiet);
  }

  // ---- Endings ----
  function ending() {
    const v = st.fx;
    let e;
    if (balanced()) e = { key: "No King Here", out: "Balanced: no king", icon: "⚖️", cls: "best", text: "Every branch got checked. Slow? Yes. Safe? Also yes. That's the point." };
    else {
      const top = ["P", "C", "J"].reduce((a, k) => v[k] > v[a] ? k : a, "P");
      if (top === "P") e = { key: "President Becomes King", out: "Out of balance: President took over", icon: "👑", cls: "low", text: "The President spends, picks, and blocks at will. Congress just watches. Madison's nightmare." };
      else if (top === "C") e = { key: "Congress Takes Over", out: "Out of balance: Congress took over", icon: "🏛️", cls: "mid", text: "Congress won every fight, even the ones it shouldn't. Now nobody checks Congress." };
      else e = { key: "Judges Rule", out: "Out of balance: Courts took over", icon: "🔨", cls: "mid", text: "The courts have the last word on everything. Nobody checks them." };
    }
    const causes = [];
    STEPS.forEach(s => {
      if (s.hit) causes.push(s.hitText.replace(/!$/, "") + " " + fxPlain(s.hit));
      if (s.type === "event" && st.picks[s.id] != null) { const k = s.cards[st.picks[s.id]]; causes.push("You: " + k.cause + " " + fxPlain(k.fx)); }
    });
    if (Object.keys(st.stall).length) causes.push("Stalls on checks gave attackers power");
    e.causes = causes;
    return e;
  }
  const barsLine = () => `📜 Congress ${st.fx.C} · ✒️ President ${st.fx.P} · 🔨 Courts ${st.fx.J}`;

  function endingStep(step) {
    const e = ending();
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">${barsLine()}</p></div><div id="after"></div>`);
    const b = nextBtn(step); b.textContent = "🎙️ Post-fight interview ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `${mc("Reporter here. Two questions for the winner.")}<div class="typed"><p><b>Result:</b> ${e.icon} ${esc(e.key)}</p><p>${barsLine()}</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">🎙️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="Write 1–2 short sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: use a real example from today, like the veto record or 0 removals.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Turn in ▶"}</button>
         <p id="sendMsg" class="msg" role="status" aria-live="polite">${sent ? "✓ Turned in. You can fix your answers and turn in again." : ""}</p>
       </div>`);
    PROMPTS.forEach(p => {
      const box = $("w_" + p.id);
      box.addEventListener("input", () => { st.writing[p.id] = box.value; save(); });
    });
    document.querySelectorAll(".mini[data-for]").forEach(btn => btn.onclick = () => {
      const p = PROMPTS.find(x => x.id === btn.dataset.for), box = $("w_" + p.id);
      if (!box.value.trim()) { box.value = p.stem; st.writing[p.id] = box.value; save(); }
      box.focus(); const i = box.value.indexOf("___"); if (i >= 0) box.setSelectionRange(i, i + 3);
    });
    $("sendBtn").onclick = () => send(e);
  }

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  async function send(e) {
    const msg = $("sendMsg");
    for (const p of (isTestT() ? [] : PROMPTS)) {
      const n = PROMPTS.indexOf(p) + 1;
      const box = $("w_" + p.id), v = (box.value || "").trim();
      const bad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
        if (junk) { msg.textContent = "For answer " + n + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return bad("Write a little more for answer " + n + " (1–2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words in answer " + n + ".");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas in answer " + n + ". Use details from the game.");
      const has = w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v) + " ");
      if (p.mustAll.some(g => !g.some(has))) return bad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort((a, b) => parseFloat(a.split(".")[1]) - parseFloat(b.split(".")[1])).map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    STEPS.forEach(s => {
      if (s.type === "event" && st.picks[s.id] != null) { const c = s.cards[st.picks[s.id]]; answers["Choice · " + s.short] = c.t + ": " + c.line; }
      if (s.type === "check") {
        const w = st.wrong[s.id];
        answers[s.std + " · " + s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Final power bars"] = "Congress " + st.fx.C + " · President " + st.fx.P + " · Courts " + st.fx.J;

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Fight's over!"; msg.className = "msg good";
      $("sendBtn").textContent = "✓ Turned in";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------------- Router ----------------
  let firstRender = true;
  function render() {
    if (!firstRender && $("welcome")) $("welcome").hidden = true;
    firstRender = false;
    locked = false;
    document.body.classList.toggle("on-title", st.step < 0);
    hud();
    if (st.step < 0) return title();
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    document.body.dataset.step = step.id;
    if (step.type === "check") return check(step);
    if (step.type === "event") return event(step);
    if (step.type === "ending") return endingStep(step);
    return writeStep(step);
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; st.step = name ? 0 : -1;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0 && st.name) {
    const w = $("welcome");
    w.innerHTML = `<span>👋 Welcome back, ${esc(st.name)}! You're on step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}.</span>`;
    const notMe = document.createElement("button");
    notMe.type = "button"; notMe.className = "notme"; notMe.textContent = "Not " + st.name + "? Start fresh";
    notMe.onclick = () => {
      try { localStorage.removeItem(KEY); localStorage.removeItem("site-student-name"); } catch (e) {}
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      st = fresh(); save(); location.reload();
    };
    w.appendChild(notMe); w.hidden = false;
  }
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current check.
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => STEPS[i].short || STEPS[i].kicker || STEPS[i].type,
      go: i => { if (!st.name) st.name = "Test T."; st.step = i; st.lockUntil = 0; save(); render(); },
      solve: () => {
        const s = STEPS[Math.min(st.step, TOTAL - 1)]; if (!s) return;
        if (s.type === "check" && !st.done[s.id]) { st.done[s.id] = true; st.lockUntil = 0; save(); render(); }
        else if (s.type === "event" && st.picks[s.id] == null) { const b = document.querySelector("#dbox .dcard"); if (b) b.click(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
