// iCivics "For the President: All in a Day’s Work" — activity pages online: A. I’ve Got the Power!, B. So Many Laws, So Little Time!, C. Executive Thinking!
window.WS = {
  id: "gov-u5-d1-for-the-president-online",
  title: "Day 1 · For the President: All in a Day’s Work: Activity Pages (Online)",
  std: ["SS.9-12.Gov.7"],
  name: "For the President, All in a Day’s Work",
  source: "iCivics, “For the President, All in a Day’s Work” (© 2023 iCivics, Inc.)",
  hook: ["🇺🇸 The Coolest Job in the Country?", "Troops, treaties, pardons, vetoes — match what the president actually does to what the Constitution says."],
  paper: "Use your printed reading pages if you need help.",
  minutes: 25,
  parts: [
    { key:"A", name:"I’ve Got the Power!", plan:"Match 14 jobs to the Constitution",
      dir:"<b>I’ve Got the Power!</b> Match each responsibility of the president and vice president with the correct power or duty found in the Constitution.",
      navLabel:"Job", ic:"💼",
      q:{ type:"choice", ask:"Powers &amp; Duties Listed in the Constitution:", cols:3, compact:true, unique:true, opts:[
        {v:"A",ltr:"A.",label:"Power to carry out the laws"},
        {v:"B",ltr:"B.",label:"Must protect and defend the Constitution"},
        {v:"C",ltr:"C.",label:"Commander in Chief of the military"},
        {v:"D",ltr:"D.",label:"Elected with the president to hold office in the executive branch"},
        {v:"E",ltr:"E.",label:"May ask advisors, who lead parts of the government, for their opinion on different issues"},
        {v:"F",ltr:"F.",label:"Is the president of the Senate"},
        {v:"G",ltr:"G.",label:"Pardon someone for a crime, canceling their punishment"},
        {v:"H",ltr:"H.",label:"Make treaties with other countries (with Senate approval)"},
        {v:"I",ltr:"I.",label:"Take office as president if the current president dies, resigns, or is unable to do the job"},
        {v:"J",ltr:"J.",label:"Choose new Supreme Court justices (with Senate approval)"},
        {v:"K",ltr:"K.",label:"Make recommendations to Congress about what laws are needed"},
        {v:"L",ltr:"L.",label:"Update Congress on how things are going in the country"},
        {v:"M",ltr:"M.",label:"Sign (approve) or veto (reject) bills from Congress"},
        {v:"N",ltr:"N.",label:"Can vote in the Senate if the senators are equally divided on a vote"} ] },
      items:[
        {who:"President’s Responsibilities", text:"1. Lead weekly meetings where I ask the leaders of executive branch departments for advice on how to handle the country’s most difficult problems.", style:"long", ans:"E"},
        {who:"President’s Responsibilities", text:"2. Go to Congress and give my yearly “State of the Union” speech on what’s happening in the U.S.", style:"long", ans:"L"},
        {who:"President’s Responsibilities", text:"3. Decide whether to approve or reject a bill that Congress has sent me.", style:"long", ans:"M"},
        {who:"President’s Responsibilities", text:"4. Follow the Constitution and the law even if I disagree with it.", style:"long", ans:"B"},
        {who:"President’s Responsibilities", text:"5. Decide whether to send more troops into war knowing that some will die, but it will keep the country safe.", style:"long", ans:"C"},
        {who:"President’s Responsibilities", text:"6. Make sure the Department of Homeland Security properly carries out new airport safety laws that will anger some travelers.", style:"long", ans:"A"},
        {who:"President’s Responsibilities", text:"7. Hold a press conference where I ask Congress to spend more money on space exploration.", style:"long", ans:"K"},
        {who:"President’s Responsibilities", text:"8. Decide whether to let someone out of prison based on the prisoner’s good conduct and particular circumstances.", style:"long", ans:"G"},
        {who:"President’s Responsibilities", text:"9. Negotiate an agreement with another country that would lower the taxes you both add to the sale of imported items.", style:"long", ans:"H"},
        {who:"President’s Responsibilities", text:"10. Choose a new Supreme Court justice to replace one who is retiring.", style:"long", ans:"J"},
        {who:"Vice President’s Responsibilities", text:"11. Take over as president if I’m needed.", style:"long", ans:"I"},
        {who:"Vice President’s Responsibilities", text:"12. Act as leader of the Senate.", style:"long", ans:"F"},
        {who:"Vice President’s Responsibilities", text:"13. Cast a tiebreaking vote in the Senate.", style:"long", ans:"N"},
        {who:"Vice President’s Responsibilities", text:"14. Work with the president to run the executive branch.", style:"long", ans:"D"}
      ] },
    { key:"B", name:"So Many Laws, So Little Time!", plan:"Match 8 departments to their jobs",
      dir:"<b>So Many Laws, So Little Time!</b> The executive branch is in charge of carrying out thousands of laws, but the president doesn’t do this alone. Departments inside the executive branch are responsible for carrying out certain kinds of laws. Complete the table by matching each executive department to its function.",
      navLabel:"Function", ic:"🏢",
      q:{ type:"choice", ask:"Which executive department?", cols:4, big:true, unique:true, opts:[
        {v:"Justice",label:"Justice",em:"⚖️"},{v:"Education",label:"Education",em:"🎓"},{v:"Treasury",label:"Treasury",em:"💵"},{v:"Defense",label:"Defense",em:"🎖️"},
        {v:"HHS",label:"Health & Human Services",em:"🩺"},{v:"Homeland",label:"Homeland Security",em:"🛂"},{v:"Agriculture",label:"Agriculture",em:"🌽"},{v:"Transportation",label:"Transportation",em:"🛣️"} ] },
      items:[
        {text:"1. Works to protect the country against terrorism and make sure the borders are safe.", ans:"Homeland"},
        {text:"2. Makes coins and paper money, tries to help the economy, and collects taxes.", ans:"Treasury"},
        {text:"3. Keeps the United States safe using the Army, Navy, Marines, Air Force, and other military resources.", ans:"Defense"},
        {text:"4. Enforces federal laws, prevents crime, and punishes those convicted of federal crimes.", ans:"Justice"},
        {text:"5. Supports farmers, makes sure our food is safe, and gives recommendations about good nutrition.", ans:"Agriculture"},
        {text:"6. Works to protect the health of all Americans and offers medical and basic services to people in need.", ans:"HHS"},
        {text:"7. Builds and maintains federal highways and railroads, makes rules for air travel, and promotes transportation safety.", ans:"Transportation"},
        {text:"8. Provides funding to public schools and helps students pay for college.", ans:"Education"}
      ] },
    { key:"C", name:"Executive Thinking!", plan:"Answer 3 big questions",
      dir:"<b>Executive Thinking!</b> It takes a lot of work to keep the executive branch running smoothly. Think about the questions below. Write down some main points, then discuss them with a partner.",
      navLabel:"Question", ic:"💭", q:{type:"write"},
      items:[
        {text:"1. How do you think the president and vice president work to accomplish the overall party goals?", style:"long"},
        {text:"2. What is the vice president’s role in Congress?", style:"long"},
        {text:"3. Do you think limits on the president’s term are important? Explain.", style:"long"}
      ] }
  ]
};
