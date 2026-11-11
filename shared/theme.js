/* Dark mode for the teacher dashboard and the student home page (Fynn, 2026-11-11: "toggle button").
   Starts dark. A small moon/sun button in the bottom-right corner flips it, and each computer remembers its choice.
   How it works: instead of hand-writing a second copy of every color, this reads the page's own CSS (and any CSS
   that turnin.js / lang.js add later) and writes a dark twin of every color rule into one extra <style>.
   Light backgrounds become dark, dark text becomes light, and the grade colors keep their hue (green stays green).
   Load it in <head> right AFTER the page's <style> so there is no white flash. */
(function () {
  "use strict";
  var KEY = "ss-theme";
  var root = document.documentElement;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var mode = saved() === "light" ? "light" : "dark";

  /* ---------- color math ---------- */
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function parse(tok) {
    var t = tok.trim().toLowerCase(), m;
    if (t === "white") return [255, 255, 255, 1];
    if (t === "black") return [0, 0, 0, 1];
    if ((m = t.match(/^#([0-9a-f]{3,8})$/))) {
      var h = m[1];
      if (h.length === 3 || h.length === 4) h = h.split("").map(function (c) { return c + c; }).join("");
      if (h.length !== 6 && h.length !== 8) return null;
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16),
        h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
    }
    if ((m = t.match(/^rgba?\(([^)]+)\)$/))) {
      var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
      if (p.length < 3) return null;
      return [p[0], p[1], p[2], p.length > 3 ? (String(m[1]).indexOf("%") > -1 && p[3] > 1 ? p[3] / 100 : p[3]) : 1];
    }
    return null;
  }
  function toHsl(c) {
    var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    var l = (mx + mn) / 2, s = 0, h = 0, d = mx - mn;
    if (d) {
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function fromHsl(h, s, l, a) {
    function f(n) { var k = (n + h * 12) % 12, x = s * Math.min(l, 1 - l); return Math.round(255 * (l - x * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); }
    var r = f(0), g = f(8), b = f(4);
    return a < 1 ? "rgba(" + r + "," + g + "," + b + "," + (+a.toFixed(3)) + ")" : "rgb(" + r + "," + g + "," + b + ")";
  }
  function lum(c) {
    var v = [c[0], c[1], c[2]].map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

  var PAPER = "#12181f", CARD = "#1b242d";
  function isHighlight(hsl) { return hsl[1] > 0.7 && hsl[2] > 0.7 && hsl[2] < 0.87; }  // e.g. the peach "Start" buttons
  // role: "bg" | "text" | "line" | "onhi" (text sitting on a highlight button)
  function mapColor(tok, role) {
    var c = parse(tok);
    if (!c) return tok;
    var hsl = toHsl(c), h = hsl[0], s = hsl[1], l = hsl[2], a = c[3];
    if (role === "bg") {
      if (a < 0.6) return tok;                         // see-through tints already work on dark
      if (Math.abs(c[0] - 244) + Math.abs(c[1] - 239) + Math.abs(c[2] - 228) < 6) return PAPER;   // the page
      if (l >= 0.985) return CARD;                     // white cards and rows
      if (isHighlight(hsl)) return fromHsl(h, s * 0.85, 0.72, a);
      if (l < 0.5) return fromHsl(h, Math.min(s, 0.55), clamp(l, 0.27, 0.40), a);  // navy / red / green buttons stay solid
      return fromHsl(h, s < 0.4 ? s * 0.35 : Math.min(s, l > 0.94 ? 0.25 : 0.45), clamp(0.13 + (0.985 - l) * 1.1, 0.15, 0.40), a);
    }
    if (role === "line") {
      if (a < 0.6) return tok;
      if (l >= 0.6) return fromHsl(h, s < 0.4 ? s * 0.3 : Math.min(s, 0.3), clamp(0.2 + (1 - l) * 0.7, 0.22, 0.42), a);
      return fromHsl(h, Math.min(s, 0.65), 0.93 - l * 0.45, a);
    }
    if (role === "onhi") return fromHsl(h, Math.min(s, 0.6), 0.16, a);
    // text
    if (l >= 0.6) return tok;
    return fromHsl(h, Math.min(s, 0.65), 0.93 - l * 0.45, a);
  }
  var COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|\bwhite\b|\bblack\b/g;
  function mapValue(v, role) { return v.replace(COLOR_RE, function (t) { return mapColor(t, role); }); }

  /* ---------- reading the page's CSS ---------- */
  var vars = {};
  function readVars() {
    var cs = getComputedStyle(root);
    for (var i = 0; i < cs.length; i++) { var n = cs[i]; if (n.indexOf("--") === 0) vars[n] = cs.getPropertyValue(n).trim(); }
  }
  function resolve(v) {
    for (var k = 0; k < 4 && v.indexOf("var(") > -1; k++)
      v = v.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g, function (m, n, fb) { return vars[n] != null && vars[n] !== "" ? vars[n] : (fb || m); });
    return v;
  }
  function roleOf(prop) {
    if (prop === "color" || prop === "caret-color" || prop === "fill" || prop === "-webkit-text-fill-color") return "text";
    if (prop.indexOf("background") === 0) return "bg";
    if (prop.indexOf("border") === 0 || prop.indexOf("outline") === 0 || prop === "box-shadow" || prop === "text-decoration-color" || prop === "stroke" || prop === "accent-color") return "line";
    return null;
  }
  function splitDecls(text) {
    var out = [], depth = 0, cur = "", q = null;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (q) { cur += ch; if (ch === q) q = null; continue; }
      if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
      if (ch === "(") depth++; else if (ch === ")") depth--;
      if (ch === ";" && depth === 0) { out.push(cur); cur = ""; } else cur += ch;
    }
    if (cur.trim()) out.push(cur);
    return out;
  }
  // Turns one rule's declarations into dark ones. Returns "" if nothing in it is a color.
  function darkDecls(cssText) {
    var items = [];
    splitDecls(cssText).forEach(function (d) {
      var i = d.indexOf(":"); if (i < 0) return;
      var prop = d.slice(0, i).trim().toLowerCase(), val = d.slice(i + 1).trim(), imp = "";
      if (/!important\s*$/i.test(val)) { imp = " !important"; val = val.replace(/!important\s*$/i, "").trim(); }
      if (prop.indexOf("--") === 0) return;
      var role = roleOf(prop); if (!role) return;
      var r = resolve(val);
      if (!COLOR_RE.test(r)) { COLOR_RE.lastIndex = 0; return; }
      COLOR_RE.lastIndex = 0;
      items.push({ prop: prop, raw: r, role: role, imp: imp });
    });
    if (!items.length) return "";
    var bg = null, txt = null;
    items.forEach(function (it) {
      if (it.role === "bg") { var m = it.raw.match(COLOR_RE); COLOR_RE.lastIndex = 0; if (m && m.length === 1) bg = it; }
      if (it.prop === "color") txt = it;
    });
    var hi = bg && (function () { var c = parse(bg.raw.match(COLOR_RE)[0]); COLOR_RE.lastIndex = 0; return c && c[3] >= 0.6 && isHighlight(toHsl(c)); })();
    items.forEach(function (it) {
      var role = it.role === "text" && hi ? "onhi" : it.role;
      it.out = mapValue(it.raw, role);
    });
    // Safety net: if this rule sets both a background and a text color, make sure they still read clearly.
    if (bg && txt) {
      var b = parse(bg.out.match(COLOR_RE) ? bg.out.match(COLOR_RE)[0] : ""), t = parse(txt.out);
      COLOR_RE.lastIndex = 0;
      if (b && t && b[3] >= 0.6 && contrast(b, t) < 4.2) txt.out = lum(b) > 0.25 ? "#111820" : "#eef2f5";
    }
    return items.map(function (it) { return it.prop + ":" + it.out + it.imp; }).join(";");
  }
  function walk(rules, out) {
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.type === 1) {                                  // style rule
        var d = darkDecls(r.style.cssText);
        if (d) out.push(r.selectorText + "{" + d + "}");
      } else if (r.type === 4 || r.type === 12) {          // @media / @supports
        var inner = []; walk(r.cssRules, inner);
        if (inner.length) out.push("@" + (r.type === 4 ? "media " + r.media.mediaText : "supports " + r.conditionText) + "{" + inner.join("\n") + "}");
      }
    }
  }

  /* ---------- the dark stylesheet ---------- */
  var darkEl = document.createElement("style");
  darkEl.id = "ss-dark";
  var BASE = "html{color-scheme:dark;background:" + PAPER + "}\n" +
    "html,body{background-color:" + PAPER + "}\n" +
    "img:not([src$='.svg']){filter:brightness(.92)}\n" +
    "a:not([class]){color:#9cc6ff}\n" +
    "::selection{background:#35587a;color:#fff}\n";
  var done = new WeakSet ? new WeakSet() : null;
  var chunks = [];
  function sheetText(sheet) {
    try { var out = []; walk(sheet.cssRules, out); return out.join("\n"); } catch (e) { return ""; }  // cross-site sheets can't be read
  }
  function build() {
    readVars();
    chunks = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      var s = document.styleSheets[i];
      if (s.ownerNode === darkEl) continue;
      chunks.push(sheetText(s));
    }
    darkEl.textContent = BASE + chunks.join("\n");
    keepLast();
  }
  function keepLast() {
    var head = document.head || root;
    if (head.lastElementChild !== darkEl) head.appendChild(darkEl);
  }
  function apply() {
    root.setAttribute("data-theme", mode);
    darkEl.disabled = mode !== "dark";
    if (darkEl.sheet) darkEl.sheet.disabled = mode !== "dark";
    fixInline(document.body || root);
    if (btn) {
      btn.textContent = mode === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.title = btn.getAttribute("aria-label");
    }
  }

  /* A few boxes get their color written right on the element (like the color key). Swap those too, and swap back. */
  function fixInline(scope) {
    if (!scope || !scope.querySelectorAll) return;
    var els = scope.querySelectorAll("[style]");
    for (var i = 0; i < els.length; i++) fixOne(els[i]);
    if (scope.hasAttribute && scope.hasAttribute("style")) fixOne(scope);
  }
  function fixOne(el) {
    if (el.id === "ss-theme-btn") return;
    var cur = el.getAttribute("style") || "";
    if (mode === "dark") {
      if (el.__ssDarkFor === cur) return;
      if (!/(color|background|border)/i.test(cur)) return;
      var d = darkDecls(cur);
      if (!d) return;
      el.__ssLight = cur;
      var next = cur.replace(/;?\s*$/, ";") + d;
      el.__ssDarkFor = next;
      el.setAttribute("style", next);
    } else if (el.__ssLight != null && el.__ssDarkFor === cur) {
      var back = el.__ssLight; el.__ssLight = null; el.__ssDarkFor = null;
      el.setAttribute("style", back);
    }
  }

  /* ---------- the button ---------- */
  var btn = null;
  function addButton() {
    if (btn || !document.body) return;
    btn = document.createElement("button");
    btn.id = "ss-theme-btn";
    btn.type = "button";
    btn.setAttribute("style", "position:fixed;right:14px;bottom:14px;z-index:9999;width:46px;height:46px;min-height:46px;border-radius:50%;border:1px solid rgba(127,127,127,.45);background:rgba(127,127,127,.18);backdrop-filter:blur(4px);font-size:22px;line-height:1;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,.18)");
    btn.addEventListener("click", function () {
      mode = mode === "dark" ? "light" : "dark";
      save(mode);
      if (mode === "dark") build();
      apply();
    });
    document.body.appendChild(btn);
    apply();
  }

  /* ---------- start ---------- */
  build();
  apply();
  function onReady() {
    build(); addButton(); apply();
    // turnin.js and lang.js add their own styles later, and the pages redraw parts of themselves; keep up with both.
    var pending = false;
    new MutationObserver(function (muts) {
      var restyle = false;
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === "attributes") { if (mode === "dark") fixOne(m.target); continue; }
        for (var j = 0; j < m.addedNodes.length; j++) {
          var n = m.addedNodes[j];
          if (n === darkEl || n.nodeType !== 1) continue;
          if (n.tagName === "STYLE" || (n.tagName === "LINK" && /stylesheet/i.test(n.rel))) restyle = true;
          else if (mode === "dark") fixInline(n);
        }
      }
      if (restyle && !pending) {
        pending = true;
        setTimeout(function () { pending = false; build(); apply(); }, 0);
      }
    }).observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
    window.addEventListener("load", function () { build(); apply(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReady);
  else onReady();
  window.ssTheme = { get: function () { return mode; }, rebuild: build };
})();
