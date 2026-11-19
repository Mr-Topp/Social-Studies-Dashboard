// iCivics "Federalists and Anti-Federalists" — activity page (page 2) online: A. Fill In, B. Who Would Say That?
window.WS = {
  id: "gov-u1-d6-fed-antifed-online",
  title: "Day 6 · Federalists vs. Anti-Federalists: Activity Page (Online)",
  std: ["SS.9-12.Gov.3"],
  name: "Federalists and Anti-Federalists",
  source: "iCivics, “Federalists and Anti-Federalists” (© 2025 iCivics, Inc.)",
  hook: ["🗞️ The Battle on Paper", "Before the Constitution could become official, the states had to approve it — and that started a fight. Figure out who said what."],
  paper: "Use your printed reading page if you need help.",
  minutes: 15,
  parts: [
    { key:"A", name:"Fill In", plan:"Fill 4 blanks from the word bank",
      dir:"<b>Federalist/Anti-Federalist Fill In.</b> Fill in the blanks with the best term from the word bank.",
      navLabel:"Blank", ic:"📝",
      q:{ type:"choice", ask:"Word bank — pick the best term:", cols:2, unique:true,
          opts:["Anti-Federalists","Bill of Rights","Federalist Papers","Federalists"] },
      items:[
        {text:"When the Constitution was completed, the <u>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;&nbsp;&nbsp;&nbsp;</u> supported it. They said a strong central government was needed.", ans:"Federalists", short:"Blank 1"},
        {text:"The <u>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;&nbsp;&nbsp;&nbsp;</u> did not support the Constitution at first. They said it was missing individual protections.", ans:"Anti-Federalists", short:"Blank 2"},
        {text:"The debate played out in newspapers. To gain support for the new Constitution, men like Alexander Hamilton, James Madison, and John Jay wrote essays that became known as the <u>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;&nbsp;&nbsp;&nbsp;</u>.", ans:"Federalist Papers", short:"Blank 3"},
        {text:"In the end, the two sides compromised and agreed to add ten amendments to the Constitution. Together, those amendments are known as the <u>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;&nbsp;&nbsp;&nbsp;</u>.", ans:"Bill of Rights", short:"Blank 4"}
      ] },
    { key:"B", name:"Who Would Say That?", plan:"F or A? Sort 12 statements",
      dir:"<b>Who Would Say That?</b> Read each statement. If it sounds like something a Federalist would have said to support the Constitution, write F. If it sounds like something an Anti-Federalist would have said to complain about the Constitution, write A.",
      navLabel:"Statement", ic:"💬",
      q:{ type:"choice", ask:"Who would say that?", cols:2, big:true,
          opts:[ {v:"F",label:"F · Federalist",em:"✅",sub:"supports the Constitution"}, {v:"A",label:"A · Anti-Federalist",em:"✋",sub:"complains about the Constitution"} ] },
      items:[
        {text:"The Constitution gives the federal government too much power. They will overpower the states.", ans:"A"},
        {text:"It will not be possible for the federal government to overpower the states, because the states are a necessary part of the federal government.", ans:"F"},
        {text:"The Constitution contains no Bill of Rights to protect individual liberties like freedom of speech, trial by jury, and the right against searches and seizures.", ans:"A"},
        {text:"The Constitution says federal laws are “the supreme law of the land,” so the federal government could just take complete control.", ans:"A"},
        {text:"Nothing in the Constitution says the federal government has the power to limit people’s freedoms in the first place.", ans:"F"},
        {text:"The President created by the Constitution is really just a king.", ans:"A"},
        {text:"The Constitution gives the federal government few powers that are very well defined.", ans:"F"},
        {text:"A strong President is necessary to protect the country against foreign attack and make sure laws are carried out properly.", ans:"F"},
        {text:"The Constitution creates a Supreme Court that is too powerful because the judges don’t answer to anyone.", ans:"A"},
        {text:"The Supreme Court’s power is balanced by the powers of the executive and legislative branches.", ans:"F"},
        {text:"The U.S. is too large to have a central government. People won’t know their leaders and will lose control over the government.", ans:"A"},
        {text:"The Constitution is a Bill of Rights because it guarantees citizens a role in government.", ans:"F"}
      ] }
  ]
};
