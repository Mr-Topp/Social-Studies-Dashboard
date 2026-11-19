// iCivics "Second Branch: The Executive" (HS) — activity pages online: A. Presidential Lingo, B. Balancing Act, C. Constitutional Comprehension,
// D. Executive Action, E. Dictators Denied, F. Help Wanted!
const ART2 = "<p>“He shall from time to time give to the Congress Information of the State of the Union, and recommend to their Consideration such Measures as he shall judge necessary and expedient [practical]; he may, on extraordinary Occasions, convene [call together] both Houses, or either of them, and in Case of Disagreement between them, with Respect to the Time of Adjournment [ending], he may adjourn them to such Time as he shall think proper; he shall receive Ambassadors and other public Ministers; he shall take Care that the Laws be faithfully executed [carried out], and shall Commission [appoint] all the Officers of the United States.”</p>";
const AVALON = "After ruling for 20 years, South Avalon’s leader, Hans Mondo, declares war on the neighboring country of North Avalon. He orders the military to invade and destroy everything in its path. Lawmakers are furious that he didn’t tell them about his military plans. Mondo adjourns the entire legislative branch. He makes a law that removes the rights of all North Avalonians living in the war zone. Then he makes a law that requires all South Avalonians who are 16 or older to serve in the military. And he orders any critics of the government to be arrested. Mondo then creates a treaty with several foreign nations to get more powerful weapons in return for any gold and other precious metals the military can confiscate from North Avalon.";
const COFFEE = `<table><tr><th>Job Title and Job Overview</th><td><b>Coffee Shop Manager.</b> Do you love the smell of coffee in the morning? Do you like working with a team and making people smile? Then this might be the job for you!</td></tr>
<tr><th>Responsibilities and Duties</th><td>A typical day might include: • Preparing coffee and donuts • Setting up cash registers • Managing 6–8 employees • Making work schedules • Communicating with vendors • Receiving supply shipments • Dealing with customer complaints</td></tr>
<tr><th>Limits</th><td>Challenges you’ll encounter: - Constant customer complaints - Supplies that don’t arrive - Equipment breaks down - Employees don’t show up</td></tr>
<tr><th>Special Skills / Qualifications</th><td>You’re good at: Writing specials on a chalkboard; Making every type of coffee known; Wearing an apron. You must have: 5 years of management experience; Patience and confidence; Experience working on a team</td></tr>
<tr><th>Job Details</th><td>Things you should know: This job is full-time. Salary determined by experience.</td></tr></table>`;
const DEPTS = ["Agriculture","Commerce","Defense","Education","Energy","Health and Human Services","Homeland Security","Housing and Urban Development","Interior","Justice","Labor","State","Transportation","Treasury","Veterans Affairs"].map(d=>({v:d,label:"Department of "+d}));
window.WS = {
  id: "gov-u5-d2-second-branch-online",
  title: "Day 2 · Second Branch: The Executive: Activity Pages (Online)",
  std: ["SS.9-12.Gov.7"],
  name: "Second Branch: The Executive",
  source: "iCivics, “Second Branch: The Executive” (© 2023 iCivics, Inc.)",
  hook: ["🦅 Powerful — But Not a King", "The president has huge powers, and the Constitution puts a leash on every one of them. Find the limits."],
  paper: "Use your printed reading pages if you need help (especially for Parts D and F).",
  minutes: 40,
  parts: [
    { key:"A", name:"Presidential Lingo", plan:"Fill 8 blanks from the word box",
      dir:"<b>Presidential Lingo.</b> Complete each sentence using the words in the box.",
      navLabel:"Sentence", ic:"📝",
      q:{ type:"choice", ask:"Word box:", cols:4, unique:true, opts:["cabinet","religion","executive branch","commander in chief","veto","pardon","oath","executive departments"] },
      items:[
        {text:"1. The _______ serves to carry out the laws.", ans:"executive branch"},
        {text:"2. A president can issue a(n) _______, which forgives a crime entirely.", ans:"pardon"},
        {text:"3. The president must take a(n) _______ to promise to uphold and defend the Constitution.", ans:"oath"},
        {text:"4. Article VI, Section 3 of the Constitution says that someone’s _______ can’t be used as a factor to decide if a candidate is qualified to be president.", ans:"religion"},
        {text:"5. The heads of the 15 main departments make up the president’s _______.", ans:"cabinet"},
        {text:"6. The president is the _______ of the armed forces.", ans:"commander in chief"},
        {text:"7. If a president doesn’t agree with a law Congress passes, they can _______ it.", ans:"veto"},
        {text:"8. The _______ are assigned the task of putting laws into action.", ans:"executive departments"}
      ] },
    { key:"B", name:"Balancing Act", plan:"Match 5 powers to Congress’s checks",
      dir:"<b>Balancing Act.</b> Match the president’s powers with the limits that restrict them.",
      navLabel:"Power", ic:"⚖️",
      q:{ type:"choice", ask:"Congress’s Check:", cols:2, unique:true, opts:[
        {v:"A",ltr:"A.",label:"two-thirds of the Senate must approve"},
        {v:"B",ltr:"B.",label:"two-thirds of Congress can overrule"},
        {v:"C",ltr:"C.",label:"only Congress can declare war"},
        {v:"D",ltr:"D.",label:"Congress makes the laws"},
        {v:"E",ltr:"E.",label:"majority of Senators must approve"} ] },
      items:[
        {who:"President’s Power", text:"1. Commander in chief", style:"term", ans:"C"},
        {who:"President’s Power", text:"2. Appoint ambassadors and federal judges", style:"term", ans:"E"},
        {who:"President’s Power", text:"3. Veto bills passed by Congress", style:"term", ans:"B"},
        {who:"President’s Power", text:"4. Execute the laws", style:"term", ans:"D"},
        {who:"President’s Power", text:"5. Make treaties with foreign nations", style:"term", ans:"A"}
      ] },
    { key:"C", name:"Constitutional Comprehension", plan:"Read Article II, Section 3 (3 questions)",
      dir:"<b>Constitutional Comprehension.</b> Read Article II, Section 3 of the Constitution, which lists the president’s responsibilities. Then answer the questions.",
      navLabel:"Question", ic:"📜", q:{type:"write"},
      source:{label:"📜 Article II, Section 3", title:"Article II, Section 3", html:ART2},
      items:[
        {text:"1. How often must the president communicate the condition of the nation?", style:"long", who:"Use the 📜 Article II button to read the text."},
        {text:"2. When can the president convene or adjourn both Houses of Congress?", style:"long", who:"Use the 📜 Article II button to read the text."},
        {text:"3. List three responsibilities of the president that are outlined in this section.", style:"long", who:"Use the 📜 Article II button to read the text."}
      ] },
    { key:"D", name:"Executive Action", plan:"Which department handles it? (7)",
      dir:"<b>Executive Action.</b> Review the list of executive departments in the reading. Then read each issue or law and write the name of the department that will execute it.",
      navLabel:"Issue", ic:"🏢",
      q:{ type:"choice", ask:"Executive Department:", cols:3, compact:true, opts:DEPTS },
      items:[
        {text:"A law increases funding for more mental health services for former soldiers.", ans:"Veterans Affairs"},
        {text:"A war breaks out in Europe, and one of our allies requests financial and weapons assistance.", ans:"State"},
        {text:"A law is passed to increase solar energy production.", ans:"Energy"},
        {text:"A virus outbreak causes schools and businesses to close.", ans:"Health and Human Services"},
        {text:"Academic test scores in the United States are falling behind those in other nations.", ans:"Education"},
        {text:"Terrorist threats have increased at airports throughout the country.", ans:"Homeland Security"},
        {text:"A federal law requires abandoned shopping malls to be transformed into apartments for low-income residents.", ans:"Housing and Urban Development"}
      ] },
    { key:"E", name:"Dictators Denied", plan:"Read about Hans Mondo (2 questions)",
      dir:"<b>Dictators Denied.</b> Read the scenario. Then answer the questions that follow.",
      navLabel:"Question", ic:"🚫", q:{type:"write"},
      source:{label:"📖 The scenario", title:"South Avalon", html:"<p>"+AVALON+"</p>"},
      items:[
        {text:"1. List three actions taken by Hans Mondo that would not be possible for a U.S. president under Article II of the Constitution.", style:"long", who:"Use the 📖 scenario button to reread what Hans Mondo did."},
        {text:"2. Pick one action from question 1. Why do you think it’s important that this action is limited by the Constitution?", style:"long"}
      ] },
    { key:"F", name:"Help Wanted!", plan:"Write a job ad for the president",
      dir:"<b>Help Wanted!</b> Write a job advertisement for the president! Fill out the details in the table based on the reading. Review the example job advertisement. Then write one for the president that includes information from at least three sections from the table.",
      navLabel:"Box", ic:"📰", q:{type:"write"},
      source:{label:"☕ Example job ad", title:"Example: Coffee Shop Manager", html:COFFEE},
      items:[
        {text:"Job Overview: A brief summary of the job.", style:"long", short:"Job Overview"},
        {text:"Responsibilities and Duties (powers):", style:"long", short:"Responsibilities and Duties"},
        {text:"Qualifications: What are the requirements to have the job?", style:"long", short:"Qualifications"},
        {text:"Limits:", style:"long", short:"Limits"},
        {text:"Length of Term:", style:"long", short:"Length of Term"},
        {text:"Presidential Job Advertisement — write one for the president that includes information from at least three sections from the table.", style:"long", short:"Presidential Job Advertisement"}
      ] }
  ]
};
