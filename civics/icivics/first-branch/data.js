// iCivics "First Branch: Legislative" — activity pages online: A. Congressional Breakdown, B. Shaping Congress, C. Lawmaking, D/E. Your Representative/Senator and You.
const BILL = `<p><b>1. The Proposal.</b> A representative writes a bill and gets support from others in the House.</p>
<p><b>2. The Introduction.</b> The bill is assigned a number and is read aloud on the House floor.</p>
<p><b>3. The Committee Report.</b> The bill is sent to a committee for a close review. If the committee approves, the bill will be sent to all members of the House.</p>
<p><b>4. The Floor Debate.</b> In the House chamber, members debate whether to support or oppose the bill. The bill is read again, and members suggest changes.</p>
<p><b>5. The Vote.</b> If changes are made, the bill is read again. Then, the House votes on the bill. Representatives can vote “yes,” “no,” or “present” (if they don’t want to vote on that particular bill).</p>
<p><b>6. The Handoff.</b> The bill is sent to the Senate, where it goes through the same debate. Often, changes are made, and the Senate votes to approve the bill with the changes.</p>
<p><b>7. The Compromise.</b> Members of the House and Senate form a “conference committee” to work out a compromise bill that both chambers can accept.</p>
<p><b>8. Another Vote.</b> The House and Senate each vote on the compromise bill. The bill can’t move on unless both chambers pass the same version.</p>
<p><b>9. To the President!</b> Finally, the bill lands on the president’s desk. They can: • sign the bill, and it becomes law. • ignore the bill. If Congress is in session, the bill automatically becomes law after 10 days. If not, it doesn’t. • veto the bill. If this happens, Congress can override the veto if 2/3 of the members vote in favor.</p>`;
const L = (ask)=>({type:"write", line:true, ask, short:ask});
window.WS = {
  id: "gov-u4-d1-first-branch-online",
  title: "Day 1 · First Branch: Legislative: Activity Pages (Online)",
  std: ["SS.9-12.Gov.6"],
  name: "First Branch: Legislative",
  source: "iCivics, “First Branch: Legislative” (© 2025 iCivics, Inc.)",
  hook: ["🏛️ Meet Congress", "435 + 100 people make the laws for 340 million. How does that even work — and who speaks for YOU?"],
  paper: "Use your printed reading pages if you need help.",
  minutes: 35,
  parts: [
    { key:"A", name:"Congressional Breakdown", plan:"House vs. Senate organizer",
      dir:"<b>Congressional Breakdown.</b> What are the differences between the House and the Senate? Complete the graphic organizer using what you learned from the reading.",
      navLabel:"Box", ic:"🗂️",
      items:[
        {who:"House of Representatives", text:"Number of Members", ic:"🏠", qs:[{type:"choice", cols:4, big:true, ans:"435", opts:["50","100","435","538"]}]},
        {who:"Senate", text:"Number of Members", ic:"🏛️", qs:[{type:"choice", cols:4, big:true, ans:"100", opts:["50","100","435","538"]}]},
        {who:"House of Representatives", text:"Eligibility Requirements (age, etc.)", ic:"🏠", qs:[{type:"choice", ans:"h", opts:[
          {v:"h",label:"25 years or older; citizen for 7 years; must live in the state they will represent if elected"},
          {v:"s",label:"30 years or older; citizen for 9 years; must live in the state they will represent if elected"},
          {v:"p",label:"35 years or older; born a citizen; lived in the U.S. for 14 years"}]}]},
        {who:"Senate", text:"Eligibility Requirements (age, etc.)", ic:"🏛️", qs:[{type:"choice", ans:"s", opts:[
          {v:"h",label:"25 years or older; citizen for 7 years; must live in the state they will represent if elected"},
          {v:"s",label:"30 years or older; citizen for 9 years; must live in the state they will represent if elected"},
          {v:"p",label:"35 years or older; born a citizen; lived in the U.S. for 14 years"}]}]},
        {who:"House of Representatives", text:"Length of Term", ic:"🏠", qs:[{type:"choice", cols:4, big:true, ans:"2", opts:[{v:"2",label:"2 years"},{v:"4",label:"4 years"},{v:"6",label:"6 years"},{v:"life",label:"Life"}]}]},
        {who:"Senate", text:"Length of Term", ic:"🏛️", qs:[{type:"choice", cols:4, big:true, ans:"6", opts:[{v:"2",label:"2 years"},{v:"4",label:"4 years"},{v:"6",label:"6 years"},{v:"life",label:"Life"}]}]},
        {who:"House of Representatives", text:"Unique Powers", ic:"🏠", qs:[{type:"write", ask:"What powers does only the House have?"}], short:"House unique powers"},
        {who:"Senate", text:"Unique Powers", ic:"🏛️", qs:[{type:"write", ask:"What powers does only the Senate have?"}], short:"Senate unique powers"},
        {who:"Both houses", text:"List the shared responsibilities of both houses.", ic:"🤝", qs:[{type:"write"}], short:"Shared responsibilities"}
      ] },
    { key:"B", name:"Shaping Congress", plan:"How do 5 things shape Congress?",
      dir:"<b>Shaping Congress.</b> Consider the characteristics below. Complete the chart to explore how they might factor into how Congress works and what bills they decide to work on.",
      navLabel:"Trait", ic:"🧩",
      q:{type:"write", ask:"How does this impact how Congress works?"},
      items:[
        {text:"Senators serve 6-year terms", style:"term", ic:"⏳"},
        {text:"Representatives serve 2-year terms", style:"term", ic:"⏱️"},
        {text:"Necessary and Proper Clause", style:"term", ic:"🧷"},
        {text:"Congressional Committees", style:"term", ic:"👥"},
        {text:"Political Parties", style:"term", ic:"🐘🫏"}
      ] },
    { key:"C", name:"Lawmaking", plan:"How a bill becomes a law (4 questions)",
      dir:"<b>Lawmaking.</b> Review the diagram illustrating how a bill becomes a law. Then answer the questions.",
      navLabel:"Question", ic:"📜",
      source:{label:"📜 Bill → Law diagram", title:"How a Bill Becomes a Law", html:BILL},
      q:{type:"write"},
      items:[
        {text:"1. At what step(s) in this process would it be best for you to contact your representative to let them know how you feel about a bill? Explain.", style:"long"},
        {text:"2. A bill can die at any step in this process. Which step do you think is the most difficult to pass? Explain.", style:"long"},
        {text:"3. Why do you think the same version of a bill must pass in both the House and Senate?", style:"long"},
        {text:"4. Do you think Congress should change any of the steps? Explain your answer.", style:"long"}
      ] },
    { key:"D", name:"Your Representative and You", plan:"Look up your U.S. Representative",
      dir:"<b>Your Representative and You.</b> Use the website below to locate your representative and view their information. Then complete the chart and answer the question below.",
      navLabel:"Step", ic:"🧑‍💼",
      items:[
        {text:"Find your representative: <a href=\"https://www.house.gov/representatives/find-your-representative\" target=\"_blank\" rel=\"noopener\">house.gov/representatives/find-your-representative</a>", style:"long", short:"Representative facts",
         qs:[L("Name"), L("Age"), L("State/District Represented"), L("Party")]},
        {text:"Keep going on your representative’s page.", style:"long", short:"Representative record",
         qs:[L("Year Elected"), L("Terms Served"), L("Committee and Caucus Assignments")]},
        {text:"1. Are your representative’s committee and caucus roles focused on issues that are important to you? Explain.", style:"long", qs:[{type:"write"}], short:"Representative’s roles and my issues"}
      ] },
    { key:"E", name:"Your Senator and You", plan:"Look up one of your U.S. Senators",
      dir:"<b>Your Senator and You.</b> Use the website below to locate your senators. Choose one and view their information. Then complete the chart and answer the question below.",
      navLabel:"Step", ic:"🧑‍⚖️",
      items:[
        {text:"Find your senators: <a href=\"https://www.senate.gov/senators/senators-contact.htm\" target=\"_blank\" rel=\"noopener\">senate.gov/senators/senators-contact.htm</a>", style:"long", short:"Senator facts",
         qs:[L("Name"), L("Age"), L("State Represented"), L("Party")]},
        {text:"Keep going on your senator’s page.", style:"long", short:"Senator record",
         qs:[L("Year Elected"), L("Terms Served"), L("Committee and Caucus Assignments")]},
        {text:"1. Are your senator’s committee and caucus roles focused on issues that are important to you? Explain.", style:"long", qs:[{type:"write"}], short:"Senator’s roles and my issues"}
      ] }
  ]
};
