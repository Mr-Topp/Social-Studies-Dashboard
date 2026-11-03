// =====================================================================
//  RESEARCH RIVALS  (Sociology · Unit 1 · Day 6 · How Should We Study People?)
//  You run Cedar River Research Co. Each client brings a question about people.
//  You play a METHOD CARD (survey, interview, observation, experiment, content
//  analysis). Each card costs money and days. The wrong card = a garbage report
//  you have to redo. A shortcut setup = a report the rival agency can expose.
//  Money and days carry forward; the last job needs two methods, and only
//  careful players can afford it. Five evidence checks are woven into play.
//  Everything plays in English underneath; es.js + shared/lang.js swap the
//  words on screen for the Spanish reader.
// =====================================================================
(function () {
  "use strict";

  const KEY = "soc-u1-d6-study-people-v2";
  const ASSIGNMENT_ID = "soc-u1-d6-study-people";
  const TITLE = "Sociology · Unit 1 · Day 6 · How Should We Study People?";
  const STANDARD = "SS.9-12.Soc.1, SS.9-12.Soc.3";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;
  const START = { money: 1000, days: 51, rep: 5, hype: 2 };  // 51 (was 48): room for one honest wrong card before the 2-card final job
  const TOTAL_STEPS = 18;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const cash = n => (n < 0 ? "−" : "") + "$" + Math.abs(n).toLocaleString("en-US");
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (isEs() ? window.SiteLang.t(s) : s);

  // ---------------- The method cards ----------------
  const ORDER = ["survey", "interview", "observe", "experiment", "content"];
  const M = {
    survey:     { icon: "📋", name: "Survey", what: "Same questions to many people.", shows: "How common something is", limit: "People may skip, misread, or say what sounds good.", cost: 300, days: 3, reach: 5, depth: 1 },
    interview:  { icon: "🎙️", name: "Interview", what: "Talk with people. Ask follow-up questions.", shows: "The reasons and story behind an answer", limit: "Slow, so the group is small.", cost: 500, days: 6, reach: 1, depth: 5 },
    observe:    { icon: "👀", name: "Observation", what: "Watch and record what people do in a real place.", shows: "What people actually do", limit: "People may act different when watched.", cost: 300, days: 5, reach: 3, depth: 3 },
    experiment: { icon: "🧪", name: "Experiment", what: "Change one thing. Compare two groups.", shows: "Whether a change causes a result", limit: "Costs a lot. A test can feel fake.", cost: 800, days: 7, reach: 2, depth: 3 },
    content:    { icon: "📺", name: "Content Analysis", what: "Count patterns in ads, posts, songs, or news.", shows: "What messages media sends", limit: "Can't tell what the creator meant.", cost: 200, days: 3, reach: 4, depth: 2 }
  };

  // ---------------- Little drawing helpers ----------------
  const bars = (rows, note) => `<div class="bars">${rows.map(r => `<div class="brow"><span class="bl">${r[0]}</span><span class="bt"><i style="width:${Math.min(100, r[2] || r[1])}%"></i></span><b class="bv">${r[3] || r[1] + "%"}</b></div>`).join("")}</div><p class="madeup">${note || "Made-up game data"}</p>`;
  const quote = q => `<blockquote class="quote">${q}</blockquote>`;
  const post = (txt, likes) => `<div class="post"><div class="p-ava" aria-hidden="true">🔥</div><div class="p-body"><div class="p-head"><b>Hot Take Analytics</b> <span class="handle">@HotTakeAnalytics</span></div><p class="p-text">${txt}</p><div class="p-meta" aria-hidden="true">❤️ ${likes || "1.2K"} · 🔁 ${Math.round(parseFloat(likes || "1.2") * 280)}</div></div></div>`;
  const quiet = () => `<div class="post quiet"><div class="p-ava" aria-hidden="true">😤</div><div class="p-body"><p class="p-text">Blake read your report three times. He couldn't find a hole.</p></div></div>`;
  // A character talking in a speech bubble.
  const say = (av, who, txt, cls) => `<div class="say ${cls || ""}"><span class="say-ava" aria-hidden="true">${av}</span><div class="say-b"><span class="say-n">${who}</span><p>${txt}</p></div></div>`;
  const unlock = html => `<div class="unlock"><span class="u-ic" aria-hidden="true">💡</span><div><p class="u-tag">Concept unlocked</p><p class="u-txt">${html}</p></div></div>`;

  // ---------------- The six jobs ----------------
  const JOBS = [
    { id: "j1", icon: "🧑‍💼", who: "Linn County Teen Jobs Center", pay: 600, best: "survey",
      ask: "People keep saying all the teens have jobs now. Is that true? How many high schoolers here work during the school year?",
      fits: {
        interview: { fit: "wrong", text: "You talked with 8 teens. Great stories. But the client asks, \"So what PERCENT work?\" You can't tell from 8 people." },
        observe: { fit: "wrong", text: "You watched a fast-food drive-thru for a week. You saw 6 teens working. That doesn't tell you how many teens in the county work." },
        experiment: { fit: "wrong", text: "What would you even change? You can't assign teens to get jobs. There's nothing to test." },
        content: { fit: "wrong", text: "You counted 140 \"Now Hiring\" posts. That shows jobs are open, not how many teens have one." }
      },
      preCheck: "c1",
      setup: {
        A: { icon: "🌙", title: "9 p.m. link only", label: "Send an online link at 9 p.m. only", sub: "Free and fast. Online only.", cost: 0, days: 0 },
        B: { icon: "📝", title: "Paper + online, all day", label: "Paper survey in class + online link, any time", sub: "Reaches night-shift teens.", cost: 200, days: 1 }
      },
      solid: { data: () => bars([["Work during the school year", 38], ["Don't work", 62]]), text: "1,140 teens answered, from every school and every shift.",
        reveal: "<b>Survey</b> = the same questions to many people. It shows <b>how common</b> something is." },
      shaky: { data: () => bars([["Work during the school year", 19], ["Don't work", 81]]), text: "Only 19% work? The Jobs Center says that can't be right.",
        rival: "Cedar River sent their survey at 9 p.m. Guess who's AT WORK at 9 p.m.? 🤡",
        reveal: "<b>Sampling bias</b>: your 9 p.m. link left out teens on night shifts, the exact people you were counting." },
      logSolid: "Survey with a fair sample", logShaky: "9 p.m. survey link: exposed for sampling bias"
    },
    { id: "j2", icon: "🩺", who: "Iowa Teen Health Group", pay: 500, best: "content",
      ask: "Energy-drink ads are all over teens' feeds. How do those ads show teens?",
      fits: {
        survey: { fit: "wrong", text: "You asked 300 teens what they THINK of the ads. The client asked what the ADS show. You never looked at one ad." },
        interview: { fit: "wrong", text: "Four teens told you energy drinks taste like batteries. Funny. But you still don't know what the ads show." },
        observe: { fit: "wrong", text: "You watched teens scroll in study hall. They scrolled too fast to see the ads, and they kept looking at you." },
        experiment: { fit: "wrong", text: "You showed one group an ad and one group nothing. That tests what an ad DOES, not what ads SHOW." }
      },
      setup: {
        A: { icon: "📱", title: "Your own feed", label: "Screenshot ads from your own feed", sub: "Free. Screenshot your ads.", cost: 0, days: 0 },
        B: { icon: "🎲", title: "200 random ads + rules", label: "Random sample of 200 ads + written counting rules", sub: "Others could repeat your count.", cost: 100, days: 2 }
      },
      solid: { data: () => bars([["Athletes", 44], ["Gamers", 27], ["Partying", 18], ["Studying", 11]], "Share of 200 ads · made-up game data"), text: "200 ads, all counted with the same rules.",
        reveal: "<b>Content analysis</b> = pick a sample of media, make categories, and count. It shows what <b>messages</b> media sends." },
      shaky: { data: () => bars([["Gamers", 70], ["Athletes", 20], ["Partying", 10]], "Share of your screenshots · made-up game data"), text: "Your feed shows gaming ads because YOU watch gaming videos.",
        rival: "Cedar River's big \"study\" = one guy's For You page. 💀",
        reveal: "<b>Sampling bias</b> again: your own feed is picked for YOU, so it doesn't show what most teens see." },
      check: "c2",
      logSolid: "Fair sample of 200 ads", logShaky: "Used own feed: exposed"
    },
    { id: "j3", icon: "🏫", who: "School counselor, Prairie Ridge High", pay: 800, best: "interview",
      ask: "A lot of our juniors stop showing up after winter break. I don't need a number. I need to understand WHY.",
      fits: {
        survey: { fit: "ok", data: () => bars([["Other", 41], ["Work", 22], ["Bored", 22], ["Sick", 15]]), text: "41% picked \"Other.\" The counselor sighs. \"Okay, but WHY?\"",
          rival: "Cedar River's survey says the #1 reason is \"Other.\" Wow. Big discovery. 🙄",
          reveal: "A survey shows <b>how many</b>. This client asked <b>why</b>. That's an interview's job." },
        observe: { fit: "wrong", text: "You sat in the hallway for a week. The students who stopped coming... weren't there to watch." },
        experiment: { fit: "wrong", text: "You can't make some students drop out just to compare. There's nothing fair to test, and it would hurt people." },
        content: { fit: "wrong", text: "You counted posts on the school's page. Lots of pep rallies. Nothing about why kids stop coming." }
      },
      setup: {
        A: { icon: "👥", title: "Just 6 students", label: "Talk with 6 students this week", sub: "Fast and free.", cost: 0, days: 0 },
        B: { icon: "🔒", title: "20 students, no names", label: "Talk with 20 students. Report patterns, not names.", sub: "Slower. Protects privacy.", cost: 300, days: 4 }
      },
      solid: { data: () => quote("\"I work nights to help my mom with rent. By 8 a.m. I'm too tired to care.\"") + quote("\"After I got behind, it felt like there was no point.\"") + quote("\"They cut my bus route. My ride leaves at 6.\"") + `<p class="madeup">Made-up quotes. Patterns in 20 talks: work, falling behind, rides.</p>`,
        text: "Real reasons, in their own words, from 20 different students.",
        reveal: "<b>Interview</b> = talk with people and ask follow-ups. It shows the <b>reasons and story</b> behind an answer." },
      shaky: { data: () => quote("\"I just stopped caring, I guess.\"") + quote("\"My friends stopped coming, so I did too.\"") + `<p class="madeup">Made-up quotes. 4 of your 6 students are from the same friend group.</p>`,
        text: "Six good talks, but mostly one friend group.",
        rival: "6 kids. SIX. That's not a pattern, that's a lunch table. 🍕",
        reveal: "Interviews go deep, but they're slow, so the group is <b>small</b>. Too small, and it may not stand for everyone." },
      check: "c3",
      logSolid: "Interviewed 20 students, kept names private", logShaky: "Only 6 interviews: exposed", logOk: "Survey for a WHY question: half the story"
    },
    { id: "j4", icon: "🍕", who: "Lunch manager, Prairie Ridge High", pay: 600, best: "observe",
      ask: "Lunch is a mess. Kids say one thing, staff say another. Where do the lines ACTUALLY back up?",
      fits: {
        survey: { fit: "ok", data: () => bars([["Pizza line", 58], ["Card reader", 30], ["Salad bar", 12]], "Where students SAY it's worst · made-up game data"), text: "Students SAY the pizza line is worst. The manager asks, \"But is that where it actually backs up?\" You can't tell.",
          rival: "Cedar River asked kids where the line is. Bro, just go LOOK. 👀",
          reveal: "People don't always remember right. When the question is what people <b>do</b>, watch them. That's <b>observation</b>." },
        interview: { fit: "wrong", text: "Three long talks about lunch feelings. Deep, but nobody can tell you which minute the line jams." },
        experiment: { fit: "wrong", text: "You moved the salad bar to test it... before you even knew where the jam was. Now it's worse." },
        content: { fit: "wrong", text: "You counted lunch posts online. Lots of pizza pics. Zero line data." }
      },
      setup: {
        A: { icon: "📋", title: "2 days with a clipboard", label: "Stand by the lines with a clipboard for 2 days", sub: "Quick. Everyone sees you.", cost: 0, days: 0 },
        B: { icon: "🕶️", title: "All week, no faces", label: "Come back all week so people get used to you. Count, don't film faces.", sub: "People get used to you.", cost: 200, days: 3 }
      },
      solid: { data: () => bars([["Card reader", 31, 100, "31"], ["Pizza line", 12, 39, "12"], ["Salad bar", 3, 10, "3"]], "Students in line at 11:40 · made-up game data"), text: "The real jam: the ONE card reader at 11:40.",
        reveal: "<b>Observation</b> = watch and record what people do in a real place. It shows what people <b>actually do</b>, not just what they say." },
      shaky: { data: () => bars([["Card reader", 8, 26, "8"], ["Pizza line", 9, 29, "9"], ["Salad bar", 3, 10, "3"]], "Students in line at 11:40 · made-up game data"), text: "Lines looked short and neat. The manager says, \"That's not what I see every day.\"",
        rival: "Cedar River says our lunch lines are \"fine.\" Have they MET teenagers? 😂",
        reveal: "Two days with a clipboard wasn't enough. People acted their best because they knew you were watching." },
      check: "c4",
      logSolid: "Watched all week, no faces filmed", logShaky: "2 days with a clipboard: exposed", logOk: "Survey for a DO question: half the story"
    },
    { id: "j5", icon: "📱", who: "StudyStreak, a homework app company", pay: 1200, best: "experiment",
      ask: "Our app adds streaks and prizes to homework. Does it actually RAISE test scores? Our investors want proof.",
      fits: {
        survey: { fit: "ok", data: () => bars([["Users who say it helps", 92]]), text: "92% of users SAY it helps. The investors say, \"Saying it helps isn't proof it raises scores.\"",
          rival: "\"92% say it works!\" My cousin says he's 6'5\". Doesn't make it true. 📏",
          reveal: "To test if something <b>causes</b> a result, you need an <b>experiment</b> with a control group." },
        interview: { fit: "wrong", text: "Five users loved the confetti. Nice stories, but stories don't prove scores went up." },
        observe: { fit: "wrong", text: "You watched kids tap the app. Lots of tapping. You still don't know if it changed their scores." },
        content: { fit: "wrong", text: "You counted the app's ads. They all say \"Ace your test!\" That's their claim, not proof." }
      },
      setup: {
        A: { icon: "📲", title: "App for everyone", label: "Give the app to everyone. Check scores after.", sub: "Check scores after.", cost: 0, days: 0 },
        B: { icon: "⚖️", title: "Two groups + consent", label: "Two groups: one uses the app, one doesn't (a control group). Get signed consent first.", sub: "One group gets no app.", cost: 300, days: 2 }
      },
      solid: { data: () => bars([["App group: before", 72, 72, "72"], ["App group: after", 76, 76, "76"], ["No-app group: before", 72, 72, "72"], ["No-app group: after", 75, 75, "75"]], "Average test score · made-up game data"), text: "Both groups went up. The app group went up just 1 point more.",
        reveal: "<b>Experiment</b> = change one thing and compare to a <b>control group</b> that gets no change. It's the best way to test <b>cause and effect</b>." },
      shaky: { data: () => bars([["Before the app", 72, 72, "72"], ["After the app", 75, 75, "75"]], "Average test score · made-up game data"), text: "Scores went up 3 points. The client is thrilled.",
        rival: "\"Scores went up after the app!\" So did the temperature. No control group = no proof. 🧪❌",
        reveal: "With no <b>control group</b>, you can't tell if the app did it, or a new teacher, or a practice test." },
      check: "c5", bonus: true,
      logSolid: "Experiment with a control group and consent", logShaky: "No control group: exposed", logOk: "Survey for a CAUSE question: no proof"
    },
    { id: "j6", icon: "🏛️", who: "City council member, Marion", pay: 1500, final: true,
      ask: "Young people keep moving away after high school. How many plan to leave, and why? We'll use your report to plan jobs and housing."
    }
  ];

  // ---------------- Evidence checks (first option is right; screen shuffles) ----------------
  const CHECKS = {
    c1: { std: "Soc.1", short: "1936 poll = biased sample", label: "🔒 Evidence check · unlocks your survey setup",
      evidence: () => post("We already polled 10,000 people on our app. Bigger = better. 😎", "3.4K") +
        `<div class="casefile"><p class="cf-tag">📁 Real case file · The Literary Digest poll, 1936</p><p>The magazine mailed 10 million ballots and got about 2.4 million back. It said Alf Landon would beat President Roosevelt.</p><p>Roosevelt won 46 of 48 states. The names came mostly from phone books and car records. In 1936, many poorer voters had neither.</p><p class="src">Source: Literary Digest poll, fall 1936; Salganik, <i>Bit by Bit</i> (2018).</p></div>`,
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "Blake says bigger is better. Look at the case file. Why was the giant 1936 poll wrong?",
      options: ["Its sample didn't look like all voters", "It asked too few people to trust it", "Most voters changed their minds late", "Its ballots were mailed out too early"],
      hint: "Reread where the names came from. Who didn't have a phone or a car in 1936?",
      why: "<b>Sampling bias</b>: if a study leaves people out, the results can be wrong. Who you ask matters more than how many. (George Gallup, who grew up in Iowa, asked far fewer people, picked more fairly, and got it right.)" },
    c2: { std: "Soc.3", short: "Content analysis can't show what creators meant", label: "🔒 Evidence check · reply to Blake to get paid",
      evidence: () => post("LOL their own ad count PROVES drink companies WANT teens to skip school and party! 🎉", "2.1K"),
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "Let's reply to Blake. What can an ad count NOT tell you?",
      options: ["What the ad makers meant or wanted", "How often each kind of ad showed up", "Which kinds of teens the ads showed", "How many ads were in the sample"],
      hint: "Your count shows what's IN the ads. Does it show what's in the ad makers' heads?",
      why: "Right. Content analysis shows what messages appear, but it <b>can't tell what the creator meant</b>." },
    c3: { std: "Soc.3", short: "Interviews show the reasons behind a number", label: "🔒 Evidence check · file your report",
      evidence: () => `<div class="twobox"><div class="tb"><p class="tb-h">📋 Survey says</p><p class="bignum">22%</p><p>picked "Work"</p></div><div class="tb"><p class="tb-h">🎙️ Interview says</p><p>"I work nights to help my mom with rent. By 8 a.m. I'm too tired to care."</p></div></div><p class="madeup">Made-up game data</p>`,
      asker: ["🏫", "The counselor"], prompt: "What does the interview give me that the survey number doesn't?",
      options: ["Why it's happening, in the students' words", "Answers from many more students at once", "Proof that jobs cause every absence", "A count of how common the problem is"],
      hint: "The number says how many. What does the quote add?",
      why: "Interviews show <b>why</b>. Surveys show <b>how many</b>. Each one covers what the other misses." },
    c4: { std: "Soc.3", short: "Hawthorne effect: people act different when watched", label: "🔒 Evidence check · file your report",
      evidence: () => `<div class="notes"><p class="cf-tag">📓 Field notes from a researcher in this lunchroom (made up)</p><p><b>Day 1:</b> I stood there with my clipboard. Students lined up neatly. A lunch aide said, "They're never this good."</p><p><b>Day 4:</b> Nobody noticed me anymore. The card-reader line stretched to the door.</p></div>`,
      asker: ["👩🏽‍💻", "Dee, your partner"], prompt: "What problem do these field notes show?",
      options: ["People act different when they know they're watched", "The lunchroom was too crowded to count anyone", "Students gave dishonest answers on a survey", "Observation only works if it lasts one day"],
      hint: "Compare Day 1 to Day 4. What changed once nobody noticed the clipboard?",
      why: "That's the <b>Hawthorne effect</b>: people change how they act when they know they're being watched. It's named after a 1920s factory study near Chicago." },
    c5: { asker: ["💼", "The investors"], std: "Soc.1", short: "Control group shows if a change caused the result", label: "🔒 Evidence check · answer the investors",
      // Two versions: one for players who ran a control group, one for players who didn't.
      variants: {
        A: { evidence: () => bars([["App group: before", 72, 72, "72"], ["App group: after", 76, 76, "76"], ["No-app group: before", 72, 72, "72"], ["No-app group: after", 75, 75, "75"]], "Your results · made-up game data"),
          prompt: "What do your two groups show?",
          options: ["Both groups rose, so the app added very little", "The app raised scores by four whole points", "The no-app group shows the app hurt scores", "Only the students using the app got better"],
          hint: "Look at BOTH groups. How much did the no-app group go up too?" },
        B: { evidence: () => bars([["Before the app", 72, 72, "72"], ["After the app", 75, 75, "75"]], "StudyStreak's own numbers · made-up game data") + post("No control group = no proof. 🧪❌", "4.0K"),
          prompt: "Blake has a point. Why can't anyone prove the app raised scores?",
          options: ["Nobody compared them to a group without the app", "Three points is too small to count in a study", "Test scores can't be measured with numbers", "Too many students used the app at one time"],
          hint: "What would you need to compare the app users to?" }
      },
      why: "A <b>control group</b> gets no change. Comparing to it is how you know if the change <b>caused</b> the result." }
  };
  const CHECK_IDS = ["c1", "c2", "c3", "c4", "c5"];

  // ---------------- Writing ----------------
  const PROMPTS = [
    { id: "method", short: "My question, method, strength, and limit",
      label: "1. Pitch a new study: pick a question about school or teen life. Which method would you use, and why?",
      stem: "My question is ___. I would use ___ because ___. One strength is ___, but one limit is ___.",
      min: 80, newWords: 6,
      mustAll: [["survey", "interview", "observ", "experiment", "content analysis", "content", "ads", "media"], ["limit", "but", "however", "slow", "small", "watched", "lie", "honest", "cost", "can't", "cannot", "weak", "although", "fake", "time"]],
      mustMsg: "In answer 1, name a method (survey, interview, observation, experiment, or content analysis) AND one limit." },
    { id: "mixed", short: "Why two methods beat one",
      label: "2. Memo to the city council: why is a survey AND interviews stronger than just one of them?",
      stem: "Using both is stronger because the survey shows ___, and the interviews show ___.",
      min: 60, newWords: 4,
      mustAll: [["how many", "how common", "number", "numbers", "percent", "%", "many", "pattern", "count", "lots of"], ["why", "reason", "story", "stories", "feel", "detail", "explain", "cause"]],
      mustMsg: "In answer 2, say what the survey shows (like how many) AND what the interviews show (like why)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ v: 2, name: "", started: false, job: 0, phase: "pick", sel: {}, tried: {}, garbage: {}, pick: {}, setup: {}, fit: {}, paid: {},
    checks: {}, bonus: null, finalSel: [], finalPick: null, finalFit: null, leak: false, ending: null,
    money: START.money, days: START.days, rep: START.rep, hype: START.hype, log: [], writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 2) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this device now, don't show the last kid's game or writing.
  try {
    const who = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (st.started && who && st.name && who.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const clamp = () => { st.rep = Math.max(0, Math.min(10, st.rep)); st.hype = Math.max(0, Math.min(10, st.hype)); };
  const addLog = (job, text, delta, kind) => st.log.push({ job, text, delta, kind: kind || (String(delta).indexOf("−") === 0 ? "down" : "up") });

  let locked = false, lockTimer = null, anim = true, justSolved = null;
  const app = $("app");

  function stepNow() {
    if (!st.started) return 0;
    if (st.phase === "end") return 18;
    if (st.job === 5) return st.phase === "pick" ? 16 : 17;
    return st.job * 3 + (st.phase === "pick" ? 1 : st.phase === "setup" ? 2 : 3);
  }

  // ---------------- HUD ----------------
  function hud() {
    const h = $("hud");
    if (!st.started) { h.hidden = true; return; }
    h.hidden = false;
    const jobN = Math.min(6, st.job + 1);
    $("hudJob").textContent = st.phase === "end" ? "Season over" : "Job " + jobN + " of 6";
    $("hudDots").innerHTML = JOBS.map((j, i) => `<i class="${i < st.job || st.phase === "end" ? "done" : i === st.job ? "now" : ""}"></i>`).join("");
    $("hudMoney").textContent = cash(st.money);
    $("hudMoney").parentElement.classList.toggle("neg", st.money < 0);
    $("hudDays").textContent = String(st.days);
    $("hudDays").parentElement.classList.toggle("neg", st.days < 0);
    $("repFill").style.width = st.rep * 10 + "%";
    $("repNum").textContent = st.rep + "/10";
    $("hypeFill").style.width = st.hype * 10 + "%";
    $("hypeNum").textContent = st.hype + "/10";
    const mood = $("blakeMood");
    if (mood && mood.textContent !== (st.mood || "😎")) { mood.textContent = st.mood || "😎"; bounce(mood); }
    const cur = { money: st.money, days: st.days, rep: st.rep, hype: st.hype };
    if (prevHud) {
      floatDelta("hudMoney", cur.money - prevHud.money, true);
      floatDelta("hudDays", cur.days - prevHud.days);
      floatDelta("repNum", cur.rep - prevHud.rep);
      floatDelta("hypeNum", cur.hype - prevHud.hype, false, true);
    }
    prevHud = cur;
  }
  let prevHud = null;
  function bounce(el) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
  function floatDelta(id, d, money, badUp) {
    if (!d) return;
    const host = $(id) && $(id).closest(".tok,.meter");
    if (!host) return;
    const f = document.createElement("span");
    const good = badUp ? d < 0 : d > 0;
    f.className = "float " + (good ? "up" : "down"); f.setAttribute("aria-hidden", "true");
    f.textContent = (d > 0 ? "+" : "−") + (money ? "$" + Math.abs(d).toLocaleString("en-US") : Math.abs(d));
    host.appendChild(f);
    setTimeout(() => f.remove(), 1600);
  }
  function flash(id) { const el = $(id); if (el) bounce(el); }

  // ---------------- Pieces ----------------
  function clientCard(j) {
    return `<div class="client"><div class="c-ava" aria-hidden="true">${j.icon}</div><div class="c-body">
      <p class="c-who"><span class="c-tag">📞 New client</span> <b>${j.who}</b> <span class="fict">Made-up client</span></p>
      <p class="c-ask">“<span>${j.ask}</span>”</p>
      <p class="c-pay"><span class="coin" aria-hidden="true">💰</span> <span>Pays</span> <b>${cash(j.pay)}</b></p></div></div>`;
  }
  const kick = (n, label) => `<p class="kicker"><span>Job ${n} of 6</span>${label ? ` · <span>${label}</span>` : ""}</p>`;
  function pips(n) { return "●●●●●".slice(0, n) + `<span class="off">${"●●●●●".slice(0, 5 - n)}</span>`; }
  function cardHtml(k, opts) {
    const m = M[k], o = opts || {};
    return `<button type="button" class="mcard m-${k}${o.sel ? " sel" : ""}${o.tried ? " tried" : ""}" data-m="${k}" aria-pressed="${o.sel ? "true" : "false"}"${o.tried || o.off ? " disabled" : ""}>
      ${o.tried ? `<span class="stampmini">🗑️ <span>Garbage</span></span>` : ""}
      <span class="mc-top"><span class="mc-icon" aria-hidden="true">${m.icon}</span><span class="mc-name">${m.name}</span></span>
      <span class="mc-what">${m.what}</span>
      <span class="mc-shows"><span class="mc-lab">Best at:</span> <span>${m.shows}</span></span>
      <span class="mc-limit"><span aria-hidden="true">⚠</span> <span>${m.limit}</span></span>
      <span class="mc-pips"><span class="pl">Reach</span> <span class="pv">${pips(m.reach)}</span> <span class="pl">Depth</span> <span class="pv">${pips(m.depth)}</span></span>
      <span class="mc-cost"><span>💵 ${cash(m.cost)}</span><span>📅 <span>${m.days} days</span></span></span>
    </button>`;
  }
  function stamp(kind) {
    const t = { solid: ["✅", "SOLID REPORT"], shaky: ["⚠️", "SHAKY REPORT"], ok: ["🟡", "HALF THE STORY"], garbage: ["🗑️", "GARBAGE REPORT"] }[kind];
    return `<p class="stamp s-${kind}"><span aria-hidden="true">${t[0]}</span> <span>${t[1]}</span></p>`;
  }
  function deltaLine(parts) {
    return `<p class="payline">${parts.map(p => `<span class="pp ${p[1] || ""}">${p[0]}</span>`).join("")}</p>`;
  }

  // ---------------- Screens ----------------
  function intro() {
    app.innerHTML = `<section class="intro">
      <div class="intro-left">
        <p class="kick">A research agency game · made-up company</p>
        <h1>Research Rivals</h1>
        <p class="hook">A rival agency sells fast, cheap answers. Can the right research method beat a hot take?</p>
        <ul class="chips"><li>🃏 Win 6 client jobs with method cards</li><li>⏱ About 25 minutes</li><li>🔒 5 evidence checks</li><li>✍️ 2 short answers</li></ul>
        <p class="goal"><b>🎯 Today's goal:</b> Pick the right research method for a question and explain its strengths and limits.</p>
        <label for="nameBox" class="namelab">Your name: first name + last initial (like Jordan M.)</label>
        <div class="startrow"><input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <button type="button" class="go big" id="startBtn">Open the agency →</button></div>
        <p id="introMsg" class="msg" role="status"></p>
      </div>
      <div class="intro-art" aria-hidden="true">
        <div class="fan">${ORDER.map(k => `<div class="fcard m-${k}"><span>${M[k].icon}</span><b>${M[k].name}</b></div>`).join("")}</div>
        ${post("Why pay for research? Our app has the answer in 5 minutes. 😎", "8.8K")}
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.started = true; st.job = 0; st.phase = "pick"; save(); render(); window.scrollTo(0, 0);
    };
  }

  function briefing() {
    // A one-time strip at the top of job 1 so even a skipper knows the loop.
    return `<div class="how"><p><b>How it works:</b> Read the client's question. Tap the method card that fits. Then play it.</p><p>💵 Money and 📅 days carry over to every job. A wrong card gives a <b>garbage report</b>, and you pay again.</p></div>`;
  }

  function pickScreen() {
    const j = JOBS[st.job];
    const tried = st.tried[j.id] || [];
    const sel = st.sel[j.id];
    const g = st.garbage[j.id];
    let html = `<section class="card job">${kick(st.job + 1)}${st.job === 0 && !tried.length ? briefing() : ""}${clientCard(j)}`;
    if (g) {
      const gm = M[g.m];
      html += `<div class="garbage" id="garb"><div class="paper crumpled">${stamp("garbage")}<p class="g-what"><span aria-hidden="true">${gm.icon}</span> <b>${gm.name}</b></p><p>${JOBS[st.job].fits[g.m].text}</p></div>
        ${say(j.icon, j.who, "I can't use this, and I'm not paying for it. Try a different card.", "angry")}
        ${deltaLine([["💵 −" + cash(gm.cost), "down"], ["📅 −" + gm.days, "down"], ["⭐ −1", "down"], ["🔥 +1", "down"]])}</div>`;
    }
    html += `<h2 class="pickh">Which method fits this question?</h2><div class="hand">${ORDER.map(k => cardHtml(k, { sel: sel === k, tried: tried.includes(k) })).join("")}</div>`;
    const m = sel && M[sel];
    html += `<div class="playbar">${m ? `<p class="pb-sel"><span aria-hidden="true">${m.icon}</span> <b>${m.name}</b> <span class="pb-cost">💵 ${cash(m.cost)} · 📅 <span>${m.days} days</span></span></p><button type="button" class="go" id="playBtn">Play this card →</button>` : `<p class="pb-none">Tap a card to pick it.</p>`}</div></section>`;
    app.innerHTML = html;
    app.querySelectorAll(".mcard").forEach(b => b.onclick = () => { st.sel[j.id] = b.dataset.m; save(); render(); const p = $("playBtn"); if (p) p.scrollIntoView({ block: "nearest", behavior: "smooth" }); });
    if ($("playBtn")) $("playBtn").onclick = () => playCard(j, sel);
  }

  function playCard(j, k) {
    const m = M[k];
    st.money -= m.cost; st.days -= m.days;
    st.sel[j.id] = null;
    if (k === j.best) {
      st.pick[j.id] = k; st.garbage[j.id] = null; st.phase = "setup"; anim = true;
      save(); render(); window.scrollTo(0, 0); flash("hudMoney"); return;
    }
    const f = j.fits[k];
    if (f.fit === "wrong") {
      (st.tried[j.id] = st.tried[j.id] || []).push(k);
      st.garbage[j.id] = { m: k };
      st.rep -= 1; st.hype += 1; st.mood = "😂"; clamp(); anim = true;
      addLog(st.job + 1, "Garbage report: " + m.name, "−1 ⭐", "down");
      save(); render(); flash("hudMoney"); flash("repNum");
      const gb = $("garb"); if (gb) gb.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    // "ok": accepted, but only half the story
    st.pick[j.id] = k; st.fit[j.id] = "ok"; st.garbage[j.id] = null;
    const pay = j.pay - 300; st.money += pay; st.paid[j.id] = pay; st.rep -= 1; st.hype += 1; st.mood = "😏"; clamp(); anim = true;
    addLog(st.job + 1, j.logOk, "−1 ⭐", "down");
    flash("repNum");
    st.phase = "results"; save(); render(); window.scrollTo(0, 0); flash("hudMoney");
  }

  function setupScreen() {
    const j = JOBS[st.job], m = M[st.pick[j.id]];
    let html = `<section class="card job">${kick(st.job + 1, "Plan the study")}
      <div class="played"><div class="minicard m-${st.pick[j.id]}" aria-hidden="true"><span>${m.icon}</span><b>${m.name}</b></div><div><p class="pl-h"><span>Card played:</span> <b>${m.name}</b></p>${say(j.icon, j.who, "Good pick. That's the kind of answer I need.")}</div></div>`;
    const pre = j.preCheck && !(st.checks[j.preCheck] || {}).done;
    if (j.preCheck) html += checkHtml(j.preCheck);
    if (!pre) {
      html += `<h2 class="pickh" id="setupH">How will you run it?</h2><p class="sub">Both cards cost you something.</p><div class="setups">${["A", "B"].map(x => {
        const s = j.setup[x];
        const costs = s.cost || s.days ? `<span class="sc-cost"><span class="chip">💵 +${cash(s.cost)}</span><span class="chip">📅 <span>+${s.days} ${s.days === 1 ? "day" : "days"}</span></span></span>` : `<span class="sc-cost free"><span class="chip">💵 $0</span><span class="chip">📅 <span>+0 days</span></span></span>`;
        return `<button type="button" class="setup" data-s="${x}"><span class="sc-ic" aria-hidden="true">${s.icon}</span><span class="sc-l">${s.title}</span><span class="sc-s">${s.sub}</span>${costs}</button>`;
      }).join("")}</div>`;
    }
    html += `</section>`;
    app.innerHTML = html;
    if (j.preCheck) wireCheck(j.preCheck);
    app.querySelectorAll(".setup").forEach(b => b.onclick = () => chooseSetup(j, b.dataset.s));
  }

  function chooseSetup(j, x) {
    const s = j.setup[x];
    st.money -= s.cost; st.days -= s.days;
    st.setup[j.id] = x;
    const solid = x === "B";
    st.fit[j.id] = solid ? "solid" : "shaky";
    const pay = solid ? j.pay : j.pay - 200;
    st.money += pay; st.paid[j.id] = pay;
    anim = true; st.mood = solid ? "😤" : "😂";
    if (solid) { st.rep += 1; st.hype -= 1; addLog(st.job + 1, j.logSolid, "+1 ⭐", "up"); }
    else { st.rep -= 2; st.hype += 2; addLog(st.job + 1, j.logShaky, "−2 ⭐", "down"); }
    clamp(); st.phase = "results"; save(); render(); window.scrollTo(0, 0); flash("hudMoney"); flash("repNum");
  }

  function resultsScreen() {
    const j = JOBS[st.job];
    const fit = st.fit[j.id];
    const k = st.pick[j.id], m = M[k];
    const r = fit === "ok" ? j.fits[k] : fit === "solid" ? j.solid : j.shaky;
    const rival = fit === "solid" ? quiet() : post(r.rival, fit === "ok" ? "900" : "2.7K");
    const payParts = [["💵 +" + cash(st.paid[j.id]), "up"]];
    if (fit === "shaky") payParts.push(["−$200 (you got exposed)", "down"], ["⭐ −2", "down"], ["🔥 +2", "down"]);
    else if (fit === "ok") payParts.push(["−$300 (only half the story)", "down"], ["⭐ −1", "down"], ["🔥 +1", "down"]);
    else payParts.push(["⭐ +1", "up"], ["🔥 −1", "up"]);
    const sel = st.setup[j.id] ? j.setup[st.setup[j.id]] : null;
    let html = `<section class="card job">${kick(st.job + 1, "Results")}
      <div class="desk"><div class="report paper">${stamp(fit)}<p class="r-plan"><span aria-hidden="true">${m.icon}</span> <b>${m.name}</b>${sel ? `<span class="r-sep"> · </span><span aria-hidden="true">${sel.icon}</span> <span>${sel.title}</span>` : ""}</p>${r.data()}<p class="r-text">${r.text}</p></div>
      <div class="rivalcol"><p class="rivalh">Blake Vance runs Hot Take Analytics (made up). He checks every report you send.</p>${rival}</div></div>
      ${unlock(r.reveal)}
      ${deltaLine(payParts)}`;
    const ck = j.check;
    const ckDone = !ck || (st.checks[ck] || {}).done;
    if (ck) html += checkHtml(ck, variantFor(ck));
    if (ckDone && j.bonus) html += bonusHtml();
    const ready = ckDone && (!j.bonus || st.bonus);
    if (ready) html += `<button type="button" class="go next" id="nextBtn">${st.job === 4 ? "Next: the big final job →" : "Next job →"}</button>`;
    html += `</section>`;
    app.innerHTML = html;
    if (ck) wireCheck(ck, variantFor(ck));
    app.querySelectorAll(".bonusbtn").forEach(b => b.onclick = () => chooseBonus(b.dataset.b));
    if ($("nextBtn")) $("nextBtn").onclick = () => { st.job += 1; st.phase = "pick"; anim = true; save(); render(); window.scrollTo(0, 0); };
  }

  function variantFor(id) { return id === "c5" ? (st.fit.j5 === "solid" ? "A" : "B") : null; }

  // ---------------- Bonus temptation (job 5) ----------------
  function bonusHtml() {
    const solid = st.fit.j5 === "solid";
    const ask = solid ? "Can your report just say \"StudyStreak raises scores 4 points\"? I'll add a $500 bonus." : "Can your report just say \"StudyStreak raises scores 3 points\"? I'll add a $500 bonus.";
    if (st.bonus) {
      return `<div class="bonus done"><p class="b-h">📱 The StudyStreak CEO</p><p>${st.bonus === "truth" ? "You reported what the data really shows. The CEO is annoyed, but your report is honest." : "You cashed the $500. The report says what the client wanted to hear."}</p></div>`;
    }
    return `<div class="bonus phone" id="bonusBox"><p class="b-h"><span class="ring" aria-hidden="true">📱</span> <span>The StudyStreak CEO calls</span></p><p class="b-ask">“<span>${ask}</span>”</p>
      <div class="setups"><button type="button" class="setup bonusbtn" data-b="truth"><span class="sc-ic" aria-hidden="true">🧾</span><span class="sc-l">Tell the truth</span><span class="sc-s">No bonus. The CEO won't be happy.</span><span class="sc-cost free"><span class="chip">💵 $0</span></span></button>
      <button type="button" class="setup bonusbtn" data-b="lie"><span class="sc-ic" aria-hidden="true">💰</span><span class="sc-l">Take the $500</span><span class="sc-s">More money for the final job. Nobody will check... right?</span><span class="sc-cost"><span class="chip up">💵 +$500</span></span></button></div></div>`;
  }
  function chooseBonus(b) {
    st.bonus = b;
    if (b === "lie") { st.money += 500; addLog(5, "Took $500 to say the app works", "+$500", "down"); }
    else addLog(5, "Reported the real app results, no bonus", "honest", "up");
    save(); render(); flash("hudMoney");
    const n = $("nextBtn"); if (n) n.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  // ---------------- Final job: up to two cards ----------------
  function finalCost(sel) { return sel.reduce((a, k) => ({ cost: a.cost + M[k].cost, days: a.days + M[k].days }), { cost: 0, days: 0 }); }
  function finalScreen() {
    const j = JOBS[5];
    const sel = st.finalSel || [];
    const c = finalCost(sel);
    let html = `<section class="card job">${kick(6, "The big one")}${clientCard(j)}
      <div class="how"><p><b>New rule:</b> This job lets you play <b>up to 2 cards</b> together. Two cards cost more money and more days.</p></div>
      <h2 class="pickh">Which method or methods fit?</h2><div class="hand">${ORDER.map(k => cardHtml(k, { sel: sel.includes(k) })).join("")}</div>`;
    let blocked = "";
    if (sel.length === 2) {
      if (st.days < c.days) blocked = "Not enough days for two cards: you need " + c.days + ", you have " + Math.max(0, st.days) + ". Tap a card to drop it.";
      else if (st.money < c.cost) blocked = "Not enough money for two cards: you need " + cash(c.cost) + ", you have " + cash(st.money) + ". Tap a card to drop it.";
    }
    html += `<div class="playbar">${sel.length ? `<p class="pb-sel">${sel.map(k => `<span aria-hidden="true">${M[k].icon}</span> <b>${M[k].name}</b>`).join(" + ")} <span class="pb-cost">💵 ${cash(c.cost)} · 📅 <span>${c.days} days</span></span></p>` : `<p class="pb-none">Tap one or two cards.</p>`}
      ${blocked ? `<p class="msg bad" id="finalMsg">${blocked}</p>` : ""}
      ${sel.length && !blocked ? `<button type="button" class="go" id="playBtn">${sel.length === 2 ? "Play both cards →" : "Play this card →"}</button>` : ""}</div></section>`;
    app.innerHTML = html;
    app.querySelectorAll(".mcard").forEach(b => b.onclick = () => {
      const k = b.dataset.m; let s = (st.finalSel || []).slice();
      if (s.includes(k)) s = s.filter(x => x !== k); else { s.push(k); if (s.length > 2) s.shift(); }
      st.finalSel = s; save(); render();
      const p = $("playBtn") || $("finalMsg"); if (p) p.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    if ($("playBtn")) $("playBtn").onclick = playFinal;
  }
  function playFinal() {
    const sel = st.finalSel.slice(), c = finalCost(sel);
    st.money -= c.cost; st.days -= c.days; st.finalPick = sel;
    const hasS = sel.includes("survey"), hasI = sel.includes("interview");
    const fit = hasS && hasI ? "solid" : hasS || hasI ? "ok" : "garbage";
    st.finalFit = fit;
    const names = sel.map(k => M[k].name).join(" + ");
    anim = true; st.mood = fit === "solid" ? "😡" : fit === "ok" ? "😏" : "🤑";
    if (fit === "solid") { st.money += 1500; st.paid.j6 = 1500; st.rep += 2; st.hype -= 2; addLog(6, "Survey + interviews: mixed methods", "+2 ⭐", "up"); }
    else if (fit === "ok") { st.money += 1000; st.paid.j6 = 1000; st.hype += 1; addLog(6, hasS ? "Survey only: no WHY" : "Interviews only: no HOW MANY", "0 ⭐", "flat"); }
    else { st.paid.j6 = 0; st.rep -= 2; st.hype += 2; addLog(6, "Wrong cards for the final job", "−2 ⭐", "down"); }
    if (st.bonus === "lie") { st.leak = true; st.mood = "😈"; st.rep -= 3; st.hype += 2; addLog(6, "Hot Take leaked your real app numbers", "−3 ⭐", "down"); }
    clamp(); st.phase = "results"; save(); render(); window.scrollTo(0, 0); flash("hudMoney"); flash("repNum");
    void names;
  }
  function finalResults() {
    const fit = st.finalFit, sel = st.finalPick || [];
    const hasS = sel.includes("survey"), hasI = sel.includes("interview");
    const surveyBit = bars([["Plan to leave within 5 years", 46], ["Plan to stay", 54]]);
    const interviewBit = quote("\"There's no job here in what I want to do.\"") + quote("\"Rent is too high on a starter paycheck.\"") + `<p class="madeup">Made-up game data</p>`;
    let data = "", text = "", reveal = "", rival = "";
    if (fit === "solid") {
      data = surveyBit + interviewBit; text = "You know HOW MANY plan to leave AND WHY. The council can finally make a plan.";
      reveal = "<b>Mixed methods</b> = using two methods together. Each one covers the other's weak spot: the survey shows <b>how many</b>, the interviews show <b>why</b>.";
      rival = quiet();
    } else if (fit === "ok") {
      data = hasS ? surveyBit : interviewBit;
      text = hasS ? "You know HOW MANY. The council asks, \"But why are they going?\"" : "You know WHY. The council asks, \"But is this 5 kids or half the town?\"";
      reveal = "This question had two parts: <b>how many</b> AND <b>why</b>. One method could only answer one part.";
      rival = post(hasS ? "Cedar River: \"46% are leaving!\" Council: \"Why?\" Cedar River: 🦗🦗🦗" : "Cedar River interviewed a few kids and called it the whole city. 🤏", "3.1K");
    } else {
      text = "Your report doesn't answer how many OR why. The council buys a quick poll from Hot Take Analytics instead.";
      reveal = "\"How many?\" needs a <b>survey</b>. \"Why?\" needs <b>interviews</b>. Match the method to the question.";
      rival = post("Cedar River blew the city job. Guess who the council called? 😎", "6.6K");
    }
    const parts = [["💵 +" + cash(st.paid.j6 || 0), st.paid.j6 ? "up" : "down"]];
    if (fit === "solid") parts.push(["⭐ +2", "up"], ["🔥 −2", "up"]);
    else if (fit === "ok") parts.push(["−$500 (half the story)", "down"], ["🔥 +1", "down"]);
    else parts.push(["⭐ −2", "down"], ["🔥 +2", "down"]);
    let html = `<section class="card job">${kick(6, "Results")}
      <div class="report paper">${stamp(fit)}<p class="r-plan">${sel.map(k => `<span aria-hidden="true">${M[k].icon}</span> <b>${M[k].name}</b>`).join(" + ")}</p>${data}<p class="r-text">${text}</p></div>
      ${rival}${unlock(reveal)}${deltaLine(parts)}`;
    if (st.leak) html += `<div class="leak"><p class="b-h">🚨 Breaking</p>${post("Leaked: StudyStreak's REAL numbers. The app barely helped. Cedar River knew and took $500 to say it worked. 🧾", "12K")}<p><span>Every client sees it.</span> <b>⭐ −3</b></p>${unlock("Researchers have to report what the data shows, even when a client pays for a different answer. That's <b>honesty</b> in research.")}</div>`;
    html += `<button type="button" class="go next" id="nextBtn">See how your season ended →</button></section>`;
    app.innerHTML = html;
    $("nextBtn").onclick = () => { st.ending = endingFor(); st.phase = "end"; anim = true; save(); render(); window.scrollTo(0, 0); };
  }

  // ---------------- Ending + writing + turn in ----------------
  const ENDINGS = {
    top: { icon: "🏆", title: "Iowa's Most Trusted Research Team", text: "Clients line up at your door. Hot Take Analytics loses its biggest clients to you." },
    mid: { icon: "🏚️", title: "Still Open, Barely", text: "You paid the bills, but clients have doubts. Blake's posts still pop up when people search your name." },
    low: { icon: "🔥", title: "Bought Out by Hot Take Analytics", text: "Your sign comes down. Blake's goes up. Fast, cheap answers won this time." }
  };
  function endingFor() {
    let lvl = st.rep >= 8 ? 2 : st.rep >= 4 ? 1 : 0;
    if (st.money < 0) { lvl = Math.max(0, lvl - 1); addLog(6, "Ended the season in debt", cash(st.money), "down"); }
    return ["low", "mid", "top"][lvl];
  }
  function endScreen() {
    const e = ENDINGS[st.ending || endingFor()];
    const trail = st.log.map(l => `<li class="${l.kind}"><span class="lj">Job ${l.job}</span><span class="lt">${l.text}</span><b class="ld">${l.delta}</b></li>`).join("");
    app.innerHTML = `<section class="card ending e-${st.ending}">
      <p class="kicker">Season over</p><div class="end-head"><span class="end-ic" aria-hidden="true">${e.icon}</span><div class="sign"><h2>${e.title}</h2><p>${e.text}</p></div></div>
      <div class="endstats"><span>⭐ <b>${st.rep}/10</b> <span>reputation</span></span><span>💵 <b>${cash(st.money)}</b> <span>left</span></span><span>📅 <b>${st.days}</b> <span>days left</span></span></div>
      <h3 class="causedh">Caused by:</h3><ul class="trail">${trail}</ul>
      <p class="replay">Want a different ending? You can start over after you turn this in.</p>
      <div class="writing paper"><p class="w-h"><span aria-hidden="true">📄</span> <span>Your season report</span></p><p class="sub">Last step: 2 short answers. Write 1–2 full sentences each. Use the starter.</p>
      ${PROMPTS.map(p => `<label for="w_${p.id}">${p.label}</label><p class="stem">${p.stem}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      ${st.turnedIn ? `<p class="turned" id="turned">✓ Turned in</p>` : ""}</div></section>`;
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", ev => { st.writing[p.id] = ev.target.value; save(); }));
    $("sendBtn").onclick = turnIn;
  }

  async function turnIn() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const p of PROMPTS) {
      const box = $("w_" + p.id), v = (box.value || "").trim();
      const stemShown = tr(p.stem);
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: stemShown, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (isEs() ? "En " + tr(p.short) : "For " + p.short) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemWords = new Set(plain(p.stem + " " + stemShown).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < p.newWords) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "msg bad"; box.focus(); return; }
      let groups = p.mustAll;
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      const has = w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v));
      if (groups.some(g => !g.some(has))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    const answers = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => !(st.checks[id] || {}).wrong).length;
    answers["First-try correct"] = right + " of " + CHECK_IDS.length;
    const byStd = {};
    CHECK_IDS.forEach(id => { const s = CHECKS[id].std; byStd[s] = byStd[s] || [0, 0]; byStd[s][1]++; if (!(st.checks[id] || {}).wrong) byStd[s][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECK_IDS.forEach(id => {
      const c = CHECKS[id], w = (st.checks[id] || {}).wrong || 0, v = variantFor(id);
      const opts = v ? c.variants[v].options : c.options;
      answers[c.short] = opts[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    JOBS.slice(0, 5).forEach((j, i) => {
      const tried = (st.tried[j.id] || []).map(k => M[k].name);
      const pk = st.pick[j.id] ? M[st.pick[j.id]].name : "";
      answers["Choice · Job " + (i + 1) + " method"] = pk + (st.fit[j.id] === "ok" ? " (half the story; best was " + M[j.best].name + ")" : "") + (tried.length ? " (after garbage from: " + tried.join(", ") + ")" : " (first card)");
      if (st.setup[j.id]) answers["Choice · Job " + (i + 1) + " setup"] = j.setup[st.setup[j.id]].label + (st.setup[j.id] === "B" ? " (careful)" : " (shortcut)");
    });
    answers["Choice · StudyStreak bonus"] = st.bonus === "lie" ? "Took the $500 to say the app works" : "Reported the real results";
    answers["Choice · Final job methods"] = (st.finalPick || []).map(k => M[k].name).join(" + ") + (st.finalFit === "solid" ? " (mixed methods)" : st.finalFit === "ok" ? " (one part only)" : " (did not fit)");
    answers["Ending"] = ENDINGS[st.ending].title;
    answers["Caused by"] = st.log.map(l => "Job " + l.job + ": " + l.text + " (" + l.delta + ")").join(" · ");
    answers["Reputation"] = st.rep + " of 10";
    answers["Money left"] = cash(st.money);
    answers["Days left"] = String(st.days);
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      $("sendBtn").textContent = "Turn in again"; $("sendBtn").disabled = false;
      if (!$("turned")) msg.insertAdjacentHTML("afterend", `<p class="turned" id="turned">✓ Turned in</p>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------------- Evidence checks ----------------
  function checkData(id, v) { const c = CHECKS[id]; return v ? Object.assign({}, c, c.variants[v]) : c; }
  function checkHtml(id, v) {
    const c = checkData(id, v), s = st.checks[id] || {};
    const a = c.asker || ["👩🏽‍💻", "Dee, your partner"];
    if (s.done) return `<div class="check board done${justSolved === id ? " solved" : ""}" id="chk_${id}"><p class="ck-kick">🔓 Evidence check</p><span class="unstamp" aria-hidden="true">UNLOCKED</span>${say(a[0], a[1], c.prompt, "ask")}<p class="answered">✓ ${c.options[0]}</p><p class="why">${c.why}</p></div>`;
    return `<div class="check board" id="chk_${id}"><p class="ck-kick">${c.label}</p><div class="pins">${c.evidence()}</div>${say(a[0], a[1], c.prompt, "ask")}<div class="choices replies" id="ch_${id}"></div><p class="msg" id="fb_${id}" aria-live="polite"></p></div>`;
  }
  function wireCheck(id, v) {
    const c = checkData(id, v), area = $("ch_" + id), fb = $("fb_" + id);
    if (!area) return;
    let last = null;
    function draw() {
      area.replaceChildren();
      let order = shuffle(c.options.map((t, n) => ({ t, n })));
      if (last && order.map(o => o.n).join() === last) order.push(order.shift());
      last = order.map(o => o.n).join();
      order.forEach(o => {
        const btn = document.createElement("button"); btn.type = "button"; btn.className = "choice"; btn.textContent = o.t;
        btn.onclick = () => {
          if (locked) return;
          const s = st.checks[id] = st.checks[id] || { wrong: 0, done: false };
          if (o.n === 0) {
            s.done = true; justSolved = id; st.mood = "😒"; save(); render(); justSolved = null;
            const el = $("chk_" + id); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
            setTimeout(() => { const nx = $("setupH") || $("bonusBox") || $("nextBtn"); if (nx) nx.scrollIntoView({ block: "center", behavior: "smooth" }); }, 900);
            return;
          }
          s.wrong += 1; st.mood = "😏"; save(); hud();
          const bd = $("chk_" + id); if (bd) { bd.classList.remove("shake"); void bd.offsetWidth; bd.classList.add("shake"); }
          locked = true; btn.classList.add("nope");
          area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = LOCK;
          const tick = () => {
            fb.textContent = "Not quite. " + c.hint + " The choices will mix up. Try again in " + left + "…"; fb.className = "msg bad";
            if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + c.hint + " Try again."; fb.className = "msg"; draw(); return; }
            lockTimer = setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(btn);
      });
    }
    draw();
  }

  // ---------------- Router ----------------
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    clearTimeout(lockTimer); locked = false;
    hud();
    document.body.classList.toggle("on-intro", !st.started);
    if (!st.started) intro();
    else if (st.phase === "end") endScreen();
    else if (st.job === 5) (st.phase === "pick" ? finalScreen : finalResults)();
    else if (st.phase === "pick") pickScreen();
    else if (st.phase === "setup") setupScreen();
    else resultsScreen();
    if (anim && app.firstElementChild) app.firstElementChild.classList.add("anim");
    anim = false;
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; prevHud = null; anim = true; save(); render(); window.scrollTo(0, 0);
  };
  if (st.started && $("welcome")) {
    $("welcome").textContent = "Welcome back, " + st.name + " — you're on step " + stepNow() + " of " + TOTAL_STEPS + ".";
    $("welcome").hidden = false;
  }
  render();
  // for testing only (read-only peek)
  window.__rr = { state: () => JSON.parse(JSON.stringify(st)) };
})();
