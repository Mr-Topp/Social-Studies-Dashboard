// iCivics "Why Government?" — activity pages B, C, D (page 4) online. Part A (Sketch it out) is a drawing page and stays on paper.
window.WS = {
  id: "gov-u1-d2-why-government-online",
  title: "Day 2 · Why Government?: Activity Pages (Online)",
  std: ["SS.9-12.Gov.1"],
  name: "Why Government?",
  source: "iCivics, “Why Government?” (© 2023 iCivics, Inc.)",
  hook: ["⚔️ Hobbes vs. Locke", "Why do people agree to be governed at all? Sort the big ideas, connect them, and decide where Hobbes and Locke agree."],
  paper: "Use your printed reading pages if you need help. Part A (Sketch it out) is on your printed packet.",
  minutes: 15,
  parts: [
    { key:"B", name:"Venn Diagram", plan:"Sort 10 words into the Venn diagram",
      dir:"<b>Venn Diagram.</b> Put the number of the word in the right category.",
      navLabel:"Word", ic:"🔵",
      q:{ type:"choice", ask:"Where does this word go?", cols:3, big:true,
          opts:[ {v:"son",label:"State of Nature",em:"🌲",sub:"only"}, {v:"both",label:"Both",em:"🔁",sub:"the middle"}, {v:"sc",label:"Social Contract",em:"🤝",sub:"only"} ] },
      items:[
        {text:"1. Natural Rights", style:"term", ic:"✋", ans:"both"},
        {text:"2. Life", style:"term", ic:"❤️", ans:"both"},
        {text:"3. Liberty", style:"term", ic:"🗽", ans:"both"},
        {text:"4. Property", style:"term", ic:"🏠", ans:"both"},
        {text:"5. Government", style:"term", ic:"🏛️", ans:"sc"},
        {text:"6. No laws", style:"term", ic:"🚫", ans:"son"},
        {text:"7. Laws", style:"term", ic:"📜", ans:"sc"},
        {text:"8. Compromises are made", style:"term", ic:"🤝", ans:"sc"},
        {text:"9. You are on your own!", style:"term", ic:"🏕️", ans:"son"},
        {text:"10. Rights are protected.", style:"term", ic:"🛡️", ans:"sc"}
      ] },
    { key:"C", name:"What’s the connection?", plan:"Explain how 3 sets of words connect",
      dir:"<b>What’s the connection?</b> Describe how the words listed are connected to one another.",
      navLabel:"Set", ic:"🔗",
      q:{ type:"write", ask:"How are these words connected to one another?" },
      items:[
        {text:"1. Life / Liberty / Property", style:"term", short:"Life / Liberty / Property"},
        {text:"2. State of Nature / War", style:"term", short:"State of Nature / War"},
        {text:"3. Government / Social Contract", style:"term", short:"Government / Social Contract"}
      ] },
    { key:"D", name:"Agree or Disagree?", plan:"Would Hobbes and Locke agree? (3) + explain",
      dir:"<b>Agree or Disagree?</b> Read each statement and determine if Hobbes and Locke would agree. On the statement where they disagree, explain how Locke saw things differently.",
      navLabel:"Statement", ic:"⚖️",
      q:{ type:"choice", ask:"Would Hobbes and Locke agree?", cols:2, big:true,
          opts:[ {v:"agree",label:"Agree",em:"👍"}, {v:"disagree",label:"Disagree",em:"👎"} ] },
      items:[
        {text:"There are no laws in a state of nature, and people are always at war.", ans:"agree"},
        {text:"Government is needed to create laws, protect people and provide services.", ans:"agree"},
        {text:"The ruler should be someone that has complete power and cannot be overthrown if the people are unhappy.", ans:"disagree"},
        {text:"On the statement where they disagree, explain how Locke saw things differently.", ic:"✍️", short:"How Locke saw it differently",
         qs:[{type:"write", ask:"How did Locke see things differently?"}]}
      ] }
  ]
};
