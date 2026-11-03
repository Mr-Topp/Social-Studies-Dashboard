// =====================================================================
//  1989: HOW DOES A WALL COME DOWN?  (World History · Unit 2 · Day 8)
//  Polish of the original UnitGame version (same premise, same story):
//  you're 17 in East Berlin, 1988–89. Four story choices + 7 evidence
//  checks crack the wall. Two meters: 🔨 Wall cracks (choices + checks,
//  wrong guesses cost cracks) vs. 📁 your Stasi file (risky choices).
//  Leaving through Hungary is a real branch (later scenes change).
//  World view on purpose: Eastern Europe + people power. U.S. History
//  U5 D3 "Who Ended the Cold War?" covers Reagan/arms race/glasnost, so
//  those checks were cut here.
//  ⚡ Lightning Round after the ending: 7 one-tap Unit 2 review questions
//  (the unit test is the next day), tagged only to this page's standards.
//  Same assignmentId as before. Turn-in via shared/turnin.js.
// =====================================================================
(function () {
  "use strict";
  const KEY = "wh-u2-d11-1989-v2";
  const ASSIGNMENT_ID = "wh-u2-d11-1989";
  const TITLE = "World History · Unit 2 · Day 8 · 1989: How Does a Wall Come Down?";
  const STANDARD = "SS.9-12.WH.34, SS.9-12.WH.37, SS.9-12.WH.35";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;          // seconds locked after a wrong answer
  const RIGHT = 8;         // each solved check: + cracks
  const WRONG = 4;         // each wrong try: − cracks ("the wall holds")
  const GOAL = { wall: 65, file: 4 };
  const LR_LOCK = 4;
  const BRICKS = 12;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite, cls) => `<div class="exhibit ${cls || ""}"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (who, t, cls) => `<div class="say ${cls || ""}"><span class="who-s">${who}</span>${t}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  const route = () => `<div class="route" aria-label="Route: East Germany to Hungary to Austria to West Germany">
      <span class="stop e">East<br>Germany</span><span class="arr">➜</span><span class="stop h">Hungary</span><span class="arr cut">✂️</span><span class="stop a">Austria</span><span class="arr">➜</span><span class="stop w">West<br>Germany</span></div>`;
  const DOMINOS = [["🕊️", "1988", "Gorbachev: no tanks"], ["🛠️", "June '89", "Solidarity wins"], ["✂️", "Sept. '89", "Hungary opens"], ["🕯️", "Oct. '89", "Leipzig march"], ["📺", "Nov. 9", "TV mistake"]];
  const dominos = fallen => `<div class="dominos${fallen ? " fallen" : ""}" id="dominos">${DOMINOS.map((d, i) => `<div class="dom" style="--i:${i}"><span class="di">${d[0]}</span><b>${d[1]}</b><small>${d[2]}</small></div>`).join("")}</div>`;

  // ---------------- Chapters ----------------
  const CHAPS = [{ tag: "The Wall", yrs: "1961–1988" }, { tag: "Cracks", yrs: "1988–1989" }, { tag: "The Night", yrs: "Fall 1989" }];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1].
  // event: real decision. fx.wall = cracks, fx.file = Stasi file pages. left:true = you flee west.
  //        alt = the version shown if you already left East Germany.
  const STEPS = [
    // ===== Chapter 1 · The Wall =====
    { id: "c1", type: "check", r: 0, std: "WH.35", kicker: "August 1961 · Why a wall?", short: "Why the wall was built", stamp: "FILED",
      scene: () => ex("East Germany, 1949–1961", ln("🏃", "Over 2.5 million people fled west.") + ln("🩺", "Many were young doctors and engineers.") + ln("📅", "July 1961 alone: about 30,000."), "Berlin Wall Memorial"),
      ask: "Why did East Germany build the wall?",
      options: ["To keep its own people in", "To keep Western armies out", "To block Western goods", "To mark a border voters chose"],
      miss: ["That was the official story. But the guards' guns faced east.", "Goods weren't the problem. People were leaving.", "Nobody voted. It went up overnight on Aug. 13, 1961."],
      hint: "Which way were people moving?",
      reveal: "<b>Berlin Wall</b> (1961): built to keep East Germans <b>in</b>." },

    { id: "c2", type: "check", r: 0, std: "WH.35", kicker: "1989 · The Stasi", short: "Stasi = control through informers", stamp: "FILED",
      scene: () => ex("STASI · TOP SECRET", ln("🕵️", "91,000 secret police workers") + ln("👂", "189,000 informers: neighbors, coworkers, classmates, family"), "Stasi Records Archive, figures for 1989", "file"),
      ask: "How did the Stasi control people?",
      options: ["Anyone might be reporting on you", "Voters elected the secret police", "Newspapers exposed its spying", "It paid people to move west"],
      miss: ["One party ran everything. No free elections.", "The state ran the news. Nobody could expose it.", "It worked to stop people leaving."],
      hint: "Who were the informers?",
      reveal: "<b>Stasi</b>: secret police. Control through fear of being watched." },

    { id: "e1", type: "event", r: 0, kicker: "Spring 1988 · The letter", short: "Stasi asks about the letter",
      scene: () => `<p class="emo" aria-hidden="true">✉️ 🕵️</p>` + say("Stasi officer", "“Your cousin in West Berlin wrote you. What did it say?”", "stasi"),
      ask: "What do you say?",
      cards: [
        { icon: "🙂", t: "“Just family news.”", fx: { wall: 0, file: 0 }, res: "He lets you go. You feel watched for weeks.", cause: "Played it safe" },
        { icon: "🤐", t: "Refuse to answer", fx: { wall: 6, file: 3 }, res: "He writes in his notebook. Your college spot is in danger.", cause: "Refused the Stasi" },
        { icon: "⛪", t: "Tell your church group", fx: { wall: 4, file: 1 }, res: "Others were questioned too. At church, people talk.", cause: "Told the church group" }
      ],
      reveal: "<b>Churches</b>: one of the few places people could speak openly." },

    // ===== Chapter 2 · Cracks =====
    { id: "c3", type: "check", r: 1, std: "WH.35", kicker: "Dec. 1988 · A new message", short: "Gorbachev: fear of Soviet tanks fades", stamp: "FILED",
      scene: () => ex("Moscow's tanks", ln("🪖", "<b>1956</b> · Soviet tanks crush Hungary's uprising.") + ln("🪖", "<b>1968</b> · Soviet-led tanks crush Czechoslovakia's push for change.") + ln("🕊️", "<b>1988</b> · Gorbachev: each country picks its own path."), "Mikhail Gorbachev, speech to the United Nations, Dec. 7, 1988"),
      ask: "Why did Gorbachev's words matter in Eastern Europe?",
      options: ["People stopped fearing Soviet tanks", "Soviet tanks rolled into Berlin", "Every communist party quit at once", "East Germany joined the U.S. side"],
      miss: ["No tanks came in 1989. That was the point.", "Not at once. People still had to push them out.", "Not in 1988. It was still communist."],
      hint: "Compare 1956 and 1968 to 1988.",
      reveal: "<b>Gorbachev</b>: no more tanks, so people dared to act." },

    { id: "c4", type: "check", r: 1, std: "WH.37", kicker: "June 1989 · Poland", short: "Solidarity: union organizing, then votes", stamp: "FILED",
      scene: () => ex("Poland", ln("🛠️", "1980: shipyard workers start <b>Solidarity</b>, a workers\u2019 union the state didn\u2019t control.") + ln("🚫", "1981–82: crushed and banned. Meets in secret.") + ln("🗳️", "June 1989 vote: wins 99 of 100 Senate seats."), "Led by electrician Lech Wałęsa"),
      ask: "How did Solidarity win power?",
      options: ["Workers organized, then won votes", "Gorbachev picked its leaders", "An armed revolt beat the army", "U.S. troops forced an election"],
      miss: ["Gorbachev didn't pick them. Polish voters did.", "No armed revolt. Strikes and ballots.", "No U.S. troops. Poles did it themselves."],
      hint: "Start with who founded it. End with June 1989.",
      reveal: "<b>Solidarity</b>: a workers' union that beat the communists at the ballot box." },

    { id: "c5", type: "check", r: 1, std: "WH.34", kicker: "Summer 1989 · Hungary", short: "Hungary's open border = a way around the wall", stamp: "FILED",
      scene: () => route() + ex("Hungary", ln("✂️", "May 1989: cuts its fence with Austria.") + ln("🚗", "Sept. 1989: lets East Germans cross. Tens of thousands go.")),
      ask: "Why did this matter to East Germans?",
      options: ["A way west around the wall", "Hungary built a new wall", "Austria shut its border", "They could visit West Berlin"],
      miss: ["Hungary took a fence DOWN.", "Austria let them through to West Germany.", "The Berlin Wall was still shut. They went around it."],
      hint: "Follow the arrows on the map.",
      reveal: "The <b>Iron Curtain</b>, the line splitting Europe, had a hole." },

    { id: "e2", type: "event", r: 1, kicker: "August 1989 · Lake Balaton, Hungary", short: "Hungary: leave or go home?",
      scene: () => `<p class="emo" aria-hidden="true">⛺ 🏞️</p>` + say("Campground whisper", "“The Austrian border's open. Hundreds left last night.”", "who"),
      ask: "What do you do?",
      cards: [
        { icon: "🧳", t: "Cross to Austria", left: true, fx: { wall: 6, file: 0 }, res: "You leave almost everything. East Germany loses one more young worker.", cause: "Fled through Hungary" },
        { icon: "📣", t: "Go home and protest", fx: { wall: 6, file: 3 }, res: "You join a group back home. Slogan: “We're staying here!”", cause: "Went home to protest" },
        { icon: "🏠", t: "Go home, stay quiet", fx: { wall: 0, file: 0 }, res: "Safe for now. Most people chose this at first.", cause: "Stayed quiet" }
      ],
      reveal: "Leave or stay and protest: both pushed East Germany." },

    // ===== Chapter 3 · The Night =====
    { id: "e3", type: "event", r: 2, kicker: "Mon., Oct. 9, 1989 · Leipzig", short: "Leipzig march, Oct. 9",
      scene: () => ex("6 p.m. tonight", ln("🚓", "Rumor: police will stop the march by force.") + ln("🏥", "Hospitals stock extra blood.")),
      ask: "Do you march?",
      cards: [
        { icon: "🕯️", t: "March with a candle", fx: { wall: 8, file: 3 }, res: "70,000 chant “No violence!” The police don't move.", cause: "Marched in Leipzig" },
        { icon: "👀", t: "Watch from a side street", fx: { wall: 3, file: 1 }, res: "No shots. Next Monday, you march too.", cause: "Watched, then joined" },
        { icon: "🏠", t: "Stay home", fx: { wall: 0, file: 0 }, res: "Radio says it was peaceful. You can't believe it.", cause: "Stayed home Oct. 9" }
      ],
      alt: {
        scene: () => `<p class="emo" aria-hidden="true">📺 🏚️</p>` + say("West German TV", "“Tonight in Leipzig: a huge march. Will police shoot?”", "who") + `<p class="small">East Germans watch West TV too.</p>`,
        ask: "You're safe in the West. What do you do?",
        cards: [
          { icon: "🎤", t: "Tell your story on TV", fx: { wall: 8, file: 3 }, res: "Friends back home see you. So does the Stasi. They question your parents.", cause: "Told your story on West TV" },
          { icon: "📞", t: "Call friends: “Go march!”", fx: { wall: 3, file: 2 }, res: "The line clicks. Someone is listening.", cause: "Called friends to march" },
          { icon: "🛏️", t: "Lay low", fx: { wall: 0, file: 0 }, res: "You watch the news alone.", cause: "Laid low" }
        ]
      },
      reveal: "Marchers chanted <b>“We are the people!”</b> Power belongs to citizens." },

    { id: "c6", type: "check", r: 2, std: "WH.35", kicker: "Thurs., Nov. 9, 1989 · Live TV", short: "Schabowski's TV mistake", stamp: "FILED",
      scene: () => `<div class="tv"><p class="top">🔴 LIVE · EAST BERLIN · 6:53 P.M.</p><p class="tvq">New rule: East Germans may travel west. Reporter: “Starting when?”</p></div>` + say("Official Günter Schabowski", "“As far as I know… immediately, without delay.”", "stasi") + ln("📄", "Planned start: the next day."),
      ask: "Why did crowds rush to the wall that night?",
      options: ["A mistake on live TV", "Soviet troops ordered it", "West Germany broke a gate", "Gorbachev gave the order"],
      miss: ["Soviet troops stayed in their bases.", "The gates opened from the East German side.", "Gorbachev found out after it happened."],
      hint: "Was “immediately” the plan?",
      reveal: "One <b>mistake</b> on live TV sent thousands to the gates." },

    { id: "e4", type: "event", r: 2, kicker: "Nov. 9, 1989 · 9 p.m.", short: "Nov. 9: to the checkpoint?",
      scene: () => `<p class="emo" aria-hidden="true">🚪 💨</p>` + say("Your neighbor", "“They said on TV we can cross! Now!”", "who"),
      ask: "What do you do?",
      cards: [
        { icon: "🏃", t: "Run to Bornholmer Street", fx: { wall: 8, file: 1 }, res: "Thousands chant “Open the gate!” The guards have no orders.", cause: "Ran to the checkpoint" },
        { icon: "🚪", t: "Wake up the building", fx: { wall: 6, file: 0 }, res: "Twenty neighbors come with you. The crowd swells.", cause: "Brought the neighbors" },
        { icon: "🛏️", t: "Wait till morning", fx: { wall: 0, file: 0 }, res: "By morning, people are dancing on the wall.", cause: "Waited till morning" }
      ],
      alt: {
        scene: () => `<p class="emo" aria-hidden="true">📻 🌹</p>` + say("West Berlin radio", "“Crowds at Bornholmer Street! The gate may open!”", "who"),
        ask: "You're in West Berlin. What do you do?",
        cards: [
          { icon: "🏃", t: "Run to the west side", fx: { wall: 8, file: 0 }, res: "You wait at the gate with flowers. The chanting gets louder.", cause: "Waited at the gate" },
          { icon: "📞", t: "Call home: “Come now!”", fx: { wall: 6, file: 1 }, res: "Your mom grabs her coat.", cause: "Called home" },
          { icon: "🛏️", t: "Wait till morning", fx: { wall: 0, file: 0 }, res: "By morning, people are dancing on the wall.", cause: "Waited till morning" }
        ]
      },
      reveal: "11:30 p.m.: no orders, a huge crowd. The officer <b>opened the gate</b>." },

    { id: "c7", type: "sort", r: 2, std: "WH.37", kicker: "Look back · The chain", short: "Chain: sort the dominos (leaders, people, accident)", stamp: "CHAIN COMPLETE",
      scene: () => dominos(!!st.done.c7),
      ask: "Who knocked over each domino?",
      chips: ["🏛️ Leaders", "✊ People", "🎲 Accident"],
      rows: [
        { icon: "🕊️", t: "Gorbachev: no tanks", a: "🏛️ Leaders" },
        { icon: "🛠️", t: "Solidarity wins", a: "✊ People" },
        { icon: "✂️", t: "Hungary opens its border", a: "🏛️ Leaders" },
        { icon: "🕯️", t: "Leipzig march", a: "✊ People" },
        { icon: "📺", t: "TV mistake", a: "🎲 Accident" }
      ],
      hint: "Leaders = governments deciding. People = crowds and unions. Accident = nobody planned it.",
      reveal: "<b>Chain of causes</b>: leaders, ordinary people, and one accident, together." },

    { id: "ending", type: "ending", r: 2, kicker: "Your ending" },
    { id: "lightning", type: "lightning", r: 2, kicker: "Test review · Lightning round" },
    { id: "write", type: "write", r: 2, kicker: "Your letter" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check" || s.type === "sort");
  const EVENTS = STEPS.filter(s => s.type === "event");

  // ---------------- ⚡ Lightning round: Unit 2 test review (only this page's standards) ----------------
  const LR = [
    { id: "lr1", std: "WH.34", short: "Containment = stop communism spreading",
      ev: "🇺🇸 1947: the U.S. promises to help countries resist communism.",
      ask: "This plan is called…",
      options: ["Containment", "Domino theory", "Non-alignment", "Glasnost"],
      miss: ["Domino theory is the fear. Containment is the plan.", "Non-alignment = joining neither side.", "Glasnost = Soviet openness, in the 1980s."],
      reveal: "<b>Containment</b>: the U.S. plan to stop communism from spreading." },
    { id: "lr2", std: "WH.34", short: "Domino theory = one falls, neighbors fall",
      ev: "🇻🇳➜🇱🇦➜🇰🇭➜🇹🇭 U.S. leaders: “If Vietnam falls to communism, its neighbors fall next.”",
      ask: "This fear is called…",
      options: ["Domino theory", "Containment", "Partition", "Glasnost"],
      miss: ["Containment is the plan. This is the fear behind it.", "Partition = splitting a country, like India in 1947.", "Glasnost = Soviet openness, in the 1980s."],
      reveal: "<b>Domino theory</b>: one country falls to communism, its neighbors follow." },
    { id: "lr3", std: "WH.35", short: "Mao's posters = propaganda",
      ev: "🌾 China, 1959: posters show giant harvests. Millions are starving.",
      ask: "The posters are…",
      options: ["Propaganda", "Free press", "Containment", "Non-alignment"],
      miss: ["A free press could report the famine. Mao's China couldn't.", "Containment was a U.S. plan.", "Non-alignment = joining neither side."],
      reveal: "<b>Propaganda</b>: one-sided messages a government uses to control what people think." },
    { id: "lr4", std: "WH.35", short: "Communist vs. democratic control",
      ev: "🗳️ Which was true in East Germany but NOT West Germany?",
      ask: "Pick one.",
      options: ["One party ruled, no real choice", "Courts could overrule leaders", "Parties competed in elections", "Papers could criticize leaders"],
      miss: ["That was West Germany.", "That was West Germany.", "That was West Germany."],
      reveal: "<b>One-party state</b>: elections, but no real choice." },
    { id: "lr5", std: "WH.37", short: "Proxy wars: win allies, avoid direct war",
      ev: "🌍 Korea, Vietnam, Angola: the U.S. and USSR each backed a side.",
      ask: "Why fight far from home?",
      options: ["Win allies, no direct war", "Grab new colonies", "The UN ordered it", "Keep fighting in Europe"],
      miss: ["They wanted allies, not colonies.", "No one ordered them. They chose to.", "The opposite: they kept fighting away from Europe."],
      reveal: "<b>Proxy war</b>: superpowers back local sides instead of fighting each other." },
    { id: "lr6", std: "WH.37", short: "Geneva 1954: U.S. feared a communist win",
      ev: "🇻🇳 1954 Geneva deal: Vietnam split. A 1956 vote would reunite it.",
      ask: "Why didn't the U.S. back the vote?",
      options: ["Feared Ho's communists would win", "Vietnam didn't want a vote", "France banned elections", "The vote already happened"],
      miss: ["Many Vietnamese wanted the vote.", "France was leaving Vietnam.", "The 1956 vote never happened."],
      reveal: "Cold War fear beat the promised vote. Vietnam stayed split." },
    { id: "lr7", std: "WH.37", short: "Apartheid: sanctions = outside pressure",
      ev: "🌍 1986: the U.S. and others cut trade with South Africa to push it to end apartheid.",
      ask: "Cutting trade to force change is called…",
      options: ["Sanctions", "Containment", "Non-alignment", "Partition"],
      miss: ["Containment = stopping communism from spreading.", "Non-alignment = joining neither Cold War side.", "Partition = splitting a country, like India in 1947."],
      reveal: "<b>Sanctions</b> + protests at home helped end apartheid by 1994." }
  ];

  const PROMPTS = [
    { id: "who", short: "Leaders, people, or an accident (WH.37)", label: "1. What brought the wall down most: a leader, ordinary people, or an accident?",
      bank: ["🕊️ Gorbachev", "🛠️ Solidarity", "✂️ Hungary's border", "🕯️ Leipzig marchers", "📺 Schabowski's mistake"],
      stem: "I think ___ mattered most because ___.", min: 60, newWords: 5,
      mustAll: [["leader", "gorbachev", "people", "protest", "march", "citizen", "crowd", "leipzig", "solidarity", "poland", "union", "hungary", "border", "accident", "mistake", "schabowski", "tv"], ["because", "since", "so ", "that's why"]],
      mustMsg: "In answer 1, name a leader, a group, or the mistake AND explain why with “because.”" },
    { id: "control", short: "How East Germany controlled people + why it failed (WH.35)", label: "2. How did East Germany control people? Why did that stop working in 1989?",
      bank: ["🧱 the wall", "🕵️ Stasi informers", "🪖 fear of Soviet tanks", "🏃 people leaving", "🕯️ crowds too big"],
      stem: "East Germany controlled people with ___. It stopped working because ___.", min: 70, newWords: 6,
      mustAll: [["stasi", "wall", "informer", "spy", "spied", "secret police", "guard", "fear", "tank", "border", "watch"], ["because", "since", "once", "when", "so "]],
      mustMsg: "In answer 2, name a way East Germany controlled people (like the Stasi or the wall) AND explain why it stopped working." }
  ];

  // ---------------- State ----------------
  const freshLR = () => ({ done: {}, wrong: {}, streak: 0, best: 0 });
  const fresh = () => ({ name: "", step: -1, fx: { wall: 0, file: 0 }, left: false, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false, lr: freshLR() });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.fx || !st.picks) st = fresh();
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
  const wallNow = () => Math.max(0, Math.min(100, (st.fx.wall || 0) + RIGHT * Object.keys(st.done).length - WRONG * misses()));
  const fileNow = () => Math.max(0, Math.min(10, st.fx.file || 0));
  const chapDone = i => CHECKS.filter(c => c.r === i).every(c => st.done[c.id]) && EVENTS.filter(e => e.r === i).every(e => st.picks[e.id] != null);

  // ---------------- HUD ----------------
  const stasiMood = w => w < 25 ? "😏" : w < 45 ? "😐" : w < GOAL.wall ? "😠" : "😰";
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const w = wallNow(), f = fileNow();
    $("wallFill").style.width = w + "%"; $("wallNum").textContent = w + "%";
    $("fileFill").style.width = (f * 10) + "%"; $("fileNum").textContent = f + " pg";
    $("rMood").textContent = stasiMood(w);
    $("youName").textContent = st.name;
    $("youWhere").textContent = st.left ? "Now in the West" : "East Berlin";
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    const off = ["ending", "lightning", "write"].includes(step.type);
    $("chaps").innerHTML = CHAPS.map((c, i) => `<span class="${chapDone(i) ? "won" : i === step.r && !off ? "now" : ""}">${chapDone(i) ? "✓" : i + 1} ${c.tag}</span>`).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
    paintWall();
  }
  function bump(id, delta, goodWhenUp) {
    const el = $(id); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + ((delta > 0) === goodWhenUp ? "good" : "bad");
    f.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  const snap = () => ({ w: wallNow(), f: fileNow() });
  function moved(before) {
    hud();
    const w = wallNow(), f = fileNow();
    bump("mWall", w - before.w, true);
    bump("mFile", f - before.f, false);
    if (w > before.w) { const r = $("rivalBox"); r.classList.remove("shake"); void r.offsetWidth; r.classList.add("shake"); }
  }
  function fxChips(fx) {
    const out = [];
    if (fx.wall) out.push(`<span class="fx g">🔨 +${fx.wall}</span>`);
    if (fx.file) out.push(`<span class="fx b">📁 +${fx.file}</span>`);
    if (!fx.wall && !fx.file) out.push(`<span class="fx n">no change</span>`);
    return out.join("");
  }
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- The wall (scene art) ----------------
  function wallHtml() {
    return `<div class="berlin" aria-label="The Berlin Wall: ${wallNow()}% cracked">
      <span class="side east" aria-hidden="true">🏚️<small>EAST</small></span>
      <div class="wallart" id="wallArt">${Array.from({ length: BRICKS }, () => `<span class="brick"></span>`).join("")}</div>
      <span class="side west" aria-hidden="true">🏙️<small>WEST</small></span>
    </div>`;
  }
  function paintWall() {
    const art = $("wallArt"); if (!art) return;
    const n = Math.round(wallNow() / 100 * BRICKS);
    art.querySelectorAll(".brick").forEach((b, i) => {
      const was = b.classList.contains("down");
      b.classList.toggle("down", i < n);
      if (i < n && !was) { b.classList.remove("crash"); void b.offsetWidth; b.classList.add("crash"); }
    });
    const host = art.closest(".berlin"); if (host) host.setAttribute("aria-label", "The Berlin Wall: " + wallNow() + "% cracked");
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml) {
    const C = CHAPS[step.r];
    const off = ["ending", "lightning", "write"].includes(step.type);
    const top = off ? "" : `<p class="chap">Chapter ${step.r + 1} · ${C.tag} <small>${C.yrs}</small></p>`;
    app.innerHTML = `<div class="board"><div class="scene" id="scene">${step.type === "lightning" ? "" : wallHtml()}${top}<p class="kick">${esc(step.kicker)}</p>${sceneHtml}</div>
      <div class="play" id="play">${playHtml}</div></div>`;
    paintWallQuiet();
  }
  function paintWallQuiet() {
    const art = $("wallArt"); if (!art) return;
    const n = Math.round(wallNow() / 100 * BRICKS);
    art.querySelectorAll(".brick").forEach((b, i) => b.classList.toggle("down", i < n));
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "ending") return "See your ending ▶";
    if (nx.r !== step.r) return "Chapter " + (nx.r + 1) + ": " + CHAPS[nx.r].tag + " ▶";
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
      <div class="tart" aria-hidden="true">
        <div class="tsky"><span>🗼</span><span class="moon">🌙</span></div>
        <div class="twall"><span class="tag1">1989</span>${Array.from({ length: 8 }, () => `<i></i>`).join("")}</div>
        <div class="cast"><div><span>🧑</span>You, 17<small>East Berlin</small></div><div class="k"><span>🕵️</span>Stasi<small>watching you</small></div><div class="w"><span>✉️</span>Cousin<small>West Berlin</small></div></div>
      </div>
      <div class="tcopy">
        <p class="tk">World History · Unit 2 · Day 8</p>
        <h1>1989: How Does a Wall Come Down?</h1>
        <p class="hook">The wall is at the end of your street. In a year, it's gone. How?</p>
        <ul class="how"><li><span>🃏</span>Make risky choices</li><li><span>🔍</span>Crack the evidence</li><li><span>🔨</span>Bring the wall down</li></ul>
        <p class="tline">🎯 Goal: explain the chain of causes that brought down the Berlin Wall.</p>
        <p class="tchips"><span>⏱️ 25 min</span><span>🔍 7 checks</span><span>🃏 4 choices</span><span>⚡ Test review</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Start in East Berlin 🧱</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">You and your story are made up. The events, numbers, and quotes are real. Standards: SS.9-12.WH.34, WH.35, WH.37.</p>
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
      msgEl.innerHTML = `🧱 The wall holds. ${esc(text)} <span class="cd">${left}</span>`;
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
    if (lockLeft() > 0 && st.lockId === step.id) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || step.hint, $("qmsg"), () => draw(step), lockLeft()); }
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
    const why = (step.miss && step.miss[o.n - 1]) || step.hint;
    const before = snap();
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + LOCK * 1000; st.lockMsg = why; st.lockId = step.id;
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Cracked</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp(chapDone(step.r) && lastInChap(step) ? "CHAPTER " + (step.r + 1) + " ✓" : step.stamp, chapDone(step.r) && lastInChap(step) ? "huge" : ""); }
    addNext(step, step.reveal, quiet);
  }
  const lastInChap = step => { const all = STEPS.filter(s => s.r === step.r && ["check", "sort", "event"].includes(s.type)); return all[all.length - 1] === step; };

  // ---- Sort: tag each row with one chip, then lock it in ----
  let sp = {};
  function sortStep(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="rows"></div><button type="button" class="go lock" id="lockBtn" disabled>Lock it in 🔨</button><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    $("lockBtn").onclick = () => lockIn(step);
    if (st.done[step.id]) return sorted(step, true);
    drawRows(step);
    if (lockLeft() > 0 && st.lockId === step.id) { setRows(true); runLock(st.lockMsg || step.hint, $("qmsg"), () => drawRows(step), lockLeft()); }
  }
  function setRows(off) { document.querySelectorAll("#rows .chip").forEach(x => x.disabled = off); $("lockBtn").disabled = true; }
  function drawRows(step) {
    sp = {};
    const box = $("rows"); if (!box) return;
    box.innerHTML = step.rows.map((r, i) => `<div class="brow" data-i="${i}"><span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span><div class="chips" role="group" aria-label="${esc(r.t)}">${step.chips.map(c => `<button type="button" class="chip" aria-pressed="false" data-v="${esc(c)}">${esc(c)}</button>`).join("")}</div></div>`).join("");
    box.querySelectorAll(".brow").forEach(row => {
      const i = +row.dataset.i;
      row.querySelectorAll(".chip").forEach(ch => ch.onclick = () => {
        if (locked) return;
        sp[i] = ch.dataset.v;
        row.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === ch)));
        $("lockBtn").disabled = Object.keys(sp).length < step.rows.length;
        $("qmsg").textContent = "";
      });
    });
    $("lockBtn").disabled = true;
  }
  function lockIn(step) {
    if (locked || Object.keys(sp).length < step.rows.length) return;
    const nRight = step.rows.filter((r, i) => sp[i] === r.a).length;
    const before = snap();
    if (nRight === step.rows.length) {
      st.done[step.id] = true; save(); moved(before);
      try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
      return sorted(step, false);
    }
    const text = `${nRight} of ${step.rows.length} right. ${step.hint}`;
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + LOCK * 1000; st.lockMsg = text; st.lockId = step.id;
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    setRows(true);
    runLock(text, $("qmsg"), () => drawRows(step), LOCK);
  }
  function sorted(step, quiet) {
    $("rows").innerHTML = step.rows.map(r => `<div class="brow ok"><span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span><span class="got">✓ ${esc(r.a)}</span></div>`).join("");
    $("lockBtn").remove();
    const d = $("dominos"); if (d) d.classList.add("fallen");
    if (!quiet) { $("qmsg").textContent = ""; stamp(chapDone(step.r) && lastInChap(step) ? "CHAPTER " + (step.r + 1) + " ✓" : step.stamp, chapDone(step.r) && lastInChap(step) ? "huge" : ""); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Event ----
  function event(step) {
    // If you already fled west, the scene switches to its "alt" version. A saved pick keeps the view it was made in.
    const leftNow = st.picks[step.id] != null ? !!(st.pickedLeft && st.pickedLeft[step.id]) : st.left;
    const view = (leftNow && step.alt) ? step.alt : step;
    shell(step, view.scene(), `<p class="ask">${esc(view.ask || step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, view, p, true);
    const order = shuffle(view.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${order.map(i => { const c = view.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><span class="fxrow">${fxChips(c.fx)}</span></button>`; }).join("")}</div>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = view.cards[i];
      const before = snap();
      st.picks[step.id] = i;
      st.pickedLeft = st.pickedLeft || {}; st.pickedLeft[step.id] = !!(st.left && step.alt);
      st.fx.wall += c.fx.wall || 0;
      st.fx.file = Math.max(0, Math.min(10, (st.fx.file || 0) + (c.fx.file || 0)));
      if (c.left) st.left = true;
      save(); moved(before);
      chosen(step, view, i, false);
    });
  }
  function chosen(step, view, i, quiet) {
    const c = view.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span>${esc(c.t)}</span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${esc(c.res)}</p>`;
    if (!quiet) stamp(c.left ? "ESCAPED WEST" : c.fx.wall ? "PRESSURE ON" : "LAYING LOW", c.fx.wall || c.left ? "" : "bad");
    addNext(step, step.reveal, quiet);
  }
  const pickedCard = s => { const v = (st.pickedLeft && st.pickedLeft[s.id] && s.alt) ? s.alt : s; return v.cards[st.picks[s.id]]; };

  // ---- Endings ----
  function ending() {
    const w = wallNow(), f = fileNow();
    let e;
    if (w >= GOAL.wall && st.left && f <= GOAL.file) e = { key: "Reunion at the Gate", icon: "🌹", cls: "best", text: "Nov. 10: you hug your family at Bornholmer Street. You left, and you still pushed." };
    else if (w >= GOAL.wall && st.left) e = { key: "Free, but Watched", icon: "👁️", cls: "mid", text: "You pushed from the West. The Stasi questioned your parents for weeks. Nov. 10: you hug them at the gate." };
    else if (w >= GOAL.wall && f <= GOAL.file) e = { key: "Through the Gate", icon: "🎉", cls: "best", text: "Midnight: you walk into West Berlin. Your cousin is waiting. Your Stasi file stayed thin." };
    else if (w >= GOAL.wall) e = { key: "You Read Your File", icon: "📁", cls: "mid", text: "You helped crack the wall. In 1992, you read your Stasi file. A classmate had informed on you." };
    else e = { key: "Watched It on TV", icon: "📺", cls: "low", text: "The wall fell. Thousands of others pushed it. You watched." };
    const causes = EVENTS.filter(s => st.picks[s.id] != null).map(s => { const k = pickedCard(s); return k.cause + " " + fxPlain(k.fx); });
    const m = misses();
    if (m) causes.push("Shaky facts slowed the cracks");
    if (w >= GOAL.wall && f > GOAL.file) causes.push("📁 File over " + GOAL.file + " pages");
    e.causes = causes;
    return e;
  }
  const fxPlain = fx => "(" + ([fx.wall ? "🔨 +" + fx.wall : "", fx.file ? "📁 +" + fx.file : ""].filter(Boolean).join(" ") || "no change") + ")";

  function endStep(step) {
    const e = ending();
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>
        ${ex("What came next", ln("🇩🇪", "<b>Oct. 3, 1990</b> · Germany reunites.") + ln("🗺️", "<b>Dec. 1991</b> · The USSR splits into 15 countries."))}`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">🔨 Wall cracks ${wallNow()}% · 📁 Stasi file ${fileNow()} pages</p></div><div id="after"></div>`);
    stamp(e.key.toUpperCase(), (e.cls === "low" ? "bad" : "") + " huge");
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
      <p class="lrsub">Unit 2 test review. One tap each.</p>
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
      const u = new SpeechSynthesisUtterance([strip(q.ev).replace(/[^\p{L}\p{N}\s.,:%'“”"?…-]/gu, " "), q.ask, "Choices: " + opts.join(". ")].join(" "));
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
    const why = (q.miss && q.miss[o.n - 1]) || "Think back to that day's lesson.";
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
    const b = $("nextBtn"); if (b) b.textContent = "✏️ Write your letter ▶";
  }

  // ---- Writing ----
  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="letter"><p class="cbh">✉️ To my cousin · Nov. 10, 1989</p><p>The wall is open. Here's how it happened…</p><p class="sig">Your ending: ${e.icon} ${esc(e.key)}</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: add a real date or number from today.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Send the letter + turn in ▶"}</button>
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
    for (const p of PROMPTS) {
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
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas in answer " + n + ". Use details from the story.");
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
      if (s.type === "event" && st.picks[s.id] != null) answers["Choice · " + s.short] = pickedCard(s).t;
      if (s.type === "check" || s.type === "sort") {
        const w = st.wrong[s.id];
        answers[s.std + " · " + s.short] = (s.type === "sort" ? s.rows.map(r => r.t + " = " + r.a.replace(/^\S+\s/, "")).join(" · ") : s.options[0]) + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    LR.forEach(q => {
      const w = st.lr.wrong[q.id];
      answers[q.std + " · ⚡ " + q.short] = q.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    answers["⚡ Lightning best streak"] = (st.lr.best || 0) + " in a row";
    answers["Ending"] = e.key;
    answers["Path"] = st.left ? "Left through Hungary" : "Stayed in East Germany";
    answers["Caused by"] = e.causes.join(" · ");
    answers["Wall cracks (end)"] = wallNow() + "%";
    answers["Stasi file (end)"] = fileNow() + " pages";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Letter sent!"; msg.className = "msg good";
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
    if (step.type === "sort") return sortStep(step);
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
    w.innerHTML = `<span>👋 Welcome back, ${esc(st.name)}! You're on step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}.${onLR ? " ⚡ Question " + (lrNext() + 1) + " of " + LR.length + "." : ""}</span>`;
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
