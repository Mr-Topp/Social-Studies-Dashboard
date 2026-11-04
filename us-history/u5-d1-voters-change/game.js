// =====================================================================
//  ELECTION DESK 1980  (U.S. History Unit 5 · Day 1)
//  Fall 1980. You're a new political reporter at a made-up Iowa paper.
//  Editor Bev wants to know why Iowans are switching. 3 assignments:
//  📊 Research (stagflation, hostages) · 🎤 Interviews (6 Iowa voters:
//  3 Reagan, 2 Carter, 1 Anderson) · 🗳️ Election night (debate, results,
//  exit poll, Reagan's inaugural view of government).
//  7 checks (2 are sorts), 3 headline/interview calls, 4 endings, 2 writing answers.
//  ⚖️ Fair goes up only with balanced calls. 🗞️ Readers rise with flashy calls
//  and drop 1 for every wrong answer (a printed correction).
//  Polished 11/3 from the old UnitGame version: same assignmentId, new save key.
//  Turn-in via shared/turnin.js (same payload shape as UnitGame finish()).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u5-d1-voters-change-v2";
  const ASSIGNMENT_ID = "ush-u5-d1-voters-change";
  const TITLE = "U.S. History · Unit 5 · Day 1 · Election Desk 1980";
  const STANDARD = "SS.9-12.US.46, SS.9-12.US.47, SS.9-12.US.49";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;                 // seconds locked after a wrong answer
  const START = { fair: 4, read: 5 };
  const GOAL = { fair: 8, read: 5 };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = n => Math.max(0, Math.min(10, n));

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite) => `<div class="exhibit"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (who, t, cls) => `<div class="say ${cls || ""}"><span class="who-s">${who}</span>${t}</div>`;
  const bev = t => `<div class="bevrow"><span class="bevface" aria-hidden="true">👩🏼‍💼</span>${say("Bev · editor", t, "bev")}</div>`;
  const CAND = { R: ["REAGAN", "r"], C: ["CARTER", "c"], A: ["ANDERSON", "a"] };
  const pin = k => `<span class="cbtn ${CAND[k][1]}" aria-label="${CAND[k][0]} voter"><b>${CAND[k][0]}</b><i>’80</i></span>`;
  const voter = (face, name, role, quote, cand) => `<div class="voter"><span class="vface" aria-hidden="true">${face}</span><div class="vbody"><p class="vwho"><b>${name}</b> · ${role}</p><p class="vq">“${quote}”</p></div>${cand ? pin(cand) : ""}</div>`;
  const tv = (top, inner) => `<div class="tv"><div class="tvscreen"><p class="tvtop">${top}</p>${inner}</div><div class="tvknobs" aria-hidden="true"><span></span><span></span></div></div>`;
  const chart = (rows, max) => `<div class="chart">${rows.map(r => `<div class="br"><span>${r[0]}</span><span class="tr"><span class="${r[2] || ""}" style="width:${Math.round(r[1] / (max || 100) * 100)}%"></span></span><span>${r[3] || r[1] + "%"}</span></div>`).join("")}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  const iowa = pins => `<svg class="iowa" viewBox="0 0 300 175" role="img" aria-label="Map of Iowa with interview stops">
      <polygon points="12,18 252,18 262,34 282,52 292,90 274,116 268,146 246,162 30,162 22,120 14,64" fill="#f6ead2" stroke="#1d2433" stroke-width="4" stroke-linejoin="round"/>
      ${pins.map(p => `<g><circle cx="${p[1]}" cy="${p[2]}" r="7" fill="#c2410c" stroke="#1d2433" stroke-width="2"/><text x="${p[1] + (p[3] || 10)}" y="${p[2] + 5}" font-size="14" font-weight="800" fill="#1d2433" ${p[3] < 0 ? 'text-anchor="end"' : ""}>${p[0]}</text></g>`).join("")}
    </svg>`;

  // ---------------- Assignments (HUD chips) ----------------
  const PARTS = [
    { icon: "📊", tag: "Research", terms: [["Inflation", "prices rise, so money buys less"], ["Unemployment", "people want jobs but can't find them"], ["Stagnant", "stuck, not growing"], ["Embassy", "a country's office inside another country"], ["Hostage", "a person held prisoner to force a deal"]] },
    { icon: "🎤", tag: "Interviews", terms: [["Conservative (1980)", "lower taxes, fewer rules, strong military, traditional values"], ["Independent", "a candidate from neither big party"], ["Leading question", "a question that pushes an answer"], ["Soviets", "the USSR, America's Cold War rival"]] },
    { icon: "🗳️", tag: "Election", terms: [["New Deal", "FDR's 1930s programs, like Social Security"], ["Great Society", "LBJ's 1960s programs, like Medicare"], ["Exit poll", "asking voters how they voted as they leave"], ["Union home", "a family with a labor union member"], ["Inauguration", "the day a new president takes office"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1].
  // sort: every row's opts[0] is right (chips shared across rows, one extra decoy chip).
  // event: a reporting call. fx moves ⚖️ fair and 🗞️ readers.
  const STEPS = [
    // ===== 📊 Research =====
    { id: "c1", type: "check", p: 0, std: "US.47", date: "Oct. 1, 1980", kicker: "Research desk · The economy", short: "Stagflation", stamp: "FACT-CHECKED",
      scene: () => bev("“Why are Iowans so mad? Start with money.”") +
        ex("How fast prices rose", chart([["1976", 5.8, "", "5.8%"], ["1977", 6.5, "", "6.5%"], ["1978", 7.6, "", "7.6%"], ["1979", 11.3, "hot", "11.3%"], ["1980", 13.5, "hot", "13.5%"]], 13.5), "U.S. Bureau of Labor Statistics") +
        `<div class="row2">${ex("Same groceries", `<p class="big">🛒</p><p><b>1976:</b> $100</p><p><b>1980:</b> $145</p>`)}${ex("Out of work", `<p class="big">🏭</p><p><b>7 in 100</b> workers</p>`)}</div>`,
      ask: "Prices up AND jobs gone at the same time. That's called…",
      options: ["Stagflation", "A depression", "Deflation", "A boom"],
      miss: ["A depression is 1 in 4 out of work, like the 1930s. This is 7 in 100.", "Deflation means prices fall. These bars climb.", "A boom means plenty of jobs. Not here."],
      hint: "Two problems at once: stuck jobs and rising prices.",
      reveal: "<b>Stagflation</b>: a stuck (stagnant) economy plus inflation." },

    { id: "c2", type: "check", p: 0, std: "US.49", date: "Oct. 8, 1980", kicker: "Research desk · World news", short: "Iran hostage crisis: U.S. looked weak", stamp: "FACT-CHECKED",
      scene: () => tv("📺 NIGHTLY NEWS · AMERICA HELD HOSTAGE", ln("🏛️", "Nov. 1979: students in Iran take over the U.S. embassy.") + ln("👥", "52 Americans held, month after month.") + ln("🚁", "April 1980: rescue fails. 8 U.S. troops die.")),
      ask: "How did this news make many voters feel?",
      options: ["The U.S. looked weak", "The U.S. looked tough", "Iran wasn't a real threat", "Foreign news didn't matter"],
      miss: ["Months of waiting and a failed rescue didn't look tough.", "52 Americans were held prisoner. Voters saw a real threat.", "It was on the news almost every night."],
      hint: "Months of waiting. A failed rescue. How does that look?",
      reveal: "The <b>Iran hostage crisis</b> made Carter look weak to many voters." },

    { id: "e1", type: "event", p: 0, date: "Oct. 10, 1980", kicker: "Story 1 · Carter's record", short: "Carter's-record headline",
      scene: () => bev("“Headline for the Carter story. Go.”") +
        ex("Carter's four years", ln("✅", "Camp David: Egypt–Israel peace deal (1978)") + ln("✅", "Created the Dept. of Energy (1977)") + ln("❌", "Prices up 45% since 1976") + ln("❌", "Hostages still held")),
      ask: "Pick your headline.",
      cards: [
        { icon: "📰", t: "Lead with both", line: "“Peace Abroad, Pain at Home”", fx: { fair: 2, read: 1 }, res: "Fair and punchy. Readers on both sides keep reading.", cause: "Fair Carter headline" },
        { icon: "📰", t: "Lead with prices", line: "“Carter's Years: Prices Up 45%”", fx: { fair: -2, read: 2 }, res: "True, and it sells. But it skips Camp David.", cause: "Carter: prices only" },
        { icon: "📰", t: "Lead with peace", line: "“Carter the Peacemaker”", fx: { fair: -2, read: -1 }, res: "True, but it skips prices and hostages. Readers shrug.", cause: "Carter: peace only" }
      ],
      reveal: "A <b>fair</b> story shows the whole record." },

    // ===== 🎤 Interviews =====
    { id: "e2", type: "event", p: 1, date: "Oct. 14, 1980", kicker: "On the road · 4 Iowa towns", short: "Interview opening question",
      scene: () => iowa([["Waterloo", 186, 58], ["Cedar Rapids", 214, 86, -12], ["Iowa City", 230, 112, -12], ["Des Moines", 128, 104, -12]]) + bev("“Six voters. What's your first question?”"),
      ask: "Pick your opening question.",
      cards: [
        { icon: "🎤", t: "Ask about issues", line: "“What matters most to you this year?”", fx: { fair: 2, read: 0 }, res: "They tell you what they really think.", cause: "Open interview question" },
        { icon: "🎤", t: "Ask about prices", line: "“Isn't Carter to blame for prices?”", fx: { fair: -2, read: 1 }, res: "Angry quotes. Carter voters stop talking to you.", cause: "Question blamed Carter" },
        { icon: "🎤", t: "Ask about Reagan", line: "“Isn't Reagan too risky?”", fx: { fair: -2, read: 1 }, res: "Scared quotes. Reagan voters stop talking to you.", cause: "Question attacked Reagan" }
      ],
      reveal: "A <b>leading question</b> pushes people toward your answer." },

    { id: "c3", type: "sort", p: 1, std: "US.46", date: "Oct. 15, 1980", kicker: "Interviews · Reagan voters", short: "What pulled 3 voters to Reagan", stamp: "QUOTES CHECKED",
      scene: () => voter("👨🏻‍🔧", "Duane", "factory worker, Waterloo", "My paycheck buys less every month. They laid off 200 guys at my plant.", "R") +
        voter("👩🏼", "Arlene", "mom of three, Des Moines", "We want prayer back in public schools. We oppose abortion. Our church is signing up voters.", "R") +
        voter("👩🏽‍💼", "Teresa", "hardware store owner, Cedar Rapids", "The IRS takes more every year. Federal forms eat up my whole week.", "R"),
      ask: "What pulled each one toward Reagan?",
      rows: [
        { icon: "👨🏻‍🔧", t: "Duane", opts: ["💵 Prices & jobs", "⛪ Traditional values", "🧾 Taxes & rules", "🪖 Military strength"] },
        { icon: "👩🏼", t: "Arlene", opts: ["⛪ Traditional values", "💵 Prices & jobs", "🧾 Taxes & rules", "🪖 Military strength"] },
        { icon: "👩🏽‍💼", t: "Teresa", opts: ["🧾 Taxes & rules", "💵 Prices & jobs", "⛪ Traditional values", "🪖 Military strength"] }
      ],
      hint: "Reread each quote. What is bugging each one?",
      reveal: "Reagan's <b>conservatism</b>: lower taxes, fewer rules, traditional values, strong military. Church groups helped organize voters." },

    { id: "c4", type: "sort", p: 1, std: "US.49", date: "Oct. 16, 1980", kicker: "Interviews · Carter & Anderson voters", short: "Why 3 voters didn't pick Reagan", stamp: "QUOTES CHECKED",
      scene: () => voter("👩🏾‍🏫", "Gloria", "teacher, Iowa City", "Reagan wants to cut student loans and job training. My students need those.", "C") +
        voter("👩🏻‍⚕️", "Marge", "nurse, Waterloo", "Reagan talks so tough on the Soviets. I don't want my son in a war.", "C") +
        voter("🧑🏼‍🎓", "Kevin", "college student, Iowa City", "Carter let prices run wild. Reagan's too far right. I want a third choice.", "A") +
        src("John Anderson: a Republican congressman who ran as an independent."),
      ask: "Why didn't each one pick Reagan?",
      rows: [
        { icon: "👩🏾‍🏫", t: "Gloria", opts: ["🤝 Keep help programs", "🕊️ Avoid a war", "🚪 Neither main party", "💵 Lower taxes"] },
        { icon: "👩🏻‍⚕️", t: "Marge", opts: ["🕊️ Avoid a war", "🤝 Keep help programs", "🚪 Neither main party", "💵 Lower taxes"] },
        { icon: "🧑🏼‍🎓", t: "Kevin", opts: ["🚪 Neither main party", "🤝 Keep help programs", "🕊️ Avoid a war", "💵 Lower taxes"] }
      ],
      hint: "Reread each quote. What worries each one?",
      reveal: "Not everyone switched. <b>Carter</b> and <b>Anderson</b> voters had real reasons too." },

    // ===== 🗳️ Election =====
    { id: "c5", type: "check", p: 2, std: "US.49", date: "Oct. 28, 1980", kicker: "TV debate · Carter vs. Reagan", short: "“Better off?” question",
      stamp: "FACT-CHECKED",
      scene: () => tv("📺 THE ONLY CARTER–REAGAN DEBATE", `<p class="tvq">“Are you better off than you were four years ago?”</p><p class="tvwho">Ronald Reagan</p>`) +
        `<div class="row2">${ex("Your notes", ln("🛒", "$100 → $145") + ln("🏭", "7 in 100 jobless"))}${ex("Still on TV", ln("👥", "52 hostages still held"))}</div>`,
      ask: "Why did this question work for Reagan?",
      options: ["Prices and hostages made many say no", "Most families earned more than in 1976", "Carter skipped the first debate", "It made voters trust Washington"],
      miss: ["Prices rose 45%. Most paychecks fell behind.", "True, but this question was about voters' own lives.", "It asked voters to judge their own lives, not Washington."],
      hint: "Look at your notes and the TV news.",
      reveal: "Many voters judged Carter on <b>stagflation</b> and the <b>hostages</b>." },

    { id: "e3", type: "event", p: 2, date: "Nov. 4, 1980 · 10 PM", kicker: "Election night · Front page", short: "Election-night headline",
      scene: () => ex("Results · Nov. 4, 1980", `<table class="tbl"><tr><th></th><th class="hr">Reagan</th><th class="hc">Carter</th><th class="ha">Anderson</th></tr>
          <tr><td>U.S. vote</td><td>50.7%</td><td>41.0%</td><td>6.6%</td></tr>
          <tr><td>States won</td><td>44</td><td>6 + D.C.</td><td>0</td></tr>
          <tr><td>Linn County</td><td>46%</td><td>41%</td><td>11%</td></tr></table>`, "National Archives; Iowa county returns") +
        ln("🗓️", "Hostages: held one year today.") + bev("“Front page. Ten minutes.”"),
      ask: "Pick your headline.",
      cards: [
        { icon: "🗞️", t: "Explain the win", line: "“Worried About Prices, Voters Pick Reagan”", fx: { fair: 2, read: 1 }, res: "Accurate and fair. It explains without cheering.", cause: "Fair election headline" },
        { icon: "🗞️", t: "Go big", line: "“CARTER CRUSHED!”", fx: { fair: -2, read: 2 }, res: "It sells. But 4 in 10 voters chose Carter.", cause: "Hyped headline" },
        { icon: "🗞️", t: "Keep it small", line: "“Reagan Barely Gets Half the Vote”", fx: { fair: -2, read: -1 }, res: "He won 44 states. That's not barely. Readers notice.", cause: "Downplayed the win" }
      ],
      reveal: "A <b>landslide</b>: Reagan won 44 of 50 states." },

    { id: "c6", type: "check", p: 2, std: "US.47", date: "Nov. 4, 1980 · 11 PM", kicker: "Exit poll · Who switched?", short: "Exit poll: Reagan Democrats", stamp: "FACT-CHECKED",
      scene: () => voter("👨🏻‍🔧", "Duane", "Waterloo", "Democrat my whole life. My dad too. This year? Reagan.", "R") +
        ex("Exit poll · 15,201 voters", chart([["Democrats → Reagan", 27, "r"], ["Union homes → Reagan", 45, "r"], ["Union homes → Carter", 48, "c"], ["Ages 18–29 → Anderson", 11, "a"]]), "CBS News / New York Times exit poll (Roper Center)"),
      ask: "What does this poll show?",
      options: ["1 in 4 Democrats chose Reagan", "Union homes all chose Carter", "Most young voters chose Anderson", "Every Democrat stayed with Carter"],
      miss: ["Union homes: 48 Carter, 45 Reagan. Almost a tie.", "Anderson got 11% of young voters. Not most.", "27% of Democrats chose Reagan."],
      hint: "Read the top bar.",
      reveal: "<b>Reagan Democrats</b>: Democrats, often working-class, who switched to Reagan." },

    { id: "c7", type: "check", p: 2, std: "US.46", date: "Jan. 20, 1981", kicker: "Inauguration Day · Two views", short: "Reagan vs. New Deal view of government", stamp: "FACT-CHECKED",
      scene: () => `<div class="row2">${ex("1930s–1960s", ln("🏛️", "FDR's <b>New Deal</b>") + ln("🏥", "LBJ's <b>Great Society</b>") + `<p class="arrow">→ Social Security, Medicare, job programs</p>`)}${ex("Reagan · Jan. 20, 1981", `<p class="quote">“Government is not the solution to our problem; government is the problem.”</p>`, "Inaugural address")}</div>` +
        ex("Trust Washington most of the time?", chart([["1964", 77], ["1980", 25, "hot"]]), "American National Election Studies") +
        ln("🎗️", "Minutes later, Iran frees the hostages."),
      ask: "How was Reagan's view different from FDR's and LBJ's?",
      options: ["Government should do less", "Government should do more", "Only the military should shrink", "Leave FDR's programs untouched"],
      miss: ["That was FDR's and LBJ's view. Reagan flipped it.", "Reagan wanted a BIGGER military.", "He called government “the problem.” He wanted cuts."],
      hint: "Reread his quote. Problem or solution?",
      reveal: "<b>Limited government</b>: lower taxes, fewer rules, less federal spending." },

    { id: "end", type: "ending", p: 2, date: "Nov. 5, 1980", kicker: "Morning edition" },
    { id: "write", type: "write", p: 2, date: "Nov. 5, 1980", kicker: "File your story" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check" || s.type === "sort");
  const EVENTS = STEPS.filter(s => s.type === "event");

  const PROMPTS = [
    { id: "voter", short: "Why one voter chose their candidate", label: "1. Your story: Why did ONE voter pick their candidate?",
      bank: ["👨🏻‍🔧 Duane", "👩🏼 Arlene", "👩🏽‍💼 Teresa", "👩🏾‍🏫 Gloria", "👩🏻‍⚕️ Marge", "🧑🏼‍🎓 Kevin"],
      stem: "___ voted for ___ because ___.", min: 60, newWords: 5,
      mustAll: [["duane", "arlene", "teresa", "gloria", "marge", "kevin", "worker", "factory", "mom", "mother", "church", "store", "owner", "teacher", "nurse", "student"], ["reagan", "carter", "anderson"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name the voter, who they voted for, AND why (use “because”).",
      pairs: { duane: ["paycheck", "price", "job", "laid", "layoff", "plant", "money", "economy", "inflation", "stagflation", "union", "democrat", "cost", "pay", "work"],
        arlene: ["prayer", "pray", "school", "abortion", "church", "value", "religio", "faith", "family", "god", "christian"],
        teresa: ["tax", "irs", "form", "rule", "regulat", "store", "business", "paperwork", "government"],
        gloria: ["loan", "training", "program", "student", "help", "cut", "college", "teach"],
        marge: ["war", "soviet", "son", "peace", "tough", "military", "fight"],
        kevin: ["third", "neither", "both", "far right", "price", "independent", "choice", "option", "party"] },
      pairMsg: "In answer 1, use a reason from that voter's own interview (like Duane's paycheck)." },
    { id: "view", short: "Reagan's view vs. New Deal / Great Society", label: "2. Your analysis: How was Reagan's view of government different from FDR's and LBJ's?",
      bank: ["🏛️ New Deal", "🏥 Great Society", "✂️ limited government"],
      stem: "FDR and LBJ thought government should ___. Reagan thought ___.", min: 60, newWords: 5,
      mustAll: [["new deal", "great society", "fdr", "lbj", "roosevelt", "johnson"], ["less", "smaller", "small", "limit", "cut", "problem", "fewer", "lower", "shrink"]],
      mustMsg: "In answer 2, show BOTH views: what FDR/LBJ wanted AND that Reagan wanted less government (smaller, cut, limit…)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: { fair: START.fair, read: START.read }, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.fx || !st.picks) st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts clean.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const fairNow = () => clamp(st.fx.fair);
  const readNow = () => clamp(st.fx.read);
  const partDone = i => CHECKS.filter(c => c.p === i).every(c => st.done[c.id]) && EVENTS.filter(e => e.p === i).every(e => st.picks[e.id] != null);

  // ---------------- HUD ----------------
  const bevMood = f => f >= 8 ? "😄" : f >= 6 ? "🙂" : f >= 4 ? "😐" : "😠";
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const f = fairNow(), r = readNow();
    $("fairFill").style.width = (f * 10) + "%"; $("fairNum").textContent = f + "/10";
    $("readFill").style.width = (r * 10) + "%"; $("readNum").textContent = r + "/10";
    $("bMood").textContent = bevMood(f);
    $("youName").textContent = st.name;
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("dateChip").textContent = "📅 " + step.date;
    const off = ["ending", "write"].includes(step.type);
    $("parts").innerHTML = PARTS.map((p, i) => `<span class="${partDone(i) ? "won" : i === step.p && !off ? "now" : ""}">${partDone(i) ? "✓" : p.icon} ${p.tag}</span>`).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
  }
  function bump(id, delta) {
    const el = $(id); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + (delta > 0 ? "good" : "bad");
    f.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  const snap = () => ({ f: fairNow(), r: readNow() });
  function moved(before) {
    hud();
    const f = fairNow(), r = readNow();
    bump("mFair", f - before.f);
    bump("mRead", r - before.r);
    if (f !== before.f) { const b = $("bossBox"); b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); }
  }
  function fxChips(fx) {
    const out = [];
    if (fx.fair) out.push(`<span class="fx ${fx.fair > 0 ? "g" : "b"}">⚖️ ${fx.fair > 0 ? "+" : "−"}${Math.abs(fx.fair)}</span>`);
    if (fx.read) out.push(`<span class="fx ${fx.read > 0 ? "g" : "b"}">🗞️ ${fx.read > 0 ? "+" : "−"}${Math.abs(fx.read)}</span>`);
    if (!fx.fair && !fx.read) out.push(`<span class="fx n">🗞️ ±0</span>`);
    return out.join("");
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
    if (nx.type === "ending") return "See the morning paper ▶";
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
        <div class="paper"><p class="mast">THE PRAIRIE LEDGER</p><p class="dateline">Fall 1980 · Iowa · 15¢</p>
          <p class="hl">WHY ARE IOWANS SWITCHING?</p>
          <div class="btns">${pin("R")}${pin("C")}${pin("A")}</div></div>
        ${bev("“Find out why people vote. Don't pick a side.”")}
      </div>
      <div class="tcopy">
        <p class="tk">U.S. History · Unit 5 · Day 1</p>
        <h1>Election Desk 1980</h1>
        <p class="hook">Prices soaring. Hostages on TV. Iowa up for grabs.</p>
        <ul class="how"><li><span>🔍</span>Get the facts right</li><li><span>🎤</span>Interview 6 Iowans</li><li><span>⚖️</span>Write fair headlines</li></ul>
        <p class="tline">🎯 Goal: explain why voters chose Reagan, Carter, or Anderson.</p>
        <p class="tchips"><span>⏱️ 25 min</span><span>🔍 7 checks</span><span>🗞️ 3 big calls</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Start your shift 🗞️</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The voters, editor and newspaper are made up. Every number is real. Standards: SS.9-12.US.46, US.47, US.49.</p>
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
    st.fx.read = clamp(st.fx.read - 1);
    st.lockUntil = Date.now() + LOCK * 1000;
    st.lockMsg = why;
    save(); moved(before);
    stamp("CORRECTION", "bad");
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    st.done[step.id] = true; save(); hud();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check: one multiple-choice fact check ----
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
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ In your notes</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Sort: tag each voter's reason ----
  let bp = {}, curSort = null;
  function sort(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="rows"></div><button type="button" class="go lock" id="lockBtn" disabled>Lock it in 📝</button><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
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
    box.innerHTML = step.rows.map((r, i) => `<div class="brow" data-i="${i}"><span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span><div class="chips" role="group" aria-label="${esc(r.t)}">${chipOrder.map(o => `<button type="button" class="chip" aria-pressed="false" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div></div>`).join("");
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

  // ---- Event: a reporting call ----
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><span class="dline">${esc(c.line)}</span></button>`; }).join("")}</div><p class="peek">⚖️ 🗞️ You'll see the effect after you pick.</p>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      const before = snap();
      st.picks[step.id] = i;
      st.fx.fair = clamp(st.fx.fair + (c.fx.fair || 0));
      st.fx.read = clamp(st.fx.read + (c.fx.read || 0));
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span><b>${esc(c.t)}</b><br><span class="dline">${esc(c.line)}</span></span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${esc(c.res)}</p>`;
    if (!quiet) stamp(c.fx.fair > 0 ? "FAIR" : "SLANTED", c.fx.fair > 0 ? "" : "bad");
    addNext(step, step.reveal, quiet);
  }

  // ---- Endings ----
  function ending() {
    const f = fairNow(), r = readNow();
    let e;
    if (f >= GOAL.fair && r >= GOAL.read) e = { key: "Front Page", out: "Front page", icon: "🏆", cls: "best", text: "Your story leads the paper. Letters pour in from Reagan AND Carter voters: “Finally, someone got it right.”" };
    else if (f >= GOAL.fair) e = { key: "Page 9", out: "Fair, but buried on page 9", icon: "📄", cls: "mid", text: "Fair story, but too many corrections. Bev buries it on page 9." };
    else if (r >= 6) e = { key: "Hot Take", out: "Sold well, but slanted", icon: "🔥", cls: "mid", text: "It sells out. Then angry letters pile up. Half your readers think you picked a side." };
    else e = { key: "Spiked", out: "Story spiked", icon: "🗑️", cls: "low", text: "Bev kills the story. “Readers can't trust it.”" };
    const causes = EVENTS.filter(s => st.picks[s.id] != null).map(s => { const k = s.cards[st.picks[s.id]]; return k.cause + " " + fxPlain(k.fx); });
    const w = Object.values(st.wrong).reduce((a, b) => a + b, 0);
    if (w) causes.push(w > 2 ? "Shaky facts cost you readers 🗞️" : "A correction or two 🗞️");
    e.causes = causes;
    return e;
  }
  const fxPlain = fx => "(" + ([fx.fair ? "⚖️ " + (fx.fair > 0 ? "+" : "−") + Math.abs(fx.fair) : "", fx.read ? "🗞️ " + (fx.read > 0 ? "+" : "−") + Math.abs(fx.read) : ""].filter(Boolean).join(" ") || "±0") + ")";
  const myHeadline = () => { const e3 = STEPS.find(s => s.id === "e3"); const p = st.picks.e3; return p != null ? e3.cards[p].line.replace(/[“”]/g, "") : "Reagan Wins"; };

  function endingStep(step) {
    const e = ending();
    shell(step, `<div class="paper big"><p class="mast">THE PRAIRIE LEDGER</p><p class="dateline">Wed., Nov. 5, 1980 · Morning edition</p><p class="hl">${esc(myHeadline())}</p><p class="byline">By ${esc(st.name)}</p></div>
        <div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">⚖️ Fair ${fairNow()}/10 · 🗞️ Readers ${readNow()}/10</p></div><div id="after"></div>`);
    const b = nextBtn(step); b.textContent = "✏️ File your story ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="typed"><p class="cbh">🖨️ Copy desk · Due now</p><p><b>Headline:</b> ${esc(myHeadline())}</p><p><b>Result:</b> ${e.icon} ${esc(e.key)}</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: add a real number from the game, like 45% or 27%.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "File it + turn in ▶"}</button>
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
    const testT = window.classIsTestT && window.classIsTestT();   // Test T. (teacher) skips the writing rules
    for (const p of (testT ? [] : PROMPTS)) {
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
      if (p.pairs) { const named = Object.keys(p.pairs).filter(has); if (named.length && !named.some(n => p.pairs[n].some(has))) return bad(p.pairMsg); }
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
      if (s.type === "check" || s.type === "sort") {
        const w = st.wrong[s.id];
        const ans = s.type === "check" ? s.options[0] : s.rows.map(r => r.t + " = " + r.opts[0].replace(/^\S+\s/, "")).join(" · ");
        answers[s.std + " · " + s.short] = ans + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Wrong tries (teacher only)"] = Object.values(st.wrong).reduce((x, y) => x + y, 0) + " total";
    answers["Fair reporting meter"] = fairNow() + " of 10";
    answers["Readers meter"] = readNow() + " of 10";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Story filed!"; msg.className = "msg good";
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
        if ((s.type === "check" || s.type === "sort") && !st.done[s.id]) { st.done[s.id] = true; st.lockUntil = 0; save(); render(); }
        else if (s.type === "event" && st.picks[s.id] == null) { const b = document.querySelector("#dbox .dcard"); if (b) b.click(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
