// =====================================================================
//  LAST BUS HOME (Sociology Unit 2 Day 4: Why do people team up for change?)
//  An 8-week organizing game. The student recruits people (each with a reason and a catch),
//  spends weekly moves (bus tickets) on tactics, and pushes the movement up the real stages
//  (emergence -> coalescence -> bureaucratization -> decline). Momentum fades every week and
//  fades faster when the movement stalls. Chair Pruitt and a counter-group push back.
//  Endings: win (new policy), compromise (small reform / co-optation), fizzle (failure).
//  6 evidence checks are "stamp the document" moments inside play (they feed first-try data).
//  Everything saves on this device. Turn-in goes through shared/turnin.js.
//  Riverbend, Route 12, and all people are made up. History files are real and sourced.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u2-d4-team-up-v2";
  const ASSIGNMENT_ID = "soc-u2-d4-team-up";
  const TITLE = "Sociology · Unit 2 · Day 4 · Why Do People Team Up for Change?";
  const STANDARD = "SS.9-12.Soc.7, SS.9-12.Soc.8";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const WEEKS = 8, TOTAL_STEPS = 10, LOCK = 5;
  const STAGES = ["Emergence", "Coalescence", "Bureaucratization", "Decline"];

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const MINUS = "−";
  const sign = n => (n >= 0 ? "+" : MINUS) + Math.abs(n);
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // ---------------- People you can recruit (all made up). line = one short line; fx shows as icon numbers ----------------
  const PEOPLE = {
    kiara:   { icon: "🧑🏾‍🏭", name: "Kiara, 17", first: "Kiara", stage: 0, line: "True story. Skips rallies.", fx: { mom: 5 }, story: true },
    jayden:  { icon: "😤", name: "Jayden, 16", first: "Jayden", stage: 0, line: "Big energy. Reckless.", fx: { mom: 12 } },
    rosa:    { icon: "📱", name: "Rosa, 22", first: "Rosa", stage: 0, line: "TikToker. Doubles posts. Drama.", fx: { mom: 6 } },
    okafor:  { icon: "🩺", name: "Mr. Okafor, 54", first: "Mr. Okafor", stage: 1, line: "Respected. Hates scary tactics.", fx: { pres: 5 }, story: true, moderate: true },
    lee:     { icon: "⛪", name: "Pastor Lee", first: "Pastor Lee", stage: 1, line: "30 church members.", moves: 2, fx: { mom: 10, pres: 4 }, moderate: true },
    vic:     { icon: "🍳", name: "Vic, 48", first: "Vic", stage: 1, line: "Diner owner. Hates rallies.", fx: { cash: 40 }, moderate: true },
    hart:    { icon: "📊", name: "Ms. Hart, 68", first: "Ms. Hart", stage: 1, line: "Math teacher. Unlocks rider count.", fx: { mom: -5 }, moderate: true },
    deshawn: { icon: "🛠️", name: "Deshawn, 24", first: "Deshawn", stage: 1, line: "Union leader. Free official move.", needCash: 20, fx: { cash: -20 } }
  };
  const PEOPLE_ORDER = ["kiara", "jayden", "rosa", "okafor", "lee", "vic", "hart", "deshawn"];

  // ---------------- Tactics ----------------
  const TACTICS = {
    chat:     { icon: "💬", name: "Group chat", stage: 0, line: "", fx: { mom: 8 } },
    post:     { icon: "📣", name: "Angry video", stage: 0, line: "", fx: { mom: 12, pres: -4 } },
    petition: { icon: "📝", name: "Petition drive", stage: 1, line: "Bigger team, more names.", fx: { mom: 2 } },
    rally:    { icon: "🪧", name: "Rally at City Hall", stage: 1, line: "Big crowd. Vic quits.", fx: { mom: 18, pres: 4 } },
    speak:    { icon: "🎤", name: "Speak at the board", stage: 1, line: "True stories count extra.", fx: { mom: -4, pres: 6 } },
    ridein:   { icon: "🚌", name: "Ride-in", stage: 1, needTeam: 4, line: "Pack the bus. Proof!", fx: { mom: -6, pres: 12 } },
    block:    { icon: "🚧", name: "Block the street", stage: 1, once: true, line: "Huge noise. Calm people quit.", fx: { mom: 20, pres: -15 } },
    fund:     { icon: "🧽", name: "Car wash", stage: 1, line: "", fx: { cash: 30, mom: 2 } },
    count:    { icon: "📈", name: "Rider count", stage: 2, once: true, needPerson: "hart", line: "", fx: { mom: -3, pres: 16 } },
    lawyer:   { icon: "⚖️", name: "Budget lawyer", stage: 2, once: true, needCash: 40, line: "Finds unspent city money.", fx: { cash: -40, pres: 14 } },
    meet:     { icon: "🤝", name: "Meet Pruitt", stage: 2, line: "", fx: { mom: -3, pres: 10 } },
    voters:   { icon: "🗳️", name: "Voter sign-up", stage: 2, needCash: 20, line: "The board faces elections.", fx: { cash: -20, pres: 10, mom: 4 } }
  };
  const TACTIC_ORDER = ["chat", "post", "petition", "rally", "speak", "ridein", "block", "fund", "count", "lawyer", "meet", "voters"];
  const TACTIC_PRUITT = { rally: "So loud.", speak: "Noted.", block: "We're done.", count: "Hm. Numbers.", lawyer: "Where'd you find that?", ridein: "Why's it full?", meet: "Ten minutes.", post: "Online yelling." };

  const PRUITT = {
    1: "Hardly anyone rides it.",
    2: "Anger isn't a budget.",
    3: "Families hate new fees.",
    4: "Who speaks for you people?",
    5: "Behave yourselves.",
    6: "Let's make a deal.",
    7: "Show me real numbers.",
    8: "We vote tomorrow."
  };

  // ---------------- Evidence checks: stamp the document (first option is right, except c2) ----------------
  const DEFS_TYPES = `<ul class="defs"><li><b>Reform:</b> change one policy.</li><li><b>Revolutionary:</b> replace the system.</li><li><b>Resistance:</b> stop a change.</li><li><b>Alternative:</b> change personal habits.</li></ul>`;
  const DEFS_STAGES = `<ul class="defs"><li><b>Emergence:</b> upset, unorganized.</li><li><b>Coalescence:</b> organized, public.</li><li><b>Bureaucratization:</b> staff, rules, money.</li><li><b>Decline:</b> winds down.</li></ul>`;
  const DEFS_RESPONSES = `<ul class="defs"><li><b>Resist:</b> no change.</li><li><b>Small reform:</b> change a little.</li><li><b>New policy:</b> fully meet the need.</li></ul>`;
  const TYPE_ANSWER = { reform: "A reform movement", revolution: "A revolutionary movement", alternative: "An alternative movement" };
  const TYPE_STAMP = { reform: "REFORM", revolution: "REVOLUTIONARY", alternative: "ALTERNATIVE" };
  const CHECKS = {
    c1: { std: "Soc.8", short: "Crowd = collective behavior", ask: "Pick the stamp.", stamp: "COLLECTIVE BEHAVIOR",
      options: ["Collective behavior: short, unplanned", "Social movement: organized, lasting", "Bureaucratization: formal, with rules", "Reform movement: changes one policy"],
      hint: "Was it planned? Did it last?",
      why: "<b>Collective behavior:</b> short, unplanned crowd." },
    c2: { std: "Soc.8", short: "Our movement's type", ask: "Pick the stamp.", stamp: "",
      options: ["A reform movement", "A revolutionary movement", "A resistance movement", "An alternative movement"],
      hint: "Match your demand to a type.", why: "" },
    c3: { std: "Soc.8", short: "Keep Our Budget = resistance", ask: "Pick the stamp.", stamp: "RESISTANCE",
      options: ["A resistance movement", "A reform movement", "A revolutionary movement", "An alternative movement"],
      hint: "Pushing for change, or stopping one?",
      why: "<b>Resistance movement:</b> stops a change." },
    c4: { std: "Soc.8", short: "NAACP = bureaucratization", ask: "Pick the stamp.", stamp: "BUREAUCRATIZATION",
      options: ["Bureaucratization", "Coalescence", "Emergence", "Decline"],
      hint: "Staff and dues mean a formal group.",
      why: "<b>Bureaucratization:</b> slower, but it lasts." },
    c5: { std: "Soc.7", short: "Board's offer = small reform", ask: "Pick the stamp.", stamp: "SMALL REFORM",
      options: ["A small reform", "Resisting change", "A new policy", "Ignoring the need"],
      hint: "10 p.m. vs. midnight: all or some?",
      why: "<b>Small reform:</b> some of the need, not all." },
    c6: { std: "Soc.7", short: "Montgomery: how institutions responded", ask: "Pick the stamp.", stamp: "RESISTED, THEN CHANGED",
      options: ["Resisted, then courts forced change", "Agreed to change right away", "Shut the buses down forever", "Ignored it until it fizzled"],
      hint: "What did the courts do?",
      why: "<b>Resisted</b> first. Then a <b>new policy</b>." }
  };
  const CHECK_ORDER = ["c1", "c2", "c3", "c4", "c5", "c6"];
  const C2_WHY = {
    reform: "One policy: a <b>reform movement</b>.",
    revolution: "Whole system: a <b>revolutionary movement</b>.",
    alternative: "Personal habits: an <b>alternative movement</b>."
  };

  // ---------------- Writing (in-world: the recap post) ----------------
  const PROMPTS = [
    { id: "why", short: "Why it ended this way", label: "1. Why did it end this way? Name a stage.",
      stem: "We ended in a ___ because in the ___ stage we ___.", min: 60, newWords: 5,
      mustInclude: ["emergence", "coalescence", "bureaucrat", "decline"], mustMsg: "Answer 1: name a stage (emergence, coalescence, bureaucratization, or decline)." },
    { id: "inst", short: "How the board responded", label: "2. How did the board respond, and why?",
      stem: "The board responded with ___ because ___.", min: 60, newWords: 5,
      mustInclude: ["because", "since", "so ", "cause"], mustMsg: "Answer 2: explain why (use \"because\")." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ v: 2, name: "", phase: "start", week: 1, sub: 0, scripts: {}, stage: 0, stageWeek: 1, officialWeek: 0,
    mom: 30, pres: 0, cash: 0, team: [], gone: [], demand: null, code: false, fade: false, deal: false, stalledOnce: false,
    uses: {}, picks: {}, results: {}, wrong: {}, done: {}, moveLog: {}, lost: {}, ends: {}, flags: {}, ending: null, keep: 0,
    say: "", writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 2) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this computer, start fresh for them.
  try {
    const who = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (who && st.name && who !== st.name) { st = fresh(); if (window.classFirstTry) window.classFirstTry.reset(); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // ---------------- Rules ----------------
  const has = id => st.team.includes(id);
  // Going public needs 3 people, or 2 if not enough first-stage people are left to recruit (no soft-lock).
  const needPublic = () => PEOPLE_ORDER.filter(id => PEOPLE[id].stage === 0 && !st.gone.includes(id)).length >= 3 ? 3 : 2;
  const votesFor = () => clamp(1 + Math.floor(st.pres / 16), 0, 7);
  const demandMult = () => st.demand === "revolution" ? 0.5 : st.demand === "alternative" ? 0.25 : 1;

  // Apply changes. Positive pressure is scaled by demand type and momentum.
  function apply(d, out) {
    out = out || { chips: [], notes: [] };
    if (d.pres) {
      let p = d.pres;
      if (p > 0) {
        let m = demandMult();
        if (st.mom < 20) { m *= 0.5; out.notes.push("Low momentum: counted half."); }
        else if (st.mom >= 60) { m *= 1.25; out.notes.push("Big crowd: counted extra."); }
        if (st.demand === "alternative") out.notes.push("Your demand: the board barely felt it.");
        if (st.demand === "revolution") out.notes.push("Your demand scares calm supporters.");
        p = Math.max(1, Math.round(p * m));
      }
      const before = st.pres; st.pres = clamp(st.pres + p, 0, 100);
      if (st.pres !== before) out.chips.push(sign(st.pres - before) + " pressure");
    }
    if (d.mom) { const before = st.mom; st.mom = clamp(st.mom + d.mom, 0, 100); if (st.mom !== before) out.chips.push(sign(st.mom - before) + " momentum"); }
    if (d.cash) { st.cash = Math.max(0, st.cash + d.cash); out.chips.push((d.cash > 0 ? "+$" : MINUS + "$") + Math.abs(d.cash)); }
    return out;
  }
  function join(id, out) { if (has(id) || st.gone.includes(id)) return; st.team.push(id); out.notes.push(PEOPLE[id].first + " joined."); }
  function leave(id, out) { if (!has(id)) return; st.team = st.team.filter(x => x !== id); st.gone.push(id); out.notes.push(PEOPLE[id].first + " quit."); }
  function stageUp(to, out) {
    st.stage = to; st.stageWeek = st.week; if (to === 2) st.officialWeek = st.week;
    apply({ mom: 10 }, out); out.notes.push(to === 1 ? "New stage: Coalescence!" : "New stage: Bureaucratization!");
  }
  function movesFor(week) { return 2 + (st.stage === 2 && st.officialWeek && st.officialWeek < week ? 1 : 0) - (st.lost[week] || 0); }
  function movesUsed(week) { return (st.moveLog[week] || []).reduce((n, m) => n + (m.cost || 0), 0); }
  const movesLeft = () => Math.max(0, movesFor(st.week) - movesUsed(st.week));
  function makeOfficial(out) {
    stageUp(2, out);
    apply({ mom: -5 }, out);
    st.code = true;
    if (has("jayden")) leave("jayden", out);
  }

  // ---------------- Week scripts ----------------
  function scriptFor(w) {
    if (st.scripts[w]) return st.scripts[w];
    const s = {
      1: ["news", "crowd", "c1", "moves", "end"],
      2: ["demand", "c2", "public", "moves", "end"],
      3: ["kob", "c3", "kobReply", "moves", "end"],
      4: ["chaos", "c4", "official", "moves", "end"],
      5: [(has("jayden") && !st.code) ? "jayden" : "tv", "moves", "end"],
      6: ["offer", "c5", "deal", "moves", "end"],
      7: ["burnout", "moves", "end"],
      8: ["final", "moves", "vote"]
    }[w];
    st.scripts[w] = s; save();
    return s;
  }

  // ---------------- Events: big decision cards ----------------
  const EVENTS = {
    crowd: { short: "Crowd night", art: "🏛️", cap: "", bg: "bg-night", title: "80 angry riders show up",
      body: () => bub("😡", "", "\"They can't take our bus!\" Someone kicks a trash can."),
      choices: {
        sign: { em: "📋", t: "Pass a sign-up sheet", s: "Slow, but you get names.", say: "A clipboard. Cute.", run: o => { apply({ mom: 3 }, o); join("kiara", o); return "23 sign up. Kiara first."; } },
        chant: { em: "📢", t: "Lead a louder chant", s: "Huge energy right now.", say: "Loud. They'll go home.", run: o => { apply({ mom: 18 }, o); st.fade = true; o.notes.push("This energy fades fast."); return "Huge! Then everyone goes home."; } },
        stream: { em: "🔴", t: "Livestream it", s: "Thousands could see it.", say: "A mob. Great.", run: o => { apply({ mom: 10, pres: -5 }, o); join("rosa", o); return "Rosa shares it. The kick goes viral."; } }
      } },
    demand: { short: "Our demand", art: "🪑", cap: "", bg: "bg-gold", title: "Pick your demand",
      body: () => bub("🙋", "", "\"What do we actually want?\""),
      choices: {
        reform: { em: "🚌", t: "Make Route 12 permanent", full: "Make Route 12 permanent in the city budget.", s: "Doable. A bit boring.", say: "A real ask.", run: o => { st.demand = "reform"; apply({ mom: -4 }, o); return "People nod."; } },
        revolution: { em: "💥", t: "Fire the whole council", full: "Fire the whole transit board and city council.", s: "Exciting. Calm people refuse.", say: "Fire us? Good luck.", run: o => { st.demand = "revolution"; apply({ mom: 15 }, o); return "Cheers. Older riders walk out."; } },
        alternative: { em: "🚲", t: "Everyone carpool and bike", full: "Get riders to change their own habits: carpool and bike.", s: "No fight. No pressure.", say: "Carpools? Fine by me.", run: o => { st.demand = "alternative"; apply({ mom: 8 }, o); return "Carpools start. The board shrugs."; } }
      } },
    kobReply: { short: "Answer to Keep Our Budget", art: "⚔️", cap: "", bg: "bg-red", title: "Answer Keep Our Budget",
      body: () => bub("📱", "", "\"They called us greedy! Hit back!\""),
      choices: {
        attack: { em: "💥", t: "Hit back online", s: "Fans love it. Board hates it.", say: "Getting nasty.", run: o => { apply({ mom: 10, pres: -8 }, o); return "2,000 likes. The board is annoyed."; } },
        forum: { em: "🪑", t: "Hold a public meeting", s: "Boring. But fair.", say: "Huh. Fair.", run: o => { apply({ mom: -6, pres: 6 }, o); return "They listen."; } }
      },
      reveal: "<b>Counter-movement:</b> pushes the opposite way." },
    official: { short: "Make it official?", art: "🏢", cap: "", bg: "bg-purple", title: "Make your group official?",
      body: () => bub("🛠️", "", "Official = elected leaders, dues, rules."),
      choices: {
        official: { em: "🏢", t: "Make it official", s: "Costs a move. Some hate rules.", say: "Finally, someone to call.",
          ok: () => st.stage < 1 ? "Needs: go public first." : st.team.length < 4 ? "Needs: 4 people." : "",
          run: o => { makeOfficial(o); if (!has("deshawn")) { st.lost[4] = (st.lost[4] || 0) + 1; } else o.notes.push("Deshawn set it up free."); return "\"Riders for Route 12\" is born."; },
          reveal: "Next week: <b>+1 move</b> and $10 dues." },
        loose: { em: "💬", t: "Stay a loose chat", s: "Free. Nobody's in charge.", say: "Who's in charge?", run: o => { apply({ mom: 5 }, o); return "Free, and still chaos."; },
          reveal: "Loose groups often <b>stall</b>." }
      } },
    jayden: { short: "Jayden's post", art: "📱", cap: "", bg: "bg-red", title: "Jayden posted their addresses",
      body: () => bub("😤", "Jayden", "\"Here's where the board lives.\"", "chat") + bub("⚠️", "", "Posting home addresses is <b>doxxing</b>. It's dangerous."),
      choices: {
        kick: { em: "🚫", t: "Remove Jayden, apologize", s: "Right thing. Embarrassing.", say: "Thanks for handling that.", run: o => { leave("jayden", o); apply({ mom: -8, pres: -3 }, o); st.flags.doxxKick = true; return "The board accepts."; } },
        quiet: { em: "🤐", t: "Say nothing", s: "No fight. Board sees it.", say: "Your group is dangerous.", run: o => { apply({ pres: -15, mom: 4 }, o); leave("okafor", o); leave("lee", o); st.flags.doxxQuiet = true; return "TV covers it. The board blames you."; } }
      },
      reveal: "Bad actions can make movements <b>fail</b>." },
    tv: { short: "TV story", art: "📺", cap: "", bg: "bg-teal", title: "Channel 9 calls",
      body: () => bub("🎥", "", "\"One segment. Who's telling it?\""),
      choices: {
        story: { em: "🎙️", t: "A rider's true story", s: "Moves the board. Airs late.", say: "That story hurt.", run: o => { const real = has("kiara") || has("okafor"); if (!real) o.notes.push("No night riders: hit softer."); apply({ pres: real ? 10 : 5, mom: -3 }, o); return "\"I'd walk 4 miles at midnight.\""; } },
        video: { em: "📹", t: "Make a viral video", s: "Tons of views. Board shrugs?", say: "Views aren't votes.", run: o => { if (has("rosa")) o.notes.push("Rosa doubled the views."); apply({ mom: has("rosa") ? 14 : 8 }, o); return "40,000 views. Board: silence."; } }
      },
      reveal: "<b>Movement tools:</b> protests, petitions, media." },
    deal: { short: "The board's deal", art: "✍️", cap: "", bg: "bg-gold", title: "Take the deal?",
      body: () => { const k = votesFor(); return bub("🗳️", "", "Leaning " + k + " keep, " + (7 - k) + " cut. You need 4."); },
      choices: {
        take: { em: "✍️", t: "Take the deal", s: "Safe. Buses stop at 10.", say: "Pleasure doing business.", run: () => { st.deal = true; return "You sign. Buses stop at 10."; },
          reveal: "<b>Co-optation:</b> leaders settle for less." },
        refuse: { em: "✊", t: "Say no, keep fighting", s: "All or nothing.", say: "See you at the vote.", run: o => { apply({ mom: -6, pres: -4 }, o); return "Some members grumble."; } }
      } },
    burnout: { short: "Burnout", art: "😮‍💨", cap: "", bg: "bg-brown", title: "Your team is exhausted",
      body: () => bub("🥱", "", "\"Seven weeks of late nights.\"", "chat"),
      choices: {
        rest: { em: "😴", t: "Give a week off", s: "Only 1 move this week.", say: "Quiet week.", run: o => { st.lost[7] = (st.lost[7] || 0) + 1; apply({ mom: -4 }, o); return "People rest up."; } },
        push: { em: "🏃", t: "Push through", s: "Keep moves. Someone may quit.", say: "They look tired.", run: o => { const last = st.team[st.team.length - 1]; if (last) leave(last, o); apply({ mom: 2 }, o); return last ? "A new member quits." : "Running on fumes."; } }
      },
      reveal: "<b>Burnout</b> makes movements decline." }
  };

  // ---------------- Little view builders ----------------
  const bub = (face, who, html, cls) => `<div class="bub ${cls || ""}"><span class="av">${face}</span><div class="tx">${who ? `<span class="who">${who}</span>` : ""}<p>${html}</p></div></div>`;
  const idea = html => `<div class="idea"><span class="bulb">💡</span><div><p>${html}</p></div></div>`;
  // Trade-offs as icon numbers: 🔥 momentum, 🏛️ pressure, 💵 money (no words to read)
  const fxRow = fx => `<span class="fxrow">${[["mom", "🔥"], ["pres", "🏛️"], ["cash", "💵"]].filter(([k]) => fx[k]).map(([k, ic]) => `<span class="fx ${fx[k] > 0 ? "up" : "dn"}">${ic}${fx[k] > 0 ? "+" : MINUS}${k === "cash" ? "$" : ""}${Math.abs(fx[k])}</span>`).join("")}</span>`;
  const chipHtml = c => `<span class="chip ${c[0] === "+" ? "up" : "dn"}">${c}</span>`;
  function setBanner(art, cap, title, bg) {
    $("banner").className = "banner " + (bg || "bg-night");
    $("banner").innerHTML = `<span class="art">${art}</span><div>${cap ? `<span class="cap">${cap}</span>` : ""}<h2>${title}</h2></div>`;
  }
  function nextBtn(label, fn, cls) { const b = document.createElement("button"); b.type = "button"; b.className = "go " + (cls || ""); b.textContent = label; b.onclick = fn; return b; }
  function advance() { st.sub++; save(); render(true); }
  function toTop() { if (window.innerWidth < 980 && !$("game").classList.contains("hide")) { try { $("scene").scrollIntoView({ block: "start" }); } catch (e) {} } else window.scrollTo(0, 0); }
  function say(line) { if (line) { st.say = line; save(); } }

  // ---------------- Dashboard ----------------
  let shown = null;
  function floatOn(el, txt, up) { const f = document.createElement("span"); f.className = "float " + (up ? "up" : "dn"); f.textContent = txt; el.appendChild(f); setTimeout(() => f.remove(), 1500); }
  function dash() {
    const inWeeks = st.phase === "week";
    $("wk").textContent = inWeeks ? "Week " + st.week + " of " + WEEKS : "Vote night";
    const pos = inWeeks ? st.week : 9;
    $("route").innerHTML = `<div class="line"><i style="width:${Math.round((pos - 1) / 8 * 100)}%"></i></div><div class="stops">${Array.from({ length: 8 }, (_, i) => `<span class="stop ${i + 1 < pos ? "past" : i + 1 === pos ? "now" : ""}">${i + 1}</span>`).join("")}<span class="stop vote">🗳️</span></div><span class="busi" style="left:calc(${(pos - 1) / 8} * (100% - 36px) + 12px)">🚌</span>`;
    const now = { mom: st.mom, pres: st.pres, cash: st.cash };
    if (shown) {
      if (now.mom !== shown.mom) floatOn($("mMom"), sign(now.mom - shown.mom), now.mom > shown.mom);
      if (now.pres !== shown.pres) floatOn($("mPres"), sign(now.pres - shown.pres), now.pres > shown.pres);
      if (now.cash !== shown.cash) floatOn($("mCash"), (now.cash > shown.cash ? "+$" : MINUS + "$") + Math.abs(now.cash - shown.cash), now.cash > shown.cash);
    }
    const prevKeep = shown ? shown.keep : null;
    const k = (st.phase === "week" || st.ending == null) ? votesFor() : st.keep;
    shown = Object.assign(now, { keep: k });
    $("momN").textContent = st.mom; $("momF").style.width = st.mom + "%";
    $("mMom").classList.toggle("low", st.mom < 20);
    $("presN").textContent = st.pres; $("presF").style.width = st.pres + "%";
    $("cashN").textContent = st.cash;
    $("seats").innerHTML = Array.from({ length: 7 }, (_, i) => `<span class="seat ${i < k ? "keep" : ""} ${prevKeep != null && ((i < k) !== (i < prevKeep)) ? "flip" : ""}">${i < k ? "✓" : "✗"}</span>`).join("");
    $("seatNote").textContent = k + " keep · " + (7 - k) + " cut";
    $("mood").textContent = k <= 2 ? "😏" : k === 3 ? "😐" : k <= 5 ? "😬" : "😰";
    const line = (st.phase === "brief" || st.phase === "write") ? "…" : st.say || PRUITT[Math.min(st.week, 8)];
    $("pruitt").style.visibility = line === "…" ? "hidden" : "visible";
    if ($("pruitt").dataset.en !== line) { $("pruitt").dataset.en = line; $("pruitt").textContent = line; $("pruitt").classList.remove("pop"); void $("pruitt").offsetWidth; $("pruitt").classList.add("pop"); }
    $("team").innerHTML = Array.from({ length: 8 }, (_, i) => st.team[i] ? `<span class="win full">${PEOPLE[st.team[i]].icon}</span>` : `<span class="win"></span>`).join("");
    $("teamNames").textContent = st.team.map(id => PEOPLE[id].first).join(", ");
    const stageNow = inWeeks ? st.stage : 3;
    $("ladder").innerHTML = STAGES.map((s, i) => `<div class="rung ${i < stageNow ? "done" : i === stageNow ? "on" : ""}"><i>${i < stageNow ? "✓" : i + 1}</i>${s}</div>`).join("");
  }

  // ---------------- Check: stamp the document ----------------
  let locked = false;
  function stampCheck(id, docHead, docBody, defs) {
    const c = CHECKS[id];
    const right = id === "c2" ? TYPE_ANSWER[st.demand] : c.options[0];
    const why = id === "c2" ? C2_WHY[st.demand] : c.why;
    const stampTxt = id === "c2" ? TYPE_STAMP[st.demand] : c.stamp;
    const wrap = document.createElement("div");
    wrap.innerHTML = `<div class="desk"><div class="doc"><p class="dh">${docHead}</p>${docBody}${st.done[id] ? `<span class="stampmark ok">${stampTxt}</span>` : (defs || "")}</div></div>`;
    if (st.done[id]) {
      wrap.insertAdjacentHTML("beforeend", idea(why));
      main().appendChild(wrap);
      if (id === "c6") main().appendChild(nextBtn("Last step: your recap post →", () => { st.phase = "write"; save(); render(); toTop(); }, "coral"));
      else main().appendChild(nextBtn("Continue →", advance));
      return;
    }
    wrap.insertAdjacentHTML("beforeend", `<p class="ask"><span>🔖</span>${c.ask}</p>`);
    const area = document.createElement("div"); area.className = "stamps";
    const fb = document.createElement("p"); fb.className = "hintmsg"; fb.setAttribute("aria-live", "polite");
    const bar = document.createElement("div"); bar.className = "lockbar hide"; bar.innerHTML = "<i></i>";
    let lastOrder = null;
    function draw() {
      area.replaceChildren();
      let order = shuffle(c.options);
      if (lastOrder && order.join("|") === lastOrder.join("|")) order.push(order.shift());
      lastOrder = order;
      order.forEach(t => {
        const b = document.createElement("button"); b.type = "button"; b.className = "pick"; b.textContent = t;
        b.onclick = () => {
          if (locked) return;
          if (t === right) {
            st.done[id] = true; if (window.classFirstTry) window.classFirstTry.right(id);
            save(); render(true);
          } else {
            st.wrong[id] = (st.wrong[id] || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong();
            const doc = wrap.querySelector(".doc"); doc.classList.remove("shake"); void doc.offsetWidth; doc.classList.add("shake");
            st.say = "Take your time."; save(); dash();
            locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
            bar.classList.remove("hide"); const fill = bar.firstChild; fill.style.transition = "none"; fill.style.width = "100%"; void fill.offsetWidth; fill.style.transition = "width " + LOCK + "s linear"; fill.style.width = "0%";
            let left = LOCK;
            const tick = () => {
              fb.textContent = "Not quite. " + c.hint + " Try again in " + left + "…"; fb.className = "hintmsg bad";
              if (left-- <= 0) { locked = false; bar.classList.add("hide"); fb.textContent = "Not quite. " + c.hint + " Try again."; fb.className = "hintmsg"; draw(); return; }
              setTimeout(tick, 1000);
            };
            tick();
          }
        };
        area.appendChild(b);
      });
    }
    draw();
    wrap.appendChild(area); wrap.appendChild(bar); wrap.appendChild(fb);
    main().appendChild(wrap);
  }

  // ---------------- Steps ----------------
  const main = () => $("main");
  function storyStep(html, btnLabel) { main().innerHTML = html; main().appendChild(nextBtn(btnLabel || "Continue →", advance)); }
  function outcomeHtml(em, r) {
    return `<div class="outcome"><span class="em">${em}</span><div><p>${r.text}</p>
      ${r.chips && r.chips.length ? `<div class="chips">${r.chips.map(chipHtml).join("")}</div>` : ""}${(r.notes || []).map(n => `<p class="note">${esc(n)}</p>`).join("")}</div></div>${r.reveal ? idea(r.reveal) : ""}`;
  }
  function choiceStep(id) {
    const ev = EVENTS[id];
    setBanner(ev.art, ev.cap, ev.title, ev.bg);
    main().innerHTML = ev.body();
    if (st.picks[id] != null) {
      const c = ev.choices[st.picks[id]];
      main().insertAdjacentHTML("beforeend", outcomeHtml(c.em, st.results[id]));
      const toVote = id === "deal" && st.deal;
      main().appendChild(nextBtn(toVote ? "Go to vote night →" : "Continue →", () => { if (toVote) { st.phase = "vote"; save(); render(); toTop(); } else advance(); }, toVote ? "coral" : ""));
      return;
    }
    const keys = Object.keys(ev.choices);
    if (!choiceStep.order[id]) choiceStep.order[id] = shuffle(keys);
    const box = document.createElement("div"); box.className = "deck";
    choiceStep.order[id].forEach(k => {
      const c = ev.choices[k];
      const why = c.ok ? c.ok() : "";
      const b = document.createElement("button"); b.type = "button"; b.className = "pickcard"; b.disabled = !!why;
      b.innerHTML = `<span class="em">${c.em}</span><span class="t">${esc(c.t)}</span><span class="s">${esc(c.s)}</span>${why ? `<span class="req">${esc(why)}</span>` : ""}`;
      b.onclick = () => {
        const out = { chips: [], notes: [] };
        const text = c.run(out);
        st.picks[id] = k; say(c.say);
        st.results[id] = { you: c.t, text, chips: out.chips, notes: out.notes, reveal: c.reveal || ev.reveal || "" };
        save(); render(true);
      };
      box.appendChild(b);
    });
    main().appendChild(box);
  }
  choiceStep.order = {};

  function publicStep() {
    if (!st.results.public) {
      const out = { chips: [], notes: [] };
      if (st.stage === 0 && st.team.length >= needPublic()) { stageUp(1, out); say("Organized now. Wonderful."); st.results.public = { ok: true, chips: out.chips, notes: out.notes }; }
      else st.results.public = { ok: st.stage >= 1, chips: [], notes: [] };
      save();
    }
    const r = st.results.public;
    if (r.ok) {
      setBanner("📣", "", "You go public", "bg-green");
      storyStep(bub("🎤", "", "\"We are Riders for Route 12!\"") +
        outcomeHtml("⬆️", { text: "New cards unlock.", chips: r.chips, notes: r.notes, reveal: "<b>Coalescence:</b> organized and public." }));
    } else {
      setBanner("🔒", "", "Not enough people", "bg-brown");
      storyStep(bub("🤷", "Your meeting", "Only " + st.team.length + " of you. You need 3.") +
        idea("Recruit more. Then tap <b>Go public</b>."));
    }
  }

  // ---- Moves (spend tickets) ----
  function cardReq(kind, id) {
    if (kind === "p") {
      const p = PEOPLE[id];
      if (p.moderate && st.demand === "revolution") return "Won't join your demand";
      if (p.stage > st.stage) return "Go public to unlock";
      if (p.needCash && st.cash < p.needCash) return "Needs $" + p.needCash;
      if ((p.moves || 1) > movesLeft()) return "Needs 2 moves";
      return "";
    }
    const t = TACTICS[id];
    if (t.stage > st.stage) return t.stage === 1 ? "Go public to unlock" : "Make it official to unlock";
    if (t.needTeam && st.team.length < t.needTeam) return "Needs 4 people";
    if (t.needPerson && !has(t.needPerson)) return "Needs Ms. Hart";
    if (t.needCash && st.cash < t.needCash) return "Needs $" + t.needCash;
    return "";
  }
  function doMove(kind, id) {
    const out = { chips: [], notes: [] };
    let name, cost = 1, icon;
    if (kind === "p") {
      const p = PEOPLE[id]; name = "Recruit " + p.first; cost = p.moves || 1; icon = p.icon;
      join(id, out); apply(p.fx, out);
      if (p.moderate) say("Still just a bus.");
    } else {
      const t = TACTICS[id]; name = t.name; icon = t.icon;
      const again = st.uses[id] > 0;
      const d = Object.assign({}, t.fx);
      if (id === "petition") d.pres = Math.min(16, 4 + 2 * st.team.length);
      if (id === "speak") { const n = st.team.filter(x => PEOPLE[x].story).length; d.pres += 8 * n; if (n) out.notes.push("True stories hit hard."); }
      if (id === "post" && has("rosa")) { d.mom += 12; d.pres -= 4; out.notes.push("Rosa shared it. Eye-rolls too."); }
      if (id === "rally" && has("kiara")) { d.mom -= 4; out.notes.push("Kiara was at work."); }
      if (again && !t.once) { const f = Math.max(0.5, 1 / (1 + 0.5 * st.uses[id])); Object.keys(d).forEach(k => { if (d[k] > 0) d[k] = Math.ceil(d[k] * f); }); out.notes.push("Repeat: worked less."); }
      apply(d, out);
      if (id === "rally" && has("vic")) { leave("vic", out); }
      if (id === "block") { leave("okafor", out); leave("lee", out); st.flags.block = true; out.notes.push("Police clear it. TV says \"chaos.\""); }
      st.uses[id] = (st.uses[id] || 0) + 1;
      say(TACTIC_PRUITT[id]);
    }
    (st.moveLog[st.week] = st.moveLog[st.week] || []).push({ name, icon, chips: out.chips, notes: out.notes, cost });
    save(); render(true);
  }
  function gateMove(which) {
    const out = { chips: [], notes: [] };
    if (which === "public") { stageUp(1, out); say("Organized now. Wonderful."); }
    else { makeOfficial(out); if (has("deshawn")) out.notes.push("Deshawn set it up free."); say("Finally, someone to talk to."); }
    const name = which === "public" ? "Go public (Coalescence)" : "Make it official (Bureaucratization)";
    const cost = which === "official" && !has("deshawn") ? 1 : 0;
    (st.moveLog[st.week] = st.moveLog[st.week] || []).push({ name, icon: "⬆️", chips: out.chips, notes: out.notes, cost,
      reveal: which === "public" ? "<b>Coalescence:</b> organized and public." : "Next week: <b>+1 move</b> and $10 dues." });
    save(); render(true);
  }
  function movesStep() {
    const left = movesLeft(), total = movesFor(st.week);
    setBanner("🎟️", "Week " + st.week + " · your moves", left ? "Spend your tickets" : "Out of tickets", "bg-coral");
    let html = `<div class="tickets"><span class="tk-lab">Moves:</span>${Array.from({ length: total }, (_, i) => `<span class="ticket ${i < total - left ? "used" : ""}">12</span>`).join("")}</div>`;
    const log = st.moveLog[st.week] || [];
    if (log.length) html += `<ul class="played">${log.map((m, mi) => `<li><span class="em">${m.icon || "🎟️"}</span><div><span class="nm">${esc(m.name)}</span>${m.chips.length ? `<div class="chips">${m.chips.map(chipHtml).join("")}</div>` : ""}${mi === log.length - 1 ? m.notes.map(n => `<p class="note">${esc(n)}</p>`).join("") : ""}</div></li>`).join("")}</ul>` +
      log.filter(m => m.reveal).map(m => idea(m.reveal)).join("");
    main().innerHTML = html;
    if (st.stage === 0 && st.demand && st.team.length >= needPublic()) {
      const g = document.createElement("button"); g.type = "button"; g.className = "gate";
      g.innerHTML = `<span class="em">⬆️</span><div>Go public (Coalescence)<small>Free move.</small></div>`;
      g.onclick = () => gateMove("public"); main().appendChild(g);
    }
    if (st.stage === 1 && st.done.c4 && st.team.length >= 4 && (left > 0 || has("deshawn"))) {
      const g = document.createElement("button"); g.type = "button"; g.className = "gate";
      g.innerHTML = `<span class="em">🏢</span><div>Make it official (Bureaucratization)<small>Leaders, dues, rules. Costs 1 move.</small></div>`;
      g.onclick = () => gateMove("official"); main().appendChild(g);
    }
    if (left > 0) {
      // Lane 1: recruit (at most 3 people shown at a time)
      const open = PEOPLE_ORDER.filter(id => !has(id) && !st.gone.includes(id) && PEOPLE[id].stage <= st.stage && !(PEOPLE[id].moderate && st.demand === "revolution"));
      const later = PEOPLE_ORDER.filter(id => !has(id) && !st.gone.includes(id) && PEOPLE[id].stage > st.stage).length;
      const refused = PEOPLE_ORDER.some(id => !has(id) && !st.gone.includes(id) && PEOPLE[id].moderate && st.demand === "revolution");
      main().insertAdjacentHTML("beforeend", `<p class="sec">👥 Recruit</p>`);
      if (open.length) {
        const box = document.createElement("div"); box.className = "hand";
        const k0 = open.length > 3 ? (st.week * 2) % open.length : 0;
        const faces = open.length > 3 ? [0, 1, 2].map(i => open[(k0 + i) % open.length]) : open;
        faces.forEach(id => {
          const p = PEOPLE[id], req = cardReq("p", id);
          const b = document.createElement("button"); b.type = "button"; b.className = "gcard person"; b.disabled = !!req;
          b.innerHTML = `${p.moves ? `<span class="cost2">🎟️×2</span>` : ""}<span class="em">${p.icon}</span><span class="nm">${esc(p.name)}</span><span class="ln">${esc(p.line)}</span>${fxRow(p.fx)}${req ? `<span class="req">${esc(req)}</span>` : ""}`;
          b.onclick = () => doMove("p", id); box.appendChild(b);
        });
        main().appendChild(box);
      } else if (!later && !refused) main().insertAdjacentHTML("beforeend", `<p class="lockline">Everyone's on your bus.</p>`);
      if (refused) main().insertAdjacentHTML("beforeend", `<p class="lockline">Some refuse your demand.</p>`);
      // Lanes 2 and 3: tactics, split by what they do
      const retired = st.stage >= 2 ? ["chat", "post", "block"] : [];
      const lanes = [["🔥 Fire up", ["chat", "post", "rally", "block", "fund"]], ["🏛️ Pressure", ["petition", "speak", "ridein", "count", "lawyer", "meet", "voters"]]];
      lanes.forEach(([label, ids]) => {
        const show = ids.filter(id => !retired.includes(id) && !(TACTICS[id].once && st.uses[id]) && TACTICS[id].stage <= st.stage);
        if (show.length) {
          main().insertAdjacentHTML("beforeend", `<p class="sec">${label}</p>`);
          const box2 = document.createElement("div"); box2.className = "hand";
          show.forEach(id => {
            const t = TACTICS[id], req = cardReq("t", id);
            const b = document.createElement("button"); b.type = "button"; b.className = "gcard tactic"; b.disabled = !!req;
            b.innerHTML = `<span class="em">${t.icon}</span><span class="nm">${esc(t.name)}</span>${t.line ? `<span class="ln">${esc(t.line)}</span>` : ""}${fxRow(id === "petition" ? { mom: 2, pres: Math.min(16, 4 + 2 * st.team.length) } : t.fx)}${req ? `<span class="req">${esc(req)}</span>` : ""}`;
            b.onclick = () => doMove("t", id); box2.appendChild(b);
          });
          main().appendChild(box2);
        }

      });
      if (st.stage < 2) main().insertAdjacentHTML("beforeend", `<p class="lockline">More cards at the next stage.</p>`);
      if (retired.length) main().insertAdjacentHTML("beforeend", `<p class="note">Official now: no chats, videos, blocking.</p>`);
    } else {
      main().appendChild(nextBtn(st.week === WEEKS ? "Go to vote night →" : "End the week →", advance, "coral"));
    }
  }
  function endStep() {
    if (!st.ends[st.week]) {
      const lines = [];
      let loss = 6;
      lines.push({ em: "🌙", t: "Interest fades.", c: [sign(-6) + " momentum"] });
      if (st.fade && st.week === 1) { loss += 8; lines.push({ em: "🏠", t: "The crowd went home.", c: [sign(-8) + " momentum"] }); }
      let stalled = false;
      if (st.stage < 2 && st.week - st.stageWeek >= 2) { loss += 5; stalled = true; lines.push({ em: "🐌", t: "Stalled: no new stage.", c: [sign(-5) + " momentum"] }); }
      st.mom = clamp(st.mom - loss, 0, 100);
      if (st.stage === 2 && st.officialWeek < st.week) { st.cash += 10; lines.push({ em: "💵", t: "Dues paid.", c: ["+$10"] }); }
      if (st.stage === 0 && st.demand && st.team.length >= needPublic()) { const o = { chips: [], notes: [] }; stageUp(1, o); lines.push({ em: "⬆️", t: "You went public.", c: o.chips }); }
      st.ends[st.week] = { lines, reveal: stalled && !st.stalledOnce ? "<b>Stalled movements fade.</b> People drift away." : "" };
      if (stalled) st.stalledOnce = true;
      save();
    }
    const e = st.ends[st.week];
    setBanner("🌙", "", "End of week " + st.week, "bg-night");
    let html = `<ul class="nightsum">${e.lines.map(l => `<li><span class="em">${l.em}</span><span>${esc(l.t)}</span> ${l.c.map(chipHtml).join("")}</li>`).join("")}</ul>` + (e.reveal ? idea(e.reveal) : "");
    if (st.mom < 20) html += `<p class="warn">⚠️ Under 20 at the vote costs you votes.</p>`;
    main().innerHTML = html;
    main().appendChild(nextBtn("Start Week " + (st.week + 1) + " →", () => { st.week++; st.sub = 0; st.say = ""; save(); render(); toTop(); }, "coral"));
  }

  function weekView() {
    const s = scriptFor(st.week);
    switch (s[st.sub]) {
      case "news":
        setBanner("📰", "", "Route 12 ends in 8 weeks", "bg-red");
        return storyStep(          bub("🧑🏾‍🏭", "Kiara, 17", "\"My warehouse runs all night now. I need that bus!\"") +
          idea("<b>Institutions</b> meet needs. Jobs changed, so needs changed."), "That night… →");
      case "crowd": return choiceStep("crowd");
      case "c1":
        setBanner("📝", "", "What was this crowd?", "bg-night");
        main().innerHTML = "";
        return stampCheck("c1", "Field note · 9 p.m.", "<p>80 people showed up. No leader, no list.</p><p>By 10 p.m., gone.</p>");
      case "demand": return choiceStep("demand");
      case "c2":
        setBanner("📋", "", "What type is your group?", "bg-gold");
        main().innerHTML = "";
        return stampCheck("c2", "Group form", `<p><b>Our demand:</b> ${esc(EVENTS.demand.choices[st.demand].t)}</p>`, DEFS_TYPES);
      case "public": return publicStep();
      case "kob":
        setBanner("🛑", "", "A new group fights you", "bg-red");
        return storyStep(`<div class="flyer"><b>KEEP OUR BUDGET</b><p>STOP the $2 bus fee!</p></div>` +
          bub("🧾", "", "Route 12 adds $2 to water bills."));
      case "c3":
        setBanner("🕵️", "", "What type are they?", "bg-red");
        main().innerHTML = "";
        return stampCheck("c3", "Keep Our Budget", `<p>Flyer: "STOP the $2 bus fee!"</p>`, DEFS_TYPES);
      case "kobReply": return choiceStep("kobReply");
      case "chaos":
        setBanner("💬", "", "Your chat is chaos", "bg-purple");
        return storyStep(bub("🤯", "", "Three flyers. Two demands. No leader.", "chat"), "Open a real history file →");
      case "c4":
        setBanner("📁", "", "Which stage is this?", "bg-brown");
        main().innerHTML = "";
        return stampCheck("c4", "NAACP · founded 1909", `<p>Today: paid staff, lawyers, branches, member dues.</p><p class="src">Source: NAACP, "Our History," naacp.org.</p>`, DEFS_STAGES);
      case "official": return choiceStep("official");
      case "jayden": return choiceStep("jayden");
      case "tv": return choiceStep("tv");
      case "offer":
        setBanner("✉️", "", "Pruitt makes an offer", "bg-gold");
        return storyStep(bub("👩🏼‍💼", "Chair Pruitt", "\"Buses until 10 p.m. Your leader joins our committee. You stop.\"", "rv") +
          bub("🧑🏾‍🏭", "", "\"We get off work after 11!\""), "Inspect the letter →");
      case "c5":
        setBanner("✉️", "", "Which response is this?", "bg-gold");
        main().innerHTML = "";
        return stampCheck("c5", "The offer", `<p>Buses until 10 p.m. Riders need them until midnight.</p>`, DEFS_RESPONSES);
      case "deal": return choiceStep("deal");
      case "burnout": return choiceStep("burnout");
      case "final":
        setBanner("🗳️", "", "The board votes tomorrow", "bg-coral");
        return storyStep(idea("Need: 4 votes, momentum 20+."));
      case "moves": return movesStep();
      case "end": return endStep();
      case "vote": st.phase = "vote"; save(); return render();
    }
  }

  // ---------------- Vote + ending ----------------
  function decideEnding() {
    if (st.ending) return st.ending;
    let k = votesFor(), kind;
    if (st.deal) kind = "compDeal";
    else if (st.mom < 20) { k = Math.max(0, k - 1); if (k >= 3) { kind = "compLow"; k = 3; } else kind = "fizzleMom"; }
    else if (k >= 4 && st.stage === 2) kind = "win";
    else if (k >= 4) kind = "compTrial";
    else if (k === 3) kind = "compSmall";
    else kind = "fizzleVotes";
    st.ending = kind; st.keep = k; save();
    return kind;
  }
  const ENDINGS = {
    win: { stamp: "WIN · NEW POLICY", cls: "win", art: "🎉", bg: "bg-green", title: "Route 12 is here to stay", text: k => `The board voted ${k}–${7 - k} to make Route 12 permanent.`,
      reveal: "<b>Decline by success:</b> your goal joined the system (<b>institutionalization</b>).", tie: "Like Montgomery, you won.", say: "Fine. You earned it." },
    compTrial: { stamp: "COMPROMISE · SMALL REFORM", cls: "comp", art: "⚖️", bg: "bg-gold", title: "Route 12 survives, for now", text: k => `The board voted ${k}–${7 - k} for one more trial year.`,
      extra: "No official group to hold them to more.",
      reveal: "<b>Small reform.</b> Your movement fades into <b>decline</b>.", tie: "Montgomery won more than you.", say: "One more year. We'll see." },
    compSmall: { stamp: "COMPROMISE · SMALL REFORM", cls: "comp", art: "⚖️", bg: "bg-gold", title: "Half a bus route", text: () => "Only 3 votes to keep it. Compromise: buses until 10 p.m.",
      reveal: "<b>Small reform.</b> Your movement fades into <b>decline</b>.", tie: "Montgomery won more than you.", say: "Ten o'clock is plenty." },
    compDeal: { stamp: "COMPROMISE · THE DEAL", cls: "comp", art: "✍️", bg: "bg-gold", title: "You took the deal", text: () => "Buses until 10 p.m. Late workers still walk.",
      reveal: "<b>Decline by co-optation:</b> leaders joined the system and settled for less.", tie: "Montgomery didn't settle. You did.", say: "Pleasure doing business." },
    compLow: { stamp: "COMPROMISE · SMALL REFORM", cls: "comp", art: "⚖️", bg: "bg-gold", title: "Half a bus route", text: () => "Few riders showed up. Deal: buses until 10 p.m.",
      reveal: "<b>Small reform.</b> Low <b>momentum</b>: few showed up, so you got less.", tie: "Montgomery kept people coming for 381 days.", say: "Ten o'clock is plenty." },
    fizzleMom: { stamp: "FIZZLE · ROUTE CUT", cls: "fizz", art: "🚏", bg: "bg-night", title: "Route 12's last run", text: k => `The board voted ${k}–${7 - k} to end Route 12.`,
      extra: "Almost nobody showed up on vote night.",
      reveal: "<b>Decline by failure:</b> you ran out of people and energy.", tie: "Montgomery lasted 381 days. You didn't.", say: "Where did everybody go?" },
    fizzleVotes: { stamp: "FIZZLE · ROUTE CUT", cls: "fizz", art: "🚏", bg: "bg-night", title: "Route 12's last run", text: k => `The board voted ${k}–${7 - k} to end Route 12.`,
      extra: "Your tactics never pressured the board.",
      reveal: "<b>Decline by failure:</b> never enough pressure to win.", tie: "Montgomery built more pressure.", say: "Told you nobody rides it." }
  };
  function causes() {
    const c = [];
    c.push({ reform: "One clear demand: a reform.", revolution: "Demand: replace the government.", alternative: "Demand: change personal habits." }[st.demand] || "");
    if (st.deal) c.push("Took the deal in Week 6.");
    c.push(st.stage >= 1 ? "Went public (coalescence)." : "Never got 3 people together.");
    c.push(st.stage >= 2 ? "Made it official (bureaucratization)." : "Never made it official.");
    if (st.flags.doxxQuiet) c.push("Stayed quiet about Jayden's post.");
    if (st.flags.doxxKick) c.push("Removed Jayden, apologized.");
    if (st.flags.block) c.push("Blocked the street.");
    if (!st.deal) {
      c.push(st.pres >= 48 ? "Real pressure on the board." : "Too little pressure on the board.");
      c.push(st.mom >= 20 ? "Kept momentum alive." : "Momentum ran out.");
    }
    return c.filter(Boolean);
  }
  function voteView() {
    decideEnding();
    const k = st.keep;
    setBanner("🗳️", "", st.deal ? "The board signs your deal" : "The board votes on Route 12", "bg-night");
    main().innerHTML = `<div class="chamber"><div class="bench" id="vs">${Array.from({ length: 7 }, (_, i) => `<span class="vseat ${i < k ? "keep" : ""}">${i < k ? "✓" : "✗"}</span>`).join("")}</div><p class="vtally" id="vtally" style="visibility:hidden">${k} keep · ${7 - k} cut</p></div>`;
    const seats = [...document.querySelectorAll("#vs .vseat")];
    seats.forEach((s, i) => setTimeout(() => s.classList.add("show"), 250 + i * 300));
    const b = nextBtn("See what happened →", () => { st.phase = "ending"; save(); render(); toTop(); }, "coral");
    b.disabled = true; setTimeout(() => { b.disabled = false; if ($("vtally")) $("vtally").style.visibility = "visible"; }, 250 + 7 * 300);
    main().appendChild(b);
  }
  function endingView() {
    const e = ENDINGS[decideEnding()];
    say(e.say);
    setBanner(e.art, "", e.title, e.bg);
    main().innerHTML = `<span class="stamp ${e.cls}">${e.stamp}</span>` + bub("📰", "", e.text(st.keep) + (e.extra ? "</p><p>" + e.extra : ""), "news") + idea(e.reveal) +
      `<div class="receipt"><h3>Caused by</h3><ul>${causes().map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>` +
      `<p class="src">Stages: sociologist Herbert Blumer. Ways movements end (success, co-optation, failure, repression): sociologist Frederick Miller.</p>`;
    main().appendChild(nextBtn("Open the real history file →", () => { st.phase = "brief"; st.briefSeen = false; save(); render(); toTop(); }, "coral"));
  }
  function briefView() {
    const e = ENDINGS[decideEnding()];
    setBanner("🚌", "", "The Montgomery Bus Boycott", "bg-brown");
    if (!st.briefSeen && !st.done.c6) {
      main().innerHTML = `<div class="mroute">` +
        `<div class="mstop"><span class="dot">1</span><b>Emergence</b><span>Buses split by race. Rosa Parks arrested, Dec. 1955.</span></div>` +
        `<div class="mstop"><span class="dot">2</span><b>Coalescence</b><span>Boycott starts. MLK Jr. leads.</span></div>` +
        `<div class="mstop"><span class="dot">3</span><b>Bureaucratization</b><span>300-car carpool. 80+ leaders charged.</span></div>` +
        `<div class="mstop"><span class="dot">4</span><b>Decline by success</b><span>1956: courts end bus segregation.</span></div>` +
        `</div><p class="src">Sources: Stanford King Institute, "Montgomery Bus Boycott" and "Browder v. Gayle" (kinginstitute.stanford.edu). Stage names: Jonathan Christiansen, "Four Stages of Social Movements," EBSCO Research Starters.</p>`;
      main().appendChild(nextBtn("Inspect the file →", () => { st.briefSeen = true; save(); render(); toTop(); }));
      return;
    }
    setBanner("🚌", "", "How did Montgomery respond?", "bg-brown");
    main().innerHTML = idea(e.tie);
    stampCheck("c6", "Montgomery, 1956", "<p>80+ leaders charged. Then courts banned bus segregation.</p>");
  }

  // ---------------- Writing + turn in ----------------
  function writeView() {
    setBanner("📱", "", "Post your recap", "bg-teal");
    main().innerHTML = `<div class="phone"><div class="scr"><div class="ph"><span>🚌</span><span>📝</span></div>` +
      PROMPTS.map(p => `<label class="w" for="w_${p.id}">${p.label}</label><p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`).join("") +
      `<button type="button" class="go coral" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>` +
      `<p id="sendMsg" class="send-msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>` +
      (st.turnedIn ? `<div class="done-box"><p class="big-check">✓ Turned in</p></div>` : "") + `</div></div>`;
    PROMPTS.forEach(p => { $("w_" + p.id).addEventListener("input", ev => { st.writing[p.id] = ev.target.value; save(); }); });
    $("sendBtn").onclick = send;
  }
  async function send() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const p of PROMPTS) {
      const box = $("w_" + p.id), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const es = window.SiteLang && window.SiteLang.isEs();
        const junk = window.classJunkStop(box, { starter: es ? window.SiteLang.t(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (es ? "En " + window.SiteLang.t(p.short) : "For " + p.short) + ": " + junk; msg.className = "send-msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "send-msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "send-msg bad"; box.focus(); return; }
      const stemText = window.SiteLang ? p.stem + " " + window.SiteLang.t(p.stem) : p.stem;
      const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < p.newWords) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "send-msg bad"; box.focus(); return; }
      let words = p.mustInclude.slice();
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords && esWords[0]) words = words.concat(esWords[0]);
      if (!words.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v)))) { msg.textContent = p.mustMsg; msg.className = "send-msg bad"; box.focus(); return; }
    }
    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = CHECK_ORDER.filter(id => !st.wrong[id]).length + " of " + CHECK_ORDER.length;
    const byStd = {};
    CHECK_ORDER.forEach(id => { const s = CHECKS[id].std; byStd[s] = byStd[s] || [0, 0]; byStd[s][1]++; if (!st.wrong[id]) byStd[s][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    CHECK_ORDER.forEach(id => {
      const right = id === "c2" ? TYPE_ANSWER[st.demand] : CHECKS[id].options[0];
      const n = st.wrong[id];
      answers[CHECKS[id].short] = right + (n ? " (after " + n + " wrong " + (n === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    Object.keys(EVENTS).forEach(id => { if (st.picks[id] != null) { const c = EVENTS[id].choices[st.picks[id]]; answers["Choice · " + EVENTS[id].short] = c.full || c.t; } });
    for (let w = 1; w <= WEEKS; w++) if (st.moveLog[w] && st.moveLog[w].length) answers["Moves · Week " + w] = st.moveLog[w].map(m => m.name).join(" · ");
    const e = ENDINGS[decideEnding()];
    answers["Ending"] = e.stamp;
    answers["Stage reached"] = STAGES[st.stage];
    answers["Board vote"] = st.keep + " keep · " + (7 - st.keep) + " cut";
    answers["Momentum at the vote"] = String(st.mom);
    answers["Board pressure at the vote"] = String(st.pres);
    answers["Team at the end"] = st.team.map(id => PEOPLE[id].first).join(", ") || "Nobody";
    answers["Caused by"] = causes().join(" | ");
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "send-msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "send-msg good";
      $("sendBtn").textContent = "Turned in ✓";
      if (!document.querySelector(".done-box")) $("sendMsg").insertAdjacentHTML("afterend", `<div class="done-box"><p class="big-check">✓ Turned in</p></div>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "send-msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------------- Router ----------------
  function stepNumber() {
    if (st.phase === "week") return st.week;
    if (st.phase === "vote" || st.phase === "ending" || st.phase === "brief") return 9;
    if (st.phase === "write") return 10;
    return 0;
  }
  let firstRender = true;
  function render(scrollToNew) {
    if (!firstRender) $("welcome").classList.add("hide");
    firstRender = false;
    if (st.phase === "start") { $("start").classList.remove("hide"); $("game").classList.add("hide"); return; }
    $("start").classList.add("hide"); $("game").classList.remove("hide");
    if (st.phase === "week") weekView();
    else if (st.phase === "vote") voteView();
    else if (st.phase === "ending") endingView();
    else if (st.phase === "brief") briefView();
    else if (st.phase === "write") writeView();
    dash();
    if (scrollToNew) {
      const target = $("main").querySelector(".outcome, .stampmark, .played li:last-child");
      if (target) { try { target.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {} }
      else toTop();
    }
  }

  // ---------------- Start screen ----------------
  function startScreen() {
    if (st.phase !== "start" && st.name) {
      $("welcome").textContent = "Welcome back, " + st.name + " — you're on step " + stepNumber() + " of " + TOTAL_STEPS + ".";
      $("welcome").classList.remove("hide");
      $("nameRow").classList.add("hide");
      $("startBtn").textContent = "Keep going →";
    }
    $("startBtn").onclick = () => {
      if (st.phase !== "start") { render(); toTop(); return; }
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("startMsg").textContent = "Type your first name and last initial, like Jordan M."; $("startMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.phase = "week"; st.week = 1; st.sub = 0; save(); render(); toTop();
    };
    $("nameBox").addEventListener("keydown", e => { if (e.key === "Enter") $("startBtn").click(); });
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; choiceStep.order = {}; shown = null;
    if (window.classFirstTry) window.classFirstTry.reset();
    st.phase = name ? "week" : "start";
    save(); render(); toTop();
  };

  startScreen();
  if (st.phase === "start" || !st.name) render(); else { $("start").classList.remove("hide"); $("game").classList.add("hide"); }
  window.__lastBus = { get state() { return st; } };   // read-only peek for testing
})();
