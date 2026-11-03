// =====================================================================
//  SUPERPOWER DECISION DESK  (U.S. History · Unit 6 · Day 1)
//  Fall 2001. You're a new adviser to the President. Read the intel
//  (where 9/11 came from, the day itself), then make 3 big calls:
//  Afghanistan, surveillance, airports. Two made-up advisers push back:
//  Gen. Reyes (🛡️ security) and Counsel Voss (🗽 freedoms).
//  7 checks, 3 calls, 4 endings, 2 writing answers. ~25 minutes.
//  🤝 Trust: +1 for a first-try fact, −1 for every wrong guess.
//  Trust 3 or lower at the end = "Off the Call List" ending.
//  Polished 11/3 from the old UnitGame version: same assignmentId, new save key.
//  Turn-in via shared/turnin.js (same payload shape as UnitGame finish()).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u6-d1-superpower-v2";
  const ASSIGNMENT_ID = "ush-u6-d1-superpower";
  const TITLE = "U.S. History · Unit 6 · Day 1 · Superpower Decision Desk";
  const STANDARD = "SS.9-12.US.52, SS.9-12.US.53, SS.9-12.US.55, SS.9-12.US.56";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;
  const START = { sec: 5, free: 5, trust: 5 };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = n => Math.max(0, Math.min(10, n));

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const file = (tab, inner, cite) => `<div class="folder"><span class="ftab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const tl = rows => `<ol class="tl">${rows.map(r => `<li><span class="yr">${r[0]}</span><span class="ic" aria-hidden="true">${r[1]}</span><span>${r[2]}</span></li>`).join("")}</ol>`;
  const FACE = { R: ["👨🏽‍✈️", "Gen. Reyes", "r"], V: ["👩🏼‍⚖️", "Counsel Voss", "v"], P: ["🎙️", "President Bush", "p"] };
  const say = (k, t) => `<div class="sayrow ${FACE[k][2]}"><span class="sface" aria-hidden="true">${FACE[k][0]}</span><div class="say"><span class="who-s">${FACE[k][1]}</span>${t}</div></div>`;
  const vs = (r, v) => `<div class="vs">${say("R", r)}${say("V", v)}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><p>${html}</p></div>`;
  const quote = (q, who) => `<blockquote class="quote">“${q}”<cite>${who}</cite></blockquote>`;

  // ---------------- Folders (HUD chips) ----------------
  const PARTS = [
    { icon: "📁", tag: "Roots", terms: [["Cold War", "U.S. vs. Soviet Union rivalry, 1945–1991"], ["Mujahideen", "Afghan fighters who fought the Soviets"], ["Al-Qaeda", "bin Laden's terrorist group, started 1988"], ["Embassy", "a country's office in another country"]] },
    { icon: "✈️", tag: "9/11", terms: [["Hijacker", "someone who takes over a plane by force"], ["Civic virtue", "putting the common good ahead of yourself"], ["Hate crime", "a crime against someone because of who they are"], ["Mosque", "a Muslim place of worship"]] },
    { icon: "🏛️", tag: "Response", terms: [["Taliban", "the group ruling Afghanistan in 2001"], ["Surveillance", "watching people's calls, emails, and records"], ["Fourth Amendment", "protects you from unreasonable searches"], ["TSA", "federal airport screeners, created 2001"], ["WMD", "weapons of mass destruction"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1].
  // event: a big call. fx moves 🛡️ sec and 🗽 free. real:true = what the U.S. actually did.
  const STEPS = [
    // ===== 📁 Roots =====
    { id: "c1", type: "check", p: 0, std: "US.52", date: "1979–1989", kicker: "Intel file 1 · Cold War roots", short: "Cold War roots of al-Qaeda", stamp: "VERIFIED",
      scene: () => say("R", "“To understand 9/11, start in Afghanistan.”") +
        file("Timeline · Afghanistan", tl([["1979", "🪖", "Soviet Union invades Afghanistan."], ["1980s", "💵", "Cold War move: the CIA arms Afghan fighters, the <b>Mujahideen</b>."], ["1988", "⚫", "Osama bin Laden starts <b>al-Qaeda</b> with fighters from that war."], ["1989", "🏳️", "Soviet troops leave."]]), "Sources: 9/11 Commission Report (2004); Library of Congress"),
      ask: "What does this timeline show?",
      options: ["A Cold War fight helped give rise to al-Qaeda", "U.S. troops fought a Cold War battle in Afghanistan", "Al-Qaeda formed to fight against the Mujahideen", "The Soviets armed bin Laden to fight the CIA"],
      miss: ["No U.S. troops fought there. The CIA sent weapons.", "Al-Qaeda grew out of those fighters, not against them.", "The Soviets were the invaders. Look at 1979."],
      reveal: "<b>Unintended consequence</b>: a result nobody planned." },

    { id: "c2", type: "check", p: 0, std: "US.52", date: "1990–2000", kicker: "Intel file 2 · Bin Laden's anger", short: "Why bin Laden targeted the U.S.", stamp: "VERIFIED",
      scene: () => file("Al-Qaeda file", tl([["1991", "🪖", "Gulf War. U.S. troops are based in Saudi Arabia."], ["", "🕋", "Saudi Arabia holds Mecca and Medina, Islam's holiest cities."], ["1998", "💥", "Al-Qaeda bombs two U.S. embassies in Africa."], ["2000", "🚢", "Al-Qaeda bombs the USS <i>Cole</i>. 17 sailors die."]]), "Source: 9/11 Commission Report (2004)"),
      ask: "Why was bin Laden angry at the U.S.?",
      options: ["He saw U.S. troops as invaders of holy land", "He wanted U.S. troops to fight the Soviets", "He blamed the U.S. for the Soviet invasion", "He thought U.S. troops left Saudi Arabia early"],
      miss: ["The Soviets left Afghanistan in 1989. Look at Saudi Arabia.", "The Soviets invaded on their own. Look at Mecca and Medina.", "The troops stayed. Why would that anger him?"],
      reveal: "<b>Terrorism</b>: violence against regular people to pressure a government." },

    // ===== ✈️ 9/11 =====
    { id: "c3", type: "check", p: 1, std: "US.56", date: "Sept. 11, 2001", kicker: "September 11, 2001", short: "Flight 93 and civic virtue", stamp: "ON RECORD",
      scene: () => `<div class="fboard" role="table" aria-label="The four hijacked flights">
          <p class="fbtop" role="row"><span>FLIGHT</span><span>TIME</span><span>WHERE IT HIT</span></p>
          <p role="row"><span>AA 11</span><span>8:46</span><span>North Tower, NYC</span></p>
          <p role="row"><span>UA 175</span><span>9:03</span><span>South Tower, NYC</span></p>
          <p role="row"><span>AA 77</span><span>9:37</span><span>Pentagon, VA</span></p>
          <p role="row" class="hot"><span>UA 93</span><span>10:03</span><span>Field, Shanksville, PA</span></p>
          <p class="fbstop">⛔ ALL U.S. FLIGHTS GROUNDED</p></div>
        <p class="bignum"><b>19</b> al-Qaeda hijackers · nearly <b>3,000</b> killed</p>` +
        file("Flight 93", `<p>By phone, passengers learned about the other planes. They rushed the cockpit.</p>`, "Source: 9/11 Commission Report (2004)"),
      ask: "How did Flight 93's passengers show civic virtue (putting others first)?",
      options: ["They risked their lives to stop an attack", "They called their families to say goodbye", "They followed orders and stayed in their seats", "They waited for military jets to rescue them"],
      miss: ["That was brave and human, but it didn't protect others.", "They did the opposite. Look at the last line.", "No rescue came. What did they decide to do?"],
      reveal: "<b>Civic virtue</b> too: 343 New York firefighters died running into the towers." },

    { id: "c4", type: "check", p: 1, std: "US.55", date: "Sept. 17, 2001", kicker: "Home front · Six days later", short: "Bush's message on Muslim Americans", stamp: "ON RECORD",
      scene: () => file("FBI · Anti-Muslim hate crimes", `<div class="chart"><div class="br"><span>2000</span><span class="tr"><span style="width:6%"></span></span><span>28</span></div><div class="br"><span>2001</span><span class="tr"><span class="hot" style="width:100%"></span></span><span>481</span></div></div>`, "Source: FBI Hate Crime Statistics, 2000 and 2001") +
        quote("The face of terror is not the true faith of Islam.", "President George W. Bush, at a Washington, D.C., mosque, Sept. 17, 2001"),
      ask: "What was Bush's message?",
      options: ["Don't blame Muslim Americans for the attack", "Watch Muslim Americans much more closely", "Islam itself caused the September 11 attack", "Muslim Americans should leave for safety"],
      miss: ["He said the terror was NOT the faith of Islam.", "Reread the quote: what is terror NOT?", "He was speaking at a mosque, to Muslim Americans. Reread."],
      reveal: "<b>Extremists</b>: most of the world's Muslims rejected al-Qaeda's ideas." },

    // ===== 🏛️ Response =====
    { id: "e1", type: "event", p: 2, date: "Oct. 2001", kicker: "Big call 1 of 3 · Afghanistan", short: "Afghanistan decision",
      scene: () => file("Intel", `<p>Afghanistan's rulers, the <b>Taliban</b>, hide bin Laden. They refuse to hand him over.</p>`) +
        vs("“Hit the camps now.”", "“A war can last longer than anyone plans.”"),
      ask: "Your advice to the President:",
      cards: [
        { icon: "🪖", t: "Strike with allies", line: "Remove the Taliban, destroy the camps", fx: { sec: 2, free: -1 }, real: true, cause: "Struck Afghanistan",
          res: "The real choice. The Taliban fell within two months, but bin Laden escaped. Prisoners were held without trial at Guantánamo, a U.S. base in Cuba." },
        { icon: "🎯", t: "Squeeze + small teams", line: "Trade limits, talks, and special forces", fx: { sec: 1 }, cause: "Squeezed the Taliban",
          res: "Less risk of a long war, but al-Qaeda keeps its camps longer. (Real 2001: a full attack.)" },
        { icon: "⚖️", t: "Treat it as a crime", line: "Charge them and try them in court", fx: { free: 1 }, cause: "Treated it as a crime",
          res: "Fair trials stay, but police can't arrest leaders a government hides. (Real 2001: a full attack.)" }
      ],
      reveal: "<b>War on Terror</b>: Bush's name for the fight against terrorist groups worldwide." },

    { id: "e2", type: "event", p: 2, date: "Oct. 2001", kicker: "Big call 2 of 3 · Surveillance", short: "Surveillance decision",
      scene: () => `<div class="phone" aria-hidden="true"><div class="pscreen"><p class="ptop">🔍 SEARCH REQUEST</p><p>📞 Calls</p><p>✉️ Emails</p><p>🏦 Bank records</p></div></div>` +
        file("Congress is voting", `<p>Agencies want more power to search records of terror suspects.</p>`) +
        vs("“Find the next plot before it happens.”", "“Don't spy on innocent Americans.”"),
      ask: "Your advice to Congress:",
      cards: [
        { icon: "📡", t: "Broad new powers", line: "Faster searches, fewer court steps", fx: { sec: 2, free: -2 }, real: true, cause: "Broad search powers",
          res: "Close to the real <b>USA PATRIOT Act</b>, passed 98–1 in the Senate. Faster tools, bigger privacy fights." },
        { icon: "👩‍⚖️", t: "Powers + a judge", line: "New tools, but judges sign off", fx: { sec: 1 }, cause: "Powers with a judge",
          res: "Courts stay involved, but some officials say it's too slow in a crisis." },
        { icon: "🔒", t: "No new powers", line: "Make agencies share what they have", fx: { free: 1 }, cause: "No new powers",
          res: "Privacy groups like this, but critics say old rules can't track new tech." }
      ],
      reveal: "<b>Surveillance</b>: watching people's calls, emails, and records." },

    { id: "c5", type: "check", p: 2, std: "US.55", date: "2001–2015", kicker: "Debate desk · The Patriot Act", short: "Evidence for a Patriot Act critic", stamp: "ON RECORD",
      scene: () => `<div class="vs">${say("R", "<small>Supporter</small> “Terrorists plan by phone and email.”")}${say("V", "<small>Critic</small> “The Constitution bans unreasonable searches.”")}</div>` +
        file("What happened next", tl([["2001", "🗳️", "Senate passes the Patriot Act 98–1."], ["2013", "📞", "A leak shows a U.S. spy agency kept millions of Americans' phone records."], ["2015", "✋", "Congress ends that mass collection."]]), "Sources: U.S. Senate; USA FREEDOM Act (2015)"),
      ask: "Which fact best backs up the CRITIC?",
      options: ["A spy agency kept millions of Americans' phone records", "The Senate voted 98 to 1 to pass the Patriot Act", "Terrorists plan their attacks by phone and email", "Agencies need speed to stop attacks before they happen"],
      miss: ["A big vote helps the supporter, not the critic.", "That's the supporter's reason. Who worries about searches?", "That's the supporter's reason. Find a fact about ordinary people."],
      reveal: "<b>Fourth Amendment</b>: protects Americans from unreasonable searches." },

    { id: "e3", type: "event", p: 2, date: "Nov. 2001", kicker: "Big call 3 of 3 · Airports", short: "Airport security decision",
      scene: () => `<div class="xray" aria-hidden="true"><span class="bag">🧳</span><span class="beam"></span><span class="found">✂️ box cutter</span></div>` +
        file("Intel", `<p>The hijackers carried small knives and box cutters through security.</p>`, "Source: 9/11 Commission Report (2004)") +
        vs("“Search every bag, every time.”", "“Don't treat every traveler like a suspect.”"),
      ask: "Your advice to Congress:",
      cards: [
        { icon: "🛂", t: "Federal screeners", line: "Strict searches at every airport", fx: { sec: 2, free: -1 }, real: true, cause: "Federal screeners",
          res: "The real choice: Congress created the <b>TSA</b> in Nov. 2001. Safer flights, longer lines, privacy complaints." },
        { icon: "🔐", t: "Lock the cockpits", line: "Strong doors and air marshals only", fx: { sec: 1 }, cause: "Locked cockpits only",
          res: "Real steps too, but bags still get light searches." },
        { icon: "🎫", t: "Keep it the same", line: "Fast lines, current rules", fx: { sec: -1, free: 1 }, cause: "Kept airports the same",
          res: "Travel stays easy, but the checkpoints that missed box cutters stay the same." }
      ],
      reveal: "<b>TSA</b>: the federal agency that screens airport passengers." },

    { id: "c6", type: "check", p: 2, std: "US.53", date: "Nov. 2002", kicker: "Fix the system · Homeland Security", short: "Why Homeland Security was created", stamp: "APPROVED",
      scene: () => `<div class="merge" aria-label="22 agencies joined into one department"><div class="dots">${"<span></span>".repeat(22)}</div><span class="arr" aria-hidden="true">➜</span><div class="dhs">🛡️<b>Dept. of Homeland Security</b><small>22 agencies in 1</small></div></div>` +
        file("Investigators found", `<p>Before 9/11, agencies had warning signs about the plot but kept them to themselves.</p>`, "Source: 9/11 Commission Report (2004)"),
      ask: "Why join 22 agencies into one department?",
      options: ["So agencies would share clues and work together", "So the military could take over police work at home", "So the government could spend less on security", "So each state could run its own border plan"],
      miss: ["The military didn't take over police work. Reread what investigators found.", "It was a big new department. Reread the problem.", "It made one national department, not 50 state plans."],
      reveal: "<b>Homeland Security</b>: one department to guard borders, airports, and the coast." },

    { id: "c7", type: "check", p: 2, std: "US.52", date: "2003", kicker: "A new front · Iraq", short: "Why the Iraq War was debated", stamp: "ON RECORD",
      scene: () => `<div class="cvf"><div class="claim"><p class="ch">2003 · Bush team's claim</p><p>🧪 Iraq has weapons of mass destruction (<b>WMDs</b>).</p><p>🤝 Iraq could give them to terrorists.</p></div><div class="found"><p class="ch">Later · What was found</p><p>❌ No WMDs found.</p><p>❌ No proof Iraq helped plan 9/11.</p></div></div>` +
        say("R", "<small>Supporters</small> “Removing a brutal dictator was still worth it.”") + src("Sources: Iraq Survey Group (2004); 9/11 Commission Report (2004)"),
      ask: "Why was the Iraq War debated more than Afghanistan?",
      options: ["Its 9/11 link and WMDs were never proven", "Iraq's rulers openly hid bin Laden for years", "Every U.S. ally sent troops to fight in Iraq", "The U.S. never sent ground troops into Iraq"],
      miss: ["That was Afghanistan's Taliban, not Iraq.", "Many allies refused. Look at what was found.", "U.S. troops did invade in 2003. Look at what was found."],
      reveal: "<b>WMD</b>: weapons of mass destruction, like chemical or nuclear weapons." },

    { id: "end", type: "ending", p: 2, date: "May 2011", kicker: "Your record" },
    { id: "write", type: "write", p: 2, date: "Your memo", kicker: "Memo to the President" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const EVENTS = STEPS.filter(s => s.type === "event");

  const PROMPTS = [
    { id: "respond", short: "How a superpower should respond", label: "1. Defend ONE of your big calls. Use a fact from today.",
      bank: ["🪖 Afghanistan", "📡 Patriot Act", "🛂 TSA", "🛡️ security", "🗽 privacy"],
      stem: "On ___, I advised ___ because ___.", min: 60, newWords: 5,
      mustAll: [["afghan", "taliban", "airport", "tsa", "screen", "cockpit", "surveil", "patriot", "record", "phone", "search", "military", "court", "crime"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name the call (Afghanistan, surveillance, or airports) AND explain why (use “because”)." },
    { id: "balance", short: "Balancing safety and freedom", label: "2. How can a democracy fight terrorism AND protect freedom? Give one example.",
      bank: ["👩‍⚖️ judge", "🔒 privacy", "📞 phone records", "🛂 TSA", "4️⃣ Fourth Amendment"],
      stem: "A democracy can ___. For example, ___.", min: 60, newWords: 5,
      mustAll: [["safe", "secur", "protect", "terror", "attack"], ["freedom", "free", "right", "privacy", "liberty", "court", "judge", "amendment", "search"]],
      mustMsg: "In answer 2, talk about BOTH safety and freedom (like privacy, rights, or a judge)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: Object.assign({}, START), picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.fx || !st.picks) st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts clean.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const V = k => clamp(st.fx[k]);
  const partDone = i => CHECKS.filter(c => c.p === i).every(c => st.done[c.id]) && EVENTS.filter(e => e.p === i).every(e => st.picks[e.id] != null);

  // ---------------- HUD ----------------
  const mood = n => n >= 8 ? "😄" : n >= 6 ? "🙂" : n >= 4 ? "😐" : "😠";
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    [["sec", "secFill", "secNum"], ["free", "freeFill", "freeNum"], ["trust", "trustFill", "trustNum"]].forEach(([k, f, n]) => { $(f).style.width = (V(k) * 10) + "%"; $(n).textContent = V(k) + "/10"; });
    $("moodR").textContent = mood(V("sec"));
    $("moodV").textContent = mood(V("free"));
    $("youName").textContent = st.name;
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("dateChip").textContent = "📅 " + step.date;
    const off = ["ending", "write"].includes(step.type);
    $("parts").innerHTML = PARTS.map((p, i) => `<span class="${partDone(i) ? "won" : i === step.p && !off ? "now" : ""}">${partDone(i) ? "✓" : p.icon} ${p.tag}</span>`).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
  }
  function bump(id, delta) {
    const el = $(id); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + (delta > 0 ? "good" : "bad");
    f.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  const snap = () => ({ sec: V("sec"), free: V("free"), trust: V("trust") });
  function moved(before) {
    hud();
    bump("mSec", V("sec") - before.sec);
    bump("mFree", V("free") - before.free);
    bump("mTrust", V("trust") - before.trust);
    [["sec", "advR"], ["free", "advV"]].forEach(([k, id]) => { if (V(k) !== before[k]) { const b = $(id); b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); } });
  }
  function fxChips(fx) {
    const out = [];
    if (fx.sec) out.push(`<span class="fx ${fx.sec > 0 ? "g" : "b"}">🛡️ ${fx.sec > 0 ? "+" : "−"}${Math.abs(fx.sec)}</span>`);
    if (fx.free) out.push(`<span class="fx ${fx.free > 0 ? "g" : "b"}">🗽 ${fx.free > 0 ? "+" : "−"}${Math.abs(fx.free)}</span>`);
    return out.join("");
  }
  const fxPlain = fx => "(" + ([fx.sec ? "🛡️ " + (fx.sec > 0 ? "+" : "−") + Math.abs(fx.sec) : "", fx.free ? "🗽 " + (fx.free > 0 ? "+" : "−") + Math.abs(fx.free) : ""].filter(Boolean).join(" ")) + ")";
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    host.querySelectorAll(".stamp").forEach(s => s.remove());
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml) {
    const off = ["ending", "write"].includes(step.type);
    const P = PARTS[step.p];
    app.innerHTML = `<div class="board"><div class="scene" id="scene"><p class="kick">${esc(step.kicker)}</p>${sceneHtml}</div>
      <div class="play" id="play">${off ? "" : `<div class="ptop"><button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Word help</button></div><div id="termsBox"></div>`}${playHtml}</div></div>`;
    if ($("termsBtn")) $("termsBtn").onclick = () => {
      const box = $("termsBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="terms">${P.terms.map(t => `<p><b>${t[0]}</b>: ${t[1]}</p>`).join("")}</div>`;
      $("termsBtn").setAttribute("aria-expanded", String(!open));
    };
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "ending") return "See your record ▶";
    if (nx.p !== step.p) return "Next: " + PARTS[nx.p].icon + " " + PARTS[nx.p].tag + " ▶";
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
        <div class="pdb"><p class="pdbt">THE PRESIDENT'S DAILY BRIEF</p><p class="pdbd">Fall 2001 · For the President only</p><span class="eyes">EYES ONLY</span>
          <div class="pdbicons"><span>📁</span><span>✈️</span><span>🏛️</span></div></div>
        <div class="vs">${say("R", "“Keep Americans safe.”")}${say("V", "“Keep Americans free.”")}</div>
      </div>
      <div class="tcopy">
        <p class="tk">U.S. History · Unit 6 · Day 1</p>
        <h1>Superpower Decision Desk</h1>
        <p class="recap">⏪ Last unit: the Cold War ended. The U.S. was the only superpower left.</p>
        <p class="hook">Fall 2001. America was just attacked. The President needs your advice.</p>
        <ul class="how"><li><span>📁</span>Read the intel, nail the facts</li><li><span>⚖️</span>Balance 🛡️ safety and 🗽 freedom</li><li><span>🤝</span>Guessing costs the President's trust</li></ul>
        <p class="tchips"><span>⏱️ 25 min</span><span>🔍 7 checks</span><span>🗳️ 3 big calls</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Take your seat 🏛️</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">Gen. Reyes and Counsel Voss are made up. Every fact is real. Standards: SS.9-12.US.52, US.53, US.55, US.56.</p>
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
  function markWrong(step, why) {
    const before = snap();
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.fx.trust = clamp(st.fx.trust - 1);
    st.lockUntil = Date.now() + LOCK * 1000;
    st.lockMsg = why;
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    const before = snap();
    st.done[step.id] = true;
    if (!st.wrong[step.id]) st.fx.trust = clamp(st.fx.trust + 1);
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) return solved(step, true);
    draw(step);
    if (lockLeft() > 0) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || "", $("qmsg"), () => draw(step), lockLeft()); }
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
    const why = step.miss[o.n - 1];
    markWrong(step, why);
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ In the brief</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Event: a big call ----
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><span class="dline">${esc(c.line)}</span></button>`; }).join("")}</div><p class="peek">🛡️ 🗽 Most calls trade one for the other.</p>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      const before = snap();
      st.picks[step.id] = i;
      st.fx.sec = clamp(st.fx.sec + (c.fx.sec || 0));
      st.fx.free = clamp(st.fx.free + (c.fx.free || 0));
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span><b>${esc(c.t)}</b><br><span class="dline">${esc(c.line)}</span></span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${c.real ? '<span class="realtag">✓ Real 2001</span> ' : ""}${c.res}</p>`;
    if (!quiet) stamp("ADVICE SENT");
    addNext(step, step.reveal, quiet);
  }

  // ---- Endings ----
  function ending() {
    const s = V("sec"), f = V("free"), t = V("trust");
    let e;
    if (t <= 3) e = { key: "Off the Call List", icon: "📵", cls: "low", text: "Your big calls made sense, but your facts kept wobbling. The President stops calling. Advisers need the facts first." };
    else if (s >= 8 && f <= 4) e = { key: "Security First", icon: "🛡️", cls: "sec", text: "The President takes your toughest ideas. Reyes: “Safer skies.” Voss: “We gave up privacy.” Close to the real 2001 path." };
    else if (f >= 7) e = { key: "Rights First", icon: "🗽", cls: "free", text: "Courts and privacy come first. Voss: “We stayed free.” Reyes: “We left gaps open.”" };
    else e = { key: "The Balancer", icon: "⚖️", cls: "bal", text: "Both advisers grumble a little. You traded some safety for some freedom. Most real compromises look like this." };
    const causes = EVENTS.filter(x => st.picks[x.id] != null).map(x => { const c = x.cards[st.picks[x.id]]; return c.icon + " " + c.cause + " " + fxPlain(c.fx); });
    causes.push(t >= 7 ? "🤝 Solid facts earned trust" : t <= 4 ? "🤝 Shaky facts cost trust" : "🤝 Mostly solid facts");
    e.causes = causes;
    e.out = e.key;
    return e;
  }

  function endingStep(step) {
    const e = ending();
    const real = EVENTS.map(x => { const c = x.cards[st.picks[x.id]] || {}; const r = x.cards.find(k => k.real); return `<li><span>${esc(x.short.replace(" decision", ""))}</span><span>${c.icon || ""} ${esc(c.t || "—")}</span><span>${r.icon} ${esc(r.t)}</span></li>`; }).join("");
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>
        <div class="epi"><span aria-hidden="true">📰</span><p><b>May 2011:</b> U.S. forces find and kill bin Laden in Pakistan.</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>
       <div class="realpath"><p class="ch">You vs. real 2001</p><ul><li class="hd"><span></span><span>You</span><span>Real U.S.</span></li>${real}</ul></div><div id="after"></div>`);
    const b = nextBtn(step); b.textContent = "✏️ Write your memo ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="memo"><p class="mh">MEMO · THE WHITE HOUSE</p><p><b>To:</b> The President</p><p><b>From:</b> ${esc(st.name)}, adviser</p><p><b>Your record:</b> ${e.icon} ${esc(e.key)}</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: explain what your call cost, not just what it gained.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Send memo + turn in ▶"}</button>
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
      const n = PROMPTS.indexOf(p) + 1;
      const box = $("w_" + p.id), v = (box.value || "").trim();
      const bad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
        if (junk) { msg.textContent = "For answer " + n + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return bad("Write a little more for answer " + n + " (1–2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words in answer " + n + ".");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas in answer " + n + ". Use details from today.");
      const has = w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v) + " ");
      if (p.mustAll.some(g => !g.some(has))) return bad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort((a, b) => parseFloat(a.split(".")[1]) - parseFloat(b.split(".")[1])).map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    STEPS.forEach(s => {
      if (s.type === "event" && st.picks[s.id] != null) { const c = s.cards[st.picks[s.id]]; answers["Choice · " + s.short] = c.t + ": " + c.line; }
      if (s.type === "check") { const w = st.wrong[s.id]; answers[s.std + " · " + s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); }
    });
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Security meter"] = V("sec") + " of 10";
    answers["Freedoms meter"] = V("free") + " of 10";
    answers["Trust meter"] = V("trust") + " of 10";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Memo sent!"; msg.className = "msg good";
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
    if (step.type === "ending") return endingStep(step);
    return writeStep(step);
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; st.step = name ? 0 : -1;
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
