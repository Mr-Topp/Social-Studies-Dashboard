// =====================================================================
//  BREAK THE GRIP  (World History Unit 2 Day 4 · WH.36, WH.34)
//  The student leads a made-up organizer's part of India's independence movement, 1930–1947,
//  then guides the new country through the Cold War, then opens real case files for Ghana, Kenya, Algeria.
//  Core loop: play a tactic card → Britain reacts → the 10-link chain ("Britain's grip") breaks or re-forges.
//  Nonviolence + world attention break links; force re-forges them and raises the human cost.
//  WWII drains Britain (−3), and if the world is watching (🌍 4+), superpower/UN pressure adds −1.
//  Britain leaves if the grip is 4 or less by 1945. The Cold War side you pick changes the ending.
//  5 evidence checks woven in. 5 decisions (4 change the ending). 4 endings. Strict order. Saves on this device.
//  Turn-in goes through shared/turnin.js (same id and payload shape as shared/unit-game.js).
//  Made up: the player, the player's results "in your game". Real: events, quotes, numbers (sources on screen).
// =====================================================================
(function () {
  "use strict";
  const KEY = "wh-u2-d6-empires-end-v2";
  const ASSIGNMENT_ID = "wh-u2-d6-empires-end";
  const TITLE = "World History · Unit 2 · Day 4 · Break the Grip: How Do Colonies Get Free?";
  const STANDARD = "SS.9-12.WH.36, SS.9-12.WH.34";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, TOTAL = 9, LEAVE_AT = 4, STRONG = 3;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const app = $("app");

  // ---------------- State ----------------
  const fresh = () => ({ v: 1, name: "", step: 0, sub: 0, grip: 10, people: 2, world: 1, cost: 0, armed: 0, mad: false,
    picks: {}, checks: {}, owed: null, drained: null, left: null, files: {}, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1) st = fresh();
  // Shared Chromebooks: a different student is signed in on this device now, so never show the last kid's game.
  try {
    const short = window.classShortName || (x => String(x || "").trim());
    const nowName = short(localStorage.getItem("site-student-name") || "");
    if (st.name && nowName && short(st.name).toLowerCase() !== nowName.toLowerCase()) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });

  function apply(fx) {
    if (!fx) return;
    st.grip = clamp(st.grip + (fx.grip || 0), 0, 10);
    st.people = clamp(st.people + (fx.people || 0), 0, 10);
    st.world = clamp(st.world + (fx.world || 0), 0, 10);
    st.cost += fx.cost || 0;
    if (fx.armed) st.armed++;
    st.mad = !!fx.armed;
  }

  // A peaceful move's cost that lands next turn (arrests, lost pay). Paid once, then shown on that step.
  function payOwed() {
    const o = st.owed;
    if (o && !o.paid && st.step >= o.at) { apply(o.fx); st.mad = false; o.paid = true; save(); }
  }
  const owedHtml = () => st.owed && st.owed.paid && st.owed.at === st.step && !st.sub ?
    `<div class="owed" id="owedBox"><span class="oh">Last move's cost</span><span class="chip red">${st.owed.tag}</span></div>` : "";

  // ---------------- HUD ----------------
  const YEARS = ["", "1930", "May 1930", "1939–42", "1945", "Aug. 1947", "1950s", "1945–63", "The end", "Aug. 1947"];
  let prev = null;
  function pop(el, d) {
    if (!el || !d) return;
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
    const s = document.createElement("span"); s.className = "delta " + (d > 0 ? "up" : "down"); s.setAttribute("aria-hidden", "true");
    s.textContent = (d > 0 ? "+" : "") + d; el.appendChild(s); setTimeout(() => s.remove(), 1700);
  }
  function mood() {
    if (st.grip <= 0) return ["🧳", st.step <= 4 ? "packing up" : "gone home"];
    if (st.mad) return ["😠", "cracking down"];
    if (st.grip >= 8) return ["😏", "confident"];
    if (st.grip >= 5) return ["😟", "worried"];
    return ["😰", "losing grip"];
  }
  function hud() {
    $("hud").hidden = st.step < 1;
    if (st.step < 1) return;
    $("stepPill").textContent = "Step " + Math.min(st.step, TOTAL) + " of " + TOTAL;
    $("yearPill").textContent = "📅 " + YEARS[Math.min(st.step, TOTAL)];
    $("peopleBar").style.width = st.people * 10 + "%"; $("peopleNum").textContent = st.people;
    $("worldBar").style.width = st.world * 10 + "%"; $("worldNum").textContent = st.world;
    $("hearts").innerHTML = `<span>💔</span>` + (st.cost ? Array.from({ length: Math.min(st.cost, 8) }, () => "<i>🖤</i>").join("") : `<small style="color:var(--muted)">0</small>`);
    $("hearts").setAttribute("aria-label", "Human cost: " + st.cost);
    const C = $("chain");
    if (!C.children.length) C.innerHTML = Array.from({ length: 10 }, () => `<span class="link"></span>`).join("");
    C.querySelectorAll(".link").forEach((l, i) => {
      const was = l.classList.contains("broken"), now = i >= st.grip;
      l.classList.toggle("broken", now);
      if (prev) {
        if (now && !was) { l.classList.remove("snap"); void l.offsetWidth; l.classList.add("snap"); }
        if (!now && was) { l.classList.remove("forge"); void l.offsetWidth; l.classList.add("forge"); }
      }
    });
    $("gripNum").textContent = st.grip + "/10";
    $("chainBox").setAttribute("aria-label", "Britain's grip: " + st.grip + " of 10");
    const [f, m] = mood();
    $("rFace").textContent = f; $("rMood").textContent = m;
    $("rival").classList.toggle("gone", st.grip <= 0);
    if (prev && st.mad && !prev.mad) { const r = $("rival"); r.classList.remove("mad"); void r.offsetWidth; r.classList.add("mad"); }
    if (prev) { pop($("mPeople"), st.people - prev.people); pop($("mWorld"), st.world - prev.world); pop($("chainBox"), st.grip - prev.grip); }
    prev = { people: st.people, world: st.world, grip: st.grip, mad: st.mad };
  }

  // ---------------- Pieces ----------------
  function card() { app.innerHTML = `<section class="card" id="stepCard"></section>`; return $("stepCard"); }
  const banner = (yr, place, em, cls) => `<div class="banner ${cls || ""}"><div><span class="yr">${yr}</span><br><span class="place">${place}</span></div><div class="em" aria-hidden="true">${em}</div></div>`;
  const say = (who, av, avCls, text, mad) => `<div class="say"><div class="av ${avCls}" aria-hidden="true">${av}</div><div class="bubble ${mad ? "mad" : ""}">${who ? `<span class="who">${who}</span>` : ""}<span>${text}</span></div></div>`;
  const reveal = (term, text) => `<p class="reveal"><span class="term">${term}</span><span>${text}</span></p>`;
  const src = t => `<p class="src">${t}</p>`;
  const real = `<span class="realtag">📜 REAL</span>`;
  function nextBtn(box, label, fn) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn"; b.textContent = label;
    b.onclick = fn || (() => { st.step++; st.sub = 0; st.mad = false; save(); render(); window.scrollTo(0, 0); });
    box.appendChild(b); return b;
  }
  // Next screen inside the same step (the earlier text clears away, so each screen stays short).
  const subBtn = (box, label) => nextBtn(box, label, () => { st.sub = (st.sub || 0) + 1; save(); render(); window.scrollTo(0, 0); });
  function scrollToEl(el) { if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60); }
  const fxSpan = ([t, cls]) => `<span class="${cls || ""}">${t}</span>`;

  // Decision cards. list: [{k, ic, t, d, fx:[[text, "good"|"bad"]]}]
  function cards(box, list, picked, onPick, key) {
    const wrap = document.createElement("div"); wrap.className = "decide";
    st.ord = st.ord || {};
    if (key && (!st.ord[key] || st.ord[key].length !== list.length)) { st.ord[key] = shuffle(list.map(c => c.k)); save(); }
    const ordered = key ? st.ord[key].map(k => list.find(c => c.k === k)).filter(Boolean) : list;
    ordered.forEach(c => {
      const b = document.createElement("button"); b.type = "button"; b.className = "dcard" + (picked === c.k ? " sel" : ""); b.dataset.k = c.k;
      b.innerHTML = `<span class="ic" aria-hidden="true">${c.ic}</span><span class="ct">${c.t}</span>${c.d ? `<span class="cd">${c.d}</span>` : ""}<span class="fx">${(c.fx || []).map(fxSpan).join("")}</span>`;
      if (picked != null) b.disabled = true;
      else b.onclick = () => onPick(c.k);
      wrap.appendChild(b);
    });
    box.appendChild(wrap); return wrap;
  }
  // A tactic round: cards → pick applies effects → result with stamp + Britain's reaction.
  // introHtml shows only before the pick; after the pick the result replaces it.
  function round(box, key, list, introHtml, after) {
    const picked = st.picks[key];
    if (picked == null && introHtml) box.insertAdjacentHTML("beforeend", introHtml);
    cards(box, list, picked, k => {
      const c = list.find(x => x.k === k);
      st.picks[key] = k; apply(c.eff);
      if (c.later) st.owed = { k, at: st.step + 1, fx: c.later, tag: c.ltag, paid: false };
      save(); render();
      scrollToEl($("res_" + key));
    }, key);
    if (picked == null) return false;
    const c = list.find(x => x.k === picked);
    box.insertAdjacentHTML("beforeend", `<div class="result" id="res_${key}"><span class="stamp slam ${c.bad ? "red" : ""}">${c.stamp}</span>
      ${say("Britain", c.bad ? "😠" : "👑", "brit", c.brit, c.bad)}<p>${c.res}</p>${c.src ? src(c.src) : ""}</div>`);
    if (after) after(c);
    return true;
  }

  // ---------------- Evidence checks ----------------
  // options[0] is right; the screen always shuffles. std feeds the dashboard's mastery data.
  const CHECKS = {
    dPress: { std: "WH.36", short: "Why the Dharasana news hurt Britain", stamp: "IN 1,350 PAPERS",
      ask: "Why does this story hurt Britain?",
      options: ["It makes British rule look cruel to the world", "It proves the marchers were secretly planning a war", "It shows Indians wanted to keep the salt tax", "It shows the police were guarding the marchers"],
      hint: "The marchers didn't fight back. So how do the police look?",
      reveal: ["Nonviolent resistance", "never fighting back, so the cruelty is plain to see."] },
    dWar: { std: "WH.36", short: "How WWII pushed Britain out of India", stamp: "BROKE",
      ask: "How did WWII push Britain out?",
      options: ["Britain was weak, and Indians demanded freedom", "Japan captured India from Britain in 1945", "Indian soldiers refused to fight for Britain", "Britain won and no longer needed colonies"],
      hint: "Read Britain's books: money, and soldiers.",
      reveal: ["Decolonization", "colonies becoming free countries. WWII sped it up."] },
    dMap: { std: "WH.34", short: "What the Partition map shows", stamp: "MAPPED",
      ask: "What does the map show Partition did?",
      options: ["Split British India into India and a two-part Pakistan", "Gave all of British India to the new Pakistan", "Split India into four new states by language", "Gave the Punjab region back to British rule"],
      hint: "Count the green pieces. Where is India?",
      reveal: ["Partition", "the 1947 split of British India into India and Pakistan."] },
    dNehru: { std: "WH.36", short: "Nehru's plan = non-alignment", stamp: "NON-ALIGNED",
      ask: "What is Nehru's plan?",
      options: ["Stay out of both Cold War sides", "Join the U.S. side against the Soviets", "Join the Soviet side against the U.S.", "Let the United Nations run India"],
      hint: "He wants to “keep away from” groups against one another.",
      reveal: ["Non-alignment", "not joining either side in the Cold War."] },
    dPaths: { std: "WH.34", short: "Colony whose path was most like India's", stamp: "MATCHED",
      ask: "Which colony's path was most like India's?",
      options: ["Ghana, free in 1957", "Algeria, free in 1962", "Kenya, free in 1963", "None. They all fought wars"],
      hint: "Find the dot closest to India's 🕊️ end.",
      reveal: ["Paths to freedom", "some colonies protested; others fought long, deadly wars."] }
  };
  const CHECK_IDS = Object.keys(CHECKS);
  let locked = false;

  function checkBox(box, id, evidenceHtml, frame, onSolved) {
    const C = CHECKS[id], c = chk(id);
    const d = document.createElement("div"); d.className = "doc"; d.id = "doc_" + id;
    d.innerHTML = `<p class="dh">${frame}</p>${evidenceHtml}<p class="ask">${C.ask}</p><div class="opts" id="opts_${id}"></div><p class="msg" id="msg_${id}" role="status" aria-live="polite"></p>`;
    box.appendChild(d);
    const area = d.querySelector(".opts"), fb = d.querySelector(".msg");
    let lastOrder = "";
    if (c.done) { solvedView(); return d; }
    function solvedView() {
      area.innerHTML = `<button type="button" class="opt yes" disabled>${esc(C.options[0])}</button>`;
      d.insertAdjacentHTML("afterbegin", `<span class="stamp">${C.stamp}</span>`);
      d.insertAdjacentHTML("beforeend", reveal(C.reveal[0], C.reveal[1]));
    }
    function draw() {
      area.innerHTML = "";
      let order, tries = 0;
      do { order = shuffle(C.options.map((t, n) => ({ t, n }))); } while (order.map(o => o.n).join() === lastOrder && ++tries < 10);
      lastOrder = order.map(o => o.n).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "opt"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            c.done = true; if (window.classFirstTry) window.classFirstTry.right(id);
            save(); fb.textContent = ""; solvedView();
            const s = d.querySelector(".stamp"); if (s) s.classList.add("slam");
            onSolved && onSolved();
          } else {
            c.wrong++; if (window.classFirstTry) window.classFirstTry.wrong(); save();
            b.classList.add("nope"); d.classList.remove("shake"); void d.offsetWidth; d.classList.add("shake");
            locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
            let left = LOCK;
            const tick = () => {
              if (!document.body.contains(fb)) { locked = false; return; }
              fb.textContent = "Not quite. " + C.hint + " Try again in " + left + "…"; fb.className = "msg bad";
              if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + C.hint; draw(); return; }
              setTimeout(tick, 1000);
            };
            tick();
          }
        };
        area.appendChild(b);
      });
    }
    draw();
    return d;
  }

  // ---------------- Title ----------------
  function title() {
    $("hud").hidden = true;
    let pre = st.name;
    if (!pre) { try { pre = (window.classShortName || (x => x))(localStorage.getItem("site-student-name") || ""); } catch (e) {} }
    app.innerHTML = `<section class="card titlecard">
      <div>
        <h1>Break the Grip</h1>
        <p class="hook">India, 1930. Make Britain leave.</p>
        <ul class="how"><li>⛓️ Break Britain's grip</li><li>🃏 Every move costs</li><li>🇺🇸 ☭ Superpowers come calling</li></ul>
        <p class="meta">⏱ 25 min · ⚠️ Real 1947 violence</p>
        <p class="goal">🎯 How do colonies win freedom? At what cost?</p>
        <label for="nameBox">Your name</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(pre)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">✊ Start</button>
      </div>
      <div class="art" aria-hidden="true">
        <div class="bigchain">${Array.from({ length: 7 }, (x, i) => `<span class="link ${i === 3 ? "broken" : ""}"></span>`).join("")}<span class="crack">💥</span></div>
        <div class="flagband"></div>
        ${say("", "👑", "brit", "India is ours.")}
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Step 1 · 1930: the salt law (decision 1) ----------------
  const SALT = [
    { k: "salt", ic: "🧂", t: "Salt March", d: "Break the salt law. Peacefully.", fx: [["⛓️ −1", "good"], ["✊ +3", "good"], ["🌍 +1", "good"], ["🚔 Arrests: ✊ −2 next turn", "bad"]],
      eff: { grip: -1, people: 3, world: 1 }, later: { people: -2 }, ltag: "🚔 Gandhi + 60,000 jailed: ✊ −2",
      stamp: "LAW BROKEN", brit: "Arrest them all!",
      res: "Thousands make salt. Britain jails about 60,000 people.", src: "Real: Gandhi's Salt March, March–April 1930, about 240 miles to Dandi. Gandhi was arrested May 5; some 60,000 were in jail by year's end. Source: Britannica; class slides." },
    { k: "cloth", ic: "🧵", t: "Boycott British cloth", d: "Stop buying it. Spin your own.", fx: [["⛓️ −1", "good"], ["✊ +2", "good"], ["💸 Lost pay: ✊ −1 next turn", "bad"]],
      eff: { grip: -1, people: 2 }, later: { people: -1 }, ltag: "💸 Shops lose money: ✊ −1",
      stamp: "BOYCOTT", brit: "Our mills are losing money!",
      res: "British mills lose buyers. Indian shops lose money too.", src: "Real: the 1930 boycott cut British cloth imports sharply. Indian cloth sellers reported “considerable loss” (Nehru, Oct. 1930)." },
    { k: "raid", ic: "🔥", t: "Raid a police post", d: "Fight back with force.", fx: [["⛓️ +1", "bad"], ["🌍 −1", "bad"], ["💔 +2", "bad"]],
      eff: { grip: 1, world: -1, cost: 2, armed: 1 }, bad: true, stamp: "CRACKDOWN", brit: "Send in the troops!",
      res: "Troops crush the raid. People get hurt on both sides.", src: "Real: in 1922 Gandhi called off a whole campaign after a crowd killed 22 police at Chauri Chaura." },
    { k: "letter", ic: "✉️", t: "Petition Britain", d: "Ask politely for change.", fx: [["⛓️ 0", ""], ["⏳ Slow", "bad"]],
      eff: {}, bad: true, stamp: "IGNORED", brit: "We'll think about it.",
      res: "Your letter sits on a desk. Nothing changes.", src: "Indian leaders had asked Britain politely for decades." }
  ];
  function s1() {
    const box = card();
    box.innerHTML = banner("1930", "Gujarat, India", "🧂🌊", "sea");
    round(box, "salt", SALT,
      `<div class="notice"><div class="nh">BRITISH LAW</div><div class="nb">Indians may NOT make salt.</div><div>Buy British salt. Pay the tax.</div></div>` +
      say("Britain", "👑", "brit", "Salt is ours.") + `<p class="lead">Pick your first move.</p>`,
      () => {
        box.insertAdjacentHTML("beforeend", reveal("Civil disobedience", "breaking an unfair law peacefully, then accepting arrest."));
        nextBtn(box, "🚶 March on the salt works →");
      });
  }

  // ---------------- Step 2 · May 1930: Dharasana (decision 2, then check 1) ----------------
  const LINE = [
    { k: "hold", ic: "🕊️", t: "Don't hit back", d: "Take the blows. Stay calm.", fx: [["🌍 +3", "good"], ["⛓️ −2", "good"], ["🤕 Injuries", "bad"]],
      eff: { world: 3, grip: -2, cost: 1 }, stamp: "HELD THE LINE", brit: "Why won't they fight back?",
      res: "Row after row falls. A U.S. reporter is watching." },
    { k: "fight", ic: "👊", t: "Hit back", d: "Defend yourselves.", fx: [["⛓️ +1", "bad"], ["🌍 −2", "bad"], ["💔 +2", "bad"]],
      eff: { grip: 1, world: -2, cost: 2, armed: 1 }, bad: true, stamp: "RIOT", brit: "See? They're violent!",
      res: "Britain calls it a riot. Many believe it." },
    { k: "back", ic: "🏃", t: "Turn back", d: "Stay safe today.", fx: [["✊ −1", "bad"], ["⛓️ 0", ""]],
      eff: { people: -1 }, bad: true, stamp: "TURNED BACK", brit: "Good. Go home.",
      res: "You're safe. Some marchers feel let down." }
  ];
  function s2() {
    const box = card();
    if (!st.sub) {
      box.innerHTML = banner("May 1930", "Dharasana salt works", "🏭🧂") + owedHtml();
      round(box, "line", LINE,
        `<div class="stage" aria-hidden="true"><div><div class="side">🧍🏽🧍🏽‍♀️🧍🏽🧍🏽‍♂️🧍🏽‍♀️</div><small>YOUR LINE</small></div><div class="gate">🚧</div><div><div class="side">👮👮👮👮</div><small>POLICE WITH CLUBS</small></div></div>` +
        say("Britain", "👑", "brit", "Stop them at the gate.") + `<p class="lead">Your line walks forward.</p>`,
        () => subBtn(box, "📰 See the news →"));
      return;
    }
    checkBox(box, "dPress", `${real}<div class="news"><div class="mast"><span>United Press</span><span>1930</span></div>
        <p class="hl">“Not one of the marchers even raised an arm to fend off the blows.”</p>
        <p class="by">— Webb Miller, U.S. reporter</p>
        <div class="chips"><span class="chip">📰 1,350 papers</span><span class="chip">🤕 320 hurt</span></div></div>
      ${src("Source: Webb Miller, United Press, May 21, 1930, Dharasana. He counted 320 injured and 2 dead; his story ran in 1,350 newspapers.")}`, "📰 The news", () => nb());
    function nb() { scrollToEl(nextBtn(box, "🌍 1939: A world war →")); }
    if (chk("dPress").done) nextBtn(box, "🌍 1939: A world war →");
  }

  // ---------------- Step 3 · 1939–42: World War II (decision 3) ----------------
  function warList() {
    const strong = st.picks.war != null ? !!st.warStrong : st.people >= STRONG;
    return [
      { k: "quit", ic: "🚪", t: "Quit India!", d: "Protest now, mid-war.", fx: [strong ? ["⛓️ −2 (✊ 3+)", "good"] : ["⛓️ 0 (needs ✊ 3+)", "bad"], ["🚔 Leaders jailed", "bad"], ["💔 +1", "bad"]],
        eff: { grip: strong ? -2 : 0, cost: 1 }, stamp: strong ? "JAILED" : "CRUSHED", bad: !strong, brit: "Lock them up!",
        res: strong ? "Your big movement shakes Britain. Gandhi and Nehru go to jail." : "Too few join you. Britain crushes it in weeks.",
        src: "Real: Quit India, August 1942. Over 100,000 arrested; most leaders jailed until 1945. Britain counted about 1,000 killed." },
      { k: "serve", ic: "🪖", t: "Fight, then demand", d: "Serve now. Freedom later.", fx: [["⛓️ −1", "good"], ["🌍 +1", "good"], ["💔 +1", "bad"]],
        eff: { grip: -1, world: 1, cost: 1 }, stamp: "ENLISTED", brit: "Splendid. We need soldiers.",
        res: "Indians fight in Africa, Italy, and Burma. They expect freedom in return.",
        src: "Real: Indian troops fought for Britain around the world in WWII." },
      { k: "wreck", ic: "💣", t: "Wreck the railways", d: "Slow down Britain's war.", fx: [["⛓️ +1", "bad"], ["🌍 −1", "bad"], ["💔 +2", "bad"]],
        eff: { grip: 1, world: -1, cost: 2, armed: 1 }, bad: true, stamp: "CRACKDOWN", brit: "Traitors! Crush them.",
        res: "Troops crush the attacks. Britain calls you wartime enemies.",
        src: "Real: some 1942 protesters cut rail and phone lines. Britain struck back hard." }
    ];
  }
  function s3() {
    const box = card();
    box.innerHTML = banner("1939–1942", "World War II", "✈️💥", "gray");
    if (st.picks.war == null) st.warStrong = st.people >= STRONG;
    round(box, "war", warList(),
      say("Britain", "👑", "brit", "India is at war. We decided for you.") + `<p class="lead">Nobody asked Indian leaders.</p>` +
      src("Real: Britain's Viceroy (its top ruler in India) declared India at war in September 1939."),
      () => nextBtn(box, "🕰️ 1945: The war ends →"));
  }

  // ---------------- Step 4 · 1945: WWII drains Britain (check 2, then the drain) ----------------
  function s4() {
    const box = card();
    if (!st.sub) {
      box.innerHTML = say("Britain", "😓", "brit", "We won… but we're broke.");
      checkBox(box, "dWar", `${real}<div class="ledger">
          <div class="lrow"><span>🪖 Indian Army 1939</span><div class="ltrack"><span style="width:8%"></span><em>200,000</em></div></div>
          <div class="lrow"><span>🪖 Indian Army 1945</span><div class="ltrack"><span style="width:100%"></span><em>2.5 million</em></div></div>
          <div class="lchips"><span>💷 Deep in debt</span><span class="blue">🗳️ 1945: new leaders agree to go</span></div></div>
        ${src("Indian Army: just under 200,000 (1939) to over 2.5 million (1945). Britain's new Labour government (July 1945) moved toward independence. Sources: class slides; Findmypast; Britannica.")}`, "📒 Britain's books, 1945", () => nb());
      function nb() { scrollToEl(subBtn(box, "💥 What the war did →")); }
      if (chk("dWar").done) subBtn(box, "💥 What the war did →");
      return;
    }
    if (!st.drained) { drain(); hud(); }
    const d = st.drained || {};
    const going = st.grip <= LEAVE_AT;
    box.innerHTML = banner("1945", "London", "🇬🇧📉", "gray") +
      `<div class="drain" id="drainBox"><span>💥 War drain:</span><span class="big">⛓️ −3</span>
      ${d.bonus ? `<span>🌍 World watching 4+: <span class="big">⛓️ −1</span></span>` : `<span>🌍 World watching under 4: no bonus</span>`}</div>
      <div class="chips"><span class="chip">🇺🇸 ☭ Both superpowers oppose empires</span><span class="chip">🇺🇳 New UN: peoples should rule themselves</span></div>
      ${src("Real: the UN Charter (1945), Article 1, backs “self-determination of peoples.” The U.S. and USSR both criticized European empires.")}
      <div class="result" id="res_go"><span class="stamp slam ${going ? "" : "red"}">${going ? "LEAVING" : "STALLING"}</span>
      ${going ? say("Britain", "🧳", "brit", "We can't hold India. We're leaving.") : say("Britain", "😏", "brit", "No one is pushing us out.", true) + `<p>In your game: grip had to be 4 or less.</p>`}</div>`;
    nextBtn(box, "🗺️ August 1947 →");
  }
  function drain() {
    if (st.drained) return;
    const bonus = st.world >= 4;
    st.grip = clamp(st.grip - 3 - (bonus ? 1 : 0), 0, 10);
    st.gripAt45 = st.grip;
    st.drained = { bonus };
    st.left = st.grip <= LEAVE_AT;
    st.mad = false; save();
  }

  // ---------------- Step 5 · Aug 1947: Partition (story, check 3, decision 4) ----------------
  const PARTITION_SVG = `<svg viewBox="0 0 320 300" role="img" aria-label="Simplified map of the 1947 Partition: India in the middle, West Pakistan to the northwest, East Pakistan to the east, with India between the two parts of Pakistan. Kashmir in the far north is disputed.">
    <path d="M40,60 L80,30 L120,14 L150,38 L192,70 L240,84 L272,88 L292,112 L280,150 L262,146 L242,148 L222,168 L196,212 L168,254 L146,292 L126,250 L110,204 L100,170 L84,160 L62,150 L36,140 L18,110 Z" fill="#ffcf96" stroke="#1d2433" stroke-width="3"/>
    <path d="M40,60 L80,30 L100,44 L112,72 L102,100 L90,126 L72,148 L62,150 L36,140 L18,110 Z" fill="#7cc79a" stroke="#1d2433" stroke-width="3"/>
    <path d="M80,30 L120,14 L150,38 L128,52 L112,72 L100,44 Z" fill="#c9c9c9" stroke="#1d2433" stroke-width="2"/>
    <text x="150" y="20" font-size="10" font-weight="800" fill="#444">Kashmir: disputed</text>
    <path d="M238,98 L268,96 L284,118 L276,146 L262,146 L246,140 L240,120 Z" fill="#7cc79a" stroke="#1d2433" stroke-width="3"/>
    <path d="M112,72 L102,100 L90,126 L72,148 M238,98 L240,120 L246,140 L262,146" fill="none" stroke="#c42a2a" stroke-width="3" stroke-dasharray="6 4"/>
    <text x="165" y="150" text-anchor="middle" font-weight="900" font-size="20" fill="#1d2433">INDIA</text>
    <text x="165" y="168" text-anchor="middle" font-size="12" font-weight="700" fill="#1d2433">mostly Hindu</text>
    <text x="62" y="92" text-anchor="middle" font-weight="900" font-size="13" fill="#0b4d29">PAKISTAN</text>
    <text x="62" y="106" text-anchor="middle" font-size="10" font-weight="700" fill="#0b4d29">mostly Muslim</text>
    <text x="262" y="200" text-anchor="middle" font-weight="900" font-size="13" fill="#0b4d29">PAKISTAN</text>
    <text x="262" y="213" text-anchor="middle" font-size="10" font-weight="700" fill="#0b4d29">mostly Muslim</text>
    <path d="M262,188 L262,150" stroke="#0b4d29" stroke-width="2"/>
    <text x="128" y="88" font-size="18">⇄</text><text x="222" y="120" font-size="18">⇄</text>
    <text x="210" y="285" text-anchor="middle" font-size="11" font-weight="800" fill="#c42a2a">- - - new border</text>
  </svg>`;
  const HELP = [
    { k: "train", ic: "🚂", t: "Ride a refugee train", d: "Help families cross.",
      res: "You ride to the border. Every station is tense.", realLine: "Real: refugee trains were attacked by mobs on both sides." },
    { k: "hide", ic: "🏠", t: "Hide your neighbors", d: "Shelter a family of another faith.",
      res: "You hide them until it's safe to leave.", realLine: "Real: many families were saved by neighbors of another faith." },
    { k: "camp", ic: "⛺", t: "Work in a camp", d: "Food, water, lost families.",
      res: "Thousands arrive with nothing. You hand out food.", realLine: "Real: huge camps rose in Delhi and Lahore. Food and water ran short." }
  ];
  function s5() {
    const box = card();
    const leftNow = st.left || st.armed >= 2;
    if (leftNow && st.grip > 0) { st.grip = 0; save(); hud(); }
    if (!st.sub) {
      box.innerHTML = banner("August 1947", "Punjab and Bengal", "🗺️✂️", "green") +
        (st.left ? say("Britain", "🧳", "brit", "We leave August 15. We'll split the colony first.") :
          st.armed >= 2 ? say("Britain", "🧳", "brit", "After years of fighting, we're leaving.") :
            say("Britain", "😏", "brit", "In your game, we stay. Here's what really happened.", true)) +
        `<p class="lead">Many Muslims feared rule by a Hindu majority. Britain split the colony in two.</p>`;
      subBtn(box, "🗺️ See the new map →");
      return;
    }
    if (st.sub === 1) {
      checkBox(box, "dMap", `${real}<div class="mapwrap">${PARTITION_SVG}</div>
        <div class="chips"><span class="chip">✏️ Drawn in 5 weeks</span><span class="chip">🇬🇧 By a Briton who'd never been there</span></div>
        ${src("Simplified map. Pakistan independent Aug. 14, India Aug. 15, 1947. Border drawn by British lawyer Cyril Radcliffe. Kashmir is still claimed by both countries. Sources: class slides; British Online Archives.")}`, "🗺️ The new map", () => nb());
      function nb() { scrollToEl(subBtn(box, "🚶 The cost →")); }
      if (chk("dMap").done) subBtn(box, "🚶 The cost →");
      return;
    }
    box.innerHTML = `<p class="toll" id="toll">🚶 14–15 million forced from home · 💔 about 1 million killed</p>
      ${src("Real. Estimates vary: 12–20 million moved; 200,000 to 2 million killed. Most historians accept about 1 million. Hindus, Muslims, and Sikhs were victims on both sides. Sources: Talbot & Singh, The Partition of India (2009); class slides.")}`;
    const picked = st.picks.help;
    if (picked == null) box.insertAdjacentHTML("beforeend", `<p class="lead">Your town is on the new border. Families flee both ways. Where do you help?</p>`);
    cards(box, HELP, picked, k => { st.picks.help = k; save(); render(); scrollToEl($("res_help")); }, "help");
    if (picked == null) return;
    const h = HELP.find(x => x.k === picked);
    box.insertAdjacentHTML("beforeend", `<div class="result" id="res_help"><p>${h.res}</p>${src(h.realLine)}</div>`);
    nextBtn(box, "🇺🇸 ☭ The 1950s →");
  }

  // ---------------- Step 6 · 1950s: the superpowers come calling (decision 5, then check 4) ----------------
  const BLOC = [
    { k: "us", ic: "🇺🇸", t: "Join the U.S. side", d: "Big aid. U.S. rules.", fx: [["💰 +3 aid", "good"], ["☭ arms your rival", "bad"]],
      stamp: "U.S. SIDE", bad: true, res: "Dollars pour in. The Soviets arm your rival next door.", src: "Real: neighboring Pakistan joined U.S.-led alliances in 1954–1955." },
    { k: "su", ic: "☭", t: "Join the Soviet side", d: "Factories. Soviet rules.", fx: [["🏭 +3 factories", "good"], ["🇺🇸 cuts aid", "bad"]],
      stamp: "SOVIET SIDE", bad: true, res: "A steel mill goes up. The U.S. arms your rival instead." },
    { k: "none", ic: "⚖️", t: "Join neither", d: "Take help from both.", fx: [["💰 +1 🏭 +1", "good"], ["😤 Both push you", "bad"]],
      stamp: "NEITHER SIDE", res: "Soviets build a steel mill. The U.S. sends food. Both keep pushing.", src: "Real: the USSR helped build India's Bhilai steel plant; the U.S. sent food aid. Source: CSEP." }
  ];
  function s6() {
    const box = card();
    if (!st.sub) {
      box.innerHTML = banner("1950s", "New Delhi", "🇺🇸🤝☭", "cold");
      const picked = st.picks.bloc;
      if (picked == null) box.insertAdjacentHTML("beforeend", `<p class="lead">You're free, and poor. Both superpowers want you.</p>
        <div class="envoys">${say("United States", "🇺🇸", "us", "Join us. We'll send food and dollars.")}${say("Soviet Union", "☭", "su", "Join us. We'll build you a steel mill.")}</div>`);
      cards(box, BLOC, picked, k => { st.picks.bloc = k; save(); render(); scrollToEl($("res_bloc")); }, "bloc");
      if (picked == null) return;
      const b = BLOC.find(x => x.k === picked);
      box.insertAdjacentHTML("beforeend", `<div class="result" id="res_bloc"><span class="stamp slam ${b.bad ? "red" : ""}">${b.stamp}</span><p>${b.res}</p>${b.src ? src(b.src) : ""}</div>`);
      subBtn(box, "📻 What India really did →");
      return;
    }
    checkBox(box, "dNehru", `${real}<div class="quote">“We propose, as far as possible, to keep away from the power politics of groups aligned against one another.”<span class="by">— Nehru, India's leader</span></div><p class="gloss">💬 = Stay out of rivals' fights.</p>
      ${src("Jawaharlal Nehru, radio broadcast, Sept. 7, 1946. India later helped found the Non-Aligned Movement (1961).")}`, "📻 Radio, 1946", () => nb());
    function nb() { scrollToEl(nextBtn(box, "🌍 Other colonies →")); }
    if (chk("dNehru").done) nextBtn(box, "🌍 Other colonies →");
  }

  // ---------------- Step 7 · World map: other paths (open 3 files, then check 5) ----------------
  const FILES = {
    ghana: { name: "Ghana", flag: "🇬🇭", free: "1957", dot: 12, lines: ["✊ Strikes and boycotts", "🗳️ Leader jailed, then elected", "⭐ Sparked Africa's freedom wave"],
      src: "Kwame Nkrumah's Positive Action campaign (1950); jailed, then his party won the 1951 vote. Free March 6, 1957: first Black African country south of the Sahara to win independence (Britannica)." },
    kenya: { name: "Kenya", flag: "🇰🇪", free: "1963", dot: 82, lines: ["🔥 Mau Mau armed revolt", "⛓️ About 160,000 held in British camps"],
      src: "1950s revolt; free Dec. 12, 1963. Camp estimate: Kenya Human Rights Commission. In 2013 Britain paid £19.9 million to 5,228 victims (VOA News)." },
    algeria: { name: "Algeria", flag: "🇩🇿", free: "1962", dot: 94, lines: ["🔥 8-year war with France", "💔 400,000 to 1.5 million Algerians died"],
      src: "War 1954–1962; free July 5, 1962. Death estimates vary widely by source." }
  };
  const INDIA_FILE = { name: "India", flag: "🇮🇳", free: "1947", dot: 18, lines: ["🕊️ Salt March, boycotts, Quit India"], cls: "home" };
  const PINS = { ghana: [100, 128], kenya: [226, 162], algeria: [110, 58] };
  function fileHtml(f, k, compact) {
    return `<div class="file ${f.cls || ""}" id="file_${k}"><div class="fh"><span>${f.flag} ${f.name}</span><span class="free">Free ${f.free}</span></div>
      ${(compact ? f.lines.slice(0, 1) : f.lines).map(l => `<p>${l}</p>`).join("")}
      <div class="path" aria-label="Path: ${f.dot < 50 ? "mostly peaceful" : "armed war"}"><span>🕊️</span><div class="ptrack"><i style="left:${f.dot}%"></i></div><span>🔥</span></div>${!compact && f.src ? src(f.src) : ""}</div>`;
  }
  function s7() {
    const box = card();
    const keys = Object.keys(FILES), seen = k => !!st.files[k];
    if (!st.sub) {
      const pinSvg = keys.map(k => { const [x, y] = PINS[k]; return `<g class="pin" tabindex="0" role="button" aria-label="Open ${FILES[k].name} file" data-k="${k}">
        <circle class="ring" cx="${x}" cy="${y}" r="15" fill="none" stroke="${seen(k) ? "#138a4a" : "#c42a2a"}" stroke-width="3"/>
        <circle class="dot" cx="${x}" cy="${y}" r="10" fill="${seen(k) ? "#138a4a" : "#c42a2a"}"/>
        <text x="${x}" y="${y - 20}" text-anchor="middle" font-weight="900" font-size="13" fill="#1d2433">${FILES[k].name}${seen(k) ? " ✓" : ""}</text></g>`; }).join("");
      const last = st.lastFile && seen(st.lastFile) ? st.lastFile : null;
      box.innerHTML = banner("1945–1963", "Africa and Asia", "🌍🗺️", "green") +
        `<p class="lead">After 1945, colony after colony broke free. Tap each pin.</p>
        <div class="mapwrap world"><svg viewBox="0 0 420 300" role="img" aria-label="Simplified map of Africa and India with pins for Algeria, Ghana, Kenya, and India.">
          <path d="M62,42 L140,26 L200,34 L218,70 L252,108 L236,140 L222,186 L206,236 L180,272 L156,270 L140,222 L128,174 L112,146 L72,134 L42,112 L36,76 Z" fill="#f3dfb2" stroke="#1d2433" stroke-width="3"/>
          <path d="M320,70 L350,60 L385,80 L392,96 L372,104 L360,128 L348,150 L338,124 L328,100 L312,92 Z" fill="#ffcf96" stroke="#1d2433" stroke-width="3"/>
          <circle cx="350" cy="96" r="10" fill="#138a4a"/><text x="350" y="76" text-anchor="middle" font-weight="900" font-size="13" fill="#1d2433">India ✓</text>
          ${pinSvg}</svg></div>
        <div class="pinbtns">${keys.map(k => `<button type="button" class="pinbtn ${seen(k) ? "seen" : ""}" data-k="${k}">${FILES[k].flag} ${FILES[k].name}${seen(k) ? " ✓" : ""}</button>`).join("")}</div>
        ${src("Simplified map, not to scale.")}
        <div class="files">${last ? fileHtml(FILES[last], last) : fileHtml(INDIA_FILE, "india")}</div>`;
      const open = k => { st.files[k] = true; st.lastFile = k; save(); render(); scrollToEl($("file_" + k)); };
      box.querySelectorAll(".pin").forEach(p => { p.addEventListener("click", () => open(p.dataset.k)); p.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(p.dataset.k); } }); });
      box.querySelectorAll(".pinbtn").forEach(b => b.onclick = () => open(b.dataset.k));
      if (!keys.every(seen)) { box.insertAdjacentHTML("beforeend", `<p class="msg" id="lockMsg">🔒 Files opened: ${keys.filter(seen).length} of 3</p>`); return; }
      subBtn(box, "🗂️ Compare the files →");
      return;
    }
    checkBox(box, "dPaths", `<div class="files">${fileHtml(INDIA_FILE, "india", true)}${keys.map(k => fileHtml(FILES[k], k, true)).join("")}</div>`, "🗂️ Compare the files", () => nb());
    function nb() { scrollToEl(nextBtn(box, "🏁 See how your story ends →")); }
    if (chk("dPaths").done) nextBtn(box, "🏁 See how your story ends →");
  }

  // ---------------- Step 8 · Ending ----------------
  const ENDINGS = {
    fire: { icon: "🔥", t: "Freedom by Fire", line: "Force brought crackdowns and a heavy human cost. That's closer to Algeria's and Kenya's paths than India's." },
    delayed: { icon: "⏳", t: "Freedom Delayed", line: "Britain was broke, but the world wasn't watching. In your game, Britain drags it out for years." },
    pulled: { icon: "🔗", t: "Free, but Pulled In", line: "You broke the grip peacefully. Then you picked a Cold War side, and its rival armed your neighbor." },
    midnight: { icon: "🕊️", t: "Midnight Freedom", line: "Millions of marchers and a broke Britain ended the grip. Then you joined neither side, just like India." }
  };
  const endingId = () => st.armed >= 2 ? "fire" : !st.left ? "delayed" : st.picks.bloc !== "none" ? "pulled" : "midnight";
  function causedBy() {
    const p = st.picks;
    return [
      { salt: "Salt March: mass arrests", cloth: "Boycott: shops lost money", raid: "Raided a police post", letter: "Only wrote a letter" }[p.salt],
      { hold: "Didn't hit back at Dharasana", fight: "Hit back at Dharasana", back: "Turned back at Dharasana" }[p.line],
      { quit: st.warStrong === false ? "Quit India: crushed, leaders jailed" : "Quit India: leaders jailed", serve: "Fought for Britain in WWII", wreck: "Wrecked railways in wartime" }[p.war],
      "WWII left Britain broke" + (st.drained && st.drained.bonus ? "; world watching" : ""),
      { us: "Joined the U.S. side", su: "Joined the Soviet side", none: "Joined neither Cold War side" }[p.bloc]
    ];
  }
  function s8() {
    const box = card(), id = endingId(), E = ENDINGS[id];
    box.classList.add("ending");
    box.innerHTML = `<div class="e-icon" aria-hidden="true">${E.icon}</div><h2>${E.t}</h2>
      <p class="eline">${E.line}</p>
      <div class="chips endchips"><span class="chip">✊ People ${st.people}/10</span><span class="chip">🌍 World ${st.world}/10</span><span class="chip">💔 Cost ${st.cost}</span></div>
      <p class="toll">🇮🇳 Real India: free Aug. 15, 1947 · 14–15 million forced from home</p>
      <div class="caused"><p class="ch">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>`;
    nextBtn(box, "📻 Give your radio speech →");
  }

  // ---------------- Step 9 · Writing + turn in ----------------
  const PROMPTS = [
    { id: "cause", short: "Biggest reason India won independence", label: "🎙️ Biggest cause: WWII, protests, or Cold War?",
      stem: "The biggest reason was ___ because ___.", min: 60, newWords: 5,
      mustAll: [["because", "since", "so ", "due to"], ["war", "wwii", "ww2", "broke", "debt", "soldier", "army", "salt", "march", "gandhi", "protest", "nonviolen", "boycott", "civil disobedience", "quit india", "cold war", "superpower", "united nations", "u.n", "world", "newspaper", "pressure", "weak", "dharasana"]],
      mustMsg: "In answer 1, pick a cause (like WWII or the Salt March) and use “because” with a fact from today." },
    { id: "cost", short: "What freedom cost (Partition)", label: "🎙️ What did freedom cost? Use a Partition fact.",
      stem: "Freedom also cost ___. For example, ___.", min: 50, newWords: 5,
      mustAll: [["partition", "refugee", "million", "border", "pakistan", "fled", "flee", "home", "killed", "died", "violence", "train", "split", "migrat", "forced", "camp", "lost"]],
      mustMsg: "In answer 2, use a real fact about Partition (like the 14–15 million forced from home, or the new border)." }
  ];
  function s9() {
    const box = card(), E = ENDINGS[endingId()];
    box.innerHTML = `<div class="radio" id="report"><div class="onair"><span class="tag">🔴 ON AIR · Aug. 15, 1947</span><span class="chip">${E.icon} <span>${E.t}</span></span></div>
      <details class="factbox"><summary>📌 Facts</summary><p class="chips facts"><span class="chip">🧂 Salt March</span><span class="chip">📰 Dharasana news</span><span class="chip">🪖 2.5 million soldiers</span><span class="chip">💷 Britain deep in debt</span><span class="chip">🇺🇸 ☭ Both oppose empires</span><span class="chip">🚶 14–15 million forced from home</span></p></details></div>`;
    const rep = $("report");
    PROMPTS.forEach(p => rep.insertAdjacentHTML("beforeend", `<label for="w_${p.id}">${p.label}</label><p class="stem">✏️ ${esc(p.stem)}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`));
    rep.insertAdjacentHTML("beforeend", `<button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      <p class="turned" id="turnedBadge" ${st.turnedIn ? "" : "hidden"}>✓ Turned in</p>`);
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg");
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    for (const p of PROMPTS) {
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
      $("sendBtn").textContent = "Turned in ✓"; $("turnedBadge").hidden = false;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  function buildAnswers() {
    const a = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => chk(id).done && !chk(id).wrong).length;
    a["First-try correct"] = right + " of " + CHECK_IDS.length;
    const by = {};
    CHECK_IDS.forEach(id => { const s = CHECKS[id].std; by[s] = by[s] || [0, 0]; by[s][1]++; if (chk(id).done && !chk(id).wrong) by[s][0]++; });
    a["First-try by standard"] = Object.keys(by).sort().map(k => k + ": " + by[k][0] + " of " + by[k][1]).join(" · ");
    CHECK_IDS.forEach(id => { const w = chk(id).wrong; a[CHECKS[id].short] = CHECKS[id].options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    const lbl = (list, k) => { const c = list.find(x => x.k === k); return c ? c.t : ""; };
    a["Choice · 1930 salt law"] = lbl(SALT, st.picks.salt);
    a["Choice · Dharasana line"] = lbl(LINE, st.picks.line);
    a["Choice · WWII"] = lbl(warList(), st.picks.war);
    a["Choice · Partition role"] = lbl(HELP, st.picks.help);
    a["Choice · Cold War side"] = lbl(BLOC, st.picks.bloc);
    a["Ending"] = ENDINGS[endingId()].t;
    a["Caused by"] = causedBy().join(" | ");
    a["Meters at the end"] = "Britain's grip after WWII " + (st.gripAt45 != null ? st.gripAt45 : st.grip) + "/10 · People " + st.people + "/10 · World watching " + st.world + "/10 · Human cost " + st.cost + " · Force used " + st.armed + "x";
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }

  // ---------------- Render ----------------
  const STEPS = [title, s1, s2, s3, s4, s5, s6, s7, s8, s9];
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false; locked = false;
    payOwed(); hud();
    (STEPS[st.step] || title)();
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; prev = null;
    if (window.classFirstTry) window.classFirstTry.reset();
    $("chain").innerHTML = "";
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) {
    const w = $("welcome");
    const t = document.createElement("span"); t.textContent = "Welcome back, " + st.name + " — you're on step " + Math.min(st.step, TOTAL) + " of " + TOTAL + ".";
    // Not this student? One tap erases the saved game on this Chromebook and starts clean.
    const notMe = document.createElement("button"); notMe.type = "button"; notMe.className = "notme"; notMe.id = "notMeBtn";
    notMe.textContent = "Not " + st.name + "? Start fresh";
    notMe.onclick = () => {
      try { localStorage.removeItem(KEY); localStorage.removeItem("site-student-name"); } catch (e) {}
      if (window.classFirstTry) window.classFirstTry.reset();
      st = fresh(); location.reload();
    };
    w.textContent = ""; w.appendChild(t); w.appendChild(document.createTextNode(" ")); w.appendChild(notMe); w.hidden = false;
  }
  render();
})();
