// =====================================================================
//  HOLD THE HOME FRONT  (U.S. History · Unit 2 · Day 4)
//  Run the Novak family's ration book from 1943 to 1945.
//  Core loop: shop with real ration points, make home-front choices that carry forward,
//  and watch the game board: family moods (strain), the town's bond thermometer (war effort),
//  Earl the black-market rival, and the family cash jar.
//  6 evidence checks are part of the world (Mae's question, the poster on the wall, Dorothy's
//  newspaper, the rally, the bond form, Walt's files). Each one unlocks the next part.
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
    radio: ["📻", "Radio news"], helen: ["👩", "Helen"], joey: ["🧑", "Joey"], mae: ["👧", "Mae"], earl: ["🧔", "Earl"],
    clerk: ["🧑‍💼", "Ration clerk"], dorothy: ["👩🏾", "Dorothy"], speaker: ["🎙️", "Rally speaker"], walt: ["👨‍🌾", "Uncle Walt"],
    grocer: ["🧑‍🍳", "Grocer"], boss: ["🏭", "Collins Radio"], butcher: ["🔪", "Butcher"]
  };
  const bub = (who, text, cls) => `<div class="bub ${who}${cls ? " " + cls : ""}"><span class="av" aria-hidden="true">${WHO[who][0]}</span><div class="bt"><b>${esc(L(WHO[who][1]))}</b><p>${L(text)}</p></div></div>`;
  const bubbles = list => `<div class="bubbles">${list.map(b => bub(b[0], b[1], b[2])).join("")}</div>`;
  const realFile = (lines, src) => `<div class="real"><p class="real-h">📜 ${esc(L("Real history"))}</p>${lines.map(l => `<p>${L(l)}</p>`).join("")}${src ? `<p class="src">${esc(L("Source:"))} ${L(src)}</p>` : ""}</div>`;
  const fict = t => `<p class="fict">${esc(L(t))}</p>`;
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
      <div class="sc-top"><span class="chap">${esc(L(o.kicker))}</span><h2>${esc(L(o.title))}</h2></div>
      <div class="stage"><div class="stage-art" aria-hidden="true">${o.art || ""}</div>${o.bubbles ? bubbles(o.bubbles) : ""}</div>
      <div class="sc-body">${o.body || ""}</div></section>`;
  }
  function nextBtn(label) { return `<button type="button" class="go" id="nextBtn">${esc(L(label || "Next →"))}</button>`; }
  function wireNext(fn) { const b = $("nextBtn"); if (b) b.onclick = fn || advance; }
  function advance() { st.step++; st.phase = 0; st.result = null; st.cart = []; save(); render(); window.scrollTo(0, 0); }

  // ---------- evidence checks (in-world) ----------
  const CHECKS = {
    c1: { std: "US.31", short: "Why ration: fair shares", who: "mae", kind: "talk", stamp: "MAE GETS IT",
      prompt: "“If we have the money, why can't we just buy what we want?” Use the OPA notice. How should Helen answer?",
      options: ["So rich and poor families get the same amount", "So stores can charge a lot more money for meat", "So the Army can sell its extra food to families", "So families stop growing their own vegetables"],
      hint: "Reread the notice. If only money mattered, who would get the food?",
      why: "Rationing spread scarce food fairly. Rich and poor families got the same points." },
    c2: { std: "US.33", short: "Ride-alone poster: propaganda", who: "clerk", kind: "notes", stamp: "STICKER ISSUED",
      prompt: "“Read the poster before I hand over your sticker. Who's in that passenger seat, and why would it make a driver carpool?”",
      options: ["Hitler. It makes driving alone feel like helping the enemy.", "A soldier. It makes driving alone feel like a fun road trip.", "A police officer. It warns drivers they will get a ticket.", "A gas station worker. It shows that gas is cheap again."],
      hint: "Look closely at the see-through passenger, then read the words at the top.",
      why: "The poster uses guilt: wasting gas and tires is shown as riding with Hitler." },
    c3: { std: "US.34", short: "Double V: two victories", who: "dorothy", kind: "talk", stamp: "DOUBLE V",
      prompt: "“Read the letter in my newspaper. What do the two V's on my pin stand for?”",
      options: ["Victory over enemies overseas and over racism at home", "Victory in Europe first and then victory in the Pacific", "Victory gardens and victory bonds for every family", "Victory for the Army and victory for the Navy at sea"],
      hint: "“Enemies from without” are outside the country. Who are the “enemies within” in his letter?",
      why: "Double V meant beating dictators like Hitler overseas AND racism at home." },
    c4: { std: "US.34", short: "Sullivans: civic virtue", who: "speaker", kind: "talk", stamp: "CIVIC VIRTUE",
      prompt: "“Tell me, Cedar Rapids: why are Tom and Alleta Sullivan an example of civic virtue, putting the community first?”",
      options: ["They kept helping the war effort after losing all five sons", "They earned money giving speeches at factories and shipyards", "They asked the Navy to send all the Iowa sailors home", "They refused to support the war after the Juneau sank"],
      hint: "Reread what they did AFTER November 13, 1942.",
      why: "After a terrible loss, they spent months urging war workers on. That's putting the country first." },
    c5: { std: "US.31", short: "War bond = loan to the government", who: "clerk", kind: "form", stamp: "APPROVED",
      prompt: "“Before you sign, check the box that says what you're really doing when you buy this bond.”",
      options: ["Lending the government money it pays back later", "Paying a new tax that every family has to pay", "Buying extra ration points for her own family", "Sending money straight to a soldier's family"],
      hint: "Look at the bond: pay $18.75 now, get $25 back later. Who uses the money in between?",
      why: "A war bond is a loan. The government spends it on the war now and pays you back with interest." },
    c6: { std: "US.31", short: "Farm labor: Braceros and POWs", who: "walt", kind: "notes", stamp: "CREW HIRED",
      prompt: "“My crew is German POWs. Farms out West have braceros from Mexico. Read both files. Why are they here?”",
      options: ["Farms needed more hands than they could find", "They had asked to move to the U.S. for good", "A law said every farm had to hire them", "The Army paid farmers to keep them busy"],
      hint: "Both files start with the same problem. What did farms and railroads need?",
      why: "With millions of men in the military, farms and railroads ran short of workers." }
  };
  const CHECK_ORDER = ["c1", "c2", "c3", "c4", "c5", "c6"];

  let lockTimer = null;
  function mountCheck(id, onDone) {
    const q = CHECKS[id];
    const box = $("checkBox");
    if (!box) return;
    box.innerHTML = `<div class="check ${q.kind}"><p class="qlabel">🔍 ${esc(L("Use the evidence to answer"))}</p>${bub(q.who, q.prompt, "ask")}<div class="choices" id="qChoices"></div><p class="msg" id="qMsg" role="status" aria-live="polite"></p></div>`;
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
            let left = LOCK;
            const tick = () => {
              msg.className = "msg try";
              if (left <= 0) { locked = false; msg.textContent = F("Not quite. {h} Try again.", { h: L(q.hint) }); draw(); return; }
              msg.textContent = F("Not quite. {h} The choices will mix up. Try again in {n}…", { h: L(q.hint), n: left });
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
  const checkDone = id => `<div class="check done ${CHECKS[id].kind}"><span class="stamp${justSolved === id ? " slam" : ""}">✔ ${esc(L(CHECKS[id].stamp))}</span><p class="answered">${esc(L(CHECKS[id].options[0]))}</p><p class="why">${esc(L(CHECKS[id].why))}</p></div>`;
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
      b.innerHTML = `<span class="d-ico" aria-hidden="true">${c.icon}</span><b class="d-t">${esc(L(c.title))}</b><span class="d-l">${esc(L(c.label))}</span>
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
    st.phase = 9; save(); render(true);
  }
  function resultHtml(r, stepId) {
    if (!r) return "";
    const title = stepId && st.pickTitles[stepId] ? `<p class="you">${esc(L("You chose:"))} <b>${esc(L(st.pickTitles[stepId]))}</b></p>` : "";
    const text = Array.isArray(r.text) ? r.text : [r.text];
    const body = r.who ? bub(r.who, text[0]) : `<div class="lines">${text.map(t => `<p>${L(t)}</p>`).join("")}</div>`;
    const rev = r.reveal ? (Array.isArray(r.reveal) ? r.reveal : [r.reveal]).map(newWord).join("") : "";
    return `<div class="result flip" id="resultBox">${r.icon ? `<div class="r-big" aria-hidden="true">${r.icon}</div>` : ""}<div class="r-main">${title}<div class="tags">${r.tags || ""}</div>${body}${rev}</div></div>`;
  }
  // A decision step: scene + optional check + decision cards + result.
  function decisionStep(app, o) {
    const body = (o.body || "") + (o.check ? `<div id="checkBox"></div>` : "") + `<div id="choiceBox"></div>`;
    app.innerHTML = scene(Object.assign({}, o, { body }));
    if (o.check) {
      if (!st.done[o.check]) return mountCheck(o.check, solved(o.check));
      $("checkBox").innerHTML = checkDone(o.check);
    }
    if (st.phase === 9) { $("choiceBox").innerHTML = resultHtml(st.result, o.id) + nextBtn(o.nextLabel); wireNext(); return; }
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
      { id: "roast", e: "🥩", name: "Pot roast, 3 lb", red: p.roast[w], d: 2, c: 2 },
      { id: "burger", e: "🍔", name: "Hamburger, 2 lb", red: p.burger[w], d: 2, c: 2 },
      { id: "chops", e: "🍖", name: "Pork chops, 2 lb", red: p.chops[w], d: 1, c: 2 },
      { id: "cheese", e: "🧀", name: "Cheese, 1 lb (mac and cheese)", red: 8, d: 1, c: 2 },
      { id: "salmon", e: "🐟", name: "Canned salmon", red: 8, d: 1, c: 1 },
      { id: "liver", e: "🥘", name: "Beef liver, 2 lb", red: 12, d: 1, c: 0, note: "The kids hate it" },
      { id: "spag", e: "🍝", name: "Canned spaghetti, 2 cans", blue: 16, d: 1, c: 2 },
      { id: "soup", e: "🥫", name: "Canned soup, 2 cans", blue: 12, d: 1, c: 1 },
      { id: "beans", e: "🫘", name: "Dried beans, 2 lb", blue: 8, d: 2, c: 0, note: "Filling but boring" },
      { id: "chicken", e: "🍗", name: "Whole chicken", d: 2, c: 2, note: "Not rationed · last one", out: sold },
      { id: "eggs", e: "🥚", name: "Eggs, 1 dozen", d: 1, c: 1, note: "Not rationed", out: eggsGone },
      { id: "butter", e: "🧈", name: "Butter, 1 lb", red: 8, fat: true },
      { id: "lard", e: "🫙", name: "Lard, 1 lb", red: 5, fat: true }
    ];
    if (week === 2 && st.f.garden) list.push({ id: "garden", e: "🥕", name: "Victory garden vegetables", d: 2, c: 1, note: "From your backyard · free" });
    if (week === 3 && st.f.garden) list.push({ id: "jars", e: "🍅", name: "Home-canned garden jars", d: 2, c: 1, note: "Canned last summer · free" });
    if (week >= 2 && !st.f.reported) list.push({ id: "earl", e: "🕶️", name: "Earl's back-door steaks", d: 2, c: 2, cash: 3, black: true, note: "No stamps · $3 cash · black market" });
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
    1: { kicker: "Chapter 1 · March 1943", title: "Week 1: Shopping Day", say: [["grocer", "Money AND stamps, Mrs. Novak. Red for meat, butter, cheese. Blue for cans."], ["helen", "I need 7 dinners and 1 cooking fat. Unused points expire."]] },
    2: { kicker: "Chapter 2 · July 1943", title: "Week 2: Summer Shopping", say: [["grocer", "Beef costs more points now. The OPA raised them when supplies ran low."], ["helen", "Same job: 7 dinners and 1 cooking fat."]] },
    3: { kicker: "Chapter 3 · January 1944", title: "Week 3: Winter Shopping", say: [["grocer", "Some meat went up again. And no fresh garden food in January."], ["helen", "7 dinners and 1 cooking fat. Let's make it work."]] }
  };
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "+", "+"];
  function renderShop(week, app) {
    const info = SHOP_INFO[week];
    const T = cartTotals(week), R = weekRed(week);
    const redLeft = R - T.red, blueLeft = BLUE_WEEK - T.blue, cashLeft = st.m.cash - T.cash;
    const fills = [];
    T.items.forEach(i => { for (let k = 0; k < (i.d || 0); k++) fills.push(i.e); });
    const plates = [];
    for (let k = 0; k < Math.max(7, Math.min(fills.length, 9)); k++) plates.push(`<span class="plate${k >= 7 ? " extra" : ""}${fills[k] ? " full" : ""}"><i>${fills[k] || ""}</i><small>${esc(L(DAYS[k]))}</small></span>`);
    const stampRow = (left, total, cls) => { const n = Math.round(Math.max(0, left) / total * 12); let h = ""; for (let k = 0; k < 12; k++) h += `<i class="${k < n ? cls : "used"}"></i>`; return `<span class="stamprow" aria-hidden="true">${h}</span>`; };
    const notes = [];
    if (week === 3 && st.f.fatSaved) notes.push(`<p class="bonus">🥓 ${esc(L("Fat drive bonus: +4 red points for the kitchen fat you saved."))}</p>`);
    if (stock(week).some(i => i.out)) notes.push(`<p class="bonus bad">🕶️ ${esc(L("Shelves are thin. Earl's black market is draining the supply."))}</p>`);
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
      const what = i.fat ? L("Cooking fat") : (i.d === 1 ? L("1 dinner") : F("{n} dinners", { n: i.d }));
      const mood = i.fat ? "🍳" : (i.c === 2 ? "😊" : i.c === 1 ? "😐" : "😖");
      const status = i.out ? "" : inCart ? L("In basket · tap to put back") : cantCash ? L("Not enough cash") : cantPts ? L("Not enough points") : tooMany ? L("No room to store more") : "";
      return `<button type="button" class="item${inCart ? " in" : ""}${i.black ? " black" : ""}${i.out ? " out" : ""}" data-id="${i.id}"${dis ? " disabled" : ""} aria-pressed="${inCart}">
        <span class="i-top"><span class="i-e" aria-hidden="true">${i.e}</span><span class="i-mood" aria-hidden="true">${mood}</span></span><span class="i-n">${esc(L(i.name))}</span>
        <span class="i-w">${esc(what)}</span><span class="i-c">${cost.join(" ")}</span>
        ${i.note ? `<span class="i-note">${esc(L(i.note))}</span>` : ""}${status ? `<span class="i-s">${esc(status)}</span>` : ""}${i.out ? `<span class="soldout">${esc(L("SOLD OUT"))}</span>` : ""}</button>`;
    }).join("");
    const body = notes.join("") +
      `<div class="till" aria-live="polite">
        <div class="pts"><span class="ptbig red">🟥 <b id="redLeft">${redLeft}</b> ${esc(L("red left"))}${stampRow(redLeft, R, "r")}</span><span class="ptbig blue">🟦 <b>${blueLeft}</b> ${esc(L("blue left"))}${stampRow(blueLeft, BLUE_WEEK, "b")}</span><span class="ptbig cash">💵 <b>${money(cashLeft)}</b></span></div>
        <div class="table"><div class="plates" aria-label="${esc(F("{n} of 7 dinners", { n: T.d }))}">${plates.join("")}</div>
        <p class="tally">🍽️ ${esc(F("{n} of 7 dinners", { n: T.d }))} · ${T.fat ? "🧈 " + esc(L("fat ✓")) : "🧈 " + esc(L("no fat yet"))}${T.d > 7 ? " · 📦 " + esc(L("more than you need")) : ""}</p></div>
      </div>
      <div class="shelf">${cards}</div>
      ${fict("Point prices are simplified from 1943 OPA charts. Butter at 8 points and liver at 6 points a pound are real.")}
      <div id="checkoutBox"><button type="button" class="go" id="checkoutBtn">🧾 ${esc(L("Check out →"))}</button><p class="msg try" id="shopMsg" role="status"></p></div>`;
    app.innerHTML = scene({ kicker: info.kicker, title: info.title, stage: "st-store", art: "🏪", bubbles: info.say, body });
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
        $("shopMsg").textContent = t.d < 7 ? F("Only {n} of 7 dinners. The family will go hungry some nights. Tap Check out again to go anyway.", { n: t.d }) : L("No cooking fat. Meals will be dry and plain. Tap Check out again to go anyway.");
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
    if (hungry) { fx.strain += Math.ceil(hungry / 2); lines.push(hungry === 1 ? L("🍽️ 1 hungry night this week. Mae cries at bedtime.") : F("🍽️ {n} hungry nights this week. Mae cries at bedtime.", { n: hungry })); }
    else lines.push(L("🍽️ All 7 dinners covered."));
    if (t.happy >= 5) { fx.strain -= 1; lines.push(F("😊 {n} dinners the kids loved. Spirits are up.", { n: t.happy })); }
    else if (t.happy <= 2) { fx.strain += 1; lines.push(L("😖 Mostly plain food. Joey complains at every meal.")); }
    if (!t.fat) { fx.strain += 1; lines.push(L("🧈 No cooking fat. Everything is dry and plain.")); }
    if (t.earl) { fx.cash -= 3; fx.bm += 2; fx.effort -= 3; fx.deal += 1; lines.push(L("🕶️ Earl's steaks: no stamps, and the family feasts. But that meat came out of someone else's fair share, and Earl writes your name in his notebook.")); }
    if (t.d > 7) { fx.effort -= 3; lines.push(L("📦 You bought more than you needed. That's hoarding. It empties shelves for other families.")); }
    st.shops[week] = { dinners: t.d, happy: t.happy, fat: t.fat, earl: t.earl, items: t.items.map(i => i.name).join(", ") || "nothing", icons: t.items.map(i => i.e).join("") };
    const clean = {}; Object.keys(fx).forEach(k => { if (fx[k]) clean[k] = fx[k]; });
    const tags = applyFx(clean);
    const add = []; if (t.earl) add.push(", bought Earl's black-market steaks"); if (t.d > 7) add.push(", hoarded extra");
    addTrail("Week " + week + " shopping: " + t.d + " of 7 dinners" + add.join(""), clean, { k: "Week {w} shopping: {d} of 7 dinners", v: { w: week, d: t.d }, add });
    let rv;
    if (week === 1) rv = "<b>Rationing</b> = limiting how much each person can buy, so scarce goods are shared fairly. You need money AND points.";
    else if (week === 2) rv = stock(2).some(i => i.out) ? "<b>Shortage</b> = when some people cheat or hoard, shelves empty for everyone, even honest families." : "<b>Fair share</b> = rationing only worked if almost every family followed the rules.";
    else rv = "<b>Common good</b> = what's best for everyone, not just your own family.";
    st.result = { tags, text: lines, reveal: rv, icon: "🧾" };
    st.cart = []; st.phase = 9; save(); render(true);
  }
  function shopStep(week, app) {
    if (st.phase !== 9) return renderShop(week, app);
    const info = SHOP_INFO[week];
    const s = st.shops[week] || {};
    app.innerHTML = scene({ kicker: info.kicker, title: F("Week {n} Receipt", { n: week }), stage: "st-home", art: `<span class="dinner">${s.icons || "🍽️"}</span>`, body: resultHtml(st.result) + nextBtn() });
    wireNext();
  }

  // =====================================================================
  //  STEPS
  // =====================================================================
  const S = {};
  // 1 · Dad shipped out
  S[1] = app => {
    const body = `<div class="board-explain">
        <div><span class="be-i">😊</span><b>${esc(L("Family strain"))}</b><small>${esc(L("Hunger and stress. Keep it low."))}</small></div>
        <div><span class="be-i">🌡️</span><b>${esc(L("Town war effort"))}</b><small>${esc(L("How much Cedar Rapids helps win the war. Push it up."))}</small></div>
        <div class="rival"><span class="be-i">🧔</span><b>${esc(L("Your rival: Earl"))}</b><small>${esc(L("Sells meat with no stamps. The bigger his business, the emptier the stores."))}</small></div>
        <div><span class="be-i">💵</span><b>${esc(L("Savings"))}</b><small>${esc(L("The family's cash jar."))}</small></div>
      </div>` +
      realFile(["In 1942, Congress set up a monthly check for soldiers' families. A wife with two kids got about $72 a month."], "Servicemen's Dependents Allowance Act of 1942 (Social Security Bulletin, Dec. 1942)") +
      fict("The Novaks, Earl, Dorothy, and Uncle Walt are made up. Everything in a 📜 Real history box is real.") + nextBtn("Open the ration book →");
    app.innerHTML = scene({ kicker: "Chapter 1 · March 1943 · Cedar Rapids, Iowa", title: "Dad Shipped Out", stage: "st-home",
      art: `<div class="family"><span>👩<small>${esc(L("Helen"))}</small></span><span>🧑<small>${esc(L("Joey, 16"))}</small></span><span>👧<small>${esc(L("Mae, 9"))}</small></span><span class="gone">✉️<small>${esc(L("Frank"))}</small></span></div>`,
      bubbles: [["radio", "March 1943. Frank Novak just shipped out with the Army."], ["helen", "Now I run this house on the Army's check. You make our choices until the war ends."]], body });
    wireNext();
  };
  // 2 · The ration book (check 1)
  S[2] = app => {
    const body = `<div class="book">
        <div class="stamps red"><b>🟥 ${esc(L("Red stamps"))}</b><span>${esc(L("Meat, butter, cheese, canned fish"))}</span><em>${esc(L("16 points per person, per week"))}</em></div>
        <div class="stamps blue"><b>🟦 ${esc(L("Blue stamps"))}</b><span>${esc(L("Canned, dried, and frozen food"))}</span><em>${esc(L("48 points per person, per month"))}</em></div>
        <div class="stamps free"><b>✅ ${esc(L("Not rationed"))}</b><span>${esc(L("Chicken, fresh fish, eggs, milk, bread, fresh vegetables"))}</span><em>${esc(L("but they sell out fast"))}</em></div>
      </div>` +
      `<div class="notice"><span class="pin" aria-hidden="true">📌</span><span class="cap">${esc(L("OPA notice to shoppers, 1943 (paraphrased)"))}</span><p>${esc(L("Rationing makes sure everyone gets a fair share of what's left after the military is fed. Without it, people with more money could buy up everything, and prices would shoot up."))}</p></div>` +
      realFile(["Meat, butter, and cheese rationing started March 29, 1943: 16 red points per person each week. Butter cost 8 points a pound."], "The Perquimans Weekly, March 26, 1943; National Park Service") +
      `<div id="checkBox"></div><div id="after"></div>`;
    app.innerHTML = scene({ kicker: "Chapter 1 · March 1943", title: "The Ration Book", stage: "st-home",
      art: `<div class="mini-book"><span>${esc(L("WAR RATION BOOK"))}</span><div>${[8, 5, 2, 1].map(n => `<i class="r">${n}</i>`).join("")}${[8, 5, 2, 1].map(n => `<i class="b">${n}</i>`).join("")}</div></div>`,
      bubbles: [["helen", "The ration book came! Three of us at home means 48 red points and 36 blue points a week."]], body });
    if (st.done.c1) {
      $("checkBox").innerHTML = checkDone("c1");
      $("after").innerHTML = bubbles([["mae", "Oh. So rich people can't buy up all the meat. That's fair."]]) + nextBtn("Go shopping →");
      wireNext();
    } else mountCheck("c1", solved("c1"));
  };
  S[3] = app => shopStep(1, app);
  // 4 · Gas and the poster (check 2)
  const PROP = "<b>Propaganda</b> = a message built to push people to think or act a certain way, using strong feelings like guilt or fear.";
  const CAR = [
    { icon: "🏈", title: "Joey drives to games", label: "Let Joey drive his friends to the games", sub: "Good for: Joey · Costs: gas, tires", trail: "Let Joey drive to the games", fx: { strain: -1, effort: -5 }, who: "joey",
      result: "Best. Friday. Ever. (Every trip burns rubber the Army needs for trucks and planes.)", reveal: PROP },
    { icon: "🚌", title: "Park it. Bus + carpool", label: "Park the car. Ride the bus, carpool, and give the spare tire to the rubber drive", sub: "Good for: the war · Costs: time, Joey's mood", trail: "Parked the car and gave the spare tire", fx: { strain: 1, effort: 8 }, who: "helen",
      result: "I waited for the bus in the sleet, and Joey's sulking. But that spare tire is rubber for the war now.", reveal: PROP },
    { icon: "🎟️", title: "Sell gas coupons", label: "Sell your extra gas coupons to a neighbor for cash", sub: "Good for: savings · Costs: it's illegal", trail: "Sold gas coupons for cash", fx: { cash: 4, bm: 2, effort: -3, deal: 1 }, who: "earl",
      result: "Selling coupons, Mrs. Novak? That's against the law, you know. Welcome to my world.", reveal: PROP }
  ];
  S[4] = app => decisionStep(app, { id: "car", check: "c2", kicker: "Chapter 1 · April 1943", title: "The Ration Board", stage: "st-office", art: "⛽",
    bubbles: [["clerk", "Here's your “A” sticker: 3 to 4 gallons of gas a week."], ["joey", "Mom! I need the car for Friday games!"]],
    body: `<figure class="poster"><a href="ride-alone-poster.jpg" target="_blank" rel="noopener"><img src="ride-alone-poster.jpg" alt="${esc(L("WWII poster: a man drives a car with a see-through Adolf Hitler in the passenger seat."))}"></a><figcaption>${L("“When you ride ALONE you ride with Hitler!” Weimer Pursell, U.S. government poster, 1943. National Archives (NAID 516143). Tap to enlarge.")}</figcaption></figure>` +
      realFile(["Gas was rationed mostly to save tires. Japan had taken over the places that grew most of the world's natural rubber. Speed limit: 35 mph."], "Office of Price Administration records; National Archives"),
    choices: () => CAR });
  // 5 · Help wanted
  const JOB = [
    { icon: "📻", title: "Take the war job", label: "Take the job. Joey cooks, and Mae goes to a neighbor after school", sub: "Good for: savings, the war · Costs: Helen's energy, no garden", trail: "Helen took the war job at Collins Radio", fx: { cash: 30, effort: 10, strain: 2 }, flag: { job: true }, who: "helen",
      result: "I wire radio parts all day now. The pay helps a lot. But I'm exhausted, and there's no time for a victory garden.",
      reveal: "<b>Rosie the Riveter</b> = the nickname for the millions of women who took war jobs while men were away." },
    { icon: "🥕", title: "Plant a victory garden", label: "Stay home. Dig up the backyard for a big victory garden and take in sewing", sub: "Good for: food without points · Costs: less money", trail: "Planted a big victory garden instead", fx: { cash: 5, effort: 6, strain: 1 }, flag: { garden: true }, who: "mae",
      result: "We dug up the whole yard! Tomatoes, beans, carrots. Less money, but this food costs zero points.",
      reveal: "<b>Victory garden</b> = a home garden that left more canned food for the military. About 20 million families grew one." }
  ];
  S[5] = app => decisionStep(app, { id: "job", kicker: "Chapter 2 · June 1943", title: "Help Wanted", stage: "st-factory", art: "🏭",
    bubbles: [["boss", "We build radios for warplanes and Navy boats. We need workers fast. Six days a week, $25 a week."], ["helen", "But who will cook, garden, and watch Mae?"]],
    body: `<figure class="poster small"><a href="loose-lips-poster.jpg" target="_blank" rel="noopener"><img src="loose-lips-poster.jpg" alt="${esc(L("WWII poster: a ship sinking under black smoke with the words Loose lips might sink ships."))}"></a><figcaption>${L("War plants hung posters like this. Workers couldn't talk about what they built. “Loose lips might sink ships,” House of Seagram, 1941–45. National Archives (NAID 513543).")}</figcaption></figure>` +
      realFile(["Collins Radio grew from about 200 workers in early 1941 to almost 4,000 during the war.", "About 6 million women took war jobs. Many were paid less than men, and many were let go when the war ended."], "Collins Collectors Association, “The War Years”; National WWII Museum") + fict("Helen's pay is a game number."),
    choices: () => JOB });
  // 6 · Earl's back door
  const BLACK = "<b>Black market</b> = buying or selling rationed goods illegally. It takes food out of someone else's fair share.";
  const EARL = [
    { icon: "🥩", title: "Buy the steaks", label: "Buy 2 steaks for $3. The kids deserve a treat", sub: "Good for: the family tonight · Costs: someone else's share", trail: "Bought Earl's black-market steaks", fx: { cash: -3, strain: -1, bm: 2, effort: -3, deal: 1 }, who: "earl",
      result: "Pleasure doing business. I'll just write “Novak” in my little customer notebook.", reveal: BLACK },
    { icon: "🚶", title: "Walk away", label: "Say no thanks and walk away", sub: "Good for: your conscience · Costs: Earl keeps selling", trail: "Said no to Earl", fx: { bm: 1 }, who: "earl",
      result: "Suit yourself. Offer stands. Plenty of other folks are buying.", reveal: BLACK },
    { icon: "📋", title: "Report Earl", label: "Report Earl to the ration board", sub: "Good for: the town · Costs: your neighbors", trail: "Reported Earl to the ration board", fx: { bm: -3, effort: 5, strain: 1 }, flag: { reported: true }, who: "mae",
      result: "Investigators shut Earl down. Now his wife won't talk to Mom, and his daughter won't play with me.", reveal: BLACK }
  ];
  S[6] = app => decisionStep(app, { id: "earl", kicker: "Chapter 2 · July 1943", title: "The Back Door", stage: "st-garage", art: "🚪",
    bubbles: [["helen", "Our red points are almost gone…", "think"], ["earl", "Psst. Mrs. Novak. Steaks. No stamps. Just cash."]],
    body: realFile(["In 1944, the OPA estimated that as much as 17% of the meat sold in the U.S. went through the black market."], "National Park Service, “Meat Rationing on the World War II Home Front”"),
    choices: () => EARL });
  // 7 · Shopping week 2
  S[7] = app => {
    if (st.phase === 0 && !st.f.reported && !st.f.bm7) { st.f.bm7 = true; st.m.bm += 1; clampM(); save(); }
    shopStep(2, app);
  };
  // 8 · Dorothy and the Double V (check 3)
  const DV = "<b>Double V</b> = Black Americans' fight for victory over fascism (dictators like Hitler) overseas AND victory over racism at home.";
  const DOROTHY = [
    { icon: "✍️", title: "Sign and stand with her", label: "Sign Dorothy's complaint and go with her to the plant office", sub: "Good for: Dorothy, the plant · Costs: gossip, stress", trail: "Stood up for Dorothy", fx: { strain: 1, effort: 6 }, who: "dorothy",
      result: "The government's fair-hiring committee took my complaint. I'm on the line now, wiring radios. Thank you, Helen.", reveal: DV },
    { icon: "🤐", title: "Stay out of it", label: "Stay out of it. Helen can't risk trouble right now", sub: "Good for: avoiding trouble · Costs: a trained worker", trail: "Stayed out of Dorothy's fight", fx: { effort: -3 }, who: "dorothy",
      result: "I'm moving to Chicago for a fairer job. This plant just lost a trained worker it badly needed.", reveal: DV }
  ];
  S[8] = app => decisionStep(app, { id: "dorothy", check: "c3", kicker: "Chapter 3 · September 1943", title: "Two Victories", stage: "st-factory", art: "✌️✌️",
    bubbles: [["dorothy", "I trained to wire radios. The boss keeps me on the cleaning crew because I'm Black."], ["dorothy", "I'm filing a complaint. Will you sign it?"]],
    body: `<div class="paper"><p class="masthead">THE PITTSBURGH COURIER</p><span class="cap">${esc(L("Letter by James G. Thompson, Pittsburgh Courier, January 1942 (part)"))}</span><p class="quote">“${esc(L("The first V for victory over our enemies from without, the second V for victory over our enemies from within."))}”</p><p class="gloss">${esc(L("“Enemies from within” = the people keeping racism and segregation going inside the U.S."))}</p></div>` +
      realFile(["In June 1941, President Roosevelt's Executive Order 8802 banned unfair hiring because of race in war factories.", "About 1 million Black Americans served in the military, many in units kept separate by race."], "Pittsburgh Courier, 1942; National Archives"),
    choices: () => DOROTHY });
  // 9 · Bond rally: the Sullivans (check 4)
  S[9] = app => {
    const body = `<div class="memorial"><p class="m-h">⭐⭐⭐⭐⭐ ${esc(L("Real Iowans: the Sullivans of Waterloo"))}</p>
        <p>${esc(L("On November 13, 1942, all five Sullivan brothers died when their ship, the USS Juneau, sank in the Pacific."))}</p>
        <p>${esc(L("Their parents, Tom and Alleta, then visited more than 200 war plants and shipyards. By January 1944 they had spoken to over a million workers in 65 cities."))}</p>
        <p class="src">${esc(L("Source:"))} ${L("Naval History and Heritage Command, “Alleta Sullivan: A Navy Mom Like No Other”")}</p></div>` +
      `<div id="checkBox"></div><div id="after"></div>`;
    app.innerHTML = scene({ kicker: "Chapter 3 · September 1943", title: "The Bond Rally", stage: "st-rally", art: `<div class="thermo-big"><span style="height:${Math.max(8, st.m.effort)}%"></span></div>`,
      bubbles: [["speaker", "Cedar Rapids, our bond thermometer needs you! Let me tell you about a family from Waterloo."]], body });
    if (st.done.c4) {
      $("checkBox").innerHTML = checkDone("c4");
      $("after").innerHTML = newWord("<b>Civic virtue</b> = putting the good of your community and country ahead of yourself.") + nextBtn("Go to the bond booth →");
      wireNext();
    } else mountCheck("c4", solved("c4"));
  };
  // 10 · The bond pledge (check 5)
  const BOND = "<b>War bond</b> = a loan to the government to pay for the war. About 85 million Americans bought them.";
  function bondChoices() {
    const short = st.m.cash < 18.75;
    return [
      { icon: "💵", title: "Buy a $25 bond", label: short ? "Buy a $25 bond for $18.75 (you're short, so skip Mae's birthday and Joey's new shoes)" : "Buy a $25 war bond for $18.75", sub: short ? "Good for: the war · Costs: all your savings, the kids' mood" : "Good for: the war · Costs: most of your savings", trail: "Bought a $25 war bond",
        fx: () => short ? { cash: -st.m.cash, strain: 2, effort: 12 } : { cash: -18.75, effort: 12 }, who: "speaker",
        result: "Look at that thermometer jump! Your money builds planes and tanks now, and the bond pays you $25 in ten years.", reveal: BOND },
      { icon: "📒", title: "Buy war stamps", label: "Buy 20 ten-cent war stamps for Mae's stamp book ($2)", sub: "Good for: a little help · Costs: a little cash", trail: "Bought war stamps for Mae", fx: { cash: -2, effort: 5 }, who: "mae",
        result: "I lick each stamp into my book. When it's full, we can trade it for a bond!", reveal: BOND },
      { icon: "🚫", title: "Skip the drive", label: "Skip it. The family needs every dollar", sub: "Good for: savings · Costs: the town's goal", trail: "Skipped the bond drive", fx: { effort: -3 }, who: "speaker",
        result: "Folks, the thermometer barely moved. Cedar Rapids is falling behind its goal.", reveal: BOND }
    ];
  }
  S[10] = app => decisionStep(app, { id: "bond", check: "c5", kicker: "Chapter 3 · September 1943", title: "The Bond Booth", stage: "st-rally", art: "🏦",
    bubbles: [["clerk", "Step right up. Here's what a bond looks like."]],
    body: `<div class="bond"><p class="b-top">${esc(L("U.S. WAR SAVINGS BOND · SERIES E"))}</p><div class="b-row"><div><small>${esc(L("You pay now"))}</small><b>$18.75</b></div><div class="b-arrow">→ 🕙 ${esc(L("10 years"))} →</div><div><small>${esc(L("You get back"))}</small><b>$25.00</b></div></div><p class="b-note">${esc(L("The government spends your money on the war right now."))}</p></div>` +
      realFile(["A $25 Series E bond cost $18.75 and paid back the full $25 after 10 years."], "U.S. Treasury; National WWII Museum"),
    choices: bondChoices });
  // 11 · Scrap and fat drive
  const TW = "<b>Total war</b> = the whole country works to win, not just soldiers: farms, factories, kitchens, and kids.";
  const SCRAP = [
    { icon: "🦾", title: "Go all in", label: "Go all in: save every drop of kitchen fat, and haul the old iron porch rail to school", sub: "Good for: the war, next week's points · Costs: time and sweat", trail: "Went all in on the scrap and fat drive", fx: { effort: 8, strain: 1 }, flag: { fatSaved: true }, who: "mae",
      result: "We WON the week! And Mom's coffee can of grease earns red points at the butcher.", reveal: TW },
    { icon: "🥫", title: "Give tin cans", label: "Give the easy stuff: a box of flattened tin cans", sub: "Good for: a little help · Costs: not much", trail: "Gave only tin cans", fx: { effort: 4 }, who: "mae",
      result: "It helped a little. We finished in the middle.", reveal: TW },
    { icon: "🛋️", title: "Skip it", label: "Skip it this time. Everyone's worn out", sub: "Good for: rest · Costs: the drive", trail: "Skipped the scrap drive", fx: { strain: -1, effort: -3 }, who: "mae",
      result: "We lost to Marion. I'm so mad! …The quiet weekend was nice, though.", reveal: TW }
  ];
  S[11] = app => decisionStep(app, { id: "scrap", kicker: "Chapter 3 · December 1943", title: "Scrap and Fat Drive", stage: "st-school", art: "🔩",
    bubbles: [["mae", "Mom! My school is racing the Marion schools to collect scrap metal!"], ["butcher", "And I pay for used cooking fat now. Fat helps make explosives."]],
    body: realFile(["Starting December 13, 1943, shoppers got 2 red points and 4 cents for every pound of used kitchen fat they turned in."], "Office of Price Administration, 1943") + fict("The school race is made up."),
    choices: () => SCRAP });
  // 12 · Shopping week 3
  S[12] = app => {
    if (st.phase === 0 && !st.f.reported && !st.f.bm12) { st.f.bm12 = true; st.m.bm += 1; clampM(); save(); }
    shopStep(3, app);
  };
  // 13 · Harvest hands (check 6)
  const BRAC = "<b>Bracero Program</b> = a 1942 deal that brought Mexican workers to U.S. farms and railroads. They were promised fair pay and housing, but many didn't get it.";
  const HARVEST = [
    { icon: "🏭", title: "Quit school, work the plant", label: "Joey quits school to work full time at the plant", sub: "Good for: savings, the war · Costs: Joey's education", trail: "Joey quit school for a war job", fx: { cash: 20, effort: 8, strain: 1 }, flag: { joeyQuit: true }, who: "joey",
      result: "Real money, Mom! …Lots of guys left school for war jobs. Some say they'll never go back.", reveal: BRAC },
    { icon: "🌽", title: "Harvest, then school", label: "Joey works the harvest on Uncle Walt's farm beside the POW crew, then goes back to school", sub: "Good for: the harvest · Costs: Joey gone all summer", trail: "Joey worked the harvest, then went back to school", fx: { cash: 5, effort: 6, strain: 1 }, who: "walt",
      result: "Joey picked corn next to German prisoners his own age. The crop got in, and he's back in class by fall.", reveal: BRAC },
    { icon: "🏠", title: "Stay home, help Mom", label: "Joey stays in Cedar Rapids and helps Helen at home", sub: "Good for: the family · Costs: Walt's harvest", trail: "Joey stayed home to help", fx: { strain: -1, effort: 1 }, who: "walt",
      result: "We made do with the POW crew. But some of my corn rotted in the field.", reveal: BRAC }
  ];
  S[13] = app => decisionStep(app, { id: "harvest", check: "c6", kicker: "Chapter 4 · August 1944", title: "Harvest Hands", stage: "st-farm", art: "🌽", nextLabel: "See how the war ends →",
    bubbles: [["walt", "I can't find enough workers near Algona. My corn could rot in the field. Can Joey come help?"], ["joey", "Or… I could quit school and work at the plant full time."]],
    body: `<div class="files">
        <div class="folder"><span class="tab">${esc(L("File 1 · The Bracero Program, 1942"))}</span><p>${esc(L("Farms and railroads needed workers fast. In 1942, the U.S. and Mexico agreed to bring Mexican men to work. “Bracero” means “one who works with his arms.” They were promised fair pay and good housing. Many got low pay and bad housing instead."))}</p></div>
        <div class="folder"><span class="tab">${esc(L("File 2 · Iowa's POW camps, 1944"))}</span><p>${esc(L("Iowa farms were short on workers too. German prisoners of war from Camp Algona and Camp Clarinda picked corn and worked in canning factories. By law (the Geneva Convention) they had to be treated fairly and paid, about 80 cents a day in camp coupons."))}</p></div>
      </div>` +
      realFile(["About 4.6 million bracero work contracts were signed from 1942 to 1964. Part of their pay was held back, and many workers never got it."], "National Archives; Camp Algona POW Museum"),
    choices: () => HARVEST });

  // 14 · Ending (newspaper front page)
  const ENDINGS = {
    busted: { e: "🚨", title: "Busted", text: ["In 1944, OPA investigators caught Earl. His notebook had a list of customers, and the Novaks were on it.", "The ration board cut the family's stamps, and the story made the paper. Rationing only worked when almost everyone played fair."] },
    burned: { e: "🔥", title: "Hero, but Burned Out", text: ["Cedar Rapids beat its goals, and the Novaks did more than their share.", "But Helen got sick from exhaustion, and the kids barely saw her. Sacrifice for the common good was real, and so was its cost."] },
    together: { e: "🏅", title: "Pulled Together", text: ["The Novaks gave up a lot, but they held together. The town beat its bond goal.", "When Frank came home, Helen had a story for every stamp in the book."] },
    selfish: { e: "🪞", title: "Looking Out for Number One", text: ["The Novaks stayed comfortable. But the town fell short, and neighbors noticed who didn't pitch in.", "The war effort needed every family, not just some."] },
    middle: { e: "🙂", title: "Got By", text: ["The Novaks did part of their share and made it through, tired but okay.", "The town reached most of its goals. Millions of real families landed right about here."] }
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
    const trail = st.trail.filter(t => Object.keys(t.fx).length).map(t => `<li><span>${esc(trailText(t))}</span><span class="tags">${fxTags(t.fx)}</span></li>`).join("");
    const body = `<div class="front ${k}"><p class="masthead">THE CEDAR RAPIDS HOME FRONT GAZETTE</p><p class="dateline">${esc(L("August 1945 · The war is over"))}</p>
        <div class="headline"><span class="e-big" aria-hidden="true">${E.e}</span><div><p class="kicker">${esc(L("Your ending"))}</p><h3>${esc(L(E.title))}</h3></div></div>
        ${E.text.map(t => `<p>${esc(L(t))}</p>`).join("")}
        <div class="finalm"><span>🏠 ${esc(L("Strain"))} <b>${st.m.strain}/10</b></span><span>🌡️ ${esc(L("War effort"))} <b>${st.m.effort}%</b></span><span>🕶️ ${esc(L("Black market"))} <b>${st.m.bm}/10</b></span><span>💵 <b>${money(st.m.cash)}</b></span></div>
        <h4 class="cb">${esc(L("Caused by:"))}</h4><ul class="trail">${trail}</ul></div>` +
      `<div class="left-out"><p class="real-h">⚖️ ${esc(L("Not everyone got the same home front"))}</p><p>${esc(L("Black workers like Dorothy had to fight for fair jobs. Braceros were promised fair pay and many didn't get it. Next class: the Japanese Americans who were forced from their homes."))}</p></div>` +
      realFile(["War jobs ended the Great Depression. Unemployment fell from about 14.6% in 1940 to about 1.2% in 1944.", "Gas and canned-food rationing ended in August 1945, when the war ended. Meat and butter rationing ended that November."], "U.S. Bureau of Labor Statistics; Office of Price Administration") +
      newWord("<b>Common good</b> = what's best for everyone. On the home front, it meant giving up comfort so the whole country could win.") + nextBtn("Write your report →");
    app.innerHTML = scene({ kicker: "August 1945 · The war is over", title: "The Novaks' Home Front", stage: "st-parade", art: "🎉", bubbles: [["radio", "The war is over! Rationing is ending. Frank is coming home."]], body });
    wireNext();
  };

  // 15 · Writing + turn in (V-Mail letter to Frank)
  const PROMPTS = [
    { id: "change", short: "Bracero Program or POW camps", label: "1. Pick one: the Bracero Program or Iowa's POW camps. How did it change life in the U.S.? Was it fair?",
      stem: "___ changed life in the U.S. because ___. It was fair / unfair because ___.", min: 60, newWords: 6,
      mustAll: [["bracero", "mexic", "pow", "prisoner", "algona", "clarinda", "german", "camp"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name the Bracero Program or the POW camps and explain with “because.”" },
    { id: "sacrifice", short: "Hardest sacrifice and the war effort", label: "2. What was the Novaks' hardest sacrifice in your game? How did it help the war effort or the common good?",
      stem: "The hardest sacrifice was ___. It helped the war effort because ___.", min: 60, newWords: 6,
      mustAll: [["ration", "point", "stamp", "meat", "steak", "earl", "black market", "garden", "job", "work", "radio", "car", "gas", "tire", "bond", "scrap", "fat", "dorothy", "joey", "school", "farm", "harvest", "money", "food"], ["because", "since", "so "]],
      mustMsg: "In answer 2, name the sacrifice (like the car, the job, the bond, or Earl) and explain with “because.”" }
  ];
  S[15] = app => {
    const E = ENDINGS[st.ending || endingKey()];
    const body = `<div class="vmail"><p class="vm-h">✉️ V-MAIL · ${esc(L("To: Pvt. Frank Novak, U.S. Army, overseas"))}</p>
      <p class="vm-sub">${esc(L("Write Frank about home. Answer both parts in 1–2 full sentences. Use facts from today."))}</p>` +
      PROMPTS.map(p => `<label for="w_${p.id}">${esc(L(p.label))}</label><p class="stem">${esc(L("Start with:"))} ${esc(L(p.stem))}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea>`).join("") +
      `<label for="nameBox2" class="namel">${esc(L("Your name: first name + last initial (like Jordan M.)"))}</label><input id="nameBox2" maxlength="60" autocomplete="off" value="${esc(st.name)}">` +
      `<button type="button" class="go" id="sendBtn">📮 ${esc(L(st.turnedIn ? "Turn in again" : "Turn in"))}</button><p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? esc(L("✓ Turned in. You can fix your writing and turn it in again.")) : ""}</p></div>`;
    app.innerHTML = scene({ kicker: "Last step", title: "Write to Frank", stage: "st-home", art: "✉️",
      bubbles: [["helen", F("Our ending: {e} {t}. Help me tell Frank what home was like.", { e: E.e, t: L(E.title) })]], body });
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = sendWork;
  };

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  async function sendWork() {
    const msg = $("sendMsg");
    const bad = t => { msg.textContent = t; msg.className = "msg try"; };
    const nm = window.classShortName ? window.classShortName($("nameBox2").value) : $("nameBox2").value.trim();
    if (!/^\S+ [A-Z]\.$/.test(nm)) { bad(L("Type your first name and last initial, like Jordan M.")); $("nameBox2").focus(); return; }
    st.name = nm; save();
    for (const p of PROMPTS) {
      const box = $("w_" + p.id), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: L(p.stem), source: "from today", sourceEs: "de hoy" });
        if (junk) { bad(F("For {s}: ", { s: L(p.short) }) + junk); return; }
      }
      if (v.length < p.min) { bad(F("Write a little more for: {s} (1–2 full sentences).", { s: L(p.short) })); box.focus(); return; }
      if (/_{2,}/.test(v)) { bad(F("Fill in the blanks with your own words for: {s}.", { s: L(p.short) })); box.focus(); return; }
      const stemText = p.stem + " " + L(p.stem);
      const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < p.newWords) { bad(F("Add more of your own ideas for: {s}. Use details from today.", { s: L(p.short) })); box.focus(); return; }
      let groups = p.mustAll;
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) { bad(L(p.mustMsg)); box.focus(); return; }
    }
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
      msg.innerHTML = `<span class="stamp slam">📮 ${esc(L("MAILED"))}</span> ${esc(L("✓ Turned in! Your teacher can see your work. You're done."))}`; msg.className = "msg good";
      $("sendBtn").textContent = L("✓ Turned in");
    } catch (err) { msg.textContent = err.message || L("Could not turn in. Try again."); msg.className = "msg try"; $("sendBtn").disabled = false; }
  }

  // =====================================================================
  //  TITLE SCREEN + RENDER
  // =====================================================================
  function title(app) {
    app.innerHTML = `<section class="title-card">
      <div class="t-grid"><div class="t-left">
        <p class="t-kick">${esc(L("U.S. History · Unit 2 · Day 4 · World War II"))}</p>
        <h1>${esc(L("Hold the Home Front"))}</h1>
        <p class="hook">${esc(L("It's 1943. Dad's at war, meat is rationed, and the neighbor is selling steaks out of his garage."))}</p>
        <div class="t-chips"><span>🛒 ${esc(L("Run the Novak family's ration book from 1943 to 1945"))}</span><span>⚖️ ${esc(L("7 tough choices + 3 shopping trips. 6 evidence checks unlock the way."))}</span><span>⏱️ ${esc(L("About 25 minutes"))}</span></div>
        <p class="goal"><b>${esc(L("Today's goal:"))}</b> ${esc(L("Explain how rationing, war bonds, and war jobs helped win the war at home, and who was treated unfairly."))}</p>
        <div class="t-start"><label for="nameBox">${esc(L("Your name: first name + last initial (like Jordan M.)"))}</label>
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
      const target = $("resultBox") || $("after") || $("choiceBox");
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
})();
