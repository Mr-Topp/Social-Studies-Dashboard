// =====================================================================
//  TEEN COURT: RULE BREAKERS  (Sociology Unit 3 · Day 3 · SS.9-12.Soc.4, SS.9-12.Soc.9)
//  The student is the judge. Three made-up teens come before the bench.
//  Each case: read the file through a theory lens (an evidence check), then play ONE
//  sanction card. Tough cards build Town trust now but stamp labels that stick:
//  6 months later labeled / unfixed teens come back to court, 5 years later a record
//  cuts job callbacks (Pager 2003). "Fix the cause" cards keep teens out but cost trust,
//  and if trust falls too far, Councilman Briggs (rival) gets you voted off the bench.
//  Then a real sealed file: Edna Griffin / Katz Drug Store (Des Moines 1948) + Greensboro 1960.
//  6 in-world evidence checks (2 Soc.4, 4 Soc.9), 3 rulings, 3 endings, 2 writing answers.
//  Turn-in via shared/turnin.js (same assignmentId as the old quiz version).
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u3-d3-break-a-rule-v2";
  const ASSIGNMENT_ID = "soc-u3-d3-break-a-rule";
  const TITLE = "Sociology · Unit 3 · Day 3 · Can Breaking a Rule Be Right?";
  const STANDARD = "SS.9-12.Soc.4, SS.9-12.Soc.9";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;   // seconds locked after a wrong answer
  const READ = 3;   // seconds before choices open (no click-through)
  const START_TRUST = 5;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // ---------------- The teens (made up) ----------------
  const TEENS = {
    tyler: { face: "🧑🏼", icon: "🚗", name: "Tyler", full: "Tyler R., 16", town: "Marion", charge: "SPEEDING" },
    kenzie: { face: "👧🏾", icon: "🎧", name: "Kenzie", full: "Kenzie M., 17", town: "Cedar Rapids", charge: "SELLING STOLEN GOODS" },
    jordan: { face: "🧑🏽", icon: "🎨", name: "Jordan", full: "Jordan T., 16", town: "Cedar Rapids", charge: "VANDALISM" }
  };
  const ORDER = ["tyler", "kenzie", "jordan"];
  const TAGS = { RECKLESS: "bad", RECORD: "bad", TROUBLEMAKER: "bad", EMPLOYED: "good", ARTIST: "good" };

  // ---------------- Sanction cards ----------------
  // fix: true = the card fixes the cause the lens found (teen stays out later).
  const CARDS = {
    tyler: [
      { id: "license", icon: "🪪", name: "Pull his license", line: "No driving for 90 days", type: "FORMAL 👎", trust: 2, tag: "RECKLESS",
        res: "No car means no job, and more time with his crew.", stamp: "LABELED", briggs: "Finally, a judge with a spine.",
        reveal: "<b>Formal sanction</b>: an official punishment from a group with power.", back: "Lost his job, more crew time" },
      { id: "class", icon: "🎓", name: "Class + crash victims", line: "Hear families hurt by speeders", type: "FORMAL 👎", trust: -1, fix: "👥",
        res: "He keeps his job, and a mom's story hits him hard.", stamp: "SENTENCED", briggs: "A CLASS? He could have killed someone!",
        reveal: "<b>Formal sanction</b> that changes who Tyler learns from.", back: "New people, new norm" },
      { id: "warn", icon: "🏠", name: "Warning only", line: "Parents handle it at home", type: "INFORMAL 👎", trust: -2,
        res: "His parents take his keys, but the 🔥 comments keep coming.", stamp: "WARNED", briggs: "Youth court = free pass.",
        reveal: "<b>Informal sanction</b>: from family, not officials. Weaker than 41K likes.", back: "Likes beat a weak warning" }
    ],
    kenzie: [
      { id: "charge", icon: "⚖️", name: "Theft charge", line: "Juvenile court, on her record", type: "FORMAL 👎", trust: 2, tag: "RECORD",
        res: "Now she has a record at 17, and still no job.", stamp: "CHARGED", briggs: "Good. Rules are rules.",
        reveal: "<b>Label</b>: the court just named her an offender. Names stick.", back: "Record, still no job" },
      { id: "job", icon: "💼", name: "Job program payback", line: "Work to repay all 14 buyers", type: "FORMAL 👎", trust: -1, tag: "EMPLOYED", fix: "🧗",
        res: "Her first real paychecks repay all $840 in 3 months.", stamp: "SENTENCED", briggs: "So now we give thieves JOBS?",
        reveal: "<b>Strain</b> shrinks when there's a legal path to the goal.", back: "Paycheck closed the gap" },
      { id: "letters", icon: "✉️", name: "Apology letters", line: "Plus 10 hours of service", type: "FORMAL 👎", trust: -2,
        res: "Buyers are mad: \"I'm out $60 and I get a letter?\"", stamp: "SENTENCED", briggs: "This is why nobody trusts youth court.",
        reveal: "<b>Social control</b> breaks down when sanctions feel too weak.", back: "Still broke, same strain" }
    ],
    jordan: [
      { id: "charge", icon: "⚖️", name: "Vandalism charge", line: "Juvenile court, on the record", type: "FORMAL 👎", trust: 2, tag: "RECORD",
        res: "Jordan shrugs: \"Told you. I'm the bad kid.\"", stamp: "CHARGED", briggs: "Charge every tagger. No exceptions.",
        reveal: "<b>Formal label</b>: \"troublemaker\" used to be talk. Now it's on paper.", back: "Acted the part: \"bad kid\"" },
      { id: "mural", icon: "🖌️", name: "Paint the city mural", line: "Work off $600 with the artist", type: "FORMAL 👎", trust: -2, tag: "ARTIST", drop: "TROUBLEMAKER", fix: "🏷️",
        res: "Jordan never misses a Saturday, and the artist calls Jordan a natural.", stamp: "SENTENCED", briggs: "Rewarding vandals with a paintbrush? Unreal.",
        reveal: "<b>Deviance is relative</b>: same spray paint, now it's \"art.\"", back: "New label: artist" },
      { id: "family", icon: "💵", name: "Family pays $600", line: "Nothing goes on the record", type: "INFORMAL 👎", trust: 1,
        res: "Grandma pays with rent money, but teachers still say \"troublemaker.\"", stamp: "PAID", briggs: "Well, at least somebody paid.",
        reveal: "<b>Stigma</b> stays: the old label never changed.", back: "Old label never changed" }
    ]
  };

  // ---------------- Evidence checks (FIRST option is right; screen shuffles) ----------------
  const CHECKS = {
    c1: { std: "Soc.9", short: "Tyler: conforms to crew, deviant to town", style: "stamp",
      q: "Stamp Tyler's file:", options: ["Conforms to crew · deviant to town", "Deviant to crew · deviant to town", "Conforms to town · deviant to crew", "Conforms to crew · conforms to town"],
      hint: "Reread Tyler's quote. What does his crew do?",
      stamp: "CONFORMS TO CREW", reveal: "<b>Differential association</b>: he learned it from his crew." },
    c2: { std: "Soc.9", short: "Likes and 🔥 = informal positive sanction", style: "key",
      q: "Tap the sanction the 🔥 comments gave Tyler.", options: ["INFORMAL|👍 reward", "FORMAL|👍 reward", "INFORMAL|👎 punishment", "FORMAL|👎 punishment"],
      hint: "Who posted 🔥: officials or everyday people? Reward or punishment?",
      stamp: "REWARDED", reveal: "<b>Informal positive sanction</b>: everyday people rewarding a behavior." },
    c3: { std: "Soc.4", short: "Kenzie = innovation (Merton's strain theory)", style: "merton",
      q: "Which box is Kenzie?", options: ["Innovation", "Conformity", "Ritualism", "Retreatism", "Rebellion"],
      hint: "Did Kenzie still want money? Did she use a legal way?",
      stamp: "INNOVATION", reveal: "<b>Strain</b>: society says chase money, then blocks some people's fair path." },
    c4: { std: "Soc.4", short: "Jordan = labeling theory (Becker)", style: "lens",
      q: "Equip the lens that explains Jordan:", options: ["🏷️|Labeling|A name that sticks", "👥|Differential association|Learned from friends", "🧗|Strain|A blocked goal", "⚙️|Functionalism|Deviance helps society"],
      hint: "Read Jordan's quote. What have people called Jordan for years?",
      stamp: "LABELING", reveal: "<b>Labeling theory</b> (Becker): once labeled, people may act the part." },
    c5: { std: "Soc.9", short: "Pager: a record cuts callbacks about in half", style: "plain",
      q: "What did a record do to callbacks?", options: ["Cut them about in half", "Barely changed them at all", "Doubled them for most men", "Only hurt men with bad résumés"],
      hint: "Compare each \"no record\" bar to the \"record\" bar under it.",
      stamp: "STIGMA", reveal: "<b>Stigma</b>: shame aimed at people seen as different." },
    c6: { std: "Soc.9", short: "Griffin: the store manager broke Iowa law", style: "person",
      q: "Who broke Iowa law?", options: ["🏪|The store manager", "✊|Edna Griffin", "🪧|The protesters", "⚖️|The jury"],
      hint: "Read the 1884 law. Who refused service?",
      stamp: "GUILTY", reveal: "<b>Deviance ≠ crime</b>: Griffin broke a rule, not a law." }
  };
  const CHECK_IDS = Object.keys(CHECKS);

  // ---------------- Steps (strict order) ----------------
  const STEPS = [
    { id: "t1", type: "file", teen: "tyler", check: "c1" },
    { id: "t2", type: "phone", check: "c2" },
    { id: "t3", type: "rule", teen: "tyler" },
    { id: "k1", type: "file", teen: "kenzie", check: "c3" },
    { id: "k2", type: "rule", teen: "kenzie" },
    { id: "j1", type: "file", teen: "jordan", check: "c4" },
    { id: "j2", type: "rule", teen: "jordan" },
    { id: "later", type: "later" },
    { id: "jobs", type: "jobs", check: "c5" },
    { id: "griffin", type: "archive", check: "c6" },
    { id: "gboro", type: "gboro" },
    { id: "end", type: "ending" },
    { id: "write", type: "write" }
  ];
  const TOTAL = STEPS.length;

  // ---------------- Endings ----------------
  const ENDINGS = {
    fair: { icon: "⚖️", title: "The Fair Judge", stamp: "RE-ELECTED", good: true,
      text: "The town still trusts your court. Most of your teens stayed out of trouble. You fixed causes, not just behavior." },
    hammer: { icon: "🔨", title: "The Hammer", stamp: "TOUGH ON PAPER", good: false,
      text: "The town cheered your tough calls. But labels stuck, teens came back, and records cost them jobs." },
    recalled: { icon: "📉", title: "Voted Off the Bench", stamp: "RECALLED", good: false,
      text: "The town stopped trusting your court. Briggs got you voted out." }
  };

  const PROMPTS = [
    { id: "theory", short: "Which theory explains it best", label: "Pick Tyler, Kenzie, or Jordan. Which theory best explains why they broke the rule? Who taught them?",
      stem: "___ explains ___'s case best because ___. The one who taught it was ___.", min: 70,
      mustAll: [["strain", "merton", "innovat", "sherif", "conform", "ritual", "differential", "association", "sutherland", "label", "becker", "functional", "durkheim", "conflict"], ["tyler", "kenzie", "jordan"], ["because", "since", "so "], ["friend", "crew", "peer", "family", "parent", "mom", "dad", "grandma", "media", "online", "social", "tiktok", "video", "like", "comment", "school", "teacher", "people", "society"]],
      mustMsg: "Name a theory (differential association, strain, or labeling), name Tyler, Kenzie, or Jordan, explain with \"because,\" and say who taught it (friends, family, school, media…)." },
    { id: "right", short: "Can breaking a rule be right", label: "Can breaking a rule be right? Use Edna Griffin or the Greensboro sit-in.",
      stem: "Breaking a rule can be right when ___. For example, ___.", min: 60,
      mustAll: [["griffin", "edna", "katz", "greensboro", "woolworth", "sit-in", "sit in", "sat", "counter", "students"], ["unfair", "law", "change", "changed", "equal", "race", "racis", "segregat", "black", "rights", "serve", "served", "discriminat"]],
      mustMsg: "Name Edna Griffin or the Greensboro sit-in, and say what was unfair or what changed." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ v: 1, name: "", step: -1, trust: START_TRUST, rule: {}, tags: { jordan: ["TROUBLEMAKER"] }, back: null, done: {}, wrong: {}, gb: 0, ending: null, writing: {}, wpage: 0, turnedIn: false, log: [] });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 1 || !st.rule) st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts fresh.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    if (now && st.name && now !== st.name.trim().toLowerCase()) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  let anim = false;

  function addTrust(d, why) {
    const before = st.trust;
    st.trust = Math.max(0, Math.min(10, st.trust + d));
    st.log.push({ d: st.trust - before, why });
  }
  function addTag(teen, tag) { st.tags[teen] = st.tags[teen] || []; if (!st.tags[teen].includes(tag)) st.tags[teen].push(tag); }
  function dropTag(teen, tag) { st.tags[teen] = (st.tags[teen] || []).filter(t => t !== tag); }
  const cardOf = teen => st.rule[teen] ? CARDS[teen].find(c => c.id === st.rule[teen]) : null;
  const briggsMood = () => st.trust >= 7 ? "🙂" : st.trust >= 4 ? "😒" : st.trust >= 2 ? "😠" : "😡";
  const stayedOut = () => ORDER.filter(t => st.back && !st.back[t]).length;
  function endingFor() {
    if (st.trust <= 1) return "recalled";
    return stayedOut() >= 2 ? "fair" : "hammer";
  }

  // ---------------- HUD ----------------
  let lastTrust = null, lastTags = null;
  function tagHtml(t) { return `<span class="tag ${TAGS[t] || "bad"}">${esc(t)}</span>`; }
  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    document.body.classList.toggle("on-title", !show);
    if (!show) return;
    $("judgeName").textContent = st.name;
    const tagsNow = JSON.stringify(st.tags);
    const cur = STEPS[Math.min(st.step, TOTAL - 1)];
    $("docket").innerHTML = ORDER.map(k => {
      const t = TEENS[k];
      const on = cur.teen === k;
      const tags = (st.tags[k] || []);
      const status = st.back ? (st.back[k] ? `<span class="st back">BACK</span>` : `<span class="st out">OUT</span>`) : "";
      return `<div class="dk${on ? " on" : ""}${st.rule[k] ? " ruled" : ""}" id="dk_${k}"><span class="df" aria-hidden="true">${t.face}</span><span class="dtx"><b>${esc(t.name)}</b><span class="dtags">${tags.map(tagHtml).join("")}${status}</span></span></div>`;
    }).join("");
    if (lastTags && lastTags !== tagsNow) ORDER.forEach(k => { const el = $("dk_" + k); if (el && JSON.stringify((JSON.parse(lastTags)[k]) || []) !== JSON.stringify(st.tags[k] || [])) el.classList.add("flash"); });
    lastTags = tagsNow;
    $("trustFill").style.width = (st.trust * 10) + "%";
    $("trustFill").className = st.trust <= 2 ? "low" : st.trust >= 7 ? "high" : "";
    $("trustNum").textContent = st.trust + "/10";
    if (lastTrust != null && lastTrust !== st.trust) { const b = $("trustBox"); b.classList.remove("up", "down"); void b.offsetWidth; b.classList.add(st.trust > lastTrust ? "up" : "down"); }
    lastTrust = st.trust;
    $("bMood").textContent = briggsMood();
    $("stepCt").textContent = "Step " + Math.min(st.step + 1, TOTAL) + "/" + TOTAL;
  }
  function briggsBump(face) {
    const b = $("briggsBox"); if (!b) return;
    if (face) $("bMood").textContent = face;
    b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  }

  // ---------------- Pieces ----------------
  const app = $("app");
  function say(who, face, t, cls) { return `<div class="say ${cls || ""}"><span class="sav" aria-hidden="true">${face}</span><div class="bub"><span class="bn">${esc(who)}</span><span class="bt">${esc(t)}</span></div></div>`; }
  const briggsSays = (t, cls) => say("Councilman Briggs", "👨🏻‍💼", t, "briggs-say " + (cls || ""));
  function revealHtml(t) { return t ? `<div class="reveal${anim ? " pop" : ""}"><span class="rh" aria-hidden="true">💡</span><p>${t}</p></div>` : ""; }
  function stampHtml(text, good) { return text ? `<span class="stamp ${good ? "good" : "bad"}${anim ? " slam" : ""}">${esc(text)}</span>` : ""; }
  function nextBtn(label) { return `<button type="button" class="next" id="nextBtn"><span>${esc(label || "Next")}</span> →</button>`; }
  function wireNext() { const b = $("nextBtn"); if (b) b.onclick = goNext; }
  function goNext() {
    st.step = Math.min(st.step + 1, TOTAL - 1);
    anim = true; save(); render(); window.scrollTo(0, 0);
  }
  function head(kicker, title) { return `<div class="shead"><span class="kick">${esc(kicker)}</span><h2>${esc(title)}</h2></div>`; }
  function readLock(btns, lockEl) {
    btns.forEach(b => b.disabled = true);
    let left = READ;
    const tick = () => {
      if (left <= 0) { btns.forEach(b => b.disabled = false); if (lockEl) { lockEl.textContent = ""; lockEl.className = "msg"; } return; }
      if (lockEl) { lockEl.textContent = "⏳ Read first… " + left; lockEl.className = "msg wait"; }
      left--; setTimeout(tick, 1000);
    };
    tick();
  }

  // ---------------- Title ----------------
  function intro() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title-card">
      <p class="eyebrow">Sociology · Unit 3 · Day 3</p>
      <h1 class="big-title"><span class="t1">Teen Court</span><span class="t2">Rule Breakers</span></h1>
      <p class="hook">Three teens broke rules. You hold the gavel.</p>
      <div class="title-cast" aria-hidden="true">
        ${ORDER.map(k => `<div class="tc"><span class="af">${TEENS[k].face}</span><b>${TEENS[k].name}</b><small>${TEENS[k].icon}</small></div>`).join("")}
        <div class="tc rival"><span class="af">👨🏻‍💼</span><b>Briggs</b><small>Your rival</small></div>
      </div>
      <ul class="how"><li><span aria-hidden="true">🔍</span> <span>Read files with theory lenses</span></li><li><span aria-hidden="true">🃏</span> <span>Play one sanction card</span></li><li><span aria-hidden="true">🏷️</span> <span>Labels follow teens</span></li></ul>
      <div class="title-tiles"><span>🃏 <b>3</b> rulings</span><span>🔍 <b>6</b> evidence checks</span><span>✍️ <b>2</b> short answers</span><span>⏱ <b>25</b> minutes</span><span>🏁 <b>3</b> endings</span></div>
      <p class="goal"><b>Today's goal:</b> Explain deviance vs. conformity, why people break rules, and how society reacts.</p>
      <div class="title-start"><div class="namebox"><label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(pre)}"></div>
        <button type="button" class="big" id="startBtn"><span>Open court</span> <span aria-hidden="true">🔨</span></button></div>
      <p id="introMsg" class="msg" role="status"></p>
      <p class="small-print"><b>SS.9-12.Soc.4</b> Explain the sociological theories that are the basis of sociology. <b>SS.9-12.Soc.9</b> Describe the process of socialization across the life course.</p>
      <p class="small-print">The court, Briggs, and the three teens are made up. The studies and history are real.</p></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ \p{Lu}\.$/u.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      try { if (window.classClaimDevice) window.classClaimDevice(fixed); } catch (e) {}
      st.name = fixed; st.step = 0; anim = true; save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Evidence check (any style) ----------------
  let locked = false;
  function optHtml(c, t) {
    if (c.style === "key") { const [a, b] = t.split("|"); return `<span class="k-${a === "FORMAL" ? "f" : "i"}"><span class="kt">${a === "FORMAL" ? "🏛️" : "👥"} ${esc(a)}</span><span class="kb">${esc(b)}</span></span>`; }
    if (c.style === "lens") { const [i, n, l] = t.split("|"); return `<span class="lensi" aria-hidden="true">${i}</span><span class="lensn">${esc(n)}</span><span class="lensl">${esc(l)}</span>`; }
    if (c.style === "person") { const [i, n] = t.split("|"); return `<span class="pi" aria-hidden="true">${i}</span><span>${esc(n)}</span>`; }
    if (c.style === "merton") { const m = MERTON[t]; return `<span class="mn">${esc(t)}</span><span class="mg">${m[0]} <small>goal</small></span><span class="mg">${m[1]} <small>legal way</small></span>`; }
    if (c.style === "stamp") { const [a, b] = t.split(" · "); return `<span class="sa">${esc(a)}</span><span class="sb">${esc(b)}</span>`; }
    return `<span>${esc(t)}</span>`;
  }
  const plainOpt = (c, t) => c.style === "key" ? (t.startsWith("INFORMAL") ? "Informal " : "Formal ") + (t.includes("reward") ? "positive (reward)" : "negative (punishment)") : c.style === "lens" ? t.split("|")[1] : c.style === "person" ? t.split("|")[1] : t;
  const MERTON = { Conformity: ["✅", "✅"], Innovation: ["✅", "❌"], Ritualism: ["❌", "✅"], Retreatism: ["❌", "❌"], Rebellion: ["🔄", "🔄"] };
  // Draws the check into #qc. Calls onRight() after a right answer.
  function mountCheck(id, shakeId) {
    const c = CHECKS[id];
    const area = $("qc"), fb = $("qmsg");
    if (!area) return;
    let lastOrder = "";
    function draw(lockFirst) {
      area.innerHTML = "";
      area.className = "opts opts-" + c.style;
      let order = shuffle(c.options.map((t, n) => ({ t, n })));
      if (lastOrder) { let tries = 0; while (order.map(o => o.n).join() === lastOrder && tries++ < 20) order = shuffle(order); }
      lastOrder = order.map(o => o.n).join();
      const btns = order.map(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "opt opt-" + c.style;
        b.innerHTML = optHtml(c, o.t);
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            st.done[id] = true;
            if (window.classFirstTry) window.classFirstTry.right(id);
            anim = true; save(); render();
            const n = $("nextBtn") || $("hand"); if (n && n.scrollIntoView) n.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
          st.wrong[id] = (st.wrong[id] || 0) + 1;
          if (window.classFirstTry) window.classFirstTry.wrong();
          save(); briggsBump("😏");
          const ev = $(shakeId || "evidence"); if (ev) { ev.classList.remove("shake"); void ev.offsetWidth; ev.classList.add("shake"); }
          locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = LOCK;
          const tick = () => {
            if (left <= 0) { locked = false; fb.textContent = "🔍 " + c.hint; fb.className = "msg"; $("bMood").textContent = briggsMood(); draw(false); return; }
            fb.textContent = "😏 Briggs smirks. " + c.hint + " New order in " + left + "…"; fb.className = "msg bad";
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
  function checkBlock(id) {
    const c = CHECKS[id];
    if (st.done[id]) return `<div class="solved">${stampHtml(c.stamp, true)}<p class="ans"><span aria-hidden="true">✔</span> ${esc(plainOpt(c, c.options[0]))}</p></div>${revealHtml(c.reveal)}`;
    return `<div class="ask"><p class="q"><span aria-hidden="true">🔍</span> ${esc(c.q)}</p><div id="qc"></div><p class="msg" id="qmsg" aria-live="polite"></p></div>`;
  }

  // ---------------- Case file ----------------
  function fileBody(k) {
    if (k === "tyler") return `
      <ul class="chips"><li><span aria-hidden="true">🛒</span> Needs his car for his job</li></ul>
      ${say("Tyler", TEENS.tyler.face, "My whole crew drives like that. Now 60 feels normal.", "teen-say")}`;
    if (k === "kenzie") return `
      <ul class="chips"><li><span aria-hidden="true">🎧</span> Sold 14 stolen AirPods online</li><li><span aria-hidden="true">📄</span> Applied to 11 jobs. 0 calls back.</li></ul>
      ${say("Kenzie", TEENS.kenzie.face, "I just wanted to pay my phone bill.", "teen-say")}`;
    return `
      <div class="walls"><div class="wall bad"><span class="wi" aria-hidden="true">🛹🎨</span><b>Skate park wall</b><span class="wv">🚨 VANDALISM</span></div><div class="wall good"><span class="wi" aria-hidden="true">🅿️🎨</span><b>City garage</b><span class="wv">💰 PAID MURAL</span></div></div>
      <ul class="chips"><li><span aria-hidden="true">🗣️</span> Called "troublemaker" since 7th grade</li></ul>
      ${say("Jordan", TEENS.jordan.face, "Everybody thinks I'm the bad kid. So why try?", "teen-say")}`;
  }
  function tools(k) {
    if (k === "tyler") return `<div class="gloss"><span><b>Deviance</b> = breaking a norm</span><span><b>Conformity</b> = following your group's norms</span></div>`;
    if (k === "kenzie") return `<div class="lensbar"><span class="lb-i" aria-hidden="true">🧗</span><span><b>Strain lens</b> (Merton): <span>🎯 = wants the goal · 📜 = uses legal ways</span></span></div>`;
    return "";
  }
  function fileView(s) {
    const k = s.teen, t = TEENS[k];
    const titles = { tyler: "62 in a 35", kenzie: "The AirPods Hustle", jordan: "The Skate Park Wall" };
    const n = ORDER.indexOf(k) + 1;
    const done = !!st.done[s.check];
    app.innerHTML = `<section class="scene filescene">${head("Case " + n + " of 3", titles[k])}
      <div class="two">
        <div class="folder" id="evidence"><span class="ftab">CASE FILE #${n}</span><span class="charge">${esc(t.charge)}</span>
          <div class="who"><span class="bigface" aria-hidden="true">${t.face}</span><div><b>${esc(t.full)}</b><small>${esc(t.town)} · first offense</small></div></div>
          ${fileBody(k)}
        </div>
        <div class="side">${done ? "" : tools(k)}${checkBlock(s.check)}${done ? nextBtn(k === "tyler" ? "Check his phone" : "To the bench") : ""}</div>
      </div>
      <p class="src">Made-up case.</p></section>`;
    if (!done) mountCheck(s.check);
    else wireNext();
  }

  // ---------------- Tyler's phone ----------------
  function phoneView(s) {
    const done = !!st.done.c2;
    app.innerHTML = `<section class="scene phonescene">${head("Case 1 of 3", "41,000 Views")}
      <div class="two">
        <div class="phone" id="evidence"><div class="ph-top"><span>9:41</span><span>📶 🔋</span></div>
          <div class="post"><div class="vid" aria-hidden="true"><span class="road"></span><span class="car">🚗💨</span><span class="speedo">62</span></div>
            <p class="cap"><b>@ty.r_drives</b> 62 in a 35 😤</p><p class="stats"><span>👁 41K</span><span>❤️ 6.2K</span></p>
            <ul class="cmts"><li><b>@jjay</b> LEGEND 🔥🔥</li><li><b>@carmeet_cr</b> send it 🔥</li><li><b>@mkz</b> goat 🐐</li></ul></div></div>
        <div class="side">${briggsSays("Nobody punished him. The internet threw a party.")}
          ${done ? checkBlock("c2") : `<p class="keyh">Key: <span>🏛️ formal = officials · 👥 informal = everyday people</span></p>` + checkBlock("c2")}
          ${done ? nextBtn("To the bench") : ""}</div>
      </div></section>`;
    if (!done) mountCheck("c2");
    else wireNext();
  }

  // ---------------- The bench: play a sanction card ----------------
  function fxRow(c, after) {
    const tr = `<span class="fx ${c.trust > 0 ? "up" : "down"}">🏛️ ${c.trust > 0 ? "+" : "−"}${Math.abs(c.trust)}</span>`;
    const tg = c.tag ? `<span class="fx tagfx ${TAGS[c.tag]}">🏷️ ${esc(c.tag)}</span>` : "";
    const fix = c.fix && after ? `<span class="fx fix">${c.fix} fixes the cause</span>` : "";
    return tr + tg + fix;
  }
  function ruleView(s) {
    const k = s.teen, t = TEENS[k];
    const picked = cardOf(k);
    const lens = { tyler: "👥 Lens: learned it from his crew", kenzie: "🧗 Lens: blocked path to money", jordan: "🏷️ Lens: a label that stuck" };
    const asks = { tyler: "Take his license. Period.", kenzie: "Charge her. A thief is a thief.", jordan: "Charge every tagger. No exceptions." };
    st.order = st.order || {};
    if (!st.order[k]) { st.order[k] = shuffle(CARDS[k].map(c => c.id)); save(); }
    const cards = st.order[k].map(id => CARDS[k].find(c => c.id === id));
    let h = `<section class="scene benchscene">${head("Case " + (ORDER.indexOf(k) + 1) + " of 3 · Your ruling", t.name + " stands before you")}
      <div class="bench" aria-hidden="true"><span class="gavel${picked && anim ? " bang" : ""}">🔨</span><span class="seal">⚖️ CORRIDOR YOUTH COURT</span><span class="defendant">${t.face}</span></div>`;
    if (!picked) {
      h += `<div class="ruling-top">${briggsSays(asks[k])}<p class="lenschip">${esc(lens[k])}</p><p class="play">🃏 Play one card. <small>🏛️ = town trust (1 or less = voted out) · 🏷️ = label that sticks</small></p></div>
        ${k === "tyler" ? `<p class="study"><span class="real">REAL STUDY</span> <b>Sherif, 1935:</b> in groups, people built one shared "normal." Alone later, they kept it.</p>` : ""}
        <div class="hand" id="hand">${cards.map(c => `<button type="button" class="scard" data-id="${c.id}"><span class="ctype ${c.type.startsWith("FORMAL") ? "f" : "i"}">${esc(c.type)}</span><span class="ci" aria-hidden="true">${c.icon}</span><span class="cn">${esc(c.name)}</span><span class="cl">${esc(c.line)}</span><span class="fxs">${fxRow(c, false)}</span></button>`).join("")}</div>
        <p class="msg" id="rmsg"></p></section>`;
      app.innerHTML = h;
      const btns = Array.from(app.querySelectorAll(".scard"));
      btns.forEach(b => b.onclick = () => playCard(k, b.dataset.id));
      readLock(btns, $("rmsg"));
      return;
    }
    h += `<div class="hand done">${cards.map(c => `<div class="scard ${c.id === picked.id ? "picked" : "faded"}${c.id === picked.id && anim ? " flip" : ""}"><span class="ctype ${c.type.startsWith("FORMAL") ? "f" : "i"}">${esc(c.type)}</span><span class="ci" aria-hidden="true">${c.icon}</span><span class="cn">${esc(c.name)}</span>${c.id === picked.id ? `<span class="fxs">${fxRow(c, true)}</span>` : ""}</div>`).join("")}</div>
      <div class="outcome">${stampHtml(picked.stamp, !!picked.fix)}<p class="res">${esc(picked.res)}</p>${briggsSays(picked.briggs)}${revealHtml(picked.reveal)}${nextBtn(k === "jordan" ? "6 months later…" : "Next case")}</div></section>`;
    app.innerHTML = h; wireNext();
  }
  function playCard(k, id) {
    if (st.rule[k]) return;
    const c = CARDS[k].find(x => x.id === id);
    st.rule[k] = id;
    addTrust(c.trust, TEENS[k].name + ": " + c.name);
    if (c.tag) addTag(k, c.tag);
    if (c.drop) dropTag(k, c.drop);
    anim = true; save(); render(); briggsBump();
  }

  // ---------------- 6 months later: who comes back? ----------------
  function settleLater() {
    if (st.back) return;
    st.back = {};
    ORDER.forEach(k => {
      const c = cardOf(k);
      const back = !(c && c.fix);
      st.back[k] = back;
      if (back) { addTrust(-2, TEENS[k].name + " back in court"); addTag(k, "RECORD"); }
    });
    save();
  }
  function laterView() {
    const first = !st.back;
    settleLater();
    const nBack = ORDER.filter(k => st.back[k]).length;
    const labeledBack = ORDER.some(k => st.back[k] && cardOf(k) && cardOf(k).tag);
    const reveal = nBack === 0 ? "<b>Social control</b> works best when it fixes the cause."
      : labeledBack ? "<b>Labeling theory</b>: the label turned into the behavior."
      : "<b>Weak sanctions</b> didn't fix the cause, so the deviance came back.";
    app.innerHTML = `<section class="scene laterscene">${head("6 months later", "Back in court?")}
      <div class="returns">${ORDER.map((k, i) => {
        const c = cardOf(k), back = st.back[k];
        return `<div class="rcard ${back ? "back" : "out"}${first ? " deal d" + i : ""}"><span class="rf" aria-hidden="true">${TEENS[k].face}</span><b>${esc(TEENS[k].name)}</b><span class="rc"><span aria-hidden="true">${c.icon}</span> ${esc(c.name)}</span><span class="rstamp">${back ? "BACK IN COURT" : "STAYED OUT"}</span><span class="why">${esc(c.back)}</span>${back ? `<span class="fx down">🏛️ −2</span>` : ""}</div>`;
      }).join("")}</div>
      <div class="late${first ? " delay" : ""}">${briggsSays(nBack ? "Repeat offenders! What is this court doing?" : "Huh. Not one of them came back.")}${revealHtml(reveal)}${nextBtn("5 years later…")}</div></section>`;
    wireNext();
    if (first) setTimeout(() => briggsBump(), 1600);
  }

  // ---------------- 5 years later: job fair (Pager 2003) ----------------
  function jobsView(s) {
    const done = !!st.done.c5;
    const bars = [["White, no record", 34, 0], ["White, with a record", 17, 1], ["Black, no record", 14, 0], ["Black, with a record", 5, 1]];
    let h = `<section class="scene jobscene">${head("5 years later", "The Job Fair")}
      <div class="two">
        <div class="board" id="evidence"><p class="evh"><span class="real">REAL STUDY</span> Devah Pager · Milwaukee · 2003</p>
          <p class="bsub">Same résumés. One difference: a criminal record. % called back:</p>
          ${bars.map(b => `<div class="brow${b[2] ? " rec" : ""}"><span class="bl">${esc(b[0])}</span><span class="btr"><span style="width:${b[1] * 2.5}%"></span></span><b>${b[1]}%</b></div>`).join("")}
          <p class="src">Source: Pager, "The Mark of a Criminal Record," American Journal of Sociology, 2003.</p></div>
        <div class="side">${checkBlock("c5")}`;
    if (done) {
      h += `<div class="phones">${ORDER.map(k => { const rec = (st.tags[k] || []).includes("RECORD"); return `<div class="jp ${rec ? "no" : "yes"}"><span aria-hidden="true">${TEENS[k].face}</span><b>${esc(TEENS[k].name)}</b><span>${rec ? "📵 Fewer calls" : "📞 Callback!"}</span></div>`; }).join("")}</div>${nextBtn("Open the sealed file")}`;
    }
    h += `</div></div></section>`;
    app.innerHTML = h;
    if (!done) mountCheck("c5"); else wireNext();
  }

  // ---------------- Sealed file: Edna Griffin, Des Moines 1948 (REAL) ----------------
  function archiveView(s) {
    const done = !!st.done.c6;
    app.innerHTML = `<section class="scene archscene">${head("Sealed file · Real history", "Des Moines, Iowa, 1948")}
      ${done ? "" : briggsSays("Rule breakers are always wrong.")}
      <div class="two">
        <div class="archive" id="evidence"><span class="real big">REAL</span>
          <ol class="tl"><li><span class="d">July 7, 1948</span><span>Katz Drug Store won't serve <b>Edna Griffin</b> because she's Black.</span></li>
            <li class="law"><span class="d">Iowa law, 1884</span><span>No refusing service because of race.</span></li>
            <li><span class="d">1948–49</span><span>Griffin leads sit-ins and protests.</span></li>
            <li class="verdict"><span class="d">Jury verdict</span><span>GUILTY</span></li></ol>
          <p class="src">The store manager was fined $50. The Iowa Supreme Court upheld the verdict in December 1949. Sources: State v. Katz, Iowa Supreme Court (1949); BlackPast, "Katz Drugstore Sit-In Protests, Des Moines (1948–1949)."</p></div>
        <div class="side">${checkBlock("c6")}${done ? nextBtn("One more file") : ""}</div>
      </div></section>`;
    if (!done) mountCheck("c6"); else wireNext();
  }

  // ---------------- Greensboro 1960 (REAL) ----------------
  const GB = [
    { d: "Feb 1, 1960", t: "Four Black college students sit at a \"whites only\" counter." },
    { d: "Feb–Mar 1960", t: "By March's end: sit-ins in 55 cities, 13 states." },
    { d: "July 25, 1960", t: "The Greensboro counter serves Black customers." }
  ];
  function gboroView() {
    const n = st.gb || 0;
    const people = n >= 1 ? ["Ezell Blair Jr.", "Franklin McCain", "Joseph McNeil", "David Richmond"] : [];
    const stools = n >= 2 ? 8 : 4;
    app.innerHTML = `<section class="scene gbscene">${head("Sealed file · Real history", "Greensboro, North Carolina, 1960")}
      <div class="counter" aria-hidden="true"><div class="sign">${n >= 3 ? "OPEN TO ALL" : "WHITES ONLY"}</div><div class="top"></div>
        <div class="stools">${Array.from({ length: stools }, (_, i) => `<span class="stool${n >= 1 && i < 4 ? " sat" : ""}${n >= 2 && i >= 4 ? " sat more" : ""}">${(n >= 1 && i < 4) || (n >= 2 && i >= 4) ? "🧑🏾" : ""}<i></i></span>`).join("")}</div></div>
      ${people.length ? `<p class="names">${people.map(esc).join(" · ")}</p>` : ""}
      <ol class="tl gb">${GB.slice(0, n).map((g, i) => `<li class="${i === n - 1 && anim ? "pop" : ""}"><span class="d">${esc(g.d)}</span><span>${esc(g.t)}</span></li>`).join("")}</ol>
      ${n < 3 ? `<button type="button" class="next clock" id="gbBtn"><span aria-hidden="true">🕰️</span> <span>${n === 0 ? "Open the file" : "Next date"}</span></button>`
        : `${revealHtml("<b>Functionalism</b> (Durkheim): deviance can push society to change.")}<p class="src">Sources: Smithsonian National Museum of American History, "Greensboro Lunch Counter"; History.com, "The Greensboro Sit-In."</p>${nextBtn("See your court record")}`}
      </section>`;
    if (n < 3) $("gbBtn").onclick = () => { st.gb = n + 1; anim = true; save(); render(); };
    else wireNext();
  }

  // ---------------- Ending ----------------
  function causedBy() {
    const out = ORDER.map(k => { const c = cardOf(k); return { icon: TEENS[k].icon, txt: TEENS[k].name + ": " + (c ? c.name : "—"), res: st.back && st.back[k] ? "came back" : "stayed out", good: !(st.back && st.back[k]) }; });
    out.push({ icon: "🏛️", txt: "Town trust ended at " + st.trust + "/10", res: "", good: st.trust > 1 });
    return out;
  }
  function endingView() {
    if (!st.ending) { st.ending = endingFor(); save(); }
    const e = ENDINGS[st.ending];
    const extra = st.ending === "recalled" ? (stayedOut() >= 2 ? " Your teens did fine. The town didn't see it." : " And your teens came back anyway.") : "";
    const cb = causedBy();
    app.innerHTML = `<section class="scene ending ${e.good ? "good" : "bad"}">
      <div class="end-hero"><span class="end-icon${anim ? " swing" : ""}" aria-hidden="true">${e.icon}</span>
        <div class="end-words"><p class="pk">Ending · 1 of 3</p><h2 class="end-title">${esc(e.title)}</h2>${stampHtml(e.stamp, e.good)}</div></div>
      <p class="end-text">${esc(e.text + extra)}</p>
      <div class="caused"><p class="chh">Caused by</p><ul>${cb.map(x => `<li class="${x.good ? "g" : "b"}"><span aria-hidden="true">${x.icon}</span> <span>${esc(x.txt)}</span>${x.res ? ` <b>→ ${esc(x.res)}</b>` : ""}</li>`).join("")}</ul></div>
      ${briggsSays(st.ending === "recalled" ? "Told you. The town wants tough judges." : st.ending === "hammer" ? "Now THAT'S a court. Lock 'em up." : "Fine. Your way kept them out.")}
      ${nextBtn("Write your opinion")}</section>`;
    wireNext();
  }

  // ---------------- Writing + turn in ----------------
  function writeView() {
    const e = ENDINGS[st.ending] || ENDINGS.fair;
    const pg = st.turnedIn ? -1 : (st.wpage || 0);
    app.innerHTML = `<section class="scene write"><div class="pad"><div class="pad-top"><span>⚖️ Judge's written opinion</span><b>${esc(st.name)}</b></div>
      <p class="rf-end">Your ending: <b>${esc(e.title)}</b></p>
      <div class="lensref" aria-label="Today's theories"><span>👥 Differential association</span><span>🧗 Strain</span><span>🏷️ Labeling</span><span>⚙️ Functionalism</span></div>
      ${PROMPTS.map((p, k) => `<div class="wq"${pg >= 0 && k !== pg ? " hidden" : ""}><label for="w_${p.id}">${k + 1}. ${esc(p.label)}</label><p class="stem"><b>Start like this:</b> <span class="starter">${esc(p.stem)}</span></p><textarea id="w_${p.id}" rows="3" data-starter="${esc(p.stem)}">${esc(st.writing[p.id] || "")}</textarea></div>`).join("")}
      ${pg === 0 ? `<button type="button" class="big" id="w1Next"><span>Next answer</span> →</button>` : `<button type="button" class="big" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>`}
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      ${st.turnedIn ? `<p class="turned" id="turnedTag">✓ Turned in</p>` : ""}</div></section>`;
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", ev => { st.writing[p.id] = ev.target.value; save(); }));
    if (pg === 0) $("w1Next").onclick = () => {
      const prob = writingProblem(PROMPTS[0]), msg = $("sendMsg");
      if (prob) { msg.textContent = prob; msg.className = /^For /.test(prob) ? "msg" : "msg bad"; $("w_" + PROMPTS[0].id).focus(); return; }
      st.wpage = 1; save(); render(); const b = $("w_" + PROMPTS[1].id); if (b) b.focus();
    };
    else $("sendBtn").onclick = send;
  }
  const DETAIL = {
    tyler: /speed|fast|driv|\bcars?\b|mph|\b6[02]\b|crew|normal|\blikes\b|comment|post|video|views|license|sherif/,
    kenzie: /airpod|stole|steal|sold|sell|job|money|bill|pay|hire|call ?back|appl(y|ied)|work|goal/,
    jordan: /troublemaker|bad kid|called|wall|paint|\btag|spray|graffiti|vandal|mural|skate|\bart/
  };
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem(p) {
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
      if (junk) return "For " + p.short + ": " + junk;
    }
    if (v.length < p.min) return "Write a little more for: " + p.short + " (1–2 full sentences).";
    if (/_{2,}/.test(v)) return "Fill in the blanks with your own words for: " + p.short + ".";
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const fresh2 = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (fresh2.size < 5) return "Add more of your own ideas for: " + p.short + ". Use details from today.";
    if (p.id === "theory") {
      const pv = plain(v), named = Object.keys(DETAIL).filter(k => pv.includes(k));
      if (named.length && !named.some(k => DETAIL[k].test(pv))) return "Add one detail from " + TEENS[named[0]].name + "'s case (what they did, or what people said or did).";
    }
    if (p.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return p.mustMsg;
    return "";
  }
  function buildAnswers() {
    const a = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => st.done[id] && !st.wrong[id]).length;
    a["First-try correct"] = right + " of " + CHECK_IDS.length;
    const byStd = {};
    CHECK_IDS.forEach(id => { const c = CHECKS[id]; byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[id]) byStd[c.std][0]++; });
    a["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECK_IDS.forEach(id => { const c = CHECKS[id], w = st.wrong[id] || 0; a[c.short] = plainOpt(c, c.options[0]) + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    ORDER.forEach(k => { const c = cardOf(k); a["Choice · Ruling on " + TEENS[k].name] = c ? c.name + " (" + c.type + (c.fix ? ", fixes the cause" : "") + ")" : "—"; });
    const e = ENDINGS[st.ending];
    a["Ending"] = e ? e.title : "";
    a["Caused by"] = causedBy().map(x => x.txt + (x.res ? " → " + x.res : "")).join(" · ");
    a["Town trust at the end"] = st.trust + " of 10";
    a["Teens back in court"] = ORDER.filter(k => st.back && st.back[k]).map(k => TEENS[k].name).join(", ") || "none";
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }
  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    for (const p of PROMPTS) {
      const prob = writingProblem(p);
      if (prob) {
        if (p.id !== PROMPTS[1].id && $("w_" + p.id).closest(".wq").hidden) { st.wpage = 0; save(); render(); const m2 = $("sendMsg"); m2.textContent = prob; m2.className = "msg bad"; return; }
        msg.textContent = prob; msg.className = /^For /.test(prob) ? "msg" : "msg bad"; $("w_" + p.id).focus(); return;
      }
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
      if (s.type === "file") return fileView(s);
      if (s.type === "phone") return phoneView(s);
      if (s.type === "rule") return ruleView(s);
      if (s.type === "later") return laterView(s);
      if (s.type === "jobs") return jobsView(s);
      if (s.type === "archive") return archiveView(s);
      if (s.type === "gboro") return gboroView(s);
      if (s.type === "ending") return endingView(s);
      return writeView(s);
    } finally { anim = false; hud(); }
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    lastTrust = null; lastTags = null; save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0) {
    const w = $("welcome");
    w.textContent = "Welcome back, " + st.name + " — you're on step " + (st.step + 1) + " of " + TOTAL + ".";
    // Shared Chromebooks: one tap erases the saved game on this device and starts clean.
    const notMe = document.createElement("button");
    notMe.type = "button"; notMe.className = "notme";
    notMe.textContent = "Not " + st.name + "? Start fresh";
    notMe.onclick = () => {
      try { localStorage.removeItem(KEY); localStorage.removeItem("site-student-name"); } catch (e) {}
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      st = fresh(); save(); location.reload();
    };
    w.appendChild(document.createTextNode(" ")); w.appendChild(notMe); w.hidden = false;
  }
  // Read-only test hook (lets automated tests see progress). Students never see it.
  window.__ruleBreakers = { get state() { return JSON.parse(JSON.stringify(st)); }, steps: STEPS.map(s => s.id) };
  render();
})();
