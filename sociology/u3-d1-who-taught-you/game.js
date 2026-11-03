// =====================================================================
//  RAISE REMI: BORN OR TAUGHT?  (Sociology Unit 3 · Day 1 · SS.9-12.Soc.9)
//  Raise a made-up girl, Remi, from birth to 18. Each life stage gives 3 time tokens.
//  Where you spend them grows 4 skills; early skills unlock (or lock) later cards.
//  Rival: Gene, a made-up podcast host who says "it's all in the genes." He tempts
//  you with shortcut cards that cost a token and give nothing, and you beat his claims
//  with real evidence (Kuhl's baby study, Anna, Isabelle, Marine boot camp).
//  5 in-world evidence checks (all Soc.9), 6 real decisions, 4 endings, 2 writing answers.
//  Turn-in via shared/turnin.js (same assignmentId as the old Daniela's Scrapbook).
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u3-d1-who-taught-you-v2";
  const ASSIGNMENT_ID = "soc-u3-d1-who-taught-you";
  const TITLE = "Sociology · Unit 3 · Day 1 · Raise Remi: Born or Taught?";
  const STANDARD = "SS.9-12.Soc.9";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;   // seconds locked after a wrong answer
  const READ = 3;   // seconds before check / event choices open
  const MAX = 6;    // skill pips

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs && window.SiteLang.isEs());
  const T = s => (window.SiteLang && window.SiteLang.t ? window.SiteLang.t(s) : s);

  // ---------------- Skills ----------------
  const SK = [
    { k: "t", icon: "🗣️", name: "Talk" },
    { k: "f", icon: "🤝", name: "Friends" },
    { k: "h", icon: "📏", name: "Habits" },
    { k: "r", icon: "🎯", name: "Ready" }
  ];
  const skName = k => SK.find(s => s.k === k).name;
  const skIcon = k => SK.find(s => s.k === k).icon;

  // ---------------- Life track ----------------
  const STOPS = [
    { face: "👶🏽", label: "0–2" }, { face: "👧🏽", label: "3–5" }, { face: "🎒", label: "6–12" }, { face: "🧑🏽‍🎓", label: "13–17" }, { face: "🎂", label: "18" }
  ];

  // ---------------- Writing (call in to Gene's show) ----------------
  const PROMPTS = [
    { id: "w1", short: "Call-in: people shape us (Anna, Isabelle, or the baby study)",
      label: "1. Call in to Gene's show. Prove people shape who we become. Use a real case.",
      stem: "Gene, you're wrong because ___. For example, ___.",
      min: 60, mustAll: [["anna", "isabelle", "davis", "kuhl", "baby", "babies", "study", "video", "boot", "marine", "case"], ["people", "person", "contact", "help", "taught", "teach", "learn", "alone", "isolat", "social", "nurture", "live"]],
      mustMsg: "In answer 1, name a real case (Anna, Isabelle, the baby study, or boot camp) AND say what people did or didn't do." },
    { id: "w2", short: "Why Remi got this ending",
      label: "2. Why did Remi end up this way? Name one stage and what you spent time on.",
      stem: "Remi ended up ___ because at age ___, I ___.",
      min: 60, mustAll: [["age", "baby", "kid", "teen", "stage", "early", "18", "little", "school", "boot", "kirkwood", "abuela", "daycare"], ["because", "since", "so ", "that's why", "which"]],
      mustMsg: "In answer 2, name a stage or age AND explain why (use \"because\")." }
  ];

  // ---------------- Steps ----------------
  // place: spend tokens on cards.  event: one big call.  check: beat Gene's claim with evidence.
  const STEPS = [
    { id: "s1", type: "place", stop: 0, face: "👶🏽", age: "Age 0–2", title: "Baby Remi", tokens: 3,
      cap: "Remi is born! Spend 3 time tokens.", gene: "Relax. Babies raise themselves.",
      how: true,
      slots: [
        { id: "sing", icon: "🗣️", name: "Talk & sing", fx: { t: 2 } },
        { id: "books", icon: "📖", name: "Bedtime books", fx: { t: 1, h: 1 } },
        { id: "peek", icon: "🤗", name: "Peekaboo & play", fx: { f: 2 } },
        { id: "routine", icon: "⏰", name: "Daily routine", fx: { h: 2 } },
        { id: "video", icon: "📺", name: "Baby videos", gene: "Better than talking!", promise: { t: 3 }, fx: {} }
      ],
      stamp: "AGE 2!",
      reveal: "<b>Socialization</b>: learning how to act from the people around you." },

    { id: "e1", type: "event", stop: 0, face: "👶🏽", age: "Age 2", title: "Who Watches Remi?",
      cap: "Dad works days now. Who watches Remi?",
      choices: [
        { icon: "👵🏽", name: "Abuela", line: "Spanish all day", fx: { t: 2 }, badge: "bi", stamp: "BILINGUAL", res: "Remi talks in Spanish AND English." },
        { icon: "🏫", name: "Daycare", line: "8 kids, English only", fx: { f: 1, h: 1 }, stamp: "SOCIAL", res: "Remi learns to share and nap on time." }
      ],
      reveal: "<b>Nature</b>: born able to learn any language. <b>Nurture</b>: who's around picks which." },

    { id: "c1", type: "check", std: "Soc.9", short: "Baby study: babies learn from live people, not screens", stop: 0, face: "👶🏽", age: "Age 2",
      claim: "Babies learn words from videos. Talking is in the genes.",
      ev: { kind: "chart", h: "9-month-old U.S. babies hear Chinese 12 times",
        bars: [{ icon: "🧑‍🏫", name: "Live person", v: 92, ok: true, txt: "Learned the sounds" }, { icon: "📺", name: "Video", v: 8, txt: "No learning" }, { icon: "🔊", name: "Audio only", v: 8, txt: "No learning" }],
        src: "Kuhl, Tsao & Liu, PNAS, 2003 (University of Washington). Bars show who learned, not exact scores." },
      options: ["Babies learned sounds from live people, not screens", "Babies learned sounds from people on video or audio", "Babies learned Chinese without any people teaching", "Babies learned only from people in their own family"],
      hint: "Look at the three bars. Which group learned?",
      after: st => (st.place.s1 || []).includes("video") ? "That's why your 📺 card gave +0." : "" },

    { id: "s2", type: "place", stop: 1, face: "👧🏽", age: "Age 3–5", title: "Little Kid", tokens: 3,
      cap: "Remi is 3. Three new tokens.", gene: "Smart kids are born smart. Save your time.",
      slots: [
        { id: "pretend", icon: "🧸", name: "Pretend play", fx: { f: 2 } },
        { id: "story", icon: "📚", name: "Story time", fx: { t: 2 } },
        { id: "chores", icon: "🧹", name: "Chores & dinner", fx: { h: 1, r: 1 } },
        { id: "preschool", icon: "🎒", name: "Preschool", fx: { h: 1, f: 1 } },
        { id: "genes", icon: "🧬", name: "Let genes do it", gene: "Born smart. Trust me.", promise: { t: 1, f: 1, h: 1 }, fx: {} }
      ],
      stamp: "AGE 5!",
      reveal: "<b>Primary socialization</b>: early basics like words and manners, mostly at home." },

    { id: "c2", type: "check", std: "Soc.9", short: "Anna: kids need contact with people to develop", stop: 1, face: "👧🏽", age: "Age 5",
      claim: "Some kids are just born behind. Like Anna.",
      ev: { kind: "file", name: "Anna", place: "Pennsylvania, 1938",
        rows: [["Age found", "almost 6"], ["Kept", "alone in a room"], ["Human contact", "very little"], ["Walk or talk?", "❌ ❌"], ["After care", "some phrases. Died at 10."]],
        src: "Kingsley Davis, American Journal of Sociology, 1940 and 1947." },
      options: ["Kids need contact with people to develop", "Kids learn to walk and talk without people", "Kids kept away from people catch up alone", "Kids' skills are set at birth, not by people"],
      hint: "How much human contact did Anna get?" },

    { id: "c3", type: "check", std: "Soc.9", short: "Isabelle: daily help from people let her catch up", stop: 1, face: "👧🏽", age: "Age 5",
      claim: "Maybe Anna was just born that way.",
      ev: { kind: "file", name: "Isabelle", place: "Ohio, 1938",
        rows: [["Found at", "6½, hidden away"], ["Her mom", "couldn't hear or talk"], ["Talk?", "❌ no words yet"], ["Then", "daily lessons"], ["By age 8½", "✅ normal for her age"]],
        src: "Kingsley Davis, “Final Note on a Case of Extreme Isolation,” 1947. Davis did wonder if Anna had a condition from birth. That's why he compared the two girls." },
      options: ["With daily help from people, she caught up", "She was born smarter, so people didn't matter", "She copied the words her mom said every day", "Daily time away from people made her learn faster"],
      hint: "What changed for Isabelle after she was found?",
      unlock: "🧩 Next stages: catch-up cards (2 tokens) for weak skills.",
      reveal: "<b>Isolation</b> blocks growth. Daily help from people can catch a kid up." },

    { id: "s3", type: "place", stop: 2, face: "🎒", age: "Age 6–12", title: "School Kid", tokens: 2,
      cap: "School years. Remi's busy: only 2 tokens.", gene: "Catch-up? Waste of time.",
      slots: [
        { id: "team", icon: "⚾", name: "Rec league team", fx: { f: 1, h: 1 }, need: { f: 2 } },
        { id: "homework", icon: "📚", name: "Homework help", fx: { t: 1, r: 1 } },
        { id: "sleep", icon: "🛏️", name: "Sleepovers", fx: { f: 2 } },
        { id: "allow", icon: "🧹", name: "Chores & allowance", fx: { h: 1, r: 1 } }
      ],
      catchup: true, stamp: "AGE 12!" },

    { id: "s4", type: "place", stop: 3, face: "🧑🏽‍🎓", age: "Age 13–17", title: "Teen Remi", tokens: 2,
      cap: "Remi is 13. Last 2 tokens before 18.", gene: "Teens are who they are.",
      slots: [
        { id: "drive", icon: "🚗", name: "Driver's ed", fx: { r: 2 }, need: { h: 3 } },
        { id: "nurse", icon: "🩺", name: "Follow a nurse at work", fx: { r: 1, t: 1 }, need: { t: 3 } },
        { id: "interp", icon: "🌎", name: "Volunteer at a clinic", fx: { r: 2, t: 1 }, badge: "bi" },
        { id: "job", icon: "💼", name: "Part-time job", fx: { r: 1, h: 1 } },
        { id: "crew", icon: "🎉", name: "Friend time", fx: { f: 2 } },
        { id: "kirk", icon: "🎓", name: "Visit a Kirkwood class", fx: { r: 1, t: 1 } }
      ],
      catchup: true, stamp: "AGE 17!",
      reveal: "<b>Anticipatory socialization</b>: practicing a role before you have it." },

    { id: "c4", type: "check", std: "Soc.9", short: "Anticipatory socialization = practicing a future role", stop: 3, face: "🧑🏽‍🎓", age: "Age 17",
      claim: "Bet you can't spot it on Remi's fridge.",
      ev: { kind: "notes", h: "Remi's fridge", notes: [["Age 2", "learns to say “please”"], ["Age 17", "practice job interview"], ["Age 5", "shares crayons at preschool"]] },
      q: "Which note is anticipatory socialization?",
      options: ["Age 17: a practice job interview", "Age 2: learning to say “please”", "Age 5: sharing crayons at preschool", "None. It only happens to adults"],
      hint: "Which one is practice for a role Remi doesn't have yet?" },

    { id: "e2", type: "event", stop: 4, face: "🎂", age: "Age 18", title: "What's Next?",
      cap: "Remi turns 18. Pick her path.",
      choices: [
        { icon: "🪖", name: "Marines boot camp", line: "Platoon life. Speak only when told.", fx: { h: 2, f: 1, t: -1 }, path: "camp", stamp: "SHIPPED OUT", res: "Remi ships out to Parris Island." },
        { icon: "🎓", name: "Kirkwood + a job", line: "Nobody sets her schedule", fx: { r: 1, t: 1, h: -1 }, path: "college", stamp: "ENROLLED", res: "Remi starts classes and a night job." }
      ] },

    { id: "c5", type: "check", std: "Soc.9", short: "Boot camp = resocialization in a total institution", stop: 4, face: "🎂", age: "Age 18",
      claim: "After 18, people can't change.",
      ev: { kind: "camp", h: "Marine boot camp",
        rows: [["✂️", "Same haircut"], ["👕", "Same uniform"], ["⏰", "Strict schedule, all day"], ["🗣️", "New way to talk: “Yes, sir!”"]],
        src: "U.S. Marine Corps recruit training, Parris Island, South Carolina, and San Diego." },
      options: ["Boot camp remakes adults by running their whole day", "Boot camp only works on people born to be soldiers", "Boot camp lets recruits keep all their old routines", "Boot camp teaches nothing recruits didn't already know"],
      hint: "Look at the list. Who controls the recruit's day?",
      reveal: "<b>Resocialization</b>: old habits replaced fast, in a <b>total institution</b> that runs your whole day." },

    { id: "end", type: "ending", stop: 4, face: "🎂", age: "Age 18", title: "Remi at 18" },
    { id: "write", type: "write", stop: 4, face: "🎂", age: "Age 18", title: "Call In to Gene's Show" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const stepById = id => STEPS.find(s => s.id === id);

  const CATCH = k => ({ id: "cu_" + k, icon: "🧩", name: "Catch-up: " + skName(k), fx: { [k]: 3 }, cost: 2, catchup: true });

  // ---------------- Endings ----------------
  const ENDINGS = {
    ready: { icon: "🌟", title: "Ready for Anything", stamp: "READY", good: true,
      text: ["Remi can talk, work, follow through, and make friends.", "Every stage got people time. That's socialization doing its job."] },
    solo: { icon: "📚", title: "Smart but Solo", stamp: "LONER", good: false,
      text: ["Remi aces class and plans ahead.", "But groups feel awkward. More friend time early would have helped."] },
    almost: { icon: "🛠️", title: "Almost There", stamp: "CLOSE", good: false,
      text: ["Remi is close.", "One skill lags. Nobody spent enough time teaching it."] },
    behind: { icon: "🐢", title: "Still Catching Up", stamp: "BEHIND", good: false,
      text: ["Remi is behind in one skill.", "Her time went elsewhere, or to Gene. Catching up later costs more."] }
  };
  function lowest(sk) { let lo = SK[0].k; SK.forEach(s => { if (sk[s.k] < sk[lo]) lo = s.k; }); return lo; }
  function endingFor(sk) {
    const lo = lowest(sk);
    if (sk[lo] >= 5) return "ready";
    if (sk[lo] <= 2) return "behind";
    if (sk.f === sk[lo]) return "solo";
    return "almost";
  }

  // ---------------- State ----------------
  const fresh = () => ({ v: 1, name: "", step: -1, sk: { t: 0, f: 0, h: 0, r: 0 }, place: {}, grown: {}, gains: {}, ev: {}, flags: {}, done: {}, wrong: {}, hype: 6, ending: null, writing: {}, wpage: 0, turnedIn: false, howSeen: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 1 || !st.sk) st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts fresh.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    if (now && st.name && now !== st.name.trim().toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  let anim = false;

  function addSk(fx, stageId) {
    const real = {};
    Object.keys(fx || {}).forEach(k => {
      const before = st.sk[k];
      st.sk[k] = Math.max(0, Math.min(MAX, before + fx[k]));
      const d = st.sk[k] - before;
      real[k] = (real[k] || 0) + fx[k];
      if (stageId) { st.gains[stageId] = st.gains[stageId] || {}; st.gains[stageId][k] = (st.gains[stageId][k] || 0) + d; }
    });
    return real;
  }
  function hypeAdd(d) { st.hype = Math.max(0, Math.min(10, st.hype + d)); }
  const geneMood = () => st.hype >= 8 ? "😎" : st.hype >= 6 ? "😏" : st.hype >= 4 ? "😬" : st.hype >= 2 ? "😤" : "🫠";

  // ---------------- HUD ----------------
  let lastSk = null, lastHype = null;
  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    document.body.classList.toggle("on-title", !show);
    if (!show) return;
    const s = STEPS[Math.min(st.step, TOTAL - 1)];
    $("rFace").textContent = s.face; $("rAge").textContent = s.age;
    $("skills").innerHTML = SK.map(x => {
      const v = st.sk[x.k];
      return `<div class="sk sk-${x.k}" id="sk_${x.k}" title="${esc(x.name)}"><span class="si" aria-hidden="true">${x.icon}</span><span class="sn">${esc(x.name)}</span><span class="pips" aria-label="${v} of ${MAX}">${Array.from({ length: MAX }, (_, i) => `<i class="${i < v ? "on" : ""}"></i>`).join("")}</span></div>`;
    }).join("");
    if (lastSk) SK.forEach(x => { if (lastSk[x.k] !== st.sk[x.k]) { const el = $("sk_" + x.k); el.classList.add(st.sk[x.k] > lastSk[x.k] ? "flash" : "flash-bad"); } });
    lastSk = Object.assign({}, st.sk);
    $("gMood").textContent = geneMood();
    $("hypeFill").style.width = (st.hype * 10) + "%";
    if (lastHype != null && lastHype !== st.hype) { const g = $("geneBox"); g.classList.remove("bump"); void g.offsetWidth; g.classList.add("bump"); }
    lastHype = st.hype;
    $("track").innerHTML = `<div class="road"><span class="road-fill" style="width:${Math.round(st.step / (TOTAL - 1) * 100)}%"></span></div>` + STOPS.map((p, i) => `<span class="stop${i < s.stop ? " past" : ""}${i === s.stop ? " now" : ""}"><span class="sf">${p.face}</span><small>${p.label}</small></span>`).join("") + `<span class="stepct"><span>Step</span> ${Math.min(st.step + 1, TOTAL)}/${TOTAL}</span>`;
  }

  // ---------------- Pieces ----------------
  const app = $("app");
  function fxChips(fx, cls) {
    return Object.keys(fx || {}).filter(k => fx[k]).map(k => `<span class="chip c-${k}${fx[k] < 0 ? " neg" : ""}${cls ? " " + cls : ""}">${fx[k] > 0 ? "+" : "−"}${Math.abs(fx[k])}<span aria-hidden="true">${skIcon(k)}</span></span>`).join("");
  }
  function geneSays(t, cls) { return `<div class="say gene-say ${cls || ""}"><span class="sav" aria-hidden="true">🧔🏻‍♂️</span><div class="bub"><span class="bn">Gene</span><span class="bt">${esc(t)}</span></div></div>`; }
  function caption(t) { return `<p class="cap"><span>${esc(t)}</span></p>`; }
  function head(s) { return `<div class="shead"><span class="agepill">${s.face} <span>${esc(s.age)}</span></span><h2>${esc(s.title)}</h2></div>`; }
  function revealHtml(t) { return t ? `<div class="reveal${anim ? " pop" : ""}"><span class="rh" aria-hidden="true">💡</span><p>${t}</p></div>` : ""; }
  function stampHtml(text, good) { return text ? `<span class="stamp ${good ? "good" : "bad"}${anim ? " slam" : ""}">${esc(text)}</span>` : ""; }
  function nextBtn(label) { return `<button type="button" class="next" id="nextBtn"><span>${esc(label || "Next")}</span> →</button>`; }
  function wireNext() { const b = $("nextBtn"); if (b) b.onclick = goNext; }
  function goNext() {
    st.step = Math.min(st.step + 1, TOTAL - 1);
    if (STEPS[st.step].type === "ending" && !st.ending) st.ending = endingFor(st.sk);
    anim = true; save(); render(); window.scrollTo(0, 0);
  }
  function readLock(btns, lockEl, after) {
    btns.forEach(b => b.disabled = true);
    let left = READ;
    const tick = () => {
      if (left <= 0) { btns.forEach(b => b.disabled = false); if (lockEl) lockEl.textContent = ""; if (after) after(); return; }
      if (lockEl) lockEl.textContent = "⏳ " + left;
      left--; setTimeout(tick, 1000);
    };
    tick();
  }

  // ---------------- Title ----------------
  function intro() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title-card">
      <p class="eyebrow">Sociology · Unit 3 · Day 1</p>
      <h1 class="big-title"><span class="t1">Raise Remi</span><span class="t2">Born or Taught?</span></h1>
      <p class="hook">Gene says babies raise themselves. Raise Remi and prove him wrong.</p>
      <div class="title-cast" aria-hidden="true">
        <div class="tc you"><span class="af">👶🏽</span><b>Remi</b><small>Your kid</small></div>
        <div class="tc"><span class="af">👨🏽</span><b>Dad</b><small>Works days</small></div>
        <div class="tc"><span class="af">👵🏽</span><b>Abuela</b><small>Grandma</small></div>
        <div class="tc rival"><span class="af">🧔🏻‍♂️</span><b>Gene</b><small>Your rival</small></div>
      </div>
      <div class="title-tiles"><span>🕒 <b>10</b> <span>time tokens</span></span><span>🃏 <b>6</b> <span>big calls</span></span><span>📂 <b>5</b> <span>real-case checks</span></span><span>✍️ <b>2</b> <span>short answers</span></span><span>⏱ <b>25</b> <span>minutes</span></span><span>🏁 <b>4</b> <span>endings</span></span></div>
      <p class="goal"><b>Today's goal:</b> <span>Explain how people teach us who to be, from birth to adulthood.</span></p>
      <div class="title-start"><div class="namebox"><label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(pre)}"></div>
        <button type="button" class="big" id="startBtn"><span>Start raising Remi</span> →</button></div>
      <p id="introMsg" class="msg" role="status"></p>
      <p class="small-print"><b>SS.9-12.Soc.9</b> Describe the process of socialization across the life course.</p>
      <p class="small-print">Remi, her family, and Gene are made up. Anna, Isabelle, and the baby study are real.</p></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ \p{Lu}\.$/u.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 0; anim = true; save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Place tokens ----------------
  function slotsFor(s) {
    // Card order is shuffled once per student and saved, so clicking the first cards isn't a strategy.
    st.order = st.order || {};
    if (!st.order[s.id]) { st.order[s.id] = shuffle(s.slots.map(x => x.id)); save(); }
    const ord = st.order[s.id];
    let list = s.slots.filter(x => !x.badge || st.flags[x.badge]).sort((x, y) => ord.indexOf(x.id) - ord.indexOf(y.id));
    if (s.catchup && st.done.c3) {
      // Isabelle rule: any skill at 2 or lower gets a catch-up card (costs 2 tokens).
      const base = (st.snap && st.snap[s.id]) || st.sk;
      SK.forEach(x => { if (base[x.k] <= 2) list = list.concat([CATCH(x.k)]); });
    }
    return list;
  }
  const costOf = x => x.cost || 1;
  function lockReason(x) {
    if (!x.need) return "";
    const k = Object.keys(x.need)[0];
    const base = st.snapAt || st.sk;
    return base[k] < x.need[k] ? k : "";
  }
  function placeView(s) {
    // Snapshot skills at stage start so locks/catch-ups don't change while you place tokens.
    st.snap = st.snap || {};
    if (!st.snap[s.id]) { st.snap[s.id] = Object.assign({}, st.sk); save(); }
    st.snapAt = st.snap[s.id];
    const grown = !!st.grown[s.id];
    const picked = st.place[s.id] || [];
    const slots = slotsFor(s);
    const spent = picked.reduce((n, id) => n + costOf(slots.find(x => x.id === id) || { cost: 1 }), 0);
    const left = s.tokens - spent;
    let h = `<section class="scene place">${head(s)}<div class="storyrow">${caption(s.cap)}${geneSays(s.gene)}</div>`;
    if (s.how && !grown) h += `<div class="how"><span><span aria-hidden="true">🕒</span> <span>Tap cards to spend tokens</span></span><span><span aria-hidden="true">🔓</span> <span>Early time unlocks later cards</span></span><span><span aria-hidden="true">🏆</span> <span>Best ending: every skill 5+</span></span></div>`;
    if (!grown) {
      h += `<div class="tray"><span class="tl">Time tokens</span><span class="coins">${Array.from({ length: s.tokens }, (_, i) => `<span class="coin${i < left ? "" : " spent"}" aria-hidden="true">🕒</span>`).join("")}</span><b class="left" aria-live="polite">${left}</b></div>`;
    }
    h += `<div class="cards">${slots.map(x => cardHtml(s, x, picked, left, grown)).join("")}</div>`;
    if (!grown) {
      h += `<div class="growrow"><button type="button" class="big grow" id="growBtn"${left === 0 ? "" : " disabled"}><span>Grow up!</span> ${s.face}→</button><p class="msg" id="placeMsg">${left > 0 ? `<span>Spend every token to grow.</span>` : ""}</p></div>`;
    } else {
      h += `<div class="grown">${stampHtml(s.stamp, true)}${geneResult(s)}${revealHtml(s.reveal)}${unlockPreview(s)}${nextBtn()}</div>`;
    }
    h += `</section>`;
    app.innerHTML = h;
    if (!grown) {
      app.querySelectorAll(".pcard").forEach(b => b.onclick = () => togglePick(s, b.dataset.id));
      $("growBtn").onclick = () => grow(s);
    } else wireNext();
  }
  function cardHtml(s, x, picked, left, grown) {
    const on = picked.includes(x.id);
    const lk = lockReason(x);
    const cost = costOf(x);
    const cls = ["pcard", x.gene ? "genecard" : "", x.catchup ? "catch" : "", on ? "on" : "", lk ? "locked" : ""].join(" ");
    let fx;
    if (grown && on) fx = x.gene ? `<span class="chip zero${anim ? " pop" : ""}">+0</span>${stampHtml("NOPE", false)}` : fxChips(x.fx, anim ? "pop" : "");
    else fx = x.gene ? `${fxChips(x.promise, "promise")}<span class="q">?</span>` : fxChips(x.fx);
    const dis = grown || lk || (!on && cost > left);
    return `<button type="button" class="${cls}" data-id="${x.id}"${dis ? " disabled" : ""} aria-pressed="${on}">
      ${x.gene ? `<span class="gtag"><span aria-hidden="true">🧔🏻‍♂️</span> <span>Gene's tip</span></span>` : ""}
      <span class="ci" aria-hidden="true">${x.icon}</span><span class="cn">${esc(x.name)}</span>
      ${x.gene ? `<span class="cl">“${esc(x.gene)}”</span>` : ""}
      ${x.badge ? `<span class="cl">🌎 <span>Uses the Spanish Abuela taught her</span></span>` : ""}
      <span class="fx">${fx}</span>
      ${lk ? `<span class="lock"><span aria-hidden="true">🔒</span> <span>Needs</span> ${skIcon(lk)}${x.need[lk]}</span>` : `<span class="cost" aria-label="cost ${cost}">${"🕒".repeat(cost)}</span>`}
      ${on ? `<span class="placed" aria-hidden="true">🕒</span>` : ""}
    </button>`;
  }
  function togglePick(s, id) {
    const picked = st.place[s.id] = st.place[s.id] || [];
    const i = picked.indexOf(id);
    if (i >= 0) picked.splice(i, 1); else picked.push(id);
    save(); anim = true; render();
    const b = app.querySelector(`.pcard[data-id="${id}"]`); if (b) { b.classList.add("tap"); b.focus({ preventScroll: true }); }
    const g = $("growBtn"); if (g && !g.disabled) { g.classList.add("ready"); g.scrollIntoView({ behavior: "smooth", block: "center" }); }
  }
  function grow(s) {
    const slots = slotsFor(s);
    const picked = st.place[s.id] || [];
    picked.forEach(id => {
      const x = slots.find(y => y.id === id); if (!x) return;
      if (x.gene) hypeAdd(2);
      addSk(x.fx, s.id);
    });
    st.gains[s.id] = st.gains[s.id] || {};
    st.grown[s.id] = true;
    anim = true; save(); render();
    const g = app.querySelector(".grown"); if (g) g.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function geneResult(s) {
    const picked = st.place[s.id] || [];
    const g = s.slots.find(x => x.gene && picked.includes(x.id));
    if (!g) return "";
    return `<div class="gene-gloat">${geneSays("Ha! Thanks for listening! 📈")}<p class="note"><span>Gene's card gave +0. You lost a token.</span></p></div>`;
  }
  function unlockPreview(s) {
    // After the school years: show what the teen years will unlock or lock.
    if (s.id !== "s3") return "";
    const teen = stepById("s4");
    const items = teen.slots.filter(x => x.need).map(x => {
      const k = Object.keys(x.need)[0], ok = st.sk[k] >= x.need[k];
      return `<span class="ul ${ok ? "ok" : "no"}"><span aria-hidden="true">${ok ? "🔓" : "🔒"} ${x.icon}</span> <span>${esc(x.name)}</span></span>`;
    });
    return `<div class="unlocks"><span class="uh">Teen years:</span>${items.join("")}</div>`;
  }

  // ---------------- Event ----------------
  function eventView(s) {
    const r = st.ev[s.id];
    let h = `<section class="scene event">${head(s)}<div class="storyrow">${caption(s.cap)}</div>`;
    if (r == null) {
      h += `<div class="bigcards">${s.choices.map((c, i) => `<button type="button" class="bigcard" data-i="${i}"><span class="ci" aria-hidden="true">${c.icon}</span><span class="cn">${esc(c.name)}</span><span class="cl">${esc(c.line)}</span><span class="fx">${fxChips(c.fx)}${c.badge ? `<span class="chip badge"><span aria-hidden="true">🌎</span> <span>Bilingual</span></span>` : ""}</span></button>`).join("")}</div><p class="lockline" id="lockLine" aria-live="polite"></p></section>`;
      app.innerHTML = h;
      const btns = [...app.querySelectorAll(".bigcard")];
      btns.forEach(b => b.onclick = () => choose(s, +b.dataset.i));
      if (anim) readLock(btns, $("lockLine"));
      return;
    }
    const c = s.choices[r];
    h += `<div class="bigcards done">${s.choices.map((x, i) => `<div class="bigcard ${i === r ? "picked" : "faded"}"><span class="ci" aria-hidden="true">${x.icon}</span><span class="cn">${esc(x.name)}</span>${i === r ? `<span class="fx">${fxChips(x.fx, anim ? "pop" : "")}</span>` : ""}</div>`).join("")}</div>
      <div class="grown">${stampHtml(c.stamp, true)}${caption(c.res)}${revealHtml(s.reveal)}${nextBtn()}</div></section>`;
    app.innerHTML = h; wireNext();
  }
  function choose(s, i) {
    const c = s.choices[i];
    st.ev[s.id] = i;
    addSk(c.fx, s.id);
    if (c.badge) st.flags[c.badge] = true;
    if (c.path) st.flags.path = c.path;
    anim = true; save(); render();
  }

  // ---------------- Check (Gene's podcast) ----------------
  let locked = false;
  function evidenceHtml(e) {
    if (e.kind === "chart") return `<div class="evi chart"><p class="evh"><span class="real">REAL</span> <span>${esc(e.h)}</span></p>${e.bars.map(b => `<div class="bar-row"><span class="bl"><span aria-hidden="true">${b.icon}</span> <span>${esc(b.name)}</span></span><span class="bt-wrap"><span class="bt ${b.ok ? "ok" : "no"}" style="width:${b.v}%"></span></span><span class="bv ${b.ok ? "ok" : "no"}"><span aria-hidden="true">${b.ok ? "✅" : "❌"}</span> <span>${esc(b.txt)}</span></span></div>`).join("")}<p class="src">${esc(e.src)}</p></div>`;
    if (e.kind === "file") return `<div class="evi file"><span class="clip" aria-hidden="true"></span><p class="evh"><span class="real">REAL CASE</span> <span class="fname">${esc(e.name)}</span> <span class="fplace">${esc(e.place)}</span></p><dl>${e.rows.map(r => `<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join("")}</dl><p class="src">${esc(e.src)}</p></div>`;
    if (e.kind === "camp") return `<div class="evi camp"><p class="evh"><span class="real">REAL</span> <span>${esc(e.h)}</span></p><ul>${e.rows.map(r => `<li><span class="ci" aria-hidden="true">${r[0]}</span><span>${esc(r[1])}</span></li>`).join("")}</ul><p class="src">${esc(e.src)}</p></div>`;
    if (e.kind === "notes") return `<div class="evi fridge"><p class="evh"><span aria-hidden="true">🧲</span> <span>${esc(e.h)}</span></p><div class="notes">${e.notes.map((n, i) => `<div class="sticky s${i}"><b>${esc(n[0])}</b><span>${esc(n[1])}</span></div>`).join("")}</div></div>`;
    return "";
  }
  function checkContext(s) {
    if (s.id !== "c5") return "";
    return caption(st.flags.path === "camp" ? "Remi ships out to boot camp." : "Remi's friend Jay ships out to boot camp.");
  }
  function checkView(s) {
    const done = !!st.done[s.id];
    let h = `<section class="scene check"><div class="studio"><div class="onair${done ? " off" : ""}"><span class="dot" aria-hidden="true"></span><span>ON AIR</span></div><p class="show">🎙️ <span>Born Ready</span> <small><span>with Gene</span></small></p>
      <div class="claimwrap">${geneSays(s.claim, "claim")}${done ? stampHtml("DEBUNKED", true) : ""}</div></div>${checkContext(s)}
      ${done ? "" : `<div class="evwrap" id="evwrap">${evidenceHtml(s.ev)}</div>`}
      <p class="q"><span aria-hidden="true">💬</span> <span>${esc(done ? "You said:" : (s.q || "Your comeback:"))}</span></p>`;
    if (done) {
      const extra = s.after ? s.after(st) : "";
      h += `<div class="replied"><span aria-hidden="true">💬</span> <span>${esc(s.options[0])}</span></div>${extra ? `<p class="note"><span>${esc(extra)}</span></p>` : ""}${s.unlock ? `<p class="unlock-line"><span>${esc(s.unlock)}</span></p>` : ""}${revealHtml(s.reveal)}${nextBtn()}</section>`;
      app.innerHTML = h; wireNext(); return;
    }
    h += `<div class="replies" id="qc"></div><p class="msg" id="qmsg" aria-live="polite"></p></section>`;
    app.innerHTML = h;
    const area = $("qc"), fb = $("qmsg");
    let lastOrder = "";
    function draw(lockFirst) {
      area.innerHTML = "";
      let order = shuffle(s.options.map((t, n) => ({ t, n })));
      if (lastOrder) { let tries = 0; while (order.map(o => o.n).join() === lastOrder && tries++ < 20) order = shuffle(order); }
      lastOrder = order.map(o => o.n).join();
      const btns = order.map(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "reply";
        b.innerHTML = `<span class="ri" aria-hidden="true">💬</span><span>${esc(o.t)}</span>`;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            st.done[s.id] = true; hypeAdd(-2);
            if (window.classFirstTry) window.classFirstTry.right(s.id);
            anim = true; save(); render();
            const n = $("nextBtn"); if (n) n.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
          st.wrong[s.id] = (st.wrong[s.id] || 0) + 1; hypeAdd(1);
          if (window.classFirstTry) window.classFirstTry.wrong();
          save(); hud();
          const ev = $("evwrap"); if (ev) { ev.classList.remove("shake"); void ev.offsetWidth; ev.classList.add("shake"); }
          locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = LOCK;
          const tick = () => {
            if (left <= 0) { locked = false; fb.textContent = s.hint; fb.className = "msg"; draw(false); return; }
            fb.textContent = "😏 Gene thinks he's winning. " + s.hint + " New order in " + left + "…"; fb.className = "msg bad";
            left--; setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
        return b;
      });
      if (lockFirst) readLock(btns, fb);
    }
    locked = false; draw(anim);
  }

  // ---------------- Ending ----------------
  const AGE_OF = { s1: "Age 0–2", s2: "Age 3–5", s3: "Age 6–12", s4: "Age 13–17", e1: "Age 2", e2: "Age 18" };
  function causedBy(end) {
    const out = [];
    const lo = lowest(st.sk);
    const geneTaken = ["s1", "s2"].map(id => { const s = stepById(id); return s.slots.find(x => x.gene && (st.place[id] || []).includes(x.id)); }).filter(Boolean);
    if (end === "ready") {
      ["s1", "s2", "s3", "s4"].forEach(id => {
        const s = stepById(id); const picked = st.place[id] || [];
        const slots = s.slots.concat(SK.map(x => CATCH(x.k)));
        const best = picked.map(p => slots.find(x => x.id === p)).filter(x => x && !x.gene)[0];
        if (best) out.push({ age: AGE_OF[id], icon: best.icon, txt: best.name, fx: best.fx });
      });
    } else {
      geneTaken.forEach(g => out.push({ age: g.id === "video" ? AGE_OF.s1 : AGE_OF.s2, icon: g.icon, txt: g.name, fx: null, zero: true }));
      // Only blame a stage that offered a card for that skill (no baby card builds Ready, for example).
      ["s1", "s2", "s3", "s4"].forEach(id => { const s = stepById(id); const offered = s.catchup || s.slots.some(x => !x.gene && x.fx && x.fx[lo] > 0); if (offered && !((st.gains[id] || {})[lo] > 0)) out.push({ age: AGE_OF[id], icon: "❌", txt: "No time for", sk: lo }); });
      if (st.flags.path === "camp" && lo === "t") out.push({ age: AGE_OF.e2, icon: "🪖", txt: "Boot camp", fx: { t: -1 } });
      if (st.flags.path === "college" && lo === "h") out.push({ age: AGE_OF.e2, icon: "🎓", txt: "Kirkwood + a job", fx: { h: -1 } });
    }
    return out.slice(0, 5);
  }
  function endingView(s) {
    const key = st.ending || endingFor(st.sk);
    const e = ENDINGS[key];
    const lo = lowest(st.sk);
    const cb = causedBy(key);
    const pathFace = st.flags.path === "camp" ? "🪖" : "🎓";
    const weak = key !== "ready" ? `<p class="weak"><span>Weakest skill:</span> <span class="chip c-${lo}"><span aria-hidden="true">${skIcon(lo)}</span> <span>${esc(skName(lo))}</span></span></p>` : "";
    const geneLine = key === "ready" ? "Okay… maybe people matter. 😤" : "See? Born that way! 😎";
    app.innerHTML = `<section class="scene ending ${e.good ? "good" : "bad"}">
      <div class="end-hero"><div class="bday${anim ? " swing" : ""}"><span class="cake" aria-hidden="true">🎂</span><span class="bface" aria-hidden="true">👩🏽${pathFace}</span><span class="bname">Remi, 18</span></div>
      <div class="end-words"><p class="pk"><span>Ending</span></p><h2 class="end-title"><span aria-hidden="true">${e.icon}</span> <span>${esc(e.title)}</span></h2>${stampHtml(e.stamp, e.good)}</div></div>
      <div class="end-text">${e.text.map(t => `<p><span>${esc(t)}</span></p>`).join("")}</div>${weak}
      <div class="final">${SK.map(x => `<div class="fin c-${x.k}"><span class="fi" aria-hidden="true">${x.icon}</span><b>${st.sk[x.k]}/${MAX}</b><span>${esc(x.name)}</span></div>`).join("")}</div>
      ${cb.length ? `<div class="caused"><p class="chh">Caused by</p><ul>${cb.map(x => `<li><span class="ca">${esc(x.age)}</span> <span aria-hidden="true">${x.icon}</span> <span>${esc(x.txt)}</span>${x.sk ? ` <span class="chip c-${x.sk}"><span aria-hidden="true">${skIcon(x.sk)}</span> <span>${esc(skName(x.sk))}</span></span>` : ""}${x.zero ? ` <span class="chip zero">+0</span>` : ""}${x.fx ? " " + fxChips(x.fx) : ""}</li>`).join("")}</ul></div>` : ""}
      ${geneSays(geneLine)}
      <p class="endings-note"><span>1 of 4 endings. Your tokens picked it.</span></p>
      ${nextBtn("Call in to Gene's show")}</section>`;
    wireNext();
  }

  // ---------------- Writing + turn in ----------------
  function writeView(s) {
    const e = ENDINGS[st.ending] || ENDINGS.almost;
    const pg = st.turnedIn ? -1 : (st.wpage || 0);
    app.innerHTML = `<section class="scene write"><div class="phone"><div class="ph-top"><span class="dot" aria-hidden="true"></span><span>ON AIR</span> · <span>Born Ready</span> · <span>Caller:</span> <b class="caller">${esc(st.name)}</b></div>
      <p class="rf-end"><span>Remi's ending:</span> <b>${esc(e.title)}</b></p>
      ${PROMPTS.map((p, k) => `<div class="wq"${pg >= 0 && k !== pg ? " hidden" : ""}><label for="w_${p.id}">${esc(p.label)}</label><p class="stem"><b>Start like this:</b> <span class="starter">${esc(p.stem)}</span></p><textarea id="w_${p.id}" rows="3" data-starter="${esc(isEs() ? T(p.stem) : p.stem)}">${esc(st.writing[p.id] || "")}</textarea></div>`).join("")}
      ${pg === 0 ? `<button type="button" class="big" id="w1Next"><span>Next answer</span> →</button>` : `<button type="button" class="big" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>`}
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      ${st.turnedIn ? `<p class="turned" id="turnedTag">✓ Turned in</p>` : ""}</div></section>`;
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", ev => { st.writing[p.id] = ev.target.value; save(); }));
    if (pg === 0) $("w1Next").onclick = () => {
      const prob = writingProblem(PROMPTS[0]), msg = $("sendMsg");
      if (prob) { msg.textContent = prob; msg.className = /^(For|En) /.test(prob) ? "msg" : "msg bad"; $("w_" + PROMPTS[0].id).focus(); return; }
      st.wpage = 1; save(); render(); const b = $("w_" + PROMPTS[1].id); if (b) b.focus();
    };
    else $("sendBtn").onclick = send;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem(p) {
    const box = $("w_" + p.id), v = (box.value || "").trim();
    const es = isEs();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: es ? T(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
      if (junk) return (es ? "En " + T(p.short) : "For " + p.short) + ": " + junk;
    }
    if (v.length < p.min) return "Write a little more for: " + p.short + " (1–2 full sentences).";
    if (/_{2,}/.test(v)) return "Fill in the blanks with your own words for: " + p.short + ".";
    const stemText = String(p.stem) + " " + T(p.stem);
    const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
    const fresh2 = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (fresh2.size < 5) return "Add more of your own ideas for: " + p.short + ". Use details from today.";
    let groups = p.mustAll.slice();
    const esWords = window.SiteLang && window.SiteLang.must && window.SiteLang.must(p.id);
    if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
    if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return p.mustMsg;
    return "";
  }
  function buildAnswers() {
    const a = { "Standard": STANDARD };
    const right = CHECKS.filter(c => st.done[c.id] && !st.wrong[c.id]).length;
    a["First-try correct"] = right + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    a["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECKS.forEach(c => { const w = st.wrong[c.id] || 0; a[c.short] = c.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    STEPS.forEach(s => {
      if (s.type === "place") {
        const slots = s.slots.concat(SK.map(x => CATCH(x.k)));
        a["Choice · " + s.age + " tokens"] = (st.place[s.id] || []).map(id => { const x = slots.find(y => y.id === id); return x ? x.name + (x.gene ? " (Gene's shortcut, +0)" : "") : id; }).join(", ") || "—";
      }
      if (s.type === "event" && st.ev[s.id] != null) a["Choice · " + s.age + " · " + s.title] = s.choices[st.ev[s.id]].name;
    });
    const e = ENDINGS[st.ending];
    a["Ending"] = e ? e.title : "";
    a["Caused by"] = causedBy(st.ending).map(x => x.age + ": " + x.txt + (x.sk ? " " + skName(x.sk) : "") + (x.zero ? " (+0)" : "")).join(" · ") || "—";
    a["Final skills (out of 6)"] = SK.map(x => x.name + " " + st.sk[x.k]).join(" · ");
    a["Gene shortcuts taken"] = String(["s1", "s2"].filter(id => { const s = stepById(id); return s.slots.some(x => x.gene && (st.place[id] || []).includes(x.id)); }).length);
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }
  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    for (const p of PROMPTS) {
      const prob = writingProblem(p);
      if (prob) { msg.textContent = prob; msg.className = /^(For|En) /.test(prob) ? "msg" : "msg bad"; $("w_" + p.id).focus(); return; }
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in for this activity isn't switched on yet. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }
    btn.disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      btn.textContent = "Turned in ✓"; btn.disabled = false;
      if (!$("turnedTag")) msg.insertAdjacentHTML("afterend", `<p class="turned" id="turnedTag">✓ Turned in</p>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; btn.disabled = false; }
  }

  // ---------------- Render ----------------
  let first = true;
  function render() {
    if (!first) $("welcome").hidden = true;
    first = false;
    hud();
    app.classList.toggle("anim", anim);
    const s = st.step >= 0 ? STEPS[st.step] : null;
    try {
      if (!s) return intro();
      if (s.type === "place") return placeView(s);
      if (s.type === "event") return eventView(s);
      if (s.type === "check") return checkView(s);
      if (s.type === "ending") { if (!st.ending) { st.ending = endingFor(st.sk); save(); } return endingView(s); }
      return writeView(s);
    } finally { anim = false; }
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    lastSk = null; lastHype = null; save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0) {
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " — you're on step " + (Math.min(st.step, TOTAL - 1) + 1) + " of " + TOTAL + ".")}</span> <button type="button" class="notyou" id="notYouBtn">Not you? Start fresh</button>`;
    $("welcome").hidden = false;
    // Start at the top so the welcome bar (and "Not you?") isn't hidden under the sticky status bar.
    try { history.scrollRestoration = "manual"; } catch (e) {}
    window.scrollTo(0, 0);
    // Shared Chromebooks: a different student wipes this saved game, first-try record, and saved name, then reloads clean.
    $("notYouBtn").onclick = () => {
      st = fresh();
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      try { localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      save(); location.reload();
    };
  }
  // Read-only test hook (lets automated tests see progress). Students never see it.
  window.__raiseRemi = { get state() { return JSON.parse(JSON.stringify(st)); }, steps: STEPS.map(s => s.id) };
  render();
})();
