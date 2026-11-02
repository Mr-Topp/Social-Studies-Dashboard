// Spanish for "First Shift" (Sociology Unit 2 Day 1). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  const R = (cls, txt) => `<span class="sanction ${cls}">${txt}</span>`;
  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "First Shift · Status, Roles & Norms | Sociology Unit 2 Day 1": "Primer turno · Estatus, roles y normas | Sociología Unidad 2 Día 1",
      "Sociology · Unit 2 · Day 1": "Sociología · Unidad 2 · Día 1",
      "First Shift": "Primer turno",
      "Describe the components of culture.": "Describir los componentes de la cultura.",
      "Analyze how culture influences individuals, including themselves.": "Analizar cómo la cultura influye en las personas, incluyéndote a ti mismo.",
      "Evaluate important social institutions and how they respond to social needs.": "Evaluar instituciones sociales importantes y cómo responden a las necesidades sociales.",
      "Goal:": "Meta:",
      "Explain how statuses, roles, norms, and institutions shape what people do. · About 25 minutes.": "Explicar cómo los estatus, los roles, las normas y las instituciones influyen en lo que hace la gente. · Unos 25 minutos.",
      "Shift status": "Estado del turno",
      "Manager rating:": "Calificación de la encargada:",

      // ---------- Intro ----------
      "Clock in": "Empezar mi turno",
      "Your first job": "Tu primer trabajo",
      "Welcome to Cedar Grill": "Bienvenido a Cedar Grill",
      "You just got hired at Cedar Grill, a busy diner. Nobody hands you every rule. Some rules are written down. Some you only learn when people react to what you do.": "Te acaban de contratar en Cedar Grill, un restaurante con mucha clientela. Nadie te da todas las reglas. Algunas reglas están escritas. Otras solo las aprendes cuando la gente reacciona a lo que haces.",
      "Shift manager": "Encargada del turno",
      "Ms. Ortiz": "Sra. Ortiz",
      "Cook, 10 years here": "Cocinero, 10 años aquí",
      "A regular customer": "Una clienta frecuente",
      "You": "Tú",
      "New hire, student, older sibling": "Empleado nuevo, estudiante, hermano mayor",
      "1. Work your shift and make choices.": "1. Trabaja tu turno y toma decisiones.",
      "2. Answer each check. Wrong answers cost $1 in tips.": "2. Responde cada pregunta. Cada respuesta incorrecta te cuesta $1 de propinas.",
      "3. Write 2 short answers and turn in.": "3. Escribe 2 respuestas cortas y entrega.",
      "You start with $10 in tips and a 3-star rating.": "Empiezas con $10 en propinas y una calificación de 3 estrellas.",

      // ---------- Part 1 ----------
      "Part 1 of 4 · Saturday 10:30 AM": "Parte 1 de 4 · Sábado 10:30 AM",
      "Clock In: Who Are You Here?": "Inicio del turno: ¿quién eres aquí?",
      [`<p>A <b>status</b> is a position a person holds in a group, like <i>manager</i> or <i>sister</i>.</p>
        <p>An <b>ascribed status</b> is one you did not choose. An <b>achieved status</b> is one you earned or chose.</p>
        <p>A <b>role</b> is the behavior people expect from someone because of their status.</p>`]:
        `<p>Un <b>estatus (status)</b> es una posición que una persona tiene en un grupo, como <i>encargada</i> o <i>hermana</i>.</p>
        <p>Un <b>estatus adscrito (ascribed status)</b> es uno que no escogiste. Un <b>estatus adquirido (achieved status)</b> es uno que ganaste o escogiste.</p>
        <p>Un <b>rol (role)</b> es el comportamiento que la gente espera de alguien por su estatus.</p>`,
      [`<p class="ticket">Status check</p><p>Dana hands you a name tag and says: "Everybody here has more than one status. Let's sort yours." Decide if each one is <b>ascribed</b> or <b>achieved</b>.</p>`]:
        `<p class="ticket">Revisión de estatus</p><p>Dana te da una etiqueta con tu nombre y dice: "Aquí todos tienen más de un estatus. Vamos a clasificar los tuyos". Decide si cada uno es <b>adscrito</b> o <b>adquirido</b>.</p>`,
      "Sort 1 of 6": "Clasifica 1 de 6",
      "Sort 2 of 6": "Clasifica 2 de 6",
      "Sort 3 of 6": "Clasifica 3 de 6",
      "Sort 4 of 6": "Clasifica 4 de 6",
      "Sort 5 of 6": "Clasifica 5 de 6",
      "Sort 6 of 6": "Clasifica 6 de 6",
      "Being 17 years old": "Tener 17 años",
      "Ascribed status": "Estatus adscrito",
      "Achieved status": "Estatus adquirido",
      "Did you do anything to earn your age?": "¿Hiciste algo para ganarte tu edad?",
      "You can't choose or earn your age, so it is ascribed.": "No puedes escoger ni ganarte tu edad, así que es adscrito.",
      "New hire at Cedar Grill": "Empleado nuevo en Cedar Grill",
      "Think about the application and interview.": "Piensa en la solicitud de empleo y la entrevista.",
      "You applied and got hired, so this status was achieved.": "Tú presentaste la solicitud y te contrataron, así que este estatus es adquirido.",
      "Older sibling": "Hermano mayor",
      "Did you pick the order you were born in?": "¿Escogiste en qué orden naciste?",
      "Birth order is not chosen, so it is ascribed.": "El orden de nacimiento no se escoge, así que es adscrito.",
      "Dana's status: shift manager": "El estatus de Dana: encargada del turno",
      "How does someone become a manager?": "¿Cómo llega alguien a ser encargado?",
      "Dana worked her way up, so manager is achieved.": "Dana fue subiendo con su trabajo, así que ser encargada es adquirido.",
      "Licensed driver": "Tener licencia para manejar",
      "What do you have to do to get a license?": "¿Qué tienes que hacer para sacar la licencia?",
      "You pass tests to get a license, so it is achieved.": "Tienes que aprobar exámenes para sacar la licencia, así que es adquirido.",
      "Someone's son or daughter": "Hijo o hija de alguien",
      "Did you choose your parents?": "¿Escogiste a tus padres?",
      "You are born into this status, so it is ascribed.": "Naces con este estatus, así que es adscrito.",
      "Your status here is <b>new hire</b>. Which of these is a <b>role</b> that comes with that status?": "Tu estatus aquí es <b>empleado nuevo</b>. ¿Cuál de estos es un <b>rol</b> que viene con ese estatus?",
      "Learning the menu and following training": "Aprender el menú y seguir el entrenamiento",
      "Being the oldest kid in your whole family": "Ser el hijo mayor de toda tu familia",
      "Turning seventeen years old this summer": "Cumplir diecisiete años este mismo verano",
      "Having your first name on your name tag": "Tener tu nombre escrito en tu etiqueta",
      "A role is something people expect you to DO because of the status.": "Un rol es algo que la gente espera que HAGAS por tu estatus.",
      "A role is expected behavior. New hires are expected to learn and follow training.": "Un rol es un comportamiento esperado. De los empleados nuevos se espera que aprendan y sigan el entrenamiento.",

      // ---------- Part 2 ----------
      "Part 2 of 4 · 12:00 PM rush": "Parte 2 de 4 · Hora pico de las 12:00 PM",
      "The Lunch Rush: Rules You Can See and Can't": "La hora del almuerzo: reglas que se ven y que no se ven",
      [`<p>A <b>norm</b> is a rule or expectation for how to act. Norms are part of <b>culture</b>.</p>
        <p><b>Formal norms</b> are written down, like laws and handbook rules. <b>Informal norms</b> are unwritten. People just expect them.</p>
        <p>A <b>sanction</b> is a reward or punishment that pushes people to follow a norm. A <b>positive sanction</b> rewards. A <b>negative sanction</b> punishes or discourages.</p>
        <p>Norms grow out of <b>values</b>: shared beliefs about what is important.</p>`]:
        `<p>Una <b>norma (norm)</b> es una regla o expectativa sobre cómo actuar. Las normas son parte de la <b>cultura (culture)</b>.</p>
        <p>Las <b>normas formales (formal norms)</b> están escritas, como las leyes y las reglas del manual. Las <b>normas informales (informal norms)</b> no están escritas. La gente simplemente las espera.</p>
        <p>Una <b>sanción (sanction)</b> es un premio o un castigo que empuja a la gente a seguir una norma. Una <b>sanción positiva (positive sanction)</b> premia. Una <b>sanción negativa (negative sanction)</b> castiga o desanima.</p>
        <p>Las normas nacen de los <b>valores (values)</b>: creencias compartidas sobre lo que es importante.</p>`,
      [`<p class="ticket">Order up</p><p>You just took out the trash. A sign by the sink says: <b>"Employees must wash hands before returning to work."</b> Orders are piling up.</p>`]:
        `<p class="ticket">Pedido listo</p><p>Acabas de sacar la basura. Un letrero junto al lavamanos dice: <b>"Los empleados deben lavarse las manos antes de volver al trabajo."</b> Los pedidos se están acumulando.</p>`,
      "Wash my hands first, even though it's busy": "Lavarme las manos primero, aunque haya mucho trabajo",
      [`<p>${R("pos","Positive sanction")}Dana nods: "Good habit. That's how we pass inspection." <b>+1 star.</b></p>`]:
        `<p>${R("pos","Sanción positiva")}Dana asiente: "Buen hábito. Así pasamos la inspección". <b>+1 estrella.</b></p>`,
      "Go straight to the line to save time": "Ir directo a la cocina para ahorrar tiempo",
      [`<p>${R("neg","Negative sanction")}Dana stops you: "Hands. Now. That's written policy and the health code." She writes a warning in the log. <b>−1 star, −$2.</b></p>`]:
        `<p>${R("neg","Sanción negativa")}Dana te detiene: "Las manos. Ya. Es una regla escrita y lo exige el código de salud". Escribe una advertencia en el registro. <b>−1 estrella, −$2.</b></p>`,
      "The handwashing rule is posted and in the employee handbook. What kind of norm is it?": "La regla de lavarse las manos está en un letrero y en el manual de empleados. ¿Qué tipo de norma es?",
      "A formal norm, because it is written down": "Una norma formal, porque está puesta por escrito",
      "An informal norm, since people just expect it": "Una norma informal, porque la gente la espera",
      "Not a norm, because it is only a good habit": "No es una norma, porque solo es un buen hábito",
      "A role, because only cooks are told to do it": "Un rol, porque solo se lo piden a los cocineros",
      "Look back at the sign. Where does this rule come from?": "Vuelve a mirar el letrero. ¿De dónde viene esta regla?",
      "It is written in policy and health code, so it is a formal norm.": "Está escrita en las reglas del local y en el código de salud, así que es una norma formal.",
      [`<p class="ticket">Seating</p><p>A family of four wants a booth. The only open one is <b>booth 4</b>. Nobody has told you anything about booth 4.</p>`]:
        `<p class="ticket">Mesas</p><p>Una familia de cuatro quiere una mesa. La única libre es la <b>mesa 4</b>. Nadie te ha dicho nada sobre la mesa 4.</p>`,
      "Seat the family in booth 4": "Sentar a la familia en la mesa 4",
      [`<p>${R("neg","Negative sanction")}At noon Ms. Ortiz walks in and stares at booth 4. Marcus mutters, "That's Ms. Ortiz's booth. Everybody knows that." She sits at the counter and leaves no tip. <b>−$3.</b></p><p>Nobody wrote this rule down. You learned it from people's reactions.</p>`]:
        `<p>${R("neg","Sanción negativa")}Al mediodía entra la Sra. Ortiz y se queda mirando la mesa 4. Marcus murmura: "Chamo, esa es la mesa de la Sra. Ortiz. Todo el mundo lo sabe". Ella se sienta en la barra y no deja propina. <b>−$3.</b></p><p>Nadie escribió esta regla. La aprendiste por cómo reaccionó la gente.</p>`,
      "Ask the family to wait 5 minutes for a different booth": "Pedirle a la familia que espere 5 minutos por otra mesa",
      [`<p>${R("pos","Positive sanction")}At noon Ms. Ortiz walks in and sits in booth 4, like she does every day. Marcus grins: "Good call. That's her booth." She leaves you $5. <b>+$5.</b></p><p>Nobody wrote this rule down. You got lucky this time.</p>`]:
        `<p>${R("pos","Sanción positiva")}Al mediodía entra la Sra. Ortiz y se sienta en la mesa 4, como todos los días. Marcus sonríe: "¡Buena esa, chamo! Esa es su mesa". Ella te deja $5. <b>+$5.</b></p><p>Nadie escribió esta regla. Esta vez tuviste suerte.</p>`,
      "The \"booth 4 belongs to Ms. Ortiz\" rule is not written anywhere. What is it?": "La regla de que \"la mesa 4 es de la Sra. Ortiz\" no está escrita en ningún lado. ¿Qué es?",
      "An informal norm that people expect anyway": "Una norma informal que la gente igual espera",
      "A formal norm that is in the store policy": "Una norma formal que está en el reglamento del local",
      "A status that Ms. Ortiz earned by eating": "Un estatus que la Sra. Ortiz ganó comiendo allí",
      "A sanction that the manager puts in the log": "Una sanción que la encargada anota en el registro",
      "Is the rule written down? Do people still expect it?": "¿La regla está escrita? ¿La gente igual la espera?",
      "It is unwritten but expected, so it is an informal norm.": "No está escrita pero se espera, así que es una norma informal.",
      "How do new workers usually learn an <b>informal</b> norm like the booth 4 rule?": "¿Cómo suelen aprender los trabajadores nuevos una norma <b>informal</b> como la regla de la mesa 4?",
      "By noticing how others react to what they do": "Fijándose en cómo reaccionan los demás a lo que hacen",
      "By reading the rule in the employee handbook": "Leyendo la regla en el manual de empleados",
      "By passing a written test before the first day": "Aprobando un examen escrito antes del primer día",
      "By looking it up in Iowa's restaurant laws": "Buscándola en las leyes de restaurantes de Iowa",
      "Think about how you found out about booth 4.": "Piensa en cómo te enteraste de lo de la mesa 4.",
      "Informal norms aren't written, so people learn them from others' reactions, which are sanctions.": "Las normas informales no están escritas, así que la gente las aprende por las reacciones de los demás, que son sanciones.",
      [`<p class="ticket">Slow minute</p><p>It's quiet for a minute. Your phone buzzes. The handbook says <b>"No personal phone use on the floor."</b></p>`]:
        `<p class="ticket">Un momento tranquilo</p><p>Hay calma por un minuto. Tu celular vibra. El manual dice: <b>"No usar el celular personal en el área de servicio."</b></p>`,
      "Check it quickly behind the counter": "Revisarlo rápido detrás de la barra",
      [`<p>${R("neg","Negative sanction")}Dana walks by: "Phone away, please. Break is at 2." <b>−1 star.</b></p>`]:
        `<p>${R("neg","Sanción negativa")}Dana pasa y dice: "Guarda el celular, por favor. El descanso es a las 2". <b>−1 estrella.</b></p>`,
      "Wait and check it on break in the back": "Esperar y revisarlo en el descanso, atrás",
      [`<p>${R("pos","Positive sanction")}Dana notices you waited and says, "Thanks for keeping the floor covered." <b>+1 star.</b></p>`]:
        `<p>${R("pos","Sanción positiva")}Dana nota que esperaste y dice: "Gracias por estar pendiente de los clientes". <b>+1 estrella.</b></p>`,
      "When Dana says <i>\"Phone away, please,\"</i> what is she doing?": "Cuando Dana dice <i>\"Guarda el celular, por favor\"</i>, ¿qué está haciendo?",
      "Giving a negative sanction to stop a behavior": "Dando una sanción negativa para frenar una conducta",
      "Giving a positive sanction to reward a behavior": "Dando una sanción positiva para premiar una conducta",
      "Creating a brand-new formal norm for the diner": "Creando una norma formal nueva para el restaurante",
      "Changing her status from manager to coworker": "Cambiando su estatus de encargada a compañera",
      "Is she rewarding the behavior or discouraging it?": "¿Está premiando la conducta o desanimándola?",
      "She is discouraging phone use, so it is a negative sanction.": "Está desanimando el uso del celular, así que es una sanción negativa.",
      [`<p class="ticket">End of the rush</p><p>Ms. Ortiz tells Dana you did a great job today. Dana says: "Want the window section tomorrow? That's where the best tips are."</p>`]:
        `<p class="ticket">Se acaba la hora pico</p><p>La Sra. Ortiz le dice a Dana que hiciste un gran trabajo hoy. Dana dice: "¿Quieres la sección de las ventanas mañana? Ahí es donde están las mejores propinas".</p>`,
      "Say thanks and take the window section": "Dar las gracias y aceptar la sección de las ventanas",
      [`<p>${R("pos","Positive sanction")}You get the best section tomorrow. <b>+$4, +1 star.</b></p>`]:
        `<p>${R("pos","Sanción positiva")}Mañana te toca la mejor sección. <b>+$4, +1 estrella.</b></p>`,
      "Dana giving you the best section is an example of a…": "Que Dana te dé la mejor sección es un ejemplo de…",
      "Positive sanction that rewards good work": "Sanción positiva que premia el buen trabajo",
      "Negative sanction that punishes bad work": "Sanción negativa que castiga el mal trabajo",
      "Formal norm that is written in the handbook": "Norma formal que está escrita en el manual",
      "Ascribed status that comes with being born": "Estatus adscrito que viene desde que naces",
      "Did something good or bad happen to you?": "¿Te pasó algo bueno o algo malo?",
      "A reward for good behavior is a positive sanction.": "Un premio por buena conducta es una sanción positiva.",
      "Everyone at Cedar Grill believes <b>regulars come first</b>. That shared belief about what matters is a…": "Todos en Cedar Grill creen que <b>los clientes frecuentes van primero</b>. ¿Qué es esa creencia compartida sobre lo que importa?",
      "Value": "Valor",
      "Norm": "Norma",
      "Sanction": "Sanción",
      "Status": "Estatus",
      "Is it a rule for how to act, or a belief about what is important?": "¿Es una regla sobre cómo actuar o una creencia sobre lo que es importante?",
      "A shared belief about what is important is a value. The booth 4 rule is the norm that grows out of it.": "Una creencia compartida sobre lo que es importante es un valor. La regla de la mesa 4 es la norma que nace de ese valor.",
      "Which pair shows <b>material</b> culture and then <b>nonmaterial</b> culture at Cedar Grill?": "¿Qué par muestra primero la cultura <b>material</b> (material culture) y luego la cultura <b>no material</b> (nonmaterial culture) en Cedar Grill?",
      "Your name tag, and the booth 4 rule": "Tu etiqueta de nombre, y la regla de la mesa 4",
      "The booth 4 rule, and your name tag": "La regla de la mesa 4, y tu etiqueta de nombre",
      "The menu board, and the kitchen grill": "El tablero del menú, y la parrilla de la cocina",
      "Respect for regulars, and handwashing": "El respeto a los clientes frecuentes, y lavarse las manos",
      "Material = things you can touch. Nonmaterial = ideas and rules.": "Material = cosas que puedes tocar. No material = ideas y reglas.",
      "A name tag is a physical object (material). The booth 4 rule is an idea people share (nonmaterial).": "Una etiqueta de nombre es un objeto físico (material). La regla de la mesa 4 es una idea que la gente comparte (no material).",

      // ---------- Part 3 ----------
      "Part 3 of 4 · 5:30 PM": "Parte 3 de 4 · 5:30 PM",
      "Too Many Roles at Once": "Demasiados roles a la vez",
      [`<p><b>Role conflict</b>: the roles of two <i>different</i> statuses clash. (A coach whose own kid is on the team.)</p>
        <p><b>Role strain</b>: <i>one</i> status has so many expectations it's hard to keep up. (A student with four tests on one day.)</p>`]:
        `<p><b>Conflicto de roles (role conflict)</b>: los roles de dos estatus <i>diferentes</i> chocan. (Un entrenador cuyo propio hijo está en el equipo.)</p>
        <p><b>Tensión de rol (role strain)</b>: <i>un solo</i> estatus tiene tantas expectativas que cuesta cumplirlas todas. (Un estudiante con cuatro exámenes el mismo día.)</p>`,
      [`<p class="ticket">New text from Dana</p><p><b>"Can you cover Thursday 3–9? Someone called in."</b></p><p>But Thursday you have a <b>make-up test after school</b>, and you promised to <b>watch your little brother</b>.</p>`]:
        `<p class="ticket">Mensaje nuevo de Dana</p><p><b>"¿Puedes cubrir el jueves de 3 a 9? Alguien avisó que no viene."</b></p><p>Pero el jueves tienes un <b>examen pendiente después de clases</b>, y prometiste <b>cuidar a tu hermanito</b>.</p>`,
      "Cover the shift. I need the money.": "Cubrir el turno. Necesito la plata.",
      [`<p>You earn about $6 more in tips and Dana is grateful. But you miss the make-up test, and your mom has to leave work early to get your brother. Every choice cost something.</p>`]:
        `<p>Ganas unos $6 más en propinas y Dana te lo agradece. Pero faltas al examen pendiente, y tu mamá tiene que salir temprano del trabajo para buscar a tu hermano. Cada decisión tuvo un costo.</p>`,
      "Say no. Explain the test and my brother.": "Decir que no. Explicar lo del examen y mi hermano.",
      [`<p>Dana says, "Okay, thanks for telling me early." You take the test and watch your brother. You miss the extra money. Every choice cost something.</p>`]:
        `<p>Dana dice: "Está bien, gracias por avisarme con tiempo". Presentas el examen y cuidas a tu hermano. Te pierdes el dinero extra. Cada decisión tuvo un costo.</p>`,
      "Offer to cover only 6–9, after the test": "Ofrecer cubrir solo de 6 a 9, después del examen",
      [`<p>Dana takes the deal. You take the test, then ask a neighbor to watch your brother for 2 hours. You earn about $3. Even a compromise cost something.</p>`]:
        `<p>Dana acepta el trato. Presentas el examen y luego le pides a un vecino que cuide a tu hermano por 2 horas. Ganas unos $3. Hasta un punto medio tuvo un costo.</p>`,
      "Worker, student, and older sibling all want your Thursday. What is this?": "Trabajador, estudiante y hermano mayor: todos quieren tu jueves. ¿Qué es esto?",
      "Role conflict: roles of different statuses clash": "Conflicto de roles: chocan roles de estatus distintos",
      "Role strain: one status has too many demands": "Tensión de rol: un estatus tiene demasiadas exigencias",
      "A formal norm: written rules from a handbook": "Una norma formal: reglas escritas de un manual",
      "An ascribed status: something you didn't choose": "Un estatus adscrito: algo que no escogiste",
      "How many different statuses are pulling on you?": "¿Cuántos estatus diferentes te piden algo al mismo tiempo?",
      "Three different statuses (worker, student, sibling) clash, so it is role conflict.": "Tres estatus diferentes (trabajador, estudiante, hermano) chocan, así que es conflicto de roles.",
      [`<p class="ticket">Dinner rush</p><p>You have <b>6 tables</b>. Table 2 wants refills, table 5 is ready to order, table 1 wants the check, and the register line is growing. All of this is part of being a server.</p>`]:
        `<p class="ticket">Hora pico de la cena</p><p>Tienes <b>6 mesas</b>. La mesa 2 quiere que le rellenes las bebidas, la mesa 5 está lista para pedir, la mesa 1 quiere la cuenta y la cola de la caja está creciendo. Todo esto es parte de ser mesonero.</p>`,
      "Ask Marcus to run the register for 5 minutes": "Pedirle a Marcus que atienda la caja por 5 minutos",
      [`<p>Marcus helps out. Things calm down. Dana likes that you asked for help. <b>+1 star.</b></p>`]:
        `<p>Marcus ayuda. Las cosas se calman. A Dana le gustó que pidieras ayuda. <b>+1 estrella.</b></p>`,
      "Try to do it all myself as fast as I can": "Intentar hacerlo todo yo solo lo más rápido posible",
      [`<p>You get it done, but table 5 waits 15 minutes and tips less. <b>−$2.</b></p>`]:
        `<p>Lo logras, pero la mesa 5 espera 15 minutos y deja menos propina. <b>−$2.</b></p>`,
      "Six tables, refills, orders, and the register, all as a server. What is this?": "Seis mesas, bebidas, pedidos y la caja, todo como mesonero. ¿Qué es esto?",
      "A positive sanction: a reward for working hard": "Una sanción positiva: un premio por trabajar duro",
      "An informal norm: an unwritten diner rule": "Una norma informal: una regla no escrita del local",
      "Is this one status or several?": "¿Es un solo estatus o varios?",
      "It's all one status (server) with too many expectations, so it is role strain.": "Es un solo estatus (mesonero) con demasiadas expectativas, así que es tensión de rol.",

      // ---------- Part 4 ----------
      "Part 4 of 4 · 9:00 PM close": "Parte 4 de 4 · Cierre a las 9:00 PM",
      "Bigger Than the Diner: Institutions": "Más grande que el restaurante: las instituciones",
      [`<p>A <b>social institution</b> is an organized system that meets a big need in society.</p>
        <p>Five major ones: <b>family, education, religion, the economy,</b> and <b>government</b>. Cedar Grill is part of the <b>economy</b>.</p>
        <p>Institutions also <b>respond</b> when society's needs change.</p>`]:
        `<p>Una <b>institución social (social institution)</b> es un sistema organizado que satisface una gran necesidad de la sociedad.</p>
        <p>Cinco instituciones principales: <b>la familia (family), la educación (education), la religión (religion), la economía (economy)</b> y <b>el gobierno (government)</b>. Cedar Grill es parte de la <b>economía</b>.</p>
        <p>Las instituciones también <b>responden</b> cuando cambian las necesidades de la sociedad.</p>`,
      [`<p class="ticket">Closing time</p><p>While you wipe tables, you think about how your shift connects to bigger systems. Match each need to the institution that meets it.</p>`]:
        `<p class="ticket">Hora de cerrar</p><p>Mientras limpias las mesas, piensas en cómo tu turno se conecta con sistemas más grandes. Une cada necesidad con la institución que la satisface.</p>`,
      "Need 1 of 5": "Necesidad 1 de 5",
      "Need 2 of 5": "Necesidad 2 de 5",
      "Need 3 of 5": "Necesidad 3 de 5",
      "Need 4 of 5": "Necesidad 4 de 5",
      "Need 5 of 5": "Necesidad 5 de 5",
      "People need jobs, paychecks, and a way to buy and sell food.": "La gente necesita empleos, sueldos y una forma de comprar y vender comida.",
      "Economy": "Economía",
      "Education": "Educación",
      "Religion": "Religión",
      "Family": "Familia",
      "Government": "Gobierno",
      "Which institution is about work, money, and goods?": "¿Qué institución tiene que ver con el trabajo, el dinero y los productos?",
      "Jobs and buying and selling are the economy. Cedar Grill is part of it.": "Los empleos y la compra y venta son parte de la economía. Cedar Grill es parte de ella.",
      "Someone needs to make sure restaurant food is safe to eat.": "Alguien tiene que asegurarse de que la comida de los restaurantes sea segura.",
      "Who sends inspectors and makes health codes?": "¿Quién manda inspectores y hace los códigos de salud?",
      "Health codes and inspections come from government.": "Los códigos de salud y las inspecciones vienen del gobierno.",
      "Teens need to learn skills and earn a diploma.": "Los jóvenes necesitan aprender habilidades y sacar su título de bachiller.",
      "Which institution runs schools?": "¿Qué institución se encarga de los liceos?",
      "Schools are the institution of education.": "Los liceos y las escuelas son parte de la institución de la educación.",
      "Kids need care, love, and someone to raise them.": "Los niños necesitan cuidado, cariño y alguien que los críe.",
      "Who usually raises children first?": "¿Quién suele criar a los niños primero?",
      "Raising and caring for children is the main job of family.": "Criar y cuidar a los niños es la tarea principal de la familia.",
      "People look for meaning, shared beliefs, and traditions with a community.": "La gente busca sentido, creencias compartidas y tradiciones con una comunidad.",
      "Which institution is built around faith and shared beliefs?": "¿Qué institución se basa en la fe y en creencias compartidas?",
      "Religion meets the need for meaning, shared beliefs, and community traditions.": "La religión satisface la necesidad de sentido, creencias compartidas y tradiciones de la comunidad.",
      "Lots of teens work evening shifts and also go to school. Which is an example of an institution <b>responding to that need</b>?": "Muchos adolescentes trabajan en turnos de noche y también van al liceo. ¿Cuál es un ejemplo de una institución <b>que responde a esa necesidad</b>?",
      "A school adds flexible hours for working students": "Un liceo crea horarios flexibles para quien trabaja",
      "A school adds more homework to raise test scores": "Un liceo pone más tarea para subir las notas",
      "A diner raises prices when food costs go up": "Un restaurante sube los precios si la comida sube",
      "A teen asks the boss for fewer hours on weekdays": "Un joven le pide a su jefe menos horas entre semana",
      "Which choice changes a system because of the working-teen problem?": "¿Qué opción cambia un sistema por el problema de los jóvenes que trabajan?",
      "The school (education) changed how it works because working teens needed it. That's an institution responding to a social need.": "El liceo (educación) cambió su forma de funcionar porque los jóvenes que trabajan lo necesitaban. Eso es una institución respondiendo a una necesidad social.",

      // ---------- Finale ----------
      "Shift Report": "Reporte del turno",
      "tips earned": "en propinas",
      "manager rating": "calificación de la encargada",
      "Your tips and rating came from your choices <i>and</i> from rules you didn't know yet. That's how norms work.": "Tus propinas y tu calificación vinieron de tus decisiones <i>y</i> de reglas que todavía no conocías. Así funcionan las normas.",
      "Answer both in 1–2 sentences each.": "Responde las dos con 1–2 oraciones cada una.",
      "1. Pick one norm from your shift. Is it formal or informal? What sanction showed you the rule, and what value is behind it?": "1. Escoge una norma de tu turno. ¿Es formal o informal? ¿Qué sanción te mostró la regla y qué valor hay detrás de ella?",
      "The ___ rule is a (formal / informal) norm because ___. I knew it was a rule when ___. It shows Cedar Grill values ___.": "La regla de ___ es una norma (formal / informal) porque ___. Supe que era una regla cuando ___. Muestra que Cedar Grill valora ___.",
      "In answer 1, say if the norm is formal or informal AND what reaction (sanction) showed you the rule.": "En la respuesta 1, di si la norma es formal o informal Y qué reacción (sanción) te mostró la regla.",
      "2. Pick one social institution (family, education, religion, the economy, or government). How well does it meet a need for teens like you? Give one thing it does well and one way it falls short.": "2. Escoge una institución social (la familia, la educación, la religión, la economía o el gobierno). ¿Qué tan bien satisface una necesidad de jóvenes como tú? Da una cosa que hace bien y una forma en que se queda corta.",
      "The ___ meets teens' need for ___. It does well at ___, but it falls short because ___.": "La institución de ___ satisface la necesidad de los jóvenes de ___. Hace bien ___, pero se queda corta porque ___.",
      "In answer 2, name one institution: family, education, religion, the economy, or government.": "En la respuesta 2, nombra una institución: la familia, la educación, la religión, la economía o el gobierno.",

      // ---------- Short names (shown in "Next:", "✓" and writing messages) ----------
      "One norm, its sanction, and the value behind it": "Una norma, su sanción y el valor que hay detrás",
      "Evaluate one institution for teens": "Evalúa una institución para los jóvenes"
    },
    patterns: [
      { re: /^Tips: \$(\d+)$/, es: "Propinas: $$$1" },
      { re: /^(\d+) of 5 ★$/, es: "$1 de 5 ★" }
    ],
    writing: {
      norm: [
        ["formal", "informal"],
        ["sanción", "reacción", "reaccion", "encargad", "jefa", "reaccionó", "advirti", "advertencia", "regañ", "llamó la atención", "enoj", "molest", "quit", "perdí", "gané", "propina", "estrella", "dijo", "dijeron", "me dijo", "miró", "miraron", "mirando", "murmur", "asinti", "felicit", "premi", "castig", "sonri"]
      ],
      inst: [
        ["familia", "educación", "escuela", "colegio", "liceo", "religión", "iglesia", "economía", "negocio", "empresa", "trabajo", "trabaj", "empleo", "mesoner", "restaurante", "bachiller", "gobierno"]
      ]
    }
  });
})();
