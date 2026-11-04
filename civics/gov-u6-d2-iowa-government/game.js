// =====================================================================
//  WHO DO I CALL?  (Government Unit 6 · Day 2 · Iowa state, local, tribal)
//  Your family thinks you know everything about government. Their problems
//  ring your phone. Send each one to the right government:
//  🏙️ City of Marion · 🌾 Linn County · 🏫 School board · 🏛️ State of Iowa · 🪶 Meskwaki Nation.
//  7 checks (2 are sorts) + 3 big calls + a 5-question ⚡ Lightning Round
//  (day before the Unit 6 test), 3 endings, 2 writing answers.
//  ⏱️ Hold time goes up for every wrong office. Big calls sent to the wrong
//  office get fixed late (tray turns orange) and add more hold time.
//  Polished 11/3 from the old UnitGame version: same assignmentId, new save key.
//  Turn-in via shared/turnin.js (same payload shape as UnitGame finish()).
// =====================================================================
(function () {
  "use strict";
  const KEY = "gov-u6-d2-iowa-government-v2";
  const ASSIGNMENT_ID = "gov-u6-d2-iowa-government";
  const TITLE = "Government · Unit 6 · Day 2 · Who Do I Call?";
  const STANDARD = "SS.9-12.Gov.18, SS.9-12.Gov.19, SS.9-12.Gov.20";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, ZAP_LOCK = 3;          // seconds locked after a wrong answer
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());   // Test T. (teacher) skips locks and writing rules
  const HOLD_CHECK = 3, HOLD_ZAP = 2;     // minutes on hold per wrong answer
  const HOLD_MAX = 60;                    // where the hold bar is full

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // ---------------- Art helpers ----------------
  const LV = { city: "CITY", county: "COUNTY", school: "SCHOOL", state: "STATE", tribe: "TRIBAL" };
  const lv = k => k ? `<span class="lv ${k}">${LV[k]}</span>` : "";
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite) => `<div class="exhibit"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const pin = (ic, t) => `<div class="pin"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></div>`;
  const phone = (face, who, line) => `<div class="caller"><span class="cface" aria-hidden="true">${face}<span class="cmood" id="cmood"></span></span><span class="cwho"><small>📞 Incoming call</small><b>${who}</b></span></div><div class="bubble" id="bubble">“${line}”</div>`;
  const flow = rows => `<div class="flow">${rows.map(r => r.arr ? `<span class="arr">↓ ${r.arr}</span>` : r.row ? `<div class="row">${r.row.map(x => `<span>${x}</span>`).join("")}</div>` : `<span class="node ${r.cls || ""}">${r.t}</span>`).join("")}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  const capitol = `<svg class="capitol" viewBox="0 0 320 150" role="img" aria-label="Drawing of the Iowa State Capitol">
      <rect x="20" y="92" width="280" height="44" fill="#f4ecd8" stroke="#16203a" stroke-width="3"/>
      <rect x="110" y="70" width="100" height="24" fill="#f4ecd8" stroke="#16203a" stroke-width="3"/>
      <rect x="138" y="44" width="44" height="28" fill="#f4ecd8" stroke="#16203a" stroke-width="3"/>
      <path d="M134 46 Q160 0 186 46 Z" fill="#e0a82e" stroke="#16203a" stroke-width="3"/>
      <rect x="157" y="6" width="6" height="12" fill="#e0a82e" stroke="#16203a" stroke-width="2"/>
      <path d="M20 92 Q20 74 40 74 Q60 74 60 92 Z M260 92 Q260 74 280 74 Q300 74 300 92 Z" fill="#e0a82e" stroke="#16203a" stroke-width="3"/>
      ${[40, 70, 100, 130, 160, 190, 220, 250, 280].map(x => `<rect x="${x - 4}" y="100" width="8" height="30" fill="#d6c7a1" stroke="#16203a" stroke-width="1.5"/>`).join("")}
      <text x="160" y="148" text-anchor="middle" font-size="11" font-weight="800" fill="#16203a">Iowa State Capitol · Des Moines</text>
    </svg>`;
  const iowaMap = `<svg class="mapbox" viewBox="0 0 300 175" role="img" aria-label="Map of Iowa: Marion in Linn County, the Meskwaki Settlement in Tama County, about an hour west">
      <polygon points="12,18 252,18 262,34 282,52 292,90 274,116 268,146 246,162 30,162 22,120 14,64" fill="#f6ead2" stroke="#16203a" stroke-width="4" stroke-linejoin="round"/>
      <path d="M176 80 L222 72" stroke="#b0532f" stroke-width="3" stroke-dasharray="6 5"/>
      <text x="199" y="68" text-anchor="middle" font-size="11" font-weight="800" fill="#b0532f">~1 hr</text>
      <circle cx="222" cy="72" r="7" fill="#2e7d5b" stroke="#16203a" stroke-width="2"/><text x="230" y="90" font-size="13" font-weight="800" fill="#16203a">Marion</text>
      <circle cx="172" cy="80" r="7" fill="#b0532f" stroke="#16203a" stroke-width="2"/><text x="108" y="100" font-size="13" font-weight="800" fill="#16203a">Meskwaki Settlement</text>
      <circle cx="128" cy="118" r="5" fill="#2f63b0" stroke="#16203a" stroke-width="2"/><text x="70" y="140" font-size="12" font-weight="800" fill="#16203a">Des Moines</text>
    </svg>`;

  // ---------------- Rounds (HUD chips + word help) ----------------
  const PARTS = [
    { icon: "🏙️", tag: "Local", terms: [["City Council", "elected; makes city laws"], ["Ordinance", "a city law"], ["City Manager", "hired to run city departments"], ["Board of Supervisors", "elected; runs the county"], ["Auditor", "runs county elections"], ["Treasurer", "property taxes, car tags"], ["Sheriff", "county law officer"], ["School board", "elected; runs a school district"], ["Superintendent", "hired to run the schools"]] },
    { icon: "🏛️", tag: "State", terms: [["General Assembly", "Iowa's lawmakers: House + Senate"], ["Governor", "signs or vetoes bills"], ["Veto", "reject a bill"], ["Iowa Supreme Court", "Iowa's top court"]] },
    { icon: "🪶", tag: "Tribal", terms: [["Sovereign", "governs itself"], ["Settlement", "land the tribe bought"], ["Tribal Council", "7 elected tribal leaders"]] },
    { icon: "⚡", tag: "Lightning", terms: [["Statute", "a state law"], ["Retention election", "yes/no vote to keep a judge"], ["Checks and balances", "each branch can limit the others"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right ("lvl|text" adds a level tag); miss[i] teaches options[i+1].
  // sort: each row's a is right; chips shared (one extra decoy).
  // call: a big call. Wrong office = hold minutes and the problem gets fixed late.
  // zap: Lightning Round, one tap, 3 options, auto-advances.
  const STEPS = [
    // ===== 🏙️ Local =====
    { id: "i1", type: "check", p: 0, std: "Gov.20", kicker: "Local · Call 1", short: "Pothole on a Marion street = City of Marion", stamp: "CONNECTED",
      scene: () => phone("👩🏽", "Mom", "Pothole on our street. Almost took out my tire!") + pin("📍", "Our street · inside Marion city limits"),
      ask: "Who fixes it?",
      options: ["city|City of Marion: Public Works", "county|Linn County: Secondary Roads", "state|Iowa Dept. of Transportation", "county|Linn County Sheriff's Office"],
      miss: ["County crews fix rural roads outside cities.", "The state runs highways, not neighborhood streets.", "The sheriff enforces laws. No road crews."],
      hint: "The street is inside Marion.",
      reveal: "<b>Cities</b> run streets, parks, police, and fire inside city limits." },

    { id: "i2", type: "check", p: 0, std: "Gov.20", kicker: "Local · Call 2", short: "Council hires City Manager", stamp: "CONNECTED",
      scene: () => phone("🧑🏻", "Older brother", "Marion needs a new City Manager. Who picks?") +
        ex("How Marion is run", flow([{ t: "🗳️ Marion voters" }, { arr: "elect" }, { t: "👥 City Council · Mayor + 6" }, { arr: "hires" }, { t: "💼 City Manager" }, { arr: "runs" }, { row: ["🚧 Streets", "🌳 Parks", "🚓 Police", "🚒 Fire"] }]), "City of Marion"),
      ask: "Who hires the City Manager?",
      options: ["The City Council", "Marion's voters", "The Mayor alone", "Linn County Supervisors"],
      miss: ["Voters elect the council. Follow the arrows.", "The Mayor is 1 of 7 council votes.", "That's the county. Marion hires its own."],
      hint: "Follow the arrows on the chart.",
      reveal: "<b>Council-manager</b> government: voters elect a council, the council hires a manager. City laws are <b>ordinances</b>." },

    { id: "e1", type: "call", p: 0, kicker: "Big call · Local", short: "Rural road washout call", icon: "🚜", what: "Farm road",
      scene: () => phone("👨🏼‍🌾", "Uncle", "Storm washed out the gravel road to my farm. My truck's stuck!") + pin("📍", "The farm · outside Marion city limits"),
      ask: "Where do you send him?",
      cards: [
        { icon: "🌾", lv: "county", t: "Linn County Secondary Roads", line: "County road crews", hold: 0, res: "A county crew fixes the road the next day." },
        { icon: "🏙️", lv: "city", t: "Marion City Hall", line: "City street crews", hold: 15, res: "“That's outside city limits. Call the county.”" },
        { icon: "🛣️", lv: "state", t: "Iowa Dept. of Transportation", line: "State highway crews", hold: 20, res: "“We run highways, not county gravel roads.”" }
      ],
      reveal: "<b>Counties</b> run rural roads, the sheriff, elections, and property records." },

    { id: "i4", type: "sort", p: 0, std: "Gov.20", kicker: "Local · Calls 3–5", short: "County offices: auditor, treasurer, sheriff", stamp: "ALL CONNECTED",
      scene: () => ex("Linn County Courthouse · Directory", `<div class="doors">
          <div class="door"><b>🗳️ Auditor</b>Elections, county records</div>
          <div class="door"><b>💵 Treasurer</b>Property taxes, car registrations</div>
          <div class="door"><b>🚓 Sheriff</b>Patrols outside cities, county jail</div>
          <div class="door"><b>📜 Recorder</b>Property deeds, birth records</div>
          <div class="door wide"><b>👥 Board of Supervisors</b>County budget, property tax rate</div></div>`, "Linn County, Iowa"),
      ask: "Three calls at once. Send each to the right door.",
      chips: ["Auditor", "Treasurer", "Sheriff", "Recorder"],
      rows: [
        { icon: "🗳️", t: "Cousin: “I just turned 18. Where do I vote?”", a: "Auditor" },
        { icon: "🚗", t: "Brother: “My car tags run out Friday.”", a: "Treasurer" },
        { icon: "🚨", t: "Neighbor: “Someone broke into a barn out past town.”", a: "Sheriff" }
      ],
      hint: "Match each problem to a door's job.",
      reveal: "County <b>auditor</b> = elections. <b>Treasurer</b> = taxes and car tags. <b>Sheriff</b> = law outside cities." },

    { id: "i5", type: "check", p: 0, std: "Gov.20", kicker: "Local · Call 6", short: "School board hires superintendent", stamp: "CONNECTED",
      scene: () => phone("👵🏽", "Grandma", "Linn-Mar needs a new superintendent. Who decides?") +
        ex("How Linn-Mar schools are run", flow([{ t: "🗳️ District voters" }, { arr: "elect" }, { t: "❓ ? ? ?", cls: "mystery" }, { arr: "hires" }, { t: "🎓 Superintendent" }, { arr: "runs" }, { row: ["🏫 Schools", "🚌 Buses", "🍎 Staff"] }])),
      ask: "Who goes in the ❓ box?",
      options: ["The school board", "The Marion City Council", "Iowa Dept. of Education", "The County Supervisors"],
      miss: ["A school district is its own government, separate from the city.", "The state sets rules for all schools. It doesn't hire yours.", "Counties don't run schools in Iowa."],
      hint: "Like the city chart: voters elect a board, the board hires a leader.",
      reveal: "A <b>school board</b> is local government: elected, hires the superintendent, sets the budget." },

    // ===== 🏛️ State =====
    { id: "i6", type: "check", p: 1, std: "Gov.18", kicker: "State · Call 7", short: "Phone law needed Governor", stamp: "CONNECTED",
      scene: () => phone("🧑🏾", "Friend", "Why can't we use phones in class anymore?") +
        ex("Real Iowa law · 2025", ln("📜", "April 2025: Iowa House and Senate pass a bill limiting phones in class.") + ln("✍️", "April 30: Governor signs it.") + ln("🏫", "Every public school must follow it."), "Iowa Capital Dispatch, April 30, 2025"),
      ask: "The House and Senate both passed it. Why did it still need the Governor?",
      options: ["Governor signs or vetoes bills", "Governor writes all state bills", "Governor must ask the court first", "Governor runs every school district"],
      miss: ["Lawmakers write bills. They passed it first.", "Courts only step in if someone sues.", "School boards run districts."],
      hint: "What happens after lawmakers pass a bill?",
      reveal: "The <b>Governor</b> signs or <b>vetoes</b> bills. Lawmakers can override a veto with 2/3 of both chambers." },

    { id: "i7", type: "sort", p: 1, std: "Gov.18", kicker: "State · The Statehouse", short: "Iowa House 100, Senate 50, Governor, Supreme Court", stamp: "STATEHOUSE MAPPED",
      scene: () => capitol + `<div class="wings"><div><b>📜 Lawmakers</b>General Assembly</div><div><b>✍️ Executive</b>Governor</div><div><b>⚖️ Courts</b>Iowa Supreme Court</div></div>` +
        ex("Like Congress", ln("🏛️", "Two chambers: a bigger House, a smaller Senate.")),
      ask: "Match each clue to the right part of Iowa's government.",
      chips: ["Iowa House", "Iowa Senate", "Governor", "Iowa Supreme Court", "Secretary of State"],
      rows: [
        { icon: "👥", t: "100 members · 2-year terms", a: "Iowa House" },
        { icon: "👤", t: "50 members · 4-year terms", a: "Iowa Senate" },
        { icon: "✍️", t: "Signs or vetoes bills", a: "Governor" },
        { icon: "⚖️", t: "Decides if a law breaks Iowa's Constitution", a: "Iowa Supreme Court" }
      ],
      hint: "Bigger chamber = House. Signing = executive. Deciding = courts.",
      reveal: "Iowa has 3 branches: the <b>General Assembly</b> (100 House, 50 Senate), the <b>Governor</b>, and the <b>courts</b>." },

    { id: "e2", type: "call", p: 1, kicker: "Big call · State", short: "Change state phone law call", icon: "📱", what: "Phone law",
      scene: () => phone("🧑🏻‍🎓", "Student council rep", "Students want to change the phone law. Who can actually change it?") + pin("📜", "The phone-in-class law (2025)"),
      ask: "Who should they contact?",
      cards: [
        { icon: "🏛️", lv: "state", t: "Their state lawmakers", line: "Iowa House + Senate members", hold: 0, res: "Lawmakers can write a bill to change it. Yours represent your area." },
        { icon: "🏫", lv: "school", t: "Linn-Mar School Board", line: "Runs your district", hold: 10, res: "“We have to follow state law. Try your lawmakers.”" },
        { icon: "🏙️", lv: "city", t: "Marion City Council", line: "Makes city ordinances", hold: 15, res: "“A city can't change a state law.”" }
      ],
      reveal: "To change a <b>state law</b>, go to the <b>General Assembly</b>: your state representative and senator." },

    // ===== 🪶 Tribal =====
    { id: "i10", type: "check", p: 2, std: "Gov.19", kicker: "Tribal · Call 9", short: "Sovereign = governs itself", stamp: "CONNECTED",
      scene: () => phone("🧑🏽", "Project partner", "Our project's on the Meskwaki Nation. Is it part of Iowa's government?") + iowaMap +
        ex("Meskwaki Nation government", ln("👥", "Tribal Council: 7 elected members, led by a Chair") + ln("⚖️", "Own court (since 2005)") + ln("🚓", "Own police (since 2006)") + ln("🏫", "Own school"), "Meskwaki Nation; Sac and Fox Tribe of the Mississippi in Iowa"),
      ask: "So what does sovereign mean here?",
      options: ["It makes and enforces its laws", "It is part of Tama County", "It answers to Iowa's Governor", "It has a council but no laws"],
      miss: ["It's next to Tama County, but separate.", "It deals with the U.S. nation to nation, not under the Governor.", "The council makes laws. Court and police enforce them."],
      hint: "Who makes the rules and runs the court and police?",
      reveal: "<b>Sovereign</b> = governs itself. The Meskwaki Nation works with the U.S. nation to nation." },

    { id: "e3", type: "call", p: 2, kicker: "Big call · Tribal", short: "Meskwaki research call", icon: "🪶", what: "Tribal court project",
      scene: () => phone("🧑🏽", "Project partner", "Let's ask how the tribal court works. Who do we call?") + iowaMap,
      ask: "Who do you contact?",
      cards: [
        { icon: "🪶", lv: "tribe", t: "Meskwaki Nation offices", line: "Tribal government", hold: 0, res: "They run the court, so they're the right source." },
        { icon: "🌾", lv: "county", t: "Tama County Supervisors", line: "Neighboring county", hold: 10, res: "“We're neighbors. We don't run the tribe's court.”" },
        { icon: "🏛️", lv: "state", t: "Iowa Governor's office", line: "State government", hold: 15, res: "“The tribe governs itself. Call the Meskwaki Nation.”" }
      ],
      reveal: "Tribal questions go to the <b>tribal government</b>, not the county or state." },

    // ===== ⚡ Lightning Round (test review) =====
    { id: "L1", type: "zap", p: 3, std: "Gov.20", n: 1, short: "Lightning: county budget = Supervisors",
      ask: "Who sets Linn County's budget and property tax rate?",
      options: ["Board of Supervisors", "County Treasurer", "Marion City Council"],
      miss: ["The treasurer collects taxes. Someone else sets the rate.", "The council sets Marion's city budget only."] },
    { id: "L2", type: "zap", p: 3, std: "Gov.20", n: 2, short: "Lightning: city law = ordinance",
      ask: "A law passed by Marion's City Council is called…",
      options: ["an ordinance", "a statute", "an executive order"],
      miss: ["Statutes come from the state legislature.", "Executive orders come from governors and presidents."] },
    { id: "L3", type: "zap", p: 3, std: "Gov.18", n: 3, short: "Lightning: judges = retention election",
      ask: "Iowa voters vote yes or no on keeping a judge. That's a…",
      options: ["retention election", "recall election", "primary election"],
      miss: ["A recall tries to remove someone early. Yes/no to keep = retention.", "Primaries pick party candidates."] },
    { id: "L4", type: "zap", p: 3, std: "Gov.19", n: 4, short: "Lightning: Settlement = land the tribe bought",
      ask: "Why is it the Meskwaki “Settlement,” not a reservation?",
      options: ["The Meskwaki bought the land", "A treaty set the land aside", "Iowa rents the land to them"],
      miss: ["Many reservations came from treaties. Not this one. In 1857 they bought 80 acres.", "The tribe owns it. Nobody rents it to them."] },
    { id: "L5", type: "zap", p: 3, std: "Gov.4", n: 5, short: "Lightning: veto override = checks and balances",
      ask: "The Governor vetoes a bill. Lawmakers override with 2/3 of both chambers. That's…",
      options: ["checks and balances", "federalism", "popular sovereignty"],
      miss: ["Federalism splits power between national and state.", "Popular sovereignty means power comes from the people."] },

    { id: "end", type: "ending", p: 3, kicker: "End of the day" },
    { id: "write", type: "write", p: 3, kicker: "Your call log" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => ["check", "sort", "zap"].includes(s.type));
  const CALLS = STEPS.filter(s => s.type === "call");
  const ZAPS = STEPS.filter(s => s.type === "zap");

  const PROMPTS = [
    { id: "me", short: "A decision that affected me", label: "1. Name one government decision that affected you. Who made it?",
      bank: ["📱 phone law · Governor + lawmakers", "🏫 school calendar · school board", "🚧 street work · City of Marion", "🗳️ elections · County Auditor"],
      stem: "One decision that affected me was ___. It was made by ___.", min: 60, newWords: 5,
      mustAll: [["city", "council", "marion", "county", "supervisor", "sheriff", "auditor", "treasurer", "state", "legislat", "lawmaker", "governor", "iowa", "tribal", "meskwaki", "school board", "board", "mayor", "manager", "court", "judge", "superintendent"]],
      mustMsg: "In answer 1, name WHO made the decision (like the city council, the school board, the Governor, or lawmakers)." },
    { id: "fix", short: "One Marion problem and who to call", label: "2. One problem in Marion or Linn County you'd fix. Who would you call, and why them?",
      bank: ["🏙️ City Council / Public Works", "🌾 Board of Supervisors / Sheriff", "🏫 School board", "🏛️ State rep or senator"],
      stem: "I would fix ___. I would contact ___ because ___.", min: 70, newWords: 5,
      mustAll: [["city", "council", "manager", "mayor", "public works", "county", "supervisor", "sheriff", "auditor", "treasurer", "recorder", "state", "representative", "senator", "governor", "school board", "board", "lawmaker"], ["because", "since"]],
      mustMsg: "In answer 2, name the office you'd contact AND explain why (use “because”)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: { hold: 0 }, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false });
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
  const hold = () => Math.max(0, st.fx.hold || 0);
  const partDone = i => STEPS.filter(s => s.p === i && ["check", "sort", "zap"].includes(s.type)).every(c => st.done[c.id]) && STEPS.filter(s => s.p === i && s.type === "call").every(e => st.picks[e.id] != null);

  // ---------------- HUD ----------------
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const h = hold();
    $("holdFill").style.width = Math.min(100, Math.round(h / HOLD_MAX * 100)) + "%";
    $("holdNum").textContent = h + " min";
    $("mHold").classList.toggle("warn", h >= 15 && h < 30);
    $("mHold").classList.toggle("hot", h >= 30);
    $("youName").textContent = st.name;
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    const off = ["ending", "write"].includes(step.type);
    $("parts").innerHTML = PARTS.map((p, i) => `<span class="${partDone(i) ? "won" : i === step.p && !off ? "now" : ""}">${partDone(i) ? "✓" : p.icon} ${p.tag}</span>`).join("");
    $("tray").innerHTML = `<span class="tl">Fixed</span>` + CALLS.map(c => { const k = st.picks[c.id]; const cls = k == null ? "" : c.cards[k].hold ? "late" : "ok"; return `<span class="pb ${cls}" title="${esc(c.what)}">${c.icon}</span>`; }).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
    document.body.classList.toggle("zap", step.type === "zap");
  }
  function bumpHold(m) {
    hud();
    const el = $("mHold"); if (!el || !m) return;
    const f = document.createElement("span"); f.className = "float bad"; f.textContent = "+" + m + " min";
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    host.querySelectorAll(".stamp").forEach(s => s.remove());
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }
  function mood(face, line, cls) {
    if ($("cmood")) $("cmood").textContent = face;
    const b = $("bubble"); if (b && line) { b.textContent = line; b.className = "bubble " + (cls || ""); }
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, sceneHtml, playHtml, label) {
    const off = ["ending", "write"].includes(step.type);
    const P = PARTS[step.p];
    const termsBtn = off ? "" : `<button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Word help</button>`;
    app.innerHTML = `<div class="board"><div class="scene" id="scene"><span class="notch" aria-hidden="true"></span><p class="kick">${esc(step.kicker || "")}</p>${sceneHtml}</div>
      <div class="play" id="play"><div class="ptop"><span class="plabel">${esc(label || "")}</span>${termsBtn}</div><div id="termsBox"></div>${playHtml}</div></div>`;
    if ($("termsBtn")) $("termsBtn").onclick = () => {
      const box = $("termsBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="terms">${P.terms.map(t => `<p><b>${t[0]}</b>: ${t[1]}</p>`).join("")}</div>`;
      $("termsBtn").setAttribute("aria-expanded", String(!open));
    };
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "ending") return "See how your day went ▶";
    if (nx.p !== step.p) return "Next: " + PARTS[nx.p].icon + " " + PARTS[nx.p].tag + (nx.type === "zap" ? " Round" : "") + " ▶";
    return "Next call ▶";
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
  const optText = o => String(o).includes("|") ? String(o).split("|")[1] : String(o);
  const optLv = o => String(o).includes("|") ? String(o).split("|")[0] : "";

  // ---- Title ----
  function title() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title">
      <div class="tart" aria-hidden="true"><div class="scene"><span class="notch"></span><p class="kick">Marion, Iowa</p>
        ${phone("👩🏽", "Mom", "You know government stuff, right? I need help!")}
        <div class="lines"><span class="city"><i>🏙️</i>City</span><span class="county"><i>🌾</i>County</span><span class="school"><i>🏫</i>School board</span><span class="state"><i>🏛️</i>State</span><span class="tribe"><i>🪶</i>Meskwaki Nation</span></div>
      </div></div>
      <div class="tcopy">
        <p class="tk">Government · Unit 6 · Day 2</p>
        <h1>Who Do I Call?</h1>
        <p class="hook">Your family thinks you know everything about government. Prove it.</p>
        <ul class="how"><li><span>📞</span>Hear the problem</li><li><span>🔀</span>Pick the right government</li><li><span>⏱️</span>Wrong office = time on hold</li></ul>
        <p class="tline">🎯 Goal: know who runs what in Iowa: city, county, school board, state, and tribe.</p>
        <p class="tchips"><span>⏱️ 25 min</span><span>✔️ 7 checks</span><span>📞 3 big calls</span><span>⚡ Lightning Round</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Pick up the phone 📞</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">Callers are made up. Offices and facts are real. Standards: SS.9-12.Gov.18, Gov.19, Gov.20.</p>
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
  function markWrong(step, why, mins, secs) {
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.fx.hold = hold() + mins;
    st.lockUntil = Date.now() + (isTestT() ? 0 : secs) * 1000;
    st.lockMsg = why;
    save(); bumpHold(mins);
    stamp(step.type === "zap" ? "ON HOLD" : "WRONG OFFICE", "bad");
    mood("😤", "Ugh, they put me on hold…", "upset");
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    st.done[step.id] = true; save(); hud();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = secs => Math.min(secs, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check: one call, pick the office ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`, "Route this call");
    if (st.done[step.id]) return solved(step, true);
    draw(step);
    if (lockLeft(LOCK) > 0) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || step.hint, $("qmsg"), () => draw(step), lockLeft(LOCK)); }
  }
  function draw(step) {
    const area = $("replies"); if (!area) return;
    const before = [...area.querySelectorAll(".reply")].map(x => x.dataset.n).join("|");
    let order = shuffle(step.options.map((t, n) => ({ t, n })));
    for (let k = 0; k < 8 && before && order.map(o => o.n).join("|") === before; k++) order = shuffle(order);
    area.replaceChildren();
    order.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "reply"; b.dataset.n = o.n;
      b.innerHTML = (optLv(o.t) ? lv(optLv(o.t)) : "") + `<span>${esc(optText(o.t))}</span>`;
      b.onclick = () => pick(step, o, b);
      area.appendChild(b);
    });
  }
  function pick(step, o, btn) {
    if (locked) return;
    const zap = step.type === "zap";
    if (o.n === 0) {
      btn.classList.add("right"); markRight(step);
      setTimeout(() => zap ? zapped(step, false) : solved(step, false), 450); return;
    }
    btn.classList.add("wrong");
    const why = (step.miss && step.miss[o.n - 1]) || step.hint || "Try another.";
    markWrong(step, why, zap ? HOLD_ZAP : HOLD_CHECK, zap ? ZAP_LOCK : LOCK);
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, $("qmsg"), () => draw(step), isTestT() ? 0 : zap ? ZAP_LOCK : LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>📞 ${esc(optText(step.options[0]))}</span><small>✓ Connected</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); mood("😄", "Thanks! That's the right office.", "happy"); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Sort: several calls at once ----
  let bp = {}, curSort = null;
  function sort(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="rows"></div><button type="button" class="go lock" id="lockBtn" disabled>Connect all 📞</button><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`, "Route these calls");
    $("lockBtn").onclick = () => lockIn(step);
    if (st.done[step.id]) return sorted(step, true);
    drawRows(step);
    if (lockLeft(LOCK) > 0) { setRows(true); runLock(st.lockMsg || step.hint, $("qmsg"), () => drawRows(step), lockLeft(LOCK)); }
  }
  function setRows(off) { document.querySelectorAll("#rows .chip").forEach(x => x.disabled = off); $("lockBtn").disabled = off || Object.keys(bp).length < curSort.rows.length; }
  function drawRows(step) {
    curSort = step; bp = {};
    const box = $("rows"); if (!box) return;
    const chipOrder = shuffle(step.chips.slice());
    box.innerHTML = step.rows.map((r, i) => `<div class="brow" data-i="${i}"><span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span><div class="chips" role="group" aria-label="${esc(r.t)}">${chipOrder.map(o => `<button type="button" class="chip" aria-pressed="false" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div></div>`).join("");
    box.querySelectorAll(".brow").forEach(row => {
      const i = +row.dataset.i;
      row.querySelectorAll(".chip").forEach(ch => ch.onclick = () => {
        if (locked) return;
        bp[i] = ch.dataset.v;
        row.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === ch)));
        $("lockBtn").disabled = Object.keys(bp).length < step.rows.length;
        if (!$("lockBtn").disabled && $("lockBtn").scrollIntoView) $("lockBtn").scrollIntoView({ behavior: "smooth", block: "nearest" });
        $("qmsg").textContent = "";
      });
    });
    $("lockBtn").disabled = true;
  }
  function lockIn(step) {
    if (locked || Object.keys(bp).length < step.rows.length) return;
    const nRight = step.rows.filter((r, i) => bp[i] === r.a).length;
    if (nRight === step.rows.length) { markRight(step); return sorted(step, false); }
    const text = `${nRight} of ${step.rows.length} connected. ${step.hint}`;
    markWrong(step, text, HOLD_CHECK, LOCK);
    setRows(true);
    runLock(text, $("qmsg"), () => drawRows(step), isTestT() ? 0 : LOCK);
  }
  function sorted(step, quiet) {
    $("rows").innerHTML = step.rows.map(r => `<div class="brow ok"><span class="clue"><span class="ic" aria-hidden="true">${r.icon}</span>${esc(r.t)}</span><span class="got">✓ ${esc(r.a)}</span></div>`).join("");
    $("lockBtn").remove();
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Big call: one shot, no retries ----
  function call(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`, "Big call · one try");
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span>${lv(c.lv)}<b>${esc(c.t)}</b><span class="dline">${esc(c.line)}</span></button>`; }).join("")}</div><p class="peek">⏱️ One try. A wrong office means long hold time.</p>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      st.picks[step.id] = i;
      st.fx.hold = hold() + (c.hold || 0);
      save(); bumpHold(c.hold || 0);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    const fx = c.hold ? `<span class="fx b">⏱️ +${c.hold} min</span>` : `<span class="fx g">⏱️ +0</span>`;
    const right = step.cards.find(x => !x.hold);
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span><b>${esc(c.t)}</b></span>${fx}</div><p class="result">${esc(c.res)}${c.hold ? " Fixed late. Right office: <b>" + esc(right.t) + "</b>." : ""}</p>`;
    if (!quiet) {
      stamp(c.hold ? "FIXED LATE" : "FIXED", c.hold ? "bad" : "");
      if (c.hold) mood("😤", "That took forever.", "upset"); else mood("😄", "You're a lifesaver!", "happy");
    }
    addNext(step, step.reveal, quiet);
  }

  // ---- ⚡ Lightning Round ----
  function zap(step) {
    const dots = ZAPS.map(z => `<i class="${st.done[z.id] ? "done" : z === step ? "on" : ""}"></i>`).join("");
    shell(step, `<div class="bolt" aria-hidden="true">⚡</div>` + pin("📝", "Test tomorrow. Quick review: one tap each."),
      `<div class="zaphead">⚡ LIGHTNING ${step.n}/${ZAPS.length}<span class="zapdots" aria-hidden="true">${dots}</span></div><p class="ask">${esc(step.ask)}</p><div class="replies three" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`, "");
    const sc = $("scene"); if (sc) { const k = sc.querySelector(".kick"); if (k) k.textContent = "Lightning Round"; }
    if (st.done[step.id]) return zapped(step, true);
    draw(step);
    if (lockLeft(ZAP_LOCK) > 0) { $("replies").querySelectorAll("button").forEach(x => x.disabled = true); runLock(st.lockMsg || "Try another.", $("qmsg"), () => draw(step), lockLeft(ZAP_LOCK)); }
  }
  function zapped(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>⚡ ${esc(step.options[0])}</span><small>✓ Got it</small></div>`;
    if (quiet) return addNext(step, "", true);
    $("qmsg").textContent = ""; stamp("ZAP!");
    setTimeout(() => { if (STEPS[st.step] === step) { st.step++; save(); render(); window.scrollTo(0, 0); } }, 900);
  }

  // ---- Endings ----
  function ending() {
    const h = hold();
    const fixed = CALLS.filter(c => st.picks[c.id] != null && !c.cards[st.picks[c.id]].hold).length;
    let e;
    if (fixed === CALLS.length && h <= 9) e = { key: "Marion's Fixer", icon: "🏆", cls: "best", text: "Every problem got fixed fast. Now the whole family calls you first." };
    else if (fixed >= 2 && h <= 30) e = { key: "Getting It Done", icon: "✅", cls: "mid", text: "Most calls landed. A few detours, but things got fixed." };
    else e = { key: "The Runaround", icon: "🔁", cls: "low", text: "Calls bounced around and people waited. Now you know who does what." };
    e.causes = CALLS.filter(c => st.picks[c.id] != null).map(c => { const k = c.cards[st.picks[c.id]]; return c.icon + " " + c.what + " → " + k.t + (k.hold ? " (+" + k.hold + " min)" : " ✓"); });
    const quick = h - CALLS.reduce((t, c) => t + (st.picks[c.id] != null ? c.cards[st.picks[c.id]].hold || 0 : 0), 0);
    e.causes.push(quick > 0 ? "📞 Quick calls: wrong offices (+" + quick + " min)" : "📞 Quick calls: right offices ✓");
    e.out = e.key;
    return e;
  }

  function endingStep(step) {
    const e = ending();
    shell(step, phone("👩🏽", "Mom", e.cls === "best" ? "You really do know who to call!" : e.cls === "mid" ? "Thanks for the help today." : "Next time, I'm calling the right office first.") +
        `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">⏱️ Time on hold today: ${hold()} min</p></div><div id="after"></div>`, "Your day");
    const b = nextBtn(step); b.textContent = "✏️ Write your call log ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="typed"><p class="cbh">📒 Call log · ${esc(st.name)}</p><p><b>Result:</b> ${e.icon} ${esc(e.key)}</p>${e.causes.map(c => `<p>${esc(c)}</p>`).join("")}</div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: in answer 2, say what that office has the power to do.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Turn in ▶"}</button>
         <p id="sendMsg" class="msg" role="status" aria-live="polite">${sent ? "✓ Turned in. You can fix your answers and turn in again." : ""}</p>
       </div>`, "Last step");
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
    for (const p of (isTestT() ? [] : PROMPTS)) {
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
      if (s.type === "call" && st.picks[s.id] != null) { const c = s.cards[st.picks[s.id]]; answers["Choice · " + s.short] = c.t + (c.hold ? " (wrong office, +" + c.hold + " min)" : " (right office)"); }
      if (["check", "sort", "zap"].includes(s.type)) {
        const w = st.wrong[s.id];
        const ans = s.type === "sort" ? s.rows.map(r => r.t.replace(/^[^:]*: /, "").replace(/[“”]/g, "") + " = " + r.a).join(" · ") : optText(s.options[0]);
        answers[s.short] = ans + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Time wasted on hold"] = hold() + " min";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Shift over!"; msg.className = "msg good";
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
    if (step.type === "sort") return sort(step);
    if (step.type === "call") return call(step);
    if (step.type === "zap") return zap(step);
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
        if (["check", "sort", "zap"].includes(s.type) && !st.done[s.id]) { st.done[s.id] = true; st.lockUntil = 0; save(); render(); }
        else if (s.type === "call" && st.picks[s.id] == null) { const b = document.querySelector("#dbox .dcard"); if (b) b.click(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
