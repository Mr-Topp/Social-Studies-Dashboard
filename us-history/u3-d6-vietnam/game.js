// =====================================================================
//  HOME FRONT IOWA: ONE FAMILY, 1964–1975  (U.S. History · Unit 3 · Day 4)
//  Rebuilt 2026-11-14 (Fynn picked "An Iowa Family, 1964–1975"; the old "Front Page" game was replaced).
//  Every round is one Day 4 slide topic, in slide order: domino theory → Gulf of Tonkin → the draft and
//  guerrilla war → Tinker v. Des Moines → Tet on TV → hawks vs. doves and Kent State → the war ends,
//  War Powers, and refugees come to Iowa → Korea vs. Vietnam.
//  You are a made-up teen in a made-up Des Moines family (the Novaks). Real events reach your dinner table.
//  Each round: real event → prove what it means with a real source (check) → make a family choice.
//  Two meters that pull against each other: Family together vs. Your voice (speaking up strains the family;
//  staying quiet keeps the peace). Rival: Uncle Walt, a Korea veteran and a hawk, pushes back.
//  Ends with a "Caused by" trail and 2 short answers taken from the Day 4 exit ticket and civic-virtue activity.
//  Turn-in: shared/turnin.js classTurnIn. Test T. can skip everything.
// =====================================================================
(function () {
  "use strict";
  const KEY = "ush-u3-d6-iowa-family-v1";
  const CFG = {
    assignmentId: "ush-u3-d6-vietnam",
    title: "U.S. History · Unit 3 · Day 4 · Home Front Iowa: One Family, 1964–1975",
    standard: "SS.9-12.US.35, SS.9-12.US.37, SS.9-12.US.40, SS.9-12.US.41",
    oldApi: "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit"
  };
  const LOCK = 5;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const TT = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };

  // =====================================================================
  //  ROUNDS. check.options[0] is right. choices: fx = { fam, voice }.
  // =====================================================================
  const ROUNDS = [
    { id: "r1", date: "1964", title: "Why Vietnam?", mike: "home",
      event: "Fall 1964: the TV news shows a map. Vietnam was split in 1954. Communist North Vietnam is fighting the U.S.-backed South. The U.S. is sending money, weapons, and advisers.",
      source: ["🎙️ President Eisenhower · April 7, 1954", "“You have a row of dominoes set up, you knock over the first one, and what will happen to the last one is the certainty that it will go over very quickly.”"],
      q: "What does Eisenhower say will happen if Vietnam falls to communism?",
      options: ["Its neighbors will fall to communism too, one by one", "Communism will stop at Vietnam's borders for good", "The U.S. will have to give up its own allies in Asia"],
      hint: "Picture a row of dominoes. What happens after the first one falls?",
      key: "<b>Domino theory</b> = if one country falls to communism, its neighbors will fall too. It's why the U.S. backed South Vietnam (containment again).",
      walt: "We stopped the communists in Korea. We'll stop them in Vietnam too.",
      choices: [
        { t: "Agree with Uncle Walt at dinner", fx: { fam: 1, voice: 0 }, r: "Uncle Walt grins. Dinner is peaceful." },
        { t: "Ask why Vietnam matters to Iowa", fx: { fam: 0, voice: 1 }, r: "Uncle Walt explains dominoes. Dad nods. You keep wondering." }
      ] },
    { id: "r2", date: "AUG 1964", title: "The Gulf of Tonkin", mike: "home",
      event: "August 1964: President Johnson says North Vietnam attacked U.S. Navy ships twice. Congress votes 416–0 in the House and 88–2 in the Senate.",
      source: ["📜 Gulf of Tonkin Resolution · Aug. 1964", "Congress lets the President “take all necessary measures to repel any armed attack against the forces of the United States and to prevent further aggression.”"],
      q: "What does the Gulf of Tonkin Resolution let Johnson do?",
      options: ["Use military force without Congress declaring war", "Declare war on North Vietnam in Congress's place", "Send help only if a U.S. city is attacked"],
      hint: "“All necessary measures.” Did Congress actually declare war?",
      key: "Later evidence showed the second attack never happened. But the resolution let Johnson send more and more troops: over 500,000 by 1968.",
      walt: "They shot at our Navy! Mike should sign up and serve, like I did in Korea.",
      choices: [
        { t: "Back Mike if he wants to enlist", fx: { fam: 1, voice: 0 }, r: "Mike decides to wait and see. Mom looks relieved." },
        { t: "Ask if anyone checked what really happened", fx: { fam: -1, voice: 1 }, r: "Uncle Walt snaps: “You calling the President a liar?” The room goes quiet." }
      ] },
    { id: "r3", date: "1965", title: "Mike Is Drafted", mike: "vietnam",
      event: "1965: Mike gets a letter. He's drafted, which means he's required to serve. Soon his letters come from Vietnam.",
      source: ["📁 Fact file · Fighting in Vietnam", "The Viet Cong were communist fighters in South Vietnam. They used small surprise attacks, then hid in jungles, villages, and tunnels. The U.S. answered with helicopters, heavy bombing, and the chemical Agent Orange."],
      q: "Use the fact file. What is guerrilla warfare?",
      options: ["Small surprise attacks, then hiding among the land and people", "Two huge armies lined up on one big battlefield", "Fighting only from planes and ships, never on land"],
      hint: "Find how the Viet Cong fought in the fact file.",
      key: "<b>Guerrilla warfare</b> = small surprise attacks, then hiding. It made the war very hard to “win.” Agent Orange later sickened many Vietnamese people and U.S. veterans.",
      walt: "Write him something proud. Soldiers need to hear we're behind them.",
      choices: [
        { t: "Write Mike only cheerful news from home", fx: { fam: 1, voice: 0 }, r: "Mike writes back: “Thanks. Tell Mom I'm fine.” You're not sure he is." },
        { t: "Ask Mike what it's really like", fx: { fam: 0, voice: 1 }, r: "Mike's answer is short: “Nobody knows who the enemy is. I just want to come home.”" }
      ] },
    { id: "r4", date: "DEC 1965", title: "Armbands in Des Moines", mike: "vietnam",
      event: "December 1965, right here in Des Moines: Mary Beth Tinker, John Tinker, and Christopher Eckhardt wear black armbands to school to mourn the dead in Vietnam. They're suspended. In 1969, the Supreme Court rules 7–2 for the students.",
      source: ["⚖️ Justice Abe Fortas · Tinker v. Des Moines, 1969", "Students and teachers don't “shed their constitutional rights to freedom of speech or expression at the schoolhouse gate.”"],
      q: "What did the Supreme Court decide in Tinker?",
      options: ["Students keep free speech, unless they seriously disrupt school", "Students lose free speech once they walk into school", "Students can say anything at school, even in class tests"],
      hint: "What do students NOT leave at the schoolhouse gate? What can a school still stop?",
      key: "<b>Tinker v. Des Moines</b> = students keep free speech at school, as long as they don't seriously disrupt learning. It started in Iowa.",
      walt: "Kids protesting while Mike is over there? That's disrespectful.",
      choices: [
        { t: "Wear a black armband to school too", fx: { fam: -2, voice: 2 }, r: "Uncle Walt won't speak to you for a week. Two kids at school thank you." },
        { t: "Don't wear one, but defend their right to", fx: { fam: -1, voice: 1 }, r: "Uncle Walt grumbles. Your teacher says, “That's what the First Amendment is for.”" },
        { t: "Stay out of it", fx: { fam: 1, voice: 0 }, r: "Things stay calm at home. The case goes on without you." }
      ] },
    { id: "r5", date: "FEB 1968", title: "Tet on the TV", mike: "vietnam",
      event: "U.S. leaders said the war was being won. Then, in January 1968, North Vietnam and the Viet Cong attacked more than 100 cities in South Vietnam at once, during Tet, the Vietnamese New Year. U.S. forces pushed them back. Your family watched it on TV every night.",
      source: ["📺 Walter Cronkite, CBS News · Feb. 27, 1968", "“To say that we are mired in stalemate seems the only realistic, yet unsatisfactory, conclusion.”"],
      q: "Why did Tet change so many Americans' minds?",
      options: ["TV showed the war was far from over, not almost won", "The U.S. lost every single base it had in Vietnam", "North Vietnam surrendered right after the attacks"],
      hint: "Compare what leaders said with what Cronkite said after Tet.",
      key: "Tet was a military loss for North Vietnam, but it changed opinion at home. Many Americans stopped believing the war would end soon.",
      walt: "Turn that off. The news is making us look weak.",
      choices: [
        { t: "Turn off the TV for Uncle Walt", fx: { fam: 1, voice: 0 }, r: "Quiet night. But Mom keeps checking the news in the kitchen." },
        { t: "Keep watching and talk about it", fx: { fam: -1, voice: 1 }, r: "Dad says, “Maybe Cronkite's right.” Uncle Walt leaves early." }
      ] },
    { id: "r6", date: "MAY 1970", title: "Hawks, Doves, and Kent State", mike: "vietnam",
      event: "May 4, 1970: National Guard soldiers fire at student protesters at Kent State University in Ohio. Four students are killed. Some Americans march against the war. Others see the marchers as disloyal.",
      source: ["📁 Fact file · A divided country", "Hawks wanted to keep fighting or fight harder. Doves wanted to pull out or negotiate. Some young men burned their draft cards. Many others supported the troops and the war."],
      q: "Use the fact file. Which person is a dove?",
      options: ["Someone who wants the U.S. to pull out or negotiate", "Someone who wants to send more troops and win", "Someone who wants to bomb North Vietnam harder"],
      hint: "Doves wanted the fighting to stop. Hawks wanted to fight harder.",
      key: "<b>Hawks vs. doves</b>: the war split families, campuses, and the whole country.",
      walt: "Those protesters are spitting on everything Mike is fighting for.",
      choices: [
        { t: "Join a peaceful march in Des Moines", fx: { fam: -2, voice: 2 }, r: "Dad drives you there but won't march. Uncle Walt skips Sunday dinner." },
        { t: "Write a letter to the editor supporting the troops", fx: { fam: 1, voice: 1 }, r: "The Register prints it. Uncle Walt cuts it out and hangs it on his fridge." },
        { t: "Stay home and listen to Uncle Walt's side", fx: { fam: 1, voice: 0 }, r: "He tells you about Korea for an hour. You understand him a little better." }
      ] },
    { id: "r7", date: "1975", title: "The War Ends", mike: "home",
      event: "The last U.S. troops leave in 1973. Mike comes home. In 1975, North Vietnam takes over the South. About 58,000 Americans died, and millions of Vietnamese. Many people flee. Iowa's governor, Robert Ray, invites refugees to Iowa, starting with Tai Dam families from Laos.",
      source: ["📁 Fact file · Iowa answers", "Gov. Robert Ray invited refugees to come to Iowa in 1975. Churches and families across the state sponsored them. Iowa became a model for helping refugees."],
      q: "Use the fact file. How did Iowa respond to refugees after the war?",
      options: ["Gov. Ray invited them, and Iowans sponsored families", "Iowa closed its borders to all refugees from Asia", "Iowa sent the refugees back to Vietnam in 1975"],
      hint: "Find what Governor Ray did in the fact file.",
      key: "Also in 1973: the <b>War Powers Resolution</b>. A president must tell Congress within 48 hours of sending troops into combat, and bring them home in 60 days unless Congress approves.",
      walt: "We fought them for ten years. Now we take them in?",
      choices: [
        { t: "Help your church sponsor a refugee family", fx: { fam: 0, voice: 2 }, r: "A Tai Dam family moves in down the street. Mike helps fix their car. Even Uncle Walt brings a casserole." },
        { t: "Give money, but don't get involved", fx: { fam: 1, voice: 1 }, r: "Your money helps buy winter coats. Iowa winters are a shock." },
        { t: "Stay out of it", fx: { fam: 1, voice: 0 }, r: "Life goes back to normal at your house." }
      ] },
    { id: "r8", date: "1975", title: "Korea vs. Vietnam", mike: "home", compare: true,
      event: "Uncle Walt fought in Korea. Mike fought in Vietnam. At Thanksgiving, they finally compare.",
      source: ["📁 Fact file · Same cause, different effects", "Korea: the U.S. fought to contain communism. Congress never declared war. It ended in a tie, and South Korea stayed non-communist. Vietnam: the U.S. fought to contain communism. Congress never declared war. The communists won, and the war split Americans."],
      q: "Which is TRUE about BOTH wars?",
      options: ["The U.S. fought to contain communism, without a declaration of war", "Both ended with the communists taking over the whole country", "Both had strong support at home from start to finish"],
      hint: "Find what the fact file says about Korea AND Vietnam.",
      key: "<b>Same cause, different effects</b>: both wars were containment. Korea ended in a tie. Vietnam ended in a communist win and left many Americans distrusting their leaders." }
  ];
  const STEPS = ROUNDS.length + 2;   // rounds, ending, writing

  // ---------- state ----------
  function fresh() { return { v: 1, name: "", step: 0, ph: "check", fam: 7, voice: 2, wrong: {}, picks: {}, trail: [], writing: {}, turnedIn: false }; }
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || st.v !== 1) st = fresh();
  try {
    const signedIn = window.classShortName ? window.classShortName(localStorage.getItem("site-student-name") || "") : "";
    if (signedIn && st.name && signedIn.toLowerCase() !== st.name.toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const clamp = n => Math.max(0, Math.min(10, n));
  let pending = null, justSolved = false;

  // ---------- HUD ----------
  const MIKE = { home: ["🧑", "home in Des Moines"], vietnam: ["🪖", "in Vietnam"] };
  function hud() {
    const on = st.step >= 1;
    $("hud").hidden = !on;
    if (!on) return;
    const r = ROUNDS[st.step - 1];
    const d = (r ? r.date : "1975").split(" ");
    $("calMo").textContent = d.length > 1 ? d[0] : "—"; $("calYr").textContent = d[d.length - 1];
    $("stepText").textContent = "Step " + Math.min(st.step, STEPS) + " of " + STEPS;
    $("stepFill").style.width = Math.round(Math.min(st.step, STEPS) / STEPS * 100) + "%";
    $("mFam").style.width = st.fam * 10 + "%"; $("nFam").textContent = st.fam + "/10";
    $("mVoice").style.width = st.voice * 10 + "%"; $("nVoice").textContent = st.voice + "/10";
    $("famFace").textContent = st.fam >= 7 ? "🙂" : st.fam >= 4 ? "😐" : "😟";
    const m = MIKE[(r && r.mike) || "home"];
    $("mikeIco").textContent = m[0]; $("mikeAt").textContent = m[1];
    document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px");
    if (pending) {
      [["fam", "hudFam", "🏠"], ["voice", "hudVoice", "📣"]].forEach(([k, id, ico]) => {
        const n = pending[k]; if (!n) return;
        const el = $(id), p = document.createElement("span");
        p.className = "pop " + (n > 0 ? "good" : "bad"); p.textContent = (n > 0 ? "+" : "−") + Math.abs(n) + " " + ico; p.setAttribute("aria-hidden", "true");
        el.appendChild(p); el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); setTimeout(() => p.remove(), 2000);
      });
      pending = null;
    }
  }

  // ---------- pieces ----------
  const bub = (who, name, ico, text) => `<div class="bub ${who}"><span class="av" aria-hidden="true">${ico}</span><div class="bt"><b>${esc(name)}</b><p>${esc(text)}</p></div></div>`;
  function jobStrip(steps, now) {
    return `<ol class="job" aria-label="Your job">${steps.map((t, i) => `<li class="${i < now ? "did" : i === now ? "now" : ""}"${i === now ? ' aria-current="step"' : ""}>${esc(t)}</li>`).join("")}</ol>`;
  }
  function famBoard(r) {
    const away = r && r.mike === "vietnam";
    return `<div class="fam" aria-label="Your family"><p class="f-h">THE NOVAKS · DES MOINES</p>
      <div class="p"><span class="e" aria-hidden="true">🧑‍🎓</span><span><b>You</b><small>15 in 1964, a student in Des Moines</small></span></div>
      <div class="p${away ? " away" : ""}"><span class="e" aria-hidden="true">${away ? "🪖" : "🧑"}</span><span><b>Mike, your brother</b><small>${away ? "Drafted. Serving in Vietnam." : "18 in 1964"}</small></span></div>
      <div class="p"><span class="e" aria-hidden="true">👩👨</span><span><b>Mom and Dad</b><small>Just want the family safe</small></span></div>
      <div class="p rival"><span class="e" aria-hidden="true">🎖️</span><span><b>Uncle Walt</b><small>Korea veteran. A hawk. Pushes back.</small></span></div>
      <p class="fict">Your family is made up. Every event, date, and quote is real.</p></div>`;
  }
  function scene(o) {
    const left = o.board === false ? "" : `<div class="map-wrap">${famBoard(o.round)}</div>`;
    return `<section class="scene"><div class="sc-top"><h2>${esc(o.title)}</h2></div>
      ${o.job ? `<div class="sc-job">${o.job}</div>` : ""}
      <div class="board${left ? "" : " nomap"}">${left}<div class="side">${o.body}</div></div></section>`;
  }
  function nextBtn(label) { return `<button type="button" class="go" id="nextBtn">${esc(label)}</button>`; }
  function goStep(n) { st.step = n; st.ph = "check"; save(); render(); window.scrollTo(0, 0); }

  let lockTimer = null;
  function mountCheck(r) {
    const box = $("pickBox"); if (!box) return;
    const area = document.createElement("div"); area.className = "choices";
    const msg = document.createElement("p"); msg.className = "msg"; msg.setAttribute("role", "status"); msg.setAttribute("aria-live", "polite");
    box.append(area, msg);
    let last = "", locked = false;
    function draw() {
      area.replaceChildren();
      let order = shuffle(r.options.map((_, n) => n));
      if (order.join() === last && order.length > 1) order.push(order.shift());
      last = order.join();
      order.forEach(n => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice reply";
        b.innerHTML = `<span class="r-ico" aria-hidden="true">💬</span><span class="r-t">${esc(r.options[n])}</span>`;
        b.onclick = () => {
          if (locked) return;
          if (n === 0) { if (window.classFirstTry) window.classFirstTry.right(r.id); justSolved = true; st.ph = r.compare ? "done" : "choice"; save(); render(); scrollToId(r.compare ? "nextBtn" : "choiceBox"); return; }
          st.wrong[r.id] = (st.wrong[r.id] || 0) + 1;
          if (window.classFirstTry) window.classFirstTry.wrong();
          save();
          locked = true; area.querySelectorAll("button").forEach(x => { x.disabled = true; });
          let left = TT() ? 0 : LOCK;
          const tick = () => {
            msg.className = "msg try";
            if (left <= 0) { locked = false; msg.textContent = "✖ " + r.hint + " The choices were mixed up. Try again."; draw(); return; }
            msg.textContent = "✖ " + r.hint + " ⏳ " + left;
            left--; lockTimer = setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    draw();
  }
  function scrollToId(id) { setTimeout(() => { const el = $(id); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 60); }
  const fxTags = fx => [fx.fam ? `<span class="tag ${fx.fam > 0 ? "up" : "down"}">🏠 ${fx.fam > 0 ? "+" : "−"}${Math.abs(fx.fam)} family</span>` : "",
    fx.voice ? `<span class="tag ${fx.voice > 0 ? "up" : "down"}">📣 ${fx.voice > 0 ? "+" : "−"}${Math.abs(fx.voice)} voice</span>` : ""].join("");

  // ---------- one round ----------
  function roundScreen(app, i) {
    const r = ROUNDS[i - 1];
    const steps = r.compare ? ["Read what happened", "Prove it with the source", "Tap Next"] : ["Read what happened", "Prove it with the source", "Make your choice"];
    const now = st.ph === "check" ? 1 : 2;
    const event = `<div class="cause tv"><span class="c-tag">📺 ${esc(r.date)} · ON THE NEWS</span><p>${esc(r.event)}</p></div>`;
    const src = `<div class="paper quote"><p class="p-h">${esc(r.source[0])}</p><p>${esc(r.source[1])}</p></div>`;
    const solvedBox = `<div class="linked${justSolved ? " slam" : ""}">✔ <b>${esc(r.options[0])}</b></div>`;
    justSolved = false;
    const keyBox = `<div class="reveal"><span class="nw">💡 KEY IDEA</span><p>${r.key}</p></div>`;
    if (st.ph === "check") {
      app.innerHTML = scene({ title: r.title, round: r, job: jobStrip(steps, now), body: event + src + `<div class="pick proof"><p class="pick-h">🔍 ${esc(r.q)}</p><div id="pickBox"></div></div>` + (r.choices ? `<p class="locked-note">🔒 Prove it first. Then you make your family choice.</p>` : "") });
      return mountCheck(r);
    }
    if (st.ph === "choice") {
      app.innerHTML = scene({ title: r.title, round: r, job: jobStrip(steps, 2), body: event + solvedBox + keyBox +
        bub("walt", "Uncle Walt", "🎖️", r.walt) + `<div id="choiceBox" class="pick"><p class="pick-h">🏠 Your move:</p><div class="cards n${r.choices.length}" id="cChoices"></div></div>` });
      const area = $("cChoices");
      r.choices.forEach((c, n) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "dcard";
        b.innerHTML = `<b class="d-t">${esc(c.t)}</b><span class="d-chips">${fxTags(c.fx) || '<span class="tag">no change</span>'}</span>`;
        b.onclick = () => {
          st.fam = clamp(st.fam + (c.fx.fam || 0)); st.voice = clamp(st.voice + (c.fx.voice || 0));
          pending = c.fx; st.picks[r.id] = n; st.trail.push({ t: c.t, fx: c.fx, year: r.date }); st.ph = "done"; save(); render(); scrollToId("resultBox");
        };
        area.appendChild(b);
      });
      return;
    }
    const c = r.choices ? r.choices[st.picks[r.id] || 0] : null;
    const result = c ? `<div class="result2" id="resultBox"><p class="you">You chose: ${esc(c.t)}</p><div class="tags">${fxTags(c.fx)}</div><p>${esc(c.r)}</p></div>` : "";
    const last = i === ROUNDS.length;
    app.innerHTML = scene({ title: r.title, round: r, job: jobStrip(steps, 3), body: event + solvedBox + (c ? "" : keyBox) + result + nextBtn(last ? "See how your family ends up →" : "Next year →") });
    $("nextBtn").onclick = () => goStep(i + 1);
  }

  // ---------- ending ----------
  const ENDINGS = {
    both: { e: "🤝", t: "Spoke Up, Stayed Together", text: "You said what you believed and still kept your family talking. That's civic virtue: standing up for the common good without tearing people apart." },
    split: { e: "💔", t: "Spoke Up, Split Apart", text: "You stood up for what you believed, but it cost you at home. Lots of American families split like this over Vietnam." },
    quiet: { e: "🏠", t: "Kept the Peace at Home", text: "Your family stayed close, but you mostly stayed quiet while the country argued around you." },
    lost: { e: "🌫️", t: "Divided and Silent", text: "The war pulled your family apart, and your voice never got heard." }
  };
  const endKey = () => st.voice >= 6 ? (st.fam >= 5 ? "both" : "split") : (st.fam >= 5 ? "quiet" : "lost");
  function endingScreen(app) {
    const E = ENDINGS[endKey()];
    const trail = st.trail.length ? st.trail.map(t => `<li><span>${esc(t.year)}: ${esc(t.t)}</span><span class="tags">${fxTags(t.fx) || ""}</span></li>`).join("") : "<li><span>No choices yet.</span></li>";
    const body = `<div class="front"><p class="masthead" aria-hidden="true">THE NOVAK FAMILY · THANKSGIVING 1975</p>
        <div class="headline"><span class="e-big" aria-hidden="true">${E.e}</span><h3>${esc(E.t)}</h3></div>
        <p>${esc(E.text)}</p>
        <div class="finalm"><span>🏠 Family together <b>${st.fam}/10</b></span><span>📣 Your voice <b>${st.voice}/10</b></span></div>
        <h4 class="cb">Caused by:</h4><ul class="trail">${trail}</ul></div>
      <div class="memorial"><p class="m-h">THE REAL COST</p>
        <p>🕯️ About 58,000 Americans died in Vietnam.</p><p>🕯️ Millions of Vietnamese died.</p>
        <p>🏛️ Many Americans stopped trusting their leaders.</p>
        <p class="src">Sources: National Archives; Office of the Historian.</p></div>` + nextBtn("Write your answers →");
    app.innerHTML = scene({ title: "How Your Family Ends Up", board: false, job: jobStrip(["See your ending", "Read the real cost", "Write your answers"], 1), body });
    $("nextBtn").onclick = () => goStep(STEPS);
  }

  // ---------- writing + turn in ----------
  const KW = ["contain", "domino", "communis", "tonkin", "draft", "guerrilla", "tet", "tv", "television", "kent state", "hawk", "dove", "protest", "tinker", "armband", "free speech", "refugee", "ray", "korea", "north vietnam", "south vietnam", "troops", "soldiers", "johnson", "nixon"];
  const PROMPTS = [
    { id: "why", short: "Why the U.S. fought and how it divided Americans", label: "1. Why did the U.S. fight in Vietnam, and how did the war divide Americans at home?",
      stem: "The U.S. fought in Vietnam because ___. It divided Americans because ___.", min: 60, newWords: 6,
      mustAll: [KW, ["because", "since", "so "]],
      mustMsg: "In answer 1, use a fact from today (like the domino theory, Tet, or Kent State) and explain with “because.”" },
    { id: "virtue", short: "Who showed civic virtue", label: "2. Who showed civic virtue during the Vietnam years? Name one action and who it helped.",
      stem: "___ showed civic virtue by ___. This helped ___.", min: 50, newWords: 5,
      mustAll: [["tinker", "mary beth", "john", "eckhardt", "ray", "governor", "cronkite", "church", "family", "student", "veteran", "mike", "walt", "sponsor", "refugee"], ["help", "stood", "spoke", "protect", "right", "invite", "sponsor", "free"]],
      mustMsg: "In answer 2, name a person (like Mary Beth Tinker or Gov. Robert Ray) and say what they did and who it helped." }
  ];
  function memoScreen(app) {
    const page = p => `<div class="vpage"><label for="w_${p.id}">${esc(p.label)}</label><p class="stem">${esc(p.stem)}</p><textarea id="w_${p.id}" rows="4">${esc(st.writing[p.id] || "")}</textarea></div>`;
    const body = `<div class="memo"><p class="vm-h">YOUR ANSWERS</p>` + PROMPTS.map(page).join("") +
      `<label for="nameBox2" class="namel">Your name</label><input id="nameBox2" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">` +
      `<div class="vrow"><button type="button" class="go" id="sendBtn"${st.turnedIn ? " disabled" : ""}>📮 ${st.turnedIn ? "✓ Turned in" : "Turn in"}</button></div><p id="sendMsg" class="msg${st.turnedIn ? " good" : ""}" role="status" aria-live="polite">${st.turnedIn ? "✓ Turned in." : ""}</p></div>`;
    app.innerHTML = scene({ title: "Your Answers", board: false, job: jobStrip(["Answer question 1", "Answer question 2", "Turn in"], 0), body });
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", e => { st.writing[p.id] = e.target.value; save(); }));
    $("sendBtn").onclick = sendWork;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem(p) {
    if (TT()) return "";
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" }); if (junk) return "For " + p.short + ": " + junk; }
    if (v.length < p.min) { box.focus(); return "Write a little more for: " + p.short + " (1–2 full sentences)."; }
    if (/_{2,}/.test(v)) { box.focus(); return "Fill in the blanks with your own words for: " + p.short + "."; }
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const freshW = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (freshW.size < p.newWords) { box.focus(); return "Add more of your own ideas for: " + p.short + ". Use details from today."; }
    const pv = " " + plain(v) + " ";
    if (p.mustAll.some(g => !g.some(w => pv.includes(plain(w))))) { box.focus(); return p.mustMsg; }
    return "";
  }
  async function sendWork() {
    const msg = $("sendMsg");
    const bad = t => { msg.textContent = t; msg.className = "msg try"; };
    const nm = window.classShortName ? window.classShortName($("nameBox2").value) : $("nameBox2").value.trim();
    if (!/^\S+ [A-Z]\.$/.test(nm)) { bad("Type your first name and last initial, like Jordan M."); $("nameBox2").focus(); return; }
    st.name = nm; save();
    for (const p of PROMPTS) { const err = writingProblem(p); if (err) { bad(err); return; } }
    const answers = { "Standard": CFG.standard };
    answers["First-try correct"] = ROUNDS.filter(r => !st.wrong[r.id]).length + " of " + ROUNDS.length;
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    ROUNDS.forEach(r => { answers["Check · " + r.title] = r.options[0] + (st.wrong[r.id] ? " (after " + st.wrong[r.id] + " wrong)" : " (first try)"); });
    ROUNDS.forEach(r => { if (r.choices && st.picks[r.id] != null) answers["Choice · " + r.title] = r.choices[st.picks[r.id]].t; });
    answers["Ending"] = ENDINGS[endKey()].t;
    answers["Meters at the end"] = "Family together " + st.fam + "/10 · Your voice " + st.voice + "/10";
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(CFG.oldApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: CFG.assignmentId, assignmentTitle: CFG.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.innerHTML = `<span class="stamp slam">📮 SENT</span> ✓ Turned in! You're done.`; msg.className = "msg good";
      $("sendBtn").textContent = "✓ Turned in";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg try"; $("sendBtn").disabled = false; }
  }

  // ---------- title + render ----------
  function title(app) {
    app.innerHTML = `<section class="title-card"><div class="t-grid"><div class="t-left">
        <p class="t-kick">U.S. History · Unit 3 · Day 4</p>
        <h1>Home Front Iowa</h1>
        <p class="hook">Des Moines, 1964. The Vietnam War is coming to your dinner table. Your brother could be drafted, and your family can't agree.</p>
        <ol class="how"><li><b>Read</b> the real news</li><li><b>Prove</b> it with a source</li><li><b>Choose</b> what you do</li></ol>
        <div class="t-chips"><span>📺 8 events</span><span>🔍 8 checks</span><span>⏱️ 20 min</span></div>
        <p class="goal"><b>Goal:</b> explain why the U.S. fought in Vietnam and how the war divided Americans at home.</p>
        <div class="t-start"><label for="nameBox">Your name</label>
        <div class="t-row"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}">
        <button type="button" class="go start" id="startBtn">Start →</button></div>
        <p id="introMsg" class="msg" role="status"></p></div>
        <p class="fict">Your family is made up. Every event, date, and quote is real.</p>
      </div>
      <div class="t-art" aria-hidden="true">${famBoard(ROUNDS[0])}</div></div></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg try"; $("nameBox").focus(); return; }
      st.name = fixed; save(); goStep(1);
    };
  }
  let first = true;
  function render() {
    clearTimeout(lockTimer);
    if (!first && $("welcome")) $("welcome").hidden = true;
    first = false;
    const app = $("app");
    if (st.step < 1) { hud(); return title(app); }
    if (st.step <= ROUNDS.length) roundScreen(app, st.step);
    else if (st.step === ROUNDS.length + 1) endingScreen(app);
    else memoScreen(app);
    hud();
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name, wasIn = st.turnedIn; st = fresh(); st.name = name; st.turnedIn = wasIn;   // Start over never re-opens turning in
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 1 && $("welcome")) {
    const nm = st.name || "";
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + nm + "! You're on step " + Math.min(st.step, STEPS) + " of " + STEPS + ".")}</span> <button type="button" class="notyou" id="notYouBtn">${esc("Not " + nm + "? Start fresh")}</button>`;
    $("welcome").hidden = false;
    $("notYouBtn").onclick = () => {
      st = fresh(); if (window.classFirstTry) window.classFirstTry.reset();
      try { localStorage.removeItem(KEY); localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      location.reload();
    };
  }
  window.addEventListener("resize", () => { if (st.step >= 1) document.documentElement.style.setProperty("--hudH", $("hud").offsetHeight + "px"); });
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => STEPS,
      index: () => Math.max(0, Math.min(st.step, STEPS) - 1),
      label: i => i < ROUNDS.length ? (i + 1) + ". " + ROUNDS[i].title : i === ROUNDS.length ? "How your family ends up" : "Your answers",
      go: i => { if (!st.name) st.name = "Test T."; st.step = i + 1; st.ph = "check"; save(); render(); window.scrollTo(0, 0); },
      solve: () => {
        const r = ROUNDS[st.step - 1]; if (!r) return;
        if (st.ph === "check") { justSolved = true; st.ph = r.compare ? "done" : "choice"; save(); render(); }
        else if (st.ph === "choice") { const b = document.querySelector("#cChoices .dcard"); if (b) b.click(); }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
