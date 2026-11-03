// =====================================================================
//  READ THE ROOM: OSAKA  (Sociology Unit 2 Day 3, SS.9-12.Soc.6 + Soc.5)
//  You are Maya, an exchange student from Marion in Osaka for a semester.
//  Core loop: read clue cards before you act (reading context), then pick a move.
//  Three meters: Trust (your new friends), Energy (culture shock wears you down),
//  and Tanner's Hot Takes (a rival vlogger's ethnocentric posts). Moves that judge
//  by Marion's rules, or join Tanner, buy energy but cost trust and spread heat.
//  5 evidence checks are built into play. Strict order, saves on this device.
//  Spanish: es.js (keys are the exact English strings below).
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u2d3-culture-shock-v2";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const ASSIGNMENT_ID = "sociology-unit2-day3-culture-shock";
  const TITLE = "Sociology Unit 2 · Day 3 · Read the Room: Osaka";
  const STANDARD = "SS.9-12.Soc.6, SS.9-12.Soc.5";
  const LOCK = 5;
  const MAX = { t: 10, e: 6, h: 10 };

  const $ = id => document.getElementById(id);
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (window.SiteLang ? window.SiteLang.t(s) : s);
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function html(tag, cls, h) { const e = document.createElement(tag); if (cls) e.className = cls; e.innerHTML = h; return e; }
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: { t: 3, e: 5, h: 0 }, flips: {}, picks: {}, wrong: {}, done: {}, entered: {}, notes: {}, match: {}, log: [], why: false, metRen: false, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.fx || !st.picks) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // ---------------- Effects ----------------
  const clamp = (k, v) => Math.max(0, Math.min(MAX[k], v));
  function apply(fx, label, stepId) {
    const real = {};
    ["t", "e", "h"].forEach(k => {
      if (!fx[k]) return;
      const before = st.fx[k]; st.fx[k] = clamp(k, before + fx[k]);
      if (st.fx[k] !== before) real[k] = st.fx[k] - before;
    });
    // fx = what really changed (meters stop at 0 and max); want = what the move pushed (for "Caused by").
    st.log.push({ s: stepId, l: label, fx: real, want: Object.assign({}, fx) });
    hud(real);
    return real;
  }
  const ICON = { t: "🤝", e: "🔋", h: "🔥" };
  // A chip like "+2 🤝". Green = good for you, red = bad for you.
  function chip(k, v) {
    const goodForYou = k === "h" ? v < 0 : v > 0;
    return el("span", "chip " + (goodForYou ? "g" : "r"), (v > 0 ? "+" : "−") + Math.abs(v) + " " + ICON[k]);
  }
  function chips(fx) { const row = el("span", "cost"); ["t", "e", "h"].forEach(k => { if (fx[k]) row.appendChild(chip(k, fx[k])); }); return row; }

  // ---------------- Content ----------------
  const OBERG = "“Now these cues which may be words, gestures, facial expressions, customs, or norms are acquired by all of us in the course of growing up...”";
  const STEPS = [
    // 1 -------------------------------------------------------------
    { id: "s1", kind: "scene", when: "Week 1", where: "Hoshizora High · Osaka", art: ["🏫", "👟", "🥿"], bg: "linear-gradient(120deg,#fde7ee,#e6efff)",
      title: "First Day: The Front Door",
      lede: "Week 1 in Osaka, and everything is exciting. It's your first day at Hoshizora High. Everyone stops just inside the front door.",
      clues: [
        { i: "👟", t: "👟 By the door: rows of little cubbies, packed with sneakers." },
        { i: "🥿", t: "🥿 Down the hall, every student wears the same soft white shoes." },
        { i: "📦", t: "📦 A box by the door says 来客用 (“for guests”). It's full of slippers." }
      ], need: 2,
      short: "Week 1 · School entrance",
      moves: [
        { i: "🚶", s: "Keep sneakers on", label: "Walk to class in your sneakers", fx: { t: -2 }, result: "Every head turns. A teacher hurries over, points at your feet, then points at the cubbies." },
        { i: "🥿", s: "Cubby + guest slippers", label: "Put your sneakers in a cubby and grab guest slippers", fx: { t: 2 }, result: "A girl at the next cubby grins and gives you a thumbs-up. That's Yui. She's in your class." },
        { i: "🧦", s: "Carry your shoes", label: "Take your shoes off and carry them to class", fx: {}, result: "Close! Shoes off was right. But kids giggle at the sneakers in your hand. They go in a cubby." }
      ],
      reveal: ["Switching shoes is a <b>norm</b>: an expected way to act. Nobody is born knowing it. Kids here learned it growing up, so it feels natural to them.",
               "Week 1 is the <b>honeymoon stage</b> of culture shock: everything new feels exciting."] },

    // 2 -------------------------------------------------------------
    { id: "c1", kind: "check", std: "Soc.5", short: "Value behind the shoe norm", action: "📓 Cue Notebook", frame: "notebook", stamp: "LOGGED",
      sheet: ["NORM (what people do): Switch to indoor shoes at the door.", "VALUE (a belief about what matters):"],
      title: "Write Down the Rule",
      lede: "Yui sees you studying the cubbies. She explains.",
      evidence: [
        { cls: "bub yui", nm: "Yui", t: "“We switch shoes so outside dirt stays outside. The school belongs to all of us, so we take care of it together.”" }
      ],
      q: "Which VALUE is behind the shoe switch? Tap a sticky note.",
      options: ["Keeping shared spaces clean", "Making guests feel welcome", "Doing whatever teachers say", "Saving money on new floors"],
      hint: "Reread Yui. What is the shoe switch FOR?",
      why: "A value is a belief about what matters. Valuing a clean shared space leads to the norm of switching shoes." },

    // 3 -------------------------------------------------------------
    { id: "s2", kind: "scene", when: "Week 2", where: "Classroom 2-B", art: ["🧹", "🪣", "✨"], bg: "linear-gradient(120deg,#e1f3f1,#fff1dc)",
      enter: { e: 1, note: "New week. You got some rest." },
      title: "Last Bell: Nobody Leaves",
      lede: "The last bell rings. Your teacher hands you a rag. Desks slide to the back of the room, and nobody leaves.",
      clues: [
        { i: "📋", t: "📋 The board says 掃除 (soji): cleaning time. Each group has a job: floor, windows, or hall." },
        { i: "🚫", t: "🚫 There's no janitor's cart anywhere in sight." },
        { i: "👩‍🏫", t: "👩‍🏫 Your teacher grabs a broom and starts sweeping too." }
      ], need: 2,
      short: "Week 2 · Cleaning time",
      moves: [
        { i: "🎒", s: "Leave. Janitors got it.", label: "Grab your bag. The janitors will handle it.", fx: { t: -2 }, result: "The room goes quiet. A few classmates look hurt. Yui doesn't wave goodbye." },
        { i: "🧽", s: "Copy and wipe", label: "Copy the kid next to you and start wiping", fx: { t: 1 }, result: "You wipe windows with your group. It goes fine. You still don't get WHY they do it." },
        { i: "❓", s: "Ask Yui why", label: "Ask Yui why everyone cleans, then join in", fx: { t: 2, e: -1 }, why: true, tip: "Earns a 💡 Why Card", result: "Yui: “It's our school. Cleaning it teaches responsibility and teamwork.” You earn a 💡 Why Card." }
      ],
      reveal: ["Asking “why?” before you judge is <b>cultural relativism</b>: trying to understand a custom from inside its own culture."] },

    // 4 -------------------------------------------------------------
    { id: "c2", kind: "check", std: "Soc.6", short: "Relativist comment on cleaning time", action: "📱 Comments", frame: "phone", stamp: "PINNED",
      enter: { h: 1, note: "Tanner just posted. It's spreading." },
      when: "Week 2", where: "Your phone", art: ["📱", "😬", "🔥"], bg: "linear-gradient(120deg,#ffe9dc,#fff6d6)",
      title: "Tanner Posts a Hot Take",
      lede: "Tanner is another American exchange student in Osaka. He has a vlog, and he just heard about cleaning time.",
      post: { txt: "JAPAN MAKES KIDS BE THE JANITORS?? 💀 couldn't be me #JapanIsWeird", meta: "48K views · 1.2K comments" },
      q: "Pin the comment that shows cultural relativism. 📌",
      comments: true,
      options: ["Wait, why do they do it? Maybe it teaches teamwork.", "Why can't they hire janitors like normal schools?", "Japan's way is better. US schools are just lazy.", "Cleaning is gross. No kid should have to do it."],
      hint: "Relativism doesn't rank cultures. It asks why first.",
      why: "Asking why first is cultural relativism. Calling either culture the “right” one is still ranking cultures, not understanding them." },

    // 5 -------------------------------------------------------------
    { id: "d2", kind: "decide", when: "Week 2", where: "Your phone", art: ["💬", "🙈", "🔁"], bg: "linear-gradient(120deg,#ffe9dc,#fde7ee)",
      title: "Answer Tanner?",
      lede: "Yui's friends have all seen Tanner's post. Now they want to know what YOU think.",
      short: "Week 2 · Tanner's janitor post",
      moves: [
        { i: "💬", s: "Reply with the why", label: "Reply and explain why they clean", fx: s => s.why ? { e: -1, h: -2, t: 1 } : { e: -2, h: -1, t: 1 }, tipIf: s => s.why ? "💡 Your Why Card makes this cheaper and stronger." : "",
          result: s => s.why ? "You explain what Yui told you. Your reply gets pinned to the top. Yui texts you a ❤️." : "You reply, but you can't really explain WHY they clean. It helps a little. Yui texts you a 👍." },
        { i: "🙈", s: "Scroll past", label: "Scroll past. Not your fight.", fx: { h: 2 }, result: "The post hits 200K views. Some classmates start to wonder if all Americans think that." },
        { i: "🔁", s: "Duet it 😂", label: "Duet it: “fr this is wild 😂”", fx: { e: 2, t: -2, h: 2 }, result: "Your friends back home love it, and laughing feels good. Then Yui sees it." }
      ],
      reveal: ["Tanner's post is <b>ethnocentrism</b>: judging another culture by your own culture's rules, as if your way is the “normal” one."] },

    // 6 -------------------------------------------------------------
    { id: "s3", kind: "scene", when: "Week 4", where: "Osaka subway · 7:40 AM", art: ["🚇", "📱", "🤫"], bg: "linear-gradient(120deg,#e9eef3,#e6efff)",
      enter: { e: -3, note: "Week 4. The fun wore off. Everything takes effort now.", bad: true },
      title: "The Quiet Train",
      lede: "The morning train to school is packed. Your phone buzzes: Mom is calling. It's evening back in Iowa, and you haven't talked in three days.",
      clues: [
        { i: "📵", t: "📵 A sign: “Please set your phone to silent mode and don't talk on it.”" },
        { i: "🤫", t: "🤫 The car is packed, but it's almost silent." },
        { i: "📱", t: "📱 Everyone is on their phone. They're texting, not talking." }
      ], need: 2,
      short: "Week 4 · Mom calls on the train",
      moves: [
        { i: "📞", s: "Answer the call", label: "Answer it. You really miss her.", fx: { e: 2, t: -2 }, result: "Hearing Mom helps a lot. But people stare the whole ride, and a girl from your school looks away." },
        { i: "💬", s: "Decline + text", label: "Decline and text: “On the train. Call you in 20.”", fx: { e: -1 }, result: "Nobody even looks up. Hanging up on Mom stings, though." },
        { i: "🚉", s: "Hop off and call", label: "Get off at the next stop and call her there", fx: { e: 1, t: -1 }, result: "You talk on the platform. You're late for first period, and your teacher marks it." }
      ],
      reveal: ["That's <b>culture shock</b>: the stress of losing the cues you grew up with. Back home you never had to think about phone calls."],
      quote: { q: OBERG, by: "Kalervo Oberg, anthropologist, 1960", plain: "Cues = signals. Acquired = picked up." } },

    // 7 -------------------------------------------------------------
    { id: "c3", kind: "check", std: "Soc.6", short: "Week 4 stage = frustration", action: "📈 Mood Log", frame: "app", stamp: "PLAN UNLOCKED",
      cards: { "Honeymoon": ["🌸", "Everything is exciting."], "Frustration": ["😤", "Small differences start to annoy you."], "Adjustment": ["🧭", "You start learning the rules."], "Acceptance": ["🏡", "The new way feels normal."] },
      title: "How Are You Doing?",
      lede: "Your exchange program asks you to track your mood. Name your stage to unlock a plan.",
      evidence: [
        { cls: "ev", nm: "Week 1", t: "“Everything here is SO cool 😍 I love it.”" },
        { cls: "ev", nm: "Week 2", t: "“Cleaning time was kind of fun?”" },
        { cls: "ev", nm: "Week 4", t: "“I keep messing up. I'm tired all the time. I miss home. I hate the train.”" }
      ],
      q: "Which stage card matches your Week 4? Tap it.",
      options: ["Frustration", "Honeymoon", "Adjustment", "Acceptance"],
      hint: "Match your Week 4 words to what each stage card says.",
      why: "Stress, mistakes, and missing home are the frustration stage. It's normal, and for most people it passes." },

    // 8 -------------------------------------------------------------
    { id: "d3", kind: "decide", when: "Week 4", where: "Friday night", art: ["🎮", "📞", "🎤"], bg: "linear-gradient(120deg,#ede6ff,#fde7ee)",
      title: "Friday Night",
      lede: "Two messages pop up at the same time.",
      chat: [
        { cls: "bub tan", nm: "Tanner", t: "“Rant stream tonight? Just Americans roasting Japan lol. You'll feel better.”" },
        { cls: "bub yui", nm: "Yui", t: "“Karaoke after school? 🎤”" }
      ],
      prompt: "You only have energy for one thing. What do you do?",
      short: "Week 4 · Friday night plan",
      moves: [
        { i: "🎮", s: "Tanner's rant stream", label: "Join Tanner's rant stream", fx: { e: 3, t: -1, h: 2 }, result: "It feels SO good to complain with people from home. Clips from the stream end up online." },
        { i: "📞", s: "Skip both. Call Mom.", label: "Skip both. Call Mom from your room.", fx: { e: 2, h: 1 }, result: "You feel better after talking to Mom. Tanner streams anyway, and nobody pushes back." },
        { i: "🎤", s: "Karaoke with Yui", label: "Go to karaoke with Yui", fx: { e: -1, t: 2 }, ren: true, result: "You're wiped out, but you sing a terrible duet with Yui. You meet her cousin Ren. He's in a band." }
      ],
      reveal: ["Anthropologist Kalervo Oberg wrote that people in culture shock often hide out with people from home and trade put-downs about the new place. It feels good. It also keeps them stuck."] },

    // 9 -------------------------------------------------------------
    { id: "s4", kind: "scene", when: "Week 5", where: "Classroom 2-B · Lunch", art: ["🍱", "🥪", "📸"], bg: "linear-gradient(120deg,#fff1dc,#fde7ee)",
      enter: { e: 2, note: "Weekend rest. You feel a little better.", heatCheck: true },
      title: "Lunch at Your Desk",
      lede: "Yui opens her bento box. You've got chips and a sandwich.",
      chat: [{ cls: "bub tan", nm: "Tanner", t: "“Send me the weirdest lunch pic 👀 You'll be in my next video!”" }],
      clues: [
        { i: "🍱", t: "🍱 A bento is a packed lunch box. Lots of students bring one from home." },
        { i: "👀", t: "👀 Yui keeps glancing at your sandwich. She looks curious, not grossed out." },
        { i: "🥢", t: "🥢 Two classmates trade bites of their side dishes." }
      ], need: 2,
      short: "Week 5 · Lunch + Tanner's DM",
      moves: [
        { i: "📸", s: "Send Tanner the pic", label: "Snap Yui's bento and send it to Tanner", fx: { e: 1, t: -3, h: 3 }, result: "You're in the video! Then Yui sees her own lunch on it with “GROSS??” in big letters. She moves her desk." },
        { i: "🍙", s: "Ask Yui. Trade a bite.", label: "Ask Yui what's in it and trade a bite", fx: { e: -1, t: 2 }, result: "Rice, grilled fish, pickled veggies. Yui tries a chip. The next day, her mom packs an extra rice ball for you." },
        { i: "🚪", s: "Eat in the hallway", label: "Eat in the hallway so nobody sees your lunch", fx: { t: -1 }, result: "No awkward moment. No new friend, either." }
      ],
      reveal: ["Calling someone's normal food “gross” is <b>ethnocentrism</b>: your food becomes the measuring stick. It tells people their normal is wrong, and it pushes them away."] },

    // 10 ------------------------------------------------------------
    { id: "c4", kind: "check", std: "Soc.5", short: "Amemura crowd = subculture", action: "💬 Your reply to Tanner", frame: "reply", stamp: "POSTED",
      enter: { e: 2, note: "Month 2. You're figuring things out.", heatCheck: true, h: 1, note2: "Tanner posted again." },
      when: "Month 2", where: "Amerikamura · Osaka", art: ["🎸", "🧥", "🛍️"], bg: "linear-gradient(120deg,#ede6ff,#e1f3f1)",
      title: "Saturday in Amemura",
      lede: "Amerikamura (“Amemura”) is a real Osaka neighborhood known for street fashion, thrift shops, and live music. Tanner is here too. He just posted:",
      post: { txt: "EVERYONE in Japan dresses like this 🤯 #JapanIsWeird", meta: "91K views · 3.4K comments" },
      clues: [
        { i: "🎸", t: s => s.metRen ? "🎸 Ren, who you met at karaoke, waves you over: “My grandma thinks my clothes are wild. I still spend New Year's at her house.”" : "🎸 Ren, Yui's cousin, plays in a band here. He says: “My grandma thinks my clothes are wild. I still spend New Year's at her house.”" },
        { i: "🚆", t: "🚆 On the train here, most riders wore plain work clothes or school uniforms." },
        { i: "🛍️", t: "🛍️ The shops sell vintage clothes and imported American stuff. That's how Amerikamura got its name." }
      ], need: 3,
      terms: [["Subculture", "A group with its own style inside a bigger culture. It doesn't reject the main culture."], ["Counterculture", "A group that rejects the main culture's big values or norms."]],
      q: "Tanner mixed up one group with a whole country. Finish your reply: “Bro, that crowd is…”",
      options: ["A subculture inside Japanese culture", "A counterculture that rejects Japan", "The main culture shared by all Japan", "A trend every teen in Japan follows"],
      hint: "Read Ren's clue again. Does he reject his family's traditions?",
      why: "A subculture has its own style but still shares the bigger culture. Ren still spends New Year's with his grandma. A counterculture rejects the main culture's values." },

    // 11 ------------------------------------------------------------
    { id: "d5", kind: "decide", when: "Month 2", where: "Saturday night", art: ["🎸", "🎥", "💬"], bg: "linear-gradient(120deg,#ede6ff,#ffe9dc)",
      title: "Saturday Night",
      lede: "Ren's band plays a show tonight. Tanner wants you in his next video, “Weird Japan Pt. 2.” You can't do both.",
      short: "Month 2 · Saturday night",
      moves: [
        { i: "🎸", s: "Ren's show with Yui", label: "Go to Ren's show with Yui", fx: { e: -2, t: 2 }, result: "The music is loud and great. Ren's grandma is in the crowd, cheering." },
        { i: "🎥", s: "Film with Tanner", label: "Film “Weird Japan Pt. 2” with Tanner", fx: { e: 2, t: -2, h: 3 }, result: "The video blows up. So do the comments. Ren unfollows you." },
        { i: "💬", s: "Post a correction", label: "Stay in and post: “That's ONE neighborhood, not all of Japan.”", fx: { e: -1, h: -2 }, result: "Your post gets shared a lot. A few people say they get it now." }
      ],
      reveal: ["Treating one subculture like a whole country is a <b>stereotype</b>: one picture stamped onto millions of different people."] },

    // 12 ------------------------------------------------------------
    { id: "m6", kind: "match", when: "Month 3", where: "Message from Marion, Iowa", art: ["✉️", "🌽", "🚜"], bg: "linear-gradient(120deg,#e6efff,#fff1dc)",
      title: "Haruto's Story",
      lede: "Haruto, your exchange partner, is living with your family in Marion. He wrote a story for his class back in Osaka. It's about YOUR culture.",
      storyTitle: "The Strange People of Awoi",
      pairs: [
        { d: "“On dirt roads, drivers lift one finger off the wheel at every stranger they pass.”", a: "Waving at drivers on gravel roads" },
        { d: "“Each summer they gather to eat food on wooden sticks and line up to stare at a cow made of butter.”", a: "The Iowa State Fair" },
        { d: "“When two people almost bump into each other, both make a short magic sound, then step aside.”", a: "Saying “ope”" }
      ],
      decoy: "Friday night football",
      after: "Awoi is Iowa spelled backward. Haruto borrowed the trick from Horace Miner. In 1956, Miner wrote about the “Nacirema,” which is American spelled backward." },

    // 13 ------------------------------------------------------------
    { id: "c5", kind: "check", std: "Soc.6", short: "Point of Haruto's Awoi story", action: "✉️ Postcard to Haruto", frame: "postcard", stamp: "SENT",
      title: "What's Haruto's Point?",
      lede: "Haruto made normal Iowa life sound super weird. But nothing in his story is false.",
      evidence: [
        { cls: "ev", nm: "Haruto", t: "“Nobody in Iowa thinks the wave is strange. You all just know it. But I had to figure it out.”" },
        { cls: "ev", nm: "Horace Miner, 1956", t: "Miner described Americans the way a visitor would. Bathrooms became “shrines.” Dentists became “holy-mouth-men.”" }
      ],
      q: "Finish your postcard: “I get your point, Haruto…”",
      options: ["Your normal is learned, so it can look odd from outside", "Iowa's customs are stranger than most other places'", "People are born already knowing their culture's habits", "Outsiders always get a culture's habits totally wrong"],
      hint: "Did kids in Iowa have to learn the wave, or were they born doing it?",
      why: "Culture teaches you what feels normal while you grow up. From outside, any culture's normal can look strange. That includes yours." },

    // 14 ------------------------------------------------------------
    { id: "end", kind: "end" },
    // 15 ------------------------------------------------------------
    { id: "write", kind: "write" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.kind === "check");
  const DECISIONS = STEPS.filter(s => s.moves);
  const val = (v, s) => (typeof v === "function" ? v(s) : v);

  const WRITING = [
    { id: "own", short: "A school or town norm",
      frame: "📝 Exchange blog post", label: "1. Your exchange blog asks: Name one everyday norm at our school or around town (like the lunch line, a drive-thru, or how you greet a teacher). Why does it feel normal here, and how might an outsider see it?",
      stem: "One norm at our school or around town is ___. It feels normal here because ___. An outsider might think ___.",
      min: 70, newWords: 6, mustAll: [["because", "since", "learn", "grew up", "taught", "raised"]], mustMsg: "In answer 1, explain WHY it feels normal here (use “because”)." },
    { id: "lens", short: "Explain an Iowa custom to Haruto",
      frame: "💬 Text to Haruto", label: "2. Haruto texts: “Explain one Iowa custom to me.” Pick waving at drivers, State Fair food on a stick, saying “ope,” or Friday night football. Explain it like a cultural relativist: show why it makes sense here, no judging.",
      stem: "Haruto, in Iowa we ___. It makes sense here because ___.",
      min: 60, newWords: 5, mustAll: [["wave", "waving", "fair", "stick", "ope", "football", "friday"], ["because", "since"]], mustMsg: "In answer 2, name the custom AND explain why it makes sense in Iowa (use “because”)." }
  ];

  // ---------------- HUD ----------------
  const MOODS = [[8, "🔥", "going viral"], [6, "🤑", "trending"], [3, "😏", "posting"], [0, "😴", "bored"]];
  function whenFor(i) { for (let k = Math.min(i, TOTAL - 1); k >= 0; k--) if (STEPS[k].when) return STEPS[k].when; return "Week 1"; }
  function hud(delta) {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    if (!show) return;
    $("stepN").textContent = Math.min(st.step + 1, TOTAL); $("stepT").textContent = TOTAL;
    $("wkTxt").textContent = st.step >= TOTAL - 2 ? "Month 3" : whenFor(st.step);
    $("progFill").style.width = Math.round(Math.min(st.step, TOTAL) / TOTAL * 100) + "%";
    $("tN").textContent = st.fx.t; $("tFill").style.width = st.fx.t * 10 + "%";
    $("hN").textContent = st.fx.h; $("hFill").style.width = st.fx.h * 10 + "%";
    $("eN").textContent = st.fx.e;
    const pips = $("ePips"); pips.replaceChildren();
    for (let i = 0; i < MAX.e; i++) pips.appendChild(el("i", i < st.fx.e ? "on" : ""));
    const mood = MOODS.find(m => st.fx.h >= m[0]);
    $("rMood").textContent = mood[1]; $("rWord").textContent = mood[2];
    if (delta) ["t", "e", "h"].forEach(k => {
      if (!delta[k]) return;
      const p = $(k + "Pop"); p.textContent = (delta[k] > 0 ? "+" : "−") + Math.abs(delta[k]);
      p.className = "pop " + (delta[k] > 0 ? "up" : "down"); void p.offsetWidth; p.classList.add("show");
      const m = p.closest(".meter"); if (m) { m.classList.remove("glow"); void m.offsetWidth; m.classList.add("glow"); }
    });
    if (delta && delta.h) { const r = $("rival"); r.classList.remove(delta.h > 0 ? "hop" : "sulk", "hop", "sulk"); void r.offsetWidth; r.classList.add(delta.h > 0 ? "hop" : "sulk"); }
  }

  // ---------------- Building blocks ----------------
  function banner(s) {
    const b = el("div", "banner"); b.style.background = s.bg;
    const tags = el("div", "tags"); tags.append(el("span", "when", s.when), el("span", "where", s.where));
    const art = el("div", "art"); art.setAttribute("aria-hidden", "true"); s.art.forEach(a => art.appendChild(el("span", "", a)));
    const sky = el("div", "skyline"); sky.setAttribute("aria-hidden", "true");
    b.append(sky, tags, art); return b;
  }
  function tannerPost(p) {
    const box = el("div", "post");
    const top = el("div", "top");
    const who = el("div", "who", "@TannerAbroad"); who.appendChild(el("small", "", "exchange student vlogger (made up)"));
    top.append(el("div", "av", "T"), who, el("span", "live", "TRENDING"));
    box.append(top, el("div", "txt", p.txt), el("div", "meta", p.meta));
    return box;
  }
  function bubbles(list, cls) {
    const wrap = el("div", cls || "chat");
    list.forEach(b => { const d = el("div", b.cls); d.appendChild(el("span", "nm", b.nm)); d.appendChild(el("span", "", b.t)); wrap.appendChild(d); });
    return wrap;
  }
  function notesFor(s, card) {
    (st.notes[s.id] || []).forEach(n => {
      const d = el("div", "note" + (n.bad ? " bad" : ""));
      d.appendChild(el("span", "", n.t)); if (n.fx && Object.keys(n.fx).length) d.appendChild(chips(n.fx));
      card.appendChild(d);
    });
  }
  function revealBox(s) {
    const r = el("div", "reveal");
    r.appendChild(el("div", "rv-tag", "💡 Name it"));
    s.reveal.forEach(p => r.appendChild(html("p", "", p)));
    if (s.quote) { const q = el("div", "quote"); q.append(el("div", "q", s.quote.q), el("div", "by", "— " + s.quote.by), el("div", "", s.quote.plain)); r.appendChild(q); }
    return r;
  }
  function stampEl(text, kind) { const d = el("div", "stamp " + (kind || "")); d.appendChild(el("span", "", text)); return d; }
  function nextBtn(card, label) {
    const b = el("button", "go", label || "Next →"); b.type = "button"; b.id = "nextBtn";
    b.onclick = () => { st.step++; save(); render(); window.scrollTo(0, 0); };
    card.appendChild(b); return b;
  }

  // Things that happen when a new week starts (applied once, then remembered).
  function enter(s) {
    if (!s.enter || st.entered[s.id]) return;
    st.entered[s.id] = true;
    const en = s.enter, notes = [];
    if (en.e) notes.push({ t: en.note, fx: apply({ e: en.e }, en.note, s.id), bad: en.bad });
    if (en.heatCheck && st.fx.h >= 5) {
      const msg = "Tanner's videos are going around your school. Some classmates don't trust American students now.";
      notes.push({ t: msg, fx: apply({ t: -1 }, msg, s.id), bad: true });
    }
    if (en.h) { const m = en.note2 || en.note; notes.push({ t: m, fx: apply({ h: en.h }, m, s.id), bad: true }); }
    st.notes[s.id] = notes; save();
  }

  // ---------------- Clues ----------------
  function clueGrid(s, card, onChange) {
    const flips = st.flips[s.id] || (st.flips[s.id] = []);
    const head = el("div", "cluehead");
    head.append(el("b", "", "🔍 Read the room"), el("span", "", s.need === 3 ? "Flip all 3 clues to unlock your reply." : "Flip at least 2 clues to unlock your moves."));
    const grid = el("div", "clues");
    s.clues.forEach((c, i) => {
      const b = el("button", "clue"); b.type = "button";
      const draw = () => {
        b.replaceChildren();
        if (flips.includes(i) || st.picks[s.id] != null || st.done[s.id]) { b.classList.add("open"); b.appendChild(el("span", "", val(c.t, st))); b.setAttribute("aria-label", val(c.t, st)); }
        else { b.append(el("span", "big", c.i), el("span", "tap", "🔍 Tap to look")); }
      };
      draw();
      b.onclick = () => { if (flips.includes(i)) return; flips.push(i); save(); draw(); onChange(); };
      grid.appendChild(b);
    });
    card.append(head, grid);
    return () => flips.length >= s.need;
  }

  // ---------------- Moves (decisions): big icon cards ----------------
  function movesBlock(s, card, ready) {
    const wrap = el("div", "");
    card.appendChild(wrap);
    const picked = st.picks[s.id];
    if (picked != null) {
      const m = s.moves[picked];
      const got = (st.log.find(x => x.s === s.id && x.move) || {}).fx || {};
      const box = el("div", "picked");
      const tag = got.t > 0 ? ["SMOOTH", "good"] : got.t < 0 ? ["AWKWARD", "bad"] : ["MEH", "meh"];
      box.appendChild(stampEl(tag[0], tag[1]));
      const row = el("div", "lbl"); row.append(el("span", "mi", m.i), el("span", "", m.s));
      box.append(el("div", "you", "Your move"), row, el("p", "result say", val(m.result, st)));
      if (Object.keys(got).length) { const r = el("div", "fxrow"); r.appendChild(chips(got)); box.appendChild(r); }
      wrap.appendChild(box);
      wrap.appendChild(revealBox(s));
      nextBtn(wrap);
      return;
    }
    const lock = el("p", "lockmsg", "");
    wrap.appendChild(el("p", "prompt", s.prompt || "What do you do?"));
    const grid = el("div", "moves");
    const order = st["order_" + s.id] || (st["order_" + s.id] = shuffle(s.moves.map((m, i) => i)));
    order.forEach(i => {
      const m = s.moves[i], fx = val(m.fx, st);
      const b = el("button", "move"); b.type = "button"; b.dataset.i = i;
      b.append(el("span", "mi", m.i), el("span", "mt", m.s));
      // Only the energy cost shows before you choose. Trust and hot takes are a surprise.
      const cost = el("span", "cost");
      if (fx.e) cost.appendChild(chip("e", fx.e)); else cost.appendChild(el("span", "chip", "0 🔋"));
      b.appendChild(cost);
      const tip = m.tipIf ? m.tipIf(st) : m.tip;
      if (tip) b.appendChild(el("span", "tip", tip));
      const drained = st.fx.e + (fx.e || 0) < 0;
      if (drained) { b.disabled = true; b.appendChild(el("span", "drained", "🔋 Too drained for this")); }
      b.onclick = () => {
        if (b.disabled || !ready()) { if (!ready()) { lock.classList.remove("shake"); void lock.offsetWidth; lock.classList.add("shake"); } return; }
        st.picks[s.id] = i;
        apply(fx, m.s, s.id);
        st.log[st.log.length - 1].move = true;
        if (m.why) st.why = true;
        if (m.ren) st.metRen = true;
        save(); render(); const p = document.querySelector(".picked"); if (p) p.scrollIntoView({ behavior: "smooth", block: "center" });
      };
      grid.appendChild(b);
    });
    wrap.append(lock, grid);
    const refresh = () => {
      const ok = ready();
      grid.querySelectorAll(".move").forEach(b => { b.classList.toggle("locked", !ok); b.setAttribute("aria-disabled", String(!ok || b.disabled)); });
      lock.textContent = ok ? "" : "🔒 Read the clues first.";
      lock.hidden = ok;
    };
    refresh();
    return refresh;
  }

  // ---------------- Evidence check, built into the world ----------------
  let locked = false;
  const OPT_ICON = { notebook: "", phone: "👤", reply: "💬", postcard: "✏️" };
  function checkBlock(s, card) {
    const w = el("div", "world w-" + s.frame);
    w.appendChild(el("div", "w-head", s.action));
    if (s.frame === "phone" && s.post) w.appendChild(tannerPost(s.post));
    if (s.frame === "app" && s.evidence) w.appendChild(bubbles(s.evidence, "evid"));
    if (s.frame === "notebook") {
      const page = el("div", "nb-page");
      s.sheet.forEach((line, i) => {
        const p = el("p", "nb-line"); p.appendChild(el("span", "", line));
        if (i === s.sheet.length - 1) { p.appendChild(document.createTextNode(" ")); p.appendChild(el("span", "slot" + (st.done[s.id] ? " filled" : ""), st.done[s.id] ? s.options[0] : "?")); }
        page.appendChild(p);
      });
      w.appendChild(page);
    }
    w.appendChild(el("p", "w-prompt", s.q));
    card.appendChild(w);
    if (st.done[s.id]) {
      w.classList.add("solved");
      w.appendChild(stampEl(s.stamp, "good"));
      if (s.frame !== "notebook") { const a = el("div", "answer-card"); a.append(el("span", "", "✓ "), el("span", "", s.options[0])); w.appendChild(a); }
      const why = el("div", "why say"); why.appendChild(el("span", "", s.why)); card.appendChild(why);
      nextBtn(card);
      return;
    }
    const area = el("div", "opts o-" + s.frame), fb = el("p", "msg"); fb.setAttribute("aria-live", "polite");
    const hint = el("span", ""), cd = el("span", "");
    fb.append(hint, document.createTextNode(" "), cd);
    function draw() {
      area.replaceChildren();
      shuffle(s.options.map((t, n) => ({ t, n }))).forEach(o => {
        const b = el("button", "opt"); b.type = "button"; b.dataset.n = o.n;
        if (s.frame === "app") {
          const c = s.cards[o.t];
          b.append(el("span", "oi", c[0]), el("b", "", o.t), el("span", "od", c[1]));
        } else {
          if (OPT_ICON[s.frame]) b.appendChild(el("span", "oi", OPT_ICON[s.frame]));
          b.appendChild(el("span", "ot", o.t));
          if (s.frame === "phone") b.appendChild(el("span", "pin", "📌"));
        }
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            st.done[s.id] = true; if (window.classFirstTry) window.classFirstTry.right(s.id);
            save(); render();
            const sw = document.querySelector(".world"); if (sw) sw.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
          st.wrong[s.id] = (st.wrong[s.id] || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
          locked = true; b.classList.add("miss", "shake");
          area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = LOCK;
          hint.textContent = "Not quite. " + s.hint;
          fb.className = "msg bad";
          const tick = () => {
            if (left <= 0) { locked = false; cd.textContent = "Try again."; fb.className = "msg calm"; draw(); return; }
            cd.textContent = "The choices will mix up. Try again in " + left + "…";
            left--; setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
    w.appendChild(area);
    card.appendChild(fb);
  }

  // ---------------- Match (Haruto's story) ----------------
  let selLine = null;
  function matchBlock(s, card) {
    const story = el("div", "story"); story.appendChild(el("h3", "", s.storyTitle));
    card.appendChild(el("p", "prompt", "Tap a line from his story, then tap the Iowa custom it describes."));
    const grid = el("div", "mgrid"), lines = el("div", "lines"), chipsCol = el("div", "chips");
    const msg = el("p", "msg calm", "");
    const order = st.order_m6 || (st.order_m6 = shuffle(s.pairs.map((p, i) => i)));
    const chipOrder = st.order_m6c || (st.order_m6c = shuffle(s.pairs.map(p => p.a).concat([s.decoy])));
    save();
    const allDone = () => s.pairs.every((p, i) => st.match[i]);
    order.forEach(i => {
      const p = s.pairs[i];
      const b = el("button", "line"); b.type = "button";
      b.appendChild(el("span", "", p.d));
      if (st.match[i]) { b.classList.add("done"); b.appendChild(el("span", "ans", "= " + p.a)); }
      if (selLine === i) b.classList.add("sel");
      b.onclick = () => { if (st.match[i]) return; selLine = i; lines.querySelectorAll(".line").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); msg.textContent = "Now tap the Iowa custom it describes."; };
      lines.appendChild(b);
    });
    chipOrder.forEach(a => {
      const used = s.pairs.some((p, i) => st.match[i] && p.a === a);
      const b = el("button", "cchip", a); b.type = "button"; b.disabled = used;
      b.onclick = () => {
        if (selLine == null) { msg.textContent = "First tap a line from Haruto's story."; return; }
        if (s.pairs[selLine].a === a) { st.match[selLine] = true; selLine = null; save(); render(); return; }
        b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
        msg.textContent = "Not that one. Reread the line.";
      };
      chipsCol.appendChild(b);
    });
    grid.append(lines, chipsCol); story.appendChild(grid);
    card.append(story, msg);
    if (allDone()) {
      msg.textContent = "";
      story.appendChild(stampEl("DECODED", "good"));
      const r = el("div", "reveal"); r.appendChild(el("div", "rv-tag", "💡 Name it")); r.appendChild(el("p", "", s.after)); card.appendChild(r);
      nextBtn(card);
    }
  }

  // ---------------- Endings ----------------
  function ending() {
    const { t, h } = st.fx;
    if (h >= 8) return { key: "pause", cls: "e-pause", big: "⏸️", title: "Program on Pause", stage: "Ending: the exchange gets paused", meter: "h", dir: 1,
      text: "Tanner's videos hit a million views. Hoshizora High pauses its exchange with Marion. Next year's students won't get to go, including Haruto's little sister.",
      reveal: "Ethnocentric hot takes don't just hurt feelings. They damage real relationships between groups of people." };
    if (t >= 7 && h <= 5) return { key: "home", cls: "e-home", big: "🏡", title: "Second Home", stage: "Stage reached: Acceptance", meter: "t", dir: 1,
      text: "Month 3: you bow without thinking. You'll miss cleaning time. Yui is already planning a visit to Iowa.",
      reveal: "You reached the <b>acceptance stage</b>: the new way feels normal. Back in Marion, your little brother walks into the kitchen in muddy sneakers, and it looks SO wrong to you. That's <b>reverse culture shock</b>." };
    if (t <= 3) return { key: "sick", cls: "e-sick", big: "✈️", title: "Homesick Exit", stage: "Stage reached: stuck in Frustration", meter: "t", dir: -1,
      text: "You ask to fly home a month early. Judging Osaka by Marion's rules, or hiding from people, made every day harder.",
      reveal: "You never got past the <b>frustration stage</b>. When you treat home as the only normal, or stay away from people, a new place keeps feeling wrong." };
    const blocked = t >= 7;   // trust was high enough, but the hot takes kept people wary
    return { key: "out", cls: "e-out", big: "🙂", title: "Polite Outsider", stage: "Stage reached: Adjustment", meter: blocked ? "h" : "t", dir: blocked ? 1 : -1,
      why: blocked ? "Your friends trusted you, but Tanner's hot takes made the rest of the school suspicious." : "What held you back:",
      text: "You got by. You know the rules now, but you never got really close to anyone. Osaka still doesn't feel like home.",
      reveal: "You're in the <b>adjustment stage</b>: you learned the rules, but the new culture doesn't feel like yours yet." };
  }
  function causedBy(e) {
    const m = e.meter, w = x => (x.want || x.fx || {})[m] || 0;
    let rows = st.log.filter(x => w(x));
    if (e.dir > 0) rows = rows.filter(x => w(x) > 0);
    if (e.dir < 0) rows = rows.filter(x => w(x) < 0);
    return rows.slice().sort((a, b) => Math.abs(w(b)) - Math.abs(w(a))).slice(0, 5);
  }
  function endBlock(card, compact) {
    const e = ending();
    const box = el("div", "ending " + e.cls);
    box.append(el("div", "big", e.big), el("div", "stage", e.stage), el("h2", "", e.title));
    if (!compact) box.appendChild(stampEl("SEMESTER OVER", ""));
    if (!compact) box.appendChild(el("p", "say", e.text));
    card.appendChild(box);
    if (compact) return e;
    const c = el("div", "caused"); c.appendChild(el("h3", "", "Caused by:"));
    if (e.why) c.appendChild(el("p", "", e.why));
    const ul = el("ul", "");
    causedBy(e).forEach(x => { const li = el("li", ""); li.append(el("span", "", x.l), document.createTextNode(" "), chips(x.want || x.fx)); ul.appendChild(li); });
    if (!ul.children.length) ul.appendChild(el("li", "", "Playing it safe. You never took a big risk to get close to people."));
    c.appendChild(ul); card.appendChild(c);
    const f = el("div", "finals");
    [["🤝 Trust", st.fx.t, 10], ["🔋 Energy", st.fx.e, 6], ["🔥 Hot takes", st.fx.h, 10]].forEach(([l, v, m]) => { const s = el("span", ""); s.append(el("span", "", l), document.createTextNode(" " + v + "/" + m)); f.appendChild(s); });
    card.appendChild(f);
    const r = el("div", "reveal"); r.appendChild(el("div", "rv-tag", "💡 Name it")); r.appendChild(html("p", "", e.reveal)); card.appendChild(r);
    return e;
  }

  // ---------------- Writing + turn in ----------------
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writeBlock(card) {
    card.appendChild(el("p", "kick", "Last step"));
    card.appendChild(el("h2", "", "Read Your Own Room"));
    const cap = el("div", "cap"); cap.append(el("span", "ci", "🎬"), el("span", "", "You just saw Osaka and Iowa from the outside. Now look at your own school and town. Answer both in 1–2 full sentences.")); card.appendChild(cap);
    WRITING.forEach(p => {
      const box = el("div", "compose");
      box.appendChild(el("div", "w-head", p.frame));
      const lab = el("label", "wl", p.label); lab.htmlFor = "w_" + p.id;
      const stem = el("p", "stem", "Start like this: " + p.stem);
      const use = el("button", "usestem", "Use this starter"); use.type = "button";
      const ta = el("textarea", ""); ta.id = "w_" + p.id; ta.rows = 3; ta.value = st.writing[p.id] || "";
      use.onclick = () => { if (!ta.value.trim()) { ta.value = isEs() ? tr(p.stem) : p.stem; st.writing[p.id] = ta.value; save(); } ta.focus(); const k = ta.value.indexOf("___"); if (k >= 0) ta.setSelectionRange(k, k + 3); };
      ta.addEventListener("input", () => { st.writing[p.id] = ta.value; save(); });
      box.append(lab, stem, use, ta);
      card.appendChild(box);
    });
    const send = el("button", "go", st.turnedIn ? "Turn in again" : "Turn in"); send.type = "button"; send.id = "sendBtn";
    const msg = el("p", "msg", st.turnedIn ? "✓ Turned in. You can fix your writing and turn it in again." : ""); msg.id = "sendMsg"; msg.setAttribute("role", "status"); msg.setAttribute("aria-live", "polite");
    if (st.turnedIn) msg.className = "msg good";
    card.append(send, msg);
    send.onclick = () => turnIn(send, msg);
  }
  async function turnIn(send, msg) {
    for (const p of WRITING) {
      const box = $("w_" + p.id), v = (box.value || "").trim();
      const say = (t, cls) => { msg.textContent = t; msg.className = "msg " + (cls || "bad"); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: isEs() ? tr(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
        if (junk) { say((isEs() ? "En " + tr(p.short) : "For " + p.short) + ": " + junk, "calm"); return; }
      }
      if (v.length < p.min) { say("Write a little more for: " + p.short + " (1–2 full sentences)."); box.focus(); return; }
      if (/_{2,}/.test(v)) { say("Fill in the blanks with your own words for: " + p.short + "."); box.focus(); return; }
      const stemText = window.SiteLang ? p.stem + " " + window.SiteLang.t(p.stem) : p.stem;
      const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
      const own = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (own.size < p.newWords) { say("Add more of your own ideas for: " + p.short + ". Use details from today."); box.focus(); return; }
      let groups = p.mustAll;
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) { say(p.mustMsg); box.focus(); return; }
    }
    const answers = { "Standard": STANDARD };
    const right = CHECKS.filter(c => !st.wrong[c.id]).length;
    answers["First-try correct"] = right + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    WRITING.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    CHECKS.forEach(c => { const w = st.wrong[c.id]; answers[c.short] = c.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    DECISIONS.forEach(d => { if (st.picks[d.id] != null) answers["Choice · " + d.short] = d.moves[st.picks[d.id]].label; });
    const e = ending();
    answers["Ending reached"] = e.title + " (" + e.stage.replace(/^(Stage reached|Ending): /, "") + ")";
    answers["Final meters"] = "Trust " + st.fx.t + "/10 · Energy " + st.fx.e + "/6 · Tanner's hot takes " + st.fx.h + "/10";
    const flipped = STEPS.filter(s => s.clues).reduce((n, s) => n + ((st.flips[s.id] || []).length), 0), clueTotal = STEPS.filter(s => s.clues).reduce((n, s) => n + s.clues.length, 0);
    answers["Clues read"] = flipped + " of " + clueTotal;
    send.disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      send.textContent = "Turned in ✓";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; send.disabled = false; }
  }

  // ---------------- Intro ----------------
  function intro(app) {
    const c = el("section", "card");
    const g = el("div", "intro");
    const left = el("div", "");
    left.appendChild(el("p", "kick", "Sociology · Unit 2 · Day 3"));
    left.appendChild(html("h1", "", "Read the Room: <em>Osaka</em>"));
    left.appendChild(el("p", "hook", "You're Maya, 17, from Marion. You just landed in Osaka, Japan, for a semester. Everything you think is “normal” stops working."));
    const f = el("div", "facts"); ["🔍 Read clues", "🤝 Earn trust", "🔥 Beat a vlogger", "⏱ About 25 min", "✅ 5 quick checks"].forEach(x => f.appendChild(el("span", "", x)));
    left.appendChild(f);
    left.appendChild(html("p", "goal", "<b>Today's goal:</b> Explain culture shock, ethnocentrism, and cultural relativism, and how your own culture shapes what feels normal to you."));
    left.appendChild(el("p", "std", "SS.9-12.Soc.6: Analyze how culture influences individuals, including themselves. · SS.9-12.Soc.5: Describe the components of culture."));
    const lab = el("label", "namefield", "Your name: first name + last initial (like Jordan M.)"); lab.htmlFor = "nameBox";
    const inp = el("input", ""); inp.id = "nameBox"; inp.maxLength = 60; inp.autocomplete = "off"; inp.placeholder = "First name + last initial (like Jordan M.)"; inp.value = st.name || "";
    const msg = el("p", "msg", ""); msg.id = "introMsg"; msg.setAttribute("role", "status");
    const go = el("button", "go startbtn", "Land in Osaka ✈️"); go.type = "button"; go.id = "startBtn";
    go.onclick = () => {
      const fixed = window.classShortName ? window.classShortName(inp.value) : inp.value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { msg.textContent = "Type your first name and last initial, like Jordan M."; msg.className = "msg bad"; inp.focus(); return; }
      st.name = fixed; st.step = 0; save(); render(); window.scrollTo(0, 0);
    };
    inp.addEventListener("keydown", e => { if (e.key === "Enter") go.click(); });
    left.append(lab, inp, msg, go);
    const right = el("div", "poster"); right.setAttribute("aria-hidden", "true");
    right.appendChild(el("div", "plane", "✈️"));
    const route = el("div", "route"); route.append(el("span", "", "Marion, IA"), el("i", ""), el("span", "", "Osaka, Japan")); right.appendChild(route);
    const tiles = el("div", "tiles");
    [["🤝", "Trust"], ["🔋", "Energy"], ["🔥", "Hot takes"]].forEach(([i, l]) => { const d = el("div", ""); d.append(el("b", "", i), el("span", "", l)); tiles.appendChild(d); });
    right.appendChild(tiles);
    const rv = el("div", "rival"); rv.append(el("span", "", "📹"), el("span", "", "Watch out for @TannerAbroad. His hot takes wreck everything.")); right.appendChild(rv);
    g.append(left, right); c.appendChild(g); app.appendChild(c);
  }

  // ---------------- Render ----------------
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    const app = $("app"); app.replaceChildren();
    hud();
    if (st.step < 0) return intro(app);
    const s = STEPS[Math.min(st.step, TOTAL - 1)];
    enter(s); hud();
    const card = el("section", "card"); card.dataset.step = s.id;
    if (s.kind === "end") {
      card.appendChild(el("p", "kick", "End of the semester"));
      endBlock(card, false);
      nextBtn(card, "Last step: your turn →");
      app.appendChild(card); return;
    }
    if (s.kind === "write") { endBlock(card, true); writeBlock(card); app.appendChild(card); return; }
    if (s.bg) card.appendChild(banner(s));
    notesFor(s, card);
    card.appendChild(el("h2", "", s.title));
    const cap = el("div", "cap"); cap.append(el("span", "ci", "🎬"), el("span", "", s.lede)); card.appendChild(cap);
    if (s.post && s.frame !== "phone") card.appendChild(tannerPost(s.post));
    if (s.chat) card.appendChild(bubbles(s.chat));
    if (s.evidence && s.frame !== "app") card.appendChild(bubbles(s.evidence, "chat"));
    app.appendChild(card);
    if (s.kind === "match") return matchBlock(s, card);
    if (s.kind === "check") {
      if (s.clues) {
        const holder = el("div", ""); card.appendChild(holder);
        const ready = clueGrid(s, holder, () => { if (ready()) render(); });
        if (!ready()) { card.appendChild(el("p", "lockmsg", "🔒 Read the clues first.")); return; }
      }
      if (s.terms) { const g = el("div", "terms"); s.terms.forEach(([k, d]) => { const t = el("div", "ev"); t.append(el("span", "nm", k), el("span", "", d)); g.appendChild(t); }); card.appendChild(g); }
      return checkBlock(s, card);
    }
    let refresh = () => {};
    const ready = s.clues ? clueGrid(s, card, () => refresh()) : () => true;
    refresh = movesBlock(s, card, ready) || (() => {});
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; selLine = null; locked = false;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0) {
    const w = $("welcome");
    w.textContent = "Welcome back, " + st.name + " — you're on step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL + ".";
    w.hidden = false;
  }
  render();
})();
