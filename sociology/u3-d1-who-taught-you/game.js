// =====================================================================
//  BORN THIS WAY OR SOCIALIZATION?  (Sociology Unit 3 · Day 1 · SS.9-12.Soc.9)
//  Built to Fynn's ask (11/14): scenarios, students answer "was this socialization or were
//  they born this way," and a reflective piece at the end.
//  12 scenario cards, one at a time. Tap the side the card belongs on (or use the ← → keys).
//  Right: the card flies into that pile and the one-line "why" rides along on top of the next card.
//  Wrong: the card shakes, a short hint shows, try again (the teacher's first-try score stays honest).
//  Then: both piles side by side (8 and 8), then ONE reflection, then turn in.
//  11/21/26: Part 1 added first: a 4-page true story (Three Identical Strangers), one question + prove-it tap per page.
//  Scenarios come from the Day 1 slides (habits, eye color, reflexes, language, Isabelle, boot camp).
//  One screen, no scrolling on a Chromebook. Test T. can skip everything.
//  Turn-in via shared/turnin.js with the SAME assignmentId as before, so the dashboard link holds.
// =====================================================================
(function () {
  "use strict";
  const KEY = "soc-u3-d1-born-or-socialization-v1";
  const ASSIGNMENT_ID = "soc-u3-d1-who-taught-you";
  const TITLE = "Sociology · Unit 3 · Day 1 · Born This Way or Socialization?";
  const STANDARD = "SS.9-12.Soc.9";
  const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
  // 11/15/26: wrong answers lock longer each time on the same card, and each card stays up long enough to read.
  const LOCKS = [8, 15, 25, 35];
  const lockFor = n => LOCKS[Math.min(Math.max(n, 1), LOCKS.length) - 1];
  // Read time covers the card plus the "why" from the last card shown above it (slow, careful pace).
  const readFor = (c, prev) => Math.max(12, Math.ceil(((c.who + " " + c.t + " " + (prev ? prev.why : "")).split(/\s+/).length) * 60 / 70));

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isT = () => !!(window.classIsTestT && window.classIsTestT());

  const SIDES = {
    born: { icon: "🧬", name: "Born this way", sub: "Came with it. Nobody taught it." },
    soc: { icon: "🤝", name: "Socialization", sub: "Learned it from people." }
  };

  // ---------------- The 12 scenarios ----------------
  const CARDS = [
    { id: "ope", icon: "🤷", who: "Kayla, 16", t: "Kayla says “ope” when she bumps into someone. So does everybody in her Iowa town.", p: ["Kayla says “ope” when she bumps into someone.", "So does everybody in her Iowa town."], ok: 1, ans: "soc",
      why: "Nobody is born saying “ope.” She picked it up from the people around her.", hint: "Would she say it if she grew up in another country?", tag: "Says “ope”" },
    { id: "eyes", icon: "👁️", who: "Maya, 15", t: "Maya has brown eyes, just like her mom.", p: ["Maya has brown eyes,", "just like her mom."], ok: 1, ans: "born",
      why: "Eye color comes from her genes. That is nature.", hint: "Did anyone teach Maya her eye color?", tag: "Brown eyes" },
    { id: "text", icon: "💬", who: "Marcus, 17", t: "Marcus texts his boss, “Good morning, I'm running 5 minutes late.” He texts his friends, “omw lol.” His first manager showed him how to text about being late.", p: ["Marcus texts his boss, “Good morning, I'm running 5 minutes late.”", "He texts his friends, “omw lol.”", "His first manager showed him how to text about being late."], ok: 2, ans: "soc",
      why: "He learned which words fit which people. People taught him that.", hint: "How did he find out you can't text a boss like a friend?", tag: "Texts boss vs. friends" },
    { id: "hawk", icon: "🏈", who: "Dre, 16", t: "Dre roots for the Hawkeyes. So does his dad. So did his grandpa, who took him to his first game.", p: ["Dre roots for the Hawkeyes.", "So does his dad. So did his grandpa, who took him to his first game."], ok: 1, ans: "soc",
      why: "Nobody is born a Hawkeye fan. His family raised him into it.", hint: "What if a Cyclone family had raised him?", tag: "Hawkeye fan" },
    { id: "grab", icon: "👶", who: "A newborn", t: "A newborn wraps her hand around your finger and holds on tight.", p: ["A newborn", "wraps her hand around your finger", "and holds on tight."], ok: 0, ans: "born",
      why: "That is a reflex. Babies do it with no teaching at all.", hint: "She is one day old. Who could have taught her?", tag: "Baby grabs a finger" },
    { id: "spanish", icon: "🗣️", who: "Elena, 15", t: "Elena speaks Spanish at home with her family and English at school with her friends.", p: ["Elena speaks Spanish", "at home with her family", "and English at school with her friends."], ok: 1, ans: "soc",
      why: "Babies can learn any language. The ones you speak come from who raised you. Learning the basics at home is primary socialization.", hint: "Would she speak Spanish if nobody around her did?", tag: "Speaks two languages" },
    { id: "grow", icon: "📏", who: "Jordan, 14", t: "Jordan grew 4 inches the summer before 9th grade, the same as his older brothers did.", p: ["Jordan grew 4 inches", "the summer before 9th grade,", "the same as his older brothers did."], ok: 2, ans: "born",
      why: "Growing taller is your body, not a lesson. That is nature.", hint: "Can a person be taught to grow?", tag: "Growth spurt" },
    { id: "cry", icon: "😤", who: "Jay, 10", t: "Jay's uncles always told him, “Big boys don't cry.” Now Jay never cries in front of people.", p: ["Jay's uncles always told him, “Big boys don't cry.”", "Now Jay never cries in front of people."], ok: 0, ans: "soc",
      why: "It looks like just who he is. But he learned it from his family.", hint: "What did his uncles keep telling him?", tag: "“Big boys don't cry”" },
    { id: "isabelle", icon: "📁", who: "Isabelle, 1938", real: true, t: "Isabelle was found at 6½, kept hidden away. She could not talk. After 2 years of daily lessons, she talked like other kids her age.", p: ["Isabelle was found at 6½, kept hidden away.", "She could not talk.", "After 2 years of daily lessons, she talked like other kids her age."], ok: 2, ans: "soc",
      why: "She was born able to learn. But it took people to teach her.", hint: "What changed once she had a teacher every day?", tag: "Isabelle learns to talk" },
    { id: "hungry", icon: "🍼", who: "A baby", t: "A baby cries when she is hungry, even on her very first day.", p: ["A baby", "cries when she is hungry,", "even on her very first day."], ok: 2, ans: "born",
      why: "Nobody shows a baby how to cry. She is born doing it.", hint: "Does a baby need a lesson to cry?", tag: "Baby cries when hungry" },
    { id: "shadow", icon: "🩺", who: "Tasha, 17", t: "Tasha follows a nurse around for a day to see what the job is really like. She wants to be a nurse after she graduates.", p: ["Tasha follows a nurse around for a day", "to see what the job is really like.", "She wants to be a nurse after she graduates."], ok: 0, ans: "soc",
      why: "She is practicing for a role she doesn't have yet. That is anticipatory socialization.", hint: "Is she learning from someone, or was she born knowing the job?", tag: "Job-shadows a nurse" },
    { id: "boot", icon: "🪖", who: "Marine recruits", real: true, t: "After 13 weeks of boot camp, Marine recruits walk, talk, and dress the same way.", p: ["After 13 weeks of boot camp,", "Marine recruits walk, talk, and dress the same way."], ok: 0, ans: "soc",
      why: "Old habits out, new ones in, fast. That is resocialization.", hint: "Were they like this before boot camp?", tag: "Boot camp" },
    // Added 11/15/26 (Fynn: "even the rusher takes 15 minutes") so the piles are even, 8 and 8.
    { id: "freckles", icon: "🌞", who: "Leah, 15", t: "Leah has freckles across her nose, just like her grandma did.", p: ["Leah has freckles across her nose,", "just like her grandma did."], ok: 1, ans: "born",
      why: "Freckles run in families through genes. Nobody teaches them.", hint: "Could anyone have taught Leah to have freckles?", tag: "Freckles" },
    { id: "root", icon: "🍼", who: "A newborn", t: "Touch a newborn's cheek and she turns her head that way, looking for milk.", p: ["Touch a newborn's cheek", "and she turns her head that way,", "looking for milk."], ok: 0, ans: "born",
      why: "That is the rooting reflex. Every healthy baby is born with it.", hint: "She is brand new. When would she have learned it?", tag: "Baby turns toward a touch" },
    { id: "color", icon: "🎨", who: "Chris, 17", t: "Chris can't tell some reds from greens. His grandpa couldn't either.", p: ["Chris can't tell some reds from greens.", "His grandpa couldn't either."], ok: 1, ans: "born",
      why: "Colorblindness is passed down in genes. That is nature.", hint: "Is this something a person learns?", tag: "Colorblind like Grandpa" },
    { id: "sneeze", icon: "🤧", who: "Sam, 16", t: "Sam sneezes every time he walks out into bright sun. Doctors say some people are born with this reflex.", p: ["Sam sneezes every time he walks out into bright sun.", "Doctors say some people are born with this reflex."], ok: 1, ans: "born",
      why: "Some people inherit a sun-sneeze reflex. It is in the body, not taught.", hint: "Would anyone teach a kid to sneeze at the sun?", tag: "Sneezes in the sun" }
  ];
  // Mix the added cards in so the two sides don't come in streaks.
  (function () { const order = ["ope", "eyes", "freckles", "text", "hawk", "grab", "spanish", "root", "grow", "cry", "color", "isabelle", "hungry", "shadow", "sneeze", "boot"];
    CARDS.sort((x, y) => order.indexOf(x.id) - order.indexOf(y.id)); })();
  const N = CARDS.length;
  const TOTAL = N + 2;   // cards, results, reflection

  // ---------------- Part 1: the true story (Fynn 11/21/26) ----------------
  // Fynn: "they will breeze through this and need a reading before this part, like the Ms. Marvel thing."
  // Picked: Three Identical Strangers, built in as Part 1 of this page (one turn-in).
  // Facts checked 11/21/26 against NPR (2018), KCRW, The Forward, The Telegraph, Slant, NYU Med Humanities,
  // KQED, and the Neubauer study papers (Twin Research & Human Genetics). Eddy's 1995 death is left out on purpose.
  // Pictures are saved in this page's img/ folder (11-22) so a school filter can't block them.
  // Pictures are real places from Wikimedia Commons (no photos of the brothers: those are copyrighted).
  const IMG = (file, title, by, lic, local) => ({ src: "img/" + local, page: "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(file), title, by, lic });
  const STORY = [
    { id: "s1", kicker: "New York · 1980", title: "Everyone Knows Bobby",
      img: IMG("SUNY Sullivan library.jpg", "The college Bobby went to (today called SUNY Sullivan)", "J. Passepartout", "CC BY-SA 4.0", "college.jpg"),
      s: ["In 1980, Bobby Shafran was 19 years old.",
          "It was his first day at a small college in upstate New York, and he had never been there before.",
          "But strangers kept hugging him, high-fiving him, and calling him “Eddy.”",
          "Finally, one student asked him if he was adopted.",
          "He was. His birthday was July 12, 1961.",
          "The student's friend Eddy Galland had gone to the college the year before, and he looked exactly like Bobby.",
          "Eddy was adopted too, with the same birthday.",
          "That night, Bobby stood face to face with Eddy. They were identical twins, split up as babies.",
          "Identical twins have the exact same genes."],
      paras: [3, 7],
      q: "Why did strangers at the college keep calling Bobby “Eddy”?",
      choices: ["He looked exactly like Eddy, a student there the year before", "Eddy was a nickname everyone there used for new students", "Bobby had signed up for his classes under the name Eddy", "Bobby had visited the college before and called himself Eddy"],
      why: "Eddy had gone there the year before, and Bobby was his double.",
      hint: "Reread what the page says about Eddy Galland.",
      proof: 5, proofAsk: "Tap the sentence that explains the mix-up.", proofHint: "Find the sentence about what Eddy looked like." },
    { id: "s2", kicker: "A few months later", title: "Make That Three",
      img: IMG("2011 newsstand 5381532713.jpg", "A newsstand in New York City", "rob zand", "CC BY-SA 2.0", "newsstand.jpg"),
      s: ["Newspapers ran the story, with a photo of the two brothers.",
          "In Queens, New York, a college student named David Kellman saw that photo.",
          "He was looking at two faces exactly like his own.",
          "David was adopted too, and his birthday was July 12, 1961.",
          "They weren't twins. They were identical triplets.",
          "They became famous, on TV talk shows and even in a Madonna movie.",
          "People were amazed at how alike they were.",
          "All three had wrestled in high school, smoked the same brand of cigarettes, and had an older sister who was also adopted.",
          "Some people said this proved it: your genes decide who you become."],
      paras: [4, 6],
      q: "Nature means traits you get from your genes. Why did people say the triplets proved nature wins?",
      choices: ["They grew up apart but still had a lot of the same habits", "Their parents had all agreed to teach them the same habits", "They had grown up together in the same house as kids", "Their college classes taught the three of them the same things"],
      why: "Raised in different homes, they still matched. That looked like their genes at work.",
      hint: "They were split up as babies. What surprised people when they met?",
      proof: 7, proofAsk: "Tap the sentence that shows how alike they were.", proofHint: "Find the list of things all three had in common." },
    { id: "s3", kicker: "Then people looked closer", title: "Three Different Homes",
      img: IMG("Levittown houses. LOC gsc.5a25986 (cropped).jpg", "Houses on Long Island, New York", "Gottscho-Schleisner Collection, Library of Congress", "Public domain", "levittown.jpg"),
      s: ["But the brothers were not copies.",
          "As babies, they had been placed in three very different homes.",
          "Bobby grew up rich. His dad was a doctor, and his mom was a lawyer.",
          "Eddy grew up middle class on Long Island. His dad was a teacher.",
          "David grew up working class. His parents ran a small grocery store.",
          "Their dads were different too.",
          "David's dad was warm and loving, Bobby's dad was busy and often at work, and Eddy's dad was strict.",
          "Each family had its own money, its own rules, and its own way of showing love.",
          "As adults, the brothers' lives went in different directions."],
      paras: [2, 5],
      q: "Socialization is learning how to be a person from the people around you. Which part of the triplets' story is socialization?",
      choices: ["Each family raised its boy with its own rules and love", "Each brother was born with the exact same genes", "Each brother was born on the very same day", "Each brother had the same face, hair, and smile"],
      why: "Same genes, different homes. The families taught each boy a different way to live.",
      hint: "Socialization comes from people. Which choice is about the families?",
      proof: 6, proofAsk: "Tap the sentence that shows the parents raising them differently.", proofHint: "Find the sentence about each brother's dad." },
    { id: "s4", kicker: "The twist", title: "The Secret Study",
      img: IMG("Sterling Memorial Library Highsmith.jpg", "Yale University's main library", "Carol M. Highsmith", "Public domain", "yale.jpg"),
      s: ["Then came the biggest shock: splitting them up was not an accident.",
          "A psychiatrist (a doctor for the mind) named Dr. Peter Neubauer was running a secret study.",
          "He wanted to answer an old question: nature or nurture? Do your genes shape you, or do the people who raise you?",
          "So the adoption agency placed twins and triplets in different homes on purpose.",
          "The parents were never told their baby had a twin or triplet. They were told it was a normal study of how kids grow.",
          "For years, researchers visited the boys' homes to test them and film them.",
          "The study was never published. Its records are locked up at Yale University until 2066.",
          "The brothers still don't know everything the researchers learned about them."],
      paras: [3, 6],
      q: "Why did the researchers split up the babies?",
      choices: ["To test if genes or the people raising you matter more", "Because one family could not afford to adopt all three", "Because their birth mother asked for it in writing", "To find out which kind of family raises the smartest kids"],
      why: "It was a nature-or-nurture test. The brothers never agreed to be part of it.",
      hint: "What old question did Dr. Neubauer want to answer?",
      proof: 2, proofAsk: "Tap the sentence that shows what the study wanted to find out.", proofHint: "Find the sentence with the old question." }
  ];
  const R = STORY.length;
  const readTime = p => Math.max(25, Math.ceil(((p.s.join(" ") + " " + p.q).split(/\s+/).length) * 60 / 120));

  // ---------------- The reflection ----------------
  const PROMPT = { id: "w1", short: "Reflection: born with it vs. socialized",
    label: "Now you. Name one thing you were born with and one thing you were socialized to do.",
    help: "Use yourself, or make someone up. You never have to share anything private.",
    stem: "One thing I was born with is ___. One thing I was socialized to do is ___. I learned it from ___.",
    min: 70, mustAll: [["born"], ["learn", "taught", "teach", "socializ", "showed", "raised", "from"]],
    mustMsg: "Name one thing you were born with AND one thing you learned from other people." };

  // ---------------- State ----------------
  const fresh = () => ({ v: 1, name: "", step: -1, read: 0, rdone: {}, rmiss: {}, rpdone: {}, rpmiss: {}, done: {}, miss: {}, pdone: {}, pmiss: {}, streak: 0, last: null, writing: {}, turnedIn: false });
  let st;
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || typeof st !== "object" || st.v !== 1 || !st.done || !st.miss) st = fresh();
  // Shared Chromebooks: a different student signed in on this device starts fresh.
  try {
    const raw = localStorage.getItem("site-student-name") || "";
    const now = (window.classShortName ? window.classShortName(raw) : raw).trim().toLowerCase();
    if (now && st.name && now !== st.name.trim().toLowerCase()) st = fresh();
  } catch (e) {}
  if (!st.pdone) st.pdone = {}; if (!st.pmiss) st.pmiss = {};
  // Saved from before Part 1 existed: a student already sorting keeps going (no surprise reading mid-game).
  if (typeof st.read !== "number") st.read = st.step >= 0 ? R : 0;
  ["rdone", "rmiss", "rpdone", "rpmiss"].forEach(k => { if (!st[k]) st[k] = {}; });
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  let anim = false, locked = false;
  const firstTry = () => CARDS.filter(c => st.done[c.id] && !st.miss[c.id]).length;
  const proofFirst = () => CARDS.filter(c => st.pdone[c.id] && !st.pmiss[c.id]).length;
  const pile = side => CARDS.filter(c => st.done[c.id] && c.ans === side).length;
  const readFirst = () => STORY.filter(p => st.rdone[p.id] && !st.rmiss[p.id]).length;
  const readProofFirst = () => STORY.filter(p => st.rpdone[p.id] && !st.rpmiss[p.id]).length;
  const inStory = () => st.step >= 0 && st.read < R;

  // ---------------- Status bar ----------------
  function hud() {
    const show = st.step >= 0;
    $("hud").hidden = !show;
    document.body.classList.toggle("on-title", !show);
    if (!show) return;
    const doneN = CARDS.filter(c => st.done[c.id]).length + STORY.filter(p => st.rpdone[p.id]).length;
    $("progFill").style.width = Math.round(doneN / (N + R) * 100) + "%";
    $("stepCt").textContent = inStory() ? "Part 1 · Page " + (st.read + 1) + " of " + R : st.step < N ? "Part 2 · Card " + (st.step + 1) + " of " + N : st.step === N ? "Results" : "Reflection";
    // No first-try score or streak on the student page (Fynn's no-scores rule). First-try data still goes in the turn-in.
  }

  // ---------------- Pieces ----------------
  const app = $("app");
  function nextBtn(label) { return `<button type="button" class="next" id="nextBtn"><span>${esc(label || "Next")}</span> →</button>`; }
  function goNext() { st.step = Math.min(st.step + 1, TOTAL - 1); anim = true; locked = false; save(); render(); toTop(); }
  // Put the status bar at the very top of the window, so the whole screen shows without scrolling.
  function toTop() {
    const h = $("hud");
    const y = h && !h.hidden ? Math.max(0, Math.round($("wrap").getBoundingClientRect().top + window.scrollY - h.getBoundingClientRect().height)) : 0;
    window.scrollTo(0, y);
  }
  // Short windows: shrink the whole game a little so every screen still fits. Full size at 600px tall and up.
  function fitZoom() {
    const z = window.innerWidth < 761 ? 1 : Math.max(0.7, Math.min(1, window.innerHeight / 600));
    const v = z === 1 ? "" : String(Math.round(z * 100) / 100);
    $("hud").style.zoom = v; $("wrap").style.zoom = v;
  }
  window.addEventListener("resize", fitZoom);

  // ---------------- Title ----------------
  function intro() {
    let pre = st.name;
    if (!pre) { try { const raw = localStorage.getItem("site-student-name") || ""; pre = window.classShortName ? window.classShortName(raw) : raw; } catch (e) {} }
    app.innerHTML = `<section class="title-card">
      <p class="eyebrow">Sociology · Unit 3 · Day 1</p>
      <h1 class="big-title"><span class="tb">BORN THIS WAY</span><span class="tor">or</span><span class="tm">SOCIALIZATION?</span></h1>
      <p class="hook">Three brothers. Same genes. Split up as babies, on purpose. Then you sort 16 more people.</p>
      <div class="parts"><div class="part"><span class="pn">Part 1</span><b>📖 A true story</b><span>4 short pages about the triplets, 1 question each</span></div>
        <div class="part"><span class="pn">Part 2</span><b>🃏 Sort the cards</b><span>16 people: <i class="tb">born this way</i> or <i class="tm">socialization</i>?</span></div></div>
      <div class="title-tiles"><span>🔎 Prove every answer</span><span>✍️ <b>1</b> reflection</span><span>⏱ <b>25</b> minutes</span></div>
      <p class="goal"><b>Today's goal:</b> <span>Explain how people teach us who to be, from birth to adulthood.</span></p>
      <div class="title-start"><div class="namebox"><label for="nameBox">Your name: first name + last initial (like Jordan M.)</label>
        <input id="nameBox" maxlength="40" autocomplete="off" placeholder="First name + last initial (like Jordan M.)" value="${esc(pre)}"></div>
        <button type="button" class="big" id="startBtn"><span>Start the story</span> →</button></div>
      <p id="introMsg" class="msg" role="status"></p>
      <p class="small-print"><b>SS.9-12.Soc.9</b> Describe the process of socialization across the life course.</p></section>`;
    $("startBtn").onclick = () => {
      const fixed = window.classShortName ? window.classShortName($("nameBox").value) : $("nameBox").value.trim();
      if (!/^\S+ \p{Lu}\.$/u.test(fixed)) { $("introMsg").textContent = "Type your first name and last initial, like Jordan M."; $("introMsg").className = "msg bad"; $("nameBox").focus(); return; }
      st.name = fixed; st.step = 0; st.read = 0; anim = true; save(); render(); toTop();
    };
  }


  // ---------------- Part 1: a story page ----------------
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  // New order each time, and never the same spot for the right answer twice in a row.
  function mixChoices(p, avoid) {
    let o; do { o = shuffle(p.choices.map((t, i) => i)); } while (avoid != null && o.indexOf(0) === avoid);
    return o;
  }
  function readView() {
    pickFn = null;
    const p = STORY[st.read], i = p.img, last = st.read === R - 1;
    app.innerHTML = `<section class="scene story">
      <div class="rgrid">
        <article class="book" aria-label="Story page ${st.read + 1} of ${R}">
          <figure><img src="${i.src}" alt="${esc(i.title)}"><figcaption>${esc(i.title)}. Photo: ${esc(i.by)}, <a href="${i.page}" target="_blank" rel="noopener">${esc(i.lic)}</a>. A real place, not the brothers.</figcaption></figure>
          <p class="bk">📖 True story · Page ${st.read + 1} of ${R} · ${esc(p.kicker)}</p>
          <h2>${esc(p.title)}</h2>
          <div class="btext" id="btext"><p>${p.s.map((x, k) => ((p.paras || []).includes(k) ? "</p><p>" : "") + `<span class="sn" data-i="${k}">${esc(x)}</span>`).join(" ")}</p></div>
        </article>
        <div class="rq">
          <p class="rtag">Question ${st.read + 1} of ${R}</p>
          <p class="rqq">${esc(p.q)}</p>
          <div class="rchoices" id="rch"></div>
          <p class="msg" id="rmsg" aria-live="polite"></p>
          <div id="rafter"></div>
        </div>
      </div></section>`;
    const fb = $("rmsg"), box = $("rch"), after = $("rafter"), text = $("btext");
    let order = mixChoices(p), locked = false, plocked = false;
    const drawChoices = off => {
      box.innerHTML = order.map(k => `<button type="button" class="rc" data-k="${k}"${off ? " disabled" : ""}>${esc(p.choices[k])}</button>`).join("");
      box.querySelectorAll(".rc").forEach(b => b.onclick = () => pick(+b.dataset.k));
    };
    const setOff = off => box.querySelectorAll(".rc").forEach(b => b.disabled = off);
    const finish = () => {
      text.classList.remove("proofing");
      after.innerHTML = `<div class="rdone"><p class="rwhy">✓ ${esc(p.why)}</p>${nextBtn(last ? "Part 2: sort the cards" : "Next page")}</div>`;
      fb.textContent = "";
      $("nextBtn").onclick = () => { st.read = Math.min(st.read + 1, R); anim = true; save(); render(); toTop(); };
    };
    const proofStage = () => {
      box.innerHTML = `<p class="rright">✓ ${esc(p.choices[0])}</p>`;
      if (st.rpdone[p.id]) { const ok = text.querySelector(`.sn[data-i="${p.proof}"]`); if (ok) ok.classList.add("snok"); return finish(); }
      text.classList.add("proofing");
      after.innerHTML = `<p class="rproof">🔎 <b>Now prove it.</b> ${esc(p.proofAsk)}</p>`;
      const sns = [...text.querySelectorAll(".sn")];
      const tap = el => {
        if (plocked || st.rpdone[p.id]) return;
        if (+el.dataset.i === p.proof) {
          st.rpdone[p.id] = true; el.classList.add("snok");
          if (window.classFirstTry) window.classFirstTry.right(p.id + "~p");
          save(); hud(); setTimeout(finish, isT() ? 0 : 350); return;
        }
        st.rpmiss[p.id] = (st.rpmiss[p.id] || 0) + 1; st.streak = 0;
        if (window.classFirstTry) window.classFirstTry.wrong();
        save(); hud();
        el.classList.remove("evno"); void el.offsetWidth; el.classList.add("evno");
        plocked = true; text.classList.add("plocked");
        let left = isT() ? 0 : lockFor(st.rpmiss[p.id]);
        const tick = () => {
          if (st.read !== STORY.indexOf(p)) return;
          if (left <= 0) { plocked = false; text.classList.remove("plocked"); fb.textContent = "Try again. " + p.proofHint; fb.className = "msg bad"; return; }
          fb.textContent = "That sentence doesn't prove it. " + p.proofHint + " " + left + "…"; fb.className = "msg bad";
          left--; setTimeout(tick, 1000);
        };
        tick();
      };
      sns.forEach(e => { e.setAttribute("role", "button"); e.tabIndex = 0; e.onclick = () => tap(e); e.onkeydown = ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); tap(e); } }; });
      solveFn = () => { plocked = false; tap(sns[p.proof]); };
    };
    const pick = k => {
      if (locked || st.rdone[p.id]) return;
      if (k === 0) {
        st.rdone[p.id] = true; st.streak = st.rmiss[p.id] ? 0 : st.streak + 1;
        if (window.classFirstTry) window.classFirstTry.right(p.id);
        save(); hud(); fb.textContent = ""; proofStage(); return;
      }
      st.rmiss[p.id] = (st.rmiss[p.id] || 0) + 1; st.streak = 0;
      if (window.classFirstTry) window.classFirstTry.wrong();
      save(); hud();
      locked = true; order = mixChoices(p, order.indexOf(0)); drawChoices(true);   // reshuffle, no red left behind
      let left = isT() ? 0 : lockFor(st.rmiss[p.id]);
      const tick = () => {
        if (st.read !== STORY.indexOf(p)) return;
        if (left <= 0) { locked = false; setOff(false); fb.textContent = "Try again. " + p.hint; fb.className = "msg bad"; return; }
        fb.textContent = "Not quite. " + p.hint + " " + left + "…"; fb.className = "msg bad";
        left--; setTimeout(tick, 1000);
      };
      tick();
    };
    solveFn = () => { locked = false; pick(0); };
    if (st.rdone[p.id]) { proofStage(); fitStory(); return; }   // came back mid-page: finish the proof
    drawChoices(!isT());
    fitStory();
    if (!isT()) {   // the page stays up long enough to read, even after a refresh
      locked = true;
      let left = readTime(p);
      const tick = () => {
        if (st.read !== STORY.indexOf(p) || st.rdone[p.id]) return;
        if (left <= 0) { locked = false; setOff(false); fb.textContent = ""; return; }
        fb.textContent = "Read the page. The answers open in " + left + "…"; fb.className = "msg";
        left--; setTimeout(tick, 1000);
      };
      tick();
    }
  }
  let solveFn = null;
  // Story pages run a little taller than a card. If one doesn't fit the window, shrink it just enough (never below 70%).
  function fitStory() {
    fitZoom();
    const sc = app.querySelector(".scene"); if (!sc) return;
    const base = parseFloat($("wrap").style.zoom) || 1;
    const need = (sc.getBoundingClientRect().height + 30) * 1 + ($("hud").getBoundingClientRect().height || 50);
    const room = window.innerHeight / base;
    if (need > room) { const z = String(Math.max(0.7, Math.round(base * room / need * 100) / 100)); $("wrap").style.zoom = z; }
  }

  // ---------------- A card ----------------
  function lastStrip() {
    const c = st.last && CARDS.find(x => x.id === st.last);
    if (!c) return `<p class="last empty"><b>Part 2.</b> Same question the study asked. Read the card, tap the side it belongs on, then tap the words that prove it.</p>`;
    return `<p class="last ${c.ans}" role="status"><span class="ltag">✓ ${esc(SIDES[c.ans].name)}</span><span>${esc(c.why)}</span></p>`;
  }
  function bucketHtml(side, off) {
    const s = SIDES[side], n = pile(side);
    return `<button type="button" class="bucket ${side}" data-k="${side}"${off ? " disabled" : ""}><span class="bi" aria-hidden="true">${s.icon}</span><b>${esc(s.name)}</b><span class="bs">${esc(s.sub)}</span><span class="pile">${n} ${n === 1 ? "card" : "cards"} here</span></button>`;
  }
  let pickFn = null;
  function cardView() {
    const c = CARDS[st.step];
    app.innerHTML = `<section class="scene">${lastStrip()}
      <div class="table">${bucketHtml("born")}
        <div class="card" id="card"><span class="ci" aria-hidden="true">${c.icon}</span><span class="who">${c.real ? `<span class="real">REAL</span>` : ""}${esc(c.who)}</span><p class="ct" id="ct">${c.p.map((x, i) => `<span class="ev" data-i="${i}">${esc(x)}</span>`).join(" ")}</p><p class="cq" id="cq">Born this way, or socialization?</p></div>
        ${bucketHtml("soc")}</div>
      <p class="msg" id="qmsg" aria-live="polite"></p></section>`;
    const btns = [...app.querySelectorAll(".bucket")], fb = $("qmsg"), card = $("card");
    const setOff = off => btns.forEach(b => b.disabled = off);
    // "Prove it" (Fynn 11/15/26): after the right side, tap the words on the card that prove it.
    let plocked = false, proofSolve = null;
    const flyAway = () => {
      card.classList.remove("proofing");
      card.classList.add("fly-" + c.ans);
      const b = app.querySelector(".bucket." + c.ans); b.classList.add("hit");
      setTimeout(goNext, isT() ? 150 : 430);
    };
    const proofStage = () => {
      locked = true; setOff(true);
      const b = app.querySelector(".bucket." + c.ans); if (b) b.classList.add("chosen");
      $("cq").innerHTML = `✓ ${esc(SIDES[c.ans].name)}. <b>🔎 Now prove it:</b> tap the words on the card that show it.`;
      card.classList.add("proofing");
      const evs = [...card.querySelectorAll(".ev")];
      const tap = el => {
        if (plocked || st.pdone[c.id]) return;
        if (+el.dataset.i === c.ok) {
          st.pdone[c.id] = true; el.classList.add("evok");
          if (window.classFirstTry) window.classFirstTry.right(c.id + "~p");
          save(); fb.textContent = ""; setTimeout(flyAway, isT() ? 50 : 500); return;
        }
        st.pmiss[c.id] = (st.pmiss[c.id] || 0) + 1; st.streak = 0;
        if (window.classFirstTry) window.classFirstTry.wrong();
        save(); hud();
        el.classList.remove("evno"); void el.offsetWidth; el.classList.add("evno");
        plocked = true; card.classList.add("plocked");
        let left = isT() ? 0 : lockFor(st.pmiss[c.id]);
        const tick = () => {
          if (left <= 0) { plocked = false; card.classList.remove("plocked"); fb.textContent = "Try again. Which words show " + (c.ans === "born" ? "it came with her body or genes" : "someone taught it") + "?"; fb.className = "msg bad"; return; }
          fb.textContent = "That part doesn't prove it. Read the card again. " + left + "…"; fb.className = "msg bad";
          left--; setTimeout(tick, 1000);
        };
        tick();
      };
      evs.forEach(e => { e.setAttribute("role", "button"); e.tabIndex = 0; e.onclick = () => tap(e); e.onkeydown = ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); tap(e); } }; });
      proofSolve = () => { plocked = false; tap(evs[c.ok]); };
    };
    pickFn = side => {
      if (st.done[c.id]) { if (proofSolve) proofSolve(); return; }
      if (locked) return;
      if (side === c.ans) {
        locked = true; setOff(true);
        st.done[c.id] = true; st.last = c.id; st.streak = st.miss[c.id] ? 0 : st.streak + 1;
        if (window.classFirstTry) window.classFirstTry.right(c.id);
        save(); hud(); fb.textContent = "";
        proofStage();
        return;
      }
      st.miss[c.id] = (st.miss[c.id] || 0) + 1; st.streak = 0;
      if (window.classFirstTry) window.classFirstTry.wrong();
      save(); hud();
      card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
      locked = true; setOff(true);
      let left = isT() ? 0 : lockFor(st.miss[c.id]);   // Test T.: no wait
      const tick = () => {
        if (left <= 0) { locked = false; setOff(false); fb.textContent = "Try again. " + c.hint; fb.className = "msg bad"; return; }
        fb.textContent = "Not quite. " + c.hint + " " + left + "…"; fb.className = "msg bad";
        left--; setTimeout(tick, 1000);
      };
      tick();
    };
    btns.forEach(b => b.onclick = () => pickFn(b.dataset.k));
    locked = false;
    if (st.done[c.id]) { proofStage(); return; }   // came back mid-card: finish the proof
    if (!isT()) {   // the card (and the last card's "why") stays up long enough to read, even after a refresh
      locked = true; setOff(true);
      const prev = st.step > 0 ? CARDS[st.step - 1] : null;
      let left = readFor(c, prev);
      const tick = () => {
        if (CARDS[st.step] !== c || st.done[c.id]) return;
        if (left <= 0) { locked = false; setOff(false); fb.textContent = ""; return; }
        fb.textContent = "Read the card. The sides open in " + left + "…"; fb.className = "msg";
        left--; setTimeout(tick, 1000);
      };
      tick();
    }
  }
  document.addEventListener("keydown", ev => {
    if (st.step < 0 || inStory() || st.step >= N || !pickFn) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((ev.target && ev.target.tagName) || "")) return;
    if (ev.key === "ArrowLeft") { ev.preventDefault(); pickFn("born"); }
    else if (ev.key === "ArrowRight") { ev.preventDefault(); pickFn("soc"); }
  });

  // ---------------- Results: the two piles ----------------
  function endView() {
    pickFn = null;
    const born = CARDS.filter(c => c.ans === "born"), soc = CARDS.filter(c => c.ans === "soc");
    const chips = list => list.map((c, i) => `<span class="chip" style="animation-delay:${i * 60}ms"><span aria-hidden="true">${c.icon}</span> ${esc(c.tag)}</span>`).join("");
    app.innerHTML = `<section class="scene"><p class="kicker">All 16 sorted</p><h2>Look at the two piles.</h2>
      <div class="piles"><div class="pilebox born"><h3>🧬 Born this way · ${born.length}</h3><div class="chips">${chips(born)}</div></div>
        <div class="pilebox soc"><h3>🤝 Socialization · ${soc.length}</h3><div class="chips">${chips(soc)}</div></div></div>
      <p class="bigidea">You are born with a body. <b>People teach you how to be a person.</b> That is socialization.</p>
      <div class="end-foot"><span class="soft">✓ Part 2 done.</span>${nextBtn("Last step: your reflection")}</div></section>`;
    $("nextBtn").onclick = goNext;
  }

  // ---------------- Reflection + turn in ----------------
  function writeView() {
    pickFn = null;
    const p = PROMPT;
    app.innerHTML = `<section class="scene write"><div class="phone"><div class="ph-top"><span>✍️ Your reflection</span> · <b>${esc(st.name)}</b></div>
      <div class="wq"><label for="w_${p.id}">${esc(p.label)}</label><p class="help">${esc(p.help)}</p><p class="stem"><b>Start like this:</b> <span class="starter">${esc(p.stem)}</span></p>
        <textarea id="w_${p.id}" rows="4" data-starter="${esc(p.stem)}">${esc(st.writing[p.id] || "")}</textarea></div>
      <button type="button" class="big" id="sendBtn"${st.turnedIn ? " disabled" : ""}>${st.turnedIn ? "✓ Turned in" : "Turn in"}</button>
      <p id="sendMsg" class="msg" role="status" aria-live="polite"></p>
      ${st.turnedIn ? `<p class="turned" id="turnedTag">✓ Turned in</p>` : ""}</div></section>`;
    $("w_" + p.id).addEventListener("input", ev => { st.writing[p.id] = ev.target.value; save(); });
    $("sendBtn").onclick = send;
  }
  const plain = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function writingProblem(p) {
    if (isT()) return "";   // Test T. (teacher) skips the writing rules
    const box = $("w_" + p.id), v = (box.value || "").trim();
    if (window.classJunkStop) {
      const junk = window.classJunkStop(box, { starter: p.stem, source: "from today" });
      if (junk) return junk;
    }
    if (v.length < p.min) return "Write a little more (2–3 full sentences).";
    if (/_{2,}/.test(v)) return "Fill in the blanks with your own words.";
    const stemWords = new Set(plain(p.stem).match(/[\p{L}']+/gu) || []);
    const own = new Set((plain(v).match(/[\p{L}']{3,}/gu) || []).filter(x => !stemWords.has(x)));
    if (own.size < 5) return "Add more of your own ideas. What is the thing, and who taught it?";
    if (p.mustAll.some(g => !g.some(x => plain(v).includes(plain(x))))) return p.mustMsg;
    return "";
  }
  function buildAnswers() {
    const a = { "Standard": STANDARD };
    const all = firstTry() + proofFirst() + readFirst() + readProofFirst(), outOf = 2 * N + 2 * R;
    a["First-try correct"] = all + " of " + outOf;
    a["First-try by standard"] = "Soc.9: " + all + " of " + outOf;
    a["First-try · Part 1 story questions"] = readFirst() + " of " + R;
    a["First-try · Part 1 story prove-it taps"] = readProofFirst() + " of " + R;
    STORY.forEach((p, i) => { const m = st.rmiss[p.id] || 0, pm = st.rpmiss[p.id] || 0;
      a["Story " + (i + 1) + ". " + p.title] = (m ? "Answer after " + m + " wrong " + (m === 1 ? "try" : "tries") : "Answer first try") + "; " + (pm ? "proof after " + pm + " wrong " + (pm === 1 ? "tap" : "taps") : "proof first try"); });
    a["First-try · Prove-it taps"] = proofFirst() + " of " + N;
    const side = k => CARDS.filter(c => c.ans === k);
    a["First-try · Born this way cards"] = side("born").filter(c => !st.miss[c.id]).length + " of " + side("born").length;
    a["First-try · Socialization cards"] = side("soc").filter(c => !st.miss[c.id]).length + " of " + side("soc").length;
    CARDS.forEach((c, i) => { const m = st.miss[c.id] || 0; a[(i + 1) + ". " + c.tag] = SIDES[c.ans].name + (m ? " (after " + m + " wrong " + (m === 1 ? "try" : "tries") + ")" : " (first try)"); });
    a["Writing: " + PROMPT.short] = ($("w_" + PROMPT.id).value || "").trim();
    return a;
  }
  async function send() {
    const msg = $("sendMsg"), btn = $("sendBtn");
    if (st.turnedIn && !isT()) { btn.disabled = true; return; }
    const prob = writingProblem(PROMPT);
    if (prob) { msg.textContent = prob; msg.className = "msg bad"; $("w_" + PROMPT.id).focus({ preventScroll: true }); return; }
    if (typeof window.classTurnIn !== "function") { msg.textContent = "Turn-in for this activity isn't switched on yet. Keep this page open and tell your teacher."; msg.className = "msg bad"; return; }
    btn.disabled = true; msg.textContent = "Sending your work…"; msg.className = "msg";
    try {
      const res = await window.classTurnIn(OLD_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: st.name, assignmentId: ASSIGNMENT_ID, assignmentTitle: TITLE, answers: buildAnswers() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your work did not save. Try again.");
      st.turnedIn = true; save();
      msg.textContent = "Turned in! Your teacher can see your work. You're done."; msg.className = "msg good";
      btn.textContent = "✓ Turned in"; btn.disabled = true;
      if (!$("turnedTag")) msg.insertAdjacentHTML("afterend", `<p class="turned" id="turnedTag">✓ Turned in</p>`);
    } catch (err) { msg.textContent = err.message || "Could not turn in. Try again."; msg.className = "msg bad"; btn.disabled = false; }
  }

  // ---------------- Render ----------------
  let firstRender = true;
  function render() {
    if (!firstRender) $("welcome").hidden = true;
    firstRender = false;
    hud();
    app.classList.toggle("anim", anim);
    try {
      if (st.step < 0) { pickFn = null; return intro(); }
      if (st.read < R) return readView();
      fitZoom();
      if (st.step < N) return cardView();
      if (st.step === N) return endView();
      return writeView();
    } finally { anim = false; }
  }

  $("restartBtn").onclick = () => {
    if (!confirm("Start over? This clears your work on this device.")) return;
    const name = st.name, wasIn = st.turnedIn; st = fresh(); st.name = name; st.turnedIn = wasIn;   // Start over never re-opens turning in
    try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
    locked = false; save(); render(); toTop();
  };
  if (st.step >= 0) {
    $("welcome").innerHTML = `<span>${esc("Welcome back, " + st.name + " — you're on " + (inStory() ? "page " + (st.read + 1) + " of the story" : st.step < N ? "card " + (st.step + 1) + " of " + N : st.step === N ? "the results" : "the reflection") + ".")}</span> <button type="button" class="notyou" id="notYouBtn">Not you? Start fresh</button>`;
    $("welcome").hidden = false;
    try { history.scrollRestoration = "manual"; } catch (e) {}
    window.scrollTo(0, 0);
    // Shared Chromebooks: a different student wipes this saved game, first-try record, and saved name, then reloads clean.
    $("notYouBtn").onclick = () => {
      st = fresh();
      try { window.classFirstTry && window.classFirstTry.reset(); } catch (e) {}
      try { localStorage.removeItem("site-student-name"); localStorage.removeItem("writingcheck:" + location.pathname); } catch (e) {}
      save(); location.reload();
    };
  }
  fitZoom();
  // Read-only test hook (lets automated tests see progress). Students never see it.
  window.__sortGame = { get state() { return JSON.parse(JSON.stringify(st)); }, cards: CARDS.map(c => ({ id: c.id, ans: c.ans })), story: STORY.map(p => ({ id: p.id, proof: p.proof, right: p.choices[0] })) };
  render();

  // ---------------- Test T. skip bar (shared/turnin.js) ----------------
  try {
    (window.classTestHooks = window.classTestHooks || []).push({
      count: () => TOTAL + 1 + R,
      index: () => st.step < 0 ? 0 : inStory() ? 1 + st.read : R + 1 + Math.min(st.step, TOTAL - 1),
      label: i => i === 0 ? "Title" : i <= R ? "Story page " + i + ": " + STORY[i - 1].title : (i - R) <= N ? "Card " + (i - R) + ": " + CARDS[i - R - 1].tag : i - R === N + 1 ? "Results (the two piles)" : "Reflection + turn in",
      go: i => {
        if (!st.name) st.name = "Test T.";
        locked = false; anim = false;
        if (i === 0) { st.step = -1; save(); render(); toTop(); return; }
        if (i <= R) {
          for (let j = 0; j < i - 1; j++) { st.rdone[STORY[j].id] = true; st.rpdone[STORY[j].id] = true; }
          st.step = 0; st.read = i - 1; st.last = null; save(); render(); toTop(); return;
        }
        STORY.forEach(p => { st.rdone[p.id] = true; st.rpdone[p.id] = true; }); st.read = R;
        const t = i - R - 1;
        for (let j = 0; j < t && j < N; j++) { st.done[CARDS[j].id] = true; st.pdone[CARDS[j].id] = true; }
        st.last = t > 0 && t <= N ? CARDS[Math.min(t, N) - 1].id : null;
        st.step = t; save(); render(); toTop();
      },
      solve: () => { if (inStory()) { if (solveFn) solveFn(); return; } if (st.step >= 0 && st.step < N && pickFn) { if (!st.done[CARDS[st.step].id]) locked = false; pickFn(CARDS[st.step].ans); } }
    });
    if (window.classTestSkip) window.classTestSkip.refresh();
  } catch (e) {}
})();
