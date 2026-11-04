// =====================================================================
//  READ THE ROOM: OSAKA  (Sociology Unit 2 Day 3, SS.9-12.Soc.6 + Soc.5)
//  You are Maya, an exchange student from Marion in Osaka for a semester.
//  Core loop: read clue cards before you act (reading context), then pick a move.
//  Three meters: Trust (your new friends), Energy (culture shock wears you down),
//  and Tanner's Hot Takes (a rival vlogger's ethnocentric posts). Moves that judge
//  by Marion's rules, or join Tanner, buy energy but cost trust and spread heat.
//  5 evidence checks are built into play. Strict order, saves on this device.
//  WORD BUDGET (Fynn 2026-11-03): every screen <= 35 words to read. After a pick or a
//  solved check, the setup collapses so the result screen is short.
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
  const isT = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };   // Test T. (teacher preview)
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (window.SiteLang ? window.SiteLang.t(s) : s);
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function html(tag, cls, h) { const e = document.createElement(tag); if (cls) e.className = cls; e.innerHTML = h; return e; }
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: { t: 3, e: 5, h: 0 }, flips: {}, picks: {}, wrong: {}, done: {}, entered: {}, notes: {}, match: {}, log: [], why: false, metRen: false, writing: {}, wpage: 0, turnedIn: false });
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
  // Oberg, "Culture Shock: Adjustment to New Cultural Environments" (1960). Shortened with ellipses.
  const OBERG = "“…cues [signals]… are acquired [learned] by all of us in the course of growing up…”";
  const OBERG_SRC = "Kalervo Oberg, anthropologist, 1960";
  const STEPS = [
    // 1 -------------------------------------------------------------
    { id: "s1", kind: "scene", when: "Week 1", where: "Hoshizora High", art: ["🏫", "👟", "🥿"], bg: "linear-gradient(120deg,#fde7ee,#e6efff)",
      title: "The Front Door",
      lede: "First day. Everyone stops at the door.",
      clues: [
        { i: "👟", t: "👟 Cubbies full of sneakers." },
        { i: "🥿", t: "🥿 Inside: white indoor shoes." },
        { i: "📦", t: "📦 Box marked 来客用 (“for guests”): slippers." }
      ], need: 2, howTo: "Flip 2 clues to unlock",
      short: "Week 1 · School entrance",
      moves: [
        { i: "🚶", s: "Keep sneakers on", label: "Walk to class in your sneakers", fx: { t: -2 }, result: "Every head turns. A teacher points at your feet." },
        { i: "🥿", s: "Cubby + guest slippers", label: "Put your sneakers in a cubby and grab guest slippers", fx: { t: 2 }, result: "A girl gives you a thumbs-up. That's Yui." },
        { i: "🧦", s: "Carry your shoes", label: "Take your shoes off and carry them to class", fx: {}, result: "Close! But kids giggle at the shoes in your hand." }
      ],
      reveal: "Switching shoes is a <b>norm</b>: an expected, learned way to act." },

    // 2 -------------------------------------------------------------
    { id: "c1", kind: "check", std: "Soc.5", short: "Value behind the shoe norm", action: "📓 Cue Notebook", frame: "notebook", stamp: "LOGGED",
      sheet: ["NORM: Switch shoes at the door.", "VALUE:"],
      title: "Why the Shoes?",
      evidence: [
        { cls: "bub yui", nm: "Yui", t: "“Outside dirt stays outside. It's everyone's school, so we all take care of it.”" }
      ],
      q: "Which VALUE is behind it?",
      options: ["Keeping shared spaces clean", "Making guests feel welcome", "Doing whatever teachers say", "Saving money on new floors"],
      hint: "Reread Yui. What is the switch FOR?",
      why: "A <b>value</b> (clean shared space) creates a <b>norm</b> (switch shoes)." },

    // 3 -------------------------------------------------------------
    { id: "s2", kind: "scene", when: "Week 2", where: "Classroom 2-B", art: ["🧹", "🪣", "✨"], bg: "linear-gradient(120deg,#e1f3f1,#fff1dc)",
      enter: { e: 1, note: "😴 Rested up." },
      title: "Last Bell",
      lede: "Your teacher hands you a rag. Nobody leaves.",
      clues: [
        { i: "📋", t: "📋 Board: 掃除 (soji) = cleaning time." },
        { i: "🚫", t: "🚫 No janitor cart anywhere." },
        { i: "👩‍🏫", t: "👩‍🏫 Your teacher grabs a broom too." }
      ], need: 2,
      short: "Week 2 · Cleaning time",
      moves: [
        { i: "🎒", s: "Leave. Janitors got it.", label: "Grab your bag. The janitors will handle it.", fx: { t: -2 }, result: "The room goes quiet. Yui doesn't wave goodbye." },
        { i: "🧽", s: "Copy and wipe", label: "Copy the kid next to you and start wiping", fx: { t: 1 }, result: "It goes fine. You still don't get WHY." },
        { i: "❓", s: "Ask Yui why", label: "Ask Yui why everyone cleans, then join in", fx: { t: 2, e: -1 }, why: true, tip: "+ 💡 Why Card", result: "Yui: “It's our school. It teaches teamwork.” 💡 Why Card earned!" }
      ],
      reveal: "Asking “why?” before judging is <b>cultural relativism</b>: seeing a custom from inside its culture." },

    // 4 -------------------------------------------------------------
    { id: "c2", kind: "check", std: "Soc.6", short: "Relativist comment on cleaning time", action: "📱 Comments", frame: "phone", stamp: "PINNED",
      enter: { h: 1, note: "🔥 Tanner posted." },
      when: "Week 2", where: "Your phone", art: ["📱", "😬", "🔥"], bg: "linear-gradient(120deg,#ffe9dc,#fff6d6)",
      title: "Tanner's Hot Take",
      post: { txt: "JAPAN MAKES KIDS BE THE JANITORS?? 💀 #JapanIsWeird", meta: "48K views", first: true },
      q: "Pin the comment that shows cultural relativism. 📌",
      comments: true,
      options: ["Why do they do it? Maybe teamwork?", "Why don't they just hire janitors?", "Japan's way is better. US is lazy.", "Cleaning is gross. No kid should."],
      hint: "Relativism doesn't rank cultures. It asks why.",
      why: "<b>Cultural relativism</b> asks why first. Ranking either culture isn't relativism." },

    // 5 -------------------------------------------------------------
    { id: "d2", kind: "decide", when: "Week 2", where: "Your phone", art: ["💬", "🙈", "🔁"], bg: "linear-gradient(120deg,#ffe9dc,#fde7ee)",
      title: "Answer Tanner?",
      lede: "Yui's friends saw the post. What do YOU say?",
      short: "Week 2 · Tanner's janitor post",
      moves: [
        { i: "💬", s: "Reply with the why", label: "Reply and explain why they clean", fx: s => s.why ? { e: -1, h: -2, t: 1 } : { e: -2, h: -1, t: 1 }, tipIf: s => s.why ? "💡 Why Card: stronger" : "",
          result: s => s.why ? "Your reply gets pinned. Yui texts you ❤️." : "You can't explain WHY. It helps a little." },
        { i: "🙈", s: "Scroll past", label: "Scroll past. Not your fight.", fx: { h: 2 }, result: "200K views. Classmates wonder if all Americans agree." },
        { i: "🔁", s: "Duet it 😂", label: "Duet it: “fr this is wild 😂”", fx: { e: 2, t: -2, h: 2 }, result: "Friends back home laugh. Then Yui sees it." }
      ],
      reveal: "Tanner's post is <b>ethnocentrism</b>: judging a culture by your own culture's rules." },

    // 6 -------------------------------------------------------------
    { id: "s3", kind: "scene", when: "Week 4", where: "Osaka subway", art: ["🚇", "📱", "🤫"], bg: "linear-gradient(120deg,#e9eef3,#e6efff)",
      enter: { e: -3, note: "😩 The fun wore off.", bad: true },
      title: "The Quiet Train",
      lede: "Mom is calling. You haven't talked in 3 days.",
      clues: [
        { i: "📵", t: "📵 Sign: phones on silent, no calls." },
        { i: "🤫", t: "🤫 Packed car, almost silent." },
        { i: "📱", t: "📱 Everyone's texting, not talking." }
      ], need: 2,
      short: "Week 4 · Mom calls on the train",
      moves: [
        { i: "📞", s: "Answer the call", label: "Answer it. You really miss her.", fx: { e: 2, t: -2 }, result: "Mom helps. But the whole car stares at you." },
        { i: "💬", s: "Decline + text", label: "Decline and text: “On the train. Call you in 20.”", fx: { e: -1 }, result: "Nobody looks up. Hanging up on Mom stings." },
        { i: "🚉", s: "Hop off and call", label: "Get off at the next stop and call her there", fx: { e: 1, t: -1 }, result: "You talk on the platform. Late for class." }
      ],
      reveal: "<b>Culture shock</b>: stress from losing the signals you grew up with.",
      src: OBERG_SRC },

    // 7 -------------------------------------------------------------
    { id: "c3", kind: "check", std: "Soc.6", short: "Week 4 stage = hostility", action: "📈 Mood Log", frame: "app", stamp: "LOGGED",
      cards: { "Honeymoon": ["🌸", "Everything is exciting."], "Hostility": ["😤", "Annoyed. You blame the new place."], "Recovery": ["🧭", "You learn the rules, laugh at mistakes."], "Adjustment": ["🏡", "The new way feels normal."] },
      title: "How Are You Doing?",
      evidence: [
        { cls: "ev", nm: "Week 1", t: "“Everything here is SO cool 😍”" },
        { cls: "ev", nm: "Week 4", t: "“I keep messing up. I miss home. I HATE this train.”" }
      ],
      q: "Which stage card matches Week 4?",
      options: ["Hostility", "Honeymoon", "Recovery", "Adjustment"],
      hint: "Match your Week 4 words to a card.",
      why: "Week 1 was <b>honeymoon</b>. Week 4 is <b>hostility</b>. It usually passes." },

    // 8 -------------------------------------------------------------
    { id: "d3", kind: "decide", when: "Week 4", where: "Friday night", art: ["🎮", "📞", "🎤"], bg: "linear-gradient(120deg,#ede6ff,#fde7ee)",
      title: "Two Invites",
      chat: [
        { cls: "bub tan", nm: "Tanner", t: "“Rant stream tonight? Americans roasting Japan lol.”" },
        { cls: "bub yui", nm: "Yui", t: "“Karaoke after school? 🎤”" }
      ],
      short: "Week 4 · Friday night plan",
      moves: [
        { i: "🎮", s: "Tanner's rant stream", label: "Join Tanner's rant stream", fx: { e: 3, t: -1, h: 2 }, result: "Complaining feels SO good. Clips end up online." },
        { i: "📞", s: "Skip both. Call Mom.", label: "Skip both. Call Mom from your room.", fx: { e: 2, h: 1 }, result: "Mom helps. Tanner streams anyway. Nobody pushes back." },
        { i: "🎤", s: "Karaoke with Yui", label: "Go to karaoke with Yui", fx: { e: -1, t: 2 }, ren: true, result: "Wiped out, but fun. You meet Yui's cousin Ren." }
      ],
      reveal: "Trashing the new place with other outsiders keeps you in <b>hostility</b>.",
      src: "Kalervo Oberg, “Culture Shock,” 1960" },

    // 9 -------------------------------------------------------------
    { id: "s4", kind: "scene", when: "Week 5", where: "Lunch", art: ["🍱", "🥪", "📸"], bg: "linear-gradient(120deg,#fff1dc,#fde7ee)",
      enter: { e: 2, note: "😌 Rested.", heatCheck: true },
      title: "Yui's Bento",
      lede: "You brought chips.",
      chat: [{ cls: "bub tan", nm: "Tanner", t: "“Send me the weirdest lunch pic 👀”" }],
      clues: [
        { i: "🍱", t: "🍱 Bento: a lunch box from home." },
        { i: "👀", t: "👀 Yui looks curious about your chips." },
        { i: "🥢", t: "🥢 Classmates trade bites." }
      ], need: 2,
      short: "Week 5 · Lunch + Tanner's DM",
      moves: [
        { i: "📸", s: "Send Tanner the pic", label: "Snap Yui's bento and send it to Tanner", fx: { e: 1, t: -3, h: 3 }, result: "Yui sees her lunch in his video: “GROSS??” She moves desks." },
        { i: "🍙", s: "Ask Yui. Trade bites.", label: "Ask Yui what's in it and trade a bite", fx: { e: -1, t: 2 }, result: "Rice, fish, pickles. Next day, Yui brings you a rice ball." },
        { i: "🚪", s: "Eat in the hallway", label: "Eat in the hallway so nobody sees your lunch", fx: { t: -1 }, result: "No awkward moment. No new friend either." }
      ],
      reveal: "Calling normal food “gross” is <b>ethnocentrism</b>: your food becomes the measuring stick." },

    // 10 ------------------------------------------------------------
    { id: "c4", kind: "check", std: "Soc.5", short: "Amemura crowd = subculture", action: "💬 Your reply", frame: "reply", stamp: "POSTED",
      enter: { h: 1, note: "🔥 New post." },
      when: "Month 2", where: "Osaka", art: ["🎸", "🧥", "🛍️"], bg: "linear-gradient(120deg,#ede6ff,#e1f3f1)",
      title: "Amerikamura",
      post: { txt: "EVERYONE in Japan dresses like this 🤯" },
      clues: [
        { i: "🎸", t: s => s.metRen ? "🎸 Ren waves: “I still spend New Year's at Grandma's.”" : "🎸 Yui's cousin Ren: “I still spend New Year's at Grandma's.”" },
        { i: "🚆", t: "🚆 Train riders: suits, uniforms." }
      ], need: 2,
      q: "That crowd is a…",
      options: ["Subculture: own style, still part of Japan", "Counterculture: rejects Japan's main values", "Main culture: how all of Japan dresses", "Trend: what every teen in Japan wears"],
      hint: "Reread Ren. Does he reject his family's traditions?",
      why: "Ren's crowd is a <b>subculture</b>: own style, still part of Japan's culture." },

    // 11 ------------------------------------------------------------
    { id: "d5", kind: "decide", when: "Month 2", where: "Saturday night", art: ["🎸", "🎥", "💬"], bg: "linear-gradient(120deg,#ede6ff,#ffe9dc)",
      enter: { e: 2, note: "😌 Rested.", heatCheck: true, heatBefore: "c4" },
      title: "Big Night",
      lede: "Ren's band plays tonight. Tanner wants you in “Weird Japan Pt. 2.”",
      short: "Month 2 · Saturday night",
      moves: [
        { i: "🎸", s: "Ren's show with Yui", label: "Go to Ren's show with Yui", fx: { e: -2, t: 2 }, result: "Loud, great music. Ren's grandma cheers in the crowd." },
        { i: "🎥", s: "Film with Tanner", label: "Film “Weird Japan Pt. 2” with Tanner", fx: { e: 2, t: -2, h: 3 }, result: "The video blows up. Ren unfollows you." },
        { i: "💬", s: "Post a correction", label: "Stay in and post: “That's ONE neighborhood, not all of Japan.”", fx: { e: -1, h: -2 }, result: "“That's ONE neighborhood, not all Japan.” It gets shared." }
      ],
      reveal: "One group stamped onto a whole country is a <b>stereotype</b>." },

    // 12 ------------------------------------------------------------
    { id: "m6", kind: "match", when: "Month 3", where: "Mail from Marion", art: ["✉️", "🌽", "🚜"], bg: "linear-gradient(120deg,#e6efff,#fff1dc)",
      title: "The Strange People of Awoi",
      lede: "Haruto, staying with your family, wrote this about Iowa.",
      pairs: [
        { d: "“Drivers lift one finger at every stranger.”", a: "Waving at passing drivers" },
        { d: "“Each summer, crowds stare at a butter cow.”", a: "The Iowa State Fair" },
        { d: "“Almost bump? Both make a short magic sound.”", a: "Saying “ope”" }
      ],
      decoy: "Friday night football",
      after: "Awoi is Iowa backward, like Horace Miner's 1956 “Nacirema” (American)." },

    // 13 ------------------------------------------------------------
    { id: "c5", kind: "check", std: "Soc.6", short: "Point of Haruto's Awoi story", action: "✉️ Postcard to Haruto", frame: "postcard", stamp: "SENT",
      title: "Haruto's Point",
      evidence: [
        { cls: "ev", nm: "Haruto", t: "“You just know the wave. I had to learn it.”" },
        { cls: "ev", nm: "", t: OBERG, by: OBERG_SRC }
      ],
      q: "“I get it, Haruto…”",
      options: ["Normal is learned, so outsiders find it odd", "Iowa is way stranger than most other places", "People are born knowing their culture's habits", "Outsiders always get every culture wrong"],
      hint: "Was the wave learned, or are people born doing it?",
      why: "Culture teaches your “normal.” From outside, any normal looks strange, yours too." },

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
      frame: "📝 Your exchange blog", label: "1. One norm at our school or in town: why is it normal?",
      stem: "One norm here is ___. It's normal because ___. Outsiders might think ___.",
      min: 70, newWords: 6, mustAll: [["because", "since", "learn", "grew up", "taught", "raised"]], mustMsg: "In answer 1, explain WHY it feels normal here (use “because”)." },
    { id: "lens", short: "Explain an Iowa custom to Haruto",
      frame: "💬 Text to Haruto", label: "2. Explain one to Haruto, no judging: the wave, State Fair, “ope,” or football.",
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
    const who = el("div", "who", "@TannerAbroad"); if (p.first) who.appendChild(el("small", "", "vlogger (made up)"));
    top.append(el("div", "av", "T"), who, el("span", "live", "TRENDING"));
    box.append(top, el("div", "txt", p.txt));
    if (p.meta) box.appendChild(el("div", "meta", p.meta));
    return box;
  }
  function bubbles(list, cls) {
    const wrap = el("div", cls || "chat");
    list.forEach(b => {
      const d = el("div", b.cls);
      if (b.nm) d.appendChild(el("span", "nm", b.nm));
      d.appendChild(el("span", "", b.t));
      if (b.by) d.appendChild(el("span", "by", "— " + b.by));
      wrap.appendChild(d);
    });
    return wrap;
  }
  function notesFor(s, card) {
    (st.notes[s.id] || []).forEach(n => {
      const d = el("div", "note" + (n.bad ? " bad" : ""));
      d.appendChild(el("span", "", n.t)); if (n.fx && Object.keys(n.fx).length) d.appendChild(chips(n.fx));
      card.appendChild(d);
    });
  }
  // One line: bold term + a few words. Small gray source line under it if there is one.
  function revealBox(text, src) {
    const r = el("div", "reveal");
    r.appendChild(el("div", "rv-tag", "💡"));
    r.appendChild(html("p", "", text));
    if (src) r.appendChild(el("p", "src", src));
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
    // heatBefore: judge the school's mood from the heat BEFORE that step's new post (same balance as before the trim).
    const heatNow = en.heatBefore ? st.fx.h - st.log.filter(x => x.s === en.heatBefore).reduce((n, x) => n + (x.fx.h || 0), 0) : st.fx.h;
    if (en.heatCheck && heatNow >= 5) {
      const msg = "📹 Videos hit school.";
      notes.push({ t: msg, fx: apply({ t: -1 }, msg, s.id), bad: true });
    }
    if (en.h) { const m = en.note2 || en.note; notes.push({ t: m, fx: apply({ h: en.h }, m, s.id), bad: true }); }
    st.notes[s.id] = notes; save();
  }

  // ---------------- Clues ----------------
  function clueGrid(s, card, onChange) {
    const flips = st.flips[s.id] || (st.flips[s.id] = []);
    const head = el("div", "cluehead");
    const count = el("span", "cc");
    const drawCount = () => { const n = Math.min(flips.length, s.need); count.textContent = (n >= s.need ? "🔓 " : "🔒 ") + n + "/" + s.need; };
    head.append(el("b", "", "🔍"), s.howTo ? el("span", "how", s.howTo) : "", count);
    drawCount();
    const grid = el("div", "clues");
    s.clues.forEach((c, i) => {
      const b = el("button", "clue"); b.type = "button";
      const draw = () => {
        b.replaceChildren();
        if (flips.includes(i) || st.picks[s.id] != null || st.done[s.id]) { b.classList.add("open"); b.appendChild(el("span", "", val(c.t, st))); b.setAttribute("aria-label", val(c.t, st)); }
        else { b.append(el("span", "big", c.i), el("span", "tap", "🔍")); b.setAttribute("aria-label", "Tap to look"); }
      };
      draw();
      b.onclick = () => { if (flips.includes(i)) return; flips.push(i); save(); draw(); drawCount(); onChange(); };
      grid.appendChild(b);
    });
    card.append(head, grid);
    return () => isT() || flips.length >= s.need;   // Test T. doesn't have to flip clues first
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
      box.append(row, el("p", "result say", val(m.result, st)));
      if (Object.keys(got).length) { const r = el("div", "fxrow"); r.appendChild(chips(got)); box.appendChild(r); }
      wrap.appendChild(box);
      wrap.appendChild(revealBox(s.reveal, s.src));
      nextBtn(wrap);
      return;
    }
    const lock = el("p", "lockmsg", "");
    if (s.prompt) wrap.appendChild(el("p", "prompt", s.prompt));
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
      if (drained) { b.disabled = true; b.appendChild(el("span", "drained", "🔋 Too tired")); }
      b.onclick = () => {
        if (b.disabled || !ready()) { if (!ready()) { lock.classList.remove("shake"); void lock.offsetWidth; lock.classList.add("shake"); } return; }
        st.picks[s.id] = i;
        apply(fx, m.s, s.id);
        st.log[st.log.length - 1].move = true;
        if (m.why) st.why = true;
        if (m.ren) st.metRen = true;
        save(); render(); window.scrollTo(0, 0);
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
    const solved = !!st.done[s.id];
    const w = el("div", "world w-" + s.frame);
    w.appendChild(el("div", "w-head", s.action));
    if (!solved && s.frame === "phone" && s.post) w.appendChild(tannerPost(s.post));
    if (!solved && s.frame === "app" && s.evidence) w.appendChild(bubbles(s.evidence, "evid"));
    if (s.frame === "notebook") {
      const page = el("div", "nb-page");
      s.sheet.forEach((line, i) => {
        const p = el("p", "nb-line"); p.appendChild(el("span", "", line));
        if (i === s.sheet.length - 1) { p.appendChild(document.createTextNode(" ")); p.appendChild(el("span", "slot" + (solved ? " filled" : ""), solved ? s.options[0] : "?")); }
        page.appendChild(p);
      });
      w.appendChild(page);
    }
    if (!solved) w.appendChild(el("p", "w-prompt", s.q));
    card.appendChild(w);
    if (solved) {
      w.classList.add("solved");
      w.appendChild(stampEl(s.stamp, "good"));
      if (s.frame !== "notebook") { const a = el("div", "answer-card"); a.append(el("span", "", "✓ "), el("span", "", s.options[0])); w.appendChild(a); }
      card.appendChild(revealBox(s.why));
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
            save(); render(); window.scrollTo(0, 0);
            return;
          }
          st.wrong[s.id] = (st.wrong[s.id] || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
          locked = true; b.classList.add("miss", "shake");
          area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = isT() ? 0 : LOCK;   // Test T. skips the wrong-answer wait
          hint.textContent = "Not quite. " + s.hint;
          fb.className = "msg bad";
          const tick = () => {
            if (left <= 0) { locked = false; cd.textContent = "Try again."; fb.className = "msg calm"; draw(); return; }
            cd.textContent = "Shuffling in " + left + "…";
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
    const allDone = () => s.pairs.every((p, i) => st.match[i]);
    const story = el("div", "story");
    if (!allDone()) card.appendChild(el("p", "prompt", "Match each line to a custom."));
    else { const cap = card.querySelector(".cap"); if (cap) cap.remove(); }
    const grid = el("div", "mgrid"), lines = el("div", "lines"), chipsCol = el("div", "chips");
    const msg = el("p", "msg calm", "");
    const order = st.order_m6 || (st.order_m6 = shuffle(s.pairs.map((p, i) => i)));
    const chipOrder = st.order_m6c || (st.order_m6c = shuffle(s.pairs.map(p => p.a).concat([s.decoy])));
    save();
    order.forEach(i => {
      const p = s.pairs[i];
      const b = el("button", "line"); b.type = "button";
      b.appendChild(el("span", "", p.d));
      if (st.match[i]) { b.classList.add("done"); b.appendChild(el("span", "ans", "= " + p.a)); }
      if (selLine === i) b.classList.add("sel");
      b.onclick = () => { if (st.match[i]) return; selLine = i; lines.querySelectorAll(".line").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); msg.textContent = "Now tap its custom."; };
      lines.appendChild(b);
    });
    chipOrder.forEach(a => {
      const used = s.pairs.some((p, i) => st.match[i] && p.a === a);
      const b = el("button", "cchip", a); b.type = "button"; b.disabled = used;
      b.onclick = () => {
        if (selLine == null) { msg.textContent = "Tap a line first."; return; }
        if (s.pairs[selLine].a === a) { st.match[selLine] = true; selLine = null; save(); render(); return; }
        b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
        msg.textContent = "Not that one.";
      };
      chipsCol.appendChild(b);
    });
    grid.append(lines, chipsCol); story.appendChild(grid);
    card.append(story, msg);
    if (allDone()) {
      msg.textContent = "";
      story.appendChild(stampEl("DECODED", "good"));
      card.appendChild(revealBox(s.after));
      nextBtn(card);
    }
  }

  // ---------------- Endings ----------------
  function ending() {
    const { t, h } = st.fx;
    if (h >= 8) return { key: "pause", cls: "e-pause", big: "⏸️", title: "Program on Pause", stage: "Ending: the exchange gets paused", meter: "h", dir: 1,
      text: "Tanner's videos hit a million views. Hoshizora High pauses its exchange with Marion.",
      reveal: "<b>Ethnocentric</b> hot takes damage real relationships between groups." };
    if (t >= 7 && h <= 5) return { key: "home", cls: "e-home", big: "🏡", title: "Second Home", stage: "Stage reached: Adjustment", meter: "t", dir: 1,
      text: "You bow without thinking. Back in Marion, muddy sneakers indoors look SO wrong.",
      reveal: "<b>Adjustment</b>: the new way feels normal. Home feels odd: <b>reverse culture shock</b>." };
    if (t <= 3) return { key: "sick", cls: "e-sick", big: "✈️", title: "Homesick Exit", stage: "Stage reached: stuck in Hostility", meter: "t", dir: -1,
      text: "You fly home a month early. Osaka never stopped feeling wrong.",
      reveal: "Stuck in <b>hostility</b>: judging by home's rules keeps a place feeling wrong." };
    const blocked = t >= 7;   // trust was high enough, but the hot takes kept people wary
    return { key: "out", cls: "e-out", big: "🙂", title: "Polite Outsider", stage: "Stage reached: Recovery", meter: blocked ? "h" : "t", dir: blocked ? 1 : -1,
      why: blocked ? "Friends trusted you. Tanner's posts made other kids doubt you." : "",
      text: "You know the rules, but nobody got close. Not home yet.",
      reveal: "<b>Recovery</b>: you know the rules, but the culture isn't yours yet." };
  }
  function causedBy(e) {
    const m = e.meter, w = x => (x.want || x.fx || {})[m] || 0;
    let rows = st.log.filter(x => w(x));
    if (e.dir > 0) rows = rows.filter(x => w(x) > 0);
    if (e.dir < 0) rows = rows.filter(x => w(x) < 0);
    return rows.slice().sort((a, b) => Math.abs(w(b)) - Math.abs(w(a))).slice(0, 4);
  }
  function endBlock(card) {
    const e = ending();
    const box = el("div", "ending " + e.cls);
    box.append(el("div", "big", e.big), el("div", "stage", e.stage), el("h2", "", e.title));
    box.appendChild(stampEl("SEMESTER OVER", ""));
    box.appendChild(el("p", "say", e.text));
    card.appendChild(box);
    const c = el("div", "caused"); c.appendChild(el("h3", "", "Caused by:"));
    if (e.why) c.appendChild(el("p", "", e.why));
    const ul = el("ul", "");
    causedBy(e).forEach(x => { const li = el("li", ""); li.append(el("span", "", x.l), document.createTextNode(" "), chips(x.want || x.fx)); ul.appendChild(li); });
    if (!ul.children.length) ul.appendChild(el("li", "", "Playing it safe. No big risks."));
    c.appendChild(ul); card.appendChild(c);
    const f = el("div", "finals");
    [["🤝", st.fx.t, 10], ["🔋", st.fx.e, 6], ["🔥", st.fx.h, 10]].forEach(([l, v, m]) => { const s = el("span", ""); s.append(el("span", "", l), document.createTextNode(" " + v + "/" + m)); f.appendChild(s); });
    card.appendChild(f);
    card.appendChild(revealBox(e.reveal));
    return e;
  }

  // ---------------- Writing + turn in (two short pages, one box each) ----------------
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  // Returns "" if the answer is fine, or a message to show.
  function problemWith(p, box) {
    if (isT()) return null;   // Test T. (teacher) skips the writing rules
    const v = (box.value || "").trim();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: isEs() ? tr(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
      if (junk) return { calm: true, t: (isEs() ? "En " + tr(p.short) : "For " + p.short) + ": " + junk };
    }
    if (v.length < p.min) return { t: "Write a little more for: " + p.short + " (1–2 full sentences)." };
    if (/_{2,}/.test(v)) return { t: "Fill in the blanks with your own words for: " + p.short + "." };
    const stemText = window.SiteLang ? p.stem + " " + window.SiteLang.t(p.stem) : p.stem;
    const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
    const own = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (own.size < p.newWords) return { t: "Add more of your own ideas for: " + p.short + ". Use details from today." };
    let groups = p.mustAll;
    const esWords = window.SiteLang && window.SiteLang.must(p.id);
    if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
    if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return { t: p.mustMsg };
    return null;
  }
  function writeBlock(card) {
    const page = Math.min(st.wpage || 0, WRITING.length - 1);
    card.appendChild(el("h2", "", "Read Your Own Room"));
    const msg = el("p", "msg", ""); msg.id = "sendMsg"; msg.setAttribute("role", "status"); msg.setAttribute("aria-live", "polite");
    const say = (t, cls) => { msg.textContent = t; msg.className = "msg " + (cls || "bad"); };
    // Both boxes stay on the page (so the turn-in sees both questions); only one shows at a time.
    WRITING.forEach((p, i) => {
      const box = el("div", "compose"); box.hidden = i !== page;
      const hd = el("div", "w-head"); hd.append(el("span", "", p.frame), el("span", "pg", (i + 1) + "/" + WRITING.length)); box.appendChild(hd);
      const lab = el("label", "wl", p.label); lab.htmlFor = "w_" + p.id;
      const stem = el("p", "stem", "Start like this: " + p.stem);
      const use = el("button", "usestem", "Use this starter"); use.type = "button";
      const ta = el("textarea", ""); ta.id = "w_" + p.id; ta.rows = 3; ta.value = st.writing[p.id] || "";
      use.onclick = () => { if (!ta.value.trim()) { ta.value = isEs() ? tr(p.stem) : p.stem; st.writing[p.id] = ta.value; save(); } ta.focus(); const k = ta.value.indexOf("___"); if (k >= 0) ta.setSelectionRange(k, k + 3); };
      ta.addEventListener("input", () => { st.writing[p.id] = ta.value; save(); });
      box.append(lab, stem, use, ta);
      card.appendChild(box);
    });
    if (page < WRITING.length - 1) {
      const nx = el("button", "go", "Next →"); nx.type = "button"; nx.id = "wNextBtn";
      nx.onclick = () => {
        const p = WRITING[page], bad = problemWith(p, $("w_" + p.id));
        if (bad) { say(bad.t, bad.calm ? "calm" : "bad"); if (!bad.calm) $("w_" + p.id).focus(); return; }
        st.wpage = page + 1; save(); render(); window.scrollTo(0, 0);
      };
      card.append(nx, msg);
      return;
    }
    const back = el("button", "usestem back", "← 1/" + WRITING.length); back.type = "button"; back.id = "wBackBtn";
    back.onclick = () => { st.wpage = 0; save(); render(); };
    const send = el("button", "go", st.turnedIn ? "Turn in again" : "Turn in"); send.type = "button"; send.id = "sendBtn";
    if (st.turnedIn) say("✓ Turned in. You can fix your writing and turn it in again.", "good");
    card.append(send, back, msg);
    send.onclick = () => turnIn(send, msg, say);
  }
  async function turnIn(send, msg, say) {
    for (let i = 0; i < WRITING.length; i++) {
      const p = WRITING[i], box = $("w_" + p.id);
      if (box.closest(".compose").hidden) {
        // A box on the other page: check it quietly; if it needs work, go back to it.
        const bad = problemWith(p, box);
        if (bad) { st.wpage = i; save(); render(); const m = $("sendMsg"); if (m) { m.textContent = bad.t; m.className = "msg " + (bad.calm ? "calm" : "bad"); } problemWith(p, $("w_" + p.id)); return; }
        continue;
      }
      const bad = problemWith(p, box);
      if (bad) { say(bad.t, bad.calm ? "calm" : "bad"); if (!bad.calm) box.focus(); return; }
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
    left.appendChild(el("p", "kick", "Sociology · Day 3"));
    left.appendChild(html("h1", "", "Read the Room: <em>Osaka</em>"));
    left.appendChild(el("p", "hook", "Your “normal” stops working in Japan."));
    const f = el("div", "facts"); ["🔍 Read clues", "🤝 Earn trust", "🔥 Beat a vlogger", "⏱ 20 min"].forEach(x => f.appendChild(el("span", "", x)));
    left.appendChild(f);
    left.appendChild(html("p", "goal", "<b>Goal:</b> explain culture shock, ethnocentrism, and cultural relativism."));
    left.appendChild(el("p", "std", "SS.9-12.Soc.6: Analyze how culture influences individuals, including themselves. · SS.9-12.Soc.5: Describe the components of culture."));
    const lab = el("label", "namefield", "Your name"); lab.htmlFor = "nameBox";
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
    const route = el("div", "route"); route.append(el("span", "", "Marion"), el("i", ""), el("span", "", "Osaka")); right.appendChild(route);
    const tiles = el("div", "tiles");
    ["🤝", "🔋", "🔥"].forEach(i => { const d = el("div", ""); d.append(el("b", "", i)); tiles.appendChild(d); });
    right.appendChild(tiles);
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
      endBlock(card);
      nextBtn(card, "Last step: your turn →");
      app.appendChild(card); return;
    }
    if (s.kind === "write") { writeBlock(card); app.appendChild(card); return; }
    // Once you pick a move or solve a check, the setup folds away so the result screen stays short.
    const over = st.picks[s.id] != null || !!st.done[s.id];
    if (s.bg) card.appendChild(banner(s));
    if (!over) notesFor(s, card);
    card.appendChild(el("h2", "", s.title));
    if (!over && s.lede) { const cap = el("div", "cap"); cap.append(el("span", "ci", "🎬"), el("span", "", s.lede)); card.appendChild(cap); }
    if (!over && s.post && s.frame !== "phone") card.appendChild(tannerPost(s.post));
    if (!over && s.chat) card.appendChild(bubbles(s.chat));
    if (!over && s.evidence && s.frame !== "app") card.appendChild(bubbles(s.evidence, "chat"));
    app.appendChild(card);
    if (s.kind === "match") return matchBlock(s, card);
    if (s.kind === "check") {
      if (s.clues && !over) {
        const holder = el("div", ""); card.appendChild(holder);
        const ready = clueGrid(s, holder, () => { if (ready()) render(); });
        if (!ready()) { card.appendChild(el("p", "lockmsg", "🔒 Read the clues first.")); return; }
      }
      return checkBlock(s, card);
    }
    let refresh = () => {};
    const ready = s.clues && !over ? clueGrid(s, card, () => refresh()) : () => true;
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

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current one.
  try {
    // Make the first move the player can afford (no re-render). Used to fill skipped decisions.
    const tPick = s => {
      if (st.picks[s.id] != null) return;
      let i = s.moves.findIndex(m => st.fx.e + (val(m.fx, st).e || 0) >= 0); if (i < 0) i = 0;
      const m = s.moves[i];
      st.picks[s.id] = i; apply(val(m.fx, st), m.s, s.id); st.log[st.log.length - 1].move = true;
      if (m.why) st.why = true;
      if (m.ren) st.metRen = true;
    };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => { const s = STEPS[i]; return s.kind === "end" ? "Ending" : s.kind === "write" ? "Writing + turn in" : (s.short || s.title); },
      go: i => {
        if (!st.name) st.name = "Test T.";
        // Walk the semester in order: skipped decisions get the first move so the ending has data.
        for (let k = 0; k < i; k++) { const s = STEPS[k]; enter(s); if (s.moves) tPick(s); }
        st.step = i; locked = false; selLine = null; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        if (st.step < 0) return;
        const s = STEPS[Math.min(st.step, TOTAL - 1)];
        locked = false;
        if (s.clues) st.flips[s.id] = s.clues.map((c, n) => n);
        if (s.kind === "check" && !st.done[s.id]) { st.done[s.id] = true; save(); render(); }
        else if (s.kind === "match") { s.pairs.forEach((p, n) => { st.match[n] = true; }); selLine = null; save(); render(); }
        else if (s.moves && st.picks[s.id] == null) { tPick(s); save(); render(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
