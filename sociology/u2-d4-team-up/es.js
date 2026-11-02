// Spanish for "Why Do People Team Up for Change?" (Sociology Unit 2 Day 4). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same little HTML builders the page uses, so the keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const ev = (who, body) => `<span class="ev"><span class="who">${who}</span>${body}</span>`;
  const chat = (who, msg) => `<span class="ev chat"><span class="who">${who}</span>${msg}</span>`;

  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "Save the Night Bus | Sociology Unit 2 Day 4": "Salvemos el autobús nocturno | Sociología Unidad 2 Día 4",
      "Sociology · Unit 2 · Day 4": "Sociología · Unidad 2 · Día 4",
      "Why Do People Team Up for Change?": "¿Por qué la gente se une para lograr cambios?",
      "Evaluate important social institutions and how they respond to social needs.": "Evaluar instituciones sociales importantes y cómo responden a las necesidades sociales.",
      "Goal:": "Meta:",
      "Explain why social movements form, name their types and stages, and tell a movement apart from a crowd. · About 25 minutes.":
        "Explicar por qué se forman los movimientos sociales, nombrar sus tipos y etapas, y distinguir un movimiento de una multitud. · Unos 25 minutos.",
      "Progress and supporters": "Progreso y simpatizantes",
      "👥 Supporters:": "👥 Simpatizantes:",

      // ---------- Intro ----------
      "Start organizing": "Empezar a organizar",
      "Save the night bus": "Salvemos el autobús nocturno",
      "Night Route 12 is on the chopping block": "La Ruta Nocturna 12 está a punto de desaparecer",
      // The intro alert sits inside the intro card, so the key is the alert's inside (not the outer span).
      [`<span class="who">City news alert</span>The city council is planning to cut <b>Night Route 12</b>, the only bus that runs until midnight, to save money.`]:
        `<span class="who">Alerta de noticias de la ciudad</span>El concejo municipal planea eliminar la <b>Ruta Nocturna 12</b>, el único autobús que funciona hasta la medianoche, para ahorrar dinero.`,
      "Lots of teens ride Route 12 home from late shifts at work. You and two friends are mad. Yelling about it online won't fix it. Can you build a <b>movement</b>?":
        "Muchos jóvenes agarran la Ruta 12 para volver a su casa cuando salen tarde del trabajo. Tú y dos amigos están molestos. Quejarse en internet no lo va a arreglar. ¿Puedes construir un <b>movimiento</b>?",
      "👥 Your choices change your <b>supporter count</b> at the top. You start with 3.": "👥 Tus decisiones cambian tu <b>número de simpatizantes</b> arriba. Empiezas con 3.",
      "📚 Learn how real movements grow, from a spark to the end.": "📚 Aprende cómo crecen los movimientos reales, desde la chispa hasta el final.",
      "🗳️ See how the council votes. Then write 2 short answers.": "🗳️ Mira cómo vota el concejo. Luego escribe 2 respuestas cortas.",
      "Route 12 and the city are made up. The history examples are real.": "La Ruta 12 y la ciudad son inventadas. Los ejemplos de historia son reales.",

      // ---------- Part 1 ----------
      "Part 1 of 3": "Parte 1 de 3",
      "The Spark": "La chispa",
      [`<p>A <b>social movement</b> is a long-term, organized effort by many people to bring about change, <b>or to resist it</b>.</p>
        <p><b>Collective behavior</b> is different. It's short-term and unplanned: a crowd, a flash mob, a panic, a riot.</p>
        <p>Movements usually form when people feel <b>treated unfairly</b>, feel <b>ignored by leaders</b>, are <b>sparked by a big event</b>, or are <b>inspired by a new idea</b>.</p>`]:
        `<p>Un <b>movimiento social (social movement)</b> es un esfuerzo organizado y a largo plazo de muchas personas para lograr un cambio, <b>o para oponerse a él</b>.</p>
        <p>El <b>comportamiento colectivo (collective behavior)</b> es diferente. Es de corto plazo y sin planear: una multitud, un flash mob, un pánico, un disturbio.</p>
        <p>Los movimientos casi siempre se forman cuando la gente se siente <b>tratada injustamente</b>, se siente <b>ignorada por los líderes</b>, reacciona a <b>un evento importante que sirve de chispa</b>, o se <b>inspira en una idea nueva</b>.</p>`,

      [chat("City news alert", "Council votes 4–3 to start plans to cut Night Route 12.") + "Which reason for forming a movement does this news show best?"]:
        chat("Alerta de noticias de la ciudad", "El concejo vota 4–3 para empezar los planes de eliminar la Ruta Nocturna 12.") + "¿Cuál razón para formar un movimiento muestra mejor esta noticia?",
      "Sparked by a major event": "Lo provocó un evento importante",
      "Inspired by an idea in a book": "Lo inspiró una idea de un libro",
      "Ordered by the state government": "Lo ordenó el gobierno del estado",
      "Copying a trend from overseas": "Copia una moda de otro país",
      "Check the four reasons in the teach box. What just happened?": "Revisa las cuatro razones en el cuadro de la lección. ¿Qué acaba de pasar?",
      "The vote is a big event that sparks people to act. Many riders may also feel ignored by leaders.":
        "La votación es un evento importante que sirve de chispa para que la gente actúe. Muchos pasajeros también pueden sentirse ignorados por los líderes.",

      [`<p>That night, about 80 angry riders gather outside city hall. People are shouting. Someone kicks over a trash can. What do you do?</p>`]:
        `<p>Esa noche, unos 80 pasajeros molestos se reúnen frente a la alcaldía. La gente está gritando. Alguien tumba un pipote de basura de una patada. ¿Qué haces?</p>`,
      "Pass around a sign-up sheet and announce a planning meeting Saturday": "Pasar una hoja para anotarse y anunciar una reunión para planificar el sábado",
      "Start a louder chant. The crowd energy is amazing!": "Empezar un canto más fuerte. ¡La energía de la gente es increíble!",
      "Post an angry video and go home": "Publicar un video molesto e irte a tu casa",
      [`<p>${T("up", "+40 supporters")}You leave with 43 names and phone numbers. Now there's a plan, not just a crowd.</p>`]:
        `<p>${T("up", "+40 simpatizantes")}Te vas con 43 nombres y números de teléfono. Ahora hay un plan, no solo una multitud.</p>`,
      [`<p>${T("flat", "+0 supporters")}It feels huge for an hour. Then everyone goes home, and nobody knows what's next.</p>`]:
        `<p>${T("flat", "+0 simpatizantes")}Por una hora se siente enorme. Después todos se van a su casa, y nadie sabe qué sigue.</p>`,
      [`<p>${T("up", "+10 supporters")}The video gets shared, and a few people message you. But there's no plan yet.</p>`]:
        `<p>${T("up", "+10 simpatizantes")}El video se comparte, y algunas personas te escriben. Pero todavía no hay un plan.</p>`,

      [ev("That night outside city hall", "80 people showed up after hearing the news. No one planned it. By 10 p.m., they were gone.") + "That crowd was an example of…"]:
        ev("Esa noche frente a la alcaldía", "Llegaron 80 personas después de oír la noticia. Nadie lo planeó. Para las 10 p.m., ya se habían ido.") + "Esa multitud fue un ejemplo de…",
      "Collective behavior": "Comportamiento colectivo",
      "A social movement": "Un movimiento social",
      "Bureaucratization": "Burocratización",
      "Institutionalization": "Institucionalización",
      "Was it planned and long-term, or short and spur of the moment?": "¿Fue planeado y a largo plazo, o algo corto que pasó en el momento?",
      "A short, unplanned crowd is collective behavior. A movement is organized and lasts a long time.":
        "Una multitud corta y sin planear es comportamiento colectivo. Un movimiento está organizado y dura mucho tiempo.",

      [ev("A witness", "\"The guy who kicked the trash can? He'd never do that alone. In the crowd it was like nobody was a person anymore.\"") + "Sociologists call this…"]:
        ev("Un testigo", "\"¿El chamo que pateó el pipote? Él nunca haría eso solo. En la multitud era como si nadie fuera una persona.\"") + "Los sociólogos llaman a esto…",
      "Deindividuation, or losing self-control in a crowd": "Desindividuación, o perder el autocontrol en una multitud",
      "Coalescence, or a movement starting to get organized": "Coalescencia, o un movimiento que empieza a organizarse",
      "Reform, or trying to change a single law": "Reforma, o tratar de cambiar una sola ley",
      "Socialization, or learning society's rules": "Socialización, o aprender las reglas de la sociedad",
      "The witness says people stopped acting like themselves in the crowd.": "El testigo dice que en la multitud la gente dejó de comportarse como de costumbre.",
      "Deindividuation (\"mob mentality\") is losing your sense of self and self-restraint in a crowd.":
        "La desindividuación (deindividuation), o \"mentalidad de masa\", es perder el sentido de quién eres y el autocontrol en una multitud.",

      [ev("Two scenes", "<b>A:</b> 200 people march to city hall with signs and a permit.<br><b>B:</b> A crowd breaks store windows and steals.") + "What's the main difference between a protest (A) and a riot (B)?"]:
        ev("Dos escenas", "<b>A:</b> 200 personas marchan a la alcaldía con pancartas y un permiso.<br><b>B:</b> Una multitud rompe vidrieras de tiendas y roba.") + "¿Cuál es la diferencia principal entre una protesta (A) y un disturbio (B)?",
      "Protests are usually legal; riots break laws": "Las protestas suelen ser legales; los disturbios violan leyes",
      "Protests are small; riots are always huge": "Las protestas son pequeñas; los disturbios siempre son enormes",
      "Protests are unplanned; riots are planned": "Las protestas no se planean; los disturbios sí se planean",
      "Protests happen online; riots don't": "Las protestas pasan en internet; los disturbios no",
      "Look at what each crowd is doing.": "Mira lo que está haciendo cada multitud.",
      "Protests are usually legal ways to be heard. Riots involve breaking laws, like damage and theft.":
        "Las protestas suelen ser formas legales de hacerse escuchar. Los disturbios incluyen violar leyes, como hacer daños y robar.",

      // ---------- Part 2 ----------
      "Part 2 of 3": "Parte 2 de 3",
      "Getting Organized": "A organizarse",
      [`<p>Sociologist Herbert Blumer described <b>four classic stages</b> of a movement:</p>
        <div class="stages"><div><b>1. Emergence</b>People feel a problem, but aren't organized.</div><div><b>2. Coalescence</b>People organize, pick leaders, make a plan, go public.</div><div><b>3. Bureaucratization</b>A formal group with staff, rules, and money.</div><div><b>4. Decline</b>The movement winds down. That can mean it won, lost, or became part of the system.</div></div>
        <p><b>Types:</b> <b>reform</b> (change certain laws), <b>revolutionary</b> (replace the whole system), <b>resistance</b> (stop or reverse a change), <b>redemptive</b> (change individuals' hearts or lives), <b>alternative</b> (change one habit, like quitting smoking).</p>`]:
        `<p>El sociólogo Herbert Blumer describió <b>cuatro etapas clásicas</b> de un movimiento:</p>
        <div class="stages"><div><b>1. Surgimiento (emergence)</b>La gente siente un problema, pero no está organizada.</div><div><b>2. Coalescencia (coalescence)</b>La gente se organiza, escoge líderes, hace un plan y se da a conocer.</div><div><b>3. Burocratización (bureaucratization)</b>Un grupo formal con personal, reglas y dinero.</div><div><b>4. Declive (decline)</b>El movimiento se va apagando. Eso puede significar que ganó, que perdió o que se volvió parte del sistema.</div></div>
        <p><b>Tipos:</b> <b>reformista (reform)</b>: cambiar ciertas leyes. <b>Revolucionario (revolutionary)</b>: reemplazar todo el sistema. <b>De resistencia (resistance)</b>: detener o revertir un cambio. <b>Redentor (redemptive)</b>: cambiar el corazón o la vida de cada persona. <b>Alternativo (alternative)</b>: cambiar un hábito, como dejar de fumar.</p>`,

      [`<p>Saturday's meeting is packed. What's your main plan?</p>`]: `<p>La reunión del sábado está llena. ¿Cuál es tu plan principal?</p>`,
      "Collect signatures, then bring 40 riders to tell their stories at the council meeting": "Recoger firmas y luego llevar a 40 pasajeros a contar sus historias en la reunión del concejo",
      "Hold one huge rally downtown, then take a break": "Hacer una manifestación enorme en el centro y luego descansar",
      "Post the council members' home addresses online": "Publicar en internet las direcciones de las casas de los concejales",
      [`<p>${T("up", "+120 supporters")}A nurse's aide says Route 12 is her only way home at 11 p.m. Local news covers it. Sign-ups jump.</p>`]:
        `<p>${T("up", "+120 simpatizantes")}Una asistente de enfermería dice que la Ruta 12 es su única forma de llegar a su casa a las 11 p.m. Las noticias locales lo cubren. Las inscripciones se disparan.</p>`,
      [`<p>${T("up", "+60 supporters")}Great photos and a big crowd. But a week later, the council has moved on.</p>`]:
        `<p>${T("up", "+60 simpatizantes")}Fotos buenísimas y mucha gente. Pero una semana después, el concejo ya pasó a otro tema.</p>`,
      [`<p>${T("down", "−30 supporters")}This is called doxxing. It scares people and can be dangerous. Supporters quit, and the council refuses to meet with you.</p>`]:
        `<p>${T("down", "−30 simpatizantes")}Esto se llama doxxing. Asusta a la gente y puede ser peligroso. Los simpatizantes se van, y el concejo se niega a reunirse contigo.</p>`,

      [ev("History file · Montgomery, Alabama, 1955", "After Rosa Parks was arrested for not giving up her bus seat, Black residents organized a bus boycott. They chose leaders, including Martin Luther King Jr., and set up carpools. It lasted 381 days.") + "Which stage does this show?"]:
        ev("Archivo de historia · Montgomery, Alabama, 1955", "Después de que arrestaron a Rosa Parks por no ceder su asiento en el autobús, los residentes negros organizaron un boicot a los autobuses. Escogieron líderes, entre ellos Martin Luther King Jr., y organizaron grupos para compartir carros. Duró 381 días.") + "¿Qué etapa muestra esto?",
      "Coalescence": "Coalescencia",
      "Emergence": "Surgimiento",
      "Decline": "Declive",
      "People were choosing leaders, making a plan, and going public.": "La gente estaba escogiendo líderes, haciendo un plan y dándose a conocer.",
      "Organizing, picking leaders, and acting publicly is coalescence.": "Organizarse, escoger líderes y actuar en público es la coalescencia.",

      [chat("Your group's goal", "Keep Night Route 12 running. We're not trying to replace the city government.") + "What type of movement is yours?"]:
        chat("La meta de tu grupo", "Que la Ruta Nocturna 12 siga funcionando. No estamos tratando de reemplazar al gobierno de la ciudad.") + "¿Qué tipo de movimiento es el tuyo?",
      "A reform movement": "Un movimiento reformista",
      "A revolutionary movement": "Un movimiento revolucionario",
      "A redemptive movement": "Un movimiento redentor",
      "An alternative movement": "Un movimiento alternativo",
      "Do you want to change one decision, or the whole system?": "¿Quieres cambiar una decisión, o todo el sistema?",
      "Trying to change one specific policy, inside the system, is reform.": "Tratar de cambiar una política específica, dentro del sistema, es reforma.",

      [chat("Your group chat", "300 members · 1,240 unread messages. Three people made three different flyers. Nobody knows who's in charge.") + `<p>What now?</p>`]:
        chat("El chat de tu grupo", "300 miembros · 1,240 mensajes sin leer. Tres personas hicieron tres volantes distintos. Nadie sabe quién está a cargo.") + `<p>¿Y ahora qué?</p>`,
      "Form an official group: elected leaders, a bank account, a website": "Formar un grupo oficial: líderes elegidos, una cuenta de banco, una página web",
      "Keep it a loose group chat. Rules are boring.": "Dejarlo como un chat suelto. Las reglas son aburridas.",
      "Let the loudest person run everything": "Dejar que la persona más gritona dirija todo",
      [`<p>${T("up", "+100 supporters")}"Riders for Route 12" is born. People know who to call, and the city takes you more seriously.</p>`]:
        `<p>${T("up", "+100 simpatizantes")}Nace "Pasajeros por la Ruta 12". La gente sabe a quién llamar, y la ciudad los toma más en serio.</p>`,
      [`<p>${T("down", "−20 supporters")}Messages get lost. People get frustrated and mute the chat.</p>`]:
        `<p>${T("down", "−20 simpatizantes")}Los mensajes se pierden. La gente se frustra y silencia el chat.</p>`,
      [`<p>${T("up", "+10 supporters")}Things move fast, but some members feel ignored and drift away.</p>`]:
        `<p>${T("up", "+10 simpatizantes")}Las cosas avanzan rápido, pero algunos miembros se sienten ignorados y se van alejando.</p>`,

      [ev("History file · NAACP", "Founded in 1909. Today it has paid staff, lawyers, local branches across the country, and members who pay dues.") + "Which stage does the NAACP show?"]:
        ev("Archivo de historia · NAACP", "Fundada en 1909. Hoy tiene personal pagado, abogados, sedes locales por todo el país y miembros que pagan cuotas.") + "¿Qué etapa muestra la NAACP?",
      "Staff, branches, and dues. Which stage is about becoming a formal organization?": "Personal, sedes y cuotas. ¿Cuál etapa se trata de volverse una organización formal?",
      "Becoming a formal organization with staff, rules, and money is bureaucratization.": "Volverse una organización formal con personal, reglas y dinero es la burocratización.",

      [chat("A new group appears", "\"Keep Our Budget\" forms to STOP the city from raising a fee to pay for Route 12. They say families already pay enough.") + "What type of movement is this?"]:
        chat("Aparece un grupo nuevo", "Se forma \"Cuidemos Nuestro Presupuesto\" para IMPEDIR que la ciudad suba una tarifa para pagar la Ruta 12. Dicen que las familias ya pagan suficiente.") + "¿Qué tipo de movimiento es este?",
      "A resistance movement": "Un movimiento de resistencia",
      "Is this group pushing for a change, or trying to stop one?": "¿Este grupo está empujando un cambio, o tratando de detener uno?",
      "A movement that tries to stop or reverse a change is resistance. People can have fair reasons on both sides.":
        "Un movimiento que trata de detener o revertir un cambio es de resistencia. La gente puede tener razones justas en los dos lados.",

      // ---------- Part 3 ----------
      "Part 3 of 3": "Parte 3 de 3",
      "How Movements End": "Cómo terminan los movimientos",
      [`<p>In the <b>decline</b> stage, a movement shrinks. That doesn't always mean it failed. Sometimes it wins and isn't needed anymore.</p>
        <p><b>Institutionalization</b> is when a movement's goal becomes a regular part of the system, like a law or an agency.</p>`]:
        `<p>En la etapa de <b>declive</b>, un movimiento se hace más pequeño. Eso no siempre significa que fracasó. A veces gana y ya no hace falta.</p>
        <p>La <b>institucionalización (institutionalization)</b> es cuando la meta de un movimiento se vuelve una parte normal del sistema, como una ley o una agencia del gobierno.</p>`,

      // Council vote (built from your supporter count)
      "Council vote night": "Noche de votación en el concejo",
      [`${T("up", "Win")} The council votes <b>5–2 to keep Night Route 12</b> and writes it into the yearly city budget. It's now a normal part of how the city runs.`]:
        `${T("up", "Victoria")} El concejo vota <b>5–2 para mantener la Ruta Nocturna 12</b> y la incluye en el presupuesto anual de la ciudad. Ahora es una parte normal de cómo funciona la ciudad.`,
      [`${T("flat", "Partial win")} The council votes <b>4–3 to keep Route 12 for one more year</b> as a trial. Your group has to prove riders really use it.`]:
        `${T("flat", "Victoria parcial")} El concejo vota <b>4–3 para mantener la Ruta 12 un año más</b> como prueba. Tu grupo tiene que demostrar que los pasajeros de verdad la usan.`,
      [`${T("down", "Loss, for now")} The council votes <b>4–3 to cut Route 12</b>. A few members say they'd look at it again if more people speak up next year.`]:
        `${T("down", "Derrota, por ahora")} El concejo vota <b>4–3 para eliminar la Ruta 12</b>. Algunos concejales dicen que lo volverían a revisar si más gente alza la voz el próximo año.`,
      "Movements with more organized supporters usually get more attention from leaders, but bigger never guarantees a win.":
        "Los movimientos con más simpatizantes organizados suelen recibir más atención de los líderes, pero ser más grande nunca garantiza ganar.",

      [ev("History file · Women's suffrage", "Women organized for the right to vote for about 70 years. In 1920 the 19th Amendment became part of the Constitution. After that, the big suffrage groups closed or changed into new groups.") + "Why did the suffrage movement decline?"]:
        ev("Archivo de historia · El sufragio femenino", "Las mujeres se organizaron por el derecho al voto durante unos 70 años. En 1920 la Enmienda 19 pasó a ser parte de la Constitución. Después de eso, los grandes grupos por el sufragio cerraron o se convirtieron en grupos nuevos.") + "¿Por qué entró en declive el movimiento por el sufragio?",
      "It won its main goal": "Logró su meta principal",
      "It ran out of members": "Se quedó sin miembros",
      "The government banned it": "El gobierno lo prohibió",
      "People forgot its goal": "La gente olvidó su meta",
      "What happened in 1920?": "¿Qué pasó en 1920?",
      "Once women won the vote, the movement's main job was done. Decline can mean success.":
        "Cuando las mujeres ganaron el voto, el trabajo principal del movimiento estaba hecho. El declive puede significar éxito.",

      [ev("History file · Clean air", "Environmental activists pushed for cleaner air. In 1970, Congress passed the Clean Air Act, and the new EPA began enforcing it.") + "What is this outcome called?"]:
        ev("Archivo de historia · Aire limpio", "Activistas del ambiente presionaron por un aire más limpio. En 1970, el Congreso aprobó la Ley de Aire Limpio (Clean Air Act), y la nueva EPA (Agencia de Protección Ambiental) empezó a hacerla cumplir.") + "¿Cómo se llama este resultado?",
      "Deindividuation": "Desindividuación",
      "The movement's goal became part of government. Check the teach box.": "La meta del movimiento se volvió parte del gobierno. Revisa el cuadro de la lección.",
      "The goal became a law and an agency, part of a social institution (government). That's institutionalization.":
        "La meta se volvió una ley y una agencia, parte de una institución social (el gobierno). Eso es la institucionalización.",

      [ev("History file · Temperance", "From the 1800s to 1919, the temperance movement worked to pass a law banning alcohol across the country. It won the 18th Amendment, which made selling alcohol illegal.") + "What type of movement was temperance?"]:
        ev("Archivo de historia · La templanza", "Desde el siglo XIX hasta 1919, el movimiento por la templanza (temperance) trabajó para aprobar una ley que prohibiera el alcohol en todo el país. Logró la Enmienda 18, que hizo ilegal vender alcohol.") + "¿Qué tipo de movimiento fue el de la templanza?",
      "Its big goal was a specific law. Which type changes laws?": "Su gran meta era una ley específica. ¿Cuál tipo cambia leyes?",
      "Temperance aimed to change specific laws, so it's a reform movement.": "La templanza buscaba cambiar leyes específicas, así que es un movimiento reformista.",

      [ev("History file · 1776", "American colonists didn't just want one tax law changed. They threw off British rule and set up a whole new government.") + "What type of movement was this?"]:
        ev("Archivo de historia · 1776", "Los colonos americanos no solo querían cambiar una ley de impuestos. Se quitaron de encima el dominio británico y armaron un gobierno totalmente nuevo.") + "¿Qué tipo de movimiento fue este?",
      "Did they want one law changed, or the whole system replaced?": "¿Querían cambiar una ley, o reemplazar todo el sistema?",
      "Replacing the whole system of government is a revolutionary movement.": "Reemplazar todo el sistema de gobierno es un movimiento revolucionario.",

      [chat("Route 12 rider, Kiara, 17", "\"When I emailed the council by myself, nobody answered. When 40 of us showed up, they had to listen.\"") + "What does Kiara's story show about why people join movements?"]:
        chat("Pasajera de la Ruta 12, Kiara, 17 años", "\"Cuando le escribí al concejo yo sola, nadie me respondió. Cuando llegamos 40, tuvieron que escucharnos.\"") + "¿Qué muestra la historia de Kiara sobre por qué la gente se une a los movimientos?",
      "Organized numbers get leaders to respond": "Ser muchos y organizados hace que los líderes respondan",
      "Leaders only read messages from groups": "Los líderes solo leen mensajes de grupos",
      "Acting alone is against city rules": "Actuar solo va contra las reglas de la ciudad",
      "Groups make sure every person agrees": "Los grupos se aseguran de que todos estén de acuerdo",
      "What changed between Kiara alone and Kiara with 40 people?": "¿Qué cambió entre Kiara sola y Kiara con 40 personas?",
      "Institutions like city government respond to organized pressure. Many voices together have power one person lacks.":
        "Instituciones como el gobierno de la ciudad responden a la presión organizada. Muchas voces juntas tienen un poder que una sola persona no tiene.",

      // ---------- Finale ----------
      "Why Team Up?": "¿Por qué unirse?",
      "Organized, legal, steady actions built the movement. Unplanned crowds and actions that scare people did not.":
        "Las acciones organizadas, legales y constantes construyeron el movimiento. Las multitudes sin plan y las acciones que asustan a la gente no.",
      "Answer both in 1–2 full sentences.": "Responde las dos con 1–2 oraciones completas.",
      "1. Why do people join a movement instead of acting alone? Use an example from today.":
        "1. ¿Por qué la gente se une a un movimiento en vez de actuar sola? Usa un ejemplo de hoy.",
      "People join a movement instead of acting alone because ___. For example, ___.":
        "La gente se une a un movimiento en vez de actuar sola porque ___. Por ejemplo, ___.",
      "In answer 1, explain WHY (use \"because\") and give an example.": "En la respuesta 1, explica POR QUÉ (usa \"porque\") y da un ejemplo.",
      "2. Pick one of the four stages. Explain what your Route 12 movement did in that stage.":
        "2. Escoge una de las cuatro etapas. Explica lo que hizo tu movimiento por la Ruta 12 en esa etapa.",
      "In the ___ stage, our movement ___.": "En la etapa de ___, nuestro movimiento ___.",
      "In answer 2, name one of the four stages: emergence, coalescence, bureaucratization, or decline.":
        "En la respuesta 2, nombra una de las cuatro etapas: surgimiento, coalescencia, burocratización o declive.",

      // ---------- Short names (shown in "Next:", "✓" and writing messages) ----------
      "Why join a movement instead of acting alone": "Por qué unirse a un movimiento en vez de actuar solo",
      "One stage of my movement": "Una etapa de mi movimiento"
    },
    patterns: [
      { re: /^(\d+) people signed on\. Here's what happened\.$/, es: "$1 personas se sumaron. Esto fue lo que pasó." },
      { re: /^You finished with (\d+) supporters\.$/, es: "Terminaste con $1 simpatizantes." }
    ],
    writing: {
      why: [
        ["porque", "ya que", "pues", "asi que", "poder", "junt", "unid", "numero", "escuch", "fuerza", "muchos"]
      ],
      stage: [
        ["surgimiento", "emergencia", "coalescencia", "burocratiz", "declive", "decadencia"]
      ]
    }
  });
})();
