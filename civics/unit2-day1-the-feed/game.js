'use strict';
/* =====================================================================
   DECISION DESK · Government Unit 2 Day 1 · SS.9-12.Gov.12
   Political ideology (liberal, conservative, moderate, libertarian) vs.
   political party (an organized group that runs candidates).
   Round 1: Call It (20 random cards: liberal belief, conservative belief,
            or party action; 16 of 20 to pass or get a new set).
   Round 2: Where Do They Stand? (place 6 made-up voters by ideology,
            then name the party they'd most likely vote for).
   Round 3: Same Belief, Different Party (why people don't always join the
            party that matches every belief).
   No student opinions are collected. Positions follow Fynn's Unit 2 notes
   and the parties' mainstream platforms. Voters are made up.
   ===================================================================== */
(() => {
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const KEY = 'gov-u2d1-decisiondesk-v1';
const ASSIGN = 'gov-unit2-day1-the-feed';
const OLD_API = 'https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit';

/* ---------------- DATA ---------------- */
// lib = liberal belief · con = conservative belief · party = something an organized party DOES (not a belief).
// Both belief sides use "should," "should not," quotes, and plain statements, so wording doesn't give it away.
const ITEMS = [
  // ---- liberal beliefs ----
  { id: 'l1', side: 'lib', t: 'The government should make sure every American has health care, even if taxes go up.', why: 'More government help (health care for everyone) = liberal.' },
  { id: 'l2', side: 'lib', t: '“Rich people and big companies should pay higher taxes to fund programs that help everyone.”', why: 'Higher taxes on the wealthy to pay for programs = liberal.' },
  { id: 'l3', side: 'lib', t: 'There should be a background check on every gun sale, even private sales.', why: 'More gun laws = liberal.' },
  { id: 'l4', side: 'lib', t: 'The government should pass strong laws to cut pollution and fight climate change.', why: 'More rules to protect the environment = liberal.' },
  { id: 'l5', side: 'lib', t: '“Raise the minimum wage to at least $15 an hour.”', why: 'The government setting higher pay = liberal. (The national minimum is still $7.25.)' },
  { id: 'l6', side: 'lib', t: 'Same-sex marriage should be protected by law.', why: 'Expanding legal protections for LGBTQ+ people = liberal.' },
  { id: 'l7', side: 'lib', t: '“Abortion should stay legal. That choice belongs to the woman.”', why: 'Keeping abortion legal = liberal.' },
  { id: 'l8', side: 'lib', t: 'Community college should be free, paid for with tax money.', why: 'The government paying for a service = liberal.' },
  { id: 'l9', side: 'lib', t: 'Immigrants brought here illegally as little kids should get a way to become citizens.', why: 'A way to become citizens for these "Dreamers" = liberal.' },
  { id: 'l10', side: 'lib', t: '“Prisons should focus on helping people change, not just punishing them.”', why: 'Helping people turn their lives around and fixing the causes of crime = liberal.' },
  { id: 'l11', side: 'lib', t: 'The government should spend more on food stamps and other programs that fight poverty.', why: 'Government programs to reduce poverty = liberal.' },
  { id: 'l12', side: 'lib', t: 'Big companies need more rules so they can\'t take advantage of workers or customers.', why: 'More rules on business = liberal.' },
  { id: 'l13', side: 'lib', t: '“Society should change faster to give every group equal rights.”', why: 'Pushing for change and equality = liberal.' },
  { id: 'l14', side: 'lib', t: '“Don\'t cut programs that help poor families just to save money.”', why: 'Protecting government help programs = liberal.' },
  { id: 'l15', side: 'lib', t: 'Workers should have an easier time forming unions (worker groups that bargain for pay).', why: 'Supporting unions and workers\' rights = liberal.' },
  { id: 'l16', side: 'lib', t: 'Laws should protect transgender people from discrimination in housing and health care.', why: 'Expanding legal protections for LGBTQ+ people = liberal.' },
  { id: 'l17', side: 'lib', t: '“The government should help people pay off their student loans.”', why: 'Government help with costs = liberal.' },
  { id: 'l18', side: 'lib', t: 'Every worker should get paid family leave by law, like time off with pay after having a baby.', why: 'The government requiring a benefit for workers = liberal.' },
  { id: 'l19', side: 'lib', t: 'Voting should be easier, with a mail-in ballot for anyone who wants one.', why: 'Liberals focus more on making voting easier. Conservatives focus more on preventing fraud.' },
  { id: 'l20', side: 'lib', t: 'The government should build more affordable housing for low-income families.', why: 'Government help with housing = liberal.' },
  { id: 'l21', side: 'lib', t: 'Someone outside the police department should review it every time an officer uses serious force.', why: 'More outside checks on police = liberal.' },
  { id: 'l22', side: 'lib', t: 'The U.S. should take in more people who are running from war in their countries.', why: 'Welcoming more refugees (people running from war) = liberal.' },
  { id: 'l23', side: 'lib', t: 'A Republican farmer says: “The government needs to do a lot more about climate change.”', why: 'Tricky! He\'s a Republican, but THIS belief is liberal. A party label doesn\'t decide every belief.' },
  { id: 'l24', side: 'lib', t: 'A Democratic state senator says: “People making over $400,000 a year should pay higher taxes.”', why: 'Tricky! A party member is talking, but the card is a BELIEF. Higher taxes on the rich = liberal.' },
  { id: 'l25', side: 'lib', t: 'At a Democratic Party meeting, a mom stands up and says: “Every kid should get free school lunch.”', why: 'Tricky! It happened at a party meeting, but the card is her BELIEF. Government help = liberal.' },
  { id: 'l26', side: 'lib', t: 'Election Day should be a national holiday so more people can vote.', why: 'Making voting easier = liberal.' },
  { id: 'l27', side: 'lib', t: 'A candidate at a town hall says: “Families should get help from the government to pay for child care.”', why: 'Tricky! A candidate is talking, but the card is a BELIEF. Government help = liberal.' },
  // ---- conservative beliefs ----
  { id: 'c1', side: 'con', t: '“Government should stay small and out of people\'s lives.”', why: 'Smaller government = conservative.' },
  { id: 'c2', side: 'con', t: '“Cut taxes. People should keep more of the money they earn.”', why: 'Lower taxes = conservative.' },
  { id: 'c3', side: 'con', t: 'People who follow the law have a right to own guns, and the government shouldn\'t make that harder.', why: 'Protecting gun rights and fewer gun laws = conservative.' },
  { id: 'c4', side: 'con', t: 'Businesses should face fewer rules so the economy can grow.', why: 'Fewer rules on business = conservative.' },
  { id: 'c5', side: 'con', t: 'The government should spend more to keep the U.S. military the strongest in the world.', why: 'A strong military = conservative. (Yes, it says "spend more," but on defense.)' },
  { id: 'c6', side: 'con', t: '“Traditional marriage and family values should be protected.”', why: 'Protecting traditional values = conservative.' },
  { id: 'c7', side: 'con', t: 'Abortion should be banned or strictly limited to protect unborn life.', why: 'Limiting abortion = conservative.' },
  { id: 'c8', side: 'con', t: '“People should take care of themselves, not depend on government help.”', why: 'Taking care of yourself (personal responsibility) = conservative.' },
  { id: 'c9', side: 'con', t: 'The government should build a border wall and hire more border agents.', why: 'Strict border security = conservative.' },
  { id: 'c10', side: 'con', t: '“Give criminals longer, tougher sentences to keep our streets safe.”', why: 'Tough on crime, law and order = conservative.' },
  { id: 'c11', side: 'con', t: 'Police officers should keep their legal protection from being sued over split-second decisions.', why: 'Protecting police from lawsuits (called qualified immunity) = conservative.' },
  { id: 'c12', side: 'con', t: 'Parents should be able to use tax money to send their kids to private or religious schools.', why: 'School choice = conservative. (Iowa passed a school choice law in 2023.)' },
  { id: 'c13', side: 'con', t: '“Change should happen slowly. Traditions are there for a reason.”', why: 'Slow change and protecting tradition = conservative.' },
  { id: 'c14', side: 'con', t: 'State governments, not the national government in Washington, D.C., should make most of the big decisions.', why: 'Less power for the national government = conservative.' },
  { id: 'c15', side: 'con', t: 'The U.S. should drill for more oil and gas here at home.', why: 'More energy production with fewer limits = conservative.' },
  { id: 'c16', side: 'con', t: 'Adults who get government help (welfare) and can work should have to work or look for a job.', why: 'Requiring work and taking care of yourself = conservative.' },
  { id: 'c17', side: 'con', t: '“Don\'t raise the minimum wage. Let businesses decide what to pay.”', why: 'Less government in the economy = conservative.' },
  { id: 'c18', side: 'con', t: 'Voters should have to show a photo ID before they vote.', why: 'Voter ID laws = conservative. (Iowa requires an ID to vote, like a driver\'s license or a free Iowa voter ID card.) Conservatives focus more on preventing fraud. Liberals worry ID rules make voting harder for some people.' },
  { id: 'c19', side: 'con', t: 'Prayer and religion should have a bigger place in public schools.', why: 'More religion in public life = conservative.' },
  { id: 'c20', side: 'con', t: '“Climate rules hurt farmers and businesses. The economy should come first.”', why: 'Economy first, fewer environmental rules = conservative.' },
  { id: 'c21', side: 'con', t: '“The government shouldn\'t pay for anybody\'s college. That\'s up to families.”', why: 'Less government spending = conservative.' },
  { id: 'c22', side: 'con', t: 'Cut government spending, even on popular programs, so the national debt stops growing.', why: 'Smaller government and less spending = conservative.' },
  { id: 'c23', side: 'con', t: 'A Democrat who works at a union plant says: “Gun laws are strict enough. Leave my rifles alone.”', why: 'Tricky! He\'s a Democrat, but THIS belief is conservative. A party label doesn\'t decide every belief.' },
  { id: 'c24', side: 'con', t: 'A Republican county chair says: “Iowa should get rid of the state income tax.”', why: 'Tricky! A party leader is talking, but the card is a BELIEF. Cutting taxes = conservative.' },
  { id: 'c26', side: 'con', t: 'People should have to show proof they are U.S. citizens when they register to vote.', why: 'Stricter voting rules to prevent fraud = conservative.' },
  { id: 'c27', side: 'con', t: 'A candidate at a rally says: “Cut regulations on Iowa farms and get the government out of the way.”', why: 'Tricky! A candidate is talking, but the card is a BELIEF. Fewer rules on business = conservative.' },
  { id: 'c25', side: 'con', t: 'At a Republican Party meeting, a dad says: “Parents, not the government, should decide what their kids learn about.”', why: 'Tricky! It happened at a party meeting, but the card is his BELIEF. Parents\' rights and less government = conservative.' },
  // ---- party actions (an organized group running candidates / trying to win elections) ----
  { id: 'p1', side: 'party', t: 'The Democratic Party holds a huge meeting (a national convention) to pick its candidate for president.', why: 'Picking candidates is something a party DOES. It isn\'t a belief.' },
  { id: 'p2', side: 'party', t: 'The Republican Party raises $50 million for TV ads before Election Day.', why: 'Raising money to win elections = party.' },
  { id: 'p3', side: 'party', t: 'Iowa Republicans hold caucuses (neighborhood party meetings) in school gyms across the state.', why: 'Caucuses are meetings a party runs.' },
  { id: 'p4', side: 'party', t: 'A paid organizer texts 500 volunteers: “Knocking doors Saturday. We need to win this seat.”', why: 'Organizing volunteers = party.' },
  { id: 'p5', side: 'party', t: 'The Iowa Democratic Party turns in its list of candidates so they show up on the ballot.', why: 'Getting its candidates on the ballot = party. (On Iowa ballots, each candidate\'s party is printed next to their name.)' },
  { id: 'p6', side: 'party', t: 'The Libertarian Party collects signatures to get its candidate on the Iowa ballot.', why: 'Getting candidates on the ballot = party. Smaller parties (third parties) are parties too.' },
  { id: 'p7', side: 'party', t: 'National party leaders pick a city to host the big convention where they will name their candidate for president.', why: 'Leaders running party events = party.' },
  { id: 'p8', side: 'party', t: 'Volunteers knock on 10,000 doors to help their side\'s candidates win in November.', why: 'Campaign work = party.' },
  { id: 'p9', side: 'party', t: 'The Republican Party of Iowa picks a new state leader (the state chair).', why: 'Choosing leaders = party.' },
  { id: 'p10', side: 'party', t: 'Party members meet and vote to write their platform: the official list of the party\'s goals.', why: 'Tricky! A platform is full of beliefs, but writing it at a convention is something a party DOES.' },
  { id: 'p11', side: 'party', t: 'State leaders ask a local mayor to run for Congress, and promise money and volunteers if she says yes.', why: 'Recruiting candidates = party.' },
  { id: 'p12', side: 'party', t: 'The Green Party runs a candidate for governor.', why: 'Running candidates = party, even a small one.' },
  { id: 'p13', side: 'party', t: 'The Democratic Party holds a primary so its voters can pick who runs for U.S. Senate.', why: 'Primaries pick a party\'s candidates. (Iowa holds its primary in June.)' },
  { id: 'p14', side: 'party', t: 'Republicans in the Iowa House meet and pick their leader.', why: 'Organizing its members in government = party.' },
  { id: 'p15', side: 'party', t: 'Workers at a State Fair booth sign up volunteers to campaign for their candidates this fall.', why: 'Recruiting volunteers for its candidates = party.' },
  { id: 'p16', side: 'party', t: '“Vote for our candidates on Tuesday!” (a flyer from the Iowa Democratic Party)', why: 'Campaigning for its own candidates = party.' },
  { id: 'p17', side: 'party', t: 'The Republican Party texts voters: “Our candidate will cut your taxes. Vote Tuesday!”', why: 'Tricky! It mentions a belief, but this is a party campaigning to win an election.' },
  { id: 'p19', side: 'party', t: 'Volunteers set up chairs and sign-in sheets for a caucus in a Marion school gym.', why: 'Running caucuses is something a party DOES.' },
  { id: 'p20', side: 'party', t: 'Members pick a candidate for governor, print 5,000 yard signs, and ask people to vote for her.', why: 'Picking a candidate and campaigning = party.' },
  { id: 'p21', side: 'party', t: 'A new group gets enough votes in an Iowa election to become an official political party.', why: 'Running candidates and winning votes = party.' },
  { id: 'p22', side: 'party', t: '“Join us. We pick candidates, raise money, and help them win.” (a sign-up sheet)', why: 'That\'s basically the definition of a party.' },
  { id: 'p23', side: 'party', t: 'The county chair says: “We should knock on every door in Linn County this Saturday.”', why: 'Tricky! It says "should," but it\'s about campaigning to win. That\'s a party action.' },
  { id: 'p24', side: 'party', t: '“We should have a candidate on every ballot in Iowa this year,” the leaders decide, and they start calling people to run.', why: 'Tricky! It says "should," but recruiting candidates is something a party DOES.' },
  { id: 'p18', side: 'party', t: 'The Democratic Party pays for an ad saying its candidate will protect health care.', why: 'Tricky! There\'s a belief in the ad, but running ads for its candidate = party.' }
];
const ITEM = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const SIDE = { lib: { b: '🔵 LIBERAL', s: 'liberal belief' }, con: { b: '🔴 CONSERVATIVE', s: 'conservative belief' }, party: { b: '🏛️ PARTY', s: 'party action' } };
const DECK_SIZE = 20, PASS = 16, MAX_MISS = DECK_SIZE - PASS; // need 80% right to move on
// Random 20-card set: 5–7 party cards, the rest split close to even between liberal and conservative.
// Unseen cards come first. No type shows up more than 3 times in a row.
function newDeck(seen) {
  seen = seen || {};
  const pool = side => shuffle(ITEMS.filter(i => i.side === side && !seen[i.id]).map(i => i.id)).concat(shuffle(ITEMS.filter(i => i.side === side && seen[i.id]).map(i => i.id)));
  const nP = 5 + Math.floor(Math.random() * 3), rest = DECK_SIZE - nP, nL = Math.floor(rest / 2) + (Math.random() < .5 ? 0 : (rest % 2 ? 1 : (Math.random() < .5 ? -1 : 1)));
  const pick = pool('lib').slice(0, nL).concat(pool('con').slice(0, rest - nL), pool('party').slice(0, nP));
  for (let k = 0; k < 300; k++) {
    const d = shuffle(pick); let run = 1, ok = true;
    for (let i = 1; i < d.length; i++) { run = ITEM[d[i]].side === ITEM[d[i - 1]].side ? run + 1 : 1; if (run > 3) { ok = false; break; } }
    if (ok) return d;
  }
  return shuffle(pick);
}
const IDEO = { lib: { b: '🔵 LIBERAL', s: 'more government help · change · equality' }, mod: { b: '⚖️ MODERATE', s: 'some more government, some less' }, con: { b: '🔴 CONSERVATIVE', s: 'smaller government · lower taxes · tradition' }, ltn: { b: '🗽 LIBERTARIAN', s: 'less government on EVERYTHING' } };
const PARTY = { D: 'Democratic Party', R: 'Republican Party', L: 'Libertarian Party', G: 'Green Party', X: 'Could vote for either party' };
const VOTERS = [
  { id: 'rosa', name: 'Rosa', who: '34 · ER nurse · Des Moines', ideo: 'lib', party: 'D', popts: ['D', 'R', 'X'],
    says: ['Nobody should go broke because they got sick. Health care for everyone, even if taxes on the rich go up.', 'We need a background check on every gun sale.', 'Make companies follow tougher pollution rules. I want clean rivers.'],
    why: 'Government help with health care, more gun laws, more rules on pollution: all liberal.', pwhy: 'Most liberals vote for Democrats. The Democratic Party\'s goals match most liberal beliefs.' },
  { id: 'marcus', name: 'Marcus', who: '19 · Kirkwood student · Cedar Rapids', ideo: 'lib', party: 'D', popts: ['D', 'R', 'L'],
    says: ['Community college should be free, paid for by the government.', 'Same-sex couples should have the same marriage rights as anybody.', 'Raise the minimum wage. Nobody can live on $7.25.'],
    why: 'Government paying for college, equal marriage rights, higher minimum wage: all liberal.', pwhy: 'Most liberals vote for Democrats. Free community college, marriage equality, and a higher minimum wage have all been in recent Democratic platforms.' },
  { id: 'wade', name: 'Wade', who: '52 · owns a body shop · Ankeny', ideo: 'con', party: 'R', popts: ['R', 'D', 'X'],
    says: ['Cut my taxes. I know how to spend my money better than Washington does.', 'Get the government off small businesses. Fewer rules.', 'Fund the police and give criminals tougher sentences.'],
    why: 'Lower taxes, fewer rules on business, tough on crime: all conservative.', pwhy: 'Most conservatives vote for Republicans. The Republican Party\'s goals match most conservative beliefs.' },
  { id: 'linda', name: 'Linda', who: '61 · retired · Pella', ideo: 'con', party: 'R', popts: ['R', 'D', 'L'],
    says: ['Traditional family values hold this country together. Protect them.', 'People should work hard and take care of themselves, not depend on government programs.', 'Parents should be able to use tax money to send their kids to a Christian school.'],
    why: 'Traditional values, personal responsibility, school choice: all conservative.', pwhy: 'Most conservatives vote for Republicans. Traditional values and school choice are big Republican issues.' },
  { id: 'jasmine', name: 'Jasmine', who: '27 · bank teller · Waterloo', ideo: 'mod', party: 'X', popts: ['X', 'D', 'R'],
    says: ['The government should help make health care cheaper.', 'Our town needs more police, and criminals should get tougher sentences.', 'I want background checks on guns, but my taxes are already too high.'],
    why: 'Health care help and background checks are liberal. More police, tougher sentences, and lower taxes are conservative. A mix = moderate.', pwhy: 'Moderates are "swing voters." They might vote for either party, so both parties fight hard to win them.' },
  { id: 'eli', name: 'Eli', who: '23 · personal trainer · Iowa City', ideo: 'ltn', party: 'L', popts: ['L', 'D', 'G'],
    says: ['Cut taxes AND cut government programs. Let people keep their money.', 'The government should stay out of who you marry and what you do in your own home.', 'Legalize marijuana. Adults can make their own choices.'],
    why: 'He wants less government with your money (conservative side) AND less government in your personal life (liberal side). Less government on everything = libertarian.', pwhy: 'The Libertarian Party fits best. Its whole idea is less government on everything. (The Green Party is a small party focused on the environment.)' }
];
const REASONS = { family: '👪 Family', candidate: '🙋 A candidate they know', issue: '⚖️ A different issue matters more to them', nofit: '🚫 Neither party fits', job: '🦺 Their job or union' };
const P = (name, party, who) => ({ name, party, who });
// Each pair AGREES on one belief but ends up in different parties (or none). Person b explains.
const CASES = [
  { belief: 'the minimum wage should go up', tag: 'a liberal idea', a: P('Jaylen', 'Democrat', '19 · fast-food worker'), b: P('Mike', 'Republican', '24 · warehouse worker'),
    say: 'Pay should go up, sure. But every fall I\'m in a deer stand, and I\'m not voting for anybody who wants new gun laws.',
    right: 'issue', opts: ['issue', 'family', 'candidate', 'nofit'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: In 2020, Florida voters passed a $15 minimum wage. Many of those same voters picked the Republican for president.' },
  { belief: 'the border needs more security', tag: 'a conservative idea', a: P('Brianna', 'Republican', '32 · CNA, mom of two'), b: P('Tony', 'Democrat', '45 · works at the John Deere plant'),
    say: 'Yeah, the border needs fixing. But my raise and my health insurance came from our contract. The flyer in the break room lists who to vote for, and I go down the list.',
    right: 'job', opts: ['job', 'family', 'candidate', 'nofit'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: Unions often tell their members which candidates they support. Lots of members follow along, but not all of them.' },
  { belief: 'criminals should get tougher sentences', tag: 'a conservative idea', a: P('Dale', 'Republican', '58 · retired trucker, Kayla\'s uncle'), b: P('Kayla', 'Democrat', '20 · works at a phone store'),
    say: 'Same table every Thanksgiving, same yard signs since I was little. I\'ve never voted any other way. Uncle Dale is the only one at that table who switched.',
    right: 'family', opts: ['family', 'issue', 'candidate', 'job'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: Family is one of the biggest reasons people pick a party. But like Uncle Dale, people can switch.' },
  { belief: 'same-sex marriage should be legal', tag: 'a liberal idea', a: P('Andre', 'Democrat', '28 · cook'), b: P('Marcy', 'Republican', '41 · runs a daycare'),
    say: 'My friends are surprised I\'m a Republican. But I\'m pro-life, and that comes first for me every single time I vote.',
    right: 'issue', opts: ['issue', 'family', 'candidate', 'nofit'], hint: 'Read their quote again. What pushed them to that side?',
    fact: 'Real life: Almost 4 in 10 Republicans (37%) say same-sex marriage should be legal (Gallup, 2026). Lots of voters pick a party based on the one issue they care about most.' },
  { belief: 'taxes should be lower', tag: 'a conservative idea', a: P('Cody', 'Republican', '18 · works at Hy-Vee'), b: P('Tasha', 'No party', '19 · Kirkwood student'),
    say: 'I want lower taxes, but I also want background checks on guns. I looked at both sides. Each one gets some stuff right and some stuff way wrong, so I didn\'t pick either.',
    right: 'nofit', q: 'Why didn\'t Tasha pick a party?', opts: ['nofit', 'family', 'issue', 'job'], hint: 'Read her quote again. Why didn\'t either party win her over?',
    fact: 'Real life: More than 560,000 active Iowa voters are registered as "No Party." That\'s more than active registered Democrats (Iowa Secretary of State, Sept. 2026).' }
];

/* ---------------- STATE ---------------- */
const fresh = () => ({ v: 3, phase: 'title', primer: 0, name: '', room: '', queue: newDeck(), att: { n: 1, right: 0, seen: 0 }, r1: {}, streak: 0, best: 0,
  voterOrder: shuffle([0, 1, 2, 3, 4, 5]), vi: 0, r2: {}, caseOrder: shuffle([0, 1, 2, 3, 4]), ci: 0, r3: {}, score: 0, writing: {}, turnedIn: false, bots: null, lockUntil: 0 });
let st;
try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
if (!st || st.v !== 3) st = fresh();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

const tray = $('#tray');
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2600); }
function plus(n, x, y) { const el = document.createElement('div'); el.className = 'plus'; el.textContent = '+' + n; el.style.left = x + 'px'; el.style.top = y + 'px'; $('.scene').appendChild(el); setTimeout(() => el.remove(), 1000); }
function hud() {
  const T = { r1: 'Round 1 · Call It', r2: 'Round 2 · Where Do They Stand?', r3: 'Round 3 · Same Belief, Different Party', final: 'Final' };
  $('#shiftPill').textContent = T[st.phase] || '';
  $('#countPill').textContent = st.phase === 'r1' ? 'Card ' + Math.min(DECK_SIZE, att().seen + (st.r1Next ? 0 : 1)) + ' of ' + DECK_SIZE : st.phase === 'r2' ? 'Voter ' + Math.min(VOTERS.length, st.vi + 1) + ' of ' + VOTERS.length : st.phase === 'r3' ? 'Pair ' + Math.min(CASES.length, st.ci + 1) + ' of ' + CASES.length : '';
  $('#scorePill').textContent = '★ ' + st.score.toLocaleString();
  race();
}

/* ---------------- CLASS RACE ---------------- */
let livePlayers = [];
function liveOthers() { return (window.Arena && Arena.live) ? livePlayers.filter(p => !p.me && p.name !== st.name) : []; }
function race() {
  if (!st.bots) st.bots = [{ name: 'Bot Kenzie', s: 0 }, { name: 'Bot Devon', s: 0 }, { name: 'Bot Ava', s: 0 }];
  const lo = liveOthers(), live = lo.length > 0;
  const rows = (live ? lo.map(p => ({ name: p.name, s: p.score })) : st.bots).map(o => ({ name: o.name, s: o.s })).concat([{ name: 'You', s: st.score, me: true }]).sort((a, b) => b.s - a.s).slice(0, 5);
  $('#race').innerHTML = `<div class="t">CLASS RACE<span class="tag ${live ? 'live' : ''}">${live ? '● LIVE' : 'practice'}</span></div><ol>${rows.map((r, i) => `<li class="${r.me ? 'me' : ''}"><span class="n">${i + 1}</span><span class="nm">${esc(r.name)}</span><span class="sc">${r.s.toLocaleString()}</span></li>`).join('')}</ol>`;
  $('#race').style.display = ['r1', 'r2', 'r3'].includes(st.phase) ? '' : 'none';
}
function botsStep(k) { if (liveOthers().length) return; (st.bots || []).forEach((b, i) => { b.s += Math.round(k * [1, 1.15, .85][i] * (0.55 + Math.random() * 0.8)); }); }
function startArena() { if (window.Arena) Arena.join({ game: ASSIGN, name: st.name, room: st.room, onBoard(p) { livePlayers = p; race(); }, onEvent() {} }); }
function pushScore() { if (window.Arena && Arena.live) Arena.update({ score: st.score, stage: st.phase }); }

/* wrong-answer pause (survives reload) */
function pause(btnsRoot, fb, msg, done, keep) {
  btnsRoot.querySelectorAll('button').forEach(b => b.disabled = true);
  if (!keep) { st.lockUntil = Date.now() + 1500; st.lockMsg = msg; save(); }
  const tick = () => { const left = Math.ceil((st.lockUntil - Date.now()) / 1000); if (left <= 0) { st.lockUntil = 0; save(); return done(); } fb.className = 'fb oops'; fb.textContent = msg + '  (' + left + ')'; setTimeout(tick, 150); };
  tick();
}
const locked = () => (st.lockUntil || 0) > Date.now();
function guardNext(fn) { const b = $('#nx'), t = Date.now(); b.onclick = () => { if (Date.now() - t < 450) return; b.onclick = null; fn(); }; }

/* ---------------- FLOW ---------------- */
function render() { document.body.classList.toggle('finalmode', st.phase === 'final'); $('#title').hidden = st.phase !== 'title'; document.body.classList.toggle('titlemode', st.phase === 'title'); hud(); ({ title: pTitle, intro: pIntro, r1: pR1, r2: pR2, r3: pR3, final: pFinal })[st.phase](); }

function pTitle() {
  tray.innerHTML = ''; $('#item').hidden = true; SCENE.show('title');
  $('#title').hidden = false;
  $('#playBtn').onclick = () => { $('#title').hidden = true; st.phase = 'intro'; save(); render(); };
}
function pIntro() {
  $('#title').hidden = true; $('#item').hidden = true; tray.innerHTML = ''; SCENE.show('title');
  const card = $('#card'); card.className = 'card brief';
  if (!st.name) {
    card.innerHTML = `<p class="eyebrow">SIGN IN TO THE DESK</p><h2>Who's making the calls tonight?</h2><label for="nm">Your name (first name + last initial)</label><input id="nm" maxlength="40" autocomplete="off" placeholder="Jordan M."><label for="rm">Class code (if your teacher gave one)</label><input id="rm" maxlength="12" autocomplete="off" placeholder="optional"><p class="fb" id="nmMsg"></p><button class="primary go" id="go">Let's go →</button>`;
    $('#go').onclick = () => {
      const n = window.classShortName ? classShortName($('#nm').value) : $('#nm').value.trim();
      if (!/^\S+ [A-Z]\.$/.test(n)) { $('#nmMsg').className = 'fb oops'; $('#nmMsg').textContent = 'Type your first name and last initial, like Jordan M.'; return; }
      st.name = n; st.room = $('#rm').value.trim(); if (window.classFirstTry) classFirstTry.reset(); save(); startArena(); pIntro();
    };
  } else if (!st.primer) {
    card.innerHTML = `<p class="eyebrow">BRIEFING 1 OF 2</p><h2>Two words run this whole game.</h2>
    <div class="duo"><div class="d1"><b>💭 IDEOLOGY</b><span>A set of <b>beliefs</b> about what the government should do.</span><i>“Taxes should be lower.”</i></div>
    <div class="d2"><b>🏛️ PARTY</b><span>An organized <b>group</b> that runs candidates and tries to win elections.</span><i>The Republican Party picking its candidate for governor.</i></div></div>
    <p class="lead">Ideology = what you <b>believe</b>. Party = the group that <b>acts</b> on it.</p>
    <button class="primary go" id="go">Next →</button>`;
    $('#go').onclick = () => { st.primer = 1; save(); pIntro(); };
  } else {
    card.innerHTML = `<p class="eyebrow">BRIEFING 2 OF 2</p><h2>The two big ideologies</h2>
    <div class="duo"><div class="d1 blue"><b>🔵 LIBERAL</b><small>usually votes Democrat · blue · donkey</small><ul><li>Government should <b>help people</b> and provide services</li><li><b>Higher taxes on the rich</b> to pay for programs</li><li>More rules to protect workers, rights, and the environment</li><li>Push for <b>change</b> and equality</li></ul></div>
    <div class="d2 red"><b>🔴 CONSERVATIVE</b><small>usually votes Republican · red · elephant</small><ul><li>Government should <b>stay small</b></li><li><b>Lower taxes</b> and fewer rules on business</li><li>Strong military, tough on crime</li><li>Protect <b>tradition</b> and personal responsibility</li></ul></div></div>
    <p class="lead">Call each card: <b class="cb">LIBERAL</b>, <b class="cr">CONSERVATIVE</b>, or <b>PARTY</b> (a group doing election work). If a party is DOING something, like running ads or picking candidates, it's PARTY, even if a belief is mentioned. <b>16 of 20</b> to pass.</p>
    <button class="primary go" id="go">Open the desk →</button>`;
    $('#go').onclick = () => { st.phase = 'r1'; st.t0 = Date.now(); st.r1Base = st.score; save(); $('#overlay').hidden = true; render(); };
  }
  $('#overlay').hidden = false;
}

/* ---- Round 1: Call It (20 random cards, need 16 right = 80%, or a new set) ---- */
let r1Busy = false;
function att() { return st.att || (st.att = { n: 1, right: 0, seen: 0 }); }
function misses() { const a = att(); return a.seen - a.right; }
function hearts() { return `<span class="lives">${'<i class="on"></i>'.repeat(Math.max(0, MAX_MISS - misses()))}${'<i></i>'.repeat(Math.min(MAX_MISS, misses()))}</span>`; }
function pR1() {
  $('#overlay').hidden = true;
  const a = att();
  if (st.showRetry) return r1RetryCard();
  const id = st.queue[0];
  if (!id || misses() > MAX_MISS) return r1Finish();
  const it = ITEM[id];
  SCENE.show('r1');
  const card = $('#item'); card.hidden = false; card.className = 'itemcard'; card.style.top = '';
  card.innerHTML = `<span class="who"><i class="dot"></i> INCOMING · CALL IT</span><span class="txt">${esc(it.t)}</span>`;
  tray.innerHTML = `<div class="rhead"><span class="rtag">CALL IT${a.n > 1 ? ' · SET ' + a.n : ''}</span><span>Liberal belief, conservative belief, or party action?</span><span class="streak">✓ ${a.right} right · misses left ${hearts()}${st.streak >= 3 ? ' · 🔥 ' + st.streak + ' in a row' : ''}</span></div>
  <div class="callbtns"><button class="lib" data-s="lib">← 🔵 LIBERAL<small>more government help · change · equality</small></button><button class="con" data-s="con">🔴 CONSERVATIVE →<small>smaller government · lower taxes · tradition</small></button><button class="party" data-s="party">↓ 🏛️ PARTY<small>a group running candidates, not a belief</small></button></div><p class="fb" id="fb"></p>`;
  st.shownAt = Date.now(); r1Busy = false;
  tray.querySelectorAll('[data-s]').forEach(b => b.onclick = () => sort(b.dataset.s));
  if (st.r1Next) showMiss(it);
}
function showMiss(it) {
  tray.querySelectorAll('[data-s]').forEach(b => b.disabled = true);
  const a = att(), sk = tray.querySelector('.streak'); if (sk) sk.innerHTML = `✓ ${a.right} right · misses left ${hearts()}`; hud();
  $('#fb').className = 'fb oops'; $('#fb').innerHTML = `Not quite (−50). That's a <b>${SIDE[it.side].s.toUpperCase()}</b>. ${esc(it.why)} <button class="primary" id="gotit" style="margin-left:8px;padding:6px 14px">Got it →</button>`;
  setTimeout(() => { const b = $('#gotit'); if (b) b.onclick = () => { st.r1Next = false; st.queue.shift(); save(); render(); }; }, 400);
}
function sort(side) {
  if (r1Busy || st.r1Next || st.showRetry || locked() || st.phase !== 'r1' || Date.now() - (st.shownAt || 0) < 700) return;
  const a = att(), id = st.queue[0], it = ITEM[id];
  const card = $('#item'); r1Busy = true; a.seen++; (st.seenIds || (st.seenIds = {}))[id] = 1;
  if (a.n === 1 && !st.lockFirst) st.r1[id] = { wrong: side === it.side ? 0 : 1, pick: side }; // first set is what the teacher sees
  if (side === it.side) {
    a.right++; a.bs = a.bs || {}; a.bs[side] = (a.bs[side] || 0) + 1; if (window.classFirstTry) classFirstTry.right('sort-' + id);
    st.streak++; st.best = Math.max(st.best, st.streak);
    const pts = st.streak >= 3 ? 150 : 100;
    st.score += pts; botsStep(90); st.queue.shift(); save(); pushScore();
    if (a.seen === DECK_SIZE / 2) setTimeout(() => toast('Halfway there. ' + a.right + ' right so far.'), 300);
    card.classList.add('fly-' + side);
    const sr = $('.scene').getBoundingClientRect();
    plus(pts, side === 'lib' ? sr.width * .1 : side === 'con' ? sr.width * .84 : sr.width * .47, sr.height * .3);
    SCENE.call(side);
    $('#fb').className = 'fb yay'; $('#fb').innerHTML = (st.streak >= 3 ? '🔥 ' : '✓ ') + esc(it.why);
    hud();
    setTimeout(() => render(), 1500);
  } else {
    st.streak = 0; st.score = Math.max(0, st.score - 50); if (window.classFirstTry) { classFirstTry.wrong(); classFirstTry.right('sort-' + id); }
    st.r1Next = true; // one shot per card; move on after they read why
    save(); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    SCENE.oops();
    showMiss(it);
  }
}
function r1Finish() {
  const a = att();
  if (st.firstAtt == null) { st.firstAtt = a.right; st.firstSeen = a.seen; }
  st.attempts = st.passedSets || ((st.prevTries || 0) + a.n);
  if (a.right >= PASS) { save(); return roundDone('r2', `${a.right} of ${DECK_SIZE}. You passed Call It.`, 'Next: real voters. Each one tells you 3 beliefs. Decide where they stand, then which party they\'d most likely vote for. Two new ideologies show up:', `<div class="duo"><div class="d1 purple"><b>⚖️ MODERATE</b><span>A <b>mix</b>: some liberal beliefs, some conservative beliefs. Could vote for either party.</span><i>Wants free community college AND a bigger military.</i></div><div class="d2 gold"><b>🗽 LIBERTARIAN</b><span><b>Less government on everything</b>: out of your wallet AND your personal life.</span><i>Wants lower taxes AND no ban on sports betting.</i></div></div>`); }
  st.lastTry = { right: a.right, seen: a.seen };
  if (st.r1Base != null) st.score = st.r1Base;
  st.att = { n: a.n + 1, right: 0, seen: 0 }; st.queue = newDeck(st.seenIds); st.streak = 0; st.showRetry = true; save();
  r1RetryCard();
}
function r1RetryCard() {
  const lt = st.lastTry || { right: 0, seen: 0 }; hud(); SCENE.show('r1');
  $('#item').hidden = true; tray.innerHTML = '';
  const card = $('#card'); card.className = 'card brief';
  card.innerHTML = `<p class="eyebrow">NEW SET</p><h2>New set, fresh start.</h2><p class="lead">${PASS} of ${DECK_SIZE} moves you on. These tips help:</p>
  <div class="tips"><p><b class="cb">More government help</b>, higher taxes on the rich, more rules, change → <b class="cb">LIBERAL</b></p><p><b class="cr">Smaller government</b>, lower taxes, fewer rules, tradition → <b class="cr">CONSERVATIVE</b></p><p>A group <b>picking candidates, raising money, or campaigning</b> → <b>PARTY</b>, even if it mentions a belief</p></div>
  <button class="primary go" id="go">Try a new set →</button>`;
  $('#overlay').hidden = false;
  $('#go').onclick = () => { st.showRetry = false; save(); SCENE.sync(); $('#overlay').hidden = true; render(); };
}
document.addEventListener('keydown', e => {
  if (st.phase !== 'r1' || !$('#overlay').hidden || $('#helpDialog').open) return;
  const k = { ArrowLeft: 'lib', ArrowRight: 'con', ArrowDown: 'party' }[e.key]; if (k) { e.preventDefault(); sort(k); }
});

function roundDone(next, title, line, extra) {
  $('#item').hidden = true; tray.innerHTML = '';
  SCENE.confetti();
  const card = $('#card'); card.className = 'card brief';
  card.innerHTML = `<p class="eyebrow">ROUND COMPLETE</p><h2>${esc(title)}</h2><p class="lead">${esc(line)}</p>${extra || ''}<p class="bigscore">★ ${st.score.toLocaleString()}</p><button class="primary go" id="go">Next round →</button>`;
  $('#overlay').hidden = false;
  st.phase = next; save();
  $('#go').onclick = () => { $('#overlay').hidden = true; render(); };
}

/* ---- Round 2: Where Do They Stand? ---- */
function pR2() {
  $('#overlay').hidden = true;
  const vix = (st.voterOrder || [0, 1, 2, 3, 4, 5])[st.vi], v = VOTERS[vix];
  if (!v) return roundDone('r3', 'Every voter placed.', 'Last round: two people believe the SAME thing, but they\'re in DIFFERENT parties. Figure out why.');
  SCENE.show('r2', voterPins());
  const r = st.r2[v.id] || (st.r2[v.id] = { iw: 0, idone: false, pw: 0, pdone: false });
  const item = $('#item'); item.hidden = false; item.className = 'itemcard voter'; item.style.top = '';
  item.innerHTML = `<span class="who">VOTER FILE · ${esc(v.name.toUpperCase())} · ${esc(v.who)}</span><ul class="says">${v.says.map(s => `<li>“${esc(s)}”</li>`).join('')}</ul>`;
  if (r.pdone) return r2Result(v, r);
  if (r.idone) return r2Party(v, r);
  const draw = () => {
    tray.innerHTML = `<div class="rhead"><span class="rtag">WHERE DO THEY STAND?</span><span>Read all 3 of ${esc(v.name)}'s beliefs.</span></div>
    <h2>What is ${esc(v.name)}'s ideology?</h2>
    <div class="ideobtns">${(r.iorder || (r.iorder = shuffle(['lib', 'mod', 'con', 'ltn']))).map(k => `<button class="${k}" data-k="${k}">${IDEO[k].b}<small>${IDEO[k].s}</small></button>`).join('')}</div><p class="fb" id="fb"></p>`;
    tray.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      if (b.dataset.k === v.ideo) {
        r.idone = true; if (window.classFirstTry) classFirstTry.right('ideo-' + v.id);
        const pts = r.iw ? 0 : 150; st.score += pts; botsStep(120); save(); pushScore(); hud(); SCENE.show('r2', voterPins()); SCENE.ping(v.ideo);
        r2Party(v, r);
      } else { if (!r.li) r.iw++; delete r.iorder; st.score = Math.max(0, st.score - 25); hud(); if (window.classFirstTry) classFirstTry.wrong(); save(); SCENE.oops(); pause(tray, $('#fb'), 'Not quite (−25). Check each belief: more government, less government, a mix, or less on everything?', draw); }
    });
  };
  draw();
  if (locked()) pause(tray, $('#fb'), st.lockMsg, draw, true);
}
function r2Party(v, r) {
  const draw = () => {
    tray.innerHTML = `<div class="rhead"><span class="rtag">WHERE DO THEY STAND?</span><span class="okline">✓ ${IDEO[v.ideo].b}</span></div>
    <p class="why2">${esc(v.why)}</p>
    <h2>Which party would ${esc(v.name)} most likely vote for?</h2>
    <div class="chips">${(r.popt || (r.popt = shuffle(v.popts))).map(k => `<button data-p="${k}">${PARTY[k]}</button>`).join('')}</div><p class="fb" id="fb"></p>`;
    tray.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
      if (b.dataset.p === v.party) {
        r.pdone = true; if (window.classFirstTry) classFirstTry.right('party-' + v.id);
        const pts = r.pw ? 0 : 100; st.score += pts; botsStep(80); save(); pushScore(); hud(); r2Result(v, r);
      } else { if (!r.lp) r.pw++; delete r.popt; st.score = Math.max(0, st.score - 25); hud(); if (window.classFirstTry) classFirstTry.wrong(); save(); SCENE.oops(); pause(tray, $('#fb'), v.ideo === 'mod' ? 'Not quite (−25). Moderates are a mix. Would they always stick with one party?' : 'Not quite (−25). Which party\'s beliefs match a ' + IDEO[v.ideo].b.replace(/^\S+ /, '').toLowerCase() + ' best?', draw); }
    });
  };
  save(); draw();
  if (locked()) pause(tray, $('#fb'), st.lockMsg, draw, true);
}
function r2Result(v) {
  tray.innerHTML = `<div class="rhead"><span class="rtag">WHERE DO THEY STAND?</span><span class="okline">✓ ${IDEO[v.ideo].b} → ${PARTY[v.party]}</span></div>
  <p class="why2">${esc(v.pwhy)}</p>
  ${st.vi === 0 ? '<p class="note">Notice: the ideology is what they BELIEVE. The party is the GROUP they\'d most likely vote for.</p>' : ''}
  <div class="row"><button class="primary" id="nx">${st.vi < VOTERS.length - 1 ? 'Next voter →' : 'Finish round →'}</button></div>`;
  guardNext(() => { st.vi++; save(); render(); });
}
function voterPins() { return (st.voterOrder || []).map(i => VOTERS[i]).filter(v => st.r2[v.id] && st.r2[v.id].idone).map(v => ({ k: v.ideo, n: v.name })); }

/* ---- Round 3: Same Belief, Different Party ---- */
function pR3() {
  $('#overlay').hidden = true;
  const ci = (st.caseOrder || [0, 1, 2, 3, 4])[st.ci], c = CASES[ci];
  if (!c) { st.phase = 'final'; save(); return render(); }
  SCENE.show('r3', c);
  const r = st.r3[ci] || (st.r3[ci] = { wrong: 0, done: false });
  const item = $('#item'); item.hidden = false; item.className = 'itemcard quote'; item.style.top = '';
  item.innerHTML = `<span class="who">${esc(c.b.name.toUpperCase())} · ${esc(c.b.who)}</span><span class="txt">“${esc(c.say)}”</span>`;
  if (r.done) return r3Result(c);
  const draw = () => {
    tray.innerHTML = `<div class="rhead"><span class="rtag">SAME BELIEF, DIFFERENT PARTY</span><span>${esc(c.a.name)} (${esc(c.a.party)}) and ${esc(c.b.name)} (${esc(c.b.party)}) BOTH believe <b>${esc(c.belief)}</b> <i>(${esc(c.tag)})</i>.</span></div>
    <h2>${esc(c.q || 'What decided ' + c.b.name + '\'s party?')}</h2>
    <div class="chips">${(r.opt || (r.opt = shuffle(c.opts))).map(k => `<button data-k="${k}">${REASONS[k]}</button>`).join('')}</div><p class="fb" id="fb"></p>`;
    tray.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      if (b.dataset.k === c.right) {
        r.done = true; if (window.classFirstTry) classFirstTry.right('why-' + ci);
        const pts = r.wrong ? 0 : 150; st.score += pts; botsStep(130); save(); pushScore(); hud(); r3Result(c);
      } else { if (!r.lk) r.wrong++; delete r.opt; st.score = Math.max(0, st.score - 25); hud(); if (window.classFirstTry) classFirstTry.wrong(); save(); SCENE.oops(); pause(tray, $('#fb'), 'Not quite (−25). ' + c.hint, draw); }
    });
  };
  save(); draw();
  if (locked()) pause(tray, $('#fb'), st.lockMsg, draw, true);
}
function r3Result(c) {
  tray.innerHTML = `<div class="rhead"><span class="rtag">SAME BELIEF, DIFFERENT PARTY</span><span class="okline">✓ ${REASONS[c.right]}</span></div>
  ${st.ci === 0 ? '<p class="why2">Your beliefs don\'t pick your party for you. People pick the party that fits them <b>best</b>, not perfectly. In 2025, about 1 in 3 Democrats and 1 in 5 Republicans called themselves moderate (Gallup).</p>' : ''}<p class="note">${esc(c.fact)}</p>
  <div class="row"><button class="primary" id="nx">${st.ci < CASES.length - 1 ? 'Next pair →' : 'See my results →'}</button></div>`;
  guardNext(() => { st.ci++; save(); render(); });
}

/* ---- Final + turn in ---- */
const PROMPTS = [
  { id: 'diff', short: 'Ideology vs. party', label: '1. What is an ideology? What is a party? How does a party help someone like Rosa or Wade get what they want?', stem: 'An ideology is ___. A party is ___. A party helps people like ___ by ___.', min: 90,
    must: [['belief', 'believe', 'opinion', 'idea', 'ideas', 'views', 'values', 'think', 'thinks', 'want', 'wants'], ['candidate', 'election', 'elect', 'campaign', 'ballot', 'primary', 'convention', 'caucus', 'office', 'run', 'running', 'vote', 'voting']], msg: 'In answer 1, say what an ideology is (beliefs) AND what a party is (a group that runs candidates).', link: ['elect', 'election', 'run', 'running', 'win', 'winning', 'office', 'law', 'laws', 'candidate', 'vote', 'votes'], linkMsg: 'In answer 1, explain HOW a party helps people get what they want from government (like running candidates who win and make laws).' },
  { id: 'union', short: 'Union and democracy', label: '2. Tony\'s union tells its members who to vote for. Give one way that HELPS democracy and one way it could HURT democracy.', stem: 'It helps democracy because ___. It could hurt democracy because ___.', min: 90, reasons: true,
    must: [['help', 'helps', 'good', 'benefit', 'plus'], ['hurt', 'hurts', 'bad', 'harm', 'problem', 'minus', 'downside'], ['union', 'tony', 'member', 'members', 'worker', 'workers', 'vote', 'votes', 'voter', 'voters', 'candidate', 'candidates']], msg: 'In answer 2, give one way Tony\'s union HELPS democracy and one way it could HURT, with a reason for each.' },
  { id: 'crit', optional: true, short: '⭐ Level 4 challenge', label: '⭐ Level 4 challenge (optional, +300 ★): Mike votes on just one issue (guns). Overall, is that good or bad for democracy? Weigh both sides, then decide and explain why.', stem: 'On one hand ___. On the other hand ___. Overall I think ___ because ___.', min: 130, reasons: true,
    must: [['good', 'bad', 'help', 'helps', 'hurt', 'hurts', 'benefit', 'problem'], ['mike', 'gun', 'guns', 'issue', 'single']], msg: 'For the Level 4 challenge, talk about Mike voting on one issue, weigh both sides, and explain your decision with "because."' }
];
const VKEY = {
  rosa: { ide: 'liberal', p: ['democrat'], ev: ['health', 'sick', 'broke', 'tax', 'taxes', 'rich', 'background', 'gun', 'guns', 'pollution', 'river', 'rivers', 'compan', 'clean'] },
  marcus: { ide: 'liberal', p: ['democrat'], ev: ['college', 'free', 'marriage', 'married', 'same-sex', 'same sex', 'couple', 'gay', 'minimum', 'wage', '7.25', 'pay', 'right'] },
  wade: { ide: 'conservative', p: ['republican'], ev: ['tax', 'taxes', 'rule', 'rules', 'business', 'police', 'criminal', 'sentence', 'washington', 'crime'] },
  linda: { ide: 'conservative', p: ['republican'], ev: ['family', 'tradition', 'values', 'work', 'themselves', 'program', 'school', 'christian', 'religio', 'private', 'tax', 'hard'] },
  jasmine: { ide: 'moderate', p: ['either', 'both', 'swing', 'depend', 'democrat', 'republican', 'any'], ev: ['health', 'police', 'sentence', 'crime', 'criminal', 'gun', 'guns', 'background', 'tax', 'taxes'] },
  eli: { ide: 'libertarian', p: ['libertarian', 'republican'], ev: ['tax', 'taxes', 'program', 'marry', 'marriage', 'home', 'marijuana', 'weed', 'adult', 'adults', 'choice'] }
};
const IDEO_WORDS = ['liberal', 'conservative', 'moderate', 'libertarian'];
function tally() {
  const sort = st.firstAtt != null ? [st.firstAtt, st.firstSeen || DECK_SIZE] : [att().right, att().seen];
  const ideo = [VOTERS.filter(v => st.r2[v.id] && st.r2[v.id].idone && !st.r2[v.id].iw).length, VOTERS.length];
  const party = [VOTERS.filter(v => st.r2[v.id] && st.r2[v.id].pdone && !st.r2[v.id].pw).length, VOTERS.length];
  const why = [CASES.filter((c, i) => st.r3[i] && st.r3[i].done && !st.r3[i].wrong).length, CASES.length];
  return { sort, ideo, party, why, tot: [sort[0] + ideo[0] + why[0], sort[1] + ideo[1] + why[1]] };
}
function bySide() { const o = { lib: [0, 0], con: [0, 0], party: [0, 0] }; ITEMS.forEach(i => { const r = st.r1[i.id]; if (r) { o[i.side][1]++; if (!r.wrong) o[i.side][0]++; } }); return o; }
function pFinal() {
  $('#item').hidden = true; SCENE.show('final', voterPins()); SCENE.confetti();
  const t = tally();
  const rank = [{ s: st.score, me: true }].concat(liveOthers().length ? liveOthers().map(p => ({ s: p.score })) : st.bots).sort((a, b) => b.s - a.s).findIndex(x => x.me) + 1;
  tray.classList.add('final-tray');
  tray.innerHTML = `<div class="final"><div><p class="eyebrow">FINAL RESULTS</p><p class="big">★ ${st.score.toLocaleString()}</p><p class="jarline">#${rank} in the class race · best streak 🔥${st.best}</p>
    <ul><li>Call It: <b>passed ✓</b></li><li>Voter ideologies (first try): <b>${t.ideo[0]} of ${t.ideo[1]}</b></li><li>Voter parties (first try): <b>${t.party[0]} of ${t.party[1]}</b></li><li>Same Belief, Different Party: <b>${t.why[0]} of ${t.why[1]}</b></li></ul>
    <p class="note">✍️ Last step: 2 short answers, then turn in. Use the starters.</p></div>
    <div>${PROMPTS.map(p => `<div class="pblock${p.optional ? ' opt' + (st.writing.crit || st.showCrit ? ' open' : '') : ''}">${p.optional ? '<button class="optbtn" id="optBtn" type="button">⭐ Want +300? Try the Level 4 challenge (optional)</button>' : ''}<label for="w_${p.id}" class="pl" style="font-weight:850;margin:10px 0 2px${p.optional ? ';color:#8a6400' : ''}">${esc(p.label)}</label><p class="stem">Starter: ${esc(p.stem)}</p><textarea id="w_${p.id}">${esc(st.writing[p.id] || '')}</textarea></div>`).join('')}
    <button class="primary go" id="sendBtn">${st.turnedIn ? 'Turn in again' : 'Turn in'}</button><p class="fb ${st.turnedIn ? 'good' : ''}" id="sendMsg">${st.turnedIn ? 'Turned in! You can fix your answers and turn in again.' : ''}</p></div></div>`;
  PROMPTS.forEach(p => $('#w_' + p.id).addEventListener('input', e => { st.writing[p.id] = e.target.value; save(); }));
  $('#optBtn').onclick = () => { st.showCrit = true; save(); $('.pblock.opt').classList.add('open'); $('#w_crit').focus(); };
  $('#sendBtn').onclick = turnIn; pushScore();
}
const hasWord = (t, w) => new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (w.length > 4 ? '' : '(s|es|ed|ing)?\\b')).test(t);
const cap = s => s[0].toUpperCase() + s.slice(1);
function checkWriting(p, v) {
  const t = v.toLowerCase();
  if (p.optional && !v.trim()) return '';
  if (/\b[bcdfghjklmnpqrstvwxz]{4,}\b/.test(t)) return 'Some of that isn\'t real words. Write a real answer for: ' + p.short + '.';
  if (/\b(idk|idc|lol|lmao|lmfao|bruh|asdf|dunno|bathroom|blah|bye|boring|stupid|dumb|smells?|fr)\b|ok done/.test(t)) return 'Write a real answer for: ' + p.short + '. Use the starter to help.';
  if (/_{2,}/.test(v)) return 'Replace the ___ blanks with your own words in: ' + p.short + '.';
  if (v.length < p.min) return 'Write a little more for: ' + p.short + ' (2 full sentences).';
  if ((v.match(/[a-z0-9][.!?](\s|$)/gi) || []).length < 2) return 'Write at least 2 full sentences for: ' + p.short + '.';
  const stem = new Set(p.stem.toLowerCase().match(/[a-z']+/g) || []);
  if (new Set((t.match(/[a-z']{3,}/g) || []).filter(w => !stem.has(w))).size < 6) return 'Add more of your own words for: ' + p.short + '.';
  if (p.must.some(g => !g.some(w => hasWord(t, w)))) return p.msg;
  if (p.id === 'diff') { const sents = t.split(/[.!?]+/); const ide = sents.find(x => /ideolog/.test(x)), par = sents.find(x => /\bpart(y|ies)\b/.test(x) && !/ideolog/.test(x)); if (ide && !p.must[0].some(w => hasWord(ide, w))) return 'Check answer 1: an ideology is about BELIEFS. Say that in your ideology sentence.'; if (par && (!p.must[1].some(w => hasWord(par, w)) || !/\b(group|organiz|team|members?)/.test(par))) return 'Check answer 1: a party is a GROUP that runs candidates. Say that in your party sentence.'; }
  if (p.reasons) {
    const STOP = new Set('the and that this for him her his they them their its it\'s was are has have had with from what when then than one plus minus good bad help helps hurt hurts democracy because since also could would should will can really very just like thing things way ways more less some other hand overall think side sides'.split(' '));
    const own = x => new Set((x.match(/[a-z']{3,}/g) || []).filter(w => !STOP.has(w) && !stem.has(w))).size;
    if (!/\b(because|since|so)\b/.test(t)) return 'In ' + p.short + ', use "because" to give a real reason.';
    const ss = t.split(/[.!?]+/).filter(x => x.trim());
    const pos = ss.filter(x => /\b(help|helps|good|benefit|plus|on one hand)\b/.test(x)), neg = ss.filter(x => /\b(hurt|hurts|bad|harm|problem|minus|downside|on the other hand)\b/.test(x));
    const REL = /\b(vot|candidat|elect|learn|inform|choos|choice|pick|power|voice|law|pay|wage|right|member|worker|government|politic|opinion|decid|turnout|list|follow|cop(y|ies)|pressure|think|issue|gun|people|citizen|leader|polic)/;
    if (!pos.some(x => own(x) >= 4 && REL.test(x)) || !neg.some(x => own(x) >= 4 && REL.test(x))) return 'In ' + p.short + ', explain WHY for both sides. "It\'s good for him" isn\'t a reason yet. Say what actually happens.';
  }
  if (p.link && !(t.split(/[.!?]+/).filter(x => /\b(help|helps|connect|get|gets)\b/.test(x)).some(x => p.link.some(w => hasWord(x, w))))) return p.linkMsg;
  if (p.id === 'voter') {
    const who = Object.keys(VKEY).find(n => hasWord(t, n)), k = VKEY[who], N = cap(who);
    if (!IDEO_WORDS.some(w => hasWord(t, w))) return 'In answer 2, name ' + N + '\'s ideology: liberal, conservative, moderate, or libertarian.';
    if (!hasWord(t, k.ide) || new RegExp('\\bnot (a |an )?' + k.ide).test(t)) return 'Check ' + N + '\'s ideology again. Look at all 3 things they said.';
    const I = '(liberal|conservative|moderate|libertarian)', S = '\\b(' + who + '|he|she|they)( i|\'|’)s (a |an |more |mostly |really )?';
    if (new RegExp(S + I + ' (and|or|but also) (a |an )?' + I).test(t)) return 'In answer 2, pick ONE ideology for ' + N + '.';
    if (IDEO_WORDS.some(w => w !== k.ide && new RegExp(S + w).test(t))) return 'Check ' + N + '\'s ideology again. Look at all 3 things they said.';
    const proof = t.split(/[.!?]+/).filter(x => /\b(because|since|said|says|wants?|believes?|thinks?)\b/.test(x));
    if (!proof.some(x => k.ev.some(w => hasWord(x, w)))) return 'In answer 2, use one thing ' + N + ' really said as proof (look back at their 3 beliefs).';
    if (!k.p.some(w => hasWord(t, w))) return 'In answer 2, check which party ' + N + ' would most likely vote for.';
  }
  return '';
}
async function turnIn() {
  const msg = $('#sendMsg');
  for (const p of PROMPTS) { const v = ($('#w_' + p.id).value || '').trim(); const bad = checkWriting(p, v); if (bad) { msg.className = 'fb oops'; msg.textContent = bad; $('#w_' + p.id).focus(); return; } }
  const t = tally(), bs = bySide();
  const answers = { 'Standard': 'SS.9-12.Gov.12', 'First-try correct': t.tot[0] + ' of ' + t.tot[1] + ' (Call It set 1 + voter ideologies + same belief/different party)', 'First-try by standard': 'Gov.12: ' + t.tot[0] + ' of ' + t.tot[1],
    'Suggested level (check the writing)': (() => { const pct = t.tot[1] ? t.tot[0] / t.tot[1] : 0, l4 = (((($('#w_crit') || {}).value || '').trim())); return (pct >= .75 ? 'Level 3' : pct >= .5 ? 'Level 2' : 'Level 1') + ' from first-try ' + Math.round(pct * 100) + '%' + (l4 ? ' · Level 4 attempted, read the challenge answer' : ''); })(),
    'First-try by part': 'Call It set 1: ' + t.sort[0] + ' right, ' + (t.sort[1] - t.sort[0]) + ' missed' + (t.sort[1] < DECK_SIZE ? ' (stopped at card ' + t.sort[1] + ')' : '') + ' (liberal ' + bs.lib.join('/') + ', conservative ' + bs.con.join('/') + ', party ' + bs.party.join('/') + ') · Voter ideology ' + t.ideo.join('/') + ' · Voter party ' + t.party.join('/') + ' · Same belief, different party ' + t.why.join('/'), 'Game points (not a grade)': String(st.score + (st.turnedIn ? 0 : 200 + (((($('#w_crit') || {}).value || '').trim()) ? 300 : 0))) };
  answers['Call It sets'] = (st.attempts || 1) + (st.attempts > 1 ? ' sets played to reach 80%' : ' (passed first set)') + ((st.attempts || 1) >= 3 ? ' ⚠️ check in with this student' : '') + (st.resets ? ' · used Start over ' + st.resets + 'x' : '');
  const missed = ITEMS.filter(i => st.r1[i.id] && st.r1[i.id].wrong).map(i => `"${i.t.replace(/[“”]/g, '')}" (is ${SIDE[i.side].s}; picked ${SIDE[st.r1[i.id].pick] ? SIDE[st.r1[i.id].pick].s : '?'})`);
  answers['Call It misses'] = missed.length ? missed.join('; ') : 'none';
  VOTERS.forEach(v => { const r = st.r2[v.id] || {}; answers['Voter · ' + v.name] = IDEO[v.ideo].b.replace(/^\S+ /, '').toLowerCase() + (r.iw ? ' (after ' + r.iw + ' wrong)' : ' (first try)') + ' → ' + PARTY[v.party] + (r.pw ? ' (after ' + r.pw + ' wrong)' : ' (first try)'); });
  CASES.forEach((c, i) => { const r = st.r3[i] || {}; answers['Why · ' + c.b.name] = REASONS[c.right].replace(/^\S+ /, '') + (r.wrong ? ' (after ' + r.wrong + ' wrong)' : ' (first try)'); });
  PROMPTS.forEach(p => answers['Writing: ' + p.short] = ($('#w_' + p.id).value || '').trim() || (p.optional ? '(skipped)' : ''));
  $('#sendBtn').disabled = true; msg.className = 'fb'; msg.textContent = 'Sending your work…';
  try {
    const res = await classTurnIn(OLD_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGN, assignmentTitle: 'Government Unit 2 · Day 1 · Decision Desk (Ideology vs. Party)', answers }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Your work did not save. Try again.');
    const hasL4 = !!((($('#w_crit') || {}).value || '').trim()); if (!st.bonusPaid || (hasL4 && !st.l4Paid)) { st.score += (st.bonusPaid ? 0 : 200) + (hasL4 && !st.l4Paid ? 300 : 0); st.bonusPaid = true; if (hasL4) st.l4Paid = true; pushScore(); hud(); SCENE.confetti(); const bg = document.querySelector('.final .big'); if (bg) bg.textContent = '★ ' + st.score.toLocaleString(); } st.turnedIn = true; save(); msg.className = 'fb yay'; msg.textContent = st.turnedIn && st.sentOnce ? 'Updated! Your teacher sees your newest answers.' : 'Turned in! +200 bonus. Your teacher can see your work.'; st.sentOnce = true; save(); $('#sendBtn').textContent = 'Turned in ✓'; $('#sendBtn').disabled = false;
  } catch (e) { msg.className = 'fb oops'; msg.textContent = e.message || 'Could not turn in. Try again.'; $('#sendBtn').disabled = false; }
}

/* =====================================================================
   SCENE: election-night studio. Dark set, blue/red glow, live results boards.
   ===================================================================== */
const SCENE = (() => {
  const cv = $('#scene'), ctx = cv.getContext('2d'), H = 400; let W = 960;
  function fit() { const r = cv.parentElement.getBoundingClientRect(); if (!r.height) return; W = Math.max(760, Math.min(1600, Math.round(H * r.width / r.height))); cv.width = W; cv.height = H; }
  fit(); window.addEventListener('resize', fit);
  const C = { lib: '#3b82f6', con: '#ef4444', party: '#e2e8f0', mod: '#a78bfa', ltn: '#f5c242' };
  let mode = 'title', pins = [], pair = null, popT = performance.now(), oopsT = -9999, flash = { k: null, t: -9999 }, dots = [], conf = [], counts = { lib: 0, con: 0, party: 0 }, shown = { lib: 0, con: 0, party: 0 }, t0 = performance.now();
  const WORDS = ['TAXES', 'HEALTH CARE', 'GUNS', 'BORDER', 'CLIMATE', 'MINIMUM WAGE', 'POLICE', 'SCHOOLS', 'MILITARY', 'RIGHTS', 'WELFARE', 'VOTING'].map((w, i) => ({ w, x: (i < 6 ? 0 : .65) + (i % 6) * .11, y: 40 + (i % 6) * 48, s: .012 + (i % 6) * .003 }));
  function show(m, a) { if (m !== mode) { popT = performance.now(); if (mode !== 'title' && mode !== m) conf = []; } mode = m; if (m === 'r2' || m === 'final') pins = a || []; if (m === 'r3') { if (a !== pair) popT = performance.now(); pair = a; } }
  function boxes() { const bw = Math.min(200, W * .17); return { lib: { x: W * .03, y: 168, w: bw, h: 112 }, con: { x: W * .97 - bw, y: 168, w: bw, h: 112 }, party: { x: W / 2 - bw * .65, y: 214, w: bw * 1.3, h: 70 } }; }
  function call(k) { const b = boxes()[k]; dots.push({ k, x0: W / 2, y0: 120, x1: b.x + b.w / 2, y1: b.y + b.h / 2, t: performance.now() }); counts[k]++; }
  function ping(k) { flash = { k, t: performance.now() }; }
  function oops() { oopsT = performance.now(); }
  function confetti() { for (let i = 0; i < 90; i++) conf.push({ x: Math.random() * W, y: -20 - Math.random() * 200, vx: (Math.random() - .5) * 1.5, vy: 1.5 + Math.random() * 2.5, c: ['#3b82f6', '#ef4444', '#f8fafc'][i % 3], r: Math.random() * 6.28, w: 4 + Math.random() * 5 }); }
  function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
  function bg(now) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#081120'); g.addColorStop(1, '#13233d'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const glow = (x, col) => { const r = ctx.createRadialGradient(x, 210, 10, x, 210, W * .42); r.addColorStop(0, col); r.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H); };
    glow(0, 'rgba(59,130,246,.28)'); glow(W, 'rgba(239,68,68,.26)');
    // perspective floor grid
    const hz = 236; ctx.strokeStyle = 'rgba(148,180,230,.10)'; ctx.lineWidth = 1;
    for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(W / 2 + i * 14, hz); ctx.lineTo(W / 2 + i * W * .12, H); ctx.stroke(); }
    const off = (now / 2400) % 1;
    for (let i = 0; i < 9; i++) { const f = Math.pow((i + off) / 9, 2.2), y = hz + f * (H - hz); ctx.globalAlpha = .4 + f * .6; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.globalAlpha = 1;
    // light sweep
    const sx = ((now / 7000) % 1) * (W + 400) - 200, sw = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0); sw.addColorStop(0, 'rgba(255,255,255,0)'); sw.addColorStop(.5, 'rgba(255,255,255,.035)'); sw.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = sw; ctx.fillRect(0, 0, W, H);
  }
  function spectrum(y, labels) {
    const x0 = W * .06, x1 = W * .94, g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, C.lib); g.addColorStop(.5, '#8b8fb0'); g.addColorStop(1, C.con);
    ctx.fillStyle = g; rr(x0, y, x1 - x0, 8, 4); ctx.fill();
    if (!labels) return;
    ctx.font = '800 13px system-ui,Arial'; ctx.fillStyle = '#cbd5e1'; ctx.textAlign = 'left'; ctx.fillText('◀ LIBERAL · Democrats', x0, y + 28); ctx.textAlign = 'right'; ctx.fillText('Republicans · CONSERVATIVE ▶', x1, y + 28); ctx.textAlign = 'center'; ctx.fillText('MODERATE', W / 2, y + 28);
  }
  function board(b, label, col, n, hot) {
    ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = hot ? 28 : 10; ctx.fillStyle = 'rgba(10,20,38,.88)'; rr(b.x, b.y, b.w, b.h, 12); ctx.fill(); ctx.restore();
    ctx.strokeStyle = col; ctx.lineWidth = hot ? 3 : 1.5; rr(b.x, b.y, b.w, b.h, 12); ctx.stroke();
    ctx.fillStyle = col; rr(b.x, b.y, b.w, 24, [12, 12, 0, 0]); ctx.globalAlpha = .9; ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = col === C.party ? '#0b1626' : '#fff'; ctx.font = '900 12.5px system-ui,Arial'; ctx.textAlign = 'center'; ctx.fillText(label, b.x + b.w / 2, b.y + 17);
    ctx.fillStyle = '#f8fafc'; ctx.font = '900 ' + (b.h > 90 ? 44 : 32) + 'px "Arial Black",system-ui,Arial'; ctx.fillText(String(n), b.x + b.w / 2, b.y + (b.h > 90 ? 82 : 62));
  }
  function avatar(x, y, s, ring, label, party) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = '#22324d'; ctx.beginPath(); ctx.arc(0, -40, 26, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-48, 30); ctx.quadraticCurveTo(-46, -8, 0, -8); ctx.quadraticCurveTo(46, -8, 48, 30); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = ring; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -40, 26, 0, 7); ctx.stroke(); ctx.restore();
    ctx.font = '800 15px system-ui,Arial'; ctx.textAlign = 'center'; ctx.fillStyle = '#f8fafc'; ctx.fillText(label, x, y + 52 * s);
    ctx.font = '900 12px system-ui,Arial'; const w = ctx.measureText(party).width + 18; ctx.fillStyle = ring; rr(x - w / 2, y + 60 * s, w, 22, 11); ctx.fill(); ctx.fillStyle = ring === C.party ? '#0b1626' : '#fff'; ctx.fillText(party, x, y + 60 * s + 15);
  }
  function zones(now) {
    const Z = [['lib', 'LIBERAL', .05, .27], ['mod', 'MODERATE', .29, .51], ['con', 'CONSERVATIVE', .53, .75], ['ltn', 'LIBERTARIAN', .79, .95]], y = 262, h = 92;
    const g = ctx.createLinearGradient(W * .05, 0, W * .75, 0); g.addColorStop(0, C.lib); g.addColorStop(.5, '#8b8fb0'); g.addColorStop(1, C.con); ctx.fillStyle = g; rr(W * .05, y + h + 8, W * .70, 6, 3); ctx.fill();
    ctx.fillStyle = C.ltn; rr(W * .79, y + h + 8, W * .16, 6, 3); ctx.fill();
    Z.forEach(([k, lab, a, b]) => {
      const x = W * a, w = W * (b - a), hot = flash.k === k && now - flash.t < 900;
      ctx.save(); ctx.shadowColor = C[k]; ctx.shadowBlur = hot ? 30 : 8; ctx.fillStyle = 'rgba(10,20,38,.85)'; rr(x, y, w, h, 12); ctx.fill(); ctx.restore();
      ctx.strokeStyle = C[k]; ctx.lineWidth = hot ? 3 : 1.5; rr(x, y, w, h, 12); ctx.stroke();
      ctx.fillStyle = C[k]; ctx.font = '900 12.5px system-ui,Arial'; ctx.textAlign = 'center'; ctx.fillText(lab, x + w / 2, y + 18);
      const mine = pins.filter(p => p.k === k);
      mine.forEach((p, i) => { const cx = x + w / 2 + (i - (mine.length - 1) / 2) * 46, cy = y + 54; ctx.fillStyle = C[k]; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, 7); ctx.fill(); ctx.fillStyle = k === 'ltn' ? '#0b1626' : '#fff'; ctx.font = '900 13px system-ui,Arial'; ctx.fillText(p.n.slice(0, 2).toUpperCase(), cx, cy + 5); });
    });
    ctx.font = '700 11px system-ui,Arial'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center'; ctx.fillText('less government on everything', W * .87, y + h + 30);
  }
  function draw(now) {
    const dt = Math.min(50, now - t0); t0 = now;
    bg(now);
    const pop = Math.min(1, (now - popT) / 400), ease = 1 - Math.pow(1 - pop, 3);
    if (mode === 'title' || mode === 'intro') {
      ctx.textAlign = 'center';
      WORDS.forEach(o => { o.x += o.s * dt / 1000; if (o.x > 1.15) o.x -= 1.3; ctx.font = '900 30px "Arial Black",system-ui,Arial'; ctx.fillStyle = 'rgba(203,213,225,.07)'; ctx.fillText(o.w, o.x * W, o.y); });
      spectrum(330, true);
    }
    if (mode === 'r1' || mode === 'final') {
      const B = boxes();
      ['lib', 'con', 'party'].forEach(k => { if (mode === 'final') shown[k] = counts[k]; });
      board(B.lib, 'LIBERAL', C.lib, shown.lib, flash.k === 'lib' && now - flash.t < 700);
      board(B.con, 'CONSERVATIVE', C.con, shown.con, flash.k === 'con' && now - flash.t < 700);
      board(B.party, 'PARTY ACTIONS', C.party, shown.party, flash.k === 'party' && now - flash.t < 700);
      spectrum(330, true);
    }
    if (mode === 'r2' || (mode === 'final' && pins.length)) { if (mode === 'r2') zones(now); }
    if (mode === 'r3' && pair) {
      const col = p => p === 'Republican' ? C.con : p === 'Democrat' ? C.lib : C.party, s = .8 + .2 * ease;
      avatar(W * .3, 268, s, col(pair.a.party), pair.a.name, pair.a.party); avatar(W * .7 + (now - oopsT < 400 ? Math.sin((now - oopsT) / 25) * 5 : 0), 268, s, col(pair.b.party), pair.b.name, pair.b.party);
      ctx.font = '800 14px system-ui,Arial'; const txt = 'Both believe: ' + pair.belief, w = ctx.measureText(txt).width + 30;
      ctx.fillStyle = 'rgba(15,28,50,.92)'; ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1.5; rr(W / 2 - w / 2, 232, w, 32, 16); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#e9e5ff'; ctx.textAlign = 'center'; ctx.fillText(txt, W / 2, 253);
    }
    // flying result dots
    dots = dots.filter(d => { const p = Math.min(1, (now - d.t) / 520), e = 1 - Math.pow(1 - p, 3), x = d.x0 + (d.x1 - d.x0) * e, y = d.y0 + (d.y1 - d.y0) * e - Math.sin(p * Math.PI) * 50;
      ctx.save(); ctx.shadowColor = C[d.k]; ctx.shadowBlur = 20; ctx.fillStyle = C[d.k]; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill(); ctx.restore();
      if (p >= 1) { shown[d.k] = Math.min(counts[d.k], shown[d.k] + 1); flash = { k: d.k, t: now }; return false; } return true; });
    // wrong answer: red edge flash
    if (now - oopsT < 450) { const a = .2 * (1 - (now - oopsT) / 450), v = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, W * .7); v.addColorStop(0, 'rgba(239,68,68,0)'); v.addColorStop(1, 'rgba(239,68,68,' + a + ')'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H); }
    conf = conf.filter(p => { p.x += p.vx; p.y += p.vy; p.r += .08; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -2, p.w, 4); ctx.restore(); return p.y < H + 20; });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  // restore board counts from saved first-set answers after a reload
  function sync() { const bs = (st.att && st.att.bs) || {}; ['lib', 'con', 'party'].forEach(k => { counts[k] = shown[k] = bs[k] || 0; }); }
  return { show, call, ping, oops, confetti, sync };
})();

/* ---------------- BOOT ---------------- */
$('#helpBtn').onclick = () => $('#helpDialog').showModal();
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => $('#' + b.dataset.close).close());
$('#resetBtn').onclick = () => { if (!confirm('Start over? This erases your progress on this device.')) return; const old = st; st = fresh(); st.name = old.name; st.room = old.room; st.phase = 'intro'; st.primer = 1; ['firstAtt', 'firstSeen', 'r1'].forEach(k => { if (old[k] != null) st[k] = old[k]; });
  if (st.firstAtt == null && old.att && old.att.seen > 0) { st.firstAtt = old.att.right; st.firstSeen = old.att.seen; } if (st.firstAtt != null || Object.keys(st.r1 || {}).length) st.lockFirst = true;
  Object.keys(old.r2 || {}).forEach(k => { const o = old.r2[k]; st.r2[k] = { iw: o.iw || 0, pw: o.pw || 0, idone: false, pdone: false, li: !!(o.idone || o.li), lp: !!(o.pdone || o.lp) }; }); Object.keys(old.r3 || {}).forEach(k => { const o = old.r3[k]; st.r3[k] = { wrong: o.wrong || 0, done: false, lk: !!(o.done || o.lk) }; });
  st.bonusPaid = old.bonusPaid || old.turnedIn; st.l4Paid = old.l4Paid; st.sentOnce = old.sentOnce; if (old.phase !== 'r1' && old.phase !== 'intro' && old.phase !== 'title' && old.attempts) st.passedSets = old.attempts; else if (old.passedSets) st.passedSets = old.passedSets; st.prevTries = (old.prevTries || 0) + (old.att && (old.att.seen > 0 || old.att.n > 1) ? old.att.n : 0); st.attempts = old.attempts; st.resets = (old.resets || 0) + 1; save(); location.reload(); };
if (st.name) startArena();
SCENE.sync();
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
