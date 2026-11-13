// =====================================================================
//  FRONT PAGE: A NATION DIVIDED  (U.S. History · Unit 3 · Day 4)
//  The Vietnam War on the American home front, 1954–1973, as an Iowa newspaper.
//  Core loop: each edition, 3 real stories come in on the wire. There is room for 2:
//  one LEAD (counts most) and one SIDE story. The third gets cut.
//  Board: Reader trust, White House access (Mr. Whitcomb, a made-up press aide, the rival),
//  hawk-vs-dove readers (a tug bar: lean too far and half the town cancels),
//  and the credibility gap (what leaders SAID vs. what reporters SAW).
//  Printing the official line wins access but stores an "unchecked claim" (🙈).
//  In 1971 the Pentagon Papers come out and every unchecked claim is EXPOSED (trust drops).
//  6 evidence checks live in the world (1954 file, Tonkin text, Tinker ruling, TV, letters, secret memo).
//  5 endings, each with a "Caused by" trail. Word budget: ≤35 words a screen.
//  Turn-in: shared/turnin.js classTurnIn, same payload shape as shared/unit-game.js finish().
//  English only (Fynn, 2026-11-03).
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u3-d6-vietnam-v2";
  const CFG = {
    assignmentId: "ush-u3-d6-vietnam",
    title: "U.S. History · Unit 3 · Day 4 · Front Page: A Nation Divided",
    standard: "SS.9-12.US.35, SS.9-12.US.37, SS.9-12.US.38, SS.9-12.US.40, SS.9-12.US.41",
    oldApi: "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit"
  };
  const TOTAL = 9;
  const LOCK = 5;
  const PAPER = "The Cedar Valley Courier";

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const sg = n => (n > 0 ? "+" : "−") + Math.abs(n);

  // ---------- state ----------
  function fresh() {
    return { v: 1, name: "", step: 0, phase: 0, m: { t: 5, a: 6, l: 0 }, hidden: [], exposed: [],
      drafts: {}, printed: {}, picks: {}, wrong: {}, done: {}, trail: [], writing: {}, turnedIn: false, ending: null, tapped: false };
  }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1 || !st.m) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this device, start clean.
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const clampM = () => { const m = st.m; m.t = Math.max(0, Math.min(10, m.t)); m.a = Math.max(0, Math.min(10, m.a)); m.l = Math.max(-6, Math.min(6, m.l)); };
  const hiddenN = () => st.hidden.reduce((s, h) => s + h.w, 0);

  let pending = null;
  function applyFx(fx) {
    if (fx.t) st.m.t += fx.t;
    if (fx.a) st.m.a += fx.a;
    if (fx.l) st.m.l += fx.l;
    clampM();
    pending = Object.assign({}, pending || {}, fx);
  }
  function fxTags(fx) {
    const out = [];
    if (fx.t) out.push(`<span class="tag ${fx.t > 0 ? "up" : "down"}">🗞️ ${sg(fx.t)} trust</span>`);
    if (fx.a) out.push(`<span class="tag ${fx.a > 0 ? "up" : "down"}">🕴️ ${sg(fx.a)} access</span>`);
    if (fx.l) out.push(`<span class="tag ${fx.l > 0 ? "h" : "d"}">${fx.l > 0 ? "🦅" : "🕊️"} +${Math.abs(fx.l)} ${fx.l > 0 ? "hawk" : "dove"}</span>`);
    if (fx.s) out.push(`<span class="tag x">🙈 +${fx.s} unchecked</span>`);
    return out.join("");
  }
  function fxText(fx) {
    const out = [];
    if (fx.t) out.push("trust " + sg(fx.t));
    if (fx.a) out.push("access " + sg(fx.a));
    if (fx.l) out.push((fx.l > 0 ? "hawk " : "dove ") + "+" + Math.abs(fx.l));
    if (fx.s) out.push("unchecked +" + fx.s);
    return out.join(", ");
  }
  function chipsFor(fx) {
    const out = [];
    if (fx.t) out.push(`<span class="chip ${fx.t > 0 ? "g" : "c"}">🗞️ ${sg(fx.t)}</span>`);
    if (fx.a) out.push(`<span class="chip ${fx.a > 0 ? "g" : "c"}">🕴️ ${sg(fx.a)}</span>`);
    if (fx.l) out.push(`<span class="chip ${fx.l > 0 ? "h" : "d"}">${fx.l > 0 ? "🦅" : "🕊️"} +${Math.abs(fx.l)}</span>`);
    if (fx.s) out.push(`<span class="chip x">🙈 +${fx.s}</span>`);
    return out.join("");
  }
  // A side story counts about half (never zero).
  const half = v => !v ? 0 : Math.sign(v) * Math.max(1, Math.floor(Math.abs(v) / 2));

  // ---------- characters ----------
  const WHO = {
    hale: ["🕴️", "Whitcomb · White House"],
    lou: ["🧑‍💼", "Lou · reporter"],
    file: ["🗄️", "The 1954 file"]
  };
  const bub = (who, text) => `<div class="bub ${who}"><span class="av" aria-hidden="true">${WHO[who][0]}</span><div class="bt"><b>${esc(WHO[who][1])}</b><p>${text}</p></div></div>`;
  const bubbles = list => list && list.length ? `<div class="bubbles">${list.map(b => bub(b[0], b[1])).join("")}</div>` : "";
  const realLine = (line, src) => `<div class="real"><p><b class="real-b">📜 Real</b> ${line}</p>${src ? `<p class="src">Source: ${src}</p>` : ""}</div>`;
  const newWord = html => `<div class="reveal"><span class="nw">💡 NEW WORD</span><p>${html}</p></div>`;

  const YEAR = { 1: "1954", 2: "1964", 3: "1965", 4: "1968", 5: "1969", 6: "1970", 7: "1971", 8: "1973", 9: "1973" };
  const GAP = { 1: 0, 2: 2, 3: 3, 4: 7, 5: 6, 6: 7, 7: 9, 8: 8, 9: 8 };

  // ---------- HUD ----------
  function haleMood() {
    const a = st.m.a;
    if (a >= 7) return ["😊", "pleased"];
    if (a >= 4) return ["😐", "watching"];
    if (a >= 2) return ["😠", "annoyed"];
    return ["🚫", "shut you out"];
  }
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const m = st.m;
    $("yrNum").textContent = YEAR[st.step] || "1973";
    $("stepText").textContent = "Step " + Math.min(st.step, TOTAL) + " of " + TOTAL + " · " + (YEAR[st.step] || "");
    $("stepFill").style.width = Math.round(Math.min(st.step, TOTAL) / TOTAL * 100) + "%";
    $("mTrust").style.width = m.t * 10 + "%"; $("nTrust").textContent = m.t + "/10";
    $("mAccess").style.width = m.a * 10 + "%"; $("nAccess").textContent = m.a + "/10";
    const hm = haleMood(); $("haleFace").textContent = hm[0]; $("haleLab").textContent = "Whitcomb · " + hm[1];
    $("tugDot").style.left = (50 - m.l * 7) + "%";
    $("gapBar").style.width = (GAP[st.step] || 0) * 10 + "%";
    $("hideN").textContent = "🙈 " + hiddenN();
    $("hudTrust").classList.toggle("warn", m.t <= 3);
    $("hudAccess").classList.toggle("warn", m.a <= 1);
    $("hudLean").classList.toggle("warn", Math.abs(m.l) >= 3);
  }
  function pops(fx) {
    const map = { t: ["hudTrust", "🗞️"], a: ["hudAccess", "🕴️"], l: ["hudLean", ""], s: ["hudGap", "🙈"] };
    Object.keys(map).forEach(k => {
      const n = fx[k]; if (!n) return;
      const el = $(map[k][0]); if (!el) return;
      const p = document.createElement("span");
      const good = k === "t" || k === "a" ? n > 0 : false;
      p.className = "pop " + (k === "l" ? "n" : k === "s" ? "bad" : good ? "good" : "bad");
      p.textContent = k === "l" ? (n > 0 ? "🦅 +" + n : "🕊️ +" + (-n)) : sg(n) + " " + map[k][1];
      p.setAttribute("aria-hidden", "true");
      el.appendChild(p);
      el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
      setTimeout(() => p.remove(), 2000);
    });
  }

  // ---------- scene frame ----------
  function scene(o) {
    return `<section class="scene ${o.stage || ""}">
      <div class="sc-top"><span class="chap">${esc(o.chap || "")}</span><h2>${esc(o.title)}</h2></div>
      ${o.bubbles && o.bubbles.length ? `<div class="stage"><div class="stage-art" aria-hidden="true">${o.art || ""}</div>${bubbles(o.bubbles)}</div>` : ""}
      <div class="sc-body">${o.body || ""}</div></section>`;
  }
  const nextBtn = label => `<button type="button" class="go" id="nextBtn">${esc(label || "Next →")}</button>`;
  function wireNext(fn) { const b = $("nextBtn"); if (b) b.onclick = fn || (() => goStep(st.step + 1)); }
  const hideWelcome = () => { const w = $("welcome"); if (w) w.hidden = true; };
  function toPhase(p) { st.phase = p; hideWelcome(); save(); render(); window.scrollTo(0, 0); }
  function goStep(n) { st.step = n; st.phase = 0; hideWelcome(); save(); render(); window.scrollTo(0, 0); }

  // =====================================================================
  //  EVIDENCE CHECKS (in-world). options[0] is right; shown shuffled.
  // =====================================================================
  const CHECKS = {
    c1: { std: "US.37", short: "Domino theory: why the U.S. backed South Vietnam", who: "lou", icon: "🗄️", stamp: "FILED",
      prompt: "So why did U.S. leaders back South Vietnam?",
      options: ["To keep communism from spreading next door", "To make South Vietnam a new U.S. state", "To get back money France owed the U.S.", "To stop China from invading Korea again"],
      hint: "Picture the dominoes. What falls after Vietnam?" },
    c2: { std: "US.35", short: "Gulf of Tonkin Resolution: what it allowed", who: "lou", icon: "📜", stamp: "FACT-CHECKED",
      prompt: "Headline check: what does this let Johnson do?",
      options: ["Use force without declaring war", "Declare war on North Vietnam now", "Pull all U.S. troops out of Vietnam", "Get Congress's OK before every battle"],
      hint: "“All necessary measures.” Did Congress declare war?" },
    c3: { std: "US.41", short: "Tinker v. Des Moines: the ruling", who: "lou", icon: "⚖️", stamp: "UPHELD",
      prompt: "Follow-up headline: what did the Court decide?",
      options: ["Students keep free speech unless they disrupt school", "Students keep free speech in halls but not in class", "Students can say anything they want, even in class", "Only teachers keep free speech rights at school"],
      hint: "What do students NOT leave at the gate? What can schools still stop?" },
    c4: { std: "US.38", short: "Tet + TV news: why opinion changed", who: "lou", icon: "📺", stamp: "ON AIR",
      prompt: "Why did Tet change so many minds?",
      options: ["TV showed the war was far from over", "It proved the U.S. was winning easily", "The U.S. lost every base in Vietnam", "North Vietnam gave up right after it"],
      hint: "Compare November's promise to February's TV news." },
    c5: { std: "US.40", short: "Hawks vs. doves: Nixon's silent majority", who: "lou", icon: "✉️", stamp: "FILED",
      prompt: "Hawk or dove? Who is Nixon's “silent majority”?",
      options: ["Hawks who backed the war but didn't march", "Doves who marched to bring troops home", "Soldiers in Vietnam who couldn't vote yet", "Senators who skipped every vote on the war"],
      hint: "Hawks backed the war. Doves wanted out. Silent = not marching." },
    c6: { std: "US.40", short: "Pentagon Papers: public vs. secret reasons", who: "lou", icon: "🗄️", stamp: "EXPOSED",
      prompt: "What does the secret memo show?",
      options: ["In private, avoiding defeat mattered most", "In private, Vietnam's freedom mattered most", "Leaders planned to leave Vietnam by 1966", "China had already taken South Vietnam"],
      hint: "Find the biggest percent. What goal is it?" }
  };
  const CHECK_ORDER = ["c1", "c2", "c3", "c4", "c5", "c6"];

  let lockTimer = null;
  function mountCheck(id, onDone) {
    const q = CHECKS[id];
    const box = $("checkBox");
    if (!box) return;
    clearTimeout(lockTimer);
    box.innerHTML = `<div class="check"><p class="qlabel" aria-hidden="true">${q.icon}</p>${bub(q.who, esc(q.prompt))}<p class="msg" id="qMsg" role="status" aria-live="polite"></p><div class="choices" id="qChoices"></div></div>`;
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
        b.innerHTML = `<span class="r-ico" aria-hidden="true">💬</span><span class="r-t">${esc(q.options[n])}</span>`;
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
              if (left <= 0) { locked = false; msg.textContent = "✖ " + q.hint; draw(); return; }
              msg.textContent = "✖ " + q.hint + " ⏳ " + left;
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
  const checkDone = id => `<div class="check done"><span class="stamp${justSolved === id ? " slam" : ""}">✔ ${esc(CHECKS[id].stamp)}</span></div>`;
  const solved = id => () => { justSolved = id; save(); render(true); };

  // =====================================================================
  //  EDITIONS (real stories; Whitcomb, Lou and the paper are made up)
  //  fx = lead effect. t = trust, a = White House access, l = lean (+ hawk / − dove), s = unchecked claim.
  // =====================================================================
  const ED = {
    2: { key: "1964", chap: "Page 1 of 6 · Aug. 1964", date: "Aug. 8, 1964", title: "Gulf of Tonkin", art: "🚢",
      bubbles: [["hale", "North Vietnam hit our Navy twice. Put that on top."], ["lou", "No reporter saw attack #2. It's just their word."]],
      cards: [
        { id: "a", icon: "🚢", title: "Navy Attacked Twice!", line: "The White House version.", off: true, claim: "“Navy attacked twice” (1964)", fx: { a: 2, l: 1, s: 1 } },
        { id: "b", icon: "🏛️", title: "Congress Says Yes", line: "Votes 416–0 and 88–2 for force.", fx: { t: 1, a: 1 } },
        { id: "c", icon: "🎙️", title: "Senator: “A Mistake”", line: "Sen. Wayne Morse votes no.", fx: { t: 1, a: -1, l: -1 } }
      ],
      check: "c2",
      evidence: () => `<div class="docx"><p class="th">📜 GULF OF TONKIN RESOLUTION · AUG. 7, 1964</p>
        <p class="q">Congress supports the President “to take <span class="hi">all necessary measures</span> to repel any armed attack… and to prevent further aggression.”</p>
        <p class="gloss">repel = fight off · aggression = attacks</p><p>📌 A resolution is NOT a declaration of war.</p><p class="src">Source: National Archives</p></div>`,
      reveal: "<b>Gulf of Tonkin Resolution</b>: Congress let Johnson fight without declaring war.",
      real: ["Later evidence showed the second attack never happened.", "National Security Agency history, released 2005"] },
    3: { key: "1965", chap: "Page 2 of 6 · Dec. 1965", date: "Dec. 17, 1965", title: "Black Armbands in Des Moines", art: "⚫", order: "bca",
      bubbles: [["hale", "184,000 troops are there now. Tell readers we're winning."], ["lou", "Des Moines schools suspended kids for black armbands."]],
      cards: [
        { id: "a", icon: "🪖", title: "“We're Winning”", line: "White House: more troops, more wins.", off: true, claim: "“We're winning” (1965)", fx: { a: 2, l: 1, s: 1 } },
        { id: "b", icon: "⚫", title: "Armband Kids Suspended", line: "Des Moines teens mourned the war dead.", fx: { t: 1, a: -1, l: -1 } },
        { id: "c", icon: "🌳", title: "Hit and Hide", line: "Viet Cong strike, then vanish into tunnels.", fx: { t: 2, a: -1 } }
      ],
      always: "<b>Guerrilla warfare</b>: surprise attacks, then hiding in jungles, villages, tunnels.",
      alwaysReal: ["U.S. answer: Agent Orange, a jungle-killing spray that later sickened many.", "U.S. Department of Veterans Affairs"],
      check: "c3", followup: "📅 FOLLOW-UP · FEB. 24, 1969",
      evidence: () => `<div class="docx"><p class="th">⚖️ TINKER v. DES MOINES · SUPREME COURT, 7–2</p>
        <p class="q">Students don't “shed their constitutional rights to freedom of speech… at the schoolhouse gate.”</p>
        <p class="gloss">shed = leave behind</p><p>⚠️ Schools can still stop speech that seriously disrupts class.</p><p class="src">Source: Justice Abe Fortas, for the Court, 1969</p></div>`,
      reveal: "<b>Tinker v. Des Moines</b>: Iowa teens won free speech rights at school.",
      real: ["Mary Beth Tinker was 13. John Tinker was 15. Chris Eckhardt was 16.", "Tinker v. Des Moines, 393 U.S. 503 (1969)"] },
    4: { key: "1968", chap: "Page 3 of 6 · Feb. 1968", date: "Feb. 1, 1968", title: "The Tet Offensive", art: "💥", stage: "st-night", order: "cba",
      bubbles: [["hale", "Our general said “the end begins to come into view.” Print that."], ["lou", "I'm in Hue. They hit 100+ cities at once."]],
      cards: [
        { id: "a", icon: "🎖️", title: "“End in View”", line: "The general's promise, Nov. 1967.", off: true, claim: "“The end is in view” (1967)", fx: { a: 2, t: -1, l: 1, s: 2 } },
        { id: "b", icon: "📺", title: "Tet: 100 Cities Hit", line: "Lou's report from Hue.", fx: { t: 2, a: -2, l: -1 } },
        { id: "c", icon: "🦅", title: "Attack Pushed Back", line: "U.S. troops win the battles.", fx: { t: 2, l: 1 } }
      ],
      check: "c4",
      evidence: () => `<div class="two">
        <div class="tv said"><div class="screen"><span class="live">NOV. 21, 1967</span><p class="q">“The end begins to come into view.”</p><p class="src">Gen. Westmoreland</p></div></div>
        <div class="tv"><div class="screen"><span class="live">CBS · FEB. 27, 1968</span><p class="q">Vietnam “is to end in a stalemate.”</p><p class="gloss">stalemate = nobody wins</p><p class="src">Walter Cronkite, TV news</p></div></div></div>
        <p class="src" style="text-align:center">📺 Most U.S. homes had a TV. The war was on every night.</p>`,
      reveal: "<b>Credibility gap</b>: what leaders say doesn't match what people see.",
      real: ["U.S. troops won the battles. But many Americans stopped believing the war would end soon.", "U.S. Army Center of Military History"] },
    5: { key: "1969", chap: "Page 4 of 6 · Dec. 2, 1969", date: "Dec. 2, 1969", title: "Hawks vs. Doves", art: "🎱", order: "bac",
      bubbles: [["hale", "Nixon asked the “silent majority” for support. Put him on top."], ["lou", "Last night, the draft lottery drew birthdays on TV."]],
      cards: [
        { id: "a", icon: "🎤", title: "“Silent Majority”", line: "Nixon asks quiet Americans for support.", off: true, fx: { a: 2, l: 2 } },
        { id: "b", icon: "🕊️", title: "Millions March", line: "Antiwar protests across the U.S.", fx: { t: 1, a: -1, l: -2 } },
        { id: "c", icon: "🎱", title: "Draft Lottery Results", line: "Sept. 14 birthdays go first.", fx: { t: 1 },
          note: "<b>Deferment</b>: college could delay the draft, so working-class men went more." }
      ],
      check: "c5",
      evidence: () => `<div class="docx"><p class="th">🎤 PRESIDENT NIXON · TV SPEECH, NOV. 3, 1969</p>
        <p class="q">“To you, the great <span class="hi">silent majority</span>… I ask for your support.”</p></div>
        <div class="mail"><div class="letter h"><b>🦅 Reader letter (made up)</b>My son's over there. I don't march. I back Nixon.</div><div class="letter d"><b>🕊️ Reader letter (made up)</b>Bring them home. I marched Oct. 15.</div></div>`,
      reveal: "<b>Hawks vs. doves</b>: hawks fought on to stop communism. Doves wanted out.",
      real: ["Fall 1969: millions joined the “Moratorium,” a nationwide day of antiwar protest.", "Library of Congress"] },
    6: { key: "1970", chap: "Page 5 of 6 · May 16, 1970", date: "May 16, 1970", title: "Kent State and Jackson State", art: "🕯️", stage: "st-gray", somber: true, order: "bac",
      bubbles: [["hale", "The Guard says a sniper fired first. Run their side."], ["lou", "Students were killed at two colleges this month."]],
      cards: [
        { id: "a", icon: "🪖", title: "Guard: “Sniper Fired”", line: "The Ohio Guard's version.", off: true, claim: "“A sniper fired first” (1970)", fx: { a: 2, t: -1, l: 1, s: 1 } },
        { id: "b", icon: "🕯️", title: "4 Killed at Kent State", line: "Ohio Guard fired on students, May 4.", fx: { t: 1 } },
        { id: "c", icon: "🕯️", title: "2 Killed at Jackson State", line: "Police fired at a Black college, May 15.", fx: { t: 2, a: -1 } }
      ],
      reveal: "<b>A nation divided</b>: Americans turned against Americans over the war.",
      real: ["A U.S. commission called the Kent State shooting “unnecessary, unwarranted, and inexcusable.”", "President's Commission on Campus Unrest, 1970"] }
  };
  const ED_ORDER = [2, 3, 4, 5, 6];

  // Reader mail after each front page (made-up voices, kept short).
  const MAIL = {
    // Balanced on purpose: each side gets a real reason, not just name-calling.
    hawk: [["Good. Stand by our troops.", "Is that just the White House line?"], ["Finally, some good news.", "Where's the other side?"], ["Communism must be stopped.", "Bring our boys home."]],
    dove: [["Our troops need support, not doubt.", "Good. Someone's asking questions."], ["If we quit, Laos falls next.", "Too many boys are dying."], ["Don't abandon South Vietnam.", "This war can't be won."]],
    even: [["Fair. Just the facts."], ["Just the facts. Good."], ["I don't love it, but it's fair."]]
  };

  // ---------- layout helpers ----------
  const cardOf = (s, id) => ED[s].cards.find(c => c.id === id);
  function draft(s) { st.drafts[s] = st.drafts[s] || { lead: null, side: null }; return st.drafts[s]; }

  function slotHtml(s, which, cid, printed) {
    const label = which === "lead" ? "TOP STORY" : "SIDE STORY";
    if (!cid) return `<button type="button" class="slot ${which}" data-slot="${which}" disabled><span class="s-ico" aria-hidden="true">${which === "lead" ? "🥇" : "📄"}</span><span><span class="tg">${label}</span><span class="hl">Tap a story</span></span></button>`;
    const c = cardOf(s, cid);
    return `<button type="button" class="slot ${which} full" data-slot="${which}"${printed ? " disabled" : ""} aria-label="${esc(label + ": " + c.title + (printed ? "" : ". Tap to take it off."))}"><span class="s-ico" aria-hidden="true">${c.icon}</span><span><span class="tg">${label}</span><span class="hl">${esc(c.title)}</span><span class="sl">${esc(c.line)}</span></span>${printed ? "" : `<span class="x" aria-hidden="true">✖</span>`}</button>`;
  }
  function frontHtml(s, d, printed, stamp) {
    const E = ED[s];
    const both = d.lead && d.side;
    const cut = both ? E.cards.find(c => c.id !== d.lead && c.id !== d.side) : null;
    return `<div class="front${printed ? " printed" : ""}" id="frontPage"><p class="mast">${esc(PAPER)}</p><p class="dline"><span>Cedar Valley, Iowa</span><span>${esc(E.date)}</span></p>
      ${stamp || ""}${slotHtml(s, "lead", d.lead, printed)}${slotHtml(s, "side", d.side, printed)}
      ${cut ? `<p class="cutline">✂️ Cut: ${esc(cut.title)}</p>` : ""}</div>`;
  }

  // ---- an edition: phase 0 layout · 1 printed + reactions · 2 fact-check ----
  function edition(app, s) {
    const E = ED[s];
    const d = draft(s);
    const P = st.printed[s];
    if (st.phase === 0 || !P) return layoutScreen(app, s, E, d);
    if (st.phase === 1) return printedScreen(app, s, E, P);
    return checkScreen(app, s, E);
  }

  function layoutScreen(app, s, E, d) {
    const howto = s === 2 ? `<div class="howto"><div><span class="hi">👆</span><b>Tap 2 stories onto the page</b></div><div><span class="hi">🥇</span><b>Top story counts most</b></div><div><span class="hi">🕴️</span><b>Whitcomb wants his on top</b></div></div>` : "";
    const key = s === 2 ? `<p class="key">🗞️ trust · 🕴️ Whitcomb · 🦅 pro-war readers · 🕊️ antiwar readers · 🙈 unchecked claim</p>` : "";
    let lou = E.bubbles[1][1];
    const cards = (E.order || "abc").split("").map(id => cardOf(s, id)).map(c => {
      const where = d.lead === c.id ? "TOP" : d.side === c.id ? "SIDE" : "";
      return `<button type="button" class="scard${c.off ? " off" : ""}${where ? " used" : ""}" data-card="${c.id}" aria-pressed="${where ? "true" : "false"}">
        ${c.off ? `<span class="hale-tag">🕴️ WHITCOMB'S PICK</span>` : ""}${where ? `<span class="slot-tag">ON PAGE · ${where}</span>` : ""}
        <span class="s-ico" aria-hidden="true">${c.icon}</span><b class="s-t">${esc(c.title)}</b><span class="s-l">${esc(c.line)}</span><span class="chips">${chipsFor(c.fx)}</span></button>`;
    }).join("");
    const body = howto + `<div class="desk"><div class="wire"><h3>📠 The wire</h3><div class="cards">${cards}</div>${key}</div>
      <div class="pagecol"><h3>🗞️ Page one</h3>${frontHtml(s, d, false)}
      <div class="vrow"><button type="button" class="go" id="printBtn"${d.lead && d.side ? "" : " disabled"}>🖨️ Print it</button>${d.lead && d.side ? `<button type="button" class="back" id="swapBtn">⇅ Swap</button>` : ""}</div></div></div>
      ${s === 2 ? `<p class="fict">Mr. Whitcomb, Lou, and the paper are made up. The stories are real.</p>` : ""}`;
    app.innerHTML = scene({ chap: E.chap, title: E.title, art: E.art, stage: E.stage, bubbles: [E.bubbles[0], ["lou", lou]], body });
    app.querySelectorAll("[data-card]").forEach(b => b.onclick = () => {
      const id = b.dataset.card;
      if (d.lead === id) d.lead = null;
      else if (d.side === id) d.side = null;
      else if (!d.lead) d.lead = id;
      else d.side = id;   // fills the side slot, or replaces what was there
      save(); render();
      if (d.lead && d.side) { const p = $("printBtn"); if (p && p.scrollIntoView) setTimeout(() => p.scrollIntoView({ behavior: "smooth", block: "center" }), 40); }
    });
    app.querySelectorAll(".slot.full").forEach(b => b.onclick = () => { d[b.dataset.slot] = null; save(); render(); });
    if ($("swapBtn")) $("swapBtn").onclick = () => { const x = d.lead; d.lead = d.side; d.side = x; save(); render(); };
    $("printBtn").onclick = () => printEdition(s);
  }

  function printEdition(s) {
    const E = ED[s], d = draft(s);
    if (!d.lead || !d.side || st.printed[s]) return;
    const lead = cardOf(s, d.lead), side = cardOf(s, d.side);
    const cut = E.cards.find(c => c.id !== d.lead && c.id !== d.side);
    const total = { t: 0, a: 0, l: 0, s: 0 };
    ["t", "a", "l"].forEach(k => { total[k] += (lead.fx[k] || 0) + half(side.fx[k] || 0); });
    let hale = "";
    const off = E.cards.find(c => c.off);
    if (off === lead) hale = "Good. The President is pleased.";
    else if (off === side) hale = "Inside? Not on top? I'll remember.";
    else { hale = "You cut our side of it? Noted."; total.a -= 1; }
    [[lead, "top"], [side, "side"]].forEach(([c, where]) => {
      if (c.fx.s) { const w = where === "top" ? c.fx.s : 1; st.hidden.push({ claim: c.claim, w }); total.s += w; }
    });
    applyFx(total);
    let lopsided = false;
    if (Math.abs(st.m.l) >= 4) { lopsided = true; applyFx({ t: -1 }); total.t -= 1; }
    const leadLean = lead.fx.l || 0;
    st.printed[s] = { lead: lead.id, side: side.id, cut: cut.id, fx: total, hale, lopsided, mood: leadLean > 0 ? "hawk" : leadLean < 0 ? "dove" : "even" };
    st.picks[E.key] = "Top: " + lead.title + " · Side: " + side.title + " · Cut: " + cut.title;
    st.trail.push({ label: E.key + " top: " + lead.title, fx: total });
    if (lopsided) st.trail.push({ label: E.key + ": one-sided page", fx: { t: -1 } });
    st.flash = s; hideWelcome();
    st.phase = 1; save(); render(); window.scrollTo(0, 0);
  }

  function printedScreen(app, s, E, P) {
    const d = { lead: P.lead, side: P.side };
    const stamp = `<span class="stamp ${E.somber ? "q" : "g"}${st.flash === s ? " slam" : ""}">${E.somber ? "PRINTED" : "🖨️ PRINTED"}</span>`;
    const lead = cardOf(s, P.lead), side = cardOf(s, P.side);
    const note = [lead, side].map(c => c.note).filter(Boolean)[0];
    const mail = MAIL[P.mood][(ED_ORDER.indexOf(s)) % 3];
    let mid;
    if (E.somber) {
      mid = `<div class="candles"><div><b>🕯️ Kent State, Ohio · May 4</b>Allison Krause · Jeffrey Miller · Sandra Scheuer · William Schroeder</div><div><b>🕯️ Jackson State, Mississippi · May 15</b>Phillip Lafayette Gibbs · James Earl Green · far less news coverage</div></div>` +
        newWord(E.reveal) + realLine(E.real[0], E.real[1]);
    } else {
      mid = (P.mood === "even"
        ? `<div class="mail one"><div class="letter"><b>🦅🕊️ Hawk and dove readers</b>${esc(mail[0])}</div></div>`
        : `<div class="mail"><div class="letter h"><b>🦅 Hawk reader</b>${esc(mail[0])}</div><div class="letter d"><b>🕊️ Dove reader</b>${esc(mail[1])}</div></div>`) +
        (note ? newWord(note) : "") + (E.always ? newWord(E.always) + realLine(E.alwaysReal[0], E.alwaysReal[1]) : "");
    }
    const lottery = s === 5 ? `<div class="lottery" aria-label="Draft lottery, Dec. 1, 1969: Sept. 14 is number 1, April 24 is 2, Dec. 30 is 3"><span>SEP 14<br>#1</span><span>APR 24<br>#2</span><span>DEC 30<br>#3</span></div><p class="src" style="text-align:center">Real 1969 draft lottery. Selective Service System</p>` : "";
    const body = frontHtml(s, d, true, stamp) +
      `<div class="result flip"><div class="r-main">${E.somber ? "" : bub("hale", esc(P.hale))}${E.somber ? "" : `<div class="tags">${fxTags(P.fx)}</div>`}
       ${P.lopsided && !E.somber ? `<p class="warnbox">📉 Half your readers feel ignored. Cancellations!</p>` : ""}${mid}</div></div>` + lottery +
      (E.check ? nextBtn("🔍 Fact-check →") : nextBtn("Next front page →"));
    app.innerHTML = scene({ chap: E.chap, title: E.title, stage: E.stage, body });
    st.flash = null;
    wireNext(E.check ? () => toPhase(2) : null);
  }

  function checkScreen(app, s, E) {
    const id = E.check;
    const top = E.followup ? `<p class="chap" style="display:inline-block;color:#fff;margin:0 0 8px">${esc(E.followup)}</p>` : "";
    if (st.done[id]) {
      const body = top + checkDone(id) + `<div id="after">${newWord(E.reveal)}${realLine(E.real[0], E.real[1])}${nextBtn("Next front page →")}</div>`;
      app.innerHTML = scene({ chap: E.chap, title: "Fact-check", stage: E.stage, body });
      return wireNext();
    }
    app.innerHTML = scene({ chap: E.chap, title: "Fact-check", stage: E.stage, body: top + `<div class="ev">${E.evidence()}</div><div id="checkBox"></div>` });
    mountCheck(id, solved(id));
  }

  // =====================================================================
  //  STEPS
  // =====================================================================
  const S = {};

  // ---- 1 · The 1954 file: dominoes (check 1) ----
  function dominoSvg() {
    const names = ["VIETNAM", "LAOS", "CAMBODIA", "THAILAND", "BURMA", "INDONESIA"];
    const doms = names.map((n, i) => {
      const x = 40 + i * 100;
      return `<g class="dom" style="transition-delay:${i * 0.28}s"><rect x="${x}" y="40" width="44" height="110" rx="7" fill="${i === 0 ? "#c4262e" : "#1b1b1d"}" stroke="#fff" stroke-width="3"/>
        <circle cx="${x + 22}" cy="70" r="6" fill="#fff"/><circle cx="${x + 22}" cy="120" r="6" fill="#fff"/><line x1="${x + 6}" y1="95" x2="${x + 38}" y2="95" stroke="#fff" stroke-width="3"/></g>
        <text x="${x + 22}" y="178" text-anchor="middle" font-size="15" font-weight="900" font-family="system-ui,Arial" fill="#1b1b1d">${n}</text>`;
    }).join("");
    return `<svg class="dominos${st.tapped ? " fallen" : ""}" id="domSvg" viewBox="0 0 660 190" role="img" aria-label="A row of dominoes labeled Vietnam, Laos, Cambodia, Thailand, Burma, Indonesia${st.tapped ? ", all knocked over" : ""}">
      <rect x="0" y="150" width="660" height="10" fill="#b8a274"/>${doms}</svg>`;
  }
  S[1] = app => {
    const flow = `<div class="flow"><div><span>🇫🇷</span>France rules Vietnam</div><div class="arr" aria-hidden="true">➜</div><div><span>💥</span>France loses, 1954</div><div class="arr" aria-hidden="true">➜</div><div><span>✂️</span>Split: North ☭ / South 🇺🇸</div></div>`;
    const quote = `<div class="docx" style="margin-top:10px"><p class="th">🎤 PRESIDENT EISENHOWER · APRIL 7, 1954</p><p class="q">“You knock over the first one, and… the last one… will go over very quickly.”</p></div>`;
    if (st.done.c1) {
      const body = `<div class="morgue">${flow}${dominoSvg()}</div>` + checkDone("c1") + `<div id="after">${newWord("<b>Domino theory</b>: if one country goes communist, its neighbors fall too.")}${newWord("<b>Containment</b>: stop communism's spread. Korea, Cuba, and now Vietnam.")}${nextBtn("Open the newsroom, 1964 →")}</div>`;
      app.innerHTML = scene({ chap: "Before the war · 1954", title: "The Old File", stage: "st-file", body });
      return wireNext();
    }
    const body = `<div class="morgue">${flow}${dominoSvg()}${st.tapped ? quote : `<button type="button" class="go ink tapme" id="tapBtn">👆 Tap the first domino</button>`}</div><div id="checkBox"></div>`;
    app.innerHTML = scene({ chap: "Before the war · 1954", title: "The Old File", stage: "st-file", art: "🗄️",
      bubbles: st.tapped ? [] : [["lou", "New editor? First, see why America cares about Vietnam."]], body });
    if (!st.tapped) {
      $("tapBtn").onclick = () => {
        st.tapped = true; save();
        $("domSvg").classList.add("fallen");
        const stg = document.querySelector(".stage"); if (stg) stg.remove();
        $("tapBtn").outerHTML = quote;
        setTimeout(() => { mountCheck("c1", solved("c1")); const c = $("checkBox"); if (c && c.scrollIntoView) c.scrollIntoView({ behavior: "smooth", block: "center" }); }, window.classIsTestT && window.classIsTestT() ? 0 : 1900);   // Test T. skips the wait
      };
    } else mountCheck("c1", solved("c1"));
  };

  ED_ORDER.forEach(n => { S[n] = app => edition(app, n); });

  // ---- 7 · The Pentagon Papers (one big call, then the reckoning, then check 6) ----
  const PP = [
    { id: "print", icon: "🖨️", title: "Print It", line: "Risk court. Readers see the truth.", fx: { t: 3, a: -4 } },
    { id: "wait", icon: "⏳", title: "Wait for the Court", line: "Safe. Other papers print first.", fx: { t: -1, a: 1 } },
    { id: "bury", icon: "🗄️", title: "Bury It", line: "Keep Whitcomb happy.", off: true, claim: "Buried the Pentagon Papers (1971)", fx: { t: -2, a: 3, s: 1 } }
  ];
  S[7] = app => {
    const chap = "Page 6 of 6 · June 1971";
    if (st.phase === 0) {
      const scoop = st.m.t >= 6;
      const cards = PP.map(c => `<button type="button" class="scard${c.off ? " off" : ""}" data-pp="${c.id}">${c.off ? `<span class="hale-tag">🕴️ WHITCOMB'S PICK</span>` : ""}<span class="s-ico" aria-hidden="true">${c.icon}</span><b class="s-t">${esc(c.title)}</b><span class="s-l">${esc(c.line)}</span><span class="chips">${chipsFor(c.fx)}</span></button>`).join("");
      const body = `<div class="docx secret"><p class="th">🔒 TOP SECRET · U.S.–VIETNAM RELATIONS, 1945–1967</p><p>7,000 pages. Never meant for the public.</p></div>
        <h3 style="margin:14px 0 8px;font:900 .82rem 'Arial Black',Impact,sans-serif;letter-spacing:.08em;color:#c4262e">📠 ONE BIG CALL</h3><div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">${cards}</div>`;
      app.innerHTML = scene({ chap, title: "The Pentagon Papers", stage: "st-file", art: "🗄️",
        bubbles: [["lou", scoop ? "Our source gave us a secret Pentagon study." : "The New York Times printed a secret Pentagon study."], ["hale", "Print it, and we'll see you in court."]], body });
      app.querySelectorAll("[data-pp]").forEach(b => b.onclick = () => {
        const c = PP.find(x => x.id === b.dataset.pp);
        const fx = Object.assign({}, c.fx);
        if (c.fx.s) st.hidden.push({ claim: c.claim, w: c.fx.s });
        applyFx(fx);
        st.picks["Pentagon Papers"] = c.title;
        st.trail.push({ label: "1971: " + c.title, fx });
        // The reckoning: the papers prove leaders misled the public, so readers re-check YOUR old front pages.
        const hit = hiddenN();
        st.exposed = st.hidden.slice(); st.hidden = [];
        if (hit) { applyFx({ t: -hit }); st.trail.push({ label: "Exposed: " + st.exposed.length + " old claim" + (st.exposed.length === 1 ? "" : "s"), fx: { t: -hit } }); }
        st.ppFx = fx;
        st.phase = 1; save(); render(); window.scrollTo(0, 0);
      });
      return;
    }
    if (st.phase === 1) {
      const list = st.exposed.length
        ? `<div class="exposed">${st.exposed.map(h => `<div><span>📰 ${esc(h.claim)}</span><span><span class="tag down">🗞️ −${h.w}</span> <span class="stamp slam">EXPOSED</span></span></div>`).join("")}</div>`
        : `<p style="text-align:center"><span class="stamp g slam">✔ CLEAN RECORD</span></p>`;
      const body = `<div class="result flip"><div class="r-main"><p>📰 ${esc(st.picks["Pentagon Papers"])}</p><div class="tags">${fxTags(st.ppFx || {})}</div></div></div>` +
        `<p style="font-weight:800;margin:12px 0 4px">${st.exposed.length ? "Readers dig up your old front pages:" : "Readers dig up your old front pages. Nothing to hide."}</p>` + list + nextBtn("🔍 Fact-check →");
      app.innerHTML = scene({ chap, title: "The Truth Comes Out", stage: "st-file", art: "🔦",
        bubbles: [["lou", "The study shows leaders misled the public for years."]], body });
      return wireNext(() => toPhase(2));
    }
    if (st.done.c6) {
      const body = checkDone("c6") + `<div id="after">${newWord("<b>Pentagon Papers</b>: a secret study showing leaders misled the public.")}${realLine("June 30, 1971: the Supreme Court ruled 6–3 that papers could print it.", "New York Times Co. v. United States (1971)")}${nextBtn("Final edition, 1973 →")}</div>`;
      app.innerHTML = scene({ chap, title: "Fact-check", stage: "st-file", body });
      return wireNext();
    }
    const ev = `<div class="two"><div class="docx"><p class="th">🎤 PUBLIC · PRESIDENT JOHNSON, APRIL 1965</p><p class="q">“Our objective is the independence of South Vietnam.”</p></div>
      <div class="docx secret"><p class="th">🔒 SECRET · PENTAGON MEMO, MARCH 1965</p><p><span class="hi">70%</span> — avoid a humiliating (embarrassing) U.S. defeat</p><p>20% — keep the land from China</p><p>10% — a better, freer life for South Vietnam</p><p class="src">John McNaughton, U.S. Defense Dept.</p></div></div>`;
    app.innerHTML = scene({ chap, title: "Fact-check", stage: "st-file", body: `<div class="ev">${ev}</div><div id="checkBox"></div>` });
    mountCheck("c6", solved("c6"));
  };

  // ---- 8 · Ending ----
  const ENDINGS = {
    record: { e: "🏆", title: "The Paper Everyone Read", text: "Hawks and doves both read you, and both trusted you. You printed what leaders said AND what reporters saw." },
    mouthpiece: { e: "📉", title: "The Paper Nobody Believed", bad: true, text: "You printed the official story. When the truth came out, readers felt fooled. You fell into the credibility gap." },
    sidetaker: { e: "✂️", title: "Half the Town Canceled", bad: true, text: "You mostly printed one side. The other half of town stopped reading. Vietnam split America, and it split your paper." },
    frozenout: { e: "🚪", title: "Trusted, but Shut Out", text: "Readers trust you. The White House stopped calling. Many real reporters paid that price." },
    survivor: { e: "🗞️", title: "Still on the Stands", text: "You made it. Readers aren't sure about you yet. Some front pages helped. Some cost you." }
  };
  function endingKey() {
    const m = st.m;
    if (m.t <= 3) return "mouthpiece";
    if (Math.abs(m.l) >= 4) return "sidetaker";
    if (m.a <= 1) return "frozenout";
    if (m.t >= 7) return "record";
    return "survivor";
  }
  const leanText = l => l === 0 ? "even" : (l > 0 ? "hawk +" + l : "dove +" + (-l));
  S[8] = app => {
    const k = endingKey(), E = ENDINGS[k];
    if (st.ending !== k) { st.ending = k; save(); }
    const trail = st.trail.map(t => `<li><span>${esc(t.label)}</span><span class="tags">${fxTags(t.fx)}</span></li>`).join("");
    const body = `<div class="front${E.bad ? " bad" : ""}"><p class="mast">${esc(PAPER)}</p><p class="dline"><span>Final edition</span><span>March 30, 1973</span></p>
        <div class="headline"><span class="e-big" aria-hidden="true">${E.e}</span><h3>${esc(E.title)}</h3></div>
        <p class="body">${esc(E.text)}</p>
        <div class="finalm"><span>🗞️ Trust <b>${st.m.t}/10</b></span><span>🕴️ Access <b>${st.m.a}/10</b></span><span>🦅🕊️ Readers <b>${leanText(st.m.l)}</b></span><span>🙈 Exposed <b>${st.exposed.length}</b></span></div>
        <h4 class="cb">Caused by:</h4><ul class="trail">${trail}</ul></div>
      <h4 class="cb">📜 What really came next</h4>
      <div class="after"><span>🪖 1973 · Last U.S. troops leave</span><span>⚖️ 1973 · War Powers Resolution limits presidents</span><span>🏳️ 1975 · South Vietnam falls</span><span>🏠 1975 · Iowa takes in refugees</span><span>🕯️ 58,000+ U.S. dead · millions of Vietnamese</span></div>
      <p class="src" style="text-align:center">Sources: National Archives; Iowa Dept. of Human Rights</p>` + nextBtn("Write your last editorial →");
    app.innerHTML = scene({ chap: "1973 · The war ends for America", title: "Your Ending", stage: "st-dawn", body });
    wireNext();
  };

  // ---- 9 · Editorial + turn in ----
  const PROMPTS = [
    { id: "why", short: "Why the U.S. fought in Vietnam", label: "1. Why did the U.S. fight in Vietnam?",
      stem: "The U.S. fought in Vietnam to ___ because leaders believed ___.", min: 55, newWords: 5,
      mustAll: [["communis", "domino", "contain", "spread", "soviet", "china", "north vietnam", "ho chi minh"], ["because", "since", "so "]],
      mustMsg: "In answer 1, name the reason (like the domino theory or stopping communism) and use “because.”" },
    { id: "split", short: "Why Vietnam split Americans more than Korea", label: "2. Why did Vietnam split Americans more than Korea did?",
      stem: "Vietnam split Americans more than Korea because ___. For example, ___.", min: 60, newWords: 6,
      mustAll: [["tv", "television", "news", "cronkite", "draft", "lottery", "deferment", "tonkin", "tet", "gap", "lie", "lied", "misled", "trust", "protest", "march", "kent", "jackson", "pentagon", "dead", "death", "killed", "casualt", "stalemate", "tinker", "armband", "guerrilla", "guerilla", "jungle", "tunnel", "hide", "agent orange"], ["because", "since", "so "]],
      mustMsg: "In answer 2, use one piece of evidence (like TV, the draft, guerrilla war, or Tet) and use “because.”" }
  ];
  S[9] = app => {
    const pg = st.phase === 1 ? 1 : 0;
    const korea = `<div class="kv" aria-label="Korea compared to Vietnam"><div class="hd"></div><div class="hd">🇰🇷 Korea</div><div class="hd">🇻🇳 Vietnam</div>
      <div>Why fight</div><div>Contain communism</div><div>Contain communism</div>
      <div>How fought</div><div>Front lines</div><div>Guerrilla hit-and-hide</div>
      <div>War declared?</div><div>No</div><div>No</div>
      <div>Length</div><div>3 years</div><div>8 years of U.S. combat</div>
      <div>U.S. dead</div><div>36,500</div><div>58,000</div>
      <div>On TV?</div><div>A little</div><div>Every night</div>
      <div>Ending</div><div>A tie</div><div>Communists won</div></div><p class="src">Source: National Archives; Department of Defense</p>`;
    const page = (p, i) => `<div class="vpage"${i !== pg ? " hidden" : ""}>${i === 1 ? korea : ""}<label for="w_${p.id}">${esc(p.label)}</label><p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea></div>`;
    const tail = pg === 0
      ? `<button type="button" class="go" id="pageBtn">Next page →</button><p id="pageMsg" class="msg" role="status" aria-live="polite"></p>`
      : `<label for="nameBox2">Your name</label><input id="nameBox2" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">` +
        `<div class="vrow"><button type="button" class="back" id="backBtn">← Page 1</button><button type="button" class="go" id="sendBtn">📨 ${st.turnedIn ? "Turn in again" : "Turn in"}</button></div><p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in. You can fix your writing and turn it in again." : ""}</p>`;
    const body = `<div class="edpage"><p class="ed-h">✒️ Editorial · ${esc(PAPER)} · ${pg + 1}/2</p>` + PROMPTS.map(page).join("") + tail + `</div>`;
    app.innerHTML = scene({ chap: "1973 · Last editorial", title: "Your Editorial", stage: "st-dawn", art: "✒️",
      bubbles: [["lou", pg === 0 ? "Readers want answers. Use what you printed." : "Last one. Compare Vietnam to Korea."]], body });
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
  function writingProblem(p) {
    if (window.classIsTestT && window.classIsTestT()) return "";   // Test T. (teacher) skips the writing rules
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
      if (junk) return "For " + p.short + ": " + junk;
    }
    if (v.length < p.min) { box.focus(); return "Write a little more for: " + p.short + " (1–2 full sentences)."; }
    if (/_{2,}/.test(v)) { box.focus(); return "Fill in the blanks with your own words for: " + p.short + "."; }
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshW.size < p.newWords) { box.focus(); return "Add more of your own ideas for: " + p.short + ". Use details from today."; }
    if (p.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) { box.focus(); return p.mustMsg; }
    return "";
  }
  async function sendWork() {
    const msg = $("sendMsg");
    const bad = t => { msg.textContent = t; msg.className = "msg try"; };
    const nm = window.classShortName ? window.classShortName($("nameBox2").value) : $("nameBox2").value.trim();
    if (!/^\S+ [A-Z]\.$/.test(nm)) { bad("Type your first name and last initial, like Jordan M."); $("nameBox2").focus(); return; }
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
    const CH = { "1964": "1964 front page (Gulf of Tonkin)", "1965": "1965 front page (armbands, guerrilla war)", "1968": "1968 front page (Tet)", "1969": "1969 front page (hawks vs. doves)", "1970": "1970 front page (Kent State, Jackson State)", "Pentagon Papers": "1971 Pentagon Papers" };
    Object.keys(CH).forEach(k => { if (st.picks[k]) answers["Choice · " + CH[k]] = st.picks[k]; });
    const E = ENDINGS[st.ending || endingKey()];
    answers["Ending"] = E.title;
    answers["Caused by"] = st.trail.map(t => t.label + " (" + fxText(t.fx) + ")").join(" · ");
    answers["Final meters"] = "Reader trust " + st.m.t + "/10 · White House access " + st.m.a + "/10 · Readers " + leanText(st.m.l) + " · Unchecked claims exposed " + st.exposed.length;
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(CFG.oldApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: CFG.assignmentId, assignmentTitle: CFG.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.innerHTML = `<span class="stamp g slam">📨 FILED</span> ✓ Turned in! You're done.`; msg.className = "msg good";
      $("sendBtn").textContent = "✓ Turned in";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg try"; $("sendBtn").disabled = false; }
  }

  // =====================================================================
  //  TITLE + RENDER
  // =====================================================================
  function title(app) {
    app.innerHTML = `<section class="title-card">
      <p class="t-mast">${esc(PAPER)}</p><p class="t-dl"><span>Cedar Valley, Iowa</span><span>1964–1973</span></p>
      <div class="t-grid"><div class="t-left">
        <span class="extra">EXTRA!</span>
        <h1>Front Page: A Nation Divided</h1>
        <p class="hook">The Vietnam War splits your town. You decide what goes on page one.</p>
        <div class="t-chips"><span>🗞️ 6 front pages</span><span>🔍 6 fact-checks</span><span>⏱️ 25 min</span></div>
        <p class="goal"><b>Goal:</b> explain why the U.S. fought in Vietnam and why Americans split over it.</p>
        <label for="nameBox">Your name</label>
        <div class="t-row"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <button type="button" class="go start" id="startBtn">Start →</button></div>
        <p id="introMsg" class="msg" role="status"></p>
      </div>
      <div class="t-art" aria-hidden="true"><div class="t-paper"><span>🚁</span><b>War or Peace?</b></div>
        <div class="t-cast"><span>🗞️</span><span class="vs">VS</span><span>🕴️</span></div>
        <div class="t-cast"><span>🦅</span><span style="font-size:1.4rem">⚖️</span><span>🕊️</span></div></div></div>
      <p class="t-fict fict">Made-up paper. Real events and quotes.</p>
    </section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg try"; $("nameBox").focus(); return; }
      if (window.classClaimDevice) window.classClaimDevice(fixed);
      st.name = fixed;
      goStep(1);
    };
  }

  function render(scrollToNew) {
    const app = $("app");
    clearTimeout(lockTimer);
    if (st.step < 1) { hud(); return title(app); }
    (S[st.step] || S[TOTAL])(app);
    justSolved = null;
    hud();
    if (pending) { const p = pending; pending = null; setTimeout(() => pops(p), 60); }
    if (scrollToNew) {
      const target = $("after");
      if (target && target.scrollIntoView) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 40);
    }
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) {
    // Shared Chromebooks: "Not you?" lets the next kid wipe this saved game on the spot.
    const nm = st.name || "";
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + nm + "! You're on step " + Math.min(st.step, TOTAL) + " of " + TOTAL + ".")}</span> <button type="button" class="notyou" id="notYouBtn">${esc("Not " + nm + "? Start fresh")}</button>`;
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
  // The teacher signed in as Test T. can jump to any screen or answer the current check/page.
  // Each front page = lay out · printed + reader mail · fact-check. Unplayed pages get the first two stories.
  try {
    const SCR = [{ s: 1, k: "file", label: "The old file (dominoes)" }];
    ED_ORDER.forEach(n => {
      SCR.push({ s: n, k: "layout", label: ED[n].title + " · lay out" }, { s: n, k: "printed", label: ED[n].title + " · printed" });
      if (ED[n].check) SCR.push({ s: n, k: "check", label: ED[n].title + " · fact-check" });
    });
    SCR.push({ s: 7, k: "pp", label: "Pentagon Papers · the call" }, { s: 7, k: "truth", label: "The truth comes out" }, { s: 7, k: "check", label: "Pentagon Papers · fact-check" },
      { s: 8, k: "end", label: "Your ending" }, { s: 9, k: "p0", label: "Your editorial · page 1" }, { s: 9, k: "p1", label: "Your editorial · page 2" });
    const kindNow = () => {
      const n = Math.max(1, Math.min(st.step, TOTAL));
      if (n === 1) return "file";
      if (ED[n]) return st.phase === 0 || !st.printed[n] ? "layout" : st.phase === 1 ? "printed" : "check";
      if (n === 7) return st.phase === 0 ? "pp" : st.phase === 1 ? "truth" : "check";
      if (n === 8) return "end";
      return st.phase === 1 ? "p1" : "p0";
    };
    const printNow = n => {   // fill the two slots (first two stories) and print, like pressing 🖨️
      const d = draft(n), ids = (ED[n].order || "abc").split("");
      if (!d.lead) d.lead = ids.find(id => id !== d.side);
      if (!d.side) d.side = ids.find(id => id !== d.lead);
      printEdition(n);
    };
    const pickPP = () => { const b = document.querySelector("[data-pp]"); if (b) b.click(); };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => SCR.length,
      index: () => { const n = Math.max(1, Math.min(st.step, TOTAL)), k = kindNow(); return Math.max(0, SCR.findIndex(x => x.s === n && x.k === k)); },
      label: i => SCR[i].label,
      go: i => {
        const x = SCR[i]; if (!x) return;
        if (!st.name) st.name = "Test T.";
        st.step = x.s; st.phase = 0; hideWelcome();
        if (x.k === "file") delete st.done.c1;
        else if (x.k === "layout") delete st.printed[x.s];
        else if (ED[x.s]) {
          if (!st.printed[x.s]) { save(); printNow(x.s); }
          st.phase = x.k === "printed" ? 1 : 2;
          if (x.k === "check") delete st.done[ED[x.s].check];
        } else if (x.s === 7 && x.k !== "pp") {
          if (!st.picks["Pentagon Papers"]) { save(); render(); pickPP(); }
          st.phase = x.k === "truth" ? 1 : 2;
          if (x.k === "check") delete st.done.c6;
        } else if (x.k === "p1") st.phase = 1;
        save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        const n = Math.max(1, Math.min(st.step, TOTAL)), k = kindNow();
        if (k === "file" && !st.done.c1) { if (!st.tapped) st.tapped = true; else { st.done.c1 = true; justSolved = "c1"; } save(); render(true); }
        else if (k === "layout") printNow(n);
        else if (k === "pp") pickPP();
        else if (k === "check") { const id = n === 7 ? "c6" : ED[n].check; if (!st.done[id]) { st.done[id] = true; justSolved = id; save(); render(true); } }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
