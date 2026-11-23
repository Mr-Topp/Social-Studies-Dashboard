/* We the People bell ringers (Government). Written in our own words from
   We the People: The Citizen & the Constitution, Level 2 (2000 ed.), with outdated facts fixed.
   Each bell ringer has its own link: civics/bell-ringers/?r=<id> (index.html sets window.BELL).
   Pictures: public-domain images from Wikimedia Commons, saved in civics/bell-ringers/img/<id>.jpg
   so they can't break. The IMAGES list keeps each original Commons file name for credit. */
(function(){
const R = [
{id:"why-gov", title:"Why Do We Need Government?", book:"Book Lesson 1",
 goal:"Explain why people agree to live under a government.",
 html:`<p>Imagine a world with <b>no government</b>. No laws, no police, no courts. The English thinker <b>John Locke</b> called this the <b>state of nature</b>.</p>
<p>Locke said everyone is born with <b>natural rights</b>: life, liberty, and property. But in a state of nature, nothing protects those rights. The strongest people could take whatever they want. Weaker people would team up to fight back. Nobody would feel safe.</p>
<p>So people make a deal called the <b>social contract</b>. They give up a little freedom and agree to follow laws. In return, the government protects their rights. Agreeing to be governed is called giving your <b>consent</b>.</p>
<p>Locke's book came out in 1690. About 85 years later, American colonists used his ideas to explain why they had the right to break away from Britain.</p>`,
 qs:[
  {q:"In a state of nature, why would nobody feel safe?",c:["Nothing protects people's rights from the strong","The government takes too much of people's property","Too many laws make everyday life confusing and slow","A king would own all the land and make every rule"],why:"With no laws or police, the strong can take whatever they want.",hint:"Reread the part about what happens when there are no laws."},
  {q:"In the social contract, what do people give up, and what do they get?",c:["Some freedom, in return for protection of their rights","Their property, in return for a safe place to live","Their right to vote, in return for lower taxes","Their natural rights, in return for a strong king"],why:"People trade a little freedom for a government that protects their rights.",hint:"Look for the paragraph that starts \"So people make a deal.\""}],
 stem:"People agree to have a government because"},

{id:"republic", title:"Who Holds the Power?", book:"Book Lessons 2–3",
 goal:"Tell the difference between a republic, limited government, and one-person rule.",
 html:`<p>For about 500 years, ancient Rome had no king. Citizens chose leaders to work for the <b>common good</b>, meaning what's best for the whole community. That kind of government is a <b>republic</b>. America's Founders loved this idea.</p>
<p>But what keeps leaders from abusing power? A <b>constitution</b> lays out how a government is set up and what it can and can't do.</p>
<p>Here's the catch: almost every country has a constitution, even dictatorships. What matters is whether the limits are actually followed.</p>
<ul><li><b>Constitutional (limited) government:</b> leaders must obey the limits.</li>
<li><b>Autocratic government:</b> one ruler or small group does whatever they want.</li></ul>
<p>Example: in a limited government, police need a warrant (a judge's permission) to search your house. In an autocratic one, they can just kick in the door.</p>`,
 qs:[
  {q:"Based on the reading, what makes a government a republic?",c:["Citizens choose leaders to work for the common good","A king makes the laws, but he listens to advisers first","Any country with a constitution is a republic","Leaders can do whatever they want once they win"],why:"In a republic, citizens choose leaders who work for everyone.",hint:"Reread the first paragraph about Rome."},
  {q:"A country has a written constitution, but its leader ignores it and jails critics. What kind of government is it?",c:["Autocratic, because the limits aren't really followed","Constitutional, because it has a written constitution","A republic, because the leader was once chosen","Limited, because its constitution lists rights"],why:"Having a constitution isn't enough. The limits have to actually be obeyed.",hint:"Look at \"Here's the catch.\""}],
 stem:"Limited government matters because"},

{id:"england", title:"Rules for Kings", book:"Book Lesson 5",
 goal:"Explain how English history taught Americans that leaders must follow the law.",
 html:`<p>The colonists were English, so they grew up with English ideas about government.</p>
<p>In <b>1215</b>, English nobles were fed up with King John. They forced him to sign the <b>Magna Carta</b>. It said even the king has to obey the law. He couldn't take a noble's land without following set rules. This idea is called the <b>rule of law</b>.</p>
<p>Over time, a group of lawmakers called <b>Parliament</b> grew stronger. In the 1600s, England fought a civil war over power, and Parliament's side won.</p>
<p>In <b>1689</b>, Parliament passed the <b>English Bill of Rights</b>. Now the king could not tax people without Parliament's okay, keep an army in peacetime without permission, or hand out cruel punishments.</p>
<p>The colonists brought these ideas to America. They expected the same rights.</p>`,
 qs:[
  {q:"What big idea came from the Magna Carta?",c:["Even the king has to obey the law","The king can tax people when he wants","Nobles should pay for the king's wars","Parliament should choose the next king"],why:"That's the rule of law: nobody, not even a king, is above it.",hint:"Look at the 1215 paragraph."},
  {q:"Under the English Bill of Rights, what could the king no longer do on his own?",c:["Tax people without Parliament agreeing","Sign peace treaties with other countries","Choose the advisers who work for him","Name new lords to sit in Parliament"],why:"The king needed Parliament's okay to tax people.",hint:"Look at the 1689 paragraph."}],
 stem:"The colonists cared about the Magna Carta and the English Bill of Rights because"},

{id:"revolution", title:"Road to Revolution", book:"Book Lesson 6",
 goal:"Explain why colonists said \"no taxation without representation.\"",
 html:`<p>For a long time, Britain mostly left the colonies alone. Colonists got used to running things themselves.</p>
<p>Then in <b>1763</b>, Britain finished an expensive war with France and was deep in debt. Parliament decided the colonists should help pay. New taxes and punishments followed:</p>
<ul><li><b>Stamp Act (1765):</b> a tax on newspapers, legal papers, even playing cards.</li>
<li><b>Boston Massacre (1770):</b> British soldiers fired into a crowd and killed five people.</li>
<li><b>Boston Tea Party (1773):</b> colonists dumped British tea into the harbor.</li>
<li><b>Intolerable Acts (1774):</b> Britain shut down Boston's harbor as punishment.</li></ul>
<p>Colonists had no one representing them in Parliament. Their slogan: <b>"No taxation without representation."</b> Britain said Parliament already spoke for everyone in the empire.</p>
<p>In April <b>1775</b>, fighting broke out at Lexington and Concord.</p>`,
 qs:[
  {q:"Why did Parliament start taxing the colonies after 1763?",c:["Britain was in debt from a war with France","Colonists asked for more British soldiers","Colonists stopped trading with Britain","The king wanted to pay for colonial roads"],why:"The war with France left Britain deep in debt.",hint:"Look at the 1763 sentence."},
  {q:"What did \"no taxation without representation\" mean?",c:["Only lawmakers we elect should be able to tax us","Colonists should pay lower taxes than the British","Britain should send more settlers to America","Only the king, not Parliament, should tax us"],why:"Colonists had no representatives in Parliament, so they said it had no right to tax them.",hint:"Read the sentence right before the slogan."}],
 stem:"The colonists thought the new taxes were unfair because"},

{id:"declaration", title:"The Declaration of Independence", book:"Book Lesson 7",
 goal:"Explain the main ideas of the Declaration of Independence.",
 html:`<p>On <b>July 4, 1776</b>, Congress approved the <b>Declaration of Independence</b>. <b>Thomas Jefferson</b> wrote most of it. Here's its most famous part, in his real words:</p>
<p class="quote">"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness."</p>
<p>In plain words: everyone is born with rights nobody can take away (<b>unalienable rights</b>). Governments exist to protect those rights. Their power comes from the <b>consent of the governed</b>, meaning the people agree to it. If a government destroys people's rights, the people can change it or replace it.</p>
<p>Jefferson then listed complaints against King George III to prove the king had broken that deal.</p>
<p>One big problem: in 1776, "all men are created equal" did not include enslaved people, women, or Native Americans.</p>`,
 qs:[
  {q:"According to the Declaration, where does a government's power come from?",c:["From the people who agree to be governed","From the king who inherits the throne by birth","From the army that protects the whole country","From the wealthy people who own the most land"],why:"\"Consent of the governed\" means the people give government its power.",hint:"Find the words \"consent of the governed.\""},
  {q:"Why did Jefferson list complaints about King George III?",c:["To prove the king broke his deal with the people","To ask the king for lower taxes and more trade","To show Britain the colonies could pay their debts","To explain why the colonies needed a new king"],why:"If the king broke the deal, the people could replace that government.",hint:"Read the sentence about the complaints."}],
 stem:"\"All men are created equal\" was a big promise, but in 1776"},

{id:"articles", title:"The Articles of Confederation Flop", book:"Book Lesson 10",
 goal:"Explain why the Articles of Confederation failed.",
 html:`<p>After breaking away from a powerful king, Americans were scared of strong government. Their first plan, the <b>Articles of Confederation</b> (1781), made the national government weak on purpose:</p>
<ul><li>One vote per state in <b>Congress</b>, no matter how big the state.</li>
<li>No president. No national courts.</li>
<li>9 of 13 states had to agree to pass any big law, and all 13 to change the Articles.</li>
<li>Congress could <b>not</b> collect taxes. It could only ask states for money, and they often said no.</li></ul>
<p>Then came <b>Shays' Rebellion</b> (1786–87). Massachusetts farmers were losing their farms over debts and taxes. Led by <b>Daniel Shays</b>, about 1,500 of them shut down courts and tried to seize a weapons storehouse. Congress had no army to stop them.</p>
<p>Many leaders panicked. If the government couldn't keep order, the country might fall apart.</p>`,
 qs:[
  {q:"Why did Congress run out of money under the Articles?",c:["It could only ask states for money; they often said no","It spent too much paying the president and national judges","Big states got more votes and kept most of the tax money","The British king still collected taxes in many states"],why:"Congress had no power to tax. It could only ask.",hint:"Look at the last bullet."},
  {q:"What did Shays' Rebellion show leaders?",c:["The national government was too weak to keep order","The farmers wanted a strong king to run the country","The states had too little power over their own people","Congress had kept too many soldiers in Massachusetts"],why:"Congress had no army, so it couldn't stop the uprising.",hint:"Read the last two paragraphs."}],
 stem:"The Articles of Confederation failed because"},

{id:"compromise", title:"Big States vs. Small States", book:"Book Lessons 11–12",
 goal:"Explain the Great Compromise and why Congress has two houses.",
 html:`<p>In the summer of <b>1787</b>, 55 delegates met in Philadelphia. They were only supposed to fix the Articles. Instead, they wrote a whole new plan, and they kept their meetings secret.</p>
<p>Their biggest fight: how should states be <b>represented</b> in Congress?</p>
<ul><li><b>Virginia Plan:</b> more people = more votes. (Virginia had about 750,000 people in 1790.)</li>
<li><b>New Jersey Plan:</b> every state gets an equal vote. (Delaware had about 59,000.)</li></ul>
<p>Big states said equal votes weren't fair to them. Small states feared big states would control everything.</p>
<p><b>Roger Sherman</b> of Connecticut pushed the <b>Great Compromise</b>:</p>
<ul><li><b>House of Representatives:</b> seats based on population.</li>
<li><b>Senate:</b> two senators per state.</li></ul>
<p>It passed by just one vote. That's why Iowa has the same number of senators as California: two.</p>`,
 qs:[
  {q:"Why did small states like the New Jersey Plan?",c:["Every state would get an equal vote","Bigger states would get more votes","Seats would depend on each state's land","Small states would pay less tax"],why:"Equal votes meant big states couldn't outvote them.",hint:"Look at the New Jersey Plan bullet."},
  {q:"Under the Great Compromise, which part of Congress gives every state the same number of members?",c:["The Senate, with two members per state","The House, with seats based on population","Both, with ten members from each state","Neither, because seats depend on wealth"],why:"Every state gets two senators, big or small.",hint:"Look at the two Great Compromise bullets."}],
 stem:"The Great Compromise helped both big and small states because"},

{id:"slavery", title:"The Slavery Compromises", book:"Book Lesson 13", serious:true,
 goal:"Explain how the original Constitution protected slavery, and why the delegates agreed to it.",
 html:`<p>In 1790, about <b>700,000</b> people in the United States were enslaved, about 1 out of every 6 people. Most lived in the South.</p>
<p>At the Convention, delegates from South Carolina, North Carolina, and Georgia warned they would not join unless slavery was protected. Most delegates wanted the new government more than they wanted a fight over slavery. So they made deals:</p>
<ul><li><b>Three-Fifths Clause:</b> every 5 enslaved people counted as 3 when deciding a state's seats in the House. Enslaved people could not vote, but their numbers gave Southern states more power.</li>
<li><b>Slave trade:</b> Congress could not ban bringing enslaved people from overseas until <b>1808</b>. Congress banned it the first year it could.</li>
<li><b>Fugitive Slave Clause</b> (fugitive = someone running away): people who escaped slavery had to be returned.</li></ul>
<p>The original Constitution never uses the word "slavery." Slavery did not end until the <b>13th Amendment</b> in 1865.</p>`,
 qs:[
  {q:"Why did Southern states want enslaved people counted when deciding House seats?",c:["Counting more people meant more seats and power","Enslaved people would then be allowed to vote too","It would lower the taxes their states had to pay","Northern states had demanded that they be counted"],why:"House seats are based on population, so counting enslaved people gave the South more seats.",hint:"Look at the Three-Fifths bullet."},
  {q:"Why did most delegates agree to these deals?",c:["They wanted the new government more than a fight over slavery","Most delegates wanted slavery to spread into the new states","The Constitution said slavery would have to end by the year 1808","The Northern states had already ended slavery everywhere"],why:"Three Southern states threatened to stay out, and most delegates chose the union over the fight.",hint:"Reread paragraph 2. (1808 only ended the overseas trade.)"}],
 stem:"The original Constitution protected slavery by"},

{id:"checks", title:"Checks and Balances", book:"Book Lessons 4, 14–15",
 goal:"Explain how separation of powers and checks and balances keep any branch from getting too powerful.",
 html:`<p>The Founders had one big fear: people with power usually try to get more of it.</p>
<p>Their fix was to split power three ways. This is <b>separation of powers</b>.</p>
<ul><li><b>Legislative branch (Congress):</b> makes the laws.</li>
<li><b>Executive branch (President):</b> carries out the laws.</li>
<li><b>Judicial branch (courts):</b> decides what laws mean and settles disputes.</li></ul>
<p>Then they gave each branch ways to block the others. This is <b>checks and balances</b>.</p>
<ul><li>The President can <b>veto</b> (reject) a bill.</li>
<li>Congress can <b>override</b> a veto with two-thirds of both the House and Senate.</li>
<li>The Senate must approve the President's top picks, like judges.</li>
<li>Courts can rule that a law breaks the Constitution.</li></ul>
<p>This makes government slow. The Founders thought slow was safer than a government that could act fast and crush people's rights.</p>`,
 qs:[
  {q:"The President vetoes a bill. What can Congress do next?",c:["Override it with two-thirds of both houses","Vote again and pass it with a simple majority","Ask the Vice President to sign it into law instead","Send it to the state legislatures to approve"],why:"A two-thirds vote in both the House and Senate overrides a veto.",hint:"Find the bullet about the President's veto."},
  {q:"Why did the Founders accept a slow government?",c:["Slow was safer than one that could crush rights","They wanted Congress to hold most of the power","They thought the government had little to do","They wanted the President to act alone"],why:"Making each branch check the others slows things down, but it protects rights.",hint:"Read the last paragraph."}],
 stem:"Checks and balances protect people because"},

{id:"ratify", title:"The Fight to Ratify", book:"Book Lessons 16–17",
 goal:"Compare the Federalists and Anti-Federalists, and explain the deal that won.",
 html:`<p>On <b>September 17, 1787</b>, most delegates signed the Constitution. <b>Benjamin Franklin</b>, age 81, said it wasn't perfect, but he doubted anyone could do better. <b>George Mason</b> refused to sign. His biggest complaint: there was <b>no bill of rights</b>.</p>
<p>Now 9 of the 13 states had to <b>ratify</b> (approve) it. Two sides formed:</p>
<ul><li><b>Federalists</b> (for it): the country needed a stronger national government, and checks and balances would keep it in line. <b>Alexander Hamilton, James Madison, and John Jay</b> wrote 85 newspaper essays defending it, called <b>The Federalist Papers</b>.</li>
<li><b>Anti-Federalists</b> (against it): a strong national government could crush the states and people's rights. <b>Patrick Henry</b> had refused to go to the Convention, reportedly saying he "smelled a rat" (thought something sneaky was going on).</li></ul>
<p>The deal that won: Federalists promised to add a bill of rights. In June 1788, New Hampshire became the 9th state to ratify.</p>`,
 qs:[
  {q:"What was George Mason's biggest complaint about the Constitution?",c:["It had no bill of rights to protect people","It gave small states too many senators","It made the President too weak to lead","It let the states keep their own separate armies"],why:"Mason refused to sign mainly because rights weren't listed.",hint:"Read the first paragraph."},
  {q:"What deal helped the Constitution get ratified?",c:["Federalists promised to add a bill of rights","Anti-Federalists picked the first President","Small states got more seats in the House","States could ignore laws they didn't like"],why:"Promising a bill of rights won over enough doubters.",hint:"Read the last paragraph."}],
 stem:"The Anti-Federalists were worried because"},

{id:"billofrights", title:"The Bill of Rights", book:"Book Lessons 19, 23–24",
 goal:"Explain what the Bill of Rights protects.",
 html:`<p>The new Congress kept the Federalists' promise. <b>James Madison</b> wrote a list of <b>amendments</b> (changes). In <b>1791</b>, the states ratified the first ten. Together they're called the <b>Bill of Rights</b>.</p>
<p>The <b>First Amendment</b> protects five freedoms: <b>religion, speech, press, assembly</b> (gathering peacefully), and <b>petition</b> (asking the government to fix a problem).</p>
<p>Other amendments protect people accused of crimes, like the right to a fair, speedy trial with a jury and protection from cruel punishment.</p>
<p>The last two cover everything not on the list:</p>
<ul><li><b>9th:</b> just because a right isn't listed doesn't mean you don't have it.</li>
<li><b>10th:</b> powers not given to the national government belong to the states or the people.</li></ul>
<p><b>Iowa connection:</b> In 1969, the Supreme Court ruled in <i>Tinker v. Des Moines</i> that Des Moines students who wore black armbands to protest the Vietnam War were protected by the First Amendment.</p>`,
 qs:[
  {q:"Which of these is one of the five First Amendment freedoms?",c:["Gathering peacefully with other people","Getting a free education from the state","Owning a business without paying taxes","Driving a car without getting a license"],why:"Gathering peacefully is called \"assembly.\"",hint:"Look at the list of five freedoms."},
  {q:"Why is the 9th Amendment important?",c:["Rights not on the list are still protected","States can take away rights on the list","Congress can add new taxes at any time","The President can ignore court rulings"],why:"The list isn't the only rights people have.",hint:"Look at the 9th Amendment bullet."}],
 stem:"One First Amendment freedom that protects people is"},

{id:"federalism", title:"Federalism: Who's in Charge?", book:"Book Lesson 18",
 goal:"Sort powers between the national government and state governments like Iowa.",
 html:`<p>The Constitution splits power between the <b>national (federal) government</b> and the <b>state governments</b>. This is called <b>federalism</b>.</p>
<ul><li><b>Federal government:</b> prints money, runs the Post Office, declares war, makes deals with other countries.</li>
<li><b>State governments (like Iowa):</b> run public schools, give out driver's licenses, set marriage rules.</li>
<li><b>Both:</b> collect taxes, build roads, make and enforce laws.</li></ul>
<p>What if a state law and a federal law clash? The Constitution's <b>supremacy clause</b> says the Constitution, and federal laws that follow it, win.</p>
<p>Under the Articles, the states had almost all the power. The new Constitution tried to strike a balance.</p>
<p>So who has the final say? The Founders said <b>the people</b>. That's why the Constitution begins with "We the People."</p>`,
 qs:[
  {q:"Which of these does Iowa's state government control?",c:["Driver's licenses","Printing paper money","Declaring war","Running the Post Office"],why:"Driver's licenses are a state power. The other three are federal.",hint:"Look at the state governments bullet."},
  {q:"Iowa passes a law that clashes with a federal law. Which one wins?",c:["The federal law, because of the supremacy clause","Iowa's law, because the states came first","The newer law, because it replaces the old one","Neither one, until Iowa voters get to decide"],why:"The supremacy clause makes the Constitution and federal laws win.",hint:"Find \"supremacy clause.\""}],
 stem:"Federalism means"},

{id:"iowa", title:"Iowa's Constitution", book:"Book Lesson 8",
 goal:"Compare the first state governments to how Iowa's government works today.",
 html:`<p>Before the U.S. Constitution, each new state wrote its own <b>state constitution</b>. After dealing with a king, most states were scared of strong leaders. So they gave almost all the power to the <b>legislature</b> (the lawmakers) and kept the <b>governor</b> weak.</p>
<p>It didn't go well. Some legislatures passed laws that helped one group and hurt others, and nothing could stop them.</p>
<p><b>Massachusetts</b> (1780) tried something different: a stronger governor elected by the people, who could <b>veto</b> laws. Lawmakers could still override the veto with a two-thirds vote.</p>
<p>Iowa works the same way today. Iowa's constitution (1857) sets up a <b>General Assembly</b> with two houses, a governor who can veto bills, and a two-thirds vote in each house to override. It even starts with its own <b>Bill of Rights</b>.</p>`,
 qs:[
  {q:"Why did most early states keep their governors weak?",c:["They feared strong leaders after dealing with a king","Governors cost the states too much money to pay each year","Congress ordered the states to keep governors weak","Voters wanted the state courts to write the laws"],why:"Memories of the king made them afraid of strong leaders.",hint:"Read the first paragraph."},
  {q:"How is Iowa's government like Massachusetts' 1780 plan?",c:["The governor can veto, and lawmakers can override","The legislature holds the power, not the governor","The governor picks the lawmakers for each district","The state courts choose who becomes the governor"],why:"Both use a governor's veto with a two-thirds override.",hint:"Find what the Massachusetts governor could do."}],
 stem:"Giving almost all the power to one branch is risky because"}
];

const R2 = [
{id:"parties", title:"Where Political Parties Came From", book:"Book Lesson 20",
 goal:"Explain how the first political parties formed and how they connect to today's parties.",
 html:`<p>George Washington won every electoral vote, twice. He warned Americans not to split into <b>political parties</b>. James Madison worried about <b>factions</b>: groups that chase what's good for themselves instead of the whole country.</p>
<p>Parties formed anyway, over a big fight about the Constitution:</p>
<ul><li><b>Alexander Hamilton</b> wanted a strong national government and read the Constitution <b>loosely</b>. His side: the <b>Federalists</b>.</li>
<li><b>Thomas Jefferson</b> wanted power kept closer to the states and read the Constitution <b>strictly</b>. His side: the <b>Democratic-Republicans</b>.</li></ul>
<p>Their first big fight: Hamilton wanted a national bank. The Constitution never mentions banks. Hamilton said the "necessary and proper" clause allowed it. Jefferson said it didn't. Washington sided with Hamilton.</p>
<p><b>Heads up:</b> Jefferson's party later became today's <b>Democratic Party</b>. Today's <b>Republican Party</b> is a different party that started in 1854.</p>`,
 qs:[
  {q:"Why did Jefferson oppose the national bank?",c:["The Constitution didn't clearly give that power","He wanted each state to print its own paper money","He thought Britain should run America's bank","He wanted the bank built in Virginia instead"],why:"Jefferson read the Constitution strictly, and it never mentions banks.",hint:"Read the paragraph about the bank."},
  {q:"Today, Congress wants to pay for something the Constitution never mentions, like a space program. Whose way of reading the Constitution says that is allowed?",c:["Hamilton, because he read the Constitution loosely","Jefferson, because he read the Constitution strictly","Jefferson, because he wanted power kept in the states","Neither, because Washington closed the national bank"],why:"Reading the Constitution loosely means Congress can do things it doesn't list, if they're needed.",hint:"Find the words \"loosely\" and \"strictly.\""}],
 stem:"Washington and Madison worried about parties because"},

{id:"voting", title:"Who Gets to Vote?", book:"Book Lesson 25",
 goal:"Explain how the right to vote expanded over time.",
 html:`<p>When the Constitution started, each state decided who could vote. Mostly that meant <b>white men who owned property</b>.</p>
<p>The right to vote, called <b>suffrage</b>, grew step by step:</p>
<ul><li><b>1820s–1850s:</b> states dropped property rules for white men.</li>
<li><b>1870, 15th Amendment:</b> no denying the vote because of race. But many Southern states blocked Black voters with <b>poll taxes</b> (pay to vote), <b>literacy tests</b>, and threats.</li>
<li><b>1920, 19th Amendment:</b> women win the vote after more than 70 years of fighting.</li>
<li><b>1924:</b> Native Americans become citizens, though some states still blocked them for years.</li>
<li><b>1964–1965:</b> the <b>24th Amendment</b> bans poll taxes in federal elections, and the <b>Voting Rights Act</b> (1965) starts ending literacy tests. By 1970 they were banned everywhere.</li>
<li><b>1971, 26th Amendment:</b> voting age lowered to <b>18</b>. During the Vietnam War, people argued: old enough to be drafted (forced to join the military), old enough to vote.</li></ul>`,
 qs:[
  {q:"How did many Southern states keep Black men from voting after the 15th Amendment?",c:["Poll taxes, literacy tests, and threats","A new amendment that took the vote away","Counting Black votes as three-fifths","Requiring a college degree to vote"],why:"These tricks blocked voters without saying \"race\" out loud.",hint:"Look at the 1870 bullet."},
  {q:"What argument helped lower the voting age to 18?",c:["Old enough to be drafted, old enough to vote","Eighteen-year-olds pay the most in taxes","Most 18-year-olds had already finished college","The Constitution first set the age at 18"],why:"Young men were being drafted to fight in Vietnam but couldn't vote.",hint:"Look at the 1971 bullet."}],
 stem:"The right to vote grew over time because"},

{id:"participate", title:"How Citizens Take Part", book:"Book Lesson 28",
 goal:"Describe ways citizens can take part in government and which rights are for citizens only.",
 html:`<p>A <b>citizen</b> is anyone born in the United States or born to U.S.-citizen parents. (In 2026, the Supreme Court said this 14th Amendment rule still stands.) Immigrants can also become citizens through <b>naturalization</b> (a legal process with a test and an oath).</p>
<p>Most rights protect everyone who lives here. A few are for citizens only, like <b>voting</b> (in Iowa, that's every election), serving on a jury, and <b>running for Congress or President</b>.</p>
<p>Ways to take part:</p>
<ul><li>Vote in local, state, and national elections</li>
<li>Stay informed and check whether news is accurate</li>
<li>Contact your representatives</li>
<li>Sign a petition or join a peaceful protest</li>
<li>Volunteer for a campaign or run for office</li>
<li>Serve on a jury</li></ul>
<p>Think of government like a mechanic you hired to fix your car. First you check that they can do the job. Then you keep an eye on them. If they do bad work, you replace them. Voting is how citizens hire and fire leaders.</p>`,
 qs:[
  {q:"Which right is only for U.S. citizens?",c:["Voting in federal elections","Freedom of speech and the press","Getting a fair trial with a lawyer","Freedom of religion and worship"],why:"Speech, religion, and fair trials protect everyone here. Voting in federal elections is citizens only.",hint:"Look at the second paragraph."},
  {q:"In the mechanic example, what is voting like?",c:["Hiring the mechanic, or firing them for bad work","Paying the mechanic once the work is done","Fixing the car yourself to save some money","Selling the old car and buying a brand-new one"],why:"Voting is how citizens choose leaders and replace them.",hint:"Read the last paragraph."}],
 stem:"One way I could take part in government is"},

{id:"responsibility", title:"Rights Come With Responsibilities", book:"Book Lesson 29",
 goal:"Explain citizens' responsibilities and what civil disobedience is.",
 html:`<p>Rights only work if people hold up their end. Drive recklessly and put others in danger, and you can lose your license. Shout down everyone at a meeting, and you can be removed.</p>
<p>What if you think a law is <b>unjust</b> (unfair)? In America you have the right to work to <b>change</b> it: vote, petition, protest, or go to court. Until it changes, you're expected to obey it.</p>
<p>Some people have chosen <b>civil disobedience</b>: breaking an unjust law on purpose, peacefully, and accepting the punishment to show the law is wrong.</p>
<ul><li><b>Henry David Thoreau</b> went to jail in 1846 rather than pay a tax he said supported slavery and an unjust war with Mexico.</li>
<li><b>Dr. Martin Luther King Jr.</b> and civil rights protesters broke segregation laws in the 1950s and 1960s and were arrested many times.</li></ul>
<p>The Founders also hoped citizens would have <b>civic virtue</b>: caring about the <b>common good</b>, not just themselves.</p>`,
 qs:[
  {q:"What is civil disobedience?",c:["Peacefully breaking an unjust law and accepting punishment","Breaking any law you dislike and hoping not to get caught","Signing a petition that asks Congress to change an unjust law","Moving to another state to get away from an unfair law"],why:"It's on purpose, peaceful, and the person accepts the consequences.",hint:"Read the third paragraph."},
  {q:"Why did Thoreau go to jail?",c:["He refused to pay a tax he said supported slavery and war","He led an armed revolt against the U.S. government","He printed a newspaper that attacked the President","He refused to serve in the army during a war with Mexico"],why:"He refused the tax as a protest.",hint:"Look at the Thoreau bullet."}],
 stem:"Civil disobedience is different from just breaking the law because"}
];

const R3 = [
{id:"marbury", title:"Marbury v. Madison", book:"Book Lesson 21",
 goal:"Explain how the Supreme Court got the power of judicial review.",
 html:`<p>Right before leaving office in 1801, President <b>John Adams</b> gave dozens of his supporters jobs as judges. One was <b>William Marbury</b>. But Marbury's papers were never delivered. The new President, <b>Thomas Jefferson</b>, told his Secretary of State, <b>James Madison</b>, not to deliver them.</p>
<p>Marbury went straight to the Supreme Court and asked it to order Madison to hand them over. A law passed by Congress said he could do that.</p>
<p>Chief Justice <b>John Marshall</b> ruled in <b>1803</b>:</p>
<ul><li>Yes, Marbury had a right to his job.</li>
<li>But the law letting him go straight to the Supreme Court broke the Constitution. So that law was <b>void</b>. It didn't count.</li></ul>
<p>That gave courts the power of <b>judicial review</b>: deciding whether a law breaks the Constitution, and throwing it out if it does.</p>
<p><b>Plot twist:</b> Marshall had been Adams's Secretary of State. Delivering those papers had been <i>his</i> job.</p>`,
 qs:[
  {q:"Why didn't Marbury get his job?",c:["Jefferson's team refused to deliver his papers","Congress voted to remove him from the new job","The Supreme Court said he wasn't qualified for it","Adams changed his mind and gave the job to a friend"],why:"Jefferson told Madison not to deliver them.",hint:"Read the first paragraph."},
  {q:"What power did the Court claim in Marbury v. Madison?",c:["Throwing out laws that break the Constitution","Choosing who becomes the next President","Writing laws when Congress refuses to act","Firing federal judges who make bad rulings"],why:"That's judicial review.",hint:"Find the words \"judicial review.\""}],
 stem:"Judicial review is a check on Congress because"},

{id:"interpret", title:"How Do Judges Decide?", book:"Book Lesson 22",
 goal:"Describe the different ways judges interpret the Constitution.",
 html:`<p>The Constitution uses big, fuzzy phrases like "unreasonable searches" and "due process of law." Judges have to decide what they mean in real cases. That's one reason some Supreme Court decisions are split 5 to 4.</p>
<p>Judges use different methods:</p>
<ul><li><b>The words:</b> what did the words mean when they were written?</li>
<li><b>The Framers' intent:</b> what were the people who wrote it trying to do?</li>
<li><b>Principles + today's world:</b> what basic values does it protect, and how do they apply now?</li></ul>
<p>Judges also look at <b>precedent</b>: earlier court decisions on similar cases.</p>
<p>Each method has critics. The Framers disagreed with each other, so their intent can be hard to know. Judges who focus on today's world can be accused of using their own opinions.</p>
<p><b>Real example:</b> the Constitution never mentions phones. In <i>Riley v. California</i> (2014), the Court ruled police usually need a <b>warrant</b> to search your phone after an arrest.</p>`,
 qs:[
  {q:"A judge asks, \"What were the people who wrote this trying to do?\" Which method is that?",c:["Looking at the Framers' intent","Looking at the words alone","Looking at how it fits today","Looking at older court cases"],why:"Asking what the writers meant to do is the Framers' intent method.",hint:"Look at the three methods."},
  {q:"What is precedent?",c:["Earlier court decisions on similar cases","The first written draft of the Constitution","A judge's personal opinion on a case","The final vote count when judges decide"],why:"Judges look back at how similar cases were decided.",hint:"Find the word \"precedent.\""}],
 stem:"Judges sometimes disagree about what the Constitution means because"},

{id:"courts", title:"How the Courts Are Set Up", book:"Book Lessons 15, 19",
 goal:"Describe how federal courts are organized and why judges serve for life.",
 html:`<p>America has two court systems: <b>federal courts</b> for federal laws and the Constitution, and <b>state courts</b> (like Iowa's) for state laws.</p>
<p>Most federal cases start in a <b>district court</b>, where a judge or jury hears the case. If you lose, you can <b>appeal</b>: ask a higher court to review it. The top court is the <b>Supreme Court</b>.</p>
<ul><li>The Supreme Court has <b>9 justices</b>.</li>
<li>Thousands of cases ask for review each year. The Court picks fewer than 100.</li>
<li>A few cases, like fights between two states, go straight to the Supreme Court.</li></ul>
<p>Federal judges are chosen by the President, approved by the Senate, and serve for life unless they're impeached and removed. The Framers wanted judges free to make unpopular rulings without worrying about losing their jobs.</p>
<p>The number 9 isn't in the Constitution. Congress set it, and it has been 9 since 1869.</p>`,
 qs:[
  {q:"You lose your case in a federal district court. What can you do next?",c:["Appeal and ask a higher court to review it","Ask Congress to vote to change the ruling","Start the same case over in the same court","Ask your state's governor to overturn the ruling"],why:"An appeal sends the case up to a higher court.",hint:"Read the second paragraph."},
  {q:"Why do federal judges serve for life?",c:["So they can make unpopular rulings and not lose their jobs","So one President can't appoint too many judges to the Court","Because the Constitution sets the number of judges at nine","So the President can fire them if they ever rule against him"],why:"Job security lets judges follow the law, not popularity.",hint:"Read the paragraph about how judges are chosen."}],
 stem:"Being able to appeal a case is important because"},

{id:"tinker", title:"Tinker v. Des Moines", book:"Book Lesson 23",
 goal:"Explain students' free speech rights at school and their limits.",
 html:`<p>In December 1965, a group of Des Moines students wore <b>black armbands</b> to school to protest the Vietnam War. One was <b>Mary Beth Tinker</b>, 13. Her brother <b>John</b> was 15, and their friend <b>Christopher Eckhardt</b> was 16.</p>
<p>The school district had banned armbands just days earlier. The students were <b>suspended</b>. Their families sued, saying the school broke their <b>freedom of speech</b>.</p>
<p>In <b>1969</b>, the Supreme Court ruled 7 to 2 for the students. It said students don't lose their constitutional rights "at the schoolhouse gate."</p>
<p>But there's a limit. Schools <b>can</b> stop speech that seriously <b>disrupts</b> school or invades other people's rights. The armbands were quiet and caused no real disruption.</p>
<p>Later cases drew more lines. In 2007, the Court let a school punish a student's "Bong Hits 4 Jesus" banner. In 2021, it sided with a cheerleader punished for an off-campus Snapchat post.</p>`,
 qs:[
  {q:"Why did the Court side with the students?",c:["The armbands were quiet and didn't disrupt school","The school had no rule about wearing armbands","Their parents had given them permission to protest","Students have unlimited speech rights at school"],why:"No real disruption meant the school couldn't punish their message.",hint:"Find \"The armbands were quiet.\""},
  {q:"Based on Tinker, when CAN a school limit student speech?",c:["When it seriously disrupts school or others' rights","Whenever a teacher or principal dislikes the message","Whenever the speech is about war or the government","When a parent complains to the principal"],why:"Disruption is the line the Court drew.",hint:"Find \"But there's a limit.\""}],
 stem:"Tinker v. Des Moines matters to students today because"},

{id:"equal", title:"Separate Is Not Equal", book:"Book Lesson 26", serious:true,
 goal:"Explain how the Supreme Court's view of equal protection changed from Plessy to Brown.",
 html:`<p>After the Civil War, the <b>14th Amendment</b> (1868) promised every person <b>equal protection of the laws</b>. But many states passed <b>Jim Crow laws</b> forcing Black and white Americans apart: separate schools, train cars, even water fountains. This is <b>segregation</b>.</p>
<p>In <i>Plessy v. Ferguson</i> (1896), the Supreme Court said segregation was allowed as long as things were <b>"separate but equal."</b> They almost never were.</p>
<p>In <i>Brown v. Board of Education</i> (1954), the Court changed its mind. Lawyer <b>Thurgood Marshall</b> argued for families like <b>Linda Brown's</b> in Topeka, Kansas. All nine justices agreed: separate schools are unequal and break the 14th Amendment.</p>
<p>Many states fought back. In 1957, Arkansas's governor tried to stop nine Black students from entering Little Rock Central High. President Eisenhower sent the Army.</p>
<p><b>Iowa connection:</b> In 1868, the Iowa Supreme Court ruled in <i>Clark v. Board</i> that Iowa schools could not separate students by race, 86 years before Brown.</p>`,
 qs:[
  {q:"What did \"separate but equal\" allow?",c:["States to keep the races apart if things were \"equal\"","Black and white students to pick any school they wanted","Congress to end segregation in the Southern states","Each state to decide if Black citizens could vote"],why:"Plessy let segregation stand as long as facilities were supposedly equal.",hint:"Read the Plessy paragraph."},
  {q:"How was Brown v. Board different from Plessy?",c:["It said separate schools could never be truly equal","It said segregation was fine on trains and buses only","It let each school vote on whether to segregate","It agreed with Plessy but sped up the changes"],why:"Brown overturned the idea of \"separate but equal\" in schools.",hint:"Read the Brown paragraph."}],
 stem:"Brown v. Board was a turning point because"},

{id:"gault", title:"Due Process: The Gerald Gault Case", book:"Book Lesson 27",
 goal:"Explain what due process means and how it applies to teens.",
 html:`<p>The <b>5th</b> and <b>14th Amendments</b> say government can't take away your "life, liberty, or property, without <b>due process of law</b>." Due process means government has to treat you <b>fairly</b> and follow fair steps.</p>
<p>In June 1964, <b>Gerald Gault</b>, 15, was picked up in Arizona after a neighbor said he made a rude prank phone call. Here's what happened:</p>
<ul><li>His parents weren't told he'd been taken.</li>
<li>At his hearings there was <b>no lawyer</b>, nobody swore to tell the truth, and <b>no record</b> was kept.</li>
<li>The neighbor who complained <b>never came to court</b>.</li>
<li>The judge sent Gerald to a state school for juveniles <b>until age 21</b>, about 6 years.</li></ul>
<p>An adult would have faced a $5 to $50 fine or up to two months in jail.</p>
<p>In <i>In re Gault</i> (1967), the Supreme Court ruled 8 to 1 for Gerald. Teens in juvenile court get due process too: notice of the charges, a <b>lawyer</b>, the right to question witnesses, and the right to stay silent.</p>`,
 qs:[
  {q:"Which unfair step happened in Gerald's case?",c:["The neighbor who complained never came to court","He was forced to take a lawyer he didn't even want","A jury of adults from his own town found him guilty","His hearing was shown live on the town's TV news"],why:"He never got to face or question his accuser.",hint:"Look at the bullet list."},
  {q:"What did In re Gault decide?",c:["Teens in juvenile court get due process rights too","Juvenile courts should use a jury of teenagers","Teens accused of crimes go to adult court","Adults, but not teens, have a right to a lawyer"],why:"The Court said juveniles get fair-process rights like a lawyer and notice.",hint:"Read the last paragraph."}],
 stem:"Due process is important because"}
];

const RL = [
{id:"congress-powers", title:"What Can Congress Do?", book:"Book Lesson 14",
 goal:"Explain Congress's listed powers and the necessary and proper clause.",
 html:`<p>Under the Articles, Congress couldn't even collect taxes. The Framers fixed that in <b>Article I</b> of the Constitution.</p>
<p>They listed Congress's <b>enumerated powers</b> (powers written out). Some big ones:</p>
<ul><li>Collect <b>taxes</b> and borrow money</li>
<li>Regulate trade with other countries and <b>between the states</b></li>
<li>Print <b>money</b></li>
<li><b>Declare war</b> and raise an army and navy</li></ul>
<p>Then they added the <b>necessary and proper clause</b>, also called the <b>elastic clause</b>. It lets Congress make laws needed to carry out its listed powers. Example: the Constitution says Congress can raise an army. It never says "draft," but drafting soldiers is one way to raise an army.</p>
<p><b>How a bill becomes a law:</b> it passes the <b>House</b> and the <b>Senate</b> by majority vote, then the <b>President</b> signs it. If the President vetoes it, Congress can override with <b>two-thirds</b> of both houses.</p>`,
 qs:[
  {q:"Why is it called the \"elastic\" clause?",c:["It stretches Congress's power to fit what's needed","It lets Congress change the Constitution any time","It lets the states snap back the powers they gave away","It shrinks the President's power during a war"],why:"Like elastic, it stretches the listed powers to cover what's needed to carry them out.",hint:"Read the paragraph about the necessary and proper clause."},
  {q:"Which of these is an enumerated power of Congress?",c:["Declaring war","Running schools","Issuing licenses","Choosing court cases"],why:"Declaring war is on the list. Schools and licenses belong to the states.",hint:"Look at the bullet list."}],
 stem:"Congress needed the power to collect taxes because"},

{id:"rep-choice", title:"The Representative's Choice", book:"Book Lesson 29",
 goal:"Explain why representatives face hard choices between their district and the common good.",
 html:`<p>Imagine you're in Congress. Your district has shoe factories. They're laying off workers because shoes made in other countries cost less. Factories overseas pay their workers lower wages.</p>
<p>A bill would put a <b>tariff</b> (a tax on imported goods) on foreign shoes.</p>
<ul><li><b>If it passes:</b> American-made shoes can compete again. Factory jobs in your district may be saved.</li>
<li><b>But:</b> shoes cost more for everyone, including families in your district who are just buying shoes. Other countries might put tariffs on American goods in return.</li></ul>
<p>Representatives face choices like this all the time. Should they vote for what their own district wants right now, or for what they think is best for the whole country, the <b>common good</b>?</p>
<p>The Founders hoped voters would choose leaders with <b>civic virtue</b>: people who put the common good ahead of narrow interests. But people often disagree about what the common good actually is.</p>`,
 qs:[
  {q:"In this story, who would the tariff help?",c:["Workers at the shoe factories in the district","Families in the district who want cheaper shoes","Shoe factories in other countries with low wages","Stores that sell shoes made in other countries"],why:"The tariff makes foreign shoes cost more, so local factories can compete.",hint:"Look at \"If it passes.\""},
  {q:"In this story, who would the tariff hurt?",c:["Shoppers, because shoes would cost more","Workers, because they'd lose their pay","The government, because it loses tax money","U.S. shoe makers, because they'd sell less"],why:"Everyone buying shoes would pay higher prices.",hint:"Look at \"But.\""}],
 stem:"A representative's choice on a bill like this is hard because"}
];

const RE = [
{id:"president-powers", title:"The President's Powers", book:"Book Lesson 15",
 goal:"Explain the President's powers and how Congress checks them.",
 html:`<p>The Framers had just escaped a king, so they were nervous about one powerful leader. They gave the job to one person anyway, but <b>shared</b> most big powers with Congress:</p>
<ul><li>The President is <b>Commander in Chief</b> of the military. Only <b>Congress</b> can declare war.</li>
<li>The President makes <b>treaties</b> with other countries. Two-thirds of the <b>Senate</b> must approve them.</li>
<li>The President picks judges and top officials. The Senate must <b>confirm</b> them.</li>
<li>The President can <b>veto</b> bills. Congress can override with two-thirds of both houses.</li></ul>
<p>If a President is accused of serious wrongdoing, the <b>House</b> can <b>impeach</b> (formally accuse), and the <b>Senate</b> holds a trial. Two-thirds of senators are needed to remove a President. Three Presidents have been impeached: Andrew Johnson, Bill Clinton, and Donald Trump (twice). None was removed.</p>
<p>Presidents are chosen by the <b>Electoral College</b>. Each state gets electors equal to its members of Congress. Iowa has 6. It takes <b>270</b> of 538 to win.</p>`,
 qs:[
  {q:"The President signs a treaty with another country. What else has to happen?",c:["Two-thirds of the Senate must approve it","The House must vote to approve it first","The Supreme Court must approve it too","The state governors must agree to it"],why:"Treaties need Senate approval.",hint:"Look at the treaties bullet."},
  {q:"What does it mean when the House impeaches a President?",c:["It formally accuses the President of wrongdoing","The President is removed from office at once","The President loses the power to veto bills","Voters hold a brand-new election within weeks"],why:"Impeaching is accusing. Removal takes a Senate trial and a two-thirds vote.",hint:"Read the impeachment paragraph."}],
 stem:"The Framers shared the President's powers with Congress because"},

{id:"washington", title:"Washington Sets the Example", book:"Book Lesson 19",
 goal:"Explain how Washington's choices shaped the presidency and the Cabinet.",
 html:`<p>In <b>1789</b>, <b>George Washington</b> became the first President. He didn't really want the job, but he felt it was his duty. Everything he did set an example, or <b>precedent</b>.</p>
<p>Some senators wanted to call him "His Highness." That sounded too much like a king. He became simply "<b>Mr. President</b>."</p>
<p>Congress created departments to help run the government, and Washington picked their leaders. These advisers became known as the <b>Cabinet</b>:</p>
<ul><li><b>Secretary of State</b> (Thomas Jefferson): dealing with other countries</li>
<li><b>Secretary of the Treasury</b> (Alexander Hamilton): money</li>
<li><b>Secretary of War</b> (Henry Knox): the military</li>
<li><b>Attorney General</b> (Edmund Randolph): legal advice</li></ul>
<p>Today there are <b>15</b> departments, and millions of people work in the executive branch.</p>
<p>Washington also stepped down after two terms, even though no rule made him. Presidents followed his example until Franklin Roosevelt won four times. The <b>22nd Amendment</b> (1951) made the two-term limit official.</p>`,
 qs:[
  {q:"Why didn't Washington use the title \"His Highness\"?",c:["It sounded too much like a king's title","Congress said the title cost too much","Jefferson refused to work for a \"Highness\"","Other countries made fun of the title"],why:"Americans had just broken away from a king.",hint:"Read the second paragraph."},
  {q:"How did the two-term limit start?",c:["Washington chose to step down after two terms","The Constitution set it from the very start","Congress passed it after Washington won","The Supreme Court ruled on it back in 1789"],why:"It began as Washington's example and became law in 1951.",hint:"Read the last paragraph."}],
 stem:"Washington's choices mattered so much because"}
];

const IMAGES = {
"why-gov":["Godfrey Kneller - Portrait of John Locke (Hermitage).jpg","John Locke, painted in 1697."],
"republic":["Cicero Denounces Catiline in the Roman Senate by Cesare Maccari - 3.jpg","The Roman Senate, painted in the 1880s. Roman leaders debated here instead of obeying a king."],
"england":["Magna Carta (British Library Cotton MS Augustus II.106).jpg","One of the four original 1215 copies of the Magna Carta, kept at the British Library in London."],
"revolution":["Paul Revere, after Henry Pelham, The Boston Massacre, 1770, NGA 11550.jpg","Paul Revere's 1770 print of the Boston Massacre. It was made to make colonists angry, so it isn't fully accurate."],
"declaration":["Declaration of Independence (1819), by John Trumbull.jpg","John Trumbull's painting of the Declaration being presented to Congress. It's on the back of the $2 bill."],
"articles":["Daniel Shays and Job Shattuck.jpg","Daniel Shays and Job Shattuck, rebellion leaders, on the cover of a 1787 Boston almanac."],
"compromise":["Washington Constitutional Convention 1787.jpg","George Washington leads the Constitutional Convention (painted in 1856)."],
"slavery":["Wedgwood - Anti-Slavery Medallion - Walters 482597.jpg","\"Am I not a man and a brother?\" An anti-slavery medallion made in England in 1787, the same year as the Convention."],
"checks":["Constitution of the United States - DPLA - 9ca804144bd5965e992ae3528bc3c6a3 (page 1).jpg","Page 1 of the real Constitution. Article I, about Congress, starts right after \"We the People.\""],
"ratify":["The Federalist (1st ed, 1788, vol I, title page).jpg","The Federalist essays, collected into a book in 1788."],
"billofrights":["Bill of Rights Pg1of1 AC.jpg","The original Bill of Rights. Congress sent 12 amendments to the states; 10 were ratified in 1791."],
"federalism":["Constitution We the People.jpg","\"We the People\": the first words of the Constitution."],
"iowa":["Old State Capitol at Iowa City - History of Iowa.jpg","Iowa's Old Capitol in Iowa City, where Iowa's 1857 constitution was written."],
"parties":["Alexander Hamilton portrait by John Trumbull (c. 1806).jpg","Alexander Hamilton, leader of the Federalists."],
"voting":["Women suffragists picketing in front of the White house.jpg","Women picket the White House for the right to vote, 1917."],
"participate":["View of Crowd at 1963 March on Washington.jpg","The 1963 March on Washington: about 250,000 people peacefully assembled."],
"responsibility":["Daguerreotype of Thoreau in 1856 by BD Maxham.png","Henry David Thoreau in 1856."],
"marbury":["John Marshall by Henry Inman, 1832.jpg","Chief Justice John Marshall."],
"interpret":["Cropped section of page 1 of the Constitution of the United States.jpg","Judges study these words to decide what they mean in new situations."],
"courts":["Oblique facade 3, US Supreme Court.jpg","The U.S. Supreme Court building in Washington, D.C."],
"tinker":["SCOTUS Justice Abe Fortas.jpeg","Justice Abe Fortas wrote the Court's opinion in Tinker. Two years earlier, he also wrote the Gault decision."],
"equal":["Operation Arkansas, Little Rock Nine.jpg","Soldiers from the 101st Airborne escort the Little Rock Nine to Central High School, 1957."],
"gault":["U.S. Supreme Court building-m.jpg","The Supreme Court building, where Gerald Gault's case was decided in 1967."],
"congress-powers":["United States Capitol - west front.jpg","The U.S. Capitol, where Congress meets."],
"rep-choice":["Learning to make shoes.jpg","Learning to make shoes in an American factory, early 1900s (photo by Lewis Hine). Jobs like these are what the tariff debate is about."],
"president-powers":["White House Exterior, North Portico-03-28-1948.jpg","The White House in 1948."],
"washington":["Federal Hall. The seat of Congress LCCN2003664760.jpg","Federal Hall in New York City (1790 engraving), where Washington took the oath of office in 1789."]
};

const ALL = [].concat(R, R2, R3, RL, RE);
window.BELL_RINGERS = {};
ALL.forEach(r => { r.image = IMAGES[r.id] ? { src: "img/" + r.id + ".jpg", file: IMAGES[r.id][0], caption: IMAGES[r.id][1] } : null; window.BELL_RINGERS[r.id] = r; });
})();
