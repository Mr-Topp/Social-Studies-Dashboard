// =====================================================================
//  WRITE THE PEACE — World History Unit 1 Day 5 (Treaty of Versailles)
//  Students write 6 clauses of the 1919 peace while Clemenceau, Lloyd George
//  and Wilson push back. Their terms move 4 meters and lead to one of 4
//  what-if futures. Then the real 1919 treaty, two real cartoons, and the
//  real road to World War II are revealed and checked as evidence.
//  Turn-in goes through shared/turnin.js (same address as the old page).
// =====================================================================
(function () {
  "use strict";
  const KEY = "write-the-peace-treaty-v2";
  const API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const ID = "write-the-peace-treaty";
  const TITLE = "Day 5 · Treaty of Versailles: Write the Peace";
  const STANDARD = "SS.9-12.WH.31, SS.9-12.WH.29";
  const LOCK = 5;
  const PAT = 4;
  const START = { A: 30, S: 30, E: 50, L: 40 };
  const REAL = [0, 0, 0, 1, 0, 1];

  const $ = id => document.getElementById(id);
  const T = s => (window.SiteLang ? window.SiteLang.t(s) : s);
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const clamp = v => Math.max(0, Math.min(100, v));

  // ---------------- People and meters ----------------
  const LEADERS = [
    { k: "C", name: "Clemenceau", country: "France", face: "🐯", wants: "Wants: never be invaded again" },
    { k: "G", name: "Lloyd George", country: "Britain", face: "🦁", wants: "Wants: make Germany pay, but keep trade going" },
    { k: "W", name: "Wilson", country: "United States", face: "🦅", wants: "Wants: a fair peace and a League of Nations" }
  ];
  const METERS = [
    { k: "A", icon: "😠", label: "Germany's anger" },
    { k: "S", icon: "🛡️", label: "France's safety" },
    { k: "E", icon: "💰", label: "Europe's economy" },
    { k: "L", icon: "🕊️", label: "League's strength" }
  ];
  const REACT = {
    C: { "1": "Good. France is safer.", "0": "France can accept that.", "-1": "Too soft on Germany!", "-2": "This betrays France!" },
    G: { "1": "Splendid. I can sell that at home.", "0": "Britain can live with that.", "-1": "My voters won't like this.", "-2": "Britain cannot accept this!" },
    W: { "1": "That is a fair peace.", "0": "I can accept that.", "-1": "This plants seeds of revenge.", "-2": "This breaks my Fourteen Points!" }
  };

  // ---------------- The six clauses ----------------
  const CLAUSES = [
    {
      short: "War guilt", icon: "⚖️", title: "Clause 1: Who takes the blame?",
      sit: "More than 8 million soldiers are dead. Germany says it was defending itself. France says Germany started it.",
      say: ["Germany attacked us. Germany must admit it.", "Put the Kaiser on trial. My voters want someone punished.", "A peace built on revenge will not last."],
      opts: [
        { i: "📝", t: "Germany takes ALL the blame", s: "Germany must sign that it caused all the loss and damage.", d: { A: 20, S: 5 }, p: [1, 0, -1], res: "France cheers. In Germany, people of every party are furious." },
        { i: "👑", t: "Put the Kaiser on trial", s: "Blame Germany's old emperor, not the German people.", d: { A: 5 }, p: [-1, 1, 0], res: "Germans grumble, but the people themselves are not branded guilty." },
        { i: "🤝", t: "No blame clause", s: "Every side made mistakes. Nobody signs a guilty plea.", d: { A: -5, S: -5 }, p: [-2, -1, 1], res: "Germans relax. The French feel their dead were forgotten." }
      ],
      concept: "<b>War guilt clause</b> = the part of a treaty that says who is to blame for the war."
    },
    {
      short: "Payments", icon: "💰", title: "Clause 2: Who pays for the damage?",
      sit: "German armies wrecked towns, mines, and farms across northern France and Belgium. Someone has to pay to rebuild.",
      say: ["Germany wrecked northern France. Germany pays for all of it.", "I promised voters Germany would pay. But a broke Germany can't buy British goods.", "Pay for the damage, but not a bill so big it starves them."],
      opts: [
        { i: "💸", t: "A giant bill", s: "Germany pays for all the damage. Billions, for decades.", d: { A: 20, E: -25, S: 10 }, p: [1, 0, -1], res: "France can rebuild. Germany's money is in big trouble." },
        { i: "🧾", t: "A smaller, fixed bill", s: "Germany pays a set amount it can actually afford.", d: { A: 5, E: -5, S: 5 }, p: [-1, 1, 1], res: "Germany can pay. France says it is not nearly enough." },
        { i: "🚫", t: "No payments", s: "Each country rebuilds itself.", d: { A: -5, E: 5, S: -10 }, p: [-2, -2, 0], res: "Germany's economy breathes. France must pay to fix damage it didn't cause." }
      ],
      concept: "<b>Reparations</b> = payments a country that lost a war makes for war damage."
    },
    {
      short: "Army", icon: "🪖", title: "Clause 3: How big can Germany's army be?",
      sit: "Germany's army fought for four years. There are far more Germans than French.",
      say: ["There are more Germans than French. Shrink their army!", "Cut their army and navy. Britain must rule the seas.", "My Point 4: every nation should cut its weapons."],
      opts: [
        { i: "✂️", t: "100,000 soldiers max", s: "No tanks, no warplanes, no submarines.", d: { A: 10, S: 15 }, p: [1, 1, 0], res: "France feels safer. German officers call it a humiliation." },
        { i: "🕊️", t: "Everyone disarms", s: "Germany cuts its army, and so do the winners.", d: { A: -5, S: -5, L: 10 }, p: [-1, -1, 1], res: "It feels fair to Germany. France hates giving up its army." },
        { i: "⚔️", t: "No limits", s: "Germany keeps whatever army it wants.", d: { A: -10, S: -20 }, p: [-2, -1, -1], res: "Germany is pleased. France is terrified." }
      ],
      concept: "<b>Arms limits</b> = rules that cap how big a country's military can be."
    },
    {
      short: "Rhineland", icon: "🗺️", title: "Clause 4: The Rhineland, on France's border",
      sit: "The Rhineland is German land right next to France. German armies invaded France in 1870 and again in 1914. (In every option, France gets back Alsace-Lorraine, land Germany took in 1871.)",
      say: ["Make the Rhineland its own country. Never again an invasion!", "Take German land and you create a new grudge.", "The people there are German. They should decide."],
      opts: [
        { i: "🧱", t: "Cut the Rhineland off", s: "Make it a separate country under French watch.", d: { A: 20, S: 15 }, p: [1, -1, -2], res: "France has a wall. Millions of Germans are cut off from Germany." },
        { i: "💂", t: "Guard the Rhineland", s: "Germany keeps it, but no German troops there. Allied troops stay 15 years.", d: { A: 5, S: 10 }, p: [0, 1, 1], res: "A buffer for France. Germans hate foreign soldiers on their land." },
        { i: "🏞️", t: "Leave it alone", s: "Germany keeps it with no limits.", d: { A: -5, S: -10 }, p: [-2, 0, 1], res: "Germans are relieved. The French feel open to attack." }
      ],
      concept: "<b>Demilitarized zone</b> = an area where no army is allowed."
    },
    {
      short: "New map", icon: "🧭", title: "Clause 5: Who gets their own country?",
      sit: "Four empires just fell apart: German, Austro-Hungarian, Russian, and Ottoman. Who rules those lands now?",
      say: ["Build strong new countries around Germany, like Poland.", "Fine for Europe. But Britain keeps its empire.", "Peoples should choose their own government."],
      opts: [
        { i: "🗺️", t: "New countries in Europe only", s: "Poland and others get freedom. Colonies stay with Britain and France.", d: { A: 5, S: 5, L: -5 }, p: [1, 1, 0], res: "Poland is born. Millions in India, Vietnam, and the Middle East feel cheated." },
        { i: "🌍", t: "Freedom for everyone", s: "Europe AND colonies like India choose their own government.", d: { L: 10 }, p: [-1, -2, 1], res: "People in the colonies celebrate. Britain and France are furious." },
        { i: "🧩", t: "German speakers join Germany", s: "Austria and other German areas can join Germany.", d: { A: -15, S: -15 }, p: [-2, -1, 1], res: "Germans are thrilled. Germany ends up bigger than before the war." }
      ],
      concept: "<b>Self-determination</b> = the idea that peoples should choose their own government."
    },
    {
      short: "League", icon: "🕊️", title: "Clause 6: How do you stop the next war?",
      sit: "Nobody wants another war like this one. But who will stop the next attacker?",
      say: ["A League is useless without its own army.", "No world army. Britain decides when Britain fights.", "A League of Nations can settle fights before they become wars."],
      opts: [
        { i: "🛡️", t: "League with its own army", s: "A world police force to stop attackers.", d: { L: 25, S: 5 }, p: [1, -1, -1], res: "The League has teeth. Many Americans fear it will drag them into wars." },
        { i: "🗣️", t: "League with no army", s: "Members promise to protect each other.", d: { L: 10 }, p: [-1, 1, 1], res: "Wilson gets his League. It can talk, but it can't force anyone." },
        { i: "👀", t: "No League", s: "The winners keep watch on their own.", d: { L: -20, S: -5 }, p: [0, 0, -2], res: "Wilson's dream is dead. Nobody is in charge of keeping the peace." }
      ],
      concept: "<b>League of Nations</b> = a world group meant to settle fights before they turn into wars."
    }
  ];

  const WALKOUT = {
    C: { line: "🐯 Clemenceau walks out of the talks!", cost: "France stops trusting its allies and will act alone later.", d: { A: 10, S: -10, L: -5 } },
    G: { line: "🦁 Lloyd George walks out of the talks!", cost: "Britain pulls back from Europe's problems.", d: { S: -10, L: -10 } },
    W: { line: "🦅 Wilson walks out of the talks!", cost: "America goes home angry and stays out of Europe.", d: { L: -15 } }
  };

  // ---------------- Evidence checks (5) ----------------
  const CHECKS = {
    selfdet: {
      std: "WH.31", short: "Check 1 · Self-determination",
      label: "Wilson's test",
      prompt: "Wilson won't let you write this clause until you show you get his idea. Read his words. What does he want for the new map?",
      options: ["People should pick their own government, not be ruled by outsiders.", "Strong countries should pick the best government for weak ones.", "Each winning empire should keep the land it won in the war."],
      hint: "Read Wilson's words again: “governed only by their own consent.”",
      why: "Consent means agreeing. Wilson wanted peoples to choose who rules them."
    },
    art231: {
      std: "WH.31", short: "Check 2 · Article 231 (war guilt)",
      label: "Treaty page, Article 231",
      prompt: "Germans of every political party hated Article 231. Read it. Why?",
      options: ["It said Germany's side was guilty of causing all the war's harm.", "It said Germany had to hand its whole army over to France.", "It said Germany had to join the League before anyone else."],
      hint: "“Responsibility” here means being the one to blame. Who is to blame?",
      why: "Article 231 put the blame on Germany. That blame was also the reason Germany had to pay reparations."
    },
    dyson: {
      std: "WH.29", short: "Check 3 · Dyson cartoon (1940 Class)",
      label: "Cartoon file: London, 1919",
      prompt: "The child is labeled “1940 Class”: boys who would be old enough to be drafted as soldiers in 1940. What is Dyson predicting in May 1919?",
      options: ["This treaty will cause a new war when this child is grown.", "This treaty will keep children safe from war for a century.", "This child will grow up to become a great peace leader."],
      hint: "Why would a peace treaty make a future soldier cry?",
      why: "Dyson thought the treaty would cause another war about 20 years later. World War II began in 1939."
    },
    china: {
      std: "WH.31", short: "Check 4 · China cartoon (Shandong)",
      label: "Cartoon file: Chicago, 1915",
      prompt: "In 1919 the treaty gave Japan Germany's old rights in Shandong, China. Use the cartoon. Why were Chinese students furious?",
      options: ["The treaty let Japan's demands win out over China's rights.", "The treaty let China's rights win out over Japan's demands.", "The treaty made Japan drop its demands and pay China back."],
      hint: "Who got Shandong in 1919? Now look at who holds “Demands.”",
      why: "The treaty handed Chinese land rights to Japan. On May 4, 1919, Chinese students protested, and China refused to sign."
    },
    chain: {
      std: "WH.29", short: "Check 6 · Road to WWII",
      label: "Lloyd George's warning",
      prompt: "Lloyd George warned that an unfair peace would make Germany want revenge. Which link in the chain shows his warning coming true?",
      options: ["Hitler won power by promising to tear the treaty up.", "The Great Depression cost millions of Germans their jobs.", "French and Belgian troops took over the Ruhr region."],
      hint: "Revenge means Germany striking back. Which link is Germany striking back at the treaty?",
      why: "Anger at the treaty helped Hitler win power. Then he broke its terms one by one until war came in 1939."
    }
  };
  // Check 6 is the aftershock stamp round (Russia, India, the Depression). It counts as one check.
  CHECKS.after = {
    std: "WH.31", short: "Check 5 · Aftershocks (Russia, India, Depression)",
    options: ["Russia → Revolution · India → Foreign control · Depression → Hard times"]
  };
  const CHECK_IDS = ["selfdet", "art231", "dyson", "china", "after", "chain"];

  // ---------------- Steps ----------------
  const STEPS = [
    { id: "brief", name: "Meet the Big Three" },
    { id: "c0", name: "Clause 1: War guilt" }, { id: "c1", name: "Clause 2: Payments" }, { id: "c2", name: "Clause 3: Army" },
    { id: "c3", name: "Clause 4: Rhineland" }, { id: "c4", name: "Clause 5: New map" }, { id: "c5", name: "Clause 6: League" },
    { id: "sign", name: "Signing day" }, { id: "future", name: "Your future" }, { id: "real", name: "The real treaty" },
    { id: "dyson", name: "Cartoon 1" }, { id: "china", name: "Cartoon 2" }, { id: "after", name: "Aftershocks" }, { id: "chain", name: "The real road to war" },
    { id: "write", name: "Write and turn in" }
  ];

  // ---------------- Save ----------------
  const fresh = () => ({ step: -1, picks: [null, null, null, null, null, null], checks: {}, hot: {}, miss: {}, fut: 0, chain: 0, writing: { w1: "", w2: "" }, name: "", turnedIn: false });
  let st = null, hadSave = false;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) { st = null; }
  if (!st || typeof st !== "object" || !Array.isArray(st.picks)) st = fresh(); else hadSave = true;
  ["checks", "hot", "miss", "writing"].forEach(k => { if (!st[k] || typeof st[k] !== "object") st[k] = k === "writing" ? { w1: "", w2: "" } : {}; });
  // The old Cartoon Decoder saved first-try marks under this same page address. Start clean for the new game.
  if (!hadSave && window.classFirstTry) window.classFirstTry.reset();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // ---------------- The model ----------------
  // Runs the clauses picked so far. Returns meters, patience, walkouts, and a log for "Caused by".
  function simulate(picks) {
    const m = Object.assign({}, START), pat = { C: PAT, G: PAT, W: PAT }, out = { C: false, G: false, W: false };
    const log = [], walk = {};
    picks.forEach((pi, i) => {
      if (pi == null) return;
      const o = CLAUSES[i].opts[pi];
      Object.keys(o.d).forEach(k => { m[k] = clamp(m[k] + o.d[k]); });
      log.push({ label: o.t, d: o.d });
      ["C", "G", "W"].forEach((k, j) => {
        if (out[k]) return;
        pat[k] = Math.min(PAT, pat[k] + o.p[j]);
        if (pat[k] <= 0) { pat[k] = 0; out[k] = true; walk[k] = i; }
      });
    });
    return { m, pat, out, log, walk };
  }
  function addFx(m, d, log, label) { Object.keys(d).forEach(k => { m[k] = clamp(m[k] + d[k]); }); if (log && label) log.push({ label, d }); }
  // Signing day: walkout costs + the U.S. Senate (real: it voted the treaty down).
  function signing(picks) {
    const r = simulate(picks), items = [];
    ["C", "G", "W"].forEach(k => { if (r.out[k]) { addFx(r.m, WALKOUT[k].d, r.log, WALKOUT[k].line); items.push({ kind: "walk", k, d: WALKOUT[k].d }); } });
    const senate = { L: picks[5] === 0 ? -15 : -10 };
    addFx(r.m, senate, r.log, "U.S. Senate votes NO");
    items.push({ kind: "senate", d: senate });
    return Object.assign(r, { items });
  }
  // What-if future, 1919–1939.
  function future(picks) {
    const r = signing(picks), ev = [];
    if (r.m.E < 35) { const d = { A: 10 }; addFx(r.m, d, r.log, "1923: money becomes worthless"); ev.push({ year: "1923", h: "Money melts", t: "Germany can't pay its bill. It prints money until it's worthless. Broke, angry families blame the treaty.", d, cause: "Caused by: a payment bill Germany's economy couldn't carry" }); }
    else { const d = { A: -5 }; addFx(r.m, d, r.log, "1923: Germany rebuilds"); ev.push({ year: "1923", h: "Back to work", t: "Germany's factories restart. People have jobs, so anger cools a little.", d, cause: "Caused by: payments Germany could afford" }); }
    { const d = { A: 5 }; addFx(r.m, d, r.log, "1929: the Great Depression"); ev.push({ year: "1929", h: "The crash", t: "A worldwide crash hits. Jobs vanish everywhere. (This happened in every version of history, including the real one.)", d, cause: "Caused by: the Great Depression" }); }
    const strong = r.m.A >= 60;
    if (strong) ev.push({ year: "1933", h: "A strongman wins", t: "Furious voters back a leader who promises to tear up the treaty.", d: {}, cause: "Caused by: Germany's anger reached the danger zone" });
    else ev.push({ year: "1933", h: "Calm votes", t: "Voters stick with normal leaders. Shouting about the treaty doesn't win elections.", d: {}, cause: "Caused by: Germany's anger stayed out of the danger zone" });
    let end;
    if (strong && r.m.L < 40) { end = "1940"; ev.push({ year: "1936", h: "Nobody stops him", t: "He breaks the army limits and moves troops toward the border. The League has no muscle, and the U.S. isn't in it.", d: {}, cause: "Caused by: a weak League and no one willing to enforce the treaty" }); }
    else if (strong) { end = "close"; ev.push({ year: "1936", h: "The guard holds", t: "He tries to break the treaty. The League and the Allies stand together and stop him without a war.", d: {}, cause: "Caused by: a League strong enough to act" }); }
    else if (r.m.S < 20 || r.m.L < 25) { end = "unchecked"; ev.push({ year: "1936", h: "Nobody on guard", t: "With few limits and nobody watching, Germany builds the biggest army in Europe. Its neighbors panic and race to build more weapons too.", d: {}, cause: "Caused by: France left unsafe and nobody keeping watch" }); }
    else { end = "long"; ev.push({ year: "1936", h: "Talk, not tanks", t: "Arguments go to the League instead of the battlefield. France feels safe enough to shrink its army.", d: {}, cause: "Caused by: a strong League and a France that felt safe" }); }
    return Object.assign(r, { ev, end });
  }
  const ENDINGS = {
    "1940": { name: "The 1940 Class", text: "War comes back in 1939. The babies of 1919 grow up just in time to be drafted." },
    "close": { name: "Close Call", text: "A dangerous leader rose, but the peace held. The guard you built worked.", meters: ["A", "L"] },
    "unchecked": { name: "Germany Unchained", text: "No real limits and no one on guard. A weapons race turns into a new war.", meters: ["S", "L"] },
    "long": { name: "The Long Peace", text: "No second world war. Your mix of firm and fair held. In real life, nobody got this ending.", meters: ["A", "S", "L"] }
  };
  // "Caused by" trail: the biggest pushes on the meters that decided the ending (meter + direction).
  const TRAIL = { "1940": [["A", 1], ["L", -1]], close: [["A", 1], ["L", 1]], unchecked: [["S", -1], ["L", -1]], long: [["A", -1], ["S", 1], ["L", 1]] };
  function trail(r) {
    let items = [];
    TRAIL[r.end].forEach(([k, sign]) => {
      const hits = r.log.filter(e => e.d[k] && Math.sign(e.d[k]) === sign).map(e => ({ label: e.label, k, v: e.d[k] }));
      hits.sort((x, y) => Math.abs(y.v) - Math.abs(x.v));
      items = items.concat(hits.slice(0, 2));
    });
    items.sort((x, y) => Math.abs(y.v) - Math.abs(x.v));
    return items.slice(0, 4);
  }

  // ---------------- Drawing helpers ----------------
  const app = $("app");
  function meterHtml(k) { const mm = METERS.find(x => x.k === k); return mm.icon + " " + T(mm.label); }
  function drawMeters(m, d) {
    $("meters").innerHTML = METERS.map(mm => {
      const dv = d && d[mm.k];
      const chip = dv ? `<span class="delta ${dv > 0 ? "up" : "down"}">${dv > 0 ? "+" : "−"}${Math.abs(dv)}</span>` : "";
      const icon = mm.k === "A" ? (m.A >= 65 ? "🤬" : m.A >= 50 ? "😠" : m.A >= 35 ? "😒" : "🙂") : mm.icon;
      return `<div class="meter m-${mm.k}${mm.k === "A" && m.A >= 60 ? " danger" : ""}"><div class="mlabel"><span><span class="micon">${icon}</span> <span>${mm.label}</span></span>${chip}</div><div class="bar"><i style="width:${m[mm.k]}%"></i></div></div>`;
    }).join("");
  }
  function deltaList(d) {
    const ks = Object.keys(d || {}).filter(k => d[k]);
    if (!ks.length) return "";
    return `<p class="small"><b>What changed:</b> ` + ks.map(k => `<span class="m-${k}">${METERS.find(x => x.k === k).icon} <span>${METERS.find(x => x.k === k).label}</span> <span class="delta ${d[k] > 0 ? "up" : "down"}">${d[k] > 0 ? "+" : "−"}${Math.abs(d[k])}</span></span>`).join(" · ") + `</p>`;
  }
  function pips(n, gone) {
    if (gone) return `<span class="pips">🚪 <span>Walked out</span></span>`;
    let s = ""; for (let i = 0; i < PAT; i++) s += i < n ? "●" : `<span class="off">●</span>`;
    return `<span class="pips" title="Patience">${s}</span>`;
  }
  function leadersHtml(r, opts) {
    opts = opts || {};
    return `<div class="leaders">` + LEADERS.map((L, j) => {
      const gone = r.out[L.k] && !(opts.justLeft === L.k);
      let extra = "";
      if (opts.say) extra = `<div class="bubble say">${opts.say[j]}</div>`;
      else if (opts.wants) extra = `<div class="bubble">${L.wants}</div>`;
      if (opts.react && !gone) { const v = opts.react[j]; extra += `<div class="react r${v < 0 ? "m" + (-v) : v}">${REACT[L.k][String(Math.max(-2, Math.min(1, v)))]}</div>`; }
      let mood = "", shake = "";
      if (opts.react && !gone) { const v = opts.react[j]; mood = `<span class="mood">${v >= 1 ? "😊" : v === 0 ? "😐" : v === -1 ? "😠" : "😡"}</span>`; if (v < 0) shake = " shake"; }
      if (r.out[L.k]) mood = `<span class="mood">🚪</span>`;
      return `<div class="leader${r.out[L.k] ? " gone" : ""}${shake}"><div class="face" aria-hidden="true">${L.face}${mood}</div><div><div class="lname">${L.name}</div><div class="lcountry">${L.country}</div>${pips(r.pat[L.k], r.out[L.k])}${extra}</div></div>`;
    }).join("") + `</div>`;
  }
  function header() {
    const on = st.step >= 0;
    $("stepbox").hidden = !on; $("restartBtn").hidden = !on;
    if (on) {
      const n = Math.min(st.step + 1, STEPS.length);
      $("steptext").textContent = "Step " + n + " of " + STEPS.length + ": " + STEPS[Math.min(st.step, STEPS.length - 1)].name;
      $("fill").style.width = Math.round(st.step / STEPS.length * 100) + "%";
    }
  }
  function nextBtn(label, fn) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.textContent = label;
    b.onclick = fn; return b;
  }
  // Re-draw, then bring the new thing into view (the first selector that matches; its last match).
  function rerender(sels) {
    render();
    for (const sel of sels || []) { const all = app.querySelectorAll(sel); if (all.length) { const t = all[all.length - 1]; try { t.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {} return; } }
  }
  function advance() { st.step++; save(); render(); window.scrollTo(0, 0); }
  function el(html) { const d = document.createElement("div"); d.innerHTML = html; return d; }

  // ---------------- Evidence check widget ----------------
  let locked = false;
  function checkWidget(id, onDone) {
    const q = CHECKS[id], box = document.createElement("div");
    const rec = st.checks[id] || (st.checks[id] = { done: false, wrong: 0 });
    if (rec.done) {
      box.className = "done-check";
      box.innerHTML = `<span class="stamp green">DECODED</span><p class="file-tab">📁 <span>${q.label}</span></p><p><b>✓ <span>${q.options[0]}</span></b></p><p>${q.why}</p>`;
      return box;
    }
    box.className = "check";
    box.innerHTML = `<p class="file-tab">📁 <span>${q.label}</span></p><p class="file-q">${q.prompt}</p><div class="choices"></div><p class="msg" role="status" aria-live="polite"></p>`;
    const area = box.querySelector(".choices"), fb = box.querySelector(".msg");
    let last = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(q.options.map((t, n) => ({ t, n })));
      if (order.map(o => o.n).join() === last) order.push(order.shift());
      last = order.map(o => o.n).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            rec.done = true; if (window.classFirstTry) window.classFirstTry.right("v2-" + id);
            save(); onDone();
          } else {
            rec.wrong = (rec.wrong || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
            locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; }); box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
            let left = LOCK;
            const tick = () => {
              fb.className = "msg bad";
              fb.textContent = "Not quite. " + q.hint + " The choices will mix up. Try again in " + left + "…";
              if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + q.hint + " Try again."; draw(); return; }
              setTimeout(tick, 1000);
            };
            tick();
          }
        };
        area.appendChild(b);
      });
    }
    draw();
    return box;
  }

  // ---------------- Hotspot widget (find it on the cartoon) ----------------
  function picture(src, alt, spots, key, done) {
    // spots: [{x,y,w,h,label,task,hint}] in percent. key: save slot. done(): all found.
    const found = st.hot[key] || 0;
    const wrap = document.createElement("div");
    wrap.className = "pic";
    wrap.innerHTML = `<img src="${src}" alt="${alt}">`;
    spots.forEach((s, i) => {
      if (i > found) return;
      const b = document.createElement("button"); b.type = "button";
      b.className = "hot" + (i < found ? " found" : "") + (i === found && (st.miss[key + i] || 0) >= 3 ? " pulse" : "");
      b.style.cssText = `left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%`;
      b.setAttribute("aria-label", i < found ? s.label : s.task);
      if (i < found) { b.innerHTML = `<span class="tag">${s.label}</span>`; b.tabIndex = -1; }
      b.onclick = e => {
        e.stopPropagation();
        if (i !== found) return;
        st.hot[key] = found + 1; save(); rerender(found + 1 >= spots.length ? [".check"] : []);
      };
      wrap.appendChild(b);
    });
    wrap.onclick = () => {
      if (found >= spots.length) return;
      st.miss[key + found] = (st.miss[key + found] || 0) + 1; save();
      if (st.miss[key + found] === 3) render();
      const msg = document.getElementById("miss-" + key);
      if (msg) msg.textContent = (st.miss[key + found] >= 3 ? "Look for the dashed red box. " : "Not there. ") + spots[found].hint;
    };
    return wrap;
  }

  // ---------------- Screens ----------------
  function titleScreen() {
    $("meterWrap").hidden = true;
    app.innerHTML = `<section class="card title-card">
      <div>
        <p class="kicker">World History · Day 5 · Paris, 1919</p>
        <h1>Write the Peace</h1>
        <p class="hook">The deadliest war the world had ever seen just ended. You get to write the peace treaty. Will your peace last?</p>
        <div class="facts"><span>✍️ Write 6 parts of the treaty</span><span>🔮 See the future you caused</span><span>🔎 Crack 5 real cartoons</span><span>⏱️ About 30 minutes</span><span>✅ 6 quick checks</span></div>
        <p class="goal"><b>Today's goal:</b> Explain how the Treaty of Versailles punished Germany and helped lead to World War II, and how Russia, China, and India changed after the war.</p>
        <button type="button" class="go big" id="startBtn">Start →</button>
        <div id="welcomeSlot"></div>
        <p class="heads">Heads up: this covers war deaths, with no graphic images. Standards SS.9-12.WH.31 and WH.29.</p>
      </div>
      <div class="table-scene" aria-hidden="true">
        <div class="tbl"><span class="scroll">📜</span></div>
        <div class="seat s1"><span>🐯</span><small>France</small></div>
        <div class="seat s2"><span>🦁</span><small>Britain</small></div>
        <div class="seat s3"><span>🦅</span><small>United States</small></div>
        <div class="seat s4 you"><span>✍️</span><small>YOU</small></div>
        <div class="seal-mini"><span>TREATY OF</span> <span>VERSAILLES</span> · 1919</div>
      </div>
    </section>`;
    $("startBtn").onclick = () => { st.step = 0; save(); render(); window.scrollTo(0, 0); };
  }

  function briefScreen() {
    const r = simulate([]);
    $("meterWrap").hidden = false; drawMeters(r.m);
    app.innerHTML = `<section class="card">
      <p class="kicker">January 1919 · Paris Peace Conference</p>
      <h2>You are the treaty writer.</h2>
      <p class="bubble-lg">You're a new adviser to the winners (a made-up role). The real Big Three argue. You write the words.</p>
      ${leadersHtml(r, { wants: true })}
      <div class="germany">🇩🇪 <span><b>Germany</b> is not at the table. In 1919, Germany was not allowed to bargain over the terms.</span></div>
      <div class="tiles">
        <div class="tile"><b aria-hidden="true">●●●●</b><span>Each leader has 4 patience dots. Run one out and he walks out.</span></div>
        <div class="tile"><b aria-hidden="true">📊</b><span>Your terms move the 4 meters. Watch Germany's anger.</span></div>
        <div class="tile"><b aria-hidden="true">🎯</b><span>Your goal: a peace that lasts 20 years.</span></div>
      </div>
    </section>`;
    app.appendChild(nextBtn("Take your seat →", advance));
  }

  function clauseScreen(i) {
    const c = CLAUSES[i], pick = st.picks[i];
    const before = simulate(st.picks.slice(0, i));
    $("meterWrap").hidden = false;
    const card = document.createElement("section"); card.className = "card";
    if (pick == null) {
      drawMeters(before.m);
      card.innerHTML = `<p class="kicker">${c.icon} <span>Clause ${i + 1} of 6</span></p><h2>${c.title}</h2><p class="sit">${c.sit}</p>${leadersHtml(before, { say: c.say })}`;
      app.appendChild(card);
      // Clause 5: Wilson's card must be decoded first.
      if (i === 4 && !(st.checks.selfdet && st.checks.selfdet.done)) {
        card.appendChild(el(`<div class="doc"><p class="doc-h">📜 <span>Woodrow Wilson, speech to Congress, February 11, 1918</span></p><p class="doc-text">“Peoples may now be dominated and governed only by their own consent.”</p><p class="small">consent = agreement</p></div>`));
        card.appendChild(checkWidget("selfdet", () => rerender([".opts"])));
        return;
      }
      if (i === 4) card.appendChild(checkWidget("selfdet", () => {}));
      const opts = document.createElement("div"); opts.className = "opts";
      shuffle(c.opts.map((o, n) => n)).forEach(n => {
        const o = c.opts[n];
        const b = document.createElement("button"); b.type = "button"; b.className = "opt";
        b.innerHTML = `<span class="opt-icon" aria-hidden="true">${o.i}</span><b>${o.t}</b><span>${o.s}</span>`;
        b.onclick = () => { st.picks[i] = n; save(); rerender([".result"]); };
        opts.appendChild(b);
      });
      card.appendChild(el(`<p style="margin-top:10px"><b>Pick the words for this clause.</b> <span class="small">Every option costs something.</span></p>`));
      card.appendChild(opts);
      return;
    }
    // Result
    const o = c.opts[pick];
    const after = simulate(st.picks.slice(0, i + 1));
    drawMeters(after.m, o.d);
    const leftNow = ["C", "G", "W"].find(k => after.walk[k] === i);
    card.innerHTML = `<p class="kicker">${c.icon} <span>Clause ${i + 1} of 6</span></p><h2>${c.title}</h2>
      <div class="opts one"><div class="opt picked"><span class="opt-icon" aria-hidden="true">${o.i}</span><b>${o.t}</b><span>${o.s}</span><span class="stamp">SIGNED</span></div></div>
      <div class="result"><p><b>${o.res}</b></p>${deltaList(o.d)}</div>
      ${leadersHtml(after, { react: o.p.map((v, j) => before.out[LEADERS[j].k] ? 0 : v), justLeft: leftNow })}
      ${leftNow ? `<div class="walkout shake"><span class="door" aria-hidden="true">🚪</span><p><b>${WALKOUT[leftNow].line}</b></p><p>${WALKOUT[leftNow].cost}</p><p class="small">Real 1919: leaders really did this. Italy's leader walked out in April, and Wilson threatened to sail home.</p></div>` : ""}
      <p class="concept">${c.concept}</p>`;
    app.appendChild(card);
    app.appendChild(nextBtn(i < 5 ? "Next clause →" : "Go to signing day →", advance));
  }

  function signScreen() {
    const r = signing(st.picks);
    $("meterWrap").hidden = false;
    const tot = {}; r.items.forEach(it => Object.keys(it.d).forEach(k => { tot[k] = (tot[k] || 0) + it.d[k]; }));
    drawMeters(r.m, tot);
    const rows = r.items.map(it => {
      if (it.kind === "walk") return `<div class="event"><span class="year">!</span><div><b>${WALKOUT[it.k].line.replace(" walks out of the talks!", " walked out.")}</b><p>${WALKOUT[it.k].cost}</p>${deltaList(it.d)}</div></div>`;
      return `<div class="event real"><span class="year">1920</span><div><b>The U.S. Senate votes NO on the treaty.</b><p>${st.picks[5] === 2 ? "America pulls back from Europe. (This really happened.)" : "America never joins the League. (This really happened.)"}</p>${st.picks[5] === 0 ? `<p class="small">Senators feared a League army could drag America into wars.</p>` : ""}${deltaList(it.d)}</div></div>`;
    }).join("");
    app.innerHTML = `<section class="card">
      <p class="kicker">June 28, 1919 · Hall of Mirrors, Versailles</p>
      <h2>Signing day</h2>
      <p>Germany's delegates sign your treaty. They had no say in it. Many Germans call it a <b>Diktat</b>: a forced peace.</p>
      ${leadersHtml(r)}
      <div class="future">${rows}</div>
    </section>`;
    app.appendChild(nextBtn("See the future you caused →", advance));
  }

  function futureScreen() {
    const r = future(st.picks), shown = Math.min(st.fut || 0, r.ev.length);
    $("meterWrap").hidden = false;
    // Meters show the effect of the years revealed so far.
    const s = signing(st.picks);
    let lastD = null;
    r.ev.slice(0, shown).forEach(e => { addFx(s.m, e.d); if (Object.keys(e.d).length) lastD = e.d; });
    drawMeters(s.m, shown ? lastD : null);
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<p class="kicker"><span class="whatif">WHAT-IF</span> <span>Your treaty's future, 1919–1939</span></p><h2>Twenty years later…</h2><p class="small">Made-up newspapers, built from real causes. (The World Herald is not a real paper.)</p>`;
    const list = document.createElement("div"); list.className = "future";
    r.ev.slice(0, shown).forEach(e => list.appendChild(el(`<div class="paper"><div class="mast"><span>THE WORLD HERALD</span><span>${e.year}</span></div><div class="headline">${e.h}</div><p>${e.t}</p>${deltaList(e.d)}<span class="cause">${e.cause}</span></div>`).firstChild));
    card.appendChild(list);
    app.appendChild(card);
    if (shown < r.ev.length) { app.appendChild(nextBtn(shown ? "Next year →" : "Jump to 1923 →", () => { st.fut = shown + 1; save(); rerender([".ending", ".event"]); })); return; }
    const E = ENDINGS[r.end];
    const tr = trail(r);
    card.appendChild(el(`<div class="ending end-${r.end}"><p class="kicker">Your ending</p><h2>${E.name}</h2><p>${E.text}</p><div class="trail"><b>Caused by:</b><ul>${tr.map(x => `<li><span>${T(x.label)}</span> (${meterHtml(x.k)} ${x.v > 0 ? "+" : "−"}${Math.abs(x.v)})</li>`).join("")}</ul></div></div>`).firstChild);
    card.appendChild(el(`<p class="concept"><b>The big idea:</b> A peace that is too harsh makes the loser want revenge. A peace nobody enforces can't stop it.</p>`).firstChild);
    app.appendChild(nextBtn("Now see the REAL treaty →", advance));
  }

  // One real fact per clause, shown on the 1919 side of each card.
  const REAL_FACTS = [
    "Article 231 put the blame on Germany. The Kaiser was also supposed to stand trial, but the Netherlands refused to hand him over.",
    "In 1921 the bill was set at 132 billion gold marks.",
    "No tanks, no air force, no submarines.",
    "Allied troops could stay 15 years (they left in 1930). Alsace-Lorraine went back to France. Germany lost about 13% of its land in Europe and all its colonies.",
    "Arab lands became British and French mandates. China's Shandong went to Japan.",
    "The U.S. Senate rejected the treaty, so the U.S. never joined."
  ];
  function realScreen() {
    $("meterWrap").hidden = true;
    const nSame = CLAUSES.filter((c, i) => st.picks[i] === REAL[i]).length;
    const cards = CLAUSES.map((c, i) => {
      const mine = c.opts[st.picks[i]], real = c.opts[REAL[i]], same = st.picks[i] === REAL[i];
      return `<div class="vs" style="animation-delay:${i * 0.12}s"><p class="vs-h">${c.icon} <span>${c.short}</span></p>
        <div class="vs-row"><div class="vs-you"><small>You</small><span class="vs-i" aria-hidden="true">${mine.i}</span><b>${mine.t}</b></div>
        <div class="vs-real"><small>1919</small><span class="vs-i" aria-hidden="true">${real.i}</span><b>${real.t}</b></div></div>
        <p class="vs-fact">${REAL_FACTS[i]}</p><span class="stamp ${same ? "green" : ""}">${same ? "SAME" : "DIFFERENT"}</span></div>`;
    }).join("");
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<p class="kicker">The real Treaty of Versailles · signed June 28, 1919</p>
      <h2>Your treaty vs. the real one</h2>
      <div class="scoreboard"><span class="big">${nSame}/6</span><span><span>clauses match the real treaty.</span> <span>The real treaty in the same model leads to:</span> <b>${ENDINGS[future(REAL).end].name}</b></span></div>
      <div class="vsgrid">${cards}</div>
      <div class="doc"><p class="doc-h">📜 <span>Treaty of Versailles, Article 231 (1919)</span></p><p class="doc-text">“…Germany accepts the responsibility of Germany and her allies for causing all the loss and damage…”</p></div>`;
    app.appendChild(card);
    card.appendChild(checkWidget("art231", () => rerender(["button.go"])));
    if (st.checks.art231 && st.checks.art231.done) app.appendChild(nextBtn("Decode the evidence →", advance));
  }

  function dysonScreen() {
    $("meterWrap").hidden = true;
    const spots = [
      { x: 9, y: 85, w: 22, h: 13, label: "Peace treaty", task: "The peace treaty", hint: "Look on the ground, near the bottom left." },
      { x: 1, y: 39, w: 22, h: 13, label: "1940 Class", task: "The child's label", hint: "Look just above the crying child's head." }
    ];
    const found = st.hot.dyson || 0;
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<p class="kicker">Evidence 1 · A real cartoon from May 1919</p><h2>The weeping child</h2>
      <div class="cartoon-layout"><figure class="cartoon" id="fig"></figure><div id="side"></div></div>`;
    app.appendChild(card);
    const fig = card.querySelector("#fig");
    fig.appendChild(picture("versailles-1919.jpg", "1919 cartoon: four leaders leave a building past a crying child", spots, "dyson"));
    fig.appendChild(el(`<figcaption>“Peace and Future Cannon Fodder,” Will Dyson, <i>Daily Herald</i> (London), May 1919. Public domain. The man with the cane is Clemenceau, nicknamed “The Tiger.”</figcaption>`).firstChild);
    const side = card.querySelector("#side");
    side.appendChild(el(`<p>The four leaders of the winning side leave the peace talks. At the bottom, Clemenceau, “The Tiger,” says: <b>“Curious! I seem to hear a child weeping!”</b></p>`).firstChild);
    if (found < spots.length) {
      side.appendChild(el(`<p class="task">👆 <span>Tap it on the cartoon:</span> <span>${spots[found].task}</span></p>`).firstChild);
      side.appendChild(el(`<p class="missmsg" id="miss-dyson" role="status" aria-live="polite"></p>`).firstChild);
      return;
    }
    side.appendChild(el(`<p class="task ok">✓ <span>Found both clues: the treaty is lying at the crying child's feet.</span></p>`).firstChild);
    side.appendChild(checkWidget("dyson", () => rerender(["button.go"])));
    if (st.checks.dyson && st.checks.dyson.done) side.appendChild(nextBtn("Next cartoon →", advance));
  }

  function chinaScreen() {
    $("meterWrap").hidden = true;
    const spots = [
      { x: 53, y: 39, w: 18, h: 19, label: "Demands", task: "Japan's sign", hint: "Find the short man labeled JAPAN. Look at the sign he holds." },
      { x: 34, y: 15, w: 12, h: 21, label: "My Rights", task: "The paper China holds", hint: "Look at China's raised hand, near the face." }
    ];
    const found = st.hot.china || 0;
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<p class="kicker">Evidence 2 · A real cartoon from 1915</p><h2>China and its pushy neighbor</h2>
      <div class="cartoon-layout"><figure class="cartoon" id="fig"></figure><div id="side"></div></div>`;
    app.appendChild(card);
    const fig = card.querySelector("#fig");
    fig.appendChild(picture("china-1915.jpg", "1915 cartoon of China and Japan, each holding a paper", spots, "china"));
    fig.appendChild(el(`<figcaption>Luther D. Bradley, <i>Chicago Daily News</i>, March 13, 1915. Public domain. <a href="https://www.loc.gov/pictures/item/2009616341/" target="_blank" rel="noopener">Library of Congress record ↗</a></figcaption>`).firstChild);
    const side = card.querySelector("#side");
    side.appendChild(el(`<p>In 1915, Japan sent China a list of demands for more control over China. This American cartoon shows the two countries.</p>`).firstChild);
    if (found < spots.length) {
      side.appendChild(el(`<p class="task">👆 <span>Tap it on the cartoon:</span> <span>${spots[found].task}</span></p>`).firstChild);
      side.appendChild(el(`<p class="missmsg" id="miss-china" role="status" aria-live="polite"></p>`).firstChild);
      return;
    }
    side.appendChild(el(`<p class="task ok">✓ <span>Found both: China holds “My Rights.” Japan holds “Demands.”</span></p>`).firstChild);
    side.appendChild(el(`<p><b>1919:</b> <span>Germany had controlled part of Shandong, China. The peace treaty handed those rights to Japan, not back to China.</span></p>`).firstChild);
    side.appendChild(checkWidget("china", () => rerender(["button.go"])));
    if (st.checks.china && st.checks.china.done) side.appendChild(nextBtn("Track the aftershocks →", advance));
  }

  // ---------------- Aftershocks: 3 more real cartoons, stamped by the change they show ----------------
  const STAMPS = [
    { k: "rev", i: "🔥", t: "REVOLUTION", s: "The old rulers get thrown out" },
    { k: "for", i: "⛓️", t: "FOREIGN CONTROL", s: "Another country runs your land" },
    { k: "hard", i: "📉", t: "HARD TIMES", s: "Money trouble everywhere" }
  ];
  const AFTER = [
    { id: "russia", place: "Russia", flag: "🇷🇺", year: "1921", answer: "rev",
      title: "Russia, 1921: the patient",
      media: `<img src="https://tile.loc.gov/storage-services/service/pnp/acd/2a10000/2a10700/2a10785r.jpg" alt="1921 cartoon: Lenin beside a patient labeled Russia on an operating table" loading="lazy">`,
      credit: `“Lenine calls for return of intellectuals,” Lute Pease, about 1921. <a href="https://www.loc.gov/item/2016683903/" target="_blank" rel="noopener">Library of Congress record ↗</a>`,
      sit: "In 1917, Lenin's Communists seized power in Russia and pulled it out of the war. Then came a civil war.",
      look: "Look: a patient labeled RUSSIA lies on an operating table. Lenin says Russia needs “brains.”",
      hint: "Who is Lenin? He took power in 1917 by force. What kind of change is that?",
      why: "War losses and hunger helped spark Russia's 1917 revolution. By 1921, war had left Russia broken, so even Lenin needed experts (“brains”) to fix it." },
    { id: "india", place: "India", flag: "🇮🇳", year: "1920s", answer: "for",
      title: "India: the push for freedom",
      media: `<iframe class="pdfframe" title="Historical cartoon about India's independence struggle" src="https://www.mkgandhi.org/ebks/Gandhi-in-cartoons.pdf#page=46&amp;zoom=70&amp;toolbar=0&amp;navpanes=0" loading="lazy"></iframe>`,
      credit: `European cartoon about India, from the Gandhi Heritage Portal's collection of historical cartoons. If it doesn't show, <a href="https://www.mkgandhi.org/ebks/Gandhi-in-cartoons.pdf#page=46" target="_blank" rel="noopener">open the cartoon here ↗</a> (page 46).`,
      sit: "Over a million Indians served for Britain in World War I. They hoped to govern themselves after. Britain didn't let go.",
      look: "Look: Gandhi leads India forward. British soldiers try to hold it back.",
      hint: "Who was in charge of India after the war: Indians, or Britain?",
      why: "Britain kept ruling India after the war. Gandhi led peaceful protests and refused to obey unfair laws. India won independence in 1947." },
    { id: "dep", place: "Great Depression", flag: "🌎", year: "1930", answer: "hard",
      title: "1930: the apple seller",
      media: `<img src="https://tile.loc.gov/storage-services/service/pnp/ppmsc/03300/03389r.jpg" alt="1930 cartoon: a well-dressed man and a jobless man selling apples on a city street" loading="lazy">`,
      credit: `“The Philanthropist,” Herbert Block, December 5, 1930. <a href="https://www.loc.gov/pictures/item/00652174/" target="_blank" rel="noopener">Library of Congress record ↗</a>`,
      sit: "In 1929 a worldwide crash began: the Great Depression. Banks and factories closed.",
      look: "Look: a man with no job sells apples on the street for 5 cents. A rich man walks by eating one.",
      hint: "Why would a grown man sell apples on the street for a nickel?",
      why: "Millions lost their jobs around the world. In Germany, hard times helped Hitler win votes." }
  ];
  function stampOf(k) { return STAMPS.find(x => x.k === k); }
  let stampLock = false;
  function afterScreen() {
    $("meterWrap").hidden = true;
    st.stamps = st.stamps || {}; st.stampMiss = st.stampMiss || {};
    const idx = AFTER.findIndex(a => !st.stamps[a.id]);
    const card = document.createElement("section"); card.className = "card";
    const pins = [`<div class="pin done"><span class="pin-f">🇨🇳</span><b>China</b><span class="pin-s">⛓️ FOREIGN CONTROL</span></div>`]
      .concat(AFTER.map((a, n) => {
        const s = st.stamps[a.id] ? stampOf(a.answer) : null;
        return `<div class="pin${s ? " done" : n === idx ? " now" : ""}"><span class="pin-f">${a.flag}</span><b>${a.place}</b><span class="pin-s">${s ? s.i + " " + s.t : "?"}</span></div>`;
      })).join("");
    card.innerHTML = `<p class="kicker">Evidence 3 · The war's aftershocks, 1917–1930</p><h2>Aftershocks around the world</h2>
      <p class="bubble-lg">The war shook more than Germany. Stamp each cartoon with the aftershock it shows.</p>
      <div class="pins">${pins}</div>`;
    app.appendChild(card);
    if (idx < 0) {
      card.appendChild(el(`<div class="done-check"><span class="stamp green">DECODED</span><p class="file-tab">📁 <span>Aftershock file</span></p><p><b>After World War I, people around the world faced revolution, foreign control, and hard times.</b></p><p>Russia had a revolution. China and India stayed under outsiders' control. The Great Depression brought hard times everywhere.</p></div>`).firstChild);
      app.appendChild(nextBtn("See the real road to war →", advance));
      return;
    }
    const a = AFTER[idx];
    const box = el(`<div class="cartoon-layout aftershock">
      <figure class="cartoon"><div class="pic-frame">${a.media}</div><figcaption>${a.credit}</figcaption></figure>
      <div><p class="kicker">${a.flag} <span>${a.place}</span> · ${a.year}</p><h3>${a.title}</h3><p>${a.sit}</p><p class="task">👀 <span>${a.look}</span></p>
      <p class="file-q">Which aftershock does this cartoon show?</p><div class="stamps"></div><p class="msg" role="status" aria-live="polite"></p></div></div>`).firstChild;
    card.appendChild(box);
    const area = box.querySelector(".stamps"), fb = box.querySelector(".msg");
    let last = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(STAMPS);
      if (order.map(o => o.k).join() === last) order.push(order.shift());
      last = order.map(o => o.k).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "stampbtn";
        b.innerHTML = `<span class="opt-icon" aria-hidden="true">${o.i}</span><b>${o.t}</b><span>${o.s}</span>`;
        b.onclick = () => {
          if (stampLock) return;
          if (o.k === a.answer) {
            st.stamps[a.id] = true;
            if (idx === AFTER.length - 1) {
              const miss = AFTER.reduce((n, x) => n + (st.stampMiss[x.id] || 0), 0);
              st.checks.after = { done: true, wrong: miss };
              if (window.classFirstTry) window.classFirstTry.right("v2-after");
            }
            save();
            area.replaceChildren(el(`<div class="stamped"><span class="stamp green">${o.i} ${o.t}</span><p>${a.why}</p></div>`).firstChild);
            fb.textContent = "";
            box.querySelector(".pic-frame").insertAdjacentHTML("beforeend", `<span class="stamp big-stamp">${o.t}</span>`);
            area.querySelector(".stamped").appendChild(nextBtn(idx < AFTER.length - 1 ? "Next cartoon →" : "Close the file →", () => rerender([".pins"])));
          } else {
            st.stampMiss[a.id] = (st.stampMiss[a.id] || 0) + 1;
            if (window.classFirstTry) window.classFirstTry.wrong();
            save();
            stampLock = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
            box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
            let left = LOCK;
            const tick = () => {
              fb.className = "msg bad";
              fb.textContent = "Not quite. " + a.hint + " The choices will mix up. Try again in " + left + "…";
              if (left-- <= 0) { stampLock = false; fb.textContent = "Not quite. " + a.hint + " Try again."; draw(); return; }
              setTimeout(tick, 1000);
            };
            tick();
          }
        };
        area.appendChild(b);
      });
    }
    draw();
  }

  const LINKS = [
    { year: "1919", i: "✍️", t: "Germany signs the treaty. Germans call it a forced peace.", link: "Linked to: the whole treaty" },
    { year: "1923", i: "💸", t: "Germany falls behind on payments. French and Belgian troops take over Germany's Ruhr region, and German money becomes worthless.", link: "Linked to: reparations" },
    { year: "1929", i: "📉", t: "The Great Depression hits. Millions of Germans lose their jobs.", link: "Linked to: a weak economy" },
    { year: "1933", i: "📢", t: "Hitler takes power. He had promised to tear up the treaty.", link: "Linked to: anger over blame, payments, and lost land" },
    { year: "1936", i: "🪖", t: "Hitler has rebuilt the army and sends troops into the Rhineland. Nobody stops him.", link: "Linked to: army limits and the Rhineland rule, broken" },
    { year: "1939", i: "💥", t: "Germany invades Poland. World War II begins in Europe.", link: "Linked to: land Germany lost to Poland" }
  ];
  function chainScreen() {
    $("meterWrap").hidden = true;
    const shown = LINKS.length;
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<p class="kicker">Real history · 1919–1939</p><h2>The real road to World War II</h2>
      <div class="doc"><p class="doc-h">📜 <span>British Prime Minister David Lloyd George, March 1919</span></p><p class="doc-text">“If she feels that she has been unjustly treated in the peace of 1919 she will find means of exacting retribution from her conquerors.”</p><p class="small">In plain words: if Germany thinks the peace is unfair, it will get revenge.</p></div>`;
    const ch = document.createElement("div"); ch.className = "chain";
    LINKS.slice(0, shown).forEach((L, i) => {
      if (i) ch.appendChild(el(`<div class="joint" aria-hidden="true"></div>`).firstChild);
      ch.appendChild(el(`<div class="link" style="animation-delay:${i * 0.25}s;animation-fill-mode:both"><span class="link-i" aria-hidden="true">${L.i}</span><span class="year">${L.year}</span><div><b>${L.t}</b><br><span class="cause">🔗 <span>${L.link}</span></span></div></div>`).firstChild);
    });
    card.appendChild(ch);
    app.appendChild(card);
    if (shown < LINKS.length) { app.appendChild(nextBtn("Next link →", () => { st.chain = shown + 1; save(); rerender([".check", ".link"]); })); return; }
    card.appendChild(checkWidget("chain", () => rerender(["button.go"])));
    if (st.checks.chain && st.checks.chain.done) {
      const mine = future(st.picks).end;
      card.appendChild(el(`<div class="result"><p><b><span>Your ending:</span> <span>${ENDINGS[mine].name}</span>. <span>Real history:</span> <span>${ENDINGS["1940"].name}</span>.</b></p><p>${mine === "1940" ? "Your treaty went down the same road as the real one." : "Your treaty took a different road than the real one. Think about which clause made the difference."}</p></div>`).firstChild);
      app.appendChild(nextBtn("Last step: write and turn in →", advance));
    }
  }

  const PROMPTS = [
    { id: "w1", short: "Compare", label: "1. Compare your treaty to the real one. Name one clause and what it did in your future.", stem: "One clause I wrote was ___. The real treaty ___. In my future, my choice led to ___.",
      must: ["blame", "guilt", "kaiser", "trial", "pay", "paid", "bill", "reparation", "money", "army", "armies", "soldier", "troop", "disarm", "limit", "weapon", "rhineland", "border", "map", "countr", "colon", "poland", "freedom", "league", "anger", "angry", "mad", "strongman", "hitler", "depression", "economy", "safe", "walk"],
      mustMsg: "Name one real clause you wrote (blame, payments, army, Rhineland, new map, or League) and what it did." },
    { id: "w2", short: "Explain why", label: "2. Explain how the real Treaty of Versailles helped lead to World War II. Use one piece of evidence (Article 231, a cartoon, or the chain).", stem: "The real treaty helped lead to World War II because ___. One piece of evidence is ___.",
      must: ["blame", "guilt", "231", "pay", "paid", "reparation", "bill", "money", "debt", "land", "territor", "army", "soldier", "troop", "rhineland", "hitler", "anger", "angry", "mad", "revenge", "humiliat", "cartoon", "1940", "dyson", "child", "depression", "inflation", "lloyd", "unfair", "harsh", "punish", "diktat", "forced"],
      mustMsg: "Name a real piece of evidence: a treaty term (blame, payments, army, land), a cartoon, or a link from the chain." }
  ];
  function writeScreen() {
    $("meterWrap").hidden = true;
    const r = future(st.picks);
    const card = document.createElement("section"); card.className = "card";
    card.innerHTML = `<div class="memo-head"><span class="memo-icon" aria-hidden="true">📨</span><div><p class="kicker">Last step · Top secret memo</p><h2>It's 1945. They need your advice.</h2></div></div>
      <p class="bubble-lg">World War II is ending. New leaders must write another peace. They ask you: what went wrong in 1919?</p>
      <div class="scoreboard"><span><span>Your ending:</span> <b>${ENDINGS[r.end].name}</b></span><span><span>Real 1919 treaty:</span> <b>${ENDINGS["1940"].name}</b></span></div>
      <div class="memo">
      ${PROMPTS.map(p => `<label for="${p.id}">${p.label}</label><p class="stem"><span>Sentence starter:</span> <b>${p.stem}</b></p><textarea id="${p.id}" placeholder="${p.stem}"></textarea>`).join("")}
      <label for="studentName">First name + last initial (like Jordan M.)</label>
      <input id="studentName" type="text" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)">
      </div>
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p class="msg" id="sendMsg" role="status" aria-live="polite"></p>
      ${st.turnedIn ? `<p class="turned" id="turnedBox">✓ Turned in</p>` : ""}
      <details class="sources"><summary>Sources</summary><p>Treaty of Versailles (1919), Articles 42–43, 119, 156, 160, 227, 231, 428 and Part I (League of Nations). Woodrow Wilson, Fourteen Points (Jan. 8, 1918) and speech to Congress (Feb. 11, 1918). David Lloyd George, Fontainebleau Memorandum (March 25, 1919). Cartoons: Will Dyson, Daily Herald, May 1919; Luther D. Bradley, Chicago Daily News, 1915 (Library of Congress); Lute Pease, “Lenine calls for return of intellectuals,” about 1921 (Library of Congress); a European cartoon of Gandhi and India, from the Gandhi Heritage Portal’s collection “Gandhi in Cartoons” (page 46); Herbert Block, “The Philanthropist,” December 5, 1930 (Library of Congress). The treaty writer is a made-up role, and the “Your future” years are a what-if built from real causes.</p></details>`;
    app.appendChild(card);
    PROMPTS.forEach(p => { const t = $(p.id); t.value = st.writing[p.id] || ""; t.addEventListener("input", () => { st.writing[p.id] = t.value; save(); }); });
    const nm = $("studentName"); nm.value = st.name || ""; nm.addEventListener("input", () => { st.name = nm.value; save(); });
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    msg.className = "msg";
    for (const p of PROMPTS) {
      const box = $(p.id), v = box.value.trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: isEs() ? T(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (isEs() ? "En " + T(p.short) : "For " + p.short) + ": " + junk; return; }
      }
      if (/_{2,}/.test(v)) { msg.className = "msg bad"; msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; box.focus(); return; }
      if (v.split(/\s+/).filter(Boolean).length < 10) { msg.className = "msg bad"; msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; box.focus(); return; }
      const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      if (p.must) {
        const extra = (window.SiteLang && window.SiteLang.must(p.id)) || [];
        const words = p.must.concat(...extra);
        if (!words.some(w => plain(v).includes(plain(w)))) { msg.className = "msg bad"; msg.textContent = p.mustMsg; box.focus(); return; }
      }
    }
    const nameBox = $("studentName");
    const name = window.classShortName ? window.classShortName(nameBox.value) : nameBox.value.trim();
    if (!/^\S+ [A-Z]\.$/.test(name)) { msg.className = "msg bad"; msg.textContent = "Type your first name and last initial, like Jordan M."; nameBox.focus(); return; }
    st.name = name; save();

    const r = future(st.picks);
    const answers = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => st.checks[id] && st.checks[id].done && !st.checks[id].wrong).length;
    answers["First-try correct"] = right + " of " + CHECK_IDS.length;
    const by = {};
    CHECK_IDS.forEach(id => { const s = CHECKS[id].std; by[s] = by[s] || [0, 0]; by[s][1]++; if (st.checks[id] && st.checks[id].done && !st.checks[id].wrong) by[s][0]++; });
    answers["First-try by standard"] = Object.keys(by).sort().map(k => k + ": " + by[k][0] + " of " + by[k][1]).join(" · ");
    CHECK_IDS.forEach(id => { const w = (st.checks[id] && st.checks[id].wrong) || 0; answers[CHECKS[id].short] = CHECKS[id].options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    CLAUSES.forEach((c, i) => { answers["Choice · Clause " + (i + 1) + " " + c.short] = c.opts[st.picks[i]].t; });
    answers["Aftershock stamps"] = AFTER.map(a => a.place + ": " + (((st.stampMiss || {})[a.id] || 0) ? (st.stampMiss[a.id] + " wrong") : "first try")).join(" · ");
    answers["Ending reached"] = ENDINGS[r.end].name;
    answers["Clauses that matched the real treaty"] = CLAUSES.filter((c, i) => st.picks[i] === REAL[i]).length + " of 6";
    const gone = LEADERS.filter(L => r.out[L.k]).map(L => L.name);
    answers["Leaders who walked out"] = gone.length ? gone.join(", ") : "None";
    answers["Final meters"] = "Germany's anger " + r.m.A + " · France's safety " + r.m.S + " · Economy " + r.m.E + " · League " + r.m.L;
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = $(p.id).value.trim(); });

    btn.disabled = true; msg.textContent = "Sending your work…";
    try {
      const res = await window.classTurnIn(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: name, assignmentId: ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.className = "msg good"; msg.textContent = "Turned in! Your teacher can see your work. You're done.";
      btn.textContent = "Turned in ✓";
      if (!$("turnedBox")) btn.insertAdjacentHTML("afterend", `<p class="turned" id="turnedBox">✓ Turned in</p>`);
      btn.disabled = false;
    } catch (err) {
      msg.className = "msg bad"; msg.textContent = (err && err.message) || "Could not turn in. Try again."; btn.disabled = false;
    }
  }

  // ---------------- Router ----------------
  function render() {
    header();
    app.innerHTML = "";
    if (st.step < 0) return titleScreen();
    const s = STEPS[Math.min(st.step, STEPS.length - 1)].id;
    if (s === "brief") return briefScreen();
    if (s[0] === "c" && s.length === 2) return clauseScreen(+s[1]);
    if (s === "sign") return signScreen();
    if (s === "future") return futureScreen();
    if (s === "real") return realScreen();
    if (s === "dyson") return dysonScreen();
    if (s === "china") return chinaScreen();
    if (s === "after") return afterScreen();
    if (s === "chain") return chainScreen();
    return writeScreen();
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };

  render();
  if (hadSave && st.step >= 0) {
    const n = Math.min(st.step + 1, STEPS.length);
    const w = document.createElement("p"); w.className = "welcome"; w.id = "welcome"; w.setAttribute("role", "status");
    w.textContent = "Welcome back! You're on step " + n + " of " + STEPS.length + ": " + STEPS[Math.min(st.step, STEPS.length - 1)].name + ".";
    app.insertBefore(w, app.firstChild);
  }

  // For testing only: lets a test script read the model. Changes nothing.
  window.__peace = { simulate, signing, future, CLAUSES, REAL };
})();
