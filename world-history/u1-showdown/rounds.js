// =====================================================================
//  UNIT SHOWDOWN · World History Unit 1 review (Days 12–13, replaces the Jojo Rabbit days)
//  Fynn 11-14: "my kind of review, not a gross packet or worksheet." Picked "Unit Showdown."
//  8 rounds = the 8 parts of the Unit 1 test (Form A): WH.24, 25, 27, 29 on Day 12;
//  WH.30, 31, 32, 33 on Day 13. Each round: a bet, a Source Snap (real source), a Build It.
//  Items practice the same skills as the test but are NOT the test questions.
//  Fynn 11-14 (later): "make sure it is very aligned with the test and not any filler stuff" →
//  checked every item against Form A; off-test items (Berlin Conference, Ethiopia/Liberia, Stalingrad,
//  Ho Chi Minh 1945, "totalitarian", etc.) were swapped for items on what each test part asks.
//  In "snap" options, the FIRST option is right (screen shuffles). In "build" rows, "a" is the right label.
//  "order" builds: items are listed in the right order (screen shuffles them).
// =====================================================================
window.SHOWDOWN_ROUNDS = [
      {
        std: "WH.24", part: 1, title: "Why Europe Took Africa", icon: "🌍",
        ican: "I can explain why European countries raced to take over Africa in the 1800s.",
        snap: {
          img: "img/rhodes-colossus.jpg",
          alt: "1892 cartoon: Cecil Rhodes stands like a giant over Africa with one foot in Cape Town and one in Cairo, holding a telegraph wire.",
          cite: "“The Rhodes Colossus,” <i>Punch</i> magazine (London), 1892. Cecil Rhodes was a British businessman and leader in southern Africa.",
          ask: "Rhodes stands over the whole map. One foot is in Cape Town (bottom). One is in Cairo (top). What is the cartoon saying he wants?",
          options: ["British control of Africa from top to bottom", "A trade deal to split up Africa with France", "To pull British soldiers out of Africa", "To hand African kingdoms back their land"],
          hint: "Look where his feet are. What does a giant standing over a map want?",
          why: "Rhodes dreamed of British land and a railroad from Cape Town to Cairo. That's <b>power</b> and <b>money</b>."
        },
        build: {
          type: "sort",
          ask: "Sort each clue by the kind of reason it shows.",
          labels: ["Money (economic)", "Power & pride (political)", "Racist beliefs (cultural)"],
          rows: [
            { icon: "🌳", t: "Belgium's King Leopold forced people in the Congo to collect rubber for him to sell.", a: "Money (economic)" },
            { icon: "🏁", t: "Britain and France raced to claim land before their rival could get it.", a: "Power & pride (political)" },
            { icon: "📖", t: "European writers claimed they had a duty to “civilize” Africans.", a: "Racist beliefs (cultural)" }
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
          ask: "What happened in each place? Tap the best match.",
          labels: ["Direct rule", "Indirect rule", "Sphere of influence", "Annexation"],
          // Fynn 11-14: "they won't understand what the words mean" → picked "meaning first, then word."
          // Step 1 chips show these plain meanings (not the words). Step 2: cards flip to the real names.
          // Step 3: one new case from "prove," names only (a miss brings up a different case).
          mean: {
            "Direct rule": "The empire's own officials run it",
            "Indirect rule": "Local rulers stay but take orders",
            "Sphere of influence": "The empire controls trade only",
            "Annexation": "The land becomes part of the empire"
          },
          prove: [
            { icon: "🇨🇩", t: "Belgian Congo after 1908: Belgian officials ran everything.", a: "Direct rule" },
            { icon: "👑", t: "India: some Indian princes kept their thrones, but they had to obey Britain.", a: "Indirect rule" },
            { icon: "🇰🇷", t: "Korea, 1910: Japan made Korea part of Japan.", a: "Annexation" }
          ],
          rows: [
            { icon: "🇻🇳", t: "Vietnam: France sent its own governors to run the colony and make its laws.", a: "Direct rule" },
            { icon: "🇳🇬", t: "Northern Nigeria: Britain let local chiefs stay in charge, as long as they followed British orders.", a: "Indirect rule" },
            { icon: "🚢", t: "China: Britain, France, Germany, and Japan each controlled trade in their own zone. The U.S. wanted in on the trade, not the land.", a: "Sphere of influence" },
            { icon: "🌺", t: "Hawaiʻi, 1898: the U.S. made the islands part of the United States.", a: "Annexation" }
          ],
          hint1: "Read each one again. Ask: who is really in charge there?",
          hint: "Direct = the empire's own officials. Indirect = local rulers take orders. Sphere = control of trade only. Annexation = the land becomes part of the empire.",
          why: "Empires didn't all rule the same way: <b>direct rule</b> (the empire's own officials), <b>indirect rule</b> (local rulers take orders), <b>sphere of influence</b> (trade only), and <b>annexation</b> (the land becomes part of the empire)."
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
          img: "img/shinagawa-bridge.jpg",
          imgAlt: "Old photo of a railroad bridge in Tokyo, Japan, during the Meiji era.",
          imgCite: "Railroad bridge at Shinagawa, Tokyo, Meiji era (1868–1912). Day 3: Pacific Case Files.",
          ask: "How did each group respond to outside powers?",
          labels: ["Adapt", "Armed resistance", "Peaceful resistance"],
          mean: {
            "Adapt": "Copy outside ideas to stay strong",
            "Armed resistance": "Fight back with weapons",
            "Peaceful resistance": "Push back without weapons"
          },
          prove: [
            { icon: "🎓", t: "Japan, 1871: leaders sent a team to the U.S. and Europe to study their schools, factories, and armies.", a: "Adapt" },
            { icon: "🏯", t: "China, 1900: the Boxers surrounded the foreign embassies in Beijing for 55 days.", a: "Armed resistance" },
            { icon: "✉️", t: "Hawaiʻi, 1897: Hawaiian leaders carried the petitions to Washington, D.C., and asked the Senate to say no.", a: "Peaceful resistance" }
          ],
          rows: [
            { icon: "🚂", t: "Japan, after 1868: railroads like the one in the photo, factories, and a modern army.", a: "Adapt" },
            { icon: "⚔️", t: "China, 1900: the Boxers attacked foreigners and Chinese Christians.", a: "Armed resistance" },
            { icon: "📝", t: "Hawaiʻi, 1897: over 21,000 Native Hawaiians signed petitions against annexation.", a: "Peaceful resistance" }
          ],
          hint1: "Read each one again. Ask: did they copy, fight, or protest?",
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
          ask: "At Munich in 1938, Chamberlain let Hitler take part of Czechoslovakia to keep the peace. Giving in like that is called appeasement. In 1939, Hitler took the rest, then invaded Poland. What did appeasement teach Hitler?",
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
          options: ["Persecution grew step by step, each worse than the last", "Jewish families were safe until the war itself began", "Jewish soldiers were the ones singled out by the Nazis", "The Nazis kept their hatred hidden from the public"],
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
          options: ["The harsh peace will cause a new war around 1940", "Children will be safe now that the war is over", "Germany will pay off its war debt by 1940", "The League of Nations will end war by 1940"],
          hint: "“Cannon fodder” means soldiers sent to die. What would kids born in 1919 be doing in 1940?",
          why: "Dyson predicted the angry, harsh <b>Treaty of Versailles</b> would lead to another war. WWII began in 1939."
        },
        build: {
          type: "sort",
          ask: "Did each change come after World War I or after World War II?",
          labels: ["After WWI", "After WWII"],
          rows: [
            { icon: "💸", t: "Germany must pay huge reparations (money for war damage) and accept all the blame for the war.", a: "After WWI" },
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
          options: ["Japan announced its surrender within days", "Germany gave up after a bomb hit Berlin", "It pulled the United States into the war", "Japan kept fighting for two more years"],
          hint: "Which country was still fighting in August 1945? Germany had already surrendered in May.",
          why: "Japan announced its surrender on Aug. 15, 1945. The <b>atomic bomb</b> ended the war in the Pacific, and it killed huge numbers of civilians."
        },
        build: {
          type: "sort",
          ask: "Match each new technology to what it did.",
          labels: ["Machine gun", "Tank", "U-boat (submarine)", "Radar"],
          rows: [
            { icon: "🪖", t: "WWI: defenders mowed down charges, so armies dug trenches and the war got stuck.", a: "Machine gun" },
            { icon: "🛞", t: "Late WWI: armored machines rolled over trenches and barbed wire.", a: "Tank" },
            { icon: "🌊", t: "Sank ships carrying supplies. Attacks on U.S. ships helped pull America into WWI.", a: "U-boat (submarine)" },
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
        file: "<b>Fact file · The latecomers</b>Britain and France already had big empires. Germany (united in 1871) and Italy (united in 1861) were new countries with almost no colonies. In 1897, Germany's foreign minister said Germany demanded its own “place in the sun.” Italy tried to conquer Ethiopia in 1896 and lost. In 1911, it took Libya instead.",
        ask: "Read the fact file. Which kind of reason pushed Germany and Italy to grab colonies?",
        options: ["Political: to prove they were great powers too", "Economic: to buy cheap food for their farmers", "Cultural: to spread their religion and schools", "Military: to train their soldiers far from home"],
        hint: "They were new and had almost no colonies. What did they want to show Britain and France?",
        why: "Germany and Italy wanted colonies to look as strong as Britain and France. That's a <b>political</b> reason: power and pride."
      },
      fix: {
        intro: "A student wrote this Explain It for the test.",
        lines: ["One reason Europe took over Africa was money.", "European factories needed rubber, palm oil, and diamonds from Africa.", "European companies paid African workers fair wages for the rubber.", "Colonies made European companies rich."],
        wrong: 2,
        fixes: ["In the Congo, King Leopold forced people to collect rubber for him.", "In the Congo, King Leopold shared the rubber money with each village.", "In the Congo, African kings sold the rubber and kept the profits."],
        hint: "Think about King Leopold's Congo. Did people there get a fair deal?",
        why: "Facts in an Explain It have to be right. Colonies made money because people were forced to work."
      },
      lightning: [
        { q: "Imperialism means…", options: ["a strong country taking control of other lands", "a country choosing its own leaders in elections", "two countries trading with each other as equals"] },
        { q: "Wanting colonies to look as strong as rival countries is which kind of reason?", options: ["Political (power and pride)", "Economic (money to be made)", "Cultural (racist beliefs)"] },
        { q: "King Leopold got rich selling rubber from the Congo. Which kind of reason is that?", options: ["Economic (money to be made)", "Political (power and pride)", "Cultural (racist beliefs)"] }
      ]
    },
    "WH.25": {
      snap2: {
        file: "<b>Fact file · Two U.S. moves in the Pacific</b><b>Hawaiʻi, 1898:</b> Congress passed a law that made the Hawaiian Islands part of the United States. The queen had already been overthrown.<br><b>China, 1899–1900:</b> Secretary of State John Hay pushed for an “Open Door”: every country could trade in China, and China would not be carved up into colonies.",
        ask: "Read the fact file. What did the U.S. want in China?",
        options: ["A share of the trade, not the land", "To make China the next U.S. state", "To remove China's ruler, like in Hawaiʻi", "To keep other countries out of China"],
        hint: "What does an “Open Door” let countries do?",
        why: "In <b>Hawaiʻi</b>, the U.S. took the land (annexation). In <b>China</b>, it only wanted trade (the Open Door)."
      },
      fix: {
        intro: "A student wrote this Explain It about France in Vietnam.",
        lines: ["In Vietnam, France ruled by direct rule.", "French governors like Paul Doumer ran the colony.", "France let Vietnam's emperor make all of the laws.", "French officials set the taxes, like government-only sales of salt and opium."],
        wrong: 2,
        fixes: ["Vietnam's emperor had little real power, and the French made the laws.", "Vietnamese villages held a vote each year to pick the French governor.", "France left Vietnam alone and just sent traders to its biggest ports."],
        hint: "In direct rule, who makes the laws: local rulers or the empire's own officials?",
        why: "That's what makes it <b>direct rule</b>: the empire's own officials make the laws."
      },
      lightning: [
        { q: "Indirect rule means…", options: ["local rulers stay, but they take the empire's orders", "the empire sends its own officials to run the colony", "the colony rules itself with no outside control"] },
        { q: "A sphere of influence is…", options: ["an area where a foreign power controls trade", "land that an empire takes over and makes its own", "a colony run by its own elected leaders"] },
        { q: "Which European country ruled Vietnam in the 1890s?", options: ["France", "Britain", "Germany"] }
      ]
    },
    "WH.27": {
      snap2: {
        img: "img/liliuokalani.jpg",
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
        { q: "Adapting to imperialism means…", options: ["copying outside ideas to stay strong and free", "fighting with weapons to drive outsiders away", "shutting the ports to keep outsiders away"] },
        { q: "The Boxers in China (1900) wanted to…", options: ["drive foreigners out of China", "copy Western factories and railroads", "make China part of the United States"] },
        { q: "In 1897, Native Hawaiians pushed back against annexation by…", options: ["signing petitions against it", "attacking U.S. Navy ships", "copying U.S. factories"] }
      ]
    },
    "WH.29": {
      snap2: {
        file: "<b>Fact file · Manchuria, 1931</b>Japan is a group of islands with little coal or iron. Manchuria, a big region of northern China, had coal, iron, and farmland that Japan's growing empire wanted. In 1931, Japan's army took it over. The League of Nations blamed Japan, but it sent no troops and set no punishments. Japan simply quit the League.",
        ask: "Read the fact file. Why did Japan take over Manchuria?",
        options: ["It wanted Manchuria's coal, iron, and farmland", "It wanted to punish China for attacking Tokyo", "It wanted to guard China from the League's army", "It wanted to win back land it lost to Germany"],
        hint: "What did Manchuria have that Japan's islands did not?",
        why: "Japan wanted Manchuria's <b>coal, iron, and land</b>. The League had <b>no army</b> to stop it, so other dictators learned that taking land worked."
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
        { q: "The MAIN causes of WWI: Militarism, Alliances, Imperialism, and… (strong pride in your own nation)", options: ["Nationalism", "Neutrality", "Negotiation"] },
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
        fixes: ["Once in power, he banned other parties and used propaganda and secret police.", "Once in power, he gave Jewish Germans equal rights and police protection.", "Once in power, he held free elections with many different parties each year."],
        hint: "Dictators control people. Would one allow free newspapers?",
        why: "Hitler, Mussolini, and Stalin all used <b>propaganda</b>, <b>secret police</b>, and banned opponents."
      },
      lightning: [
        { q: "Propaganda is…", options: ["one-sided messages to control what people think", "a law that protects people's right to free speech", "a peace deal between two countries"] },
        { q: "Why did many Germans turn to Hitler in the early 1930s?", options: ["The Great Depression left millions without jobs", "Germany had just won World War I and felt strong", "Britain and France asked him to lead Germany"] },
        { q: "The Holocaust was…", options: ["the Nazi murder of six million Jews and millions of others", "Germany's invasion of the Soviet Union in 1941", "the Allied bombing of German cities near the end of the war"] }
      ]
    },
    "WH.31": {
      snap2: {
        img: "../../day11-wwii-peace/pages/p-05.jpg",
        alt: "Page from a 1945 True Comics story explaining the plan for the United Nations with a chart of its parts.",
        cite: "“A Third World War Can Be Prevented Now!” <i>True Comics</i> #44, 1945. Day 11 reading.",
        ask: "The 1944 plan for the United Nations added something the League of Nations never had. What was it?",
        options: ["Troops from member countries to stop an attacker", "A rule that Germany would pay the cost of both wars", "A ban on member countries building weapons", "Seats saved for the countries of Europe"],
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
        options: ["Radar showed where planes were coming, so fighters were waiting", "The Royal Navy shot down the planes at sea", "An atomic bomb destroyed Germany's air force", "Tanks shot down the German planes from the English beaches"],
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
        { q: "Tanks helped end the trench stalemate because they…", options: ["could roll over trenches and barbed wire", "could spot enemy planes with radio waves", "could sink supply ships far out at sea"] },
        { q: "People still argue about the atomic bomb because it…", options: ["ended the war fast but killed huge numbers of civilians", "was built by Germany but used by the United States", "was dropped on Berlin after Germany had given up"] }
      ]
    },
    "WH.33": {
      snap2: {
        file: "<b>Two points of view · the atomic bomb, 1945</b><b>President Truman</b> (radio speech, Aug. 9, 1945): “We have used it in order to shorten the agony of war, in order to save the lives of thousands and thousands of young Americans.”<br><b>Setsuko Thurlow</b>, age 13, about a mile from the blast in Hiroshima: “At 8:15, I saw a blinding bluish-white flash from the window.” She was trapped in a collapsed building and lost family and classmates. She spent her life working to ban nuclear weapons. (Nobel Peace Prize lecture, 2017)",
        ask: "Read both. How are their points of view on the bomb different?",
        options: ["Truman: it would end the war sooner · Thurlow: it caused terrible suffering", "Truman: it caused terrible suffering · Thurlow: it would end the war sooner", "Truman: Japan was about to win the war · Thurlow: the bomb did little harm", "Truman: the bomb was a huge mistake · Thurlow: the bomb saved her family"],
        hint: "What reason does Truman give? What happened to Thurlow?",
        why: "Same bomb, two <b>points of view</b>. Truman: it ended the war fast and saved soldiers. Critics like Thurlow: killing civilians was wrong."
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
        { q: "Total war means…", options: ["a whole nation's people and factories are used for war", "trained soldiers do the fighting far from home", "a war that is fought on just one continent at a time"] },
        { q: "On the U.S. home front in WWII, families…", options: ["rationed food and worked in war factories", "were barely affected by the war overseas", "had more gas, sugar, and meat than before"] },
        { q: "Why do people who lived through the same war remember it differently?", options: ["Where they were shaped what they saw and lost", "Soldiers are the ones who truly remember a war", "People forget most of a war within a few years"] }
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
        alt: { ask: "The cartoon calls Rhodes a “Colossus,” a giant. What does a giant standing over the whole map suggest about his goal?", options: ["Control of the whole continent for Britain", "A fair trade partnership with Africans", "Guarding Africa from other empires for free", "Exploring Africa to study its wildlife"] } },
      snap2: { proof: ["Germany demanded its own “place in the sun”", "Germany's factories ran out of rubber in 1897", "Italy asked Ethiopia to teach its farmers"],
        alt: { ask: "Italy lost in Ethiopia in 1896, then took Libya in 1911. Why did Italy keep trying to get a colony?", options: ["To show it was a great power like its rivals", "To pay Ethiopia back for the land it took", "To give the people of Libya free elections", "To get away from Britain's rules on trade"] } }
    },
    "WH.25": {
      snap: { proof: ["Doumer, the French governor, says his new “state monopolies” did the trick", "A Vietnamese emperor signs a brand-new tax law", "British ships unload their goods in Hanoi's port"],
        alt: { ask: "France sent Paul Doumer to run Vietnam. French officials made the laws and set the taxes. Which kind of rule is that?", options: ["Direct rule: the empire's own officials run it", "Indirect rule: local rulers stay but take orders", "A sphere of influence: control of its trade", "Self-rule: the Vietnamese run it themselves"] } },
      snap2: { proof: ["Hawaiʻi became part of the U.S., but the “Open Door” was only about trade", "Congress passed a law that made China part of the United States in 1899", "John Hay asked every other country to stop all of its trade in China"],
        alt: { ask: "Look at both U.S. moves. In which place did the U.S. take the land for itself?", options: ["Hawaiʻi: it became part of the U.S.", "China: it became part of the U.S.", "Both: the U.S. took both places", "Neither: the U.S. just traded"] } }
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
      snap2: { proof: ["“Manchuria… had coal, iron, and farmland that Japan's growing empire wanted.”", "“Manchuria's people voted to become part of Japan's growing empire.”", "“The League of Nations sent its army to attack Japan's islands first.”"],
        alt: { ask: "Japan's islands had little coal or iron. What did taking Manchuria give Japan?", options: ["Resources and land for its empire", "A promise of help from the League", "A peace treaty with China's leaders", "New colonies in Africa, like Italy"] } }
    },
    "WH.30": {
      snap: { proof: ["The stories go from losing a business, to an arrest, to a town that is “Jew Free”", "The passengers say life in Germany is getting better", "Everyone on the train is a German soldier going home"],
        alt: { ask: "First a business is lost. Then a relative is arrested. Then a town bans Jews. What does this order show?", options: ["Nazi persecution got worse one step at a time", "The Nazis treated Jewish families fairly at first", "Jewish families were safe until the war began", "Persecution stayed about the same each year"] } },
      snap2: { proof: ["The officer shouts “It's all YOUR fault, this war!” at the Jewish prisoners", "The officer gives the Jewish prisoners extra food", "The prisoners are sent home because the war is over"],
        alt: { ask: "Blaming Jews for the war, for money problems, for everything: which Nazi tool is this?", options: ["Scapegoating (blaming one group)", "Appeasement (giving in to keep peace)", "Rationing (limiting food and supplies)", "Annexation (taking over land)"] } }
    },
    "WH.31": {
      snap: { proof: ["The crying child behind the pillar is labeled “1940 Class”", "The leaders are smiling and shaking hands with Germany", "The cartoon's title is “Peace Forever”"],
        alt: { ask: "The cartoon is called “Peace and Future Cannon Fodder.” Cannon fodder means soldiers sent to die. What is the cartoonist warning?", options: ["This peace will send today's kids into a new war", "This peace will end war for good", "Germany will become France's closest friend", "This peace will leave Britain and France broke"] } },
      snap2: { proof: ["The chart shows troops sent by member countries", "The chart shows Germany paying for the whole war", "The chart shows only European countries as members"],
        alt: { ask: "Why did the UN's planners add troops from member countries?", options: ["So it could actually stop an attacker, unlike the League", "So it could punish Germany one more time for WWI", "So it could take over weaker countries' governments", "So it could replace each member's own army"] } }
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
      snap2: { proof: ["Truman says it will “shorten the agony of war”; Thurlow lost family and classmates", "Truman says Japan is about to invade; Thurlow says she never saw the flash", "Truman and Thurlow both say the bomb should never have been built at all"],
        alt: { ask: "Why do Truman and Thurlow see the same bomb so differently?", options: ["He was a leader trying to end a war; she was a child who lived through it", "He was a child living in Hiroshima; she was a leader far away in Washington", "They both wanted the war to keep going for a few more years", "She was a soldier on the bomber; he was a civilian living in Japan"] } }
    }
  };
  (window.SHOWDOWN_ROUNDS || []).forEach(r => { const p = P[r.std]; if (!p) return; Object.assign(r.snap, p.snap); Object.assign(r.snap2, p.snap2); });
})();
