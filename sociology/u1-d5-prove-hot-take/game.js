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

  // t = card title, d = one short line. full = the long wording Fynn sees in the turn-in.
  const MEASURES = {
    leading: { ic: "👍", t: "Yes/no question", d: "“You focus better with sleep, right?”", cost: 0, full: "Yes/no: “You focus better when you sleep more, right?”" },
    likert: { ic: "🔢", t: "1–5 survey", d: "“Rate your first-period focus, 1–5.”", cost: 1, full: "Survey: “Rate your first-period focus from 1 to 5.”" },
    observe: { ic: "👀", t: "Teachers watch", d: "Count minutes on task in class.", cost: 3, full: "Teachers count minutes on task in first period" }
  };
  const SAMPLES = {
    kai: { ic: "📱", t: "Kai's followers", d: "1,000 answers. Free!", cost: 0, full: "Kai's offer: his 1,000 followers' answers" },
    friends: { ic: "🍕", t: "6 friends", d: "Your lunch table. Easy.", cost: 1, full: "6 friends at your lunch table" },
    random: { ic: "🎲", t: "120 at random", d: "Every grade. Lots of permission slips.", cost: 4, full: "120 students picked at random from every grade" }
  };
  const OUTSIDES = {
    jobs: { ic: "🌙", t: "Ask about jobs", d: "“Shift ending after 10 p.m.?”", cost: 1, full: "Also ask: “Do you work a shift that ends after 10 p.m.?”" },
    skip: { ic: "⏩", t: "Skip it", d: "Keep it short.", cost: 0, full: "No. Keep the study short." }
  };

  // Which problem shows first in the data (one fix allowed).
  function flawOf(m, s) { if (s === "kai") return "flipped"; if (m === "leading") return "junk"; if (s === "friends") return "noisy"; return "none"; }
  const flaw = () => flawOf(st.measure, st.sample);

  // The data the design produces (all made up for the game).
  function dataFor(m, s, run) {
    if (m === "leading") {
      const yes = { random: [96, 95], friends: [100, 83], kai: [9, 11] }[s][run];
      return { kind: "yes", unit: "Said YES", rows: [{ l: "👍 YES", v: yes, max: 100, txt: yes + "%" }] };
    }
    const T = {
      likert: { random: [[2.5, 4.0], [2.6, 3.9]], friends: [[4.5, 2.0], [2.0, 4.5]], kai: [[4.6, 2.1], [4.5, 2.2]] },
      observe: { random: [[31, 42], [30, 43]], friends: [[44, 25], [24, 45]], kai: [[0, 0], [0, 0]] }
    };
    const v = T[m][s][run], max = m === "likert" ? 5 : 50;
    return { kind: "bars", unit: m === "likert" ? "Focus, 1–5" : "Minutes on task, of 50",
      rows: [{ l: "😴 Under 7 h", v: v[0], max, txt: m === "likert" ? v[0].toFixed(1) : String(v[0]) },
             { l: "🛌 7+ h", v: v[1], max, txt: m === "likert" ? v[1].toFixed(1) : String(v[1]) }] };
  }
  function chartHtml(run) {
    const d = dataFor(st.measure, st.sample, run);
    return `<div class="chart"><p class="chart-t">${run === 0 ? "Run 1" : "Run 2"}</p><p class="chart-u">${d.unit}</p>` +
      d.rows.map(r => `<div class="brow"><span class="bl">${r.l}</span><span class="bt"><span style="width:${Math.max(2, Math.round(r.v / r.max * 100))}%"></span></span><b>${r.txt}</b></div>`).join("") + `</div>`;
  }
  const chartsHtml = () => `<div class="charts">${chartHtml(0)}${chartHtml(1)}</div>`;
  function jobsHtml() {
    const lik = st.measure === "likert";
    return `<div class="jobs"><p class="chart-t">🌙 Jobs check</p>
      <table><thead><tr><th></th><th>😴 Sleep</th><th>🎯 Focus</th></tr></thead><tbody>
      <tr><td>Late shift</td><td>5.9 h</td><td>${lik ? "2.3 of 5" : "28 of 50 min"}</td></tr>
      <tr><td>No late shift</td><td>7.6 h</td><td>${lik ? "3.7 of 5" : "41 of 50 min"}</td></tr></tbody></table></div>`;
  }

  // ---------------- Evidence checks (first option is right; screen always shuffles) ----------------
  const CHECKS = {
    q_question: { short: "Pick the focused research question", who: { av: "📺", n: "Channel 9 producer" },
      prompt: "Which question do we air Friday?",
      options: ["Is sleep linked to first-period focus at our school?", "Is sleep actually good for people, or a myth?", "Why is Kai so locked in on no sleep?", "Does sleep even matter at all for teens?"],
      hint: "Use the rule card: a group AND two things to measure.",
      why: "<b>Research question</b> = step 1 of the <b>scientific method</b>." },
    q_kai: { short: "Why Kai got the opposite result", who: { av: "📺", n: "Channel 9 anchor" },
      prompt: "Why did Kai get the opposite result?",
      options: ["He asked fans, with a question pushing “yes”", "Too many people mixed up his numbers", "His followers sleep more than most teens", "He ran his study on a weekend"],
      hint: "Read the fine print: WHO did he ask, and HOW?",
      why: "<b>Objectivity:</b> test a claim without rigging the answer." },
    q_hawthorne: { short: "Hawthorne: pattern is not proof of cause", who: { av: "🎤", n: "Channel 9 reporter" },
      prompt: "What does Hawthorne mean for YOUR chart?",
      options: ["Changing together doesn't prove one caused it", "Brighter lights always make people work harder", "1920s factory studies don't apply to teens", "If numbers go up, the hypothesis is proven"],
      hint: "Output rose even when the lights did NOT change. Was light the cause?",
      why: "<b>Correlation</b> = things go together. <b>Causation</b> = one makes the other happen." }
  };
  const REVIEWS = {
    flipped: { prompt: "“Your data sides with Kai. Look at WHO answered. Why?”",
      options: ["They already agreed with Kai", "1,000 people is too few to count", "Followers can't rate their own focus", "It ran on the wrong school day"],
      hint: "Who are Kai's followers? What did they already believe?",
      why: "<b>Biased sample:</b> people who don't match the whole group. Big isn't fair." },
    junk: { prompt: "“Almost everyone said yes. Look at your question. Why?”",
      options: ["The question pushed people to say yes", "Too many students took the survey", "Well-rested students always tell the truth", "Yes/no questions are never allowed"],
      hint: "Read your question out loud. Does it push one answer?",
      why: "<b>Leading question:</b> pushes people toward one answer." },
    noisy: { prompt: "“Run 1 and Run 2 flipped. Why?”",
      options: ["With 6 people, one person swings it", "Friends are too honest for surveys", "The scale only goes up to 5", "Sleep changes too fast to measure"],
      hint: "How many people? What if one has a bad week?",
      why: "<b>Sample size:</b> too few people, and one can swing it." },
    third: { prompt: "“Late shifts: less sleep AND less focus. So what?”",
      options: ["Jobs may cause both, so sleep isn't proven", "Jobs prove sleep doesn't matter at all", "The whole study is ruined, so trash it", "Students with jobs lied on the survey"],
      hint: "Look at the shift table. Could one thing push both down?",
      why: "<b>Third variable:</b> an outside factor that could cause both." },
    replicate: { prompt: "“Both runs match. Why does that matter?”",
      options: ["The pattern held up when repeated", "It proves sleep causes focus for everyone", "The sample was too big to trust", "It means the question was leading"],
      hint: "Compare Run 1 and Run 2. What does a match mean?",
      why: "<b>Replication:</b> repeat the study. Same result = stronger evidence." }
  };
  const REVIEW_SHORT = "Diagnose your own data";
  const VARS_SHORT = "Wire the IV and DV";
  const VARS_ANSWER = "IV = Hours of sleep · DV = First-period focus rating";
  const TILES = ["Hours of sleep", "First-period focus rating", "Grade level", "Kai's follower count"];
  const TAUNTS = ["💬 Kai: “lol the lab is lost 😂”", "💬 Kai: “see? science is just vibes 😤”", "💬 Kai: “take ur time, i'm going viral 🔥”"];
  const CHECK_IDS = ["q_question", "q_vars", "q_review", "q_kai", "q_hawthorne"];

  // Headlines and extras
  function headlineSet() {
    const f = flaw();
    if (f === "flipped") return { bold: "Our study agrees: less sleep = more focus! 😴🔥", honest: "Our sample was Kai's fans. We can't trust it yet." };
    if (f === "junk") return { bold: "Almost everyone agrees: sleep = focus! Case closed. 🔥", honest: "Our question pushed people to say yes. Redo it." };
    if (f === "noisy") return { bold: "SLEEP CAUSES FOCUS. Kai is DONE. 🔥", honest: "Only 6 people, and our runs flipped. We'll redo it." };
    return { bold: "SLEEP CAUSES FOCUS. Kai is DONE. 🔥", honest: "More sleep went with better focus. A pattern, not proof." };
  }
  const EXTRAS = {
    methods: { t: "📄 Post your methods", d: "Anyone can check and repeat it.", full: "📄 Post your full methods so anyone can check and repeat it" },
    hype: { t: "🎬 Hype video", d: "Win the comments. No receipts.", full: "🎬 Make a hype video edit to win the comment war" }
  };

  // ---------------- Endings ----------------
  function endingId() {
    const f = flaw();
    if (st.headline === "bold") return (f === "flipped" || f === "junk") ? "played" : "factcheck";
    if (f !== "none") return "backlab";
    return st.extra === "methods" ? "holds" : "noreceipts";
  }
  const ENDINGS = {
    holds: { icon: "🏆", t: "The Study Holds Up", lines: ["Another school repeated your posted methods. Same pattern.", "Kai's post gets a fact-check label."], adj: -20 },
    noreceipts: { icon: "📋", t: "Solid Study, No Receipts", lines: ["Channel 9 airs it, but no one can check your methods.", "Kai: “trust me bro.” The comments stay split."], adj: 0 },
    factcheck: { icon: "🚨", t: "Fact-Checked", lines: ["Your headline went viral. Then Dr. Ruiz said: a pattern isn't proof of cause.", "Kai: “see? lab kids make stuff up too.”"], adj: 10 },
    played: { icon: "😈", t: "Played by the Hot Take", lines: ["Your headline matched Kai, but your data was broken.", "Kai: “even the lab kids agree with me.” 2M views."], adj: 15 },
    backlab: { icon: "🔁", t: "Back to the Lab", lines: ["You admitted the problem. That's honest science.", "Kai wins tonight. Next week, you redo it right."], adj: 5 }
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
    out.push(st.research === "read" ? "📚 Read research → knew what to check" : "⏩ Skipped research → no outside check");
    const fixed = st.fix && st.fix.to;
    const m0 = fixed && st.fix.slot === "measure" ? st.fix.from : st.measure, s0 = fixed && st.fix.slot === "sample" ? st.fix.from : st.sample;
    const ML = { leading: "👍 Leading question → pushed “yes”", likert: "🔢 1–5 scale → fair comparison", observe: "👀 Teachers watched → real behavior" };
    const SL = { kai: "📱 Kai's fans → biased sample", friends: "🍕 6 friends → results jumped", random: "🎲 120 at random → steady result" };
    out.push(ML[m0]); out.push(SL[s0]);
    if (fixed) out.push({ likert: "🔧 Fixed it → 1–5 scale", observe: "🔧 Fixed it → teachers watched", random: "🔧 Fixed it → 120 at random", friends: "🔧 Fixed it → 6 friends (still tiny)" }[st.fix.to]);
    else if (st.fix) out.push("✋ Kept the flaw → it aired");
    if (st.outside === "jobs") out.push("🌙 Asked about jobs → found third variable");
    if (st.extra === "methods") out.push("📄 Posted methods → others could repeat");
    if (st.extra === "hype") out.push("🎬 Hype video → views, no receipts");
    out.push(st.headline === "bold" ? "🔥 Bold headline → claimed too much" : "🧊 Careful headline → matched the evidence");
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
  function head(title) { return `<h2>${title}</h2>`; }
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
    box.appendChild(wrap);
    // Solved: just the stamp + the one-line concept (the question and choices go away).
    if (c.done) { wrap.innerHTML = stamp(id, "✔ Confirmed") + reveal(def.why); wrap.classList.add("solved"); if (justSolved === id) justSolved = null; return; }
    wrap.innerHTML = `<div class="speaker"><span class="sav">${who.av}</span><span class="sname"><b>${who.n}</b><small>🔎 Evidence check</small></span></div><div class="bubble"><h3>${def.prompt}</h3></div>`;
    const area = document.createElement("div"); area.className = "choices";
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
        <h1>Prove It Lab</h1>
        <ul class="facts"><li>🧪 Build a study</li><li>📺 Beat Kai on air</li><li>🏁 5 endings · 25 min</li></ul>
        <p class="goal">🎯 <b>Goal:</b> test a hot take with the scientific method.</p>
        <label for="nameBox">Your name</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="Jordan M." value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Open the lab →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        ${kaiPost(KAI_POST, "2.4M views")}
        <div class="vs">VS</div>
        <div class="labcard"><span class="flask">🧪</span><b>You</b></div>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; save(); render(); window.scrollTo(0, 0);
    };
  }
  const KAI_POST = "sleep is for the weak 😤 4 hrs = LOCKED IN 🔥";
  function kaiPost(body, stats) {
    return `<div class="post"><div class="ph"><span class="av">😤</span><b>@kai.grindset</b><span class="verified">✔</span></div><p class="pb">${body}</p><p class="ps">${stats}</p></div>`;
  }

  // ---------------- Step 1: Ask ----------------
  function step1() {
    const box = card();
    box.innerHTML = head("Pick your research question") + kaiPost(KAI_POST, "") +
      `<div class="rule">📌 <b>Rule card:</b> a group + 2 things you can measure.</div>`;
    mountCheck(box, "q_question", CHECKS.q_question, () => { render(); scrollToEl($("nextBtn")); });
    if (chk("q_question").done) addNext(box);
  }

  // ---------------- Step 2: Check the research ----------------
  function step2() {
    const box = card();
    box.innerHTML = head("Read the research first?");
    if (!st.research) {
      box.appendChild(decision([
        { id: "read", t: "📚 Read the research", d: "Learn what's already known.", cost: 2 },
        { id: "skip", t: "⏩ Skip it", d: "Save hours for your study.", cost: 0 }
      ], id => { st.research = id; if (id === "read") st.hours -= 2; save(); render(); scrollToEl($("nextBtn")); }));
      return;
    }
    if (st.research === "read") {
      box.insertAdjacentHTML("beforeend", `<div class="result">
        <div class="source"><p class="src-tag">📄 Real source · CDC</p>
        <p class="stat"><span class="faces" aria-hidden="true">😴😴😴🙂</span> <b>72.7%</b></p>
        <p>of U.S. high schoolers slept under 8 hours (2015)</p>
        <p class="cite">Wheaton et al., CDC Morbidity and Mortality Weekly Report 67, no. 3 (Jan. 26, 2018).</p></div>
        <p>🗂️ <b>Other studies:</b> jobs and phones hurt sleep AND focus.</p>
        <p class="unlock">🔓 Unlocked: outside factor</p></div>`);
    } else {
      box.insertAdjacentHTML("beforeend", `<div class="result"><p class="unlock">⏱ +2 hours saved</p>
        <p class="lockline">🔒 Locked: outside factor</p></div>`);
    }
    box.insertAdjacentHTML("beforeend", reveal("<b>Existing research</b> = what others already found."));
    addNext(box);
  }

  // A row of choice cards (decisions with costs).
  function decision(opts, onPick) {
    const row = document.createElement("div"); row.className = "decide";
    opts.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "dcard"; b.dataset.id = o.id;
      const short = o.cost > st.hours;
      b.disabled = !!short || !!o.off;
      const mm = o.ic ? [0, o.ic, o.t] : /^(\p{Extended_Pictographic}\uFE0F?)\s+(.+)$/u.exec(o.t);
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
    const c = chk("q_vars");
    box.innerHTML = head("Wire the machine") +
      `<div class="hyp"><p class="src-tag">🔮 Hypothesis = testable prediction</p><p class="hyp-t">Students who sleep 7+ hours will rate their first-period focus higher.</p></div>` +
      (c.done ? "" : `<p>👆 Tap a card, then a box.</p>`);
    const m = document.createElement("div"); m.className = "machine" + (c.done ? " on" : ""); box.appendChild(m);
    if (c.done) {
      m.innerHTML = `<div class="socket full"><span class="sk">🔌 IV (independent)</span><b>Hours of sleep</b></div><div class="socket full"><span class="sk">📟 DV (dependent)</span><b>First-period focus rating</b></div>`;
      m.insertAdjacentHTML("afterbegin", stamp("q_vars", "⚡ Power on")); if (justSolved === "q_vars") justSolved = null;
      box.insertAdjacentHTML("beforeend", reveal("The <b>DV</b> (focus) depends on the <b>IV</b> (sleep)."));
      addNext(box); return;
    }
    if (!wire.order) wire.order = shuffle(TILES.map((t, i) => i));
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    const taunt = document.createElement("p"); taunt.className = "taunt"; taunt.hidden = true;
    function draw() {
      m.innerHTML = "";
      [["iv", "🔌 IV (independent)", "Might cause it"], ["dv", "📟 DV (dependent)", "What you measure"]].forEach(([k, lab, sub]) => {
        const s = document.createElement("button"); s.type = "button"; s.className = "socket" + (wire[k] != null ? " full" : "") + (wire.pick != null && wire[k] == null ? " ready" : "");
        s.dataset.socket = k;
        s.innerHTML = `<span class="sk">${lab}</span><span class="sub">${sub}</span>` + (wire[k] != null ? `<b>${TILES[wire[k]]}</b>` : `<span class="empty" aria-label="empty">⬚</span>`);
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
      const hint = "IV = might cause it. DV = what you measure.";
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
    box.innerHTML = head("Build your study") +
      `<p>Better data costs more hours.</p>
       <p class="budget"><span>Hours left:</span> <b id="leftN">${left}</b> <span class="tokens" aria-hidden="true">${Array.from({ length: st.hours }, (x, i) => `<i class="${i < left ? "" : "spent"}">⏱</i>`).join("")}</span></p>`;
    const rows = [
      ["measure", "📏 Measure focus", MEASURES],
      ["sample", "👥 Sample: who's in it?", SAMPLES],
      ["outside", "🔍 Outside factor?", OUTSIDES]
    ];
    rows.forEach(([slot, label, set]) => {
      const sec = document.createElement("div"); sec.className = "slot";
      sec.innerHTML = `<h3>${label}</h3>`;
      if (slot === "outside" && d.outside === "locked") {
        sec.insertAdjacentHTML("beforeend", `<p class="lockline">🔒 Locked: you skipped the research.</p>`);
        box.appendChild(sec); return;
      }
      if (slot === "sample") sec.insertAdjacentHTML("beforeend", `<p class="dm">📩 <b>Kai:</b> “use my followers lol 😇”</p>`);
      const row = document.createElement("div"); row.className = "decide three";
      Object.keys(set).forEach(k => {
        const o = set[k];
        const others = cost - (d[slot] ? set[d[slot]].cost : 0);
        const tooMuch = others + o.cost > st.hours;
        let off = "";
        if (slot === "measure" && k === "observe" && d.sample === "kai") off = "Can't watch followers in class";
        if (slot === "sample" && k === "kai" && d.measure === "observe") off = "Can't watch followers in class";
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
  }

  // ---------------- Step 5: Run it (twice) ----------------
  function step5() {
    const box = card();
    box.innerHTML = head("Run the study") + designSummary();
    if (st.runs === 0) {
      box.appendChild(nextBtn("▶ Run the study", () => { st.runs = 1; save(); render(); scrollToEl(document.querySelector(".chart")); }));
      return;
    }
    if (st.runs === 1) {
      box.insertAdjacentHTML("beforeend", `<div class="charts">${chartHtml(0)}</div><p>🔁 Real results repeat. Run it again.</p>`);
      box.appendChild(nextBtn("🔁 Run it again", () => { st.runs = 2; save(); render(); scrollToEl(document.querySelectorAll(".chart")[1]); }));
      return;
    }
    box.insertAdjacentHTML("beforeend", chartsHtml());
    if (flaw() === "none" && st.outside === "jobs") box.insertAdjacentHTML("beforeend", jobsHtml());
    const react = { none: "✅ Both runs match.", noisy: "😵 Whoa. The two runs flipped!", flipped: "🤔 Both runs agree with Kai. Strange…", junk: "🤔 Almost everyone said YES. Slam dunk?" }[flaw()];
    box.insertAdjacentHTML("beforeend", `<p class="react">${react}</p>`);
    addNext(box);
  }
  // Your design as 3 chips (icon + card). The measure chip shows the exact question (a check needs it).
  function designSummary() {
    const M = MEASURES[st.measure], S = SAMPLES[st.sample];
    const o = st.outside === "jobs" ? `${OUTSIDES.jobs.ic} <b>${OUTSIDES.jobs.t}</b>` : `🔒 <b>No outside factor</b>`;
    return `<div class="design"><div class="chips"><span class="chip">${M.ic} <b>${M.t}</b>${st.measure === "leading" ? ` <span>${M.d}</span>` : ""}</span><span class="chip">${S.ic} <b>${S.t}</b></span><span class="chip">${o}</span></div></div>`;
  }

  // ---------------- Step 6: Peer review + one fix ----------------
  function step6() {
    if (!st.review) { const f = flaw(); st.review = f === "none" ? (st.outside === "jobs" ? "third" : "replicate") : f; save(); }
    const box = card();
    const def = REVIEWS[st.review];
    box.innerHTML = head("Peer review");
    // Evidence on screen for this check
    const ev = document.createElement("div"); ev.className = "evidence";
    const firstDesign = st.fix && st.fix.to ? Object.assign({}, st, { [st.fix.slot]: st.fix.from }) : st;
    const saved = { m: st.measure, s: st.sample };
    st.measure = firstDesign.measure; st.sample = firstDesign.sample;
    let evh = st.review === "third" ? jobsHtml() : designSummary() + chartsHtml();
    st.measure = saved.m; st.sample = saved.s;
    ev.innerHTML = evh; box.appendChild(ev);
    const id = "q_review";
    mountCheck(box, id, { prompt: def.prompt, options: def.options, hint: def.hint, why: def.why, who: { av: "👩🏽‍🔬", n: "Dr. Ruiz, sociologist" } }, () => { render(); scrollToEl($("nextBtn") || document.querySelector(".fix")); });
    if (!chk(id).done) return;

    const f0 = st.review;
    if (f0 === "third" || f0 === "replicate") {
      if (f0 === "replicate" && st.research !== "read") box.insertAdjacentHTML("beforeend", `<p class="dm">👩🏽‍🔬 Dr. Ruiz: “You never checked outside factors like jobs.”</p>`);
      addNext(box); return;
    }
    // A fix is possible: go back a step.
    const fix = document.createElement("div"); fix.className = "fix"; box.appendChild(fix);
    if (!st.fix) {
      const slot = f0 === "junk" ? "measure" : "sample";
      const opts = f0 === "junk" ? ["likert", "observe"] : f0 === "flipped" ? ["random", "friends"] : ["random"];
      const set = slot === "measure" ? MEASURES : SAMPLES;
      fix.innerHTML = `<h3>🔧 Go back and fix it?</h3>`;
      const list = opts.map(k => ({ id: k, ic: set[k].ic, t: "Swap to: " + set[k].t, d: set[k].d, cost: set[k].cost }));
      list.push({ id: "keep", ic: "✋", t: "Keep it", d: "Go live as is.", cost: 0 });
      fix.appendChild(decision(list, k => {
        if (k === "keep") st.fix = { slot, from: st[slot], to: null };
        else { st.fix = { slot, from: st[slot], to: k }; st.hours -= set[k].cost; st[slot] = k; }
        save(); render(); scrollToEl(document.querySelector(".fix"));
      }));
      return;
    }
    if (st.fix.to) {
      const after = flaw();
      fix.innerHTML = `<h3>🔧 You redid the study</h3>` + designSummary() + chartsHtml() +
        (after === "none" && st.outside === "jobs" ? jobsHtml() : "") +
        `<p class="react">${after === "none" ? "✅ Fixed. Both runs match now." : { noisy: "⚠️ Better, but 6 people still flip.", junk: "⚠️ Better sample, but the question still pushes yes.", flipped: "⚠️ Still Kai's fans." }[after]}</p>`;
    } else {
      fix.innerHTML = `<p class="react">✋ You kept it. Defend it on air.</p>`;
    }
    addNext(box);
  }

  // ---------------- Step 7: Kai goes live ----------------
  function step7() {
    if (!st.kaiDrop) { st.kaiDrop = true; st.kai = clamp(st.kai + 8, 5, 95); save(); hud(); }
    const box = card();
    box.innerHTML = `<div class="live"><p class="live-tag">🔴 LIVE · @kai.grindset</p><p class="live-big">“91% say less sleep = more locked in 😤”</p>
       <div class="fine"><p class="src-tag">Kai's fine print</p><p><b>Who:</b> 1,000 of my fans</p><p><b>Asked:</b> “4 hrs = locked in, right?”</p></div></div>`;
    mountCheck(box, "q_kai", CHECKS.q_kai, () => { render(); scrollToEl($("nextBtn")); });
    if (!chk("q_kai").done) return;
    if (st.sample === "kai") box.insertAdjacentHTML("beforeend", `<p class="dm">😬 Same followers as your study!</p>`);
    addNext(box);
  }

  // ---------------- Step 8: Live on Channel 9 ----------------
  function step8() {
    const box = card();
    box.innerHTML = head("Live on Channel 9") + (chk("q_hawthorne").done ? "" :
      `<div class="source"><p class="src-tag">📜 Real · Hawthorne Works factory, 1924–27</p>
       <div class="hw"><p>💡⬆️ Lights brighter → <b>workers made more</b></p><p>💡⬇️ Lights dimmer → <b>workers made more</b></p><p>💡⏸️ Lights never changed → <b>workers made more</b></p></div></div>`);
    mountCheck(box, "q_hawthorne", CHECKS.q_hawthorne, () => { render(); scrollToEl(document.querySelector(".extra") || document.querySelector(".headline")); });
    if (!chk("q_hawthorne").done) return;

    // Last hours: receipts or hype (both cost 2 hours)
    const ex = document.createElement("div"); ex.className = "extra"; box.appendChild(ex);
    if (st.extra == null) {
      if (st.hours < 2) { st.extra = "none"; save(); }
      else {
        ex.innerHTML = `<h3>Spend 2 hours on one:</h3>`;
        ex.appendChild(decision([
          { id: "methods", t: EXTRAS.methods.t, d: EXTRAS.methods.d, cost: 2 },
          { id: "hype", t: EXTRAS.hype.t, d: EXTRAS.hype.d, cost: 2 }
        ], k => { st.extra = k; st.hours -= 2; st.kai = clamp(st.kai + (k === "hype" ? -15 : -5), 5, 95); save(); render(); scrollToEl(document.querySelector(".headline")); }));
        return;
      }
    }
    ex.innerHTML = st.extra === "methods" ? `<p class="react">📄 Methods posted.</p>`
      : st.extra === "hype" ? `<p class="react">🎬 Hype video everywhere.</p>`
      : `<p class="react">⏱ No hours left for extras.</p>`;

    // Headline
    const hl = document.createElement("div"); hl.className = "headline"; box.appendChild(hl);
    const H = headlineSet();
    if (!st.headline) {
      hl.innerHTML = `<h3>🎤 Host: “Your headline?”</h3>`;
      const order = shuffle(["bold", "honest"]);
      hl.appendChild(decision(order.map(k => ({ id: k, ic: k === "bold" ? "🔥" : "🧊", t: "“" + H[k] + "”", d: k === "bold" ? "Big claim. Huge views." : "Careful claim. Fewer views.", cost: 0 })), k => {
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
    { id: "hyp", short: "My hypothesis (IV + DV)", label: "1. Your hypothesis on a new topic (jobs, phones…). Name the IV + DV.",
      stem: "Among ___, students who ___ will report ___. The IV is ___ and the DV is ___.", min: 70, newWords: 4,
      // The shared junk check would strip this whole fill-in starter and then call a good, short answer
      // "a list of words". So it checks the full sentence; blanks and starter-only answers are still caught
      // below (the ___ check and the "own words" count).
      junkStarter: "",
      go4: "Go deeper: pattern or proof of cause? Why?",
      mustAll: [["iv", "independent"], ["dv", "dependent"]], mustMsg: "In answer 1, name the IV AND the DV." },
    { id: "why", short: "A choice that changed my evidence", label: "2. Which choice made your evidence stronger or weaker? Why?",
      stem: "My evidence got stronger/weaker when I ___ because ___.", min: 60, newWords: 5,
      mustAll: [["sample", "random", "friend", "follower", "fans", "kai", "question", "leading", "scale", "survey", "observ", "teacher", "job", "shift", "research", "headline", "cause", "method", "video", "repeat", "run", "6 ", "120", "1,000", "1000"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name a choice (sample, question, headline…) AND say why (use “because”)." }
  ];
  function step9() {
    const box = card();
    const eid = endingId(), E = ENDINGS[eid];
    const kai = finalKai();
    if (!st.atReport) {
      box.innerHTML = `<div class="ending ${eid}"><div class="e-icon">${E.icon}</div><h2>${E.t}</h2>${E.lines.concat(holdsGap() ? ["One gap: you never checked outside factors like jobs."] : []).map(l => `<p>${l}</p>`).join("")}
        <div class="war big"><span class="wl">You</span><div class="wbar"><span style="width:${100 - kai}%"></span></div><span class="wl">${kaiFace(kai)} Kai</span></div>
        <p class="war-n"><span>Comment war:</span> <b>${warWord(kai)}</b></p></div>
        <div class="caused"><p class="src-tag">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>`;
      box.appendChild(nextBtn("📝 Write your lab report →", () => { st.atReport = true; save(); render(); window.scrollTo(0, 0); }));
      return;
    }
    box.innerHTML = `<p class="mini-end ${eid}">${E.icon} <b>${E.t}</b></p>
      <div class="report" id="report"><p class="report-tag">📝 Lab report</p><h3 class="wr-h">1–2 sentences each</h3></div>`;
    const rep = $("report");
    PROMPTS.forEach(p => {
      rep.insertAdjacentHTML("beforeend", `<label for="w_${p.id}">${p.label}</label><p class="stem">✏️ ${esc(p.stem)}</p>${p.go4 ? `<p class="go4">⭐ ${p.go4}</p>` : ""}<textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`);
    });
    rep.insertAdjacentHTML("beforeend", `<button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      <p class="turned" id="turnedBadge" ${st.turnedIn ? "" : "hidden"}>✓ Turned in</p>
      <p class="replay" id="replay" ${st.turnedIn ? "" : "hidden"}>🔁 Another ending? Press “Start over” below.</p>`);
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
      $("sendBtn").textContent = "Turned in ✓"; $("turnedBadge").hidden = false; $("replay").hidden = false;
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
    a["Choice · How to measure focus"] = MEASURES[firstM].full;
    a["Choice · Sample"] = SAMPLES[firstS].full;
    a["Choice · Outside factor"] = st.outside === "jobs" ? OUTSIDES.jobs.full : st.outside === "skip" ? OUTSIDES.skip.full : "Locked (skipped research)";
    a["Choice · Peer-review fix"] = !st.fix ? "No fix needed" : st.fix.to ? "Swapped to: " + (st.fix.slot === "measure" ? MEASURES : SAMPLES)[st.fix.to].full : "Kept the design as is";
    a["Choice · Last 2 hours"] = st.extra === "methods" ? EXTRAS.methods.full : st.extra === "hype" ? EXTRAS.hype.full : "No hours left";
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
