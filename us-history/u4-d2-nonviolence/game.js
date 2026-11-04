// =====================================================================
//  THE NONVIOLENCE STRATEGY FILE  (U.S. History Unit 4 · Day 2)
//  Standards: SS.9-12.US.42, US.43, US.44
//  Polish of the original (same premise): you're on a civil rights strategy
//  team following five real campaigns, 1960–1965 (Greensboro, Freedom Rides,
//  Birmingham, March on Washington, Selma). 3 strategy calls move the
//  Pressure on Washington meter. Added in the polish: each campaign plays on
//  a 1960s TV set (the day's "TV changed minds" goal); a Senate strip turns
//  pressure into votes (67 needed to end the filibuster, the real rule); the
//  Senate holdouts' mood reacts; a first wrong guess on a check costs 1
//  pressure; 3 endings with a "Caused by" trail plus what really happened.
//  7 checks (US.42 ×2, US.43 ×3, US.44 ×2), 3 decisions, 2 short writing answers.
//  No fictional people. No photos of real people (emoji/CSS art only).
//  Turn-in via shared/turnin.js with the same assignmentId as before.
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u4-d2-nonviolence-v2";
  const ASSIGNMENT_ID = "ush-u4-d2-nonviolence";
  const TITLE = "U.S. History · Unit 4 · Day 2 · The Nonviolence Strategy File";
  const STANDARD = "SS.9-12.US.42, SS.9-12.US.43, SS.9-12.US.44";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;          // seconds locked after a wrong answer
  const START_P = 3;
  const NEED = 67;         // real Senate rule in 1964: 2/3 of senators to end a filibuster

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const votes = p => 32 + 5 * p;   // game board: pressure 7+ = 67+ votes

  // ---------------- Art helpers ----------------
  const say = (who, text, cls) => `<div class="say ${cls || ""}">${who ? `<span class="who-s">${who}</span>` : ""}${text}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div>${html}</div></div>`;
  const src = t => `<p class="src">${t}</p>`;
  const rows = list => `<div class="tl">${list.map(r => `<span><i aria-hidden="true">${r[0]}</i><em>${r[1]}</em></span>`).join("")}</div>`;
  const file = (lab, inner, cite) => `<div class="file"><span class="clip" aria-hidden="true"></span><p class="flab">📁 ${lab}</p>${inner}${cite ? src(cite) : ""}</div>`;
  // A 1960s TV set. art = emoji/CSS drawing, chyron = the news bar, label = for screen readers.
  const tv = (art, chyron, label) => `<div class="tv" role="img" aria-label="TV news: ${esc(label)}"><div class="screen"><span class="live" aria-hidden="true">NEWS</span><div class="art" aria-hidden="true">${art}</div><div class="chyron">${chyron}</div></div><div class="knobs" aria-hidden="true"><span></span><span></span></div></div>`;
  const B = s => `<span class="bob">${s}</span>`;

  const TV = {
    counter: () => tv(`<span class="sign">WHITES ONLY</span><br>${B("🧑🏾")}${B("🧑🏿")}${B("🧑🏾")}${B("🧑🏿")}<br>🪑🪑🪑🪑`, `<b>Greensboro, N.C.</b> · Feb. 1, 1960 · Lunch counter sit-in`, "four Black college students seated at a whites-only lunch counter, Greensboro, 1960"),
    mob: () => tv(`${B("😠")}${B("😡")}${B("😠")} 📸<br>${B("🧑🏾")}${B("🧑🏿")}${B("🧑🏾")}<br>🪑🪑🪑`, `<b>Sit-in, day 4</b> · Crowd harasses students · Cameras rolling`, "an angry crowd behind seated students, with news cameras"),
    calm: () => tv(`📸 ${B("🧘🏾")}${B("🧘🏿")}${B("🧘🏾")} 📸<br><small>CALM STUDENTS · ANGRY CROWD</small>`, `<b>Sit-ins spread</b> · Spring 1960 · 50+ cities`, "calm protesters on the evening news"),
    bus: () => tv(`<span class="big shake">🚌</span>🔥💨<br>${B("🧑🏾")}${B("🧑🏻")}${B("🧑🏿")}`, `<b>Anniston, Ala.</b> · May 14, 1961 · Freedom Riders' bus firebombed`, "a burning bus outside Anniston, Alabama, 1961"),
    signs: () => tv(`<span class="sign">ICC ORDER · NOV. 1, 1961</span><br>🚏🚫<s>WHITES ONLY</s>`, `<b>Washington</b> · Sept. 1961 · Bus stations must desegregate`, "a whites-only bus station sign coming down"),
    hoses: () => tv(`🚒💦💦 ${B("🧒🏾")}${B("🧒🏿")}<br>🐕‍🦺 ${B("🧑🏾")}${B("🧒🏾")}`, `<b>Birmingham, Ala.</b> · May 1963 · Fire hoses and dogs on young marchers`, "fire hoses and police dogs turned on young marchers in Birmingham, 1963"),
    march: () => tv(`🏛️<br>${B("✊🏾")}${B("✊🏻")}${B("✊🏿")}${B("✊🏽")}${B("✊🏼")}`, `<b>Washington, D.C.</b> · Aug. 28, 1963 · 250,000 march for jobs and freedom`, "a huge crowd at the March on Washington, 1963"),
    bridge: () => tv(`🪖🪖🪖 💨<br>🌉<br>${B("🚶🏾")}${B("🚶🏿")}${B("🚶🏾‍♀️")}${B("🚶🏾")}`, `<b>Selma, Ala.</b> · Mar. 7, 1965 · "Bloody Sunday" on the bridge`, "state troopers and tear gas facing marchers on a bridge in Selma, 1965"),
    senate: () => tv(`🏛️<br>${B("🧓")}${B("🧑")}${B("🧓")}${B("🧑")}${B("🧓")}<br><small>SENATE · ROLL CALL</small>`, `<b>Washington</b> · The Senate votes · ${NEED} needed to end the filibuster`, "the U.S. Senate voting"),
    podium: () => tv(`🇺🇸<br><span class="big">🎙️</span><br><small>THE PRESIDENT · LIVE</small>`, `<b>Washington</b> · Mar. 15, 1965 · President Johnson speaks to Congress`, "the President speaking to Congress, 1965")
  };
  function bars(title, list, cite) {
    const max = Math.max(...list.map(b => b.v));
    return `<div class="chart"><p class="ch">${title}</p>${list.map(b => `<div class="brow"><span class="bl">${b.l}</span><span class="bt"><span style="width:${Math.max(4, Math.round(b.v / max * 100))}%;background:${b.c}"></span></span><b>${b.s}</b></div>`).join("")}${cite ? src(cite) : ""}</div>`;
  }

  // ---------------- Writing (strategy memo) ----------------
  const PROMPTS = [
    { id: "tv", short: "Why TV changed minds",
      label: "📺 Memo 1: Why did TV news change minds? Use one example.",
      stem: "When Americans saw ___ on TV, many changed their minds because ___.",
      min: 80, newWords: 6,
      mustAll: [["tv", "television", "news", "saw", "watch", "camera", "photo"], ["because", "since", "so "],
                ["sit-in", "sit in", "counter", "greensboro", "freedom ride", "rider", "anniston", "birmingham", "hose", "dog", "kids", "children", "teen", "march", "selma", "bridge", "bloody sunday", "trooper", "tear gas", "police", "mob", "crowd", "student", "protester", "marcher", "church", "girls", "connor"]],
      mustMsg: "Memo 1: name one real example from today (like Birmingham or Selma), say what people SAW on TV, and why it mattered (use \"because\")." },
    { id: "law", short: "One protest → one law",
      label: "📜 Memo 2: Pick one protest. What law or government action did it help win? How?",
      stem: "The ___ helped bring about ___ because ___.",
      min: 70, newWords: 5,
      mustAll: [["sit-in", "sit in", "greensboro", "freedom ride", "birmingham", "march", "selma", "bloody sunday"], ["act", "law", "order", "ruling", "desegregat", "congress"]],
      mustMsg: "Memo 2: name a protest from today AND the law or government action it led to." }
  ];

  // ---------------- The game ----------------
  const PARTS = ["🪑 1960–61: Sit-ins + Rides", "🚒 1963: Birmingham", "🌉 1965: Selma"];
  const STEPS = [
    // ===== Part 1 · Sit-ins and Freedom Rides =====
    { id: "c1", type: "check", part: 0, std: "US.44", kicker: "Campaign 1 · Greensboro, N.C. · 1960", short: "Sit-in = civil disobedience", stamp: "ON THE RECORD",
      scene: () => TV.counter() + file("Case card", rows([
          ["🪑", "4 Black college students sit at a <b>whites-only</b> counter. Refused, they stay."],
          ["⛓️", "They know they could be arrested."]
        ]) + `<div class="words"><p>⛓️ <b>Civil disobedience</b>: openly break an unfair law, accept the punishment.</p></div>`),
      ask: "Why is the sit-in <b>civil disobedience</b>?",
      options: ["They broke the rule openly, ready for arrest.", "They refused to buy anything at Woolworth's.", "They quit their jobs at the store to protest.", "They asked a judge to throw out the rule."],
      nope: ["", "That's a boycott. They sat down and stayed.", "They were students, not store workers.", "No court yet. They sat at the counter."],
      hint: "Check row 2 and the word box.",
      reveal: `<p><b>Segregation</b>: forcing races apart, like "whites only" counters.</p>` },

    { id: "e1", type: "event", part: 0, kicker: "Strategy call 1 · Sit-in, day 4", short: "Sit-in: response to harassment",
      scene: () => TV.mob() + say("📸 Reporter", "Cameras are rolling. What will your students do?") + say("😡 Crowd", "Ketchup, shoves, insults.", "rv"),
      ask: "What do you tell the students?",
      cards: [
        { id: "calm", icon: "🧘🏾", title: "Stay seated, stay calm", line: "Don't hit back. Ever.", fx: 2, result: "Photos show calm students, angry crowd. Sit-ins spread to 50+ cities.", stamp: "NATION WATCHING", cause: "Sit-in: stayed calm on camera" },
        { id: "fight", icon: "👊", title: "Hit back", line: "Defend yourselves.", fx: -1, result: "Papers call it a \"brawl.\" The story is violence, not segregation.", stamp: "BACKFIRE", cause: "Sit-in: hit back" },
        { id: "letter", icon: "✉️", title: "Leave, write a letter", line: "Ask the store politely.", fx: 0, result: "The store ignores it. No sit-in, no news.", stamp: "IGNORED", cause: "Sit-in: left and wrote a letter" }
      ],
      after: `<p>Real groups trained students to sit calmly through insults.</p>` },

    { id: "c2", type: "check", part: 0, std: "US.44", kicker: "Campaign 1 · What the nation saw", short: "Why staying calm mattered", stamp: "STRATEGY",
      scene: () => TV.calm() + say("📰 Front page", "Students sit quietly while a crowd shouts at them."),
      ask: "Why did staying calm make sit-ins <b>stronger</b>?",
      options: ["Viewers could see who was being unfair.", "Police were not allowed to arrest them.", "It kept reporters away from the store.", "Owners agreed to serve them the first day."],
      nope: ["", "Police arrested sit-in students in many cities.", "Reporters were right there with cameras.", "Greensboro's counter didn't change until July."],
      hint: "Who looks wrong in those photos: the calm students or the angry crowd?",
      reveal: `<p><b>Nonviolence</b> made the attackers look like the problem.</p>` },

    { id: "e2", type: "event", part: 0, kicker: "Strategy call 2 · Freedom Rides · May 1961", short: "Freedom Rides: continue or stop",
      scene: () => TV.bus() + file("Case card", rows([
          ["⚖️", "<b>1960:</b> Court bans segregated bus stations on trips between states."],
          ["🚌", "<b>1961:</b> Black and white <b>Freedom Riders</b> test it. Mobs attack."]
        ]), "Boynton v. Virginia (1960). Rides organized by CORE, then SNCC.") +
        say("🧑🏾‍🎓 Diane Nash, student leader", "If we stop now, violence wins.") + src("Her argument, in short."),
      ask: "Some leaders want to quit. You say…",
      cards: [
        { id: "ride", icon: "🚌", title: "Send new riders", line: "Fill the buses again.", fx: 2, result: "Students ride on. 300+ jailed in Mississippi. It stays on the news.", stamp: "STILL ROLLING", cause: "Rides: sent new riders" },
        { id: "stop", icon: "🛑", title: "Stop the rides", line: "Keep riders safe.", fx: -1, result: "Riders are safe, but the mobs win. The ruling stays ignored.", stamp: "MOBS WIN", cause: "Rides: stopped after the attacks" },
        { id: "wait", icon: "⏳", title: "Wait a year", line: "Try again quietly.", fx: 0, result: "The news moves on. So does Washington.", stamp: "FORGOTTEN", cause: "Rides: waited a year" }
      ] },

    { id: "c3", type: "check", part: 0, std: "US.43", kicker: "Campaign 2 · Freedom Rides · What changed", short: "Freedom Rides forced enforcement", stamp: "SIGNS DOWN",
      scene: () => TV.signs() + `<div class="clips" role="img" aria-label="Four headlines: 1960 ruling ignored; May 1961 riders beaten, bus burned; summer 1961, 300 plus jailed; September 1961 federal order ends segregated bus stations.">
          <div class="clip"><small>1960</small><b>⚖️ Court ruling. South ignores it.</b></div>
          <div class="clip hot"><small>May 1961</small><b>🔥 Riders beaten, bus burned</b></div>
          <div class="clip"><small>Summer 1961</small><b>⛓️ 300+ jailed. Nightly news.</b></div>
          <div class="clip win"><small>Sept. 1961</small><b>📜 Federal order: end segregated bus stations</b></div>
        </div>` + src("Interstate Commerce Commission order, pushed by Attorney General Robert Kennedy, in effect Nov. 1, 1961."),
      ask: "The Court ruled in 1960. Why did the signs only come down in 1961?",
      options: ["Riders made it impossible to ignore.", "The Supreme Court reversed its 1960 ruling.", "Bus companies asked the government for it.", "Southern states voted to end the signs."],
      nope: ["", "The 1960 ruling stood. It just wasn't obeyed.", "Check the headlines. Who acted first?", "The South ignored the ruling (headline 1)."],
      hint: "What happened between the ruling and the order?",
      reveal: `<p>Ignored ruling + <b>protest</b> = the government finally acts.</p>` },

    // ===== Part 2 · Birmingham, 1963 =====
    { id: "c4", type: "check", part: 1, std: "US.43", kicker: "Campaign 3 · Birmingham, Ala. · May 1963", short: "Birmingham TV images changed opinion", stamp: "NATION SHOCKED",
      scene: () => TV.hoses() + file("Case card", rows([
          ["🧒🏾", "Kids and teens march against segregation."],
          ["🚒", "Police chief <b>Bull Connor</b> orders fire hoses and dogs."],
          ["📺", "It plays on TV across the country."]
        ]), "Campaign led by Dr. Martin Luther King Jr. and the SCLC."),
      ask: "Why did these TV pictures help the movement?",
      options: ["Shocked viewers began demanding change.", "They showed marchers attacking police first.", "Most viewers sided with Bull Connor's plan.", "They showed segregation was already over."],
      nope: ["", "Look at the TV. Who is attacking whom?", "The pictures turned many viewers against the police.", "Kids were marching AGAINST segregation."],
      hint: "Picture kids hit by fire hoses on the evening news.",
      reveal: `<p>In June 1963, President Kennedy asked Congress for a civil rights law.</p>` },

    { id: "mem", type: "moment", part: 1, kicker: "Remember them · Sept. 15, 1963",
      scene: () => `<div class="memorial" role="img" aria-label="Memorial: four candles"><div class="candles" aria-hidden="true">🕯️🕯️🕯️🕯️</div><p><b>16th Street Baptist Church, Birmingham</b></p></div>`,
      body: `<p class="ask">Klan members bombed a Black church on a Sunday morning. Four girls were killed.</p>
        <div class="memorial"><div class="names"><span>Addie Mae Collins<small>age 14</small></span><span>Denise McNair<small>age 11</small></span><span>Carole Robertson<small>age 14</small></span><span>Cynthia Wesley<small>age 14</small></span></div></div>
        <p class="src">Some bombers weren't convicted until 1977, 2001, and 2002.</p>` },

    { id: "c5", type: "check", part: 1, std: "US.42", kicker: "Campaign 4 · March on Washington → the law", short: "What the Civil Rights Act of 1964 fixed", stamp: "LAW SIGNED",
      scene: () => TV.march() + `<div class="law"><p class="lt">CIVIL RIGHTS ACT OF 1964</p><p>🍽️ No segregation in restaurants, hotels, theaters.</p><p>💼 No job discrimination by race, color, religion, sex, or national origin.</p></div>` +
        src("March on Washington, Aug. 1963: Dr. King's \"I Have a Dream.\" Act signed July 2, 1964."),
      ask: "Which problem from today did this law fix?",
      options: ["Whites-only lunch counters", "Literacy tests for voters", "Poll taxes at the ballot box", "Police dogs at marches"],
      nope: ["", "Voting tests weren't stopped until 1965.", "Voting isn't in these two parts of the law.", "The law is about places and jobs."],
      hint: "Find the 🍽️ line. Where did Campaign 1 happen?",
      reveal: `<p>Southern senators <b>filibustered</b> (talked nonstop to block it). 67 votes stopped them.</p>` },

    // ===== Part 3 · Selma, 1965 =====
    { id: "e3", type: "event", part: 2, kicker: "Strategy call 3 · Selma, Ala. · March 1965", short: "Selma: after Bloody Sunday",
      scene: () => TV.bridge() + file("Case card", rows([
          ["🗳️", "Unfair <b>literacy tests</b> (reading tests) and threats keep most Black adults from voting."],
          ["🌉", "600 marchers. Troopers use clubs and tear gas. <b>\"Bloody Sunday.\"</b>"]
        ])),
      ask: "What does the movement do next?",
      cards: [
        { id: "again", icon: "🌉", title: "March again, bigger", line: "Call the nation. Ask for protection.", fx: 2, result: "Thousands come. Under federal guard, they walk 54 miles to Montgomery.", stamp: "54 MILES", cause: "Selma: marched again, bigger" },
        { id: "off", icon: "🛑", title: "Call it off", line: "Wait till things calm down.", fx: -2, result: "The cameras leave. The nation's attention is wasted.", stamp: "MOMENT LOST", cause: "Selma: called it off" },
        { id: "church", icon: "⛪", title: "Meet in church", line: "Plan quietly, off camera.", fx: 0, result: "Planning matters, but the nation is watching the bridge.", stamp: "OFF CAMERA", cause: "Selma: met quietly in church" }
      ] },

    { id: "c6", type: "check", part: 2, std: "US.43", kicker: "Campaign 5 · Selma · The President responds", short: "LBJ backs the movement after Selma", stamp: "PRESIDENT ON BOARD",
      scene: () => TV.podium() + `<div class="quote">"Their cause must be our cause too… And we shall overcome."</div>` + src("President Lyndon B. Johnson to Congress, March 15, 1965, a week after Bloody Sunday.") +
        say("🎵", "\"We Shall Overcome\" = the movement's song."),
      ask: "What does the President using those words show?",
      options: ["He now openly backed the movement.", "He blamed the marchers for the violence.", "Congress had already passed the law.", "He wanted the marches to stop for now."],
      nope: ["", "\"Their cause must be OUR cause.\"", "He was asking Congress for a law.", "He used the marchers' own song."],
      hint: "Whose song is he quoting?",
      reveal: `<p>In that speech, Johnson asked Congress for a <b>voting rights law</b>.</p>` },

    { id: "c7", type: "check", part: 2, std: "US.42", kicker: "Campaign 5 · Selma · The law and the results", short: "Voting Rights Act effect (Mississippi chart)", stamp: "VOTES COUNTED",
      scene: () => `<div class="law"><p class="lt">VOTING RIGHTS ACT OF 1965</p><p>🚫 Stops literacy tests.</p><p>🧑‍💼 Sends federal workers to sign up voters.</p></div>` +
        bars("Black adults registered to vote in Mississippi", [{ l: "1964", v: 6.7, s: "6.7%", c: "#9aa7b8" }, { l: "1967", v: 59.8, s: "59.8%", c: "#1f3a68" }], "U.S. Commission on Civil Rights. Act signed Aug. 6, 1965."),
      ask: "What does the chart show after the law?",
      options: ["Black registration shot way up.", "Black registration dropped a bit.", "Registration barely changed at all.", "Only Northern states saw changes."],
      nope: ["", "Compare the two bars.", "6.7% to 59.8% is a huge change.", "Mississippi is in the South."],
      hint: "Compare the length of the two bars.",
      reveal: `<p>About 9 times as many. <b>Protest → law → real change.</b></p>` },

    { id: "end", type: "end", part: 2, kicker: "Senate roll call" },
    { id: "write", type: "write", part: 2, kicker: "Your strategy memo" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, p: START_P, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false, ended: false, endKey: "" });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.picks || typeof st.p !== "number") st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts clean (never shows the last kid's work).
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // ---------------- HUD ----------------
  const youFace = p => p >= 7 ? "😎" : p >= 5 ? "😄" : p >= 3 ? "🙂" : "😟";
  const holdoutMood = p => p >= 7 ? "😰" : p >= 5 ? "😬" : p >= 3 ? "😐" : "😤";
  function hud() {
    const h = $("hud");
    h.hidden = st.step < 0;
    if (st.step < 0) return;
    const v = votes(st.p);
    $("pressFill").style.width = (st.p * 10) + "%"; $("pressNum").textContent = st.p + "/10";
    $("voteFill").style.width = v + "%"; $("voteNum").textContent = v + "/100";
    $("svote").classList.toggle("ok", v >= NEED);
    $("senate").setAttribute("aria-label", "Senate: " + v + " of 100 votes to end the filibuster. " + NEED + " needed.");
    $("youFace").textContent = youFace(st.p);
    $("rMood").textContent = holdoutMood(st.p);
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("parts").innerHTML = PARTS.map((p, i) => `<span class="${i < step.part ? "past" : i === step.part ? "now" : ""}">${p}</span>`).join("") +
      `<span class="goalchip"><span class="gl">🎯 Goal: 🏛️ ${NEED} votes (📣 7+)</span><span class="gs">🎯 🏛️${NEED}</span></span><span class="stepn">Step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}</span>`;
  }
  function bump(delta) {
    const before = st.p;
    st.p = Math.max(0, Math.min(10, st.p + delta));
    return st.p - before;
  }
  function animatePress(real) {
    hud();
    if (!real) return;
    const el = $("mPress");
    const f = document.createElement("span");
    f.className = "float " + (real > 0 ? "good" : "bad");
    f.textContent = (real > 0 ? "+" : "−") + Math.abs(real);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
    const r = $("rivalBox"); r.classList.remove("shake"); void r.offsetWidth; r.classList.add("shake");
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
    if (nx.type === "end") return "Call the Senate vote ▶";
    if (nx.type === "write") return "Write your memo ▶";
    if (nx.part !== step.part) return "Next: " + PARTS[nx.part].replace(/^\S+ /, "") + " ▶";
    if (nx.type === "event") return "Strategy call ▶";
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
      <div class="tart">${TV.counter()}</div>
      <div class="tcopy">
        <p class="tk">U.S. History · Unit 4 · Day 2</p>
        <h1>The Nonviolence Strategy File</h1>
        <p class="hook">1960–1965. Can you change a law without fighting back?</p>
        <ul class="how"><li><span>📺</span>Watch 5 real campaigns</li><li><span>🧠</span>Make the team's strategy calls</li><li><span>🏛️</span>Push the Senate to ${NEED} votes</li></ul>
        <p class="chips"><span>⏱️ 25 min</span><span>🔍 7 checks</span><span>✏️ 2 short answers</span><span>❌ Guesses cost 📣</span></p>
        <p class="goal">🎯 Goal: how did nonviolent protest change laws?</p>
        <p class="warn">⚠️ Real violence against protesters, including the deaths of four girls.</p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Open the file ▶</button></div>
        <p id="introMsg" class="msg" role="status"></p>
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

  // ---- Wrong-answer lock ----
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
    if (first) real = bump(-1);   // a first wrong guess on a check costs 1 pressure (once per check)
    save();
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    animatePress(real);
  }
  function markRight(step) {
    st.done[step.id] = true; save();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check ----
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
    const qm = $("qmsg"); if (qm && qm.scrollIntoView && window.innerWidth < 900) qm.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function solved(step, quiet) {
    const r = $("replies"); if (!r) return;
    r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Filed</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp($("scene"), step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Moment (memorial, no question) ----
  function moment(step) {
    shell(step, step.scene(), `${step.body}<div id="after"></div>`);
    addNext(step, "", true);
  }

  // ---- Event: strategy call (results hidden until you pick) ----
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
        b.setAttribute("aria-label", c.title + ": " + c.result);
        box.querySelectorAll(".gcard").forEach(x => { x.disabled = true; if (x !== b) x.classList.add("spent"); });
        animatePress(real);
        stamp($("scene"), c.stamp, c.fx < 0);
        setTimeout(() => addNext(step, step.after || ""), 900);
      };
      box.appendChild(b);
    });
    if (picked) addNext(step, step.after || "", true);
  }

  // ---- Endings ----
  function ending() {
    const p = st.p, v = votes(p);
    let e;
    if (v >= NEED) e = { key: "Two Laws Signed", icon: "🎉", cls: "win", text: `1964: ${v} senators end the filibuster, and the Civil Rights Act passes. 1965: after Selma, the Voting Rights Act passes too.` };
    else if (p >= 4) e = { key: "So Close", icon: "⏳", cls: "mid", text: `${v} votes. Close, but not ${NEED}. The filibuster holds, and the bills wait another year.` };
    else e = { key: "Stalled in the Senate", icon: "🧱", cls: "low", text: `Only ${v} votes. The holdouts keep talking, and the bills die.` };
    const causes = [];
    ["e1", "e2", "e3"].forEach(id => { const s = STEPS.find(x => x.id === id); const c = s.cards.find(x => x.id === st.picks[id]); if (c) causes.push(c.cause); });
    const misses = CHECKS.filter(c => st.wrong[c.id]).length;
    causes.push(misses ? "Checks: shaky facts cost some pressure" : "Checks: solid facts kept the pressure up");
    e.causes = causes;
    return e;
  }
  function endStep(step) {
    const e = ending();
    if (!st.ended || st.endKey !== e.key) { st.ended = true; st.endKey = e.key; save(); }
    shell(step, TV.senate(),
      `<div class="endcard ${e.cls}"><p class="eicon">${e.icon}</p><h2>${esc(e.key)}</h2><p>${e.text}</p></div>
       <div class="caused"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>
       <div class="real">📜 <b>Real history:</b> both laws passed. The real 1964 vote to end the filibuster was 71–29.</div>
       <div id="after"></div>`);
    stamp($("scene"), e.key.toUpperCase(), e.cls === "low");
    addNext(step, "", true);
  }

  // ---- Writing (in-world memo) + turn in ----
  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="clipboard"><p class="cbh">🧠 Unit 4 test: know these</p>
        <p>🕊️ <b>Nonviolence</b> · ⛓️ <b>Civil disobedience</b></p>
        <p>📺 TV showed violence → public opinion changed</p>
        <p>📜 <b>Civil Rights Act 1964</b>: public places + jobs</p>
        <p>🗳️ <b>Voting Rights Act 1965</b>: stops literacy tests</p>
        <p class="endline">Your ending: ${e.icon} ${esc(e.key)} · 📣 ${st.p}/10</p></div>`,
      `<div class="write"><p class="ask">Write a memo for the next team.</p>${PROMPTS.map(p => `
         <label for="w_${p.id}">${p.label}</label>
         <p class="stem">Starter: ${esc(p.stem)} <button type="button" class="mini" data-starter="${p.id}">Use it</button></p>
         <textarea id="w_${p.id}" rows="3" placeholder="Type 1–2 sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: explain <b>why</b> it worked.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Send memo + turn in ▶"}</button>
         <p id="sendMsg" class="msg" role="status" aria-live="polite">${sent ? "✓ Turned in. You can fix your memo and turn it in again." : ""}</p>
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
    const testT = window.classIsTestT && window.classIsTestT();   // Test T. (teacher) skips the writing rules
    for (const p of (testT ? [] : PROMPTS)) {
      const box = $("w_" + p.id);
      const v = (box.value || "").trim();
      const tag = p.id === "tv" ? "Memo 1" : "Memo 2";
      const sayBad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
        if (junk) { msg.textContent = tag + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return sayBad(tag + ": write a little more (1–2 full sentences).");
      if (/_{2,}/.test(v)) return sayBad(tag + ": fill in the blanks (___) with your own words.");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return sayBad(tag + ": add more of your own ideas from today.");
      // Word lists aren't sentences: block heavy repeats ("tv news tv news because because…").
      const all = plain(v).match(/[\p{L}']+/gu) || [];
      if (all.length >= 8 && new Set(all).size / all.length < 0.65) return sayBad(tag + ": write it as a real sentence, not a list of words.");
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
      answers[c.short] = c.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    STEPS.forEach(s => {
      if (s.type === "event" && st.picks[s.id]) answers["Choice · " + s.short] = (s.cards.find(c => c.id === st.picks[s.id]) || {}).title;
    });
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    answers["Ending"] = e.key;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Pressure on Washington meter"] = st.p + " of 10";

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
    if (step.type === "event") return event(step);
    if (step.type === "moment") return moment(step);
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

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current check.
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => STEPS[i].short || STEPS[i].kicker || STEPS[i].type,
      go: i => { if (!st.name) st.name = "Test T."; st.step = i; st.lockUntil = 0; save(); render(); },
      solve: () => {
        const s = STEPS[Math.min(st.step, TOTAL - 1)]; if (!s) return;
        if (s.type === "check" && !st.done[s.id]) { st.done[s.id] = true; st.lockUntil = 0; save(); render(); }
        else if (s.type === "event" && !st.picks[s.id]) { const b = document.querySelector("#cards .gcard"); if (b) b.click(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
