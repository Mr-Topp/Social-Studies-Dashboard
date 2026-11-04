// =====================================================================
//  THE DAY AFTER FREEDOM  (World History · Unit 2 · Day 5)
//  Part 1 (1951–1960): win freedom for a made-up colony on a real map of Africa (Ghana's road vs. Kenya's
//  and Algeria's), decide the settlers' farms, design the flag, watch the 1960 wave.
//  Part 2 (1960–1965): advise the new nation's first government on a board of the country. Colonial border,
//  few trained people, one cocoa crop, a copper province breaking away, critics, and two superpowers
//  offering help with strings. The Colonel (army chief) is the rival: his anger + an empty treasury +
//  a superpower's backing = a coup. Six endings with a "Caused by" trail. Rules + numbers: rules.js.
//  6 evidence checks woven into play (2 per standard). Strict order. Saves on this device.
//  Turn-in: shared/turnin.js classTurnIn, same payload shape as shared/unit-game.js finish().
//  Made up: the country, PM, Governor, Colonel, envoys, and the what-ifs. Real: every card marked REAL.
// =====================================================================
(function () {
  "use strict";
  const R = window.DAF_RULES;
  const KEY = "wh-u2-d7-africa-v2";
  const ASSIGNMENT_ID = "wh-u2-d7-africa";
  const TITLE = "World History · Unit 2 · Day 5 · The Day After Freedom";
  const STANDARD = "SS.9-12.WH.36, SS.9-12.WH.34, SS.9-12.WH.37";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, TOTAL = 11;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // ---------------- State ----------------
  const fresh = () => ({ v: 1, name: "", step: 0, phase: 0, g: R.fresh(), entered: {}, auto: {}, last: {}, checks: {},
    flag: { pal: -1, em: -1 }, waved: false, flips: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1 || !st.g) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this device, start that student fresh.
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });
  const M = () => st.g.m;

  let flash = {};        // meter changes to glow on the next render
  let slamNext = false;  // stamp animation on the next result render
  let locked = false;
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());   // Test T. (teacher): no lockouts / writing rules

  // ---------------- Steps ----------------
  const STEP = [null,
    { year: "1951", t: "1951 · The Road to Freedom" },
    { year: "1955", t: "1950s · The Settlers" },
    { year: "1960", t: "1960 · Freedom Day" },
    { year: "1960", t: "1960 · The Line" },
    { year: "1961", t: "1961 · Who Runs Things?" },
    { year: "1962", t: "1962 · Cocoa Crash" },
    { year: "1963", t: "1963 · Breakaway" },
    { year: "1964", t: "1964 · The Critics" },
    { year: "1965", t: "1965 · The Offer" },
    { year: "1966", t: "1966 · Your Ending" },
    { year: "1966", t: "Your Memo" }];

  // ---------------- Evidence checks (options[0] is right) ----------------
  const CHECKS = {
    c_ghana: { std: "WH.36", short: "Ghana: why Britain let Nkrumah lead",
      who: ["📰", "av gray", "Reporter"], q: "Why did Britain let Nkrumah lead?",
      options: ["Voters chose his party while he was locked up", "His rebel army beat Britain's army in battle", "Britain chose him as its favorite local chief", "The UN held a vote to make him the leader"],
      hint: "Read the REAL card. What happened while he was in jail?" },
    c_settlers: { std: "WH.36", short: "Kenya and Algeria: why freedom took a war",
      who: ["📰", "av gray", "Reporter"], q: "Why did Kenya and Algeria have to fight?",
      options: ["Europeans owning the best land refused to go", "They had no leaders to plan any protests", "The UN told them to start wars for freedom", "Britain and France had no troops there at all"],
      hint: "Who owned the best land in both places?" },
    c_map: { std: "WH.34", short: "Map: when most African nations won freedom",
      who: ["🗺️", "av gray", "Mapmaker"], q: "Read the map. When did the most countries win freedom?",
      options: ["In 1960, all in one year", "Before 1956, right after WWII", "In the 1970s, after Vietnam", "In 1990, as the Cold War ended"],
      hint: "Match the colors to the key. Which color covers the most countries?" },
    c_border: { std: "WH.34", short: "Borders: what African leaders agreed in 1964",
      who: ["🧑🏾‍💼", "av", "Prime Minister"], q: "What did African leaders agree to in 1964?",
      options: ["Keep the borders they had at freedom", "Redraw every border by ethnic group", "Let Europe settle all border fights", "Erase borders and form one country"],
      hint: "Read the paper clip quote. Which borders do they pledge to respect?" },
    c_congo: { std: "WH.37", short: "Congo: why U.S. leaders turned on Lumumba",
      who: ["🇺🇸", "av us", "U.S. official"], q: "Why did U.S. leaders turn on Lumumba?",
      options: ["They worried he'd join the USSR's side", "He invaded a country next door", "He refused to hold any elections", "He asked Belgium to rule Congo again"],
      hint: "Read the REAL card. Who did Lumumba ask for help?" },
    c_mobutu: { std: "WH.37", short: "Zaire: why the U.S. backed Mobutu",
      who: ["📰", "av gray", "Reporter"], q: "Why did the U.S. back Mobutu?",
      options: ["He was a firm enemy of communism", "He held free elections every year", "He gave his country's mines to the USSR", "He won a UN-run vote to lead"],
      hint: "Read the REAL card. What side was Mobutu on in the Cold War?" }
  };
  const CHECK_IDS = ["c_ghana", "c_settlers", "c_map", "c_border", "c_congo", "c_mobutu"];

  // ---------------- Real cards ----------------
  const REAL = {
    ghana51: { f: "🇬🇭", tag: "Ghana · 1949–1951", txt: "Kwame Nkrumah led strikes and boycotts. Jailed, his party still won 34 of 38 seats.",
      src: "Univ. of Oxford History Faculty, “Was the Gold Coast ‘decolonised’ or did Ghana win independence?”" },
    kenya: { f: "🇰🇪", tag: "Kenya · 1952–1963", txt: "Settlers took the best land. Britain held up to 160,000 Kenyans in camps.",
      src: "Imperial War Museums, “The Kenya Emergency explained”" },
    algeria: { f: "🇩🇿", tag: "Algeria · 1954–1962", txt: "About 1 million European settlers. Eight years of war.",
      src: "Library of Congress Country Study: Algeria" },
    wind: { f: "🇬🇧", tag: "Britain's Prime Minister · Feb. 3, 1960", quote: "“The wind of change is blowing through this continent…”", gloss: "wind of change = Africa's push for freedom",
      src: "Harold Macmillan, speech to South Africa's Parliament (South African History Online)" },
    oau: { f: "🤝", tag: "Organization of African Unity · Cairo, July 1964", quote: "“…all Member States pledge themselves to respect the borders existing on their achievement of national independence.”",
      src: "OAU resolution AHG/Res. 16(I), Border Disputes Among African States", gloss: "pledge = promise · existing = already there" },
    congo60: { f: "🇨🇩", tag: "Congo · 1960", txt: "About 15 Congolese had college degrees. No Congolese soldier ranked above sergeant-major.",
      src: "Association for Diplomatic Studies & Training, oral history of U.S. consular officer Owen Roberts" },
    cocoa: { f: "🇬🇭", tag: "Ghana · 1960s", quote: "“The world price paid for cocoa beans directly determines Ghana's economic fortunes.”", txt: "By 1966: about $1 billion in debt.", gloss: "fortunes = how rich or poor it is",
      src: "Encyclopaedia Britannica, “Ghana: Economy”" },
    lumumba: { f: "🇨🇩", tag: "Congo · 1960–1961", txt: "Lumumba asked the USSR for help. U.S. leaders feared a Soviet ally. The CIA plotted against him. He was killed in 1961.",
      src: "CIA, Studies in Intelligence; U.S. State Dept., Foreign Relations of the U.S." },
    ghana64: { f: "🇬🇭", tag: "Ghana · 1964–1966", txt: "Nkrumah made Ghana a one-party state. In 1966 the army overthrew him.",
      src: "Encyclopaedia Britannica, “Kwame Nkrumah”" },
    botswana: { f: "🇧🇼", tag: "Botswana · 1966–today", txt: "Free elections since 1966. In 2024 the ruling party lost and stepped aside.",
      src: "DemocracyWeb, “Botswana: Accountability”" },
    mobutu: { f: "🇨🇩", tag: "Zaire (Congo) · 1965–1997", txt: "Mobutu seized power in 1965. The U.S. backed him as anti-communist.",
      src: "UPI, “Zaire at a glance,” May 16, 1997; CIA, Studies in Intelligence" },
    sovghana: { f: "☭", tag: "Ghana · 1961–1966", txt: "The USSR armed and advised Nkrumah. After his 1966 fall, up to 1,100 Soviets were sent home.",
      src: "Library of Congress Country Study: Ghana, “Relations with the Soviet Union”" }
  };

  // ---------------- Step content ----------------
  const PM = ["🧑🏾‍💼", "av", "Prime Minister"], GOV = ["🎩", "av gov", "The Governor"], COL = ["🎖️", "av col", "The Colonel"],
    USE = ["🇺🇸", "av us", "U.S. official"], SOV = ["☭", "av ussr", "Soviet official"];
  const E = {
    1: { say: [[GOV, "Freedom? Perhaps in thirty years. Be patient."], [PM, "How do we push them out?"]], ask: "Pick your plan:",
      res: { strikes: ["", "Elected", "Your leader is jailed. Your party wins the vote anyway."],
             revolt: ["bad", "Free, at a cost", "Years of war. Freedom comes, but thousands die."],
             wait: ["warn", "Stalled", "The Governor hands power to chiefs he likes."] },
      reals: ["ghana51"], check: "c_ghana",
      reveal: "<b>Mass protest</b>: strikes, boycotts, and votes can push an empire out." },
    2: { say: [[GOV, "Our settlers own the best farms. We're not leaving."], [PM, "After freedom, what about those farms?"]], ask: "Your call:",
      res: { buy: ["", "Land bought", "Farmers get land. The money runs out."],
             take: ["warn", "Settlers flee", "Farmers cheer. Settler engineers and doctors leave too."],
             leave: ["bad", "Anger", "Exports keep flowing. Landless farmers are furious."] },
      reals: ["kenya", "algeria"], flip: true, check: "c_settlers",
      reveal: "<b>Settler colonies</b>: where settlers held land, empires fought to stay." },
    4: { say: [[PM, "Europeans drew this line with a ruler. It splits the Hill people."], [COL, "Say the word, and we take the hills."]], ask: "What do we do?",
      res: { keep: ["warn", "Line kept", "No war. Hill families now need passports to visit."],
             claim: ["bad", "Border war", "Your neighbor sends troops. A border war starts."],
             council: ["", "Power shared", "Hill people feel heard. The Colonel calls you weak."] },
      doc: "oau", check: "c_border",
      reveal: "<b>Colonial borders</b>: lines drawn in Europe that split peoples apart." },
    5: { say: [[PM, "The colonizers kept us out of college. Now we need doctors, engineers, judges."]], ask: "Who runs things?",
      res: { bosses: ["warn", "Same bosses", "Things run. People ask, “Did anything change?”"],
             promote: ["", "Learning fast", "New officials learn on the job. Mistakes cost money."],
             schools: ["", "Invested", "Classrooms open. Graduates arrive in a few years."] },
      reals: ["congo60"],
      reveal: "<b>Few trained leaders</b>: colonizers kept Africans out of colleges and top jobs." },
    6: { banner: ["📉", "World cocoa price crashes!"], chart: true, say: [[PM, "Cocoa pays for everything. Teachers and soldiers need paychecks!"]], ask: "How do we pay?",
      res: { usloan: ["warn", "In debt", "Money arrives. The U.S. wants a say now."],
             ussrloan: ["warn", "In debt", "Money arrives. The USSR wants a say now."],
             army: ["bad", "Angry army", "Budget saved. Soldiers grumble in the barracks."],
             crops: ["", "Spread out", "Slow start. The next crash will hurt less."] },
      reals: ["cocoa"],
      reveal: "<b>One-crop economy</b>: one price drop hits the whole country." },
    7: { banner: ["⛏️", "The copper region breaks away!"], say: [[PM, "The old mining company backs the rebels. Who do we call?"]], ask: "Ask for help:",
      res: { un: ["warn", "Slow fix", "UN talks drag on. The region stays gone for now."],
             ussr: ["warn", "Watched", "Soviet planes land. The U.S. now calls you a threat."],
             us: ["", "Close ties", "U.S. advisers arrive and befriend your army."] },
      reals: ["lumumba"], check: "c_congo",
      reveal: "<b>Superpower meddling</b>: the U.S. and USSR backed sides to win allies." },
    8: { say: [[PM, "The Hill party's newspaper calls me a thief. They're gaining votes."]], ask: "What do we do?",
      res: { ban: ["warn", "One party", "Quiet streets. Now the only way to change leaders is force."],
             vote: ["", "Election held", "A rough campaign. You win, barely. The losers accept it."],
             jail: ["bad", "Crackdown", "Editors go to prison. Fear spreads."] },
      reals: ["ghana64", "botswana"],
      reveal: "<b>One-party state</b>: only the ruling party may run." },
    9: { say: [[USE, "Join our side. Big aid, no questions."], [SOV, "Join us. We will build your dam."]], ask: "Pick a side?",
      res: { joinus: ["warn", "U.S. ally", "U.S. dollars pour in. The USSR marks you as an enemy."],
             joinussr: ["warn", "Soviet ally", "Soviet money pours in. The U.S. marks you as an enemy."],
             nonaligned: ["", "Non-aligned", "Small aid from both. Neither side fully trusts you."] },
      reals: ["mobutu", "sovghana"], check: "c_mobutu",
      reveal: "<b>Non-alignment</b>: joining neither Cold War side." }
  };

  // ---------------- Meters ----------------
  const MI = { money: ["💰", "Money"], peace: ["🕊️", "Peace"], voice: ["🗳️", "Voice"], experts: ["🎓", "Experts"], us: ["🇺🇸", "U.S. strings"], ussr: ["☭", "Soviet strings"], colonel: ["🎖️", "Army anger"] };
  const badUp = k => k === "us" || k === "ussr" || k === "colonel";
  function fxChips(fx) {
    return Object.keys(fx || {}).filter(k => fx[k]).map(k => {
      const v = fx[k], good = badUp(k) ? v < 0 : v > 0;
      return `<span class="chip ${k === "us" || k === "ussr" ? "str" : good ? "good" : "bad"}">${MI[k][0]}${k === "us" || k === "ussr" ? "🔗" : ""} ${v > 0 ? "+" : "−"}${Math.abs(v)}</span>`;
    }).join("");
  }
  const PALS = [["#1f7a4a", "#f2b134", "#c8312b"], ["#2f6db3", "#ffffff", "#1f7a4a"], ["#1f1a17", "#c8312b", "#f2b134"], ["#7b4ea3", "#f2b134", "#2f6db3"]];
  const EMS = ["⭐", "☀️", "🌳", "✊"];
  function flagSvg(cls) {
    const p = PALS[st.flag.pal] || ["#d9cfbd", "#efe7d6", "#d9cfbd"], em = EMS[st.flag.em] || "";
    return `<svg class="${cls}" viewBox="0 0 90 60" aria-label="Your flag"><rect width="90" height="20" fill="${p[0]}"/><rect y="20" width="90" height="20" fill="${p[1]}"/><rect y="40" width="90" height="20" fill="${p[2]}"/><text x="45" y="31" font-size="22" text-anchor="middle" dominant-baseline="central">${em}</text></svg>`;
  }
  function hud() {
    const h = $("hud");
    if (st.step < 1) { h.hidden = true; return; }
    h.hidden = false;
    const m = M(), bar = (k, cls) => `<span class="bar ${cls}"><span style="width:${m[k] * 10}%"></span></span>`;
    const g = k => (flash[k] > 0 ? " up" : flash[k] < 0 ? " down" : "");
    let rival;
    if (st.step <= 3) {
      const mood = ["", "😏", "😠", "🚢"][st.step];
      rival = `<span class="rival" title="The Governor"><span class="face">🎩<span class="mood">${mood}</span></span><span><small>Rival</small>Governor</span></span>`;
    } else {
      const c = m.colonel, mood = c >= 7 ? "😡" : c >= 4 ? "😒" : "🙂";
      rival = `<span class="rival${g("colonel") ? " react" : ""}" title="The Colonel: army anger ${c} of 10"><span class="face">🎖️<span class="mood">${mood}</span></span><span><small>Rival</small>Colonel ${bar("colonel", "b-col")}</span></span>`;
    }
    $("hudIn").innerHTML = `<span class="year"><span>YEAR</span><b>${STEP[st.step].year}</b></span>
      ${st.flag.pal >= 0 ? flagSvg("flagmini") : ""}
      <span class="hm${g("money")}" title="Money ${m.money} of 10"><span class="ic">💰</span><span class="lbl">Money</span>${bar("money", "b-money")}</span>
      <span class="hm${g("peace")}" title="Peace ${m.peace} of 10"><span class="ic">🕊️</span><span class="lbl">Peace</span>${bar("peace", "b-peace")}</span>
      <span class="hm${g("voice")}" title="Voice ${m.voice} of 10"><span class="ic">🗳️</span><span class="lbl">Voice</span>${bar("voice", "b-voice")}</span>
      <span class="hm${g("experts")}" title="Experts ${m.experts} of 5"><span class="ic">🎓</span><span class="dots">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= m.experts ? "" : "off"}">●</i>`).join("")}</span></span>
      <span class="hm strings${g("us") || g("ussr")}" title="Strings attached: U.S. ${m.us}, USSR ${m.ussr}">🔗 <b>🇺🇸${m.us}</b> <b>☭${m.ussr}</b></span>
      <span class="steppill">${Math.min(st.step, TOTAL)}/${TOTAL}</span>${rival}`;
    flash = {};
  }
  function applyFx(fx) { const ch = R.apply(st.g, fx); Object.keys(ch).forEach(k => { flash[k] = (flash[k] || 0) + ch[k]; }); return ch; }

  // ---------------- Pieces ----------------
  const app = $("app");
  function card() { app.innerHTML = `<section class="card" id="stepCard"></section>`; return $("stepCard"); }
  const say = (w, text) => `<div class="say"><span class="${w[1]}">${w[0]}</span><div class="bub"><small>${w[2]}</small>${text}</div></div>`;
  const reveal = html => `<p class="reveal">💡 ${html}</p>`;
  function scrollToEl(el) { if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60); }
  function goNext() { st.step++; st.phase = 0; onEnter(st.step); save(); render(); window.scrollTo(0, 0); }
  function nextBtn(box, label, fn) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn"; b.textContent = label;
    b.onclick = fn || goNext; box.appendChild(b);
  }
  function realHtml(id) {
    const r = REAL[id];
    return `<div class="real" id="real_${id}"><p class="rtag"><span class="rf">${r.f}</span><span>${r.tag}</span><span class="badge">REAL</span></p>
      ${r.quote ? `<p class="quote">${r.quote}</p>` : ""}${r.gloss ? `<p class="src" style="font-size:.8rem;font-weight:700">💬 ${r.gloss}</p>` : ""}${r.txt ? `<p class="rtxt">${r.txt}</p>` : ""}<p class="src">Source: ${r.src}</p></div>`;
  }
  function docHtml(id) {
    const r = REAL[id];
    return `<div class="doc"><p class="dtag">📄 ${r.tag} <span class="badge" style="background:#1f7a4a;color:#fff;border-radius:6px;padding:0 6px;font-size:.66rem">REAL</span></p><p class="quote">${r.quote}</p>${r.gloss ? `<p class="src" style="font-size:.8rem;font-weight:700">💬 ${r.gloss}</p>` : ""}<p class="src">Source: ${r.src}</p></div>`;
  }

  // On entering a step: things that happen no matter what (once).
  function onEnter(step) {
    if (st.entered[step]) return;
    st.entered[step] = true;
    const fx = Object.assign({}, R.AUTO[step] || {});
    const d = R.delayed(step, st.g);
    Object.keys(d).forEach(k => { fx[k] = (fx[k] || 0) + d[k]; });
    st.auto[step] = Object.keys(fx).length ? applyFx(fx) : {};
  }

  // ---------------- Evidence check ----------------
  function mountCheck(box, id, onRight) {
    const def = CHECKS[id], c = chk(id);
    if (c.done) return;
    const wrap = document.createElement("div"); wrap.className = "check"; wrap.id = "check";
    wrap.innerHTML = say(def.who, `<span class="check-tag">🔎 Evidence check</span><br>${def.q}`);
    const area = document.createElement("div"); area.className = "opts";
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    function draw() {
      area.replaceChildren();
      shuffle(def.options.map((t, n) => ({ t, n }))).forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "opt"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            c.done = true; if (window.classFirstTry) window.classFirstTry.right(id);
            save(); onRight(); return;
          }
          c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong(); save();
          wrap.classList.remove("spark"); void wrap.offsetWidth; wrap.classList.add("spark");
          locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
          let left = isTestT() ? 0 : LOCK;
          const tick = () => {
            if (!document.body.contains(wrap)) { locked = false; return; }
            fb.className = "msg bad";
            if (left <= 0) { locked = false; fb.className = "msg"; fb.textContent = "Not quite. " + def.hint + " Try again."; draw(); return; }
            fb.textContent = "Not quite. " + def.hint + " The choices will mix up. Try again in " + left + "…";
            left--; setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
    wrap.appendChild(area); wrap.appendChild(fb);
    box.appendChild(wrap);
  }

  // ---------------- Decision cards ----------------
  function cardChips(step, c) {
    let h = fxChips(c.fx);
    if (c.flag === "schools") h += `<span class="chip good">🎓 later</span>`;
    if (c.flag === "crops") h += `<span class="chip good">💰 later</span>`;
    if (c.flag === "usAngry") h += `<span class="chip bad">👀 U.S.?</span>`;
    return h;
  }
  function deck(box, step, ask) {
    box.insertAdjacentHTML("beforeend", `<p class="ask">${ask}</p>`);
    const wrap = document.createElement("div"); wrap.className = "deck" + (R.D[step].length === 4 ? " n4" : ""); wrap.id = "deck";
    R.D[step].forEach(c => {
      const lock = R.locked(st.g, c);
      const b = document.createElement("button"); b.type = "button"; b.className = "dcard"; b.disabled = lock; b.dataset.id = c.id;
      b.innerHTML = `<span class="ci">${c.ic}</span><span class="dtext"><span class="ct">${c.t}</span><span class="cd">${c.d}</span>
        <span class="chips">${cardChips(step, c)}</span>${lock ? `<span class="lockt">🔒 Needs 🎓 ${c.need.experts}</span>` : ""}</span>`;
      b.onclick = () => {
        if (st.g.picks[step]) return;
        const ch = R.pick(st.g, step, c.id);
        Object.keys(ch).forEach(k => { flash[k] = (flash[k] || 0) + ch[k]; });
        st.last[step] = ch; st.phase = 1; slamNext = true; save(); render();
        scrollToEl($("result"));
      };
      wrap.appendChild(b);
    });
    box.appendChild(wrap);
  }
  function resultHtml(step) {
    const id = st.g.picks[step], c = R.card(step, id), r = E[step].res[id];
    const slam = slamNext; slamNext = false;
    return `<div class="result" id="result"><span class="stamp ${r[0]} ${slam ? "slam" : ""}">${r[1]}</span>
      <span class="youpicked">${c.ic} <span>${c.t}</span></span>
      <p class="rline">${r[2]}</p><div class="fx">${fxChips(st.last[step])}</div></div>`;
  }

  // ---------------- Boards ----------------
  const BUCKET = y => y === 0 || y < 1956 ? "#2e7d4f" : y <= 1959 ? "#f2b134" : y === 1960 ? "#e4572e" : y <= 1969 ? "#3c8dbc" : "#7b4ea3";
  const RULED = "#d9cfbd";
  const fillFor = (y, yr) => (y === -1 ? "url(#hatch)" : y === 0 || y <= yr ? BUCKET(y) : RULED);
  function africaSvg(yr, o) {
    o = o || {};
    const pins = (o.pins || []).map(p => {
      const e = window.AFRICA_MAP.find(x => x[0] === p.id); if (!e) return "";
      const [x, y] = e[3];
      return `<g class="pin${p.pulse ? " pulse" : ""}" transform="translate(${x},${y})"><circle r="22"/><text>${p.ic}</text><text class="lab" y="38">${p.lab}</text></g>`;
    }).join("");
    return `<svg class="afr" viewBox="40 20 650 740" role="img" aria-label="Map of Africa colored by year of independence">
      <defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#8a8178"/><rect width="3" height="8" fill="#5a524a"/></pattern></defs>
      ${window.AFRICA_MAP.map(e => `<path data-y="${e[1]}" data-id="${e[0]}" class="${(o.hot || []).includes(e[0]) ? "hot" : ""}" fill="${fillFor(e[1], yr)}" d="${e[2]}"/>`).join("")}
      ${pins}</svg>`;
  }
  function africaBoard(yr, o) {
    return `<div class="board" id="board"><span class="bigyear" id="bigYear">${yr}</span>${africaSvg(yr, o)}</div>
      <div class="legend"><span><i class="sw" style="background:${RULED}"></i>Ruled by Europe</span><span><i class="sw" style="background:#2e7d4f"></i>Free before 1956</span><span><i class="sw" style="background:#f2b134"></i>1956–59</span><span><i class="sw" style="background:#e4572e"></i>1960</span><span><i class="sw" style="background:#3c8dbc"></i>1961–69</span><span><i class="sw" style="background:#7b4ea3"></i>1970 or later</span><span><i class="sw" style="background:#5a524a"></i>White-minority rule (to 1994)</span></div>
      <p class="bsrc">Today's borders shown. Map: Natural Earth. Your colony is made up, so it's not on the map.</p>`;
  }
  // The made-up nation.
  function nationSvg() {
    const P = st.g.picks, m = M(), s = st.step, fl = st.g.flags;
    const em = (x, y, t, pop, cls) => `<text class="em ${pop ? "pop" : ""} ${cls || ""}" x="${x}" y="${y}">${t}</text>`;
    const fresh1 = k => st.step === k && st.phase >= 1;  // just added this step
    const copperGone = (s === 7 && !P[7]) || (P[7] === "un" && s >= 7 && s <= 8);
    let o = "";
    if (P[4] === "keep") o += em(300, 58, "🛂", fresh1(4));
    if (P[4] === "claim") o += em(300, 92, "🔥", fresh1(4), "shake") + em(300, 136, "🔥", fresh1(4), "shake");
    if (P[4] === "council") o += em(262, 86, "🏛️", fresh1(4));
    if (P[5] === "bosses") o += em(132, 146, "🎩", fresh1(5));
    if (P[5] === "promote") o += em(132, 146, "📋", fresh1(5));
    if (fl.schools) o += em(118, 262, "🏫", fresh1(5)) + (s >= 8 ? em(160, 262, "🎓", s === 8 && st.phase === 0) : "");
    if (s === 6 && !P[6]) o += em(205, 64, "📉", true, "shake");
    if (fl.crops) o += em(210, 104, "🌽", fresh1(6));
    if (P[8] === "ban") o += em(262, 128, "🚫", fresh1(8));
    if (P[8] === "vote") o += em(122, 136, "🗳️", fresh1(8));
    if (P[8] === "jail") o += em(262, 128, "⛓️", fresh1(8));
    if (s === 8 && !P[8]) o += em(262, 128, "📰", true, "shake");
    const end = s >= 10 ? R.ending(st.g) : "";
    if (end === "colonel" || end === "theirman") o += em(96, 186, "🪖", true, "shake");
    const col = m.colonel >= 7 ? "😡" : m.colonel >= 4 ? "😒" : "🙂";
    const flagG = st.flag.pal >= 0 ? `<g transform="translate(98,106)"><rect x="-1" y="0" width="3" height="40" fill="#5b4636"/><g transform="translate(2,0) scale(.38)">${flagSvg("").replace(/<svg[^>]*>|<\/svg>/g, "")}</g></g>` : "";
    return `<svg class="nation" viewBox="0 0 440 300" role="img" aria-label="Map of your made-up nation">
      <defs><pattern id="gone" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#d8b48a"/><rect width="4" height="10" fill="#c8312b" opacity=".55"/></pattern></defs>
      <path d="M300,0 L440,0 L440,300 L300,300 Z" fill="#e3dccb"/>
      <text class="lbl" x="372" y="34" text-anchor="middle">Next-door country</text>
      <path d="M300,8 L300,292 L64,290 Q40,252 54,212 Q30,170 50,130 Q36,90 60,52 Q74,18 116,10 Z" fill="#f6e7b8" stroke="#1f1a17" stroke-width="2"/>
      <path d="M170,234 L300,226 L300,291 L160,290 Z" fill="${copperGone ? "url(#gone)" : "#e2c49a"}" stroke="#8a6a44" stroke-width="1.5" stroke-dasharray="${copperGone ? "5 4" : "0"}"/>
      <ellipse cx="300" cy="118" rx="74" ry="58" fill="#b98f5e" opacity=".55"/>
      <path d="M288,178 Q226,160 184,190 Q134,216 56,206" stroke="#3c8dbc" stroke-width="6" fill="none" stroke-linecap="round"/>
      <line x1="300" y1="0" x2="300" y2="300" stroke="#c8312b" stroke-width="4" stroke-dasharray="9 6"/>
      <text class="lbl" x="300" y="214" text-anchor="middle">📏 Colonial line</text>
      ${em(272, 108, "⛰️")}${em(330, 108, "⛰️")}
      <text class="lbl" x="250" y="152" text-anchor="middle">Hill people</text><text class="lbl" x="352" y="152" text-anchor="middle">Hill people</text>
      <text class="lbl" x="118" y="240" text-anchor="middle">River people</text>
      ${em(160, 76, "🌱")}${em(186, 112, "🌱")}<text class="lbl" x="172" y="52" text-anchor="middle">Cocoa</text>
      ${em(232, 262, copperGone ? "⚠️" : "⛏️", s === 7 && !P[7])}<text class="lbl" x="232" y="246" text-anchor="middle">${copperGone ? "Broke away!" : "Copper"}</text>
      ${em(98, 158, "⭐")}<text class="lbl" x="98" y="180" text-anchor="middle">Capital</text>${flagG}
      ${em(176, 150, "🎖️")}${em(194, 138, col, false)}<text class="lbl" x="178" y="174" text-anchor="middle">Army</text>
      ${m.us ? `<text class="lbl" x="70" y="72">🇺🇸🔗${m.us}</text>` : ""}${m.ussr ? `<text class="lbl" x="70" y="96">☭🔗${m.ussr}</text>` : ""}
      ${end === "broken" ? `<path d="M120,12 L150,80 L130,130 L170,180 L150,240 L180,290" stroke="#1f1a17" stroke-width="5" fill="none" class="pop"/>` : ""}
      ${o}</svg>`;
  }
  function nationBoard() { return `<div class="board" id="board" style="background:#bfe0f2">${nationSvg()}</div><p class="bsrc">A made-up country, built from real problems.</p>`; }

  // ---------------- Title ----------------
  function title() {
    app.innerHTML = `<section class="card titlecard">
      <div>
        <h1>The Day After Freedom</h1>
        <p class="hook">At midnight your country is free. Then you have to run it.</p>
        <ul class="facts"><li>✊ Win freedom</li><li>🏛️ Run a brand-new nation</li><li>🔎 6 evidence checks · 🏁 6 endings · 25 min</li></ul>
        <p class="goal">🎯 <b>Goal:</b> explain how African nations won freedom, and what came next.</p>
        <label for="nameBox">Name (like Jordan M.)</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="Jordan M." value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Take your seat →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        <div class="tstage"><div class="sun"></div><span class="midnight">🕛 11:59 PM</span><div class="pole"></div>
          <svg class="tflag" viewBox="0 0 90 60"><rect width="90" height="20" fill="#1f7a4a"/><rect y="20" width="90" height="20" fill="#f2b134"/><rect y="40" width="90" height="20" fill="#c8312b"/><text x="45" y="31" font-size="22" text-anchor="middle" dominant-baseline="central">⭐</text></svg>
          <div class="crowd">🙌🏾🎉🙌🏿📯🙌🏽🎉🙌🏾</div></div>
        <div class="vsrow"><span>🧑🏾‍💼 You</span><span>🎖️ The Colonel</span><span>🇺🇸 vs ☭</span></div>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; st.phase = 0; onEnter(1); save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Generic decision step ----------------
  function boardFor(step) {
    if (step === 1) return africaBoard(1951, { hot: ["ghana"], pins: [{ id: "ghana", ic: "✊", lab: "Ghana", pulse: true }] });
    if (step === 2) return africaBoard(1955, { hot: ["kenya", "algeria"], pins: [{ id: "algeria", ic: "💥", lab: "Algeria", pulse: true }, { id: "kenya", ic: "💥", lab: "Kenya", pulse: true }, { id: "ghana", ic: "✊", lab: "Ghana" }] });
    return nationBoard();
  }
  function decisionStep(step) {
    const e = E[step], box = card();
    box.innerHTML = `<span class="kicker ${step >= 4 ? "p2" : ""}">${STEP[step].t}</span><div class="split"><div id="left">${boardFor(step)}</div><div id="right"></div></div>`;
    const right = $("right");
    if (st.phase === 0) {
      let h = "";
      if (step === 1) h += `<ul class="how"><li>🃏 Tap a card to decide</li><li>📊 Watch your meters</li><li>🔎 REAL cards unlock the next year</li></ul>`;
      if (e.banner) h += `<div class="banner"><span class="bi">${e.banner[0]}</span><span>${e.banner[1]} ${fxChips(st.auto[step])}</span></div>`;
      const fl = st.g.flags, good = (ic, t, fx) => `<div class="banner good"><span class="bi">${ic}</span><span>${t} ${fxChips(fx)}</span></div>`;
      if (step === 8 && fl.schools) h += good("🎓", "Your first graduates arrive!", { experts: 2 });
      if (step === 9 && fl.crops) h += good("🌱", "New crops pay off!", { money: 2 });
      if (step === 9 && fl.unfix) h += good("⛏️", "The UN brings the copper region back!", { money: 1 });
      if (e.chart) h += `<div class="price" aria-label="Cocoa price falling">${[78, 86, 70, 64, 52, 30].map(v => `<i style="height:${v}%"></i>`).join("")}<b>📉</b></div>`;
      h += e.say.map(s => say(s[0], s[1])).join("");
      right.innerHTML = h;
      deck(right, step, e.ask);
      return;
    }
    if (st.phase === 1) {
      right.innerHTML = resultHtml(step);
      nextBtn(right, "🔎 What really happened? →", () => { st.phase = 2; save(); render(); scrollToEl($("realZone")); });
      return;
    }
    // phase 2: REAL cards (+ evidence check)
    const id = st.g.picks[step], c = R.card(step, id);
    right.innerHTML = `<span class="youpicked">${c.ic} <span>${c.t}</span></span>`;
    const zone = document.createElement("div"); zone.id = "realZone"; right.appendChild(zone);
    if (e.doc) zone.insertAdjacentHTML("beforeend", docHtml(e.doc));
    if (e.reals) {
      zone.insertAdjacentHTML("beforeend", `<div class="reals" id="reals"></div>`);
      e.reals.forEach(id => {
        if (e.flip && !st.flips[id]) {
          const b = document.createElement("button"); b.type = "button"; b.className = "real back"; b.id = "flip_" + id;
          b.innerHTML = `<span><span class="rf">${REAL[id].f}</span>Tap to flip</span>`;
          b.onclick = () => { st.flips[id] = true; save(); render(); };
          $("reals").appendChild(b);
        } else $("reals").insertAdjacentHTML("beforeend", realHtml(id));
      });
    }
    const allFlipped = !e.flip || e.reals.every(id => st.flips[id]);
    if (!allFlipped) return;
    const finish = () => {
      zone.insertAdjacentHTML("beforeend", (e.check ? `<div class="solved">✔ Evidence filed</div>` : "") + reveal(e.reveal));
      nextBtn(zone, step === 9 ? "🎖️ The Colonel's move →" : "Next year →");
    };
    if (e.check && !chk(e.check).done) {
      mountCheck(zone, e.check, () => { render(); scrollToEl($("nextBtn")); });
      return;
    }
    finish();
  }

  // ---------------- Step 3: Freedom Day ----------------
  function step3() {
    const box = card();
    const yr = st.phase === 0 ? 1959 : st.phase === 2 ? 1960 : st.waved ? 1990 : 1950;
    box.innerHTML = `<span class="kicker">${STEP[3].t}</span><div class="split"><div id="left">${africaBoard(yr, {})}</div><div id="right"></div></div>`;
    const right = $("right");
    if (st.phase === 0) {
      right.innerHTML = say(PM, "Midnight tonight, we're free! Design our flag.") +
        `<div class="flagmaker"><div id="flagPrev">${flagSvg("flagbig")}</div>
        <p class="ask">1. Colors</p><div class="swrow" id="pals">${PALS.map((p, i) => `<button type="button" class="swbtn ${st.flag.pal === i ? "on" : ""}" data-i="${i}" aria-label="Colors ${i + 1}">${p.map(c => `<i style="background:${c}"></i>`).join("")}</button>`).join("")}</div>
        <p class="ask">2. Symbol</p><div class="swrow" id="ems">${EMS.map((e, i) => `<button type="button" class="embtn ${st.flag.em === i ? "on" : ""}" data-i="${i}">${e}</button>`).join("")}</div></div>`;
      right.querySelectorAll("#pals button").forEach(b => { b.onclick = () => { st.flag.pal = +b.dataset.i; save(); render(); }; });
      right.querySelectorAll("#ems button").forEach(b => { b.onclick = () => { st.flag.em = +b.dataset.i; save(); render(); }; });
      nextBtn(right, "🌍 Watch Africa go free →", () => { st.phase = 1; save(); render(); window.scrollTo(0, 0); });
      $("nextBtn").disabled = st.flag.pal < 0 || st.flag.em < 0;
      return;
    }
    if (st.phase === 1) {
      if (!st.waved) {
        right.innerHTML = say(PM, "All over Africa, colonies are winning freedom. Watch.");
        nextBtn(right, "▶ Play the freedom wave", playWave);
        return;
      }
      right.innerHTML = say(PM, "What a wave! Now read the map.");
      mountCheck(right, "c_map", () => { st.phase = 2; save(); render(); window.scrollTo(0, 0); });
      if (chk("c_map").done) { st.phase = 2; save(); render(); }
      return;
    }
    // phase 2: midnight
    right.innerHTML = `<div class="night"><span class="fw" style="left:6%;top:38%">🎆</span><span class="fw" style="right:6%;top:30%;animation-delay:.5s">🎇</span><span class="fw" style="left:14%;top:8%;animation-delay:1s">🎆</span>
      <p class="clock">🕛 12:00 AM</p>${flagSvg("flagbig raise")}<span class="freestamp">FREE!</span></div>` +
      `<div class="solved">✔ Map read</div>` + realHtml("wind") + reveal("<b>Year of Africa</b>: 17 African countries won freedom in 1960.");
    nextBtn(right, "Run your new nation →");
  }
  function playWave() {
    const btn = $("nextBtn"); if (btn) btn.disabled = true;
    const paths = document.querySelectorAll(".afr path"), big = $("bigYear");
    let yr = 1950;
    const t = setInterval(() => {
      yr++;
      big.textContent = yr; big.classList.remove("tick"); void big.offsetWidth; big.classList.add("tick");
      paths.forEach(p => { const y = +p.dataset.y; if (y === yr) { p.setAttribute("fill", fillFor(y, yr)); p.classList.add("lit"); } });
      if (yr >= 1990) { clearInterval(t); st.waved = true; save(); setTimeout(render, 600); }
    }, 170);
    document.querySelectorAll(".afr path").forEach(p => { const y = +p.dataset.y; p.setAttribute("fill", fillFor(y, 1950)); });
  }

  // ---------------- Ending ----------------
  const ENDINGS = {
    broken: { icon: "💔", t: "Torn Apart", line: "Peace collapsed. Civil war splits your nation.",
      real: { f: "🇳🇬", tag: "Nigeria · 1967–1970", txt: "Biafra tried to break away. 500,000 to 3 million died, mostly from hunger.", src: "Encyclopaedia Britannica, “Biafra”" } },
    theirman: { icon: "🎖️", t: "Their Man Takes Over", line: "The Colonel seizes power with a superpower's help.",
      real: { f: "🇨🇩", tag: "Congo · 1965", txt: "Mobutu took power with U.S. support and ruled 32 years.", src: "UPI, “Zaire at a glance,” 1997; CIA, Studies in Intelligence" } },
    colonel: { icon: "🪖", t: "The Colonel Takes Over", line: "Soldiers seize the radio. The Colonel promises “order.”",
      real: { f: "🇹🇬", tag: "Togo 1963 · Ghana 1966", txt: "Togo had sub-Saharan Africa's first army coup. Ghana's army overthrew Nkrumah in 1966.", src: "LSE Africa blog, “Remembering sub-Saharan Africa's first military coup d'état,” 2013; Britannica, “Kwame Nkrumah”" } },
    client: { icon: "🔗", t: "Cold War Client", line: "You stay in power. A foreign capital makes the big calls.",
      real: { f: "🌍", tag: "Africa · 1960s–1980s", txt: "Both superpowers propped up friendly leaders, even harsh ones, to win allies.", src: "Lesson notes: CIA, Studies in Intelligence; U.S. State Dept., FRUS" } },
    free: { icon: "🗳️", t: "Hard, but Free", line: "Still poor. Still arguing. But voters choose, and losers step aside.",
      real: { f: "🇧🇼", tag: "Botswana · 1966–today", txt: "Free elections since 1966. In 2024 the ruling party lost and stepped aside.", src: "DemocracyWeb, “Botswana: Accountability”" } },
    quiet: { icon: "🔒", t: "Quiet, Not Free", line: "Calm streets. But only one party may run.",
      real: { f: "🇹🇿", tag: "Tanzania · 1965", txt: "Nyerere made Tanzania a one-party state. It stayed peaceful.", src: "Encyclopaedia Britannica, “Julius Nyerere”" } }
  };
  const CAUSE = {
    1: { strikes: "✊ Won freedom by strikes, votes", revolt: "🔥 Won freedom by war", wait: "⏳ Waited; Governor picked chiefs" },
    2: { buy: "💵 Bought settler farms", take: "✊ Took settler farms", leave: "🤝 Left settlers the best land" },
    4: { keep: "📏 Kept the colonial line", claim: "⚔️ Fought a border war", council: "🏛️ Gave Hill people a council" },
    5: { bosses: "🎩 Kept colonial bosses", promote: "🚀 Promoted untrained officials", schools: "🏫 Built schools first" },
    6: { usloan: "🇺🇸 Took a U.S. loan", ussrloan: "☭ Took a Soviet loan", army: "✂️ Cut army pay", crops: "🌱 Grew new crops" },
    7: { un: "🇺🇳 Called the UN", ussr: "☭ Called the USSR", us: "🇺🇸 Called the U.S." },
    8: { ban: "🚫 Banned other parties", vote: "🗳️ Kept elections", jail: "⛓️ Jailed critics" },
    9: { joinus: "🇺🇸 Joined the U.S. side", joinussr: "☭ Joined the Soviet side", nonaligned: "🧭 Stayed non-aligned" }
  };
  function causedBy() { return R.STEPS_WITH_PICKS.map(k => CAUSE[k][st.g.picks[k]]).filter(Boolean); }
  function whyLines() {
    const m = M(), e = R.ending(st.g), L = [];
    if (e === "broken") L.push("🕊️ Peace fell to " + m.peace + "/10");
    if (e === "colonel" || e === "theirman") {
      L.push("🎖️ Army anger " + m.colonel + "/10");
      if (m.money <= 2) L.push("💰 Couldn't pay the soldiers");
      const b = R.backer(st.g); if (b) L.push(b === "us" ? "🇺🇸 The U.S. backed the Colonel" : "☭ The USSR backed the Colonel");
    }
    if (e === "client") L.push("🔗 Strings: 🇺🇸" + m.us + " ☭" + m.ussr);
    if (e === "free") L.push("🗳️ Voice stayed strong: " + m.voice + "/10");
    if (e === "quiet") L.push("🗳️ Voice fell to " + m.voice + "/10");
    return L;
  }
  function step10() {
    const box = card(), e = R.ending(st.g), en = ENDINGS[e];
    const coupNow = e === "colonel" || e === "theirman";
    const verdict = e === "broken" ? ["bad", "CIVIL WAR"] : coupNow ? ["bad", "COUP!"] : ["good", "NO COUP"];
    box.innerHTML = `<span class="kicker p2">${STEP[10].t}</span><div class="split"><div id="left">${nationBoard()}</div><div id="right">
      <div class="coup"><div class="big">🎖️${coupNow ? "🪖📻" : e === "broken" ? "💥" : "🫡"}</div><p>The Colonel makes his move…</p><span class="verdict ${verdict[0]}">${verdict[1]}</span></div>
      <div class="ending ${e}"><div class="e-icon">${en.icon}</div><h2>${en.t}</h2><p>${en.line}</p>
      <div class="statrow"><span class="chip">💰 ${M().money}</span><span class="chip">🕊️ ${M().peace}</span><span class="chip">🗳️ ${M().voice}</span><span class="chip">🎓 ${M().experts}</span><span class="chip str">🔗 🇺🇸${M().us} ☭${M().ussr}</span><span class="chip bad">🎖️ ${M().colonel}</span></div></div>
      ${realHtml2(en.real)}
      <div class="caused"><p class="ctag">Caused by:</p><ul>${whyLines().concat(causedBy()).map(c => `<li>${c}</li>`).join("")}</ul></div></div></div>`;
    nextBtn($("right"), "📝 Write your memo →");
  }
  function realHtml2(r) {
    return `<div class="real" style="margin-top:10px"><p class="rtag"><span class="rf">${r.f}</span><span>${r.tag}</span><span class="badge">REAL</span></p><p class="rtxt">${r.txt}</p><p class="src">Source: ${r.src}</p></div>`;
  }

  // ---------------- Memo + turn in ----------------
  const PROMPTS = [
    { id: "left", short: "Hardest problem colonial rule left behind", label: "1. Hardest problem colonial rule left?",
      stem: "The hardest problem was ___ because ___.", deeper: "", min: 60, newWords: 5,
      mustAll: [["border", "line", "crop", "cocoa", "expert", "trained", "college", "degree", "school", "educat", "settler", "land", "farm", "army", "official", "debt", "ethnic", "hill"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name a problem (like borders, one crop, or few trained people) AND say why (use “because”)." },
    { id: "cold", short: "Did the superpowers help or hurt new nations?", label: "2. Did the superpowers help or hurt? Use a real country.",
      stem: "The superpowers mostly ___ new nations because ___. For example, in ___,", deeper: "Go deeper: show the other side too.", min: 70, newWords: 6,
      mustAll: [["help", "hurt"], ["congo", "lumumba", "mobutu", "zaire", "katanga", "ghana", "nkrumah", "kenya", "algeria", "botswana", "nigeria", "tanzania"], ["because", "since", "so "]],
      mustMsg: "In answer 2, say help OR hurt, name a real country (like the Congo), and say why (use “because”)." }
  ];
  function step11() {
    const box = card();
    box.innerHTML = `<div class="report" id="report"><p class="report-tag">📝 Memo to the next new nation</p></div>`;
    const rep = $("report");
    PROMPTS.forEach(p => {
      rep.insertAdjacentHTML("beforeend", `<label for="w_${p.id}">${p.label}</label><p class="stem">✏️ ${esc(p.stem)}</p>${p.deeper ? `<p class="deeper">⭐ ${p.deeper}</p>` : ""}<textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`);
    });
    rep.insertAdjacentHTML("beforeend", `<button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      <p class="turned" id="turnedBadge" ${st.turnedIn ? "" : "hidden"}>✓ Turned in</p>
      <p class="replay" id="replay" ${st.turnedIn ? "" : "hidden"}>🔁 Another ending? Press “Start over” below.</p>`);
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const p of (isTestT() ? [] : PROMPTS)) {   // Test T. (teacher) skips the writing rules
      const box = $("w_" + p.id), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
        if (junk) { msg.textContent = "For " + p.short + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < p.newWords) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "msg bad"; box.focus(); return; }
      const pv = " " + plain(v) + " ";
      if (p.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(pv)))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      $("sendBtn").textContent = "Turned in ✓"; $("turnedBadge").hidden = false; $("replay").hidden = false;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  const CHOICE_LABEL = {
    1: ["1951 · How to win freedom", { strikes: "Strikes, boycotts, and elections (Ghana's road)", revolt: "Armed revolt", wait: "Wait for the colonizer" }],
    2: ["1950s · Settler farms", { buy: "Buy the farms", take: "Take the farms (settlers flee)", leave: "Leave settlers the best land" }],
    4: ["1960 · Colonial border", { keep: "Keep the colonial line", claim: "Claim the hills (border war)", council: "Hill council (share power)" }],
    5: ["1961 · Few trained people", { bosses: "Keep colonial officials", promote: "Promote untrained locals fast", schools: "Schools first" }],
    6: ["1962 · Cocoa crash", { usloan: "U.S. loan", ussrloan: "Soviet loan", army: "Cut army pay", crops: "Grow new crops" }],
    7: ["1963 · Breakaway province", { un: "Ask the UN", ussr: "Ask the USSR", us: "Ask the U.S." }],
    8: ["1964 · Critics and elections", { ban: "One-party state", vote: "Keep elections", jail: "Jail critics" }],
    9: ["1965 · Cold War side", { joinus: "Join the U.S. side", joinussr: "Join the Soviet side", nonaligned: "Non-aligned" }]
  };
  function buildAnswers() {
    const a = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => chk(id).done && !chk(id).wrong).length;
    a["First-try correct"] = right + " of " + CHECK_IDS.length;
    const by = {};
    CHECK_IDS.forEach(id => { const s = CHECKS[id].std; by[s] = by[s] || [0, 0]; by[s][1]++; if (chk(id).done && !chk(id).wrong) by[s][0]++; });
    a["First-try by standard"] = Object.keys(by).sort().map(k => k + ": " + by[k][0] + " of " + by[k][1]).join(" · ");
    CHECK_IDS.forEach(id => {
      const w = chk(id).wrong;
      a[CHECKS[id].short] = CHECKS[id].options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    Object.keys(CHOICE_LABEL).forEach(k => { const [lab, map] = CHOICE_LABEL[k]; a["Choice · " + lab] = st.g.picks[k] ? map[st.g.picks[k]] : "—"; });
    const en = ENDINGS[R.ending(st.g)];
    a["Ending"] = en.t;
    a["Caused by"] = whyLines().concat(causedBy()).join(" | ");
    const m = M();
    a["Game meters at the end"] = "Money: " + m.money + "/10 · Peace: " + m.peace + "/10 · Voice: " + m.voice + "/10 · Experts: " + m.experts + "/5 · U.S. strings: " + m.us + " · Soviet strings: " + m.ussr + " · Army anger: " + m.colonel + "/10";
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }

  // ---------------- Render ----------------
  function render() {
    if (!firstRender && $("welcome")) $("welcome").hidden = true;
    firstRender = false;
    locked = false;
    document.body.classList.toggle("home", st.step === 0);
    hud();
    const s = st.step;
    if (s === 0) title();
    else if (s === 3) step3();
    else if (s >= 1 && s <= 9) decisionStep(s);
    else if (s === 10) step10();
    else if (s === 11) step11();
    else title();
  }
  let firstRender = true;

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) {
    // Shared Chromebooks: the game already starts clean if the signed-in name is someone else.
    // "Not you?" lets the next kid wipe this saved game on the spot.
    const nm = st.name || "";
    $("welcome").innerHTML = `<span>Welcome back, ${esc(nm)}! You're on step ${Math.min(st.step, TOTAL)} of ${TOTAL}.</span> <button type="button" class="notyou" id="notYouBtn">Not ${esc(nm)}? Start fresh</button>`;
    $("welcome").hidden = false;
    $("notYouBtn").onclick = () => {
      st = fresh();
      if (window.classFirstTry) window.classFirstTry.reset();
      try { localStorage.removeItem(KEY); localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      location.reload();
    };
  }
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer what's on screen.
  // Screens: each decision year = "decide" (cards, then the result) + "what really happened" (REAL cards + check);
  // Freedom Day = flag, wave + map check, midnight; then the ending and the memo.
  // Later years read earlier picks, so a jump first plays any skipped pick with the game's own card buttons (Test T. only).
  try {
    const SCREENS = [];
    for (let k = 1; k <= 9; k++) {
      if (k === 3) SCREENS.push([3, 0, "1960 · Design the flag"], [3, 1, "1960 · Freedom wave + map check"], [3, 2, "1960 · Midnight"]);
      else SCREENS.push([k, 0, STEP[k].t + ": decide"], [k, 2, STEP[k].t + ": what really happened"]);
    }
    SCREENS.push([10, 0, STEP[10].t], [11, 0, STEP[11].t]);
    const pickFirst = () => { const c = document.querySelector("#deck .dcard:not([disabled])"); if (c) c.click(); };
    const clickRight = id => {
      locked = false;
      const b = [...document.querySelectorAll("#check .opt")].find(x => x.textContent === CHECKS[id].options[0]);
      if (b) b.click();
    };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => SCREENS.length,
      index: () => {
        const ph = st.step === 3 ? (st.phase || 0) : (st.phase === 2 ? 2 : 0);
        const i = SCREENS.findIndex(x => x[0] === st.step && x[1] === ph);
        return i >= 0 ? i : st.step < 1 ? 0 : SCREENS.length - 1;
      },
      label: i => SCREENS[i][2],
      go: i => {
        if (!st.name) st.name = "Test T.";
        const [ts, tp] = SCREENS[i];
        R.STEPS_WITH_PICKS.forEach(k => {
          if ((k < ts || (k === ts && tp >= 1)) && !st.g.picks[k]) { onEnter(k); st.step = k; st.phase = 0; render(); pickFirst(); }
        });
        if (ts > 3 || (ts === 3 && tp >= 1)) { if (st.flag.pal < 0) st.flag.pal = 0; if (st.flag.em < 0) st.flag.em = 0; }
        for (let k = 1; k <= Math.min(ts, 9); k++) onEnter(k);
        st.step = ts; st.phase = tp; slamNext = false;
        save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const s = st.step, e = E[s];
        if (s === 3) {
          if (st.phase === 0 && (st.flag.pal < 0 || st.flag.em < 0)) { if (st.flag.pal < 0) st.flag.pal = 0; if (st.flag.em < 0) st.flag.em = 0; save(); render(); }
          else if (st.phase === 1 && !st.waved) { st.waved = true; save(); render(); }
          else if (st.phase === 1 && !chk("c_map").done) clickRight("c_map");
          return;
        }
        if (!e) return;
        if (st.phase === 0 && !st.g.picks[s]) { pickFirst(); return; }
        if (st.phase === 2) {
          if (e.flip && e.reals.some(id => !st.flips[id])) { e.reals.forEach(id => { st.flips[id] = true; }); save(); render(); return; }
          if (e.check && !chk(e.check).done) clickRight(e.check);
        }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
