// =====================================================================
//  THE ORGANIZER'S TOOLKIT  (Sociology Unit 4 · Day 6 · SS.9-12.Soc.15)
//  Clinic version (Fynn 11/3: "change what's saved" so it doesn't repeat the
//  Unit 2 bus game): the city wants to close Eastside Clinic in Millbrook,
//  Iowa; you organize patients. 3 parts (How movements start → Fill your
//  toolkit → Run the clinic campaign), same mechanic (real case files you
//  must crack + campaign choices that move a Momentum meter).
//  Added in the polish: case files earn tactic cards for your toolkit; a
//  rival (Councilor Brandt, made up) whose mood follows your momentum; a
//  council vote board (momentum → votes); a first wrong guess on a check
//  costs 1 momentum; a final POLICY vs. COMMUNITY fix with honest
//  trade-offs and 5 endings with a "Caused by" trail; a test-tomorrow word
//  bank on the report screen (Unit 4 test is the next day).
//  7 checks (all Soc.15; Fynn 11/3: about 7 max), 4 real decisions, 2 short writing answers.
//  Millbrook, Eastside Clinic, Brandt, Odette are made up. Every case file is real.
//  Turn-in via shared/turnin.js with the same assignmentId as before.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u4-d6-fight-inequality-v2-clinic";
  const ASSIGNMENT_ID = "soc-u4-d6-fight-inequality";
  const TITLE = "Sociology · Unit 4 · Day 6 · How Do People Fight Inequality?";
  const STANDARD = "SS.9-12.Soc.15";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;          // seconds locked after a wrong answer
  const START_MOM = 3;
  const NEED_VOTES = 4;    // of 7 council seats

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const votes = m => Math.min(7, Math.floor(m * 0.7));

  // ---------------- Toolkit (tactic cards earned from case files) ----------------
  const TOOLS = [
    { id: "sitin", icon: "🪑", t: "Sit-in" },
    { id: "picket", icon: "🪧", t: "Picket" },
    { id: "court", icon: "⚖️", t: "Court case" },
    { id: "boycott", icon: "🚫", t: "Boycott" },
    { id: "carpool", icon: "🚗", t: "Carpools" },
    { id: "news", icon: "📺", t: "News spotlight" }
  ];

  // ---------------- Art helpers ----------------
  const say = (who, text, cls) => `<div class="say ${cls || ""}">${who ? `<span class="who-s">${who}</span>` : ""}${text}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div>${html}</div></div>`;
  const src = t => `<p class="src">${t}</p>`;
  const rows = list => `<div class="tl">${list.map(r => `<span><i aria-hidden="true">${r[0]}</i><em>${r[1]}</em></span>`).join("")}</div>`;
  const file = (lab, inner, cite) => `<div class="file"><span class="clip" aria-hidden="true"></span><p class="flab">📁 ${lab}</p>${inner}${cite ? src(cite) : ""}</div>`;

  // Clinic map: homes → street → Eastside Clinic. The doors open wider (and a
  // patient walks closer) as momentum grows.
  const SAVED_ENDS = ["Clinic Saved", "Saved by Vote"];
  function routeMap(extra) {
    const m = st.m;
    const saved = st.ended && SAVED_ENDS.includes(st.endKey);
    const popup = st.ended && st.endKey === "Pop-Up Clinic";
    const open = saved ? 10 : popup ? 4 : st.ended ? 0 : m;   // doors-open meter (ending overrides momentum)
    const gap = Math.round(open * 1.7);
    const x = 60 + Math.round(m * 15);
    return `<div class="map${saved ? " saved" : ""}" role="img" aria-label="Map: homes, a street, and Eastside Clinic. Doors open: ${open} of 10.">
      <svg viewBox="0 0 360 120" aria-hidden="true">
        <rect x="0" y="0" width="360" height="120" rx="14" fill="#dfe9f2"/>
        <rect x="0" y="92" width="360" height="18" fill="#c7d6e4"/>
        <path d="M6 101 H 354" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>
        <text x="14" y="44" font-size="12" font-weight="800" fill="#1d2433">🚪 Doors open</text>
        <rect x="14" y="50" width="150" height="11" rx="5" fill="#fff" stroke="#1d2433" stroke-width="2"/>
        <rect x="15" y="51" width="${Math.max(0, open * 15 - 2)}" height="9" rx="4" fill="${saved ? "#1f8a4c" : "#0f8b8d"}"/>
        <text x="24" y="92" text-anchor="middle" font-size="26">🏘️</text>
        <text x="${x}" y="92" text-anchor="middle" font-size="24" class="busx">🚶🏾‍♀️</text>
        <rect x="232" y="16" width="118" height="13" rx="3" fill="#0f8b8d" stroke="#1d2433" stroke-width="2"/>
        <rect x="238" y="28" width="106" height="64" fill="#fff" stroke="#1d2433" stroke-width="3"/>
        <rect x="284" y="34" width="14" height="5" fill="#e0453a"/><rect x="288.5" y="29.5" width="5" height="14" fill="#e0453a"/>
        <rect x="246" y="38" width="22" height="18" rx="2" fill="#bfe3f0" stroke="#1d2433" stroke-width="2"/><rect x="314" y="38" width="22" height="18" rx="2" fill="#bfe3f0" stroke="#1d2433" stroke-width="2"/>
        <rect x="273" y="54" width="36" height="38" fill="#ffe9a8" stroke="#1d2433" stroke-width="2"/>
        <rect x="${274 - gap}" y="55" width="17" height="36" fill="#9aa7b8" stroke="#1d2433" stroke-width="1.5"/>
        <rect x="${291 + gap}" y="55" width="17" height="36" fill="#9aa7b8" stroke="#1d2433" stroke-width="1.5"/>
      </svg>
      <span class="rt9">EASTSIDE CLINIC · 1,800 patients</span>
      ${saved ? `<span class="cut ok">OPEN</span>` : popup ? `<span class="cut ok">POP-UP</span>` : st.ended ? `<span class="cut">CLOSED</span>` : `<span class="cut">CLOSES FEB 1?</span>`}
      ${extra || ""}
    </div>`;
  }
  // Council vote board: 7 seats. Your momentum decides how many lean "save it."
  function council(extra) {
    const v = votes(st.m);
    const seats = Array.from({ length: 7 }, (_, i) => i < v ? `<span class="seat y">🙂<b>✔</b></span>` : i === 6 ? `<span class="seat n br">🧑‍💼<b>✖</b></span>` : `<span class="seat n">😐<b>✖</b></span>`);
    return `<div class="chamber" role="img" aria-label="City council: ${v} of 7 lean toward saving the clinic. ${NEED_VOTES} needed."><p class="cap">🏛️ City council · <b>${v} of 7</b> lean “save it” · need ${NEED_VOTES}</p><div class="seats">${seats.join("")}</div>${extra || ""}</div>`;
  }
  function refreshCouncil() {
    const ch = document.querySelector("#scene .chamber"); if (!ch) return;
    const tmp = document.createElement("div"); tmp.innerHTML = council();
    const fresh = tmp.firstElementChild;
    ch.querySelector(".cap").innerHTML = fresh.querySelector(".cap").innerHTML;
    ch.querySelector(".seats").innerHTML = fresh.querySelector(".seats").innerHTML;
    ch.setAttribute("aria-label", fresh.getAttribute("aria-label"));
  }
  function phone(inner) { return `<div class="phone"><div class="notch" aria-hidden="true"></div>${inner}</div>`; }
  function bars(title, list, cite) {
    const max = Math.max(...list.map(b => b.v));
    return `<div class="chart"><p class="ch">${title}</p>${list.map(b => `<div class="brow"><span class="bl">${b.l}</span><span class="bt"><span style="width:${Math.max(4, Math.round(b.v / max * 100))}%;background:${b.c}"></span></span><b>${b.s}</b></div>`).join("")}${cite ? src(cite) : ""}</div>`;
  }
  function calendar() {
    // April 5 – April 30, 1977: the occupation. Rules signed April 28.
    let cells = "";
    for (let d = 5; d <= 30; d++) cells += `<span class="${d === 28 ? "sig" : ""}">${d === 28 ? "✍️" : d}</span>`;
    return `<div class="cal" role="img" aria-label="April 5 to April 30, 1977. Rules signed April 28."><p class="ch">April 1977</p><div class="cells">${cells}</div></div>`;
  }

  // ---------------- Writing (organizer's report) ----------------
  const TACTIC_WORDS = ["boycott", "sit-in", "sit in", "sitin", "march", "picket", "strike", "lawsuit", "court", "protest", "petition", "speech", "social media", "occup", "carpool", "meeting", "union", "news", "media", "vote", "law"];
  const CASE_WORDS = ["montgomery", "parks", "griffin", "katz", "des moines", "delano", "grape", "chavez", "huerta", "itliong", "freedom ride", "504", "disab", "san francisco", "virginia", "massive resistance", "civil rights act", "voting rights"];
  const PROMPTS = [
    { id: "best", short: "Best tactic + historical example",
      label: "📣 Rally speech: which tactic works best? Name a real case from today.",
      stem: "___ works best because ___. In ___, it ___.",
      min: 70, newWords: 6, mustAll: [TACTIC_WORDS, CASE_WORDS],
      mustMsg: "Rally speech: name a tactic AND a real case (Montgomery, Katz Drug, or the Freedom Rides)." },
    { id: "plan", short: "Clinic plan: policy or community fix + challenge",
      label: "📋 Report: was your fix a policy fix or a community fix? Name one challenge.",
      stem: "My fix was a ___ fix because ___. One challenge was ___.",
      min: 70, newWords: 6,
      mustAll: [["policy", "community", "private", "government", "law", "vote", "council", "carpool", "van", "volunteer", "nurse", "church", "pop-up", "pop up", "both"],
                ["tax", "cost", "money", "oppon", "disagree", "rumor", "false", "ignore", "slow", "criticism", "backlash", "show up", "lazy", "vote", "volunteer", "hours", "driver", "tired", "burn", "brandt", "budget", "time", "lost", "lose"]],
      mustMsg: "Report: say policy or community fix AND one challenge (cost, opponents, rumors, lost vote, tired volunteers…)." }
  ];

  // ---------------- The game ----------------
  const PARTS = ["🗂️ How movements start", "🧰 Fill your toolkit", "🏥 Clinic campaign"];
  const STEPS = [
    // ===== Part 1 · How movements start =====
    { id: "s1", type: "check", part: 0, std: "Soc.15", kicker: "Case file 1 · Des Moines, Iowa · 1948", short: "Katz Drug: a law only works if enforced", stamp: "+3 TOOLS", tools: ["sitin", "picket", "court"],
      scene: () => file("Katz Drug, Des Moines", rows([
        ["📜", "<b>1884:</b> Iowa law bans refusing service by race."],
        ["🍦", "<b>1948:</b> Katz won't serve <b>Edna Griffin</b>. She's Black."],
        ["🪑", "Months of sit-ins and pickets."],
        ["⚖️", "<b>1949:</b> Iowa's top court rules against Katz."]
      ]), "State v. Katz (Iowa, 1949). Griffin was with her baby daughter and two friends."),
      ask: "Iowa had a law. Why did Griffin still have to act?",
      options: ["A law only works if someone enforces it.", "The 1884 law was thrown out by 1948.", "The law covered stores but not counters.", "Iowa courts refused all race cases then."],
      nope: ["", "In 1949 a court still used that law.", "Lunch counters were on the law's list.", "The top court took the case."],
      hint: "Row 1 says the law existed. Was the store following it?",
      reveal: `<p><b>Policy response</b>: government acts with a law, ruling, or rule.</p>` },

    { id: "s4", type: "sort", part: 0, std: "Soc.15", kicker: "Case file 2 · Sort the goals", short: "Reform vs. revolutionary vs. resistance (sort)", stamp: "SORTED",
      scene: () => `<div class="crowd" aria-hidden="true"><span>✊🏾</span><span>✊🏻</span><span>✊🏽</span><span>✊🏿</span><span>✊🏼</span></div>` + say("🗂️ Case note", "Same tactics. Different goals. The goal decides the type."),
      ask: "Tap a goal, then its movement type.",
      tiles: [
        { id: "vote", icon: "🗳️", t: "Win women the vote", s: "same government", bin: "reform" },
        { id: "colony", icon: "🏴", t: "Throw out colonial rulers", s: "start a new nation", bin: "rev" },
        { id: "undo", icon: "↩️", t: "Undo a new rights law", s: "go back to before", bin: "resist" }
      ],
      bins: [
        { id: "reform", icon: "🔧", t: "Reform", s: "change some rules" },
        { id: "rev", icon: "💥", t: "Revolutionary", s: "replace the system" },
        { id: "resist", icon: "🛑", t: "Resistance", s: "stop a change" }
      ],
      hint: "Fix part of it? Replace all of it? Or stop it?",
      reveal: `<p><b>Social movement</b>: many people working together over time to change society, or stop a change.</p>` },

    // ===== Part 2 · Fill your toolkit =====
    { id: "t1", type: "check", part: 1, std: "Soc.15", kicker: "Case file 3 · Montgomery, Alabama · 1955–1956", short: "Why Montgomery boycott worked", stamp: "381 DAYS", tools: ["boycott", "carpool"],
      scene: () => bars("Who rode the buses?", [{ l: "Black riders", v: 75, s: "about 3 of 4", c: "#0f8b8d" }, { l: "Others", v: 25, s: "about 1 of 4", c: "#9aa7b8" }]) +
        file("Montgomery Bus Boycott", rows([
          ["🚫", "After <b>Rosa Parks</b>'s arrest, Black riders boycott: <b>381 days</b>."],
          ["🚗", "Carpools get them to work."],
          ["⚖️", "<b>1956:</b> Supreme Court bans bus segregation."]
        ]), "Browder v. Gayle, 1956."),
      ask: "Why did the boycott hurt the bus company so much?",
      options: ["Black riders were most of its riders.", "The city had already planned to end it.", "Carpools cost less than a bus ticket.", "Bus drivers went on strike with riders."],
      nope: ["", "The city fought it the whole time.", "True, but it doesn't explain the damage.", "The drivers didn't strike."],
      hint: "Check the chart. Who paid most of the fares?",
      reveal: `<p><b>Boycott</b> = refuse to buy or use. <b>Carpools</b> = a community fix, no government needed.</p>` },

    { id: "e1", type: "event", part: 1, kicker: "Clinic · Week 1", short: "First tool for the clinic",
      scene: () => routeMap() + say("🧑‍💼 Councilor Brandt", "The clinic costs too much. It closes Feb 1.", "rv") + say("👩🏾 Odette, mom of two", "No clinic, no doctor for my kids. Help us."),
      ask: "Your first move?",
      cards: [
        { id: "meet", icon: "🎤", title: "Patient meeting", line: "Collect stories and names.", fx: 2, result: "40 patients show up. Now you have real stories.", stamp: "PACKED ROOM", cause: "Week 1: held a patient meeting" },
        { id: "roast", icon: "📱", title: "Roast Brandt online", line: "Go viral fast.", fx: 0, result: "Lots of views. Zero volunteers.", stamp: "ALL TALK", cause: "Week 1: roasted Brandt online" },
        { id: "shops", icon: "🚫", title: "Boycott all city shops", line: "Hit the whole city.", fx: -1, result: "Shop owners get mad. Some patients work there.", stamp: "BACKFIRE", cause: "Week 1: boycotted the wrong target" }
      ],
      after: `<p>Montgomery's boycott aimed at the one company that decided.</p>` },

    { id: "t3", type: "check", part: 1, std: "Soc.15", kicker: "Case file 4 · The Freedom Rides · 1961", short: "Freedom Rides: risk, then change", stamp: "NEW RULE", tools: ["news"],
      scene: () => `<div class="ride" role="img" aria-label="Route of the 1961 Freedom Rides: Washington D.C., then Anniston, Alabama, then Jackson, Mississippi.">
          <div class="stop"><span>🚌</span><b>May</b><small>Black and white riders leave D.C. together</small></div>
          <div class="stop hot"><span>🔥</span><b>Anniston, AL</b><small>A mob firebombs a bus</small></div>
          <div class="stop"><span>⛓️</span><b>Jackson, MS</b><small>300+ riders jailed</small></div>
          <div class="stop win"><span>📜</span><b>Nov. 1961</b><small>Federal rule bans segregated bus stations</small></div>
        </div>` + src("Interstate Commerce Commission rule, effective Nov. 1, 1961."),
      ask: "What does this case show about fighting inequality?",
      options: ["Activists faced violence before winning.", "Change came fast and with little danger.", "The riders got almost no news coverage.", "The new rule came first, then the rides."],
      nope: ["", "Look at stops 2 and 3.", "News of the attacks spread nationwide.", "Check the order of the stops."],
      hint: "What happened to riders BEFORE the new rule?",
      reveal: `<p>News of the violence pushed the government to act.</p>` },


    // ===== Part 3 · Clinic campaign =====
    { id: "e2", type: "event", part: 2, kicker: "Clinic · Council night", short: "City council move",
      scene: () => council(say("🧑‍💼 Councilor Brandt", "Public comment. You get ten minutes.", "rv")),
      ask: "How do you use the 10 minutes?",
      cards: [
        { id: "facts", icon: "🎤", title: "Patients + numbers", line: "Stories, plus who uses it.", fx: 2, result: "Two members ask the city for other cuts.", stamp: "HEARD", cause: "Council: patients spoke with facts" },
        { id: "chant", icon: "📢", title: "Chant till it stops", line: "Make them hear you.", fx: -2, result: "Meeting canceled. The news shows shouting, not patients.", stamp: "SHUT DOWN", cause: "Council: chanted the meeting down" },
        { id: "petition", icon: "📝", title: "Drop off a petition", line: "300 online names.", fx: 1, result: "It shows support, but it's easy to ignore.", stamp: "FILED", cause: "Council: dropped off a petition" }
      ] },

    { id: "c1", type: "check", part: 2, std: "Soc.15", kicker: "Council night · Public comment", short: "Opponents have real reasons", stamp: "LISTENED",
      scene: () => council(say("👵 Resident", "I'm retired. My check never grows. Fund the clinic, and my taxes go up.")),
      ask: "What does her comment show about the fight?",
      options: ["Opponents can have real reasons, like cost.", "Anyone against the clinic wants patients hurt.", "Taxes have nothing to do with city clinics.", "Opponents never come to council meetings."],
      nope: ["", "Her worry is about her own bills.", "City money comes from taxes.", "She's at the meeting right now."],
      hint: "Is her worry about money a real one?",
      reveal: `<p>Movements face <b>challenges</b>: opponents, cost worries, rumors, slow change.</p>` },

    { id: "e3", type: "event", part: 2, kicker: "Clinic · The comments", short: "Answering opponents",
      scene: () => phone(`<div class="post"><b>🗞️ City News</b><p>Council may close Eastside Clinic to save money.</p></div><div class="cmt">💬 “Just go to the ER.”</div><div class="cmt">💬 “The city has no choice.”</div>`),
      ask: "How do you answer?",
      cards: [
        { id: "comp", icon: "🤝", title: "Offer a compromise", line: "Fewer days, not zero.", fx: 2, result: "The city saves money. Doors stay open 3 days a week.", stamp: "MIDDLE GROUND", cause: "Comments: offered a compromise" },
        { id: "clap", icon: "🔥", title: "Clap back", line: "Call them selfish.", fx: -2, result: "Name-calling. Undecided people tune out.", stamp: "BACKFIRE", cause: "Comments: clapped back" },
        { id: "ignore", icon: "📸", title: "Just post patient stories", line: "Ignore the haters.", fx: 1, result: "Stories help, but a false rumor spreads.", stamp: "HALF HEARD", cause: "Comments: ignored critics" }
      ],
      after: `<p>Many real wins are <b>partial</b>.</p>` },

    { id: "pc", type: "sort", part: 2, std: "Soc.15", kicker: "Clinic · How did real wins happen?", short: "Policy vs. community/private responses (sort)", stamp: "BOTH WORK",
      scene: () => routeMap() + say("👩🏾‍⚕️ Odette", "Wait for the city, or fix it ourselves?"),
      ask: "Tap a real fix, then sort it.",
      tiles: [
        { id: "cp", icon: "🚗", t: "Montgomery carpools", s: "1955, during the boycott", bin: "comm" },
        { id: "cra", icon: "📜", t: "Civil Rights Act", s: "1964, passed by Congress", bin: "pol" },
        { id: "union", icon: "📝", t: "Growers sign union deals", s: "1970, after a farmworker strike", bin: "comm" },
        { id: "rules", icon: "✍️", t: "Disability rights rules", s: "1977, after a sit-in", bin: "pol" }
      ],
      bins: [
        { id: "pol", icon: "🏛️", t: "Policy", s: "government acts: law, ruling, rule" },
        { id: "comm", icon: "🤝", t: "Community", s: "people act, no new law" }
      ],
      hint: "Did a government pass it? Or did people make it happen themselves?",
      reveal: `<p><b>Community</b> fixes can start fast. <b>Policy</b> fixes can reach everyone.</p>` },

    { id: "e4", type: "fix", part: 2, kicker: "Clinic · Final week", short: "Clinic fix (policy or community)",
      scene: () => council(say("🧑‍💼 Councilor Brandt", "The vote is Tuesday. I still say close it.", "rv")),
      ask: "Pick your fix.",
      cards: [
        { id: "policy", icon: "🏛️", title: "Policy fix", line: "Council votes to fund the clinic.", pros: ["✔ lasts", "✔ every patient"], cons: [`✖ needs ${NEED_VOTES} votes`, "✖ costs taxes"], cause: "Fix: pushed for a council vote" },
        { id: "community", icon: "🤝", title: "Community fix", line: "Volunteer nurses, church space, a van.", pros: ["✔ starts now", "✔ no vote"], cons: ["✖ needs volunteers", "✖ fewer hours"], cause: "Fix: volunteer nurses + a van" },
        { id: "both", icon: "🏛️🤝", title: "Both", line: "Pop-up clinic now, vote Tuesday.", pros: ["✔ now + lasting"], cons: ["✖ most work"], need: 8, cause: "Fix: pop-up clinic now + a vote" }
      ] },

    { id: "c3", type: "check", part: 2, std: "Soc.15", kicker: "Epilogue · Does winning end it?", short: "Wins vs. lasting inequality", stamp: "REAL DATA",
      scene: () => file("Big wins", rows([["📜", "<b>1964:</b> Civil Rights Act bans segregation and job discrimination."], ["🗳️", "<b>1965:</b> Voting Rights Act protects the vote."]])) +
        bars("Typical family wealth, 2022", [{ l: "White families", v: 285, s: "$285,000", c: "#1d2433" }, { l: "Black families", v: 45, s: "$45,000", c: "#0f8b8d" }], "Federal Reserve, Survey of Consumer Finances, 2022 (median wealth)."),
      ask: "What do these facts show?",
      options: ["Laws can change while some gaps last.", "Movements never changed any laws at all.", "The gap closed once the new laws passed.", "The wealth gap is pretty small today."],
      nope: ["", "Two big laws passed. Check the top.", "Check the 2022 bars.", "$285,000 vs. $45,000 isn't small."],
      hint: "Compare what the laws did with the 2022 bars.",
      reveal: `<p>Gaps that build over generations can outlast the laws.</p>` },

    { id: "end", type: "end", part: 2, kicker: "Tuesday · Vote night" },
    { id: "write", type: "write", part: 2, kicker: "Your organizer's report" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check" || s.type === "sort");

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, m: START_MOM, picks: {}, wrong: {}, done: {}, placed: {}, tools: [], writing: {}, turnedIn: false, ended: false, endKey: "" });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.picks || typeof st.m !== "number") st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts clean (never shows the last kid's work).
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // ---------------- HUD ----------------
  const youFace = m => m >= 8 ? "😎" : m >= 6 ? "😄" : m >= 3 ? "🙂" : "😟";
  const brandtMood = m => m >= 8 ? "😰" : m >= 6 ? "😬" : m >= 4 ? "😐" : "😤";
  function hud() {
    const h = $("hud");
    h.hidden = st.step < 0;
    if (st.step < 0) return;
    $("momFill").style.width = (st.m * 10) + "%"; $("momNum").textContent = st.m + "/10";
    $("youFace").textContent = youFace(st.m);
    $("rMood").textContent = brandtMood(st.m);
    $("kit").innerHTML = `<span class="kl">🧰</span>` + TOOLS.map(t => `<span class="tool${st.tools.includes(t.id) ? " on" : ""}" id="tool-${t.id}" title="${t.t}${st.tools.includes(t.id) ? "" : " (not earned yet)"}">${t.icon}</span>`).join("");
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("parts").innerHTML = PARTS.map((p, i) => `<span class="${i < step.part ? "past" : i === step.part ? "now" : ""}">${p}</span>`).join("") +
      `<span class="goalchip"><span class="gl">🎯 Vote night: 📣 6+ = ${NEED_VOTES} votes</span><span class="gs">🎯 📣6+</span></span><span class="stepn">Step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}</span>`;
  }
  function bump(delta) {
    const before = st.m;
    st.m = Math.max(0, Math.min(10, st.m + delta));
    return st.m - before;
  }
  function animateMom(real) {
    hud();
    if (!real) return;
    const el = $("mMom");
    const f = document.createElement("span");
    f.className = "float " + (real > 0 ? "good" : "bad");
    f.textContent = (real > 0 ? "+" : "−") + Math.abs(real);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
    const r = $("rivalBox"); r.classList.remove("shake"); void r.offsetWidth; r.classList.add("shake");
  }
  function giveTools(step) {
    if (!step.tools) return;
    let added = false;
    step.tools.forEach(id => { if (!st.tools.includes(id)) { st.tools.push(id); added = true; } });
    if (!added) return;
    save(); hud();
    step.tools.forEach((id, n) => { const el = $("tool-" + id); if (el) { el.style.animationDelay = (n * 150) + "ms"; el.classList.add("pop"); } });
  }
  function stamp(host, text, bad) {
    if (!host || !text) return;
    const s = document.createElement("div");
    s.className = "stamp" + (bad ? " bad" : ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml) {
    app.innerHTML = `<div class="board"><div class="scene ${step.part === 2 || step.type === "event" ? "city" : "desk"}" id="scene"><p class="kick">${esc(step.kicker)}</p>${sceneHtml}</div><div class="play" id="play">${playHtml}</div></div>`;
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "end") return "Go to the vote ▶";
    if (nx.type === "write") return "Write your report ▶";
    if (nx.part !== step.part) return "Next: " + PARTS[nx.part].replace(/^\S+ /, "") + " ▶";
    if (nx.type === "event" || nx.type === "fix") return "Back to the clinic ▶";
    return nx.part === 2 ? "Next ▶" : "Next case file ▶";
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
      <div class="tart">${routeMap()}</div>
      <div class="tcopy">
        <p class="tk">Sociology · Unit 4 · Day 6</p>
        <h1>The Organizer's Toolkit</h1>
        <p class="hook">The city wants to close Eastside Clinic. 1,800 patients need it.</p>
        <ul class="how"><li><span>🗂️</span>Crack real case files</li><li><span>🧰</span>Collect the tactics that won</li><li><span>🏥</span>Use them to save the clinic</li></ul>
        <p class="chips"><span>⏱️ 20 min</span><span>🔍 7 checks</span><span>✏️ 2 short answers</span><span>❌ Guesses cost 📣</span></p>
        <p class="goal">🎯 Goal: explain how people, movements, and governments fight inequality.</p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Open case file 1 ▶</button></div>
        <p id="introMsg" class="msg" role="status"></p>
        <p class="src">Millbrook, Iowa, its clinic, and its people are made up. Every case file is real.</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("nameBox").focus(); return; }
      // This student is now on this Chromebook: clear any other student's saved work first.
      try { if (window.classClaimDevice) window.classClaimDevice(fixed); } catch (e) {}
      st = fresh(); st.name = fixed; st.step = 0;
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      save(); render(); window.scrollTo(0, 0);
    };
    $("nameBox").addEventListener("keydown", e => { if (e.key === "Enter") $("startBtn").click(); });
  }

  // ---- Wrong-answer lock shared by checks ----
  let locked = false;
  function runLock(text, hint, msgEl, onDone, secs) {
    locked = true;
    let left = secs;
    const tick = () => {
      if (!document.body.contains(msgEl)) { locked = false; return; }
      msgEl.innerHTML = `💭 Not quite. ${esc(text || hint)} <span class="cd">${left}</span>`;
      if (left-- <= 0) { locked = false; msgEl.innerHTML = `💭 ${esc(hint)} Try again.`; onDone(); return; }
      setTimeout(tick, 1000);
    };
    tick();
  }
  function markWrong(step) {
    const first = !st.wrong[step.id];
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + LOCK * 1000;
    let real = 0;
    if (first) real = bump(-1);   // a first wrong guess on a check costs 1 momentum (once per check)
    save();
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    animateMom(real);
  }
  function markRight(step) {
    st.done[step.id] = true; save();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check: evidence check inside the case file ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${step.ask}</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) return solved(step, true);
    draw(step);
    if (lockLeft() > 0) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock("", step.hint, $("qmsg"), () => draw(step), lockLeft()); }
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
      markRight(step);
      btn.classList.add("right");
      setTimeout(() => solved(step, false), 450);
      return;
    }
    markWrong(step);
    btn.classList.add("wrong");
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock((step.nope || [])[o.n], step.hint, $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    $("replies").outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Case cracked</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp($("scene"), step.stamp); giveTools(step); }
    addNext(step, step.reveal + toolLine(step), quiet);
  }
  const toolLine = step => step.tools ? `<p class="sub">🧰 Added: ${step.tools.map(id => { const t = TOOLS.find(x => x.id === id); return t.icon + " " + t.t; }).join(" · ")}</p>` : "";

  // ---- Sort check: tap a card, then a bin ----
  let sel = null;
  function sortStep(step) {
    sel = null;
    shell(step, step.scene(), `<p class="ask">${step.ask}</p><div class="tiles" id="tiles"></div><div class="bins n${step.bins.length}" id="bins"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    const bins = $("bins");
    step.bins.forEach(b => {
      const el = document.createElement("button"); el.type = "button"; el.className = "bin"; el.dataset.id = b.id;
      el.innerHTML = `<span class="bi">${b.icon}</span><b>${b.t}</b><small>${b.s}</small><span class="got" id="got-${b.id}"></span>`;
      el.onclick = () => dropOn(step, b.id);
      bins.appendChild(el);
    });
    paintSort(step);
    if (st.done[step.id]) return sortSolved(step, true);
    drawTiles(step);
    if (lockLeft() > 0) { lockTiles(true); runLock("", step.hint, $("qmsg"), () => { lockTiles(false); drawTiles(step); }, lockLeft()); }
  }
  function paintSort(step) {
    step.bins.forEach(b => {
      const ts = step.tiles.filter(x => st.placed[x.id] === b.id);
      const g = $("got-" + b.id); if (g) g.innerHTML = ts.map(t => `<span class="placed">${t.icon} ${t.t}</span>`).join("");
      const need = step.tiles.filter(x => x.bin === b.id).length;
      const el = document.querySelector(`.bin[data-id="${b.id}"]`); if (el) el.classList.toggle("full", ts.length >= need);
    });
  }
  function lockTiles(on) { document.querySelectorAll(".tile,.bin").forEach(x => x.disabled = on); }
  function drawTiles(step) {
    const box = $("tiles"); if (!box) return;
    const before = [...box.querySelectorAll(".tile")].map(x => x.dataset.id).join("|");
    const left = step.tiles.filter(t => !st.placed[t.id]);
    let order = shuffle(left);
    for (let k = 0; k < 8 && before && left.length > 1 && order.map(o => o.id).join("|") === before; k++) order = shuffle(left);
    box.replaceChildren(); sel = null;
    order.forEach(t => {
      const el = document.createElement("button"); el.type = "button"; el.className = "tile"; el.dataset.id = t.id;
      el.innerHTML = `<span class="ti">${t.icon}</span><b>${t.t}</b><small>${t.s}</small>`;
      el.onclick = () => { if (locked) return; sel = t.id; document.querySelectorAll(".tile").forEach(x => x.classList.toggle("sel", x.dataset.id === t.id)); document.querySelectorAll(".bin").forEach(x => x.classList.add("ready")); };
      box.appendChild(el);
    });
    document.querySelectorAll(".bin").forEach(x => { x.classList.remove("ready"); x.disabled = false; });
  }
  function dropOn(step, binId) {
    if (locked) return;
    const msg = $("qmsg");
    if (!sel) { msg.textContent = "Tap a card first."; msg.className = "msg"; return; }
    const t = step.tiles.find(x => x.id === sel);
    if (st.placed[t.id]) return;
    if (t.bin === binId) {
      st.placed[t.id] = binId; save();
      msg.textContent = ""; sel = null;
      paintSort(step);
      const el = document.querySelector(`.bin[data-id="${binId}"]`); if (el) { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
      if (step.tiles.every(x => st.placed[x.id])) { markRight(step); $("tiles").replaceChildren(); return sortSolved(step, false); }
      drawTiles(step);
      return;
    }
    markWrong(step);
    const tileEl = document.querySelector(`.tile[data-id="${t.id}"]`); if (tileEl) tileEl.classList.add("wrong");
    lockTiles(true);
    runLock("", step.hint, msg, () => { lockTiles(false); drawTiles(step); }, LOCK);
  }
  function sortSolved(step, quiet) {
    paintSort(step);
    const tb = $("tiles"); if (tb) tb.replaceChildren();
    document.querySelectorAll(".bin").forEach(x => { x.disabled = true; x.classList.add("full"); });
    if (!quiet) stamp($("scene"), step.stamp);
    addNext(step, step.reveal, quiet);
  }

  // ---- Event: a campaign choice (results hidden until you pick) ----
  function fxChip(n) { return `<span class="fx ${n > 0 ? "g" : n < 0 ? "b" : "z"}">📣 ${n > 0 ? "+" + n : n < 0 ? "−" + Math.abs(n) : "±0"}</span>`; }
  function event(step) {
    const picked = st.picks[step.id];
    shell(step, step.scene(), `<p class="ask">${step.ask}</p><div class="cards n${step.cards.length}" id="cards"></div><div id="after"></div>`);
    const box = $("cards");
    if (!step.order) step.order = shuffle(step.cards.map((c, i) => i));
    step.order.forEach(i => {
      const c = step.cards[i];
      const isPicked = picked === c.id;
      const b = document.createElement("button"); b.type = "button";
      b.className = "gcard" + (isPicked ? " flipped" : "") + (picked && !isPicked ? " spent" : "");
      const front = `<span class="ci">${c.icon}</span><span class="ct">${c.title}</span><span class="cl">${c.line}</span><span class="cfx"><span class="fx q">📣 ?</span></span>`;
      const back = `<span class="ci small">${c.icon}</span><span class="cr">${c.result}</span><span class="cfx">${fxChip(c.fx)}</span>`;
      b.innerHTML = `<span class="inner"><span class="face front">${front}</span><span class="face back">${back}</span></span>`;
      if (isPicked) b.setAttribute("aria-label", c.title + ": " + c.result);
      b.disabled = !!picked;
      b.onclick = () => {
        if (st.picks[step.id]) return;
        st.picks[step.id] = c.id;
        const real = bump(c.fx);
        save();
        b.classList.add("flipped");
        box.querySelectorAll(".gcard").forEach(x => { x.disabled = true; if (x !== b) x.classList.add("spent"); });
        animateMom(real);
        refreshCouncil();
        stamp($("scene"), c.stamp, c.fx < 0);
        setTimeout(() => addNext(step, step.after || ""), 900);
      };
      box.appendChild(b);
    });
    if (picked) addNext(step, step.after || "", true);
  }

  // ---- The fix: policy vs. community (honest trade-offs shown up front) ----
  function fix(step) {
    const picked = st.picks[step.id];
    shell(step, step.scene(), `<p class="ask">${step.ask}</p><div class="cards n3" id="cards"></div><div id="after"></div>`);
    const box = $("cards");
    step.cards.forEach(c => {
      const ok = !c.need || st.m >= c.need;
      const isPicked = picked === c.id;
      const b = document.createElement("button"); b.type = "button";
      b.className = "gcard fixc" + (isPicked ? " chosen" : "") + (!ok ? " locked" : "") + (picked && !isPicked ? " spent" : "");
      b.innerHTML = `<span class="inner"><span class="face front"><span class="ci">${c.icon}</span><span class="ct">${c.title}</span><span class="cl">${c.line}</span><span class="cfx">${ok ? c.pros.map(p => `<span class="fx g">${p}</span>`).join("") + c.cons.map(p => `<span class="fx b">${p}</span>`).join("") : `<span class="fx lock">🔒 Needs 📣${c.need}</span>`}</span></span></span>`;
      b.disabled = !!picked || !ok;
      b.onclick = () => {
        if (st.picks[step.id]) return;
        st.picks[step.id] = c.id; save();
        b.classList.add("chosen");
        box.querySelectorAll(".gcard").forEach(x => { x.disabled = true; if (x !== b) x.classList.add("spent"); });
        stamp($("scene"), c.id === "policy" ? "VOTE SET" : c.id === "community" ? "VOLUNTEERS IN" : "ALL IN");
        setTimeout(() => addNext(step, ""), 700);
      };
      box.appendChild(b);
    });
    if (picked) addNext(step, "", true);
  }

  // ---- Endings ----
  function ending() {
    const m = st.m, v = votes(m), f = st.picks.e4, n = 7 - v;
    let e;
    if (f === "both") e = { key: "Clinic Saved", icon: "🎉", cls: "win", text: `Volunteers ran a pop-up clinic all week. Then the council voted ${v}–${n} to keep Eastside open.` };
    else if (f === "policy" && v >= NEED_VOTES) e = { key: "Saved by Vote", icon: "🗳️", cls: "win", text: `The council votes ${v}–${n} to fund the clinic. It covers every patient, but it costs tax money.` };
    else if (f === "policy") e = { key: "Vote Lost", icon: "📉", cls: "low", text: `The council votes ${v}–${n} to close the clinic. Many movements lose the first vote. Patients plan round two.` };
    else if (m >= 6) e = { key: "Pop-Up Clinic", icon: "🩺", cls: "mid", text: "Twelve nurses volunteer. A church hosts a clinic two days a week. No vote, so no lasting promise." };
    else e = { key: "Volunteers Stretched", icon: "🚐", cls: "low", text: "Only three nurses sign up. The van comes once a week. Lines are long." };
    const causes = [];
    ["e1", "e2", "e3"].forEach(id => { const s = STEPS.find(x => x.id === id); const c = s.cards.find(x => x.id === st.picks[id]); if (c) causes.push(c.cause); });
    const misses = CHECKS.filter(c => st.wrong[c.id]).length;
    causes.push(misses ? "Case files: shaky guesses cost momentum" : "Case files: all cracked on the first try");
    const fc = STEPS.find(x => x.id === "e4").cards.find(x => x.id === f); if (fc) causes.push(fc.cause);
    e.causes = causes;
    return e;
  }
  function endStep(step) {
    const e = ending();
    if (!st.ended || st.endKey !== e.key) { st.ended = true; st.endKey = e.key; save(); }
    shell(step, routeMap() + council(),
      `<div class="endcard ${e.cls}"><p class="eicon">${e.icon}</p><h2>${esc(e.key)}</h2><p>${e.text}</p></div>
       <div class="caused"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>
       <div id="after"></div>`);
    stamp($("scene"), e.key.toUpperCase(), e.cls === "low");
    addNext(step, "", true);
  }

  // ---- Writing (in-world report) + turn in ----
  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="clipboard"><p class="cbh">🧠 Test tomorrow: know these</p>
        <p><b>📣 Social movement</b>: people organizing over time for change</p>
        <p><b>🔧 Reform · 💥 Revolutionary · 🛑 Resistance</b></p>
        <p><b>🧰 Tactics</b>: boycott, sit-in, strike, court case</p>
        <p><b>🏛️ Policy</b> vs. <b>🤝 community</b> responses</p>
        <p><b>⚠️ Challenges</b>: opponents, backlash, slow change</p>
        <p class="endline">Your ending: ${e.icon} ${esc(e.key)} · 📣 ${st.m}/10</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">${p.label}</label>
         <p class="stem">Starter: ${esc(p.stem)} <button type="button" class="mini" data-starter="${p.id}">Use it</button></p>
         <textarea id="w_${p.id}" rows="3" placeholder="Type 1–2 sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: say <b>why</b> it worked or failed.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "File report + turn in ▶"}</button>
         <p id="sendMsg" class="msg" role="status" aria-live="polite">${sent ? "✓ Turned in. You can fix your report and turn it in again." : ""}</p>
       </div>`);
    PROMPTS.forEach(p => {
      const box = $("w_" + p.id);
      box.addEventListener("input", () => { st.writing[p.id] = box.value; save(); });
    });
    document.querySelectorAll("[data-starter]").forEach(b => {
      b.onclick = () => {
        const p = PROMPTS.find(x => x.id === b.dataset.starter), box = $("w_" + p.id);
        if (!box.value.trim()) { box.value = p.stem; st.writing[p.id] = box.value; save(); }
        box.focus(); const i = box.value.indexOf("___"); if (i >= 0) box.setSelectionRange(i, i + 3);
      };
    });
    $("sendBtn").onclick = () => send(e);
  }

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  async function send(e) {
    const msg = $("sendMsg");
    for (const p of PROMPTS) {
      const box = $("w_" + p.id);
      const v = (box.value || "").trim();
      const sayBad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
        if (junk) { msg.textContent = (p.id === "best" ? "Rally speech: " : "Report: ") + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return sayBad((p.id === "best" ? "Rally speech" : "Report") + ": write a little more (1–2 full sentences).");
      if (/_{2,}/.test(v)) return sayBad("Fill in the blanks (___) with your own words.");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return sayBad((p.id === "best" ? "Rally speech" : "Report") + ": add more of your own ideas from today.");
      if (p.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return sayBad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    const answers = { "Standard": STANDARD };
    const right = CHECKS.filter(c => !st.wrong[c.id]).length;
    answers["First-try correct"] = right + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECKS.forEach(c => {
      const w = st.wrong[c.id];
      const ans = c.type === "sort" ? c.bins.map(b => b.t + " = " + c.tiles.filter(t => t.bin === b.id).map(t => t.t).join(" + ")).join(" · ") : c.options[0];
      answers[c.short] = ans + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    STEPS.forEach(s => {
      if ((s.type === "event" || s.type === "fix") && st.picks[s.id]) answers["Choice · " + s.short] = (s.cards.find(c => c.id === st.picks[s.id]) || {}).title;
    });
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    answers["Ending"] = e.key;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Clinic momentum"] = st.m + " of 10";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. You're done!"; msg.className = "msg good";
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
    document.body.dataset.step = step.id;
    if (step.type === "check") return check(step);
    if (step.type === "sort") return sortStep(step);
    if (step.type === "event") return event(step);
    if (step.type === "fix") return fix(step);
    if (step.type === "end") return endStep(step);
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
    w.innerHTML = `<span>👋 Welcome back, ${esc(st.name)}! You're on step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}.</span>`;
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
})();
