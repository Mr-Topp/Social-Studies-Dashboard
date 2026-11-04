// =====================================================================
//  CASE FILE: WILSON'S PROMISE — World History Unit 1 Day 5
//  Students are reporters in Paris, 1919. Wilson promised that peoples
//  would be "governed only by their own consent." They open 5 case files
//  (Germany, Poland, India, China, Russia), read a real source and 3 case
//  notes, and stamp WHO decided that place's future. Only "the people
//  there" keeps the promise. Then Dyson's 1919 cartoon warns of the next
//  war, and students write a front page and turn in.
//  7 checks: the promise, 5 file stamps, Dyson's warning. 2 short writes.
//  Turn-in goes through shared/turnin.js (same address as the old page).
// =====================================================================
(function () {
  "use strict";
  const KEY = "did-they-choose-v1";
  const API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  const ID = "write-the-peace-treaty";
  const TITLE = "Day 5 · Treaty of Versailles: Did They Get to Choose?";
  const STANDARD = "SS.9-12.WH.31, SS.9-12.WH.29";
  const LOCK = 3;
  // A copy opened anywhere other than the real class site never sends work to the dashboard.
  const PREVIEW = !/(^|\.)neotboy\.github\.io$/.test(location.hostname);

  const $ = id => document.getElementById(id);
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const app = $("app");
  function el(html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }

  // ---------------- The five case files ----------------
  // Each file: 2 short lines, a real source, then 2 taps: Did they get to choose? (yes/no) and Why? (3 reasons, first is right).
  const FILES = [
    { id: "germany", place: "Germany", year: "1919", chose: false,
      source: { kind: "doc" },
      lines: ["The winners write the treaty. Germany is <b>not allowed</b> in the talks.",
              "Germany must take the blame, pay for war damage, and shrink its army."],
      q1: "Did Germany get to choose?",
      why: ["The winners wrote it, and Germany had to sign.", "Russia wrote it, and Germany had to sign.", "Japan wrote it, and Germany had to sign."],
      hint: "Read the two lines. Who wrote the treaty?",
      next: "Germans called it a <b>Diktat</b>: a forced peace." },
    { id: "poland", place: "Poland", year: "1918", chose: true,
      source: { kind: "img", src: "img/europe-1923-map.png", alt: "Map of Europe after World War I. New countries such as Poland, Czechoslovakia, Yugoslavia, Finland, Estonia, Latvia and Lithuania are labeled in red.",
        cap: "Europe after WWI. Red names are new countries. Map by Historicair and Fluteflute, <a href=\"https://commons.wikimedia.org/wiki/File:Map_Europe_1923-en.svg\" target=\"_blank\" rel=\"noopener\">CC BY-SA 2.5</a>, via Wikimedia Commons." },
      look: "Red names = new countries. Find POLAND.",
      lines: ["Poland was wiped off the map for <b>123 years</b>.",
              "In 1918, Poles set up their own country again."],
      q1: "Did the Poles get to choose?",
      why: ["Poles made their own country before the talks.", "Poles voted for it at the Paris peace talks.", "Poles won it in a war against France."],
      hint: "Read line 2. Who set up the new Poland, and when?",
      next: "Promise kept! But about <b>1 million Germans</b> now live in Poland, and Germany wants that land back." },
    { id: "india", place: "India", year: "1919", chose: false,
      source: { kind: "img", src: "img/india-soldiers-1914.jpg", alt: "Postcard photo of Indian soldiers with rifles marching through a French town in 1914.",
        cap: "Indian soldiers march in France, 1914. Postcard, National Army Museum, public domain." },
      look: "Indian soldiers marching in France to fight for Britain.",
      lines: ["Over <b>1 million</b> Indians served Britain in WWI.",
              "After the war, Britain keeps ruling India as a <b>colony</b> (a land ruled from far away)."],
      q1: "Did India get to choose?",
      why: ["Britain kept ruling India after the war.", "Japan took over India after the war.", "Lenin's army took over India after the war."],
      hint: "Read line 2. Who rules India after the war?",
      next: "1919: troops under a British general fire on a peaceful crowd in Amritsar. Hundreds die. Gandhi leads a peaceful fight for freedom. India is free in <b>1947</b>." },
    { id: "china", place: "China", year: "1919", chose: false,
      source: { kind: "img", src: "img/china-1915.jpg", alt: "1915 cartoon. A large figure labeled China holds a paper that says My Rights. A smaller figure labeled Japan holds a sign that says Demands.",
        cap: "Luther D. Bradley, <i>Chicago Daily News</i>, March 13, 1915. <a href=\"https://www.loc.gov/pictures/item/2009616341/\" target=\"_blank\" rel=\"noopener\">Library of Congress</a>, public domain." },
      look: "1915 cartoon: Japan holds DEMANDS. China holds MY RIGHTS.",
      lines: ["China helped the winners in WWI.",
              "But the winners give part of China, called <b>Shandong</b>, to Japan."],
      q1: "Did China get to choose?",
      why: ["The winners gave China's land to Japan.", "Britain took Shandong as its colony.", "Japan won Shandong in a war with China."],
      hint: "Read line 2. Who gave Shandong to Japan?",
      next: "<b>May 4, 1919:</b> Students march in Beijing. China refuses to sign the treaty.",
      nextImg: { src: "img/may-fourth-1919.jpg", alt: "Students carrying flags and banners march in Beijing, May 4, 1919.", cap: "Beijing students protest, May 4, 1919. Public domain." } },
    { id: "russia", place: "Russia", year: "1917–1918", chose: false,
      source: { kind: "img", src: "img/lenin-1920.jpg", alt: "Photo of Lenin speaking from a wooden stand to a large crowd of Red Army soldiers in Moscow, 1920.",
        cap: "Lenin speaks to Red Army soldiers in Moscow, May 5, 1920. Photo by G. Goldstein, public domain." },
      look: "Lenin speaks to his soldiers.",
      lines: ["1917: Lenin's party takes over Russia by force. This is a <b>revolution</b>.",
              "Russians vote for lawmakers. After one day, Lenin's soldiers send the lawmakers home."],
      q1: "Did Russians get to choose?",
      why: ["Lenin took power with guns and shut down the vote.", "The winners in Paris picked Russia's new leader.", "The tsar handed power to Lenin's party."],
      hint: "Read both lines. How did Lenin get power? What happened to the lawmakers?",
      next: "Russia wasn't even invited to Paris. In <b>1922</b>, Russia and nearby lands form the <b>Soviet Union</b>." }
  ];

  // ---------------- The two other checks ----------------
  const CHECKS = {
    promise: { std: "WH.31", short: "Check 1 · Wilson's promise",
      prompt: "Wilson promised that…",
      options: ["people choose their own government.", "winners choose the losers' government.", "strong nations protect the weak ones."],
      hint: "Look at the big blue line.",
      why: "This idea is called <b>self-determination</b>." },
    dyson: { std: "WH.29", short: "Check 7 · Dyson's warning",
      prompt: "Dyson drew this in 1919. What is he predicting?",
      options: ["This peace will cause another war.", "This peace will keep children safe.", "This treaty will end war for good."],
      hint: "“1940 Class” = boys old enough to be soldiers in 1940. Why is he crying?",
      why: "He was close. World War II began in <b>1939</b>." }
  };

  const STEPS = [
    { id: "promise", name: "The promise" },
    { id: "f0", name: "File 1: Germany" }, { id: "f1", name: "File 2: Poland" }, { id: "f2", name: "File 3: India" },
    { id: "f3", name: "File 4: China" }, { id: "f4", name: "File 5: Russia" },
    { id: "warning", name: "The warning" },
    { id: "front", name: "Front page and turn in" }
  ];

  // ---------------- Save ----------------
  const fresh = () => ({ step: -1, checks: {}, files: {}, hot: 0, miss: 0, headline: "", writing: { w1: "", w2: "" }, name: "", turnedIn: false });
  let st = null, hadSave = false;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) { st = null; }
  if (!st || typeof st !== "object" || typeof st.step !== "number") st = fresh(); else hadSave = true;
  ["checks", "files", "writing"].forEach(k => { if (!st[k] || typeof st[k] !== "object") st[k] = k === "writing" ? { w1: "", w2: "" } : {}; });
  // The older Write the Peace game used this same page address. Start first-try marks clean.
  if (!hadSave && window.classFirstTry) window.classFirstTry.reset();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // ---------------- Helpers ----------------
  function header() {
    const on = st.step >= 0;
    $("stepbox").hidden = !on; $("restartBtn").hidden = !on;
    if (on) {
      const s = Math.min(st.step, STEPS.length - 1);
      $("steptext").textContent = "Step " + (s + 1) + " of " + STEPS.length + ": " + STEPS[s].name;
      $("fill").style.width = Math.round(s / STEPS.length * 100) + "%";
    }
  }
  function nextBtn(label, fn) { const b = document.createElement("button"); b.type = "button"; b.className = "go"; b.textContent = label; b.onclick = fn; return b; }
  function advance() { st.step++; save(); render(); window.scrollTo(0, 0); }
  function scrollTo(sel) { const all = app.querySelectorAll(sel); if (all.length) { try { all[all.length - 1].scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {} } }
  function chief(text) { return `<div class="chief"><span class="face" aria-hidden="true">🗞️</span><p class="say"><span class="who">The Chief, your editor</span>${text}</p></div>`; }
  function zoomable(img) {
    img.style.cursor = "zoom-in"; img.title = "Click to zoom";
    img.addEventListener("click", () => {
      const o = el(`<div class="overlay" role="dialog" aria-label="Zoomed picture. Click to close."><img src="${img.src}" alt="${img.alt}"></div>`);
      o.onclick = () => o.remove(); document.body.appendChild(o);
    });
  }
  const isDone = f => !!(st.files[f.id] && st.files[f.id].done);
  function kept() { return FILES.filter(f => isDone(f) && f.chose).length; }
  function broken() { return FILES.filter(f => isDone(f) && !f.chose).length; }
  function boardHtml(now) {
    return `<div class="board">` + FILES.map((f, n) => {
      const done = isDone(f), cls = done ? (f.chose ? " kept" : " broken") : n === now ? " now" : " locked";
      const s = done ? (f.chose ? "✓ CHOSE" : "✗ NO CHOICE") : n === now ? "OPEN" : "🔒";
      return `<div class="pin${cls}"><span>📁 ${f.place}</span><span class="pin-s">${s}</span></div>`;
    }).join("") + `</div>`;
  }

  // ---------------- Multiple-choice check (reshuffles after every miss) ----------------
  let locked = false;
  const isTestT = () => !!(window.classIsTestT && window.classIsTestT());   // Test T. (teacher): no lockouts / gates / writing rules
  function checkWidget(id, onDone) {
    const q = CHECKS[id], box = document.createElement("div");
    const rec = st.checks[id] || (st.checks[id] = { done: false, wrong: 0 });
    if (rec.done) {
      box.className = "done-check";
      box.innerHTML = `<p class="right">✓ Right! ${/…$/.test(q.prompt) ? q.prompt.replace(/…$/, " ") : ""}${q.options[0]}</p><p>${q.why}</p>`;
      return box;
    }
    box.className = "check";
    box.innerHTML = `<p class="q">${q.prompt}</p><div class="choices"></div><p class="msg" role="status" aria-live="polite"></p>`;
    const area = box.querySelector(".choices"), fb = box.querySelector(".msg");
    let last = "";
    function draw() {
      area.replaceChildren();
      let order = shuffle(q.options.map((t, n) => ({ t, n })));
      if (order.map(o => o.n).join() === last) order.push(order.shift());
      last = order.map(o => o.n).join();
      order.forEach(o => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = o.t;
        b.onclick = () => {
          if (locked) return;
          if (o.n === 0) { rec.done = true; if (window.classFirstTry) window.classFirstTry.right("bp-" + id); save(); onDone(); return; }
          rec.wrong = (rec.wrong || 0) + 1; if (window.classFirstTry) window.classFirstTry.wrong(); save();
          miss(area, box, fb, q.hint, draw, rec.wrong, () => { locked = false; }, () => { locked = true; });
        };
        area.appendChild(b);
      });
    }
    draw();
    return box;
  }
  // Wrong answer: shake, a short pause (longer after repeat misses), then a fresh shuffle (no red mark left behind).
  function miss(area, box, fb, hint, redraw, wrongs, unlock, lock) {
    lock(); area.querySelectorAll("button").forEach(x => { x.disabled = true; });
    box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
    let left = isTestT() ? 0 : wrongs >= 2 ? LOCK + 2 : LOCK;
    const tick = () => {
      fb.className = "msg bad";
      if (left <= 0) { unlock(); fb.textContent = "Not quite. " + hint + " Try again."; redraw(); return; }
      fb.textContent = "Not quite. " + hint + " Try again in " + left + "…"; left--;
      setTimeout(tick, 1000);
    };
    tick();
  }

  // ---------------- Screens ----------------
  function titleScreen() {
    app.innerHTML = `<section class="card title-card">
      <div>
        <p class="kicker">World History · Day 5</p>
        <h1>Case File: Did They Get to Choose?</h1>
        <p class="hook">WWI is over. The winners promise: people get to pick their own government. Did they mean it?</p>
        <div class="facts"><span>📁 5 case files</span><span>👆 2 taps each</span><span>✍️ 2 short writes</span><span>⏱️ about 20 min</span></div>
        <p class="goal"><b>Today's goal:</b> Explain how the peace after WWI changed Germany, Poland, India, China, and Russia.</p>
        <button type="button" class="go big" id="startBtn">Start →</button>
        <p class="heads">Serious topic: war and protest deaths. No graphic images. Your work saves on this Chromebook.</p>
      </div>
      <div class="folder-art" aria-hidden="true"><div><b>CASE FILE</b><small>PARIS · 1919<br>5 PLACES · 1 QUESTION</small></div><span class="stamp">OPEN</span></div>
    </section>`;
    $("startBtn").onclick = () => { st.step = 0; save(); render(); window.scrollTo(0, 0); };
  }

  function promiseScreen() {
    const card = el(`<section class="card">
      <p class="kicker">Paris · 1919</p>
      <h2>The promise</h2>
      <div class="split">
        <div>
          <div class="wwi"><b>WWI (1914–1918):</b> Britain, France, and the U.S. beat Germany. About 20 million people died. Now the winners meet in Paris to write the peace: the <b>Treaty of Versailles</b>.</div>
          <figure class="source promise-photo"><img src="img/big-four-1919.jpg" alt="Photo of four leaders in suits standing outside a building in Paris, 1919.">
          <figcaption><span class="namebar"><span>Lloyd George, Britain</span><span>Orlando, Italy</span><span>Clemenceau, France</span><span>Wilson, USA</span></span>The winners' leaders in Paris, May 27, 1919. U.S. Army Signal Corps, public domain.</figcaption></figure>
        </div>
        <div>
          <p class="bigpromise">🇺🇸 Wilson's promise: <b>People get to choose their own government.</b></p>
          <p class="small">His words, Feb. 11, 1918: “Peoples may now be dominated and governed only by their own consent.”</p>
          <p>You're a reporter. Check 5 places. <b>Did the people there get to choose?</b></p>
        </div>
      </div>
    </section>`);
    app.appendChild(card);
    const side = card.querySelector(".split > div:last-child");
    side.appendChild(checkWidget("promise", () => { render(); scrollTo("button.go"); }));
    if (st.checks.promise && st.checks.promise.done) {
      side.appendChild(el(`<p class="howto">Each file: <b>1.</b> Did they get to choose? <b>2.</b> Why?</p>`));
      side.appendChild(nextBtn("Open file 1 →", advance));
    }
  }

  function germanyDoc() {
    return `<figure class="source"><div class="doc">
      <p class="doc-h">📜 Treaty of Versailles, Article 231 (1919)</p>
      <p class="doc-text">“…Germany accepts the responsibility of Germany and her allies for causing all the loss and damage…”</p>
      <p class="plain">= Germany takes the blame for the whole war.</p>
      <ul class="terms"><li>🪖 Army: <b>100,000</b> soldiers max</li><li>💰 Pay for war damage</li><li>🗺️ Loses <b>13%</b> of its land</li><li>🌍 Loses all its colonies</li></ul>
    </div><figcaption>Treaty of Versailles: Article 231 (blame), Article 160 (army), Part III (land), Article 119 (colonies). Signed June 28, 1919.</figcaption></figure>`;
  }

  // A file: 1) Did they get to choose? (yes/no)  2) Why? (3 reasons)
  let fileLock = false;
  function fileScreen(n) {
    const f = FILES[n], rec = st.files[f.id] || {};
    const card = el(`<section class="card">
      ${boardHtml(n)}
      <div class="split">
        <div class="src-slot"></div>
        <div>
          <h2>📁 ${f.place} <span class="yr">File ${n + 1} of 5 · ${f.year}</span></h2>
          ${f.look ? `<p class="look">👀 ${f.look}</p>` : ""}
          <div class="lines">${f.lines.map(t => `<p>${t}</p>`).join("")}</div>
          <div class="verdict"></div>
        </div>
      </div>
    </section>`);
    app.appendChild(card);
    const slot = card.querySelector(".src-slot");
    if (f.source.kind === "doc") slot.outerHTML = germanyDoc();
    else {
      slot.outerHTML = `<figure class="source"><img src="${f.source.src}" alt="${f.source.alt}"><span class="zoom" aria-hidden="true">🔍 click to zoom</span><figcaption>${f.source.cap}</figcaption></figure>`;
      zoomable(card.querySelector(".source img"));
    }
    const verdict = card.querySelector(".verdict");
    const yn = f.chose ? "YES" : "NO";

    if (rec.done) {
      card.querySelector(".source").insertAdjacentHTML("beforeend", `<span class="stamp big-stamp${f.chose ? " green" : ""}">${f.chose ? "THEY CHOSE" : "NO CHOICE"}</span>`);
      verdict.innerHTML = `<div class="result"><p class="right">✓ Right! ${yn}. ${f.why[0]}</p></div>
        <div class="next"><p class="kicker">What happened next</p><p>${f.next}</p>${f.nextImg ? `<img src="${f.nextImg.src}" alt="${f.nextImg.alt}"><span class="small">${f.nextImg.cap}</span>` : ""}</div>`;
      verdict.appendChild(nextBtn(n < FILES.length - 1 ? "Open file " + (n + 2) + " →" : "Close the files →", advance));
      return;
    }

    if (!rec.yn) {
      verdict.innerHTML = `<p class="q">1. ${f.q1}</p><div class="yn"></div><p class="msg" role="status" aria-live="polite"></p>`;
      const area = verdict.querySelector(".yn"), fb = verdict.querySelector(".msg");
      const draw = () => {
        area.replaceChildren();
        [["YES", "🗳️", "They got to choose."], ["NO", "🚫", "Someone else decided."]].forEach(([v, i, sub]) => {
          const b = document.createElement("button"); b.type = "button"; b.className = "ynbtn " + (v === "YES" ? "y" : "n");
          b.innerHTML = `<i aria-hidden="true">${i}</i><b>${v}</b><span>${sub}</span>`;
          b.onclick = () => {
            if (fileLock) return;
            if (v === yn) { rec.yn = true; st.files[f.id] = rec; save(); render(); scrollTo(".verdict"); return; }
            rec.wrong = (rec.wrong || 0) + 1; rec.ynw = (rec.ynw || 0) + 1; st.files[f.id] = rec;
            if (window.classFirstTry) window.classFirstTry.wrong(); save();
            miss(area, verdict, fb, f.hint, draw, rec.ynw, () => { fileLock = false; }, () => { fileLock = true; });
          };
          area.appendChild(b);
        });
      };
      draw();
      return;
    }

    verdict.innerHTML = `<p class="right">✓ ${yn}. Good.</p><p class="q">2. Why?</p><div class="choices"></div><p class="msg" role="status" aria-live="polite"></p>`;
    const area = verdict.querySelector(".choices"), fb = verdict.querySelector(".msg");
    let last = "";
    const draw = () => {
      area.replaceChildren();
      let order = shuffle(f.why.map((t, i) => i));
      if (order.join() === last) order.push(order.shift());
      last = order.join();
      order.forEach(i => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice"; b.textContent = f.why[i];
        b.onclick = () => {
          if (fileLock) return;
          if (i === 0) { rec.done = true; st.files[f.id] = rec; if (window.classFirstTry) window.classFirstTry.right("bp-" + f.id); save(); render(); scrollTo(".result"); return; }
          rec.wrong = (rec.wrong || 0) + 1; rec.ww = (rec.ww || 0) + 1; (rec.picked = rec.picked || []).push(f.why[i]); st.files[f.id] = rec;
          if (window.classFirstTry) window.classFirstTry.wrong(); save();
          miss(area, verdict, fb, f.hint, draw, rec.ww, () => { fileLock = false; }, () => { fileLock = true; });
        };
        area.appendChild(b);
      });
    };
    draw();
  }

  // Dyson cartoon: tap the two labels, then one check.
  function picture(src, alt, spots, onAll) {
    const found = st.hot || 0;
    const wrap = document.createElement("div"); wrap.className = "pic";
    wrap.innerHTML = `<img src="${src}" alt="${alt}">`;
    spots.forEach((s, i) => {
      if (i > found) return;
      const b = document.createElement("button"); b.type = "button";
      b.className = "hot" + (i < found ? " found" : "") + (i === found && (st.miss || 0) >= 3 ? " pulse" : "");
      b.style.cssText = `left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%`;
      b.setAttribute("aria-label", i < found ? s.label : s.task);
      if (i < found) { b.innerHTML = `<span class="tag">${s.label}</span>`; b.tabIndex = -1; }
      b.onclick = e => { e.stopPropagation(); if (i !== found) return; st.hot = found + 1; st.miss = 0; save(); onAll(found + 1 >= spots.length); };
      wrap.appendChild(b);
    });
    wrap.onclick = () => {
      if (found >= spots.length) return;
      st.miss = (st.miss || 0) + 1; save();
      if (st.miss === 3) { onAll(false); return; }
      const m = $("missmsg"); if (m) m.textContent = (st.miss >= 3 ? "Look for the dashed red box. " : "Not there. ") + spots[found].hint;
    };
    return wrap;
  }
  function warningScreen() {
    const spots = [
      { x: 1, y: 39, w: 22, h: 13, label: "1940 Class", task: "the crying child's label", hint: "Look just above the crying child's head." },
      { x: 9, y: 85, w: 22, h: 13, label: "Peace treaty", task: "the peace treaty on the ground", hint: "Look on the ground, bottom left." }
    ];
    const card = el(`<section class="card">
      ${boardHtml(-1)}
      <h2>The warning</h2>
      <div class="split"><figure class="source cartoon-fit" id="fig"></figure><div id="side"></div></div>
    </section>`);
    app.appendChild(card);
    const fig = card.querySelector("#fig"), side = card.querySelector("#side");
    fig.appendChild(picture("img/versailles-1919.jpg", "1919 cartoon: the peace leaders walk out of a building past a crying child. A paper on the ground says Peace Treaty.", spots, all => { render(); if (all) scrollTo(".check"); }));
    fig.appendChild(el(`<figcaption>“Peace and Future Cannon Fodder,” Will Dyson, <i>Daily Herald</i> (London), May 1919. Public domain.</figcaption>`));
    side.appendChild(el(`<p>A British artist drew this when the treaty came out. <b>The Tiger</b> (Clemenceau, with the cane) says: <b>“Curious! I seem to hear a child weeping!”</b></p>`));
    side.appendChild(el(`<p class="small"><b>Cannon fodder</b> = young soldiers sent off to die.</p>`));
    const found = st.hot || 0;
    if (found < spots.length) {
      side.appendChild(el(`<p class="task">👆 Tap on the cartoon: ${spots[found].task}</p>`));
      side.appendChild(el(`<p class="msg bad" id="missmsg" role="status" aria-live="polite"></p>`));
      return;
    }
    side.appendChild(el(`<p class="task ok">✓ Found both!</p>`));
    side.appendChild(checkWidget("dyson", () => { render(); scrollTo("button.go"); }));
    if (st.checks.dyson && st.checks.dyson.done) side.appendChild(nextBtn("Write the front page →", advance));
  }

  // ---------------- Front page + writing ----------------
  const HEADLINES = ["Wilson's Promise: 1 for 5", "The Winners Write the Rules", "A Peace That Plants a War"];
  // Whole-word matching. A word ending in * matches anything starting with it ("punish*" = punish, punished).
  const words = v => String(v || "").toLowerCase().replace(/[’']/g, "").match(/[a-z0-9]+/g) || [];
  const hasAny = (v, list) => { const w = words(v); return list.some(k => k.endsWith("*") ? w.some(x => x.startsWith(k.slice(0, -1))) : w.includes(k)); };
  const PLACES = ["germany", "german", "germans", "poland", "polish", "poles", "india", "indian", "indians", "china", "chinese", "shandong", "russia", "russian", "russians"];
  const DECIDERS = ["wilson", "clemenceau", "lloyd", "peacemaker*", "big", "three", "winner*", "gun*", "trade*", "gave", "give*", "kept", "keep*", "paris", "talks", "treaty", "britain", "british", "colony", "colonies", "japan*", "lenin*", "bolshevik*", "force", "forced", "guns", "soldiers", "army", "vote*", "declare*", "chose", "choose", "chosen", "assembly", "tsar", "delegates", "empire", "ruler", "ruled", "rules", "blame*", "231", "reparation*", "complaints", "kicked", "allowed", "decided", "leaders"];
  const REASONS = ["blame*", "231", "guilt", "pay", "paid", "paying", "payment*", "reparation*", "money", "debt*", "land", "lands", "territory", "army", "military", "soldiers", "colonies", "diktat", "forced", "revenge", "humiliat*", "unfair", "harsh*", "punish*", "poland", "talks", "complaints", "1940", "draft*"];
  const PROMPTS = [
    { id: "w1", short: "Did they choose", label: "2. Pick one place. Did the people there get to choose? Why?",
      stem: "In ___, people did / did not get to choose because ___.",
      check: v => !hasAny(v, PLACES) ? "Name the place you picked: Germany, Poland, India, China, or Russia." : !hasAny(v, DECIDERS) ? "Say why. Who decided for them: the winners, Britain, Lenin's soldiers, or the people themselves?" : "" },
    { id: "w2", short: "Dyson's warning", label: "3. Dyson's warning: why might this peace lead to another war?",
      stem: "This peace might lead to war because ___, so Germans ___.",
      ideas: "Ideas: the blame · the payments · lost land · the small army · no say in the talks",
      check: v => !hasAny(v, REASONS) ? "Use a real reason from today: the blame, the payments, the lost land, the army limit, or Germany having no say in the talks." : "" }
  ];
  function frontScreen() {
    const card = el(`<section class="card">
      <div class="tally"><span class="k">✓ Kept: ${kept()}</span><span class="b">✗ Broken: ${broken()}</span></div>
      <div class="paper"><div class="mast"><span>THE PARIS DISPATCH</span><span>JULY 1919</span></div>
        <div class="headline" id="hl">${st.headline || "Pick your headline ↓"}</div>
        <p class="byline" id="by">By ${st.name ? st.name : "you"}, staff reporter</p></div>
      <p class="q">1. Pick your front-page headline.</p>
      <div class="heads3">${HEADLINES.map(h => `<button type="button" class="hbtn${st.headline === h ? " on" : ""}">${h}</button>`).join("")}</div>
      ${PROMPTS.map(p => `<label for="${p.id}">${p.label}</label>${p.ideas ? `<p class="ideas">💡 ${p.ideas}</p>` : ""}<p class="stem">✏️ <b>${p.stem}</b></p><textarea id="${p.id}" placeholder="${p.stem}"></textarea>`).join("")}
      <label for="studentName">4. First name + last initial</label>
      <input id="studentName" type="text" maxlength="60" autocomplete="off" placeholder="Like Jordan M.">
      <button type="button" class="go" id="sendBtn">${st.turnedIn ? "Turn in again" : "Turn in"}</button>
      <p class="msg" id="sendMsg" role="status" aria-live="polite"></p>
      ${st.turnedIn ? `<p class="turned" id="turnedBox">✓ Turned in</p>` : ""}
      <details class="sources"><summary>Sources</summary><p>Woodrow Wilson, address to Congress, Feb. 11, 1918. Treaty of Versailles (1919), Articles 119 (colonies), 156–158 (Shandong), 160 (army), 231 (war guilt), Part III (borders). Photos and cartoons: “The Big Four,” U.S. Army Signal Corps, May 27, 1919; map of Europe in 1923 by Historicair and Fluteflute (CC BY-SA 2.5, Wikimedia Commons); Indian soldiers in France, 1914 postcard, National Army Museum; Luther D. Bradley, <i>Chicago Daily News</i>, March 13, 1915 (Library of Congress); May Fourth protest, Beijing, 1919; Lenin in Moscow, May 5, 1920, by G. Goldstein; Will Dyson, “Peace and Future Cannon Fodder,” <i>Daily Herald</i>, May 1919. The reporter is a made-up role. Everything in the case files is real.</p></details>
    </section>`);
    app.appendChild(card);
    card.querySelectorAll(".hbtn").forEach((b, i) => b.onclick = () => {
      st.headline = HEADLINES[i]; save();
      card.querySelectorAll(".hbtn").forEach(x => x.classList.toggle("on", x === b));
      $("hl").textContent = st.headline;
    });
    PROMPTS.forEach(p => { const t = $(p.id); t.value = st.writing[p.id] || ""; t.addEventListener("input", () => { st.writing[p.id] = t.value; save(); }); });
    const nm = $("studentName"); nm.value = st.name || "";
    nm.addEventListener("input", () => { st.name = nm.value; save(); $("by").textContent = "By " + (nm.value.trim() || "you") + ", staff reporter"; });
    $("sendBtn").onclick = send;
  }

  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    msg.className = "msg";
    if (!st.headline && !isTestT()) { msg.className = "msg bad"; msg.textContent = "Pick a headline first."; return; }
    for (const p of (isTestT() ? [] : PROMPTS)) {   // Test T. (teacher) skips the writing rules
      const box = $(p.id), v = box.value.trim();
      if (window.classJunkStop) {
        const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
        if (junk) { msg.className = "msg bad"; msg.textContent = "For " + p.short + ": " + junk; return; }
      }
      if (/_{2,}/.test(v)) { msg.className = "msg bad"; msg.textContent = "Fill in the blanks with your own words for: " + p.short + "."; box.focus(); return; }
      if (words(v).length < 10) { msg.className = "msg bad"; msg.textContent = "Write a little more for: " + p.short + " (1–2 full sentences)."; box.focus(); return; }
      const why = p.check(v);
      if (why) { msg.className = "msg bad"; msg.textContent = "For " + p.short + ": " + why; box.focus(); return; }
    }
    const nameBox = $("studentName");
    const localShort = v => { const w = String(v || "").trim().split(/\s+/).filter(Boolean); if (w.length < 2) return w.join(""); const f = w[0][0].toUpperCase() + w[0].slice(1).toLowerCase(); return f + " " + w[w.length - 1][0].toUpperCase() + "."; };
    const name = window.classShortName ? window.classShortName(nameBox.value) : localShort(nameBox.value);
    if (!/^\S+ [A-Z]\.$/.test(name)) { msg.className = "msg bad"; msg.textContent = "Type your first name and last initial, like Jordan M."; nameBox.focus(); return; }
    st.name = name; save();

    const answers = { "Standard": STANDARD };
    const ids = ["promise"].concat(FILES.map(f => f.id), ["dyson"]);
    const wrongOf = id => CHECKS[id] ? ((st.checks[id] && st.checks[id].wrong) || 0) : ((st.files[id] && st.files[id].wrong) || 0);
    const doneOf = id => CHECKS[id] ? !!(st.checks[id] && st.checks[id].done) : !!(st.files[id] && st.files[id].done);
    const right = ids.filter(id => doneOf(id) && !wrongOf(id)).length;
    answers["First-try correct"] = right + " of " + ids.length;
    const by = {};
    ids.forEach(id => { const s = CHECKS[id] ? CHECKS[id].std : "WH.31"; by[s] = by[s] || [0, 0]; by[s][1]++; if (doneOf(id) && !wrongOf(id)) by[s][0]++; });
    answers["First-try by standard"] = Object.keys(by).sort().map(k => k + ": " + by[k][0] + " of " + by[k][1]).join(" · ");
    const tries = w => w ? " (after " + w + " wrong " + (w === 1 ? "try" : "tries") + ")" : " (first try)";
    answers[CHECKS.promise.short] = CHECKS.promise.options[0] + tries(wrongOf("promise"));
    FILES.forEach((f, n) => {
      const r = st.files[f.id] || {};
      answers["Check " + (n + 2) + " · File: " + f.place] = (f.chose ? "YES" : "NO") + " · " + f.why[0] + tries(wrongOf(f.id)) + ((r.ynw || r.ww) ? " [yes/no misses " + (r.ynw || 0) + "; wrong reasons: " + ((r.picked || []).join(" / ") || "none") + "]" : "");
    });
    answers[CHECKS.dyson.short] = CHECKS.dyson.options[0] + tries(wrongOf("dyson"));
    answers["Headline picked"] = st.headline;
    PROMPTS.forEach(p => { answers["Writing: " + p.short] = $(p.id).value.trim(); });

    btn.disabled = true; msg.textContent = "Sending your work…";
    if (PREVIEW) {
      st.turnedIn = true; save();
      msg.className = "msg good"; msg.textContent = "Preview copy: turn-in is OFF here, so nothing was sent. On the class site this sends to the dashboard.";
      window.__lastTurnIn = { studentName: name, assignmentId: ID, assignmentTitle: TITLE, answers };
      btn.disabled = false; btn.textContent = "Turned in ✓"; return;
    }
    try {
      const res = await window.classTurnIn(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: name, assignmentId: ID, assignmentTitle: TITLE, answers }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.className = "msg good"; msg.textContent = "Turned in! You're done.";
      btn.textContent = "Turned in ✓";
      if (!$("turnedBox")) btn.insertAdjacentHTML("afterend", `<p class="turned" id="turnedBox">✓ Turned in</p>`);
      btn.disabled = false;
    } catch (err) {
      msg.className = "msg bad"; msg.textContent = (err && err.message) || "Could not turn in. Try again."; btn.disabled = false;
    }
  }

  // ---------------- Router (no skipping: each step needs the one before it) ----------------
  function render() {
    // Fix a save that points past unfinished work.
    const need = [() => st.checks.promise && st.checks.promise.done].concat(FILES.map(f => () => !!(st.files[f.id] && st.files[f.id].done)), [() => st.checks.dyson && st.checks.dyson.done]);
    if (!isTestT()) for (let i = 0; i < Math.min(st.step, need.length); i++) if (!need[i]()) { st.step = i; save(); break; }   // Test T. may skip ahead
    header();
    app.innerHTML = "";
    if (st.step < 0) return titleScreen();
    const s = STEPS[Math.min(st.step, STEPS.length - 1)].id;
    if (s === "promise") return promiseScreen();
    if (/^f\d$/.test(s)) return fileScreen(+s[1]);
    if (s === "warning") return warningScreen();
    return frontScreen();
  }

  $("restartBtn").onclick = () => {
    if (!PREVIEW && !confirm("Start over? This clears your work on this device.")) return;
    const name = st.name; st = fresh(); st.name = name;
    if (window.classFirstTry) window.classFirstTry.reset();
    save(); render(); window.scrollTo(0, 0);
  };

  render();
  if (hadSave && st.step >= 0) {
    const s = Math.min(st.step, STEPS.length - 1);
    app.insertBefore(el(`<p class="welcome" role="status">Welcome back! You're on step ${s + 1} of ${STEPS.length}: ${STEPS[s].name}.</p>`), app.firstChild);
  }
  window.__case = { FILES, CHECKS };

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  // The teacher signed in as Test T. can jump to any step or answer the current check/file/cartoon task.
  try {
    const clickRight = id => {
      locked = false;
      const b = [...app.querySelectorAll(".check .choice")].find(x => x.textContent === CHECKS[id].options[0]);
      if (b) b.click();
    };
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => STEPS.length,
      index: () => Math.max(0, Math.min(st.step, STEPS.length - 1)),
      label: i => STEPS[i].name,
      go: i => { if (!st.name) st.name = "Test T."; locked = false; fileLock = false; st.step = i; save(); render(); window.scrollTo(0, 0); },
      solve: () => {
        const s = STEPS[Math.max(0, Math.min(st.step, STEPS.length - 1))].id;
        if (s === "promise" && !(st.checks.promise && st.checks.promise.done)) return clickRight("promise");
        if (/^f\d$/.test(s)) {
          const f = FILES[+s[1]], rec = st.files[f.id] || {};
          fileLock = false;
          if (!rec.yn) { rec.yn = true; st.files[f.id] = rec; save(); render(); }
          else if (!rec.done) { rec.done = true; st.files[f.id] = rec; save(); render(); }
          return;
        }
        if (s === "warning") {
          if ((st.hot || 0) < 2) { st.hot = 2; st.miss = 0; save(); render(); }
          else if (!(st.checks.dyson && st.checks.dyson.done)) clickRight("dyson");
        }
      }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
