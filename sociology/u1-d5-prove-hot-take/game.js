// =====================================================================
//  PROVE IT LAB  (Sociology Unit 1 Day 5 · SS.9-12.Soc.1)
//  A viral hot take says sleep is for the weak. The student runs the school's research lab:
//  10 lab hours to build a study, then the design choices GENERATE the data.
//  Kai (the rival) runs a rigged study. Peer review, then Channel 9, then one of 5 endings.
//  5 evidence checks are woven into play. Strict order. Saves on this device.
//  Turn-in goes through shared/turnin.js (same id, same payload shape as shared/unit-game.js).
//  Kai, the lab, Cedar Valley High, Channel 9, Dr. Ruiz and all study numbers are made up.
//  Real: the CDC sleep number (MMWR, Jan 2018) and the Hawthorne Works lighting tests (1924–1927).
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u1-d5-prove-hot-take-v2";
  const ASSIGNMENT_ID = "soc-u1-d5-prove-hot-take";
  const TITLE = "Sociology · Unit 1 · Day 5 · How Can You Prove a Hot Take?";
  const STANDARD = "SS.9-12.Soc.1";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, START_HOURS = 10, TOTAL = 9;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (window.SiteLang ? window.SiteLang.t(s) : s);

  // ---------------- State ----------------
  const fresh = () => ({ v: 2, name: "", step: 0, hours: START_HOURS, kai: 70, research: null, draft: {}, measure: null, sample: null, outside: null,
    runs: 0, review: null, fix: null, fixRuns: 0, kaiDrop: false, extra: null, headline: null, checks: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 2) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });

  // ---------------- Content ----------------
  const METHOD = ["Ask", "Check", "Predict", "Collect", "Analyze", "Conclude"];
  const STEP_METHOD = [0, 0, 1, 2, 3, 3, 4, 4, 5, 5];
  const STEP_NAME = ["", "Ask a question", "Check the research", "Wire the Data Machine", "Build your study", "Run the study", "Peer review", "Kai goes live", "Live on Channel 9", "The verdict"];

  const MEASURES = {
    leading: { ic: "👍", t: "Yes/no: “You focus better when you sleep more, right?”", d: "Fast. Everyone gets it.", cost: 0 },
    likert: { ic: "🔢", t: "Survey: “Rate your first-period focus from 1 to 5.”", d: "Same question for everyone. Number answers.", cost: 1 },
    observe: { ic: "👀", t: "Teachers count minutes on task in first period", d: "Watches what students do, not what they say.", cost: 3 }
  };
  const SAMPLES = {
    kai: { ic: "📱", t: "Kai's offer: his 1,000 followers' answers", d: "1,000 answers. Free!", cost: 0 },
    friends: { ic: "🍕", t: "6 friends at your lunch table", d: "Easy. They'll actually answer.", cost: 1 },
    random: { ic: "🎲", t: "120 students picked at random from every grade", d: "Slow to set up. Lots of permission slips.", cost: 4 }
  };
  const OUTSIDES = {
    jobs: { ic: "🌙", t: "Also ask: “Do you work a shift that ends after 10 p.m.?”", d: "One more question on the survey.", cost: 1 },
    skip: { ic: "⏩", t: "No. Keep the study short.", d: "Saves an hour.", cost: 0 }
  };
  const WHO = { random: "Who: <b>120 students picked at random</b>", friends: "Who: <b>6 friends from your lunch table</b>", kai: "Who: <b>1,000 of Kai's followers</b>" };

  // Which problem shows first in the data (one fix allowed).
  function flawOf(m, s) { if (s === "kai") return "flipped"; if (m === "leading") return "junk"; if (s === "friends") return "noisy"; return "none"; }
  const flaw = () => flawOf(st.measure, st.sample);

  // The data the design produces (all made up for the game).
  function dataFor(m, s, run) {
    if (m === "leading") {
      const yes = { random: [96, 95], friends: [100, 83], kai: [9, 11] }[s][run];
      return { kind: "yes", unit: "Said YES to the question", rows: [{ l: "👍 Said YES", v: yes, max: 100, txt: yes + "%" }] };
    }
    const T = {
      likert: { random: [[2.5, 4.0], [2.6, 3.9]], friends: [[4.5, 2.0], [2.0, 4.5]], kai: [[4.6, 2.1], [4.5, 2.2]] },
      observe: { random: [[31, 42], [30, 43]], friends: [[44, 25], [24, 45]], kai: [[0, 0], [0, 0]] }
    };
    const v = T[m][s][run], max = m === "likert" ? 5 : 50;
    return { kind: "bars", unit: m === "likert" ? "Average focus (1 = low, 5 = high)" : "Average minutes on task (out of 50)",
      rows: [{ l: "😴 Under 7 hours of sleep", v: v[0], max, txt: m === "likert" ? v[0].toFixed(1) : String(v[0]) },
             { l: "🛌 7 or more hours of sleep", v: v[1], max, txt: m === "likert" ? v[1].toFixed(1) : String(v[1]) }] };
  }
  function chartHtml(run) {
    const d = dataFor(st.measure, st.sample, run);
    return `<div class="chart"><p class="chart-t">${run === 0 ? "Run 1" : "Run 2"}</p><p class="chart-u">${d.unit}</p>` +
      d.rows.map(r => `<div class="brow"><span class="bl">${r.l}</span><span class="bt"><span style="width:${Math.max(2, Math.round(r.v / r.max * 100))}%"></span></span><b>${r.txt}</b></div>`).join("") +
      `<p class="chart-who">${WHO[st.sample]}</p></div>`;
  }
  const chartsHtml = () => `<div class="charts">${chartHtml(0)}${chartHtml(1)}</div>`;
  function jobsHtml() {
    const lik = st.measure === "likert";
    return `<div class="jobs"><p class="chart-t">Outside factor check: late-night jobs</p>
      <table><thead><tr><th>Group</th><th>Average sleep</th><th>Average focus</th></tr></thead><tbody>
      <tr><td>Works a shift that ends after 10 p.m.</td><td>5.9 h</td><td>${lik ? "2.3 of 5" : "28 of 50 min"}</td></tr>
      <tr><td>No late shift</td><td>7.6 h</td><td>${lik ? "3.7 of 5" : "41 of 50 min"}</td></tr></tbody></table></div>`;
  }

  // ---------------- Evidence checks (first option is right; screen always shuffles) ----------------
  const CHECKS = {
    q_question: { short: "Pick the focused research question", who: { av: "📺", n: "Channel 9 producer" },
      prompt: "Which question do you send to Channel 9?",
      options: ["Are hours of sleep linked to first-period focus at our school?", "Is sleep actually good for people, or is that just a myth?", "Why is Kai always so locked in when he barely sleeps?", "Does sleep even matter at all for teens like us?"],
      hint: "Use the rule card: which one names a group AND two things you can measure?",
      why: "<b>Research question:</b> a focused question that names a group and two things you can measure. It's step 1 of the <b>scientific method</b>." },
    q_kai: { short: "Why Kai got the opposite result", who: { av: "📺", n: "Channel 9 news anchor" },
      prompt: "Channel 9 asks you: why did Kai get the opposite result? Use his fine print.",
      options: ["He asked fans who agreed, with a question that pushed “yes”", "He asked too many people, so the numbers got mixed up", "His followers sleep more than most high school students", "He ran his study on a weekend instead of a school day"],
      hint: "Read Kai's fine print: WHO did he ask, and HOW did he ask it?",
      why: "<b>Objectivity</b> means testing a claim without pushing for the answer you want. Kai picked people and a question that would make him look right." },
    q_hawthorne: { short: "Hawthorne: pattern is not proof of cause", who: { av: "🎤", n: "Channel 9 reporter" },
      prompt: "The reporter asks: “So what does Hawthorne teach us about YOUR sleep chart?”",
      options: ["Two things changing together doesn't prove one caused it", "Brighter lights make people work harder every single time", "Factory studies from the 1920s don't apply to teens today", "If the numbers go up, the hypothesis is always proven right"],
      hint: "At Hawthorne, output went up even when the lights did NOT change. So was light the cause?",
      why: "<b>Correlation</b> means two things go together. <b>Causation</b> means one thing makes the other happen. A pattern alone isn't proof of cause." }
  };
  const REVIEWS = {
    flipped: { prompt: "Dr. Ruiz: “Your chart says less sleep means MORE focus. Look at who answered. Why did it come out on Kai's side?”",
      options: ["They already agreed with Kai before the study", "1,000 people is too small to show a real pattern", "Followers can't rate their own focus with numbers", "The study ran on the wrong day of the school week"],
      hint: "Who are Kai's followers? What did they believe before you asked?",
      why: "<b>Biased sample:</b> the people you study aren't like the whole group. Big doesn't mean fair." },
    junk: { prompt: "Dr. Ruiz: “Almost everyone said yes. Look at your question. Why did almost everyone give the same answer?”",
      options: ["The question told people which answer to give", "Too many students answered the same survey", "Students who sleep more always tell the truth", "Yes/no questions can't ever be used in a study"],
      hint: "Read your question out loud. Does it push people toward one answer?",
      why: "<b>Leading question:</b> a question that pushes people toward one answer. The data shows the question, not the truth." },
    noisy: { prompt: "Dr. Ruiz: “Run 1 and run 2 flipped. Why did your results jump around?”",
      options: ["With only 6 people, one person can swing it", "Friends are too honest to answer surveys well", "The focus scale only goes up to five points", "Sleep changes too fast for anyone to measure"],
      hint: "How many people were in your study? What happens if one of them has a bad week?",
      why: "<b>Sample size:</b> with too few people, one person can swing the whole result." },
    third: { prompt: "Dr. Ruiz: “Students with late shifts sleep less AND focus less. What does that mean for your study?”",
      options: ["The job may affect both, so sleep alone isn't proven", "Jobs prove sleep has nothing to do with focus at all", "The whole study is ruined and should be thrown out", "Students with jobs must be lying on their surveys"],
      hint: "Look at the job table. Could one thing push sleep down AND focus down?",
      why: "<b>Third variable:</b> an outside factor that could cause both things. That's one reason a pattern isn't proof." },
    replicate: { prompt: "Dr. Ruiz: “Both runs gave almost the same result. Why does that matter?”",
      options: ["The pattern held up when the study was repeated", "It proves sleep causes better focus for everyone", "It means the sample was too big to be trusted", "It shows the survey question was a leading one"],
      hint: "Compare Run 1 and Run 2. What does it mean when a repeat matches?",
      why: "<b>Replication:</b> repeating a study to see if the result holds. When it does, the evidence gets stronger." }
  };
  const REVIEW_SHORT = "Diagnose your own data";
  const VARS_SHORT = "Wire the IV and DV";
  const VARS_ANSWER = "IV = Hours of sleep · DV = First-period focus rating";
  const TILES = ["Hours of sleep", "First-period focus rating", "Grade level", "Kai's follower count"];
  const TAUNTS = ["💬 Kai: “lol the lab is lost 😂”", "💬 Kai: “see? science is just vibes 😤”", "💬 Kai: “take ur time, i'll be busy going viral 🔥”"];
  const CHECK_IDS = ["q_question", "q_vars", "q_review", "q_kai", "q_hawthorne"];

  // Headlines and extras
  function headlineSet() {
    const f = flaw();
    if (f === "flipped") return { bold: "Our study agrees: less sleep = more focus. Kai was right. 😴🔥", honest: "Our sample was mostly Kai's fans, so we can't trust this result yet." };
    if (f === "junk") return { bold: "96% agree: sleep makes you focus! Case closed. 🔥", honest: "Our question pushed people to say yes. We have to redo it." };
    return { bold: "SLEEP CAUSES FOCUS. Kai is DONE. 🔥", honest: "In our study, more sleep was linked to better focus. It's a pattern, not proof of cause." };
  }
  const EXTRAS = {
    methods: { t: "📄 Post your full methods so anyone can check and repeat it", d: "Receipts. Not flashy." },
    hype: { t: "🎬 Make a hype video edit to win the comment war", d: "Views. No receipts." }
  };

  // ---------------- Endings ----------------
  function endingId() {
    const f = flaw();
    if (st.headline === "bold") return (f === "flipped" || f === "junk") ? "played" : "factcheck";
    if (f !== "none") return "backlab";
    return st.extra === "methods" ? "holds" : "noreceipts";
  }
  const ENDINGS = {
    holds: { icon: "🏆", t: "The Study Holds Up", lines: ["A lab at another school used your posted methods. They got the same pattern.", "Kai's post gets a fact-check label. The comments flip."], adj: -20 },
    noreceipts: { icon: "📋", t: "Solid Study, No Receipts", lines: ["Channel 9 airs your study. But nobody can check how you did it.", "Kai: “trust me bro.” You: “trust us bro.” The comments stay split."], adj: 0 },
    factcheck: { icon: "🚨", t: "Fact-Checked", lines: ["Your headline went viral. Then Dr. Ruiz pointed out that a pattern isn't proof of cause.", "Kai: “see? lab kids make stuff up too.”"], adj: 10 },
    played: { icon: "😈", t: "Played by the Hot Take", lines: ["Your headline matched Kai's hot take, but your data was broken.", "Kai clips your headline: “even the lab kids agree with me.” 2 million views."], adj: 15 },
    backlab: { icon: "🔁", t: "Back to the Lab", lines: ["You admitted your study had a problem. That's honest science.", "Kai owns the comments tonight. Next week you run it again, the right way."], adj: 5 }
  };
  // Final comment-war position always matches the ending's story.
  const BANDS = { holds: [5, 40], noreceipts: [45, 55], factcheck: [56, 90], played: [76, 95], backlab: [56, 90] };
  const holdsGap = () => endingId() === "holds" && st.research !== "read";
  function finalKai() { const id = endingId(), b = holdsGap() ? [40, 44] : BANDS[id]; return clamp(clamp(st.kai + ENDINGS[id].adj, 5, 95), b[0], b[1]); }
  // Words, not percents (no score-looking numbers on a student page).
  const warWord = k => k >= 76 ? "Kai's way ahead" : k >= 56 ? "Kai's winning" : k >= 45 ? "Neck and neck" : k >= 25 ? "You're winning" : "You're way ahead";
  const kaiFace = k => k >= 76 ? "😎" : k >= 56 ? "😏" : k >= 45 ? "😤" : "😰";
  function causedBy() {
    const out = [];
    out.push(st.research === "read" ? "Read the research → knew which outside factors to check" : "Skipped the research → couldn't check outside factors");
    const fixed = st.fix && st.fix.to;
    const m0 = fixed && st.fix.slot === "measure" ? st.fix.from : st.measure, s0 = fixed && st.fix.slot === "sample" ? st.fix.from : st.sample;
    const ML = { leading: "Asked a leading yes/no question → answers were pushed toward yes", likert: "Used a 1–5 focus scale → answers could be compared", observe: "Teachers counted minutes on task → measured what students did" };
    const SL = { kai: "Used Kai's followers → biased sample, result flipped toward Kai", friends: "Studied 6 friends → tiny sample, results jumped around", random: "Picked 120 students at random → fair sample, steady result" };
    out.push(ML[m0]); out.push(SL[s0]);
    if (fixed) out.push({ likert: "Fixed it after peer review → switched to a fair 1–5 focus scale", observe: "Fixed it after peer review → switched to teachers counting minutes on task", random: "Fixed it after peer review → switched to 120 students picked at random", friends: "Fixed it after peer review → switched to 6 friends (still a tiny sample)" }[st.fix.to]);
    else if (st.fix) out.push("Kept the design after peer review → the problem went on air");
    if (st.outside === "jobs") out.push("Asked about late shifts → spotted a third variable");
    if (st.extra === "methods") out.push("Posted your methods → others could check and repeat it");
    if (st.extra === "hype") out.push("Made a hype video → more views, no receipts");
    out.push(st.headline === "bold" ? "Used a big, bold headline → claimed more than the data showed" : "Used a careful headline → the claim matched the evidence");
    return out;
  }

  // ---------------- HUD ----------------
  let lastKai = null;
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const m = STEP_METHOD[st.step];
    $("track").innerHTML = METHOD.map((n, i) => `<li class="${i < m ? "done" : i === m ? "now" : ""}"><span>${i + 1}</span>${n}</li>`).join("");
    $("stepPill").textContent = "Step " + st.step + " of " + TOTAL;
    $("hoursPill").textContent = "⏱ " + st.hours + (st.hours === 1 ? " lab hour" : " lab hours");
    const kai = st.step === 9 && st.headline ? finalKai() : clamp(st.kai, 5, 95);
    $("warYou").style.width = (100 - kai) + "%";
    $("warWord").textContent = warWord(kai);
    $("kaiFace").textContent = kaiFace(kai);
    if (lastKai != null && lastKai !== kai) { const w = $("hud").querySelector(".war"); w.classList.remove("bump"); void w.offsetWidth; w.classList.add("bump"); }
    lastKai = kai;
  }

  // ---------------- Shared pieces ----------------
  const app = $("app");
  function head(kicker, title) { return `<p class="kicker">${kicker}</p><h2>${title}</h2>`; }
  function reveal(html) { return `<p class="reveal">💡 ${html}</p>`; }
  function nextBtn(label, onclick) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn"; b.textContent = label; b.onclick = onclick; return b;
  }
  function goNext() { st.step++; save(); render(); window.scrollTo(0, 0); }
  function addNext(box) { box.appendChild(nextBtn("Next: " + STEP_NAME[st.step + 1] + " →", goNext)); }
  function scrollToEl(el) { if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 40); }
  let locked = false, justSolved = null;
  const stamp = (id, txt) => `<span class="stamp${justSolved === id ? " slam" : ""}">${txt}</span>`;

  // A multiple-choice evidence check. def.options[0] is right.
  function mountCheck(box, id, def, onRight) {
    const c = chk(id);
    const wrap = document.createElement("div"); wrap.className = "check"; wrap.dataset.check = id;
    const who = def.who || { av: "🔎", n: "Evidence check" };
    wrap.innerHTML = `<div class="speaker"><span class="sav">${who.av}</span><span class="sname"><b>${who.n}</b><small>🔎 Evidence check</small></span></div><div class="bubble"><h3>${def.prompt}</h3></div>`;
    box.appendChild(wrap);
    if (c.done) { wrap.insertAdjacentHTML("beforeend", `<p class="answered">✓ ${esc(def.options[0])}</p>${reveal(def.why)}`); wrap.classList.add("solved"); wrap.insertAdjacentHTML("afterbegin", stamp(id, "✔ Confirmed")); if (justSolved === id) justSolved = null; return; }
    const area = document.createElement("div"); area.className = "choices";
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    const taunt = document.createElement("p"); taunt.className = "taunt"; taunt.hidden = true;
    function draw() {
      area.replaceChildren();
      shuffle(def.options.map((t, n) => ({ t, n }))).forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            c.done = true; justSolved = id; if (window.classFirstTry) window.classFirstTry.right(id);
            save(); onRight(); return;
          }
          c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong();
          st.kai = clamp(st.kai + 3, 5, 95); save(); hud();
          taunt.textContent = TAUNTS[(c.wrong - 1) % TAUNTS.length]; taunt.hidden = false;
          wrap.classList.remove("spark"); void wrap.offsetWidth; wrap.classList.add("spark");
          locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = LOCK;
          const tick = () => {
            fb.className = "msg bad";
            if (left <= 0) { locked = false; fb.textContent = "Not quite. " + def.hint + " Try again."; draw(); return; }
            fb.textContent = "Not quite. " + def.hint + " The choices will mix up. Try again in " + left + "…";
            left--; setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
    wrap.appendChild(area); wrap.appendChild(fb); wrap.appendChild(taunt);
  }

  // ---------------- Title screen ----------------
  function title() {
    app.innerHTML = `<section class="card titlecard">
      <div class="title-left">
        <p class="kicker">Sociology · Unit 1 · Day 5</p>
        <h1>Prove It Lab</h1>
        <p class="hook">A hot take about sleep has 2.4 million views. You run the school research lab. Prove it or bust it before Kai goes live Friday.</p>
        <ul class="facts"><li>🧪 Build a real study with 10 lab hours</li><li>📊 Your choices make your data</li><li>📺 Face Kai on Channel 9 · 5 endings</li></ul>
        <p class="meta">About 25 minutes · 5 evidence checks · 2 short answers</p>
        <p class="goal"><b>Today's goal:</b> Use the scientific method to test a claim, and tell a pattern from a cause.</p>
        <label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Open the lab →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        ${kaiPost("sleep is for the weak. i run on 4 hrs and i'm LOCKED IN every class. 8 hrs = lazy 😤🔥", "2.4M views · 61K comments")}
        <div class="vs">VS</div>
        <div class="labcard"><span class="flask">🧪</span><b>Cedar Valley High Research Lab</b><span>You. 10 lab hours. One shot.</span></div>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; save(); render(); window.scrollTo(0, 0);
    };
  }
  function kaiPost(body, stats) {
    return `<div class="post"><div class="ph"><span class="av">😤</span><b>@kai.grindset</b><span class="verified">✔</span></div><p class="pb">${body}</p><p class="ps">${stats}</p></div>`;
  }

  // ---------------- Step 1: Ask ----------------
  function step1() {
    const box = card();
    box.innerHTML = head("🧪 Method step 1 of 6 · Ask", "Send Channel 9 your question") +
      kaiPost("sleep is for the weak. i run on 4 hrs and i'm LOCKED IN every class. 8 hrs = lazy 😤🔥", "2.4M views · 61K comments") +
      `<p>Channel 9 News will air ONE study on Friday. Kai is making his own. The producer wants your research question first.</p>
       <div class="rule">📌 <b>Rule card:</b> A good research question names a group and two things you can measure.</div>`;
    mountCheck(box, "q_question", CHECKS.q_question, () => { render(); scrollToEl($("nextBtn")); });
    if (chk("q_question").done) addNext(box);
  }

  // ---------------- Step 2: Check the research ----------------
  function step2() {
    const box = card();
    box.innerHTML = head("🧪 Method step 2 of 6 · Check", "Read first, or save your hours?") +
      `<p>Real researchers check what others already found. But reading takes 2 of your 10 lab hours.</p>`;
    if (!st.research) {
      box.appendChild(decision([
        { id: "read", t: "📚 Read the research", d: "Find out what's already known.", cost: 2 },
        { id: "skip", t: "⏩ Skip it", d: "Save hours for a bigger study.", cost: 0 }
      ], id => { st.research = id; if (id === "read") st.hours -= 2; save(); render(); scrollToEl($("nextBtn")); }));
      return;
    }
    if (st.research === "read") {
      box.insertAdjacentHTML("beforeend", `<div class="result">
        <div class="source"><p class="src-tag">📄 Real source · CDC report, January 2018</p>
        <p class="quote">“The prevalence of short sleep duration among high school students in the national YRBS was 72.7%.”</p>
        <p>In plain words: in 2015, about 3 out of 4 U.S. high school students slept less than 8 hours on school nights.</p>
        <p class="cite">Wheaton et al., CDC Morbidity and Mortality Weekly Report 67, no. 3 (Jan. 26, 2018).</p></div>
        <p>🗂️ <b>Clue from other studies:</b> late-night jobs, phones in bed, and long bus rides can mess with sleep AND focus.</p>
        <p class="unlock">🔓 Unlocked: you can check an outside factor in your study.</p></div>`);
    } else {
      box.insertAdjacentHTML("beforeend", `<div class="result"><p>You saved 2 hours. But you don't know what else could mess with sleep and focus.</p>
        <p class="lockline">🔒 The “outside factor” row in your study stays locked.</p></div>`);
    }
    box.insertAdjacentHTML("beforeend", reveal("<b>Existing research</b> is what other researchers already found. It's step 2, and it shows you what else to watch for."));
    addNext(box);
  }

  // A row of choice cards (decisions with costs).
  function decision(opts, onPick) {
    const row = document.createElement("div"); row.className = "decide";
    opts.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "dcard";
      const short = o.cost > st.hours;
      b.disabled = !!short || !!o.off;
      const mm = /^(\p{Extended_Pictographic}\uFE0F?)\s+(.+)$/u.exec(o.t);
      b.innerHTML = (mm ? `<span class="ic">${mm[1]}</span><span class="ct">${mm[2]}</span>` : `<span class="ct">${o.t}</span>`) + `<span class="cd">${o.d}</span><span class="cost">${o.cost ? "−" + o.cost + " h" : "0 h"}</span>` + (short ? `<span class="why-off">Not enough hours</span>` : o.off ? `<span class="why-off">${o.off}</span>` : "");
      b.onclick = () => onPick(o.id);
      row.appendChild(b);
    });
    return row;
  }

  // ---------------- Step 3: Predict + wire the machine ----------------
  let wire = { pick: null, iv: null, dv: null, order: null };
  function step3() {
    const box = card();
    box.innerHTML = head("🧪 Method step 3 of 6 · Predict", "Wire the Data Machine") +
      `<div class="hyp"><p class="src-tag">Your hypothesis (a testable prediction)</p><p class="hyp-t">Among students at our school, students who sleep 7 or more hours will report better first-period focus.</p></div>
       <p>Kai predicts the opposite. Good. A real hypothesis can be proven wrong.</p>
       <p>The machine changes one thing and measures another. Tap a card, then tap the box where it goes.</p>`;
    const c = chk("q_vars");
    const m = document.createElement("div"); m.className = "machine" + (c.done ? " on" : ""); box.appendChild(m);
    if (c.done) {
      m.innerHTML = `<div class="socket full"><span class="sk">🔌 INPUT · Independent variable (IV)</span><b>Hours of sleep</b></div><div class="socket full"><span class="sk">📟 OUTPUT · Dependent variable (DV)</span><b>First-period focus rating</b></div>`;
      m.insertAdjacentHTML("afterbegin", stamp("q_vars", "⚡ Power on")); if (justSolved === "q_vars") justSolved = null;
      box.insertAdjacentHTML("beforeend", `<p class="answered">✓ Machine on.</p>` + reveal("<b>Independent variable (IV):</b> what may cause a change (sleep). <b>Dependent variable (DV):</b> what you measure (focus). The DV depends on the IV."));
      addNext(box); return;
    }
    if (!wire.order) wire.order = shuffle(TILES.map((t, i) => i));
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    const taunt = document.createElement("p"); taunt.className = "taunt"; taunt.hidden = true;
    function draw() {
      m.innerHTML = "";
      [["iv", "🔌 INPUT · Independent variable (IV)", "The thing that may cause a change"], ["dv", "📟 OUTPUT · Dependent variable (DV)", "The result you measure"]].forEach(([k, lab, sub]) => {
        const s = document.createElement("button"); s.type = "button"; s.className = "socket" + (wire[k] != null ? " full" : "") + (wire.pick != null && wire[k] == null ? " ready" : "");
        s.dataset.socket = k;
        s.innerHTML = `<span class="sk">${lab}</span><span class="sub">${sub}</span>` + (wire[k] != null ? `<b>${TILES[wire[k]]}</b>` : `<span class="empty">Empty</span>`);
        s.disabled = locked;
        s.onclick = () => {
          if (locked) return;
          if (wire.pick != null) { wire[k] = wire.pick; wire.pick = null; }
          else if (wire[k] != null) wire[k] = null;
          draw();
        };
        m.appendChild(s);
      });
      const tiles = document.createElement("div"); tiles.className = "tiles";
      wire.order.forEach(i => {
        if (wire.iv === i || wire.dv === i) return;
        const t = document.createElement("button"); t.type = "button"; t.className = "tile" + (wire.pick === i ? " picked" : ""); t.textContent = TILES[i]; t.dataset.tile = i;
        t.disabled = locked;
        t.onclick = () => { wire.pick = wire.pick === i ? null : i; draw(); };
        tiles.appendChild(t);
      });
      m.appendChild(tiles);
      const p = document.createElement("button"); p.type = "button"; p.className = "go"; p.id = "powerBtn"; p.textContent = "⚡ Power on";
      p.disabled = locked || wire.iv == null || wire.dv == null;
      p.onclick = power; m.appendChild(p);
    }
    function power() {
      if (locked) return;
      if (wire.iv === 0 && wire.dv === 1) {
        c.done = true; justSolved = "q_vars"; if (window.classFirstTry) window.classFirstTry.right("q_vars"); save(); wire = { pick: null, iv: null, dv: null, order: null }; render(); scrollToEl($("nextBtn")); return;
      }
      c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong();
      st.kai = clamp(st.kai + 3, 5, 95); save(); hud();
      m.classList.add("spark"); setTimeout(() => m.classList.remove("spark"), 600);
      taunt.textContent = TAUNTS[(c.wrong - 1) % TAUNTS.length]; taunt.hidden = false;
      locked = true; draw();
      let left = LOCK;
      const hint = "The IV may cause the change. The DV is what you measure. Check your hypothesis card.";
      const tick = () => {
        fb.className = "msg bad";
        if (left <= 0) { locked = false; wire = { pick: null, iv: null, dv: null, order: shuffle(TILES.map((t, i) => i)) }; fb.textContent = "Not quite. " + hint + " Try again."; draw(); return; }
        fb.textContent = "Not quite. " + hint + " The choices will mix up. Try again in " + left + "…";
        left--; setTimeout(tick, 1000);
      };
      tick();
    }
    draw();
    box.appendChild(fb); box.appendChild(taunt);
  }

  // ---------------- Step 4: Build the study (budget) ----------------
  function step4() {
    const box = card();
    const d = st.draft;
    if (st.research !== "read") d.outside = "locked";
    const cost = (d.measure ? MEASURES[d.measure].cost : 0) + (d.sample ? SAMPLES[d.sample].cost : 0) + (d.outside && OUTSIDES[d.outside] ? OUTSIDES[d.outside].cost : 0);
    const left = st.hours - cost;
    box.innerHTML = head("🧪 Method step 4 of 6 · Collect", "Build your study") +
      `<p>Pick one card in each row. Better data costs more hours. Hours you spend here are gone later.</p>
       <p class="budget"><span>Hours left after this plan:</span> <b id="leftN">${left}</b> <span class="tokens" aria-hidden="true">${Array.from({ length: st.hours }, (x, i) => `<i class="${i < left ? "" : "spent"}">⏱</i>`).join("")}</span></p>`;
    const rows = [
      ["measure", "How will you measure focus?", MEASURES],
      ["sample", "Who is in your study? (your sample)", SAMPLES],
      ["outside", "Check an outside factor?", OUTSIDES]
    ];
    rows.forEach(([slot, label, set]) => {
      const sec = document.createElement("div"); sec.className = "slot";
      sec.innerHTML = `<h3>${label}</h3>`;
      if (slot === "outside" && d.outside === "locked") {
        sec.insertAdjacentHTML("beforeend", `<p class="lockline">🔒 Locked. You skipped the research, so you don't know which outside factors to check.</p>`);
        box.appendChild(sec); return;
      }
      if (slot === "sample") sec.insertAdjacentHTML("beforeend", `<p class="dm">📩 <b>@kai.grindset:</b> “need answers? use my followers lol. i'm generous 😇”</p>`);
      const row = document.createElement("div"); row.className = "decide three";
      Object.keys(set).forEach(k => {
        const o = set[k];
        const others = cost - (d[slot] ? set[d[slot]].cost : 0);
        const tooMuch = others + o.cost > st.hours;
        let off = "";
        if (slot === "measure" && k === "observe" && d.sample === "kai") off = "Can't watch online followers in class";
        if (slot === "sample" && k === "kai" && d.measure === "observe") off = "Can't watch online followers in class";
        const b = document.createElement("button"); b.type = "button"; b.className = "dcard" + (d[slot] === k ? " sel" : "");
        b.setAttribute("aria-pressed", String(d[slot] === k));
        b.disabled = (tooMuch && d[slot] !== k) || !!off;
        b.dataset.slot = slot; b.dataset.val = k;
        b.innerHTML = `<span class="ic">${o.ic}</span><span class="ct">${o.t}</span><span class="cd">${o.d}</span><span class="cost">${o.cost ? "−" + o.cost + " h" : "0 h"}</span>` + (off ? `<span class="why-off">${off}</span>` : (tooMuch && d[slot] !== k) ? `<span class="why-off">Not enough hours</span>` : "");
        b.onclick = () => { d[slot] = k; save(); render(); };
        row.appendChild(b);
      });
      sec.appendChild(row); box.appendChild(sec);
    });
    const ready = d.measure && d.sample && d.outside;
    const b = nextBtn("🔒 Lock in my design →", () => {
      st.measure = d.measure; st.sample = d.sample; st.outside = d.outside === "locked" ? "locked" : d.outside;
      st.hours = left; st.step++; save(); render(); window.scrollTo(0, 0);
    });
    b.disabled = !ready;
    box.appendChild(b);
    if (!ready) box.insertAdjacentHTML("beforeend", `<p class="msg">Pick a card in every row to lock in.</p>`);
  }

  // ---------------- Step 5: Run it (twice) ----------------
  function step5() {
    const box = card();
    box.innerHTML = head("🧪 Method step 4 of 6 · Collect", "Run the study") + designSummary();
    if (st.runs === 0) {
      box.insertAdjacentHTML("beforeend", `<p>Your design is locked. Time to collect the data.</p>`);
      box.appendChild(nextBtn("▶ Run the study", () => { st.runs = 1; save(); render(); scrollToEl(document.querySelector(".chart")); }));
      return;
    }
    if (st.runs === 1) {
      box.insertAdjacentHTML("beforeend", `<div class="charts">${chartHtml(0)}</div><p>Real results should hold up when you run the study again.</p>`);
      box.appendChild(nextBtn("🔁 Run it again", () => { st.runs = 2; save(); render(); scrollToEl(document.querySelectorAll(".chart")[1]); }));
      return;
    }
    box.insertAdjacentHTML("beforeend", chartsHtml());
    if (flaw() === "none" && st.outside === "jobs") box.insertAdjacentHTML("beforeend", jobsHtml());
    const react = { none: "✅ Both runs show the same pattern.", noisy: "😵 Whoa. The two runs flipped!", flipped: "🤔 Both runs agree with Kai. Strange…", junk: "🤔 Almost everyone said YES. Slam dunk… right?" }[flaw()];
    box.insertAdjacentHTML("beforeend", `<p class="react">${react}</p><p>Before anything airs, a real sociologist checks your work.</p>`);
    addNext(box);
  }
  function designSummary() {
    const o = st.outside === "jobs" ? OUTSIDES.jobs.t : st.outside === "skip" ? OUTSIDES.skip.t : "🔒 Locked";
    return `<div class="design"><p class="src-tag">Your design</p><ul><li><b>Measure:</b> <span>${MEASURES[st.measure].t}</span></li><li><b>Sample:</b> <span>${SAMPLES[st.sample].t}</span></li><li><b>Outside factor:</b> <span>${o}</span></li></ul></div>`;
  }

  // ---------------- Step 6: Peer review + one fix ----------------
  function step6() {
    if (!st.review) { const f = flaw(); st.review = f === "none" ? (st.outside === "jobs" ? "third" : "replicate") : f; save(); }
    const box = card();
    const def = REVIEWS[st.review];
    box.innerHTML = head("🧪 Method step 5 of 6 · Analyze", "Peer review with Dr. Ruiz") +
      `<p class="who-line">👩🏽‍🔬 <b>Dr. Ana Ruiz</b> is a sociologist at a local college (made-up character). She checks student studies before they air.</p>`;
    // Evidence on screen for this check
    const ev = document.createElement("div"); ev.className = "evidence";
    const firstDesign = st.fix && st.fix.to ? Object.assign({}, st, { [st.fix.slot]: st.fix.from }) : st;
    const saved = { m: st.measure, s: st.sample };
    st.measure = firstDesign.measure; st.sample = firstDesign.sample;
    let evh = designSummary() + chartsHtml();
    if (st.review === "third") evh += jobsHtml();
    st.measure = saved.m; st.sample = saved.s;
    ev.innerHTML = evh; box.appendChild(ev);
    const id = "q_review";
    mountCheck(box, id, { prompt: def.prompt, options: def.options, hint: def.hint, why: def.why, who: { av: "👩🏽‍🔬", n: "Dr. Ruiz" } }, () => { render(); scrollToEl($("nextBtn") || document.querySelector(".fix")); });
    if (!chk(id).done) return;

    const f0 = st.review;
    if (f0 === "third" || f0 === "replicate") {
      if (f0 === "replicate" && st.research !== "read") box.insertAdjacentHTML("beforeend", `<p class="dm">👩🏽‍🔬 Dr. Ruiz: “One weak spot: you never checked outside factors like jobs. Someone on air may ask.”</p>`);
      addNext(box); return;
    }
    // A fix is possible: go back a step.
    const fix = document.createElement("div"); fix.className = "fix"; box.appendChild(fix);
    if (!st.fix) {
      const slot = f0 === "junk" ? "measure" : "sample";
      const opts = f0 === "junk" ? ["likert", "observe"] : f0 === "flipped" ? ["random", "friends"] : ["random"];
      const set = slot === "measure" ? MEASURES : SAMPLES;
      fix.innerHTML = `<h3>Go back a step?</h3><p>Researchers redo a step when the evidence shows a problem. Swapping a card costs its hours.</p>`;
      const list = opts.map(k => ({ id: k, t: "Swap to: " + set[k].t, d: set[k].d, cost: set[k].cost }));
      list.push({ id: "keep", t: "Keep it and go live as is", d: "Save your hours.", cost: 0 });
      fix.appendChild(decision(list, k => {
        if (k === "keep") st.fix = { slot, from: st[slot], to: null };
        else { st.fix = { slot, from: st[slot], to: k }; st.hours -= set[k].cost; st[slot] = k; }
        save(); render(); scrollToEl(document.querySelector(".fix"));
      }));
      return;
    }
    if (st.fix.to) {
      const after = flaw();
      fix.innerHTML = `<h3>You redid the study</h3>` + designSummary() + chartsHtml() +
        (after === "none" && st.outside === "jobs" ? jobsHtml() : "") +
        `<p class="react">${after === "none" ? "✅ Fixed. Both runs now show the same pattern." : { noisy: "⚠️ Better, but with only 6 people the runs still flip.", junk: "⚠️ Better sample, but the question still pushes people to say yes.", flipped: "⚠️ Still Kai's fans." }[after]}</p>`;
    } else {
      fix.innerHTML = `<p class="react">You kept your design. You'll have to defend it on air.</p>`;
    }
    addNext(box);
  }

  // ---------------- Step 7: Kai goes live ----------------
  function step7() {
    if (!st.kaiDrop) { st.kaiDrop = true; st.kai = clamp(st.kai + 8, 5, 95); save(); hud(); }
    const box = card();
    box.innerHTML = head("😤 Rival move", "Kai goes live") +
      `<div class="live"><p class="live-tag">🔴 LIVE · @kai.grindset</p><p class="live-big">“MY STUDY: 91% say less sleep = more locked in. SCIENCE. 😤”</p>
       <div class="fine"><p class="src-tag">Kai's fine print</p><p><b>Who:</b> 1,000 followers who liked my post</p><p><b>Question:</b> “You're more locked in on 4 hours of sleep, right?”</p></div></div>
       <p>The comments go wild. Kai's side of the comment war just grew.</p>`;
    mountCheck(box, "q_kai", CHECKS.q_kai, () => { render(); scrollToEl($("nextBtn")); });
    if (!chk("q_kai").done) return;
    if (st.sample === "kai") box.insertAdjacentHTML("beforeend", `<p class="dm">😬 Heads up: your study used the same followers.</p>`);
    addNext(box);
  }

  // ---------------- Step 8: Live on Channel 9 ----------------
  function step8() {
    const box = card();
    box.innerHTML = head("🧪 Method step 6 of 6 · Conclude", "Live on Channel 9") +
      `<div class="source"><p class="src-tag">📜 Real history · Hawthorne Works, Cicero, Illinois (1924–1927)</p>
       <p>Researchers made the factory lights brighter. Workers made more. They made the lights dimmer. Workers still made more.</p>
       <p>In a room where the lights never changed, workers made more too.</p></div>`;
    mountCheck(box, "q_hawthorne", CHECKS.q_hawthorne, () => { render(); scrollToEl(document.querySelector(".extra") || document.querySelector(".headline")); });
    if (!chk("q_hawthorne").done) return;

    // Last hours: receipts or hype (both cost 2 hours)
    const ex = document.createElement("div"); ex.className = "extra"; box.appendChild(ex);
    if (st.extra == null) {
      if (st.hours < 2) { st.extra = "none"; save(); }
      else {
        ex.innerHTML = `<h3>You have ${st.hours} lab hours left. Spend 2 of them on:</h3>`;
        ex.appendChild(decision([
          { id: "methods", t: EXTRAS.methods.t, d: EXTRAS.methods.d, cost: 2 },
          { id: "hype", t: EXTRAS.hype.t, d: EXTRAS.hype.d, cost: 2 }
        ], k => { st.extra = k; st.hours -= 2; st.kai = clamp(st.kai + (k === "hype" ? -15 : -5), 5, 95); save(); render(); scrollToEl(document.querySelector(".headline")); }));
        return;
      }
    }
    ex.innerHTML = st.extra === "methods" ? `<p class="react">📄 Your methods are posted. Anyone can check them.</p>`
      : st.extra === "hype" ? `<p class="react">🎬 Your hype edit is everywhere. The comments are swinging your way.</p>`
      : `<p class="react">⏱ No lab hours left for extras.</p>`;

    // Headline
    const hl = document.createElement("div"); hl.className = "headline"; box.appendChild(hl);
    const H = headlineSet();
    if (!st.headline) {
      hl.innerHTML = `<h3>The news host turns to you: “Give us your headline.”</h3>`;
      const order = shuffle(["bold", "honest"]);
      hl.appendChild(decision(order.map(k => ({ id: k, t: "“" + H[k] + "”", d: k === "bold" ? "Huge views. Big claim." : "Fewer views. Careful claim.", cost: 0 })), k => {
        st.headline = k;
        const f = flaw();
        if (k === "bold") st.kai = clamp(st.kai + (f === "flipped" || f === "junk" ? 20 : 10), 5, 95);
        else st.kai = clamp(st.kai + (f === "none" ? -15 : 0), 5, 95);
        save(); render(); scrollToEl($("nextBtn"));
      }));
      return;
    }
    hl.innerHTML = `<p class="picked">Your headline: <b>“${esc(H[st.headline])}”</b></p>`;
    box.appendChild(nextBtn("See how it ends →", goNext));
  }

  // ---------------- Step 9: Verdict + writing + turn in ----------------
  const PROMPTS = [
    { id: "hyp", short: "My hypothesis (IV + DV)", label: "1. Write your own hypothesis about teens. Pick a new topic (jobs, phones, sports, music…). Name the IV and the DV.",
      stem: "Among ___, students who ___ will report ___. The IV is ___ and the DV is ___.", min: 70, newWords: 4,
      // The shared junk check would strip this whole fill-in starter and then call a good, short answer
      // "a list of words". So it checks the full sentence; blanks and starter-only answers are still caught
      // below (the ___ check and the "own words" count).
      junkStarter: "",
      go4: "Go deeper: add why your result could show a pattern but not prove a cause.",
      mustAll: [["iv", "independent"], ["dv", "dependent"]], mustMsg: "In answer 1, name the IV (what may cause a change) AND the DV (what you measure)." },
    { id: "why", short: "A choice that changed my evidence", label: "2. Explain one choice in your study that made your evidence stronger or weaker.",
      stem: "My evidence got stronger/weaker when I ___ because ___.", min: 60, newWords: 5,
      mustAll: [["sample", "random", "friend", "follower", "fans", "kai", "question", "leading", "scale", "survey", "observ", "teacher", "job", "shift", "research", "headline", "cause", "method", "video", "repeat", "run", "6 ", "120", "1,000", "1000"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name the choice (like your sample, question, research, or headline) AND explain why (use \"because\")." }
  ];
  function step9() {
    const box = card();
    const eid = endingId(), E = ENDINGS[eid];
    const kai = finalKai();
    box.innerHTML = `<p class="kicker">The verdict</p><div class="ending ${eid}"><div class="e-icon">${E.icon}</div><h2>${E.t}</h2>${E.lines.concat(holdsGap() ? ["One gap: you never checked outside factors like late-night jobs. A viewer asked, and you had no answer."] : []).map(l => `<p>${l}</p>`).join("")}
      <div class="war big"><span class="wl">You</span><div class="wbar"><span style="width:${100 - kai}%"></span></div><span class="wl">${kaiFace(kai)} Kai</span></div>
      <p class="war-n"><span>Comment war:</span> <b>${warWord(kai)}</b></p></div>
      <div class="caused"><p class="src-tag">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>
      <p class="replay">Want a different ending? Finish and turn in first. Then you can press “Start over” at the bottom.</p>
      <div class="report" id="report"><p class="report-tag">📝 Lab report · Cedar Valley High Research Lab</p><h3 class="wr-h">Last step: write your lab report</h3><p>Answer both in 1–2 full sentences.</p></div>`;
    const rep = $("report");
    PROMPTS.forEach(p => {
      rep.insertAdjacentHTML("beforeend", `<label for="w_${p.id}">${p.label}</label><p class="stem">Sentence starter: ${esc(p.stem)}</p>${p.go4 ? `<p class="go4">⭐ ${p.go4}</p>` : ""}<textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`);
    });
    rep.insertAdjacentHTML("beforeend", `<button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      <p class="turned" id="turnedBadge" ${st.turnedIn ? "" : "hidden"}>✓ Turned in</p>`);
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const p of PROMPTS) {
      const box = $("w_" + p.id), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const js = "junkStarter" in p ? p.junkStarter : p.stem;
        const junk = window.classJunkStop(box, { starter: js && isEs() ? tr(js) : js, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (isEs() ? "En " + tr(p.short) : "For " + p.short) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemText = p.stem + " " + tr(p.stem);
      const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
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
      $("sendBtn").textContent = "Turned in ✓"; $("turnedBadge").hidden = false;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  function buildAnswers() {
    const a = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => chk(id).done && !chk(id).wrong).length;
    a["First-try correct"] = right + " of " + CHECK_IDS.length;
    a["First-try by standard"] = "Soc.1: " + right + " of " + CHECK_IDS.length;
    const line = (id, ans) => ans + (chk(id).wrong ? " (after " + chk(id).wrong + " wrong " + (chk(id).wrong === 1 ? "try" : "tries") + ")" : " (first try)");
    a[CHECKS.q_question.short] = line("q_question", CHECKS.q_question.options[0]);
    a[VARS_SHORT] = line("q_vars", VARS_ANSWER);
    a[REVIEW_SHORT] = line("q_review", REVIEWS[st.review].options[0]);
    a[CHECKS.q_kai.short] = line("q_kai", CHECKS.q_kai.options[0]);
    a[CHECKS.q_hawthorne.short] = line("q_hawthorne", CHECKS.q_hawthorne.options[0]);
    a["Choice · Background research"] = st.research === "read" ? "Read the research (2 hours)" : "Skipped the research";
    const firstM = st.fix && st.fix.to && st.fix.slot === "measure" ? st.fix.from : st.measure;
    const firstS = st.fix && st.fix.to && st.fix.slot === "sample" ? st.fix.from : st.sample;
    a["Choice · How to measure focus"] = MEASURES[firstM].t;
    a["Choice · Sample"] = SAMPLES[firstS].t;
    a["Choice · Outside factor"] = st.outside === "jobs" ? OUTSIDES.jobs.t : st.outside === "skip" ? OUTSIDES.skip.t : "Locked (skipped research)";
    a["Choice · Peer-review fix"] = !st.fix ? "No fix needed" : st.fix.to ? "Swapped to: " + (st.fix.slot === "measure" ? MEASURES : SAMPLES)[st.fix.to].t : "Kept the design as is";
    a["Choice · Last 2 hours"] = st.extra === "methods" ? EXTRAS.methods.t : st.extra === "hype" ? EXTRAS.hype.t : "No hours left";
    a["Choice · Headline"] = headlineSet()[st.headline] + (st.headline === "bold" ? " (bold claim)" : " (careful claim)");
    a["Ending"] = ENDINGS[endingId()].t;
    a["Caused by"] = causedBy().join(" | ");
    a["Data problem left at the end"] = { none: "None", noisy: "Tiny sample", flipped: "Biased sample (Kai's followers)", junk: "Leading question" }[flaw()];
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }

  // ---------------- Render ----------------
  function card() { app.innerHTML = `<section class="card step" id="stepCard"></section>`; return $("stepCard"); }
  const STEPS = [title, step1, step2, step3, step4, step5, step6, step7, step8, step9];
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    hud();
    locked = false;
    (STEPS[st.step] || title)();
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    wire = { pick: null, iv: null, dv: null, order: null };
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) { $("welcome").textContent = "Welcome back, " + st.name + " — you're on step " + st.step + " of " + TOTAL + "."; $("welcome").hidden = false; }
  render();
})();
