// Gov U1 Day 5 · Fixing the Flaws: Articles of Confederation vs. Constitution — Mr. Toppert's printed handout made online (Fynn, 2026-11-19).
// Same tasks as the paper: chart (pop-up), multiple choice (6), fill-in-the-blanks (7), short answer (8), comic strip.
// The comic strip becomes "Comic captions": students pick which flaw each panel fixes and write the caption (no drawing).
const CHART = `<table style="width:100%;border-collapse:collapse;font-size:15px">
<tr><th style="text-align:left;border-bottom:2px solid #ccc;padding:6px">Weakness in the Articles of Confederation</th><th style="text-align:left;border-bottom:2px solid #ccc;padding:6px">How the Constitution fixed it</th></tr>
<tr><td style="padding:6px;border-bottom:1px solid #eee">Congress had no power to tax</td><td style="padding:6px;border-bottom:1px solid #eee">Gave Congress the power to collect taxes, so it no longer had to rely on state donations <i>(Article I, Section 8)</i></td></tr>
<tr><td style="padding:6px;border-bottom:1px solid #eee">Congress had no power to regulate trade</td><td style="padding:6px;border-bottom:1px solid #eee">Gave Congress the power to regulate trade with foreign nations and between states <i>(Article I, Section 8)</i></td></tr>
<tr><td style="padding:6px;border-bottom:1px solid #eee">Congress had no power to enforce laws</td><td style="padding:6px;border-bottom:1px solid #eee">Created the Executive Branch to enforce laws <i>(Article II)</i></td></tr>
<tr><td style="padding:6px;border-bottom:1px solid #eee">No national court system</td><td style="padding:6px;border-bottom:1px solid #eee">Created the Supreme Court (Judicial Branch) <i>(Article III)</i></td></tr>
<tr><td style="padding:6px;border-bottom:1px solid #eee">No central leadership</td><td style="padding:6px;border-bottom:1px solid #eee">Created the office of the President (Executive Branch) <i>(Article II)</i></td></tr>
<tr><td style="padding:6px;border-bottom:1px solid #eee">No national armed forces</td><td style="padding:6px;border-bottom:1px solid #eee">Gave Congress the power to raise and support a permanent military <i>(Article I, Section 8)</i></td></tr>
<tr><td style="padding:6px">Changes required all 13 states to agree</td><td style="padding:6px">Allowed amendments with 2/3 of Congress and 3/4 of the states</td></tr>
</table>`;
const SRC = { label: "📋 Fixing the Flaws chart", title: "Fixing the Flaws: Articles of Confederation vs. Constitution", html: CHART };
const ABCD = (a, b, c, d) => [ { v: "A", label: a, ltr: "A" }, { v: "B", label: b, ltr: "B" }, { v: "C", label: c, ltr: "C" }, { v: "D", label: d, ltr: "D" } ];
const FLAWS = [
  { v: "tax", label: "Congress couldn’t tax" }, { v: "trade", label: "Congress couldn’t regulate trade" },
  { v: "enforce", label: "No one to enforce laws" }, { v: "courts", label: "No national courts" },
  { v: "leader", label: "No national leader" }, { v: "army", label: "No national army" },
  { v: "unanimous", label: "All 13 states had to agree" }
];
const BANK = ["taxes", "trade", "Executive", "Legislative", "court", "President", "Congress", "military", "states"];

window.WS = {
  id: "gov-u1-d5-fixing-flaws-online",
  title: "Day 5 · Fixing the Flaws: Articles of Confederation (Online)",
  std: ["SS.9-12.Gov.3"],
  name: "Fixing the Flaws",
  source: "Mr. Toppert’s “Fixing the Flaws of the Articles of Confederation” handout",
  hook: ["🔧 Fixing the Flaws", "America’s first government was too weak to work. Find out what broke — and how the Constitution fixed it."],
  paper: "Open the 📋 Fixing the Flaws chart any time — it has everything you need.",
  minutes: 30,
  parts: [
    { key: "A", name: "Multiple Choice", plan: "6 multiple-choice questions",
      dir: "<b>Multiple Choice.</b> Use the Fixing the Flaws chart to pick the best answer.",
      navLabel: "Question", ic: "🔧", source: SRC,
      items: [
        { text: "What did the Constitution solve by allowing Congress to collect taxes?", short: "Congress collects taxes",
          qs: [{ type: "choice", opts: ABCD("Trade disagreements", "Lack of money for government", "Border disputes", "Lack of military"), ans: "B" }] },
        { text: "What new branch was created to enforce national laws?", short: "Branch that enforces laws",
          qs: [{ type: "choice", opts: ABCD("Judicial", "Legislative", "Executive", "States"), ans: "C" }] },
        { text: "Which part of government was added to settle disputes and interpret laws?", short: "Settles disputes",
          qs: [{ type: "choice", opts: ABCD("Executive Branch", "Supreme Court", "Military", "State governments"), ans: "B" }] },
        { text: "Who leads the Executive Branch under the Constitution?", short: "Leads Executive Branch",
          qs: [{ type: "choice", opts: ABCD("Speaker of the House", "Chief Justice", "The President", "Vice President"), ans: "C" }] },
        { text: "What did Congress gain the power to do under the Constitution for national defense?", short: "National defense power",
          qs: [{ type: "choice", opts: ABCD("Create a state police", "Form militias", "Raise and support armies", "Hire guards"), ans: "C" }] },
        { text: "How is the Constitution amended?", short: "How amended",
          qs: [{ type: "choice", opts: ABCD("All states must agree", "3/4 of states and 2/3 of Congress", "President signs it", "By popular vote"), ans: "B" }] }
      ] },
    { key: "B", name: "Fill in the Blanks", plan: "7 fill-in-the-blanks from a word bank",
      dir: "<b>Fill in the Blanks.</b> Pick the correct word to complete each sentence. Each word is used once, and some words are not used.",
      navLabel: "Blank", ic: "✏️", source: SRC,
      q: { type: "choice", ask: "Which word goes in the blank?", cols: 3, unique: true, compact: true, opts: BANK },
      items: [
        { text: "Congress had no power to collect ______ under the Articles, which made it hard to raise money.", ans: "taxes", short: "no power to collect ___" },
        { text: "The Constitution gave Congress power to regulate ______.", ans: "trade", short: "regulate ___" },
        { text: "The ______ Branch was created to enforce laws.", ans: "Executive", short: "___ Branch enforces laws" },
        { text: "The Constitution created a national ______ system to settle disputes.", ans: "court", short: "national ___ system" },
        { text: "The ______ leads the Executive Branch of the government.", ans: "President", short: "___ leads Executive" },
        { text: "Congress was given the power to raise and support a permanent ______.", ans: "military", short: "permanent ___" },
        { text: "Changes to the Constitution need approval from ______ of Congress and ______ of the states.", short: "Amendment approval",
          qs: [ { type: "choice", ask: "First blank: how much of Congress?", cols: 4, compact: true, unique: false, opts: ["1/2", "2/3", "3/4", "All"], ans: "2/3", short: "Congress" },
                { type: "choice", ask: "Second blank: how many of the states?", cols: 4, compact: true, unique: false, opts: ["1/2", "2/3", "3/4", "All"], ans: "3/4", short: "states" } ] }
      ] },
    { key: "C", name: "Short Answer", plan: "8 short answers in your own words",
      dir: "<b>Short Answer.</b> Answer each question in 1–2 sentences, in your own words.",
      navLabel: "Question", ic: "💬", source: SRC,
      q: { type: "write" },
      items: [
        { text: "1. Why is it important for the government to be able to collect taxes?", short: "Why collect taxes" },
        { text: "2. Why would it be a problem if every state had different rules about trade and taxes?", short: "Different state rules" },
        { text: "3. Why is it a problem if laws are made but not enforced?", short: "Laws not enforced" },
        { text: "4. What might happen without a national court system to settle disputes?", short: "No national courts" },
        { text: "5. Why is it important to have a President or national leader?", short: "Why a President" },
        { text: "6. What could happen to a country with no national military?", short: "No national military" },
        { text: "7. Why do you think requiring all 13 states to agree on changes was unrealistic?", short: "All 13 must agree" },
        { text: "8. Which fix do you think was the most important, and why?", short: "Most important fix" }
      ] },
    { key: "D", name: "Comic Captions", plan: "Superhero comic: 5 panels, pick the flaw + write the caption",
      dir: "<b>Comic Strip.</b> The <b>Constitution is a superhero</b> who goes around fixing problems caused by the Articles of Confederation. For each of your 5 comic panels, pick the problem the Constitution fixes, then write a short caption for that panel: what was going wrong, and how the Constitution fixes it.",
      navLabel: "Panel", ic: "🦸",
      source: SRC,
      items: [1, 2, 3, 4, 5].map(n => ({
        text: `Panel ${n}`, style: "term", short: `Panel ${n}`,
        qs: [ { type: "choice", ask: "Which problem does the Constitution fix in this panel?", cols: 2, compact: true, unique: true, free: true, opts: FLAWS, short: "problem" },
              { type: "write", ask: "Caption: what’s going wrong, and how does the Constitution fix it?", short: "caption" } ]
      }))
    }
  ]
};
