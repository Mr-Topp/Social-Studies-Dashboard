// Gov U1 Day 4 · Founding-Idea Scavenger Hunt — Mr. Toppert's printed handout made online (Fynn, 2026-11-19).
// Same task as the paper Evidence Board: for each founding idea, find the line that proves it, then explain the connection.
// Clicking the line = naming the source + line number + copying the exact words, all in one step.
const L = (id, n, words) => `[[${id}|${n} ${words}]]`;
const DOCS =
  "SOURCE A · MAGNA CARTA (1215)\n"
  + L("L1", 1, "No free man shall be seized, imprisoned, dispossessed, outlawed, exiled or ruined in any way,") + "\n"
  + L("L2", 2, "nor in any way proceeded against, except by the lawful judgment of his peers and the law of the land.") + "\n"
  + L("L3", 3, "To no one will we sell; to no one will we deny or delay right or justice.") + "\n\n"
  + "SOURCE B · MAYFLOWER COMPACT (1620)\n"
  + L("L4", 4, "We … solemnly and mutually, in the Presence of God and one another,") + "\n"
  + L("L5", 5, "covenant and combine ourselves together into a civil Body Politick, for our better Ordering and Preservation;") + "\n"
  + L("L6", 6, "and by Virtue hereof do enact, constitute, and frame, such just and equal Laws, Ordinances, Acts,") + "\n"
  + L("L7", 7, "Constitutions, and Officers, from time to time, as shall be thought most meet and convenient") + "\n"
  + L("L8", 8, "for the general Good of the Colony; unto which we promise all due Submission and Obedience.") + "\n\n"
  + "SOURCE C · DECLARATION OF INDEPENDENCE (1776)\n"
  + L("L9", 9, "We hold these truths to be self-evident, that all men are created equal,") + "\n"
  + L("L10", 10, "that they are endowed by their Creator with certain unalienable Rights,") + "\n"
  + L("L11", 11, "that among these are Life, Liberty and the pursuit of Happiness.") + "\n"
  + L("L12", 12, "That to secure these rights, Governments are instituted among Men,") + "\n"
  + L("L13", 13, "deriving their just powers from the consent of the governed,") + "\n"
  + L("L14", 14, "That whenever any Form of Government becomes destructive of these ends,") + "\n"
  + L("L15", 15, "it is the Right of the People to alter or to abolish it, and to institute new Government.");

const NOTES = `<p><b>Source A · Magna Carta (1215)</b> — Clauses 39–40, modern English translation.<br><b>Source note:</b> These protections first applied only to “free men,” not everyone. The excerpt shows that even a king’s power could be limited by law.</p>
<p><b>Source B · Mayflower Compact (1620)</b> — An agreement among the Plymouth settlers.<br><b>Source note:</b> The compact was signed by 41 male passengers. It created a government by agreement, but it did not include every person living in the colony.</p>
<p><b>Source C · Declaration of Independence (1776)</b> — Opening principles.<br><b>Source note:</b> The Declaration stated big principles, even though many people — including enslaved people, women, and Indigenous peoples — were denied equal political rights in 1776.</p>`;

const FIND = (ans) => ({ type: "pick", ask: "Click the line that proves it:", passage: DOCS, ans, short: "line clicked" });
const WHY = (idea) => ({ type: "write", ask: `In your own words: how do those words show <b>${idea}</b>?`, short: "why it shows " + idea });

window.WS = {
  id: "gov-u1-d4-scavenger-hunt-online",
  title: "Day 4 · Founding-Idea Scavenger Hunt (Online)",
  std: ["SS.9-12.Gov.3"],
  name: "Founding-Idea Scavenger Hunt",
  source: "Mr. Toppert’s Founding-Idea Scavenger Hunt (Magna Carta, Mayflower Compact, Declaration of Independence)",
  hook: ["🔎 Find it · Prove it · Explain it", "America’s founders didn’t invent their big ideas from nothing. Hunt through three famous documents and find where four founding ideas came from."],
  minutes: 20,
  parts: [
    { key: "A", name: "The Evidence Board", plan: "Find the line that proves each of 4 founding ideas, then explain it",
      dir: "<b>The Evidence Board.</b> For each founding idea, click the line from the documents that proves it. Then explain how the words show the idea. Need background? Open the source notes.",
      navLabel: "Idea", ic: "🔎",
      source: { label: "📜 Source notes", title: "About the three sources", html: NOTES },
      items: [
        { text: "<b>1. RULE OF LAW</b><br>Which source shows that people or leaders must follow the law?", ic: "⚖️", short: "Rule of law",
          qs: [FIND(["L2", "L6", "L8"]), WHY("rule of law")] },
        { text: "<b>2. LIMITED GOVERNMENT</b><br>Which source shows that government power has limits?", ic: "✋", short: "Limited government",
          qs: [FIND(["L1", "L2", "L3", "L14", "L15"]), WHY("limited government")] },
        { text: "<b>3. SELF-GOVERNMENT</b><br>Which source shows people joining together to create rules or government?", ic: "🤝", short: "Self-government",
          qs: [FIND(["L4", "L5", "L6", "L12", "L13"]), WHY("self-government")] },
        { text: "<b>4. NATURAL RIGHTS</b><br>Which source names rights people have simply because they are human?", ic: "🧍", short: "Natural rights",
          qs: [FIND(["L9", "L10", "L11"]), WHY("natural rights")] }
      ] },
    { key: "B", name: "Who was left out?", plan: "Use the source notes: who did these ideas leave out?",
      dir: "<b>Who was left out?</b> Each source note says the big idea didn’t cover everyone at first. Open the source notes, then answer.",
      navLabel: "Question", ic: "🚪",
      source: { label: "📜 Source notes", title: "About the three sources", html: NOTES },
      q: { type: "choice", ask: "Who did this document leave out when it was written?", cols: 1,
           opts: [ { v: "notfree", label: "People who were not “free men”", ltr: "A" },
                   { v: "notsigners", label: "People in the colony who were not among the 41 men who signed", ltr: "B" },
                   { v: "denied", label: "Enslaved people, women, and Indigenous peoples", ltr: "C" } ] },
      items: [
        { text: "Source A · Magna Carta (1215)", style: "term", ic: "👑", ans: "notfree" },
        { text: "Source B · Mayflower Compact (1620)", style: "term", ic: "⛵", ans: "notsigners" },
        { text: "Source C · Declaration of Independence (1776)", style: "term", ic: "🔔", ans: "denied" },
        { text: "These ideas didn’t cover everyone at first. Pick <b>one</b> founding idea. Why does it still matter today?", ic: "✍️", short: "Why it still matters",
          qs: [{ type: "write", ask: "Name the idea, then explain why it still matters today." }] }
      ] }
  ]
};
