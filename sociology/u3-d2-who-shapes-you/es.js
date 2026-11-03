// Spanish for "Push Wars" (Sociology Unit 3 Day 2). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English game keeps running underneath
// (same answer checks, same turn-in data).
(function () {
  const pairs = [
    // ---------- Page frame + HUD ----------
    ["Push Wars | Sociology Unit 3 Day 2", "Guerra de alertas | Sociología Unidad 3 Día 2"],
    ["Dex · your boss", "Dex · tu jefe"],
    ["Watch time", "Tiempo de video"], ["Jay's life", "Vida de Jay"], ["Annoyed", "Molesto"], ["Pushes", "Alertas"],
    ["Game meters", "Medidores del juego"],
    ["Describe the process of socialization across the life course.", "Describir el proceso de socialización a lo largo de la vida."],
    ["Mon", "Lun"], ["Tue", "Mar"], ["Wed", "Mié"], ["Sun", "Dom"], ["Next week", "Próxima semana"],

    // ---------- Intro ----------
    ["Sociology · Unit 3 · Day 2", "Sociología · Unidad 3 · Día 2"],
    ["Push Wars", "Guerra de alertas"],
    ["You run a video app's alerts. Can the feed beat a teen's whole life?", "Tú manejas las alertas de una app de videos. ¿Puede el feed ganarle a toda la vida de un adolescente?"],
    ["Push alerts into Jay's week", "Manda alertas en la semana de Jay"],
    ["Beat friends, family, work, school", "Gánale a amigos, familia, trabajo y escuela"],
    ["About 25 minutes", "Unos 25 minutos"],
    ["Today's goal:", "Meta de hoy:"],
    ["Explain which agents shape teens most, and why it changes.", "Explicar qué agentes forman más a los adolescentes y por qué eso cambia."],
    ["Your name: first name + last initial", "Tu nombre: nombre + inicial del apellido"],
    ["Clock in at ClipLoop →", "Empezar turno en ClipLoop →"],
    ["Made-up app and people. Real research.", "App y personas inventadas. Investigación real."],
    ["👥 group chat", "👥 chat de amigos"], ["🏠 Mom", "🏠 Mamá"], ["⛪ Grandma", "⛪ Abuela"],

    // ---------- Agents, pips, stamps ----------
    ["Peers", "Compañeros"], ["Family", "Familia"], ["School", "Escuela"], ["Workplace", "Trabajo"],
    ["Family + Religion", "Familia + Religión"], ["Nobody", "Nadie"], ["Media", "Medios"], ["Feed", "Feed"],
    ["Time", "Tiempo"], ["Trust", "Confianza"], ["Reward", "Premio"], ["Punishment", "Castigo"],
    ["PEERS WIN", "GANAN LOS COMPAÑEROS"], ["FAMILY WINS", "GANA LA FAMILIA"], ["SCHOOL WINS", "GANA LA ESCUELA"],
    ["WORKPLACE WINS", "GANA EL TRABAJO"], ["FAMILY + RELIGION WIN", "GANAN FAMILIA + RELIGIÓN"], ["FEED WINS", "GANA EL FEED"],
    ["NO BONUS", "SIN BONO"], ["CAUGHT", "TE DESCUBRIÓ"], ["UNLOCKED", "DESBLOQUEADO"],

    // ---------- Day board ----------
    ["Tap to add pushes", "Toca para agregar alertas"],
    ["More power than them wins", "Más poder que ellos gana"],
    ["Lost pushes annoy Jay", "Alertas perdidas molestan a Jay"],
    ["Wants what Dex wants", "Quiere lo mismo que Dex"],
    ["The feed rode along.", "El feed se subió a la ola."],
    ["Jay muted ClipLoop alerts!", "¡Jay silenció las alertas de ClipLoop!"],
    ["Tie? They win.", "¿Empate? Ganan ellos."],
    ["Out of pushes for the week.", "Ya no te quedan alertas esta semana."],
    ["Place at least 1 ⚡ push first.", "Primero pon al menos 1 alerta ⚡."],
    ["Not you? Start fresh", "¿No eres tú? Empieza de nuevo"],
    ["Next →", "Siguiente →"],
    ["3:15 PM", "3:15 p. m."], ["6:00 PM", "6:00 p. m."], ["11:00 PM", "11:00 p. m."], ["5–9 PM", "5–9 p. m."],
    ["9:15 PM", "9:15 p. m."], ["4:00 PM", "4:00 p. m."], ["7:30 AM", "7:30 a. m."], ["10:00 AM", "10:00 a. m."],

    // Night
    ["A few clips, then sleep.", "Unos videos y a dormir."],
    ["Clips till midnight.", "Videos hasta la medianoche."],
    ["Clips till 1 a.m. Tired.", "Videos hasta la 1 a. m. Cansado."],
    ["Clips till 2 a.m. Wrecked.", "Videos hasta las 2 a. m. Destruido."],

    // Monday
    ["Monday", "Lunes"], ["Shoe Day", "Día de tenis"], ["Jay has $120. He owes Mom $40.", "Jay tiene $120. Le debe $40 a mamá."],
    ["Shoe ads pay best. Push!", "Los anuncios de tenis pagan más. ¡Empuja!"], ["▶ Run Monday", "▶ Jugar el lunes"],
    ["<b>Agents of socialization</b>: groups that teach us how to act.", "<b>Agentes de socialización</b>: grupos que nos enseñan cómo actuar."],
    ["Group chat", "Chat de amigos"], ["“everybody's getting Volt 3s 🔥”", "“todos se van a comprar los Volt 3 🔥”"],
    ["all day", "todo el día"], ["fitting in", "encajar"], ["roasted", "burlas"],
    ["Bought Volts anyway. Paid Mom back.", "Compró los Volt de todos modos. Le pagó a mamá."],
    ["Binged clips. Spent all $120 on Volts.", "Vio muchos videos. Gastó los $120 en unos Volt."],
    ["Mom", "Mamá"], ["“No phones at dinner.”", "“No hay celulares en la cena.”"], ["takes phone", "quita el celular"], ["owed $40", "le debe $40"],
    ["Phone in the basket. Family dinner.", "Celular en la canasta. Cena en familia."],
    ["Clips at dinner. Mom took his phone.", "Videos en la cena. Mamá le quitó el celular."],
    ["Phone buzzed. Mom: “Basket. Now.”", "Vibró el celular. Mamá: “A la canasta. Ya.”"],
    ["Nobody awake", "Nadie despierto"], ["Mom's asleep. Friends are offline.", "Mamá está dormida. Los amigos están desconectados."],
    ["📵 Mom has his phone.", "📵 Mamá tiene su celular."], ["No phone tonight. Slept fine.", "Sin celular esta noche. Durmió bien."],

    // Tuesday
    ["Tuesday", "Martes"], ["Shift Day", "Día de turno"], ["Jay's $90 car insurance is due Friday.", "Jay tiene que pagar $90 del seguro del carro el viernes."],
    ["New Rift season drops at 7!", "¡La nueva temporada de Rift sale a las 7!"], ["▶ Run Tuesday", "▶ Jugar el martes"],
    ["<b>Workplace</b>: a job teaches its own rules, like “phones in back.”", "<b>Trabajo</b>: un empleo enseña sus propias reglas, como “celulares atrás”."],
    ["Rosa, Big Slice manager", "Rosa, gerente de Big Slice"], ["“Cover 5–9? Phones stay in back.”", "“¿Cubres de 5 a 9? Los celulares se quedan atrás.”"],
    ["cuts hours", "quita horas"], ["trained him", "lo entrenó"], ["4 hours", "4 horas"],
    ["Clean shift. $60 for insurance.", "Buen turno. $60 para el seguro."],
    ["Watched clips on shift. Sent home.", "Vio videos en el turno. Lo mandaron a casa."],
    ["Phone buzzed at the counter. Written up.", "Vibró el celular en el mostrador. Le hicieron un reporte."],
    ["Parking lot", "Estacionamiento"], ["Shift's over. The squad's offline.", "Se acabó el turno. El equipo está desconectado."],

    // Wednesday
    ["Wednesday", "Miércoles"], ["Slide 3", "Diapositiva 3"], ["Group presents at 8:05 a.m. Jay owes slide 3.", "El grupo presenta a las 8:05 a. m. Jay debe la diapositiva 3."],
    ["Wednesdays are slow. Fix it.", "Los miércoles son lentos. Arréglalo."], ["▶ Run Wednesday", "▶ Jugar el miércoles"],
    ["<b>Hidden curriculum</b>: unspoken school lessons, like being on time.", "<b>Currículo oculto</b>: lecciones que la escuela no dice, como llegar a tiempo."],
    ["Nia, group partner", "Nia, compañera de grupo"], ["“did u finish slide 3?? 😬”", "“¿¿terminaste la diapositiva 3?? 😬”"],
    ["counting on him", "cuenta con él"], ["grade", "nota"], ["his group", "su grupo"],
    ["Slide 3 done by 6.", "Diapositiva 3 lista a las 6."],
    ["Clips instead. Slide 3 still blank.", "Videos en vez de tarea. La diapositiva 3 sigue vacía."],
    ["Ignored the alert. Finished slide 3.", "Ignoró la alerta. Terminó la diapositiva 3."],
    ["Everyone's asleep.", "Todos están dormidos."],
    ["Ms. Harlan, teacher", "Sra. Harlan, maestra"], ["“Late groups lose their slot.”", "“Los grupos que llegan tarde pierden su turno.”"],
    ["Up late finishing slide 3. Made it.", "Despierto tarde terminando la diapositiva 3. Lo logró."],
    ["Slide 3 blank. Group presented without him.", "Diapositiva 3 vacía. El grupo presentó sin él."],
    ["Alerts buzzed. Finished slide 3 at 1 a.m.", "Sonaban las alertas. Terminó la diapositiva 3 a la 1 a. m."],

    // Sunday
    ["Sunday", "Domingo"], ["Pancake Morning", "Mañana de panqueques"],
    ["Grandma's church pancake breakfast.", "Desayuno de panqueques en la iglesia de la abuela."],
    ["Rift finals stream at 10. Make Sunday ours.", "La final de Rift es a las 10. Haz que el domingo sea nuestro."], ["▶ Run Sunday", "▶ Jugar el domingo"],
    ["<b>Religion</b> teaches values. <b>Cultural capital</b>: know-how and connections for work.", "La <b>religión</b> enseña valores. <b>Capital cultural</b>: saber hacer y contactos para el trabajo."],
    ["Real Iowa: Cedar Rapids' Mother Mosque of America (built 1934) is often called the oldest standing U.S. mosque.", "Iowa real: la Mother Mosque of America de Cedar Rapids (construida en 1934) se considera a menudo la mezquita en pie más antigua de EE. UU."],
    ["Grandma", "Abuela"], ["“Pancakes at 8. Wear a clean shirt.”", "“Panqueques a las 8. Ponte una camisa limpia.”"],
    ["since age 9", "desde los 9"], ["every year", "cada año"], ["church family", "familia de la iglesia"],
    ["Flipped 200 pancakes. Mr. Ortiz noticed.", "Volteó 200 panqueques. El Sr. Ortiz se fijó en él."],
    ["Skipped Grandma. She cried.", "Dejó plantada a la abuela. Ella lloró."],
    ["Grandma: “Phone away at the griddle.”", "Abuela: “Guarda el celular en la plancha.”"],
    ["Marcus, best friend", "Marcus, mejor amigo"], ["“pickup at the Y. u coming?”", "“partido en el Y. ¿vienes?”"],
    ["fun", "diversión"], ["left out", "excluido"],
    ["Pickup game with Marcus.", "Partido con Marcus."],
    ["Watched the Rift finals. Marcus: “k.”", "Vio la final de Rift. Marcus: “ok.”"],
    ["Ignored the alerts. Played with Marcus.", "Ignoró las alertas. Jugó con Marcus."],

    // Dex lines
    ["MUTED?! Fix this.", "¡¿SILENCIADO?! Arréglalo."], ["MUTED?! Unbelievable.", "¡¿SILENCIADO?! Increíble."],
    ["Numbers up. More tomorrow.", "Los números suben. Más mañana."], ["We lost every slot?!", "¡¿Perdimos todo?!"],
    ["Crack this file.", "Descifra este archivo."],
    ["Autoplay for 8-year-olds. Nobody checks age.", "Reproducción automática para niños de 8. Nadie revisa la edad."],
    ["Report. On my desk.", "El reporte. En mi escritorio."],

    // ---------- Life course + Mia ----------
    ["Dex Wants New Users", "Dex quiere nuevos usuarios"], ["Who pulls hardest at each age?", "¿Quién jala más fuerte en cada edad?"],
    ["Mia, 8", "Mia, 8 años"], ["Jay's sister", "hermana de Jay"], ["Jay, 16", "Jay, 16 años"], ["Your user", "Tu usuario"],
    ["Andre, 24", "Andre, 24 años"], ["Jay's cousin", "primo de Jay"],
    ["Mom's rules", "Reglas de mamá"], ["Friends", "Amigos"], ["Warehouse night shift", "Turno de noche en un almacén"], ["Raising a 2-year-old", "Cría a una niña de 2 años"],
    ["Real: most social apps require age 13+.", "Real: la mayoría de las redes sociales piden 13 años o más."],
    ["Build it", "Hazlo"], ["Dex is the boss.", "Dex es el jefe."], ["Push back", "Di que no"], ["“She's 8. Not our user.”", "“Tiene 8 años. No es nuestra usuaria.”"],
    ["Secret timer", "Temporizador secreto"], ["20 minutes, then it stops.", "20 minutos y se apaga."],
    ["Mom found it. She deleted ClipLoop.", "Mamá lo descubrió. Borró ClipLoop."], ["Dex cut your bonus.", "Dex te quitó el bono."],
    ["Mia watched 20 minutes. Dex found the timer.", "Mia vio 20 minutos. Dex encontró el temporizador."],
    ["Mom deleted us?!", "¡¿Mamá nos borró?!"], ["No bonus for you.", "No hay bono para ti."], ["Who added this timer?!", "¡¿Quién puso este temporizador?!"],
    ["Built Mia's autoplay", "Hiciste el autoplay para Mia"], ["Refused Mia's autoplay", "Rechazaste el autoplay para Mia"], ["Snuck in a 20-min timer", "Metiste un temporizador de 20 min"],
    ["<b>Life course</b>: the strongest agent changes as you grow up.", "<b>Curso de vida</b>: el agente más fuerte cambia a medida que creces."],

    // ---------- Checks ----------
    ["Data Desk", "Escritorio de datos"],
    ["Tuesday", "Martes"], ["Dex's next file", "El próximo archivo de Dex"], ["Wednesday", "Miércoles"], ["Sunday", "Domingo"], ["Your report", "Tu reporte"],
    ["Why did friends win?", "¿Por qué ganaron los amigos?"],
    ["Real research · 1950s", "Investigación real · años 1950"],
    ["Boys at Midwest high schools: “Remember me as…”", "Chicos de escuelas secundarias del Medio Oeste: “Recuérdenme como…”"],
    ["🏈 Star athlete", "🏈 Atleta estrella"], ["📚 Brilliant student", "📚 Estudiante brillante"], ["over 40%", "más del 40%"], ["under 30%", "menos del 30%"],
    ["Source: James Coleman, The Adolescent Society (1961), summarized by Education Next.", "Fuente: James Coleman, The Adolescent Society (1961), resumido por Education Next."],
    ["What does this show?", "¿Qué muestra esto?"],
    ["Teens set their own rules for who's cool", "Los jóvenes ponen sus propias reglas de quién es cool"],
    ["Teens mostly want what their teachers want", "Los jóvenes quieren sobre todo lo que quieren sus maestros"],
    ["Teens mostly copy what their parents want", "Los jóvenes copian sobre todo lo que quieren sus padres"],
    ["Teens don't care what other people think", "A los jóvenes no les importa lo que piensan los demás"],
    ["Compare the two bars.", "Compara las dos barras."], ["Peers set what's cool, not adults.", "Los compañeros deciden qué es cool, no los adultos."],

    ["Why did we lose to a pizza place?", "¿Por qué perdimos contra una pizzería?"],
    ["📌 PHONES STAY IN THE BACK ON SHIFT", "📌 LOS CELULARES SE QUEDAN ATRÁS DURANTE EL TURNO"],
    ["Why does Rosa beat the feed?", "¿Por qué Rosa le gana al feed?"],
    ["She has a reward and a punishment", "Ella tiene un premio y un castigo"],
    ["The feed ran out of new videos", "Al feed se le acabaron los videos nuevos"],
    ["She's his best friend at school", "Es su mejor amiga de la escuela"],
    ["His mom made him take the shift", "Su mamá lo obligó a tomar el turno"],
    ["Look at Rosa's 🎁 and ⚠️.", "Mira el 🎁 y el ⚠️ de Rosa."], ["Pay (🎁) and cutting hours (⚠️) pull hard.", "El pago (🎁) y quitar horas (⚠️) jalan fuerte."],

    ["Why chase teens?", "¿Por qué buscar a los adolescentes?"],
    ["Real survey · Pew · 2024", "Encuesta real · Pew · 2024"],
    ["“Nearly half of teens say they are online almost constantly, up from 24% a decade ago.”", "“Casi la mitad de los adolescentes dicen que están en línea casi todo el tiempo, más que el 24% de hace diez años.”"],
    ["9 in 10", "9 de cada 10"], ["6 in 10", "6 de cada 10"],
    ["Source: Pew Research Center, “Teens, Social Media and Technology 2024” (Dec. 12, 2024). 1,391 U.S. teens.", "Fuente: Pew Research Center, “Teens, Social Media and Technology 2024” (12 de dic. de 2024). 1,391 adolescentes de EE. UU."],
    ["What does Pew show?", "¿Qué muestra Pew?"],
    ["It gets more teen time than 10 years ago", "Tienen más tiempo de los jóvenes que hace 10 años"],
    ["It gets less teen time than 10 years ago", "Tienen menos tiempo de los jóvenes que hace 10 años"],
    ["Teens have mostly quit using it", "Los jóvenes casi lo dejaron de usar"],
    ["It mostly reaches adults, not teens", "Llegan sobre todo a adultos, no a jóvenes"],
    ["Compare “nearly half” with 24%.", "Compara “casi la mitad” con el 24%."], ["More time online, more pull.", "Más tiempo en línea, más influencia."],

    ["Found in Jay's backpack", "Encontrado en la mochila de Jay"],
    ["Presentations start at the bell. Late groups lose their slot. Your group counts on you!", "Las presentaciones empiezan con el timbre. Los grupos que llegan tarde pierden su turno. ¡Tu grupo cuenta contigo!"],
    ["— Ms. Harlan", "— Sra. Harlan"],
    ["Which lesson is hidden curriculum?", "¿Qué lección es currículo oculto?"],
    ["Be on time; don't let others down", "Llega a tiempo; no les falles a los demás"],
    ["The history facts on slide 3", "Los datos de historia de la diapositiva 3"],
    ["How to make good-looking slides", "Cómo hacer diapositivas bonitas"],
    ["The topic of each slideshow", "El tema de cada presentación"], ["Pull key", "Clave de fuerzas"],
    ["Hidden = a habit, not a subject.", "Oculto = un hábito, no una materia."], ["A habit, not a subject.", "Un hábito, no una materia."],

    ["New text on Jay's phone", "Mensaje nuevo en el celular de Jay"],
    ["💬 Mr. Ortiz · Grandma's church", "💬 Sr. Ortiz · iglesia de la abuela"],
    ["You're great with people, Jay. Want me as a job reference?", "Eres muy bueno con la gente, Jay. ¿Quieres que sea tu referencia para un trabajo?"],
    ["Which idea is this?", "¿Qué idea es esta?"],
    ["Cultural capital: skills and connections for work", "Capital cultural: habilidades y contactos para el trabajo"],
    ["Hidden curriculum: habits school teaches", "Currículo oculto: hábitos que enseña la escuela"],
    ["Peer group: friends who decide what's cool", "Grupo de compañeros: amigos que deciden qué es cool"],
    ["Mass media: apps that show what's normal", "Medios masivos: apps que muestran qué es normal"],
    ["Look at what Ortiz says and offers.", "Mira lo que Ortiz dice y ofrece."], ["Church gave Jay people skills and a job connection.", "La iglesia le dio a Jay trato con la gente y un contacto de trabajo."],

    ["Dex: “Fine. Try Andre.”", "Dex: “Bueno. Prueba con Andre.”"],
    ["Who pulls hardest on Andre at 24?", "¿Quién jala más fuerte a Andre a los 24?"],
    ["His job and the family he's raising", "Su trabajo y la familia que está criando"],
    ["His old high school friends", "Sus viejos amigos de la secundaria"],
    ["His old high school teachers", "Sus viejos maestros de la secundaria"],
    ["ClipLoop's alerts at midnight", "Las alertas de ClipLoop a medianoche"],
    ["Count the pips on Andre's card.", "Cuenta los íconos en la tarjeta de Andre."], ["At 24, work and his own family fill his time.", "A los 24, el trabajo y su propia familia llenan su tiempo."],

    // ---------- Endings ----------
    ["Muted", "Silenciado"], ["Jay turned off ClipLoop alerts. You kept pushing where the feed couldn't win.", "Jay apagó las alertas de ClipLoop. Seguiste empujando donde el feed no podía ganar."], ["You lost our user.", "Perdiste a nuestro usuario."],
    ["Big Numbers, Wrecked Kid", "Grandes números, chico destruido"], ["Dex loves your numbers. Jay is exhausted, behind, and in trouble. The feed won hours, not his life.", "A Dex le encantan tus números. Jay está agotado, atrasado y en problemas. El feed ganó horas, no su vida."], ["Best numbers ever!", "¡Los mejores números de la historia!"],
    ["Benched", "En la banca"], ["Dex moves you to the help desk. Your pushes missed the times nobody else pulled.", "Dex te manda a atención al cliente. Tus alertas no usaron los momentos en que nadie más jalaba."], ["Help desk. Monday.", "Atención al cliente. El lunes."],
    ["Smart Feed", "Feed inteligente"], ["You hit Dex's goal without wrecking Jay. The feed wins late at night, or by riding what friends want.", "Llegaste a la meta de Dex sin destruir a Jay. El feed gana tarde en la noche o subiéndose a lo que quieren los amigos."], ["…Fine. Good work.", "…Bueno. Buen trabajo."],
    ["Caused by:", "Causado por:"], ["1 of 4 endings.", "1 de 4 finales."], ["No pushes all week.", "Ninguna alerta en toda la semana."],
    ["Write your report to Dex →", "Escribe tu reporte para Dex →"],

    // ---------- Report ----------
    ["ClipLoop · For You team", "ClipLoop · Equipo Para Ti"], ["Your report to Dex", "Tu reporte para Dex"], ["1–2 sentences each.", "1–2 oraciones cada una."],
    ["1. Which agent beat the feed? Why?", "1. ¿Qué agente le ganó al feed? ¿Por qué?"],
    ["On ___, ___ beat the feed because ___.", "El ___, ___ le ganó al feed porque ___."],
    ["2. Who shapes teens most today? Use Coleman or Pew.", "2. ¿Quién forma más a los adolescentes hoy? Usa a Coleman o a Pew."],
    ["___ shapes teens the most because ___. But ___ pushes back when ___.", "___ forma más a los adolescentes porque ___. Pero ___ jala en contra cuando ___."],
    ["A round where two agents clashed", "Un momento en que dos agentes chocaron"], ["Which agent shapes teens most", "Qué agente forma más a los adolescentes"],
    ["In answer 1, name who beat the feed (like Mom, Rosa, or Grandma), say why with “because,” and name the pull (time, trust, a reward, or a punishment).",
     "En la respuesta 1, di quién le ganó al feed (como mamá, Rosa o la abuela), explica por qué con “porque” y nombra la fuerza (tiempo, confianza, un premio o un castigo)."],
    ["In answer 2, name an agent AND use evidence (Coleman, the Pew survey, or Jay's week).", "En la respuesta 2, nombra un agente Y usa evidencia (Coleman, la encuesta de Pew o la semana de Jay)."],
    ["Turned in", "Entregado"], ["Turned in. You're done!", "Entregado. ¡Terminaste!"]
  ];
  const dict = {};
  pairs.forEach(([en, es]) => { dict[en] = es; });
  SiteLang.add({
    dict,
    patterns: [
      { re: /^Welcome back, (.+) — you're on step (\d+) of (\d+)\.$/, es: "¡Hola de nuevo, $1! Vas en el paso $2 de $3." },
      { re: /^(Mon|Tue|Wed|Sun) (.+): ⚡(\d) → (.+) won$/, es: "$1 $2: ⚡$3 → ganó $4", tr: [1, 2, 4] }
    ],
    writing: {
      clash: [
        ["familia", "mama", "abuela", "companero", "amigo", "chat", "marcus", "escuela", "maestra", "harlan", "nia", "religion", "iglesia", "fe", "trabajo", "empleo", "rosa", "jefe", "jefa", "gerente"],
        ["porque", "ya que", "asi que", "por eso", "razon"],
        ["tiempo", "confianza", "premio", "recompensa", "castigo", "dinero", "pago", "hora", "divers", "burla", "nota", "tarde", "noche", "celular", "telefono", "tradicion", "lugar", "cool", "grupo"]
      ],
      most: [
        ["familia", "padre", "mama", "abuela", "companero", "amigo", "escuela", "maestr", "medios", "redes", "celular", "telefono", "aplicacion", "app", "internet", "en linea", "religion", "iglesia", "fe", "trabajo", "empleo"],
        ["coleman", "atleta", "pew", "encuesta", "constantemente", "todo el tiempo", "mitad", "por ciento", "de cada 10", "youtube", "jay", "volt", "tenis", "turno", "diapositiva", "noche", "panqueque", "rosa", "abuela", "mia", "andre"]
      ]
    }
  });
})();
