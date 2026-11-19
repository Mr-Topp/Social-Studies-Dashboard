// iCivics "The “Supreme” in Supreme Court" — activity pages online: A. Color Coding (click the words), B. Organizing the Details, C. Even My Life?
const SAVANA = "[[right|The Fourth Amendment protects people from “unreasonable searches.”]] Nobody argued that what happened to Savana was not a [[s|search.]] But the Constitution puts a limit on the right to not be searched: [[limit|it only protects people from unreasonable searches.]] "
 + "How does the Court know when a search is unreasonable? It looks for a similar case that was already decided, called a precedent case. A precedent case usually gives factors that must be considered in future cases. "
 + "To decide Savana’s case, the Court looked at a case called [[case|New Jersey v. T.L.O.,]] where [[what2|a school was allowed to search a high school student’s purse after she was caught smoking.]] In the T.L.O case, the Supreme Court had said that whether a search in school is unreasonable depends on [[two|two]] factors: 1) [[f1|whether the school had a good reason to believe the search needed to be done]] 2) [[f2|whether the search went too far.]]";
const SAVANA_HTML = `<p><b>What Happened.</b> Savana Redding’s school principal heard Savana had been giving ibuprofen pills to other students. He talked to Savana, and then ordered the school nurse and a female school employee to search Savana. They told Savana to take off her outer clothing and shake out her underwear. They didn’t find any pills.</p>
<p><b>How the Supreme Court Decided.</b> The Fourth Amendment protects people from “unreasonable searches.” Nobody argued that what happened to Savana was not a search. But the Constitution puts a limit on the right to not be searched: it only protects people from unreasonable searches. How does the Court know when a search is unreasonable? It looks for a similar case that was already decided, called a precedent case. A precedent case usually gives factors that must be considered in future cases.</p>
<p>To decide Savana’s case, the Court looked at a case called <i>New Jersey v. T.L.O.</i>, where a school was allowed to search a high school student’s purse after she was caught smoking. In the T.L.O case, the Supreme Court had said that whether a search in school is unreasonable depends on two factors: 1) whether the school had a good reason to believe the search needed to be done 2) whether the search went too far.</p>
<p>Using these factors, the Court decided that the school did have a good reason to believe they should search Savana, but that a strip search went too far.</p>`;
const PICK = (ans)=>({ type:"pick", ask:"Click it in “How the Supreme Court Decided”:", passage:SAVANA, ans });
window.WS = {
  id: "gov-u3-d1-supreme-online",
  title: "Day 1 · The Supreme in Supreme Court: Activity Pages (Online)",
  std: ["SS.9-12.Gov.8"],
  name: "The “Supreme” in Supreme Court",
  source: "iCivics, “The ‘Supreme’ in Supreme Court” (© 2024 iCivics, Inc.)",
  hook: ["🏫 Savana’s Case", "A school strip-searched an 8th grader for ibuprofen. The Supreme Court had to decide: did the school go too far?"],
  paper: "Savana’s Case is right on screen. Use your printed “Why Supreme?” page for Part C if you need it.",
  minutes: 25,
  parts: [
    { key:"A", name:"Color Coding", plan:"Find 8 things in Savana’s Case",
      dir:"<b>Savana’s Case.</b> Read about how the Supreme Court used precedent to decide on a 2009 case involving a student named Savana Redding. Then follow the color-coding instructions.",
      navLabel:"Step", ic:"🖍️",
      source:{label:"📖 Whole case", title:"Savana’s Case", html:SAVANA_HTML},
      items:[
        {text:"1) Underline her constitutional right.", ic:"🟥", qs:[PICK("right")], short:"Her constitutional right"},
        {text:"2) Find the one word that tells you what had to happen in Savana’s case for the right to apply. If this didn’t happen, the right would not apply.", ic:"⭐", qs:[PICK("s")], short:"The one word"},
        {text:"3) Underline the limit on this right.", ic:"🟦", qs:[PICK("limit")], short:"The limit on the right"},
        {text:"4) Circle the name of the precedent case.", ic:"🟧", qs:[PICK("case")], short:"Precedent case"},
        {text:"5) Circle the number of factors.", ic:"🟪", qs:[PICK("two")], short:"Number of factors"},
        {text:"6) Bracket the FIRST factor.", ic:"🟨", qs:[PICK("f1")], short:"First factor"},
        {text:"6) Bracket the SECOND factor.", ic:"🟨", qs:[PICK("f2")], short:"Second factor"},
        {text:"7) Put parentheses around what happened in the precedent case.", ic:"🟫", qs:[PICK("what2")], short:"What happened in the precedent case"}
      ] },
    { key:"B", name:"Organizing the Details", plan:"Fill in the graphic organizer (6)",
      dir:"<b>Organizing the Details.</b> Use the details from the case of <i>Safford Unified School District vs. Redding</i> (2009) to complete the graphic organizer.",
      navLabel:"Box", ic:"🗂️",
      source:{label:"📖 Savana’s Case", title:"Savana’s Case", html:SAVANA_HTML},
      items:[
        {text:"What Amendment applies to this case and what right does the Amendment give?", qs:[{type:"write"}], short:"Amendment and right"},
        {text:"What are the limits on this right?", qs:[{type:"write"}], short:"Limits on the right"},
        {text:"Which case was used as precedent?", qs:[{type:"choice", cols:2, ans:"tlo", opts:[{v:"tlo",label:"New Jersey v. T.L.O. (1985)"},{v:"tinker",label:"Tinker v. Des Moines (1969)"},{v:"gideon",label:"Gideon v. Wainwright (1963)"},{v:"meyer",label:"Meyer v. Nebraska (1923)"}]}], short:"Precedent case"},
        {text:"How many factors were used from the precedent case?", qs:[{type:"choice", cols:4, big:true, ans:"2", opts:[{v:"1",label:"1"},{v:"2",label:"2"},{v:"3",label:"3"},{v:"4",label:"4"}]}], short:"How many factors"},
        {text:"Summarize the factor(s).", qs:[{type:"write"}], short:"Summary of the factors"},
        {text:"How was Savana’s case similar to the precedent case?", qs:[{type:"write"}], short:"How the cases are similar"}
      ] },
    { key:"C", name:"Even My Life?", plan:"How do 4 cases affect YOU?",
      dir:"<b>Even My Life?</b> Read the description of each case and think about how the ruling could affect you. Then, complete the sentences.",
      navLabel:"Case", ic:"🙋",
      items:[
        {text:"<b>Meyer v. Nebraska (1923).</b> Said it’s unconstitutional for a state to ban the teaching of foreign languages.", style:"long", ic:"🗣️", short:"Meyer v. Nebraska",
         qs:[{type:"write", ask:"Complete the sentence:", starter:"If it weren’t for this case, I might not have the choice to"}]},
        {text:"<b>Gideon v. Wainwright (1963).</b> Said that people accused of a crime must be given a lawyer even if they cannot afford one. It’s unconstitutional to deny them a lawyer just because they’re poor.", style:"long", ic:"⚖️", short:"Gideon v. Wainwright",
         qs:[{type:"write", ask:"Complete the sentence:", starter:"If it weren’t for this case and I got accused of a crime, I might have a problem because"}]},
        {text:"<b>Tinker v. Des Moines School Dist. (1969).</b> Said it’s unconstitutional to deny students the right to free speech at school, unless the students’ speech disrupts school activities.", style:"long", ic:"🎗️", short:"Tinker v. Des Moines",
         qs:[{type:"write", ask:"Complete the sentence:", starter:"If it weren’t for this case, things might be different at school because"}]},
        {text:"<b>New Jersey v. T.L.O. (1985).</b> Said it’s unconstitutional for principals and teachers to search students and their belongings, unless there is a good reason (like safety and discipline) and the search doesn’t go too far.", style:"long", ic:"🎒", short:"New Jersey v. T.L.O.",
         qs:[{type:"write", ask:"Complete the sentence:", starter:"If it weren’t for this case, and a teacher decided to go through everyone’s backpack without a reason, then"}]}
      ] }
  ]
};
