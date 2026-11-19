// iCivics "Major Clash? Compromise!" (Constitutional Compromises) — activity pages online:
// A. Compromising Quotes, B. Virginia Plan = Constitution?, C. The 3/5ths Compromise, D. Map Activity (as a sort, no map drawing),
// E. State Interest, F/G. Notes from the Convention (Primary Source, Parts I and II). Readings stay printed.
const CHART_ROWS = [
  ["Connecticut*","235,182","2,764","1,658","236,840","7"],["Delaware*","50,209","8,887","5,332","55,541","1"],["Georgia","53,284","29,264","17,558","70,842","2"],
  ["Kentucky","61,247","12,430","7,458","68,705","2"],["Maryland","216,692","103,036","61,821","278,514","8"],["Massachusetts*","475,327","0","0","475,327","14"],
  ["New Hampshire*","141,727","158","95","141,822","4"],["New Jersey*","172,716","11,423","6,854","179,570","5"],["New York*","318,796","21,324","12,794","331,590","10"],
  ["North Carolina","293,179","100,572","60,343","353,552","10"],["Pennsylvania*","430,636","3,737","2,242","432,878","13"],["Rhode Island*","67,877","948","569","68,446","2"],
  ["South Carolina","141,979","107,094","64,256","206,235","6"],["Vermont*","85,523","16","10","85,533","2"],["Virginia","454,983","292,627","175,576","630,559","19"]];
const CHART = `<p><b>Apportionment Chart.</b> Apportionment is how the country determines how many representatives each state gets in the U.S. House of Representatives.</p>
<p><b>1792 House of Representatives Apportionment</b> (Source: 1790 Census)</p>
<table><tr><th>State</th><th>Free Population ✝</th><th>Enslaved Population</th><th>3/5 Count</th><th>Population for Representation</th><th>Representatives</th></tr>
${CHART_ROWS.map(r=>"<tr>"+r.map(c=>"<td>"+c+"</td>").join("")+"</tr>").join("")}</table>
<p>*Northern State &nbsp; ✝ White males of 16 years and upwards, White males under 16, White females, all other free persons.<br>Note: Vermont and Kentucky were not part of the original 13 states but were added as states in 1791 (VT) and 1792 (KY).</p>`;
const VA_PLAN = `<p><b>Components of the Virginia Plan</b></p><p>a. Enlarge and correct the Articles of Confederation to accomplish the goals of common defense and general welfare, and secure liberties<br>b. Number of representatives in the national legislature should be determined by state contributions to national revenue or the number of free inhabitants<br>c. Create two branch national legislature<br>d. First branch of national legislature has proportional representation<br>e. Second branch of national legislature elected by members of the first branch<br>f. Each branch can begin the legislative process; make laws that affect the entire nation; veto state laws; call out the militia to enforce laws against the states<br>g. Create a national executive, chosen by the national legislature; job is to execute the national laws and enjoy executive rights as vested by Congress<br>h. National executive and judiciary forms a Council of Revision to examine legislative acts and have a final veto, unless the legislature overrides the veto<br>i. Create a national judiciary with a supreme court and lower courts created by the national legislature; hold offices during good behavior (life); hear cases regarding piracy, enemy captures, cases involving foreigners and citizens of multiple states, or cases regarding collection of national revenue, impeachment, or national peace and harmony<br>j. Procedures to admit new states<br>k. The guarantee of a republican government in each state or territory<br>l. How to continue Congress until the new document is ratified<br>m. Provision for amending the new document<br>n. The government branches in the states should take an oath to support the new document<br>o. The amendments that are made by the convention/this new document should be voted on by an assembly chosen by the people specifically for that purpose</p>`;
const NOTE = `<p><i>Student Note: These excerpts contain the terms “slaves” and “negro” and the dehumanizing act of speaking about humans as objects. They are shown as written because slavery was a central conversation in the founding of the United States. Today use of the terms “slaves” and “negro” when referring to people is considered outdated.</i></p>`;
const PART1 = NOTE + `<p><b>Part I: August 21, 1787.</b> The delegates were discussing a proposal to prohibit the importation of enslaved people. Some words have been defined in parenthesis.</p>
<p><b>Mr. L. Martin [Maryland]</b>, proposed to vary the sect: 4. art VII so as to allow a prohibition or tax on the importation of slaves. 1. As five slaves are to be counted as 3 free men in the apportionment of Representatives; such a clause wd. (would) leave an encouragement to this trafic. 2. slaves weakened one part of the Union which the other parts were bound to protect: the privilege of importing them was therefore unreasonable 3. it was inconsistent with the principles of the revolution and dishonorable to the American character to have such a feature in the Constitution.</p>
<p><b>Mr. Rutledge [South Carolina]</b> did not see how the importation of slaves could be encouraged by this section. He was not apprehensive (fearful) of insurrections (rebellions) and would readily exempt the other States from the obligation to protect the Southern against them. [...] The true question at present is whether the Southern States shall or shall not be parties to the Union. If the Northern States consult their interest, they will not oppose the increase of Slaves which will increase the commodities (products) of which they will become the carriers.</p>
<p><b>Mr. Ellsworth [Connecticut]</b> was for leaving the clause as it stands. Let every State import what it pleases. The morality or wisdom of slavery are considerations belonging to the States themselves — [...] the States are the best judges of their particular interest. The old confederation had not meddled with this point, and he did not see any greater necessity for bringing it within the policy of the new one.</p>
<p><b>Mr. Pinkney [South Carolina].</b> South Carolina can never receive the plan if it prohibits the slave trade. In every proposed extension of the powers of Congress, that State has expressly &amp; watchfully excepted that of meddling with the importation of negroes. If the States be all left at liberty on this subject, S. Carolina may perhaps by degrees do of herself what is wished, as Virginia &amp; Maryland have already done.</p>`;
const PART2 = NOTE + `<p><b>Part II: August 22, 1787: Art. VII sect 4. resumed.</b> Some words have been defined for you in parenthesis.</p>
<p><b>Mr. Sherman [Connecticut]</b> was for leaving the clause as it stands. He disapproved of the slave trade: yet as the States were now possessed of the right to import slaves, as the public good did not require it to be taken from them, &amp; as it was expedient (convenient) to have as few objections as possible to the proposed scheme of Government, he thought it best to leave the matter as we find it. He observed that the abolition of slavery seemed to be going on in the U. S. &amp; that the good sense of the several States would probably by degrees compleat (complete) it.</p>
<p><b>Col. Mason [Virginia].</b> [...] He mentioned the dangerous insurrections (rebellions) of the slaves in Greece and Sicily; [...] Maryland &amp; Virginia he said had already prohibited the importation of slaves expressly. N. Carolina had done the same in substance (basically). All this would be in vain if S. Carolina &amp; Georgia be at liberty to import. The Western people are already calling out for slaves for their new lands; and will fill that Country with slaves if they can be got thro’ (through) S. Carolina &amp; Georgia. Slavery discourages arts &amp; manufactures. The poor despise labor when performed by slaves. They prevent the immigration of Whites, who really enrich &amp; strengthen a Country. They produce the most pernicious effect on manners. Every master of slaves is born a petty tyrant. They bring the judgment of heaven on a Country. He held it essential in every point of view, that the Genl. Govt. (general government) should have power to prevent the increase of slavery.</p>
<p><b>Mr. Ellsworth [Connecticut].</b> As he had never owned a slave could not judge of the effects of slavery on character. He said however that if it was to be considered in a moral light we ought to go farther and free those already in the Country.— As slaves also multiply so fast in Virginia &amp; Maryland that it is cheaper to raise than import them, whilst (while) in the sickly rice swamps foreign supplies are necessary, if we go no farther than is urged, we shall be unjust towards S. Carolina &amp; Georgia— Let us not intermeddle. As population increases; poor laborers will be so plenty as to render slaves useless. Slavery in time will not be a speck in our Country. Provision is already made in Connecticut for abolishing it. And the abolition has already taken place in Massachusetts. [...]</p>
<p><b>General Pinkney [South Carolina]</b> [...] S. Carolina &amp; Georgia cannot do without slaves. As to Virginia she will gain by stopping the importations. Her slaves will rise in value, &amp; she has more than she wants. It would be unequal to require S. C. &amp; Georgia to confederate (unite) on such unequal terms. [...] He contended that the importation of slaves would be for the interest of the whole Union. The more slaves, the more produce to employ the carrying trade; The more consumption also, and the more of this, the more of revenue for the common treasury. He admitted it to be reasonable that slaves should be dutied (taxed) like other imports, but should consider a rejection of the clause as an exclusion of S. Carola (Carolina) from the Union. [...]</p>
<p><b>Mr. Sherman [Connecticut]</b> [...] if they made that a sine qua non (necessary condition). He was opposed to a tax on slaves imported as making the matter worse, because it implied they were property. He acknowledged that if the power of prohibiting the importation should be given to the Genl. Government that it would be exercised. He thought it would be its duty to exercise the power.</p>
<p><b>Mr. Randolph [Virginia]</b> was for committing in order that some middle ground might, if possible, be found. He could never agree to the clause as it stands. He wd. (would) sooner risk the constitution [...]</p>
<p>[The vote to commit: Ayes- 7; noes -3; absent-1.] [The whole subject was thus recommitted for the purpose of coming to some compromise.]</p>`;
const COMPS = [{v:"great",label:"Great Compromise"},{v:"35",label:"3/5 Compromise"},{v:"pres",label:"Presidential Election Compromise"},{v:"commerce",label:"Commerce/Slave Trade Compromise"}];
const Q = (speaker, quote, comp, side) => ({ text:`<b>${speaker}</b> “${quote}”`, style:"long", short:speaker.replace(/\.$/,""),
  qs:[ {type:"choice", ask:"Related compromise:", cols:2, compact:true, opts:COMPS, ans:comp, short:"Compromise"},
       {type:"choice", ask:"Is the Framer for or against it?", cols:2, compact:true, opts:[{v:"for",label:"For"},{v:"against",label:"Against"}], ans:side, short:"For/against"},
       {type:"write", ask:"Big Idea: rewrite the big idea in modern language.", short:"Big Idea"} ] });
const ADOPT = { type:"choice", free:true, ask:"How much of this point did we adopt in our government?", cols:3, opts:[{v:"full",label:"✓ Fully adopted"},{v:"some",label:"◯ Somewhat (a compromise)"},{v:"no",label:"Not adopted"}] };
const VP = (l, t) => ({ who:"Virginia Plan point "+l, text:t, style:"long", short:"Point "+l });
const SIZE = { type:"choice", ask:"Large or small? (300,000 or more = large)", cols:2, opts:[{v:"L",label:"Large state"},{v:"S",label:"Small state"}], short:"Large/small" };
const NS = { type:"choice", ask:"Northern or Southern? (Northern states have * on the chart)", cols:2, opts:[{v:"N",label:"Northern state"},{v:"S",label:"Southern state"}], short:"North/South" };
const ST = (name, size, ns, pop) => ({ text:name, who:"Population for representation: "+pop, style:"term", qs:[Object.assign({},SIZE,{ans:size}), Object.assign({},NS,{ans:ns})] });
const YN = { type:"choice", ask:"Yes or No?", cols:2, opts:[{v:"yes",label:"Yes"},{v:"no",label:"No"}], short:"Yes/No" };
const EXPL = { type:"write", ask:"Explanation:", short:"Explanation" };
window.WS = {
  id: "gov-u1-d6-compromises-online",
  title: "Day 6 · Constitutional Compromises: Activity Pages (Online)",
  std: ["SS.9-12.Gov.4"],
  name: "Major Clash? Compromise!",
  source: "iCivics, “Major Clash? Compromise!” (© 2022 iCivics, Inc.)",
  hook: ["📜 Major Clash? Compromise!", "Big states vs. small states. North vs. South. Read what the Framers actually said and figure out who wanted what — and why."],
  paper: "Use your printed reading pages if you need help. The chart, the Virginia Plan, and Madison’s notes open right here with a button.",
  minutes: 60,
  parts: [
    { key:"A", name:"Compromising Quotes", plan:"6 Framer quotes: which compromise, for or against?",
      dir:"<b>Compromising Quotes.</b> Carefully read each quote. Identify the related compromise and determine if the quote is for or against it. Finally, rewrite the big idea in modern language to explain what the Framer actually wanted.",
      navLabel:"Quote", ic:"🗣️",
      items:[
        Q("1. June 29, 1787. Oliver Ellsworth.", "We were partly national, partly federal. The proportional representation in the first branch was conformable to the national principle, and would secure the large States against the small. An equality of voices was conformable to the federal principle, and was necessary to secure the small States against the large.", "great", "for"),
        Q("2. May 30, 1787. James Madison.", "Whatever reason might have existed for the equality of suffrage when the Union was a federal one among sovereign States, it must cease when a national Governmt. should be put into the place.", "great", "against"),
        Q("3. July 11, 1787. Gouverneur Morris.", "For [I] could never agree to give such encouragement to the slave trade as would be given by allowing them a representation for their negroes, and [I] did not believe those States would ever confederate on terms that would deprive them of that trade.", "35", "against"),
        Q("4. August 21, 1787. Oliver Ellsworth.", "[I am] for leaving the clause as it stands. Let every State import what it pleases. The morality or wisdom of slavery are considerations belonging to the States themselves. What enriches a part enriches the whole, and the States are the best judges of their particular interest.", "commerce", "against"),
        Q("5. August 22, 1787. John Rutledge.", "If the Convention thinks that N. C, S. C. & Georgia will ever agree to the plan, unless their right to import slaves be untouched, the expectation is vain. The people of those States will never be such fools as to give up so important an interest.", "commerce", "for"),
        Q("6. September 4, 1787. Gouverneur Morris.", "The 1st. was the danger of intrigue & faction if the appointmt. should be made by the Legislature. [...] 4. No body had appeared to be satisfied with an appointment by the Legislature. 5. Many were anxious even for an immediate choice by the people. 6. The indispensible necessity of making the Executive independent of the Legislature.", "pres", "for")
      ] },
    { key:"B", name:"Virginia Plan = Constitution?", plan:"How much of the Virginia Plan did we keep?",
      dir:"<b>Virginia Plan = Constitution?</b> Maybe. Most of what you see in our government today was actually a part of the Virginia Plan. Read the components of the Virginia Plan. 1. Check points we fully adopted in our government. 2. Circle any points where the delegates agreed to compromises (somewhat adopted). Then answer the questions.",
      navLabel:"Point", ic:"📋", source:{label:"📋 Whole Virginia Plan", title:"Components of the Virginia Plan", html:VA_PLAN}, q:ADOPT,
      items:[
        VP("a","Enlarge and correct the Articles of Confederation to accomplish the goals of common defense and general welfare, and secure liberties"),
        VP("b","Number of representatives in the national legislature should be determined by state contributions to national revenue or the number of free inhabitants"),
        VP("c","Create two branch national legislature"),
        VP("d","First branch of national legislature has proportional representation"),
        VP("e","Second branch of national legislature elected by members of the first branch"),
        VP("f","Each branch can begin the legislative process; make laws that affect the entire nation; veto state laws; call out the militia to enforce laws against the states"),
        VP("g","Create a national executive, chosen by the national legislature; job is to execute the national laws and enjoy executive rights as vested by Congress"),
        VP("h","National executive and judiciary forms a Council of Revision to examine legislative acts and have a final veto, unless the legislature overrides the veto"),
        VP("i","Create a national judiciary with a supreme court and lower courts created by the national legislature; hold offices during good behavior (life); hear cases regarding piracy, enemy captures, cases involving foreigners and citizens of multiple states, or cases regarding collection of national revenue, impeachment, or national peace and harmony"),
        VP("j","Procedures to admit new states"),
        VP("k","The guarantee of a republican government in each state or territory"),
        VP("l","How to continue Congress until the new document is ratified"),
        VP("m","Provision for amending the new document"),
        VP("n","The government branches in the states should take an oath to support the new document"),
        VP("o","The amendments that are made by the convention/this new document should be voted on by an assembly chosen by the people specifically for that purpose"),
        {text:"3. How would the national government look today if compromises had not been made and the Virginia Plan had been adopted as is?", style:"long", ic:"✍️", short:"Q3 Virginia Plan as is", qs:[{type:"write"}]},
        {text:"4. Choose two provisions from the plan that would have made the most significant difference for how our government turned out and explain what the outcomes would be. <b>Provision 1</b>", style:"long", ic:"✍️", short:"Q4 Provision 1",
         qs:[{type:"choice", free:true, ask:"Provision 1 (letter):", cols:8, compact:true, opts:"abcdefghijklmno".split(""), short:"Provision 1"}, {type:"write", ask:"Outcome:", short:"Outcome 1"}]},
        {text:"4. (continued) <b>Provision 2</b> — choose a second provision and explain what the outcome would be.", style:"long", ic:"✍️", short:"Q4 Provision 2",
         qs:[{type:"choice", free:true, ask:"Provision 2 (letter):", cols:8, compact:true, opts:"abcdefghijklmno".split(""), short:"Provision 2"}, {type:"write", ask:"Outcome:", short:"Outcome 2"}]}
      ] },
    { key:"C", name:"The 3/5ths Compromise", plan:"Use the 1790 census chart (7 questions)",
      dir:"<b>The 3/5ths Compromise.</b> Use the information from the Apportionment Chart and the reading to answer the questions.",
      navLabel:"Question", ic:"📊", source:{label:"📊 Apportionment Chart", title:"1792 House of Representatives Apportionment", html:CHART},
      items:[
        {text:"1. List the 4 states with the largest enslaved population. (List them in order of largest to smallest). Were they Northern or Southern states?", style:"long", qs:[{type:"write"}], short:"Largest enslaved populations"},
        {text:"2. List the 4 states with the largest free population. (List them in order of largest to smallest). Were they Northern or Southern states?", style:"long", qs:[{type:"write"}], short:"Largest free populations"},
        {text:"3. Which state would have had the most representatives if only the free population had been counted?", style:"long", qs:[{type:"choice", cols:4, ans:"MA", opts:[{v:"VA",label:"Virginia"},{v:"MA",label:"Massachusetts"},{v:"PA",label:"Pennsylvania"},{v:"NY",label:"New York"}]}], short:"Most reps by free population"},
        {text:"4. How many representatives did the Northern states (signified with *) have in total? How many did the southern states have?", style:"long", short:"Representatives North/South",
         qs:[{type:"type", ask:"Northern states:", ans:"58", short:"Northern reps"}, {type:"type", ask:"Southern states:", ans:"47", short:"Southern reps"}]},
        {text:"5. What is the total free population of Northern states? What is the total free population of Southern states? How would the Southern states benefit from including enslaved people in the population count?", style:"long", short:"Free population totals",
         qs:[{type:"type", ask:"Northern states free population:", ans:"1977993", short:"Northern free population"}, {type:"type", ask:"Southern states free population:", ans:"1221364", short:"Southern free population"}, {type:"write", ask:"How would the Southern states benefit?", short:"How the South benefits"}]},
        {text:"6. Who was counted in the free population total but unable to vote for any representative?", style:"long", qs:[{type:"write"}], short:"Counted but couldn’t vote"},
        {text:"7. Because of the 3/5 Compromise, the southern states had 47 representatives in Congress (answer from question 4). How do you think this increase benefited southern interests in the short term and longer term?", style:"long", qs:[{type:"write"}], short:"Short- and long-term benefit"}
      ] },
    { key:"D", name:"Map Activity", plan:"Large or small? North or South? (13 states)",
      dir:"<b>Map Activity.</b> Use the clues and the Apportionment Chart to sort the thirteen states at the time of the Constitutional Convention. States with a population less than 300,000 were considered small. States with a population of 300,000 or more were considered large. The Mason Dixon line came to be considered the dividing line between the free states and the slave states. It made up the border between Maryland and Pennsylvania.",
      navLabel:"State", ic:"🗺️", source:{label:"📊 Apportionment Chart", title:"1792 House of Representatives Apportionment", html:CHART},
      items:[
        ST("Connecticut","S","N","236,840"), ST("Delaware","S","N","55,541"), ST("Georgia","S","S","70,842"), ST("Maryland","S","S","278,514"),
        ST("Massachusetts","L","N","475,327"), ST("New Hampshire","S","N","141,822"), ST("New Jersey","S","N","179,570"), ST("New York","L","N","331,590"),
        ST("North Carolina","L","S","353,552"), ST("Pennsylvania","L","N","432,878"), ST("Rhode Island","S","N","68,446"), ST("South Carolina","S","S","206,235"), ST("Virginia","L","S","630,559")
      ] },
    { key:"E", name:"State Interest", plan:"Would these states support it? (5)",
      dir:"<b>State Interest.</b> Using your map and reading, determine which states and their delegates would have most likely supported which compromises and why.",
      navLabel:"Statement", ic:"🏛️",
      items:[
        {text:"1. Georgia would have supported the New Jersey Plan.", qs:[Object.assign({},YN,{ans:"yes"}), EXPL]},
        {text:"2. Pennsylvania would have supported the Virginia Plan.", qs:[Object.assign({},YN,{ans:"yes"}), EXPL]},
        {text:"3. Massachusetts would have supported the New Jersey Plan.", qs:[Object.assign({},YN,{ans:"no"}), EXPL]},
        {text:"4. Connecticut would have supported the Great Compromise.", qs:[Object.assign({},YN,{ans:"yes"}), EXPL]},
        {text:"5. South Carolina would have supported the Virginia Plan.", qs:[Object.assign({},YN,{ans:"no"}), EXPL]}
      ] },
    { key:"F", name:"Notes from the Convention: Part I", plan:"Madison’s notes, Aug. 21, 1787 (8 questions)",
      dir:"<b>Notes from the Convention, Part I.</b> Read the notes from August 21, 1787. Think about how what you learned about the states gives you insight into the perspective of the representative speaking. Then answer the questions.",
      navLabel:"Question", ic:"📜", source:{label:"📜 Read Part I", title:"James Madison’s Notes — August 21, 1787", html:PART1}, q:{type:"write"},
      items:[
        {text:"1. What does Mr. Martin of Maryland propose? How does he feel about the institution of slavery?", style:"long"},
        {text:"2. What does Mr. Martin of Maryland mean by enslaved people “weakened one part of the Union, which the other parts were bound to protect?”", style:"long"},
        {text:"3. What does Mr. Martin of Maryland mean when he says that allowing the trafficking of enslaved people into the Constitution “was inconsistent with the principles of the revolution and dishonorable to the American character?”", style:"long"},
        {text:"4. How does Mr. Rutledge of South Carolina respond to Mr. Martin of Maryland’s fear of being bound to protect the southern states?", style:"long"},
        {text:"5. How does Mr. Rutledge of South Carolina argue that the North also benefits from the institution of slavery?", style:"long"},
        {text:"6. Why is Mr. Ellsworth of Connecticut in favor of leaving the clause as it stands?", style:"long"},
        {text:"7. What would make Rutledge of South Carolina agree to the proposal by Martin of Maryland?", style:"long"},
        {text:"8. What proposals are on the table at this point for how the Constitution should treat the trafficking of enslaved people?", style:"long"}
      ] },
    { key:"G", name:"Notes from the Convention: Part II", plan:"Madison’s notes, Aug. 22, 1787 (5 questions)",
      dir:"<b>Notes from the Convention, Part II.</b> Now read the notes from the very next day, August 22, 1787. Use the excerpt from Part II to answer the questions.",
      navLabel:"Question", ic:"📜", source:{label:"📜 Read Part II", title:"James Madison’s Notes — August 22, 1787", html:PART2}, q:{type:"write"},
      items:[
        {text:"1. What argument does Mr. Sherman of Connecticut give for leaving the clause as it stands?", style:"long"},
        {text:"2. Why does Mr. Ellsworth of Connecticut believe that enslaved people will eventually be rendered “useless?”", style:"long"},
        {text:"3. According to General Pinkney of South Carolina, how will Virginia unfairly gain from the prohibition on the importation of enslaved people?", style:"long"},
        {text:"4. How does General Pinkney of South Carolina argue that an increase in the amount of enslavement in the United States will benefit the whole nation?", style:"long"},
        {text:"5. By the end of August 22, what is the new opinion of Mr. Sherman of Connecticut?", style:"long"}
      ] }
  ]
};
