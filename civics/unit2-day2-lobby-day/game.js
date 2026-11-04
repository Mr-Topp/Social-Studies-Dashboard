/* =====================================================================
   LOBBY DAY: PASS IT OR BLOCK IT  (Government Unit 2 · Day 4)
   Interest groups, lobbying, PACs, grassroots action, and civic virtue.

   The student is assigned a side in a real Iowa fight (farm right-to-repair)
   and runs a made-up interest group for 4 weeks. Each week: a rumor about the
   rival, one tactic card (money / volunteers / trust), the rival's move, and
   a news headline. 5 undecided senators each listen to something different.
   A late-night offer (fake emails / unproven claim / honest letters) can win
   votes now but blows up in Week 4. 6 evidence checks are built into play.
   Strict order, saves on this device, turn-in through shared/turnin.js.
   Every English string shown on screen goes through T() so es.js can match it.
   ===================================================================== */
(function () {
  "use strict";
  const T = s => s;   // marks on-screen English (es.js has the Spanish)

  const KEY = "gov-u2d2-lobby-day-v2";
  const ASSIGN = "gov-unit2-day2-lobby-day";
  const TITLE = "Government Unit 2 · Day 4 · Lobby Day: Pass It or Block It";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const STANDARD = "SS.9-12.Gov.12, SS.9-12.Gov.11, SS.9-12.Gov.15, SS.9-12.Gov.16";
  const NEED = 8, LOCK = 5, STEPS = 15;

  // ---------------- The committee (all made up) ----------------
  // lean = how much the senator supports the BILL: -3 strong NO ... +3 strong YES. Votes YES at +1 or more.
  const SEN = [
    { id: "hof", name: "Sen. Dale Hoffman", face: "🧑‍🌾", where: T("Farm district"), tag: "home", start: 1 },
    { id: "ort", name: "Sen. Maria Ortiz", face: "👩‍💼", where: T("Des Moines suburbs"), tag: "facts", start: 1 },
    { id: "lun", name: "Sen. Greg Lund", face: "🧔", where: T("Close race"), tag: "news", start: 0 },
    { id: "bro", name: "Sen. Tasha Brooks", face: "👩🏾‍💼", where: T("Cedar Rapids"), tag: "team", start: 0 },
    { id: "pet", name: "Sen. Walt Peters", face: "👴", where: T("Committee chair"), tag: "access", start: -1 }
  ];
  const SID = SEN.map(s => s.id);
  const senBy = id => SEN.find(s => s.id === id);
  const TAGS = {
    home: { i: "🏠", t: T("Home voters") },
    facts: { i: "📊", t: T("Facts") },
    news: { i: "📺", t: T("The news") },
    team: { i: "🤝", t: T("Many groups") },
    access: { i: "🎩", t: T("Meetings") }
  };
  const tagOf = id => senBy(id).tag;

  // ---------------- The two sides ----------------
  const SIDES = {
    fix: { dir: 1, icon: "🔧", name: T("Fix It Iowa"), who: T("Farmers + repair shops"), job: T("Get the bill PASSED."),
      says: T("Farmers lose harvest days waiting on dealers."), money: 6000, vol: 7, rival: "block" },
    block: { dir: -1, icon: "⚙️", name: T("Iowa Equipment Alliance"), who: T("Tractor makers + dealers"), job: T("Get the bill BLOCKED."),
      says: T("Owners could switch off required pollution controls."), money: 13000, vol: 3, rival: "fix" }
  };

  // ---------------- Tactic cards (each can be played once) ----------------
  // fx(target) = moves TOWARD the player's side (flipped for the block side).
  const CARDS = {
    lobby: { icon: "🎩", name: T("Hire a lobbyist"), money: 4000, vol: 0, pick: true, kind: "money",
      what: T("Meet 1 senator. Best on 🎩 📊."),
      fx: t => ({ [t]: ["access", "facts"].includes(tagOf(t)) ? 2 : 1 }), trust: 0,
      term: T("<b>Lobbying</b>: trying to sway lawmakers. A <b>lobbyist</b> is paid to do it.") },
    callin: { icon: "📞", name: T("Call-in day"), money: 0, vol: 3, kind: "people",
      what: T("Members call. Big 🏠, small 📺."),
      fx: () => ({ hof: 2, lun: 1 }), trust: 0,
      term: T("<b>Grassroots lobbying</b>: regular people contacting their own lawmakers.") },
    petition: { icon: "🌐", name: T("Online petition"), money: 0, vol: 0, kind: "people",
      what: T("Lots of names, free. Small 📺."),
      fx: () => ({ lun: 1 }), trust: 5,
      term: T("<b>Activism</b> keeps changing. Online petitions are fast, but home voters count more.") },
    ads: { icon: "📺", name: T("TV & online ads"), money: 5000, vol: 0, kind: "money",
      what: T("Statewide ads. Big 📺, small 🏠."),
      fx: () => ({ lun: 2, hof: 1 }), trust: 5,
      term: T("<b>Media</b> shapes what voters worry about. Lawmakers notice.") },
    coalition: { icon: "🤝", name: T("Build a coalition"), money: 1000, vol: 2, kind: "both",
      what: T("Team up. Big 🤝, small 🎩."),
      fx: () => ({ bro: 2, pet: 1 }), trust: 0,
      term: T("<b>Coalition</b>: different groups teaming up for one goal.") },
    testify: { icon: "🎤", name: T("Testify at a hearing"), money: 0, vol: 1, pick: true, kind: "people",
      what: T("True story to 1 senator. Best on 📊."),
      fx: t => ({ [t]: tagOf(t) === "facts" ? 2 : 1 }), trust: 5,
      term: T("Anyone can testify. The First Amendment protects your right to <b>petition</b> government.") }
  };
  const CARD_ORDER = ["lobby", "callin", "petition", "ads", "coalition", "testify"];

  // ---------------- The rival's moves (bill lean: + helps the bill, - hurts it) ----------------
  const RIVAL = {
    block: [ // when the student is Fix It Iowa
      { fx: { pet: -2, ort: -1 }, trust: 0, text: T("5 Alliance lobbyists hit the Capitol."),
        rumor: T("Alliance lobbyists will meet Sen. Peters and Sen. Ortiz.") },
      { fx: { lun: -2, hof: -1 }, trust: -5, text: T("Alliance TV ads: “This bill goes too far.”"),
        rumor: T("Alliance ads will hit Sen. Lund and Sen. Hoffman.") },
      { fx: { bro: -2, pet: -1 }, trust: 0, text: T("Dealers and business groups join the Alliance."),
        rumor: T("The Alliance is courting Sen. Brooks and Sen. Peters.") },
      { dyn: -1, trust: 0, text: T("Lobbyist blitz on the 2 closest senators."),
        rumor: T("Last push: the 2 senators closest to switching. Watch 🎯.") }
    ],
    fix: [ // when the student is the Equipment Alliance
      { fx: { hof: 2, lun: 1 }, trust: 0, text: T("Fix It Iowa holds a call-in day."),
        rumor: T("Members will flood Sen. Hoffman and Sen. Lund with calls.") },
      { fx: { ort: 2, lun: 1 }, trust: -5, text: T("A farmer testifies about lost harvest days."),
        rumor: T("A farmer will testify for Sen. Ortiz and Sen. Lund.") },
      { fx: { bro: 2, pet: 2 }, trust: 0, text: T("Corn and soybean growers join Fix It Iowa."),
        rumor: T("Fix It Iowa is courting Sen. Brooks and Sen. Peters.") },
      { dyn: 1, trust: 0, text: T("Big rally targets the 2 closest senators."),
        rumor: T("Last push: the 2 senators closest to switching. Watch 🎯.") }
    ]
  };

  // ---------------- The rival's face (made up) ----------------
  const FOE = {
    block: { face: "🕴️", name: "Vance Kohl", role: T("Alliance lobbyist (made up)") },
    fix: { face: "👩‍🌾", name: "Rosa Diaz", role: T("Fix It Iowa organizer (made up)") }
  };
  const MOOD = {
    up: { m: "😏", t: T("“You're out of your league.”") },
    close: { m: "😬", t: T("“This is going down to the wire.”") },
    down: { m: "😠", t: T("“Enjoy it while it lasts.”") },
    taunt: { m: "😏", t: T("“Ha! That buys us time.”") },
    won: { m: "😏", t: T("“Better luck next session.”") },
    lost: { m: "😠", t: T("“We'll be back next session.”") }
  };

  // ---------------- Evidence checks (first option is right; screen always shuffles) ----------------
  const CHECKS = {
    c1: { label: T("💬 Reply"), stamp: T("TEAM AGREES"), std: "Gov.12", short: "Interest group vs. party",
      q: T("What do you tell Jess?"),
      opts: [T("That's a party's job. We lobby on one issue."), T("Good idea. Every group must run a candidate."), T("We can't. Only the governor picks candidates."), T("Wait until we're rich. Then we're a party.")],
      hint: T("Which box runs candidates?") },
    c2: { label: T("📞 Answer"), stamp: T("STAYED LEGAL"), std: "Gov.12", short: "Iowa PAC ban during session",
      q: T("What do you say?"),
      opts: [T("No. PAC money is banned during session."), T("Yes. Iowa has no PAC limit."), T("Yes, if the senator promises our vote."), T("No. Iowa caps PAC checks at $1,000.")],
      hint: T("Look at the calendar and the law.") },
    c3: { label: T("📞 Answer"), stamp: T("RULES CHECKED"), std: "Gov.12", short: "Super PAC rules (Citizens United)",
      q: T("Is that allowed?"),
      opts: [T("No. Super PACs can't plan ads with campaigns."), T("Yes. Citizens United lets them plan with anyone."), T("Yes, if the money comes from people."), T("No. Super PACs can't run ads about senators.")],
      hint: T("Read the ❌ lines.") },
    c4: { label: T("🗂️ Your read"), stamp: T("GOT IT"), std: "Gov.11", short: "Why district calls beat a big petition",
      q: T("Why do 41 calls beat 5,200 names?"),
      opts: [T("The callers are his voters. They re-elect him."), T("Online petitions break Senate rules."), T("Calls cost more, so callers are rich."), T("Most petition names are fake.")],
      hint: T("Where do the callers live?") },
    c5: { label: T("🏛️ The display"), stamp: T("INSPIRED"), std: "Gov.15", short: "Clark and Griffin: how they fought",
      q: T("How did both fight back?"),
      opts: [T("They went to court and spoke up in public."), T("They paid lawmakers to change the rules."), T("They ran for governor to make laws."), T("They rewrote the Iowa Constitution.")],
      hint: T("Read what Clark and Griffin did.") },
    c6: { label: T("🧭 Gut check"), stamp: T("TRUTH WINS"), std: "Gov.16", short: "Why fake voices hurt democracy",
      q: T("Why do fake voices hurt democracy?"),
      opts: [T("Lawmakers stop trusting real voters' messages."), T("Emails cost the state money to print."), T("The First Amendment doesn't protect emails."), T("Senators can only read a few emails a day.")],
      hint: T("Whose voices get drowned out?") }
  };
  const CHECK_IDS = Object.keys(CHECKS);

  // ---------------- Beats (strict order) ----------------
  // 0 intro · 1 your client · 2 W1 check · 3 W1 card · 4 W2 PAC call · 5 W2 Super PAC · 6 W2 card
  // 7 W3 call tally · 8 W3 card · 9 Capitol at night · 10 the offer · 11 W4 news · 12 W4 card · 13 vote · 14 ending · 15 write
  const WEEK_OF = [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5];
  const PLAY_BEAT = { 1: 3, 2: 6, 3: 8, 4: 12 };

  // ---------------- Pure rules (also used by tests) ----------------
  const clamp = v => Math.max(-3, Math.min(3, v));
  const yesCount = lean => 5 + SID.filter(k => lean[k] >= 1).length;
  function closest(lean) { return SID.slice().sort((a, b) => Math.abs(lean[a] - 0.5) - Math.abs(lean[b] - 0.5) || SID.indexOf(a) - SID.indexOf(b)).slice(0, 2); }
  function addLean(lean, fx, mult) { const out = {}; Object.keys(fx).forEach(k => { const before = lean[k]; lean[k] = clamp(lean[k] + fx[k] * mult); out[k] = lean[k] - before; }); return out; }

  // ---------------- State ----------------
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const money = n => "$" + Number(n || 0).toLocaleString("en-US");
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  function startLean() { const o = {}; SEN.forEach(s => { o[s.id] = s.start; }); return o; }
  const fresh = () => ({ v: 2, name: "", beat: 0, side: null, lean: startLean(), money: 0, vol: 0, trust: 50, used: {}, plays: {}, rumor4: null, picks: {}, sub: {}, wrong: {}, done: {}, vote: null, writing: {}, turnedIn: false, started: 0 });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 2 || !st.lean) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  // Shared Chromebooks: if a different student is signed in on this computer now, don't show the last kid's game.
  try {
    const who = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (who && st.name && who.toLowerCase() !== String(st.name).toLowerCase()) { st = fresh(); if (window.classFirstTry) window.classFirstTry.reset(); save(); }
  } catch (e) {}
  const side = () => SIDES[st.side];
  const dir = () => side().dir;
  const trustAdd = n => { st.trust = Math.max(0, Math.min(100, st.trust + n)); };

  let locked = false, sel = null, selTarget = null, voteAnimated = false, flashFx = null, justDone = null, tauntOn = false, lastRes = null;

  // ---------------- Small render helpers ----------------
  function chips(fx, extraTrust) {
    // fx is in BILL terms (+ = toward YES). Show as toward/away from the player.
    const out = [];
    Object.keys(fx || {}).forEach(k => {
      const d = fx[k]; if (!d) return;
      const mine = d * dir();
      out.push(`<span class="chip ${mine > 0 ? "up" : "down"}"><span>${esc(senBy(k).name)}</span> <b>${mine > 0 ? "+" : "−"}${Math.abs(d)}</b></span>`);
    });
    if (extraTrust) out.push(`<span class="chip ${extraTrust > 0 ? "up" : "down"}"><span>${T("⭐ Trust")}</span> <b>${extraTrust > 0 ? "+" : "−"}${Math.abs(extraTrust)}</b></span>`);
    return out.length ? `<div class="chips">${out.join("")}</div>` : "";
  }
  const reveal = html => `<div class="reveal"><span class="bulb" aria-hidden="true">💡</span><p>${html}</p></div>`;
  const kicker = txt => `<p class="kicker">${txt}</p>`;
  function nextBtn(label, to) { return `<button type="button" class="go" data-next="${to}">${label}</button>`; }
  const leanLabel = l => l >= 2 ? T("Strong YES") : l === 1 ? T("Leaning YES") : l === 0 ? T("Undecided") : l === -1 ? T("Leaning NO") : T("Strong NO");

  // ---------------- HUD + board ----------------
  function pulse(k, v) { lastRes = lastRes || {}; const ch = k in lastRes && lastRes[k] !== v; const up = ch && v > lastRes[k]; lastRes[k] = v; return ch ? (up ? " pulse up" : " pulse down") : ""; }
  function hud() {
    const show = st.beat >= 2 && st.beat <= 13;
    $("hud").hidden = !show; $("board").hidden = !show;
    $("stepPill").hidden = st.beat < 1; $("restartBtn").hidden = st.beat < 1;
    if (st.beat >= 1) $("stepPill").innerHTML = `<span>${T("Step")}</span> <b>${Math.min(st.beat, STEPS)}</b> <span>${T("of")}</span> <b>${STEPS}</b>`;
    if (!show) return;
    const wk = WEEK_OF[st.beat];
    const yes = yesCount(st.lean);
    const s = side();
    const winning = st.side === "fix" ? yes >= NEED : yes < NEED;
    $("hud").innerHTML = `
      <span class="pill week">${wk <= 4 ? `<span>${T("Week")}</span> <b>${wk}</b> <span>${T("of")}</span> <b>4</b>` : `<span>${T("Vote day")}</span>`}</span>
      <span class="pill team"><span aria-hidden="true">${s.icon}</span> <span>${s.name}</span></span>
      <span class="pill res${pulse("m", st.money)}" title="${T("Money")}"><span aria-hidden="true">💰</span> <b>${money(st.money)}</b></span>
      <span class="pill res${pulse("v", st.vol)}" title="${T("Volunteers")}"><span aria-hidden="true">🙋</span> <b>${st.vol}</b></span>
      <span class="pill trust${pulse("t", st.trust)}" title="${T("Public trust")}"><span aria-hidden="true">⭐</span> <span class="tbar"><i style="width:${st.trust}%"></i></span> <b>${st.trust}</b></span>
      <span class="pill votes ${winning ? "good" : "bad"}"><span>${T("YES votes if the vote were today:")}</span> <b>${yes}</b> <span>${T("need 8")}</span></span>`;
    board();
  }
  function board() {
    const targets = rumorTargets();
    const yes = yesCount(st.lean);
    const seats = [];
    for (let i = 0; i < 5; i++) seats.push(`<i class="seat yes lockd"></i>`);
    SEN.forEach(s => seats.push(`<i class="seat ${st.lean[s.id] >= 1 ? "yes" : st.lean[s.id] === 0 ? "und" : "no"}"></i>`));
    for (let i = 0; i < 5; i++) seats.push(`<i class="seat no lockd"></i>`);
    const want = st.side === "fix" ? T("You want: 8 or more YES.") : T("You want: 7 or fewer YES.");
    const foe = FOE[side().rival], margin = st.side === "fix" ? yes - NEED : (NEED - 1) - yes;
    const mood = tauntOn ? MOOD.taunt : st.vote ? (st.vote.won ? MOOD.lost : MOOD.won) : margin >= 1 ? MOOD.down : margin >= -1 ? MOOD.close : MOOD.up;
    const foeHtml = `<div class="foe${tauntOn ? " taunting" : ""}" id="foe"><span class="foeface" aria-hidden="true">${foe.face}<i>${mood.m}</i></span>
      <span class="foewho"><small>${T("Your rival")}</small><b>${foe.name}</b><small>${foe.role}</small></span><span class="foesay">${mood.t}</span></div>`;
    $("board").innerHTML = `${foeHtml}
      <div class="bhead"><p class="kicker">${T("Senate committee (made up)")}</p>
        <p class="bsub">${T("Needs 8 of 15 YES. Undecided = NO.")}</p>
        <div class="seats" aria-hidden="true">${seats.join("")}</div>
        <p class="bsub"><b>${want}</b></p>
        <p class="bsub small">${T("These 5 decide it:")}</p></div>
      <ul class="sens">${SEN.map(s => {
        const l = st.lean[s.id], f = flashFx && flashFx[s.id];
        const mineNow = st.side === "fix" ? l >= 1 : l <= 0;
        return `<li class="sen ${mineNow ? "mine" : "theirs"}${targets.includes(s.id) ? " target" : ""}${selTarget === s.id ? " picked" : ""}" data-sen="${s.id}">
          <span class="face" aria-hidden="true">${s.face}</span>
          <span class="who"><b>${esc(s.name)}</b><small>${s.where}</small><small class="tag" title="${T("Listens to:")}"><span aria-hidden="true">👂 ${TAGS[s.tag].i}</span> <span>${TAGS[s.tag].t}</span></small></span>
          <span class="lean"><span class="meter" aria-hidden="true">${[-3, -2, -1, 0, 1, 2, 3].map(v => `<i class="${v < 0 ? "n" : v > 0 ? "y" : "z"}${v === l ? " on" : ""}"></i>`).join("")}</span><small class="ll ${l >= 1 ? "y" : l === 0 ? "z" : "n"}">${leanLabel(l)}</small></span>
          ${targets.includes(s.id) ? `<span class="tgt" title="${T("Rival target this week")}">🎯</span>` : ""}
          ${f ? `<span class="bump ${f * dir() > 0 ? "up" : "down"}" aria-hidden="true">${f * dir() > 0 ? "+" : "−"}${Math.abs(f)}</span>` : ""}
        </li>`;
      }).join("")}</ul>`;
  }
  function rumorTargets() {
    const w = WEEK_OF[st.beat];
    if (!PLAY_BEAT[w] || st.beat !== PLAY_BEAT[w] || st.plays[w]) return [];
    const r = RIVAL[side().rival][w - 1];
    return r.dyn ? (st.rumor4 || []) : Object.keys(r.fx);
  }

  function taunt() { tauntOn = true; board(); setTimeout(() => { tauntOn = false; if (!$("board").hidden) board(); }, 2600); }

  // ---------------- Evidence check widget ----------------
  function checkHtml(id) {
    const c = CHECKS[id];
    if (st.done[id]) { const slam = justDone === id; if (slam) justDone = null;
      return `<div class="check done"><p class="clabel">${c.label}</p><p class="answered">✓ ${c.opts[0]}</p><span class="stamp${slam ? " slam" : ""}">${c.stamp}</span></div>`; }
    return `<div class="check" id="chk_${id}"><p class="clabel">${c.label}</p><p class="cq">${c.q}</p><div class="opts"></div><p class="msg" aria-live="polite"></p></div>`;
  }
  function wireCheck(id, onRight) {
    const box = $("chk_" + id); if (!box) return;
    const c = CHECKS[id], area = box.querySelector(".opts"), fb = box.querySelector(".msg");
    let last = "";
    function draw() {
      let order = shuffle(c.opts.map((t, n) => n));
      if (order.join() === last && order.length > 1) order.push(order.shift());
      last = order.join();
      area.innerHTML = "";
      order.forEach(n => {
        const b = document.createElement("button"); b.type = "button"; b.className = "opt"; b.textContent = c.opts[n];
        b.onclick = () => {
          if (locked) return;
          if (n === 0) {
            st.done[id] = true; justDone = id; if (window.classFirstTry) window.classFirstTry.right(id);
            save(); onRight();
          } else {
            st.wrong[id] = (st.wrong[id] || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
            locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
            taunt(); box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
            let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;   // Test T. (teacher) skips the wrong-answer lock
            const tick = () => {
              if (!fb.isConnected) { locked = false; return; }
              fb.textContent = "Not quite. " + c.hint + " The choices will mix up. Try again in " + left + "…"; fb.className = "msg bad";
              if (left-- <= 0) { locked = false; fb.textContent = "Not quite. " + c.hint + " Try again."; draw(); return; }
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

  // ---------------- Screens ----------------
  const panel = () => $("panel");
  function go(beat) { st.beat = beat; sel = null; selTarget = null; save(); render(); window.scrollTo(0, 0); }

  function intro() {
    panel().innerHTML = `<section class="card intro">
      <div class="hero-banner"><img src="../friday2-government-presentation/img/iowacap.jpg" alt="${T("The Iowa State Capitol dome in Des Moines")}">
        <div class="hero-text"><h1 class="title">${T("LOBBY DAY")}<span>${T("Pass It or Block It")}</span></h1></div>
        <div class="vs" aria-hidden="true"><span>🔧</span><b>VS</b><span>⚙️</span></div></div>
      <p class="hook">${T("Only dealers can unlock broken tractors. Should farmers fix them?")}</p>
      <p class="goal">${T("🎯 <b>Today's goal:</b> See how interest groups, money, and honesty shape laws.")}</p>
      <ul class="facts">
        <li><span class="fi" aria-hidden="true">🎴</span> <span>${T("4 tactic cards vs. a rival")}</span></li>
        <li><span class="fi" aria-hidden="true">🔎</span> <span>${T("6 checks + 2 short answers")}</span></li>
      </ul>
      <div class="startrow"><div class="namerow"><label for="nameBox">${T("Your name: first name + last initial (like Jordan M.)")}</label>
      <input id="nameBox" maxlength="40" autocomplete="off" placeholder="${T("First name + last initial (like Jordan M.)")}" value="${esc(st.name)}"></div>
      <button type="button" class="go big" id="startBtn">${T("Start →")}</button></div>
      <p id="introMsg" class="msg" role="status"></p>
      <p class="std">${T("Standards: SS.9-12.Gov.11, Gov.12, Gov.15, Gov.16")}</p>
    </section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed;
      st.side = Math.random() < 0.5 ? "fix" : "block";
      st.money = SIDES[st.side].money; st.vol = SIDES[st.side].vol; st.started = Date.now();
      go(1);
    };
  }

  function client() {
    const s = side();
    panel().innerHTML = `<section class="card">
      <h2>${T("Right to Repair is back")}</h2>
      <p>${T("Tractor makers would have to share repair tools.")}</p>
      <div class="sidecard ${st.side}">
        <div class="sidetop"><span class="sideicon" aria-hidden="true">${s.icon}</span><div><p class="kicker">${T("You run (made up):")}</p><h3>${s.name}</h3><p class="small">${s.who}</p></div></div>
        <p class="job">${s.job}</p>
        <p>“${s.says}”</p>
        <div class="res-row"><span class="pill res">💰 <b>${money(s.money)}</b></span><span class="pill res">🙋 <b>${s.vol}</b> <span>${T("volunteers")}</span></span></div>
      </div>
      ${nextBtn(T("Take the job →"), 2)}
    </section>`;
  }

  // Beat 2 · Week 1 · interest group vs. party
  function w1check() {
    const d = st.done.c1;
    panel().innerHTML = `<section class="card">
      ${kicker(T("🙋 Team meeting"))}
      <div class="speak"><span class="bface" aria-hidden="true">🙋‍♀️</span><div class="bubble"><b>${T("Jess (made up):")}</b> <span>${T("“Forget lobbying. Let's run a candidate!”")}</span></div></div>
      <div class="compare"${d ? " hidden" : ""}>
        <div class="cbox"><p class="ctitle">${T("🏛️ Political party")}</p><p>${T("Runs candidates to win elections.")}</p></div>
        <div class="cbox"><p class="ctitle">${T("📣 Interest group")}</p><p>${T("Pushes ONE cause. No candidates.")}</p></div>
      </div>
      ${checkHtml("c1")}
      ${d ? reveal(T("<b>Interest group</b>: pushes government on one issue. Doesn't run candidates.")) + nextBtn(T("Play a card →"), 3) : ""}
    </section>`;
    wireCheck("c1", render);
  }

  // Card play (beats 3, 6, 8, 12)
  function playScreen(w) {
    if (st.plays[w]) return playResult(w);
    if (w === 4 && !st.rumor4) { st.rumor4 = closest(st.lean); save(); hud(); }
    const r = RIVAL[side().rival][w - 1];
    const cards = CARD_ORDER.map(id => {
      const c = CARDS[id];
      const used = !!st.used[id], noMoney = st.money < c.money, noVol = st.vol < c.vol;
      const why = used ? T("Already used") : noMoney ? T("Not enough money") : noVol ? T("Not enough volunteers") : "";
      const cost = [c.money ? money(c.money) : "", c.vol ? c.vol + " 🙋" : ""].filter(Boolean).join(" + ") || T("Free");
      return `<button type="button" class="tcard ${c.kind}${sel === id ? " sel" : ""}" data-card="${id}" ${why ? "disabled" : ""} aria-pressed="${sel === id}">
        <span class="ticon" aria-hidden="true">${c.icon}</span><span class="tname">${c.name}</span>
        <span class="tcost">${cost}</span><span class="twhat">${c.what}</span>
        ${c.trust ? `<span class="ttrust">${T("⭐ Trust +5")}</span>` : ""}
        ${why ? `<span class="tno">${why}</span>` : ""}</button>`;
    }).join("");
    const c = sel && CARDS[sel];
    const pickRow = c && c.pick ? `<div class="pickrow"><p><b>${T("Pick a senator:")}</b></p><div class="targets">${SEN.map(s => `<button type="button" class="tgtbtn${selTarget === s.id ? " sel" : ""}" data-tgt="${s.id}" aria-pressed="${selTarget === s.id}"><span aria-hidden="true">${s.face}</span> <span>${esc(s.name)}</span> <span aria-hidden="true">${TAGS[s.tag].i}</span></button>`).join("")}</div></div>` : "";
    const ready = c && (!c.pick || selTarget);
    panel().innerHTML = `<section class="card">
      ${kicker(T("🎴 Your move"))}
      <div class="rumor"><span aria-hidden="true">👂</span> <p><b>${T("Rumor:")}</b> <span>${r.rumor}</span></p></div>
      ${w === 1 ? `<p class="small">${T("🎯 = rival target. Play there first to weaken their move.")}</p>` : ""}
      <div class="hand">${cards}</div>
      ${pickRow}
      <button type="button" class="go" id="playBtn" ${ready ? "" : "disabled"}>${ready ? T("Play this card →") : T("Pick a card")}</button>
    </section>`;
    panel().querySelectorAll("[data-card]").forEach(b => b.onclick = () => { sel = b.dataset.card; selTarget = null; render(); const pr = panel().querySelector(".pickrow") || $("playBtn"); if (pr && pr.scrollIntoView) pr.scrollIntoView({ block: "nearest", behavior: "smooth" }); });
    panel().querySelectorAll("[data-tgt]").forEach(b => b.onclick = () => { selTarget = b.dataset.tgt; render(); if ($("playBtn")) $("playBtn").scrollIntoView({ block: "nearest", behavior: "smooth" }); });
    $("playBtn").onclick = () => { if (ready) play(w, sel, selTarget); };
  }
  function play(w, cardId, target) {
    const c = CARDS[cardId], r = RIVAL[side().rival][w - 1];
    if (st.used[cardId] || st.money < c.money || st.vol < c.vol) return;
    st.used[cardId] = true; st.money -= c.money; st.vol -= c.vol;
    const first = !Object.values(st.plays).some(p => p.card === cardId);
    const mine = addLean(st.lean, c.fx(target), dir());
    trustAdd(c.trust);
    let rfx = r.fx; if (r.dyn) { rfx = {}; (st.rumor4 || closest(st.lean)).forEach(k => { rfx[k] = r.dyn; }); }
    const blocked = [], rf = {};
    Object.keys(rfx).forEach(k => { let v = rfx[k]; if (mine[k] || (c.fx(target)[k])) { blocked.push(k); v = v > 0 ? Math.max(0, v - 1) : Math.min(0, v + 1); } rf[k] = v; });
    const theirs = addLean(st.lean, rf, 1);
    trustAdd(r.trust);
    st.plays[w] = { card: cardId, target: target || null, mine, theirs, blocked, trustMine: c.trust, trustRival: r.trust, first, trustAfter: st.trust };
    flashFx = Object.assign({}, mine);
    Object.keys(theirs).forEach(k => { flashFx[k] = (flashFx[k] || 0) + theirs[k]; });
    save(); render();
    const top = panel().querySelector(".card"); if (top && top.scrollIntoView) top.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  function headline(trust) {
    if (trust >= 60) return st.side === "fix" ? T("Farmers make their case; Iowans listen") : T("Equipment makers make their case; senators listen");
    if (trust < 40) return st.side === "fix" ? T("Critics question Fix It Iowa's tactics") : T("Critics question the Alliance's tactics");
    return T("Repair bill fight heats up");
  }
  function playResult(w) {
    const p = st.plays[w], c = CARDS[p.card], r = RIVAL[side().rival][w - 1];
    const nextLabel = w === 1 ? T("Next →") : w === 2 ? T("Next →") : w === 3 ? T("Next →") : T("Go to the vote →");
    const nextBeat = w === 1 ? 4 : w === 2 ? 7 : w === 3 ? 9 : 13;
    const last = id => esc(senBy(id).name.split(" ").pop());
    const blockedChip = p.blocked.length ? `<span class="chip up shield"><span aria-hidden="true">🛡️</span> <span>${T("Blocked:")}</span> <b>${p.blocked.map(last).join(", ")}</b></span>` : "";
    panel().innerHTML = `<section class="card">
      ${kicker(T("📋 Results"))}
      <div class="move mine played"><p class="mtitle"><span class="mface" aria-hidden="true">${c.icon}</span> <b>${T("You:")}</b> <span>${c.name}</span>${p.target ? ` <span>→ ${last(p.target)}</span>` : ""}</p>
        ${chips(p.mine, p.trustMine)}</div>
      ${reveal(c.term)}
      <div class="move theirs"><p class="mtitle"><span class="mface" aria-hidden="true">${FOE[side().rival].face}</span> <b>${FOE[side().rival].name}:</b> <span>${r.text}</span></p>
        ${chips(p.theirs, p.trustRival)}${blockedChip ? `<div class="chips">${blockedChip}</div>` : ""}</div>
      <div class="news"><p class="paper src">${T("📰 The Capitol Ledger (made up)")}</p><p class="hl">${headline(p.trustAfter)}</p></div>
      ${nextBtn(nextLabel, nextBeat)}
    </section>`;
  }

  // Beat 4 · Week 2 · the PAC call
  function pacCall() {
    const d = st.done.c2;
    panel().innerHTML = `<section class="card">
      ${kicker(T("📞 Phone call"))}
      <div class="speak"><span class="bface" aria-hidden="true">📞</span><div class="bubble"><b>${T("Sen. Peters' campaign (made up):")}</b> <span>${T("“Can your PAC send $2,500 today?”")}</span></div></div>
      <div class="evidence"${d ? " hidden" : ""}>
        <div class="cal"><p class="ctitle">${T("📅 Today")}</p><p class="insession">${T("🔴 IN SESSION")}</p></div>
        <div class="law"><p class="ctitle">${T("📜 Iowa law")}</p><p>${T("No donation limit. BUT no PAC or lobbyist money to lawmakers during session.")}</p><p class="src">${T("Real: Iowa Code 68A.504")}</p></div>
      </div>
      ${checkHtml("c2")}
      ${d ? reveal(T("<b>PAC</b> (political action committee): pools members' money for campaigns.")) + nextBtn(T("Next →"), 5) : ""}
    </section>`;
    wireCheck("c2", render);
  }

  // Beat 5 · Week 2 · the Super PAC offer
  function superPac() {
    const d = st.done.c3, pick = st.picks.superpac;
    let after = "";
    if (d && !pick) {
      after = `<div class="decidewrap"><p class="dq"><b>${T("Take their help?")}</b></p>
        <div class="decide two"><button type="button" class="dbtn" data-sp="accept"><span class="dicon" aria-hidden="true">💰</span><span class="dt">${T("Take the help")}</span><span class="dd">${T("Senators fear ads. Reporters notice.")}</span></button>
        <button type="button" class="dbtn" data-sp="decline"><span class="dicon" aria-hidden="true">✋</span><span class="dt">${T("No thanks")}</span><span class="dd">${T("No ads. Voters trust you more.")}</span></button></div></div>`;
    } else if (pick) {
      const fx = st.sub.spFx || {};
      after = pick === "accept"
        ? `<div class="move mine"><p class="mtitle"><b>${T("You took the help.")}</b></p><p>${T("Senators feel the pressure.")}</p>${chips(fx, -15)}</div>`
        : `<div class="move mine"><p class="mtitle"><b>${T("You said no thanks.")}</b></p><p>${T("Voters trust you more.")}</p>${chips({}, 5)}</div>`;
      after += reveal(T("Critics: Super PACs give the rich too much power. Supporters: it's free speech.")) + nextBtn(T("Play a card →"), 6);
    }
    panel().innerHTML = `<section class="card">
            <div class="speak"${pick ? " hidden" : ""}><span class="bface" aria-hidden="true">💼</span><div class="bubble"><b>${T("A Super PAC (made up):")}</b> <span>${T("“$300,000 in ads, planned with Sen. Lund's campaign?”")}</span></div></div>
      <div class="evidence one"${d ? " hidden" : ""}>
        <div class="law"><p class="ctitle">${T("💰 Super PAC rules (real)")}</p>
          <p>${T("✅ UNLIMITED money, even from companies.")}</p>
          <p>${T("❌ No money to candidates.")}</p><p>${T("❌ No teaming up with campaigns.")}</p><p class="src">${T("Since Citizens United v. FEC (2010)")}</p></div>
      </div>
      ${checkHtml("c3")}
      ${after}
    </section>`;
    wireCheck("c3", render);
    panel().querySelectorAll("[data-sp]").forEach(b => b.onclick = () => {
      if (st.picks.superpac) return;
      st.picks.superpac = b.dataset.sp;
      if (b.dataset.sp === "accept") { st.sub.spFx = addLean(st.lean, { pet: 1, lun: 1 }, dir()); flashFx = st.sub.spFx; trustAdd(-15); }
      else trustAdd(5);
      save(); render();
    });
  }

  // Beat 7 · Week 3 · the call tally
  function tally() {
    const d = st.done.c4;
    panel().innerHTML = `<section class="card">
      ${kicker(T("🗂️ Sen. Hoffman's office"))}
      <div class="evidence one"${d ? " hidden" : ""}>
        <div class="law"><p class="ctitle">${T("📋 This week (made up)")}</p>
          <p class="tallyrow"><span aria-hidden="true">📞</span> <span>${T("Calls from his district:")}</span> <b>41</b></p>
          <p class="tallyrow"><span aria-hidden="true">🌐</span> <span>${T("Petition names:")}</span> <b>5,200</b></p>
          <p class="tallyrow sub"><span>${T("From his district:")}</span> <b>38</b></p></div>
      </div>
      <div class="speak"${d ? " hidden" : ""}><span class="bface" aria-hidden="true">🧑‍💼</span><div class="bubble"><b>${T("His aide:")}</b> <span>${T("“He reads every call from home.”")}</span></div></div>
      ${checkHtml("c4")}
      ${d ? reveal(T("<b>Constituents</b>: the voters a lawmaker represents. They count most.")) + nextBtn(T("Play a card →"), 8) : ""}
    </section>`;
    wireCheck("c4", render);
  }

  // Beat 9 · The Capitol at night (real Iowans)
  function wall() {
    const d = st.done.c5;
    if (d && !st.sub.wall) { st.sub.wall = true; st.vol += 2; save(); hud(); }
    panel().innerHTML = `<section class="card">
      ${kicker(T("🌙 Real Iowans"))}
      <div class="wall"${d ? " hidden" : ""}>
        <figure class="hero"><img src="../friday5-1800s-civics-presentation/img/f5_clark.jpg" alt="${T("Alexander Clark of Muscatine, Iowa, engraving from 1887")}"><figcaption><b>${T("Alexander Clark · 1867")}</b><span>${T("A school barred his Black daughter. He sued, spoke out, and won.")}</span></figcaption></figure>
        <div class="hero noimg"><span class="bigicon" aria-hidden="true">⚖️</span><p><b>${T("Edna Griffin · 1948")}</b></p><p>${T("A drugstore refused her for being Black. She sued and protested.")}</p></div>
      </div>
      <p class="src"${d ? " hidden" : ""}>${T("Image: Alexander Clark, 1887 engraving (public domain).")}</p>
      ${checkHtml("c5")}
      ${d ? `<div class="move mine"><p class="mtitle"><b>${T("Your team is fired up.")}</b></p><div class="chips"><span class="chip up"><span>🙋</span> <b>+2</b></span></div></div>` + reveal(T("Clark and Griffin showed <b>civic virtue</b>: courage for the common good.")) + nextBtn(T("Next →"), 10) : ""}
    </section>`;
    wireCheck("c5", render);
  }

  // Beat 10 · The late-night offer (civic virtue)
  const DIL = {
    astro: { i: "📧", t: T("Send fake emails"), d: T("3,000 fake “local voter” emails. Free."), fx: { hof: 2, ort: 1 }, trust: 0 },
    viral: { i: "📣", t: T("Post a scary claim"), d: T("Say they're lying. No proof."), fx: { lun: 2, bro: 1 }, trust: 0 },
    honest: { i: "✉️", t: T("Real letters only"), d: T("Members write their own senator. Small but true."), fx: { hof: 1 }, trust: 10 }
  };
  function dilemma() {
    const pick = st.picks.dilemma, d = st.done.c6;
    let after = "";
    if (!pick) {
      after = `<div class="decide three">${["astro", "honest", "viral"].map(k => `<button type="button" class="dbtn" data-dil="${k}"><span class="dicon" aria-hidden="true">${DIL[k].i}</span><span class="dt">${DIL[k].t}</span><span class="dd">${DIL[k].d}</span></button>`).join("")}</div>`;
    } else {
      const fx = st.sub.dilFx || {};
      const txt = pick === "honest" ? T("40 real letters. Only one senator notices.")
        : pick === "astro" ? T("Inboxes fill up. Senators are fooled.")
        : T("The post goes viral. For now.");
      after = `<div class="move mine"><p class="mtitle"><b>${T("You chose:")}</b> <span aria-hidden="true">${DIL[pick].i}</span> <span>${DIL[pick].t}</span></p><p>${txt}</p>${chips(fx, DIL[pick].trust)}</div>`
        + reveal(T("Fake voices drown out real ones. Honesty is <b>civic virtue</b>."))
        + checkHtml("c6")
        + (d ? nextBtn(T("Next →"), 11) : "");
    }
    panel().innerHTML = `<section class="card">
      ${kicker(T("📱 11:48 PM"))}
      <div class="phone"${pick ? " hidden" : ""}><p class="ptop">${T("Paid helper (made up)")}</p>
        <p class="sms">${T("“I can send 3,000 emails from fake voters. Or post a scary rumor. Your call.”")}</p></div>
      ${after}
    </section>`;
    panel().querySelectorAll("[data-dil]").forEach(b => b.onclick = () => {
      if (st.picks.dilemma) return;
      const k = b.dataset.dil; st.picks.dilemma = k;
      st.sub.dilFx = addLean(st.lean, DIL[k].fx, dir()); flashFx = st.sub.dilFx; trustAdd(DIL[k].trust);
      save(); render();
    });
    if (pick) wireCheck("c6", render);
  }

  // Beat 11 · Week 4 news
  const shady = () => st.picks.dilemma === "astro" || st.picks.dilemma === "viral";
  function w4news() {
    if (!st.sub.news) {
      st.sub.news = true;
      if (shady()) { const fx = {}; SID.forEach(k => { fx[k] = 1; }); st.sub.newsFx = addLean(st.lean, fx, -dir()); flashFx = st.sub.newsFx; trustAdd(-25); }
      else trustAdd(5);
      save(); hud();
    }
    let body;
    if (st.picks.dilemma === "astro") body = `<div class="breaking"><p class="paper src">${T("🚨 BREAKING · The Capitol Ledger (made up)")}</p><p class="hl">${T("Reporter: the email “voters” aren't real.")}</p><span class="stamp big dead slam">${T("EXPOSED")}</span></div>
      <p>${T("Senators are angry.")}</p>${chips(st.sub.newsFx, -25)}
      ${reveal(T("<b>Astroturf</b>: fake grassroots, made to look like regular people."))}`;
    else if (st.picks.dilemma === "viral") body = `<div class="breaking"><p class="paper src">${T("🚨 BREAKING · The Capitol Ledger (made up)")}</p><p class="hl">${T("Fact-checkers: the viral claim has no proof.")}</p><span class="stamp big dead slam">${T("EXPOSED")}</span></div>
      <p>${T("Senators back away.")}</p>${chips(st.sub.newsFx, -25)}
      ${reveal(T("<b>Disinformation</b>: lies spread on purpose to fool people."))}`;
    else body = `<div class="news"><p class="paper src">${T("📰 The Capitol Ledger (made up)")}</p><p class="hl">${T("Real letters from real Iowans")}</p><span class="stamp big ok slam">${T("VERIFIED")}</span></div>
      <p>${T("A reporter checks your letters. All real.")}</p>${chips({}, 5)}`;
    panel().innerHTML = `<section class="card">${kicker(T("📰 Monday"))}${body}${reveal(T("<b>Framing</b>: how news tells a story. Trust ⭐ shapes yours."))}${nextBtn(T("Play a card →"), 12)}</section>`;
  }

  // Beat 13 · The vote
  function computeVote() {
    const mods = {};
    if (st.trust >= 65) { Object.assign(mods, addLean(st.lean, { lun: 1, bro: 1 }, dir())); }
    else if (st.trust <= 35) { Object.assign(mods, addLean(st.lean, { lun: 1, bro: 1 }, -dir())); }
    const yes = yesCount(st.lean), won = st.side === "fix" ? yes >= NEED : yes < NEED;
    const ending = won ? (shady() ? "ugly" : "clean") : (shady() ? "scandal" : "honest");
    st.vote = { yes, no: 15 - yes, won, ending, mods, trust: st.trust };
    save();
  }
  function voteScreen() {
    if (!st.vote) computeVote();
    const v = st.vote, passed = v.yes >= NEED;
    const trustLine = v.trust >= 65 ? T("High trust ⭐: Lund and Brooks lean your way.")
      : v.trust <= 35 ? T("Low trust ⭐: Lund and Brooks back away.")
      : T("Middle trust ⭐: no change.");
    const roll = [];
    for (let i = 0; i < 5; i++) roll.push({ n: T("🔒"), y: true });
    SEN.forEach(s => roll.push({ n: s.name, y: st.lean[s.id] >= 1, sw: true }));
    for (let i = 0; i < 5; i++) roll.push({ n: T("🔒"), y: false });
    panel().innerHTML = `<section class="card">
      ${kicker(T("🗳️ Vote day"))}
      <p class="trustline">${trustLine}</p>${chips(v.mods)}
      <ol class="roll">${roll.map((r, i) => `<li class="${r.y ? "y" : "n"}${r.sw ? " sw" : ""}" style="--i:${i}"><span>${r.sw ? esc(r.n) : r.n}</span> <b>${r.y ? T("YES") : T("NO")}</b></li>`).join("")}</ol>
      <div class="tally ${v.won ? "win" : "lose"}" id="tally"><p class="big"><b>${v.yes}</b> <span>${T("YES")}</span> · <b>${v.no}</b> <span>${T("NO")}</span></p>
        <p>${passed ? T("The bill PASSES the committee.") : T("The bill DIES in committee.")}</p>
        <p class="verdict">${v.won ? T("You won!") : T("You lost.")}</p><span class="stamp big ${passed ? "ok" : "dead"} slam">${passed ? T("PASSED") : T("DEAD")}</span></div>
      ${reveal(T("Undecided means no, so <b>blocking</b> a bill is easier than <b>passing</b> one."))}
      ${nextBtn(T("See your ending →"), 14)}
    </section>`;
    const anim = !voteAnimated && !st.sub.voteSeen;
    voteAnimated = true;
    if (anim) {
      panel().classList.add("animating");
      setTimeout(() => { panel().classList.remove("animating"); st.sub.voteSeen = true; save(); }, 15 * 160 + 600);
    }
  }

  // Beat 14 · Ending
  const ENDINGS = {
    clean: { icon: "🏆", t: T("CLEAN WIN"), fix: T("The bill passes committee. You played fair, so senators still take your calls."), block: T("The bill dies in committee. You played fair, so senators still take your calls.") },
    ugly: { icon: "⚠️", t: T("WON UGLY"), fix: T("The bill passes committee. But an ethics complaint hits your group. Next time, nobody believes you."), block: T("The bill dies in committee. But an ethics complaint hits your group. Next time, nobody believes you.") },
    honest: { icon: "🌱", t: T("HONEST LOSS"), fix: T("The bill dies in committee. But Iowans trust you, and bills can come back next year."), block: T("The bill passes committee. But Iowans trust you, and the full Senate still has to vote.") },
    scandal: { icon: "💥", t: T("SCANDAL"), fix: T("The bill dies in committee. The scandal is all Iowans remember about your group."), block: T("The bill passes committee. The scandal is all Iowans remember about your group.") }
  };
  function trailHtml() {
    const lines = [];
    [1, 2, 3, 4].forEach(w => {
      const p = st.plays[w]; if (!p) return;
      const c = CARDS[p.card];
      lines.push(`<li><b>${T("Week")} ${w}:</b> <span>${c.name}</span>${p.target ? ` <span>→ ${esc(senBy(p.target).name.split(" ").pop())}</span>` : ""} ${chips(p.mine, p.trustMine)}<span class="rv">${T("Rival:")}</span> ${chips(p.theirs, p.trustRival) || `<span class="rv">${T("blocked")}</span>`}</li>`);
      if (w === 2) lines.push(`<li><b>${T("Week 2:")}</b> <span>${st.picks.superpac === "accept" ? T("Took Super PAC help") : T("Said no to the Super PAC")}</span> ${chips(st.sub.spFx || {}, st.picks.superpac === "accept" ? -15 : 5)}</li>`);
      if (w === 3 && st.picks.dilemma) lines.push(`<li><b>${T("Week 3:")}</b> <span aria-hidden="true">${DIL[st.picks.dilemma].i}</span> <span>${DIL[st.picks.dilemma].t}</span> ${chips(st.sub.dilFx || {}, DIL[st.picks.dilemma].trust)}</li>`);
      if (w === 3 && shady()) lines.push(`<li><b>${T("Week 4:")}</b> <span>${T("Caught by reporters")}</span> ${chips(st.sub.newsFx || {}, -25)}</li>`);
    });
    const mods = st.vote && st.vote.mods || {};
    if (Object.keys(mods).some(k => mods[k])) lines.push(`<li><b>${T("Vote day:")}</b> <span>${st.vote.trust >= 65 ? T("High public trust") : T("Low public trust")}</span> ${chips(mods)}</li>`);
    return lines.join("");
  }
  function ending() {
    if (!st.vote) computeVote();
    const e = ENDINGS[st.vote.ending];
    panel().innerHTML = `<section class="card">
      <div class="ending ${st.vote.ending}"><span class="eicon" aria-hidden="true">${e.icon}</span><h2 class="stampin">${e.t}</h2><p>${e[st.side]}</p>
        <p class="small meterline"><span>${T("Final vote:")}</span> <b>${st.vote.yes}</b> <span>${T("YES")}</span> · <b>${st.vote.no}</b> <span>${T("NO")}</span> · <span>${T("Public trust:")}</span> <b>${st.vote.trust}</b></p></div>
      <h3>${T("Caused by:")}</h3>
      <ul class="trail">${trailHtml()}</ul>
      <div class="real"><p>${T("<b>What really happened:</b> In 2026, the Iowa House passed this bill (HF 2763) 70–18. Makers and dealers said farmers can already get repair tools. The Senate never passed it.")}</p>
        <p class="src">${T("Sources: Iowa Public Radio; Iowa Capital Dispatch; Iowa Farmers Union (2026). Game groups, senators, and votes are made up.")}</p></div>
      ${nextBtn(T("Last step →"), 15)}
    </section>`;
  }

  // Beat 15 · Writing + turn in
  const PROMPTS = [
    { id: "money", short: "Money and lobbying (critique)",
      label: { fix: T("1. How did money shape your game? Why can it be a problem?"), block: T("1. How did money shape your game? Why can it be a problem?") },
      stem: T("I had more ___, so ___. Money can be a problem because ___."), min: 80,
      mustAll: [["money", "volunteer", "volunteers", "people", "members", "lobbyist", "lobbyists", "ads", "calls", "meetings", "dollars", "cash", "budget"], ["problem", "unfair", "fair", "rich", "wealthy", "buy", "louder", "heard", "voice", "access", "everyone", "only", "more meetings", "can't", "cannot", "power"]],
      mustMsg: T("In answer 1, say what your side had more of, and give one reason money in lobbying can be a problem.") },
    { id: "honest", short: "Why honesty matters (civic virtue)",
      label: { fix: T("2. Why does honesty matter? Use a moment from your game."), block: T("2. Why does honesty matter? Use a moment from your game.") },
      stem: T("In my game, ___. Honesty matters because ___."), min: 70,
      mustAll: [["email", "emails", "letter", "letters", "claim", "reporter", "reporters", "hearing", "testify", "fake", "super pac", "trust", "news", "week", "senator", "senators", "lobbyist", "coalition", "petition", "ads", "calls", "vote", "consultant", "caught", "viral", "post"], ["trust", "believe", "real", "voters", "democracy", "fair", "lie", "lying", "truth", "true", "heard", "common good", "honest", "fake", "fool"]],
      mustMsg: T("In answer 2, name a moment from your campaign and explain why honesty matters.") }
  ];
  function writeScreen() {
    const s = st.side;
    panel().innerHTML = `<section class="card">
      <h2>${T("📝 Your campaign report")}</h2>
      ${PROMPTS.map(p => `<label for="w_${p.id}">${p.label[s]}</label><p class="stem">${p.stem}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? T("Turn in again") : T("Turn in")}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? T("✓ Turned in. You can fix your writing and turn it in again.") : ""}</p>
    </section>`;
    PROMPTS.forEach(p => { $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }); });
    $("sendBtn").onclick = turnIn;
  }
  function plain(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  async function turnIn() {
    const msg = $("sendMsg");
    const isEs = window.SiteLang && window.SiteLang.isEs();
    for (const p of ((window.classIsTestT && window.classIsTestT()) ? [] : PROMPTS)) {   // Test T. (teacher) skips the writing rules
      const box = $("w_" + p.id), v = (box.value || "").trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: isEs ? window.SiteLang.t(p.stem) : p.stem, source: "from your game", sourceEs: "de tu juego" });
        if (junk) { msg.textContent = (isEs ? "En " + window.SiteLang.t(p.short) : "For " + p.short) + ": " + junk; msg.className = "msg"; return; }
      }
      if (v.length < p.min) { msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
      if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; msg.className = "msg bad"; box.focus(); return; }
      const stemText = window.SiteLang ? p.stem + " " + window.SiteLang.t(p.stem) : p.stem;
      const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
      const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshW.size < 6) { msg.textContent = "Add more of your own ideas for: " + p.short + ". Use details from today."; msg.className = "msg bad"; box.focus(); return; }
      let groups = p.mustAll;
      const esWords = window.SiteLang && window.SiteLang.must(p.id);
      if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    const answers = buildAnswers();
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGN, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      $("sendBtn").textContent = "✓ Turned in"; $("sendBtn").disabled = false;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }
  function buildAnswers() {
    const answers = { "Standard": STANDARD };
    const right = CHECK_IDS.filter(id => !st.wrong[id]).length;
    answers["First-try correct"] = right + " of " + CHECK_IDS.length;
    const byStd = {};
    CHECK_IDS.forEach(id => { const k = CHECKS[id].std; byStd[k] = byStd[k] || [0, 0]; byStd[k][1]++; if (!st.wrong[id]) byStd[k][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort((a, b) => parseInt(a.split(".")[1], 10) - parseInt(b.split(".")[1], 10)).map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECK_IDS.forEach(id => { const n = st.wrong[id] || 0; answers[CHECKS[id].short] = CHECKS[id].opts[0] + (n ? " (after " + n + " wrong " + (n === 1 ? "try" : "tries") + ")" : " (first try)"); });
    answers["Side (assigned at random)"] = SIDES[st.side].name + (st.side === "fix" ? " (pass the bill)" : " (block the bill)");
    [1, 2, 3, 4].forEach(w => { const p = st.plays[w]; if (p) answers["Choice · Week " + w + " card"] = CARDS[p.card].name + (p.target ? " → " + senBy(p.target).name : ""); });
    answers["Choice · Super PAC offer"] = st.picks.superpac === "accept" ? "Took the help (outside money)" : "Said no thanks";
    answers["Choice · Late-night offer (civic virtue)"] = st.picks.dilemma === "astro" ? "Sent fake emails (astroturf) — got caught" : st.picks.dilemma === "viral" ? "Posted an unproven claim (disinformation) — got caught" : "Honest letters from real members";
    if (st.vote) {
      answers["Ending"] = { clean: "Clean Win", ugly: "Won Ugly", honest: "Honest Loss", scandal: "Scandal" }[st.vote.ending] + " · committee vote " + st.vote.yes + " YES, " + st.vote.no + " NO";
      answers["Public trust at the vote"] = st.vote.trust + " of 100";
    }
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id) ? $("w_" + p.id).value : st.writing[p.id] || "").trim(); });
    if (st.started) answers["Minutes in the game"] = String(Math.max(1, Math.round((Date.now() - st.started) / 60000)));
    return answers;
  }

  // ---------------- Router ----------------
  let firstRender = true;
  function render() {
    if (!firstRender) $("welcome").hidden = true;
    firstRender = false;
    hud();
    const b = st.beat;
    if (b <= 0 || !st.side) return intro();
    if (b === 1) client();
    else if (b === 2) w1check();
    else if (b === 3) playScreen(1);
    else if (b === 4) pacCall();
    else if (b === 5) superPac();
    else if (b === 6) playScreen(2);
    else if (b === 7) tally();
    else if (b === 8) playScreen(3);
    else if (b === 9) wall();
    else if (b === 10) dilemma();
    else if (b === 11) w4news();
    else if (b === 12) playScreen(4);
    else if (b === 13) voteScreen();
    else if (b === 14) ending();
    else writeScreen();
    hud();
    flashFx = null;
  }
  // Next buttons: only ever move to the step after this one (no skipping).
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-next]");
    if (!b) return;
    const to = +b.dataset.next;
    if (to === st.beat + 1) go(to);
  });
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    voteAnimated = false; save(); render(); window.scrollTo(0, 0);
  };
  if (st.beat >= 1 && st.side) {
    $("welcome").innerHTML = `<span>${T("Welcome back,")}</span> <b>${esc(st.name)}</b><span>${T("! You're on step")}</span> <b>${Math.min(st.beat, STEPS)}</b> <span>${T("of")}</span> <b>${STEPS}</b><span>.</span>`;
    $("welcome").hidden = false;
  }
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any step or answer the current one.
  // Jumping ahead plays earlier steps with the first choice / first card it can afford (Test T. only).
  try {
    const LABELS = ["Title", "Your client", "Week 1 · team meeting", "Week 1 · card", "Week 2 · PAC call", "Week 2 · Super PAC", "Week 2 · card", "Week 3 · tally", "Week 3 · card", "Week 3 · the wall", "Week 3 · late-night offer", "Week 4 · news", "Week 4 · card", "Vote day", "Ending", "Report + turn in"];
    const PLAY_W = { 3: 1, 6: 2, 8: 3, 12: 4 };
    const solveHere = () => {
      locked = false;
      const ck = panel().querySelector('[id^="chk_"]');
      if (ck) { const id = ck.id.slice(4); if (!st.done[id]) { st.done[id] = true; justDone = id; save(); render(); return true; } }
      const w = PLAY_W[st.beat];
      if (w && !st.plays[w]) {
        const id = CARD_ORDER.find(k => !st.used[k] && st.money >= CARDS[k].money && st.vol >= CARDS[k].vol);
        if (id) { play(w, id, CARDS[id].pick ? SEN[0].id : null); return true; }
        return false;
      }
      const d = panel().querySelector("[data-sp], [data-dil]");
      if (d && d.onclick) { d.onclick(); return true; }
      return false;
    };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => LABELS.length,
      index: () => st.side ? Math.max(0, Math.min(LABELS.length - 1, st.beat)) : 0,
      label: i => LABELS[i],
      go: i => {
        if (!st.name) st.name = "Test T.";
        if (!st.side) { st.side = Math.random() < 0.5 ? "fix" : "block"; st.money = SIDES[st.side].money; st.vol = SIDES[st.side].vol; st.started = Date.now(); }
        locked = false;
        for (let b = 1; b < i; b++) { st.beat = b; sel = null; selTarget = null; render(); for (let k = 0; k < 3 && solveHere(); k++); }
        st.beat = i; sel = null; selTarget = null; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => { if (st.side && st.beat > 0) solveHere(); }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
  window.__lobby = { get st() { return st; }, closest, yesCount, CHECKS, CARDS };
})();
