'use strict';
/* =====================================================================
   TENT OR BOOTH? · Government Unit 2 Day 1 · SS.9-12.Gov.12
   Ideology (a set of beliefs) vs. political party (an organized group
   that runs candidates). Round 1: Sort Rush. Round 2: Same Ideas,
   Different Booths (why people with one ideology join different parties).
   Round 3: Make It a Party. No student opinions are collected.
   Real Iowa facts used: parties hold precinct caucuses; parties adopt
   platforms at state conventions; a candidate's party is printed next to
   their name on Iowa's general election ballot. Fairgoers are made up.
   ===================================================================== */
(() => {
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const KEY = 'gov-u2d1-tentbooth-v1';
const ASSIGN = 'gov-unit2-day1-the-feed';
const OLD_API = 'https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit';

/* ---------------- DATA ---------------- */
// Tent = a BELIEF (ideology). Booth = something an organized TEAM does to win elections (party).
// Formats are mixed on purpose (quotes and descriptions on both sides) so the wording doesn't give the answer away.
const ITEMS = [
  { id: 'i1', side: 'tent', t: '“$7.25 an hour is a joke. Pay should go up.”', why: 'That\'s an opinion about what the government should do. Belief = tent.' },
  { id: 'i2', side: 'tent', t: '“Taxes take way too much out of my check.”', why: 'That\'s an opinion. You don\'t have to join anything to believe it.' },
  { id: 'i3', side: 'tent', t: '“The government should stay out of people\'s lives.”', why: 'That\'s a belief about how big government should be.' },
  { id: 'i4', side: 'tent', t: '“We think 18-year-olds should be able to bet on sports.” (three friends in line)', why: 'Tricky! It says "we," but it\'s just friends sharing an opinion. No candidates, no team. (In Iowa you have to be 21.)' },
  { id: 'i5', side: 'tent', t: '“I\'d only vote for a candidate who\'d make health care cheaper.”', why: 'Tricky! It mentions a candidate, but it\'s still one person\'s opinion. Belief = tent.' },
  { id: 'i6', side: 'tent', t: 'A group chat of friends who all hate the school phone ban', why: 'Tricky! They share a belief, but they don\'t run candidates or try to win elections. Not a party.' },
  { id: 'b1', side: 'booth', t: '“Hey! Want to volunteer to help our candidates win?”', why: 'Getting volunteers to win elections is what a party does.' },
  { id: 'b2', side: 'booth', t: 'Their team name shows up next to candidates on your ballot', why: 'On Iowa ballots, a candidate\'s party is listed next to their name.' },
  { id: 'b3', side: 'booth', t: 'Has a leader who runs it for all of Iowa', why: 'Leaders and an organization = a party.' },
  { id: 'b4', side: 'booth', t: '“We\'re raising money to put our candidates on TV.”', why: 'Raising money and running campaigns is a party\'s job.' },
  { id: 'b5', side: 'booth', t: 'Writes a platform (its list of goals) at its state convention', why: 'A platform is a party\'s official list of goals. Parties vote on it at conventions.' },
  { id: 'b6', side: 'booth', t: '“Our members voted in a primary to pick our candidate for governor.”', why: 'Parties hold primaries so their members pick their candidates.' }
];
const ITEM = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const REASONS = { family: '👪 Family', candidate: '🙋 A candidate they know', issue: '⚖️ A bigger issue to them', nofit: '🚫 Neither party fits', job: '🦺 Their job or union' };
const LOOKP = {
  jaylen: { skin: 3, hair: 'short', hc: '#120d0b', shirt: '#3e6fb0', extra: 'none' }, mike: { skin: 0, hair: 'cap', hc: '#6b4a2b', shirt: '#7b8f4e', extra: 'cap' },
  brianna: { skin: 1, hair: 'long', hc: '#c58a3a', shirt: '#6fb7c9', extra: 'none' }, tony: { skin: 2, hair: 'short', hc: '#2a2a2a', shirt: '#3a7d3a', extra: 'hardhat' },
  dale: { skin: 0, hair: 'bald', hc: '#cfcfcf', shirt: '#c2463f', extra: 'glasses' }, kayla: { skin: 2, hair: 'bun', hc: '#2d211b', shirt: '#7b5fb2', extra: 'earbuds' },
  andre: { skin: 3, hair: 'short', hc: '#120d0b', shirt: '#f4f1ea', extra: 'none' }, marcy: { skin: 1, hair: 'long', hc: '#4a3426', shirt: '#e0603f', extra: 'none' },
  cody: { skin: 0, hair: 'short', hc: '#a0522d', shirt: '#c43b3b', extra: 'none' }, tasha: { skin: 3, hair: 'long', hc: '#1b1210', shirt: '#f0a43a', extra: 'backpack' } };
const P = (name, party, who) => ({ name, party, who, look: LOOKP[name.toLowerCase()] });
// Each pair AGREES on one belief but ends up in different parties (or none). Person b explains.
// Quotes avoid repeating the answer-button words. Reasons are split evenly between parties.
const CASES = [
  { belief: 'the minimum wage should go up', a: P('Jaylen', 'Democrat', '19 · works at a fast-food place'), b: P('Mike', 'Republican', '24 · warehouse worker'),
    say: 'Pay should go up, for real. But I hunt every fall, and I\'m not voting for anybody who\'d mess with my guns.',
    right: 'issue', opts: ['issue', 'family', 'candidate', 'nofit'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: In 2020, Florida voters passed a $15 minimum wage. Many of those same voters picked the Republican for president.' },
  { belief: 'taxes on working people are too high', a: P('Brianna', 'Republican', '32 · CNA, mom of two'), b: P('Tony', 'Democrat', '45 · works at the John Deere plant'),
    say: 'Lower taxes would be nice. But my raise and my insurance came from our union contract. When the union says who\'s on our side, I listen.',
    right: 'job', opts: ['job', 'family', 'candidate', 'nofit'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: Unions often tell their members which candidates they support. Lots of members follow along, but not all of them.' },
  { belief: 'the government should stay out of people\'s lives', a: P('Dale', 'Republican', '58 · Kayla\'s uncle'), b: P('Kayla', 'Democrat', '20 · works at a phone store'),
    say: 'I\'ve never voted any other way. It\'s just how I grew up. Uncle Dale is the only one at Thanksgiving who switched to Republican.',
    right: 'family', opts: ['family', 'issue', 'candidate', 'job'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: Family is one of the biggest reasons people pick a party. But like Uncle Dale, people can switch.' },
  { belief: 'police need more money', a: P('Andre', 'Democrat', '28 · cook'), b: P('Marcy', 'Republican', '41 · runs a daycare'),
    say: 'The woman running for Iowa House is my neighbor. She helped fix my daycare fence last summer. She\'s a Republican, so I registered Republican to vote for her in the primary.',
    right: 'candidate', opts: ['candidate', 'family', 'issue', 'nofit'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: In Iowa, you have to be registered with a party to vote in its primary. You can even switch on primary day.' },
  { belief: 'college costs way too much', a: P('Cody', 'Republican', '18 · works at Hy-Vee'), b: P('Tasha', 'No party', '19 · Kirkwood student'),
    say: 'I looked at both. Each one gets some stuff right and some stuff way wrong. So I didn\'t pick either.',
    right: 'nofit', opts: ['nofit', 'family', 'issue', 'job'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: More than 500,000 Iowans are registered to vote as "No Party."' }
];
const TILES = { cand: { t: '🗳️ Run someone for office', ok: true }, members: { t: '🙋 Sign up members & volunteers', ok: true }, leaders: { t: '🧑‍💼 Pick leaders to run things', ok: true }, money: { t: '💵 Raise money for campaigns', ok: true },
  agree: { t: '🤝 Agree on every single issue', ok: false }, famous: { t: '📣 Hold a big protest downtown', ok: false }, petition: { t: '✍️ Sign an online petition', ok: false }, opinions: { t: '💬 Start a group chat about it', ok: false } };
const LOOKS = [['#f1c9a5', 'short', '#4a3426', '#e0603f', 'none'], ['#a8714b', 'long', '#141014', '#3e6fb0', 'glasses'], ['#d9a77c', 'cap', '#555', '#3aa776', 'cap'], ['#6b4630', 'bun', '#1b1210', '#f0c94d', 'none'], ['#f1c9a5', 'long', '#c58a3a', '#7b5fb2', 'none'], ['#a8714b', 'short', '#222', '#c43b3b', 'earbuds'], ['#d9a77c', 'bald', '#ccc', '#5b8c9b', 'glasses'], ['#6b4630', 'short', '#111', '#f08a5d', 'none']];

/* ---------------- STATE ---------------- */
const fresh = () => ({ v: 1, phase: 'title', name: '', room: '', queue: shuffle(ITEMS.map(i => i.id)), r1: {}, streak: 0, best: 0, ci: 0, r2: {}, r3: { wrong: 0, done: false, sel: [] }, score: 0, writing: {}, turnedIn: false, bots: null, lockUntil: 0, n: 0 });
let st;
try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
if (!st || st.v !== 1) st = fresh();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

const tray = $('#tray');
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2600); }
function plus(n, x, y) { const el = document.createElement('div'); el.className = 'plus'; el.textContent = '+' + n + ' 🌽'; el.style.left = x + 'px'; el.style.top = y + 'px'; $('.scene').appendChild(el); setTimeout(() => el.remove(), 1000); }
function hud() {
  const P = { title: '', intro: '', r1: 'Round 1 · Sort Rush', r2: 'Round 2 · Same Belief, Different Party', r3: 'Round 3 · Start a Party', final: 'You did it!' };
  $('#shiftPill').textContent = P[st.phase] || 'Iowa State Fair';
  $('#shiftPill').style.display = P[st.phase] ? '' : 'none';
  $('#countPill').textContent = st.phase === 'r1' ? (ITEMS.length - st.queue.length) + ' of ' + ITEMS.length + ' sorted' : st.phase === 'r2' ? 'Pair ' + (st.ci + 1) + ' of ' + CASES.length : '';
  $('#scorePill').textContent = '🌽 ' + st.score.toLocaleString();
  race();
}

/* ---------------- CLASS RACE ---------------- */
let livePlayers = [];
function liveOthers() { return (window.Arena && Arena.live) ? livePlayers.filter(p => !p.me && p.name !== st.name) : []; }
function race() {
  if (!st.bots) st.bots = [{ name: 'Kenzie R.', s: 0 }, { name: 'Marcus T.', s: 0 }, { name: 'Ava L.', s: 0 }];
  const lo = liveOthers(), live = lo.length > 0;
  const rows = (live ? lo.map(p => ({ name: p.name, s: p.score })) : st.bots).map(o => ({ name: o.name, s: o.s })).concat([{ name: 'You', s: st.score, me: true }]).sort((a, b) => b.s - a.s).slice(0, 5);
  $('#race').innerHTML = `<div class="t">🏁 CLASS RACE<span class="tag ${live ? 'live' : ''}">${live ? 'LIVE' : 'practice bots'}</span></div><ol>${rows.map((r, i) => `<li class="${r.me ? 'me' : ''}"><span class="n">${i + 1}</span><span class="nm">${esc(r.name)}</span><span class="sc">🌽${r.s}</span></li>`).join('')}</ol>`;
  $('#race').style.display = ['r1', 'r2', 'r3'].includes(st.phase) ? '' : 'none';
}
function botsStep(k) { if (liveOthers().length) return; (st.bots || []).forEach((b, i) => { b.s += Math.round(k * [1, 1.15, .85][i] * (0.55 + Math.random() * 0.8)); }); }
function startArena() { if (window.Arena) Arena.join({ game: ASSIGN, name: st.name, room: st.room, onBoard(p) { livePlayers = p; race(); }, onEvent() {} }); }
function pushScore() { if (window.Arena && Arena.live) Arena.update({ score: st.score, stage: st.phase }); }

/* friendly wrong-answer pause (survives reload) */
function pause(btnsRoot, fb, msg, done, keep) {
  btnsRoot.querySelectorAll('button').forEach(b => b.disabled = true);
  if (!keep) { st.lockUntil = Date.now() + 1500; st.lockMsg = msg; save(); }
  const tick = () => { const left = Math.ceil((st.lockUntil - Date.now()) / 1000); if (left <= 0) { st.lockUntil = 0; save(); return done(); } fb.className = 'fb oops'; fb.textContent = msg + '  (' + left + ')'; setTimeout(tick, 250); };
  tick();
}
const locked = () => (st.lockUntil || 0) > Date.now();

/* ---------------- FLOW ---------------- */
function render() { $('#title').hidden = st.phase !== 'title'; document.body.classList.toggle('titlemode', st.phase === 'title'); hud(); ({ title: pTitle, intro: pIntro, r1: pR1, r2: pR2, r3: pR3, final: pFinal })[st.phase](); }

function pTitle() {
  tray.innerHTML = ''; $('#item').hidden = true; SCENE.show('title');
  $('#title').hidden = false;
  $('#playBtn').onclick = () => { $('#title').hidden = true; st.phase = 'intro'; save(); render(); };
}
function pIntro() {
  $('#title').hidden = true; SCENE.show('title');
  const card = $('#card'); card.className = 'card fun';
  if (!st.name) {
    card.innerHTML = `<div style="font-size:50px">🎡</div><h2>Welcome to the fair!</h2><label for="nm">Your name (first name + last initial)</label><input id="nm" maxlength="40" autocomplete="off" placeholder="Jordan M."><label for="rm">Class code (if your teacher gave one)</label><input id="rm" maxlength="12" autocomplete="off" placeholder="optional"><p class="fb" id="nmMsg"></p><button class="playbtn go" id="go" style="font-size:22px;padding:12px">Let's go →</button>`;
    $('#go').onclick = () => {
      const n = window.classShortName ? classShortName($('#nm').value) : $('#nm').value.trim();
      if (!/^\S+ [A-Z]\.$/.test(n)) { $('#nmMsg').className = 'fb oops'; $('#nmMsg').textContent = 'Type your first name and last initial, like Jordan M.'; return; }
      st.name = n; st.room = $('#rm').value.trim(); if (window.classFirstTry) classFirstTry.reset(); save(); startArena(); pIntro();
    };
  } else {
    card.innerHTML = `<h2>The only thing you need to know:</h2>
    <div class="analogy"><div class="a1"><div style="font-size:40px">⛺💭</div><b>IDEOLOGY = what you BELIEVE</b><br>Your opinions about what the government should do.<br><i>Like loving basketball.</i></div><div class="a2"><div style="font-size:40px">🏛️🏀</div><b>PARTY = a TEAM</b><br>Members, leaders, money, and candidates trying to win elections.<br><i>Like being ON a basketball team.</i></div></div>
    <p class="lead">Is it a <b style="color:#7b5fb2">belief</b> or a <b style="color:#b5651d">team</b>? Be fast. Get combos. 🔥</p>
    <button class="playbtn go" id="go" style="font-size:22px;padding:12px">Start sorting! →</button>`;
    $('#go').onclick = () => { st.phase = 'r1'; st.t0 = Date.now(); save(); $('#overlay').hidden = true; render(); };
  }
  $('#overlay').hidden = false;
}

/* ---- Round 1: Sort Rush ---- */
let r1Busy = false;
function pR1() {
  $('#overlay').hidden = true;
  if (st.requeue && !locked()) requeue();
  const id = st.queue[0];
  if (!id) return roundDone('r2', '🎉 Sort Rush done!', `Best combo: 🔥${st.best}. Next: two people believe the SAME thing but pick DIFFERENT parties. Figure out why.`);
  const it = ITEM[id];
  SCENE.show('r1', LOOKS[(st.n) % LOOKS.length]);
  const card = $('#item'); card.hidden = false; card.className = 'itemcard';
  card.innerHTML = `<span class="who">Spotted at the fair…</span><span class="txt">${esc(it.t)}</span>`;
  tray.innerHTML = `<div class="rhead"><span class="rtag">SORT RUSH</span><span>Is it a belief or a team?</span><span class="streak">${st.streak >= 2 ? '🔥 Combo x' + st.streak : 'Get 3 in a row for a combo!'}</span></div>
  <div class="bigbtns"><button class="tent" data-s="tent">⛺ ← BELIEF<small>Ideology Tent</small></button><button class="booth" data-s="booth">🏛️ TEAM →<small>Party Booth</small></button></div><p class="fb" id="fb"></p>`;
  st.shownAt = Date.now(); r1Busy = false;
  tray.querySelectorAll('[data-s]').forEach(b => b.onclick = () => sort(b.dataset.s));
  if (locked()) pause(tray, $('#fb'), st.lockMsg, () => { requeue(); render(); }, true);
}
function requeue() { if (st.requeue && st.queue[0] === st.requeue) st.queue.push(st.queue.shift()); st.requeue = null; save(); }
function sort(side) {
  if (r1Busy || locked() || st.phase !== 'r1' || Date.now() - (st.shownAt || 0) < 700) return;
  const id = st.queue[0], it = ITEM[id]; const r = st.r1[id] || (st.r1[id] = { wrong: 0 });
  const card = $('#item');
  if (side === it.side) {
    r1Busy = true;
    if (window.classFirstTry) classFirstTry.right('sort-' + id);
    const first = !r.wrong;
    if (first) { st.streak++; st.best = Math.max(st.best, st.streak); } else st.streak = 0;
    const speed = Math.max(0, 6 - Math.max(0, (Date.now() - (st.shownAt || Date.now())) / 1000 - 0.7));
    const pts = first ? Math.round((40 + speed * 5) * (st.streak >= 3 ? 2 : 1)) : 0;
    st.score += pts; botsStep(55); st.queue.shift(); st.n++; save(); pushScore();
    if (st.queue.length === 6 && !st.half) { st.half = true; save(); setTimeout(() => { toast('🔥 Halfway there!'); SCENE.confetti(); }, 300); }
    card.classList.add(side === 'tent' ? 'fly-left' : 'fly-right');
    const sr = $('.scene').getBoundingClientRect();
    plus(pts, side === 'tent' ? sr.width * .14 : sr.width * .78, sr.height * .45);
    SCENE.celebrate(side);
    $('#fb').className = 'fb yay'; $('#fb').innerHTML = (st.streak >= 3 ? '🔥 COMBO! ' : '✓ ') + esc(it.why);
    hud();
    setTimeout(() => render(), 1100);
  } else {
    r.wrong++; st.streak = 0; st.score = Math.max(0, st.score - 15); hud(); if (window.classFirstTry) classFirstTry.wrong();
    st.requeue = id; // moves to the back of the line after the pause
    save(); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    SCENE.oops();
    pause(tray, $('#fb'), 'Oops! −15 🌽 ' + it.why + ' It\'ll come back later.', () => { requeue(); render(); });
  }
}
document.addEventListener('keydown', e => { if (st.phase !== 'r1' || !$('#overlay').hidden || $('#helpDialog').open) return; if (e.key === 'ArrowLeft') sort('tent'); if (e.key === 'ArrowRight') sort('booth'); });

function roundDone(next, title, line) {
  $('#item').hidden = true; tray.innerHTML = '';
  SCENE.confetti();
  const card = $('#card'); card.className = 'card fun';
  card.innerHTML = `<div style="font-size:54px">🌽🎉</div><h2>${esc(title)}</h2><p class="lead">${esc(line)}</p><p style="font-size:22px;font-weight:900">🌽 ${st.score.toLocaleString()}</p><button class="playbtn go" id="go" style="font-size:22px;padding:12px">Next round →</button>`;
  $('#overlay').hidden = false;
  $('#go').onclick = () => { st.phase = next; save(); $('#overlay').hidden = true; render(); };
}

/* ---- Round 2: Same Ideas, Different Booths ---- */
function pR2() {
  $('#overlay').hidden = true; $('#item').hidden = true;
  const c = CASES[st.ci];
  if (!c) return roundDone('r3', '🧠 Nice detective work!', 'Last round: start your own party.');
  SCENE.show('r2', null, c);
  const r = st.r2[st.ci] || (st.r2[st.ci] = { wrong: 0, done: false });
  const item = $('#item'); item.hidden = false; item.className = 'itemcard'; item.style.top = '4%';
  item.innerHTML = `<span class="who">${esc(c.b.name)} · ${esc(c.b.who)} · says…</span><span class="txt" style="font-size:19px;font-weight:800">“${esc(c.say)}”</span>`;
  if (r.done) return r2Result(c);
  const draw = msg => {
    tray.innerHTML = `<div class="rhead"><span class="rtag">SAME BELIEF, DIFFERENT PARTY</span><span>${esc(c.a.name)} and ${esc(c.b.name)} BOTH believe <b>${esc(c.belief)}</b>.</span></div>
    <h2>What decided ${esc(c.b.name)}'s party?</h2>
    <div class="chips">${shuffle(c.opts).map(k => `<button data-k="${k}">${REASONS[k]}</button>`).join('')}</div><p class="fb" id="fb">${msg ? esc(msg) : ''}</p>`;
    tray.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      if (b.dataset.k === c.right) {
        r.done = true; if (window.classFirstTry) classFirstTry.right('why-' + st.ci);
        const pts = r.wrong ? 0 : 150; st.score += pts; botsStep(130); save(); pushScore(); SCENE.confetti(); hud(); r2Result(c);
      } else { r.wrong++; st.score = Math.max(0, st.score - 15); hud(); if (window.classFirstTry) classFirstTry.wrong(); save(); pause(tray, $('#fb'), 'Oops! −15 🌽 ' + c.hint, () => draw('')); }
    });
  };
  draw('');
  if (locked()) pause(tray, $('#fb'), st.lockMsg, () => draw(''), true);
}
function r2Result(c) {
  tray.innerHTML = `<div class="rhead"><span class="rtag">SAME BELIEF, DIFFERENT PARTY</span></div><p class="yay">✓ ${REASONS[c.right]}</p>
  ${st.ci === 0 ? '<p class="why2">Same belief, different team. Your beliefs (ideology) don\'t automatically decide your party. People join the party that fits them <b>best</b>, not perfectly.</p>' : ''}<p class="note">${esc(c.fact)}</p>
  <div class="row"><button class="primary" id="nx">${st.ci < CASES.length - 1 ? 'Next pair →' : 'Finish round →'}</button></div>`;
  guardNext(() => { st.ci++; save(); render(); });
}

function guardNext(fn) { const b = $('#nx'), t = Date.now(); b.onclick = () => { if (Date.now() - t < 450) return; b.onclick = null; fn(); }; }
/* ---- Round 3: Make It a Party ---- */
function pR3() {
  $('#overlay').hidden = true; $('#item').hidden = true; SCENE.show('r3');
  const r = st.r3;
  const item = $('#item'); item.hidden = false; item.className = 'itemcard'; item.style.top = '5%';
  item.innerHTML = `<span class="who">You and 3 coworkers</span><span class="txt" style="font-size:20px">"We all think 16-year-olds should be able to vote. Let's start our own party!"</span>`;
  if (r.done) return r3Result();
  const order = r.order || (r.order = shuffle(Object.keys(TILES)));
  const draw = msg => {
    tray.innerHTML = `<div class="rhead"><span class="rtag">MAKE IT A PARTY</span><span>Sharing a belief = ideology. What turns your crew into a real party?</span><span class="streak">Picked ${r.sel.length} of 4</span></div>
    <h2>Pick the 4 things your crew needs to become a real party.</h2>
    <div class="tiles">${order.map(k => `<button data-t="${k}" class="${r.sel.includes(k) ? 'sel' : ''}">${TILES[k].t}</button>`).join('')}</div>
    <div class="row"><button class="primary" id="make" ${r.sel.length === 4 ? '' : 'disabled'}>🏛️ Make it official!</button><span class="fb" id="fb">${msg ? esc(msg) : ''}</span></div>`;
    tray.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { const k = b.dataset.t; if (r.sel.includes(k)) r.sel = r.sel.filter(x => x !== k); else if (r.sel.length < 4) r.sel.push(k); save(); tray.querySelectorAll('[data-t]').forEach(x => x.classList.toggle('sel', r.sel.includes(x.dataset.t))); tray.querySelector('.streak').textContent = 'Picked ' + r.sel.length + ' of 4'; $('#make').disabled = r.sel.length !== 4; });
    $('#make').onclick = () => {
      const good = r.sel.filter(k => TILES[k].ok).length;
      if (good === 4) { r.done = true; if (window.classFirstTry) classFirstTry.right('make-party'); st.score += r.wrong ? 0 : 150; botsStep(120); save(); pushScore(); SCENE.confetti(); hud(); r3Result(); }
      else { r.wrong++; if (window.classFirstTry) classFirstTry.wrong(); r.sel = []; save(); pause(tray, $('#fb'), `${good} of 4 were right. Try again! Hint: a party is a TEAM that tries to WIN ELECTIONS.`, () => pR3()); }
    };
  };
  draw('');
  if (locked()) pause(tray, $('#fb'), st.lockMsg, () => pR3(), true);
}
function r3Result() {
  SCENE.show('r3done');
  tray.innerHTML = `<div class="rhead"><span class="rtag">MAKE IT A PARTY</span></div><p class="yay">🏛️ Your crew is now a party: the Vote at 16 Party!</p>
  <p class="why2">You still have the same belief (your ideology). Now you also have members, leaders, money, and a candidate. That's what makes it a party. Protests, petitions, and group chats can push for change, but they don't run anyone for office. And nobody has to agree on everything.</p>
  <p class="note">Real Iowa rule: to become an official party, your candidate for governor or president needs at least 2% of the vote.</p>
  <div class="row"><button class="primary" id="nx">See my results →</button></div>`;
  guardNext(() => { st.phase = 'final'; save(); render(); });
}

/* ---- Final + turn in ---- */
const PROMPTS = [
  { id: 'diff', short: 'Ideology vs. party', label: '1. What is the difference between an ideology and a party? Give an example of each from today.', stem: 'An ideology is ___. A party is ___. One example of an ideology is ___. One thing a party does is ___.', min: 80,
    must: [['belief', 'believe', 'opinion', 'idea', 'ideas', 'views', 'values'], ['candidate', 'member', 'organiz', 'election', 'team', 'leader', 'campaign', 'volunteer', 'ballot', 'primary']], msg: 'In answer 1, say what an ideology is (beliefs/ideas) AND what a party is (a team that runs candidates).' },
  { id: 'why', short: 'Why party ≠ ideology', label: '2. Pick Mike, Tony, Kayla, Marcy, or Tasha. Why did they pick their party (or no party)?', stem: '___ picked ___ because ___.', min: 50,
    must: [['mike', 'tony', 'kayla', 'marcy', 'tasha']], msg: 'In answer 2, name the person AND what decided it (family, their union, a bigger issue, a candidate they know, or neither party fits).' },
  { id: 'crit', optional: true, short: '⭐ Level 4 challenge', label: '⭐ Level 4 challenge (optional, +300 🌽): Mike votes on one issue (guns). Tony follows his union. Pick one of them: is that good or bad for democracy? Give one plus AND one minus.', stem: 'One plus is ___. One minus is ___. Overall I think ___ because ___.', min: 90,
    must: [['plus', 'good', 'help', 'benefit'], ['minus', 'bad', 'problem', 'hurt', 'downside'], ['mike', 'tony', 'union', 'gun', 'issue', 'vote', 'voting', 'election', 'democracy', 'candidate']], msg: 'For the Level 4 challenge, name Mike or Tony and give one plus AND one minus.' }
];
function tally() {
  const sort = [ITEMS.filter(i => st.r1[i.id] && !st.r1[i.id].wrong).length, ITEMS.length];
  const why = [CASES.filter((c, i) => st.r2[i] && st.r2[i].done && !st.r2[i].wrong).length, CASES.length];
  const make = [st.r3.done && !st.r3.wrong ? 1 : 0, 1];
  return { sort, why, make, tot: [sort[0] + why[0] + make[0], sort[1] + why[1] + make[1]] };
}
function pFinal() {
  $('#item').hidden = true; SCENE.show('final'); SCENE.confetti();
  const t = tally();
  const rank = [{ s: st.score, me: true }].concat(liveOthers().length ? liveOthers().map(p => ({ s: p.score })) : st.bots).sort((a, b) => b.s - a.s).findIndex(x => x.me) + 1;
  tray.classList.add('final-tray');
  tray.innerHTML = `<div class="final"><div><p class="eyebrow">YOU DID IT!</p><p class="big">🌽 ${st.score.toLocaleString()}</p><p class="jarline">#${rank} in the class race · best combo 🔥${st.best}</p>
    <ul><li>Sort Rush right on first try: <b>${t.sort[0]} of ${t.sort[1]}</b></li><li>Same Belief, Different Party: <b>${t.why[0]} of ${t.why[1]}</b></li><li>Start a Party: <b>${t.make[0] ? 'first try ✓' : 'got it ✓'}</b></li></ul>
    <p class="note">✍️ Last step: 2 short answers, then turn in. Use the starters! The ⭐ challenge is optional.</p></div>
    <div>${PROMPTS.map(p => `<label for="w_${p.id}" style="display:block;font-weight:850;margin:10px 0 2px${p.optional ? ';color:#7a5800' : ''}">${esc(p.label)}</label><p class="stem">Starter: ${esc(p.stem)}</p><textarea id="w_${p.id}">${esc(st.writing[p.id] || '')}</textarea>`).join('')}
    <button class="primary go" id="sendBtn">${st.turnedIn ? 'Turn in again' : 'Turn in'}</button><p class="fb ${st.turnedIn ? 'good' : ''}" id="sendMsg">${st.turnedIn ? 'Turned in! You can fix your answers and turn in again.' : ''}</p></div></div>`;
  PROMPTS.forEach(p => $('#w_' + p.id).addEventListener('input', e => { st.writing[p.id] = e.target.value; save(); }));
  $('#sendBtn').onclick = turnIn; pushScore();
}
const WHY_WORDS = { mike: ['gun', 'hunt', 'rifle'], tony: ['union', 'raise', 'insurance', 'contract', 'plant', 'deere', 'job'], kayla: ['family', 'grew up', 'raised', 'parent', 'mom', 'mother', 'dad', 'home', 'thanksgiving', 'relative'], marcy: ['neighbor', 'fence', 'candidate', 'running', 'know', 'friend', 'helped', 'trust'], tasha: ['neither', 'didn\'t pick', 'didnt pick', 'each one', 'both parties', 'not pick', 'fit', 'wrong', 'right'] };
const hasWord = (t, w) => new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (w.length > 4 ? '' : '(s|es|ed|ing)?\\b')).test(t);
function checkWriting(p, v) {
  const t = v.toLowerCase();
  if (p.optional && !v.trim()) return '';
  if (/\b[bcdfghjklmnpqrstvwxz]{4,}\b/.test(t)) return 'Some of that isn\'t real words. Write a real answer for: ' + p.short + '.';
  if (/\b(idk|lol|bruh|asdf|dunno|bathroom|blah|bye)\b|ok done/.test(t)) return 'Write a real answer for: ' + p.short + '. Use the starter to help.';
  if (p.id === 'why') { const who = Object.keys(WHY_WORDS).find(n => hasWord(t, n)); if (who && !WHY_WORDS[who].some(w => hasWord(t, w))) return 'In answer 2, say what decided it for ' + who[0].toUpperCase() + who.slice(1) + '. Look back at what they said.'; }
  if (/_{2,}/.test(v)) return 'Replace the ___ blanks with your own words in: ' + p.short + '.';
  if (v.length < p.min) return 'Write a little more for: ' + p.short + ' (2 full sentences).';
  if (p.id !== 'why' && (v.match(/[a-z][.!?](\s|$)/gi) || []).length < 2) return 'Write at least 2 full sentences for: ' + p.short + '.';
  if (p.id === 'why' && !/\b(because|since|so)\b/.test(t)) return 'In answer 2, use "because" to explain the reason.';
  const stem = new Set(p.stem.toLowerCase().match(/[a-z']+/g) || []);
  if (new Set((t.match(/[a-z']{3,}/g) || []).filter(w => !stem.has(w))).size < 6) return 'Add more of your own words for: ' + p.short + '.';
  if (p.must.some(g => !g.some(w => hasWord(t, w)))) return p.msg;
  if (p.id === 'diff') { const sents = t.split(/[.!?]+/); const ide = sents.find(x => /ideolog/.test(x)), par = sents.find(x => /\bpart(y|ies)\b/.test(x) && !/ideolog/.test(x)); if (ide && !p.must[0].some(w => hasWord(ide, w))) return 'Check answer 1: an ideology is about BELIEFS. Say that in your ideology sentence.'; if (par && !p.must[1].some(w => hasWord(par, w))) return 'Check answer 1: a party is a TEAM that runs candidates. Say that in your party sentence.'; }
  return '';
}
async function turnIn() {
  const msg = $('#sendMsg');
  for (const p of PROMPTS) { const v = ($('#w_' + p.id).value || '').trim(); const bad = checkWriting(p, v); if (bad) { msg.className = 'fb oops'; msg.textContent = bad; $('#w_' + p.id).focus(); return; } }
  const t = tally();
  const answers = { 'Standard': 'SS.9-12.Gov.12', 'First-try correct': t.tot[0] + ' of ' + t.tot[1], 'First-try by standard': 'Gov.12: ' + t.tot[0] + ' of ' + t.tot[1],
    'First-try by part': 'Sort Rush ' + t.sort[0] + '/' + t.sort[1] + ' · Why different parties ' + t.why[0] + '/' + t.why[1] + ' · Make a party ' + (t.make[0] ? '1/1' : '0/1'), 'Corn score': String(st.score) };
  const missed = ITEMS.filter(i => st.r1[i.id] && st.r1[i.id].wrong).map(i => `"${i.t}" (${i.side === 'tent' ? 'ideology' : 'party'})`);
  answers['Sort Rush misses'] = missed.length ? missed.join('; ') : 'none';
  CASES.forEach((c, i) => { const r = st.r2[i] || {}; answers['Why · ' + c.b.name] = REASONS[c.right].replace(/^\S+ /, '') + (r.wrong ? ' (after ' + r.wrong + ' wrong)' : ' (first try)'); });
  answers['Make it a party'] = st.r3.wrong ? 'after ' + st.r3.wrong + ' wrong' : 'first try';
  PROMPTS.forEach(p => answers['Writing: ' + p.short] = ($('#w_' + p.id).value || '').trim() || (p.optional ? '(skipped)' : ''));
  $('#sendBtn').disabled = true; msg.className = 'fb'; msg.textContent = 'Sending your work…';
  try {
    const res = await classTurnIn(OLD_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGN, assignmentTitle: 'Government Unit 2 · Day 1 · Tent or Booth', answers }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Your work did not save. Try again.');
    if (!st.turnedIn) { st.score += 200 + ((($('#w_crit') || {}).value || '').trim() ? 300 : 0); pushScore(); hud(); SCENE.confetti(); } st.turnedIn = true; save(); msg.className = 'fb yay'; msg.textContent = 'Turned in! 🎉 +200 bonus corn. Your teacher can see your work.'; $('#sendBtn').textContent = 'Turned in ✓'; $('#sendBtn').disabled = false;
  } catch (e) { msg.className = 'fb oops'; msg.textContent = e.message || 'Could not turn in. Try again.'; $('#sendBtn').disabled = false; }
}

/* =====================================================================
   SCENE: bright fairground with the Ideology Tent (left) and Party Booth (right)
   ===================================================================== */
const SCENE = (() => {
  const cv = $('#scene'), ctx = cv.getContext('2d'), H = 400; let W = 960;
  function fit() { const r = cv.parentElement.getBoundingClientRect(); if (!r.height) return; W = Math.max(760, Math.min(1500, Math.round(H * r.width / r.height))); cv.width = W; cv.height = H; }
  fit(); window.addEventListener('resize', fit);
  let mode = 'title', look = null, pair = null, popT = 0, oopsT = 0, cheer = { side: null, t: 0 }, conf = [], t0 = performance.now(), tentN = 0, boothN = 0;
  function show(m, lk, c) { if (m !== mode || lk !== look || c !== pair) popT = performance.now(); mode = m; look = lk; pair = c || null; }
  function celebrate(side) { cheer = { side, t: performance.now() }; if (side === 'tent') tentN++; else boothN++; burst(side === 'tent' ? W * .15 : W * .82, 220, 26); }
  function oops() { oopsT = performance.now(); }
  function burst(x, y, n) { for (let i = 0; i < n; i++) conf.push({ x, y, vx: (Math.random() - .5) * 9, vy: -Math.random() * 9 - 3, c: ['#f0c94d', '#e0603f', '#3aa776', '#3e6fb0', '#9b7fd0'][i % 5], r: Math.random() * 6.28, life: 0 }); }
  function confetti() { for (let k = 0; k < 5; k++) burst(W * (.15 + k * .17), 80, 22); }
  function sky(now) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#9fd8f0'); g.addColorStop(1, '#fdf3d6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // clouds
    for (let i = 0; i < 4; i++) { const cx = ((now / 60 + i * 300) % (W + 200)) - 100, cy = 40 + i * 18; ctx.fillStyle = '#ffffffd9'; ctx.beginPath(); ctx.arc(cx, cy, 22, 0, 7); ctx.arc(cx + 24, cy - 8, 26, 0, 7); ctx.arc(cx + 50, cy, 20, 0, 7); ctx.fill(); }
    // Ferris wheel center back
    const cx = W / 2, cy = 135, R = 95, a0 = now / 8000;
    ctx.strokeStyle = '#e7a23a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    ctx.lineWidth = 2; for (let i = 0; i < 10; i++) { const a = a0 + i * Math.PI / 5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); ctx.fillStyle = ['#e0603f', '#3aa776', '#3e6fb0', '#f0c94d', '#9b7fd0'][i % 5]; ctx.beginPath(); ctx.roundRect(cx + Math.cos(a) * R - 10, cy + Math.sin(a) * R, 20, 14, 4); ctx.fill(); }
    ctx.strokeStyle = '#8b6d4a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - 55, 290); ctx.moveTo(cx, cy); ctx.lineTo(cx + 55, 290); ctx.stroke();
    // string lights
    ctx.strokeStyle = '#6b5a45'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, 20); ctx.quadraticCurveTo(W / 2, 90, W, 20); ctx.stroke();
    for (let i = 0; i < Math.ceil(W / 40); i++) { const px = i * 40 + 20, t = px / W, py = (1 - t) * (1 - t) * 20 + 2 * (1 - t) * t * 90 + t * t * 20; ctx.fillStyle = ['#f0c94d', '#e0603f', '#3aa776', '#3e6fb0'][i % 4]; ctx.globalAlpha = .7 + .3 * Math.sin(now / 300 + i); ctx.beginPath(); ctx.arc(px, py + 5, 6, 0, 7); ctx.fill(); ctx.globalAlpha = 1; }
    ctx.fillStyle = '#9fd17a'; ctx.fillRect(0, 290, W, H - 290); ctx.fillStyle = '#e6d8b5'; ctx.beginPath(); ctx.moveTo(W * .35, H); ctx.lineTo(W * .45, 290); ctx.lineTo(W * .55, 290); ctx.lineTo(W * .65, H); ctx.fill();
  }
  function tent(now) {
    const x = W * .15, y = 300, bounce = cheer.side === 'tent' && now - cheer.t < 600 ? Math.sin((now - cheer.t) / 60) * 6 : 0;
    ctx.save(); ctx.translate(0, -Math.abs(bounce));
    for (let s = 0; s < 6; s++) { ctx.fillStyle = s % 2 ? '#9b7fd0' : '#fff'; ctx.beginPath(); ctx.moveTo(x, y - 210); ctx.lineTo(x - 120 + s * 40, y); ctx.lineTo(x - 80 + s * 40, y); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = '#5b3f99'; ctx.beginPath(); ctx.moveTo(x - 30, y); ctx.lineTo(x, y - 70); ctx.lineTo(x + 30, y); ctx.fill();
    ctx.fillStyle = '#e0603f'; ctx.beginPath(); ctx.moveTo(x, y - 210); ctx.lineTo(x, y - 240); ctx.lineTo(x + 26, y - 230); ctx.lineTo(x, y - 222); ctx.fill(); ctx.fillStyle = '#6b5a45'; ctx.fillRect(x - 2, y - 240, 3, 32);
    sign(x, y + 30, 'IDEOLOGY TENT', '#7b5fb2');
    // thought bubbles count
    for (let i = 0; i < Math.min(tentN, 8); i++) { const a = now / 900 + i; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#9b7fd0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x - 90 + (i % 4) * 60, y - 150 - Math.floor(i / 4) * 40 + Math.sin(a) * 4, 13, 0, 7); ctx.fill(); ctx.stroke(); ctx.font = '13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('💭', x - 90 + (i % 4) * 60, y - 145 - Math.floor(i / 4) * 40 + Math.sin(a) * 4); }
    ctx.restore();
  }
  function booth(now) {
    const x = W * .82, y = 300, bounce = cheer.side === 'booth' && now - cheer.t < 600 ? Math.abs(Math.sin((now - cheer.t) / 60) * 6) : 0;
    ctx.save(); ctx.translate(0, -bounce);
    ctx.fillStyle = '#c98b4b'; ctx.fillRect(x - 110, y - 120, 220, 120); ctx.fillStyle = '#a86e35'; ctx.fillRect(x - 118, y - 60, 236, 14);
    for (let i = 0; i < 7; i++) { ctx.fillStyle = ['#e0603f', '#fff', '#3e6fb0'][i % 3]; ctx.beginPath(); ctx.moveTo(x - 110 + i * 31.4, y - 160); ctx.lineTo(x - 94 + i * 31.4, y - 136); ctx.lineTo(x - 78 + i * 31.4, y - 160); ctx.fill(); }
    ctx.fillStyle = '#7a5530'; ctx.fillRect(x - 118, y - 170, 236, 12);
    // clipboard sign-ups
    ctx.fillStyle = '#fff'; ctx.fillRect(x + 50, y - 110, 44, 56); ctx.fillStyle = '#263b50'; for (let i = 0; i < Math.min(boothN, 6); i++) ctx.fillRect(x + 56, y - 100 + i * 8, 30, 3);
    // members waving
    for (let i = 0; i < Math.min(boothN, 6); i++) { ctx.fillStyle = ['#f1c9a5', '#a8714b', '#d9a77c', '#6b4630'][i % 4]; ctx.beginPath(); ctx.arc(x - 90 + i * 22, y - 82, 9, 0, 7); ctx.fill(); }
    sign(x, y + 30, 'PARTY BOOTH', '#b5651d');
    if (mode === 'r3done' || mode === 'final') sign(x, y - 28, 'VOTE AT 16 PARTY', '#3aa776');
    ctx.restore();
  }
  function sign(x, y, text, color) { ctx.font = 'bold 18px system-ui,Arial'; const w = ctx.measureText(text).width + 30; ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x - w / 2, y - 18, w, 34, 10); ctx.fill(); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(text, x, y + 5); }
  function person(px, py, s, lk, m) {
    ctx.save(); ctx.translate(px, py); ctx.scale(s, s);
    ctx.fillStyle = lk.shirt; ctx.beginPath(); ctx.roundRect(-52, 40, 104, 120, 36); ctx.fill();
    if (lk.extra === 'apron') { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(-30, 64, 60, 96, 10); ctx.fill(); }
    if (lk.extra === 'backpack') { ctx.fillStyle = '#5a6b7a'; ctx.fillRect(-54, 50, 12, 60); ctx.fillRect(42, 50, 12, 60); }
    ctx.fillStyle = lk.skin; ctx.fillRect(-12, 20, 24, 24); ctx.beginPath(); ctx.ellipse(0, -8, 40, 45, 0, 0, 7); ctx.fill();
    ctx.fillStyle = lk.hc;
    if (lk.hair === 'long') { ctx.beginPath(); ctx.ellipse(0, -22, 44, 40, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-44, -22, 14, 62); ctx.fillRect(30, -22, 14, 62); }
    else if (lk.hair === 'bun') { ctx.beginPath(); ctx.ellipse(0, -28, 42, 30, 0, Math.PI, 0); ctx.fill(); ctx.beginPath(); ctx.arc(0, -60, 14, 0, 7); ctx.fill(); }
    else if (lk.hair === 'short') { ctx.beginPath(); ctx.ellipse(0, -28, 41, 27, 0, Math.PI, 0); ctx.fill(); }
    else if (lk.hair === 'bald') { ctx.beginPath(); ctx.ellipse(-37, -8, 5, 14, 0, 0, 7); ctx.ellipse(37, -8, 5, 14, 0, 0, 7); ctx.fill(); }
    if (lk.extra === 'cap' || lk.extra === 'vetcap') { ctx.fillStyle = lk.extra === 'vetcap' ? '#2b2b2b' : '#2e6e4c'; ctx.beginPath(); ctx.ellipse(0, -34, 42, 24, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-4, -36, 60, 8); }
    if (lk.extra === 'hardhat') { ctx.fillStyle = '#f0c94d'; ctx.beginPath(); ctx.ellipse(0, -34, 44, 30, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-50, -36, 100, 7); }
    ctx.fillStyle = '#2b2326'; ctx.beginPath(); ctx.arc(-14, -10, 4.2, 0, 7); ctx.arc(14, -10, 4.2, 0, 7); ctx.fill();
    if (lk.extra === 'glasses') { ctx.strokeStyle = '#2b2326'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(-14, -10, 10, 0, 7); ctx.moveTo(24, -10); ctx.arc(14, -10, 10, 0, 7); ctx.stroke(); }
    if (lk.extra === 'earbuds') { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-40, -4, 5, 0, 7); ctx.arc(40, -4, 5, 0, 7); ctx.fill(); }
    ctx.strokeStyle = '#2b2326'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath();
    if (m > 0) ctx.arc(0, 6, 14, 0.2, Math.PI - 0.2); else if (m < 0) { ctx.arc(0, 18, 8, Math.PI + 0.4, -0.4); } else { ctx.arc(0, 4, 12, 0.35, Math.PI - 0.35); }
    ctx.stroke(); ctx.restore();
  }
  const SK = { 0: '#f1c9a5', 1: '#d9a77c', 2: '#a8714b', 3: '#6b4630' };
  const toLook = l => Array.isArray(l) ? { skin: l[0], hair: l[1], hc: l[2], shirt: l[3], extra: l[4] } : Object.assign({}, l, { skin: SK[l.skin] || l.skin });
  function tag(x, y, text, color) { ctx.font = 'bold 15px system-ui,Arial'; const w = ctx.measureText(text).width + 22; ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x - w / 2, y - 14, w, 28, 14); ctx.fill(); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(text, x, y + 5); }
  function draw(now) {
    const dt = Math.min(50, now - t0); t0 = now;
    sky(now); tent(now); booth(now);
    const pop = Math.min(1, (now - popT) / 300), sc = .6 + .4 * (1 - Math.pow(1 - pop, 3));
    const shake = now - oopsT < 400 ? Math.sin((now - oopsT) / 25) * 6 : 0;
    if (mode === 'r1' && look) person(W / 2 + shake, 205 + (1 - pop) * 40, .95 * sc, toLook(look), now - oopsT < 900 ? 0 : 1);
    if (mode === 'r2' && pair) {
      const xa = W * .37, xb = W * .63;
      person(xa, 215, .85 * sc, toLook(pair.a.look), 1); person(xb + shake, 215, .85 * sc, toLook(pair.b.look), now - oopsT < 900 ? 0 : 1);
      tag(W / 2, 300, '💭 Both believe: ' + pair.belief, '#7b5fb2'); [[xa, pair.a], [xb, pair.b]].forEach(([x, p]) => { tag(x, 340, p.name, '#263b50'); tag(x, 374, p.party, p.party === 'Republican' ? '#c2463f' : p.party === 'Democrat' ? '#3e6fb0' : '#6b7780'); });
    }
    if (mode === 'r3' || mode === 'r3done') { for (let i = 0; i < 4; i++) person(W * .38 + i * 72, 235 + (i % 2) * 8, .55 * sc, toLook(LOOKS[i + 2]), 1); }
    conf = conf.filter(p => { p.vy += .3; p.x += p.vx; p.y += p.vy; p.r += .2; p.life += dt; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-4, -6, 8, 12); ctx.restore(); return p.y < H + 20 && p.life < 3000; });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  return { show, celebrate, oops, confetti };
})();

/* ---------------- BOOT ---------------- */
$('#helpBtn').onclick = () => $('#helpDialog').showModal();
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => $('#' + b.dataset.close).close());
$('#resetBtn').onclick = () => { if (!confirm('Start over? This erases your progress on this device.')) return; const n = st.name, r = st.room; st = fresh(); st.name = n; st.room = r; st.phase = 'intro'; if (window.classFirstTry) classFirstTry.reset(); save(); location.reload(); };
if (st.name) startArena();
render();
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
