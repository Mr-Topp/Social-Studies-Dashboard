// Must-watch videos for days a student missed (Fynn, 2026-11-21).
// Students' home page shows these on each missed day, next to that day's slides: only the 1-2 videos that best
// explain the day, never the whole list. The full list (teacher-submissions/videos.js) stays teacher only.
//
// These are the STARTING picks. They keep up with the teacher dashboard by themselves (Fynn, 2026-11-21):
//   - a video Fynn removes from a day drops off students' pages
//   - a video he adds or swaps in takes an open spot (so a replacement takes the old one's spot)
//   - the star button on each dashboard video turns "must-watch" on or off for that day
// Those changes live in the Sheet as link rows and reach this page through Teacher Tools' public "videos" list
// (video titles and links only). See MUST_WATCH.picks at the bottom of this file.
//
// Starting picks leave out on purpose: Netflix (needs a login), videos Fynn noted need him to frame or
// fact-check them, and very long ones.
// Keys: "unit|day" ("p1|unit|day" for Part 1, "friday|0" for Civics). Each video: [YouTube id, title, start second (optional)].
window.CLASS_MUST_WATCH = {
  "civics": {
    "1|0": [["uihNc_tdGbk","The making of the American Constitution"],["aMCDikASE4o","Why wasn't the Bill of Rights originally in the US Constitution?"]],
    "2|0": [["HuFR5XBYLfU","How is power divided in the United States government?"],["Otbml6WIQPo","Schoolhouse Rock: How a Bill Becomes a Law"]],
    "3|0": [["P9VdyPbbzlI","The fight for the right to vote in the United States"],["c_g1BMVFcuw","How to turn protest into powerful change"]],
    "4|0": [["pTliCI6uwmo","Why did the Colonies Declare Independence?"],["pHVksFyfBks","Who Are the Founding Fathers?"]],
    "5|0": [["GF6P-zqxXXQ","Secession and the Civil War"],["3-gsVVa9bJ0","Civil War Amendments"]],
    "6|0": [["tDbHn-zjlmE","The Statue of Liberty Breaks New Ground"],["4mkqV9OcMDE","History of the Holidays: Independence Day"]],
  },
  "government": {
    "1|1": [["3QGy2SbXTNE","People on the Street: What is the Purpose of Government"]],
    "1|2": [["ttu8va9_x1g","Do We Need Government? (The Social Contract)"]],
    "1|3": [["3sgAwVpCOOI","What are the Different Forms of Government?"]],
    "1|4": [["7xo4tUMdAMw","What is Magna Carta?"],["pTliCI6uwmo","Why did the Colonies Declare Independence?"]],
    "1|5": [["tlEoopuYny0","Articles of Confederation: The O.G. U.S. Constitution"],["CRUqhh1tDm4","Shays' Rebellion: Revolt Against the Revolution"]],
    "1|6": [["C31YmCbHsX4","Constitutional Compromise"],["VV6yOTg04zc","Federalist vs Anti Federalists"]],
    "1|7": [["YJOiEr58ESc","What is The Constitution?"],["HuFR5XBYLfU","How Is Power Divided in the United States Government?"]],
    "1|8": [["yYEfLm5dLMQ","A 3-minute guide to the Bill of Rights"]],
    "1|9": [["VRDRNDtx9j4","Federal and State Powers"]],
    "2|1": [["j_k_k-bHigM","Political Ideology"],["bhkpX9ZYBO4","What does a moderate voter look like?"]],
    "2|2": [["TMIB2C4tQ2w","US Republican Party History"],["Fa7JqIooxK0","US Democratic Party History"]],
    "2|3": [["q-Y-z6HmRgI","How to choose your news"],["hz6GULbowAk","Why people fall for misinformation"]],
    "2|4": [["UAZXFELMd2w","What is an interest group?"],["QpVnXUCGZVc","How do Super PACs work?"]],
    "2|5": [["A97aebAe0oU","How to Vote in the United States"],["W9H3gvnN468","Does your vote count? The Electoral College explained"]],
    "3|1": [["9giPmCWnepU","What Is the Judicial Branch of the U.S. Government?"],["KEjgAXxrkXY","How a case gets to the US Supreme Court"]],
    "3|2": [["na6JXT_F0ZI","Marbury v. Madison: What is Judicial Review?"],["Ao5k3KNURE8","Constitution Hall Pass: Tinker v. Des Moines"]],
    "4|1": [["hltv8-nzcUc","What Is the Legislative Branch of the U.S. Government?"],["aLFeBfxzurc","How Does Congress \"Work\"?"]],
    "4|2": [["Otbml6WIQPo","Schoolhouse Rock: How a Bill Becomes a Law"],["G7O9ZpJ-aiU","Facts of Congress: Committees"]],
    "5|1": [["BWR2p9j9hWo","What Is the Executive Branch of the U.S. Government?"],["Z9v9PEng7Xo","America 101: What is the Electoral College?"]],
    "5|2": [["oyOf3g-PJ94","How do executive orders work?"]],
    "5|3": [["8oier528TrE","America 101: What is the Cabinet?"],["PNojm8f6Seo","What is FEMA? The federal agency that responds to national disasters"]],
    "6|1": [["HuFR5XBYLfU","How is power divided in the United States government?"],["S4ymux9l-Qo","Facts of Congress: Checks and Balances"]],
    "6|2": [["lw7eDkAL0lo","Iowa Constitution & Government: The Iowa Legislature"]],
  },
  "sociology": {
    "1|1": [["DthAMxn8zp0","Psychology vs. Sociology: What's the Difference Between the Majors?"]],
    "1|2": [["gsgZOjCS8Ao","C. Wright Mills and the Sociological Imagination Explained"]],
    "1|3": [["OhVamhT4Q3s","Sociology: Auguste Comte"],["z9W0GQvONKc","Sociology: Émile Durkheim"]],
    "1|4": [["DbTt_ySTjaY","Major Sociological Paradigms"]],
    "1|5": [["sxYrzzy3cq8","How Statistics Can Be Misleading"],["o4XX90lqT6E","The Hawthorne Effect"]],
    "1|6": [["QwhK-iEyXYA","Sociology Research Methods"]],
    "1|7": [["vuMt8b4UrcI","The Milgram Experiment: Obedience to Authority"],["IRR7CwdHxUE","The Stanford Prison Experiment Was One of the Most Disturbing Studies Ever"]],
    "1|8": [["r7RrB8WOam4","The Truman Show"]],
    "2|1": [["L72h7bk6HZs","Social institutions - government, economy, health and medicine"]],
    "2|2": [["kGrVhM_Gi8k","Symbols, Values & Norms"]],
    "2|4": [["fKnAJCSGSdk","Urbanization and the future of cities"],["DESE8x3p8Z0","Understanding Globalisation with a Smartphone"]],
    "2|5": [["-gYl3nfChEM","What are Social Institutions?"]],
    "3|1": [["2K-zTQRdGCU","Introduction to Sociology: Socialization"],["wo5eb7BjCec","Are Serial Killers Born or Made?"]],
    "3|2": [["PF7m1fFr2eQ","Agents of socialization"],["XHIhkM1cAv4","Social Learning Theory: Bandura's Bobo Beatdown Experiments"]],
    "3|3": [["BGq9zW9w3Fw","Deviance"]],
    "3|4": [["UUukBV82P9A","Social Interaction & Performance"]],
    "3|5": [["_wFZ5Dbj8DA","Social Groups"]],
    "4|1": [["D9N7QaIOkG8","Why is it so hard to escape poverty?"],["2KlmvmuxzYE","Students Learn A Powerful Lesson About Privilege"]],
    "4|2": [["c8PEv5SV4sU","Social Class & Poverty in the US"],["kQVk9RYARIc","Charlie's Birthday Chocolate Bar (movie scene)"],["1YXmZvEdv6k","Charlie Finds the Last Golden Ticket (movie scene)"]],   // the two story-slide scenes, so the day still has a pick with the first one removed (Fynn, 11-22)
    "4|3": [["6rts_PWIVTU","Global Stratification & Poverty"]],
    "4|4": [["HoKkasEyDOI","The school-to-prison pipeline, explained"],["hZZmMrFQzVs","How Our Criminal Justice System Targets Communities"]],
    "4|5": [["9diZJks95Ko","How America Created Its Shameful Wealth Gap"],["13XU4fMlN3w","What people miss about the gender wage gap"]],
    "4|6": [["TwVuQ_Llh4k","Do protests actually work?"],["zySKwvQCpXE","Why Do Young People Get Involved in Social Movements?"]],
  },
  "us-history": {
    "1|1": [["7TfgJnXlaxo","Sound Smart: The Great Migration"],["y4BDnlUQ3CA","What happened when the United States banned alcohol"]],
    "1|2": [["D2iuUzkKu9k","The 1929 Stock Market Crash - Black Thursday"],["zle3Y3LgJJQ","Drawn History: The 1930s"]],
    "1|3": [["k4SoSUsQK9U","Drawn History: Herbert Hoover"],["VWvA26V4wk0","What few people know about the program that \"saved\" America"]],
    "2|1": [["jFICRFKtAc4","How Did Hitler Rise to Power?"]],
    "2|2": [["DNV8enpVwok","The Attack on Pearl Harbor"]],
    "2|3": [["0FDfhPMA95I","WW2: The Rise of Nazism and the Holocaust"]],
    "2|4": [["9aRVVae2i_c","The U.S. Homefront During WWII"],["bU2tt1h53jM","Ask History: Rosie the Riveter"]],
    "2|5": [["cZTioTkHcB0","Japanese-American Internment During WWII"],["35QYX94qz6g","Navajo Code Talkers"]],
    "2|6": [["dik51bMfPaQ","The Allies Undertake Operation Overlord",90]],
    "2|7": [["PF1A8NS1L9g","The Pacific Campaign Reaches a Fever Pitch"]],
    "3|1": [["Jb8aW46T3bg","Here's How the Truman Doctrine Established the Cold War"],["A4LpLqHNOTk","Sound Smart: The Red Scare"]],
    "3|2": [["h1wFrXKanC0","The Korean War: 5 Things to Know"]],
    "3|3": [["bwWW3sbk4EU","The history of the Cuban Missile Crisis"]],
    "3|4": [["rHBWwSyIbig","How Likely Were You to Be Drafted Into the Vietnam War?"],["vVNUlOUlMeo","Opposition to the Vietnam War in the United States"]],
    "4|1": [["-FcVBWIuR1U","The law that desegregated schools overnight"],["_omQ841ZAWg","The Montgomery Bus Boycott of 1955"]],
    "4|2": [["dJqA6PQRh3U","Sound Smart: The Freedom Rides"],["TLberHUJgHY","The Fight Against Segregation in Birmingham"]],
    "4|3": [["LbetS9Lk-I8","Betty Friedan, The Feminine Mystique"],["tFh4OloaJMo","The Life of Malcolm X"]],
    "5|1": [["MX_HYL6-0Co","History vs. Richard Nixon"],["E-WgNf6mn2k","What Was the Iran Hostage Crisis?"]],
    "5|2": [["KzmrxK3BOSA","Ronald Reagan"],["EeyGdy_SdhQ","Here's Why Reaganomics is so Controversial"]],
    "6|1": [["xl_lctDXHuQ","What Happened in the Persian Gulf War?"],["KP9VklrXPZs","Here's Why the Patriot Act Is So Controversial"]],
    "6|2": [["yM0uonkloXY","Here's What Caused the Great Recession"]],
    "6|3": [["EqcogBeAsuw","A Brief History Of Facebook"]],
    "p1|4|6": [["6UmERSpTtJc","How WWI Changed America: Women in WWI"]],
    "p1|4|7": [["YIiPRfjIzdE","How WWI Changed America: African Americans in WWI"],["s_CKhzqamEo","How WWI Changed America: Immigrants and WWI"]],
  },
  "world-history": {
    "1|1": [["DduN1cU2p9U","What was the 'Scramble for Africa'?"],["MU4vua2kNQY","History's Deadliest King"]],
    "1|2": [["1VIe42pAhuA","Birth of Empire: The East India Company"]],
    "1|3": [["NbHAWNQRV70","How Britain Got China Hooked on Opium"],["tfyEGBJ1INA","Japan's Home Run: The Meiji Restoration"]],
    "1|4": [["IIK9Lkf02TE","How a Wrong Turn Started World War I"],["GzCe4qg8K0E","Nationalism and WWI"]],
    "1|5": [["UBI6ZzaP2Uk","Did WWI Lead to WWII?"]],
    "1|6": [["jFICRFKtAc4","How did Hitler rise to power?"],["hN2Jb6JoNyw","The World Wars: Joseph Stalin"]],
    "1|7": [["4Rsz5u2bpvM","How Europe Descended Into the Holocaust"]],
    "1|8": [["-HazLOy71Jg","Germany Invades Poland in 1939"],["b-M8PdXte5o","The Attack on Pearl Harbor Changed Everything",125]],
    "1|9": [["EoyUSYymLxo","What Is The Holocaust?"]],
    "1|10": [["RIIN0Ug8wg8","America the Story of Us: D-Day Invasion"],["hKIsvh59Bj4","WWII in HD: Victory in Europe (VE Day)"]],
    "1|11": [["RsA6AdCRI-k","What Happened at the Nuremberg Trials?"],["FnQESSTouNU","The United Nations Is Created"]],
    "2|1": [["gxVsVA72wRU","How Did the Cold War Happen?"],["Jb8aW46T3bg","Here's How the Truman Doctrine Established the Cold War"]],
    "2|2": [["s-FbhEUdpGY","Inside North Korea: Life Under the World's Most Isolated Regime"],["KCLJKncqehc","Sound Smart: China's Cultural Revolution"]],
    "2|3": [["h1wFrXKanC0","The Korean War: 5 Things to Know"],["bwWW3sbk4EU","The history of the Cuban Missile Crisis"]],
    "2|4": [["DrcCTgwbsjc","Why was India split into two countries?"],["rJBGjtOlAYw","Sound Smart: Mahatma Gandhi"]],
    "2|5": [["xf5CPacHt4Q","Real Footage: \"Ghana Is Free Forever!\" Independence Night, 1957"],["tuQmpflB0Qk","The Cold War & Decolonization"]],   // same video, now under the name on the slide and dashboard (Fynn, 11-22)
    "2|6": [["OiqTffD5U2I","Why Did US Go to War with Vietnam"],["poE_nNW9-yk","The infamous and ingenious Ho Chi Minh Trail"]],
    "2|7": [["8_TYFfkc_1U","Ugly History: The Khmer Rouge murders"],["ke4kVFycpYY","How did South African Apartheid happen, and how did it finally end?"]],
    "2|8": [["8thC4hOn_C8","The Berlin Wall: A Short History of its Rise and Fall"],["oxEn63IJPqM","The Berlin Wall came down by mistake"]],
    "3|1": [["DESE8x3p8Z0","Understanding Globalisation with a Smartphone"]],
    "3|2": [["OTEVHykWZqk","CBS News finds children mining cobalt in Democratic Republic of Congo"],["s_iwrt7D5OA","Globalization: Good or Bad?"]],
    "3|3": [["FnQESSTouNU","The United Nations Is Created"],["ywJS7swbqeE","EU: All you need to know in under 2 minutes"]],
    "3|4": [["BSdEiOYvKpE","What are tariffs, and how do they work?"]],
    "3|5": [["nEkm96eHpoQ","How K-pop became a global phenomenon"]],
    "3|6": [["kPfzwLbzVYs","9/11: The Day the World Stood Still"]],
    "3|7": [["KP9VklrXPZs","Here's Why the Patriot Act Is So Controversial"]],
  },
};

// ---------- Keeping the picks matched to the teacher dashboard ----------
// Used by BOTH the student home page and the teacher dashboard, so the stars Fynn sees are exactly what students get.
window.MUST_WATCH = (function () {
  var MAX = 2;
  var HIDE = "Hidden video (teacher key)";            // a video removed from its day (teacher dashboard)
  var ON = "Must-watch (teacher key)";                 // starred by Fynn. Saved as: ON + " · " + the video's title
  var OFF = "Not must-watch (teacher key)";            // un-starred by Fynn
  var ytId = function (url) { var m = String(url || "").match(/(?:[?&]v=|youtu\.be\/|\/embed\/|\/shorts\/)([\w-]{11})/); return m ? m[1] : ""; };
  var same = function (a, b) { var x = ytId(a), y = ytId(b); return x && y ? x === y : String(a || "") === String(b || ""); };
  var isOn = function (l) { return !!l && String(l.title || "").indexOf(ON) === 0; };
  var isOff = function (l) { return !!l && l.title === OFF; };
  var isMark = function (l) { return isOn(l) || isOff(l); };
  // The rows (from Teacher Tools) that belong to one lesson day. key = "unit|day", "p1|unit|day", or Civics "friday|0".
  var dayRows = function (course, key, rows) {
    var k = String(key).split("|"), p1 = k[0] === "p1", unit = +k[p1 ? 1 : 0], day = +k[p1 ? 2 : 1];
    return (rows || []).filter(function (l) {
      return l && !l.removed && l.course === course && /^https:\/\//i.test(l.url || "") && (+l.part === 1) === p1 && +l.unit === unit && (course === "civics" || +l.day === day);
    });
  };
  // The videos a student sees on a missed day: [{ url, title }], never more than 2.
  function picks(course, key, rows) {
    var mine = dayRows(course, key, rows), out = [];
    // A video Fynn removed and then added back (often under a new name) is on the day again, so it can be picked (11-22).
    var back = function (url) { return mine.some(function (l) { return !/teacher key/i.test(l.title || "") && same(l.url, url); }); };
    var gone = function (url) { return mine.some(function (l) { return (isOff(l) || (l.title === HIDE && !back(url))) && same(l.url, url); }); };
    var add = function (url, title) {
      if (out.length >= MAX || !url || gone(url) || out.some(function (v) { return same(v.url, url); })) return;
      out.push({ url: url, title: String(title || "Video").replace(/\s*\(video\)\s*$/i, "") });
    };
    // 1) Fynn's stars come first.
    mine.filter(isOn).forEach(function (l) { add(l.url, l.title.slice(ON.length).replace(/^\s*·\s*/, "")); });
    // 2) Then the starting picks above.
    ((window.CLASS_MUST_WATCH[course] || {})[key] || []).forEach(function (v) { add("https://www.youtube.com/watch?v=" + v[0] + (v[2] ? "&t=" + (+v[2]) + "s" : ""), v[1]); });
    // 3) Then videos he added or swapped in on the dashboard, if a spot is open.
    mine.filter(function (l) { return !/teacher key/i.test(l.title || "") && /youtube\.com|youtu\.be|vimeo\.com/i.test(l.url); }).forEach(function (l) { add(l.url, l.title); });
    return out;
  }
  return { MAX: MAX, HIDE: HIDE, ON: ON, OFF: OFF, ytId: ytId, same: same, isOn: isOn, isOff: isOff, isMark: isMark, dayRows: dayRows, picks: picks };
})();
