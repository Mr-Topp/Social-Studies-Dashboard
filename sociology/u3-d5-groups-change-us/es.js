// Spanish for "The Group Pressure Lab" (Sociology Unit 3 Day 5). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same helpers as the page, so the English keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const card = (lab, body, cls) => `<div class="src-card ${cls || ""}"><p class="lab">${lab}</p>${body}</div>`;
  const chat = (who, body) => `<div class="chat"><div class="who">${who}</div>${body}</div>`;
  const lineCard = `<div class="lines" role="img" aria-label="A target line on the left. Three lines on the right: A is shorter, B is the same length, C is longer.">
<svg width="120" height="190" viewBox="0 0 120 190"><text x="60" y="18" text-anchor="middle" font-size="14" font-weight="800" fill="#22223a">Target</text><line x1="60" y1="60" x2="60" y2="175" stroke="#22223a" stroke-width="6"/></svg>
<svg width="260" height="190" viewBox="0 0 260 190"><text x="45" y="18" text-anchor="middle" font-size="14" font-weight="800" fill="#22223a">A</text><line x1="45" y1="110" x2="45" y2="175" stroke="#4b3f8f" stroke-width="6"/><text x="130" y="18" text-anchor="middle" font-size="14" font-weight="800" fill="#22223a">B</text><line x1="130" y1="60" x2="130" y2="175" stroke="#4b3f8f" stroke-width="6"/><text x="215" y="18" text-anchor="middle" font-size="14" font-weight="800" fill="#22223a">C</text><line x1="215" y1="25" x2="215" y2="175" stroke="#4b3f8f" stroke-width="6"/></svg></div>`;
  const lineCardEs = lineCard
    .replace("A target line on the left. Three lines on the right: A is shorter, B is the same length, C is longer.", "Una línea modelo a la izquierda. Tres líneas a la derecha: la A es más corta, la B mide lo mismo y la C es más larga.")
    .replace(">Target<", ">Modelo<");
  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "The Group Pressure Lab | Sociology Unit 3 Day 5": "El laboratorio de la presión de grupo | Sociología Unidad 3 Día 5",
      "Sociology · Unit 3 · Day 5": "Sociología · Unidad 3 · Día 5",
      "The Group Pressure Lab": "El laboratorio de la presión de grupo",
      "Explain the social construction of groups and their impact on the life chances of individuals.": "Explicar la construcción social de los grupos y su impacto en las oportunidades de vida de las personas.",
      "Goal:": "Meta:",
      "Explain why groups change how we act (conformity, groupthink, obedience, social control) and how to spot a group that's taking over. · About 25 minutes.": "Explicar por qué los grupos cambian cómo actuamos (conformidad, pensamiento de grupo, obediencia, control social) y cómo reconocer a un grupo que se está adueñando de tu vida. · Unos 25 minutos.",
      "Progress and your own-voice meter": "Progreso y tu medidor de voz propia",
      "Your own voice:": "Tu voz propia:",

      // ---------- Intro ----------
      "Enter the lab": "Entrar al laboratorio",
      "Three rooms, three tests": "Tres salas, tres pruebas",
      "Would you go along with the group?": "¿Le seguirías la corriente al grupo?",
      [`Most people say, "Not me. I think for myself." Scientists have tested that. You'll step into three real situations and see what usually happens.`]:
        `Casi todo el mundo dice: "Yo no. Yo pienso por mí mismo." Los científicos lo han puesto a prueba. Vas a entrar en tres situaciones reales y ver lo que suele pasar.`,
      "Room 1: A simple line test": "Sala 1: Una prueba sencilla de líneas",
      "Room 2: A team meeting where nobody speaks up": "Sala 2: Una reunión de equipo donde nadie dice nada",
      "Room 3: A group that wants more and more of you": "Sala 3: Un grupo que quiere cada vez más de ti",
      "Your choices move the <b>Your own voice</b> meter at the top. At the end, write 2 short answers and turn in.": "Tus decisiones mueven el medidor <b>Tu voz propia</b> de arriba. Al final, escribe 2 respuestas cortas y entrega.",

      // ---------- Part 1 ----------
      "Part 1 of 3 · Room 1": "Parte 1 de 3 · Sala 1",
      "The Line Test": "La prueba de las líneas",
      [`<p><b>Conformity</b> means changing what you say or do to match a group, so you fit in.</p>
        <p>In 1951, psychologist <b>Solomon Asch</b> tested it with a simple task: which line matches the target line?</p>`]:
        `<p>La <b>conformidad (conformity)</b> es cambiar lo que dices o haces para coincidir con un grupo y así encajar.</p>
        <p>En 1951, el psicólogo <b>Solomon Asch</b> la puso a prueba con una tarea sencilla: ¿qué línea mide lo mismo que la línea modelo?</p>`,
      [`${lineCard}<p>You're in a room with 7 other students. They're all secretly working for the researcher (these helpers are called <b>confederates</b>). The researcher asks each person out loud which line matches the target.</p>
          <div class="room"><span>"A"</span><span>"A"</span><span>"A"</span><span>"A"</span><span>"A"</span><span>"A"</span><span>"A"</span><span class="you">You: ?</span></div>`]:
        `${lineCardEs}<p>Estás en un salón con otros 7 estudiantes. Todos trabajan en secreto para el investigador (a estos ayudantes se les llama <b>cómplices (confederates)</b>). El investigador le pregunta a cada persona en voz alta qué línea mide lo mismo que el modelo.</p>
          <div class="room"><span>"A"</span><span>"A"</span><span>"A"</span><span>"A"</span><span>"A"</span><span>"A"</span><span>"A"</span><span class="you">Tú: ?</span></div>`,

      [`<p>All 7 people said <b>A</b>. They didn't even hesitate. Now everyone is looking at you.</p>`]:
        `<p>Las 7 personas dijeron <b>A</b>. Ni siquiera dudaron. Ahora todos te están mirando.</p>`,
      "Say \"B.\" It's clearly B.": "Decir \"B\". Está clarísimo que es la B.",
      [`<p>${T("up","+2 own voice")}You trusted your eyes. A couple of people glance at you. It felt awkward, but you were right.</p>`]:
        `<p>${T("up","+2 voz propia")}Confiaste en tus ojos. Un par de personas te miran de reojo. Fue incómodo, pero tenías razón.</p>`,
      "Say \"A,\" like everyone else": "Decir \"A\", como todos los demás",
      [`<p>${T("down","−2 own voice")}You went along. No awkward stares. But you said something you knew was wrong. That's conformity.</p>`]:
        `<p>${T("down","−2 voz propia")}Le seguiste la corriente al grupo. Nadie te miró raro. Pero dijiste algo que sabías que estaba mal. Eso es conformidad.</p>`,
      "Mumble \"I'm not totally sure…\"": "Murmurar \"No estoy totalmente seguro…\"",
      [`<p>${T("flat","No change")}You didn't go along, but you didn't stand up either. The group made you doubt something you could see.</p>`]:
        `<p>${T("flat","Sin cambio")}No le seguiste la corriente, pero tampoco te plantaste. El grupo te hizo dudar de algo que podías ver.</p>`,

      [card("Asch's results (1950s)", `<div class="stats"><div><b>under 1%</b>got it wrong when tested alone</div><div><b>about 75%</b>went along with the wrong group answer at least once</div><div><b>about 25%</b>never went along</div></div>`) + "About how many people went along with the wrong group answer at least once?"]:
        card("Resultados de Asch (años 50)", `<div class="stats"><div><b>menos del 1%</b>se equivocó cuando hizo la prueba solo</div><div><b>cerca del 75%</b>siguió la respuesta equivocada del grupo al menos una vez</div><div><b>cerca del 25%</b>nunca siguió al grupo</div></div>`) + "¿Más o menos cuántas personas siguieron la respuesta equivocada del grupo al menos una vez?",
      "About 3 out of 4 people": "Más o menos 3 de cada 4 personas",
      "About 1 out of 4 people": "Más o menos 1 de cada 4 personas",
      "About 1 out of 100 people": "Más o menos 1 de cada 100 personas",
      "About 9 out of 10 people": "Más o menos 9 de cada 10 personas",
      "Look at the middle box on the results card.": "Mira el cuadro del medio en la tarjeta de resultados.",
      "About 75%, or 3 out of 4, went along at least once. Alone, almost nobody got it wrong, so the group caused the mistakes.": "Cerca del 75%, o sea 3 de cada 4, siguió al grupo al menos una vez. Solos, casi nadie se equivocaba, así que el grupo causó los errores.",

      "Why does the \"under 1%\" number matter?": "¿Por qué importa el número \"menos del 1%\"?",
      "It proves the task was easy, so the group caused the errors": "Prueba que la tarea era fácil, así que el grupo causó los errores",
      "It proves most people in the study had bad eyesight": "Prueba que casi todos en el estudio tenían mala vista",
      "It shows that the confederates were telling the truth": "Muestra que los cómplices estaban diciendo la verdad",
      "It shows people conform more when they are alone": "Muestra que hay más conformidad cuando uno está solo",
      "What happened when people answered with no group around?": "¿Qué pasó cuando la gente respondió sin un grupo alrededor?",
      "When alone, people almost never missed. So the wrong answers came from group pressure, not a hard task.": "Solas, las personas casi nunca fallaban. Entonces las respuestas equivocadas vinieron de la presión del grupo, no de una tarea difícil.",

      [card("After the test, people explained", `<p>"I didn't want to look stupid."</p><p>"I figured they must see something I didn't."</p><p class="src">Paraphrased from interviews Asch reported.</p>`) + "Based on what people said, why did they go along?"]:
        card("Después de la prueba, la gente explicó", `<p>"No quería quedar como un tonto."</p><p>"Pensé que ellos debían estar viendo algo que yo no veía."</p><p class="src">Resumido de entrevistas que reportó Asch.</p>`) + "Según lo que dijo la gente, ¿por qué siguieron al grupo?",
      "They wanted to fit in, or they doubted themselves": "Querían encajar, o dudaron de sí mismos",
      "The researcher ordered them to pick the same line": "El investigador les ordenó escoger la misma línea",
      "They were paid extra money for matching the group": "Les pagaron más por responder igual que el grupo",
      "They could not see the lines from where they sat": "No podían ver las líneas desde donde estaban",
      "Read both quotes. One is about looks, one is about doubt.": "Lee las dos citas. Una es sobre cómo te ven los demás y la otra es sobre la duda.",
      "Some people went along to avoid looking foolish (fitting in). Others started to doubt their own eyes. Both are reasons people conform.": "Algunas personas siguieron al grupo para no quedar en ridículo (para encajar). Otras empezaron a dudar de sus propios ojos. Las dos son razones de la conformidad.",

      [card("Asch changed one thing", `<p>In another version, <b>one</b> confederate gave the right answer. Going along with the wrong answer dropped to about <b>1 in 20</b> answers.</p>`) + "What does this suggest?"]:
        card("Asch cambió una sola cosa", `<p>En otra versión, <b>un</b> cómplice dio la respuesta correcta. Seguir la respuesta equivocada bajó a más o menos <b>1 de cada 20</b> respuestas.</p>`) + "¿Qué sugiere esto?",
      "Having just one ally makes it easier to speak up": "Tener aunque sea un aliado hace más fácil hablar",
      "Bigger groups always make people feel braver": "Los grupos más grandes siempre dan más valor",
      "People conform more when someone disagrees": "Hay más conformidad cuando alguien no está de acuerdo",
      "The line test was broken in this version": "La prueba de líneas falló en esta versión",
      "What changed when one person broke from the group?": "¿Qué cambió cuando una persona se separó del grupo?",
      "One person on your side breaks the spell. That's why speaking up can help others speak up too.": "Una sola persona de tu lado rompe el hechizo. Por eso, cuando tú hablas, puedes ayudar a que otros también hablen.",

      // ---------- Part 2 ----------
      "Part 2 of 3 · Room 2": "Parte 2 de 3 · Sala 2",
      "The Meeting Where Nobody Spoke Up": "La reunión donde nadie dijo nada",
      [`<p><b>Groupthink</b> happens when a close group wants to agree so badly that people stop questioning a bad idea. Psychologist <b>Irving Janis</b> named it in 1972.</p>
        <p><b>Obedience</b> is following orders from someone in charge (an <b>authority figure</b>), even when you have doubts.</p>`]:
        `<p>El <b>pensamiento de grupo (groupthink)</b> pasa cuando un grupo unido quiere estar de acuerdo con tantas ganas que la gente deja de cuestionar una mala idea. El psicólogo <b>Irving Janis</b> le puso ese nombre en 1972.</p>
        <p>La <b>obediencia (obedience)</b> es seguir las órdenes de alguien que manda (una <b>figura de autoridad (authority figure)</b>), aunque tengas dudas.</p>`,

      [card("Case file: The Bay of Pigs, 1961", `<p>President John F. Kennedy's advisers approved a plan to land about 1,400 Cuban exiles in Cuba to overthrow Fidel Castro.</p><p>Some advisers had serious doubts but kept quiet so the team would stay united. The invasion failed in about 3 days.</p>`) + "Advisers kept their doubts quiet so the team would agree. This is an example of…"]:
        card("Expediente: Bahía de Cochinos, 1961", `<p>Los asesores del presidente John F. Kennedy aprobaron un plan para desembarcar a unos 1,400 exiliados cubanos en Cuba y derrocar a Fidel Castro.</p><p>Algunos asesores tenían dudas serias, pero se quedaron callados para que el equipo siguiera unido. La invasión fracasó en unos 3 días.</p>`) + "Los asesores se callaron sus dudas para que el equipo estuviera de acuerdo. Esto es un ejemplo de…",
      "Groupthink": "Pensamiento de grupo",
      "Obedience to orders": "Obediencia a órdenes",
      "Resocialization": "Resocialización",
      "Culture shock": "Choque cultural",
      "Were they following a direct order, or staying quiet to keep the group united?": "¿Estaban siguiendo una orden directa, o se quedaron callados para mantener al grupo unido?",
      "Staying quiet to keep a group in agreement, even when the plan is bad, is groupthink. Janis used this case as his main example.": "Quedarse callado para que el grupo siga de acuerdo, aunque el plan sea malo, es pensamiento de grupo. Janis usó este caso como su ejemplo principal.",

      [chat("SHIFT LEAD · team huddle", `<p>Big truck order due by 2. Let's skip the forklift safety check today. Everybody good with that? 👍</p>`) + `<p>Five coworkers nod right away. You've seen that forklift's brakes act weird.</p>`]:
        chat("ENCARGADO DEL TURNO · reunión rápida", `<p>Hay que cargar un pedido grande en el camión antes de las 2. Hoy nos saltamos la revisión de seguridad del montacargas. ¿Todos de acuerdo? 👍</p>`) + `<p>Cinco compañeros de trabajo dicen que sí con la cabeza de una vez. Tú has visto que los frenos de ese montacargas andan raros.</p>`,
      "Ask: \"What happens if the brakes go?\"": "Preguntar: \"¿Y qué pasa si fallan los frenos?\"",
      [`<p>${T("up","+2 own voice")}There's a pause. Then another worker says, "Yeah, I noticed that too." The lead agrees to a 5-minute check. One question broke the groupthink.</p>`]:
        `<p>${T("up","+2 voz propia")}Hay una pausa. Luego otro trabajador dice: "Sí, yo también lo noté." El encargado acepta hacer una revisión de 5 minutos. Una sola pregunta rompió el pensamiento de grupo.</p>`,
      "Nod along. Nobody else seems worried.": "Decir que sí con la cabeza. Nadie más parece preocupado.",
      [`<p>${T("down","−2 own voice")}The meeting ends fast. Later, two coworkers admit they were worried too. Nobody said it out loud.</p>`]:
        `<p>${T("down","−2 voz propia")}La reunión termina rápido. Más tarde, dos compañeros admiten que ellos también estaban preocupados. Nadie lo dijo en voz alta.</p>`,
      "Say nothing, but complain later in the group chat": "No decir nada, pero quejarte después en el chat del grupo",
      [`<p>${T("down","−1 own voice")}People agree with you in the chat, but the forklift already went out. The doubt came too late to help.</p>`]:
        `<p>${T("down","−1 voz propia")}La gente te da la razón en el chat, pero el montacargas ya salió. La duda llegó demasiado tarde para ayudar.</p>`,

      [card("Janis's ways to prevent groupthink", `<p>• The leader shares an opinion <b>last</b>, not first.</p><p>• Someone's job is to argue <b>against</b> the plan (a <b>devil's advocate</b>).</p><p>• Invite outside people to check the plan.</p>`) + "Which move would best prevent groupthink?"]:
        card("Cómo evitar el pensamiento de grupo, según Janis", `<p>• El líder da su opinión de <b>último</b>, no de primero.</p><p>• Alguien tiene la tarea de argumentar <b>en contra</b> del plan (un <b>abogado del diablo (devil's advocate)</b>).</p><p>• Invitar a gente de afuera a revisar el plan.</p>`) + "¿Qué acción evitaría mejor el pensamiento de grupo?",
      "Assign someone to argue against the plan": "Asignar a alguien para argumentar en contra del plan",
      "Let the leader share an opinion first": "Dejar que el líder dé su opinión de primero",
      "Vote fast so nobody feels awkward": "Votar rápido para que nadie se sienta incómodo",
      "Only invite people who already agree": "Invitar solo a gente que ya está de acuerdo",
      "Which choice matches a bullet on the card?": "¿Qué opción coincide con un punto de la tarjeta?",
      "A devil's advocate makes disagreement part of the job, so doubts get said out loud.": "Con un abogado del diablo, no estar de acuerdo pasa a ser parte del trabajo, y así las dudas se dicen en voz alta.",

      [card("Case file: The Milgram experiment, 1961", `<p>At Yale University, Stanley Milgram told volunteers they were helping with a memory study. Each time a "learner" in the next room got an answer wrong, the volunteer had to press a switch for a stronger electric shock.</p><p>The shocks were <b>fake</b>, and the learner was an actor. But the volunteers didn't know that. When they wanted to stop, a man in a lab coat said things like, "The experiment requires that you continue."</p><div class="stats"><div><b>26 of 40</b>went all the way to the highest switch</div><div><b>65%</b>of volunteers obeyed to the end</div><div><b>Many</b>sweated, shook, or argued, but kept going</div></div>`)]:
        card("Expediente: el experimento de Milgram, 1961", `<p>En la Universidad de Yale, Stanley Milgram les dijo a unos voluntarios que estaban ayudando con un estudio sobre la memoria. Cada vez que un "alumno" en el cuarto de al lado se equivocaba, el voluntario tenía que presionar un interruptor para darle una descarga eléctrica más fuerte.</p><p>Las descargas eran <b>falsas</b> y el alumno era un actor. Pero los voluntarios no lo sabían. Cuando querían parar, un hombre con bata de laboratorio les decía cosas como: "El experimento requiere que usted continúe."</p><div class="stats"><div><b>26 de 40</b>llegaron hasta el interruptor más alto</div><div><b>65%</b>de los voluntarios obedeció hasta el final</div><div><b>Muchos</b>sudaron, temblaron o discutieron, pero siguieron</div></div>`),

      "What does Milgram's study show about people?": "¿Qué muestra el estudio de Milgram sobre la gente?",
      "Many people obey authority even when it feels wrong": "Mucha gente obedece a la autoridad aunque sienta que está mal",
      "Most people refuse orders that could hurt someone": "Casi todos se niegan a cumplir órdenes que hagan daño",
      "People only obey when they are paid a lot of money": "La gente solo obedece cuando le pagan mucho dinero",
      "Only cruel or violent people follow harmful orders": "Solo la gente cruel o violenta sigue órdenes dañinas",
      "Look at the 65% and how upset volunteers were.": "Mira el 65% y lo alterados que estaban los voluntarios.",
      "Most volunteers were ordinary people who felt upset but obeyed anyway. Authority can push people to act against their conscience.": "La mayoría de los voluntarios eran personas comunes que se sentían mal, pero obedecieron igual. La autoridad puede empujar a la gente a actuar en contra de su conciencia.",

      [card("Milgram changed one thing", `<p>In one version, two other "teachers" (also actors) refused to keep going. Only about <b>1 in 10</b> volunteers went all the way.</p>`) + "What lowered obedience in this version?"]:
        card("Milgram cambió una sola cosa", `<p>En una versión, otros dos "maestros" (también actores) se negaron a seguir. Solo más o menos <b>1 de cada 10</b> voluntarios llegó hasta el final.</p>`) + "¿Qué bajó la obediencia en esta versión?",
      "Seeing other people refuse first": "Ver a otras personas negarse primero",
      "Having a stricter man in a lab coat": "Tener un hombre de bata más estricto",
      "Moving the study to a bigger room": "Mover el estudio a un cuarto más grande",
      "Paying the volunteers less money": "Pagarles menos dinero a los voluntarios",
      "Think back to Asch's 'one ally' result.": "Recuerda el resultado de Asch sobre 'un solo aliado'.",
      "When others refused, people felt free to refuse too. Like in Asch's study, one or two people who break from the group change everything.": "Cuando otros se negaron, la gente se sintió libre de negarse también. Como en el estudio de Asch, una o dos personas que se separan del grupo lo cambian todo.",

      [card("Research check: be careful with this one", `<p>The <b>Stanford Prison Experiment</b> (1971) is famous. It's often taught as proof that giving people the role of "guard" makes them cruel.</p><p>But later, recordings and records showed the researchers <b>coached the guards</b> to act tough. Some guards said they were acting. Many scientists now say it <b>does not prove</b> what it claimed.</p>`, "warn")]:
        card("Revisión de la investigación: cuidado con este", `<p>El <b>Experimento de la cárcel de Stanford (Stanford Prison Experiment)</b> (1971) es famoso. Muchas veces se enseña como prueba de que darle a alguien el rol de "guardia" lo vuelve cruel.</p><p>Pero después, unas grabaciones y documentos mostraron que los investigadores <b>entrenaron a los guardias</b> para que actuaran duro. Algunos guardias dijeron que estaban actuando. Hoy muchos científicos dicen que <b>no prueba</b> lo que decía probar.</p>`, "warn"),

      "Why do many scientists now question the Stanford Prison Experiment?": "¿Por qué hoy muchos científicos cuestionan el Experimento de la cárcel de Stanford?",
      "Researchers coached guards on how to act": "Les dijeron a los guardias cómo actuar",
      "Too many people joined to track them all": "Participó demasiada gente para seguirlos a todos",
      "It took place outside the United States": "Se hizo fuera de los Estados Unidos",
      "All the guards were trained police officers": "Todos los guardias eran policías entrenados",
      "Reread the research-check card. What did the researchers do?": "Vuelve a leer la tarjeta de revisión. ¿Qué hicieron los investigadores?",
      "If guards were told how to act, their cruelty doesn't show what roles do on their own. Good science has to check how a study was run.": "Si a los guardias les dijeron cómo actuar, su crueldad no muestra lo que los roles hacen por sí solos. La buena ciencia tiene que revisar cómo se hizo un estudio.",

      // ---------- Part 3 ----------
      "Part 3 of 3 · Room 3": "Parte 3 de 3 · Sala 3",
      "The Group That Wants More": "El grupo que quiere más",
      [`<p>Most groups are good for us: teams, families, faith groups, jobs, friend groups. They give us <b>belonging</b>.</p>
        <p>But some groups use <b>social control</b> (rewards, punishments, and rules that control what members do, eat, wear, read, and who they talk to) to take over people's lives. A very controlling group like this is often called a <b>cult</b>. It usually has a <b>charismatic leader</b> (a leader people find magnetic and special) who claims to have the only truth.</p>
        <p>The danger isn't believing something different. The danger is control, manipulation, and fear.</p>`]:
        `<p>Casi todos los grupos son buenos para nosotros: equipos, familias, grupos de fe, trabajos, grupos de amigos. Nos dan <b>pertenencia (belonging)</b>.</p>
        <p>Pero algunos grupos usan el <b>control social (social control)</b> (premios, castigos y reglas que controlan lo que los miembros hacen, comen, se ponen y leen, y con quién hablan) para adueñarse de la vida de las personas. A un grupo así de controlador muchas veces se le llama <b>secta (cult)</b>. Casi siempre tiene un <b>líder carismático (charismatic leader)</b> (un líder que a la gente le parece atrayente y especial) que dice tener la única verdad.</p>
        <p>El peligro no es creer algo diferente. El peligro es el control, la manipulación y el miedo.</p>`,

      [chat("YOUR FRIEND TASHA", `<p>You HAVE to come to RISE. Free workouts, free food, and everyone is so nice. Coach Vance says we're gonna change our whole lives 🔥</p>`) + `<p>You go once. People hug you, remember your name, and say you're "meant to be here." It feels amazing.</p><p class="src">RISE and Coach Vance are made up. The warning signs are real.</p>`]:
        chat("TU PANA TASHA", `<p>TIENES que venir a RISE. Entrenamientos gratis, comida gratis y todo el mundo es demasiado buena gente. El coach Vance dice que vamos a cambiar nuestra vida entera 🔥</p>`) + `<p>Vas una vez. La gente te abraza, se acuerda de tu nombre y te dice que estás "destinado a estar aquí". Se siente increíble.</p><p class="src">RISE y el coach Vance son inventados. Las señales de alerta son reales.</p>`,
      "Keep going, but keep your other plans and friends too": "Seguir yendo, pero sin dejar tus otros planes y amigos",
      [`<p>${T("up","+1 own voice")}You enjoy the workouts and still see your other friends. You stay connected to people outside the group.</p>`]:
        `<p>${T("up","+1 voz propia")}Disfrutas los entrenamientos y sigues viendo a tus otros amigos. Te mantienes conectado con gente de afuera del grupo.</p>`,
      "Go every night. These people feel like family.": "Ir todas las noches. Esta gente se siente como familia.",
      [`<p>${T("down","−1 own voice")}RISE fills up your week fast. You start missing hangouts and family dinner. It feels great, for now.</p>`]:
        `<p>${T("down","−1 voz propia")}RISE te llena la semana rápido. Empiezas a faltar a las salidas con tus amigos y a la cena familiar. Se siente genial, por ahora.</p>`,

      "Which one is a <b>red flag</b>, not normal group stuff?": "¿Cuál es una <b>señal de alerta (red flag)</b> y no algo normal de un grupo?",
      "The leader tells you to stop talking to family": "El líder te dice que dejes de hablar con tu familia",
      "The coach asks everyone to wear team colors": "El entrenador pide que todos usen los colores del equipo",
      "Members do a loud chant before every game": "Los miembros gritan un canto antes de cada juego",
      "The club asks for $20 to pay for team shirts": "El club pide $20 para pagar las franelas del equipo",
      "Which one cuts you off from people outside the group?": "¿Cuál te aleja de la gente de afuera del grupo?",
      "Rituals, uniforms, and small fees are normal. Cutting members off from family is a classic sign of a controlling group.": "Los rituales, los uniformes y las cuotas pequeñas son normales. Alejar a los miembros de su familia es una señal típica de un grupo controlador.",

      [chat("COACH VANCE · week 6", `<p>Phones go in the basket during meetings. Doubters are weak. If your family doesn't support your growth, maybe they're holding you back. Level 2 is $300.</p>`) + `<p>Tasha already handed over her phone. Everyone is watching.</p>`]:
        chat("COACH VANCE · semana 6", `<p>Los celulares van en la cesta durante las reuniones. Los que dudan son débiles. Si tu familia no apoya tu crecimiento, a lo mejor te está frenando. El Nivel 2 cuesta $300.</p>`) + `<p>Tasha ya entregó su celular. Todos están mirando.</p>`,
      "Call an outside friend and talk it through": "Llamar a un amigo de afuera y hablarlo con calma",
      [`<p>${T("up","+2 own voice")}Your cousin says, "That's not a gym, that's control." Hearing an outside view helps you see it clearly. You stop going and check on Tasha.</p>`]:
        `<p>${T("up","+2 voz propia")}Tu primo te dice: "Eso no es un gimnasio, eso es control." Escuchar una opinión de afuera te ayuda a verlo claro. Dejas de ir y le preguntas a Tasha cómo está.</p>`,
      "Hand over your phone and stay quiet": "Entregar tu celular y quedarte callado",
      [`<p>${T("down","−2 own voice")}You don't want to be called weak. Now you can't check with anyone outside. That's exactly how control grows.</p>`]:
        `<p>${T("down","−2 voz propia")}No quieres que te digan débil. Ahora no puedes consultar con nadie de afuera. Así es exactamente como crece el control.</p>`,
      "Keep going, but stop telling family about it": "Seguir yendo, pero dejar de contarle a tu familia",
      [`<p>${T("down","−1 own voice")}Keeping the group secret from family means fewer people can warn you. Secrecy is another warning sign.</p>`]:
        `<p>${T("down","−1 voz propia")}Si le escondes el grupo a tu familia, menos gente te puede advertir. El secreto es otra señal de alerta.</p>`,

      "Taking phones and calling doubters \"weak\" are both examples of…": "Quitar los celulares y llamar \"débiles\" a los que dudan son ejemplos de…",
      "Social control": "Control social",
      "Cultural relativity": "Relatividad cultural",
      "Ethnocentrism": "Etnocentrismo",
      "Reread the box at the top of Part 3. Which idea is about rewards, punishments, and rules for members?": "Vuelve a leer el cuadro de arriba de la Parte 3. ¿Qué idea habla de premios, castigos y reglas para los miembros?",
      "Punishing doubt and controlling who you talk to are tools of social control.": "Castigar las dudas y controlar con quién hablas son herramientas del control social.",

      [card("Inside a controlling group", `<p>New members get a new name, strict rules about food and clothes, and are told their old life was \"fake.\"</p>`) + "Replacing a person's old beliefs and habits with new ones is called…"]:
        card("Dentro de un grupo controlador", `<p>A los miembros nuevos les dan un nombre nuevo y reglas estrictas sobre la comida y la ropa, y les dicen que su vida de antes era \"falsa\".</p>`) + "Reemplazar las creencias y los hábitos de antes de una persona por otros nuevos se llama…",
      "A reference group": "Grupo de referencia",
      "Role-taking": "Adopción de roles",
      "Old beliefs out, new beliefs in. Which word means being socialized all over again?": "Afuera las creencias viejas, adentro las nuevas. ¿Qué palabra significa ser socializado otra vez desde cero?",
      "Resocialization replaces old values and habits with new ones. Boot camp does this too, but controlling groups use it to make members depend on them.": "La resocialización reemplaza los valores y hábitos de antes por otros nuevos. El entrenamiento militar también lo hace, pero los grupos controladores la usan para que los miembros dependan de ellos.",

      [card("Case file: Jonestown, 1978 (a serious one)", `<p><b>Jim Jones</b> led a group called the Peoples Temple. He moved his followers from the U.S. to a remote camp in the jungle of Guyana, in South America. He took their passports, controlled their news, and punished people who doubted him.</p><p>In November 1978, more than <b>900</b> people died there, including about <b>300 children</b>. Most were made to drink poison. Many were forced.</p><p>Most members had joined because they wanted community and fairness. They were not "stupid." They were cut off, step by step.</p>`, "warn")]:
        card("Expediente: Jonestown, 1978 (un caso serio)", `<p><b>Jim Jones</b> dirigía un grupo llamado el Templo del Pueblo (Peoples Temple). Se llevó a sus seguidores de EE. UU. a un campamento aislado en la selva de Guyana, en Sudamérica. Les quitó los pasaportes, controló las noticias que recibían y castigó a quienes dudaban de él.</p><p>En noviembre de 1978, más de <b>900</b> personas murieron allí, entre ellas unos <b>300 niños</b>. A la mayoría la hicieron tomar veneno. A muchos los obligaron.</p><p>La mayoría de los miembros se había unido porque quería comunidad y justicia. No eran "tontos". Los fueron aislando, paso a paso.</p>`, "warn"),

      "Which step made it hardest for Peoples Temple members to leave?": "¿Qué paso les hizo más difícil a los miembros del Templo del Pueblo irse?",
      "Moving them far away and taking passports": "Llevarlos lejos y quitarles los pasaportes",
      "Holding big meetings with music and food": "Hacer grandes reuniones con música y comida",
      "Asking members to volunteer to help people": "Pedirles a los miembros ayudar como voluntarios",
      "Giving the group a hopeful-sounding name": "Darle al grupo un nombre que suena esperanzador",
      "Reread the first paragraph. What made leaving almost impossible?": "Vuelve a leer el primer párrafo. ¿Qué hizo que irse fuera casi imposible?",
      "Isolation (far from home, no passports, no outside news) left members with no way out and no outside voices.": "El aislamiento (lejos de casa, sin pasaportes, sin noticias de afuera) dejó a los miembros sin salida y sin voces de afuera.",

      "Based on today, what usually draws people into controlling groups?": "Según lo de hoy, ¿qué suele atraer a la gente a los grupos controladores?",
      "Needing to belong and wanting answers": "Necesitar pertenecer y querer respuestas",
      "Being forced to join at the very start": "Ser obligados a unirse desde el principio",
      "Having low grades or not being smart": "Tener malas notas o no ser inteligente",
      "Hoping to get rich in a short time": "Querer hacerse rico en poco tiempo",
      "Think about how RISE felt in week 1, and why Peoples Temple members joined.": "Piensa en cómo se sentía RISE en la semana 1 y por qué se unieron los miembros del Templo del Pueblo.",
      "People usually join for belonging, meaning, and a leader who seems to have answers. Anyone can be pulled in, especially when lonely.": "La gente casi siempre se une buscando pertenencia, sentido y un líder que parece tener respuestas. Cualquiera puede caer, sobre todo si se siente solo.",

      // ---------- Finale ----------
      "Your Pressure Plan": "Tu plan contra la presión",
      "Groups give us belonging. They also push us to conform, stay quiet, obey, or cut off outsiders. The fix is usually the same: one person who speaks up, and staying connected to people outside the group.": "Los grupos nos dan pertenencia. También nos empujan a seguir la corriente, quedarnos callados, obedecer o alejarnos de los de afuera. La solución casi siempre es la misma: una persona que se atreve a hablar, y mantenerse conectado con gente de afuera del grupo.",
      "Answer both in 1–2 full sentences.": "Responde las dos preguntas en 1–2 oraciones completas.",
      "1. When does a group stop helping you and start controlling you? Name one red flag from today.": "1. ¿Cuándo un grupo deja de ayudarte y empieza a controlarte? Nombra una señal de alerta de la actividad de hoy.",
      "A group starts controlling you when ___. One red flag is ___.": "Un grupo empieza a controlarte cuando ___. Una señal de alerta es ___.",
      "2. Pick Asch's line test, Milgram's study, or groupthink. Based on it, what's one way a person can resist group pressure?": "2. Escoge la prueba de líneas de Asch, el estudio de Milgram o el pensamiento de grupo. Según eso, ¿de qué forma puede una persona resistir la presión del grupo?",
      "In ___, people ___. One way to resist is ___ because ___.": "En ___, la gente ___. Una forma de resistir es ___ porque ___.",
      "When a group starts controlling you": "Cuándo un grupo empieza a controlarte",
      "Resisting group pressure (study)": "Resistir la presión del grupo (estudio)",
      "In answer 1, name a real red flag from today (like cutting off family or friends, taking phones, punishing doubters).": "En la respuesta 1, nombra una señal de alerta real de la actividad de hoy (como alejarte de tu familia o amigos, quitarte el celular, castigar a los que dudan).",
      "In answer 2, name the study (Asch, Milgram, or groupthink) AND explain why your idea works (use \"because\").": "En la respuesta 2, nombra el estudio (Asch, Milgram o pensamiento de grupo) Y explica por qué funciona tu idea (usa \"porque\")."
    },
    patterns: [
      { re: /^Your own-voice meter ended at (\d+)\/10\.$/, es: "Tu medidor de voz propia terminó en $1/10." }
    ],
    writing: {
      flag: [
        ["familia", "amig", "pana", "celular", "telefono", "lider", "duda", "dudar", "pregunt", "aisl", "alej", "cort", "dinero", "plata", "pagar", "castig", "miedo", "secret", "control", "debil"]
      ],
      resist: [
        ["asch", "linea", "milgram", "descarga", "pensamiento de grupo", "bahia de cochinos", "janis"],
        ["porque", "ya que", "asi que", "cuando", "si ", "pues"]
      ]
    }
  });
})();
