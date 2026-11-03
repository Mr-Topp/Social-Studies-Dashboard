// =====================================================================
//  BORN RECKLESS?  (Sociology Unit 3 · Day 6 · Unit 3 Review)
//  Teen Court. Darius, 16, crashed while filming a #NoBrakes clip.
//  Prosecutor Kane says he was "born reckless." You're Darius's advocate.
//  4 rounds = Kane's 4 claims = the 4 test standards (Soc.9, 4, 10, 11).
//  Each round: 1–2 evidence checks + 1 decision (Kane's case vs. Darius's
//  trust). The last round ends with an objection you BUILD (idea + evidence
//  + why), the same shape as an "explain" answer on Thursday's test.
//  7 checks (Fynn 11/3: ~7 max; every test standard gets at least one), 4 decisions, 4 endings, 2 writing answers.
//  + ⚡ Lightning Round after the verdict (Fynn 11/3): 7 one-tap questions on the topics the
//    7-check cut dropped (Coleman/Pew, deviance is relative, formal sanctions, Mead's stages,
//    Asch, Tajfel, Robbers Cave). Recorded as checks in the turn-in; they don't move the verdict.
//  Same assignmentId as the old engine version. Turn-in via shared/turnin.js.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u3-d6-unit3-review-v2-lr";
  const ASSIGNMENT_ID = "soc-u3-d6-unit3-review";
  const TITLE = "Sociology · Unit 3 · Day 6 · Unit 3 Review: Born Reckless?";
  const STANDARD = "SS.9-12.Soc.4, SS.9-12.Soc.9, SS.9-12.Soc.10, SS.9-12.Soc.11";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;          // seconds locked after a wrong answer
  const WRONG_CASE = 5;    // each wrong answer makes Kane's case stronger
  const RIGHT_CASE = 9;    // each solved check makes it weaker
  const GOAL = { case: 20, trust: 4 };
  const LR_LOCK = 4;       // seconds locked after a wrong lightning answer (short: it is a fast round)

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite) => `<div class="exhibit"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (who, t, cls) => `<div class="say ${cls || ""}"><span class="who-s">${who}</span>${t}</div>`;
  const chart = rows => `<div class="chart">${rows.map(r => `<div class="br"><span>${r[0]}</span><span class="tr"><span class="${r[2] || ""}" style="width:${r[1]}%"></span></span><span>${r[1]}%</span></div>`).join("")}</div>`;
  // Evidence board for objection steps: the round's exhibits as icons.
  const BOARD = { 3: ["💭", "🚫", "👍", "👵", "💬"] };
  const board = r => ex("Round " + (r + 1) + " evidence", `<p class="big evb">${BOARD[r].join(" ")}</p>`) + `<p class="objart" aria-hidden="true">🫵 OBJECTION!</p>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;

  // ---------------- Rounds (one per test standard) ----------------
  const ROUNDS = [
    { std: "Soc.9", tag: "Taught?", claim: "“Nobody taught him this. He was born reckless.”",
      terms: [["Socialization", "learning your society's ways, all life long"], ["Agents", "family, school, peers, media"], ["Anticipatory", "practicing a role before you have it"], ["Hidden curriculum", "school lessons nobody says out loud"], ["Resocialization", "old habits replaced, often in a total institution"]] },
    { std: "Soc.4", tag: "Rules", claim: "“Rules are rules. He's just a bad kid.”",
      terms: [["Informal sanction", "reward or punishment from everyday people"], ["Strain (Merton)", "blocked goals → new, rule-breaking ways"], ["Differential association (Sutherland)", "learned from your crew"], ["Labeling (Becker)", "labels stick"]] },
    { std: "Soc.10", tag: "Self", claim: "“He knew who he was. He chose to be the crazy driver.”",
      terms: [["Looking-glass self (Cooley)", "1 how I look · 2 how they judge · 3 how I feel"], ["“I” / “Me” (Mead)", "act-now you / rules-you-learned you"], ["Generalized other", "what society in general expects"], ["Reference group", "a group you measure yourself against"]] },
    { std: "Soc.11", tag: "Groups", claim: "“Leave his friends out of it. He acted alone.”",
      terms: [["Primary group", "small, close, lasting"], ["In-group / out-group", "“us” / “them”"], ["Prejudice / discrimination", "a belief / an action"], ["Groupthink", "nobody questions the plan"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] explains options[i+1].
  // build: every row's opts[0] is right. obj:true = objection builder (idea + evidence + why).
  // event: a real decision. fx moves Kane's case (lower is better) and Darius's trust.
  const STEPS = [
    // ===== Round 1 · Soc.9 =====
    { id: "s1a", type: "check", r: 0, std: "Soc.9", kicker: "Exhibit 1-A · Day 1 case files", short: "Anna & Isabelle: people need contact", stamp: "EVIDENCE IN",
      scene: () => `<div class="row2">${ex("Anna, 1938", `<p class="big">👤</p><p>Almost no contact until 6.</p><p class="arrow">→ Barely talked.</p>`)}${ex("Isabelle, 1938", `<p class="big">🗣️</p><p>Daily lessons from 6½.</p><p class="arrow">→ Caught up by 8½.</p>`)}</div>`,
      ask: "What do Anna and Isabelle prove?",
      options: ["We need people to become social", "Kids learn to talk on their own", "Personality is set at birth", "Kids left alone catch up later"],
      miss: ["Anna had years alone and still barely talked.", "Then both girls would match. They didn't.", "Isabelle only caught up with daily help."],
      hint: "What did Isabelle get that Anna didn't?",
      reveal: "<b>Socialization</b>: we learn to be human from people." },

    { id: "e1", type: "event", r: 0, kicker: "Saturday · Family witness", short: "Family witness?",
      scene: () => `${say("Renee, his mom", "“I raised him careful. This year, he changed.”", "mom")}${say("Darius", "“Keep my mom out of this.”", "dar")}`,
      ask: "Who speaks for his family?",
      cards: [
        { icon: "👩🏾", t: "Mom testifies", fx: { case: -8, trust: -2 }, res: "She shows his old report cards. Darius won't look at you.", cause: "Mom testified" },
        { icon: "✉️", t: "Grandma's letter", fx: { case: -5, trust: -1 }, res: "“He used to call me every Sunday.” Darius sighs.", cause: "Grandma's letter" },
        { icon: "🤐", t: "Only Darius talks", fx: { case: -3, trust: 1 }, res: "Darius opens up to you. The jury hears nothing about home.", cause: "Kept family out" }
      ],
      reveal: "<b>Family</b>: usually the first agent of socialization." },

    { id: "s1c", type: "build", r: 0, std: "Soc.9", kicker: "Exhibit 1-B · Across his life", short: "Anticipatory, hidden curriculum, resocialization", stamp: "LABELED",
      scene: () => say("Prosecutor Kane", "“Send him to Ironwood: a 30-day youth boot camp.”", "kane") + `<div class="row2">${ex("Spring", `<p class="big">🚗</p><p>Driver's ed</p>`)}${ex("Fall", `<p class="big">⏰</p><p>Tardy slips</p>`)}</div>`,
      ask: "Label each moment.",
      rows: [
        { icon: "🚗", t: "Practicing driving before his license", opts: ["Anticipatory", "Hidden curriculum", "Resocialization"] },
        { icon: "⏰", t: "Tardy slips teach “be on time.” No class does.", opts: ["Hidden curriculum", "Anticipatory", "Resocialization"] },
        { icon: "🪖", t: "Boot camp: uniforms, no phone, all-new rules", opts: ["Resocialization", "Anticipatory", "Hidden curriculum"] }
      ],
      shared: true,
      hint: "Practice for a future role · a lesson nobody says out loud · old habits replaced.",
      reveal: "<b>Resocialization</b> happens in a <b>total institution</b> that controls your whole day." },

    // ===== Round 2 · Soc.4 =====
    { id: "e2", type: "event", r: 1, kicker: "Kane's video exhibit", short: "Kane's video exhibit",
      scene: () => say("Prosecutor Kane", "“Exhibit B. His last clip.”", "kane") + `<div class="phone"><p class="top">LOOP · #NoBrakes</p><div class="bub">🏎️💨 night run, 70 in a 35</div><div class="bub me">❤️ 2,000 · “LEGEND 🔥”</div></div>`,
      ask: "What do you do?",
      cards: [
        { icon: "📢", t: "Point at the likes", fx: { case: -7, trust: -2 }, res: "“2,000 people rewarded this.” Darius stares at the floor.", cause: "Pointed at the likes" },
        { icon: "✋", t: "Object to the clip", fx: { case: 4, trust: 1 }, res: "Overruled. Kane shows it anyway, and you say nothing about the likes.", cause: "Objected to the clip" }
      ],
      reveal: "Likes are <b>informal sanctions</b>: rewards from everyday people." },

    { id: "s2c", type: "build", r: 1, std: "Soc.4", kicker: "Exhibit 2-A · Three clues", short: "Strain vs. differential association vs. labeling", stamp: "THEORIES MATCHED",
      scene: () => ex("Day 3 theorists", ln("🧗", "Merton") + ln("👥", "Sutherland") + ln("🏷️", "Becker")),
      ask: "Match each clue to a theory.",
      rows: [
        { icon: "🏀", t: "Cut from the team. Wanted to be noticed.", opts: ["Strain", "Differential association", "Labeling"] },
        { icon: "📱", t: "4 hours a day trading speed tips with the crew", opts: ["Differential association", "Strain", "Labeling"] },
        { icon: "👩‍🏫", t: "Teacher: “You're one of THOSE kids.”", opts: ["Labeling", "Strain", "Differential association"] }
      ],
      shared: true,
      hint: "Strain = blocked goals. Differential association = learned from your crew. Labeling = names stick.",
      reveal: "One crash. Three theories. Three different causes." },

    { id: "s2d", type: "check", r: 1, std: "Soc.4", kicker: "Exhibit 2-B · Day 3 study", short: "Labeling: a record cuts job callbacks", stamp: "EVIDENCE IN",
      scene: () => ex("Pager, Milwaukee, 2003", `<p>Same résumé. Got called back for the job:</p>` + chart([["No record", 34], ["Record", 17, "hot"]]), "Results for white testers; the cut was even bigger for Black testers."),
      ask: "Kane wants him labeled “reckless” for good. What could happen?",
      options: ["He acts the part and doors close", "The label scares him into behaving", "Labels fade once he turns 18", "Only his actions matter, not labels"],
      miss: ["Becker: labels push people toward the role.", "A record follows you for years. Look at the chart.", "Same résumé, half the calls. The label mattered."],
      hint: "Look at the chart. Labels stick.",
      reveal: "<b>Labeling theory</b>: labels stick and can shape your chances in life." },

    // ===== Round 3 · Soc.10 =====
    { id: "s3x", type: "build", r: 2, std: "Soc.10", kicker: "Exhibit 3-A · How he sees himself", short: "Looking-glass self, reference group, “Me,” generalized other", stamp: "SELF EXPLAINED",
      scene: () => ex("September", chart([["🎹 Piano video", 3], ["🏎️ #NoBrakes", 90, "hot"]]).replace(">3%<", ">3 ❤️<").replace(">90%<", ">900 ❤️<") + ln("📏", "Idol: @RevLimitKing, 2M fans. Never met.")),
      ask: "Name what each moment shows.",
      rows: [
        { icon: "💭", t: "Imagined the crew calling piano “soft”", opts: ["Looking-glass self", "Reference group", "“Me”", "Generalized other"] },
        { icon: "📏", t: "“Is this as crazy as Rev's?”", opts: ["Reference group", "Looking-glass self", "“Me”", "Generalized other"] },
        { icon: "🧠", t: "Crash night: remembered Mom's car rule", opts: ["“Me”", "Looking-glass self", "Reference group", "Generalized other"] },
        { icon: "🤝", t: "Job interview: hat off. Nobody told him.", opts: ["Generalized other", "Looking-glass self", "Reference group", "“Me”"] }
      ],
      shared: true,
      hint: "Imagined judgment · a group to measure against · rules you learned · what society expects.",
      reveal: "Each one: other people building his <b>self</b>." },

    { id: "e3", type: "event", r: 2, kicker: "The deleted video", short: "The deleted piano video",
      scene: () => ex("Found in his drafts", `<p class="big">🎹</p><p>It's really good.</p>`) + say("Darius", "“Nobody needs to see that.”", "dar"),
      ask: "What do you do with it?",
      cards: [
        { icon: "▶️", t: "Play it in court", fx: { case: -7, trust: -2 }, res: "Two jurors smile. Darius turns red and won't look up.", cause: "Played the piano video" },
        { icon: "🎤", t: "Darius tells it himself", fx: { case: -3, trust: 1 }, res: "“People thought piano was soft.” Short, but real.", cause: "Darius told it himself" },
        { icon: "🔒", t: "Keep it private", fx: { case: 4, trust: 1 }, res: "Darius is relieved. The jury only sees #NoBrakes Darius.", cause: "Kept piano private" }
      ],
      reveal: "<b>Looking-glass self</b>: you choose which mirror the jury sees." },

    // ===== Round 4 · Soc.11 =====
    { id: "s4d", type: "build", r: 3, std: "Soc.11", kicker: "Exhibit 4-A · His groups", short: "Prejudice, discrimination, groupthink, primary group", stamp: "SORTED",
      scene: () => `<div class="phone"><p class="top">LOOP crew chat</p><div class="bub">Theo's crowd is lame.</div><div class="bub">*Theo was removed*</div><div class="bub">10pm run. In?</div><div class="thumbs">👍👍👍👍👍👍</div><div class="bub me"><small>3 DMs to Darius</small>lowkey nervous ngl</div></div>`,
      ask: "Stamp each one.",
      rows: [
        { icon: "💭", t: "“Theo's crowd is lame.”", opts: ["Prejudice", "Discrimination", "Groupthink", "Primary group"] },
        { icon: "🚫", t: "Kicked Theo out", opts: ["Discrimination", "Prejudice", "Groupthink", "Primary group"] },
        { icon: "👍", t: "Nervous, but still typed 👍", opts: ["Groupthink", "Prejudice", "Discrimination", "Primary group"] },
        { icon: "👵", t: "Sunday family dinner since birth", opts: ["Primary group", "Prejudice", "Discrimination", "Groupthink"] }
      ],
      shared: true,
      hint: "A belief · an action · doubts kept quiet · close and lasting.",
      reveal: "<b>Prejudice</b> is a belief. <b>Discrimination</b> is an action." },

    { id: "e4", type: "event", r: 3, kicker: "The crew chat", short: "Crew chat as evidence?",
      scene: () => say("Darius", "“Show that chat and they'll call me a snitch. I'll have nobody.”", "dar"),
      ask: "What do you do?",
      cards: [
        { icon: "💬", t: "Show the crew chat", fx: { case: -8, trust: -2 }, res: "The jury sees six 👍 and three nervous DMs. The crew blocks Darius.", cause: "Showed the crew chat" },
        { icon: "🧑🏽", t: "Old friend Theo testifies", fx: { case: -5, trust: -1 }, res: "Theo tells how the crew cut Darius off from old friends.", cause: "Theo testified" },
        { icon: "🤐", t: "Keep the crew out", fx: { case: 4, trust: 2 }, res: "Darius breathes out. Kane: “See? He acted alone.”", cause: "Kept the crew out" }
      ],
      reveal: "<b>Out-group</b>: to the crew, anyone who talks becomes “them.”" },

    { id: "s4f", type: "build", obj: true, r: 3, std: "Soc.11", kicker: "Final objection", short: "Objection: how groups change behavior", stamp: "CLAIM BUSTED",
      test: "How can belonging to a group change how a person acts?",
      scene: () => board(3),
      ask: "OBJECTION! Build it.",
      rows: [
        { slot: "💡 Idea", opts: ["Groupthink", "Reference group", "Primary group"] },
        { slot: "🔍 Evidence", opts: ["Nervous members still typed 👍", "He follows @RevLimitKing", "Sunday dinner with Grandma"] },
        { slot: "➡️ Why", opts: ["Nobody questioned the risky plan", "He tried to be as crazy as Rev", "Family keeps him close"] }
      ],
      hint: "Your idea, evidence, and why must all be about the same group.",
      reveal: "Full test answer = <b>idea + evidence + why</b>." },

    { id: "verdict", type: "verdict", r: 3, kicker: "The verdict" },
    { id: "lightning", type: "lightning", r: 3, kicker: "After court · Lightning round" },
    { id: "write", type: "write", r: 3, kicker: "Closing argument" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check" || s.type === "build");
  const EVENTS = STEPS.filter(s => s.type === "event");

  // ---------------- ⚡ Lightning round (topics the 7-check cut dropped) ----------------
  // options[0] is right; miss[i] is the one-line teach for options[i+1]. Tags follow the Day 2–5 games.
  const LR = [
    { id: "lr1", std: "Soc.9", short: "Coleman + Pew: peers and media shape teens",
      ev: "🏈 Coleman: boys picked “star athlete” over “brilliant student.” 📱 Pew: nearly half of teens are online almost constantly.",
      src: "Coleman, The Adolescent Society, 1961 · Pew Research Center, 2024",
      ask: "Which two agents?",
      options: ["Peers and media", "Family and school", "School and media", "Family and peers"],
      miss: ["Coleman is about friends. Pew is about screens.", "Media, yes. Coleman shows friends set “cool,” not teachers.", "Peers, yes. Pew is about screens: that's media."],
      reveal: "<b>Peers</b> and <b>media</b>: huge agents of socialization for teens." },
    { id: "lr2", std: "Soc.9", short: "Tattoos: deviance is relative",
      ev: "🖋️ Tattoos were once seen as deviant. Pew 2023: 32% of U.S. adults have one.",
      src: "Pew Research Center, Aug. 2023 (8,480 U.S. adults)",
      ask: "What does this show?",
      options: ["Deviance depends on time and place", "Deviance always means breaking a law", "Norms stay the same over time", "A third of adults are deviant now"],
      miss: ["Deviance breaks a norm. It's not always a crime.", "Then tattoos would still be deviant. The norm changed.", "8 in 10 say people accept tattoos more now. The norm moved."],
      reveal: "<b>Deviance is relative</b>: it depends on time and place." },
    { id: "lr3", std: "Soc.9", short: "Formal sanction = from an official group",
      ev: "🚗 Back to Darius.",
      ask: "Which one is a formal sanction?",
      options: ["A speeding ticket from police", "Mom takes his car keys for a month", "2,000 likes on his clip", "The crew stops texting him"],
      miss: ["Mom is everyday people. That's informal.", "Likes are informal: a reward from everyday people.", "Friends are everyday people. That's informal."],
      reveal: "<b>Formal sanction</b>: from an official group, like police or a school." },
    { id: "lr4", std: "Soc.10", short: "Mead: shortstop = game stage",
      ev: "⚾ A shortstop knows what the pitcher, batter, and runner will do, all at once.",
      ask: "Mead calls this…",
      options: ["The game stage", "The play stage", "The looking-glass self", "The “I”"],
      miss: ["Play stage = one role at a time, like playing house.", "Looking-glass = imagining how others judge you.", "The “I” acts on impulse. This is knowing every role."],
      reveal: "<b>Game stage</b>: many roles at once. <b>Play stage</b>: one at a time." },
    { id: "lr5", std: "Soc.11", short: "Asch: 3 in 4 went along at least once",
      ev: "📏 Asch: alone, almost nobody missed. With a wrong-answer group, 3 in 4 caved at least once.",
      src: "Solomon Asch, line study, 1951",
      ask: "This shows…",
      options: ["Conformity: we bend to match a group", "The lines were too hard to judge", "Most people never go along with groups", "In-group bias: favoring their own team"],
      miss: ["Alone, almost nobody missed. The lines were easy.", "3 in 4 went along at least once.", "No teams here. They changed answers to match the group."],
      reveal: "<b>Conformity</b>: going along with a group, even when it's wrong." },
    { id: "lr6", std: "Soc.11", short: "Tajfel: in-group bias, even for tiny reasons",
      ev: "🎨 Tajfel: boys split by favorite painting. Many gave their own group less, if it beat the other group.",
      src: "Henri Tajfel, Bristol, England, early 1970s",
      ask: "This shows…",
      options: ["In-group bias, even for tiny reasons", "Groups need a real rivalry to form first", "Most boys split the points fairly", "Boys just wanted the most money"],
      miss: ["A painting pick was enough. No rivalry needed.", "Most favored their own group.", "Many took LESS, just to beat the other group."],
      reveal: "<b>In-group bias</b>: favoring “us,” even for tiny reasons." },
    { id: "lr7", std: "Soc.11", short: "Robbers Cave: shared goals ended the fighting",
      ev: "🏕️ Robbers Cave, 1954: prize contests turned two camps of boys into enemies.",
      src: "Muzafer Sherif and others, Oklahoma, 1954",
      ask: "What ended the fighting?",
      options: ["Goals neither group could reach alone", "Eating meals and watching movies together", "More contests with even bigger prizes", "Keeping the two camps fully apart"],
      miss: ["Meals together led to food fights.", "Contests are what started the fighting.", "Apart, nothing changed. Working together did."],
      reveal: "Competition → conflict. <b>Shared goals</b> → cooperation." }
  ];

  const PROMPTS = [
    { id: "theory", short: "Theory that explains #NoBrakes (Soc.4)", label: "1. Why did Darius do #NoBrakes? Use ONE theory.",
      bank: ["🧗 strain theory", "👥 differential association", "🏷️ labeling theory"],
      stem: "___ explains it best because Darius ___.", min: 60, newWords: 6,
      mustAll: [["strain", "merton", "innovat", "differential", "association", "sutherland", "label", "becker"], ["because", "since", "so ", "that's why"]],
      mustMsg: "In answer 1, name ONE theory (strain, differential association, or labeling) AND explain why with “because.”" },
    { id: "self", short: "How others shaped Darius's self (Soc.10)", label: "2. How did other people shape how Darius sees himself?",
      bank: ["🪞 looking-glass self", "🔥 the “I”", "🧠 the “Me”", "🌎 generalized other", "📏 reference group"],
      stem: "Other people shaped Darius's self because ___. This shows ___.", min: 70, newWords: 6,
      mustAll: [["looking-glass", "looking glass", "mirror", "cooley", "mead", "the i ", "the me", "\"i\"", "\"me\"", "“i”", "“me”", "generalized other", "role-taking", "role taking", "reference group"]],
      mustMsg: "In answer 2, name the idea you're using, like the looking-glass self or the “I” and “Me.”" }
  ];

  // ---------------- State ----------------
  const freshLR = () => ({ done: {}, wrong: {}, streak: 0, best: 0 });
  const fresh = () => ({ name: "", step: -1, fx: { case: 0, trust: 5 }, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false, lr: freshLR() });
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

  const caseNow = () => Math.max(0, Math.min(100, 90 + (st.fx.case || 0) - RIGHT_CASE * Object.keys(st.done).length));
  const trustNow = () => Math.max(0, Math.min(10, st.fx.trust));
  const roundWon = i => CHECKS.filter(c => c.r === i).every(c => st.done[c.id]);

  // ---------------- HUD ----------------
  const kaneMood = c => c >= 70 ? "😏" : c >= 45 ? "😐" : c >= 21 ? "😠" : "😰";
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const c = caseNow(), t = trustNow();
    $("caseFill").style.width = c + "%"; $("caseNum").textContent = c + "%";
    $("trustFill").style.width = (t * 10) + "%"; $("trustNum").textContent = t + "/10";
    $("rMood").textContent = kaneMood(c);
    $("youName").textContent = st.name;
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("claims").innerHTML = ROUNDS.map((r, i) => `<span class="${roundWon(i) ? "won" : i === step.r && !["verdict", "lightning", "write"].includes(step.type) ? "now" : ""}">${roundWon(i) ? "✓" : i + 1} ${r.tag}</span>`).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
  }
  function bump(id, delta, goodWhenUp) {
    const el = $(id); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + ((delta > 0) === goodWhenUp ? "good" : "bad");
    f.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  function moved(before) {
    hud();
    const c = caseNow(), t = trustNow();
    bump("mCase", c - before.c, false);
    bump("mTrust", t - before.t, true);
    if (c < before.c) { const r = $("rivalBox"); r.classList.remove("shake"); void r.offsetWidth; r.classList.add("shake"); }
    paintJury();
  }
  const snap = () => ({ c: caseNow(), t: trustNow() });
  function fxChips(fx) {
    const out = [];
    if (fx.case) out.push(`<span class="fx ${fx.case < 0 ? "g" : "b"}">⚖️ ${fx.case > 0 ? "+" : "−"}${Math.abs(fx.case)}</span>`);
    if (fx.trust) out.push(`<span class="fx ${fx.trust > 0 ? "g" : "b"}">💛 ${fx.trust > 0 ? "+" : "−"}${Math.abs(fx.trust)}</span>`);
    return out.join("");
  }
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function juryHtml() {
    const k = Math.round(caseNow() / 100 * 12);
    return `<div class="jury" id="jury" aria-label="Jury: ${k} of 12 lean toward Kane"><span class="jl">The jury · ${k} of 12 lean Kane</span><span class="seats">${Array.from({ length: 12 }, (_, i) => `<span class="${i < k ? "k" : ""}">${i < k ? "😒" : "🙂"}</span>`).join("")}</span></div>`;
  }
  function paintJury() { const j = $("jury"); if (j) j.outerHTML = juryHtml(); }
  function shell(step, sceneHtml, playHtml) {
    const R = ROUNDS[step.r];
    const busted = roundWon(step.r);
    const off = ["verdict", "lightning", "write"].includes(step.type);
    const top = off ? "" :
      `<div class="claimbar"><span class="kface" aria-hidden="true">👨🏻‍💼</span>${say("Kane · claim " + (step.r + 1) + " · " + R.std, R.claim, "kane" + (busted ? " busted" : ""))}</div>`;
    const termsBtn = off ? "" : `<button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Term help</button>`;
    const tq = step.test ? `<p class="tq">🧪 Test question: ${esc(step.test)}</p>` : "";
    app.innerHTML = `<div class="board"><div class="scene${top ? "" : " noclaim"}" id="scene">${top}<p class="kick">${esc(step.kicker)}</p>${sceneHtml}${step.type === "lightning" ? "" : juryHtml()}</div>
      <div class="play" id="play">${tq || termsBtn ? `<div class="ptop">${tq}${termsBtn}</div>` : ""}<div id="termsBox"></div>${playHtml}</div></div>`;
    if ($("termsBtn")) $("termsBtn").onclick = () => {
      const box = $("termsBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="terms">${R.terms.map(t => `<p><b>${t[0]}</b>: ${t[1]}</p>`).join("")}</div>`;
      $("termsBtn").setAttribute("aria-expanded", String(!open));
    };
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "verdict") return "Hear the verdict ▶";
    if (nx.r !== step.r) return "Next: claim " + (nx.r + 1) + " ▶";
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
      <div class="tart" aria-hidden="true"><span class="gavel">🔨</span>
        <div class="cast"><div><span>🧑🏾</span>Darius<small>your client</small></div><div class="k"><span>👨🏻‍💼</span>Kane<small>your rival</small></div></div>
        ${say("Prosecutor Kane", "“He was born reckless.”", "kane")}
        ${ex("Case file", ln("🚗", "70 in a 35. Hit a fence.") + ln("📱", "Filming a #NoBrakes clip.") + ln("🩹", "Nobody hurt."))}
      </div>
      <div class="tcopy">
        <p class="tk">Sociology · Unit 3 Review · Teen Court</p>
        <h1>Born Reckless?</h1>
        <p class="hook">Bust 4 claims. Ace Thursday's test.</p>
        <p class="tline">You're Darius's advocate. What really pushed him?</p>
        <ul class="how"><li><span>🔍</span>Use class evidence</li><li><span>⚖️</span>Make tough calls</li><li><span>🏁</span>Jury decides</li></ul>
        <p class="tline">🎯 Goal: explain how people and groups shape who we become.</p>
        <p class="tchips"><span>⏱️ 20 min</span><span>🔍 7 checks</span><span>⚖️ 4 decisions</span><span>⚡ Lightning round</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Take the case ⚖️</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The people, places and apps are made up. Every study is real and from class. Standards: SS.9-12.Soc.4, Soc.9, Soc.10, Soc.11.</p>
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
      msgEl.innerHTML = `💭 Not quite. ${esc(text)} <span class="cd">${left}</span>`;
      msgEl.className = "msg bad";
      if (left-- <= 0) { locked = false; msgEl.innerHTML = `💭 ${esc(text)} Try again.`; onDone(); return; }
      setTimeout(tick, 1000);
    };
    tick();
  }
  function markWrong(step) {
    const before = snap();
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.fx.case += WRONG_CASE;
    st.lockUntil = Date.now() + LOCK * 1000;
    st.lockMsg = step.hint;
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    const before = snap();
    st.done[step.id] = true; save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check: multiple choice evidence check ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) return solved(step, true);
    draw(step);
    if (lockLeft() > 0) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || step.hint, $("qmsg"), () => draw(step), lockLeft()); }
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
    if (o.n === 0) { btn.classList.add("right"); markRight(step); setTimeout(() => solved(step, false), 450); return; }
    btn.classList.add("wrong");
    const why = (step.miss && step.miss[o.n - 1]) || step.hint;
    markWrong(step); st.lockMsg = why; save();
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Entered as evidence</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; roundStamp(step); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Build: sort rows or assemble an objection (idea + evidence + why) ----
  let bp = {};   // picks in progress for the current build
  function build(step) {
    bp = {};
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="rows"></div><button type="button" class="go lock" id="lockBtn" disabled>${step.obj ? "Object! ⚖️" : "Lock it in ⚖️"}</button><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    $("lockBtn").onclick = () => lockIn(step);
    if (st.done[step.id]) return built(step, true);
    drawRows(step);
    if (lockLeft() > 0) { setRows(true); runLock(st.lockMsg || step.hint, $("qmsg"), () => drawRows(step), lockLeft()); }
  }
  function setRows(off) { document.querySelectorAll("#rows .chip").forEach(x => x.disabled = off); $("lockBtn").disabled = off || Object.keys(bp).length < step0().rows.length; }
  let curBuild = null; const step0 = () => curBuild;
  function drawRows(step) {
    curBuild = step; bp = {};
    const box = $("rows"); if (!box) return;
    const order = step.obj ? step.rows.map((r, i) => i) : shuffle(step.rows.map((r, i) => i));
    const chipOrder = step.shared ? shuffle(step.rows[0].opts.slice()) : null;
    box.innerHTML = order.map(i => {
      const r = step.rows[i];
      const opts = chipOrder || shuffle(r.opts.slice());
      const lab = r.slot ? `<span class="slot">${r.slot}</span>` : `<span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span>`;
      return `<div class="brow" data-i="${i}">${lab}<div class="chips" role="group" aria-label="${esc(r.slot || r.t)}">${opts.map(o => `<button type="button" class="chip" aria-pressed="false" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div></div>`;
    }).join("");
    box.querySelectorAll(".brow").forEach(row => {
      const i = +row.dataset.i;
      row.querySelectorAll(".chip").forEach(ch => ch.onclick = () => {
        if (locked) return;
        bp[i] = ch.dataset.v;
        row.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === ch)));
        $("lockBtn").disabled = Object.keys(bp).length < step.rows.length;
        $("qmsg").textContent = "";
      });
    });
    $("lockBtn").disabled = true;
  }
  function lockIn(step) {
    if (locked || Object.keys(bp).length < step.rows.length) return;
    const nRight = step.rows.filter((r, i) => bp[i] === r.opts[0]).length;
    if (nRight === step.rows.length) { markRight(step); return built(step, false); }
    const text = `${nRight} of ${step.rows.length} right. ${step.hint}`;
    markWrong(step); st.lockMsg = text; save();
    setRows(true);
    runLock(text, $("qmsg"), () => drawRows(step), LOCK);
  }
  function built(step, quiet) {
    curBuild = step;
    const box = $("rows");
    box.innerHTML = step.rows.map(r => `<div class="brow ok">${r.slot ? `<span class="slot">${r.slot}</span>` : `<span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span>`}<span class="got">✓ ${esc(r.opts[0])}</span></div>`).join("");
    if (step.obj) {
      box.insertAdjacentHTML("beforeend", `<p class="objline"><b>Objection:</b> ${esc(step.rows[0].opts[0])}. ${esc(step.rows[1].opts[0])}, so ${esc(step.rows[2].opts[0].charAt(0).toLowerCase() + step.rows[2].opts[0].slice(1))}.</p>`);
    }
    $("lockBtn").remove();
    if (!quiet) {
      $("qmsg").textContent = "";
      roundStamp(step);
    } else if (roundWon(step.r) && lastInRound(step)) { stamp("CLAIM BUSTED", "huge stay"); }
    addNext(step, step.reveal, quiet);
  }

  // The round's last check busts Kane's claim.
  const lastInRound = step => { const cs = CHECKS.filter(c => c.r === step.r); return cs[cs.length - 1] === step; };
  function roundStamp(step) {
    if (roundWon(step.r) && lastInRound(step)) {
      stamp("CLAIM BUSTED", "huge stay");
      const k = document.querySelector(".claimbar .say"); if (k) k.classList.add("busted");
      hud();
    } else stamp(step.stamp);
  }

  // ---- Event: a real decision ----
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><span class="fxrow">${fxChips(c.fx)}</span></button>`; }).join("")}</div>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      const before = snap();
      st.picks[step.id] = i;
      st.fx.case += c.fx.case || 0;
      st.fx.trust = Math.max(0, Math.min(10, st.fx.trust + (c.fx.trust || 0)));
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span>${esc(c.t)}</span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${esc(c.res)}</p>`;
    if (!quiet) stamp(c.fx.case < 0 ? "EVIDENCE ADDED" : "KANE GAINS", c.fx.case < 0 ? "" : "bad");
    addNext(step, step.reveal, quiet);
  }

  // ---- ⚡ Lightning round: fast one-tap questions. Streak + cheering gallery, no score shown, no countdown. ----
  const lrNext = () => LR.findIndex(q => !st.lr.done[q.id]);
  const streakTxt = k => k ? `🔥 <b>${k}</b> in a row` : "🔥 Start a streak!";
  const strip = h => String(h).replace(/<[^>]+>/g, "");
  function lrScene() {
    const n = lrNext(), k = st.lr.streak || 0;
    return `<div class="lrhead"><span class="bolt" aria-hidden="true">⚡</span><h2>Lightning Round</h2></div>
      ${say("Prosecutor Kane", "“Court's done. One more round, rookie.”", "kane")}
      <div class="pips" id="lrPips" aria-label="Question ${n < 0 ? LR.length : n + 1} of ${LR.length}">${LR.map((q, i) => `<span class="${st.lr.done[q.id] ? "lit" : i === n ? "now" : ""}" aria-hidden="true">⚡</span>`).join("")}</div>
      <div class="streak${k >= 2 ? " hot" : ""}" id="lrStreak">${streakTxt(k)}</div>
      <div class="gallery" id="gallery" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<span style="animation-delay:${i * 0.06}s">🙂</span>`).join("")}</div>`;
  }
  function lightning(step) {
    shell(step, lrScene(), `<div id="lrPlay"></div><div id="after"></div>`);
    if (lrNext() < 0) return lrDone(step, true);
    lrCard(step, false);
    if (lockLeft() > 0 && st.lockLR === LR[lrNext()].id) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || "", $("qmsg"), () => lrOptions(step), lockLeft()); }
  }
  function lrCard(step, anim) {
    const q = LR[lrNext()];
    $("lrPlay").innerHTML = `<div class="lrcard${anim ? " flipin" : ""}" id="lrCard">
        <p class="lrn">⚡ ${lrNext() + 1} / ${LR.length}</p>
        <p class="lrev">${esc(q.ev)}</p>${q.src ? src(esc(q.src)) : ""}
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
    const why = (q.miss && q.miss[o.n - 1]) || "Look at the evidence again.";
    st.lr.wrong[q.id] = (st.lr.wrong[q.id] || 0) + 1;
    st.lr.streak = 0;
    st.lockUntil = Date.now() + LR_LOCK * 1000; st.lockMsg = why; st.lockLR = q.id;
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
    const best = st.lr.best || 0;
    $("lrPlay").innerHTML = `<div class="lrcard lrend${quiet ? "" : " flipin"}"><p class="big" aria-hidden="true">⚡🏆⚡</p><h3>Round cleared!</h3><p class="lrbest">🔥 Best streak: <b>${best}</b> in a row</p><p class="lrev">Kane packs up his files. 👏 The gallery is on its feet.</p></div>`;
    const g = $("gallery"); if (g) g.querySelectorAll("span").forEach((s, i) => s.textContent = ["🙌", "👏", "🤩", "📣", "🥳"][i % 5]);
    if (!quiet) stamp("KANE SILENCED", "huge stay");
    addNext(step, null, quiet);
    const b = $("nextBtn"); if (b) b.textContent = "✏️ Make your closing argument ▶";
  }

  // ---- Endings ----
  function ending() {
    const c = caseNow(), t = trustNow();
    let e;
    if (c <= GOAL.case && t >= GOAL.trust) e = { key: "Fix-It Plan", out: "Fix-it plan", icon: "🌱", cls: "best", text: "40 hours of service, a safe-driving class, and a mentor. If Darius finishes, no record." };
    else if (c <= GOAL.case) e = { key: "Plan on Paper", out: "Fix-it plan, but Darius checked out", icon: "📄", cls: "mid", text: "The jury picks the fix-it plan. But Darius stopped trusting you. He skips his first mentor meeting." };
    else if (c <= 45) e = { key: "Probation + Fine", out: "Probation + fine", icon: "⚖️", cls: "mid", text: "A year of check-ins and a $300 fine. Some jurors still think he's “that kind of kid.”" };
    else e = { key: "Regular Court", out: "Sent to regular court", icon: "🏛️", cls: "low", text: "Darius could get a record. Remember Milwaukee: a record cut job calls back in half." };
    const causes = EVENTS.filter(s => st.picks[s.id] != null).map(s => { const k = s.cards[st.picks[s.id]]; return k.cause + " " + fxPlain(k.fx); });
    const w = Object.values(st.wrong).reduce((a, b) => a + b, 0);
    if (w) causes.push("Shaky answers helped Kane's case");
    if (c <= GOAL.case && t < GOAL.trust) causes.push("💛 Trust fell under " + GOAL.trust);
    e.causes = causes;
    return e;
  }
  const fxPlain = fx => "(" + [fx.case ? "⚖️ " + (fx.case > 0 ? "+" : "−") + Math.abs(fx.case) : "", fx.trust ? "💛 " + (fx.trust > 0 ? "+" : "−") + Math.abs(fx.trust) : ""].filter(Boolean).join(" ") + ")";

  function verdict(step) {
    const e = ending();
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">⚖️ Kane's case ${caseNow()}% · 💛 Trust ${trustNow()}/10</p></div><div id="after"></div>`);
    stamp(e.key.toUpperCase(), (e.cls === "best" ? "" : "bad") + " huge");
    const b = nextBtn(step); b.textContent = "⚡ Lightning round ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="clip"><p class="cbh">📋 Teen Court · Closing argument</p><p><b>Verdict:</b> ${e.icon} ${esc(e.key)}</p><p>Thursday's test asks questions just like these.</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: add a real study or detail from class.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Rest your case + turn in ▶"}</button>
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
      const bad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
        if (junk) { msg.textContent = "For answer " + (PROMPTS.indexOf(p) + 1) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return bad("Write a little more for answer " + (PROMPTS.indexOf(p) + 1) + " (1–2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words in answer " + (PROMPTS.indexOf(p) + 1) + ".");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas in answer " + (PROMPTS.indexOf(p) + 1) + ". Use details from the case.");
      if (p.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return bad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    const answers = { "Standard": STANDARD };
    const ALL = CHECKS.map(c => ({ std: c.std, miss: st.wrong[c.id] })).concat(LR.map(q => ({ std: q.std, miss: st.lr.wrong[q.id] })));
    answers["First-try correct"] = ALL.filter(c => !c.miss).length + " of " + ALL.length;
    const byStd = {};
    ALL.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!c.miss) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort((a, b) => parseFloat(a.split(".")[1]) - parseFloat(b.split(".")[1])).map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    STEPS.forEach(s => {
      if (s.type === "event" && st.picks[s.id] != null) answers["Choice · " + s.short] = s.cards[st.picks[s.id]].t;
      if (s.type === "check" || s.type === "build") {
        const w = st.wrong[s.id];
        const ans = s.type === "check" ? s.options[0] : s.rows.map(r => (r.slot ? r.slot.replace(/^\S+\s/, "") : r.t) + " = " + r.opts[0]).join(" · ");
        answers[s.std + " · " + s.short] = ans + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    LR.forEach(q => {
      const w = st.lr.wrong[q.id];
      answers[q.std + " · ⚡ " + q.short] = q.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    answers["⚡ Lightning best streak"] = (st.lr.best || 0) + " in a row";
    answers["Jury outcome"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Kane's case (end)"] = caseNow() + "%";
    answers["Darius's trust (end)"] = trustNow() + " of 10";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Case closed!"; msg.className = "msg good";
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
    if (step.type === "build") return build(step);
    if (step.type === "event") return event(step);
    if (step.type === "verdict") return verdict(step);
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
