// =====================================================================
//  HOLD THE HOME FRONT  (U.S. History · Unit 2 · Day 4)
//  Run the Novak family's ration book from 1943 to 1945.
//  Core loop: shop with real ration points, make home-front choices that carry forward,
//  and watch the game board: family moods (strain), the town's bond thermometer (war effort),
//  Earl the black-market rival, and the family cash jar.
//  6 evidence checks are part of the world (Mae's question, the poster on the wall, Dorothy's
//  newspaper, the rally, the bond form, Walt's files). Each one unlocks the next part.
//  Word budget (Fynn, 2026-11-03): ≤35 words of reading per screen, short cards, one-line reveals.
//  Turn-in goes through shared/turnin.js (classTurnIn), same payload shape as shared/unit-game.js.
//  Spanish: es.js sets window.HOMEFRONT_ES (keys = the exact English strings below).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u2-d8-common-good-v2";
  const CFG = {
    assignmentId: "ush-u2-d8-common-good",
    title: "U.S. History · Unit 2 · Day 4 · Hold the Home Front",
    standard: "SS.9-12.US.31, SS.9-12.US.33, SS.9-12.US.34",
    oldApi: "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit"
  };
  const TOTAL = 15;          // steps after the title screen
  const LOCK = 5;            // seconds the choices lock after a wrong answer

  // ---------- language helpers ----------
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  function L(s) { if (!isEs()) return s; const d = window.HOMEFRONT_ES || {}; return d[s] != null ? d[s] : s; }
  function F(s, o) { return L(s).replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m)); }
  const $ = id => document.getElementById(id);
  const isT = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };   // Test T. (teacher preview)
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const money = n => "$" + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, "");

  // ---------- state ----------
  function fresh() {
    return { v: 2, name: "", step: 0, phase: 0, m: { strain: 3, effort: 30, bm: 3, cash: 12 }, f: {}, deals: 0,
      picks: {}, pickTitles: {}, wrong: {}, done: {}, cart: [], shops: {}, trail: [], writing: {}, result: null, turnedIn: false };
  }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 2 || !st.m) st = fresh();
  // Shared Chromebooks: if a different student is signed in on the home page now, don't show the last kid's game.
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  st.pickTitles = st.pickTitles || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  function clampM() {
    const m = st.m;
    m.strain = Math.max(0, Math.min(10, m.strain));
    m.effort = Math.max(0, Math.min(100, m.effort));
    m.bm = Math.max(0, Math.min(10, m.bm));
    m.cash = Math.max(0, Math.round(m.cash * 100) / 100);
  }
  let pending = null;   // meter changes to animate after the next render
  function applyFx(fx) {
    ["effort", "strain", "bm", "cash"].forEach(k => { if (fx[k]) st.m[k] += fx[k]; });
    if (fx.deal) st.deals += fx.deal;
    clampM();
    pending = Object.assign({}, fx);
    return fxTags(fx);
  }
  function fxTags(fx) {
    const out = [];
    const sg = n => (n > 0 ? "+" : "−") + Math.abs(n);
    if (fx.effort) out.push(`<span class="tag ${fx.effort > 0 ? "up" : "down"}">🌡️ ${sg(fx.effort)} ${esc(L("war effort"))}</span>`);
    if (fx.strain) out.push(`<span class="tag ${fx.strain > 0 ? "down" : "up"}">🏠 ${sg(fx.strain)} ${esc(L("strain"))}</span>`);
    if (fx.bm) out.push(`<span class="tag ${fx.bm > 0 ? "down" : "up"}">🕶️ ${sg(fx.bm)} ${esc(L("black market"))}</span>`);
    if (fx.cash) out.push(`<span class="tag flat">💵 ${fx.cash > 0 ? "+" : "−"}${money(Math.abs(fx.cash))}</span>`);
    return out.join("");
  }
  function fxText(fx) {
    const sg = n => (n > 0 ? "+" : "−") + Math.abs(n);
    const out = [];
    if (fx.effort) out.push("war effort " + sg(fx.effort));
    if (fx.strain) out.push("strain " + sg(fx.strain));
    if (fx.bm) out.push("black market " + sg(fx.bm));
    if (fx.cash) out.push("savings " + (fx.cash > 0 ? "+" : "−") + money(Math.abs(fx.cash)));
    return out.join(", ");
  }
  function addTrail(label, fx, show) { st.trail.push(Object.assign({ label, fx: Object.assign({}, fx) }, show || {})); }
  const trailText = t => t.k ? F(t.k, t.v) + (t.add || []).map(x => L(x)).join("") : L(t.label);

  // ---------- characters ----------
  const WHO = {
    radio: ["📻", "Radio"], helen: ["👩", "Helen"], joey: ["🧑", "Joey"], mae: ["👧", "Mae"], earl: ["🧔", "Earl"],
    clerk: ["🧑‍💼", "Clerk"], dorothy: ["👩🏾", "Dorothy"], speaker: ["🎙️", "Speaker"], walt: ["👨‍🌾", "Walt"],
    grocer: ["🧑‍🍳", "Grocer"], boss: ["🏭", "Collins Radio"], butcher: ["🔪", "Butcher"]
  };
  const bub = (who, text, cls) => `<div class="bub ${who}${cls ? " " + cls : ""}"><span class="av" aria-hidden="true">${WHO[who][0]}</span><div class="bt"><b>${esc(L(WHO[who][1]))}</b><p>${L(text)}</p></div></div>`;
  const bubbles = list => `<div class="bubbles">${list.map(b => bub(b[0], b[1], b[2])).join("")}</div>`;
  // One short real-history line (or two) with a small gray source.
  const realFile = (lines, src) => `<div class="real">${lines.map((l, i) => `<p>${i === 0 ? `<b class="real-b">📜 ${esc(L("Real"))}</b> ` : ""}${L(l)}</p>`).join("")}${src ? `<p class="src">${esc(L("Source:"))} ${L(src)}</p>` : ""}</div>`;
  const fict = t => `<p class="fict">${esc(L(t))}</p>`;
  const srcLine = t => `<p class="src">${L(t)}</p>`;
  const newWord = html => `<div class="reveal"><span class="nw">💡 ${esc(L("NEW WORD"))}</span><p>${L(html)}</p></div>`;

  // ---------- HUD (game board) ----------
  const DATES = { 1: "MAR 1943", 2: "MAR 1943", 3: "MAR 1943", 4: "APR 1943", 5: "JUN 1943", 6: "JUL 1943", 7: "JUL 1943", 8: "SEP 1943", 9: "SEP 1943", 10: "SEP 1943", 11: "DEC 1943", 12: "JAN 1944", 13: "AUG 1944", 14: "AUG 1945", 15: "AUG 1945" };
  function earlMood() {
    if (st.f.reported) return ["😠", "Earl: shut down"];
    const b = st.m.bm;
    if (b >= 7) return ["😈", "Earl: business booming"];
    if (b >= 4) return ["😏", "Earl: selling more"];
    return ["🙂", "Earl: waiting"];
  }
  function hud() {
    const m = st.m;
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const [mo, yr] = (DATES[st.step] || "AUG 1945").split(" ");
    $("calMo").textContent = L(mo); $("calYr").textContent = yr;
    $("stepText").textContent = F("Step {x} of {y}", { x: Math.min(st.step, TOTAL), y: TOTAL });
    $("stepFill").style.width = Math.round(Math.min(st.step, TOTAL) / TOTAL * 100) + "%";
    const s = m.strain, mood = s <= 3 ? "😊" : s <= 6 ? "😐" : s <= 8 ? "😟" : "😫";
    $("famMood").textContent = mood;
    $("mStrain").style.width = m.strain * 10 + "%"; $("nStrain").textContent = m.strain + "/10";
    $("mEffort").style.width = m.effort + "%"; $("nEffort").textContent = m.effort + "%";
    $("mBm").style.width = m.bm * 10 + "%"; $("nBm").textContent = m.bm + "/10";
    const em = earlMood();
    $("earlFace").textContent = em[0]; $("earlMood").textContent = L(em[1]);
    $("nCash").textContent = money(m.cash);
    document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px");
    $("hudStrain").classList.toggle("warn", m.strain >= 8);
    $("hudBm").classList.toggle("warn", m.bm >= 5 && !st.f.reported);
    $("hudBm").classList.toggle("down", !!st.f.reported);
  }
  // Animated "+8 🌡️" pop-ups on the board after a choice.
  function pops(fx) {
    const map = { effort: ["hudEffort", "🌡️"], strain: ["hudStrain", "🏠"], bm: ["hudBm", "🕶️"], cash: ["hudCash", "💵"] };
    Object.keys(map).forEach(k => {
      const n = fx[k]; if (!n) return;
      const el = $(map[k][0]); if (!el) return;
      const good = k === "effort" || k === "cash" ? n > 0 : n < 0;
      const p = document.createElement("span");
      p.className = "pop " + (good ? "good" : "bad");
      p.textContent = (n > 0 ? "+" : "−") + (k === "cash" ? money(Math.abs(n)) : Math.abs(n)) + " " + map[k][1];
      p.setAttribute("aria-hidden", "true");
      el.appendChild(p);
      el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
      setTimeout(() => p.remove(), 2000);
    });
  }

  // ---------- scene frame ----------
  function scene(o) {
    return `<section class="scene ${o.stage || ""}">
      <div class="sc-top"><h2>${esc(L(o.title))}</h2></div>
      <div class="stage${o.bubbles && o.bubbles.length ? "" : " bare"}"><div class="stage-art" aria-hidden="true">${o.art || ""}</div>${o.bubbles && o.bubbles.length ? bubbles(o.bubbles) : ""}</div>
      <div class="sc-body">${o.body || ""}</div></section>`;
  }
  function nextBtn(label) { return `<button type="button" class="go" id="nextBtn">${esc(L(label || "Next →"))}</button>`; }
  function wireNext(fn) { const b = $("nextBtn"); if (b) b.onclick = fn || advance; }
  function advance() { st.step++; st.phase = 0; st.result = null; st.cart = []; save(); render(); window.scrollTo(0, 0); }
  function toPhase(n) { st.phase = n; save(); render(); window.scrollTo(0, 0); }

  // ---------- evidence checks (in-world) ----------
  const CHECKS = {
    c1: { std: "US.31", short: "Why ration: fair shares", who: "mae", kind: "talk", stamp: "FAIR SHARES",
      prompt: "“Why can't we just buy what we want?”",
      options: ["Rich and poor get equal amounts", "Stores can charge more for meat", "The Army can sell its extra food", "Families stop growing their own food"],
      hint: "Who'd eat if only money counted?" },
    c2: { std: "US.33", short: "Ride-alone poster: propaganda", who: "clerk", kind: "notes", stamp: "STICKER ISSUED",
      prompt: "“Before your gas sticker: why would this poster make you carpool?”",
      options: ["Driving alone feels like helping the enemy", "Driving with friends is more fun", "Police give tickets to solo drivers", "Gas is cheaper when you share"],
      hint: "Look at the see-through passenger." },
    c3: { std: "US.34", short: "Double V: two victories", who: "dorothy", kind: "talk", stamp: "DOUBLE V",
      prompt: "“What do my pin's two V's mean?”",
      options: ["Win overseas AND beat racism at home", "Win in Europe, then the Pacific", "Victory gardens and war bonds", "Wins for the Army and Navy"],
      hint: "“Within” = inside the U.S." },
    c4: { std: "US.34", short: "Sullivans: civic virtue", who: "speaker", kind: "talk", stamp: "CIVIC VIRTUE",
      prompt: "“How did the parents put the country first?”",
      options: ["Kept helping the war after losing their sons", "Got paid to give speeches at plants", "Asked the Navy to send sailors home", "Turned against the war after the sinking"],
      hint: "What did they do next?" },
    c5: { std: "US.31", short: "War bond = loan to the government", who: "clerk", kind: "form", stamp: "APPROVED",
      prompt: "“What are you really doing when you buy this?”",
      options: ["Lending the government money", "Paying the government a new tax", "Buying extra ration points", "Sending money to a soldier"],
      hint: "You get paid back later." },
    c6: { std: "US.31", short: "Farm labor: Braceros and POWs", who: "walt", kind: "notes", stamp: "CREW HIRED",
      prompt: "“Why were braceros and POWs on farms?”",
      options: ["Farms couldn't find enough workers", "Workers wanted to move here for good", "A law made every farm hire them", "The Army paid to keep them busy"],
      hint: "Both files: same problem." }
  };
  const CHECK_ORDER = ["c1", "c2", "c3", "c4", "c5", "c6"];

  let lockTimer = null;
  function mountCheck(id, onDone) {
    const q = CHECKS[id];
    const box = $("checkBox");
    if (!box) return;
    box.innerHTML = `<div class="check ${q.kind}"><p class="qlabel" aria-hidden="true">🔍</p>${bub(q.who, q.prompt, "ask")}<p class="msg" id="qMsg" role="status" aria-live="polite"></p><div class="choices" id="qChoices"></div></div>`;
    const area = $("qChoices"), msg = $("qMsg");
    let locked = false, last = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(q.options.map((t, n) => n));
      if (order.join() === last && order.length > 1) order.push(order.shift());
      last = order.join();
      order.forEach(n => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "choice reply";
        b.innerHTML = `<span class="r-ico" aria-hidden="true">${q.kind === "form" ? "☐" : q.kind === "notes" ? "📝" : "💬"}</span><span class="r-t">${esc(L(q.options[n]))}</span>`;
        b.onclick = () => {
          if (locked) return;
          if (n === 0) {
            st.done[id] = true;
            if (window.classFirstTry) window.classFirstTry.right(id);
            save(); onDone();
          } else {
            st.wrong[id] = (st.wrong[id] || 0) + 1;
            if (window.classFirstTry) window.classFirstTry.wrong();
            save();
            b.classList.add("shake");
            locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
            let left = isT() ? 0 : LOCK;   // Test T. skips the wrong-answer wait
            const tick = () => {
              msg.className = "msg try";
              if (left <= 0) { locked = false; msg.textContent = F("✖ {h}", { h: L(q.hint) }); draw(); return; }
              msg.textContent = F("✖ {h} ⏳ {n}", { h: L(q.hint), n: left });
              left--; lockTimer = setTimeout(tick, 1000);
            };
            tick();
          }
        };
        area.appendChild(b);
      });
    }
    draw();
  }
  let justSolved = null;
  const checkDone = id => `<div class="check done ${CHECKS[id].kind}"><span class="stamp${justSolved === id ? " slam" : ""}">✔ ${esc(L(CHECKS[id].stamp))}</span></div>`;
  const solved = id => () => { justSolved = id; render(true); };

  // ---------- decision cards ----------
  function mountChoices(choices, onPick) {
    const box = $("choiceBox");
    box.innerHTML = `<p class="pick-h">${esc(L("Your move:"))}</p><div class="cards n${choices.length}" id="cChoices"></div>`;
    const area = $("cChoices");
    choices.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "dcard";
      const parts = L(c.sub || "").split(" · ");
      const good = (parts[0] || "").replace(/^(Good for|Bueno para): /, ""), cost = (parts[1] || "").replace(/^(Costs|Cuesta): /, "");
      b.innerHTML = `<span class="d-ico" aria-hidden="true">${c.icon}</span><b class="d-t">${esc(L(c.title))}</b>
        <span class="d-chips"><span class="chip g">👍 ${esc(good)}</span><span class="chip c">💸 ${esc(cost)}</span></span>`;
      b.onclick = () => onPick(i);
      area.appendChild(b);
    });
  }
  function decide(stepId, c) {
    const fx = typeof c.fx === "function" ? c.fx() : c.fx;
    st.picks[stepId] = c.label;
    st.pickTitles[stepId] = c.title;
    const tags = applyFx(fx);
    if (c.flag) Object.assign(st.f, c.flag);
    addTrail(c.trail || c.label, fx);
    st.result = { tags, text: c.result, reveal: c.reveal, who: c.who, icon: c.icon };
    st.phase = 9; save(); render(); window.scrollTo(0, 0);
  }
  // Result card: stamp (what you chose) + meter tags + one line + one-line concept.
  function resultHtml(r, stepId) {
    if (!r) return "";
    const stampText = stepId && st.pickTitles[stepId] ? L(st.pickTitles[stepId]) : r.stamp ? F(r.stamp, r.stampV) : "";
    const stamp = stampText ? `<span class="stamp pick slam">✔ ${esc(stampText)}</span>` : "";
    const text = Array.isArray(r.text) ? r.text : [r.text];
    const body = r.who ? bub(r.who, text[0]) : `<div class="lines">${text.map(t => `<p>${L(t)}</p>`).join("")}</div>`;
    const rev = r.reveal ? newWord(r.reveal) : "";
    return `<div class="result flip" id="resultBox">${r.icon ? `<div class="r-big" aria-hidden="true">${r.icon}</div>` : ""}<div class="r-main">${stamp}<div class="tags">${r.tags || ""}</div>${body}${rev}</div></div>`;
  }
  // A decision step, one short screen at a time:
  //   intro (optional) → evidence + check (optional) → choice cards → result.
  function decisionStep(app, o) {
    const base = { title: o.title, stage: o.stage, art: o.art };
    if (o.intro && st.phase === 0) {
      app.innerHTML = scene(Object.assign({}, base, { bubbles: o.intro.say, body: (o.intro.body || "") + nextBtn(o.intro.next) }));
      return wireNext(() => toPhase(1));
    }
    if (st.phase === 9) {
      app.innerHTML = scene(Object.assign({}, base, { body: resultHtml(st.result, o.id) + nextBtn(o.nextLabel) }));
      return wireNext();
    }
    if (o.check && !st.done[o.check]) {
      app.innerHTML = scene(Object.assign({}, base, { bubbles: o.checkSay, body: (o.evidence || "") + `<div id="checkBox"></div>` }));
      return mountCheck(o.check, solved(o.check));
    }
    app.innerHTML = scene(Object.assign({}, base, { bubbles: o.say, body: (o.check ? checkDone(o.check) : "") + (o.body || "") + `<div id="choiceBox"></div>` }));
    const ch = o.choices();
    mountChoices(ch, i => decide(o.id, ch[i]));
  }

  // =====================================================================
  //  SHOPPING
  // =====================================================================
  const RED_WEEK = 48;   // 16 red points per person per week × 3 people at home
  const BLUE_WEEK = 36;  // 48 blue points per person per month × 3 people ÷ 4 weeks
  function stock(week) {
    const sold = st.m.bm >= 5, eggsGone = st.m.bm >= 8;
    const p = { roast: [24, 27, 27], burger: [14, 16, 16], chops: [14, 14, 16] };
    const w = week - 1;
    const list = [
      { id: "roast", e: "🥩", name: "Pot roast", red: p.roast[w], d: 2, c: 2 },
      { id: "burger", e: "🍔", name: "Hamburger", red: p.burger[w], d: 2, c: 2 },
      { id: "chops", e: "🍖", name: "Pork chops", red: p.chops[w], d: 1, c: 2 },
      { id: "cheese", e: "🧀", name: "Mac and cheese", red: 8, d: 1, c: 2 },
      { id: "salmon", e: "🐟", name: "Canned salmon", red: 8, d: 1, c: 1 },
      { id: "liver", e: "🥘", name: "Beef liver", red: 12, d: 1, c: 0 },
      { id: "spag", e: "🍝", name: "Canned spaghetti", blue: 16, d: 1, c: 2 },
      { id: "soup", e: "🥫", name: "Canned soup", blue: 12, d: 1, c: 1 },
      { id: "beans", e: "🫘", name: "Dried beans", blue: 8, d: 2, c: 0 },
      { id: "chicken", e: "🍗", name: "Whole chicken", d: 2, c: 2, out: sold },
      { id: "eggs", e: "🥚", name: "Eggs", d: 1, c: 1, out: eggsGone },
      { id: "butter", e: "🧈", name: "Butter", red: 8, fat: true },
      { id: "lard", e: "🫙", name: "Lard", red: 5, fat: true }
    ];
    if (week === 2 && st.f.garden) list.push({ id: "garden", e: "🥕", name: "Garden vegetables", d: 2, c: 1, note: "From your garden" });
    if (week === 3 && st.f.garden) list.push({ id: "jars", e: "🍅", name: "Home-canned jars", d: 2, c: 1, note: "From your garden" });
    if (week >= 2 && !st.f.reported) list.push({ id: "earl", e: "🕶️", name: "Earl's steaks", d: 2, c: 2, cash: 3, black: true, note: "Black market" });
    return list;
  }
  function weekRed(week) { return RED_WEEK + (week === 3 && st.f.fatSaved ? 4 : 0); }
  function cartTotals(week) {
    const items = stock(week).filter(i => st.cart.includes(i.id));
    const t = { red: 0, blue: 0, cash: 0, d: 0, happy: 0, fat: false, earl: false, items };
    items.forEach(i => { t.red += i.red || 0; t.blue += i.blue || 0; t.cash += i.cash || 0; t.d += i.d || 0; if (i.c === 2) t.happy += i.d; if (i.fat) t.fat = true; if (i.black) t.earl = true; });
    return t;
  }
  const SHOP_INFO = {
    1: { title: "Shopping: Week 1", say: [["helen", "I need 7 dinners and 1 cooking fat."]] },
    2: { title: "Shopping: Week 2", say: [["grocer", "Beef costs more points now. Supplies ran low."]] },
    3: { title: "Shopping: Week 3", say: [["grocer", "Meat went up again."]] }
  };
  function renderShop(week, app) {
    const info = SHOP_INFO[week];
    const T = cartTotals(week), R = weekRed(week);
    const redLeft = R - T.red, blueLeft = BLUE_WEEK - T.blue, cashLeft = st.m.cash - T.cash;
    const fills = [];
    T.items.forEach(i => { for (let k = 0; k < (i.d || 0); k++) fills.push(i.e); });
    const plates = [];
    for (let k = 0; k < Math.max(7, Math.min(fills.length, 9)); k++) plates.push(`<span class="plate${k >= 7 ? " extra" : ""}${fills[k] ? " full" : ""}"><i>${fills[k] || ""}</i></span>`);
    const stampRow = (left, total, cls) => { const n = Math.round(Math.max(0, left) / total * 12); let h = ""; for (let k = 0; k < 12; k++) h += `<i class="${k < n ? cls : "used"}"></i>`; return `<span class="stamprow" aria-hidden="true">${h}</span>`; };
    const notes = [];
    if (week === 3 && st.f.fatSaved) notes.push(`<p class="bonus">🥓 ${esc(L("Fat bonus: +4 red"))}</p>`);
    if (stock(week).some(i => i.out)) notes.push(`<p class="bonus bad">🕶️ ${esc(L("Black market emptied shelves."))}</p>`);
    const cards = stock(week).map(i => {
      const inCart = st.cart.includes(i.id);
      const cantPts = !inCart && ((i.red || 0) > redLeft || (i.blue || 0) > blueLeft);
      const cantCash = !inCart && (i.cash || 0) > cashLeft;
      const tooMany = !inCart && !i.fat && (i.d || 0) + T.d > 9;
      const dis = i.out || cantPts || cantCash || tooMany;
      const cost = [];
      if (i.red) cost.push(`<span class="pt red">${i.red} ${esc(L("red"))}</span>`);
      if (i.blue) cost.push(`<span class="pt blue">${i.blue} ${esc(L("blue"))}</span>`);
      if (i.cash) cost.push(`<span class="pt cash">${money(i.cash)}</span>`);
      if (!i.red && !i.blue && !i.cash) cost.push(`<span class="pt free">${esc(L("0 points"))}</span>`);
      const what = i.fat ? `<span class="i-w">🍳 ${esc(L("Cooking fat"))}</span>` : `<span class="i-w">🍽️ ${esc(i.d === 1 ? L("1 dinner") : F("{n} dinners", { n: i.d }))}</span>`;
      const mood = i.fat ? "" : (i.c === 2 ? "😊" : i.c === 1 ? "😐" : "😖");
      const status = i.out ? "" : inCart ? L("✓ In basket") : cantCash ? L("Not enough cash") : cantPts ? L("Not enough points") : tooMany ? L("No room for more") : "";
      return `<button type="button" class="item${inCart ? " in" : ""}${i.black ? " black" : ""}${i.out ? " out" : ""}" data-id="${i.id}"${dis ? " disabled" : ""} aria-pressed="${inCart}">
        <span class="i-top"><span class="i-e" aria-hidden="true">${i.e}</span><span class="i-mood" aria-hidden="true">${mood}</span></span><span class="i-n">${esc(L(i.name))}</span>
        ${what}<span class="i-c">${cost.join(" ")}</span>
        ${i.note ? `<span class="i-note">${esc(L(i.note))}</span>` : ""}${status ? `<span class="i-s">${esc(status)}</span>` : ""}${i.out ? `<span class="soldout">${esc(L("SOLD OUT"))}</span>` : ""}</button>`;
    }).join("");
    const body = notes.join("") +
      `<div class="till" aria-live="polite">
        <div class="pts"><span class="ptbig red">🟥 <b id="redLeft">${redLeft}</b> ${esc(L("red left"))}${stampRow(redLeft, R, "r")}</span><span class="ptbig blue">🟦 <b>${blueLeft}</b> ${esc(L("blue left"))}${stampRow(blueLeft, BLUE_WEEK, "b")}</span><span class="ptbig cash">💵 <b>${money(cashLeft)}</b></span></div>
        <div class="table"><div class="plates" aria-label="${esc(F("{n} of 7 dinners", { n: T.d }))}">${plates.join("")}</div>
        <p class="tally">🍽️ ${esc(F("{n} of 7 dinners", { n: T.d }))} · ${T.fat ? "🧈 " + esc(L("fat ✓")) : "🧈 " + esc(L("no fat yet"))}${T.d > 7 ? " · 📦 " + esc(L("more than you need")) : ""}</p></div>
      </div>
      <div class="shelf">${cards}</div>
      ${srcLine("Point prices simplified from 1943 OPA charts. Butter (8 red a pound) and liver (6 red a pound) are real.")}
      <div id="checkoutBox"><button type="button" class="go" id="checkoutBtn">🧾 ${esc(L("Check out →"))}</button><p class="msg try" id="shopMsg" role="status"></p></div>`;
    app.innerHTML = scene({ title: info.title, stage: "st-store", art: "🏪", bubbles: info.say, body });
    app.querySelectorAll(".item").forEach(b => b.onclick = () => {
      const id = b.dataset.id;
      if (st.cart.includes(id)) st.cart = st.cart.filter(x => x !== id); else st.cart.push(id);
      save(); renderShop(week, app); hud();
      const again = app.querySelector(`.item[data-id="${id}"]`); if (again) { again.focus({ preventScroll: true }); if (st.cart.includes(id)) again.classList.add("pop-in"); }
    });
    let warned = false;
    $("checkoutBtn").onclick = () => {
      const t = cartTotals(week);
      if (!warned && (t.d < 7 || !t.fat)) {
        warned = true;
        $("shopMsg").textContent = t.d < 7 ? F("Only {n}/7 dinners! Tap again to go anyway.", { n: t.d }) : L("No cooking fat. Tap again to go anyway.");
        return;
      }
      checkout(week);
    };
  }
  function checkout(week) {
    const t = cartTotals(week);
    const fx = { strain: 0, effort: 0, bm: 0, cash: 0, deal: 0 };
    const lines = [];
    const hungry = Math.max(0, 7 - t.d);
    if (hungry) { fx.strain += Math.ceil(hungry / 2); lines.push(hungry === 1 ? L("🍽️ 1 hungry night. Mae cries.") : F("🍽️ {n} hungry nights. Mae cries.", { n: hungry })); }
    if (t.happy >= 5) { fx.strain -= 1; lines.push(L("😊 The kids loved dinner.")); }
    else if (t.happy <= 2) { fx.strain += 1; lines.push(L("😖 Plain food. Joey complains.")); }
    if (!t.fat) { fx.strain += 1; lines.push(L("🧈 No fat: dry, plain meals.")); }
    if (t.earl) { fx.cash -= 3; fx.bm += 2; fx.effort -= 3; fx.deal += 1; lines.push(L("🕶️ Earl's steaks: someone else's share. He noted your name.")); }
    if (t.d > 7) { fx.effort -= 3; lines.push(L("📦 Buying extra = hoarding. Others go without.")); }
    if (!lines.length) lines.push(L("🍽️ All 7 dinners covered."));
    st.shops[week] = { dinners: t.d, happy: t.happy, fat: t.fat, earl: t.earl, items: t.items.map(i => i.name).join(", ") || "nothing", icons: t.items.map(i => i.e).join("") };
    const clean = {}; Object.keys(fx).forEach(k => { if (fx[k]) clean[k] = fx[k]; });
    const tags = applyFx(clean);
    const add = []; if (t.earl) add.push(" + Earl's steaks"); if (t.d > 7) add.push(" + hoarded");
    addTrail("Week " + week + ": " + t.d + "/7 dinners" + add.join(""), clean, { k: "Week {w}: {d}/7 dinners", v: { w: week, d: t.d }, add });
    let rv = "";
    if (week === 1) rv = "<b>Rationing</b> = limiting what each person buys so everyone gets a fair share.";
    else if (week === 2) rv = stock(2).some(i => i.out) ? "<b>Shortage</b> = not enough for everyone. Cheating makes it worse." : "<b>Fair share</b> = rationing worked only if most families followed the rules.";
    st.result = { tags, text: lines, reveal: rv, icon: "🧾", stamp: "{d}/7 DINNERS", stampV: { d: t.d } };
    st.cart = []; st.phase = 9; save(); render(); window.scrollTo(0, 0);
  }
  function shopStep(week, app) {
    if (st.phase !== 9) return renderShop(week, app);
    const s = st.shops[week] || {};
    app.innerHTML = scene({ title: F("Week {n} Receipt", { n: week }), stage: "st-home", art: `<span class="dinner">${s.icons || "🍽️"}</span>`, body: resultHtml(st.result) + nextBtn() });
    wireNext();
  }

  // =====================================================================
  //  STEPS
  // =====================================================================
  const S = {};
  // 1 · Dad shipped out
  S[1] = app => {
    const body = `<div class="board-explain">
        <div><span class="be-i" aria-hidden="true">🏠</span><b>${esc(L("Keep strain low"))}</b></div>
        <div><span class="be-i" aria-hidden="true">🌡️</span><b>${esc(L("Push war effort up"))}</b></div>
        <div class="rival"><span class="be-i" aria-hidden="true">🧔</span><b>${esc(L("Shrink Earl's black market"))}</b></div>
      </div>` +
      fict("Made-up family. 📜 = real.") +
      srcLine("Real: in 1942, Congress set up a monthly check for soldiers' families (about $72 for a wife and two kids). Servicemen's Dependents Allowance Act of 1942") +
      nextBtn("Open the ration book →");
    app.innerHTML = scene({ title: "Dad Shipped Out", stage: "st-home",
      art: `<div class="family"><span>👩<small>${esc(L("Helen"))}</small></span><span>🧑<small>${esc(L("Joey, 16"))}</small></span><span>👧<small>${esc(L("Mae, 9"))}</small></span><span class="gone">✉️<small>${esc(L("Frank"))}</small></span></div>`,
      bubbles: [["helen", "Frank shipped out. Now you make our choices."]], body });
    wireNext();
  };
  // 2 · The ration book (check 1): phase 0 = the book, then Mae's question.
  S[2] = app => {
    const art = `<div class="mini-book"><span>${esc(L("WAR RATION BOOK"))}</span><div>${[8, 5, 2, 1].map(n => `<i class="r">${n}</i>`).join("")}${[8, 5, 2, 1].map(n => `<i class="b">${n}</i>`).join("")}</div></div>`;
    if (st.phase === 0 && !st.done.c1) {
      const body = `<div class="book">
          <div class="stamps red"><b>🟥 ${esc(L("48 red a week"))}</b><span>${esc(L("Meat · butter · cheese"))}</span></div>
          <div class="stamps blue"><b>🟦 ${esc(L("36 blue a week"))}</b><span>${esc(L("Cans · dried food"))}</span></div>
          <div class="stamps free"><b>✅ ${esc(L("No points"))}</b><span>${esc(L("Chicken · eggs · milk"))}</span></div>
        </div>` +
        srcLine("3 people at home × 16 red points a week and 48 blue points a month. Meat, butter, and cheese rationing began March 29, 1943. Source: OPA; National Park Service") +
        nextBtn("Mae has a question →");
      app.innerHTML = scene({ title: "The Ration Book", stage: "st-home", art, bubbles: [["helen", "Now food costs money AND points."]], body });
      return wireNext(() => toPhase(1));
    }
    const notice = `<div class="notice"><span class="pin" aria-hidden="true">📌</span><p>${esc(L("Rationing gives everyone a fair share. Without it, people with more money could buy up everything."))}</p><p class="src">${esc(L("OPA notice to shoppers, 1943 (paraphrased)"))}</p></div>`;
    if (st.done.c1) {
      app.innerHTML = scene({ title: "The Ration Book", stage: "st-home", art, body: checkDone("c1") + `<div id="after">${bubbles([["mae", "Oh. So rich people can't grab all the meat."]])}${nextBtn("Go shopping →")}</div>` });
      return wireNext();
    }
    app.innerHTML = scene({ title: "The Ration Book", stage: "st-home", art, body: notice + `<div id="checkBox"></div>` });
    mountCheck("c1", solved("c1"));
  };
  S[3] = app => shopStep(1, app);
  // 4 · Gas and the poster (check 2)
  const PROP = "<b>Propaganda</b> = messages that use feelings like guilt or fear to push people.";
  const CAR = [
    { icon: "🏈", title: "Joey drives", label: "Let Joey drive his friends to the games", sub: "Good for: Joey · Costs: gas, tires", trail: "Let Joey drive to games", fx: { strain: -1, effort: -5 }, who: "joey",
      result: "Best Friday ever! (Each trip burns rubber the Army needs.)", reveal: PROP },
    { icon: "🚌", title: "Park it. Take the bus", label: "Park the car. Ride the bus, carpool, and give the spare tire to the rubber drive", sub: "Good for: the war · Costs: time, Joey's mood", trail: "Parked the car, gave the tire", fx: { strain: 1, effort: 8 }, who: "helen",
      result: "Bus in the sleet. But our spare tire goes to war.", reveal: PROP },
    { icon: "🎟️", title: "Sell gas coupons", label: "Sell your extra gas coupons to a neighbor for cash", sub: "Good for: savings · Costs: it's illegal", trail: "Sold gas coupons", fx: { cash: 4, bm: 2, effort: -3, deal: 1 }, who: "earl",
      result: "Selling coupons, Mrs. Novak? That's illegal. Welcome to my world.", reveal: PROP }
  ];
  S[4] = app => decisionStep(app, { id: "car", check: "c2", title: "The Ration Board", stage: "st-office", art: "⛽",
        evidence: `<figure class="poster"><a href="ride-alone-poster.jpg" target="_blank" rel="noopener"><img src="ride-alone-poster.jpg" alt="${esc(L("WWII poster: a man drives a car with a see-through Adolf Hitler in the passenger seat."))}"></a><figcaption><b>${L("“When you ride ALONE you ride with Hitler!”")}</b><span class="src">${L("Weimer Pursell, U.S. government poster, 1943. National Archives (NAID 516143). Tap to enlarge.")}</span></figcaption></figure>`,
    say: [["joey", "Mom! I need the car for Friday games!"], ["clerk", "Your “A” sticker: 3–4 gallons a week."]],
    body: realFile(["Gas rationing mostly saved rubber for the war."], "Japan had taken over the lands that grew most of the world's natural rubber. Office of Price Administration records; National Archives"),
    choices: () => CAR });
  // 5 · Help wanted
  const JOB = [
    { icon: "📻", title: "Take the war job", label: "Take the job. Joey cooks, and Mae goes to a neighbor after school", sub: "Good for: money, the war · Costs: Helen's energy, no garden", trail: "Helen took a war job", fx: { cash: 30, effort: 10, strain: 2 }, flag: { job: true }, who: "helen",
      result: "I wire radios all day. Good pay, but I'm exhausted.",
      reveal: "<b>Rosie the Riveter</b> = nickname for the millions of women in war jobs." },
    { icon: "🥕", title: "Plant a victory garden", label: "Stay home. Dig up the backyard for a big victory garden and take in sewing", sub: "Good for: food without points · Costs: less money", trail: "Planted a victory garden", fx: { cash: 5, effort: 6, strain: 1 }, flag: { garden: true }, who: "mae",
      result: "We dug up the whole yard! This food costs zero points.",
      reveal: "<b>Victory garden</b> = a home garden that freed canned food for the troops." }
  ];
  S[5] = app => decisionStep(app, { id: "job", title: "Help Wanted", stage: "st-factory", art: "🏭",
    say: [["boss", "Warplane radios! Six days, $25 a week."]],
    body: `<figure class="poster small"><a href="loose-lips-poster.jpg" target="_blank" rel="noopener"><img src="loose-lips-poster.jpg" alt="${esc(L("WWII poster: a ship sinking under black smoke with the words Loose lips might sink ships."))}"></a><figcaption><b>${L("“Loose lips might sink ships.”")}</b><span class="src">${L("War plants hung posters like this. House of Seagram, 1941–45. National Archives (NAID 513543).")}</span></figcaption></figure>` +
      realFile(["6 million women took war jobs, often for less pay."], "National WWII Museum. Collins Radio grew from about 200 workers (1941) to almost 4,000: Collins Collectors Association. Helen's pay is a game number."),
    choices: () => JOB });
  // 6 · Earl's back door
  const BLACK = "<b>Black market</b> = illegal sales of rationed goods, taking others' fair share.";
  const EARL = [
    { icon: "🥩", title: "Buy the steaks", label: "Buy 2 steaks for $3. The kids deserve a treat", sub: "Good for: dinner tonight · Costs: someone's fair share", trail: "Bought Earl's steaks", fx: { cash: -3, strain: -1, bm: 2, effort: -3, deal: 1 }, who: "earl",
      result: "Pleasure doing business. I'll write “Novak” in my notebook.", reveal: BLACK },
    { icon: "🚶", title: "Walk away", label: "Say no thanks and walk away", sub: "Good for: your conscience · Costs: Earl keeps selling", trail: "Said no to Earl", fx: { bm: 1 }, who: "earl",
      result: "Suit yourself. Plenty of folks are buying.", reveal: BLACK },
    { icon: "📋", title: "Report Earl", label: "Report Earl to the ration board", sub: "Good for: the town · Costs: angry neighbors", trail: "Reported Earl", fx: { bm: -3, effort: 5, strain: 1 }, flag: { reported: true }, who: "mae",
      result: "Earl got shut down. Now his daughter won't play with me.", reveal: BLACK }
  ];
  S[6] = app => decisionStep(app, { id: "earl", title: "The Back Door", stage: "st-garage", art: "🚪",
    say: [["helen", "Our red points are almost gone…", "think"], ["earl", "Psst. Mrs. Novak. Steaks. No stamps. Just cash."]],
    body: realFile(["1944: up to 17% of U.S. meat was sold illegally."], "OPA estimate; National Park Service, “Meat Rationing on the World War II Home Front”"),
    choices: () => EARL });
  // 7 · Shopping week 2
  S[7] = app => {
    if (st.phase === 0 && !st.f.reported && !st.f.bm7) { st.f.bm7 = true; st.m.bm += 1; clampM(); save(); }
    shopStep(2, app);
  };
  // 8 · Dorothy and the Double V (check 3)
  const DV = "<b>Double V</b> = Black Americans' fight to beat dictators like Hitler abroad AND racism at home.";
  const DOROTHY = [
    { icon: "✍️", title: "Sign with her", label: "Sign Dorothy's complaint and go with her to the plant office", sub: "Good for: Dorothy, the plant · Costs: gossip, stress", trail: "Stood up for Dorothy", fx: { strain: 1, effort: 6 }, who: "dorothy",
      result: "The fair-hiring committee backed me. I'm wiring radios now!", reveal: DV },
    { icon: "🤐", title: "Stay out of it", label: "Stay out of it. Helen can't risk trouble right now", sub: "Good for: no trouble · Costs: a trained worker", trail: "Stayed out of Dorothy's fight", fx: { effort: -3 }, who: "dorothy",
      result: "Chicago has fairer jobs. Your plant just lost a trained worker.", reveal: DV }
  ];
  S[8] = app => decisionStep(app, { id: "dorothy", check: "c3", title: "Two Victories", stage: "st-factory", art: "✌️✌️",
    intro: { next: "Read Dorothy's newspaper →",
      say: [["dorothy", "I trained to wire radios. The boss keeps me on the cleaning crew because I'm Black."]],
      body: realFile(["1941: Executive Order 8802 banned race discrimination in war-plant hiring."], "National Archives") },
    evidence: `<div class="paper"><p class="masthead" aria-hidden="true">THE PITTSBURGH COURIER</p><p class="quote">“${esc(L("The first V for victory over our enemies from without, the second V for victory over our enemies from within."))}”</p><p class="src">${esc(L("James G. Thompson, letter to the Pittsburgh Courier, January 1942 (part)"))}</p></div>`,
    say: [["dorothy", "I'm filing a complaint. Will you sign it?"]],
    body: realFile(["About 1 million Black Americans served, many in units split by race."], "National Archives"),
    choices: () => DOROTHY });
  // 9 · Bond rally: the Sullivans (check 4)
  S[9] = app => {
    const art = `<div class="thermo-big"><span style="height:${Math.max(8, st.m.effort)}%"></span></div>`;
    if (st.done.c4) {
      app.innerHTML = scene({ title: "Bond Rally", stage: "st-rally", art, body: checkDone("c4") + `<div id="after">${newWord("<b>Civic virtue</b> = putting your community and country ahead of yourself.")}${nextBtn("Go to the bond booth →")}</div>` });
      return wireNext();
    }
    const body = `<div class="memorial"><p class="m-h" aria-hidden="true">⭐⭐⭐⭐⭐</p>
        <p>${esc(L("All five Sullivan sons of Waterloo, Iowa, died when their Navy ship sank in 1942."))}</p>
        <p>${esc(L("Then the parents toured 200+ war plants."))}</p>
        <p class="src">${esc(L("Source:"))} ${L("Naval History and Heritage Command. The USS Juneau sank November 13, 1942. Tom and Alleta Sullivan spoke to over a million workers.")}</p></div>` +
      `<div id="checkBox"></div>`;
    app.innerHTML = scene({ title: "Bond Rally", stage: "st-rally", art, body });
    mountCheck("c4", solved("c4"));
  };
  // 10 · The bond pledge (check 5)
  const BOND = "<b>War bond</b> = a loan to the government for the war. 85 million Americans bought them.";
  function bondChoices() {
    const short = st.m.cash < 18.75;
    return [
      { icon: "💵", title: "Buy a $25 bond", label: short ? "Buy a $25 bond for $18.75 (you're short, so skip Mae's birthday and Joey's new shoes)" : "Buy a $25 war bond for $18.75", sub: short ? "Good for: the war · Costs: all savings, the kids' mood" : "Good for: the war · Costs: most of your savings", trail: "Bought a $25 war bond",
        fx: () => short ? { cash: -st.m.cash, strain: 2, effort: 12 } : { cash: -18.75, effort: 12 }, who: "speaker",
        result: "The thermometer jumps! Your money builds planes now.", reveal: BOND },
      { icon: "📒", title: "Buy war stamps", label: "Buy 20 ten-cent war stamps for Mae's stamp book ($2)", sub: "Good for: a little help · Costs: $2", trail: "Bought war stamps", fx: { cash: -2, effort: 5 }, who: "mae",
        result: "I lick each stamp into my book. A full book = a bond!", reveal: BOND },
      { icon: "🚫", title: "Skip the drive", label: "Skip it. The family needs every dollar", sub: "Good for: savings · Costs: the town's goal", trail: "Skipped the bond drive", fx: { effort: -3 }, who: "speaker",
        result: "The thermometer barely moved. Cedar Rapids is falling behind.", reveal: BOND }
    ];
  }
  S[10] = app => decisionStep(app, { id: "bond", check: "c5", title: "The Bond Booth", stage: "st-rally", art: "🏦",
    evidence: `<div class="bond"><p class="b-top">${esc(L("WAR BOND"))}</p><div class="b-row"><div><small>${esc(L("Pay now"))}</small><b>$18.75</b></div><div class="b-arrow">→ 🕙 ${esc(L("10 years"))} →</div><div><small>${esc(L("Get back"))}</small><b>$25</b></div></div><p class="b-note">${esc(L("The government spends it now."))}</p><p class="src">${esc(L("Series E savings bond. U.S. Treasury; National WWII Museum"))}</p></div>`,
    say: [["clerk", "Will you buy one, Mrs. Novak?"]],
    choices: bondChoices });
  // 11 · Scrap and fat drive
  const TW = "<b>Total war</b> = the whole country works to win: farms, factories, kitchens, kids.";
  const SCRAP = [
    { icon: "🦾", title: "Go all in", label: "Go all in: save every drop of kitchen fat, and haul the old iron porch rail to school", sub: "Good for: the war, red points · Costs: time, sweat", trail: "Went all in on scrap", fx: { effort: 8, strain: 1 }, flag: { fatSaved: true }, who: "mae",
      result: "We WON! And Mom's can of grease earns red points.", reveal: TW },
    { icon: "🥫", title: "Give tin cans", label: "Give the easy stuff: a box of flattened tin cans", sub: "Good for: a little help · Costs: not much", trail: "Gave only tin cans", fx: { effort: 4 }, who: "mae",
      result: "It helped a little. We finished in the middle.", reveal: TW },
    { icon: "🛋️", title: "Skip it", label: "Skip it this time. Everyone's worn out", sub: "Good for: rest · Costs: the drive", trail: "Skipped the scrap drive", fx: { strain: -1, effort: -3 }, who: "mae",
      result: "We lost to Marion! …The quiet weekend was nice, though.", reveal: TW }
  ];
  S[11] = app => decisionStep(app, { id: "scrap", title: "Scrap Drive", stage: "st-school", art: "🔩",
    say: [["mae", "My school is racing Marion for scrap!"], ["butcher", "Used fat makes explosives. I'll pay for it."]],
    body: realFile(["Used fat earned 2 red points a pound."], "Plus 4 cents a pound, starting December 13, 1943. Office of Price Administration") + fict("School race: made up."),
    choices: () => SCRAP });
  // 12 · Shopping week 3
  S[12] = app => {
    if (st.phase === 0 && !st.f.reported && !st.f.bm12) { st.f.bm12 = true; st.m.bm += 1; clampM(); save(); }
    shopStep(3, app);
  };
  // 13 · Harvest hands (check 6): File 1 (braceros), then File 2 (POWs) + Walt's question, then Joey's choice.
  const BRAC = "<b>Bracero Program</b> = a 1942 U.S.–Mexico deal for farm workers; many were underpaid.";
  const HARVEST = [
    { icon: "🏭", title: "Quit school for the plant", label: "Joey quits school to work full time at the plant", sub: "Good for: money, the war · Costs: Joey's education", trail: "Joey quit school for work", fx: { cash: 20, effort: 8, strain: 1 }, flag: { joeyQuit: true }, who: "joey",
      result: "Real money, Mom! Lots of guys left school for war jobs.", reveal: BRAC },
    { icon: "🌽", title: "Harvest, then school", label: "Joey works the harvest on Uncle Walt's farm beside the POW crew, then goes back to school", sub: "Good for: the harvest · Costs: Joey gone all summer", trail: "Joey worked the harvest", fx: { cash: 5, effort: 6, strain: 1 }, who: "walt",
      result: "Joey picked corn beside German POWs his age. He's back in school by fall.", reveal: BRAC },
    { icon: "🏠", title: "Stay home, help Mom", label: "Joey stays in Cedar Rapids and helps Helen at home", sub: "Good for: the family · Costs: Walt's corn", trail: "Joey stayed home", fx: { strain: -1, effort: 1 }, who: "walt",
      result: "The POW crew did what it could. Some corn rotted.", reveal: BRAC }
  ];
  const folder = (tab, lines, src) => `<div class="folder"><span class="tab">📁 ${esc(L(tab))}</span>${lines.map(l => `<p>${esc(L(l))}</p>`).join("")}${src ? `<p class="src">${L(src)}</p>` : ""}</div>`;
  S[13] = app => decisionStep(app, { id: "harvest", check: "c6", title: "Harvest Hands", stage: "st-farm", art: "🌽", nextLabel: "See how the war ends →",
    intro: { next: "Read File 2 →",
      say: [["walt", "No workers near Algona. Can Joey help?"]],
      body: `<div class="files one">${folder("File 1 · Braceros", ["Farms and railroads lacked workers.", "A 1942 deal brought Mexican workers.", "Promised fair pay. Many got low pay."], "“Bracero” means “one who works with his arms.” National Archives")}</div>` },
    evidence: `<div class="files one">${folder("File 2 · Prisoner-of-war camps", ["Iowa farms lacked workers too.", "German POWs from Camp Algona picked corn.", "Pay: about 80¢ a day."], "The Geneva Convention required POW pay (camp coupons). 1942 U.S.–Mexico agreement. Camp Algona POW Museum")}</div>`,
    say: [["joey", "Or… I could quit school and work at the plant."]],
    body: realFile(["Bracero pay was partly held back. Many never got it."], "About 4.6 million bracero contracts were signed, 1942–1964. National Archives"),
    choices: () => HARVEST });

  // 14 · Ending (newspaper front page), then the bigger picture
  const ENDINGS = {
    busted: { e: "🚨", title: "Busted", text: "OPA agents caught Earl. His notebook listed the Novaks. Your stamps got cut." },
    burned: { e: "🔥", title: "Hero, but Burned Out", text: "The town beat its goals. But Helen got sick from exhaustion, and the kids barely saw her." },
    together: { e: "🏅", title: "Pulled Together", text: "The Novaks gave up a lot but held together. The town beat its bond goal." },
    selfish: { e: "🪞", title: "Looking Out for Number One", text: "The Novaks stayed comfortable. But the town fell short, and neighbors noticed who didn't help." },
    middle: { e: "🙂", title: "Got By", text: "The Novaks did part of their share and got by. So did millions of real families." }
  };
  function endingKey() {
    const m = st.m;
    if (st.deals >= 2) return "busted";
    if (m.effort >= 65 && m.strain >= 8) return "burned";
    if (m.effort >= 60 && m.strain < 8) return "together";
    if (m.effort < 45) return "selfish";
    return "middle";
  }
  S[14] = app => {
    const k = endingKey(), E = ENDINGS[k];
    if (st.ending !== k) { st.ending = k; save(); }
    if (st.phase === 1) {
      const body = `<div class="left-out"><p>⚖️ ${esc(L("Black workers fought for fair jobs."))}</p><p>⚖️ ${esc(L("Many braceros never got full pay."))}</p></div>` +
        `<div class="stat"><span class="st-big" aria-hidden="true">📉</span><div><p class="st-n">${esc(L("Unemployment: 14.6% (1940) → 1.2% (1944)"))}</p><p>${esc(L("War jobs ended the Depression."))}</p><p class="src">${esc(L("U.S. Bureau of Labor Statistics. Rationing of most foods ended in 1945."))}</p></div></div>` +
        newWord("<b>Common good</b> = what's best for all, not just you.") + nextBtn("Write to Frank →");
      app.innerHTML = scene({ title: "Bigger Picture", stage: "st-parade", art: "🇺🇸", body });
      return wireNext();
    }
    const trail = st.trail.filter(t => Object.keys(t.fx).length).map(t => `<li><span>${esc(trailText(t))}</span><span class="tags">${fxTags(t.fx)}</span></li>`).join("");
    const body = `<div class="front ${k}"><p class="masthead" aria-hidden="true">THE CEDAR RAPIDS HOME FRONT GAZETTE · AUGUST 1945</p>
        <div class="headline"><span class="e-big" aria-hidden="true">${E.e}</span><h3>${esc(L(E.title))}</h3></div>
        <p>${esc(L(E.text))}</p>
        <div class="finalm"><span>🏠 ${esc(L("Strain"))} <b>${st.m.strain}/10</b></span><span>🌡️ ${esc(L("War effort"))} <b>${st.m.effort}%</b></span><span>🕶️ ${esc(L("Black market"))} <b>${st.m.bm}/10</b></span><span>💵 <b>${money(st.m.cash)}</b></span></div>
        <h4 class="cb">${esc(L("Caused by:"))}</h4><ul class="trail">${trail}</ul></div>` +
      nextBtn("The bigger picture →");
    app.innerHTML = scene({ title: "Your Ending", stage: "st-parade", art: "🎉", bubbles: [["radio", "The war is over! Frank is coming home."]], body });
    wireNext(() => toPhase(1));
  };

  // 15 · Writing + turn in (V-Mail letter to Frank), two short pages
  const PROMPTS = [
    { id: "change", short: "Bracero Program or POW camps", label: "1. Braceros or Iowa's POW camps: how did it change U.S. life? Was it fair?",
      stem: "___ changed life in the U.S. because ___. It was fair / unfair because ___.", min: 60, newWords: 6,
      mustAll: [["bracero", "mexic", "pow", "prisoner", "algona", "clarinda", "german", "camp"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name the braceros or the POW camps and explain with “because.”" },
    { id: "sacrifice", short: "Hardest sacrifice and the war effort", label: "2. The Novaks' hardest sacrifice: how did it help the war effort?",
      stem: "The hardest sacrifice was ___. It helped the war effort because ___.", min: 60, newWords: 6,
      mustAll: [["ration", "point", "stamp", "meat", "steak", "earl", "black market", "garden", "job", "work", "radio", "car", "gas", "tire", "bond", "scrap", "fat", "dorothy", "joey", "school", "farm", "harvest", "money", "food"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name the sacrifice (like the car, the job, the bond, or Earl) and explain with “because.”" }
  ];
  S[15] = app => {
    const pg = st.phase === 1 ? 1 : 0;
    const page = (p, i) => `<div class="vpage"${i !== pg ? " hidden" : ""}><label for="w_${p.id}">${esc(L(p.label))}</label><p class="stem">${esc(L(p.stem))}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea></div>`;
    const tail = pg === 0
      ? `<button type="button" class="go" id="pageBtn">${esc(L("Next page →"))}</button><p id="pageMsg" class="msg" role="status" aria-live="polite"></p>`
      : `<label for="nameBox2" class="namel">${esc(L("Your name"))}</label><input id="nameBox2" maxlength="60" autocomplete="off" placeholder="${esc(L("First name + last initial (like Jordan M.)"))}" value="${esc(st.name)}">` +
        `<div class="vrow"><button type="button" class="back" id="backBtn">← ${esc(L("Page 1"))}</button><button type="button" class="go" id="sendBtn">📮 ${esc(L(st.turnedIn ? "Turn in again" : "Turn in"))}</button></div><p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? esc(L("✓ Turned in. You can fix your writing and turn it in again.")) : ""}</p>`;
    const body = `<div class="vmail"><p class="vm-h">✉️ V-MAIL · ${pg + 1}/2</p>` + PROMPTS.map(page).join("") + tail + `</div>`;
    app.innerHTML = scene({ title: "Write to Frank", stage: "st-home", art: "✉️", body });
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    if (pg === 0) {
      $("pageBtn").onclick = () => {
        const err = writingProblem(PROMPTS[0]);
        if (err) { $("pageMsg").textContent = err; $("pageMsg").className = "msg try"; return; }
        toPhase(1);
      };
    } else {
      $("backBtn").onclick = () => toPhase(0);
      $("sendBtn").onclick = sendWork;
    }
  };

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  // Returns a message if the answer isn't ready yet, or "" if it's fine.
  function writingProblem(p) {
    if (isT()) return "";   // Test T. (teacher) skips the writing rules
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: L(p.stem), source: "from today", sourceEs: "de hoy" });
      if (junk) return F("For {s}: ", { s: L(p.short) }) + junk;
    }
    if (v.length < p.min) { box.focus(); return F("Write a little more for: {s} (1–2 full sentences).", { s: L(p.short) }); }
    if (/_{2,}/.test(v)) { box.focus(); return F("Fill in the blanks with your own words for: {s}.", { s: L(p.short) }); }
    const stemText = p.stem + " " + L(p.stem);
    const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
    const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshW.size < p.newWords) { box.focus(); return F("Add more of your own ideas for: {s}. Use details from today.", { s: L(p.short) }); }
    let groups = p.mustAll;
    const esWords = window.SiteLang && window.SiteLang.must(p.id);
    if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
    if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) { box.focus(); return L(p.mustMsg); }
    return "";
  }
  async function sendWork() {
    const msg = $("sendMsg");
    const bad = t => { msg.textContent = t; msg.className = "msg try"; };
    const nm = window.classShortName ? window.classShortName($("nameBox2").value) : $("nameBox2").value.trim();
    if (!/^\S+ [A-Z]\.$/.test(nm)) { bad(L("Type your first name and last initial, like Jordan M.")); $("nameBox2").focus(); return; }
    st.name = nm; save();
    for (const p of PROMPTS) { const err = writingProblem(p); if (err) { bad(err); return; } }
    // ----- payload (same shape as shared/unit-game.js finish()) -----
    const answers = { "Standard": CFG.standard };
    const right = CHECK_ORDER.filter(id => !st.wrong[id]).length;
    answers["First-try correct"] = right + " of " + CHECK_ORDER.length;
    const byStd = {};
    CHECK_ORDER.forEach(id => { const s = CHECKS[id].std; byStd[s] = byStd[s] || [0, 0]; byStd[s][1]++; if (!st.wrong[id]) byStd[s][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    CHECK_ORDER.forEach(id => { const q = CHECKS[id]; answers[q.short] = q.options[0] + (st.wrong[id] ? " (after " + st.wrong[id] + " wrong " + (st.wrong[id] === 1 ? "try" : "tries") + ")" : " (first try)"); });
    const CH = { car: "Car and gas", job: "Helen's job offer", earl: "Earl's black market", dorothy: "Dorothy's complaint (Double V)", bond: "Bond drive", scrap: "Scrap and fat drive", harvest: "Joey and the harvest" };
    Object.keys(CH).forEach(k => { if (st.picks[k]) answers["Choice · " + CH[k]] = st.picks[k]; });
    [1, 2, 3].forEach(w => { const s = st.shops[w]; if (s) answers["Shopping · Week " + w] = s.dinners + " of 7 dinners" + (s.fat ? ", cooking fat" : ", no fat") + (s.earl ? ", BLACK MARKET" : "") + " · " + s.items; });
    const E = ENDINGS[st.ending || endingKey()];
    answers["Ending"] = E.title;
    answers["Caused by"] = st.trail.filter(t => Object.keys(t.fx).length).map(t => t.label + " (" + fxText(t.fx) + ")").join(" · ");
    answers["Final meters"] = "Strain " + st.m.strain + "/10 · Town war effort " + st.m.effort + "% · Black market " + st.m.bm + "/10 · Savings " + money(st.m.cash) + " · Black-market deals " + st.deals;
    $("sendBtn").disabled = true; msg.textContent = L("Sending your work…"); msg.className = "msg";
    try {
      const res = await window.classTurnIn(CFG.oldApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: CFG.assignmentId, assignmentTitle: CFG.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || L("Your work did not save. Try again."));
      st.turnedIn = true; save();
      msg.innerHTML = `<span class="stamp slam">📮 ${esc(L("MAILED"))}</span> ${esc(L("✓ Turned in! You're done."))}`; msg.className = "msg good";
      $("sendBtn").textContent = L("✓ Turned in");
    } catch (err) { msg.textContent = err.message || L("Could not turn in. Try again."); msg.className = "msg try"; $("sendBtn").disabled = false; }
  }

  // =====================================================================
  //  TITLE SCREEN + RENDER
  // =====================================================================
  function title(app) {
    app.innerHTML = `<section class="title-card">
      <div class="t-grid"><div class="t-left">
        <h1>${esc(L("Hold the Home Front"))}</h1>
        <p class="hook">${esc(L("1943. Dad's at war. Meat is rationed."))}</p>
        <div class="t-chips"><span>🛒 ${esc(L("3 shops"))}</span><span>⚖️ ${esc(L("7 choices"))}</span><span>🔍 ${esc(L("6 checks"))}</span><span>⏱️ ${esc(L("25 min"))}</span></div>
        <p class="goal"><b>${esc(L("Goal:"))}</b> ${esc(L("explain how families helped win the war, and who was treated unfairly."))}</p>
        <div class="t-start"><label for="nameBox">${esc(L("Your name"))}</label>
        <div class="t-row"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="${esc(L("First name + last initial (like Jordan M.)"))}" value="${esc(st.name)}">
        <button type="button" class="go start" id="startBtn">${esc(L("Start →"))}</button></div>
        <p id="introMsg" class="msg" role="status"></p></div>
      </div>
      <div class="t-art" aria-hidden="true"><div class="ration-book"><span class="rb-top">${esc(L("WAR RATION BOOK"))}</span><span class="rb-name">NOVAK</span><div class="rb-stamps">${[8, 5, 2, 1, 8, 5, 2, 1].map((n, i) => `<i class="${i < 4 ? "r" : "b"}">${n}</i>`).join("")}</div><span class="rb-foot">CEDAR RAPIDS · IOWA · 1943</span></div>
        <div class="t-cast"><span>👩</span><span>🧑</span><span>👧</span><span class="vs">VS</span><span class="earl">🧔<i>🕶️</i></span></div></div></div>
    </section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = L("Type your first name and last initial, like Jordan M."); $("introMsg").className = "msg try"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; st.phase = 0; save(); render(); window.scrollTo(0, 0);
    };
  }

  let first = true;
  function render(scrollToNew) {
    clearTimeout(lockTimer);
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    const app = $("app");
    if (st.step < 1) { hud(); return title(app); }
    (S[st.step] || S[TOTAL])(app);
    justSolved = null;
    hud();
    if (pending) { const p = pending; pending = null; setTimeout(() => pops(p), 60); }
    if (scrollToNew) {
      const target = $("after") || $("choiceBox");
      if (target && target.scrollIntoView) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 40);
    }
  }

  $("restartBtn").onclick = () => {
    if (!confirm(L("Start over? This clears your work on this device."))) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) {
    $("welcome").textContent = F("Welcome back, {n}! You're on step {x} of {y}.", { n: st.name, x: Math.min(st.step, TOTAL), y: TOTAL });
    $("welcome").hidden = false;
  }
  window.addEventListener("resize", () => { if (st.step >= 1) document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px"); });
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current one.
  // A screen = a step + phase (intro pages, the bigger picture, and writing page 2 get their own).
  try {
    const SCR = [[1, 0, "Dad shipped out"], [2, 0, "The ration book"], [2, 1, "Check: why ration"], [3, 0, "Shopping week 1"],
      [4, 0, "Gas + poster (check + choice)"], [5, 0, "Help wanted (choice)"], [6, 0, "Earl's back door (choice)"], [7, 0, "Shopping week 2"],
      [8, 0, "Dorothy (intro)"], [8, 1, "Double V (check + choice)"], [9, 0, "Bond rally (check)"], [10, 0, "Bond booth (check + choice)"],
      [11, 0, "Scrap drive (choice)"], [12, 0, "Shopping week 3"], [13, 0, "Harvest: File 1"], [13, 1, "Harvest: File 2 (check + choice)"],
      [14, 0, "Ending"], [14, 1, "Bigger picture"], [15, 0, "Letter page 1"], [15, 1, "Letter page 2 + turn in"]];
    const DEC = { 4: ["car", () => CAR], 5: ["job", () => JOB], 6: ["earl", () => EARL], 8: ["dorothy", () => DOROTHY], 10: ["bond", bondChoices], 11: ["scrap", () => SCRAP], 13: ["harvest", () => HARVEST] };
    const CHK = { 2: "c1", 4: "c2", 8: "c3", 9: "c4", 10: "c5", 13: "c6" };
    const INTRO = { 8: true, 13: true };
    const SHOP = { 3: 1, 7: 2, 12: 3 };
    // Same as decide(), without the re-render. Used to fill skipped choices with the first card.
    const tDecide = (id, c) => {
      const fx = typeof c.fx === "function" ? c.fx() : c.fx;
      st.picks[id] = c.label; st.pickTitles[id] = c.title;
      const tags = applyFx(fx);
      if (c.flag) Object.assign(st.f, c.flag);
      addTrail(c.trail || c.label, fx);
      return { tags, text: c.result, reveal: c.reveal, who: c.who, icon: c.icon };
    };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => SCR.length,
      index: () => {
        let best = 0;
        SCR.forEach((x, n) => { if (x[0] === st.step && x[1] <= st.phase) best = n; else if (x[0] < st.step) best = n; });
        return best;
      },
      label: n => SCR[n][2],
      go: n => {
        const [step, phase] = SCR[n];
        if (!st.name) st.name = "Test T.";
        // Skipped choices before this screen get the first card so the ending has a trail.
        Object.keys(DEC).forEach(k => { const [id, list] = DEC[k]; if (+k < step && !st.picks[id]) tDecide(id, list()[0]); });
        st.step = step; st.phase = phase; st.result = null; st.cart = [];
        // Back on a choice screen already made: show its result instead of the cards again.
        const d = DEC[step];
        if (d && st.picks[d[0]] && (!INTRO[step] || phase === 1)) {
          const c = d[1]().find(x => x.label === st.picks[d[0]]) || d[1]().find(x => x.title === st.pickTitles[d[0]]);
          if (c) { const fx = typeof c.fx === "function" ? c.fx() : c.fx; st.result = { tags: fxTags(fx), text: c.result, reveal: c.reveal, who: c.who, icon: c.icon }; st.phase = 9; }
        }
        save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const step = st.step, chk = CHK[step], d = DEC[step];
        if (step < 1 || st.phase === 9) return;
        if (INTRO[step] && st.phase === 0) return;
        if (step === 2 && st.phase === 0 && !st.done.c1) return;
        if (chk && !st.done[chk]) { st.done[chk] = true; save(); justSolved = chk; render(true); return; }
        if (d && !st.picks[d[0]]) { const b = document.querySelector("#cChoices .dcard"); if (b) b.click(); return; }
        const week = SHOP[step];
        if (week) {
          // Fill a fair basket: dinners until 7, then one cooking fat, all within the points.
          st.cart = []; let red = 0, blue = 0, dn = 0;
          stock(week).forEach(i => { if (i.out || i.black || i.fat || dn + i.d > 7) return; if (red + (i.red || 0) > weekRed(week) || blue + (i.blue || 0) > BLUE_WEEK) return; st.cart.push(i.id); red += i.red || 0; blue += i.blue || 0; dn += i.d; });
          const fat = stock(week).find(i => i.fat && red + i.red <= weekRed(week)); if (fat) st.cart.push(fat.id);
          checkout(week);
        }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
