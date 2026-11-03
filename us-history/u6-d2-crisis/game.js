// =====================================================================
//  SURVIVING 2008  (U.S. History Unit 6 · Day 2)
//  You run the made-up Haugen family's money in Iowa, 2005–2010.
//  3 parts: 🏠 The Bubble Pops · 💼 Losing Work · 🏛️ You Are Congress.
//  7 checks (2 are sorts), 4 money calls (house, stimulus check, layoffs,
//  Congress vote on the bank rescue), 4 endings, 2 writing answers.
//  💵 Savings moves with each call. A wrong guess costs $200 (in-game only).
//  Polished 11/3 from the old UnitGame version: same assignmentId, new save key.
//  Turn-in via shared/turnin.js (same payload shape as UnitGame finish()).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u6-d2-crisis-v2";
  const ASSIGNMENT_ID = "ush-u6-d2-crisis";
  const TITLE = "U.S. History · Unit 6 · Day 2 · Surviving 2008";
  const STANDARD = "SS.9-12.US.53, SS.9-12.US.54, SS.9-12.US.55";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;          // seconds locked after a wrong answer
  const START_CASH = 5000;
  const GUESS_COST = 200;  // in-game cost of a wrong guess

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const money = n => (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US");
  const signed = n => (n > 0 ? "+" : n < 0 ? "−" : "±") + "$" + Math.abs(n).toLocaleString("en-US");

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite) => `<div class="exhibit"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (who, t, cls) => `<div class="say ${cls || ""}"><span class="who-s">${who}</span>${t}</div>`;
  const tv = (top, inner) => `<div class="tv"><div class="tvscreen"><p class="tvtop">${top}</p>${inner}</div><div class="tvknobs" aria-hidden="true"><span></span><span></span></div></div>`;
  const chart = (rows, max) => `<div class="chart">${rows.map(r => `<div class="br"><span>${r[0]}</span><span class="tr"><span class="${r[2] || ""}" style="width:${Math.round(r[1] / (max || 100) * 100)}%"></span></span><span>${r[3] || r[1] + "%"}</span></div>`).join("")}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  // A flow of boxes; "?" marks the blank the check asks about.
  const chain = (items, loop) => `<div class="flow${loop ? " loop" : ""}">${items.map((t, i) => (i ? `<span class="arr" aria-hidden="true">${loop && i === items.length - 1 ? "↻" : "➜"}</span>` : "") + (t[0] === "?" ? `<span class="fbox q">❓ ???</span>` : `<span class="fbox"><span aria-hidden="true">${t[0]}</span> ${t[1]}</span>`)).join("")}</div>`;
  // The family's house. state: own | water | sold
  function house(state, tags) {
    const water = state === "water";
    const sign = state === "sold" ? `<g><rect x="214" y="96" width="6" height="56" fill="#5b3417"/><rect x="186" y="82" width="62" height="28" rx="4" fill="#fff" stroke="#1d2433" stroke-width="3"/><text x="217" y="102" font-size="15" font-weight="900" text-anchor="middle" fill="#c7364a">SOLD</text></g>` : "";
    return `<div class="houseart"><svg viewBox="0 0 260 170" role="img" aria-label="${state === "sold" ? "The family's old house, sold" : water ? "The family's house, underwater" : "The family's house"}">
      <rect x="0" y="0" width="260" height="170" fill="${water ? "#c9dbe8" : "#dcefff"}"/>
      <rect x="0" y="140" width="260" height="30" fill="#7bb661"/>
      <polygon points="40,78 110,26 180,78" fill="#b23a2e" stroke="#1d2433" stroke-width="4" stroke-linejoin="round"/>
      <rect x="52" y="76" width="116" height="66" fill="#f6ead2" stroke="#1d2433" stroke-width="4"/>
      <rect x="98" y="102" width="26" height="40" fill="#6b4226" stroke="#1d2433" stroke-width="3"/>
      <rect x="64" y="90" width="24" height="22" fill="#9fd3f5" stroke="#1d2433" stroke-width="3"/>
      <rect x="134" y="90" width="24" height="22" fill="#9fd3f5" stroke="#1d2433" stroke-width="3"/>
      ${sign}
      ${water ? `<path d="M0 118 Q16 108 32 118 T64 118 T96 118 T128 118 T160 118 T192 118 T224 118 T260 118 V170 H0 Z" fill="#2f6fa8" opacity=".72"/><text x="130" y="160" font-size="15" font-weight="900" text-anchor="middle" fill="#fff">UNDERWATER</text>` : ""}
    </svg>${tags || ""}</div>`;
  }
  const tag = (t, cls) => `<span class="htag ${cls || ""}">${t}</span>`;

  // ---------------- Parts (HUD chips) + word help ----------------
  const PARTS = [
    { icon: "🏠", tag: "Bubble", terms: [["Mortgage", "a loan to buy a house"], ["Subprime", "risky, for people with weak credit"], ["Foreclosure", "the bank takes back the house"], ["Underwater", "you owe more than the house is worth"], ["Stimulus", "government money to get people spending"]] },
    { icon: "💼", tag: "Jobs", terms: [["Bankrupt", "out of money; the company fails"], ["Layoff", "losing your job because the company cuts workers"], ["Recession", "the economy shrinks and jobs disappear"], ["Unemployment rate", "share of people who want a job but can't find one"], ["Unemployment benefits", "government payments to laid-off workers"]] },
    { icon: "🏛️", tag: "Congress", terms: [["Bailout", "government money to rescue a failing company"], ["TARP", "the 2008 bank rescue"], ["Recovery Act", "the 2009 jobs-and-aid plan"], ["Dodd-Frank", "2010 law with tougher bank rules"], ["Taxpayers", "everyone whose taxes pay for government"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1].
  // sort: every row's opts[0] is right.
  // event: a money call. cash moves savings; home/job change the HUD.
  const STEPS = [
    // ===== 🏠 The Bubble Pops =====
    { id: "c1", type: "check", p: 0, std: "US.53", date: "2005", kicker: "Your new loan · 2005", short: "Identify a subprime mortgage", stamp: "SIGNED",
      scene: () => house("own") + ex("Loan offer", ln("📝", "Weak credit? <b>Approved!</b>") + ln("🏠", "$0 down") + ln("💲", "Years 1–2: <b>$900</b> a month") + ln("📈", "Year 3 on: <b>$1,500</b> a month"), "Typical 2005 loan terms. The lender is made up."),
      ask: "Weak credit + a payment that jumps. This loan is a…",
      options: ["Subprime mortgage", "Fixed-rate mortgage", "Stimulus check", "Foreclosure"],
      miss: ["Fixed-rate means the payment never changes. This one jumps.", "A stimulus check is money from the government, not a loan.", "Foreclosure is when the bank takes the house back. That's later."],
      hint: "Which one means a risky loan?",
      reveal: "<b>Subprime mortgage</b>: a risky home loan to someone with weak credit." },

    { id: "c2", type: "check", p: 0, std: "US.53", date: "2007", kicker: "Payments jump · 2007", short: "Housing crash chain: foreclosures", stamp: "CONNECTED",
      scene: () => ex("How the crash spread", chain([["💸", "Payments jump"], ["😰", "Millions can't pay"], ["?"], ["🏦", "Banks lose billions"]])) +
        say("Your neighbor", "“Two houses on our street have bank signs now.”"),
      ask: "What goes in the ❓ box?",
      options: ["Banks take back homes", "Home prices shoot up", "Stimulus checks go out", "Banks lend even more"],
      miss: ["Prices fell. Too many houses were for sale.", "Those came later, from Congress.", "Scared banks lent LESS, not more."],
      hint: "What does a bank do when payments stop?",
      reveal: "<b>Foreclosure</b>: the bank takes back a home when payments stop." },

    { id: "e1", type: "event", p: 0, date: "Early 2008", kicker: "Decision 1 · Your house", short: "House decision",
      scene: () => house("water", `<div class="htags">${tag("You owe <b>$150,000</b>", "bad")}${tag("Worth <b>$138,000</b>")}</div>`),
      ask: "Your house is worth less than you owe. Your move?",
      cards: [
        { icon: "📞", t: "Refinance", line: "Ask the bank for a lower payment", cash: -500, home: "own", res: "The bank says no. Your house is worth too little. You pay $500 in fees.", cause: "Refinance denied" },
        { icon: "🪧", t: "Sell now", line: "Take the loss, rent instead", cash: -4000, home: "sold", res: "It sells for $12,000 less than you owe. Savings drain. Your credit takes a hit.", cause: "Sold at a loss" },
        { icon: "✂️", t: "Cut back", line: "Keep paying, drop every extra", cash: -1000, home: "own", res: "Tight months, no extras. You keep the house.", cause: "Cut back, kept paying" }
      ],
      reveal: "<b>Underwater</b>: owing more than your house is worth. Millions were." },

    { id: "e2", type: "event", p: 0, date: "May 2008", kicker: "Decision 2 · A check in the mail", short: "Stimulus check decision",
      scene: () => `<div class="bankcheck"><p class="ckhead"><span>U.S. TREASURY</span><span>May 2008</span></p><p class="ckpay">Pay to the order of <b>THE HAUGEN FAMILY</b></p><p class="ckamt">$1,800.00</p><p class="ckmemo">Memo: 2 adults × $600 + 2 kids × $300</p></div>` +
        src("Economic Stimulus Act of 2008, passed by Congress and signed by President Bush."),
      ask: "A $1,800 check arrives. What do you do with it?",
      cards: [
        { icon: "💰", t: "Save it all", line: "A cushion for hard times", cash: 1800, res: "Your cushion grows. Stores in town don't see a dime.", cause: "Saved the check" },
        { icon: "🛒", t: "Spend in town", line: "Tires, school clothes, a night out", cash: 0, res: "Hy-Vee and the tire shop get $1,800. That's what Congress hoped for.", cause: "Spent the check in town" },
        { icon: "⚖️", t: "Half and half", line: "Spend some, save some", cash: 900, res: "Some for the stores, some for your cushion.", cause: "Saved half the check" }
      ],
      reveal: "<b>Stimulus</b>: government money meant to get people spending." },

    { id: "c3", type: "check", p: 0, std: "US.53", date: "May 2008", kicker: "Why send checks?", short: "Why the government sent stimulus checks", stamp: "GOT IT",
      scene: () => ex("Congress's plan", chain([["💵", "Families get checks"], ["🛒", "Families spend"], ["🏪", "Stores sell more"], ["?"]])) +
        src("Signed by President Bush, Feb. 2008, with support from both parties."),
      ask: "Why did Congress want families to SPEND the checks?",
      options: ["Stores keep their workers", "Families pay taxes early", "Banks make more home loans", "Prices climb even faster"],
      miss: ["The checks were a tax refund, not a tax bill.", "The checks went to families, not banks.", "Rising prices weren't the goal. Jobs were."],
      hint: "If stores sell more, what can they afford to keep?",
      reveal: "Saving helps <b>your family</b>. Spending helps <b>the town</b>. Recessions pull both ways." },

    // ===== 💼 Losing Work =====
    { id: "e3", type: "event", p: 1, date: "Oct. 2008", kicker: "Decision 3 · Your job", short: "Layoff decision",
      scene: () => tv("📺 BREAKING · SEPT. 15, 2008", ln("🏦", "Wall Street giant <b>Lehman Brothers</b> goes bankrupt.") + ln("🔒", "Scared banks stop lending.")) +
        `<div class="notice"><p class="nh">⚠️ Notice to all staff</p><p>Half our department is laid off <b>Nov. 1</b>.</p></div>`,
      ask: "Layoffs are coming. Your move?",
      cards: [
        { icon: "🔎", t: "Job hunt now", line: "Grab a new job, even for less", cash: -1200, job: "new", res: "You land a job before the cuts. It pays $400 a month less.", cause: "Took a lower-paying job" },
        { icon: "✂️", t: "Cut back & stay", line: "Save hard, hope you're kept", cash: 800, job: "work", res: "Lucky: your name isn't on the list. Cutting back saved $800.", cause: "Stayed, got lucky" },
        { icon: "🤞", t: "Wait and see", line: "Change nothing for now", cash: -3500, job: "laid", res: "Laid off. Unemployment benefits cover only part of your pay. 6 months to find work.", cause: "Laid off for 6 months" }
      ],
      reveal: "<b>Unemployment benefits</b>: government pay for laid-off workers. Congress extended them." },

    { id: "c4", type: "check", p: 1, std: "US.54", date: "2009", kicker: "Layoffs spread", short: "How layoffs spread in a recession", stamp: "CONNECTED",
      scene: () => ex("The layoff loop", chain([["👷", "Workers laid off"], ["🛒", "They spend less"], ["?"], ["📉", "More layoffs"]], true)) +
        say("Your old coworker", "“The diner on Main laid off half its cooks.”"),
      ask: "What goes in the ❓ box?",
      options: ["Stores sell less", "Home prices climb", "Banks lend more freely", "Gas prices go up"],
      miss: ["Home prices were falling, not climbing.", "Scared banks lent LESS.", "Gas prices don't explain the next round of layoffs."],
      hint: "If people buy less, who loses customers?",
      reveal: "<b>Recession</b>: the economy shrinks and jobs disappear. Layoffs feed more layoffs." },

    { id: "c5", type: "check", p: 1, std: "US.54", date: "2010", kicker: "The jobs report", short: "Read the chart: slow recovery", stamp: "READ IT",
      scene: () => ex("U.S. unemployment rate", chart([["Dec 2007", 5.0, "", "5.0%"], ["Dec 2008", 7.3, "", "7.3%"], ["Oct 2009", 10.0, "hot", "10%"], ["Dec 2010", 9.3, "hot", "9.3%"], ["Dec 2012", 7.9, "", "7.9%"], ["Dec 2014", 5.6, "", "5.6%"], ["Dec 2016", 4.7, "", "4.7%"]], 10), "U.S. Bureau of Labor Statistics. 8.7 million jobs lost, 2008–2010."),
      ask: "How fast did jobs come back?",
      options: ["It took many years", "It took a few months", "Jobs never came back", "Jobs were back by 2010"],
      miss: ["Look at Dec 2010: still 9.3%.", "By 2016 it's back under 5%.", "Dec 2010 is still 9.3%. Almost double 2007."],
      hint: "When do the bars get back near 5%?",
      reveal: "The <b>Great Recession</b> (2007–2009): the worst since the 1930s. Recovery took years." },

    // ===== 🏛️ You Are Congress =====
    { id: "e4", type: "event", p: 2, date: "Sept. 29, 2008", kicker: "Flashback to 2008 · Your vote", short: "Congress vote on bank rescue (TARP)", vote: true,
      scene: () => ex("The bill", `<p class="big">🏦 $700 billion</p><p>to rescue failing banks</p>`) +
        `<div class="row2">${say("👍 For it", "If banks fail, businesses can't borrow to pay workers.", "pro")}${say("👎 Against it", "Banks took the risks. Why should taxpayers pay?", "con")}</div>`,
      ask: "You're in the House. How do you vote?",
      cards: [
        { icon: "✅", t: "Vote YES", line: "Rescue banks to protect the economy", cash: 0, res: "Your side LOST on Sept. 29, then won on Oct. 3." },
        { icon: "📝", t: "Fix it first", line: "Add limits, then rescue", cash: 0, res: "Close to what happened: Congress changed the bill, then passed it." },
        { icon: "❌", t: "Vote NO", line: "Let failing banks fail", cash: 0, res: "Your side WON on Sept. 29. Then Congress changed course." }
      ],
      reveal: "<b>Bailout</b>: government money to rescue a failing company." },

    { id: "c6", type: "sort", p: 2, std: "US.53", date: "2008–2010", kicker: "Three responses", short: "Match each problem to the government response", stamp: "MATCHED",
      scene: () => `<div class="laws">
          <div class="law"><span class="li" aria-hidden="true">🏦</span><b>TARP</b><small>Oct. 2008 · Bush</small><p>Rescue banks and carmakers: $700B</p></div>
          <div class="law"><span class="li" aria-hidden="true">🏗️</span><b>Recovery Act</b><small>Feb. 2009 · Obama</small><p>Jobs, tax cuts, aid to states: $787B</p></div>
          <div class="law"><span class="li" aria-hidden="true">📜</span><b>Dodd-Frank</b><small>July 2010 · Obama</small><p>Tougher bank rules + a borrower watchdog</p></div></div>`,
      ask: "Which response was aimed at each problem?",
      rows: [
        { icon: "🏦", t: "Big banks are about to collapse", opts: ["TARP", "Recovery Act", "Dodd-Frank"] },
        { icon: "👷", t: "Millions are out of work", opts: ["Recovery Act", "TARP", "Dodd-Frank"] },
        { icon: "🚫", t: "Stop risky loans from happening again", opts: ["Dodd-Frank", "TARP", "Recovery Act"] }
      ],
      hint: "Read what each law card says it paid for or changed.",
      reveal: "Rescue banks → create jobs → write new rules." },

    { id: "c7", type: "sort", p: 2, std: "US.55", date: "2008–today", kicker: "The great debate", short: "Sort supporter vs. critic views of the bailout", stamp: "SORTED",
      scene: () => ex("What happened to the bank money?", chart([["Banks got", 245.5, "", "$245B"], ["Paid back", 275.9, "good", "$276B"]], 280), "U.S. Treasury, TARP bank programs, 2023.") +
        ln("🏠", "Meanwhile, millions of families lost homes."),
      ask: "Supporter or critic of the bank bailout?",
      rows: [
        { icon: "💬", t: "“Saving banks kept loans flowing to businesses.”", opts: ["👍 Supporter", "👎 Critic"] },
        { icon: "💬", t: "“Wall Street got rescued. Families lost their homes.”", opts: ["👎 Critic", "👍 Supporter"] },
        { icon: "💬", t: "“Taxpayers got their money back, plus more.”", opts: ["👍 Supporter", "👎 Critic"] },
        { icon: "💬", t: "“Rescues teach banks they can take wild risks.”", opts: ["👎 Critic", "👍 Supporter"] }
      ],
      hint: "Does the speaker think the rescue helped or hurt?",
      reveal: "Critics came from the <b>left AND the right</b>. Supporters did too." },

    { id: "end", type: "ending", p: 2, date: "2010", kicker: "Where your family ended up" },
    { id: "write", type: "write", p: 2, date: "2010", kicker: "Your report" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check" || s.type === "sort");
  const EVENTS = STEPS.filter(s => s.type === "event");

  const PROMPTS = [
    { id: "family", short: "How the crash hit the family (cause and effect)", label: "1. Your family's story: How did the crash hit your family, and why?",
      bank: ["🏠 underwater", "🏦 foreclosure", "💼 layoffs", "💵 stimulus"],
      stem: "The crash hit my family when ___. This happened because ___.", min: 60, newWords: 5,
      mustAll: [["house", "home", "loan", "mortgage", "subprime", "underwater", "foreclos", "refinanc", "sell", "sold", "job", "layoff", "laid", "fired", "work", "saving", "check", "stimulus", "bank", "price", "recession", "unemploy"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name what happened (house, job, savings…) AND explain why (use “because”)." },
    { id: "govt", short: "A government response and why people disagreed", label: "2. Your report to Congress: Pick one response. What did it try to fix, and why did some people disagree?",
      bank: ["🏦 TARP", "🏗️ Recovery Act", "📜 Dodd-Frank", "📨 stimulus checks"],
      stem: "___ tried to fix ___. Some people disagreed because ___.", min: 60, newWords: 5,
      mustAll: [["tarp", "bailout", "rescue", "recovery", "stimulus", "dodd", "frank", "check"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name a response (TARP, the Recovery Act, Dodd-Frank, or the checks) AND explain why people disagreed (use “because”)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, cash: START_CASH, home: "own", job: "work", picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || typeof st.cash !== "number" || !st.picks) st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts clean.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const partDone = i => CHECKS.filter(c => c.p === i).every(c => st.done[c.id]) && EVENTS.filter(e => e.p === i).every(e => st.picks[e.id] != null);

  // ---------------- HUD ----------------
  const HOME = { own: ["🏠", "Home: keeping it"], water: ["🌊", "Home: underwater"], sold: ["🔑", "Home: renting"] };
  const JOB = { work: ["💼", "Job: working"], new: ["💼", "Job: new, less pay"], laid: ["📉", "Job: laid off"] };
  const homeKey = () => st.home === "sold" ? "sold" : st.picks.e1 != null || st.step >= 2 ? "water" : "own";
  const mood = c => c >= 4000 ? "😄" : c >= 1000 ? "🙂" : c >= 0 ? "😟" : "😰";
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const c = st.cash;
    $("cashFill").style.width = Math.max(0, Math.min(100, c / 70)) + "%";
    $("cashFill").className = c < 1000 ? "low" : "";
    $("cashNum").textContent = money(c); $("cashNum").className = "mn" + (c < 0 ? " neg" : "");
    $("famMood").textContent = mood(c);
    $("youName").textContent = st.name;
    const h = HOME[homeKey()], j = JOB[st.job] || JOB.work;
    $("homeChip").innerHTML = `<span aria-hidden="true">${h[0]}</span> ${h[1]}`;
    $("jobChip").innerHTML = `<span aria-hidden="true">${j[0]}</span> ${j[1]}`;
    $("homeChip").className = "stat" + (homeKey() !== "own" ? " warn" : "");
    $("jobChip").className = "stat" + (st.job === "laid" ? " warn" : "");
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("dateChip").textContent = "📅 " + step.date;
    const off = ["ending", "write"].includes(step.type);
    $("parts").innerHTML = PARTS.map((p, i) => `<span class="${partDone(i) ? "won" : i === step.p && !off ? "now" : ""}">${partDone(i) ? "✓" : p.icon} ${p.tag}</span>`).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
  }
  function bump(delta) {
    const el = $("mCash"); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + (delta > 0 ? "good" : "bad");
    f.textContent = signed(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
    if (delta < 0) { const b = $("famBox"); b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); }
  }
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    host.querySelectorAll(".stamp:not(.stay)").forEach(s => s.remove());
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml) {
    const off = ["ending", "write"].includes(step.type);
    const P = PARTS[step.p];
    const termsBtn = off ? "" : `<button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Word help</button>`;
    app.innerHTML = `<div class="board"><div class="scene" id="scene"><p class="kick">${esc(step.kicker)}</p>${sceneHtml}</div>
      <div class="play" id="play">${termsBtn ? `<div class="ptop">${termsBtn}</div>` : ""}<div id="termsBox"></div>${playHtml}</div></div>`;
    if ($("termsBtn")) $("termsBtn").onclick = () => {
      const box = $("termsBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="terms">${P.terms.map(t => `<p><b>${t[0]}</b>: ${t[1]}</p>`).join("")}</div>`;
      $("termsBtn").setAttribute("aria-expanded", String(!open));
    };
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "ending") return "See how your family did ▶";
    if (nx.p !== step.p) return "Next: " + PARTS[nx.p].icon + " " + PARTS[nx.p].tag + " ▶";
    return "Next ▶";
  }
  function nextBtn(step) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn";
    b.textContent = nextLabel(step);
    b.onclick = () => { st.step++; save(); render(); window.scrollTo(0, 0); };
    return b;
  }
  function addNext(step, html, quiet) {
    const a = $("after"); if (!a || a.dataset.done) return; a.dataset.done = "1";
    if (html) a.insertAdjacentHTML("beforeend", reveal(html));
    a.appendChild(nextBtn(step));
    if (!quiet) { const n = $("nextBtn"); if (n && n.scrollIntoView) n.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  }

  // ---- Title ----
  function title() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title">
      <div class="tart" aria-hidden="true">
        ${house("own")}
        <div class="famcard"><span class="ff">👨‍👩‍👧‍👦</span><div><b>The Haugen family</b><p>💵 $5,000 saved · 🏠 $1,500/mo house · 💼 $3,000/mo pay</p></div></div>
      </div>
      <div class="tcopy">
        <p class="tk">U.S. History · Unit 6 · Day 2</p>
        <h1>Surviving 2008</h1>
        <p class="hook">The economy crashes. You run the family money. Can you make it?</p>
        <ul class="how"><li><span>💵</span>Make 3 money calls</li><li><span>🔍</span>Wrong guess = −$200</li><li><span>🏛️</span>Cast 1 vote in Congress</li></ul>
        <p class="tchips"><span>⏱️ 15–20 min</span><span>🔍 7 checks</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Start in 2005 🏠</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The Haugen family is made up. The events, laws, and numbers are real. Standards: SS.9-12.US.53, US.54, US.55.</p>
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
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.cash -= GUESS_COST;
    st.lockUntil = Date.now() + LOCK * 1000;
    st.lockMsg = why;
    save(); hud(); bump(-GUESS_COST);
    stamp("−$200", "bad");
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    st.done[step.id] = true; save(); hud();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check: one multiple-choice question ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
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
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Got it</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Sort: tag each row ----
  let bp = {}, curSort = null;
  function sort(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="rows"></div><button type="button" class="go lock" id="lockBtn" disabled>Lock it in 🔒</button><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    $("lockBtn").onclick = () => lockIn(step);
    if (st.done[step.id]) return sorted(step, true);
    drawRows(step);
    if (lockLeft() > 0) { setRows(true); runLock(st.lockMsg || step.hint, $("qmsg"), () => drawRows(step), lockLeft()); }
  }
  function setRows(off) { document.querySelectorAll("#rows .chip").forEach(x => x.disabled = off); $("lockBtn").disabled = off || Object.keys(bp).length < curSort.rows.length; }
  function drawRows(step) {
    curSort = step; bp = {};
    const box = $("rows"); if (!box) return;
    const chipOrder = shuffle(step.rows[0].opts.slice());
    const rowOrder = shuffle(step.rows.map((r, i) => i));
    box.innerHTML = rowOrder.map(i => { const r = step.rows[i]; return `<div class="brow" data-i="${i}"><span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span><div class="chips" role="group" aria-label="${esc(r.t)}">${chipOrder.map(o => `<button type="button" class="chip" aria-pressed="false" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div></div>`; }).join("");
    box.querySelectorAll(".brow").forEach(row => {
      const i = +row.dataset.i;
      row.querySelectorAll(".chip").forEach(ch => ch.onclick = () => {
        if (locked) return;
        bp[i] = ch.dataset.v;
        row.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === ch)));
        $("lockBtn").disabled = Object.keys(bp).length < step.rows.length;
        if (!$("lockBtn").disabled && $("lockBtn").scrollIntoView) $("lockBtn").scrollIntoView({ behavior: "smooth", block: "nearest" });
        $("qmsg").textContent = "";
      });
    });
    $("lockBtn").disabled = true;
  }
  function lockIn(step) {
    if (locked || Object.keys(bp).length < step.rows.length) return;
    const nRight = step.rows.filter((r, i) => bp[i] === r.opts[0]).length;
    if (nRight === step.rows.length) { markRight(step); return sorted(step, false); }
    const text = `${nRight} of ${step.rows.length} right. ${step.hint}`;
    markWrong(step, text);
    setRows(true);
    runLock(text, $("qmsg"), () => drawRows(step), LOCK);
  }
  function sorted(step, quiet) {
    $("rows").innerHTML = step.rows.map(r => `<div class="brow ok"><span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span><span class="got">✓ ${esc(r.opts[0])}</span></div>`).join("");
    $("lockBtn").remove();
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Event: a money call ----
  const fxChip = c => `<span class="fx ${c.cash > 0 ? "g" : c.cash < 0 ? "b" : "n"}">💵 ${signed(c.cash)}</span>`;
  function tally() {
    return `<div class="tally">
      <div class="trow"><span class="td">Sept. 29</span><span class="tbar"><span class="y" style="width:47%">YES 205</span><span class="n" style="width:53%">NO 228</span></span><b class="tres bad">FAILS</b></div>
      <p class="tnote">📉 Same day: stocks drop 777 points, a record at the time.</p>
      <div class="trow"><span class="td">Oct. 3</span><span class="tbar"><span class="y" style="width:61%">YES 263</span><span class="n" style="width:39%">NO 171</span></span><b class="tres good">PASSES</b></div><p class="tnote">✍️ Bush signs it that day.</p>
            ${src("U.S. House votes on the Emergency Economic Stabilization Act, 2008. Both parties split.")}</div>`;
  }
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><span class="dline">${esc(c.line)}</span></button>`; }).join("")}</div><p class="peek">${step.vote ? "🗳️ Then see how the real House voted." : "💵 You'll see what it costs after you pick."}</p>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      st.picks[step.id] = i;
      st.cash += c.cash || 0;
      if (c.home) st.home = c.home;
      if (c.job) st.job = c.job;
      save(); hud(); bump(c.cash || 0);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span><b>${esc(c.t)}</b><br><span class="dline">${esc(c.line)}</span></span><span class="fxrow">${step.vote ? `<span class="fx n">🗳️ Vote cast</span>` : fxChip(c)}</span></div><p class="result">${esc(c.res)}</p>${step.vote ? tally() : ""}`;
    if (step.id === "e1") { const sc = $("scene"); if (sc && st.home === "sold") sc.querySelector(".houseart").outerHTML = house("sold"); }
    if (!quiet) stamp(step.vote ? "VOTE CAST" : signed(c.cash), step.vote || c.cash >= 0 ? "" : "bad");
    addNext(step, step.reveal, quiet);
  }

  // ---- Endings ----
  function ending() {
    const c = st.cash;
    let e;
    if (c >= 4000) e = { key: "Made It", icon: "🏡", cls: "best", text: "Your family got through with a cushion left. Many families didn't." };
    else if (c >= 1000) e = { key: "Scraped By", icon: "😮‍💨", cls: "mid", text: "You made it, barely. One more bad break would have sunk you." };
    else if (c >= 0) e = { key: "Hanging On", icon: "🧾", cls: "mid", text: "Savings almost gone. Every bill is a scare now." };
    else e = { key: "In Debt", icon: "📉", cls: "low", text: "Your family owes more than it has, like millions in 2009." };
    e.out = e.key + " (" + money(c) + ")";
    e.causes = EVENTS.filter(s => !s.vote && st.picks[s.id] != null).map(s => { const k = s.cards[st.picks[s.id]]; return k.cause + " (" + signed(k.cash) + ")"; });
    return e;
  }
  function endingStep(step) {
    const e = ending();
    const v = STEPS.find(s => s.id === "e4"), vp = st.picks.e4;
    shell(step, house(st.home === "sold" ? "sold" : "own") +
        `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p><p class="endm">💵 ${money(st.cash)} · ${HOME[st.home === "sold" ? "sold" : "own"][1]} · ${st.job === "laid" ? "Job: back after 6 months" : (JOB[st.job] || JOB.work)[1]}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul>${vp != null ? `<p class="endm">🗳️ In Congress: ${esc(v.cards[vp].t)}</p>` : ""}</div>
       ${reveal("Real families' results came from choices <b>and</b> luck, like whose job got cut.")}<div id="after"></div>`);
    const b = nextBtn(step); b.textContent = "✏️ Write your report ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="typed"><p class="cbh">📋 Family file · 2010</p><p><b>Result:</b> ${e.icon} ${esc(e.key)}</p><p><b>Savings:</b> ${money(st.cash)}</p>${e.causes.map(c => `<p>• ${esc(c)}</p>`).join("")}</div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: add a real number from the game, like 10% or $700 billion.</p>
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
      if (s.type === "event" && !s.vote && st.picks[s.id] != null) { const c = s.cards[st.picks[s.id]]; answers["Choice · " + s.short] = c.t + ": " + c.line + " (" + signed(c.cash) + ")"; }  // Fynn 11/3: the role-play Congress vote stays off the dashboard
      if (s.type === "check" || s.type === "sort") {
        const w = st.wrong[s.id];
        const ans = s.type === "check" ? s.options[0] : s.rows.map(r => r.t.replace(/[“”]/g, "") + " = " + r.opts[0].replace(/^\p{Extended_Pictographic}\s*/u, "")).join(" · ");
        answers[s.std + " · " + s.short] = ans + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Family savings"] = money(st.cash);

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. You're done!"; msg.className = "msg good";
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
    if (step.type === "sort") return sort(step);
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
