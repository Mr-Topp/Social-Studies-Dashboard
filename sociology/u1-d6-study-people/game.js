// =====================================================================
//  RESEARCH RIVALS  (Sociology · Unit 1 · Day 6 · How Should We Study People?)
//  You run Cedar River Research Co. Each client brings a question about people.
//  You play a METHOD CARD (survey, interview, observation, experiment, content
//  analysis). Each card costs money and days. The wrong card = a garbage report
//  you have to redo. A shortcut setup = a report the rival agency can expose.
//  Money and days carry forward; the last job needs two methods, and only
//  careful players can afford it. Five evidence checks are woven into play.
//  Word-budget trim (2026-11-03): every screen is short; results, evidence
//  checks, garbage reports, the leak, the ending and the writing each get
//  their own screen so no screen stacks up text.
//  Everything plays in English underneath; es.js + shared/lang.js swap the
//  words on screen for the Spanish reader.
// =====================================================================
(function () {
  "use strict";

  const KEY = "soc-u1-d6-study-people-v2";
  const ASSIGNMENT_ID = "soc-u1-d6-study-people";
  const TITLE = "Sociology · Unit 1 · Day 6 · How Should We Study People?";
  const STANDARD = "SS.9-12.Soc.1, SS.9-12.Soc.3";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;
  const START = { money: 1000, days: 51, rep: 5, hype: 2 };  // 51 (was 48): room for one honest wrong card before the 2-card final job
  const TOTAL_STEPS = 24;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const cash = n => (n < 0 ? "−" : "") + "$" + Math.abs(n).toLocaleString("en-US");
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (isEs() ? window.SiteLang.t(s) : s);

  // ---------------- The method cards: name + the question each one answers ----------------
  const ORDER = ["survey", "interview", "observe", "experiment", "content"];
  const M = {
    survey:     { icon: "📋", name: "Survey", q: "How many?", cost: 300, days: 3, reach: 5, depth: 1 },
    interview:  { icon: "🎙️", name: "Interview", q: "Why?", cost: 500, days: 6, reach: 1, depth: 5 },
    observe:    { icon: "👀", name: "Observation", q: "What people DO", cost: 300, days: 5, reach: 3, depth: 3 },
    experiment: { icon: "🧪", name: "Experiment", q: "What causes what?", cost: 800, days: 7, reach: 2, depth: 3 },
    content:    { icon: "📺", name: "Content Analysis", q: "What media shows", cost: 200, days: 3, reach: 4, depth: 2 }
  };

  // ---------------- Little drawing helpers ----------------
  const bars = (rows, note) => `<div class="bars">${rows.map(r => `<div class="brow"><span class="bl">${r[0]}</span><span class="bt"><i style="width:${Math.min(100, r[2] || r[1])}%"></i></span><b class="bv">${r[3] || r[1] + "%"}</b></div>`).join("")}</div><p class="madeup">${note || "Made-up game data"}</p>`;
  const quote = q => `<blockquote class="quote">${q}</blockquote>`;
  const post = (txt, likes) => `<div class="post"><div class="p-ava" aria-hidden="true">🔥</div><div class="p-body"><div class="p-head"><b>Blake</b> <span class="handle">@HotTake</span></div><p class="p-text">${txt}</p><div class="p-meta" aria-hidden="true">❤️ ${likes || "1.2K"} · 🔁 ${Math.round(parseFloat(likes || "1.2") * 280)}</div></div></div>`;
  const quiet = () => `<div class="post quiet"><div class="p-ava" aria-hidden="true">😤</div><div class="p-body"><div class="p-head"><b>Blake</b></div><p class="p-text">No holes. 😤</p></div></div>`;
  // A character talking in a speech bubble.
  const say = (av, who, txt, cls) => `<div class="say ${cls || ""}"><span class="say-ava" aria-hidden="true">${av}</span><div class="say-b"><span class="say-n">${who}</span><p>${txt}</p></div></div>`;
  const unlock = html => `<div class="unlock"><span class="u-ic" aria-hidden="true">💡</span><div><p class="u-tag">Concept unlocked</p><p class="u-txt">${html}</p></div></div>`;

  // ---------------- The six jobs ----------------
  const JOBS = [
    { id: "j1", icon: "🧑‍💼", who: "Linn County Jobs Center", pay: 600, best: "survey",
      ask: "Do most teens here have a school-year job?",
      fits: {
        interview: { fit: "wrong", text: "8 teens, great stories. But what PERCENT work? 8 people can't tell you." },
        observe: { fit: "wrong", text: "You saw 6 teens at one drive-thru. That's not the whole county." },
        experiment: { fit: "wrong", text: "What would you change? You can't assign teens jobs. Nothing to test." },
        content: { fit: "wrong", text: "140 \"Now Hiring\" posts show open jobs, not teens who work." }
      },
      preCheck: "c1",
      setup: {
        A: { icon: "🌙", title: "9 p.m. link only", label: "Send an online link at 9 p.m. only", sub: "Free. Online only.", cost: 0, days: 0 },
        B: { icon: "📝", title: "Paper + online, all day", label: "Paper survey in class + online link, any time", sub: "Reaches night-shift teens.", cost: 200, days: 1 }
      },
      solid: { data: () => bars([["Have a job", 38], ["No job", 62]]), text: "1,140 teens answered, from every shift.",
        reveal: "<b>Survey</b> = same questions, many people. Shows <b>how common</b> something is." },
      shaky: { data: () => bars([["Have a job", 19], ["No job", 81]]),
        rival: "A 9 p.m. survey? Who's AT WORK at 9 p.m.? 🤡",
        reveal: "<b>Sampling bias</b>: your link missed teens working nights." },
      logSolid: "Fair survey sample", logShaky: "9 p.m. link: sampling bias"
    },
    { id: "j2", icon: "🩺", who: "Iowa Teen Health Group", pay: 500, best: "content",
      ask: "How do energy-drink ads show teens?",
      fits: {
        survey: { fit: "wrong", text: "You asked what teens THINK. Nobody looked at an actual ad." },
        interview: { fit: "wrong", text: "4 teens said the drinks taste like batteries. Still zero ads studied." },
        observe: { fit: "wrong", text: "Teens scrolled too fast to see ads, and kept staring at you." },
        experiment: { fit: "wrong", text: "That tests what an ad DOES, not what ads SHOW." }
      },
      setup: {
        A: { icon: "📱", title: "Your own feed", label: "Screenshot ads from your own feed", sub: "Free. Your screenshots.", cost: 0, days: 0 },
        B: { icon: "🎲", title: "200 random ads + rules", label: "Random sample of 200 ads + written counting rules", sub: "Others could repeat your count.", cost: 100, days: 2 }
      },
      solid: { data: () => bars([["Athletes", 44], ["Gamers", 27], ["Partying", 18], ["Studying", 11]], "Share of 200 ads · made-up game data"), text: "200 ads, all counted the same way.",
        reveal: "<b>Content analysis</b> = sample media, make categories, count. Shows media <b>messages</b>." },
      shaky: { data: () => bars([["Gamers", 70], ["Athletes", 20], ["Partying", 10]], "Share of your screenshots · made-up game data"),
        rival: "Cedar River's big \"study\" = one guy's For You page. 💀",
        reveal: "<b>Sampling bias</b> again: your feed is picked for YOU, not most teens." },
      check: "c2", checkBtn: "Reply to Blake",
      logSolid: "200 random ads, clear rules", logShaky: "Own feed: sampling bias"
    },
    { id: "j3", icon: "🏫", who: "Prairie Ridge High counselor", pay: 800, best: "interview",
      ask: "Juniors quit coming after winter break. WHY?",
      fits: {
        survey: { fit: "ok", data: () => bars([["Other", 41], ["Work", 22], ["Bored", 22], ["Sick", 15]]),
          rival: "Cedar River found the #1 reason: \"Other.\" Big discovery. 🙄",
          reveal: "Surveys show <b>how many</b>. This client asked <b>why</b>. That's an interview's job." },
        observe: { fit: "wrong", text: "You watched the hallway. The kids who stopped coming weren't there." },
        experiment: { fit: "wrong", text: "You can't make students drop out to compare. That would hurt people." },
        content: { fit: "wrong", text: "The school's posts show pep rallies. Nothing about why kids leave." }
      },
      setup: {
        A: { icon: "👥", title: "Just 6 students", label: "Talk with 6 students this week", sub: "Fast and free.", cost: 0, days: 0 },
        B: { icon: "🔒", title: "20 students, no names", label: "Talk with 20 students. Report patterns, not names.", sub: "Slower. Protects privacy.", cost: 300, days: 4 }
      },
      solid: { data: () => quote("\"I work nights to help with rent.\"") + quote("\"They cut my bus route.\"") + `<p class="madeup">Made-up quotes from 20 talks</p>`,
        reveal: "<b>Interview</b> = talk and ask follow-ups to find <b>reasons</b>." },
      shaky: { data: () => quote("\"I just stopped caring, I guess.\"") + `<p class="madeup">Made-up quotes</p>`,
        rival: "6 kids. SIX. That's not a pattern, that's a lunch table. 🍕",
        reveal: "Interviews go deep but slow, so groups are <b>small</b>. Too small = not everyone." },
      check: "c3", checkBtn: "File your report",
      logSolid: "20 private interviews", logShaky: "Only 6 interviews", logOk: "Survey for a WHY question"
    },
    { id: "j4", icon: "🍕", who: "Prairie Ridge lunch manager", pay: 600, best: "observe",
      ask: "Where do lunch lines ACTUALLY back up?",
      fits: {
        survey: { fit: "ok", data: () => bars([["Pizza line", 58], ["Card reader", 30], ["Salad bar", 12]], "Where students SAY it's worst · made-up game data"),
          rival: "Cedar River asked kids where the line is. Bro, just go LOOK. 👀",
          reveal: "When the question is what people <b>do</b>, watch them: <b>observation</b>." },
        interview: { fit: "wrong", text: "3 long talks about lunch feelings. Nobody knows which minute it jams." },
        experiment: { fit: "wrong", text: "You moved the salad bar before finding the jam. Now it's worse." },
        content: { fit: "wrong", text: "Lots of pizza pics online. Zero line data." }
      },
      setup: {
        A: { icon: "📋", title: "2 days with a clipboard", label: "Stand by the lines with a clipboard for 2 days", sub: "Quick. Everyone sees you.", cost: 0, days: 0 },
        B: { icon: "🕶️", title: "All week, no faces", label: "Come back all week so people get used to you. Count, don't film faces.", sub: "People get used to you.", cost: 200, days: 3 }
      },
      solid: { data: () => bars([["Card reader", 31, 100, "31"], ["Pizza line", 12, 39, "12"], ["Salad bar", 3, 10, "3"]], "Students in line at 11:40 · made-up game data"), text: "The jam: ONE card reader at 11:40.",
        reveal: "<b>Observation</b> = watching what people <b>actually do</b>, in a real place." },
      shaky: { data: () => bars([["Card reader", 8, 26, "8"], ["Pizza line", 9, 29, "9"], ["Salad bar", 3, 10, "3"]], "Students in line at 11:40 · made-up game data"),
        rival: "Our lunch lines are \"fine\"? Has Cedar River MET teenagers? 😂",
        reveal: "2 days wasn't enough. People behaved because you watched." },
      check: "c4", checkBtn: "File your report",
      logSolid: "Watched all week", logShaky: "2 days: Hawthorne effect", logOk: "Survey for a DO question"
    },
    { id: "j5", icon: "📱", who: "StudyStreak homework app", pay: 1200, best: "experiment",
      ask: "Does our homework app RAISE test scores? Prove it.",
      fits: {
        survey: { fit: "ok", data: () => bars([["Users who say it helps", 92]]),
          rival: "\"92% say it works!\" My cousin says he's 6'5\". 📏",
          reveal: "Proving a <b>cause</b> takes an <b>experiment</b> with a control group." },
        interview: { fit: "wrong", text: "5 users loved the confetti. Stories don't prove scores went up." },
        observe: { fit: "wrong", text: "Lots of tapping. Still no idea if scores changed." },
        content: { fit: "wrong", text: "Their ads say \"Ace your test!\" That's a claim, not proof." }
      },
      setup: {
        A: { icon: "📲", title: "App for everyone", label: "Give the app to everyone. Check scores after.", sub: "Check scores after.", cost: 0, days: 0 },
        B: { icon: "⚖️", title: "Two groups + consent", label: "Two groups: one uses the app, one doesn't (a control group). Get signed consent first.", sub: "A control group gets no app.", cost: 300, days: 2 }
      },
      solid: { data: () => bars([["App: before", 72, 72, "72"], ["App: after", 76, 76, "76"], ["No app: before", 72, 72, "72"], ["No app: after", 75, 75, "75"]], "Average test score · made-up game data"), text: "Both groups' scores are in.",
        reveal: "<b>Experiment</b> = change one thing and compare to a <b>control group</b>." },
      shaky: { data: () => bars([["Before the app", 72, 72, "72"], ["After the app", 75, 75, "75"]], "Average test score · made-up game data"),
        rival: "\"Scores went up after the app!\" So did the temperature. 🧪❌",
        reveal: "No <b>control group</b> = no way to know the app did it." },
      check: "c5", checkBtn: "Answer the investors", bonus: true,
      logSolid: "Control group + consent", logShaky: "No control group", logOk: "Survey for a CAUSE question"
    },
    { id: "j6", icon: "🏛️", who: "Marion city council", pay: 1500, final: true,
      ask: "How many young people will leave Marion, and WHY?"
    }
  ];

  // ---------------- Evidence checks (first option is right; screen shuffles) ----------------
  const CHECKS = {
    c1: { std: "Soc.1", short: "1936 poll = biased sample",
      evidence: () => `<div class="casefile"><p class="cf-tag">📁 Real case, 1936</p><ul class="facts"><li><span aria-hidden="true">📬</span> <span>Mailed 10 million ballots</span></li><li><span aria-hidden="true">🔮</span> <span>Predicted winner: Landon</span></li><li><span aria-hidden="true">🗳️</span> <span>Roosevelt won 46 of 48 states</span></li><li><span aria-hidden="true">📒</span> <span>Names from phone books + car records</span></li><li><span aria-hidden="true">🚫</span> <span>Many poorer voters had neither</span></li></ul><p class="src">Source: Literary Digest poll, fall 1936; Salganik, <i>Bit by Bit</i> (2018).</p></div>`,
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "Bigger is better? Why was this poll wrong?",
      options: ["Its sample didn't match all voters", "It asked too few people", "Voters changed their minds late", "Its ballots went out too early"],
      hint: "Who had no phone or car?",
      why: "<b>Sampling bias</b>: who you ask matters more than how many." },
    c2: { std: "Soc.3", short: "Content analysis can't show what creators meant",
      evidence: () => post("LOL their ad count PROVES drink companies WANT teens to party! 🎉", "2.1K"),
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "Let's reply. What can an ad count NOT tell you?",
      options: ["What the ad makers meant", "How often each ad type appeared", "Which kinds of teens were shown", "How many ads were counted"],
      hint: "A count shows what's IN ads, not in heads.",
      why: "Content analysis shows messages, <b>not what creators meant</b>." },
    c3: { std: "Soc.3", short: "Interviews show the reasons behind a number",
      evidence: () => `<div class="twobox"><div class="tb"><p class="tb-h">📋 Survey</p><p class="bignum">22%</p><p>picked "Work"</p></div><div class="tb"><p class="tb-h">🎙️ Interview</p><p>"I work nights to help with rent. By 8 a.m., I'm too tired."</p></div></div><p class="madeup">Made-up game data</p>`,
      asker: ["🏫", "The counselor"], prompt: "What does the interview give me that the number doesn't?",
      options: ["Why, in students' own words", "Answers from many more students", "Proof jobs cause every absence", "How common the problem is"],
      hint: "The number says how many. The quote says...?",
      why: "Interviews show <b>why</b>. Surveys show <b>how many</b>." },
    c4: { std: "Soc.3", short: "Hawthorne effect: people act different when watched",
      evidence: () => `<div class="notes"><p class="cf-tag">📓 Field notes (made up)</p><p><b>Day 1:</b> Clipboard out. Lines neat. Lunch worker: "They're never this good."</p><p><b>Day 4:</b> Nobody notices me. Card-reader line hits the door.</p></div>`,
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "What problem do these notes show?",
      options: ["People act different when watched", "Too crowded to count anyone", "Students lied on a survey", "Observation only works one day"],
      hint: "Compare Day 1 and Day 4.",
      why: "<b>Hawthorne effect</b>: people act different when they know they're watched.",
      fact: "Named for 1920s studies at the Hawthorne Works factory near Chicago." },
    c5: { asker: ["💼", "The investors"], std: "Soc.1", short: "Control group shows if a change caused the result",
      // Two versions: one for players who ran a control group, one for players who didn't.
      variants: {
        A: { evidence: () => bars([["App: before", 72, 72, "72"], ["App: after", 76, 76, "76"], ["No app: before", 72, 72, "72"], ["No app: after", 75, 75, "75"]], "Your results · made-up game data"),
          prompt: "What do your two groups show?",
          options: ["Both rose, so the app added little", "The app added four whole points", "The app made the other group worse", "Only the app group got better"],
          hint: "Look at BOTH groups. Did the no-app group rise too?" },
        B: { evidence: () => bars([["Before the app", 72, 72, "72"], ["After the app", 75, 75, "75"]], "StudyStreak's own numbers · made-up game data") + post("Up 3 points \"after the app\"? Compared to WHAT? 🧪❌", "4.0K"),
          prompt: "Blake has a point. Why is this not proof?",
          options: ["Nobody compared them to a no-app group", "Three points is too small to count", "Test scores can't be measured", "Too many students used the app"],
          hint: "What would you compare app users to?" }
      },
      why: "<b>Control group</b>: no change, so you can prove <b>cause</b>." }
  };
  const CHECK_IDS = ["c1", "c2", "c3", "c4", "c5"];

  // ---------------- Writing ----------------
  const PROMPTS = [
    { id: "method", short: "My question, method, strength, and limit",
      label: "1. Pitch a study about teen life.",
      stem: "I'd study ___. I'd use ___ because ___. One limit is ___.",
      min: 80, newWords: 6,
      mustAll: [["survey", "interview", "observ", "experiment", "content analysis", "content", "ads", "media"], ["limit", "but", "however", "slow", "small", "watched", "lie", "honest", "cost", "can't", "cannot", "weak", "although", "fake", "time"]],
      mustMsg: "Answer 1: name a method AND one limit." },
    { id: "mixed", short: "Why two methods beat one",
      label: "2. Why use a survey AND interviews?",
      stem: "Both are stronger: the survey shows ___, and interviews show ___.",
      min: 60, newWords: 4,
      mustAll: [["how many", "how common", "number", "numbers", "percent", "%", "many", "pattern", "count", "lots of"], ["why", "reason", "story", "stories", "feel", "detail", "explain", "cause"]],
      mustMsg: "Answer 2: say what the survey shows (how many) AND what interviews show (why)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ v: 2, name: "", started: false, howSeen: false, job: 0, phase: "pick", sel: {}, tried: {}, garbage: {}, pick: {}, setup: {}, fit: {}, paid: {},
    checks: {}, bonus: null, finalSel: [], finalPick: null, finalFit: null, leak: false, leakSeen: false, ending: null,
    money: START.money, days: START.days, rep: START.rep, hype: START.hype, log: [], writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 2) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this device now, don't show the last kid's game or writing.
  try {
    const who = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (st.started && who && st.name && who.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const clamp = () => { st.rep = Math.max(0, Math.min(10, st.rep)); st.hype = Math.max(0, Math.min(10, st.hype)); };
  const addLog = (job, text, delta, kind) => st.log.push({ job, text, delta, kind: kind || (String(delta).indexOf("−") === 0 ? "down" : "up") });

  let locked = false, lockTimer = null, anim = true, justSolved = null;
  const app = $("app");

  // 4 steps per job (job 1: pick, evidence check, plan, results · jobs 2-5: pick, plan, results, evidence check),
  // then the final job (21-22), the ending (23) and the writing (24).
  function stepNow() {
    if (!st.started) return 0;
    if (st.phase === "write") return 24;
    if (st.phase === "end") return 23;
    if (st.job === 5) return st.phase === "pick" ? 21 : 22;
    const base = st.job * 4;
    if (st.phase === "pick") return base + 1;
    if (st.phase === "setup") return st.job === 0 ? ((st.checks.c1 || {}).done ? 3 : 2) : base + 2;
    if (st.phase === "results") return st.job === 0 ? 4 : base + 3;
    return base + 4;
  }

  // ---------------- HUD ----------------
  function hud() {
    const h = $("hud");
    if (!st.started) { h.hidden = true; return; }
    h.hidden = false;
    const jobN = Math.min(6, st.job + 1);
    $("hudJob").textContent = st.phase === "end" || st.phase === "write" ? "Season over" : "Job " + jobN + " of 6";
    $("hudDots").innerHTML = JOBS.map((j, i) => `<i class="${i < st.job || st.phase === "end" || st.phase === "write" ? "done" : i === st.job ? "now" : ""}"></i>`).join("");
    $("hudMoney").textContent = cash(st.money);
    $("hudMoney").parentElement.classList.toggle("neg", st.money < 0);
    $("hudDays").textContent = String(st.days);
    $("hudDays").parentElement.classList.toggle("neg", st.days < 0);
    $("repFill").style.width = st.rep * 10 + "%";
    $("repNum").textContent = st.rep + "/10";
    $("hypeFill").style.width = st.hype * 10 + "%";
    $("hypeNum").textContent = st.hype + "/10";
    const mood = $("blakeMood");
    if (mood && mood.textContent !== (st.mood || "😎")) { mood.textContent = st.mood || "😎"; bounce(mood); }
    const cur = { money: st.money, days: st.days, rep: st.rep, hype: st.hype };
    if (prevHud) {
      floatDelta("hudMoney", cur.money - prevHud.money, true);
      floatDelta("hudDays", cur.days - prevHud.days);
      floatDelta("repNum", cur.rep - prevHud.rep);
      floatDelta("hypeNum", cur.hype - prevHud.hype, false, true);
    }
    prevHud = cur;
  }
  let prevHud = null;
  function bounce(el) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
  function floatDelta(id, d, money, badUp) {
    if (!d) return;
    const host = $(id) && $(id).closest(".tok,.meter");
    if (!host) return;
    const f = document.createElement("span");
    const good = badUp ? d < 0 : d > 0;
    f.className = "float " + (good ? "up" : "down"); f.setAttribute("aria-hidden", "true");
    f.textContent = (d > 0 ? "+" : "−") + (money ? "$" + Math.abs(d).toLocaleString("en-US") : Math.abs(d));
    host.appendChild(f);
    setTimeout(() => f.remove(), 1600);
  }
  function flash(id) { const el = $(id); if (el) bounce(el); }

  // ---------------- Pieces ----------------
  function clientCard(j) {
    return `<div class="client"><div class="c-ava" aria-hidden="true">${j.icon}</div><div class="c-body">
      <p class="c-who"><span aria-hidden="true">📞</span> <b>${j.who}</b> <span class="fict">Made-up client</span></p>
      <p class="c-ask">“<span>${j.ask}</span>”</p>
      <p class="c-pay"><span class="coin" aria-hidden="true">💰</span> <b>${cash(j.pay)}</b></p></div></div>`;
  }
  const kick = (n, label) => `<p class="kicker"><span>Job ${n} of 6</span>${label ? ` · <span>${label}</span>` : ""}</p>`;
  function pips(n) { return "●●●●●".slice(0, n) + `<span class="off">${"●●●●●".slice(0, 5 - n)}</span>`; }
  function cardHtml(k, opts) {
    const m = M[k], o = opts || {};
    return `<button type="button" class="mcard m-${k}${o.sel ? " sel" : ""}${o.tried ? " tried" : ""}" data-m="${k}" aria-pressed="${o.sel ? "true" : "false"}"${o.tried || o.off ? " disabled" : ""}>
      ${o.tried ? `<span class="stampmini">🗑️ <span>Garbage</span></span>` : ""}
      <span class="mc-top"><span class="mc-icon" aria-hidden="true">${m.icon}</span><span class="mc-name">${m.name}</span></span>
      <span class="mc-q"><span aria-hidden="true">❓</span> <span>${m.q}</span></span>
      <span class="mc-pips"><span class="pl">Reach</span> <span class="pv">${pips(m.reach)}</span> <span class="pl">Depth</span> <span class="pv">${pips(m.depth)}</span></span>
      <span class="mc-cost"><span>💵 ${cash(m.cost)}</span><span>📅 <span>${m.days} days</span></span></span>
    </button>`;
  }
  function stamp(kind) {
    const t = { solid: ["✅", "SOLID REPORT"], shaky: ["⚠️", "SHAKY REPORT"], ok: ["🟡", "HALF THE STORY"], garbage: ["🗑️", "GARBAGE REPORT"] }[kind];
    return `<p class="stamp s-${kind}"><span aria-hidden="true">${t[0]}</span> <span>${t[1]}</span></p>`;
  }
  function deltaLine(parts) {
    return `<p class="payline">${parts.map(p => `<span class="pp ${p[1] || ""}">${p[0]}</span>`).join("")}</p>`;
  }
  const payOf = (got, full) => "💵 +" + cash(got) + (got < full ? " / " + cash(full) : "");

  // ---------------- Screens ----------------
  function intro() {
    app.innerHTML = `<section class="intro">
      <div class="intro-left">
        <p class="kick">Made-up agency game</p>
        <h1>Research Rivals</h1>
        <p class="hook">Fast, cheap answers vs. real research.</p>
        <ul class="chips"><li>🃏 6 jobs</li><li>⏱ 25 min</li><li>🔒 5 checks</li><li>✍️ 2 answers</li></ul>
        <p class="goal"><b>🎯 Goal:</b> Match methods to questions. Know their limits.</p>
        <label for="nameBox" class="namelab">First name + last initial</label>
        <div class="startrow"><input id="nameBox" maxlength="40" autocomplete="off" placeholder="Like Jordan M." value="${esc(st.name)}">
        <button type="button" class="go big" id="startBtn">Open the agency →</button></div>
        <p id="introMsg" class="msg" role="status"></p>
      </div>
      <div class="intro-art" aria-hidden="true">
        <div class="fan">${ORDER.map(k => `<div class="fcard m-${k}"><span>${M[k].icon}</span></div>`).join("")}</div>
        ${post("Research? Ask my app. 😎", "8.8K")}
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.started = true; st.job = 0; st.phase = "pick"; save(); render(); window.scrollTo(0, 0);
    };
  }

  // Shown once, before job 1.
  function howScreen() {
    app.innerHTML = `<section class="card howcard">
      <h2 class="how-h">How it works</h2>
      <div class="how-art" aria-hidden="true"><div class="fan small">${ORDER.map(k => `<div class="fcard m-${k}"><span>${M[k].icon}</span></div>`).join("")}</div><span class="vs">VS</span><span class="ava rivalava big">😎</span></div>
      <ul class="howlist"><li><span class="hi" aria-hidden="true">🃏</span> <span>Match a card to the question</span></li><li><span class="hi" aria-hidden="true">💵📅</span> <span>Money and days carry over</span></li><li><span class="hi" aria-hidden="true">🔥</span> <span>Sloppy work feeds rival Blake</span></li></ul>
      <button type="button" class="go" id="howBtn">Got it →</button></section>`;
    $("howBtn").onclick = () => { st.howSeen = true; anim = true; save(); render(); window.scrollTo(0, 0); };
  }

  // A wrong card: its own screen, then back to the cards.
  function garbageScreen(j, g) {
    const gm = M[g.m];
    app.innerHTML = `<section class="card job">${kick(st.job + 1)}
      <div class="garbage" id="garb"><div class="paper crumpled">${stamp("garbage")}<p class="g-what"><span aria-hidden="true">${gm.icon}</span> <b>${gm.name}</b></p><p>${j.fits[g.m].text}</p></div>
      ${say(j.icon, j.who, "Not paying for this. Try another card.", "angry")}
      ${deltaLine([["💵 −" + cash(gm.cost), "down"], ["📅 −" + gm.days, "down"], ["⭐ −1", "down"], ["🔥 +1", "down"]])}</div>
      <button type="button" class="go next" id="retryBtn">Try another card →</button></section>`;
    $("retryBtn").onclick = () => { g.show = false; anim = true; save(); render(); window.scrollTo(0, 0); };
  }

  function pickScreen() {
    const j = JOBS[st.job];
    const tried = st.tried[j.id] || [];
    const sel = st.sel[j.id];
    const g = st.garbage[j.id];
    if (st.job === 0 && !st.howSeen && !tried.length && !sel) return howScreen();
    if (g && g.show) return garbageScreen(j, g);
    let html = `<section class="card job">${kick(st.job + 1)}${clientCard(j)}`;
    html += `<div class="hand">${ORDER.map(k => cardHtml(k, { sel: sel === k, tried: tried.includes(k) })).join("")}</div>`;
    const m = sel && M[sel];
    html += `<div class="playbar">${m ? `<p class="pb-sel"><span aria-hidden="true">${m.icon}</span> <b>${m.name}</b> <span class="pb-cost">💵 ${cash(m.cost)} · 📅 <span>${m.days} days</span></span></p><button type="button" class="go" id="playBtn">Play this card →</button>` : `<p class="pb-none"><span aria-hidden="true">👆</span> <span>Tap a card</span></p>`}</div></section>`;
    app.innerHTML = html;
    app.querySelectorAll(".mcard").forEach(b => b.onclick = () => { st.sel[j.id] = b.dataset.m; save(); render(); const p = $("playBtn"); if (p) p.scrollIntoView({ block: "nearest", behavior: "smooth" }); });
    if ($("playBtn")) $("playBtn").onclick = () => playCard(j, sel);
  }

  function playCard(j, k) {
    const m = M[k];
    st.money -= m.cost; st.days -= m.days;
    st.sel[j.id] = null;
    if (k === j.best) {
      st.pick[j.id] = k; st.garbage[j.id] = null; st.phase = "setup"; anim = true;
      save(); render(); window.scrollTo(0, 0); flash("hudMoney"); return;
    }
    const f = j.fits[k];
    if (f.fit === "wrong") {
      (st.tried[j.id] = st.tried[j.id] || []).push(k);
      st.garbage[j.id] = { m: k, show: true };
      st.rep -= 1; st.hype += 1; st.mood = "😂"; clamp(); anim = true;
      addLog(st.job + 1, "Garbage report: " + m.name, "−1 ⭐", "down");
      save(); render(); window.scrollTo(0, 0); flash("hudMoney"); flash("repNum");
      return;
    }
    // "ok": accepted, but only half the story
    st.pick[j.id] = k; st.fit[j.id] = "ok"; st.garbage[j.id] = null;
    const pay = j.pay - 300; st.money += pay; st.paid[j.id] = pay; st.rep -= 1; st.hype += 1; st.mood = "😏"; clamp(); anim = true;
    addLog(st.job + 1, j.logOk, "−1 ⭐", "down");
    flash("repNum");
    st.phase = "results"; save(); render(); window.scrollTo(0, 0); flash("hudMoney");
  }

  function setupScreen() {
    const j = JOBS[st.job], m = M[st.pick[j.id]];
    const pre = j.preCheck && !(st.checks[j.preCheck] || {}).done;
    const mini = `<div class="minicard m-${st.pick[j.id]}" aria-hidden="true"><span>${m.icon}</span><b>${m.name}</b></div>`;
    let html = `<section class="card job">${kick(st.job + 1, pre ? "Evidence check" : "Plan the study")}`;
    if (pre) {
      // Job 1: the evidence check comes first, on its own screen.
      html += checkHtml(j.preCheck);
    } else {
      html += `<div class="played">${mini}${say(j.icon, j.who, j.preCheck ? "How will you run it?" : "Good pick. How will you run it?")}</div>`;
      if (j.preCheck) html += checkHtml(j.preCheck);
      html += `<div class="setups" id="setupH">${["A", "B"].map(x => {
        const s = j.setup[x];
        const costs = s.cost || s.days ? `<span class="sc-cost"><span class="chip">💵 +${cash(s.cost)}</span><span class="chip">📅 <span>+${s.days} ${s.days === 1 ? "day" : "days"}</span></span></span>` : `<span class="sc-cost free"><span class="chip">💵 $0</span><span class="chip">📅 <span>+0 days</span></span></span>`;
        return `<button type="button" class="setup" data-s="${x}"><span class="sc-ic" aria-hidden="true">${s.icon}</span><span class="sc-l">${s.title}</span><span class="sc-s">${s.sub}</span>${costs}</button>`;
      }).join("")}</div>`;
    }
    html += `</section>`;
    app.innerHTML = html;
    if (pre) wireCheck(j.preCheck);
    app.querySelectorAll(".setup").forEach(b => b.onclick = () => chooseSetup(j, b.dataset.s));
  }

  function chooseSetup(j, x) {
    const s = j.setup[x];
    st.money -= s.cost; st.days -= s.days;
    st.setup[j.id] = x;
    const solid = x === "B";
    st.fit[j.id] = solid ? "solid" : "shaky";
    const pay = solid ? j.pay : j.pay - 200;
    st.money += pay; st.paid[j.id] = pay;
    anim = true; st.mood = solid ? "😤" : "😂";
    if (solid) { st.rep += 1; st.hype -= 1; addLog(st.job + 1, j.logSolid, "+1 ⭐", "up"); }
    else { st.rep -= 2; st.hype += 2; addLog(st.job + 1, j.logShaky, "−2 ⭐", "down"); }
    clamp(); st.phase = "results"; save(); render(); window.scrollTo(0, 0); flash("hudMoney"); flash("repNum");
  }

  function resultsScreen() {
    const j = JOBS[st.job];
    const fit = st.fit[j.id];
    const k = st.pick[j.id], m = M[k];
    const r = fit === "ok" ? j.fits[k] : fit === "solid" ? j.solid : j.shaky;
    const side = fit === "solid" ? quiet() : post(r.rival, fit === "ok" ? "900" : "2.7K");
    const payParts = [[payOf(st.paid[j.id], j.pay), "up"]];
    if (fit === "shaky") payParts.push(["⭐ −2", "down"], ["🔥 +2", "down"]);
    else if (fit === "ok") payParts.push(["⭐ −1", "down"], ["🔥 +1", "down"]);
    else payParts.push(["⭐ +1", "up"], ["🔥 −1", "up"]);
    const sel = st.setup[j.id] ? j.setup[st.setup[j.id]] : null;
    let html = `<section class="card job">${kick(st.job + 1, "Results")}
      <div class="desk"><div class="report paper">${stamp(fit)}<p class="r-plan"><span aria-hidden="true">${m.icon}</span> <b>${m.name}</b>${sel ? `<span class="r-sep"> · </span><span aria-hidden="true">${sel.icon}</span> <span>${sel.title}</span>` : ""}</p>${r.data()}${r.text ? `<p class="r-text">${r.text}</p>` : ""}</div>
      <div class="rivalcol">${side}</div></div>
      ${unlock(r.reveal)}
      ${deltaLine(payParts)}`;
    html += j.check ? `<button type="button" class="go next" id="ckBtn">${j.checkBtn} →</button>` : `<button type="button" class="go next" id="nextBtn">Next job →</button>`;
    html += `</section>`;
    app.innerHTML = html;
    if ($("ckBtn")) $("ckBtn").onclick = () => { st.phase = "check"; anim = true; save(); render(); window.scrollTo(0, 0); };
    if ($("nextBtn")) $("nextBtn").onclick = nextJob;
  }
  function nextJob() { st.job += 1; st.phase = "pick"; anim = true; save(); render(); window.scrollTo(0, 0); }

  // Jobs 2-5: the evidence check gets its own screen after the results.
  function checkScreen() {
    const j = JOBS[st.job];
    const ck = j.check, v = variantFor(ck);
    const ckDone = (st.checks[ck] || {}).done;
    let html = `<section class="card job">${kick(st.job + 1, "Evidence check")}${checkHtml(ck, v)}`;
    if (ckDone && j.bonus) html += bonusHtml();
    const ready = ckDone && (!j.bonus || st.bonus);
    if (ready) html += `<button type="button" class="go next" id="nextBtn">${st.job === 4 ? "Next: the big final job →" : "Next job →"}</button>`;
    html += `</section>`;
    app.innerHTML = html;
    wireCheck(ck, v);
    app.querySelectorAll(".bonusbtn").forEach(b => b.onclick = () => chooseBonus(b.dataset.b));
    if ($("nextBtn")) $("nextBtn").onclick = nextJob;
  }

  function variantFor(id) { return id === "c5" ? (st.fit.j5 === "solid" ? "A" : "B") : null; }

  // ---------------- Bonus temptation (job 5) ----------------
  function bonusHtml() {
    const solid = st.fit.j5 === "solid";
    const ask = solid ? "Write \"raises scores 4 points\" and get a $500 bonus." : "Write \"raises scores 3 points\" and get a $500 bonus.";
    if (st.bonus) {
      return `<div class="bonus done"><p class="b-h">📱 The StudyStreak CEO</p><p>${st.bonus === "truth" ? "You told the truth. The CEO is annoyed." : "You took the $500. The report says what they wanted."}</p></div>`;
    }
    return `<div class="bonus phone" id="bonusBox"><p class="b-h"><span class="ring" aria-hidden="true">📱</span> <span>StudyStreak CEO</span></p><p class="b-ask">“<span>${ask}</span>”</p>
      <div class="setups"><button type="button" class="setup bonusbtn" data-b="truth"><span class="sc-ic" aria-hidden="true">🧾</span><span class="sc-l">Tell the truth</span><span class="sc-s">No bonus.</span><span class="sc-cost free"><span class="chip">💵 $0</span></span></button>
      <button type="button" class="setup bonusbtn" data-b="lie"><span class="sc-ic" aria-hidden="true">💰</span><span class="sc-l">Take the $500</span><span class="sc-s">Nobody will check... right?</span><span class="sc-cost"><span class="chip up">💵 +$500</span></span></button></div></div>`;
  }
  function chooseBonus(b) {
    st.bonus = b;
    if (b === "lie") { st.money += 500; addLog(5, "Took $500 to fake results", "+$500", "down"); }
    else addLog(5, "Reported the real results", "honest", "up");
    save(); render(); flash("hudMoney");
    const n = $("nextBtn"); if (n) n.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  // ---------------- Final job: up to two cards ----------------
  function finalCost(sel) { return sel.reduce((a, k) => ({ cost: a.cost + M[k].cost, days: a.days + M[k].days }), { cost: 0, days: 0 }); }
  function finalScreen() {
    const j = JOBS[5];
    const sel = st.finalSel || [];
    const c = finalCost(sel);
    let html = `<section class="card job">${kick(6, "The big one")}${clientCard(j)}
      <p class="rule"><span aria-hidden="true">🃏🃏</span> <span>Now: 2 cards allowed</span></p>
      <div class="hand">${ORDER.map(k => cardHtml(k, { sel: sel.includes(k) })).join("")}</div>`;
    let blocked = "";
    if (sel.length === 2) {
      if (st.days < c.days) blocked = "Not enough days: need " + c.days + ", have " + Math.max(0, st.days) + ". Drop a card.";
      else if (st.money < c.cost) blocked = "Not enough money: need " + cash(c.cost) + ", have " + cash(st.money) + ". Drop a card.";
    }
    html += `<div class="playbar">${sel.length ? `<p class="pb-sel">${sel.map(k => `<span aria-hidden="true">${M[k].icon}</span> <b>${M[k].name}</b>`).join(" + ")} <span class="pb-cost">💵 ${cash(c.cost)} · 📅 <span>${c.days} days</span></span></p>` : `<p class="pb-none"><span aria-hidden="true">👆</span> <span>Tap a card</span></p>`}
      ${blocked ? `<p class="msg bad" id="finalMsg">${blocked}</p>` : ""}
      ${sel.length && !blocked ? `<button type="button" class="go" id="playBtn">${sel.length === 2 ? "Play both cards →" : "Play this card →"}</button>` : ""}</div></section>`;
    app.innerHTML = html;
    app.querySelectorAll(".mcard").forEach(b => b.onclick = () => {
      const k = b.dataset.m; let s = (st.finalSel || []).slice();
      if (s.includes(k)) s = s.filter(x => x !== k); else { s.push(k); if (s.length > 2) s.shift(); }
      st.finalSel = s; save(); render();
      const p = $("playBtn") || $("finalMsg"); if (p) p.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    if ($("playBtn")) $("playBtn").onclick = playFinal;
  }
  function playFinal() {
    const sel = st.finalSel.slice(), c = finalCost(sel);
    st.money -= c.cost; st.days -= c.days; st.finalPick = sel;
    const hasS = sel.includes("survey"), hasI = sel.includes("interview");
    const fit = hasS && hasI ? "solid" : hasS || hasI ? "ok" : "garbage";
    st.finalFit = fit;
    anim = true; st.mood = fit === "solid" ? "😡" : fit === "ok" ? "😏" : "🤑";
    if (fit === "solid") { st.money += 1500; st.paid.j6 = 1500; st.rep += 2; st.hype -= 2; addLog(6, "Survey + interviews: mixed methods", "+2 ⭐", "up"); }
    else if (fit === "ok") { st.money += 1000; st.paid.j6 = 1000; st.hype += 1; addLog(6, hasS ? "Survey only: no WHY" : "Interviews only: no HOW MANY", "0 ⭐", "flat"); }
    else { st.paid.j6 = 0; st.rep -= 2; st.hype += 2; addLog(6, "Wrong cards for the final job", "−2 ⭐", "down"); }
    if (st.bonus === "lie") { st.leak = true; st.rep -= 3; st.hype += 2; addLog(6, "Hot Take leaked the real numbers", "−3 ⭐", "down"); }
    clamp(); st.phase = "results"; save(); render(); window.scrollTo(0, 0); flash("hudMoney"); flash("repNum");
  }
  function finalResults() {
    if (st.leak && st.leakSeen) return leakScreen();
    const fit = st.finalFit, sel = st.finalPick || [];
    const hasS = sel.includes("survey");
    const surveyBit = bars([["Leaving within 5 years", 46], ["Staying", 54]]);
    const interviewBit = quote("\"No jobs in my field. Rent's too high.\"") + `<p class="madeup">Made-up game data</p>`;
    let data = "", text = "", reveal = "", side = "";
    if (fit === "solid") {
      data = surveyBit + interviewBit; text = "Now you know HOW MANY and WHY.";
      reveal = "<b>Mixed methods</b> = two methods covering each other's weak spots.";
    } else if (fit === "ok") {
      data = hasS ? surveyBit : interviewBit;
      reveal = "Two-part question: <b>how many</b> AND <b>why</b>. One method answers one part.";
      side = post(hasS ? "Cedar River: \"46% are leaving!\" Council: \"Why?\" Cedar River: 🦗🦗🦗" : "Cedar River talked to a few kids and called it the whole city. 🤏", "3.1K");
    } else {
      text = "No how many, no why. The council hires Hot Take instead.";
      reveal = "\"How many?\" needs a <b>survey</b>. \"Why?\" needs <b>interviews</b>.";
      side = post("Guess who the council called? 😎", "6.6K");
    }
    const parts = [[payOf(st.paid.j6 || 0, 1500), st.paid.j6 ? "up" : "down"]];
    if (fit === "solid") parts.push(["⭐ +2", "up"], ["🔥 −2", "up"]);
    else if (fit === "ok") parts.push(["🔥 +1", "down"]);
    else parts.push(["⭐ −2", "down"], ["🔥 +2", "down"]);
    let html = `<section class="card job">${kick(6, "Results")}
      <div class="report paper">${stamp(fit)}<p class="r-plan">${sel.map(k => `<span aria-hidden="true">${M[k].icon}</span> <b>${M[k].name}</b>`).join(" + ")}</p>${data}${text ? `<p class="r-text">${text}</p>` : ""}</div>
      ${side}${unlock(reveal)}${deltaLine(parts)}`;
    html += st.leak ? `<button type="button" class="go next" id="leakBtn">🚨 Breaking news →</button>` : `<button type="button" class="go next" id="nextBtn">See how your season ended →</button>`;
    html += `</section>`;
    app.innerHTML = html;
    if ($("leakBtn")) $("leakBtn").onclick = () => { st.leakSeen = true; st.mood = "😈"; anim = true; save(); render(); window.scrollTo(0, 0); };
    if ($("nextBtn")) $("nextBtn").onclick = toEnding;
  }
  // The lie from job 5 comes back.
  function leakScreen() {
    app.innerHTML = `<section class="card job">${kick(6, "Breaking")}
      <div class="leak"><p class="b-h">🚨 Breaking</p>${post("LEAKED: StudyStreak barely helped. Cedar River took $500 to say it worked. 🧾", "12K")}${deltaLine([["⭐ −3", "down"], ["🔥 +2", "down"]])}</div>
      ${unlock("<b>Honesty</b>: report what the data shows, even when paid not to.")}
      <button type="button" class="go next" id="nextBtn">See how your season ended →</button></section>`;
    $("nextBtn").onclick = toEnding;
  }
  function toEnding() { st.ending = endingFor(); st.phase = "end"; anim = true; save(); render(); window.scrollTo(0, 0); }

  // ---------------- Ending + writing + turn in ----------------
  const ENDINGS = {
    top: { icon: "🏆", title: "Iowa's Most Trusted Research Team", text: "Clients line up. Hot Take loses its biggest clients to you." },
    mid: { icon: "🏚️", title: "Still Open, Barely", text: "Bills paid, but clients doubt you. Blake's posts still follow you." },
    low: { icon: "🔥", title: "Bought Out by Hot Take Analytics", text: "Your sign comes down. Blake's goes up. Fast and cheap won." }
  };
  function endingFor() {
    let lvl = st.rep >= 8 ? 2 : st.rep >= 4 ? 1 : 0;
    if (st.money < 0) { lvl = Math.max(0, lvl - 1); addLog(6, "Ended the season in debt", cash(st.money), "down"); }
    return ["low", "mid", "top"][lvl];
  }
  function endScreen() {
    const e = ENDINGS[st.ending || endingFor()];
    const trail = st.log.map(l => `<li class="${l.kind}"><span class="lj" aria-label="Job ${l.job}">${l.job}</span><span class="lt">${l.text}</span><b class="ld">${l.delta}</b></li>`).join("");
    app.innerHTML = `<section class="card ending e-${st.ending}">
      <p class="kicker">Season over</p><div class="end-head"><span class="end-ic" aria-hidden="true">${e.icon}</span><div class="sign"><h2>${e.title}</h2><p>${e.text}</p></div></div>
      <div class="endstats"><span>⭐ <b>${st.rep}/10</b></span><span>💵 <b>${cash(st.money)}</b></span><span>📅 <b>${st.days}</b></span></div>
      <h3 class="causedh">Caused by:</h3><ul class="trail">${trail}</ul>
      <button type="button" class="go next" id="writeBtn">Write your report →</button></section>`;
    $("writeBtn").onclick = () => { st.phase = "write"; anim = true; save(); render(); window.scrollTo(0, 0); };
  }
  function writeScreen() {
    const e = ENDINGS[st.ending || "mid"];
    app.innerHTML = `<section class="card ending">
      <p class="kicker"><span aria-hidden="true">${e.icon}</span> <span>Last step</span></p>
      <div class="writing paper"><p class="w-h"><span aria-hidden="true">📄</span> <span>Your season report</span></p>
      ${PROMPTS.map(p => `<label for="w_${p.id}">${p.label}</label><p class="stem">${p.stem}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "Already turned in. You can fix it and turn in again." : ""}</p>
      ${st.turnedIn ? turnedHtml() : ""}</div>
      <p class="foot-back"><button type="button" class="linkbtn" id="backEnd">← Back to my ending</button></p></section>`;
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", ev => { st.writing[p.id] = ev.target.value; save(); }));
    $("sendBtn").onclick = turnIn;
    $("backEnd").onclick = () => { st.phase = "end"; save(); render(); window.scrollTo(0, 0); };
  }
  const turnedHtml = () => `<p class="turned" id="turned">✓ Turned in</p><p class="replay">Want a different ending? Tap Start over.</p>`;

  async function turnIn() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const p of PROMPTS) {
      const box = $("w_" + p.id), v = (box.value || "").trim();
      const stemShown = tr(p.stem);
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: stemShown, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (isEs() ? "En " + tr(p.short) : "For " + p.short) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemWords = new Set(plain(p.stem + " " + stemShown).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < p.newWords) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "msg bad"; box.focus(); return; }
      let groups = p.mustAll;
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      const has = w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v));
      if (groups.some(g => !g.some(has))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    const answers = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => !(st.checks[id] || {}).wrong).length;
    answers["First-try correct"] = right + " of " + CHECK_IDS.length;
    const byStd = {};
    CHECK_IDS.forEach(id => { const s = CHECKS[id].std; byStd[s] = byStd[s] || [0, 0]; byStd[s][1]++; if (!(st.checks[id] || {}).wrong) byStd[s][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECK_IDS.forEach(id => {
      const c = CHECKS[id], w = (st.checks[id] || {}).wrong || 0, v = variantFor(id);
      const opts = v ? c.variants[v].options : c.options;
      answers[c.short] = opts[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    JOBS.slice(0, 5).forEach((j, i) => {
      const tried = (st.tried[j.id] || []).map(k => M[k].name);
      const pk = st.pick[j.id] ? M[st.pick[j.id]].name : "";
      answers["Choice · Job " + (i + 1) + " method"] = pk + (st.fit[j.id] === "ok" ? " (half the story; best was " + M[j.best].name + ")" : "") + (tried.length ? " (after garbage from: " + tried.join(", ") + ")" : " (first card)");
      if (st.setup[j.id]) answers["Choice · Job " + (i + 1) + " setup"] = j.setup[st.setup[j.id]].label + (st.setup[j.id] === "B" ? " (careful)" : " (shortcut)");
    });
    answers["Choice · StudyStreak bonus"] = st.bonus === "lie" ? "Took the $500 to say the app works" : "Reported the real results";
    answers["Choice · Final job methods"] = (st.finalPick || []).map(k => M[k].name).join(" + ") + (st.finalFit === "solid" ? " (mixed methods)" : st.finalFit === "ok" ? " (one part only)" : " (did not fit)");
    answers["Ending"] = ENDINGS[st.ending].title;
    answers["Caused by"] = st.log.map(l => "Job " + l.job + ": " + l.text + " (" + l.delta + ")").join(" · ");
    answers["Reputation"] = st.rep + " of 10";
    answers["Money left"] = cash(st.money);
    answers["Days left"] = String(st.days);
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! You're done."; msg.className = "msg good";
      $("sendBtn").textContent = "Turn in again"; $("sendBtn").disabled = false;
      if (!$("turned")) msg.insertAdjacentHTML("afterend", turnedHtml());
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------------- Evidence checks ----------------
  function checkData(id, v) { const c = CHECKS[id]; return v ? Object.assign({}, c, c.variants[v]) : c; }
  function checkHtml(id, v) {
    const c = checkData(id, v), s = st.checks[id] || {};
    const a = c.asker || ["👩🏽‍💻", "Dee, your partner"];
    if (s.done) return `<div class="check board done${justSolved === id ? " solved" : ""}" id="chk_${id}"><p class="ck-kick" aria-hidden="true">🔓</p><span class="unstamp" aria-hidden="true">UNLOCKED</span><p class="why"><span aria-hidden="true">✓</span> <span>${c.why}</span></p>${c.fact ? `<p class="fact">${c.fact}</p>` : ""}</div>`;
    return `<div class="check board" id="chk_${id}"><p class="ck-kick">🔒 Evidence check</p><div class="pins">${c.evidence()}</div>${say(a[0], a[1], c.prompt, "ask")}<div class="choices replies" id="ch_${id}"></div><p class="msg" id="fb_${id}" aria-live="polite"></p></div>`;
  }
  function wireCheck(id, v) {
    const c = checkData(id, v), area = $("ch_" + id), fb = $("fb_" + id);
    if (!area) return;
    let last = null;
    function draw() {
      area.replaceChildren();
      let order = shuffle(c.options.map((t, n) => ({ t, n })));
      if (last && order.map(o => o.n).join() === last) order.push(order.shift());
      last = order.map(o => o.n).join();
      order.forEach(o => {
        const btn = document.createElement("button"); btn.type = "button"; btn.className = "choice"; btn.textContent = o.t;
        btn.onclick = () => {
          if (locked) return;
          const s = st.checks[id] = st.checks[id] || { wrong: 0, done: false };
          if (o.n === 0) {
            s.done = true; justSolved = id; st.mood = "😒"; save(); render(); justSolved = null;
            const el = $("chk_" + id); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
            setTimeout(() => { const nx = $("setupH") || $("bonusBox") || $("nextBtn"); if (nx) nx.scrollIntoView({ block: "center", behavior: "smooth" }); }, 900);
            return;
          }
          s.wrong += 1; st.mood = "😏"; save(); hud();
          const bd = $("chk_" + id); if (bd) { bd.classList.remove("shake"); void bd.offsetWidth; bd.classList.add("shake"); }
          locked = true; btn.classList.add("nope");
          area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = LOCK;
          const tick = () => {
            fb.textContent = "Not quite. " + c.hint + " ⏳ " + left; fb.className = "msg bad";
            if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + c.hint; fb.className = "msg"; draw(); return; }
            lockTimer = setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(btn);
      });
    }
    draw();
  }

  // ---------------- Router ----------------
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    clearTimeout(lockTimer); locked = false;
    hud();
    document.body.classList.toggle("on-intro", !st.started);
    if (!st.started) intro();
    else if (st.phase === "write") writeScreen();
    else if (st.phase === "end") endScreen();
    else if (st.job === 5) (st.phase === "pick" ? finalScreen : finalResults)();
    else if (st.phase === "pick") pickScreen();
    else if (st.phase === "setup") setupScreen();
    else if (st.phase === "check") checkScreen();
    else resultsScreen();
    if (anim && app.firstElementChild) app.firstElementChild.classList.add("anim");
    anim = false;
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; prevHud = null; anim = true; save(); render(); window.scrollTo(0, 0);
  };
  if (st.started && $("welcome")) {
    $("welcome").textContent = "Welcome back, " + st.name + " — you're on step " + stepNow() + " of " + TOTAL_STEPS + ".";
    $("welcome").hidden = false;
  }
  render();
  // for testing only (read-only peek)
  window.__rr = { state: () => JSON.parse(JSON.stringify(st)) };
})();
