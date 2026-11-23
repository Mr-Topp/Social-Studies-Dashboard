// Sociology Unit 3 Day 6 · Sociology Case File (review project for the Unit 3 test).
// v2 (Fynn 11/15/26): students pick ANY real person, bring their own facts and photos, and every screen
// collects what they type. The end builds a printable infographic. Every part of the Unit 3 summative is reviewed:
// Part 1 Soc.4 deviance theories, Part 2 Soc.9 socialization, Part 3 Soc.10 the self, Part 4 Soc.11 groups,
// and all 9 Part 5 vocabulary words are built into the steps (and printed with meanings on the infographic).
window.CF = {
  key: "soc-u3-d6-case-file-v2",
  assignmentId: "soc-u3-d6-case-file",
  title: "Sociology · Unit 3 · Day 6 · Sociology Case File",
  standard: "SS.9-12.Soc.4, SS.9-12.Soc.9, SS.9-12.Soc.10, SS.9-12.Soc.11",
  stdText: [
    ["SS.9-12.Soc.4", "Explain the sociological theories that are the basis of sociology."],
    ["SS.9-12.Soc.9", "Describe the process of socialization across the life course."],
    ["SS.9-12.Soc.10", "Explain the process of the social construction of the self."],
    ["SS.9-12.Soc.11", "Explain the social construction of groups and their impact on the life chances of individuals."]
  ],
  ideas: ["LeBron James", "Taylor Swift", "Bad Bunny", "Simone Biles", "MrBeast", "Malala Yousafzai", "Muhammad Ali", "Serena Williams", "Shohei Ohtani", "Steve Jobs", "Rihanna", "Lionel Messi"],

  sections: [
    { id: "raised", std: "SS.9-12.Soc.9", short: "Soc.9", icon: "🏠", name: "Raised By", sub: "Socialization",
      poster: "Who taught them how to act",
      checks: [
        { id: "c1", q: "Picture {P} before they were famous, copying how the pros in their field talked, dressed, and practiced. Which idea is this?",
          choices: ["Anticipatory socialization", "Resocialization", "Primary socialization", "Hidden curriculum"], answer: 0,
          hint: "{P} was getting ready for a role they didn't have yet.", why: "Anticipatory socialization: practicing the ways of a role before you get it." },
        { id: "c2", q: "Say {P} retires someday and has to learn a whole new daily routine and make new friends. What would that show?",
          choices: ["Socialization keeps going your whole life", "Socialization ends when school ends", "New friends replace the family's lessons", "Older adults can't learn new norms"], answer: 0,
          hint: "Would {P} still be learning new ways to act?", why: "Socialization happens across the whole life course, not just in childhood." }
      ],
      fields: [
        { id: "agent", type: "pick", label: "Which agent of socialization shaped your person a lot?", options: ["Family", "School", "Peers", "Mass media", "Religion", "The workplace"] },
        { id: "fact", type: "text", label: "A real fact that shows it", ph: "Like: Her grandma was an opera singer who took her to shows.", min: 30 },
        { id: "write", type: "write", label: "How did this agent of socialization teach your person something?", stem: "___ taught ___ to ___. For example, ___.", mustTerm: "agent" },
        { id: "stage", type: "pick", label: "Find one more moment in their life. Which kind of socialization is it?", options: ["Primary socialization", "Anticipatory socialization", "Resocialization"] },
        { id: "stageFact", type: "text", label: "What happened? (one real moment)", ph: "Like: He moved to a new country and had to learn a new language and new rules.", min: 30 },
        { id: "photo", type: "photo", label: "Optional: add a photo for this part (like them as a kid)" }
      ] },
    { id: "rule", std: "SS.9-12.Soc.4", short: "Soc.4", icon: "🚨", name: "Rule Breaker", sub: "Deviance theories",
      poster: "The rule or norm they broke",
      checks: [
        { id: "c3", q: "What if {P} stopped caring about success AND stopped working for it, and just checked out of everything? In Merton's strain theory, which response is that?",
          choices: ["Retreatism", "Innovation", "Conformity", "Rebellion"], answer: 0,
          hint: "{P} would be giving up on the goal AND on the normal ways to reach it.", why: "Retreatism: dropping both society's goals and the normal ways to reach them." },
        { id: "c4", q: "Say a reporter calls {P} \"a troublemaker.\" Fans start saying it too, and soon {P} starts acting the part. Which theory explains that best?",
          choices: ["Labeling theory", "Strain theory", "Differential association", "Conformity"], answer: 0,
          hint: "What changed after people put a name on {P}?", why: "Labeling theory: once people call you deviant, you may start to act that way." }
      ],
      fields: [
        { id: "fact", type: "text", label: "The deviance: what rule or norm did your person break?", help: "Deviance = breaking a rule or norm. It can be a law, a sport's rule, or just what people expect. It doesn't have to be a crime.", ph: "Like: She played a sport most people said girls shouldn't play.", min: 30 },
        { id: "who", type: "pick", label: "Who decided it counted as breaking the rules?", help: "Becker: a group's rules decide what counts as deviant.", options: ["The law or government", "Their sport, school, or job", "Fans, the media, or the public", "Their family or religion"] },
        { id: "theory", type: "pick", label: "Which theory explains WHY they broke it?", options: ["Strain theory", "Differential association", "Labeling theory"] },
        { id: "mode", type: "pick", label: "Strain theory: which Merton response is it?", options: ["Innovation", "Ritualism", "Retreatism", "Rebellion"], showIf: ["theory", "Strain theory"] },
        { id: "write", type: "write", label: "Which theory explains why your person broke the rule?", stem: "___ explains ___'s rule-breaking best because ___.", mustTerm: "theory" },
        { id: "photo", type: "photo", label: "Optional: add a photo for this part" }
      ] },
    { id: "mirror", std: "SS.9-12.Soc.10", short: "Soc.10", icon: "🪞", name: "The Mirror", sub: "Building the self",
      poster: "How other people shaped who they are",
      checks: [
        { id: "c5", q: "Say {P} posts online and gets a flood of mean comments. Then {P} starts thinking, \"Maybe I'm not that good.\" Which idea is this?",
          choices: ["Looking-glass self", "Generalized other", "The \"I\"", "Play stage"], answer: 0,
          hint: "{P} is judging themselves by what they imagine other people think.", why: "Looking-glass self: we see ourselves the way we imagine others see us." },
        { id: "c6", q: "Even with no cameras around, {P} still waits in line and follows the rules society expects. This is the...",
          choices: ["Generalized other", "Looking-glass self", "Play stage", "The \"I\""], answer: 0,
          hint: "{P} follows society's rules even when no one is watching.", why: "Generalized other (Mead): knowing what society as a whole expects of you." }
      ],
      fields: [
        { id: "fact", type: "text", label: "A real time other people's words or reactions changed how your person saw themselves", help: "Think: a coach who doubted them, fans who cheered, a nickname, haters, a teacher who believed in them.", ph: "Like: A coach cut him from the team, so he started training every morning.", min: 30 },
        { id: "idea", type: "pick", label: "Which idea fits best?", options: ["Looking-glass self", "Generalized other"] },
        { id: "write", type: "write", label: "How did other people shape how your person sees themselves?", stem: "Other people shaped ___'s self because ___. This shows the ___.", mustTerm: "idea" },
        { id: "photo", type: "photo", label: "Optional: add a photo for this part" }
      ] },
    { id: "crew", std: "SS.9-12.Soc.11", short: "Soc.11", icon: "👥", name: "The Crew", sub: "Groups: us vs. them",
      poster: "The groups that changed them",
      checks: [
        { id: "c7", q: "Note 1: Someone believes all people from {P}'s hometown are lazy. Note 2: That person refuses to hire anyone from there. Which is correct?",
          choices: ["Note 1 = prejudice; Note 2 = discrimination", "Note 1 = discrimination; Note 2 = prejudice", "Both notes are prejudice", "Both notes are discrimination"], answer: 0,
          hint: "One note is a thought. The other is an action.", why: "Prejudice is a belief about a group. Discrimination is treating people unfairly because of it." },
        { id: "c8", q: "{P} waits at an airport gate with 50 strangers. Nobody talks or knows each other. What kind of group is that?",
          choices: ["Aggregate", "Category", "Primary group", "Secondary group"], answer: 0,
          hint: "They're in the same place, but are they connected?", why: "Aggregate: people in the same place at the same time who don't interact." },
        { id: "c9", q: "Say everyone on {P}'s team thinks a plan is a bad idea, but nobody speaks up because they want to look united. The plan fails. What is this?",
          choices: ["Groupthink", "Looking-glass self", "Strain theory", "Resocialization"], answer: 0,
          hint: "The group cared more about agreeing than about making a good choice.", why: "Groupthink: a group goes along to keep the peace and makes a worse decision." }
      ],
      fields: [
        { id: "primary", type: "text", label: "Primary group: a small, close group in their life", ph: "Like: his mom and two brothers", min: 4 },
        { id: "secondary", type: "text", label: "Secondary group: a bigger group built for a goal or job", ph: "Like: the Lakers, a record label, their school", min: 4 },
        { id: "ingroup", type: "text", label: "In-group: a group they see as \"us\"", ph: "Like: Team USA", min: 4 },
        { id: "outgroup", type: "text", label: "Out-group: a group they see as \"them\" (a rival)", ph: "Like: the Celtics", min: 4 },
        { id: "push", type: "pick", label: "How did a group change how they (or others) acted?", options: ["They favored their in-group over others", "They went along with the group (conformity)", "The group made a bad choice together (groupthink)", "A group opened or blocked chances in life"] },
        { id: "write", type: "write", label: "How did belonging to a group change how people acted?", stem: "Being in ___ changed how ___ acted because ___.", mustTerm: null },
        { id: "photo", type: "photo", label: "Optional: add a photo for this part (like them with their team)" }
      ] }
  ],

  // The 9 Part 5 test words + every other idea students can pick. Printed on the infographic.
  vocab: ["Deviance", "Socialization", "Agent of socialization", "Resocialization", "Looking-glass self", "Primary group", "Secondary group", "In-group", "Groupthink"],
  defs: {
    "Deviance": "Breaking a rule or norm. A group's rules decide what counts as deviant.",
    "Socialization": "Learning your society's ways, from birth to old age.",
    "Agent of socialization": "A person or group that teaches you how to act: family, school, peers, media, religion, work.",
    "Resocialization": "Unlearning old ways and learning new ones, often in a big reset like the military.",
    "Looking-glass self": "Cooley: we see ourselves the way we imagine others see us.",
    "Primary group": "Small, close, long-lasting, like family or best friends.",
    "Secondary group": "Bigger, built for a goal or job, and usually short-term.",
    "In-group": "A group you feel part of (\"us\"). We tend to favor it over the out-group (\"them\").",
    "Groupthink": "A group goes along to keep the peace and makes a worse decision.",
    "Family": "Usually the first and strongest agent of socialization.",
    "School": "Teaches skills plus a hidden curriculum, like be on time.",
    "Peers": "People about your age. They get louder in the teen years.",
    "Mass media": "TV, music, social media, and news teach us what's normal.",
    "Religion": "Teaches values, rituals, and gives people a community.",
    "The workplace": "A job teaches new rules, like deadlines and teamwork.",
    "Primary socialization": "The first lessons, learned as a little kid, mostly at home.",
    "Anticipatory socialization": "Practicing the ways of a role before you have it.",
    "Strain theory": "Merton: people break rules when they can't reach society's goals the normal way.",
    "Differential association": "Sutherland: people learn to break rules from the people around them.",
    "Labeling theory": "Once people call you deviant, you may start acting that way.",
    "Innovation": "Keeps the goal, uses a new (rule-breaking) way to reach it.",
    "Ritualism": "Gives up on the goal but keeps following the rules.",
    "Retreatism": "Drops both the goal and the normal ways to reach it.",
    "Rebellion": "Rejects the goals and the ways, and tries to replace them.",
    "Generalized other": "Mead: knowing what society expects, even when no one is watching.",
    "Conformity": "Going along with a group, like in Asch's line study."
  }
};
