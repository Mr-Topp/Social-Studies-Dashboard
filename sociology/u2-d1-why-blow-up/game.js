// =====================================================================
//  WHY DID THAT BLOW UP?  (Sociology Unit 2 · Day 1 · SS.9-12.Soc.5, SS.9-12.Soc.7)
//  Rebuild 2026-11-03 (Fynn: the old First Shift was confusing, too wordy, not fun,
//  and didn't teach. He wants real-world stories teens care about, not cringey).
//
//  Six REAL stories. Same rhythm every time, so nobody gets lost:
//    1. Read the story (photo + 2 short lines)
//    2. Call it: guess what really happened (3 picks, scored, never blocks you)
//    3. See what happened + the Blow-Up Meter (side-eye / furious / police)
//    4. The hidden rule: one sociology idea, bold term + plain words
//    5. One quick check (two on the last story). Wrong = hint, short lock, reshuffle.
//  Then: rank + "rules you found" recap + one Explain It + Turn in.
//  7 checks total. Strict order. Saves on this device.
//  Every fact is sourced (see SOURCES at the bottom of the page).
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u2-d1-why-blow-up-v1";
  const ASSIGNMENT_ID = "sociology-unit2-day1-first-shift";   // same id as before, so the dashboard keeps working
  const TITLE = "Sociology · Unit 2 · Day 1 · Why Did That Blow Up?";
  const STANDARD = "SS.9-12.Soc.5, SS.9-12.Soc.7";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 3;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // Blow-Up Meter levels
  const METER = [
    { ic: "😒", t: "Side-eye", d: "just a look" },
    { ic: "😡", t: "Furious", d: "people get mad" },
    { ic: "🚨", t: "Punished", d: "arrest, fine, or official discipline" }
  ];

  // ---------------- The six stories ----------------
  // call.options[0] is what really happened. The screen shuffles them.
  // checks[].options[0] is right. The screen shuffles them.
  const STORIES = [
    {
      id: "tips", norm: true, fits: ["folkway"],
      words: ["tip", "tips", "tipping", "tipped", "server", "counter", "look", "looks", "glare", "awkward", "nothing", "eye", "stare", "weird", "skip", "skipped"],
      tag: "Tip screens", when: "2023", img: "img/tip.jpg",
      alt: "A coffee shop tablet screen showing $3.85 and buttons for a $1, $2, or $3 tip.",
      cap: "A real tip screen at a coffee counter.",
      head: "A $3.85 coffee. The screen wants a $1–$3 tip.",
      lines: ["92% of adults tip their server at a sit-down restaurant. But what about when you just order at a counter?"],
      call: { q: "How many adults usually tip at order-at-the-counter places?",
        options: ["About 1 in 8 (12%)", "About half (50%)", "Almost everyone (90%)"] },
      happened: "Only <b>12%</b>. Most people tap “No tip,” and nothing happens to them.",
      meter: 0,
      rule: "<b>Norms</b> = the rules for how to act.<br><b>Folkway</b> = a small, everyday norm. Break it and you just get a look.",
      found: { t: "Folkway", d: "Break it and you just get a look." },
      checks: [{
        id: "q_folkway", label: "Spot a folkway at Casey's",
        prompt: "At Casey's, which one would only get you a weird look?",
        options: ["Not saying thanks when you get your change", "Driving away from the pump without paying", "Trying to buy a case of beer when you're 17", "Grabbing a few dollars out of the tip jar"],
        hint: "Which one is just bad manners, and not a big deal?",
        why: "<b>Folkway:</b> skip a “thanks” and you get a look. The others get you in real trouble."
      }]
    },
    {
      id: "concert", norm: true, fits: ["law", "mores"],
      words: ["singer", "rexha", "arrest", "arrested", "assault", "threw", "throw", "throwing", "police", "cops", "jail", "charged", "stitches", "hurt", "hit", "mad", "angry", "furious", "booed", "crowd", "fans", "yelled"],
      tag: "Concert", when: "June 2023", img: null, big: "📱💥🎤",
      cap: "Fans filmed it, and the video spread fast.",
      head: "A fan threw his phone at a singer in the middle of a song.",
      lines: ["It hit Bebe Rexha near the eye. She fell to her knees and needed stitches. The crowd was furious."],
      call: { q: "What happened to the guy who threw it?",
        options: ["Arrested and charged with assault", "Kicked out, but no charges filed", "Booed by the crowd, and that's all"] },
      happened: "Police <b>arrested him that night</b> for assault (hurting someone on purpose). Court papers say he thought it would be funny.",
      meter: 2,
      rule: "<b>Mores</b> (say “MOR-ayz”) = norms about right and wrong. Break one and people get mad.<br><b>Law</b> = a norm the government enforces with police, fines, or jail.",
      found: { t: "Mores + law", d: "People got mad AND police arrested him." },
      checks: [{
        id: "q_law", label: "Mores vs. law: cheating on a partner",
        prompt: "Someone cheats on their girlfriend. Their friends are furious. No police come. What rule got broken?",
        options: ["Mores: most people see it as truly wrong", "A law: the state can punish people for it", "A folkway: it's just a small, rude habit", "A role: it comes with being someone's partner"],
        hint: "Furious friends, but no police. Which kind of norm makes people mad but isn't a crime?",
        why: "<b>Mores:</b> people get mad because it feels wrong. It's not a <b>law</b>, so no police."
      }]
    },
    {
      id: "batflip", norm: true, fits: ["mores", "folkway"],
      words: ["pitch", "pitcher", "hit", "punch", "punched", "brawl", "fight", "fought", "mad", "angry", "furious", "texas", "players", "threw", "revenge", "even", "rushed", "bat"],
      tag: "MLB", when: "2015–2016", img: "img/baseball.jpg",
      alt: "Old black-and-white photo of a baseball player sitting in the on-deck circle.",
      cap: "Baseball has old unwritten rules. (Photo: National Archives)",
      head: "A star flipped his bat after a huge playoff home run.",
      lines: ["Toronto's José Bautista did it to Texas in 2015. Old-school baseball says: don't make the pitcher look bad."],
      call: { q: "The next season, the teams met again. What happened?",
        options: ["He got hit by a pitch, then a brawl", "Texas fans booed every time he batted", "He said sorry to Texas before the game"] },
      happened: "A Texas pitcher <b>hit him with a pitch</b> on purpose. Then a Texas player punched him, and both teams rushed the field.",
      meter: 1,
      rule: "<b>Status</b> = your position in a group (pitcher, captain, manager).<br><b>Role</b> = what people expect from that position. Old-school pitchers were expected to “get even.”",
      found: { t: "Status + role", d: "Your position decides what people expect you to do." },
      checks: [{
        id: "q_status", label: "Status and role at Hy-Vee",
        prompt: "A customer is yelling at a Hy-Vee cashier. Everyone expects the store manager to step in, not the new bagger. Why?",
        options: ["The manager's position comes with that duty", "The manager knows the customer better", "A state law says managers handle customers", "The bagger broke the mores by staying quiet"],
        hint: "Same problem, two different jobs. What's different about their positions?",
        why: "<b>Status and role:</b> the manager's status comes with a role: handling problems."
      }]
    },
    {
      id: "teenwork", tag: "Iowa jobs", when: "2023", img: "img/server.jpg",
      alt: "A restaurant server carrying a tray stacked with plates.",
      cap: "A restaurant server at work.",
      head: "Iowa let teens work more hours, and later at night.",
      lines: ["A 2023 law lets 14- and 15-year-olds work until 9 p.m. on school nights. 16- and 17-year-olds can work the same hours as adults."],
      call: { q: "What else can 16- and 17-year-olds do now?",
        options: ["Serve alcohol at restaurants, with a parent's OK", "Serve alcohol at bars and clubs, with a parent's OK", "Buy alcohol for the restaurant where they work"] },
      happened: "They can <b>serve alcohol at restaurants</b> with a parent's OK. Not at bars. Supporters said it builds job experience. Critics said it weakens rules that keep teens safe.",
      meter: null,
      rule: "You have more than one <b>role</b>: student, worker, son or daughter, teammate.<br><b>Role conflict</b> = when two of your roles want different things at the same time.",
      found: { t: "Role conflict", d: "Two of your roles pull you opposite ways." },
      checks: [{
        id: "q_roleconflict", label: "Role conflict: work vs. school",
        prompt: "Jay, 16, works until 11 p.m. on Monday. He has a big test Tuesday morning. What is Jay dealing with?",
        options: ["Role conflict: work and school pull opposite ways", "Mores: staying out late is seen as truly wrong", "A folkway: his boss gives him a look for leaving", "Material culture: his work uniform and his name tag"],
        hint: "Jay is two things at once: a worker and a ___. Do they want the same thing?",
        why: "<b>Role conflict:</b> his worker role wants him there late; his student role needs him rested."
      }]
    },
    {
      id: "derecho", tag: "Cedar Rapids", when: "2020", img: "img/derecho.jpg",
      alt: "A Cedar Rapids shopping plaza with its roof torn off after the 2020 derecho.",
      cap: "Wiley Plaza in Cedar Rapids, after the storm.",
      head: "A storm with 140-mph winds hit Cedar Rapids.",
      lines: ["On August 10, 2020, a derecho (a giant windstorm) tore through town. Some neighborhoods had no power for weeks."],
      call: { q: "How much of Cedar Rapids' tree cover did the storm wipe out?",
        options: ["About 65%, about 2 out of 3", "About 15%, about 1 out of 7", "About 35%, about 1 out of 3"] },
      happened: "About <b>65%</b>, around 669,000 trees. The National Guard cleared streets so crews could fix power lines. Neighbors cleared trees off each other's houses.",
      meter: null,
      rule: "<b>Social institutions</b> = big parts of society that meet people's needs: family, school, government, the economy (jobs and money), and religion.<br>In a disaster, you see them step in.",
      found: { t: "Social institutions", d: "Family, school, government, the economy, and religion meet people's needs." },
      checks: [{
        id: "q_institutions", label: "Institutions meeting a need (plant closing)",
        prompt: "A factory closes and hundreds lose their jobs. A church opens a food pantry. The city pays for job training. Which institutions stepped in?",
        options: ["Religion and government", "Family and education", "The economy and the family", "Education and religion"],
        hint: "Who runs the food pantry? Who pays for the training?",
        why: "<b>Institutions meet needs:</b> religion (the church) and government (the city) stepped in."
      }]
    },
    {
      id: "phones", tag: "Iowa schools", when: "2025", img: "img/yondr.jpg",
      alt: "A gray and green phone pouch that locks so students can't use their phones.",
      cap: "A locking phone pouch some schools use. This one's about you.",
      head: "Iowa made it a law: no phones in class.",
      lines: ["Gov. Kim Reynolds signed it in 2025. Supporters said phones hurt focus. Some parents asked, “What about emergencies?”"],
      call: { q: "The state law is the minimum. What can each school do?",
        options: ["Make even stricter phone rules", "Let teachers allow phones if they want", "Skip the law if parents vote no"] },
      happened: "Schools can go <b>stricter</b>, like no phones all day. The Iowa House passed it 92 to 4. You're living under it right now.",
      meter: null,
      rule: "<b>Values</b> = big ideas a group thinks are good (learning, safety, freedom). Sometimes two values clash.<br>Here, <b>government</b> made a rule for <b>education</b>.",
      found: { t: "Values", d: "Focus vs. safety: two good things that clash." },
      checks: [{
        id: "q_values", label: "Values clash in the phone law",
        prompt: "Supporters said phones hurt focus. Some parents worried about emergencies. What is this?",
        options: ["Two values clashing: focus and safety", "Two folkways clashing: manners and habits", "Two roles clashing: student and teacher", "Two laws clashing: state and school"],
        hint: "Both sides want something good. What big idea does each side care about?",
        why: "<b>Values clash:</b> both sides care about something good, just different things."
      }, {
        id: "q_govedu", label: "Another case of government shaping education",
        prompt: "Which one is ANOTHER case of government making a rule for education?",
        options: ["Iowa says kids must go to school until 16", "A family says everyone eats dinner together", "A church picks the songs for Sunday", "A store sets its own hours on weekends"],
        hint: "Find the one where lawmakers make a rule about school.",
        why: "<b>Institutions:</b> government (state law) shapes education (school)."
      }]
    }
  ];
  // Vocab match: the last round before the wrap-up. Tap a word, then tap what it means.
  const VOCAB = [
    { t: "Folkway", m: "A small everyday rule. Break it and you just get a look." },
    { t: "Mores", m: "A rule about right and wrong. Break it and people get mad." },
    { t: "Law", m: "A rule the government enforces with police, fines, or jail." },
    { t: "Status", m: "Your position in a group, like captain or manager." },
    { t: "Role", m: "What people expect from someone in a position." },
    { t: "Role conflict", m: "When being a worker and a student pull you opposite ways." },
    { t: "Social institution", m: "A big part of society that meets needs, like school or family." },
    { t: "Values", m: "Big ideas a group thinks are good, like safety or freedom." }
  ];
  const VOCAB_STEP = 7, WRAP_STEP = 8;
  const CHECK_IDS = [].concat(...STORIES.map(s => s.checks.map(c => c.id)));
  const CHECK_LABEL = {}; STORIES.forEach(s => s.checks.forEach(c => { CHECK_LABEL[c.id] = c.label; }));

  const RANKS = [
    { min: 5, ic: "🧠", t: "Culture Reader", line: "You read people better than most adults do." },
    { min: 3, ic: "👀", t: "Getting the Pattern", line: "You called some of it. The rest surprised you, which is the point." },
    { min: 0, ic: "🤯", t: "Plot-Twist Magnet", line: "Real life kept surprising you. That's why it blew up. Now you know the rules behind it." }
  ];

  const PROMPT = {
    id: "explain", short: "Explain It: folkway, mores, or law",
    label: "Pick ONE of these stories. Was the rule that got broken a folkway, mores, or a law? Prove it with how people reacted.",
    stem: "In the ___ story, the rule was ___ because when someone broke it, ___.",
    go4: "Go for a 4: name a second story with a different kind of norm and compare them.",
    min: 50, newWords: 4,
    mustAll: [["folkway", "folkways", "mores", "law", "laws"], ["because", "since", "so", "proof", "shows"]],
    mustMsg: "Name the kind of norm (folkway, mores, or law) AND say how you know (use “because”)."
  };

  // ---------------- State ----------------
  const fresh = () => ({ v: 1, name: "", step: 0, calls: {}, checks: {}, writing: "", pick: "", vocab: {}, vocabWrong: 0, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1) st = fresh();
  if (!st.vocab) { st.vocab = {}; st.vocabWrong = 0; }
  // Shared Chromebooks: a different student signed in on this device starts clean.
  try {
    const nowName = localStorage.getItem("site-student-name") || "";
    const short = window.classShortName || (x => x);
    if (st.name && nowName && short(st.name).toLowerCase() !== short(nowName).toLowerCase()) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  // Wrong tries are remembered even after "Start over", so the teacher's first-try score stays honest.
  const HKEY = KEY + "-history";
  let hist; try { hist = JSON.parse(localStorage.getItem(HKEY)); } catch (e) {}
  if (!hist || typeof hist !== "object" || !hist.wrong) hist = { wrong: {}, restarts: 0 };
  const saveHist = () => { try { localStorage.setItem(HKEY, JSON.stringify(hist)); } catch (e) {} };
  const everWrong = id => Math.max(hist.wrong[id] || 0, (st.checks[id] && st.checks[id].wrong) || 0);
  const chk = id => (st.checks[id] = st.checks[id] || { wrong: 0, done: false });
  const callsRight = () => STORIES.filter(s => st.calls[s.id] === 0).length;
  const rank = () => RANKS.find(r => callsRight() >= r.min);

  const app = $("app");
  let locked = false, justSolved = null;

  // ---------------- HUD ----------------
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const now = st.step - 1;
    $("track").innerHTML = STORIES.map((s, i) => {
      const cls = i < now ? "done" : i === now ? "now" : "";
      return `<li class="${cls}" title="${esc(s.tag)}"><span>${i < now ? "✓" : i + 1}</span>${esc(s.tag)}</li>`;
    }).join("") + `<li class="${st.step === VOCAB_STEP ? "now" : st.step > VOCAB_STEP ? "done" : ""}"><span>${st.step > VOCAB_STEP ? "✓" : "7"}</span>Vocab</li>` +
      `<li class="${st.step >= WRAP_STEP ? "now" : ""}"><span>★</span>Wrap-up</li>`;
    const made = STORIES.filter(s => st.calls[s.id] != null).length;
    $("callPill").innerHTML = `🎯 Called it: <b>${callsRight()}</b> of ${made}`;
    $("callPill").hidden = made === 0;
  }

  // ---------------- Title ----------------
  function title() {
    app.innerHTML = `<section class="card titlecard">
      <div class="title-left">
        <p class="kicker">Sociology · Unit 2 · Day 1</p>
        <h1>Why Did That<br>Blow Up?</h1>
        <p class="hook">Six real stories. Guess what happened. Find the hidden rule.</p>
        <ul class="facts"><li>📰 6 real stories · ✅ 7 quick checks · 🧩 vocab match · ✍️ 1 short answer</li><li>⏱ About 20–25 min</li></ul>
        <p class="goal">🎯 <b>Today's goal:</b> name the rules, roles, and institutions that shape how people act.</p>
        <label for="nameBox">Your name</label>
        <input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Start →</button>
      </div>
      <div class="title-right" aria-hidden="true">
        <div class="mosaic">
          <img src="img/tip.jpg" alt=""><img src="img/derecho.jpg" alt=""><img src="img/server.jpg" alt=""><img src="img/yondr.jpg" alt="">
        </div>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 1; save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Pieces ----------------
  const stamp = (id, txt) => `<span class="stamp${justSolved === id ? " slam" : ""}">${txt}</span>`;
  function meterHtml(level, live) {
    return `<div class="meter${live ? " live" : ""}" aria-label="Blow-Up Meter: ${METER[level].t}">
      <p class="m-tag">Blow-Up Meter</p>
      <div class="m-row">${METER.map((m, i) => `<div class="m-cell${i === level ? " on" : ""}${i < level ? " past" : ""}"><span class="m-ic">${m.ic}</span><b>${m.t}</b><small>${m.d}</small></div>`).join("")}</div></div>`;
  }

  function mountCheck(box, def, onRight) {
    const c = chk(def.id);
    const wrap = document.createElement("div"); wrap.className = "check"; wrap.dataset.check = def.id;
    box.appendChild(wrap);
    if (c.done) { wrap.innerHTML = stamp(def.id, "✔ Got it") + `<p class="reveal">💡 ${def.why}</p>`; wrap.classList.add("solved"); if (justSolved === def.id) justSolved = null; return; }
    wrap.innerHTML = `<p class="check-tag">✅ Quick check</p><h3>${def.prompt}</h3>`;
    const area = document.createElement("div"); area.className = "choices";
    const fb = document.createElement("p"); fb.className = "msg"; fb.setAttribute("aria-live", "polite");
    let lastOrder = "";
    function draw() {
      area.replaceChildren();
      let order;
      for (let k = 0; k < 8; k++) { order = shuffle(def.options.map((t, n) => ({ t, n }))); if (order.map(o => o.n).join() !== lastOrder) break; }
      lastOrder = order.map(o => o.n).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) { c.done = true; justSolved = def.id; if (window.classFirstTry) window.classFirstTry.right(def.id); save(); onRight(); return; }
          c.wrong++; hist.wrong[def.id] = (hist.wrong[def.id] || 0) + 1; saveHist(); if (window.classFirstTry) window.classFirstTry.wrong(); save();
          locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
          let left = (window.classIsTestT && window.classIsTestT()) ? 0 : LOCK;
          const tick = () => {
            fb.className = "msg hint";
            if (left <= 0) { locked = false; fb.textContent = "💡 Not quite. " + def.hint + " Try again."; draw(); return; }
            fb.textContent = "💡 Not quite. " + def.hint + " Buttons shuffle in " + left + "…";
            left--; setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
    wrap.appendChild(fb); wrap.appendChild(area);
  }

  function scrollToEl(el) { if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60); }

  // ---------------- A story screen ----------------
  let scrollTarget = null;
  function story(i) {
    const s = STORIES[i];
    const box = document.createElement("section"); box.className = "card story";
    app.replaceChildren(box);
    const media = s.img
      ? `<figure class="photo"><img src="${s.img}" alt="${esc(s.alt)}"><figcaption>${s.cap}</figcaption></figure>`
      : `<figure class="photo noimg"><div class="bigic" aria-hidden="true">${s.big}</div><figcaption>${s.cap}</figcaption></figure>`;
    box.innerHTML = `<p class="kicker">Story ${i + 1} of ${STORIES.length} · ${esc(s.tag)} · ${esc(s.when)}</p>
      <div class="storyrow">${media}<div class="storytext"><h2>${s.head}</h2>${s.lines.map(l => `<p>${l}</p>`).join("")}</div></div>`;

    // Step A: call it (sits beside the photo so the buttons show without scrolling)
    const callBox = document.createElement("div"); callBox.className = "callit"; callBox.id = "callBox";
    (st.calls[s.id] == null ? box.querySelector(".storytext") : box).appendChild(callBox);
    const picked = st.calls[s.id];
    if (picked == null) {
      callBox.innerHTML = `<p class="step-tag">🎯 Call it <span class="free">just a guess, it doesn't count against you</span></p><h3>${s.call.q}</h3>`;
      const row = document.createElement("div"); row.className = "calls";
      shuffle(s.call.options.map((t, n) => ({ t, n }))).forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "callbtn"; b.textContent = o.t;
        b.onclick = () => { st.calls[s.id] = o.n; save(); scrollTarget = "call"; render(); };
        row.appendChild(b);
      });
      callBox.appendChild(row);
      return;
    }
    const right = picked === 0;
    callBox.innerHTML = `<p class="step-tag">🎯 Your call</p>
      <p class="yourcall ${right ? "hit" : "miss"}">${right ? "✅ Called it!" : "🤯 Plot twist!"} You said: <i>${esc(s.call.options[picked])}</i></p>`;

    // Step B: what happened + meter + hidden rule
    const after = document.createElement("div"); after.className = "after"; after.id = "after"; box.appendChild(after);
    after.innerHTML = `<div class="happened"><p class="step-tag">📰 What really happened</p><p>${s.happened}</p></div>
      <div class="rulebox"><p class="step-tag">🔍 The hidden rule</p><p>${s.rule}</p></div>`;

    // Step C: checks, one at a time
    const checksBox = document.createElement("div"); box.appendChild(checksBox);
    let allDone = true;
    for (const def of s.checks) {
      mountCheck(checksBox, def, () => { scrollTarget = "next"; render(); });
      if (!chk(def.id).done) { allDone = false; break; }
    }
    if (allDone) {
      const nb = document.createElement("button"); nb.type = "button"; nb.className = "go"; nb.id = "nextBtn";
      nb.textContent = i + 1 < STORIES.length ? "Next story →" : "Last round: vocab match →";
      nb.onclick = () => { st.step++; save(); render(); window.scrollTo(0, 0); };
      box.appendChild(nb);
    }
    if (scrollTarget === "call") scrollToEl($("callBox"));
    else if (scrollTarget === "next") scrollToEl(box.querySelector(".check:not(.solved)") || $("nextBtn"));
    scrollTarget = null;
  }

  // ---------------- Vocab match ----------------
  let vPick = null, vLocked = false, vOrderT = null, vOrderM = null;
  function vocab() {
    if (!vOrderT) { vOrderT = shuffle(VOCAB.map((v, i) => i)); vOrderM = shuffle(VOCAB.map((v, i) => i)); }
    const box = document.createElement("section"); box.className = "card";
    app.replaceChildren(box);
    const doneN = VOCAB.filter(v => st.vocab[v.t]).length;
    box.innerHTML = `<p class="kicker">Last round · Vocab match</p><h2>Match each word to what it means.</h2>
      <p class="vhow">Tap a word, then tap its meaning. <b>${doneN} of ${VOCAB.length}</b> matched.</p>
      <p class="msg" id="vMsg" aria-live="polite"></p>
      <div class="vgrid"><div class="vcol" id="vTerms"></div><div class="vcol" id="vMeans"></div></div>`;
    const terms = $("vTerms"), means = $("vMeans"), msg = $("vMsg");
    vOrderT.forEach(i => {
      const v = VOCAB[i], ok = !!st.vocab[v.t];
      const b = document.createElement("button"); b.type = "button";
      b.className = "vterm" + (ok ? " matched" : "") + (vPick === i ? " sel" : "");
      b.textContent = (ok ? "✓ " : "") + v.t; b.disabled = ok;
      b.onclick = () => { if (vLocked) return; vPick = i; msg.textContent = ""; msg.className = "msg"; vocab(); };
      terms.appendChild(b);
    });
    vOrderM.forEach(i => {
      const v = VOCAB[i], ok = !!st.vocab[v.t];
      const b = document.createElement("button"); b.type = "button";
      b.className = "vmean" + (ok ? " matched" : ""); b.disabled = ok;
      b.textContent = v.m;
      b.onclick = () => {
        if (vLocked) return;
        if (vPick == null) { msg.textContent = "👈 First tap a word on the left."; msg.className = "msg hint"; return; }
        if (vPick === i) {
          st.vocab[v.t] = true; vPick = null; save(); vocab();
          if (VOCAB.every(x => st.vocab[x.t])) scrollToEl($("nextBtn"));
          return;
        }
        st.vocabWrong++; hist.vocabWrong = (hist.vocabWrong || 0) + 1; saveHist(); save();
        vLocked = true; app.querySelectorAll(".vgrid button").forEach(x => { x.disabled = true; });
        msg.textContent = "💡 Not a match for “" + VOCAB[vPick].t + ".” Read the meanings again and try another.";
        msg.className = "msg hint";
        setTimeout(() => { vLocked = false; vocab(); $("vMsg").textContent = msg.textContent; $("vMsg").className = "msg hint"; }, 1500);
      };
      means.appendChild(b);
    });
    if (doneN === VOCAB.length) {
      const end = document.createElement("div"); end.className = "vdone";
      end.innerHTML = `<p>✅ All ${VOCAB.length} matched!</p>`;
      const nb = document.createElement("button"); nb.type = "button"; nb.className = "go"; nb.id = "nextBtn"; nb.textContent = "See your rank →";
      nb.onclick = () => { st.step = WRAP_STEP; save(); render(); window.scrollTo(0, 0); };
      end.appendChild(nb); box.appendChild(end);
    }
  }

  // ---------------- Wrap-up ----------------
  function wrap() {
    const r = rank();
    const box = document.createElement("section"); box.className = "card";
    app.replaceChildren(box);
    box.innerHTML = `<div class="ending"><div class="e-icon">${r.ic}</div><p class="kicker">Your rank</p><h2>${r.t}</h2><p>${r.line}</p><p class="score">✅ <b>${CHECK_IDS.length} of ${CHECK_IDS.length}</b> checks done · 🎯 You called <b>${callsRight()} of ${STORIES.length}</b> stories.</p></div>
      <div class="report" id="report"><p class="report-tag">✍️ Explain It</p>
        <label for="w_explain">${PROMPT.label}</label>
        <div class="pickrow" id="pickRow"></div>
        <p class="stem">✏️ Starter: ${esc(PROMPT.stem)}</p>
        <p class="go4">⭐ ${PROMPT.go4}</p>
        <textarea id="w_explain" rows="4">${esc(st.writing)}</textarea>
        <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
        <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
        <p class="turned" id="turnedBadge" ${st.turnedIn ? "" : "hidden"}>✓ Turned in</p></div>
      <details class="found"><summary class="step-tag">🔍 Rules you found today (tap to see)</summary>
        <ul>${STORIES.map(s => `<li><span class="f-tag">${esc(s.tag)}</span><b>${s.found.t}:</b> ${s.found.d}</li>`).join("")}</ul></details>`;
    const pr = $("pickRow");
    STORIES.filter(s => s.norm).forEach(s => {
      const b = document.createElement("button"); b.type = "button"; b.className = "pick" + (st.pick === s.id ? " sel" : ""); b.textContent = s.tag;
      b.onclick = () => {
        st.pick = s.id; save();
        pr.querySelectorAll(".pick").forEach(x => x.classList.toggle("sel", x === b));
        const ta = $("w_explain");
        if (!ta.value.trim()) { ta.value = "In the " + s.tag + " story, the rule was "; st.writing = ta.value; save(); }
        ta.focus();
      };
      pr.appendChild(b);
    });
    $("w_explain").addEventListener("input", e => { st.writing = e.target.value; save(); });
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg"), box = $("w_explain"), v = (box.value || "").trim();
    const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const testT = window.classIsTestT && window.classIsTestT();   // Test T. (teacher) skips the writing rules
    if (testT && !st.pick) st.pick = STORIES[0].id;
    if (!st.pick) { msg.textContent = "First, tap the story you're writing about."; msg.className = "msg bad"; return; }
    if (!testT) {
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: PROMPT.stem, source: "from today" });
      if (junk) { msg.textContent = junk; msg.className = "msg"; return; }
    }
    if (v.length < PROMPT.min) { msg.textContent = "Write a little more (1–2 full sentences)."; msg.className = "msg bad"; box.focus(); return; }
    if (/_{2,}/.test(v)) { msg.textContent = "Fill in the blanks with your own words."; msg.className = "msg bad"; box.focus(); return; }
    const stemWords = new Set(plain(PROMPT.stem).match(/[\p{L}']+/gu) || []);
    const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshW.size < PROMPT.newWords) { msg.textContent = "Add one more detail: what did people do when the rule was broken?"; msg.className = "msg bad"; box.focus(); return; }
    const pv = " " + plain(v) + " ";
    if (PROMPT.mustAll.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^\\p{L}])", "iu").test(pv)))) { msg.textContent = PROMPT.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    const story = STORIES.find(x => x.id === st.pick);
    const toks = plain(v).match(/[\p{L}']+/gu) || [];
    const after = plain(v).split(/\b(because|since|when|so)\b/).slice(2).join(" ");
    const afterToks = after.match(/[\p{L}']+/gu) || [];
    if (story && !afterToks.some(w => story.words.includes(w))) { msg.textContent = "After “because,” use a detail from the " + story.tag + " story. What did people do?"; msg.className = "msg bad"; box.focus(); return; }
    const normHits = toks.filter(w => /^(folkways?|mores|laws?)$/.test(w)).length;
    const normCount = {}; toks.forEach(w => { const k = w.replace(/s$/, ""); if (/^(folkway|more|law)$/.test(k)) normCount[k] = (normCount[k] || 0) + 1; });
    if (normHits > 4 || Object.values(normCount).some(n => n > 2)) { msg.textContent = "Pick ONE kind of norm, then explain it in your own words."; msg.className = "msg bad"; box.focus(); return; }
    const NORMW = new Set(["folkway", "folkways", "mores", "law", "laws", "more", "the", "and", "was", "rule", "someone", "broke", "because", "since", "when", "it's", "that"]);
    const own = new Set((after.match(/[\p{L}']{3,}/gu) || []).filter(w => !NORMW.has(w)));
    const afterCounts = {}; afterToks.forEach(w => { if (w.length > 2) afterCounts[w] = (afterCounts[w] || 0) + 1; });
    if (Object.values(afterCounts).some(n => n > 2)) { msg.textContent = "Say it in a real sentence, without repeating words."; msg.className = "msg bad"; box.focus(); return; }
    if (own.size < 2) { msg.textContent = "After “because,” say what people did when the rule was broken."; msg.className = "msg bad"; box.focus(); return; }
    }
    if (!window.classTurnIn) { msg.textContent = "Preview only: turning in is off here."; msg.className = "msg"; return; }
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
    const firstTry = ids => ids.filter(id => chk(id).done && !everWrong(id)).length;
    const soc5 = ["q_folkway", "q_law", "q_values"], soc7 = ["q_status", "q_roleconflict", "q_institutions", "q_govedu"];
    a["First-try correct"] = firstTry(CHECK_IDS) + " of " + CHECK_IDS.length;
    a["First-try by standard"] = "Soc.5: " + firstTry(soc5) + " of " + soc5.length + " · Soc.7: " + firstTry(soc7) + " of " + soc7.length;
    CHECK_IDS.forEach(id => { const w = everWrong(id); a[CHECK_LABEL[id]] = w ? "after " + w + " wrong " + (w === 1 ? "try" : "tries") : "first try"; });
    a["Started over"] = hist.restarts ? hist.restarts + (hist.restarts === 1 ? " time (wrong tries still counted)" : " times (wrong tries still counted)") : "No";
    const vw = Math.max(st.vocabWrong || 0, hist.vocabWrong || 0);
    a["Vocab match"] = VOCAB.filter(v => st.vocab[v.t]).length + " of " + VOCAB.length + " matched, " + (vw ? vw + " wrong " + (vw === 1 ? "try" : "tries") : "no wrong tries");
    a["Calls right (guesses, not graded)"] = callsRight() + " of " + STORIES.length;
    a["Rank"] = rank().t;
    const s = STORIES.find(x => x.id === st.pick);
    a["Explain It: story picked"] = s ? s.tag : "";
    const named = ["folkway", "mores", "law"].filter(w => new RegExp("(^|[^a-z])" + w + "s?($|[^a-z])", "i").test($("w_explain").value || ""));
    a["Explain It: norm named"] = named.join(", ") || "none";
    a["Explain It: fits the story?"] = s && named.some(n => s.fits.includes(n)) ? "Yes" : "Check this one";
    a["Writing: " + PROMPT.short] = ($("w_explain").value || "").trim();
    return a;
  }

  // ---------------- Render ----------------
  let first = true;
  function render() {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    hud(); locked = false;
    if (st.step <= 0) title();
    else if (st.step <= STORIES.length) story(st.step - 1);
    else if (st.step === VOCAB_STEP) vocab();
    else wrap();
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; hist.restarts++; saveHist(); vOrderT = vOrderM = null; vPick = null;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) {
    $("welcome").textContent = "Welcome back, " + st.name + "! You're on " + (st.step >= WRAP_STEP ? "the wrap-up." : st.step === VOCAB_STEP ? "the vocab match." : "story " + st.step + " of " + STORIES.length + ".");
    $("welcome").hidden = false;
  }
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any story, the vocab match, or the wrap-up, and answer the screen.
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => WRAP_STEP + 1,
      index: () => Math.max(0, Math.min(st.step, WRAP_STEP)),
      label: i => i === 0 ? "Title" : i <= STORIES.length ? "Story " + i + " · " + STORIES[i - 1].tag : i === VOCAB_STEP ? "Vocab match" : "Wrap-up + turn in",
      go: i => {
        if (!st.name) st.name = "Test T.";
        if (i > 0) STORIES.slice(0, Math.min(i, STORIES.length + 1) - 1).forEach(s => { if (st.calls[s.id] == null) st.calls[s.id] = 0; s.checks.forEach(d => { chk(d.id).done = true; }); });
        if (i >= WRAP_STEP) VOCAB.forEach(v => { st.vocab[v.t] = true; });
        st.step = i; locked = false; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => {
        if (st.step >= 1 && st.step <= STORIES.length) {
          const s = STORIES[st.step - 1];
          if (st.calls[s.id] == null) st.calls[s.id] = 0;
          s.checks.forEach(d => { chk(d.id).done = true; });
        } else if (st.step === VOCAB_STEP) VOCAB.forEach(v => { st.vocab[v.t] = true; });
        else if (st.step > VOCAB_STEP && !st.pick) st.pick = STORIES[0].id;
        locked = false; save(); render();
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
  window.__wdtbu = { state: () => JSON.parse(JSON.stringify(st)), stories: STORIES };
})();
