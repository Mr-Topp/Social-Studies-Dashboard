// Sociology Unit 3 Day 6 · Sociology Case File (review project for the Unit 3 test). Fynn picked this 11/14/26.
// Sections match the Unit 3 summative parts: Soc.9 socialization, Soc.4 deviance theories, Soc.10 the self, Soc.11 groups.
// Facts checked 11/14/26 (sources: Malala's "I Am Malala" + BBC; Isaacson's "Steve Jobs"; Ali: Clay v. United States (1971);
// Ohtani: his Hanamaki Higashi goal chart + 2023 WBC final; Serena: 2018 US Open fines, Indian Wells 2001 boycott until 2015).
window.CF = {
  key: "soc-u3-d6-case-file-v1",
  assignmentId: "soc-u3-d6-case-file",
  title: "Sociology · Unit 3 · Day 6 · Sociology Case File",
  standard: "SS.9-12.Soc.4, SS.9-12.Soc.9, SS.9-12.Soc.10, SS.9-12.Soc.11",
  stdText: [
    ["SS.9-12.Soc.4", "Explain the sociological theories that are the basis of sociology."],
    ["SS.9-12.Soc.9", "Describe the process of socialization across the life course."],
    ["SS.9-12.Soc.10", "Explain the process of the social construction of the self."],
    ["SS.9-12.Soc.11", "Explain the social construction of groups and their impact on the life chances of individuals."]
  ],

  // ---------- the five real people (one fact per case-file section) ----------
  people: [
    { id: "malala", icon: "📚", name: "Malala Yousafzai", tag: "Activist · Pakistan", color: "#b0306a",
      facts: {
        raised: "Her dad, Ziauddin, ran a school for girls in Pakistan's Swat Valley. He brought Malala to class with him and talked about big issues with her at home.",
        rule: "In 2009, the Taliban, who controlled her valley, banned girls from going to school. At 11, Malala kept going anyway and wrote an online diary for BBC Urdu under a fake name.",
        mirror: "In 2012, a Taliban gunman shot her on her school bus. She survived. She has said she wants to be known as the girl who fought for education, not the girl who was shot.",
        crew: "The Taliban said girls in school went against their beliefs. Malala's side said every girl deserves to learn. In 2014, at 17, she became the youngest person ever to win the Nobel Peace Prize."
      } },
    { id: "jobs", icon: "💻", name: "Steve Jobs", tag: "Apple co-founder", color: "#2f5fb3",
      facts: {
        raised: "Paul and Clara Jobs adopted Steve as a baby. His dad Paul, a mechanic, gave him part of his garage workbench and taught him how to take things apart and fix them.",
        rule: "When Jobs was a teen, he and his friend Steve Wozniak made \"blue boxes,\" gadgets that let people make long-distance calls for free. That was illegal. Wozniak built them and Jobs sold them for about $150.",
        mirror: "In 4th grade Jobs was a troublemaker. His teacher, Imogene Hill, paid him $5 to finish a math workbook. Soon he worked hard just to make her proud. He called her one of the saints in his life.",
        crew: "In 1983, Jobs's small team building the first Macintosh flew a pirate flag over their building. His motto: \"It's better to be a pirate than to join the navy.\" They saw the rest of Apple as the navy."
      } },
    { id: "ali", icon: "🥊", name: "Muhammad Ali", tag: "Boxing champion", color: "#a33b1d",
      facts: {
        raised: "Born Cassius Clay, he joined the Nation of Islam in 1964 and changed his name to Muhammad Ali. His new religion changed his name, his daily habits, and how he talked about the world.",
        rule: "In 1967, Ali refused to be drafted into the Army during the Vietnam War, saying it went against his religion. He was convicted, banned from boxing for over three years, and lost his title. In 1971 the Supreme Court overturned his conviction.",
        mirror: "Before he was champion, Ali told reporters \"I am the greatest!\" Reporters nicknamed him \"the Louisville Lip.\" He later explained that he called himself the greatest before he even knew he was.",
        crew: "After he refused the draft, many Americans called Ali a traitor. Many others, especially young people and civil rights leaders, saw him as a hero. The same choice made him an outsider to one group and a hero to another."
      } },
    { id: "ohtani", icon: "⚾", name: "Shohei Ohtani", tag: "MLB superstar · Japan", color: "#1f7a4f",
      facts: {
        raised: "At his high school in Japan, coaches had players make goal charts. Ohtani's chart for becoming the top draft pick included \"pick up trash\" and \"respect umpires\" next to pitching goals.",
        rule: "In pro baseball, players have one job: pitch OR hit. Experts said doing both at the top level was impossible. Ohtani refused to pick one and became a star at both.",
        mirror: "TV cameras have caught Ohtani picking up trash on the field during big-league games. Nobody asks him to, and it's not his job. He does it anyway.",
        crew: "Before the 2023 World Baseball Classic final against the U.S., Ohtani told his Japan teammates, \"Let's stop admiring them\" just for today. Japan won, and Ohtani struck out U.S. star Mike Trout for the last out."
      } },
    { id: "serena", icon: "🎾", name: "Serena Williams", tag: "Tennis legend", color: "#6a3bb0",
      facts: {
        raised: "Her dad, Richard Williams, wrote a 78-page plan for his daughters' tennis careers before they were born. He coached Serena and her sister Venus on public courts in Compton, California.",
        rule: "At the 2018 U.S. Open final, the umpire gave Serena three code violations, one for smashing her racket. She argued and called him a \"thief.\" She was fined $17,000 and said men who argue get treated more lightly.",
        mirror: "From the time they were little, Richard told Serena and Venus again and again that they would be champions, long before anyone else believed it.",
        crew: "Tennis was mostly played by white players from country clubs. At a 2001 tournament in Indian Wells, California, the crowd booed Serena and her family. She refused to play there again for 14 years."
      } }
  ],

  // ---------- the four case-file sections (same order as the case file on the infographic) ----------
  sections: [
    { id: "raised", std: "SS.9-12.Soc.9", short: "Soc.9", icon: "🏠", name: "Raised By", sub: "Socialization",
      goal: "I can describe how people learn their society's ways, from birth to adulthood.",
      checks: [
        { id: "c1", q: "Kayla is a senior who wants to be a nurse. She starts copying how the nurses at her job shadow talk and dress. Which idea is this?",
          choices: ["Anticipatory socialization", "Resocialization", "Primary socialization", "Hidden curriculum"], answer: 0,
          hint: "Kayla is getting ready for a role she doesn't have yet.", why: "Anticipatory socialization: practicing the ways of a role before you get it." },
        { id: "c2", q: "Grandma Rose, 70, retires and moves to a senior community. She learns new routines and makes new friends. What does this show?",
          choices: ["Socialization keeps going your whole life", "Socialization ends when school ends", "Only family can socialize a person", "Older adults can't learn new norms"], answer: 0,
          hint: "Is Rose still learning new ways to act?", why: "Socialization happens across the whole life course, not just in childhood." }
      ],
      factQ: "Tap the fact that shows who taught them how to act.",
      terms: ["Family", "School", "Peers", "Mass media", "Religion", "The workplace"],
      termQ: "Which agent of socialization is it?",
      answers: { malala: "Family", jobs: "Family", ali: "Religion", ohtani: "School", serena: "Family" },
      writeQ: "How did this agent of socialization teach your person something?",
      stem: "___ taught ___ to ___. For example, ___.",
      poster: "Who taught them how to act" },
    { id: "rule", std: "SS.9-12.Soc.4", short: "Soc.4", icon: "🚨", name: "Rule Breaker", sub: "Deviance theories",
      goal: "I can use sociology theories to explain why people break rules.",
      checks: [
        { id: "c3", q: "Jay stops caring about a job or graduating. He skips school and plays video games all day. In Merton's strain theory, which response is this?",
          choices: ["Retreatism", "Innovation", "Conformity", "Rebellion"], answer: 0,
          hint: "Jay gave up on the goal AND on the normal ways to reach it.", why: "Retreatism: dropping both society's goals and the normal ways to reach them." },
        { id: "c4", q: "A teacher calls Rico \"the bad kid\" in front of class. Other teachers start watching him. Soon Rico starts acting the part. Which theory explains this best?",
          choices: ["Labeling theory", "Strain theory", "Differential association", "Conformity"], answer: 0,
          hint: "What changed after people gave Rico a name?", why: "Labeling theory: once people call you deviant, you may start to act that way." }
      ],
      factQ: "Tap the fact where your person broke a rule or a norm.",
      terms: ["Strain theory", "Differential association", "Labeling theory"],
      termQ: "Which theory explains the rule-breaking best?",
      answers: null,   // students choose and defend; any theory can work
      writeQ: "Which theory explains why your person broke the rule?",
      stem: "___ explains ___'s rule-breaking best because ___.",
      poster: "The rule they broke" },
    { id: "mirror", std: "SS.9-12.Soc.10", short: "Soc.10", icon: "🪞", name: "The Mirror", sub: "Building the self",
      goal: "I can explain how other people help build my sense of who I am.",
      checks: [
        { id: "c5", q: "Maya posts a selfie. It gets almost no likes. She decides she must look bad and deletes it. Which idea is this?",
          choices: ["Looking-glass self", "Generalized other", "The \"I\"", "Play stage"], answer: 0,
          hint: "Maya judged herself by what she imagined other people thought.", why: "Looking-glass self: we see ourselves the way we imagine others see us." }
      ],
      factQ: "Tap the fact that shows other people shaping how your person sees themselves.",
      terms: ["Looking-glass self", "Generalized other"],
      termQ: "Which idea fits best?",
      answers: null,
      writeQ: "How did other people shape how your person sees themselves?",
      stem: "Other people shaped ___'s self because ___. This shows the ___.",
      poster: "How others shaped who they are" },
    { id: "crew", std: "SS.9-12.Soc.11", short: "Soc.11", icon: "👥", name: "The Crew", sub: "Groups: us vs. them",
      goal: "I can explain how groups change how people act and affect their chances in life.",
      checks: [
        { id: "c6", q: "Note 1: A store manager thinks all teens steal. Note 2: He makes a rule that only two teens can be in the store at once. Which is correct?",
          choices: ["Note 1 = prejudice; Note 2 = discrimination", "Note 1 = discrimination; Note 2 = prejudice", "Both notes are prejudice", "Both notes are discrimination"], answer: 0,
          hint: "One note is a thought. The other is an action.", why: "Prejudice is a belief about a group. Discrimination is treating people unfairly because of it." },
        { id: "c7", q: "Twenty strangers wait at the same bus stop. They don't talk or know each other. What kind of group is this?",
          choices: ["Aggregate", "Category", "Primary group", "Secondary group"], answer: 0,
          hint: "They're in the same place, but are they connected?", why: "Aggregate: people in the same place at the same time who don't interact." }
      ],
      factQ: "Tap the fact that shows a group changing how people act.",
      terms: ["In-group vs. out-group", "Primary group", "Secondary group", "Conformity"],
      termQ: "Which group idea fits best?",
      answers: null,
      writeQ: "How did belonging to a group change how people acted?",
      stem: "Being in ___ changed how ___ acted because ___.",
      poster: "The group that changed them" }
  ],

  // Short definitions printed on the infographic (study sheet for the test)
  defs: {
    "Family": "Usually the first and strongest agent of socialization.",
    "School": "Teaches skills plus a hidden curriculum: rules like be on time.",
    "Peers": "People about your age; louder in the teen years.",
    "Mass media": "TV, music, social media, and news teach us what's normal.",
    "Religion": "Teaches values, rituals, and gives people a community.",
    "The workplace": "A job teaches new rules, like deadlines and teamwork.",
    "Strain theory": "Merton: people break rules when they can't reach society's goals the normal way.",
    "Differential association": "Sutherland: people learn to break rules from the people around them.",
    "Labeling theory": "Once people call you deviant, you may start acting that way.",
    "Looking-glass self": "Cooley: we see ourselves the way we imagine others see us.",
    "Generalized other": "Mead: knowing what society expects, even when no one is watching.",
    "In-group vs. out-group": "\"Us\" vs. \"them\": we favor our own group over others.",
    "Primary group": "Small, close, long-lasting, like family or best friends.",
    "Secondary group": "Bigger, built for a goal or job, and usually short-term.",
    "Conformity": "Going along with a group, like in Asch's line study."
  }
};
