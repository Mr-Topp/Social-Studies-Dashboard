// Spanish for "The Ladder Test" (Sociology Unit 4 Day 1). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
// Every student gets their own dice, so the dice-dependent lines are built below for every
// possible roll and rung, and the turn results (chips, moves) are matched by patterns.
(function () {
  const STONE = { 5: "Crown", 4: "Knight", 3: "Trader", 2: "Farmer", 1: "Digger" };
  const STONE_ES = { 5: "Corona", 4: "Caballero", 3: "Comerciante", 2: "Campesino", 1: "Cavador" };
  const OPEN = { 5: "Upper class", 4: "Upper-middle class", 3: "Middle class", 2: "Working class", 1: "Lower class" };
  const OPEN_ES = { 5: "Clase alta", 4: "Clase media alta", 3: "Clase media", 2: "Clase trabajadora", 1: "Clase baja" };
  const OPEN_ES_LOW = { 5: "clase alta", 4: "clase media alta", 3: "clase media", 2: "clase trabajadora", 1: "clase baja" };
  const HEAD = { 1: -1, 2: 0, 3: 0, 4: 1, 5: 2 };
  const sgn = n => (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n);

  const dict = {
    // ---------- Page frame ----------
    "The Ladder Test | Sociology Unit 4 Day 1": "La prueba de la escalera | Sociología Unidad 4 Día 1",
    "Sociology · Unit 4 · Day 1": "Sociología · Unidad 4 · Día 1",
    "The Ladder Test": "La prueba de la escalera",
    "Explain the concept of social stratification and its influence on societal structures and individual opportunities.": "Explicar el concepto de estratificación social y su influencia en las estructuras de la sociedad y en las oportunidades de cada persona.",
    "Goal:": "Meta:",
    "Explain social stratification and how the layer you're born into shapes your chances to move up. · About 25 minutes.": "Explicar la estratificación social y cómo la capa en la que naces influye en tus oportunidades de subir. · Unos 25 minutos.",
    "Progress and where each family is on the ladder": "Progreso y dónde está cada familia en la escalera",
    "You: not born yet": "Tú: todavía no naces",
    "The Hales: Rung 5": "Los Hale: Peldaño 5",

    // ---------- Intro ----------
    "Start the test": "Empezar la prueba",
    "Your new job · Rung Games, Cedar Rapids": "Tu nuevo trabajo · Rung Games, Cedar Rapids",
    "Does everyone start out equal?": "¿Todos empiezan iguales?",
    "A game company says its new board game is totally fair. You're the tester who finds out if that's true.": "Una compañía de juegos dice que su nuevo juego de mesa es totalmente justo. Tú eres quien lo prueba y descubre si es verdad.",
    "BROCK HALE · founder, Rung Games": "BROCK HALE · fundador de Rung Games",
    "ROSA · senior tester": "ROSA · probadora con experiencia",
    'Welcome to the team! Our game <b>LADDER</b> ships Friday. The box says: <b>"ANYONE CAN REACH THE TOP!"</b> Play all three worlds and sign off on it. Easy job.': '¡Bienvenido al equipo! Nuestro juego <b>LADDER</b> (Escalera) sale a la venta el viernes. La caja dice: <b>"¡CUALQUIERA PUEDE LLEGAR ARRIBA!"</b> Juega los tres mundos y aprueba el juego. Trabajo fácil.',
    "Play 3 worlds with real dice": "Juega 3 mundos con dados de verdad",
    "Check real U.S. data": "Revisa datos reales de EE. UU.",
    "Reminder: total of 5+ climbs a rung (rung 5 takes 9+). Total of 2 or less slides down.": "Recuerda: un total de 5 o más sube un peldaño (el peldaño 5 necesita 9 o más). Un total de 2 o menos baja.",
    "About 25 minutes": "Unos 25 minutos",
    "11 checks": "11 preguntas",
    "2 short answers": "2 respuestas cortas",
    "Rung Games, LADDER, Brock, Rosa, and every family in the game are made up. The history and the U.S. data are real.": "Rung Games, LADDER, Brock, Rosa y todas las familias del juego son inventados. La historia y los datos de EE. UU. son reales.",

    // ---------- Ladder tokens ----------
    "You": "Tú", "The Hales": "Los Hale", "Your kid": "Tu hijo/a", "Hale kid": "Hijo de los Hale",
    "The ladder": "La escalera",
    "Birth roll": "Dado de nacimiento",

    // ---------- Part 1 ----------
    "Part 1 of 3 · World 1": "Parte 1 de 3 · Mundo 1",
    "The Kingdom of Stone": "El Reino de Piedra",
    "Rule card · World 1 · The Kingdom of Stone": "Tarjeta de reglas · Mundo 1 · El Reino de Piedra",
    "You stay on the rung you are born on. For life.": "Te quedas en el peldaño donde naces. Toda la vida.",
    "Your rung decides your job. Diggers dig. Farmers farm. Knights fight.": "Tu peldaño decide tu trabajo. Los Cavadores cavan. Los Campesinos cultivan. Los Caballeros pelean.",
    "You may only marry someone from your own rung.": "Solo te puedes casar con alguien de tu mismo peldaño.",
    "Rung 5 is only for the royal family.": "El peldaño 5 es solo para la familia real.",
    'Brock\'s family, the Hales, are the royal family, of course. "Just for testing," he says.': 'La familia de Brock, los Hale, es la familia real, claro. "Solo para probar", dice él.',
    "Work double shifts for 10 years and save every coin": "Trabaja turnos dobles por 10 años y ahorra cada moneda",
    "Rung: no change": "Peldaño: sin cambio",
    "Cost: your health": "Costo: tu salud",
    "Cost: a year of pay": "Costo: un año de paga",
    "Cost: your family's name": "Costo: el nombre de tu familia",
    "The marriage is blocked. Both families are shamed in the town square.": "Prohíben el matrimonio. Avergüenzan a las dos familias en la plaza del pueblo.",
    "<b>Caused by: Rule 1.</b> You stay on the rung you are born on.": "<b>Causa: Regla 1.</b> Te quedas en el peldaño donde naces.",
    "<b>Caused by: Rule 2.</b> Your rung decides your job.": "<b>Causa: Regla 2.</b> Tu peldaño decide tu trabajo.",
    "<b>Caused by: Rule 3.</b> You may only marry inside your own rung.": "<b>Causa: Regla 3.</b> Solo te puedes casar dentro de tu peldaño.",
    "What you just played is <b>social stratification</b>: a society ranking groups of people into layers, by wealth, power, and respect. The word comes from rock layers (<i>strata</i>), like the Grand Canyon.":
      "Lo que acabas de jugar es <b>estratificación social</b>: una sociedad que ordena a grupos de personas en capas, según su riqueza, su poder y el respeto que reciben. La palabra viene de las capas de roca (<i>estratos</i>), como en el Gran Cañón.",
    "The Kingdom of Stone is a <b>closed system</b>: birth decides your layer, and moving is nearly impossible. Working harder didn't help, because the rules are built into the society, not into you.":
      "El Reino de Piedra es un <b>sistema cerrado</b>: el nacimiento decide tu capa, y moverte es casi imposible. Trabajar más duro no ayudó, porque las reglas están en la sociedad, no en ti.",
    "Okay, okay. The Kingdom of Stone is the <b>old</b> world. Nobody wants to live there. Wait until you play my Open Ladder. That's where anyone can make it.":
      "Bueno, bueno. El Reino de Piedra es el mundo <b>viejo</b>. Nadie quiere vivir ahí. Espera a jugar mi Escalera Abierta. Ahí cualquiera puede salir adelante.",
    "In the Kingdom of Stone, what decided which rung you ended up on?": "En el Reino de Piedra, ¿qué decidió en qué peldaño terminaste?",
    "The family you happened to be born into": "La familia en la que te tocó nacer",
    "How hard you worked once you were an adult": "Qué tan duro trabajaste cuando eras adulto",
    "Who you decided to marry later in life": "Con quién decidiste casarte más adelante",
    "How many coins you managed to save up": "Cuántas monedas lograste ahorrar",
    "Look back at what happened when you tried to move up. Then check Rule 1.": "Mira lo que pasó cuando intentaste subir. Luego revisa la Regla 1.",
    "Nothing you did changed your rung. Birth decided it. That's what makes a system closed.": "Nada de lo que hiciste cambió tu peldaño. Lo decidió el nacimiento. Eso es lo que hace que un sistema sea cerrado.",
    "A sociologist says the Kingdom of Stone shows <b>social stratification</b>. What does she mean?": "Una socióloga dice que el Reino de Piedra muestra <b>estratificación social</b>. ¿Qué quiere decir?",
    "Whole groups are ranked in layers by wealth, power, and respect": "Grupos enteros se ordenan en capas por riqueza, poder y respeto",
    "One person in the kingdom happens to be richer than a neighbor": "Una persona del reino resulta ser más rica que su vecino",
    "Rock layers slowly build up under a kingdom over many years": "Las capas de roca se forman lentamente bajo un reino con los años",
    "People get to pick which layer of society they want to join": "La gente puede escoger a qué capa de la sociedad quiere entrar",
    "Reread the green box. Is stratification about one person, or about whole groups?": "Vuelve a leer el cuadro verde. ¿La estratificación trata de una persona o de grupos enteros?",
    "Stratification is about whole groups ranked in layers that last over time, not one rich person and one poor person.": "La estratificación trata de grupos enteros ordenados en capas que duran en el tiempo, no de una persona rica y una pobre.",
    "Real history · India's caste system": "Historia real · El sistema de castas de la India",
    'For centuries in India\'s <b>caste system</b>, the family you were born into set your rank, the jobs you could do, and who you could marry. People at the bottom were called "untouchable."':
      'Durante siglos, en el <b>sistema de castas</b> de la India, la familia en la que nacías decidía tu rango, los trabajos que podías hacer y con quién te podías casar. A las personas de abajo las llamaban "intocables".',
    '<b>B. R. Ambedkar</b> was born "untouchable" in 1891. He earned the highest college degrees in New York and London, then led the writing of India\'s Constitution. In 1950, it banned "untouchability." Caste still affects some lives in India today.':
      '<b>B. R. Ambedkar</b> nació "intocable" en 1891. Obtuvo los títulos universitarios más altos en Nueva York y en Londres, y luego dirigió la redacción de la Constitución de la India. En 1950, esa Constitución prohibió la "intocabilidad". Hoy, la casta todavía afecta algunas vidas en la India.',
    "<b>Slavery</b> is the most closed system of all: people are owned by other people.": "La <b>esclavitud</b> es el sistema más cerrado de todos: unas personas son dueñas de otras.",
    "Based on the card, what made India's caste system a closed system?": "Según la tarjeta, ¿qué hacía que el sistema de castas de la India fuera un sistema cerrado?",
    "Birth set your rank, your job, and who you could marry": "El nacimiento decidía tu rango, tu trabajo y con quién casarte",
    "People voted every year on which caste they would join": "La gente votaba cada año a qué casta iba a pertenecer",
    "Your caste moved up once you started earning more money": "Tu casta subía cuando empezabas a ganar más dinero",
    "Only adults over 18 were sorted into different castes": "Solo a los adultos mayores de 18 los ponían en castas",
    "Reread the first sentence of the card. What did birth decide?": "Vuelve a leer la primera oración de la tarjeta. ¿Qué decidía el nacimiento?",
    'Like the Kingdom of Stone, birth decided rank, job, and marriage. Ambedkar fought to change the rules, and the 1950 Constitution banned "untouchability." But changing a law doesn\'t erase a system overnight.':
      'Como en el Reino de Piedra, el nacimiento decidía el rango, el trabajo y el matrimonio. Ambedkar luchó para cambiar las reglas, y la Constitución de 1950 prohibió la "intocabilidad". Pero cambiar una ley no borra un sistema de la noche a la mañana.',

    // ---------- Part 2 ----------
    "Part 2 of 3 · World 2": "Parte 2 de 3 · Mundo 2",
    "The Open Ladder": "La Escalera Abierta",
    "Rule card · World 2 · The Open Ladder": "Tarjeta de reglas · Mundo 2 · La Escalera Abierta",
    "Anyone can move up or down. Each turn: <b>roll + head start + your choice = total</b>.": "Cualquiera puede subir o bajar. En cada turno: <b>dado + ventaja inicial + tu decisión = total</b>.",
    "Total of <b>5 or more</b>: climb 1 rung. Climbing onto <b>rung 5</b> takes <b>9 or more</b>.": "Total de <b>5 o más</b>: subes 1 peldaño. Para subir al <b>peldaño 5</b> necesitas <b>9 o más</b>.",
    "Total of <b>2 or less</b>: slide down 1 rung.": "Total de <b>2 o menos</b>: bajas 1 peldaño.",
    "<b>Head start</b> (tutoring, a car that works, parents who know people): Rung 1 = −1 · Rungs 2–3 = 0 · Rung 4 = +1 · Rung 5 = +2.": "<b>Ventaja inicial</b> (tutorías, un carro que funciona, padres con contactos): Peldaño 1 = −1 · Peldaños 2–3 = 0 · Peldaño 4 = +1 · Peldaño 5 = +2.",
    "<b>Savings cushion:</b> on rungs 4–5, bad-luck cards cost nothing. Parents there pay for college, so no loans.": "<b>Colchón de ahorros:</b> en los peldaños 4–5, las cartas de mala suerte no cuestan nada. Ahí los padres pagan la universidad, así que no hay préstamos.",
    "My family starts on rung 5 again. Hey, somebody has to! But every player rolls the <b>same dice</b>. In fact, the Hales will use your exact roll every turn. Totally fair.":
      "Mi familia empieza en el peldaño 5 otra vez. ¡Oye, alguien tiene que estar ahí! Pero todos tiran los <b>mismos dados</b>. De hecho, los Hale van a usar exactamente tu mismo dado en cada turno. Totalmente justo.",
    "<b>Turn 1 · Age 18.</b> You just finished high school. What's your next move?": "<b>Turno 1 · 18 años.</b> Acabas de terminar la preparatoria. ¿Qué haces ahora?",
    "Go to a 4-year college. (+2 now. If your parents can't pay, you take loans: −1 at age 25.)": "Ve a una universidad de 4 años. (+2 ahora. Si tus padres no pueden pagar, pides préstamos: −1 a los 25 años.)",
    "Take classes at Kirkwood part-time while you work. (+1 now, no debt.)": "Toma clases en Kirkwood medio tiempo mientras trabajas. (+1 ahora, sin deudas.)",
    "Start full-time at a warehouse right away. (+0 now, but a raise: +1 at age 25.)": "Empieza a trabajar tiempo completo en un almacén ya. (+0 ahora, pero un aumento: +1 a los 25 años.)",
    "You and the Hales rolled the <b>same number</b>. Why can your totals still come out different?": "Tú y los Hale sacaron el <b>mismo número</b>. ¿Por qué sus totales pueden salir diferentes?",
    "The rules give their rung bonus points that yours doesn't get": "Las reglas le dan a su peldaño puntos extra que el tuyo no recibe",
    "The Hales worked harder, so the game gave them more points": "Los Hale trabajaron más duro, así que el juego les dio más puntos",
    "The Hales got luckier, because their roll counted twice": "Los Hale tuvieron más suerte, porque su dado contó doble",
    "Whoever plays second in each turn gets one bonus point": "Quien juega segundo en cada turno recibe un punto extra",
    "Compare the chips in your box and the Hales' box. Which ones are different?": "Compara las fichas de tu cuadro con las del cuadro de los Hale. ¿Cuáles son diferentes?",
    "Same roll, different rules. The head start is built into the game, not into the players. Sociologists say stratification is a trait (a built-in feature) of society, not just of people.": "Mismo dado, reglas diferentes. La ventaja inicial está en el juego, no en los jugadores. Los sociólogos dicen que la estratificación es una característica (algo que viene incluido) de la sociedad, no solo de las personas.",
    "Bad-luck card": "Carta de mala suerte",
    "Your car's transmission dies. You need that car to get to work.": "Se descompone la transmisión de tu carro. Necesitas ese carro para ir al trabajo.",
    "A derecho knocks a tree onto your apartment building. You have to move, fast.": "Un derecho (tormenta de viento) tumba un árbol sobre tu edificio. Tienes que mudarte, rápido.",
    "Your hours get cut at work for two months.": "Te recortan las horas en el trabajo por dos meses.",
    "A trip to the ER leaves you with a big medical bill.": "Una visita a la sala de emergencias te deja una cuenta médica grande.",
    "<b>Turn 2 · Age 25.</b> You have a 2-year-old now. What do you do?": "<b>Turno 2 · 25 años.</b> Ahora tienes un hijo de 2 años. ¿Qué haces?",
    "Move to Des Moines for a better-paying job. (+2 now. Far from family, so daycare: −1 at age 35 unless you're on rung 4+.)": "Múdate a Des Moines por un trabajo que paga mejor. (+2 ahora. Lejos de tu familia, así que pagas guardería: −1 a los 35 años, a menos que estés en el peldaño 4 o más.)",
    "Stay near family and pick up extra shifts. (+1 now. Grandma watches your kid for free.)": "Quédate cerca de tu familia y toma turnos extra. (+1 ahora. La abuela cuida a tu hijo gratis.)",
    "Start an electrician apprenticeship at lower pay. (+0 now, but +2 at age 35.)": "Empieza un aprendizaje de electricista con menos paga. (+0 ahora, pero +2 a los 35 años.)",
    "Why did the bad-luck card cost the Hales nothing?": "¿Por qué la carta de mala suerte no les costó nada a los Hale?",
    "Their savings cushion covered the cost for them": "Su colchón de ahorros cubrió el costo por ellos",
    "The Hales got a much smaller bad-luck card": "A los Hale les tocó una carta de mala suerte más pequeña",
    "The Hales rolled a higher number on that turn": "A los Hale les salió un número más alto en ese turno",
    "The Hales worked more hours that month than you": "Los Hale trabajaron más horas que tú ese mes",
    "Check rule 5 on the rule card. Then look at the Hales' chips.": "Revisa la regla 5 en la tarjeta de reglas. Luego mira las fichas de los Hale.",
    "Money in the bank turns a crisis into a hassle. Families without a cushion pay for bad luck with lost chances.": "Tener dinero en el banco convierte una crisis en una simple molestia. Las familias sin colchón pagan la mala suerte perdiendo oportunidades.",
    "<b>Turn 3 · Age 35.</b> Last turn of your life in the game. You've got a little money saved. What do you risk?": "<b>Turno 3 · 35 años.</b> El último turno de tu vida en el juego. Tienes un poco de dinero ahorrado. ¿Qué arriesgas?",
    "Buy a small house. (+1. But if you slide, you lose it and slide 2 rungs.)": "Compra una casa pequeña. (+1. Pero si bajas, la pierdes y bajas 2 peldaños.)",
    "Keep renting and build savings. (+0. But you can't slide this turn.)": "Sigue rentando y ahorra. (+0. Pero no puedes bajar en este turno.)",
    "Quit and start a food truck. (Big risk: 7 or more climbs 2 rungs. 3 or less slides 1.)": "Renuncia y abre un food truck (camión de comida). (Gran riesgo: con 7 o más subes 2 peldaños. Con 3 o menos bajas 1.)",
    "<b>Your life on the Open Ladder:</b>": "<b>Tu vida en la Escalera Abierta:</b>",
    "The Open Ladder is an <b>open system</b>, like the U.S. <b>class system</b>: your layer can change through school, work, or luck.": "La Escalera Abierta es un <b>sistema abierto</b>, como el <b>sistema de clases</b> de EE. UU.: tu capa puede cambiar por la escuela, el trabajo o la suerte.",
    "Moving up or down is called <b>social mobility</b>. Up is <b>upward mobility</b>. Down is <b>downward mobility</b>. It can happen during your own life, or between parents and kids.": "Subir o bajar se llama <b>movilidad social</b>. Subir es <b>movilidad ascendente</b>. Bajar es <b>movilidad descendente</b>. Puede pasar durante tu propia vida, o entre padres e hijos.",
    "See?! You climbed! That proves it: <b>anyone can reach the top</b> if they work hard. Sign the report.": "¡¿Ves?! ¡Subiste! Eso lo demuestra: <b>cualquiera puede llegar arriba</b> si trabaja duro. Firma el informe.",
    "Bad rolls, that's all. If you'd worked harder, you'd have climbed. <b>Anyone can reach the top.</b> Sign the report.": "Malos dados, nada más. Si hubieras trabajado más duro, habrías subido. <b>Cualquiera puede llegar arriba.</b> Firma el informe.",
    "Upward social mobility": "Movilidad social ascendente",
    "Downward social mobility": "Movilidad social descendente",
    "A closed caste system": "Un sistema cerrado de castas",
    "No mobility at all": "Ninguna movilidad",
    "No mobility: you ended where you started": "Sin movilidad: terminaste donde empezaste",
    "Upward social mobility: you ended higher": "Movilidad social ascendente: terminaste más arriba",
    "Downward social mobility: you ended lower": "Movilidad social descendente: terminaste más abajo",
    "A closed system: the rules banned moving": "Un sistema cerrado: las reglas prohibían moverse",
    "Look at your path above. Compare the first rung and the last rung.": "Mira tu camino arriba. Compara el primer peldaño con el último.",
    "You ended higher than you started. That's upward mobility, during one lifetime.": "Terminaste más arriba de donde empezaste. Eso es movilidad ascendente, durante una sola vida.",
    "You ended lower than you started. That's downward mobility, during one lifetime.": "Terminaste más abajo de donde empezaste. Eso es movilidad descendente, durante una sola vida.",
    "You ended where you started. In an open system, moving is allowed, but your rolls and your head start didn't get you there.": "Terminaste donde empezaste. En un sistema abierto se permite moverse, pero tus dados y tu ventaja inicial no te llevaron más lejos.",
    'Brock says, "Some players climb, so the game is fair. Anyone can reach the top." What\'s the best answer, based on the rule card?': 'Brock dice: "Algunos jugadores suben, así que el juego es justo. Cualquiera puede llegar arriba". Según la tarjeta de reglas, ¿cuál es la mejor respuesta?',
    "Climbing is possible, but head starts make it much easier for some": "Subir es posible, pero la ventaja inicial lo hace mucho más fácil para algunos",
    "He's right: if one player climbs, the rules must be fair to all": "Tiene razón: si un jugador sube, las reglas son justas para todos",
    "Some players climb, so the head starts don't change much": "Algunos jugadores suben, así que las ventajas no cambian mucho",
    "The dice decide everything, so the rule card doesn't matter": "Los dados deciden todo, así que la tarjeta de reglas no importa",
    "Can players climb? Yes. Now look at rules 2, 4, and 5. Is it equally easy for everyone?": "¿Los jugadores pueden subir? Sí. Ahora mira las reglas 2, 4 y 5. ¿Es igual de fácil para todos?",
    'Moving is possible, so the system is open. But the head start, the cushion, and "the top takes 9" tip the odds on every roll. Beliefs like "anyone can make it if they try" can make big gaps seem fair. That\'s one of the four big principles of stratification.':
      'Moverse es posible, así que el sistema es abierto. Pero la ventaja inicial, el colchón y "arriba se necesita 9" inclinan cada tirada. Creencias como "cualquiera sale adelante si se esfuerza" pueden hacer que grandes diferencias parezcan justas. Ese es uno de los cuatro grandes principios de la estratificación.',

    // ---------- Turn results ----------
    "Roll": "Dado", "Head start": "Ventaja inicial", "Total": "Total",
    "College, parents pay": "Universidad, la pagan los padres",
    "College on loans": "Universidad con préstamos",
    "Kirkwood part-time": "Kirkwood medio tiempo",
    "Warehouse job": "Trabajo en almacén",
    "Bad-luck card (savings covered it)": "Carta de mala suerte (los ahorros la cubrieron)",
    "Loan payments": "Pagos del préstamo",
    "Raise from the warehouse": "Aumento en el almacén",
    "Des Moines job": "Trabajo en Des Moines",
    "Extra shifts": "Turnos extra",
    "Apprenticeship": "Aprendizaje",
    "Daycare costs": "Costo de guardería",
    "Electrician license": "Licencia de electricista",
    "Buying a house": "Comprar una casa",
    "Renting and saving": "Rentar y ahorrar",
    "Food truck": "Food truck",
    "Your savings for college": "Tus ahorros para la universidad",
    "Student loans": "Préstamos estudiantiles",
    "Working right away": "Trabajar de inmediato",
    "Job at Dad's company": "Trabajo en la empresa de papá",
    "Family money invested": "Dinero familiar invertido",
    "Trust fund for college": "Fondo familiar para la universidad",
    "The Hales (same roll)": "Los Hale (mismo dado)",
    "The Hale kid (same roll)": "El hijo de los Hale (mismo dado)",
    "The Hales stay on rung 5.": "Los Hale se quedan en el peldaño 5.",
    "The Hale kid stays on rung 5.": "El hijo de los Hale se queda en el peldaño 5.",
    "Caused by: the food truck just breaks even. A total of 4 to 6 keeps you where you are.": "Causa: el food truck apenas cubre sus gastos. Un total de 4 a 6 te deja donde estás.",
    "Caused by: your savings. Renting and saving kept you from sliding.": "Causa: tus ahorros. Rentar y ahorrar evitó que bajaras.",
    "Caused by: a total of 3 or 4 isn't enough to climb.": "Causa: un total de 3 o 4 no alcanza para subir.",
    "Caused by: you're already on the top rung.": "Causa: ya estás en el peldaño de arriba.",
    "Caused by: the top rung takes a total of 9 or more.": "Causa: el peldaño de arriba necesita un total de 9 o más.",
    "Caused by: a good total, but the top rung takes 9 or more.": "Causa: un buen total, pero el peldaño de arriba necesita 9 o más.",
    "Caused by: a total of 5 or more.": "Causa: un total de 5 o más.",
    "Caused by: a low total. You're already on the bottom rung, so it gets harder to climb out.": "Causa: un total bajo. Ya estás en el peldaño de abajo, así que se hace más difícil salir.",
    "Caused by: a low total. You couldn't pay the mortgage and lost the house.": "Causa: un total bajo. No pudiste pagar la hipoteca y perdiste la casa.",
    "Caused by: the food truck takes off! A total of 7 or more.": "Causa: ¡el food truck es un éxito! Un total de 7 o más.",
    "Caused by: the food truck fails. A total of 3 or less.": "Causa: el food truck fracasa. Un total de 3 o menos.",
    "Caused by: a total of 2 or less.": "Causa: un total de 2 o menos.",
    "Caused by: a total of 9 or more. That's what the top rung takes.": "Causa: un total de 9 o más. Eso es lo que necesita el peldaño de arriba.",

    // ---------- Part 3 ----------
    "Part 3 of 3 · World 3": "Parte 3 de 3 · Mundo 3",
    "The Next Generation": "La siguiente generación",
    "New rule · World 3": "Regla nueva · Mundo 3",
    "Your kid starts the game on the rung where <b>you</b> ended.": "Tu hijo o hija empieza el juego en el peldaño donde <b>tú</b> terminaste.",
    "Brock's kid starts where Brock ended.": "El hijo de Brock empieza donde terminó Brock.",
    "Same rules. Same dice. One roll for each kid.": "Mismas reglas. Mismos dados. Un tiro para cada hijo.",
    "<b>Your kid is 18.</b> You want them to do better than you did. What can you give them?": "<b>Tu hijo o hija tiene 18 años.</b> Quieres que le vaya mejor que a ti. ¿Qué le puedes dar?",
    "Spend your savings on your kid's college. (Kid +2. Your cushion is gone.)": "Gasta tus ahorros en la universidad de tu hijo. (Hijo +2. Te quedas sin colchón.)",
    "Keep your savings. Your kid takes student loans. (Kid +1, but starts life in debt.)": "Guarda tus ahorros. Tu hijo pide préstamos estudiantiles. (Hijo +1, pero empieza su vida con deudas.)",
    "Your kid skips college and works to help pay rent. (Kid +0. Rent gets easier.)": "Tu hijo no va a la universidad y trabaja para ayudar con la renta. (Hijo +0. La renta se hace más fácil.)",
    "Why does the Hale kid start on rung 5 with a +2 head start?": "¿Por qué el hijo de los Hale empieza en el peldaño 5 con +2 de ventaja inicial?",
    "Advantages carry over from parents to their kids": "Las ventajas pasan de los padres a sus hijos",
    "The Hale kid rolled the highest birth number": "Al hijo de los Hale le salió el dado de nacimiento más alto",
    "The game puts the hardest-working kids on top": "El juego pone arriba a los hijos más trabajadores",
    "Every new player gets a random starting rung": "Cada jugador nuevo empieza en un peldaño al azar",
    "Read rule 1 and rule 2 of the new rule card.": "Lee la regla 1 y la regla 2 de la tarjeta nueva.",
    "Stratification carries over from parents to kids. That's another of the four principles. The Hale kid didn't earn rung 5. He was born there.": "La estratificación pasa de padres a hijos. Ese es otro de los cuatro principios. El hijo de los Hale no se ganó el peldaño 5. Nació ahí.",
    'Real U.S. data · Chetty, Hendren, Kline &amp; Saez, "Where Is the Land of Opportunity?" (2014)': 'Datos reales de EE. UU. · Chetty, Hendren, Kline y Saez, "¿Dónde está la tierra de oportunidades?" (2014)',
    'Researchers tracked millions of real U.S. kids born in 1980–82 and checked their incomes as adults. They split families into five income layers ("fifths"), like the 5 rungs.': 'Unos investigadores siguieron a millones de niños reales de EE. UU. nacidos en 1980–82 y revisaron sus ingresos de adultos. Dividieron a las familias en cinco capas de ingresos ("quintos"), como los 5 peldaños.',
    "Born in the bottom fifth → stayed in the bottom fifth": "Nació en el quinto de abajo → se quedó en el quinto de abajo",
    "Born in the bottom fifth → reached the top fifth": "Nació en el quinto de abajo → llegó al quinto de arriba",
    "Born in the top fifth → stayed in the top fifth": "Nació en el quinto de arriba → se quedó en el quinto de arriba",
    "A kid born in the <b>top</b> fifth is about how many times as likely to end up in the top fifth as a kid born in the <b>bottom</b> fifth?": "Un niño nacido en el quinto de <b>arriba</b>, ¿cuántas veces más probable es que termine en el quinto de arriba que un niño nacido en el quinto de <b>abajo</b>?",
    "About 5 times as likely": "Unas 5 veces más probable",
    "About 2 times as likely": "Unas 2 veces más probable",
    "About the same chance": "Más o menos la misma probabilidad",
    "About 20 times as likely": "Unas 20 veces más probable",
    "Compare 36.5% and 7.5%. How many 7.5s fit into 36.5?": "Compara 36.5% y 7.5%. ¿Cuántas veces cabe 7.5 en 36.5?",
    "36.5% ÷ 7.5% is about 5. Real kids CAN climb from the bottom to the top. But a kid born at the top is about 5 times as likely to end up there.": "36.5% ÷ 7.5% es más o menos 5. Los niños reales SÍ pueden subir de abajo hasta arriba. Pero un niño nacido arriba tiene unas 5 veces más probabilidad de terminar ahí.",
    "The top rungs pay the most because those jobs matter most. Big rewards get talented people to work hard. That's good for everybody.": "Los peldaños de arriba pagan más porque esos trabajos son los más importantes. Las grandes recompensas hacen que la gente talentosa trabaje duro. Eso es bueno para todos.",
    "The people on top wrote these rules. That's why their kids get +2, they never pay for bad luck, and the top takes a 9.": "La gente de arriba escribió estas reglas. Por eso sus hijos reciben +2, nunca pagan la mala suerte y arriba se necesita un 9.",
    "Which way of seeing stratification is Rosa using?": "¿Qué forma de ver la estratificación está usando Rosa?",
    "The conflict view: powerful groups protect their advantages": "La teoría del conflicto: los grupos poderosos protegen sus ventajas",
    "The functionalist view: big rewards fill the most important jobs": "La teoría funcionalista: grandes premios llenan los trabajos clave",
    "Weber's view: class, status, and power don't always match": "La idea de Weber: clase, estatus y poder no siempre coinciden",
    "Symbolic interaction: people act on what symbols mean": "Interaccionismo simbólico: actuamos según lo que significan los símbolos",
    "Who does Rosa say wrote the rules, and who do the rules help?": "¿Quién dice Rosa que escribió las reglas, y a quién ayudan las reglas?",
    "Rosa uses the conflict view, which builds on Karl Marx: groups with power make rules that protect their advantages and pass them to their kids. Brock uses the functionalist view, from Kingsley Davis and Wilbert Moore (1945).": "Rosa usa la teoría del conflicto, que se basa en Karl Marx: los grupos con poder hacen reglas que protegen sus ventajas y las pasan a sus hijos. Brock usa la teoría funcionalista, de Kingsley Davis y Wilbert Moore (1945).",
    "Exit check": "Pregunta de salida",
    "Which statement fits BOTH your Ladder test and the real U.S. data best?": "¿Qué frase encaja mejor con TU prueba de la escalera Y con los datos reales de EE. UU.?",
    "People can move, but where you start shapes your chances": "La gente puede moverse, pero donde empiezas afecta tus oportunidades",
    "No one ever changes layers, so it's a closed system": "Nadie cambia nunca de capa, así que es un sistema cerrado",
    "Everyone has the same odds, so where you start doesn't matter": "Todos tienen la misma probabilidad, así que no importa dónde empiezas",
    "Lots of people move, so where you start barely matters": "Mucha gente se mueve, así que casi no importa dónde empiezas",
    "Did anyone climb in the game or in the data? Did everyone have the same odds?": "¿Alguien subió en el juego o en los datos? ¿Todos tenían la misma probabilidad?",
    "The U.S. class system is open: people do move. But head starts carry over from parents to kids, so the odds aren't equal.": "El sistema de clases de EE. UU. es abierto: la gente sí se mueve. Pero las ventajas iniciales pasan de padres a hijos, así que las probabilidades no son iguales.",

    // ---------- Finale ----------
    "Your Test Report for Brock": "Tu informe de prueba para Brock",
    "Your family:": "Tu familia:",
    ". The Hales: rung 5 → rung 5 → rung 5.": ". Los Hale: peldaño 5 → peldaño 5 → peldaño 5.",
    'Brock wants the box to say "ANYONE CAN REACH THE TOP!" Write your report. Answer both in 1–2 full sentences.': 'Brock quiere que la caja diga "¡CUALQUIERA PUEDE LLEGAR ARRIBA!". Escribe tu informe. Contesta las dos con 1–2 oraciones completas.',
    "What decided your family's rung": "Qué decidió el peldaño de tu familia",
    "Is the U.S. class system open": "Si el sistema de clases de EE. UU. es abierto",
    "1. What decided where your family ended up: your choices, the dice, or your starting rung? Use one thing that happened in your game.": "1. ¿Qué decidió dónde terminó tu familia: tus decisiones, los dados o tu peldaño inicial? Usa algo que pasó en tu juego.",
    "My family ended on rung ___. The biggest cause was ___ because ___.": "Mi familia terminó en el peldaño ___. La causa más grande fue ___ porque ___.",
    "2. Exit ticket: Is the U.S. class system truly open? Use one term and one fact from today. (Go deeper: say how Brock and Rosa would answer differently.)": "2. Boleto de salida: ¿El sistema de clases de EE. UU. es de verdad abierto? Usa un término y un dato de hoy. (Para ir más allá: di cómo responderían Brock y Rosa de forma diferente.)",
    "The U.S. class system is ___ open because ___.": "El sistema de clases de EE. UU. es ___ abierto porque ___.",
    "In answer 1, name something from your game (your roll, head start, a choice, a bad-luck card, the cushion…).": "En la respuesta 1, nombra algo de tu juego (tu dado, la ventaja inicial, una decisión, una carta de mala suerte, el colchón…).",
    "In answer 2, back it up with one fact from today (the 7.5% data, head starts passing to kids, the Hales…).": "En la respuesta 2, apóyala con un dato de hoy (el dato del 7.5%, las ventajas que pasan a los hijos, los Hale…)."
  };

  // ---------- Lines that depend on this student's dice ----------
  for (let d = 1; d <= 6; d++) {
    const sb = d <= 2 ? 1 : d <= 4 ? 2 : d === 5 ? 3 : 4;
    dict[`<span class="lab">Birth roll</span>You rolled a ${d}. You are born a <b>${STONE[sb]}</b>, on rung ${sb}.`] =
      `<span class="lab">Dado de nacimiento</span>Sacaste un ${d}. Naces como <b>${STONE_ES[sb]}</b>, en el peldaño ${sb}.`;
    dict[`<span class="lab">Birth roll</span>You rolled a ${d}. You are born into the <b>${OPEN[sb]}</b>, on rung ${sb}.`] =
      `<span class="lab">Dado de nacimiento</span>Sacaste un ${d}. Naces en la <b>${OPEN_ES_LOW[sb]}</b>, en el peldaño ${sb}.`;
  }
  for (let r = 1; r <= 4; r++) {
    const me = STONE[r], up = STONE[r + 1], meEs = STONE_ES[r], upEs = STONE_ES[r + 1];
    dict[`<b>You're 20 years old.</b> You want a better life than the one you were born into. You want to be a <b>${up}</b>. What do you try?`] =
      `<b>Tienes 20 años.</b> Quieres una vida mejor que la que te tocó al nacer. Quieres ser <b>${upEs}</b>. ¿Qué intentas?`;
    dict[`Secretly learn a ${up}'s skills so you can do their job`] = `Aprende en secreto las habilidades de un ${upEs} para hacer su trabajo`;
    dict[`Marry the ${up}'s kid you've liked for years`] = `Cásate con la persona de la familia ${upEs} que te gusta desde hace años`;
    dict[`Your back is wrecked and you're tired all the time. You saved a pile of coins. But you are still a ${me}.`] =
      `Tienes la espalda destrozada y vives cansado. Ahorraste un montón de monedas. Pero sigues siendo ${meEs}.`;
    dict[`A ${up} finds out. You're fined a year of pay and sent back to work as a ${me}.`] =
      `Un ${upEs} se entera. Te multan con un año de paga y te mandan de vuelta a trabajar como ${meEs}.`;
  }
  for (let r = 1; r <= 5; r++) {
    dict[`Rung ${r} · ${STONE[r]}`] = `Peldaño ${r} · ${STONE_ES[r]}`;
    dict[`Rung ${r} · ${OPEN[r]}`] = `Peldaño ${r} · ${OPEN_ES[r]}`;
    dict[`Your kid starts on <b>rung ${r}</b> with a head start of <b>${sgn(HEAD[r])}</b>. The Hale kid starts on <b>rung 5</b> with <b>+2</b>.`] =
      `Tu hijo o hija empieza en el <b>peldaño ${r}</b> con una ventaja inicial de <b>${sgn(HEAD[r])}</b>. El hijo de los Hale empieza en el <b>peldaño 5</b> con <b>+2</b>.`;
    dict[STONE[r]] = STONE_ES[r];
    dict[OPEN[r]] = OPEN_ES[r];
  }

  SiteLang.add({
    dict,
    patterns: [
      // Top bar
      { re: /^You: Rung (\d) · (.+)$/, es: "Tú: Peldaño $1 · $2", tr: [2] },
      { re: /^The Hales: Rung 5 · (.+)$/, es: "Los Hale: Peldaño 5 · $1", tr: [1] },
      { re: /^Your kid: Rung (\d) · (.+)$/, es: "Tu hijo/a: Peldaño $1 · $2", tr: [2] },
      { re: /^Hale kid: Rung 5 · (.+)$/, es: "Hijo de los Hale: Peldaño 5 · $1", tr: [1] },
      // Turn chips ("Roll: 4", "Head start: +2", "Total: 7")
      { re: /^(.+): ([+−]?\d+)$/, es: "$1: $2", tr: [1] },
      // Moves
      { re: /^Climb to rung (\d)\.$/, es: "Subes al peldaño $1." },
      { re: /^Climb 2 rungs to rung (\d)!$/, es: "¡Subes 2 peldaños, al peldaño $1!" },
      { re: /^Slide down to rung (\d)\.$/, es: "Bajas al peldaño $1." },
      { re: /^Slide 2 rungs down to rung (\d)\.$/, es: "Bajas 2 peldaños, al peldaño $1." },
      { re: /^Stay on rung (\d)\.$/, es: "Te quedas en el peldaño $1." },
      { re: /^Your kid: climb to rung (\d)\.$/, es: "Tu hijo/a: sube al peldaño $1." },
      { re: /^Your kid: climb 2 rungs to rung (\d)!$/, es: "Tu hijo/a: ¡sube 2 peldaños, al peldaño $1!" },
      { re: /^Your kid: slide down to rung (\d)\.$/, es: "Tu hijo/a: baja al peldaño $1." },
      { re: /^Your kid: stay on rung (\d)\.$/, es: "Tu hijo/a: se queda en el peldaño $1." },
      // Bad-luck card cost line
      { re: /^You're on rung (\d), so savings cover it\. Cost: 0\. The Hales get the same card\. Their savings cover it\.$/, es: "Estás en el peldaño $1, así que tus ahorros lo cubren. Costo: 0. A los Hale les toca la misma carta. Sus ahorros la cubren." },
      { re: /^You're on rung (\d), with no savings cushion\. Cost: −1 this turn\. The Hales get the same card\. Their savings cover it\.$/, es: "Estás en el peldaño $1, sin colchón de ahorros. Costo: −1 en este turno. A los Hale les toca la misma carta. Sus ahorros la cubren." },
      // Life path chips
      { re: /^Born: rung (\d)$/, es: "Al nacer: peldaño $1" },
      { re: /^Age (\d\d): rung (\d)$/, es: "$1 años: peldaño $2" },
      // Mobility question
      { re: /^You were born on rung (\d) and ended your life on rung (\d)\. What do sociologists call that\?$/, es: "Naciste en el peldaño $1 y terminaste tu vida en el peldaño $2. ¿Cómo llaman a eso los sociólogos?" },
      // Final report
      { re: /^born on rung (\d) → you ended on rung (\d) → your kid is on rung (\d)$/, es: "naciste en el peldaño $1 → terminaste en el peldaño $2 → tu hijo/a está en el peldaño $3" }
    ],
    writing: {
      cause: [["dado", "suerte", "azar", "ventaja", "bono", "empez", "naci", "decision", "decidi", "escogi", "eleg", "universidad", "prestamo", "deuda", "colchon", "ahorr", "carta", "casa", "camion", "food truck", "almacen", "des moines", "turno", "aprendiz", "electricista", "guarderia", "padre", "hale", "hijo", "hija"]],
      open: [["7,5", "por ciento", "datos", "abajo", "arriba", "padre", "hijo", "hija", "nino", "naci", "nacimiento", "ventaja", "familia", "dinero", "ahorr", "colchon", "pasa", "hereda", "rico", "pobre", "casta", "quinto", "empez", "movilidad", "subir", "sube", "mover"]]
    }
  });
})();
