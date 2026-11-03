// Spanish for "Power Grab: The Missing Constitution" (Government Unit 1, Day 7). Loaded after ../../shared/lang.js.
// game.js keeps running in English; these entries swap what shows on screen. Keys are the exact English strings.
(function () {
  const dict = {};
  const add = pairs => pairs.forEach(([en, es]) => { dict[en] = es; });

  // ---------- Page frame, HUD, title, how-to ----------
  add([
    ["POWER GRAB", "GOLPE DE PODER"],
    ["THE MISSING CONSTITUTION", "LA CONSTITUCIÓN DESAPARECIDA"],
    ["Progress saves on this device.", "Tu progreso se guarda en esta computadora."],
    ["↻ Start over", "↻ Empezar de nuevo"],
    ["YOU", "TÚ"],
    ["Hale's power", "Poder de Hale"],
    ["Rules broken:", "Reglas rotas:"],
    ["📜 Constitution:", "📜 Constitución:"],
    ["Unstoppable", "Imparable"], ["Smug", "Creído"], ["Annoyed", "Molesto"], ["Sweating", "Sudando"],
    ["Government · Unit 1 · Day 7", "Gobierno · Unidad 1 · Día 7"],
    ["The Missing Constitution", "La Constitución desaparecida"],
    ["Someone stole the Constitution.", "Alguien robó la Constitución."],
    ["No rulebook? Now I make the rules.", "¿No hay reglamento? Ahora yo pongo las reglas."],
    ["GOV. HALE", "GOB. HALE"],
    ["Rule cards", "Cartas de reglas"],
    ["25 min", "25 min"],
    ["7 showdowns", "7 duelos"],
    ["Goal: Show how the Constitution's ideas work together to stop power grabs.", "Meta: Mostrar cómo las ideas de la Constitución trabajan juntas para frenar los golpes de poder."],
    ["START ▶", "EMPEZAR ▶"],
    ["Hale and this story are made up. The rules and cases are real.", "Hale y esta historia son inventados. Las reglas y los casos son reales."],
    ["The words We the People on the original U.S. Constitution", "Las palabras We the People (Nosotros el Pueblo) en la Constitución original de EE. UU."],
    ["U.S. Constitution, 1787 · National Archives (public domain)", "Constitución de EE. UU., 1787 · Archivos Nacionales (dominio público)"],
    ["MISSING", "DESAPARECIDA"],
    ["How a showdown works", "Cómo funciona un duelo"],
    ["Read the evidence", "Lee la evidencia"],
    ["Play the card that fits", "Juega la carta que encaja"], ["Wrong card = burned", "Carta equivocada = quemada"],
    ["Shortcuts break the rules", "Los atajos rompen las reglas"], ["Twice = YOU're the villain", "Dos veces = TÚ eres el villano"],
    ["Your hand: 8 rule cards", "Tu mano: 8 cartas de reglas"],
    ["Deal my cards ▶", "Repartir mis cartas ▶"]
  ]);

  // ---------- Cards and Constitution pieces ----------
  add([
    ["Lawmakers Vote", "Votan los legisladores"], ["Lawmakers cancel, override, or investigate.", "Los legisladores cancelan, anulan o investigan."],
    ["Court Ruling", "Fallo del tribunal"], ["A judge strikes it down.", "Un juez lo anula."],
    ["Court Order", "Orden judicial"], ["A judge forces him to obey.", "Un juez lo obliga a obedecer."],
    ["Not Your Job", "No es tu trabajo"], ["Each branch has its own job.", "Cada rama tiene su propio trabajo."],
    ["Not in the Rulebook", "No está en el reglamento"], ["The Constitution limits what leaders can do.", "La Constitución limita lo que los líderes pueden hacer."],
    ["Supremacy Clause", "Cláusula de Supremacía"], ["Valid national law beats state law.", "Una ley nacional válida le gana a una ley estatal."],
    ["States' Power", "Poder de los estados"], ["Some powers belong to the states.", "Algunos poderes son de los estados."],
    ["We the People", "Nosotros el Pueblo"], ["Voters hold the power.", "Los votantes tienen el poder."],
    ["Popular Sovereignty", "Soberanía popular"], ["Limited Government", "Gobierno limitado"], ["Rule of Law", "Estado de derecho"],
    ["Separation of Powers", "Separación de poderes"], ["Checks and Balances", "Pesos y contrapesos"], ["Federalism", "Federalismo"], ["Amendments", "Enmiendas"],
    ["USED", "USADA"], ["BURNED", "QUEMADA"]
  ]);

  // ---------- Play screen ----------
  add([
    ["BREAKING", "ÚLTIMA HORA"],
    ["Your hand", "Tu mano"],
    ["Tap a card first", "Primero toca una carta"],
    ["Play this card ▶", "Jugar esta carta ▶"],
    ["Fast, but breaks the rules.", "Rápido, pero rompe las reglas."],
    ["Let it slide", "Dejarlo pasar"],
    ["Hale gets much stronger.", "Hale se vuelve mucho más fuerte."],
    ["burned.", "quemada."],
    ["That card doesn't fit. Reread the evidence.", "Esa carta no encaja. Vuelve a leer la evidencia."],
    ["None of your cards fit this. Too bad!", "Ninguna de tus cartas encaja. ¡Qué pena!"]
  ]);

  // ---------- Result screen ----------
  add([
    ["BLOCKED!", "¡BLOQUEADO!"], ["SLOWED HIM", "LO FRENASTE"], ["RULE BROKEN", "REGLA ROTA"], ["HALE WINS", "GANA HALE"], ["RULES KEPT", "REGLAS CUMPLIDAS"],
    ["VS", "VS"],
    ["Ha! Now you break rules too.", "¡Ja! Ahora tú también rompes reglas."],
    ["Nobody stopped me. Love it.", "Nadie me detuvo. Me encanta."],
    ["Piece restored:", "Pieza recuperada:"],
    ["Hale's lawyer objects ▶", "El abogado de Hale protesta ▶"],
    ["Next showdown ▶", "Siguiente duelo ▶"],
    ["See how it ends ▶", "Ver cómo termina ▶"]
  ]);

  // ---------- Courtroom ----------
  add([
    ["COURTROOM", "TRIBUNAL"], ["Evidence check", "Prueba de evidencia"],
    ["HALE'S LAWYER", "ABOGADO DE HALE"], ["JUDGE", "JUEZA"], ["OVERRULED", "DENEGADA"],
    ["Open the case ▶", "Abrir el caso ▶"]
  ]);

  // ---------- Reward ----------
  add([
    ["The Constitution is back!", "¡La Constitución volvió!"],
    ["You found it in one day.", "La encontraste en un día."],
    ["It took three months, but you found it.", "Tardó tres meses, pero la encontraste."],
    ["Bonus: take back ONE used card.", "Premio: recupera UNA carta usada."],
    ["Hale has 3 moves left. Which will you need?", "A Hale le quedan 3 jugadas. ¿Cuál vas a necesitar?"],
    ["FOUND", "ENCONTRADA"],
    ["Take it back ▶", "Recuperarla ▶"]
  ]);

  // ---------- Ending ----------
  add([
    ["THE CEDAR VALLEY GAZETTE", "LA GACETA DE CEDAR VALLEY"],
    ["Made-up newspaper · Final edition", "Periódico inventado · Edición final"],
    ["Your ending", "Tu final"],
    ["Balance Restored", "Equilibrio restaurado"], ["BALANCE RESTORED", "EQUILIBRIO RESTAURADO"],
    ["Every branch did its job. Hale can't rule alone.", "Cada rama hizo su trabajo. Hale no puede gobernar solo."],
    ["Close Call", "Por poco"], ["CLOSE CALL", "POR POCO"],
    ["Hale got checked, barely. Some gaps stayed open too long.", "A Hale lo frenaron, apenas. Algunos huecos quedaron abiertos demasiado tiempo."],
    ["Hale Takes Over", "Hale toma el control"], ["HALE TAKES OVER", "HALE TOMA EL CONTROL"],
    ["The rules were there. Nobody used them in time.", "Las reglas estaban ahí. Nadie las usó a tiempo."],
    ["You Became Hale", "Te convertiste en Hale"], ["YOU BECAME HALE", "TE CONVERTISTE EN HALE"],
    ["You beat Hale by breaking his rules. Who stops YOU now?", "Le ganaste a Hale rompiendo sus mismas reglas. ¿Quién te detiene a TI ahora?"],
    ["The Constitution was found in one day.", "La Constitución apareció en un día."],
    ["The Constitution was found after three months.", "La Constitución apareció después de tres meses."],
    ["Found, but the thief walked free.", "Apareció, pero el ladrón quedó libre."],
    ["Found at the very end.", "Apareció al final de todo."],
    ["CASE CLOSED", "CASO CERRADO"], ["GAME OVER", "FIN DEL JUEGO"],
    ["Rules broken", "Reglas rotas"], ["Constitution pieces", "Piezas de la Constitución"],
    ["Caused by:", "Causado por:"],
    ["best move", "mejor jugada"], ["slow", "lento"], ["broke the rules", "rompiste las reglas"], ["Hale won", "ganó Hale"],
    ["1 burned card", "1 carta quemada"],
    ["<b>The Constitution only works when people use it.</b>", "<b>La Constitución solo funciona cuando la gente la usa.</b>"],
    ["Last step: your case file ▶", "Último paso: tu expediente ▶"]
  ]);

  // ---------- Case file (writing + turn in) ----------
  add([
    ["CASE FILE · STATE v. HALE", "EXPEDIENTE · EL ESTADO contra HALE"],
    ["File your report", "Entrega tu informe"],
    ["🎤 Your closing argument", "🎤 Tu argumento final"],
    ["Two principles", "Dos principios"],
    ["Pick two ideas from your cards. How did they work together to balance power? Use one game moment.", "Elige dos ideas de tus cartas. ¿Cómo trabajaron juntas para equilibrar el poder? Usa un momento del juego."],
    ["___ and ___ balanced power because… In the game, …", "___ y ___ equilibraron el poder porque… En el juego, …"],
    ["Name at least one idea from your cards, like checks and balances or federalism.", "Nombra al menos una idea de tus cartas, como los pesos y contrapesos o el federalismo."],
    ["Start:", "Empieza:"],
    ["First name + last initial", "Nombre + inicial del apellido"],
    ["First name + last initial (like Jordan M.)", "Nombre + inicial del apellido (como Jordan M.)"],
    ["Turn in", "Entregar"], ["Turn in again", "Entregar otra vez"],
    ["Sending your work…", "Enviando tu trabajo…"],
    ["✓ Turned in! Your teacher can see your work. You're done.", "✓ ¡Entregado! Tu profesor puede ver tu trabajo. Terminaste."],
    ["✓ Turned in. You can fix your writing and turn it in again.", "✓ Entregado. Puedes mejorar lo que escribiste y entregarlo otra vez."],
    ["Turned in. You can fix your writing and turn it in again.", "Entregado. Puedes mejorar lo que escribiste y entregarlo otra vez."],
    ["Type your first name and last initial, like Jordan M.", "Escribe tu nombre y la inicial de tu apellido, como Jordan M."],
    ["Could not turn in. Try again.", "No se pudo entregar. Intenta otra vez."],
    ["Your work did not save. Try again.", "Tu trabajo no se guardó. Intenta otra vez."],
    ["Start over? This clears your work on this device.", "¿Empezar de nuevo? Esto borra tu trabajo en esta computadora."],
    ["Write it as full sentences: what happened in the game, and why it worked.", "Escríbelo en oraciones completas: qué pasó en el juego y por qué funcionó."],
    ["FILED", "ARCHIVADO"]
  ]);

  // ---------- Showdown 1: the storm ----------
  add([
    ["Storm emergency", "Emergencia por la tormenta"],
    ["The Endless Storm", "La tormenta sin fin"],
    ["A derecho (giant windstorm) wrecks Marion. Hale declares an emergency.", "Un derecho (tormenta de viento gigante) destroza Marion. Hale declara una emergencia."],
    ["Day 31. It ends when I say.", "Día 31. Termina cuando yo diga."],
    ["Evidence · Iowa law (real)", "Evidencia · Ley de Iowa (real)"],
    ["An emergency <b>ends after 30 days</b> unless the governor renews it. <b>Lawmakers can cancel it.</b>", "Una emergencia <b>termina después de 30 días</b> a menos que el gobernador la renueve. <b>Los legisladores pueden cancelarla.</b>"],
    ["Source: Iowa Code §29C.6 (Iowa used it after the real 2020 derecho)", "Fuente: Código de Iowa §29C.6 (Iowa lo usó después del derecho real de 2020)"],
    ["Emergency canceled", "Emergencia cancelada"],
    ["Lawmakers vote. Hale's extra powers end that day.", "Los legisladores votan. Los poderes extra de Hale terminan ese día."],
    ["They can DO that?", "¿Pueden HACER eso?"],
    ["<b>Checks and balances</b>: lawmakers can limit the governor.", "<b>Pesos y contrapesos</b>: los legisladores pueden limitar al gobernador."],
    ["Slow court fight", "Pelea lenta en el tribunal"],
    ["A judge ends it, but only after two months.", "Un juez la termina, pero solo después de dos meses."],
    ["Two months? I'll take it.", "¿Dos meses? Me sirve."],
    ["<b>Checks and balances</b>: courts can check him, but slowly.", "<b>Pesos y contrapesos</b>: los tribunales pueden frenarlo, pero despacio."],
    ["Wait for election day", "Esperar el día de elecciones"],
    ["The next election is two years away. He keeps his powers.", "La próxima elección es en dos años. Él mantiene sus poderes."],
    ["See you in two years.", "Nos vemos en dos años."],
    ["<b>Popular sovereignty</b>: voters rule, but only at election time.", "<b>Soberanía popular</b>: los votantes mandan, pero solo en las elecciones."],
    ["No one's hiding evidence. Who can cancel this?", "Nadie esconde evidencia. ¿Quién puede cancelar esto?"],
    ["He's not making laws. Who can cancel this?", "No está haciendo leyes. ¿Quién puede cancelar esto?"],
    ["Iowa law allows emergencies. Who can cancel this one?", "La ley de Iowa permite emergencias. ¿Quién puede cancelar esta?"],
    ["No national law is involved here.", "Aquí no hay ninguna ley nacional."],
    ["Emergencies are a state power. That helps Hale.", "Las emergencias son un poder del estado. Eso ayuda a Hale."],
    ["Send in the Guard", "Mandar a la Guardia"],
    ["Troops drag Hale out", "Las tropas sacan a Hale a la fuerza"],
    ["It lasts one day. A judge puts Hale back.", "Dura un día. Un juez devuelve a Hale a su puesto."],
    ["That broke the <b>rule of law</b>. Even stopping him must be legal.", "Eso rompió el <b>estado de derecho</b>. Hasta para detenerlo hay que seguir la ley."],
    ["Emergency rolls on", "La emergencia sigue"],
    ["Day 60. Day 90. Hale still rules by emergency.", "Día 60. Día 90. Hale sigue gobernando por emergencia."],
    ["Power nobody checks keeps growing.", "El poder que nadie frena sigue creciendo."]
  ]);

  // ---------- Showdown 2: phone searches ----------
  add([
    ["Phone searches", "Revisión de teléfonos"],
    ["Checkpoints", "Retenes"],
    ["Hale orders police to search every phone for the thief. <b>No warrants.</b>", "Hale ordena a la policía revisar cada teléfono para buscar al ladrón. <b>Sin órdenes de un juez.</b>"],
    ["Nothing to hide? Hand it over.", "¿Nada que esconder? Dámelo."],
    ["Evidence · 4th Amendment (real)", "Evidencia · 4.ª Enmienda (real)"],
    ["The 4th Amendment bans <b>unreasonable searches</b>. Real case: phone searches need a <b>warrant</b> (a judge's OK).", "La 4.ª Enmienda prohíbe los <b>registros sin razón</b>. Caso real: revisar un teléfono necesita una <b>orden</b> (el permiso de un juez)."],
    ["Source: U.S. Constitution, 4th Amendment; Riley v. California (2014)", "Fuente: Constitución de EE. UU., 4.ª Enmienda; Riley v. California (2014)"],
    ["Rights win", "Ganan los derechos"],
    ["Police drop the phone searches and get warrants again.", "La policía deja de revisar teléfonos y vuelve a pedir órdenes."],
    ["Fine. Keep your precious phones.", "Bueno. Quédense con sus queridos teléfonos."],
    ["<b>Limited government</b>: the Constitution limits what leaders can do to you.", "<b>Gobierno limitado</b>: la Constitución limita lo que los líderes te pueden hacer."],
    ["A judge stops it", "Un juez lo detiene"],
    ["It stops after a week. Hundreds of phones already searched.", "Se detiene después de una semana. Ya revisaron cientos de teléfonos."],
    ["A week of phones. Worth it.", "Una semana de teléfonos. Valió la pena."],
    ["<b>Checks and balances</b>: courts can stop an unconstitutional order.", "<b>Pesos y contrapesos</b>: los tribunales pueden detener una orden inconstitucional."],
    ["Hale would veto it. Phones get searched today.", "Hale la vetaría. Hoy revisan los teléfonos."],
    ["Nothing to hand over. The searches are the problem.", "No hay nada que entregar. El problema son los registros."],
    ["Police work IS his branch's job. It's about your rights.", "El trabajo de la policía SÍ es de su rama. Esto es sobre tus derechos."],
    ["States run police, but the Constitution still limits them.", "Los estados dirigen la policía, pero la Constitución igual los limita."],
    ["The election is too far off.", "La elección está muy lejos."],
    ["Raid Hale's office", "Registrar la oficina de Hale"],
    ["You raid his office", "Registras su oficina"],
    ["You find nothing. Hale: “See? They ignore warrants too.”", "No encuentras nada. Hale: “¿Ven? Ellos también ignoran las órdenes.”"],
    ["That broke the <b>4th Amendment</b>, the same rule Hale broke.", "Eso rompió la <b>4.ª Enmienda</b>, la misma regla que rompió Hale."],
    ["Checkpoints all month", "Retenes todo el mes"],
    ["Every car stopped. Even kids' phones get searched.", "Paran cada carro. Hasta revisan los teléfonos de los chicos."],
    ["Rights only work if someone defends them.", "Los derechos solo funcionan si alguien los defiende."]
  ]);

  // ---------- Showdown 3: the tax ----------
  add([
    ["The $500 tax", "El impuesto de $500"],
    ["One-Man Lawmaker", "Legislador de un solo hombre"],
    ["Hale sends lawmakers home. His new law: <b>a $500 storm tax per home.</b>", "Hale manda a los legisladores a casa. Su nueva ley: <b>un impuesto de $500 por tormenta a cada casa.</b>"],
    ["I make AND enforce the law.", "Yo hago Y hago cumplir la ley."],
    ["My emergency never ended. I'm stronger now.", "Mi emergencia nunca terminó. Ahora soy más fuerte."],
    ["Evidence · Separation of powers (real)", "Evidencia · Separación de poderes (real)"],
    ["<b>Legislative</b> makes laws. <b>Executive</b> carries them out. <b>Judicial</b> decides what they mean.", "La <b>legislativa</b> hace las leyes. La <b>ejecutiva</b> las aplica. La <b>judicial</b> decide qué significan."],
    ["Source: U.S. Constitution, Articles I–III; Iowa Constitution, Article III", "Fuente: Constitución de EE. UU., Artículos I–III; Constitución de Iowa, Artículo III"],
    ["Not your job", "No es tu trabajo"],
    ["Making laws is the legislature's job. The tax dies.", "Hacer leyes es trabajo de la legislatura. El impuesto muere."],
    ["Fine. No tax.", "Bueno. Sin impuesto."],
    ["<b>Separation of powers</b>: one branch makes laws, another carries them out.", "<b>Separación de poderes</b>: una rama hace las leyes y otra las aplica."],
    ["Not in the rulebook", "No está en el reglamento"],
    ["Hale backs off, but plans a “storm fee” instead.", "Hale se echa para atrás, pero planea una “cuota por tormenta”."],
    ["Call it a fee, then.", "Entonces llámalo cuota."],
    ["<b>Limited government</b>: leaders only get powers the Constitution gives.", "<b>Gobierno limitado</b>: los líderes solo tienen los poderes que da la Constitución."],
    ["Thrown out, too late", "Anulado, pero tarde"],
    ["A judge kills the tax a month later. Some families already paid.", "Un juez anula el impuesto un mes después. Algunas familias ya pagaron."],
    ["I already cashed some checks.", "Ya cobré algunos cheques."],
    ["<b>Checks and balances</b>: courts can strike down unconstitutional laws.", "<b>Pesos y contrapesos</b>: los tribunales pueden anular leyes inconstitucionales."],
    ["Lawmakers got sent home. Whose job is lawmaking?", "Mandaron a los legisladores a casa. ¿De quién es el trabajo de hacer leyes?"],
    ["Nothing hidden here. He took another branch's job.", "Aquí no hay nada escondido. Tomó el trabajo de otra rama."],
    ["States can tax, but governors can't tax alone.", "Los estados pueden cobrar impuestos, pero un gobernador no puede hacerlo solo."],
    ["Lock him out", "Dejarlo afuera"],
    ["Locked out", "Afuera con llave"],
    ["Hale signs the tax from his car anyway.", "Hale firma el impuesto desde su carro de todos modos."],
    ["That broke the <b>rule of law</b>. You can't just lock out a governor.", "Eso rompió el <b>estado de derecho</b>. No puedes dejar afuera a un gobernador así nomás."],
    ["The tax stands", "El impuesto se queda"],
    ["Troopers collect $500 a home.", "Los policías estatales cobran $500 por casa."],
    ["One person making AND enforcing laws is what the Framers feared.", "Una persona que hace Y aplica las leyes es lo que temían los Fundadores."]
  ]);

  // ---------- Showdown 4: the texts ----------
  add([
    ["Hale's texts", "Los mensajes de Hale"],
    ["The Texts", "Los mensajes"],
    ["The thief texted Hale's office. Hale hides his texts.", "El ladrón le escribió a la oficina de Hale. Hale esconde sus mensajes."],
    ["You can't make me.", "No me pueden obligar."],
    ["Evidence · Real case, 1974", "Evidencia · Caso real, 1974"],
    ["President Nixon wouldn't hand over secret tapes. The Supreme Court ruled <b>8–0</b>: hand them over. <b>He resigned 16 days later.</b>", "El presidente Nixon no quería entregar unas grabaciones secretas. La Corte Suprema decidió <b>8–0</b>: entrégalas. <b>Renunció 16 días después.</b>"],
    ["Source: United States v. Nixon (1974)", "Fuente: Estados Unidos contra Nixon (1974)"],
    ["Court order", "Orden judicial"],
    ["Hale must obey. The texts lead to the Constitution in Ankeny.", "Hale tiene que obedecer. Los mensajes llevan a la Constitución en Ankeny."],
    ["This is SO unfair.", "Esto es MUY injusto."],
    ["<b>Rule of law</b>: even the most powerful leader must obey the law.", "<b>Estado de derecho</b>: hasta el líder más poderoso tiene que obedecer la ley."],
    ["Impeachment probe", "Investigación para destituirlo"],
    ["Lawmakers investigate. Three months later, the texts and Constitution turn up.", "Los legisladores investigan. Tres meses después aparecen los mensajes y la Constitución."],
    ["Three months of headlines. Ugh.", "Tres meses de titulares. Uf."],
    ["<b>Checks and balances</b>: lawmakers can investigate and impeach a governor.", "<b>Pesos y contrapesos</b>: los legisladores pueden investigar y acusar a un gobernador."],
    ["No law to strike down. He's hiding texts.", "No hay ley que anular. Está escondiendo mensajes."],
    ["This isn't about lawmaking. He thinks he's above the law.", "Esto no es sobre hacer leyes. Él cree que está por encima de la ley."],
    ["Close. You need someone who can FORCE him.", "Casi. Necesitas a alguien que lo pueda OBLIGAR."],
    ["This isn't state power. He's hiding evidence.", "Esto no es poder del estado. Está escondiendo evidencia."],
    ["Voters can't force him to hand over texts.", "Los votantes no lo pueden obligar a entregar mensajes."],
    ["Hack his phone", "Hackear su teléfono"],
    ["You hack the phone", "Hackeas el teléfono"],
    ["The texts are real, but a judge throws them out.", "Los mensajes son reales, pero un juez los descarta."],
    ["That broke the <b>rule of law</b>. Illegal evidence gets thrown out.", "Eso rompió el <b>estado de derecho</b>. La evidencia ilegal se descarta."],
    ["Texts stay secret", "Los mensajes siguen secretos"],
    ["Hale keeps his texts. The Constitution stays missing.", "Hale se queda con sus mensajes. La Constitución sigue desaparecida."],
    ["If leaders can ignore courts, nobody is equal under law.", "Si los líderes pueden ignorar a los tribunales, nadie es igual ante la ley."]
  ]);

  // ---------- Showdown 5: blocked inspectors ----------
  add([
    ["Blocked inspectors", "Inspectores bloqueados"],
    ["Iowa vs. Washington", "Iowa contra Washington"],
    ["Congress sends storm aid with inspectors. Hale orders troopers to <b>block the inspectors</b>.", "El Congreso manda ayuda por la tormenta con inspectores. Hale ordena a los policías estatales <b>bloquear a los inspectores</b>."],
    ["Our state, our rules.", "Nuestro estado, nuestras reglas."],
    ["Evidence · Article VI (real)", "Evidencia · Artículo VI (real)"],
    ["National laws made under the Constitution are “the <b>supreme Law of the Land</b>.”", "Las leyes nacionales hechas según la Constitución son “la <b>ley suprema del país</b>.”"],
    ["Source: U.S. Constitution, Article VI (1787); McCulloch v. Maryland (1819)", "Fuente: Constitución de EE. UU., Artículo VI (1787); McCulloch contra Maryland (1819)"],
    ["Troopers step aside. Inspectors get in, and homes get fixed.", "Los policías se hacen a un lado. Entran los inspectores y arreglan las casas."],
    ["Washington always wins? Ugh.", "¿Washington siempre gana? Uf."],
    ["<b>Supremacy Clause</b>: valid national laws beat state orders.", "<b>Cláusula de Supremacía</b>: las leyes nacionales válidas le ganan a las órdenes del estado."],
    ["A judge steps in", "Un juez interviene"],
    ["A judge lets inspectors in, after three weeks of tarps.", "Un juez deja entrar a los inspectores, después de tres semanas de lonas en los techos."],
    ["Three weeks. Nice.", "Tres semanas. Genial."],
    ["<b>Checks and balances</b>: courts can make states follow national law.", "<b>Pesos y contrapesos</b>: los tribunales pueden hacer que los estados sigan la ley nacional."],
    ["Iowa lawmakers can't cancel a national law.", "Los legisladores de Iowa no pueden cancelar una ley nacional."],
    ["Nothing hidden here. It's state vs. nation.", "Aquí no hay nada escondido. Es estado contra nación."],
    ["Not a branch fight. It's state vs. nation.", "No es una pelea entre ramas. Es estado contra nación."],
    ["Close. Which card settles state vs. nation?", "Casi. ¿Qué carta resuelve estado contra nación?"],
    ["This national law is valid. In a clash, states lose.", "Esta ley nacional es válida. En un choque, los estados pierden."],
    ["An election won't let inspectors in today.", "Una elección no deja entrar a los inspectores hoy."],
    ["Arrest Hale, no charges", "Arrestar a Hale sin cargos"],
    ["A night in jail", "Una noche en la cárcel"],
    ["Judges free him. Iowans are furious, at you.", "Los jueces lo liberan. La gente de Iowa está furiosa, contigo."],
    ["That broke the <b>rule of law</b>. No jail without a charge.", "Eso rompió el <b>estado de derecho</b>. No hay cárcel sin un cargo."],
    ["Inspectors blocked", "Inspectores bloqueados"],
    ["Inspectors go home. Some storm money vanishes.", "Los inspectores se van. Parte del dinero de la tormenta desaparece."],
    ["If states ignored national laws, those laws would mean nothing.", "Si los estados ignoraran las leyes nacionales, esas leyes no valdrían nada."]
  ]);

  // ---------- Showdown 6: the twist ----------
  add([
    ["The license twist", "El giro de las licencias"],
    ["Plot Twist", "Giro inesperado"],
    ["D.C. wants to set Iowa's driving age. Even Hale is mad.", "Washington quiere decidir la edad para manejar en Iowa. Hasta Hale está enojado."],
    ["Side with ME for once.", "Ponte de MI lado por una vez."],
    ["Evidence · Federalism (real)", "Evidencia · Federalismo (real)"],
    ["<b>Reserved powers</b> belong to states, like <b>driver's licenses</b>. <b>Delegated powers</b> belong to the nation, like war.", "Los <b>poderes reservados</b> son de los estados, como las <b>licencias de manejar</b>. Los <b>poderes delegados</b> son de la nación, como declarar la guerra."],
    ["Source: U.S. Constitution, 10th Amendment", "Fuente: Constitución de EE. UU., 10.ª Enmienda"],
    ["States' power", "Poder de los estados"],
    ["Licenses are Iowa's call. The D.C. plan dies.", "Las licencias las decide Iowa. El plan de Washington muere."],
    ["Ha! The rules protect me too.", "¡Ja! Las reglas también me protegen a mí."],
    ["<b>Federalism</b> limits Washington too. The rules aren't on anyone's team.", "El <b>federalismo</b> también limita a Washington. Las reglas no son de ningún equipo."],
    ["A judge blocks it", "Un juez lo bloquea"],
    ["A judge blocks it after a month. Hale brags nonstop.", "Un juez lo bloquea después de un mes. Hale presume sin parar."],
    ["Told you. Iowa's call.", "Te lo dije. Lo decide Iowa."],
    ["<b>Checks and balances</b>: courts can stop the national government too.", "<b>Pesos y contrapesos</b>: los tribunales también pueden detener al gobierno nacional."],
    ["Supremacy only covers VALID national laws. Licenses belong to states.", "La supremacía solo cubre leyes nacionales VÁLIDAS. Las licencias son de los estados."],
    ["Iowa lawmakers can't cancel a D.C. plan.", "Los legisladores de Iowa no pueden cancelar un plan de Washington."],
    ["Nothing hidden here.", "Aquí no hay nada escondido."],
    ["Not a branch fight. It's nation vs. state.", "No es una pelea entre ramas. Es nación contra estado."],
    ["Close. Which card is about states' powers?", "Casi. ¿Qué carta habla de los poderes de los estados?"],
    ["An election won't stop this today.", "Una elección no detiene esto hoy."],
    ["Arrest the D.C. official", "Arrestar al funcionario de Washington"],
    ["Arrested at the border", "Arrestado en la frontera del estado"],
    ["Making an announcement isn't a crime. Now it's a court war.", "Hacer un anuncio no es un delito. Ahora hay una guerra en los tribunales."],
    ["That broke the <b>rule of law</b>. No arrests for non-crimes.", "Eso rompió el <b>estado de derecho</b>. No se arresta a nadie sin delito."],
    ["Washington takes over", "Washington toma el control"],
    ["D.C. runs Iowa's licenses. Hale: “Only I can protect you.”", "Washington maneja las licencias de Iowa. Hale: “Solo yo los puedo proteger.”"],
    ["When nobody defends the rules, the loudest person wins.", "Cuando nadie defiende las reglas, gana el que grita más fuerte."]
  ]);

  // ---------- Showdown 7: governor forever ----------
  add([
    ["Governor forever", "Gobernador para siempre"],
    ["Governor Forever", "Gobernador para siempre"],
    ["Lawmakers pass Hale's amendment: <b>“No more elections for governor.”</b>", "Los legisladores aprueban la enmienda de Hale: <b>“No más elecciones para gobernador.”</b>"],
    ["Soon I'm governor for life.", "Pronto seré gobernador de por vida."],
    ["You broke rules too. Who trusts you?", "Tú también rompiste reglas. ¿Quién confía en ti?"],
    ["Evidence · Iowa Constitution (real)", "Evidencia · Constitución de Iowa (real)"],
    ["To change Iowa's constitution, lawmakers pass it <b>twice</b>. Then a <b>majority of voters</b> must approve.", "Para cambiar la constitución de Iowa, los legisladores la aprueban <b>dos veces</b>. Luego una <b>mayoría de votantes</b> tiene que aprobarla."],
    ["Source: Iowa Constitution, Article X · Real: in 1998, voters added “and women” to Article I", "Fuente: Constitución de Iowa, Artículo X · Real: en 1998, los votantes agregaron “y las mujeres” al Artículo I"],
    ["Voters say no", "Los votantes dicen que no"],
    ["Iowans vote NO, 70% to 30%. Hale's term ends on time.", "La gente de Iowa vota NO, 70% a 30%. El mandato de Hale termina a tiempo."],
    ["They voted against ME?", "¿Votaron contra MÍ?"],
    ["<b>Popular sovereignty</b>: power comes from the people.", "<b>Soberanía popular</b>: el poder viene del pueblo."],
    ["Killed in the legislature", "Muere en la legislatura"],
    ["The next legislature kills it. Voters never get a say.", "La siguiente legislatura la rechaza. Los votantes nunca opinan."],
    ["I'll be back next session.", "Volveré la próxima sesión."],
    ["<b>Checks and balances</b>: lawmakers can stop a bad amendment early.", "<b>Pesos y contrapesos</b>: los legisladores pueden frenar a tiempo una mala enmienda."],
    ["Amending the legal way isn't unconstitutional.", "Enmendar por la vía legal no es inconstitucional."],
    ["Nothing hidden here. This is a vote.", "Aquí no hay nada escondido. Esto es una votación."],
    ["Proposing amendments IS lawmakers' job. Who decides last?", "Proponer enmiendas SÍ es trabajo de los legisladores. ¿Quién decide al final?"],
    ["Amending is allowed. Who gets the final say?", "Enmendar está permitido. ¿Quién tiene la última palabra?"],
    ["This is Iowa's own constitution. Who decides?", "Esta es la propia constitución de Iowa. ¿Quién decide?"],
    ["Iowa already controls this. Who decides inside Iowa?", "Iowa ya controla esto. ¿Quién decide dentro de Iowa?"],
    ["Cancel the vote", "Cancelar la votación"],
    ["You cancel the election", "Cancelas la elección"],
    ["No amendment, but no voice either. Hale: “Who's canceling elections now?”", "No hay enmienda, pero tampoco voz. Hale: “¿Quién cancela elecciones ahora?”"],
    ["That broke <b>popular sovereignty</b>. Power comes from the people's vote.", "Eso rompió la <b>soberanía popular</b>. El poder viene del voto del pueblo."],
    ["It passes", "Se aprueba"],
    ["Few people vote. It passes by 900 votes.", "Vota poca gente. Se aprueba por 900 votos."],
    ["Popular sovereignty only works when people use it.", "La soberanía popular solo funciona cuando la gente la usa."]
  ]);

  // ---------- Evidence checks ----------
  add([
    ["Objection! Nothing limits his emergency.", "¡Protesto! Nada limita su emergencia."],
    ["Show me: how is his emergency limited?", "Muéstrame: ¿cómo se limita su emergencia?"],
    ["30 days unless renewed; lawmakers can cancel", "30 días si no se renueva; los legisladores pueden cancelarla"],
    ["Lasts until the next election; voters end it", "Dura hasta la próxima elección; los votantes la terminan"],
    ["Ends only when the President orders it", "Termina solo cuando el Presidente lo ordena"],
    ["Lasts a year; only judges can end it", "Dura un año; solo los jueces la terminan"],
    ["Check the days and who cancels.", "Revisa los días y quién cancela."],
    ["30 days unless renewed. Lawmakers can cancel.", "30 días si no se renueva. Los legisladores pueden cancelarla."],
    ["Objection! Governors can make laws.", "¡Protesto! Los gobernadores pueden hacer leyes."],
    ["Hale wrote a tax. Whose job did he take?", "Hale escribió un impuesto. ¿El trabajo de quién tomó?"],
    ["Legislative: the branch that makes laws", "Legislativa: la rama que hace las leyes"],
    ["Judicial: the branch that explains laws", "Judicial: la rama que explica las leyes"],
    ["Executive: the branch that enforces laws", "Ejecutiva: la rama que hace cumplir las leyes"],
    ["Nobody's: storms suspend the usual rules", "De nadie: las tormentas suspenden las reglas"],
    ["Which branch makes laws?", "¿Qué rama hace las leyes?"],
    ["Making laws is the legislature's job.", "Hacer leyes es trabajo de la legislatura."],
    ["Objection! Courts can't boss governors.", "¡Protesto! Los tribunales no mandan a los gobernadores."],
    ["What does the Nixon case prove?", "¿Qué prueba el caso Nixon?"],
    ["Even a President must obey the courts", "Hasta un Presidente tiene que obedecer a los tribunales"],
    ["Elected leaders can ignore the courts", "Los líderes elegidos pueden ignorar a los tribunales"],
    ["Only Congress can make a President obey", "Solo el Congreso puede hacer obedecer a un Presidente"],
    ["Courts only give orders to regular people", "Los tribunales solo dan órdenes a la gente común"],
    ["Did Nixon have to obey?", "¿Nixon tuvo que obedecer?"],
    ["Even a President must obey. That's rule of law.", "Hasta un Presidente tiene que obedecer. Eso es el estado de derecho."],
    ["Objection! Iowa can ignore national laws.", "¡Protesto! Iowa puede ignorar las leyes nacionales."],
    ["Show me in Article VI: who wins a clash?", "Muéstrame en el Artículo VI: ¿quién gana un choque?"],
    ["Valid national laws beat state orders", "Las leyes nacionales válidas le ganan a las órdenes del estado"],
    ["Each state picks which laws to follow", "Cada estado elige qué leyes seguir"],
    ["State laws win; states are closer to people", "Ganan las leyes del estado; están más cerca de la gente"],
    ["The President settles every clash alone", "El Presidente resuelve cada choque solo"],
    ["What does “supreme” mean?", "¿Qué significa “suprema”?"],
    ["Article VI: national laws are “the supreme Law of the Land.”", "Artículo VI: las leyes nacionales son “la ley suprema del país.”"],
    ["Then I'll change the U.S. Constitution!", "¡Entonces cambiaré la Constitución de EE. UU.!"],
    ["Evidence · Article V (real)", "Evidencia · Artículo V (real)"],
    ["<b>Two-thirds</b> of both houses of Congress propose it. <b>Three-fourths of the states</b> ratify (approve) it. Only 27 ever passed.", "<b>Dos tercios</b> de las dos cámaras del Congreso la proponen. <b>Tres cuartos de los estados</b> la ratifican (aprueban). Solo 27 se han aprobado."],
    ["Source: U.S. Constitution, Article V", "Fuente: Constitución de EE. UU., Artículo V"],
    ["How many states must ratify?", "¿Cuántos estados tienen que ratificarla?"],
    ["38 states (three-fourths)", "38 estados (tres cuartos)"],
    ["26 states (just over half)", "26 estados (poco más de la mitad)"],
    ["34 states (two-thirds)", "34 estados (dos tercios)"],
    ["50 states (every one)", "50 estados (todos)"],
    ["Find three-fourths on the card.", "Busca tres cuartos en la tarjeta."],
    ["Three-fourths is 38 of 50. Hale gives up.", "Tres cuartos son 38 de 50. Hale se rinde."]
  ]);

  SiteLang.add({
    dict,
    patterns: [
      { re: /^Showdown (\d) of 7$/, es: "Duelo $1 de 7" },
      { re: /^Step (\d+) of (\d+)$/, es: "Paso $1 de $2" },
      { re: /^(\d+) cards$/, es: "$1 cartas" },
      { re: /^1 card$/, es: "1 carta" },
      { re: /^1 card left$/, es: "Te queda 1 carta" },
      { re: /^(\d+) cards left$/, es: "Te quedan $1 cartas" },
      { re: /^Hale's power ([+−]\d+)$/, es: "Poder de Hale $1" },
      { re: /^(\d+) burned cards$/, es: "$1 cartas quemadas" },
      { re: /^Not quite\. (.+)$/, es: "Todavía no. $1", tr: [1] },
      { re: /^For (.+): (.+)$/, es: "En $1: $2", tr: [1, 2] },
      { re: /^Welcome back! You're on step (\d+) of (\d+)\.$/, es: "¡Bienvenido de nuevo! Estás en el paso $1 de $2." }
    ],
    writing: {}
  });
})();
