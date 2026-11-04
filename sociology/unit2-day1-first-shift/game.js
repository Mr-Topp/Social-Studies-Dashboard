// =====================================================================
//  FIRST SHIFT: THE UNWRITTEN RULES  (Sociology Unit 2 · Day 1)
//  One Saturday shift at a made-up diner. Meters carry forward; 4 endings.
//  Core mechanics: bend rules in a rush (folkway / more / law weigh differently),
//  status cards that light up when roles clash, a 3-hands floor juggle (role strain).
//  Dana (manager) and Kayla (rival server) react on screen as the meters move.
//  6 in-world evidence checks (3 Soc.5, 3 Soc.7). Turn-in via shared/turnin.js.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u2d1-first-shift-v2";
  const ASSIGNMENT_ID = "sociology-unit2-day1-first-shift";
  const TITLE = "Sociology Unit 2 · Day 1 · First Shift: The Unwritten Rules";
  const STANDARD = "SS.9-12.Soc.5, SS.9-12.Soc.7";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 5;   // seconds after a wrong answer
  const READ = 3;   // seconds before story choices open

  const $ = id => document.getElementById(id);
  const isT = () => { try { return !!(window.classIsTestT && window.classIsTestT()); } catch (e) { return false; } };   // Test T. (teacher preview)
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const isEs = () => !!(window.SiteLang && window.SiteLang.isEs && window.SiteLang.isEs());
  const T = s => (window.SiteLang && window.SiteLang.t ? window.SiteLang.t(s) : s);

  // ---------------- Cast (all made up) ----------------
  const CAST = {
    dana: { face: "👩🏽‍💼", name: "Dana" },
    marcus: { face: "👨🏿‍🍳", name: "Marcus" },
    kayla: { face: "💁🏼‍♀️", name: "Kayla" },
    ortiz: { face: "👵🏽", name: "Ms. Ortiz" },
    hal: { face: "🧔🏻", name: "Mr. Hal" },
    dev: { face: "🧑🏾", name: "Dev" },
    mom: { face: "📱", name: "Mom" },
    family: { face: "👨‍👩‍👧‍👦", name: "Family" },
    you: { face: "🧑", name: "You" }
  };
  const mood = v => v >= 5 ? "😄" : v >= 4 ? "🙂" : v >= 3 ? "😐" : v >= 2 ? "😒" : "😠";

  // ---------------- Status cards ----------------
  const CARDS = [
    { id: "age", icon: "🎂", name: "17 years old", how: "Birthdays just happen.", kind: "born" },
    { id: "sib", icon: "👦", name: "Older sibling", how: "Little brother Leo. Not your pick.", kind: "born" },
    { id: "hire", icon: "🪪", name: "New hire at Cedar Grill", how: "You applied and got hired.", kind: "earned" },
    { id: "driver", icon: "🚗", name: "Licensed driver", how: "You passed the driving test.", kind: "earned" },
    { id: "friend", icon: "🧢", name: "Dev's best friend", how: "You two chose each other.", kind: "earned" }
  ];
  const cardById = id => CARDS.find(c => c.id === id);
  const TAG = { born: "Born into it", earned: "Earned" };

  // ---------------- Rules (rulebook + rush tickets) ----------------
  // type: F folkway, M more, L law, W handbook rule (written by the diner)
  const RULES = {
    booth: { icon: "🪑", text: "Booth 4 is Ms. Ortiz's booth.", type: "F" },
    greet: { icon: "👋", text: "Greet every table", clue: "Kayla always does it. Dana doesn't care.", type: "F", out: "Kayla rolls her eyes.", fx: {} },
    coffee: { icon: "☕", text: "Refill coffee early", clue: "Regulars expect it. It's not written down.", type: "F", out: "Ms. Ortiz taps her cup.", fx: { tips: -1 } },
    silver: { icon: "🍴", text: "Roll silverware in napkins", clue: "Kayla: “We've always done it that way.”", type: "F", out: "Kayla re-rolls them.", fx: {} },
    fries: { icon: "🍟", text: "Don't snack off orders", clue: "Marcus: “Don't even think about it.”", type: "M", out: "Marcus: “That's nasty.”", fx: { crew: -2, trust: -1 } },
    blame: { icon: "🗣️", text: "Don't blame the cook", clue: "The crew has each other's backs.", type: "M", out: "Marcus ignores you all hour.", fx: { crew: -2 } },
    hands: { icon: "🧼", text: "Wash hands after trash", clue: "Sign: “Iowa food code: wash your hands.”", type: "L", out: "Dana writes you up.", fx: { wu: 1, trust: -2 } },
    phone: { icon: "📱", text: "No phones on the floor.", type: "W" },
    food: { icon: "🍟", text: "Don't give away food. That's stealing.", type: "M" },
    enjoy: { icon: "🙂", text: "Say “Enjoy!” with food", clue: "Kayla's habit. Customers barely notice.", type: "F", out: "Nobody notices.", fx: {} },
    folder: { icon: "🧾", text: "Check in the black folder", clue: "Just how it's done here.", type: "F", out: "Kayla sighs.", fx: {} },
    peanut: { icon: "🥜", text: "Ask Marcus about peanuts", clue: "Table 8: “Our kid has a peanut allergy.”", type: "M", out: "Marcus: “You could've hurt that kid!”", fx: { crew: -2, trust: -1 } },
    chicken: { icon: "🐔", text: "Keep raw chicken separate", clue: "Chart: “Iowa food code: raw meat separate.”", type: "L", out: "Dana writes you up.", fx: { wu: 1, trust: -2 } }
  };
  const TYPE_NAME = { F: "Folkway", M: "More", L: "Law", W: "Handbook rule" };
  const EARLY_NAME = { F: "Unwritten", M: "Unwritten", L: "Written", W: "Written" };

  // ---------------- Meters ----------------
  const LIMITS = { tips: [0, 999], trust: [0, 5], crew: [0, 5], stress: [0, 10], wu: [0, 2] };
  const ICON = { tips: "💵", trust: "⭐", crew: "🤝", stress: "🔥", wu: "📝" };
  const GOOD_UP = { tips: true, trust: true, crew: true, stress: false, wu: false };
  const ORDER = ["tips", "trust", "crew", "stress", "wu"];

  // ---------------- Writing (Dana's end-of-shift report) ----------------
  const PROMPTS = [
    { id: "w1", short: "One rule, its type, and its sanction",
      label: "1. Pick a rule from your shift. Folkway, more, or law? What sanction showed you?",
      stem: "The ___ rule is a ___ because ___. I knew how serious it was when ___.",
      min: 70, mustAll: [["folkway", "more", "mores", "law"], ["sanction", "eye", "roll", "write", "wrote", "angry", "mad", "upset", "look", "stare", "glare", "fired", "warning", "punish", "reward", "tip", "react", "said", "told", "mutter", "cite", "quiet", "nasty", "sigh", "shook", "shake"]],
      mustMsg: "In answer 1, say if the rule is a folkway, a more, or a law, AND what reaction (sanction) showed you." },
    { id: "w2", short: "Explain your ending: status, role, institution",
      label: "2. Why did you get your ending? Use a status, its role, and an institution.",
      stem: "I got the ___ ending because ___. As a ___, I was expected to ___. That ties to the ___ institution.",
      min: 80, mustAll: [["status", "role", "sibling", "brother", "hire", "worker", "server", "employee", "friend", "driver", "age", "kid"], ["family", "economy", "education", "school", "government", "religion", "job", "work", "business"]],
      mustMsg: "In answer 2, name one of your statuses or roles AND one institution (family, education, religion, economy, or government)." }
  ];

  // ---------------- Steps ----------------
  // story / res lines: [speaker, text]; speaker "n" = caption box.
  const STEPS = [
    { id: "clock", type: "flip", time: "10:30 AM", icon: "🪪", place: "Front counter", props: "☕🥞🍳", cast: ["dana"], kicker: "Clock in", title: "Your Name Tag",
      story: () => [["dana", "First shift! Flip your 5 status cards."]],
      reveal: ["<b>Status</b> = a position you hold. Born into it: <b>ascribed</b>. Earned: <b>achieved</b>."] },

    { id: "booth", type: "decide", time: "10:50 AM", icon: "🪑", place: "Booth 4", props: "🪟☕", cast: ["family", "kayla", "marcus"], kicker: "First table", title: "Booth 4",
      story: () => [["n", "Family of 4. Only booth 4 is open."]],
      clues: ["Mug in booth 4: “R.O.”"],
      choices: [
        { icon: "👨‍👩‍👧‍👦", label: "Seat them in booth 4", stamp: "DIRTY LOOK", fx: { tips: 6, crew: -1 }, cause: "Gave away Ms. Ortiz's booth.",
          res: [["n", "Ms. Ortiz walks in and stares."], ["marcus", "That's her booth. Everybody knows."]] },
        { icon: "⏳", label: "Make them wait", stamp: "GOOD READ", good: true, fx: { tips: 3, crew: 1 }, flag: "ortiz", cause: "Saved booth 4 for Ms. Ortiz.",
          res: [["n", "At 11:00, Ms. Ortiz takes booth 4."], ["marcus", "Good read, new kid."]] }
      ],
      rules: ["booth"],
      reveal: ["<b>Informal norm</b>: an unwritten rule people still expect."] },

    { id: "cGarf", type: "check", std: "Soc.5", short: "How unwritten rules get enforced (Garfinkel)", time: "11:05 AM", icon: "📋", kicker: "Shift log", title: "How'd You Learn It?",
      intro: "Log it.",
      evidence: [
        { kind: "real", h: "Real study · Harold Garfinkel, 1967", lines: ["His students acted like polite strangers at home.", "Families: “…shock, anxiety, embarrassment, and anger.”"] },
        { kind: "made", h: "Booth 4", lines: ["Marcus: “Everybody knows that's her booth.”"] }
      ],
      q: "What do both show?",
      options: ["Unwritten rules get enforced by reactions", "People only react when a boss watches", "Unwritten rules matter less than written ones", "People only react to written rules"],
      hint: "Look at the reactions: shock, anger, Marcus's comment.",
      why: "" },

    { id: "hal", type: "decide", time: "11:30 AM", icon: "🧔", place: "Table 6", props: "🍽️🥤", cast: ["hal", "kayla"], kicker: "Table 6", title: "“Not a Kid”",
      story: () => [["hal", "Can I get a real server? Not a kid."]],
      pull: ["age"],
      choices: [
        { icon: "🙋", label: "Give him to Kayla", stamp: "KAYLA'S NOD", fx: { crew: 1, stress: 1 }, cause: "Handed Mr. Hal to Kayla.",
          res: [["kayla", "I got him. Smart move, rookie."], ["n", "Kayla gets his tip."]] },
        { icon: "💪", label: "Prove him wrong", stamp: "+$5 TIP", good: true, fx: { tips: 5, stress: 2 }, cause: "Stayed polite with Mr. Hal.",
          res: [["n", "Fast and friendly. No smile, but he tips $5."]] },
        { icon: "😤", label: "Snap back at him", stamp: "COMPLAINT", fx: { trust: -1, stress: 1 }, cause: "Snapped back at Mr. Hal.",
          res: [["you", "I'm 17, not a kid."], ["hal", "I want the manager."]] }
      ],
      reveal: ["Your age is an <b>ascribed status</b>.", "<b>Role</b>: what a status expects. Server: stay polite."] },

    { id: "cHal", type: "check", std: "Soc.7", short: "Mr. Hal judged an ascribed status", time: "11:45 AM", icon: "📋", kicker: "Shift log", title: "Table 6",
      intro: "Log this complaint.",
      evidence: [
        { kind: "say", who: "hal", lines: ["Can I get a real server? Not a kid."] },
        { kind: "made", h: "Your status cards", cards: true }
      ],
      q: "Which card did he judge, and what kind is it?",
      options: ["17 years old: an ascribed status", "New hire: an achieved status", "Older sibling: an ascribed status", "Licensed driver: an achieved status"],
      hint: "“Not a kid.” Which card is that? Did you choose it?",
      why: "You didn't choose your age." },

    { id: "rush1", type: "rush", time: "12:00 PM", icon: "🔥", place: "Lunch rush", props: "🍔🍟🥤🍳", cast: ["kayla", "marcus", "dana"], kicker: "Lunch rush", title: "Cut 2 Corners",
      story: () => [["n", "Lunch rush! You're 10 minutes behind."], ["n", "Skip 2 rules to catch up. Use the 👀 clues to pick the safest."]],
      bend: 2, base: 10, cards: ["greet", "coffee", "fries", "silver", "hands", "blame"], ladder: true,
      reveal: [""] },

    { id: "cSanc", type: "check", std: "Soc.5", short: "Formal vs. informal sanction", time: "12:45 PM", icon: "📋", kicker: "Shift log", title: "Sanctions",
      intro: "Log it before the next wave.",
      evidence: [
        { kind: "face", h: "Skip Kayla's greeting", face: "💁🏼‍♀️🙄", lines: ["Kayla rolls her eyes."] },
        { kind: "slip", h: "Skip handwashing", lines: ["EMPLOYEE WRITE-UP", "Goes in your file."] }
      ],
      q: "A <b>sanction</b> rewards or punishes. How are these two different?",
      options: ["Eye-roll is informal; write-up is formal", "Eye-roll is formal; write-up is informal", "Both are positive: they reward workers", "Both are informal: a person gave them"],
      hint: "Which one is official and goes in your file?",
      why: "Official = formal. Unofficial = informal." },

    { id: "phone", type: "decide", time: "2:15 PM", icon: "📱", place: "Slow afternoon", props: "🧂☕", cast: ["dana"], kicker: "Slow afternoon", title: "Buzz",
      enter: st => st.flags.ortiz ? { fx: { trust: 1 }, who: "ortiz", line: "This new one is smart, Dana.", cause: "Saved booth 4 for Ms. Ortiz." } : null,
      story: () => [["n", "Bzzz. Your phone buzzes."]],
      sign: "No phones on the floor.",
      choices: [
        { icon: "👀", label: "Sneak a look", stamp: "WARNING", fx: { trust: -1 }, knew: "early", cause: "Checked your phone on the floor.",
          res: [["mom", "Get Leo from school at 6? I'm stuck."], ["dana", "Phone away."]] },
        { icon: "🤐", label: "Leave it", stamp: "THUMBS UP", good: true, fx: {}, cause: "Left your phone alone.",
          res: [["dana", "👍"]] }
      ],
      rules: ["phone"],
      reveal: ["Written handbook rule = <b>formal norm</b>."] },

    { id: "dev", type: "decide", time: "3:00 PM", icon: "🧢", place: "Front door", props: "🚪🍟", cast: ["dev", "kayla"], kicker: "Visitors", title: "Dev Walks In",
      story: () => [["dev", "Free fries? Dana's in the back."], ["n", "Two baskets. $3 each."]],
      clues: ["Kayla is right behind you."],
      pull: ["friend", "hire"],
      choices: [
        { icon: "🍟", label: "Free fries", stamp: "WRITTEN UP", fx: { wu: 1, trust: -1, crew: -1 }, cause: "Gave Dev free fries.",
          res: [["dev", "Let's gooo!"], ["n", "Kayla tells Dana. You're written up."]] },
        { icon: "🙅", label: "Charge them", stamp: "DEV IS MAD", fx: { stress: 2, crew: 1 }, cause: "Told Dev no.",
          res: [["dev", "Wow. Okay."], ["kayla", "Good. Most new kids give in."]] },
        { icon: "💸", label: "Pay for it myself", stamp: "−$6", fx: { tips: -6, stress: 1 }, cause: "Paid for Dev's fries.",
          res: [["dev", "You're the best!"], ["n", "No rule broken. Tips took a hit."]] }
      ],
      rules: ["food"],
      reveal: ["Friend vs. server: two statuses clash. That's <b>role conflict</b>."] },

    { id: "cMore", type: "check", std: "Soc.5", short: "Folkway vs. more", time: "3:30 PM", icon: "📋", kicker: "Shift log", title: "Kayla's Rules",
      intro: "Kayla cornered you? Log what she said.",
      evidence: [{ kind: "say", who: "kayla", lines: ["Skip my greeting? Whatever.", "Free food for friends? That's stealing."] }],
      q: "Why shrug at one, but get angry at the other?",
      options: ["Greeting: folkway. Free food: breaks a more", "Greeting: law. Free food: breaks a folkway", "Greeting: more. Free food: breaks a status", "Both are folkways. Kayla just dislikes Dev"],
      hint: "Which rule is about right and wrong, like stealing?",
      why: "Stealing = right vs. wrong." },

    { id: "brk", type: "decide", time: "4:00 PM", icon: "☕", place: "Back room", props: "🛋️☕", cast: ["kayla"], kicker: "Break time", title: "Your 15 Minutes",
      story: () => [["n", "4:00. Break time."], ["kayla", "Skip your break and take my big table? They tip well."]],
      choices: [
        { icon: "🛋️", label: "Take my break", stamp: "RECHARGED", good: true, fx: { stress: -2 }, cause: "Took your break.",
          run: st => {
            if (st.knew) return { res: [["n", "You rest in the back."], ["you", "Texting Mom: working on it."]] };
            st.knew = "break";
            return { res: [["n", "You finally check your phone."], ["mom", "Get Leo from school at 6? I'm stuck."]] };
          } },
        { icon: "💵", label: "Take the big table", stamp: "+$8 TIP", good: true, fx: { tips: 8, crew: 1, stress: 1 }, cause: "Skipped break for a big table.",
          run: st => st.knew ? { res: [["kayla", "I owe you one."], ["n", "Leo's pickup is still on your mind."]] }
            : { res: [["kayla", "I owe you one."], ["n", "Your phone keeps buzzing."]] } }
      ], },

    { id: "pickup", type: "decide", time: "5:50 PM", icon: "🏫", place: "5:50 PM", props: "🏫🚗", cast: ["dana", "kayla"], kicker: "Family", title: "Leo Is Waiting",
      story: st => st.knew === "early" ? [["n", "5:50. You told Dana at 2:15."], ["dana", "I planned for it."]]
        : st.knew === "break" ? [["n", "5:50. You told Dana at 4:00. Dinner rush in 10 minutes."]]
        : [["mom", "WHERE ARE YOU? Leo is waiting at school!"], ["n", "5:50. Dinner rush in 10 minutes."]],
      pull: ["sib", "hire"],
      choices: [
        { icon: "🚗", label: "Drive Leo home",
          run: st => st.knew === "early" ? { stamp: "APPROVED", good: true, fx: { tips: -4 }, cause: "Told Dana early (2:15).", res: [["dana", "Go. Be back by 6:30."]] }
            : st.knew === "break" ? { stamp: "KAYLA COVERS", fx: { tips: -4, crew: -1 }, cause: "Told Dana at 4:00.", res: [["dana", "Kayla, cover 30 minutes."], ["kayla", "Ugh. Fine."]] }
            : { stamp: "NO WARNING!", fx: { tips: -4, trust: -2, crew: -1 }, cause: "Left with no warning.", res: [["dana", "You're leaving NOW? With no warning?"]] } },
        { icon: "🙅", label: "Tell Mom no", stamp: "MOM IS FURIOUS", fx: { stress: 3 }, cause: "Told Mom no.",
          res: [["mom", "Leo has to wait an HOUR?!"], ["n", "You stay, but your head isn't in it."]] },
        { icon: "🏠", label: "Pay the neighbor", stamp: "−$10", fx: { tips: -10, stress: 1 }, cause: "Paid a neighbor to get Leo.",
          res: [["n", "Mrs. Patel next door gets Leo. There goes $10."]] }
      ],
      reveal: ["Sibling vs. worker at 6:00: <b>role conflict</b> again."], showCause: true },

    { id: "juggle", type: "juggle", time: "6:30 PM", icon: "🍽️", place: "Dinner rush", props: "🍔🍝🥤", cast: ["kayla", "dana"], kicker: "Dinner rush", title: "Six Tables, Three Hands",
      story: () => [["n", "Five jobs. Three hands."]],
      tasks: [
        { id: "refill", icon: "☕", table: "T2", text: "Refills", miss: "Table 2 tips less.", fx: { tips: -2 } },
        { id: "order", icon: "📝", table: "T5", text: "Ready to order", miss: "Table 5 waits. Tips less.", fx: { tips: -4, stress: 1 } },
        { id: "check", icon: "🧾", table: "T1", text: "Wants the check", miss: "Table 1 keeps waving.", fx: { tips: -3, stress: 1 } },
        { id: "register", icon: "💵", table: "$", text: "Register line", miss: "Dana has to ring up.", fx: { trust: -1 } },
        { id: "spill", icon: "🥤", table: "T3", text: "Spilled drink", miss: "Someone almost slips.", fx: { trust: -1, stress: 1 } }
      ],
      reveal: ["One status, too many demands: <b>role strain</b>."] },

    { id: "rush2", type: "rush", time: "7:30 PM", icon: "🔥", place: "Second wave", props: "🍗🥗🥜", cast: ["marcus", "dana"], kicker: "Second wave", title: "Cut 1 Corner",
      story: () => [["n", "Second wave! Skip 1 rule."], ["n", "Use the ladder: folkway, more, law."]],
      bend: 1, base: 8, cards: ["peanut", "enjoy", "chicken", "folder"],
      reveal: ["Folkways bend. Mores and laws bite back."] },

    { id: "cStrain", type: "check", std: "Soc.7", short: "Role conflict vs. role strain", time: "8:30 PM", icon: "📋", kicker: "Shift log", title: "What Hit You Tonight?",
      intro: "Last log. Which cards lit up?",
      evidence: [
        { kind: "pairs", h: "Dev's free fries · Leo's pickup", pairs: [["friend", "hire"], ["sib", "hire"]] },
        { kind: "pile", h: "The six-table rush", card: "hire", items: "☕ 📝 🧾 💵 🥤" }
      ],
      q: "Which sentence explains your night?",
      options: ["Dev + Leo = role conflict. Tables = role strain.", "Dev + Leo = role strain. Tables = role conflict.", "All three = role strain. All were stressful.", "All three = role conflict. All had two people."],
      hint: "Conflict: two statuses clash. Strain: one status, too much.",
      why: "Two cards clashed vs. one card overloaded." },

    { id: "cInst", type: "check", std: "Soc.7", short: "Institution responding to a need", time: "9:00 PM", icon: "🏛️", kicker: "Closing time", title: "Bigger Than the Diner",
      intro: "<b>Social institutions</b> meet big needs.",
      inst: true,
      evidence: [{ kind: "news", h: "Cedar Ridge Times (made-up paper)", hl: "School adds lunchtime make-up tests", lines: ["“So many students work after school.” —Principal"] }],
      q: "Which institution changed? Why?",
      options: ["Education: students work after school", "Economy: students need more jobs", "Family: parents want teens home", "Government: the state needs drivers"],
      hint: "Who runs make-up tests?",
      why: "" },

    { id: "ending", type: "ending", time: "9:05 PM", icon: "🏁", kicker: "End of shift", title: "Shift Report" },
    { id: "write", type: "write", time: "9:10 PM", icon: "✍️", kicker: "Last step", title: "Your Shift Report" }
  ];
  const TOTAL = STEPS.length;
  const CHECKS = STEPS.filter(s => s.type === "check");

  const ENDINGS = {
    promo: { icon: "🏆", title: "Promoted: Trainer", stamp: "PROMOTED", tag: "TRAINER", good: true,
      text: [["dana", "You read this place fast. Next Saturday, you train the new hire."], ["n", "TRAINER is a new <b>achieved status</b>."]] },
    kept: { icon: "👍", title: "Back Next Saturday", stamp: "SEE YOU SATURDAY", tag: "NEW HIRE", good: true,
      text: [["dana", "See you Saturday. Not bad for day one."], ["n", "Rules learned the hard way. Still a <b>new hire</b>."]] },
    wu: { icon: "📝", title: "Written Up: Final Warning", stamp: "FINAL WARNING", tag: "FINAL WARNING",
      text: [["dana", "Two write-ups on day one. One more and you're done. Sign here."], ["n", "Break <b>formal norms</b> and you get <b>formal sanctions</b>."]] },
    quit: { icon: "🚪", title: "You Quit", stamp: "QUIT", tag: "EX-EMPLOYEE",
      text: [["n", "At 9:05, you hang your apron on the hook and walk out."], ["n", "<b>Role strain</b> and <b>role conflict</b> push real people out of jobs too."]] },
    quitCrew: { icon: "🚪", title: "You Quit", stamp: "QUIT", tag: "EX-EMPLOYEE",
      text: [["n", "At 9:05, you hang your apron on the hook and walk out."], ["kayla", "Nobody back here trusts you, rookie."], ["n", "Break <b>mores</b> and the crew's <b>informal sanctions</b> can freeze you out."]] }
  };
  function endingFor(m) {
    if (m.wu >= 2) return "wu";
    if (m.crew <= 0) return "quitCrew";
    if (m.stress >= 8) return "quit";
    if (m.trust >= 4 && m.crew >= 3 && m.wu === 0) return "promo";
    return "kept";
  }

  // ---------------- State ----------------
  const fresh = () => ({ v: 2, name: "", step: -1, m: { tips: 0, trust: 3, crew: 3, stress: 2, wu: 0 }, res: {}, cb: {}, flips: {}, sel: {}, wrong: {}, done: {}, causes: [], rules: [], ladder: false, knew: null, flags: {}, jug: { sel: [], asked: null }, ending: null, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 2 || !st.m) st = fresh();
  // Shared Chromebooks: if a different student is signed in on this device now, don't show the last student's game.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    if (now && st.name && now !== st.name.trim().toLowerCase()) st = fresh();
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  let anim = false;   // true right after an action, so stamps and pop-ins animate once (not on refresh)

  function apply(fx, cause) {
    const out = {};
    ORDER.forEach(k => {
      const d = (fx || {})[k]; if (!d) return;
      const before = st.m[k];
      st.m[k] = Math.max(LIMITS[k][0], Math.min(LIMITS[k][1], before + d));
      const real = st.m[k] - before;
      if (real) { out[k] = real; if (cause) st.causes.push({ k, d: real, why: cause }); }
    });
    return out;
  }
  function addFx(a, b) { const o = Object.assign({}, a); Object.keys(b || {}).forEach(k => { o[k] = (o[k] || 0) + b[k]; }); return o; }
  function deltaHtml(d, inline) {
    const ks = ORDER.filter(k => d && d[k]);
    if (!ks.length) return "";
    return `<div class="deltas${inline ? " inline" : ""}">${ks.map((k, n) => {
      const v = d[k], good = (v > 0) === GOOD_UP[k];
      const num = k === "tips" ? (v > 0 ? "+$" + v : "−$" + Math.abs(v)) : (v > 0 ? "+" + v : "−" + Math.abs(v));
      return `<span class="delta ${good ? "up" : "down"}" style="animation-delay:${n * 0.12}s">${ICON[k]} ${num}</span>`;
    }).join("")}</div>`;
  }
  function warnLines() {
    const out = [];
    if (st.m.stress >= 7 && st.m.wu < 2) out.push("🔥 Stress is near the top. You might walk out.");
    if (st.m.wu === 1) out.push("📝 One more write-up = final warning.");
    if (st.m.crew <= 1 && st.m.wu < 2) out.push("🤝 Crew is turning on you.");
    return out;
  }

  // ---------------- HUD + side ----------------
  let lastM = null;
  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show; $("side").hidden = !show;
    $("layout").classList.toggle("with-side", show);
    document.body.classList.toggle("on-title", !show);
    if (!show) return;
    const s = STEPS[Math.min(st.step, TOTAL - 1)];
    $("hudStep").textContent = Math.min(st.step + 1, TOTAL); $("hudTotal").textContent = TOTAL;
    $("hudTime").textContent = s.time;
    const tm = s.time.match(/(\d+):(\d+)/), hh = +tm[1], mm = +tm[2];
    $("clockH").style.transform = `rotate(${(hh % 12) * 30 + mm / 2}deg)`; $("clockM").style.transform = `rotate(${mm * 6}deg)`;
    $("progFill").style.width = Math.round(st.step / (TOTAL - 1) * 100) + "%";
    $("mTips").textContent = "$" + st.m.tips;
    $("mTrust").innerHTML = `<span class="stars"><span class="on">${"★".repeat(st.m.trust)}</span><span class="off">${"★".repeat(5 - st.m.trust)}</span></span>`;
    $("mCrew").innerHTML = `<span class="dots"><span class="on">${"●".repeat(st.m.crew)}</span><span class="off">${"●".repeat(5 - st.m.crew)}</span></span>`;
    $("danaMood").textContent = mood(st.m.trust); $("kaylaMood").textContent = mood(st.m.crew);
    $("mStressFill").style.width = (st.m.stress * 10) + "%"; $("mStress").textContent = st.m.stress + "/10";
    $("mStressFill").parentElement.classList.toggle("hot", st.m.stress >= 7);
    $("mWu").innerHTML = `${"<span class='slip on'>📝</span>".repeat(st.m.wu)}${"<span class='slip'>📝</span>".repeat(2 - st.m.wu)}`;
    if (lastM) {
      const map = { tips: "mTips", trust: "mTrust", crew: "mCrew", stress: "mStressFill", wu: "mWu" };
      ORDER.forEach(k => { if (lastM[k] !== st.m[k]) { const el = $(map[k]).closest(".meter, .who"); if (!el) return; el.classList.remove("flash", "flash-bad"); void el.offsetWidth; el.classList.add(((st.m[k] > lastM[k]) === GOOD_UP[k]) ? "flash" : "flash-bad"); } });
      if (lastM.trust !== st.m.trust) bump("danaPortrait");
      if (lastM.crew !== st.m.crew) bump("kaylaPortrait");
    }
    lastM = Object.assign({}, st.m);
    const lit = s.pull ? s.pull : (s.type === "juggle" ? ["hire"] : []);
    $("cards").innerHTML = CARDS.map(c => `<div class="mini${lit.includes(c.id) ? " lit" : ""}"><span class="fi" aria-hidden="true">${c.icon}</span><span class="mn">${esc(c.name)}</span>${st.flips[c.id] || st.step > 0 ? `<span class="tag ${c.kind}">${TAG[c.kind]}</span>` : ""}</div>`).join("");
    $("rulebook").innerHTML = st.rules.map(id => { const r = RULES[id]; const name = st.ladder ? TYPE_NAME[r.type] : EARLY_NAME[r.type]; const cls = st.ladder ? r.type : (/[FM]/.test(r.type) ? "U" : "W");
      return `<li><span aria-hidden="true">${r.icon}</span><span class="rt">${esc(r.text)}</span><span class="badge ${cls}">${name}</span></li>`; }).join("");
    $("rbEmpty").hidden = st.rules.length > 0;
  }
  function bump(id) { const el = $(id); if (!el) return; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
  function addRules(ids) { (ids || []).forEach(id => { if (!st.rules.includes(id)) st.rules.push(id); }); }

  // ---------------- Scene pieces ----------------
  const app = $("app");
  function stage(s) {
    const cast = (s.cast || []).filter((v, i, a) => a.indexOf(v) === i);
    return `<div class="stage" aria-hidden="true"><div class="wall"><span class="window"></span><span class="neon-sm">CEDAR GRILL</span><span class="placesign">${s.icon} <span>${esc(s.place || s.title)}</span></span></div>
      <div class="counter"><span class="props">${s.props || "☕"}</span></div>
      <div class="actors">${cast.map((c, i) => `<div class="actor${c === "kayla" ? " rival" : ""}" style="animation-delay:${i * 0.08}s"><span class="af">${CAST[c].face}</span><span class="an">${esc(CAST[c].name)}</span></div>`).join("")}</div>
      <div class="floor"></div></div>`;
  }
  function head(s) { return `<div class="panel-head"><span class="pk">${esc(s.kicker)}</span><h2>${s.title}</h2></div>`; }
  function line(l, k) {
    const [who, t] = l;
    if (who === "n") return `<div class="caption" style="animation-delay:${k * 0.15}s"><span>${t}</span></div>`;
    const c = CAST[who];
    return `<div class="say who-${who}" style="animation-delay:${k * 0.15}s"><span class="sav" aria-hidden="true">${c.face}</span><div class="bub"><span class="bn">${esc(c.name)}</span><span class="bt">${t}</span></div></div>`;
  }
  const lines = arr => `<div class="lines">${arr.map(line).join("")}</div>`;
  function revealHtml(textLines) { return `<div class="reveal${anim ? " pop" : ""}"><p class="rh">💡 Idea unlocked</p>${textLines.map(t => `<p>${t}</p>`).join("")}</div>`; }
  function stampHtml(text, good) { return text ? `<span class="stamp ${good ? "good" : "bad"}${anim ? " slam" : ""}">${esc(text)}</span>` : ""; }
  function nextBtn(label) { return `<button type="button" class="next" id="nextBtn">${esc(label || "Next")} →</button>`; }
  function wireNext() { const b = $("nextBtn"); if (b) b.onclick = goNext; }
  function goNext() {
    st.step = Math.min(st.step + 1, TOTAL - 1);
    enterStep();
    anim = true; save(); render(); window.scrollTo(0, 0);
  }
  function enterStep() {
    const s = STEPS[st.step];
    if (s && s.enter && !st.cb[s.id]) {
      const r = s.enter(st);
      st.cb[s.id] = r ? { who: r.who, line: r.line, cause: r.cause, d: apply(r.fx, r.cause) } : { none: true };
    }
    if (s && s.type === "ending" && !st.ending) st.ending = endingFor(st.m);
  }
  function callbackHtml(s) {
    const c = st.cb[s.id];
    if (!c || c.none) return "";
    return `<div class="callback">${line([c.who, c.line], 0)}${deltaHtml(c.d, true)}<p class="cause-line"><span>Caused by:</span> <span>${esc(c.cause)}</span></p></div>`;
  }
  function pullHtml(pull) {
    if (!pull) return "";
    const chips = pull.map(id => { const c = cardById(id); return `<span class="chip"><span aria-hidden="true">${c.icon}</span><span>${esc(c.name)}</span></span>`; });
    return `<div class="pull"><span class="ph">Pulling on you:</span>${chips.join(`<span class="vs" aria-hidden="true">⚡</span>`)}</div>`;
  }
  function cluesHtml(s) {
    if (!s.clues && !s.sign) return "";
    return `<div class="clues">${s.sign ? `<div class="postsign"><span class="psh">Handbook</span><span>${esc(s.sign)}</span></div>` : ""}${(s.clues || []).map(c => `<div class="sticky"><span aria-hidden="true">👀</span><span>${c}</span></div>`).join("")}</div>`;
  }
  function readLock(btns, lockEl) {
    btns.forEach(b => b.disabled = true);
    let left = isT() ? 0 : READ;   // Test T. skips the reading wait
    const tick = () => {
      if (left <= 0) { btns.forEach(b => b.disabled = false); lockEl.textContent = ""; return; }
      lockEl.textContent = "⏳ " + left + "…";
      left--; setTimeout(tick, 1000);
    };
    tick();
  }

  // ---------------- Title screen ----------------
  function intro() {
    app.innerHTML = `<section class="title-card">
      <div class="title-top"><p class="eyebrow">Sociology · Unit 2 · Day 1</p>
        <h1 class="neon-title"><span class="nt1">First Shift</span><span class="nt2">The Unwritten Rules</span></h1>
        <p class="hook">Nobody tells you the real rules. Read the room or get written up.</p></div>
      <div class="title-cast" aria-hidden="true">
        <div class="tc"><span class="af">👩🏽‍💼</span><b>Dana</b><small>Manager</small></div>
        <div class="tc"><span class="af">👨🏿‍🍳</span><b>Marcus</b><small>Cook</small></div>
        <div class="tc rival"><span class="af">💁🏼‍♀️</span><b>Kayla</b><small>Your rival</small></div>
        <div class="tc"><span class="af">👵🏽</span><b>Ms. Ortiz</b><small>Regular</small></div>
        <div class="tc you"><span class="af">🧑</span><b>You</b><small>New hire</small></div></div>
      <div class="title-tiles"><span>🃏 <b>9</b> <span>big calls</span></span><span>📋 <b>6</b> <span>shift-log checks</span></span><span>✍️ <b>2</b> <span>short answers</span></span><span>⏱ <b>25</b> <span>minutes</span></span><span>🏁 <b>4</b> <span>endings</span></span></div>
      <p class="goal"><b>Today's goal:</b> Explain how statuses, roles, norms, and institutions shape what people do.</p>
      <div class="title-start"><div class="namebox"><label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(st.name)}"></div>
        <button type="button" class="big" id="startBtn">Clock in →</button></div>
      <p id="introMsg" class="msg" role="status"></p>
      <p class="small-print"><b>SS.9-12.Soc.5</b> Describe the components of culture. · <b>SS.9-12.Soc.7</b> Evaluate important social institutions and how they respond to social needs.</p>
      <p class="small-print">Cedar Grill and everyone in it are made up.</p></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ \p{Lu}\.$/u.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 0; anim = true; save(); render(); window.scrollTo(0, 0);
    };
  }

  // ---------------- Flip (clock in) ----------------
  function flipView(s) {
    const all = CARDS.every(c => st.flips[c.id]);
    app.innerHTML = `<section class="scene">${stage(s)}<div class="panel-body">${head(s)}${lines(s.story(st))}
      <div class="flip-grid">${CARDS.map(c => {
        const open = !!st.flips[c.id];
        return `<button type="button" class="flip${open ? " open" : ""}" data-id="${c.id}" aria-pressed="${open}"><span class="fi" aria-hidden="true">${c.icon}</span><span class="fn">${esc(c.name)}</span>${open ? `<span class="how">${esc(c.how)}</span><span class="tag ${c.kind}">${TAG[c.kind]}</span>` : `<span class="tap">Tap to flip</span>`}</button>`;
      }).join("")}</div>
      <div id="after">${all ? revealHtml(s.reveal) + nextBtn("Clock in") : `<p class="lockmsg">Flip all 5 cards.</p>`}</div></div></section>`;
    app.querySelectorAll(".flip").forEach(b => b.onclick = () => {
      const id = b.dataset.id;
      if (st.flips[id]) return;
      st.flips[id] = true; save(); anim = CARDS.every(c => st.flips[c.id]); render();
      const nb = app.querySelector(`.flip[data-id="${id}"]`); if (nb) nb.classList.add("flipping");
      const a = $("after"); if (CARDS.every(c => st.flips[c.id]) && a) a.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    wireNext();
  }

  // ---------------- Decide ----------------
  const orders = {};
  function decideView(s) {
    const r = st.res[s.id];
    let h = `<section class="scene">${stage(s)}<div class="panel-body">${head(s)}${callbackHtml(s)}${lines(s.story(st))}${pullHtml(s.pull)}${cluesHtml(s)}`;
    if (!r) {
      if (!orders[s.id]) orders[s.id] = shuffle(s.choices.map((c, i) => i));
      h += `<div class="cards c${s.choices.length}">${orders[s.id].map(i => { const c = s.choices[i]; return `<button type="button" class="gcard" data-i="${i}"><span class="gi" aria-hidden="true">${c.icon}</span><span class="gl">${esc(c.label)}</span></button>`; }).join("")}</div><p class="lockmsg" id="lockMsg"></p></div></section>`;
      app.innerHTML = h;
      const btns = [...app.querySelectorAll(".gcard")];
      btns.forEach(b => b.onclick = () => choose(s, +b.dataset.i));
      readLock(btns, $("lockMsg"));
      return;
    }
    const c = s.choices[r.i];
    h += `<div class="result" id="resultBox">${stampHtml(r.stamp, r.good)}<p class="you"><span class="yi" aria-hidden="true">${c.icon}</span> <span>You chose:</span> <b>${esc(c.label)}</b></p>${lines(r.lines)}${deltaHtml(r.d)}${r.cause && s.showCause ? `<p class="cause-line"><span>Caused by:</span> <span>${esc(r.cause)}</span></p>` : ""}${(r.warn || []).map(w => `<p class="warn">${w}</p>`).join("")}</div>${s.reveal ? revealHtml(s.reveal) : ""}${nextBtn()}</div></section>`;
    app.innerHTML = h; wireNext();
  }
  function choose(s, i) {
    if (st.res[s.id]) return;
    const c = s.choices[i];
    const run = c.run ? c.run(st) : {};
    const fx = run.fx || c.fx || {};
    const cause = run.cause || c.cause;
    if (c.knew && !st.knew) st.knew = c.knew;
    if (c.flag) st.flags[c.flag] = true;
    const d = apply(fx, cause);
    addRules(s.rules);
    st.res[s.id] = { i, lines: run.res || c.res, d, cause, warn: warnLines(), stamp: run.stamp || c.stamp, good: run.stamp ? !!run.good : !!c.good };
    anim = true; save(); render();
    const box = $("resultBox"); if (box) box.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------------- Rush (bend rules on the ticket rail) ----------------
  function rushView(s) {
    const r = st.res[s.id];
    const sel = st.sel[s.id] || [];
    let h = `<section class="scene">${stage(s)}<div class="panel-body">${head(s)}${r ? "" : lines(s.story(st))}`;
    if (!r) {
      if (!orders[s.id]) orders[s.id] = shuffle(s.cards.slice());
      h += `<div class="rail"><div class="rail-bar" aria-hidden="true"></div><div class="tickets">${orders[s.id].map((id, n) => { const x = RULES[id]; const on = sel.includes(id);
        return `<button type="button" class="ticket${on ? " sel" : ""}" data-id="${id}" aria-pressed="${on}" style="--tilt:${(n % 3 - 1) * 1.2}deg"><span class="tno">#${n + 1}</span><span class="ri" aria-hidden="true">${x.icon}</span><span class="rr">${esc(x.text)}</span><span class="rc"><span aria-hidden="true">👀</span> <span>${esc(x.clue)}</span></span>${on ? `<span class="cut">✂ <span>Bend</span></span>` : ""}</button>`; }).join("")}</div></div>
        <div class="rush-foot"><span class="counter-line"><span>Rules to bend:</span> <b>${sel.length}</b> / <b>${s.bend}</b></span>
        <button type="button" class="next" id="bendBtn" ${sel.length === s.bend ? "" : "disabled"}>${s.bend === 2 ? "Bend these 2 rules" : "Bend this rule"} →</button></div></div></section>`;
      app.innerHTML = h;
      app.querySelectorAll(".ticket").forEach(b => b.onclick = () => {
        const id = b.dataset.id; let list = (st.sel[s.id] || []).slice();
        if (list.includes(id)) list = list.filter(x => x !== id);
        else { if (list.length >= s.bend) list.shift(); list.push(id); }
        st.sel[s.id] = list; save(); render();
      });
      $("bendBtn").onclick = () => bend(s);
      return;
    }
    const lawHit = r.picked.some(id => RULES[id].type === "L"), moreHit = r.picked.some(id => RULES[id].type === "M");
    h += `<div class="result" id="resultBox">${stampHtml(lawHit ? "WRITTEN UP" : moreHit ? "CREW IS ANGRY" : "CAUGHT UP", !lawHit && !moreHit)}
      <div class="tickets flipped">${s.cards.map((id, n) => { const x = RULES[id]; const bent = r.picked.includes(id);
      return `<div class="ticket back t${x.type}${bent ? " bent" : ""}${anim ? " flipin" : ""}" style="animation-delay:${n * 0.12}s">${bent ? `<span class="bentlbl">✂ <span>You bent this</span></span>` : ""}<span class="ri" aria-hidden="true">${x.icon}</span><span class="rr">${esc(x.text)}</span><span class="badge ${x.type}">${TYPE_NAME[x.type]}</span>${bent ? `<span class="rout"><span>${esc(x.out)}</span></span>` : ""}</div>`; }).join("")}</div>
      ${deltaHtml(r.d)}</div>`;
    if (s.ladder) h += `<div class="reveal${anim ? " pop" : ""}"><p class="rh">💡 Idea unlocked</p><div class="ladder">
        <div class="rung F"><p class="rn">🙂 Folkway</p><p>Everyday custom</p><p>🙄 eye-roll</p></div>
        <div class="rung M"><p class="rn">😠 More <small>(say “MOR-ay”)</small></p><p>Rule about right and wrong</p><p>😠 anger</p></div>
        <div class="rung L"><p class="rn">⚖️ Law</p><p>Written government rule</p><p>📝 punished</p></div></div>
        <p>Folkways + mores = <b>informal</b>. Laws = <b>formal</b>.</p></div>`;
    else h += revealHtml(s.reveal);
    h += nextBtn() + `</div></section>`;
    app.innerHTML = h; wireNext();
  }
  function bend(s) {
    const picked = (st.sel[s.id] || []).slice();
    if (picked.length !== s.bend || st.res[s.id]) return;
    let d = apply({ tips: s.base }, s.kicker === "Lunch rush" ? "Lunch rush tips." : "Second wave tips.");
    picked.forEach(id => {
      const x = RULES[id];
      d = addFx(d, apply({ tips: 3 }, "Skipped: " + x.text));
      d = addFx(d, apply(x.fx, "Bent a " + TYPE_NAME[x.type].toLowerCase() + ": " + x.text));
    });
    addRules(s.cards);
    if (s.ladder) st.ladder = true;
    st.res[s.id] = { picked, d, warn: warnLines() };
    anim = true; save(); render(); window.scrollTo(0, 0);
  }

  // ---------------- Juggle (floor map, 3 hands) ----------------
  function juggleView(s) {
    const r = st.res[s.id];
    const j = st.jug;
    const hands = 3 + (j.asked === "yes" ? 2 : 0);
    const need = Math.min(hands, s.tasks.length);
    let h = `<section class="scene">${stage(s)}<div class="panel-body">${head(s)}${lines(s.story(st))}${pullHtml(["hire"])}`;
    if (!r) {
      h += `<div class="hands" aria-label="Hands"><span>Hands:</span> ${Array.from({ length: hands }, (_, k) => `<span class="hand${k < j.sel.length ? " used" : ""}" aria-hidden="true">✋</span>`).join("")} <span class="sr">${j.sel.length} / ${hands}</span></div>
        <div class="floormap">${s.tasks.map(t => { const on = j.sel.includes(t.id); return `<button type="button" class="tbl${on ? " sel" : ""}" data-id="${t.id}" aria-pressed="${on}"><span class="tno">${t.table}</span><span class="treq" aria-hidden="true">${t.icon}</span><span class="tt">${esc(t.text)}</span>${on ? `<span class="tok" aria-hidden="true">✋</span>` : ""}</button>`; }).join("")}</div>
        ${j.asked === "yes" ? lines([["kayla", "Fine. I'll take two. You owe me."]]) : j.asked === "no" ? lines([["kayla", "Figure it out, new kid."]]) + `<p class="cause-line"><span>Caused by:</span> <span>Crew doesn't trust you yet.</span></p>` : `<button type="button" class="helpbtn" id="askBtn"><span class="af" aria-hidden="true">💁🏼‍♀️</span> <span>Ask Kayla for help</span></button>`}
        <div class="rush-foot"><span class="counter-line"><span>Jobs picked:</span> <b>${j.sel.length}</b> / <b>${need}</b></span>
        <button type="button" class="next" id="goBtn" ${j.sel.length === need ? "" : "disabled"}>Go! →</button></div></div></section>`;
      app.innerHTML = h;
      app.querySelectorAll(".tbl").forEach(b => b.onclick = () => {
        const id = b.dataset.id; let list = j.sel.slice();
        if (list.includes(id)) list = list.filter(x => x !== id);
        else { if (list.length >= hands) list.shift(); list.push(id); }
        j.sel = list; save(); render();
      });
      const ask = $("askBtn");
      if (ask) ask.onclick = () => {
        if (st.m.crew >= 3) { j.asked = "yes"; j.askD = apply({ crew: -1 }, "Used a favor with Kayla."); }
        else j.asked = "no";
        save(); render();
      };
      $("goBtn").onclick = () => {
        if (st.res[s.id] || j.sel.length !== need) return;
        let d = apply({ stress: 1 }, "Dinner rush hit all at once.");
        if (j.askD) d = addFx(d, j.askD);
        const missed = [];
        s.tasks.forEach(t => { if (!j.sel.includes(t.id)) { missed.push(t.id); d = addFx(d, apply(t.fx, "Missed: " + t.text)); } });
        st.res[s.id] = { missed, d, warn: warnLines() };
        anim = true; save(); render(); window.scrollTo(0, 0);
      };
      return;
    }
    h += `<div class="result" id="resultBox">${stampHtml(r.missed.length ? "JOBS MISSED" : "ALL DONE", !r.missed.length)}<div class="floormap">${s.tasks.map(t => { const miss = r.missed.includes(t.id); return `<div class="tbl${miss ? " miss" : " sel"}"><span class="tno">${t.table}</span><span class="treq" aria-hidden="true">${miss ? "❌" : "✅"}</span><span class="tt">${esc(t.text)}</span></div>`; }).join("")}</div>
      ${r.missed.length ? r.missed.map(id => `<div class="caption"><span>${esc(s.tasks.find(t => t.id === id).miss)}</span></div>`).join("") : `<div class="caption"><span>✅ Every job got done.</span></div>`}${deltaHtml(r.d)}${(r.warn || []).map(w => `<p class="warn">${w}</p>`).join("")}</div>${revealHtml(s.reveal)}${nextBtn()}</div></section>`;
    app.innerHTML = h; wireNext();
  }

  // ---------------- Check (Dana's clipboard) ----------------
  let locked = false;
  function miniCard(id) { const c = cardById(id); return `<span class="mcard"><span aria-hidden="true">${c.icon}</span><span>${esc(c.name)}</span></span>`; }
  function evidenceHtml(e) {
    if (e.kind === "news") return `<div class="news"><div class="masthead">${esc(e.h)}</div><p class="hl">${esc(e.hl)}</p>${e.lines.map(t => `<p>${t}</p>`).join("")}</div>`;
    if (e.kind === "say") return `<div class="ev-say">${lines(e.lines.map(t => [e.who, t]))}</div>`;
    if (e.kind === "face") return `<div class="ev ev-face"><p class="evh">${esc(e.h)}</p><div class="bigface" aria-hidden="true">${e.face}</div>${e.lines.map(t => `<p>${t}</p>`).join("")}</div>`;
    if (e.kind === "slip") return `<div class="ev ev-slip"><p class="evh">${esc(e.h)}</p><div class="slipform"><b>${esc(e.lines[0])}</b><span>${esc(e.lines[1])}</span><span class="sig">Dana ✍️</span></div></div>`;
    if (e.kind === "pairs") return `<div class="ev ev-cards"><p class="evh">${esc(e.h)}</p>${e.pairs.map(p => `<div class="pairrow">${miniCard(p[0])}<span class="vs" aria-hidden="true">⚡</span>${miniCard(p[1])}</div>`).join("")}</div>`;
    if (e.kind === "pile") return `<div class="ev ev-cards"><p class="evh">${esc(e.h)}</p><div class="pairrow">${miniCard(e.card)}<span class="pile" aria-hidden="true">⬅ ${e.items}</span></div></div>`;
    if (e.cards) return `<div class="ev ev-cards"><p class="evh">${esc(e.h)}</p><div class="cardrow">${CARDS.map(c => miniCard(c.id)).join("")}</div></div>`;
    return `<div class="ev ${e.kind}"><p class="evh">${esc(e.h)}</p>${e.lines.map(t => `<p>${t}</p>`).join("")}</div>`;
  }
  function checkView(s) {
    const done = !!st.done[s.id];
    let h = `<section class="scene check">${stage({ icon: s.icon, place: s.kicker === "Shift log" ? "Back office" : s.kicker, props: "📋☕", cast: ["dana"], title: s.title })}<div class="panel-body">${head(s)}${lines([["dana", s.intro]])}`;
    if (s.inst) h += `<div class="inst">
        <div><b>👪 Family</b><span>care</span><span class="from" aria-hidden="true">👦</span></div>
        <div><b>🎒 Education</b><span>skills</span><span class="from" aria-hidden="true">🏫</span></div>
        <div><b>⛪ Religion</b><span>meaning</span></div>
        <div><b>💼 Economy</b><span>jobs</span><span class="from" aria-hidden="true">🪪</span></div>
        <div><b>🏛️ Government</b><span>laws</span><span class="from" aria-hidden="true">🚗 🧼</span></div></div>`;
    h += `<div class="clipboard" id="clip"><div class="clip-top" aria-hidden="true"></div><p class="lh">📋 Shift log</p><div class="evidence${s.evidence.length > 1 ? " two" : ""}">${s.evidence.map(evidenceHtml).join("")}</div>
      <p class="q">✏️ <span>${s.q}</span></p>`;
    if (done) {
      h += `<div class="filled-line">${stampHtml("LOGGED ✓", true)}<span class="hand-write">${esc(s.options[0])}</span></div>${s.why ? `<p class="why">${esc(s.why)}</p>` : ""}</div>${nextBtn()}</div></section>`;
      app.innerHTML = h; wireNext(); return;
    }
    h += `<div class="notes" id="qc"></div><p class="msg" id="qmsg" aria-live="polite"></p></div></div></section>`;
    app.innerHTML = h;
    const area = $("qc"), fb = $("qmsg");
    let lastOrder = "";
    function draw() {
      area.innerHTML = "";
      let order = shuffle(s.options.map((t, n) => ({ t, n })));
      if (lastOrder && order.length > 1) { let tries = 0; while (order.map(o => o.n).join() === lastOrder && tries++ < 20) order = shuffle(order); }
      lastOrder = order.map(o => o.n).join();
      order.forEach((o, k) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "note n" + k; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) { st.done[s.id] = true; anim = true; save(); render(); const n = $("nextBtn"); if (n) n.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
          st.wrong[s.id] = (st.wrong[s.id] || 0) + 1; apply({ tips: -1 }, "You filled in a shift log wrong."); save(); hud();
          const clip = $("clip"); if (clip) { clip.classList.remove("shake"); void clip.offsetWidth; clip.classList.add("shake"); }
          locked = true; area.querySelectorAll("button").forEach(x => x.disabled = true);
          let left = isT() ? 0 : LOCK;   // Test T. skips the wrong-answer wait
          const tick = () => {
            if (left <= 0) { locked = false; fb.textContent = "Not quite. " + s.hint + " Try again."; fb.className = "msg"; draw(); return; }
            fb.textContent = "Not quite. " + s.hint + " The choices will mix up. Try again in " + left + "…"; fb.className = "msg bad";
            left--; setTimeout(tick, 1000);
          };
          tick();
        };
        area.appendChild(b);
      });
    }
    locked = false; draw();
  }

  // ---------------- Ending ----------------
  function causedBy(end) {
    const c = st.causes;
    let pick;
    if (end === "wu") pick = c.filter(x => x.k === "wu" && x.d > 0);
    else if (end === "quitCrew") pick = c.filter(x => x.k === "crew" && x.d < 0).sort((a, b) => a.d - b.d);
    else if (end === "quit") pick = c.filter(x => x.k === "stress" && x.d > 0).sort((a, b) => b.d - a.d);
    else if (end === "promo") pick = c.filter(x => (x.k === "trust" || x.k === "crew") && x.d > 0);
    else pick = c.filter(x => (x.k === "trust" || x.k === "crew") && x.d < 0).sort((a, b) => a.d - b.d);
    const seen = new Set(), out = [];
    pick.forEach(x => { if (!seen.has(x.why) && out.length < 3) { seen.add(x.why); out.push(x); } });
    return out;
  }
  function finalHtml() {
    return `<div class="final"><div><span class="fi" aria-hidden="true">💵</span><b>$${st.m.tips}</b><span>tips</span></div><div><span class="fi" aria-hidden="true">${mood(st.m.trust)}</span><b>${st.m.trust}/5</b><span>⭐ Dana</span></div><div><span class="fi" aria-hidden="true">${mood(st.m.crew)}</span><b>${st.m.crew}/5</b><span>🤝 Crew</span></div><div><span class="fi" aria-hidden="true">🔥</span><b>${st.m.stress}/10</b><span>🔥 Stress</span></div><div><span class="fi" aria-hidden="true">📝</span><b>${st.m.wu}/2</b><span>📝 Write-ups</span></div></div>`;
  }
  function endingView(s) {
    const e = ENDINGS[st.ending];
    const cb = causedBy(st.ending);
    app.innerHTML = `<section class="scene ending ${e.good ? "good" : "bad"}">${stage({ icon: "🏁", place: "9:05 PM", props: "🧹🪣", cast: ["dana", "kayla", "marcus"], title: s.title })}<div class="panel-body">
      <div class="end-hero"><div class="nametag${anim ? " swing" : ""}"><span class="nt-hole" aria-hidden="true"></span><span class="nt-co">CEDAR GRILL</span><span class="nt-name">${esc(st.name)}</span><span class="nt-role">${esc(e.tag)}</span></div>
      <div class="end-words"><p class="pk">End of shift</p><h2 class="end-title"><span aria-hidden="true">${e.icon}</span> <span>${esc(e.title)}</span></h2>${stampHtml(e.stamp, e.good)}</div></div>
      ${lines(e.text)}${finalHtml()}
      ${cb.length ? `<div class="caused"><p class="chh">Caused by</p><ul>${cb.map(x => `<li><span>${esc(x.why)}</span> ${deltaHtml({ [x.k]: x.d }, true)}</li>`).join("")}</ul></div>` : ""}
      <p class="endings-note">1 of 4 endings. Your choices picked it.</p>
      ${nextBtn("Write your shift report")}</div></section>`;
    wireNext();
  }

  // ---------------- Writing (Dana's report form) + turn in ----------------
  function writeView(s) {
    const e = ENDINGS[st.ending] || ENDINGS.kept;
    const pg = st.turnedIn ? -1 : (st.wpage || 0);   // one answer per screen; both after turning in
    app.innerHTML = `<section class="scene">${stage({ icon: "✍️", place: "Back office", props: "📋🖊️", cast: ["dana"], title: s.title })}<div class="panel-body">${head(s)}
      <div class="report-form"><div class="rf-head"><span>CEDAR GRILL · END-OF-SHIFT REPORT</span><span class="rf-name">${esc(st.name)}</span></div>
      <p class="rf-end"><span>Your ending:</span> <b>${esc(e.title)}</b></p>
      ${PROMPTS.map((p, k) => `<div class="wq"${pg >= 0 && k !== pg ? " hidden" : ""}><label for="w_${p.id}">${esc(p.label)}</label><p class="stem"><b>Start like this:</b> <span class="starter">${esc(p.stem)}</span></p><textarea id="w_${p.id}" rows="3" data-starter="${esc(isEs() ? T(p.stem) : p.stem)}">${esc(st.writing[p.id] || "")}</textarea></div>`).join("")}
      ${pg === 0 ? `<button type="button" class="big" id="w1Next"><span>Next answer</span> →</button>` : `<button type="button" class="big" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>`}
      <p id="sendMsg" class="msg" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can fix your writing and turn it in again." : ""}</p>
      ${st.turnedIn ? `<p class="turned" id="turnedTag">✓ Turned in</p>` : ""}</div></div></section>`;
    PROMPTS.forEach(p => $("w_" + p.id).addEventListener("input", ev => { st.writing[p.id] = ev.target.value; save(); }));
    if (pg === 0) $("w1Next").onclick = () => {
      const prob = writingProblem(PROMPTS[0]), msg = $("sendMsg");
      if (prob) { msg.textContent = prob; msg.className = /^(For|En) /.test(prob) ? "msg" : "msg bad"; $("w_" + PROMPTS[0].id).focus(); return; }
      st.wpage = 1; save(); render(); const b = $("w_" + PROMPTS[1].id); if (b) b.focus();
    };
    else $("sendBtn").onclick = send;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem(p) {
    if (isT()) return "";   // Test T. (teacher) skips the writing rules
    const box = $("w_" + p.id), v = (box.value || "").trim();
    const es = isEs();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: es ? T(p.stem) : p.stem, source: "from today", sourceEs: "de hoy" });
      if (junk) return (es ? "En " + T(p.short) : "For " + p.short) + ": " + junk;
    }
    if (v.length < p.min) return "Write a little more for: " + p.short + " (1–2 full sentences).";
    if (/_{2,}/.test(v)) return "Fill in the blanks with your own words for: " + p.short + ".";
    const stemText = String(p.stem) + " " + T(p.stem);
    const stemWords = new Set(plain(stemText).match(/[\p{L}']+/gu) || []);
    const fresh = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(w => !stemWords.has(w)));
    if (fresh.size < 6) return "Add more of your own ideas for: " + p.short + ". Use details from today.";
    let groups = p.mustAll.slice();
    const esWords = window.SiteLang && window.SiteLang.must && window.SiteLang.must(p.id);
    if (esWords) groups = groups.map((g, i) => esWords[i] ? g.concat(esWords[i]) : g);
    if (groups.some(g => !g.some(w => new RegExp("(^|[^\\p{L}])" + plain(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu").test(plain(v))))) return p.mustMsg;
    return "";
  }
  function buildAnswers() {
    const a = { "Standard": STANDARD };
    const right = CHECKS.filter(c => st.done[c.id] && !st.wrong[c.id]).length;
    a["First-try correct"] = right + " of " + CHECKS.length;
    const byStd = {};
    CHECKS.forEach(c => { byStd[c.std] = byStd[c.std] || [0, 0]; byStd[c.std][1]++; if (!st.wrong[c.id]) byStd[c.std][0]++; });
    a["First-try by standard"] = Object.keys(byStd).sort().map(k => k + ": " + byStd[k][0] + " of " + byStd[k][1]).join(" · ");
    CHECKS.forEach(c => { const w = st.wrong[c.id] || 0; a[c.short] = c.options[0] + (w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)"); });
    STEPS.forEach(s => {
      const r = st.res[s.id]; if (!r) return;
      if (s.type === "decide") a["Choice · " + s.title.replace(/[“”]/g, "")] = s.choices[r.i].label;
      if (s.type === "rush") a["Choice · " + s.kicker + " (rules bent)"] = r.picked.map(id => RULES[id].text + " [" + TYPE_NAME[RULES[id].type] + "]").join(" + ");
      if (s.type === "juggle") a["Choice · Dinner rush jobs"] = "Did: " + s.tasks.filter(t => !r.missed.includes(t.id)).map(t => t.text).join(", ") + " · Skipped: " + (r.missed.map(id => s.tasks.find(t => t.id === id).text).join(", ") || "none") + " · Asked Kayla: " + (st.jug.asked === "yes" ? "yes, she helped" : st.jug.asked === "no" ? "yes, she refused" : "no");
    });
    const e = ENDINGS[st.ending];
    a["Ending"] = e ? e.title : "";
    a["Caused by"] = causedBy(st.ending).map(x => x.why).join(" · ") || "—";
    a["Final meters"] = "Tips $" + st.m.tips + " · Dana " + st.m.trust + "/5 · Crew " + st.m.crew + "/5 · Stress " + st.m.stress + "/10 · Write-ups " + st.m.wu + "/2";
    PROMPTS.forEach(p => { a["Writing: " + p.short] = ($("w_" + p.id).value || "").trim(); });
    return a;
  }
  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    for (const p of PROMPTS) {
      const prob = writingProblem(p);
      if (prob) { msg.textContent = prob; msg.className = /^(For|En) /.test(prob) ? "msg" : "msg bad"; $("w_" + p.id).focus(); return; }
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in for this activity isn't switched on yet. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }
    btn.disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      btn.textContent = "Turned in ✓"; btn.disabled = false;
      if (!$("turnedTag")) msg.insertAdjacentHTML("afterend", `<p class="turned" id="turnedTag">✓ Turned in</p>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; btn.disabled = false; }
  }

  // ---------------- Render ----------------
  let first = true;
  function render() {
    if (!first) $("welcome").hidden = true;
    first = false;
    hud();
    app.classList.toggle("anim", anim);
    const s = st.step >= 0 ? STEPS[st.step] : null;
    try {
      if (!s) return intro();
      if (s.type === "flip") return flipView(s);
      if (s.type === "decide") return decideView(s);
      if (s.type === "rush") return rushView(s);
      if (s.type === "juggle") return juggleView(s);
      if (s.type === "check") return checkView(s);
      if (s.type === "ending") { if (!st.ending) { st.ending = endingFor(st.m); save(); } return endingView(s); }
      return writeView(s);
    } finally { anim = false; }
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    Object.keys(orders).forEach(k => delete orders[k]);
    lastM = null; save(); render(); window.scrollTo(0, 0);
  };
  if (st.step >= 0) { $("welcome").textContent = "Welcome back, " + st.name + " — you're on step " + (st.step + 1) + " of " + TOTAL + "."; $("welcome").hidden = false; }
  // Read-only test hook (lets automated tests see progress). Students never see it.
  window.__firstShift = { get state() { return JSON.parse(JSON.stringify(st)); }, steps: STEPS.map(s => s.id), choice: (sid, lbl) => STEPS.find(s => s.id === sid).choices.findIndex(c => c.label === lbl) };
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any screen or answer the current one.
  try {
    // Play one screen with the first choice (used by solve, and to fill skipped screens).
    const tFill = s => {
      if (s.type === "flip") CARDS.forEach(c => { st.flips[c.id] = true; });
      else if (s.type === "check") st.done[s.id] = true;
      else if (s.type === "decide" && !st.res[s.id]) choose(s, 0);
      else if (s.type === "rush" && !st.res[s.id]) { st.sel[s.id] = s.cards.slice(0, s.bend); bend(s); }
      else if (s.type === "juggle" && !st.res[s.id]) {
        const j = st.jug, need = Math.min(3 + (j.asked === "yes" ? 2 : 0), s.tasks.length);
        if (j.sel.length !== need) j.sel = s.tasks.slice(0, need).map(t => t.id);
        let d = apply({ stress: 1 }, "Dinner rush hit all at once.");
        if (j.askD) d = addFx(d, j.askD);
        const missed = [];
        s.tasks.forEach(t => { if (!j.sel.includes(t.id)) { missed.push(t.id); d = addFx(d, apply(t.fx, "Missed: " + t.text)); } });
        st.res[s.id] = { missed, d, warn: warnLines() };
      }
      save();
    };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL,
      index: () => Math.max(0, Math.min(st.step, TOTAL - 1)),
      label: i => STEPS[i].short || STEPS[i].title.replace(/[“”]/g, "") || STEPS[i].kicker,
      go: i => {
        if (!st.name) st.name = "Test T.";
        // Walk the shift in order: unplayed screens before this one get the first choice.
        for (let k = 0; k < i; k++) { st.step = k; enterStep(); tFill(STEPS[k]); }
        st.step = i; enterStep(); locked = false; save(); render(); window.scrollTo(0, 0);
      },
      solve: () => { if (st.step < 0) return; locked = false; tFill(STEPS[st.step]); anim = true; render(); }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
