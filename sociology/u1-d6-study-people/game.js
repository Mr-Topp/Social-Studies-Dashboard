// =====================================================================
//  RESEARCH RIVALS  (Sociology · Unit 1 · Day 6 · How Should We Study People?)
//  You run Cedar River Research Co. Each client brings a question about people.
//  Play the METHOD CARD that fits (survey, interview, observation, experiment,
//  content analysis), then pick how to run it. A wrong card = a garbage report.
//  A flawed setup = a shaky report your rival Blake (Hot Take) mocks.
//
//  Trim pass 2026-11-03 (Fynn: "confusing, a lot going on"):
//   - 4 jobs (was 6), 2 screens per job (was 4): ~11 screens total (was 24).
//     All 5 methods still taught: Job 1 survey, Job 2 observation,
//     Job 3 experiment, Job 4 = content analysis + interviews (mixed methods).
//   - One meter: Reputation. Money, days, and rival hype are gone.
//   - Cards say what a method IS, not which question it answers.
//   - Plan choices are two believable setups (no "free vs careful" giveaway);
//     the flawed one isn't always the quick-looking one.
//   - Every job runs the same way: pick → plan → results + evidence check.
//   - Wrong-answer wait: 2 seconds (was 5).
// =====================================================================
(function () {
  "use strict";

  const KEY = "soc-u1-d6-study-people-v3";
  const ASSIGNMENT_ID = "soc-u1-d6-study-people";
  const TITLE = "Sociology · Unit 1 · Day 6 · How Should We Study People?";
  const STANDARD = "SS.9-12.Soc.1, SS.9-12.Soc.3";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 2;
  const TOTAL_STEPS = 10;   // 4 jobs × 2 screens + ending + report

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (isEs() ? window.SiteLang.t(s) : s);

  // ---------------- The method cards: what each one IS ----------------
  const ORDER = ["survey", "interview", "observe", "experiment", "content"];
  const M = {
    survey:     { icon: "📋", name: "Survey", d: "Same questions to lots of people" },
    interview:  { icon: "🎙️", name: "Interview", d: "Long talks with follow-up questions" },
    observe:    { icon: "👀", name: "Observation", d: "Watch people in a real place" },
    experiment: { icon: "🧪", name: "Experiment", d: "Change one thing, compare two groups" },
    content:    { icon: "📺", name: "Content Analysis", d: "Count what shows up in media" }
  };

  // ---------------- Little drawing helpers ----------------
  const bars = (rows, note) => `<div class="bars">${rows.map(r => `<div class="brow"><span class="bl">${r[0]}</span><span class="bt"><i style="width:${Math.min(100, r[2] || r[1])}%"></i></span><b class="bv">${r[3] || r[1] + "%"}</b></div>`).join("")}</div><p class="madeup">${note || "Made-up game data"}</p>`;
  const quote = q => `<blockquote class="quote">${q}</blockquote>`;
  const reposts = likes => { const l = String(likes || "1.2K"), n = parseFloat(l) * (/K$/i.test(l) ? 1000 : 1), r = Math.round(n * 0.28); return r >= 1000 ? (r / 1000).toFixed(1).replace(/\.0$/, "") + "K" : String(r); };
  const post = (txt, likes) => `<div class="post"><div class="p-ava" aria-hidden="true">🔥</div><div class="p-body"><div class="p-head"><b>Blake</b> <span class="handle">@HotTake</span></div><p class="p-text">${txt}</p><div class="p-meta" aria-hidden="true">❤️ ${likes || "1.2K"} · 🔁 ${reposts(likes)}</div></div></div>`;
  const quiet = () => `<div class="post quiet"><div class="p-ava" aria-hidden="true">😤</div><div class="p-body"><div class="p-head"><b>Blake</b></div><p class="p-text">ok… can't even roast this one 😤</p></div></div>`;
  const say = (av, who, txt, cls) => `<div class="say ${cls || ""}"><span class="say-ava" aria-hidden="true">${av}</span><div class="say-b"><span class="say-n">${who}</span><p>${txt}</p></div></div>`;
  const unlock = html => `<div class="unlock"><span class="u-ic" aria-hidden="true">💡</span><div><p class="u-tag">Concept unlocked</p><p class="u-txt">${html}</p></div></div>`;

  // ---------------- The four jobs ----------------
  // setup: two believable plans. good = the sound one. The screen shuffles them.
  const JOBS = [
    { id: "j1", icon: "🧑‍💼", who: "Linn County Jobs Center", best: "survey",
      ask: "What percent of teens here have a school-year job?",
      fits: {
        interview: { fit: "wrong", text: "8 teens, great stories. But what PERCENT work? 8 people can't tell you." },
        observe: { fit: "wrong", text: "You saw 6 teens at one drive-thru. That's not the whole county." },
        experiment: { fit: "wrong", text: "What would you change? You can't assign teens jobs. Nothing to test." },
        content: { fit: "wrong", text: "140 \"Now Hiring\" posts show open jobs, not teens who work." }
      },
      setup: {
        good: { icon: "📝", title: "Paper survey in 2nd period", sub: "Every class, every grade." },
        bad: { icon: "📲", title: "Link on the school Instagram", sub: "Teens are online all night." }
      },
      solid: { data: () => bars([["Have a job", 38], ["No job", 62]]), text: "1,140 teens answered, from every grade.",
        reveal: "<b>Survey</b> = same questions, many people. Shows <b>how common</b> something is." },
      shaky: { data: () => bars([["Have a job", 19], ["No job", 81]]), text: "Only 210 teens answered. Most were 9th graders.",
        rival: "Cedar River surveyed kids who follow the SCHOOL Instagram. Who does that? 🤡",
        reveal: "<b>Sampling bias</b>: school Instagram followers aren't all teens. Who got left out?" },
      check: "c1",
      logSolid: "Survey reached every class", logShaky: "Instagram link: sampling bias"
    },
    { id: "j2", icon: "🍕", who: "Prairie Ridge lunch manager", best: "observe",
      ask: "Where do the lunch lines really back up, and when?",
      fits: {
        survey: { fit: "ok", data: () => bars([["Pizza line", 58], ["Card reader", 30], ["Salad bar", 12]], "Where students SAY it's worst · made-up game data"),
          rival: "Cedar River asked kids where the line is. Bro, just go LOOK. 👀",
          reveal: "When the question is what people <b>do</b>, watch them: <b>observation</b>." },
        interview: { fit: "wrong", text: "3 long talks about lunch feelings. Nobody knows which minute it jams." },
        experiment: { fit: "wrong", text: "You moved the salad bar before finding the jam. Now it's worse." },
        content: { fit: "wrong", text: "Lots of pizza pics online. Zero line data." }
      },
      setup: {
        good: { icon: "🪑", title: "Sit by the door all week", sub: "Quiet, from the same spot." },
        bad: { icon: "📋", title: "Clipboard at the card reader", sub: "Up close for 2 lunches." }
      },
      solid: { data: () => bars([["Card reader", 31, 100, "31"], ["Pizza line", 12, 39, "12"], ["Salad bar", 3, 10, "3"]], "Students in line at 11:40 · made-up game data"), text: "The jam: ONE card reader at 11:40.",
        reveal: "<b>Observation</b> = watching what people <b>actually do</b>, in a real place." },
      shaky: { data: () => bars([["Card reader", 8, 26, "8"], ["Pizza line", 9, 29, "9"], ["Salad bar", 3, 10, "3"]], "Students in line at 11:40 · made-up game data"), text: "Lines looked fine. The lunch worker says that's not normal.",
        rival: "Our lunch lines are \"fine\"? Has Cedar River MET teenagers? 😂",
        reveal: "People behaved because they saw you watching. 2 days wasn't enough." },
      check: "c4",
      logSolid: "Watched all week", logShaky: "Clipboard: people acted different", logOk: "Survey for a DO question"
    },
    { id: "j3", icon: "📱", who: "StudyStreak homework app", best: "experiment",
      ask: "Does our app raise test scores? We need proof.",
      fits: {
        survey: { fit: "ok", data: () => bars([["Users who say it helps", 92]]),
          rival: "\"92% say it works!\" My cousin says he's 6'5\". 📏",
          reveal: "Proving a <b>cause</b> takes an <b>experiment</b> with a control group." },
        interview: { fit: "wrong", text: "5 users loved the confetti. Stories don't prove scores went up." },
        observe: { fit: "wrong", text: "Lots of tapping. Still no idea if scores changed." },
        content: { fit: "wrong", text: "Their ads say \"Ace your test!\" That's a claim, not proof." }
      },
      setup: {
        good: { icon: "🎲", title: "Random half get the app", sub: "The other half don't. Parents sign permission." },
        bad: { icon: "🙋", title: "Kids who want it get it", sub: "Compare them to everyone else. Parents sign permission." }
      },
      solid: { data: () => bars([["App: before", 72, 72, "72"], ["App: after", 76, 76, "76"], ["No app: before", 72, 72, "72"], ["No app: after", 75, 75, "75"]], "Average test score · made-up game data"), text: "Both groups' scores are in.",
        reveal: "<b>Experiment</b> = change one thing and compare to a <b>control group</b>." },
      shaky: { data: () => bars([["Chose the app: before", 74, 74, "74"], ["Chose the app: after", 81, 81, "81"], ["Everyone else: before", 70, 70, "70"], ["Everyone else: after", 72, 72, "72"]], "Average test score · made-up game data"), text: "App kids went up 7. Everyone else went up 2.",
        rival: "Kids who BEG for a homework app? Bet they were acing tests anyway. 🤔",
        reveal: "Groups must start out the same. Picking at <b>random</b> does that." },
      check: "c5", bonus: true,
      logSolid: "Random groups + permission", logShaky: "Volunteers vs. everyone: unfair groups", logOk: "Survey for a CAUSE question"
    },
    { id: "j4", icon: "🩺", who: "Iowa Teen Health Group", final: true,
      ask: "What do energy-drink ads show teens, and why do teens say they buy them?",
      check: "c2"
    }
  ];

  // ---------------- Evidence checks (first option is right; screen shuffles) ----------------
  const CHECKS = {
    c1: { std: "Soc.1", short: "1936 poll = biased sample",
      evidence: () => `<div class="casefile"><p class="cf-tag">📁 Real case, 1936</p><ul class="facts"><li><span aria-hidden="true">📬</span> <span>Mailed 10 million ballots; about 2.4 million came back</span></li><li><span aria-hidden="true">🔮</span> <span>Predicted winner: Landon</span></li><li><span aria-hidden="true">🗳️</span> <span>Roosevelt won 46 of 48 states</span></li><li><span aria-hidden="true">📒</span> <span>Names from phone books + car records</span></li><li><span aria-hidden="true">🚫</span> <span>Many poorer voters had neither</span></li></ul><p class="src">Source: Literary Digest poll, fall 1936; Salganik, <i>Bit by Bit</i> (2018).</p></div>`,
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "This real poll went badly wrong. Why?",
      options: ["Its sample didn't match all voters", "It asked too few people", "Voters changed their minds late", "Its ballots went out too early"],
      hint: "Who had no phone or car?",
      why: "<b>Sampling bias</b>: who you ask matters more than how many." },
    c4: { std: "Soc.3", short: "Hawthorne effect: people act different when watched",
      evidence: () => `<div class="notes"><p class="cf-tag">📓 Another researcher's field notes (made up)</p><p><b>Day 1:</b> Clipboard out. Lines neat. Lunch worker: "They're never this good."</p><p><b>Day 4:</b> Nobody notices me. Card-reader line hits the door.</p></div>`,
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "What problem do these notes show?",
      options: ["People act different when watched", "Too crowded to count anyone", "Students lied on a survey", "Observation only works one day"],
      hint: "Compare Day 1 and Day 4.",
      why: "<b>Hawthorne effect</b>: people act different when they know they're watched.",
      fact: "Named for 1920s studies at the Hawthorne Works factory near Chicago." },
    c5: { asker: ["💼", "The investors"], std: "Soc.1", short: "Control group shows if a change caused the result",
      // Two versions: one for players who used random groups, one for players who didn't.
      variants: {
        A: { evidence: () => `<p class="madeup">👆 Use your results chart above.</p>`,
          prompt: "What do your two groups show?",
          options: ["Both rose, so the app added little", "The app added four whole points", "The app made the other group worse", "Only the app group got better"],
          hint: "Look at BOTH groups. Did the no-app group rise too?" },
        B: { evidence: () => `<p class="madeup">👆 Use your results chart above.</p>` + post("Kids who CHOSE the app started higher. Fair fight? 🧪❌", "4.0K"),
          prompt: "Blake has a point. Why is this not proof?",
          options: ["The groups weren't the same at the start", "Seven points is too small to matter", "Test scores can't be measured fairly", "Too many students used the app"],
          hint: "Look at the BEFORE scores. Did both groups start the same?" },
        C: { evidence: () => bars([["Users who say it helps", 92]], "Your survey · made-up game data") + post("92% of users LIKE it. Did anyone check scores? 🧪❌", "4.0K"),
          prompt: "Why doesn't \"92% say it helps\" prove the app works?",
          options: ["Nobody compared them to kids without it", "92% is too high to be believable", "Surveys aren't allowed to ask about apps", "Too many users answered the survey"],
          hint: "To prove the app did it, who would you compare users to?" }
      },
      // C: the player ran a survey instead of an experiment
      why: "<b>Control group</b>: a same-start group with no change. Only then can you prove <b>cause</b>." },
    c2: { std: "Soc.3", short: "Content analysis can't show what creators meant",
      evidence: () => post("LOL an ad count PROVES drink companies WANT teens to party! 🎉", "2.1K"),
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "Let's reply. What can an ad count NOT tell you?",
      options: ["What the ad makers meant", "How often each ad type appeared", "Which kinds of teens were shown", "How many ads were counted"],
      hint: "A count shows what's IN ads, not in heads.",
      why: "Content analysis shows messages, <b>not what creators meant</b>." }
  };
  const CHECK_IDS = ["c1", "c4", "c5", "c2"];

  // ---------------- Writing ----------------
  const PROMPTS = [
    { id: "method", short: "My question, method, strength, and limit",
      label: "1. Pitch a study about teen life.",
      stem: "I'd study ___. I'd use ___ because ___. One limit is ___.",
      min: 80, newWords: 6,
      mustAll: [["survey", "interview", "observ", "experiment", "content analysis", "content", "ads", "media"], ["limit", "but", "however", "slow", "small", "watched", "lie", "honest", "cost", "can't", "cannot", "weak", "although", "fake", "time", "bias", "random"]],
      mustMsg: "Answer 1: name a method AND one limit." },
    { id: "mixed", short: "Why two methods beat one",
      label: "2. Why use an ad count AND interviews?",
      stem: "Both are stronger: the ad count shows ___, and interviews show ___.",
      min: 60, newWords: 4,
      mustAll: [["show", "ads", "ad ", "media", "message", "count", "athlete", "gamer", "party", "what", "how many", "how often", "percent", "%", "pattern"], ["why", "reason", "story", "stories", "feel", "detail", "explain", "think", "cause", "because"]],
      mustMsg: "Answer 2: say what the ad count shows AND what interviews show (why)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ v: 3, name: "", started: false, job: 0, phase: "pick", tried: {}, lastGarbage: {}, pick: {}, setup: {}, fit: {}, order: {},
    checks: {}, bonus: null, finalSel: [], finalPick: null, finalFit: null, leak: false, ending: null,
    rep: 6, log: [], writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 3) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this device now, don't show the last kid's game or writing.
  try {
    const who = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (st.started && who && st.name && who.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const clampRep = () => { st.rep = Math.max(1, Math.min(10, st.rep)); };
  const addLog = (job, text, delta, kind) => st.log.push({ job, text, delta, kind: kind || (String(delta).indexOf("−") === 0 ? "down" : "up") });

  let locked = false, lockTimer = null, anim = true, justSolved = null;
  const app = $("app");

  function stepNow() {
    if (!st.started) return 0;
    if (st.phase === "write") return 10;
    if (st.phase === "end") return 9;
    return st.job * 2 + (st.phase === "pick" ? 1 : 2);
  }

  // ---------------- HUD ----------------
  let prevRep = null;
  function hud() {
    const h = $("hud");
    if (!st.started) { h.hidden = true; return; }
    h.hidden = false;
    const over = st.phase === "end" || st.phase === "write";
    $("hudJob").textContent = over ? "Season over" : "Job " + (st.job + 1) + " of 4";
    $("hudDots").innerHTML = JOBS.map((j, i) => `<i class="${i < st.job || over ? "done" : i === st.job ? "now" : ""}"></i>`).join("");
    $("repFill").style.width = st.rep * 10 + "%";
    $("repNum").textContent = st.rep + "/10";
    const mood = $("blakeMood");
    if (mood && mood.textContent !== (st.mood || "😎")) { mood.textContent = st.mood || "😎"; bounce(mood); }
    if (prevRep != null && prevRep !== st.rep) {
      const host = $("repNum").closest(".meter"), d = st.rep - prevRep;
      const f = document.createElement("span"); f.className = "float " + (d > 0 ? "up" : "down"); f.setAttribute("aria-hidden", "true");
      f.textContent = (d > 0 ? "+" : "−") + Math.abs(d) + " ⭐"; host.appendChild(f); setTimeout(() => f.remove(), 1600);
    }
    prevRep = st.rep;
  }
  function bounce(el) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }

  // ---------------- Pieces ----------------
  function clientCard(j) {
    return `<div class="client"><div class="c-ava" aria-hidden="true">${j.icon}</div><div class="c-body">
      <p class="c-who"><span aria-hidden="true">📞</span> <b>${j.who}</b> <span class="fict">Made-up client</span></p>
      <p class="c-ask">“<span>${j.ask}</span>”</p></div></div>`;
  }
  const kick = (n, label) => `<p class="kicker"><span>Job ${n} of 4</span>${label ? ` · <span>${label}</span>` : ""}</p>`;
  // Card order is shuffled once per job, so clicking the first card isn't always Survey.
  function handOrder(jid) { st.cardOrder = st.cardOrder || {}; if (!st.cardOrder[jid]) { st.cardOrder[jid] = shuffle(ORDER); save(); } return st.cardOrder[jid]; }
  function cardHtml(k, o) {
    const m = M[k];
    return `<button type="button" class="mcard m-${k}${o.sel ? " sel" : ""}${o.tried ? " tried" : ""}" data-m="${k}" aria-pressed="${o.sel ? "true" : "false"}"${o.tried || o.off ? " disabled" : ""}>
      ${o.tried ? `<span class="stampmini">✖ <span>Tried</span></span>` : ""}
      <span class="mc-top"><span class="mc-icon" aria-hidden="true">${m.icon}</span><span class="mc-name">${m.name}</span></span>
      <span class="mc-d">${m.d}</span>
    </button>`;
  }
  function stamp(kind) {
    const t = { solid: ["✅", "SOLID REPORT"], shaky: ["⚠️", "SHAKY REPORT"], ok: ["🟡", "HALF THE STORY"], garbage: ["🔧", "WRONG TOOL"] }[kind];
    return `<p class="stamp s-${kind}"><span aria-hidden="true">${t[0]}</span> <span>${t[1]}</span></p>`;
  }
  const repLine = d => `<p class="payline"><span class="pp ${d > 0 ? "up" : d < 0 ? "down" : ""}">⭐ ${d > 0 ? "+" + d : d < 0 ? "−" + Math.abs(d) : "±0"} reputation</span></p>`;

  // ---------------- Intro ----------------
  function intro() {
    app.innerHTML = `<section class="intro">
      <div class="intro-left">
        <p class="kick">Made-up agency game</p>
        <h1>Research Rivals</h1>
        <p class="hook">Clients bring questions about people. Pick the right way to find the answer, before Blake makes you look bad.</p>
        <ul class="chips"><li>🃏 4 jobs</li><li>⏱ 25 min</li><li>✍️ 2 short answers</li></ul>
        <p class="goal"><b>🎯 Goal:</b> Match each research method to the question it answers, and spot a flawed study.</p>
        <ol class="howsteps"><li><b>Pick</b> a method card that fits the question</li><li><b>Plan</b> how to run it</li><li><b>Prove</b> what your results mean</li></ol>
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

  // ---------------- Screen 1 of each job: pick a card, then plan it ----------------
  function pickScreen() {
    const j = JOBS[st.job];
    const tried = st.tried[j.id] || [];
    const picked = st.pick[j.id];
    let html = `<section class="card job">${kick(st.job + 1, picked ? "Plan it" : "Pick a method")}${clientCard(j)}`;
    if (!picked) {
      html += `<p class="direct">👆 Which method answers this question?</p>`;
      html += `<div class="hand">${handOrder(j.id).map(k => cardHtml(k, { tried: tried.includes(k) })).join("")}</div>`;
      const g = st.lastGarbage[j.id];
      if (g) html += `<div class="garbage" id="garb"><div class="paper crumpled">${stamp("garbage")}<p class="g-what"><span aria-hidden="true">${M[g].icon}</span> <b>${M[g].name}</b></p><p>${j.fits[g].text}</p></div>
        ${say(j.icon, j.who, "That won't answer my question. Try another card.")}${repLine(tried.length === 1 ? -1 : 0)}</div>`;
    } else {
      const m = M[picked];
      if (!st.order[j.id]) { st.order[j.id] = shuffle(["good", "bad"]); save(); }
      html += `<div class="played"><div class="minicard m-${picked}" aria-hidden="true"><span>${m.icon}</span><b>${m.name}</b></div>${say(j.icon, j.who, "Good pick. How will you run it?")}</div>`;
      html += `<div class="setups" id="setupH">${st.order[j.id].map(x => {
        const s = j.setup[x];
        return `<button type="button" class="setup" data-s="${x}"><span class="sc-ic" aria-hidden="true">${s.icon}</span><span class="sc-l">${s.title}</span><span class="sc-s">${s.sub}</span></button>`;
      }).join("")}</div>`;
    }
    html += `</section>`;
    app.innerHTML = html;
    app.querySelectorAll(".mcard").forEach(b => b.onclick = () => playCard(j, b.dataset.m));
    app.querySelectorAll(".setup").forEach(b => b.onclick = () => chooseSetup(j, b.dataset.s));
    if ($("garb")) $("garb").scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function playCard(j, k) {
    const m = M[k];
    if (k === j.best) {
      st.pick[j.id] = k; st.lastGarbage[j.id] = null; anim = true;
      save(); render(); window.scrollTo(0, 0); return;
    }
    const f = j.fits[k];
    if (f.fit === "wrong") {
      (st.tried[j.id] = st.tried[j.id] || []).push(k);
      st.lastGarbage[j.id] = k;
      const firstMiss = st.tried[j.id].length === 1;   // only the first wrong card on a job costs a star
      if (firstMiss) { st.rep -= 1; addLog(st.job + 1, "Wrong tool: " + m.name, "−1 ⭐", "down"); }
      st.mood = "😂"; clampRep(); anim = false;
      save(); render(); return;
    }
    // "ok": accepted, but only half the story. No plan step.
    st.pick[j.id] = k; st.fit[j.id] = "ok"; st.lastGarbage[j.id] = null;
    st.rep -= 1; st.mood = "😏"; clampRep(); anim = true;
    addLog(st.job + 1, j.logOk, "−1 ⭐", "down");
    st.phase = "results"; save(); render(); window.scrollTo(0, 0);
  }

  function chooseSetup(j, x) {
    st.setup[j.id] = x;
    const solid = x === "good";
    st.fit[j.id] = solid ? "solid" : "shaky";
    anim = true; st.mood = solid ? "😤" : "😂";
    if (solid) { st.rep += 1; addLog(st.job + 1, j.logSolid, "+1 ⭐", "up"); }
    else { st.rep -= 2; addLog(st.job + 1, j.logShaky, "−2 ⭐", "down"); }
    clampRep(); st.phase = "results"; save(); render(); window.scrollTo(0, 0);
  }

  // ---------------- Screen 2 of each job: results + evidence check ----------------
  function resultsScreen() {
    const j = JOBS[st.job];
    const fit = st.fit[j.id];
    const k = st.pick[j.id], m = M[k];
    const r = fit === "ok" ? j.fits[k] : fit === "solid" ? j.solid : j.shaky;
    const side = fit === "solid" ? quiet() : post(r.rival, fit === "ok" ? "900" : "2.7K");
    const sel = st.setup[j.id] ? j.setup[st.setup[j.id]] : null;
    const ck = j.check, v = variantFor(ck), ckDone = (st.checks[ck] || {}).done;
    let html = `<section class="card job">${kick(st.job + 1, "Results")}
      <div class="desk"><div class="report paper">${stamp(fit)}<p class="r-plan"><span aria-hidden="true">${m.icon}</span> <b>${m.name}</b>${sel ? `<span class="r-sep"> · </span><span aria-hidden="true">${sel.icon}</span> <span>${sel.title}</span>` : ""}</p>${r.data()}${r.text ? `<p class="r-text">${r.text}</p>` : ""}</div>
      <div class="rivalcol">${side}<p class="mini-reveal">💡 ${r.reveal}</p>${repLine(fit === "solid" ? 1 : fit === "ok" ? -1 : -2)}</div></div>`;
    html += checkHtml(ck, v);
    if (ckDone && j.bonus) html += bonusHtml();
    if (ckDone && (!j.bonus || st.bonus)) html += `<button type="button" class="go next" id="nextBtn">${st.job === 2 ? "Next: the final job →" : "Next job →"}</button>`;
    html += `</section>`;
    app.innerHTML = html;
    wireCheck(ck, v);
    bringCheck(ck);
    app.querySelectorAll(".bonusbtn").forEach(b => b.onclick = () => chooseBonus(b.dataset.b));
    if ($("nextBtn")) $("nextBtn").onclick = nextJob;
  }
  // After the report has a moment to land, slide the unanswered question into view.
  function bringCheck(ck) {
    if ((st.checks[ck] || {}).done) return;
    setTimeout(() => { const el = $("chk_" + ck); if (el && el.getBoundingClientRect().bottom > window.innerHeight) el.scrollIntoView({ block: "start", behavior: "smooth" }); }, 1400);
  }
  function nextJob() { st.job += 1; st.phase = "pick"; anim = true; save(); render(); window.scrollTo(0, 0); }
  function variantFor(id) { return id === "c5" ? ({ solid: "A", shaky: "B", ok: "C" }[st.fit.j3] || "B") : null; }

  // ---------------- Temptation (job 3) ----------------
  function bonusHtml() {
    const claim = { solid: "raises scores 4 points more than studying without it", shaky: "raises scores 7 points", ok: "is proven to raise scores" }[st.fit.j3] || "raises scores";
    const ask = "Write \"StudyStreak " + claim + "\" and we'll sign a big contract with you.";
    if (st.bonus) {
      return `<div class="bonus done"><p class="b-h">📱 The StudyStreak CEO</p><p>${st.bonus === "truth" ? "You told the truth. The CEO is annoyed." : "You took the deal. The report says what they wanted. ⭐ +2 for now."}</p></div>`;
    }
    return `<div class="bonus phone" id="bonusBox"><p class="b-h"><span class="ring" aria-hidden="true">📱</span> <span>The StudyStreak CEO calls</span></p><p class="b-ask">“<span>${ask}</span>”</p>
      <div class="setups"><button type="button" class="setup bonusbtn" data-b="truth"><span class="sc-ic" aria-hidden="true">🧾</span><span class="sc-l">Report what the data shows</span><span class="sc-s">No contract.</span></button>
      <button type="button" class="setup bonusbtn" data-b="lie"><span class="sc-ic" aria-hidden="true">🤝</span><span class="sc-l">Take the deal</span><span class="sc-s">⭐ +2 now.</span></button></div></div>`;
  }
  function chooseBonus(b) {
    st.bonus = b;
    if (b === "lie") { st.rep += 2; st.mood = "🤨"; addLog(3, "Took a deal to stretch the results", "+2 ⭐", "down"); }
    else addLog(3, "Reported the real results", "honest", "up");
    clampRep(); save(); render();
    const n = $("nextBtn"); if (n) n.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  // ---------------- Final job: two cards ----------------
  function finalScreen() {
    const j = JOBS[3];
    const sel = st.finalSel || [];
    let html = `<section class="card job">${kick(4, "The big one")}${clientCard(j)}
      <p class="rule"><span aria-hidden="true">🃏🃏</span> <span>Two-part question. Play <b>2 cards</b>.</span></p>
      <div class="hand">${handOrder(j.id).map(k => cardHtml(k, { sel: sel.includes(k) })).join("")}</div>
      <div class="playbar">${sel.length ? `<p class="pb-sel">${sel.map(k => `<span aria-hidden="true">${M[k].icon}</span> <b>${M[k].name}</b>`).join(" + ")}</p>` : `<p class="pb-none"><span aria-hidden="true">👆</span> <span>Tap 2 cards</span></p>`}
      ${sel.length === 2 ? `<button type="button" class="go" id="playBtn">Play both cards →</button>` : sel.length === 1 ? `<p class="pb-none">Pick 1 more</p>` : ""}</div></section>`;
    app.innerHTML = html;
    app.querySelectorAll(".mcard").forEach(b => b.onclick = () => {
      const k = b.dataset.m; let s = (st.finalSel || []).slice();
      if (s.includes(k)) s = s.filter(x => x !== k); else { s.push(k); if (s.length > 2) s.shift(); }
      st.finalSel = s; save(); render();
      const p = $("playBtn"); if (p) p.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    if ($("playBtn")) $("playBtn").onclick = playFinal;
  }
  function playFinal() {
    const sel = st.finalSel.slice(); st.finalPick = sel;
    const hasC = sel.includes("content"), hasI = sel.includes("interview"), hasS = sel.includes("survey");
    const fit = hasC && hasI ? "solid" : (hasC || hasI) ? "ok" : "garbage";
    st.finalFit = fit;
    anim = true; st.mood = fit === "solid" ? "😡" : fit === "ok" ? "😏" : "🤑";
    if (fit === "solid") { st.rep += 2; addLog(4, "Ad count + interviews: mixed methods", "+2 ⭐", "up"); }
    else if (fit === "ok") addLog(4, hasC ? (hasS ? "Ad count + survey: reasons were just checkboxes" : "Ad count only: no WHY") : "Interviews only: no ad data", "±0 ⭐", "flat");
    else { st.rep -= 2; addLog(4, "Wrong cards for the final job", "−2 ⭐", "down"); }
    if (st.bonus === "lie") st.leak = true;   // the −4 lands when the leak appears on screen
    clampRep(); st.phase = "results"; save(); render(); window.scrollTo(0, 0);
  }
  function finalResults() {
    const fit = st.finalFit, sel = st.finalPick || [];
    const hasC = sel.includes("content"), hasS = sel.includes("survey");
    const adBit = bars([["Athletes", 44], ["Gamers", 27], ["Partying", 18], ["Studying", 11]], "Who's shown in 200 random ads · made-up game data");
    const talkBit = quote("\"I drink one before practice. The athletes in the ads look unstoppable.\"") + quote("\"Honestly? To stay up gaming.\"") + `<p class="madeup">Made-up quotes from 20 talks</p>`;
    let data = "", text = "", reveal = "", side = "";
    if (fit === "solid") {
      data = adBit + talkBit; text = "Now you know WHAT ads show and WHY teens buy.";
      reveal = "<b>Mixed methods</b> = two methods covering each other's weak spots.";
    } else if (fit === "ok") {
      if (hasC) {
        data = adBit + (hasS ? bars([["Taste", 41], ["Energy", 38], ["Other", 21]], "Why teens buy (checkbox survey) · made-up game data") : "");
        side = post(hasS ? "Cedar River's big WHY: \"Other.\" 🦗" : "Cedar River counted ads. Council: \"But WHY do teens buy?\" Cedar River: 🦗", "3.1K");
        reveal = hasS ? "A checkbox can't explain WHY. <b>Interviews</b> get reasons in people's own words." : "Two-part question. An ad count answers <b>what ads show</b>. <b>Interviews</b> answer <b>why</b>.";
      } else {
        data = talkBit;
        side = post("Cedar River talked to 20 kids and never looked at ONE ad. 🤏", "3.1K");
        reveal = "Two-part question. <b>Content analysis</b> shows what the ads show.";
      }
    } else {
      text = "No ad data, no reasons. The client hires Hot Take instead.";
      reveal = "\"What do ads show?\" needs <b>content analysis</b>. \"Why?\" needs <b>interviews</b>.";
      side = post("Guess who the client called? 😎", "6.6K");
    }
    const ck = "c2", ckDone = (st.checks[ck] || {}).done;
    let html = `<section class="card job">${kick(4, "Results")}
      <div class="report paper">${stamp(fit)}<p class="r-plan">${sel.map(k => `<span aria-hidden="true">${M[k].icon}</span> <b>${M[k].name}</b>`).join(" + ")}</p>${data}${text ? `<p class="r-text">${text}</p>` : ""}</div>
      ${side}<p class="mini-reveal">💡 ${reveal}</p>${repLine(fit === "solid" ? 2 : fit === "ok" ? 0 : -2)}`;
    html += checkHtml(ck);
    if (ckDone && st.leak && !st.leakHit) { st.leakHit = true; st.rep -= 4; addLog(4, "Blake leaked the real app numbers", "−4 ⭐", "down"); clampRep(); save(); setTimeout(hud, 50); }
    if (ckDone) {
      if (st.leak) html += `<div class="leak"><p class="b-h">🚨 Breaking</p>${post("LEAKED: StudyStreak's real numbers. Cedar River stretched them for a contract. 🧾", "12K")}${repLine(-4)}
        ${unlock("<b>Honesty</b>: report what the data shows, even when someone pays you not to.")}</div>`;
      html += `<button type="button" class="go next" id="nextBtn">See how your season ended →</button>`;
    }
    html += `</section>`;
    app.innerHTML = html;
    wireCheck(ck);
    bringCheck(ck);
    if ($("nextBtn")) $("nextBtn").onclick = toEnding;
  }
  function toEnding() { st.ending = endingFor(); st.phase = "end"; anim = true; save(); render(); window.scrollTo(0, 0); }

  // ---------------- Ending + writing + turn in ----------------
  const ENDINGS = {
    top: { icon: "🏆", title: "Iowa's Most Trusted Research Team", text: "Clients line up. Hot Take loses its biggest clients to you." },
    mid: { icon: "🏚️", title: "Still Open, Barely", text: "Bills paid, but clients doubt you. Blake's posts still follow you." },
    low: { icon: "🔥", title: "Bought Out by Hot Take Analytics", text: "Your reports had too many holes. Clients went with Blake." }
  };
  function endingFor() { return st.rep >= 8 ? "top" : st.rep >= 4 ? "mid" : "low"; }
  function endScreen() {
    const e = ENDINGS[st.ending || endingFor()];
    const trail = st.log.map(l => `<li class="${l.kind}"><span class="lj" aria-label="Job ${l.job}">${l.job}</span><span class="lt">${l.text}</span><b class="ld">${l.delta}</b></li>`).join("");
    app.innerHTML = `<section class="card ending e-${st.ending}">
      <p class="kicker">Season over</p><div class="end-head"><span class="end-ic" aria-hidden="true">${e.icon}</span><div class="sign"><h2>${e.title}</h2><p>${e.text}</p></div></div>
      <div class="endstats"><span>⭐ <b>${st.rep}/10</b> reputation</span></div>
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
    JOBS.slice(0, 3).forEach((j, i) => {
      const tried = (st.tried[j.id] || []).map(k => M[k].name);
      const pk = st.pick[j.id] ? M[st.pick[j.id]].name : "";
      answers["Choice · Job " + (i + 1) + " method"] = pk + (st.fit[j.id] === "ok" ? " (half the story; best was " + M[j.best].name + ")" : "") + (tried.length ? " (after wrong cards: " + tried.join(", ") + ")" : " (first card)");
      if (st.setup[j.id]) answers["Choice · Job " + (i + 1) + " plan"] = j.setup[st.setup[j.id]].title + " — " + j.setup[st.setup[j.id]].sub + (st.setup[j.id] === "good" ? " (sound)" : " (flawed)");
    });
    answers["Choice · StudyStreak deal"] = st.bonus === "lie" ? "Took the deal to stretch the results" : "Reported the real results";
    answers["Choice · Final job methods"] = (st.finalPick || []).map(k => M[k].name).join(" + ") + (st.finalFit === "solid" ? " (mixed methods)" : st.finalFit === "ok" ? " (one part only)" : " (did not fit)");
    answers["Ending"] = ENDINGS[st.ending].title;
    answers["Caused by"] = st.log.map(l => "Job " + l.job + ": " + l.text + " (" + l.delta + ")").join(" · ");
    answers["Reputation"] = st.rep + " of 10";
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
    return `<div class="check board" id="chk_${id}"><p class="ck-kick">🔒 Evidence check: answer to finish the job</p><div class="pins">${c.evidence()}</div>${say(a[0], a[1], c.prompt, "ask")}<div class="choices replies" id="ch_${id}"></div><p class="msg" id="fb_${id}" aria-live="polite"></p></div>`;
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
            setTimeout(() => { const nx = $("bonusBox") || $("nextBtn") || $("chk_" + id); if (nx) nx.scrollIntoView({ block: "center", behavior: "smooth" }); }, 300);
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
    else if (st.job === 3) (st.phase === "pick" ? finalScreen : finalResults)();
    else if (st.phase === "pick") pickScreen();
    else resultsScreen();
    if (anim && app.firstElementChild) app.firstElementChild.classList.add("anim");
    anim = false;
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; prevRep = null; anim = true; save(); render(); window.scrollTo(0, 0);
  };
  if (st.started && $("welcome")) {
    $("welcome").textContent = "Welcome back, " + st.name + " — you're on " + (st.phase === "end" || st.phase === "write" ? "the last step" : "Job " + (st.job + 1) + " of 4") + ".";
    $("welcome").hidden = false;
  }
  render();
  // for testing only (read-only peek)
  window.__rr = { state: () => JSON.parse(JSON.stringify(st)) };
})();
