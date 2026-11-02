// Spanish for "Who Taught You How to Be You?" (Sociology Unit 3 Day 1). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same helpers as the page, so the English keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const pg = (age, body) => `<span class="ev photo"><span class="who">📷 Age ${age}</span>${body}</span>`;
  const pgEs = (age, body) => `<span class="ev photo"><span class="who">📷 ${age} años</span>${body}</span>`;
  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "Daniela's Scrapbook | Sociology Unit 3 Day 1": "El álbum de Daniela | Sociología Unidad 3 Día 1",
      "Sociology · Unit 3 · Day 1": "Sociología · Unidad 3 · Día 1",
      "Who Taught You How to Be You?": "¿Quién te enseñó a ser tú?",
      "Goal:": "Meta:",
      "Explain how family, peers, school, and media socialize us, and use Mead and Kohlberg to explain how the self grows. · About 25 minutes.": "Explicar cómo la familia, los amigos de tu edad, la escuela y los medios nos socializan, y usar las ideas de Mead y Kohlberg para explicar cómo crece el yo. · Unos 25 minutos.",
      "Progress and influence bars": "Progreso y barras de influencia",
      "Influence on Daniela": "Influencia sobre Daniela",
      "Family": "Familia",
      "Peers": "Pares",
      "School": "Escuela",
      "Media": "Medios",
      "Religion": "Religión",

      // ---------- Intro ----------
      "Open the scrapbook": "Abrir el álbum",
      "A life in pages": "Una vida en páginas",
      "Daniela's scrapbook": "El álbum de Daniela",
      "Nobody is born knowing how to talk, what's polite, or what's \"cool.\" We learn it from people around us.": "Nadie nace sabiendo hablar, qué es de buena educación o qué es \"chévere\". Lo aprendemos de la gente que nos rodea.",
      "You'll flip through the life of <b>Daniela</b>, from age 2 to 31. On each page, figure out <b>who taught her that</b>. Three times, you'll choose what happens. Watch the <b>influence bars</b> at the top. They show which teachers in her life get louder.":
        "Vas a pasar las páginas de la vida de <b>Daniela</b>, desde los 2 hasta los 31 años. En cada página, descubre <b>quién le enseñó eso</b>. Tres veces vas a escoger lo que pasa. Mira las <b>barras de influencia</b> de arriba. Muestran qué maestros de su vida tienen más peso.",
      "📖 Part 1: little kid. Part 2: teenager. Part 3: adult.": "📖 Parte 1: niña pequeña. Parte 2: adolescente. Parte 3: adulta.",
      "🎚️ Your choices change which influences grow.": "🎚️ Tus decisiones cambian qué influencias crecen.",
      "✍️ Write 2 short answers about Daniela and turn in.": "✍️ Escribe 2 respuestas cortas sobre Daniela y entrega.",
      "Daniela is made up. The ideas come from real sociologists.": "Daniela es inventada. Las ideas vienen de sociólogos reales.",

      // ---------- Part 1 ----------
      "Part 1 of 3 · Ages 2–8": "Parte 1 de 3 · De 2 a 8 años",
      "Little Daniela": "Daniela de pequeña",
      [`<p><b>Socialization</b> is the lifelong process of learning the <b>norms, values, and behaviors</b> of your society. It's how you get your culture and your sense of who you are.</p>
        <p><b>Agents of socialization</b> are the people and groups who teach us: <b>family</b> (first and usually strongest), <b>peers</b> (friends your age), <b>school</b>, and <b>media</b>.</p>
        <p><b>George Herbert Mead</b>: your <b>self</b> grows as you learn to see yourself through other people's eyes.</p><ul><li><b>Play stage</b>: kids pretend to be one other person (a parent, a teacher).</li><li><b>Game stage</b>: kids understand many roles and rules at once. Mead called what everyone expects the <b>generalized other</b>.</li></ul>`]:
        `<p>La <b>socialización (socialization)</b> es el proceso, que dura toda la vida, de aprender las <b>normas, los valores y las conductas</b> de tu sociedad. Así recibes tu cultura y tu idea de quién eres.</p>
        <p>Los <b>agentes de socialización (agents of socialization)</b> son las personas y los grupos que nos enseñan: la <b>familia</b> (el primero y casi siempre el más fuerte), los <b>pares (peers)</b>, o sea, los amigos de tu edad, la <b>escuela</b> y los <b>medios de comunicación (media)</b>.</p>
        <p><b>George Herbert Mead</b>: tu <b>yo (self)</b> crece a medida que aprendes a verte a ti mismo con los ojos de otras personas.</p><ul><li><b>Etapa del juego de imitación (play stage)</b>: los niños fingen ser otra persona (mamá, papá, una maestra).</li><li><b>Etapa del juego organizado (game stage)</b>: los niños entienden muchos roles y reglas a la vez. Mead llamó <b>otro generalizado (generalized other)</b> a lo que todos esperan de ti.</li></ul>`,

      [pg("2", "Daniela says her first words, \"agua\" and \"more,\" in the kitchen with her mom and grandma.") + "Which agent taught Daniela her first language?"]:
        pgEs("2", "Daniela dice sus primeras palabras, \"agua\" y \"more\" (más), en la cocina con su mamá y su abuela.") + "¿Qué agente le enseñó a Daniela su primer idioma?",
      "Who is around a 2-year-old all day?": "¿Quién está todo el día con una niña de 2 años?",
      "Family is the first agent of socialization. It teaches language, values, and rules.": "La familia es el primer agente de socialización. Enseña el idioma, los valores y las reglas.",

      [pg("4", "Daniela lines up her stuffed animals. \"Criss-cross applesauce! Raise your hand!\" she says in her teacher voice.") + "According to Mead, what is she learning?"]:
        pgEs("4", "Daniela pone en fila a sus peluches. \"¡Siéntense con las piernas cruzadas! ¡Levanten la mano!\", dice con su voz de maestra.") + "Según Mead, ¿qué está aprendiendo?",
      "To see the world from another person's role": "A ver el mundo desde el rol de otra persona",
      "To memorize the rules of her favorite game": "A memorizar las reglas de su juego favorito",
      "To stop using her imagination as she grows": "A dejar de usar su imaginación al crecer",
      "To follow whatever her stuffed animals do": "A seguir lo que hagan sus peluches",
      "She's pretending to BE someone else. Check Mead in the teach box.": "Está fingiendo SER otra persona. Revisa lo de Mead en el cuadro de arriba.",
      "In the play stage, kids take on one other person's role. That teaches them to see from someone else's point of view, which builds the self.": "En la etapa del juego de imitación, los niños toman el rol de otra persona. Eso les enseña a ver desde el punto de vista de otro, y así se construye el yo.",

      [pg("6", "First day of 1st grade. Daniela is nervous and holding the door frame.") + `<p>What helps her walk in?</p>`]:
        pgEs("6", "Primer día de primer grado. Daniela está nerviosa y agarrada del marco de la puerta.") + `<p>¿Qué la ayuda a entrar?</p>`,
      "Grandma kneels down and practices: \"Good morning, Ms. Park.\"": "La abuela se agacha y practica con ella: \"Buenos días, maestra Park.\"",
      [`<p>${T("up","Family +2")}Daniela greets her teacher just like Grandma showed her. Ms. Park smiles. Family taught her how to greet adults.</p>`]:
        `<p>${T("up","Familia +2")}Daniela saluda a su maestra tal como le enseñó la abuela. La maestra Park sonríe. La familia le enseñó a saludar a los adultos.</p>`,
      "She says the brave line from her favorite cartoon": "Dice la frase valiente de su comiquita favorita",
      [`<p>${T("up","Media +2")}"Let's GO!" she whispers, like the cartoon hero. A TV show just gave her a script for being brave.</p>`]:
        `<p>${T("up","Medios +2")}"¡VAMOS!", susurra, como el héroe de la comiquita. Un programa de televisión le acaba de dar un guion para ser valiente.</p>`,
      "The neighbor kid grabs her hand: \"Sit by me!\"": "El niño vecino le agarra la mano: \"¡Siéntate conmigo!\"",
      [`<p>${T("up","Peers +2")}She copies how her new friend acts all day. Peers start teaching her early.</p>`]:
        `<p>${T("up","Pares +2")}Todo el día copia cómo actúa su nuevo amigo. Los pares empiezan a enseñarle desde temprano.</p>`,

      [pg("7", "At school Daniela learns to line up, wait her turn, and stay quiet when the teacher talks, even with kids she doesn't know.") + "Which agent is teaching these norms?"]:
        pgEs("7", "En la escuela, Daniela aprende a hacer la fila, esperar su turno y quedarse callada cuando la maestra habla, incluso con niños que no conoce.") + "¿Qué agente le está enseñando estas normas?",
      "Where is she, and who sets these rules?": "¿Dónde está, y quién pone estas reglas?",
      "School teaches wider norms for living with lots of strangers: waiting, taking turns, following a schedule.": "La escuela enseña normas más amplias para convivir con muchos desconocidos: esperar, tomar turnos, seguir un horario.",

      [pg("8", "Daniela plays shortstop. She knows where the pitcher, catcher, and runner will go, and what the rules expect from everyone.") + "Which idea from Mead does this show?"]:
        pgEs("8", "Daniela juega de shortstop (campocorto). Sabe adónde van a ir el pitcher, el catcher y el corredor, y lo que las reglas esperan de todos.") + "¿Qué idea de Mead muestra esto?",
      "The game stage, or seeing the generalized other": "La etapa del juego organizado, o ver al otro generalizado",
      "The play stage, or pretending to be one grown-up": "La etapa del juego de imitación, o fingir ser un adulto",
      "A total institution, or living by strict rules": "Una institución total, o vivir con reglas muy estrictas",
      "Media, or learning from the TV": "Los medios, o aprender de la televisión",
      "She understands MANY roles and the rules at once.": "Entiende MUCHOS roles y las reglas a la vez.",
      "In the game stage, kids understand what everyone on the team expects. That's taking the role of the generalized other.": "En la etapa del juego organizado, los niños entienden lo que todo el equipo espera. Eso es tomar el rol del otro generalizado.",

      // ---------- Part 2 ----------
      "Part 2 of 3 · Ages 13–17": "Parte 2 de 3 · De 13 a 17 años",
      "Teen Daniela": "Daniela adolescente",
      [`<p>In the teen years, <b>peers</b> and <b>media</b> get louder. Peers shape interests, slang, and behavior. Media sends messages about what's acceptable, attractive, or cool.</p>
        <p><b>Lawrence Kohlberg</b> said moral thinking grows in three levels:</p>
        <ul><li><b>Preconventional</b>: do right to avoid punishment or get a reward.</li><li><b>Conventional</b>: follow the rules to fit in and be seen as good.</li><li><b>Postconventional</b>: follow your own ethical principles, even if it breaks a rule.</li></ul>`]:
        `<p>En la adolescencia, los <b>pares</b> y los <b>medios</b> tienen más peso. Los pares influyen en los gustos, la jerga y la conducta. Los medios mandan mensajes sobre lo que es aceptable, atractivo o chévere.</p>
        <p><b>Lawrence Kohlberg</b> dijo que el pensamiento moral crece en tres niveles:</p>
        <ul><li><b>Preconvencional (preconventional)</b>: hacer lo correcto para evitar un castigo o recibir un premio.</li><li><b>Convencional (conventional)</b>: seguir las reglas para encajar y que te vean como alguien bueno.</li><li><b>Posconvencional (postconventional)</b>: seguir tus propios principios éticos, aunque eso rompa una regla.</li></ul>`,

      [pg("14", "Group chat: <i>\"that's lowkey fire 😭\"</i>. Daniela's mom has no idea what it means.") + "Who most likely taught Daniela this slang?"]:
        pgEs("14", "Chat del grupo: <i>\"eso está burda de fino 😭\"</i>. La mamá de Daniela no tiene idea de qué significa.") + "¿Quién es más probable que le haya enseñado esta jerga a Daniela?",
      "Her mom doesn't even know it. Who does?": "Ni su mamá la conoce. ¿Quién sí?",
      "Slang spreads among friends the same age. That's peers as an agent of socialization.": "La jerga se riega entre amigos de la misma edad. Eso son los pares como agente de socialización.",

      [pg("14", "First week of high school. Daniela is picking her look.") + `<p>What shapes her choice?</p>`]:
        pgEs("14", "Primera semana de liceo. Daniela está escogiendo su estilo.") + `<p>¿Qué influye en su decisión?</p>`,
      "Match her friend group's style": "Vestirse igual que su grupo de amigas",
      [`<p>${T("up","Peers +2")}They take a group photo in matching hoodies. Fitting in with friends matters a lot at 14.</p>`]:
        `<p>${T("up","Pares +2")}Se toman una foto de grupo con suéteres iguales. A los 14 años, encajar con los amigos importa mucho.</p>`,
      "Copy an influencer's back-to-school video": "Copiar el video de regreso a clases de una influencer",
      [`<p>${T("up","Media +2")}She buys the exact outfit from the video. Media told her what \"good\" looks like.</p>`]:
        `<p>${T("up","Medios +2")}Se compra exactamente la ropa del video. Los medios le dijeron cómo se ve lo \"bueno\".</p>`,
      "Wear the gold hoop earrings Grandma gave her": "Ponerse las argollas de oro que le regaló la abuela",
      [`<p>${T("up","Family +2")}Grandma wore the same hoops at her age. Family traditions shape identity, too.</p>`]:
        `<p>${T("up","Familia +2")}La abuela usaba las mismas argollas a su edad. Las tradiciones familiares también forman la identidad.</p>`,

      [pg("15", "An ad shows pro athletes: <i>\"Real athletes drink BOLT.\"</i> Daniela starts buying BOLT before every softball game.") + "Which agent shaped this habit?"]:
        pgEs("15", "Un anuncio muestra atletas profesionales: <i>\"Los verdaderos atletas toman BOLT.\"</i> Daniela empieza a comprar BOLT antes de cada juego de sóftbol.") + "¿Qué agente formó este hábito?",
      "Where did the message come from?": "¿De dónde vino el mensaje?",
      "Ads are media. They send messages about what people \"like us\" should do or buy.": "Los anuncios son medios. Mandan mensajes sobre lo que la gente \"como nosotros\" debería hacer o comprar.",

      [pg("15", "Friends ask Daniela to help them cheat. She says no: \"Good teammates don't cheat. Coach expects better from us.\"") + "Which Kohlberg level is this?"]:
        pgEs("15", "Unas amigas le piden a Daniela que las ayude a copiarse en un examen. Ella dice que no: \"Una buena compañera de equipo no hace trampa. El entrenador espera más de nosotras.\"") + "¿Qué nivel de Kohlberg es este?",
      "Conventional, following rules to be seen as good": "Convencional, seguir reglas para verse como buena",
      "Preconventional, just avoiding getting caught": "Preconvencional, solo evitar que la agarren",
      "Postconventional, her own deep principles": "Posconvencional, sus propios principios profundos",
      "Game stage, understanding every team role": "Juego organizado, entender cada rol del equipo",
      "She cares about what a 'good teammate' does and what Coach expects.": "Le importa lo que hace una 'buena compañera de equipo' y lo que espera el entrenador.",
      "Following rules to be seen as good by others is the conventional level.": "Seguir las reglas para que los demás te vean como alguien bueno es el nivel convencional.",

      [pg("16", "Daniela's little brother, 6, cleans his room only because \"Mom said no tablet if I don't.\"") + "Which Kohlberg level is he at?"]:
        pgEs("16", "El hermanito de Daniela, de 6 años, limpia su cuarto solo porque \"Mamá dijo que si no lo hago, no hay tablet.\"") + "¿En qué nivel de Kohlberg está él?",
      "Preconventional, avoiding punishment": "Preconvencional, evitar un castigo",
      "Conventional, wanting to fit in": "Convencional, querer encajar",
      "Postconventional, his own principles": "Posconvencional, sus propios principios",
      "Play stage, pretending to be Mom": "Juego de imitación, fingir ser mamá",
      "Why is he cleaning? What happens if he doesn't?": "¿Por qué está limpiando? ¿Qué pasa si no lo hace?",
      "Doing the right thing only to avoid punishment is the preconventional level. It's normal for young kids.": "Hacer lo correcto solo para evitar un castigo es el nivel preconvencional. Es normal en los niños pequeños.",

      // ---------- Part 3 ----------
      "Part 3 of 3 · Ages 18–31": "Parte 3 de 3 · De 18 a 31 años",
      "Adult Daniela": "Daniela adulta",
      [`<p>Socialization is <b>lifelong</b>. New jobs, new groups, and new stages of life all teach new norms.</p>
        <p>A <b>total institution</b> is a place where people live cut off from society under strict control, like a prison or military boot camp. It strips away old roles and habits and replaces them with strict new routines. That's called <b>resocialization</b>.</p>`]:
        `<p>La socialización dura <b>toda la vida</b>. Los trabajos nuevos, los grupos nuevos y las nuevas etapas de la vida enseñan normas nuevas.</p>
        <p>Una <b>institución total (total institution)</b> es un lugar donde la gente vive aislada de la sociedad y bajo un control estricto, como una cárcel o el entrenamiento básico militar. Le quita a la persona sus roles y hábitos de antes y los reemplaza con rutinas nuevas y estrictas. Eso se llama <b>resocialización (resocialization)</b>.</p>`,

      [pg("18", "Daniela joins the Army. At boot camp: same haircut, same uniform, wake-up at 4:30 a.m., no phone for weeks.") + `<p>How does she get through it?</p>`]:
        pgEs("18", "Daniela entra al Ejército. En el entrenamiento básico: el mismo corte de pelo, el mismo uniforme, levantarse a las 4:30 a.m. y nada de celular por semanas.") + `<p>¿Cómo logra aguantarlo?</p>`,
      "Lean on her squad. They push each other.": "Apoyarse en su escuadra. Se dan ánimo entre todos.",
      [`<p>${T("up","Peers +2")}Her squad becomes like family. They learn the new rules together.</p>`]:
        `<p>${T("up","Pares +2")}Su escuadra se vuelve como una familia. Aprenden juntos las reglas nuevas.</p>`,
      "Fight every rule she thinks is dumb": "Pelear contra cada regla que le parece absurda",
      [`<p>${T("flat","No change")}Extra push-ups, every time. She still has to follow the routine. In a total institution, the system wins.</p>`]:
        `<p>${T("flat","Sin cambio")}Pechadas extra, cada vez. Igual tiene que seguir la rutina. En una institución total, el sistema gana.</p>`,
      "Write letters home every Sunday": "Escribirle cartas a su familia cada domingo",
      [`<p>${T("up","Family +2")}Grandma writes back every week. Family still matters, even from far away.</p>`]:
        `<p>${T("up","Familia +2")}La abuela le responde cada semana. La familia sigue importando, incluso desde lejos.</p>`,

      [pg("18", "Boot camp: everyone lives on base, cut off from home, under strict control 24 hours a day.") + "Boot camp is an example of…"]:
        pgEs("18", "Entrenamiento básico: todos viven en la base, lejos de casa, bajo un control estricto las 24 horas del día.") + "El entrenamiento básico militar es un ejemplo de…",
      "A total institution": "Una institución total",
      "A generalized other": "Un otro generalizado",
      "A peer group": "Un grupo de pares",
      "The play stage": "La etapa del juego de imitación",
      "Check the teach box: which term means a place of total control?": "Revisa el cuadro de arriba: ¿qué término significa un lugar de control total?",
      "Places where people live cut off from society under strict control, like boot camp or prison, are total institutions.": "Los lugares donde la gente vive aislada de la sociedad bajo un control estricto, como el entrenamiento militar o la cárcel, son instituciones totales.",

      [pg("18", "Daniela's old habits are gone: her hair, her clothes, her sleep schedule, even how she talks to adults (\"Yes, Drill Sergeant!\").") + "What process is this?"]:
        pgEs("18", "Los viejos hábitos de Daniela desaparecieron: su pelo, su ropa, su horario de sueño, hasta cómo les habla a los adultos (\"¡Sí, mi sargento!\").") + "¿Qué proceso es este?",
      "Resocialization": "Resocialización",
      "Preconventional morality": "Moral preconvencional",
      "Culture shock": "Choque cultural",
      "Old roles are stripped away and new ones replace them.": "Le quitan los roles de antes y otros nuevos los reemplazan.",
      "Removing old habits and replacing them with new norms is resocialization.": "Quitar los hábitos de antes y reemplazarlos con normas nuevas es resocialización.",

      [pg("27", "Daniela becomes a nurse. She learns hospital rules, medical words, and how to calm scared patients.") + "What does this page show?"]:
        pgEs("27", "Daniela se hace enfermera. Aprende las reglas del hospital, palabras médicas y cómo calmar a pacientes asustados.") + "¿Qué muestra esta página?",
      "Socialization keeps going all through life": "La socialización sigue durante toda la vida",
      "Socialization ends when you finish school": "La socialización termina cuando sales del liceo",
      "Only family can teach adults new norms": "Solo la familia les enseña normas a los adultos",
      "Adults can't learn new roles or rules": "Los adultos no pueden aprender roles ni reglas",
      "She's an adult and still learning new norms.": "Es adulta y todavía está aprendiendo normas nuevas.",
      "Socialization is lifelong. Every new job or group teaches new norms and roles.": "La socialización dura toda la vida. Cada trabajo o grupo nuevo enseña normas y roles nuevos.",

      [pg("31", "A manager tells Daniela to skip a safety check to save time. She refuses and reports it, even though she could lose her job. \"Patients' safety matters more.\"") + "Which Kohlberg level is this?"]:
        pgEs("31", "Un jefe le dice a Daniela que se salte una revisión de seguridad para ahorrar tiempo. Ella se niega y lo reporta, aunque podría perder su trabajo. \"La seguridad de los pacientes importa más.\"") + "¿Qué nivel de Kohlberg es este?",
      "Postconventional, her own principles": "Posconvencional, sus propios principios",
      "Conventional, following rules to fit in": "Convencional, seguir reglas para encajar",
      "Play stage, copying her manager": "Juego de imitación, copiar a su jefe",
      "She's going AGAINST her boss and risking punishment. Why?": "Está yendo EN CONTRA de su jefe y arriesgándose a un castigo. ¿Por qué?",
      "Acting on your own principles, even when it costs you, is the postconventional level.": "Actuar según tus propios principios, aunque te cueste, es el nivel posconvencional.",

      // ---------- Finale ----------
      "Who Taught Daniela?": "¿Quién le enseñó a Daniela?",
      "But every agent (family, peers, school, and media) shaped her at some point. That's socialization.": "Pero todos los agentes (familia, pares, escuela y medios) la formaron en algún momento. Eso es la socialización.",
      "Answer both in 1–2 full sentences, using Daniela's life.": "Responde las dos preguntas en 1–2 oraciones completas, usando la vida de Daniela.",
      "1. Which agent of socialization shaped Daniela most as a kid? Give one example from her life.": "1. ¿Qué agente de socialización formó más a Daniela cuando era niña? Da un ejemplo de su vida.",
      "The agent that shaped Daniela most as a kid was ___. For example, ___.": "El agente que más formó a Daniela de niña fue ___. Por ejemplo, ___.",
      "2. Pick one moment from Daniela's life that shows Mead's or Kohlberg's idea. Explain how.": "2. Escoge un momento de la vida de Daniela que muestre una idea de Mead o de Kohlberg. Explica cómo.",
      "When Daniela ___, it shows ___ because ___.": "Cuando Daniela ___, eso muestra ___ porque ___.",
      "Agent that shaped Daniela most as a kid": "El agente que más formó a Daniela de niña",
      "A Mead or Kohlberg moment in Daniela's life": "Un momento de Mead o Kohlberg en la vida de Daniela",
      "In answer 1, name the agent (family, peers, school, or media) AND give an example from Daniela's life.": "En la respuesta 1, nombra el agente (familia, pares, escuela o medios) Y da un ejemplo de la vida de Daniela.",
      "In answer 2, name Mead's idea (play stage, game stage, self) or a Kohlberg level AND explain why (use \"because\").": "En la respuesta 2, nombra una idea de Mead (juego de imitación, juego organizado, el yo) o un nivel de Kohlberg Y explica por qué (usa \"porque\")."
    },
    patterns: [
      { re: /^In your version of Daniela's life, the loudest influence was: (.+)\.$/, es: "En tu versión de la vida de Daniela, la influencia más fuerte fue: $1.", tr: [1] }
    ],
    writing: {
      kid: [
        ["familia", "abuel", "mama", "papa", "pares", "amig", "compañer", "vecin", "escuela", "maestr", "profe", "medios", "comiquita", "caricatura", "tele", "programa"],
        ["ejemplo", "porque", "cuando", "como", "enseñ", "aprend"]
      ],
      mead: [
        ["juego", "generalizado", "el yo", "imitacion", "organizado", "preconvencional", "convencional", "posconvencional", "postconvencional", "kohlberg", "mead"],
        ["porque", "ya que", "muestra", "demuestra", "pues"]
      ]
    }
  });
})();
