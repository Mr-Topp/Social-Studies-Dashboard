// =====================================================================
//  Sociology Unit 3 Day 6 · Sociology Case File (Unit 3 test review project), v2.
//  Students pick ANY real person, type their own facts, and upload photos. Screens in strict order:
//  your person → for each test part (Soc.9, Soc.4, Soc.10, Soc.11): quick test checks, then that part of the
//  case file (what they type is collected) → headline → the printable infographic + turn in.
//  Students never see scores; the first-try count goes only to the teacher dashboard.
//  Photos stay on the Chromebook (for the infographic); only the writing goes to the dashboard.
//  Progress saves on the device ("Welcome back"). Test T. can skip everything (🧪 bar).
// =====================================================================
(function () {
  "use strict";
  const G = window.CF;
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const LOCK = 3;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isT = () => !!(window.classIsTestT && window.classIsTestT());
  const SECS = G.sections;
  const secById = id => SECS.find(s => s.id === id);
  const ICONS = ["⭐", "🏀", "⚽", "🎤", "🎮", "🎬", "📚", "🥊"];

  // ---------- screens ----------
  const SCREENS = [{ kind: "person", label: "Your person" }];
  SECS.forEach(s => {
    s.checks.forEach((c, i) => SCREENS.push({ kind: "check", sec: s.id, check: c, label: s.name + ": test check " + (i + 1) }));
    SCREENS.push({ kind: "entry", sec: s.id, label: s.name + ": case file" });
  });
  SCREENS.push({ kind: "headline", label: "Headline" });
  SCREENS.push({ kind: "poster", label: "Infographic + turn in" });
  const N = SCREENS.length;
  const CHECKS = SCREENS.filter(x => x.kind === "check");

  // ---------- state ----------
  const fresh = () => ({ v: 2, name: "", step: -1, who: "", known: "", noPhoto: false, icon: "⭐", done: {}, miss: {}, e: {}, headline: "", turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(G.key)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 2 || !st.done) st = fresh();
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    if (now && st.name && now !== st.name.trim().toLowerCase()) { st = fresh(); localStorage.removeItem(G.key + ":photos"); }
  } catch (e) {}
  let photos = {};
  try { photos = JSON.parse(localStorage.getItem(G.key + ":photos")) || {}; } catch (e) { photos = {}; }
  let photoSaveFailed = false;
  const save = () => { try { localStorage.setItem(G.key, JSON.stringify(st)); } catch (e) {} };
  const savePhotos = () => { try { localStorage.setItem(G.key + ":photos", JSON.stringify(photos)); photoSaveFailed = false; } catch (e) { photoSaveFailed = true; } };
  const E = id => (st.e[id] = st.e[id] || {});
  const who = () => st.who.trim() || "your person";
  let timers = [];
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  let solveFn = null;

  // ---------- frame ----------
  document.body.insertAdjacentHTML("afterbegin", `<div class="hud noprint" id="hud" hidden aria-label="Your progress"><div class="hud-in">
      <span class="brand">SOCIOLOGY CASE FILE</span><div class="prog" aria-hidden="true"><span id="progFill"></span></div>
      <span class="stepct" id="stepCt"></span></div></div>
    <main id="wrap"><p class="welcome noprint" id="welcome" role="status" hidden></p><section id="app" aria-live="polite"></section>
      <div class="foot noprint">Progress saves on this device. Your teacher sees your work after you turn it in. <button type="button" id="restartBtn">Start over</button></div></main>`);
  const app = $("app");
  function hud() {
    $("hud").hidden = st.step < 0;
    if (st.step < 0) return;
    $("progFill").style.width = Math.round(Math.min(st.step + 1, N) / N * 100) + "%";
    $("stepCt").textContent = "Step " + (st.step + 1) + " of " + N;
  }
  const toTop = () => window.scrollTo(0, 0);
  function go(i) { clearTimers(); st.step = Math.max(0, Math.min(i, N - 1)); save(); render(); toTop(); }
  const backBtn = () => st.step > 0 ? `<button type="button" class="backbtn" id="backBtn">← Back</button>` : "";
  const bindBack = () => { const b = $("backBtn"); if (b) b.onclick = () => go(st.step - 1); };
  const photoImg = (key, cls) => photos[key] ? `<img class="${cls}" src="${photos[key]}" alt="">` : "";

  // ---------- photos: shrink on the Chromebook, keep only on this device ----------
  function readPhoto(file, done) {
    if (!file || !/^image\//.test(file.type)) return done("That isn't a picture. Pick a JPG or PNG.");
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 700, k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        done("", c.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = () => done("That picture didn't open. Try saving a different one.");
      img.src = fr.result;
    };
    fr.onerror = () => done("That picture didn't open. Try again.");
    fr.readAsDataURL(file);
  }
  function photoBox(key, label, required) {
    return `<div class="photobox" data-key="${key}"><div class="pprev" id="pp_${key}">${photos[key] ? `<img src="${photos[key]}" alt="Your photo">` : `<span>📷</span>`}</div>
      <div><p class="plabel">${esc(label)}</p>
      <label class="photobtn">${photos[key] ? "Change photo" : "＋ Add photo"}<input type="file" accept="image/*" id="pf_${key}" hidden></label>
      ${photos[key] && !required ? `<button type="button" class="linkbtn" id="px_${key}">Remove</button>` : ""}
      <p class="phelp">How: search Google Images → right-click the picture → <b>Save image as…</b> → then tap Add photo and pick it from Downloads.</p>
      <p class="msg" id="pm_${key}" role="status"></p></div></div>`;
  }
  function bindPhoto(key, after) {
    const inp = $("pf_" + key); if (!inp) return;
    inp.onchange = () => readPhoto(inp.files[0], (err, url) => {
      if (err) { $("pm_" + key).textContent = err; $("pm_" + key).className = "msg bad"; return; }
      photos[key] = url; savePhotos();
      if (photoSaveFailed) { $("pm_" + key).textContent = "Photo added, but this Chromebook is low on space, so it won't stay if you leave the page."; $("pm_" + key).className = "msg bad"; }
      after && after();
    });
    const x = $("px_" + key); if (x) x.onclick = () => { delete photos[key]; savePhotos(); after && after(); };
  }

  // ---------- title ----------
  function intro() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title-card">
      <p class="eyebrow">Sociology · Unit 3 · Day 6 · Test review project</p>
      <h1 class="big-title">SOCIOLOGY CASE FILE<small>Pick anyone. Prove sociology made them who they are.</small></h1>
      <p class="hook">Your favorite athlete, singer, creator, or hero. You find the facts and the photos. We turn it into an infographic.</p>
      <div class="title-tiles"><span>🧑 <b>Anyone</b> real</span><span>📷 Your photos</span><span>🗂️ <b>4</b> case-file parts = the <b>4</b> test parts</span><span>✓ <b>9</b> quick test checks</span><span>🖼️ Ends in a printable infographic</span><span>⏱ <b>45</b> min</span></div>
      <p class="goal"><b>Today's goal:</b> Review every part of the Unit 3 test by using it on one real person.</p>
      <ol class="steps"><li>Pick a real person and add their photo.</li><li>For each test part: answer quick checks, then fill in that part with real facts about your person.</li><li>Everything you type becomes your infographic. Print it and turn it in.</li></ol>
      <div class="title-start" style="margin-top:12px"><div class="namebox"><label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(pre)}"></div>
        <button type="button" class="big" id="startBtn">Open the case file →</button></div>
      <p id="introMsg" class="msg center" role="status"></p>
      <details class="small-print"><summary>Iowa standards for today</summary>${G.stdText.map(s => `<p><b>${esc(s[0])}</b> ${esc(s[1])}</p>`).join("")}</details></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ \p{Lu}\.$/u.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad center"; $("nameBox").focus(); return; }
      st.name = fixed;
      try { if (!localStorage.getItem("site-student-name")) localStorage.setItem("site-student-name", fixed); } catch (e) {}
      go(0);
      try { if (window.classTestSkip) window.classTestSkip.refresh(); } catch (e) {}
    };
    solveFn = null;
  }

  // ---------- 1. your person ----------
  function personView() {
    app.innerHTML = `<section class="scene anim"><p class="kicker">Step 1 · Your case</p><h2>Who's your case file on?</h2>
      <div class="grid">
        <div class="panel">
          <label class="flabel" for="celeb">Who is it? (a real person, full name)</label>
          <input class="fin" id="celeb" maxlength="40" autocomplete="off" placeholder="Like: Bad Bunny" value="${esc(st.who)}">
          <p class="ideas"><b>Need an idea?</b> ${G.ideas.map(n => `<button type="button" class="idea" data-n="${esc(n)}">${esc(n)}</button>`).join("")}</p>
          <label class="flabel" for="known">What are they known for?</label>
          <input class="fin" id="known" maxlength="60" autocomplete="off" placeholder="Like: Puerto Rican rapper and singer" value="${esc(st.known)}">
          <p class="phelp">Pick someone you can find real facts about. You'll look things up as you go.</p>
        </div>
        <div class="panel">
          ${st.noPhoto ? `<p class="flabel">Pick an icon instead of a photo</p><div class="icons">${ICONS.map(i => `<button type="button" class="iconpick${st.icon === i ? " on" : ""}" data-i="${i}">${i}</button>`).join("")}</div>
             <button type="button" class="linkbtn" id="photoAgain">I can add a photo after all</button>`
            : `${photoBox("main", "Main photo of your person", true)}<button type="button" class="linkbtn" id="noPhotoBtn">My Chromebook won't let me save pictures</button>`}
        </div></div>
      <p id="pMsg" class="msg" role="status"></p>
      <div class="rowend">${backBtn()}<button type="button" class="next" id="nextBtn">Start the case file →</button></div></section>`;
    bindBack();
    $("celeb").oninput = ev => { st.who = ev.target.value; save(); };
    $("known").oninput = ev => { st.known = ev.target.value; save(); };
    app.querySelectorAll(".idea").forEach(b => b.onclick = () => { st.who = b.dataset.n; $("celeb").value = st.who; save(); });
    bindPhoto("main", () => render());
    const np = $("noPhotoBtn"); if (np) np.onclick = () => { st.noPhoto = true; save(); render(); };
    const pa = $("photoAgain"); if (pa) pa.onclick = () => { st.noPhoto = false; save(); render(); };
    app.querySelectorAll(".iconpick").forEach(b => b.onclick = () => { st.icon = b.dataset.i; save(); render(); });
    $("nextBtn").onclick = () => {
      const m = $("pMsg"); m.className = "msg bad";
      if (!isT()) {
        if (!/\S+\s+\S+/.test(st.who.trim()) && st.who.trim().length < 4) { m.textContent = "Type your person's full name."; return; }
        if (st.known.trim().length < 6) { m.textContent = "Say what they're known for."; return; }
        if (!photos.main && !st.noPhoto) { m.textContent = "Add a photo of your person (or tap the link if your Chromebook won't save pictures)."; return; }
      }
      go(st.step + 1);
    };
    solveFn = () => { if (!st.who) st.who = "Bad Bunny"; if (!st.known) st.known = "Puerto Rican rapper and singer"; if (!photos.main) st.noPhoto = true; save(); go(st.step + 1); };
  }

  // ---------- quick test checks (graded, first-try to dashboard) ----------
  function shuffled(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  let lastOrder = "";
  function order(c) {
    let o = shuffled(c.choices.map((t, i) => ({ t, i })));
    if (o.map(x => x.i).join("") === lastOrder && o.length > 1) o.push(o.shift());
    lastOrder = o.map(x => x.i).join("");
    return o;
  }
  const P = t => String(t).replace(/\{P\}/g, who());
  const face = () => photos.main ? `<img class="mini-face" src="${photos.main}" alt="">` : `<span class="mini-face emo">${st.noPhoto ? st.icon : "⭐"}</span>`;
  function checkView(scr) {
    const s = secById(scr.sec), c = scr.check;
    const nIn = s.checks.indexOf(c) + 1;
    app.innerHTML = `<section class="scene anim"><div class="checkcard"><span class="secbadge">${s.icon} ${esc(s.name)} · ${esc(s.sub)} · ${esc(s.short)}</span>
      <div class="entryhead">${face()}<div><p class="kicker">Quick test check ${nIn} of ${s.checks.length} · about ${esc(who())}</p><h2>${esc(P(c.q))}</h2></div></div>
      <div class="qbox" id="qbox"><div class="choices" id="choices"></div><p class="lock" id="lock"></p><div id="fb"></div></div>
      <div class="rowend">${backBtn()}<span id="nextSlot"></span></div></div></section>`;
    bindBack();
    const q = $("qbox");
    const setOff = off => q.querySelectorAll(".choice").forEach(b => b.disabled = off);
    const draw = () => {
      $("choices").innerHTML = order(c).map((x, i) => `<button type="button" class="choice" data-i="${x.i}"><span class="l">${"ABCD"[i]}</span><span>${esc(x.t)}</span></button>`).join("");
      q.querySelectorAll(".choice").forEach(b => b.onclick = () => pick(+b.dataset.i));
    };
    const finish = () => {
      setOff(true);
      const r = q.querySelector(`.choice[data-i="${c.answer}"]`); if (r) r.classList.add("right");
      $("lock").textContent = "";
      $("fb").innerHTML = `<div class="fb ok">✓ ${esc(c.why)}</div>`;
      $("nextSlot").innerHTML = `<button type="button" class="next" id="nextBtn">${SCREENS[st.step + 1].kind === "entry" ? "Now use it on " + esc(who()) : "Next"} →</button>`;
      $("nextBtn").onclick = () => go(st.step + 1);
      solveFn = null;
    };
    const pick = i => {
      if (st.done[c.id]) return;
      if (i === c.answer) {
        st.done[c.id] = true;
        if (window.classFirstTry) window.classFirstTry.right(c.id);
        save(); finish(); return;
      }
      st.miss[c.id] = (st.miss[c.id] || 0) + 1;
      if (window.classFirstTry) window.classFirstTry.wrong();
      save();
      q.classList.remove("shake"); void q.offsetWidth; q.classList.add("shake");
      $("fb").innerHTML = `<div class="fb no">Not quite. ${esc(P(c.hint))} The choices got mixed up.</div>`;
      draw(); setOff(true);
      let left = isT() ? 0 : LOCK;
      const tick = () => { if (left <= 0) { setOff(false); $("lock").textContent = ""; return; } $("lock").textContent = "Try again in " + left + "…"; left--; later(tick, 1000); };
      tick();
    };
    draw();
    solveFn = () => pick(c.answer);
    if (st.done[c.id]) finish();
  }

  // ---------- case-file part (collects what they type) ----------
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const TERM_WORDS = {
    "Family": ["family", "dad", "mom", "parent", "father", "mother", "grand", "brother", "sister", "uncle", "aunt"], "School": ["school", "coach", "teacher", "class"], "Peers": ["peer", "friend"],
    "Mass media": ["media", "tv", "news", "internet", "online", "youtube", "tiktok", "instagram", "radio", "magazine"], "Religion": ["religion", "religious", "faith", "church", "islam", "god", "pray", "mosque", "temple"],
    "The workplace": ["work", "job", "boss", "career"], "Strain theory": ["strain"], "Differential association": ["differential", "association"],
    "Labeling theory": ["label"], "Looking-glass self": ["looking", "glass", "mirror"], "Generalized other": ["generalized", "general"]
  };
  const visible = (s, f) => !f.showIf || E(s.id)[f.showIf[0]] === f.showIf[1];
  function fieldHtml(s, f, n) {
    const v = E(s.id)[f.id] || "";
    const head = `<h3><span class="n">${n}</span>${esc(f.label)}</h3>${f.help ? `<p class="fhelp">${esc(f.help)}</p>` : ""}`;
    if (f.type === "pick") return `<div class="stage" id="fs_${f.id}">${head}<div class="terms">${f.options.map(o => `<button type="button" class="term${v === o ? " on" : ""}" data-f="${f.id}" data-t="${esc(o)}">${esc(o)}</button>`).join("")}</div>${v && G.defs[v] ? `<p class="termdef">${esc(v)}: ${esc(G.defs[v])}</p>` : ""}</div>`;
    if (f.type === "text") return `<div class="stage" id="fs_${f.id}">${head}<textarea class="ftext" rows="${f.min > 10 ? 2 : 1}" id="f_${s.id}_${f.id}" data-f="${f.id}" placeholder="${esc(f.ph || "")}" data-starter="">${esc(v)}</textarea></div>`;
    if (f.type === "write") return `<div class="stage" id="fs_${f.id}"><h3><span class="n">${n}</span>Write it</h3><label for="f_${s.id}_${f.id}">${esc(f.label)}</label>
      <p class="stem"><b>Start like this:</b> ${esc(f.stem)}</p><textarea id="f_${s.id}_${f.id}" data-f="${f.id}" rows="4" data-starter="${esc(f.stem)}">${esc(v)}</textarea></div>`;
    if (f.type === "photo") return `<div class="stage optional" id="fs_${f.id}">${photoBox(s.id, f.label, false)}</div>`;
    return "";
  }
  function entryView(scr) {
    const s = secById(scr.sec);
    let n = 0;
    const fields = s.fields.filter(f => visible(s, f));
    app.innerHTML = `<section class="scene anim"><span class="secbadge">${s.icon} ${esc(s.name)} · ${esc(s.sub)} · ${esc(s.short)}</span>
      <div class="entryhead">${photos.main ? `<img class="mini-face" src="${photos.main}" alt="">` : `<span class="mini-face emo">${st.noPhoto ? st.icon : "⭐"}</span>`}
        <div><p class="kicker">Case file · ${esc(who())}</p><h2>${esc(s.poster)}</h2></div></div>
      <p class="mute" style="margin:0 0 8px">Use real facts. Look them up if you need to. Everything here goes on your infographic.</p>
      <div class="fields">${fields.map(f => fieldHtml(s, f, f.type === "photo" ? "" : ++n)).join("")}</div>
      <p id="entryMsg" class="msg" role="status"></p>
      <div class="rowend">${backBtn()}<button type="button" class="next" id="nextBtn">Save this part →</button></div></section>`;
    bindBack();
    app.querySelectorAll(".term").forEach(b => b.onclick = () => {
      const d = E(s.id); d[b.dataset.f] = b.dataset.t;
      if (b.dataset.f === "theory" && b.dataset.t !== "Strain theory") delete d.mode;
      save(); keepScroll(() => entryView(scr));
    });
    app.querySelectorAll("textarea[data-f]").forEach(t => t.addEventListener("input", ev => { E(s.id)[t.dataset.f] = ev.target.value; save(); }));
    bindPhoto(s.id, () => keepScroll(() => entryView(scr)));
    $("nextBtn").onclick = () => {
      const prob = entryProblem(s);
      if (prob) { $("entryMsg").textContent = prob; $("entryMsg").className = "msg bad"; return; }
      go(st.step + 1);
    };
    solveFn = () => { fillSection(s); save(); entryView(scr); };
  }
  function keepScroll(fn) { const y = window.scrollY; fn(); window.scrollTo(0, y); }
  function fillSection(s) {
    const d = E(s.id);
    s.fields.forEach(f => {
      if (d[f.id]) return;
      if (f.type === "pick" && visible(s, f)) d[f.id] = f.options[0];
      if (f.type === "text") d[f.id] = "Test T. sample fact for this part.";
      if (f.type === "write") d[f.id] = "Test T. sample answer: " + f.stem.replace(/___/g, "…");
    });
  }
  function entryProblem(s) {
    if (isT()) return "";
    const d = E(s.id);
    for (const f of s.fields) {
      if (!visible(s, f) || f.type === "photo") continue;
      const v = String(d[f.id] || "").trim();
      const short = f.label.replace(/[:?].*$/, "");
      if (f.type === "pick" && !v) return "Pick an answer for: " + short + ".";
      if (f.type === "text") {
        if (v.length < f.min) return f.min > 10 ? "Write a full sentence for: " + short + "." : "Fill in: " + short + ".";
        const box = $("f_" + s.id + "_" + f.id);
        if (f.min > 10 && window.classJunkStop && box) { const j = window.classJunkStop(box, { source: "about your person" }); if (j) return j; }
      }
      if (f.type === "write") {
        const box = $("f_" + s.id + "_" + f.id);
        if (window.classJunkStop && box) { const j = window.classJunkStop(box, { starter: f.stem, source: "about your person" }); if (j) return j; }
        if (v.length < 60) return "Write a little more in Write it (at least 2 full sentences).";
        if (/_{2,}/.test(v)) return "Fill in the blanks with your own words.";
        if (f.mustTerm) {
          const term = d[f.mustTerm] || "";
          const words = (TERM_WORDS[term] || []).concat([plain(term)]);
          if (term && !words.some(w => plain(v).includes(w))) return "Use the idea you picked (" + term + ") in Write it.";
        }
        if (!/\b(because|since|so|for example|example|shows?)\b/i.test(v)) return "Explain it. Use \"because\" or \"for example.\"";
      }
    }
    return "";
  }

  // ---------- headline ----------
  function headlineView() {
    app.innerHTML = `<section class="scene anim"><p class="kicker">Almost done · ${esc(who())}</p><h2>Give your case file a headline</h2>
      <label for="hl"><b>One line that sums up what made ${esc(who())} who they are.</b></label>
      <input class="headline-in" id="hl" maxlength="70" autocomplete="off" value="${esc(st.headline)}" placeholder="Write your headline">
      <ul class="examples"><li>Like: "Raised on a public court, built for No. 1"</li><li>Like: "Doubted, booed, and still the greatest"</li></ul>
      <p id="hlMsg" class="msg" role="status"></p>
      <div class="rowend">${backBtn()}<button type="button" class="next" id="nextBtn">Build my infographic →</button></div></section>`;
    bindBack();
    $("hl").oninput = ev => { st.headline = ev.target.value; save(); };
    $("nextBtn").onclick = () => {
      const v = st.headline.trim();
      if (!isT() && (v.split(/\s+/).length < 3 || v.length < 12)) { $("hlMsg").textContent = "Write a headline with at least 3 words."; $("hlMsg").className = "msg bad"; return; }
      go(st.step + 1);
    };
    solveFn = () => { if (!st.headline) st.headline = "Test T. sample headline"; save(); go(st.step + 1); };
  }

  // ---------- the infographic ----------
  const chip = t => t ? `<span class="chip">${esc(t)}</span>` : "";
  const line = (label, txt) => txt ? `<p class="ev"><i>${esc(label)}</i>${esc(txt)}</p>` : "";
  const mine = txt => `<p class="mine"><i>My case</i>${esc(txt || "—")}</p>`;
  function panel(s, inner) {
    return `<div class="pp"><p class="pt"><span class="ic">${s.icon}</span><b>${esc(s.name)}</b><span class="sd">${esc(s.short)}</span></p>
      <p class="q">${esc(s.poster)}</p>${photoImg(s.id, "pphoto")}${inner}</div>`;
  }
  function posterHtml() {
    const r = E("raised"), u = E("rule"), m = E("mirror"), c = E("crew");
    const used = [r.agent, r.stage, u.theory, u.mode, m.idea].filter(Boolean);
    if (/conformity/i.test(c.push || "")) used.push("Conformity");
    const extra = [...new Set(used)].filter(t => !G.vocab.includes(t) && G.defs[t]);
    return `<article class="poster">
      <header class="ph">${photos.main ? `<img class="pe img" src="${photos.main}" alt="Photo of ${esc(who())}">` : `<span class="pe">${st.noPhoto ? st.icon : "⭐"}</span>`}
        <div><p class="eye">Sociology case file</p><h1>${esc(who())}</h1><p class="known">${esc(st.known)}</p>
        <p class="hl">"${esc(st.headline || "")}"</p><p class="by">Case file by ${esc(st.name)} · Unit 3: Socialization, the Self &amp; Groups</p></div><span class="stamp">CASE CLOSED</span></header>
      <div class="pgrid">
        ${panel(secById("raised"), `${chip(r.agent)}<span class="chiplabel">agent of socialization</span>${line("The evidence", r.fact)}${mine(r.write)}
          <div class="subbox">${chip(r.stage)}${line("Another moment", r.stageFact)}</div>`)}
        ${panel(secById("rule"), `${line("The deviance", u.fact)}${line("Who made the rule", u.who)}${chip(u.theory)}${u.mode ? " " + chip(u.mode) : ""}${mine(u.write)}`)}
        ${panel(secById("mirror"), `${line("What happened", m.fact)}${chip(m.idea)}${mine(m.write)}`)}
        ${panel(secById("crew"), `<div class="groups"><div><i>Primary group</i>${esc(c.primary || "—")}</div><div><i>Secondary group</i>${esc(c.secondary || "—")}</div>
            <div><i>In-group (us)</i>${esc(c.ingroup || "—")}</div><div><i>Out-group (them)</i>${esc(c.outgroup || "—")}</div></div>
          ${line("How the group changed them", c.push)}${mine(c.write)}`)}
      </div>
      <div class="pkeys"><h3>🔑 The 9 test words</h3><ul>${G.vocab.map(t => `<li><b>${esc(t)}:</b> ${esc(G.defs[t])}</li>`).join("")}</ul>
        ${extra.length ? `<h3 style="margin-top:10px">More ideas I used</h3><ul>${extra.map(t => `<li><b>${esc(t)}:</b> ${esc(G.defs[t])}</li>`).join("")}</ul>` : ""}</div>
      <div class="pfoot"><span>Iowa: SS.9-12.Soc.4 · Soc.9 · Soc.10 · Soc.11</span><span>Facts and photos found by ${esc(st.name)}</span></div></article>`;
  }
  function posterView() {
    app.innerHTML = `<section class="scene anim"><p class="kicker noprint">Your infographic</p><h2 class="noprint">Case closed. Here's your infographic.</h2>
      <div class="posterwrap">${posterHtml()}</div>
      <div class="posteractions">${backBtn()}<button type="button" class="printbtn" id="printBtn">🖨️ Print it</button><button type="button" class="big" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn it in"}</button></div>
      <p id="sendMsg" class="msg center" role="status" aria-live="polite">${st.turnedIn ? "You already turned this in. You can go back, fix a part, and turn it in again." : "Check it over. Use ← Back to fix anything first."}</p>
      ${st.turnedIn ? `<p class="center"><span class="turned" id="turnedTag">✓ Turned in</span></p>` : ""}
      <p class="galnote mute noprint">This is your study sheet for the test. Every test word is on it.</p></section>`;
    bindBack();
    $("printBtn").onclick = () => window.print();
    $("sendBtn").onclick = send;
    solveFn = null;
  }

  // ---------- turn in ----------
  function buildAnswers() {
    const a = { "Standard": G.standard };
    const ft = list => list.filter(x => st.done[x.check.id] && !st.miss[x.check.id]).length;
    a["First-try correct"] = ft(CHECKS) + " of " + CHECKS.length;
    a["First-try by standard"] = SECS.map(s => { const l = CHECKS.filter(x => x.sec === s.id); return s.std + ": " + ft(l) + " of " + l.length; }).join(" · ");
    const tries = m => m ? " (after " + m + " wrong " + (m === 1 ? "try" : "tries") + ")" : " (first try)";
    CHECKS.forEach((x, i) => { const s = secById(x.sec); a[(i + 1) + ". " + s.short + " check: " + P(x.check.q)] = x.check.choices[x.check.answer] + tries(st.miss[x.check.id] || 0); });
    a["Person"] = who() + (st.known.trim() ? " (" + st.known.trim() + ")" : "");
    a["Photo added"] = photos.main ? "yes" : "no";
    const qs = [];
    SECS.forEach(s => {
      const d = E(s.id);
      s.fields.forEach(f => {
        if (f.type === "photo" || !visible(s, f)) return;
        const key = (f.type === "write" ? "Writing: " : "") + s.name + " (" + s.short + ") · " + f.label;
        a[key] = String(d[f.id] || "").trim();
        if (f.type === "write") qs.push(f.label + " (Starter: " + f.stem + ")");
        else if (f.type === "text") qs.push(f.label);
      });
    });
    a["Headline"] = st.headline.trim();
    a["Questions on the page"] = qs;
    return a;
  }
  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    if (!isT()) {
      const bad = SECS.find(s => !E(s.id).write || String(E(s.id).write).trim().length < 60);
      if (bad) { msg.textContent = "The " + bad.name + " part isn't finished. Go back and finish it."; msg.className = "msg bad center"; return; }
    }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className = "msg bad center"; return; }
    btn.disabled = true; msg.textContent = "Sending your case file…"; msg.className = "msg center";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: G.assignmentId, assignmentTitle: G.title, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your case file. Print your infographic if your teacher asks."; msg.className = "msg good center";
      btn.textContent = "Turned in ✓"; btn.disabled = false;
      if (!$("turnedTag")) msg.insertAdjacentHTML("afterend", `<p class="center"><span class="turned" id="turnedTag">✓ Turned in</span></p>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad center"; btn.disabled = false; }
  }

  // ---------- render ----------
  let firstRender = true;
  function screenOk(x) {
    if (x.kind === "person") return st.who.trim().length >= 4 && st.known.trim().length >= 6 && (!!photos.main || st.noPhoto);
    if (x.kind === "check") return !!st.done[x.check.id];
    if (x.kind === "entry") { const s = secById(x.sec), d = E(s.id); return s.fields.every(f => f.type === "photo" || !visible(s, f) || String(d[f.id] || "").trim().length >= (f.type === "write" ? 60 : f.type === "text" ? f.min : 1)); }
    if (x.kind === "headline") return st.headline.trim().length >= 12;
    return true;
  }
  function render() {
    clearTimers();
    if (!firstRender) $("welcome").hidden = true;
    firstRender = false;
    if (!isT() && st.step > 0) for (let i = 0; i < st.step; i++) if (!screenOk(SCREENS[i])) { st.step = i; save(); break; }
    hud();
    if (st.step < 0) return intro();
    const scr = SCREENS[st.step];
    if (scr.kind === "person") return personView();
    if (scr.kind === "check") return checkView(scr);
    if (scr.kind === "entry") return entryView(scr);
    if (scr.kind === "headline") return headlineView();
    return posterView();
  }
  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your case file and photos on this device.")) return;
    const name = st.name; st = fresh(); st.name = name; photos = {}; savePhotos();
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    save(); render(); toTop();
  };
  if (st.step >= 0) {
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " You're on step " + (st.step + 1) + " of " + N + ".")}</span> <button type="button" class="notyou" id="notYouBtn">Not you? Start fresh</button>`;
    $("welcome").hidden = false;
    $("notYouBtn").onclick = () => {
      st = fresh(); photos = {}; savePhotos();
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      try { localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      save(); location.reload();
    };
  }
  window.__cf = { get state() { return JSON.parse(JSON.stringify(st)); }, screens: SCREENS.map(x => x.kind + ":" + (x.sec || "") + ":" + (x.check ? x.check.id : "")), answers: () => buildAnswers() };
  render();

  // ---------- Test T. skip bar (shared/turnin.js) ----------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => N + 1,
      index: () => st.step + 1,
      label: i => i === 0 ? "Title" : "Step " + i + ": " + SCREENS[i - 1].label,
      go: i => {
        if (!st.name) st.name = "Test T.";
        const t = i - 1;
        for (let j = 0; j < t && j < N; j++) {
          const x = SCREENS[j];
          if (x.kind === "person") { if (!st.who) st.who = "Bad Bunny"; if (!st.known) st.known = "Puerto Rican rapper and singer"; if (!photos.main) st.noPhoto = true; }
          if (x.kind === "check") st.done[x.check.id] = true;
          if (x.kind === "entry") fillSection(secById(x.sec));
          if (x.kind === "headline" && !st.headline) st.headline = "Test T. sample headline";
        }
        st.step = t; save(); render(); toTop();
      },
      solve: () => { if (solveFn) solveFn(); }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
