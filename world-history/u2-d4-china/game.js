// =====================================================================
//  PAPER HARVEST  (World History Unit 2 Day 2 · WH.34, WH.35, WH.38)
//  The student leads a made-up village work team in Mao's China, 1958–1966.
//  Core loop: split workers between fields and steel furnaces, then FILE A HARVEST REPORT.
//  The state takes 40% of the REPORTED number, so a bigger (fake) number = less food.
//  Secretary Gao (the rival) wants big numbers; a low (honest) report raises Danger.
//  Danger 10 in 1959–60 = purged as a "rightist" (the replacement files the fake number anyway).
//  Control methods (propaganda, purge, censorship, secret police, cult of personality) flip up as Gao uses them.
//  5 evidence checks woven in. 6 real decisions. 3 endings + a 1966 line. Strict order. Saves on this device.
//  Turn-in goes through shared/turnin.js (same id and payload shape as shared/unit-game.js).
//  Made up: the player, Gao, Old Fan, the village, Red Flag / East Wind teams, all village numbers.
//  Real: slogans, events, and national numbers (sources shown in small gray lines on screen).
// =====================================================================
(function () {
  "use strict";
  const KEY = "wh-u2-d4-china-v2";
  const ASSIGNMENT_ID = "wh-u2-d4-china";
  const TITLE = "World History · Unit 2 · Day 2 · Paper Harvest: Can One Leader Remake a Country?";
  const STANDARD = "SS.9-12.WH.34, SS.9-12.WH.35, SS.9-12.WH.38";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, TOTAL = 13, NEED = 40, RATE = 0.4, T58 = 150, T59 = 200;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs());
  const tr = s => (window.SiteLang ? window.SiteLang.t(s) : s);
  const app = $("app");

  // ---------------- State ----------------
  const fresh = () => ({ v: 2, name: "", step: 0, food: 30, danger: 2, trust: 5, hungry: 0, purged: 0, tools: {}, checks: {},
    F: null, y58: null, lushan: false, search: null, hidden: 0, y59: null, letter: null, cut: false, y60: null, cr: null,
    atWrite: false, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 2) st = fresh();
  // Shared Chromebooks: a different student is signed in on this device now, so never show the last kid's game.
  try {
    const short = window.classShortName || (x => String(x || "").trim());
    const nowName = short(localStorage.getItem("site-student-name") || "");
    if (st.name && nowName && short(st.name).toLowerCase() !== nowName.toLowerCase()) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });

  // ---------------- Control methods (Gao's toolkit) ----------------
  const TOOLS = [["prop", "📣", "Propaganda"], ["purge", "🧹", "Purge"], ["cens", "✂️", "Censorship"], ["spy", "🕵️", "Secret police"], ["cult", "🖼️", "Cult of personality"]];
  function flip(k) { if (!st.tools[k]) { st.tools[k] = true; save(); hud(k); } }

  // ---------------- HUD ----------------
  const YEARS = ["", "1958", "1949", "1958", "1958", "1959", "1959", "1959", "1960", "1961", "1966", "1966", "1981", "1981"];
  let prev = null;
  function pop(el, d) {
    if (!el || !d) return;
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
    const s = document.createElement("span"); s.className = "delta " + (d > 0 ? "up" : "down"); s.setAttribute("aria-hidden", "true");
    s.textContent = (d > 0 ? "+" : "") + d; el.appendChild(s); setTimeout(() => s.remove(), 1700);
  }
  function hud(newTool) {
    $("hud").hidden = st.step < 1;
    if (st.step < 1) return;
    $("stepPill").textContent = "Step " + Math.min(st.step, TOTAL) + " of " + TOTAL;
    $("yearPill").textContent = "📅 " + YEARS[Math.min(st.step, TOTAL)];
    $("foodBar").style.width = clamp(st.food, 0, 100) + "%"; $("foodNum").textContent = st.food;
    $("dangerBar").style.width = st.danger * 10 + "%"; $("dangerNum").textContent = st.danger;
    $("trustBar").style.width = st.trust * 10 + "%"; $("trustNum").textContent = st.trust;
    const out = !!st.purged;
    $("gaoChip").classList.toggle("out", out);
    $("gaoFace").textContent = out ? "🚫" : st.danger <= 3 ? "😊" : st.danger <= 6 ? "😐" : "😠";
    $("gaoMood").textContent = out ? "You're out" : st.danger <= 3 ? "pleased" : st.danger <= 6 ? "watching you" : "suspicious";
    const H = $("houses");
    if (!H.children.length) H.innerHTML = `<span class="hl">🏠 Village</span>` + Array.from({ length: 10 }, () => `<i aria-hidden="true">🏠</i>`).join("") + ` <span class="hl" id="hungryTxt"></span>`;
    H.querySelectorAll("i").forEach((h, i) => {
      const was = h.classList.contains("hungry"), now = i >= 10 - st.hungry;
      h.classList.toggle("hungry", now); if (now && !was && prev) { h.classList.remove("hit"); void h.offsetWidth; h.classList.add("hit"); }
    });
    $("hungryTxt").textContent = st.hungry ? "🥣 " + st.hungry + " hungry" : "";
    $("tools").innerHTML = `<span class="tl">Control methods:</span>` + TOOLS.map(([k, ic, n]) => st.tools[k] ? `<span class="tool on" title="${n}" ${k === newTool ? "" : 'style="animation:none"'}>${ic} <span class="tn">${n}</span></span>` : `<span class="tool" aria-label="Not found yet">❔</span>`).join("");
    if (prev) { pop($("mFood"), st.food - prev.food); pop($("mDanger"), st.danger - prev.danger); pop($("mTrust"), st.trust - prev.trust); }
    prev = { food: st.food, danger: st.danger, trust: st.trust };
  }

  // ---------------- Pieces ----------------
  function card() { app.innerHTML = `<section class="card" id="stepCard"></section>`; return $("stepCard"); }
  const banner = (yr, place, em, cls) => `<div class="banner ${cls || ""}"><div><span class="yr">${yr}</span><br><span class="place">${place}</span></div><div class="em" aria-hidden="true">${em}</div></div>`;
  const say = (who, av, avCls, text, mad) => `<div class="say"><div class="av ${avCls}" aria-hidden="true">${av}</div><div class="bubble ${mad ? "mad" : ""}">${who ? `<span class="who">${who}</span>` : ""}<span>${text}</span></div></div>`;
  const reveal = (term, text) => `<p class="reveal"><span class="term">${term}</span><span>${text}</span></p>`;
  const src = t => `<p class="src">${t}</p>`;
  function nextBtn(box, label, fn) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn"; b.textContent = label;
    b.onclick = fn || (() => { st.step++; save(); render(); window.scrollTo(0, 0); });
    box.appendChild(b); return b;
  }
  function scrollToEl(el) { if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60); }
  const fxSpan = ([t, cls]) => `<span class="${cls || ""}">${t}</span>`;

  // Decision cards. list: [{k, ic, t, d, fx:[[text, "good"|"bad"]]}]
  function cards(box, list, picked, onPick) {
    const wrap = document.createElement("div"); wrap.className = "decide";
    list.forEach(c => {
      const b = document.createElement("button"); b.type = "button"; b.className = "dcard" + (picked === c.k ? " sel" : "");
      b.innerHTML = `<span class="ic" aria-hidden="true">${c.ic}</span><span class="ct">${c.t}</span>${c.d ? `<span class="cd">${c.d}</span>` : ""}<span class="fx">${(c.fx || []).map(fxSpan).join("")}</span>`;
      if (picked != null) b.disabled = true;
      else b.onclick = () => onPick(c.k);
      wrap.appendChild(b);
    });
    box.appendChild(wrap); return wrap;
  }

  // ---------------- Evidence checks ----------------
  // options[0] is right; the screen always shuffles. std feeds the dashboard's mastery data.
  const CHECKS = {
    c49: { std: "WH.34", short: "Why China going communist alarmed the U.S.", stamp: "FILED",
      ask: "Why are U.S. leaders alarmed?",
      options: ["China had the most people, and went communist", "China had just attacked U.S. bases in Japan", "China had more nuclear bombs than the U.S. did", "China had joined the Warsaw Pact military alliance"],
      hint: "Look at the two red boxes.", reveal: ["Domino theory", "Americans feared communism would spread country to country."] },
    cPoster: { std: "WH.35", short: "Poster = propaganda", stamp: "LABELED",
      ask: "Stamp a label on Gao's poster.",
      options: ["Propaganda: one-sided message to win support", "Censorship: banning news the party dislikes", "Secret police: agents who spy on people", "Purge: removing members who disagree"],
      hint: "The poster pushes one message to everyone.", reveal: ["Propaganda", "Posters, radio, songs: one message, everywhere."] },
    cLushan: { std: "WH.35", short: "Lesson of Peng's purge", stamp: "NOTED",
      ask: "What did team leaders learn?",
      options: ["Report good news, even if it's fake", "Report problems, and leaders will fix them", "Ask the Soviet Union for more food", "Vote Mao out at the next election"],
      hint: "What happened to Peng for reporting problems?", reveal: ["Purge", "removing party members who disagree."] },
    cData: { std: "WH.38", short: "Main cause of the famine", stamp: "REPORT FILED",
      ask: "Why did millions starve?",
      options: ["The state took grain based on fake numbers", "Farmers grew too much rice to store it", "U.S. bombers destroyed China's farms", "Villages refused to eat in dining halls"],
      hint: "Compare the paper number with the real harvest.", reveal: ["Man-made famine", "15 to 45 million people died, 1959–1961."] },
    cCompare: { std: "WH.35", short: "How Mao's control differed from the Stasi", stamp: "COMPARED",
      ask: "How was Mao's control different from the Stasi's?",
      options: ["Ordinary people attacked others in public", "China let several parties run for office", "China banned all posters and slogans", "Chinese papers were free to criticize Mao"],
      hint: "Secret or public? Compare the two files.", reveal: ["Struggle session", "a public meeting to shame someone."] }
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
      area.innerHTML = `<button type="button" class="opt yes" disabled>${C.options[0]}</button>`;
      d.insertAdjacentHTML("afterbegin", `<span class="stamp">${C.stamp}</span>`);
      d.insertAdjacentHTML("beforeend", reveal(C.reveal[0], C.reveal[1]));
    }
    function draw() {
      area.innerHTML = "";
      // A fresh order every time (after a wrong try it must look different).
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
              fb.textContent = "Not quite. " + C.hint + " The choices will mix up. Try again in " + left + "…"; fb.className = "msg bad";
              if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + C.hint + " Try again."; draw(); return; }
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

  // ---------------- Game math ----------------
  const real58 = () => 40 + 10 * st.F;
  const real59 = () => 40 + 5 * st.F;
  const REAL60 = 60;
  const capDanger = () => { st.danger = clamp(st.danger, 0, 9); };
  function dangerFor(R, T) { return R >= T ? -1 : Math.ceil((T - R) / 40); }
  function eatYear(real, extra, rawTake) {
    const have = st.food + real + extra;
    const take = Math.min(rawTake, have);
    let left = have - take - NEED, hungryAdd = 0;
    if (left < 0) { hungryAdd = Math.min(10 - st.hungry, Math.ceil(-left / 5)); left = 0; }
    st.hungry += hungryAdd; st.food = left;
    return { take, left, hungryAdd };
  }

  // ---------------- Steps ----------------
  function title() {
    $("hud").hidden = true;
    app.innerHTML = `<section class="card titlecard">
      <div>
        <h1>Paper Harvest</h1>
        <p class="hook">China, 1958. Your village's food depends on one number.</p>
        <ul class="how"><li>🌾 Run a farm team</li><li>📝 Report the harvest</li><li>😠 Face the boss</li></ul>
        <p class="meta">⏱ About 25 min · 🔎 5 evidence checks · ✍️ 2 short answers</p>
        <p class="goal">🎯 Explain how Mao's China controlled people, and what it cost.</p>
        <p class="heads">⚠️ Includes a real famine.</p>
        <label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">🌾 Start</button>
      </div>
      <div class="art" aria-hidden="true">
        <div class="form-art"><div class="fh">HARVEST REPORT</div><div class="fn"><s>80</s>300</div><div>🌾🌾🌾 → 🚚🚚🚚</div></div>
        ${say("Sec. Gao", "😠", "gao", "Make it bigger.")}
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; save(); render(); window.scrollTo(0, 0);
    };
  }

  // Step 2 · Flashback to 1949: China turns communist (WH.34). Comes after the first play moment (furnaces).
  function s1() {
    const box = card();
    box.innerHTML = banner("Flashback: 1949", "Beijing", "🏮🚩", "red") + `<h2>China turns communist</h2>`;
    checkBox(box, "c49", `<p class="headline paper">OCT. 1, 1949: MAO'S COMMUNISTS WIN CHINA</p>
      <div class="chips"><span class="chip red">🟥 China: most people</span><span class="chip red">🟥 USSR: most land</span></div>
      ${src("Nationalists fled to Taiwan. Source: class slides; New York Times map, 1955.")}`, "📟 Telegram to Washington", () => { nb(); });
    function nb() { scrollToEl(nextBtn(box, "🌾 Back to 1958 →")); }
    if (chk("c49").done) nextBtn(box, "🌾 Back to 1958 →");
  }

  // Step 3 · Poster = propaganda (WH.35)
  function s2() {
    const box = card();
    box.innerHTML = banner("1958", "Your village · Henan", "🏘️🌾") +
      say("Sec. Gao", "😊", "gao", "Hang this in every home!");
    checkBox(box, "cPoster", `<div class="poster"><div class="sun" aria-hidden="true">☀️</div><div class="zh" lang="zh" data-no-es>超英赶美</div><div class="en">“Overtake Britain, catch up with America!”</div></div>
      ${src("Real slogan of the Great Leap Forward (chāo Yīng gǎn Měi): beat Britain's steel output in 15 years.")}`, "📌 Gao's new poster", () => { flip("prop"); nb(); });
    function nb() { scrollToEl(nextBtn(box, "📝 Write the harvest report →")); }
    if (chk("cPoster").done) { flip("prop"); nextBtn(box, "📝 Write the harvest report →"); }
  }

  // Step 1 · Fields vs. furnaces (decision 1). The game opens with play.
  let draftF = 5;
  function s3() {
    const box = card();
    box.innerHTML = banner("Fall 1958", "Your village · Henan", "🌾🔥🏭") + say("Sec. Gao", "😤", "gao", "Mao says leap forward! Send 6 workers to the furnaces!");
    if (st.F == null) {
      const area = document.createElement("div"); box.appendChild(area);
      const draw = () => {
        const furn = 10 - draftF, short = Math.max(0, 6 - furn);
        area.innerHTML = `<p class="tip">👆 Tap a worker to move them.</p>
          <div class="board">
            <div class="zone fields"><div class="zh"><span>🌾 Fields</span><b>${draftF}</b></div><div class="workers" id="wF"></div></div>
            <div class="zone furn"><div class="zh"><span>🔥 Furnaces</span><b>${furn}</b></div><div class="workers" id="wS"></div></div>
          </div>
          <div class="preview"><span class="pv">🌾 Harvest: <b>${40 + 10 * draftF}</b></span><span class="pv">${short ? "😠 Gao: " : "😊 Gao: "}<b>${short ? "−" + short : "✓"}</b></span><span class="pv">🔥 Danger: <b>${short ? "+" + Math.min(3, short) : "0"}</b></span></div>`;
        const mk = (where, n, toField) => { for (let i = 0; i < n; i++) { const b = document.createElement("button"); b.type = "button"; b.className = "worker"; b.textContent = toField ? "👷" : "🧑‍🌾"; b.setAttribute("aria-label", toField ? "Worker at a furnace. Move to fields." : "Worker in the fields. Move to a furnace."); b.onclick = () => { draftF = clamp(draftF + (toField ? 1 : -1), 0, 10); draw(); const f = area.querySelector(toField ? "#wF .worker" : "#wS .worker"); if (f) f.focus(); }; where.appendChild(b); } };
        mk($("wF"), draftF, false); mk($("wS"), furn, true);
      };
      draw();
      const go = nextBtn(box, "📢 Send them to work", () => {
        st.F = draftF; const short = Math.max(0, 6 - (10 - st.F));
        st.danger += Math.min(3, short); capDanger(); save(); render(); scrollToEl($("res3"));
      });
      go.id = "sendWork";
      return;
    }
    const furn = 10 - st.F, ok = furn >= 6;
    box.insertAdjacentHTML("beforeend", `<div class="result" id="res3"><span class="stamp slam ${ok ? "" : "red"}">${ok ? "QUOTA MET" : "QUOTA MISSED"}</span>
      <div class="chips"><span class="chip">🌾 ${st.F}</span><span class="chip">🔥 ${furn}</span><span class="chip">🍚 Harvest: ${real58()}</span></div>
      <p>Farmers melted pots and tools. Much of the steel was useless.</p></div>` +
      reveal("Great Leap Forward", "Mao's 1958 rush to build industry fast.") +
      src("Real: millions of farmers made steel in backyard furnaces in 1958. Source: class slides; Britannica."));
    nextBtn(box, "📜 Flashback: 1949 →");
  }

  // Report form (decisions 2 and 4)
  let draftR = null;
  function reportStep(year) {
    const is58 = year === 1958;
    const real = is58 ? real58() : real59(), T = is58 ? T58 : T59;
    const done = is58 ? st.y58 : st.y59;
    const box = card();
    box.innerHTML = banner(is58 ? "1958" : "1959", "Harvest report", is58 ? "📋🌾" : "📋🥀", is58 ? "" : "gray") +
      (is58 ? `<p class="big"><b>The state takes 40% of what you REPORT.</b></p>` + src("Game rule. Real: the state took 26–38% of China's grain, 1958–1960 (Li & Yang, 2005).") : say("Sec. Gao", "😠", "gao", "Remember what happened to Peng.", true));
    if (!done) {
      if (draftR == null || draftR < real) draftR = real;
      const area = document.createElement("div"); box.appendChild(area);
      const notes = is58 ? [["Red Flag", 250], ["East Wind", 200]] : [["Red Flag", 300], ["East Wind", 260]];
      const draw = () => {
        const take = Math.round(RATE * draftR), left = st.food + real + (is58 ? 0 : st.hidden) - take;
        const dd = dangerFor(draftR, T);
        const mood = draftR >= T ? ["😊", "Glorious! Just like Red Flag!", false] : draftR >= T * 0.7 ? ["😐", "Others did better.", false] : ["😠", "Too low! Are you an enemy, a “rightist”?", true];
        area.innerHTML = `<div class="rform">
          <div class="ledger"><p class="lh">📋 Harvest report · ${year}</p>
            <div class="lrow secret"><span>🤫 Real harvest (only you know)</span><b>${real}</b></div>
            <div class="lrow"><span>✍️ You report</span></div>
            <div class="stepper"><button type="button" id="m50" aria-label="Minus 50">−50</button><button type="button" id="m10" aria-label="Minus 10">−10</button><span class="num" id="rNum">${draftR}</span><button type="button" id="p10" aria-label="Plus 10">+10</button><button type="button" id="p50" aria-label="Plus 50">+50</button></div>
            <div class="math">
              <div><span>🚚 State takes (40%)</span><b>${Math.min(take, Math.max(0, st.food + real + (is58 ? 0 : st.hidden)))}</b></div>
              <div class="${left - NEED < 0 ? "low" : ""}"><span>🍚 Left to eat (need 40)</span><b>${Math.max(0, left)}</b></div>
              <div><span>🔥 Danger</span><b>${dd > 0 ? "+" + dd : "−" + Math.abs(dd)}</b></div>
            </div></div>
          <div class="bboard"><span class="bh">📌 Other teams reported</span>${notes.map(n => `<div class="note"><span>${n[0]}</span>: <b>${n[1]}</b></div>`).join("")}
            ${say("Sec. Gao", mood[0], "gao", mood[1], mood[2])}</div></div>`;
        const set = d => { draftR = clamp(draftR + d, real, 400); draw(); const k = d === -50 ? "m50" : d === -10 ? "m10" : d === 10 ? "p10" : "p50"; if ($(k)) $(k).focus(); };
        $("m50").onclick = () => set(-50); $("m10").onclick = () => set(-10); $("p10").onclick = () => set(10); $("p50").onclick = () => set(50);
      };
      draw();
      nextBtn(box, "📨 File report", () => fileReport(year, real, T));
      return;
    }
    // Result
    const r = done;
    const stampTxt = r.purged ? "RIGHTIST" : r.R >= T ? "APPROVED" : "SUSPICIOUS";
    box.insertAdjacentHTML("beforeend", `<div class="result" id="resR"><span class="stamp slam ${r.R >= T && !r.purged ? "" : "red"}">${stampTxt}</span>
      <div class="chips"><span class="chip">🤫 Real: ${real}</span><span class="chip red">✍️ Reported: ${r.R}</span></div>
      ${r.purged ? `<p>A crowd shames you in public. You're removed from your post.</p><p>Your replacement reports ${T}.</p>` : ""}
      <div class="truck"><span>🚚 Trucks take</span><span class="n">${r.take}</span><span>sacks.</span></div>
      <div class="truck"><span>🍚 Left after eating:</span><span class="n">${r.left}</span>${r.hungryAdd ? `<span>· 🥣 ${r.hungryAdd} more ${r.hungryAdd === 1 ? "home goes" : "homes go"} hungry.</span>` : ""}</div></div>` +
      (is58 ? reveal("Quota", "grain the state took, based on REPORTED numbers.")
        : reveal("Fear", "punishing bad news made officials send fake numbers up.")) +
      (is58 ? "" : src("Real: after Lushan, over 3 million party members were purged or punished as “rightists.”")));
    nextBtn(box, is58 ? "📰 Summer 1959 →" : "📻 1960 →");
  }
  function fileReport(year, real, T) {
    const is58 = year === 1958, R = draftR;
    st.danger += dangerFor(R, T);
    let purged = false;
    if (is58) capDanger();
    else { st.danger = clamp(st.danger, 0, 10); if (st.danger >= 10) { purged = true; st.purged = 1959; } }
    const Reff = purged ? T : R;
    const res = eatYear(real, is58 ? 0 : st.hidden, Math.round(RATE * Reff));
    const rec = { R, Reff, take: res.take, left: res.left, hungryAdd: res.hungryAdd, purged };
    if (is58) st.y58 = rec; else st.y59 = rec;
    if (purged) flip("purge");
    draftR = null; save(); render(); scrollToEl($("resR"));
  }

  // 5 · Lushan 1959: Peng is purged (WH.35)
  function s5() {
    const box = card();
    box.innerHTML = banner("Summer 1959", "Lushan party meeting", "⛰️📜", "gray");
    checkBox(box, "cLushan", `<div class="chips"><span class="chip">✉️ Defense chief Peng tells Mao: the Leap is failing.</span></div>
      <div class="chips"><span class="chip red">🧹 Peng is purged. Over 3 million members punished.</span></div>
      ${src("Real: Marshal Peng Dehuai, Lushan Conference, July–Aug 1959. 3 million = 1962 official count of those purged or punished as “right opportunists.”")}`, "📰 Party news", () => {
      if (!st.lushan) { st.lushan = true; st.danger += 1; capDanger(); save(); hud(); }
      flip("purge"); nb();
    });
    function nb() { scrollToEl(nextBtn(box, "🔦 Winter 1959 →")); }
    if (chk("cLushan").done) { flip("purge"); nextBtn(box, "🔦 Winter 1959 →"); }
  }

  // 6 · Hidden grain search (decision 3)
  function s6() {
    const box = card();
    box.innerHTML = banner("Winter 1959", "Hidden grain", "🔦🏚️", "night") + say("Sec. Gao", "😤", "gao", "Villagers are hiding grain. Search every home!", true);
    cards(box, [
      { k: "search", ic: "🔦", t: "Search the homes", d: "Gao gets the grain.", fx: [["🔥 −2", "good"], ["🤝 −3", "bad"], ["🍚 −15", "bad"]] },
      { k: "away", ic: "🚪", t: "Find nothing", d: "Villagers keep it.", fx: [["🔥 +2", "bad"], ["🤝 +1", "good"], ["🍚 +15", "good"]] }
    ], st.search, k => {
      st.search = k;
      if (k === "search") { st.danger -= 2; st.trust -= 3; st.hidden = 0; } else { st.danger += 2; st.trust += 1; st.hidden = 15; }
      capDanger(); st.trust = clamp(st.trust, 0, 10); save(); render(); scrollToEl($("res6"));
    });
    if (!st.search) return;
    box.insertAdjacentHTML("beforeend", `<div class="result" id="res6"><span class="stamp slam ${st.search === "search" ? "" : "red"}">${st.search === "search" ? "SEIZED" : "NOTHING FOUND"}</span>
      <p>${st.search === "search" ? "You find 15 sacks under floors. Gao takes them all." : "The 15 sacks stay hidden. Gao narrows his eyes."}</p></div>` +
      src("Real: in 1959–60, officials searched homes for “hidden grain” across China."));
    nextBtn(box, "📋 1959 harvest report →");
  }

  // 8 · Censorship + letter (decision 5), then 1960
  function s8() {
    const box = card();
    box.innerHTML = banner("1960", "Empty bowls", "🥣📻", "gray") +
      say("Radio", "📻", "radio", "Record harvests everywhere!") +
      `<p class="big"><b>No one may say “famine.”</b></p>` + src("Real: China's newspapers and radio hid the famine.");
    flip("cens");
    const cardsList = st.purged && st.purged < 1960 && !st.letter ? [
      { k: "write", ic: "✉️", t: "Write the truth", d: "You're already a “rightist.”", fx: [["🤝 +1", "good"], ["⚠️ Labor camp risk", "bad"]] },
      { k: "silent", ic: "🤐", t: "Stay silent", d: "Keep your head down.", fx: [["🤝 −1", "bad"]] }
    ] : [
      { k: "write", ic: "✉️", t: "Write the truth", d: "To top leaders. Could cut your quota.", fx: [["🔥 +4", "bad"], ["🤝 +2", "good"]] },
      { k: "silent", ic: "🤐", t: "Stay silent", d: "Quota stays the same.", fx: [["🤝 −1", "bad"]] }
    ];
    cards(box, cardsList, st.letter, k => {
      st.letter = k;
      const wasPurged = !!st.purged;
      if (k === "write") {
        if (wasPurged) { st.trust += 1; st.letterResult = "seized"; }
        else { st.danger += 4; if (st.danger >= 10) { st.danger = 10; st.purged = 1960; st.letterResult = "informer"; flip("spy"); } else { st.cut = true; st.trust += 2; st.letterResult = "help"; } }
      } else { st.trust -= 1; st.letterResult = "silent"; }
      st.trust = clamp(st.trust, 0, 10);
      const Reff = st.y59.Reff;
      const res = eatYear(REAL60, 0, Math.round(RATE * Reff * (st.cut ? 0.5 : 1)));
      st.y60 = res; save(); render(); scrollToEl($("res8"));
    });
    if (!st.letter) return;
    const L = { help: ["HELP SENT", "", "A work team reads it. Quota cut in half."],
      informer: ["INFORMER", "red", "Old Fan gives your letter to Gao. You're labeled a rightist."],
      seized: ["SEIZED", "red", "Gao seizes your letter. You're sent to dig canals."],
      silent: ["SILENT", "red", "The trucks come again. The radio keeps cheering."] }[st.letterResult];
    box.insertAdjacentHTML("beforeend", `<div class="result" id="res8"><span class="stamp slam ${L[1]}">${L[0]}</span><p>${L[2]}</p>
      <div class="truck"><span>🚚 1960: trucks take</span><span class="n">${st.y60.take}</span><span>sacks.</span></div>
      <div class="truck"><span>🍚 Left after eating:</span><span class="n">${st.y60.left}</span>${st.y60.hungryAdd ? `<span>· 🥣 ${st.y60.hungryAdd} more ${st.y60.hungryAdd === 1 ? "home goes" : "homes go"} hungry.</span>` : ""}</div></div>` +
      reveal("Censorship", "banning news the government dislikes."));
    nextBtn(box, "📊 1961: the real numbers →");
  }

  // 9 · Paper vs. real (WH.38)
  function s9() {
    const box = card();
    box.innerHTML = banner("1961", "All of China", "📊🌏", "paper") + `<h2>Paper vs. real</h2>`;
    const row = (l, v, fake) => `<div class="crow"><span>${l}</span><div class="ctrack"><span class="${fake ? "fake" : ""}" style="width:${Math.round(v / 375 * 100)}%"></span></div><b>${v}</b></div>`;
    checkBox(box, "cData", `<p class="headline">🌾 China's grain (million tons)</p>
      <div class="chart">${row("📄 1958 claim", 375, true)}${row("🌾 1958 real", 200)}${row("🌾 1959 real", 170)}${row("🌾 1960 real", 143)}</div>
      <div class="took"><span>🚚 State took: 1958 26%</span><span>1959 38%</span><span>1960 33%</span></div>
      ${src("Sources: Li & Yang (2005) via Alpha History; 1958 claim of 375 later cut to 250 (Aug 1959). Death range: class slides; BMJ (1999).")}`, "📝 Inspector's report", () => nb());
    function nb() { scrollToEl(nextBtn(box, "🚩 1966 →")); }
    if (chk("cData").done) nextBtn(box, "🚩 1966 →");
  }

  // 10 · Red Guards (decision 6)
  function accusation() {
    if (st.purged) return "You were a rightist!";
    if (st.search === "search") return "You stole our grain!";
    return "You hid grain from the state!";
  }
  function s10() {
    const box = card();
    flip("cult");
    box.innerHTML = banner("1966", "Cultural Revolution", "🚩📕", "red") +
      say("Red Guard", "🧑‍🎓", "rg", "Chairman Mao is the red sun in our hearts!") +
      reveal("Cult of personality", "making one leader seem perfect.") +
      say("", "📕", "rg", accusation(), true) +
      (st.cr ? "" : `<p class="ask">What do you do?</p>`);
    cards(box, [
      { k: "confess", ic: "🙇", t: "Confess", d: "Admit to everything.", fx: [["🤝 −1", "bad"], ["⛏️ Hard labor", "bad"]] },
      { k: "defend", ic: "🗣️", t: "Defend yourself", d: "Tell your side.", fx: [["🔥 +3", "bad"], ["🔒 Labor camp", "bad"]] },
      { k: "accuse", ic: "👉", t: "Accuse Old Fan", d: "Betray a neighbor to save yourself.", fx: [["🤝 −3", "bad"], ["🛡️ You're spared"], ["👴 Fan suffers", "bad"]] }
    ], st.cr, k => {
      st.cr = k;
      if (k === "confess") st.trust -= 1; else if (k === "defend") st.danger += 3; else st.trust -= 3;
      st.trust = clamp(st.trust, 0, 10); st.danger = clamp(st.danger, 0, 10); save(); render(); scrollToEl($("res10"));
    });
    box.insertAdjacentHTML("beforeend", src("Real slogan. Mao greeted 11 million Red Guards at 1966 rallies. 500,000 to 2 million died, 1966–76 (class slides; Britannica)."));
    if (!st.cr) return;
    const R = { confess: "You confess. Sent to hard labor.", defend: "Beaten, then sent to a camp.", accuse: "Old Fan is dragged out in your place. You stay silent." }[st.cr];
    const T = st.trust >= 6 ? "Villagers secretly bring you food." : st.trust <= 2 ? "Villagers you hurt shout loudest." : "";
    box.insertAdjacentHTML("beforeend", `<div class="result" id="res10"><span class="stamp slam red">${st.cr === "accuse" ? "BETRAYAL" : "STRUGGLE SESSION"}</span><p>${R}</p>${T ? `<p>${T}</p>` : ""}</div>`);
    nextBtn(box, "🗂️ Compare files →");
  }

  // 11 · Stasi vs. Mao's China (WH.35)
  function s11() {
    const box = card();
    box.innerHTML = banner("1966", "Who controls how?", "🕵️📢🗽", "paper");
    checkBox(box, "cCompare", `<div class="duo">
        <div class="file"><div class="ficon" aria-hidden="true">🕵️</div><div class="fh">East Germany's Stasi</div><div>189,000 informers: 1 per 90 people.</div></div>
        <div class="file"><div class="ficon" aria-hidden="true">📢</div><div class="fh">Mao's China</div><div>Crowds shamed people at public meetings.</div></div>
        <div class="file us"><div class="ficon" aria-hidden="true">🗽</div><div class="fh">U.S. Red Scare</div><div>McCarthy accused people. Senate pushed back.</div></div></div>
      ${src("Sources: Stasi Records Archive (Bundesarchiv); U.S. Senate (1954); class slides.")}`, "🗂️ Compare", () => { flip("spy"); nb(); });
    function nb() { scrollToEl(nextBtn(box, "🏁 See how your story ends →")); }
    if (chk("cCompare").done) { flip("spy"); nextBtn(box, "🏁 See how your story ends →"); }
  }

  // ---------------- Endings ----------------
  const ENDINGS = {
    purged: { icon: "🏷️", t: "Labeled a Rightist", line: "Telling the truth cost you your post. The fake numbers went up anyway." },
    empty: { icon: "🥣", t: "Model Team, Empty Bowls", line: "Gao loved your numbers. The trucks took what those numbers promised." },
    bent: { icon: "⚖️", t: "Bent, Not Broken", line: "You fed Gao just enough lies to survive. Your village suffered less than most." }
  };
  const endingId = () => st.purged ? "purged" : st.hungry >= 5 ? "empty" : "bent";
  const CR_LINE = { confess: "1966: You confessed and were sent to hard labor.", defend: "1966: You fought back and were sent to a camp.", accuse: "1966: You accused Old Fan. You were spared. He wasn't." };
  function causedBy() {
    const out = [];
    out.push(10 - st.F >= 6 ? "Sent " + (10 - st.F) + " workers to furnaces" : "Kept workers in the fields");
    out.push("1958: reported " + st.y58.R + ", real " + real58());
    out.push(st.search === "search" ? "Searched the homes" : "Let villagers hide grain");
    out.push(st.y59.purged ? "1959: purged, replacement reported " + T59 : "1959: reported " + st.y59.R + ", real " + real59());
    out.push({ help: "Letter brought a quota cut", informer: "Letter reached an informer", seized: "Letter seized", silent: "Stayed silent in 1960" }[st.letterResult]);
    out.push({ confess: "1966: confessed", defend: "1966: defended yourself", accuse: "1966: accused a neighbor" }[st.cr]);
    return out;
  }
  function s12() {
    const box = card(), id = endingId(), E = ENDINGS[id];
    box.classList.add("ending");
    box.innerHTML = `<div class="e-icon" aria-hidden="true">${E.icon}</div><h2>${E.t}</h2>
      <p class="eline">${E.line}</p><p class="eline">${CR_LINE[st.cr]}</p>
      <div class="chips endchips"><span class="chip">🏠 Hungry homes: ${st.hungry} of 10</span><span class="chip">🤝 Trust: ${st.trust}/10</span></div>
      <p class="toll">🇨🇳 Real toll: 15–45 million died in the famine.</p>${src("Estimates vary: 15 million (low) to 45 million (Dikötter). Yang Jisheng: 36 million.")}
      <div class="caused"><p class="ch">Caused by:</p><ul>${causedBy().map(c => `<li>${c}</li>`).join("")}</ul></div>`;
    nextBtn(box, "✍️ Give your testimony →");
  }

  // ---------------- Writing + turn in ----------------
  const PROMPTS = [
    { id: "hungry", short: "Why the village went hungry", label: "1. Why did your village go hungry? Name one control method.",
      stem: "My village went hungry because ___. The party used ___ to ___.", min: 60, newWords: 5,
      mustAll: [["because", "since", "so ", "due to"], ["propaganda", "poster", "slogan", "radio", "censor", "purge", "rightist", "secret police", "informer", "spy", "struggle", "cult", "fear", "threat", "punish", "quota", "red guard"]],
      mustMsg: "In answer 1, use “because” and name a control method (like propaganda, censorship, or a purge)." },
    { id: "remake", short: "Can one leader remake a country?", label: "2. Can one leader remake a country? Use one real fact.",
      stem: "Mao (did / didn't) remake China. For example, ___. The cost was ___.", min: 60, newWords: 5,
      mustAll: [["did", "didn't", "did not", "can", "can't", "cannot", "yes", "no", "changed", "remade", "remake"], ["famine", "leap", "furnace", "steel", "commune", "harvest", "grain", "red guard", "cultural", "million", "taiwan", "1949", "rightist", "peng", "quota", "starv", "communist"]],
      mustMsg: "In answer 2, give a real fact from today (like the famine, the Great Leap, or the Red Guards)." }
  ];
  function s13() {
    const box = card(), E = ENDINGS[endingId()];
    box.innerHTML = `<div class="testimony" id="report"><p class="tag">📜 1981 · Your testimony</p>
      ${say("Historian", "🎙️", "you", "Tell me what really happened.")}
      <p class="chips"><span class="chip">${E.icon} <span>${E.t}</span></span></p></div>`;
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
        const junk = window.classJunkStop(box, { starter: isEs() ? tr(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
        if (junk) { msg.textContent = (isEs() ? "En " + tr(p.short) : "For " + p.short) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemWords = new Set(plain(p.stem + " " + tr(p.stem)).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < p.newWords) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "msg bad"; box.focus(); return; }
      let groups = p.mustAll;
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      const pv = " " + plain(v) + " ";
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(pv)))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
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
    a["Choice · Furnace workers"] = (10 - st.F) + " to furnaces, " + st.F + " in fields (Gao wanted 6 at furnaces)";
    a["Choice · 1958 report"] = "Reported " + st.y58.R + " (real harvest " + real58() + ")";
    a["Choice · Hidden grain"] = st.search === "search" ? "Searched the homes" : "Found nothing (let villagers keep it)";
    a["Choice · 1959 report"] = "Reported " + st.y59.R + " (real harvest " + real59() + ")" + (st.y59.purged ? " → purged; replacement reported " + T59 : "");
    a["Choice · 1960 letter"] = (st.letter === "write" ? "Wrote the truth" : "Stayed silent") + " → " + { help: "quota cut", informer: "informer, purged", seized: "seized", silent: "no change" }[st.letterResult];
    a["Choice · 1966 meeting"] = { confess: "Confessed", defend: "Defended self", accuse: "Accused a neighbor" }[st.cr];
    a["Ending"] = ENDINGS[endingId()].t;
    a["Caused by"] = causedBy().join(" | ");
    a["Village at the end"] = "Hungry homes " + st.hungry + " of 10 · Trust " + st.trust + "/10 · Danger " + st.danger + "/10";
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }

  // ---------------- Render ----------------
  const STEPS = [title, s3, s1, s2, () => reportStep(1958), s5, s6, () => reportStep(1959), s8, s9, s10, s11, s12, s13];
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false; locked = false;
    // Never land past what's been done (no skipping by editing storage).
    hud();
    (STEPS[st.step] || title)();
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; draftF = 5; draftR = null; prev = null;
    if (window.classFirstTry) window.classFirstTry.reset();
    $("houses").innerHTML = "";
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
