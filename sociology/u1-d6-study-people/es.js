// Spanish for "How Should We Study People?" (Sociology Unit 1 Day 6). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same little HTML builders the page uses, so the keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const ev = (who, body) => `<span class="ev"><span class="who">${who}</span>${body}</span>`;
  const client = (who, ask) => `<span class="ev client"><span class="who">📋 New client · ${who}</span>"${ask}"</span>`;
  const cliente = (who, ask) => `<span class="ev client"><span class="who">📋 Cliente nuevo · ${who}</span>"${ask}"</span>`;

  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "Research Agency | Sociology Unit 1 Day 6": "Agencia de investigación | Sociología Unidad 1 Día 6",
      "Sociology · Unit 1 · Day 6": "Sociología · Unidad 1 · Día 6",
      "How Should We Study People?": "¿Cómo debemos estudiar a las personas?",
      "Analyze the components of a sociological investigation.": "Analizar las partes de una investigación sociológica.",
      "Goal:": "Meta:",
      "Pick the right research method for a question, explain its tradeoffs, and spot ethics problems. · About 25 minutes.":
        "Escoger el método de investigación correcto para una pregunta, explicar sus ventajas y desventajas, y detectar problemas de ética. · Unos 25 minutos.",
      "Progress, days, and trust": "Progreso, días y confianza",
      "📅 Days left:": "📅 Días que quedan:",
      "Trust:": "Confianza:",

      // ---------- Intro ----------
      "Clock in": "Marcar entrada",
      "Day one on the job": "Primer día de trabajo",
      "Welcome to Cedar River Research Co.": "Bienvenido a Cedar River Research Co.",
      "You just got hired at a small research company. Schools, cities, and businesses bring you questions about <b>people</b>. You pick how to study them.":
        "Te acaban de contratar en una pequeña empresa de investigación. Liceos, ciudades y negocios te traen preguntas sobre <b>personas</b>. Tú escoges cómo estudiarlas.",
      "Every method has a cost. Some take a long time. Some only give part of the story. And if you treat people badly, you lose <b>trust</b>.":
        "Cada método tiene un costo. Algunos toman mucho tiempo. Algunos solo cuentan una parte de la historia. Y si tratas mal a la gente, pierdes <b>confianza</b>.",
      "📅 You have <b>40 work days</b> this season.": "📅 Tienes <b>40 días de trabajo</b> en esta temporada.",
      "🤝 Watch your <b>Trust</b> meter. Good, ethical work raises it.": "🤝 Pendiente con tu medidor de <b>Confianza</b>. El trabajo bueno y ético lo sube.",
      "✍️ At the end, write 2 short answers and turn in.": "✍️ Al final, escribe 2 respuestas cortas y entrega.",
      "The company and clients are made up. The famous studies in Part 3 are real.": "La empresa y los clientes son inventados. Los estudios famosos de la Parte 3 son reales.",

      // ---------- Part 1 ----------
      "Part 1 of 3": "Parte 1 de 3",
      "The Toolbox": "La caja de herramientas",
      [`<p>Sociologists use six main <b>research methods</b>:</p>
        <ul><li><b>Survey</b>: the same questions to many people. Fast and big. Usually gives numbers.</li>
        <li><b>Interview</b>: one-on-one, open-ended talk. Slow but deep.</li>
        <li><b>Participant observation</b>: the researcher joins a group over time and takes notes.</li>
        <li><b>Experiment</b>: change one thing and control the rest. Best for showing <b>cause and effect</b>.</li>
        <li><b>Case study</b>: one person, group, or event in depth.</li>
        <li><b>Secondary data</b>: data someone else already collected, like the U.S. Census.</li></ul>
        <p><b>Quantitative</b> = numbers. <b>Qualitative</b> = descriptions, meanings, and experiences.</p>`]:
        `<p>Los sociólogos usan seis <b>métodos de investigación (research methods)</b> principales:</p>
        <ul><li><b>Encuesta (survey)</b>: las mismas preguntas a muchas personas. Rápida y grande. Casi siempre da números.</li>
        <li><b>Entrevista (interview)</b>: una conversación abierta, cara a cara. Lenta pero profunda.</li>
        <li><b>Observación participante (participant observation)</b>: el investigador se une a un grupo por un tiempo y toma notas.</li>
        <li><b>Experimento (experiment)</b>: cambias una cosa y controlas lo demás. Es el mejor para mostrar <b>causa y efecto (cause and effect)</b>.</li>
        <li><b>Estudio de caso (case study)</b>: una persona, un grupo o un evento, estudiado a fondo.</li>
        <li><b>Datos secundarios (secondary data)</b>: datos que otra persona ya reunió, como el Censo de EE. UU.</li></ul>
        <p><b>Cuantitativo (quantitative)</b> = números. <b>Cualitativo (qualitative)</b> = descripciones, significados y experiencias.</p>`,

      [client("A school district", "How many of our 1,200 students work a job after school?") + "Which method fits best?"]:
        cliente("Un distrito escolar", "¿Cuántos de nuestros 1,200 estudiantes trabajan después de clases?") + "¿Cuál método sirve mejor?",
      "A survey sent to every student": "Una encuesta enviada a cada estudiante",
      "A case study of one student": "Un estudio de caso de un estudiante",
      "Joining one student's work crew": "Unirte al equipo de trabajo de un estudiante",
      "One long interview with the principal": "Una entrevista larga con el director",
      "The client wants a number for a big group. Which method reaches many people fast?": "El cliente quiere un número para un grupo grande. ¿Cuál método llega rápido a muchas personas?",
      "A survey asks the same questions to lots of people and gives numbers. That's what this client needs.":
        "Una encuesta les hace las mismas preguntas a muchas personas y da números. Eso es lo que necesita este cliente.",

      [ev("Research note", "A researcher takes a job at a fast-food restaurant for 8 months. She takes notes on how workers treat each other.") + "Which method is this?"]:
        ev("Nota de investigación", "Una investigadora consigue trabajo en un restaurante de comida rápida por 8 meses. Toma notas sobre cómo se tratan los trabajadores entre ellos.") + "¿Qué método es este?",
      "Participant observation": "Observación participante",
      "Secondary data analysis": "Análisis de datos secundarios",
      "A controlled experiment": "Un experimento controlado",
      "A large-scale survey": "Una encuesta a gran escala",
      "The researcher becomes part of the group. Check the toolbox.": "La investigadora se vuelve parte del grupo. Revisa la caja de herramientas.",
      "Joining a group over time and watching from the inside is participant observation.": "Unirse a un grupo por un tiempo y observar desde adentro es observación participante.",

      [ev("Research note", "A researcher uses U.S. Census numbers to compare incomes in Iowa's 99 counties. He never talks to anyone.") + "Which method is this?"]:
        ev("Nota de investigación", "Un investigador usa números del Censo de EE. UU. para comparar los ingresos en los 99 condados de Iowa. Nunca habla con nadie.") + "¿Qué método es este?",
      "Secondary data": "Datos secundarios",
      "A case study": "Un estudio de caso",
      "An interview": "Una entrevista",
      "Who collected the numbers he's using?": "¿Quién reunió los números que él está usando?",
      "The Census Bureau already collected that data. Using existing data is secondary data.": "La Oficina del Censo ya reunió esos datos. Usar datos que ya existen es usar datos secundarios.",

      [client("A city council", "Why do so many young people move away after high school?") + `<p>Pick your method.</p>`]:
        cliente("Un concejo municipal", "¿Por qué tantos jóvenes se mudan lejos después del liceo?") + `<p>Escoge tu método.</p>`,
      "Survey 2,000 young adults (5 days)": "Encuestar a 2,000 adultos jóvenes (5 días)",
      "Long interviews with 20 people who left (12 days)": "Entrevistas largas a 20 personas que se fueron (12 días)",
      "Survey first, then interview 10 people (15 days)": "Primero encuesta, luego entrevistar a 10 personas (15 días)",
      [`<p>${T("up", "+1 trust · −5 days")}Results: 41% said jobs, 22% said college, 15% said things to do. Clear numbers. But the client asks, "What's the story behind them?" You don't know.</p>`]:
        `<p>${T("up", "+1 confianza · −5 días")}Resultados: 41% dijo trabajo, 22% dijo universidad, 15% dijo cosas que hacer. Números claros. Pero el cliente pregunta: "¿Cuál es la historia detrás de esto?". No sabes.</p>`,
      [`<p>${T("up", "+1 trust · −12 days")}Powerful stories. One said, "My mom got laid off, and I felt like there was nothing here for me." But with only 20 people, you can't say how common each reason is.</p>`]:
        `<p>${T("up", "+1 confianza · −12 días")}Historias muy fuertes. Una persona dijo: "Botaron a mi mamá del trabajo, y sentí que aquí no había nada para mí". Pero con solo 20 personas, no puedes decir qué tan común es cada razón.</p>`,
      [`<p>${T("up", "+2 trust · −15 days")}You get the numbers AND the stories behind them. The client loves it. It costs the most time, though.</p>`]:
        `<p>${T("up", "+2 confianza · −15 días")}Consigues los números Y las historias detrás de ellos. Al cliente le encanta. Pero es lo que más tiempo cuesta.</p>`,

      [ev("Two kinds of results", "<b>Survey:</b> 41% said they left for jobs.<br><b>Interview:</b> \"My mom got laid off, and I felt like there was nothing here for me.\"") + "Why might a researcher choose interviews (qualitative) over a survey?"]:
        ev("Dos tipos de resultados", "<b>Encuesta:</b> 41% dijo que se fue por trabajo.<br><b>Entrevista:</b> \"Botaron a mi mamá del trabajo, y sentí que aquí no había nada para mí.\"") + "¿Por qué un investigador escogería entrevistas (cualitativas) en vez de una encuesta?",
      "To learn the reasons behind the numbers": "Para conocer las razones detrás de los números",
      "To get answers from more people in less time": "Para tener respuestas de más gente en menos tiempo",
      "To prove that one thing causes another": "Para probar que una cosa causa otra",
      "To avoid talking with the people being studied": "Para no tener que hablar con las personas estudiadas",
      "What does the interview quote tell you that 41% doesn't?": "¿Qué te dice la cita de la entrevista que el 41% no te dice?",
      "Qualitative methods show meanings and experiences. Numbers tell you how many; interviews help explain why.":
        "Los métodos cualitativos muestran significados y experiencias. Los números te dicen cuántos; las entrevistas ayudan a explicar por qué.",

      // ---------- Part 2 ----------
      "Part 2 of 3": "Parte 2 de 3",
      "Every Method Has a Tradeoff": "Cada método tiene su desventaja",
      [`<p>A <b>tradeoff</b> is what you give up to get something.</p>
        <p><b>Surveys</b> are fast and big, but people don't always answer honestly. <b>Experiments</b> show cause and effect, but can feel fake. <b>Case studies</b> go deep, but may not apply to others. <b>Observation</b> is deep, but slow, and people may act differently when watched.</p>`]:
        `<p>Un <b>sacrificio (tradeoff)</b> es lo que dejas de lado para conseguir algo.</p>
        <p>Las <b>encuestas</b> son rápidas y grandes, pero la gente no siempre responde con honestidad. Los <b>experimentos</b> muestran causa y efecto, pero pueden sentirse falsos. Los <b>estudios de caso</b> van a fondo, pero puede que no apliquen a otros. La <b>observación</b> es profunda, pero lenta, y la gente puede actuar distinto cuando la observan.</p>`,

      [client("A tutoring app company", "Does our app actually RAISE test scores?") + "Which method fits best?"]:
        cliente("Una empresa de apps de tutoría", "¿De verdad nuestra app SUBE las notas de los exámenes?") + "¿Cuál método sirve mejor?",
      "An experiment with a control group": "Un experimento con un grupo de control",
      "A case study of one top student": "Un estudio de caso de un estudiante destacado",
      "Census data on Iowa test scores": "Datos del censo sobre notas de exámenes en Iowa",
      "Watching students at lunch for a month": "Observar a estudiantes en el almuerzo por un mes",
      "The client wants to know if the app CAUSES higher scores.": "El cliente quiere saber si la app CAUSA notas más altas.",
      "Only an experiment changes one thing (using the app) and compares to a control group. That's how you test cause and effect.":
        "Solo un experimento cambia una cosa (usar la app) y compara con un grupo de control. Así es como se pone a prueba la causa y el efecto.",

      [ev("Research note", "A researcher spends a year studying one small Iowa town after its factory closed.") + "What is the biggest weakness of this case study?"]:
        ev("Nota de investigación", "Una investigadora pasa un año estudiando un pueblito de Iowa después de que cerró su fábrica.") + "¿Cuál es la mayor debilidad de este estudio de caso?",
      "Its results may not apply to other towns": "Sus resultados quizás no apliquen a otros pueblos",
      "It can't tell us anything in real detail": "No nos puede decir nada con mucho detalle",
      "It uses too many numbers and statistics": "Usa demasiados números y estadísticas",
      "It can only study people who are online": "Solo puede estudiar a gente que está en internet",
      "It's ONE town. Would every town react the same way?": "Es UN solo pueblo. ¿Todos los pueblos reaccionarían igual?",
      "Case studies go deep on one example, but that example may not represent others.": "Los estudios de caso van a fondo en un ejemplo, pero ese ejemplo puede que no represente a los demás.",

      [client("A parks department", "The skaters at Riverside Park seem to have their own rules. What are they?") + `<p>You'll use participant observation. How do you join the group?</p>`]:
        cliente("Un departamento de parques", "Parece que los patinadores de Riverside Park tienen sus propias reglas. ¿Cuáles son?") + `<p>Vas a usar observación participante. ¿Cómo te unes al grupo?</p>`,
      "Tell them you're a researcher and ask if it's OK (10 days)": "Decirles que eres investigador y preguntar si está bien (10 días)",
      "Go undercover. Just pretend to be a skater (8 days).": "Ir encubierto. Solo hacerte pasar por patinador (8 días).",
      "Skip it. Tape a survey QR code to the rail (2 days).": "Saltarlo. Pegar un código QR de encuesta en la baranda (2 días).",
      [`<p>${T("up", "+2 trust · −10 days")}Most say yes. One says no, so you leave him out of your notes. This is <b>informed consent</b>: people agree after knowing what the study is.</p>`]:
        `<p>${T("up", "+2 confianza · −10 días")}Casi todos dicen que sí. Uno dice que no, así que lo dejas fuera de tus notas. Esto es el <b>consentimiento informado (informed consent)</b>: las personas aceptan después de saber de qué se trata el estudio.</p>`,
      [`<p>${T("down", "−3 trust · −8 days")}A skater finds your notebook. Word spreads that you were secretly studying them. The crew stops talking to you, and the client worries about complaints.</p>`]:
        `<p>${T("down", "−3 confianza · −8 días")}Un patinador encuentra tu cuaderno. Se corre la voz de que los estabas estudiando en secreto. El grupo deja de hablarte, y al cliente le preocupan las quejas.</p>`,
      [`<p>${T("flat", "No change · −2 days")}You get 3 answers, one of them a meme. Fast, but you learn almost nothing.</p>`]:
        `<p>${T("flat", "Sin cambio · −2 días")}Recibes 3 respuestas, y una es un meme. Rápido, pero no aprendes casi nada.</p>`,

      [ev("Field notes, week 3", "When the skaters knew I was watching, they swore less and helped each other more. When I left, things went back to normal.") + "What problem does this show?"]:
        ev("Notas de campo, semana 3", "Cuando los patinadores sabían que yo los observaba, decían menos groserías y se ayudaban más. Cuando me fui, todo volvió a la normalidad.") + "¿Qué problema muestra esto?",
      "People act differently when they know they're watched": "La gente actúa distinto cuando sabe que la observan",
      "The skaters were both the test group and the control": "Los patinadores eran el grupo de prueba y el de control",
      "She used secondary data instead of her own data": "Ella usó datos secundarios en vez de sus propios datos",
      "Her sample was much too large to be a case study": "Su muestra era demasiado grande para un estudio de caso",
      "What changed when the researcher was there?": "¿Qué cambiaba cuando la investigadora estaba ahí?",
      "People change how they act when they know they're being studied. Observers have to plan for this.":
        "La gente cambia su forma de actuar cuando sabe que la están estudiando. Los observadores tienen que tomar esto en cuenta.",

      [ev("Two numbers that don't match", "<b>Survey:</b> students said they do 2.5 hours of homework a night.<br><b>Teacher logs:</b> about 40 minutes.") + "What survey weakness does this show?"]:
        ev("Dos números que no cuadran", "<b>Encuesta:</b> los estudiantes dijeron que hacen 2.5 horas de tarea cada noche.<br><b>Registros de los profesores:</b> unos 40 minutos.") + "¿Qué debilidad de las encuestas muestra esto?",
      "People don't always answer surveys honestly": "La gente no siempre responde las encuestas con honestidad",
      "Surveys can't collect any numbers at all": "Las encuestas no pueden reunir ningún número",
      "Surveys only work with one person at a time": "Las encuestas solo funcionan con una persona a la vez",
      "Surveys prove cause and effect too strongly": "Las encuestas exageran demasiado la causa y el efecto",
      "Why might students report more homework than they really do?": "¿Por qué los estudiantes dirían que hacen más tarea de la que hacen de verdad?",
      "People may guess, forget, or say what sounds good. Researchers check surveys against other data when they can.":
        "La gente puede adivinar, olvidar o decir lo que suena bien. Cuando pueden, los investigadores comparan las encuestas con otros datos.",

      // ---------- Part 3 ----------
      "Part 3 of 3": "Parte 3 de 3",
      "The Ethics Files": "Los expedientes de ética",
      [`<p>Research <b>ethics</b> are rules that protect the people being studied:</p>
        <ul><li><b>Informed consent</b>: people agree after knowing the purpose and risks.</li><li><b>Do no harm</b>: don't hurt people physically or mentally.</li><li><b>Right to quit</b>: people can stop at any time.</li><li><b>Honesty</b> and <b>objectivity</b>: don't trick people, and don't let your own views tilt the results (<b>bias</b>).</li></ul>
        <p>These four real studies are a big reason these rules exist. In the U.S., most studies with people now need a review board's OK before they start.</p>`]:
        `<p>La <b>ética (ethics)</b> de la investigación son las reglas que protegen a las personas estudiadas:</p>
        <ul><li><b>Consentimiento informado (informed consent)</b>: las personas aceptan después de conocer el propósito y los riesgos.</li><li><b>No hacer daño (do no harm)</b>: no lastimar a nadie ni en el cuerpo ni en la mente.</li><li><b>Derecho a retirarse (right to quit)</b>: las personas pueden parar en cualquier momento.</li><li><b>Honestidad (honesty)</b> y <b>objetividad (objectivity)</b>: no engañar a la gente, y no dejar que tus propias opiniones inclinen los resultados (<b>sesgo, bias</b>).</li></ul>
        <p>Estos cuatro estudios reales son una gran razón por la que existen estas reglas. En EE. UU., hoy la mayoría de los estudios con personas necesitan la aprobación de un comité de revisión antes de empezar.</p>`,

      [ev("Case file · Tuskegee Study, 1932–1972", "The U.S. Public Health Service studied about 600 Black men in Alabama, 399 of them with syphilis. The men were told they were being treated for \"bad blood.\" By 1947 penicillin could cure syphilis, but the men were not given it. Many died, and some wives and children were infected.") + "Which rule was most clearly broken?"]:
        ev("Expediente · Estudio de Tuskegee, 1932–1972", "El Servicio de Salud Pública de EE. UU. estudió a unos 600 hombres negros en Alabama, 399 de ellos con sífilis. A los hombres les dijeron que los estaban tratando por \"mala sangre\". Para 1947 la penicilina podía curar la sífilis, pero no se la dieron. Muchos murieron, y algunas esposas e hijos se contagiaron.") + "¿Cuál regla se rompió más claramente?",
      "Informed consent, since the men were lied to": "Consentimiento informado, porque les mintieron a los hombres",
      "Objectivity, since the researchers liked the men": "Objetividad, porque a los investigadores les caían bien",
      "Secondary data, since they used old census records": "Datos secundarios, porque usaron registros viejos del censo",
      "Sample size, since the study had too few people": "Tamaño de la muestra, porque el estudio tenía muy poca gente",
      "What were the men told, and was it true?": "¿Qué les dijeron a los hombres, y era verdad?",
      "The men never agreed to an untreated disease study. They were lied to and harmed. Public outrage led to the 1974 National Research Act and modern consent rules.":
        "Los hombres nunca aceptaron participar en un estudio de una enfermedad sin tratamiento. Les mintieron y les hicieron daño. La indignación pública llevó a la Ley Nacional de Investigación (National Research Act) de 1974 y a las reglas modernas de consentimiento.",

      [ev("Case file · Milgram, Yale, 1961", "People were told to give electric shocks to a \"learner\" each time he got an answer wrong. The shocks were fake and the learner was an actor, but the participants didn't know. In the best-known version, about 65% went to the highest level. Many sweated, shook, and begged to stop.") + "What was the main ethical problem?"]:
        ev("Expediente · Milgram, Yale, 1961", "A las personas les dijeron que le dieran descargas eléctricas a un \"aprendiz\" cada vez que él se equivocaba en una respuesta. Las descargas eran falsas y el aprendiz era un actor, pero los participantes no lo sabían. En la versión más conocida, cerca del 65% llegó al nivel más alto. Muchos sudaron, temblaron y suplicaron parar.") + "¿Cuál fue el principal problema ético?",
      "Deception and serious stress for the participants": "El engaño y el estrés fuerte para los participantes",
      "It had no way to control any of its variables": "No tenía forma de controlar ninguna de sus variables",
      "It only used old records instead of real people": "Solo usó registros viejos en vez de personas reales",
      "The participants were paid far too much money": "A los participantes les pagaron demasiada plata",
      "Did participants know the truth? How did they feel?": "¿Los participantes sabían la verdad? ¿Cómo se sintieron?",
      "Participants were tricked and put under heavy stress. Today, deception like this is strictly limited.":
        "Engañaron a los participantes y los pusieron bajo mucho estrés. Hoy, un engaño como este está muy limitado.",

      [ev("Case file · \"Little Albert,\" 1920", "John Watson and Rosalie Rayner made a loud, scary noise every time a baby named Albert touched a white rat. Soon he cried at the rat, and also at other furry things. They never undid the fear.") + "Why is this study seen as unethical?"]:
        ev("Expediente · \"El pequeño Albert\" (Little Albert), 1920", "John Watson y Rosalie Rayner hacían un ruido fuerte y aterrador cada vez que un bebé llamado Albert tocaba una rata blanca. Pronto lloraba al ver la rata, y también con otras cosas peludas. Nunca le quitaron ese miedo.") + "¿Por qué se considera que este estudio no fue ético?",
      "A baby can't consent, and he was harmed": "Un bebé no puede dar su consentimiento, y le hicieron daño",
      "The study used too many babies at once": "El estudio usó demasiados bebés a la vez",
      "The researchers gave the baby a survey": "Los investigadores le dieron una encuesta al bebé",
      "A rat can't be used as a variable": "Una rata no se puede usar como variable",
      "Could Albert agree to this? Was he hurt?": "¿Albert podía aceptar esto? ¿Le hicieron daño?",
      "Albert couldn't give consent, and the study left him with fears that were never removed. That breaks consent and do no harm.":
        "Albert no podía dar su consentimiento, y el estudio lo dejó con miedos que nunca le quitaron. Eso rompe las reglas del consentimiento y de no hacer daño.",

      [ev("Your own interview study", "Halfway through an interview about losing a job, your participant starts crying. \"I don't think I want to keep going.\"")]:
        ev("Tu propio estudio con entrevistas", "A mitad de una entrevista sobre perder el trabajo, la persona que participa empieza a llorar. \"Creo que no quiero seguir.\""),
      "Stop. Remind them they can quit and pull their answers out.": "Parar. Recordarle que puede retirarse y quitar sus respuestas.",
      "Push on. You're almost done, and you need the data.": "Seguir. Ya casi terminas, y necesitas los datos.",
      "Take a short break, then ask the same question again": "Tomar un descanso corto y luego hacer la misma pregunta otra vez",
      [`<p>${T("up", "+3 trust")}They thank you. A week later they come back and finish on their own terms. That's the <b>right to quit</b>.</p>`]:
        `<p>${T("up", "+3 confianza")}Te da las gracias. Una semana después regresa y termina a su manera. Eso es el <b>derecho a retirarse</b>.</p>`,
      [`<p>${T("down", "−4 trust")}You finish, but they file a complaint. The review board pauses your whole study.</p>`]:
        `<p>${T("down", "−4 confianza")}Terminas, pero pone una queja. El comité de revisión detiene todo tu estudio.</p>`,
      [`<p>${T("down", "−1 trust")}Kinder than pushing, but they already said they wanted to stop. They need to hear clearly that quitting is OK.</p>`]:
        `<p>${T("down", "−1 confianza")}Es más amable que presionar, pero ya dijo que quería parar. Necesita oír claramente que está bien retirarse.</p>`,

      [ev("Case file · Stanford Prison Experiment, 1971", "Philip Zimbardo put college students in a fake prison as \"guards\" and \"prisoners.\" Guards became cruel, and the study ended after 6 of 14 planned days. Later, recordings showed the guards were coached to be tough, and Zimbardo acted as the prison boss.") + "Why do many researchers now doubt its results?"]:
        ev("Expediente · Experimento de la cárcel de Stanford (Stanford Prison Experiment), 1971", "Philip Zimbardo puso a estudiantes universitarios en una cárcel falsa como \"guardias\" y \"presos\". Los guardias se volvieron crueles, y el estudio terminó después de 6 de los 14 días planeados. Más tarde, unas grabaciones mostraron que a los guardias les dijeron que fueran duros, y que Zimbardo actuaba como el jefe de la cárcel.") + "¿Por qué muchos investigadores hoy dudan de sus resultados?",
      "The researcher wasn't objective. He shaped what happened.": "El investigador no fue objetivo. Él influyó en lo que pasó.",
      "Its control group was much too small to compare against": "Su grupo de control era demasiado pequeño para comparar",
      "It was only a survey, so the students could have lied": "Fue solo una encuesta, así que los estudiantes pudieron mentir",
      "It happened too long ago for anyone to learn from it": "Pasó hace demasiado tiempo para que alguien aprenda de él",
      "Reread the last sentence of the case file.": "Vuelve a leer la última oración del expediente.",
      "A researcher shouldn't steer results. Zimbardo was part of the experiment and guards were coached, so the study is biased, besides harming the 'prisoners.'":
        "Un investigador no debe dirigir los resultados. Zimbardo era parte del experimento y a los guardias les dijeron cómo actuar, así que el estudio está sesgado, además de que les hizo daño a los 'presos'.",

      // ---------- Finale ----------
      "Your Research Review": "Revisión de tu investigación",
      "Clients and participants trust your company. You picked methods that fit and treated people right.":
        "Los clientes y los participantes confían en tu empresa. Escogiste métodos adecuados y trataste bien a la gente.",
      "Solid season, with a few shortcuts. Think about consent and the right to quit.":
        "Buena temporada, con algunos atajos. Piensa en el consentimiento y el derecho a retirarse.",
      "Trust took a hit. Methods matter, but so does how you treat people.":
        "La confianza recibió un golpe. Los métodos importan, pero también cómo tratas a la gente.",
      "Answer both in 1–2 full sentences.": "Responde las dos con 1–2 oraciones completas.",
      "1. Which famous study broke the most rules? Which rule would have stopped it?":
        "1. ¿Cuál estudio famoso rompió más reglas? ¿Cuál regla lo habría detenido?",
      "I think the ___ study broke the most rules because ___. The rule of ___ would have stopped it.":
        "Creo que el estudio de ___ rompió más reglas porque ___. La regla de ___ lo habría detenido.",
      "In answer 1, name the study (Tuskegee, Milgram, Little Albert, or Stanford) AND the rule (like informed consent or do no harm).":
        "En la respuesta 1, nombra el estudio (Tuskegee, Milgram, Little Albert o Stanford) Y la regla (como el consentimiento informado o no hacer daño).",
      "2. Make up a question about your school or town. Which method would you use, and what is one tradeoff?":
        "2. Inventa una pregunta sobre tu liceo o tu ciudad. ¿Qué método usarías, y cuál es una desventaja?",
      "My question: ___? I would use a ___ because ___. One tradeoff is ___.":
        "Mi pregunta: ¿___? Usaría un/una ___ porque ___. Una desventaja es ___.",
      "In answer 2, name a method (survey, interview, observation, experiment, case study, or secondary data) AND explain why or what you give up.":
        "En la respuesta 2, nombra un método (encuesta, entrevista, observación, experimento, estudio de caso o datos secundarios) Y explica por qué o qué sacrificas.",

      // ---------- Short names (shown in "Next:", "✓" and writing messages) ----------
      "Worst study and the rule that would stop it": "El peor estudio y la regla que lo detendría",
      "My research question, method, and tradeoff": "Mi pregunta de investigación, mi método y su desventaja"
    },
    patterns: [
      { re: /^Season over: (\d+) work days left · Trust (\d+)\/10\.$/, es: "Fin de la temporada: quedan $1 días de trabajo · Confianza $2/10." }
    ],
    writing: {
      rules: [
        ["albert", "estanford", "carcel", "prision"],
        ["consentimiento", "dano", "danar", "lastim", "engan", "menti", "mentir", "retir", "renunci", "parar", "estres", "objetiv", "sesg", "verdad", "honest"]
      ],
      method: [
        ["encuesta", "entrevista", "observ", "experimento", "caso", "secundari", "censo"],
        ["pero", "porque", "aunque", "sin embargo", "desventaja", "lent", "rapid", "podria", "puede", "quizas"]
      ]
    }
  });
})();
