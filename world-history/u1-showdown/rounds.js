// =====================================================================
//  UNIT SHOWDOWN · World History Unit 1 review (Days 12–13, replaces the Jojo Rabbit days)
//  Fynn 11-14: "my kind of review, not a gross packet or worksheet." Picked "Unit Showdown."
//  8 rounds = the 8 parts of the Unit 1 test (Form A): WH.24, 25, 27, 29 on Day 12;
//  WH.30, 31, 32, 33 on Day 13. Each round: a bet, a Source Snap (real source), a Build It.
//  Items practice the same skills as the test but are NOT the test questions.
//  In "snap" options, the FIRST option is right (screen shuffles). In "build" rows, "a" is the right label.
//  "order" builds: items are listed in the right order (screen shuffles them).
// =====================================================================
window.SHOWDOWN_ROUNDS = [
      {
        std: "WH.24", part: 1, title: "Why Europe Took Africa", icon: "🌍",
        ican: "I can explain why European countries raced to take over Africa in the 1800s.",
        snap: {
          img: "https://commons.wikimedia.org/wiki/Special:FilePath/Punch_Rhodes_Colossus.png?width=800",
          alt: "1892 cartoon: Cecil Rhodes stands like a giant over Africa with one foot in Cape Town and one in Cairo, holding a telegraph wire.",
          cite: "“The Rhodes Colossus,” <i>Punch</i> magazine (London), 1892. Cecil Rhodes was a British businessman and leader in southern Africa.",
          ask: "Rhodes stands over the whole map. One foot is in Cape Town (bottom). One is in Cairo (top). What is the cartoon saying he wants?",
          options: ["British control of Africa from top to bottom", "A trade deal to split up Africa with France", "To pull British soldiers out of Africa", "To give African kingdoms back all of their land"],
          hint: "Look where his feet are. What does a giant standing over a map want?",
          why: "Rhodes dreamed of British land and a railroad from Cape Town to Cairo. That's <b>power</b> and <b>money</b>."
        },
        build: {
          type: "sort",
          ask: "Sort each clue by the kind of reason it shows.",
          labels: ["Money", "Power & pride", "Racist beliefs"],
          rows: [
            { icon: "🌳", t: "Belgium's King Leopold forced people in the Congo to collect rubber for him to sell.", a: "Money" },
            { icon: "🦅", t: "Germany wanted “a place in the sun”: colonies to prove it was a great power.", a: "Power & pride" },
            { icon: "📖", t: "European writers claimed they had a duty to “civilize” Africans.", a: "Racist beliefs" }
          ],
          hint: "Money = stuff to sell. Power = look strong next to rivals. Beliefs = ideas about who is “better.”",
          why: "<b>Imperialism</b> had three kinds of causes: economic (money), political (power and pride), and cultural (racist beliefs)."
        },
        write: { label: "Pick ONE reason: money, power and pride, or racist beliefs. Explain how it pushed Europe to take over Africa.", stem: "One reason Europe took over Africa was ___ because…" }
      },
      {
        std: "WH.25", part: 2, title: "How Empires Ruled", icon: "🏛️",
        ican: "I can compare the different ways empires took over and ruled other lands.",
        snap: {
          img: "../../day-2-hanoi/pages/p-09.jpg",
          alt: "Page from The Great Hanoi Rat Hunt showing Governor Paul Doumer's government sales of opium, alcohol, and salt.",
          cite: "<i>The Great Hanoi Rat Hunt</i> (Michael Vann and Liz Clarke), book page 55. Day 2 reading.",
          ask: "Governor Doumer, a Frenchman, decided only the government could sell opium, alcohol, and salt in Vietnam. What does that show about who ruled Vietnam?",
          options: ["French officials ran Vietnam and made its laws", "Vietnam's emperor chose its own taxes and laws", "British traders controlled Vietnam's port cities", "Hanoi's shop owners voted on the city's rules"],
          hint: "Who is the governor? Where is he from? Who made the rule?",
          why: "That's <b>direct rule</b>: France sent its own officials to run Vietnam and make its laws."
        },
        build: {
          type: "sort",
          ask: "Match each place to the way it was ruled.",
          labels: ["Direct rule", "Indirect rule", "Sphere of influence", "Annexation"],
          rows: [
            { icon: "🇨🇩", t: "Belgian Congo after 1908: Belgian officials ran everything.", a: "Direct rule" },
            { icon: "👑", t: "India: some Indian princes kept their thrones, but they had to obey Britain.", a: "Indirect rule" },
            { icon: "🚢", t: "China: Britain, France, Germany, and Japan each controlled trade in their own zone.", a: "Sphere of influence" },
            { icon: "🌺", t: "Hawaiʻi, 1898: the U.S. made the islands part of the United States.", a: "Annexation" }
          ],
          hint: "Direct = the empire's own officials. Indirect = local rulers take orders. Sphere = control of trade only. Annexation = the land becomes part of the empire.",
          why: "Empires didn't all rule the same way: <b>direct rule</b>, <b>indirect rule</b>, <b>spheres of influence</b>, and <b>annexation</b>."
        },
        write: { label: "Pick ONE pair: France in Vietnam vs. Britain in Nigeria, OR the U.S. in Hawaiʻi vs. the U.S. in China. Explain one way the two were different.", stem: "In ___, the empire ruled by… but in ___, it…" }
      },
      {
        std: "WH.27", part: 3, title: "Resist or Adapt?", icon: "✊",
        ican: "I can compare how people resisted or adapted when empires pushed in.",
        snap: {
          img: "../../day-2-hanoi/pages/p-14.jpg",
          alt: "Page from The Great Hanoi Rat Hunt: an angry French official says people are raising rats and bringing in rats from the provinces for the bounty.",
          cite: "<i>The Great Hanoi Rat Hunt</i>, book page 96. Day 2 reading.",
          ask: "The French paid a reward for every rat tail. Now the angry official says people are raising rats and bringing them in from the countryside. How were Vietnamese people responding?",
          options: ["Turning the French plan to their own gain", "Attacking French soldiers with homemade weapons", "Building factories to copy the French", "Asking Japan to take over Hanoi"],
          hint: "The reward was supposed to kill rats. What happened to the number of rats?",
          why: "They worked the French plan for their own benefit. The reward made <i>more</i> rats. A quiet way to push back against the colonizers' rules."
        },
        build: {
          type: "sort",
          img: "https://commons.wikimedia.org/wiki/Special:FilePath/Shinagawa%20Across%20railroad%20Bridge%20in%20Meiji%20era.jpg?width=700",
          imgAlt: "Old photo of a railroad bridge in Tokyo, Japan, during the Meiji era.",
          imgCite: "Railroad bridge at Shinagawa, Tokyo, Meiji era (1868–1912). Day 3: Pacific Case Files.",
          ask: "How did each group respond to outside powers?",
          labels: ["Adapt", "Armed resistance", "Peaceful resistance"],
          rows: [
            { icon: "🚂", t: "Japan, after 1868: railroads like the one in the photo, factories, and a modern army.", a: "Adapt" },
            { icon: "⚔️", t: "China, 1900: the Boxers attacked foreigners and Chinese Christians.", a: "Armed resistance" },
            { icon: "📝", t: "Hawaiʻi, 1897: over 21,000 Native Hawaiians signed petitions against annexation.", a: "Peaceful resistance" }
          ],
          hint: "Adapt = copy outside ideas to stay strong. Armed = fight. Peaceful = protest without weapons.",
          why: "When empires pushed in, people <b>resisted</b> (by fighting or protesting) or <b>adapted</b> (copied to stay free)."
        },
        write: { label: "Pick ONE place: Vietnam, Japan, China, or Hawaiʻi. Did people there mostly resist or adapt? Give one piece of evidence.", stem: "In ___, people mostly ___ because…" }
      },
      {
        std: "WH.29", part: 4, title: "Causes of WWI & WWII", icon: "💥",
        ican: "I can explain the causes of World War I and World War II.",
        snap: {
          img: "../../day8-road-to-war/pages/p-05.jpg",
          alt: "1940s comic page: Chamberlain tries to bargain for peace with Hitler, then Germany invades Poland in 1939.",
          cite: "1940s comic, Day 8 reading (When Should Someone Step In?).",
          ask: "At Munich in 1938, Chamberlain let Hitler take part of Czechoslovakia to keep the peace. In 1939, Hitler took the rest, then invaded Poland. What did appeasement teach Hitler?",
          options: ["Grabbing land worked, and no one would stop him", "Britain would declare war if he took any more land", "The League of Nations would send its army after him", "He should sign a lasting peace deal with Poland"],
          hint: "What happened every time Hitler took land before 1939?",
          why: "<b>Appeasement</b> (giving in to keep the peace) showed dictators that taking land worked. So they took more."
        },
        build: {
          type: "order",
          ask: "1914: build the chain reaction. Tap the events in order, first to last.",
          rows: [
            { icon: "🔫", t: "Archduke Franz Ferdinand is shot in Sarajevo." },
            { icon: "🇦🇹", t: "Austria-Hungary declares war on Serbia." },
            { icon: "🇷🇺", t: "Russia gets its army ready to defend Serbia." },
            { icon: "🇩🇪", t: "Germany declares war on Russia and France." },
            { icon: "🇬🇧", t: "Germany marches through Belgium, and Britain joins the war." }
          ],
          hint: "Each country was pulled in by a promise to protect someone. Who did Russia promise to protect?",
          why: "<b>Alliances</b> turned one murder into a world war. In the 1930s, <b>appeasement</b> let the next war grow."
        },
        write: { label: "Pick ONE war: World War I or World War II. Explain the biggest cause of that war, with one fact.", stem: "The biggest cause of ___ was ___ because…" }
      },

      {
        std: "WH.30", part: 5, title: "Dictators & the Holocaust", icon: "⚠️", serious: true,
        ican: "I can compare how dictators took power and persecuted people, and explain the Holocaust.",
        snap: {
          img: "../../day7-maus/pages/p-03.jpg",
          alt: "Page from Maus I: on a train in 1938, Jewish passengers share stories of losing businesses, arrests, and a sign reading This town is Jew Free.",
          cite: "<i>Maus I</i> by Art Spiegelman. Day 7 reading.",
          ask: "On a train in 1938, people share stories from Germany: a cousin forced to sell his business, a relative taken by police, a sign saying “This town is Jew Free.” What pattern do the stories show?",
          options: ["Persecution grew step by step, each worse than the last", "Jewish families were safe until the war itself began", "Only Jewish soldiers were being singled out by the Nazis", "The Nazis kept their hatred hidden from the public"],
          hint: "Put the stories in order. Does each one get worse?",
          why: "Nazi <b>persecution</b> grew one step at a time: businesses, then arrests, then whole towns. Each step made the next one easier."
        },
        build: {
          type: "sort",
          ask: "Same tools, different dictators. Match each method to the dictator who used it.",
          labels: ["Mussolini", "Stalin", "Hitler"],
          rows: [
            { icon: "⚫", t: "His Blackshirts beat up opponents, and the 1922 March on Rome scared the king into giving him power.", a: "Mussolini" },
            { icon: "🌾", t: "Forced farms into collectives (state-run farms). Millions starved in Ukraine in 1932–33.", a: "Stalin" },
            { icon: "📜", t: "The Nuremberg Laws of 1935 took away Jewish Germans' citizenship.", a: "Hitler" },
            { icon: "🚂", t: "Secret police sent millions to labor camps called the Gulag.", a: "Stalin" }
          ],
          hint: "Italy = Blackshirts. Soviet Union = farms and the Gulag. Germany = laws against Jews.",
          why: "Different goals, same tools: fear, propaganda, secret police, and a <b>scapegoat</b> to blame."
        },
        write: { label: "Pick ONE dictator: Hitler, Mussolini, or Stalin. Explain one reason he gained power AND one way he controlled or persecuted people.", stem: "___ gained power because… Then he controlled people by…" }
      },
      {
        std: "WH.31", part: 6, title: "After the Wars", icon: "🕊️",
        ican: "I can explain how the world changed after World War I and World War II.",
        snap: {
          img: "../../write-the-peace-treaty/img/versailles-1919.jpg",
          alt: "1919 cartoon by Will Dyson: the Big Four leave the peace conference while a crying child labeled 1940 Class stands behind a pillar.",
          cite: "“Peace and Future Cannon Fodder,” Will Dyson, <i>Daily Herald</i> (London), 1919. “The Tiger” is France's leader, Clemenceau. Day 5 reading.",
          ask: "The leaders walk out of the 1919 peace talks. The Tiger says, “Curious! I seem to hear a child weeping!” The child behind the pillar is labeled “1940 Class.” What is the cartoonist predicting?",
          options: ["The harsh peace will cause a new war around 1940", "Children will be safe now that the war is over", "Germany will win back all of its lost land by 1940", "The League of Nations will end war by 1940"],
          hint: "“Cannon fodder” means soldiers sent to die. What would kids born in 1919 be doing in 1940?",
          why: "Dyson predicted the angry, harsh <b>Treaty of Versailles</b> would lead to another war. WWII began in 1939."
        },
        build: {
          type: "sort",
          ask: "Did each change come after World War I or after World War II?",
          labels: ["After WWI", "After WWII"],
          rows: [
            { icon: "💸", t: "Germany must pay huge reparations and accept all the blame for the war.", a: "After WWI" },
            { icon: "🏛️", t: "The League of Nations forms, but the U.S. never joins.", a: "After WWI" },
            { icon: "🏗️", t: "The U.S. helps rebuild Europe with billions of dollars (the Marshall Plan).", a: "After WWII" },
            { icon: "🌐", t: "The United Nations forms, and the U.S. is a leading member.", a: "After WWII" }
          ],
          hint: "After WWI the winners <i>punished</i>. After WWII they tried to <i>rebuild</i>.",
          why: "After WWI: punish Germany → anger → another war. After WWII: <b>rebuild</b> and join the <b>UN</b> to keep the peace."
        },
        write: { label: "Pick ONE change: the Treaty of Versailles, the League of Nations, the United Nations, or rebuilding Germany and Japan. Explain how it changed the world.", stem: "___ changed the world after the war because…" }
      },
      {
        std: "WH.32", part: 7, title: "Technology & Turning Points", icon: "📡",
        ican: "I can explain how new technology helped decide turning points in the world wars.",
        snap: {
          img: "../../day10-wwii-comics/pages/p-05.jpg",
          alt: "1940s comic page: a bomber drops the atomic bomb and a huge mushroom cloud rises over Hiroshima.",
          cite: "1940s comic, Day 10 reading (What Wins a War?).",
          ask: "In August 1945, the U.S. dropped atomic bombs on Hiroshima (Aug. 6) and Nagasaki (Aug. 9). How did this new weapon change the war?",
          options: ["Japan announced its surrender within days", "Germany gave up after a bomb hit Berlin", "It pulled the United States into the war", "It was tested in the desert but never used"],
          hint: "Which country was still fighting in August 1945? Germany had already surrendered in May.",
          why: "Japan announced its surrender on Aug. 15, 1945. The <b>atomic bomb</b> ended the war in the Pacific, and it killed huge numbers of civilians."
        },
        build: {
          type: "sort",
          ask: "Match each new technology to what it did.",
          labels: ["Machine gun", "Tank", "U-boat", "Radar"],
          rows: [
            { icon: "🪖", t: "WWI: defenders mowed down charges, so armies dug trenches and the war got stuck.", a: "Machine gun" },
            { icon: "🛞", t: "Late WWI: armored machines rolled over trenches and barbed wire.", a: "Tank" },
            { icon: "🌊", t: "Sank ships carrying supplies. Attacks on U.S. ships helped pull America into WWI.", a: "U-boat" },
            { icon: "🛩️", t: "1940: spotted German planes early so British fighters could meet them.", a: "Radar" }
          ],
          hint: "U-boat = German submarine. Radar = finding planes with radio waves.",
          why: "New technology decided <b>turning points</b> and made total war deadlier for soldiers and civilians."
        },
        write: { label: "Pick ONE: tanks, submarines (U-boats), radar, codebreaking, or the atomic bomb. Explain how it changed a turning point in World War I or World War II.", stem: "___ helped decide the war because…" }
      },
      {
        std: "WH.33", part: 8, title: "People in Total War", icon: "👥", serious: true,
        ican: "I can compare the experiences and points of view of people living through total war.",
        snap: {
          img: "../../day9-maus2/pages/p-01.jpg",
          alt: "Page from Maus II: at Auschwitz, guards take prisoners' clothes and hair and tattoo a number on Vladek's arm.",
          cite: "<i>Maus II</i> by Art Spiegelman. Day 9 reading.",
          ask: "At Auschwitz, guards take the prisoners' papers, clothes, and hair. They tattoo a number on Vladek's arm. He says, “They took from us our names.” What does this show about a prisoner's experience?",
          options: ["They were treated like objects, not people", "Prisoners got new names so they could hide", "Numbers helped guards keep families together", "The numbers marked who would be set free"],
          hint: "What do you lose when your name becomes a number?",
          why: "Taking names, clothes, and hair stripped away who prisoners were. It made them easier to control and abuse."
        },
        build: {
          type: "sort",
          ask: "Total war hit everyone differently. Match each experience to the person.",
          labels: ["WWI trench soldier", "Vladek", "Anne Frank", "The Sullivans of Iowa"],
          rows: [
            { icon: "🐀", t: "Mud, rats, and shelling. Stuck in the same line for months.", a: "WWI trench soldier" },
            { icon: "🚪", t: "Hid in a secret annex in Amsterdam for two years. Then she was found and sent to the camps.", a: "Anne Frank" },
            { icon: "⭐", t: "A Waterloo family that lost all five sons when the USS Juneau sank in 1942.", a: "The Sullivans of Iowa" },
            { icon: "🪪", t: "In Poland, every choice, like registering or hiding, could get his family killed.", a: "Vladek" }
          ],
          hint: "Think about where each person was: a trench, a hiding place, a home in Iowa, a Polish town.",
          why: "<b>Total war</b> means a whole nation fights. Soldiers, families, and civilians all pay a price."
        },
        write: { label: "Pick ONE: Vladek, Anne Frank, a soldier in the WWI trenches, or a family on the home front (like the Sullivans of Waterloo, Iowa). Explain what total war was like for them.", stem: "During the war, ___ faced… This shows…" }
      }
];

// ---------------------------------------------------------------------
//  Added 11-14 (Fynn: "they have two whole periods," 80–90 min blocks): every round also gets
//  a second source (snap2: image or fact file), a Fix It (catch the mistake in a sample
//  Explain It answer, then pick the fix), and a 3-question Lightning bonus.
//  fix.lines: wrong = index of the sentence with the mistake; fixes[0] is the right fix.
//  lightning: options[0] is right (screen shuffles).
// ---------------------------------------------------------------------
(function () {
  const MORE = {
    "WH.24": {
      snap2: {
        file: "<b>Fact file · The Berlin Conference, 1884–85</b>Leaders from 14 countries, mostly European, met in Berlin, Germany. They set rules for claiming land in Africa: a country had to tell the others and show it controlled the area. No Africans were invited. By 1914, Europeans ruled almost 90% of Africa.",
        ask: "Read the fact file. What does the Berlin Conference show about how Africa was taken over?",
        options: ["Europeans split Africa among themselves without asking Africans", "African leaders voted on which country would protect them", "Europe agreed to leave Africa alone after 1885", "Africa's kingdoms sold their land to Europe for a fair price in gold"],
        hint: "Who was in the room? Who was not invited?",
        why: "At the <b>Berlin Conference</b>, Europe made the rules for taking Africa, and Africans had no say."
      },
      fix: {
        intro: "A student wrote this Explain It for the test.",
        lines: ["One reason Europe took over Africa was money.", "European factories needed rubber, palm oil, and diamonds from Africa.", "At the Berlin Conference, African leaders voted on which country would rule them.", "Colonies made European companies rich."],
        wrong: 2,
        fixes: ["At the Berlin Conference, European leaders split up Africa, and no Africans were invited.", "At the Berlin Conference, African leaders picked new borders for all of Europe's countries.", "At the Berlin Conference, Europe agreed to pay African kings a fair price for every colony."],
        hint: "Think about the fact file: who was invited to Berlin?",
        why: "Facts in an Explain It have to be right. Africans were left out of the Berlin Conference."
      },
      lightning: [
        { q: "Imperialism means…", options: ["a strong country taking control of other lands", "a country choosing its own leaders in elections", "two countries trading with each other as equals"] },
        { q: "By 1914, which two African countries were still independent?", options: ["Ethiopia and Liberia", "Egypt and the Congo", "South Africa and Kenya"] },
        { q: "What did King Leopold force people in the Congo to collect?", options: ["Rubber", "Oil", "Coffee"] }
      ]
    },
    "WH.25": {
      snap2: {
        img: "../../day-2-hanoi/pages/p-04.jpg",
        alt: "Page from The Great Hanoi Rat Hunt with a map titled Colonial Empires circa 1914, colored by empire.",
        cite: "<i>The Great Hanoi Rat Hunt</i>, book page 31. Day 2 reading.",
        ask: "Read the box above the map: the “new imperialism” (1871–1939) wasn't only European. Which other powers does it name?",
        options: ["The United States and Japan", "China and the Ottoman Empire", "Brazil and Mexico", "India and Egypt"],
        hint: "Read the sentence right above the map: “…when Europe, ___, and ___ colonized…”",
        why: "Europe, the <b>United States</b>, and <b>Japan</b> all built empires. The U.S. took Hawaiʻi and the Philippines; Japan took Korea."
      },
      fix: {
        intro: "A student wrote this Explain It about France in Vietnam.",
        lines: ["In Vietnam, France ruled by direct rule.", "French governors like Paul Doumer ran the colony.", "France let Vietnam's emperor make all of the laws.", "French officials set the taxes, like government-only sales of salt and opium."],
        wrong: 2,
        fixes: ["Vietnam's emperor had little real power, and the French made the laws.", "Vietnamese villages voted every single year to pick the French governor.", "France left Vietnam alone and only sent traders to its biggest ports."],
        hint: "In direct rule, who makes the laws: local rulers or the empire's own officials?",
        why: "That's what makes it <b>direct rule</b>: the empire's own officials make the laws."
      },
      lightning: [
        { q: "Indirect rule means…", options: ["local rulers stay, but they take the empire's orders", "the empire sends its own officials to run everything", "the colony rules itself with no outside control"] },
        { q: "A sphere of influence is…", options: ["an area where a foreign power controls trade", "land that an empire takes over and makes its own", "a colony run by its own elected leaders"] },
        { q: "Which European country ruled Vietnam in the 1890s?", options: ["France", "Britain", "Germany"] }
      ]
    },
    "WH.27": {
      snap2: {
        img: "https://commons.wikimedia.org/wiki/Special:FilePath/Liliuokalani%20%28PPWD-16-4-005%29.jpg?width=600",
        alt: "Photo portrait of Queen Liliʻuokalani of Hawaiʻi.",
        cite: "Queen Liliʻuokalani, the last monarch of Hawaiʻi. Day 3: Pacific Case Files.",
        quote: "“…to avoid any collision of armed forces, and perhaps the loss of life, I do, under this protest… yield my authority…” — Queen Liliʻuokalani, January 17, 1893, after U.S. businessmen and Marines helped overthrow her",
        ask: "Read her words. Why did the queen give up power “under this protest” instead of fighting?",
        options: ["To avoid bloodshed while saying the takeover was wrong", "Because she agreed Hawaiʻi should join the United States", "Because Japan promised to send her an army later", "Because Native Hawaiians had voted to remove her"],
        hint: "What did she want to avoid? What does “under protest” mean?",
        why: "She chose <b>peaceful resistance</b>: no war, but she never agreed the takeover was legal."
      },
      fix: {
        intro: "A student wrote this Explain It about Japan.",
        lines: ["In Japan, people mostly adapted.", "After 1868, Meiji leaders built railroads, factories, and a modern army.", "They copied Western ideas so Western powers couldn't take over Japan.", "Japan closed its ports and refused all Western technology."],
        wrong: 3,
        fixes: ["Japan opened up and learned from Western technology to grow strong.", "Japan asked Britain to rule it so that it would be safe from Russia.", "Japan attacked the United States in 1868 to keep Westerners out."],
        hint: "The last sentence argues against the student's own point. Did Japan refuse Western tools?",
        why: "Japan <b>adapted</b>: it learned from the West to stay independent."
      },
      lightning: [
        { q: "Adapting to imperialism means…", options: ["copying outside ideas to stay strong and free", "fighting with weapons to drive outsiders away", "refusing all contact with outsiders"] },
        { q: "The Boxers in China (1900) wanted to…", options: ["drive foreigners out of China", "copy Western factories and railroads", "make China part of the United States"] },
        { q: "In 1945, Ho Chi Minh quoted the American Declaration of Independence to…", options: ["argue Vietnam deserved freedom from France", "ask the United States to rule Vietnam", "thank France for building roads and schools in Hanoi"] }
      ]
    },
    "WH.29": {
      snap2: {
        file: "<b>Fact file · Manchuria, 1931</b>Japan's army took over Manchuria, a big region of northern China. China asked the League of Nations for help. The League's report blamed Japan. But the League sent no troops and set no punishments. Japan simply quit the League.",
        ask: "Why couldn't the League of Nations stop Japan?",
        options: ["It had no army of its own to enforce its rules", "Japan had never been a member of the League", "The United States led the League and backed Japan", "China asked the League not to get involved"],
        hint: "The League wrote a report. What did it NOT have to back it up?",
        why: "The League had <b>no army</b>. Japan, then Italy and Germany, learned they could take land and get away with it."
      },
      fix: {
        intro: "A student wrote this Explain It about World War I.",
        lines: ["The biggest cause of World War I was alliances.", "Austria-Hungary declared war on Serbia after Franz Ferdinand was killed.", "Russia had promised to protect Serbia, so it got its army ready.", "Then Germany invaded Poland, and Britain declared war."],
        wrong: 3,
        fixes: ["Then Germany marched through Belgium, and Britain joined the war.", "Then the United States attacked Germany first, and Britain joined.", "Then Japan bombed Pearl Harbor, and Britain joined the fighting."],
        hint: "Check the dates. Germany invaded Poland in 1939. That started a different war.",
        why: "Don't mix up the wars. 1914: Belgium → Britain joins. 1939: Poland → WWII."
      },
      lightning: [
        { q: "The MAIN causes of WWI: Militarism, Alliances, Imperialism, and…", options: ["Nationalism", "Neutrality", "Negotiation"] },
        { q: "Appeasement means…", options: ["giving in to an aggressor to avoid war", "building a huge army to scare enemies", "a promise to defend an ally if it is attacked"] },
        { q: "What started World War II in Europe on Sept. 1, 1939?", options: ["Germany invaded Poland", "Japan bombed Pearl Harbor", "Germany took over Austria"] }
      ]
    },
    "WH.30": {
      snap2: {
        img: "../../day7-maus/pages/p-08.jpg",
        alt: "Page from Maus I: at a prisoner camp, Jewish prisoners of war are made to stand apart while a Nazi officer shouts at them.",
        cite: "<i>Maus I</i> by Art Spiegelman. Day 7 reading.",
        ask: "At a German prisoner camp, Jewish prisoners are made to stand apart. A Nazi officer shouts, “It's all YOUR fault, this war!” Which Nazi method is this?",
        options: ["Scapegoating: blaming one group for everything", "Appeasement: giving in to avoid a fight", "Collectivization: forcing farms to join together", "Rationing: limiting food so soldiers have more"],
        hint: "He blames one group for the whole war. What is that called?",
        why: "<b>Scapegoating</b>: the Nazis falsely blamed Jews for Germany's problems, even the war."
      },
      fix: {
        intro: "A student wrote this Explain It about Hitler.",
        lines: ["Hitler gained power because Germany was in crisis.", "After WWI and the Great Depression, many Germans were poor and angry.", "Hitler promised jobs and blamed Jews for Germany's problems.", "Once in power, he let free newspapers criticize him."],
        wrong: 3,
        fixes: ["Once in power, he banned other parties and used propaganda and secret police.", "Once in power, he gave Jewish Germans equal rights and police protection.", "Once in power, he held free elections with many different parties every year."],
        hint: "Dictators control people. Would one allow free newspapers?",
        why: "Hitler, Mussolini, and Stalin all used <b>propaganda</b>, <b>secret police</b>, and banned opponents."
      },
      lightning: [
        { q: "Propaganda is…", options: ["one-sided messages to control what people think", "a law that protects everyone's right to free speech", "a peace deal between two countries"] },
        { q: "Totalitarian means…", options: ["the government controls nearly every part of life", "power is shared by many parties, courts, and voters", "the people choose a new king every year"] },
        { q: "The Holocaust was…", options: ["the Nazi murder of six million Jews and millions of others", "Germany's invasion of the Soviet Union in 1941", "the Allied bombing of German cities near the end of the war"] }
      ]
    },
    "WH.31": {
      snap2: {
        img: "../../day11-wwii-peace/pages/p-05.jpg",
        alt: "Page from a 1945 True Comics story explaining the plan for the United Nations with a chart of its parts.",
        cite: "“A Third World War Can Be Prevented Now!” <i>True Comics</i> #44, 1945. Day 11 reading.",
        ask: "The 1944 plan for the United Nations added something the League of Nations never had. What was it?",
        options: ["Troops from member countries to stop an attacker", "A rule that Germany must pay the full cost of both wars", "A ban on every country building new weapons", "Membership only for countries in Europe"],
        hint: "Why was the League too weak to stop Japan in 1931?",
        why: "The <b>UN</b> could send troops from its members. The League never could."
      },
      fix: {
        intro: "A student wrote this Explain It about the Treaty of Versailles.",
        lines: ["The Treaty of Versailles changed the world after WWI.", "It blamed Germany for the war and made it pay huge reparations.", "It took land and colonies away from Germany.", "Germans were happy with it, so it kept the peace for 50 years."],
        wrong: 3,
        fixes: ["Many Germans were angry, and Hitler used that anger to gain power.", "Germans were happy because it let them build a much bigger army and navy.", "Germans were angry because it gave them too much new land to govern."],
        hint: "How long was it from 1919 to the start of WWII? How did Germans feel?",
        why: "The harsh treaty made Germans angry. Hitler used that anger. WWII began 20 years later."
      },
      lightning: [
        { q: "Reparations are…", options: ["payments a loser makes for war damage", "new borders drawn after a war ends", "soldiers that are sent to keep the peace"] },
        { q: "The Marshall Plan…", options: ["gave U.S. money to rebuild Europe after WWII", "punished Germany with huge fines after World War I", "created the League of Nations in 1920"] },
        { q: "Why was the League of Nations weak?", options: ["The U.S. never joined, and it had no army", "It had too many soldiers to control", "Only Germany and Austria were allowed to vote in it"] }
      ]
    },
    "WH.32": {
      snap2: {
        img: "../../day10-wwii-comics/pages/p-01.jpg",
        alt: "1940s comic page about the Battle of Britain showing German planes, a radar station, and British fighter planes.",
        cite: "1940s comic, Day 10 reading (What Wins a War?).",
        ask: "In 1940, Germany had more planes than Britain. Read the comic. How did Britain still win the Battle of Britain?",
        options: ["Radar showed where planes were coming, so fighters were waiting", "Britain had already cracked every German Enigma code", "An atomic bomb destroyed Germany's air force", "Tanks shot down the German planes from the English beaches"],
        hint: "Find the radar panel. What did radar calculate?",
        why: "<b>Radar</b> found German planes early. A new technology helped decide a turning point."
      },
      fix: {
        intro: "A student wrote this Explain It about codebreaking.",
        lines: ["Codebreaking helped decide World War II.", "Before Midway in 1942, U.S. codebreakers cracked part of Japan's secret code.", "They learned Japan's plan, so U.S. carriers were waiting.", "Japan sank four U.S. carriers and took control of the Pacific."],
        wrong: 3,
        fixes: ["The U.S. sank four Japanese carriers, and Japan lost the upper hand at sea.", "The U.S. used radar to find and bomb Tokyo the very next day.", "Japan surrendered the next week, and the whole war ended in 1942."],
        hint: "Who won at Midway? Whose carriers sank?",
        why: "At <b>Midway</b>, the U.S. sank 4 Japanese carriers. Knowing the plan turned the war in the Pacific."
      },
      lightning: [
        { q: "Why was WWI stuck in the trenches for years?", options: ["Machine guns and barbed wire made attacks deadly", "Tanks made attacking much too easy for both sides", "Both sides ran out of soldiers in 1914"] },
        { q: "Stalingrad (1942–43) was a turning point because…", options: ["a whole German army was trapped and surrendered", "the U.S. dropped its first atomic bomb there", "Britain cracked Germany's Enigma code in that city"] },
        { q: "Bombers in WWII meant that…", options: ["cities and civilians became targets", "only soldiers at the front were in danger", "wars could end in just a few weeks"] }
      ]
    },
    "WH.33": {
      snap2: {
        file: "<b>Two points of view · August 1945</b><b>President Truman</b> (White House statement, Aug. 6, 1945): announced the bomb as a powerful new weapon and warned Japan to surrender.<br><b>Setsuko Thurlow</b>, age 13, about a mile from the blast in Hiroshima: “At 8:15, I saw a blinding bluish-white flash from the window.” She was trapped in a collapsed building and lost family and classmates. (Nobel Peace Prize lecture, 2017)",
        ask: "Why do Truman and Thurlow remember the same bomb so differently?",
        options: ["Truman led from far away; Thurlow lived through it in the city", "Truman was in Hiroshima; Thurlow heard about it later on the radio", "Both agreed the bomb was a mistake that changed nothing", "Thurlow was a soldier; Truman was a civilian child"],
        hint: "Where was each person standing when the bomb fell?",
        why: "Where you stood in a <b>total war</b> shaped what you saw, what you lost, and how you remember it."
      },
      fix: {
        intro: "A student wrote this Explain It about Anne Frank.",
        lines: ["During the war, Anne Frank faced danger every day.", "Her family hid in a secret annex in Amsterdam.", "They had to stay quiet so no one would find them.", "She was safe because the Nazis never searched the Netherlands."],
        wrong: 3,
        fixes: ["In 1944 they were found and sent to the camps, where she died.", "She escaped to America with her whole family in the summer of 1942.", "She joined the Dutch army and fought against the Nazis."],
        hint: "Anne's diary ends in August 1944. Why?",
        why: "Anne was found in 1944 and died in Bergen-Belsen in 1945. Total war reached children in hiding."
      },
      lightning: [
        { q: "Total war means…", options: ["a whole nation's people and factories are used for war", "only professional soldiers do any of the fighting", "a war that is fought on just one continent at a time"] },
        { q: "On the U.S. home front in WWII, families…", options: ["rationed food and worked in war factories", "were not really affected by the war at all", "voted on every battle plan the army made"] },
        { q: "Why do people who lived through the same war remember it differently?", options: ["Where they were shaped what they saw and lost", "Only soldiers are really able to remember a war", "Everyone's memories of a war are exactly the same"] }
      ]
    }
  };
  (window.SHOWDOWN_ROUNDS || []).forEach(r => Object.assign(r, MORE[r.std] || {}));
})();

// ---------------------------------------------------------------------
//  PROVE IT (Fynn 11-14: "way too much opportunity to just click through"; picked "Prove It pairs").
//  Every source question needs an answer AND the detail that proves it; the pair only counts if
//  both are right. After a miss, the next try uses the other version of the question (alt).
//  proof[0] / alt.options[0] are right (screen shuffles). Wrong proofs are not in the source.
// ---------------------------------------------------------------------
(function () {
  const P = {
    "WH.24": {
      snap: { proof: ["His feet stand on Cape Town and Cairo, the two ends of Africa", "He is shaking hands with an African king to sign a treaty", "He is stepping onto a ship to sail home to Britain"],
        alt: { ask: "The cartoon calls Rhodes a “Colossus,” a giant. What does a giant standing over the whole map suggest about his goal?", options: ["Control of the whole continent for Britain", "A fair trade partnership with Africans", "Guarding Africa from other empires for free", "Exploring Africa only for science"] } },
      snap2: { proof: ["“No Africans were invited.”", "“African kings voted on the borders.”", "“Europe paid each kingdom for its land.”"],
        alt: { ask: "At the Berlin Conference, who got a say in how Africa was divided?", options: ["Only the outside powers, mostly European", "African kings and European leaders together", "Only Africans who lived near the coast", "Every country in the world, through a vote"] } }
    },
    "WH.25": {
      snap: { proof: ["Doumer, the French governor, says his new “state monopolies” did the trick", "A Vietnamese emperor signs a brand-new tax law", "British ships unload their goods in Hanoi's port"],
        alt: { ask: "France sent Paul Doumer to run Vietnam and set its taxes himself. Which kind of rule is that?", options: ["Direct rule", "Indirect rule", "A sphere of influence", "Self-rule by the Vietnamese"] } },
      snap2: { proof: ["The box says Europe, the United States, and Japan colonized most of Asia, Africa, and Oceania", "The map key lists China as an empire with colonies", "The box says only Britain and France took colonies"],
        alt: { ask: "Based on the box above the map, was the new imperialism only a European thing?", options: ["No. The U.S. and Japan built empires too.", "Yes. Only European countries took colonies.", "No. China and India built the biggest empires.", "Yes. Only Britain and France took any land."] } }
    },
    "WH.27": {
      snap: { proof: ["The official says people are raising rats and bringing rats in from the provinces", "Vietnamese soldiers attack a French fort with guns", "Workers build a new French-style factory in Hanoi"],
        alt: { ask: "The French paid a reward for rat tails, and the number of rats went UP. What does that show about how Vietnamese people responded?", options: ["They used the French rule to make money for themselves", "They followed the French plan exactly as it was written", "They fought the French army in the streets of Hanoi", "They left Hanoi and moved to Japan to start over"] } },
      snap2: { proof: ["She says she wants to avoid armed fighting and the loss of life", "She says she is happy for Hawaiʻi to join the United States", "She says her army will fight until the Americans leave"],
        alt: { ask: "Liliʻuokalani gave up power but said she did it “under this protest.” What kind of response is that?", options: ["Peaceful resistance", "Armed resistance", "Adapting by copying the West", "Agreeing with the takeover"] } }
    },
    "WH.29": {
      snap: { proof: ["Chamberlain bargains for peace, but then Poland is invaded in 1939", "Hitler signs a peace treaty and gives his land back", "Britain attacks Germany first, back in 1938"],
        alt: { ask: "In 1938, Britain and France let Hitler take part of Czechoslovakia, hoping he would stop. What happened next?", options: ["He took the rest, then invaded Poland in 1939", "He kept his word and stopped taking land", "He gave the land back to Czechoslovakia", "He joined the League of Nations to keep peace"] } },
      snap2: { proof: ["“The League sent no troops and set no punishments.”", "“The League's army forced Japan out of Manchuria.”", "“China refused to ask the League for any help.”"],
        alt: { ask: "The League of Nations blamed Japan for taking Manchuria. What did Japan do next?", options: ["It quit the League and kept Manchuria", "It apologized and gave Manchuria back", "It paid China for all the land it took", "It let the League take over Manchuria"] } }
    },
    "WH.30": {
      snap: { proof: ["The stories go from losing a business, to an arrest, to a town that is “Jew Free”", "The passengers say life in Germany is getting better", "Everyone on the train is a German soldier going home"],
        alt: { ask: "First a business is lost. Then a relative is arrested. Then a town bans Jews. What does this order show?", options: ["Nazi persecution got worse one step at a time", "The Nazis treated Jewish families fairly at first", "Jewish families were only hurt after the war ended", "Persecution stayed exactly the same every year"] } },
      snap2: { proof: ["The officer shouts “It's all YOUR fault, this war!” at the Jewish prisoners", "The officer gives the Jewish prisoners extra food", "The prisoners are sent home because the war is over"],
        alt: { ask: "Blaming Jews for the war, for money problems, for everything: which Nazi tool is this?", options: ["Scapegoating", "Appeasement", "Rationing", "Annexation"] } }
    },
    "WH.31": {
      snap: { proof: ["The crying child behind the pillar is labeled “1940 Class”", "The leaders are smiling and shaking hands with Germany", "The cartoon's title is “Peace Forever”"],
        alt: { ask: "The cartoon is called “Peace and Future Cannon Fodder.” Cannon fodder means soldiers sent to die. What is the cartoonist warning?", options: ["This peace will send today's kids into a new war", "This peace will end war for good", "Germany will become France's closest friend", "The League will keep every child safe from war"] } },
      snap2: { proof: ["The chart shows troops sent by member countries", "The chart shows Germany paying for the whole war", "The chart shows only European countries as members"],
        alt: { ask: "Why did the UN's planners add troops from member countries?", options: ["So it could actually stop an attacker, unlike the League", "So it could punish Germany one more time for WWI", "So it could take over weaker countries' governments", "So it could replace every country's own army"] } }
    },
    "WH.32": {
      snap: { proof: ["Japan announced its surrender on Aug. 15, six days after Nagasaki", "Germany surrendered right after a bomb hit Berlin in August", "The U.S. only joined the war after the bombs were dropped"],
        alt: { ask: "Germany had surrendered in May 1945. Which country was still fighting the Allies when the atomic bombs fell in August?", options: ["Japan", "Germany", "Italy", "France"] } },
      snap2: { proof: ["Radar calculates the planes' position so fighters can meet them before they reach their targets", "British tanks fire at the German planes from the ground", "Codebreakers read every German battle plan in advance"],
        alt: { ask: "Germany had more planes in 1940. What let Britain's fewer fighters be in the right place at the right time?", options: ["Radar spotting the planes early", "The atomic bomb", "Machine guns in the trenches", "U-boats in the English Channel"] } }
    },
    "WH.33": {
      snap: { proof: ["Vladek says, “They took from us our names”", "The guards hand out new clothes and name tags", "The prisoners are allowed to keep their papers"],
        alt: { ask: "Guards took prisoners' clothes, hair, and papers, and gave them numbers. Why?", options: ["To strip away who they were so they were easier to control", "To keep the prisoners clean and healthy", "To help families find each other after the war", "To get the prisoners ready to be set free"] } },
      snap2: { proof: ["Thurlow was 13 and a mile from the blast; Truman spoke from the White House", "Both of them were standing in Hiroshima that morning", "Thurlow was a soldier flying on the bomber"],
        alt: { ask: "What does comparing Truman and Thurlow teach about total war?", options: ["Where you were shaped what you saw and remembered", "Leaders always suffer the most in a war", "Civilians are never in danger in a total war", "Everyone remembers a war in the same way"] } }
    }
  };
  (window.SHOWDOWN_ROUNDS || []).forEach(r => { const p = P[r.std]; if (!p) return; Object.assign(r.snap, p.snap); Object.assign(r.snap2, p.snap2); });
})();
