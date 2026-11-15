// =====================================================================
//  THE APPEAL · Level 2: Strike It Down  (Government Unit 3 · Day 2 · Judicial Review)
//  Same game as Level 1 (civics/gov-u3-d1-the-appeal), new docket. The student is now a
//  justice on the U.S. Supreme Court, and in each case a LAW or RULE is on trial:
//  Tinker v. Des Moines (armband rule, 1st, struck 7-2), Ewing v. California (three strikes,
//  8th, stands 5-4), Vernonia v. Acton (athlete drug tests, 4th, stands 6-3),
//  Roper v. Simmons (death penalty under 18, 8th, struck 5-4, overturning the Court's 1989 ruling).
//  Two laws fall and two stand, so "always strike" and "always let it stand" each lose twice.
//  Each case: read the file (check) -> read the Constitution's words (check) -> vote.
//  The vote moves Public Trust. Then the real vote opens: MAJORITY, OUTVOTED or WENT TOO FAR.
//  7 checks (all Gov.8), 4 votes, 5 endings, 1 writing answer.
//  The judge they built on Day 1 carries over (read from the Day 1 save on this Chromebook).
//  Real: the cases, the laws, the votes, what happened next.
//  Made up: the student's seat on the Court, Kane, the headlines, the trust meter.
//  Layout, courtroom drawing, photo spots, Test T. hook and turn-in work exactly like Level 1.
// =====================================================================
(function () {
  "use strict";
  const KEY = "gov-u3-d2-the-appeal-v1";
  const DAY1_KEY = "gov-u3-d1-the-appeal-v2";   // the judge they built on Day 1
  const ASSIGNMENT_ID = "gov-u3-d2-the-appeal";
  const TITLE = "Government · Unit 3 · Day 2 · The Appeal: Strike It Down";
  const STANDARD = "SS.9-12.Gov.8";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;
  const START_TRUST = 5;
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());   // Test T. (teacher) skips locks and writing rules

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = n => Math.max(0, Math.min(10, n));

  // ---------------- Art helpers ----------------
  const src = t => `<p class="src">${t}</p>`;
  const ln = (ic, t) => `<p class="ln"><span class="ic" aria-hidden="true">${ic}</span><span>${t}</span></p>`;
  const row = (k, v) => `<p class="frow"><span class="fk">${k}</span><span class="fv">${v}</span></p>`;
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><div><p>${html}</p></div></div>`;
  const kane = t => `<div class="kane"><span class="kface" aria-hidden="true">👔</span><div class="say"><span class="who-s">Kane</span>${t}</div></div>`;

  const ladder = () => `<div class="ladder flow">
      <div class="rung"><span class="ri" aria-hidden="true">📜</span><div><b>1. Lawmakers pass a law</b><span>Congress, a state, or a school board makes a rule.</span></div></div>
      <div class="rarrow" aria-hidden="true">▼</div>
      <div class="rung"><span class="ri" aria-hidden="true">🙋</span><div><b>2. Someone says it breaks the Constitution</b><span>They take it to court.</span></div></div>
      <div class="rarrow" aria-hidden="true">▼</div>
      <div class="rung you"><span class="ri" aria-hidden="true">⚖️</span><div><b>3. Your Court compares the law to the Constitution</b><span>This power is called judicial review.</span></div><i class="youtag">YOU</i></div>
      <div class="rarrow" aria-hidden="true">▼</div>
      <div class="rtwo"><div class="rung ok"><b>✅ It fits</b><span>The law stands.</span></div><div class="rung no"><b>❌ It doesn't</b><span>The law is struck down.</span></div></div>
    </div>`;

  const file = c => `<div class="file"><span class="ftab">CASE FILE ${c.n} of ${CASES.length}</span>
      <div class="fhead"><span class="fmug" aria-hidden="true">${c.icon}</span><div><h2>${c.name}${c.age ? ", " + c.age : ""}</h2><p>${c.place}</p></div><span class="fstatus">${c.status}</span></div>
      ${row(c.chargeLabel || "Charge", c.charge)}
      <p class="fsec">${c.recLabel}</p>
      ${c.record.map(r => ln(r[0], r[1])).join("")}
      ${row(c.sentenceLabel || "Sentence", `<b>${c.sentence}</b>`)}
      ${c.extra ? `<p class="fextra">${c.extra}</p>` : ""}
      ${src("Real case. Real record.")}</div>`;

  const amend = c => `<div class="amend"><span class="atab">U.S. CONSTITUTION · ${c.amend}</span>
      <p class="atext">${c.text}</p>
      <p class="anote">${c.note}</p></div>`;

  const sides = c => `<div class="sides">
      <div class="side his"><span class="stag">${c.sideName}</span><p>${c.sideHis}</p></div>
      <div class="vsb" aria-hidden="true">VS</div>
      <div class="side state"><span class="stag">${c.stateName || "👔 Defending the law · Kane"}</span><p>${c.sideState}</p></div>
    </div>`;
  const cap = c => `<div class="mini-file"><span aria-hidden="true">${c.icon}</span><span>At the stand: <b>${c.name}</b> · ${c.short}</span></div>`;

  // Real photos of the people and events. Claude can't pull these off the web, so each case has a spot
  // Fynn can fill with a photo he is allowed to use: put the file in this folder's img/ and fill in the line,
  // like  Tinker: { src: "img/tinker.jpg", alt: "Mary Beth and John Tinker holding their armbands", credit: "Photo: (who owns it)" }
  // Students only see a spot once it has a photo. Test T. sees the empty spots.
  const PHOTOS = { "Tinker": null, "Ewing": null, "Acton": null, "Simmons": null };
  const photoSpot = c => {
    const ph = PHOTOS[c.key];
    if (ph && ph.src) return `<figure class="photo"><img src="${esc(ph.src)}" alt="${esc(ph.alt || "")}"><figcaption>${esc(ph.credit || "")}</figcaption></figure>`;
    return isTestT() ? `<div class="photo empty" title="Only Test T. sees this">📷<span>Photo spot<br>${esc(c.key)}</span></div>` : "";
  };
  // The record card: the real case name, where it is printed, the date, and who wrote the opinion.
  const docCard = c => `<div class="doc">${photoSpot(c)}<div class="doct"><span class="dsm">Supreme Court of the United States</span><b>${c.doc.title}</b><span class="dcite">${c.doc.cite} · Decided ${c.doc.decided}</span><span class="dcite">${c.doc.by}</span></div></div>`;

  // ---------------- The courtroom (drawn, not photos) ----------------
  // The judge (the student) sits up on the bench on the right, looking down at the person at the stand.
  // Figures are simple drawings with no faces copied from the real people.
  const INK = "#17233b", SKIN = "#f1dcc0";
  // What students can change about their judge.
  const LOOKS = {
    skin: ["#f6dfc6", "#eac39f", "#d3a073", "#b07a4f", "#8a5a3a", "#5e3b26"],
    hair: ["short", "long", "curls", "bun", "bald", "scarf"],
    hairNames: { short: "Short", long: "Long", curls: "Curls", bun: "Bun", bald: "Bald", scarf: "Scarf" },
    color: ["#1b1b22", "#4a2f1b", "#8a5a2b", "#d9b25f", "#b3402e", "#8f95a3", "#2a6fb0", "#d6589a"],
    robe: ["#1b1b22", "#1f2f5c", "#6d1f2a", "#4b2a73", "#1f4d3a"]
  };
  const DEFAULT_LOOK = { skin: 1, hair: "short", color: 5, robe: 0, glasses: false };
  const cleanLook = j => {
    j = j && typeof j === "object" ? j : {};
    return {
      skin: LOOKS.skin[j.skin] ? j.skin : DEFAULT_LOOK.skin, hair: LOOKS.hair.includes(j.hair) ? j.hair : DEFAULT_LOOK.hair,
      color: LOOKS.color[j.color] ? j.color : DEFAULT_LOOK.color, robe: LOOKS.robe[j.robe] ? j.robe : DEFAULT_LOOK.robe, glasses: !!j.glasses
    };
  };
  function hairSvg(kind, col) {
    const cap = `<path d="M-14 -3 Q-15 -18 0 -17 Q15 -18 14 -2 Q9 -10 0 -10 Q-9 -10 -14 -3Z" fill="${col}"/>`;
    if (kind === "bald") return "";
    if (kind === "long") return `<path d="M-14 -3 Q-15 -18 0 -17 Q17 -18 16 0 L18 21 Q10 23 9 9 Q10 -6 0 -9 Q-9 -10 -14 -3Z" fill="${col}"/>`;
    if (kind === "curls") return [[-10, -10, 6], [-2, -15, 7], [7, -13, 7], [14, -6, 6.5], [15, 3, 5.5]].map(c => `<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${col}"/>`).join("");
    if (kind === "bun") return cap + `<circle cx="12" cy="-15" r="6.5" fill="${col}" stroke="${INK}" stroke-width="1.5"/>`;
    if (kind === "scarf") return `<path d="M-13 -6 Q-13 -19 1 -18 Q18 -17 17 2 Q18 15 9 20 L-3 17 Q8 8 6 -2 Q4 -11 -4 -11 Q-10 -11 -13 -6Z" fill="${col}" stroke="${INK}" stroke-width="1.5"/>`;
    return cap;
  }
  // The judge: robe, head turned to look down at the stand, gavel in hand.
  function judgeSvg(look, hit) {
    const j = cleanLook(look), skin = LOOKS.skin[j.skin], col = LOOKS.color[j.color], robe = LOOKS.robe[j.robe];
    return `<g class="judge">
        <path d="M384 88 Q386 50 412 46 H436 Q462 50 464 88Z" fill="${robe}" stroke="${INK}" stroke-width="2"/>
        <path d="M416 46 L424 60 L432 46Z" fill="#fffdf6" stroke="${INK}" stroke-width="1.5"/>
        <g transform="translate(421 31) rotate(-12)">
          <circle r="14" fill="${skin}" stroke="${INK}" stroke-width="2"/>
          ${hairSvg(j.hair, col)}
          <circle cx="-6" cy="0" r="1.7" fill="${INK}"/><path d="M-10 -5h7" stroke="${INK}" stroke-width="1.8"/><path d="M-13 2 q-4 2 0 4" stroke="${INK}" stroke-width="2" fill="none"/><path d="M-10 8h6" stroke="${INK}" stroke-width="1.8"/>
          ${j.glasses ? `<circle cx="-6" cy="0" r="5" fill="#ffffff55" stroke="${INK}" stroke-width="1.6"/><path d="M-1 0H11" stroke="${INK}" stroke-width="1.6"/>` : ""}
        </g>
        <g class="gavel${hit ? " hit" : ""}"><path d="M388 80 L366 58" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M388 80 L366 58" stroke="#a8672f" stroke-width="3" stroke-linecap="round"/><rect x="351" y="44" width="26" height="14" rx="3" transform="rotate(-45 364 51)" fill="#6b3f22" stroke="${INK}" stroke-width="2"/></g>
        <circle cx="390" cy="81" r="5" fill="${skin}" stroke="${INK}" stroke-width="1.6"/>
      </g>`;
  }
  // A close-up of the judge for the "make your judge" box.
  const portrait = look => `<svg class="portrait" viewBox="372 4 100 96" role="img" aria-label="Your judge">
      <rect x="372" y="4" width="100" height="96" fill="#efe6d2"/>${judgeSvg(look)}
      <rect x="364" y="86" width="120" height="11" rx="2" fill="#4f2d17" stroke="${INK}" stroke-width="2"/></svg>`;
  const PEOPLE = [
    // Mary Beth Tinker: 13, black armband
    { h: 16, shirt: "#6f8fbf", pants: "#3d5a80", band: true, hair: `<path d="M-14 -3 Q-16 -19 0 -18 Q16 -19 14 -2 L15 16 Q10 18 9 6 Q9 -8 0 -9 Q-9 -8 -10 6 Q-11 18 -16 16Z" fill="#6b4423"/>`,
      exhibit: `<ellipse cx="0" cy="-8" rx="20" ry="9" fill="none" stroke="#111" stroke-width="7"/>`, exLabel: "THE ARMBAND" },
    // Gary Ewing: adult
    { h: 0, shirt: "#7a8a5c", pants: "#4b4f58", hair: `<path d="M-13 -4 Q-14 -17 0 -17 Q14 -17 13 -5 Q8 -11 0 -11 Q-8 -11 -13 -4Z" fill="#3a2a1c"/>`,
      exhibit: `<path d="M-14 6 L-8 -40 M0 6 L0 -42 M14 6 L8 -40" stroke="#8f95a3" stroke-width="3" stroke-linecap="round"/><path d="M-8 -40 h-9 v6 h9z M0 -42 h-9 v6 h9z M8 -40 h9 v6 h-9z" fill="#2b2f3a" stroke="${INK}" stroke-width="1.5"/>`, exLabel: "3 GOLF CLUBS" },
    // James Acton: 7th grade, football jersey
    { h: 19, shirt: "#c0392b", pants: "#d9d3c3", hair: `<path d="M-14 -2 Q-16 -19 0 -18 Q16 -19 14 -3 Q10 -9 3 -10 Q-6 -12 -14 -2Z" fill="#c9a352"/>`,
      exhibit: `<ellipse cx="0" cy="-8" rx="19" ry="11" fill="#8a4b22" stroke="${INK}" stroke-width="2"/><path d="M-8 -8h16M-4 -11v6M0 -11v6M4 -11v6" stroke="#fffdf6" stroke-width="1.8"/>`, exLabel: "FOOTBALL" },
    // Christopher Simmons: 17, jail orange
    { h: 2, shirt: "#e07b39", pants: "#c96a2c", hair: `<path d="M-13 -3 Q-15 -18 0 -17 Q15 -18 13 -4 Q7 -10 0 -10 Q-8 -10 -13 -3Z" fill="#2b2118"/>`,
      exhibit: `<rect x="-17" y="-34" width="34" height="42" rx="3" fill="#6d1f2a" stroke="${INK}" stroke-width="2"/><rect x="-11" y="-26" width="22" height="13" rx="1.5" fill="#c89b2a"/><text x="0" y="-16.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="8" fill="${INK}">LAW</text>`, exLabel: "MISSOURI LAW" }
  ];
  function personSvg(p) {
    // drawn facing right, feet on the floor line (y=0), origin at feet center
    const top = -100 + p.h;           // shoulder line
    const hy = top - 14;              // head center
    const stripes = p.stripes ? [0, 1, 2, 3].map(k => `<path d="M-16 ${top + 12 + k * 11}h32" stroke="${p.stripes}" stroke-width="4"/>`).join("") : "";
    return `<g>
      <rect x="-12" y="${top + 50}" width="11" height="${-(top + 50)}" rx="3" fill="${p.pants}" stroke="${INK}" stroke-width="2"/>
      <rect x="1" y="${top + 50}" width="11" height="${-(top + 50)}" rx="3" fill="${p.pants}" stroke="${INK}" stroke-width="2"/>
      <path d="M-16 ${top + 8} Q-16 ${top} -8 ${top} H8 Q16 ${top} 16 ${top + 8} V${top + 54} H-16Z" fill="${p.shirt}" stroke="${INK}" stroke-width="2"/>
      <clipPath id="tc${p.h}"><path d="M-16 ${top + 8} Q-16 ${top} -8 ${top} H8 Q16 ${top} 16 ${top + 8} V${top + 54} H-16Z"/></clipPath>
      <g clip-path="url(#tc${p.h})">${stripes}</g>
      ${p.hood ? `<path d="M-13 ${top + 2} Q0 ${top + 12} 13 ${top + 2} Q10 ${top - 6} 0 ${top - 5} Q-10 ${top - 6} -13 ${top + 2}Z" fill="#8f2f20" stroke="${INK}" stroke-width="2"/>` : ""}
      <rect x="-5" y="${hy + 9}" width="10" height="8" fill="${SKIN}" stroke="${INK}" stroke-width="2"/>
      <g transform="translate(0 ${hy}) rotate(-8)">
        <circle r="13" fill="${SKIN}" stroke="${INK}" stroke-width="2"/>
        ${p.hair}
        <circle cx="6" cy="-1" r="1.6" fill="${INK}"/><path d="M12 1 q4 2 0 4" stroke="${INK}" stroke-width="2" fill="none"/><path d="M4 7h6" stroke="${INK}" stroke-width="1.8"/>
      </g>
      <path d="M8 ${top + 14} Q24 ${top + 26} 30 ${top + 40}" stroke="${INK}" stroke-width="9" stroke-linecap="round" fill="none"/>
      <path d="M8 ${top + 14} Q24 ${top + 26} 30 ${top + 40}" stroke="${p.shirt}" stroke-width="5.5" stroke-linecap="round" fill="none"/>
      ${p.band ? `<path d="M11 ${top + 17} L17 ${top + 23}" stroke="#111" stroke-width="7" stroke-linecap="butt"/>` : ""}
      <circle cx="31" cy="${top + 42}" r="4" fill="${SKIN}" stroke="${INK}" stroke-width="1.6"/>
    </g>`;
  }
  // who: case number 0-3, or -1 for the empty stand (title + ladder). name goes on the bench plaque.
  function court(who, name, opts) {
    opts = opts || {};
    const p = PEOPLE[who];
    const plaque = name ? "JUDGE " + String(name).toUpperCase() : "YOUR NAME HERE";
    const fit = plaque.length > 15 ? ` textLength="126" lengthAdjust="spacingAndGlyphs"` : "";
    const panels = Array.from({ length: 14 }, (_, k) => `<path d="M${k * 40 + 20} 104V172" stroke="#a9794a" stroke-width="2"/>`).join("");
    return `<svg class="court${opts.big ? " big" : ""}" viewBox="0 0 520 210" role="img" aria-label="${who >= 0 ? "A courtroom. The judge sits up on the bench, looking down at " + esc(CASES[who].name.replace(/[“”]/g, "")) + " at the stand." : "A courtroom. The judge sits up on the bench. The stand is empty."}">
      <rect width="520" height="210" fill="#efe6d2"/>
      <rect y="100" width="520" height="74" fill="#c59a68"/><path d="M0 100H520" stroke="${INK}" stroke-width="2"/>${panels}
      <rect y="172" width="520" height="38" fill="#7b5536"/><path d="M0 172H520" stroke="${INK}" stroke-width="2"/>
      <!-- seal + flag on the back wall -->
      <circle cx="252" cy="48" r="27" fill="#c89b2a" stroke="${INK}" stroke-width="2.5"/><circle cx="252" cy="48" r="20" fill="none" stroke="#fffdf6" stroke-width="2"/>
      <path d="M252 33v28M240 40h24M240 40l-5 10h10zM264 40l-5 10h10zM245 62h14" stroke="${INK}" stroke-width="2" fill="none" stroke-linejoin="round"/>
      <path d="M306 20V100" stroke="${INK}" stroke-width="3"/><circle cx="306" cy="18" r="3.5" fill="#c89b2a" stroke="${INK}" stroke-width="1.5"/>
      <path d="M307 24 q14 6 26 0 v34 q-12 6 -26 0z" fill="#fffdf6" stroke="${INK}" stroke-width="2"/><path d="M307 24 q7 3 13 2 v15 q-6 1 -13 -1z" fill="#27408b"/><path d="M320 32q7 0 13 -3M320 39q7 0 13 -3M307 47q13 5 26 0M307 54q13 5 26 0" stroke="#b3261e" stroke-width="3" fill="none"/>
      <!-- Prosecutor Kane at his table -->
      <g transform="translate(52 0)">
        <path d="M-17 138 Q-17 110 -9 108 H9 Q17 110 17 138Z" fill="#27408b" stroke="${INK}" stroke-width="2"/><path d="M-4 108 L0 120 L4 108Z" fill="#fffdf6" stroke="${INK}" stroke-width="1.5"/><path d="M0 113v20" stroke="#b3261e" stroke-width="4"/>
        <circle cx="0" cy="94" r="12" fill="${SKIN}" stroke="${INK}" stroke-width="2"/><path d="M-12 91 Q-12 80 0 81 Q13 80 12 92 Q6 86 -2 86 Q-8 86 -12 91Z" fill="${INK}"/>
        <circle cx="5" cy="94" r="1.5" fill="${INK}"/><path d="M11 96 q3 2 0 4" stroke="${INK}" stroke-width="1.8" fill="none"/><path d="M3 101 q4 2 7 -1" stroke="${INK}" stroke-width="1.6" fill="none"/>
        <rect x="-40" y="136" width="84" height="9" rx="2" fill="#6b3f22" stroke="${INK}" stroke-width="2"/><path d="M-32 145V186M36 145V186" stroke="${INK}" stroke-width="5"/><path d="M-32 145V186M36 145V186" stroke="#6b3f22" stroke-width="2.5"/>
        <rect x="-30" y="126" width="26" height="10" rx="1.5" fill="#f3deaa" stroke="${INK}" stroke-width="1.5"/>
        <text x="2" y="162" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="8.5" fill="#fffdf6" letter-spacing="1">KANE</text>
      </g>
      <!-- exhibit table -->
      ${p ? `<g transform="translate(262 0)"><rect x="-34" y="150" width="68" height="8" rx="2" fill="#6b3f22" stroke="${INK}" stroke-width="2"/><path d="M-26 158V186M26 158V186" stroke="${INK}" stroke-width="5"/><path d="M-26 158V186M26 158V186" stroke="#6b3f22" stroke-width="2.5"/><g transform="translate(0 141)">${p.exhibit}</g><text x="0" y="172" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="8" fill="#fffdf6" letter-spacing=".8">${p.exLabel}</text></g>` : ""}
      <!-- the stand, with the person behind it -->
      ${p ? `<g transform="translate(150 188)">${personSvg(p)}</g>` : ""}
      <g transform="translate(186 0)"><path d="M-17 132H17L13 188H-13Z" fill="#8a5a33" stroke="${INK}" stroke-width="2"/><rect x="-21" y="126" width="42" height="8" rx="2" fill="#6b3f22" stroke="${INK}" stroke-width="2"/></g>
      <!-- the judge, up on the bench -->
      ${judgeSvg(opts.look, opts.hit)}
      <rect x="330" y="86" width="186" height="11" rx="2" fill="#4f2d17" stroke="${INK}" stroke-width="2"/>
      <rect x="338" y="97" width="170" height="92" fill="#6b3f22" stroke="${INK}" stroke-width="2"/><rect x="348" y="107" width="150" height="72" fill="none" stroke="#8a5a33" stroke-width="2"/>
      <rect x="356" y="122" width="134" height="24" rx="3" fill="#c89b2a" stroke="${INK}" stroke-width="2"/>
      <text class="plq" x="423" y="138.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="11.5" fill="${INK}"${fit}>${esc(plaque)}</text>
      <ellipse cx="352" cy="85" rx="10" ry="3.5" fill="#6b3f22" stroke="${INK}" stroke-width="1.5"/>
    </svg>`;
  }

  // ---------------- The four real cases (a LAW or RULE is on trial in each one) ----------------
  const E8 = "“Excessive bail shall not be required, nor excessive fines imposed, nor <mark>cruel and unusual punishments</mark> inflicted.”";
  const CASES = [
    { n: 1, key: "Tinker", icon: "🖤", name: "Mary Beth Tinker", age: "13", place: "Des Moines, Iowa · 1965", status: "SUSPENDED",
      chargeLabel: "The rule", charge: "No armbands at school. Take it off or be suspended.", recLabel: "What happened",
      record: [["🕊️", "She and other students wore black armbands to protest the Vietnam War."], ["📋", "Principals heard about the plan. They banned armbands before anyone wore one."], ["🤫", "She wore hers anyway. No one could show that a class was disrupted."], ["🚪", "She was sent home until she came back without it."]],
      sentenceLabel: "Penalty", sentence: "Suspended", extra: "📍 This happened in Iowa. Her brother John, 15, and a friend, 16, were suspended too.",
      short: "age 13 · armband", amend: "1st Amendment",
      text: "“Congress shall make no law … abridging the <mark>freedom of speech</mark> …”",
      note: "<b>Abridging</b> = cutting back. An armband has no words on it. Public schools are part of the government.",
      sideName: "✉️ The Tinkers' lawyers", sideHis: "It was quiet. Nobody's class was stopped. Students don't lose their rights when they walk into school.",
      stateName: "👔 Defending the rule · Kane", sideState: "Schools are for learning, not protests. Principals have to be able to stop trouble before it starts.",
      doc: { title: "TINKER v. DES MOINES SCHOOL DISTRICT", cite: "393 U.S. 503", decided: "February 24, 1969", by: "Opinion of the Court by Justice Fortas" },
      terms: [["Judicial review", "courts checking if a law or rule fits the Constitution"], ["Strike down", "cancel a law or rule"], ["Abridging", "cutting back"]] },
    { n: 2, key: "Ewing", icon: "⛳", name: "Gary Ewing", age: "", place: "El Segundo, California · 2000", status: "LOCKED UP",
      chargeLabel: "The law", charge: "Three strikes: a third serious crime means 25 years to life.", recLabel: "What happened",
      record: [["⛳", "He walked out of a golf shop with 3 golf clubs hidden in his pants. Each cost $399."], ["📂", "He already had a record: a robbery and three home break-ins."], ["3️⃣", "That made the golf clubs his third strike."]],
      sentence: "25 years to life in prison",
      short: "golf clubs · 25 to life", amend: "8th Amendment",
      text: E8,
      note: "The words don't say how long is too long. Judges have to decide.",
      sideName: "✉️ Ewing's lawyers", sideHis: "Twenty-five years to life for golf clubs. The punishment is far bigger than the crime. That is cruel and unusual.",
      stateName: "👔 Defending the law · Kane", sideState: "This is not about golf clubs. It is about a man who keeps committing crimes. Lawmakers are allowed to lock up repeat offenders for a long time.",
      doc: { title: "EWING v. CALIFORNIA", cite: "538 U.S. 11", decided: "March 5, 2003", by: "Lead opinion by Justice O'Connor" },
      terms: [["Three strikes", "a law that gives a very long sentence for a third serious crime"], ["Repeat offender", "someone who keeps breaking the law"], ["Unconstitutional", "breaks the Constitution"]] },
    { n: 3, key: "Acton", icon: "🏈", name: "James Acton", age: "7th grade", place: "Vernonia, Oregon · 1991", status: "OFF THE TEAM",
      chargeLabel: "The rule", charge: "Student athletes must take random drug tests.", recLabel: "What happened",
      record: [["🏈", "He signed up to play football."], ["📝", "The school said: sign the drug-test form first. Each week, 10% of athletes get tested."], ["🎲", "The tests were random. The school did not need a reason to suspect a student."], ["✋", "He and his parents refused to sign."]],
      sentenceLabel: "Result", sentence: "Not allowed to play", extra: "📈 The school said student drug use had jumped, and athletes were part of it.",
      short: "7th grade · drug test", amend: "4th Amendment",
      text: "“The right of the people to be secure in their persons, houses, papers, and effects, against <mark>unreasonable</mark> searches and seizures, shall not be violated …”",
      note: "A drug test counts as a <b>search</b>. The words ban <b>unreasonable</b> ones.",
      sideName: "✉️ The Actons' lawyers", sideHis: "The school has no reason to suspect James. Testing kids with no reason at all is an unreasonable search.",
      stateName: "👔 Defending the rule · Kane", sideState: "Sports are a choice. Athletes already share locker rooms and get physicals. And the school had a real drug problem.",
      doc: { title: "VERNONIA SCHOOL DIST. 47J v. ACTON", cite: "515 U.S. 646", decided: "June 26, 1995", by: "Opinion of the Court by Justice Scalia" },
      terms: [["Random", "picked by chance, not for a reason"], ["Suspect", "have a reason to think someone did it"], ["Search", "the government looking through you or your things"]] },
    { n: 4, key: "Simmons", icon: "⏳", name: "Christopher Simmons", age: "17", place: "Missouri · 1993", status: "DEATH ROW",
      chargeLabel: "The law", charge: "Missouri allowed the death penalty at ages 16 and 17.", recLabel: "What happened",
      record: [["📁", "He planned a break-in and murdered a woman. He was 17."], ["⚖️", "He was tried as an adult. The jury said guilty."], ["🗓️", "In 1989, the Supreme Court had ruled that laws like Missouri's were allowed."]],
      sentence: "Death", extra: "🗺️ About 20 states had laws like this one.",
      short: "age 17 · death sentence", amend: "8th Amendment",
      text: E8,
      note: "Same words as the golf club case. Does a person's <b>age</b> change what is cruel and unusual?",
      sideName: "✉️ Simmons's lawyers", sideHis: "A 17-year-old can't vote or sit on a jury. Teens are still growing up. Executing them is cruel and unusual.",
      stateName: "👔 Defending the law · Kane", sideState: "He planned it. The jury knew his age and still chose death. And this Court already said these laws are allowed.",
      doc: { title: "ROPER v. SIMMONS", cite: "543 U.S. 551", decided: "March 1, 2005", by: "Opinion of the Court by Justice Kennedy" },
      terms: [["Precedent", "an earlier ruling that courts follow"], ["Overturn", "cancel an earlier ruling"], ["Tried as an adult", "sent to adult court, not juvenile court"]] }
  ];
  const LADDER_TERMS = [["Judicial review", "courts checking if a law fits the Constitution"], ["Strike down", "cancel a law"], ["Unconstitutional", "breaks the Constitution"]];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1].
  // rule: cards[].sc = "agreed" (voted with the real majority) | "reversed" (outvoted) | "toofar"; fx = change in public trust.
  const STEPS = [
    { id: "c1", type: "check", c: -1, std: "Gov.8", kicker: "Your first day on the Supreme Court", short: "What is judicial review?", stamp: "SWORN IN", where: "chart",
      mid: () => ladder(),
      ask: "A state passes a law. Someone says it breaks the Constitution. What can your Court do?",
      options: ["Strike it down if it breaks the Constitution", "Rewrite the law so that it works much better", "Send the law to the President for a veto", "Make the lawmakers hold a brand-new vote"],
      miss: ["Courts don't write laws. Look at the last step of the chart.", "A veto comes before a bill becomes a law. Look at the last step.", "Courts can't order a new vote. Look at the last step of the chart."],
      hint: "Look at the last step of the chart.",
      reveal: "<b>Judicial review</b>: courts can strike down a law that breaks the Constitution." },

    // ---- Case 1: Tinker v. Des Moines (rule struck down, 7-2) ----
    { id: "c2", type: "check", c: 0, std: "Gov.8", kicker: "Case 1 · The file", short: "Tinker: why was the rule unfair?", stamp: "NOTED", where: "case file",
      ask: "Why does Mary Beth say the rule was unfair?",
      options: ["Her armband did not disrupt any class", "The rule was made after she wore it", "She was never told about the rule", "Only girls were punished for armbands"],
      miss: ["The file says the ban came first. Look at what happened in class.", "The file doesn't say that. Look at what happened in class.", "Her brother was suspended too. Look at what happened in class."],
      hint: "Look at what happened in class.",
      reveal: "Her claim: a quiet armband hurt no one, so the school had no reason to ban it." },
    { id: "c3", type: "check", c: 0, std: "Gov.8", kicker: "Case 1 · The words", short: "Tinker: is an armband speech?", stamp: "INTERPRET", where: "marked words",
      under: () => amend(CASES[0]),
      ask: "An armband has no words on it. What must the Court decide?",
      options: ["Can wearing something count as speech?", "Was the Vietnam War a good idea?", "Should schools ever have dress rules?", "Did she stay suspended for too long?"],
      miss: ["The Court doesn't rule on the war. Look at the marked words.", "Too broad. This case is about one rule. Look at the marked words.", "The case isn't about how long. Look at the marked words."],
      hint: "Look at the marked words. Is an armband a way of saying something?",
      reveal: "The Court had to decide if “speech” covers more than talking." },
    { id: "e1", type: "rule", c: 0, kicker: "Case 1 · Your vote", short: "Vote on Tinker",
      under: () => sides(CASES[0]),
      ask: "Cast your vote on the armband rule.",
      cards: [
        { icon: "❌", t: "Strike down the rule", line: "Quiet protest is protected speech", fx: -1, sc: "agreed",
          res: "You vote to strike down the armband rule.", head: "COURT SIDES WITH TEEN WAR PROTESTERS", cause: "Struck down the armband rule",
          kane: "Wonderful. Now every kid with an opinion has a lawyer." },
        { icon: "✅", t: "Let the rule stand", line: "Schools decide what is allowed", fx: 1, sc: "reversed",
          res: "You vote to let the armband rule stand.", head: "JUSTICE BACKS PRINCIPALS ON ARMBANDS", cause: "Let the armband rule stand",
          kane: "You and I lost that one, 7 to 2. Good company, though." },
        { icon: "📢", t: "Students can say anything", line: "No limits at school, ever", fx: -2, sc: "toofar",
          res: "You vote that schools can never limit student speech.", head: "JUSTICE: NO LIMITS ON STUDENT SPEECH", cause: "Voted for no limits on student speech",
          kane: "Even the Tinkers did not ask for that." }
      ],
      vote: "7–2", caseName: "Tinker v. Des Moines (1969)",
      real: [["🏛️", "The real vote was 7 to 2 to strike down the rule."], ["📜", "The rule now: students keep free speech at school. A school can stop speech only if it really disrupts class."], ["🔁", "A later case (Bong Hits 4 Jesus) added one limit: pro-drug speech at a school event."], ["📍", "It started with a few students in Des Moines."]],
      tooFar: "The real Court said schools can still stop speech that truly disrupts class.",
      reveal: "That is <b>judicial review</b>: the Court struck down a government rule because it broke the Constitution." },

    // ---- Case 2: Ewing v. California (law upheld, 5-4) ----
    { id: "c4", type: "check", c: 1, std: "Gov.8", kicker: "Case 2 · The file", short: "Ewing: why 25 to life?", stamp: "NOTED", where: "case file",
      ask: "Why did stealing golf clubs get him 25 years to life?",
      options: ["It counted as his third strike", "The clubs were worth over a million", "He hurt a worker during the theft", "He stole from the same shop twice"],
      miss: ["The file says $399 each. Look at his record.", "The file doesn't say that. Look at his record.", "The file doesn't say that. Look at his record."],
      hint: "Look at his record and at the law.",
      reveal: "The law looked at his whole record, not only the golf clubs." },
    { id: "c5", type: "check", c: 1, std: "Gov.8", kicker: "Case 2 · The words", short: "Ewing: what is “cruel and unusual”?", stamp: "INTERPRET", where: "marked words",
      under: () => amend(CASES[1]),
      ask: "The words ban “cruel and unusual punishments.” What must the Court decide?",
      options: ["Is this sentence too harsh for this crime?", "Did he really steal the golf clubs?", "Should every prison be shut down?", "Should stealing be a crime at all?"],
      miss: ["Nobody argued he didn't. Look at the marked words.", "Too far. The words only ban cruel and unusual punishments.", "Nobody argued that. Look at the marked words."],
      hint: "Look at the marked words. What is being called cruel?",
      reveal: "Same job as Day 1: decide what the words mean. Today a whole law depends on it." },
    { id: "e2", type: "rule", c: 1, kicker: "Case 2 · Your vote", short: "Vote on Ewing",
      under: () => sides(CASES[1]),
      ask: "Cast your vote on the three-strikes law.",
      cards: [
        { icon: "❌", t: "Strike down the sentence", line: "25 to life is cruel for this crime", fx: -2, sc: "reversed",
          res: "You vote that the three-strikes sentence is cruel and unusual.", head: "JUSTICE: THREE STRIKES GOES TOO FAR", cause: "Voted against the three-strikes sentence",
          kane: "Four justices agreed with you. You needed five." },
        { icon: "✅", t: "Let the law stand", line: "Lawmakers can punish repeat crimes hard", fx: 1, sc: "agreed",
          res: "You vote to let the three-strikes law stand.", head: "COURT UPHOLDS THREE-STRIKES LAW", cause: "Let the three-strikes law stand",
          kane: "A justice who lets lawmakers make the laws. I could cry." },
        { icon: "🔓", t: "Throw out his conviction", line: "Set him free", fx: -3, sc: "toofar",
          res: "You vote to throw out the conviction and free him.", head: "JUSTICE VOTES TO FREE GOLF CLUB THIEF", cause: "Voted to free Ewing",
          kane: "He was caught limping out of the store, Your Honor." }
      ],
      vote: "5–4", caseName: "Ewing v. California (2003)",
      real: [["🏛️", "The real vote was 5 to 4 to let the law stand."], ["📜", "The ruling: a long sentence for a repeat offender is not cruel and unusual."], ["⛓️", "Ewing's sentence stayed: 25 years to life."], ["🗳️", "Four justices said the sentence was far too harsh. They lost by one vote."]],
      tooFar: "Nobody argued he was innocent. The only question was whether the sentence was too harsh.",
      reveal: "Judicial review cuts both ways. Sometimes the Court says the law <b>stands</b>." },

    // ---- Case 3: Vernonia v. Acton (rule upheld, 6-3) ----
    { id: "c6", type: "check", c: 2, std: "Gov.8", kicker: "Case 3 · File + words", short: "Acton: is a random test reasonable?", stamp: "INTERPRET", where: "marked word",
      under: () => amend(CASES[2]),
      ask: "He says random drug tests break the 4th Amendment. What must the Court decide?",
      options: ["Is testing with no suspicion reasonable?", "Did James really use any drugs?", "Should schools have football teams?", "Is 10% of athletes too few to test?"],
      miss: ["Nobody said he did. Look at the marked word.", "The case isn't about football itself. Look at the marked word.", "The case isn't about the number. Look at the marked word."],
      hint: "Look at the marked word, and at how students were picked.",
      reveal: "On Day 1 (T.L.O.), a school searched a purse because it had a reason. Here the school had none. Does that change the answer?" },
    { id: "e3", type: "rule", c: 2, kicker: "Case 3 · Your vote", short: "Vote on Acton",
      under: () => sides(CASES[2]),
      ask: "Cast your vote on the drug-test rule.",
      cards: [
        { icon: "❌", t: "Strike down the rule", line: "No testing without a reason", fx: -1, sc: "reversed",
          res: "You vote to strike down random drug tests.", head: "JUSTICE: NO DRUG TESTS WITHOUT A REASON", cause: "Voted against random drug tests",
          kane: "Six to three. The school wins. I love this building." },
        { icon: "✅", t: "Let the rule stand", line: "Testing athletes is reasonable", fx: 1, sc: "agreed",
          res: "You vote to let the drug-test rule stand.", head: "COURT OKS DRUG TESTS FOR ATHLETES", cause: "Let the drug-test rule stand",
          kane: "See? We can agree. Don't let it go to your head." },
        { icon: "🧪", t: "Test every student", line: "Any student, any time", fx: 0, sc: "toofar",
          res: "You vote that schools can drug test any student at any time.", head: "JUSTICE: TEST EVERY STUDENT", cause: "Voted to test every student",
          kane: "Easy. The school only asked about athletes." }
      ],
      vote: "6–3", caseName: "Vernonia v. Acton (1995)",
      real: [["🏛️", "The real vote was 6 to 3 to let the rule stand."], ["📜", "The ruling: random drug tests for student athletes are a reasonable search."], ["⚖️", "A lower federal court had struck the rule down. The Supreme Court reversed it."], ["🗳️", "Three justices disagreed. They said searching students with no suspicion goes too far."]],
      tooFar: "The real ruling only covered student athletes.",
      reveal: "The Supreme Court can also <b>reverse</b> a lower court that struck a rule down." },

    // ---- Case 4: Roper v. Simmons (law struck down, 5-4, overturning the Court's own 1989 ruling) ----
    { id: "c7", type: "check", c: 3, std: "Gov.8", kicker: "Case 4 · File + words", short: "Simmons: can the Court change its mind?", stamp: "PRECEDENT", where: "case file",
      under: () => amend(CASES[3]),
      ask: "In 1989 the Court said laws like this were allowed. What can the Court do now?",
      options: ["Overturn its own earlier ruling", "Nothing. Old rulings can't change", "Ask Missouri to vote on the law", "Let the President decide the case"],
      miss: ["The Court can overturn its own rulings. It is rare, but it happens.", "Courts can't order a vote. Who made the 1989 ruling?", "The President has no say in a court case. Who made the 1989 ruling?"],
      hint: "Who made the 1989 ruling? They can unmake it.",
      reveal: "A ruling that courts follow is a <b>precedent</b>. The Supreme Court can overturn its own precedent." },
    { id: "e4", type: "rule", c: 3, kicker: "Case 4 · Your vote", short: "Vote on Simmons",
      under: () => sides(CASES[3]),
      ask: "Cast your vote on the death penalty law.",
      cards: [
        { icon: "❌", t: "Strike down the law", line: "No death penalty under 18", fx: -2, sc: "agreed",
          res: "You vote to strike down the death penalty for crimes under 18.", head: "COURT: NO DEATH PENALTY UNDER 18", cause: "Struck down the under-18 death penalty",
          kane: "Five to four. One vote. And the 1989 ruling is gone." },
        { icon: "✅", t: "Let the law stand", line: "Follow the 1989 ruling", fx: 1, sc: "reversed",
          res: "You vote to follow the 1989 ruling and let the law stand.", head: "JUSTICE STANDS BY DEATH PENALTY LAW", cause: "Let the death penalty law stand",
          kane: "We followed the Court's own ruling and still lost. Precedent isn't forever." },
        { icon: "🚫", t: "End the death penalty", line: "For everyone, at any age", fx: -3, sc: "toofar",
          res: "You vote to end the death penalty for everyone.", head: "JUSTICE VOTES TO END DEATH PENALTY", cause: "Voted to end the death penalty for all",
          kane: "Nobody asked about adults, Your Honor." }
      ],
      vote: "5–4", caseName: "Roper v. Simmons (2005)",
      real: [["🏛️", "The real vote was 5 to 4 to strike down the law."], ["📜", "The rule now: no death penalty for a crime committed before age 18."], ["🗺️", "Laws in about 20 states were struck down at once."], ["🔁", "The Court overturned its own 1989 ruling. Simmons got life in prison instead."]],
      tooFar: "The real ruling only covered crimes committed before age 18.",
      reveal: "One ruling can cancel laws in many states. And the Court can <b>overturn</b> its own earlier ruling." },

    { id: "end", type: "ending", c: 4, kicker: "Your record", short: "Ending" },
    { id: "write", type: "write", c: 4, kicker: "One last thing", short: "Short answer" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const RULES = STEPS.filter(s => s.type === "rule");

  const PROMPTS = [
    { id: "meaning", short: "Judicial review", label: "Pick one case. Did the Court strike the law down or let it stand? Why?",
      bank: ["Tinker", "Ewing", "Acton", "Simmons", "struck down", "let it stand", "judicial review"],
      stem: "In the ___ case, the Court ___ the law because ___.", min: 40, newWords: 3,
      mustAll: [["tinker", "ewing", "acton", "vernonia", "simmons", "roper"], ["struck", "strike", "stand", "stood", "stay", "upheld", "uphold", "overturn", "cancel", "threw", "kept", "keep", "allowed", "allow", "ended", "banned"]],
      mustMsg: "Name the case (Tinker, Ewing, Acton, or Simmons) and say if the law was struck down or left standing." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, trust: START_TRUST, picks: {}, opened: {}, wrong: {}, done: {}, writing: {}, turnedIn: false, judge: cleanLook(day1Look() || DEFAULT_LOOK) });
  function day1Look() { try { const d = JSON.parse(localStorage.getItem(DAY1_KEY)); return d && d.judge ? d.judge : null; } catch (e) { return null; } }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.picks || typeof st.trust !== "number") st = fresh();
  st.opened = st.opened || {};
  st.judge = cleanLook(st.step < 0 && !st.name ? (day1Look() || st.judge) : st.judge);
  // Shared Chromebooks: a different student signed in on this device starts clean.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const cardOf = s => (st.picks[s.id] != null ? s.cards[st.picks[s.id]] : null);
  const tally = () => {
    const t = { agreed: 0, reversed: 0, toofar: 0 };
    RULES.forEach(s => { const c = cardOf(s); if (c) t[c.sc]++; });
    return t;
  };
  const trustWord = n => n <= 2 ? "Furious" : n <= 4 ? "Shaky" : n <= 7 ? "Steady" : "Loved";
  const SC = { agreed: { word: "MAJORITY", mark: "✓", long: "You voted with the majority" }, reversed: { word: "OUTVOTED", mark: "✗", long: "The other justices outvoted you" }, toofar: { word: "WENT TOO FAR", mark: "⚠", long: "You went further than the real Court" } };

  // ---------------- HUD ----------------
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    $("trustFill").style.width = (st.trust * 10) + "%";
    $("trustFill").className = st.trust <= 2 ? "low" : st.trust <= 4 ? "mid" : "ok";
    $("trustNum").textContent = st.trust + " · " + trustWord(st.trust);
    $("cases").innerHTML = CASES.map((c, i) => {
      const r = RULES[i], card = cardOf(r), open = card && st.opened[r.id];
      const cls = open ? "done " + card.sc : i === step.c ? "now" : "";
      return `<span class="${cls}">${open ? SC[card.sc].mark : c.icon} <i>${c.key}</i>${open ? " " + (card.sc === "toofar" ? "TOO FAR" : SC[card.sc].word) : ""}</span>`;
    }).join("");
    $("stepN").textContent = "Step " + Math.min(st.step + 1, TOTAL) + " of " + TOTAL;
  }
  function bumpTrust(delta) {
    const el = $("trustBox"); if (!el || !delta) return;
    const f = document.createElement("span");
    f.className = "float " + (delta > 0 ? "up" : "down");
    f.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    el.appendChild(f); setTimeout(() => f.remove(), 1700);
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  }
  const fxChip = n => `<span class="fx ${n > 0 ? "up" : n < 0 ? "down" : "n"}">📰 ${n > 0 ? "+" : n < 0 ? "−" : "±"}${Math.abs(n)}</span>`;
  function stamp(text, cls) {
    const host = $("scene"); if (!host || !text) return;
    host.querySelectorAll(".stamp").forEach(s => s.remove());
    const s = document.createElement("div"); s.className = "stamp " + (cls || ""); s.textContent = text;
    host.appendChild(s);
  }

  // ---------------- Screens ----------------
  const app = $("app");
  // Three columns that fit one Chromebook screen: courtroom (left) | case file (middle) | question (right).
  function shell(step, playHtml, o) {
    o = o || {};
    const off = ["ending", "write"].includes(step.type);
    const c = CASES[step.c];
    const terms = step.c < 0 ? LADDER_TERMS : (c || {}).terms;
    const termsBtn = off || !terms ? "" : `<button type="button" class="termsBtn" id="termsBtn" aria-expanded="false">📒 Word help</button>`;
    const left = o.left != null ? o.left : court(c ? step.c : -1, st.name, { look: st.judge }) + (c ? cap(c) : "") + (step.under ? step.under() : "");
    const mid = o.mid != null ? o.mid : step.mid ? step.mid() : c ? file(c) : "";
    app.innerHTML = `<div class="board t-${step.type}${mid ? "" : " two"}"><div class="scene" id="scene"><p class="kick">${esc(step.kicker)}</p>${left}</div>
      ${mid ? `<div class="mid" id="mid">${mid}</div>` : ""}
      <div class="play" id="play">${termsBtn ? `<div class="ptop">${termsBtn}</div>` : ""}<div id="termsBox"></div>${playHtml}</div></div>`;
    if ($("termsBtn")) $("termsBtn").onclick = () => {
      const box = $("termsBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="terms">${terms.map(t => `<p><b>${t[0]}</b>: ${t[1]}</p>`).join("")}</div>`;
      $("termsBtn").setAttribute("aria-expanded", String(!open));
    };
  }
  function nextLabel(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    if (!nx) return "Next ▶";
    if (nx.type === "ending") return "📋 See your record ▶";
    if (nx.c !== step.c) return "📁 Open Case " + (nx.c + 1) + " ▶";
    if (nx.type === "rule") return "⚖️ Hear both sides ▶";
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
    let look = cleanLook(st.judge);
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title">
      <div class="tart">
        <div id="tcourt">${court(-1, pre, { big: true, look: look })}</div>
        <div class="maker" id="maker"></div>
      </div>
      <div class="tcopy">
        <p class="tk">Government · Unit 3 · Day 2 · Level 2: Strike It Down</p>
        <h1>The Appeal</h1>
        <p class="recap">You got promoted. You sit on the U.S. Supreme Court now, and four laws are on trial.</p>
        <p class="missed">Day 1: you checked if people got a fair process. Today: you check the laws themselves.</p>
        <ul class="how"><li><span>1</span>Check your judge</li><li><span>2</span>Read each case file and the Constitution's words</li><li><span>3</span>Vote: strike the law down or let it stand. Then see the real vote</li></ul>
        <p class="tline">🎯 Today: judicial review. How courts can throw out a law that breaks the Constitution.</p>
        <p class="tchips"><span>⏱️ 25–30 min</span><span>📁 4 real cases</span><span>🛡️ 7 checks</span><span>✏️ 1 short answer</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">⚖️ Take your seat</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The cases, the laws, the votes, and what happened next are real. Your seat on the Court, Kane, and the headlines are made up. The pictures are drawings, not photos of the real people. Standard: SS.9-12.Gov.8.</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("nameBox").focus(); return; }
      try { if (window.classClaimDevice) window.classClaimDevice(fixed); } catch (e) {}
      st = fresh(); st.name = fixed; st.step = 0; st.judge = cleanLook(look);
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      save(); render(); window.scrollTo(0, 0);
    };
    // Make your judge: every tap redraws the courtroom and the close-up.
    const plaqueName = () => (window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim()).slice(0, 22);
    const sw = (kind, i, col, sel) => `<button type="button" class="sw${sel ? " on" : ""}" data-k="${kind}" data-v="${i}" style="background:${col}" aria-label="${kind} ${i + 1}" aria-pressed="${sel}"></button>`;
    function drawMaker() {
      $("maker").innerHTML = `<div class="mkpic">${portrait(look)}</div>
        <div class="mkrows"><p class="mkh">🎨 Your judge (change anything)</p>
          <div class="mkrow"><span>Skin</span>${LOOKS.skin.map((c, i) => sw("skin", i, c, look.skin === i)).join("")}</div>
          <div class="mkrow"><span>Hair</span>${LOOKS.hair.map(h => `<button type="button" class="chip${look.hair === h ? " on" : ""}" data-k="hair" data-v="${h}" aria-pressed="${look.hair === h}">${LOOKS.hairNames[h]}</button>`).join("")}</div>
          <div class="mkrow"><span>Color</span>${LOOKS.color.map((c, i) => sw("color", i, c, look.color === i)).join("")}</div>
          <div class="mkrow"><span>Robe</span>${LOOKS.robe.map((c, i) => sw("robe", i, c, look.robe === i)).join("")}<button type="button" class="chip${look.glasses ? " on" : ""}" data-k="glasses" data-v="1" aria-pressed="${look.glasses}">👓 Glasses</button></div>
        </div>`;
      $("maker").querySelectorAll("[data-k]").forEach(b => b.onclick = () => {
        const k = b.dataset.k;
        if (k === "glasses") look.glasses = !look.glasses; else if (k === "hair") look.hair = b.dataset.v; else look[k] = +b.dataset.v;
        st.judge = cleanLook(look); save();
        $("tcourt").innerHTML = court(-1, plaqueName(), { big: true, look: look });
        drawMaker();
      });
    }
    drawMaker();
    $("nameBox").addEventListener("keydown", e => { if (e.key === "Enter") $("startBtn").click(); });
    // The bench plaque shows their name as they type it.
    $("nameBox").addEventListener("input", () => {
      const t = document.querySelector(".tart .plq"); if (!t) return;
      const n = plaqueName();
      const txt = n ? "JUDGE " + n.toUpperCase() : "YOUR NAME HERE";
      t.textContent = txt;
      if (txt.length > 15) { t.setAttribute("textLength", "126"); t.setAttribute("lengthAdjust", "spacingAndGlyphs"); } else { t.removeAttribute("textLength"); t.removeAttribute("lengthAdjust"); }
    });
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
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + (isTestT() ? 0 : LOCK) * 1000;
    st.lockMsg = why;
    save();
    stamp("OBJECTION", "warn");
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
  }
  function markRight(step) {
    st.done[step.id] = true; save(); hud();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }
  const lockLeft = () => Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000));

  // ---- Check ----
  function check(step) {
    shell(step, `<p class="ask">${esc(step.ask)}</p><p class="warn">🔎 The answer is in the ${step.where} on this screen.</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
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
    runLock(why, $("qmsg"), () => draw(step), isTestT() ? 0 : LOCK);
  }
  function solved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>✓ ${esc(step.options[0])}</span></div>`;
    const w = document.querySelector("#play .warn"); if (w) w.remove();
    if (!quiet) { $("qmsg").textContent = ""; stamp(step.stamp); }
    addNext(step, step.reveal, quiet);
  }

  // ---- Rule: your ruling, then the real Supreme Court ----
  function rule(step) {
    shell(step, `<p class="ask">${esc(step.ask)}</p><div id="dbox"></div><div id="after"></div>`);
    const p = st.picks[step.id];
    if (p != null) return chosen(step, p, true);
    if (!step._order) step._order = shuffle(step.cards.map((c, i) => i));
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><span class="dtx"><b>${esc(c.t)}</b><span class="dline">${esc(c.line)}</span></span></button>`; }).join("")}</div><p class="peek">📰 Your vote moves public trust. 🏛️ Then you see how the real Court voted. You can't take it back.</p>`;
    $("dbox").querySelectorAll(".dcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = step.cards[i];
      st.picks[step.id] = i;
      st.trust = clamp(st.trust + c.fx);
      save(); hud(); bumpTrust(c.fx);
      const g = document.querySelector("#scene .gavel"); if (g) { g.classList.remove("hit"); void g.getBoundingClientRect(); g.classList.add("hit"); }
      chosen(step, i, false);
    });
  }
  function chosen(step, i, quiet) {
    const c = step.cards[i];
    const ask = document.querySelector("#play .ask"); if (ask) ask.remove();
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span><b>Your vote: ${esc(c.t)}</b><br><span class="dline">${esc(c.res)}</span></span></div>
      <div class="paper"><span class="ptag">Next morning's headline (made up)</span><p class="phead">${esc(c.head)}</p><p class="pfx">${fxChip(c.fx)} Public trust is now ${st.trust} of 10.</p></div>
      <div id="scBox"></div>`;
    if (st.opened[step.id]) return opened(step, c, true);
    const b = document.createElement("button"); b.type = "button"; b.className = "go seal"; b.id = "openBtn";
    b.textContent = "🏛️ See how the real Court voted";
    b.onclick = () => { st.opened[step.id] = true; save(); hud(); opened(step, c, false); };
    $("scBox").appendChild(b);
  }
  // The real ruling takes over the middle column, where the case file was.
  function opened(step, c, quiet) {
    const sc = SC[c.sc], cs = CASES[step.c];
    $("mid").innerHTML = `<div class="ruling ${c.sc}${quiet ? "" : " new"}">
        <span class="rtab">THE REAL VOTE</span>
        ${docCard(cs)}
        <div class="rstamp">${sc.mark} ${sc.word}${c.sc === "toofar" ? "" : " " + esc(step.vote)}</div>
        <p class="rlong">${sc.long}.${c.sc === "toofar" && step.tooFar ? " " + esc(step.tooFar) : ""}</p>
        <p class="rsec">What really happened</p>
        ${step.real.map(r => ln(r[0], r[1])).join("")}
      </div>`;
    $("scBox").innerHTML = kane("“" + esc(c.kane) + "”");
    if (!quiet) stamp(sc.word, c.sc === "agreed" ? "" : "bad");
    addNext(step, step.reveal, true);
  }

  // ---- Endings ----
  function ending() {
    const t = tally();
    let e;
    const N = RULES.length;
    if (t.toofar >= 2) e = { key: "Off the Rails", out: "Went too far twice", icon: "🚧", cls: "low", text: "Twice you went further than the case asked. A court answers the question in front of it. It doesn't get to rewrite everything." };
    else if (st.trust <= 2) e = { key: "The Court Nobody Trusts", out: "Lost the public's trust", icon: "🏚️", cls: "low", text: "You can't be voted out. But the Court has no army and no police. Its rulings only work if people respect them, and right now they don't." };
    else if (t.agreed >= 3) e = { key: "In the Majority", out: "Voted with the majority " + t.agreed + " of " + N, icon: "🏛️", cls: "best", text: "You voted with the winning side " + t.agreed + " of " + N + " times. Those votes are now the law in all 50 states." };
    else if (t.reversed >= 3) e = { key: "The Great Dissenter", out: "Outvoted " + t.reversed + " of " + N, icon: "✍️", cls: "mid", text: "You lost most of your votes. Losing votes still matter. The winning side in the death penalty case started as the losing side in 1989." };
    else e = { key: "Split Bench", out: "Mixed record", icon: "⚖️", cls: "mid", text: "Some days you had five votes. Some days you didn't. That is life on a court of nine." };
    const causes = RULES.map(s => { const c = cardOf(s); return c ? c.cause + " → " + SC[c.sc].word.toLowerCase() + " (trust " + (c.fx > 0 ? "+" : c.fx < 0 ? "−" : "±") + Math.abs(c.fx) + ")" : null; }).filter(Boolean);
    e.causes = causes;
    e.tally = t;
    return e;
  }
  const recordLine = () => { const t = tally(); return `🏛️ Majority ${t.agreed} · Outvoted ${t.reversed}${t.toofar ? " · Too far " + t.toofar : ""} · 📰 Trust ${st.trust} of 10`; };

  function endingStep(step) {
    const e = ending();
    const rows = RULES.map((s, i) => { const c = cardOf(s); return `<div class="recrow ${c ? c.sc : ""}"><span class="rc">${CASES[i].icon} ${CASES[i].key}</span><span class="rr">${c ? esc(c.t) : "No ruling"}</span><span class="rs">${c ? SC[c.sc].mark + " " + SC[c.sc].word : "—"}</span></div>`; }).join("");
    shell(step,
      `${reveal("<b>Judicial review</b> is the courts' power to strike down laws that break the Constitution. It is not written in the Constitution. The Court claimed it in <b>Marbury v. Madison</b> (1803).")}<p class="endm">${recordLine()}</p><div id="after"></div>`,
      { left: court(-1, st.name, { look: st.judge }) + `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
        mid: `<div class="cause"><p class="ch">Your record</p>${rows}<p class="ch c2">Caused by</p><ul>${e.causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>` });
    const b = nextBtn(step); b.textContent = "✏️ One short answer ▶";
    $("after").appendChild(b);
  }

  function writeStep(step) {
    const e = ending();
    const sent = st.turnedIn;
    shell(step,
      `<div class="write">${PROMPTS.map(p => `
         <label for="w_${p.id}">✏️ ${esc(p.label)}</label>
         <p class="bank">${p.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
         <p class="stem">Starter: ${esc(p.stem)}</p>
         <button type="button" class="mini" data-for="${p.id}">Use the starter</button>
         <textarea id="w_${p.id}" rows="4" placeholder="Write 2 short sentences…">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
         <button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Turn in ▶"}</button>
         <p id="sendMsg" class="msg" role="status" aria-live="polite">${sent ? "✓ Turned in. Court is adjourned." : ""}</p>
       </div>`,
      { left: court(-1, st.name, { look: st.judge }) + `<div class="endcard small ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2></div><div class="typed"><p><b>Tinker:</b> armband rule struck down.</p><p><b>Ewing:</b> three-strikes law stands.</p><p><b>Acton:</b> drug tests for athletes stand.</p><p><b>Simmons:</b> death penalty under 18 struck down.</p></div>`, mid: "" });
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
      const box = $("w_" + p.id), v = (box.value || "").trim();
      const bad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today's cases" });
        if (junk) { msg.textContent = junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) return bad("Write a little more (2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words.");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < p.newWords) return bad("Add more of your own ideas. Use details from the case.");
      const has = w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v) + " ");
      if (p.mustAll.some(g => !g.some(has))) return bad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }

    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    answers["First-try by standard"] = "Gov.8: " + CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    STEPS.forEach(s => {
      if (s.type === "rule") { const c = cardOf(s); if (c) answers["Vote · " + CASES[s.c].key] = c.t + " (" + SC[c.sc].long + ")"; }
      if (s.type === "check") {
        const w = st.wrong[s.id];
        answers[s.std + " · " + s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Final record"] = "Majority " + e.tally.agreed + " · Outvoted " + e.tally.reversed + " · Too far " + e.tally.toofar + " · Public trust " + st.trust + " of 10";

    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work. Court is adjourned."; msg.className = "msg good";
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
    if (step.type === "rule") return rule(step);
    if (step.type === "ending") return endingStep(step);
    return writeStep(step);
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name, look = st.judge; st = fresh(); st.name = name; st.judge = cleanLook(look); st.step = name ? 0 : -1;
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
  // The teacher signed in as Test T. can jump to any screen, answer the current check,
  // or make the current ruling and open the Supreme Court's answer.
  function fillRulings(upTo) {
    // Jumping past a ruling as Test T.: fill the "agreed" ruling so later screens have something to show.
    STEPS.slice(0, upTo).forEach(s => {
      if (s.type === "rule" && st.picks[s.id] == null) {
        const i = s.cards.findIndex(c => c.sc === "agreed");
        st.picks[s.id] = i; st.opened[s.id] = true; st.trust = clamp(st.trust + s.cards[i].fx);
      }
    });
  }
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => STEPS[i].short || STEPS[i].kicker || STEPS[i].type,
      go: i => { if (!st.name) st.name = "Test T."; st.step = i; st.lockUntil = 0; fillRulings(i); save(); render(); },
      solve: () => {
        const s = STEPS[Math.min(st.step, TOTAL - 1)]; if (!s) return;
        if (s.type === "check" && !st.done[s.id]) { st.done[s.id] = true; st.lockUntil = 0; save(); render(); }
        else if (s.type === "rule") {
          if (st.picks[s.id] == null) { const b = document.querySelector("#dbox .dcard"); if (b) b.click(); }
          const o = $("openBtn"); if (o) o.click();
        }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
