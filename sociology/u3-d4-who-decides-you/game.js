// =====================================================================
//  MIRROR WEEK  (Sociology Unit 3 · Day 4 · SS.9-12.Soc.10)
//  Jalen (made up), 16, makes beats. 5 days to his first open mic.
//  Each day you spend his attention on "mirrors" (likes, his real stats, Coach,
//  his sister's pretend play, a hater account). Mirrors move 4 meters:
//  Self-image, Feed pressure (the rival's power), Beat, Crew.
//  Thursday you split 3 chips between his two voices ("I" and "Me").
//  Friday's open mic ends 4 ways, with a "Caused by" trail.
//  6 in-world evidence checks (all Soc.10), 6 real decisions, 1 writing answer.
//  Turn-in via shared/turnin.js (same assignmentId as the old Mirror Week).
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u3-d4-who-decides-you-v2";
  const ASSIGNMENT_ID = "soc-u3-d4-who-decides-you";
  const TITLE = "Sociology · Unit 3 · Day 4 · Mirror Week";
  const STANDARD = "SS.9-12.Soc.10";
  const STD_SHORT = "Soc.10";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;      // seconds locked after a wrong answer
  const TYPING = 1600; // ms of "Jalen is typing…" before replies show
  const MAXV = { self: 10, press: 10, beat: 5, crew: 3 };
  const ICON = { self: "🪞", press: "📱", beat: "🎧", crew: "🤝" };
  const GOOD_UP = { self: true, press: false, beat: true, crew: true };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const wait = ms => new Promise(r => setTimeout(r, ms));

  // ---------------- Little art helpers ----------------
  const WAVE = `<div class="wave" aria-hidden="true">${[30,55,80,45,95,60,35,70,100,50,40,85,65,30,75,55,90,45].map(h => `<i style="height:${h}%"></i>`).join("")}</div>`;
  const phone = (inner, cls) => `<div class="phone ${cls || ""}"><div class="notch" aria-hidden="true"></div><div class="screen">${inner}</div></div>`;
  const post = (who, when, body, meta, hater) => `<div class="post${hater ? " hater" : ""}"><div class="ptop"><span class="av${hater ? " rt" : ""}" aria-hidden="true">${hater ? "💀" : "🎧"}</span><b>${who}</b><span>${when}</span></div>${body}${meta ? `<div class="pmeta">${meta}</div>` : ""}</div>`;
  const tx = (lines, when) => `${when ? `<div class="when">${when}</div>` : ""}${lines.map(l => `<div class="tx">${l}</div>`).join("")}`;
  const lt = (letter, text) => `<span class="lt">${letter}</span>${text}`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div>${html}</div></div>`;
  const src = t => `<p class="src">${t}</p>`;

  // ---------------- Writing (text Jalen after the show) ----------------
  const PROMPT = {
    id: "shape", short: "How others shaped Jalen's self",
    label: "Text back: who shaped his self-image, and why?",
    stem: "___ changed how you see yourself because ___. That's the ___.",
    min: 70, newWords: 6,
    mustAll: [
      ["looking", "glass", "mirror", "cooley", "mead", "role", "generalized", "general", "judg", "imagin", "impulse", "spontan", "expect", "society", "game stage", "play stage", "\"i\"", "\"me\"", "“i”", "“me”", "voice"],
      ["likes", "liked", "post", "coach", "hustle", "kiara", "sister", "realtalk", "hater", "comment", "open mic", "mic", "chat", "team", "crowd", "speaker", "stage", "beat", "defense", "practice", "host", "account", "mom", "stats", "trash", "dumb", "proud", "nervous", "film", "seat", "rules"],
      ["because", "since", "so ", "shows", "which", "that's", "that is", "means", "this is", "made"]
    ],
    mustMsg: "Name a moment (like Coach or the hater), one idea from the purple chips, and say why with “because.”"
  };

  // ---------------- The week ----------------
  // types: draft (spend attention on cards) · check (evidence check) · voices (split chips) · finale
  const DAYS = ["MON", "TUE", "WED", "THU", "FRI"];
  const STEPS = [
    { id: "mon-draft", type: "draft", day: 0, kicker: "Monday · 4 days to the mic", picks: 2, short: "Monday mirrors",
      scene: () => phone(post("@jalen.makes.beats", "1:47 a.m.", `<p>blue hour 🎧</p>${WAVE}`, "<span>♥ 2</span><span>💬 0</span>") +
        tx(["bro. 2 likes. one is my mom 💀", "maybe i should skip friday"], "Mon 7:52 a.m.")),
      ask: "Spend ⚡2. What does Jalen look at?",
      cards: [
        { id: "group", icon: "💬", title: "Group chat", line: "Friends hype fast.", fx: { self: 1, press: 2, crew: 1 }, result: "Six 🔥 fast. Now he can't stop refreshing.", cause: "Mon: group chat hype", tag: "group chat" },
        { id: "repost", icon: "🔁", title: "Repost at 4 p.m.", line: "More eyes, more likes.", fx: { self: 2, press: 2 }, result: "23 likes. He checks his phone 40 times.", cause: "Mon: reposted for likes", tag: "repost" },
        { id: "stats", icon: "📊", title: "His real stats", line: "He never checked these.", fx: { self: 2, press: -1 }, hidden: true,
          result: `<span class="statrow"><span><b>9</b> saw it</span><span><b>41/45</b> sec listened</span><span><b>0</b> mean comments</span></span>“wait… they listened??”`, cause: "Mon: checked his real stats", tag: "real stats" },
        { id: "beats", icon: "🎹", title: "No phone. Beat #2.", line: "Skip every mirror today.", fx: { beat: 1, self: -1 }, result: "New beat. But he still hears “trash.”", cause: "Mon: no mirrors, just beats", tag: "no mirrors" }
      ] },

    { id: "c1", type: "check", day: 0, kicker: "Monday · Decode his head", short: "Cooley's 3 steps (Jalen's texts)", stamp: "LOOKING-GLASS SELF",
      scene: () => phone(tx([lt("A", "i feel dumb for posting"), lt("B", "ppl saw my bedroom beat"), lt("C", "they def think it's trash")])),
      ask: `Put his texts in mirror order.<div class="trace lbl"><span>👀 Look</span><i>→</i><span>⚖️ Judge</span><i>→</i><span>💗 Feel</span></div>`,
      options: ["B → C → A", "A → B → C", "C → A → B", "B → A → C"],
      hint: "“Feel” is a feeling. “Look” is what people saw.",
      reveal: `<p><b>Looking-glass self</b> (Cooley): we judge ourselves by how we imagine others judge us.</p>` },

    { id: "c2", type: "check", day: 1, kicker: "Tuesday · 3 days to the mic", short: "Pew 2018: many teens feel like-pressure", stamp: "REAL DATA",
      scene: () => phone(tx(["am i weird for caring about likes? 😬"]) +
        `<div class="data" role="img" aria-label="Survey of U.S. teens: 43% feel pressure to post only what looks good, 37% feel pressure to post for likes, 81% feel closer to friends."><p class="dlab">📊 U.S. teens, 13–17</p><div class="bars" aria-hidden="true">${[[43, "😬 pressure to look good"], [37, "❤️ pressure to get likes"], [81, "🤝 closer to friends"]].map(([n, l], i) => `<div class="brow${i === 2 ? " up" : ""}"><span class="bl">${l}</span><span class="btrack"><span class="bfill" style="width:${n}%"><b>${n}%</b></span></span></div>`).join("")}</div>${src("Pew Research Center, “Teens' Social Media Habits and Experiences,” Nov. 2018 (743 teens).")}</div>`),
      ask: "Reply with the data.",
      options: ["nah, tons of teens feel it", "yeah, almost no teens care", "yeah, it only makes teens sad", "nah, only adults feel that"],
      hint: "Look at 43% and 37%. Rare, or common?",
      reveal: `<p><b>Likes</b> = a looking-glass self with a scoreboard.</p>` },

    { id: "tue-night", type: "draft", day: 1, kicker: "Tuesday night", picks: 1, short: "Tuesday night: phone or beats",
      scene: () => phone(tx(["can't stop thinking about friday"], "Tue 9:40 p.m.")),
      ask: "Pick one. Both cost something.",
      cards: [
        { id: "scroll", icon: "📱", title: "Scroll for hype", line: "Feels good… for now.", fx: { self: 1, press: 2 }, result: "Nice comments. Up till 2 a.m. hunting more.", cause: "Tue: scrolled for hype" },
        { id: "drawer", icon: "🗄️", title: "Phone in a drawer", line: "Cook the set. Alone.", fx: { beat: 2, self: -1 }, result: "Tighter set. But the quiet lets “trash” in.", cause: "Tue: phone in a drawer" }
      ] },

    { id: "wed-team", type: "draft", day: 2, kicker: "Wednesday · 2 days to the mic", picks: 1, short: "Wednesday: tell the team?",
      entry: { self: 1 }, entryStamp: "NEW MIRROR",
      scene: () => `<div class="gym"><div class="hoop" aria-hidden="true">🏀</div><div class="say coach"><span class="who-s">📣 Coach Haley</span>“JALEN! That's HUSTLE!”</div><div class="floor" aria-hidden="true"></div></div>` +
        phone(tx(["me?? a hustle guy?", "tell the team about friday? they might roast me"]), "small"),
      ask: "Coach is a new mirror. Now what?",
      cards: [
        { id: "team", icon: "📣", title: "Tell the team", line: "More fans. More judges.", fx: { crew: 2, press: 1 }, result: "Three teammates are coming. One sends a 🤡.", cause: "Wed: told the whole team" },
        { id: "quiet", icon: "🤫", title: "Keep it quiet", line: "Less pressure. More guessing.", fx: { self: -1, press: -1 }, result: "No roast. He just guesses what they'd say.", cause: "Wed: kept it a secret" },
        { id: "coach", icon: "🧢", title: "Tell Coach only", line: "Big support. Big expectations.", fx: { self: 1, crew: 1, press: 1 }, result: "Coach: “Same hustle Friday.” Now he's scared to let her down.", cause: "Wed: told Coach only" }
      ] },

    { id: "c3", type: "check", day: 2, kicker: "Wednesday · 8:30 p.m.", short: "Kiara's pretend play = role-taking", stamp: "ROLE-TAKING",
      scene: () => `<div class="living"><p class="cap">Little sis Kiara plays open mic.</p><div class="roles"><div class="role r1"><span>🎤</span><b class="lbl">as host</b>“DJ JALEN!!”</div><div class="role r2"><span>🧑🏾</span><b class="lbl">as Jalen</b>“um… hi.”</div><div class="role r3"><span>👏</span><b class="lbl">as crowd</b>👏👏👏</div></div><div class="plush" aria-hidden="true">🧸🐰🦖🛋️</div></div>`,
      ask: "Jalen: “why all 3 parts?”",
      options: ["she's seeing through others' eyes", "she's memorizing open mic rules", "she's doing whatever she wants", "she's copying words she doesn't get"],
      hint: "Each time she switches, whose view is she using?",
      reveal: `<p><b>Role-taking</b>: seeing things from someone else's view.</p><p class="sub">🧸 One role at a time = <b>play stage</b></p>` },

    { id: "wed-seats", type: "draft", day: 2, kicker: "Wednesday · Take a seat", picks: 2, short: "Wednesday: seats Jalen imagined",
      scene: () => `<div class="room" aria-hidden="true"><div class="spot"></div><div class="mic">🎤</div><div class="stageline">STAGE</div><div class="seatrow"><span>🪑</span><span>🪑</span><span>🪑</span><span>🪑</span><span>🪑</span></div></div>`,
      ask: "Spend ⚡2: see it from their seat.",
      cards: [
        { id: "host", icon: "🎤", title: "Host's seat", line: "What does the host need?", fx: { beat: 1 }, result: "“Under 3 minutes.” He cuts the intro.", cause: "Wed: took the host's view", tag: "host" },
        { id: "back", icon: "👀", title: "Back row", line: "What does a stranger want?", fx: { beat: 2, press: 1 }, result: "“Drop the beat fast.” Phones are out back here.", cause: "Wed: took the back row's view", tag: "back row" },
        { id: "mates", icon: "🏀", title: "Teammates' row", line: "What do friends want?", fx: { self: 1, crew: 1 }, result: "“Play the hustle one!” He samples Coach's yell.", cause: "Wed: took his teammates' view", tag: "teammates" }
      ],
      after: `<p><b>Game stage</b> (Mead): seeing many roles at once, like a whole team.</p>` },

    { id: "c4", type: "check", day: 3, kicker: "Thursday · 1 day to the mic", short: "Open mic rules = generalized other", stamp: "GENERALIZED OTHER",
      scene: () => phone(tx(["never been to an open mic", "but i know: clap. don't talk. thank the host.", "how??"])),
      ask: "Reply to Jalen.",
      options: ["you picked up what people expect", "you copied one person you trust", "you were born knowing how to act", "you're just doing what you feel"],
      hint: "Did one person teach him that, or everybody?",
      reveal: `<p><b>Generalized other</b>: your sense of what society in general expects.</p>` },

    { id: "c5", type: "check", day: 3, kicker: "Thursday · 4:02 p.m.", short: "@cr.realtalk is a warped mirror (clues)", stamp: "WARPED MIRROR",
      entry: { self: -2, press: 1 }, entryStamp: "NEW COMMENT", clues: true, onRight: { self: 1, press: -1 },
      scene: () => phone(post("@cr.realtalk", "", `<p>bedroom producer thinks he's ready 💀</p>`, "", true)),
      ask: "Tap the 3 clues.",
      clueList: [
        { icon: "📅", text: "Made 3 days ago" },
        { icon: "🖼️", text: "0 posts" },
        { icon: "💀", text: "Same 💀 on 6 kids' videos" }
      ],
      askAfter: "What kind of mirror?",
      options: ["one stranger's warped view", "what most kids really think", "someone who knows him best", "what Coach secretly thinks"],
      hint: "Look at the 3 clues. Is it really judging Jalen?",
      reveal: `<p><b>Warped mirror</b>: one stranger isn't “everyone.”</p>` },

    { id: "thu-voices", type: "voices", day: 3, kicker: "Thursday · 9:14 p.m.", short: "Thursday: the two voices",
      ask: "Split 3 chips.",
      v1: "cook him RIGHT NOW",
      v2: "mom + Coach see my posts.",
      outcomes: {
        3: { title: "Cook him in the comments", fx: { self: 1, press: 3 }, result: "200 views. Now it's beef.", cause: "Thu: all-out clap-back" },
        2: { title: "Clap back with a beat", fx: { beat: 1, press: 2 }, result: "Posts a beat. Hater posts again.", cause: "Thu: answered with a beat" },
        1: { title: "Screenshot + report it", fx: { self: 1, press: 1 }, result: "Reported. Still up. He rereads it.", cause: "Thu: reported it, stayed calm" },
        0: { title: "Mute it. Phone off.", fx: { press: -2, self: -1, crew: -1 }, result: "Quiet. Misses the team's texts too.", cause: "Thu: muted everything" }
      },
      reveal: `<p><b>“I”</b> = right-now you. <b>“Me”</b> = what others expect.</p>` },

    { id: "c6", type: "check", day: 4, kicker: "Friday · Open mic night", short: "Friday: the “Me” = others' expectations", stamp: "VOICES NAMED",
      scene: () => `<div class="stage"><div class="spot"></div><div class="mic">🎤</div><div class="speaker" aria-hidden="true">🔈<b>✕</b></div><div class="backphone" aria-hidden="true">📱</div><p class="cap">The speaker cuts out. Someone in back films.</p></div>` +
        `<div class="twov"><div class="v v1"><span>🔥 Voice 1</span>Yell “stop filming!” Walk off.</div><div class="v v2"><span>🧭 Voice 2</span>Host said the show goes on.</div></div>`,
      ask: "Which voice is the “Me”?",
      options: ["🧭 Voice 2: what others expect", "🔥 Voice 1: what others expect", "🧭 Voice 2: a right-now urge", "🔥 Voice 1: born with it"],
      hint: "The “Me” is the social part. Who taught it to him?",
      reveal: "" },

    { id: "fri-move", type: "draft", day: 4, kicker: "Friday · 3 seconds of silence", picks: 1, short: "Friday: Jalen's move",
      scene: () => `<div class="stage"><div class="spot"></div><div class="mic">🎤</div><div class="speaker" aria-hidden="true">🔈<b>✕</b></div><div class="backphone" aria-hidden="true">📱</div><p class="cap">Silence. Every eye is on Jalen.</p></div>`,
      ask: "What does Jalen do?",
      cards: [
        { id: "i", icon: "🔥", title: "“Stop filming!”", line: "All “I.” Walk off.", fx: {}, result: "He drops the mic and walks.", cause: "Fri: all “I” — walked off" },
        { id: "me", icon: "🧭", title: "Keep going", line: "All “Me.” Play it safe.", fx: {}, result: "He waits it out and starts again.", cause: "Fri: all “Me” — kept going" },
        { id: "both", icon: "🔥🧭", title: "Beatbox the gap", line: "Both voices at once.", fx: {}, need: { self: 6, beat: 3 }, under: { press: 8 }, result: "He beatboxes right into the silence.", cause: "Fri: both voices — beatboxed it" }
      ] },

    { id: "finale", type: "finale", day: 4, kicker: "Friday night" },
    { id: "write", type: "write", day: 4, kicker: "Friday night · Text Jalen back" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");

  // ---------------- State ----------------
  const START = { self: 3, press: 3, beat: 1, crew: 0 };
  const fresh = () => ({ name: "", step: -1, m: Object.assign({}, START), picks: {}, wrong: {}, done: {}, clues: {}, applied: {}, chips: 1, penalty: 0, writing: "", turnedIn: false });
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
  const faceFor = v => v <= 1 ? "😞" : v <= 3 ? "😕" : v <= 5 ? "😐" : v <= 7 ? "🙂" : v <= 8 ? "😄" : "😎";
  const moodFor = v => v <= 3 ? "😴" : v <= 5 ? "😏" : v <= 7 ? "😈" : "🔥";
  function hud() {
    const h = $("hud");
    h.hidden = st.step < 0;
    if (st.step < 0) return;
    const m = st.m;
    $("selfFill").style.width = (m.self * 10) + "%"; $("selfNum").textContent = m.self + "/10";
    $("pressFill").style.width = (m.press * 10) + "%"; $("pressNum").textContent = m.press + "/10";
    $("beatPips").innerHTML = Array.from({ length: MAXV.beat }, (_, i) => `<i class="${i < m.beat ? "on" : ""}"></i>`).join("");
    $("crewPips").innerHTML = Array.from({ length: MAXV.crew }, (_, i) => `<i class="${i < m.crew ? "on" : ""}"></i>`).join("");
    $("jFace").textContent = faceFor(m.self);
    $("rMood").textContent = moodFor(m.press);
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("days").innerHTML = DAYS.map((d, i) => `<span class="${i < step.day ? "past" : i === step.day ? "now" : ""}">${i === 4 ? "🎤 " : ""}${d}</span>`).join("") + `<span class="goalchip" title="To unlock the best Friday move"><span class="gl">🎯 Friday: 🪞6+ · 🎧3+ · 📱 under 8</span><span class="gs">🎯 Fri: 🪞6+ 🎧3+ 📱&lt;8</span></span><span class="stepn">Step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}</span>`;
  }
  const meterEl = { self: "mSelf", press: "mPress", beat: "mBeat", crew: "mCrew" };
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
    Object.keys(real).forEach((k, n) => {
      const el = $(meterEl[k]); if (!el) return;
      const good = (real[k] > 0) === GOOD_UP[k];
      const f = document.createElement("span");
      f.className = "float " + (good ? "good" : "bad");
      f.textContent = (real[k] > 0 ? "+" : "−") + Math.abs(real[k]);
      f.style.animationDelay = (n * 120) + "ms";
      el.appendChild(f); setTimeout(() => f.remove(), 1700);
      el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
      if (k === "press" && real[k] > 0) { const r = $("rivalBox"); r.classList.remove("shake"); void r.offsetWidth; r.classList.add("shake"); }
    });
  }
  function fxChips(fx, hidden) {
    if (hidden) return `<span class="fx q">🪞 ?</span><span class="fx q">📱 ?</span>`;
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
  function nextBtn(label) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn";
    b.textContent = label || "Next ▶";
    b.onclick = () => { st.step++; save(); render(); window.scrollTo(0, 0); };
    return b;
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "finale") return "See how Friday ends ▶";
    if (nx.day !== step.day) return "Next day: " + ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][nx.day] + " ▶";
    return "Next ▶";
  }

  // ---- Title ----
  function title() {
    document.body.classList.add("on-title");
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title">
      <div class="tart" aria-hidden="true"><span class="big">🧑🏾‍🎤</span><span class="b1">♥ 2</span><span class="b2">💀</span><span class="b3">🎤</span><span class="b4">🪞</span></div>
      <div class="tcopy">
        <p class="tk">Sociology · Unit 3 · Day 4</p>
        <h1>Mirror Week</h1>
        <p class="hook">2 likes. 5 days. 1 open mic.</p>
        <p class="tline">Jalen, 16, makes beats.</p>
        <ul class="how"><li><span>🪞</span>Pick the mirrors he looks into</li><li><span>🔥🧭</span>Balance his two voices</li><li><span>🎤</span>Friday ends 4 ways</li></ul>
        <p class="chips"><span>⏱️ 25 min</span><span>🔍 6 checks</span><span>✏️ 1 short answer</span></p>
        <p class="goal">🎯 Goal: explain how other people's reactions shape who we think we are.</p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Open Jalen's phone ▶</button></div>
        <p id="introMsg" class="msg" role="status"></p>
        <p class="src">Jalen and his story are made up. The ideas and the survey are real.</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("nameBox").focus(); return; }
      // This student is now on this Chromebook: clear any other student's saved work first.
      try { if (window.classClaimDevice) window.classClaimDevice(fixed); } catch (e) {}
      const keepName = fixed; st = fresh(); st.name = keepName; st.step = 0;
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

  // ---- Draft: spend attention on cards ----
  function needMet(c) { return (!c.need || Object.keys(c.need).every(k => st.m[k] >= c.need[k])) && (!c.under || Object.keys(c.under).every(k => st.m[k] < c.under[k])); }
  function draft(step) {
    const entryReal = doEntry(step);
    const picked = st.picks[step.id] || [];
    const left = step.picks - picked.length;
    const tokens = step.picks > 1 ? `<div class="tokens" aria-label="${left} attention left">${Array.from({ length: step.picks }, (_, i) => `<span class="${i < left ? "on" : ""}">⚡</span>`).join("")}</div>` : "";
    shell(step, step.scene(), `<div class="askrow"><p class="ask">${step.ask}</p>${tokens}</div><div class="cards n${step.cards.length}" id="cards"></div><div id="after"></div>`);
    const box = $("cards");
    step.cards.forEach(c => {
      const isPicked = picked.includes(c.id);
      const ok = needMet(c);
      const b = document.createElement("button"); b.type = "button";
      b.className = "gcard" + (isPicked ? " flipped" : "") + (!ok ? " locked" : "") + (left === 0 && !isPicked ? " spent" : "");
      b.dataset.id = c.id;
      const front = `<span class="ci">${c.icon}</span><span class="ct">${c.title}</span><span class="cl">${c.line}</span><span class="cfx">${ok ? fxChips(c.fx, c.hidden) : `<span class="fx lock">🔒 Needs ${Object.keys(c.need).map(k => ICON[k] + c.need[k] + "+").concat(Object.keys(c.under || {}).map(k => ICON[k] + " under " + c.under[k])).join(" · ")}</span>`}</span>`;
      const back = `<span class="ci small">${c.icon}</span><span class="cr">${c.result}</span><span class="cfx">${fxChips(c.fx, false)}</span>`;
      b.innerHTML = `<span class="inner"><span class="face front">${front}</span><span class="face back">${back}</span></span>`;
      if (isPicked) b.setAttribute("aria-label", c.title + ": " + c.result.replace(/<[^>]+>/g, " "));
      b.disabled = isPicked || !ok || left === 0;
      b.onclick = () => {
        if ((st.picks[step.id] || []).length >= step.picks) return;
        st.picks[step.id] = (st.picks[step.id] || []).concat(c.id);
        const real = applyFx(c.fx); save();
        b.classList.add("flipped"); b.disabled = true;
        animateFx(real);
        const nowLeft = step.picks - st.picks[step.id].length;
        document.querySelectorAll(".tokens span").forEach((t, i) => t.classList.toggle("on", i < nowLeft));
        if (nowLeft === 0) {
          box.querySelectorAll(".gcard:not(.flipped)").forEach(x => { x.disabled = true; x.classList.add("spent"); });
          setTimeout(() => finishDraft(step), 900);
        }
      };
      box.appendChild(b);
    });
    if (entryReal) { animateFx(entryReal); stamp($("scene"), step.entryStamp); }
    if (left === 0) finishDraft(step, true);
  }
  function finishDraft(step, quiet) {
    const a = $("after"); if (!a || a.dataset.done) return; a.dataset.done = "1";
    if (step.id === "fri-move") { a.appendChild(nextBtn(nextLabel(step))); return; }
    if (step.after) a.insertAdjacentHTML("beforeend", reveal(step.after));
    a.appendChild(nextBtn(nextLabel(step)));
    if (!quiet) { const n = $("nextBtn"); if (n && n.scrollIntoView) n.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  }

  // ---- Check: evidence check woven into the scene ----
  let locked = false;
  function check(step) {
    const entryReal = doEntry(step);
    const done = !!st.done[step.id];
    const clues = st.clues[step.id] || [];
    const allClues = !step.clues || clues.length === step.clueList.length;
    let clueHtml = "";
    if (step.clues) clueHtml = `<div class="clues">${step.clueList.map((c, i) => `<button type="button" class="clue${clues.includes(i) ? " open" : ""}" data-i="${i}"><span class="cbk">❓</span><span class="cfr"><span>${c.icon}</span>${c.text}</span></button>`).join("")}</div>`;
    shell(step, step.scene(), `<p class="ask">${step.ask}</p>${clueHtml}<div id="qzone"></div><div id="after"></div>`);
    if (entryReal) { animateFx(entryReal); stamp($("scene"), step.entryStamp, true); }
    if (step.clues) {
      document.querySelectorAll(".clue").forEach(b => {
        b.onclick = () => {
          const i = +b.dataset.i; const list = st.clues[step.id] || [];
          if (list.includes(i)) return;
          st.clues[step.id] = list.concat(i); save(); b.classList.add("open");
          if (st.clues[step.id].length === step.clueList.length) setTimeout(() => replies(step), 500);
        };
      });
    }
    if (done) { solved(step, true); return; }
    if (allClues) replies(step);
  }
  async function replies(step) {
    const z = $("qzone"); if (!z || z.dataset.on) return; z.dataset.on = "1";
    z.innerHTML = `${step.askAfter ? `<p class="ask">${step.askAfter}</p>` : ""}<div class="typing"><span></span><span></span><span></span></div>`;
    await wait((window.classIsTestT && window.classIsTestT()) ? 0 : TYPING);   // Test T.: no typing pause
    if (!$("qzone") || $("qzone") !== z) return;
    z.innerHTML = `${step.askAfter ? `<p class="ask">${step.askAfter}</p>` : ""}<div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p>`;
    draw(step);
    const rest = Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000);
    if (rest > 0) runLock(step, Math.min(rest, LOCK));
  }
  function draw(step) {
    const area = $("replies"); if (!area) return;
    const before = [...area.querySelectorAll(".reply")].map(x => x.textContent).join("|");
    let order = shuffle(step.options.map((t, n) => ({ t, n })));
    // After a wrong try the replies always land in a new order.
    for (let k = 0; k < 8 && before && order.map(o => o.t).join("|") === before; k++) order = shuffle(order);
    area.replaceChildren();
    order.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "reply"; b.textContent = o.t;
      b.onclick = () => pickReply(step, o, b);
      area.appendChild(b);
    });
  }
  function pickReply(step, o, btn) {
    if (locked) return;
    const msg = $("qmsg");
    if (o.n === 0) {
      st.done[step.id] = true;
      try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
      let real = {};
      if (step.onRight) real = applyFx(step.onRight);
      save();
      btn.classList.add("right");
      setTimeout(() => { solved(step, false); animateFx(real); }, 450);
      return;
    }
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    // Guessing has a cost in the story: the feed gets louder (at most +2 for the whole game).
    let real = {};
    if (st.penalty < 2) { st.penalty++; real = applyFx({ press: 1 }); }
    save(); animateFx(real);
    btn.classList.add("wrong");
    const lockS = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;   // Test T.: no wait
    st.lockUntil = Date.now() + lockS * 1000; save();
    runLock(step, lockS);
  }
  function runLock(step, secs) {
    const msg = $("qmsg");
    locked = true;
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    let left = secs;
    const tick = () => {
      if (!$("qmsg")) { locked = false; return; }
      msg.innerHTML = `💭 Not quite. ${esc(step.hint)} <span class="cd">${left}</span>`;
      if (left-- <= 0) { locked = false; msg.innerHTML = `💭 ${esc(step.hint)} Try again.`; draw(step); return; }
      setTimeout(tick, 1000);
    };
    tick();
  }
  function solved(step, quiet) {
    const z = $("qzone"); if (!z) return;
    const right = step.options[0];
    z.innerHTML = `${step.askAfter ? `<p class="ask">${step.askAfter}</p>` : ""}<div class="sent"><span>${esc(right)}</span><small>✓ Sent</small></div>`;
    if (step.clues) document.querySelectorAll(".clue").forEach(b => { b.classList.add("open"); b.disabled = true; });
    const a = $("after");
    if (step.reveal) a.insertAdjacentHTML("beforeend", reveal(step.reveal));
    a.appendChild(nextBtn(nextLabel(step)));
    if (!quiet) {
      stamp($("scene"), step.stamp);
      const n = $("nextBtn"); if (n && n.scrollIntoView) n.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  // ---- Voices: split 3 chips between the "I" and the "Me" ----
  function voices(step) {
    const done = st.picks[step.id] != null;
    const iChips = done ? st.picks[step.id] : (st.chips == null ? 1 : st.chips);
    shell(step,
      phone(post("@cr.realtalk", "posted again", `<p>bet he chokes 💀</p>`, "", true)),
      `<p class="ask">${step.ask}</p>
       <div class="scale" id="scale">
         <div class="vbox v1"><span class="vlab">🔥 Voice 1</span><p>“${step.v1}”</p><div class="chiprow" id="iRow"></div></div>
         <div class="vmid"><button type="button" class="mv" id="toI" aria-label="Give a chip to Voice 1">◀</button><span class="beam" id="beam"></span><button type="button" class="mv" id="toMe" aria-label="Give a chip to Voice 2">▶</button></div>
         <div class="vbox v2"><span class="vlab">🧭 Voice 2</span><p>“${step.v2}”</p><div class="chiprow" id="meRow"></div></div>
       </div>
       <div class="preview" id="preview"></div><div id="after"></div>`);
    function paint(n) {
      $("iRow").innerHTML = "🔴".repeat(n) || "<i>no chips</i>";
      $("meRow").innerHTML = "🔵".repeat(3 - n) || "<i>no chips</i>";
      $("beam").style.transform = `rotate(${(n - 1.5) * -8}deg)`;
      const o = step.outcomes[n];
      $("preview").innerHTML = `<div class="gcard wide${done ? " flipped" : ""}"><span class="inner"><span class="face front"><span class="ci">${"🔥".repeat(n)}${"🧭".repeat(3 - n)}</span><span class="ct">${o.title}</span><span class="cfx">${fxChips(o.fx)}</span></span><span class="face back"><span class="ct">${o.title}</span><span class="cr">${o.result}</span><span class="cfx">${fxChips(o.fx)}</span></span></span></div>` +
        (done ? "" : `<button type="button" class="go" id="lockBtn">Lock it in 🔒</button>`);
      if (!done) $("lockBtn").onclick = () => {
        st.picks[step.id] = n; const real = applyFx(o.fx); save();
        $("toI").disabled = $("toMe").disabled = true;
        $("lockBtn").remove();
        $("preview").querySelector(".gcard").classList.add("flipped");
        animateFx(real);
        setTimeout(() => { const a = $("after"); a.insertAdjacentHTML("beforeend", reveal(step.reveal)); a.appendChild(nextBtn(nextLabel(step))); stamp($("scene"), "“I” vs. “ME”"); $("nextBtn").scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 900);
      };
    }
    let n = iChips;
    paint(n);
    $("toI").disabled = $("toMe").disabled = done;
    $("toI").onclick = () => { if (n < 3) { n++; st.chips = n; save(); paint(n); } };
    $("toMe").onclick = () => { if (n > 0) { n--; st.chips = n; save(); paint(n); } };
    if (done) { const a = $("after"); a.insertAdjacentHTML("beforeend", reveal(step.reveal)); a.appendChild(nextBtn(nextLabel(step))); }
  }

  // ---- Endings ----
  function ending() {
    const move = (st.picks["fri-move"] || [])[0];
    const m = st.m;
    let e;
    if (move === "both") e = { key: "Run It Back", icon: "🔥🎤", cls: "best", text: "He beatboxes into the silence. The speaker kicks back on, right on the drop. He signs up for next month." };
    else if (move === "i") e = { key: "Maybe December", icon: "🌙", cls: "low", text: "He walks off. Later he texts: “maybe december.” He's still deciding who he is." };
    else if (m.press >= 8) e = { key: "Beef, Not the Beat", icon: "📹", cls: "viral", text: "He finishes. But the back-row clip posts first. The comments are about the beef, not the beat." };
    else e = { key: "Made It Through", icon: "👏", cls: "mid", text: "He waits, then starts again. Real claps. Before he's off stage, he checks his phone." };
    if (m.crew >= 2) e.text += move === "i" ? " His teammates walk out with him." : " His teammates cheer loudest.";
    const causes = [];
    ["mon-draft", "tue-night", "wed-team", "wed-seats"].forEach(id => {
      const s = STEPS.find(x => x.id === id);
      const cs = (st.picks[id] || []).map(p => s.cards.find(x => x.id === p)).filter(Boolean);
      if (cs.length === 1) causes.push(cs[0].cause);
      else if (cs.length > 1) causes.push(cs[0].cause.slice(0, 5) + cs.map(c => c.tag).join(" + ") + (id === "wed-seats" ? " seats" : ""));
    });
    const vs = STEPS.find(x => x.id === "thu-voices");
    if (st.picks["thu-voices"] != null) causes.push(vs.outcomes[st.picks["thu-voices"]].cause);
    const fm = STEPS.find(x => x.id === "fri-move").cards.find(x => x.id === move);
    if (fm) causes.push(fm.cause);
    if (move !== "both") causes.push(m.self >= 6 && m.beat >= 3 && m.press < 8 ? "Fri: picked one voice, not both" : "Fri: beatbox locked (" + (m.self < 6 ? "🪞 under 6" : m.beat < 3 ? "🎧 under 3" : "📱 8+") + ")");
    e.causes = causes;
    return e;
  }

  function finale(step) {
    const e = ending();
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon">${e.icon}</span><h2>${e.key}</h2><p>${e.text}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">🪞 ${st.m.self}/10 · 📱 ${st.m.press}/10 · 🎧 ${st.m.beat}/5 · 🤝 ${st.m.crew}/3</p></div>
       <p class="mean">🪞 Every reaction was a mirror. Together, they built Jalen's self.</p><div id="after"></div>`);
    stamp($("scene"), e.key.toUpperCase(), e.cls === "low" || e.cls === "viral");
    const sp = $("scene").querySelector(".stamp"); if (sp) sp.classList.add("top");
    $("after").appendChild(nextBtn("✏️ Text Jalen back ▶"));
  }

  function writeStep(step) {
    const e = ending();
    const lockedOut = st.turnedIn;
    shell(step, phone(tx(["why'd this week mess with my head? 😮‍💨"], "Fri 11:48 p.m.")),
      `<div class="write">
         <label for="w_shape">✏️ ${PROMPT.label}</label>
         <p class="bank lbl"><span>🪞 looking-glass self</span><span>🎭 role-taking</span><span>🌎 generalized other</span><span>🔥 “I” · 🧭 “Me”</span></p>
         <p class="stem">Starter: ${esc(PROMPT.stem)}</p>
         <button type="button" class="mini" id="useStarter">Use the starter</button>
         <div class="txbox"><textarea id="w_shape" rows="4" placeholder="Type your text to Jalen…">${esc(st.writing || "")}</textarea></div>
         <p class="src">Go deeper: say who did the shaping (family, peers, a coach, or media) and what it caused.</p>
         <button type="button" class="go" id="sendBtn">${lockedOut ? "Turn in again" : "Send + turn in ▶"}</button>
         <p id="sendMsg" class="msg" role="status" aria-live="polite">${lockedOut ? "✓ Turned in. You can fix your text and turn it in again." : ""}</p>
       </div>`);
    const box = $("w_shape");
    box.addEventListener("input", () => { st.writing = box.value; save(); });
    $("useStarter").onclick = () => { if (!box.value.trim()) { box.value = PROMPT.stem; st.writing = box.value; save(); } box.focus(); const i = box.value.indexOf("___"); if (i >= 0) box.setSelectionRange(i, i + 3); };
    $("sendBtn").onclick = () => send(e);
  }

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  async function send(e) {
    const msg = $("sendMsg"), box = $("w_shape");
    const v = (box.value || "").trim();
    const say = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
    const testT = window.classIsTestT && window.classIsTestT();   // Test T. (teacher) skips the writing rules
    if (!testT) {
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: PROMPT.stem, source: "from today" });
      if (junk) { msg.textContent = junk; msg.className = "msg"; return; }
    }
    if (v.length < PROMPT.min) return say("Write a little more (1–2 full sentences).");
    if (/_{2,}/.test(v)) return say("Fill in the blanks (___) with your own words.");
    const stemWords = new Set(plain(PROMPT.stem).match(/[\p{L}']+/gu) || []);
    const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshWords.size < PROMPT.newWords) return say("Add more of your own ideas. Use details from Jalen's week.");
    if (PROMPT.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return say(PROMPT.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") return say("Turn-in isn't working right now. Keep this page open and tell your teacher.");

    const answers = { "Standard": STANDARD };
    const right = CHECKS.filter(c => !st.wrong[c.id]).length;
    answers["First-try correct"] = right + " of " + CHECKS.length;
    answers["First-try by standard"] = STD_SHORT + ": " + right + " of " + CHECKS.length;
    CHECKS.forEach(c => { const w = st.wrong[c.id]; answers[c.short] = c.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    STEPS.forEach(s => {
      if (s.type === "draft" && st.picks[s.id]) answers["Choice · " + s.short] = st.picks[s.id].map(p => (s.cards.find(c => c.id === p) || {}).title).join(" + ");
      if (s.type === "voices" && st.picks[s.id] != null) answers["Choice · " + s.short] = st.picks[s.id] + " chips to the “I”, " + (3 - st.picks[s.id]) + " to the “Me” → " + s.outcomes[st.picks[s.id]].title;
    });
    answers["Writing: " + PROMPT.short] = v;
    answers["Ending"] = e.key;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Jalen's meters at the end"] = "Self-image " + st.m.self + "/10 · Feed pressure " + st.m.press + "/10 · Beat " + st.m.beat + "/5 · Crew " + st.m.crew + "/3";

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
    if (step.type === "draft") return draft(step);
    if (step.type === "check") return check(step);
    if (step.type === "voices") return voices(step);
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
  // The teacher signed in as Test T. can jump to any screen or answer the current check.
  try {
    // Fill a draft step's picks: open cards first, then any (Test T. only).
    const tDraftQuiet = step => {
      const picked = st.picks[step.id] = (st.picks[step.id] || []).slice();
      const pool = step.cards.filter(c => needMet(c)).concat(step.cards.filter(c => !needMet(c)));
      pool.forEach(c => { if (picked.length < step.picks && !picked.includes(c.id)) { picked.push(c.id); applyFx(c.fx); } });
    };
    const tVoicesQuiet = step => { const n = st.chips == null ? 1 : st.chips; st.picks[step.id] = n; applyFx(step.outcomes[n].fx); };
    const TL = { finale: "Ending", write: "Text Jalen + turn in" };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL + 1,
      index: () => st.step < 0 ? 0 : Math.min(st.step, TOTAL - 1) + 1,
      label: i => {
        if (i === 0) return "Title";
        const s = STEPS[i - 1];
        return TL[s.type] || (s.type === "check" ? "Check: " + s.short : s.short);
      },
      go: i => {
        if (!st.name) st.name = "Test T.";
        const t = i - 1;
        // safe defaults (first open cards / default chips) for steps the jump skips past
        for (let j = 0; j < t && j < TOTAL; j++) {
          const s = STEPS[j];
          doEntry(s);
          if (s.type === "draft" && (st.picks[s.id] || []).length < s.picks) tDraftQuiet(s);
          else if (s.type === "voices" && st.picks[s.id] == null) tVoicesQuiet(s);
        }
        st.lockUntil = 0; locked = false;
        st.step = t; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        if (st.step < 0) return;
        const s = STEPS[Math.min(st.step, TOTAL - 1)];
        if (s.type === "draft") { if ((st.picks[s.id] || []).length < s.picks) { tDraftQuiet(s); save(); render(); } }
        else if (s.type === "check") {
          if (!st.done[s.id]) {
            st.done[s.id] = true; if (s.clues) st.clues[s.id] = s.clueList.map((c, k) => k);
            if (s.onRight) applyFx(s.onRight);
            st.lockUntil = 0; locked = false; save(); render();
          }
        }
        else if (s.type === "voices") { if (st.picks[s.id] == null) { tVoicesQuiet(s); save(); render(); } }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
