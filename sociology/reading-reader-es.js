// Spanish for the shared Sociology reading reader (reading-reader.js).
// Load after ../../shared/lang.js and before the page's own es.js.
// Covers only the reader's own buttons, progress, feedback, and turn-in messages,
// plus the chrome every reading day shares (day links, intro line, finish screen).
// Each page's readings, questions, hints, and picture descriptions live in that page's es.js.
SiteLang.add({
  dict: {
    // Shared page chrome (same on every reading day)
    "Sociology reading days": "Días de lectura de Sociología",
    "Day 1: What Is Sociology?": "Día 1: ¿Qué es la sociología?",
    "Day 2: Sociological Imagination": "Día 2: Imaginación sociológica",
    "Day 3: Origins and Founders": "Día 3: Orígenes y fundadores",
    "Day 4: Sociological Perspectives": "Día 4: Perspectivas sociológicas",
    "Day 7: Research Ethics": "Día 7: Ética en la investigación",
    "Read. Look. Make a connection.": "Lee. Observa. Haz una conexión.",
    "Start reading": "Empezar a leer",
    "Questions completed": "Preguntas completadas",
    "Select a picture to make it larger.": "Haz clic en una imagen para verla más grande.",
    "Next question": "Siguiente pregunta",
    "Reading complete.": "Lectura terminada.",
    "Print / Save as PDF": "Imprimir / Guardar como PDF",
    "Close picture": "Cerrar imagen",
    "Today's goal:": "Meta de hoy:",

    // Reader buttons and status
    "Hide reading help": "Ocultar ayuda de lectura",
    "Reading help": "Ayuda de lectura",
    "Next question · same reading": "Siguiente pregunta · misma lectura",
    "Next reading": "Siguiente lectura",
    "Finish reading": "Terminar la lectura",
    "Keep going": "Continuar",
    "Use the marked picture.": "Usa la imagen marcada.",
    "Use the marked page.": "Usa la página marcada.",
    "Reading time pauses while this tab is hidden.": "El tiempo de lectura se pausa mientras esta pestaña está oculta.",
    "Waiting for the picture to load.": "Esperando a que cargue la imagen.",
    "Look at the marked picture and read its words again.": "Mira la imagen marcada y vuelve a leer sus palabras.",
    "Read the text again.": "Vuelve a leer el texto.",

    // Turn-in box
    "Turn in to my teacher": "Entregar a mi profesor",
    "Write your final thought (at least one full sentence) before turning in.": "Escribe tu idea final (por lo menos una oración completa) antes de entregar.",
    "Turning in...": "Entregando...",
    "The turn-in system did not load. Refresh the page and try again.": "El sistema de entrega no cargó. Recarga la página e intenta otra vez.",
    "Turned in! Your teacher can see your work. You can print a copy below.": "¡Entregado! Tu profesor puede ver tu trabajo. Abajo puedes imprimir una copia.",
    "Turned in": "Entregado"
  },
  patterns: [
    { re: /^Sociology · Day (\d+)$/, es: "Sociología · Día $1" },
    { re: /^Standard (SS\.[\w.\-]+)$/, es: "Estándar $1" },
    { re: /^— (.+)$/, es: "— $1", tr: [1] },
    { re: /^(\d+) readings · (\d+) questions$/, es: "$1 lecturas · $2 preguntas" },
    { re: /^About (\d+) minutes$/, es: "Unos $1 minutos" },
    { re: /^Read each page and comic, then answer the question beside it\. Done means all (\d+) questions right plus one final sentence\. Then type your name and press$/,
      es: "Lee cada página y cómic, y responde la pregunta de al lado. Terminas cuando contestes bien las $1 preguntas y escribas una oración final. Luego revisa tu nombre y presiona" },
    { re: /^You answered all (\d+) questions\. Now finish the sentence below, type your name, and turn it in\.$/,
      es: "Respondiste las $1 preguntas. Ahora completa la oración de abajo, escribe tu nombre y entrega tu trabajo." },
    { re: /^Reading (\d+) of (\d+)$/, es: "Lectura $1 de $2" },
    { re: /^Question (\d+) of (\d+) for this reading$/, es: "Pregunta $1 de $2 de esta lectura" },
    { re: /^(\d+) of (\d+) questions done$/, es: "$1 de $2 preguntas listas" },
    { re: /^Read first\. Choices open in 1 seconds\.$/, es: "Lee primero. Las opciones se abren en 1 segundo." },
    { re: /^Read first\. Choices open in (\d+) seconds\.$/, es: "Lee primero. Las opciones se abren en $1 segundos." },
    { re: /^Look closely\. Choices open in 1 seconds\.$/, es: "Mira con atención. Las opciones se abren en 1 segundo." },
    { re: /^Look closely\. Choices open in (\d+) seconds\.$/, es: "Mira con atención. Las opciones se abren en $1 segundos." },
    { re: /^Look again\. Choices open in 1 seconds\.$/, es: "Vuelve a mirar. Las opciones se abren en 1 segundo." },
    { re: /^Look again\. Choices open in (\d+) seconds\.$/, es: "Vuelve a mirar. Las opciones se abren en $1 segundos." },
    { re: /^That fits\. (.+)$/, es: "¡Eso es! $1", tr: [1] },
    { re: /^Not quite\. (.+) The choices are mixed up now\.$/, es: "Todavía no. $1 Ahora las opciones están en otro orden.", tr: [1] },
    { re: /^Enlarge picture (\d+)$/, es: "Ampliar imagen $1" },
    { re: /^Welcome back — you finished all (\d+) questions\. Write your final thought and turn it in\.$/,
      es: "Bienvenido de nuevo. Ya terminaste las $1 preguntas. Escribe tu idea final y entrégala." },
    { re: /^Welcome back — you’re on question (\d+) of (\d+)\.$/, es: "Bienvenido de nuevo. Vas en la pregunta $1 de $2." }
  ]
});

// lang.js does not look inside <textarea>, so the final-thought box's hint text
// (placeholder) is swapped here once the page's own es.js has loaded.
(function () {
  function fix() {
    if (!window.SiteLang || !SiteLang.isEs()) return;
    document.querySelectorAll("textarea[placeholder]").forEach(function (ta) {
      var v = ta.getAttribute("placeholder"), out = SiteLang.t(v);
      if (out !== v) ta.setAttribute("placeholder", out);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fix);
  else fix();
})();

// Shared by every reading day (moved here from Day 3).
// The Spanish boxes make the pictures taller, and they (and the pictures) appear a moment after the
// reader has already scrolled the picture list to the marked picture. Re-scroll to the marked picture
// as things load, for the first few seconds of each reading, unless the student has started scrolling.
(function () {
  if (!window.SiteLang || !SiteLang.isEs()) return;
  function setup() {
    var box = document.getElementById("scans");
    if (!box) return;
    var moved = false, until = 0;
    function realign() {
      if (moved || Date.now() > until) return;
      var marked = box.querySelector(".focus-comic");
      if (marked) box.scrollTop = marked.offsetTop - box.offsetTop;
    }
    ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (ev) {
      box.addEventListener(ev, function () { moved = true; }, { passive: true });
    });
    new MutationObserver(function (list) {
      var fresh = list.some(function (r) { return r.target === box && r.addedNodes.length; });
      if (fresh) { moved = false; until = Date.now() + 4000; }
      requestAnimationFrame(realign);
    }).observe(box, { childList: true, subtree: true });
    box.addEventListener("load", realign, true);   // each picture finishing loading
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup);
  else setup();
})();
