// =====================================================================
//  PROVE IT LAB  (Sociology Unit 1 Day 5 · SS.9-12.Soc.1)
//  Rebuild 2026-11-03 (Fynn: kids won't understand what's going on; it should be a
//  study they actually care about, and they need prompting to know where to start).
//
//  The student picks one of Kai's hot takes about teen life (phones & sleep, jobs &
//  grades, social media & mood, sports & grades) and tests it with the scientific
//  method. Dr. Ruiz coaches every step in one short line. Every piece is built by
//  tapping, never from a blank page. Their study choices MAKE their data, and the
//  data can support or bust their own hypothesis (and Kai's take).
//
//  6 steps = the 6 chips (Ask, Research, Predict, Collect, Analyze, Conclude), then the
//  ending + lab report. 5 evidence checks. Strict order. Saves on this device.
//  Turn-in goes through shared/turnin.js (same assignment id and payload shape as before).
//  Kai, the lab, CVTV, Dr. Ruiz and all study numbers are made up. Research notes are
//  plain summaries of broad findings, with no made-up statistics.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u1-d5-prove-hot-take-v4";
  const ASSIGNMENT_ID = "soc-u1-d5-prove-hot-take";
  const TITLE = "Sociology · Unit 1 · Day 5 · How Can You Prove a Hot Take?";
  const STANDARD = "SS.9-12.Soc.1";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 2, DAYS = 4, TOTAL = 6;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (window.SiteLang ? window.SiteLang.t(s) : s);

  // ---------------- The four hot takes ----------------
  // ga = group A (the "more of the thing" group), gb = group B. va/vb = what a fair study finds (made up).
  const TOPICS = {
    sleep: {
      ic: "📱", name: "Phones & sleep", take: "Scrolling till 2 a.m. doesn't mess up your sleep 😤",
      iv: "Phone use after midnight", dv: "Hours of sleep", dvShort: "hours of sleep", ivShort: "late-night phone use", decoy: "Favorite app",
      ga: "📱 On phone after midnight", gb: "😴 Phone off by midnight", who: "on their phone after midnight", than: "than students who put the phone away",
      unit: "Hours of sleep a night (average)", max: 10, va: 6.1, vb: 7.4, fmt: v => v.toFixed(1) + " h",
      more: "sleep more", less: "sleep less",
      q: ["Do students on phones after midnight sleep fewer hours?", "Is it bad for anyone to use their phone late at night?", "Why do so many students stay up on their phones?", "Should students turn off their phones at 11 p.m.?"],
      lead: "“Phones at night mess up your sleep, right?”", survey: "“How many hours did you sleep last night?”", record: "Sleep tracker watch, 7 nights",
      notes: ["Doctors say screens before bed can make you fall asleep later.", "Caffeine and energy drinks also cut teen sleep."],
      factor: "Energy drinks", fic: "⚡",
      third: { prompt: "“Late-phone kids also drink more energy drinks. So what?”", options: ["Energy drinks could be cutting their sleep too", "That proves phones are the real cause, not drinks", "It doesn't matter, since we only measured phones", "Energy drinks only affect adults, not teens"], hint: "Could one other thing lower their sleep too?" },
      cause: "phones after midnight CAUSE less sleep",
      bold: "PROVEN: Late-night phones wreck your sleep 🔥", subtle: "New study: late-night phones cut your sleep", careful: "Late-phone students slept less. A pattern, not proof.",
      kaiFair: "no", kaiLine: "Your data doesn't back Kai up: late-phone students slept LESS."
    },
    jobs: {
      ic: "💼", name: "Jobs & grades", take: "Having a job tanks your grades. Facts 💯",
      iv: "Hours worked per week", dv: "GPA", dvShort: "GPA", ivShort: "hours worked", decoy: "Where they work",
      ga: "💼 Works 20+ hours a week", gb: "📚 Works less or no job", who: "who work 20+ hours a week", than: "than students who work less",
      unit: "GPA (average, out of 4.0)", max: 4, va: 2.7, vb: 3.0, fmt: v => v.toFixed(1),
      more: "have higher GPAs", less: "have lower GPAs",
      q: ["Do students who work 20+ hours a week have lower GPAs?", "Are jobs good or bad for teenagers in general?", "Why do so many students work 20+ hours a week?", "Should teens be allowed to work 20+ hours a week?"],
      lead: "“Jobs hurt your grades, right?”", survey: "“What's your GPA?” (students report it)", record: "Real GPAs from the office, with permission",
      notes: ["Working a lot (around 20+ hours a week) goes with lower grades.", "Working just a few hours a week shows little link to grades."],
      factor: "Family needs the money", fic: "🏠",
      third: { prompt: "“Kids working 20+ hours are more likely to have families who need the money. So what?”", options: ["Money stress at home could lower grades too", "That proves the job itself is what lowers grades", "It doesn't matter, since we only measured hours", "Family money only matters for younger kids"], hint: "Could one other thing lower their grades too?" },
      cause: "working a lot CAUSES lower grades",
      bold: "PROVEN: Jobs tank your grades 🔥", subtle: "New study: working lowers your grades", careful: "Students working 20+ hours had lower GPAs. A pattern, not proof.",
      kaiFair: "partly", kaiLine: "Your data backs Kai up a little: long work hours went with lower GPAs. (Only for long hours, though.)"
    },
    social: {
      ic: "📸", name: "Social media & mood", take: "Social media makes everybody miserable 😭",
      iv: "Hours on social media a day", dv: "Mood rating (1–5)", dvShort: "mood", ivShort: "time on social media", decoy: "Number of followers",
      ga: "📸 3+ hours a day", gb: "🌤️ Under 1 hour a day", who: "on social media 3+ hours a day", than: "than students who use it less",
      unit: "Mood, 1–5 (average)", max: 5, va: 2.9, vb: 3.6, fmt: v => v.toFixed(1),
      more: "rate their mood higher", less: "rate their mood lower",
      q: ["Do students on social media 3+ hours a day rate mood lower?", "Is social media good or bad for people's mood these days?", "Why do students spend 3+ hours a day on social media?", "Should our school block social media after 3 hours a day?"],
      lead: "“Social media makes you sad, right?”", survey: "“Rate your mood this week, 1 to 5.”", record: "Screen-time report + a daily mood check-in, 7 days",
      notes: ["Heavy users report feeling down more often.", "Researchers still argue: does scrolling cause it, or do sad people scroll more?"],
      factor: "Already feeling down", fic: "😶",
      third: { prompt: "“Maybe kids who already feel down scroll more. So what?”", options: ["Their mood could be causing the scrolling", "That proves scrolling is what lowers mood", "It doesn't matter, since we only measured hours", "Mood never changes, so it can't be a factor"], hint: "Which came first, the scrolling or the bad mood?", why: "<b>Reverse cause</b>: maybe the bad mood comes first and causes the scrolling, not the other way around." },
      cause: "social media CAUSES a worse mood",
      bold: "PROVEN: Social media makes you miserable 🔥", subtle: "New study: social media lowers your mood", careful: "Heavy scrollers rated their mood lower. A pattern, not proof.",
      kaiFair: "partly", kaiLine: "Your data backs Kai up a little: heavy scrollers rated their mood lower. (\"Everybody\" is too much, though.)"
    },
    sports: {
      ic: "🏀", name: "Sports & grades", take: "Athletes don't care about school lol 🏈",
      iv: "Plays a school sport", dv: "GPA", dvShort: "GPA", ivShort: "playing a sport", decoy: "Team jersey number",
      ga: "🏀 Plays a school sport", gb: "🎮 No school sport", who: "who play a school sport", than: "than students who don't",
      unit: "GPA (average, out of 4.0)", max: 4, va: 3.2, vb: 2.9, fmt: v => v.toFixed(1),
      more: "have higher GPAs", less: "have lower GPAs",
      q: ["Do students who play a school sport have different GPAs?", "Are athletes smarter than everyone else at our school?", "Why do so many athletes care more about sports?", "Should athletes need a 3.0 GPA to play on a team?"],
      lead: "“Athletes slack off in school, right?”", survey: "“What's your GPA?” (students report it)", record: "Real GPAs from the office, with permission",
      notes: ["Students in school activities tend to have slightly higher grades.", "Many teams make players pass their classes to stay on the team."],
      factor: "Grade rules to play", fic: "📋",
      third: { prompt: "“Players must pass their classes to stay on the team. So what?”", options: ["The grade rule could explain the higher GPAs", "That proves sports are what raise GPAs", "It doesn't matter, since we only measured sports", "The rule only matters for college athletes"], hint: "Who gets to stay on a team? Could that explain it?" },
      cause: "sports CAUSE higher grades",
      bold: "PROVEN: Sports make you smarter 🔥", subtle: "New study: sports raise your grades", careful: "Athletes had slightly higher GPAs. A pattern, not proof.",
      kaiFair: "no", kaiLine: "Your data doesn't back Kai up: athletes had slightly HIGHER GPAs. (GPA can't measure \"caring,\" though.)"
    }
  };
  const TOPIC_ORDER = ["sleep", "jobs", "social", "sports"];

  // Study options. cost = lab days.
  const MEASURES = {
    leading: { ic: "👍", t: "Yes/no question", cost: 0 },
    survey: { ic: "📝", t: "Short survey", cost: 1 },
    record: { ic: "📊", t: "Tracked data", cost: 2 }
  };
  const SAMPLES = {
    friends: { ic: "🍕", t: "6 friends", d: "Your lunch table. Easy.", cost: 0 },
    oneclass: { ic: "🏫", t: "One class", d: "25 juniors in 3rd period.", cost: 1 },
    random: { ic: "🎲", t: "100 at random", d: "Every grade. Lots of permission slips.", cost: 3 }
  };
  const measureLine = (k, T) => k === "leading" ? T.lead : k === "survey" ? T.survey : T.record;

  // ---------------- State ----------------
  const fresh = () => ({ v: 4, name: "", step: 0, topic: null, research: false, hyp: null, draft: {}, measure: null, sample: null, built: false, runs: 0,
    review: null, fix: null, headline: null, checks: {}, writing: {}, turnedIn: false, atReport: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 4) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });
  const T = () => TOPICS[st.topic];

  // Problem left in the data: junk (leading question) beats noisy (6 friends) beats narrow (one class).
  function flawOf(m, s) { if (m === "leading") return "junk"; if (s === "friends") return "noisy"; if (s === "oneclass") return "narrow"; return "none"; }
  const flaw = () => flawOf(st.measure, st.sample);

  // ---------------- Data (all made up for the game) ----------------
  function dataFor(m, s, run) {
    const t = T();
    if (m === "leading") {
      const yes = { random: [93, 94], oneclass: [95, 92], friends: [100, 83] }[s][run];
      return { kind: "yes", unit: "Said YES", rows: [{ l: "👍 YES", v: yes, max: 100, txt: yes + "%" }] };
    }
    let a = t.va, b = t.vb;
    const gap = a - b;
    if (s === "friends") { if (run === 1) { a = t.vb + gap * 0.4; b = t.va - gap * 0.4; } else { a = t.va + gap * 0.6; b = t.vb - gap * 0.6; } }
    else if (s === "oneclass") { a = t.va + gap * 0.3 + (run ? 0.05 : 0); b = t.vb - gap * 0.3; }
    else { a = t.va + (run ? 0.1 : 0) * Math.sign(gap || 1) * (m === "survey" ? 1 : 0.5); b = t.vb - (run ? 0.1 : 0) * Math.sign(gap || 1) * (m === "survey" ? 1 : 0.5); }
    a = Math.max(0, Math.min(t.max, a)); b = Math.max(0, Math.min(t.max, b));
    return { kind: "bars", unit: t.unit, rows: [{ l: t.ga, v: a, max: t.max, txt: t.fmt(a) }, { l: t.gb, v: b, max: t.max, txt: t.fmt(b) }] };
  }
  function chartHtml(run, m, s) {
    const d = dataFor(m || st.measure, s || st.sample, run);
    return `<div class="chart"><p class="chart-t">${run === 0 ? "Run 1" : (s || st.sample) === "friends" ? "Run 2 (6 different friends)" : "Run 2"}</p><p class="chart-u">${d.unit}</p>` +
      d.rows.map(r => `<div class="brow"><span class="bl">${r.l}</span><span class="bt"><span style="width:${Math.max(2, Math.round(r.v / r.max * 100))}%"></span></span><b>${r.txt}</b></div>`).join("") + `</div>`;
  }
  const chartsHtml = (m, s) => `<div class="charts">${chartHtml(0, m, s)}${chartHtml(1, m, s)}</div><p class="madeup">Made-up game data</p>`;

  // ---------------- Evidence checks ----------------
  const REVIEWS = {
    junk: { prompt: "“Almost everyone said yes. Look at your question. Why?”",
      options: ["The question pushed people to say yes", "Too many students took the survey", "Students always tell the truth on surveys", "Yes/no questions are never allowed"],
      hint: "Read your question out loud. Does it push one answer?",
      why: "<b>Leading question:</b> it pushes people toward one answer." },
    noisy: { prompt: "“Run 1 and Run 2 flipped. Why?”",
      options: ["With 6 people, one person can swing it", "Your friends are too honest for surveys", "The study ran on the wrong school day", "This topic changes too fast to measure"],
      hint: "How many people? What if one of them had a weird week?",
      why: "<b>Sample size:</b> too few people, and one can swing it." },
    narrow: { prompt: "“Everyone in your study was a junior in one class. Why does that matter?”",
      options: ["They might not match the whole school", "25 people is way too many to count", "Juniors can't answer questions honestly", "One class makes the runs repeat"],
      hint: "Your question was about all students. Who got left out?",
      why: "<b>Biased sample:</b> people who don't match the whole group you're asking about." }
  };
  const CHECK_IDS = ["q_question", "q_vars", "q_review", "q_support", "q_cause"];
  const SHORT = { q_question: "Pick the focused research question", q_vars: "Wire the IV and DV", q_review: "Diagnose your own data", q_support: "Did the data support my hypothesis?", q_cause: "Pattern vs. proof of cause" };
  const TAUNTS = ["💬 Kai: “lol the lab is lost 😂”", "💬 Kai: “see? science is just vibes 😤”", "💬 Kai: “take ur time, i'm going viral 🔥”"];

  // ---------------- Shared pieces ----------------
  const app = $("app");
  const head = t => `<h2>${t}</h2>`;
  const coach = html => `<div class="coach"><span class="sav" aria-hidden="true">👩🏽‍🔬</span><div class="bubble"><span class="cname">Dr. Ruiz, your coach</span><p>${html}</p></div></div>`;
  const reveal = html => `<p class="reveal">💡 ${html}</p>`;
  const kaiPost = (body, stats) => `<div class="post"><div class="ph"><span class="av">😤</span><b>@kai.grindset</b><span class="verified">✔</span></div><p class="pb">${body}</p><p class="ps">${stats || ""}</p></div>`;
  function nextBtn(label, onclick) { const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn"; b.textContent = label; b.onclick = onclick; return b; }
  const STEP_NAME = ["", "Ask", "Research", "Predict", "Collect", "Analyze", "Conclude", "See how it ends"];
  function goNext() { st.step++; save(); render(); window.scrollTo(0, 0); }
  function addNext(box) { box.appendChild(nextBtn("Next: " + STEP_NAME[st.step + 1] + " →", goNext)); }
  function scrollToEl(el) { if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 40); }
  let locked = false, justSolved = null;
  const stamp = (id, txt) => `<span class="stamp${justSolved === id ? " slam" : ""}">${txt}</span>`;

  // Multiple-choice evidence check. def.options[0] is right; the screen always shuffles.
  function mountCheck(box, id, def, onRight) {
    const c = chk(id);
    const wrap = document.createElement("div"); wrap.className = "check"; wrap.dataset.check = id;
    const who = def.who || { av: "🔎", n: "Evidence check" };
    box.appendChild(wrap);
    if (c.done) { wrap.innerHTML = stamp(id, "✔ Got it") + reveal(def.why); wrap.classList.add("solved"); if (justSolved === id) justSolved = null; return; }
    wrap.innerHTML = `<div class="speaker"><span class="sav">${who.av}</span><span class="sname"><b>${who.n}</b><small>🔎 Evidence check</small></span></div><div class="bubble"><h3>${def.prompt}</h3></div>`;
    const area = document.createElement("div"); area.className = "choices" + (def.options.length === 3 ? " three" : "");
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    const taunt = document.createElement("p"); taunt.className = "taunt"; taunt.hidden = true;
    let lastOrder = "";
    function draw() {
      area.replaceChildren();
      let order;
      for (let k = 0; k < 8; k++) { order = shuffle(def.options.map((t, n) => ({ t, n }))); if (order.map(o => o.n).join() !== lastOrder) break; }
      lastOrder = order.map(o => o.n).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) { c.done = true; justSolved = id; if (window.classFirstTry) window.classFirstTry.right(id); save(); onRight(); return; }
          c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong(); save();
          taunt.textContent = TAUNTS[(c.wrong - 1) % TAUNTS.length]; taunt.hidden = false;
          wrap.classList.remove("spark"); void wrap.offsetWidth; wrap.classList.add("spark");
          locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
          if (fb.scrollIntoView) fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
          let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;   // Test T.: no wait
          const tick = () => {
            fb.className = "msg bad";
            if (left <= 0) { locked = false; fb.textContent = "Not quite. " + def.hint + " Try again."; draw(); return; }
            fb.textContent = "Not quite. " + def.hint + " New order in " + left + "…";
            left--; setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
    wrap.appendChild(fb); wrap.appendChild(area); wrap.appendChild(taunt);
  }

  // Row of choice cards.
  function decision(opts, onPick, cls) {
    const row = document.createElement("div"); row.className = "decide" + (cls ? " " + cls : "");
    opts.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "dcard" + (o.sel ? " sel" : ""); b.dataset.id = o.id;
      b.disabled = !!o.off;
      b.innerHTML = (o.ic ? `<span class="ic">${o.ic}</span>` : "") + `<span class="ct">${o.t}</span>` + (o.d ? `<span class="cd">${o.d}</span>` : "") +
        (o.cost == null ? "" : `<span class="cost">${o.cost ? o.cost + (o.cost === 1 ? " lab day" : " lab days") : "free"}</span>`) + (o.off ? `<span class="why-off">${o.off}</span>` : "");
      b.onclick = () => onPick(o.id);
      row.appendChild(b);
    });
    return row;
  }

  // ---------------- HUD ----------------
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const m = st.step - 1;
    $("track").innerHTML = ["Ask", "Research", "Predict", "Collect", "Analyze", "Conclude"].map((n, i) => `<li class="${i < m ? "done" : i === m ? "now" : ""}"><span>${i < m ? "✓" : i + 1}</span>${n}</li>`).join("");
    $("topicPill").hidden = !st.topic;
    if (st.topic) $("topicPill").textContent = T().ic + " " + T().name;
  }

  // ---------------- Title ----------------
  function title() {
    app.innerHTML = `<section class="card titlecard">
      <div class="title-left">
        <h1>Prove It Lab</h1>
        <p class="hook">Kai posts hot takes about teen life. You'll test one for real, like a sociologist.</p>
        <ul class="facts"><li>🔥 Pick the hot take you want to test</li><li>🧪 Test it in 6 steps, with a coach</li><li>⏱ About 25 min</li></ul>
        <p class="goal">🎯 <b>Goal:</b> use the scientific method to find out if a claim is true.</p>
        <label for="nameBox">Your name</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="Jordan M." value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Open the lab →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        ${kaiPost("Athletes don't care about school lol 🏈", "1.1M views")}
        ${kaiPost("Scrolling till 2 a.m. doesn't mess up your sleep 😤", "2.4M views")}
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Step 1: Ask ----------------
  function step1() {
    const box = card();
    if (!st.topic) {
      box.innerHTML = head("Ask: pick a hot take to test") + coach("Kai posted all of these. Pick the one <b>you</b> want to check. There's no wrong pick.");
      const row = document.createElement("div"); row.className = "topics";
      TOPIC_ORDER.forEach(k => {
        const t = TOPICS[k];
        const b = document.createElement("button"); b.type = "button"; b.className = "topic"; b.dataset.topic = k;
        b.innerHTML = `<span class="t-ic">${t.ic}</span><span class="t-name">${t.name}</span><span class="t-take">“${t.take}”</span>`;
        b.onclick = () => { st.topic = k; save(); render(); window.scrollTo(0, 0); };
        row.appendChild(b);
      });
      box.appendChild(row);
      return;
    }
    const t = T();
    box.innerHTML = head("Ask: turn it into a research question") + `<p>😤 <b>Kai:</b> “${t.take}”</p>` +
      coach("A hot take isn't something you can test yet. A good <b>research question</b> names a group and 2 things you can measure. Skip questions that start with “Should” or “Why.”");
    mountCheck(box, "q_question", { prompt: "Which question can we actually test?", options: t.q, who: { av: "📺", n: "CVTV producer" },
      hint: "Find the one with a group of students AND two things you could count.",
      why: "<b>Research question</b> = step 1 of the <b>scientific method</b>. It names who and what you'll measure." },
      () => { render(); scrollToEl($("nextBtn")); });
    if (chk("q_question").done) {
      box.insertAdjacentHTML("beforeend", `<p class="small-link"><button type="button" class="linkbtn" id="swapTopic">↩ Pick a different hot take</button></p>`);
      $("swapTopic").onclick = () => { st.topic = null; st.checks.q_question = { wrong: chk("q_question").wrong, done: false }; save(); render(); };
      addNext(box);
    }
  }

  // ---------------- Step 2: Research ----------------
  function step2() {
    const box = card(), t = T();
    box.innerHTML = head("Research: see what's already known") +
      coach("Before you build anything, check what other researchers found. It tells you what else to watch for.") +
      `<div class="source"><p class="src-tag">📚 Research notes (short summaries)</p>${t.notes.map(n => `<p>• ${n}</p>`).join("")}</div>` +
      `<div class="track-factor"><p class="src-tag">🔍 Outside factor to watch</p><p class="tf"><span>${t.fic}</span> <b>${t.factor}</b></p><p class="tf-why">This could ALSO change ${t.dvShort === "GPA" ? "GPA" : t.dvShort}. Keep it in mind when you explain your results.</p></div>` +
      reveal("<b>Background research</b> = learning what others already found, before you start.");
    st.research = true; save();
    addNext(box);
  }

  // ---------------- Step 3: Predict ----------------
  let wire = { pick: null, iv: null, dv: null, order: null };
  function step3() {
    const box = card(), t = T();
    box.innerHTML = head("Predict: make your prediction");
    // 3a) build the hypothesis by tapping
    if (!st.hyp) {
      box.insertAdjacentHTML("beforeend", coach("A <b>hypothesis</b> is your best guess, said so you can test it. Tap what YOU think will happen. Being wrong is allowed!"));
      box.insertAdjacentHTML("beforeend", `<p class="hyp-build">Students ${t.who} will…</p>`);
      box.appendChild(decision([{ id: "more", ic: "⬆️", t: t.more }, { id: "less", ic: "⬇️", t: t.less }], k => { st.hyp = k; save(); render(); scrollToEl(document.querySelector(".machine")); }));
      return;
    }
    const hypText = `Students ${t.who} will ${t[st.hyp]} ${t.than}.`;
    box.insertAdjacentHTML("beforeend", `<div class="hyp"><p class="src-tag">🔮 Your hypothesis</p><p class="hyp-t">${hypText}</p></div>`);
    // 3b) wire the IV and DV
    const c = chk("q_vars");
    const tiles = [t.iv, t.dv, t.factor, t.decoy];
    if (!c.done) box.insertAdjacentHTML("beforeend", coach("Name your two variables. <b>IV</b> = what's different between your 2 groups. <b>DV</b> = the result you check. Tap a card, then a box."));
    const m = document.createElement("div"); m.className = "machine" + (c.done ? " on" : ""); box.appendChild(m);
    if (c.done) {
      m.innerHTML = `<div class="socket full"><span class="sk">🔌 IV: what's different between groups</span><b>${t.iv}</b></div><div class="socket full"><span class="sk">📟 DV: the result you check</span><b>${t.dv}</b></div>`;
      m.insertAdjacentHTML("afterbegin", stamp("q_vars", "⚡ Power on")); if (justSolved === "q_vars") justSolved = null;
      box.insertAdjacentHTML("beforeend", reveal(`The <b>DV</b> (${t.dvShort}) depends on the <b>IV</b> (${t.ivShort}).`));
      addNext(box); return;
    }
    if (!wire.order) wire.order = shuffle(tiles.map((x, i) => i));
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    const taunt = document.createElement("p"); taunt.className = "taunt"; taunt.hidden = true;
    function draw() {
      m.innerHTML = "";
      [["iv", "🔌 IV", "What's different between your 2 groups"], ["dv", "📟 DV", "The result you check"]].forEach(([k, lab, sub]) => {
        const s = document.createElement("button"); s.type = "button"; s.className = "socket" + (wire[k] != null ? " full" : "") + (wire.pick != null && wire[k] == null ? " ready" : "");
        s.dataset.socket = k; s.disabled = locked;
        s.innerHTML = `<span class="sk">${lab}</span><span class="sub">${sub}</span>` + (wire[k] != null ? `<b>${tiles[wire[k]]}</b>` : `<span class="empty" aria-label="empty">⬚</span>`);
        s.onclick = () => { if (locked) return; if (wire.pick != null) { wire[k] = wire.pick; wire.pick = null; } else if (wire[k] != null) wire[k] = null; draw(); };
        m.appendChild(s);
      });
      const row = document.createElement("div"); row.className = "tiles";
      wire.order.forEach(i => {
        if (wire.iv === i || wire.dv === i) return;
        const b = document.createElement("button"); b.type = "button"; b.className = "tile" + (wire.pick === i ? " picked" : ""); b.textContent = tiles[i]; b.dataset.tile = i; b.disabled = locked;
        b.onclick = () => { wire.pick = wire.pick === i ? null : i; draw(); };
        row.appendChild(b);
      });
      m.appendChild(row);
      const p = document.createElement("button"); p.type = "button"; p.className = "go"; p.id = "powerBtn"; p.textContent = "⚡ Power on";
      p.disabled = locked || wire.iv == null || wire.dv == null; p.onclick = power; m.appendChild(p);
    }
    function power() {
      if (locked) return;
      if (wire.iv === 0 && wire.dv === 1) {
        c.done = true; justSolved = "q_vars"; if (window.classFirstTry) window.classFirstTry.right("q_vars"); save(); wire = { pick: null, iv: null, dv: null, order: null }; render(); scrollToEl($("nextBtn")); return;
      }
      c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong(); save();
      m.classList.add("spark"); setTimeout(() => m.classList.remove("spark"), 600);
      taunt.textContent = TAUNTS[(c.wrong - 1) % TAUNTS.length]; taunt.hidden = false;
      locked = true; draw();
      setTimeout(() => fb.scrollIntoView && fb.scrollIntoView({ block: "nearest", behavior: "smooth" }), 30);
      let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;   // Test T.: no wait
      const hint = "Look at your hypothesis. What are you changing between groups (IV)? What result do you check (DV)?";
      const tick = () => {
        fb.className = "msg bad";
        if (left <= 0) { locked = false; wire = { pick: null, iv: null, dv: null, order: shuffle(tiles.map((x, i) => i)) }; fb.textContent = "Not quite. " + hint + " Try again."; draw(); return; }
        fb.textContent = "Not quite. " + hint + " New order in " + left + "…";
        left--; setTimeout(tick, 1000);
      };
      tick();
    }
    draw();
    box.appendChild(fb); box.appendChild(taunt);
  }

  // ---------------- Step 4: Collect ----------------
  function step4() {
    const box = card(), t = T();
    if (st.built) return runView(box);
    const d = st.draft;
    const used = (d.measure ? MEASURES[d.measure].cost : 0) + (d.sample ? SAMPLES[d.sample].cost : 0);
    const left = DAYS - used;
    box.innerHTML = head("Collect: design your study") +
      coach(`You have <b>${DAYS} lab days</b>. Better choices take more days, so you can't have everything. Pick what matters most.`) +
      `<p class="budget"><span>Lab days left:</span> <b id="leftN">${left}</b> <span class="tokens" aria-hidden="true">${Array.from({ length: DAYS }, (x, i) => `<i class="${i < left ? "" : "spent"}">📅</i>`).join("")}</span></p>`;
    const rows = [["measure", `1️⃣ How will you measure ${t.dvShort}?`, MEASURES], ["sample", "2️⃣ Who will you study? (This is your <b>sample</b>.)", SAMPLES]];
    for (let r = 0; r < rows.length; r++) {
      const [slot, label, set] = rows[r];
      if (r > 0 && !d[rows[r - 1][0]]) break;
      const sec = document.createElement("div"); sec.className = "slot";
      sec.innerHTML = `<h3>${label}</h3>`;
      if (slot === "sample") sec.insertAdjacentHTML("beforeend", `<p class="dm">📩 <b>Kai:</b> “just ask ur friends lol 😇”</p>`);
      const opts = Object.keys(set).map(k => {
        const o = set[k];
        const others = used - (d[slot] ? set[d[slot]].cost : 0);
        const tooMuch = others + o.cost > DAYS && d[slot] !== k;
        return { id: k, ic: o.ic, t: o.t, d: slot === "measure" ? measureLine(k, t) : o.d, cost: o.cost, sel: d[slot] === k, off: tooMuch ? "Not enough lab days" : "" };
      });
      sec.appendChild(decision(opts, k => { const firstPick = !d[slot]; d[slot] = k; save(); render(); if (firstPick) scrollToEl(document.querySelectorAll(".slot")[Math.min(r + 1, 1)] || $("nextBtn")); }, "three"));
      box.appendChild(sec);
    }
    if (!(d.measure && d.sample)) return;
    box.insertAdjacentHTML("beforeend", `<p class="fine-line">🔍 Remember your outside factor from the research: <b>${t.fic} ${t.factor}</b>. It could matter too.</p>`);
    box.appendChild(nextBtn("🔒 Lock in my study →", () => { st.measure = d.measure; st.sample = d.sample; st.built = true; save(); render(); window.scrollTo(0, 0); }));
  }
  function designSummary(m, s) {
    const t = T(), M = MEASURES[m || st.measure], S = SAMPLES[s || st.sample];
    return `<div class="design"><div class="chips"><span class="chip">${M.ic} <b>${M.t}</b> <span>${measureLine(m || st.measure, t)}</span></span><span class="chip">${S.ic} <b>${S.t}</b></span></div></div>`;
  }
  function runView(box) {
    box.innerHTML = head("Collect: run your study") + designSummary();
    if (st.runs < 2) {
      box.insertAdjacentHTML("beforeend", coach("Real scientists run a study more than once. If the results are real, they should <b>repeat</b>."));
      box.appendChild(nextBtn("▶ Run it twice", () => { st.runs = 2; save(); render(); scrollToEl(document.querySelector(".charts")); }));
      return;
    }
    box.insertAdjacentHTML("beforeend", chartsHtml());
    const react = { none: "✅ Both runs match.", narrow: "✅ Both runs match.", noisy: "😵 Whoa. A different 6 friends flipped the results!", junk: "🤔 Almost everyone said YES. Slam dunk?" }[flaw()];
    box.insertAdjacentHTML("beforeend", `<p class="react">${react}</p>`);
    const W = { friends: "🍕 <b>6 friends:</b> a new 6 can flip the results.", oneclass: "🏫 <b>One class:</b> steady, but only juniors.", random: "🎲 <b>100 at random:</b> steady, and it looks like the whole school." };
    box.insertAdjacentHTML("beforeend", `<div class="whatif"><p class="src-tag">🤔 Samples compared</p>${Object.keys(W).map(k => `<p class="${k === st.sample ? "mine" : ""}">${W[k]}${k === st.sample ? " ← yours" : ""}</p>`).join("")}</div>`);
    addNext(box);
  }

  // ---------------- Step 5: Analyze ----------------
  function step5() {
    const t = T();
    if (!st.review) { st.review = flaw() === "none" ? "third" : flaw(); save(); }
    const box = card();
    box.innerHTML = head("Analyze: peer review") + `<p>👩🏽‍🔬 <b>Peer review</b> = another scientist checks your work before you share it.</p>`;
    const firstM = st.fix && st.fix.to && st.fix.slot === "measure" ? st.fix.from : st.measure;
    const firstS = st.fix && st.fix.to && st.fix.slot === "sample" ? st.fix.from : st.sample;
    if (!chk("q_review").done) box.insertAdjacentHTML("beforeend", `<div class="evidence">${designSummary(firstM, firstS)}${chartsHtml(firstM, firstS)}</div>`);
    const def = st.review === "third" ? Object.assign({ why: "<b>Outside factor</b>: something else that could cause the result." }, t.third) : REVIEWS[st.review];
    mountCheck(box, "q_review", Object.assign({ who: { av: "👩🏽‍🔬", n: "Dr. Ruiz, sociologist" } }, def), () => { render(); scrollToEl($("nextBtn") || document.querySelector(".fix")); });
    if (!chk("q_review").done) return;
    if (st.review === "third") { box.insertAdjacentHTML("beforeend", coach("Good catch. Your data is solid. Just remember the outside factor when you explain it.")); addNext(box); return; }
    const fix = document.createElement("div"); fix.className = "fix"; box.appendChild(fix);
    if (!st.fix) {
      const slot = st.review === "junk" ? "measure" : "sample";
      const to = st.review === "junk" ? "survey" : "random";
      const set = slot === "measure" ? MEASURES : SAMPLES;
      fix.innerHTML = `<h3>🔧 Dr. Ruiz gives you extra lab time. Fix it?</h3>`;
      fix.appendChild(decision([
        { id: to, ic: set[to].ic, t: "Swap to: " + set[to].t, d: slot === "measure" ? measureLine(to, t) : set[to].d },
        { id: "keep", ic: "✋", t: "Keep it", d: "Go with what you have." }
      ], k => {
        st.fix = k === "keep" ? { slot, from: st[slot], to: null } : { slot, from: st[slot], to: k };
        if (k !== "keep") st[slot] = k;
        save(); render(); scrollToEl(document.querySelector(".fix"));
      }));
      return;
    }
    if (st.fix.to) {
      const after = flaw();
      fix.innerHTML = `<h3>🔧 You redid the study</h3>` + designSummary() + chartsHtml() +
        `<p class="react">${after === "none" ? "✅ Fixed. Both runs match now." : { noisy: "⚠️ Better question, but 6 people still flip.", narrow: "⚠️ Better question, but still only one class.", junk: "⚠️ Better sample, but the question still pushes yes." }[after]}</p>`;
    } else fix.innerHTML = `<p class="react">✋ You kept it. Be ready to defend it.</p>`;
    addNext(box);
  }

  // ---------------- Step 6: Conclude ----------------
  const broken = () => flaw() === "junk" || flaw() === "noisy";
  function supportAnswer() {
    if (broken()) return "cant";
    const t = T(), aHigher = t.va > t.vb;
    return (st.hyp === "more") === aHigher ? "yes" : "no";
  }
  function step6() {
    const box = card(), t = T();
    box.innerHTML = head("Conclude: what did you find?");
    // 1) Was your hypothesis supported?
    const SUP = { yes: "✅ Supported: the data matched my prediction", no: "❌ Not supported: the data went the other way", cant: "🤷 Can't tell: my data is broken (pushy question or flipped runs)" };
    const ans = supportAnswer();
    if (!chk("q_support").done) {
      box.insertAdjacentHTML("beforeend", `<div class="hyp"><p class="src-tag">🔮 Your hypothesis</p><p class="hyp-t">Students ${t.who} will ${t[st.hyp]} ${t.than}.</p></div>` + chartsHtml());
    }
    mountCheck(box, "q_support", { prompt: "Compare your hypothesis to your chart. Was it supported?", options: [SUP[ans]].concat(Object.keys(SUP).filter(k => k !== ans).map(k => SUP[k])),
      who: { av: "👩🏽‍🔬", n: "Dr. Ruiz, sociologist" }, hint: "Which group's bar is higher? Did your runs match? Then reread your prediction.",
      why: ans === "no" ? "A hypothesis can be <b>wrong</b>. That's still good science: now you know more." : ans === "cant" ? "Broken data can't <b>support</b> or <b>reject</b> a hypothesis. Fix the study first." : "<b>Supported</b> means the data matched your prediction. It doesn't mean it's proven forever." },
      () => { render(); scrollToEl(document.querySelector(".live")); });
    if (!chk("q_support").done) return;
    // 2) Kai pushes back: pattern or proof?
    if (!chk("q_cause").done) {
      box.insertAdjacentHTML("beforeend", `<div class="live"><p class="live-tag">🔴 LIVE · @kai.grindset</p>${broken() ? `<p class="live-big">“lol your data is a mess. so was I right or not? 😤”</p>` : `<p class="live-big">“ok lab kid. your chart shows a pattern. but does ${t.ivShort} actually CAUSE it? PROVE IT 😤”</p>`}</div>`);
    }
    mountCheck(box, "q_cause", { prompt: "What's the honest answer to Kai?", who: { av: "📺", n: "CVTV anchor" },
      options: broken() ? ["Can't say. Our data is too broken to show a pattern", "Yes. Most people in our study agreed with the idea", "Yes, because we ran our study two separate times", "No. Broken data proves the opposite is true"]
        : ["Not proven. Two things going together isn't proof", "Yes. Our chart proves that one causes the other", "Yes, because both of our runs matched up", "No. Our whole study turned out to be useless"],
      hint: broken() ? "Did your study even show a clear pattern? Think about what went wrong." : "Look back at your outside factor. Could it explain the pattern instead?",
      why: "<b>Correlation</b> = two things go together. <b>Causation</b> = one makes the other happen. A pattern alone isn't proof." },
      () => { render(); scrollToEl(document.querySelector(".headline")); });
    if (!chk("q_cause").done) return;
    // 3) Headline
    const H = headlineSet();
    const hl = document.createElement("div"); hl.className = "headline"; box.appendChild(hl);
    if (!st.headline) {
      hl.innerHTML = `<h3>🎤 CVTV host: “What's your headline?”</h3>`;
      hl.insertAdjacentHTML("beforeend", `<p class="hl-hint">Pick the one that says only what your data really shows.</p>`);
      hl.appendChild(decision(shuffle(["bold", "subtle", "honest"]).map(k => ({ id: k, t: "“" + H[k] + "”", d: k === "bold" ? "📈 Goes viral" : k === "subtle" ? "📊 Lots of views" : "📉 Fewer views" })), k => { st.headline = k; save(); render(); scrollToEl($("nextBtn")); }, "three"));
      return;
    }
    hl.innerHTML = `<p class="picked">Your headline: <b>“${esc(H[st.headline])}”</b></p>`;
    box.appendChild(nextBtn("See how it ends →", goNext));
  }
  function headlineSet() {
    const t = T(), f = flaw();
    if (f === "junk") { const y = dataFor(st.measure, st.sample, 0).rows[0].txt; return { bold: y + " agree with us. Case closed! 🔥", subtle: "Survey: most students agree with us", honest: "Our question pushed people to say yes. We'll redo it." }; }
    if (f === "noisy") return { bold: t.bold, subtle: t.subtle, honest: "Only 6 people, and our runs flipped. We'll redo it." };
    if (f === "narrow") return { bold: t.bold, subtle: t.subtle, honest: "We found a pattern, but only in one class of juniors." };
    return { bold: t.bold, subtle: t.subtle, honest: t.careful };
  }

  // ---------------- Finish: ending + writing + turn in ----------------
  function endingId() {
    const f = flaw();
    if (st.headline === "bold" || st.headline === "subtle") return broken() ? "played" : "factcheck";
    if (f === "none") return "holds";
    return f === "narrow" ? "small" : "backlab";
  }
  const ENDINGS = {
    holds: { icon: "🏆", t: "The Study Holds Up", line: "Another school repeats your study and finds the same pattern. Your headline matched the evidence." },
    small: { icon: "🔍", t: "Honest, But Small", line: "Your headline was honest, but one class can't speak for the whole school. Next time: a random sample." },
    factcheck: { icon: "🚨", t: "Fact-Checked", line: "Your data was decent, but your headline said one thing CAUSES another. Dr. Ruiz: “A pattern isn't proof.”" },
    played: { icon: "😈", t: "Played by Bad Data", line: "Your headline went viral, but your study was broken. Kai: “see? lab kids make stuff up too.”" },
    backlab: { icon: "🔁", t: "Back to the Lab", line: "You admitted the problem. That's honest science. Next week, you redo it right." }
  };
  function causedBy() {
    const t = T(), out = [];
    const firstM = st.fix && st.fix.to && st.fix.slot === "measure" ? st.fix.from : st.measure;
    const firstS = st.fix && st.fix.to && st.fix.slot === "sample" ? st.fix.from : st.sample;
    out.push({ leading: "👍 Yes/no question → pushed people to say yes", survey: "📝 Short survey → fair answers", record: "📊 Real records → solid numbers" }[firstM]);
    out.push({ friends: "🍕 6 friends → results jumped around", oneclass: "🏫 One class → only juniors", random: "🎲 100 at random → matched the whole school" }[firstS]);
    if (st.fix && st.fix.to) out.push("🔧 Fixed it → " + (st.fix.slot === "measure" ? MEASURES : SAMPLES)[st.fix.to].t);
    else if (st.fix) out.push("✋ Kept the problem → it stayed in your data");
    out.push(supportAnswer() === "cant" ? "🤷 Data too broken to test your hypothesis" : supportAnswer() === "yes" ? "✅ Your hypothesis was supported" : "❌ Your hypothesis wasn't supported (that's OK!)");
    out.push(st.headline === "bold" ? "🔥 Bold headline → claimed proof of cause" : st.headline === "subtle" ? "📊 “New study” headline → quietly claimed cause" : "🧊 Careful headline → matched the evidence");
    return out;
  }
  const kaiVerdict = () => broken() ? "Kai's hot take: can't tell yet. Your data was too broken to check it." : T().kaiLine;

  const PROMPTS = [
    { id: "hyp", short: "A new hypothesis (IV + DV)", label: "1. Make a new prediction about a different hot take. Fill in the blanks.",
      stem: "I predict students who ___ will ___ than students who ___. The IV is ___ and the DV is ___.", min: 70, newWords: 4, junkStarter: "",
      go4: "Go deeper (optional): would finding this pattern prove cause? Why?",
      mustAll: [["iv", "independent"], ["dv", "dependent"]], mustMsg: "In answer 1, name the IV AND the DV." },
    { id: "why", short: "A choice that changed my evidence", label: "2. Which choice made your evidence stronger or weaker? Why?",
      stem: "My evidence got stronger/weaker when I ___ because ___.", min: 60, newWords: 5,
      mustAll: [["sample", "random", "friend", "class", "junior", "question", "leading", "yes/no", "survey", "record", "diary", "grades", "gpa", "headline", "cause", "repeat", "run", "6 ", "100", "25", "fix", "factor", "energy", "money", "mood", "rule"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name a choice (sample, question, headline…) AND say why (use “because”)." }
  ];
  function step7() {
    const box = card(), t = T();
    const eid = endingId(), E = ENDINGS[eid];
    if (!st.atReport) {
      box.innerHTML = `<div class="ending ${eid}"><div class="e-icon">${E.icon}</div><h2>${E.t}</h2><p>${E.line}</p><p class="kai-verdict">${kaiVerdict()}</p></div>
        <div class="caused"><p class="src-tag">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>`;
      box.appendChild(nextBtn("📝 Write your lab report →", () => { st.atReport = true; save(); render(); window.scrollTo(0, 0); }));
      return;
    }
    box.innerHTML = `<p class="mini-end ${eid}">${E.icon} <b>${E.t}</b> · ${t.ic} ${t.name}</p>
      <div class="report" id="report"><p class="report-tag">📝 Lab report</p><h3 class="wr-h">1–2 sentences each</h3></div>`;
    const rep = $("report");
    PROMPTS.forEach(p => rep.insertAdjacentHTML("beforeend", `<label for="w_${p.id}">${p.label}</label><p class="stem">✏️ ${esc(p.stem)}</p>${p.go4 ? `<p class="go4">⭐ ${p.go4}</p>` : ""}<textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`));
    rep.insertAdjacentHTML("beforeend", `<button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      <p class="turned" id="turnedBadge" ${st.turnedIn ? "" : "hidden"}>✓ Turned in</p>
      <p class="replay" id="replay" ${st.turnedIn ? "" : "hidden"}>🔁 Want to test a different hot take? Press “Start over” below.</p>`);
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const testT = window.classIsTestT && window.classIsTestT();   // Test T. (teacher) skips the writing rules
    for (const p of (testT ? [] : PROMPTS)) {
      const box = $("w_" + p.id), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const js = "junkStarter" in p ? p.junkStarter : p.stem;
        const junk = window.classJunkStop(box, { starter: js && isEs() ? tr(js) : js, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (isEs() ? "En " + tr(p.short) : "For " + p.short) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemWords = new Set(plain(p.stem + " " + tr(p.stem)).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < p.newWords) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "msg bad"; box.focus(); return; }
      let groups = p.mustAll;
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      const pv = " " + plain(v) + " ";
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(pv)))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      $("sendBtn").textContent = "Turned in ✓"; $("turnedBadge").hidden = false; $("replay").hidden = false;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  function buildAnswers() {
    const t = T(), a = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => chk(id).done && !chk(id).wrong).length;
    a["First-try correct"] = right + " of " + CHECK_IDS.length;
    a["First-try by standard"] = "Soc.1: " + right + " of " + CHECK_IDS.length;
    a["Hot take tested"] = t.name + ": “" + t.take + "”";
    const line = id => (chk(id).wrong ? "after " + chk(id).wrong + " wrong " + (chk(id).wrong === 1 ? "try" : "tries") : "first try");
    a[SHORT.q_question] = t.q[0] + " (" + line("q_question") + ")";
    a["Hypothesis"] = "Students " + t.who + " will " + t[st.hyp] + " " + t.than + ".";
    a[SHORT.q_vars] = "IV = " + t.iv + " · DV = " + t.dv + " (" + line("q_vars") + ")";
    const firstM = st.fix && st.fix.to && st.fix.slot === "measure" ? st.fix.from : st.measure;
    const firstS = st.fix && st.fix.to && st.fix.slot === "sample" ? st.fix.from : st.sample;
    a["Choice · How to measure"] = MEASURES[firstM].t + ": " + measureLine(firstM, t);
    a["Choice · Sample"] = SAMPLES[firstS].t + " (" + SAMPLES[firstS].d + ")";
    a[SHORT.q_review] = (st.review === "third" ? t.third.options[0] : REVIEWS[st.review].options[0]) + " (" + line("q_review") + ")";
    a["Choice · Peer-review fix"] = !st.fix ? "No fix needed" : st.fix.to ? "Swapped to: " + (st.fix.slot === "measure" ? MEASURES : SAMPLES)[st.fix.to].t : "Kept the problem";
    a[SHORT.q_support] = { yes: "Supported", no: "Not supported", cant: "Can't tell (broken data)" }[supportAnswer()] + " (" + line("q_support") + ")";
    a[SHORT.q_cause] = (broken() ? "Can't say: data too broken to show a pattern" : "Not proven: going together isn't proof") + " (" + line("q_cause") + ")";
    a["Choice · Headline"] = headlineSet()[st.headline] + ({ bold: " (bold claim)", subtle: " (quiet cause claim)", honest: " (careful claim)" }[st.headline]);
    a["Ending"] = ENDINGS[endingId()].t;
    a["Caused by"] = causedBy().join(" | ");
    a["Data problem left at the end"] = { none: "None", noisy: "Tiny sample (6 friends)", narrow: "One class only", junk: "Leading question" }[flaw()];
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }

  // ---------------- Render ----------------
  function card() { app.innerHTML = `<section class="card step" id="stepCard"></section>`; return $("stepCard"); }
  const STEPS = [title, step1, step2, step3, step4, step5, step6, step7];
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    if (st.step >= 2 && !st.topic) st.step = 1;   // safety: never past step 1 without a topic
    hud(); locked = false;
    (STEPS[st.step] || title)();
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    wire = { pick: null, iv: null, dv: null, order: null };
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) { $("welcome").textContent = "Welcome back, " + st.name + " — you're on " + (st.step > TOTAL ? "the last screen" : "step " + st.step + " of " + TOTAL) + "."; $("welcome").hidden = false; }
  render();
  window.__pil = { state: () => JSON.parse(JSON.stringify(st)) };

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current check.
  try {
    const TLABEL = ["Title", "Ask", "Research", "Predict", "Collect", "Analyze", "Conclude", "Ending", "Lab report + turn in"];
    const tDone = id => { const c = chk(id); if (c.done) return false; c.done = true; justSolved = id; save(); render(); return true; };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TLABEL.length,
      index: () => st.step >= 7 ? (st.atReport ? 8 : 7) : Math.max(0, st.step),
      label: i => TLABEL[i],
      go: i => {
        if (!st.name) st.name = "Test T.";
        // safe defaults (first choice) for anything the jump skips past
        if (i >= 2 && !st.topic) st.topic = TOPIC_ORDER[0];
        if (i >= 5 && !st.built) { st.measure = st.draft.measure || "leading"; st.sample = st.draft.sample || "friends"; st.built = true; }
        if (i >= 5 && st.runs < 2) st.runs = 2;
        if (i >= 6 && !st.hyp) st.hyp = "more";
        if (i >= 6 && !st.review) st.review = flaw() === "none" ? "third" : flaw();
        if (i >= 7 && !st.headline) st.headline = "bold";
        wire = { pick: null, iv: null, dv: null, order: null };
        st.step = Math.min(i, 7); st.atReport = i === 8; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const n = st.step, click = sel => { const b = document.querySelector(sel); if (b) b.click(); };
        if (n === 1) { if (!st.topic) click(".topics .topic"); else tDone("q_question"); }
        else if (n === 3) { if (!st.hyp) { st.hyp = "more"; save(); render(); } else tDone("q_vars"); }
        else if (n === 4) {
          if (!st.built) { st.measure = st.draft.measure || "leading"; st.sample = st.draft.sample || "friends"; st.built = true; save(); render(); }
          else if (st.runs < 2) { st.runs = 2; save(); render(); }
        }
        else if (n === 5) { if (!tDone("q_review") && st.review !== "third" && !st.fix) click(".fix .dcard"); }
        else if (n === 6) { if (!tDone("q_support") && !tDone("q_cause") && !st.headline) click(".headline .dcard"); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
