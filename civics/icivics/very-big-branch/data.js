// iCivics "A Very Big Branch" — activity pages online: Alphabet Soup, A. Cabinet Departments, B. Who Said That?, C. Whose Job is It Anyway?,
// D. Enforce and Regulate, E. Is It Fair?
const SECS = ["State","the Treasury","Defense","Justice","the Interior","Agriculture","Commerce","Labor","Transportation","Energy","Education","Veterans Affairs","Health and Human Services","Homeland Security","Housing and Urban Development"];
const DEPT_OPTS = SECS.map(d=>({v:d, label:"Department of "+d}));
const ABC = (text, ans, opts)=>({text, style:"term", ans, qs:[{type:"choice", cols:1, opts}]});
const BANK = ["Attorney","armed","basic needs","college","countries","farmers","fuel","wages","highway","homes","legal","military","money","public lands","terrorism","trade"];
const D = (dept, text, ans)=>({who:dept, text, ans});
window.WS = {
  id: "gov-u5-d3-very-big-branch-online",
  title: "Day 3 · A Very Big Branch: Activity Pages (Online)",
  std: ["SS.9-12.Gov.7"],
  name: "A Very Big Branch",
  source: "iCivics, “A Very Big Branch” (© 2023 iCivics, Inc.)",
  hook: ["🏢 The Branch That Never Sleeps", "FBI, FEMA, the EPA… millions of people work in the executive branch. Who does what?"],
  paper: "Use your printed reading pages if you need help.",
  minutes: 30,
  parts: [
    { key:"★", name:"Alphabet Soup", plan:"What do 14 acronyms stand for?",
      dir:"<b>Alphabet Soup.</b> You saw some acronyms in the reading. Can you remember what these stand for? Did you notice any patterns? See if you can figure out which agencies these are.",
      navLabel:"Acronym", ic:"🔤",
      items:[
        ABC("DoJ","a",[{v:"a",label:"Department of Justice"},{v:"b",label:"Department of Jobs"},{v:"c",label:"Division of Judges"}]),
        ABC("FBI","b",[{v:"a",label:"Federal Branch of Inspectors"},{v:"b",label:"Federal Bureau of Investigation"},{v:"c",label:"Foreign Bureau of Intelligence"}]),
        ABC("DEA","c",[{v:"a",label:"Department of Energy and Agriculture"},{v:"b",label:"Defense Emergency Agency"},{v:"c",label:"Drug Enforcement Administration"}]),
        ABC("AG","a",[{v:"a",label:"Attorney General"},{v:"b",label:"Agriculture Group"},{v:"c",label:"Army General"}]),
        ABC("EPA","b",[{v:"a",label:"Energy Production Agency"},{v:"b",label:"Environmental Protection Agency"},{v:"c",label:"Emergency Planning Administration"}]),
        ABC("DHS","c",[{v:"a",label:"Department of Health Services"},{v:"b",label:"Department of Housing and Schools"},{v:"c",label:"Department of Homeland Security"}]),
        ABC("FEMA","a",[{v:"a",label:"Federal Emergency Management Agency"},{v:"b",label:"Federal Energy and Mining Administration"},{v:"c",label:"Foreign Embassy Management Agency"}]),
        ABC("DoD","b",[{v:"a",label:"Department of Development"},{v:"b",label:"Department of Defense"},{v:"c",label:"Division of Drugs"}]),
        ABC("DoE","c",[{v:"a",label:"Department of Elections"},{v:"b",label:"Department of Employment"},{v:"c",label:"Department of Energy"}]),
        ABC("DoED","a",[{v:"a",label:"Department of Education"},{v:"b",label:"Department of Economic Development"},{v:"c",label:"Department of Energy Distribution"}]),
        ABC("HHS","b",[{v:"a",label:"Housing and Homeland Security"},{v:"b",label:"Health and Human Services"},{v:"c",label:"Highways and Housing Services"}]),
        ABC("HUD","c",[{v:"a",label:"Health and Urban Defense"},{v:"b",label:"Highways and Utilities Department"},{v:"c",label:"Housing and Urban Development"}]),
        ABC("VA","a",[{v:"a",label:"Veterans Affairs"},{v:"b",label:"Voting Administration"},{v:"c",label:"Visa Agency"}]),
        ABC("CIA","b",[{v:"a",label:"Civil Investigations Agency"},{v:"b",label:"Central Intelligence Agency"},{v:"c",label:"Commerce and Industry Administration"}])
      ] },
    { key:"A", name:"Cabinet Departments", plan:"Fill 16 blanks in the Cabinet organizer",
      dir:"<b>Cabinet Departments.</b> Use the word bank to fill in the missing words in the graphic organizer.",
      navLabel:"Blank", ic:"🏛️",
      q:{ type:"choice", ask:"Word bank:", cols:4, compact:true, unique:true, opts:BANK },
      items:[
        D("Secretary of State · Department of State","Manages our relationships with foreign _______.","countries"),
        D("Secretary of the Treasury · Department of the Treasury","Collects taxes, prints _______, deals with the nation’s finances.","money"),
        D("Secretary of Defense · Department of Defense","Manages the _______ forces and conducts wars overseas.","armed"),
        D("Department of Justice","_______ General","Attorney"),
        D("_______ General · Department of Justice","Enforces laws and represented the United States in _______ matters.","legal"),
        D("Secretary of the Interior · Department of the Interior","Manages and protects the nation’s _______.","public lands"),
        D("Secretary of Agriculture · Department of Agriculture","Works with _______ and regulates farm products.","farmers"),
        D("Secretary of Commerce · Department of Commerce","Supervises _______ and promotes U.S. businesses.","trade"),
        D("Secretary of Labor · Department of Labor","Helps workers get fair _______ and working conditions.","wages"),
        D("Secretary of Transportation · Department of Transportation","Oversees _______ safety and air, rail, and sea travel.","highway"),
        D("Secretary of Energy · Department of Energy","Researches sources of _______ and electricity for the nation.","fuel"),
        D("Secretary of Education · Department of Education","Gives money for K-12 schools and student _______ loans.","college"),
        D("Secretary of Veterans Affairs · Department of Veterans Affairs","Provides services for people who served in the _______.","military"),
        D("Sec. of Health & Human Services · Dept. of Health & Human Services","Gives services for Americans’ health and _______.","basic needs"),
        D("Secretary of Homeland Security · Department of Homeland Security","Protects against _______ and other threats.","terrorism"),
        D("Sec. of Housing & Urban Development · Dept. of Housing & Urban Development","Creates strong communities and affordable _______.","homes")
      ] },
    { key:"B", name:"Who Said That?", plan:"Which secretary said it? (5)",
      dir:"<b>Who Said That?</b> Identify which secretary might give the following advice or information.",
      navLabel:"Quote", ic:"🗣️",
      q:{ type:"choice", ask:"Secretary of…", cols:3, compact:true, opts:SECS.map(d=>({v:d,label:"Secretary of "+d})) },
      items:[
        {text:"1. “We need to invest in more solar electricity.”", ans:"Energy"},
        {text:"2. “We saw a decrease in highway deaths this year.”", ans:"Transportation"},
        {text:"3. “Agents intercepted a security threat this morning.”", ans:"Homeland Security"},
        {text:"4. “It’s time to take the penny out of circulation.”", ans:"the Treasury"},
        {text:"5. “We need to combat the destructive corn earworm.” (an insect that destroys corn)", ans:"Agriculture"}
      ] },
    { key:"C", name:"Whose Job is It Anyway?", plan:"Which department carries out 6 laws?",
      dir:"<b>Whose Job is It Anyway?</b> Identify the executive department that would most likely execute each act.",
      navLabel:"Act", ic:"📜",
      q:{ type:"choice", ask:"Department:", cols:3, compact:true, opts:DEPT_OPTS },
      items:[
        {text:"<b>The Veterans Educational Assistance Act (2008)</b> — Increases educational benefits for military veterans who have served since September 11, 2001.", style:"long", ans:"Veterans Affairs"},
        {text:"<b>No Child Left Behind Act (2001)</b> — Ensures that students in every public school achieve important learning goals by well-prepared teachers.", style:"long", ans:"Education"},
        {text:"<b>Helping Families Save Their Homes Act (2009)</b> — Prevents families from losing their homes to foreclosure.", style:"long", ans:"Housing and Urban Development"},
        {text:"<b>American Recovery and Reinvestment Act (2009)</b> — Gives funds to projects like ones that support improving roads, bridges, and other public structures.", style:"long", ans:"Transportation"},
        {text:"<b>The Patient Protection and Affordable Care Act (2010)</b> — Makes it easier for Americans to be covered by health insurance and get medical attention.", style:"long", ans:"Health and Human Services"},
        {text:"<b>Farm Security and Rural Investment Act (2002)</b> — Provides support to American farmers.", style:"long", ans:"Agriculture"}
      ] },
    { key:"D", name:"Enforce and Regulate", plan:"Regulation or enforcement? (6)",
      dir:"<b>Enforce and Regulate.</b> The Department of Labor (DOL) works to protect public health and safety. Decide if each item on the list is a DOL regulation or enforcement activity.",
      navLabel:"Item", ic:"👷",
      q:{ type:"choice", ask:"Regulation or enforcement?", cols:2, big:true, opts:[{v:"R",label:"Regulation",em:"📏",sub:"a rule"},{v:"E",label:"Enforcement",em:"🔍",sub:"making sure rules are followed"}] },
      items:[
        {text:"1. Monitor workplaces to see if they are following safety and health standards.", ans:"E"},
        {text:"2. Employers must use a certain method for calculating overtime pay.", ans:"R"},
        {text:"3. Employers must record and report work-related injuries and illnesses.", ans:"R"},
        {text:"4. Employees can file a charge if they feel they’ve been discriminated against.", ans:"E"},
        {text:"5. Make sure agricultural workers are receiving fair treatment required by law.", ans:"E"},
        {text:"6. Employers must post a notice explaining laws about the minimum wage.", ans:"R"}
      ] },
    { key:"E", name:"Is It Fair?", plan:"Challenges to fair enforcement (2–3 sentences)",
      dir:"<b>Is It Fair?</b> The goal of the Executive departments is to be fair in their enforcement of laws and regulations, but they don’t always get it right. What are some challenges to fair enforcement? Write 2-3 sentences explaining your response.",
      navLabel:"Question", ic:"⚖️", q:{type:"write"},
      items:[ {text:"What are some challenges to fair enforcement?", short:"Challenges to fair enforcement"} ] }
  ]
};
