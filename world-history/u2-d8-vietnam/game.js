// =====================================================================
//  VIETNAM: WHO SHOULD DECIDE A NATION'S FUTURE?  (World History · Unit 2 · Day 6)
//  Polish of the original UnitGame version (same premise: you advise U.S. leaders at
//  four turning points, watch the war-risk meter, see what really happened, and ask
//  who really decided). Page-only engine so it looks like a game: a map of Vietnam
//  that changes (colony → declaration → war → split → coup), a "Who decided?" tracker,
//  war risk vs. clout meters, decision cards, stamps.
//  7 checks (WH.36 ×3, WH.37 ×2, WH.34 ×2; every day goal covered), 4 decisions, 4 endings, 2 writing answers.
//  Turning point 4 is now the 1963 coup (was the 1964 Gulf of Tonkin vote) and the domino
//  and Tonkin checks were cut, so this game doesn't repeat U.S. History's Vietnam game.
//  Same assignmentId as the old version. Turn-in via shared/turnin.js.
// =====================================================================
(function () {
  "use strict";
  const KEY = "wh-u2-d8-vietnam-v2";
  const ASSIGNMENT_ID = "wh-u2-d8-vietnam";
  const TITLE = "World History · Unit 2 · Day 6 · Vietnam: Who Should Decide a Nation's Future?";
  const STANDARD = "SS.9-12.WH.36, SS.9-12.WH.37, SS.9-12.WH.34";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;            // seconds locked after a wrong answer
  const START = { risk: 4, clout: 7 };
  const WRONG_CLOUT = 1;     // each wrong answer: leaders trust your intel less
  const GOAL = { risk: 2, clout: 4 };

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ex = (tab, inner, cite) => `<div class="exhibit"><span class="etab">${tab}</span>${inner}${cite ? src(cite) : ""}</div>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const say = (who, t, cls) => `<div class="say ${cls || ""}"><span class="who-s">${who}</span>${t}</div>`;
  const cap = t => `<p class="cap">${t}</p>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  const bars = rows => `<div class="chart">${rows.map(r => `<div class="br"><span>${r[0]}</span><span class="tr"><span class="${r[2] || ""}" style="width:${r[1]}%"></span></span><span>${r[3]}</span></div>`).join("")}</div>`;

  // ---------------- The map (stylized; lon/lat → SVG) ----------------
  const P = (lon, lat) => [((lon - 101.8) * 34).toFixed(1), ((23.6 - lat) * 34).toFixed(1)];
  const OUTLINE = [[102.15,22.4],[102.5,22.75],[103.3,22.75],[103.95,22.55],[104.8,22.85],[105.5,23.25],[106.1,22.95],[106.7,22.85],[106.6,22.35],[107.3,21.95],[108.0,21.55],
    [107.4,21.25],[106.8,20.75],[106.5,20.25],[106.0,19.95],[105.85,19.4],[105.7,18.9],[106.1,18.25],[106.5,17.65],[107.1,16.95],[107.6,16.5],[108.2,16.1],[108.7,15.4],[109.0,14.6],[109.25,13.8],[109.3,12.9],[109.2,12.0],[108.9,11.3],[108.4,11.0],[107.5,10.45],[106.8,10.35],[106.6,9.8],[106.0,9.3],[105.3,8.6],[104.8,8.65],[104.85,9.6],[104.5,10.4],
    [105.1,10.95],[105.9,11.05],[106.4,11.6],[107.1,12.2],[107.55,12.7],[107.55,13.9],[107.4,14.7],[107.6,15.3],[107.2,15.85],[106.7,16.4],[106.3,16.9],[105.6,17.6],[105.0,18.3],[104.3,18.8],[103.9,19.25],[104.5,19.6],[104.1,20.0],[104.4,20.4],[103.7,20.7],[103.1,20.85],[102.8,21.4],[102.15,21.6]];
  const PATH = "M" + OUTLINE.map(p => P(p[0], p[1]).join(",")).join("L") + "Z";
  const Y17 = P(0, 17)[1];
  const at = (lon, lat, txt, cls) => { const [x, y] = P(lon, lat); return `<text x="${x}" y="${y}" class="${cls || ""}" text-anchor="middle" dominant-baseline="middle">${txt}</text>`; };
  const dot = (lon, lat, name, dx) => { const [x, y] = P(lon, lat); return `<circle cx="${x}" cy="${y}" r="4.5" class="city"/><text x="${+x + (dx || 8)}" y="${+y + 4}" class="cname" text-anchor="${dx < 0 ? "end" : "start"}">${name}</text>`; };
  // map states: colony · declare · war · dbp · split · vote · coup
  function mapSvg(m, yr) {
    const split = ["split", "vote", "coup"].includes(m);
    const fill = { colony: "#9fb3d9", declare: "#f2c94c", war: "#eb9b5c", dbp: "#eb9b5c" }[m];
    const body = split
      ? `<rect x="0" y="0" width="280" height="${Y17}" fill="#d9544f" clip-path="url(#vnc)"/><rect x="0" y="${Y17}" width="280" height="520" fill="#4f7fd9" clip-path="url(#vnc)"/>`
      : `<path d="${PATH}" fill="${fill}"/>`;
    const extra = [];
    if (m === "colony") extra.push(at(106.2, 15.3, "🇫🇷", "emo big"), at(105.5, 13.9, "FRENCH", "lab"), at(105.5, 13.3, "COLONY", "lab"));
    if (m === "declare") extra.push(at(105.85, 22.0, "⭐", "emo big pulse"), at(105.0, 14.3, "FREE?", "lab"));
    if (m === "war" || m === "dbp") extra.push(at(105.4, 15.0, "⚔️", "emo big"), at(106.0, 12.6, "🇫🇷 vs ⭐", "lab sm"));
    if (m === "dbp") extra.push(at(103.02, 21.39, "💥", "emo boom"), `<text x="6" y="${P(103.0, 20.75)[1]}" class="cname">Dien Bien</text><text x="6" y="${+P(103.0, 20.75)[1] + 14}" class="cname">Phu</text>`);
    if (split) extra.push(`<line x1="0" y1="${Y17}" x2="280" y2="${Y17}" class="p17"/><text x="276" y="${Y17 - 6}" class="p17t" text-anchor="end">17th parallel</text>`,
      at(104.6, 19.2, "NORTH", "lab"), at(104.6, 18.5, "Ho · ☭", "lab sm"), at(106.6, 13.2, "SOUTH", "lab"), at(106.6, 12.5, "Diem · 🇺🇸", "lab sm"));
    if (m === "vote") extra.push(at(108.4, 18.0, "🗳️", "emo big"), at(108.4, 18.0, "❌", "emo x"));
    if (m === "coup") extra.push(at(106.2, 11.6, "🔥", "emo fire"), at(107.9, 14.4, "🔥", "emo fire d2"), at(105.4, 9.6, "🔥", "emo fire d3"), at(108.4, 12.0, "🪖", "emo mid"));
    return `<svg class="vnmap" viewBox="0 0 280 520" role="img" aria-label="Map of Vietnam, ${esc(yr)}${split ? ", split at the 17th parallel" : ""}">
      <defs><clipPath id="vnc"><path d="${PATH}"/></clipPath>
      <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#ffffff55" stroke-width="1"/></pattern></defs>
      <rect width="280" height="520" fill="#9fd3df"/><rect width="280" height="520" fill="url(#grid)"/>
      <text x="236" y="470" class="sea" text-anchor="middle">South</text><text x="236" y="484" class="sea" text-anchor="middle">China</text><text x="236" y="498" class="sea" text-anchor="middle">Sea</text>
      <text x="40" y="250" class="land" text-anchor="middle">LAOS</text><text x="60" y="380" class="land" text-anchor="middle">CAMBODIA</text><text x="250" y="40" class="land" text-anchor="middle">CHINA</text>
      ${body}<path d="${PATH}" fill="none" stroke="#1b2a24" stroke-width="2.2" stroke-linejoin="round"/>
      ${dot(105.85, 21.03, "Hanoi", 8)}${dot(106.7, 10.78, "Saigon", -8)}
      ${extra.join("")}
    </svg>`;
  }

  // ---------------- Who decided? (real history, fills in after each turning point) ----------------
  const TP = [
    { yr: "1945", id: "e1", icon: "🇫🇷", who: "France, with a U.S. OK" },
    { yr: "1954", id: "e2", icon: "🌐", who: "Diplomats at Geneva" },
    { yr: "1956", id: "e3", icon: "🏛️", who: "Diem + the U.S." },
    { yr: "1963", id: "e4", icon: "🪖", who: "South's generals, U.S. OK" }
  ];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] explains options[i+1]. event: fx moves risk + clout.
  const STEPS = [
    { id: "c1", type: "check", std: "WH.36", map: "colony", yr: "1930s", kicker: "1880s–1945 · French Indochina", short: "Why France held Vietnam", stamp: "INTEL FILED",
      scene: () => cap("France ruled Vietnam as a <b>colony</b>: a land run by another country.") +
        ex("French Indochina, 1930s", ln("🍚", "Rice → shipped out and sold") + ln("🌳", "Rubber → French-owned farms") + ln("👷", "Workers: low pay. Many died.")),
      ask: "Why did France want to keep Vietnam?",
      options: ["It made money for French owners", "Vietnam's rulers asked France for protection", "France planned free elections there", "France wanted Vietnam to rule itself"],
      miss: ["France took Vietnam by force. Nobody asked.", "Vietnamese got few rights and no free vote.", "Look who owned the plantations and got the money."],
      hint: "Follow the rice and rubber. Who got the money?",
      reveal: "<b>Colony</b>: France took the riches. Vietnamese got few rights." },

    { id: "c2", type: "check", std: "WH.37", map: "declare", yr: "1945", kicker: "Sept. 2, 1945 · Hanoi", short: "Why Ho quoted the U.S.", stamp: "INTEL FILED",
      scene: () => cap("WWII ends. <b>Ho Chi Minh</b>, a communist who wants independence, declares Vietnam free.") +
        ex("Ho's Declaration of Independence", `<p class="quote">“All men are created equal… endowed by their Creator with certain unalienable rights…”</p>`, "His first lines copy the U.S. Declaration of Independence. Unalienable = can't be taken away."),
      ask: "Why start with America's words?",
      options: ["To win U.S. support for a free Vietnam", "To show Vietnam would join the United States", "To prove he had turned against communism", "To warn America to stay out of Asia"],
      miss: ["He wanted Vietnam free, not part of another country.", "He was still a communist. His goal was independence.", "He was asking for America's help, not warning it."],
      hint: "Who did Ho hope would back a free Vietnam?",
      reveal: "<b>Nationalist</b>: wants their own people to rule their own nation." },

    { id: "e1", type: "event", map: "declare", yr: "1945", kicker: "Turning point 1 · Fall 1945", short: "1945 advice to Truman",
      scene: () => say("⭐ Ho's letters to the U.S.", "Recognize our independence.", "ho") + say("🇫🇷 France", "Vietnam is our colony. We're coming back.", "fr") +
        cap("The Cold War is starting. The U.S. wants France strong against the Soviet Union."),
      ask: "Advise President Truman.",
      cards: [
        { icon: "📨", t: "Recognize Vietnam", line: "Accept it as a free nation", fx: { risk: -2, clout: -1 }, res: "France is furious. Ho sees the U.S. as a friend.", cause: "Recognized Vietnam" },
        { icon: "🇫🇷", t: "Back France", line: "Help France return", fx: { risk: 2, clout: 1 }, res: "France is happy. Ho's side now sees the U.S. as an enemy.", cause: "Backed France" },
        { icon: "🙈", t: "Stay out", line: "Take no side", fx: { risk: 1, clout: 0 }, res: "Nobody stops France. War comes anyway.", cause: "Stayed out" }
      ],
      real: "Truman never answered Ho. France came back. War began in 1946." },

    { id: "c3", type: "check", std: "WH.36", map: "war", yr: "1946", kicker: "1946 · Two fights at once", short: "Cold War reason U.S. backed France", stamp: "INTEL FILED",
      scene: () => `<div class="row2">${ex("Europe", `<p class="big">🇺🇸🤝🇫🇷</p><p class="vs">vs.</p><p class="big">☭</p><p>Soviet Union</p>`)}${ex("Vietnam", `<p class="big">🇫🇷</p><p class="vs">vs.</p><p class="big">⭐</p><p>Ho's Viet Minh</p>`)}</div>`,
      ask: "Why did the U.S. let France take Vietnam back?",
      options: ["It wanted France as a Cold War ally", "It wanted Vietnam's rubber for itself", "Ho Chi Minh asked France to return", "Vietnamese voters chose to rejoin France"],
      miss: ["The rubber went to France. The U.S. wanted an ally.", "Ho declared independence FROM France.", "There was no vote. France came back by force."],
      hint: "What did the U.S. need in Europe?",
      reveal: "Cold War fears beat Vietnam's independence." },

    { id: "c4", type: "check", std: "WH.37", map: "dbp", yr: "1954", kicker: "1946–1954 · First Indochina War", short: "U.S. paid for France's war", stamp: "INTEL FILED",
      scene: () => cap("The <b>Viet Minh</b> (Ho's army) fight France for 8 years.") +
        ex("Who paid France's war bills by 1954?", bars([["🇺🇸 U.S.", 78, "us", "about ¾"], ["🇫🇷 France", 22, "fr", "about ¼"]]), "The U.S. paid up to 80% of France's war costs. U.S. Dept. of Defense, Vietnam War Commemoration"),
      ask: "What does this chart show?",
      options: ["France's war had become a Cold War fight", "The U.S. was paying Ho's army too", "France could win without outside help", "The U.S. wanted Vietnam as its colony"],
      miss: ["The money went to France, not to Ho's army.", "France needed U.S. money to keep fighting.", "The U.S. paid to stop communists, not to own Vietnam."],
      hint: "Why would the U.S. pay France to fight communists?",
      reveal: "May 1954: the Viet Minh beat France at <b>Dien Bien Phu</b>. France quits." },

    { id: "e2", type: "event", map: "dbp", mapAfter: "split", yr: "1954", kicker: "Turning point 2 · Geneva peace talks, 1954", short: "1954 Geneva advice",
      scene: () => say("🌐 Peace talks", "Ho's side won the war. Now what happens to Vietnam?", "dip") +
        cap("U.S. leaders fear the <b>domino theory</b>: if Vietnam goes communist, neighbors could too."),
      ask: "Advise the U.S. team at Geneva.",
      cards: [
        { icon: "✂️", t: "Split it for now", line: "Vote to reunite in 1956", fx: { risk: -1, clout: 1 }, res: "Each side gets half, for now. Everyone waits for the vote.", cause: "Split it for now" },
        { icon: "🏳️", t: "Winner takes all", line: "Ho rules all of Vietnam", fx: { risk: -2, clout: -2 }, res: "The fighting ends. U.S. leaders call you soft on communism.", cause: "Winner takes all" },
        { icon: "🧱", t: "Two countries for good", line: "No vote, ever", fx: { risk: 2, clout: 2 }, res: "The South stays anti-communist. The North is furious.", cause: "Two countries for good" }
      ],
      real: "Vietnam was split at the <b>17th parallel</b>. A vote to reunite was set for 1956. The U.S. didn't sign." },

    { id: "c5", type: "check", std: "WH.34", map: "split", yr: "1954", kicker: "The Geneva deal, 1954", short: "Geneva split = temporary", stamp: "MAP READ",
      scene: () => `<div class="row2">${ex("North", ln("☭", "Ho Chi Minh") + ln("🏙️", "Capital: Hanoi"), "")}${ex("South", ln("🇺🇸", "Ngo Dinh Diem, U.S.-backed") + ln("🏙️", "Capital: Saigon"))}</div>` +
        ex("Geneva's line", ln("〰️", "17th parallel: temporary")),
      ask: "The line was supposed to last how long?",
      options: ["Only until a vote in 1956", "Forever, as two countries", "Until France left Asia", "Until the U.N. drew new borders"],
      miss: ["Geneva called the line temporary. A vote would reunite.", "France was already leaving. The plan was a vote.", "The U.N. didn't run this deal. Geneva planned a vote."],
      hint: "Look back: what did Geneva plan for 1956?",
      reveal: "<b>17th parallel</b>: a temporary line on the map, not a border." },

    { id: "e3", type: "event", map: "split", mapAfter: "vote", yr: "1956", kicker: "Turning point 3 · July 1956", short: "1956 elections advice",
      scene: () => say("🏛️ Diem, South's leader", "No vote. The North isn't free. We never signed.", "diem") +
        cap("Experts expect Ho to win. Eisenhower later wrote that in 1954, maybe 80% would have voted Ho."),
      ask: "Advise President Eisenhower.",
      cards: [
        { icon: "🗳️", t: "Hold the vote", line: "Even if Ho wins", fx: { risk: -3, clout: -2 }, res: "Vietnam may reunite under Ho, by vote. U.S. leaders are furious.", cause: "Pushed for the vote" },
        { icon: "❌", t: "Cancel the vote", line: "Back Diem", fx: { risk: 2, clout: 1 }, res: "The South stays anti-communist. Many feel their vote was stolen.", cause: "Cancelled the vote" },
        { icon: "⏳", t: "Delay it", line: "Try new talks", fx: { risk: 1, clout: 0 }, res: "Nobody trusts the talks. The split hardens.", cause: "Delayed the vote" }
      ],
      real: "The U.S. backed Diem. The vote never happened." },

    { id: "c6", type: "check", std: "WH.36", map: "vote", yr: "1956", kicker: "Why no vote?", short: "Why the 1956 vote was cancelled", stamp: "INTEL FILED",
      scene: () => `<p class="bigart" aria-hidden="true">🗳️🔒</p>` + ex("July 1956", ln("📜", "Geneva promised a vote.") + ln("🚫", "No vote was held.") + ln("📊", "Eisenhower: in 1954, maybe 80% would have voted Ho.")),
      ask: "Why did Diem and the U.S. block the vote?",
      options: ["They expected Ho Chi Minh to win", "North Vietnam refused to take part", "Most Vietnamese didn't want a vote", "France still ruled the South"],
      miss: ["The North wanted the vote. It expected to win.", "Geneva promised one. Many felt robbed.", "France's last troops left the South in 1956."],
      hint: "Who was expected to win?",
      reveal: "No vote → anger → rebels in the South. The split led to more war." },

    { id: "e4", type: "event", map: "coup", yr: "1963", kicker: "Turning point 4 · Saigon, 1963", short: "1963 coup advice",
      scene: () => cap("Diem jails opponents. Protests spread. <b>Viet Cong</b> rebels, helped by the North, grow.") +
        ex("U.S. advisers (army trainers) in the South", bars([["Early 1961", 6, "us", "< 1,000"], ["End of 1963", 100, "us", "~16,000"]]), "JFK Presidential Library") +
        say("🪖 South's generals", "Diem must go. Will the U.S. stop us?", "gen"),
      ask: "Advise President Kennedy.",
      cards: [
        { icon: "🤫", t: "Let the generals act", line: "Don't stop their takeover", fx: { risk: 1, clout: 0 }, res: "Diem falls. New leaders come and go fast.", cause: "Let the generals act" },
        { icon: "🛡️", t: "Stand by Diem", line: "Protect him", fx: { risk: 2, clout: 1 }, res: "Protests grow. More people join the Viet Cong.", cause: "Stood by Diem" },
        { icon: "🚪", t: "Bring advisers home", line: "Leave it to Vietnam", fx: { risk: -2, clout: -2 }, res: "The U.S. steps back. Leaders call you weak on communism.", cause: "Brought advisers home" }
      ],
      real: "Generals overthrew and killed Diem, Nov. 1963. The U.S. didn't stop them. More takeovers followed." },

    { id: "c7", type: "check", std: "WH.34", map: "coup", yr: "1945–75", kicker: "The big picture", short: "Vietnam as Cold War map change", stamp: "INTEL FILED",
      scene: () => `<div class="row2">${ex("After 1945: colonies break free", ln("🇮🇳", "India, 1947") + ln("🇮🇩", "Indonesia, 1949") + ln("🇬🇭", "Ghana, 1957"))}${ex("Vietnam's war", ln("☭", "Soviets + China → help North") + ln("🇺🇸", "U.S. → helps South"))}</div>`,
      ask: "How does Vietnam fit this pattern?",
      options: ["A freedom fight got pulled into the Cold War", "The U.S. and Soviets fought each other head-on", "Colonies stayed under European rule for good", "The Cold War ended when Vietnam became free"],
      miss: ["They backed different sides. They never fought head-on.", "Look at the list: colonies broke free.", "The Cold War lasted until 1991."],
      hint: "Two big changes at once. What were they?",
      reveal: "<b>Decolonization</b> (colonies breaking free) + <b>Cold War</b> crashed together in Vietnam." },

    { id: "verdict", type: "verdict", map: "coup", yr: "1965", kicker: "Who decided?" },
    { id: "write", type: "write", map: "coup", yr: "1975", kicker: "Your memo for the history books" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const EVENTS = STEPS.filter(s => s.type === "event");

  const PROMPTS = [
    { id: "decide", short: "Who should have decided in 1956", label: "1. Who should have decided Vietnam's future in 1956? Why?",
      bank: ["🗳️ Vietnamese voters", "🏛️ Diem", "🇺🇸 the United States"],
      stem: "In 1956, ___ should have decided Vietnam's future because ___.", min: 70, newWords: 5,
      mustAll: [["voter", "vote", "people", "vietnamese", "diem", "united states", "u.s", "america", "election"], ["because", "since"]],
      mustMsg: "In answer 1, name WHO should have decided and explain WHY (use “because”)." },
    { id: "cause", short: "Independence or Cold War", label: "2. Was Vietnam's fight more about independence or the Cold War? Name one event as proof.",
      bank: ["📜 1945 declaration", "💵 U.S. paid France's war", "✂️ Geneva split", "❌ cancelled 1956 vote", "🪖 1963 coup"],
      stem: "I think it was more about ___. One event that shows this is ___.", min: 70, newWords: 5,
      mustAll: [["independence", "colony", "colonial", "france", "french", "cold war", "communis", "soviet", "domino"], ["1945", "1954", "1956", "1963", "declaration", "geneva", "election", "vote", "dien bien phu", "letter", "advisers", "paid", "coup", "diem", "17th", "split", "domino"]],
      mustMsg: "In answer 2, say independence or Cold War AND name one event from today (like Geneva or the 1956 vote)." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, fx: { risk: 0, clout: 0 }, picks: {}, wrong: {}, done: {}, writing: {}, turnedIn: false });
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

  const missTotal = () => Object.values(st.wrong).reduce((a, b) => a + b, 0);
  const riskNow = () => clamp(START.risk + (st.fx.risk || 0), 0, 10);
  const cloutNow = () => clamp(START.clout + (st.fx.clout || 0) - WRONG_CLOUT * missTotal(), 0, 10);

  // ---------------- HUD ----------------
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const r = riskNow(), c = cloutNow();
    $("riskFill").style.width = (r * 10) + "%"; $("riskNum").textContent = r + "/10";
    $("cloutFill").style.width = (c * 10) + "%"; $("cloutNum").textContent = c + "/10";
    $("youName").textContent = st.name;
    const cur = STEPS[Math.min(st.step, TOTAL - 1)];
    $("deciders").innerHTML = `<span class="dl">Who decided?</span>` + TP.map(t => {
      const done = st.picks[t.id] != null;
      return `<span class="dslot${done ? " done" : cur.id === t.id ? " now" : ""}" title="${done ? esc(t.yr + ": " + t.who) : t.yr}"><b>${t.yr}</b><i aria-hidden="true">${done ? t.icon : "?"}</i></span>`;
    }).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
  }
  function bump(id, delta, goodWhenUp) {
    const el = $(id); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + ((delta > 0) === goodWhenUp ? "good" : "bad");
    f.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  const snap = () => ({ r: riskNow(), c: cloutNow() });
  function moved(before) { hud(); bump("mRisk", riskNow() - before.r, false); bump("mClout", cloutNow() - before.c, true); }
  function fxChips(fx) {
    const out = [];
    if (fx.risk) out.push(`<span class="fx ${fx.risk < 0 ? "g" : "b"}">🔥 ${fx.risk > 0 ? "+" : "−"}${Math.abs(fx.risk)}</span>`);
    if (fx.clout) out.push(`<span class="fx ${fx.clout > 0 ? "g" : "b"}">🎖️ ${fx.clout > 0 ? "+" : "−"}${Math.abs(fx.clout)}</span>`);
    if (!fx.risk && !fx.clout) out.push(`<span class="fx n">no change</span>`);
    return out.join("");
  }
  const fxPlain = fx => "(" + ([fx.risk ? "🔥 " + (fx.risk > 0 ? "+" : "−") + Math.abs(fx.risk) : "", fx.clout ? "🎖️ " + (fx.clout > 0 ? "+" : "−") + Math.abs(fx.clout) : ""].filter(Boolean).join(" ") || "no change") + ")";
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function mapFor(step) { return step.mapAfter && st.picks[step.id] != null ? step.mapAfter : step.map; }
  function paintMap(step) { const t = $("mapbox"); if (t) t.innerHTML = `<span class="yflag">${esc(step.yr)}</span>` + mapSvg(mapFor(step), step.yr); }
  function shell(step, sceneHtml, playHtml) {
    app.innerHTML = `<div class="board">
      <div class="table" id="mapbox"></div>
      <div class="right"><div class="scene" id="scene"><p class="kick">${esc(step.kicker)}</p>${sceneHtml}</div>
      <div class="play" id="play">${playHtml}</div></div></div>`;
    paintMap(step);
  }
  function nextLabel(step) {
    const nx = STEPS[STEPS.indexOf(step) + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "event") return "🧭 " + nx.kicker.split(" · ")[0] + " ▶";
    if (nx.type === "verdict") return "See who decided ▶";
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
    if (html) a.insertAdjacentHTML("beforeend", html);
    a.appendChild(nextBtn(step));
    if (!quiet) { const n = $("nextBtn"); if (n && n.scrollIntoView) n.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  }

  // ---- Title ----
  function title() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title">
      <div class="tart" aria-hidden="true">${mapSvg("split", "1954")}
        <div class="tyears"><span>1945</span><span>1954</span><span>1956</span><span>1963</span></div></div>
      <div class="tcopy">
        <p class="tk">World History · Unit 2 · Day 6</p>
        <h1>Vietnam: Who Should Decide?</h1>
        <p class="hook">4 turning points. You advise. Who really decides?</p>
        <ul class="how"><li><span>🔍</span>Read the evidence</li><li><span>🧭</span>Advise U.S. leaders</li><li><span>🔥</span>Watch war risk + 🎖️ clout</li></ul>
        <p class="tline">🎯 Goal: explain how Vietnam's fight to be free from France became a Cold War fight.</p>
        <p class="tchips"><span>⏱️ 25 min</span><span>🔍 7 checks</span><span>🧭 4 decisions</span><span>✏️ 2 answers</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Enter the decision room 🧭</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">Real history. Bubbles sum up real positions. Endings are what-ifs. Standards: SS.9-12.WH.36, WH.37, WH.34.</p>
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

  // ---- Check: evidence check ----
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
    if (o.n === 0) {
      btn.classList.add("right");
      st.done[step.id] = true; save(); hud();
      try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
      setTimeout(() => solved(step, false), 450);
      return;
    }
    btn.classList.add("wrong");
    const before = snap();
    const why = (step.miss && step.miss[o.n - 1]) || step.hint;
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + LOCK * 1000; st.lockMsg = why;
    save(); moved(before);
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    $("replies").querySelectorAll("button").forEach(x => x.disabled = true);
    runLock(why + " (Bad intel: 🎖️ −1)", $("qmsg"), () => draw(step), LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ ${st.wrong[step.id] ? "Got it" : "Sharp intel"}</small></div>`;
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    if (step.id === "c4") { const m = $("mapbox"); if (m) m.classList.add("shakemap"); }
    addNext(step, reveal(step.reveal), quiet);
  }

  // ---- Event: a real decision ----
  function event(step) {
    shell(step, step.scene(), `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    $("dbox").innerHTML = `<div class="cards">${shuffle(step.cards.map((c, i) => i)).map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><b>${esc(c.t)}</b><small>${esc(c.line)}</small><span class="fxrow">${fxChips(c.fx)}</span></button>`; }).join("")}</div>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      const before = snap();
      st.picks[step.id] = i;
      st.fx.risk += c.fx.risk || 0;
      st.fx.clout += c.fx.clout || 0;
      save(); moved(before);
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    const t = TP.find(x => x.id === step.id);
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span>You advised: ${esc(c.t)}</span><span class="fxrow">${fxChips(c.fx)}</span></div><p class="result">${esc(c.res)}</p>
      <div class="real"><span class="real-b">Real</span> ${step.real}</div>
      <div class="decided${quiet ? "" : " flipin"}"><span class="dic" aria-hidden="true">${t.icon}</span><span><small>${t.yr} · Who really decided?</small><b>${esc(t.who)}</b></span></div>`;
    if (!quiet) { stamp(c.fx.risk > 0 ? "WAR RISK UP" : c.fx.risk < 0 ? "WAR RISK DOWN" : "NOTED", c.fx.risk > 0 ? "bad" : ""); paintMap(step); }
    addNext(step, null, quiet);
  }

  // ---- Endings ----
  function ending() {
    const r = riskNow(), c = cloutNow();
    let e;
    if (r <= GOAL.risk && c >= GOAL.clout) e = { key: "Vote, Not War", tag: "What if", icon: "🕊️", cls: "best", text: "Leaders listen to you. Vietnam reunites by a vote, and Ho likely wins. U.S. leaders hate it, but maybe no U.S. war." };
    else if (r <= GOAL.risk) e = { key: "Shown the Door", tag: "What if", icon: "🚪", cls: "mid", text: "Your advice was bold, but leaders stopped listening. Others made the calls. The war came anyway." };
    else if (r <= 6) e = { key: "Cold Standoff", tag: "What if", icon: "🧊", cls: "mid", text: "Vietnam stays split and angry. The fighting stays small, for now. Nobody asks Vietnam's voters." };
    else e = { key: "The Long War", tag: "Close to real history", icon: "🔥", cls: "low", text: "Your advice matches what U.S. leaders really did. The war grows." };
    const causes = EVENTS.filter(s => st.picks[s.id] != null).map(s => { const k = s.cards[st.picks[s.id]]; return k.cause + " " + fxPlain(k.fx); });
    const w = missTotal();
    if (w) causes.push("Bad intel cost you clout");
    if (r <= GOAL.risk && c < GOAL.clout) causes.push("🎖️ Clout fell under " + GOAL.clout);
    e.causes = causes;
    return e;
  }
  function deciderBoard() {
    return `<div class="dboard">${TP.map(t => `<div><b>${t.yr}</b><span aria-hidden="true">${t.icon}</span><small>${esc(t.who)}</small></div>`).join("")}
      <div class="nobody"><b>Ever</b><span aria-hidden="true">🗳️</span><small>Vietnamese voters: never asked</small></div></div>`;
  }
  function verdict(step) {
    const e = ending();
    shell(step, `${deciderBoard()}<div class="endcard ${e.cls}"><span class="etag">${esc(e.tag)}</span><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
      `<div class="cause"><p class="ch">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul><p class="endm">🔥 War risk ${riskNow()}/10 · 🎖️ Clout ${cloutNow()}/10</p></div>
       <div class="real"><span class="real-b">Real</span> 1965: U.S. combat troops arrive. 1975: the North wins. Vietnam becomes one communist country. About 58,000 Americans and millions of Vietnamese died.</div><div id="after"></div>`);
    stamp(e.key.toUpperCase(), (e.cls === "best" ? "" : "bad") + " huge");
    const b = nextBtn(step); b.textContent = "✏️ Write your memo ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step, `${deciderBoard()}<div class="clip"><p class="cbh">📋 Memo for the history books</p><p><b>Your ending:</b> ${e.icon} ${esc(e.key)}</p></div>`,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="3" placeholder="1–2 full sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <p class="src">Go deeper: explain a cause and its effect.</p>
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Sign the memo + turn in ▶"}</button>
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
      const n = PROMPTS.indexOf(p) + 1;
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
      if (p.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return bad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    STEPS.forEach(s => {
      if (s.type === "event" && st.picks[s.id] != null) answers["Choice · " + s.short] = s.cards[st.picks[s.id]].t;
      if (s.type === "check") {
        const w = st.wrong[s.id];
        answers[s.std + " · " + s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    answers["Ending"] = e.key + " (" + e.tag + ")";
    answers["Caused by"] = e.causes.join(" · ");
    answers["War risk meter"] = riskNow() + " of 10";
    answers["Clout (end)"] = cloutNow() + " of 10";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Memo filed!"; msg.className = "msg good";
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
})();
