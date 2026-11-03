// =====================================================================
//  PUSH WARS  (Sociology Unit 3 Day 2 · "Who Shapes You the Most Right Now?")
//  You run push alerts for a video app. Each day of Jay's week is a timeline of
//  time slots. In each slot an agent of socialization pulls on Jay with "pips"
//  (time, trust, reward, punishment). You place ⚡ pushes to add power to the feed.
//  Feed power (1 + pushes) must BEAT the agent's pips (ties go to the agent).
//  Wins raise Dex's watch time but can cost Jay's real life; pushes that lose
//  annoy Jay (4 = he mutes the app). Ending depends on all of it.
//  6 evidence checks are woven in (each unlocks the next part). Saves on this device.
//  Turn-in payload matches shared/unit-game.js finish().
//  ClipLoop, Dex, Jay, Mia, Andre and everyone in Jay's life are made up.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u3-d2-who-shapes-you-v2";
  const ASSIGNMENT_ID = "soc-u3-d2-who-shapes-you";
  const TITLE = "Sociology · Unit 3 · Day 2 · Who Shapes You the Most Right Now?";
  const STANDARD = "SS.9-12.Soc.9";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5, GOAL = 8, WMAX = 12, TOKENS = 10, MUTE_AT = 4, MAXP = 3, LIFE0 = 6;

  // ---------- Agents and pull "pips" ----------
  const AG = {
    peers: { i: "👥", n: "Peers", s: "PEERS WIN" },
    family: { i: "🏠", n: "Family", s: "FAMILY WINS" },
    school: { i: "🏫", n: "School", s: "SCHOOL WINS" },
    work: { i: "💼", n: "Workplace", s: "WORKPLACE WINS" },
    faith: { i: "⛪", n: "Family + Religion", s: "FAMILY + RELIGION WIN" },
    none: { i: "🌙", n: "Nobody", s: "" },
    media: { i: "📲", n: "Media", s: "FEED WINS" }
  };
  const PIP = { time: "⏱️", trust: "🤝", reward: "🎁", punish: "⚠️" };
  const PIPN = { time: "Time", trust: "Trust", reward: "Reward", punish: "Punishment" };

  // Night slots: nobody else is pulling, so the feed wins. More pushes = more watch time, less sleep.
  const NIGHT = {
    quiet: { t: "A few clips, then sleep.", w: 1, l: 0 },
    by: [null,
      { t: "Clips till midnight.", w: 2, l: 0 },
      { t: "Clips till 1 a.m. Tired.", w: 3, l: -1 },
      { t: "Clips till 2 a.m. Wrecked.", w: 4, l: -2 }]
  };

  // ---------- Jay's week ----------
  const DAYS = [
    { tag: "Mon", name: "Monday", icon: "👟", title: "Shoe Day", setup: "Jay has $120. He owes Mom $40.",
      dexPre: "Shoe ads pay best. Push!", run: "▶ Run Monday",
      reveal: "<b>Agents of socialization</b>: groups that teach us how to act.",
      slots: [
        { id: "chat", time: "3:15 PM", ag: "peers", face: "💬", who: "Group chat", line: "“everybody's getting Volt 3s 🔥”",
          pips: [["time", "all day"], ["time", ""], ["reward", "fitting in"], ["punish", "roasted"]], same: true,
          out: { quiet: { t: "Bought Volts anyway. Paid Mom back.", w: 0, l: 0 },
                 ride: { t: "Binged clips. Spent all $120 on Volts.", w: "p", l: -1, flag: "owesMom" } } },
        { id: "dinner", time: "6:00 PM", ag: "family", face: "👩", who: "Mom", line: "“No phones at dinner.”",
          pips: [["trust", ""], ["trust", ""], ["punish", "takes phone"]], extra: f => f.owesMom ? [["punish", "owed $40"]] : [],
          out: { quiet: { t: "Phone in the basket. Family dinner.", w: 0, l: 1 },
                 win: { t: "Clips at dinner. Mom took his phone.", w: 1, l: -1, flag: "phoneTaken" },
                 lose: { t: "Phone buzzed. Mom: “Basket. Now.”", w: 0, l: 0 } } },
        { id: "mnight", time: "11:00 PM", ag: "none", face: "🌙", who: "Nobody awake", line: "Everyone's asleep.",
          pips: [], night: true, block: f => f.phoneTaken ? "📵 Mom has his phone." : null, blockOut: { t: "No phone tonight. Slept fine.", w: 0, l: 0 } }
      ] },
    { tag: "Tue", name: "Tuesday", icon: "🍕", title: "Shift Day", setup: "Jay's $90 car insurance is due Friday.",
      dexPre: "New Rift season drops at 7!", run: "▶ Run Tuesday",
      reveal: "<b>Workplace</b>: a job teaches its own rules, like “phones in back.”",
      slots: [
        { id: "shift", time: "5–9 PM", ag: "work", face: "🍕", who: "Rosa, Big Slice manager", line: "“Cover 5–9? Phones stay in back.”",
          pips: [["reward", "$60"], ["punish", "cuts hours"], ["trust", "trained him"], ["time", "4 hours"]],
          out: { quiet: { t: "Clean shift. $60 for insurance.", w: 0, l: 1 },
                 win: { t: "Watched clips on shift. Sent home.", w: 2, l: -2 },
                 lose: { t: "Phone buzzed at the counter. Written up.", w: 0, l: -1 } } },
        { id: "tnight", time: "9:15 PM", ag: "none", face: "🌃", who: "Parking lot", line: "Shift's over. The squad's offline.",
          pips: [], night: true }
      ] },
    { tag: "Wed", name: "Wednesday", icon: "📊", title: "Slide 3", setup: "Group presents at 8:05 a.m. Jay owes slide 3.",
      dexPre: "Wednesdays are slow. Fix it.", run: "▶ Run Wednesday",
      reveal: "<b>Hidden curriculum</b>: unspoken school lessons, like being on time.",
      slots: [
        { id: "nia", time: "4:00 PM", ag: "school", face: "📝", who: "Nia, group partner", line: "“did u finish slide 3?? 😬”",
          pips: [["trust", "counting on him"], ["punish", "grade"]],
          out: { quiet: { t: "Slide 3 done by 6.", w: 0, l: 0 },
                 win: { t: "Clips instead. Slide 3 still blank.", w: 2, l: -1, flag: "noSlide" },
                 lose: { t: "Ignored the alert. Finished slide 3.", w: 0, l: 0 } } },
        { id: "wnight", time: "11:00 PM", ag: "none", face: "🌙", who: "Nobody awake", line: "Everyone's asleep.",
          pips: [], night: true,
          alt: f => f.noSlide ? { ag: "school", face: "🏫", who: "Ms. Harlan, teacher", line: "“Late groups lose their slot.”", night: false,
            pips: [["punish", "grade"], ["trust", "his group"]],
            out: { quiet: { t: "Up late finishing slide 3. Made it.", w: 0, l: -1 },
                   win: { t: "Slide 3 blank. Group presented without him.", w: "1+p", l: -2 },
                   lose: { t: "Alerts buzzed. Finished slide 3 at 1 a.m.", w: 0, l: -1 } } } : null }
      ] },
    { tag: "Sun", name: "Sunday", icon: "🥞", title: "Pancake Morning", setup: "Grandma's church pancake breakfast.",
      dexPre: "Rift finals stream at 10. Make Sunday ours.", run: "▶ Run Sunday",
      reveal: "<b>Religion</b> teaches values. <b>Cultural capital</b>: know-how and connections for work.",
      fact: "Real Iowa: Cedar Rapids' Mother Mosque of America (built 1934) is often called the oldest standing U.S. mosque.",
      slots: [
        { id: "grandma", time: "7:30 AM", ag: "faith", face: "👵", who: "Grandma", line: "“Pancakes at 8. Wear a clean shirt.”",
          pips: [["trust", "since age 9"], ["trust", ""], ["time", "every year"], ["reward", "church family"], ["reward", ""]],
          out: { quiet: { t: "Flipped 200 pancakes. Mr. Ortiz noticed.", w: 0, l: 1 },
                 win: { t: "Skipped Grandma. She cried.", w: 2, l: -3 },
                 lose: { t: "Grandma: “Phone away at the griddle.”", w: 0, l: 0 } } },
        { id: "marcus", time: "10:00 AM", ag: "peers", face: "🏀", who: "Marcus, best friend", line: "“pickup at the Y. u coming?”",
          pips: [["reward", "fun"], ["punish", "left out"]],
          out: { quiet: { t: "Pickup game with Marcus.", w: 0, l: 1 },
                 win: { t: "Watched the Rift finals. Marcus: “k.”", w: 3, l: -1 },
                 lose: { t: "Ignored the alerts. Played with Marcus.", w: 0, l: 1 } } }
      ] }
  ];

  // ---------- Life course board + Dex's plan for Mia ----------
  const AGES = [
    { id: "mia", face: "🧒", n: "Mia, 8", sub: "Jay's sister", rows: [
      ["family", "Mom's rules", ["time", "time", "trust", "reward", "punish", "punish"]],
      ["media", "", ["time"]]] },
    { id: "jay", face: "🧑", n: "Jay, 16", sub: "", rows: [
      ["peers", "Friends", ["time", "time", "reward", "punish"]],
      ["media", "", ["time", "time"]],
      ["family", "Mom", ["trust", "trust", "punish"]]] },
    { id: "andre", face: "🧔🏽", n: "Andre, 24", sub: "", rows: [
      ["work", "Warehouse night shift", ["punish", "punish", "reward", "time"]],
      ["family", "Raising a 2-year-old", ["time", "trust", "trust"]],
      ["media", "", ["time"]]] }
  ];
  const MIA = [
    { id: "build", i: "🛠️", t: "Build it", s: "Dex is the boss.", res: "Mom found it. She deleted ClipLoop.", w: -1, stamp: "FAMILY WINS", ag: "family", dex: "Mom deleted us?!", trail: "Built Mia's autoplay" },
    { id: "push", i: "✋", t: "Push back", s: "“She's 8. Not our user.”", res: "Dex cut your bonus.", w: 0, stamp: "NO BONUS", ag: "none", dex: "No bonus for you.", trail: "Refused Mia's autoplay" },
    { id: "timer", i: "⏲️", t: "Secret timer", s: "20 minutes, then it stops.", res: "Mia watched 20 minutes. Dex found the timer.", w: 0, stamp: "CAUGHT", ag: "work", dex: "Who added this timer?!", trail: "Snuck in a 20-min timer" }
  ];
  const MIA_REVEAL = "<b>Life course</b>: the strongest agent changes as you grow up.";

  // ---------- Evidence checks (FIRST option is right; the screen shuffles) ----------
  const CHECKS = [
    { id: "c1", std: "Soc.9", short: "Coleman: teens set status rules", lockTo: "Tuesday", head: "Why did friends win?",
      doc: () => `<div class="doc"><p class="dk">Real research · 1950s</p>
        <p class="dq">Boys at Midwest high schools: “Remember me as…”</p>
        <div class="bars"><div class="barr"><span>🏈 Star athlete</span><span class="bt"><span style="width:44%"></span></span><b>over 40%</b></div>
        <div class="barr"><span>📚 Brilliant student</span><span class="bt"><span style="width:28%"></span></span><b>under 30%</b></div></div>
        <p class="src">Source: James Coleman, The Adolescent Society (1961), summarized by Education Next.</p></div>`,
      ask: "What does this show?",
      options: ["Teens set their own rules for who's cool", "Teens mostly want what their teachers want", "Teens mostly copy what their parents want", "Teens don't care what other people think"],
      hint: "Compare the two bars.", why: "Peers set what's cool, not adults." },
    { id: "c2", std: "Soc.9", short: "Shift: reward + punishment", lockTo: "Dex's next file", head: "Why did we lose to a pizza place?",
      doc: () => `<div class="rival ag-work" style="--c:var(--work)"><div class="rtop"><span class="rface">🍕</span><div><span class="atag">💼 Workplace</span><span class="rwho">Rosa, Big Slice manager</span></div></div>
        <div class="pips big-pips">${pipsHtml(DAYS[1].slots[0].pips)}</div></div>${LEGEND}<p class="sign">📌 PHONES STAY IN THE BACK ON SHIFT</p>`,
      ask: "Why does Rosa beat the feed?",
      options: ["She has a reward and a punishment", "The feed ran out of new videos", "She's his best friend at school", "His mom made him take the shift"],
      hint: "Look at Rosa's 🎁 and ⚠️.", why: "Pay (🎁) and cutting hours (⚠️) pull hard." },
    { id: "c3", std: "Soc.9", short: "Pew: media time is growing", lockTo: "Wednesday", head: "Why chase teens?",
      doc: () => `<div class="doc"><p class="dk">Real survey · Pew · 2024</p>
        <p class="quote">“Nearly half of teens say they are online almost constantly, up from 24% a decade ago.”</p>
                <p class="src">Source: Pew Research Center, “Teens, Social Media and Technology 2024” (Dec. 12, 2024). 1,391 U.S. teens.</p></div>`,
      ask: "What does Pew show?",
      options: ["It gets more teen time than 10 years ago", "It gets less teen time than 10 years ago", "Teens have mostly quit using it", "It mostly reaches adults, not teens"],
      hint: "Compare “nearly half” with 24%.", why: "More time online, more pull." },
    { id: "c4", std: "Soc.9", short: "Hidden curriculum", lockTo: "Sunday", head: "Found in Jay's backpack",
      doc: () => `<div class="sticky">Presentations start at the bell. Late groups lose their slot. Your group counts on you! <br>— Ms. Harlan</div>`,
      ask: "Which lesson is hidden curriculum?",
      options: ["Be on time; don't let others down", "The history facts on slide 3", "How to make good-looking slides", "The topic of each slideshow"],
      hint: "Hidden = a habit, not a subject.", why: "A habit, not a subject." },
    { id: "c5", std: "Soc.9", short: "Reference = cultural capital", lockTo: "Next week", head: "New text on Jay's phone",
      doc: () => `<p class="text-from">💬 Mr. Ortiz · Grandma's church</p><p class="text-msg">You're great with people, Jay. Want me as a job reference?</p>`,
      ask: "Which idea is this?",
      options: ["Cultural capital: skills and connections for work", "Hidden curriculum: habits school teaches", "Peer group: friends who decide what's cool", "Mass media: apps that show what's normal"],
      hint: "Look at what Ortiz says and offers.", why: "Church gave Jay people skills and a job connection." },
    { id: "c6", std: "Soc.9", short: "Age 24: work + own family", lockTo: "Your report", head: "Dex: “Fine. Try Andre.”",
      doc: () => ageCard(AGES[2], true),
      ask: "Who pulls hardest on Andre at 24?",
      options: ["His job and the family he's raising", "His old high school friends", "His old high school teachers", "ClipLoop's alerts at midnight"],
      hint: "Count the pips on Andre's card.", why: "At 24, work and his own family fill his time." }
  ];

  const ENDINGS = {
    muted: { i: "🔕", t: "Muted", text: "Jay turned off ClipLoop alerts. You kept pushing where the feed couldn't win.", dex: "You lost our user." },
    crash: { i: "📉", t: "Big Numbers, Wrecked Kid", text: "Dex loves your numbers. Jay is exhausted, behind, and in trouble. The feed won hours, not his life.", dex: "Best numbers ever!" },
    benched: { i: "📦", t: "Benched", text: "Dex moves you to the help desk. Your pushes missed the times nobody else pulled.", dex: "Help desk. Monday." },
    smart: { i: "🧠", t: "Smart Feed", text: "You hit Dex's goal without wrecking Jay. The feed wins late at night, or by riding what friends want.", dex: "…Fine. Good work." }
  };

  const PROMPTS = [
    { id: "clash", short: "A round where two agents clashed", label: "1. Which agent beat the feed? Why?", stem: "On ___, ___ beat the feed because ___.", min: 60, newWords: 5,
      mustAll: [["family", "mom", "grandma", "peer", "friend", "squad", "chat", "marcus", "school", "teacher", "harlan", "nia", "religion", "church", "faith", "work", "job", "rosa", "boss", "manager"], ["because", "since", "so ", "reason"], ["time", "trust", "reward", "punish", "money", "$", "pay", "hour", "fun", "fit", "roast", "grade", "late", "night", "phone", "tradition", "spot", "cool", "group"]],
      mustMsg: "In answer 1, name who beat the feed (like Mom, Rosa, or Grandma), say why with “because,” and name the pull (time, trust, a reward, or a punishment)." },
    { id: "most", short: "Which agent shapes teens most", label: "2. Who shapes teens most today? Use Coleman or Pew.", stem: "___ shapes teens the most because ___. But ___ pushes back when ___.", min: 70, newWords: 6,
      mustAll: [["family", "parent", "mom", "grandma", "peer", "friend", "school", "teacher", "media", "feed", "phone", "app", "online", "social media", "religion", "church", "faith", "work", "job"], ["coleman", "athlete", "pew", "survey", "constantly", "half", "%", "percent", "in 10", "youtube", "jay", "volt", "shoe", "shift", "slide", "night", "pancake", "rosa", "grandma", "mia", "andre"]],
      mustMsg: "In answer 2, name an agent AND use evidence (Coleman, the Pew survey, or Jay's week)." }
  ];

  // Order of play. Strict: one step at a time.
  const STEPS = [
    { k: "day", d: 0 }, { k: "check", c: 0 },
    { k: "day", d: 1 }, { k: "check", c: 1 }, { k: "check", c: 2 },
    { k: "day", d: 2 }, { k: "check", c: 3 },
    { k: "day", d: 3 }, { k: "check", c: 4 },
    { k: "decide" }, { k: "check", c: 5 },
    { k: "ending" }, { k: "write" }
  ];
  const WEEK = ["Mon", "Tue", "Wed", "Sun", "Next week"];
  const weekOf = i => i <= 1 ? 0 : i <= 4 ? 1 : i <= 6 ? 2 : i <= 8 ? 3 : 4;

  // =====================================================================
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs && window.SiteLang.isEs());
  const tr = s => (window.SiteLang && window.SiteLang.t ? window.SiteLang.t(s) : s);
  const app = $("app");
  const fresh = () => ({ v: 2, name: "", step: -1, plans: {}, draft: null, mia: null, wrong: {}, done: {}, writing: {}, turnedIn: false });

  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 2 || !st.plans) st = fresh();
  let switched = false;
  try {
    const who = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (who && st.name && who !== st.name) { st = fresh(); if (window.classFirstTry) window.classFirstTry.reset(); localStorage.removeItem("writingcheck:" + location.pathname); switched = true; }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  // A different student on this Chromebook: reload once so nothing of the last student's stays in memory.
  if (switched) { save(); location.reload(); return; }

  // ---------- The rules ----------
  function getSlot(d, i, f) {
    let s = DAYS[d].slots[i];
    const a = s.alt && s.alt(f);
    if (a) s = Object.assign({}, s, a);
    const pips = s.pips.concat(s.extra ? s.extra(f) : []);
    return Object.assign({}, s, { pips, blocked: s.block ? s.block(f) : null });
  }
  const val = (x, e) => x === "p" ? e : x === "1+p" ? 1 + e : x;
  function resolveSlot(s, p, muted) {
    const rp = s.pips.length, e = muted ? 0 : p;
    const base = { p, e, rp, fp: s.blocked ? 0 : 1 + e, a: 0 };
    if (s.blocked) return Object.assign(base, { k: "blocked", win: "none", t: s.blockOut.t, w: 0, l: 0 });
    if (s.same) {
      if (e > 0) { const o = s.out.ride; return Object.assign(base, { k: "ride", win: s.ag, t: o.t, w: val(o.w, e), l: o.l, flag: o.flag }); }
      const o = s.out.quiet; return Object.assign(base, { k: "quiet", win: s.ag, t: o.t, w: o.w, l: o.l });
    }
    if (s.night) {
      const o = e === 0 ? NIGHT.quiet : NIGHT.by[e];
      return Object.assign(base, { k: e === 0 ? "quiet" : "win", win: "media", t: o.t, w: o.w, l: o.l });
    }
    if (1 + e > rp) { const o = s.out.win; return Object.assign(base, { k: "win", win: "media", t: o.t, w: val(o.w, e), l: o.l, flag: o.flag }); }
    if (e === 0) { const o = s.out.quiet; return Object.assign(base, { k: "quiet", win: s.ag, t: o.t, w: o.w, l: o.l, flag: o.flag }); }
    const o = s.out.lose; return Object.assign(base, { k: "lose", win: s.ag, t: o.t, w: o.w, l: o.l, a: e });
  }
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  // Replay the whole week from saved plans (so a refresh always lands in the same place).
  function simulate(upto) {
    const m = { watch: 0, life: LIFE0, annoy: 0, tokens: TOKENS };
    const f = {}; let muted = false; const out = [];
    for (let d = 0; d < Math.min(upto, DAYS.length); d++) {
      const plan = st.plans[d]; if (!plan) break;
      out[d] = [];
      DAYS[d].slots.forEach((_, i) => {
        const s = getSlot(d, i, f), p = plan[i] || 0;
        m.tokens -= p;
        const r = resolveSlot(s, p, muted);
        r.slot = s;
        m.watch = clamp(m.watch + r.w, 0, WMAX); m.life = clamp(m.life + r.l, 0, 10); m.annoy = clamp(m.annoy + r.a, 0, MUTE_AT);
        if (r.flag) f[r.flag] = true;
        if (!muted && m.annoy >= MUTE_AT) { muted = true; r.mutedNow = true; }
        out[d].push(r);
      });
    }
    if (upto > DAYS.length && st.mia != null) m.watch = clamp(m.watch + MIA[st.mia].w, 0, WMAX);
    return { m, f, muted, out };
  }
  function endingFor(S) { if (S.muted) return "muted"; if (S.m.life <= 3) return "crash"; if (S.m.watch < GOAL) return "benched"; return "smart"; }

  // ---------- Small pieces ----------
  const pipsHtml = pips => pips.map(([k, lab]) => `<span class="pip" title="${esc(PIPN[k])}"><span class="pi" aria-hidden="true">${PIP[k]}</span>${lab ? `<span>${esc(lab)}</span>` : `<span class="sr">${esc(PIPN[k])}</span>`}</span>`).join("");
  const LEGEND = `<p class="legend" aria-label="Pull key">${Object.keys(PIP).map(k => `<span><span aria-hidden="true">${PIP[k]}</span> <span>${esc(PIPN[k])}</span></span>`).join("")}</p>`;
  const agTag = ag => `<span class="atag"><span aria-hidden="true">${AG[ag].i}</span> <span>${esc(AG[ag].n)}</span></span>`;
  function fxHtml(r) {
    const parts = [];
    if (r.w) parts.push(`<span class="fx w">📈${r.w > 0 ? "+" : "−"}${Math.abs(r.w)}</span>`);
    if (r.l) parts.push(`<span class="fx ${r.l > 0 ? "up" : "down"}">💚${r.l > 0 ? "+" : "−"}${Math.abs(r.l)}</span>`);
    if (r.a) parts.push(`<span class="fx a">🔕+${r.a}</span>`);
    return parts.join("");
  }
  function ageCard(A, hot) {
    return `<div class="age${hot ? " hot" : ""}"><div class="ahead"><span class="af" aria-hidden="true">${A.face}</span><div><b>${esc(A.n)}</b><span>${esc(A.sub)}</span></div></div>
      ${A.rows.map(([ag, lab, pips]) => `<div class="arow ag-${ag}" style="--c:var(--${ag})"><span class="an">${agTag(ag)}${lab ? ` <span>${esc(lab)}</span>` : ""}</span><div class="pips big-pips">${pipsHtml(pips.map(k => [k, ""]))}</div></div>`).join("")}</div>`;
  }

  // ---------- HUD ----------
  let prev = null, dexLine = "";
  function dexSays(line) { if (line === dexLine) return; dexLine = line; const el = $("dexSay"); if (!el) return; el.textContent = line; $("dex").classList.remove("talk"); void $("dex").offsetWidth; $("dex").classList.add("talk"); }
  function hud(S, opts) {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    if (!show) { prev = null; return; }
    const m = S.m;
    $("watchFill").style.width = (m.watch / WMAX * 100) + "%";
    $("goalTick").style.left = (GOAL / WMAX * 100) + "%";
    $("watchNum").textContent = m.watch + " / " + GOAL;
    $("lifeFill").style.width = (m.life * 10) + "%";
    $("lifeNum").textContent = m.life + " / 10";
    $("mLife").classList.toggle("low", m.life <= 3);
    $("annoyDots").innerHTML = Array.from({ length: MUTE_AT }, (_, i) => `<i class="${i < m.annoy ? "on" : ""}"></i>`).join("");
    $("mAnnoy").classList.toggle("full", S.muted);
    const used = TOKENS - m.tokens;
    $("toks").innerHTML = Array.from({ length: TOKENS }, (_, i) => `<span class="${i < m.tokens ? "" : "used"}">⚡</span>`).join("");
    $("tokNum").textContent = m.tokens;
    if (prev) {
      [["watch", "mWatch"], ["life", "mLife"], ["annoy", "mAnnoy"], ["tokens", "mTok"]].forEach(([k, id]) => {
        if (prev[k] !== m[k]) { const el = $(id); el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
      });
    }
    prev = Object.assign({}, m);
    // Dex's mood follows the watch-time pace.
    const pace = [0, 2, 4, 6, 8, 8][Math.min(5, Object.keys(st.plans).length)];
    $("dexMood").textContent = (opts && opts.mood) || (S.muted ? "😡" : m.watch >= pace ? "😃" : m.watch >= pace - 2 ? "😐" : "😠");
    const wk = st.step >= STEPS.length ? 4 : weekOf(st.step);
    $("week").innerHTML = WEEK.map((w, i) => `<span class="${i === wk ? "on" : i < wk ? "done" : ""}">${esc(w)}</span>`).join("");
    void used;
  }

  // ---------- Intro ----------
  function intro() {
    app.innerHTML = `<section class="card intro">
      <div class="phone" aria-hidden="true"><span class="logo">▶ ClipLoop</span><span class="ping p1">👥 group chat</span><span class="ping p2">🏠 Mom</span><span class="jay">🧑</span><span class="ping p3">🍕 Rosa</span><span class="ping p4">⛪ Grandma</span><span class="play">⚡</span></div>
      <div>
        <p class="kick">Sociology · Unit 3 · Day 2</p>
        <h1><span>Push Wars</span></h1>
        <p class="hook">You run a video app's alerts. Can the feed beat a teen's whole life?</p>
        <ul class="chips"><li>⚡ <span>Push alerts into Jay's week</span></li><li>🥊 <span>Beat friends, family, work, school</span></li><li>⏱️ <span>About 25 minutes</span></li></ul>
        <p class="goalbox"><b>Today's goal:</b> <span>Explain which agents shape teens most, and why it changes.</span></p>
        <div class="namebox"><label for="nameBox" class="sr">Your name: first name + last initial</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}"></div>
        <p id="introMsg" class="msg" role="status"></p>
        <button type="button" class="go big" id="startBtn">Clock in at ClipLoop →</button>
        <p class="fine">Made-up app and people. Real research.</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 0; save(); render(true);
    };
  }

  // ---------- A day on the timeline ----------
  function dayView(d, animate) {
    const D = DAYS[d];
    const before = simulate(d);
    const done = !!st.plans[d];
    const after = done ? simulate(d + 1) : null;
    const n = D.slots.length;
    if (!done && (!st.draft || st.draft.d !== d)) { st.draft = { d, p: D.slots.map(() => 0) }; save(); }
    const draft = done ? st.plans[d] : st.draft.p;
    const tokensLeft = () => before.m.tokens - draft.reduce((a, b) => a + b, 0);

    const slotHtml = (i) => {
      const s = done ? after.out[d][i].slot : getSlot(d, i, before.f);
      const r = done ? after.out[d][i] : null;
      const p = draft[i] || 0;
      const rp = s.pips.length, fp = s.blocked ? 0 : 1 + (before.muted ? 0 : p);
      const fpx = done ? r.fp : fp;
      const share = fpx + rp ? Math.round(fpx / (fpx + rp) * 100) : 50;
      const cls = done ? (r.win === "media" ? " won-feed" : (r.k === "lose" ? " lost-push" : "")) : "";
      let feedSide;
      if (s.blocked) feedSide = `<p class="blocked">${esc(s.blocked)}</p>`;
      else if (done) feedSide = `<div class="feed"><span class="fl">📲 <span>Feed</span></span><span class="pip" title="Time" style="--c:var(--feed)"><span class="pi">⏱️</span></span><span class="sockets">${Array.from({ length: MAXP }, (_, k) => `<span class="sock${k < p ? " on" : ""}" aria-hidden="true">⚡</span>`).join("")}</span></div>`;
      else feedSide = `<div class="feed"><span class="fl">📲 <span>Feed</span></span><span class="pip" title="Time" style="--c:var(--feed)"><span class="pi">⏱️</span></span><span class="sockets">${Array.from({ length: MAXP }, (_, k) => `<button type="button" class="sock${k < p ? " on" : ""}" data-i="${i}" data-k="${k}" aria-label="⚡ ${k + 1}" aria-pressed="${k < p}"${before.muted ? " disabled" : ""}>⚡</button>`).join("")}</span></div>`;
      let res = "";
      if (done) {
        const stamp = r.win === "media" ? `<span class="stamp feedw">FEED WINS</span>` : r.k === "blocked" ? `<span class="stamp" style="--c:var(--family)">FAMILY WINS</span>` : `<span class="stamp">${esc(AG[r.win].s)}</span>`;
        res = `<div class="res" style="--dl:${animate ? (0.4 + i * 0.9) + "s" : "0s"}">${stamp}${r.k === "ride" ? `<span class="ride">📲 <span>The feed rode along.</span></span>` : ""}<p class="rt">${esc(r.t)}</p><div>${fxHtml(r)}</div>${r.mutedNow ? `<span class="mutedb">🔕 <span>Jay muted ClipLoop alerts!</span></span>` : ""}</div>`;
      }
      return `<div class="slot ag-${s.ag}${cls}" style="--c:var(--${s.ag});--dl:${animate ? (0.4 + i * 0.9) + "s" : "0s"}">
        <span class="stime">${esc(s.time)}</span>
        <div class="rival"><div class="rtop"><span class="rface" aria-hidden="true">${s.face}</span><div>${s.ag === "none" ? "" : agTag(s.ag)}<span class="rwho">${esc(s.who)}</span></div></div>
          ${done ? "" : `<p class="bub">${esc(s.line)}</p>`}
          ${rp ? `<div class="pips">${pipsHtml(s.pips)}</div>` : ""}
          ${s.same && !done ? `<p class="same">🔗 <span>Wants what Dex wants</span></p>` : ""}</div>
        ${s.blocked ? "" : `<div class="vsrow"><span class="pw f" title="Feed">${done ? r.fp : fp}<small aria-hidden="true">📲</small></span><span class="vs">VS</span><span class="pw r" title="${esc(AG[s.ag].n)}">${rp}<small aria-hidden="true">${s.face}</small></span></div>${(done ? r.fp : fp) === rp && rp > 0 && !s.same ? `<p class="tie">🤝 <span>Tie? They win.</span></p>` : ""}
        <div class="tug" aria-hidden="true"><span style="width:${animate ? 50 : share}%" data-w="${share}"></span></div>`}
        ${feedSide}${res}</div>`;
    };

    app.innerHTML = `<section class="${animate ? "anim" : ""}">
      <div class="dayhead"><span class="di" aria-hidden="true">${D.icon}</span><div><p class="dn">${esc(D.name)}</p><h2>${esc(D.title)}</h2>${done ? "" : `<p class="setup">${esc(D.setup)}</p>`}</div></div>
      ${!done && d === 0 ? `<ul class="how"><li>⚡ <span>Tap to add pushes</span></li><li>💪 <span>More power than them wins</span></li><li>🔕 <span>Lost pushes annoy Jay</span></li></ul>` : ""}
      ${done ? "" : LEGEND}
      <div class="timeline" style="--n:${n}">${D.slots.map((_, i) => slotHtml(i)).join("")}</div>
      <div id="dayEnd"></div></section>`;

    if (done && animate) app.querySelectorAll(".tug span").forEach((t, i) => setTimeout(() => { t.style.width = t.dataset.w + "%"; }, 150 + i * 900));
    if (!done) {
      const needPush = !before.muted && before.m.tokens > 0 && !draft.some(x => x > 0);
      $("dayEnd").innerHTML = `<div class="runrow"><button type="button" class="go big" id="runBtn"${needPush ? " disabled" : ""}>${esc(D.run)}</button></div><p class="msg center" id="dayMsg" role="status">${needPush ? "Place at least 1 ⚡ push first." : ""}</p>`;
      app.querySelectorAll(".sock[data-i]").forEach(b => b.onclick = () => {
        const i = +b.dataset.i, k = +b.dataset.k;
        const cur = st.draft.p[i];
        let next = cur === k + 1 ? k : k + 1;
        const room = tokensLeft() + cur;
        const out = next > room;
        if (out) next = Math.min(next, room);
        st.draft.p[i] = next; save();
        const y = window.scrollY; dayView(d, false); window.scrollTo(0, y);
        hudDraft(before, st.draft.p);
        const again = app.querySelector('.sock[data-i="' + i + '"][data-k="' + k + '"]'); if (again) again.focus({ preventScroll: true });
        if (out) { $("dayMsg").textContent = "Out of pushes for the week."; $("dayMsg").className = "msg bad center"; }
      });
      $("runBtn").onclick = () => {
        if (!before.muted && before.m.tokens > 0 && !st.draft.p.some(x => x > 0)) return;
        st.plans[d] = st.draft.p.slice(); st.draft = null; save();
        dayView(d, true);
        const S = simulate(d + 1);
        const total = 0.4 + n * 0.9;
        setTimeout(() => { hud(S); dexSays(dexAfterDay(S, d)); }, total * 1000);
      };
      hudDraft(before, draft);
      dexSays(before.muted ? "MUTED?! Fix this." : D.dexPre);
    } else {
      const S = after;
      const dl = animate ? (0.5 + n * 0.9) + "s" : "0s";
      $("dayEnd").innerHTML = `<div class="after" style="--dl:${dl}"><p class="reveal"><span aria-hidden="true">💡</span> <span class="rv">${D.reveal}</span></p>${D.fact ? `<p class="src center">📌 <span>${esc(D.fact)}</span></p>` : ""}
        <div class="runrow"><button type="button" class="go" id="nextBtn">Next →</button></div></div>`;
      $("nextBtn").onclick = () => next();
      if (!animate) { hud(S); dexSays(dexAfterDay(S, d)); }
    }
  }
  function hudDraft(before, draft) {
    const S = { m: Object.assign({}, before.m), muted: before.muted };
    S.m.tokens = before.m.tokens - draft.reduce((a, b) => a + b, 0);
    hud(S);
  }
  function dexAfterDay(S, d) {
    if (S.muted) return "MUTED?! Unbelievable.";
    const wins = S.out[d].filter(r => r.win === "media" && r.e > 0).length;
    return wins ? "Numbers up. More tomorrow." : "We lost every slot?!";
  }

  // ---------- Evidence check (Data Desk) ----------
  let locked = false;
  function checkView(c) {
    const C = CHECKS[c];
    const S = simulate(9);
    hud(S);
    dexSays("Crack this file.");
    const isDone = !!st.done[C.id];
    app.innerHTML = `<section class="card">
      <div class="deskhead"><span class="lock${isDone ? " open" : ""}" id="lockIc" aria-hidden="true">${isDone ? "🔓" : "🔒"}</span><div><p class="dn">📁 <span>Data Desk</span> · <span>${esc(C.lockTo)}</span></p><h2>${esc(C.head)}</h2></div></div>
      <div class="desk"><div>${C.doc()}</div>
      <div><p class="ask">${esc(C.ask)}</p><div id="ansHost"></div><p class="msg" id="ckMsg" aria-live="polite"></p><div id="ckEnd"></div></div></div></section>`;
    const host = $("ansHost"), msg = $("ckMsg");
    const finish = () => {
      host.innerHTML = `<div class="got"><span class="stamp">UNLOCKED</span><span class="anscheck">✓ ${esc(C.options[0])}</span></div><p class="why">${esc(C.why)}</p>`;
      msg.textContent = ""; msg.className = "msg";
      $("lockIc").textContent = "🔓"; $("lockIc").classList.add("open");
      $("ckEnd").innerHTML = `<button type="button" class="go" id="nextBtn">Next →</button>`;
      $("nextBtn").onclick = () => next();
    };
    if (isDone) return finish();
    function draw() {
      host.innerHTML = `<div class="ans"></div>`;
      const box = host.firstChild;
      shuffle(C.options.map((t, n) => ({ t, n }))).forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) {
            st.done[C.id] = true; if (window.classFirstTry) window.classFirstTry.right(C.id); save(); finish();
          } else {
            st.wrong[C.id] = (st.wrong[C.id] || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
            locked = true; b.classList.add("nope");
            box.querySelectorAll("button").forEach(x => x.disabled = true);
            let left = LOCK;
            const tick = () => {
              if (!host.isConnected) { locked = false; return; }
              msg.textContent = "Not quite. " + C.hint + " The choices will mix up. Try again in " + left + "…"; msg.className = "msg bad";
              if (left-- <= 0) { locked = false; msg.textContent = "Not quite. " + C.hint + " Try again."; msg.className = "msg"; draw(); return; }
              setTimeout(tick, 1000);
            };
            tick();
          }
        };
        box.appendChild(b);
      });
    }
    draw();
  }

  // ---------- Life course board + Dex's plan ----------
  function decideView() {
    const S = simulate(9);
    hud(S, st.mia != null ? { mood: st.mia === 0 ? "😡" : "😠" } : null);
    app.innerHTML = `<section>
      <div class="dayhead"><span class="di" aria-hidden="true">📈</span><div><p class="dn">Next week</p><h2>Dex Wants New Users</h2><p class="setup">Who pulls hardest at each age?</p></div></div>
      <div class="ages">${AGES.map(A => ageCard(A, A.id === "mia")).join("")}</div>
      <div id="decHost"></div></section>`;
    const host = $("decHost");
    if (st.mia == null) {
      dexSays("Autoplay for 8-year-olds. Nobody checks age.");
      host.innerHTML = `<p class="center"><span class="factline">📌 <span>Real: most social apps require age 13+.</span></span></p>
        <div class="choices">${shuffle(MIA.map((M, i) => i)).map(i => `<button type="button" class="pick" data-i="${i}"><span class="pi" aria-hidden="true">${MIA[i].i}</span><b>${esc(MIA[i].t)}</b><span class="s">${esc(MIA[i].s)}</span></button>`).join("")}</div>`;
      host.querySelectorAll(".pick").forEach(b => b.onclick = () => { st.mia = +b.dataset.i; save(); decideView(); });
    } else {
      const M = MIA[st.mia];
      dexSays(M.dex);
      host.innerHTML = `<div class="decided anim"><span class="stamp" style="--c:var(--${M.ag === "none" ? "you" : M.ag})">${esc(M.stamp)}</span><p class="rt">${esc(M.res)}</p><div>${M.w ? `<span class="fx w">📈−${Math.abs(M.w)}</span>` : ""}</div></div>
        <p class="reveal"><span aria-hidden="true">💡</span> <span class="rv">${MIA_REVEAL}</span></p>
        <div class="runrow"><button type="button" class="go" id="nextBtn">Next →</button></div>`;
      $("nextBtn").onclick = () => next();
    }
  }

  // ---------- Ending ----------
  const fxText = r => [r.w ? "📈" + (r.w > 0 ? "+" : "−") + Math.abs(r.w) : "", r.l ? "💚" + (r.l > 0 ? "+" : "−") + Math.abs(r.l) : "", r.a ? "🔕+" + r.a : ""].filter(Boolean).join(" ");
  function trailLines(S, key) {
    const lines = [];
    S.out.forEach((day, d) => day.forEach((r, i) => {
      const s = r.slot, D = DAYS[d];
      const winner = r.win === "media" ? "Feed" : AG[r.win] ? AG[r.win].n : "";
      const strongLeft = key === "smart" && r.p === 0 && r.rp >= 4;
      const missed = key === "benched" && r.p === 0 && (s.night || r.rp <= 2) && r.k !== "blocked";
      if (r.p > 0 || strongLeft || missed)
        lines.push({ txt: D.tag + " " + s.time + ": ⚡" + r.p + " → " + winner + " won", ic: fxText(r) });
    }));
    const keep = lines.slice(0, 6);
    if (st.mia != null) keep.push({ txt: MIA[st.mia].trail, ic: "" });
    return keep;
  }
  function endingView() {
    const S = simulate(9);
    const key = endingFor(S), E = ENDINGS[key];
    hud(S, { mood: key === "crash" ? "🤑" : key === "smart" ? "😏" : "😡" });
    dexSays(E.dex);
    app.innerHTML = `<section class="card endc e-${key}">
      <div class="endi" aria-hidden="true">${E.i}</div>
      <div class="end-stamp">${esc(E.t)}</div>
      <p class="etext">${esc(E.text)}</p>
      <div class="endmeters"><span>📈 ${S.m.watch} / ${GOAL}</span><span>💚 ${S.m.life} / 10</span><span>🔕 ${S.m.annoy} / ${MUTE_AT}</span></div>
      <div class="caused"><h3>Caused by:</h3><ul>${trailLines(S, key).map(x => `<li><span>${esc(x.txt)}</span> <span aria-hidden="true">${x.ic}</span></li>`).join("") || `<li><span>No pushes all week.</span></li>`}</ul></div>
      <p class="endall">1 of 4 endings.</p>
      <button type="button" class="go big" id="nextBtn">Write your report to Dex →</button></section>`;
    $("nextBtn").onclick = () => next();
  }

  // ---------- Report + turn in ----------
  function writeView() {
    const S = simulate(9);
    hud(S);
    dexSays("Report. On my desk.");
    app.innerHTML = `<section class="card memo"><div class="mhead"><span class="mi" aria-hidden="true">📝</span><div><p class="kick">ClipLoop · For You team</p><h2>Your report to Dex</h2></div></div>
      <p class="fine">1–2 sentences each.</p>
      ${PROMPTS.map(p => `<label for="w_${p.id}">${esc(p.label)}</label><p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="3">${esc(st.writing[p.id] || "")}</textarea>`).join("")}
      <button type="button" class="go big" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in" : ""}</p></section>`;
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
      const txt = plain(v);
      if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(txt)))) { msg.textContent = p.mustMsg; msg.className = "msg bad"; box.focus(); return; }
    }
    const S = simulate(9);
    const key = endingFor(S);
    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = CHECKS.filter(c => !st.wrong[c.id]).length + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECKS.forEach(c => { answers[c.short] = c.options[0] + (st.wrong[c.id] ? " (after " + st.wrong[c.id] + " wrong " + (st.wrong[c.id] === 1 ? "try" : "tries") + ")" : " (first try)"); });
    DAYS.forEach((D, d) => {
      if (!S.out[d]) return;
      answers["Choice · " + D.name + " pushes"] = S.out[d].map(r => r.slot.time + " " + r.slot.who + " ⚡" + r.p + " → " + (r.win === "media" ? "Feed" : r.k === "blocked" ? "Family" : AG[r.win].n) + " won").join(" · ");
    });
    if (st.mia != null) answers["Choice · Dex's plan for Mia"] = MIA[st.mia].t + " (" + MIA[st.mia].s + ")";
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    answers["Ending"] = ENDINGS[key].t;
    answers["Caused by"] = trailLines(S, key).map(x => x.txt).join("; ") || "No pushes all week";
    answers["Meters at end"] = "Watch time " + S.m.watch + " (goal " + GOAL + ") · Jay's life " + S.m.life + " of 10 · Annoyed " + S.m.annoy + " of " + MUTE_AT + " · Pushes used " + (TOKENS - S.m.tokens) + " of " + TOKENS;
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. You're done!"; msg.className = "msg good";
      $("sendBtn").textContent = "Turned in ✓"; $("sendBtn").disabled = false;
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------- Router ----------
  function next() { st.step = Math.min(st.step + 1, STEPS.length - 1); save(); render(true); }
  let first = true;
  function render(scroll) {
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false; locked = false;
    if (st.step < 0) { hud({ m: { watch: 0, life: LIFE0, annoy: 0, tokens: TOKENS } }); return intro(); }
    const s = STEPS[Math.min(st.step, STEPS.length - 1)];
    if (s.k === "day") dayView(s.d, false);
    else if (s.k === "check") checkView(s.c);
    else if (s.k === "decide") decideView();
    else if (s.k === "ending") endingView();
    else writeView();
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); prev = null; render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0 && $("welcome")) {
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " — you're on step " + (Math.min(st.step, STEPS.length - 1) + 1) + " of " + STEPS.length + ".")}</span> <button type="button" class="notyou" id="notYouBtn">Not you? Start fresh</button>`;
    $("welcome").hidden = false;
    // Shared Chromebooks: a different student wipes the saved game, writing, and saved name on this device, then reloads clean.
    $("notYouBtn").onclick = () => {
      st = fresh();
      if (window.classFirstTry) window.classFirstTry.reset();
      try { localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      save(); location.reload();
    };
  }
  render();
})();
