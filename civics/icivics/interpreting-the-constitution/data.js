// iCivics "Interpreting the Constitution" — activity pages online: 8th Amendment cases, 5th Amendment cases, and both Follow-Up true/false sets.
// Page 1 (circle the school-supply pictures) is a picture warm-up and stays on paper.
const GUESS = { type:"choice", free:true, ask:"Your Guess:", cols:2, opts:[{v:"yes",label:"Yes"},{v:"no",label:"No"}], short:"Your guess" };
const COURT = { type:"choice", ask:"The Court’s Decision:", cols:3, opts:[{v:"yes",label:"Yes"},{v:"no",label:"No"},{v:"maybe",label:"Maybe — it depends"}], short:"The Court’s decision" };
const C = (text, ans, reveal, ic) => ({ text, ic, style:"long", reveal:"<b>The Supreme Court’s answer:</b> "+reveal, qs:[GUESS, Object.assign({}, COURT, {ans})] });
const TF = { type:"choice", ask:"True or false?", cols:2, big:true, opts:[{v:"T",label:"True",em:"👍"},{v:"F",label:"False",em:"👎"}] };
window.WS = {
  id: "gov-u3-d2-interpreting-online",
  title: "Day 2 · Interpreting the Constitution: Activity Pages (Online)",
  std: ["SS.9-12.Gov.8"],
  name: "Interpreting the Constitution",
  source: "iCivics, “Interpreting the Constitution” (© 2024 iCivics, Inc.)",
  hook: ["⚖️ You Be the Judge", "Real cases, real people. Make your guess — then see what the Supreme Court actually decided."],
  paper: "Page 1 (circle the school supplies) is on your printed packet.",
  minutes: 30,
  parts: [
    { key:"A", name:"8th Amendment", plan:"Cruel and unusual? 8 real cases",
      source:{label:"📖 What it says", title:"8th Amendment", html:"<p>The 8th Amendment prevents the government from giving people “cruel and unusual punishments.” But what does that mean? How do you know when a punishment is “cruel and unusual”?</p><p>Each of the following cases happened in real life and was heard by the United States Supreme Court.</p>"},
      dir:"<b>Cruel and Unusual? (Or is it…?)</b> Read each one and check YES if you think it describes a “cruel and unusual” punishment. Check NO if you think it does not.",
      navLabel:"Case", ic:"🔒",
      items:[
        C("<b>1. Electric Chair Mistake.</b> A person is sentenced to death for murder. On the first try, the electric chair shocks the prisoner but does not kill him. They put the prisoner back in his cell, fix the chair, and plan to try again later.", "no", "No. The Court said an accident with the chair did not make a second try cruel and unusual. (<i>Louisiana ex rel. Francis v. Resweber</i>, 1947)", "⚡"),
        C("<b>2. Second-Hand Jail Smoke.</b> A prisoner is exposed to second-hand cigarette smoke while in prison.", "maybe", "Maybe. The Court said exposing a prisoner to unreasonably high levels of second-hand smoke <i>could</i> be cruel and unusual — the prisoner had to prove it. (<i>Helling v. McKinney</i>, 1993)", "🚬"),
        C("<b>3. No Prison X-Ray.</b> A prisoner hurts his back while working in prison. He is given medical treatment, but doctors do not perform an X-ray.", "no", "No. He got medical care. Skipping the X-ray was a doctor’s judgment call, not prison officials ignoring his needs on purpose. (<i>Estelle v. Gamble</i>, 1976)", "🩻"),
        C("<b>4. Prison Guard Beating.</b> A prisoner is beaten by prison guards while he is handcuffed and shackled. The guards do not have a reason to use force on the prisoner. The prisoner suffers injuries such as bruises, swelling, and loose teeth.", "yes", "Yes. Using force just to cause harm is cruel and unusual, even if the injuries are not serious. (<i>Hudson v. McMillian</i>, 1992)", "⛓️"),
        C("<b>5. Executing a Person with an Intellectual Disability.</b> A man is convicted of abduction (taking someone by force), armed robbery, and murder. At the sentencing hearing, an expert testifies that the defendant has an intellectual disability. The jury sentences the man to death.", "yes", "Yes. Executing a person with an intellectual disability is cruel and unusual. (<i>Atkins v. Virginia</i>, 2002)", "🧠"),
        C("<b>6. No Special Circumstances.</b> A judge sentences a person to death for committing murder. A state law does not allow the judge to consider any special or individual circumstances when deciding whether to give the prisoner the death penalty.", "yes", "Yes. A death sentence must consider the person and the details of the crime, so this law was cruel and unusual. (<i>Woodson v. North Carolina</i>, 1976)", "📜"),
        C("<b>7. Juvenile Death Sentence.</b> A juvenile commits murder when he is 17 years old. At age 18, he is tried and sentenced to death.", "yes", "Yes. The death penalty for someone who was under 18 at the time of the crime is cruel and unusual. (<i>Roper v. Simmons</i>, 2005)", "🧒"),
        C("<b>8. School Paddling.</b> A state law allows public school teachers to discipline students with corporal punishment. A middle school teacher hits several students with a wooden paddle. One student can’t use his arm for a week.", "no", "No. The Court said the 8th Amendment is about punishing crimes, not school discipline. (<i>Ingraham v. Wright</i>, 1977)", "🏫")
      ] },
    { key:"B", name:"5th Amendment", plan:"Compelled? 7 real cases",
      source:{label:"📖 What it says", title:"5th Amendment", html:"<p>The 5th Amendment says the government cannot “compel” (force) a person “to be a witness against himself.” But how do you know when someone is being “compelled”? When are you being a “witness” against yourself?</p><p>Each of the following cases happened in real life and was heard by the United States Supreme Court.</p>"},
      dir:"<b>“I Take the Fifth!”</b> Read each one and check YES if you think the person has been compelled to be a witness against him/herself. Otherwise check NO.",
      navLabel:"Case", ic:"🤐",
      items:[
        C("<b>1. FBI Informant Tell-All.</b> A prisoner is being threatened by other prisoners because of a rumor that he killed a child. He is befriended by a prisoner who is a paid informant for the FBI. The informant offers to protect the prisoner if the prisoner tells him the truth about the murder.", "yes", "Yes. Offering protection from real danger in exchange for a confession forced him to speak. (<i>Arizona v. Fulminante</i>, 1991)", "🕵️"),
        C("<b>2. Appealing to a Robber’s Conscience.</b> Three police officers drive a robbery suspect to the police station. The officers have not yet found the gun used in the robbery. On the way to the station, one officer mentions to another officer that there is a school for children with disabilities nearby. He says it would be terrible if one of the school children finds the gun and hurts themselves. Hearing this, the suspect tells the officers where the gun is.", "no", "No. The officers were talking to each other, not questioning him. He chose to speak. (<i>Rhode Island v. Innis</i>, 1980)", "🚓"),
        C("<b>3. Oops — A Truth Serum.</b> A person who is addicted to drugs is arrested for robbery and murder. After being in police custody for several hours, he begins to have severe withdrawal symptoms. A police doctor gives the suspect medication. Nobody realizes the medicine acts like a “truth serum.” Police question the suspect after he takes the medication. Within a short time, the suspect confesses.", "yes", "Yes (but…). A confession caused by a drug is not freely given, even though the police didn’t know it was a truth serum. (<i>Townsend v. Sain</i>, 1963)", "💊"),
        C("<b>4. Forced to Model a Shirt.</b> Investigators trying to solve a murder want to know whether a certain shirt belongs to the suspect. They make the suspect try the shirt on despite his objection, and the shirt fits him. This evidence is used in a trial to help convict him.", "no", "No. Trying on a shirt is not communicating anything, so he was not a “witness” against himself. (<i>Holt v. United States</i>, 1910)", "👕"),
        C("<b>5. Didn’t Read the Rights.</b> Detectives take a suspect into an interrogation room and ask him questions. The detectives do not tell him what his rights are before they ask him questions. He confesses to a crime.", "yes", "Yes (sort of). Police must tell suspects their rights first, or the confession can’t be used. (<i>Miranda v. Arizona</i>, 1966)", "🗒️"),
        C("<b>6. Blood Draw.</b> A man is arrested at a hospital after a car accident. The officer believes the man has been drinking and driving. He orders a doctor to take a blood sample even though the man protests. The sample shows alcohol in the man’s blood.", "no", "No. A blood sample is physical evidence, not something he said, so it is not being a witness against himself. (<i>Schmerber v. California</i>, 1966)", "🩸"),
        C("<b>7. Bedside Interrogation.</b> After a drug raid, a suspect ends up in the intensive care unit. The barely conscious suspect is hooked up to all sorts of tubes and equipment. Detectives went to his bedside and interrogated him. Even though the suspect kept asking them to stop, the detectives continued to ask questions. His statements are used at trial to convict him.", "yes", "Yes. Questioning a badly hurt man who kept asking them to stop forced his statements. (<i>Mincey v. Arizona</i>, 1978)", "🏥")
      ] },
    { key:"C", name:"8th Amendment Follow-Up", plan:"True or false? (8)",
      dir:"<b>8th Amendment Follow-Up.</b> Read each statement. Decide if it is true or false.",
      navLabel:"Statement", ic:"🔒", q:TF,
      items:[
        {text:"1. The Court doesn’t believe any punishment is “cruel and unusual” if someone is a criminal.", ans:"F"},
        {text:"2. Whether a punishment is “cruel and unusual” under the Constitution often depends on the details of the situation.", ans:"T"},
        {text:"3. “Cruel and unusual” under the Constitution might be different from your personal definition of what is cruel.", ans:"T"},
        {text:"4. It’s easy to figure out whether a situation qualifies as “cruel and unusual” punishment.", ans:"F"},
        {text:"5. The 8th Amendment only applies where someone has been convicted of a crime, not in other situations.", ans:"T"},
        {text:"6. The Court has a list of “cruel and unusual” punishments that it uses to decide the cases.", ans:"F"},
        {text:"7. Whether prison officials were trying to hurt someone matters when the Court decides if something is “cruel and unusual.”", ans:"T"},
        {text:"8. The death penalty is considered cruel and unusual as applied to some groups of people but not others.", ans:"T"}
      ] },
    { key:"D", name:"5th Amendment Follow-Up", plan:"True or false? (8)",
      dir:"<b>5th Amendment Follow-Up.</b> Read each statement. Decide if it is true or false.",
      navLabel:"Statement", ic:"🤐", q:TF,
      items:[
        {text:"1. “Compelled” means “forced.”", ans:"T"},
        {text:"2. With the 5th Amendment, the Court is worried about police wrongdoing that forces a confession.", ans:"T"},
        {text:"3. It’s easy to figure out whether someone was compelled to speak.", ans:"F"},
        {text:"4. Being a “witness” against yourself only applies to communicating information.", ans:"T"},
        {text:"5. Suspects are completely protected because police can’t make suspects be a witness against themselves.", ans:"F"},
        {text:"6. The Court doesn’t care how police get a confession as long as the criminal is caught.", ans:"F"},
        {text:"7. The main consequence of violating this part of the 5th Amendment is the evidence can’t be used at trial.", ans:"T"},
        {text:"8. People accused of a crime have the right to remain silent.", ans:"T"}
      ] }
  ]
};
