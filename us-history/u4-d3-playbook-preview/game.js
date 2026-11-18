// =====================================================================
//  PREVIEW · BORROWED PLAYBOOK: WHO ELSE FOUGHT?  (U.S. History Unit 4 · Day 3)
//  Days 1–2 = the Black civil rights movement's playbook (boycott, sit-in, march,
//  lawsuit, lobby lawmakers). Today: three movements borrowed it.
//  For each movement: a real photo → students tap the play they borrowed
//  (the playbook cards ARE the answer buttons) → then judge if it worked.
//  Case 2 adds a new card (Occupation). STOP ERA stamps "Lobby lawmakers" too:
//  the other side used the playbook (reactionary movement, US.42).
//  7 checks + 1 written answer. ~20 minutes.
//  PREVIEW: only Test T. can turn in. The live page (../u4-d3-who-else/) is untouched.
// =====================================================================
(function () {
  "use strict";
  const PREVIEW = true;
  const KEY = "ush-u4-d3-playbook-v1";
  const ASSIGNMENT_ID = "ush-u4-d3-who-else";
  const TITLE = "U.S. History · Unit 4 · Day 3 · Borrowed Playbook: Who Else Fought?";
  const STANDARD = "SS.9-12.US.42, SS.9-12.US.44";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const isTest = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };

  // ---------------- The playbook (Days 1–2) ----------------
  const PLAYS = [
    { id: "boycott", icon: "🛒", name: "Boycott", def: "Refuse to buy", from: "Montgomery, 1955" },
    { id: "sitin", icon: "🪑", name: "Sit-in", def: "Refuse to leave a place", from: "Greensboro, 1960" },
    { id: "march", icon: "🚶🏾", name: "March", def: "Walk together in public", from: "Selma, 1965" },
    { id: "court", icon: "⚖️", name: "Lawsuit", def: "Take it to court", from: "Brown v. Board, 1954" },
    { id: "law", icon: "🏛️", name: "Push lawmakers", def: "Pressure them to pass a law", from: "Civil Rights Act, 1964" },
    { id: "occupy", icon: "🏝️", name: "Occupation", def: "Take over a place for months", from: "Alcatraz, 1969", isNew: true }
  ];
  const P = id => PLAYS.find(p => p.id === id);

  // ---------------- Movements ----------------
  const MOVES = [
    { id: "farm", icon: "🍇", name: "Farmworkers" },
    { id: "red", icon: "🪶", name: "Red Power" },
    { id: "women", icon: "♀️", name: "Women's movement" },
    { id: "all", icon: "📘", name: "Compare" }
  ];

  // ---------------- Photos (real, archival) ----------------
  // Grape strike photos are copied into img/. The others load from Wikimedia Commons
  // (public domain / CC), with a backup address and a text fallback if both fail.
  const WM = "https://upload.wikimedia.org/wikipedia/commons/thumb/";
  const TM = "https://thumb.wikimedia.org/wikipedia/commons/thumb/";
  const PH = {
    pickets: { src: ["img/grape-pickets-1965.jpg"], alt: "Picketers outside a grocery store holding signs that say DON'T BUY DELANO GRAPES and SUPPORT STRIKING FARM WORKERS. A man in a suit points in front.",
      credit: "Encino, California, December 1965. Los Angeles Times Photographic Archive, UCLA Library (CC BY 4.0)" },
    contract: { src: ["img/grape-contract-1970.jpg"], alt: "César Chávez, seated at a table of microphones, shakes hands with a grower. Priests and workers stand behind them under a LA HUELGA poster.",
      credit: "Delano, California, July 1970. Photo: John Malmin. Los Angeles Times Photographic Archive, UCLA Library (CC BY 4.0)" },
    alcatraz: { src: [WM + "a/a2/Alcatraz_Island_01_Prison_sign.jpg/960px-Alcatraz_Island_01_Prison_sign.jpg", TM + "a/a2/Alcatraz_Island_01_Prison_sign.jpg/1280px-Alcatraz_Island_01_Prison_sign.jpg"],
      alt: "The old U.S. Penitentiary sign at the Alcatraz Island dock, with red paint added by the Native American activists who occupied the island.",
      credit: "Alcatraz dock sign, photographed in 2006. The red paint is from the 1969–71 occupation. Photo: Tewy (CC BY 2.5), Wikimedia Commons" },
    march: { src: [WM + "5/5f/Women%27s_march.jpg/960px-Women%27s_march.jpg", TM + "5/5f/Women%27s_march.jpg/1280px-Women%27s_march.jpg"],
      alt: "A crowd of women carrying banners and signs marches down a street in Washington, D.C.",
      credit: "Washington, D.C., August 26, 1970. Photo: Warren K. Leffler, Library of Congress (public domain)" },
    stopera: { src: [WM + "7/71/Activist_Phyllis_Schafly_wearing_a_%22Stop_ERA%22_badge%2C_demonstrating_with_other_women_against_the_Equal_Rights_Amendment_in_front_of_the_White_House%2C_Washington%2C_D.C._%2842219314092%29.jpg/960px-thumbnail.jpg",
                      TM + "7/71/Activist_Phyllis_Schafly_wearing_a_%22Stop_ERA%22_badge%2C_demonstrating_with_other_women_against_the_Equal_Rights_Amendment_in_front_of_the_White_House%2C_Washington%2C_D.C._%2842219314092%29.jpg/1280px-thumbnail.jpg"],
      alt: "Phyllis Schlafly, wearing a STOP ERA badge, stands with other women protesting the Equal Rights Amendment in front of the White House.",
      credit: "Phyllis Schlafly (center) at a STOP ERA protest, White House, February 4, 1977. Photo: Warren K. Leffler, Library of Congress (public domain)" }
  };

  // ---------------- Steps ----------------
  // play: the playbook cards are the answer. ans = right card. miss[cardId] = feedback.
  // result: 4 choices, options[0] is right; miss[i] explains options[i+1].
  const STEPS = [
    // ===== 🍇 Farmworkers =====
    { id: "p1", type: "play", m: 0, std: "US.44", ans: "boycott", photo: "pickets", short: "Grape strike: borrowed the boycott",
      tag: "Case 1 · Farmworkers · 1965",
      lines: ["<b>Delano, California.</b> Filipino and Mexican American grape pickers go on <b>strike</b>. Pay: about <b>$1.25 an hour</b>.",
              "These strikers are at a grocery store, <b>140 miles</b> from the fields. Read their signs."],
      ask: "Which play are they running?",
      miss: { sitin: "A sit-in means refusing to leave a place. Read the signs: what do they tell shoppers to do?",
              march: "They're standing outside a store, not marching. Read the signs.",
              court: "No court here. The signs talk to shoppers.",
              law: "No lawmakers here. The signs talk to shoppers.",
              occupy: "They aren't taking over the store. Read the signs." },
      reveal: "<b>Boycott</b>: refusing to buy something to pressure a business. Same play as Montgomery: hit them in the wallet.",
      words: [["Strike", "workers refuse to work until things change"], ["Boycott", "refusing to buy something to pressure a business"], ["Picket", "standing outside a place with signs to protest"]] },

    { id: "r1", type: "result", m: 0, std: "US.42", photo: "contract", short: "Growers signed (1970): lost sales from the boycott",
      tag: "Case 1 · Did it work?",
      lines: ["The boycott spread. Millions of Americans stopped buying grapes.",
              "<b>July 1970:</b> César Chávez (seated) shakes hands with a grower. That day, <b>26 grape growers</b> signed <b>union contracts</b>: written deals on pay and working conditions."],
      ask: "The play worked. Why did the growers finally sign?",
      options: ["Lost sales from the boycott were costing them money.",
                "A court ordered them to sign or close their farms.",
                "Congress passed a law that forced them to sign.",
                "Machines broke down, so they needed the pickers back."],
      miss: ["No court here. What were shoppers doing? Reread the first line.",
             "No new law here. Reread the first line.",
             "Nothing here about machines. Reread the first line."],
      reveal: "It took <b>five years</b>, but the boycott worked. Chávez had studied Dr. King's nonviolence.",
      words: [["Union", "a group of workers who bargain together"], ["Union contract", "a written deal on pay and working conditions"]] },

    // ===== 🪶 Red Power =====
    { id: "p2", type: "play", m: 1, std: "US.44", ans: "sitin", photo: "alcatraz", short: "Alcatraz: a sit-in that became an occupation",
      tag: "Case 2 · Red Power · 1969",
      lines: ["<b>Nov. 1969:</b> About 80 Native American students and activists, calling themselves <b>Indians of All Tribes</b>, land on <b>Alcatraz</b>, an empty prison island. They set up camp and stay.",
              "Their message: the U.S. broke its <b>treaties</b> and took Native land."],
      ask: "Which play is this closest to?",
      miss: { boycott: "A boycott means not buying. They moved onto the island.",
              march: "A march moves through a place. They landed and stayed.",
              court: "No court. They took over a place and stayed.",
              law: "They weren't meeting lawmakers. They took over a place.",
              occupy: "That card is locked. Which Days 1–2 play means refusing to leave a place?" },
      reveal: "A <b>sit-in</b>, supersized: they stayed <b>19 months</b>. That's a new play: an <b>occupation</b>. It's in your playbook now.",
      words: [["Treaty", "an official agreement between nations"], ["Occupation", "taking over a place and staying there"]] },

    { id: "r2", type: "result", m: 1, std: "US.42", photo: "alcatraz", short: "Alcatraz: lost the island, won more tribal control",
      tag: "Case 2 · Did it work?",
      lines: ["<b>June 1971:</b> U.S. marshals remove the last 15 people. The island stays federal.",
              "<b>1970:</b> President Nixon calls to end <b>termination</b>, the policy of shutting down tribes.",
              "<b>1975:</b> Congress lets tribes run their own schools and programs. Many historians say Alcatraz helped push these changes."],
      ask: "What's the fairest scorecard for Alcatraz?",
      options: ["Lost the island, but helped win more tribal control.",
                "Won the island, and it became tribal land for good.",
                "Lost the island, and nothing changed for tribes.",
                "Won the island, but tribes lost their treaty rights."],
      miss: ["Reread June 1971. Who got removed?",
             "Reread 1970 and 1975. Did anything change?",
             "Reread June 1971. They didn't keep the island."],
      reveal: "A play can lose the battle and still move the country. <b>Self-determination</b>: tribes making more of their own choices.",
      words: [["Termination", "U.S. policy of ending tribes' government status"], ["Self-determination", "a group making its own choices"]] },

    // ===== ♀️ Women's movement =====
    { id: "p3", type: "play", m: 2, std: "US.44", ans: "march", photo: "march", short: "Women's Strike for Equality: borrowed the march",
      tag: "Case 3 · Women's movement · 1970",
      lines: ["<b>Aug. 26, 1970:</b> 50 years after women won the right to vote. <b>NOW</b> and Betty Friedan call a <b>Women's Strike for Equality</b>.",
              "Crowds fill the streets in cities across the U.S. Their demands: equal jobs, equal pay, equal schooling."],
      ask: "Which play is this crowd running?",
      miss: { sitin: "They're moving down a street, not sitting in one place.",
              boycott: "No one is refusing to buy anything. Look at what the crowd is doing.",
              court: "No courtroom. Look at what the crowd is doing.",
              law: "Pushing lawmakers means meeting them. This crowd is in the street.",
              occupy: "They aren't taking over a place. They're moving down a street." },
      reveal: "<b>March</b>: like Selma and the March on Washington. Get seen, get on TV, pressure lawmakers.",
      words: [["NOW", "National Organization for Women, started 1966"], ["Women's movement", "the fight for equal rights for women"]] },

    { id: "r3", type: "result", m: 2, std: "US.42", photo: "stopera", short: "ERA fell short: STOP ERA (reactionary movement)",
      tag: "Case 3 · Did it work?",
      lines: ["<b>1972:</b> Congress passes the <b>ERA</b> (Equal Rights Amendment). Now <b>38 states</b> must <b>ratify</b> it. Iowa says yes that March.",
              "<b>1972:</b> Phyllis Schlafly starts <b>STOP ERA</b>. Her side warns women could be drafted and wives could lose legal protections. They push state lawmakers to vote no.",
              "<b>1982 deadline:</b> <span class=\"tally\"><span class=\"tbar\"><span style=\"width:92%\"></span></span><b>35 of 38</b> states</span>"],
      ask: "Why did the ERA fall short?",
      options: ["Opponents organized and turned states against it.",
                "Congress voted it down before it reached the states.",
                "The Supreme Court ruled that it broke the Constitution.",
                "Women's groups stopped pushing for it after 1972."],
      miss: ["Reread 1972. Congress passed it. Who had to say yes next?",
             "No court case here. Look at the state count.",
             "Women's groups kept pushing. Who pushed back? Look at the photo."],
      reveal: "<b>Reactionary movement</b>: a movement that pushes back against a change. STOP ERA ran the <b>push lawmakers</b> play, aimed the other way. But the women's movement did win <b>Title IX</b> (1972): no sex discrimination in schools that take U.S. money.",
      words: [["Amendment", "a change to the Constitution"], ["Ratify", "approve; 38 of 50 states had to say yes"], ["Draft", "the government making people join the military"]] },

    // ===== 📘 Compare =====
    { id: "c1", type: "result", m: 3, std: "US.44", photo: null, short: "Red Power different: tribes are nations (sovereignty)",
      tag: "Same playbook, different goals",
      ask: "Red Power's goal was different from the other three. Why?",
      options: ["Tribes are nations that signed treaties with the U.S.",
                "Native Americans already had equal rights by 1969.",
                "Red Power didn't borrow any plays from the playbook.",
                "Red Power only wanted the one island in the bay."],
      miss: ["Equal rights were still a fight in 1969. Look at Red Power's goal.",
             "Check your playbook. Which cards have a 🪶 stamp?",
             "Alcatraz was one protest. Look at their bigger goal on the board."],
      reveal: "Tribes are <b>nations</b>. So Red Power also fought for <b>sovereignty</b>: a nation's right to govern itself.",
      words: [["Sovereignty", "a nation's right to govern itself"], ["Treaty", "an official agreement between nations"]] },

    { id: "write", type: "write", m: 3, short: "Write + turn in", tag: "Last step" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "play" || s.type === "result");

  const GOALS = [
    { icon: "✊🏾", name: "Black civil rights", goal: "End segregation. Protect the right to vote." },
    { icon: "🍇", name: "Farmworkers", goal: "Better pay. Safe, fair working conditions." },
    { icon: "🪶", name: "Red Power", goal: "Keep the treaties. Tribes run their own affairs." },
    { icon: "♀️", name: "Women's movement", goal: "Equal jobs, pay, and schooling." }
  ];

  const PROMPT = { id: "borrow", short: "Borrowed play + did it work",
    label: "Pick ONE movement from today. Which play did it borrow from the Black civil rights movement? Did it work? Use a fact.",
    bank: ["🍇 grape boycott", "🪶 Alcatraz", "♀️ 1970 march", "🛑 STOP ERA"],
    stem: "The ___ borrowed the ___ play from the Black civil rights movement. It ___ because ___.",
    min: 80, newWords: 6,
    mustAll: [["boycott", "sit-in", "sit in", "march", "occup", "lawsuit", "lobby", "lawmaker", "push"], ["because", "since", "so ", "after"]],
    mustMsg: "Name the play AND use “because” with a fact about whether it worked." };

  // ---------------- State ----------------
  const fresh = () => ({ name: "", step: -1, done: {}, wrong: {}, writing: "", turnedIn: false, order: {} });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.done) st = fresh();
  if (!st.order) st.order = {};
  try {   // shared Chromebooks: a different student signed in on this device starts clean
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    const mine = (window.classShortName ? window.classShortName(st.name) : st.name).trim().toLowerCase();
    if (st.name && now && now !== mine) { st = fresh(); localStorage.removeItem(KEY); }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const firstTry = () => CHECKS.filter(c => st.done[c.id] && !st.wrong[c.id]).length;

  // Which movement stamps are on which card (built from solved steps)
  function stamps() {
    const s = {};
    const add = (id, icon, label) => { (s[id] = s[id] || []).push({ icon, label }); };
    if (st.done.p1) add("boycott", "🍇", "Farmworkers");
    if (st.done.p2) { add("sitin", "🪶", "Red Power"); add("occupy", "🪶", "Red Power"); }
    if (st.done.p3) add("march", "♀️", "Women's movement");
    if (st.done.r3) add("law", "🛑", "STOP ERA");
    return s;
  }
  const occupyOpen = () => !!st.done.p2;

  // ---------------- Top bar + playbook ----------------
  function top() {
    const on = st.step >= 0;
    $("top").hidden = !on; $("book").hidden = !on;
    if (!on) return;
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    const M = MOVES[step.m];
    $("mvName").textContent = M.icon + " " + M.name;
    $("dots").innerHTML = STEPS.map((s, i) => `<span class="${i < st.step || (s.type !== "write" && st.done[s.id]) ? "ok" : i === st.step ? "now" : ""}" title="${esc(s.short)}"></span>`).join("");
    $("stars").innerHTML = `⭐ <b>${firstTry()}</b> first try`;
  }
  function book(step, playable) {
    const s = stamps();
    const ids = playable && st.order[step.id] ? st.order[step.id] : PLAYS.map(p => p.id);
    $("book").classList.toggle("live", !!playable);
    $("bookH").innerHTML = playable ? `👆 <b>Tap the play they borrowed</b>` : `📘 The Playbook <small>from Days 1–2</small>`;
    $("cards").innerHTML = ids.map(id => {
      const p = P(id);
      if (p.isNew && !occupyOpen()) return `<div class="card locked" aria-hidden="true"><span class="ci">❔</span><b>New play?</b><small>Not yet</small></div>`;
      const marks = (s[id] || []).map(m => `<span class="stamp" title="${esc(m.label)}">${m.icon}</span>`).join("");
      const tagNew = p.isNew ? `<span class="newtag">NEW</span>` : "";
      return playable
        ? `<button type="button" class="card" data-id="${id}"><span class="ci" aria-hidden="true">${p.icon}</span><b>${esc(p.name)}</b><small>${esc(p.def)}</small>${tagNew}<span class="marks">${marks}</span></button>`
        : `<div class="card"><span class="ci" aria-hidden="true">${p.icon}</span><b>${esc(p.name)}</b><small>${esc(p.def)}</small>${tagNew}<span class="marks">${marks}</span></div>`;
    }).join("");
  }

  // ---------------- Pieces ----------------
  function photoHtml(key) {
    const p = PH[key];
    return `<figure class="photo"><img src="${p.src[0]}" alt="${esc(p.alt)}" data-zoom="1" data-alt-src="${esc(p.src[1] || "")}"><figcaption>${esc(p.credit)} <span class="zh">· Click to zoom</span></figcaption></figure>`;
  }
  function wireImages() {
    document.querySelectorAll("img[data-alt-src]").forEach(img => {
      img.onerror = () => {
        const alt = img.getAttribute("data-alt-src");
        if (alt) { img.setAttribute("data-alt-src", ""); img.src = alt; return; }
        const box = document.createElement("div"); box.className = "nophoto";
        box.innerHTML = `<b>📷 The photo didn't load.</b><span>What it shows: ${esc(img.alt)}</span><small>Tell your teacher. You can still answer from this description.</small>`;
        img.replaceWith(box);
      };
    });
  }
  function wordsHtml(step) {
    if (!step.words) return "";
    return `<details class="words"><summary>📒 Word help</summary>${step.words.map(w => `<p><b>${esc(w[0])}</b>: ${esc(w[1])}</p>`).join("")}</details>`;
  }
  const revealHtml = h => `<div class="reveal"><span aria-hidden="true">💡</span><p>${h}</p></div>`;

  const app = $("app");
  function shell(step, leftHtml, rightHtml) {
    app.innerHTML = `<div class="stage${leftHtml ? "" : " solo"}">${leftHtml ? `<div class="left">${leftHtml}</div>` : ""}<div class="right"><p class="tag">${esc(step.tag)}</p>${rightHtml}</div></div>`;
    wireImages();
  }
  function nextBtn(step) {
    const i = STEPS.indexOf(step), nx = STEPS[i + 1];
    let t = "Next ▶";
    if (nx && nx.m !== step.m) t = nx.type === "write" ? "Last step ▶" : "Next: " + MOVES[nx.m].icon + " " + MOVES[nx.m].name + " ▶";
    else if (nx && nx.type === "write") t = "Last step ▶";
    return `<button type="button" class="go" id="nextBtn">${t}</button>`;
  }
  function addAfter(step, quiet) {
    const a = $("after"); if (!a) return;
    a.innerHTML = revealHtml(step.reveal) + nextBtn(step);
    $("nextBtn").onclick = () => { st.step++; save(); render(); };
    if (!quiet) { const n = $("nextBtn"); if (n) n.focus({ preventScroll: true }); }
  }

  // ---------------- Wrong-answer lock ----------------
  let locked = false;
  function lockLeft() { return isTest() ? 0 : Math.min(LOCK, Math.ceil(((st.lockUntil || 0) - Date.now()) / 1000)); }
  function runLock(text, onDone, secs) {
    const msg = $("qmsg"); locked = true;
    if (isTest()) secs = 0;
    let left = secs;
    const tick = () => {
      if (!document.body.contains(msg)) { locked = false; return; }
      if (left <= 0) { locked = false; msg.innerHTML = `💭 ${esc(text)} Try again.`; msg.className = "msg bad"; onDone(); return; }
      msg.innerHTML = `💭 Not quite. ${esc(text)} <span class="cd">${left}</span>`; msg.className = "msg bad";
      left--; setTimeout(tick, 1000);
    };
    tick();
  }
  function wrong(step, why, redraw) {
    st.wrong[step.id] = (st.wrong[step.id] || 0) + 1;
    st.lockUntil = Date.now() + LOCK * 1000; st.lockMsg = why;
    save(); top();
    try { window.classFirstTry && window.classFirstTry.wrong(); } catch (e) {}
    redraw(true);   // reshuffled and disabled; no red left behind
    runLock(why, () => redraw(false), LOCK);
  }
  function right(step) {
    st.done[step.id] = true; st.lockUntil = 0; save();
    try { window.classFirstTry && window.classFirstTry.right(step.id); } catch (e) {}
  }

  // ---------------- Play step: the playbook cards are the buttons ----------------
  function play(step) {
    shell(step, photoHtml(step.photo), `${step.lines.map(l => `<p class="line">${l}</p>`).join("")}${wordsHtml(step)}
      <p class="ask">${esc(step.ask)} <span class="up">👆 Tap a card in the playbook.</span></p>
      <p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) { book(step, false); return playSolved(step, true); }
    drawCards(step, false, !st.order[step.id]);
    if (lockLeft() > 0) runLock(st.lockMsg || "", () => drawCards(step, false), lockLeft());
  }
  function drawCards(step, disabled, reshuffle) {
    if (reshuffle) {
      const ids = PLAYS.map(p => p.id);
      const prev = (st.order[step.id] || []).join("|");
      let o = shuffle(ids); for (let k = 0; k < 8 && o.join("|") === prev; k++) o = shuffle(ids);
      st.order[step.id] = o; save();
    }
    book(step, true);
    $("cards").querySelectorAll("button.card").forEach(b => {
      b.disabled = disabled;
      b.onclick = () => {
        if (locked || st.done[step.id]) return;
        const id = b.dataset.id;
        if (id === step.ans) {
          right(step); b.classList.add("right");
          setTimeout(() => { book(step, false); playSolved(step, false); top(); }, 400);
          return;
        }
        wrong(step, step.miss[id] || "Look at the photo again.", dis => drawCards(step, dis, dis));
      };
    });
  }
  function playSolved(step, quiet) {
    const p = P(step.ans);
    $("qmsg").outerHTML = `<div class="sent"><span>${p.icon} ${esc(p.name)}</span><small>✓ ${quiet ? "Called it" : "Called it! Stamped in your playbook."}</small></div>`;
    if (!quiet) { const c = document.querySelector(`#cards .card .stamp`); document.querySelectorAll("#cards .card").forEach(x => { if (x.textContent.includes(p.name)) x.classList.add("pop"); }); }
    addAfter(step, quiet);
  }

  // ---------------- Result step: 4 choices ----------------
  function result(step) {
    book(step, false);
    let left;
    if (step.photo) left = photoHtml(step.photo);
    else left = `<div class="goals"><p class="gh">What each movement wanted</p>${GOALS.map(g => `<div class="goal"><span class="gi" aria-hidden="true">${g.icon}</span><div><b>${esc(g.name)}</b><span>${esc(g.goal)}</span></div></div>`).join("")}</div>`;
    shell(step, left, `${(step.lines || []).map(l => `<p class="line">${l}</p>`).join("")}${wordsHtml(step)}
      <p class="ask">${esc(step.ask)}</p><div class="replies" id="replies"></div>
      <p class="msg" id="qmsg" role="status" aria-live="polite"></p><div id="after"></div>`);
    if (st.done[step.id]) return resultSolved(step, true);
    drawReplies(step, false);
    if (lockLeft() > 0) { drawReplies(step, true); runLock(st.lockMsg || "", () => drawReplies(step, false), lockLeft()); }
  }
  function drawReplies(step, disabled) {
    const area = $("replies"); if (!area) return;
    const before = [...area.querySelectorAll(".reply")].map(x => x.textContent).join("|");
    let order = shuffle(step.options.map((t, n) => ({ t, n })));
    for (let k = 0; k < 8 && before && order.map(o => o.t).join("|") === before; k++) order = shuffle(order);
    area.replaceChildren();
    order.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.className = "reply"; b.textContent = o.t; b.disabled = disabled;
      b.onclick = () => {
        if (locked || st.done[step.id]) return;
        if (o.n === 0) { right(step); b.classList.add("right"); setTimeout(() => { resultSolved(step, false); top(); }, 400); return; }
        wrong(step, step.miss[o.n - 1] || "Look again.", dis => drawReplies(step, dis));
      };
      area.appendChild(b);
    });
  }
  function resultSolved(step, quiet) {
    const r = $("replies"); if (r) r.outerHTML = `<div class="sent"><span>${esc(step.options[0])}</span><small>✓ Right</small></div>`;
    $("qmsg").textContent = "";
    if (step.id === "r3") book(step, false);   // STOP ERA stamp shows up on Lobby lawmakers
    addAfter(step, quiet);
  }

  // ---------------- Last step: write + turn in ----------------
  function writeStep(step) {
    book(step, false);
    const sent = st.turnedIn;
    shell(step, null, `<h2 class="wh">Your playbook is full.</h2>
      <p class="line">Look at the stamps above: three movements borrowed from the Black civil rights movement. Even STOP ERA used a play.</p>
      <label for="wbox" class="wl">✏️ ${esc(PROMPT.label)}</label>
      <p class="bank">${PROMPT.bank.map(b => `<span>${esc(b)}</span>`).join("")}</p>
      <p class="stem">Starter: ${esc(PROMPT.stem)} <button type="button" class="mini" id="stemBtn">Use the starter</button></p>
      <textarea id="wbox" rows="3" placeholder="2 full sentences…">${esc(st.writing || "")}</textarea>
      <div class="sendrow"><button type="button" class="go" id="sendBtn">${sent ? "Turn in again" : "Turn in ▶"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${sent ? "✓ Turned in. You can fix your answer and turn in again." : ""}</p></div>`);
    const box = $("wbox");
    box.addEventListener("input", () => { st.writing = box.value; save(); });
    $("stemBtn").onclick = () => {
      if (!box.value.trim()) { box.value = PROMPT.stem; st.writing = box.value; save(); }
      box.focus(); const i = box.value.indexOf("___"); if (i >= 0) box.setSelectionRange(i, i + 3);
    };
    $("sendBtn").onclick = send;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  async function send() {
    const msg = $("sendMsg"), box = $("wbox"), v = (box.value || "").trim();
    const bad = t => { msg.textContent = t; msg.className = "msg bad"; box.focus(); };
    if (PREVIEW && !isTest()) return bad("This is a preview. Turn-in is off until your teacher makes it live.");
    if (!isTest()) {
      if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: PROMPT.stem, source: "from today's photos" }); if (junk) { msg.textContent = junk; msg.className = "msg"; return; } }
      if (v.length < PROMPT.min) return bad("Write a little more (2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words.");
      const stemWords = new Set(plain(PROMPT.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < PROMPT.newWords) return bad("Add more of your own words. Use a fact from today.");
      if (PROMPT.mustAll.some(g => !g.some(w => plain(v + " ").includes(plain(w))))) return bad(PROMPT.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }
    const answers = { "Standard": STANDARD };
    answers["First-try correct"] = firstTry() + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    answers["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    answers["Writing: " + PROMPT.short] = v;
    CHECKS.forEach(c => {
      const w = st.wrong[c.id], a = c.type === "play" ? P(c.ans).name : c.options[0];
      answers[c.std + " · " + c.short] = a + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)");
    });
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work."; msg.className = "msg good";
      $("sendBtn").textContent = "✓ Turned in";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; $("sendBtn").disabled = false; }
  }

  // ---------------- Title ----------------
  function title() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title">
      <div class="tbook" aria-hidden="true">
        <p class="tb-h">📘 THE PLAYBOOK</p>
        <div class="tb-cards">${PLAYS.filter(p => !p.isNew).map(p => `<div class="tcard"><span>${p.icon}</span><b>${esc(p.name)}</b><small>${esc(p.def)} · ${esc(p.from)}</small></div>`).join("")}</div>
        <p class="tb-by">Written by the Black civil rights movement, 1954–1965</p>
      </div>
      <div class="tcopy">
        <p class="tk">${PREVIEW ? "PREVIEW · " : ""}U.S. History · Unit 4 · Day 3</p>
        <h1>Borrowed Playbook</h1>
        <p class="hook">Other groups copied the civil rights playbook. Did it work for them?</p>
        <ol class="how"><li><span>📷</span>Look at a real photo.</li><li><span>👆</span>Tap the play they borrowed.</li><li><span>⚖️</span>Decide if it worked.</li></ol>
        <p class="tchips"><span>⏱️ 20 min</span><span>🍇 🪶 ♀️ 3 movements</span><span>✅ 7 checks</span><span>✏️ 1 short answer</span></p>
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go big" id="startBtn">Open the playbook ▶</button></div>
        <p id="introMsg" class="msg bad" role="status"></p>
        <p class="src">Every photo and event is real. Standards: SS.9-12.US.42, US.44.</p>
      </div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("nameBox").focus(); return; }
      try { if (window.classClaimDevice) window.classClaimDevice(fixed); } catch (e) {}
      st = fresh(); st.name = fixed; st.step = 0;
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      save(); render();
    };
    $("nameBox").addEventListener("keydown", e => { if (e.key === "Enter") $("startBtn").click(); });
  }

  // ---------------- Router ----------------
  let firstRender = true;
  function render() {
    if (!firstRender && $("welcome")) $("welcome").hidden = true;
    firstRender = false; locked = false;
    document.body.classList.toggle("on-title", st.step < 0);
    top();
    if (st.step < 0) return title();
    const step = STEPS[Math.min(st.step, TOTAL - 1)];
    document.body.dataset.step = step.id;
    window.scrollTo(0, 0);
    if (step.type === "play") return play(step);
    if (step.type === "result") return result(step);
    return writeStep(step);
  }

  // Zoom any photo
  document.addEventListener("click", e => {
    const z = e.target.closest(".zoom"); if (z) { z.remove(); return; }
    const img = e.target.closest("img[data-zoom]");
    if (img) { const d = document.createElement("div"); d.className = "zoom"; d.innerHTML = `<img src="${img.currentSrc || img.src}" alt="${esc(img.alt)}"><p>Click anywhere to close</p>`; document.body.appendChild(d); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { const z = document.querySelector(".zoom"); if (z) z.remove(); } });

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    save(); render();
  };
  if (st.step >= 0 && st.name) {
    const w = $("welcome");
    w.innerHTML = `<span>👋 Welcome back, ${esc(st.name)}! You're on step ${Math.min(st.step + 1, TOTAL)} of ${TOTAL}.</span>`;
    const notMe = document.createElement("button");
    notMe.type = "button"; notMe.className = "notme"; notMe.textContent = "Not " + st.name + "? Start fresh";
    notMe.onclick = () => {
      try { localStorage.removeItem(KEY); localStorage.removeItem("site-student-name"); } catch (e) {}
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      st = fresh(); save(); location.reload();
    };
    w.appendChild(notMe); w.hidden = false;
  }
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => STEPS[i].short,
      go: i => {
        if (!st.name) st.name = "Test T.";
        st.lockUntil = 0;
        STEPS.forEach((s, j) => { if (j < i && s.type !== "write") st.done[s.id] = true; });
        st.step = i; save(); render();
      },
      solve: () => {
        const s = STEPS[Math.min(st.step, TOTAL - 1)];
        if (s && s.type !== "write" && !st.done[s.id]) { st.done[s.id] = true; st.lockUntil = 0; save(); render(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
