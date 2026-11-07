/* Hold the Line, 1931–1939 — World History Unit 1 Day 8 (id: day8-wwii-combined)
   The player is a made-up adviser in Britain's war room. Six real crises. Each move changes
   three meters (Home Front, Army Ready, Allies' Trust) and the rival meter (Dictators' Boldness).
   Real history is shown after every move. Seven evidence checks are part of the play. */
(function () {
  "use strict";
  const API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const ID = "day8-wwii-combined";
  const TITLE = "Day 8 · Hold the Line, 1931–1939";
  const STANDARD = "SS.9-12.WH.29, SS.9-12.WH.30";
  const KEY = "day8-wwii-combined-v2";
  const NAMEKEY = "day8-wwii-combined-studentName";
  const LOCK = 5;            // seconds to wait after a wrong answer
    const START = { h: 60, a: 20, t: 60, b: 20 };
  const HOME_LOCK = 20;      // below this, your leaders won't risk war
  const ARMY_WEAK = 30;      // below this, standing firm scares people more

  const METERS = [
    { k: "h", icon: "🏠", name: "Home Front", sub: "People at home back you" },
    { k: "a", icon: "🪖", name: "Army Ready", sub: "Ready to fight if you must" },
    { k: "t", icon: "🤝", name: "Allies' Trust", sub: "Other countries trust you" }
  ];
  const MNAME = { h: "Home Front", a: "Army Ready", t: "Allies' Trust", b: "Dictators' Boldness" };
  const MICON = { h: "🏠", a: "🪖", t: "🤝", b: "😠" };

  // ---------- Images (all real, all in this folder) ----------
  const IMG = {
    asia: { src: "asia-pacific-1943-army-atlas.jpg", alt: "1943 U.S. Army map of East Asia. Japan-held land, including Manchuria, is white.", cap: "U.S. Army map, 1943. White = held by Japan. Public domain." },
    ethiopia: { src: "italy-ethiopia.jpg", alt: "Italian troops marching in Ethiopia, 1935–1936", cap: "Italian troops in Ethiopia, 1935–36. CC BY 4.0, Wikimedia Commons." },
    books: { src: "book-burning-1933.jpg", alt: "A Nazi supporter throws books onto a bonfire in Berlin, May 1933", cap: "Book burning, Berlin, May 1933. Public domain." },
    natgeo: { src: "germany-1939-natgeo-map.jpg", alt: "1944 National Geographic map of Germany and its neighbors in 1939, with 1938 borders in red", cap: "National Geographic map, 1944. Public domain." },
    key: { src: "germany-1939-natgeo-key.jpg", alt: "Title of the 1944 National Geographic map: Germany and its approaches, with borders as of September 1, 1939, and in red, borders as of January 1, 1938", cap: "The map's title." },
    mussolini: { src: "mussolini-poster.jpg", alt: "Italian poster showing Mussolini as a strong leader", cap: "Mussolini poster. Photo: NicolaPasquale, CC BY-SA 3.0." },
    stalin: { src: "ussr-poster.jpg", alt: "Soviet poster celebrating unity under Stalin", cap: "Stalin poster, late 1930s. Public domain." },
    europe: { src: "europe-1943-army-atlas.jpg", alt: "1943 U.S. Army map of Europe: German-held land in white, Allies in red, neutral in gray", cap: "U.S. Army map, 1943. White = Germany and partners. Red = Allies. Public domain." },
    pearl: { src: "pearl-harbor-1941-80-G-19942.jpg", alt: "A U.S. battleship sunk and burning under huge clouds of smoke at Pearl Harbor", cap: "Pearl Harbor, Dec. 7, 1941. U.S. Navy photo. Public domain." }
  };

  // ---------- The seven evidence checks ----------
  // opts[0] is always the right answer; choices are shuffled on screen.
  // style "stamp": warning-sign stamps for a photo. style "slip": telegram lines. style "maptag": map tags. style "plain": quiet check on the serious briefing (no stamp, no shake).
  const CHECKS = {
    q1: { std: "SS.9-12.WH.29", short: "League's answer to Manchuria", style: "slip", head: "📨 Telegram London",
      q: "Which line matches the real file?",
      opts: ["It blamed Japan but took no action", "It sent soldiers to push Japan out", "It forced Japan to return Manchuria", "It made Japan pay China for damage"],
      hint: "Read the file again. What happened after the report?",
      why: "Words, no action. Other dictators were watching.", stamp: "FILED" },
    q2: { std: "SS.9-12.WH.30", short: "Warning sign: Ethiopia photo", style: "stamp", head: "🔍 Intel photo",
      q: "Which warning sign does this photo show?",
      opts: ["Invasion: attacking another country", "Censorship: stopping people from sharing ideas", "Scapegoating: blaming a group for problems", "Discrimination: taking rights from a group"],
      hint: "Read the caption. Whose soldiers are these, and whose land are they in?",
      why: "Italy's army marched into another country." },
    q3: { std: "SS.9-12.WH.30", short: "Warning sign: book burning", style: "stamp", head: "🔍 Intel photo",
      q: "Berlin, 1933. Which warning sign does this show?",
      opts: ["Censorship: stopping people from sharing ideas", "Invasion: attacking another country", "Scapegoating: blaming a group for problems", "Discrimination: taking rights from a group"],
      hint: "Look at what is going into the fire. What is inside those things?",
      why: "Burning books wipes out ideas the Nazis hated." },
    q4: { std: "SS.9-12.WH.29", short: "What Munich shows", style: "slip", head: "📨 Telegram London",
      q: "What does Munich show?",
      opts: ["Hitler kept demanding more land", "It kept the peace for ten years", "Czech leaders agreed to the deal", "Britain and France gained land"],
      hint: "Read the file again. What did Hitler do in March 1939?",
      why: "Giving in made Hitler want more.", stamp: "FILED" },
    q5: { std: "SS.9-12.WH.30", short: "Warning sign: two posters", style: "stamp", head: "🔍 Intel posters",
      q: "Which tool do both posters use?",
      opts: ["Propaganda: messages that make the leader a hero", "Censorship: burning books with ideas they hate", "Invasion: sending an army into another country", "Scapegoating: blaming one group for the problems"],
      hint: "Look at both posters. How does each one show its leader?",
      why: "Same tool, different dictators." },
    q6: { std: "SS.9-12.WH.29", short: "Map: what Germany seized", style: "maptag", head: "🗺️ Read the real map",
      q: "The red lines show borders before Germany seized which two countries?",
      opts: ["Austria and Czechoslovakia", "Poland and Lithuania", "France and Belgium", "Hungary and Yugoslavia"],
      hint: "Read the second line of small print under “Germany and Its Approaches.”",
      why: "Austria, then Czechoslovakia. Then Poland.", stamp: "CONFIRMED" },
    q7: { std: "SS.9-12.WH.30", short: "U.S. response to Kristallnacht", style: "plain", head: "Check",
      q: "How did the U.S. respond?",
      opts: ["Protested, but kept its refugee limits", "Opened its doors to all Jewish refugees", "Sent soldiers to stop the Nazi attacks", "Stayed silent and kept its ambassador"],
      hint: "Read the last line of the briefing again.",
      why: "" }
  };
  const CHECK_ORDER = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

  // ---------- The six crises ----------
  // kind: appease (give in), pressure (half-step), build (rearm), confront (stand firm)
  const CRISES = [
    { id: "manchuria", label: "Manchuria 1931", year: "1931", when: "September 1931 · Manchuria, China",
      title: "Railway blast",
      brief: ["Japan's army bombed a railway in China, blamed China, and took Manchuria."],
      brief2: "League members promised to stop attacks.",
      board: { img: "asia", pin: { x: 32, y: 17, label: "Manchuria" } },
      ask: "What should the League do?",
      options: [
        { k: "talk", icon: "📝", kind: "appease", label: "Write a report", desc: "Blame Japan in words. No punishment.", fx: { h: 5, t: -5, b: 12 },
          react: "Japan's army keeps Manchuria. Japan's leaders laugh off the report.", home: "Relief: “No war over a faraway place!”" },
        { k: "trade", icon: "🚫", kind: "pressure", label: "Cut trade with Japan", desc: "Hurts Japan. Also costs jobs at home.", fx: { h: -10, t: 5, b: 4 },
          react: "Japan is angry but keeps Manchuria. Its generals say the League can't touch them.", home: "Factories lose orders. Workers grumble." },
        { k: "navy", icon: "⚓", kind: "confront", label: "Send warships", desc: "Show force. Your navy is far away.", fx: { h: -15, a: -5, t: 8, b: -8 },
          react: "Japan slows down, for now. Its generals call you a bully.", home: "“Why risk a war for China?”" }
      ],
      real: "talk",
      concept: "<b>Aggression</b> means attacking another country first. In 1931, it worked.",
      history: ["The League's report blamed Japan. No country punished Japan.", "Japan quit the League in 1933 and kept Manchuria."],
      histBoard: { img: "asia", pin: { x: 32, y: 17, label: "Manchuria" } },
      source: "Source: League of Nations, Lytton Report (1932).",
      report: "q1" },

    { id: "ethiopia", label: "Ethiopia 1935", year: "1935", when: "October 1935 · Ethiopia, Africa",
      title: "Mussolini invades Ethiopia",
      brief: ["Italy invades Ethiopia, a free African nation, with planes and poison gas."],
      brief2: "Ethiopia's emperor begs for help.",
      intel: "q2", board: { img: "ethiopia" },
      ask: "What should Britain do?",
      options: [
        { k: "weak", icon: "🛢️", kind: "pressure", label: "Sanctions, but not oil", desc: "Ban some trade. Oil keeps flowing.", fx: { h: 0, t: -5, b: 10 },
          react: "Italy keeps buying oil. Its tanks and planes keep moving.", home: "It looks like action. It doesn't really hurt Italy." },
        { k: "deal", icon: "🤫", kind: "appease", label: "Secret deal with Italy", desc: "Give Mussolini part of Ethiopia.", fx: { h: -10, t: -15, b: 15 },
          react: "Mussolini learns a lesson: push hard and you get paid.", home: "The deal leaks. People are furious." },
        { k: "oil", icon: "⛔", kind: "confront", label: "Ban oil, close Suez", desc: "Cut Italy's oil. Italy might fight back.", fx: { h: -12, a: -5, t: 12, b: -10 },
          react: "Italy's army slows down. Mussolini threatens war with Britain.", home: "Navy on alert. People fear a new war." }
      ],
      real: "weak",
      concept: "<b>Sanctions</b> are trade limits to pressure a country. Weak ones fail.",
      history: ["The League banned some trade with Italy, but not oil.", "Italy took Ethiopia in 1936. The League gave up its sanctions."],
      quote: { text: "“God and history will remember your judgment.”", who: "Haile Selassie, Ethiopia's emperor, to the League of Nations, June 1936" },
      histBoard: { img: "mussolini" },
      source: "Source: Haile Selassie's speech to the League, June 30, 1936." },

    { id: "rhineland", label: "Rhineland 1936", year: "1936", when: "March 7, 1936 · The Rhineland, Germany",
      title: "Troops where they're banned",
      brief: ["Versailles banned German troops in the Rhineland. Hitler sends them in anyway."],
      brief2: "",
      intel: "q3", board: { img: "books" },
      ask: "What should Britain do?",
      options: [
        { k: "protest", icon: "📣", kind: "appease", label: "Protest only", desc: "Complain in speeches. Don't act.", fx: { h: 5, t: -10, b: 15 },
          react: "Hitler's gamble worked. His own generals stop doubting him.", home: "Relief at home. France feels let down." },
        { k: "rearm", icon: "🏭", kind: "build", label: "Build weapons fast", desc: "Build planes and ships. Raise taxes.", fx: { h: -8, a: 20, b: 8 },
          react: "Hitler keeps the Rhineland. He sees you didn't stop him.", home: "Taxes go up. Your army gets stronger." },
        { k: "march", icon: "🪖", kind: "confront", label: "March in with France", desc: "Push Germany out. Could start a war.", fx: { h: -18, a: -5, t: 12, b: -20 },
          react: "German troops pull back, for now. Hitler looks weak to his generals.", home: "Protests: “No new war!”" }
      ],
      real: "protest",
      concept: "Hitler broke the <b>Treaty of Versailles</b>, testing who would stop him.",
      history: ["Britain and France did nothing. Hitler kept the Rhineland.", "Hitler later admitted: if France had fought back, he would have retreated."],
      histBoard: { img: "natgeo", pin: { x: 35, y: 52, label: "Rhineland" } },
      source: "Source: memoir of Paul Schmidt, Hitler's interpreter." },

    { id: "austria", label: "Austria 1938", year: "1938", when: "March 1938 · Austria",
      title: "Austria disappears",
      brief: ["Hitler's troops roll in. Austria joins Germany: the Anschluss.", "Then a fake vote with a giant YES circle."],
      brief2: "Czechoslovakia is now almost surrounded.",
      board: { img: "natgeo", pin: { x: 68, y: 74, label: "Austria" }, ballot: true },
      ask: "What should Britain do?",
      options: [
        { k: "accept", icon: "📣", kind: "appease", label: "Protest, then accept", desc: "Say it's wrong. Do nothing else.", fx: { h: 3, t: -8, b: 12 },
          react: "Hitler gains millions of people and Austria's gold. Next, he eyes Czechoslovakia.", home: "Quiet at home. Small countries worry." },
        { k: "planes", icon: "✈️", kind: "build", label: "Build more planes", desc: "Factories run day and night. More taxes.", fx: { h: -8, a: 18, b: 6 },
          react: "Hitler doesn't stop. But he notices your air force growing.", home: "More taxes. Your air force grows." },
        { k: "promise", icon: "🛡️", kind: "confront", label: "Guard Czechoslovakia", desc: "Warn Hitler: touch it and we fight.", fx: { h: -12, t: 12, b: -10 },
          react: "Hitler is angry. He starts planning anyway.", home: "“War for a faraway country?”" }
      ],
      real: "accept",
      concept: "A fake vote is <b>propaganda</b>, a dictator's warning sign.",
      history: ["Britain and France protested, but did nothing.", "The Nazis claimed over 99% voted yes. It was not a free vote."],
      histBoard: { img: "natgeo", pin: { x: 63, y: 58, label: "Czechoslovakia" } },
      source: "Source: National WWII Museum." },

    { id: "munich", label: "Munich 1938", year: "1938", when: "September 1938 · Munich, Germany",
      title: "“My last demand”",
      brief: ["Hitler demands the Sudetenland, a German-speaking part of Czechoslovakia."],
      brief2: "No Czech leader is invited. Britain hands out gas masks.",
      board: { img: "natgeo", pin: { x: 58, y: 55, label: "Sudetenland" } },
      ask: "What do you advise?",
      options: [
        { k: "sign", icon: "✍️", kind: "appease", label: "Sign the deal", desc: "He gets the Sudetenland. No war today.", fx: { h: 15, a: 8, t: -20, b: 20 },
          react: "Hitler gets the land without a shot. Now he's sure you'll give in.", home: "Crowds cheer! You buy a year to build planes." },
        { k: "refuse", icon: "✋", kind: "confront", label: "Refuse the deal", desc: "Stand with the Czechs and France.", fx: { h: -18, a: -5, t: 15, b: -18 },
          react: "Hitler rages. His generals are nervous about a big war.", home: "People are terrified of bombs." },
        { k: "soviets", icon: "📞", kind: "pressure", label: "Ask Stalin for help", desc: "Protect the Czechs together. Many don't trust him.", fx: { h: -8, t: 8, b: -8 },
          react: "Hitler worries about enemies on two sides.", home: "“Trust Stalin? Never!”" }
      ],
      real: "sign",
      concept: "<b>Appeasement</b> means giving in to demands to avoid war.",
      history: ["Britain's leader, Chamberlain, signed. He promised “peace for our time.”", "In March 1939, Hitler took the rest of Czechoslovakia."],
      histBoard: { img: "natgeo", pin: { x: 72, y: 63, label: "Rest of Czechoslovakia" } },
      source: "Source: National WWII Museum.",
      report: "q4" },

    { id: "poland", label: "Poland 1939", year: "1939", when: "August–September 1939 · Poland",
      title: "Enemies make a deal",
      brief: ["Hitler and Stalin agree not to fight. Secretly, they split Poland."],
      brief2: "",
      intel: "q5", board: { duo: ["mussolini", "stalin"] },
      ask: "Germany invades Poland, your ally. What now?",
      options: [
        { k: "war", icon: "⚔️", kind: "confront", label: "Declare war", desc: "Keep your promise to Poland.", fx: { h: -5, t: 10, b: -5 },
          react: "Hitler didn't think you'd really do it.", home: "Families say goodbye. The country goes to war." },
        { k: "danzig", icon: "🎁", kind: "appease", label: "Give up Danzig", desc: "Push Poland to hand Hitler a city.", fx: { h: 5, t: -25, b: 15 },
          react: "Hitler takes Danzig, and keeps going.", home: "A moment of relief. Poland feels betrayed." },
        { k: "talks", icon: "🕊️", kind: "pressure", label: "Ask for talks", desc: "Wait a few days. Try one more meeting.", fx: { h: 0, t: -10, b: 8 },
          react: "German tanks keep rolling while you talk.", home: "Poland waits for help that doesn't come." }
      ],
      real: "war",
      concept: "Two sides: the <b>Allies</b> (Britain, France) vs. the <b>Axis</b> (Germany, Italy, Japan).",
      history: ["Sept. 3, 1939: Britain and France declare war."],
      source: "Source: National WWII Museum." }
  ];

  const ENDINGS = {
    stopped: { art: "🕊️", title: "Stopped at the Start", tag: "What-if ending (not real history)", cls: "green",
      text: ["You stood up to the dictators, with allies beside you. They back down.", "Would this really have worked? Historians still argue."],
      trailHead: "Caused by: pushing back", trailMeter: "b", dir: -1 },
    ready: { art: "🛡️", title: "War Comes, But You're Ready", tag: "What-if ending (not real history)", cls: "",
      text: ["War starts in 1939, but your army is stronger and your allies trust you.", "It will be a long, hard war."],
      trailHead: "Caused by: building up with allies", trailMeter: "a", dir: 1 },
    alone: { art: "🔥", title: "War on His Terms", tag: "Close to real history", cls: "red",
      text: ["You gave in again and again. Each time, the dictators got bolder.", "War comes anyway, when Hitler picked."],
      trailHead: "Caused by: giving in", trailMeter: "b", dir: 1 },
    peace: { art: "🕳️", title: "Peace at Any Price", tag: "What-if ending (not real history)", cls: "red",
      text: ["You gave in one last time. Hitler took Danzig and kept going.", "Your allies don't trust you. War comes anyway."],
      trailHead: "Caused by: giving in", trailMeter: "b", dir: 1 },
    fall: { art: "📉", title: "Your Government Falls", tag: "What-if ending (not real history)", cls: "gray",
      text: ["You pushed for a fight too often. People at home turned on you.", "New leaders give in. War comes anyway."],
      trailHead: "Caused by: losing support at home", trailMeter: "h", dir: -1 }
  };

  // ---------- Steps (strict order) ----------
  const STEPS = [];
  CRISES.forEach((c, i) => {
    STEPS.push({ type: "crisis", c: i });
    STEPS.push({ type: "result", c: i });
    if (i < CRISES.length - 1) STEPS.push({ type: "history", c: i });
    if (c.id === "munich") STEPS.push({ type: "briefing" });
  });
  STEPS.push({ type: "ending" }, { type: "debrief" }, { type: "write" });
  const TOTAL = STEPS.length;

  // ---------- State ----------
  const fresh = () => ({ step: -1, m: Object.assign({}, START), picks: {}, deltas: {}, notes: {}, wrong: {}, solved: {}, writing: { w1: "", w2: "" }, ending: null, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || typeof st.step !== "number" || st.step >= TOTAL) st = fresh();
  ["picks", "deltas", "notes", "wrong", "solved", "writing"].forEach(k => { if (!st[k] || typeof st[k] !== "object") st[k] = {}; });
  if (!st.m) st.m = Object.assign({}, START);
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const $ = id => document.getElementById(id);
  const app = $("app");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const clamp = n => Math.max(0, Math.min(100, n));
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs && window.SiteLang.isEs());
  const tr = s => (window.SiteLang && window.SiteLang.t ? window.SiteLang.t(s) : s);
  const sign = n => (n > 0 ? "+" + n : "−" + Math.abs(n));
  let timers = [];
  const clearTimers = () => { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); timers = []; };
  let anim = null;           // { prev, d } right after a move, so the meters can animate
  let justSolved = null;     // check id that was just solved (stamp animation)
  let welcome = st.step >= 0;
  let selected = null;

  // ---------- Rival ----------
  function rivalMood(b) {
    if (b <= 25) return { face: "😰", mood: "Nervous" };
    if (b <= 45) return { face: "🤨", mood: "Testing you" };
    if (b <= 65) return { face: "😏", mood: "Smug" };
    return { face: "😈", mood: "Unstoppable" };
  }

  // ---------- HUD ----------
  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show; $("prog").hidden = !show; $("restartBtn").hidden = !show;
    if (!show) return;
    $("progText").textContent = "Step " + (st.step + 1) + " of " + TOTAL;
    $("pfill").style.width = Math.round((st.step + 1) / TOTAL * 100) + "%";
    const m = anim ? anim.prev : st.m;
    const s = STEPS[st.step], ci = s && s.c != null ? s.c : -1;
    const year = ci >= 0 ? CRISES[ci].year : s.type === "briefing" ? "1938" : "1939";
    const rv = rivalMood(m.b);
    $("hud").innerHTML = '<div class="hud-in">' + METERS.map(mt =>
      '<div class="meter' + (m[mt.k] < (mt.k === "h" ? HOME_LOCK : 30) ? " low" : "") + '" id="m-' + mt.k + '" title="' + esc(mt.sub) + '">' +
        '<span class="tok">' + mt.icon + '</span><div class="mcol"><div class="ml"><span>' + esc(mt.name) + '</span><b class="mv">' + m[mt.k] + '</b></div>' +
        '<div class="mbar"><div style="width:' + m[mt.k] + '%"></div></div></div></div>').join("") +
      '<div class="year"><small>YEAR</small><b>' + year + "</b></div>" +
      '<div class="rival" id="m-b" title="How much the dictators think they can grab"><span class="face" id="rface">' + rv.face + '</span><div class="mcol"><div class="ml"><span>Dictators\' Boldness</span><b class="mv">' + m.b + '</b></div>' +
        '<div class="mbar"><div style="width:' + m.b + '%"></div></div><span class="moodw" id="rmood">' + esc(rv.mood) + "</span></div></div></div>";
    if (anim) {
      const a = anim; anim = null;
      const t = setTimeout(() => {
        ["h", "a", "t", "b"].forEach(k => {
          const el = $("m-" + k); if (!el) return;
          el.querySelector(".mbar div").style.width = st.m[k] + "%";
          el.querySelector(".mv").textContent = st.m[k];
          if (a.d[k]) {
            const good = k === "b" ? a.d[k] < 0 : a.d[k] > 0;
            el.classList.add(good ? "flash-good" : "flash-bad");
            const f = document.createElement("span"); f.className = "float " + (good ? "good" : "bad"); f.textContent = sign(a.d[k]); el.appendChild(f);
          }
          if (k !== "b") el.classList.toggle("low", st.m[k] < (k === "h" ? HOME_LOCK : 30));
        });
        const rv2 = rivalMood(st.m.b);
        if ($("rface")) { $("rface").textContent = rv2.face; $("rface").classList.add("react"); }
        if ($("rmood")) $("rmood").textContent = rv2.mood;
      }, 350);
      timers.push(t);
    }
  }

  function track(cur) {
    return '<div class="track" aria-label="Crisis track">' + CRISES.map((c, i) => {
      const pick = st.picks[c.id], o = pick ? c.options.find(x => x.k === pick) : null;
      return '<div class="node' + (i === cur ? " now" : "") + (o ? " k-" + o.kind : "") + '" title="' + esc(c.label) + '"><span class="dot">' + (o ? o.icon : i === cur ? "❗" : "🔒") + '</span><span class="nl">' + esc(c.label) + "</span></div>";
    }).join('<span class="link" aria-hidden="true"></span>') + "</div>";
  }

  // ---------- Pieces ----------
  function boardHtml(f, stampQ) {
    if (!f) return "";
    const stamp = stampQ && st.solved[stampQ] ? '<span class="stamp' + (justSolved === stampQ ? " slam" : "") + '">' + esc(CHECKS[stampQ].style === "stamp" ? CHECKS[stampQ].opts[0].split(":")[0] : CHECKS[stampQ].stamp) + "</span>" : "";
    if (f.duo) return '<figure class="board"><div class="duo">' + f.duo.map(k => '<a href="' + IMG[k].src + '" target="_blank" rel="noopener"><img src="' + IMG[k].src + '" alt="' + esc(IMG[k].alt) + '"></a>').join("") + stamp +
      '</div><figcaption><span>Left:</span> <span>' + esc(IMG[f.duo[0]].cap) + "</span> <span>Right:</span> <span>" + esc(IMG[f.duo[1]].cap) + "</span></figcaption></figure>";
    const im = IMG[f.img];
    return '<figure class="board"><div class="pinmap"><a href="' + im.src + '" target="_blank" rel="noopener"><img src="' + im.src + '" alt="' + esc(im.alt) + '"></a>' +
      (f.pin ? '<span class="pin" style="left:' + f.pin.x + "%;top:" + f.pin.y + '%"><i></i><b>' + esc(f.pin.label) + "</b></span>" : "") + stamp +
      (f.ballot ? '<div class="ballot"><svg viewBox="0 0 220 120" role="img" aria-label="Simple drawing of the ballot layout: a big YES circle and a small NO circle">' +
        '<rect x="3" y="3" width="214" height="114" rx="6" fill="#fffef8" stroke="#555" stroke-width="2"/><line x1="16" y1="20" x2="204" y2="20" stroke="#bbb" stroke-width="5"/><line x1="16" y1="32" x2="170" y2="32" stroke="#bbb" stroke-width="5"/>' +
        '<text x="78" y="52" text-anchor="middle" font-size="12" font-weight="800" font-family="system-ui,Arial">YES</text><circle cx="78" cy="84" r="28" fill="none" stroke="#222" stroke-width="3"/>' +
        '<text x="168" y="74" text-anchor="middle" font-size="9" font-family="system-ui,Arial">NO</text><circle cx="168" cy="92" r="11" fill="none" stroke="#222" stroke-width="2"/></svg>' +
        "<span>Simple drawing of the real ballot's layout (not the real ballot)</span></div>" : "") +
      "</div><figcaption>" + esc(im.cap) + (f.pin ? " <span>Tap to enlarge.</span>" : "") + "</figcaption></figure>";
  }

  function shuffledIdx(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function optBtn(qid, i, disabled) {
    const q = CHECKS[qid], txt = q.opts[i];
    if (q.style === "stamp") {
      const parts = txt.split(": ");
      return '<button type="button" class="opt stampbtn" data-act="ans" data-q="' + qid + '" data-i="' + i + '"' + (disabled ? " disabled" : "") + '><b>' + esc(parts[0]) + "</b><span>" + esc(parts[1]) + "</span></button>";
    }
    return '<button type="button" class="opt ' + q.style + '" data-act="ans" data-q="' + qid + '" data-i="' + i + '"' + (disabled ? " disabled" : "") + ">" + esc(txt) + "</button>";
  }
  function optsHtml(qid, disabled) { return shuffledIdx(CHECKS[qid].opts.length).map(i => optBtn(qid, i, disabled)).join(""); }

  function checkBox(qid) {
    const q = CHECKS[qid];
    if (st.solved[qid]) {
      return '<div class="check done c-' + q.style + (justSolved === qid && q.style !== "plain" ? " pop" : "") + '" id="chk-' + qid + '"><div class="qh">' + esc(q.head) + "</div>" +
        (q.style === "stamp" ? "" : '<p class="okline">✓ ' + esc(q.opts[0]) + "</p>") + (q.why ? "<p>" + (q.style === "stamp" ? "✓ " : "") + esc(q.why) + "</p>" : "") +
        (q.stamp ? '<span class="stamp small-stamp' + (justSolved === qid ? " slam" : "") + '">' + esc(q.stamp) + "</span>" : "") + "</div>";
    }
    return '<div class="check c-' + q.style + '" id="chk-' + qid + '"><div class="qh">' + esc(q.head) + '</div><p class="q">' + esc(q.q) + '</p><div class="opts" id="opts-' + qid + '">' + optsHtml(qid) + '</div><p class="fb" id="fb-' + qid + '" aria-live="polite"></p></div>';
  }
  function answer(qid, i) {
    const q = CHECKS[qid];
    if (st.solved[qid]) return;
    if (i === 0) { st.solved[qid] = true; save(); justSolved = qid; render(false, "chk-" + qid); justSolved = null; return; }
    st.wrong[qid] = (st.wrong[qid] || 0) + 1; save();
    const box = $("opts-" + qid), fb = $("fb-" + qid), wrap = $("chk-" + qid);
    if (wrap && q.style !== "plain") { wrap.classList.remove("shake"); void wrap.offsetWidth; wrap.classList.add("shake"); }
    if (window.classIsTestT && window.classIsTestT()) { box.innerHTML = optsHtml(qid, false); fb.textContent = "Not quite. " + q.hint + " Try again."; return; }   // Test T.: no wait
    box.innerHTML = optsHtml(qid, true);   // reshuffled, nothing left highlighted
    let left = LOCK;
    const tick = () => { fb.textContent = "Not quite. " + q.hint + " The choices will mix up. Try again in " + left + "…"; };
    tick();
    const t = setInterval(() => {
      left--;
      if (left <= 0) { clearInterval(t); if (!$("opts-" + qid)) return; box.innerHTML = optsHtml(qid, false); fb.textContent = "Not quite. " + q.hint + " Try again."; }
      else tick();
    }, 1000);
    timers.push(t);
  }

  function fxPills(o) {
    return ["h", "a", "t", "b"].map(k => {
      const v = (o.fx[k] || 0);
      if (!v) return "";
      const good = k === "b" ? v < 0 : v > 0;
      const arrows = (v > 0 ? "▲" : "▼").repeat(Math.abs(v) >= 12 ? 2 : 1);
      return '<span class="fxp ' + (good ? "good" : "bad") + '" title="' + esc(MNAME[k]) + '">' + MICON[k] + arrows + "</span>";
    }).join("");
  }

  // ---------- Screens ----------
  function intro() {
    document.body.classList.remove("plain");
    app.innerHTML = '<section class="title-screen">' +
      '<div class="ts-left"><span class="tag">World History · Day 8 · Strategy game</span><h1>Hold the <em>Line</em><small>1931–1939</small></h1>' +
      '<p class="hook">Dictators grab land. Give in, or stand up and risk war?</p>' +
      '<div class="facts"><span>🎖️ You: British adviser</span><span>🗺️ 6 real crises</span><span>⏱ 25 minutes</span></div>' +
      '<p class="goal"><b>Goal:</b> Explain how giving in led to World War II, and spot a dictator\'s warning signs.</p>' +
      '<button type="button" class="big" data-act="start">▶ Enter the war room</button>' +
      '<p class="fine">SS.9-12.WH.29, WH.30 · Progress saves · Ends with a short memo</p></div>' +
      '<div class="ts-right" aria-hidden="true"><div class="vsbox"><div class="side-v you"><div class="av">🎖️</div><b>YOU</b><div class="toks"><span>🏠</span><span>🪖</span><span>🤝</span></div></div>' +
      '<div class="vs">VS</div><div class="side-v them"><div class="av">😈</div><b>THE DICTATORS</b><div class="toks"><span>😠</span></div></div></div>' +
      '<div class="stampline">EVERY MOVE COSTS SOMETHING</div></div>' +
      "</section>";
  }

  function crisisScreen(i) {
    const c = CRISES[i];
    const intelDone = !c.intel || st.solved[c.intel];
    const homeLow = st.m.h < HOME_LOCK;
    let move;
    if (!intelDone) move = '<div class="move locked"><div class="move-h">🔒 <span>Decode the intel first.</span></div>' + checkBox(c.intel) + "</div>";
    else move = '<div class="move">' + (c.intel ? checkBox(c.intel) : "") + '<div class="move-h">🎯 <span>Your move:</span> <span>' + esc(c.ask) + "</span></div>" +
      (i === 0 ? '<p class="howto"><span>▲ up · ▼ down · ▲▲ a lot</span></p>' : "") +
      '<div class="cards">' + c.options.map(o => {
        const locked = o.kind === "confront" && homeLow;
        return '<button type="button" class="card k-' + o.kind + '" data-act="pick" data-k="' + o.k + '" aria-pressed="' + (selected === o.k) + '"' + (locked ? " disabled" : "") + '>' +
          '<span class="ci">' + o.icon + '</span><span class="ct">' + esc(o.label) + '</span><span class="cd">' + esc(o.desc) + "</span>" +
          (locked ? '<span class="lock">🔒 <span>Leaders say no: Home Front too low.</span></span>' : '<span class="fx">' + fxPills(o) + "</span>") + "</button>";
      }).join("") + '</div><div class="confirm"><button type="button" class="go seal" data-act="commit"' + (selected ? "" : " disabled") + '>✒️ Sign the order</button></div></div>';
    app.innerHTML = track(i) + '<section class="scene">' + boardHtml(c.board, c.intel) +
      '<div class="side"><div class="telegram"><div class="tg-h">📟 <span>Telegram</span> · <span>' + esc(c.when) + "</span></div><h2>" + esc(c.title) + "</h2>" + c.brief.map(s => "<p>" + esc(s) + "</p>").join("") + "</div>" +
      (c.brief2 ? '<p class="sticky">' + esc(c.brief2) + "</p>" : "") + "</div></section>" + move;
  }

  function commit(i) {
    const c = CRISES[i];
    const o = c.options.find(x => x.k === selected);
    if (!o) return;
    if (o.kind === "confront" && st.m.h < HOME_LOCK) return;
    if (c.intel && !st.solved[c.intel]) return;
    const prev = Object.assign({}, st.m), d = {};
    ["h", "a", "t", "b"].forEach(k => { d[k] = o.fx[k] || 0; });
    let note = "";
    if (o.kind === "confront" && st.m.a < ARMY_WEAK) { d.h -= 5; note = "army"; }
    ["h", "a", "t", "b"].forEach(k => { const before = st.m[k]; st.m[k] = clamp(st.m[k] + d[k]); d[k] = st.m[k] - before; });
    st.picks[c.id] = o.k; st.deltas[c.id] = d; st.notes[c.id] = note;
    if (i === CRISES.length - 1) st.ending = endingFor();
    selected = null;
    anim = { prev, d };
    next();
  }

  function endingFor() {
    const m = st.m;
    if (m.h < 15) return "fall";
    if (st.picks.poland === "danzig") return "peace";
    if (m.b <= 30 && m.t >= 55) return "stopped";
    if (m.a >= 45 && m.t >= 35) return "ready";
    return "alone";
  }

  function deltaChips(d) {
    return '<div class="deltas">' + ["h", "a", "t", "b"].filter(k => d[k]).map((k, n) => {
      const good = k === "b" ? d[k] < 0 : d[k] > 0;
      return '<span class="delta ' + (good ? "good" : "bad") + '" style="animation-delay:' + (0.5 + n * 0.15) + 's">' + MICON[k] + " <span>" + esc(MNAME[k]) + "</span> " + sign(d[k]) + "</span>";
    }).join("") + "</div>";
  }

  function resultScreen(i) {
    const c = CRISES[i], o = c.options.find(x => x.k === st.picks[c.id]), d = st.deltas[c.id] || {};
    const last = i === CRISES.length - 1;
    const rv = rivalMood(st.m.b);
    app.innerHTML = track(i) + '<section class="scene result">' +
      '<div class="played"><div class="card big-card k-' + o.kind + '"><span class="ci">' + o.icon + '</span><span class="ct">' + esc(o.label) + '</span><span class="stamp slam">ORDER SENT</span></div>' + deltaChips(d) + "</div>" +
      '<div class="side"><div class="bubble-row large"><span class="face react">' + rv.face + '</span><div class="bubble rival-b"><small>😠 <span>The dictators react</span></small><p>' + esc(o.react) + "</p></div></div>" +
      '<div class="paper"><div class="mast">🗞️ <span>Back home</span></div><p class="headline">' + esc(o.home) + "</p>" +
      (st.notes[c.id] === "army" ? '<p class="extra">' + esc("Weak army: people are more scared.") + "</p>" : "") + "</div>" +
      '<div class="lesson"><small>💡 <span>Lesson unlocked</span></small><p>' + c.concept + "</p></div>" +
      '<button type="button" class="go" data-act="next">' + (last ? "▶ See how your story ends" : "▶ Open the real file") + "</button></div></section>";
  }

  function historyScreen(i) {
    const c = CRISES[i], mine = c.options.find(x => x.k === st.picks[c.id]), real = c.options.find(x => x.k === c.real);
    const same = mine.k === real.k;
    const ready = !c.report || st.solved[c.report];
    const nextLabel = i + 1 < CRISES.length ? "▶ Next crisis: " + CRISES[i + 1].label : "▶ Next";
    app.innerHTML = track(i) + '<section class="scene">' +
      '<div class="folder"><div class="ftab">DECLASSIFIED</div><span class="stamp tilt">WHAT REALLY HAPPENED</span>' +
      '<div class="calls"><div class="call"><small>Your call</small><b><span class="ico">' + mine.icon + "</span> <span>" + esc(mine.label) + '</span></b></div><div class="call real"><small>Real leaders\' call</small><b><span class="ico">' + real.icon + "</span> <span>" + esc(real.label) + "</span></b></div>" +
      (same ? '<span class="match">✓ <span>Same as history</span></span>' : "") + "</div>" +
      c.history.map(s => "<p>" + esc(s) + "</p>").join("") +
      (c.quote ? '<div class="quote"><span>' + esc(c.quote.text) + "</span><small>" + esc(c.quote.who) + "</small></div>" : "") +
      '<p class="src">' + esc(c.source) + "</p></div>" +
      '<div class="side">' + boardHtml(c.histBoard) + "</div></section>" +
      (c.report ? '<div class="move">' + checkBox(c.report) + "</div>" : "") +
      '<div class="navrow"><button type="button" class="go" data-act="next"' + (ready ? "" : " disabled") + ">" + esc(nextLabel) + "</button>" + (ready ? "" : ' <span class="small">' + esc("Answer the telegram to go on.") + "</span>") + "</div>";
  }

  function briefingScreen() {
    const ok = !!st.solved.q7;
    app.innerHTML = '<section class="serious"><p class="s-tag">Briefing · Real history, not a game move</p><h2>Meanwhile, 1938</h2>' +
      '<div class="brow"><small>July 1938 · 32 nations meet at Évian</small><p>Almost none would take more Jewish refugees.</p></div>' +
      '<div class="brow"><small>November 9–10, 1938 · Kristallnacht</small><p>Nazis burned synagogues and sent about 30,000 Jewish men to camps.</p></div>' +
      '<div class="brow"><small>The U.S. response</small><p>Roosevelt called his ambassador home but kept refugee limits.</p></div>' +
      checkBox("q7") +
      '<p class="src">Source: U.S. Holocaust Memorial Museum.</p>' +
      '<button type="button" class="go plain-btn" id="readBtn" data-act="next"' + (ok ? "" : " disabled") + '>I read this briefing →</button></section>';
  }

  function trailList(e) {
    const E = ENDINGS[e];
    let items = CRISES.map(c => ({ c, o: c.options.find(x => x.k === st.picks[c.id]), d: st.deltas[c.id] || {} }));
    if (e === "ready") items = items.filter(x => (x.d.a || 0) > 0 || (x.d.t || 0) > 0).sort((p, q) => ((q.d.a || 0) + (q.d.t || 0)) - ((p.d.a || 0) + (p.d.t || 0)));
    else items = items.filter(x => (x.d[E.trailMeter] || 0) * E.dir > 0).sort((p, q) => (q.d[E.trailMeter] || 0) * E.dir - (p.d[E.trailMeter] || 0) * E.dir);
    items = items.slice(0, 3);
    if (!items.length) return "";
    const show = d => ["h", "a", "t", "b"].filter(k => d[k]).map(k => MICON[k] + " " + sign(d[k])).join(", ");
    return '<div class="trail"><h3>' + esc(E.trailHead) + "</h3><ol>" + items.map(x => "<li><b>" + esc(x.c.label) + "</b>: <span class=\"ico\">" + x.o.icon + "</span> <span>" + esc(x.o.label) + "</span> → " + show(x.d) + "</li>").join("") + "</ol></div>";
  }

  function endingScreen() {
    const e = st.ending || endingFor(); st.ending = e;
    const E = ENDINGS[e];
    app.innerHTML = track(-1) + '<section class="news ' + E.cls + '"><div class="masthead"><b>THE EVENING DISPATCH</b><small>A made-up newspaper · September 1939</small></div>' +
      '<span class="etag">' + esc(E.tag) + '</span><div class="news-grid"><div><div class="art" aria-hidden="true">' + E.art + '</div><h2 class="bighead">' + esc(E.title) + "</h2>" +
      E.text.map(s => "<p>" + esc(s) + "</p>").join("") +
      "</div>" +
      "<div>" + trailList(e) + '<div class="lesson"><small>💡 <span>The pattern</span></small><p>Each attack that paid off led to a bigger demand.</p></div></div></div>' +
      '<p class="small">' + esc("1 of 5 possible endings.") + "</p>" +
      '<button type="button" class="go" data-act="next">▶ Now open the real file</button></section>';
  }

  function debriefScreen() {
    const solved = st.solved.q6;
    const p = CRISES[CRISES.length - 1];
    const rows = CRISES.map(c => {
      const mine = c.options.find(x => x.k === st.picks[c.id]), real = c.options.find(x => x.k === c.real);
      return "<tr><td>" + esc(c.label) + "</td><td><span class=\"ico\">" + mine.icon + "</span> <span>" + esc(mine.label) + "</span></td><td><span class=\"ico\">" + real.icon + "</span> <span>" + esc(real.label) + "</span>" + (mine.k === real.k ? ' <span class="same">✓</span>' : "") + "</td></tr>";
    }).join("");
    app.innerHTML = track(-1) + '<section class="scene">' +
      '<div class="folder"><div class="ftab">DECLASSIFIED</div><span class="stamp tilt">WHAT REALLY HAPPENED</span>' +
      p.history.map(s => "<p>" + esc(s) + "</p>").join("") + '<p class="src">' + esc(p.source) + "</p>" +
      '<table class="tl"><thead><tr><th>Crisis</th><th>Your call</th><th>Real leaders\' call</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      '<div class="side"><figure class="board"><a href="' + IMG.natgeo.src + '" target="_blank" rel="noopener"><img class="keyimg" src="' + IMG.key.src + '" alt="' + esc(IMG.key.alt) + '"></a><figcaption>' + esc(IMG.key.cap) + "</figcaption></figure>" +
      boardHtml({ img: "natgeo" }, "q6") + "</div></section>" +
      '<div class="move">' + checkBox("q6") + "</div>" +
      (solved ? '<section class="scene"><div class="folder"><div class="ftab">AFTER 1939</div><p class="big-line">1941: Japan bombed Pearl Harbor. The U.S. joined the war.</p></div>' +
        '<div class="side">' + boardHtml({ img: "pearl" }) + boardHtml({ img: "europe" }) + "</div></section>" +
        '<div class="navrow"><button type="button" class="go" data-act="next">▶ Last step: write your memo</button></div>' : '<p class="small center">' + esc("Read the real map to unlock the last step.") + "</p>");
  }

  const PROMPTS = [
    { id: "w1", std: "SS.9-12.WH.29", short: "Why giving in failed",
      label: "Why didn't giving in stop World War II?",
      starter: "Giving in failed because ___. For example, ___.",
      must: ["manchuria", "ethiopia", "rhineland", "austria", "anschluss", "sudeten", "czech", "munich", "poland", "danzig", "pact", "versailles", "league", "japan", "italy", "germany", "hitler", "mussolini",
        "etiopia", "renania", "checoslovaquia", "polonia", "pacto", "liga", "japon", "italia", "alemania"],
      mustMsg: "Name one real event from today, like Munich or the Rhineland." },
    { id: "w2", std: "SS.9-12.WH.30", short: "Warning sign",
      label: "Name a dictator's warning sign. Where did it show up?",
      starter: "One sign was ___. It showed up when ___.",
      must: ["propaganda", "censor", "scapegoat", "violence", "discriminat", "invasion", "invade", "fake vote", "ballot", "book", "poster", "burn",
        "censura", "chivo", "violencia", "discrimin", "invadi", "voto falso", "votacion", "papeleta", "libro", "cartel", "quema"],
      mustMsg: "Name one warning sign, like propaganda, censorship, or invasion." }
  ];

  function writeScreen() {
    const name = localStorage.getItem(NAMEKEY) || "";
    app.innerHTML = '<section class="memo"><div class="memo-h"><span class="stamp tilt">TOP SECRET</span><b>MEMO TO THE PRIME MINISTER</b><small>From: your war-room adviser · Last step</small></div>' +
      
      PROMPTS.map(p => '<label class="wq" for="' + p.id + '">' + esc(p.label) + '</label><p class="starter"><span>Start:</span> <span>' + esc(p.starter) + "</span></p>" +
        '<textarea id="' + p.id + '" data-starter="' + esc(p.starter) + '" rows="3" maxlength="700">' + esc(st.writing[p.id] || "") + "</textarea>").join("") +
      '<div class="sign-row"><label class="wq" for="studentName">First name + last initial (like Jordan M.)</label><input id="studentName" type="text" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="' + esc(name) + '"></div>' +
      '<div><button type="button" class="big" id="sendBtn" data-act="send">' + (st.turnedIn ? "Turn in again" : "Turn in") + "</button></div>" +
      '<p id="sendMsg" class="msg" role="status" aria-live="polite"></p>' +
      (st.turnedIn ? '<p><span class="done-badge">✓ Turned in</span></p><p class="small">' + esc("You already turned this in. You can fix your writing and turn it in again.") + "</p>" : "") +
      "</section>";
    PROMPTS.forEach(p => $(p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("studentName").addEventListener("input", e => { try { localStorage.setItem(NAMEKEY, e.target.value); } catch (x) {} });
  }

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    msg.className = "msg";
    const testT = window.classIsTestT && window.classIsTestT();   // Test T. (teacher) skips the writing rules
    for (const p of (testT ? [] : PROMPTS)) {
      const box = $(p.id), v = (box.value || "").trim();
      const starter = isEs() ? tr(p.starter) : p.starter;
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: starter, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = junk; msg.className = "msg bad"; return; }
      }
      if (/_{2,}/.test(v)) { msg.textContent = tr("Fill in every ___ with your own words."); msg.className = "msg bad"; box.focus(); return; }
      if (v.length < 40) { msg.textContent = tr("Write a little more: 1–2 full sentences for each answer."); msg.className = "msg bad"; box.focus(); return; }
      if (!p.must.some(w => plain(v).includes(w))) { msg.textContent = tr(p.mustMsg); msg.className = "msg bad"; box.focus(); return; }
    }
    const studentName = ($("studentName").value || "").trim();
    if (!studentName) { msg.textContent = tr("Type your first name and last initial, like Jordan M."); msg.className = "msg bad"; $("studentName").focus(); return; }

    const answers = { "Standard": STANDARD };
    const right = CHECK_ORDER.filter(q => st.solved[q] && !st.wrong[q]).length;
    answers["First-try correct"] = right + " of " + CHECK_ORDER.length;
    const byStd = {};
    CHECK_ORDER.forEach(q => { const s = CHECKS[q].std; byStd[s] = byStd[s] || [0, 0]; byStd[s][1]++; if (st.solved[q] && !st.wrong[q]) byStd[s][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECK_ORDER.forEach(q => { const n = st.wrong[q] || 0; answers[CHECKS[q].short] = !st.solved[q] ? "(not answered)" : CHECKS[q].opts[0] + (n ? " (after " + n + " wrong " + (n === 1 ? "try" : "tries") + ")" : " (first try)"); });
    CRISES.forEach(c => { const o = c.options.find(x => x.k === st.picks[c.id]); if (o) answers["Choice · " + c.label] = o.label + (o.k === c.real ? " (same as history)" : ""); });
    answers["Choices that matched history"] = CRISES.filter(c => st.picks[c.id] === c.real).length + " of " + CRISES.length;
    const E = ENDINGS[st.ending || endingFor()];
    answers["Ending"] = E.title + " (" + E.tag + ")";
    answers["Final meters"] = ["h", "a", "t", "b"].map(k => MNAME[k] + " " + st.m[k]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($(p.id).value || "").trim(); });

    btn.disabled = true; msg.textContent = tr("Sending your work…");
    try {
      const response = await window.classTurnIn(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName, assignmentId: ID, assignmentTitle: TITLE, answers }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = tr("Turned in! Your teacher can see your work. You're done."); msg.className = "msg good";
      btn.textContent = tr("Turned in ✓");
      if (!document.querySelector(".done-badge")) msg.insertAdjacentHTML("afterend", '<p><span class="done-badge">✓ Turned in</span></p>');
    } catch (err) {
      msg.textContent = tr((err && err.message) || "Could not turn in. Try again."); msg.className = "msg bad"; btn.disabled = false;
    }
  }

  // ---------- Flow ----------
  function next() {
    if (st.step >= TOTAL - 1) return;
    st.step++; save(); render(true);
  }

  function render(toTop, focusId) {
    clearTimers();
    hud();
    if (st.step < 0) { intro(); return; }
    const s = STEPS[st.step];
    document.body.classList.toggle("plain", s.type === "briefing");
    if (s.type === "briefing") $("hud").hidden = true;   // no game meters next to the Holocaust briefing
    if (s.type === "crisis") crisisScreen(s.c);
    else if (s.type === "result") resultScreen(s.c);
    else if (s.type === "history") historyScreen(s.c);
    else if (s.type === "briefing") briefingScreen();
    else if (s.type === "ending") endingScreen();
    else if (s.type === "debrief") debriefScreen();
    else writeScreen();
    if (welcome) {
      app.insertAdjacentHTML("afterbegin", '<p class="welcome" id="welcome">Welcome back! You\'re on step ' + (st.step + 1) + " of " + TOTAL + ".</p>");
      welcome = false;
    }
    if (focusId && $(focusId)) { try { $(focusId).scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {} }
    else if (toTop) window.scrollTo(0, 0);
  }

  app.addEventListener("click", e => {
    const b = e.target.closest("[data-act]");
    if (!b || b.disabled) return;
    const act = b.dataset.act, s = STEPS[st.step];
    if (act === "start") { st.step = 0; save(); render(true); }
    else if (act === "ans") answer(b.dataset.q, +b.dataset.i);
    else if (act === "pick" && s && s.type === "crisis") {
      selected = b.dataset.k;
      app.querySelectorAll(".cards .card").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.k === selected)));
      const go = app.querySelector('[data-act="commit"]'); if (go) go.disabled = false;
    }
    else if (act === "commit" && s && s.type === "crisis") commit(s.c);
    else if (act === "next") {
      if (s.type === "history" && CRISES[s.c].report && !st.solved[CRISES[s.c].report]) return;
      if (s.type === "debrief" && !st.solved.q6) return;
      if (s.type === "briefing" && !st.solved.q7) return;
      next();
    }
    else if (act === "send") send();
  });

  $("restartBtn").addEventListener("click", () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    clearTimers(); st = fresh(); selected = null; anim = null; save(); render(true);
  });

  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current check.
  try {
    const TLABEL = { result: "result", history: "real file", briefing: "Briefing 1938", ending: "Ending", debrief: "Debrief + map", write: "Memo + turn in" };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL + 1,
      index: () => Math.max(0, Math.min(st.step + 1, TOTAL)),
      label: i => {
        if (i === 0) return "Title";
        const s = STEPS[i - 1];
        if (s.type === "crisis") return CRISES[s.c].label;
        return s.c != null ? CRISES[s.c].label + " " + TLABEL[s.type] : TLABEL[s.type];
      },
      go: i => {
        try { if (!localStorage.getItem(NAMEKEY)) localStorage.setItem(NAMEKEY, "Test T."); } catch (e) {}
        // fill the first choice for any crisis the jump skips past, so later screens have a pick to show
        for (let j = 0; j < i - 1 && j < TOTAL; j++) {
          const s = STEPS[j];
          if (s.type !== "crisis") continue;
          const c = CRISES[s.c];
          if (!st.picks[c.id]) { const o = c.options[0]; st.picks[c.id] = o.k; st.deltas[c.id] = Object.assign({}, o.fx); st.notes[c.id] = ""; }
        }
        if (i - 1 >= STEPS.findIndex(s => s.type === "ending") && !st.ending) st.ending = endingFor();
        clearTimers(); selected = null; anim = null; welcome = false;
        st.step = i - 1; save(); render(true);
      },
      solve: () => {
        const s = STEPS[st.step]; if (!s) return;
        let q = null;
        if (s.type === "crisis") {
          const c = CRISES[s.c];
          if (c.intel && !st.solved[c.intel]) q = c.intel;
          else { const b = app.querySelector(".cards .card:not([disabled])"); if (b) { b.click(); const go = app.querySelector('[data-act="commit"]'); if (go) go.click(); } return; }
        }
        else if (s.type === "history") q = CRISES[s.c].report || null;
        else if (s.type === "briefing") q = "q7";
        else if (s.type === "debrief") q = "q6";
        if (q && !st.solved[q]) { st.solved[q] = true; save(); render(false); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
