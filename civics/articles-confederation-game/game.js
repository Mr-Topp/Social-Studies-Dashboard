'use strict';
/* 13 States. One Mess. — screens. Data and rules are in engine.js. */
const A = window.ArticlesGame, $ = q => document.querySelector(q);
const KEY = 'articles-mess-v4', OLD_KEYS = ['articles-comparison-v3'];
const STANDARD = 'SS.9-12.Gov.3, SS.9-12.Gov.9: Analyze important founding and historical documents to the United States and the State of Iowa. Assess how the United States federal system divides powers between national and state governments.';
const EXIT_Q = 'Pick ONE problem from your game. What could Congress not do under the Articles, what did that cause, and how did the Constitution fix it?';
const STARTER = 'Under the Articles, Congress could not ___';
const STEPS = 8; // 5 crises + convention + final check + write
const STATES = ['NH', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'DE', 'MD', 'VA', 'NC', 'SC', 'GA'];
let s = A.fresh(), resetArmed = false, gateTimer = null;
const readyAt = {};
try { const old = JSON.parse(localStorage.getItem(KEY)); if (old && old.v === 4) s = Object.assign(A.fresh(), old); } catch (e) {}
OLD_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
function save() { try { localStorage.setItem(KEY, JSON.stringify(s)); $('#saved').textContent = 'Saved on this device'; } catch (e) { $('#saved').textContent = 'Saving is off on this device'; } }
function esc(t) { return String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function rng(seed) { let x = (seed >>> 0) || 1; return () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; }
function shuffle(n, seed) { const r = rng(seed), a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function hash(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function stepLabel() { return s.step < 5 ? 'Crisis ' + (s.step + 1) + ' of 5' : s.step === 5 ? 'The Convention' : s.step === 6 ? 'Final check' : 'Your ending'; }

/* ---------- header: meters, 13 states, progress ---------- */
function hud(changes) {
  const m = s.meters, angry = A.angryStates(s);
  const bar = (k, label, icon, bad) => { const d = changes && changes[k]; return `<div class="meter ${k}${bad ? ' bad' : ''}"><div class="m-top"><span>${icon} ${label}</span><b>${m[k]}${d ? `<em class="${(k === 'anger' ? d < 0 : d > 0) ? 'up' : 'down'}">${d > 0 ? '+' : ''}${d}</em>` : ''}</b></div><div class="m-track"><i style="width:${m[k]}%"></i></div></div>`; };
  $('#hud').innerHTML = bar('money', 'Treasury', '💰', m.money < 20) + bar('union', 'Union', '🤝', m.union < 30) + bar('anger', 'Anger', '🔥', m.anger > 70) +
    `<div class="states" aria-label="${13 - angry} of 13 states still listen to Congress">${STATES.map((st, i) => `<span class="st${i < angry ? ' mad' : ''}" title="${st}">${st}</span>`).join('')}<small>${13 - angry} of 13 states still listen to Congress</small></div>`;
  $('#progress').innerHTML = `<span class="p-label">Step ${Math.min(s.step + 1, STEPS)} of ${STEPS} · ${stepLabel()}</span><span class="p-dots">${[...Array(STEPS).keys()].map(i => `<i class="${i < s.step ? 'done' : i === s.step ? 'now' : ''}"></i>`).join('')}</span>`;
}

/* ---------- read gate: buttons unlock after a few seconds ---------- */
function gate(key, secs, sel, label) {
  clearTimeout(gateTimer);
  if (!readyAt[key]) readyAt[key] = Date.now() + secs * 1000;
  const btns = [...document.querySelectorAll(sel)]; if (!btns.length) return;
  const note = document.createElement('p'); note.className = 'gate'; note.setAttribute('role', 'status');
  btns[0].parentElement.before(note);
  const tick = () => {
    if (!document.body.contains(btns[0])) return;
    if (document.hidden) { readyAt[key] += 500; gateTimer = setTimeout(tick, 500); return; }
    const left = Math.ceil((readyAt[key] - Date.now()) / 1000);
    if (left > 0) { btns.forEach(b => b.disabled = true); note.textContent = label + ' Opens in ' + left + '…'; gateTimer = setTimeout(tick, 400); }
    else { btns.forEach(b => b.disabled = false); note.remove(); }
  };
  tick();
}

/* ---------- the "page" on the left: the real problem ---------- */
function problemCard(r) {
  return `<article class="real-card"><div class="kicker">REAL PROBLEM · ${esc(r.year)} · ${esc(r.tag)}</div><h2>${esc(r.title)}</h2>${r.real.map(p => `<p>${esc(p)}</p>`).join('')}
  <div class="rule"><div class="rule-k">THE ARTICLES RULE · ${esc(r.rule.name)}</div><p class="quote">${esc(r.rule.text)}</p><p class="plain"><b>In plain words:</b> ${esc(r.rule.plain)}</p></div></article>`;
}

function render() {
  hud();
  if (!s.started) { $('#start').hidden = false; startCard(); return; }
  $('#start').hidden = true;
  if (s.step < 5) roundScreen(); else if (s.step === 5) convention(); else if (s.step === 6) finalCheck(); else report();
}

function startCard() {
  const back = s.step > 0 || s.phase !== 'choose';
  $('#startBody').innerHTML = back
    ? `<p class="hook">Welcome back. You’re on <b>step ${Math.min(s.step + 1, STEPS)} of ${STEPS}</b> (${stepLabel()}).</p><button id="startBtn" class="primary big">Keep going →</button>`
    : `<p class="hook">It’s 1783. America won the war. Now you have to run 13 states that don’t want to be run.</p>
       <ul class="what"><li><b>5 real crises.</b> Pick a move. Every move costs something.</li><li><b>1 convention.</b> Fix the government.</li><li><b>About 25 minutes.</b> Solo. Keep the most states on your side.</li></ul>
       <button id="startBtn" class="primary big">Take charge →</button>`;
  $('#startBtn').onclick = () => { if (!s.started && s.step === 0 && s.phase === 'choose') { if (window.classFirstTry) classFirstTry.reset(); } s.started = true; save(); render(); window.scrollTo(0, 0); };
}

/* ---------- crisis rounds ---------- */
function roundScreen() {
  const r = A.ROUNDS[s.step];
  $('#game').innerHTML = `<div class="two"><section class="left">${problemCard(r)}</section><section class="right" id="right"></section></div>`;
  if (s.phase === 'choose') chooseMove(r); else if (s.phase === 'result') showResult(r); else checkScreen(r);
}
function chooseMove(r) {
  const order = shuffle(r.moves.length, s.seed + hash(r.id));
  $('#right').innerHTML = `<div class="kicker">YOUR MOVE · YOU LEAD CONGRESS</div><h3>What do you do?</h3><p class="sub">Read the real problem first. Every move costs something. No take-backs.</p>
   <div class="moves">${order.map(i => { const m = r.moves[i]; return `<button class="move" data-move="${i}"><b>${esc(m.title)}</b><span>${esc(m.text)}</span></button>`; }).join('')}</div>`;
  const words = (r.real.join(' ') + ' ' + r.rule.text + ' ' + r.rule.plain).split(/\s+/).length;
  gate('pick' + s.step, Math.max(8, Math.min(14, Math.round(words / 6))), '[data-move]', 'Read the real problem first.');
  document.querySelectorAll('[data-move]').forEach(b => b.onclick = () => {
    if (b.disabled || s.phase !== 'choose') return;
    const m = r.moves[+b.dataset.move];
    s.lastEffects = A.applyMove(s, r, m); s.phase = 'result'; save(); render(); scrollRight();
  });
}
function showResult(r) {
  const m = r.moves.find(x => x.id === s.picks[r.id]), eff = s.lastEffects || [{ fx: m.fx, why: m.cause }];
  const total = {}; eff.forEach(e => Object.entries(e.fx).forEach(([k, v]) => total[k] = (total[k] || 0) + v));
  hud(total);
  const chips = Object.entries(total).filter(([, v]) => v).map(([k, v]) => `<span class="chip ${(k === 'anger' ? v < 0 : v > 0) ? 'good' : 'bad'}">${{ money: '💰 Treasury', union: '🤝 Union', anger: '🔥 Anger' }[k]} ${v > 0 ? '+' : ''}${v}</span>`).join('') || '<span class="chip">No change</span>';
  $('#right').innerHTML = `<div class="kicker">IN YOUR GAME · MADE UP</div><h3 class="${m.blocked ? 'blocked' : ''}">You chose: ${esc(m.title)}</h3><p class="result">${esc(m.result)}</p><div class="chips">${chips}</div>
   <p class="causes-h">Caused by:</p><ul class="causes">${eff.map(e => `<li>${esc(e.why.replace(/^Caused by: /, ''))}</li>`).join('')}</ul>
   <p class="rival"><b>${A.RIVAL} (fictional):</b> “${esc(m.rival)}”</p>
   <div class="really"><div class="kicker">WHAT REALLY HAPPENED</div><p>${esc(r.realHappened)}</p></div>
   <p class="reveal">${r.reveal}</p>
   <div class="btnrow"><button id="toCheck" class="primary">Next: quick check →</button></div>`;
  gate('res' + s.step, 6, '#toCheck', 'Read what happened.');
  $('#toCheck').onclick = () => { if ($('#toCheck').disabled) return; s.phase = 'check'; save(); render(); scrollRight(); };
}
function checkRec(id) { return s.checks[id] || (s.checks[id] = { first: null, variant: 0, salt: 0, done: false, wrongAt: 0, tries: 0 }); }
function mcBlock(rec, bank, id, msg) {
  const q = bank[rec.variant % bank.length], choices = [q.a].concat(q.w), order = shuffle(choices.length, s.seed + hash(id + rec.variant + ':' + rec.salt));
  if (rec.done) return `<div class="check done"><p class="ok">✓ Right. ${esc(q.why)}</p></div>`;
  return `<div class="check"><p class="q">${esc(q.q)}</p><div class="choices">${order.map(i => `<button class="choice" data-ans="${i}">${esc(choices[i])}</button>`).join('')}</div>${msg ? `<p class="fb" role="status">${msg}</p>` : ''}</div>`;
}
function wireMc(rec, bank, id, after, rerender) {
  const q = bank[rec.variant % bank.length];
  const left = () => Math.ceil((8000 - (Date.now() - rec.wrongAt)) / 1000);
  if (!rec.done && rec.wrongAt && left() > 0) { readyAt['mc' + id + rec.tries] = rec.wrongAt + 8000; gate('mc' + id + rec.tries, 8, '[data-ans]', 'Look back at the card.'); }
  document.querySelectorAll('[data-ans]').forEach(b => b.onclick = () => {
    if (b.disabled || rec.done) return;
    rec.tries++;
    if (+b.dataset.ans === 0) {
      if (rec.first === null) rec.first = true;
      rec.done = true; if (window.classFirstTry) classFirstTry.right(id);
      save(); after(); return;
    }
    if (rec.first === null) rec.first = false;
    if (window.classFirstTry) classFirstTry.wrong();
    rec.wrongAt = Date.now(); rec.variant++; rec.salt++;
    save(); rerender('Not quite. Go back to the card on the left and read it again. The question changed and the answers moved.');
  });
}
function checkScreen(r, msg) {
  const rec = checkRec(r.id), last = s.step === 4;
  $('#right').innerHTML = `<div class="kicker">QUICK CHECK · USE THE CARD</div><h3>Prove it from the page.</h3>${mcBlock(rec, r.checks, r.id, msg)}
   ${rec.done ? `<div class="btnrow"><button id="nextStep" class="primary">${last ? 'Next: the Convention →' : 'Next crisis →'}</button></div>` : '<p class="sub">Wrong answers lock the choices for a few seconds.</p>'}`;
  wireMc(rec, r.checks, r.id, () => render(), m => checkScreen(r, m));
  if ($('#nextStep')) $('#nextStep').onclick = () => { s.step++; s.phase = 'choose'; s.lastEffects = null; save(); render(); window.scrollTo(0, 0); };
}
function scrollRight() { const el = $('#right'); if (el && el.getBoundingClientRect().top < 0 || window.innerWidth < 900) el && el.scrollIntoView({ block: 'start', behavior: 'smooth' }); }

/* ---------- the Convention: match each problem to its fix ---------- */
function convention(msg, ok) {
  const done = A.PROBLEMS.filter(p => s.fixes[p.round] && s.fixes[p.round].done).length;
  const cur = A.PROBLEMS.find(p => !(s.fixes[p.round] && s.fixes[p.round].done));
  const yourMove = p => { const r = A.ROUNDS.find(x => x.id === p.round), m = r.moves.find(x => x.id === s.picks[p.round]); return m ? m.title : '—'; };
  const dmg = `<article class="real-card convention-card"><div class="kicker">PHILADELPHIA · MAY 1787 · REAL</div><h2>The Convention</h2><p>Delegates from 12 states meet in Philadelphia. They planned to fix the Articles. Instead, they write a whole new <b>Constitution</b>.</p>
    <div class="kicker">YOUR DAMAGE REPORT</div><ol class="damage">${A.PROBLEMS.map(p => { const f = s.fixes[p.round]; return `<li class="${f && f.done ? 'fixed' : p === cur ? 'now' : ''}"><b>${esc(p.label)}</b><span>Your move: ${esc(yourMove(p))}</span>${f && f.done ? `<em>✓ Fixed by: ${esc(A.FIXES.find(x => x.id === p.fix).cite)}</em>` : ''}</li>`; }).join('')}</ol></article>`;
  let right;
  if (cur) {
    const rec = s.fixes[cur.round] || (s.fixes[cur.round] = { first: null, salt: 0, done: false, wrongAt: 0, tries: 0 });
    const order = shuffle(A.FIXES.length, s.seed + hash('fix' + cur.round + rec.salt));
    right = `<div class="kicker">FIX ${done + 1} OF 5 · YOU WRITE THE CONSTITUTION</div>${ok ? `<p class="ok">${ok}</p>` : ''}<h3>${esc(cur.label)}</h3><p class="sub">Which part of the new Constitution fixes this problem?</p>
      <div class="choices fixes">${order.map(i => `<button class="choice fix" data-fix="${i}">${esc(A.FIXES[i].text)}</button>`).join('')}</div>${msg ? `<p class="fb" role="status">${msg}</p>` : ''}`;
    $('#game').innerHTML = `<div class="two"><section class="left">${dmg}</section><section class="right" id="right">${right}</section></div>`;
    if (rec.wrongAt && Date.now() - rec.wrongAt < 6000) { readyAt['fx' + cur.round + rec.tries] = rec.wrongAt + 6000; gate('fx' + cur.round + rec.tries, 6, '[data-fix]', 'Think about what was missing.'); }
    document.querySelectorAll('[data-fix]').forEach(b => b.onclick = () => {
      if (b.disabled) return; rec.tries++;
      const pick = A.FIXES[+b.dataset.fix];
      if (pick.id === cur.fix) { if (rec.first === null) rec.first = true; rec.done = true; if (window.classFirstTry) classFirstTry.right('fix-' + cur.round); save(); convention('', '✓ Fixed: ' + esc(pick.text) + ' (' + esc(pick.cite) + ')'); return; }
      if (rec.first === null) rec.first = false; s.fixWrong++; rec.wrongAt = Date.now(); rec.salt++;
      if (window.classFirstTry) classFirstTry.wrong();
      save(); convention(pick.id === 'decoy' ? 'No. The Constitution kept state governments. Power is divided, not taken. The cards moved.' : 'That fix solves a different problem. What exactly was missing here? The cards moved.');
    });
  } else {
    right = `<div class="kicker">ALL 5 FIXED</div>${ok ? `<p class="ok">${ok}</p>` : ''}<h3>The new plan is ready.</h3><p class="result">The Constitution gives Congress the powers the Articles were missing. States keep their own governments. This split is called <b>federalism</b>.</p><div class="btnrow"><button id="nextStep" class="primary">Next: final check →</button></div>`;
    $('#game').innerHTML = `<div class="two"><section class="left">${dmg}</section><section class="right" id="right">${right}</section></div>`;
    $('#nextStep').onclick = () => { s.step = 6; save(); render(); window.scrollTo(0, 0); };
  }
}

/* ---------- final check (Gov.9) ---------- */
function finalCheck(msg) {
  const rec = s.final || (s.final = { first: null, variant: 0, salt: 0, done: false, wrongAt: 0, tries: 0 });
  const fed = `<article class="real-card"><div class="kicker">THE NEW PLAN · 1787</div><h2>Federalism: power is split</h2>
    <div class="split"><div><b>🏛️ National government</b><p>Taxes for national needs. Army and navy. Trade between states. Treaties.</p></div><div><b>🏠 State governments</b><p>Their own lawmakers, courts, and taxes. Schools, roads, police, and local matters.</p></div></div>
    <p class="plain">The national government also helps states get along: it sets one set of rules for trade that crosses state lines.</p></article>`;
  $('#game').innerHTML = `<div class="two"><section class="left">${fed}</section><section class="right" id="right"><div class="kicker">FINAL CHECK · STEP 7 OF 8</div><h3>One more question.</h3>${mcBlock(rec, A.FINAL, 'final', msg)}${rec.done ? '<div class="btnrow"><button id="nextStep" class="primary">See how it ended →</button></div>' : ''}</section></div>`;
  wireMc(rec, A.FINAL, 'final', () => finalCheck(), m => finalCheck(m));
  if ($('#nextStep')) $('#nextStep').onclick = () => { s.step = 7; save(); render(); window.scrollTo(0, 0); };
}

/* ---------- report, writing, turn-in ---------- */
function report() {
  const e = A.ending(s), done = s.turnedIn || [];
  const listen = 13 - A.angryStates(s);
  $('#game').innerHTML = `<div class="two"><section class="left"><article class="real-card score-card ending-${e.key}"><div class="kicker">HOW YOUR UNION ENDED · 1787</div><h2>${esc(e.title)}</h2><p class="ending">${esc(e.text)}</p>
    <div class="final-meters"><div><span>🤝 States still listening</span><b>${listen} of 13</b></div><div><span>💰 Treasury</span><b>${s.meters.money}</b></div><div><span>🔥 Anger</span><b>${s.meters.anger}</b></div></div>
    ${s.blocked ? `<p class="sub">${s.blocked} of your moves ${s.blocked > 1 ? 'were' : 'was'} blocked by the Articles.</p>` : ''}
    <p class="sub">Compare with your class: who kept the most states listening?</p>
    <div class="kicker">YOUR MOVES</div><ol class="moves-log">${s.log.map(l => `<li>${esc(l)}</li>`).join('')}</ol></article></section>
    <section class="right" id="right"><div class="kicker">STEP 8 OF 8 · TURN IN</div><h3>Explain one fix.</h3>
    <label for="exitAnswer" class="q">${esc(EXIT_Q)}</label><p class="starter">Start like this: <b>${esc(STARTER)}</b></p>
    <textarea id="exitAnswer" rows="5" placeholder="Under the Articles, Congress could not…">${esc(s.writing || '')}</textarea><p id="wHelp" class="sub" role="status"></p>
    <label for="studentName">Your name (first name + last initial)</label><input id="studentName" type="text" autocomplete="off" placeholder="Jordan M.">
    <button id="turnInBtn" class="primary big">${done.length ? 'Turn in again' : 'Turn in'}</button><p id="tiStatus" class="ti-status" role="status" aria-live="polite">${done.length ? '✓ Turned in for ' + done.map(esc).join(', ') + '.' : ''}</p>
    <div class="btnrow"><button id="printBtn" class="ghost">Print my report</button></div></section></div>`;
  const ta = $('#exitAnswer');
  if (!ta.value) { ta.value = STARTER.replace('___', ''); }
  ta.oninput = () => { s.writing = ta.value; save(); $('#wHelp').textContent = ''; };
  $('#printBtn').onclick = () => window.print();
  $('#turnInBtn').onclick = turnIn;
}
async function turnIn() {
  const st = $('#tiStatus'), ans = $('#exitAnswer').value.trim(), name = $('#studentName').value.trim(), btn = $('#turnInBtn');
  const problem = A.checkWriting(ans, STARTER);
  if (problem) { $('#wHelp').textContent = problem; $('#wHelp').className = 'sub warn'; $('#exitAnswer').focus(); return; }
  if (!name) { st.textContent = 'Type your first name and last initial, like Jordan M.'; $('#studentName').focus(); return; }
  if (!window.classTurnIn) { st.textContent = 'Turn-in is not available right now. Tell your teacher.'; return; }
  const e = A.ending(s);
  const firstTry = (rec) => !rec ? 'not done' : rec.first ? 'first try' : 'after ' + Math.max(1, rec.tries - 1) + ' wrong';
  const answers = {
    Standard: STANDARD,
    Ending: e.title + ' (Treasury ' + s.meters.money + ', Union ' + s.meters.union + ', Anger ' + s.meters.anger + ')',
    'Moves': s.log.join(' | '),
    'Moves blocked by the Articles': String(s.blocked),
    'Crisis checks (Gov.3)': A.ROUNDS.map((r, i) => (i + 1) + ') ' + r.tag.toLowerCase() + ': ' + firstTry(s.checks[r.id])).join('; '),
    'Constitution fixes (Gov.3)': A.PROBLEMS.map(p => p.fix + ': ' + firstTry(s.fixes[p.round])).join('; '),
    'Federalism check (Gov.9)': firstTry(s.final),
    'Exit question': EXIT_Q,
    'Answer': ans
  };
  btn.disabled = true; st.textContent = 'Turning in…';
  try {
    const res = await classTurnIn('https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentName: name, assignmentId: 'gov-articles-day5', answers }) });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(d.error || 'Your work did not save. Try again.');
    s.turnedIn = [...(s.turnedIn || []), window.classShortName ? classShortName(name) : name]; save();
    report(); $('#tiStatus').textContent = 'Turned in! Your teacher can see your work. You can close this page.';
  } catch (err) { st.textContent = err.message; btn.disabled = false; }
}

/* ---------- buttons that are always there ---------- */
$('#sourceBtn').onclick = () => $('#sourceDialog').showModal();
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => $('#' + b.dataset.close).close());
$('#restartBtn').onclick = () => {
  if (!resetArmed) { resetArmed = true; $('#restartBtn').textContent = 'Click again to restart'; setTimeout(() => { resetArmed = false; $('#restartBtn').textContent = 'Restart'; }, 4000); return; }
  try { localStorage.removeItem(KEY); } catch (e) {} if (window.classFirstTry) classFirstTry.reset(); location.reload();
};
const returning = s.started;
render();
if (returning) { const w = document.createElement('p'); w.className = 'welcome'; w.setAttribute('role', 'status'); w.innerHTML = 'Welcome back! You’re on <b>step ' + Math.min(s.step + 1, STEPS) + ' of ' + STEPS + '</b> (' + stepLabel() + ').'; $('#game').before(w); setTimeout(() => w.remove(), 9000); }
