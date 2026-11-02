// Spanish for "Same Bad Day, Three Wallets" (Sociology Unit 4 Day 2). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
// This page deals random "chance cards" (saved in localStorage after this file loads), so every
// luck-dependent string is added below for all 8 combinations of tire / manager / phone luck.
(function () {
  // Same helpers as the page, so the English keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const card = (lab, body) => `<div class="src-card"><p class="lab">${lab}</p>${body}</div>`;
  const inner = h => h.replace(/^<div class="trio">/, "").replace(/<\/div>$/, "");
  const trio = (j, s, m) => `<div class="trio"><div class="who j"><b>Jess</b>${j}</div><div class="who s"><b>Sam</b>${s}</div><div class="who m"><b>Morgan</b>${m}</div></div>`;

  const dict = {
    // ---------- Page frame ----------
    "Same Bad Day, Three Wallets | Sociology Unit 4 Day 2": "El mismo mal día, tres billeteras | Sociología Unidad 4 Día 2",
    "Sociology · Unit 4 · Day 2": "Sociología · Unidad 4 · Día 2",
    "Same Bad Day, Three Wallets": "El mismo mal día, tres billeteras",
    "Explain the concept of social stratification and its influence on societal structures and individual opportunities.": "Explicar el concepto de estratificación social y su influencia en las estructuras de la sociedad y en las oportunidades de cada persona.",
    "Analyze the effects of social inequality on groups and individuals.": "Analizar los efectos de la desigualdad social en los grupos y en las personas.",
    "Goal:": "Meta:",
    "Explain how social class shapes life chances, using one bad day played out three ways. · About 25 minutes.": "Explicar cómo la clase social influye en las oportunidades de vida, usando un mismo mal día vivido de tres maneras. · Unos 25 minutos.",
    "Progress and Jess's money and problems": "Progreso, y el dinero y los problemas de Jess",
    "Jess's bank:": "Banco de Jess:",
    "Problems piling up:": "Problemas acumulados:",

    // ---------- Intro ----------
    "Start the day": "Empezar el día",
    "One Tuesday in Cedar Rapids": "Un martes en Cedar Rapids",
    "Same bad day. Three wallets.": "El mismo mal día. Tres billeteras.",
    // (The intro's trio box is matched by its inside, so the outer <div class="trio"> is cut off.)
    [inner(trio(`<p>24, grocery cashier, $14/hour, about 30 hours a week. Raising her son Eli (4).</p><p><b style="display:inline">$85</b> in the bank. Payday is Friday.</p>`,
      `<p>38, office job at an insurance company, $28/hour. Has paid sick days.</p><p><b style="display:inline">$2,500</b> in savings.</p>`,
      `<p>45, hospital manager. Salary about $140,000. Can work from home.</p><p><b style="display:inline">$25,000</b> in savings.</p>`))]:
      inner(trio(`<p>24 años, cajera de supermercado, $14 por hora, unas 30 horas a la semana. Cría a su hijo Eli (4 años).</p><p><b style="display:inline">$85</b> en el banco. Cobra el viernes.</p>`,
        `<p>38 años, trabajo de oficina en una compañía de seguros, $28 por hora. Tiene días de enfermedad pagados.</p><p><b style="display:inline">$2,500</b> en ahorros.</p>`,
        `<p>45 años, gerente de un hospital. Sueldo de unos $140,000 al año. Puede trabajar desde casa.</p><p><b style="display:inline">$25,000</b> en ahorros.</p>`)),
    "All three get hit with the <b>same three problems</b> today: a flat tire, a sick kid, and a broken phone. You make Jess's choices. Some things are up to <b>chance</b>, like in real life.":
      "A las tres les caen los <b>mismos tres problemas</b> hoy: un caucho espichado, un hijo enfermo y un celular roto. Tú tomas las decisiones de Jess. Algunas cosas dependen del <b>azar</b>, como en la vida real.",
    "1. Read what happens to all three.": "1. Lee lo que les pasa a las tres.",
    "2. Choose what Jess does. Watch her bank and her pile of problems.": "2. Escoge lo que hace Jess. Mira su banco y su montón de problemas.",
    "3. Answer the checks, then write 2 short answers.": "3. Responde las preguntas y luego escribe 2 respuestas cortas.",
    "Jess, Sam, and Morgan are made up. Their situations are common. The statistics are real.": "Jess, Sam y Morgan son inventadas. Sus situaciones son comunes. Las estadísticas son reales.",

    // ---------- Part 1 ----------
    "Part 1 of 3 · 7:15 a.m.": "Parte 1 de 3 · 7:15 a.m.",
    "Flat Tire": "Caucho espichado",
    [`<p><b>Social stratification</b> means a society is ranked in layers, like rock layers. People are sorted by wealth, power, and status into <b>social classes</b>: upper, middle, working, and lower class.</p>
        <p>Sociologist <b>Max Weber</b> used the term <b>life chances</b>: the opportunities you have, and the risks you face, because of your class position.</p>`]:
      `<p>La <b>estratificación social (social stratification)</b> significa que una sociedad está ordenada en capas, como las capas de una roca. La gente queda repartida según su riqueza, su poder y su estatus en <b>clases sociales (social classes)</b>: clase alta, media, trabajadora y baja.</p>
        <p>El sociólogo <b>Max Weber</b> usó el término <b>oportunidades de vida (life chances)</b>: las oportunidades que tienes, y los riesgos que enfrentas, por tu posición de clase.</p>`,
    [`<p><b>What does Jess do?</b> The spare is a small "donut" tire. It's only meant for short, slow trips.</p>`]:
      `<p><b>¿Qué hace Jess?</b> El repuesto es un caucho pequeño de emergencia. Solo sirve para viajes cortos y despacio.</p>`,
    "Drive to work on the spare, fix the tire after her shift": "Manejar al trabajo con el repuesto y arreglar el caucho después del turno",
    "Call in late and get the tire fixed right now": "Avisar que llega tarde y arreglar el caucho ya mismo",
    "Can't afford it. Drive on the donut spare all week.": "No le alcanza. Manejar con el repuesto pequeño toda la semana.",
    [`<p>${T("flat","$0 now")}${T("down","+2 problems")}She saves money today, but driving on a donut all week is risky. If it fails on the highway, she'll need a tow AND a tire. The problem didn't go away. It got pushed down the road.</p>`]:
      `<p>${T("flat","$0 por ahora")}${T("down","+2 problemas")}Hoy ahorra dinero, pero manejar con el repuesto pequeño toda la semana es arriesgado. Si falla en la autopista, va a necesitar una grúa Y un caucho. El problema no desapareció. Solo lo pateó para más adelante.</p>`,

    "Based on her job, pay, and savings, which social class is Jess most likely in?": "Según su trabajo, su sueldo y sus ahorros, ¿en qué clase social es más probable que esté Jess?",
    "Working class": "Clase trabajadora",
    "Upper class": "Clase alta",
    "Upper-middle class": "Clase media alta",
    "Wealthy elite": "Élite adinerada",
    "Look at Jess's job and pay on the start card. Which layer has hourly jobs with little savings?": "Mira el trabajo y el sueldo de Jess en la tarjeta del inicio. ¿Qué capa tiene trabajos pagados por hora y pocos ahorros?",
    "Hourly service work with low pay and little savings fits the working class. Morgan, with a high salary and big savings, is upper-middle class.": "Un trabajo de servicio pagado por hora, con sueldo bajo y pocos ahorros, corresponde a la clase trabajadora. Morgan, con un sueldo alto y muchos ahorros, es de clase media alta.",

    [card("Federal Reserve survey of U.S. adults, 2024", `<p>If you had a surprise <b>$400</b> bill, could you pay it with cash or money in the bank?</p><div class="barchart"><div class="row"><span>Yes, with cash</span><div class="t"><span style="width:63%"></span></div><b>63%</b></div><div class="row low"><span>No (would borrow, sell something, or couldn't pay)</span><div class="t"><span style="width:37%"></span></div><b>37%</b></div></div>`) + "About how many U.S. adults could <b>not</b> cover a surprise $400 bill with cash?"]:
      card("Encuesta de la Reserva Federal (Federal Reserve) a adultos de EE. UU., 2024", `<p>Si te llegara una cuenta sorpresa de <b>$400</b>, ¿podrías pagarla en efectivo o con dinero del banco?</p><div class="barchart"><div class="row"><span>Sí, en efectivo</span><div class="t"><span style="width:63%"></span></div><b>63%</b></div><div class="row low"><span>No (pediría prestado, vendería algo o no podría pagar)</span><div class="t"><span style="width:37%"></span></div><b>37%</b></div></div>`) + "¿Más o menos cuántos adultos en EE. UU. <b>no</b> podrían pagar en efectivo una cuenta sorpresa de $400?",
    "About 4 in 10": "Unos 4 de cada 10",
    "About 1 in 10": "Unos 1 de cada 10",
    "About 6 in 10": "Unos 6 de cada 10",
    "About 9 in 10": "Unos 9 de cada 10",
    "Look at the bottom bar. Round it to the nearest ten.": "Mira la barra de abajo. Redondéala a la decena más cercana.",
    "37% is about 4 in 10 adults. For them, a $140 tire is a real emergency, like it is for Jess.": "37% es más o menos 4 de cada 10 adultos. Para ellos, un caucho de $140 es una emergencia de verdad, como para Jess.",

    "All three had the same flat tire. Why was it a tiny problem for Morgan and a big one for Jess?": "Las tres tuvieron el mismo caucho espichado. ¿Por qué fue un problema pequeño para Morgan y uno grande para Jess?",
    "Morgan had savings, a flexible job, and backups": "Morgan tenía ahorros, un trabajo flexible y respaldo",
    "Morgan is a much more careful and safer driver": "Morgan maneja con mucho más cuidado y seguridad",
    "Morgan's flat tire was smaller and easier to fix": "El caucho de Morgan era más pequeño y fácil de arreglar",
    "Jess made worse choices than Morgan did today": "Jess tomó peores decisiones que Morgan hoy",
    "Compare what each person HAD when the tire went flat.": "Compara lo que cada una TENÍA cuando se le espichó el caucho.",
    "The event was the same. What was different was the cushion: money, job flexibility, and help. That's what life chances look like in real life.": "El problema fue el mismo. Lo que cambió fue el colchón: dinero, un trabajo flexible y ayuda. Así se ven las oportunidades de vida en la vida real.",

    // ---------- Part 2 ----------
    "Part 2 of 3 · 10:30 a.m.": "Parte 2 de 3 · 10:30 a.m.",
    "Sick Kid": "Hijo enfermo",
    [`<p>Daycares and schools usually send a child home with a fever. Most require the child to stay home until they've gone <b>24 hours</b> with no fever. So a parent has to leave work, and maybe miss tomorrow too.</p>`]:
      `<p>Las guarderías y las escuelas casi siempre mandan a la casa a un niño con fiebre. La mayoría exige que el niño se quede en casa hasta pasar <b>24 horas</b> sin fiebre. Entonces el papá o la mamá tiene que salir del trabajo, y a lo mejor faltar mañana también.</p>`,
    [`<p>The daycare calls all three parents: "Your child has a fever. Please pick them up within the hour."</p>` + trio(
        `<p>Gets no paid sick days. If she leaves, she loses pay. She may need tomorrow off too.</p>`,
        `<p>Uses a paid sick day. Gets paid like normal.</p>`,
        `<p>Picks up her son and works from home while he naps.</p>`)
      + card("Bureau of Labor Statistics, March 2022 · private-industry workers with paid sick days", `<div class="barchart"><div class="row low"><span>Lowest-paid 10% of workers</span><div class="t"><span style="width:38%"></span></div><b>38%</b></div><div class="row"><span>Highest-paid 10% of workers</span><div class="t"><span style="width:96%"></span></div><b>96%</b></div></div>`)]:
      `<p>La guardería llama a las tres mamás: "Su hijo tiene fiebre. Por favor, venga a buscarlo antes de una hora."</p>` + trio(
        `<p>No tiene días de enfermedad pagados. Si se va, pierde sueldo. A lo mejor también tiene que faltar mañana.</p>`,
        `<p>Usa un día de enfermedad pagado. Le pagan normal.</p>`,
        `<p>Busca a su hijo y trabaja desde casa mientras él duerme la siesta.</p>`)
      + card("Oficina de Estadísticas Laborales (Bureau of Labor Statistics), marzo 2022 · trabajadores de empresas privadas con días de enfermedad pagados", `<div class="barchart"><div class="row low"><span>El 10% de trabajadores que menos gana</span><div class="t"><span style="width:38%"></span></div><b>38%</b></div><div class="row"><span>El 10% de trabajadores que más gana</span><div class="t"><span style="width:96%"></span></div><b>96%</b></div></div>`),
    [`<p><b>What does Jess do?</b> She's on the register. Two coworkers already called in today.</p>`]:
      `<p><b>¿Qué hace Jess?</b> Está en la caja. Dos compañeros ya avisaron hoy que no venían.</p>`,
    "Leave work and get Eli, losing the rest of her shift": "Salir del trabajo a buscar a Eli y perder el resto del turno",
    "Ask her mom to get Eli, even though her mom has to leave her own job": "Pedirle a su mamá que busque a Eli, aunque su mamá tenga que salir de su propio trabajo",
    [`<p>${T("flat","$0 for Jess")}${T("down","+1 problem")}Jess keeps her pay, but her mom loses 4 hours at the warehouse. The cost just moved to someone else in the family.</p>`]:
      `<p>${T("flat","$0 para Jess")}${T("down","+1 problema")}Jess no pierde sueldo, pero su mamá pierde 4 horas en el almacén. El costo solo pasó a otra persona de la familia.</p>`,
    "Ask her manager to switch tomorrow to a later shift": "Pedirle a su encargado cambiar el turno de mañana para más tarde",
    [`<p>${T("down","−$56")}${T("down","+2 problems")}The manager says no: "We're short already." Jess has to leave today anyway and lose pay. Now she's on thin ice at work.</p>`]:
      `<p>${T("down","−$56")}${T("down","+2 problemas")}El encargado dice que no: "Ya estamos cortos de personal." Jess igual tiene que irse hoy y pierde sueldo. Ahora está en la cuerda floja en el trabajo.</p>`,
    [`<p>${T("down","−$56")}${T("flat","no new problem")}Jess still loses today's pay, but her manager agrees to the later shift tomorrow. Luck helped this time.</p>`]:
      `<p>${T("down","−$56")}${T("flat","ningún problema nuevo")}Jess igual pierde el sueldo de hoy, pero su encargado acepta darle el turno de más tarde mañana. Esta vez la suerte ayudó.</p>`,

    "What does the sick-day chart show?": "¿Qué muestra la gráfica de días de enfermedad?",
    "Fewer than half of the lowest-paid workers get paid sick days": "Menos de la mitad de los que menos ganan tienen días de enfermedad pagados",
    "Most of the lowest-paid workers get paid sick days now": "La mayoría de los que menos ganan ya tienen días de enfermedad pagados",
    "The highest-paid workers are the least likely to get them": "Los que más ganan son los que menos probabilidad tienen de tenerlos",
    "Both groups get paid sick days at about the same rate": "Los dos grupos tienen días de enfermedad pagados casi por igual",
    "Compare the two bars. Is 38% more or less than half?": "Compara las dos barras. ¿38% es más o menos de la mitad?",
    "Only 38% of the lowest-paid workers had paid sick days, compared with 96% of the highest-paid. The workers who can least afford to lose pay are the most likely to lose it.": "Solo el 38% de los trabajadores que menos ganan tenía días de enfermedad pagados, comparado con el 96% de los que más ganan. Los trabajadores que menos pueden darse el lujo de perder sueldo son los que más probabilidad tienen de perderlo.",

    "Why do sociologists call this <b>stratification</b>, not just bad luck?": "¿Por qué los sociólogos llaman a esto <b>estratificación</b> y no solo mala suerte?",
    "The same gaps show up again and again by class": "Las mismas brechas aparecen una y otra vez según la clase",
    "Jess just happens to have worse luck than others": "Jess simplemente tiene peor suerte que los demás",
    "Paid sick days are handed out totally at random": "Los días de enfermedad pagados se reparten al azar",
    "Low-paid workers usually turn down sick days": "Los trabajadores mal pagados casi siempre rechazan esos días",
    "Think about the word \"layers.\" Is the chart about one person or about whole groups?": "Piensa en la palabra \"capas\". ¿La gráfica habla de una persona o de grupos enteros?",
    "Luck decides which day the kid gets sick. But who gets paid sick days follows a pattern by class layer. That pattern is stratification.": "La suerte decide qué día se enferma el niño. Pero quién tiene días de enfermedad pagados sigue un patrón según la capa de clase. Ese patrón es la estratificación.",

    "How did the flat tire make the sick-kid problem worse for Jess?": "¿Cómo empeoró el caucho espichado el problema del hijo enfermo para Jess?",
    "It already drained her cushion, so lost pay hurt more": "Ya le había vaciado el colchón, así que perder sueldo dolió más",
    "It made Eli sick, so she had to take him home early": "Hizo que Eli se enfermara, así que tuvo que llevarlo a casa",
    "It meant Jess had paid sick days she couldn't use": "Hizo que Jess tuviera días pagados que no podía usar",
    "It made her manager give her more hours that week": "Hizo que su encargado le diera más horas esa semana",
    "Check Jess's bank in the top bar. What was it before the daycare called?": "Revisa el banco de Jess en la barra de arriba. ¿Cuánto tenía antes de que llamara la guardería?",
    "Each problem uses up money and goodwill, so the next problem hits harder. Sociologists call this disadvantages piling up.": "Cada problema gasta dinero y buena voluntad, así que el siguiente problema pega más fuerte. Los sociólogos llaman a esto acumulación de desventajas.",

    // ---------- Part 3 ----------
    "Part 3 of 3 · 7:00 p.m.": "Parte 3 de 3 · 7:00 p.m.",
    "Broken Phone": "Celular roto",
    [`<p>For many low-income families, a phone isn't extra. It's their only internet. It holds the work schedule app, daycare messages, the bank app, and job applications.</p>`]:
      `<p>Para muchas familias de bajos ingresos, el celular no es un lujo. Es su único internet. Ahí tienen la app del horario de trabajo, los mensajes de la guardería, la app del banco y las solicitudes de empleo.</p>`,
    [`<p><b>What does Jess do?</b> A sign at the strip mall says: "<b>Need cash today? Payday loans up to $500.</b>"</p>`]:
      `<p><b>¿Qué hace Jess?</b> Un letrero en un centro comercial pequeño dice: "<b>¿Necesitas efectivo hoy? Préstamos rápidos de hasta $500.</b>"</p>`,
    "Fix the phone with whatever money is left": "Arreglar el celular con el dinero que le quede",
    "Take a $300 payday loan to cover the phone and catch up": "Sacar un préstamo rápido de $300 para pagar el celular y ponerse al día",
    "Go without a phone for a week": "Quedarse sin celular una semana",

    [card("Consumer Financial Protection Bureau (U.S. government)", `<p>A typical two-week payday loan charges about <b>$15 for every $100</b> borrowed. Over a year, that equals an interest rate of almost <b>400%</b>. A credit card is often around 20 to 25%.</p>`) + "What does this show about being low-income?"]:
      card("Oficina de Protección Financiera del Consumidor (Consumer Financial Protection Bureau, gobierno de EE. UU.)", `<p>Un préstamo rápido (payday loan) típico de dos semanas cobra más o menos <b>$15 por cada $100</b> prestados. En un año, eso equivale a una tasa de interés de casi <b>400%</b>. Una tarjeta de crédito muchas veces cobra entre 20 y 25%.</p>`) + "¿Qué muestra esto sobre tener bajos ingresos?",
    "Borrowing costs more for people with less money": "Pedir prestado le cuesta más a quien tiene menos dinero",
    "Payday loans are cheaper than most credit cards": "Los préstamos rápidos son más baratos que las tarjetas",
    "Only wealthy people are allowed to borrow money": "Solo a la gente rica le permiten pedir prestado",
    "Interest rates are the same no matter who borrows": "Los intereses son iguales sin importar quién pida",
    "Compare almost 400% to around 20–25%. Who uses each one?": "Compara casi 400% con más o menos 20–25%. ¿Quién usa cada uno?",
    "Sam used a credit card. Jess's option was a payday loan that costs far more. People with less money often pay more for the same help.": "Sam usó una tarjeta de crédito. La opción de Jess era un préstamo rápido que cuesta muchísimo más. La gente con menos dinero muchas veces paga más por la misma ayuda.",

    "Based on the Pew chart, why is a broken phone a bigger deal for Jess than for Sam?": "Según la gráfica de Pew, ¿por qué un celular roto es un problema más grande para Jess que para Sam?",
    "Lower-income adults are more likely to have no other internet": "Los adultos de menos ingresos más a menudo no tienen otro internet",
    "Lower-income adults use their phones less than richer adults": "Los adultos de menos ingresos usan el celular menos que los más ricos",
    "Higher-income adults are more likely to rely on just a phone": "Los adultos de más ingresos dependen más de tener solo un celular",
    "Phones cost much less to fix in lower-income neighborhoods": "Arreglar un celular cuesta mucho menos en zonas de bajos ingresos",
    "Which income group has the longer bar?": "¿Qué grupo de ingresos tiene la barra más larga?",
    "About 28% of adults earning under $30,000 (more than 1 in 4) rely on a phone for home internet, compared with 4% of those earning $100,000 or more. When it breaks, they lose work, school, and bank access all at once.": "Cerca del 28% de los adultos que ganan menos de $30,000 (más de 1 de cada 4) dependen del celular para tener internet en casa, comparado con el 4% de los que ganan $100,000 o más. Cuando se les rompe, pierden el acceso al trabajo, a los estudios y al banco, todo a la vez.",

    "What turned Jess's bad day into a possible crisis, while Morgan's stayed a bad day?": "¿Qué convirtió el mal día de Jess en una posible crisis, mientras que el de Morgan siguió siendo solo un mal día?",
    "Jess had no cushion, so small problems stacked up": "Jess no tenía colchón, así que los problemas se acumularon",
    "Jess had more problems happen to her than Morgan": "A Jess le pasaron más problemas que a Morgan",
    "Morgan's problems were all fixed by pure luck": "Los problemas de Morgan se resolvieron por pura suerte",
    "Morgan worked harder at her job than Jess did": "Morgan trabajó más duro en su empleo que Jess",
    "Did Jess and Morgan face different problems, or the same ones?": "¿Jess y Morgan tuvieron problemas diferentes, o los mismos?",
    "They had the SAME three problems. Without savings, paid leave, or backup, each problem made the next one worse for Jess.": "Tuvieron los MISMOS tres problemas. Sin ahorros, sin días pagados y sin respaldo, cada problema empeoró el siguiente para Jess.",

    [card("How people respond", `<p>Some states and cities require employers to give paid sick days. Iowa does not. <b>Supporters</b> say workers shouldn't lose pay or jobs when they or their kids get sick. <b>Critics</b> say it raises costs for small businesses, which could mean fewer hours or jobs.</p>`) + "A law that requires paid sick days is an example of a…"]:
      card("Cómo responde la gente", `<p>Algunos estados y ciudades obligan a los empleadores a dar días de enfermedad pagados. Iowa no. Los que la <b>apoyan</b> dicen que los trabajadores no deberían perder sueldo ni empleo cuando ellos o sus hijos se enferman. Los <b>críticos</b> dicen que sube los costos de los negocios pequeños, y eso podría significar menos horas o menos empleos.</p>`) + "Una ley que obliga a dar días de enfermedad pagados es un ejemplo de…",
    "Government response to unequal life chances": "Una respuesta del gobierno a oportunidades de vida desiguales",
    "Individual response, like going back to school": "Una respuesta individual, como volver a estudiar",
    "Social movement that resists any kind of change": "Un movimiento social que se resiste a todo cambio",
    "Business decision that has nothing to do with class": "Una decisión de negocios que no tiene que ver con la clase",
    "Who makes laws?": "¿Quién hace las leyes?",
    "Laws like minimum wage, paid sick leave, and assistance programs are government responses. People disagree about whether a paid-sick-day law is a good idea, for real reasons on both sides.": "Leyes como el salario mínimo, los días de enfermedad pagados y los programas de ayuda son respuestas del gobierno. La gente no está de acuerdo sobre si una ley de días de enfermedad pagados es buena idea, y hay razones reales de los dos lados.",

    // ---------- Finale ----------
    "Who Can Afford a Bad Day?": "¿Quién puede darse el lujo de tener un mal día?",
    "Morgan ended the same day with her savings almost untouched and 0 new problems. Same events. Different life chances.": "Morgan terminó el mismo día con sus ahorros casi intactos y 0 problemas nuevos. Los mismos hechos. Diferentes oportunidades de vida.",
    "Answer both in 1–2 full sentences.": "Responde las dos preguntas en 1–2 oraciones completas.",
    "1. Who can afford a bad day? Compare Jess with Sam or Morgan, using one specific thing from today.": "1. ¿Quién puede darse el lujo de tener un mal día? Compara a Jess con Sam o con Morgan, usando algo específico de hoy.",
    "___ can afford a bad day more than Jess because ___.": "___ puede aguantar un mal día mejor que Jess porque ___.",
    "2. What's the difference between a bad day and a crisis? Use an example from Jess's day.": "2. ¿Cuál es la diferencia entre un mal día y una crisis? Usa un ejemplo del día de Jess.",
    "A bad day turns into a crisis when ___. For example, Jess ___.": "Un mal día se convierte en crisis cuando ___. Por ejemplo, Jess ___.",
    "Compare Jess and Morgan/Sam": "Comparar a Jess con Morgan/Sam",
    "Bad day vs. crisis": "Mal día vs. crisis",
    "In answer 1, name Jess AND Sam or Morgan, and give one specific difference (savings, sick days, credit card, working from home…).": "En la respuesta 1, nombra a Jess Y a Sam o a Morgan, y da una diferencia específica (ahorros, días de enfermedad, tarjeta de crédito, trabajar desde casa…).",
    "In answer 2, use a specific example from Jess's day (the tire, lost pay, the loan, a write-up…).": "En la respuesta 2, usa un ejemplo específico del día de Jess (el caucho, el sueldo perdido, el préstamo, una amonestación…)."
  };

  // ---------- Every luck combination (same code as the page, then the Spanish) ----------
  [0, 1].forEach(tire => [0, 1].forEach(boss => [0, 1].forEach(phone => {
    const TIRE = tire ? 140 : 25;
    const PHONE = phone ? 180 : 90;
    const tireLuck = tire
      ? `<div class="luck"><span class="lab">Chance card · tire</span>Bad luck: the nail is in the side of the tire. It can't be patched. A new tire costs <b>$140</b>.</div>`
      : `<div class="luck"><span class="lab">Chance card · tire</span>Good luck: the nail is in the tread. A patch costs <b>$25</b>.</div>`;
    const tireLuckEs = tire
      ? `<div class="luck"><span class="lab">Carta de azar · caucho</span>Mala suerte: el clavo está en el costado del caucho. No se puede parchar. Un caucho nuevo cuesta <b>$140</b>.</div>`
      : `<div class="luck"><span class="lab">Carta de azar · caucho</span>Buena suerte: el clavo está en la banda (la parte que toca el piso). Un parche cuesta <b>$25</b>.</div>`;
    const bossLine = boss
      ? `Jess's manager this week is strict: <b>3 write-ups for being late or missing a shift can get you fired.</b> Jess already has 1.`
      : `Jess's manager this week is fairly understanding, but the store is short on workers.`;
    const bossLineEs = boss
      ? `El encargado de Jess esta semana es estricto: <b>3 amonestaciones por llegar tarde o faltar a un turno te pueden costar el trabajo.</b> Jess ya tiene 1.`
      : `El encargado de Jess esta semana es bastante comprensivo, pero en la tienda falta personal.`;
    const phoneLuck = phone
      ? `<div class="luck"><span class="lab">Chance card · phone</span>Bad luck: the phone is dead. The cheapest replacement is <b>$180</b>.</div>`
      : `<div class="luck"><span class="lab">Chance card · phone</span>Some luck: the screen is cracked but works, barely. A repair is <b>$90</b>.</div>`;
    const phoneLuckEs = phone
      ? `<div class="luck"><span class="lab">Carta de azar · celular</span>Mala suerte: el celular no prende más. El reemplazo más barato cuesta <b>$180</b>.</div>`
      : `<div class="luck"><span class="lab">Carta de azar · celular</span>Algo de suerte: la pantalla está rajada pero funciona, apenas. La reparación cuesta <b>$90</b>.</div>`;

    // Part 1 note
    dict[tireLuck + `<p>All three walk out to a flat tire.</p>` + trio(
        `<p>Shift starts at 8:00. ${bossLine}</p><p>Only $85 until Friday.</p>`,
        `<p>Puts on the spare and calls work. Her job lets her start late and stay late.</p><p>Puts the tire on a credit card and pays it off next month.</p>`,
        `<p>Calls roadside help (part of her car insurance). Works from home until the car is fixed.</p><p>Her day barely changes.</p>`)] =
      tireLuckEs + `<p>Las tres salen y se encuentran con un caucho espichado.</p>` + trio(
        `<p>Su turno empieza a las 8:00. ${bossLineEs}</p><p>Solo tiene $85 hasta el viernes.</p>`,
        `<p>Pone el repuesto y llama al trabajo. En su trabajo puede entrar tarde y salir tarde.</p><p>Paga el caucho con tarjeta de crédito y lo termina de pagar el mes que viene.</p>`,
        `<p>Llama a la asistencia en carretera (viene con el seguro de su carro). Trabaja desde casa hasta que le arreglen el carro.</p><p>Su día casi no cambia.</p>`);
    // Part 1 results
    dict[`<p>${T("down", "−$" + TIRE)}${T("down","+1 problem")}Jess clocks in 20 minutes late. ${boss ? "Her manager writes her up. That's write-up #2. One more could cost her the job." : "Her manager lets it go, but says, \"Don't make it a habit.\""} After work, the tire costs $${TIRE}.</p>`] =
      `<p>${T("down", "−$" + TIRE)}${T("down","+1 problema")}Jess marca su entrada 20 minutos tarde. ${boss ? "Su encargado la amonesta. Es la amonestación #2. Una más le podría costar el trabajo." : "Su encargado lo deja pasar, pero le dice: \"Que no se te haga costumbre.\""} Después del trabajo, el caucho le cuesta $${TIRE}.</p>`;
    dict[`<p>${T("down", "−$" + (TIRE + 42))}${T("down","+1 problem")}The tire costs $${TIRE}. Missing 3 hours of work costs her $42 in pay. Friday's check will be smaller, and rent is due.</p>`] =
      `<p>${T("down", "−$" + (TIRE + 42))}${T("down","+1 problema")}El caucho cuesta $${TIRE}. Perder 3 horas de trabajo le cuesta $42 de sueldo. El pago del viernes va a ser más pequeño, y ya toca pagar el alquiler.</p>`;
    // Part 2 result (depends on the manager)
    dict[`<p>${T("down","−$56")}${T("down","+1 problem")}Jess loses 4 hours of pay. ${boss ? "Her strict manager counts it as a missed shift. That's another write-up." : "Her manager is okay with it, but there's no pay for the missed hours."}</p>`] =
      `<p>${T("down","−$56")}${T("down","+1 problema")}Jess pierde 4 horas de sueldo. ${boss ? "Su encargado estricto lo cuenta como un turno perdido. Es otra amonestación." : "A su encargado no le molesta, pero esas horas no se las pagan."}</p>`;
    // Part 3 note
    dict[phoneLuck + `<p>Eli knocks the phone off the table. It hits the tile floor hard.</p>` + trio(
        `<p>Her phone is her only internet at home. Her work schedule changes come by text.</p>`,
        `<p>Pays $90 for a repair. Uses her laptop and home Wi-Fi in the meantime.</p>`,
        `<p>Her phone plan includes insurance. Gets a new phone tomorrow.</p>`)
      + card("Pew Research Center, 2023 survey · adults who rely on a smartphone for home internet (no home broadband)", `<div class="barchart"><div class="row low"><span>Earn under $30,000</span><div class="t"><span style="width:28%"></span></div><b>28%</b></div><div class="row"><span>Earn $100,000 or more</span><div class="t"><span style="width:4%"></span></div><b>4%</b></div></div>`)] =
      phoneLuckEs + `<p>Eli tumba el celular de la mesa. Cae duro contra el piso de cerámica.</p>` + trio(
        `<p>Su celular es su único internet en casa. Los cambios de horario del trabajo le llegan por mensaje de texto.</p>`,
        `<p>Paga $90 por la reparación. Mientras tanto usa su laptop y el Wi-Fi de su casa.</p>`,
        `<p>Su plan de celular incluye seguro. Mañana le dan un celular nuevo.</p>`)
      + card("Pew Research Center, encuesta de 2023 · adultos que dependen de un smartphone para tener internet en casa (sin banda ancha en casa)", `<div class="barchart"><div class="row low"><span>Ganan menos de $30,000</span><div class="t"><span style="width:28%"></span></div><b>28%</b></div><div class="row"><span>Ganan $100,000 o más</span><div class="t"><span style="width:4%"></span></div><b>4%</b></div></div>`);
    // Part 3 results
    dict[`<p>${T("down", "−$" + PHONE)}Jess keeps her phone working, but her bank account is now nearly empty or below zero. If it goes below $0, the bank adds a fee.</p>`] =
      `<p>${T("down", "−$" + PHONE)}Jess mantiene su celular funcionando, pero su cuenta del banco queda casi vacía o por debajo de cero. Si baja de $0, el banco le cobra un cargo extra.</p>`;
    dict[`<p>${T("up","+$300 now")}${T("down","−$" + PHONE + " phone")}${T("down","+2 problems")}The loan fee is $35 (the most Iowa law allows on $300), so Jess will owe <b>$335</b> in two weeks, out of a paycheck that's already short. Many borrowers can't pay it all and take out another loan.</p>`] =
      `<p>${T("up","+$300 ahora")}${T("down","−$" + PHONE + " celular")}${T("down","+2 problemas")}El cargo del préstamo es de $35 (lo máximo que permite la ley de Iowa por $300), así que Jess va a deber <b>$335</b> en dos semanas, de un sueldo que ya viene corto. Muchas personas que sacan estos préstamos no pueden pagarlo todo y sacan otro préstamo.</p>`;
    dict[`<p>${T("flat","$0")}${T("down","+2 problems")}Jess saves money, but she misses a text about a schedule change and ${boss ? "gets written up for a missed shift." : "almost misses a shift. A coworker covers for her this time."} The daycare can't reach her either.</p>`] =
      `<p>${T("flat","$0")}${T("down","+2 problemas")}Jess ahorra dinero, pero no ve un mensaje sobre un cambio de horario y ${boss ? "la amonestan por faltar a un turno." : "casi falta a un turno. Esta vez una compañera la cubre."} La guardería tampoco se puede comunicar con ella.</p>`;
  })));

  SiteLang.add({
    dict,
    patterns: [
      // Top bar after the overdraft fee. (Spanish keeps the "−$35" as a captured group because "$3" would read as a group number.)
      { re: /^(−?\$\d+) \((−\$35) overdraft fee\)$/, es: "$1 ($2 de cargo por sobregiro)" },
      { re: /^Jess ended the day with (−?\$\d+) and (−?\d+) problems piled up\.$/, es: "Jess terminó el día con $1 y $2 problemas acumulados." }
    ],
    writing: {
      compare: [
        ["jess"],
        ["morgan", "sam"],
        ["ahorr", "dinero", "plata", "enferm", "pagad", "colchon", "credito", "tarjeta", "prestamo", "trabajo", "empleo", "pago", "paga", "sueldo", "seguro", "casa", "flexib", "jefe", "jefa", "encargad", "gerente", "celular", "telefono", "caucho", "llanta"]
      ],
      crisis: [
        ["dinero", "plata", "ahorr", "colchon", "acumul", "amontona", "trabajo", "empleo", "pago", "paga", "sueldo", "alcanz", "prestamo", "cargo", "cuenta", "factura", "despid", "bota", "amonest", "caucho", "llanta", "celular", "telefono", "enferm"]
      ]
    }
  });
})();
