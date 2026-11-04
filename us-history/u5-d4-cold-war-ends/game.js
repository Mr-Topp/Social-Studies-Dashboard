// =====================================================================
//  WHO ENDED THE COLD WAR?  (U.S. History · Unit 5 · Day 3)
//  Polish of the original UnitGame version (same premise): you're the
//  historian with three case files on your desk: A Reagan's pressure,
//  B Gorbachev's reforms, C People power. 7 evidence checks file cards
//  into a fixed file; 3 tricky cards you file yourself. Bigger files
//  decide your verdict (4 endings). ⚖️ Case strength rises with solved
//  checks and drops with wrong guesses; the Skeptic (a made-up rival
//  historian) reacts. U.S. view on purpose (Reagan, arms race, summits,
//  glasnost, the freeze marches). World History U2 D8 "1989: How Does a
//  Wall Come Down?" tells the East Berlin street story.
//  ⚡ Lightning Round after the ending: 7 one-tap Unit 5 test-review
//  questions (the unit test is the next day), tagged US.48 / US.49.
//  Same assignmentId as before. Turn-in via shared/turnin.js.
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u5-d4-cold-war-ends-v2";
  const ASSIGNMENT_ID = "ush-u5-d4-cold-war-ends";
  const TITLE = "U.S. History · Unit 5 · Day 3 · Who Ended the Cold War?";
  const STANDARD = "SS.9-12.US.48, SS.9-12.US.49";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;          // seconds locked after a wrong answer
  const START = 30;        // starting case strength
  const RIGHT = 8;         // each solved check: + case
  const PICK = 4;          // each tricky card filed: + case
  const WRONG = 5;         // each wrong try: − case ("the Skeptic pokes a hole")
  const GOAL = 70;
  const LR_LOCK = 4;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite, cls) => `<div class="exhibit ${cls || ""}"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (t) => `<div class="say stasi"><span class="who-s">🧐 The Skeptic</span>${t}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;

  const FILES = {
    A: { name: "Reagan's pressure", short: "Reagan", icon: "🇺🇸", cls: "a" },
    B: { name: "Gorbachev's reforms", short: "Gorbachev", icon: "☭", cls: "b" },
    C: { name: "People power", short: "People", icon: "✊", cls: "c" }
  };
  const CHAPS = [
    { tag: "File A · Reagan", yrs: "1981–87" },
    { tag: "File B · Gorbachev", yrs: "1985–89" },
    { tag: "File C · People", yrs: "1982–91" }
  ];

  // ---------------- The game ----------------
  // check: options[0] is right (the screen shuffles). miss[i] = why options[i+1] is wrong.
  // event: you choose which file a tricky card goes in.
  const STEPS = [
    { type: "check", id: "c1", r: 0, file: "A", std: "US.48", short: "Arms race strained USSR", kicker: "Evidence card 1",
      scene: () => ex("Arms race · 1980s", ln("💵", "President Reagan (1981–89) about <b>doubles</b> military spending.") + ln("🛰️", "1983: he plans <b>SDI</b> (“Star Wars”) to shoot down missiles.") + ln("📉", "The Soviet economy was much smaller.")) + say("Spending money isn't winning."),
      ask: "Why did this put pressure on the USSR?",
      options: ["It couldn't afford to keep up", "SDI was shooting down its missiles", "The U.S. stopped building nukes", "Its allies switched to the U.S."],
      miss: ["SDI was never finished. It never shot anything down.", "The opposite. The U.S. built more.", "Not yet. Look at the economy line."],
      reveal: "<b>Arms race</b>: keeping up drained the smaller Soviet economy.", stamp: "FILED: A" },
    { type: "check", id: "g3", r: 0, file: "A", std: "US.49", short: "\"Tear down this wall\"", kicker: "Evidence card 2",
      scene: () => ex("Speech · West Berlin · June 12, 1987", `<p class="quote">“Mr. Gorbachev, tear down this wall!”</p>` + ln("🧱", "The Berlin Wall stood right behind him."), "Ronald Reagan · public-domain presidential speech") + say("Nice line. The wall stood two more years."),
      ask: "What was Reagan doing with this line?",
      options: ["Daring Gorbachev to open it up", "Thanking Gorbachev for opening it", "Asking East Germany for a taller wall", "Warning Americans to leave Berlin"],
      miss: ["It was still closed. It opened in 1989.", "He wanted it gone, not bigger.", "He was talking to Gorbachev, not Americans."],
      reveal: "<b>Tough talk</b>: Reagan challenged the USSR in public, in front of the wall.", stamp: "FILED: A" },
    { type: "event", id: "e1", r: 0, short: "Soviet economy card", kicker: "Tricky card 1",
      scene: () => ex("Soviet Union · mid-1980s", ln("🛒", "Empty shelves. Long lines for bread.") + ln("🛢️", "1986: oil prices crash. Oil was the USSR's top money-maker.") + ln("🚀", "A huge share of money went to the military."), "", "file") + say("Bet you can't say whose card this is."),
      ask: "Tricky card! Which file does it fit best?",
      cards: [
        { f: "A", t: "Arms race made it worse", sub: "Missiles ate the food money", res: "Fair. Matching U.S. spending pulled money from food and goods.", cause: "Economy card → Reagan" },
        { f: "B", t: "Forced Gorbachev to reform", sub: "The system was clearly failing", res: "Fair. Gorbachev said the system had to change.", cause: "Economy card → Gorbachev" },
        { f: "C", t: "Made people angry", sub: "Shortages turned people against rulers", res: "Fair. Empty shelves turned people against communist rulers.", cause: "Economy card → People" }
      ] },

    { type: "check", id: "g1", r: 1, file: "B", std: "US.48", short: "Glasnost = openness", kicker: "Evidence card 3",
      scene: () => ex("Moscow · 1986–1988", ln("🧑‍💼", "1985: <b>Mikhail Gorbachev</b> becomes the Soviet leader.") + ln("📰", "Newspapers report problems.") + ln("🗣️", "People criticize leaders and aren't arrested.")) + say("Openness? Risky move for a dictator."),
      ask: "Gorbachev's name for this was glasnost. What does it mean?",
      options: ["Openness: more freedom to speak", "Restructuring: new private businesses", "Secrecy: tighter control of news", "Defense: more missiles in Europe"],
      miss: ["That's perestroika, his other reform.", "The opposite. Look at the newspapers.", "This card is about speech, not weapons."],
      reveal: "<b>Glasnost</b> = openness. Once people could criticize, they didn't stop.", stamp: "FILED: B" },
    { type: "event", id: "e2", r: 1, short: "Summits + INF Treaty card", kicker: "Tricky card 2",
      scene: () => ex("Summits · 1985–1988", ln("🤝", "Reagan and Gorbachev meet at <b>4 summits</b> (big meetings).") + ln("✍️", "Dec. 1987: they sign the <b>INF Treaty</b>.") + ln("💥", "2,692 nuclear missiles get destroyed."), "", "file") + say("Both signed. Whose win?"),
      ask: "Tricky card! Which file does it fit best?",
      cards: [
        { f: "A", t: "Reagan's strong hand", sub: "Building up first forced a deal", res: "Fair. Reagan's fans say strength brought Gorbachev to the table.", cause: "Treaty card → Reagan" },
        { f: "B", t: "Gorbachev gave ground", sub: "Earlier Soviet leaders refused deals", res: "Fair. Gorbachev accepted terms that favored the U.S.", cause: "Treaty card → Gorbachev" },
        { f: "C", t: "Marchers pushed both", sub: "Anti-nuke protests wanted deals", res: "A stretch, but real. Huge marches pressured both sides.", cause: "Treaty card → People" }
      ] },
    { type: "check", id: "g4", r: 1, file: "B", std: "US.48", short: "Gorbachev sent no tanks", kicker: "Evidence card 4",
      scene: () => ex("Eastern Europe", ln("🪖", "<b>1956</b> Hungary: Soviet tanks crush protests.") + ln("🪖", "<b>1968</b> Czechoslovakia: tanks again.") + ln("🚫", "<b>1989</b>: protests everywhere. Gorbachev sends <b>no</b> tanks.")) + say("He just… didn't? Why does that matter?"),
      ask: "Why does 1989 matter?",
      options: ["Protesters could win this time", "The Soviets had run out of tanks", "U.S. troops guarded the protesters", "The protests ended right away"],
      miss: ["It still had thousands. He chose not to use them.", "No U.S. troops went in. That risked war.", "They grew. Nothing stopped them."],
      reveal: "<b>Gorbachev's choice</b>: no tanks meant Eastern Europe could break free.", stamp: "FILED: B" },

    { type: "check", id: "fr", r: 2, file: "C", std: "US.49", short: "Nuclear freeze march", kicker: "Evidence card 5",
      scene: () => `<div class="sign">FREEZE THE ARMS RACE</div>` + ex("New York · June 12, 1982", ln("🗽", "About <b>1 million</b> people march in Central Park.") + ln("☢️", "Their demand: a <b>nuclear freeze</b>.")) + say("Reagan didn't freeze anything."),
      ask: "What did these marchers want?",
      options: ["Stop building more nuclear weapons", "Build SDI faster to stay safe", "Send U.S. troops to Eastern Europe", "Cut off all trade with the USSR"],
      miss: ["The opposite. They wanted fewer weapons.", "No. They feared war. Read the sign.", "Not their demand. Read the sign."],
      reveal: "<b>Nuclear freeze</b>: ordinary Americans pushed leaders toward arms deals.", stamp: "FILED: C" },
    { type: "check", id: "p2", r: 2, file: "C", std: "US.48", short: "Wall opening = freedom", kicker: "Evidence card 6",
      scene: () => `<div class="tv"><p class="top">📺 LIVE · BERLIN · NOV. 9, 1989</p><p class="tvq">Crowds pour through the Berlin Wall.</p></div>` + ex("Background", ln("🧱", "Built in <b>1961</b> to stop people escaping.") + ln("🇺🇸", "Americans watched it open on live TV.")) + say("Why is everyone crying?"),
      ask: "Why did the opening become a symbol of freedom?",
      options: ["People could no longer be kept in", "East Germany had won the Cold War", "U.S. soldiers had knocked it down", "A taller wall was being built"],
      miss: ["No. East Germany's rulers lost power.", "No U.S. soldier touched it. Germans did.", "No. It came down for good."],
      reveal: "<b>Symbol of freedom</b>: the wall that trapped people for 28 years was open.", stamp: "FILED: C" },
    { type: "event", id: "e3", r: 2, short: "Fall of the Wall card", kicker: "Tricky card 3",
      scene: () => `<p class="emo" aria-hidden="true">🧱🔨🎉</p>` + ex("Nov. 9, 1989", ln("❓", "Who gets the most credit for that night?"), "", "file") + say("Go on. Pick one."),
      ask: "Tricky card! Which file does it fit best?",
      cards: [
        { f: "A", t: "Reagan's 1987 demand", sub: "His words became world famous", res: "Fair. But he wasn't there. The crowd opened it.", cause: "Wall card → Reagan" },
        { f: "B", t: "Gorbachev held back", sub: "No Soviet troops stopped it", res: "Fair. Earlier Soviet leaders would likely have sent tanks.", cause: "Wall card → Gorbachev" },
        { f: "C", t: "The crowds did it", sub: "They pushed until guards gave in", res: "Fair. Thousands showed up and wouldn't leave.", cause: "Wall card → People" }
      ] },
    { type: "check", id: "p4", r: 2, file: null, std: "US.48", short: "1991: U.S. only superpower", kicker: "Last card · Case closed",
      scene: () => ex("Moscow · Dec. 25, 1991", ln("🚩", "Gorbachev resigns. The Soviet flag comes down.") + ln("🗺️", "The USSR splits into <b>15 countries</b>.")) + say("So who's left standing?"),
      ask: "What did this mean for the United States?",
      options: ["It was the last superpower", "It lost its allies in Europe", "It had to run the old USSR", "The arms race sped up again"],
      miss: ["No. Its NATO allies stayed.", "No. Russia and the others ran themselves.", "The opposite. It slowed way down."],
      reveal: "<b>Only superpower</b>: no rival came close for years.", stamp: "CASE CLOSED" },

    { type: "ending", id: "ending", r: 2, kicker: "Your verdict" },
    { type: "lightning", id: "lightning", r: 2, kicker: "Unit 5 review" },
    { type: "write", id: "write", r: 2, kicker: "Last step" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const EVENTS = STEPS.filter(s => s.type === "event");

  // ⚡ Lightning Round: Unit 5 test review (one tap each).
  const LR = [
    { id: "l1", std: "US.49", short: "\"Evil empire\" = tough talk", ev: "Reagan, 1983: the USSR is “an evil empire.”", ask: "What does this show?",
      options: ["He talked tough about the USSR", "He wanted friendly trade with it", "He thought the Cold War was over", "He was praising Soviet leaders"],
      miss: ["“Evil” isn't friendly.", "It was far from over in 1983.", "“Evil” isn't praise."], reveal: "Tough moral talk, not calm deals." },
    { id: "l2", std: "US.48", short: "Perestroika", ev: "Gorbachev lets people open small businesses.", ask: "Which reform is this?",
      options: ["Perestroika", "Glasnost", "Détente", "Containment"],
      miss: ["Glasnost was free speech.", "Détente was the 1970s cool-down.", "Containment was the U.S. plan."], reveal: "<b>Perestroika</b> = restructuring the economy." },
    { id: "l3", std: "US.49", short: "Reaganomics", ev: "1981: Reagan cuts income taxes and business rules.", ask: "What was his plan called?",
      options: ["Reaganomics", "The New Deal", "The Great Society", "The Fair Deal"],
      miss: ["That was FDR, 1930s.", "That was LBJ, 1960s.", "That was Truman."], reveal: "<b>Reaganomics</b>: tax cuts so growth “trickles down.”" },
    { id: "l4", std: "US.49", short: "Debt about tripled", ev: "1980s: big tax cuts + a big military build-up.", ask: "What happened to the national debt?",
      options: ["It about tripled", "It was paid off", "It stayed the same", "It was cut in half"],
      miss: ["Less money in, more out. Debt grew.", "Less money in, more out. Debt grew.", "Less money in, more out. Debt grew."], reveal: "About $1 trillion → $2.9 trillion." },
    { id: "l5", std: "US.49", short: "1980s losers: workers, farmers", ev: "1980s: stocks boom. Factories close. Iowa farmland prices crash.", ask: "Who lost the most?",
      options: ["Factory workers, farmers", "Wall Street investors", "Defense companies", "The very richest Americans"],
      miss: ["Stocks boomed. They gained.", "The build-up paid them well.", "Tax cuts helped them most."], reveal: "Gains went to the top. Many workers and farmers lost." },
    { id: "l6", std: "US.49", short: "New Right goals", ev: "The New Right: religious conservatives + tax cutters.", ask: "What did they want?",
      options: ["Lower taxes, smaller government", "More federal programs for the poor", "Higher taxes to pay off debt", "Less spending on the military"],
      miss: ["That's bigger government.", "They wanted taxes cut.", "They backed the build-up."], reveal: "Plus <b>traditional values</b>." },
    { id: "l7", std: "US.49", short: "1980: voters blamed Carter", ev: "1980: stagflation (prices up, jobs down) + 52 Americans held hostage in Iran.", ask: "Why did many voters switch to Reagan?",
      options: ["They blamed Carter for the problems", "Reagan promised to raise taxes", "Carter had already served two terms", "Reagan was the sitting president"],
      miss: ["He promised tax cuts.", "Carter served one term.", "Carter was the president."], reveal: "Bad times → voters wanted change." }
  ];

  const PROMPTS = [
    { id: "credit", short: "Biggest cause + 2 facts", label: "Who deserves the MOST credit: Reagan, Gorbachev, or ordinary people? Give 2 facts.",
      bank: ["arms race", "SDI", "glasnost", "no tanks", "INF Treaty", "freeze march", "Berlin Wall"],
      stem: "___ deserves the most credit because ___. Another fact is ___.", min: 100, newWords: 8,
      mustAll: [["reagan", "gorbachev", "people", "protest", "crowd", "marcher", "solidarity", "eastern europe"], ["because", "since"]],
      mustMsg: "In answer 1, name who gets the most credit AND explain why with facts (use \"because\")." },
    { id: "wall", short: "Berlin Wall as a symbol", label: "Why did the Berlin Wall's opening become a symbol of freedom?",
      bank: ["1961", "escape", "trapped", "Nov. 9, 1989", "live TV"],
      stem: "The Berlin Wall became a symbol of freedom because ___.", min: 60, newWords: 5,
      mustAll: [["wall"], ["because", "since"]],
      mustMsg: "In answer 2, talk about the Wall and explain WHY it became a symbol (use \"because\")." }
  ];

  // ---------------- State ----------------
  const freshLR = () => ({ done: {}, wrong: {}, streak: 0, best: 0 });
  const fresh = () => ({ name: "", step: -1, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false, lr: freshLR() });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.picks || !st.done) st = fresh();
  if (!st.lr || !st.lr.done) st.lr = freshLR();
  // Shared Chromebooks: a different student signed in on this device starts clean.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const misses = () => Object.values(st.wrong).reduce((a, b) => a + b, 0);
  const caseNow = () => Math.max(0, Math.min(100, START + RIGHT * Object.keys(st.done).length + PICK * Object.keys(st.picks).length - WRONG * misses()));
  const counts = () => {
    const n = { A: 0, B: 0, C: 0 };
    CHECKS.forEach(c => { if (c.file && st.done[c.id]) n[c.file]++; });
    EVENTS.forEach(e => { if (st.picks[e.id] != null) n[e.cards[st.picks[e.id]].f]++; });
    return n;
  };
  const chapDone = i => CHECKS.filter(c => c.r === i).every(c => st.done[c.id]) && EVENTS.filter(e => e.r === i).every(e => st.picks[e.id] != null);

  // ---------------- HUD ----------------
  const mood = w => w < 45 ? "😏" : w < 60 ? "🤨" : w < GOAL ? "😐" : "😰";
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const w = caseNow(), n = counts();
    $("caseFill").style.width = w + "%"; $("caseNum").textContent = w + "%";
    $("rMood").textContent = mood(w);
    $("youName").textContent = st.name;
    $("filePills").innerHTML = ["A", "B", "C"].map(k => `<span class="${FILES[k].cls}" title="${FILES[k].name}">${FILES[k].icon} ${n[k]}</span>`).join("");
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    const off = ["ending", "lightning", "write"].includes(step.type);
    $("chaps").innerHTML = CHAPS.map((c, i) => `<span class="${chapDone(i) ? "won" : i === step.r && !off ? "now" : ""}">${chapDone(i) ? "✓" : i + 1} ${c.tag.replace(/^File \w · /, "")}</span>`).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
    paintDesk();
  }
  function bump(id, delta, goodWhenUp) {
    const el = $(id); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + ((delta > 0) === goodWhenUp ? "good" : "bad");
    f.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  const snap = () => ({ w: caseNow(), n: counts() });
  function moved(before) {
    hud();
    const w = caseNow();
    bump("mCase", w - before.w, true);
    const n = counts();
    ["A", "B", "C"].forEach(k => { if (n[k] > before.n[k]) dropInto(k); });
    if (w < before.w) { const r = $("rivalBox"); r.classList.remove("shake"); void r.offsetWidth; r.classList.add("shake"); }
  }
  function fileTag(f) { return `<span class="ftag">${FILES[f].icon} File ${f}</span>`; }
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- The desk (scene art): three case folders that fill up ----------------
  function deskHtml() {
    return `<div class="desk" id="desk">${["A", "B", "C"].map(k => `<div class="folder ${FILES[k].cls}" id="fold${k}" aria-label="File ${k}, ${FILES[k].name}">
        <span class="fic" aria-hidden="true">${FILES[k].icon}</span><span class="stack" aria-hidden="true"></span>
        <span class="fn">0</span><span class="fl">${FILES[k].short}</span></div>`).join("")}</div>`;
  }
  function paintDesk() {
    if (!$("desk")) return;
    const n = counts(), top = Math.max(n.A, n.B, n.C);
    const tie = n.A === n.B && n.B === n.C;
    ["A", "B", "C"].forEach(k => {
      const f = $("fold" + k); if (!f) return;
      f.querySelector(".fn").textContent = n[k];
      f.setAttribute("aria-label", "File " + k + ", " + FILES[k].name + ": " + n[k] + " cards");
      const s = f.querySelector(".stack");
      while (s.children.length < n[k]) s.appendChild(document.createElement("i"));
      while (s.children.length > n[k]) s.lastChild.remove();
      f.classList.toggle("lead", top > 0 && !tie && n[k] === top);
    });
  }
  function dropInto(k) {
    const f = $("fold" + k); if (!f) return;
    const last = f.querySelector(".stack i:last-child");
    if (last) { last.classList.remove("drop"); void last.offsetWidth; last.classList.add("drop"); }
    f.classList.remove("hit"); void f.offsetWidth; f.classList.add("hit");
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml) {
    const off = ["ending", "lightning", "write"].includes(step.type);
    const C = CHAPS[step.r];
    const top = off ? "" : `<p class="chap">${C.tag} <small>${C.yrs}</small></p>`;
    app.innerHTML = `<div class="board"><div class="scene" id="scene">${step.type === "lightning" ? "" : deskHtml()}${top}<p class="kick">${esc(step.kicker)}</p>${sceneHtml}</div>
      <div class="play" id="play">${playHtml}</div></div>`;
    paintDesk();
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "ending") return "See your verdict ▶";
    if (nx.r !== step.r) return CHAPS[nx.r].tag + " ▶";
    return "Next card ▶";
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
        <div class="big3"><span>🇺🇸</span><span>☭</span><span>✊</span></div>
        <p class="q">1991</p>
        <div class="cast"><div class="r"><span>🇺🇸</span>File A<small>Reagan</small></div><div class="g"><span>☭</span>File B<small>Gorbachev</small></div><div class="p"><span>✊</span>File C<small>People</small></div><div class="k"><span>🧐</span>Skeptic<small>rival</small></div></div>
      </div>
      <div class="tcopy">
        <p class="tk">U.S. History · Unit 5 · Day 3</p>
        <h1>Who Ended the Cold War?</h1>
        <p class="hook">1991: the Soviet Union is gone. No war was fought. Who gets the credit?</p>
        <ul class="how"><li><span>🔍</span>Crack each evidence card</li><li><span>🗂️</span>File the tricky ones</li><li><span>⚖️</span>Beat the Skeptic</li></ul>
        <p class="tline">🎯 Cold War = U.S. vs. Soviet Union, 1947–1991. You weigh who ended it.</p>
        <p class="tchips"><span>⏱️ 25 min</span><span>🔍 7 checks</span><span>🗂️ 3 tricky cards</span><span>⚡ Test review</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Open the files 🗂️</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The Skeptic is made up. The events, numbers, and quotes are real. Standards: SS.9-12.US.48, US.49.</p>
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
      msgEl.innerHTML = `🧐 The Skeptic pokes a hole. ${esc(text)} <span class="cd">${left}</span>`;
      msgEl.className = "msg bad";
      if (left-- <= 0) { locked = false; msgEl.innerHTML = `💭 ${esc(text)} Try again.`; onDone(); return; }
      setTimeout(tick, 1000);
    };
    tick();
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) return solved(step, true);
    draw(step);
    if (lockLeft() > 0 && st.lockId === step.id) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || "", $("qmsg"), () => draw(step), lockLeft()); }
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
    if (o.n === 0) {
      btn.classList.add("right");
      const before = snap();
      st.done[step.id] = true; save(); moved(before);
      try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
      setTimeout(() => solved(step, false), 450);
      return;
    }
    btn.classList.add("wrong");
    const why = (step.miss && step.miss[o.n - 1]) || "Look at the card again.";
    const before = snap();
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + LOCK * 1000; st.lockMsg = why; st.lockId = step.id;
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ ${step.file ? "Filed in " + FILES[step.file].icon + " File " + step.file : "Case closed"}</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; const big = chapDone(step.r) && lastInChap(step); stamp(big ? "FILE " + "ABC"[step.r] + " DONE ✓" : step.stamp, big ? "huge" : ""); }
    addNext(step, step.reveal, quiet);
  }
  const lastInChap = step => { const all = STEPS.filter(s => s.r === step.r && ["check", "event"].includes(s.type)); return all[all.length - 1] === step; };

  // ---- Tricky card: you pick the file ----
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    const order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard ${FILES[c.f].cls}" data-i="${i}">${fileTag(c.f)}<b>${esc(c.t)}</b><small>${esc(c.sub)}</small></button>`; }).join("")}</div>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      const before = snap();
      st.picks[step.id] = i;
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${FILES[c.f].icon}</span><span>File ${c.f}: ${esc(c.t)}</span></div><p class="result">${esc(c.res)}</p>`;
    if (!quiet) { const big = chapDone(step.r) && lastInChap(step); stamp(big ? "FILE " + "ABC"[step.r] + " DONE ✓" : "FILED: " + c.f, big ? "huge" : ""); }
    addNext(step, null, quiet);
  }

  // ---- Endings ----
  function ending() {
    const n = counts(), w = caseNow();
    let e;
    if (n.A === n.B && n.B === n.C) e = { key: "It Took All Three", icon: "🧩", cls: "best",
      text: "Your verdict: pressure, reform, and crowds worked together. Most historians agree. The Skeptic nods.",
      skep: "" };
    else if (n.A > n.B && n.A > n.C) e = { key: "Peace Through Strength", icon: "🇺🇸", cls: "mid",
      text: "Your verdict: Reagan's build-up squeezed the USSR until it gave in.",
      skep: "Then why did it end under Gorbachev, not earlier leaders?" };
    else if (n.B > n.A && n.B > n.C) e = { key: "The Leader Who Let Go", icon: "☭", cls: "mid",
      text: "Your verdict: Gorbachev chose openness and sent no tanks.",
      skep: "Would he have changed course without a broken economy and U.S. pressure?" };
    else e = { key: "People Power", icon: "✊", cls: "mid",
      text: "Your verdict: ordinary people in the streets ended it.",
      skep: "Would they have won if Moscow had sent tanks?" };
    const causes = EVENTS.filter(s => st.picks[s.id] != null).map(s => s.cards[st.picks[s.id]].cause);
    if (caseNow() < GOAL) causes.push("Shaky facts weakened your case");
    e.causes = causes;
    e.solid = w >= GOAL;
    return e;
  }

  function endStep(step) {
    const e = ending(), n = counts();
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>
        ${e.skep ? say(esc(e.skep)) : ""}
        ${ex("Your files", ln(FILES.A.icon, "Reagan's pressure: <b>" + n.A + "</b>") + ln(FILES.B.icon, "Gorbachev's reforms: <b>" + n.B + "</b>") + ln(FILES.C.icon, "People power: <b>" + n.C + "</b>"))}`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">⚖️ Case strength ${caseNow()}% · ${e.solid ? "Airtight" : "Shaky"}</p></div><div id="after"></div>`);
    stamp(e.solid ? "AIRTIGHT CASE" : "SHAKY CASE", (e.solid ? "" : "bad") + " huge");
    const b = nextBtn(step); b.textContent = "⚡ Test review: Lightning round ▶";
    $("after").appendChild(b);
  }

  // ---- ⚡ Lightning round ----
  const lrNext = () => LR.findIndex(q => !st.lr.done[q.id]);
  const streakTxt = k => k ? `🔥 <b>${k}</b> in a row` : "🔥 Start a streak!";
  const strip = h => String(h).replace(/<[^>]+>/g, "");
  function lrScene() {
    const n = lrNext(), k = st.lr.streak || 0;
    return `<div class="lrhead"><span class="bolt" aria-hidden="true">⚡</span><h2>Lightning Round</h2></div>
      <p class="lrsub">Unit 5 test review. One tap each.</p>
      <div class="pips" id="lrPips" aria-label="Question ${n < 0 ? LR.length : n + 1} of ${LR.length}">${LR.map((q, i) => `<span class="${st.lr.done[q.id] ? "lit" : i === n ? "now" : ""}" aria-hidden="true">⚡</span>`).join("")}</div>
      <div class="streak${k >= 2 ? " hot" : ""}" id="lrStreak">${streakTxt(k)}</div>
      <div class="gallery" id="gallery" aria-hidden="true">${Array.from({ length: 10 }, () => `<span>🙂</span>`).join("")}</div>`;
  }
  function lightning(step) {
    shell(step, lrScene(), `<div id="lrPlay"></div><div id="after"></div>`);
    if (lrNext() < 0) return lrDone(step, true);
    lrCard(step, false);
    if (lockLeft() > 0 && st.lockId === LR[lrNext()].id) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || "", $("qmsg"), () => lrOptions(step), lockLeft()); }
  }
  function lrCard(step, anim) {
    const q = LR[lrNext()];
    $("lrPlay").innerHTML = `<div class="lrcard${anim ? " flipin" : ""}" id="lrCard">
        <p class="lrn">⚡ ${lrNext() + 1} / ${LR.length}</p>
        <p class="lrev">${esc(q.ev)}</p>
        <p class="ask">${esc(q.ask)}</p>
        <div class="replies lrgrid" id="replies"></div>
        <p class="msg" id="qmsg" role="status" aria-live="polite"></p>
        ${"speechSynthesis" in window ? `<button type="button" class="mini lrread" id="lrRead">🔊 Read it to me</button>` : ""}
      </div>`;
    if ($("lrRead")) $("lrRead").onclick = () => {
      const synth = window.speechSynthesis;
      if (synth.speaking) { synth.cancel(); return; }
      const opts = [...document.querySelectorAll("#replies .reply")].map(b => b.textContent);
      const u = new SpeechSynthesisUtterance([strip(q.ev).replace(/[^\p{L}\p{N}\s.,:%'“”"?…$-]/gu, " "), q.ask, "Choices: " + opts.join(". ")].join(" "));
      u.rate = 0.95; u.lang = "en-US"; synth.cancel(); synth.speak(u);
    };
    lrOptions(step);
  }
  function lrOptions(step) {
    const area = $("replies"); if (!area) return;
    const q = LR[lrNext()];
    const before = [...area.querySelectorAll(".reply")].map(x => x.textContent).join("|");
    let order = shuffle(q.options.map((t, n) => ({ t, n })));
    for (let k = 0; k < 8 && before && order.map(o => o.t).join("|") === before; k++) order = shuffle(order);
    area.replaceChildren();
    order.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "reply lr"; b.textContent = o.t;
      b.onclick = () => lrPick(step, q, o, b);
      area.appendChild(b);
    });
  }
  function lrPick(step, q, o, btn) {
    if (locked || st.lr.done[q.id]) return;
    const msg = $("qmsg");
    if (o.n === 0) {
      st.lr.done[q.id] = true;
      if (!st.lr.wrong[q.id]) { st.lr.streak = (st.lr.streak || 0) + 1; st.lr.best = Math.max(st.lr.best || 0, st.lr.streak); }
      save();
      try { window.classFirstTry && window.classFirstTry.right("lr-" + q.id); } catch (e) {}
      btn.classList.add("right");
      $("replies").querySelectorAll("button").forEach(x => { x.disabled = true; if (x !== btn) x.classList.add("fade"); });
      msg.innerHTML = `✓ ${q.reveal}`; msg.className = "msg good lrok";
      if ($("welcome")) $("welcome").hidden = true;
      cheer();
      locked = true;
      setTimeout(() => {
        locked = false;
        if (!document.body.contains(btn)) return;
        if (lrNext() < 0) return lrDone(step, false);
        lrCard(step, true);
      }, 1900);
      return;
    }
    btn.classList.add("wrong");
    const why = (q.miss && q.miss[o.n - 1]) || "Think back to this unit.";
    st.lr.wrong[q.id] = (st.lr.wrong[q.id] || 0) + 1;
    st.lr.streak = 0;
    st.lockUntil = Date.now() + LR_LOCK * 1000; st.lockMsg = why; st.lockId = q.id;
    save();
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    lrHud(false);
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, msg, () => lrOptions(step), LR_LOCK);
  }
  function lrHud(up) {
    const n = lrNext(), k = st.lr.streak || 0;
    const p = $("lrPips"); if (p) p.querySelectorAll("span").forEach((s, i) => { s.className = st.lr.done[LR[i].id] ? "lit" : i === n ? "now" : ""; });
    const s = $("lrStreak"); if (s) { s.innerHTML = streakTxt(k); s.classList.toggle("hot", k >= 2); s.classList.remove("pulse"); void s.offsetWidth; if (up) s.classList.add("pulse"); }
  }
  function cheer() {
    lrHud(true);
    const g = $("gallery"); if (!g) return;
    const faces = ["🙌", "👏", "🤩", "📣", "🙌", "👏", "🥳", "🙌", "👏", "📣"];
    g.querySelectorAll("span").forEach((s, i) => { s.textContent = faces[i]; s.classList.remove("jump"); void s.offsetWidth; s.classList.add("jump"); });
    setTimeout(() => { const g2 = $("gallery"); if (g2) g2.querySelectorAll("span").forEach(s => s.textContent = "🙂"); }, 1500);
  }
  function lrDone(step, quiet) {
    lrHud(false);
    $("lrPlay").innerHTML = `<div class="lrcard lrend${quiet ? "" : " flipin"}"><p class="big" aria-hidden="true">⚡🏆⚡</p><h3>Round cleared!</h3><p class="lrbest">🔥 Best streak: <b>${st.lr.best || 0}</b> in a row</p></div>`;
    const g = $("gallery"); if (g) g.querySelectorAll("span").forEach((s, i) => s.textContent = ["🙌", "👏", "🤩", "📣", "🥳"][i % 5]);
    if (!quiet) stamp("READY FOR THE TEST", "huge stay");
    addNext(step, null, quiet);
    const b = $("nextBtn"); if (b) b.textContent = "✏️ Write your verdict ▶";
  }

  // ---- Writing ----
  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="letter"><p class="cbh">📜 Historian's verdict</p><p>Who ended the Cold War? Here's my case…</p><p class="sig">Your ending: ${e.icon} ${esc(e.key)}</p></div>`,
      `<div class="write">${PROMPTS.map((p, i) => `
         <label for="w_${p.id}">✏️ ${i + 1}. ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: add a real date or number from today.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Sign your verdict + turn in ▶"}</button>
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
      const box = $("w_" + p.id), v = (box.value || "").trim();
      const n = PROMPTS.indexOf(p) + 1;
      const bad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
        if (junk) { msg.textContent = "For answer " + n + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return bad("Write a little more for answer " + n + " (1–2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words in answer " + n + ".");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas in answer " + n + ". Use details from today.");
      if (p.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return bad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    const answers = { "Standard": STANDARD };
    const ALL = CHECKS.map(c => ({ std: c.std, miss: st.wrong[c.id] })).concat(LR.map(q => ({ std: q.std, miss: st.lr.wrong[q.id] })));
    answers["First-try correct"] = ALL.filter(c => !c.miss).length + " of " + ALL.length;
    const byStd = {};
    ALL.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!c.miss) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    STEPS.forEach(s => {
      if (s.type === "event" && st.picks[s.id] != null) { const c = s.cards[st.picks[s.id]]; answers["Choice · " + s.short] = "File " + c.f + ": " + c.t; }
      if (s.type === "check") {
        const w = st.wrong[s.id];
        answers[s.std + " · " + s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    LR.forEach(q => {
      const w = st.lr.wrong[q.id];
      answers[q.std + " · ⚡ " + q.short] = q.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    const n = counts();
    answers["⚡ Lightning best streak"] = (st.lr.best || 0) + " in a row";
    answers["Ending"] = e.key;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Evidence files"] = "Reagan " + n.A + " · Gorbachev " + n.B + " · People " + n.C;
    answers["Case strength (end)"] = caseNow() + "% (" + (e.solid ? "airtight" : "shaky") + ")";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Verdict signed!"; msg.className = "msg good";
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
    document.body.dataset.step = step.id; document.body.dataset.r = step.r;
    if (step.type === "check") return check(step);
    if (step.type === "event") return event(step);
    if (step.type === "ending") return endStep(step);
    if (step.type === "lightning") return lightning(step);
    return writeStep(step);
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0 && st.name) {
    const w = $("welcome");
    const onLR = STEPS[Math.min(st.step, TOTAL - 1)].type === "lightning" && lrNext() >= 0;
    w.innerHTML = `<span>👋 Welcome back, ${esc(st.name)} You're on step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}.${onLR ? " ⚡ Question " + (lrNext() + 1) + " of " + LR.length + "." : ""}</span>`;
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
  // Each ⚡ lightning-round question gets its own screen in the jump list.
  try {
    const LI = STEPS.findIndex(s => s.type === "lightning"), XN = LR.length - 1;
    const toStep = i => i < LI ? i : i < LI + LR.length ? LI : i - XN;
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL + XN,
      index: () => {
        const s = Math.max(0, Math.min(st.step, TOTAL - 1));
        if (s < LI) return s;
        if (s === LI) { const n = lrNext(); return LI + (n < 0 ? XN : n); }
        return s + XN;
      },
      label: i => {
        if (i >= LI && i < LI + LR.length) return "⚡ " + (i - LI + 1) + ". " + LR[i - LI].short;
        const s = STEPS[toStep(i)]; return s.short || s.kicker || s.type;
      },
      go: i => {
        if (!st.name) st.name = "Test T.";
        st.lockUntil = 0;
        if (i >= LI && i < LI + LR.length) LR.forEach((q, j) => { if (j < i - LI) st.lr.done[q.id] = true; else delete st.lr.done[q.id]; });
        st.step = toStep(i); save(); render();
      },
      solve: () => {
        const s = STEPS[Math.min(st.step, TOTAL - 1)]; if (!s) return;
        if (s.type === "check" && !st.done[s.id]) { st.done[s.id] = true; st.lockUntil = 0; save(); render(); }
        else if (s.type === "event" && st.picks[s.id] == null) { const b = document.querySelector("#dbox .dcard"); if (b) b.click(); }
        else if (s.type === "lightning" && lrNext() >= 0) {
          const q = LR[lrNext()];
          st.lockUntil = 0; save(); render();
          const b = [...document.querySelectorAll("#replies .reply")].find(x => x.textContent === q.options[0]); if (b) b.click();
        }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
