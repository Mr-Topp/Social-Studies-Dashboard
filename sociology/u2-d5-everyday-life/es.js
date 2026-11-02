// Spanish for "What Shapes Your Everyday Life?" (Sociology Unit 2 Day 5). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same little HTML builders the page uses, so the keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const ev = (who, body) => `<span class="ev"><span class="who">${who}</span>${body}</span>`;
  const tm = (time, body) => `<span class="ev"><span class="who">🕒 ${time}</span>${body}</span>`;

  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "Jaylen's Tuesday | Sociology Unit 2 Day 5": "El martes de Jaylen | Sociología Unidad 2 Día 5",
      "Sociology · Unit 2 · Day 5": "Sociología · Unidad 2 · Día 5",
      "What Shapes Your Everyday Life?": "¿Qué le da forma a tu vida diaria?",
      "Describe the components of culture.": "Describir los componentes de la cultura.",
      "Analyze how culture influences individuals, including themselves.": "Analizar cómo la cultura influye en las personas, incluyéndote a ti mismo.",
      "Evaluate important social institutions and how they respond to social needs.": "Evaluar instituciones sociales importantes y cómo responden a las necesidades sociales.",
      "Goal:": "Meta:",
      "Explain how social institutions shape behavior through norms, values, and roles, and how they affect each other. · About 25 minutes.":
        "Explicar cómo las instituciones sociales influyen en el comportamiento por medio de normas, valores y roles, y cómo se afectan entre ellas. · Unos 25 minutos.",
      "Progress, day meter, and institutions found": "Progreso, medidor del día e instituciones encontradas",
      "Institutions found": "Instituciones encontradas",
      "Day meter:": "Medidor del día:",

      // Institution chips at the top (also answer choices)
      "Family": "Familia",
      "Education": "Educación",
      "Government": "Gobierno",
      "Media": "Medios",
      "Economy": "Economía",
      "Health care": "Salud",
      "Religion": "Religión",

      // ---------- Intro ----------
      "Start Jaylen's Tuesday": "Empezar el martes de Jaylen",
      "One ordinary Tuesday": "Un martes cualquiera",
      "The invisible strings": "Los hilos invisibles",
      "Meet <b>Jaylen</b>, 16, from Marion. Today is a normal Tuesday: school, work, family. But almost nothing Jaylen does is random.":
        "Te presentamos a <b>Jaylen</b>, de 16 años, de Marion. Hoy es un martes normal: liceo, trabajo, familia. Pero casi nada de lo que hace Jaylen es al azar.",
      "Big systems called <b>social institutions</b> pull on every part of the day. Your job: follow Jaylen hour by hour and spot all <b>7 institutions</b> (they light up at the top when you find them).":
        "Unos sistemas grandes llamados <b>instituciones sociales (social institutions)</b> jalan cada parte del día. Tu trabajo: sigue a Jaylen hora por hora y encuentra las <b>7 instituciones</b> (se iluminan arriba cuando las encuentras).",
      "🔎 Spot the institution behind each moment.": "🔎 Encuentra la institución que hay detrás de cada momento.",
      "🎯 Make 3 choices for Jaylen. Watch the <b>Day meter</b>.": "🎯 Toma 3 decisiones por Jaylen. Pendiente con el <b>Medidor del día</b>.",
      "✍️ Write 2 short answers and turn in.": "✍️ Escribe 2 respuestas cortas y entrega.",
      "Jaylen is made up. The rules and patterns are real.": "Jaylen es inventado. Las reglas y los patrones son reales.",

      // ---------- Part 1 ----------
      "Part 1 of 3 · 6:45–8:00 a.m.": "Parte 1 de 3 · 6:45–8:00 a.m.",
      "Morning": "La mañana",
      [`<p>A <b>social institution</b> is an organized system of rules, roles, and expectations that meets a basic need of society. It's <b>not just a building</b>.</p>
        <p>The big seven: <b>family</b> (identity, values), <b>education</b> (knowledge, skills), <b>religion</b> (morals, meaning), <b>government</b> (laws, order), <b>media</b> (news, trends), <b>economy</b> (jobs, money), and <b>health care</b> (well-being).</p>
        <p>The key idea: <b>people don't act randomly.</b> Institutions guide what we do.</p>`]:
        `<p>Una <b>institución social (social institution)</b> es un sistema organizado de reglas, roles y expectativas que cubre una necesidad básica de la sociedad. <b>No es solo un edificio</b>.</p>
        <p>Las siete grandes: <b>familia (family)</b>: identidad, valores. <b>Educación (education)</b>: conocimientos, habilidades. <b>Religión (religion)</b>: moral, sentido de la vida. <b>Gobierno (government)</b>: leyes, orden. <b>Medios (media)</b>: noticias, modas. <b>Economía (economy)</b>: trabajos, dinero. <b>Salud (health care)</b>: bienestar.</p>
        <p>La idea clave: <b>la gente no actúa al azar.</b> Las instituciones guían lo que hacemos.</p>`,

      [tm("6:50 a.m. · Kitchen", "Mom: \"Eat something before you go. And text me when you get to school.\"") + "Which institution is shaping Jaylen here?"]:
        tm("6:50 a.m. · Cocina", "Mamá: \"Come algo antes de irte. Y escríbeme cuando llegues al liceo.\"") + "¿Cuál institución está influyendo en Jaylen aquí?",
      "Who is setting the rule?": "¿Quién está poniendo la regla?",
      "Family is usually the first institution that teaches us rules and values, like checking in and taking care of yourself.":
        "La familia suele ser la primera institución que nos enseña reglas y valores, como avisar dónde estás y cuidarte.",

      [tm("7:05 a.m. · Scrolling in bed", "Six videos in a row about the same new shoes. By the sixth one, Jaylen kind of wants them.") + "Which institution is shaping what Jaylen wants?"]:
        tm("7:05 a.m. · Viendo el celular en la cama", "Seis videos seguidos sobre las mismas gomas nuevas. Para el sexto, a Jaylen como que ya le provocan.") + "¿Cuál institución está influyendo en lo que Jaylen quiere?",
      "Where did the shoe videos come from?": "¿De dónde salieron los videos de las gomas?",
      "Media shapes opinions and trends, including what people think is cool to buy.": "Los medios influyen en las opiniones y las modas, incluso en lo que la gente cree que está chévere comprar.",

      [tm("7:20 a.m. · Bus stop", "Jaylen's friend: \"Education is just the school building, right?\"") + "What would a sociologist say?"]:
        tm("7:20 a.m. · Parada del autobús", "Un pana de Jaylen: \"La educación es solo el edificio del liceo, ¿verdad?\"") + "¿Qué diría un sociólogo?",
      "It's a system of rules, roles, and expectations": "Es un sistema de reglas, roles y expectativas",
      "It's the school building plus its buses and lots": "Es el edificio del liceo más sus autobuses y terrenos",
      "It's just whatever each teacher wants each day": "Es solo lo que cada profesor quiera cada día",
      "It's only the classes students choose to take": "Son solo las clases que escogen los estudiantes",
      "Reread the first line of the teach box.": "Vuelve a leer la primera línea del cuadro de la lección.",
      "Education is the whole system: grades, attendance rules, the roles of teachers and students, diplomas. The building is just where it happens.":
        "La educación es todo el sistema: las notas, las reglas de asistencia, los roles de profesores y estudiantes, los títulos. El edificio es solo el lugar donde pasa.",

      [tm("7:52 a.m.", "The bus is 15 minutes late. First hour starts in 8 minutes.") + `<p>What does Jaylen do?</p>`]:
        tm("7:52 a.m.", "El autobús viene 15 minutos tarde. La primera hora de clase empieza en 8 minutos.") + `<p>¿Qué hace Jaylen?</p>`,
      "Walk in late and get a pass from the office": "Llegar tarde y pedir un pase en la oficina",
      "Skip first hour and grab breakfast instead": "Saltarse la primera hora e ir a desayunar",
      "Text Mom to call the school first": "Escribirle a mamá para que llame primero al liceo",
      [`<p>${T("up", "+1 day")}The office marks it "excused: bus late." The school has a rule for this, so Jaylen isn't in trouble.</p>`]:
        `<p>${T("up", "+1 al medidor")}La oficina lo anota como "justificado: autobús tarde". El liceo tiene una regla para esto, así que Jaylen no está en problemas.</p>`,
      [`<p>${T("down", "−2 day")}The school's system sends an automatic call home. Mom texts: "WHERE ARE YOU." Two institutions, school and family, react at once.</p>`]:
        `<p>${T("down", "−2 al medidor")}El sistema del liceo hace una llamada automática a la casa. Mamá escribe: "¿¿DÓNDE ESTÁS??". Dos instituciones, el liceo y la familia, reaccionan al mismo tiempo.</p>`,
      [`<p>${T("flat", "No change")}Mom is already at work and can't answer. Jaylen ends up late anyway, with no pass yet.</p>`]:
        `<p>${T("flat", "Sin cambio")}Mamá ya está en el trabajo y no puede responder. Jaylen termina llegando tarde igual, y todavía sin pase.</p>`,

      [ev("Iowa law", "In Iowa, children must attend school from age 6 until they turn 16. Parents can be fined if a child keeps missing school.") + "Which institution made this rule?"]:
        ev("Ley de Iowa", "En Iowa, los niños tienen que ir a la escuela desde los 6 años hasta que cumplen 16. A los padres les pueden poner una multa si un hijo sigue faltando.") + "¿Cuál institución hizo esta regla?",
      "Who makes laws and can give fines?": "¿Quién hace las leyes y puede poner multas?",
      "Government makes and enforces laws. This law also shapes two other institutions: education and family.":
        "El gobierno hace las leyes y las hace cumplir. Esta ley también influye en otras dos instituciones: la educación y la familia.",

      // ---------- Part 2 ----------
      "Part 2 of 3 · 8:00 a.m.–3:10 p.m.": "Parte 2 de 3 · 8:00 a.m.–3:10 p.m.",
      "School Day": "El día en el liceo",
      [`<p>Institutions shape us in three ways:</p>
        <ul><li><b>Norms</b>: rules for how to act. (Raise your hand.)</li><li><b>Values</b>: ideas about what matters. (Education is important.)</li><li><b>Roles</b>: the behavior expected from a position. (Student, employee, big brother.)</li></ul>
        <p>Over time we <b>internalize</b> them. They become part of us, so we follow them even when no one is watching.</p>`]:
        `<p>Las instituciones nos dan forma de tres maneras:</p>
        <ul><li><b>Normas (norms)</b>: reglas sobre cómo actuar. (Levanta la mano.)</li><li><b>Valores (values)</b>: ideas sobre lo que importa. (La educación es importante.)</li><li><b>Roles</b>: el comportamiento que se espera de una posición. (Estudiante, empleado, hermano mayor.)</li></ul>
        <p>Con el tiempo las <b>internalizamos (internalize)</b>. Se vuelven parte de nosotros, así que las seguimos aunque nadie esté mirando.</p>`,

      [tm("9:15 a.m. · 2nd hour", "Jaylen has an answer, but raises a hand and waits instead of shouting it.") + "Raising your hand before talking is a…"]:
        tm("9:15 a.m. · 2.ª hora", "Jaylen tiene una respuesta, pero levanta la mano y espera en vez de gritarla.") + "Levantar la mano antes de hablar es…",
      "Norm": "Una norma",
      "Value": "Un valor",
      "Role": "Un rol",
      "Institution": "Una institución",
      "Is it a rule for how to act, a belief, or a position?": "¿Es una regla sobre cómo actuar, una creencia o una posición?",
      "It's an expected way to act in class, so it's a norm.": "Es una forma esperada de actuar en clase, así que es una norma.",

      [tm("10:40 a.m. · Hallway poster", "\"EDUCATION OPENS DOORS.\"") + "The poster's message is a…"]:
        tm("10:40 a.m. · Afiche en el pasillo", "\"LA EDUCACIÓN ABRE PUERTAS.\"") + "El mensaje del afiche es…",
      "Sanction": "Una sanción",
      "Is it telling you how to act, or what's important?": "¿Te está diciendo cómo actuar, o qué es importante?",
      "It's a belief about what matters, so it's a value. Norms like going to class grow out of it.":
        "Es una creencia sobre lo que importa, así que es un valor. Normas como ir a clase nacen de él.",

      [ev("Jaylen's Tuesday", "Student at 9 a.m. Employee at 4 p.m. Big brother at 9 p.m.") + "Student, employee, and big brother are all…"]:
        ev("El martes de Jaylen", "Estudiante a las 9 a.m. Empleado a las 4 p.m. Hermano mayor a las 9 p.m.") + "Estudiante, empleado y hermano mayor son todos…",
      "Roles": "Roles",
      "Values": "Valores",
      "Norms": "Normas",
      "Institutions": "Instituciones",
      "Each one is a position with things people expect you to do.": "Cada uno es una posición con cosas que la gente espera que hagas.",
      "Each is a role, the behavior expected from a position. Each role comes from a different institution.":
        "Cada uno es un rol: el comportamiento que se espera de una posición. Cada rol viene de una institución distinta.",

      [tm("1:30 p.m. · 5th hour", "Phone buzzes. Mom: \"Plant cut my hours. We need to talk tonight.\" The class rule: phones stay in the pocket during class.") + `<p>What does Jaylen do?</p>`]:
        tm("1:30 p.m. · 5.ª hora", "Vibra el celular. Mamá: \"En la fábrica me recortaron las horas. Tenemos que hablar esta noche.\" La regla de la clase: el celular se queda en el bolsillo durante la clase.") + `<p>¿Qué hace Jaylen?</p>`,
      "Ask the teacher to step out and reply": "Pedirle permiso al profesor para salir y responder",
      "Text back under the desk": "Responder escondido debajo del pupitre",
      "Wait until passing time to answer": "Esperar al cambio de clase para responder",
      [`<p>${T("up", "+1 day")}The teacher says yes. Jaylen follows the norm AND takes care of family.</p>`]:
        `<p>${T("up", "+1 al medidor")}El profesor dice que sí. Jaylen sigue la norma Y cuida a su familia.</p>`,
      [`<p>${T("down", "−1 day")}The teacher takes the phone until the end of the day. That's a <b>sanction</b>, a punishment for breaking a norm.</p>`]:
        `<p>${T("down", "−1 al medidor")}El profesor le quita el celular hasta el final del día. Eso es una <b>sanción (sanction)</b>: un castigo por romper una norma.</p>`,
      [`<p>${T("flat", "No change")}No trouble, but Jaylen can't focus for the rest of class.</p>`]:
        `<p>${T("flat", "Sin cambio")}No hay problemas, pero Jaylen no se puede concentrar el resto de la clase.</p>`,

      [tm("2:55 p.m. · Sub day", "The sub isn't paying attention. Jaylen still puts the chair on the desk at the end of class, like always.") + "What does this show?"]:
        tm("2:55 p.m. · Día con suplente", "El profesor suplente no está prestando atención. Igual Jaylen sube la silla al pupitre al final de la clase, como siempre.") + "¿Qué muestra esto?",
      "Jaylen has internalized the norm": "Jaylen ha internalizado la norma",
      "Jaylen is breaking a school norm": "Jaylen está rompiendo una norma del liceo",
      "Jaylen is changing the institution": "Jaylen está cambiando la institución",
      "Jaylen is scared of the sub": "Jaylen le tiene miedo al suplente",
      "Nobody is checking. Why do it anyway?": "Nadie está revisando. ¿Por qué lo hace igual?",
      "When a rule becomes a habit you follow without being watched, you've internalized it. That's how institutions guide behavior without force.":
        "Cuando una regla se vuelve un hábito que sigues sin que nadie te vea, la has internalizado. Así es como las instituciones guían el comportamiento sin usar la fuerza.",

      // ---------- Part 3 ----------
      "Part 3 of 3 · 3:10–10:00 p.m.": "Parte 3 de 3 · 3:10–10:00 p.m.",
      "It's All Connected": "Todo está conectado",
      [`<p>Institutions are <b>connected</b>. When one changes, the others feel it.</p>
        <p>Sociologists also look at <b>patterns</b>. One student failing may be a personal issue. Many students failing is a <b>system</b> issue, so look at things like resources, teaching, money, and family support.</p>`]:
        `<p>Las instituciones están <b>conectadas</b>. Cuando una cambia, las demás lo sienten.</p>
        <p>Los sociólogos también se fijan en los <b>patrones (patterns)</b>. Que un estudiante raspe puede ser un problema personal. Que muchos estudiantes raspen es un problema del <b>sistema</b>, así que hay que mirar cosas como los recursos, la enseñanza, el dinero y el apoyo de la familia.</p>`,

      [ev("The chain", "The plant cuts Mom's hours → Mom picks up a second job at night → Jaylen babysits his little sister after school → Jaylen misses tutoring.") + "Which institution started this chain?"]:
        ev("La cadena", "La fábrica le recorta las horas a mamá → Mamá consigue un segundo trabajo de noche → Jaylen cuida a su hermanita después de clases → Jaylen falta a las tutorías.") + "¿Cuál institución empezó esta cadena?",
      "Look at the first link: what happened at the plant?": "Mira el primer eslabón: ¿qué pasó en la fábrica?",
      "Jobs and money are the economy. One change there rippled into family and education.":
        "Los trabajos y el dinero son la economía. Un cambio ahí se extendió a la familia y a la educación.",

      [tm("6:00 p.m. · Grocery store shift", "Jaylen's manager: \"Can you stay until 10? We're short.\" That's $45 more. But there's a chemistry test tomorrow.") + `<p>What does Jaylen do?</p>`]:
        tm("6:00 p.m. · Turno en el supermercado", "El encargado de Jaylen: \"¿Te puedes quedar hasta las 10? Nos falta gente.\" Son $45 más. Pero mañana hay examen de química.") + `<p>¿Qué hace Jaylen?</p>`,
      "Stay until 10. The family needs the money.": "Quedarse hasta las 10. La familia necesita el dinero.",
      "Say no and go home to study": "Decir que no e irse a estudiar",
      "Offer to stay until 8 instead": "Ofrecer quedarse solo hasta las 8",
      [`<p>${T("down", "−1 day")}The extra pay helps at home. Jaylen gets to bed at midnight and feels tired on the test. The economy pulled harder than education.</p>`]:
        `<p>${T("down", "−1 al medidor")}La plata extra ayuda en la casa. Jaylen se acuesta a medianoche y está cansado en el examen. La economía jaló más fuerte que la educación.</p>`,
      [`<p>${T("up", "+1 day")}Jaylen feels ready for the test, but the manager seems annoyed. Will that cost hours later?</p>`]:
        `<p>${T("up", "+1 al medidor")}Jaylen se siente listo para el examen, pero el encargado parece molesto. ¿Le costará horas de trabajo más adelante?</p>`,
      [`<p>${T("up", "+1 day")}The manager agrees. Some money, some study time. A middle path between two institutions.</p>`]:
        `<p>${T("up", "+1 al medidor")}El encargado acepta. Algo de plata, algo de tiempo para estudiar. Un punto medio entre dos instituciones.</p>`,

      [ev("Kitchen table, 9 p.m.", "Jaylen's sister has asthma. Her health insurance comes through Mom's job. With fewer hours, Mom might lose it.") + "Which two institutions are connected here?"]:
        ev("Mesa de la cocina, 9 p.m.", "La hermana de Jaylen tiene asma. Su seguro médico viene por el trabajo de mamá. Con menos horas, mamá podría perderlo.") + "¿Cuáles dos instituciones están conectadas aquí?",
      "Economy and health care": "Economía y salud",
      "Religion and media": "Religión y medios",
      "Government and religion": "Gobierno y religión",
      "Media and education": "Medios y educación",
      "Where does the insurance come from, and what does it pay for?": "¿De dónde viene el seguro, y qué paga?",
      "In the U.S., many people get health insurance through work. So the economy and health care are tightly linked.":
        "En EE. UU., mucha gente tiene seguro médico por su trabajo. Así que la economía y la salud están muy unidas.",

      [tm("9:30 p.m. · Text from cousin Ana", "\"Can't hang Friday, I volunteer at my church's food pantry. It's how I was raised: help people who need it.\"") + "Which institution is shaping Ana's values?"]:
        tm("9:30 p.m. · Mensaje de la prima Ana", "\"No puedo salir el viernes, soy voluntaria en el banco de comida de mi iglesia. Así me criaron: ayudar a la gente que lo necesita.\"") + "¿Cuál institución está influyendo en los valores de Ana?",
      "Where did Ana learn to help others?": "¿Dónde aprendió Ana a ayudar a otros?",
      "Religion teaches morals and meaning, like helping people in need. It also meets a social need here: food.":
        "La religión enseña moral y sentido de la vida, como ayudar a quien lo necesita. Aquí también cubre una necesidad social: la comida.",

      [ev("School data (made-up example)", "Last year: 3 of 90 students failed Algebra 1.<br>This year, after the district cut after-school tutoring: 31 of 90 failed.") + "What would a sociologist say?"]:
        ev("Datos del liceo (ejemplo inventado)", "El año pasado: 3 de 90 estudiantes rasparon Álgebra 1.<br>Este año, después de que el distrito quitó las tutorías después de clases: rasparon 31 de 90.") + "¿Qué diría un sociólogo?",
      "So many failing points to a system cause": "Que tantos raspen apunta a una causa del sistema",
      "31 students all decided not to try hard this year": "31 estudiantes decidieron no esforzarse este año",
      "It's just bad luck that will fix itself next year": "Es solo mala suerte y se arreglará el próximo año",
      "Algebra 1 must be too hard for most teens": "Álgebra 1 debe ser muy difícil para casi todos",
      "Is this one person, or a pattern? What changed?": "¿Es una persona, o es un patrón? ¿Qué cambió?",
      "When many people struggle at once, look at the system. Here, losing tutoring is a likely cause to study.":
        "Cuando a mucha gente le va mal al mismo tiempo, mira el sistema. Aquí, perder las tutorías es una causa probable que vale la pena estudiar.",

      [ev("Two students, same grades", "<b>Student A's</b> school offers free college classes and a welding certificate.<br><b>Student B's</b> school offers neither.") + "What does this show about institutions?"]:
        ev("Dos estudiantes, mismas notas", "El liceo del <b>estudiante A</b> ofrece clases universitarias gratis y un certificado de soldadura.<br>El liceo del <b>estudiante B</b> no ofrece ninguna de las dos.") + "¿Qué muestra esto sobre las instituciones?",
      "What they offer can open or close doors": "Lo que ofrecen puede abrir o cerrar puertas",
      "Grades are the only thing that matters": "Las notas son lo único que importa",
      "Opportunities depend only on effort": "Las oportunidades dependen solo del esfuerzo",
      "Schools have no effect on future jobs": "Los liceos no afectan los trabajos futuros",
      "The grades are the same. What's different?": "Las notas son iguales. ¿Qué es diferente?",
      "Institutions affect opportunities. The same effort can lead to different chances depending on what schools, jobs, and government offer.":
        "Las instituciones afectan las oportunidades. El mismo esfuerzo puede llevar a oportunidades distintas según lo que ofrezcan los liceos, los trabajos y el gobierno.",

      // ---------- Finale ----------
      "Pull the Strings": "Jala los hilos",
      "Every choice played out inside the rules of family, school, work, and more. None of it was random.":
        "Cada decisión pasó dentro de las reglas de la familia, el liceo, el trabajo y más. Nada fue al azar.",
      "Answer both in 1–2 full sentences.": "Responde las dos con 1–2 oraciones completas.",
      "1. Which institution shaped YOUR day most today? Give one norm and one role it gave you.":
        "1. ¿Cuál institución influyó más en TU día de hoy? Da una norma y un rol que te dio.",
      "The institution that shaped my day most was ___. One norm was ___. My role was ___.":
        "La institución que más influyó en mi día fue ___. Una norma fue ___. Mi rol fue ___.",
      "In answer 1, name an institution, one norm (a rule), and one role (like student or employee).":
        "En la respuesta 1, nombra una institución, una norma (una regla) y un rol (como estudiante o empleado).",
      "2. Explain how one institution affected another in Jaylen's day.":
        "2. Explica cómo una institución afectó a otra en el día de Jaylen.",
      "In Jaylen's day, the ___ affected the ___ because ___.":
        "En el día de Jaylen, ___ afectó a ___ porque ___.",
      "In answer 2, name the institutions AND explain how one affected the other (use \"because\").":
        "En la respuesta 2, nombra las instituciones Y explica cómo una afectó a la otra (usa \"porque\").",

      // ---------- Short names (shown in "Next:", "✓" and writing messages) ----------
      "Institution that shaped my day (norm + role)": "La institución que influyó en mi día (norma + rol)",
      "How one institution affected another": "Cómo una institución afectó a otra"
    },
    patterns: [
      { re: /^Jaylen's Day meter ended at (\d+)\/10\.$/, es: "El Medidor del día de Jaylen terminó en $1/10." }
    ],
    writing: {
      mine: [
        ["familia", "liceo", "escuela", "colegio", "educaci", "gobierno", "ley", "medios", "redes", "economia", "trabajo", "empleo", "religion", "iglesia", "salud"],
        ["norma", "regla"],
        ["rol", "papel"]
      ],
      chain: [
        ["economia", "trabajo", "empleo", "fabrica", "planta", "familia", "mama", "liceo", "escuela", "educaci", "salud", "seguro", "gobierno", "ley", "medios", "religion"],
        ["porque", "asi que", "lo que", "llevo", "causo", "hizo", "provoco", "por eso", "entonces"]
      ]
    }
  });
})();
