// Spanish for "The Cobalt Deal" (Sociology Unit 4 Day 3). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same builders as the page, so the English keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const card = (lab, body) => `<div class="src-card"><p class="lab">${lab}</p>${body}</div>`;
  const chat = (cls, who, body) => `<div class="chat ${cls}"><div class="who">${who}</div>${body}</div>`;
  const cause = txt => `<p class="cause"><b>Caused by:</b> ${txt}</p>`;
  const causeEs = txt => `<p class="cause"><b>Causa:</b> ${txt}</p>`;
  const GAME = `<span class="gtag">Game event · made up</span>`;
  const GAME_ES = `<span class="gtag">Evento del juego · inventado</span>`;
  const lifeCard = card("World Bank, World Development Indicators · life expectancy at birth, 2024",
    `<div class="barchart"><div class="row"><span>High-income countries</span><div class="t"><span style="width:100%"></span></div><b>80.4 yrs</b></div><div class="row low"><span>Low-income countries</span><div class="t"><span style="width:81%"></span></div><b>65.2 yrs</b></div></div>`);
  const lifeCardEs = card("Banco Mundial, Indicadores del Desarrollo Mundial · esperanza de vida al nacer, 2024",
    `<div class="barchart"><div class="row"><span>Países de ingreso alto</span><div class="t"><span style="width:100%"></span></div><b>80.4 años</b></div><div class="row low"><span>Países de ingreso bajo</span><div class="t"><span style="width:81%"></span></div><b>65.2 años</b></div></div>`);

  const dict = {
    // ---------- Page frame ----------
    "The Cobalt Deal | Sociology Unit 4 Day 3": "El trato del cobalto | Sociología Unidad 4 Día 3",
    "Sociology · Unit 4 · Day 3": "Sociología · Unidad 4 · Día 3",
    "The Cobalt Deal": "El trato del cobalto",
    "Explain the concept of social stratification and its influence on societal structures and individual opportunities.": "Explicar el concepto de estratificación social y su influencia en las estructuras de la sociedad y en las oportunidades de cada persona.",
    "Goal:": "Meta:",
    "Explain why some countries are rich and others are poor, using three theories and real world data. · About 25 minutes.": "Explicar por qué algunos países son ricos y otros son pobres, usando tres teorías y datos reales del mundo. · Unos 25 minutos.",
    "Progress and Kalora's debt, life span, and Vantor's grip": "Progreso, y la deuda, la esperanza de vida y el control de Vantor en Kalora",
    "Kalora's debt:": "Deuda de Kalora:",
    "Life span:": "Esperanza de vida:",
    "· Norland: 81": "· Norland: 81",
    "Vantor's grip:": "Control de Vantor:",

    // ---------- Intro ----------
    "Take the job": "Aceptar el trabajo",
    "Your new job": "Tu nuevo trabajo",
    "Welcome to Kalora": "Bienvenido a Kalora",
    "The battery in your phone started in a mine somewhere. You just got hired to run that somewhere.": "La batería de tu celular empezó en una mina en algún lugar. Te acaban de contratar para manejar ese lugar.",
    "You're the new <b>economic adviser</b> for <b>Kalora</b>. That means you plan how the country makes and spends money. Kalora is a poor country that mines <b>cobalt</b>, a metal in phone batteries.":
      "Eres el nuevo <b>asesor económico</b> de <b>Kalora</b>. Eso significa que planeas cómo el país gana y gasta su dinero. Kalora es un país pobre que saca <b>cobalto</b> de sus minas, un metal que llevan las baterías de los celulares.",
    "Every country starts with a hand of cards. Here's Kalora's:": "Cada país empieza con una mano de cartas. Esta es la de Kalora:",
    [`<div class="pc b"><span class="suit" aria-hidden="true">♠</span><b>History</b><p>A colony of Varenland until 1961. The only railroad runs from the mines to the port.</p></div>
      <div class="pc r"><span class="suit" aria-hidden="true">♦</span><b>Resources</b><p>Lots of cobalt. Few factories. Most people farm or dig.</p></div>
      <div class="pc b"><span class="suit" aria-hidden="true">♣</span><b>Debt</b><p>Owes $4 billion to foreign banks, from before you were hired.</p></div>
      <div class="pc r"><span class="suit" aria-hidden="true">♥</span><b>Trade rules</b><p>Rich-country buyers set the cobalt price. Batteries sell for far more, but they're made overseas.</p></div>`]:
      `<div class="pc b"><span class="suit" aria-hidden="true">♠</span><b>Historia</b><p>Colonia de Varenland hasta 1961. El único tren va de las minas al puerto.</p></div>
      <div class="pc r"><span class="suit" aria-hidden="true">♦</span><b>Recursos</b><p>Mucho cobalto. Pocas fábricas. Casi toda la gente cultiva o excava.</p></div>
      <div class="pc b"><span class="suit" aria-hidden="true">♣</span><b>Deuda</b><p>Debe $4 mil millones a bancos extranjeros, desde antes de que te contrataran.</p></div>
      <div class="pc r"><span class="suit" aria-hidden="true">♥</span><b>Reglas del comercio</b><p>Los compradores de países ricos ponen el precio del cobalto. Las baterías se venden por mucho más, pero se fabrican en otros países.</p></div>`,
    "Your rival: <b>Vantor Tech</b>, a giant battery company from rich <b>Norland</b>. It wants cheap cobalt, and it can buy from other places.":
      "Tu rival: <b>Vantor Tech</b>, una empresa gigante de baterías del rico <b>Norland</b>. Quiere cobalto barato, y puede comprarlo en otros lugares.",
    "1. Make your first deal, then find Kalora's layer in the world.": "1. Haz tu primer trato y luego descubre en qué capa del mundo está Kalora.",
    "2. Hear two advisers and pick a 10-year plan. Watch the top bar.": "2. Escucha a dos asesores y escoge un plan de 10 años. Mira la barra de arriba.",
    "3. Survive a price crash, then test the theories on two real countries.": "3. Sobrevive una caída de precios y luego pon a prueba las teorías con dos países reales.",
    "About 25 minutes · 11 quick checks · 2 short answers": "Unos 25 minutos · 11 preguntas rápidas · 2 respuestas cortas",
    "Kalora, Norland, Varenland, Vantor Tech, and all game numbers are made up. Every real fact shows its source.": "Kalora, Norland, Varenland, Vantor Tech y todos los números del juego son inventados. Cada dato real muestra su fuente.",

    // ---------- Part 1 ----------
    "Part 1 of 4 · Your first day": "Parte 1 de 4 · Tu primer día",
    "Vantor Makes an Offer": "Vantor hace una oferta",
    "<p>Your first morning on the job. Vantor's CEO is already in your office. She doesn't sit down.</p>": "<p>Tu primera mañana en el trabajo. La directora de Vantor ya está en tu oficina. No se sienta.</p>",
    [GAME + chat("v", "DANA VOSS · CEO, VANTOR TECH", `<p>We'll buy all of Kalora's cobalt for the next 10 years at today's price. We'll add $1 billion cash today for your debt. Take it or leave it. We can always buy from somewhere else.</p>`) + `<p><b>What do you do?</b></p>`]:
      GAME_ES + chat("v", "DANA VOSS · DIRECTORA, VANTOR TECH", `<p>Compraremos todo el cobalto de Kalora durante los próximos 10 años al precio de hoy. Y les damos $1 mil millones en efectivo hoy para su deuda. Lo toman o lo dejan. Siempre podemos comprar en otro lugar.</p>`) + `<p><b>¿Qué haces?</b></p>`,
    "Sign it and take the $1 billion now": "Firmar y tomar los $1 mil millones ya",
    "Say no and sell to whoever pays the most": "Decir que no y venderle a quien pague más",
    "Sign, but only if Vantor trains Kalorans": "Firmar, pero solo si Vantor capacita a los kaloranos",
    [`<p>${T("up", "−$1 billion debt")}${T("down", "+2 Vantor's grip")}Kalora's debt shrinks. But for 10 years, Kalora must sell to Vantor at today's price, even if prices go up.</p>` + cause("your choice, plus the rule that rich-country buyers set the price.")]:
      `<p>${T("up", "−$1 mil millones de deuda")}${T("down", "+2 control de Vantor")}La deuda de Kalora baja. Pero durante 10 años, Kalora tiene que venderle a Vantor al precio de hoy, aunque los precios suban.</p>` + causeEs("tu decisión, más la regla de que los compradores de países ricos ponen el precio."),
    [`<p>${T("down", "+$1 billion debt")}${T("up", "−1 Vantor's grip")}Kalora stays free to sell to anyone. But an old loan payment comes due. With no cash help, Kalora borrows $1 billion more.</p>` + cause("the starting hand. That debt was there before you were hired.")]:
      `<p>${T("down", "+$1 mil millones de deuda")}${T("up", "−1 control de Vantor")}Kalora sigue libre para venderle a quien quiera. Pero toca pagar un préstamo viejo. Sin ayuda en efectivo, Kalora pide prestados $1 mil millones más.</p>` + causeEs("la mano inicial. Esa deuda ya existía antes de que te contrataran."),
    [`<p>${T("up", "+1 year life span")}${T("down", "+1 Vantor's grip")}Vantor agrees, but drops the $1 billion. "Training costs us money." Kalorans learn skilled mine jobs, and the mines get safer.</p>` + cause("your choice. You traded cash for skills.")]:
      `<p>${T("up", "+1 año de esperanza de vida")}${T("down", "+1 control de Vantor")}Vantor acepta, pero quita los $1 mil millones. "Capacitar nos cuesta dinero." Los kaloranos aprenden trabajos especializados en las minas, y las minas se vuelven más seguras.</p>` + causeEs("tu decisión. Cambiaste dinero por habilidades."),
    "Look back at Vantor's offer. Why could Vantor set the terms of the deal?": "Vuelve a mirar la oferta de Vantor. ¿Por qué Vantor pudo poner las condiciones del trato?",
    "Vantor had the cash and other places to buy": "Vantor tenía el dinero y otros lugares donde comprar",
    "Kalora's laws say Vantor writes all its deals": "Las leyes de Kalora dicen que Vantor escribe sus tratos",
    "Vantor owns the mines because it found them": "Vantor es dueña de las minas porque las encontró",
    "Kalora asked Vantor to pick the price for it": "Kalora le pidió a Vantor que escogiera el precio",
    "Reread the last two sentences the CEO said.": "Vuelve a leer las dos últimas oraciones que dijo la directora.",
    "Vantor had money and choices. Kalora had debt and one main product. That gap in <b>power</b> shaped the deal before you even picked.":
      "Vantor tenía dinero y opciones. Kalora tenía deuda y un solo producto principal. Esa diferencia de <b>poder (power)</b> marcó el trato antes de que tú escogieras.",
    [`<p>That gap has a name. <b>Global stratification</b> means inequality between countries. Inside the U.S., people are ranked in social classes. Around the world, whole countries are ranked in layers too.</p>`
      + card("World Bank country income groups, 2026–27 · average income per person, per year (2025 data)", `<div class="ladder">
            <div class="rung h"><b>High income</b><span>more than $14,375 · 87 countries, like the U.S.</span></div>
            <div class="rung um"><b>Upper-middle</b><span>$4,636 to $14,375 · 59 countries</span></div>
            <div class="rung lm"><b>Lower-middle</b><span>$1,176 to $4,635 · 47 countries</span></div>
            <div class="rung l"><b>Low income</b><span>$1,175 or less · 25 countries, like Chad</span></div></div>`)
      + `<p class="kal"><span class="lab">Kalora · game number</span>Average income: $700 per person, per year.</p>`]:
      `<p>Esa diferencia tiene nombre. La <b>estratificación global (global stratification)</b> es la desigualdad entre países. Dentro de EE. UU., las personas están ordenadas en clases sociales. En el mundo, países enteros también están ordenados en capas.</p>`
      + card("Grupos de ingreso de los países del Banco Mundial, 2026–27 · ingreso promedio por persona, por año (datos de 2025)", `<div class="ladder">
            <div class="rung h"><b>Ingreso alto</b><span>más de $14,375 · 87 países, como EE. UU.</span></div>
            <div class="rung um"><b>Medio-alto</b><span>$4,636 a $14,375 · 59 países</span></div>
            <div class="rung lm"><b>Medio-bajo</b><span>$1,176 a $4,635 · 47 países</span></div>
            <div class="rung l"><b>Ingreso bajo</b><span>$1,175 o menos · 25 países, como Chad</span></div></div>`)
      + `<p class="kal"><span class="lab">Kalora · número del juego</span>Ingreso promedio: $700 por persona, por año.</p>`,
    "Use the World Bank card. Kalora's average income is <b>$700</b> per person a year. Which group would Kalora be in?": "Usa la tarjeta del Banco Mundial. El ingreso promedio de Kalora es <b>$700</b> por persona al año. ¿En qué grupo estaría Kalora?",
    "Low income": "Ingreso bajo",
    "Lower-middle income": "Ingreso medio-bajo",
    "Upper-middle income": "Ingreso medio-alto",
    "High income": "Ingreso alto",
    "Find the row where $700 fits. Is $700 more or less than $1,175?": "Busca la fila donde cabe $700. ¿$700 es más o menos que $1,175?",
    "$700 is below $1,175, so Kalora would be low income, like Chad. The U.S. is far above the high-income line.": "$700 es menos que $1,175, así que Kalora sería de ingreso bajo, como Chad. EE. UU. está muy por encima de la línea de ingreso alto.",
    [card("World Bank, Global Poverty Update, September 2026", `<p><b>Extreme poverty</b> means living on less than <b>$3.00 a day</b> per person (adjusted for local prices). In 2024, about <b>824 million people</b> lived this way. That's about 1 in 10 people on Earth.</p>`)
      + `<p>Living under $3.00 a day is <b>absolute poverty</b>: not enough for basics like food and clean water. The U.S. poverty line is <b>relative</b>: it's based on what things cost in the U.S.</p>`
      + lifeCard + `<p>Kalora (game number) is at 61 years. Norland is at 81. Watch both in the top bar.</p>`]:
      card("Banco Mundial, Actualización de la pobreza mundial, septiembre de 2026", `<p><b>Pobreza extrema (extreme poverty)</b> significa vivir con menos de <b>$3.00 al día</b> por persona (ajustado a los precios de cada lugar). En 2024, unos <b>824 millones de personas</b> vivían así. Eso es más o menos 1 de cada 10 personas en la Tierra.</p>`)
      + `<p>Vivir con menos de $3.00 al día es <b>pobreza absoluta (absolute poverty)</b>: no alcanza para lo básico, como comida y agua limpia. La línea de pobreza de EE. UU. es <b>relativa (relative)</b>: se basa en lo que cuestan las cosas en EE. UU.</p>`
      + lifeCardEs + `<p>Kalora (número del juego) está en 61 años. Norland está en 81. Mira los dos en la barra de arriba.</p>`,
    "A family in Cedar Rapids is below the U.S. poverty line. A family in Chad lives on $2 a day per person. Which statement fits the facts?": "Una familia en Cedar Rapids está por debajo de la línea de pobreza de EE. UU. Una familia en Chad vive con $2 al día por persona. ¿Qué frase va con los datos?",
    "The Chad family is in absolute poverty; the U.S. line is relative": "La familia de Chad está en pobreza absoluta; la línea de EE. UU. es relativa",
    "Both families are in absolute poverty, using the $3.00 line": "Las dos familias están en pobreza absoluta, según la línea de $3.00",
    "The Cedar Rapids family is in absolute poverty; Chad's is relative": "La familia de Cedar Rapids está en pobreza absoluta; la de Chad es relativa",
    "Neither family is poor, since each country has its own line": "Ninguna familia es pobre, porque cada país tiene su propia línea",
    "$2 is under the $3.00 line. Which kind of poverty means not enough for basics?": "$2 está por debajo de la línea de $3.00. ¿Qué tipo de pobreza significa que no alcanza para lo básico?",
    "$2 a day is under the World Bank's $3.00 line, so that's absolute poverty. Being poor in Iowa is real and hard, but the U.S. line is relative: it's measured against U.S. costs.": "$2 al día está por debajo de la línea de $3.00 del Banco Mundial, así que es pobreza absoluta. Ser pobre en Iowa es real y difícil, pero la línea de EE. UU. es relativa: se mide con los costos de EE. UU.",

    // ---------- Part 2 ----------
    "Part 2 of 4 · Two advisers": "Parte 2 de 4 · Dos asesores",
    "Why Is Kalora Poor?": "¿Por qué Kalora es pobre?",
    "<p>Now you need a 10-year plan. Two advisers walk in. Each one says they know <b>why</b> Kalora is poor. Each one uses a real theory that sociologists use. Hear both.</p>":
      "<p>Ahora necesitas un plan de 10 años. Entran dos asesores. Cada uno dice que sabe <b>por qué</b> Kalora es pobre. Cada uno usa una teoría real que usan los sociólogos. Escucha a los dos.</p>",
    [chat("", "DR. MIN RHEE · ADVISER", `<p>Kalora isn't doomed. It's early. Every rich country was once a farming country. Build schools, power plants, and roads. Get companies to put money into factories here. Then we climb.</p>`)
      + card("Primary source · Walt Rostow, The Stages of Economic Growth, 1960", `<p class="quote">"It is possible to identify all societies, in their economic dimensions, as lying within one of five categories."</p><p><b>In plain words:</b> Every country is at one of 5 stages: (1) traditional (farming), (2) getting ready, (3) take-off (industry grows), (4) drive to maturity, (5) high mass-consumption (lots of buying). <i>Dimensions</i> means parts.</p>`)
      + `<p class="named"><b>Modernization theory:</b> countries are poor because they haven't developed yet. The fix is technology, factories, schools, and investment. <i>Its critics say</i> it blames poor countries and ignores colonialism.</p>`]:
      chat("", "DR. MIN RHEE · ASESOR", `<p>Kalora no está condenada. Solo va empezando. Todo país rico fue alguna vez un país de agricultores. Construyamos escuelas, plantas de energía y carreteras. Consigamos que las empresas pongan dinero en fábricas aquí. Así subimos.</p>`)
      + card("Fuente primaria · Walt Rostow, Las etapas del crecimiento económico, 1960", `<p class="quote">"It is possible to identify all societies, in their economic dimensions, as lying within one of five categories."</p><p><b>En palabras sencillas:</b> "Es posible ubicar a todas las sociedades, en su parte económica, en una de cinco categorías." Cada país está en una de 5 etapas: (1) tradicional (agricultura), (2) preparándose, (3) despegue (crece la industria), (4) camino a la madurez, (5) alto consumo masivo (mucha compra). <i>Dimensions</i> significa partes.</p>`)
      + `<p class="named"><b>Teoría de la modernización (modernization theory):</b> los países son pobres porque todavía no se han desarrollado. La solución es tecnología, fábricas, escuelas e inversión. <i>Sus críticos dicen</i> que culpa a los países pobres e ignora el colonialismo.</p>`,
    "According to Dr. Rhee's theory, <b>modernization</b>, why is Kalora poor?": "Según la teoría del Dr. Rhee, la <b>modernización</b>, ¿por qué Kalora es pobre?",
    "It hasn't moved through the stages of growth yet": "Todavía no ha pasado por las etapas del crecimiento",
    "Rich countries took its land and all its resources": "Los países ricos le quitaron su tierra y sus recursos",
    "It sits at the outer edge of one world economy": "Está en el borde exterior de una sola economía mundial",
    "Trade rules keep it selling cheap raw goods": "Las reglas del comercio la obligan a vender materias primas baratas",
    "Reread Dr. Rhee's message and the Rostow quote. What's the one big reason?": "Vuelve a leer el mensaje del Dr. Rhee y la cita de Rostow. ¿Cuál es la gran razón?",
    "Modernization theory says poor countries just haven't developed yet. With technology, factories, and schools, they can climb the stages.": "La teoría de la modernización dice que los países pobres simplemente todavía no se han desarrollado. Con tecnología, fábricas y escuelas, pueden subir de etapa.",
    [chat("o", "DR. ADA OKAFOR · ADVISER", `<p>Kalora isn't "behind." It was built to be someone else's mine. Look at the railroad: mine to port, not town to town. Rich countries got rich partly by taking from places like us. Change the deal, or nothing changes.</p>`)
      + card("Real history · Africa in 1913", `<p>By 1913, European powers ruled almost all of Africa as <b>colonies</b>. Only Ethiopia and Liberia were independent. Colonies sent out cheap raw goods, like rubber and cotton, and bought back factory goods. After independence, many still depended on selling raw goods.</p>`)
      + `<p class="named"><b>Dependency theory:</b> rich countries got rich partly by taking from poor ones, and unfair ties keep poor countries selling cheap raw goods. <i>Its critics say</i> some former colonies, like South Korea and Singapore, later became rich.</p>`]:
      chat("o", "DRA. ADA OKAFOR · ASESORA", `<p>Kalora no está "atrasada". La construyeron para ser la mina de otro. Mira el tren: de la mina al puerto, no de pueblo a pueblo. Los países ricos se hicieron ricos en parte quitándoles a lugares como nosotros. Cambia el trato, o nada cambia.</p>`)
      + card("Historia real · África en 1913", `<p>Para 1913, las potencias europeas gobernaban casi toda África como <b>colonias</b>. Solo Etiopía y Liberia eran independientes. Las colonias enviaban materias primas baratas, como caucho y algodón, y volvían a comprar productos de fábrica. Después de la independencia, muchas siguieron dependiendo de vender materias primas.</p>`)
      + `<p class="named"><b>Teoría de la dependencia (dependency theory):</b> los países ricos se hicieron ricos en parte quitándoles a los pobres, y los lazos injustos mantienen a los países pobres vendiendo materias primas baratas. <i>Sus críticos dicen</i> que algunas antiguas colonias, como Corea del Sur y Singapur, luego se hicieron ricas.</p>`,
    "Kalora's only railroad runs from the mines to the port. Which theory uses facts like that as evidence?": "El único tren de Kalora va de las minas al puerto. ¿Qué teoría usa datos como ese como evidencia?",
    "Dependency: colonies were built to ship raw goods out": "Dependencia: las colonias se hicieron para sacar materias primas",
    "Modernization: Kalora is still stuck in the farming stage": "Modernización: Kalora sigue atascada en la etapa agrícola",
    "Modernization: a railroad proves Kalora is developed": "Modernización: un tren prueba que Kalora ya se desarrolló",
    "Dependency: Kalora chose to stay away from world trade": "Dependencia: Kalora decidió alejarse del comercio mundial",
    "Which adviser talked about the railroad? Which theory is that adviser's?": "¿Qué asesor habló del tren? ¿Cuál es la teoría de ese asesor?",
    "A railroad from mine to port was built for the colonizer's profit, not to connect Kalorans. Dependency theory says ties like that keep poor countries selling raw goods.": "Un tren de la mina al puerto se construyó para la ganancia del colonizador, no para conectar a los kaloranos. La teoría de la dependencia dice que lazos así mantienen a los países pobres vendiendo materias primas.",
    [GAME + `<p><b>Pick Kalora's 10-year plan.</b> Both advisers are watching. So is Vantor.</p><p>(A <b>refinery</b> is a plant that cleans raw metal so factories can use it.)</p>`]:
      GAME_ES + `<p><b>Escoge el plan de 10 años de Kalora.</b> Los dos asesores están mirando. Vantor también.</p><p>(Una <b>refinería (refinery)</b> es una planta que limpia el metal en bruto para que las fábricas lo puedan usar.)</p>`,
    "Rhee's plan: borrow $3 billion for schools, clinics, and power": "Plan de Rhee: pedir prestados $3 mil millones para escuelas, clínicas y energía",
    "Okafor's plan: tax raw cobalt and demand a refinery in Kalora": "Plan de Okafor: cobrar impuesto al cobalto y exigir una refinería en Kalora",
    "Mix both: a few new schools and a small cobalt tax": "Mezclar los dos: algunas escuelas nuevas y un impuesto pequeño al cobalto",
    [`<p>${T("up", "+3 years life span")}${T("down", "+$3 billion debt")}Kids fill the new schools. Clinics help mothers and babies survive. But loan payments now eat a big part of the budget.</p>` + cause("your choice. This is the <b>modernization</b> plan: invest and build so Kalora can climb the stages.")]:
      `<p>${T("up", "+3 años de esperanza de vida")}${T("down", "+$3 mil millones de deuda")}Los niños llenan las escuelas nuevas. Las clínicas ayudan a que las madres y los bebés sobrevivan. Pero los pagos del préstamo ahora se comen gran parte del presupuesto.</p>` + causeEs("tu decisión. Este es el plan de la <b>modernización</b>: invertir y construir para que Kalora suba de etapa."),
    [`<p>${T("up", "−$1 billion debt")}${T("up", "−2 Vantor's grip")}${T("down", "mines shut for a year")}Vantor pushes back. It buys cobalt somewhere else for a year, and miners lose their pay. Then Vantor agrees to a small refinery. Now Kalora keeps more money from each ton.</p>` + cause("your choice, and Vantor's power to walk away. This is the <b>dependency</b> plan: break unfair ties and keep more of the value at home.")]:
      `<p>${T("up", "−$1 mil millones de deuda")}${T("up", "−2 control de Vantor")}${T("down", "minas cerradas un año")}Vantor se resiste. Compra cobalto en otro lugar durante un año, y los mineros pierden su pago. Luego Vantor acepta una refinería pequeña. Ahora Kalora se queda con más dinero por cada tonelada.</p>` + causeEs("tu decisión, y el poder de Vantor para irse. Este es el plan de la <b>dependencia</b>: romper los lazos injustos y quedarse con más del valor en casa."),
    [`<p>${T("up", "+1 year life span")}${T("down", "+$1 billion debt")}Some new schools open. Vantor grumbles but pays the small tax. It's progress, but slow. Nothing big changes.</p>` + cause("your choice. You mixed both theories' plans. Many real countries do.")]:
      `<p>${T("up", "+1 año de esperanza de vida")}${T("down", "+$1 mil millones de deuda")}Abren algunas escuelas nuevas. Vantor se queja pero paga el impuesto pequeño. Es progreso, pero lento. Nada grande cambia.</p>` + causeEs("tu decisión. Mezclaste los planes de las dos teorías. Muchos países reales lo hacen."),

    // ---------- Part 3 ----------
    "Part 3 of 4 · Year 8": "Parte 3 de 4 · Año 8",
    "The Price Crash": "La caída del precio",
    "<p>Eight years into your plan, the phone on your desk won't stop buzzing.</p>": "<p>Ocho años después de empezar tu plan, el teléfono de tu escritorio no para de sonar.</p>",
    [GAME + `<p><b>Battery makers find a way to use less cobalt.</b> The world price falls by half. Kalora's cobalt money falls by half too. Over in Norland, where the batteries are made, people barely notice.</p><p><b>Kalora is short on money. What do you cut or risk?</b></p>`]:
      GAME_ES + `<p><b>Los fabricantes de baterías encuentran una forma de usar menos cobalto.</b> El precio mundial baja a la mitad. El dinero del cobalto de Kalora también baja a la mitad. En Norland, donde se fabrican las baterías, la gente casi ni lo nota.</p><p><b>A Kalora le falta dinero. ¿Qué recortas o qué arriesgas?</b></p>`,
    "Cut school and clinic budgets to keep paying the debt": "Recortar el presupuesto de escuelas y clínicas para seguir pagando la deuda",
    "Borrow more money to keep schools and clinics open": "Pedir más dinero prestado para mantener abiertas las escuelas y clínicas",
    "Dig faster and sell more cobalt to make up the money": "Excavar más rápido y vender más cobalto para reponer el dinero",
    [`<p>${T("down", "−2 years life span")}Kalora keeps up its loan payments. But teachers get laid off, and clinics run out of medicine.</p>` + cause("the starting hand. Kalora sells one raw good and doesn't set its price.")]:
      `<p>${T("down", "−2 años de esperanza de vida")}Kalora sigue pagando sus préstamos. Pero despiden a maestros, y a las clínicas se les acaban las medicinas.</p>` + causeEs("la mano inicial. Kalora vende una sola materia prima y no pone su precio."),
    [`<p>${T("down", "+$2 billion debt")}${T("down", "+1 Vantor's grip")}Schools stay open. But the new lenders want a say: Kalora must sell Vantor a bigger share of its mines.</p>` + cause("the starting hand. Kalora sells one raw good and doesn't set its price.")]:
      `<p>${T("down", "+$2 mil millones de deuda")}${T("down", "+1 control de Vantor")}Las escuelas siguen abiertas. Pero los nuevos prestamistas quieren opinar: Kalora tiene que venderle a Vantor una parte más grande de sus minas.</p>` + causeEs("la mano inicial. Kalora vende una sola materia prima y no pone su precio."),
    [`<p>${T("down", "−1 year life span")}${T("down", "+1 Vantor's grip")}More people dig by hand to fill orders, and injuries go up. Selling more also keeps the world price low.</p>` + cause("the starting hand. Kalora sells one raw good and doesn't set its price.")]:
      `<p>${T("down", "−1 año de esperanza de vida")}${T("down", "+1 control de Vantor")}Más gente excava a mano para cumplir los pedidos, y suben los accidentes. Vender más también mantiene bajo el precio mundial.</p>` + causeEs("la mano inicial. Kalora vende una sola materia prima y no pone su precio."),
    [`<p>Every choice hurt, and Norland barely felt a thing. A third theory explains why.</p>`
      + card("Immanuel Wallerstein, The Modern World-System, 1974", `<p>Sociologist Immanuel Wallerstein said the whole world is <b>one economic system with layers</b>.</p>`)
      + `<div class="layers"><div class="c"><b>Core (the center)</b>Controls money, tech, and trade. Like the U.S. and Germany.</div><div class="s"><b>Semi-periphery (the middle)</b>In between. Can rise or fall. Like Mexico.</div><div class="p"><b>Periphery (the outer edge)</b>Sells raw goods and cheap labor. Like Chad.</div></div>`
      + `<p class="named"><b>World systems theory:</b> a country's place in the world economy (core, semi-periphery, or periphery) shapes how rich it can get.</p>`]:
      `<p>Todas las opciones dolieron, y Norland casi no sintió nada. Una tercera teoría explica por qué.</p>`
      + card("Immanuel Wallerstein, El moderno sistema mundial, 1974", `<p>El sociólogo Immanuel Wallerstein dijo que el mundo entero es <b>un solo sistema económico con capas</b>.</p>`)
      + `<div class="layers"><div class="c"><b>Centro (core)</b>Controla el dinero, la tecnología y el comercio. Como EE. UU. y Alemania.</div><div class="s"><b>Semiperiferia (semi-periphery)</b>En el medio. Puede subir o bajar. Como México.</div><div class="p"><b>Periferia (periphery)</b>Vende materias primas y mano de obra barata. Como Chad.</div></div>`
      + `<p class="named"><b>Teoría del sistema mundial (world systems theory):</b> el lugar de un país en la economía mundial (centro, semiperiferia o periferia) influye en qué tan rico puede llegar a ser.</p>`,
    "The price crash hit Kalora hard but barely touched Norland. Using world systems theory, why?": "La caída del precio golpeó fuerte a Kalora pero casi no tocó a Norland. Según la teoría del sistema mundial, ¿por qué?",
    "Kalora is periphery: it sells one raw good": "Kalora es periferia: vende una sola materia prima",
    "Norland is periphery: it sells cheap labor": "Norland es periferia: vende mano de obra barata",
    "Kalora is core: it controls the world's money": "Kalora es centro: controla el dinero del mundo",
    "Norland is semi-periphery: it can rise or fall": "Norland es semiperiferia: puede subir o bajar",
    "Check the three layer boxes. Which layer sells raw goods? Which layer is Norland in?": "Revisa los tres cuadros de capas. ¿Qué capa vende materias primas? ¿En qué capa está Norland?",
    "The periphery sells raw goods and doesn't set prices, so price swings hit it hardest. The core makes and sells the finished products.": "La periferia vende materias primas y no pone los precios, así que los cambios de precio la golpean más. El centro fabrica y vende los productos terminados.",
    "Countries in the semi-periphery can rise or fall. Which change would most help Kalora rise toward that middle layer?": "Los países de la semiperiferia pueden subir o bajar. ¿Qué cambio ayudaría más a Kalora a subir hacia esa capa del medio?",
    "Making finished goods at home, not just raw cobalt": "Fabricar productos terminados en casa, no solo cobalto en bruto",
    "Selling even more raw cobalt every single year": "Vender todavía más cobalto en bruto cada año",
    "Letting Vantor buy up and run all of Kalora's mines": "Dejar que Vantor compre y maneje todas las minas de Kalora",
    "Cutting school budgets to pay its debts faster": "Recortar el presupuesto de escuelas para pagar más rápido",
    "Look at what the core does that the periphery doesn't.": "Mira lo que hace el centro y la periferia no.",
    "The core makes the finished products. Building refineries and factories at home, like the refinery in Dr. Okafor's plan, moves a country toward the middle layer.": "El centro fabrica los productos terminados. Construir refinerías y fábricas en casa, como la refinería del plan de la Dra. Okafor, acerca a un país a la capa del medio.",

    // ---------- Part 4 ----------
    "Part 4 of 4 · Real case files": "Parte 4 de 4 · Casos reales",
    "Test the Theories": "Pon a prueba las teorías",
    "<p>Kalora is made up. These two countries are <b>real</b>. Your job: test the three theories against real evidence.</p>": "<p>Kalora es inventada. Estos dos países son <b>reales</b>. Tu trabajo: poner a prueba las tres teorías con evidencia real.</p>",
    [card("Case file · Democratic Republic of the Congo (real)", `<div class="barchart"><div class="row low"><span>Mined in Congo</span><div class="t"><span style="width:74%"></span></div><b>230,000 t</b></div><div class="row"><span>Mined everywhere else</span><div class="t"><span style="width:26%"></span></div><b>80,000 t</b></div></div><span class="cite">World cobalt mining in 2025, about 310,000 tons total · U.S. Geological Survey, Mineral Commodity Summaries 2026</span>
            <ul><li>Congo mines about <b>3 of every 4 tons</b> of the world's cobalt.</li>
            <li>Congo is on the World Bank's <b>low-income</b> list for 2026–27.</li>
            <li>Many miners dig by hand for low pay. The work is often dangerous, and child labor has been reported.</li>
            <li>Most of Congo's cobalt leaves the country to be refined and built into batteries somewhere else. China refines the most cobalt (USGS).</li>
            <li>Belgium ruled Congo as a colony until 1960.</li></ul>`)]:
      card("Caso · República Democrática del Congo (real)", `<div class="barchart"><div class="row low"><span>Sacado en el Congo</span><div class="t"><span style="width:74%"></span></div><b>230,000 t</b></div><div class="row"><span>Sacado en el resto del mundo</span><div class="t"><span style="width:26%"></span></div><b>80,000 t</b></div></div><span class="cite">Cobalto sacado de minas en el mundo en 2025, unas 310,000 toneladas en total · Servicio Geológico de EE. UU. (USGS), Mineral Commodity Summaries 2026</span>
            <ul><li>El Congo saca unas <b>3 de cada 4 toneladas</b> del cobalto del mundo.</li>
            <li>El Congo está en la lista de <b>ingreso bajo</b> del Banco Mundial para 2026–27.</li>
            <li>Muchos mineros excavan a mano por poco pago. El trabajo suele ser peligroso, y se han reportado casos de trabajo infantil.</li>
            <li>La mayor parte del cobalto del Congo sale del país para ser refinado y convertido en baterías en otro lugar. China es el país que más cobalto refina (USGS).</li>
            <li>Bélgica gobernó el Congo como colonia hasta 1960.</li></ul>`),
    "Congo has most of the world's cobalt but is still low income. Which explanation uses <b>world systems</b> theory?": "El Congo tiene la mayor parte del cobalto del mundo, pero sigue siendo de ingreso bajo. ¿Qué explicación usa la teoría del <b>sistema mundial</b>?",
    "Congo is periphery: raw cobalt flows out to core companies": "El Congo es periferia: el cobalto en bruto sale hacia empresas del centro",
    "Congo hasn't reached the take-off stage of growth yet": "El Congo todavía no llega a la etapa de despegue del crecimiento",
    "Congo's colonial rulers set it up to ship its raw goods out": "Los gobernantes coloniales del Congo lo armaron para sacar materias primas",
    "Congo is core: it controls most of the world's cobalt": "El Congo es centro: controla casi todo el cobalto del mundo",
    "World systems theory uses the words core and periphery. Which layer sells raw goods?": "La teoría del sistema mundial usa las palabras centro y periferia. ¿Qué capa vende materias primas?",
    "Congo digs the cobalt, but the money is made where it's refined and built into batteries. That's the periphery feeding the core.": "El Congo excava el cobalto, pero el dinero se gana donde lo refinan y lo convierten en baterías. Esa es la periferia alimentando al centro.",
    "A <b>modernization</b> theorist reads the same Congo case file. What would they say Congo needs most?": "Un teórico de la <b>modernización</b> lee el mismo caso del Congo. ¿Qué diría que el Congo necesita más?",
    "Investment in machines, refineries, and schools": "Inversión en máquinas, refinerías y escuelas",
    "To cut all of its trade ties with rich countries now": "Cortar ya todos los lazos de comercio con los países ricos",
    "To keep selling raw cobalt, but much faster": "Seguir vendiendo cobalto en bruto, pero mucho más rápido",
    "To let foreign buyers keep setting its price": "Dejar que los compradores extranjeros sigan poniendo el precio",
    "Dr. Rhee's fix was technology, factories, schools, and investment. Which choice matches that?": "La solución del Dr. Rhee era tecnología, fábricas, escuelas e inversión. ¿Qué opción va con eso?",
    "Modernization's answer: hand-digging and no refineries mean Congo hasn't modernized yet. Technology, factories, and schools are its fix.": "La respuesta de la modernización: excavar a mano y no tener refinerías significa que el Congo todavía no se ha modernizado. Su solución es tecnología, fábricas y escuelas.",
    [card("Case file · South Korea (real)", `<ul><li>Ruled by Japan as a colony from 1910 to 1945. Then the Korean War (1950–1953) left much of it in ruins.</li>
            <li>Income per person: about <b>$159</b> in 1960, and about <b>$36,200</b> in 2025.<span class="cite">World Bank, World Development Indicators, via FRED · not adjusted for rising prices</span></li>
            <li>It built schools, factories, and exports like ships, cars, and phones. (Samsung is a Korean company.) Today the World Bank lists South Korea as <b>high income</b>.</li>
            <li>Dependency supporters answer that South Korea is a rare case: 21 of the world's 25 low-income countries are in Africa.<span class="cite">World Bank, 2026–27 income groups</span></li></ul>`)]:
      card("Caso · Corea del Sur (real)", `<ul><li>Japón la gobernó como colonia de 1910 a 1945. Después, la Guerra de Corea (1950–1953) dejó gran parte del país en ruinas.</li>
            <li>Ingreso por persona: unos <b>$159</b> en 1960, y unos <b>$36,200</b> en 2025.<span class="cite">Banco Mundial, Indicadores del Desarrollo Mundial, vía FRED · sin ajustar por el aumento de precios</span></li>
            <li>Construyó escuelas, fábricas y exportaciones como barcos, carros y celulares. (Samsung es una empresa coreana.) Hoy el Banco Mundial pone a Corea del Sur en <b>ingreso alto</b>.</li>
            <li>Los que apoyan la teoría de la dependencia responden que Corea del Sur es un caso raro: 21 de los 25 países de ingreso bajo del mundo están en África.<span class="cite">Banco Mundial, grupos de ingreso 2026–27</span></li></ul>`),
    "How does South Korea's story challenge <b>dependency</b> theory?": "¿Cómo pone en duda la historia de Corea del Sur a la teoría de la <b>dependencia</b>?",
    "A poor former colony became a rich country": "Una antigua colonia pobre se volvió un país rico",
    "It was never ruled by any other country": "Nunca fue gobernada por otro país",
    "It stayed poor long after its colony years": "Siguió pobre mucho después de ser colonia",
    "It got rich mostly by selling raw goods": "Se hizo rica sobre todo vendiendo materias primas",
    "Reread the first two lines of the case file. Where did South Korea start, and where is it now?": "Vuelve a leer las dos primeras líneas del caso. ¿Dónde empezó Corea del Sur y dónde está ahora?",
    "Dependency theory says old colonial ties keep countries poor. South Korea was a colony and got rich anyway. That's modernization's best example.": "La teoría de la dependencia dice que los viejos lazos coloniales mantienen pobres a los países. Corea del Sur fue colonia y aun así se hizo rica. Ese es el mejor ejemplo de la modernización.",
    "Exit check": "Pregunta de salida",
    [lifeCard + "What does this chart show about global stratification?"]: lifeCardEs + "¿Qué muestra esta gráfica sobre la estratificación global?",
    "The country you're born in shapes your life chances": "El país donde naces influye en tus oportunidades de vida",
    "Life chances are about the same in every country": "Las oportunidades de vida son casi iguales en todos los países",
    "People in poorer countries make less healthy choices": "La gente de países más pobres toma decisiones menos sanas",
    "How long you live depends only on your own effort": "Cuánto vives depende solo de tu propio esfuerzo",
    "Compare the two bars. Did the babies in each group choose where they were born?": "Compara las dos barras. ¿Los bebés de cada grupo escogieron dónde nacer?",
    "About 15 years of life depend on which layer of the world you're born into. That's global stratification shaping life chances.": "Unos 15 años de vida dependen de en qué capa del mundo naces. Eso es la estratificación global influyendo en las oportunidades de vida.",

    // ---------- Finale ----------
    "Kalora, 20 Years Later": "Kalora, 20 años después",
    "Kalora (game numbers)": "Kalora (números del juego)",
    "Norland (game numbers)": "Norland (números del juego)",
    "Debt:": "Deuda:",
    ", the whole game": ", todo el juego",
    "Makes the batteries": "Fabrica las baterías",
    "The price crash barely touched it": "La caída del precio casi no la tocó",
    "What your choices changed": "Lo que cambiaron tus decisiones",
    "What the starting hand decided": "Lo que decidió la mano inicial",
    "One raw good, sold at a price set by rich-country buyers": "Una sola materia prima, vendida al precio que ponen los compradores de países ricos",
    "A railroad built from the mines to the port": "Un tren construido de las minas al puerto",
    "Old debt from before you were hired": "Deuda vieja de antes de que te contrataran",
    "A powerful buyer that could walk away": "Un comprador poderoso que podía irse",
    "Debt down $1 billion, but Vantor's grip got tighter": "La deuda bajó $1 mil millones, pero el control de Vantor creció",
    "Kept Kalora free to sell, but debt went up": "Kalora siguió libre para vender, pero la deuda subió",
    "Safer mines and skilled jobs, but no cash help": "Minas más seguras y trabajos especializados, pero sin ayuda en efectivo",
    "Schools and clinics added 3 years of life, but debt went up $3 billion": "Las escuelas y clínicas sumaron 3 años de vida, pero la deuda subió $3 mil millones",
    "Kept more money from each ton, but the mines shut for a year": "Más dinero por cada tonelada, pero las minas cerraron un año",
    "Some new schools and a small tax, but slow progress": "Algunas escuelas nuevas y un impuesto pequeño, pero progreso lento",
    "Kept paying the debt, but life span dropped 2 years": "Siguió pagando la deuda, pero la esperanza de vida bajó 2 años",
    "Kept schools open, but debt and Vantor's grip went up": "Las escuelas siguieron abiertas, pero subieron la deuda y el control de Vantor",
    "Made up some money, but more injuries and a tighter grip": "Recuperó algo de dinero, pero con más accidentes y más control de Vantor",
    "Your choices mattered. That's modernization's best point. But the starting hand set limits. That's what dependency and world systems theory say. Sociologists still argue about which matters more.":
      "Tus decisiones importaron. Ese es el mejor punto de la modernización. Pero la mano inicial puso límites. Eso es lo que dicen la teoría de la dependencia y la del sistema mundial. Los sociólogos todavía discuten qué importa más.",
    "Answer both in 1–2 full sentences.": "Responde las dos en 1–2 oraciones completas.",
    "Want to go deeper? In answer 1, also say one thing another theory misses.": "¿Quieres ir más a fondo? En la respuesta 1, di también algo que otra teoría no explica.",
    "1. Which theory best explains why some countries are rich and others are poor? Use one real fact from today.": "1. ¿Qué teoría explica mejor por qué algunos países son ricos y otros son pobres? Usa un dato real de hoy.",
    "___ theory explains it best because ___. One real fact that shows this is ___.": "La teoría de ___ lo explica mejor porque ___. Un dato real que lo muestra es ___.",
    "2. What shaped Kalora's results more: its starting hand or your choices? Give one example from your game.": "2. ¿Qué influyó más en los resultados de Kalora: su mano inicial o tus decisiones? Da un ejemplo de tu juego.",
    "Kalora's results were shaped more by ___ because ___. For example, ___.": "Los resultados de Kalora dependieron más de ___ porque ___. Por ejemplo, ___.",
    "Best theory + real fact": "la mejor teoría + un dato real",
    "Starting hand vs. choices": "mano inicial vs. decisiones",
    "In answer 1, name a theory (modernization, dependency, or world systems) AND one real fact from today (Congo's cobalt, South Korea, colonies in 1913, the $3.00 line, life spans…).":
      "En la respuesta 1, nombra una teoría (modernización, dependencia o sistema mundial) Y un dato real de hoy (el cobalto del Congo, Corea del Sur, las colonias en 1913, la línea de $3.00, la esperanza de vida…).",
    "In answer 2, say starting hand or choices, AND give one example from your game (Vantor's deal, the debt, the price crash, schools, the refinery…).":
      "En la respuesta 2, di mano inicial o decisiones, Y da un ejemplo de tu juego (el trato con Vantor, la deuda, la caída del precio, las escuelas, la refinería…)."
  };

  SiteLang.add({
    dict,
    patterns: [
      { re: /^\$(\d+) billion$/, es: "$$$1 mil millones" },
      { re: /^(\d+) years$/, es: "$1 años" }
    ],
    writing: {
      theory: [
        ["modernizacion", "dependencia", "sistema mundial", "sistema-mundo", "centro", "periferia"],
        ["cobalto", "corea", "colon", "africa", "refin", "materia", "bruto", "pobreza", "vida", "anos", "ingreso", "banco mundial", "etapa", "maquina", "mano", "belgica", "japon", "caucho", "algodon", "etiopia"]
      ],
      hand: [
        ["mano", "inicial", "decision", "decidi", "escog", "elegi", "las dos", "ambas", "plan"],
        ["deuda", "precio", "caida", "escuela", "clinica", "refineria", "impuesto", "tren", "colonia", "cobalto", "esperanza", "control", "prest", "trato", "mina", "capacit"]
      ]
    }
  });
})();
