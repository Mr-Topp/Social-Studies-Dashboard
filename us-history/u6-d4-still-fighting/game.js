// =====================================================================
//  THE FIGHT FOR ACCESS  (U.S. History Unit 6 · Day 2)
//  Polish of the original (same premise, story and mechanic): you're an
//  organizer in the Disability Rights Movement. Real checks between three
//  big tactic moments: the 1977 Section 504 sit-in, Denver 1978 buses,
//  the 1990 Capitol Crawl. Then the ADA, and the fight today.
//  Two meters: 📣 Pressure on leaders, 🤝 Supporters. Tactics trade one
//  for the other. A first wrong guess on a check costs 1 🤝 (once per check).
//  7 checks (US.51 ×5, US.56 ×2), 3 tactic calls, 4 endings, 2 writing answers.
//  Same assignmentId as the old engine version. Turn-in via shared/turnin.js.
//  Every person and event is real. Day 2 shares the block with "Surviving
//  2008", so this one is built for ~15–20 minutes.
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u6-d4-still-fighting-v2";
  const ASSIGNMENT_ID = "ush-u6-d4-still-fighting";
  const TITLE = "U.S. History · Unit 6 · Day 2 · The Fight for Access";
  const STANDARD = "SS.9-12.US.51, SS.9-12.US.56";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;                     // seconds locked after a wrong answer
  const START = { press: 2, sup: 5 }; // 0–10 each
  const GOAL = { press: 8, sup: 5 };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = v => Math.max(0, Math.min(10, v));

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (who, t, cls) => `<div class="say ${cls || ""}"><span class="who-s">${who}</span>${t}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  const pair = (a, b) => `<div class="pair">${[a, b].map(p => `<div class="pp ${p.cls}"><span class="pi" aria-hidden="true">${p.icon}</span><b>${p.where}</b><span class="py">${p.year}</span><p>${p.t}</p></div>`).join(`<span class="vs" aria-hidden="true">=?</span>`)}</div>`;

  function license() {
    return `<div class="doc" role="img" aria-label="Teaching license file for Judy Heumann, 1970. Tests passed. License denied.">
      <p class="dh">NEW YORK CITY · TEACHING LICENSE · 1970</p>
      <div class="drow"><span>Applicant</span><b>Judy Heumann</b></div>
      <div class="drow"><span>Teacher tests</span><b class="ok">PASSED ✓</b></div>
      <div class="drow"><span>Uses a wheelchair</span><b>Yes ♿</b></div>
      <div class="drow"><span>Reason given</span><b>“Fire safety”</b></div>
      <div class="dstamp">DENIED</div></div>`;
  }
  function waiting() {
    const yrs = [["1973", "📜", "Law passes", "ok"], ["1974", "⏳", "", "no"], ["1975", "⏳", "", "no"], ["1976", "⏳", "", "no"], ["1977", "❓", "No rules yet", "now"]];
    return `<div class="tl" role="img" aria-label="1973 Section 504 passes. 1974 to 1977: the rules to enforce it are still not signed.">${yrs.map(y => `<div class="ty ${y[3]}"><span class="ti" aria-hidden="true">${y[1]}</span><b>${y[0]}</b><small>${y[2]}</small></div>`).join("")}</div>`;
  }
  function building() {
    return `<div class="fed" aria-hidden="true"><div class="fsign">FEDERAL BUILDING · SAN FRANCISCO</div><div class="fwin">${"<span></span>".repeat(12)}</div><div class="fdoor">🚪</div><div class="fppl">🧑‍🦽👩‍🦯🧏🏽‍♀️🧑🏿‍🦽👨🏻‍🦯🧑🏽‍🦼</div></div>`;
  }
  function bus() {
    return `<div class="street" aria-hidden="true"><div class="bus"><span class="bw">${"<span></span>".repeat(5)}</span><span class="bsteps">▤ STEPS ONLY</span><span class="bnum">RTD 15</span><span class="wh l"></span><span class="wh r"></span></div><div class="curb">🧑‍🦽 🧑🏿‍🦽 🧑🏼‍🦼</div></div>`;
  }
  function capitol(crawl) {
    return `<div class="cap" aria-hidden="true"><div class="dome"><span class="tip"></span></div><div class="cbody">${"<span></span>".repeat(7)}</div><div class="steps">${crawl ? `<span class="crawler c1">🧗</span><span class="crawler c2">🧗🏽‍♀️</span><span class="crawler c3">🧒</span>` : ""}</div><div class="chairs">${crawl ? "🦽 🦽 🦯 🦽" : "🧑‍🦽 👩🏾‍🦽 🧑‍🦯 🧑🏻‍🦽"}</div></div>`;
  }
  function inbox() {
    return `<div class="lawcard"><p class="lh">📜 Americans with Disabilities Act · 1990</p>${ln("💼", "Jobs")}${ln("🏪", "Stores + restaurants")}${ln("🚌", "Buses + trains")}${ln("🏛️", "Government")}<p class="lf">No unfair treatment because of a disability.</p></div>`;
  }

  // ---------------- Parts ----------------
  const PARTS = [
    { icon: "🚪", tag: "Shut Out", name: "Part 1 · Shut Out · 1970–1977",
      terms: [["Discrimination", "unfair treatment of a group"], ["Section 504", "a 1973 law: no disability discrimination where federal money goes"], ["Federal", "the national government"]] },
    { icon: "🚌", tag: "The Streets", name: "Part 2 · The Streets · 1978–1990",
      terms: [["Civil disobedience", "breaking a rule on purpose, peacefully, to show it's unfair"], ["ADA", "Americans with Disabilities Act"], ["Lobby", "meet lawmakers to win their votes"]] },
    { icon: "📜", tag: "The Law", name: "Part 3 · The Law · 1990 to today",
      terms: [["ADA", "1990 law: no disability discrimination in jobs, stores, buses, government"], ["Enforce", "make people follow a law"], ["Civic virtue", "acting for the common good"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] explains options[i+1].
  // event: a tactic call. fx moves press (📣) and sup (🤝).
  const STEPS = [
    // ===== Part 1 =====
    { id: "a1", type: "check", p: 0, std: "US.51", kicker: "New York City · 1970", short: "Heumann: shut out by disability, not ability", stamp: "SHUT OUT",
      scene: () => license() + ln("⚖️", "She sued and won. She became the city's first teacher in a wheelchair."),
      ask: "Why was Judy Heumann turned down?",
      options: ["Her wheelchair, not her skills", "She failed the teacher tests", "There were no teaching jobs open", "She hadn't finished her college degree"],
      miss: ["Check the file: tests PASSED.", "The file gives a reason. It isn't jobs.", "She passed the tests, so she was qualified."],
      hint: "Read the reason on the file.",
      reveal: "<b>Discrimination</b>: unfair treatment of a group. Here, people with disabilities." },

    { id: "e1", type: "event", p: 0, kicker: "Moment 1 · San Francisco · April 1977", short: "1977 Section 504 protest tactic", stop: 0,
      scene: () => `<div class="quote">“No otherwise qualified handicapped individual… shall, solely by reason of his handicap, be excluded…”${src("Section 504, 1973. Plain English: no shutting people out just for a disability. (“Handicapped” was the word then.)")}</div>` + waiting() + building() + say("📣 Your crew", "We're inside. They close at 5."),
      ask: "4 years, still no rules. Your tactic?",
      cards: [
        { icon: "🪑", t: "Refuse to leave", line: "Stay until they sign.", fx: { press: 3, sup: 1 }, res: "You sleep on the floor for weeks. Officials can't ignore you.", cause: "Refused to leave", stamp: "RULES SIGNED" },
        { icon: "✉️", t: "Write Congress", line: "Leave at 5. Mail letters.", fx: { press: 1, sup: 1 }, res: "Polite. But they've ignored this law for 4 years.", cause: "Wrote letters", stamp: "FILED AWAY" },
        { icon: "🪧", t: "Rally outside", line: "Big crowd, then go home.", fx: { press: 1, sup: 2 }, res: "Great photos. Officials just wait you out.", cause: "Rallied, went home", stamp: "WAITED OUT" }
      ],
      reveal: "<b>Real history:</b> about 150 people stayed almost a month. The rules were signed April 28, 1977." },

    { id: "a4", type: "check", p: 0, std: "US.51", kicker: "Look back · Two protests", short: "504 protest borrowed the sit-in (Greensboro)", stamp: "BORROWED",
      scene: () => pair({ cls: "a", icon: "🍽️", where: "Greensboro, NC", year: "1960", t: "Black students take seats at a whites-only lunch counter. They stay until served." },
                        { cls: "b", icon: "🏛️", where: "San Francisco", year: "1977", t: "Disability activists take over a federal office. They stay until the rules are signed." }),
      ask: "Which civil rights tactic did disability activists borrow?",
      options: ["The sit-in", "The boycott", "The Freedom Ride", "The march"],
      miss: ["A boycott means not buying or riding. They stayed put.", "Freedom Riders rode buses across states.", "A march moves. They stayed in one place."],
      hint: "What did BOTH groups do with the space they were in?",
      reveal: "<b>Sit-in</b>: peacefully take a space and refuse to leave." },

    { id: "a5", type: "check", p: 0, std: "US.56", kicker: "Inside the federal building · 1977", short: "Black Panthers fed protesters = support across movements", stamp: "ALLIES",
      scene: () => ln("🍽️", "No food inside for 150 people.") + `<div class="delivery"><span class="van" aria-hidden="true">🚐🍲</span><p><b>Every day: hot meals</b><small>from the Black Panther Party, a Black activist group</small></p></div>` + ln("⛪", "Churches and labor unions send help too."),
      ask: "What does this show?",
      options: ["Other groups backed their fight", "The government sent in the meals", "The protesters went home to eat", "Only disabled people joined in"],
      miss: ["Look who brought the meals.", "They stayed for almost a month.", "The Panthers, churches, and unions joined in."],
      hint: "Who brought the food? Were they disability groups?",
      reveal: "<b>Civic virtue</b>: acting for the common good, like helping another group win its rights." },

    // ===== Part 2 =====
    { id: "e2", type: "event", p: 1, kicker: "Moment 2 · Denver · July 1978", short: "Denver bus protest tactic", stop: 1,
      scene: () => bus() + say("📣 Your crew", "The city keeps buying buses with no lifts. We can't get on."),
      ask: "Your tactic?",
      cards: [
        { icon: "🛑", t: "Block the buses", line: "Surround them. Stay all night.", fx: { press: 3, sup: -1 }, res: "Buses stuck all night. Some commuters grumble. Officials agree to talk about lifts.", cause: "Blocked the buses", stamp: "BUSES STOPPED" },
        { icon: "📝", t: "Petition the city", line: "Collect names. Send them in.", fx: { press: 1, sup: 1 }, res: "Lots of names. The city has said no before.", cause: "Sent a petition", stamp: "NOTED" },
        { icon: "🚫", t: "Bus boycott", line: "Like Montgomery, 1955.", fx: { press: 0, sup: 1 }, res: "Problem: you can't boycott a bus you can't ride.", cause: "Tried a boycott", stamp: "NO EFFECT" }
      ],
      reveal: "<b>Civil disobedience</b>: breaking a rule peacefully, on purpose. 19 activists did it here." },

    { id: "b2", type: "check", p: 1, std: "US.51", kicker: "Look back · Two bus fights", short: "Denver vs. Montgomery: both wanted equal access", stamp: "SAME GOAL",
      scene: () => pair({ cls: "a", icon: "🚌🚫", where: "Montgomery, AL", year: "1955–56", t: "Black riders stay off city buses to end separate seats by race." },
                        { cls: "b", icon: "🚌♿", where: "Denver, CO", year: "1978", t: "Wheelchair users block city buses that have no lifts." }),
      ask: "What did both movements want?",
      options: ["Equal access to city buses", "Lower bus fares for riders", "Bus driver jobs for their group", "To use the same tactic"],
      miss: ["Fares weren't it. Who got to ride, and how?", "Not jobs. Riding the bus.", "Different tactics: one stayed off, one blocked."],
      hint: "Look at what each group wanted, not how they protested.",
      reveal: "Same goal, different tactics: <b>equal access</b> to public places." },

    { id: "e3", type: "event", p: 1, kicker: "Moment 3 · U.S. Capitol · March 12, 1990", short: "Capitol tactic, March 1990", 
      scene: () => capitol(false) + ln("📜", "The <b>ADA</b> would ban disability discrimination almost everywhere.") + ln("🧱", "The Senate passed it. It's stuck in the House."),
      ask: "Hundreds of you reach the Capitol steps. Your tactic?",
      cards: [
        { icon: "🧗", t: "Crawl the steps", line: "Leave wheelchairs. Climb by hand.", fx: { press: 3, sup: 1 }, res: "Dozens crawl up. News cameras roll.", cause: "Crawled the steps", stamp: "ON THE NEWS" },
        { icon: "🤝", t: "Meet Congress", line: "Go inside. Lobby lawmakers.", fx: { press: 2, sup: 2 }, res: "You win a few more votes. It doesn't make the news.", cause: "Lobbied inside", stamp: "HEARD" },
        { icon: "🪧", t: "Signs at the bottom", line: "Safe and simple.", fx: { press: 1, sup: 1 }, res: "A few photos. Easy to ignore.", cause: "Held signs", stamp: "IGNORED" }
      ],
      reveal: "<b>Real history:</b> the <b>Capitol Crawl</b>. Activists also lobbied inside." },

    { id: "b4", type: "check", p: 1, std: "US.56", kicker: "Capitol steps · March 12, 1990", short: "Jennifer Keelan = civic virtue", stamp: "CIVIC VIRTUE",
      scene: () => capitol(true) + `<div class="quote big">“I'll take all night if I have to.”${src("Jennifer Keelan, age 8. She has cerebral palsy. She crawled the steps.")}</div>`,
      ask: "Civic virtue means acting for the common good. How did Jennifer show it?",
      options: ["Pushing on to win rights for others", "Proving she didn't need a wheelchair", "Asking Congress to fix just those steps", "Trying to get on the evening news"],
      miss: ["She still needed it. The steps were the point.", "The ADA covered the whole country, not one stairway.", "Cameras came, but why did she climb?"],
      hint: "Who would the ADA help besides Jennifer?",
      reveal: "She climbed for <b>millions</b> of people, not just herself." },

    { id: "end", type: "verdict", p: 1, kicker: "July 1990 · The vote" },

    // ===== Part 3 =====
    { id: "c2", type: "check", p: 2, std: "US.51", kicker: "1990s · Complaint desk", short: "Spot an ADA violation", stamp: "VIOLATION",
      scene: () => inbox() + say("📣 Your crew", "Our hotline got four calls today."),
      ask: "All four calls are about one diner. Which breaks the ADA?",
      options: ["Turns away a deaf cook who aced the tryout", "Turns away a cook who failed the tryout", "Fires a cook who skipped five shifts in a row", "Hires the cook with the best tryout"],
      miss: ["Failing the tryout means not qualified. That's allowed.", "Skipping work isn't about a disability.", "Hiring the best cook is fair."],
      hint: "The ADA protects people who CAN do the job.",
      reveal: "<b>ADA</b>: you can't turn away a qualified worker over a disability." },

    { id: "c4", type: "check", p: 2, std: "US.51", kicker: "Today · Still fighting", short: "Today's debate: how to enforce the ADA", stamp: "STILL FIGHTING", stop: 3,
      scene: () => `<div class="phone"><p class="ph">📱 Today's debate</p>${say("🧑‍💼 Some business owners", "Warn us first. Give us time to fix it before you sue.", "l")}${say("♿ Many disability activists", "It's been the law since 1990. Why should we wait?", "r")}${src("Real debate: a 2018 bill to require a warning first passed the House, not the Senate.")}</div>`,
      ask: "What are both sides arguing about?",
      options: ["How the ADA should be enforced", "Whether to get rid of the ADA", "Whether buses need wheelchair lifts", "Whether to sign the 504 rules"],
      miss: ["Neither side says end it. They argue about suing.", "Buses aren't in this one. Reread the bubbles.", "Those were signed in 1977."],
      hint: "Both sides keep the law. What do they disagree on?",
      reveal: "<b>Still fighting</b>: winning a law is step one. Enforcing it goes on." },

    { id: "write", type: "write", p: 2, kicker: "Your rally speech" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const EVENTS = STEPS.filter(s => s.type === "event");

  // ---------------- Writing ----------------
  const PROMPTS = [
    { id: "compare", short: "Compare to an earlier civil rights tactic",
      label: "1. 📣 Rally speech: Which tactic did disability activists borrow from the 1950s–60s civil rights movement? How were they alike?",
      bank: ["🪑 504 sit-in", "🛑 Denver bus blockade", "🍽️ Greensboro sit-in", "🚌 Montgomery boycott"],
      stem: "The ___ was like the ___ because both ___.", min: 70, newWords: 5,
      mustAll: [["sit", "crawl", "bus", "adapt", "504", "block", "denver", "san francisco", "federal"], ["greensboro", "montgomery", "boycott", "march", "selma", "lunch", "king", "parks", "civil rights", "freedom ride"], ["because", "since", "both"]],
      mustMsg: "Speech: name a disability rights tactic AND an earlier protest (like Greensboro or Montgomery), then say how they were alike." },
    { id: "virtue", short: "Civic virtue in the movement",
      label: "2. 🏅 Courage award: Nominate one person or group from today. How did they act for the common good?",
      bank: ["👩‍🏫 Judy Heumann", "🍲 Black Panther Party", "🧒 Jennifer Keelan", "🛑 the Denver 19"],
      stem: "I nominate ___ because they ___. This helped ___.", min: 70, newWords: 5,
      mustAll: [["heumann", "judy", "keelan", "jennifer", "panther", "denver", "adapt", "crawl", "504", "sit", "protester", "activist", "union", "church"], ["because", "since", "help", "so "]],
      mustMsg: "Award: name a real person or group from today AND explain how they helped others (use “because”)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: { press: 0, sup: 0 }, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false });
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

  const missedChecks = () => CHECKS.filter(c => st.wrong[c.id]).length;
  const pressNow = () => clamp(START.press + (st.fx.press || 0));
  const supNow = () => clamp(START.sup + (st.fx.sup || 0) - missedChecks());
  const partDone = i => STEPS.filter(s => s.p === i && (s.type === "check" || s.type === "event")).every(s => s.type === "check" ? st.done[s.id] : st.picks[s.id] != null);

  // ---------------- HUD ----------------
  const mood = v => v >= 8 ? ["😰", "Sweating"] : v >= 6 ? ["😬", "Nervous"] : v >= 4 ? ["😐", "Shrugging"] : ["😴", "Ignoring you"];
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const p = pressNow(), s = supNow();
    $("pressFill").style.width = p * 10 + "%"; $("pressNum").textContent = p + "/10";
    $("supFill").style.width = s * 10 + "%"; $("supNum").textContent = s + "/10";
    const m = mood(p); $("oMood").textContent = m[0]; $("oSay").textContent = m[1];
    $("youName").textContent = st.name;
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("parts").innerHTML = PARTS.map((r, i) => `<span class="${partDone(i) ? "won" : i === step.p ? "now" : ""}">${partDone(i) ? "✓" : r.icon} ${r.tag}</span>`).join("");
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
  const snap = () => ({ p: pressNow(), s: supNow() });
  function moved(before) {
    hud();
    const p = pressNow(), s = supNow();
    bump("mPress", p - before.p); bump("mSup", s - before.s);
    if (p !== before.p) { const b = $("offBox"); b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); }
    paintRoad(); paintCrowd();
  }
  function fxChips(fx) {
    const out = [];
    out.push(`<span class="fx ${fx.press > 0 ? "g" : ""}">📣 ${fx.press > 0 ? "+" + fx.press : "0"}</span>`);
    if (fx.sup) out.push(`<span class="fx ${fx.sup > 0 ? "g" : "b"}">🤝 ${fx.sup > 0 ? "+" : "−"}${Math.abs(fx.sup)}</span>`);
    return out.join("");
  }
  const fxPlain = fx => "(📣 " + (fx.press > 0 ? "+" + fx.press : "0") + (fx.sup ? " 🤝 " + (fx.sup > 0 ? "+" : "−") + Math.abs(fx.sup) : "") + ")";
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- The board: road to the ADA + supporters ----------------
  const STOPS = [["✍️", "1977", "Rules"], ["🚌", "1978", "Lifts"], ["📜", "1990", "ADA"], ["⚖️", "Today", "Still"]];
  function stopLit(i) {
    if (i === 2) return st.step >= STEPS.findIndex(s => s.id === "end");
    const s = STEPS.find(x => x.stop === i);
    return s.type === "event" ? st.picks[s.id] != null : !!st.done[s.id];
  }
  function roadHtml() {
    return `<div class="road" id="road" aria-label="Road to the ADA">${STOPS.map((s, i) => `<span class="stop${stopLit(i) ? " lit" : ""}"><i aria-hidden="true">${stopLit(i) ? s[0] : "·"}</i><b>${s[1]}</b><small>${s[2]}</small></span>`).join(`<span class="dash" aria-hidden="true"></span>`)}</div>`;
  }
  const FACES = ["🧑‍🦽", "👩🏾", "🧑🏻‍🦯", "👨🏿", "🧏🏽‍♀️", "👩🏼‍🦽", "🧑🏽", "👴🏻", "🧕🏾", "🧑🏼‍🦼"];
  function crowdHtml() {
    const n = supNow();
    return `<div class="crowd" id="crowd" aria-label="Supporters: ${n} of 10"><span class="cl">🤝 Supporters</span><span class="ppl">${FACES.map((f, i) => `<span class="${i < n ? "in" : ""}">${i < n ? f : "·"}</span>`).join("")}</span></div>`;
  }
  function paintRoad() { const w = $("road"); if (w) w.outerHTML = roadHtml(); }
  function paintCrowd() { const c = $("crowd"); if (c) c.outerHTML = crowdHtml(); }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml) {
    const P = PARTS[step.p];
    const off = ["verdict", "write"].includes(step.type);
    const top = off ? "" : `<div class="partsign"><span>${P.icon}</span>${esc(P.name)}</div>`;
    const termsBtn = off ? "" : `<button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Word help</button>`;
    app.innerHTML = `<div class="board"><div class="scene${top ? "" : " notop"}" id="scene">${top}<p class="kick">${esc(step.kicker)}</p>${sceneHtml}${roadHtml() + crowdHtml()}</div>
      <div class="play" id="play">${termsBtn ? `<div class="ptop">${termsBtn}</div>` : ""}<div id="termsBox"></div>${playHtml}</div></div>`;
    if ($("termsBtn")) $("termsBtn").onclick = () => {
      const box = $("termsBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="terms">${P.terms.map(t => `<p><b>${t[0]}</b>: ${t[1]}</p>`).join("")}</div>`;
      $("termsBtn").setAttribute("aria-expanded", String(!open));
    };
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "verdict") return "🗳️ See the vote ▶";
    if (nx.type === "write") return "✏️ Write your speech ▶";
    if (nx.p !== step.p) return "Next: " + PARTS[nx.p].icon + " Part " + (nx.p + 1) + " ▶";
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
        ${capitol(false)}
        <div class="tbanner">ACCESS NOW</div>
        ${say("📣 Your crew", "Stairs, no lifts, no jobs. We're done waiting.")}
      </div>
      <div class="tcopy">
        <p class="tk">U.S. History · Unit 6 · Day 2 · Organizer</p>
        <h1>The Fight for Access</h1>
        <p class="hook">1970: millions of Americans can't ride a bus, enter a courthouse, or get hired. You're going to change that.</p>
        <ul class="how"><li><span>🔍</span>Check the real history</li><li><span>📣</span>Pick your tactics</li><li><span>📜</span>Win the law</li></ul>
        <p class="tchips"><span>⏱️ 15–20 min</span><span>🔍 7 checks</span><span>📣 3 tactics</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Join the movement ▶</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">Every person and event is real. Standards: SS.9-12.US.51, US.56.</p>
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
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());   // Test T. (teacher): no lockouts / writing rules
  const lockLeft = () => isTestT() ? 0 : Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check ----
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
    const before = snap();
    if (o.n === 0) {
      btn.classList.add("right");
      st.done[step.id] = true; save(); moved(before);
      try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
      setTimeout(() => solved(step, false), 450);
      return;
    }
    btn.classList.add("wrong");
    const why = (step.miss && step.miss[o.n - 1]) || step.hint;
    const first = !st.wrong[step.id];
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    const lockSecs = isTestT() ? 0 : LOCK;
    st.lockUntil = Date.now() + lockSecs * 1000; st.lockMsg = why;
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    if (first) stamp("MIXED MESSAGE", "bad");
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why + (first ? " (🤝 −1)" : ""), $("qmsg"), () => draw(step), lockSecs);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Got it</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Event: a tactic call ----
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><span class="dl">${esc(c.line)}</span><span class="fxrow">${fxChips(c.fx)}</span></button>`; }).join("")}</div>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      const before = snap();
      st.picks[step.id] = i;
      st.fx.press += c.fx.press || 0; st.fx.sup += c.fx.sup || 0;
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span>${esc(c.t)}</span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${esc(c.res)}</p>`;
    if (!quiet) stamp(c.stamp, c.fx.press >= 3 ? "" : "bad");
    addNext(step, step.reveal, quiet);
  }

  // ---- Endings ----
  function ending() {
    // The ending is locked the first time the vote screen shows (Part 3 guesses still move the 🤝 meter).
    const snapE = st.endSnap || { p: pressNow(), s: supNow(), miss: missedChecks() > 0 };
    const p = snapE.p, s = snapE.s;
    let e;
    if (p >= GOAL.press && s >= GOAL.sup) e = { key: "Unstoppable", icon: "🏆", cls: "best", text: "Leaders feel the heat, and the country is with you. The ADA passes." };
    else if (p >= GOAL.press) e = { key: "Loud but Alone", icon: "📢", cls: "mid", text: "Leaders feel the heat, but few people back you. The real movement won with allies: Panthers, unions, churches." };
    else if (s >= GOAL.sup) e = { key: "Liked but Ignored", icon: "🙂", cls: "mid", text: "People like you. Leaders don't have to act. Real activists refused to go home." };
    else e = { key: "Stalled", icon: "🧱", cls: "low", text: "Little pressure, few backers. The bill sits. Real activists pushed for 20 years to win it." };
    const causes = EVENTS.filter(x => st.picks[x.id] != null).map(x => { const k = x.cards[st.picks[x.id]]; return k.cause + " " + fxPlain(k.fx); });
    causes.push(snapE.miss ? "Some wrong guesses (🤝 down)" : "Got the facts right (🤝 kept)");
    e.causes = causes;
    e.out = e.key + " (📣 " + p + "/10 · 🤝 " + s + "/10)";
    return e;
  }
  function verdict(step) {
    if (!st.endSnap) { st.endSnap = { p: pressNow(), s: supNow(), miss: missedChecks() > 0 }; save(); }
    const e = ending();
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>
      <div class="quote">“Let the shameful wall of exclusion finally come tumbling down.”${src("President George H.W. Bush, signing the real ADA, July 26, 1990")}</div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">📣 Pressure ${st.endSnap.p}/10 · 🤝 Supporters ${st.endSnap.s}/10</p><p class="goalnote">Best ending needs 📣 ${GOAL.press}+ and 🤝 ${GOAL.sup}+.</p></div><div id="after"></div>`);
    stamp(e.key.toUpperCase(), (e.cls === "best" ? "" : "bad") + " huge");
    const a = $("after"); a.appendChild(nextBtn(step));
    $("nextBtn").textContent = "Next: 📜 Part 3 · After the win ▶";
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="clip"><p class="cbh">📣 Last job: the anniversary rally</p><p><b>Your movement:</b> ${e.icon} ${esc(e.key)}</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: explain WHY that tactic pushed leaders to act.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Give the speech + turn in ▶"}</button>
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
    for (const p of (isTestT() ? [] : PROMPTS)) {   // Test T. (teacher) skips the writing rules
      const box = $("w_" + p.id), v = (box.value || "").trim(), n = PROMPTS.indexOf(p) + 1;
      const bad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today's game" });
        if (junk) { msg.textContent = "For answer " + n + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return bad("Write a little more on answer " + n + " (1–2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words on answer " + n + ".");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas on answer " + n + ". Use a fact from today.");
      if (p.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return bad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort((a, b) => parseFloat(a.split(".")[1]) - parseFloat(b.split(".")[1])).map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    STEPS.forEach(s => {
      if (s.type === "event" && st.picks[s.id] != null) answers["Choice · " + s.short] = s.cards[st.picks[s.id]].t;
      if (s.type === "check") {
        const w = st.wrong[s.id];
        answers[s.std + " · " + s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work."; msg.className = "msg good";
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
    document.body.dataset.step = step.id; document.body.dataset.p = step.p;
    if (step.type === "check") return check(step);
    if (step.type === "event") return event(step);
    if (step.type === "verdict") return verdict(step);
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
      go: i => {
        if (!st.name) st.name = "Test T.";
        if (STEPS[i] && STEPS[i].type === "verdict") delete st.endSnap;   // re-figure the ending from what's been picked so far
        st.step = i; st.lockUntil = 0; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const s = STEPS[Math.max(0, Math.min(st.step, TOTAL - 1))]; if (!s) return;
        if (s.type === "check" && !st.done[s.id]) { st.done[s.id] = true; st.lockUntil = 0; save(); render(); }
        else if (s.type === "event" && st.picks[s.id] == null) { const b = document.querySelector("#dbox .dcard"); if (b) b.click(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
