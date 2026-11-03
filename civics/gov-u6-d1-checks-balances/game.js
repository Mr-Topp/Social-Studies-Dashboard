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
  const KEY = "gov-u6-d1-checks-balances-v2";
  const ASSIGNMENT_ID = "gov-u6-d1-checks-balances";
  const TITLE = "Government · Unit 6 · Day 1 · Branch Wars: Checks & Balances";
  const STANDARD = "SS.9-12.Gov.4, SS.9-12.Gov.9";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;
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
    { icon: "🥊", tag: "Veto Showdown", foe: "P", terms: [["Bill", "a plan for a law"], ["Veto", "the President's NO on a bill"], ["Override", "Congress beats a veto"], ["Two-thirds (2/3)", "2 out of every 3 votes"]] },
    { icon: "🔨", tag: "Courts Strike Back", foe: "J", terms: [["Unconstitutional", "breaks the Constitution"], ["Warrant", "a judge's OK to search"], ["Nominee", "the person picked for a job"], ["Confirm", "approve"]] },
    { icon: "💰", tag: "The Power Grab", foe: "P", terms: [["Treasury", "where the country's money is kept"], ["Appropriation", "a law that says how money is spent"], ["Impeach", "charge an official with wrongdoing"], ["Federal", "national, for the whole country"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1].
  // hit: the round's power move, applied once when the step first opens.
  // event: a counter-move. fx moves the bars.
  const STEPS = [
    // ===== Round 1 · Veto Showdown =====
    { id: "c1", type: "check", r: 0, std: "Gov.4", kicker: "Round 1 · Why have rules at all?", short: "Fed 51: why limit power", stamp: "TRUE",
      scene: () => mc("Why fence in the fighters? Ask Madison.") +
        parch("James Madison · Federalist No. 51 (1788)", "If men were angels, no government would be necessary. If angels were to govern men, neither… controls on government would be necessary."),
      ask: "What's Madison's point?",
      options: ["Leaders are human, so limit power", "Only good people should be leaders", "Good laws mean we need no government", "People are evil, so take rights"],
      miss: ["He says nobody is an angel. You can't count on good leaders.", "He says we DO need government, because people aren't angels.", "He's not taking rights away. He's limiting the people in power."],
      hint: "Are leaders angels? So what do they need?",
      reveal: "<b>Separation of powers</b> splits the job. <b>Checks</b> let each branch block the others." },

    { id: "c2", type: "check", r: 0, std: "Gov.4", kicker: "Round 1 · The bill comes back", short: "President rejects bill = veto", stamp: "VETO",
      hit: { P: 1 }, hitText: "The President blocks your bill!",
      scene: () => vs("P", "C") +
        ex("Bill from Congress", `<p class="docT">TEEN DATA PRIVACY ACT</p>${ln("📱", "Apps can't sell teens' data.")}${ln("✅", "Passed House + Senate")}<div class="rstamp">RETURNED · NOT SIGNED</div>`, "Made-up bill. The rules are real."),
      ask: "The President's NO on a bill is called…",
      options: ["A veto", "An override", "Impeachment", "Judicial review"],
      miss: ["An override is Congress fighting BACK against this move.", "Impeachment is charging an official with wrongdoing. Nobody's on trial.", "Judicial review is what courts do. This came from the President."],
      hint: "It's the President's check on Congress.",
      reveal: "<b>Veto</b>: the President's NO on a bill. Checks Congress." },

    { id: "c3", type: "check", r: 0, std: "Gov.4", kicker: "Round 1 · Override vote", short: "Override needs 2/3 of both (Senate 67)", stamp: "COUNTED",
      scene: () => mc("Congress votes to override!") +
        ex("Vote board", voteRow("House", 300, 435, 290) + voteRow("Senate", 64, 100, 67) + `<p class="vkey"><span class="needk"></span> 2/3 line</p>`, "Override: 2/3 vote in the House AND the Senate (U.S. Constitution, Article I, Section 7)."),
      ask: "Did the override work?",
      options: ["No. The Senate needed 67", "Yes. Both got more than half", "No. The House needed 435", "Yes. The House beat 290"],
      miss: ["Half isn't enough. An override needs 2/3.", "The House only needs 2/3, which is 290. It got 300.", "The House did. But the Senate has to reach 2/3 too."],
      hint: "Find the 2/3 line on each bar. Did BOTH reach it?",
      reveal: "<b>Override</b>: Congress beats a veto with 2/3 of the House AND Senate." },

    { id: "e1", type: "event", r: 0, kicker: "Round 1 · Your counter-move", short: "Round 1: after the veto",
      scene: () => mc("You run Congress. The veto stands. Now what?") +
        ex("Real record since 1789", `<div class="rec"><p><b>2,599</b><small>vetoes</small></p><p class="rare"><b>112</b><small>overridden</small></p></div>`, "U.S. Senate, Summary of Bills Vetoed, 1789–present"),
      ask: "Pick your move.",
      cards: [
        { icon: "🛠️", t: "Fix the bill", line: "Win 3 more senators, vote again", fx: { C: 1, P: -1 }, res: "New version. Senate: 68 yes. Override! It's law.", cause: "Fixed the bill, overrode" },
        { icon: "💸", t: "Cut the President's pay", line: "Payback in the budget", fx: { C: -1, P: 1 }, res: "Blocked. The Constitution bans changing a president's pay mid-term.", cause: "Tried illegal payback" },
        { icon: "🏳️", t: "Drop the bill", line: "Move on, no fight", fx: { C: -1, P: 2 }, res: "The President wins without a fight. Next veto comes easier.", cause: "Gave up after the veto" }
      ],
      reveal: "A check only works if you use it by the rules." },

    // ===== Round 2 · Courts Strike Back =====
    { id: "c4", type: "check", r: 1, std: "Gov.4", kicker: "Round 2 · Breaking news", short: "Court strikes law = judicial review", stamp: "STRUCK DOWN",
      hit: { J: 1 }, hitText: "The Court throws out Congress's law!",
      scene: () => vs("J", "C") +
        `<div class="phone"><p class="ptop2">🔴 BREAKING</p><p>New law: police can search <b>any phone</b>, no warrant.</p></div>` +
        parch("U.S. Constitution · 4th Amendment", "The right of the people to be secure… against unreasonable searches and seizures, shall not be violated…"),
      ask: "Which power did the Court use?",
      options: ["Judicial review", "Judicial appointment", "A veto", "Impeachment"],
      miss: ["Appointing judges is the President's job. Here, judges tossed a law.", "Only the President vetoes. This came from judges.", "Impeachment removes officials. The Court tossed a law."],
      hint: "Courts can toss a law that breaks the Constitution.",
      reveal: "<b>Judicial review</b>: courts strike laws that break the Constitution.",
      real: "Real case: in <i>Riley v. California</i> (2014), the Court said police usually need a warrant to search your phone." },

    { id: "e2", type: "event", r: 1, kicker: "Round 2 · A Supreme Court seat opens", short: "Round 2: Supreme Court pick",
      scene: () => mc("Supreme Court seat open! The President picks. You run the Senate.") +
        ex("The rule", ln("✒️", "President <b>picks</b> judges") + ln("📜", "Senate <b>confirms</b> (approves)") + ln("♾️", "Judges serve for life"), "U.S. Constitution, Articles II and III"),
      ask: "Pick your move.",
      cards: [
        { icon: "🎤", t: "Hearings, then vote", line: "Grill the pick, then decide", fx: { C: 1 }, res: "4 days of hard questions. Confirmed 55–45. Both branches had a say.", cause: "Held hearings, then voted" },
        { icon: "✅", t: "Rubber-stamp it", line: "Confirm today, no questions", fx: { P: 2, C: -2 }, res: "The President basically picked alone. The Senate skipped its check.", cause: "Rubber-stamped the pick" },
        { icon: "🚫", t: "Never vote", line: "Leave the seat empty", fx: { C: 1, J: -3 }, res: "Empty over a year. 8 justices, so cases tie 4–4. (Real: this happened in 2016.)", cause: "Left the Court a seat short" }
      ],
      reveal: "<b>Confirm</b>: the Senate approves or rejects the President's picks." },

    // ===== Round 3 · The Power Grab =====
    { id: "c5", type: "check", r: 2, std: "Gov.4", kicker: "Round 3 · Follow the money", short: "Power of the purse = Congress", stamp: "PURSE",
      hit: { P: 2 }, hitText: "President spends $5B Congress refused!",
      scene: () => vs("P", "C") +
        `<div class="check"><p class="ckt">U.S. TREASURY</p><p>Pay to: <b>Mega Project</b></p><p class="amt">$5,000,000,000</p><p class="sig">— The President</p></div>` +
        parch("U.S. Constitution · Article I, Section 9", "No Money shall be drawn from the Treasury, but in Consequence of Appropriations made by Law…"),
      ask: "Who decides how federal money is spent?",
      options: ["Congress, through spending laws", "The President, in emergencies", "The Supreme Court, case by case", "Each state's governor"],
      miss: ["Spending needs a law. The President doesn't make laws.", "Courts judge cases. They don't write budgets.", "This is federal (national) money, not state money."],
      hint: "Money needs a law. Who makes laws?",
      reveal: "<b>Power of the purse</b>: only Congress decides federal spending." },

    { id: "e3", type: "event", r: 2, kicker: "Round 3 · Final move", short: "Round 3: respond to spending grab",
      scene: () => mc("The President spends it anyway. “It's an emergency!” You run Congress."),
      ask: "Pick your final move.",
      cards: [
        { icon: "⚖️", t: "Sue + cut funds", line: "Court case, smaller budget", fx: { J: 1, P: -2 }, res: "A federal court rules the spending broke the law. Two branches checked one.", cause: "Sued and cut funds" },
        { icon: "🔥", t: "Impeach now", line: "House charges the President", fx: { C: 2, P: -1 }, res: "The House impeaches. The Senate falls short of 67. Months of war over one money fight.", cause: "Impeached over one money fight" },
        { icon: "🤷", t: "Let it slide", line: "Skip the fight", fx: { C: -1, P: 2 }, res: "Next year, the President spends even more without asking.", cause: "Let the spending slide" }
      ],
      reveal: "<b>Impeach</b>: the House charges. The Senate holds a trial. 2/3 removes." },

    { id: "c6", type: "check", r: 2, std: "Gov.4", kicker: "Round 3 · The real record", short: "Impeachment: removal needs 2/3 of Senate", stamp: "ON RECORD",
      scene: () => ex("Real presidents impeached by the House", `<table class="tbl"><tr><th>Year</th><th>President</th><th>Removed?</th></tr><tr><td>1868</td><td>Andrew Johnson</td><td class="no">No</td></tr><tr><td>1998</td><td>Bill Clinton</td><td class="no">No</td></tr><tr><td>2019</td><td>Donald Trump</td><td class="no">No</td></tr><tr><td>2021</td><td>Donald Trump</td><td class="no">No</td></tr></table>`, "U.S. House and Senate records. Nixon resigned in 1974 before a House vote."),
      ask: "Why has no president ever been removed?",
      options: ["Removal needs 2/3 of the Senate", "Only the House can remove", "Presidents can veto impeachment", "The Court must approve removal"],
      miss: ["The House only charges. The Senate decides removal.", "There's no veto on impeachment. It's Congress's check.", "The Senate holds the trial, not the Court."],
      hint: "Who holds the trial, and how many votes does it take?",
      reveal: "Removal is rare on purpose. It takes <b>67 senators</b>." },

    { id: "c7", type: "check", r: 2, std: "Gov.9", kicker: "Bonus split · National vs. state", short: "Fed 51: double security = federalism", stamp: "DOUBLE LOCK",
      scene: () => `<div class="tree"><p class="tp">👥 The People</p><div class="tsplit"><div class="tn"><b>🇺🇸 National</b><span>💵 money · 🪖 military · 🤝 treaties</span><em>📜 ✒️ 🔨</em></div><div class="tn"><b>🌽 States (Iowa)</b><span>🚗 licenses · 🗳️ elections · 🏫 schools</span><em>📜 ✒️ 🔨</em></div></div></div>` +
        parch("James Madison · Federalist No. 51 (1788)", "…first divided between two distinct governments, and then… subdivided among distinct and separate departments. Hence a double security arises…"),
      ask: "Madison's “double security” means power is…",
      options: ["Split by level, then by branch", "Shared by the President and VP", "Passed twice by the same Congress", "Guarded by two separate armies"],
      miss: ["The VP doesn't share the President's power. Look at the two boxes.", "Bills pass once. Madison means power is divided twice.", "He's talking about governments, not armies."],
      hint: "Look at the chart: first split into two ___, then each into ___.",
      reveal: "<b>Federalism</b>: power split between national and state governments." },

    { id: "end", type: "ending", r: 2, kicker: "Final bell" },
    { id: "write", type: "write", r: 2, kicker: "Post-fight interview" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const EVENTS = STEPS.filter(s => s.type === "event");
  const HITS = STEPS.filter(s => s.hit);

  const PROMPTS = [
    { id: "check", short: "Most important check", label: "1. Which check matters most? What would happen without it?",
      bank: ["✒️ veto", "📜 override", "🔨 judicial review", "✅ confirm", "💰 power of the purse", "🔥 impeach"],
      stem: "The most important check is ___ because without it ___.", min: 60, newWords: 5,
      mustAll: [["veto", "override", "impeach", "judicial review", "strike", "struck", "unconstitutional", "appoint", "confirm", "budget", "spend", "money", "purse"], ["because", "without", "would", "could"]],
      mustMsg: "In answer 1, name a check (like veto, override, judicial review, or impeach) AND say what would happen without it." },
    { id: "fed", short: "National vs state example", label: "2. Name one thing the national government controls and one thing Iowa controls. Why split it?",
      bank: ["🇺🇸 money · military · treaties", "🌽 licenses · elections · schools"],
      stem: "The national government controls ___. Iowa controls ___. Splitting power helps because ___.", min: 60, newWords: 5,
      mustAll: [["national", "federal", "congress", "u.s", "country"], ["state", "iowa"], ["because", "so ", "protect", "help", "keep", "stop"]],
      mustMsg: "In answer 2, name something the national government controls, something Iowa controls, AND why splitting helps." }
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
        <p class="recap">⏪ Before break: 3 branches, 3 jobs. <b>Today: how they block each other.</b></p>
        <ul class="how"><li><span>💥</span>A branch grabs power</li><li><span>🧠</span>Answer the checks</li><li><span>🛡️</span>Pick the counter-move</li></ul>
        <p class="tline">🎯 Keep all 3 power bars balanced.</p>
        <p class="tchips"><span>⏱️ 25 min</span><span>🧠 7 checks</span><span>🥊 3 big moves</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">🔔 Ring the bell</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The bills and fights are made up. The rules, quotes, and records are real. Standards: SS.9-12.Gov.4, Gov.9.</p>
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
    st.lockUntil = Date.now() + LOCK * 1000;
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
    runLock(why, $("qmsg"), () => draw(step), LOCK);
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
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
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
    for (const p of PROMPTS) {
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
})();
