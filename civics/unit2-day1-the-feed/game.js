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
const ITEMS = [
  { id: 'i1', side: 'tent', t: 'Thinks college should cost less', why: 'That\'s a belief about what government should do.' },
  { id: 'i2', side: 'tent', t: 'Got her views on unions from her dad', why: 'Family shapes beliefs. Where beliefs come from goes in the tent. (That\'s called political socialization.)' },
  { id: 'i3', side: 'tent', t: 'Wants lower taxes and fewer rules', why: 'Wanting something is a belief. Anyone can have it, no sign-up needed.' },
  { id: 'i4', side: 'tent', t: 'His church shaped how he sees the world', why: 'Faith, family, and friends shape beliefs. That\'s ideology.' },
  { id: 'i5', side: 'tent', t: 'Thinks Iowa should spend more fixing roads', why: 'That\'s a belief about what government should do.' },
  { id: 'i6', side: 'tent', t: 'Believes adults should make their own choices', why: 'That\'s a belief about how much government should do.' },
  { id: 'b1', side: 'booth', t: 'Holds caucuses for its members', why: 'Caucuses are meetings a PARTY runs for its members. Iowa parties hold them every two years.' },
  { id: 'b2', side: 'booth', t: 'Has a state chair and county leaders', why: 'Leaders and an organization = a party.' },
  { id: 'b3', side: 'booth', t: 'Its name is printed next to candidates on the ballot', why: 'On Iowa ballots, a candidate\'s party is listed by their name.' },
  { id: 'b4', side: 'booth', t: 'Votes on an official platform at a convention', why: 'A platform is a party\'s written list of goals. Parties vote on it.' },
  { id: 'b5', side: 'booth', t: 'Raises money to help its candidates win', why: 'Parties raise money and run campaigns.' },
  { id: 'b6', side: 'booth', t: 'Signs up members and volunteers', why: 'Members and volunteers make a party a team.' }
];
const ITEM = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const REASONS = { family: '👪 Family tradition', candidate: '🙋 Likes the candidate', issue: '💵 One issue matters most', nofit: '🚫 No party fits well enough', job: '🦺 Their job or union' };
const LOOKP = {
  earl: { skin: 0, hair: 'cap', hc: '#9a9a9a', shirt: '#7b8f4e', extra: 'cap' }, rosa: { skin: 2, hair: 'long', hc: '#2b1d16', shirt: '#f4f1ea', extra: 'apron' },
  walt: { skin: 2, hair: 'bald', hc: '#cfcfcf', shirt: '#5b6b3c', extra: 'vetcap' }, tyler: { skin: 1, hair: 'short', hc: '#a0522d', shirt: '#f0a43a', extra: 'hardhat' },
  dakota: { skin: 3, hair: 'long', hc: '#120d0b', shirt: '#3aa776', extra: 'none' }, priya: { skin: 1, hair: 'long', hc: '#1c1412', shirt: '#7b5fb2', extra: 'earbuds' },
  luis: { skin: 2, hair: 'short', hc: '#2a2a2a', shirt: '#8a4b3a', extra: 'none' }, hank: { skin: 0, hair: 'short', hc: '#6b4a2b', shirt: '#2f5d7c', extra: 'glasses' },
  dana: { skin: 3, hair: 'bun', hc: '#2d211b', shirt: '#6fb7c9', extra: 'none' }, maya: { skin: 1, hair: 'long', hc: '#141014', shirt: '#c43b3b', extra: 'backpack' } };
const P = (name, ide, party) => ({ name, ide, party, look: LOOKP[name.toLowerCase()] });
const IDE_PLAIN = { Conservative: 'less government on money, more rules on personal choices', Liberal: 'more government on money, fewer rules on personal choices', Libertarian: 'less government on money AND on personal choices (the belief, not the party)', Populist: 'more government on money AND more rules on personal choices' };
const CASES = [
  { a: P('Earl', 'Conservative', 'Republican'), b: P('Rosa', 'Conservative', 'Democrat'),
    say: 'Everybody at our Sunday dinners has voted Democrat since my grandpa\'s day. I stick with them, even though I want lower taxes for my bakery.',
    right: 'family', opts: ['family', 'issue', 'candidate', 'nofit'], hint: 'Who did Rosa talk about?' },
  { a: P('Walt', 'Populist', 'Republican'), b: P('Tyler', 'Populist', 'Democrat'),
    say: 'My electricians\' union backs Democrats. The union got me good pay and safe job sites, so I\'m with them.',
    right: 'job', opts: ['job', 'family', 'candidate', 'nofit'], hint: 'What got Tyler his pay?' },
  { a: P('Dakota', 'Libertarian', 'No party'), b: P('Priya', 'Libertarian', 'Republican'),
    say: 'I don\'t agree with Republicans on everything. But cutting taxes matters to me more than anything else.',
    right: 'issue', opts: ['issue', 'family', 'candidate', 'job'], hint: 'What matters to Priya more than anything?' },
  { a: P('Luis', 'Liberal', 'Democrat'), b: P('Hank', 'Liberal', 'Republican'),
    say: 'I don\'t agree with every Republican idea. But the Republican running for state senate here is a fellow veteran, and I trust him.',
    right: 'candidate', opts: ['candidate', 'family', 'issue', 'job'], hint: 'Who does Hank trust?' },
  { a: P('Dana', 'Liberal', 'Democrat'), b: P('Maya', 'Liberal', 'No party'),
    say: 'Democrats come closest to what I think. But they still aren\'t close enough for me to sign up. I\'d rather stay independent.',
    right: 'nofit', opts: ['nofit', 'family', 'issue', 'job'], hint: 'Did Maya sign up with anyone?' }
];
const TILES = { cand: { t: '🗳️ Run candidates for office', ok: true }, members: { t: '🙋 Sign up members & volunteers', ok: true }, leaders: { t: '🧑‍💼 Pick leaders & organize', ok: true }, money: { t: '💵 Raise money for campaigns', ok: true },
  agree: { t: '🤝 Agree on every single issue', ok: false }, famous: { t: '📱 Get famous online', ok: false }, colors: { t: '🎨 Pick cool team colors', ok: false }, opinions: { t: '💭 Have strong opinions', ok: false } };
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
  const P = { title: '', intro: '', r1: 'Round 1 · Sort Rush', r2: 'Round 2 · Same Ideas, Different Booths', r3: 'Round 3 · Make It a Party', final: 'You did it!' };
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
  $('#race').innerHTML = `<div class="t">🏁 CLASS RACE<span class="tag ${live ? 'live' : ''}">${live ? 'LIVE' : 'practice'}</span></div><ol>${rows.map((r, i) => `<li class="${r.me ? 'me' : ''}"><span class="n">${i + 1}</span><span class="nm">${esc(r.name)}</span><span class="sc">🌽${r.s}</span></li>`).join('')}</ol>`;
  $('#race').style.display = ['r1', 'r2', 'r3', 'final'].includes(st.phase) ? '' : 'none';
}
function botsStep(k) { if (liveOthers().length) return; (st.bots || []).forEach((b, i) => { b.s += Math.round(k * [1, 1.15, .85][i] * (0.55 + Math.random() * 0.8)); }); }
function startArena() { if (window.Arena) Arena.join({ game: ASSIGN, name: st.name, room: st.room, onBoard(p) { livePlayers = p; race(); }, onEvent() {} }); }
function pushScore() { if (window.Arena && Arena.live) Arena.update({ score: st.score, stage: st.phase }); }

/* friendly wrong-answer pause (survives reload) */
function pause(btnsRoot, fb, msg, done, keep) {
  btnsRoot.querySelectorAll('button').forEach(b => b.disabled = true);
  if (!keep) { st.lockUntil = Date.now() + 3000; st.lockMsg = msg; save(); }
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
    <div class="analogy"><div class="a1"><div style="font-size:40px">⛺🎧</div><b>IDEOLOGY</b> is like your <b>playlist</b>.<br>It's the stuff you believe.</div><div class="a2"><div style="font-size:40px">🏛️🎸</div><b>PARTY</b> is like a <b>band</b>.<br>Members, leaders, money, shows.</div></div>
    <p class="lead">Sort the fair into the <b style="color:#7b5fb2">Tent</b> or the <b style="color:#b5651d">Booth</b>. Be fast. Get combos. 🔥</p>
    <button class="playbtn go" id="go" style="font-size:22px;padding:12px">Start sorting! →</button>`;
    $('#go').onclick = () => { st.phase = 'r1'; st.t0 = Date.now(); save(); $('#overlay').hidden = true; render(); };
  }
  $('#overlay').hidden = false;
}

/* ---- Round 1: Sort Rush ---- */
let r1Busy = false;
function pR1() {
  $('#overlay').hidden = true;
  const id = st.queue[0];
  if (!id) return roundDone('r2', '🎉 Sort Rush done!', `Best combo: 🔥${st.best}. Now for a twist…`);
  const it = ITEM[id];
  SCENE.show('r1', LOOKS[(st.n) % LOOKS.length]);
  const card = $('#item'); card.hidden = false; card.className = 'itemcard';
  card.innerHTML = `<span class="who">A fairgoer hands you…</span><span class="txt">“${esc(it.t)}”</span>`;
  tray.innerHTML = `<div class="rhead"><span class="rtag">SORT RUSH</span><span>Where does it go?</span><span class="streak">${st.streak ? '🔥 Combo x' + st.streak : 'Get 3 in a row for a combo!'}</span></div>
  <div class="bigbtns"><button class="tent" data-s="tent">⛺ ← Ideology Tent<small>beliefs & where they come from</small></button><button class="booth" data-s="booth">🏛️ Party Booth →<small>an organized team that runs candidates</small></button></div><p class="fb" id="fb"></p>`;
  st.shownAt = Date.now(); r1Busy = false;
  tray.querySelectorAll('[data-s]').forEach(b => b.onclick = () => sort(b.dataset.s));
  if (locked()) pause(tray, $('#fb'), st.lockMsg, () => render(), true);
}
function sort(side) {
  if (r1Busy || locked() || st.phase !== 'r1') return;
  const id = st.queue[0], it = ITEM[id]; const r = st.r1[id] || (st.r1[id] = { wrong: 0 });
  const card = $('#item');
  if (side === it.side) {
    r1Busy = true;
    if (window.classFirstTry) classFirstTry.right('sort-' + id);
    const first = !r.wrong;
    if (first) { st.streak++; st.best = Math.max(st.best, st.streak); } else st.streak = 0;
    const speed = Math.max(0, 6 - (Date.now() - (st.shownAt || Date.now())) / 1000);
    const pts = first ? Math.round((40 + speed * 5) * (st.streak >= 3 ? 2 : 1)) : 10;
    st.score += pts; botsStep(55); st.queue.shift(); st.n++; save(); pushScore();
    card.classList.add(side === 'tent' ? 'fly-left' : 'fly-right');
    const sr = $('.scene').getBoundingClientRect();
    plus(pts, side === 'tent' ? sr.width * .14 : sr.width * .78, sr.height * .45);
    SCENE.celebrate(side);
    $('#fb').className = 'fb yay'; $('#fb').innerHTML = (st.streak >= 3 ? '🔥 COMBO! ' : '✓ ') + esc(it.why);
    hud();
    setTimeout(() => render(), 1100);
  } else {
    r.wrong++; st.streak = 0; if (window.classFirstTry) classFirstTry.wrong();
    st.queue.push(st.queue.shift()); // try it again later
    save(); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    SCENE.oops();
    pause(tray, $('#fb'), 'Oops! ' + it.why + ' It\'ll come back later.', () => render());
  }
}
document.addEventListener('keydown', e => { if (st.phase !== 'r1' || !$('#overlay').hidden) return; if (e.key === 'ArrowLeft') sort('tent'); if (e.key === 'ArrowRight') sort('booth'); });

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
  if (!c) return roundDone('r3', '🧠 Detective work done!', 'Last round: make a brand-new party.');
  SCENE.show('r2', null, c);
  const r = st.r2[st.ci] || (st.r2[st.ci] = { wrong: 0, done: false });
  const item = $('#item'); item.hidden = false; item.className = 'itemcard'; item.style.top = '4%';
  item.innerHTML = `<span class="who">${esc(c.b.name)} says…</span><span class="txt" style="font-size:19px;font-weight:800">“${esc(c.say)}”</span>`;
  if (r.done) return r2Result(c);
  const draw = msg => {
    tray.innerHTML = `<div class="rhead"><span class="rtag">SAME IDEAS, DIFFERENT BOOTHS</span><span>${esc(c.a.name)} and ${esc(c.b.name)} are both <b>${esc(c.a.ide)}</b>. Different parties!</span></div>
    <h2>Why is ${esc(c.b.name)} ${c.b.party === 'No party' ? 'not in any party' : 'a ' + esc(c.b.party)}?</h2><p class="sub"><b>${esc(c.a.ide)}</b> = ${esc(IDE_PLAIN[c.a.ide])}</p>
    <div class="chips">${shuffle(c.opts).map(k => `<button data-k="${k}">${REASONS[k]}</button>`).join('')}</div><p class="fb" id="fb">${msg ? esc(msg) : ''}</p>`;
    tray.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      if (b.dataset.k === c.right) {
        r.done = true; if (window.classFirstTry) classFirstTry.right('why-' + st.ci);
        const pts = r.wrong ? 30 : 150; st.score += pts; botsStep(130); save(); pushScore(); SCENE.confetti(); hud(); r2Result(c);
      } else { r.wrong++; if (window.classFirstTry) classFirstTry.wrong(); save(); pause(tray, $('#fb'), 'Oops! ' + c.hint, () => draw('')); }
    });
  };
  draw('');
  if (locked()) pause(tray, $('#fb'), st.lockMsg, () => draw(''), true);
}
function r2Result(c) {
  tray.innerHTML = `<div class="rhead"><span class="rtag">SAME IDEAS, DIFFERENT BOOTHS</span></div><p class="yay">✓ ${REASONS[c.right]}</p>
  <p class="why2">Same ideology, different team. People pick the party that fits them <b>best</b>, not perfectly. Things like family, one big issue, or a candidate they trust can decide it.</p>
  <div class="row"><button class="primary" id="nx">${st.ci < CASES.length - 1 ? 'Next pair →' : 'Finish round →'}</button></div>`;
  $('#nx').onclick = () => { st.ci++; save(); render(); };
}

/* ---- Round 3: Make It a Party ---- */
function pR3() {
  $('#overlay').hidden = true; $('#item').hidden = true; SCENE.show('r3');
  const r = st.r3;
  const item = $('#item'); item.hidden = false; item.className = 'itemcard'; item.style.top = '5%';
  item.innerHTML = `<span class="who">The Corn Belt Crew</span><span class="txt" style="font-size:20px">"We all share the same ideas! Can we be a party?"</span>`;
  if (r.done) return r3Result();
  const order = r.order || (r.order = shuffle(Object.keys(TILES)));
  const draw = msg => {
    tray.innerHTML = `<div class="rhead"><span class="rtag">MAKE IT A PARTY</span><span>Shared ideas = an ideology. What turns it into a party?</span><span class="streak">Picked ${r.sel.length} of 4</span></div>
    <h2>Pick the 4 things the Crew needs to become a real party.</h2>
    <div class="tiles">${order.map(k => `<button data-t="${k}" class="${r.sel.includes(k) ? 'sel' : ''}">${TILES[k].t}</button>`).join('')}</div>
    <div class="row"><button class="primary" id="make" ${r.sel.length === 4 ? '' : 'disabled'}>🏛️ Make it official!</button><span class="fb" id="fb">${msg ? esc(msg) : ''}</span></div>`;
    tray.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { const k = b.dataset.t; if (r.sel.includes(k)) r.sel = r.sel.filter(x => x !== k); else if (r.sel.length < 4) r.sel.push(k); save(); draw(''); });
    $('#make').onclick = () => {
      const good = r.sel.filter(k => TILES[k].ok).length;
      if (good === 4) { r.done = true; if (window.classFirstTry) classFirstTry.right('make-party'); st.score += r.wrong ? 40 : 150; botsStep(120); save(); pushScore(); SCENE.confetti(); hud(); r3Result(); }
      else { r.wrong++; if (window.classFirstTry) classFirstTry.wrong(); r.sel = []; r.order = shuffle(Object.keys(TILES)); save(); pause(tray, $('#fb'), `Oops! ${good} of 4 were right. Hint: a party is a TEAM that tries to win elections.`, () => pR3()); }
    };
  };
  draw('');
  if (locked()) pause(tray, $('#fb'), st.lockMsg, () => pR3(), true);
}
function r3Result() {
  SCENE.show('r3done');
  tray.innerHTML = `<div class="rhead"><span class="rtag">MAKE IT A PARTY</span></div><p class="yay">🏛️ The Corn Belt Crew is now a party!</p>
  <p class="why2">They still have the same ideas (their ideology). Now they also have members, leaders, money, and candidates. Notice what they did <b>not</b> need: everyone agreeing on every issue.</p>
  <div class="row"><button class="primary" id="nx">See my results →</button></div>`;
  $('#nx').onclick = () => { st.phase = 'final'; save(); render(); };
}

/* ---- Final + turn in ---- */
const PROMPTS = [
  { id: 'diff', short: 'Ideology vs. party', label: '1. What is the difference between an ideology and a party? Give an example of each from today.', stem: 'An ideology is ___. A party is ___. For example, ___.', min: 80,
    must: [['belief', 'idea', 'think', 'view', 'value'], ['candidate', 'member', 'organiz', 'election', 'team', 'group', 'leader', 'money', 'run']], msg: 'In answer 1, say what an ideology is (beliefs/ideas) AND what a party is (a team that runs candidates).' },
  { id: 'why', short: 'Why party ≠ ideology', label: '2. Pick Rosa, Tyler, Priya, Hank, or Maya. Why doesn\'t their party (or no party) match their ideology perfectly?', stem: '___ is ___ but their party is ___ because ___.', min: 70,
    must: [['rosa', 'tyler', 'priya', 'hank', 'maya'], ['family', 'grandpa', 'dinner', 'union', 'job', 'pay', 'candidate', 'veteran', 'trust', 'issue', 'tax', 'fit', 'no party', 'independent', 'close']], msg: 'In answer 2, name the person AND the reason (like family, their union, one issue, a candidate, or no party fits).' }
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
  tray.classList.add('tall');
  tray.innerHTML = `<div class="final"><div><p class="eyebrow">YOU DID IT!</p><p class="big">🌽 ${st.score.toLocaleString()}</p><p class="jarline">#${rank} in the class race · best combo 🔥${st.best}</p>
    <ul><li>Sort Rush right on first try: <b>${t.sort[0]} of ${t.sort[1]}</b></li><li>Same Ideas, Different Booths: <b>${t.why[0]} of ${t.why[1]}</b></li><li>Make It a Party: <b>${t.make[0] ? 'first try ✓' : 'got it ✓'}</b></li></ul>
    <p class="note">Last step: answer 2 short questions, then turn in.</p></div>
    <div>${PROMPTS.map(p => `<label for="w_${p.id}" style="display:block;font-weight:850;margin:10px 0 2px">${esc(p.label)}</label><p class="stem">Starter: ${esc(p.stem)}</p><textarea id="w_${p.id}">${esc(st.writing[p.id] || '')}</textarea>`).join('')}
    <button class="primary go" id="sendBtn">${st.turnedIn ? 'Turn in again' : 'Turn in'}</button><p class="fb ${st.turnedIn ? 'good' : ''}" id="sendMsg">${st.turnedIn ? 'Turned in! You can fix your answers and turn in again.' : ''}</p></div></div>`;
  PROMPTS.forEach(p => $('#w_' + p.id).addEventListener('input', e => { st.writing[p.id] = e.target.value; save(); }));
  $('#sendBtn').onclick = turnIn; pushScore();
}
function checkWriting(p, v) {
  const t = v.toLowerCase();
  if (/_{2,}/.test(v)) return 'Replace the ___ blanks with your own words in: ' + p.short + '.';
  if (v.length < p.min) return 'Write a little more for: ' + p.short + ' (2 full sentences).';
  const stem = new Set(p.stem.toLowerCase().match(/[a-z']+/g) || []);
  if (new Set((t.match(/[a-z']{3,}/g) || []).filter(w => !stem.has(w))).size < 6) return 'Add more of your own words for: ' + p.short + '.';
  if (p.must.some(g => !g.some(w => t.includes(w)))) return p.msg;
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
  PROMPTS.forEach(p => answers['Writing: ' + p.short] = ($('#w_' + p.id).value || '').trim());
  $('#sendBtn').disabled = true; msg.className = 'fb'; msg.textContent = 'Sending your work…';
  try {
    const res = await classTurnIn(OLD_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGN, assignmentTitle: 'Government Unit 2 · Day 1 · Tent or Booth', answers }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Your work did not save. Try again.');
    st.turnedIn = true; save(); msg.className = 'fb yay'; msg.textContent = 'Turned in! 🎉 Your teacher can see your work.'; $('#sendBtn').textContent = 'Turned in ✓'; $('#sendBtn').disabled = false;
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
    if (mode === 'r3done' || mode === 'final') sign(x, y - 196, 'CORN BELT CREW PARTY', '#3aa776');
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
    if (mode === 'r1' && look) person(W / 2 + shake, 205 + (1 - pop) * 40, .95 * sc, toLook(look), now - oopsT < 900 ? -1 : 1);
    if (mode === 'r2' && pair) {
      const xa = W * .37, xb = W * .63;
      person(xa, 215, .85 * sc, toLook(pair.a.look), 1); person(xb + shake, 215, .85 * sc, toLook(pair.b.look), now - oopsT < 900 ? -1 : 1);
      [[xa, pair.a], [xb, pair.b]].forEach(([x, p]) => { tag(x, 340, p.name + ' · ' + p.ide, '#7b5fb2'); tag(x, 374, p.party, p.party === 'Republican' ? '#c2463f' : p.party === 'Democrat' ? '#3e6fb0' : '#6b7780'); });
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
