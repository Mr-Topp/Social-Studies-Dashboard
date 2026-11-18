// =====================================================================
//  PREVIEW · THE REVIEW BOARD: WHO ELSE FOUGHT?  (U.S. History Unit 4 · Day 3)
//  Junior curator pitches an exhibit to a three-person review board.
//  Room 1 only (the Delano grape strike) — the "first 5 minutes" preview.
//  Board support (0–5 each): historian (accuracy), donor (will visitors care),
//  community advisor (are the people who did the work in the room).
//  Wrong label tries cost the historian's support. Calls move all three.
//  No turn-in from the preview. Live page (../u4-d3-who-else/) is untouched.
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u4-d3-review-board-preview-v1";
  const LOCK = 5;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // ---------------- The board ----------------
  const BOARD = [
    { k: "hist", mono: "RA", name: "Dr. Ruth Adler", role: "Historian", wants: "Is it true, and is it the whole story?" },
    { k: "donor", mono: "GW", name: "Grant Whitfield", role: "Lead donor", wants: "Will a visitor care in thirty seconds?" },
    { k: "comm", mono: "TO", name: "Teresa Ocampo", role: "Community advisor", wants: "Are the people who did the work in the room?" }
  ];
  const B = k => BOARD.find(b => b.k === k);
  const START = 2, YES_AT = 3, MAX = 5;

  // ---------------- Photos (real, archival) ----------------
  const LA = "Los Angeles Times Photographic Archive, UCLA Library (CC BY 4.0)";
  const PH = {
    strikers: { src: "img/r1-strikers-1965.jpg", alt: "Grape strikers holding picket signs along a dirt road beside a vineyard, 1965",
      credit: "Photo: Frank Q. Brown. " + LA },
    pickets: { src: "img/r1-pickets-encino-1965.jpg", alt: "Picketers with signs reading Don't Buy Delano Grapes outside a grocery store; a man in a suit points in the foreground",
      credit: "Photo: Los Angeles Times. " + LA },
    contract: { src: "img/r1-contract-1970.jpg", alt: "César Chávez, seated, shakes hands with grower John Giumarra Jr. at a table of microphones, with priests and workers standing behind",
      credit: "Photo: John Malmin. " + LA },
    march: { src: "img/r1-chavez-itliong-march-1965.jpg", alt: "Newspaper photo of men marching with picket signs, including AWOC signs",
      credit: "El Malcriado (the farmworkers' newspaper), 1965. Public domain." },
    huerta: { src: "img/r1-huerta-huelga-1965.jpg", alt: "Dolores Huerta holding a sign that reads HUELGA above her head",
      credit: "El Malcriado (the farmworkers' newspaper), 1965. Public domain." }
  };
  const frame = (p, extra) => `<figure class="frame zoomable" style="margin:0"><img src="${p.src}" alt="${esc(p.alt)}" data-zoom="1">${extra || ""}</figure>`;
  const label = (t, lines, credit) => `<div class="label"><p class="lt">${t}</p>${lines.map(l => `<p>${l}</p>`).join("")}<p class="cr">${esc(credit)}</p><p class="zh">Click the photo to see it bigger.</p></div>`;

  // ---------------- Steps (Room 1: the Delano grape strike) ----------------
  // check: options[0] is right; miss[i] explains options[i+1].
  // call: each card moves board support (fx) and every member reacts.
  const STEPS = [
    { id: "c1", type: "check", std: "US.44", short: "Who struck and why",
      kicker: "Room 1 · Opening wall",
      wall: () => frame(PH.strikers) + label("Strikers outside a vineyard near Delano, California · October 1965",
        ["Grape pickers earned about <b>$1.25 an hour</b>. Many fields had no toilets or clean water.",
         "On Sept. 8, <b>Filipino American</b> workers led by Larry Itliong walked off the job. On Sept. 16, <b>Mexican American</b> workers led by César Chávez joined the <b>strike</b>."], PH.strikers.credit),
      who: "hist", line: "“Your opening sentence sets up the whole room. Read the label. Get it right.”",
      ask: "Which opening sentence is accurate?",
      options: ["Filipino and Mexican American pickers struck together for better pay.",
                "Mexican American pickers struck, and Filipino pickers took their jobs.",
                "Pickers struck because growers planned to replace them with machines.",
                "Pickers struck after a new state law cut their pay in half."],
      miss: ["Reread the dates. Filipino workers walked out first, and Mexican American workers joined them.",
             "The label never mentions machines. It names pay and working conditions.",
             "The label never mentions a law. Look at what they earned and how they worked."],
      reveal: "<b>Strike</b>: workers refuse to work until things change. This one lasted five years." },

    { id: "c2", type: "check", std: "US.44", short: "Boycott: pickets at a store",
      kicker: "Room 1 · Second wall",
      wall: () => frame(PH.pickets) + label("Pickets outside a grocery store in Encino, a Los Angeles suburb · December 1965",
        ["The signs read <b>“DON'T BUY DELANO GRAPES.”</b> This store is about 140 miles from the vineyards. TV star Steve Allen (front) joined the line."], PH.pickets.credit),
      who: "donor", line: "“A grocery store? Visitors came to see a farm fight. Tell me why this photo earns a wall.”",
      ask: "Why were strikers picketing a store so far from the fields?",
      options: ["So shoppers would stop buying grapes and growers would lose money.",
                "So the store would hire the strikers until the strike was over.",
                "So the store would pay the growers more for every box of grapes.",
                "So city families would drive out and help pick the grapes."],
      miss: ["Look at the signs. They don't ask for jobs. They tell shoppers what to do.",
             "Paying growers more would help the growers, not the workers. Read the signs.",
             "The signs say DON'T BUY. Nothing asks people to come pick."],
      reveal: "<b>Boycott</b>: refusing to buy something to pressure a business. Millions of Americans stopped buying grapes." },

    { id: "e1", type: "call", short: "Entrance banner",
      kicker: "Board decision · The entrance banner",
      wall: () => `<div class="pair">
          <div>${frame(PH.march)}<p class="plab"><b>Photo A.</b> December 1965: union leader Walter Reuther marches through Delano with <b>César Chávez</b> and <b>Larry Itliong</b>, heads of the two striking unions.</p></div>
          <div>${frame(PH.huerta)}<p class="plab"><b>Photo B.</b> 1965: <b>Dolores Huerta</b>, co-founder of Chávez's union, holds a sign: <b>HUELGA</b> (Spanish for “strike”).</p></div>
        </div><p class="plab" style="max-width:640px;text-align:center">${esc(PH.march.credit)}</p>`,
      who: "donor", line: "“The banner is the first thing people see. One famous face sells tickets. Put Chávez up there, alone.”",
      ask: "What goes on the entrance banner?",
      cards: [
        { t: "Photo A: Chávez and Itliong marching together", line: "Shows both unions, Mexican and Filipino American, side by side.",
          fx: { hist: 2, comm: 1, donor: -1 }, cause: "Banner: Chávez and Itliong together",
          react: { hist: "Accurate. The strike started with Itliong's workers.", donor: "Most visitors won't know who Itliong is.", comm: "Good. Filipino workers usually get left out." } },
        { t: "Photo B: Dolores Huerta holding HUELGA", line: "A bold, simple image of a key leader.",
          fx: { comm: 2, donor: 1, hist: -1 }, cause: "Banner: Huerta and HUELGA",
          react: { hist: "Strong image, but the Filipino workers who struck first vanish.", donor: "That sign grabs you. I'll take it.", comm: "Yes. Women led this too." } },
        { t: "A solo portrait of César Chávez", line: "The name most visitors already know.",
          fx: { donor: 2, hist: -2, comm: -1 }, cause: "Banner: Chávez alone",
          react: { hist: "This tells visitors one man did it. He didn't.", donor: "Perfect. A face people recognize.", comm: "Thousands of workers struck. Where are they?" } }
      ],
      reveal: "Big movements are rarely one person. This strike was <b>two unions</b> and thousands of workers, plus shoppers across the country." },

    { id: "c3", type: "check", std: "US.44", short: "1970: union contracts",
      kicker: "Room 1 · Closing wall",
      wall: () => frame(PH.contract) + label("Delano, California · July 1970",
        ["César Chávez (seated, left) shakes hands with grower John Giumarra Jr. That day, <b>26 grape growers</b> signed <b>union contracts</b>: written deals on pay and working conditions."], PH.contract.credit),
      who: "hist", line: "“A volunteer drafted four labels for this photo. Only one survives my fact-check. Which?”",
      ask: "Which label is accurate?",
      options: ["1970: After five years of strikes and boycotts, growers signed union contracts.",
                "1970: A federal court ordered growers to raise pay and end the strike.",
                "1970: Congress passed a law forcing growers to sign union contracts.",
                "1970: Growers sold their vineyards to the workers who had gone on strike."],
      miss: ["No court. Growers signed the deals themselves. Why would they?",
             "No new law. The growers signed. What pressure had been on them?",
             "They signed contracts, not sales. Reread the label."],
      reveal: "<b>Union contract</b>: a written deal on pay and conditions. Lost sales from the boycott pushed growers to sign." },

    { id: "vote", type: "vote", short: "Room 1 board vote", kicker: "Board vote · Room 1" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");
  const CALLS = STEPS.filter(s => s.type === "call");
  const WORDS = [["Strike", "workers refuse to work until things change"], ["Boycott", "refusing to buy something to pressure a business"], ["Picket", "standing outside a place with signs to protest"], ["Union", "a group of workers who bargain together"], ["Union contract", "a written deal on pay and working conditions"]];

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, wrong: {}, done: {}, picks: {} });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.done) st = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  function support() {
    const s = { hist: START, donor: START, comm: START };
    CHECKS.forEach(c => { if (st.done[c.id] && !st.wrong[c.id]) s.hist += 1; else if (st.wrong[c.id]) s.hist -= 1; });
    CALLS.forEach(c => { const p = st.picks[c.id]; if (p != null) Object.entries(c.cards[p].fx).forEach(([k, v]) => s[k] += v); });
    Object.keys(s).forEach(k => s[k] = Math.max(0, Math.min(MAX, s[k])));
    return s;
  }

  // ---------------- Top bar ----------------
  function bar(prev) {
    $("bar").hidden = st.step < 0;
    if (st.step < 0) return;
    const s = support();
    $("roomName").textContent = "Room 1 · The Grape Strike, 1965–1970";
    $("stepN").textContent = "Step " + (Math.min(st.step, TOTAL - 1) + 1) + " of " + TOTAL;
    $("board").innerHTML = BOARD.map(b => `<div class="seat" data-k="${b.k}" title="${esc(b.name)} (${b.role}): ${esc(b.wants)}"><span class="mono">${b.mono}</span><span class="st"><b>${esc(b.name)}</b><small>${b.role}</small><span class="pips" aria-label="Support ${s[b.k]} of ${MAX}">${Array.from({ length: MAX }, (_, i) => `<i class="${i < s[b.k] ? "on" : ""}"></i>`).join("")}</span></span></div>`).join("");
    if (prev) BOARD.forEach(b => {
      const d = s[b.k] - prev[b.k]; if (!d) return;
      const seat = document.querySelector(`.seat[data-k="${b.k}"]`);
      seat.classList.add(d > 0 ? "flash-up" : "flash-down");
      seat.insertAdjacentHTML("beforeend", `<span class="delta ${d > 0 ? "up" : "down"}">${d > 0 ? "+" : "−"}${Math.abs(d)}</span>`);
      setTimeout(() => seat.classList.remove("flash-up", "flash-down"), 1400);
    });
  }

  // ---------------- Screens ----------------
  const app = $("app");
  function shell(step, panelHtml) {
    const who = step.who ? B(step.who) : null;
    app.innerHTML = `<div class="stage"><div class="wallside${step.type === "call" ? " col" : ""}">${step.wall ? step.wall() : ""}</div>
      <div class="panel"><div class="tools"><button type="button" class="wordbtn" id="wordBtn" aria-expanded="false">Word help</button></div><div id="wordBox"></div>
      <p class="kick">${esc(step.kicker)}</p>
      ${who ? `<div class="quote"><span class="mono" style="background:${monoColor(who.k)}">${who.mono}</span><p>${esc(step.line)}<small>${esc(who.name)}, ${who.role.toLowerCase()}</small></p></div>` : ""}
      ${panelHtml}</div></div>`;
    $("wordBtn").onclick = () => {
      const box = $("wordBox"), open = !!box.innerHTML;
      box.innerHTML = open ? "" : `<div class="words">${WORDS.map(w => `<p><b>${w[0]}</b>: ${w[1]}</p>`).join("")}</div>`;
      $("wordBtn").setAttribute("aria-expanded", String(!open));
    };
  }
  const monoColor = k => ({ hist: "#3d4a5c", donor: "#7d2a21", comm: "#4d6340" }[k]);
  function goBtn(text) {
    const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.id = "nextBtn"; b.textContent = text;
    b.onclick = () => { st.step++; save(); render(); };
    return b;
  }
  const nextText = step => { const nx = STEPS[STEPS.indexOf(step) + 1]; return !nx ? "" : nx.type === "vote" ? "Send Room 1 to the board →" : "Next wall →"; };

  // ---- Title ----
  function title() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title">
      <div class="gallery" aria-hidden="true">
        <div class="frame"><img src="${PH.huerta.src}" alt=""></div>
        <div class="frame"><img src="${PH.strikers.src}" alt=""></div>
        <div class="frame"><img src="${PH.march.src}" alt=""></div>
      </div>
      <div>
        <p class="tk">U.S. History · Unit 4 · Day 3</p>
        <h1>Who Else Fought?</h1>
        <p class="sub">An exhibit proposal: equal rights movements, 1965–1982</p>
        <p class="hook">You're a junior curator. The museum builds your exhibit only if the <b>review board</b> signs off.</p>
        <ul class="steps3">
          <li><b class="n">1</b><span>Read the real photos and pick accurate labels.</span></li>
          <li><b class="n">2</b><span>Make the calls the board argues about.</span></li>
          <li><b class="n">3</b><span>Win the board's vote, room by room.</span></li>
        </ul>
        <p class="meta">Today's goal: how farmworkers, Native Americans, and women fought for equal rights, and how that compares to the Black civil rights movement. · About 25 minutes.</p>
        <label class="nl" for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go" id="startBtn">Meet the board</button></div>
        <p class="introMsg" id="introMsg" role="status"></p>
        <p class="fine">The museum and board members are made up. Every photo, date, and event is real.</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("nameBox").focus(); return; }
      st = fresh(); st.name = fixed; st.step = 0; save(); render();
    };
    $("nameBox").addEventListener("keydown", e => { if (e.key === "Enter") $("startBtn").click(); });
  }

  // ---- Check (pick the accurate label / reading) ----
  let locked = false;
  function check(step) {
    shell(step, `<p class="ask">${esc(step.ask)}</p><div class="opts" id="opts"></div><p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) return solved(step);
    draw(step);
  }
  function draw(step) {
    const area = $("opts"); if (!area) return;
    const before = [...area.children].map(x => x.textContent).join("|");
    let order = shuffle(step.options.map((t, n) => ({ t, n })));
    for (let k = 0; k < 8 && before && order.map(o => o.t).join("|") === before; k++) order = shuffle(order);
    area.replaceChildren();
    order.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "opt"; b.textContent = o.t;
      b.onclick = () => pick(step, o, b);
      area.appendChild(b);
    });
  }
  function pick(step, o, btn) {
    if (locked) return;
    const prev = support();
    if (o.n === 0) {
      btn.classList.add("right");
      st.done[step.id] = true; save(); bar(prev);
      setTimeout(() => solved(step), 400);
      return;
    }
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1; save(); bar(prev);
    const why = step.miss[o.n - 1];
    const msg = $("qmsg");
    $("opts").querySelectorAll("button").forEach(x => x.disabled = true);
    locked = true;
    let left = LOCK;
    const tick = () => {
      if (!document.body.contains(msg)) { locked = false; return; }
      msg.className = "msg bad";
      msg.innerHTML = `Dr. Adler sends it back. ${esc(why)}<span class="cd">${left}</span>`;
      if (left-- <= 0) { locked = false; msg.innerHTML = `Dr. Adler sends it back. ${esc(why)} Try again.`; draw(step); return; }
      setTimeout(tick, 1000);
    };
    tick();
  }
  function solved(step) {
    const w = st.wrong[step.id];
    $("opts").outerHTML = `<div class="done"><p class="ans">${esc(step.options[0])}</p><p>${w ? "Approved after a revision." : "Approved on the first draft. Dr. Adler's trust goes up."}</p></div>`;
    $("qmsg").outerHTML = `<p class="idea">${step.reveal}</p>`;
    $("after").appendChild(goBtn(nextText(step)));
  }

  // ---- Call (board argues; every option costs someone) ----
  function call(step) {
    shell(step, `<p class="ask">${esc(step.ask)}</p><div id="cbox"></div><div id="after"></div>`);
    if (st.picks[step.id] != null) return called(step);
    const order = shuffle(step.cards.map((c, i) => i));
    $("cbox").innerHTML = `<div class="calls">${order.map((i, n) => { const c = step.cards[i]; return `<button type="button" class="call" data-i="${i}"><span class="n">${"ABC"[n]}</span><b>${esc(c.t)}</b><span>${esc(c.line)}</span></button>`; }).join("")}</div>`;
    $("cbox").querySelectorAll(".call").forEach(b => b.onclick = () => {
      const prev = support();
      st.picks[step.id] = +b.dataset.i; save(); bar(prev); called(step);
    });
  }
  function called(step) {
    const c = step.cards[st.picks[step.id]];
    $("cbox").innerHTML = `<div class="done"><p class="ans">${esc(c.t)}</p></div>
      <ul class="reacts">${BOARD.map(b => { const d = c.fx[b.k] || 0; return `<li><span class="mono" style="background:${monoColor(b.k)}">${b.mono}</span><span>${esc(c.react[b.k])}</span>${d ? `<em class="${d > 0 ? "up" : "down"}">${d > 0 ? "+" : "−"}${Math.abs(d)}</em>` : ""}</li>`; }).join("")}</ul>
      <p class="idea">${step.reveal}</p>`;
    $("after").appendChild(goBtn(nextText(step)));
  }

  // ---- Room vote ----
  function vote(step) {
    const s = support();
    const yes = BOARD.filter(b => s[b.k] >= YES_AT).length;
    const say = {
      hist: s.hist >= YES_AT ? "The labels hold up. I can defend this room to other historians." : "Too many shortcuts. I can't put my name on this yet.",
      donor: s.donor >= YES_AT ? "People will stop and look. I'll keep funding it." : "Accurate, sure. But I'm worried visitors walk right past.",
      comm: s.comm >= YES_AT ? "The workers who did this are in the room. Thank you." : "This still leaves out people who did the work."
    };
    const causes = [];
    CALLS.forEach(c => { const p = st.picks[c.id]; if (p != null) causes.push(c.cards[p].cause); });
    const w = CHECKS.reduce((a, c) => a + (st.wrong[c.id] ? 1 : 0), 0);
    causes.push(w ? `${w} label${w > 1 ? "s" : ""} sent back by the historian` : "Every label approved on the first draft");
    app.innerHTML = `<div class="stage"><div class="wallside col"><div class="pair">${frame(PH.strikers)}${frame(PH.contract)}</div>
        <p class="plab" style="max-width:640px;text-align:center">From strike (1965) to contract (1970). ${esc(LA)}.</p></div>
      <div class="panel"><p class="kick">${esc(step.kicker)}</p>
        <p class="ask">${yes >= 2 ? "Room 1 is approved, " + yes + " to " + (3 - yes) + "." : "Room 1 is sent back for changes, " + yes + " to " + (3 - yes) + "."}</p>
        <div class="votes">${BOARD.map(b => { const ok = s[b.k] >= YES_AT; return `<div class="vote"><span class="mono" style="background:${monoColor(b.k)}">${b.mono}</span><span class="say">“${esc(say[b.k])}”<small>${esc(b.name)}, ${b.role.toLowerCase()}</small></span><span class="stamp ${ok ? "yes" : "no"}">${ok ? "YES" : "NO"}</span></div>`; }).join("")}</div>
        <p class="kick" style="margin-top:10px">Caused by</p><ul class="cause">${causes.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
        <div class="preview-end"><p><b>Teacher preview ends here.</b></p><p>Full build adds: the 1968 East L.A. school walkouts (Room 1) · Room 2 Red Power (Alcatraz, Wounded Knee) · Room 3 the women's movement (NOW, Title IX, ERA vs. STOP ERA) · the Comparison Wall · a test-prep round · two written label answers + turn-in.</p></div>
      </div></div>`;
  }

  // ---------------- Router ----------------
  function render() {
    locked = false;
    document.body.classList.toggle("on-title", st.step < 0);
    bar();
    if (st.step < 0) return title();
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    if (step.type === "check") check(step);
    else if (step.type === "call") call(step);
    else vote(step);
    window.scrollTo(0, 0);
  }

  // Click a photo to see it full size
  document.addEventListener("click", e => {
    const img = e.target.closest("img[data-zoom]");
    if (img) { const z = document.createElement("div"); z.className = "zoom"; z.innerHTML = `<img src="${img.src}" alt="${esc(img.alt)}">`; z.onclick = () => z.remove(); document.body.appendChild(z); return; }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { const z = document.querySelector(".zoom"); if (z) z.remove(); } });

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; save(); render();
  };
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => STEPS[i].short,
      go: i => { if (!st.name) st.name = "Test T."; st.step = i; save(); render(); },
      solve: () => {
        const s = STEPS[Math.min(st.step, TOTAL - 1)]; if (!s) return;
        if (s.type === "check" && !st.done[s.id]) { st.done[s.id] = true; save(); render(); bar(); }
        else if (s.type === "call" && st.picks[s.id] == null) { const b = document.querySelector("#cbox .call"); if (b) b.click(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
