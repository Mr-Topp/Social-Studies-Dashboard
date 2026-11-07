'use strict';
/* =====================================================================
   SIGNAL BREAK · Government Unit 2 Day 3 · SS.9-12.Gov.12 (+ Gov.13)
   One-player remake (Fynn, 11-06-26) of the old class "Swipe Lab / Bot Battle".
   Eight viral posts. Each one is built on a REAL claim from 2025-2026 that a
   fact-checker or official source checked (sources at the bottom of each post).
   Usernames and the people posting are made up. Bots (Maya, Jax, Zoe) are made up.
   For each post: 1) pick the best checking move (lateral reading),
   2) call it REAL / FAKE / MISLEADING, 3) answer a bot classmate's pushback.
   Then 3 closing checks. Turn-in goes through shared/turnin.js (first try per check).
   ===================================================================== */
(() => {
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const KEY = 'gov-u2d3-signalbreak-v1';
const ASSIGN = 'gov-u2-d3-signal-break';
const OLD_API = 'https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit';
const isTestT = () => !!(window.classIsTestT && window.classIsTestT());
const FT = { right: id => { if (window.classFirstTry) classFirstTry.right(id); }, wrong: () => { if (window.classFirstTry) classFirstTry.wrong(); } };

const BOTS = {
  maya: { name: 'Maya', face: '😲', tag: 'shares first' },
  jax:  { name: 'Jax',  face: '🧐', tag: 'always checks' },
  zoe:  { name: 'Zoe',  face: '🤔', tag: 'gets fooled' }
};
const VERDICT = {
  REAL: { ic: '✅', d: 'True. Trusted sources back it up.' },
  FAKE: { ic: '❌', d: 'Made up, or pretending to be someone.' },
  MISLEADING: { ic: '⚠️', d: 'Something real in it, but twisted.' }
};
const MOVES = {
  official: '🏛️ Go to the official source',
  others: '📰 See what other trusted sources say',
  context: '🧩 Find the real context',
  origin: '📍 Trace it back to where it started'
};

/* ---------------- THE POSTS (all built on real, checked claims) ---------------- */
const POSTS = [
  { id: 'toll', av: '🚗', user: '@kayla.drives.ia', when: 'Mar 2026', likes: '212', shares: 890,
    text: 'Just got this text 😳 Is this real?? I don\'t want a late fee.',
    media: { kind: 'sms', from: 'IOWA-DOT', body: 'Iowa DOT: You have an unpaid toll of $6.99. Pay today to avoid a $50 late fee: iowa-dot-pay[.]link' },
    bots: [['maya', 'Just pay it so you don\'t get the fee!'], ['jax', 'Wait. Does Iowa even have toll roads?'], ['zoe', 'It says Iowa DOT, so it\'s official.']],
    moves: [
      { t: 'Go to the Iowa DOT\'s own website yourself', good: true,
        tab: 'Iowa DOT warning (Mar. 27, 2026): "Iowa does not have toll roads." The DOT "will never text customers asking for private or financial information."' },
      { t: 'Tap the link to see if the website looks official', tab: 'Stop! Scam links can steal your card number. Fake sites are built to look exactly like the real one.' },
      { t: 'Reply STOP to see if a real company answers', tab: 'Replying tells scammers your number works. The DOT says: don\'t reply, report it as junk.' },
      { t: 'Search the web address and open the top result', tab: 'The top result is an ad for a "toll payment" site. Ads and look-alike sites aren\'t the real DOT.' }
    ],
    move: 'official', verdict: 'FAKE',
    why: 'It pretends to be the government. Iowa has no toll roads, and the DOT never texts for payment.',
    battle: { bot: 'zoe', say: 'But it uses the real name "Iowa DOT." Scammers can\'t just use that, right?',
      opts: ['Anyone can type a name. The real DOT never texts asking for money.', 'True, but the fee is tiny, so it\'s probably just a billing mistake.', 'Scammers can\'t, but the link looks strange, so I\'d wait a day to pay.'],
      hint: 'Look at your evidence: what does the real Iowa DOT say it never does?' },
    note: 'The text in the screenshot is an example of the scam the DOT warned about.',
    matters: 'Scams that copy government names cost people money and make them trust real government messages less. Report it as junk and delete it.',
    src: { name: 'Iowa DOT news release', date: 'Mar. 27, 2026', url: 'https://iowadot.gov/news/2026-03-27/fraudulent-text-messages-target-recipients-false-claims-unpaid-tolls-or-traffic-violations' } },

  { id: 'penny', av: '🪙', user: '@coin.nerd.dev', when: 'Nov 12, 2025', likes: '8.4K', shares: 3100,
    text: 'No joke: the U.S. just made its LAST penny. 🪦 1793–2025. Go check your couch cushions.',
    media: null,
    bots: [['maya', 'Lol fake. They\'d never get rid of money.'], ['jax', 'Let\'s see who else is reporting it.'], ['zoe', 'So pennies are illegal now?? 😬']],
    moves: [
      { t: 'Search other news outlets for the same story', good: true,
        tab: 'AP (Nov. 12, 2025): the U.S. Mint in Philadelphia pressed its final pennies. Each one cost almost 4 cents to make. The U.S. Mint held its own ceremony for the last one.' },
      { t: 'Check the account\'s profile picture and bio', tab: 'Bio: "coin nerd 🪙". Fun, but a bio doesn\'t prove a post is true or false.' },
      { t: 'Search the app for more posts about the penny', tab: 'Thousands of posts. Some say real, some say fake. More posts aren\'t the same as trusted news.' },
      { t: 'Go with your gut: does it sound too weird to be true?', tab: 'Weird isn\'t the same as fake. Your gut is not a source.' }
    ],
    move: 'others', verdict: 'REAL',
    why: 'Weird news can be true. Many trusted sources report the same thing.',
    battle: { bot: 'zoe', say: 'So if I find a penny now, it\'s illegal to spend it?',
      opts: ['No. New ones stopped, but old pennies are still legal money.', 'Yes. Once the Mint stops making a coin, stores can\'t take it anymore.', 'Only in Philadelphia, since that\'s where the last ones were made.'],
      hint: 'AP says pennies are still "legal tender." That means you can still spend them.' },
    matters: 'This was a real government decision: the President ordered it to save money. True news tells people what their government changed.',
    src: { name: 'AP, via ABC7 Chicago', date: 'Nov. 12, 2025', url: 'https://abc7chicago.com/post/last-penny-being-minted-philadelphia-wednesday/18148058/' } },

  { id: 'ss150', av: '🧾', user: '@budget_hawk_77', when: 'Feb 2025', likes: '41K', shares: 12800,
    text: 'Government records list MILLIONS of people over 100 on Social Security. Some are "150 years old"! 🧛 Taxpayers are paying dead people!',
    media: { kind: 'shot', body: 'Screenshot of a records chart: "Age 100–369 · marked ALIVE · millions"' },
    bots: [['maya', 'That\'s so much fraud. Sharing!'], ['jax', 'Being on a list isn\'t the same as getting paid.'], ['zoe', 'The chart has real numbers, so it\'s true.']],
    moves: [
      { t: 'Find out what that list of records is used for', good: true,
        tab: 'ABC News (Feb. 20, 2025): experts say it\'s a list of everyone ever given a Social Security number. Many died long ago with no death date saved. Checks are paid from a different list. Payments stop at age 115.' },
      { t: 'Zoom in to see if the screenshot was edited or cropped', tab: 'The numbers look real. The question isn\'t the numbers. It\'s what they mean.' },
      { t: 'Find more accounts sharing the same chart', tab: 'Lots of accounts share it. Same chart, same claim. Copies aren\'t new proof.' },
      { t: 'Look up how much Social Security costs each year', tab: 'About $1 trillion a year. A big number, but it doesn\'t show who is getting paid.' }
    ],
    move: 'context', verdict: 'MISLEADING',
    why: 'The numbers are real, but they don\'t show dead people getting checks.',
    battle: { bot: 'maya', say: 'Okay, but SOME mistakes happen. So the post is basically right.',
      opts: ['Mistakes happen, but that list doesn\'t show dead people getting paid.', 'Right. Even a few mistakes prove the 150-year-old claim is true.', 'If some mistakes happen, then the post is close enough to share anyway.'],
      hint: 'Mistakes can be real AND the post can still twist the numbers. Which reply says both?' },
    matters: 'Leaders and voters could push big changes to fix a problem that is much smaller than it looks.',
    src: { name: 'ABC News', date: 'Feb. 20, 2025', url: 'https://abc7news.com/post/new-social-security-chief-contradicts-claims-millions-dead-people-are-getting-payouts/15933337/' } },

  { id: 'vance', av: '🎙️', user: '@realtalk.politix', when: 'Mar 23, 2025', likes: '87K', shares: 24000,
    text: 'LEAKED AUDIO 🔥 VP JD Vance caught trashing Elon Musk in private. Listen before it gets deleted!',
    media: { kind: 'audio', body: '0:41 · fuzzy sound · "LEAKED 3/23/25"' },
    bots: [['maya', 'Wow, he got exposed. Reposting!'], ['jax', 'Where did this recording come from?'], ['zoe', 'It sounds kind of like him…']],
    moves: [
      { t: 'Search for fact-checks about the clip', good: true,
        tab: 'FactCheck.org (Mar. 25, 2025): Vance\'s spokesperson said the audio is "100% fake." An expert said the voice doesn\'t match how Vance talks, and fuzzy sound is a trick to hide edits. No one showed where it was recorded.' },
      { t: 'Listen again, louder, with headphones', tab: 'It still sounds "kind of" like him. AI voices can fool your ears. You need proof from outside the post.' },
      { t: 'Ask an AI chatbot if the audio is real', tab: 'The chatbot can\'t hear this clip, and it might just guess. Look for people who actually checked it.' },
      { t: 'Read the caption for the date it was recorded', tab: 'It says "3/23/25" but not where, or who recorded it. A date isn\'t a source.' }
    ],
    move: 'others', verdict: 'FAKE',
    why: 'It\'s an AI-made voice, not a real recording.',
    battle: { bot: 'zoe', say: 'His team would say it\'s fake even if it was real.',
      opts: ['Maybe, but an expert also found signs of AI, and there\'s no source.', 'Good point. If his team denies it, then it\'s probably real after all.', 'True, so no one can know. It\'s fine to share if you add "maybe."'],
      hint: 'Don\'t trust only one side. What ELSE did the fact-check find?' },
    matters: 'Fake audio can make voters angry at a leader for something they never said. Anyone can be a target, from any party.',
    src: { name: 'FactCheck.org', date: 'Mar. 25, 2025', url: 'https://www.factcheck.org/2025/03/viral-posts-share-phony-leaked-audio-of-vance-criticizing-musk/' } },

  { id: 'primary', av: '🌽', user: '@cornfed.takes', when: 'Jun 2, 2026', likes: '5.2K', shares: 2600,
    text: 'WAIT 😮 Trump endorsed Randy Feenstra for Iowa governor… and Feenstra LOST the Republican primary to Zach Lahn??',
    media: null,
    bots: [['maya', 'No way. Trump\'s pick always wins. Fake.'], ['jax', 'Let\'s check the election news.'], ['zoe', 'Maybe it\'s a parody account?']],
    moves: [
      { t: 'Search trusted news outlets for the result', good: true,
        tab: 'AP (June 2026): Zach Lahn, a businessman and farmer, narrowly beat U.S. Rep. Randy Feenstra, who Trump endorsed (publicly backed), in Iowa\'s Republican primary for governor. Feenstra conceded (admitted he lost) and called Lahn.' },
      { t: 'Search the app for a video of the results', tab: 'You find clips, but you can\'t tell which are old or edited. Look for trusted news outlets.' },
      { t: 'Go with your gut: does it sound believable?', tab: 'Surprising isn\'t the same as fake. Your gut is not a source.' },
      { t: 'See if the account posts about politics a lot', tab: 'It does. Posting a lot about a topic doesn\'t make a post true or false.' }
    ],
    move: 'others', verdict: 'REAL',
    why: 'Trusted outlets report it, and the candidate who lost admitted it.',
    battle: { bot: 'maya', say: 'An endorsement means the party already picked the winner.',
      opts: ['No. In a primary, the party\'s voters pick who runs.', 'Yes. The party leader picks, and the primary vote is just for show.', 'No. In Iowa, the governor picks who runs for governor next.'],
      hint: 'Who votes in a primary election?' },
    matters: 'Parties and endorsements try to sway voters, but voters decide. Knowing the real result helps you get ready for November.',
    src: { name: 'AP, via PBS NewsHour', date: 'June 2026', url: 'https://www.pbs.org/newshour/politics/maha-candidate-beats-trumps-choice-in-republican-primary-for-iowa-governor' } },

  { id: 'holes', av: '📬', user: '@ballot.watch.ana', when: 'Oct 2026', likes: '33K', shares: 15400,
    text: '🚨 Look at this California ballot envelope. There\'s a HOLE where you can see who people voted for. This is how they rig elections!',
    media: { kind: 'video', body: '▶ 0:58 · a man holds up a mail-ballot envelope with a punched hole' },
    bots: [['maya', 'Rigged!! Everyone needs to see this.'], ['jax', 'Why would they put a hole there?'], ['zoe', 'There IS a hole. So it must be true.']],
    moves: [
      { t: 'Find what the local election office says', good: true,
        tab: 'Ventura County election office (via AP, Oct. 29, 2026): the holes help voters who can\'t see well find where to sign, and let workers see the envelope is empty. They are not placed to show votes. Voters can fold the ballot any way.' },
      { t: 'Rewatch the video in slow motion', tab: 'Yes, the hole is real. Watching again doesn\'t tell you WHY it\'s there.' },
      { t: 'Read the replies to see what people think', tab: 'Half say "rigged," half say "fake." Arguing isn\'t evidence.' },
      { t: 'Look up the other videos the man has posted', tab: 'He posts a lot about elections. That tells you about him, not about why the holes are there.' }
    ],
    move: 'official', verdict: 'MISLEADING',
    why: 'The hole is real, but it\'s there to help voters who can\'t see well, not to rig votes.',
    battle: { bot: 'zoe', say: 'But if a vote shows through, someone could still peek.',
      opts: ['Voters can fold the ballot any way. The hole isn\'t placed to show votes.', 'Good point. If someone could peek, then the post is right about rigging.', 'True, so everyone should stop voting by mail just to be totally safe.'],
      hint: 'What did the election office say voters can do with the ballot?' },
    matters: 'Posts like this can make people stop trusting elections, or skip voting, even when there\'s a good reason for the design.',
    src: { name: 'AP Fact Focus, via Daily Independent', date: 'Oct. 29, 2026', url: 'https://www.yourvalley.net/stories/fact-focus-misinformation-about-voting-spreads-less-than-a-week-before-election-day,736106' } },

  { id: 'flip', av: '🗳️', user: '@purple.state.jen', when: 'Oct 2026', likes: '28K', shares: 11900,
    text: '😡 My aunt tapped the Democrat and the screen picked the REPUBLICAN. Voting machines are flipping votes in multiple states! Share!',
    media: null,
    bots: [['maya', 'They\'re stealing votes! Share it!'], ['jax', 'Did anyone check the printed ballot?'], ['zoe', 'If it happened to her aunt, that\'s proof.']],
    moves: [
      { t: 'Find what election officials say about touchscreens', good: true,
        tab: 'AP (Oct. 29, 2026): officials say it\'s almost always a mis-tap or a screen that needs adjusting. Complaints aren\'t higher than past years. The machines in these reports print a paper ballot to check before it counts. If it\'s wrong, tell a poll worker.' },
      { t: 'Look for more posts from people saying it happened to them too', tab: 'Lots of posts say it happened. But many posts repeating a claim aren\'t proof of cheating.' },
      { t: 'Check if she lives in a swing state', tab: 'Where she lives doesn\'t tell you what caused the screen problem.' },
      { t: 'Notice the angry tone and all the capital letters', tab: 'Angry posts spread fast. Tone is a warning sign, not proof either way.' }
    ],
    move: 'official', verdict: 'MISLEADING',
    why: 'Screen mix-ups really happen, but they\'re usually mis-taps, and voters can fix them before the vote counts.',
    battle: { bot: 'maya', say: 'If ONE machine messed up, the whole election is rigged.',
      opts: ['A mis-tap can happen, but voters check the paper and can fix it.', 'Her aunt probably made it up, since people lie online for likes.', 'Maybe. To be safe, people should skip voting until it\'s fixed.'],
      hint: 'What does the machine print before the vote counts?' },
    matters: 'If people believe machines steal votes, they might not vote, or might not trust who wins. Notice: the last post scared one side, this one scares the other.',
    src: { name: 'AP Fact Focus, via Daily Independent', date: 'Oct. 29, 2026', url: 'https://www.yourvalley.net/stories/fact-focus-misinformation-about-voting-spreads-less-than-a-week-before-election-day,736106' } },

  { id: 'shot', av: '📱', user: '@nolan.reacts', when: 'Oct 26, 2026', likes: '36K', shares: 18300,
    text: 'Trump already posted that Republicans WON the midterms in a "historic landslide"?? Election Day isn\'t even here yet 💀',
    media: { kind: 'shot', body: 'Screenshot of a Truth Social post: "…won the midterms in a historic landslide… why are ballots still being counted?"' },
    bots: [['maya', 'He really said that?! Posting it.'], ['jax', 'Is it on his real account?'], ['zoe', 'It\'s a screenshot. You can\'t fake those… right?']],
    moves: [
      { t: 'Check his real account and where the image started', good: true,
        tab: 'Full Fact (Oct. 29, 2026): no post like this is on his account or in archives that save all his posts. The first copy came from a Facebook page that calls itself "satirical" (joke news). An AI checker said the image was made or edited with AI.' },
      { t: 'Look at the like and share counts in the screenshot', tab: 'It shows 36.7K likes. Anyone making a fake can type any number.' },
      { t: 'Search the app for other copies of the screenshot', tab: 'You find lots of copies, all with the exact same like count. That\'s a clue, but copies don\'t show where it came from.' },
      { t: 'Read the screenshot again, more carefully, word by word', tab: 'Reading it again tells you what it says, not whether he said it.' }
    ],
    move: 'origin', verdict: 'FAKE',
    why: 'He never posted it. It started as a joke page\'s fake screenshot.',
    battle: { bot: 'zoe', say: 'But it came from a joke page. Jokes aren\'t misinformation.',
      opts: ['Off the joke page, there\'s no label, so people believe it\'s real.', 'Right. If it started as a joke, it\'s fine to share it anywhere you want.', 'It\'s fine, because people who share it should know it\'s a joke.'],
      hint: 'What happens when a joke gets shared without the "satire" label?' },
    matters: 'Fake "we already won" posts before votes are counted can make people think counting is cheating.',
    src: { name: 'Full Fact', date: 'Oct. 29, 2026', url: 'https://fullfact.org/us/donald-trump-fake-truth-social-post-republicans-midterms/' } }
];

const CLOSERS = [
  { id: 'c_lateral', tag: 'The big move',
    q: 'Look back at the moves that worked today. What did they all have in common?',
    opts: ['They left the post and checked what other trusted sources said.', 'They stayed on the post and studied its words and pictures closely.', 'They trusted posts with lots of likes, shares, and checkmarks.', 'They went with whatever felt right after a quick first look.'],
    hint: 'Did the winning moves stay on the post, or leave it?' },
  { id: 'c_gov12', tag: 'Media and government',
    q: 'News and social media are "go-betweens" that connect people to government. Which post shows how a false post could change what government does?',
    opts: ['The Social Security post: leaders might fix fraud much smaller than it looks.', 'The penny post: it shows social media made the Mint stop making pennies.', 'The toll text: it shows the Iowa DOT is about to start charging tolls.', 'The primary post: it shows a viral post can change who won after an election.'],
    hint: 'Which post\'s false claim could push leaders to change a program?' },
  { id: 'c_iowa', tag: 'Iowa elections',
    q: 'A post says Iowa polling places moved this year. What is the best first move?',
    opts: ['Check the Iowa Secretary of State or your county auditor\'s site.', 'Look for a blue checkmark on the account that posted it first.', 'Share it with "is this true?" so your friends can check it for you.', 'Wait for the comments to tell you whether it\'s real.'],
    hint: 'For election info, go to the officials who run elections.',
    src: { name: 'Iowa Secretary of State', url: 'https://sos.iowa.gov/news-resources/iowa-secretary-state-urges-iowa-voters-stay-alert-when-receiving-election' } }
];

/* ---------------- STATE ---------------- */
const N = POSTS.length;
const fresh = () => ({ v: 1, name: '', phase: 'title', p: 0, step: 'move', res: {}, close: {}, ci: 0, score: 0, bots: { maya: 0, jax: 0, zoe: 0 }, turnedIn: false, lockUntil: 0, lockMsg: '' });
let st;
try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
if (!st || st.v !== 1) st = fresh();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
const rec = id => st.res[id] || (st.res[id] = { tried: [], moveWrong: 0, callWrong: 0, battleWrong: 0, moveDone: false, callDone: false, battleDone: false, pts: 0, extra: 0 });
const crec = id => st.close[id] || (st.close[id] = { wrong: 0, done: false });
const cur = () => POSTS[Math.min(st.p, N - 1)];
const app = $('#app');

/* ---------------- HUD ---------------- */
function hud() {
  $('#postPill').textContent = st.phase === 'play' ? 'Post ' + (st.p + 1) + ' of ' + N : st.phase === 'close' ? 'Final checks' : st.phase === 'final' ? 'Done' : '';
  $('#scorePill').textContent = (st.phase === 'title' || st.phase === 'name') ? '' : '⚡ ' + st.score.toLocaleString();
  const rows = [{ n: 'You', s: st.score, me: true }].concat(Object.keys(BOTS).map(k => ({ n: BOTS[k].face + ' ' + BOTS[k].name, s: st.bots[k] }))).sort((a, b) => b.s - a.s);
  $('#race').innerHTML = (st.phase === 'title' || st.phase === 'name' || st.phase === 'how') ? '' : rows.map((r, i) => `<span class="${r.me ? 'me' : ''}">${i + 1}. ${esc(r.n)} <b>${r.s}</b></span>`).join('');
}
function botsStep() {
  // Bots: Jax checks (strong), Zoe sometimes fooled, Maya shares first.
  st.bots.jax += 280 + Math.round(Math.random() * 60);
  st.bots.zoe += 150 + Math.round(Math.random() * 120);
  st.bots.maya += 80 + Math.round(Math.random() * 120);
}

/* ---------------- WRONG-ANSWER LOCK ---------------- */
function lockThen(box, msg, redraw) {
  box.querySelectorAll('button.opt').forEach(b => b.disabled = true);
  st.lockUntil = Date.now() + (isTestT() ? 0 : 1500); st.lockMsg = msg; save();
  const fb = $('#fb'); if (fb) { fb.className = 'fb bad'; fb.textContent = msg; }
  const tick = () => { if (Date.now() >= (st.lockUntil || 0)) { st.lockUntil = 0; save(); redraw(msg); showFb(msg); return; } setTimeout(tick, 150); };
  tick();
}
// After the lock ends the choices come back reshuffled with no red, but the hint stays so they can read it.
function showFb(msg) { const fb = $('#fb'); if (fb && msg) { fb.className = 'fb hint'; fb.textContent = msg; } }

/* ---------------- RENDER ---------------- */
function render() {
  hud();
  document.body.dataset.phase = st.phase;
  ({ title: pTitle, name: pName, how: pHow, play: pPlay, close: pClose, final: pFinal })[st.phase]();
  window.scrollTo(0, 0);
}

function pTitle() {
  app.innerHTML = `<section class="hero">
    <p class="eyebrow">GOVERNMENT · UNIT 2 · DAY 3</p>
    <h1>Catch the fake <em>before it spreads.</em></h1>
    <p class="lead">Eight posts are blowing up your feed. All of them are built on real stories from 2025 and 2026. Some are true. Some are fake. Some twist the truth.</p>
    <div class="trio"><div><span>🔎</span><b>Check it</b>Pick the best move</div><div><span>⚖️</span><b>Call it</b>Real, fake, or misleading?</div><div><span>🤖</span><b>Clap back</b>Out-argue a bot</div></div>
    <p class="meta">8 posts · 3 final checks · about 20–25 minutes · turn in at the end</p>
    <button class="primary big" id="go">▶ Start</button>
    <p class="missed"><b>What you missed:</b> Days 1–2 were about political parties, which connect people to government. Today is about the other big go-between: <b>the media</b>.</p>
  </section>`;
  $('#go').onclick = () => { st.phase = 'name'; save(); render(); };
}

function pName() {
  app.innerHTML = `<section class="card narrow">
    <h2>Who's checking the feed?</h2>
    <label for="nm">Your name (first name + last initial)</label>
    <input id="nm" maxlength="40" autocomplete="off" value="${esc(st.name)}" placeholder="Jordan M.">
    <p class="fb" id="nmMsg"></p>
    <button class="primary" id="startBtn">Let's go →</button>
  </section>`;
  const go = () => {
    const n = window.classShortName ? classShortName($('#nm').value) : $('#nm').value.trim();
    if (!/^\S+ [A-Z]\.$/.test(n)) { $('#nmMsg').className = 'fb bad'; $('#nmMsg').textContent = 'Type your first name and last initial, like Jordan M.'; return; }
    if (window.classClaimDevice) classClaimDevice(n);
    st.name = n; st.phase = 'how';
    if (window.classFirstTry) classFirstTry.reset();
    save(); render();
  };
  $('#startBtn').onclick = go;
  $('#nm').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  $('#nm').focus();
}

function pHow() {
  app.innerHTML = `<section class="card wide">
    <p class="eyebrow">BEFORE YOU SCROLL</p>
    <h2>Pros don't stare at a post. They <em>leave it</em> and check.</h2>
    <p class="lead">Fact-checkers open new tabs. That's called <b>lateral reading</b> (reading sideways). Here are the moves:</p>
    <div class="moves">${Object.values(MOVES).map(m => `<div>${esc(m)}</div>`).join('')}</div>
    <div class="verdicts">${Object.keys(VERDICT).map(k => `<div class="v-${k}"><b>${VERDICT[k].ic} ${k}</b>${esc(VERDICT[k].d)}</div>`).join('')}</div>
    <p class="note">Likes, shares, checkmarks, and "it sounds right" are <b>not</b> proof. Three bot classmates are playing too: 😲 Maya shares first, 🧐 Jax always checks, 🤔 Zoe gets fooled. Try to beat Jax.</p>
    <button class="primary" id="go">Open my feed →</button>
  </section>`;
  $('#go').onclick = () => { st.phase = 'play'; st.p = 0; st.step = 'move'; save(); render(); };
}

/* --- the phone post --- */
function mediaHTML(m) {
  if (!m) return '';
  if (m.kind === 'sms') return `<div class="m-sms"><small>Text message · from ${esc(m.from)}</small><p>${esc(m.body)}</p></div>`;
  if (m.kind === 'audio') return `<div class="m-audio"><span class="play">▶</span><span class="wave">${'▁▃▅▂▆▃▇▂▅▁▄▆▂▅▃▁▆▄▂▅'.split('').map(c => `<i>${c}</i>`).join('')}</span><small>${esc(m.body)}</small></div>`;
  if (m.kind === 'video') return `<div class="m-video"><span>${esc(m.body)}</span></div>`;
  return `<div class="m-shot"><small>📷 Screenshot</small><p>${esc(m.body)}</p></div>`;
}
function postHTML(P, r) {
  const shares = P.shares + (r.extra || 0);
  const bump = r.extra ? `<span class="bump">+${r.extra.toLocaleString()} while you checked</span>` : '';
  return `<article class="post">
    <div class="author"><span class="av">${P.av}</span><div><b>${esc(P.user)}</b><small>${esc(P.when)} · Public</small></div><span class="trend">TRENDING</span></div>
    <p class="ptext">${esc(P.text)}</p>${mediaHTML(P.media)}
    <div class="react"><span>♡ ${esc(P.likes)}</span><span>↗ ${shares.toLocaleString()} shares ${bump}</span><span>💬</span></div>
  </article>`;
}
function chatHTML(P, hi) {
  return `<div class="chat">${P.bots.map(([k, line]) => `<div class="bub ${hi === k ? 'hi' : ''}"><span class="face">${BOTS[k].face}</span><div><b>${BOTS[k].name}</b> <small>${BOTS[k].tag}</small><p>${esc(line)}</p></div></div>`).join('')}</div>`;
}
function stepsHTML(step) {
  const S = [['move', '🔎 Check it'], ['call', '⚖️ Call it'], ['battle', '🤖 Clap back'], ['result', '⚡ Result']];
  const at = S.findIndex(s => s[0] === step);
  return `<ol class="steps">${S.map((s, i) => `<li class="${i < at ? 'done' : i === at ? 'now' : ''}">${s[1]}</li>`).join('')}</ol>`;
}
function tabsHTML(P, r, goodOnly) {
  const opened = r.tried.map(i => P.moves[i]).filter(m => !goodOnly || m.good).sort((a, b) => (b.good ? 1 : 0) - (a.good ? 1 : 0));
  if (!opened.length) return '';
  return `<div class="tabs">${opened.map(m => `<div class="tab ${m.good ? 'good' : 'weak'}"><b>${m.good ? '📂 Evidence' : '🗂️ Not much help'}</b> <span class="mv">${esc(m.t)}</span><p>${esc(m.tab)}</p></div>`).join('')}</div>`;
}

function pPlay() {
  const P = cur(), r = rec(P.id);
  const hi = st.step === 'battle' ? P.battle.bot : null;
  app.innerHTML = `<div class="play">
    <section class="left">${postHTML(P, r)}${chatHTML(P, hi)}</section>
    <section class="right" id="panel">${stepsHTML(st.step)}<div id="stage"></div></section>
  </div>`;
  ({ move: sMove, call: sCall, battle: sBattle, result: sResult })[st.step](P, r);
  if (st.lockUntil && Date.now() < st.lockUntil) { const box = $('#stage'); lockThen(box, st.lockMsg, () => render()); }
}

function sMove(P, r) {
  const left = P.moves.map((m, i) => ({ m, i })).filter(o => !r.tried.includes(o.i));
  const opts = shuffle(left);
  $('#stage').innerHTML = `<h2>What's your best first move?</h2>
    <p class="dir">${st.p === 0 ? 'Pick the move that gets real proof. Wrong moves waste time while the post spreads.' : 'Pick the move that gets real proof for <b>this</b> post.'}</p>
    <div class="opts">${opts.map(o => `<button class="opt" data-i="${o.i}">${esc(o.m.t)}</button>`).join('')}</div>
    <p class="fb" id="fb"></p>${tabsHTML(P, r)}`;
  $('#stage').querySelectorAll('[data-i]').forEach(b => b.onclick = () => {
    const i = +b.dataset.i, m = P.moves[i];
    r.tried.push(i);
    if (m.good) {
      r.moveDone = true; FT.right('move-' + P.id);
      const pts = r.moveWrong ? 25 : 100; r.pts += pts; st.score += pts; st.step = 'call'; save(); render();
      toast(r.moveWrong ? '📂 Found it. +25 ⚡' : '📂 Best move! +100 ⚡');
    } else {
      r.moveWrong++; r.extra += 2400; FT.wrong(); save();
      render();
      lockThen($('#stage'), 'Not much help. The post got 2,400 more shares while you looked. Try a move that leaves the post.', () => render());
    }
  });
}

function callHint(wrong, right) {
  const H = {
    'FAKE>MISLEADING': 'Part of it is real. Read your evidence: is the problem the fact, or what the post says it means?',
    'REAL>MISLEADING': 'The fact is real, but read your evidence: does it mean what the post says?',
    'REAL>FAKE': 'Read your evidence again: did this really happen, or was it made up?',
    'MISLEADING>FAKE': 'Is any part of it real? Your evidence says it was made up.',
    'FAKE>REAL': 'Surprising isn\'t fake. What do the trusted sources in your evidence say?',
    'MISLEADING>REAL': 'Does your evidence show anything twisted? Or do trusted sources back it up?'
  };
  return 'Not quite. ' + (H[wrong + '>' + right] || 'Look at your evidence again.');
}
function sCall(P, r) {
  const opts = shuffle(Object.keys(VERDICT));
  $('#stage').innerHTML = `<h2>Call it: real, fake, or misleading?</h2>
    <p class="dir">Use your evidence, not your gut.</p>
    <div class="opts verdict">${opts.map(k => `<button class="opt v-${k}" data-v="${k}"><b>${VERDICT[k].ic} ${k}</b><small>${esc(VERDICT[k].d)}</small></button>`).join('')}</div>
    <p class="fb" id="fb"></p>${tabsHTML(P, r, true)}`;
  $('#stage').querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
    const v = b.dataset.v;
    if (v === P.verdict) {
      r.callDone = true; FT.right('call-' + P.id);
      const pts = r.callWrong ? 50 : 150; r.pts += pts; st.score += pts; st.step = 'battle'; save(); render();
      toast((r.callWrong ? '+50 ⚡ ' : '+150 ⚡ ') + VERDICT[v].ic + ' ' + v);
    } else {
      r.callWrong++; r.extra += 2400; FT.wrong(); save();
      render();
      lockThen($('#stage'), callHint(v, P.verdict), () => render());
    }
  });
}

function sBattle(P, r) {
  const B = P.battle, bot = BOTS[B.bot];
  const opts = shuffle(B.opts.map((t, i) => ({ t, i })));
  $('#stage').innerHTML = `<h2>${bot.face} ${bot.name} pushes back</h2>
    <div class="callout"><b>${bot.name}:</b> "${esc(B.say)}"</div>
    <p class="dir">You called it <b>${VERDICT[P.verdict].ic} ${P.verdict}</b>. Pick the reply that wins with evidence.</p>
    <div class="opts">${opts.map(o => `<button class="opt" data-b="${o.i}">${esc(o.t)}</button>`).join('')}</div>
    <p class="fb" id="fb"></p>${tabsHTML(P, r, true)}`;
  $('#stage').querySelectorAll('[data-b]').forEach(b => b.onclick = () => {
    if (+b.dataset.b === 0) {
      r.battleDone = true; FT.right('battle-' + P.id);
      const pts = r.battleWrong ? 25 : 100; r.pts += pts; st.score += pts; st.step = 'result'; botsStep(); save(); render();
    } else {
      r.battleWrong++; FT.wrong(); save();
      render();
      lockThen($('#stage'), bot.name + ' isn\'t convinced. ' + B.hint, () => render());
    }
  });
}

function sResult(P, r) {
  const clean = !r.moveWrong && !r.callWrong && !r.battleWrong;
  $('#stage').innerHTML = `<div class="result v-${P.verdict}">
    <p class="eyebrow">${clean ? 'SIGNAL BROKEN · PERFECT ROUND' : 'SIGNAL BROKEN'} · +${r.pts} ⚡</p>
    <h2>${VERDICT[P.verdict].ic} ${P.verdict}</h2>
    <p class="why">${esc(P.why)}</p>
    <p class="movewin"><b>Move that worked:</b> ${esc(MOVES[P.move])}</p>
    <div class="matters"><b>Why it matters for government</b><p>${esc(P.matters)}</p></div>
    <p class="src">Real story checked by: <a href="${esc(P.src.url)}" target="_blank" rel="noopener">${esc(P.src.name)}</a>, ${esc(P.src.date)}. The username is made up.${P.note ? ' ' + esc(P.note) : ''}</p>
    <button class="primary" id="next">${st.p < N - 1 ? 'Next post →' : 'Final checks →'}</button>
  </div>`;
  $('#next').onclick = () => {
    if (st.p < N - 1) { st.p++; st.step = 'move'; } else { st.phase = 'close'; st.ci = 0; }
    save(); render();
  };
}

/* --- closing checks --- */
function pClose() {
  const C = CLOSERS[Math.min(st.ci, CLOSERS.length - 1)], cr = crec(C.id);
  const opts = shuffle(C.opts.map((t, i) => ({ t, i })));
  app.innerHTML = `<section class="card wide close">
    <p class="eyebrow">FINAL CHECK ${st.ci + 1} OF ${CLOSERS.length} · ${esc(C.tag.toUpperCase())}</p>
    <h2>${esc(C.q)}</h2>
    <div class="opts" id="stage">${opts.map(o => `<button class="opt" data-c="${o.i}">${esc(o.t)}</button>`).join('')}</div>
    <p class="fb" id="fb"></p>
  </section>`;
  const box = $('#stage');
  box.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
    if (+b.dataset.c === 0) {
      cr.done = true; FT.right(C.id);
      const pts = cr.wrong ? 25 : 100; st.score += pts;
      toast('+' + pts + ' ⚡');
      if (st.ci < CLOSERS.length - 1) st.ci++; else st.phase = 'final';
      save(); render();
    } else {
      cr.wrong++; FT.wrong(); save(); render();
      lockThen($('#stage'), 'Not quite. ' + C.hint, () => render());
    }
  });
  if (st.lockUntil && Date.now() < st.lockUntil) lockThen(box, st.lockMsg, () => render());
}

/* --- final + turn in --- */
function pFinal() {
  const rows = [{ n: 'You', s: st.score, me: true }].concat(Object.keys(BOTS).map(k => ({ n: BOTS[k].face + ' ' + BOTS[k].name, s: st.bots[k] }))).sort((a, b) => b.s - a.s);
  const rank = rows.findIndex(x => x.me) + 1;
  app.innerHTML = `<section class="card wide final">
    <p class="eyebrow">FEED CLEARED</p>
    <h2>⚡ ${st.score.toLocaleString()} · #${rank} of 4 ${rank === 1 ? '🏆 You beat the bots!' : ''}</h2>
    <div class="recap">${POSTS.map((P, i) => `<div class="v-${P.verdict}"><span>${i + 1}</span><b>${VERDICT[P.verdict].ic} ${P.verdict}</b><small>${esc(P.text.replace(/\p{Extended_Pictographic}|\uFE0F/gu, '').replace(/\s+/g, ' ').trim().slice(0, 52))}…</small></div>`).join('')}</div>
    <p class="note">The trick you learned: <b>leave the post and check</b>. For anything about voting in Iowa, go to the Iowa Secretary of State or your county auditor.</p>
    <button class="primary big" id="sendBtn">${st.turnedIn ? '✓ Turned in' : 'Turn in'}</button>
    <p class="fb ${st.turnedIn ? 'good' : ''}" id="sendMsg">${st.turnedIn ? '✓ Turned in. Your teacher can see your work. You\'re done!' : ''}</p>
  </section>`;
  $('#sendBtn').onclick = turnIn;
}

async function turnIn() {
  const msg = $('#sendMsg'), btn = $('#sendBtn');
  if (st.turnedIn) { msg.className = 'fb good'; msg.textContent = '✓ Already turned in. You\'re done!'; return; }
  const ft = { move: 0, call: 0, battle: 0, close: 0 };
  POSTS.forEach(P => { const r = rec(P.id); if (r.moveDone && !r.moveWrong) ft.move++; if (r.callDone && !r.callWrong) ft.call++; if (r.battleDone && !r.battleWrong) ft.battle++; });
  CLOSERS.forEach(C => { const c = crec(C.id); if (c.done && !c.wrong) ft.close++; });
  const answers = {
    'Standard': 'SS.9-12.Gov.12',
    'First-try by skill': 'Best checking move ' + ft.move + '/' + N + ' · Real/fake/misleading call ' + ft.call + '/' + N + ' · Bot comeback ' + ft.battle + '/' + N + ' · Final checks ' + ft.close + '/' + CLOSERS.length,
    'Signal points': String(st.score)
  };
  const mark = w => w ? '✗ (' + w + ' wrong)' : '✓';
  POSTS.forEach((P, i) => { const r = rec(P.id); answers['Post ' + (i + 1) + ' · ' + P.id + ' (' + P.verdict + ')'] = 'Move ' + mark(r.moveWrong) + ' · Call ' + mark(r.callWrong) + ' · Comeback ' + mark(r.battleWrong); });
  CLOSERS.forEach(C => { const c = crec(C.id); answers['Final check · ' + C.tag] = C.opts[0] + ' ' + (c.wrong ? '(after ' + c.wrong + ' wrong)' : '(first try)'); });
  btn.disabled = true; msg.className = 'fb'; msg.textContent = 'Sending your work…';
  try {
    const res = await classTurnIn(OLD_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGN, assignmentTitle: 'Government Unit 2 · Day 3 · Signal Break', answers }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Your work did not save. Try again.');
    st.turnedIn = true; save();
    msg.className = 'fb good'; msg.textContent = '✓ Turned in. Your teacher can see your work. You\'re done!'; btn.textContent = '✓ Turned in'; btn.disabled = false;
  } catch (e) { msg.className = 'fb bad'; msg.textContent = e.message || 'Could not turn in. Try again.'; btn.disabled = false; }
}

/* ---------------- little helpers ---------------- */
function toast(t) {
  let el = $('#toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = t; el.className = 'show'; clearTimeout(toast._t); toast._t = setTimeout(() => { el.className = ''; }, 1600);
}
$('#helpBtn').onclick = () => $('#helpDialog').showModal();
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => document.getElementById(b.dataset.close).close());
$('#resetBtn').onclick = () => { if (!confirm('Start over? This erases your progress on this device.')) return; const n = st.name; st = fresh(); st.name = n; st.phase = n ? 'how' : 'title'; if (window.classFirstTry) classFirstTry.reset(); save(); render(); };

// Welcome back
if (st.phase === 'play' && (st.p > 0 || st.step !== 'move')) setTimeout(() => toast('Welcome back, ' + (st.name.split(' ')[0] || '') + '! You\'re on post ' + (st.p + 1) + ' of ' + N + '.'), 300);
else if (st.phase === 'close') setTimeout(() => toast('Welcome back! You\'re on the final checks.'), 300);
render();

/* ---------------- Test T. skip bar (shared/turnin.js) ----------------
   Test T. can jump to any screen or answer the current one.
   Jumping ahead fills earlier posts as done (Test T. only). */
try {
  const STEPS = ['move', 'call', 'battle', 'result'], P0 = 3, C0 = P0 + N * 4, FIN = C0 + CLOSERS.length;
  const LABELS = ['Title', 'Name', 'How it works'];
  POSTS.forEach((P, k) => ['Check it', 'Call it', 'Clap back', 'Result'].forEach(s => LABELS.push('Post ' + (k + 1) + ' (' + P.id + ') · ' + s)));
  CLOSERS.forEach((C, i) => LABELS.push('Final check ' + (i + 1) + ' · ' + C.tag));
  LABELS.push('Final + turn in');
  const goodIdx = P => P.moves.findIndex(m => m.good);
  const fillPost = (k, upto) => {   // upto: how many steps of post k are done (0-3)
    const P = POSTS[k], r = rec(P.id);
    if (upto >= 1 && !r.moveDone) { r.moveDone = true; if (!r.tried.includes(goodIdx(P))) r.tried.push(goodIdx(P)); }
    if (upto >= 2) r.callDone = true;
    if (upto >= 3) r.battleDone = true;
  };
  (window.classTestHooks = window.classTestHooks || []).push({
    count: () => LABELS.length,
    index: () => {
      if (st.phase === 'title') return 0;
      if (st.phase === 'name') return 1;
      if (st.phase === 'how') return 2;
      if (st.phase === 'play') return P0 + Math.min(st.p, N - 1) * 4 + Math.max(0, STEPS.indexOf(st.step));
      if (st.phase === 'close') return C0 + Math.min(st.ci, CLOSERS.length - 1);
      return FIN;
    },
    label: i => LABELS[i],
    go: i => {
      if (!st.name) st.name = 'Test T.';
      st.lockUntil = 0;
      if (i <= 2) { st.phase = ['title', 'name', 'how'][i]; save(); render(); return; }
      if (i < C0) {
        const k = Math.floor((i - P0) / 4), s = (i - P0) % 4;
        for (let j = 0; j < k; j++) fillPost(j, 3);
        for (let j = k; j < N; j++) delete st.res[POSTS[j].id];   // replay from the chosen step
        st.close = {}; fillPost(k, s);
        st.phase = 'play'; st.p = k; st.step = STEPS[s]; save(); render(); return;
      }
      for (let j = 0; j < N; j++) fillPost(j, 3);
      if (i < FIN) { st.phase = 'close'; st.ci = i - C0; CLOSERS.forEach((C, x) => { crec(C.id).done = x < st.ci; }); }
      else { st.phase = 'final'; CLOSERS.forEach(C => { crec(C.id).done = true; }); }
      save(); render();
    },
    solve: () => {
      st.lockUntil = 0; save();
      let b = null;
      if (st.phase === 'play') {
        const P = cur();
        if (st.step === 'move') b = document.querySelector('[data-i="' + goodIdx(P) + '"]');
        else if (st.step === 'call') b = document.querySelector('[data-v="' + P.verdict + '"]');
        else if (st.step === 'battle') b = document.querySelector('[data-b="0"]');
        else if (st.step === 'result') b = document.querySelector('#next');
      } else if (st.phase === 'close') b = document.querySelector('[data-c="0"]');
      if (b) { b.disabled = false; b.onclick && b.onclick(); }
    }
  });
  if (window.classTestSkip) window.classTestSkip.refresh();
} catch (e) {}
})();

/* Double-click guard: ignore clicks for a moment right after a screen redraws,
   so a double-click can't answer the next question before the student sees it. */
(() => {
  let changed = 0;
  const mark = () => { changed = performance.now(); };
  const el = document.getElementById('app'); if (el) new MutationObserver(mark).observe(el, { childList: true });
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('#app button.opt');
    if (b && performance.now() - changed < 350) { e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);
})();
