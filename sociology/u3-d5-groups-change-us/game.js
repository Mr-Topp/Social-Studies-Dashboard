// =====================================================================
//  THE GROUP PRESSURE LAB  (Sociology Unit 3 · Day 5, combined day:
//  "Why Do Groups Change How We Act?" + "Why Do We Root for Us Over Them?")
//  You're head counselor at Camp Cedar Bend (made up) for one week.
//  Staff training starts with a live Asch-style line game (the other
//  counselors are in on it). Monday a coin flip splits 12 campers into
//  Wolves and Foxes. Every day you spend picks on activities and fixes;
//  they move 3 meters: Rivalry (Duke the owner wants it high for views),
//  Fun, and Your voice (earned by standing alone in the line game, spent
//  to speak up in the groupthink staff meeting). Friday a storm hits.
//  4 endings with a "Caused by" trail. 6 evidence checks woven into play
//  (Soc.9 ×2, Soc.10 ×1, Soc.11 ×3), 5 real decisions, 1 writing answer.
//  Real studies: Asch 1951, Tajfel early 1970s, Janis/Bay of Pigs 1961,
//  Sherif Robbers Cave 1954. Turn-in via shared/turnin.js, same
//  assignmentId as the old Group Pressure Lab.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u3-d5-groups-change-us-v2";
  const ASSIGNMENT_ID = "soc-u3-d5-groups-change-us";
  const TITLE = "Sociology · Unit 3 · Day 5 · The Group Pressure Lab";
  const STANDARD = "SS.9-12.Soc.10, SS.9-12.Soc.11";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;       // seconds locked after a wrong answer
  const MAXV = { riv: 10, fun: 10, voice: 3 };
  const ICON = { riv: "🔥", fun: "⭐", voice: "🗣️" };
  const GOOD_UP = { riv: false, fun: true, voice: true };
  const GOAL = { riv: 3, fun: 5 };

  const $ = id => document.getElementById(id);
  const isT = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };   // Test T. (teacher preview)
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // ---------------- Art helpers ----------------
  const KIDS = ["🧒🏻", "👧🏾", "👦🏽", "👧🏼", "🧒🏿", "👦🏻", "👧🏽", "🧒🏼", "👦🏿", "👧🏻", "🧒🏽", "👦🏾"];
  const say = (who, text, cls) => `<div class="say ${cls || ""}">${who ? `<span class="who-s">${who}</span>` : ""}${text}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div>${html}</div></div>`;
  const src = t => `<p class="src">${t}</p>`;
  const file = (lab, inner, cite) => `<div class="file"><span class="clip" aria-hidden="true"></span><p class="flab">${lab}</p>${inner}${cite ? src(cite) : ""}</div>`;

  // The camp board: two cabins, a campfire between them, the lake on top.
  function camp(extra, busHome) {
    const t = st.teams || [];
    if (busHome) return `<div class="camp home" role="img" aria-label="All 12 campers ride one bus home."><div class="lake" aria-hidden="true"><span>🛶</span></div><span class="tree t1" aria-hidden="true">🌲</span><span class="tree t2" aria-hidden="true">🌲</span><div class="bus big" aria-hidden="true"><span class="bbody">${KIDS.map((k, i) => `<i class="${t[i] === "W" ? "w" : "f"}">${k}</i>`).join("")}</span><span class="bwheels">⚫⚫</span></div></div>`;
    const placed = t.length;
    const mixed = st.mixed;
    const W = [], F = [], mid = [];
    t.forEach((s, i) => {
      if (mixed && (i % 3 === 0)) mid.push(KIDS[i]);
      else (s === "W" ? W : F).push(KIDS[i]);
    });
    const r = st.m.riv;
    const sparks = r >= 8 ? "💢💢💢" : r >= 5 ? "💢💢" : r >= 3 ? "💢" : "";
    const bus = placed < 12 ? `<div class="bus" aria-hidden="true"><span class="bbody">${KIDS.slice(placed).map(k => `<i>${k}</i>`).join("")}</span><span class="bwheels">⚫⚫</span></div>` : "";
    return `<div class="camp r${Math.min(3, Math.floor(r / 3))}" role="img" aria-label="Camp map. Wolves cabin: ${W.length} campers. Foxes cabin: ${F.length}. Rivalry ${r} of 10.">
      <div class="lake" aria-hidden="true"><span>🛶</span></div>
      <span class="tree t1" aria-hidden="true">🌲</span><span class="tree t2" aria-hidden="true">🌲</span><span class="tree t3" aria-hidden="true">🌲</span>
      <div class="cabins">
        <div class="cabin w"><span class="cname">🐺 Wolves</span><div class="kids">${W.map(k => `<i>${k}</i>`).join("") || "<em>empty</em>"}</div></div>
        <div class="mid"><span class="sparks" aria-hidden="true">${sparks}</span><span class="fire" aria-hidden="true">🔥</span><div class="kids mix">${mid.map(k => `<i>${k}</i>`).join("")}</div></div>
        <div class="cabin f"><span class="cname">🦊 Foxes</span><div class="kids">${F.map(k => `<i>${k}</i>`).join("") || "<em>empty</em>"}</div></div>
      </div>
      ${bus}
      ${extra || ""}
    </div>`;
  }

  // Line game art: target line + A, B, C (heights in px)
  function lines(target, abc) {
    const H = 210, base = 196;
    const ln = (x, h, lab, col) => `<text x="${x}" y="18" text-anchor="middle" font-size="17" font-weight="900" fill="#173c2e">${lab}</text><line x1="${x}" y1="${base - h}" x2="${x}" y2="${base}" stroke="${col}" stroke-width="8" stroke-linecap="round"/>`;
    return `<svg class="lines" viewBox="0 0 330 ${H}" role="img" aria-label="Line lengths: Target ${target / 10}, A ${abc[0] / 10}, B ${abc[1] / 10}, C ${abc[2] / 10}.">
      <rect x="2" y="2" width="96" height="${H - 4}" rx="12" fill="#fff8e1" stroke="#173c2e" stroke-width="3"/>
      ${ln(50, target, "Target", "#173c2e")}
      <rect x="108" y="2" width="220" height="${H - 4}" rx="12" fill="#fff" stroke="#173c2e" stroke-width="3"/>
      ${ln(148, abc[0], "A", "#2f6fd6")}${ln(218, abc[1], "B", "#2f6fd6")}${ln(288, abc[2], "C", "#2f6fd6")}
    </svg>`;
  }
  const STAFF = [{ n: "Sully", f: "🧑🏻" }, { n: "Marlo", f: "👩🏾" }, { n: "Hank", f: "🧔🏽" }, { n: "Bea", f: "👩🏼" }];
  const ROUNDS = [
    { target: 120, abc: [80, 120, 160], right: "B", group: "B" },
    { target: 100, abc: [100, 140, 60], right: "A", group: "B" },
    { target: 140, abc: [100, 165, 140], right: "C", group: "A" }
  ];

  // ---------------- Writing (camp report) ----------------
  const PROMPT = {
    id: "fix", short: "How to stop us vs. them (with a study)",
    label: "Next summer's counselor asks: how do I stop Wolves vs. Foxes?",
    stem: "To stop the rivalry, I'd ___ because in ___, ___.",
    min: 70, newWords: 6,
    mustAll: [
      ["robbers", "cave", "sherif", "superordinate", "shared goal", "same goal", "common goal", "one goal", "neither", "tajfel", "asch", "janis", "groupthink", "bay of pigs", "conform", "in-group", "ingroup", "in group", "out-group", "outgroup", "out group", "favoritism", "rope", "truck", "water", "work together", "worked together", "working together", "team up", "teamed up", "speak up", "spoke up", "devil"],
      ["because", "since", "so ", "that's why", "which", "shows", "showed", "proved", "found"]
    ],
    mustMsg: "Name a study or idea from today (like Robbers Cave or a shared goal) and say why with “because.”"
  };

  // ---------------- The week ----------------
  const DAYS = ["TRAINING", "MON", "TUE", "WED", "THU", "FRI"];
  const DAYNAME = ["Staff training", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const STEPS = [
    { id: "line", type: "line", day: 0, kicker: "Staff training · The line game", short: "Line test (others were in on it)" },

    { id: "c1", type: "check", day: 0, std: "Soc.11", kicker: "Staff training · Duke's folder", short: "Asch 1951: most caved once; alone, almost nobody missed", stamp: "REAL DATA",
      scene: () => file("Real study · Solomon Asch, 1951",
        `<div class="stats"><div><b>under 1%</b>wrong when alone</div><div><b>75%</b>went with the group at least once</div><div><b>25%</b>never went along</div></div>`,
        "Asch, 1951: 7 actors gave wrong answers on purpose.") + say("🤠 Duke", "See? Everybody caves.", "duke"),
      ask: "Answer Duke with the data.",
      options: ["Most caved once. Alone, almost none missed.", "Most caved, even when they were all alone.", "Almost nobody caved in the big group test.", "Most missed because the lines were too hard."],
      hint: "Compare the “alone” number with the group numbers.",
      reveal: `<p><b>Conformity</b>: changing what you say to match the group.</p>` },

    { id: "flip", type: "flip", day: 1, kicker: "Monday · The bus pulls in", short: "Coin flip into Wolves and Foxes" },

    { id: "c2", type: "sort", day: 1, std: "Soc.10", kicker: "Monday night · Jada is homesick", short: "Jada's groups: primary, secondary, aggregate, reference", stamp: "SORTED",
      scene: () => `<div class="night"><span class="moon" aria-hidden="true">🌙</span>${say("👧🏾 Jada", "I miss home. Nobody here even knows me.")}</div>`,
      ask: "Sort Jada's 4 groups: tap one, then its bin.",
      tiles: [
        { id: "fam", icon: "👪", t: "Mom + little bro", s: "always there", bin: "primary" },
        { id: "job", icon: "🍔", t: "Burger-job crew", s: "shift, then home", bin: "secondary" },
        { id: "bus", icon: "🚌", t: "Camp bus kids", s: "never spoke", bin: "aggregate" },
        { id: "hawks", icon: "🏀", t: "Hawkeyes players", s: "never met, copies them", bin: "reference" }
      ],
      bins: [
        { id: "primary", icon: "💛", t: "Primary", s: "close, lasting" },
        { id: "secondary", icon: "💼", t: "Secondary", s: "for a goal" },
        { id: "aggregate", icon: "🧍🧍", t: "Aggregate", s: "no bond" },
        { id: "reference", icon: "📏", t: "Reference", s: "you compare yourself to" }
      ],
      hint: "How close is she to them? Does she even know them?",
      reveal: `<p><b>Primary</b> = close, lasting (family). <b>Secondary</b> = for a goal (a job).</p>` },

    { id: "tue", type: "draft", day: 2, picks: 2, kicker: "Tuesday · Plan the day", short: "Tuesday activities",
      scene: () => camp(say("🤠 Duke", "Contests get views! Give me a contest!", "duke over")),
      ask: "Spend 🎟️2 on today's activities.",
      cards: [
        { id: "tug", icon: "🏆", title: "Tug-of-war", line: "Winning cabin gets pizza.", fx: { riv: 2, fun: 2 }, result: "Huge cheers. Losers yell “cheaters!”", tag: "prize contest" },
        { id: "hunt", icon: "🧭", title: "Mixed scavenger hunt", line: "Wolves + Foxes on each team.", fx: { riv: -1 }, result: "Some grumbling. Two new friendships.", tag: "mixed hunt" },
        { id: "movie", icon: "🎬", title: "Movie night together", line: "Same room. Same popcorn.", fx: { riv: 2, fun: 1 }, hidden: true, result: "Popcorn war. Duke films it all.", tag: "movie together" },
        { id: "swim", icon: "🏊", title: "Free swim", line: "Chill. No teams.", fx: { fun: 1 }, result: "Fun. But cabins swim apart.", tag: "free swim" }
      ],
      after: () => {
        const p = st.picks.tue || [];
        if (p.includes("movie")) return `<p><b>Contact alone</b> didn't help. Same room isn't same team.</p>`;
        if (p.includes("tug")) return `<p><b>Competition</b> for prizes grows “us vs. them.”</p>`;
        return `<p>Mixing teams cooled things. But fun was low.</p>`;
      } },

    { id: "c3", type: "check", day: 2, std: "Soc.11", kicker: "Tuesday · Snack shack", short: "Tajfel: favor own group, even for less", stamp: "US FIRST",
      scene: () => `<div class="shack"><p class="cap">🎟️ Tess (a Wolf) splits snack tickets.</p><div class="splits"><div class="split pick"><b>A</b><span>🐺 7</span><span>🦊 1</span><em>✔ Tess</em></div><div class="split"><b>B</b><span>🐺 11</span><span>🦊 13</span></div></div></div>` +
        file("Real study · Henri Tajfel, early 1970s", `<p>Teen boys split by favorite painting. Many took <b>less</b> if their group beat the other.</p>`, "Tajfel, Bristol, England, 1970–71."),
      ask: "Why did Tess take fewer tickets?",
      options: ["Beating Foxes mattered more than tickets.", "Tess didn't see that B gave Wolves more.", "Tickets meant more if Foxes got some too.", "Tess wanted both teams to end up equal."],
      hint: "In A, which team wins? In B, which team wins?",
      reveal: `<p><b>In-group favoritism</b>: favoring “us,” even for tiny reasons.</p>` },

    { id: "wed", type: "draft", day: 3, picks: 1, kicker: "Wednesday · 2:00 a.m.", short: "Wednesday: after the raid",
      entry: { riv: 1 }, entryStamp: "RAID!",
      scene: () => camp(say("🦊 Fox camper", "Wolves trashed our cabin! They're ALL cheaters!", "over")),
      ask: "Your move. Pick one.",
      cards: [
        { id: "punish", icon: "⚖️", title: "Punish the Wolves", line: "No swim for Wolves.", fx: { riv: 1, fun: -1 }, result: "Wolves: “Foxes always win.”", cause: "Wed: punished the Wolves" },
        { id: "pizza", icon: "🍕", title: "Pizza, all together", line: "Make them sit together.", fx: { riv: 1, fun: 1 }, result: "Food fight. Fun… kind of.", cause: "Wed: forced pizza together" },
        { id: "talk", icon: "🗣️", title: "Sit-down talk", line: "Spend 1 voice.", fx: { voice: -1, riv: -2, fun: -1 }, need: { voice: 1 }, result: "Awkward. But two kids apologize.", cause: "Wed: spent voice on a talk" },
        { id: "letgo", icon: "😶", title: "Let it go", line: "Don't make it a thing.", fx: { riv: 2 }, result: "Revenge raid at 3 a.m.", cause: "Wed: let it go" }
      ] },

    { id: "c4", type: "check", day: 3, std: "Soc.11", kicker: "Wednesday · Camp gossip", short: "Discrimination = an action (prejudice = a belief)", stamp: "SPOTTED",
      scene: () => `<div class="notes"><div class="note n1"><span>💭</span>“Foxes are all sneaky.”</div><div class="note n2"><span>🚫</span>Wolves block Foxes from the canoes.</div></div><div class="gloss"><span>💭 <b>Prejudice</b> = a belief</span><span>🚫 <b>Discrimination</b> = an action</span></div>`,
      ask: "Which note shows discrimination?",
      options: ["🚫 The canoes. Wolves did something.", "💭 “All sneaky.” Wolves did something.", "🚫 The canoes. Wolves just believe it.", "💭 “All sneaky.” It's the same as the canoes."],
      hint: "One is a thought. One is something done to people.",
      reveal: `<p><b>Out-group bias</b>: judging “them” harsher. It grows into prejudice, then discrimination.</p>` },

    { id: "thu", type: "draft", day: 4, picks: 1, kicker: "Thursday · Staff meeting", short: "Thursday: the Raid War plan", meeting: true,
      scene: () => `<div class="table">${say("🤠 Duke", "Tonight: midnight Raid War! Huge views. Agreed?", "duke")}<div class="thumbs">${STAFF.slice(0, 3).map((s, i) => `<span style="animation-delay:${0.5 + i * 0.6}s"><i>${s.f}</i>${s.n} 👍</span>`).join("")}<span class="me" style="animation-delay:2.3s"><i>🙂</i>You ❓</span></div></div>`,
      ask: "Everyone agreed fast. You?",
      cards: [
        { id: "nod", icon: "👍", title: "Nod along", line: "Free. Raid War is on.", fx: { riv: 3, fun: 1 }, result: "Duke: “Love the energy!”", cause: "Thu: nodded → Raid War" },
        { id: "ask", icon: "🙋", title: "Ask one question", line: "Spend 1 voice.", fx: { voice: -1, riv: 1, fun: 1 }, need: { voice: 1 }, result: "Hank: “…I had doubts too.” Capture the flag instead.", cause: "Thu: asked → flag game" },
        { id: "argue", icon: "😈", title: "Argue against it", line: "Spend 2 voice. Duke gets mad.", fx: { voice: -2, riv: -1 }, need: { voice: 2 }, result: "Raid War canceled. Duke storms out.", cause: "Thu: argued → raid canceled" }
      ],
      after: () => `<p><b>Groupthink</b>: wanting to agree so much that nobody questions a bad plan.</p>` },

    { id: "c5", type: "check", day: 4, std: "Soc.11", kicker: "Thursday · Hank's history file", short: "Bay of Pigs = groupthink (stayed quiet to agree)", stamp: "GROUPTHINK",
      scene: () => file("Real case · Bay of Pigs, 1961",
        `<div class="tl"><span>🏛️ Kennedy's advisers OK a plan: about 1,400 Cubans who fled Castro invade Cuba.</span><span>🤐 Some had doubts. They stayed quiet.</span><span>⛓️ About 1,200 invaders were captured.</span></div>`,
        "Irving Janis, Victims of Groupthink, 1972."),
      ask: "What went wrong in both meetings?",
      options: ["People hid doubts so the team would agree.", "The leader ordered everyone to stop talking.", "Too many people argued, so nothing got done.", "The plan was secret, so nobody heard it."],
      hint: "Did anyone forbid questions? Or did people just not ask?",
      reveal: `<p>In Asch's test, <b>one ally</b> cut caving from 32% to 5%.</p>` },

    { id: "fri", type: "draft", day: 5, picks: 1, kicker: "Friday · Storm morning", short: "Friday: the storm fix",
      entry: { fun: -1 }, entryStamp: "STORM!",
      scene: () => `<div class="storm"><span class="rain" aria-hidden="true"></span><p class="cap">🌩️ Tree down. Supply truck stuck in mud. Parent show at 4.</p><div class="truck" aria-hidden="true">🌳🚚</div>${say("🤠 Duke", "Make it a race! Wolves vs. Foxes!", "duke")}</div>`,
      ask: "Pick the plan.",
      cards: [
        { id: "race", icon: "🏆", title: "Cleanup race", line: "Wolves vs. Foxes. Duke's pick.", fx: { riv: 2, fun: 1 }, hidden: true, result: "Wolves win. Foxes refuse to clap.", cause: "Fri: cleanup race" },
        { id: "rest", icon: "🎬", title: "Rest + movie together", line: "Skip the work. Same room.", fx: { riv: 1, fun: -1 }, hidden: true, result: "Truck still stuck. Popcorn flies again.", cause: "Fri: movie together" },
        { id: "rope", icon: "🪢", title: "One rope, all 12", line: "Too heavy for one cabin.", fx: { riv: -3, fun: 2 }, hidden: true, result: "Everyone pulls. The truck pops free!", cause: "Fri: one rope, all 12" }
      ] },

    { id: "c6", type: "check", day: 5, std: "Soc.11", kicker: "Friday · Wait… that's real?", short: "Robbers Cave: shared goals ended the feud", stamp: "REAL STUDY",
      scene: () => file("Real study · Robbers Cave camp, Oklahoma, 1954",
        `<div class="tl"><span>🏆 Contests with prizes → flag burned, cabins raided</span><span>🎬 Meals + movies together → food fights</span><span>🪢 Jobs needing everyone (water supply, stuck truck) → one bus home together</span></div>`,
        "Muzafer Sherif and others, 1954 (published 1961). 22 boys, ages 11–12."),
      ask: "What finally ended the feud there?",
      options: ["Goals neither group could reach alone.", "More contests with even bigger prizes.", "Eating and watching movies together.", "Keeping the two groups apart for good."],
      hint: "Read the last row. What did the boys do?",
      reveal: `<p><b>Superordinate goal</b>: a goal neither group can reach alone.</p>` },

    { id: "finale", type: "finale", day: 5, kicker: "Friday · 4:00 p.m." },
    { id: "write", type: "write", day: 5, kicker: "Your camp report" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check" || s.type === "sort");

  // ---------------- State ----------------
  const START = { riv: 0, fun: 3, voice: 1 };
  const fresh = () => ({ name: "", step: -1, m: Object.assign({}, START), picks: {}, wrong: {}, done: {}, applied: {}, line: [], teams: [], placed: {}, mixed: false, writing: "", turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.m || !st.picks) st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts clean (never shows the last kid's work).
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // ---------------- HUD ----------------
  const youFace = m => m.riv >= 8 ? "😫" : m.fun <= 2 ? "😐" : m.riv <= 3 && m.fun >= 5 ? "😄" : "🙂";
  const dukeMood = r => r <= 2 ? "😒" : r <= 5 ? "😏" : r <= 7 ? "😃" : "🤑";
  function hud() {
    const h = $("hud");
    h.hidden = st.step < 0;
    if (st.step < 0) return;
    const m = st.m;
    $("rivFill").style.width = (m.riv * 10) + "%"; $("rivNum").textContent = m.riv + "/10";
    $("funFill").style.width = (m.fun * 10) + "%"; $("funNum").textContent = m.fun + "/10";
    $("voicePips").innerHTML = Array.from({ length: MAXV.voice }, (_, i) => `<i class="${i < m.voice ? "on" : ""}"></i>`).join("");
    $("youFace").textContent = youFace(m);
    $("rMood").textContent = dukeMood(m.riv);
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("days").innerHTML = DAYS.map((d, i) => `<span class="${i < step.day ? "past" : i === step.day ? "now" : ""}">${i === 5 ? "🚌 " : ""}${d}</span>`).join("") +
      `<span class="goalchip" title="Goal for Friday"><span class="gl">🎯 Friday: 🔥 ${GOAL.riv} or less · ⭐ ${GOAL.fun}+</span><span class="gs">🎯 🔥≤${GOAL.riv} ⭐${GOAL.fun}+</span></span><span class="stepn">Step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}</span>`;
  }
  const meterEl = { riv: "mRiv", fun: "mFun", voice: "mVoice" };
  function applyFx(fx) {
    const real = {};
    Object.keys(fx || {}).forEach(k => {
      const before = st.m[k];
      st.m[k] = Math.max(0, Math.min(MAXV[k], before + fx[k]));
      if (st.m[k] !== before) real[k] = st.m[k] - before;
    });
    return real;
  }
  function animateFx(real) {
    hud();
    Object.keys(real || {}).forEach((k, n) => {
      const el = $(meterEl[k]); if (!el) return;
      const good = (real[k] > 0) === GOOD_UP[k];
      const f = document.createElement("span");
      f.className = "float " + (good ? "good" : "bad");
      f.textContent = (real[k] > 0 ? "+" : "−") + Math.abs(real[k]);
      f.style.animationDelay = (n * 120) + "ms";
      el.appendChild(f); setTimeout(() => f.remove(), 1700);
      el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
      if (k === "riv" && real[k] > 0) { const r = $("rivalBox"); r.classList.remove("shake"); void r.offsetWidth; r.classList.add("shake"); }
    });
  }
  function fxChips(fx, hidden) {
    if (hidden) return `<span class="fx q">🔥 ?</span><span class="fx q">⭐ ?</span>`;
    return Object.keys(fx).filter(k => fx[k]).map(k => {
      const good = (fx[k] > 0) === GOOD_UP[k];
      return `<span class="fx ${good ? "g" : "b"}">${ICON[k]} ${fx[k] > 0 ? "+" : "−"}${Math.abs(fx[k])}</span>`;
    }).join("");
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
    app.innerHTML = `<div class="board"><div class="scene" id="scene"><p class="kick">${esc(step.kicker)}</p>${sceneHtml}</div><div class="play" id="play">${playHtml}</div></div>`;
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "finale") return "See how camp ends ▶";
    if (nx.day !== step.day) return "Next: " + DAYNAME[nx.day] + " ▶";
    return "Next ▶";
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
      <div class="tart" aria-hidden="true"><span class="big">🏕️</span><span class="b1">🐺</span><span class="b2">🦊</span><span class="b3">🪙</span><span class="b4">🔥</span></div>
      <div class="tcopy">
        <p class="tk">Sociology · Unit 3 · Day 5</p>
        <h1>The Group Pressure Lab</h1>
        <p class="hook">12 campers. 1 coin flip. 5 days.</p>
        <p class="tline">You're the new head counselor at Camp Cedar Bend.</p>
        <ul class="how"><li><span>🪙</span>Split campers with a coin flip</li><li><span>🔥</span>Keep the rivalry from exploding</li><li><span>🚌</span>Friday ends 4 ways</li></ul>
        <p class="chips"><span>⏱️ 25 min</span><span>🔍 6 checks</span><span>✏️ 1 short answer</span></p>
        <p class="goal">🎯 Goal: explain how groups change how we act, and why we root for “us.”</p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Start staff training ▶</button></div>
        <p id="introMsg" class="msg" role="status"></p>
        <p class="src">Camp Cedar Bend and its people are made up. The studies are real.</p>
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

  // ---- Entry effects (once per step) ----
  function doEntry(step) {
    if (!step.entry || st.applied[step.id]) return null;
    st.applied[step.id] = true;
    const real = applyFx(step.entry); save();
    return real;
  }

  // ---- The line game (live Asch test) ----
  function lineStep(step) {
    const n = st.line.length;
    if (n >= ROUNDS.length) return lineDone(step, true);
    const R = ROUNDS[n];
    const d = i => 0.4 + i * 0.6;
    shell(step,
      `${lines(R.target, R.abc)}${n === 0 ? say("🤠 Duke", "Warm-up game. Answer out loud!", "duke") : `<p class="cap">Card ${n + 1} of 3</p>`}`,
      `<div class="askrow"><p class="ask">Which line matches the target?</p><span class="round">Round ${n + 1} of 3</span></div>
       <div class="staff big" id="staff">${STAFF.map((s, i) => `<span class="sp" style="animation-delay:${d(i)}s"><em class="bub">${R.group}</em><i>${s.f}</i><b>${s.n}</b></span>`).join("")}<span class="sp me" style="animation-delay:${d(4)}s"><em class="bub">?</em><i>🙂</i><b>You</b></span></div>
       <p class="eyes" style="animation-delay:${d(4)}s">👀 Everyone looks at you.</p>
       <div class="abc" id="abc">${["A", "B", "C"].map(x => `<button type="button" class="abcbtn" data-x="${x}">${x}</button>`).join("")}</div>
       <p class="msg" id="lmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    const btns = [...document.querySelectorAll(".abcbtn")];
    btns.forEach(b => b.disabled = true);
    setTimeout(() => btns.forEach(b => { if ($("abc")) b.disabled = false; }), isT() ? 0 : d(4) * 1000);
    btns.forEach(b => b.onclick = () => {
      btns.forEach(x => x.disabled = true);
      const x = b.dataset.x;
      st.line.push(x);
      const tricky = R.group !== R.right;
      let real = {};
      if (tricky && x === R.right) real = applyFx({ voice: 1 });
      save();
      b.classList.add("picked");
      const me = document.querySelector(".sp.me em"); if (me) me.textContent = x;
      const msg = $("lmsg");
      if (!tricky) msg.textContent = "Easy one. Everyone agreed.";
      else if (x === R.right) { msg.textContent = "You stood alone. Sully stares."; msg.className = "msg good"; animateFx(real); stamp($("scene"), "OWN VOICE"); }
      else if (x === R.group) { msg.textContent = "You went with the group."; msg.className = "msg"; stamp($("scene"), "WENT ALONG", true); }
      else msg.textContent = "Not the group's answer. Not the target either.";
      setTimeout(() => { if (st.step === STEPS.indexOf(step)) render(); }, 1500);
    });
  }
  function lineStats() {
    let stood = 0, went = 0;
    ROUNDS.forEach((R, i) => { if (R.group === R.right || !st.line[i]) return; if (st.line[i] === R.right) stood++; else if (st.line[i] === R.group) went++; });
    return { stood, went };
  }
  function lineDone(step, quiet) {
    const s = lineStats();
    shell(step,
      `<div class="gotcha">${say("🤠 Duke", "Gotcha! The others were in on it.", "duke big")}<div class="staff">${STAFF.map(p => `<span class="sp in"><i>${p.f}</i><b>${p.n}</b><em>😏</em></span>`).join("")}</div></div>`,
      `<p class="ask">You stood alone <b>${s.stood} of 2</b> times.</p>
       <div class="tally">${ROUNDS.map((R, i) => { const easy = R.group === R.right, mine = st.line[i] === R.right; return `<span class="${easy ? "" : mine ? "ok" : "no"}"><small>Round ${i + 1}</small><b>👥 ${R.group} · 🙂 ${st.line[i]}</b><em>${easy ? "😌" : mine ? "🗣️ +1" : "👥"}</em></span>`; }).join("")}</div>
       <p class="sub">🗣️ Voice = speaking up later. Save it.</p><div id="after"></div>`);
    if (!quiet) stamp($("scene"), "SET UP!", true);
    addNext(step, `<p><b>Conformity</b>: changing what you say to match the group.</p>`, quiet);
  }

  // ---- Coin flip into two cabins ----
  let flipBusy = false;
  function flipStep(step) {
    if (!st.order || st.order.length !== 12) { st.order = shuffle(["W", "W", "W", "W", "W", "W", "F", "F", "F", "F", "F", "F"]); save(); }
    const n = st.teams.length;
    const done = n >= 12;
    shell(step, camp(done ? say("🍔 Lunch", "Wolves sit with Wolves. Foxes with Foxes.", "over") : say("🤠 Duke", "Two teams. Flip for it.", "duke over")),
      `<div class="askrow"><p class="ask">${done ? "Nobody told them to split up." : "Tap the coin for each camper."}</p><span class="round">${n} / 12</span></div>
       <div class="coinrow"><button type="button" class="coin" id="coin" ${done ? "disabled" : ""} aria-label="Flip the coin"><span class="cf" id="cf">${n ? (st.teams[n - 1] === "W" ? "🐺" : "🦊") : "🪙"}</span></button>
       <div class="legend"><span>🐺 Heads = Wolves</span><span>🦊 Tails = Foxes</span></div></div><div id="after"></div>`);
    if (done) return flipDone(step, true);
    $("coin").onclick = () => {
      if (flipBusy || st.teams.length >= 12) return;
      flipBusy = true;
      const c = $("coin"); c.classList.remove("spin"); void c.offsetWidth; c.classList.add("spin");
      setTimeout(() => {
        st.teams.push(st.order[st.teams.length]); save();
        flipBusy = false;
        if (st.teams.length >= 12) {
          const real = doEntryFx(step, { riv: 1, fun: 1 });
          render(); animateFx(real); stamp($("scene"), "US vs. THEM", true);
          const nb = $("nextBtn"); if (nb && nb.scrollIntoView) nb.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else render();
      }, 420);
    };
  }
  function doEntryFx(step, fx) { if (st.applied[step.id]) return {}; st.applied[step.id] = true; const r = applyFx(fx); save(); return r; }
  function flipDone(step, quiet) {
    addNext(step, `<p><b>In-group</b> = “us.” <b>Out-group</b> = “them.” A coin flip was enough.</p>`, quiet);
  }

  // ---- Draft: spend picks on cards ----
  function needMet(c) { return !c.need || Object.keys(c.need).every(k => st.m[k] >= c.need[k]); }
  function draft(step) {
    const entryReal = doEntry(step);
    const picked = st.picks[step.id] || [];
    const left = step.picks - picked.length;
    const tokens = step.picks > 1 ? `<div class="tokens" aria-label="${left} picks left">${Array.from({ length: step.picks }, (_, i) => `<span class="${i < left ? "on" : ""}">🎟️</span>`).join("")}</div>` : "";
    shell(step, step.scene(), `<div class="askrow"><p class="ask">${step.ask}</p>${tokens}</div><div class="cards n${step.cards.length}" id="cards"></div><div id="after"></div>`);
    const box = $("cards");
    step.cards.forEach(c => {
      const isPicked = picked.includes(c.id);
      const ok = needMet(c);
      const b = document.createElement("button"); b.type = "button";
      b.className = "gcard" + (isPicked ? " flipped" : "") + (!ok ? " locked" : "") + (left === 0 && !isPicked ? " spent" : "");
      b.dataset.id = c.id;
      const front = `<span class="ci">${c.icon}</span><span class="ct">${c.title}</span><span class="cl">${c.line}</span><span class="cfx">${ok ? fxChips(c.fx, c.hidden) : `<span class="fx lock">🔒 Needs ${Object.keys(c.need).map(k => ICON[k] + c.need[k]).join(" ")}</span>`}</span>`;
      const back = `<span class="ci small">${c.icon}</span><span class="cr">${c.result}</span><span class="cfx">${fxChips(c.fx, false)}</span>`;
      b.innerHTML = `<span class="inner"><span class="face front">${front}</span><span class="face back">${back}</span></span>`;
      if (isPicked) b.setAttribute("aria-label", c.title + ": " + c.result);
      b.disabled = isPicked || !ok || left === 0;
      b.onclick = () => {
        if ((st.picks[step.id] || []).length >= step.picks) return;
        st.picks[step.id] = (st.picks[step.id] || []).concat(c.id);
        const real = applyFx(c.fx);
        if (step.id === "fri" && c.id === "rope") st.mixed = true;
        if (step.id === "tue" && c.id === "hunt" && st.m.riv <= 2) st.mixed = true;
        save();
        b.classList.add("flipped"); b.disabled = true;
        animateFx(real);
        const nowLeft = step.picks - st.picks[step.id].length;
        document.querySelectorAll(".tokens span").forEach((t, i) => t.classList.toggle("on", i < nowLeft));
        if (nowLeft === 0) {
          box.querySelectorAll(".gcard:not(.flipped)").forEach(x => { x.disabled = true; x.classList.add("spent"); });
          setTimeout(() => addNext(step, step.after ? step.after() : ""), 900);
        }
      };
      box.appendChild(b);
    });
    if (entryReal) { animateFx(entryReal); stamp($("scene"), step.entryStamp, true); }
    if (left === 0) addNext(step, step.after ? step.after() : "", true);
  }

  // ---- Wrong-answer lock shared by checks ----
  let locked = false;
  function runLock(hint, msgEl, onDone, secs) {
    locked = true;
    let left = isT() ? 0 : secs;   // Test T. skips the wrong-answer wait
    const tick = () => {
      if (!document.body.contains(msgEl)) { locked = false; return; }
      msgEl.innerHTML = `💭 Not quite. ${esc(hint)} <span class="cd">${left}</span>`;
      if (left-- <= 0) { locked = false; msgEl.innerHTML = `💭 ${esc(hint)} Try again.`; onDone(); return; }
      setTimeout(tick, 1000);
    };
    tick();
  }
  function markWrong(step) {
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + LOCK * 1000;
    save();
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    st.done[step.id] = true; save();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check: evidence check woven into the scene ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${step.ask}</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) return solved(step, true);
    draw(step);
    if (lockLeft() > 0) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(step.hint, $("qmsg"), () => draw(step), lockLeft()); }
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
    runLock(step.hint, $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    $("replies").outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Filed</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp($("scene"), step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Sort check: tap a group, then a bin ----
  let sel = null;
  function sortStep(step) {
    sel = null;
    shell(step, step.scene(), `<p class="ask">${step.ask}</p><div class="tiles" id="tiles"></div><div class="bins" id="bins"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
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
    if (lockLeft() > 0) { lockTiles(true); runLock(step.hint, $("qmsg"), () => { lockTiles(false); drawTiles(step); }, lockLeft()); }
  }
  function paintSort(step) {
    step.bins.forEach(b => {
      const t = step.tiles.find(x => st.placed[x.id] === b.id);
      const g = $("got-" + b.id); if (g) g.innerHTML = t ? `<span class="placed">${t.icon} ${t.t}</span>` : "";
      const el = document.querySelector(`.bin[data-id="${b.id}"]`); if (el) el.classList.toggle("full", !!t);
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
    if (!sel) { msg.textContent = "Tap a group card first."; msg.className = "msg"; return; }
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
    runLock(step.hint, msg, () => { lockTiles(false); drawTiles(step); }, LOCK);
  }
  function sortSolved(step, quiet) {
    paintSort(step);
    const tb = $("tiles"); if (tb) tb.replaceChildren();
    document.querySelectorAll(".bin").forEach(x => { x.disabled = true; x.classList.add("full"); });
    if (!quiet) stamp($("scene"), step.stamp);
    addNext(step, step.reveal, quiet);
  }

  // ---- Endings ----
  function ending() {
    const m = st.m, fix = (st.picks.fri || [])[0];
    let e;
    if (m.riv >= 8) e = { key: "Camp War", icon: "💥", cls: "low", text: "The parent show turns into a shoving match. Duke's video goes viral. Three families leave early." };
    else if (fix === "rope" && m.riv <= GOAL.riv && m.fun >= GOAL.fun) e = { key: "One Camp", icon: "🚌", cls: "best", text: "All 12 ask to ride one bus home. Wolves trade shirts with Foxes. Parents sign up for next summer." };
    else if (m.fun < GOAL.fun) e = { key: "Snooze Camp", icon: "😴", cls: "mid", text: "No fights. No fun either. One review: “Best part was the bus.”" };
    else e = { key: "Cold Truce", icon: "🧊", cls: "viral", text: "The show goes fine. But on the bus, Wolves sit left. Foxes sit right." };
    const s = lineStats();
    const causes = [s.stood === 2 ? "Training: stood alone twice" : s.stood === 1 ? "Training: stood alone once" : "Training: went with the group"];
    causes.push("Mon: coin flip made two teams");
    const tue = STEPS.find(x => x.id === "tue");
    causes.push("Tue: " + (st.picks.tue || []).map(p => tue.cards.find(c => c.id === p).tag).join(" + "));
    ["wed", "thu", "fri"].forEach(id => {
      const sd = STEPS.find(x => x.id === id), c = sd.cards.find(x => x.id === (st.picks[id] || [])[0]);
      if (c) causes.push(c.cause);
    });
    if (e.key === "Camp War") causes.push("🔥 Rivalry hit " + m.riv);
    else if (e.key === "Snooze Camp") causes.push("⭐ Fun stuck under " + GOAL.fun);
    else if (e.key === "Cold Truce") causes.push(fix !== "rope" ? "No goal needing all 12" : "🔥 Rivalry still above " + GOAL.riv);
    e.causes = causes;
    return e;
  }

  function finale(step) {
    const e = ending();
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon">${e.icon}</span><h2>${e.key}</h2><p>${e.text}</p></div>` + camp("", e.key === "One Camp"),
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">🔥 ${st.m.riv}/10 · ⭐ ${st.m.fun}/10 · 🗣️ ${st.m.voice}/3</p></div>
       <p class="mean">🪙 A coin flip made “us vs. them.” Only a shared goal undid it.</p><div id="after"></div>`);
    stamp($("scene"), e.key.toUpperCase(), e.cls !== "best");
    const sp = $("scene").querySelector(".stamp"); if (sp) sp.classList.add("top");
    const b = nextBtn(step); b.textContent = "✏️ Write your camp report ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="clipboard"><p class="cbh">📋 Camp Cedar Bend · Staff report</p><p><b>Ending:</b> ${e.icon} ${esc(e.key)}</p><p><b>Rivalry:</b> 🔥 ${st.m.riv}/10 · <b>Fun:</b> ⭐ ${st.m.fun}/10</p></div>`,
      `<div class="write">
         <label for="w_fix">✏️ ${PROMPT.label}</label>
         <p class="bank"><span>📏 conformity</span><span>🪙 in-group / out-group</span><span>🙋 groupthink</span><span>🪢 superordinate goal</span></p>
         <p class="stem">Starter: ${esc(PROMPT.stem)}</p>
         <button type="button" class="mini" id="useStarter">Use the starter</button>
         <textarea id="w_fix" rows="4" placeholder="Type your advice…">${esc(st.writing || "")}</textarea>
         <p class="src">Go deeper: name a real study and what it found.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "File report + turn in ▶"}</button>
         <p id="sendMsg" class="msg" role="status" aria-live="polite">${sent ? "✓ Turned in. You can fix your report and turn it in again." : ""}</p>
       </div>`);
    const box = $("w_fix");
    box.addEventListener("input", () => { st.writing = box.value; save(); });
    $("useStarter").onclick = () => { if (!box.value.trim()) { box.value = PROMPT.stem; st.writing = box.value; save(); } box.focus(); const i = box.value.indexOf("___"); if (i >= 0) box.setSelectionRange(i, i + 3); };
    $("sendBtn").onclick = () => send(e);
  }

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  async function send(e) {
    const msg = $("sendMsg"), box = $("w_fix");
    const v = (box.value || "").trim();
    const sayBad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: PROMPT.stem, source: "from today" });
      if (junk) { msg.textContent = junk; msg.className = "msg"; return; }
    }
    const testT = isT();   // Test T. (teacher) skips the writing rules
    if (!testT && v.length < PROMPT.min) return sayBad("Write a little more (1–2 full sentences).");
    if (!testT && /_{2,}/.test(v)) return sayBad("Fill in the blanks (___) with your own words.");
    const stemWords = new Set(plain(PROMPT.stem).match(/[\p{L}']+/gu) || []);
    const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (!testT && freshWords.size < PROMPT.newWords) return sayBad("Add more of your own ideas. Use details from camp week.");
    if (!testT && PROMPT.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return sayBad(PROMPT.mustMsg);
    if (typeof window.classTurnIn !== "function") return sayBad("Turn-in isn't working right now. Keep this page open and tell your teacher.");

    const answers = { "Standard": STANDARD };
    const right = CHECKS.filter(c => !st.wrong[c.id]).length;
    answers["First-try correct"] = right + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort((a, b) => parseFloat(a.split(".")[1]) - parseFloat(b.split(".")[1])).map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECKS.forEach(c => {
      const w = st.wrong[c.id];
      const ans = c.type === "sort" ? c.bins.map(b => b.t + " = " + (c.tiles.find(t => t.bin === b.id) || {}).t).join(" · ") : c.options[0];
      answers[c.short] = ans + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    const ls = lineStats();
    answers["Choice · Line test (group was wrong 2 times)"] = "Stood alone " + ls.stood + " of 2 · went with the group " + ls.went + " of 2 (picked " + st.line.join(", ") + ")";
    STEPS.forEach(s => { if (s.type === "draft" && st.picks[s.id]) answers["Choice · " + s.short] = st.picks[s.id].map(p => (s.cards.find(c => c.id === p) || {}).title).join(" + "); });
    answers["Writing: " + PROMPT.short] = v;
    answers["Ending"] = e.key;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Camp meters at the end"] = "Rivalry " + st.m.riv + "/10 · Fun " + st.m.fun + "/10 · Voice " + st.m.voice + "/3";

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
    if (step.type === "line") return lineStep(step);
    if (step.type === "flip") return flipStep(step);
    if (step.type === "draft") return draft(step);
    if (step.type === "check") return check(step);
    if (step.type === "sort") return sortStep(step);
    if (step.type === "write") return writeStep(step);
    return finale(step);
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

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current one.
  try {
    // Answer one screen the way a student could (used by solve, and to fill skipped screens).
    const tFill = (s, rerender) => {
      if (s.type === "line") {
        while (st.line.length < ROUNDS.length) { const R = ROUNDS[st.line.length]; st.line.push(R.right); if (R.group !== R.right) applyFx({ voice: 1 }); }
      } else if (s.type === "flip") {
        if (!st.order || st.order.length !== 12) st.order = shuffle(["W", "W", "W", "W", "W", "W", "F", "F", "F", "F", "F", "F"]);
        st.teams = st.order.slice(); doEntryFx(s, { riv: 1, fun: 1 });
      } else if (s.type === "draft") {
        if (s.entry && !st.applied[s.id]) { st.applied[s.id] = true; applyFx(s.entry); }
        const got = st.picks[s.id] || [];
        s.cards.forEach(c => {
          if (got.length >= s.picks || got.includes(c.id) || !needMet(c)) return;
          got.push(c.id); applyFx(c.fx);
          if (s.id === "fri" && c.id === "rope") st.mixed = true;
          if (s.id === "tue" && c.id === "hunt" && st.m.riv <= 2) st.mixed = true;
        });
        st.picks[s.id] = got;
      } else if (s.type === "sort") {
        s.tiles.forEach(t => { st.placed[t.id] = t.bin; }); st.done[s.id] = true;
      } else if (s.type === "check") st.done[s.id] = true;
      st.lockUntil = 0; save(); if (rerender) render();
    };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => STEPS[i].short || STEPS[i].kicker,
      go: i => {
        if (!st.name) st.name = "Test T.";
        // Unplayed decisions before this screen get the first choice so later screens have data.
        STEPS.slice(0, i).forEach(s => { if (["line", "flip", "draft"].includes(s.type)) tFill(s, false); });
        st.step = i; st.lockUntil = 0; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => { const s = STEPS[Math.min(st.step, TOTAL - 1)]; if (s && st.step >= 0) tFill(s, true); }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
