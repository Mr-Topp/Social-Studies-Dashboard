'use strict';
/* =====================================================================
   DECISION DESK · THE NEW RIGHT · U.S. History Unit 5 Day 2
   Reworked from Government's "Decision Desk: Ideology vs. Party".
   Standards: SS.9-12.US.46 (social movements, incl. reactionary movements)
              SS.9-12.US.49 (ideologies through primary sources, late 60s–1990)
   Round 1: Call It (4 real news cards: cut taxes / smaller government /
            traditional values / fight communism). Wrong = hint, retry.
   Round 2: Two Views (3 real debates: a supporter and a critic of a New
            Right goal, in their own words). Wrong = plain-words hint, retry.
   Then 2 short answers + optional Go deeper. 7 checks total.
   Everyone is real. No student opinions are collected. No scores shown.
   ===================================================================== */
(() => {
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const KEY = 'ush-u5d2-newright-v1';
const ASSIGN = 'ush-u5-d2-new-right';
const TITLE = 'U.S. History Unit 5 · Day 2 · Decision Desk: The New Right';
const STD = 'SS.9-12.US.46, SS.9-12.US.49';
const OLD_API = 'https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit';

/* ---------------- DATA ---------------- */
const GOALS = {
  tax: { b: '💵 CUT TAXES', s: 'lower tax rates', w: 'cut taxes', c: '#16a34a' },
  gov: { b: '🏛️ SMALLER GOVERNMENT', s: 'fewer programs and rules', w: 'smaller government', c: '#2563eb' },
  val: { b: '⛪ TRADITIONAL VALUES', s: 'faith · family · tradition', w: 'traditional values', c: '#9333ea' },
  com: { b: '🛡️ FIGHT COMMUNISM', s: 'stand up to the Soviets', w: 'fight communism', c: '#dc2626' }
};
const GKEYS = ['tax', 'gov', 'val', 'com'];
// Real events and words only. One card from each goal is drawn each game.
const ITEMS = [
  // ---- cut taxes ----
  { id: 'tx1', g: 'tax', t: '1981: Reagan signs a law cutting income tax rates about 25% over three years.', hint: 'What is being cut here: what people PAY, or what the government SPENDS?', why: 'Lower tax rates = cut taxes. (The Economic Recovery Tax Act of 1981.)' },
  { id: 'tx2', g: 'tax', t: '1981: The top income tax rate drops from 70% to 50%.', hint: 'A "rate" is how much of each dollar people pay. Which goal is about that?', why: 'People with the biggest incomes pay a smaller share = cut taxes.' },
  { id: 'tx3', g: 'tax', t: '1978: California voters pass Proposition 13 and slash property taxes.', hint: 'What did voters slash? Which goal fits that?', why: 'Prop 13 started a "tax revolt" that helped the New Right grow = cut taxes.' },
  { id: 'tx4', g: 'tax', t: 'The "supply-side" idea: if people keep more of each paycheck, they will work, save, and invest more.', hint: 'Keeping more of each paycheck means paying less of what?', why: 'Supply-side economics was the New Right\'s reason for lower tax rates.' },
  { id: 'tx5', g: 'tax', t: '1986: A new law drops the top income tax rate to 28%.', hint: 'A "rate" is how much of each dollar people pay. Which goal is about that?', why: 'A lower top rate = cut taxes. (The Tax Reform Act of 1986.)' },
  // ---- smaller government ----
  { id: 'gv1', g: 'gov', t: '"Government is not the solution to our problem; government is the problem." (Reagan, 1981)', hint: 'Reagan says government itself is the problem. So what should happen to it?', why: 'Reagan said this in his first speech as president. Less government = smaller government.' },
  { id: 'gv2', g: 'gov', t: '1981: Reagan\'s budget cuts spending on food stamps and school lunches.', hint: 'Is this about what people PAY, or what the government SPENDS on programs?', why: 'Tricky! It\'s about money, but it\'s what government SPENDS, not what people pay. Fewer programs = smaller government.' },
  { id: 'gv3', g: 'gov', t: '1981: Reagan ends government limits on oil and gas prices.', hint: 'Those limits were government rules. What happens when rules end?', why: 'Getting rid of government rules on business is called deregulation = smaller government.' },
  { id: 'gv4', g: 'gov', t: '1982: Reagan\'s "New Federalism" plan hands programs back to the states.', hint: 'Who loses power here: Washington, D.C., or the states?', why: 'Less power for the national government = smaller government.' },
  { id: 'gv5', g: 'gov', t: 'Reagan jokes that the 9 scariest words are: "I\'m from the Government, and I\'m here to help." (1986)', hint: 'Does Reagan want MORE government help or LESS?', why: 'Reagan joked that government "help" makes things worse = smaller government.' },
  // ---- traditional values ----
  { id: 'vl1', g: 'val', t: '1979: Rev. Jerry Falwell starts the Moral Majority to get Christian conservatives to vote.', hint: 'Who is this group for? What did those voters care about most?', why: 'Tricky! It\'s about voting, but the group fought for faith and family = traditional values.' },
  { id: 'vl2', g: 'val', t: '1972: Phyllis Schlafly starts STOP ERA to block the Equal Rights Amendment.', hint: 'The ERA was about women\'s roles. Schlafly wanted to keep the old ones.', why: 'Schlafly said the ERA would hurt women\'s traditional roles and the family = traditional values.' },
  { id: 'vl3', g: 'val', t: '1982: Reagan asks Congress to change the Constitution to allow group prayer in public schools.', hint: 'Prayer is about faith. Which goal is about faith and family?', why: 'Tricky! It would change the Constitution, but the goal was religion in schools = traditional values.' },
  { id: 'vl4', g: 'val', t: 'New Right groups fight to undo Roe v. Wade, the 1973 Supreme Court case that made abortion legal.', hint: 'Religious conservatives saw this as a moral issue. Which goal fits?', why: 'Ending legal abortion was a top goal of religious conservatives = traditional values.' },
  { id: 'vl5', g: 'val', t: 'Falwell says Moral Majority members are "pro-life and pro-traditional family." (1980)', hint: 'Look at the words "pro-traditional family."', why: 'Pro-life and pro-family = traditional values.' },
  // ---- fight communism ----
  { id: 'cm1', g: 'com', t: '1983: Speaking to Christian ministers, Reagan calls the Soviet Union an "evil empire."', hint: 'Who is Reagan talking ABOUT, not who is listening?', why: 'Tricky! He spoke to ministers, but his target was the Soviet Union = fight communism.' },
  { id: 'cm2', g: 'com', t: 'Reagan cuts many programs but spends MORE on new bombers, missiles, and ships.', hint: 'Who were all those bombers and missiles meant to stop?', why: 'Tricky! That\'s MORE spending, but on the military to face the Soviets = fight communism.' },
  { id: 'cm3', g: 'com', t: '1983: Reagan announces "Star Wars" (SDI), a plan to block Soviet missiles from space.', hint: 'Whose missiles is it meant to block?', why: 'A shield against Soviet missiles = fight communism.' },
  { id: 'cm4', g: 'com', t: 'The New Right says détente, the 1970s plan to get along with the Soviets, was too soft.', hint: 'They want to be tougher on which country?', why: 'They wanted to stand up to the Soviet Union, not make deals = fight communism.' },
  { id: 'cm5', g: 'com', t: 'Reagan sends weapons to rebels fighting the Soviet army in Afghanistan.', hint: 'The rebels are fighting which country\'s army?', why: 'Helping fighters against the Soviets (the Reagan Doctrine) = fight communism.' }
];
const ITEM = Object.fromEntries(ITEMS.map(i => [i.id, i]));
function newDeck() { return shuffle(GKEYS.map(g => shuffle(ITEMS.filter(i => i.g === g))[0].id)); }

// Two Views: a real supporter and a real critic of one New Right goal.
// Each check asks about ONE side; the other side's view is a distractor.
const PAIRS = [
  { id: 'tax', icon: '💵', goal: 'Cut income taxes',
    sup: { name: 'Ronald Reagan', role: 'President · Republican', year: 1981, q: 'It\'ll take time for the effect of the tax rate reductions to be felt in increased savings, productivity, and new jobs.', plain: 'Give the tax cuts time. People will save more, and there will be more jobs.', words: 'productivity = how much work gets done' },
    cri: { name: 'Ted Kennedy', role: 'Senator · Democrat', year: 1980, q: 'It is good news for any of you with incomes over $200,000 a year. … But the Republican tax cut is bad news for the middle income families.', plain: 'The tax cut helps rich people a lot. It does little for regular families.', words: 'middle income = regular, in-between families' },
    ask: 'cri', right: 'a', hint: 'Who does Kennedy say gets "good news"? Who gets "bad news"?',
    opts: { a: 'The biggest winners are people who already earn the most.', b: 'It will lead to more saving and new jobs over time.', c: 'It takes too long before anybody feels the tax cut.', d: 'It raises taxes on middle-income families to pay for the army.' },
    fact: 'Real life: The 1981 law cut tax rates about 25%. The top rate fell from 70% to 50%. Even George H.W. Bush, later Reagan\'s vice president, had called the plan "voodoo economic policy" (1980).' },
  { id: 'mm', icon: '⛪', goal: 'Traditional values in politics',
    sup: { name: 'Jerry Falwell', role: 'Founder, Moral Majority', year: 1980, q: 'They\'re pro-life and pro-traditional family. … What we want is not control, it is influence.', plain: 'Our members are against abortion and for traditional families. We want a say in the laws.', words: 'pro-life = against abortion · influence = a say' },
    cri: { name: 'Barry Goldwater', role: 'Senator · Republican', year: 1981, q: 'I\'m frankly sick and tired of the political preachers across this country telling me as a citizen that if I want to be a moral person, I must believe in A, B, C and D.', plain: 'Preachers should not tell citizens what they have to believe on every issue.', words: 'A, B, C and D = a whole list of positions' },
    ask: 'cri', right: 'a', hint: 'Goldwater is "sick and tired" of someone. Who? What are they telling him?',
    opts: { a: 'Religious leaders shouldn\'t decide one right view for every voter.', b: 'The country needs to return to faith and traditional families.', c: 'Preachers should run for office instead of just giving speeches.', d: 'Moral people should believe in fewer laws and a smaller government.' },
    fact: 'Real life: Goldwater was "Mr. Conservative." He wanted low taxes and a strong military too. But in 1981 he said, "I don\'t like the New Right and what it is doing."' },
  { id: 'era', icon: '👩', goal: 'Stop the Equal Rights Amendment (ERA)',
    sup: { name: 'Phyllis Schlafly', role: 'Founder, STOP ERA', year: 1972, q: 'Of all the classes of people who ever lived, the American woman is the most privileged.', plain: 'American women already have special protections. The ERA could take them away.', words: 'privileged = has special advantages' },
    cri: { name: 'Shirley Chisholm', role: 'Congresswoman · Democrat', year: 1969, q: 'Women need no protection that men do not need.', plain: 'Women don\'t need special treatment. They need the same rights as men.', words: 'ERA = Equal Rights Amendment' },
    ask: 'sup', right: 'a', hint: 'Schlafly says American women are better off than anyone in history. Would she want to change that?',
    opts: { a: 'Women already have it better than anyone. The ERA could undo that.', b: 'Women should have exactly the same rights and duties as men.', c: 'The most privileged women would lose their good jobs under the ERA.', d: 'The ERA is fine, but each state should decide it on its own.' },
    fact: 'Real life: Congress passed the ERA in 1972. It needed 38 states. By the 1982 deadline it had 35. STOP ERA helped block it.' }
];

/* ---------------- STATE ---------------- */
const fresh = () => ({ v: 1, phase: 'title', primer: 0, name: '', queue: newDeck(), r1: {}, ftSort: [], btnOrder: null, pairOrder: [0, 1, 2], pi: 0, r2: {}, writing: {}, turnedIn: false, lockUntil: 0 });
let st;
try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
if (!st || st.v !== 1) st = fresh();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

const tray = $('#tray');
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2600); }
const r1Done = () => (st.r1Count || 0);
function hud() {
  const T = { r1: 'Round 1 · Call It', r2: 'Round 2 · Two Views', final: 'Last step · Write' };
  $('#shiftPill').textContent = T[st.phase] || '';
  $('#countPill').textContent = st.phase === 'r1' ? 'Card ' + Math.min(4, r1Done() + 1) + ' of 4' : st.phase === 'r2' ? 'Debate ' + Math.min(PAIRS.length, st.pi + 1) + ' of ' + PAIRS.length : '';
}

/* wrong-answer pause (survives reload) */
function pause(btnsRoot, fb, msg, done, keep) {
  btnsRoot.querySelectorAll('button').forEach(b => b.disabled = true);
  if (!keep) { st.lockUntil = Date.now() + 1500; st.lockMsg = msg; save(); }
  const tick = () => { const left = Math.ceil((st.lockUntil - Date.now()) / 1000); if (left <= 0) { st.lockUntil = 0; save(); return done(); } fb.className = 'fb oops'; fb.innerHTML = msg + ' <span class="cd">(' + left + ')</span>'; setTimeout(tick, 150); };
  tick();
}
const locked = () => (st.lockUntil || 0) > Date.now();
function guardNext(fn) { const b = $('#nx'), t = Date.now(); b.onclick = () => { if (Date.now() - t < 450) return; b.onclick = null; fn(); }; }

/* ---------------- FLOW ---------------- */
function render() { document.body.classList.toggle('finalmode', st.phase === 'final'); $('#title').hidden = st.phase !== 'title'; document.body.classList.toggle('titlemode', st.phase === 'title'); hud(); ({ title: pTitle, intro: pIntro, r1: pR1, r2: pR2, final: pFinal })[st.phase](); }

function pTitle() {
  tray.innerHTML = ''; $('#item').hidden = true; SCENE.show('title');
  $('#title').hidden = false;
  $('#playBtn').onclick = () => { $('#title').hidden = true; st.phase = 'intro'; save(); render(); };
}
function pIntro() {
  $('#title').hidden = true; $('#item').hidden = true; tray.innerHTML = ''; SCENE.show('title');
  const card = $('#card'); card.className = 'card brief';
  if (!st.name) {
    card.innerHTML = `<p class="eyebrow">SIGN IN TO THE DESK</p><h2>Who's making the calls tonight?</h2><label for="nm">Your name (first name + last initial)</label><input id="nm" maxlength="40" autocomplete="off" placeholder="Jordan M."><p class="fb" id="nmMsg"></p><button class="primary go" id="go">Let's go →</button>`;
    const go = () => {
      const n = window.classShortName ? classShortName($('#nm').value) : $('#nm').value.trim();
      if (!/^\S+ [A-Z]\.$/.test(n)) { $('#nmMsg').className = 'fb oops'; $('#nmMsg').textContent = 'Type your first name and last initial, like Jordan M.'; return; }
      st.name = n; if (window.classFirstTry && !st.ftStarted) { classFirstTry.reset(); st.ftStarted = true; } save(); pIntro();
    };
    $('#go').onclick = go; $('#nm').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  } else if (!st.primer) {
    card.innerHTML = `<p class="eyebrow">BRIEFING 1 OF 2</p><h2>Who was the New Right?</h2>
    <p class="lead">A <b>conservative movement</b> in the 1970s and 80s. It pulled three groups together:</p>
    <div class="trio">
      <div><b>⛪ Christian conservatives</b><span>Jerry Falwell started the <b>Moral Majority</b> (1979).</span></div>
      <div><b>👩 Women against the ERA</b><span>Phyllis Schlafly started <b>STOP ERA</b> (1972).</span></div>
      <div><b>💵 Tax-cutters &amp; anti-communists</b><span><b>Ronald Reagan</b> was their hero. President 1981–89.</span></div>
    </div>
    <p class="lead">They felt the country had changed too fast in the 1960s and 70s. They wanted to push back.</p>
    <button class="primary go" id="go">Next →</button>`;
    $('#go').onclick = () => { st.primer = 1; save(); pIntro(); };
  } else {
    card.innerHTML = `<p class="eyebrow">BRIEFING 2 OF 2</p><h2>Four big goals</h2>
    <div class="goalgrid">${GKEYS.map(k => `<div class="g-${k}"><b>${GOALS[k].b}</b><span>${GOALS[k].s}</span></div>`).join('')}</div>
    <p class="lead">News cards are coming in. <b>Call each one:</b> which goal is it about? Watch for tricky ones.</p>
    <button class="primary go" id="go">Open the desk →</button>`;
    $('#go').onclick = () => { st.phase = 'r1'; save(); $('#overlay').hidden = true; render(); };
  }
  $('#overlay').hidden = false;
  const nm = $('#nm'); if (nm) setTimeout(() => nm.focus(), 50);
}

/* ---- Round 1: Call It (4 cards, one per goal; wrong = hint + retry) ---- */
let r1Busy = false;
function pR1() {
  $('#overlay').hidden = true;
  const id = st.queue[0];
  if (!id) return roundDone('r2', 'All 4 calls made.', 'Next: Two Views. A real supporter and a real critic talk about the same New Right goal. Read their words. Make the call.');
  const it = ITEM[id];
  SCENE.show('r1');
  const card = $('#item'); card.hidden = false; card.className = 'itemcard'; card.style.transform = ''; card.style.opacity = ''; card.style.transition = '';
  card.innerHTML = `<span class="who"><i class="dot"></i> INCOMING · CALL IT</span><span class="txt">${esc(it.t)}</span>`;
  const draw = () => {
    const order = st.btnOrder || (st.btnOrder = shuffle(GKEYS));
    tray.innerHTML = `<div class="rhead"><span class="rtag">CALL IT</span><span>Which New Right goal is this card about?</span></div>
    <div class="callbtns four">${order.map((k, i) => `<button class="g-${k}" data-g="${k}"><kbd>${i + 1}</kbd>${GOALS[k].b}<small>${GOALS[k].s}</small></button>`).join('')}</div><p class="fb${st.hintFor === id ? ' oops' : ''}" id="fb">${st.hintFor === id ? '💡 ' + esc(it.hint) + ' Try again.' : ''}</p>`;
    st.shownAt = Date.now(); r1Busy = false;
    tray.querySelectorAll('[data-g]').forEach(b => b.onclick = () => sort(b.dataset.g));
  };
  draw(); pR1.draw = draw;
  if (locked()) pause(tray, $('#fb'), st.lockMsg, draw, true);
}
function sort(g) {
  if (r1Busy || locked() || st.phase !== 'r1' || Date.now() - (st.shownAt || 0) < 600) return;
  const id = st.queue[0], it = ITEM[id]; if (!it) return;
  const rec = st.r1[id] || (st.r1[id] = { wrong: 0, picks: [] });
  const card = $('#item');
  if (g === it.g) {
    r1Busy = true; if (window.classFirstTry) classFirstTry.right('sort-' + id);
    if (!rec.done) { rec.done = true; if (st.ftSort.length < 4 && !st.ftSort.some(x => x.id === id)) st.ftSort.push({ id, ok: rec.wrong === 0, wrong: rec.wrong, picks: rec.picks.slice() }); }
    st.r1Count = (st.r1Count || 0) + 1; st.queue.shift(); st.btnOrder = null; st.hintFor = null; save();
    flyTo(card, g); SCENE.call(g);
    tray.querySelectorAll('[data-g]').forEach(b => b.disabled = true);
    $('#fb').className = 'fb yay'; $('#fb').textContent = '✓ ' + it.why;
    hud();
    setTimeout(() => render(), 2300);
  } else {
    if (window.classFirstTry) classFirstTry.wrong();
    rec.wrong++; rec.picks.push(g); st.btnOrder = null; save();
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    SCENE.oops();
    st.hintFor = id; save();
    pause(tray, $('#fb'), 'Not quite. 💡 ' + esc(it.hint), pR1.draw);
  }
}
function flyTo(card, g) {
  const sc = $('.scene').getBoundingClientRect(), cr = card.getBoundingClientRect(), b = SCENE.boxCenter(g);
  const dx = b.x * sc.width - (cr.left - sc.left + cr.width / 2), dy = b.y * sc.height - (cr.top - sc.top + cr.height / 2);
  card.style.transition = 'transform .5s ease-in, opacity .5s ease-in';
  card.style.transform = `translate(calc(-50% + ${dx}px), ${dy}px) scale(.25)`; card.style.opacity = '0';
}
document.addEventListener('keydown', e => {
  if (st.phase !== 'r1' || !$('#overlay').hidden || $('#helpDialog').open) return;
  const n = { '1': 0, '2': 1, '3': 2, '4': 3 }[e.key]; if (n == null || !st.btnOrder) return;
  e.preventDefault(); sort(st.btnOrder[n]);
});

function roundDone(next, title, line) {
  $('#item').hidden = true; tray.innerHTML = '';
  SCENE.confetti();
  const card = $('#card'); card.className = 'card brief';
  card.innerHTML = `<p class="eyebrow">ROUND COMPLETE</p><h2>${esc(title)}</h2><p class="lead">${esc(line)}</p><button class="primary go" id="go">Next round →</button>`;
  $('#overlay').hidden = false;
  st.phase = next; save();
  $('#go').onclick = () => { $('#overlay').hidden = true; render(); };
}

/* ---- Round 2: Two Views ---- */
function sideHTML(p, k) {
  const s = p[k];
  return `<div class="side ${k}"><span class="tag">${k === 'sup' ? '👍 SUPPORTER' : '👎 CRITIC'}</span><b class="nm">${esc(s.name)}</b><small>${esc(s.role)} · ${s.year}</small><q>${esc(s.q)}</q>${s.words ? `<span class="wordhelp">📖 ${esc(s.words)}</span>` : ''}</div>`;
}
function pR2() {
  $('#overlay').hidden = true;
  const pi = st.pairOrder[st.pi], p = PAIRS[pi];
  if (!p) { st.phase = 'final'; save(); return render(); }
  SCENE.show('r2', p);
  const r = st.r2[p.id] || (st.r2[p.id] = { wrong: 0, done: false, picks: [] });
  const item = $('#item'); item.hidden = false; item.className = 'itemcard split'; item.style.transform = ''; item.style.opacity = ''; item.style.transition = '';
  item.innerHTML = `<span class="who">TWO VIEWS · ${esc(p.icon)} GOAL: ${esc(p.goal.toUpperCase())}</span><div class="sides">${sideHTML(p, 'sup')}${sideHTML(p, 'cri')}</div>`;
  if (r.done) return r2Result(p);
  const who = p[p.ask];
  const q = p.ask === 'cri' ? `What was ${who.name}'s main worry?` : `Why did ${who.name} want this goal?`;
  const draw = () => {
    tray.innerHTML = `<div class="rhead"><span class="rtag">TWO VIEWS</span><span>Read ${esc(who.name)}'s real words above.</span></div>
    <h2>${esc(q)}</h2>
    <div class="chips">${(r.opt || (r.opt = shuffle(Object.keys(p.opts)))).map(k => `<button data-k="${k}">${esc(p.opts[k])}</button>`).join('')}</div><p class="fb${r.wrong ? ' oops' : ''}" id="fb">${r.wrong ? '💡 ' + esc(p.hint) + ' Try again.' : ''}</p>`;
    tray.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      if (b.dataset.k === p.right) {
        r.done = true; delete r.opt; if (window.classFirstTry) classFirstTry.right('view-' + p.id);
        if (!st.ftView) st.ftView = {}; if (!(p.id in st.ftView)) st.ftView[p.id] = { ok: r.wrong === 0, wrong: r.wrong };
        save(); SCENE.ping(); r2Result(p);
      } else {
        r.wrong++; r.picks.push(b.dataset.k); delete r.opt; if (window.classFirstTry) classFirstTry.wrong(); save(); SCENE.oops();
        pause(tray, $('#fb'), 'Not quite. 💡 ' + esc(p.hint), draw);
      }
    });
  };
  save(); draw();
  if (locked()) pause(tray, $('#fb'), st.lockMsg, draw, true);
}
function r2Result(p) {
  tray.innerHTML = `<div class="rhead"><span class="rtag">TWO VIEWS</span><span class="okline">✓ ${esc(p.opts[p.right])}</span><button class="primary nxtop" id="nx">${st.pi < PAIRS.length - 1 ? 'Next debate →' : 'Last step →'}</button></div>
  <div class="views"><p><b>👍 ${esc(p.sup.name)}:</b> ${esc(p.sup.plain)}</p><p><b>👎 ${esc(p.cri.name)}:</b> ${esc(p.cri.plain)}</p></div>
  <p class="note">${esc(p.fact)}</p>`;
  guardNext(() => { st.pi++; save(); render(); });
}

/* ---- Final + turn in ---- */
const GOAL_WORDS = ['tax', 'taxes', 'government', 'program', 'programs', 'spending', 'rules', 'regulation', 'regulations', 'deregulation', 'prayer', 'religion', 'religious', 'faith', 'god', 'church', 'christian', 'family', 'families', 'values', 'traditional', 'tradition', 'abortion', 'era', 'equal rights', 'amendment', 'communism', 'communist', 'communists', 'soviet', 'soviets', 'military', 'defense', 'lunch', 'lunches', 'food stamps', 'pro-life', 'moral'];
const PEOPLE = ['reagan', 'falwell', 'moral majority', 'schlafly', 'stop era', 'christian', 'christians', 'evangelical', 'evangelicals', 'religious', 'conservative', 'conservatives', 'republican', 'republicans', 'goldwater'];
const PROMPTS = [
  { id: 'who', std: 'US.46', short: 'Who was the New Right', label: '1. Who was the New Right? Name one person or group in it, and one goal they had.', stem: 'The New Right was ___. One example is ___, who wanted ___.', min: 80,
    must: [PEOPLE, ['reagan', 'falwell', 'moral majority', 'schlafly', 'stop era', 'goldwater'], GOAL_WORDS],
    msg: 'In answer 1, say who the New Right was, name one real person or group (like Reagan, Falwell, or Schlafly), and name one goal.' },
  { id: 'views', std: 'US.49', short: 'Supporters vs. critics', label: '2. Pick one debate from Two Views. What did the supporter say about the goal? What did the critic say?', stem: 'For the goal of ___, the supporter ___ said ___. But the critic ___ said ___ because ___.', min: 110,
    must: [['reagan', 'falwell', 'schlafly', 'supporter', 'supporters', 'support', 'supported'], ['kennedy', 'goldwater', 'chisholm', 'critic', 'critics', 'against', 'opposed', 'disagreed', 'worried'], GOAL_WORDS],
    msg: 'In answer 2, name the goal, tell what the SUPPORTER said, and tell what the CRITIC said (use their names, like Reagan and Kennedy).', two: true },
  { id: 'deep', std: 'US.49', optional: true, short: '⭐ Go deeper', label: '⭐ Go deeper (optional): Barry Goldwater was a conservative Republican, but he criticized the New Right. How could someone agree with some New Right goals but not others? Use Goldwater and two goals from today.', stem: 'Goldwater agreed with ___ because ___. But he disagreed with ___ because ___.', min: 120,
    must: [['goldwater'], GOAL_WORDS, ['agree', 'agreed', 'agrees', 'liked', 'supported', 'wanted', 'disagree', 'disagreed', 'against', 'criticized', 'opposed', 'but']],
    msg: 'For Go deeper, use Goldwater and two goals: one he agreed with and one he did not, with "because."', two: true }
];
function tally() {
  const sortOk = st.ftSort.filter(x => x.ok).length, sortN = Math.max(st.ftSort.length, 4);
  const fv = st.ftView || {}, viewOk = PAIRS.filter(p => fv[p.id] && fv[p.id].ok).length;
  return { sortOk, sortN, viewOk, viewN: PAIRS.length, tot: [sortOk + viewOk, sortN + PAIRS.length] };
}
function pFinal() {
  $('#item').hidden = true; SCENE.show('final'); SCENE.confetti();
  tray.classList.add('final-tray');
  tray.innerHTML = `<div class="final"><div><p class="eyebrow">LAST STEP</p><h2 class="donehead">Desk report</h2>
    <ul class="checks"><li>✓ Call It: 4 goals sorted</li><li>✓ Two Views: 3 debates</li><li>✍️ 2 short answers</li></ul>
    <p class="note">Use the starters. Look back at the debates if you need to:</p>
    <div class="peek">${PAIRS.map(p => `<details><summary>${esc(p.icon)} ${esc(p.goal)}</summary><p><b>👍 ${esc(p.sup.name)}:</b> ${esc(p.sup.plain)}</p><p><b>👎 ${esc(p.cri.name)}:</b> ${esc(p.cri.plain)}</p></details>`).join('')}</div></div>
    <div>${PROMPTS.map(p => `<div class="pblock${p.optional ? ' opt' + (st.writing.deep || st.showDeep ? ' open' : '') : ''}">${p.optional ? '<button class="optbtn" id="optBtn" type="button">⭐ Want a challenge? Try the Go deeper question (optional)</button>' : ''}<label for="w_${p.id}" class="pl" style="font-weight:850;margin:10px 0 2px${p.optional ? ';color:#7a5800' : ''}">${esc(p.label)}</label><p class="stem">Starter: ${esc(p.stem)}</p><textarea id="w_${p.id}">${esc(st.writing[p.id] || '')}</textarea></div>`).join('')}
    <button class="primary go" id="sendBtn">${st.turnedIn ? 'Turn in again' : 'Turn in'}</button><p class="fb ${st.turnedIn ? 'yay' : ''}" id="sendMsg">${st.turnedIn ? '✓ Turned in. You can fix your answers and turn in again.' : ''}</p></div></div>`;
  PROMPTS.forEach(p => $('#w_' + p.id).addEventListener('input', e => { st.writing[p.id] = e.target.value; save(); }));
  $('#optBtn').onclick = () => { st.showDeep = true; save(); $('.pblock.opt').classList.add('open'); $('#w_deep').focus(); };
  $('#sendBtn').onclick = turnIn;
}
const hasWord = (t, w) => new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (w.length > 4 ? '' : '(s|es|ed|ing)?\\b')).test(t);
function checkWriting(p, v) {
  const t = v.toLowerCase();
  if (p.optional && !v.trim()) return '';
  // Shared junk check (shared/turnin.js) first: idk, mashing, repeats, filler, copied question, bare keyword lists.
  if (window.classJunkStop) { const j = window.classJunkStop(document.getElementById('w_' + p.id), { prompt: p.label, starter: p.stem, source: 'from the game' }); if (j) return 'For ' + p.short + ': ' + j; }
  if (/\b[bcdfghjklmnpqrstvwxz]{5,}\b/.test(t)) return 'Some of that isn\'t real words. Write a real answer for: ' + p.short + '.';
  if (/\b(idk|idc|lol|lmao|lmfao|bruh|asdf|dunno|bathroom|blah|bye|boring|stupid|dumb|smells?|fr)\b|ok done/.test(t)) return 'Write a real answer for: ' + p.short + '. Use the starter to help.';
  if (/_{2,}/.test(v)) return 'Replace the ___ blanks with your own words in: ' + p.short + '.';
  if (v.length < p.min) return 'Write a little more for: ' + p.short + ' (2 full sentences).';
  if ((v.match(/[a-z0-9)"'”][.!?](\s|$)/gi) || []).length < 2) return 'Write at least 2 full sentences for: ' + p.short + '.';
  const stem = new Set(p.stem.toLowerCase().match(/[a-z']+/g) || []);
  if (new Set((t.match(/[a-z']{3,}/g) || []).filter(w => !stem.has(w))).size < 6) return 'Add more of your own words for: ' + p.short + '.';
  if (p.must.some(g => !g.some(w => hasWord(t, w)))) return p.msg;
  if (p.two && !/\b(because|since|so|said|worried|thought|felt|believed)\b/.test(t)) return 'In ' + p.short + ', use "because" to explain the reason.';
  return '';
}
async function turnIn() {
  const msg = $('#sendMsg');
  const testT = window.classIsTestT && window.classIsTestT();   // Test T. (teacher) skips the writing rules
  for (const p of (testT ? [] : PROMPTS)) { const v = ($('#w_' + p.id).value || '').trim(); const bad = checkWriting(p, v); if (bad) { msg.className = 'fb oops'; msg.textContent = bad; $('#w_' + p.id).focus(); return; } }
  const t = tally(), deep = ((($('#w_deep') || {}).value || '').trim());
  const answers = { 'Standard': STD,
    'First-try correct': t.tot[0] + ' of ' + t.tot[1] + ' (Call It + Two Views)',
    'First-try by standard': 'US.46 (Call It: New Right goals): ' + t.sortOk + ' of ' + t.sortN + ' · US.49 (Two Views: real supporters and critics): ' + t.viewOk + ' of ' + t.viewN,
    'Suggested level (check the writing)': (() => { const pct = t.tot[1] ? t.tot[0] / t.tot[1] : 0; return (pct >= .7 ? 'Level 3' : pct >= .45 ? 'Level 2' : 'Level 1') + ' from first-try ' + Math.round(pct * 100) + '%' + (deep ? ' · Go deeper answered (Level 4 evidence?), read it' : ''); })() };
  answers['Call It (first set)'] = st.ftSort.map(x => { const it = ITEM[x.id]; return '"' + it.t.replace(/[“”"]/g, '') + '" = ' + GOALS[it.g].w + (x.ok ? ' (first try)' : ' (after ' + x.wrong + ' wrong: picked ' + x.picks.map(k => GOALS[k] ? GOALS[k].w : '?').join(', ') + ')'); }).join('; ') || 'none';
  PAIRS.forEach(p => { const f = (st.ftView || {})[p.id] || {}, r = st.r2[p.id] || {}; answers['Two Views · ' + p.goal] = (p.ask === 'cri' ? p.cri.name + '\'s worry' : p.sup.name + '\'s reason') + ': ' + p.opts[p.right] + (f.ok ? ' (first try)' : ' (after ' + (f.wrong || r.wrong || 0) + ' wrong' + ((r.picks || []).length ? ': picked "' + r.picks.map(k => p.opts[k]).join('", "') + '"' : '') + ')'); });
  if (st.resets) answers['Start over used'] = st.resets + 'x (first-try results kept from the first run)';
  PROMPTS.forEach(p => answers['Writing (' + p.std + '): ' + p.short] = ($('#w_' + p.id).value || '').trim() || (p.optional ? '(skipped)' : ''));
  $('#sendBtn').disabled = true; msg.className = 'fb'; msg.textContent = 'Sending your work…';
  try {
    const res = await classTurnIn(OLD_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGN, assignmentTitle: TITLE, answers }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Your work did not save. Try again.');
    const again = st.turnedIn; st.turnedIn = true; save(); SCENE.confetti();
    msg.className = 'fb yay'; msg.textContent = again ? '✓ Turned in again. Your teacher sees your newest answers.' : '✓ Turned in. Your teacher can see your work.';
    $('#sendBtn').textContent = '✓ Turned in'; $('#sendBtn').disabled = false;
  } catch (e) { msg.className = 'fb oops'; msg.textContent = e.message || 'Could not turn in. Try again.'; $('#sendBtn').disabled = false; }
}

/* =====================================================================
   SCENE: 1980s TV news studio. Dark set, four goal boards, a timeline.
   ===================================================================== */
const SCENE = (() => {
  const cv = $('#scene'), ctx = cv.getContext('2d'), H = 400; let W = 960;
  function fit() { const r = cv.parentElement.getBoundingClientRect(); if (!r.height) return; W = Math.max(760, Math.min(1600, Math.round(H * r.width / r.height))); cv.width = W; cv.height = H; }
  fit(); window.addEventListener('resize', fit);
  const C = { tax: '#22c55e', gov: '#3b82f6', val: '#a855f7', com: '#ef4444', sup: '#22c55e', cri: '#f59e0b' };
  const LBL = { tax: '💵 CUT TAXES', gov: '🏛️ SMALLER GOV\'T', val: '⛪ VALUES', com: '🛡️ VS. COMMUNISM' };
  let mode = 'title', pair = null, popT = performance.now(), oopsT = -9999, flash = { k: null, t: -9999 }, dots = [], conf = [], counts = { tax: 0, gov: 0, val: 0, com: 0 }, shown = { tax: 0, gov: 0, val: 0, com: 0 }, t0 = performance.now();
  const WORDS = ['TAX CUTS', 'SCHOOL PRAYER', 'STOP ERA', 'MORAL MAJORITY', 'DEFENSE', 'DEREGULATION', 'PROP 13', 'FAMILY', 'EVIL EMPIRE', 'SMALL GOVERNMENT', 'SUPPLY-SIDE', 'STAR WARS'].map((w, i) => ({ w, x: (i < 6 ? 0 : .6) + (i % 6) * .11, y: 40 + (i % 6) * 48, s: .012 + (i % 6) * .003 }));
  const TL = [[1972, 'STOP ERA'], [1978, 'Prop 13'], [1979, 'Moral Majority'], [1980, 'Reagan wins'], [1981, 'Tax cut'], [1983, '"Evil empire"']];
  function show(m, a) { if (m !== mode) { popT = performance.now(); if (mode !== 'title' && mode !== m) conf = []; } mode = m; if (m === 'r2') { if (a !== pair) popT = performance.now(); pair = a; } }
  function boxes() { const bw = Math.min(210, W * .2), gap = (W - bw * 4) / 5, o = {}; GKEYS.forEach((k, i) => { o[k] = { x: gap + i * (bw + gap), y: 236, w: bw, h: 84 }; }); return o; }
  function boxCenter(k) { const b = boxes()[k]; return { x: (b.x + b.w / 2) / W, y: (b.y + b.h / 2) / H }; }
  function call(k) { const b = boxes()[k]; dots.push({ k, x0: W / 2, y0: 120, x1: b.x + b.w / 2, y1: b.y + b.h / 2, t: performance.now() }); counts[k]++; }
  function ping() { flash = { k: 'pair', t: performance.now() }; }
  function oops() { oopsT = performance.now(); }
  function confetti() { for (let i = 0; i < 90; i++) conf.push({ x: Math.random() * W, y: -20 - Math.random() * 200, vx: (Math.random() - .5) * 1.5, vy: 1.5 + Math.random() * 2.5, c: [C.tax, C.gov, C.val, C.com, '#f8fafc'][i % 5], r: Math.random() * 6.28, w: 4 + Math.random() * 5 }); }
  function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
  function bg(now) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#081120'); g.addColorStop(1, '#13233d'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const glow = (x, col) => { const r = ctx.createRadialGradient(x, 210, 10, x, 210, W * .42); r.addColorStop(0, col); r.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H); };
    glow(0, 'rgba(59,130,246,.22)'); glow(W, 'rgba(168,85,247,.20)');
    const hz = 236; ctx.strokeStyle = 'rgba(148,180,230,.10)'; ctx.lineWidth = 1;
    for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(W / 2 + i * 14, hz); ctx.lineTo(W / 2 + i * W * .12, H); ctx.stroke(); }
    const off = (now / 2400) % 1;
    for (let i = 0; i < 9; i++) { const f = Math.pow((i + off) / 9, 2.2), y = hz + f * (H - hz); ctx.globalAlpha = .4 + f * .6; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.globalAlpha = 1;
    const sx = ((now / 7000) % 1) * (W + 400) - 200, sw = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0); sw.addColorStop(0, 'rgba(255,255,255,0)'); sw.addColorStop(.5, 'rgba(255,255,255,.035)'); sw.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = sw; ctx.fillRect(0, 0, W, H);
  }
  function timeline(y) {
    const x0 = W * .06, x1 = W * .84, g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, C.val); g.addColorStop(.35, C.tax); g.addColorStop(.7, C.gov); g.addColorStop(1, C.com);
    ctx.fillStyle = g; rr(x0, y, x1 - x0, 6, 3); ctx.fill();
    const px = yr => x0 + (yr - 1971) / (1984 - 1971) * (x1 - x0);
    ctx.textAlign = 'center';
    TL.forEach(([yr, lab], i) => { const x = px(yr), ty = y + ([0, 1, 0, 1, 0, 0][i] ? 42 : 22); ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(x, y + 3, 5, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(226,232,240,.35)'; ctx.beginPath(); ctx.moveTo(x, y + 8); ctx.lineTo(x, ty - 12); ctx.stroke(); ctx.font = '800 12px system-ui,Arial'; ctx.fillStyle = '#e2e8f0'; ctx.fillText(yr + ' ' + lab, x, ty); });
  }
  function board(b, label, col, n, hot) {
    ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = hot ? 28 : 10; ctx.fillStyle = 'rgba(10,20,38,.88)'; rr(b.x, b.y, b.w, b.h, 12); ctx.fill(); ctx.restore();
    ctx.strokeStyle = col; ctx.lineWidth = hot ? 3 : 1.5; rr(b.x, b.y, b.w, b.h, 12); ctx.stroke();
    ctx.fillStyle = col; rr(b.x, b.y, b.w, 24, [12, 12, 0, 0]); ctx.globalAlpha = .9; ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff'; ctx.font = '900 12.5px system-ui,Arial'; ctx.textAlign = 'center'; ctx.fillText(label, b.x + b.w / 2, b.y + 17);
    ctx.fillStyle = '#f8fafc'; ctx.font = '900 34px "Arial Black",system-ui,Arial'; ctx.fillText(n ? '✓'.repeat(n) : '·', b.x + b.w / 2, b.y + 66);
  }
  function draw(now) {
    const dt = Math.min(50, now - t0); t0 = now;
    bg(now);
    if (mode === 'title' || mode === 'intro') {
      ctx.textAlign = 'center';
      WORDS.forEach(o => { o.x += o.s * dt / 1000; if (o.x > 1.15) o.x -= 1.3; ctx.font = '900 30px "Arial Black",system-ui,Arial'; ctx.fillStyle = 'rgba(203,213,225,.07)'; ctx.fillText(o.w, o.x * W, o.y); });
      timeline(342);
    }
    if (mode === 'r1' || mode === 'final') {
      const B = boxes();
      GKEYS.forEach(k => { if (mode === 'final') shown[k] = counts[k]; board(B[k], LBL[k], C[k], shown[k], flash.k === k && now - flash.t < 700); });
    }
    if (mode === 'r2' && pair) {
      const pop = Math.min(1, (now - popT) / 400), e = 1 - Math.pow(1 - pop, 3);
      ctx.font = '900 15px system-ui,Arial'; const txt = pair.icon + '  ' + pair.goal.toUpperCase(), w = ctx.measureText(txt).width + 40, hot = flash.k === 'pair' && now - flash.t < 900;
      const y = 352 + (1 - e) * 30, shake = now - oopsT < 400 ? Math.sin((now - oopsT) / 25) * 5 : 0;
      ctx.save(); ctx.shadowColor = hot ? C.sup : '#a78bfa'; ctx.shadowBlur = hot ? 30 : 12; ctx.fillStyle = 'rgba(15,28,50,.94)'; rr(W / 2 - w / 2 + shake, y - 22, w, 40, 20); ctx.fill(); ctx.restore();
      ctx.strokeStyle = hot ? C.sup : '#a78bfa'; ctx.lineWidth = 1.5; rr(W / 2 - w / 2 + shake, y - 22, w, 40, 20); ctx.stroke();
      ctx.fillStyle = '#f1f5f9'; ctx.textAlign = 'center'; ctx.fillText(txt, W / 2 + shake, y + 4);
    }
    dots = dots.filter(d => { const p = Math.min(1, (now - d.t) / 520), e = 1 - Math.pow(1 - p, 3), x = d.x0 + (d.x1 - d.x0) * e, y = d.y0 + (d.y1 - d.y0) * e - Math.sin(p * Math.PI) * 50;
      ctx.save(); ctx.shadowColor = C[d.k]; ctx.shadowBlur = 20; ctx.fillStyle = C[d.k]; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill(); ctx.restore();
      if (p >= 1) { shown[d.k] = Math.min(counts[d.k], shown[d.k] + 1); flash = { k: d.k, t: now }; return false; } return true; });
    if (now - oopsT < 450) { const a = .16 * (1 - (now - oopsT) / 450), v = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, W * .7); v.addColorStop(0, 'rgba(245,158,11,0)'); v.addColorStop(1, 'rgba(245,158,11,' + a + ')'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H); }
    conf = conf.filter(p => { p.x += p.vx; p.y += p.vy; p.r += .08; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -2, p.w, 4); ctx.restore(); return p.y < H + 20; });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  // restore board ticks after a reload
  function sync() { GKEYS.forEach(k => { counts[k] = shown[k] = 0; }); Object.keys(st.r1 || {}).forEach(id => { const it = ITEM[id]; if (it && st.r1[id].done) { counts[it.g]++; shown[it.g]++; } }); }
  return { show, call, ping, oops, confetti, sync, boxCenter };
})();

/* ---------------- BOOT ---------------- */
$('#helpBtn').onclick = () => $('#helpDialog').showModal();
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => $('#' + b.dataset.close).close());
$('#resetBtn').onclick = () => {
  if (!confirm('Start over? This erases your progress on this device.')) return;
  const old = st; st = fresh(); st.name = old.name; st.ftStarted = old.ftStarted; st.phase = old.name ? 'intro' : 'title'; st.primer = 1;
  // Keep first-try results from the first run so the teacher sees the real first try.
  st.ftSort = old.ftSort || []; st.ftView = old.ftView || {}; st.resets = (old.resets || 0) + (old.phase === 'title' ? 0 : 1);
  save(); location.reload();
};
SCENE.sync();
render();

/* ---------------- Test T. skip bar (shared/turnin.js) ----------------
   The teacher signed in as Test T. can jump to any screen or answer the current card.
   Screens: 0-1 briefings · 2-5 Call It cards · 6-8 Two Views debates · 9 write + turn in. */
try {
  const R1 = 2, R2 = 6, FIN = 6 + PAIRS.length;
  (window.classTestHooks = window.classTestHooks || []).push({
    count: () => FIN + 1,
    index: () => {
      if (st.phase === 'title' || st.phase === 'intro') return st.primer ? 1 : 0;
      if (st.phase === 'r1') return Math.min(R2, R1 + 4 - st.queue.length);
      if (st.phase === 'r2') return Math.min(FIN - 1, R2 + st.pi);
      return FIN;
    },
    label: i => i === 0 ? 'Briefing 1: Who was the New Right?' : i === 1 ? 'Briefing 2: Four big goals' : i < R2 ? 'Call It · card ' + (i - R1 + 1) : i < FIN ? 'Two Views · ' + PAIRS[st.pairOrder[i - R2]].goal : 'Write + turn in',
    go: i => {
      if (!st.name) st.name = 'Test T.';
      st.lockUntil = 0; st.hintFor = null; st.btnOrder = null;
      if (i !== FIN) tray.classList.remove('final-tray');
      if (i < R1) { st.phase = 'intro'; st.primer = i; }
      else {
        $('#overlay').hidden = true;
        if (i < R2) {
          const deck = st.ttDeck || (st.ttDeck = Object.keys(st.r1).filter(id => st.r1[id].done).concat(st.queue).slice(0, 4));
          if (deck.length < 4) deck.splice(0, deck.length, ...newDeck());
          st.phase = 'r1'; st.queue = deck.slice(i - R1); st.r1Count = i - R1;
        } else if (i < FIN) { st.phase = 'r2'; st.pi = i - R2; }
        else st.phase = 'final';
      }
      save(); render();
    },
    solve: () => {
      st.lockUntil = 0;
      if (st.phase === 'r1' && st.queue[0]) { r1Busy = false; st.shownAt = 0; sort(ITEM[st.queue[0]].g); }
      else if (st.phase === 'r2') {
        const p = PAIRS[st.pairOrder[st.pi]]; if (!p) return;
        const r = st.r2[p.id] || (st.r2[p.id] = { wrong: 0, done: false, picks: [] });
        if (!r.done) { r.done = true; delete r.opt; save(); render(); }
      }
    }
  });
  if (window.classTestSkip) window.classTestSkip.refresh();
} catch (e) {}
})();
/* Read-aloud: a 🔊 button on every card and briefing. Uses the browser's built-in voice (works on Chromebooks). */
(() => {
  if (!('speechSynthesis' in window)) return;
  const clean = t => t.replace(/[\p{Extended_Pictographic}️]/gu, ' ').replace(/[“”"]/g, '').replace(/·/g, ',').replace(/\s+/g, ' ').trim();
  const textOf = el => {
    const c = el.cloneNode(true);
    c.querySelectorAll('button,input,label,.eyebrow').forEach(x => x.remove());
    c.querySelectorAll('li,p,h2,div,.txt,.tag,.nm,small,q,span').forEach(x => x.append('. '));
    return clean(c.textContent).replace(/(\.\s*)+/g, '. ').replace(/\s+\./g, '.');
  };
  const speak = el => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(textOf(el)); u.rate = 0.95; u.lang = 'en-US'; speechSynthesis.speak(u); };
  const add = el => {
    if (!el || el.hidden || !el.firstElementChild || el.querySelector(':scope > .say')) return;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'say'; b.title = 'Read it to me'; b.setAttribute('aria-label', 'Read it to me'); b.textContent = '🔊';
    b.addEventListener('click', e => { e.stopPropagation(); speak(el); });
    el.prepend(b);
  };
  ['item', 'card'].forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    new MutationObserver(() => { speechSynthesis.cancel(); add(el); }).observe(el, { childList: true });
    new MutationObserver(() => add(el)).observe(el, { attributes: true, attributeFilter: ['hidden'] });
    add(el);
  });
})();
/* Double-click guard: ignore clicks for a moment right after a screen redraws,
   so a double-click can't answer the next question before the student sees it. */
(() => {
  let changed = 0;
  const mark = () => { changed = performance.now(); };
  ['tray', 'card'].forEach(id => { const el = document.getElementById(id); if (el) new MutationObserver(mark).observe(el, { childList: true }); });
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('#tray button, #card button');
    if (b && performance.now() - changed < 350) { e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);
})();
