/* 13 States. One Mess. — game data and rules (no screen code here).
   Real history lives in "real" and "rule" fields (sourced in the Sources box).
   Moves, meters, the rival, and "in your game" results are made up. */
(function (root) {
'use strict';

const RIVAL = 'Delegate Pratt';  // fictional "my state first" delegate

/* Meters: money = Congress's treasury, union = how well the states stick together, anger = unrest among soldiers and farmers. */
const START = { money: 40, union: 60, anger: 30 };

const ROUNDS = [
 { id: 'pay', year: '1783', tag: 'MONEY', title: 'The army wants its pay.',
   real: [
     'The war is won, but Congress still owes its soldiers back pay.',
     'Congress asks each state to send money. Some states simply ignore the requests.',
     'Angry soldiers are getting close to Congress.'],
   rule: { name: 'Article VIII', text: 'Taxes "shall be laid and levied by the authority and direction of the legislatures of the several States."', plain: 'Only STATE lawmakers could tax people. Congress could only ask the states for money.' },
   moves: [
     { id: 'ask', title: 'Send the states another bill', text: 'Ask every state to pay its share. Again.',
       fx: { money: 5, union: 0, anger: 15 }, result: 'Two states pay part of their share. The rest send excuses. Soldiers hear that their money isn’t coming.',
       cause: 'Caused by: Congress can only ASK states for money.', rival: 'My state has its own debts. Your soldiers can wait.' },
     { id: 'ious', title: 'Pay soldiers with paper IOUs', text: 'Promise to pay them later in paper notes.',
       fx: { money: 0, union: 5, anger: 5 }, flag: 'ious', result: 'Soldiers go home with paper promises. Many sell them cheap just to buy food. They won’t forget.',
       cause: 'Caused by: an empty treasury and no way to fill it.', rival: 'Paper is cheap. Good choice.' },
     { id: 'tax', blocked: true, title: 'Send collectors to tax people directly', text: 'Raise the money with a national tax.',
       fx: { money: 0, union: -15, anger: 10 }, result: 'BLOCKED. Your tax collectors get turned away at every state line. Congress has no power to tax. A whole season is wasted.',
       cause: 'Caused by: Article VIII. Only state lawmakers can tax.', rival: 'Tax MY people? Only my state’s lawmakers can do that.' }
   ],
   reveal: 'Weakness #1: <b>No power to tax.</b> Congress could only ask the states for money.',
   realHappened: 'June 20, 1783: unpaid soldiers surrounded the State House in Philadelphia, where Congress was meeting. Congress fled to Princeton, New Jersey.',
   checks: [
     { q: 'Use the Articles rule on the left. Why couldn’t Congress just tax people to pay the soldiers?', a: 'Only state lawmakers could lay taxes', w: ['A president had vetoed the tax plan', 'The Supreme Court struck the tax down', 'The soldiers voted against new taxes'], why: 'Article VIII left taxing to the state legislatures. Congress could only ask.' },
     { q: 'Use the Articles rule on the left. Under Article VIII, where did Congress’s money have to come from?', a: 'Payments sent in by the 13 states', w: ['Taxes Congress collected from people', 'Fees from a national bank account', 'Loans approved by the President'], why: 'The national treasury was filled by the states, if they chose to pay.' }
   ] },

 { id: 'trade', year: '1785', tag: 'TRADE', title: 'States start a trade war.',
   real: [
     'Each state makes its own trade rules.',
     'New York charges duties on goods coming into its ports. People in New Jersey and Connecticut end up paying them.',
     'Alexander Hamilton later asked: “Would Connecticut and New-Jersey long submit to be taxed by New-York for her exclusive benefit?”'],
   rule: { name: 'Articles II and IX', text: '"Each state retains its sovereignty, freedom, and independence." Congress got no power over trade between the states.', plain: 'Every state made its OWN trade rules. Congress could not set one rule for all.' },
   moves: [
     { id: 'fight', title: 'Let states fight back with their own fees', text: 'New Jersey and Connecticut tax New York goods too.',
       fx: { money: 0, union: -15, anger: 5 }, flag: 'tradewar', result: 'Fees pile up at every border. Prices climb. Farmers can’t sell across state lines without paying twice.',
       cause: 'Caused by: 13 states, 13 sets of trade rules.', rival: 'Good. My state wins this trade war.' },
     { id: 'meet', title: 'Invite the states to a trade meeting', text: 'Talk it out. Travel costs money.',
       fx: { money: -10, union: 5, anger: 0 }, flag: 'meeting', result: 'You plan a meeting about trade. Only a few states promise to send anyone. It will take a long time.',
       cause: 'Caused by: no state has to show up. Congress can’t make them.', rival: 'A meeting? I’ll be busy that week.' },
     { id: 'ban', blocked: true, title: 'Pass a national law banning state fees', text: 'One trade rule for all 13 states.',
       fx: { money: 0, union: -10, anger: 5 }, result: 'BLOCKED. States ignore your law. Congress has no power over trade between states. You look weak.',
       cause: 'Caused by: Congress has no power over trade between states.', rival: 'Trade rules belong to my state. Not to you.' }
   ],
   reveal: 'Weakness #2: <b>No power over trade between states.</b> Each state made its own rules.',
   realHappened: 'In 1786, a meeting about trade was held in Annapolis, Maryland. Only five states sent delegates. They called for a bigger meeting in Philadelphia in May 1787.',
   checks: [
     { q: 'Use the Articles rule on the left. Under the Articles, who made the rules for trade between states?', a: 'Each state made its own rules', w: ['Congress made one rule for all', 'A national trade court decided', 'The President signed trade deals'], why: 'States kept their independence, and Congress had no power over trade between them.' },
     { q: 'Read Hamilton’s quote on the left. What could New York do to people in neighboring states?', a: 'Tax goods that its neighbors bought', w: ['Send its troops across their borders', 'Block their delegates in Congress', 'Print money they had to accept'], why: 'New York’s import duties were paid by buyers in New Jersey and Connecticut.' }
   ] },

 { id: 'navy', year: '1785', tag: 'DEFENSE', title: 'Pirates take American sailors.',
   real: [
     'July 1785: pirates from Algiers capture two American ships, the Maria and the Dauphin. Each had 21 sailors on board.',
     'The sailors are held for ransom, far from home.',
     'That same year, the U.S. sold its last navy warship.'],
   rule: { name: 'Article IX', text: 'Congress could "agree upon the number of land forces, and … make requisitions from each State for its quota."', plain: 'Congress could decide how many troops it needed. Then it had to ASK each state to send its share.' },
   moves: [
     { id: 'ransom', title: 'Ask the states for ransom money', text: 'Try to buy the sailors back.',
       fx: { money: -15, union: 0, anger: 5 }, result: 'A few states chip in. It’s not nearly enough. Ransom talks drag on, and more ships get taken.',
       cause: 'Caused by: no steady money for national problems.', rival: 'Those sailors aren’t from my state.' },
     { id: 'ships', title: 'Ask states to send their own ships', text: 'Borrow ships from state navies.',
       fx: { money: 0, union: -10, anger: 5 }, result: 'Most states say their ships must guard their own coasts first. Nobody sails.',
       cause: 'Caused by: Congress can only ASK states for ships and troops.', rival: 'My ships guard MY coast.' },
     { id: 'build', blocked: true, title: 'Order a national navy built now', text: 'Pay for it with a national tax.',
       fx: { money: 0, union: -10, anger: 10 }, result: 'BLOCKED. No power to tax means no money for ships. Your order is just paper.',
       cause: 'Caused by: Articles VIII and IX. No tax power, and troops come from the states.', rival: 'Build it with what money?' }
   ],
   reveal: 'Weakness #3: <b>No real army or navy.</b> Congress had to ask the states for troops and money.',
   realHappened: 'The captured sailors were held for about 10 years. Many died. The U.S. did not create a new navy until 1794.',
   checks: [
     { q: 'Use the Articles rule on the left. Under the Articles, how did Congress get soldiers or sailors?', a: 'It asked each state to send its share', w: ['It drafted people right into service', 'It hired them with national tax money', 'The President ordered them to serve'], why: 'Article IX: Congress set the number, then made requisitions (requests) from each state.' },
     { q: 'Use the real problem on the left. Why was there no national navy to rescue the sailors?', a: 'The U.S. had sold its last navy warship', w: ['The navy was busy fighting Britain', 'Congress sent the navy to Spain', 'The navy was only guarding the Great Lakes'], why: 'The card says the U.S. sold its last navy warship in 1785.' }
   ] },

 { id: 'amend', year: '1786', tag: 'CHANGE THE RULES', title: 'One state says no.',
   real: [
     'Congress asked the states for one fix: the power to tax goods coming into the country.',
     'Most states said yes. Then Rhode Island said no in 1782, and other states backed out. Without all 13, the plan died.',
     'Congress tried again. The second plan died too, after New York would only agree on its own terms.'],
   rule: { name: 'Article XIII', text: 'No change unless it is "agreed to in a Congress of the United States" and "afterwards confirmed by the legislatures of every State."', plain: 'To change the Articles, ALL 13 states had to agree. One state could block everything.' },
   moves: [
     { id: 'retry', title: 'Try again with a smaller tax', text: 'Ask for less. Hope everyone agrees.',
       fx: { money: 0, union: -5, anger: 5 }, result: 'Twelve states sign on. One state adds its own conditions. The fix dies again.',
       cause: 'Caused by: Article XIII. Every state must agree.', rival: 'Twelve isn’t thirteen.' },
     { id: 'deal', title: 'Offer the holdout state a special deal', text: 'Give it something extra to say yes.',
       fx: { money: -10, union: -10, anger: 0 }, result: 'The holdout says yes. Then two other states demand special deals too. Everyone is angry.',
       cause: 'Caused by: when one state can block, every state can bargain.', rival: 'Nice deal. Now I want one too.' },
     { id: 'twelve', blocked: true, title: 'Count 12 yes votes as enough', text: 'Close enough. Pass the fix anyway.',
       fx: { money: 0, union: -15, anger: 5 }, result: 'BLOCKED. The holdout says you broke the Articles. Three states threaten to stop paying anything.',
       cause: 'Caused by: Article XIII. Changes need all 13 states.', rival: 'You broke the rules you swore to follow.' }
   ],
   reveal: 'Weakness #4: <b>Changes needed all 13 states.</b> One state could stop any fix.',
   realHappened: 'Both tax plans failed. Under the Articles, Congress never got the power to tax.',
   checks: [
     { q: 'Use the Articles rule on the left. Why did one state’s “no” kill the import tax?', a: 'Every state had to approve a change', w: ['That state won its case in a national court', 'Nine states were needed but only eight agreed', 'The President sided with that one state'], why: 'Article XIII: any change needed Congress AND every state legislature.' },
     { q: 'Use the Articles rule on the left. Who had to approve any change to the Articles?', a: 'Congress, then all 13 state legislatures', w: ['Congress, then 9 of the 13 state legislatures', 'The President, then the Supreme Court', 'Voters in a national election'], why: 'Article XIII required every state to confirm a change.' }
   ] },

 { id: 'shays', year: '1786–87', tag: 'REBELLION', title: 'Farmers take up arms.',
   real: [
     'In Massachusetts, farmers, many of them war veterans, can’t pay their debts and state taxes. Courts are taking their farms.',
     'January 25, 1787: Daniel Shays leads about 1,500 men toward the arsenal at Springfield.',
     'Congress has no army to send. Massachusetts merchants pay for a state militia instead.'],
   rule: { name: 'Articles VIII and IX', text: 'Money "laid and levied" by the states. Troops by "requisitions from each State for its quota."', plain: 'Congress had no army of its own and no money of its own. It could only ask the states.' },
   moves: [
     { id: 'request', title: 'Ask the states for troops', text: 'Request soldiers to guard the arsenal.',
       fx: { money: -5, union: -5, anger: 5 }, result: 'A few states promise troops. None arrive in time. The rebels reach Springfield.',
       cause: 'Caused by: Congress can only ASK states for troops.', rival: 'Massachusetts made this mess. Let it clean it up.' },
     { id: 'alone', title: 'Let Massachusetts handle it alone', text: 'Stay out of it. Save your money.',
       fx: { money: 0, union: -10, anger: 10 }, result: 'Rich merchants pay for the militia. Farmers say the national government didn’t care about them.',
       cause: 'Caused by: no national power to keep order.', rival: 'Not my state. Not my problem.' },
     { id: 'army', blocked: true, title: 'Send the national army', text: 'March on Springfield.',
       fx: { money: 0, union: -5, anger: 15 }, result: 'BLOCKED. There is no national army to send. The rebels hear that nobody is coming.',
       cause: 'Caused by: Articles VIII and IX. No army, no money.', rival: 'What army?' }
   ],
   reveal: 'Weakness #5: <b>No way to keep order.</b> Congress couldn’t stop a rebellion on its own.',
   realHappened: 'At Springfield, the militia fired. Four rebels were killed and 20 were wounded. The scare pushed leaders to fix the government at the Philadelphia Convention in 1787.',
   checks: [
     { q: 'Use the Articles rule on the left. Why couldn’t Congress send its own army to Springfield?', a: 'It had no army of its own to send', w: ['Its army was guarding the coast', 'The President was out of the country', 'A court ordered the army to stay home'], why: 'Congress had no army and no money of its own. It could only ask the states.' },
     { q: 'Use the real problem on the left. Who paid for the militia that stopped the rebels?', a: 'Merchants in Massachusetts', w: ['Congress, with national taxes', 'All 12 other states, together', 'Britain, as a friendly loan'], why: 'The card says Massachusetts merchants paid for the state militia.' }
   ] }
];

/* The Convention: match each problem to the part of the Constitution that fixed it. One fix card is a decoy. */
const FIXES = [
 { id: 'tax', text: 'Congress can “lay and collect Taxes.”', cite: 'Article I, Section 8' },
 { id: 'commerce', text: 'Congress can “regulate Commerce … among the several States.”', cite: 'Article I, Section 8' },
 { id: 'military', text: 'Congress can “raise and support Armies” and “provide and maintain a Navy.”', cite: 'Article I, Section 8' },
 { id: 'amend', text: 'Amendments need three-fourths of the states, not all 13.', cite: 'Article V' },
 { id: 'order', text: 'Congress can call out the militia to “suppress Insurrections.”', cite: 'Article I, Section 8' },
 { id: 'decoy', text: 'States lose their own governments. Congress runs everything.', cite: 'Not in the Constitution' }
];
const PROBLEMS = [
 { round: 'pay', fix: 'tax', label: 'The army wanted its pay, and states wouldn’t send money.' },
 { round: 'trade', fix: 'commerce', label: 'States charged fees on each other’s goods.' },
 { round: 'navy', fix: 'military', label: 'Pirates took sailors, and there was no navy.' },
 { round: 'amend', fix: 'amend', label: 'One state blocked every change to the rules.' },
 { round: 'shays', fix: 'order', label: 'Farmers rebelled, and Congress couldn’t stop it.' }
];

/* Final check (Gov.9): what did the states keep? */
const FINAL = [
 { q: 'The Constitution gave Congress new powers. Under this new federal system, what did the states keep?', a: 'Their own governments and many powers', w: ['Nothing; Congress took all of their power', 'The power to tax other states’ goods', 'Their own navies and foreign treaties'], why: 'Federalism divides power. Congress handles national problems; states keep their own governments and many powers.' },
 { q: 'Under the Constitution, who sets the rules for trade that crosses state lines?', a: 'Congress, for the whole country', w: ['Each state, at its own state borders', 'Whichever state is the biggest', 'A meeting of state governors'], why: 'The Commerce Clause gives Congress power over trade “among the several States.”' }
];

function clamp(n) { return Math.max(0, Math.min(100, n)); }
function fresh() {
  return { v: 4, started: false, step: 0, phase: 'choose', meters: { ...START }, picks: {}, flags: {}, blocked: 0,
    checks: {}, fixes: {}, fixWrong: 0, final: null, writing: '', turnedIn: [], seed: Math.floor(Math.random() * 1e9), log: [] };
}
/* Earlier choices make later rounds worse. Returns extra effects and the "caused by" line. */
function carryOver(s, roundId) {
  const out = [];
  if (roundId === 'shays' && s.flags.ious) out.push({ fx: { anger: 10 }, why: 'In 1783 you paid soldiers in paper IOUs. Many of those veterans are these farmers.' });
  if (roundId === 'shays' && s.flags.tradewar) out.push({ fx: { anger: 5, money: -5 }, why: 'Your 1785 trade war raised prices. Farmers have even less money.' });
  if (roundId === 'amend' && s.flags.tradewar) out.push({ fx: { union: -5 }, why: 'States are still angry about the trade war.' });
  if (roundId === 'navy' && s.flags.meeting) out.push({ fx: { union: 5 }, why: 'Your trade meeting got a few states talking. They trust each other a little more.' });
  return out;
}
function applyMove(s, round, move) {
  const all = [{ fx: move.fx, why: move.cause }].concat(carryOver(s, round.id));
  all.forEach(e => Object.entries(e.fx).forEach(([k, v]) => { s.meters[k] = clamp(s.meters[k] + v); }));
  if (move.flag) s.flags[move.flag] = true;
  if (move.blocked) s.blocked++;
  s.picks[round.id] = move.id;
  s.log.push(round.year + ' ' + round.title + ' → ' + move.title + (move.blocked ? ' (BLOCKED)' : ''));
  return all;
}
function angryStates(s) { return Math.max(0, Math.min(13, Math.round((80 - s.meters.union) / 6))); }
function ending(s) {
  const m = s.meters, health = Math.round((m.money + m.union + (100 - m.anger)) / 3);
  if (health >= 35) return { key: 'holding', health, title: 'The Union holds… barely', text: 'Your 13 states are still together, but every crisis showed the same thing: Congress is too weak to fix national problems.' };
  if (health >= 27) return { key: 'cracking', health, title: 'The Union is cracking', text: 'States ignore Congress. Soldiers and farmers are furious. Something has to change, fast.' };
  return { key: 'collapse', health, title: 'The Union is falling apart', text: 'States are acting like 13 separate countries. (In real life, leaders met in 1787 before it got this bad.)' };
}
function firstTryCount(s) {
  const items = ROUNDS.map(r => s.checks[r.id]).concat(PROBLEMS.map(p => s.fixes[p.round]), [s.final]);
  return { right: items.filter(x => x && x.first === true).length, total: ROUNDS.length + PROBLEMS.length + 1 };
}
function score(s) {
  const e = ending(s), ft = firstTryCount(s);
  const country = Math.min(40, Math.round(e.health));          // up to 40 (best possible health is about 40)
  const checks = Math.round(ft.right / ft.total * 50);        // up to 50
  const smart = Math.max(0, 10 - s.blocked * 4);              // up to 10: fewer moves the Articles blocked
  const total = Math.max(0, Math.min(100, country + checks + smart));
  const rank = total >= 85 ? 'Founding Genius' : total >= 70 ? 'Steady Hand' : total >= 50 ? 'Barely Holding On' : 'Total Mess';
  return { total, country, checks, smart, rank, firstTry: ft };
}
/* Writing check: blocks junk, needs a real Articles problem AND a Constitution fix. */
const JUNK = /\b(idk|i\s*d\s*k|idc|bruh|lol|lmao|blah|asdf|jk|dunno|nothing|whatever|ok+|yes|no+pe|hi|hello)\b/gi;
function checkWriting(text, starter) {
  const t = String(text || '').trim(), low = t.toLowerCase();
  if (/_{2,}/.test(t)) return 'Fill in the blank with your own words.';
  const body = low.replace(String(starter || '').toLowerCase().replace(/_+/g, ''), ' ');
  const words = body.match(/[a-z0-9']+/g) || [];
  const junk = (low.match(JUNK) || []).length;
  if (words.length < 12) return 'Write a little more: 2 sentences, about 15+ words.';
  if (junk >= 2 || junk / words.length > 0.15) return 'That looks like filler. Name a real problem from your game.';
  const distinct = new Set(words.filter(w => w.length > 2));
  if (distinct.size < 8) return 'Use more of your own words. Don’t repeat the same ones.';
  const problem = /(tax|money|pay|paid|soldier|army|trade|fee|duty|duties|border|navy|ship|sailor|pirate|amend|change|13|thirteen|every state|all states|one state|shays|rebel|farmer|militia|springfield|troop)/;
  const fix = /(constitution|\bnow\b|\bcan\b(?!['’]|not)|three.fourths|3\/4|article (i|v|1|5)\b|amendments?|fixed|fixes|\bfix\b)/;
  if (!problem.test(body)) return 'Name ONE problem from your game (like the soldiers’ pay, the trade war, or Shays’ Rebellion).';
  if (!fix.test(body.replace(/under the articles/g, ''))) return 'Now say how the Constitution fixed it (what Congress CAN do now).';
  return '';
}
const api = { RIVAL, START, ROUNDS, FIXES, PROBLEMS, FINAL, fresh, applyMove, carryOver, angryStates, ending, score, firstTryCount, checkWriting, clamp };
if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.ArticlesGame = api;
})(typeof window !== 'undefined' ? window : this);
