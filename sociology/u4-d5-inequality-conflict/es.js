// Spanish for "Kettle Creek on Edge" (Sociology Unit 4 Day 5). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
// Keys are matched one paragraph at a time (or one piece of text), so most keys are short.
(function () {
  const NAME = "<b>Name it:</b> ";
  const NAME_ES = "<b>Ponle nombre:</b> ";

  const dict = {
    // ---------- Page frame ----------
    "Kettle Creek on Edge | Sociology Unit 4 Day 5": "Kettle Creek al límite | Sociología Unidad 4 Día 5",
    "Sociology · Unit 4 · Day 5": "Sociología · Unidad 4 · Día 5",
    "Kettle Creek on Edge": "Kettle Creek al límite",
    "Analyze the effects of social inequality on groups and individuals.": "Analizar los efectos de la desigualdad social en los grupos y en las personas.",
    "Goal:": "Meta:",
    "Explain how inequality can turn into social problems and conflict between groups, using real data and conflict theory. · About 25 minutes.": "Explicar cómo la desigualdad puede convertirse en problemas sociales y en conflictos entre grupos, usando datos reales y la teoría del conflicto. · Unos 25 minutos.",
    "Progress, town tension, and Courier readers": "Progreso, tensión del pueblo y lectores del Courier",
    "Town tension:": "Tensión del pueblo:",
    "Courier readers:": "Lectores del Courier:",

    // ---------- Intro ----------
    "Take the assignment": "Aceptar el encargo",
    "Breaking news · Kettle Creek, Iowa": "Última hora · Kettle Creek, Iowa",
    "A town on edge": "Un pueblo al límite",
    "Back from break? Here's what you missed": "¿Vuelves de vacaciones? Esto es lo que te perdiste",
    "Society is ranked in layers (<b>stratification</b>), and your layer shapes your <b>life chances</b>, like Jess's bad day. Institutions like schools, housing, and jobs can widen or shrink those gaps, here and around the world.":
      "La sociedad está ordenada en capas (<b>estratificación</b>), y tu capa influye en tus <b>oportunidades de vida</b>, como en el mal día de Jess. Instituciones como las escuelas, la vivienda y los trabajos pueden agrandar o achicar esas brechas, aquí y en todo el mundo.",
    "NEWS ALERT · Kettle Creek Courier": "ALERTA DE NOTICIAS · Kettle Creek Courier",
    "Prairie Gear Works will cut <b>400 jobs</b> by March. The same week, rents at 3 big apartment complexes jump <b>$300 a month</b>.":
      "Prairie Gear Works va a eliminar <b>400 empleos</b> antes de marzo. Esa misma semana, el alquiler en 3 complejos grandes de apartamentos sube <b>$300 al mes</b>.",
    "You're the Courier's newest reporter. People in town are starting to turn on each other. Your editor's assignment: find out <b>why</b>, and get it right.":
      "Eres la persona más nueva del equipo de reporteros del Courier. La gente del pueblo está empezando a pelearse entre sí. El encargo de tu editora: averiguar <b>por qué</b>, y hacerlo bien.",
    "1. Make 4 big reporting calls. Watch the town's tension.": "1. Toma 4 decisiones grandes como reportero. Mira la tensión del pueblo.",
    "2. Check real facts before you print.": "2. Revisa los hechos reales antes de publicar.",
    "3. Write your front page.": "3. Escribe tu portada.",
    "About 25 minutes · 11 checks · 2 short answers": "Unos 25 minutos · 11 preguntas · 2 respuestas cortas",
    "Today's goal:": "Meta de hoy:",
    "figure out how inequality turns into problems and fights between groups.": "descubrir cómo la desigualdad se convierte en problemas y peleas entre grupos.",
    "Kettle Creek, the Courier, Prairie Gear, Northline, @KCtea, and the people you meet are made up. Every case file and statistic is real, with its source.":
      "Kettle Creek, el Courier, Prairie Gear, Northline, @KCtea y las personas que conoces son inventados. Cada caso real y cada estadística son reales, con su fuente.",

    // ---------- Shared bits in results ----------
    "Tension holds": "La tensión sigue igual",
    "No new readers": "Sin lectores nuevos",
    "Caused by:": "Causado por:",

    // ---------- Part 1 ----------
    "Part 1 of 3 · Monday": "Parte 1 de 3 · Lunes",
    "The Shrinking Pie": "El pastel que se achica",
    "TEXT FROM YOUR EDITOR": "MENSAJE DE TU EDITORA",
    "The food pantry line wrapped around the block today. 300 families. Last month it was 150. Go.": "Hoy la fila del banco de comida le daba la vuelta a la cuadra. 300 familias. El mes pasado eran 150. Ve.",
    "@KCtea · 4,100 views": "@KCtea · 4,100 vistas",
    "Pantry's packed with people who don't even work. Go get a job lol": "El banco de comida está lleno de gente que ni trabaja. Consíganse un trabajo jaja",
    "At the pantry you meet <b>Dana</b>, who just got laid off after <b>26 years</b> at Prairie Gear, and <b>Marisol</b>, who cares for older people in their homes. Her rent just went up $300.":
      "En el banco de comida conoces a <b>Dana</b>, a quien acaban de despedir después de <b>26 años</b> en Prairie Gear, y a <b>Marisol</b>, que cuida a personas mayores en sus casas. Le acaban de subir el alquiler $300.",
    "Your first story is due at 6 p.m. What do you lead with?": "Tu primera noticia se entrega a las 6 p.m. ¿Con qué empiezas?",
    "Photos of families in the pantry line, with their stories": "Fotos de familias en la fila del banco de comida, con sus historias",
    "The numbers: 400 jobs cut, rent up $300, pantry visits doubled": "Los números: 400 empleos menos, alquiler $300 más caro, el doble de visitas al banco de comida",
    "An interview with Prairie Gear about why the jobs are going": "Una entrevista con Prairie Gear sobre por qué se van los empleos",
    "Lots of people share it. But a dad in one photo gets teased at his kid's school. Two families say they won't talk to the Courier again.":
      "Mucha gente la comparte. Pero a un papá que sale en una foto se burlan de él en la escuela de su hijo. Dos familias dicen que no van a volver a hablar con el Courier.",
    "many people feel shame about needing help, even when it isn't their fault.": "mucha gente siente vergüenza de necesitar ayuda, aunque no sea su culpa.",
    "The facts are solid, and some readers stop blaming pantry families. But numbers don't spread like a joke. @KCtea's post hits 9,000 views.":
      "Los datos son sólidos, y algunos lectores dejan de culpar a las familias del banco de comida. Pero los números no se comparten como un chiste. La publicación de @KCtea llega a 9,000 vistas.",
    "a joke spreads faster than a chart.": "un chiste se comparte más rápido que una gráfica.",
    "The company says orders dropped and costs went up. Laid-off workers are furious. They say your story took the company's side.":
      "La compañía dice que bajaron los pedidos y subieron los costos. Los trabajadores despedidos están furiosos. Dicen que tu noticia se puso del lado de la compañía.",
    "the two groups see the same job cuts in very different ways.": "los dos grupos ven los mismos despidos de maneras muy distintas.",
    [NAME + "A <b>social problem</b> is an issue that hurts large numbers of people, like poverty, hunger, homelessness, or crime. In plain words: 300 families at the pantry isn't 300 people with bad luck. It's a pattern."]:
      NAME_ES + "Un <b>problema social (social problem)</b> es un asunto que daña a muchísimas personas, como la pobreza, el hambre, la falta de vivienda o el crimen. En palabras simples: 300 familias en el banco de comida no son 300 personas con mala suerte. Es un patrón.",
    "Which of these is a <b>social problem</b>, not just one person's bad day?": "¿Cuál de estos es un <b>problema social</b>, y no solo el mal día de una persona?",
    "Hundreds of families in town can't afford rent": "Cientos de familias del pueblo no pueden pagar el alquiler",
    "One student's phone charger breaks during class": "Se rompe el cargador del celular de un estudiante en clase",
    "A friend loses a video game and gets upset": "Un amigo pierde en un videojuego y se enoja",
    "One driver gets a flat tire on the way home": "A un conductor se le poncha una llanta camino a casa",
    "Reread the Name it box. A social problem hurts large numbers of people.": "Vuelve a leer el cuadro Ponle nombre. Un problema social daña a muchísimas personas.",
    "When lots of people face the same problem, it's a social problem. In Unit 1, C. Wright Mills called this a public issue, not just a personal trouble.":
      "Cuando mucha gente enfrenta el mismo problema, es un problema social. En la Unidad 1, C. Wright Mills lo llamó un asunto público, no solo un problema personal.",
    "U.S. Department of Housing and Urban Development (HUD), 2025 report": "Departamento de Vivienda y Desarrollo Urbano de EE. UU. (HUD), informe de 2025",
    "On one night in January 2025, <b>745,652</b> people in the U.S. were homeless. That's more than 5 times the number of people who live in Cedar Rapids.":
      "Una noche de enero de 2025, <b>745,652</b> personas en EE. UU. no tenían hogar. Son más de 5 veces la cantidad de gente que vive en Cedar Rapids.",
    "High rent, low pay, and job loss can all play a part.": "El alquiler alto, los sueldos bajos y la pérdida de empleo pueden influir.",
    "Kettle Creek just got job cuts AND a rent spike. Based on the HUD card, why should the town worry?": "Kettle Creek acaba de recibir despidos Y una subida del alquiler. Según la tarjeta de HUD, ¿por qué debería preocuparse el pueblo?",
    "Job loss and high rent can push people into homelessness": "Perder el empleo y el alquiler alto pueden dejar a la gente sin hogar",
    "Homelessness only happens in giant cities like Chicago or LA": "La falta de vivienda solo pasa en ciudades enormes como Chicago o Los Ángeles",
    "Job cuts make rent go down, so homelessness drops fast": "Los despidos bajan el alquiler, así que la falta de vivienda baja rápido",
    "The HUD card says homelessness isn't about money": "La tarjeta de HUD dice que la falta de vivienda no tiene que ver con el dinero",
    "Reread the last line of the HUD card. Which causes does it list?": "Vuelve a leer la última línea de la tarjeta de HUD. ¿Qué causas menciona?",
    "HUD says high rent, low pay, and job loss can all play a part. Kettle Creek got two of those in the same week.": "HUD dice que el alquiler alto, los sueldos bajos y la pérdida de empleo pueden influir. Kettle Creek recibió dos de esas cosas en la misma semana.",
    "@KCtea says pantry families are there because they won't work. Which fact from today shows that blame is wrong?": "@KCtea dice que las familias del banco de comida están allí porque no quieren trabajar. ¿Qué dato de hoy muestra que esa culpa está mal?",
    "Dana worked 26 years before the job cuts hit": "Dana trabajó 26 años antes de los despidos",
    "The pantry only helps people from other towns": "El banco de comida solo ayuda a gente de otros pueblos",
    "The pantry line got shorter than last month": "La fila del banco de comida es más corta que el mes pasado",
    "Marisol's rent went down by $300 this week": "A Marisol le bajaron el alquiler $300 esta semana",
    "Look back at who you met at the pantry and what happened to them.": "Recuerda a quién conociste en el banco de comida y qué les pasó.",
    "Dana worked for 26 years and lost her job in a cut she didn't cause. Blaming people is easy. The cause here is a pattern: fewer jobs and higher rent.":
      "Dana trabajó 26 años y perdió su empleo en un recorte que ella no causó. Culpar a la gente es fácil. La causa aquí es un patrón: menos empleos y alquileres más altos.",

    // ---------- Part 2 ----------
    "Part 2 of 3 · Wednesday": "Parte 2 de 3 · Miércoles",
    "Who Gets Hit Hardest?": "¿A quién le pega más duro?",
    "<b>You interview three people.</b> Same town. Same bad month. It hits each of them differently.": "<b>Entrevistas a tres personas.</b> El mismo pueblo. El mismo mal mes. A cada una le pega de forma distinta.",
    "Worked the line at Prairie Gear for 26 years. Laid off. No college degree. Her health insurance ends in 30 days.": "Trabajó en la línea de Prairie Gear por 26 años. Despedida. Sin título universitario. Su seguro médico se acaba en 30 días.",
    "Cares for older people at home, $15 an hour. Single mom of two. Her rent just jumped from $950 to $1,250.": "Cuida a personas mayores en casa, $15 por hora. Mamá soltera de dos. Su alquiler acaba de subir de $950 a $1,250.",
    "Junior at Kettle Creek High. Works at a gas station. His family may move in with his aunt, so he'd switch schools.": "Estudiante de 11.º grado en Kettle Creek High. Trabaja en una gasolinera. Su familia quizás se mude con su tía, así que cambiaría de escuela.",
    "YOUR EDITOR": "TU EDITORA",
    "We have room for ONE front-page profile (a story about one person). Who leads?": "Tenemos espacio para UN perfil en la portada (una historia sobre una persona). ¿Quién va primero?",
    "Dana, the laid-off worker": "Dana, la trabajadora despedida",
    "Marisol, the home care worker": "Marisol, la cuidadora a domicilio",
    "Trey, the high school junior": "Trey, el estudiante de 11.º grado",
    "Laid-off workers feel seen. But renters post that the Courier only cares about \"plant guys.\" Marisol's neighbors stop answering your calls.":
      "Los trabajadores despedidos se sienten escuchados. Pero los inquilinos publican que al Courier solo le importan \"los de la fábrica\". Los vecinos de Marisol dejan de contestarte.",
    "when one group's pain gets the spotlight, other groups can feel ignored.": "cuando el dolor de un grupo se lleva toda la atención, otros grupos se pueden sentir ignorados.",
    "Renters share it everywhere. But some laid-off workers post, \"At least she still has a job.\"": "Los inquilinos la comparten por todas partes. Pero algunos trabajadores despedidos publican: \"Por lo menos ella todavía tiene trabajo\".",
    "two hurting groups started comparing their pain instead of looking at causes.": "dos grupos que sufren empezaron a comparar su dolor en vez de buscar las causas.",
    "Students at the high school share it nonstop. But Trey's mom is upset. Now the whole town knows they might lose their home.": "Los estudiantes de la escuela la comparten sin parar. Pero la mamá de Trey está molesta. Ahora todo el pueblo sabe que podrían perder su casa.",
    "kids feel the costs of inequality too, even when it's the adults' jobs and rent.": "los chicos también sienten los costos de la desigualdad, aunque sean los empleos y el alquiler de los adultos.",
    [NAME + "<b>Intersectionality</b> (named by law professor Kimberlé Crenshaw in 1989) means parts of who you are, like race, gender, and class, can work together to shape your chances. In plain words: Marisol gets hit as a low-paid worker, a renter, and a single mom, all at once."]:
      NAME_ES + "La <b>interseccionalidad (intersectionality)</b> (nombrada por la profesora de derecho Kimberlé Crenshaw en 1989) significa que partes de quién eres, como la raza, el género y la clase, pueden juntarse para influir en tus oportunidades. En palabras simples: a Marisol le pega como trabajadora con sueldo bajo, como inquilina y como mamá soltera, todo a la vez.",
    "Marisol is hit as a low-paid worker, a renter, and a single mom, all at once. Which idea explains that?": "A Marisol le pega como trabajadora con sueldo bajo, como inquilina y como mamá soltera, todo a la vez. ¿Qué idea explica eso?",
    "Intersectionality": "Interseccionalidad",
    "Conflict theory": "Teoría del conflicto",
    "Cultural relativism": "Relativismo cultural",
    "Redlining": "Líneas rojas (redlining)",
    "Reread the Name it box under your profile choice.": "Vuelve a leer el cuadro Ponle nombre debajo del perfil que escogiste.",
    "Intersectionality means parts of who you are, like gender and class, can combine to shape your chances. Marisol's problems stack because of several parts of her life at once.":
      "La interseccionalidad significa que partes de quién eres, como el género y la clase, se pueden combinar para influir en tus oportunidades. Los problemas de Marisol se acumulan por varias partes de su vida a la vez.",
    "Federal Reserve, 2022 data · wealth of the typical family": "Reserva Federal, datos de 2022 · riqueza de la familia típica",
    "<b>Wealth</b> = what you own minus what you owe. It's a family's cushion.": "<b>Riqueza</b> = lo que tienes menos lo que debes. Es el colchón de una familia.",
    "White families": "Familias blancas",
    "Hispanic families": "Familias hispanas",
    "Black families": "Familias negras",
    "<b>Redlining:</b> in the 1930s, government maps marked many Black neighborhoods in red as \"risky.\" Banks often wouldn't lend there, so families couldn't buy homes. Homes build wealth, and wealth gets passed down.":
      "<b>Redlining (líneas rojas):</b> en los años 1930, mapas del gobierno marcaron en rojo muchos barrios negros como \"riesgosos\". Muchas veces los bancos no prestaban dinero allí, así que las familias no podían comprar casa. Las casas crean riqueza, y la riqueza pasa a los hijos.",
    "Group numbers don't describe every family.": "Los números de un grupo no describen a cada familia.",
    "Based on the card, why does the racial wealth gap still exist today?": "Según la tarjeta, ¿por qué todavía existe hoy la brecha racial de riqueza?",
    "Past barriers blocked wealth that gets passed down": "Barreras del pasado bloquearon riqueza que pasa de padres a hijos",
    "Every group has had the same chance to own a home": "Todos los grupos han tenido la misma oportunidad de tener casa",
    "Some groups choose to save less money every year": "Algunos grupos escogen ahorrar menos dinero cada año",
    "Wealth gaps fade away in one generation on their own": "Las brechas de riqueza desaparecen solas en una generación",
    "Reread the redlining part. What did it block, and what gets passed down?": "Vuelve a leer la parte de las líneas rojas. ¿Qué bloqueó, y qué pasa de padres a hijos?",
    "Redlining kept many Black families from buying homes. Homes build wealth, and wealth passes to the next generation. So a past barrier still shows up in today's numbers.":
      "Las líneas rojas impidieron que muchas familias negras compraran casa. Las casas crean riqueza, y la riqueza pasa a la siguiente generación. Por eso una barrera del pasado todavía aparece en los números de hoy.",
    "Bureau of Labor Statistics, 2025 · typical weekly pay, all full-time workers": "Oficina de Estadísticas Laborales, 2025 · sueldo semanal típico, todos los trabajadores de tiempo completo",
    "Men": "Hombres",
    "Women": "Mujeres",
    "Women made about <b>82 cents</b> for every dollar men made. Causes include different kinds of jobs, time off to care for kids or family, social expectations, and discrimination.":
      "Las mujeres ganaron unos <b>82 centavos</b> por cada dólar que ganaron los hombres. Las causas incluyen distintos tipos de trabajo, tiempo libre para cuidar a otros, expectativas sociales y discriminación.",
    "Your editor wants this headline: <b>\"Women Paid 18% Less for the Same Job!\"</b> What's wrong with it?": "Tu editora quiere este titular: <b>\"¡A las mujeres les pagan 18% menos por el mismo trabajo!\"</b> ¿Qué tiene de malo?",
    "The 82% compares all jobs, not the same job": "El 82% compara todos los trabajos, no el mismo trabajo",
    "The BLS card says women earn more than men": "La tarjeta de BLS dice que las mujeres ganan más que los hombres",
    "The card is only about part-time workers": "La tarjeta solo habla de trabajadores de medio tiempo",
    "The card shows there's no gap in pay at all": "La tarjeta muestra que no hay ninguna brecha de sueldo",
    "Read the card's label. Does it compare people in the same job, or all full-time workers?": "Lee el título de la tarjeta. ¿Compara a gente en el mismo trabajo, o a todos los trabajadores de tiempo completo?",
    "The 82% is a real gap with several causes. But it compares ALL full-time women and men, so by itself it doesn't prove a woman is paid less for the same job. That has been illegal since the Equal Pay Act of 1963.":
      "El 82% es una brecha real con varias causas. Pero compara a TODAS las mujeres y TODOS los hombres de tiempo completo, así que por sí solo no prueba que a una mujer le paguen menos por el mismo trabajo. Eso es ilegal desde la Ley de Igualdad Salarial de 1963.",
    "Study of tax records for millions of Americans (Raj Chetty and others, 2016)": "Estudio de los registros de impuestos de millones de estadounidenses (Raj Chetty y otros, 2016)",
    "Men in the richest 1% lived about <b>14.6 years</b> longer than men in the poorest 1%. For women, the gap was about <b>10.1 years</b>.": "Los hombres del 1% más rico vivieron unos <b>14.6 años</b> más que los hombres del 1% más pobre. En las mujeres, la diferencia fue de unos <b>10.1 años</b>.",
    "Dana's health insurance ends in 30 days. What did this study find about money and health?": "El seguro médico de Dana se acaba en 30 días. ¿Qué encontró este estudio sobre el dinero y la salud?",
    "The richest lived years longer than the poorest": "Los más ricos vivieron años más que los más pobres",
    "Income made no difference in how long people live": "El ingreso no cambió cuánto vive la gente",
    "The poorest lived longer because of less stress": "Los más pobres vivieron más porque tenían menos estrés",
    "Only women's lifespans were linked to income": "Solo la vida de las mujeres tuvo relación con el ingreso",
    "Look at the two numbers on the card. Who lived longer?": "Mira los dos números de la tarjeta. ¿Quién vivió más?",
    "Money can't buy life, but it buys things that protect it: healthy food, safe housing, less stress, and health care. Losing a job AND insurance, like Dana, is a health problem too.":
      "El dinero no compra la vida, pero compra cosas que la protegen: comida sana, vivienda segura, menos estrés y atención médica. Perder el empleo Y el seguro, como Dana, también es un problema de salud.",

    // ---------- Part 3 ----------
    "Part 3 of 3 · Friday": "Parte 3 de 3 · Viernes",
    "Why Is Kettle Creek Fighting?": "¿Por qué pelea Kettle Creek?",
    "The 600 workers still at Prairie Gear vote to <b>strike</b>. Their <b>union</b> (a group of workers who bargain together) says pay hasn't kept up with prices while the company made money. The company says it has to cut costs to survive.":
      "Los 600 trabajadores que quedan en Prairie Gear votan por hacer <b>huelga</b>. Su <b>sindicato</b> (un grupo de trabajadores que negocian juntos) dice que los sueldos no han subido al ritmo de los precios mientras la compañía ganaba dinero. La compañía dice que tiene que recortar costos para sobrevivir.",
    "Strike day. You get ONE interview before the 6 p.m. deadline.": "Día de huelga. Tienes UNA entrevista antes de la entrega de las 6 p.m.",
    "Strikers marching outside the plant": "Los huelguistas que marchan afuera de la fábrica",
    "Prairie Gear's spokesperson (the person who speaks for the company)": "El vocero de Prairie Gear (la persona que habla por la compañía)",
    "Quick quotes from both sides, even if you're late": "Citas rápidas de los dos lados, aunque llegues tarde",
    "Workers say, \"We built this company. We want our fair share.\" Prairie Gear stops returning your calls. Your story only shows one side.":
      "Los trabajadores dicen: \"Nosotros construimos esta compañía. Queremos nuestra parte justa\". Prairie Gear deja de devolverte las llamadas. Tu noticia solo muestra un lado.",
    "each side wants the paper to tell its version.": "cada lado quiere que el periódico cuente su versión.",
    "The company says, \"If costs keep rising, we lose orders, and more jobs.\" Strikers start calling the Courier \"the company paper.\"":
      "La compañía dice: \"Si los costos siguen subiendo, perdemos pedidos, y más empleos\". Los huelguistas empiezan a llamar al Courier \"el periódico de la compañía\".",
    "Your story is fair, but it's late. @KCtea posts first: \"Strikers are trashing the plant!\" It isn't true. 6,000 people see it before your story goes up.":
      "Tu noticia es justa, pero llega tarde. @KCtea publica primero: \"¡Los huelguistas están destrozando la fábrica!\" No es cierto. 6,000 personas lo ven antes de que salga tu noticia.",
    "when real news is slow, rumors fill the gap.": "cuando las noticias reales tardan, los rumores llenan el hueco.",
    [NAME + "<b>Conflict theory</b> (from Karl Marx) says groups compete for <b>scarce</b> resources (things there isn't enough of), like money, jobs, and power. Groups on top try to keep their advantages. Groups below push back. In plain words: when the pie shrinks, people fight over the slices."]:
      NAME_ES + "La <b>teoría del conflicto (conflict theory)</b> (de Karl Marx) dice que los grupos compiten por recursos <b>escasos</b> (cosas que no alcanzan para todos), como el dinero, los empleos y el poder. Los grupos de arriba tratan de mantener sus ventajas. Los grupos de abajo se resisten. En palabras simples: cuando el pastel se achica, la gente pelea por los pedazos.",
    "Case file: the John Deere strike, Iowa, 2021 (real)": "Caso real: la huelga de John Deere, Iowa, 2021",
    "On October 14, 2021, more than <b>10,000</b> John Deere workers in the United Auto Workers union went on strike. Many of them worked at Iowa plants, like the one in Ankeny.":
      "El 14 de octubre de 2021, más de <b>10,000</b> trabajadores de John Deere del sindicato United Auto Workers se fueron a huelga. Muchos trabajaban en fábricas de Iowa, como la de Ankeny.",
    "Deere expected record profits that year: about $5.7 to $5.9 billion. Workers said their pay and retirement hadn't kept up. The company's first offer had raises of 5% to 6%. Each side had its own reasons.":
      "Deere esperaba ganancias récord ese año: entre unos $5,700 y $5,900 millones. Los trabajadores decían que sus sueldos y su jubilación no habían subido lo suficiente. La primera oferta de la compañía tenía aumentos de 5% a 6%. Cada lado tenía sus propias razones.",
    "Sources: NPR and the Indianapolis Business Journal (AP), November 17, 2021; Agweek, November 2021.": "Fuentes: NPR y el Indianapolis Business Journal (AP), 17 de noviembre de 2021; Agweek, noviembre de 2021.",
    "How would a conflict theorist explain the Deere strike?": "¿Cómo explicaría la huelga de Deere alguien que usa la teoría del conflicto?",
    "Two groups were competing over money and power": "Dos grupos competían por dinero y poder",
    "Workers were bored and wanted more time off": "Los trabajadores estaban aburridos y querían más días libres",
    "Strikes help society keep running as it is": "Las huelgas ayudan a que la sociedad siga funcionando igual",
    "Workers didn't understand how big companies work": "Los trabajadores no entendían cómo funcionan las compañías grandes",
    "Reread the Name it box about conflict theory under your strike-day choice.": "Vuelve a leer el cuadro Ponle nombre sobre la teoría del conflicto debajo de tu decisión del día de huelga.",
    "Conflict theory sees a strike as groups competing for scarce resources. Workers and the company clashed over how to split record earnings. It's one lens. Other sociologists focus on how parts of society work together.":
      "La teoría del conflicto ve una huelga como grupos que compiten por recursos escasos. Los trabajadores y la compañía chocaron por cómo repartir ganancias récord. Es un lente. Otros sociólogos se fijan en cómo las partes de la sociedad trabajan juntas.",
    "Inside the union (real)": "Dentro del sindicato (real)",
    "Deere workers voted on three offers. More than <b>90%</b> voted NO on the first. <b>55%</b> voted NO on the second. On November 17, 2021, they approved the third: an immediate 10% raise and an $8,500 bonus.":
      "Los trabajadores de Deere votaron tres ofertas. Más del <b>90%</b> votó NO a la primera. El <b>55%</b> votó NO a la segunda. El 17 de noviembre de 2021 aprobaron la tercera: un aumento inmediato de 10% y un bono de $8,500.",
    "Conflict <b>between</b> two groups is <b>inter-group</b> conflict. Conflict <b>inside</b> one group is <b>intra-group</b> conflict.":
      "El conflicto <b>entre</b> dos grupos es conflicto <b>intergrupal (inter-group)</b>. El conflicto <b>dentro</b> de un grupo es conflicto <b>intragrupal (intra-group)</b>.",
    "Source: NPR, November 17, 2021.": "Fuente: NPR, 17 de noviembre de 2021.",
    "Which part of the Deere story is <b>intra-group</b> conflict?": "¿Qué parte de la historia de Deere es conflicto <b>intragrupal</b>?",
    "Union members split over whether to take an offer": "Miembros del sindicato divididos sobre si aceptar una oferta",
    "Workers going on strike against the company": "Trabajadores en huelga contra la compañía",
    "The union and Deere arguing over pay raises": "El sindicato y Deere discutiendo por los aumentos",
    "The company and the workers clashing over its profits": "La compañía y los trabajadores chocando por sus ganancias",
    "Intra means inside ONE group. Which choice has only union members in it?": "Intra significa dentro de UN grupo. ¿Qué opción tiene solo a miembros del sindicato?",
    "When union members argued with each other about the offers, that was intra-group conflict. Workers vs. the company was inter-group conflict.":
      "Cuando los miembros del sindicato discutieron entre ellos sobre las ofertas, eso fue conflicto intragrupal. Trabajadores contra la compañía fue conflicto intergrupal.",
    "@KCtea · 11,000 views": "@KCtea · 11,000 vistas",
    "Rents are only up because of all the new people moving here for warehouse jobs. THEY'RE the problem.": "Los alquileres solo subieron por toda la gente nueva que viene por los trabajos en los almacenes. ELLOS son el problema.",
    "Your notes: Northline Property Group bought those 3 complexes in October. It raised rents in November, for old AND new renters.": "Tus notas: Northline Property Group compró esos 3 complejos en octubre. Subió los alquileres en noviembre, para inquilinos viejos Y nuevos.",
    "Write a fact-check with the Northline sale and rent dates": "Escribir una verificación de datos con las fechas de la compra de Northline y del alquiler",
    "Ignore it, so you don't give the rumor more attention": "Ignorarlo, para no darle más atención al rumor",
    "Interview new families AND Northline about the rent jump": "Entrevistar a las familias nuevas Y a Northline sobre la subida del alquiler",
    "Many readers see the real timeline. But @KCtea calls the Courier \"fake news,\" and some new kids still get picked on at school.":
      "Muchos lectores ven las fechas reales. Pero @KCtea dice que el Courier es \"noticias falsas\", y a algunos chicos nuevos todavía los molestan en la escuela.",
    "blaming a group of people is easier than looking at who sets the rent.": "culpar a un grupo de personas es más fácil que mirar quién pone el precio del alquiler.",
    "The post hits 20,000 views. At the grocery store, a family who just moved here gets yelled at in the checkout line.": "La publicación llega a 20,000 vistas. En el supermercado, a una familia que acaba de mudarse le gritan en la fila de la caja.",
    "when blame goes unanswered, anger lands on a group instead of the cause.": "cuando nadie responde a la culpa, el enojo cae sobre un grupo en vez de la causa.",
    "New families say they pay the same high rent. Northline says its rents were \"below market.\" It's a strong story, but it takes two days, and the rumor spreads first.":
      "Las familias nuevas dicen que pagan el mismo alquiler alto. Northline dice que sus alquileres estaban \"por debajo del mercado\". Es una noticia fuerte, pero toma dos días, y el rumor se riega primero.",
    "careful reporting takes time, and rumors don't wait.": "el periodismo cuidadoso toma tiempo, y los rumores no esperan.",
    [NAME + "Renters vs. the company that sets the rent is <b>inter-group</b> conflict (between groups). Old renters vs. new renters is <b>intra-group</b> conflict (inside one group). In plain words: blame turned people with the same problem against each other."]:
      NAME_ES + "Inquilinos contra la compañía que pone el alquiler es conflicto <b>intergrupal (inter-group)</b> (entre grupos). Inquilinos viejos contra inquilinos nuevos es conflicto <b>intragrupal (intra-group)</b> (dentro de un grupo). En palabras simples: la culpa puso a gente con el mismo problema en contra de sí misma.",
    "Primary source: the Kerner Report, 1968 (real)": "Fuente primaria: el Informe Kerner, 1968 (real)",
    "In the summer of 1967, riots and fires broke out in many U.S. cities, including Detroit and Newark. President Lyndon Johnson asked a group of leaders, the Kerner Commission, to find out why. Their report said:":
      "En el verano de 1967 hubo disturbios e incendios en muchas ciudades de EE. UU., entre ellas Detroit y Newark. El presidente Lyndon Johnson le pidió a un grupo de líderes, la Comisión Kerner, que averiguara por qué. Su informe dijo:",
    "\"Segregation and poverty have created in the racial ghetto a destructive environment totally unknown to most white Americans.\"":
      "\"La segregación y la pobreza han creado en el gueto racial un ambiente destructivo totalmente desconocido para la mayoría de los estadounidenses blancos.\" (traducción)",
    "<b>In plain words:</b> forced separation and poverty created harmful living conditions that most white people never saw. (A ghetto here means a poor, segregated neighborhood.) The report pointed to conditions like jobs, housing, schools, and policing, not just individuals.":
      "<b>En palabras simples:</b> la separación forzada y la pobreza crearon condiciones de vida dañinas que la mayoría de la gente blanca nunca vio. (Aquí, gueto significa un barrio pobre y segregado.) El informe señaló condiciones como los empleos, la vivienda, las escuelas y la policía, no solo a las personas.",
    "Source: Report of the National Advisory Commission on Civil Disorders, 1968.": "Fuente: Report of the National Advisory Commission on Civil Disorders (Informe de la Comisión Asesora Nacional sobre Desórdenes Civiles), 1968.",
    "According to the Kerner Report, what was behind the anger and conflict?": "Según el Informe Kerner, ¿qué había detrás del enojo y el conflicto?",
    "Segregation and poverty that harmed whole areas": "La segregación y la pobreza que dañaron zonas enteras",
    "A few troublemakers who came in from other states": "Unos pocos alborotadores que llegaron de otros estados",
    "People who just didn't want to work or study": "Gente que simplemente no quería trabajar ni estudiar",
    "White Americans who lived in the same areas": "Estadounidenses blancos que vivían en las mismas zonas",
    "Read the quote and the In plain words part again.": "Vuelve a leer la cita y la parte En palabras simples.",
    "The report blamed conditions created by segregation and poverty, not just the people living there. That's the same move a sociologist makes: look for the pattern behind the conflict.":
      "El informe culpó a las condiciones creadas por la segregación y la pobreza, no solo a la gente que vivía allí. Eso es lo mismo que hace un sociólogo: buscar el patrón detrás del conflicto.",
    "Exit ticket": "Boleto de salida",
    "Kettle Creek is fighting. Using today's evidence, which explanation would a conflict theorist give?": "Kettle Creek está peleando. Con la evidencia de hoy, ¿qué explicación daría alguien que usa la teoría del conflicto?",
    "The pie shrank, so groups are fighting over jobs and housing": "El pastel se achicó, así que los grupos pelean por empleos y vivienda",
    "A few rude people online are the only real cause of this": "Unas pocas personas groseras en internet son la única causa real",
    "People in Kettle Creek just don't like each other all that much": "La gente de Kettle Creek simplemente no se lleva nada bien",
    "The fights have nothing to do with money or with power": "Las peleas no tienen nada que ver con el dinero ni con el poder",
    "Think about what got scarce this week: jobs, rent money, or both?": "Piensa en qué se puso escaso esta semana: ¿empleos, dinero para el alquiler, o las dos cosas?",
    "Conflict theory says conflict grows when groups compete for scarce resources. 400 lost jobs and a $300 rent jump made money and housing scarce, and groups started fighting over them.":
      "La teoría del conflicto dice que el conflicto crece cuando los grupos compiten por recursos escasos. 400 empleos perdidos y una subida de $300 en el alquiler hicieron escasos el dinero y la vivienda, y los grupos empezaron a pelear por ellos.",

    // ---------- Finale ----------
    "Your Front Page": "Tu portada",
    "Kettle Creek is boiling. Rumors and blame are winning.": "Kettle Creek está hirviendo. Los rumores y la culpa van ganando.",
    "Kettle Creek is on edge. Some people see the causes. Others are still blaming each other.": "Kettle Creek está al límite. Algunas personas ven las causas. Otras siguen culpándose entre sí.",
    "Kettle Creek is still tense, but more people are arguing about causes, not just each other.": "Kettle Creek sigue tenso, pero más gente discute sobre las causas, no solo contra los demás.",
    "400 lost jobs and a $300 rent jump made jobs, money, and housing scarce. Good reporting can explain the causes. It can't make the pie bigger.": "400 empleos perdidos y una subida de $300 en el alquiler hicieron escasos los empleos, el dinero y la vivienda. El buen periodismo puede explicar las causas. No puede hacer más grande el pastel.",
    "Answer both in 1–2 full sentences.": "Responde las dos con 1–2 oraciones completas.",
    "1. Pick race, gender, or class. Use one statistic from today to show how inequality hurts a group.": "1. Escoge raza, género o clase. Usa una estadística de hoy para mostrar cómo la desigualdad daña a un grupo.",
    "One example of ___ inequality is ___. This affects people because ___.": "Un ejemplo de desigualdad de ___ es ___. Esto afecta a la gente porque ___.",
    "Inequality + one statistic": "Desigualdad + una estadística",
    "In answer 1, name race, gender, or class AND use one number from today (like 82 cents, $285,000 vs. $44,900, or 14.6 years).": "En la respuesta 1, nombra raza, género o clase Y usa un número de hoy (como 82 centavos, $285,000 contra $44,900, o 14.6 años).",
    "2. Explain why: what is the main reason Kettle Creek is fighting? Use conflict theory and one cause from the town.": "2. Explica por qué: ¿cuál es la razón principal por la que Kettle Creek está peleando? Usa la teoría del conflicto y una causa del pueblo.",
    "Kettle Creek is fighting because ___. A conflict theorist would say ___.": "Kettle Creek está peleando porque ___. Alguien que usa la teoría del conflicto diría que ___.",
    "Why Kettle Creek is fighting": "Por qué pelea Kettle Creek",
    "In answer 2, name one thing that got scarce (jobs, housing, pay…) AND the groups competing for it (workers vs. the company, renters vs. Northline…).": "En la respuesta 2, nombra algo que se puso escaso (empleos, vivienda, sueldo…) Y los grupos que compiten por eso (trabajadores contra la compañía, inquilinos contra Northline…)."
  };

  SiteLang.add({
    dict,
    patterns: [
      { re: /^\+(\d+) tension$/, es: "+$1 de tensión" },
      { re: /^−(\d+) tension$/, es: "−$1 de tensión" },
      { re: /^\+([\d,]+) readers$/, es: "+$1 lectores" },
      { re: /^−([\d,]+) readers$/, es: "−$1 lectores" },
      { re: /^Town tension ended at (\d+)\/10\. The Courier has ([\d,]+) readers\.$/, es: "La tensión del pueblo terminó en $1/10. El Courier tiene $2 lectores." }
    ],
    writing: {
      stat: [
        ["raza", "racial", "negr", "blanc", "hispan", "latin", "genero", "mujer", "hombre", "clase", "ingreso", "rico", "pobre", "riqueza"],
        []
      ],
      why: [
        ["empleo", "trabajo", "alquiler", "renta", "vivienda", "casa", "sueldo", "salario", "pago", "dinero", "comida", "fabrica", "huelga", "despid", "seguro", "recorte"],
        ["grupo", "compet", "poder", "recurso", "escas", "lado", "trabajador", "compan", "inquilin", "dueno", "northline", "prairie", "sindicato", "rico", "pastel"]
      ]
    }
  });
})();
