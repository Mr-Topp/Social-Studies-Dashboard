// Spanish for "The Organizer's Toolkit" (Sociology Unit 4 Day 6). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same helpers as the page, so the English keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const card = (lab, body, tools) => `<div class="src-card"><p class="lab">${lab}</p>${body}${tools ? `<div class="tools">${tools.map(t => `<span>${t}</span>`).join("")}</div>` : ""}</div>`;
  const chat = (who, body) => `<div class="chat"><div class="who">${who}</div>${body}</div>`;
  const chatIn = (who, body) => `<div class="who">${who}</div>${body}`;   // the inside of a chat box (intro)
  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "The Organizer's Toolkit | Sociology Unit 4 Day 6": "La caja de herramientas del organizador | Sociología Unidad 4 Día 6",
      "Sociology · Unit 4 · Day 6": "Sociología · Unidad 4 · Día 6",
      "The Organizer's Toolkit": "La caja de herramientas del organizador",
      "Evaluate how people and groups have responded to social inequality.": "Evaluar cómo las personas y los grupos han respondido a la desigualdad social.",
      "Goal:": "Meta:",
      "Explain how social movements fight inequality, which tactics they use, and why change is hard, then use what you learned to plan your own campaign. · About 25 minutes.": "Explicar cómo los movimientos sociales luchan contra la desigualdad, qué tácticas usan y por qué el cambio es difícil, y luego usar lo que aprendiste para planear tu propia campaña. · Unos 25 minutos.",
      "Progress and your campaign's momentum": "Progreso e impulso de tu campaña",
      "Momentum:": "Impulso:",

      // ---------- Intro ----------
      "Open the toolkit": "Abrir la caja de herramientas",
      "Your mission": "Tu misión",
      "The city wants to cut Route 9": "La ciudad quiere eliminar la Ruta 9",
      [chatIn("NEWS ALERT", `<p>The city plans to cut the Route 9 bus to save money. About 600 riders a day use it, many to get to jobs at the warehouses and the hospital.</p>`)]:
        chatIn("ÚLTIMA HORA", `<p>La ciudad planea eliminar el autobús de la Ruta 9 para ahorrar dinero. Unos 600 pasajeros lo usan cada día, muchos para llegar a sus trabajos en los almacenes y en el hospital.</p>`),
      "People who ride Route 9 asked you to help organize. Before you start, you'll study how real movements fought unfair treatment, and what tools they used.": "Los pasajeros de la Ruta 9 te pidieron ayuda para organizarse. Antes de empezar, vas a estudiar cómo movimientos reales lucharon contra el trato injusto y qué herramientas usaron.",
      "1. See how movements start (one began in Iowa).": "1. Mira cómo empiezan los movimientos (uno empezó en Iowa).",
      "2. Fill your toolkit with tactics that worked.": "2. Llena tu caja de herramientas con tácticas que funcionaron.",
      "3. Run your Route 9 campaign. Watch your <b>Momentum</b> meter.": "3. Dirige tu campaña por la Ruta 9. Mira tu medidor de <b>Impulso</b>.",
      "Route 9 and its city are made up. Every historical case is real.": "La Ruta 9 y su ciudad son inventadas. Todos los casos históricos son reales.",

      // ---------- Part 1 ----------
      "Part 1 of 3": "Parte 1 de 3",
      "How Movements Start": "Cómo empiezan los movimientos",
      [`<p>A <b>social movement</b> is a large group of people working together over time to change society (or to stop a change). Movements usually start when people see something as unfair: discrimination, poverty, unfair laws, or limited opportunity.</p>
        <div class="types"><div><b>Reform</b>Change some laws or rules, but keep the system. (Civil Rights, women's rights, disability rights)</div><div><b>Revolutionary</b>Replace the whole government or system. (Many independence movements against colonial rule)</div><div><b>Resistance</b>Stop or undo a change. Not all movements push for more equality.</div></div>`]:
        `<p>Un <b>movimiento social (social movement)</b> es un grupo grande de personas que trabajan juntas durante un tiempo para cambiar la sociedad (o para frenar un cambio). Los movimientos casi siempre empiezan cuando la gente ve algo como injusto: discriminación, pobreza, leyes injustas u oportunidades limitadas.</p>
        <div class="types"><div><b>De reforma (Reform)</b>Cambiar algunas leyes o reglas, pero mantener el sistema. (Derechos civiles, derechos de las mujeres, derechos de las personas con discapacidad)</div><div><b>Revolucionario (Revolutionary)</b>Reemplazar todo el gobierno o el sistema. (Muchos movimientos de independencia contra el dominio colonial)</div><div><b>De resistencia (Resistance)</b>Frenar o deshacer un cambio. No todos los movimientos luchan por más igualdad.</div></div>`,

      [card("Case file: Des Moines, Iowa, 1948", `<p>On July 7, 1948, <b>Edna Griffin</b>, a Black mother and activist, sat at the lunch counter at Katz Drug Store in downtown Des Moines with her baby daughter and two friends. The store refused to serve them ice cream because they were Black. Iowa law already banned this kind of discrimination.</p><p>Griffin and others held <b>sit-ins</b> at the counter and <b>picketed</b> (marched with signs) outside for months. They also went to <b>court</b>. The store owner was found guilty, and the Iowa Supreme Court upheld it in 1949. Katz started serving all customers.</p>`, ["sit-in", "picketing", "lawsuit"])]:
        card("Expediente: Des Moines, Iowa, 1948", `<p>El 7 de julio de 1948, <b>Edna Griffin</b>, una madre y activista afroamericana, se sentó en la barra de la cafetería de la farmacia Katz Drug Store, en el centro de Des Moines, con su bebé y dos amigos. La tienda se negó a venderles helado porque eran afroamericanos. La ley de Iowa ya prohibía este tipo de discriminación.</p><p>Griffin y otras personas hicieron <b>sentadas (sit-ins)</b> en la barra y <b>piquetes (picketing)</b> (marchas con carteles) afuera durante meses. También fueron a los <b>tribunales (court)</b>. El dueño de la tienda fue declarado culpable, y la Corte Suprema de Iowa confirmó la decisión en 1949. Katz empezó a atender a todos los clientes.</p>`, ["sentada", "piquetes", "demanda judicial"]),

      "What started the protest at Katz Drug Store?": "¿Qué inició la protesta en Katz Drug Store?",
      "A store refused to serve Black customers": "Una tienda se negó a atender a clientes afroamericanos",
      "A new state law banned all lunch counters": "Una nueva ley estatal prohibió todas las cafeterías",
      "Workers went on strike for higher wages": "Unos trabajadores hicieron huelga por mejores sueldos",
      "The city raised the price of ice cream": "La ciudad subió el precio del helado",
      "Reread the first paragraph of the case file.": "Vuelve a leer el primer párrafo del expediente.",
      "Movements often start with one clear injustice that people can see. Here it was being refused service because of race.": "Los movimientos muchas veces empiezan con una injusticia clara que la gente puede ver. Aquí fue que les negaran el servicio por su raza.",

      "Griffin's group sat in, picketed, AND went to court. What does this show about movements?": "El grupo de Griffin hizo sentadas, piquetes Y fue a los tribunales. ¿Qué muestra esto sobre los movimientos?",
      "They often use several tactics at once": "Muchas veces usan varias tácticas a la vez",
      "They usually win after just one protest": "Casi siempre ganan con una sola protesta",
      "They avoid the courts and the law entirely": "Evitan por completo los tribunales y la ley",
      "They only work if the government starts them": "Solo funcionan si el gobierno los empieza",
      "Count the tactic tags on the case file.": "Cuenta las etiquetas de tácticas en el expediente.",
      "Pressure from several directions (in the store, on the street, in court) is harder to ignore than one action.": "La presión desde varios lados (en la tienda, en la calle, en los tribunales) es más difícil de ignorar que una sola acción.",

      [card("Case file: Virginia, 1950s", `<p>After the Supreme Court ruled school segregation unconstitutional (1954), Virginia leaders launched \"Massive Resistance\" to block integration. Prince Edward County closed its public schools from 1959 to 1964 instead of integrating.</p>`) + "What type of movement was Massive Resistance?"]:
        card("Expediente: Virginia, años 50", `<p>Después de que la Corte Suprema declaró inconstitucional la segregación en las escuelas (1954), los líderes de Virginia lanzaron la \"Resistencia Masiva\" (Massive Resistance) para bloquear la integración. El condado de Prince Edward cerró sus escuelas públicas de 1959 a 1964 para no integrarlas.</p>`) + "¿Qué tipo de movimiento fue la Resistencia Masiva?",
      "A resistance movement": "Un movimiento de resistencia",
      "A reform movement": "Un movimiento de reforma",
      "A revolutionary movement": "Un movimiento revolucionario",
      "A labor movement": "Un movimiento obrero",
      "Did it push for a change, or try to stop one? Check the three boxes at the top.": "¿Empujó un cambio o trató de frenarlo? Revisa los tres cuadros de arriba.",
      "It fought to stop a change (desegregation). That makes it a resistance movement. It's a reminder that not all movements push for more equality.": "Luchó para frenar un cambio (el fin de la segregación). Eso lo hace un movimiento de resistencia. Nos recuerda que no todos los movimientos luchan por más igualdad.",

      "Which goal fits a <b>revolutionary</b> movement, not a reform movement?": "¿Qué meta corresponde a un movimiento <b>revolucionario</b> y no a uno de reforma?",
      "Replacing the whole government with a new one": "Reemplazar todo el gobierno por uno nuevo",
      "Passing a law that bans unfair treatment at work": "Aprobar una ley contra el trato injusto en el trabajo",
      "Winning the right to vote for one more group": "Ganar el derecho al voto para un grupo más",
      "Getting a store to serve every customer equally": "Lograr que una tienda atienda a todos por igual",
      "Revolutionary = replace the whole system. Reform = change part of it.": "Revolucionario = reemplazar todo el sistema. Reforma = cambiar una parte.",
      "Reform movements change laws or rules inside the system. Revolutionary movements, like many fights against colonial rule, try to replace the system itself.": "Los movimientos de reforma cambian leyes o reglas dentro del sistema. Los movimientos revolucionarios, como muchas luchas contra el dominio colonial, tratan de reemplazar el sistema mismo.",

      // ---------- Part 2 ----------
      "Part 2 of 3": "Parte 2 de 3",
      "Fill Your Toolkit": "Llena tu caja de herramientas",
      [`<p><b>Tactics</b> are the actions a movement uses to put on pressure: protests and marches, <b>boycotts</b> (refusing to buy or use something), strikes, sit-ins, speeches, lawsuits, social media, and pushing for new laws.</p>`]:
        `<p>Las <b>tácticas (tactics)</b> son las acciones que usa un movimiento para presionar: protestas y marchas, <b>boicots (boycotts)</b> (negarse a comprar o usar algo), huelgas, sentadas, discursos, demandas judiciales, redes sociales y presionar para que se aprueben leyes nuevas.</p>`,

      [card("Case file: Montgomery, Alabama, 1955–1956", `<p>After <b>Rosa Parks</b> was arrested for not giving up her bus seat to a white man, Black residents refused to ride the city buses for <b>381 days</b>. They walked and set up carpools. Black riders were about <b>three-quarters</b> of the bus company's riders. In 1956, the Supreme Court ruled bus segregation unconstitutional.</p>`, ["boycott", "carpools", "lawsuit"]) + "Why was a boycott such a strong tactic here?"]:
        card("Expediente: Montgomery, Alabama, 1955–1956", `<p>Después de que arrestaron a <b>Rosa Parks</b> por no cederle su asiento del autobús a un hombre blanco, los residentes afroamericanos se negaron a usar los autobuses de la ciudad durante <b>381 días</b>. Caminaban y se daban la cola en carro unos a otros. Los pasajeros afroamericanos eran cerca de <b>tres cuartas partes</b> de los pasajeros de la compañía de autobuses. En 1956, la Corte Suprema declaró inconstitucional la segregación en los autobuses.</p>`, ["boicot", "colas en carro", "demanda judicial"]) + "¿Por qué el boicot fue una táctica tan fuerte aquí?",
      "Black riders were most of the bus company's customers": "Los pasajeros afroamericanos eran la mayoría de los clientes",
      "The bus company was owned by the boycott leaders": "Los líderes del boicot eran los dueños de la compañía",
      "The buses were free, so nobody lost any money": "Los autobuses eran gratis, así que nadie perdió dinero",
      "The city already planned to end segregated seating": "La ciudad ya pensaba acabar con los asientos separados",
      "Look at how many of the riders were Black.": "Mira cuántos de los pasajeros eran afroamericanos.",
      "A boycott hurts most when the people boycotting are a big share of the customers. Losing three-quarters of riders put heavy pressure on the bus system.": "Un boicot duele más cuando los que boicotean son una gran parte de los clientes. Perder tres cuartas partes de los pasajeros presionó muchísimo al sistema de autobuses.",

      [card("Case file: Delano, California, 1965–1970", `<p>Farmworkers picking grapes earned low pay and worked long hours with few protections. Filipino and Mexican American workers went on strike together, with leaders like <b>Larry Itliong</b>, <b>Cesar Chavez</b>, and <b>Dolores Huerta</b>. Then they asked shoppers across the country to stop buying grapes. Millions did. In 1970, major growers signed contracts with the farmworkers' union.</p>`, ["strike", "national boycott", "union"]) + "Why did farmworkers ask shoppers far away to help?"]:
        card("Expediente: Delano, California, 1965–1970", `<p>Los trabajadores del campo que recogían uvas ganaban poco y trabajaban muchas horas con pocas protecciones. Trabajadores filipinos y mexicoamericanos se fueron a huelga juntos, con líderes como <b>Larry Itliong</b>, <b>Cesar Chavez</b> y <b>Dolores Huerta</b>. Luego les pidieron a los compradores de todo el país que dejaran de comprar uvas. Millones lo hicieron. En 1970, los grandes productores firmaron contratos con el sindicato de los trabajadores del campo.</p>`, ["huelga", "boicot nacional", "sindicato"]) + "¿Por qué los trabajadores del campo les pidieron ayuda a compradores que estaban lejos?",
      "Shoppers' buying power could pressure the growers": "El poder de compra de la gente podía presionar a los productores",
      "Shoppers could vote in California's local elections": "Los compradores podían votar en las elecciones de California",
      "Shoppers were the ones paying the farmworkers": "Los compradores eran los que les pagaban a los trabajadores",
      "Shoppers could pick the grapes in their place": "Los compradores podían recoger las uvas en su lugar",
      "What happens to growers when millions stop buying grapes?": "¿Qué les pasa a los productores cuando millones de personas dejan de comprar uvas?",
      "Workers alone had little power over growers. Millions of shoppers not buying grapes hit growers in their profits.": "Los trabajadores solos tenían poco poder sobre los productores. Millones de compradores que no compraban uvas les pegaron a los productores en sus ganancias.",

      [`<p><b>Your Route 9 campaign starts now.</b> What's your first move?</p>`]:
        `<p><b>Tu campaña por la Ruta 9 empieza ahora.</b> ¿Cuál es tu primera jugada?</p>`,
      "Hold a meeting so riders can share their stories": "Hacer una reunión para que los pasajeros cuenten sus historias",
      [`<p>${T("up","+2 momentum")}Forty riders show up. A nurse's aide says the bus is her only way to the hospital. A teen says it's how he gets to his job. You now have real stories and a list of supporters.</p>`]:
        `<p>${T("up","+2 impulso")}Llegan cuarenta pasajeros. Una asistente de enfermería dice que el autobús es su única forma de llegar al hospital. Un chamo dice que así llega a su trabajo. Ahora tienes historias reales y una lista de personas que te apoyan.</p>`,
      "Post an angry video calling the mayor heartless": "Publicar un video furioso diciendo que el alcalde no tiene corazón",
      [`<p>${T("flat","No change")}The video gets lots of views and angry comments, but nobody signs up to help. Some people who might have helped feel turned off.</p>`]:
        `<p>${T("flat","Sin cambio")}El video tiene muchas vistas y comentarios furiosos, pero nadie se anota para ayudar. Algunas personas que a lo mejor iban a ayudar pierden las ganas.</p>`,
      "Call for everyone to boycott all city businesses": "Pedir que todos boicoteen todos los negocios de la ciudad",
      [`<p>${T("down","−1 momentum")}Local shop owners, who have nothing to do with the bus, get angry. Some riders work at those shops. A boycott works best aimed at the decision-maker.</p>`]:
        `<p>${T("down","−1 impulso")}Los dueños de negocios locales, que no tienen nada que ver con el autobús, se molestan. Algunos pasajeros trabajan en esas tiendas. Un boicot funciona mejor cuando apunta a quien toma la decisión.</p>`,

      [card("Case file: the Freedom Rides, 1961", `<p>Black and white volunteers rode buses together through the South to test whether bus stations obeyed the law against segregation. In Alabama, a mob firebombed one bus. In Mississippi, hundreds of riders were arrested. By the end of 1961, a new federal rule ordered bus stations to end segregation.</p>`, ["direct action", "nonviolence", "media attention"]) + "What does the Freedom Rides case show about fighting inequality?"]:
        card("Expediente: los Viajes de la Libertad (Freedom Rides), 1961", `<p>Voluntarios afroamericanos y blancos viajaron juntos en autobuses por el Sur para comprobar si los terminales de autobuses cumplían la ley contra la segregación. En Alabama, una turba le lanzó una bomba incendiaria a un autobús. En Mississippi, arrestaron a cientos de viajeros. A finales de 1961, una nueva regla federal les ordenó a los terminales de autobuses acabar con la segregación.</p>`, ["acción directa", "no violencia", "atención de los medios"]) + "¿Qué muestra el caso de los Viajes de la Libertad sobre la lucha contra la desigualdad?",
      "Activists can face violence and arrest before winning": "Los activistas pueden sufrir violencia y arrestos antes de ganar",
      "Change usually comes fast and without any danger": "El cambio casi siempre llega rápido y sin ningún peligro",
      "Peaceful protests never get anyone's attention": "Las protestas pacíficas nunca llaman la atención de nadie",
      "Federal rules are made before people protest": "Las reglas federales se hacen antes de que la gente proteste",
      "What happened to the riders BEFORE the new rule came?": "¿Qué les pasó a los viajeros ANTES de que llegara la nueva regla?",
      "The riders faced violence and jail. News coverage of that violence pushed the government to act. Change often comes at a high cost.": "Los viajeros sufrieron violencia y cárcel. Las noticias sobre esa violencia empujaron al gobierno a actuar. El cambio muchas veces tiene un costo alto.",

      [card("Case file: San Francisco, 1977", `<p>A 1973 law said programs that get federal money can't discriminate against people with disabilities, but the government hadn't put the rules into effect. In April 1977, disability rights activists took over a federal building in San Francisco and refused to leave for about <b>26 days</b>. The rules were signed while they were still inside.</p>`, ["sit-in", "occupation", "pushing for rules"]) + "Which tactic did the disability rights activists mainly use?"]:
        card("Expediente: San Francisco, 1977", `<p>Una ley de 1973 decía que los programas que reciben dinero federal no pueden discriminar a las personas con discapacidad, pero el gobierno no había puesto las reglas en práctica. En abril de 1977, activistas por los derechos de las personas con discapacidad tomaron un edificio federal en San Francisco y se negaron a salir durante unos <b>26 días</b>. Las reglas se firmaron mientras ellos todavía estaban adentro.</p>`, ["sentada", "ocupación", "presionar por reglas"]) + "¿Qué táctica usaron principalmente los activistas por los derechos de las personas con discapacidad?",
      "A sit-in that occupied a building": "Una sentada que ocupó un edificio",
      "A national boycott of a product": "Un boicot nacional a un producto",
      "A strike that shut down factories": "Una huelga que cerró fábricas",
      "A march from one city to another": "Una marcha de una ciudad a otra",
      "Where were the activists for 26 days?": "¿Dónde estuvieron los activistas durante 26 días?",
      "They occupied the building until the government acted. That's a sit-in, the same tactic Edna Griffin used in Des Moines.": "Ocuparon el edificio hasta que el gobierno actuó. Eso es una sentada, la misma táctica que usó Edna Griffin en Des Moines.",

      // ---------- Part 3 ----------
      "Part 3 of 3": "Parte 3 de 3",
      "Run the Route 9 Campaign": "Dirige la campaña por la Ruta 9",
      [`<p>Movements face <b>challenges</b>: people who disagree, criticism, government pushback, false rumors, and slow change. Even after a win, some inequality can last.</p>`]:
        `<p>Los movimientos enfrentan <b>desafíos (challenges)</b>: gente que no está de acuerdo, críticas, oposición del gobierno, rumores falsos y cambios lentos. Incluso después de ganar, algo de desigualdad puede seguir.</p>`,

      [`<p><b>The city council meets Tuesday.</b> Ten minutes are set aside for public comment.</p>`]:
        `<p><b>El concejo municipal se reúne el martes.</b> Hay diez minutos reservados para comentarios del público.</p>`,
      "Bring riders to speak, with numbers on who uses Route 9": "Llevar pasajeros a hablar, con cifras sobre quién usa la Ruta 9",
      [`<p>${T("up","+2 momentum")}Riders tell their stories and you share the rider count and job sites. Two council members ask the city to look at other ways to save money.</p>`]:
        `<p>${T("up","+2 impulso")}Los pasajeros cuentan sus historias y tú compartes cuántos pasajeros hay y dónde trabajan. Dos concejales le piden a la ciudad que busque otras formas de ahorrar dinero.</p>`,
      "Pack the room and chant until the meeting stops": "Llenar el salón y gritar consignas hasta que se pare la reunión",
      [`<p>${T("down","−2 momentum")}The meeting is canceled. Local news covers the shouting, not the riders. Council members get defensive.</p>`]:
        `<p>${T("down","−2 impulso")}Cancelan la reunión. Las noticias locales hablan de los gritos, no de los pasajeros. Los concejales se ponen a la defensiva.</p>`,
      "Drop off an online petition with 300 names": "Entregar una petición en línea con 300 nombres",
      [`<p>${T("up","+1 momentum")}It shows support, but it's easy to ignore. Petitions work better with people in the room too.</p>`]:
        `<p>${T("up","+1 impulso")}Muestra apoyo, pero es fácil de ignorar. Las peticiones funcionan mejor si también hay gente en el salón.</p>`,

      [chat("RESIDENT · comment at the meeting", `<p>I'm on a fixed income. If the city keeps every bus route, my property taxes go up. Somebody has to pay for it.</p>`) + "What does this comment show about the challenges movements face?"]:
        chat("RESIDENTE · comentario en la reunión", `<p>Yo vivo con un ingreso fijo. Si la ciudad mantiene todas las rutas de autobús, me suben los impuestos de mi casa. Alguien tiene que pagarlo.</p>`) + "¿Qué muestra este comentario sobre los desafíos que enfrentan los movimientos?",
      "People can disagree for real reasons, like cost": "Se puede estar en contra por razones reales, como el costo",
      "Anyone who disagrees is trying to hurt riders": "Quien no está de acuerdo quiere perjudicar a los pasajeros",
      "Taxes have nothing to do with city bus service": "Los impuestos no tienen que ver con los autobuses de la ciudad",
      "Opponents never come to public city meetings": "Los opositores nunca van a las reuniones públicas",
      "Is the resident's worry about money a real concern?": "¿La preocupación del residente por el dinero es real?",
      "Opponents often have real concerns, like cost. Movements that listen and answer those concerns usually win more support.": "Los opositores muchas veces tienen preocupaciones reales, como el costo. Los movimientos que escuchan y responden a esas preocupaciones casi siempre ganan más apoyo.",

      [`<p>Online, some people start calling bus riders lazy. Others say the city has no choice. How do you respond?</p>`]:
        `<p>En internet, algunas personas empiezan a decir que los pasajeros de autobús son flojos. Otras dicen que la ciudad no tiene opción. ¿Cómo respondes?</p>`,
      "Propose a compromise: fewer Route 9 trips, not zero": "Proponer un punto medio: menos viajes de la Ruta 9, no cero",
      [`<p>${T("up","+2 momentum")}The city saves some money and riders keep a bus at shift-change times. Not everything you wanted, but a real win. Many movement wins are partial.</p>`]:
        `<p>${T("up","+2 impulso")}La ciudad ahorra algo de dinero y los pasajeros conservan un autobús en las horas de cambio de turno. No es todo lo que querías, pero es una victoria real. Muchas victorias de los movimientos son parciales.</p>`,
      "Fire back: call opponents selfish online": "Contraatacar: llamar egoístas a los opositores en internet",
      [`<p>${T("down","−2 momentum")}The fight turns into name-calling. Undecided people tune out, and the council stops returning your calls.</p>`]:
        `<p>${T("down","−2 impulso")}La pelea se convierte en insultos. La gente indecisa deja de prestar atención, y el concejo deja de devolverte las llamadas.</p>`,
      "Ignore it and keep posting rider stories": "Ignorarlo y seguir publicando historias de pasajeros",
      [`<p>${T("up","+1 momentum")}The stories help, but some false rumors spread without an answer.</p>`]:
        `<p>${T("up","+1 impulso")}Las historias ayudan, pero algunos rumores falsos se riegan sin que nadie los responda.</p>`,

      "A post about Route 9 gets 1 million views, but only 12 people come to the next meeting. What does this show?": "Una publicación sobre la Ruta 9 tiene 1 millón de vistas, pero solo 12 personas van a la siguiente reunión. ¿Qué muestra esto?",
      "Online attention doesn't always turn into action": "La atención en internet no siempre se convierte en acción",
      "Social media can never help a movement at all": "Las redes sociales nunca pueden ayudar a un movimiento",
      "Meetings matter less than how many views you get": "Las reuniones importan menos que la cantidad de vistas",
      "Twelve people is enough to win any campaign": "Doce personas bastan para ganar cualquier campaña",
      "Compare the number of views to the number of people who showed up.": "Compara el número de vistas con el número de personas que llegaron.",
      "Social media can spread a message fast, but movements still need people to show up, organize, and keep going.": "Las redes sociales pueden regar un mensaje rápido, pero los movimientos igual necesitan gente que se presente, se organice y siga adelante.",

      [card("Does it work?", `<p>The <b>Civil Rights Act (1964)</b> banned segregation in public places and discrimination at work. The <b>Voting Rights Act (1965)</b> protected the right to vote.</p><p>But in 2022, the typical white family had about <b>$285,000</b> in wealth, and the typical Black family had about <b>$45,000</b> (Federal Reserve).</p>`) + "What do these facts suggest about movements?"]:
        card("¿Funciona?", `<p>La <b>Ley de Derechos Civiles (Civil Rights Act, 1964)</b> prohibió la segregación en lugares públicos y la discriminación en el trabajo. La <b>Ley de Derecho al Voto (Voting Rights Act, 1965)</b> protegió el derecho a votar.</p><p>Pero en 2022, la familia blanca típica tenía unos <b>$285,000</b> en riqueza, y la familia afroamericana típica tenía unos <b>$45,000</b> (Reserva Federal).</p>`) + "¿Qué sugieren estos datos sobre los movimientos?",
      "Laws can change, but some inequality lasts": "Las leyes pueden cambiar, pero algo de desigualdad sigue",
      "Movements never change any laws at all": "Los movimientos nunca cambian ninguna ley",
      "Inequality ended once the laws were passed": "La desigualdad se acabó al aprobarse las leyes",
      "Wealth gaps have nothing to do with history": "Las brechas de riqueza no tienen que ver con la historia",
      "Compare what the laws did with the 2022 numbers.": "Compara lo que hicieron las leyes con los números de 2022.",
      "Movements won major laws. But gaps like wealth, which build up over generations, can last long after the laws change.": "Los movimientos ganaron leyes importantes. Pero brechas como la de la riqueza, que se acumulan por generaciones, pueden durar mucho después de que cambian las leyes.",

      // ---------- Finale ----------
      "Your Organizer's Report": "Tu informe de organizador",
      "Campaigns that collected stories, brought facts, aimed at the decision-maker, and answered opponents fairly built the most momentum, just like many real movements.": "Las campañas que reunieron historias, llevaron datos, apuntaron a quien toma la decisión y les respondieron con respeto a los opositores ganaron más impulso, igual que muchos movimientos reales.",
      "Answer both in 1–2 full sentences.": "Responde las dos preguntas en 1–2 oraciones completas.",
      "1. Which tactic works best against inequality? Back it up with one real example from today.": "1. ¿Qué táctica funciona mejor contra la desigualdad? Respáldala con un ejemplo real de la clase de hoy.",
      "I think ___ works best because ___. For example, ___.": "Creo que ___ funciona mejor porque ___. Por ejemplo, ___.",
      "2. Write your plan to save Route 9: one tactic you'd use, and one challenge you'd have to handle.": "2. Escribe tu plan para salvar la Ruta 9: una táctica que usarías y un desafío que tendrías que enfrentar.",
      "To save Route 9, I would ___. One challenge would be ___, so I would ___.": "Para salvar la Ruta 9, yo ___. Un desafío sería ___, así que yo ___.",
      "Best tactic + historical example": "Mejor táctica + ejemplo histórico",
      "Route 9 plan + challenge": "Plan para la Ruta 9 + desafío",
      "In answer 1, name a tactic AND a real example from today (Montgomery, Katz Drug, Delano grapes, Freedom Rides, or the 504 sit-in).": "En la respuesta 1, nombra una táctica Y un ejemplo real de la clase de hoy (Montgomery, Katz Drug, las uvas de Delano, los Viajes de la Libertad o la sentada del 504).",
      "In answer 2, name one tactic AND one challenge (cost, people who disagree, rumors, few people showing up…).": "En la respuesta 2, nombra una táctica Y un desafío (el costo, gente que no está de acuerdo, rumores, poca gente que llega…)."
    },
    patterns: [
      { re: /^Your Route 9 momentum ended at (\d+)\/10\.$/, es: "Tu impulso por la Ruta 9 terminó en $1/10." }
    ],
    writing: {
      best: [
        ["boicot", "sentada", "marcha", "piquete", "huelga", "demanda", "juicio", "tribunal", "corte", "protest", "peticion", "firma", "discurso", "redes sociales", "ocup"],
        ["montgomery", "parks", "griffin", "katz", "des moines", "delano", "uva", "chavez", "huerta", "itliong", "viajes de la libertad", "viajeros de la libertad", "504", "discapacidad", "san francisco"]
      ],
      plan: [
        ["reunion", "historia", "testimonio", "concejo", "peticion", "firma", "boicot", "marcha", "protest", "manifest", "hablar", "punto medio", "acuerdo", "datos", "numero", "cifra", "redes sociales", "publica", "vot"],
        ["impuesto", "costo", "cuesta", "dinero", "plata", "oposit", "desacuerdo", "de acuerdo", "rumor", "falso", "ignor", "lent", "critic", "rechazo", "gente", "personas", "concejo", "asist", "llega", "flojo", "vago"]
      ]
    }
  });
})();
