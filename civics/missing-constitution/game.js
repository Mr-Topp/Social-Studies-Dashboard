/* =====================================================================
   POWER GRAB: The Missing Constitution  (Government Unit 1, Day 7)
   A card duel. Gov. Victor Hale (a made-up character) grabs power 7 times.
   Each showdown deals 3 rule cards: one best fit, one that works slowly, one that
   doesn't fit. A wrong card makes Hale stronger; the player tries again.
   - Shortcuts beat Hale fast but break the Constitution (2 = "You became Hale").
   - 5 evidence checks ("Hale's lawyer objects") must be answered right to move on.
   Saved on this device. Turn-in goes through shared/turnin.js (classTurnIn).
   ===================================================================== */
(function () {
  "use strict";
  const KEY = "gov-missing-constitution-day7-v3";
  const API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const ASSIGNMENT_ID = "gov-missing-constitution-day7";
  const TITLE = "Day 7 · Power Grab";
  const STANDARD = "SS.9-12.Gov.3, SS.9-12.Gov.4";
  const LOCK = 5;
  const START_POWER = 50;
  const FX = { best: -10, ok: -4, miss: 12, cut: -8, slide: 18, objection: 4 };
  const STEPS = 10; // 1 briefing, 2-8 showdowns, 9 ending, 10 report

  // ---------- The Constitution's pieces (the "missing" document) ----------
  const PIECES = [
    ["pop", "🗳️", "Popular Sovereignty"],
    ["lim", "📏", "Limited Government"],
    ["rol", "🔍", "Rule of Law"],
    ["sep", "🧱", "Separation of Powers"],
    ["cb", "⚖️", "Checks and Balances"],
    ["fed", "🌽", "Federalism"],
    ["sup", "🇺🇸", "Supremacy Clause"],
    ["amd", "✍️", "Amendments"]
  ];
  const PIECE = Object.fromEntries(PIECES.map(p => [p[0], p]));

  // ---------- Your hand ----------
  const CARDS = {
    vote:    { e: "🏛️", name: "Lawmakers Vote",      line: "Lawmakers cancel his orders or investigate him.", p: "cb" },
    strike:  { e: "⚖️", name: "Court Ruling",        line: "A judge strikes it down.", p: "cb" },
    order:   { e: "🔍", name: "Court Order",         line: "A judge forces him to obey.", p: "rol" },
    job:     { e: "🧱", name: "Not Your Job",        line: "Each branch has its own job.", p: "sep" },
    rule:    { e: "📏", name: "Not in the Rulebook", line: "The Constitution limits what leaders can do.", p: "lim" },
    supreme: { e: "🇺🇸", name: "Supremacy Clause",   line: "Valid national law beats state law.", p: "sup" },
    states:  { e: "🌽", name: "States' Power",       line: "Some powers belong to the states.", p: "fed" },
    people:  { e: "🗳️", name: "We the People",       line: "Voters hold the power.", p: "pop" }
  };
  const HAND = ["vote", "strike", "order", "job", "rule", "supreme", "states", "people"];

  // ---------- The 7 showdowns ----------
  const ROUNDS = [
    {
      id: "r1", deal: ["vote", "people", "rule"], short: "Storm emergency", title: "The Endless Storm", art: "🌪️",
      flash: "A derecho (giant windstorm) wrecks Marion. Hale declares an emergency.",
      taunt: "Day 31. It ends when I say.",
      ev: { lab: "📎 Evidence · Iowa law (real)", html: "An emergency <b>ends after 30 days</b> unless the governor extends it. <b>Lawmakers can cancel it.</b>", src: "Source: Iowa Code §29C.6 (Iowa used it after the real 2020 derecho)" },
      fits: {
        vote:   { fit: "best", head: "Emergency canceled", res: "Lawmakers vote. Hale's extra powers end that day.", crane: "They can DO that?", reveal: "<b>Checks and balances</b>: lawmakers can limit the governor." },
        people: { fit: "ok", head: "Wait for election day", res: "The next election is two years away. He keeps his powers until then.", crane: "See you in two years.", reveal: "<b>Popular sovereignty</b>: voters rule, but only at election time." },
      },
      miss: {
        order: "No one's hiding evidence. Who can cancel this?",
        job: "He's not making laws. Who can cancel this?",
        rule: "Iowa law allows emergencies. Who can cancel this one?",
        strike: "No judge has been asked yet. Who can cancel it fast?",
        supreme: "No national law is involved here.",
        states: "Emergencies are a state power. That helps Hale."
      },
      cut: { label: "Send in the Guard", head: "Troops drag Hale out", res: "It lasts one day. A judge puts Hale back.", reveal: "That broke the <b>rule of law</b>. Even stopping him must be legal." },
      slide: { head: "Emergency rolls on", res: "Day 60. Day 90. Hale still rules by emergency.", reveal: "Power nobody checks keeps growing." },
      check: "c1"
    },
    {
      id: "r2", deal: ["rule", "strike", "job"], short: "Phone searches", title: "Checkpoints", art: "🚔",
      flash: "Hale orders police to search every phone for the thief. <b>No warrants</b> (no judge said OK).",
      taunt: "Nothing to hide? Hand it over.",
      ev: { lab: "📎 Evidence · 4th Amendment (real)", html: "The 4th Amendment bans <b>unreasonable searches</b> (searches without a good reason). Real case: phone searches need a <b>warrant</b> (a judge's OK).", src: "Source: U.S. Constitution, 4th Amendment; Riley v. California (2014)" },
      fits: {
        rule:   { fit: "best", head: "Rights win", res: "Police drop the phone searches and get warrants again.", crane: "Fine. Keep your precious phones.", reveal: "<b>Limited government</b>: the Constitution limits what leaders can do to you." },
        strike: { fit: "ok", head: "A judge stops it", res: "It stops after a week. Hundreds of phones already searched.", crane: "A week of phones. Worth it.", reveal: "<b>Checks and balances</b>: courts can stop an unconstitutional order." }
      },
      miss: {
        vote: "Hale would veto it. Phones get searched today.",
        order: "Nothing to hand over. The searches are the problem.",
        job: "Police work IS his branch's job. It's about your rights.",
        supreme: "No national law is involved here.",
        states: "States run police, but the Constitution still limits them.",
        people: "The election is too far off."
      },
      cut: { label: "Raid Hale's office", head: "You raid his office", res: "You find nothing. Hale: “See? They ignore warrants too.”", reveal: "That broke the <b>4th Amendment</b>, the same rule Hale broke." },
      slide: { head: "Checkpoints all month", res: "Every car stopped. Even kids' phones get searched.", reveal: "Rights only work if someone defends them." }
    },
    {
      id: "r3", deal: ["job", "rule", "states"], short: "The $500 tax", title: "One-Man Lawmaker", art: "💸",
      flash: "Hale sends lawmakers home. His new law: <b>a $500 storm tax per home.</b>",
      taunt: "I make AND enforce the law.",
      tauntAlt: "My emergency never ended. I'm stronger now.",
      ev: { lab: "📎 Evidence · U.S. and Iowa Constitutions (real)", html: "<b>Legislative</b> makes laws. <b>Executive</b> carries them out. <b>Judicial</b> decides what they mean.", src: "Source: U.S. Constitution, Articles I–III; Iowa Constitution, Article III" },
      fits: {
        job:    { fit: "best", head: "Not your job", res: "Making laws is the legislature's job. The tax dies.", crane: "Fine. No tax.", reveal: "<b>Separation of powers</b>: one branch makes laws, another carries them out." },
        rule:   { fit: "ok", head: "Not in the rulebook", res: "Hale backs off, but plans a “storm fee” instead.", crane: "Call it a fee, then.", reveal: "<b>Limited government</b>: leaders only get powers the Constitution gives." },
      },
      miss: {
        vote: "Lawmakers got sent home. Whose job is lawmaking?",
        order: "Nothing hidden here. He took another branch's job.",
        supreme: "No national law is involved here.",
        states: "States can tax, but governors can't tax alone.",
        people: "The election is too far off."
      },
      cut: { label: "Lock him out", head: "Locked out", res: "Hale signs the tax from his car anyway.", reveal: "That broke the <b>rule of law</b>. You can't just lock out a governor." },
      slide: { head: "The tax stands", res: "Troopers collect $500 a home.", reveal: "One person making AND enforcing laws is what the Framers feared." },
      check: "c2"
    },
    {
      id: "r4", deal: ["order", "vote", "strike"], short: "Hale's texts", title: "The Texts", art: "📱",
      flash: "Police learn the thief texted Hale's office. Hale refuses to hand over his texts.",
      taunt: "You can't make me.",
      ev: { lab: "📎 Evidence · Real case, 1974", html: "President Nixon wouldn't hand over secret tapes. The Supreme Court ruled <b>8–0</b>: hand them over. <b>He resigned 16 days later.</b>", src: "Source: United States v. Nixon (1974)" },
      fits: {
        order: { fit: "best", head: "Court order", res: "Hale must obey. The texts lead to the Constitution in Ankeny.", crane: "You'll regret this.", reveal: "<b>Rule of law</b>: even the most powerful leader must obey the law." },
        vote:  { fit: "ok", head: "Lawmakers investigate", res: "Lawmakers investigate. Three months later, the texts and Constitution turn up.", crane: "Three months. I'll survive.", reveal: "<b>Checks and balances</b>: lawmakers can investigate and impeach a governor." }
      },
      miss: {
        strike: "No law to strike down. He's hiding texts. Who can FORCE him to hand them over?",
        job: "This isn't about lawmaking. He thinks he's above the law.",
        rule: "Close. You need someone who can FORCE him.",
        supreme: "No national law is involved here.",
        states: "This isn't state power. He's hiding evidence.",
        people: "Voters can't force him to hand over texts."
      },
      cut: { label: "Hack his phone", head: "You hack the phone", res: "The texts are real, but a judge throws them out.", reveal: "That broke the <b>rule of law</b>. Illegal evidence gets thrown out." },
      slide: { head: "Texts stay secret", res: "Hale keeps his texts. The Constitution stays missing.", reveal: "If leaders can ignore courts, nobody is equal under law." },
      check: "c3"
    },
    {
      id: "r5", deal: ["supreme", "strike", "states"], short: "Blocked inspectors", title: "Iowa vs. Washington", art: "🚧",
      flash: "Congress passes storm aid. Its inspectors (checkers) make sure the money fixes homes. Hale orders state police to <b>block the inspectors</b>.",
      taunt: "Our state, our rules.",
      ev: { lab: "📎 Evidence · Article VI (real)", html: "National laws made under the Constitution are “the <b>supreme Law of the Land</b>.”", src: "Source: U.S. Constitution, Article VI (1787); McCulloch v. Maryland (1819)" },
      fits: {
        supreme: { fit: "best", head: "Supremacy Clause", res: "State police step aside. Inspectors get in, and homes get fixed.", crane: "Fine. Enjoy your inspectors.", reveal: "<b>Supremacy Clause</b>: valid national laws beat state orders." },
        strike:  { fit: "ok", head: "A judge steps in", res: "A judge lets inspectors in, after three weeks of tarps.", crane: "Three weeks. Nice.", reveal: "<b>Checks and balances</b>: courts can make states follow national law." }
      },
      miss: {
        vote: "Iowa lawmakers can't cancel a national law.",
        order: "Nothing hidden here. It's state vs. nation.",
        job: "Not a branch fight. It's state vs. nation.",
        rule: "Close. Which card settles state vs. nation?",
        states: "This national law is valid. In a clash, states lose.",
        people: "An election won't let inspectors in today."
      },
      cut: { label: "Arrest Hale, no charges", head: "A night in jail", res: "Judges free him. Iowans are furious, at you.", reveal: "That broke the <b>rule of law</b>. No jail without a charge." },
      slide: { head: "Inspectors blocked", res: "Inspectors go home. Some storm money vanishes.", reveal: "If states ignored national laws, those laws would mean nothing." },
      check: "c4"
    },
    {
      id: "r6", deal: ["states", "strike", "supreme"], short: "The license twist", title: "Plot Twist", art: "🪪", twist: true,
      flash: "Congress tries to set Iowa's driving age itself. Even Hale is mad.",
      taunt: "Side with ME for once.",
      ev: { lab: "📎 Evidence · 10th Amendment (real)", html: "Some powers belong to the <b>states</b>, like <b>driver's licenses</b>. Some belong to the <b>nation</b>, like declaring war.", src: "Source: U.S. Constitution, 10th Amendment" },
      fx: { best: 0, ok: 0 },
      fits: {
        states: { fit: "best", head: "States' power", res: "Licenses are Iowa's call. Congress's plan dies.", crane: "Ha! The rules protect me too.", reveal: "<b>Federalism</b> limits Washington too. The rules aren't on anyone's team." },
        strike: { fit: "ok", head: "A judge blocks it", res: "A judge blocks it after a month. Hale brags nonstop.", crane: "Told you. Iowa's call.", reveal: "<b>Checks and balances</b>: courts can stop the national government too." }
      },
      miss: {
        supreme: "Supremacy only covers VALID national laws. Licenses belong to states.",
        vote: "Iowa lawmakers can't cancel what Congress does.",
        order: "Nothing hidden here.",
        job: "Not a branch fight. It's nation vs. state.",
        rule: "Close. Which card is about states' powers?",
        people: "An election won't stop this today."
      },
      cut: { label: "Arrest the official from Washington", head: "Arrested at the border", res: "Making an announcement isn't a crime. Now it's a court war.", reveal: "That broke the <b>rule of law</b>. No arrests for non-crimes." },
      slide: { head: "Washington takes over", res: "Washington runs Iowa's licenses. Hale: “Who else will protect you?”", reveal: "When nobody defends the rules, the loudest person wins." }
    },
    {
      id: "r7", deal: ["people", "vote", "strike"], short: "Governor forever", title: "Governor Forever", art: "👑",
      flash: "Lawmakers pass Hale's amendment: <b>“No more elections for governor.”</b>",
      taunt: "Soon I'm governor for life.",
      tauntAlt: "You broke rules too. Who trusts you?",
      ev: { lab: "📎 Evidence · Iowa Constitution (real)", html: "To change Iowa's constitution, lawmakers pass it <b>twice</b>. Then a <b>majority of voters</b> must approve.", src: "Source: Iowa Constitution, Article X · Real: in 1998, voters added “and women” to Article I" },
      fits: {
        people: { fit: "best", head: "Voters say no", res: "Iowans vote NO, 70% to 30%. Hale's term ends on time.", crane: "They voted against ME?", reveal: "<b>Popular sovereignty</b>: power comes from the people." },
        vote:   { fit: "ok", okStamp: "STOPPED, NO VOTE", head: "Killed in the legislature", res: "The next legislature kills it. Voters never get a say.", crane: "I'll be back next session.", reveal: "<b>Checks and balances</b>: lawmakers can stop a bad amendment early." }
      },
      miss: {
        strike: "Amending the legal way isn't unconstitutional.",
        order: "Nothing hidden here. This is a vote.",
        job: "Proposing amendments IS lawmakers' job. Who decides last?",
        rule: "Amending is allowed. Who gets the final say?",
        supreme: "This is Iowa's own constitution. Who decides?",
        states: "Iowa already controls this. Who decides inside Iowa?"
      },
      cut: { label: "Cancel the vote", head: "You cancel the election", res: "No amendment, but no voice either. Hale: “Who's canceling elections now?”", reveal: "That broke <b>popular sovereignty</b>. Power comes from the people's vote." },
      slide: { head: "It passes", res: "Few people vote. It passes by 900 votes.", reveal: "Popular sovereignty only works when people use it." },
      check: "c5"
    }
  ];

  // ---------- Evidence checks (feed the dashboard) ----------
  const CHECKS = {
    c1: { std: "SS.9-12.Gov.4", short: "Iowa emergency limits",
      who: "Objection! Nothing limits his emergency.",
      q: "Show me: how is his emergency limited?",
      opts: ["30 days unless renewed; lawmakers can cancel",
             "Lasts until the next election; voters end it",
             "Ends only when the President orders it",
             "Lasts a year; only judges can end it"],
      icons: ["📅", "🗳️", "🦅", "⚖️"],
      hint: "Check the days and who cancels.",
      why: "30 days unless renewed. Lawmakers can cancel." },
    c2: { std: "SS.9-12.Gov.4", short: "Separation of powers",
      who: "Objection! Governors can make laws.",
      q: "Hale wrote a tax. Whose job did he take?",
      opts: ["Legislative: the branch that makes laws",
             "Judicial: the branch that explains laws",
             "Executive: the branch that enforces laws",
             "Nobody's: storms suspend the usual rules"],
      icons: ["🏛️", "⚖️", "🦅", "🌪️"],
      hint: "Which branch makes laws?",
      why: "Making laws is the legislature's job." },
    c3: { std: "SS.9-12.Gov.4", short: "Rule of law (Nixon tapes)",
      who: "Objection! Courts can't boss governors.",
      q: "What does the Nixon case prove?",
      opts: ["Even a President must obey the courts",
             "Elected leaders can ignore the courts",
             "Only Congress can make a President obey",
             "Courts only give orders to regular people"],
      icons: ["📼", "🗳️", "🏛️", "🧍"],
      hint: "Did Nixon have to obey?",
      why: "Even a President must obey. That's rule of law." },
    c4: { std: "SS.9-12.Gov.3", short: "Article VI (Supremacy Clause)",
      who: "Objection! Iowa can ignore national laws.",
      q: "Use Article VI: what happens to Hale's blockade?",
      opts: ["Iowa has to let the inspectors in",
             "Iowa can keep them out if it wants",
             "Iowa wins because states are closer to people",
             "Only the President can decide"],
      icons: ["🇺🇸", "🎯", "🏡", "🦅"],
      hint: "What does “supreme” mean?",
      why: "Article VI: national laws are “the supreme Law of the Land.”" },
    c5: { std: "SS.9-12.Gov.3", short: "Article V (amendments)",
      who: "Then I'll change the U.S. Constitution!", crane: true,
      ev: { lab: "📎 Evidence · Article V (real)", html: "<b>Two-thirds</b> of both houses of Congress propose it. <b>Three-fourths of the states</b> approve (ratify) it. Only 27 ever passed.", src: "Source: U.S. Constitution, Article V" },
      q: "How many states must ratify?",
      opts: ["38 states", "26 states", "34 states", "50 states"],
      icons: ["3️⃣", "2️⃣", "🔢", "5️⃣"],
      hint: "Three-fourths of 50, rounded up.",
      why: "Three-fourths of 50 is 38 states. Hale can't get that many." }
  };
  const CHECK_IDS = Object.keys(CHECKS);

  // ---------- Writing ----------
  const PROMPTS = [
    { id: "w1", short: "Two principles",
      label: "Pick two ideas from your cards. How did they work together to balance power? Use one game moment.",
      stem: "___ and ___ balanced power because… In the game, …",
      must: ["checks", "separation", "rule of law", "federalism", "supremacy", "sovereignty", "limited government", "we the people", "amendment", "branch",
             "contrapesos", "controles", "separacion", "estado de derecho", "federalismo", "supremacia", "soberania", "gobierno limitado", "nosotros el pueblo", "enmienda", "rama"],
      mustMsg: "Name at least one idea from your cards, like checks and balances or federalism.",
      detail: ["hale", "storm", "emergency", "phone", "search", "tax", "text", "inspector", "license", "driving", "election", "vote", "amendment", "governor", "judge", "court", "lawmaker", "police", "congress",
               "tormenta", "emergencia", "telefono", "impuesto", "mensaje", "inspector", "licencia", "eleccion", "voto", "enmienda", "gobernador", "juez", "corte", "policia", "congreso"],
      detailMsg: "Add one real moment from the game, like the storm, the phone searches, the tax, or Hale's texts." }
  ];

  const PROMPT_TAGS = { w1: "🎤 Your closing argument" };

  // ---------- Helpers ----------
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const T = s => (window.SiteLang && window.SiteLang.t) ? window.SiteLang.t(s) : s;
  const clamp = n => Math.max(0, Math.min(100, n));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  function freshOrder(n, prior) { let o; do { o = shuffle([...Array(n).keys()]); } while (prior && n > 1 && o.every((v, i) => v === prior[i])); return o; }
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = ms => new Promise(res => setTimeout(res, reduceMotion ? 0 : ms));

  // Hale's face changes with his power.
  function mood(p) {
    if (p >= 75) return ["😈", "Unstoppable"];
    if (p >= 50) return ["😏", "Smug"];
    if (p >= 25) return ["😤", "Annoyed"];
    return ["😰", "Sweating"];
  }

  const fresh = () => ({ v: 3, step: 0, phase: "play", power: START_POWER, breaks: 0, pieces: {}, burned: {}, rounds: {}, entered: {}, flags: {}, checks: {}, writing: {}, name: "", turnedIn: false, ending: null, miss: null, reward: null });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 3) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  let selected = null;     // card picked but not played yet
  let locked = false;      // evidence-check lock after a wrong answer
  let busy = false;        // a card animation is running
  let order = null;        // current shuffled order of a check's choices
  let lastPower = st.power;
  const app = $("app");
  // 3-card showdown layout (kept here so index.html stays unchanged)
  (function () { const el = document.createElement("style"); el.textContent = ".hand.three{grid-template-columns:repeat(3,minmax(0,1fr))}.hand.three .pcard{min-height:150px}.hand.three .ce{font-size:2.3rem}.hand.three .cn{font-size:1rem}.hand.three .cl{font-size:.8rem}@media(max-width:620px){.hand.three{grid-template-columns:1fr}.hand.three .pcard{min-height:0}}"; document.head.appendChild(el); })();

  const roundIx = () => st.step - 2;
  const curRound = () => ROUNDS[roundIx()];

  // ---------- HUD: you vs. Hale ----------
  function hud() {
    const h = $("hud");
    if (st.step < 1) { h.hidden = true; return; }
    h.hidden = false;
    $("stepTag").textContent = st.step >= 2 && st.step <= 8 ? "Showdown " + (st.step - 1) + " of 7" : "Step " + st.step + " of " + STEPS;
    $("powerNum").textContent = st.power;
    $("powerFill").style.width = st.power + "%";
    $("powerFill").className = st.power >= 65 ? "hi" : st.power <= 25 ? "lo" : "";
    const m = mood(st.power);
    $("craneFace").textContent = m[0];
    $("craneMood").textContent = m[1];
    const nBlocked = ROUNDS.filter(r => (st.rounds[r.id] || {}).outcome === "best").length;
    $("cardsLeft").textContent = nBlocked + " blocked";
    $("breaks").textContent = st.breaks ? "⚠️".repeat(st.breaks) : "0";
    $("breakBox").classList.toggle("warn", st.breaks > 0);
    $("pieces").innerHTML = PIECES.map(p => `<span class="pc ${st.pieces[p[0]] ? "on" : ""}" title="${esc(p[2])}" aria-label="${esc(p[2])}">${st.pieces[p[0]] ? p[1] : "?"}</span>`).join("");
    $("pieceNum").textContent = Object.keys(st.pieces).length + "/8";
    if (st.power !== lastPower) {
      const d = st.power - lastPower, pop = $("powerPop");
      pop.textContent = (d > 0 ? "+" : "−") + Math.abs(d);
      pop.className = "pop " + (d > 0 ? "up" : "down");
      void pop.offsetWidth; pop.classList.add("show");
      $("craneFace").classList.remove("hit", "grow"); void $("craneFace").offsetWidth;
      $("craneFace").classList.add(d > 0 ? "grow" : "hit");
      lastPower = st.power;
    }
  }

  function go(step, phase) { $("welcome").hidden = true; st.step = step; st.phase = phase || "play"; st.miss = null; selected = null; order = null; save(); render(); window.scrollTo(0, 0); }

  // ---------- Bits of art ----------
  function cranePortrait(big) {
    const m = mood(st.power);
    return `<div class="portrait ${big ? "big" : ""}"><span class="face">${m[0]}</span><span class="nameplate">GOV. HALE</span></div>`;
  }
  function craneSays(text, big) {
    return `<div class="says crane-says">${cranePortrait(big)}<p class="speech">“<span>${esc(text)}</span>”</p></div>`;
  }
  function cardFace(k, extra) {
    const c = CARDS[k];
    return `<span class="ce">${c.e}</span><span class="cn">${esc(c.name)}</span><span class="cl">${esc(c.line)}</span><span class="cp">${esc(PIECE[c.p][2])}</span>${extra || ""}`;
  }
  function cardHtml(k, wrong) {
    const c = CARDS[k];
    return `<button type="button" class="pcard ${wrong ? "used" : ""} ${selected === k ? "sel" : ""}" data-card="${k}" ${wrong ? "disabled" : ""} aria-pressed="${selected === k}"><span class="ce">${c.e}</span><span class="cn">${esc(c.name)}</span><span class="cl">${esc(c.line)}</span>${wrong ? `<span class="usedtag">NOT THIS ONE</span>` : ""}</button>`;
  }
  function evHtml(ev, tilt) {
    return `<article class="doc ${tilt ? "tilt" : ""}"><span class="clip" aria-hidden="true">📎</span><p class="lab">${esc(ev.lab.replace(/^📎\s*/, ""))}</p><p class="evtext">${ev.html}</p><p class="src">${esc(ev.src)}</p></article>`;
  }

  // ---------- Screens ----------
  function titleScreen() {
    app.innerHTML = `<section class="title">
      <div class="title-text">
        <p class="kicker">Government · Unit 1 · Day 7</p>
        <h1>POWER GRAB</h1>
        <p class="hook">Someone stole the Constitution. The rules still count, but only if someone uses them. Hale is betting nobody will.</p>
        ${craneSays("No rulebook? Now I make the rules.")}
        <div class="what">
          <span>🃏 <b>Rule cards</b></span><span>⏱️ <b>25 min</b></span><span>⚔️ <b>7 showdowns</b></span>
        </div>
        <p class="goal">🎯 <span>Goal: Show how the Constitution's ideas work together to stop power grabs.</span></p>
        <button type="button" class="go big" id="startBtn">START ▶</button>
        <p class="fine">Hale and this story are made up. The rules and cases are real.</p>
      </div>
      <figure class="title-art"><img src="img/we-the-people.jpg" alt="The words We the People on the original U.S. Constitution"><figcaption>U.S. Constitution, 1787 · National Archives (public domain)</figcaption><div class="stamp slam">MISSING</div></figure>
    </section>`;
    $("startBtn").onclick = () => go(1);
  }

  function briefScreen() {
    const tiles = [["📎", "Read the evidence", ""], ["🃏", "Pick the card that fits", "Wrong card = Hale gets stronger"], ["⚡", "Shortcuts break the rules", "Twice = YOU're the villain"]];
    app.innerHTML = `<section class="table brief">
      <h2 class="table-h">How a showdown works</h2>
      <div class="tiles">${tiles.map((t, i) => `<div class="tile" style="--i:${i}"><span class="tile-e">${t[0]}</span><b>${esc(t[1])}</b>${t[2] ? `<span>${esc(t[2])}</span>` : ""}</div>`).join("")}</div>
      <h3 class="table-h small">The 8 rule cards · each showdown deals you 3</h3>
      <div class="hand fan">${HAND.map((k, i) => `<div class="pcard deal" style="--i:${i}">${cardFace(k)}</div>`).join("")}</div>
      <button type="button" class="go" id="dealBtn">First showdown ▶</button>
    </section>`;
    $("dealBtn").onclick = () => go(2);
  }

  function enterRound(r) {
    if (st.entered[r.id]) return;
    st.entered[r.id] = true;
    st.rounds[r.id] = { tries: [], order: freshOrder(r.deal.length).map(i => r.deal[i]) };
    if (r.id === "r3" && st.flags.emergencyForever) st.power = clamp(st.power + 5);
    if (r.id === "r7" && st.breaks) st.power = clamp(st.power + 8 * st.breaks);
    save();
  }

  function playScreen() {
    const r = curRound();
    enterRound(r); hud();
    const rr = st.rounds[r.id];
    const alt = r.tauntAlt && ((r.id === "r3" && st.flags.emergencyForever) || (r.id === "r7" && st.breaks));
    const taunt = alt ? r.tauntAlt : r.taunt;
    app.innerHTML = `<section class="table round">
      <div class="col-left">
        <article class="flash"><div class="flash-top"><span class="breaking">BREAKING</span><span class="flash-art" aria-hidden="true">${r.art}</span></div>
          <h2>${esc(r.title)}</h2><p class="flashtext">${r.flash}</p></article>
        ${st.miss ? "" : craneSays(taunt)}
        ${evHtml(r.ev, true)}
      </div>
      <div class="col-right">
        <div class="handh"><b>Which rule stops him?</b><span class="left-n">Pick 1 of 3</span></div>
        <div class="hand three" id="hand">${rr.order.map(k => cardHtml(k, rr.tries.includes(k))).join("")}</div>
        <div id="missBox">${st.miss ? missHtml(st.miss) : ""}</div>
        <button type="button" class="go" id="playBtn" disabled>Tap a card first</button>
        <div class="fallback">
          <button type="button" class="alt cut" id="cutBtn"><span class="ae">⚡</span><span><b>${esc(r.cut.label)}</b><small>Fast, but breaks the rules.</small></span></button>
          <button type="button" class="alt slide" id="slideBtn"><span class="ae">🤷</span><span><b>Let it slide</b><small>Hale gets much stronger.</small></span></button>
        </div>
      </div></section>`;
    $("hand").querySelectorAll(".pcard").forEach(b => b.onclick = () => {
      if (busy) return;
      selected = b.dataset.card;
      $("hand").querySelectorAll(".pcard").forEach(x => { x.classList.toggle("sel", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      $("playBtn").disabled = false; $("playBtn").textContent = T("Play this card ▶");
      const pb = $("playBtn").getBoundingClientRect();
      if (pb.bottom > window.innerHeight) $("playBtn").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
    $("playBtn").onclick = () => { if (selected && !busy) playCard(r, selected); };
    $("cutBtn").onclick = () => { if (!busy) resolve(r, "cut", null); };
    $("slideBtn").onclick = () => { if (!busy) resolve(r, "slide", null); };
  }

  function missHtml(m) {
    const c = CARDS[m.card];
    return `<div class="miss" role="status"><div class="miss-card"><span class="ce">${c.e}</span><span class="burn">NOPE</span></div>
      <div class="miss-body"><p class="miss-h"><b>${esc(c.name)}</b> <span>doesn't fit. Hale +${FX.miss}.</span></p><p>${esc(m.reason)}</p></div></div>`;
  }

  async function playCard(r, k) {
    busy = true;
    const el = document.querySelector(`.pcard[data-card="${k}"]`);
    const fit = r.fits[k];
    if (el) { el.classList.add(fit ? "launch" : "fizzle"); await wait(fit ? 450 : 550); }
    busy = false;
    st.rounds[r.id].tries.push(k);
    if (!fit) {
      st.power = clamp(st.power + FX.miss);
      st.miss = { card: k, reason: (r.miss[k] || "Reread the evidence.") + " Try one of the other cards." };
      selected = null; save(); render();
      const mb = $("missBox"); if (mb && mb.scrollIntoView) mb.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    resolve(r, fit.fit, k);
  }

  function resolve(r, kind, k) {
    const rr = st.rounds[r.id];
    rr.outcome = kind; rr.card = k;
    const d = (r.fx && r.fx[kind] != null) ? r.fx[kind] : FX[kind];
    st.power = clamp(st.power + d);
    rr.delta = d;
    if (k) st.pieces[CARDS[k].p] = true;
    if (kind === "cut") st.breaks++;
    if (kind === "slide") {
      if (r.id === "r1") st.flags.emergencyForever = true;
      if (r.id === "r7") st.flags.foreverGov = true;
    }
    st.phase = "result"; st.miss = null; selected = null; save(); render(); window.scrollTo(0, 0);
  }

  const STAMPS = { best: ["BLOCKED!", "good"], ok: ["SLOWED HIM", "meh"], cut: ["RULE BROKEN", "bad"], slide: ["HALE WINS", "bad"] };
  function resultScreen() {
    const r = curRound(), rr = st.rounds[r.id] || {};
    let head, res, reveal, crane, big;
    if (rr.outcome === "cut") { head = r.cut.head; res = r.cut.res; reveal = r.cut.reveal; crane = "Ha! Now you break rules too."; big = `<div class="bigcard cutcard"><span class="ce">⚡</span><span class="cn">${esc(r.cut.label)}</span></div>`; }
    else if (rr.outcome === "slide") { head = r.slide.head; res = r.slide.res; reveal = r.slide.reveal; crane = "Nobody stopped me. Love it."; big = `<div class="bigcard slidecard"><span class="ce">🤷</span><span class="cn">Let it slide</span></div>`; }
    else { const f = r.fits[rr.card]; head = f.head; res = f.res; reveal = f.reveal; crane = f.crane; big = `<div class="bigcard">${cardFace(rr.card)}</div>`; }
    let stamp = STAMPS[rr.outcome] || STAMPS.best;
    if (r.twist && (rr.outcome === "best" || rr.outcome === "ok")) stamp = ["RULES KEPT", "good"];
    if (rr.outcome === "ok" && r.fits[rr.card].okStamp) stamp = [r.fits[rr.card].okStamp, "meh"];
    const d = rr.delta || 0;
    const chip = rr.card ? `<p class="chip piece fly">📜 <span>Piece restored:</span> <b>${esc(PIECE[CARDS[rr.card].p][2])}</b></p>` : "";
    const nextLabel = r.check ? "Hale's lawyer objects ▶" : (roundIx() === ROUNDS.length - 1 ? "See how it ends ▶" : "Next showdown ▶");
    app.innerHTML = `<section class="table result">
      <div class="arena">
        <div class="played">${big}<div class="stamp slam ${stamp[1]}">${esc(stamp[0])}</div></div>
        <div class="versus" aria-hidden="true">VS</div>
        <div class="crane-side">${craneSays(crane, true)}</div>
      </div>
      <article class="outcome"><h2>${esc(head)}</h2><p class="restext">${esc(res)}</p></article>
      <p class="reveal">💡 <span>${reveal}</span></p>
      <div class="chips"><p class="delta ${d > 0 ? "up" : "down"}">${d === 0 ? "Hale's power: no change" : "Hale's power " + (d > 0 ? "+" + d : "−" + Math.abs(d))}</p>${chip}${rr.outcome === "cut" ? `<p class="chip warn">⚠️ <span>Rules broken:</span> <b>${st.breaks}</b></p>` : ""}</div>
      <button type="button" class="go" id="nextBtn">${nextLabel}</button></section>`;
    $("nextBtn").onclick = () => {
      if (r.check) { st.phase = "check"; save(); order = null; render(); window.scrollTo(0, 0); }
      else nextRound();
    };
  }

  function nextRound() { if (roundIx() >= ROUNDS.length - 1) { st.ending = computeEnding(); go(9); } else go(st.step + 1); }

  // ---------- Evidence check: a courtroom objection ----------
  function checkScreen() {
    const r = curRound(), id = r.check, c = CHECKS[id];
    const cs = st.checks[id] || (st.checks[id] = { wrong: 0, done: false });
    const ev = c.ev || r.ev;
    if (!order) order = freshOrder(c.opts.length);
    const speaker = c.crane
      ? `<div class="says crane-says">${cranePortrait(true)}<p class="speech">“<span>${esc(c.who)}</span>”</p></div>`
      : `<div class="says lawyer-says"><div class="portrait big lawyer"><span class="face">🧑‍💼</span><span class="nameplate">HALE'S LAWYER</span></div><p class="speech">“<span>${esc(c.who)}</span>”</p><div class="stamp slam good hide" id="overruled">OVERRULED</div></div>`;
    app.innerHTML = `<section class="table court">
      <div class="bench"><span class="gavel" id="gavel" aria-hidden="true">🔨</span><b>COURTROOM</b><span class="tagline">Evidence check</span></div>
      <div class="court-grid">
        <div class="court-left">${speaker}${evHtml(ev, false)}</div>
        <div class="court-right">
          <div class="says judge-says"><div class="portrait judge"><span class="face">👩‍⚖️</span><span class="nameplate">JUDGE</span></div><p class="speech" id="judgeSays"><span>${esc(c.q)}</span></p></div>
          <div id="opts" class="args"></div>
          <p id="checkMsg" class="msg" role="status" aria-live="polite"></p>
          <div id="checkEnd"></div>
        </div>
      </div></section>`;
    if (cs.done) return checkDone(c, true);
    drawOpts(c, cs);
  }
  function drawOpts(c, cs) {
    const box = $("opts");
    box.innerHTML = "";
    order.forEach(n => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "arg";
      b.innerHTML = `<span class="arg-e" aria-hidden="true">${(c.icons || [])[n] || "📄"}</span><span class="arg-t"></span>`;
      b.querySelector(".arg-t").textContent = c.opts[n];
      b.onclick = () => {
        if (locked) return;
        if (n === 0) { cs.done = true; save(); checkDone(c, false); return; }
        cs.wrong++; st.power = clamp(st.power + FX.objection); save(); hud();
        locked = true; box.querySelectorAll("button").forEach(x => x.disabled = true);
        b.classList.add("shake");
        let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;   // Test T. (teacher) skips the wrong-answer lock
        const msg = $("checkMsg");
        $("judgeSays").innerHTML = `<span>${esc(T("Objection sustained. Hale +" + FX.objection + ". " + c.hint))}</span>`;
        const tick = () => {
          msg.textContent = "⏳ " + left;
          msg.className = "msg wait";
          if (left-- <= 0) { locked = false; msg.textContent = ""; msg.className = "msg"; order = freshOrder(c.opts.length, order); drawOpts(c, cs); return; }
          setTimeout(tick, 1000);
        };
        tick();
      };
      box.appendChild(b);
    });
  }
  function checkDone(c, quiet) {
    const r = curRound();
    if (r.id === "r7") { st.pieces.amd = true; save(); hud(); }
    $("opts").innerHTML = `<div class="arg won"><span class="arg-e" aria-hidden="true">${(c.icons || [])[0] || "✅"}</span><span class="arg-t">${esc(c.opts[0])}</span></div>`;
    const o = $("overruled"); if (o) o.classList.remove("hide");
    if (!quiet) { const g = $("gavel"); if (g) g.classList.add("bang"); }
    $("checkMsg").className = "msg"; $("checkMsg").textContent = "";
    $("judgeSays").innerHTML = `<span>${esc(c.why)}</span>`;
    const last = roundIx() === ROUNDS.length - 1;
    $("checkEnd").innerHTML = `<button type="button" class="go" id="nextBtn">${last ? "See how it ends ▶" : "Next showdown ▶"}</button>`;
    $("nextBtn").onclick = () => nextRound();
  }

  // ---------- Endings ----------
  function computeEnding() {
    if (st.breaks >= 2) return "villain";
    if (st.flags.foreverGov || st.power >= 65) return "crane";
    if (st.power <= 25) return "balance";
    return "close";
  }
  const ENDINGS = {
    balance: { e: "🏛️", name: "Balance Restored", head: "BALANCE RESTORED", text: "Every branch did its job. Hale can't rule alone." },
    close:   { e: "⚖️", name: "Close Call", head: "CLOSE CALL", text: "Hale got checked, barely. Some gaps stayed open too long." },
    crane:   { e: "👑", name: "Hale Takes Over", head: "HALE TAKES OVER", text: "The rules were there. Nobody used them in time." },
    villain: { e: "🪞", name: "You Became Hale", head: "YOU BECAME HALE", text: "You beat Hale by breaking his rules. Who stops YOU now?" }
  };
  function causeRows() {
    return ROUNDS.map(r => {
      const rr = st.rounds[r.id] || {};
      let what, cls, e;
      if (rr.outcome === "cut") { what = r.cut.label; cls = "bad"; e = "⚡"; }
      else if (rr.outcome === "slide") { what = "Let it slide"; cls = "bad"; e = "🤷"; }
      else if (rr.card) { what = CARDS[rr.card].name; cls = rr.outcome; e = CARDS[rr.card].e; }
      else { what = "—"; cls = "bad"; e = "❔"; }
      const fitText = { best: "best move", ok: "slow", cut: "broke the rules", slide: "Hale won" }[rr.outcome] || "";
      const misses = (rr.tries || []).filter(k => k !== rr.card).length;
      return { r, what, cls, fitText, misses, e };
    });
  }
  function endingScreen() {
    if (!st.ending) { st.ending = computeEnding(); save(); }
    const E = ENDINGS[st.ending];
    const rows = causeRows();
    const found = (st.rounds.r4 || {}).outcome;
    const docLine = found === "best" ? "The Constitution was found in one day. The thief: a Hale staffer." : found === "ok" ? "The Constitution was found after three months. The thief: a Hale staffer." : found === "cut" ? "Found, but the thief walked free." : "Found at the very end.";
    const good = st.ending === "balance" || st.ending === "close";
    app.innerHTML = `<section class="table end">
      <article class="paper ${st.ending}">
        <div class="masthead"><span>THE CEDAR VALLEY GAZETTE</span><small>Made-up newspaper · Final edition</small></div>
        <div class="paper-top"><div><p class="kicker">Your ending</p><h2 class="headline">${E.e} <span>${esc(E.head)}</span></h2><p class="endtext">${esc(E.text)}</p><p class="docline">📜 <span>${esc(docLine)}</span></p></div>
          <div class="paper-art"><div class="paper-face">${good ? "😰" : st.ending === "crane" ? "😈" : "🪞"}</div><div class="stamp slam ${good ? "good" : "bad"}">${good ? "CASE CLOSED" : "GAME OVER"}</div></div></div>
        <div class="final-meters"><p>😏 <span>Hale's power</span> <b>${st.power}</b></p><p>⚠️ <span>Rules broken</span> <b>${st.breaks}</b></p><p>📜 <span>Constitution pieces</span> <b>${Object.keys(st.pieces).length}/8</b></p></div>
        <h3>Caused by:</h3>
        <div class="cause">${rows.map((x, i) => `<div class="cause-card ${x.cls}" style="--i:${i}"><span class="cc-round">${x.r.art} <b>${esc(x.r.short)}</b></span><span class="cc-play">${x.e} <span>${esc(x.what)}</span></span><em>${esc(x.fitText)}</em>${x.misses ? `<small>${x.misses === 1 ? "1 wrong card" : x.misses + " wrong cards"}</small>` : ""}</div>`).join("")}</div>
        <p class="reveal">💡 <span><b>The Constitution only works when people use it.</b></span></p>
      </article>
      <button type="button" class="go" id="toReport">Last step: your case file ▶</button></section>`;
    $("toReport").onclick = () => go(10);
  }

  // ---------- Report + turn in (a case file) ----------
  function reportScreen() {
    const E = ENDINGS[st.ending || computeEnding()];
    app.innerHTML = `<section class="table report">
      <article class="folder">
        <div class="folder-tab">CASE FILE · STATE v. HALE</div>
        <div class="folder-head"><h2>File your report</h2><p class="ending-chip">${E.e} <b>${esc(E.name)}</b></p></div>
        ${PROMPTS.map(p => `<div class="sheet"><p class="sheet-tag">${esc(PROMPT_TAGS[p.id])}</p><label for="w_${p.id}">${esc(p.label)}</label><p class="stem">Start: <i>${esc(p.stem)}</i></p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea></div>`).join("")}
        <div class="sheet sign"><label for="studentName">First name + last initial</label>
        <input id="studentName" type="text" autocomplete="off" maxlength="60" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}"></div>
        <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
        <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in. You can fix your writing and turn it in again." : ""}</p>
        <div class="stamp slam good ${st.turnedIn ? "" : "hide"}" id="filedStamp">FILED</div>
      </article></section>`;
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("studentName").addEventListener("input", e => { st.name = e.target.value; save(); });
    $("sendBtn").onclick = send;
  }

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  async function send() {
    const msg = $("sendMsg");
    const es = window.SiteLang && window.SiteLang.isEs();
    for (const p of ((window.classIsTestT && window.classIsTestT()) ? [] : PROMPTS)) {   // Test T. (teacher) skips the writing rules
      const box = $("w_" + p.id), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: es ? T(p.stem) : p.stem, source: "from the game", sourceEs: "del juego" });
        if (junk) { msg.textContent = (es ? "En " + T(p.short) : "For " + p.short) + ": " + junk; msg.className = "msg wait"; return; }
      }
      if (v.length < 40) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg wait"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg wait"; box.focus(); return; }
      const stemWords = new Set(plain(p.stem + " " + T(p.stem)).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < 6) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "msg wait"; box.focus(); return; }
      const glue = ["the", "a", "an", "to", "because", "when", "so", "he", "they", "it", "was", "is", "in", "of", "him", "his", "could", "can", "el", "la", "los", "las", "porque", "cuando", "que", "de", "en", "es", "fue", "lo", "su", "pudo", "puede"];
      const allW = plain(v).match(/[\p{L}']+/gu) || [];
      if (allW.length < 12 || allW.filter(w => glue.includes(w)).length < 3) { msg.textContent = "Write it as full sentences: what happened in the game, and why it worked."; msg.className = "msg wait"; box.focus(); return; }
      if (p.must && !p.must.some(w => plain(v).includes(w))) { msg.textContent = p.mustMsg; msg.className = "msg wait"; box.focus(); return; }
      if (p.detail && !p.detail.some(w => plain(v).includes(w))) { msg.textContent = p.detailMsg; msg.className = "msg wait"; box.focus(); return; }
    }
    const nameBox = $("studentName");
    const name = window.classShortName ? window.classShortName(nameBox.value) : nameBox.value.trim();
    if (!/^\S+ [A-Z]\.$/.test(name)) { msg.textContent = "Type your first name and last initial, like Jordan M."; msg.className = "msg wait"; nameBox.focus(); return; }
    st.name = name; save();

    const answers = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => st.checks[id] && st.checks[id].done && !st.checks[id].wrong).length;
    answers["First-try correct"] = right + " of " + CHECK_IDS.length;
    const byStd = {};
    CHECK_IDS.forEach(id => { const c = CHECKS[id]; byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (st.checks[id] && st.checks[id].done && !st.checks[id].wrong) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    CHECK_IDS.forEach(id => { const c = CHECKS[id], w = (st.checks[id] || {}).wrong || 0; answers[c.short] = c.opts[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    ROUNDS.forEach(r => {
      const rr = st.rounds[r.id] || {};
      const burned = (rr.tries || []).filter(k => k !== rr.card).map(k => CARDS[k].name);
      let what = rr.outcome === "cut" ? "Broke the rules: " + r.cut.label : rr.outcome === "slide" ? "Let it slide" : rr.card ? CARDS[rr.card].name + (rr.outcome === "best" ? " (best fit)" : " (works, slower)") : "—";
      if (burned.length) what = "Tried " + burned.join(", ") + " (didn't fit), then " + what;
      answers["Choice · " + r.short] = what;
    });
    answers["Ending"] = ENDINGS[st.ending || computeEnding()].name;
    answers["Hale's power at the end"] = st.power + " of 100";
    answers["Rules broken"] = String(st.breaks);
    answers["Constitution pieces restored"] = Object.keys(st.pieces).length + " of 8";

    const btn = $("sendBtn");
    btn.disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      btn.textContent = "Turn in again"; btn.disabled = false;
      $("filedStamp").classList.remove("hide");
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg wait"; btn.disabled = false; }
  }

  // ---------- Router ----------
  let firstRender = true;
  function render() {
    if (!firstRender) $("welcome").hidden = true;
    firstRender = false;
    document.body.dataset.screen = st.step === 0 ? "title" : st.step >= 2 && st.step <= 8 ? st.phase : st.step === 1 ? "brief" : st.step === 9 ? "end" : "report";
    hud();
    if (st.step === 0) return titleScreen();
    if (st.step === 1) return briefScreen();
    if (st.step >= 2 && st.step <= 8) {
      if (st.phase === "result") return resultScreen();
      if (st.phase === "check") return checkScreen();
      return playScreen();
    }
    if (st.step === 9) return endingScreen();
    return reportScreen();
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; save();
    $("welcome").hidden = true; locked = false; lastPower = st.power; render(); window.scrollTo(0, 0);
  };
  if (st.step > 0) { $("welcome").textContent = "Welcome back! You're on step " + st.step + " of " + STEPS + "."; $("welcome").hidden = false; }
  render();

  // ---------- Test T. skip bar (shared/turnin.js) ----------
  // The teacher signed in as Test T. can jump to any screen or answer the current one.
  // Unplayed showdowns get filled in with the best unused card (Test T. only).
  try {
    const SCREENS = [{ step: 0, label: "Title" }, { step: 1, label: "How it works" }];
    ROUNDS.forEach((r, i) => {
      const n = "Showdown " + (i + 1);
      SCREENS.push({ step: i + 2, phase: "play", label: n + " · " + r.short }, { step: i + 2, phase: "result", label: n + " · result" });
      if (r.check) SCREENS.push({ step: i + 2, phase: "check", label: n + " · evidence check" });
    });
    SCREENS.push({ step: 9, label: "Ending" }, { step: 10, label: "Case file + turn in" });
    const bestCard = r => r.deal[0];
    const playBest = r => {
      enterRound(r);
      const k = bestCard(r);
      st.rounds[r.id].tries.push(k); resolve(r, r.fits[k].fit, k);
    };
    const fill = upTo => { for (let j = 0; j < upTo; j++) { const r = ROUNDS[j]; if (!(st.rounds[r.id] && st.rounds[r.id].outcome)) { st.step = j + 2; playBest(r); } } };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => SCREENS.length,
      index: () => {
        const ph = st.step >= 2 && st.step <= 8 ? (st.phase || "play") : undefined;
        const k = SCREENS.findIndex(x => x.step === st.step && x.phase === ph);
        return Math.max(0, k >= 0 ? k : SCREENS.findIndex(x => x.step === st.step));
      },
      label: i => SCREENS[i].label,
      go: i => {
        const t = SCREENS[i];
        if (!st.name) st.name = "Test T.";
        locked = false; busy = false; selected = null; order = null; st.miss = null;
        if (t.step >= 2 && t.step <= 8) fill(t.phase === "play" ? t.step - 2 : t.step - 1);
        else if (t.step >= 9) { fill(ROUNDS.length); st.ending = computeEnding(); }
        $("welcome").hidden = true; st.step = t.step; st.phase = t.phase || "play"; save(); render();
      },
      solve: () => {
        if (st.step < 2 || st.step > 8) return;
        const r = curRound();
        if (st.phase === "play") { if (!busy) playBest(r); }
        else if (st.phase === "check") { const cs = st.checks[r.check] || (st.checks[r.check] = { wrong: 0, done: false }); if (!cs.done) { cs.done = true; locked = false; save(); render(); } }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}

  // For testing and the Spanish file check.
  window.PowerGrab = { ROUNDS, CHECKS, CARDS, PIECES, PROMPTS, PROMPT_TAGS, ENDINGS, STAMPS, state: () => st };
})();
