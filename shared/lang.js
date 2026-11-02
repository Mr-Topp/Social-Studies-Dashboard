// =====================================================================
//  ENGLISH | ESPAÑOL SWITCH
//  Any page that has a Spanish version loads this file, then its own es.js:
//     <script src="../../shared/lang.js"></script>
//     <script src="es.js"></script>
//  es.js calls SiteLang.add({ dict: { "English text": "Spanish text" }, patterns: [...], writing: {...} }).
//
//  How it works: the page keeps running in English underneath (same answer checks, same
//  turn-in data). When a student picks Español, every piece of English on the screen that has a
//  Spanish match is swapped as it appears. The choice is remembered on this device for every page.
//
//  dict keys can be plain text or HTML. A key matches either a whole element's content
//  (for example a question with <b> words inside) or a single piece of text.
//  patterns: [{ re: /^You have (\d+) points$/, es: "Tienes $1 puntos" }]
//     Add tr: [1] to also translate what capture group 1 holds, using dict.
//  writing: { promptId: [["spanish", "words"], ...] } — Spanish words that also count for a
//     writing prompt's "must include" check (one list per English group, same order).
// =====================================================================
(function () {
  "use strict";
  const KEY = "site-lang";
  const DEVICE = "site-lang-es-device";   // set by the student's Spanish home page (sociology/espanol/)
  const HUB = new URL("../sociology/espanol/", (document.currentScript && document.currentScript.src) || location.href).href;
  let lang = "en", optIn = false;
  try {
    optIn = localStorage.getItem(DEVICE) === "1";
    lang = optIn && localStorage.getItem(KEY) !== "en" ? "es" : "en";
  } catch (e) {}

  const htmlMap = new Map();   // normalized HTML  -> Spanish HTML
  const textMap = new Map();   // normalized text  -> Spanish text
  const backMap = new Map();   // normalized Spanish text -> English text
  const esSeen = new Set();    // normalized Spanish HTML (skip quickly)
  const patterns = [];
  const writing = {};
  let hasPage = false;

  const tpl = document.createElement("template");
  const squash = s => String(s).replace(/[\s ]+/g, " ").trim();
  function normHtml(s) { tpl.innerHTML = String(s); return squash(tpl.innerHTML); }
  function asText(s) { tpl.innerHTML = String(s); return squash(tpl.content.textContent); }
  const isHtml = s => /<[a-z!\/]/i.test(s);

  function add(pack, common) {
    if (!pack) return;
    if (!common) hasPage = true;
    Object.keys(pack.dict || {}).forEach(en => {
      const es = pack.dict[en];
      if (es == null || es === "") return;
      const nh = normHtml(en);
      htmlMap.set(nh, String(es));
      esSeen.add(normHtml(es));
      if (!isHtml(en)) textMap.set(asText(en), asText(es));
      backMap.set(asText(es), asText(en));
    });
    (pack.patterns || []).forEach(p => patterns.push(p));
    Object.assign(writing, pack.writing || {});
  }

  // Translate one string (plain text). Returns the English if there's no match.
  function t(s) {
    if (lang !== "es" || s == null) return s;
    const raw = String(s);
    const key = squash(raw);
    if (!key) return raw;
    if (textMap.has(key)) return lead(raw) + textMap.get(key) + trail(raw);
    const h = normHtml(raw);
    if (htmlMap.has(h)) return asText(htmlMap.get(h));
    for (const p of patterns) {
      const m = key.match(p.re);
      if (!m) continue;
      const out = p.es.replace(/\$(\d)/g, (_, n) => {
        const v = m[+n] == null ? "" : m[+n];
        return (p.tr || []).includes(+n) ? t(v) : v;
      });
      return lead(raw) + out + trail(raw);
    }
    return raw;
  }
  const lead = s => (String(s).match(/^[\s ]*/) || [""])[0];
  const trail = s => (String(s).match(/[\s ]*$/) || [""])[0];

  // Spanish text the student saw -> the English original (for the teacher).
  function toEn(s) { const k = squash(s); return backMap.get(k) || null; }

  // ---------- Swapping text on the screen ----------
  const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "NOSCRIPT", "CODE", "PRE", "svg", "SVG"]);
  const ATTRS = ["placeholder", "title", "aria-label", "alt"];
  let busy = false;

  function attrs(el) {
    ATTRS.forEach(a => {
      const v = el.getAttribute && el.getAttribute(a);
      if (!v) return;
      const out = t(v);
      if (out !== v) el.setAttribute(a, out);
    });
    if (el.tagName === "INPUT" && /^(button|submit|reset)$/i.test(el.type) && el.value) {
      const out = t(el.value); if (out !== el.value) el.value = out;
    }
  }
  function textNode(n) {
    const v = n.nodeValue;
    if (!v || !/[A-Za-z]/.test(v)) return;
    const out = t(v);
    if (out !== v) n.nodeValue = out;
  }
  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) { textNode(node); return; }
    if (node.nodeType !== 1 || node.closest && node.closest("[data-no-es]")) return;
    attrs(node);   // runs for text boxes too, so their hint text (placeholder) is translated
    if (SKIP.has(node.tagName)) return;
    if (node.firstChild && node.tagName !== "HTML" && node.tagName !== "BODY" && node.tagName !== "HEAD") {
      const h = squash(node.innerHTML);
      if (h.length < 6000 && !esSeen.has(h)) {
        const es = htmlMap.get(h) != null ? htmlMap.get(h) : htmlMap.get(normHtml(h));
        if (es != null) { node.innerHTML = es; return; }
      }
    }
    Array.from(node.childNodes).forEach(walk);
  }
  function onMutations(list) {
    if (busy) return;
    busy = true;
    try {
      list.forEach(m => {
        if (m.type === "childList") walk(m.target.nodeType === 1 ? m.target : m.target.parentNode);
        else if (m.type === "characterData") textNode(m.target);
        else if (m.type === "attributes") attrs(m.target);
      });
    } finally { busy = false; }
  }

  // ---------- The switch ----------
  function setLang(next) {
    try { localStorage.setItem(KEY, next); } catch (e) {}
    location.reload();
  }
  function drawSwitch() {
    // Only on a Chromebook that opened the Spanish home page. Everyone else sees no change.
    if (!optIn || !hasPage || document.getElementById("langSwitch")) return;
    const css = document.createElement("style");
    css.textContent = ".lang-switch{display:flex;justify-content:flex-end;align-items:center;gap:6px;padding:6px max(12px,calc((100vw - 900px)/2)) 6px;background:#fff;border-bottom:1px solid #e3e0d6;font:700 14px/1 system-ui,Segoe UI,Arial,sans-serif;color:#44525c}" +
      ".lang-switch button{font:800 14px system-ui,Segoe UI,Arial,sans-serif;border:2px solid #cfcdbf;background:#fff;color:#1f2b33;border-radius:999px;padding:6px 12px;min-height:34px;cursor:pointer}" +
      ".lang-switch .not-me{border:0;background:none;color:#6b747b;font-weight:700;font-size:12px;padding:6px 4px;min-height:0;text-decoration:underline}" +
      ".lang-switch button[aria-pressed=true]{background:#1f2b33;border-color:#1f2b33;color:#fff}" +
      ".lang-switch a{margin-right:auto;color:#1e4f8a;font-weight:800;text-decoration:none;padding:6px 2px}.lang-switch a:hover{text-decoration:underline}" +
      ".lang-switch button:focus-visible{outline:3px solid #2f7dbd;outline-offset:2px}@media print{.lang-switch{display:none}}";
    document.head.appendChild(css);
    const bar = document.createElement("div");
    bar.className = "lang-switch"; bar.id = "langSwitch"; bar.setAttribute("data-no-es", "");
    bar.setAttribute("role", "group"); bar.setAttribute("aria-label", "Language / Idioma");
    const who = (myName.split(" ")[0] || "").replace(/[<>&"]/g, "");
    bar.innerHTML = '<a href="' + HUB + '">' + (lang === "es" ? "← Mis actividades" : "← My activities") + '</a><span aria-hidden="true">🌐</span><button type="button" lang="en" data-l="en">English</button><button type="button" lang="es" data-l="es">Español</button>' +
      (who ? '<button type="button" class="not-me" title="' + (lang === "es" ? "Apagar esto en esta computadora" : "Turn this off on this Chromebook") + '">' + (lang === "es" ? "¿No eres " + who + "?" : "Not " + who + "?") + '</button>' : "");
    const notMe = bar.querySelector(".not-me");
    if (notMe) notMe.onclick = () => {
      if (!nativeConfirm.call(window, lang === "es" ? "¿No eres " + who + "? Esto apaga el español y el nombre de " + who + " en esta computadora." : "Not " + who + "? This turns off the Spanish setup and " + who + "'s name on this Chromebook.")) return;
      try { [KEY, DEVICE, "site-student-name"].forEach(k => localStorage.removeItem(k)); } catch (e) {}
      location.reload();
    };
    bar.querySelectorAll("button[data-l]").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.l === lang));
      b.onclick = () => { if (b.dataset.l !== lang) setLang(b.dataset.l); };
    });
    document.body.insertBefore(bar, document.body.firstChild);
  }

  window.SiteLang = {
    get lang() { return lang; },
    isEs() { return lang === "es" && hasPage; },
    add(pack) { add(pack, false); },
    t, toEn,
    // Extra Spanish words for a writing prompt's "must include" groups.
    must(promptId) { return lang === "es" ? writing[promptId] || null : null; }
  };

  // Words used by the shared game engine and turn-in system on every page.
  add({
    dict: {
      "Your name: first name + last initial (like Jordan M.)": "Tu nombre: nombre + inicial del apellido (como Jordan M.)",
      "First name + last initial (like Jordan M.)": "Nombre + inicial del apellido (como Jordan M.)",
      "Type your first name and last initial, like Jordan M.": "Escribe tu nombre y la inicial de tu apellido, como Jordan M.",
      "Start": "Empezar",
      "Start over": "Empezar de nuevo",
      "Got it →": "Entendido →",
      "Finish →": "Terminar →",
      "You chose:": "Elegiste:",
      "Last step": "Último paso",
      "Turn in": "Entregar",
      "Turn in again": "Entregar otra vez",
      "Turned in ✓": "Entregado ✓",
      "You already turned this in. You can fix your writing and turn it in again.": "Ya entregaste esto. Puedes mejorar lo que escribiste y entregarlo otra vez.",
      "Sending your work…": "Enviando tu trabajo…",
      "Turned in! Your teacher can see your work. You're done.": "¡Entregado! Tu profesor puede ver tu trabajo. Ya terminaste.",
      "Could not turn in. Try again.": "No se pudo entregar. Intenta otra vez.",
      "Your work did not save. Try again.": "Tu trabajo no se guardó. Intenta otra vez.",
      "Could not reach the turn-in system. Check your internet and try again.": "No se pudo conectar para entregar. Revisa tu internet e intenta otra vez.",
      "Turn-in for this activity isn't switched on yet. Keep this page open and tell your teacher.": "La entrega de esta actividad todavía no está activada. Deja esta página abierta y avísale a tu profesor.",
      "Start over? This clears your work on this device.": "¿Empezar de nuevo? Esto borra tu trabajo en esta computadora.",
      "Start over? This clears your answers on this device.": "¿Empezar de nuevo? Esto borra tus respuestas en esta computadora.",
      "Progress saves on this device. Your teacher sees your work after you turn it in.": "Tu progreso se guarda en esta computadora. Tu profesor ve tu trabajo cuando lo entregas.",
      "Heads up: pasted writing shows up for your teacher. Write your answer in your own words.": "Ojo: tu profesor puede ver cuando pegas texto. Escribe tu respuesta con tus propias palabras.",
      "Open it here ↗": "Ábrela aquí ↗",
      "Your feedback is ready": "Tus comentarios están listos",
      "Read it, then fix it or keep going.": "Léelos y luego corrige tu trabajo o sigue adelante.",
      "Fix it now": "Corregir ahora",
      "Got it": "Entendido",
      "Got it, start today's work": "Entendido, empezar el trabajo de hoy",
      "Your teacher wants to talk with you about this one.": "Tu profesor quiere hablar contigo sobre esta actividad.",
      "Your teacher graded this one.": "Tu profesor ya calificó esta actividad.",
      "Your activity": "Tu actividad"
    },
    patterns: [
      { re: /^(\d+) of (\d+) checks done$/, es: "$1 de $2 preguntas listas" },
      { re: /^(\d+) checks done$/, es: "$1 preguntas listas" },
      { re: /^Not quite\. (.+) The choices will mix up\. Try again in (\d+)…$/, es: "Todavía no. $1 Las opciones se van a mezclar. Intenta otra vez en $2…", tr: [1] },
      { re: /^Not quite\. (.+) Try again\.$/, es: "Todavía no. $1 Intenta otra vez.", tr: [1] },
      { re: /^Next: (.+) →$/, es: "Siguiente: $1 →", tr: [1] },
      { re: /^✓ (.+)$/, es: "✓ $1", tr: [1] },
      { re: /^Welcome back, (.+) — you're right where you left off\.$/, es: "Bienvenido de nuevo, $1. Sigues donde lo dejaste." },
      { re: /^Write a little more for: (.+) \(1–2 full sentences\)\.$/, es: "Escribe un poco más en: $1 (1–2 oraciones completas).", tr: [1] },
      { re: /^Fill in the blanks with your own words for: (.+)\.$/, es: "Completa los espacios con tus propias palabras en: $1.", tr: [1] },
      { re: /^Add more of your own ideas for: (.+)\. Use details from today\.$/, es: "Agrega más ideas propias en: $1. Usa detalles de hoy.", tr: [1] },
      { re: /^Level (\d) of 4 · let's fix this$/, es: "Nivel $1 de 4 · vamos a corregirlo" },
      { re: /^Level (\d) of 4 · almost there$/, es: "Nivel $1 de 4 · ya casi" },
      { re: /^Level (\d) of 4 · nice work$/, es: "Nivel $1 de 4 · buen trabajo" },
      { re: /^Level (\d) of 4 · excellent$/, es: "Nivel $1 de 4 · excelente" },
      { re: /^Picture didn't load \((.+)\)\.$/, es: "La imagen no cargó ($1).", tr: [1] },
      { re: /^Picture didn't load\.$/, es: "La imagen no cargó." },
      { re: /^(.+) →$/, es: "$1 →", tr: [1] }
    ]
  }, true);

  // Pop-up questions ("Start over?") in Spanish too.
  const nativeConfirm = window.confirm, nativeAlert = window.alert;
  window.confirm = m => nativeConfirm.call(window, t(m));
  window.alert = m => nativeAlert.call(window, t(m));

  function startSwapping() {
    if (lang !== "es" || !hasPage) return;
    document.documentElement.lang = "es";
    if (document.title) document.title = t(document.title);
    walk(document.body);
  }

  // Watch from the very start so nothing flashes in English.
  if (lang === "es") {
    new MutationObserver(list => { if (hasPage) onMutations(list); })
      .observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS.concat(["value"]) });
  }
  // Fill in the student's name (saved by his home page) in empty name boxes.
  let myName = "";
  try { myName = optIn ? localStorage.getItem("site-student-name") || "" : ""; } catch (e) {}
  function fillName() {
    if (!myName) return;
    document.querySelectorAll("input").forEach(input => {
      if (input.value || (input.type && !/text|search/.test(input.type))) return;
      const tag = (input.id + " " + input.name + " " + (input.placeholder || "")).toLowerCase();
      if (!/student.?name|turn.?name|your name|namebox|^name | name$|first and last|first name|nombre/.test(tag) && input.id.toLowerCase() !== "name") return;
      input.value = myName;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }
  if (myName) new MutationObserver(fillName).observe(document.documentElement, { childList: true, subtree: true });

  function ready() { drawSwitch(); startSwapping(); fillName(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
