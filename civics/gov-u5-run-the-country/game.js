// =====================================================================
//  RUN THE COUNTRY  (Government Unit 5 · Executive Branch · SS.9-12.Gov.7)
//  A one-screen president simulator, in the spirit of Democracy 4, written at a
//  12-13-year-old reading level. No quiz questions during play.
//
//  THREE PARTS, ONE PRESIDENCY (Fynn, 11-14: "play this each day of the unit"):
//    Part 1 · Day 1 · Year 1: Take Charge           roles and powers of the president
//    Part 2 · Day 2 · Year 2: How Far Can You Push? written vs. unwritten powers, executive
//                                                     orders and agreements, emergencies, midterms
//    Part 3 · Day 3 · Years 3-4: Run the Machine    cabinet, departments, agencies, election night
//  Each day folder (civics/gov-u5-d1/d2/d3-run-the-country/) sets window.RTC_PART and loads
//  this file. Each part = 4 turns (about 12-15 minutes) + one written sentence + turn-in.
//
//  Each turn: 3 ⚡ power. Pick an idea, then pick HOW to do it:
//    ✒️ Sign an order (1⚡)   works only for things the executive branch controls
//    📜 Ask Congress (2⚡)    needed for new laws, taxes, and spending; Congress votes
//    🎤 Give a speech (1⚡)   wins people over and helps the next vote; makes no rules
//  Using an order on something only Congress can do gets BLOCKED by a judge.
//  Every turn also has one event that must be handled before "End".
//
//  The country carries over between days on the same Chromebook (KEY). A student who missed
//  a day (or switched Chromebooks) starts that part from a steady country with a short note.
//  Each new part pulls the numbers a little back toward the middle so nobody is stuck.
//  Ideas are balanced: Day 1 has 4 right-leaning, 4 left-leaning, 2 neither; Days 2 and 3 each
//  add one of each. Students never see a score. The teacher gets their moves + one sentence.
//  Start over replays only today's part. Test T. can jump to any turn (hook at the bottom).
// =====================================================================
(function () {
  "use strict";
  const PART = Math.max(1, Math.min(3, Number(window.RTC_PART) || 1));
  const KEY = "gov-u5-run-the-country-v2";
  const STANDARD = "SS.9-12.Gov.7";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const POWER = 3;
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const cl = n => Math.max(0, Math.min(100, Math.round(n)));
  const rnd = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  const app = $("app");

  // ---------------- The country ----------------
  const DIALS = [
    { id: "eco", icon: "💵", name: "Economy" },
    { id: "safe", icon: "🛡️", name: "Safety" },
    { id: "health", icon: "🏥", name: "Health" },
    { id: "future", icon: "🎓", name: "Schools & future" },
    { id: "world", icon: "🌎", name: "World respect" }
  ];
  const GROUPS = [
    { id: "workers", icon: "👷", name: "Workers", share: 22, cares: ["eco", "health"] },
    { id: "biz", icon: "💼", name: "Business owners", share: 12, cares: ["eco", "world"] },
    { id: "parents", icon: "👨‍👩‍👧", name: "Parents", share: 20, cares: ["safe", "future"] },
    { id: "young", icon: "🎧", name: "Young voters", share: 16, cares: ["future", "health"] },
    { id: "seniors", icon: "👵", name: "Seniors", share: 20, cares: ["health", "safe"] },
    { id: "farmers", icon: "🚜", name: "Farmers", share: 10, cares: ["eco", "world"] }
  ];
  const everyone = n => Object.fromEntries(GROUPS.map(g => [g.id, n]));
  const START = { eco: 50, safe: 50, health: 50, future: 50, world: 50, workers: 48, biz: 50, parents: 50, young: 46, seniors: 52, farmers: 50, congress: 50 };

  // ---------------- Ideas ----------------
  // order: "yes" = an executive order can do it · "no" = only Congress can · "part" = an order does a small version
  // part = first day it shows up. dept = who does the work (shown on Day 3).
  const IDEAS = [
    { id: "gas", part: 1, icon: "⛽", title: "Cut the gas tax", what: "Gas gets cheaper. Less money for fixing roads.", order: "no", why: "Only Congress can change taxes.", cmod: 4, dept: "the Treasury Department",
      fx: { eco: 3, future: -2, workers: 6, farmers: 5, biz: 2, seniors: 2, young: -3 } },
    { id: "e15", part: 1, icon: "🌽", title: "Sell E15 gas all summer", what: "Cheaper gas made with more Iowa corn.", order: "yes", how: "The agency that runs fuel rules works for you.", cmod: 10, dept: "the EPA (an agency)",
      fx: { eco: 2, health: -1, farmers: 10, workers: 2, young: -2 } },
    { id: "insulin", part: 1, icon: "💊", title: "Cap insulin at $35", what: "Diabetes medicine costs $35 a month, max.", order: "no", why: "Setting prices for everyone takes a new law. Only Congress makes laws.", cmod: 0, dept: "the Department of Health and Human Services",
      fx: { health: 5, seniors: 8, parents: 3, workers: 2, biz: -5 } },
    { id: "border", part: 1, icon: "🛂", title: "Send troops to the border", what: "Soldiers help border agents watch the border.", order: "yes", how: "You are commander in chief of the military.", cmod: -6, dept: "the Department of Defense",
      fx: { safe: 4, world: -2, seniors: 5, parents: 3, young: -5, farmers: -3 } },
    { id: "loans", part: 1, icon: "🎓", title: "Cancel student loans", what: "Wipe out up to $10,000 of college debt each.", order: "no", why: "Spending this much takes Congress. (Real life: the Supreme Court blocked a plan like this in 2023.)", cmod: -15, dept: "the Department of Education",
      fx: { future: 5, eco: -2, young: 12, workers: 2, seniors: -4, biz: -3 } },
    { id: "cutrules", part: 1, icon: "📉", title: "Cut rules for businesses", what: "Cheaper to run a business. Less protection.", order: "yes", how: "You run the agencies that write the rules.", cmod: -5, lock: "pollution", dept: "agencies across the government",
      fx: { eco: 4, health: -3, biz: 9, workers: 2, young: -4, parents: -2 } },
    { id: "pollution", part: 1, icon: "🏭", title: "Tougher pollution rules", what: "Cleaner air. Power plants pay more.", order: "yes", how: "You run the agencies that write the rules.", cmod: -5, lock: "cutrules", dept: "the EPA (an agency)",
      fx: { health: 4, eco: -3, young: 8, parents: 3, biz: -7, workers: -3 } },
    { id: "fentanyl", part: 1, icon: "🚔", title: "Longer prison time for selling fentanyl", what: "Tougher punishment for selling the deadly drug fentanyl.", order: "no", why: "Crimes and punishments are set by laws. Only Congress makes federal laws.", cmod: 8, dept: "the Department of Justice",
      fx: { safe: 5, parents: 6, seniors: 6, young: -4 } },
    { id: "wage", part: 1, icon: "💵", title: "Raise the minimum wage", what: "Higher pay for the lowest-paid jobs.", order: "part", why: "An order only raises pay at companies that work for the government. For everyone, you need Congress.", cmod: -10, dept: "the Department of Labor",
      fx: { eco: -1, workers: 9, young: 6, biz: -8 }, partFx: { workers: 3, young: 1, biz: -1 } },
    { id: "roads", part: 1, icon: "🛣️", title: "Fix roads and bridges", what: "Jobs now. Better roads later. It costs a lot.", order: "no", why: "New spending takes Congress. Congress controls the money.", cmod: 12, dept: "the Department of Transportation",
      fx: { eco: 4, future: 2, workers: 6, farmers: 4, biz: 3 } },
    // New on Day 2
    { id: "tariff", part: 2, icon: "🚗", title: "Tax cars made in other countries", what: "A 25% tariff (import tax) on foreign cars.", order: "yes", how: "Old trade laws from Congress let presidents set some tariffs.", cmod: -4, dept: "the Commerce Department",
      fx: { eco: -1, world: -3, workers: 7, biz: -3, farmers: -4, seniors: -1 } },
    { id: "homes", part: 2, icon: "🏠", title: "$10,000 for first-time home buyers", what: "Help young families buy a first house.", order: "no", why: "Handing out new money takes Congress. Congress controls spending.", cmod: -4, dept: "the Department of Housing and Urban Development",
      fx: { future: 2, eco: -1, young: 8, parents: 4, biz: 2, seniors: -3 } },
    // New on Day 3
    { id: "freeze", part: 3, icon: "🧊", title: "Freeze hiring of government workers", what: "No new hires for a year. Saves money, slower service.", order: "yes", how: "You are the boss of the executive branch's workers.", cmod: -5, dept: "the government's hiring agency",
      fx: { eco: 2, future: -2, biz: 5, seniors: -3, young: -2 } },
    { id: "train", part: 3, icon: "🚆", title: "Train from Chicago to Iowa City", what: "A fast passenger train across Iowa. Costs billions.", order: "no", why: "Building it takes new spending. Only Congress can approve the money.", cmod: -6, dept: "the Department of Transportation",
      fx: { future: 3, eco: 1, young: 6, workers: 4, farmers: -2, seniors: -1 } }
  ];
  const IN = Object.fromEntries(IDEAS.map(i => [i.id, i]));

  // ---------------- Votes ----------------
  function chamberVote(sup, houseNeed, senateNeed, tagWord) {
    const house = Math.max(0, Math.min(435, Math.round(435 * sup / 100))), senate = Math.min(100, Math.max(0, Math.round(sup) + rnd(-3, 3)));
    const votes = [];
    if (houseNeed) votes.push({ l: "House", y: house, t: 435, n: houseNeed, tag: houseNeed + " to " + tagWord });
    if (!houseNeed || house >= houseNeed) votes.push({ l: "Senate", y: senate, t: 100, n: senateNeed, tag: senateNeed + " to " + tagWord });
    return { votes, pass: (!houseNeed || house >= houseNeed) && senate >= senateNeed };
  }
  const doneIdeas = kind => IDEAS.filter(i => st.done[i.id] === kind);

  // ---------------- The three parts ----------------
  const PARTS = {
    1: { year: "Year 1", name: "Year 1: Take Charge", day: 1, aid: "gov-u5-d1-run-the-country", title: "Government · Unit 5 · Day 1 · Run the Country: Year 1",
      hook: "You just won the election. Fix the country your way, and keep voters on your side.",
      goal: "Today: learn the president's big jobs, and who can stop you.",
      turns: [
        { id: "gas", month: "Jan", kind: "hot", tag: "Breaking", title: "Gas hits $5 a gallon",
          text: "Truckers, farmers, and workers are getting hit hard. Do something about it.", hot: ["gas", "e15"],
          pike: "Day one, and gas is $5. Let's see what you've got.",
          ignore: { fx: { workers: -4, farmers: -4, eco: -2 }, log: "Did nothing about $5 gas", note: "Gas is still $5, and people noticed." } },
        { id: "dst", month: "Apr", kind: "bill", tag: "Bill from Congress", title: "The Sunshine Protection Act",
          text: "No more changing the clocks. Light later every evening, all year. But winter mornings stay dark until 8:30 at the bus stop.",
          made: "Game event, based on a real bill.", pike: "Even a bill about clocks is a fight in this town.",
          opts: [
            { t: "✍️ Sign it", d: "It becomes law.", go: () => ({ fx: { young: 4, biz: 2, parents: -4 }, hl: "✍️ You signed it. No more changing the clocks.", tone: "good", lesson: "<b>Sign</b> = the bill becomes a law. Signing or vetoing bills is your job as <b>chief legislator</b>.", log: "Signed the Sunshine Protection Act" }) },
            { t: "🚫 Veto it", d: "Say no. Congress can still pass it with 2/3 of the votes.", go: () => {
              const r = chamberVote(Math.max(10, 100 - st.v.congress) * 0.5 + 34 + rnd(-6, 8), 290, 67, "override");
              const lesson = "<b>Veto</b> = the president says no. Congress can <b>override</b> (pass it anyway) with two-thirds of the House and the Senate.";
              if (r.pass) return { fx: { congress: -6, young: 2, parents: -3 }, votes: r.votes, hl: "🚫 You vetoed it. Congress OVERRODE you. It's law anyway.", tone: "bad", lesson, log: "Vetoed the Sunshine Protection Act (overridden)" };
              return { fx: { congress: -6, parents: 4, young: -3 }, votes: r.votes, hl: "🚫 You vetoed it. Congress couldn't get two-thirds. Your veto holds.", tone: "good", lesson, log: "Vetoed the Sunshine Protection Act (veto held)" };
            } }
          ] },
        { id: "pirates", month: "Jul", kind: "crisis", tag: "Emergency", title: "Pirates take a U.S. captain",
          text: "Pirates are holding an American ship captain on a lifeboat near East Africa. A Navy ship is 3 hours away.",
          made: "Game event, based on a real one (2009).", pike: "An American captain is a hostage. What are you waiting for?",
          opts: [
            { t: "⚓ Send the Navy", d: "Your order. No vote.", go: () => {
              const lesson = "<b>Commander in chief</b> = the president leads the military. A rescue needs no vote.";
              return Math.random() < 0.75
                ? { fx: Object.assign(everyone(2), { world: 6, safe: 3, congress: -2 }), hl: "⚓ Navy SEALs rescue the captain.", tone: "good", lesson, log: "Sent the Navy (worked)" }
                : { fx: { world: -3, parents: -2, seniors: -2, congress: -2 }, hl: "⚓ A storm stalls the rescue. The captain gets out days later.", tone: "bad", lesson, log: "Sent the Navy (storm delay)" };
            } },
            { t: "📜 Ask Congress to declare war", d: "Congress votes first.", go: () => ({ fx: Object.assign(everyone(-2), { world: -4 }), hl: "📜 Congress argues for days and won't declare war on pirates. The captain waits.", tone: "bad", lesson: "Only <b>Congress</b> can declare war. It hasn't since World War II.", log: "Asked Congress to declare war (captain waited)" }) },
            { t: "🎤 Demand his release on TV", d: "Talk, no action.", go: () => ({ fx: { world: -3, parents: -1, seniors: -1 }, hl: "🎤 Tough words. The pirates don't care.", tone: "bad", lesson: "Speeches move <b>people</b>, not pirates.", log: "Gave a speech about the pirates" }) }
          ] },
        { id: "wildfire", month: "Oct", kind: "deal", tag: "World leader", title: "Canada offers a wildfire deal",
          text: "Smoke from Canada's fires keeps canceling games across the Midwest. Canada's prime minister offers to share firefighters and planes.",
          made: "Game event.", pike: "Treaties go through my Senate. Good luck getting 67 votes.",
          opts: [
            { t: "🤝 Sign a treaty", d: "Then the Senate votes. You need 67 of 100.", go: () => {
              const r = chamberVote(st.v.congress + 14 + rnd(-6, 8), 0, 67, "approve");
              const lesson = "<b>Chief diplomat</b> = the president makes deals with other countries. A <b>treaty</b> needs two-thirds of the Senate.";
              return r.pass
                ? { fx: { world: 5, health: 3, young: 3, parents: 2, farmers: 1, congress: 1 }, votes: r.votes, hl: "🤝 The Senate approved your treaty. Fire crews start training together.", tone: "good", lesson, log: "Wildfire treaty (Senate approved)" }
                : { fx: { world: -3, young: -1 }, votes: r.votes, hl: "🤝 The Senate voted it down. You needed 67.", tone: "bad", lesson, log: "Wildfire treaty (Senate said no)" };
            } },
            { t: "🚫 Skip the deal", d: "No vote needed. Canada goes home.", go: () => ({ fx: { world: -3, biz: 1, young: -2 }, hl: "🚫 No deal. Canada's prime minister flies home.", tone: "bad", lesson: "<b>Chief diplomat</b> = the president leads talks with other countries. A <b>treaty</b> needs two-thirds of the Senate.", log: "Skipped the wildfire deal" }) }
          ] }
      ],
      prompt: { short: "One move and why it worked or got blocked",
        label: "Pick ONE move you made. Which power did you use? Why did it work, or why was it blocked?",
        stem: "I tried to ___ by using ___. It ___ because ___.",
        words: ["order", "orders", "executive", "congress", "law", "laws", "veto", "vetoed", "sign", "signed", "navy", "military", "commander", "speech", "judge", "court", "courts", "war", "treaty", "senate"],
        mustMsg: "Name the power you used AND say why it worked or got blocked (use “because”)." },
      next: "Next class: Year 2. How far can a president push?" },

    2: { year: "Year 2", name: "Year 2: How Far Can You Push?", day: 2, aid: "gov-u5-d2-run-the-country", title: "Government · Unit 5 · Day 2 · Run the Country: Year 2",
      hook: "Some of your powers are written in the Constitution. Some aren't. Find out how far each one goes.",
      goal: "Today: written powers vs. unwritten powers, and what can stop each one.",
      turns: [
        { id: "oldorder", month: "Jan", kind: "event", tag: "Found in your desk", title: "The last president's order",
          text: "The last president signed an executive order: no new oil and gas drilling on government land. One signature from you cancels it.",
          made: "Based on real orders from 2021 and 2025.", pike: "Whatever you do, I'll say you got it wrong.",
          opts: [
            { t: "✒️ Cancel it", d: "More drilling. More jobs. More pollution.", go: () => ({ fx: { eco: 3, health: -2, biz: 5, farmers: 2, workers: 2, young: -6 }, hl: "✒️ One signature, and the old order is gone. Drilling starts back up.", tone: "good", lesson: "An <b>executive order</b> isn't written in the Constitution. It lasts only until a president cancels it. A <b>law</b> can't be cancelled that way.", log: "Cancelled the last president's drilling order" }) },
            { t: "📂 Keep it", d: "Cleaner land. Fewer drilling jobs.", go: () => ({ fx: { health: 1, young: 3, parents: 1, biz: -3, workers: -1 }, hl: "📂 You kept the old order. Drilling stays paused.", tone: "good", lesson: "An <b>executive order</b> isn't written in the Constitution. It lasts only until a president cancels it. A <b>law</b> can't be cancelled that way.", log: "Kept the last president's drilling order" }) }
          ] },
        { id: "mexico", month: "Apr", kind: "deal", tag: "World leader", title: "Mexico offers a fentanyl deal",
          text: "Mexico will send troops after fentanyl smugglers if the U.S. sends drug-scanning machines for the border.",
          made: "Game event.", pike: "A treaty needs my Senate. A quick handshake is weak.",
          opts: [
            { t: "📜 Make it a treaty", d: "Written power. The Senate votes. You need 67.", go: () => {
              const r = chamberVote(st.v.congress + 12 + rnd(-6, 8), 0, 67, "approve");
              const lesson = "A <b>treaty</b> is a written power in the Constitution. It needs two-thirds of the Senate, but it lasts.";
              return r.pass
                ? { fx: { safe: 5, world: 3, parents: 4, seniors: 3, congress: 1 }, votes: r.votes, hl: "📜 The Senate approved the treaty. It's locked in.", tone: "good", lesson, log: "Fentanyl deal as a treaty (Senate approved)" }
                : { fx: { world: -2, parents: -1 }, votes: r.votes, hl: "📜 The Senate voted it down. No deal.", tone: "bad", lesson, log: "Fentanyl deal as a treaty (Senate said no)" };
            } },
            { t: "🤝 Executive agreement", d: "Unwritten power. No vote. The next president can drop it.", go: () => ({ fx: { safe: 3, world: 2, parents: 3, seniors: 2, congress: -2 }, hl: "🤝 You and Mexico's president shake hands. The deal starts now.", tone: "good", lesson: "An <b>executive agreement</b> is a deal with another country that skips the Senate. It isn't written in the Constitution. It's fast, but the next president can drop it.", log: "Fentanyl deal as an executive agreement" }) },
            { t: "🚫 No deal", d: "Nothing changes.", go: () => ({ fx: { safe: -2, parents: -2, seniors: -1 }, hl: "🚫 No deal. The smuggling goes on.", tone: "bad", lesson: "As <b>chief diplomat</b>, the president picks how to make a deal: a treaty (Senate votes) or an executive agreement (no vote).", log: "Said no to the fentanyl deal" }) }
          ] },
        { id: "pipeline", month: "Jul", kind: "crisis", tag: "Emergency", title: "Hackers shut down a gas pipeline",
          text: "A huge fuel pipeline is down. Gas stations in 10 states are running dry, and people are panic-buying.",
          made: "Game event, based on a real one (2021).", pike: "Gas lines around the block. This is on you.",
          start: () => courtReview(),
          opts: [
            { t: "🚨 Declare an emergency", d: "No vote. Fuel trucks can drive longer hours.", go: () => ({ fx: { eco: 2, safe: 2, workers: 2, biz: 2, congress: -1 }, hl: "🚨 Emergency declared. Extra fuel trucks hit the road. Gas comes back in days.", tone: "good", lesson: "<b>Emergency powers</b> come from laws Congress passed. Congress can vote to end an emergency.", log: "Declared an emergency for the pipeline" }) },
            { t: "🎤 Go on TV: don't panic-buy", d: "Unwritten power. Calm people down.", go: () => ({ fx: Object.assign(everyone(1), { eco: 1 }), hl: "🎤 You tell people to stop hoarding gas. The lines get shorter.", tone: "good", lesson: "A <b>speech</b> is an unwritten power. Real life: in 2021, panic buying made a pipeline shutdown worse, and leaders asked people not to hoard gas.", log: "Speech: don't panic-buy gas" }) },
            { t: "📜 Ask Congress for help", d: "Wait for a vote.", go: () => ({ fx: { eco: -3, workers: -2, farmers: -2, biz: -1 }, hl: "📜 Congress is still arguing a week later. Gas stations stay empty.", tone: "bad", lesson: "Congress moves slowly on purpose. In a crisis, that costs time.", log: "Asked Congress for pipeline help (slow)" }) }
          ] },
        { id: "midterms", month: "Nov", kind: "event", tag: "Election", title: "Midterm elections",
          text: "Halfway through your term, every House seat and about a third of the Senate are up for a vote. Your approval decides how your party does.",
          pike: "This is where voters get even with you.",
          opts: [
            { t: "🎤 Campaign for your party", d: "Unwritten power: party leader. Big win or big loss.", go: () => midterm(true) },
            { t: "🏛️ Stay in D.C. and work", d: "Play it safe.", go: () => midterm(false) }
          ] }
      ],
      prompt: { short: "An unwritten power and why it worked or what limited it",
        label: "Pick ONE power you used that is NOT written in the Constitution (an executive order, an executive agreement, a speech, or emergency power). Why did it work, or what limited it?",
        stem: "I used ___. It is not written in the Constitution, but it ___ because ___.",
        words: ["order", "orders", "executive", "agreement", "agreements", "speech", "speeches", "emergency", "deal", "tariff", "tariffs", "campaign", "campaigned", "tv"],
        mustMsg: "Name the unwritten power you used (like an order, agreement, speech, or emergency) AND say why (use “because”)." },
      next: "Next class: Years 3 and 4. Run the machine, then face the voters." },

    3: { year: "Years 3–4", name: "Years 3–4: Run the Machine", day: 3, aid: "gov-u5-d3-run-the-country", title: "Government · Unit 5 · Day 3 · Run the Country: Years 3–4",
      hook: "You can't run the country alone. Millions of government workers do the job. Lead them, then face the voters.",
      goal: "Today: the Cabinet, departments, and agencies that do the work.",
      turns: [
        { id: "cabinet", month: "Y3 Mar", kind: "event", tag: "Your Cabinet", title: "Your Homeland Security boss quits",
          text: "The Department of Homeland Security guards the border and runs FEMA, the disaster agency. Pick a new Secretary. The Senate must confirm.",
          made: "Game event. The people are made up.", pike: "My senators will grill whoever you pick.",
          opts: [
            { t: "🎓 Dana Brooks", d: "Ran FEMA for 10 years. Both parties respect her.", go: () => pickSecretary(true) },
            { t: "🤝 Chris Vega", d: "Your loyal campaign boss. Never ran an agency.", go: () => pickSecretary(false) }
          ] },
        { id: "hurricane", month: "Y3 Sep", kind: "crisis", tag: "Emergency", title: "A hurricane hits Florida",
          text: "A Category 4 storm floods towns along the coast. Thousands of families have no power or clean water.",
          made: "Game event.", pike: "People are on their roofs. What are you doing?",
          opts: [
            { t: "🚨 Declare a major disaster", d: "One signature sends FEMA in with money and crews.", go: () => hurricaneFema() },
            { t: "🎤 Fly there and give a speech", d: "Show you care.", go: () => ({ fx: { seniors: -3, parents: -2, health: -2 }, hl: "🎤 Your speech is on every channel. But no help arrives for days.", tone: "bad", lesson: "Showing up helps people feel heard. But <b>FEMA</b>, an agency in the Department of Homeland Security, brings the help.", log: "Gave a speech in Florida (no help sent)" }) },
            { t: "📜 Wait for Congress", d: "Ask for a relief bill first.", go: () => ({ fx: { health: -3, seniors: -4, parents: -2, farmers: -1 }, hl: "📜 Congress debates for two weeks. Families wait for help.", tone: "bad", lesson: "Congress controls the money. But a law Congress passed lets the president <b>declare a disaster</b> and send FEMA right away.", log: "Waited for Congress on the hurricane" }) }
          ] },
        { id: "stuck", month: "Y4 Mar", kind: "event", tag: "The bureaucracy", title: "Your plan is stuck",
          made: "Game event.", pike: "Can't even get your own government to listen. Weak.",
          textFn: () => `The agency in charge of “${stuckIdea().title}” says it needs a whole year to write the rules. Thousands of workers have to follow them.`,
          opts: [
            { t: "📞 Push the agency head", d: "Call a meeting. Demand it faster.", go: () => Math.random() < 0.6
                ? { fx: { eco: 1, workers: 2, biz: 1 }, hl: "📞 After a tough meeting, the agency speeds up. Rules are out in 3 months.", tone: "good", lesson: "The <b>bureaucracy</b> = the millions of workers in departments and agencies who carry out the laws. The president is their boss, but can't do their jobs alone.", log: "Pushed the agency (sped up)" }
                : { fx: { workers: -1, biz: -1 }, hl: "📞 The agency says the rules take time. Nothing changes.", tone: "bad", lesson: "The <b>bureaucracy</b> = the millions of workers in departments and agencies who carry out the laws. They follow rules that take time.", log: "Pushed the agency (still slow)" } },
            { t: "🔥 Fire the agency head", d: "Pick someone faster. Congress won't like it.", go: () => ({ fx: { congress: -4, eco: 2, biz: 2, workers: 1, young: -1 }, hl: "🔥 You fire the agency head. The new boss moves fast. Congress calls it a power grab.", tone: "good", lesson: "Presidents can fire most of the officials they appoint. That's how they control the <b>bureaucracy</b>, but it angers Congress.", log: "Fired the agency head" }) },
            { t: "⏳ Let them do it right", d: "Slow, but careful.", go: () => ({ fx: { eco: -1, workers: -1, congress: 2 }, hl: "⏳ The rules take a year, but they hold up in court.", tone: "good", lesson: "Agencies write detailed <b>rules</b> to carry out laws and orders. Careful rules are harder for courts to throw out.", log: "Let the agency take its time" }) }
          ] },
        { id: "debate", month: "Y4 Sep", kind: "event", tag: "Election year", title: "The big debate: you vs. Pike",
          text: "Senator Pike is running against you. Millions are watching. What do you talk about?",
          pike: "Four years. What do you have to show for it?",
          opts: [
            { t: "📜 The laws I passed", d: "Laws last. Each one helps.", go: () => { const n = doneIdeas("law").length; return { fx: everyone(n ? Math.min(3, n) : -1), hl: n ? `📜 You list ${n} law${n > 1 ? "s" : ""} you got through Congress. The crowd cheers.` : "📜 You don't have any laws to brag about. Awkward.", tone: n ? "good" : "bad", lesson: "Laws need Congress, but they last. The next president can't erase them alone.", log: `Debate: talked about laws (${n})` }; } },
            { t: "✒️ My fast action", d: "Orders and crisis moves.", go: () => { const n = doneIdeas("order").length; return { fx: everyone(n ? Math.min(3, n) : -1), hl: n ? `✒️ You talk about the ${n} order${n > 1 ? "s" : ""} you signed. Fans love how fast you move.` : "✒️ You didn't sign many orders. It falls flat.", tone: n ? "good" : "bad", lesson: "Orders are fast, but Pike promises to cancel them on his first day. He could.", log: `Debate: talked about orders (${n})` }; } },
            { t: "🥊 Attack Pike", d: "Risky. Could go either way.", go: () => { const k = rnd(-3, 4); return { fx: everyone(k), hl: k >= 0 ? "🥊 Your best line goes viral. Pike looks rattled." : "🥊 It looks mean. Voters don't like it.", tone: k >= 0 ? "good" : "bad", lesson: "Presidents can serve two terms (the 22nd Amendment). Your first term is your job interview for a second one.", log: k >= 0 ? "Debate: attacked Pike (worked)" : "Debate: attacked Pike (backfired)" }; } }
          ] }
      ],
      prompt: { short: "A department or agency and why a president needs it",
        label: "Pick ONE department or agency from your presidency. What job did it do for you? Why can't a president do that job alone?",
        stem: "The ___ did ___ for me. A president needs it because ___.",
        words: ["department", "departments", "agency", "agencies", "fema", "epa", "cabinet", "secretary", "homeland", "transportation", "defense", "justice", "labor", "treasury", "education", "commerce", "bureaucracy", "workers", "military"],
        mustMsg: "Name a department or agency (like FEMA or Homeland Security) AND say why a president needs it (use “because”)." },
      next: "" }
  };
  const P = PARTS[PART];
  const TURNS = P.turns.length;

  // ---------------- State: one presidency, shared by all three days ----------------
  const freshTerm = () => ({ name: "", v: Object.assign({}, START), done: {}, spoke: {}, blocked: {}, failed: {}, seen: {}, sec: null, parts: {} });
  const freshPart = () => ({ screen: -1, pow: POWER, ev: {}, sel: null, news: null, log: [], writing: "", turnedIn: false, hidden: [], missed: false, base: null });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || !st.v || !st.parts) st = freshTerm();
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const short = window.classShortName || (x => x);
    if (st.name && raw && short(raw).trim().toLowerCase() !== short(st.name).trim().toLowerCase()) { st = freshTerm(); localStorage.removeItem(KEY); }
  } catch (e) {}
  if (!st.parts[PART]) st.parts[PART] = freshPart();
  let pt = st.parts[PART];
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const first = () => String(st.name || "").split(" ")[0] || "";
  const approval = () => Math.round(GROUPS.reduce((s, g) => s + st.v[g.id] * g.share, 0) / 100);
  let hits = {};

  // Start today's part: carry the country over (or a steady country for a missed day), and ease the numbers toward the middle.
  function beginPart() {
    const prev = PART > 1 && st.parts[PART - 1];
    pt.missed = PART > 1 && !(prev && prev.screen >= 0);
    if (pt.missed) { const keep = { name: st.name, parts: st.parts }; st = Object.assign(freshTerm(), keep); }
    Object.keys(START).forEach(k => { st.v[k] = cl(50 + ((st.v[k] == null ? START[k] : st.v[k]) - 50) * 0.6); });
    pt.hidden = IDEAS.filter(i => i.part < PART && (st.done[i.id] === "law" || st.done[i.id] === "order" || st.done[i.lock])).map(i => i.id);
    pt.screen = 0; pt.pow = POWER;
    pt.base = JSON.parse(JSON.stringify({ v: st.v, done: st.done, spoke: st.spoke, blocked: st.blocked, failed: st.failed, seen: st.seen, sec: st.sec }));
    pt.news = { hl: pt.missed ? "📋 You missed a day. Your Vice President kept things steady. Here's your country." : (PART > 1 ? "📅 " + P.year + " begins. Your country picks up where you left off." : "📺 Pick an idea on the right. Then pick HOW to do it."),
      tone: "", lesson: "Each turn you get <b>3 ⚡ power</b>. Spend it, then press <b>End " + esc(P.turns[0].month) + "</b>." };
  }

  function apply(fx) {
    const before = Object.assign({}, st.v), a0 = approval();
    Object.keys(fx || {}).forEach(k => { st.v[k] = cl((st.v[k] == null ? 50 : st.v[k]) + fx[k]); });
    hits = {};
    Object.keys(st.v).forEach(k => { const d = st.v[k] - before[k]; if (d) hits[k] = d; });
    hits._a = approval() - a0;
  }
  function addLog(t) { pt.log.push(P.turns[Math.min(pt.screen, TURNS - 1)].month + ": " + t); }
  const deptLine = idea => PART >= 3 ? " 🏢 Who does the work: " + idea.dept + "." : "";

  // ---------------- Special events ----------------
  function courtReview() {
    const mine = IDEAS.filter(i => st.done[i.id] === "order" && i.order === "yes");
    if (!mine.length) return null;
    const idea = mine[Math.floor(Math.random() * mine.length)];
    const lesson = "Courts can check the president. An order has to fit the Constitution or a law Congress passed.";
    if (Math.random() < 0.7) return { hl: "⚖️ A court looked at your order “" + idea.title + ".” Ruling: it's legal. It stays.", tone: "good", lesson };
    const undo = {}; Object.keys(idea.fx).forEach(k => { undo[k] = -Math.round(idea.fx[k] / 2); });
    apply(undo); st.done[idea.id] = null;
    pt.log.push(P.turns[pt.screen].month + ": A court struck down your order: " + idea.title);
    return { hl: "⚖️ A court STRUCK DOWN your order “" + idea.title + ".” The judge says the agency skipped steps.", tone: "bad", lesson };
  }
  function midterm(campaign) {
    const a = approval();
    let swing = Math.round((a - 52) * 0.9 + (campaign ? (a >= 50 ? 3 : -3) : 0) + rnd(-3, 3));
    swing = Math.max(-12, Math.min(12, swing));
    const lesson = "<b>Midterms</b> come halfway through a president's term. The president's party usually loses seats in Congress.";
    const log = (campaign ? "Campaigned in the midterms" : "Stayed in D.C. for the midterms") + (swing >= 0 ? " (party gained)" : " (party lost seats)");
    return swing >= 0
      ? { fx: { congress: swing + 2 }, hl: "🗳️ Your party GAINED seats. Congress backs you more.", tone: "good", lesson, log }
      : { fx: { congress: swing - 2 }, hl: "🗳️ Your party LOST seats. Congress is harder to win now.", tone: "bad", lesson, log };
  }
  function pickSecretary(expert) {
    const r = chamberVote(st.v.congress + (expert ? 14 : -4) + rnd(-6, 6), 0, 51, "confirm");
    const lesson = "The <b>Cabinet</b> = the heads of the 15 executive departments. The president picks them. The Senate must <b>confirm</b> them.";
    const who = expert ? "Dana Brooks" : "Chris Vega";
    if (r.pass) { st.sec = expert ? "expert" : "loyal"; return { fx: expert ? { safe: 2, congress: 1 } : { congress: -2, young: 1, biz: 1 }, votes: r.votes, hl: "✅ The Senate confirmed " + who + " as Secretary of Homeland Security.", tone: "good", lesson, log: "Picked " + who + " for Homeland Security (confirmed)" }; }
    st.sec = "none";
    return { fx: { safe: -2, congress: -1 }, votes: r.votes, hl: "❌ The Senate rejected " + who + ". The job sits empty.", tone: "bad", lesson, log: "Picked " + who + " for Homeland Security (rejected)" };
  }
  function hurricaneFema() {
    const lesson = "The president <b>declares a disaster</b>. <b>FEMA</b>, an agency in the Department of Homeland Security, does the work on the ground.";
    if (st.sec === "expert") return { fx: Object.assign(everyone(1), { health: 3, safe: 3, seniors: 6, parents: 4 }), hl: "🚨 Disaster declared. Your FEMA expert has crews there in a day.", tone: "good", lesson: lesson + " Your experienced Secretary made it faster.", log: "Declared a disaster (FEMA fast, expert in charge)" };
    if (st.sec === "none") return { fx: { health: 1, seniors: 1 }, hl: "🚨 Disaster declared. But nobody is running Homeland Security, so FEMA is slow and confused.", tone: "bad", lesson: lesson + " An empty Cabinet job slowed it down.", log: "Declared a disaster (FEMA slow, no Secretary)" };
    return { fx: { health: 2, safe: 2, seniors: 3, parents: 2 }, hl: "🚨 Disaster declared. FEMA arrives, but your new Secretary is still learning the job.", tone: "good", lesson, log: "Declared a disaster (FEMA arrived)" };
  }
  function stuckIdea() {
    const mine = IDEAS.filter(i => st.done[i.id] === "law" || st.done[i.id] === "order");
    return mine.length ? mine[mine.length - 1] : { title: "Faster passport lines" };
  }

  // ---------------- Doing an idea ----------------
  function useTool(id, tool) {
    const idea = IN[id], cost = tool === "cong" ? 2 : 1;
    if (!idea || pt.pow < cost || st.done[id] === "law" || st.done[id] === "order") return;
    if (tool === "speech" && st.spoke[id]) return;
    if (tool === "order" && ((st.blocked[id] && idea.order === "no") || st.done[id] === "part")) return;
    pt.pow -= cost;
    const n = { votes: null };
    if (tool === "order") {
      if (idea.order === "yes") {
        apply(Object.assign({}, idea.fx, { congress: (idea.fx.congress || 0) - 3 }));
        st.done[id] = "order";
        n.hl = "✒️ You signed an order: " + idea.title + "."; n.tone = "good";
        n.lesson = (st.seen.order ? idea.how + " <b>Heads up:</b> the next president can cancel an order." : "<b>Executive order</b> = as <b>chief executive</b>, you tell the executive branch (government workers, the military) what to do. No vote needed, but Congress doesn't like being skipped. " + idea.how) + deptLine(idea);
        addLog("Order: " + idea.title + " (worked)");
      } else if (idea.order === "part") {
        apply(idea.partFx); st.done[id] = "part";
        n.hl = "✒️ Order signed, but only a small version happened."; n.tone = "bad";
        n.lesson = idea.why; addLog("Order: " + idea.title + " (small version only)");
      } else {
        apply(Object.assign(everyone(-1), { congress: -3 }));
        st.blocked[id] = (st.blocked[id] || 0) + 1;
        n.hl = "⚖️ BLOCKED. A judge stopped your order."; n.tone = "bad";
        n.lesson = "<b>Why:</b> " + idea.why; n.pike = "Ha! You can't just sign your way around Congress."; pt.sel = null;
        addLog("Order: " + idea.title + " (BLOCKED by a judge)");
      }
      st.seen.order = true;
    } else if (tool === "cong") {
      const r = chamberVote(st.v.congress + idea.cmod + (st.spoke[id] ? 12 : 0) + rnd(-8, 8), 218, 51, "pass");
      n.votes = r.votes;
      if (r.pass) {
        const fx = Object.assign({}, idea.fx, { congress: 2 });
        if (st.done[id] === "part") Object.keys(idea.partFx).forEach(k => { fx[k] = (fx[k] || 0) - idea.partFx[k]; });
        apply(fx); st.done[id] = "law";
        n.hl = "📜 Congress passed it. " + idea.title + " is now law!"; n.tone = "good";
        n.lesson = (st.seen.law ? "A <b>law</b> lasts. The next president can't cancel it alone." : "Congress <b>makes laws</b>. The president signs them. A law lasts. The next president can't cancel it alone.") + deptLine(idea);
        st.seen.law = true; addLog("Asked Congress: " + idea.title + " (PASSED)");
      } else {
        hits = {}; st.failed[id] = (st.failed[id] || 0) + 1;
        n.hl = "📜 Congress voted it down."; n.tone = "bad";
        n.lesson = st.spoke[id] ? "Not enough votes. Try again later, or pick an idea Congress likes more." : "Tip: give a <b>speech</b> first. It wins votes in Congress.";
        n.pike = "My people in Congress said no. Get used to it."; pt.sel = null;
        addLog("Asked Congress: " + idea.title + " (voted down)");
      }
    } else {
      const fx = { congress: 1 };
      GROUPS.forEach(g => { if ((idea.fx[g.id] || 0) > 0) fx[g.id] = 2; });
      apply(fx); st.spoke[id] = true;
      n.hl = "🎤 You went on TV for: " + idea.title + "."; n.tone = "good";
      n.lesson = st.seen.speech ? "Your next Congress vote on this will be easier." : (PART >= 2 ? "A speech is an <b>unwritten power</b>: it's not in the Constitution, but it wins people over and helps the next vote in Congress." : "Presidents can't make laws, but they can win people over. That helps the next vote in Congress.");
      st.seen.speech = true; addLog("Speech: " + idea.title);
    }
    pt.news = n; save(); render();
  }

  function doEvent(i) {
    const m = P.turns[pt.screen];
    if (!m || pt.ev[m.id]) return;
    const r = m.opts[i].go();
    apply(r.fx);
    pt.ev[m.id] = { pick: i, log: r.log };
    pt.news = { hl: r.hl, tone: r.tone, lesson: r.lesson, votes: r.votes || null };
    addLog(r.log);
    save(); render();
  }
  const eventDone = m => m.kind === "hot" || !!pt.ev[m.id];

  function endTurn() {
    const m = P.turns[pt.screen];
    if (!m || !eventDone(m)) return;
    const fx = {};
    let note = "";
    if (m.kind === "hot" && m.ignore && !m.hot.some(h => st.done[h] === "law" || st.done[h] === "order")) { Object.assign(fx, m.ignore.fx); addLog(m.ignore.log); note = m.ignore.note; }
    // The country's dials push on the voters who care about them.
    GROUPS.forEach(g => { fx[g.id] = (fx[g.id] || 0) + g.cares.reduce((s, d) => s + Math.round((st.v[d] - 50) / 6), 0); });
    apply(fx);
    pt.screen++; pt.pow = POWER; pt.sel = null;
    const nxt = P.turns[pt.screen];
    if (nxt) {
      pt.news = { hl: "📅 " + nxt.month + ". New problems. Voters like you: " + approval() + "%.", tone: "", lesson: note };
      if (nxt.start) { const s = nxt.start(); if (s) pt.news = s; }
    } else pt.news = null;
    save(); render();
  }

  // ---------------- Drawing ----------------
  const hue = v => "hsl(" + Math.round(Math.max(0, Math.min(100, v)) * 1.2) + ",70%,42%)";
  const face = v => v >= 65 ? "😄" : v >= 55 ? "🙂" : v >= 45 ? "😐" : v >= 35 ? "🙁" : "😠";
  const sign = d => (d > 0 ? "+" : "−") + Math.abs(d);
  function chip(key) {
    if (hits[key]) return `<span class="chip hit ${hits[key] > 0 ? "up" : "down"}">${sign(hits[key])}</span>`;
    const idea = pt.sel && IN[pt.sel];
    if (idea && !(st.done[idea.id] === "law" || st.done[idea.id] === "order") && idea.fx[key]) return `<span class="chip pv ${idea.fx[key] > 0 ? "up" : "down"}" title="If it happens">${sign(idea.fx[key])}</span>`;
    return "";
  }

  function topBar() {
    const a = approval(), m = P.turns[pt.screen], ready = eventDone(m);
    return `<header class="top">
      <div class="who"><small>${esc(P.year)} · Part ${PART} of 3</small>🇺🇸 President ${esc(first())}</div>
      <div class="months" aria-label="Turn ${pt.screen + 1} of ${TURNS}">${P.turns.map((x, i) => `<span class="${i < pt.screen ? "past" : i === pt.screen ? "now" : ""}">${esc(x.month)}</span>`).join("")}</div>
      <div class="pow" title="Power left this turn">⚡ ${Array.from({ length: POWER }, (_, i) => `<i class="${i < pt.pow ? "on" : ""}">${i < pt.pow ? "⚡" : ""}</i>`).join("")}</div>
      <div class="appr"><span>Voters<br>like you</span><b>${a}%</b>${hits._a ? `<span class="chip hit ${hits._a > 0 ? "up" : "down"}" style="position:static">${sign(hits._a)}</span>` : ""}</div>
      <span class="rtslot" aria-hidden="true"></span>
      <button type="button" class="endbtn${ready && pt.pow === 0 ? " ready" : ""}" id="endBtn" ${ready ? "" : "disabled"} title="${ready ? "" : "Handle the event first"}">${pt.screen === TURNS - 1 ? "Finish ▶" : "End " + esc(m.month) + " ▶"}</button>
    </header>`;
  }

  function left() {
    const m = P.turns[pt.screen];
    return `<div class="col l">
      <section class="panel"><p class="ph">Your country</p>
        ${DIALS.map(d => `<div class="dial"><span class="ic" aria-hidden="true">${d.icon}</span><div><span class="nm">${d.name}</span><div class="bar"><span style="width:${st.v[d.id]}%;background:${hue(st.v[d.id])}"></span></div></div><b>${st.v[d.id]}</b>${chip(d.id)}</div>`).join("")}
      </section>
      <section class="panel" style="position:relative"><div class="cong"><span class="ic" aria-hidden="true">🏛️</span><div><p class="nm">Congress backs you</p><p class="sub">Higher = laws pass easier</p></div><b>${st.v.congress}%</b></div>${chip("congress").replace('class="chip', 'style="top:-8px;right:6px" class="chip')}</section>
      <section class="panel rival"><span class="face" aria-hidden="true">🎙️</span><div class="say"><b>Sen. Pike · your rival</b>“${esc((pt.news && pt.news.pike) || m.pike)}”</div></section>
    </div>`;
  }

  function center() {
    const m = P.turns[pt.screen], done = eventDone(m) && m.kind !== "hot";
    const text = m.textFn ? m.textFn() : m.text;
    let opts = "";
    if (m.kind === "hot") opts = `<p class="hotnote">🔥 Use your ideas → (look for the fire)</p>`;
    else if (!pt.ev[m.id]) opts = `<div class="eopts">${m.opts.map((o, i) => `<button type="button" class="eopt" data-e="${i}">${esc(o.t)}<small>${esc(o.d)}</small></button>`).join("")}</div>`;
    else opts = `<p class="hotnote" style="color:var(--good)">✓ ${esc(pt.ev[m.id].log)}</p>`;
    const n = pt.news;
    const votes = n && n.votes ? `<div class="votes">${n.votes.map(v => `<span>${v.l}</span><span class="vbar"><span data-w="${Math.round(v.y / v.t * 100)}"></span><i style="left:${v.n / v.t * 100}%" title="${v.tag}"></i></span><span>${v.y} of ${v.t} · ${v.tag}</span>`).join("")}</div>` : "";
    const kind = m.kind === "crisis" || m.kind === "hot" ? "" : "bill";
    return `<div class="col c">
      <section class="panel event ${kind} ${done ? "done" : ""}"><span class="tag">${esc(m.tag)}</span><h2>${esc(m.title)}</h2>
        <p class="t">${esc(text)}</p>${m.made ? `<p class="made">${esc(m.made)}</p>` : ""}${opts}</section>
      <section class="panel voters"><p class="ph"><span>Voters</span><span>size = share of voters</span></p>
        <div class="vgrid">${GROUPS.map(g => `<div class="vb${hits[g.id] < 0 ? " mad" : ""}"><span class="share">${g.share}%</span><span class="ring" style="--h:${hue(st.v[g.id])}" aria-hidden="true">${g.icon}</span><span class="gn">${g.name}</span><span class="gp">${face(st.v[g.id])} <b>${st.v[g.id]}%</b> happy</span>${chip(g.id)}</div>`).join("")}</div>
      </section>
      <section class="panel news">${n ? `<p class="hl ${n.tone || ""}">${esc(n.hl)}</p>${votes}${n.lesson ? `<p class="lesson">💡 ${n.lesson}</p>` : ""}` : ""}</section>
    </div>`;
  }

  function stateTag(id) {
    const d = st.done[id];
    if (d === "law") return ["law", "Law"];
    if (d === "order") return ["order", "Order"];
    if (d === "part") return ["part", "Small order"];
    if (st.done[IN[id].lock]) return ["locked", "You chose the other one"];
    if (st.blocked[id] && !st.failed[id]) return ["blocked", "Blocked"];
    if (st.failed[id]) return ["failed", "Voted down"];
    if (st.spoke[id]) return ["spoke", "Speech"];
    return ["", ""];
  }
  function visibleIdeas() {
    const avail = IDEAS.filter(i => i.part <= PART && !pt.hidden.includes(i.id));
    const fresh = avail.filter(i => PART > 1 && i.part === PART);
    return fresh.concat(avail.filter(i => !fresh.includes(i))).slice(0, 10);
  }

  function right() {
    const m = P.turns[pt.screen];
    const shown = visibleIdeas();
    const tiles = shown.map(i => {
      const [cls, tag] = stateTag(i.id);
      const hot = m.kind === "hot" && m.hot.includes(i.id) && !st.done[i.id];
      const isNew = PART > 1 && i.part === PART;
      return `<button type="button" class="idea ${cls}${pt.sel === i.id ? " sel" : ""}${hot ? " hot" : ""}" data-i="${i.id}" ${cls === "locked" ? "disabled" : ""}><span class="ii" aria-hidden="true">${i.icon}</span><span>${esc(i.title)}</span>${tag ? `<span class="st">${tag}</span>` : isNew ? `<span class="st nw">New</span>` : ""}</button>`;
    }).join("");
    let pick;
    const idea = pt.sel && IN[pt.sel];
    if (!idea) pick = `<div class="empty"><div><b>👈 Pick an idea</b>You'll see who loves it and who hates it.</div></div>`;
    else {
      const loves = GROUPS.filter(g => (idea.fx[g.id] || 0) > 0).map(g => g.icon).join(" ");
      const hates = GROUPS.filter(g => (idea.fx[g.id] || 0) < 0).map(g => g.icon).join(" ");
      const finished = st.done[idea.id] === "law" || st.done[idea.id] === "order";
      const orderOff = finished || pt.pow < 1 || (st.blocked[idea.id] && idea.order === "no") || st.done[idea.id] === "part";
      const msg = finished ? (st.done[idea.id] === "law" ? "✅ This is law now." : "✒️ Done by your order.") : st.blocked[idea.id] && idea.order === "no" ? "⚖️ A judge already said no. Try Congress." : pt.pow === 0 ? (eventDone(m) ? "⚡ Out of power. End the turn." : "⚡ Out of power. Handle the event first ⬆") : "";
      const w = PART >= 2;   // Day 2 on: written vs. unwritten powers
      pick = `<h3>${idea.icon} ${esc(idea.title)}</h3><p class="what">${esc(idea.what)}</p>
        <p class="lh"><span>❤️ Loves it: ${loves || "nobody"}</span><span>💢 Hates it: ${hates || "nobody"}</span>${PART >= 3 ? `<span>🏢 ${esc(idea.dept)}</span>` : ""}</p>
        <div class="tools">
          <button type="button" class="tool order" data-t="order" ${orderOff ? "disabled" : ""}><span class="tt">✒️ Sign an order</span><span class="td">${w ? "Unwritten power. Bosses government workers and the military." : "Tells government workers and the military what to do"}</span><span class="tc">1 ⚡</span></button>
          <button type="button" class="tool cong" data-t="cong" ${(finished || pt.pow < 2) ? "disabled" : ""}><span class="tt">📜 Ask Congress</span><span class="td">${w ? "Written power: suggest laws. Needed for taxes and spending." : "For new laws, taxes, and spending"}</span><span class="tc">2 ⚡</span></button>
          <button type="button" class="tool" data-t="speech" ${(finished || st.spoke[idea.id] || pt.pow < 1) ? "disabled" : ""}><span class="tt">🎤 Give a speech</span><span class="td">${w ? "Unwritten power. Wins people over." : "Wins people over. Makes no rules."}</span><span class="tc">1 ⚡</span></button>
        </div><p class="msg">${msg}</p>`;
    }
    return `<div class="col r">
      <section class="panel"><p class="ph"><span>Your ideas</span><span>${pt.hidden.length ? "✅ " + pt.hidden.length + " done earlier" : shown.length + " to pick from"}</span></p><div class="ideas">${tiles}</div></section>
      <section class="panel pick">${pick}</section>
    </div>`;
  }

  function board() {
    document.body.classList.add("part" + PART);
    app.innerHTML = `<div class="game">${topBar()}<main class="board">${left()}${center()}${right()}</main></div>
      <button type="button" class="restart" id="restartBtn">Start over</button>`;
    app.querySelectorAll(".idea").forEach(b => b.onclick = () => { pt.sel = b.dataset.i; hits = {}; save(); render(); });
    app.querySelectorAll(".tool").forEach(b => b.onclick = () => useTool(pt.sel, b.dataset.t));
    app.querySelectorAll(".eopt").forEach(b => b.onclick = () => doEvent(+b.dataset.e));
    $("endBtn").onclick = endTurn;
    $("restartBtn").onclick = restart;
    requestAnimationFrame(() => requestAnimationFrame(() => app.querySelectorAll(".vbar span[data-w]").forEach(s => { s.style.width = s.dataset.w + "%"; })));
    setTimeout(() => { hits = {}; }, 50);
    placeReadAloud();
  }
  // Keep the shared "Read to me" button inside the top bar (below the shared "Working as" line, if it's there).
  function placeReadAloud() {
    const nb = document.getElementById("siteNotYou");
    const h = nb && !nb.classList.contains("snu-pill") ? nb.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty("--rt", Math.round(h) + "px");
  }
  setInterval(placeReadAloud, 800);

  // ---------------- Title ----------------
  const ART = `<svg viewBox="0 0 400 300" role="img" aria-label="A president's desk in front of a tall window, with a flag on each side">
    <rect x="130" y="24" width="140" height="150" rx="70" fill="#bcd6f2" stroke="#14213d" stroke-width="4"/><path d="M200 24v150M130 100h140" stroke="#14213d" stroke-width="3"/>
    <path d="M118 20c10 60 6 110-6 160h22c8-50 10-100 4-160zM282 20c-10 60-6 110 6 160h-22c-8-50-10-100-4-160z" fill="#e0a91b" stroke="#14213d" stroke-width="3"/>
    <path d="M62 60v170" stroke="#14213d" stroke-width="5" stroke-linecap="round"/><circle cx="62" cy="56" r="6" fill="#e0a91b" stroke="#14213d" stroke-width="2"/>
    <path d="M65 66c26 6 30 30 22 62-6 26-2 46 4 70-14-10-24-24-26-44z" fill="#c2341f" stroke="#14213d" stroke-width="3"/><path d="M67 80c14 6 18 18 16 30M67 104c12 6 14 16 12 28M67 128c8 6 10 14 10 24" stroke="#fff" stroke-width="5" fill="none"/>
    <path d="M338 60v170" stroke="#14213d" stroke-width="5" stroke-linecap="round"/><circle cx="338" cy="56" r="6" fill="#e0a91b" stroke="#14213d" stroke-width="2"/>
    <path d="M335 66c-26 6-30 30-22 62 6 26 2 46-4 70 14-10 24-24 26-44z" fill="#1d3f8a" stroke="#14213d" stroke-width="3"/><circle cx="322" cy="104" r="9" fill="none" stroke="#e0a91b" stroke-width="3"/>
    <path d="M176 150c0-22 48-22 48 0v44h-48z" fill="#3d2c59" stroke="#14213d" stroke-width="3"/>
    <rect x="70" y="186" width="260" height="22" rx="4" fill="#8a5a2b" stroke="#14213d" stroke-width="4"/><rect x="84" y="208" width="232" height="70" fill="#6f4520" stroke="#14213d" stroke-width="4"/>
    <rect x="150" y="220" width="100" height="46" rx="4" fill="#8a5a2b" stroke="#14213d" stroke-width="3"/><circle cx="200" cy="243" r="13" fill="#e0a91b" stroke="#14213d" stroke-width="3"/><path d="M200 235l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6-5-2.9-5 2.9 1.2-5.6-4.2-3.8 5.6-.6z" fill="#14213d"/>
    <rect x="212" y="170" width="46" height="16" rx="2" fill="#fff" stroke="#14213d" stroke-width="3" transform="rotate(-6 235 178)"/><path d="M262 184l22-22" stroke="#14213d" stroke-width="5" stroke-linecap="round"/>
    <rect x="108" y="172" width="26" height="14" rx="3" fill="#c2341f" stroke="#14213d" stroke-width="3"/><rect x="0" y="278" width="400" height="22" fill="#14213d"/></svg>`;
  function title() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    const prevDone = PART > 1 && st.parts[PART - 1] && st.parts[PART - 1].screen >= 0;
    app.innerHTML = `<div class="screen"><section class="tcard">
      <div class="tart" aria-hidden="true">${ART}</div>
      <div>
        <p class="tk">Government · Unit 5 · Day ${P.day} · Part ${PART} of 3</p>
        <h1>Run the Country</h1>
        <p class="sub2">${esc(P.name)}</p>
        <p class="hook">${esc(P.hook)}</p>
        <ul class="how"><li><span>1</span>Pick an idea</li><li><span>2</span>Pick HOW: order, Congress, or speech</li><li><span>3</span>Handle the big event, then end the turn</li></ul>
        <p class="chips"><span>⏱️ About 15 min</span><span>📅 4 turns</span><span>✏️ 1 sentence at the end</span></p>
        <p class="goal">🎯 ${esc(P.goal)}</p>
        ${PART > 1 ? `<p class="tiny" style="margin-top:0">${prevDone ? "Your country from last time is saved on this Chromebook." : "Missed a day, or on a different Chromebook? No problem. You'll start from a steady country."}</p>` : ""}
        <label for="nameBox">Your name (first name + last initial)</label>
        <div class="namerow"><input id="nameBox" maxlength="60" autocomplete="off" placeholder="Like Jordan M." value="${esc(pre || "")}"><button type="button" class="go" id="startBtn">${PART === 1 ? "Take office →" : "Back to work →"}</button></div>
        <p id="introMsg" class="bad" role="status"></p>
        <p class="tiny">Events are made up or based on real ones. The powers are real. Standard: SS.9-12.Gov.7.</p>
      </div></section></div>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ [A-Z]\.$/.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("nameBox").focus(); return; }
      try { if (window.classClaimDevice) window.classClaimDevice(fixed); } catch (e) {}
      if (st.name && st.name.toLowerCase() !== fixed.toLowerCase()) { st = freshTerm(); st.parts[PART] = freshPart(); pt = st.parts[PART]; }
      st.name = fixed;
      beginPart(); save(); render();
    };
    $("nameBox").addEventListener("keydown", e => { if (e.key === "Enter") $("startBtn").click(); });
  }

  // ---------------- End of the part: report + one sentence ----------------
  function headline() {
    const a = approval();
    if (PART === 3) {
      if (pt.voteJitter == null) { pt.voteJitter = rnd(-2, 2); save(); }
      const vote = cl(a + pt.voteJitter);
      return vote > 50 ? ["RE-ELECTED!", "You win " + vote + "% of the vote. Four more years. Pike: “I'll be back.”", vote]
                       : ["Pike Wins", "You get " + vote + "% of the vote. Pike takes the White House, and he promises to cancel your orders.", vote];
    }
    if (a >= 56) return ["A Hot Start", "Voters like what they see. Pike: “I'm just getting started.”"];
    if (a >= 50) return ["So Far, So Good", "The president is holding on to the country, barely. Pike: “I'm just getting started.”"];
    if (a >= 44) return ["A Bumpy Ride", "Voters are split on the president. Pike: “I'm just getting started.”"];
    return ["Trouble in the White House", "Most voters are not happy with the president. Pike: “I'm just getting started.”"];
  }
  function report() {
    const [h, deck, vote] = headline();
    const laws = IDEAS.filter(i => st.done[i.id] === "law").length, orders = IDEAS.filter(i => st.done[i.id] === "order").length;
    const blocked = Object.values(st.blocked).reduce((s, n) => s + n, 0);
    const pr = P.prompt;
    app.innerHTML = `<div class="screen"><section class="ecard">
      <div class="paper"><p class="mast">The Morning Paper · ${esc(P.year)}</p><h2>${esc(h)}</h2><p>${esc(deck)}</p></div>
      <div>
        <div class="mini"><div><b>${PART === 3 ? vote + "%" : approval() + "%"}</b>${PART === 3 ? "of the vote" : "voters like you"}</div><div><b>${laws}</b>laws passed</div><div><b>${orders}</b>orders signed</div></div>
        <ul class="log">${pt.log.slice(-7).map(l => `<li>${esc(l)}</li>`).join("")}</ul>
        ${blocked ? `<p class="tiny">⚖️ Judges blocked you ${blocked} time${blocked > 1 ? "s" : ""} so far.</p>` : ""}
        ${P.next ? `<p class="tiny"><b>${esc(P.next)}</b></p>` : ""}
      </div>
      <div class="write">
        <label for="w_w${PART}">${esc(pr.label)}</label>
        <p class="stem">Sentence starter: ${esc(pr.stem)}</p>
        <button type="button" class="use" id="stemBtn">Use the sentence starter</button>
        <textarea id="w_w${PART}" rows="4">${esc(pt.writing || "")}</textarea>
        <div class="sendrow"><button type="button" class="go navy" id="sendBtn" ${pt.turnedIn ? "disabled" : ""}>${pt.turnedIn ? "✓ Turned in" : "Turn in"}</button></div>
        <p id="sendMsg" class="${pt.turnedIn ? "good" : "bad"}" role="status" aria-live="polite">${pt.turnedIn ? "✓ Turned in. Your teacher can see your work." : ""}</p>
      </div></section></div>
      <button type="button" class="restart" id="restartBtn">Start over</button>`;
    const box = $("w_w" + PART);
    box.addEventListener("input", () => { pt.writing = box.value; save(); });
    $("stemBtn").onclick = () => { if (!box.value.trim()) { box.value = pr.stem; pt.writing = box.value; save(); } box.focus(); const i = box.value.indexOf("___"); if (i >= 0) box.setSelectionRange(i, i + 3); };
    $("sendBtn").onclick = () => send(h);
    $("restartBtn").onclick = restart;
  }

  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  async function send(h) {
    const msg = $("sendMsg"), box = $("w_w" + PART), v = (box.value || "").trim(), p = P.prompt;
    const bad = t => { msg.textContent = t; msg.className = "bad"; box.focus(); };
    if (!isTestT()) {
      if (window.classJunkStop) { const junk = window.classJunkStop(box, { starter: p.stem, source: "from the game" }); if (junk) { msg.textContent = junk; msg.className = "bad"; return; } }
      if (v.length < 40) return bad("Write a little more (1–2 full sentences).");
      if (/_{2,}/.test(v)) return bad("Fill in the blanks (___) with your own words.");
      const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
      const freshWords = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
      if (freshWords.size < 5) return bad("Add a little more. What happened, and why?");
      const has = w => new RegExp("(^|[^\\p{L}\\d])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^\\p{L}\\d])", "iu").test(plain(v));
      if (![p.words, ["because", "since", "so"]].every(g => g.some(has))) return bad(p.mustMsg);
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "bad"; return; }
    const blockedLines = pt.log.filter(l => /BLOCKED/.test(l));
    const answers = { "Standard": STANDARD };
    answers["Writing: " + p.short] = v;
    answers["Moves"] = pt.log.join(" · ");
    answers["Orders that needed Congress (blocked by a judge)"] = blockedLines.length ? blockedLines.length + ": " + blockedLines.map(l => l.replace(/^.*?Order: /, "").replace(/ \(BLOCKED.*$/, "")).join(", ") : "0";
    answers["Laws passed so far"] = IDEAS.filter(i => st.done[i.id] === "law").map(i => i.title).join(", ") || "none";
    answers["Orders signed so far"] = IDEAS.filter(i => st.done[i.id] === "order" || st.done[i.id] === "part").map(i => i.title).join(", ") || "none";
    P.turns.forEach(m => { if (pt.ev[m.id]) answers["Event · " + m.title] = pt.ev[m.id].log; });
    answers["Ending"] = h;
    answers["Final numbers"] = "Voters " + approval() + "% · Congress " + st.v.congress + "%";
    if (pt.missed) answers["Note"] = "Started this part fresh (missed the last part or used a different Chromebook)";
    $("sendBtn").disabled = true; msg.textContent = "Sending your work…"; msg.className = "";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: P.aid, assignmentTitle: P.title, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      pt.turnedIn = true; save();
      msg.textContent = "✓ Turned in. Your teacher can see your work."; msg.className = "good";
      $("sendBtn").textContent = "✓ Turned in";
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "bad"; $("sendBtn").disabled = false; }
  }

  // ---------------- Router ----------------
  // Start over = replay TODAY's part only. Earlier days stay as they were.
  function restart() {
    if (!confirm("Start over? This replays today's part from the beginning.")) return;
    const b = pt.base, keepHidden = pt.hidden, missed = pt.missed;
    if (b) { st.v = Object.assign({}, b.v); st.done = Object.assign({}, b.done); st.spoke = Object.assign({}, b.spoke); st.blocked = Object.assign({}, b.blocked); st.failed = Object.assign({}, b.failed); st.seen = Object.assign({}, b.seen); st.sec = b.sec; }
    st.parts[PART] = freshPart(); pt = st.parts[PART];
    pt.hidden = keepHidden; pt.missed = missed; pt.base = b; pt.screen = 0;
    pt.news = { hl: "🔄 Starting " + P.year + " over.", tone: "", lesson: "" };
    hits = {}; save(); render();
  }
  function render() {
    if (pt.screen < 0) return title();
    if (pt.screen >= TURNS) return report();
    board();
  }
  if (pt.screen >= 0 && pt.screen < TURNS && st.name) pt.news = Object.assign({}, pt.news || {}, { hl: "👋 Welcome back, President " + first() + ". You're in " + P.turns[pt.screen].month + ".", tone: "", votes: null });
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TURNS + 1,
      index: () => Math.max(0, Math.min(pt.screen, TURNS)),
      label: i => i < TURNS ? P.turns[i].month + " · " + P.turns[i].title : "Report + writing",
      go: i => { if (!st.name) st.name = "Test T."; if (pt.screen < 0) beginPart(); pt.screen = Math.max(0, Math.min(i, TURNS)); pt.pow = POWER; pt.sel = null; pt.news = null; hits = {}; save(); render(); },
      solve: () => { const m = P.turns[pt.screen]; if (!m) return; if (m.kind !== "hot" && !pt.ev[m.id]) doEvent(0); else if (m.kind === "hot") { pt.sel = m.hot[1]; save(); useTool(m.hot[1], "order"); } }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
