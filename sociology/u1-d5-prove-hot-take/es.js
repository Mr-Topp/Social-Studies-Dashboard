// Spanish for "How Can You Prove a Hot Take?" (Sociology Unit 1 Day 5). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same little HTML builders the page uses, so the keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const ev = (who, body) => `<span class="ev"><span class="who">${who}</span>${body}</span>`;
  const post = (handle, body, stats) => `<div class="post"><div class="ph"><span class="av">${handle[1].toUpperCase()}</span><b>${handle}</b></div><div class="pb">${body}</div><div class="ps">${stats}</div></div>`;

  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "Hot Take Lab | Sociology Unit 1 Day 5": "Laboratorio de opiniones polémicas | Sociología Unidad 1 Día 5",
      "Sociology · Unit 1 · Day 5": "Sociología · Unidad 1 · Día 5",
      "How Can You Prove a Hot Take?": "¿Cómo puedes probar una opinión polémica?",
      "Analyze the components of a sociological investigation.": "Analizar las partes de una investigación sociológica.",
      "Goal:": "Meta:",
      "Turn a claim into a testable hypothesis, design a fair study, and tell correlation from causation. · About 25 minutes.": "Convertir una afirmación en una hipótesis que se pueda comprobar, diseñar un estudio justo y distinguir la correlación de la causalidad. · Unos 25 minutos.",
      "Proof meter:": "Medidor de pruebas:",
      "Progress and proof meter": "Progreso y medidor de pruebas",

      // ---------- Intro ----------
      "Open the lab": "Abrir el laboratorio",
      "Hot Take Lab": "Laboratorio de opiniones polémicas",
      "Don't argue. Test it.": "No discutas. Ponlo a prueba.",
      "phones are literally making every teen lonely. no debate. 🔥": "los celulares literalmente están dejando solos a todos los chamos. no hay debate. 🔥",
      "2.1M views · 48K comments": "2.1M vistas · 48K comentarios",
      "The comments are a war. Half say it's true. Half say it's fake. Nobody has <b>evidence</b>.":
        "Los comentarios son una guerra. La mitad dice que es verdad. La otra mitad dice que es falso. Nadie tiene <b>evidencia</b>.",
      "You run a small teen research lab. Your job: turn this hot take into a real study. Your choices change the <b>Proof meter</b> at the top. Strong studies = strong proof.":
        "Diriges un pequeño laboratorio de investigación hecho por jóvenes. Tu trabajo: convertir esta opinión polémica (hot take) en un estudio de verdad. Tus decisiones cambian el <b>Medidor de pruebas</b> de arriba. Estudios fuertes = pruebas fuertes.",
      "1. Turn the hot take into something you can test.": "1. Convierte la opinión polémica en algo que puedas comprobar.",
      "2. Design your study and see your results.": "2. Diseña tu estudio y mira tus resultados.",
      "3. Read the results without getting fooled. Then write 2 short answers.": "3. Lee los resultados sin dejarte engañar. Luego escribe 2 respuestas cortas.",

      // ---------- Part 1 ----------
      "Part 1 of 3": "Parte 1 de 3",
      "From Hot Take to Hypothesis": "De opinión polémica a hipótesis",
      [`<p>Sociologists use the <b>scientific method</b>: a step-by-step way to answer questions with <b>evidence</b>, not opinion.</p>
        <p>Steps: ask a question → do <b>background research</b> → write a <b>hypothesis</b> → collect data → analyze it → <b>share</b> it so others can check.</p>
        <p>A <b>hypothesis</b> is a testable prediction. It must be <b>testable</b> (you can collect data on it) and <b>falsifiable</b> (the data could prove it wrong).</p>`]:
        `<p>Los sociólogos usan el <b>método científico (scientific method)</b>: una forma de responder preguntas paso a paso con <b>evidencia (evidence)</b>, no con opiniones.</p>
        <p>Pasos: haz una pregunta → haz una <b>investigación previa (background research)</b> → escribe una <b>hipótesis (hypothesis)</b> → reúne datos → analízalos → <b>compártelos (share)</b> para que otros los puedan revisar.</p>
        <p>Una <b>hipótesis</b> es una predicción que se puede poner a prueba. Tiene que ser <b>comprobable (testable)</b>: puedes reunir datos sobre ella. Y tiene que ser <b>falsable (falsifiable)</b>: los datos podrían demostrar que está equivocada.</p>`,

      [ev("Four ways to say it", "Your lab rewrites Tay's post four ways.") + "Which version is a testable hypothesis?"]:
        ev("Cuatro formas de decirlo", "Tu laboratorio reescribe la publicación de Tay de cuatro formas.") + "¿Cuál versión es una hipótesis comprobable?",
      "Teens on phones 5+ hours a day feel lonelier than other teens": "Los jóvenes que usan el celular 5+ horas al día se sienten más solos que los demás",
      "Phones are ruining this whole generation, and that's a fact": "Los celulares están arruinando a toda esta generación, y eso es un hecho",
      "Teens should put their phones away more than they do now": "Los jóvenes deberían guardar el celular más de lo que lo guardan ahora",
      "Loneliness is a feeling, so nobody could ever measure it": "La soledad es un sentimiento, así que nadie podría medirla nunca",
      "Which one could you check by collecting data from real teens?": "¿Cuál podrías comprobar reuniendo datos de jóvenes reales?",
      "It names who to compare (5+ hours vs. less) and what to measure (loneliness). You could collect data on it, and the data could prove it wrong.":
        "Dice a quiénes comparar (5+ horas vs. menos) y qué medir (la soledad). Podrías reunir datos sobre eso, y los datos podrían demostrar que está equivocada.",

      [post("@realtalk_tay", "if ur study says phones DON'T make teens lonely then ur study is fake lol", "replying to your lab") + "What's wrong with Tay's rule?"]:
        post("@realtalk_tay", "si tu estudio dice que los celulares NO dejan solos a los chamos entonces tu estudio es falso jaja", "respondiendo a tu laboratorio") + "¿Qué tiene de malo la regla de Tay?",
      "A real hypothesis has to be able to be proven wrong": "Una hipótesis real tiene que poder demostrarse falsa",
      "A real hypothesis has to be agreed on by most people": "Una hipótesis real tiene que ser aceptada por casi todos",
      "A real hypothesis has to come from a famous scientist": "Una hipótesis real tiene que venir de un científico famoso",
      "A real hypothesis has to be about something online": "Una hipótesis real tiene que tratar sobre algo de internet",
      "Reread the teach box: what does falsifiable mean?": "Vuelve a leer el cuadro de la lección: ¿qué significa falsable?",
      "If no result could ever prove Tay wrong, it's not science. A hypothesis has to be falsifiable.":
        "Si ningún resultado pudiera demostrar que Tay está equivocada, no es ciencia. Una hipótesis tiene que ser falsable.",

      [ev("Your lab's to-do list", "1. Ask a question ✓<br>2. ???<br>3. Write a hypothesis<br>4. Collect data<br>5. Analyze<br>6. Share") + "What goes in step 2?"]:
        ev("Lista de tareas de tu laboratorio", "1. Hacer una pregunta ✓<br>2. ???<br>3. Escribir una hipótesis<br>4. Reunir datos<br>5. Analizar<br>6. Compartir") + "¿Qué va en el paso 2?",
      "Background research": "Investigación previa",
      "Publish the results": "Publicar los resultados",
      "Analyze the data": "Analizar los datos",
      "Pick a control group": "Escoger un grupo de control",
      "Look at the order of steps in the teach box.": "Mira el orden de los pasos en el cuadro de la lección.",
      "Before you predict anything, you find out what other researchers already learned. That's background research.":
        "Antes de predecir algo, averiguas lo que otros investigadores ya aprendieron. Eso es la investigación previa.",

      [`<p><b>Your lab partner Marco:</b> "Do we really need to read old studies? Let's just start."</p>`]:
        `<p><b>Tu compañero de laboratorio, Marco:</b> "¿De verdad tenemos que leer estudios viejos? Empecemos de una".</p>`,
      "Read what other researchers already found first": "Leer primero lo que otros investigadores ya descubrieron",
      "Skip it. Our gut feeling is good enough.": "Saltarlo. Nuestra intuición es suficiente.",
      "Ask the comment section what they think": "Preguntarle a la sección de comentarios qué piensa",
      [`<p>${T("up", "+1 proof")}You find studies that say the link is real but small, and that it depends on HOW teens use phones. Now your study can build on them.</p>`]:
        `<p>${T("up", "+1 prueba")}Encuentras estudios que dicen que la relación es real pero pequeña, y que depende de CÓMO los jóvenes usan el celular. Ahora tu estudio puede construir sobre ellos.</p>`,
      [`<p>${T("down", "−1 proof")}You start fast, but you repeat mistakes other researchers already fixed.</p>`]:
        `<p>${T("down", "−1 prueba")}Empiezas rápido, pero repites errores que otros investigadores ya corrigieron.</p>`,
      [`<p>${T("flat", "No change")}You get 300 replies and zero data. Opinions are not research.</p>`]:
        `<p>${T("flat", "Sin cambio")}Recibes 300 respuestas y cero datos. Las opiniones no son investigación.</p>`,

      [ev("Two survey questions", "<b>A:</b> \"From 0 to 10, how lonely do you feel this week?\"<br><b>B:</b> \"Tell me about a time this week you felt alone.\"") + "Which one collects <b>quantitative</b> data, and why?"]:
        ev("Dos preguntas de encuesta", "<b>A:</b> \"Del 0 al 10, ¿qué tan solo te sientes esta semana?\"<br><b>B:</b> \"Cuéntame de un momento de esta semana en que te sentiste solo.\"") + "¿Cuál reúne datos <b>cuantitativos (quantitative)</b>, y por qué?",
      "A, because it turns feelings into numbers to compare": "A, porque convierte los sentimientos en números para comparar",
      "B, because it lets people describe what happened": "B, porque deja que la gente describa lo que pasó",
      "A, because it asks about feelings instead of facts": "A, porque pregunta por sentimientos en vez de hechos",
      "B, because longer answers give more numbers": "B, porque las respuestas largas dan más números",
      "Quantitative sounds like quantity. Which answer will be a number?": "Cuantitativo suena como cantidad. ¿Cuál respuesta será un número?",
      "Quantitative data is numbers. Question B collects qualitative data: descriptions and experiences.":
        "Los datos cuantitativos son números. La pregunta B reúne datos cualitativos (qualitative): descripciones y experiencias.",

      // ---------- Part 2 ----------
      "Part 2 of 3": "Parte 2 de 3",
      "Design the Study": "Diseña el estudio",
      [`<p>The <b>independent variable (IV)</b> is what you change. The <b>dependent variable (DV)</b> is what you measure.</p>
        <p>The <b>experimental group</b> gets the change. The <b>control group</b> doesn't. It's the comparison group.</p>
        <p>Your <b>sample</b> is the people you study. A <b>random sample</b> from many places is fairer than just people you know.</p>`]:
        `<p>La <b>variable independiente (independent variable, IV)</b> es lo que tú cambias. La <b>variable dependiente (dependent variable, DV)</b> es lo que mides.</p>
        <p>El <b>grupo experimental (experimental group)</b> recibe el cambio. El <b>grupo de control (control group)</b> no. Es el grupo con el que comparas.</p>
        <p>Tu <b>muestra (sample)</b> son las personas que estudias. Una <b>muestra aleatoria (random sample)</b> de muchos lugares es más justa que solo gente que conoces.</p>`,
      [ev("Your study plan", "For 2 weeks, teens <b>delete their social media apps</b>. Before and after, they take a survey that gives a <b>loneliness score</b> from 0 to 10.")]:
        ev("El plan de tu estudio", "Durante 2 semanas, los jóvenes <b>borran sus apps de redes sociales</b>. Antes y después, responden una encuesta que da un <b>puntaje de soledad</b> del 0 al 10."),

      "In your plan, what is the <b>independent variable</b> (the thing you change)?": "En tu plan, ¿cuál es la <b>variable independiente</b> (lo que tú cambias)?",
      "Whether teens delete their social apps": "Si los jóvenes borran o no sus apps sociales",
      "How lonely teens say they feel": "Qué tan solos dicen sentirse los jóvenes",
      "The survey used to ask about loneliness": "La encuesta que pregunta sobre la soledad",
      "The two weeks the study takes": "Las dos semanas que dura el estudio",
      "Look at the plan. What do the researchers make teens do differently?": "Mira el plan. ¿Qué les piden los investigadores a los jóvenes que hagan distinto?",
      "Deleting the apps is the change. That's the IV.": "Borrar las apps es el cambio. Esa es la variable independiente.",

      "What is the <b>dependent variable</b> (the thing you measure)?": "¿Cuál es la <b>variable dependiente</b> (lo que mides)?",
      "The loneliness scores on the survey": "Los puntajes de soledad en la encuesta",
      "Deleting the social media apps": "Borrar las apps de redes sociales",
      "The number of teens in the study": "La cantidad de jóvenes en el estudio",
      "Which phones the teens own": "Qué celulares tienen los jóvenes",
      "What number does the survey give you at the end?": "¿Qué número te da la encuesta al final?",
      "You measure loneliness to see if it changes. That's the DV.": "Mides la soledad para ver si cambia. Esa es la variable dependiente.",

      [`<p><b>Who is in your study?</b> Pick your sample.</p>`]: `<p><b>¿Quién está en tu estudio?</b> Escoge tu muestra.</p>`,
      "6 of your closest friends": "6 de tus amigos más cercanos",
      "240 students picked at random from 4 schools": "240 estudiantes escogidos al azar en 4 liceos",
      "1,000 people who liked Tay's post": "1,000 personas que le dieron like a la publicación de Tay",
      [`<p>${T("down", "−2 proof")}Easy to set up. But 6 friends who are all alike can't speak for all teens.</p>`]:
        `<p>${T("down", "−2 pruebas")}Es fácil de organizar. Pero 6 amigos que se parecen mucho no pueden hablar por todos los jóvenes.</p>`,
      [`<p>${T("up", "+3 proof")}More work, but a random sample from different schools looks more like teens in general.</p>`]:
        `<p>${T("up", "+3 pruebas")}Da más trabajo, pero una muestra aleatoria de distintos liceos se parece más a los jóvenes en general.</p>`,
      [`<p>${T("down", "−1 proof")}A huge group, but they already agree with the hot take. That's a biased sample.</p>`]:
        `<p>${T("down", "−1 prueba")}Es un grupo enorme, pero ya están de acuerdo con la opinión polémica. Esa es una muestra sesgada (biased sample).</p>`,

      [`<p><b>Marco:</b> "Should some teens keep their apps, so we can compare?"</p>`]:
        `<p><b>Marco:</b> "¿Y si algunos jóvenes se quedan con sus apps, para poder comparar?"</p>`,
      "Yes. Split them at random: half delete, half keep.": "Sí. Dividirlos al azar: la mitad borra, la otra mitad no.",
      "No. Everyone deletes. Just compare before and after.": "No. Todos borran. Solo comparar el antes y el después.",
      "Yes, but let each teen choose their group.": "Sí, pero dejar que cada joven escoja su grupo.",
      [`<p>${T("up", "+3 proof")}Now you have a real control group. Random splitting keeps the two groups alike.</p>`]:
        `<p>${T("up", "+3 pruebas")}Ahora tienes un grupo de control real. Dividir al azar hace que los dos grupos se parezcan.</p>`,
      [`<p>${T("down", "−1 proof")}Simpler, but with nothing to compare to, you won't know what caused any change.</p>`]:
        `<p>${T("down", "−1 prueba")}Es más sencillo, pero sin nada con qué comparar, no vas a saber qué causó algún cambio.</p>`,
      [`<p>${T("up", "+1 proof")}Better than nothing. But people who choose to delete may already be different from people who don't.</p>`]:
        `<p>${T("up", "+1 prueba")}Es mejor que nada. Pero puede que la gente que decide borrar ya fuera distinta de la que no borra.</p>`,

      [ev("Random-split plan", "Group A deletes their social apps for 2 weeks.<br>Group B keeps using their apps like normal.") + "Which group is the <b>control group</b>?"]:
        ev("Plan con división al azar", "El grupo A borra sus apps sociales por 2 semanas.<br>El grupo B sigue usando sus apps como siempre.") + "¿Cuál es el <b>grupo de control</b>?",
      "Group B, which keeps the apps like normal": "El grupo B, que sigue con las apps como siempre",
      "Group A, which deletes the social apps": "El grupo A, que borra las apps sociales",
      "The teens who drop out of the study early": "Los jóvenes que se salen temprano del estudio",
      "The researchers who score the surveys": "Los investigadores que califican las encuestas",
      "The control group is the one that does NOT get the change.": "El grupo de control es el que NO recibe el cambio.",
      "Group B doesn't get the change, so it's the comparison group.": "El grupo B no recibe el cambio, así que es el grupo con el que se compara.",

      [post("@coachdre", "kids who eat breakfast get better grades. facts.", "340K views") + "If you tested this, what is the <b>dependent variable</b>?"]:
        post("@coachdre", "los chamos que desayunan sacan mejores notas. es un hecho.", "340K vistas") + "Si pusieras esto a prueba, ¿cuál sería la <b>variable dependiente</b>?",
      "Students' grades": "Las notas de los estudiantes",
      "Eating breakfast": "Desayunar",
      "The school lunch menu": "El menú del almuerzo del liceo",
      "What time kids wake up": "A qué hora se despiertan",
      "Which one would you measure to see if it changed?": "¿Cuál medirías para ver si cambió?",
      "You'd change (or compare) breakfast and measure grades. Grades are the DV.": "Cambiarías (o compararías) el desayuno y medirías las notas. Las notas son la variable dependiente.",

      // ---------- Part 3 ----------
      "Part 3 of 3": "Parte 3 de 3",
      "Read the Results (Don't Get Played)": "Lee los resultados (que no te engañen)",
      [`<p><b>Correlation</b> means two things go up or down together. It does <b>not</b> prove one causes the other.</p>
        <p><b>Causation</b> means one thing directly causes the other. Sometimes a hidden <b>third variable</b> causes both.</p>
        <p><b>Bias</b> is anything that tilts a study toward one answer, like who paid for it or who was picked.</p>`]:
        `<p>La <b>correlación (correlation)</b> significa que dos cosas suben o bajan juntas. <b>No</b> prueba que una cause la otra.</p>
        <p>La <b>causalidad (causation)</b> significa que una cosa causa directamente la otra. A veces una <b>tercera variable (third variable)</b> escondida causa las dos.</p>
        <p>El <b>sesgo (bias)</b> es cualquier cosa que inclina un estudio hacia una respuesta, como quién lo pagó o a quién escogieron.</p>`,

      // Lab report (built from your choices)
      "Lab report": "Informe del laboratorio",
      "Your results are in": "Ya tienes tus resultados",
      "Who you studied: 6 of your friends. Average loneliness score (0 = not lonely, 10 = very lonely). Results are made up for this lab.":
        "A quién estudiaste: 6 de tus amigos. Puntaje promedio de soledad (0 = nada solo, 10 = muy solo). Los resultados son inventados para este laboratorio.",
      "Who you studied: 1,000 people who liked the post. Average loneliness score (0 = not lonely, 10 = very lonely). Results are made up for this lab.":
        "A quién estudiaste: 1,000 personas que le dieron like a la publicación. Puntaje promedio de soledad (0 = nada solo, 10 = muy solo). Los resultados son inventados para este laboratorio.",
      "Who you studied: 240 random students, 4 schools. Average loneliness score (0 = not lonely, 10 = very lonely). Results are made up for this lab.":
        "A quién estudiaste: 240 estudiantes al azar, 4 liceos. Puntaje promedio de soledad (0 = nada solo, 10 = muy solo). Los resultados son inventados para este laboratorio.",
      "Deleted apps": "Borraron las apps",
      "Kept apps (control)": "Se quedaron con las apps (control)",
      "Chose to delete": "Decidieron borrar",
      "Chose to keep": "Decidieron quedarse",
      "Before": "Antes",
      "After deleting": "Después de borrar",
      [`${T("down", "Weak")} <b>Tiny sample.</b> With only 6 people, one person's bad week can swing the whole result. And your friends are not like all teens.`]:
        `${T("down", "Débil")} <b>Muestra muy pequeña.</b> Con solo 6 personas, la mala semana de una sola persona puede cambiar todo el resultado. Y tus amigos no son como todos los jóvenes.`,
      [`${T("down", "Weak")} <b>Biased sample.</b> These people already agreed with the hot take before the study started. Big is not the same as fair.`]:
        `${T("down", "Débil")} <b>Muestra sesgada.</b> Estas personas ya estaban de acuerdo con la opinión polémica antes de empezar el estudio. Grande no es lo mismo que justa.`,
      [`${T("up", "Strong")} <b>Random sample.</b> Picking at random from different schools makes your group more like teens in general.`]:
        `${T("up", "Fuerte")} <b>Muestra aleatoria.</b> Escoger al azar en distintos liceos hace que tu grupo se parezca más a los jóvenes en general.`,
      [`${T("up", "Strong")} <b>Random control group.</b> Both groups lived through the same two weeks, so the main difference was the apps.`]:
        `${T("up", "Fuerte")} <b>Grupo de control al azar.</b> Los dos grupos vivieron las mismas dos semanas, así que la diferencia principal fueron las apps.`,
      [`${T("flat", "Mixed")} <b>Teens picked their own group.</b> The ones who chose to delete may have been less lonely to start with. That's a hidden difference.`]:
        `${T("flat", "Regular")} <b>Los jóvenes escogieron su propio grupo.</b> Los que decidieron borrar quizás ya se sentían menos solos desde el principio. Esa es una diferencia escondida.`,
      [`${T("down", "Weak")} <b>No control group.</b> Loneliness went down, but finals also ended that week. Without a comparison group, you can't tell what caused the drop.`]:
        `${T("down", "Débil")} <b>Sin grupo de control.</b> La soledad bajó, pero esa semana también terminaron los exámenes finales. Sin un grupo para comparar, no puedes saber qué causó la bajada.`,

      [ev("Summer data", "In summer, ice cream sales go up. Drownings go up too.") + "What best explains this?"]:
        ev("Datos del verano", "En verano suben las ventas de helado. También suben los ahogamientos.") + "¿Qué lo explica mejor?",
      "Hot weather drives both of them up": "El calor hace que las dos cosas suban",
      "Eating ice cream makes people drown": "Comer helado hace que la gente se ahogue",
      "Drownings make people buy ice cream": "Los ahogamientos hacen que la gente compre helado",
      "It proves ice cream is dangerous": "Prueba que el helado es peligroso",
      "What else happens in summer that could cause both?": "¿Qué más pasa en verano que podría causar las dos cosas?",
      "Hot weather is a third variable. More people swim AND more people buy ice cream. Correlation isn't causation.":
        "El calor es una tercera variable. Más gente nada Y más gente compra helado. Correlación no es causalidad.",

      [ev("A different study (survey only)", "Teens who feel lonely spend more hours on their phones.") + "Which conclusion is correct?"]:
        ev("Otro estudio (solo una encuesta)", "Los jóvenes que se sienten solos pasan más horas en el celular.") + "¿Cuál conclusión es correcta?",
      "Phone time and loneliness are linked, but cause isn't proven": "El celular y la soledad están relacionados, pero la causa no está probada",
      "Phones cause loneliness, so the hot take was right all along": "Los celulares causan soledad, así que la opinión polémica siempre tuvo razón",
      "Loneliness causes phone use, so the hot take is backwards": "La soledad causa el uso del celular, así que la opinión polémica está al revés",
      "The two have nothing to do with each other at all": "Las dos cosas no tienen absolutamente nada que ver entre sí",
      "Did this study change anything, or just find two things that go together?": "¿Este estudio cambió algo, o solo encontró dos cosas que van juntas?",
      "A survey can show a correlation. Lonely teens might use phones more, or phones might add loneliness, or something else causes both.":
        "Una encuesta puede mostrar una correlación. Puede que los jóvenes solos usen más el celular, o que el celular aumente la soledad, o que otra cosa cause las dos.",

      [`<p><b>A news site wants a quote for its headline.</b> What do you send?</p>`]:
        `<p><b>Una página de noticias quiere una cita para su titular.</b> ¿Qué le mandas?</p>`,
      "\"Phones CAUSE loneliness. Science proves it!\"": "\"Los celulares CAUSAN soledad. ¡La ciencia lo prueba!\"",
      "\"In our study, quitting apps was linked to less loneliness. More studies are needed.\"": "\"En nuestro estudio, dejar las apps se relacionó con menos soledad. Hacen falta más estudios.\"",
      "Say nothing until you're 100% sure": "No decir nada hasta estar 100% seguro",
      [`<p>${T("down", "−3 proof")}The headline goes viral. Then other researchers point out one study can't prove that much. Your lab looks careless.</p>`]:
        `<p>${T("down", "−3 pruebas")}El titular se hace viral. Luego otros investigadores señalan que un solo estudio no puede probar tanto. Tu laboratorio queda como poco serio.</p>`,
      [`<p>${T("up", "+2 proof")}Less flashy, but true. Other labs start running the same test to check you.</p>`]:
        `<p>${T("up", "+2 pruebas")}Menos llamativo, pero cierto. Otros laboratorios empiezan a hacer la misma prueba para revisar tu trabajo.</p>`,
      [`<p>${T("down", "−1 proof")}Science is almost never 100% sure. If you never share, nobody can check or build on your work.</p>`]:
        `<p>${T("down", "−1 prueba")}La ciencia casi nunca está 100% segura. Si nunca compartes, nadie puede revisar tu trabajo ni construir sobre él.</p>`,

      [ev("Fine print on another study", "This study was paid for by a company that sells a $9.99 \"phone detox\" app.") + "What should make you careful about this study?"]:
        ev("La letra pequeña de otro estudio", "Este estudio lo pagó una empresa que vende una app de \"desintoxicación del celular\" de $9.99.") + "¿Qué debería hacerte tener cuidado con este estudio?",
      "Bias, since the payer wants a certain result": "Sesgo, porque quien paga quiere cierto resultado",
      "Correlation, since two things went up together": "Correlación, porque dos cosas subieron juntas",
      "Control group, since nobody kept their phones": "Grupo de control, porque nadie se quedó con el celular",
      "Qualitative data, since it used no numbers": "Datos cualitativos, porque no usó números",
      "Who paid, and what do they sell?": "¿Quién pagó, y qué vende?",
      "The company makes money if phones look bad. That's a possible bias, so you'd want other studies to check it.":
        "La empresa gana plata si los celulares quedan mal. Ese es un posible sesgo, así que querrías que otros estudios lo revisaran.",

      [ev("Last step of the scientific method", "Share / publish: explain what you did and what you found.") + "Why do researchers share HOW they did a study, not just the results?"]:
        ev("Último paso del método científico", "Compartir / publicar: explicar lo que hiciste y lo que encontraste.") + "¿Por qué los investigadores comparten CÓMO hicieron un estudio, y no solo los resultados?",
      "So others can check it and try it again": "Para que otros lo revisen y lo vuelvan a hacer",
      "So the researchers can get famous online": "Para que los investigadores se hagan famosos en internet",
      "So nobody else needs to study it again": "Para que nadie más tenga que volver a estudiarlo",
      "So the study can never be proven wrong": "Para que nunca se pueda demostrar que el estudio está mal",
      "What can other labs do once they know your exact steps?": "¿Qué pueden hacer otros laboratorios cuando conocen tus pasos exactos?",
      "Sharing methods lets others check your work and repeat the study. If they get the same result, the evidence gets stronger.":
        "Compartir los métodos deja que otros revisen tu trabajo y repitan el estudio. Si obtienen el mismo resultado, la evidencia se hace más fuerte.",

      // ---------- Finale ----------
      "Write Your Own Hypothesis": "Escribe tu propia hipótesis",
      "Strong study. Random sample, a control group, and careful claims make proof hard to argue with.":
        "Estudio fuerte. Una muestra aleatoria, un grupo de control y afirmaciones cuidadosas hacen que las pruebas sean difíciles de discutir.",
      "Decent study, with some weak spots. Look back at your sample, control group, and headline.":
        "Estudio aceptable, con algunos puntos débiles. Revisa otra vez tu muestra, tu grupo de control y tu titular.",
      "Weak proof. A small or biased sample, no fair comparison, or a big claim can sink a study.":
        "Pruebas débiles. Una muestra pequeña o sesgada, no tener una comparación justa o una afirmación exagerada pueden hundir un estudio.",
      "Answer both in 1–2 full sentences.": "Responde las dos con 1–2 oraciones completas.",
      "1. Pick your OWN hot take (about school, sports, music, food, anything). Turn it into a testable hypothesis and name the independent and dependent variables.":
        "1. Escoge TU PROPIA opinión polémica (sobre el liceo, deportes, música, comida, lo que sea). Conviértela en una hipótesis comprobable y nombra la variable independiente y la variable dependiente.",
      "My hot take: ___. Hypothesis: ___. The independent variable is ___ and the dependent variable is ___.":
        "Mi opinión polémica: ___. Hipótesis: ___. La variable independiente es ___ y la variable dependiente es ___.",
      "In answer 1, name the independent variable (what you change) AND the dependent variable (what you measure).":
        "En la respuesta 1, nombra la variable independiente (lo que cambias) Y la variable dependiente (lo que mides).",
      "2. Explain one choice you made today that made your evidence stronger or weaker.":
        "2. Explica una decisión que tomaste hoy que hizo tu evidencia más fuerte o más débil.",
      "My evidence got stronger/weaker when I ___ because ___.": "Mi evidencia se hizo más fuerte/más débil cuando ___ porque ___.",
      "In answer 2, name the choice (sample, control group, headline, or research) AND explain why (use \"because\").":
        "En la respuesta 2, nombra la decisión (muestra, grupo de control, titular o investigación) Y explica por qué (usa \"porque\").",

      // ---------- Short names (shown in "Next:", "✓" and writing messages) ----------
      "My hot take as a hypothesis": "Mi opinión polémica como hipótesis",
      "A choice that changed my proof": "Una decisión que cambió mis pruebas"
    },
    patterns: [
      { re: /^Your Proof meter ended at (\d+)\/10\.$/, es: "Tu Medidor de pruebas terminó en $1/10." }
    ],
    writing: {
      hyp: [
        ["independiente", "vi", "cambi"],
        ["dependiente", "vd", "mid", "medi"]
      ],
      design: [
        ["muestra", "aleatori", "azar", "amig", "pana", "control", "grupo", "sesg", "correlaci", "causa", "titular", "investigaci", "compar", "estudio"],
        ["porque", "ya que", "pues", "asi que", "por eso", "debido"]
      ]
    }
  });
})();
