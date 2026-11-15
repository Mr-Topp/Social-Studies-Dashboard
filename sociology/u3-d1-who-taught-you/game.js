// =====================================================================
//  BORN THIS WAY OR SOCIALIZATION?  (Sociology Unit 3 · Day 1 · SS.9-12.Soc.9)
//  Built to Fynn's ask (11/14): scenarios, students answer "was this socialization or were
//  they born this way," and a reflective piece at the end.
//  12 scenario cards, one at a time. Tap the side the card belongs on (or use the ← → keys).
//  Right: the card flies into that pile and the one-line "why" rides along on top of the next card.
//  Wrong: the card shakes, a short hint shows, try again (the teacher's first-try score stays honest).
//  Then: both piles side by side (8 and 8), then ONE reflection, then turn in.
//  Scenarios come from the Day 1 slides (habits, eye color, reflexes, language, Isabelle, boot camp).
//  One screen, no scrolling on a Chromebook. Test T. can skip everything.
//  Turn-in via shared/turnin.js with the SAME assignmentId as before, so the dashboard link holds.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u3-d1-born-or-socialization-v1";
  const ASSIGNMENT_ID = "soc-u3-d1-who-taught-you";
  const TITLE = "Sociology · Unit 3 · Day 1 · Born This Way or Socialization?";
  const STANDARD = "SS.9-12.Soc.9";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  // 11/15/26: wrong answers lock longer each time on the same card, and each card stays up long enough to read.
  const LOCKS = [8, 15, 25, 35];
  const lockFor = n => LOCKS[Math.min(Math.max(n, 1), LOCKS.length) - 1];
  // Read time covers the card plus the "why" from the last card shown above it (slow, careful pace).
  const readFor = (c, prev) => Math.max(12, Math.ceil(((c.who + " " + c.t + " " + (prev ? prev.why : "")).split(/\s+/).length) * 60 / 70));

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isT = () => !!(window.classIsTestT && window.classIsTestT());

  const SIDES = {
    born: { icon: "🧬", name: "Born this way", sub: "Came with it. Nobody taught it." },
    soc: { icon: "🤝", name: "Socialization", sub: "Learned it from people." }
  };

  // ---------------- The 12 scenarios ----------------
  const CARDS = [
    { id: "ope", icon: "🤷", who: "Kayla, 16", t: "Kayla says “ope” when she bumps into someone. So does everybody in her Iowa town.", p: ["Kayla says “ope” when she bumps into someone.", "So does everybody in her Iowa town."], ok: 1, ans: "soc",
      why: "Nobody is born saying “ope.” She picked it up from the people around her.", hint: "Would she say it if she grew up in another country?", tag: "Says “ope”" },
    { id: "eyes", icon: "👁️", who: "Maya, 15", t: "Maya has brown eyes, just like her mom.", p: ["Maya has brown eyes,", "just like her mom."], ok: 1, ans: "born",
      why: "Eye color comes from her genes. That is nature.", hint: "Did anyone teach Maya her eye color?", tag: "Brown eyes" },
    { id: "text", icon: "💬", who: "Marcus, 17", t: "Marcus texts his boss, “Good morning, I'm running 5 minutes late.” He texts his friends, “omw lol.” His first manager showed him how to text about being late.", p: ["Marcus texts his boss, “Good morning, I'm running 5 minutes late.”", "He texts his friends, “omw lol.”", "His first manager showed him how to text about being late."], ok: 2, ans: "soc",
      why: "He learned which words fit which people. People taught him that.", hint: "How did he find out you can't text a boss like a friend?", tag: "Texts boss vs. friends" },
    { id: "hawk", icon: "🏈", who: "Dre, 16", t: "Dre roots for the Hawkeyes. So does his dad. So did his grandpa, who took him to his first game.", p: ["Dre roots for the Hawkeyes.", "So does his dad. So did his grandpa, who took him to his first game."], ok: 1, ans: "soc",
      why: "Nobody is born a Hawkeye fan. His family raised him into it.", hint: "What if a Cyclone family had raised him?", tag: "Hawkeye fan" },
    { id: "grab", icon: "👶", who: "A newborn", t: "A newborn wraps her hand around your finger and holds on tight.", p: ["A newborn", "wraps her hand around your finger", "and holds on tight."], ok: 0, ans: "born",
      why: "That is a reflex. Babies do it with no teaching at all.", hint: "She is one day old. Who could have taught her?", tag: "Baby grabs a finger" },
    { id: "spanish", icon: "🗣️", who: "Elena, 15", t: "Elena speaks Spanish at home with her family and English at school with her friends.", p: ["Elena speaks Spanish", "at home with her family", "and English at school with her friends."], ok: 1, ans: "soc",
      why: "Babies can learn any language. The ones you speak come from who raised you. Learning the basics at home is primary socialization.", hint: "Would she speak Spanish if nobody around her did?", tag: "Speaks two languages" },
    { id: "grow", icon: "📏", who: "Jordan, 14", t: "Jordan grew 4 inches the summer before 9th grade, the same as his older brothers did.", p: ["Jordan grew 4 inches", "the summer before 9th grade,", "the same as his older brothers did."], ok: 2, ans: "born",
      why: "Growing taller is your body, not a lesson. That is nature.", hint: "Can a person be taught to grow?", tag: "Growth spurt" },
    { id: "cry", icon: "😤", who: "Jay, 10", t: "Jay's uncles always told him, “Big boys don't cry.” Now Jay never cries in front of people.", p: ["Jay's uncles always told him, “Big boys don't cry.”", "Now Jay never cries in front of people."], ok: 0, ans: "soc",
      why: "It looks like just who he is. But he learned it from his family.", hint: "What did his uncles keep telling him?", tag: "“Big boys don't cry”" },
    { id: "isabelle", icon: "📁", who: "Isabelle, 1938", real: true, t: "Isabelle was found at 6½, kept hidden away. She could not talk. After 2 years of daily lessons, she talked like other kids her age.", p: ["Isabelle was found at 6½, kept hidden away.", "She could not talk.", "After 2 years of daily lessons, she talked like other kids her age."], ok: 2, ans: "soc",
      why: "She was born able to learn. But it took people to teach her.", hint: "What changed once she had a teacher every day?", tag: "Isabelle learns to talk" },
    { id: "hungry", icon: "🍼", who: "A baby", t: "A baby cries when she is hungry, even on her very first day.", p: ["A baby", "cries when she is hungry,", "even on her very first day."], ok: 2, ans: "born",
      why: "Nobody shows a baby how to cry. She is born doing it.", hint: "Does a baby need a lesson to cry?", tag: "Baby cries when hungry" },
    { id: "shadow", icon: "🩺", who: "Tasha, 17", t: "Tasha follows a nurse around for a day to see what the job is really like. She wants to be a nurse after she graduates.", p: ["Tasha follows a nurse around for a day", "to see what the job is really like.", "She wants to be a nurse after she graduates."], ok: 0, ans: "soc",
      why: "She is practicing for a role she doesn't have yet. That is anticipatory socialization.", hint: "Is she learning from someone, or was she born knowing the job?", tag: "Job-shadows a nurse" },
    { id: "boot", icon: "🪖", who: "Marine recruits", real: true, t: "After 13 weeks of boot camp, Marine recruits walk, talk, and dress the same way.", p: ["After 13 weeks of boot camp,", "Marine recruits walk, talk, and dress the same way."], ok: 0, ans: "soc",
      why: "Old habits out, new ones in, fast. That is resocialization.", hint: "Were they like this before boot camp?", tag: "Boot camp" },
    // Added 11/15/26 (Fynn: "even the rusher takes 15 minutes") so the piles are even, 8 and 8.
    { id: "freckles", icon: "🌞", who: "Leah, 15", t: "Leah has freckles across her nose, just like her grandma did.", p: ["Leah has freckles across her nose,", "just like her grandma did."], ok: 1, ans: "born",
      why: "Freckles run in families through genes. Nobody teaches them.", hint: "Could anyone have taught Leah to have freckles?", tag: "Freckles" },
    { id: "root", icon: "🍼", who: "A newborn", t: "Touch a newborn's cheek and she turns her head that way, looking for milk.", p: ["Touch a newborn's cheek", "and she turns her head that way,", "looking for milk."], ok: 0, ans: "born",
      why: "That is the rooting reflex. Every healthy baby is born with it.", hint: "She is brand new. When would she have learned it?", tag: "Baby turns toward a touch" },
    { id: "color", icon: "🎨", who: "Chris, 17", t: "Chris can't tell some reds from greens. His grandpa couldn't either.", p: ["Chris can't tell some reds from greens.", "His grandpa couldn't either."], ok: 1, ans: "born",
      why: "Colorblindness is passed down in genes. That is nature.", hint: "Is this something a person learns?", tag: "Colorblind like Grandpa" },
    { id: "sneeze", icon: "🤧", who: "Sam, 16", t: "Sam sneezes every time he walks out into bright sun. Doctors say some people are born with this reflex.", p: ["Sam sneezes every time he walks out into bright sun.", "Doctors say some people are born with this reflex."], ok: 1, ans: "born",
      why: "Some people inherit a sun-sneeze reflex. It is in the body, not taught.", hint: "Would anyone teach a kid to sneeze at the sun?", tag: "Sneezes in the sun" }
  ];
  // Mix the added cards in so the two sides don't come in streaks.
  (function () { const order = ["ope", "eyes", "freckles", "text", "hawk", "grab", "spanish", "root", "grow", "cry", "color", "isabelle", "hungry", "shadow", "sneeze", "boot"];
    CARDS.sort((x, y) => order.indexOf(x.id) - order.indexOf(y.id)); })();
  const N = CARDS.length;
  const TOTAL = N + 2;   // cards, results, reflection

  // ---------------- The reflection ----------------
  const PROMPT = { id: "w1", short: "Reflection: born with it vs. socialized",
    label: "Now you. Name one thing you were born with and one thing you were socialized to do.",
    help: "Use yourself, or make someone up. You never have to share anything private.",
    stem: "One thing I was born with is ___. One thing I was socialized to do is ___. I learned it from ___.",
    min: 70, mustAll: [["born"], ["learn", "taught", "teach", "socializ", "showed", "raised", "from"]],
    mustMsg: "Name one thing you were born with AND one thing you learned from other people." };

  // ---------------- State ----------------
  const fresh = () => ({ v: 1, name: "", step: -1, done: {}, miss: {}, pdone: {}, pmiss: {}, streak: 0, last: null, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 1 || !st.done || !st.miss) st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts fresh.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    if (now && st.name && now !== st.name.trim().toLowerCase()) st = fresh();
  } catch (e) {}
  if (!st.pdone) st.pdone = {}; if (!st.pmiss) st.pmiss = {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  let anim = false, locked = false;
  const firstTry = () => CARDS.filter(c => st.done[c.id] && !st.miss[c.id]).length;
  const proofFirst = () => CARDS.filter(c => st.pdone[c.id] && !st.pmiss[c.id]).length;
  const pile = side => CARDS.filter(c => st.done[c.id] && c.ans === side).length;

  // ---------------- Status bar ----------------
  let lastStreak = null, lastScore = null;
  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    document.body.classList.toggle("on-title", !show);
    if (!show) return;
    const doneN = CARDS.filter(c => st.done[c.id]).length;
    $("progFill").style.width = Math.round(doneN / N * 100) + "%";
    $("stepCt").textContent = st.step < N ? "Card " + (st.step + 1) + " of " + N : st.step === N ? "Results" : "Reflection";
    const sc = firstTry();
    $("streak").textContent = st.streak; $("score").textContent = sc + "/" + N;
    if (lastStreak != null && st.streak > lastStreak) { const b = $("streakBox"); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
    if (lastScore != null && sc > lastScore) { const b = $("scoreBox"); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
    lastStreak = st.streak; lastScore = sc;
  }

  // ---------------- Pieces ----------------
  const app = $("app");
  function nextBtn(label) { return `<button type="button" class="next" id="nextBtn"><span>${esc(label || "Next")}</span> →</button>`; }
  function goNext() { st.step = Math.min(st.step + 1, TOTAL - 1); anim = true; locked = false; save(); render(); toTop(); }
  // Put the status bar at the very top of the window, so the whole screen shows without scrolling.
  function toTop() {
    const h = $("hud");
    const y = h && !h.hidden ? Math.max(0, Math.round($("wrap").getBoundingClientRect().top + window.scrollY - h.getBoundingClientRect().height)) : 0;
    window.scrollTo(0, y);
  }
  // Short windows: shrink the whole game a little so every screen still fits. Full size at 600px tall and up.
  function fitZoom() {
    const z = window.innerWidth < 761 ? 1 : Math.max(0.7, Math.min(1, window.innerHeight / 600));
    const v = z === 1 ? "" : String(Math.round(z * 100) / 100);
    $("hud").style.zoom = v; $("wrap").style.zoom = v;
  }
  window.addEventListener("resize", fitZoom);

  // ---------------- Title ----------------
  function intro() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title-card">
      <p class="eyebrow">Sociology · Unit 3 · Day 1</p>
      <h1 class="big-title"><span class="tb">BORN THIS WAY</span><span class="tor">or</span><span class="tm">SOCIALIZATION?</span></h1>
      <p class="hook">16 people. One question each. Were they born this way, or did people teach them?</p>
      <div class="demo" aria-hidden="true"><span class="b born">🧬 Born this way</span><span class="arrow">←</span><span class="mini">🏈 Dre roots for the Hawkeyes…</span><span class="arrow">→</span><span class="b soc">🤝 Socialization</span></div>
      <div class="title-tiles"><span>🃏 <b>16</b> quick cards</span><span>🔎 Prove every card</span><span>✍️ <b>1</b> reflection</span><span>⏱ <b>15</b> minutes</span></div>
      <p class="goal"><b>Today's goal:</b> <span>Explain how people teach us who to be, from birth to adulthood.</span></p>
      <div class="title-start"><div class="namebox"><label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(pre)}"></div>
        <button type="button" class="big" id="startBtn"><span>Deal the cards</span> →</button></div>
      <p id="introMsg" class="msg" role="status"></p>
      <p class="small-print"><b>SS.9-12.Soc.9</b> Describe the process of socialization across the life course.</p></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ \p{Lu}\.$/u.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 0; anim = true; save(); render(); toTop();
    };
  }

  // ---------------- A card ----------------
  function lastStrip() {
    const c = st.last && CARDS.find(x => x.id === st.last);
    if (!c) return `<p class="last empty">Read the card. Tap the side it belongs on. Then prove it: tap the words that show it.</p>`;
    return `<p class="last ${c.ans}" role="status"><span class="ltag">✓ ${esc(SIDES[c.ans].name)}</span><span>${esc(c.why)}</span></p>`;
  }
  function bucketHtml(side, off) {
    const s = SIDES[side], n = pile(side);
    return `<button type="button" class="bucket ${side}" data-k="${side}"${off ? " disabled" : ""}><span class="bi" aria-hidden="true">${s.icon}</span><b>${esc(s.name)}</b><span class="bs">${esc(s.sub)}</span><span class="pile">${n} ${n === 1 ? "card" : "cards"} here</span></button>`;
  }
  let pickFn = null;
  function cardView() {
    const c = CARDS[st.step];
    app.innerHTML = `<section class="scene">${lastStrip()}
      <div class="table">${bucketHtml("born")}
        <div class="card" id="card"><span class="ci" aria-hidden="true">${c.icon}</span><span class="who">${c.real ? `<span class="real">REAL</span>` : ""}${esc(c.who)}</span><p class="ct" id="ct">${c.p.map((x, i) => `<span class="ev" data-i="${i}">${esc(x)}</span>`).join(" ")}</p><p class="cq" id="cq">Born this way, or socialization?</p></div>
        ${bucketHtml("soc")}</div>
      <p class="msg" id="qmsg" aria-live="polite"></p></section>`;
    const btns = [...app.querySelectorAll(".bucket")], fb = $("qmsg"), card = $("card");
    const setOff = off => btns.forEach(b => b.disabled = off);
    // "Prove it" (Fynn 11/15/26): after the right side, tap the words on the card that prove it.
    let plocked = false, proofSolve = null;
    const flyAway = () => {
      card.classList.remove("proofing");
      card.classList.add("fly-" + c.ans);
      const b = app.querySelector(".bucket." + c.ans); b.classList.add("hit");
      setTimeout(goNext, isT() ? 150 : 430);
    };
    const proofStage = () => {
      locked = true; setOff(true);
      const b = app.querySelector(".bucket." + c.ans); if (b) b.classList.add("chosen");
      $("cq").innerHTML = `✓ ${esc(SIDES[c.ans].name)}. <b>🔎 Now prove it:</b> tap the words on the card that show it.`;
      card.classList.add("proofing");
      const evs = [...card.querySelectorAll(".ev")];
      const tap = el => {
        if (plocked || st.pdone[c.id]) return;
        if (+el.dataset.i === c.ok) {
          st.pdone[c.id] = true; el.classList.add("evok");
          if (window.classFirstTry) window.classFirstTry.right(c.id + "~p");
          save(); fb.textContent = ""; setTimeout(flyAway, isT() ? 50 : 500); return;
        }
        st.pmiss[c.id] = (st.pmiss[c.id] || 0) + 1; st.streak = 0;
        if (window.classFirstTry) window.classFirstTry.wrong();
        save(); hud();
        el.classList.remove("evno"); void el.offsetWidth; el.classList.add("evno");
        plocked = true; card.classList.add("plocked");
        let left = isT() ? 0 : lockFor(st.pmiss[c.id]);
        const tick = () => {
          if (left <= 0) { plocked = false; card.classList.remove("plocked"); fb.textContent = "Try again. Which words show " + (c.ans === "born" ? "it came with her body or genes" : "someone taught it") + "?"; fb.className = "msg bad"; return; }
          fb.textContent = "That part doesn't prove it. Read the card again. " + left + "…"; fb.className = "msg bad";
          left--; setTimeout(tick, 1000);
        };
        tick();
      };
      evs.forEach(e => { e.setAttribute("role", "button"); e.tabIndex = 0; e.onclick = () => tap(e); e.onkeydown = ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); tap(e); } }; });
      proofSolve = () => { plocked = false; tap(evs[c.ok]); };
    };
    pickFn = side => {
      if (st.done[c.id]) { if (proofSolve) proofSolve(); return; }
      if (locked) return;
      if (side === c.ans) {
        locked = true; setOff(true);
        st.done[c.id] = true; st.last = c.id; st.streak = st.miss[c.id] ? 0 : st.streak + 1;
        if (window.classFirstTry) window.classFirstTry.right(c.id);
        save(); hud(); fb.textContent = "";
        proofStage();
        return;
      }
      st.miss[c.id] = (st.miss[c.id] || 0) + 1; st.streak = 0;
      if (window.classFirstTry) window.classFirstTry.wrong();
      save(); hud();
      card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
      locked = true; setOff(true);
      let left = isT() ? 0 : lockFor(st.miss[c.id]);   // Test T.: no wait
      const tick = () => {
        if (left <= 0) { locked = false; setOff(false); fb.textContent = "Try again. " + c.hint; fb.className = "msg bad"; return; }
        fb.textContent = "Not quite. " + c.hint + " " + left + "…"; fb.className = "msg bad";
        left--; setTimeout(tick, 1000);
      };
      tick();
    };
    btns.forEach(b => b.onclick = () => pickFn(b.dataset.k));
    locked = false;
    if (st.done[c.id]) { proofStage(); return; }   // came back mid-card: finish the proof
    if (!isT()) {   // the card (and the last card's "why") stays up long enough to read, even after a refresh
      locked = true; setOff(true);
      const prev = st.step > 0 ? CARDS[st.step - 1] : null;
      let left = readFor(c, prev);
      const tick = () => {
        if (CARDS[st.step] !== c || st.done[c.id]) return;
        if (left <= 0) { locked = false; setOff(false); fb.textContent = ""; return; }
        fb.textContent = "Read the card. The sides open in " + left + "…"; fb.className = "msg";
        left--; setTimeout(tick, 1000);
      };
      tick();
    }
  }
  document.addEventListener("keydown", ev => {
    if (st.step < 0 || st.step >= N || !pickFn) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((ev.target && ev.target.tagName) || "")) return;
    if (ev.key === "ArrowLeft") { ev.preventDefault(); pickFn("born"); }
    else if (ev.key === "ArrowRight") { ev.preventDefault(); pickFn("soc"); }
  });

  // ---------------- Results: the two piles ----------------
  function endView() {
    pickFn = null;
    const born = CARDS.filter(c => c.ans === "born"), soc = CARDS.filter(c => c.ans === "soc");
    const sc = firstTry();
    const chips = list => list.map((c, i) => `<span class="chip" style="animation-delay:${i * 60}ms"><span aria-hidden="true">${c.icon}</span> ${esc(c.tag)}</span>`).join("");
    app.innerHTML = `<section class="scene"><p class="kicker">All 16 sorted</p><h2>Look at the two piles.</h2>
      <div class="piles"><div class="pilebox born"><h3>🧬 Born this way · ${born.length}</h3><div class="chips">${chips(born)}</div></div>
        <div class="pilebox soc"><h3>🤝 Socialization · ${soc.length}</h3><div class="chips">${chips(soc)}</div></div></div>
      <p class="bigidea">You are born with a body. <b>People teach you how to be a person.</b> That is socialization.</p>
      <div class="end-foot"><span class="soft">You got ${sc} of ${N} on the first try.</span>${nextBtn("Last step: your reflection")}</div></section>`;
    $("nextBtn").onclick = goNext;
  }

  // ---------------- Reflection + turn in ----------------
  function writeView() {
    pickFn = null;
    const p = PROMPT;
    app.innerHTML = `<section class="scene write"><div class="phone"><div class="ph-top"><span>✍️ Your reflection</span> · <b>${esc(st.name)}</b></div>
      <div class="wq"><label for="w_${p.id}">${esc(p.label)}</label><p class="help">${esc(p.help)}</p><p class="stem"><b>Start like this:</b> <span class="starter">${esc(p.stem)}</span></p>
        <textarea id="w_${p.id}" rows="4" data-starter="${esc(p.stem)}">${esc(st.writing[p.id] || "")}</textarea></div>
      <button type="button" class="big" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      ${st.turnedIn ? `<p class="turned" id="turnedTag">✓ Turned in</p>` : ""}</div></section>`;
    $("w_" + p.id).addEventListener("input", ev => { st.writing[p.id] = ev.target.value; save(); });
    $("sendBtn").onclick = send;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem(p) {
    if (isT()) return "";   // Test T. (teacher) skips the writing rules
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
      if (junk) return junk;
    }
    if (v.length < p.min) return "Write a little more (2–3 full sentences).";
    if (/_{2,}/.test(v)) return "Fill in the blanks with your own words.";
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const own = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(x => !stemWords.has(x)));
    if (own.size < 5) return "Add more of your own ideas. What is the thing, and who taught it?";
    if (p.mustAll.some(g => !g.some(x => plain(v).includes(plain(x))))) return p.mustMsg;
    return "";
  }
  function buildAnswers() {
    const a = { "Standard": STANDARD };
    a["First-try correct"] = (firstTry() + proofFirst()) + " of " + (2 * N);
    a["First-try by standard"] = "Soc.9: " + (firstTry() + proofFirst()) + " of " + (2 * N);
    a["First-try · Prove-it taps"] = proofFirst() + " of " + N;
    const side = k => CARDS.filter(c => c.ans === k);
    a["First-try · Born this way cards"] = side("born").filter(c => !st.miss[c.id]).length + " of " + side("born").length;
    a["First-try · Socialization cards"] = side("soc").filter(c => !st.miss[c.id]).length + " of " + side("soc").length;
    CARDS.forEach((c, i) => { const m = st.miss[c.id] || 0; a[(i + 1) + ". " + c.tag] = SIDES[c.ans].name + (m ? " (after " + m + " wrong " + (m === 1 ? "try" : "tries") + ")" : " (first try)"); });
    a["Writing: " + PROMPT.short] = ($("w_" + PROMPT.id).value || "").trim();
    return a;
  }
  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    const prob = writingProblem(PROMPT);
    if (prob) { msg.textContent = prob; msg.className = "msg bad"; $("w_" + PROMPT.id).focus({ preventScroll: true }); return; }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in for this activity isn't switched on yet. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }
    btn.disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      btn.textContent = "Turned in ✓"; btn.disabled = false;
      if (!$("turnedTag")) msg.insertAdjacentHTML("afterend", `<p class="turned" id="turnedTag">✓ Turned in</p>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; btn.disabled = false; }
  }

  // ---------------- Render ----------------
  let firstRender = true;
  function render() {
    if (!firstRender) $("welcome").hidden = true;
    firstRender = false;
    hud();
    app.classList.toggle("anim", anim);
    try {
      if (st.step < 0) { pickFn = null; return intro(); }
      if (st.step < N) return cardView();
      if (st.step === N) return endView();
      return writeView();
    } finally { anim = false; }
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    lastStreak = null; lastScore = null; locked = false; save(); render(); toTop();
  };
  if (st.step >= 0) {
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " — you're on " + (st.step < N ? "card " + (st.step + 1) + " of " + N : st.step === N ? "the results" : "the reflection") + ".")}</span> <button type="button" class="notyou" id="notYouBtn">Not you? Start fresh</button>`;
    $("welcome").hidden = false;
    try { history.scrollRestoration = "manual"; } catch (e) {}
    window.scrollTo(0, 0);
    // Shared Chromebooks: a different student wipes this saved game, first-try record, and saved name, then reloads clean.
    $("notYouBtn").onclick = () => {
      st = fresh();
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      try { localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      save(); location.reload();
    };
  }
  fitZoom();
  // Read-only test hook (lets automated tests see progress). Students never see it.
  window.__sortGame = { get state() { return JSON.parse(JSON.stringify(st)); }, cards: CARDS.map(c => ({ id: c.id, ans: c.ans })) };
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL + 1,
      index: () => st.step < 0 ? 0 : Math.min(st.step, TOTAL - 1) + 1,
      label: i => i === 0 ? "Title" : i <= N ? "Card " + i + ": " + CARDS[i - 1].tag : i === N + 1 ? "Results (the two piles)" : "Reflection + turn in",
      go: i => {
        if (!st.name) st.name = "Test T.";
        const t = i - 1;
        for (let j = 0; j < t && j < N; j++) { st.done[CARDS[j].id] = true; st.pdone[CARDS[j].id] = true; }
        st.last = t > 0 && t <= N ? CARDS[Math.min(t, N) - 1].id : null;
        locked = false; anim = false;
        st.step = t; save(); render(); toTop();
      },
      solve: () => { if (st.step >= 0 && st.step < N && pickFn) { if (!st.done[CARDS[st.step].id]) locked = false; pickFn(CARDS[st.step].ans); } }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
