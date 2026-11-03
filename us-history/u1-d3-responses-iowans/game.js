// =====================================================================
//  HOOVER VS. THE NEW DEAL  (U.S. History Unit 1 · Day 3)
//  Cedar County, Iowa, 1928–1938. Keep the (made-up) Brenner farm family
//  going through the Great Depression while two presidents try two plans.
//  3 parts: 🌽 Hoover years · 🚜 Farm revolt · 🏛️ New Deal
//  7 checks, 3 family choices, 1 news beat, 4 endings, 2 writing answers.
//  🏠 Home (family stability) moves with family choices.
//  🤝 Neighbors moves with choices and drops 1 for every wrong answer
//  ("bad info spreads at the co-op"). Endings never show a wrong-answer count.
//  Polished 11/3 from the old UnitGame version: same assignmentId, same turn-in
//  title, same answer labels for every check/choice/writing that stayed; new save key.
//  Turn-in via shared/turnin.js (same payload shape as UnitGame finish()).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u1-d3-responses-iowans-v2";
  const ASSIGNMENT_ID = "ush-u1-d3-responses-iowans";
  const TITLE = "U.S. History · Unit 1 · Day 3 · Responses, Viewpoints, and Iowans";
  const STANDARD = "SS.9-12.US.25, SS.9-12.US.27, SS.9-12.US.28";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;                       // seconds locked after a wrong answer
  const START = { home: 6, nbr: 6 };
  const GOAL = { home: 7, nbr: 6 };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = n => Math.max(0, Math.min(10, n));

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite) => `<div class="exhibit"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (face, who, t) => `<div class="sayrow"><span class="sface" aria-hidden="true">${face}</span><div class="say"><span class="who-s">${who}</span>${t}</div></div>`;
  const pa = t => say("👨‍🌾", "Pa Brenner", t);
  const ma = t => say("👩‍🌾", "Ma Brenner", t);
  const radio = (top, inner) => `<div class="radio"><div class="grill" aria-hidden="true"></div><div class="rscreen"><p class="rtop">${top}</p>${inner}</div></div>`;
  const chart = (rows, max) => `<div class="chart">${rows.map(r => `<div class="br"><span>${r[0]}</span><span class="tr"><span class="${r[2] || ""}" style="width:${Math.round(r[1] / (max || 100) * 100)}%"></span></span><span>${r[3] || r[1] + "%"}</span></div>`).join("")}</div>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  const vs = (a, b, c) => `<div class="vs"><div class="side ${c ? c[0] : "h"}">${a}</div><span class="vsdot" aria-hidden="true">VS</span><div class="side ${c ? c[1] : "f"}">${b}</div></div>`;
  const iowa = pins => `<svg class="iowa" viewBox="0 0 300 175" role="img" aria-label="Map of Iowa: ${pins.map(p => p[0]).join(", ")}">
      <polygon points="12,18 252,18 262,34 282,52 292,90 274,116 268,146 246,162 30,162 22,120 14,64" fill="#f3e3b5" stroke="#2b1d12" stroke-width="4" stroke-linejoin="round"/>
      ${pins.map(p => `<g><circle cx="${p[1]}" cy="${p[2]}" r="7" fill="#b3261e" stroke="#2b1d12" stroke-width="2"/><text x="${p[1] + (p[3] || 10)}" y="${p[2] + 5}" font-size="15" font-weight="800" fill="#2b1d12" ${p[3] < 0 ? 'text-anchor="end"' : ""}>${p[0]}</text></g>`).join("")}
    </svg>`;
  const farmArt = () => `<svg class="farm" viewBox="0 0 320 150" aria-hidden="true">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7c873"/><stop offset="1" stop-color="#fde9c2"/></linearGradient></defs>
      <rect width="320" height="150" fill="url(#sky)"/><circle cx="262" cy="40" r="20" fill="#f59e0b"/>
      <rect y="104" width="320" height="46" fill="#7c5a2a"/>
      ${Array.from({ length: 16 }, (_, i) => `<path d="M${8 + i * 20} 112 q4 -24 0 -40 M${8 + i * 20} 92 l-8 -8 M${8 + i * 20} 86 l8 -8" stroke="#b08a2e" stroke-width="3" fill="none"/>`).join("")}
      <rect x="40" y="52" width="70" height="56" fill="#b3261e" stroke="#2b1d12" stroke-width="3"/><path d="M34 54 L75 22 L116 54 Z" fill="#7f1d1d" stroke="#2b1d12" stroke-width="3"/>
      <rect x="64" y="76" width="22" height="32" fill="#f3e3b5" stroke="#2b1d12" stroke-width="3"/><path d="M64 76 L86 108 M86 76 L64 108" stroke="#2b1d12" stroke-width="2"/>
      <rect x="118" y="36" width="22" height="72" rx="10" fill="#cbd5e1" stroke="#2b1d12" stroke-width="3"/>
      <rect x="190" y="66" width="58" height="42" fill="#fef3c7" stroke="#2b1d12" stroke-width="3"/><path d="M184 68 L219 42 L254 68 Z" fill="#475569" stroke="#2b1d12" stroke-width="3"/>
      <rect x="211" y="84" width="14" height="24" fill="#7c5a2a" stroke="#2b1d12" stroke-width="2"/>
    </svg>`;

  // ---------------- Parts (HUD chips + word help) ----------------
  const PARTS = [
    { icon: "🌽", tag: "Hoover years", terms: [["Great Depression", "1929–1941: the worst economic crisis in U.S. history"], ["Humanitarian", "someone who works to help suffering people"], ["Voluntary", "done by choice, not forced by law"], ["Federal", "the national government in Washington"], ["Bank run", "everyone pulls cash out at once"]] },
    { icon: "🚜", tag: "Farm revolt", terms: [["Direct relief", "money or food straight from the government to people"], ["Federal", "the national government in Washington"], ["RFC", "Hoover's 1932 agency that lent money to banks and businesses"], ["Bushel", "a basket of about 56 pounds of corn"], ["Foreclose", "a bank takes a farm when the loan isn't paid"], ["Auction", "a sale where people bid"]] },
    { icon: "🏛️", tag: "New Deal", terms: [["New Deal", "FDR's programs to fight the Depression"], ["Critic", "someone who points out what's wrong"], ["Relief", "help right now"], ["Recovery", "get the economy working again"], ["Reform", "new rules so it doesn't happen again"], ["AAA", "paid farmers to grow and raise less"], ["CCC", "jobs for young men in parks and forests"]] }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1]. short = the dashboard label (kept from the old version).
  // event: a family choice. label = the dashboard value (kept from the old version). fx moves 🏠 home and 🤝 neighbors.
  const STEPS = [
    // ===== 🌽 Hoover years =====
    { id: "h1", type: "check", p: 0, std: "US.28", date: "1928", kicker: "1928 · West Branch, Iowa", short: "Hoover = Great Humanitarian (WWI food relief)", stamp: "IOWA PROUD",
      scene: () => pa("“A West Branch boy for president!”") +
        `<div class="row2">${iowa([["West Branch", 242, 104, -12]])}${ex("Herbert Hoover", ln("🏠", "Born 1874, West Branch") + ln("🕯️", "Orphan by age 9"))}</div>` +
        ex("World War I · 1914–1918", ln("🇧🇪", "War cuts off Belgium's food.") + ln("🚢", "Hoover's group feeds about 9 million people in Belgium and France.") + `<p class="quote">His nickname: “The Great Humanitarian”</p>`, "Hoover Presidential Library; Iowa PBS"),
      ask: "Why did people call Hoover “The Great Humanitarian”?",
      options: ["He organized food for millions in World War I", "He commanded U.S. troops in World War I", "He paid off Iowa farm debts after the war", "He sold Iowa corn to Europe during the war"],
      miss: ["He never led troops. Look at the ship 🚢.", "That never happened. Look at Belgium 🇧🇪.", "He didn't sell food. His group gave it away."],
      hint: "What did his group ship to Belgium?",
      reveal: "Hoover was famous for <b>feeding millions</b>." },

    { id: "h2", type: "check", p: 0, std: "US.27", date: "Oct. 1929", kicker: "Oct. 1929 · The crash", short: "Rugged individualism viewpoint", stamp: "GOT IT",
      scene: () => radio("📻 RADIO NEWS · OCT. 29, 1929", ln("📉", "Stock market crashes.") + ln("🏭", "Banks and factories close.")) +
        ex("President Hoover's big idea", ln("💪", "<b>Rugged individualism</b>: people solve their own problems.") + ln("⛪", "Help should be <b>voluntary</b>: churches, charities, neighbors.") + ln("⚠️", "Federal handouts make people depend on Washington.")),
      ask: "How would Hoover want hunger handled?",
      options: ["By local charities and neighbors helping", "By federal checks to every family", "By the U.S. Army running soup lines", "By each family alone, with no help"],
      miss: ["Federal checks = Washington. Hoover said no.", "The Army is federal too. Reread ⛪.", "Not NO help. Who does ⛪ say should help?"],
      hint: "Reread the ⛪ line.",
      reveal: "Hoover: help should come from <b>neighbors, not Washington</b>." },

    { id: "e1", type: "event", p: 0, date: "1931", kicker: "Spring 1931 · Bank rumor", short: "Bank rumor (1931)",
      scene: () => `<figure class="photo"><img src="img/bankrun.jpg" alt="A real crowd packed outside a bank, trying to get their money out, early 1930s" width="587" height="477"><figcaption>A real bank run, early 1930s · public domain</figcaption></figure>` +
        ln("🌽", "Corn prices crash.") + ln("🗣️", "Rumor: the town bank is in trouble.") + ma("“All $300 we saved is in that bank.”"),
      ask: "What do the Brenners do?",
      cards: [
        { icon: "🏃", t: "Pull it all out", line: "Grab the $300 now", label: "Pull all the savings out now", fx: { home: 1, nbr: -1 }, res: "You get your $300. But the rush closes the bank. Neighbors who waited lose theirs.", cause: "Pulled all savings out" },
        { icon: "🤞", t: "Leave it in", line: "Trust the bank", label: "Leave it. The bank will be fine.", fx: { home: -3, nbr: 0 }, res: "The bank closes anyway. Your $300 is gone. Savings had no insurance yet.", cause: "Left savings in the bank" },
        { icon: "✂️", t: "Take half", line: "$150 out, $150 in", label: "Take out half and leave half", fx: { home: -1, nbr: 0 }, res: "The bank fails a month later. You keep $150 and lose $150.", cause: "Took out half" }
      ],
      reveal: "<b>Bank run</b>: everyone pulls cash at once, so banks fail. Hundreds of Iowa banks closed." },

    // ===== 🚜 Farm revolt =====
    { id: "r1", type: "check", p: 1, std: "US.25", date: "1932", kicker: "1932 · Hoover tries", short: "What Hoover actually did", stamp: "FACT CHECKED",
      scene: () => ex("What Hoover did, 1929–1932", ln("🤝", "Asked bosses not to cut pay") + ln("🏗️", "Building projects, like Hoover Dam") + ln("🏦", "<b>RFC</b> (1932): loans to banks and businesses") + ln("🚫", "No federal money to jobless families")) +
        ex("Meanwhile", ln("🏚️", "Tin-shack camps get a nickname: <b>“Hoovervilles.”</b>")),
      ask: "Which is TRUE about Hoover?",
      options: ["He made RFC loans but avoided direct aid to people", "He did nothing to fight the Depression", "He used RFC loans to pay jobless families", "He started Social Security for retired workers in 1932"],
      miss: ["He did act: RFC loans, building projects.", "RFC loans went to banks and businesses. Look at 🚫.", "Social Security came later, under FDR."],
      hint: "Read 🏦 and 🚫 together.",
      reveal: "<b>Direct relief</b> = money or food straight to people. Hoover said no." },

    { id: "e2", type: "event", p: 1, date: "1932", kicker: "Fall 1932 · Farm auction", short: "Farm Holiday / penny auction (1932)",
      scene: () => `<div class="poster"><p class="ptop">SHERIFF'S SALE</p><p class="pbig">KOWALSKI FARM</p><p>Cows · Tools · Tractor</p><p class="pdate">Tuesday · 10 A.M.</p></div>` +
        ln("🌽", "Corn: about <b>10¢ a bushel</b>. It costs more to grow.") + ln("📣", "Iowa's <b>Farmers' Holiday</b>: stop selling, stop auctions.") +
        pa("“The Kowalskis can't pay the loan. Do we help?”"),
      ask: "What do the Brenners do?",
      cards: [
        { icon: "🪙", t: "Penny auction", line: "Bid pennies, give it back", label: "Join a \"penny auction\" to save the neighbors' farm", fx: { home: 0, nbr: 2 }, res: "A crowd bids pennies and scares off real buyers. The Kowalskis get their cows and tools back. Some auctions turned to threats.", cause: "Joined a penny auction" },
        { icon: "🚧", t: "Farm strike", line: "Block the roads to market", label: "Join the farm strike blocking roads to market", fx: { home: -1, nbr: 1 }, res: "You help block a highway so crops can't reach market. Fights break out. Prices barely move.", cause: "Joined the farm strike" },
        { icon: "🏠", t: "Stay home", line: "Hope things get better", label: "Stay home and hope things get better", fx: { home: -1, nbr: -1 }, res: "The Kowalskis lose everything. Neighbors notice who stayed home.", cause: "Stayed home" }
      ],
      reveal: "<b>Farmers' Holiday</b>: Iowa farmers fought low prices and lost farms themselves." },

    { id: "r3", type: "check", p: 1, std: "US.27", date: "1932", kicker: "Aug. 1932 · Iowa news", short: "Farm Holiday viewpoint", stamp: "GOT IT",
      scene: () => `<div class="paper"><p class="mast">THE CEDAR COUNTY CALL</p><p class="dateline">August 1932 · 2¢</p><p class="hl">FARMERS BLOCK IOWA ROADS</p></div>` +
        ex("Iowa farmers in 1932", ln("📉", "Corn: about 10¢ a bushel") + ln("🏦", "Banks taking farms") + ln("🏛️", "Washington: loans to banks, no direct aid")),
      ask: "What does the Farm Holiday show about many Iowa farmers?",
      options: ["They felt the government wasn't helping, so they acted", "They wanted lower crop prices so city food stayed cheap", "They trusted local banks to fix things on their own", "They wanted to quit farming and move to the cities"],
      miss: ["They wanted HIGHER prices. 10¢ was ruining them.", "Banks were taking their farms. Not much trust.", "They blocked roads to save their farms, not leave."],
      hint: "Why would farmers block roads and stop auctions themselves?",
      reveal: "Desperate farmers acted on their own when help didn't come." },

    // ===== 🏛️ New Deal =====
    { id: "vote", type: "news", p: 2, date: "1932–33", kicker: "Nov. 1932 · Election",
      scene: () => ex("1932 vote · Iowa", chart([["FDR", 58, "f", "58%"], ["Hoover", 40, "h", "40%"]]), "Iowa election returns, 1932") +
        ln("🗳️", "Even Hoover's home state picks <b>FDR</b>.") +
        radio("📻 FDR · MARCH 4, 1933", `<p class="rq">“This Nation asks for action, and action now.”</p>`),
      body: () => `<p class="ask">FDR's <b>New Deal</b> had 3 goals:</p><div class="rs"><div><span>🍞</span><b>Relief</b><small>help now</small></div><div><span>🔧</span><b>Recovery</b><small>fix the economy</small></div><div><span>📜</span><b>Reform</b><small>new rules so it can't happen again</small></div></div>`,
      reveal: "Reform example: the <b>FDIC</b> (1933) insures bank savings. Bank runs mostly stop." },

    { id: "n2", type: "check", p: 2, std: "US.25", date: "1933", kicker: "1933 · Help for farms", short: "AAA = Recovery", stamp: "GOT IT",
      scene: () => say("🧑‍🌾", "Henry A. Wallace · from Orient, Iowa", "FDR's Secretary of Agriculture (top farm boss). His team runs the AAA.") +
        ex("AAA · Agricultural Adjustment Act (1933)", ln("💵", "Pays farmers to grow <b>less</b>") + ln("📈", "Less corn and hogs → higher prices") + ln("🐖", "1933: kills about 6 million young pigs. Hungry people are angry."), "Federal Reserve Bank of Minneapolis"),
      ask: "Which “R” is the AAA?",
      options: ["Recovery", "Relief", "Reform"],
      miss: ["Relief is help right now, like food. The AAA fixes prices.", "Reform is a lasting new rule, like bank insurance."],
      hint: "Is it fixing farm prices, giving help now, or making a new rule?",
      reveal: "<b>AAA</b> = Recovery: raise farm prices so farms earn again." },

    { id: "e3", type: "event", p: 2, date: "1935", kicker: "1935 · A choice for Vern", short: "Son joins the CCC? (1935)",
      scene: () => `<div class="poster ccc"><p class="ptop">U.S. CIVILIAN CONSERVATION CORPS</p><p class="pbig">🌲 PLANT · BUILD · PROTECT</p><p>Ages 18–25 · $30 a month</p><p class="pdate">$25 of it mailed home to family</p></div>` +
        say("🧑", "Vern Brenner · 19", "“I could plant trees and build parks. Or stay here?”"),
      ask: "What should Vern do?",
      cards: [
        { icon: "🌲", t: "Join the CCC", line: "$25 a month home", label: "Join the CCC", fx: { home: 2, nbr: 1 }, res: "$25 a month pays bills. Vern helps build trails at Backbone State Park.", cause: "Vern joined the CCC" },
        { icon: "🚜", t: "Stay on the farm", line: "Help Pa, no pay", label: "Stay and work on the family farm", fx: { home: 0, nbr: 0 }, res: "Vern's help is useful, but no extra money comes in.", cause: "Vern stayed on the farm" },
        { icon: "🚂", t: "Ride the rails", line: "Hop trains to find work", label: "Ride the rails to look for city work", fx: { home: -1, nbr: 0 }, res: "Vern finds very little work. Train-hopping was dangerous.", cause: "Vern rode the rails" }
      ],
      reveal: "<b>CCC</b>: federal jobs for young men. Most of the pay went home." },

    { id: "n5", type: "check", p: 2, std: "US.27", date: "1936", kicker: "1936 · Two views", short: "Criticism of the New Deal", stamp: "BOTH SIDES",
      scene: () => vs(`<p class="vsh">👍 Supporters said</p>` + ln("🍞", "It fed hungry people") + ln("🔨", "WPA (run by Iowan Harry Hopkins): about 8.5 million jobs") + ln("🏦", "Banks are safe now"),
        `<p class="vsh">👎 Critics said</p>` + ln("🏛️", "Washington got too big") + ln("💸", "It ran up huge debt") + ln("📋", "It bossed farmers and businesses"), ["pro", "con"]) +
        src("Hoover himself warned the New Deal threatened freedom."),
      ask: "Which would a New Deal CRITIC say?",
      options: ["It made the federal government too big and costly", "It refused to give people any direct relief", "It left farm prices to the free market", "It cut the size of the federal government and its debt"],
      miss: ["That was the complaint about Hoover, not FDR.", "The AAA set farm prices. Not free market.", "Critics said the opposite: bigger and more debt."],
      hint: "Read the 👎 side.",
      reveal: "People still argue: <b>how much should government do</b> in a crisis?" },

    { id: "n6", type: "check", p: 2, std: "US.27", date: "1938", kicker: "1938 · Compare the plans", short: "Biggest Hoover vs. FDR difference", stamp: "CASE CLOSED",
      scene: () => vs(`<p class="vsh">🌽 Hoover's plan</p>` + ln("🏦", "RFC loans to banks, businesses") + ln("⛪", "Charities and neighbors feed people") + ln("🚫", "No federal checks to families"),
        `<p class="vsh">🏛️ FDR's plan</p>` + ln("🌲", "CCC paychecks to families") + ln("💵", "AAA payments to farmers") + ln("🏦", "Kept the RFC going")),
      ask: "Both wanted to end the Depression. What was the BIGGEST difference?",
      options: ["How much direct help the federal government gave people", "Whether the Depression was a serious problem", "Whether to build big public works projects", "Whether businesses should get federal loans during the crisis"],
      miss: ["Both saw a real crisis. Both acted.", "Both built: Hoover Dam, then the WPA.", "Look at 🏦 on both sides. Both did that."],
      hint: "Compare 🚫 with 🌲 and 💵.",
      reveal: "<b>Hoover</b>: voluntary and local help. <b>FDR</b>: Washington helps people directly." },

    { id: "end", type: "ending", p: 2, date: "1938", kicker: "1938 · How the Brenners did" },
    { id: "write", type: "write", p: 2, date: "1938", kicker: "Your letter to the paper" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const EVENTS = STEPS.filter(s => s.type === "event");

  // Writing ids, shorts and starters kept from the old version (dashboard labels).
  const PROMPTS = [
    { id: "fit", short: "Hoover or FDR: which fit the crisis better?", label: "1. Your letter: Whose response fit the crisis better, Hoover's or FDR's? Use one program or event as proof.",
      bank: ["🏦 RFC", "⛪ voluntary help", "🏚️ Hoovervilles", "🐖 AAA", "🌲 CCC", "🔨 WPA", "🏦 FDIC"],
      stem: "I think ___'s response fit better because ___. For example, ___.", min: 80, newWords: 6,
      mustAll: [["hoover", "fdr", "roosevelt", "new deal"], ["because", "since"], ["rfc", "loan", "voluntary", "charit", "neighbor", "local", "dam", "hooverville", "aaa", "ccc", "wpa", "fdic", "bank", "relief", "pig", "hog", "price", "job", "debt", "social security", "farm", "auction", "strike", "direct"]],
      mustMsg: "In answer 1, name Hoover or FDR, say why (use “because”), and give one program or event from today (like the RFC, CCC, or AAA)." },
    { id: "iowan", short: "One Iowan's contribution", label: "2. Iowa hero card: Pick Hoover, Wallace, or Hopkins. How did they try to help people?",
      bank: ["🌽 Hoover · West Branch", "🧑‍🌾 Wallace · Orient", "🔨 Hopkins · Sioux City"],
      stem: "___ tried to help people by ___.", min: 60, newWords: 5,
      mustAll: [["hoover", "wallace", "hopkins"], ["help", "food", "farm", "job", "work", "relief", "price", "hungry", "starv"]],
      mustMsg: "In answer 2, name Hoover, Wallace, or Hopkins and say how they helped (food, farms, jobs, or relief).",
      pairs: { hoover: ["food", "feed", "fed", "belgium", "war", "hungry", "starv", "rfc", "loan", "dam", "charit", "voluntary", "neighbor", "humanitarian", "wage", "pay"],
        wallace: ["aaa", "farm", "price", "pig", "hog", "crop", "corn", "grow", "agricultur"],
        hopkins: ["wpa", "job", "work", "relief", "employ"] },
      pairMsg: "In answer 2, use something that Iowan really did (Hoover: WWI food or RFC · Wallace: AAA · Hopkins: WPA jobs)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: { home: START.home, nbr: START.nbr }, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false });
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

  const homeNow = () => clamp(st.fx.home);
  const nbrNow = () => clamp(st.fx.nbr);
  const partDone = i => STEPS.filter(s => s.p === i && ["check", "event", "news"].includes(s.type)).every(s => s.type === "check" ? st.done[s.id] : s.type === "event" ? st.picks[s.id] != null : st.step > STEPS.indexOf(s));

  // ---------------- HUD ----------------
  const famMood = h => h >= 8 ? "😄" : h >= 6 ? "🙂" : h >= 4 ? "😟" : "😢";
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const h = homeNow(), n = nbrNow();
    $("homeFill").style.width = (h * 10) + "%"; $("homeNum").textContent = h + "/10";
    $("nbrFill").style.width = (n * 10) + "%"; $("nbrNum").textContent = n + "/10";
    $("famFace").textContent = famMood(h);
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
  const snap = () => ({ h: homeNow(), n: nbrNow() });
  function moved(before) {
    hud();
    bump("mHome", homeNow() - before.h);
    bump("mNbr", nbrNow() - before.n);
  }
  const fxBits = fx => [fx.home ? ["🏠", fx.home] : null, fx.nbr ? ["🤝", fx.nbr] : null].filter(Boolean);
  function fxChips(fx) {
    const b = fxBits(fx);
    if (!b.length) return `<span class="fx n">🏠 ±0</span>`;
    return b.map(([ic, v]) => `<span class="fx ${v > 0 ? "g" : "b"}">${ic} ${v > 0 ? "+" : "−"}${Math.abs(v)}</span>`).join("");
  }
  const fxPlain = fx => "(" + (fxBits(fx).map(([ic, v]) => ic + " " + (v > 0 ? "+" : "−") + Math.abs(v)).join(" ") || "±0") + ")";
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
    const termsBtn = off ? "" : `<button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Word help</button>`;
    app.innerHTML = `<div class="board"><div class="scene" id="scene"><p class="kick">${esc(step.kicker)}</p>${sceneHtml}</div>
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
    if (nx.type === "ending") return "See how the Brenners did ▶";
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
      <div class="tart" aria-hidden="true">${farmArt()}
        <div class="fam"><span>👨‍🌾</span><span>👩‍🌾</span><span>🧑</span><span>👧</span><span>👦</span></div>
        ${ma("“We are not losing this farm.”")}
      </div>
      <div class="tcopy">
        <p class="tk">U.S. History · Unit 1 · Day 3</p>
        <h1>Hoover vs. the New Deal</h1>
        <p class="hook">1929. The crash hits Iowa. Two presidents. Two plans. One farm to save.</p>
        <ul class="how"><li><span>🔍</span>Read the clues</li><li><span>🏠</span>Make the family's calls</li><li><span>⚖️</span>Compare the two plans</li></ul>
        <p class="tline">🎯 Goal: keep 🏠 Home and 🤝 Neighbors high until 1938.</p>
        <p class="tchips"><span>⏱️ 25 min</span><span>🔍 7 checks</span><span>🏠 3 big calls</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Start in 1928 🌽</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The Brenners, Kowalskis, and the newspaper are made up. The presidents, programs, Iowans, and numbers are real. Standards: SS.9-12.US.25, US.27, US.28.</p>
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
    st.fx.nbr = clamp(st.fx.nbr - 1);
    st.lockUntil = Date.now() + LOCK * 1000;
    st.lockMsg = why;
    save(); moved(before);
    stamp("BAD INFO 🤝 −1", "bad");
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    st.done[step.id] = true; save(); hud();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check ----
  function check(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div class="replies${step.options.length === 3 ? " three" : ""}" id="replies"></div>${step === CHECKS[0] ? `<p class="peek">🤝 Wrong answers spread bad info: Neighbors −1.</p>` : ""}<p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
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
    markWrong(step, why);
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why, $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Got it</small></div>`;
    document.querySelectorAll("#play .peek").forEach(p => p.remove());
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- News beat (no question) ----
  function news(step) {
    shell(step, step.scene(), `${step.body()}<div id="after"></div>`);
    addNext(step, step.reveal, true);
  }

  // ---- Event: a family choice ----
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><span class="dline">${esc(c.line)}</span></button>`; }).join("")}</div>${step === EVENTS[0] ? `<p class="peek">🏠 🤝 You'll see what happens after you pick.</p>` : ""}`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      const before = snap();
      st.picks[step.id] = i;
      st.fx.home = clamp(st.fx.home + (c.fx.home || 0));
      st.fx.nbr = clamp(st.fx.nbr + (c.fx.nbr || 0));
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span><b>${esc(c.t)}</b><br><span class="dline">${esc(c.line)}</span></span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${esc(c.res)}</p>`;
    const net = (c.fx.home || 0) + (c.fx.nbr || 0);
    if (!quiet) stamp(net > 0 ? "HOLDING ON" : net < 0 ? "HARD TIMES" : "GETTING BY", net > 0 ? "" : net < 0 ? "bad" : "mid");
    addNext(step, step.reveal, quiet);
  }

  // ---- Endings (no wrong-answer counts shown) ----
  function ending() {
    const h = homeNow(), n = nbrNow();
    let e;
    if (h >= GOAL.home && n >= GOAL.nbr) e = { key: "Pulled Through", out: "Pulled through together", icon: "🌾", cls: "best", text: "It's 1938. The farm is still yours. The Brenners and their neighbors made it, together." };
    else if (h >= GOAL.home) e = { key: "Made It Alone", out: "Kept the farm, lost the neighbors", icon: "🏚️", cls: "mid", text: "The farm survives. But neighbors keep their distance. Next hard year, who will help?" };
    else if (n >= GOAL.nbr) e = { key: "Neighbors Carried Us", out: "Neighbors kept them going", icon: "🤝", cls: "mid", text: "Money ran out. Neighbors brought food and lent tools. The farm hangs on by a thread." };
    else e = { key: "Farm Sold", out: "Farm sold", icon: "🚚", cls: "low", text: "The Brenners sell the farm and move to Cedar Rapids for work. Many Iowa families lost farms in these years." };
    e.causes = EVENTS.filter(s => st.picks[s.id] != null).map(s => { const k = s.cards[st.picks[s.id]]; return k.cause + " " + fxPlain(k.fx); });
    if (Object.keys(st.wrong).length) e.causes.push("Bad info spread in town (🤝 down)");
    return e;
  }

  function endingStep(step) {
    const e = ending();
    shell(step, `${farmArt()}<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">🏠 Home ${homeNow()}/10 · 🤝 Neighbors ${nbrNow()}/10</p></div><div id="after"></div>`);
    const b = nextBtn(step); b.textContent = "✏️ Write your letter ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `<div class="typed"><p class="cbh">✉️ To: The Cedar County Call · 1938</p><p><b>From:</b> ${esc(st.name)}</p><p><b>Your farm:</b> ${e.icon} ${esc(e.key)}</p></div>` +
        vs(`<p class="vsh">🌽 Hoover</p>` + ln("🏦", "RFC loans") + ln("⛪", "Voluntary, local help"), `<p class="vsh">🏛️ FDR</p>` + ln("🌲", "CCC, WPA jobs") + ln("🐖", "AAA farm payments")),
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: say what the OTHER side would argue back.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Mail it + turn in ▶"}</button>
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
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas in answer " + n + ". Use details from the game.");
      const has = w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v) + " ");
      if (p.mustAll.some(g => !g.some(has))) return bad(p.mustMsg);
      if (p.pairs) { const named = Object.keys(p.pairs).filter(has); if (named.length && !named.some(k => p.pairs[k].some(has))) return bad(p.pairMsg); }
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    // Same shape and labels as the old UnitGame turn-in.
    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    STEPS.forEach(s => {
      if (s.type === "event" && st.picks[s.id] != null) answers["Choice · " + s.short] = s.cards[st.picks[s.id]].label;
      if (s.type === "check") { const w = st.wrong[s.id]; answers[s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); }
    });
    answers["Family stability meter"] = homeNow() + " of 10";
    answers["Neighbors meter"] = nbrNow() + " of 10";
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Letter mailed!"; msg.className = "msg good";
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
    if (step.type === "news") return news(step);
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
