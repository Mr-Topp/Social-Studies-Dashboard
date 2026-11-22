// =====================================================================
//  THE APPEAL · Level 1: Unfair Trials  (Government Unit 3 · Day 1 · Judicial Branch)
//  You are a judge on your state's top court. Four REAL appeals land on your desk:
//  Miranda (confession, 5th), Gault (15-year-old, no fair hearing, 14th),
//  T.L.O. (school purse search, 4th), Frederick ("BONG HiTS 4 JESUS" banner, 1st).
//  The Supreme Court sided with the first two and with the SCHOOL in the last two,
//  so "always side with the kid" and "always side with the state" both get reversed twice.
//  The picture on every screen is the courtroom: the judge (the student, name on the bench)
//  up on the bench, looking down at the person at the stand. Drawings, not photos.
//  Students build their own judge on the first screen (skin, hair, robe, glasses).
//  ONE SCREEN, NO SCROLLING on a Chromebook: three columns (courtroom | case file | question).
//  When the real ruling opens, it takes over the middle column (record card + photo spot).
//  Each case: read the file (check) -> read the Constitution's words (check) -> rule.
//  Your ruling moves Public Trust. Then the real U.S. Supreme Court ruling opens and
//  stamps yours AGREED, REVERSED or WENT TOO FAR. Both choices cost something.
//  7 checks (all Gov.8), 4 rulings, 5 endings, 1 writing answer.
//  Real: the cases, the record, the rulings, what happened next.
//  Made up: your judge seat, Prosecutor Kane, the headlines, the trust meter.
//  Students never see a count of their wrong answers (teacher-only, in the turn-in).
//  Turn-in via shared/turnin.js (same payload shape as Branch Wars).
// =====================================================================
(function () {
  "use strict";
  const KEY = "gov-u3-d1-the-appeal-v2";
  const ASSIGNMENT_ID = "gov-u3-d1-the-appeal";
  const TITLE = "Government · Unit 3 · Day 1 · The Appeal: Unfair Trials";
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
  const kane = t => `<div class="kane"><span class="kface" aria-hidden="true">👔</span><div class="say"><span class="who-s">Prosecutor Kane</span>${t}</div></div>`;

  const ladder = () => `<div class="ladder">
      <div class="rung top"><span class="ri" aria-hidden="true">🏛️</span><div><b>U.S. Supreme Court</b><span>The top court. It has the final say.</span></div></div>
      <div class="rarrow" aria-hidden="true">▲ can reverse the court below</div>
      <div class="rung you"><span class="ri" aria-hidden="true">⚖️</span><div><b>Your court</b><span>Checks trials for mistakes. Voters picked you.</span></div><i class="youtag">YOU</i></div>
      <div class="rarrow" aria-hidden="true">▲ appeal</div>
      <div class="rung"><span class="ri" aria-hidden="true">🔨</span><div><b>Trial court</b><span>Decides guilty or not guilty.</span></div></div>
    </div>`;

  const file = c => `<div class="file"><span class="ftab">CASE FILE ${c.n} of ${CASES.length}</span>
      <div class="fhead"><span class="fmug" aria-hidden="true">${c.icon}</span><div><h2>${c.name}, ${c.age}</h2><p>${c.place}</p></div><span class="fstatus">${c.status}</span></div>
      ${row(c.chargeLabel || "Charge", c.charge)}
      <p class="fsec">${c.recLabel}</p>
      ${c.record.map(r => ln(r[0], r[1])).join("")}
      ${c.sentence ? row(c.sentenceLabel || "Sentence", `<b>${c.sentence}</b>`) : ""}
      ${c.extra ? `<p class="fextra">${c.extra}</p>` : ""}
      ${src("Real case.")}</div>`;

  // Plain words first (big), then only the few real words that matter (small).
  const amend = c => `<div class="amend"><span class="atab">${c.amend} · IN PLAIN WORDS</span>
      <p class="aplain">${c.plain}</p>
      <p class="atext"><span class="areal">Real words:</span> ${c.text}</p>
      ${c.note ? `<p class="anote">${c.note}</p>` : ""}</div>`;
  const sides = c => `<div class="sides">
      <div class="side his"><span class="stag">${c.sideName}</span><p>${c.sideHis}</p></div>
      <div class="vsb" aria-hidden="true">VS</div>
      <div class="side state"><span class="stag">${c.stateName || "👔 The State · Prosecutor Kane"}</span><p>${c.sideState}</p></div>
    </div>`;
  const cap = c => `<div class="mini-file"><span aria-hidden="true">${c.icon}</span><span><b>${c.name}</b> · ${c.short}</span></div>`;

  // Real photos of the people and events. Claude can't pull these off the web, so each case has a spot
  // Fynn can fill with a photo he is allowed to use: put the file in this folder's img/ and fill in the line,
  // like  Miranda: { src: "img/miranda.jpg", alt: "Ernesto Miranda in 1963", credit: "Photo: Arizona State Library" }
  // Students only see a spot once it has a photo. Test T. sees the empty spots.
  const PHOTOS = { "Miranda": null, "Gault": null, "T.L.O.": null, "Frederick": null };
  const photoSpot = c => {
    const ph = PHOTOS[c.key];
    if (ph && ph.src) return `<figure class="photo"><img src="${esc(ph.src)}" alt="${esc(ph.alt || "")}"><figcaption>${esc(ph.credit || "")}</figcaption></figure>`;
    return isTestT() ? `<div class="photo empty" title="Only Test T. sees this">📷<span>Photo spot<br>${esc(c.key)}</span></div>` : "";
  };
  // The record card: the real case name, where it is printed, the date, and who wrote the opinion.
  const docCard = c => `<div class="doc">${photoSpot(c)}<div class="doct"><span class="dsm">Supreme Court of the United States</span><b>${c.doc.title}</b><span class="dcite">${c.doc.cite} · Decided ${c.doc.decided}</span><span class="dcite" hidden>Opinion of the Court by ${c.doc.by}</span></div></div>`;

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
    // Miranda: adult man, jail-blue shirt
    { h: 0, shirt: "#8f9bb3", pants: "#59647d", hair: `<path d="M-13 -4 Q-14 -17 0 -17 Q14 -17 13 -5 Q8 -11 0 -11 Q-8 -11 -13 -4Z" fill="${INK}"/>`, prop: "" ,
      exhibit: `<rect x="-17" y="-34" width="34" height="42" rx="2" fill="#fffdf6" stroke="${INK}" stroke-width="2"/><path d="M-11 -25h22M-11 -18h22M-11 -11h22M-11 -4h14" stroke="#8a93a8" stroke-width="2"/><path d="M-9 3q5 -6 9 0t9 -2" stroke="#b3261e" stroke-width="2" fill="none"/>`, exLabel: "CONFESSION" },
    // Gault: 15, shorter, striped tee
    { h: 12, shirt: "#fffdf6", pants: "#3d5a80", stripes: "#c0392b", hair: `<path d="M-14 -2 Q-16 -19 0 -18 Q16 -19 14 -3 Q10 -9 3 -10 Q-6 -12 -14 -2Z" fill="#6b4423"/>`, prop: "",
      exhibit: `<rect x="-19" y="-16" width="38" height="22" rx="5" fill="#2b2f3a" stroke="${INK}" stroke-width="2"/><circle cx="0" cy="-5" r="7" fill="#fffdf6" stroke="${INK}" stroke-width="2"/><path d="M-22 -22 Q0 -34 22 -22 L18 -16 Q0 -25 -18 -16Z" fill="#2b2f3a" stroke="${INK}" stroke-width="2"/>`, exLabel: "THE PHONE" },
    // T.L.O.: 14, long hair, purse
    { h: 14, shirt: "#7b5ea7", pants: "#3d5a80", hair: `<path d="M-14 -3 Q-16 -19 0 -18 Q16 -19 14 -2 L15 16 Q10 18 9 6 Q9 -8 0 -9 Q-9 -8 -10 6 Q-11 18 -16 16Z" fill="#4a2f1b"/>`, prop: "",
      exhibit: `<path d="M-12 -14 Q0 -36 12 -14" stroke="${INK}" stroke-width="3" fill="none"/><rect x="-18" y="-16" width="36" height="24" rx="6" fill="#a8672f" stroke="${INK}" stroke-width="2"/><rect x="-5" y="-10" width="10" height="7" rx="2" fill="#c89b2a" stroke="${INK}" stroke-width="1.5"/>`, exLabel: "THE PURSE" },
    // Frederick: senior, hoodie
    { h: 3, shirt: "#b3402e", pants: "#3a3f4b", hood: true, hair: `<path d="M-13 -3 Q-15 -18 0 -17 Q15 -18 13 -4 Q7 -10 0 -10 Q-8 -10 -13 -3Z" fill="#8a5a2b"/>`, prop: "",
      exhibit: `<rect x="-60" y="-30" width="120" height="30" rx="2" fill="#fffdf6" stroke="${INK}" stroke-width="2"/><text x="0" y="-10.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="10" fill="${INK}" textLength="104" lengthAdjust="spacingAndGlyphs">BONG HiTS 4 JESUS</text><path d="M-40 0v10M40 0v10" stroke="${INK}" stroke-width="2"/>`, exLabel: "THE BANNER" }
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

  // ---------------- The four real cases ----------------
  // Reading rule (Fynn, 11-14): short sentences, everyday words, about a 12-year-old level.
  // Each amendment shows a plain-words line first, then only the few real words that matter.
  const CASES = [
    { n: 1, key: "Miranda", icon: "🚨", name: "Ernesto Miranda", age: "22", place: "Phoenix, Arizona · 1963", status: "LOCKED UP",
      charge: "Kidnapping and attacking a woman", recLabel: "With the police",
      record: [["⏱️", "Police questioned him for 2 hours."], ["🚫", "He had no lawyer."], ["🤐", "No one said he could stay quiet."], ["✍️", "He signed a confession."]],
      sentence: "20 to 30 years",
      short: "confession", amend: "5th Amendment", plain: "You can't be forced to confess.",
      text: "“No person … shall be <mark>compelled</mark> … to be a witness against himself.”",
      note: "<b>Compelled</b> = forced.",
      sideName: "✉️ Miranda's lawyers", sideHis: "He was alone and scared. He didn't know he could stay quiet.",
      sideState: "Nobody forced him. He signed it. He may be dangerous.",
      doc: { title: "MIRANDA v. ARIZONA", cite: "384 U.S. 436", decided: "June 13, 1966", by: "Chief Justice Warren" },
      terms: [["Appeal", "asking a higher court to check a trial"], ["Confession", "saying “I did it”"]] },
    { n: 2, key: "Gault", icon: "📞", name: "Gerald Gault", age: "15", place: "Gila County, Arizona · 1964", status: "LOCKED UP",
      chargeLabel: "Accused of", charge: "A rude phone call to a neighbor", recLabel: "What happened",
      record: [["🚓", "Police took him. No one told his parents."], ["📄", "No lawyer. Nothing in writing."], ["👻", "The neighbor never came to court."]],
      sentence: "Locked up until 21. Up to 6 years.", extra: "An adult would get a small fine or 2 months.",
      short: "age 15", amend: "14th Amendment", plain: "The government can't lock you up without fair steps.",
      text: "“… nor shall <mark>any State</mark> deprive <mark>any person</mark> of … <mark>liberty</mark> … without <mark>due process of law</mark>.”",
      note: "<b>Due process</b> = fair steps. <b>Liberty</b> = freedom.",
      sideName: "✉️ Gerald's parents", sideHis: "Six years is punishment. He got fewer rights than an adult.",
      sideState: "Kids' court is there to help, not punish. It doesn't need lawyers.",
      doc: { title: "IN RE GAULT", cite: "387 U.S. 1", decided: "May 15, 1967", by: "Justice Fortas" },
      terms: [["Due process", "fair steps before the government punishes you"], ["Deprive", "take away"], ["Liberty", "freedom"]] },
    { n: 3, key: "T.L.O.", icon: "👜", name: "“T.L.O.”", age: "14", place: "Piscataway, New Jersey · 1980", status: "ON PROBATION",
      chargeLabel: "Accused of", charge: "Selling marijuana at school", recLabel: "At school",
      record: [["🚬", "A teacher caught her smoking in the bathroom."], ["🙅", "She said she didn't smoke."], ["👜", "The assistant principal searched her purse."], ["🔎", "He found marijuana and a list of kids who owed her money."]],
      sentence: "1 year of probation",
      short: "purse search", amend: "4th Amendment", plain: "The government can't search you without a good reason.",
      text: "“… against <mark>unreasonable</mark> searches …”",
      note: "A public school is part of the government.",
      sideName: "✉️ T.L.O.'s lawyers", sideHis: "He had no warrant. Students have rights at school too.",
      sideState: "A teacher saw her smoking. That is a good reason to look.",
      doc: { title: "NEW JERSEY v. T. L. O.", cite: "469 U.S. 325", decided: "January 15, 1985", by: "Justice White" },
      terms: [["Warrant", "a judge's OK to search"], ["Probation", "staying free, but under a court's rules"]] },
    { n: 4, key: "Frederick", icon: "📣", name: "Joseph Frederick", age: "a senior", place: "Juneau, Alaska · 2002", status: "SUSPENDED",
      chargeLabel: "In trouble for", charge: "A banner: BONG HiTS 4 JESUS", recLabel: "What happened",
      record: [["🔥", "The Olympic torch passed his school. Students went out to watch."], ["📺", "He held up the banner for the TV cameras."], ["🧑‍🏫", "The principal took it away."]],
      sentenceLabel: "Penalty", sentence: "Suspended 10 days", extra: "This one went to federal court.",
      short: "banner", amend: "1st Amendment", plain: "The government can't stop you from speaking.",
      text: "“… no law … abridging the <mark>freedom of speech</mark> …”",
      note: "A public school is part of the government.",
      sideName: "✉️ Frederick's lawyers", sideHis: "It was a joke to get on TV. Jokes are free speech.",
      stateName: "🏫 The principal's lawyers", sideState: "It was a school event. The banner cheered for drugs.",
      doc: { title: "MORSE v. FREDERICK", cite: "551 U.S. 393", decided: "June 25, 2007", by: "Chief Justice Roberts" },
      terms: [["Abridging", "limiting"], ["Suspended", "kept out of school for a while"], ["Federal court", "a court run by the national government"]] }
  ];
  const LADDER_TERMS = [["Appeal", "asking a higher court to check a trial"], ["Reverse", "cancel a lower court's ruling"]];

  // ---------------- Steps ----------------
  // check: options[0] is right; miss[i] teaches options[i+1].
  // rule: cards[].sc = "agreed" | "reversed" | "toofar"; fx = change in public trust.
  // Cases 1-2 get two checks each (file, then words). Cases 3-4 get one check, so the game stays at 7 checks.
  const STEPS = [
    { id: "c1", type: "check", c: -1, std: "Gov.8", kicker: "Your first day", short: "What does your court do?", stamp: "SWORN IN", where: "chart",
      mid: () => ladder(),
      ask: "Someone says their trial was unfair. What is your job?",
      options: ["See if the trial was fair", "Hear the witnesses again", "Decide if they are guilty", "Write a new law"],
      miss: ["Witnesses talk at the trial court. Look at your court.", "The trial court decides guilt. Look at your court.", "Courts don't write laws. Look at your court."],
      hint: "Look at your court in the chart.",
      reveal: "<b>Trial courts</b> decide guilt. <b>Appeals courts</b> check if the trial was fair." },

    // ---- Case 1: Miranda ----
    { id: "c2", type: "check", c: 0, std: "Gov.8", kicker: "Case 1 · The file", short: "Miranda: what went wrong?", stamp: "NOTED", where: "case file",
      ask: "His lawyers say something was unfair. What?",
      options: ["No one told him his rights", "Police had no reason to arrest", "The police hit him", "His trial had no jury"],
      miss: ["The file doesn't say that. What did no one tell him?", "The file doesn't say that. What did no one tell him?", "The file doesn't say that. What did no one tell him?"],
      hint: "What did no one tell him?",
      reveal: "His claim: a confession doesn't count if you never knew your rights." },
    { id: "c3", type: "check", c: 0, std: "Gov.8", kicker: "Case 1 · The words", short: "Miranda: what does “compelled” mean?", stamp: "INTERPRET", where: "marked word",
      under: () => amend(CASES[0]),
      ask: "No one hit him. So what must the court decide?",
      options: ["Can pressure count as force?", "Should all confessions be banned?", "Did he really do the crime?", "Was the arrest OK?"],
      miss: ["Too far. Only forced confessions are banned.", "The trial court decides guilt. Your job is the words.", "This case isn't about the arrest. Look at the marked word."],
      hint: "Look at the marked word. What counts as forced?",
      reveal: "Courts <b>interpret</b> the law. That means they decide what the words mean." },
    { id: "e1", type: "rule", c: 0, kicker: "Case 1 · Your ruling", short: "Rule on Miranda",
      under: () => sides(CASES[0]),
      ask: "Rule on Miranda.",
      cards: [
        { icon: "🔒", t: "Keep him locked up", line: "The confession counts", fx: 2, sc: "reversed",
          res: "The confession stays. So does the sentence.", head: "COURT KEEPS KIDNAPPER LOCKED UP", cause: "Kept Miranda's confession",
          kane: "Four of nine judges agreed with us. Four is not five." },
        { icon: "🔁", t: "Order a new trial", line: "No confession this time", fx: -3, sc: "agreed",
          res: "You toss the confession. New trial.", head: "JUDGE TOSSES CONFESSION", cause: "Threw out Miranda's confession",
          kane: "He confessed. You know that, right?" },
        { icon: "🔓", t: "Set him free", line: "No new trial", fx: -4, sc: "toofar",
          res: "You let him go. No new trial.", head: "JUDGE FREES KIDNAPPER", cause: "Freed Miranda",
          kane: "Start packing your office, Judge." }
      ],
      vote: "5–4", caseName: "Miranda v. Arizona (1966)",
      real: [["🏛️", "The Supreme Court sided with Miranda, 5 to 4."], ["📜", "New rule: police must tell you your rights first."], ["🔁", "He got a new trial. <b>Guilty</b> again."]],
      tooFar: "The real Court never said he was innocent. It ordered a new trial.",
      reveal: "An appeal asks: was it <b>fair</b>? Not: did he do it?" },

    // ---- Case 2: Gault ----
    { id: "c4", type: "check", c: 1, std: "Gov.8", kicker: "Case 2 · The file", short: "Gault: what was unfair?", stamp: "NOTED", where: "case file",
      ask: "What was unfair about his hearing?",
      options: ["The neighbor never showed up", "He was only 15 years old", "The call was to a neighbor", "A judge ran the hearing"],
      miss: ["Being 15 isn't unfair by itself. Who never came?", "That is what he was accused of. Who never came?", "Judges run hearings. Who never came?"],
      hint: "Who never came to court?",
      reveal: "No lawyer. No neighbor in court. Six years." },
    { id: "c5", type: "check", c: 1, std: "Gov.8", kicker: "Case 2 · The words", short: "Gault: do the words cover kids?", stamp: "INTERPRET", where: "marked words",
      under: () => amend(CASES[1]),
      ask: "Arizona says kids don't get these rights. Which words say who does?",
      options: ["“any person”", "“any State”", "“liberty”", "“due process of law”"],
      miss: ["That is who must follow the rule. Who is protected?", "That is what can't be taken. Who is protected?", "Those are the fair steps. Who is protected?"],
      hint: "Find the words that name who is protected.",
      reveal: "It says “any person.” Not “any adult.”" },
    { id: "e2", type: "rule", c: 1, kicker: "Case 2 · Your ruling", short: "Rule on Gault",
      under: () => sides(CASES[1]),
      ask: "Rule on Gerald.",
      cards: [
        { icon: "🔒", t: "Keep him locked up", line: "Kids' court can skip the rules", fx: 1, sc: "reversed",
          res: "The hearing counts. He stays locked up.", head: "COURT BACKS KIDS' JUDGE", cause: "Kept Gerald locked up",
          kane: "Kids' court is like a parent. Parents don't need lawyers." },
        { icon: "🧾", t: "Throw out the hearing", line: "Kids get fair hearings too", fx: -1, sc: "agreed",
          res: "You throw it out. Kids get rights too.", head: "JUDGE: TEENS GET LAWYERS TOO", cause: "Threw out Gerald's hearing",
          kane: "Next you'll want police to read them their rights. Oh. Wait." },
        { icon: "✂️", t: "Cut his time", line: "Keep the hearing", fx: 0, sc: "reversed",
          res: "You cut his time. The hearing was still unfair.", head: "COURT CUTS TEEN'S TIME", cause: "Cut Gerald's time, kept the hearing",
          kane: "Half and half. Nobody is happy." }
      ],
      vote: "8–1", caseName: "In re Gault (1967)",
      real: [["🏛️", "The Supreme Court sided with Gerald, 8 to 1."], ["📜", "New rule: kids get a lawyer and a fair hearing."], ["🌎", "That covers every kids' court in the country."]],
      tooFar: "",
      reveal: "A Supreme Court ruling is the rule for <b>every court below it</b>." },

    // ---- Case 3: T.L.O. (the Court sides with the school) ----
    { id: "c6", type: "check", c: 2, std: "Gov.8", kicker: "Case 3 · File + words", short: "T.L.O.: what is “unreasonable”?", stamp: "INTERPRET", where: "marked word",
      under: () => amend(CASES[2]),
      ask: "She says the search was not OK. What must the court decide?",
      options: ["Did he have a good reason to look?", "Did she really sell drugs?", "Should all searches be banned?", "Was probation too much?"],
      miss: ["The trial court decides guilt. Look at the marked word.", "Too far. Only unreasonable searches are banned.", "This case isn't about the punishment. Look at the marked word."],
      hint: "Look at the marked word. What makes a search OK?",
      reveal: "The words don't say what “unreasonable” means at school. Judges decide." },
    { id: "e3", type: "rule", c: 2, kicker: "Case 3 · Your ruling", short: "Rule on T.L.O.",
      under: () => sides(CASES[2]),
      ask: "Rule on T.L.O.",
      cards: [
        { icon: "🧾", t: "Throw out the search", line: "Schools need a warrant", fx: -1, sc: "reversed",
          res: "You throw out what he found.", head: "JUDGE: PRINCIPALS NEED A WARRANT", cause: "Threw out the purse search",
          kane: "Six judges just backed the principal." },
        { icon: "🔎", t: "The search was OK", line: "He had a good reason", fx: 1, sc: "agreed",
          res: "The search counts.", head: "COURT BACKS SCHOOL ON PURSE SEARCH", cause: "Allowed the purse search",
          kane: "Look at that. We agree." },
        { icon: "🏫", t: "Search anyone, any time", line: "No reason needed", fx: 1, sc: "toofar",
          res: "You say schools never need a reason.", head: "COURT: SCHOOLS CAN SEARCH ANYONE", cause: "Let schools search with no reason",
          kane: "Even I didn't ask for that." }
      ],
      vote: "6–3", caseName: "New Jersey v. T.L.O. (1985)",
      real: [["🏛️", "The Supreme Court sided with the school, 6 to 3."], ["📜", "Rule: schools need a good reason. They don't need a warrant."], ["🎒", "That is still the rule at school today."]],
      tooFar: "The real Court said schools still need a good reason.",
      reveal: "The Court doesn't always side with the person. It decides what the words <b>mean</b>." },

    // ---- Case 4: Morse v. Frederick ("Bong Hits 4 Jesus"; the Court sides with the school) ----
    { id: "c7", type: "check", c: 3, std: "Gov.8", kicker: "Case 4 · File + words", short: "Frederick: where does free speech stop?", stamp: "INTERPRET", where: "marked words",
      under: () => amend(CASES[3]),
      ask: "He says the school broke his free speech. What must the court decide?",
      options: ["Can a school limit speech at its event?", "Is a banner a kind of speech?", "Should students watch the torch?", "Was 10 days too long?"],
      miss: ["Nobody argued that. Look at where he held it up.", "That is the school's call. Look at the marked words.", "This case isn't about the days. Look at the marked words."],
      hint: "Look at the marked words, and at where he held up the banner.",
      reveal: "Even free speech has limits. Judges decide where." },
    { id: "e4", type: "rule", c: 3, kicker: "Case 4 · Your ruling", short: "Rule on Frederick",
      under: () => sides(CASES[3]),
      ask: "Rule on Frederick.",
      cards: [
        { icon: "📣", t: "Frederick wins", line: "The banner is free speech", fx: -1, sc: "reversed",
          res: "You say the banner was OK.", head: "JUDGE OKS “BONG HITS” BANNER", cause: "Protected Frederick's banner",
          kane: "Five judges read that banner another way." },
        { icon: "🏫", t: "The principal wins", line: "Schools can stop pro-drug signs", fx: 1, sc: "agreed",
          res: "You say the school could take it.", head: "COURT BACKS PRINCIPAL ON BANNER", cause: "Backed the principal on the banner",
          kane: "Not my case. Still enjoying it." },
        { icon: "🤐", t: "Ban any speech", line: "Whatever a principal dislikes", fx: 0, sc: "toofar",
          res: "You say schools can ban any speech.", head: "COURT: PRINCIPALS CAN BAN ANYTHING", cause: "Let schools ban any speech",
          kane: "Easy, Judge. Nobody asked for that." }
      ],
      vote: "5–4", caseName: "Morse v. Frederick (2007)",
      real: [["🏛️", "The Supreme Court sided with the principal, 5 to 4."], ["📜", "Rule: schools can stop pro-drug speech at school events."], ["🗣️", "Students still have free speech at school."]],
      tooFar: "The real Court only allowed limits on pro-drug speech.",
      reveal: "Four cases. Each time, judges decided what the words <b>mean</b>." },

    { id: "end", type: "ending", c: 4, kicker: "Your record", short: "Ending" },
    { id: "write", type: "write", c: 4, kicker: "One last thing", short: "Short answer" }
  ];

  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const RULES = STEPS.filter(s => s.type === "rule");

  const PROMPTS = [
    { id: "meaning", short: "Interpreting the Constitution", label: "Pick one case. What did the Court say the words mean?",
      bank: ["Miranda", "Gault", "T.L.O.", "Frederick", "stay silent", "fair hearing", "search", "free speech"],
      stem: "In the ___ case, the Court said the words mean ___. That mattered because ___.", min: 40, newWords: 3,
      mustAll: [["miranda", "gault", "t.l.o", "tlo", "t. l. o", "frederick", "morse", "bong"], ["lawyer", "silent", "rights", "warn", "fair", "hearing", "due process", "confession", "accuser", "charges", "search", "warrant", "reason", "purse", "compelled", "forced", "person", "speech", "banner", "drug"]],
      mustMsg: "Name the case (Miranda, Gault, T.L.O., or Frederick) and say what the Court decided the words mean." }
  ];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, trust: START_TRUST, picks: {}, opened: {}, wrong: {}, done: {}, writing: {}, turnedIn: false, judge: Object.assign({}, DEFAULT_LOOK) });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.picks || typeof st.trust !== "number") st = fresh();
  st.opened = st.opened || {};
  st.judge = cleanLook(st.judge);
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
  const SC = { agreed: { word: "AGREED", mark: "✓", long: "The Supreme Court agreed with you" }, reversed: { word: "REVERSED", mark: "✗", long: "The Supreme Court reversed you" }, toofar: { word: "WENT TOO FAR", mark: "⚠", long: "You went too far" } };

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
        <p class="tk">Government · Unit 3 · Day 1 · Level 1: Unfair Trials</p>
        <h1>The Appeal</h1>
        <p class="recap">Four real people say they were treated unfairly. You decide.</p>
        <ul class="how"><li><span>1</span>Make your judge</li><li><span>2</span>Read the case</li><li><span>3</span>Rule. Then see what the real Supreme Court did</li></ul>
        <p class="tline">🎯 Today: how courts work, and how judges read the law.</p>
        <p class="tchips"><span>⏱️ 25–30 min</span><span>📁 4 real cases</span><span>🛡️ 7 checks</span><span>✏️ 1 short answer</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">⚖️ Take the bench</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">The cases and rulings are real. Kane and the headlines are made up. The pictures are drawings. Standard: SS.9-12.Gov.8.</p>
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
        <div class="mkrows"><p class="mkh">🎨 Make your judge</p>
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
    shell(step, `<p class="ask">${esc(step.ask)}</p><p class="warn">🔎 Look at the ${step.where}.</p><div class="replies" id="replies"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
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
    $("dbox").innerHTML = `<div class="cards">${step._order.map(i => { const c = step.cards[i]; return `<button type="button" class="dcard" data-i="${i}"><span class="di" aria-hidden="true">${c.icon}</span><span class="dtx"><b>${esc(c.t)}</b><span class="dline">${esc(c.line)}</span></span></button>`; }).join("")}</div><p class="peek">📰 Your ruling moves public trust. No take-backs.</p>`;
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
    $("dbox").innerHTML = `<div class="chosen"><span class="di" aria-hidden="true">${c.icon}</span><span><b>Your ruling: ${esc(c.t)}</b><br><span class="dline">${esc(c.res)}</span></span></div>
      <div class="paper"><span class="ptag">Tomorrow's headline (made up)</span><p class="phead">${esc(c.head)}</p><p class="pfx">${fxChip(c.fx)} Public trust: ${st.trust} of 10.</p></div>
      <div id="scBox"></div>`;
    if (st.opened[step.id]) return opened(step, c, true);
    const b = document.createElement("button"); b.type = "button"; b.className = "go seal"; b.id = "openBtn";
    b.textContent = "🏛️ Open the real Supreme Court ruling";
    b.onclick = () => { st.opened[step.id] = true; save(); hud(); opened(step, c, false); };
    $("scBox").appendChild(b);
  }
  // The real ruling takes over the middle column, where the case file was.
  function opened(step, c, quiet) {
    const sc = SC[c.sc], cs = CASES[step.c];
    $("mid").innerHTML = `<div class="ruling ${c.sc}${quiet ? "" : " new"}">
        <span class="rtab">THE REAL RULING</span>
        ${docCard(cs)}
        <div class="rstamp">${sc.mark} ${sc.word}${c.sc === "toofar" ? "" : " " + esc(step.vote)}</div>
        <p class="rlong">${c.sc === "toofar" && step.tooFar ? esc(step.tooFar) : sc.long + "."}</p>
        <p class="rsec">What really happened</p>
        ${step.real.map(r => ln(r[0], r[1])).join("")}
      </div>`;
    $("scBox").innerHTML = kane("“" + esc(c.kane) + "”");
    const sd = document.querySelector("#scene .sides"); if (sd) sd.remove();   // less to read once they have ruled
    if (!quiet) stamp(sc.word, c.sc === "agreed" ? "" : "bad");
    addNext(step, step.reveal, true);
  }

  // ---- Endings ----
  function ending() {
    const t = tally();
    let e;
    const N = RULES.length;
    if (t.toofar >= 2) e = { key: "Off the Rails", out: "Went too far twice", icon: "🚧", cls: "low", text: "You went too far twice. Courts fix mistakes. They don't rewrite everything." };
    else if (t.agreed >= 3 && st.trust >= 3) e = { key: "Supreme Court Material", out: "Supreme Court agreed, kept the seat", icon: "🏛️", cls: "best", text: "The Supreme Court backed you " + t.agreed + " of " + N + " times. And voters kept you. Barely." };
    else if (st.trust <= 2 && t.agreed >= 2) e = { key: "Right. And Voted Out.", out: "Supreme Court agreed, voters did not", icon: "🗳️", cls: "mid", text: "The Supreme Court backed you " + t.agreed + " of " + N + " times. Voters fired you anyway." };
    else if (t.reversed >= 2 && st.trust >= 6) e = { key: "Popular. And Reversed.", out: "Voters agreed, Supreme Court did not", icon: "📣", cls: "mid", text: "Voters love you. The Supreme Court reversed you " + t.reversed + " times." };
    else e = { key: "Split Decision", out: "Mixed record, kept the seat", icon: "⚖️", cls: "mid", text: "You kept your job. The Supreme Court backed you some days. Not others." };
    const causes = RULES.map(s => { const c = cardOf(s); return c ? c.cause + " → " + SC[c.sc].word.toLowerCase() + " (trust " + (c.fx > 0 ? "+" : c.fx < 0 ? "−" : "±") + Math.abs(c.fx) + ")" : null; }).filter(Boolean);
    e.causes = causes;
    e.tally = t;
    return e;
  }
  const recordLine = () => { const t = tally(); return `🏛️ Agreed ${t.agreed} · Reversed ${t.reversed}${t.toofar ? " · Too far " + t.toofar : ""} · 📰 Trust ${st.trust} of 10`; };

  function endingStep(step) {
    const e = ending();
    const rows = RULES.map((s, i) => { const c = cardOf(s); return `<div class="recrow ${c ? c.sc : ""}"><span class="rc">${CASES[i].icon} ${CASES[i].key}</span><span class="rr">${c ? esc(c.t) : "No ruling"}</span><span class="rs">${c ? SC[c.sc].mark + " " + SC[c.sc].word : "—"}</span>${c ? fxChip(c.fx) : ""}</div>`; }).join("");
    shell(step,
      `${reveal("State judges can be <b>voted out</b>. Federal judges serve <b>for life</b>, so they can make calls people hate.")}<p class="endm">${recordLine()}</p><div id="after"></div>`,
      { left: court(-1, st.name, { look: st.judge }) + `<div class="endcard ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2><p>${esc(e.text)}</p></div>`,
        mid: `<div class="cause"><p class="ch">Your record · each ruling moved public trust</p>${rows}</div>` });
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
         <button type="button" class="go" id="sendBtn"${sent ? " disabled" : ""}>${sent ? "✓ Turned in" : "Turn in ▶"}</button>
         <p id="sendMsg" class="msg${sent ? " good" : ""}" role="status" aria-live="polite">${sent ? "✓ Turned in. Court is adjourned." : ""}</p>
       </div>`,
      { left: court(-1, st.name, { look: st.judge }) + `<div class="endcard small ${e.cls}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2>${esc(e.key)}</h2></div><div class="typed"><p><b>Miranda:</b> police must tell you your rights.</p><p><b>Gault:</b> kids get fair hearings.</p><p><b>T.L.O.:</b> schools need a good reason to search.</p><p><b>Frederick:</b> schools can stop pro-drug speech.</p></div>`, mid: "" });
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
      if (s.type === "rule") { const c = cardOf(s); if (c) answers["Ruling · " + CASES[s.c].key] = c.t + " (" + SC[c.sc].long + ")"; }
      if (s.type === "check") {
        const w = st.wrong[s.id];
        answers[s.std + " · " + s.short] = s.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
      }
    });
    answers["Ending"] = e.out;
    answers["Caused by"] = e.causes.join(" · ");
    answers["Final record"] = "Agreed " + e.tally.agreed + " · Reversed " + e.tally.reversed + " · Too far " + e.tally.toofar + " · Public trust " + st.trust + " of 10";

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
    const wasIn = st.turnedIn && !(window.classIsTestT && window.classIsTestT());
    const name = st.name, look = st.judge; st = fresh(); st.name = name; st.judge = cleanLook(look); st.step = name ? 0 : -1;
    st.turnedIn = wasIn;   // starting over never re-opens turning in
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
