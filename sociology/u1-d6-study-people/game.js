// =====================================================================
//  RESEARCH RIVALS  (Sociology · Unit 1 · Day 6 · How Should We Study People?)
//  Rework 2026-11-03 (Fynn: "they won't get this one at all"). Picks up Day 5's story:
//  same coach (Dr. Ruiz), same rival (Kai), same 4 teen topics.
//
//  6 steps:
//   1 Pick   — keep your Day 5 topic (or pick one)
//   2 Try    — run all 5 research tools on YOUR topic; each shows what it found + what it can't tell you
//   3 Match  — match each tool to the question it answers (check)
//   4 Clients— 3 new local questions: pick the right tool (3 checks; wrong tools show what you'd get)
//   5 Ethics — permission + privacy check, then a paid temptation to stretch results
//   6 Finale — Kai asks HOW MANY and WHY about your topic: play 2 tools (mixed methods, check)
//  then the ending + 2 short written answers. 6 checks total. Saves on this device.
//  Turn-in goes through shared/turnin.js (same assignment id and payload shape as before).
//  All people, clients and numbers are made up.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u1-d6-study-people-v4";
  const D5_KEY = "soc-u1-d5-prove-hot-take-v4";
  const ASSIGNMENT_ID = "soc-u1-d6-study-people";
  const TITLE = "Sociology · Unit 1 · Day 6 · How Should We Study People?";
  const STANDARD = "SS.9-12.Soc.1, SS.9-12.Soc.3";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 2, TOTAL = 6;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (window.SiteLang ? window.SiteLang.t(s) : s);

  // ---------------- The 5 tools ----------------
  const TOOLS = ["survey", "interview", "observe", "experiment", "content"];
  const TOOL = {
    survey: { ic: "📋", name: "Survey", what: "Same questions to lots of people", answers: "How many? How common?" },
    interview: { ic: "🎙️", name: "Interview", what: "Long talks with follow-up questions", answers: "Why? In their own words" },
    observe: { ic: "👀", name: "Observation", what: "Watch what people do in a real place", answers: "What do people actually do?" },
    experiment: { ic: "🧪", name: "Experiment", what: "Change one thing, compare two groups", answers: "Does one thing cause another?" },
    content: { ic: "📺", name: "Content analysis", what: "Count what shows up in media", answers: "What does media show?" }
  };

  // ---------------- The 4 topics (same as Day 5) ----------------
  // r = what each tool finds on this topic (made up); no = what it can't tell you.
  const TOPICS = {
    sleep: { ic: "📱", name: "Phones & sleep", take: "Scrolling till 2 a.m. doesn't mess up your sleep 😤",
      r: {
        survey: { found: "You surveyed 300 students. <b>41%</b> are on their phone after midnight most nights.", no: "WHY they stay up." },
        interview: { found: "“After my shift, my phone is the only time I get to talk to my friends.”", no: "How many students feel that way." },
        observe: { found: "At the 7 a.m. bus stop, <b>9 of 14</b> kids were on their phones and 3 were half asleep.", no: "What they did last night, or why." },
        experiment: { found: "Half the kids (we flipped a coin for each one) left phones in the kitchen for a week. That group slept <b>40 min more</b>.", no: "Lots of kids won't agree to give up their phone, so it's hard to run." },
        content: { found: "You counted 100 TikToks about sleep. <b>62</b> joked about “running on no sleep.”", no: "Whether real teens actually sleep that little." }
      } },
    jobs: { ic: "💼", name: "Jobs & grades", take: "Having a job tanks your grades. Facts 💯",
      r: {
        survey: { found: "You surveyed 300 students. <b>38%</b> work during the school year.", no: "WHY they work, or how it feels." },
        interview: { found: "“I close at Casey's on school nights. My family needs the money, so homework waits.”", no: "How many students are in the same spot." },
        observe: { found: "In 1st-period study hall, <b>11 of 25</b> students had their heads down.", no: "Why they're tired, or whether they work." },
        experiment: { cant: true, found: "You can't flip a coin to decide which teens get jobs. That would mess with real people's lives.", no: "Some questions can't be tested this way. It wouldn't be fair or safe." },
        content: { found: "You counted 80 “Now Hiring” posts. <b>55</b> said “flexible hours for students.”", no: "How working actually affects grades." }
      } },
    social: { ic: "📸", name: "Social media & mood", take: "Social media makes everybody miserable 😭",
      r: {
        survey: { found: "You surveyed 300 students. <b>1 in 3</b> spend 3+ hours a day on social media.", no: "WHY they scroll, or how it feels." },
        interview: { found: "“I scroll when I'm bored. Then I see everyone's perfect life and feel worse.”", no: "How many students feel that way." },
        observe: { found: "In the lunchroom, <b>23 of 40</b> students were on their phones instead of talking.", no: "How they feel, or why." },
        experiment: { found: "Half the kids (we flipped a coin for each one) took a 1-week social media break. Kids on the break felt a little happier.", no: "Whether it lasts, and some kids quit the break early." },
        content: { found: "You counted 100 posts from teen accounts. <b>70</b> showed only the best parts of people's lives.", no: "How the people looking at them actually feel." }
      } },
    sports: { ic: "🏀", name: "Sports & grades", take: "Athletes don't care about school lol 🏈",
      r: {
        survey: { found: "You surveyed 300 students. <b>45%</b> play a school sport.", no: "WHY they play, or how they balance school." },
        interview: { found: "“Coach checks our grades every week. If I fail, I sit.”", no: "How many athletes say the same thing." },
        observe: { found: "At the after-practice study table, <b>18 of 20</b> players were doing homework.", no: "What their grades are, or why." },
        experiment: { cant: true, found: "You can't flip a coin to make kids join or quit a team. It wouldn't be fair.", no: "Some questions can't be tested this way. It wouldn't be fair or safe." },
        content: { found: "You counted 60 local sports articles. <b>Only 4</b> mentioned players' schoolwork.", no: "What athletes are actually like in class." }
      } }
  };
  const TOPIC_ORDER = ["sleep", "jobs", "social", "sports"];

  // ---------------- Step 3: match ----------------
  const MATCH_QS = [
    { q: "How many students do this?", a: "survey" },
    { q: "Why do they do it?", a: "interview" },
    { q: "What do people actually do?", a: "observe" },
    { q: "Does one thing cause another?", a: "experiment" },
    { q: "What does media show?", a: "content" }
  ];

  // ---------------- Step 4: clients (made up) ----------------
  const CLIENTS = [
    { id: "c_casey", ic: "⛽", who: "Casey's store manager", ask: "We moved the pizza warmer by the door. Do customers stop and look, or walk right past it?", best: "observe",
      wrong: { survey: "Customers said they “always check it out.” Then you watched: most walked right past. People don't always do what they say.",
        interview: "3 long talks about pizza feelings. Still no idea how many people stop.",
        experiment: "You'd have to move the warmer around for weeks. The manager just wants to know what's happening now.",
        content: "You counted pizza posts online. That's not this store." },
      why: "<b>Observation</b>: when you want to know what people actually DO, watch them." },
    { id: "c_counselor", ic: "🏫", who: "Linn-Mar school counselor", ask: "Some juniors stop coming after winter break. I need to know why.", best: "interview",
      wrong: { survey: "Top answer: “Other.” A checkbox can't explain a real reason.",
        observe: "You watched the hallway. The kids who stopped coming weren't there.",
        experiment: "You can't make students drop out to compare. That would hurt people.",
        content: "The school's posts show pep rallies. Nothing about why kids leave." },
      why: "<b>Interview</b>: talk and ask follow-ups to find the real reasons." },
    { id: "c_city", ic: "🚌", who: "Marion city council", ask: "If we give teens a free bus pass, will they miss less school because of it?", best: "experiment",
      wrong: { survey: "Teens said a bus pass “would help.” Saying isn't proof it works.",
        interview: "Great stories about bad bus routes. Still not proof a pass changes attendance.",
        observe: "You watched the bus stop. Nobody had the pass yet, so there's nothing to compare.",
        content: "You counted bus ads. They tell you nothing about attendance." },
      why: "<b>Experiment</b>: flip a coin to decide who gets the pass, then compare the two groups." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ v: 4, name: "", step: 0, topic: null, fromD5: false, tried: [], open: null, match: {}, clientPick: {}, deal: null, finalSel: [], checks: {}, writing: {}, turnedIn: false, atReport: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 4) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });
  const T = () => TOPICS[st.topic];
  function day5Topic() { try { const d = JSON.parse(localStorage.getItem(D5_KEY)); return d && TOPICS[d.topic] ? d.topic : null; } catch (e) { return null; } }

  const CHECK_IDS = ["q_match", "c_casey", "c_counselor", "c_city", "q_ethics", "q_mixed"];
  const SHORT = { q_match: "Match each tool to its question", c_casey: "Casey's: do customers stop at the pizza warmer?", c_counselor: "Counselor: why juniors stop coming", c_city: "City: does a bus pass cause better attendance?", q_ethics: "Research ethics: permission + privacy", q_mixed: "Mixed methods: how many AND why" };
  const TAUNTS = ["💬 Kai: “just use a survey for everything lol”", "💬 Kai: “research is so extra 😴”", "💬 Kai: “take ur time, i'm going viral 🔥”"];

  // ---------------- Shared pieces ----------------
  const app = $("app");
  const head = t => `<h2>${t}</h2>`;
  const coach = html => `<div class="coach"><span class="sav" aria-hidden="true">👩🏽‍🔬</span><div class="bubble"><span class="cname">Dr. Ruiz, your coach</span><p>${html}</p></div></div>`;
  const reveal = html => `<p class="reveal">💡 ${html}</p>`;
  const kaiPost = (body, stats) => `<div class="post"><div class="ph"><span class="av">😤</span><b>@kai.grindset</b><span class="verified">✔</span></div><p class="pb">${body}</p><p class="ps">${stats || ""}</p></div>`;
  function nextBtn(label, onclick) { const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn"; b.textContent = label; b.onclick = onclick; return b; }
  const STEP_NAME = ["", "Pick", "Try the tools", "Match", "Clients", "Ethics", "Finale", "See how it ends"];
  function goNext() { st.step++; save(); render(); window.scrollTo(0, 0); }
  function addNext(box) { box.appendChild(nextBtn("Next: " + STEP_NAME[st.step + 1] + " →", goNext)); }
  function scrollToEl(el) { if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 40); }
  let locked = false, justSolved = null;
  const stamp = (id, txt) => `<span class="stamp${justSolved === id ? " slam" : ""}">${txt}</span>`;
  function wrongTick(fb, hint, done, label) {
    let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;   // Test T.: no wait
    const tick = () => {
      fb.className = "msg bad";
      if (left <= 0) { locked = false; fb.textContent = "Not quite. " + hint + " Try again."; done(); return; }
      fb.textContent = "Not quite. " + hint + " " + (label || "New order in") + " " + left + "…";
      left--; setTimeout(tick, 1000);
    };
    tick();
  }

  // Multiple-choice check. def.options[0] is right; shuffled every draw.
  function mountCheck(box, id, def, onRight) {
    const c = chk(id);
    const wrap = document.createElement("div"); wrap.className = "check"; wrap.dataset.check = id;
    const who = def.who || { av: "🔎", n: "Evidence check" };
    box.appendChild(wrap);
    if (c.done) { wrap.innerHTML = stamp(id, "✔ Got it") + reveal(def.why); wrap.classList.add("solved"); if (justSolved === id) justSolved = null; return; }
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
          if (o.n === 0) { c.done = true; justSolved = id; if (window.classFirstTry) window.classFirstTry.right(id); save(); onRight(); return; }
          c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong(); save();
          const TT = def.taunts || TAUNTS; taunt.textContent = TT[(c.wrong - 1) % TT.length]; taunt.hidden = false;
          wrap.classList.remove("spark"); void wrap.offsetWidth; wrap.classList.add("spark");
          locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
          if (fb.scrollIntoView) fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
          wrongTick(fb, def.hint, draw);
        };
        area.appendChild(b);
      });
    }
    draw();
    wrap.appendChild(fb); wrap.appendChild(area); wrap.appendChild(taunt);
  }
  // A row of the 5 tool cards. opts: { shown: what to print under the name, mark: k => class, off: k => bool }
  function toolRow(onPick, opts) {
    const o = opts || {};
    const row = document.createElement("div"); row.className = "tools";
    (o.order || TOOLS).forEach(k => {
      const t = TOOL[k];
      const b = document.createElement("button"); b.type = "button"; b.className = "tool " + (o.mark ? o.mark(k) : ""); b.dataset.tool = k;
      b.disabled = !!(o.off && o.off(k));
      b.innerHTML = `<span class="tl-ic">${t.ic}</span><span class="tl-name">${t.name}</span>${o.shown === "none" ? "" : `<span class="tl-what">${t.what}</span>`}`;
      b.onclick = () => onPick(k);
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
    $("track").innerHTML = ["Pick", "Try", "Match", "Clients", "Ethics", "Finale"].map((n, i) => `<li class="${i < m ? "done" : i === m ? "now" : ""}"><span>${i < m ? "✓" : i + 1}</span>${n}</li>`).join("");
    $("topicPill").hidden = !st.topic;
    if (st.topic) $("topicPill").textContent = T().ic + " " + T().name;
  }

  // ---------------- Title ----------------
  function title() {
    app.innerHTML = `<section class="card titlecard">
      <div class="title-left">
        <p class="kicker">Day 6 · Prove It Lab, part 2</p>
        <h1>Research Rivals</h1>
        <p class="hook">Sociologists have 5 tools for studying people. Today you try all 5, then use them to out-research Kai.</p>
        <p class="recap">📌 <b>Missed yesterday?</b> Kai posts hot takes about teen life. You test them like a sociologist, with Dr. Ruiz as your coach.</p>
        <ul class="facts"><li>🧰 Try 5 research tools on your topic</li><li>📞 Help 3 local clients</li><li>⏱ About 25 min</li></ul>
        <p class="goal">🎯 <b>Goal:</b> pick the right research tool for a question, and know its limits.</p>
        <label for="nameBox">Your name</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="Jordan M." value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Open the toolbox →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        <div class="fan">${TOOLS.map(k => `<span class="fcard">${TOOL[k].ic}</span>`).join("")}</div>
        ${kaiPost("research? just ask my followers lol 😎", "880K views")}
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Step 1: Pick ----------------
  function step1() {
    const box = card();
    const d5 = day5Topic();
    if (d5 && !st.topic) { st.topic = d5; st.fromD5 = true; save(); }
    box.innerHTML = head("Pick: your topic") + coach(d5 ? `Yesterday you tested <b>${TOPICS[d5].ic} ${TOPICS[d5].name}</b>. Keep it, or pick a new one. Today you'll study it 5 different ways.` : "Pick the topic you want to study today. You'll study it 5 different ways.");
    const row = document.createElement("div"); row.className = "topics";
    TOPIC_ORDER.forEach(k => {
      const t = TOPICS[k];
      const b = document.createElement("button"); b.type = "button"; b.className = "topic" + (st.topic === k ? " sel" : ""); b.dataset.topic = k;
      b.innerHTML = `<span class="t-ic">${t.ic}</span><span class="t-name">${t.name}${k === d5 ? ` <span class="t-yday">yesterday's</span>` : ""}</span><span class="t-take">“${t.take}”</span>`;
      b.onclick = () => { st.topic = k; st.fromD5 = k === d5; save(); render(); scrollToEl($("nextBtn")); };
      row.appendChild(b);
    });
    box.appendChild(row);
    if (st.topic) addNext(box);
  }

  // ---------------- Step 2: Try all 5 tools (predict first, then see) ----------------
  const GETS = { survey: "A number: how many students", interview: "Reasons, in people's own words", observe: "What people actually do", experiment: "Whether one thing causes another", content: "What shows up in media" };
  function step2() {
    const box = card(), t = T();
    st.pred = st.pred || {}; st.predOpt = st.predOpt || {};
    const left = TOOLS.filter(k => !(k in st.pred)).length;
    box.innerHTML = head("Try: use each tool on your topic") +
      coach(left === 5 ? `Tap a tool. First guess what it will get you, then see what it finds on <b>${t.name}</b>.` : left ? `${left} more to try. Each tool sees a different piece of the picture.` : "That's all 5. Every tool finds something, and every tool misses something.");
    box.appendChild(toolRow(k => { st.open = k; if (!st.predOpt[k]) { const others = TOOLS.filter(x => x !== k); st.predOpt[k] = shuffle([k, others[Math.floor(Math.random() * others.length)]]); } save(); render(); scrollToEl(document.querySelector(".toolres")); },
      { shown: "none", mark: k => ((k in st.pred) ? "tried" : "") + (st.open === k ? " sel" : "") }));
    if (st.open) {
      const k = st.open, r = t.r[k], tl = TOOL[k];
      if (!(k in st.pred)) {
        const res = document.createElement("div"); res.className = "toolres predict"; box.appendChild(res);
        res.innerHTML = `<p class="tr-h">🔮 Guess first: what will a <b>${tl.ic} ${tl.name}</b> get you?</p><p class="madeup">${tl.what}.</p>`;
        const row = document.createElement("div"); row.className = "decide";
        st.predOpt[k].forEach(opt => {
          const b = document.createElement("button"); b.type = "button"; b.className = "dcard"; b.dataset.pred = opt;
          b.innerHTML = `<span class="ct">${GETS[opt]}</span>`;
          b.onclick = () => { st.pred[k] = opt === k; save(); render(); scrollToEl(document.querySelector(".toolres")); };
          row.appendChild(b);
        });
        res.appendChild(row);
      } else {
        box.insertAdjacentHTML("beforeend", `<div class="toolres"><p class="tr-h">${tl.ic} <b>${tl.name}</b> on ${t.ic} ${t.name} <span class="predres">${st.pred[k] ? "✅ Good guess!" : "🤔 Not quite. It gets you: " + GETS[k].toLowerCase() + "."}</span></p>
          <p class="tr-found">${r.cant ? `<span class="tr-tag bad">🚫 Can't run it</span>` : `<span class="tr-tag good">✅ What you found</span>`} ${r.found}</p>
          <p class="tr-no"><span class="tr-tag bad">🚫 What it can't tell you</span> ${r.no}</p><p class="madeup">Made-up game data</p></div>`);
      }
    }
    if (!left) addNext(box);
  }

  // ---------------- Step 3: Match ----------------
  let matchPick = null;
  function step3() {
    const box = card();
    const c = chk("q_match");
    box.innerHTML = head("Match each tool to its job");
    if (c.done) {
      box.insertAdjacentHTML("beforeend", `<div class="check solved">${stamp("q_match", "✔ All matched")}<div class="matchdone">${MATCH_QS.map(m => `<p>${TOOL[m.a].ic} <b>${TOOL[m.a].name}</b> → ${m.q}</p>`).join("")}</div></div>`);
      if (justSolved === "q_match") justSolved = null;
      box.insertAdjacentHTML("beforeend", reveal("Pick the tool by the <b>question</b>, not by what's easiest."));
      addNext(box); return;
    }
    box.insertAdjacentHTML("beforeend", coach("Think back to what each tool found. Tap a question, then tap the tool that answers it best."));
    const wrap = document.createElement("div"); wrap.className = "check"; box.appendChild(wrap);
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    function draw() {
      wrap.innerHTML = `<div class="speaker"><span class="sav">🔎</span><span class="sname"><b>Match all 5</b><small>🔎 Evidence check</small></span></div>`;
      wrap.appendChild(fb);
      const grid = document.createElement("div"); grid.className = "matchgrid"; wrap.appendChild(grid);
      const qs = document.createElement("div"); qs.className = "mq";
      if (!st.mqOrder) { st.mqOrder = shuffle(MATCH_QS.map((x, i) => i)); save(); }
      st.mqOrder.forEach(i => {
        const m = MATCH_QS[i], got = st.match[i];
        const bad = st.badMatch && st.badMatch.includes(i) && got;
        const b = document.createElement("button"); b.type = "button"; b.className = "mqbtn" + (matchPick === i ? " picked" : "") + (got ? " full" : "") + (bad ? " bad" : ""); b.disabled = locked;
        b.innerHTML = `<span class="mq-q">${m.q}</span><span class="mq-a">${got ? (bad ? "✗ " : "") + TOOL[got].ic + " " + TOOL[got].name : "⬚ tap a tool"}</span>`;
        b.onclick = () => { if (locked) return; matchPick = matchPick === i ? null : i; if (st.match[i] && matchPick === i) { delete st.match[i]; save(); } draw(); };
        qs.appendChild(b);
      });
      grid.appendChild(qs);
      const used = Object.values(st.match);
      grid.appendChild(toolRow(k => {
        if (locked || matchPick == null) { fb.className = "msg"; fb.textContent = "👆 Tap a question first, then a tool."; return; }
        Object.keys(st.match).forEach(q => { if (st.match[q] === k) delete st.match[q]; });
        st.match[matchPick] = k; if (st.badMatch) st.badMatch = st.badMatch.filter(x => x !== matchPick); matchPick = null; save(); draw();
      }, { shown: "none", mark: k => used.includes(k) ? "used" : "", off: () => locked }));
      const go = document.createElement("button"); go.type = "button"; go.className = "go"; go.id = "matchBtn"; go.textContent = "✔ Check my matches";
      go.disabled = locked || Object.keys(st.match).length < 5;
      go.onclick = () => {
        const wrongN = MATCH_QS.filter((m, i) => st.match[i] !== m.a).length;
        if (!wrongN) { c.done = true; justSolved = "q_match"; if (window.classFirstTry) window.classFirstTry.right("q_match"); save(); render(); scrollToEl($("nextBtn")); return; }
        c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong();
        st.badMatch = MATCH_QS.map((m, i) => i).filter(i => st.match[i] !== MATCH_QS[i].a);   // mark the wrong ones; keep everything
        save(); locked = true; draw();
        wrongTick(fb, wrongN + (wrongN === 1 ? " match is" : " matches are") + " marked ✗. Tap " + (wrongN === 1 ? "it" : "one") + ", then pick a different tool.", () => { draw(); }, "Try again in");
      };
      wrap.appendChild(go);
    }
    draw();
  }

  // ---------------- Step 4: Clients ----------------
  function step4() {
    const box = card();
    box.innerHTML = head("Clients: pick the right tool");
    const nextC = CLIENTS.find(cl => !chk(cl.id).done);
    // Solved ones collapse to one line.
    CLIENTS.forEach(cl => { if (chk(cl.id).done) box.insertAdjacentHTML("beforeend", `<div class="check solved">${stamp(cl.id, "✔ Hired")}<p class="reveal">${cl.ic} <b>${cl.who}</b> → ${TOOL[cl.best].ic} ${TOOL[cl.best].name}. ${cl.why}</p></div>`); });
    if (justSolved && CLIENTS.some(cl => cl.id === justSolved)) justSolved = null;
    if (!nextC) { box.insertAdjacentHTML("beforeend", coach("3 for 3. You picked by the question, not by habit.")); addNext(box); return; }
    if (nextC === CLIENTS[0]) box.insertAdjacentHTML("beforeend", coach("Read what the client really wants to know. Then pick the tool that answers that kind of question."));
    const c = chk(nextC.id);
    const wrap = document.createElement("div"); wrap.className = "check"; box.appendChild(wrap);
    wrap.innerHTML = `<div class="speaker"><span class="sav">${nextC.ic}</span><span class="sname"><b>${nextC.who}</b><small>📞 New client · made up</small></span></div><div class="bubble"><h3>“${nextC.ask}”</h3></div>`;
    const fb = document.createElement("div"); fb.className = "msg"; fb.setAttribute("aria-live", "polite"); wrap.appendChild(fb);
    const tried = st.clientPick[nextC.id] || [];
    if (!st.toolOrder) { st.toolOrder = shuffle(TOOLS); save(); }
    wrap.appendChild(toolRow(k => {
      if (locked) return;
      if (k === nextC.best) { c.done = true; justSolved = nextC.id; if (window.classFirstTry) window.classFirstTry.right(nextC.id); save(); render(); scrollToEl(document.querySelectorAll(".check")[Math.min(CLIENTS.indexOf(nextC) + 1, 2)] || $("nextBtn")); return; }
      c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong();
      (st.clientPick[nextC.id] = tried).push(k); save();
      fb.className = "msg bad wrongtool"; fb.innerHTML = `${TOOL[k].ic} <b>${TOOL[k].name}?</b> ${nextC.wrong[k]} <br><span class="taunt">${TAUNTS[(c.wrong - 1) % TAUNTS.length]}</span> <span class="wait">⏳ 2</span>`;
      wrap.querySelectorAll(".tool").forEach(x => { x.disabled = true; if (x.dataset.tool === k) x.classList.add("nope"); });
      locked = true;
      let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;   // Test T.: no wait
      const tick = () => { const w = fb.querySelector(".wait"); if (left <= 0) { locked = false; if (w) w.remove(); wrap.querySelectorAll(".tool").forEach(x => { x.disabled = x.classList.contains("nope"); }); return; } if (w) w.textContent = "⏳ " + left; left--; setTimeout(tick, 1000); };
      tick();
    }, { order: st.toolOrder, shown: "none", mark: k => tried.includes(k) ? "nope" : "", off: k => tried.includes(k) }));
  }

  // ---------------- Step 5: Ethics ----------------
  function step5() {
    const box = card(), t = T();
    box.innerHTML = head("Ethics: research the right way");
    mountCheck(box, "q_ethics", { who: { av: "👩🏽‍🔬", n: "Dr. Ruiz, sociologist" },
      prompt: `You're about to interview students about ${t.name.toLowerCase()}. What do you HAVE to do first?`,
      options: ["Get their OK and a parent's, and keep names private", "Get their OK, but use their real names in the report", "Keep names private, but skip asking anyone for permission", "Only interview kids who already agree with your idea"],
      hint: "Two rules: ask first (for under 18, a parent too), and protect who they are.",
      taunts: ["💬 Kai: “permission slips? that's so extra 😴”", "💬 Kai: “just post their names, who cares lol”"],
      why: "<b>Research ethics</b>: get permission first (for anyone under 18, a parent's too), keep names secret, and don't harm anyone." },
      () => { render(); scrollToEl(document.querySelector(".deal")); });
    if (!chk("q_ethics").done) return;
    const deal = document.createElement("div"); deal.className = "deal"; box.appendChild(deal);
    if (!st.deal) {
      deal.innerHTML = `<div class="phone"><p class="b-h">📱 A homework-app company calls</p><p class="b-ask">“We'll pay your lab $500 if your report says our app <b>raises grades</b>. Your data only shows students <i>like</i> it.”</p></div>`;
      const row = document.createElement("div"); row.className = "decide";
      [["truth", "🧾", "Report what the data shows", "No $500."], ["lie", "💰", "Take the $500", "Write what they want."]].forEach(([id, ic, tt, dd]) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "dcard"; b.dataset.id = id;
        b.innerHTML = `<span class="ic">${ic}</span><span class="ct">${tt}</span><span class="cd">${dd}</span>`;
        b.onclick = () => { st.deal = id; save(); render(); scrollToEl($("nextBtn")); };
        row.appendChild(b);
      });
      deal.appendChild(row);
      return;
    }
    deal.innerHTML = st.deal === "truth"
      ? `<p class="react">🧾 You told the truth. The company hangs up. Dr. Ruiz nods.</p>` + reveal("<b>Honesty</b>: report what the data shows, even when someone pays you not to.")
      : `<p class="react">💰 You took the money…</p>${kaiPost("LEAKED 🧾 the lab took $500 to say an app raises grades. their data never showed that.", "1.9M views")}` + reveal("<b>Honesty</b>: faking results breaks trust in ALL research. That's why it's an ethics rule.");
    addNext(box);
  }

  // ---------------- Step 6: Finale (mixed methods) ----------------
  function step6() {
    const box = card(), t = T();
    box.innerHTML = head("Finale: out-research Kai") + kaiPost(`ok lab kid. ${t.name.toLowerCase()}: HOW MANY teens does this affect, and WHY? one tool can't do both 😏`, "live");
    const c = chk("q_mixed");
    if (c.done) {
      const s = t.r.survey, i = t.r.interview;
      box.insertAdjacentHTML("beforeend", `<div class="check solved">${stamp("q_mixed", "✔ Mixed methods")}<div class="toolres"><p class="tr-found"><span class="tr-tag good">📋 How many</span> ${s.found}</p><p class="tr-found"><span class="tr-tag good">🎙️ Why</span> ${i.found}</p><p class="madeup">Made-up game data</p></div></div>`);
      if (justSolved === "q_mixed") justSolved = null;
      box.insertAdjacentHTML("beforeend", reveal("<b>Mixed methods</b> = using two tools, so each one fills in what the other misses.") + `<p class="react">😤 Kai: “…ok that's actually kinda solid.”</p>`);
      box.appendChild(nextBtn("See how it ends →", goNext));
      return;
    }
    box.insertAdjacentHTML("beforeend", coach("Kai's right about one thing: one tool can't answer both. Pick the <b>2 tools</b> that do."));
    const sel = st.finalSel || [];
    const wrap = document.createElement("div"); wrap.className = "check"; box.appendChild(wrap);
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite"); wrap.appendChild(fb);
    if (!st.toolOrder) { st.toolOrder = shuffle(TOOLS); save(); }
    wrap.appendChild(toolRow(k => {
      if (locked) return;
      let s = sel.slice(); if (s.includes(k)) s = s.filter(x => x !== k); else { s.push(k); if (s.length > 2) s.shift(); }
      st.finalSel = s; save(); render();
    }, { order: st.toolOrder, shown: "none", mark: k => sel.includes(k) ? "sel" : "", off: () => locked }));
    const go = document.createElement("button"); go.type = "button"; go.className = "go"; go.textContent = sel.length === 2 ? "Play both tools →" : "Pick " + (2 - sel.length) + " more";
    go.disabled = sel.length !== 2 || locked;
    go.onclick = () => {
      if (sel.includes("survey") && sel.includes("interview")) { c.done = true; justSolved = "q_mixed"; if (window.classFirstTry) window.classFirstTry.right("q_mixed"); save(); render(); return; }
      c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong(); save();
      const hasHowMany = sel.includes("survey"), hasWhy = sel.includes("interview");
      locked = true; go.disabled = true; wrap.querySelectorAll(".tool").forEach(x => x.disabled = true);
      wrongTick(fb, (hasHowMany ? "You've got HOW MANY covered. " : hasWhy ? "You've got WHY covered. " : "") + "Which tool counts lots of people? Which one gets reasons in their own words?", () => { st.finalSel = []; save(); render(); });
    };
    wrap.appendChild(go);
  }

  // ---------------- Finish ----------------
  function endingId() { return st.deal === "lie" ? "leaked" : "trusted"; }
  const ENDINGS = {
    trusted: { icon: "🏆", t: "The Lab Kai Can't Beat", line: "You found the right tool for every question, and you stayed honest. Clients trust your lab." },
    leaked: { icon: "🧾", t: "Good Tools, Broken Trust", line: "You knew your tools, but the $500 leak follows you. Now nobody's sure your reports are real." }
  };
  function causedBy(forTeacher) {
    const t = T(), out = [];
    const miss = id => !forTeacher ? "" : chk(id).wrong ? ` (after ${chk(id).wrong} ${chk(id).wrong === 1 ? "miss" : "misses"})` : " (first try)";
    out.push(`🧰 Tried all 5 tools on ${t.ic} ${t.name}`);
    out.push("🧩 Matched each tool to its question" + miss("q_match"));
    CLIENTS.forEach(cl => out.push(`${cl.ic} ${cl.who} → ${TOOL[cl.best].name}` + (forTeacher && chk(cl.id).wrong ? ` (after trying ${chk(cl.id).wrong} other ${chk(cl.id).wrong === 1 ? "tool" : "tools"})` : "")));
    out.push("🔒 Ethics: ask permission, keep names secret" + miss("q_ethics"));
    out.push(st.deal === "truth" ? "🧾 Turned down the $500 → stayed honest" : "💰 Took the $500 → it leaked");
    out.push("📋 + 🎙️ Survey AND interviews → how many AND why" + miss("q_mixed"));
    return out;
  }
  const PROMPTS = [
    { id: "method", short: "My question, method, strength, and limit", label: "1. Pitch a study about teen life. Which tool would you use, and what's one limit?",
      stem: "I'd study ___. I'd use ___ because ___. One limit is ___.", min: 80, newWords: 6,
      mustAll: [["survey", "interview", "observ", "experiment", "content analysis", "content", "ads", "media", "watch", "count"], ["limit", "but", "however", "slow", "small", "watched", "lie", "honest", "cost", "can't", "cannot", "weak", "although", "fake", "time", "bias", "random", "won't", "wont"]],
      mustMsg: "Answer 1: name a tool AND one limit." },
    { id: "mixed", short: "Why two methods beat one", label: "2. Why is a survey AND interviews stronger than just one?",
      stem: "Both are stronger because the survey shows ___, and interviews show ___.", min: 60, newWords: 4,
      mustAll: [["how many", "how common", "number", "numbers", "percent", "%", "many", "pattern", "count", "lots of"], ["why", "reason", "story", "stories", "feel", "detail", "explain", "cause", "own words"]],
      go4: "Go deeper: which tool would you add third, and what would it catch that these two miss?",
      mustMsg: "Answer 2: say what the survey shows (how many) AND what interviews show (why)." }
  ];
  function step7() {
    const box = card(), t = T();
    const eid = endingId(), E = ENDINGS[eid];
    if (!st.atReport) {
      box.innerHTML = `<div class="ending ${eid === "trusted" ? "holds" : "played"}"><div class="e-icon">${E.icon}</div><h2>${E.t}</h2><p>${E.line}</p></div>
        <div class="caused"><p class="src-tag">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>`;
      box.appendChild(nextBtn("📝 Write your report →", () => { st.atReport = true; save(); render(); window.scrollTo(0, 0); }));
      return;
    }
    box.innerHTML = `<p class="mini-end">${E.icon} <b>${E.t}</b> · ${t.ic} ${t.name}</p>
      <div class="report" id="report"><p class="report-tag">📝 Research report</p><h3 class="wr-h">1–2 sentences each</h3></div>`;
    const rep = $("report");
    PROMPTS.forEach(p => rep.insertAdjacentHTML("beforeend", `<label for="w_${p.id}">${p.label}</label><p class="stem">✏️ ${esc(p.stem)}</p>${p.go4 ? `<p class="go4">⭐ ${p.go4}</p>` : ""}<textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`));
    rep.insertAdjacentHTML("beforeend", `<button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      <p class="turned" id="turnedBadge" ${st.turnedIn ? "" : "hidden"}>✓ Turned in</p>
      <p class="replay" id="replay" ${st.turnedIn ? "" : "hidden"}>🔁 Want to try another topic? Press “Start over” below.</p>`);
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
        const junk = window.classJunkStop(box, { starter: isEs() ? tr(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
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
    const soc3 = ["q_match", "c_casey", "c_counselor", "c_city", "q_ethics", "q_mixed"];
    a["First-try by standard"] = "Soc.1/Soc.3 (methods + ethics): " + soc3.filter(id => chk(id).done && !chk(id).wrong).length + " of " + soc3.length;
    a["Topic"] = t.name + (st.fromD5 ? " (kept from Day 5)" : "");
    const line = id => (chk(id).wrong ? "after " + chk(id).wrong + " wrong " + (chk(id).wrong === 1 ? "try" : "tries") : "first try");
    a[SHORT.q_match] = "Survey→how many, Interview→why, Observation→what people do, Experiment→cause, Content analysis→media (" + line("q_match") + ")";
    CLIENTS.forEach(cl => { a[SHORT[cl.id]] = TOOL[cl.best].name + " (" + line(cl.id) + ")" + ((st.clientPick[cl.id] || []).length ? "; tried first: " + st.clientPick[cl.id].map(k => TOOL[k].name).join(", ") : ""); });
    a[SHORT.q_ethics] = "Get their OK and a parent's, keep names private (" + line("q_ethics") + ")";
    a["Choice · $500 deal"] = st.deal === "lie" ? "Took the $500 to fake results" : "Reported the real results";
    a[SHORT.q_mixed] = "Survey + Interview (" + line("q_mixed") + ")";
    a["Ending"] = ENDINGS[endingId()].t;
    a["Caused by"] = causedBy(true).join(" | ");
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
    if (st.step >= 2 && !st.topic) st.step = 1;
    hud(); locked = false;
    (STEPS[st.step] || title)();
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; matchPick = null;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) { $("welcome").textContent = "Welcome back, " + st.name + " — you're on " + (st.step > TOTAL ? "the last screen" : "step " + st.step + " of " + TOTAL) + "."; $("welcome").hidden = false; }
  render();
  window.__rr = { state: () => JSON.parse(JSON.stringify(st)) };

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current check.
  try {
    const TLABEL = ["Title", "Pick", "Try the tools", "Match", "Clients", "Ethics", "Finale", "Ending", "Report + turn in"];
    const tDone = id => { const c = chk(id); if (c.done) return false; c.done = true; justSolved = id; save(); render(); return true; };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TLABEL.length,
      index: () => st.step >= 7 ? (st.atReport ? 8 : 7) : Math.max(0, st.step),
      label: i => TLABEL[i],
      go: i => {
        if (!st.name) st.name = "Test T.";
        if (i >= 2 && !st.topic) st.topic = day5Topic() || TOPIC_ORDER[0];   // first choice if the jump skips the pick
        matchPick = null;
        st.step = Math.min(i, 7); st.atReport = i === 8; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const n = st.step, click = sel => { const b = document.querySelector(sel); if (b) b.click(); };
        if (n === 1) { if (!st.topic) click(".topics .topic"); }
        else if (n === 2) {
          st.pred = st.pred || {}; const first = TOOLS.find(k => !(k in st.pred));
          TOOLS.forEach(k => { if (!(k in st.pred)) st.pred[k] = true; });
          if (first) st.open = first; save(); render();
        }
        else if (n === 3) { if (!chk("q_match").done) { MATCH_QS.forEach((m, i) => { st.match[i] = m.a; }); st.badMatch = []; tDone("q_match"); } }
        else if (n === 4) { const cl = CLIENTS.find(x => !chk(x.id).done); if (cl) tDone(cl.id); }
        else if (n === 5) { if (!tDone("q_ethics") && !st.deal) click(".deal .dcard"); }
        else if (n === 6) { if (!chk("q_mixed").done) { st.finalSel = ["survey", "interview"]; tDone("q_mixed"); } }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
