// Spanish for "Culture Shock Exchange" (Sociology Unit 2 Day 3). Loaded after shared/lang.js.
// Keys are the exact English the page shows; the English page keeps running underneath.
(function () {
  // Same helpers as the page, so the English keys match exactly.
  const T = (cls, txt) => `<span class="tag ${cls}">${txt}</span>`;
  const maya = (when, body) => `<div class="msgcard maya"><div class="who">MAYA · in Osaka, Japan · ${when}</div>${body}</div>`;
  const haruto = (when, body) => `<div class="msgcard haruto"><div class="who">HARUTO · in Marion, Iowa · ${when}</div>${body}</div>`;
  const mayaEs = (when, body) => `<div class="msgcard maya"><div class="who">MAYA · en Osaka, Japón · ${when}</div>${body}</div>`;
  const harutoEs = (when, body) => `<div class="msgcard haruto"><div class="who">HARUTO · en Marion, Iowa · ${when}</div>${body}</div>`;

  SiteLang.add({
    dict: {
      // ---------- Page frame ----------
      "Culture Shock Exchange | Sociology Unit 2 Day 3": "Intercambio y choque cultural | Sociología Unidad 2 Día 3",
      "Sociology · Unit 2 · Day 3": "Sociología · Unidad 2 · Día 3",
      "Culture Shock Exchange": "Intercambio y choque cultural",
      "Analyze how culture influences individuals, including themselves.": "Analizar cómo la cultura influye en las personas, incluyéndote a ti mismo.",
      "Describe the components of culture.": "Describir los componentes de la cultura.",
      "Goal:": "Meta:",
      "Explain culture shock, ethnocentrism, and cultural relativity, and how your own culture shapes what feels \"normal\" to you. · About 25 minutes.": "Explicar el choque cultural, el etnocentrismo y la relatividad cultural, y cómo tu propia cultura influye en lo que te parece \"normal\". · Unos 25 minutos.",
      "Progress and Maya's belonging": "Progreso y pertenencia de Maya",
      "Maya fits in:": "Maya se integra:",

      // ---------- Intro ----------
      "Open the messages": "Abrir los mensajes",
      "A semester swap": "Un intercambio de un semestre",
      "Two students trade places": "Dos estudiantes cambian de lugar",
      "From Marion, Iowa. Spending a semester at a high school in Osaka, Japan.": "De Marion, Iowa. Pasa un semestre en un liceo de Osaka, Japón.",
      "From Osaka, Japan. Spending a semester at a high school in Marion, Iowa.": "De Osaka, Japón. Pasa un semestre en un liceo de Marion, Iowa.",
      "You'll read their messages to each other. You'll also make choices for Maya. Her choices change how well she fits in (watch the meter at the top).": "Vas a leer los mensajes que se mandan. También vas a tomar decisiones por Maya. Sus decisiones cambian qué tan bien se integra (mira el medidor de arriba).",
      "1. Read each message and answer the check.": "1. Lee cada mensaje y responde la pregunta.",
      "2. Choose what Maya does.": "2. Escoge lo que hace Maya.",
      "3. Write 2 short answers about YOUR culture and turn in.": "3. Escribe 2 respuestas cortas sobre TU cultura y entrega.",
      "Maya and Haruto are made up. The customs are real and common, but not every person in Japan or Iowa does the same thing.": "Maya y Haruto son inventados. Las costumbres son reales y comunes, pero no todas las personas en Japón o en Iowa hacen lo mismo.",

      // ---------- Part 1 ----------
      "Part 1 of 3 · Week 1": "Parte 1 de 3 · Semana 1",
      "Everything Is New": "Todo es nuevo",
      [`<p><b>Culture shock</b> is the confused, stressed, or homesick feeling people get in an unfamiliar culture.</p>
        <p><b>Ethnocentrism</b> is judging another culture by your own culture's standards, as if your way is the "normal" or "right" way.</p>
        <p><b>Cultural relativity</b> (also called cultural relativism) means trying to understand a custom from inside its own culture before judging it.</p>
        <p>A <b>sanction</b> is a reaction, like stares or praise, that pushes people to follow a norm.</p>`]:
        `<p>El <b>choque cultural (culture shock)</b> es sentirte confundido, estresado o con ganas de volver a casa cuando estás en una cultura desconocida.</p>
        <p>El <b>etnocentrismo (ethnocentrism)</b> es juzgar otra cultura según lo que es normal en la tuya, como si tu forma fuera la "normal" o la "correcta".</p>
        <p>La <b>relatividad cultural (cultural relativity)</b>, también llamada relativismo cultural, significa tratar de entender una costumbre desde dentro de su propia cultura antes de juzgarla.</p>
        <p>Una <b>sanción (sanction)</b> es una reacción, como miradas o elogios, que empuja a la gente a seguir una norma.</p>`,
      [maya("Day 2", `<p>Everyone takes off their shoes at the school entrance and puts on indoor shoes. I walked in wearing my sneakers and EVERYONE stared. 😳</p>`) + "Everyone at Maya's school switches to indoor shoes. Which part of culture is this shoe rule?"]:
        mayaEs("Día 2", `<p>Todos se quitan los zapatos en la entrada del liceo y se ponen zapatos de interior. Yo entré con mis gomas y TODOS se me quedaron mirando. 😳</p>`) + "En el liceo de Maya todos se cambian a zapatos de interior. ¿Qué parte de la cultura es esta regla de los zapatos?",
      "A norm": "Norma",
      "A value": "Valor",
      "A symbol": "Símbolo",
      "A status": "Estatus",
      "Think about why everyone stared.": "Piensa en por qué todos se le quedaron mirando.",
      "An expected way to act is a norm. The stares were an informal sanction.": "Una forma esperada de actuar es una norma (norm). Las miradas fueron una sanción informal.",
      "The indoor shoes themselves are an example of…": "Los zapatos de interior en sí son un ejemplo de…",
      "Material culture": "Cultura material",
      "Nonmaterial culture": "Cultura no material",
      "A counterculture": "Una contracultura",
      "Cultural relativity": "Relatividad cultural",
      "Is the shoe rule the same thing as the shoes?": "¿La regla de los zapatos es lo mismo que los zapatos?",
      "Physical objects a culture makes and uses are material culture.": "Los objetos físicos que una cultura hace y usa son cultura material (material culture).",
      [haruto("Day 2", `<p>Lunch here is so loud! People eat fast and walk around. Nobody cleans the school after class. There are janitors? I feel lost and kind of tired.</p>`) + "What is Haruto feeling?"]:
        harutoEs("Día 2", `<p>¡Qué bulla hay en el almuerzo! La gente come rápido y anda de un lado a otro. Nadie limpia el liceo después de clases. ¿Hay conserjes? Me siento perdido y algo cansado.</p>`) + "¿Qué está sintiendo Haruto?",
      "Culture shock": "Choque cultural",
      "Ethnocentrism": "Etnocentrismo",
      "Reread how Haruto says he feels.": "Vuelve a leer cómo dice Haruto que se siente.",
      "Feeling lost and tired in an unfamiliar culture is culture shock.": "Sentirse perdido y cansado en una cultura desconocida es choque cultural.",
      [maya("Day 5", `<p>After the last class, my teacher handed me a rag. The whole class cleans the classroom and hallways together. They call it <b>o-soji</b> (cleaning time). What do I do??</p>`)]:
        mayaEs("Día 5", `<p>Después de la última clase, mi profesora me dio un trapo. Toda la clase limpia el salón y los pasillos juntos. Lo llaman <b>o-soji</b> (hora de limpieza). ¿¿Qué hago??</p>`),
      "Ask a classmate why students clean the school": "Preguntarle a una compañera por qué los estudiantes limpian",
      [`<p>${T("up","+2 fits in")}Her classmate Yui explains: cleaning teaches responsibility and respect for shared spaces, and it's teamwork. Yui shows Maya how to wring the rag.</p>`]:
        `<p>${T("up","+2 integración")}Su compañera Yui le explica: limpiar enseña responsabilidad y respeto por los espacios compartidos, y es trabajo en equipo. Yui le enseña a Maya cómo exprimir el trapo.</p>`,
      "Say: \"Back home we have janitors. This is a waste of time.\"": "Decir: \"En mi país tenemos conserjes. Esto es una pérdida de tiempo.\"",
      [`<p>${T("down","−2 fits in")}The room goes quiet. A few classmates look hurt. Maya cleans anyway, but nobody talks to her.</p>`]:
        `<p>${T("down","−2 integración")}El salón se queda en silencio. Algunos compañeros se ven ofendidos. Maya limpia de todas formas, pero nadie le habla.</p>`,
      "Clean quietly, but text home: \"this is so weird\"": "Limpiar en silencio, pero escribirle a su familia: \"esto es rarísimo\"",
      [`<p>${T("flat","No change")}Maya does the job but doesn't learn why. She still feels like an outsider.</p>`]:
        `<p>${T("flat","Sin cambio")}Maya hace el trabajo pero no aprende por qué. Todavía se siente como una extraña.</p>`,
      "Saying \"Back home we have janitors. This is a waste of time\" is an example of…": "Decir \"En mi país tenemos conserjes. Esto es una pérdida de tiempo\" es un ejemplo de…",
      "Is Maya trying to understand, or comparing to home?": "¿Maya está tratando de entender, o está comparando con su país?",
      "Judging another culture's custom as wrong because it's different from yours is ethnocentrism.": "Juzgar como mala la costumbre de otra cultura porque es diferente a la tuya es etnocentrismo.",
      "Asking a classmate <b>why</b> students clean, before judging it, shows…": "Preguntarle a una compañera <b>por qué</b> los estudiantes limpian, antes de juzgarlo, muestra…",
      "A negative sanction": "Una sanción negativa",
      "What does Maya do before deciding how she feels?": "¿Qué hace Maya antes de decidir cómo se siente?",
      "Trying to understand a custom in its own culture before judging it is cultural relativity.": "Tratar de entender una costumbre dentro de su propia cultura antes de juzgarla es relatividad cultural.",
      "Japanese schools say o-soji teaches students to <b>respect shared spaces</b>. Respect for shared spaces is a…": "Las escuelas japonesas dicen que el o-soji les enseña a los estudiantes a <b>respetar los espacios compartidos</b>. ¿Qué es el respeto por los espacios compartidos?",
      "Value": "Valor",
      "Norm": "Norma",
      "Symbol": "Símbolo",
      "Sanction": "Sanción",
      "Status": "Estatus",
      "Is it a rule for how to act, or a belief about what matters?": "¿Es una regla sobre cómo actuar o una creencia sobre lo que importa?",
      "A shared belief about what is important is a value. Cleaning time is the norm that grows out of it.": "Una creencia compartida sobre lo que es importante es un valor (value). La hora de limpieza es la norma que nace de ese valor.",

      // ---------- Part 2 ----------
      "Part 2 of 3 · Month 1": "Parte 2 de 3 · Mes 1",
      "The Hard Part": "La parte difícil",
      [`<p>Culture shock often comes in stages:</p>
        <div class="stages"><div><b>1. Honeymoon</b>Everything is exciting.</div><div><b>2. Frustration</b>Differences feel stressful. Homesick.</div><div><b>3. Adjustment</b>Starting to figure things out.</div><div><b>4. Acceptance</b>Feeling at home in both cultures.</div></div>
        <p>Not everyone goes through every stage, or in the same order.</p>`]:
        `<p>El choque cultural muchas veces llega por etapas:</p>
        <div class="stages"><div><b>1. Luna de miel (Honeymoon)</b>Todo es emocionante.</div><div><b>2. Frustración (Frustration)</b>Las diferencias causan estrés. Extrañas tu hogar.</div><div><b>3. Ajuste (Adjustment)</b>Empiezas a entender cómo funcionan las cosas.</div><div><b>4. Aceptación (Acceptance)</b>Te sientes en casa en las dos culturas.</div></div>
        <p>No todos pasan por todas las etapas, ni en el mismo orden.</p>`,
      [maya("Week 4", `<p>On the train everyone is SILENT. I called my mom and an older man frowned at me. I keep messing up. I miss home so much.</p>`) + "Which stage of culture shock is Maya in?"]:
        mayaEs("Semana 4", `<p>En el tren todos están en SILENCIO. Llamé a mi mamá y un señor mayor me puso mala cara. Qué ladilla, sigo metiendo la pata. Extraño mucho mi casa.</p>`) + "¿En qué etapa del choque cultural está Maya?",
      "Frustration": "Frustración",
      "Honeymoon": "Luna de miel",
      "Adjustment": "Ajuste",
      "Acceptance": "Aceptación",
      "Is she excited, stressed, learning, or at home?": "¿Está emocionada, estresada, aprendiendo o como en casa?",
      "Stress, mistakes, and homesickness are the frustration stage.": "El estrés, los errores y extrañar tu hogar son parte de la etapa de frustración.",
      [haruto("Week 4", `<p>At a restaurant my host dad left extra money for the server. In Japan we don't tip. Here, everyone expects it!</p>`) + "In the U.S., leaving a tip for a server is a…"]:
        harutoEs("Semana 4", `<p>En un restaurante, mi papá anfitrión le dejó dinero extra al mesonero. En Japón no damos propina. ¡Aquí todo el mundo la espera!</p>`) + "En EE. UU., ¿qué es dejarle propina a un mesonero?",
      "Is tipping a belief, or something people are expected to do?": "¿Dar propina es una creencia o algo que se espera que la gente haga?",
      "An expected behavior is a norm. In Japan, the norm is different: tipping usually isn't done.": "Una conducta esperada es una norma. En Japón la norma es diferente: normalmente no se da propina.",
      "Which thought about American tipping shows <b>cultural relativity</b>?": "¿Qué pensamiento sobre la propina en EE. UU. muestra <b>relatividad cultural</b>?",
      "Tipping makes sense here since many servers' pay depends on it": "La propina tiene sentido aquí porque muchos mesoneros dependen de ella",
      "Tipping is a bad custom because Japan doesn't need it at all": "La propina es una mala costumbre porque en Japón no hace ninguna falta",
      "Americans tip because they want to show off their money": "Los estadounidenses dan propina porque quieren presumir su dinero",
      "Tipping is confusing, so I'll skip restaurants for now": "La propina es confusa, así que por ahora no iré a restaurantes",
      "Which one explains the custom from inside American culture?": "¿Cuál explica la costumbre desde dentro de la cultura estadounidense?",
      "Explaining a custom by how it works in its own culture is cultural relativity. Calling it bad because your culture does it differently is ethnocentrism.": "Explicar una costumbre según cómo funciona en su propia cultura es relatividad cultural. Decir que es mala porque tu cultura lo hace diferente es etnocentrismo.",
      [maya("Week 5", `<p>Most kids bring a <b>bento</b> (packed lunch box) and eat at their desks. Yui's has rice, grilled fish, and pickled vegetables. I brought chips and a sandwich.</p>`)]:
        mayaEs("Semana 5", `<p>Casi todos traen un <b>bento</b> (lonchera con comida) y comen en sus pupitres. El de Yui tiene arroz, pescado a la parrilla y vegetales encurtidos. Yo traje papitas y un sándwich.</p>`),
      "Ask Yui what's in her bento and try a bite": "Preguntarle a Yui qué tiene su bento y probar un bocado",
      [`<p>${T("up","+2 fits in")}Yui laughs and offers some fish. The next day her mom packs an extra rice ball for Maya.</p>`]:
        `<p>${T("up","+2 integración")}Yui se ríe y le ofrece un poco de pescado. Al día siguiente, su mamá le prepara una bola de arroz extra a Maya.</p>`,
      "Post a photo: \"weird lunch here lol\"": "Publicar una foto: \"almuerzo raro aquí jaja\"",
      [`<p>${T("down","−3 fits in")}A classmate sees the post. Word spreads, and Yui stops sitting with Maya.</p>`]:
        `<p>${T("down","−3 integración")}Un compañero ve la publicación. Se corre la voz, y Yui deja de sentarse con Maya.</p>`,
      "Eat alone in the hallway so nobody sees my lunch": "Comer sola en el pasillo para que nadie vea mi almuerzo",
      [`<p>${T("down","−1 fits in")}Maya avoids the awkward moment, but also misses a chance to connect.</p>`]:
        `<p>${T("down","−1 integración")}Maya evita el momento incómodo, pero también pierde una oportunidad de conectar.</p>`,
      "Why did the \"weird lunch lol\" post hurt Maya's place in the group?": "¿Por qué la publicación \"almuerzo raro jaja\" perjudicó el lugar de Maya en el grupo?",
      "It treated Yui's normal food as strange, which is ethnocentrism": "Trató la comida normal de Yui como algo raro, y eso es etnocentrismo",
      "It showed Maya's culture shock, which worried her classmates": "Mostró el choque cultural de Maya, y eso preocupó a sus compañeros",
      "It broke the school's phone rule, which is a written formal norm": "Rompió la regla del celular del liceo, que es una norma formal escrita",
      "It showed Maya trying to learn, which is cultural relativity": "Mostró a Maya tratando de aprender, y eso es relatividad cultural",
      "What does calling someone's normal lunch \"weird\" do?": "¿Qué pasa cuando llamas \"raro\" al almuerzo normal de alguien?",
      "Mocking another culture's normal custom treats your way as the right way. That's ethnocentrism, and it pushes people away.": "Burlarte de una costumbre normal de otra cultura trata tu forma como la correcta. Eso es etnocentrismo, y aleja a la gente.",

      // ---------- Part 3 ----------
      "Part 3 of 3 · Month 3": "Parte 3 de 3 · Mes 3",
      "Seeing Your Own Culture": "Ver tu propia cultura",
      "<p>You usually don't notice your own culture until you're somewhere else.</p>": "<p>Por lo general no notas tu propia cultura hasta que estás en otro lugar.</p>",
      [maya("Month 3", `<p>Japan feels like my second home now. I bow without thinking, and I'll miss cleaning time. On a video call, my little brother walked into the kitchen in his muddy sneakers and it looked SO weird to me. Haha.</p>`) + "Which stage is Maya in now?"]:
        mayaEs("Mes 3", `<p>Ahora Japón se siente como mi segundo hogar. Hago reverencias sin pensar, y voy a extrañar la hora de limpieza. En una videollamada, mi hermanito entró a la cocina con sus gomas llenas de barro y me pareció MUY raro. Jaja.</p>`) + "¿En qué etapa está Maya ahora?",
      "Is she still figuring things out, or does it feel like home?": "¿Todavía está tratando de entender las cosas, o ya se siente en casa?",
      "Feeling at home in the new culture is acceptance. Now even her home culture looks a little strange to her.": "Sentirse en casa en la nueva cultura es aceptación. Ahora hasta su propia cultura le parece un poco extraña.",
      [haruto("Month 3", `<p>I'm making a list of American habits that surprised me.</p>`) + "Which habit could be on <b>Haruto's</b> list?"]:
        harutoEs("Mes 3", `<p>Estoy haciendo una lista de costumbres estadounidenses que me sorprendieron.</p>`) + "¿Qué costumbre podría estar en la lista de <b>Haruto</b>?",
      "Wearing outdoor shoes inside the school": "Usar los zapatos de la calle dentro del liceo",
      "Cleaning the classroom after the last class": "Limpiar el salón después de la última clase",
      "Staying quiet on a crowded city train": "Quedarse callado en un tren lleno de gente",
      "Not leaving any tip after a restaurant meal": "No dejar propina después de comer en un restaurante",
      "Three of these are normal in Japan. Which one is normal in Iowa?": "Tres de estas son normales en Japón. ¿Cuál es normal en Iowa?",
      "Wearing outdoor shoes inside school is normal in Iowa but surprising to Haruto. The others are normal in Japan.": "Usar los zapatos de la calle dentro del liceo es normal en Iowa, pero a Haruto le sorprende. Las otras son normales en Japón.",
      "Why does your own culture usually feel \"normal\" to you?": "¿Por qué tu propia cultura normalmente te parece \"normal\"?",
      "You learned it from family, school, and friends": "La aprendiste de tu familia, la escuela y tus amigos",
      "Your brain is wired for just one set of customs": "Tu cerebro está hecho para un solo grupo de costumbres",
      "Your town's customs are all written into law": "Todas las costumbres de tu pueblo están escritas en la ley",
      "Most people around the world share your habits": "Casi toda la gente del mundo tiene tus mismas costumbres",
      "Where did you learn the rules you follow without thinking?": "¿Dónde aprendiste las reglas que sigues sin pensar?",
      "We learn our culture from the people and places around us, so it feels natural. That's how culture shapes individuals, including you.": "Aprendemos nuestra cultura de la gente y los lugares que nos rodean, por eso se siente natural. Así es como la cultura forma a las personas, incluyéndote a ti.",

      // ---------- Finale ----------
      "Your Culture, Your Lens": "Tu cultura, tu lente",
      " Choices built on understanding (cultural relativity) helped her belong. Choices that judged (ethnocentrism) pushed people away.": "Las decisiones basadas en entender (relatividad cultural) la ayudaron a pertenecer. Las decisiones que juzgaban (etnocentrismo) alejaron a la gente.",
      "Now turn the lens on yourself. Answer both in 1–2 full sentences.": "Ahora mírate a ti mismo con ese lente. Responde las dos con 1–2 oraciones completas.",
      "1. Name one norm from YOUR everyday life (school, home, work, or online) that might seem strange to someone from another culture. Why does it feel normal to you?": "1. Nombra una norma de TU vida diaria (liceo, casa, trabajo o internet) que podría parecerle extraña a alguien de otra cultura. ¿Por qué te parece normal a ti?",
      "In my life, it's normal to ___. Someone from another culture might think it's strange because ___. It feels normal to me because ___.": "En mi vida, es normal ___. Alguien de otra cultura podría pensar que es extraño porque ___. A mí me parece normal porque ___.",
      "In answer 1, explain WHY it feels normal to you (use \"because\").": "En la respuesta 1, explica POR QUÉ te parece normal (usa \"porque\").",
      "2. Pick one Iowa custom Haruto found strange (loud lunches, janitors cleaning, tipping, or outdoor shoes inside). Explain why it makes sense in Iowa, the way a cultural relativist would.": "2. Escoge una costumbre de Iowa que a Haruto le pareció extraña (almuerzos ruidosos, conserjes que limpian, la propina o zapatos de la calle adentro). Explica por qué tiene sentido en Iowa, como lo haría un relativista cultural.",
      "Haruto found ___ strange. It makes sense in Iowa because ___.": "A Haruto le pareció extraño ___. Tiene sentido en Iowa porque ___.",
      "In answer 2, name the custom AND explain why it makes sense in Iowa (use \"because\").": "En la respuesta 2, nombra la costumbre Y explica por qué tiene sentido en Iowa (usa \"porque\").",

      // ---------- Short names (shown in writing messages) ----------
      "A norm from my own culture": "Una norma de mi propia cultura",
      "Explain an Iowa custom like a cultural relativist": "Explica una costumbre de Iowa como un relativista cultural"
    },
    patterns: [
      { re: /^Maya's fit-in meter ended at (\d+)\/10\.$/, es: "El medidor de integración de Maya terminó en $1/10." }
    ],
    writing: {
      own: [
        ["porque", "ya que", "debido a", "aprend", "creci", "me enseñ", "enseñ"]
      ],
      lens: [
        ["almuerzo", "almorz", "lonch", "comida", "comer", "ruido", "conserje", "limpi", "propina", "zapato", "calzado", "gomas", "tenis", "bulla", "mesoner"],
        ["porque", "ya que", "debido a"]
      ]
    }
  });
})();
