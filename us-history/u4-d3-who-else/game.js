// =====================================================================
//  BUILD THE EXHIBIT: WHO ELSE FOUGHT?  (U.S. History Unit 4 · Day 3)
//  You're the curator of a new museum exhibit. Three rooms:
//    Room 1 Farmworkers & the Chicano Movement · Room 2 Red Power · Room 3 Asian American activists
//  then a Comparison Wall. Each solved check hangs an item on the wall.
//  Two meters: 🎯 Accuracy (wrong tries put a wrong label up: −5) and 👥 Visitors.
//  Director Halvorsen wants crowds; the curator calls trade crowds against accuracy.
//  7 checks (Fynn 11/3: ~7 max; every day goal gets one), 3 curator calls, 4 opening-day endings,
//  ⚡ Lightning Round (day before the Unit 4 test): 7 one-tap questions on the other Day 3 slide
//  topics + Days 1–2 (recorded as checks; they don't move the meters), 2 writing answers.
//  Same assignmentId as the old engine version. Turn-in via shared/turnin.js.
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u4-d3-who-else-v2";
  const ASSIGNMENT_ID = "ush-u4-d3-who-else";
  const TITLE = "U.S. History · Unit 4 · Day 3 · Build the Exhibit: Who Else Fought?";
  const STANDARD = "SS.9-12.US.42, SS.9-12.US.44";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;            // seconds locked after a wrong answer
  const LR_LOCK = 4;         // shorter lock in the fast round
  const START = { acc: 40, vis: 40 };
  const RIGHT_ACC = 6;       // each item hung on the wall
  const WRONG_ACC = 5;       // each wrong label that went up
  const GOAL = { acc: 80, vis: 60 };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const art = (tab, inner, cite) => `<div class="frame"><div class="art">${inner}</div><div class="placard"><span>${tab}</span></div>${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (who, t, cls) => `<div class="say ${cls || ""}"><span class="who-s">${who}</span>${t}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;

  // ---------------- Rooms ----------------
  const ROOMS = [
    { icon: "🍇", tag: "Farmworkers", name: "Room 1 · Farmworkers & the Chicano Movement",
      terms: [["Boycott", "refusing to buy something to pressure a business"], ["Strike", "workers refuse to work until things change"], ["Chicano", "a name Mexican American activists used with pride"]] },
    { icon: "🪶", tag: "Red Power", name: "Room 2 · Red Power",
      terms: [["Treaty", "an official agreement between nations"], ["Sovereignty", "a nation's right to govern itself"], ["Occupation", "taking over a place and staying there"]] },
    { icon: "📜", tag: "Asian Americans", name: "Room 3 · Asian American Activists",
      terms: [["Incarceration", "being locked up; WWII camps held 120,000+ Japanese Americans"], ["Redress", "making up for a wrong: an apology or payment"]] },
    { icon: "⚖️", tag: "Compare", name: "The Comparison Wall",
      terms: [["Black civil rights movement", "ended legal segregation, won the 1964 and 1965 laws"], ["Sovereignty", "a nation's right to govern itself"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] explains options[i+1]. item = icon hung on the wall when solved.
  // event: a curator call. fx moves acc (Accuracy) and vis (Visitors).
  const STEPS = [
    // ===== Room 1 =====
    { id: "r1", type: "check", r: 0, std: "US.44", item: "📣", kicker: "Item 1 · A flyer, late 1960s", short: "Grape boycott: lost sales pushed growers", stamp: "ON THE WALL",
      scene: () => art("United Farm Workers flyer", `<p class="poster">DON'T BUY<br>GRAPES! 🍇🚫</p>`, "Delano, California. The grape strike began in 1965.") + ln("💵", "Pickers earned about $1.25 an hour.") + ln("🚽", "No toilets in the fields."),
      ask: "How was the boycott supposed to help the workers?",
      options: ["Lost sales would push growers to deal", "A court would ban grapes from stores", "Higher grape prices would raise pay", "Growers would sell the farms to workers"],
      miss: ["A boycott is shoppers, not courts.", "Nobody buying means less money, not higher prices.", "The goal was a union contract, not owning farms."],
      hint: "What happens to a grower when nobody buys grapes?",
      reveal: "<b>Boycott</b>: millions stopped buying. Growers signed contracts in 1970." },

    { id: "e1", type: "event", r: 0, kicker: "Curator call · The spotlight", short: "Room 1 spotlight",
      scene: () => say("Director Halvorsen", "“Crowds love one hero. Put a Chávez statue up front.”", "boss") + art("Union leaders", ln("🧑🏽", "César Chávez") + ln("👩🏽", "Dolores Huerta") + ln("🧑🏻", "Larry Itliong: his Filipino crews struck first")),
      ask: "What goes in the spotlight?",
      cards: [
        { icon: "🗿", t: "Chávez statue", line: "One hero. Big crowds.", fx: { vis: 30, acc: -15 }, res: "Crowds love it. Huerta and Itliong vanish.", cause: "Chávez-only statue" },
        { icon: "🎨", t: "Three-leader mural", line: "Shows who really did it.", fx: { vis: 10, acc: 10 }, res: "Visitors see Mexican and Filipino Americans won together.", cause: "Three-leader mural" },
        { icon: "✍️", t: "Boycott pledge wall", line: "Visitors sign, like 1960s shoppers.", fx: { vis: 20, acc: 5 }, res: "Kids line up to sign. No leaders shown.", cause: "Boycott pledge wall" }
      ],
      reveal: "<b>Many leaders</b> + millions of shoppers won it." },

    { id: "r2", type: "check", r: 0, std: "US.42", item: "🏫", kicker: "Item 2 · East Los Angeles, March 1968", short: "1968 walkouts: discrimination in schools", stamp: "ON THE WALL",
      scene: () => art("Walkout: thousands of students leave class", `<p class="big">🎒🚶🏽‍♀️🚶🏽🚶🏽‍♂️</p>`) + `<div class="list"><p class="lh">Their complaints</p>${ln("🤐", "Punished for speaking Spanish")}${ln("👩‍🏫", "Very few Mexican American teachers")}${ln("🧹", "Pushed toward low-pay jobs, not college")}</div>`,
      ask: "What were the students protesting?",
      options: ["Unfair treatment in their schools", "Too many classes taught in Spanish", "Cuts to sports and school clubs", "A new test needed to graduate"],
      miss: ["Reread: they were punished FOR speaking Spanish.", "Nothing on the list is about sports.", "Nothing on the list is about a test."],
      hint: "Reread the list of complaints.",
      reveal: "<b>Chicano Movement</b>: civil rights included language and culture too." },

    // ===== Room 2 =====
    { id: "n1", type: "check", r: 1, std: "US.44", item: "🪧", kicker: "Item 3 · Protest sign, early 1970s", short: "Red Power: keep treaty promises", stamp: "ON THE WALL",
      scene: () => art("Protest sign", `<p class="poster">HONOR THE<br>TREATIES</p>`) + ln("📜", "The U.S. signed hundreds of treaties with Native nations.") + ln("💔", "It broke many. Native nations lost land."),
      ask: "What were Red Power activists asking for?",
      options: ["The U.S. to keep its treaty promises", "Tribal governments to be shut down", "Native families to move to big cities", "New treaties to end the old ones"],
      miss: ["That's what the U.S. tried in the 1950s. Activists fought it.", "The U.S. pushed that in the 1950s. Activists fought it.", "“Honor” means keep them, not end them."],
      hint: "A treaty is a promise between nations. What does “honor” mean?",
      reveal: "<b>Sovereignty</b>: a nation's right to govern itself." },

    { id: "n2", type: "check", r: 1, std: "US.44", item: "🏝️", kicker: "Item 4 · Alcatraz Island, 1969–1971", short: "Alcatraz = occupation", stamp: "ON THE WALL",
      scene: () => art("San Francisco Bay", `<p class="big">🏝️⛺🪶</p><p class="cap">Nov. 1969 → June 1971: 19 months</p>`) + ln("👥", "<b>Indians of All Tribes</b>, mostly Native students") + ln("🏚️", "Took over the empty prison and stayed."),
      ask: "What tactic is this?",
      options: ["An occupation", "A boycott", "A lawsuit", "A strike"],
      miss: ["A boycott means not buying. They moved in.", "No court. They took over the island.", "A strike means refusing to work. They took over a place."],
      hint: "They took over a place and stayed there.",
      reveal: "<b>Occupation</b>: taking over a place and staying, to make a point." },

    { id: "e2", type: "event", r: 1, kicker: "Curator call · Gus's label", short: "Alcatraz label",
      scene: () => say("Gus, volunteer", "“Label's up! We open in an hour.”", "gus") + `<div class="label-card"><p class="lt">Gus's label</p><p>“In 1969, the American Indian Movement (AIM) took over Alcatraz.”</p></div>`,
      ask: "Check Item 4. What do you do?",
      cards: [
        { icon: "✏️", t: "Fix it", line: "Opening runs late.", fx: { vis: -10, acc: 15 }, res: "Doors open late. The label is right.", cause: "Fixed Gus's label" },
        { icon: "📌", t: "Hang it as is", line: "Open on time.", fx: { vis: 10, acc: -15 }, res: "Opens on time. A visitor emails: “Wrong group.”", cause: "Hung the wrong label" },
        { icon: "🫥", t: "Leave it blank", line: "No mistake. No story.", fx: { vis: -5, acc: 0 }, res: "No mistake, but no Alcatraz story.", cause: "Left Alcatraz blank" }
      ],
      reveal: "Alcatraz: <b>Indians of All Tribes</b>. AIM led Wounded Knee, 1973." },

    // ===== Room 3 =====
    { id: "a1", type: "check", r: 2, std: "US.42", item: "✉️", kicker: "Item 5 · Civil Liberties Act, 1988", short: "Redress: pushed Congress, won apology + $20,000", stamp: "ON THE WALL",
      scene: () => ln("⛓️", "WWII: 120,000+ Japanese Americans forced into camps. Most were citizens.") + art("Payment + apology, 1990", `<div class="check"><span>PAY TO: each camp survivor</span><b>$20,000</b><span>U.S. Treasury · 1990</span></div>`, "Congress passed it in 1988. President Reagan signed it."),
      ask: "What tactic won this?",
      options: ["Pushing Congress for redress", "A boycott of American stores", "Occupying a government building", "A long work strike"],
      miss: ["No boycott. Look at who passed the law.", "That's Alcatraz. Who passed this law?", "No strike. Activists testified and lobbied."],
      hint: "An “Act” is a law. Who passes laws?",
      reveal: "<b>Redress</b>: making up for a wrong. Activists pushed Congress for years." },

    { id: "a2", type: "check", r: 2, std: "US.42", item: "📰", kicker: "Item 6 · Detroit, 1982 · ⚠️ Heads up: a violent crime", short: "Vincent Chin: no jail time sparked organizing", stamp: "ON THE WALL",
      scene: () => `<div class="paper"><p class="mast">CASE FILE · DETROIT · 1982–83</p><p class="hl">Vincent Chin</p><p>Two autoworkers beat Chinese American Vincent Chin to death. They blamed Japan for lost car jobs.</p><p class="sent-box">Sentence: probation (no jail) + $3,000 fine</p></div>`,
      ask: "Why did Asian Americans nationwide organize?",
      options: ["The sentence made his life seem worth less", "Detroit car plants were laying off workers", "The judge gave the killers long prison terms", "Japan's car companies asked them to protest"],
      miss: ["Layoffs were the killers' excuse, not the protest.", "Reread the sentence box: no jail.", "Nothing here says that. Look at the sentence."],
      hint: "Compare the crime with the punishment.",
      reveal: "Groups formed to demand <b>equal justice</b>." },

    // ===== Comparison Wall =====
    { id: "e3", type: "event", r: 3, kicker: "Curator call · The big headline", short: "Comparison wall headline",
      scene: () => say("Director Halvorsen", "“Our sponsor wants: ‘They all won!’”", "boss") + art("Results", ln("🍇", "Contracts, 1970") + ln("🪶", "More tribal control, 1975") + ln("📜", "Apology + payment, 1988") + ln("⏳", "Some fights still go on")),
      ask: "What's the headline?",
      cards: [
        { icon: "🎉", t: "“They all won!”", line: "Happy sponsor.", fx: { vis: 20, acc: -15 }, res: "Upbeat, but no movement won everything.", cause: "“They all won!” headline" },
        { icon: "⚖️", t: "“Real wins. Unfinished work.”", line: "True, less exciting.", fx: { vis: 0, acc: 10 }, res: "Accurate. Some call it a downer.", cause: "“Real wins, unfinished work”" },
        { icon: "🗳️", t: "Visitor vote wall", line: "“Which changed the most?”", fx: { vis: 20, acc: 0 }, res: "Visitors argue and vote. No facts posted.", cause: "Visitor vote wall" }
      ],
      reveal: "Change was real, but <b>slow and hard-won</b>." },

    { id: "c1", type: "check", r: 3, std: "US.44", item: "⭕", kicker: "Item 7 · The Venn diagram", short: "Difference: treaties/sovereignty (Red Power only)", stamp: "WALL DONE",
      scene: () => `<div class="venn" aria-label="Venn diagram"><div class="vl"><b>Black civil rights only</b>🚌 🗳️</div><div class="vm" title="Both">⚖️</div><div class="vr"><b>Red Power only</b>🪶 <span class="q">❓</span></div></div>`,
      ask: "Which goal goes ONLY in the Red Power circle?",
      options: ["Getting broken treaties honored", "Equal treatment under the law", "Ending unfair treatment by race", "Protecting the right to vote"],
      miss: ["Both wanted that. It goes in the middle.", "Both fought that. It goes in the middle.", "That was a big Black civil rights goal (1965)."],
      hint: "Which goal is about promises between nations?",
      reveal: "Tribes are <b>nations</b>, so Red Power also fought for <b>sovereignty</b>." },

    { id: "verdict", type: "verdict", r: 3, kicker: "Opening day" },
    { id: "lightning", type: "lightning", r: 3, kicker: "After hours · Lightning round" },
    { id: "write", type: "write", r: 3, kicker: "Write the plaques" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const EVENTS = STEPS.filter(s => s.type === "event");

  // ---------------- ⚡ Lightning round (the rest of the Day 3 slides + Days 1–2, for Thursday's test) ----------------
  const LR = [
    { id: "lr1", std: "US.44", short: "Malcolm X: right to self-defense",
      ev: "✊ Dr. King and Malcolm X both wanted equality. Malcolm X: “by any means necessary.”",
      ask: "Which idea was Malcolm X's?",
      options: ["A right to self-defense", "Nonviolence, no matter what", "Wait for the courts to act", "Only use lunch-counter sit-ins"],
      miss: ["That was Dr. King's way.", "King refused to wait. Malcolm X did too.", "Sit-ins were nonviolent. Malcolm X backed self-defense."],
      reveal: "<b>Black Power</b>: Black pride and control of Black neighborhoods." },
    { id: "lr2", std: "US.42", short: "Title IX: opened school sports to girls",
      ev: "🏀 1972 · Title IX bans sex discrimination in schools that get federal money.",
      ask: "What did it open up for girls?",
      options: ["School sports teams", "The right to vote", "Jobs in car factories", "Seats on city buses"],
      miss: ["Women won the vote in 1920.", "Title IX is about schools.", "Buses: that was Montgomery, 1956."],
      reveal: "<b>Title IX</b> came out of the <b>women's movement</b>." },
    { id: "lr3", std: "US.42", short: "STOP ERA: Schlafly said it hurt homemakers",
      ev: "🛑 The ERA: no denying rights because of sex. Phyllis Schlafly led STOP ERA.",
      ask: "Why did Schlafly oppose it?",
      options: ["She said it would hurt homemakers", "She said it gave women too few rights", "She wanted it to cover voting only", "She said it would raise taxes"],
      miss: ["She said it went too far, not too little.", "Voting wasn't her issue. Think homemakers.", "Taxes weren't her argument. Think homemakers."],
      reveal: "<b>STOP ERA</b> was pushback. The ERA fell short of 38 states." },
    { id: "lr4", std: "US.42", short: "1977 disability sit-in: rules enforced",
      ev: "♿ 1977 · The government ignored a 1973 disability-rights law. Protesters sat in a federal building for almost a month.",
      ask: "What did they win?",
      options: ["The rules finally took effect", "A new amendment to the Constitution", "Free buses in every U.S. city", "Nothing. The sit-in failed."],
      miss: ["No amendment. The 1973 rules finally took effect.", "No. The government enforced the 1973 rules.", "It worked. The rules took effect."],
      reveal: "It led later to the <b>Americans with Disabilities Act</b> (1990)." },
    { id: "lr5", std: "US.42", short: "1975 law: tribes control their programs",
      ev: "🪶 1975 · After Alcatraz, Congress passes a law about tribal schools and programs.",
      ask: "What did it give tribes?",
      options: ["Control of their own programs", "All of their old land back", "An end to all treaties with the U.S.", "Their own seats in the Senate"],
      miss: ["Not all land. More control of programs.", "Red Power wanted treaties HONORED.", "No. It was about running schools and programs."],
      reveal: "<b>Self-determination</b>: tribes make more of their own choices." },
    { id: "lr6", std: "US.42", short: "Brown v. Board: school segregation unconstitutional",
      ev: "⚖️ Day 1 · 1954 · Brown v. Board of Education. The Supreme Court votes 9–0.",
      ask: "What did it decide?",
      options: ["Segregated schools are illegal", "“Separate but equal” schools are legal", "States can choose to keep segregation", "Literacy tests are banned"],
      miss: ["That was 1896. Brown overturned it.", "No. 9–0: segregated schools break the Constitution.", "That was the Voting Rights Act, 1965."],
      reveal: "<b>Brown v. Board</b> ended legal school segregation." },
    { id: "lr7", std: "US.42", short: "Voting Rights Act ended literacy tests",
      ev: "🗳️ Day 2 · 1965 · TV shows Bloody Sunday in Selma. That summer, Congress acts.",
      ask: "Which law stopped literacy tests?",
      options: ["Voting Rights Act", "Civil Rights Act", "Civil Liberties Act", "Title IX"],
      miss: ["1964: it banned segregation in public places.", "1988: that's redress for Japanese Americans.", "1972: that's about schools."],
      reveal: "<b>Voting Rights Act</b>: Black voting in the South rose fast." }
  ];

  const PROMPTS = [
    { id: "venn", short: "Compare one movement to Black civil rights", label: "1. Plaque: Pick ONE movement from today. How was it LIKE the Black civil rights movement? How was it DIFFERENT?",
      bank: ["🍇 farmworkers", "🪶 Red Power", "📜 Japanese American redress", "📰 Vincent Chin"],
      stem: "The ___ movement was like the Black civil rights movement because ___. It was different because ___.", min: 90, newWords: 6,
      mustAll: [["similar", "same", "both", "like", "also"], ["different", "but", "unlike", "while", "however"]],
      mustMsg: "In answer 1, include one way they were the SAME and one way they were DIFFERENT." },
    { id: "tactic", short: "Best tactic with evidence", label: "2. Tour guide pick: Which tactic worked best? Use a fact from the exhibit.",
      bank: ["🍇 grape boycott", "🏝️ Alcatraz occupation", "📜 pushing Congress for redress"],
      stem: "I think ___ worked best because ___.", min: 60, newWords: 5,
      mustAll: [["boycott", "grape", "occup", "alcatraz", "redress", "congress", "apolog"], ["because", "since"]],
      mustMsg: "In answer 2, name a tactic AND explain why with a fact (use “because”)." }
  ];

  // ---------------- State ----------------
  const freshLR = () => ({ done: {}, wrong: {}, streak: 0, best: 0 });
  const fresh = () => ({ name: "", step: -1, fx: { acc: 0, vis: 0 }, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false, lr: freshLR() });
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

  const wrongN = () => CHECKS.reduce((a, c) => a + (st.wrong[c.id] || 0), 0);
  const accNow = () => Math.max(0, Math.min(100, START.acc + RIGHT_ACC * CHECKS.filter(c => st.done[c.id]).length - WRONG_ACC * wrongN() + (st.fx.acc || 0)));
  const visNow = () => Math.max(0, Math.min(100, START.vis + (st.fx.vis || 0)));
  const roomDone = i => CHECKS.filter(c => c.r === i).every(c => st.done[c.id]);

  // ---------------- HUD ----------------
  const bossMood = v => v >= 70 ? "😄" : v >= 50 ? "🙂" : v >= 35 ? "😐" : "😟";
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const a = accNow(), v = visNow();
    $("accFill").style.width = a + "%"; $("accNum").textContent = a + "%";
    $("visFill").style.width = v + "%"; $("visNum").textContent = v + "%";
    $("bMood").textContent = bossMood(v);
    $("youName").textContent = st.name;
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    const off = ["verdict", "lightning", "write"].includes(step.type);
    $("rooms").innerHTML = ROOMS.map((r, i) => `<span class="${roomDone(i) ? "won" : i === step.r && !off ? "now" : ""}">${roomDone(i) ? "✓" : r.icon} ${r.tag}</span>`).join("");
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
  const snap = () => ({ a: accNow(), v: visNow() });
  function moved(before) {
    hud();
    const a = accNow(), v = visNow();
    bump("mAcc", a - before.a); bump("mVis", v - before.v);
    if (v !== before.v) { const b = $("bossBox"); b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); }
    paintWall(); paintCrowd();
  }
  function fxChips(fx) {
    const out = [];
    if (fx.acc) out.push(`<span class="fx ${fx.acc > 0 ? "g" : "b"}">🎯 ${fx.acc > 0 ? "+" : "−"}${Math.abs(fx.acc)}</span>`);
    if (fx.vis) out.push(`<span class="fx ${fx.vis > 0 ? "g" : "b"}">👥 ${fx.vis > 0 ? "+" : "−"}${Math.abs(fx.vis)}</span>`);
    if (!fx.acc && !fx.vis) out.push(`<span class="fx">no change</span>`);
    return out.join("");
  }
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- The board: room strip + crowd ----------------
  function wallHtml() {
    return `<div class="wall" id="wall" aria-label="Your exhibit so far">${ROOMS.map((r, i) => {
      const cs = CHECKS.filter(c => c.r === i);
      return `<div class="wroom${roomDone(i) ? " full" : ""}"><span class="wr">${r.icon} ${i < 3 ? "Room " + (i + 1) : "Wall"}</span><span class="slots">${cs.map(c => `<span class="slot${st.done[c.id] ? " hung" : ""}">${st.done[c.id] ? c.item : ""}</span>`).join("")}</span></div>`;
    }).join("")}</div>`;
  }
  function crowdHtml() {
    const n = Math.round(visNow() / 10);
    return `<div class="crowd" id="crowd" aria-label="Visitors: ${visNow()}%"><span class="cl">👥 Visitors in line</span><span class="ppl">${Array.from({ length: 10 }, (_, i) => `<span class="${i < n ? "in" : ""}">${i < n ? ["🧑🏽", "👩🏻", "🧑🏿", "👨🏼", "👩🏾", "🧒🏻", "👵🏽", "🧑🏻", "👩🏽", "👨🏿"][i] : "·"}</span>`).join("")}</span></div>`;
  }
  function paintWall() { const w = $("wall"); if (w) w.outerHTML = wallHtml(); }
  function paintCrowd() { const c = $("crowd"); if (c) c.outerHTML = crowdHtml(); }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml) {
    const R = ROOMS[step.r];
    const off = ["verdict", "lightning", "write"].includes(step.type);
    const top = off ? "" : `<div class="roomsign"><span>${R.icon}</span>${esc(R.name)}</div>`;
    const termsBtn = off ? "" : `<button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Word help</button>`;
    app.innerHTML = `<div class="board"><div class="scene${top ? "" : " noroom"}" id="scene">${top}<p class="kick">${esc(step.kicker)}</p>${sceneHtml}${step.type === "lightning" ? "" : wallHtml() + crowdHtml()}</div>
      <div class="play" id="play">${termsBtn ? `<div class="ptop">${termsBtn}</div>` : ""}<div id="termsBox"></div>${playHtml}</div></div>`;
    if ($("termsBtn")) $("termsBtn").onclick = () => {
      const box = $("termsBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="terms">${R.terms.map(t => `<p><b>${t[0]}</b>: ${t[1]}</p>`).join("")}</div>`;
      $("termsBtn").setAttribute("aria-expanded", String(!open));
    };
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "verdict") return "🏛️ Open the doors ▶";
    if (nx.r !== step.r) return "Next: " + ROOMS[nx.r].icon + " " + (nx.r < 3 ? "Room " + (nx.r + 1) : "Comparison Wall") + " ▶";
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
        <div class="facade"><div class="pediment">HISTORY MUSEUM</div><div class="banner">WHO ELSE FOUGHT?<small>Opening Friday</small></div><div class="cols"><span></span><span></span><span></span><span></span><span></span></div>
        <div class="doors"><div>🍇<small>Room 1</small></div><div>🪶<small>Room 2</small></div><div>📜<small>Room 3</small></div></div></div>
        ${say("Director Halvorsen", "“Three empty rooms. Fill them by Friday.”", "boss")}
      </div>
      <div class="tcopy">
        <p class="tk">U.S. History · Unit 4 · Day 3 · Museum job</p>
        <h1>Build the Exhibit</h1>
        <p class="hook">Who else fought for equal rights?</p>
        <p class="tline">You're the curator. You decide what goes up.</p>
        <ul class="how"><li><span>🔍</span>Check each item</li><li><span>🖼️</span>Make curator calls</li><li><span>🏛️</span>Open the doors</li></ul>
        <p class="tline">🎯 Goal: how other groups fought, and how they compare.</p>
        <p class="tchips"><span>⏱️ 25 min</span><span>🔍 7 items</span><span>🖼️ 3 calls</span><span>⚡ Test-prep round</span><span>✏️ 2 plaques</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Get the keys 🔑</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The museum, Director Halvorsen, and Gus are made up. Every item and event is real. Standards: SS.9-12.US.42, US.44.</p>
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
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

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
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + LOCK * 1000; st.lockMsg = why;
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    stamp("WRONG LABEL", "bad");
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Label approved · ${step.item} on the wall</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp(roomDone(step.r) && step.r < 3 ? "ROOM DONE" : step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Event: a curator call ----
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
      st.fx.acc += c.fx.acc || 0; st.fx.vis += c.fx.vis || 0;
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span>${esc(c.t)}</span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${esc(c.res)}</p>`;
    if (!quiet) stamp((c.fx.acc || 0) < 0 ? "ACCURACY DOWN" : "APPROVED", (c.fx.acc || 0) < 0 ? "bad" : "");
    addNext(step, step.reveal, quiet);
  }

  // ---- ⚡ Lightning round ----
  const lrNext = () => LR.findIndex(q => !st.lr.done[q.id]);
  const streakTxt = k => k ? `🔥 <b>${k}</b> in a row` : "🔥 Start a streak!";
  const strip = h => String(h).replace(/<[^>]+>/g, "");
  function lrScene() {
    const n = lrNext(), k = st.lr.streak || 0;
    return `<div class="lrhead"><span class="bolt" aria-hidden="true">⚡</span><h2>Lightning Round</h2></div>
      ${say("Director Halvorsen", "“Test prep: the rest of the unit. Fast!”", "boss")}
      <div class="pips" id="lrPips" aria-label="Question ${n < 0 ? LR.length : n + 1} of ${LR.length}">${LR.map((q, i) => `<span class="${st.lr.done[q.id] ? "lit" : i === n ? "now" : ""}" aria-hidden="true">⚡</span>`).join("")}</div>
      <div class="streak${k >= 2 ? " hot" : ""}" id="lrStreak">${streakTxt(k)}</div>
      <div class="gallery" id="gallery" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<span style="animation-delay:${i * 0.06}s">🙂</span>`).join("")}</div>`;
  }
  function lightning(step) {
    shell(step, lrScene(), `<div id="lrPlay"></div><div id="after"></div>`);
    if (lrNext() < 0) return lrDone(step, true);
    lrCard(step, false);
    if (lockLeft() > 0 && st.lockLR === LR[lrNext()].id) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || "", $("qmsg"), () => lrOptions(step), Math.min(LR_LOCK, lockLeft())); }
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
    const why = (q.miss && q.miss[o.n - 1]) || "Look again.";
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
    $("lrPlay").innerHTML = `<div class="lrcard lrend${quiet ? "" : " flipin"}"><p class="big" aria-hidden="true">⚡🏆⚡</p><h3>Round cleared!</h3><p class="lrbest">🔥 Best streak: <b>${best}</b> in a row</p><p class="lrev">The whole unit, reviewed. Last job: the plaques.</p></div>`;
    const g = $("gallery"); if (g) g.querySelectorAll("span").forEach((s, i) => s.textContent = ["🙌", "👏", "🤩", "📣", "🥳"][i % 5]);
    if (!quiet) stamp("TEST READY", "huge stay");
    addNext(step, null, quiet);
    const b = $("nextBtn"); if (b) b.textContent = "✏️ Write the plaques ▶";
  }

  // ---- Endings ----
  function ending() {
    const a = accNow(), v = visNow();
    let e;
    if (a >= GOAL.acc && v >= GOAL.vis) e = { key: "Must-See Exhibit", out: "Must-See Exhibit (accurate + crowded)", icon: "🏆", cls: "best", text: "Lines out the door, and the labels hold up. Three schools book spring field trips." };
    else if (a >= GOAL.acc) e = { key: "Right but Quiet", out: "Right but Quiet (accurate, few visitors)", icon: "📚", cls: "mid", text: "Every label is right. But on weekends the rooms are half empty." };
    else if (v >= GOAL.vis) e = { key: "Packed but Wrong", out: "Packed but Wrong (crowded, label errors)", icon: "📰", cls: "mid", text: "Big crowds. Then the newspaper prints a historian's list of your mistakes." };
    else e = { key: "Closed for Fixes", out: "Closed for Fixes (errors + few visitors)", icon: "🔧", cls: "low", text: "Few visitors and wrong labels. The museum shuts the exhibit to redo it." };
    const causes = EVENTS.filter(s => st.picks[s.id] != null).map(s => { const k = s.cards[st.picks[s.id]]; return k.cause + " " + fxPlain(k.fx); });
    const w = wrongN();
    if (w) causes.push(w + " wrong " + (w === 1 ? "label" : "labels") + " (🎯 −" + w * WRONG_ACC + ")");
    else causes.push("No wrong labels");
    e.causes = causes;
    return e;
  }
  const fxPlain = fx => "(" + ([fx.acc ? "🎯 " + (fx.acc > 0 ? "+" : "−") + Math.abs(fx.acc) : "", fx.vis ? "👥 " + (fx.vis > 0 ? "+" : "−") + Math.abs(fx.vis) : ""].filter(Boolean).join(" ") || "no change") + ")";

  function verdict(step) {
    const e = ending();
    shell(step, `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">🎯 Accuracy ${accNow()}% · 👥 Visitors ${visNow()}%</p><p class="goalnote">Best opening needs 🎯 ${GOAL.acc}%+ and 👥 ${GOAL.vis}%+.</p></div><div id="after"></div>`);
    stamp(e.key.toUpperCase(), (e.cls === "best" ? "" : "bad") + " huge");
    const b = nextBtn(step); b.textContent = "⚡ Lightning round ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="clip"><p class="cbh">🏛️ Last job: two plaques</p><p><b>Opening day:</b> ${e.icon} ${esc(e.key)}</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: explain HOW the movement learned from the Black civil rights movement.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Hang the plaques + turn in ▶"}</button>
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
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from the exhibit" });
        if (junk) { msg.textContent = "For plaque " + (PROMPTS.indexOf(p) + 1) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return bad("Write a little more on plaque " + (PROMPTS.indexOf(p) + 1) + " (1–2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words on plaque " + (PROMPTS.indexOf(p) + 1) + ".");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas on plaque " + (PROMPTS.indexOf(p) + 1) + ". Use a fact from the exhibit.");
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
      if (s.type === "check") {
        const w = st.wrong[s.id];
        answers[s.std + " · " + s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    LR.forEach(q => {
      const w = st.lr.wrong[q.id];
      answers[q.std + " · ⚡ " + q.short] = q.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    answers["⚡ Lightning best streak"] = (st.lr.best || 0) + " in a row";
    answers["Opening day"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Exhibit accuracy (end)"] = accNow() + "%";
    answers["Visitors (end)"] = visNow() + "%";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. The exhibit is open!"; msg.className = "msg good";
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
