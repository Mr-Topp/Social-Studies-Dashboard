// Gov U4 Day 2 · Build the Bill's Journey — Mr. Toppert's printed "Bill to Law Poster" cut-outs made online (Fynn, 2026-11-19).
// Paper task: put the six cards in order, add a title and arrows. Online: number the six cards (shown out of order),
// then "What could stop it?" on the three spots a bill can get stuck, then title the poster + explain the hardest step.
window.WS = {
  id: "gov-u4-d2-bills-journey-online",
  title: "Day 2 · Build the Bill’s Journey (Online)",
  std: ["SS.9-12.Gov.6"],
  name: "Build the Bill’s Journey",
  source: "Mr. Toppert’s “Build the Bill’s Journey” poster cut-outs",
  hook: ["📜 From Idea to Law", "Thousands of bills are introduced in Congress every session — and most never become law. Put a bill’s journey in order and find where it can get stuck."],
  minutes: 15,
  parts: [
    { key: "A", name: "Put the Cards in Order", plan: "Number the 6 cards of a bill’s journey, 1 to 6",
      dir: "<b>Build the Bill’s Journey.</b> The six cards are mixed up. Give each card its step number, 1 to 6, from the first step to the last. Each number is used once.",
      navLabel: "Card", ic: "🗂️",
      source: { label: "🗂️ See all 6 cards", title: "The six cards (mixed up)", html: "<p>🪑 <b>FLOOR DEBATE</b> — The full chamber debates and amends the bill.</p><p>🖊️ <b>PRESIDENTIAL ACTION</b> — Signed into law — or vetoed.</p><p>🎤 <b>INTRODUCTION</b> — A sponsor introduces the bill in the House or Senate.</p><p>🏛️ <b>BOTH CHAMBERS AGREE</b> — The House and Senate pass the same version.</p><p>💡 <b>IDEA</b> — A problem or need inspires a bill.</p><p>🔍 <b>COMMITTEE REVIEW</b> — The bill is studied, changed, or killed in committee.</p>" },
      q: { type: "choice", ask: "Which step is this in the bill’s journey?", cols: 3, unique: true,
           opts: [ { v: "1", label: "1" }, { v: "2", label: "2" }, { v: "3", label: "3" }, { v: "4", label: "4" }, { v: "5", label: "5" }, { v: "6", label: "6" } ] },
      items: [
        { text: "<b>FLOOR DEBATE</b><br>The full chamber debates and amends the bill.", ic: "🪑", ans: "4", short: "Floor debate" },
        { text: "<b>PRESIDENTIAL ACTION</b><br>Signed into law — or vetoed.", ic: "🖊️", ans: "6", short: "Presidential action" },
        { text: "<b>INTRODUCTION</b><br>A sponsor introduces the bill in the House or Senate.", ic: "🎤", ans: "2", short: "Introduction" },
        { text: "<b>BOTH CHAMBERS AGREE</b><br>The House and Senate pass the same version.", ic: "🏛️", ans: "5", short: "Both chambers agree" },
        { text: "<b>IDEA</b><br>A problem or need inspires a bill.", ic: "💡", ans: "1", short: "Idea" },
        { text: "<b>COMMITTEE REVIEW</b><br>The bill is studied, changed, or killed in committee.", ic: "🔍", ans: "3", short: "Committee review" }
      ] },
    { key: "B", name: "What Could Stop It?", plan: "3 spots where a bill can get stuck",
      dir: "<b>What could stop it?</b> Most bills never become law. Pick what happens at each of these three spots.",
      navLabel: "Spot", ic: "🚧",
      items: [
        { text: "The committee doesn’t like the bill. What can happen to it?", ic: "🔍", short: "Committee doesn't like it",
          qs: [{ type: "choice", ans: "B", opts: [
            { v: "A", label: "It goes straight to the President", ltr: "A" },
            { v: "B", label: "It can be changed, or it can be killed and never get a vote", ltr: "B" },
            { v: "C", label: "It automatically becomes a law", ltr: "C" },
            { v: "D", label: "The Supreme Court decides if it moves on", ltr: "D" } ] }] },
        { text: "The House and Senate pass <b>different</b> versions of the bill. What happens next?", ic: "🏛️", short: "Different versions",
          qs: [{ type: "choice", ans: "C", opts: [
            { v: "A", label: "The House version wins because the House is bigger", ltr: "A" },
            { v: "B", label: "The President picks which version to sign", ltr: "B" },
            { v: "C", label: "They work out one version, and both chambers vote on it again", ltr: "C" },
            { v: "D", label: "The bill becomes two separate laws", ltr: "D" } ] }] },
        { text: "The President vetoes the bill. Is the bill dead forever?", ic: "🖊️", short: "Veto",
          qs: [{ type: "choice", ans: "D", opts: [
            { v: "A", label: "Yes — a veto always ends the bill", ltr: "A" },
            { v: "B", label: "No — the states vote on it next", ltr: "B" },
            { v: "C", label: "No — the Supreme Court can sign it instead", ltr: "C" },
            { v: "D", label: "Not always — 2/3 of both the House and Senate can override the veto", ltr: "D" } ] }] }
      ] },
    { key: "C", name: "Finish Your Poster", plan: "Title your poster + the hardest step",
      dir: "<b>Finish your poster.</b> Every poster needs a title — and a point.",
      navLabel: "Task", ic: "🖼️",
      items: [
        { text: "Give your Bill’s Journey poster a title.", ic: "🏷️", short: "Poster title",
          qs: [{ type: "write", line: true, ask: "Poster title" }] },
        { text: "Which step do you think is the <b>hardest</b> for a bill to get past? Explain why.", ic: "✍️", short: "Hardest step",
          qs: [{ type: "write", ask: "The hardest step is … because …" }] }
      ] }
  ]
};
