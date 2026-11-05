// List of slide decks, shown inside each unit's dropdown on the Teacher Dashboard.
// The student home page also reads it to link each day's slides (published, slides-only view, no notes).
// Each deck lists its lesson days; each day link opens the deck at that day's first slide.
// part: 1 = Part 1 section (first half of the course). Empty decks (no days yet) are left out.
// pub: the deck's "Publish to web" id (slides only, no speaker notes, Linn-Mar accounts only) used for the student page's slide buttons.
// summativeSlide: the "Summative day" slide at the end of the deck (shown on the unit's summative row).
(function () {
  const g = id => "https://docs.google.com/presentation/d/" + id + "/edit";
  window.CLASS_PRESENTATIONS = [

    // ---- us-history ----
    { course: "us-history", part: 1, unit: 1, title: "Founding & Citizenship", url: g("19uFAySaTLUPMbrXUs98-N4FM5bJqW7DCORbgioLYl8E"), pub: "2PACX-1vRSoLXtQNETzgKfhY5YYng6e7mYDm8zE0LRZ-kQFdDEZJNCJpeUIg7QGFjP5LLe-u8gMJAHzIk3gxtx", summativeSlide: "p1u1d1s01summ",
      days: [{ day: 1, title: "Founding: Who Was Included in the Promise?", std: "US.2, 1", slide: "p1u1d1s01" }, { day: 2, title: "Articles: Why Was the First Government Weak?", std: "US.2", slide: "p1u1d2s01" }, { day: 3, title: "Convention: Who Wrote the Constitution?", std: "US.3, 2", slide: "p1u1d3s01" }, { day: 4, title: "Constitution: How Do You Stop Abuse of Power?", std: "US.2", slide: "p1u1d4s01" }, { day: 5, title: "Citizenship: Who Counted, 1776–1870?", std: "US.1", slide: "p1u1d5s01" }] },
    { course: "us-history", part: 1, unit: 2, title: "Civil War & Reconstruction", url: g("1B3WOJ8AushN6VeqfdwraR8lf79CX0bzdgKIictAAcXs"), pub: "2PACX-1vQf9dVn65IN4r4CTzkq0U0Y-BI2XYrYhVMk6EHTa6uxtbANDXKjhjqvsg_73ynwTedjMl2XQQCxasYh", summativeSlide: "p1u2d1s01summ",
      days: [{ day: 1, title: "Civil War: Why Did the Country Split?", std: "US.4, 6", slide: "p1u2d1s01" }, { day: 2, title: "Civil War: How Did the Union Win?", std: "US.4, 7", slide: "p1u2d2s01" }, { day: 3, title: "Freedom: Who Made Emancipation Happen?", std: "US.5, 6, 7", slide: "p1u2d3s01" }, { day: 4, title: "Reconstruction: How Do You Rebuild a Nation?", std: "US.5, 6", slide: "p1u2d4s01" }, { day: 5, title: "Reconstruction: How Did It End?", std: "US.5, 7", slide: "p1u2d5s01" }] },
    { course: "us-history", part: 1, unit: 3, title: "Westward & Industrial Expansion", url: g("1KvbNKTrByndrjUacw63Baq9wwnr1_-_cQLmLbYnFAKI"), pub: "2PACX-1vQieNi2FR8SoNbyc5udmBYZPL4c8HpQBIEJtTnfKHzYyN7VKmQZUf83yylf37uLCWPhBDAqG6HJHuiO", summativeSlide: "p1u3d1s01summ",
      days: [{ day: 1, title: "Inventions: How Did New Machines Change Life?", std: "US.8, 12", slide: "p1u3d1s01" }, { day: 2, title: "Railroads: How Did Trains Change the Country?", std: "US.9, 8", slide: "p1u3d2s01" }, { day: 3, title: "Immigration: Why Did People Move West?", std: "US.10, 9", slide: "p1u3d3s01" }, { day: 4, title: "The Plains: What Did It Take to Survive?", std: "US.11, 9", slide: "p1u3d4s01" }, { day: 5, title: "Native Nations: How Did They Lose Their Land?", std: "US.11, 12", slide: "p1u3d5s01" }, { day: 6, title: "Civic Virtue: Who Stood Up for Others?", std: "US.13, 9, 12", slide: "p1u3d6s01" }] },
    { course: "us-history", part: 1, unit: 4, title: "Progressive Era", url: g("1Qh9F9Gjkq1Ht_INUWHT3RX-WY3n5libnlrUMFcOZy_M"), pub: "2PACX-1vR9jJRLVWjn5FsRVRAkOHToIFVlk7orIsf35o7I1ahoyNTvHHqhCrIMo7jF-fFtmsZmtk28oVyrCN9Y", summativeSlide: "p1u4d1s01summ",
      days: [{ day: 1, title: "Progressive Era: Can People Fix Big Problems?", std: "US.14, 16", slide: "p1u4d1s01" }, { day: 2, title: "Labor: How Did Workers Fight Back?", std: "US.14", slide: "p1u4d2s01" }, { day: 3, title: "Muckrakers: Can the Truth Change Laws?", std: "US.16, 17", slide: "p1u4d3s01" }, { day: 4, title: "Workplace Reform: Who Keeps Workers Safe?", std: "US.14, 16", slide: "p1u4d4s01" }, { day: 5, title: "Big Business: Should Government Step In?", std: "US.16, 14", slide: "p1u4d5s01" }, { day: 6, title: "Suffrage: How Did Women Win the Vote?", std: "US.15, 18", slide: "p1u4d6s01" }, { day: 7, title: "Equal Rights: Who Did Reform Leave Out?", std: "US.15, 17, 18", slide: "p1u4d7s01" }] },
    { course: "us-history", unit: 1, title: "Roaring 20s & the Great Depression", url: g("1SGWhPkqqQboEAaB9OwM1X7H4KIxRzCqygMmgcWA1WBY"), pub: "2PACX-1vRPPB7vbGRQrOjFamy3UTECZrqJ5q_qnlTo3Kvfv3DNGa045JMeLffvUPE6cR3gMw47DOIgCF7ZwDJP", summativeSlide: "p1summ",
      days: [{ day: 1, title: "The Roaring 20s: New Ideas and New Technology", std: "US.23–24, 26–27", slide: "p1" }, { day: 2, title: "The Boom, the Crash, and the Great Depression", std: "US.25–26", slide: "p13" }, { day: 3, title: "Responses, Viewpoints, and Iowans", std: "US.25, 27–28", slide: "p23" }] },
    { course: "us-history", unit: 2, title: "World War II", url: g("1pUGsmryRs7-xYkxp4rOWNMnRLewlVWJIwnw-xI-PI04"), pub: "2PACX-1vSgKu3-WFdY4UJvX74708xilYnXARAayOIfU8vj8Eo5xVsL2oPKcRk_BBLkSu_uWyRWqMzlqgbz-1we", summativeSlide: "p1summ",
      days: [{ day: 1, title: "World War II: Why Couldn't America Stay Out?", std: "US.29, 33", slide: "p1" }, { day: 2, title: "World War II: How Did America Enter the War?", std: "US.29, 32, 33, 34", slide: "SLIDES_API701598609_0" }, { day: 3, title: "World War II: What Did America Do About the Holocaust?", std: "US.29, 30, 33", slide: "h9f4fd9f8e308616_5_75" }, { day: 4, title: "World War II: How Did the War Change Life at Home?", std: "US.29, 31, 34", slide: "h9f4fd9f8e308616_5_227" }, { day: 5, title: "World War II: Were All Americans Treated Fairly?", std: "US.31, 32, 33", slide: "h9f4fd9f8e308616_5_361" }, { day: 6, title: "World War II: How Did the Allies Beat Germany?", std: "US.29, 33", slide: "h9f4fd9f8e308616_5_529" }, { day: 7, title: "World War II: How Did the War with Japan End?", std: "US.29, 32, 33, 34", slide: "h9f4fd9f8e308616_5_648" }] },
    { course: "us-history", unit: 3, title: "The Cold War", url: g("14ZrFkpiug0H6JDjxpser1Ug-PBBimvS_Yv8816fJfr0"), pub: "2PACX-1vSGH1Wi__jMwat2rMMm4EXYv6DbQZU5hqC22WLm8rxBRoqgTRjJABpkA6h1Qb_XVwErErkOJSDRJSUh", summativeSlide: "u3d1s01summ",
      // 2026-11-02: days combined so the unit fits before its test (Dec 2 no school). Each row opens the deck day(s) it covers.
      plan: [
        { day: 1, title: "The Cold War: How Did Allies Become Enemies, and Why Were Americans Afraid at Home?", std: "US.36, 37, 39, 40, 41", slides: [{ day: 1 }, { day: 2, label: "fear at home" }] },
        { day: 2, title: "The Cold War: Why Did Americans Fight in Korea?", std: "US.35, 37, 40", slides: [{ day: 3 }] },
        { day: 3, title: "The Cold War: How Did Fear Shape the 1950s?", std: "US.37–40", slides: [{ day: 4 }] },
        { day: 4, title: "The Cold War: How Did Vietnam Divide Americans?", std: "US.35–37, 40, 41", slides: [{ day: 5 }] },
        { day: 5, title: "Review + Summative", std: "US.35–41", slides: [{ day: 6 }] }
      ],
      days: [{ day: 1, title: "The Cold War: How Did Allies Become Enemies?", std: "US.37, 39, 40", slide: "u3d1s01" }, { day: 2, title: "The Cold War: Why Were Americans Afraid at Home?", std: "US.36, 40, 41", slide: "u3d2s01" }, { day: 3, title: "The Cold War: Why Did Americans Fight in Korea?", std: "US.35, 37, 40", slide: "u3d3s01" }, { day: 4, title: "The Cold War: How Did Fear Shape the 1950s?", std: "US.37–40", slide: "u3d4s01" }, { day: 5, title: "The Cold War: How Did Vietnam Divide Americans?", std: "US.35–37, 40, 41", slide: "u3d6s01" }, { day: 6, title: "Review + Summative", std: "US.35–41", slide: "u3d6s09" }] },
    { course: "us-history", unit: 4, title: "Civil Rights", url: g("1aoSmu8Le_U38p2a7trtVCzRPYfPBIfBEqD0gc8TYB0E"), pub: "2PACX-1vRvWzoSFFUC6qrQCZYkAz61maXZiXtGoNojd1cd13xBcky5qi4ypjpET-_LSDbqxgqCEwLEctinhg7H", summativeSlide: "u4d1s01summ",
      days: [{ day: 1, title: "Civil Rights: How Did Americans Fight Segregation?", std: "US.42–45", slide: "u4d1s01" }, { day: 2, title: "Civil Rights: How Did Nonviolence Change Laws?", std: "US.42–45", slide: "u4d2s01" }, { day: 3, title: "Civil Rights: Who Else Fought for Equal Rights?", std: "US.42, 44, 45", slide: "u4d3s01" }, { day: 4, title: "Review + Summative", std: "US.42–45", slide: "u4d4s07" }] },
    { course: "us-history", unit: 5, title: "Rise of Conservatism", url: g("1KM3NcuWpURBxiLCQdmacCDVQiZIy5f0XiWsf_Y3yGfY"), pub: "2PACX-1vT-sqC4gNkqbBnctUMTUFQHwBPzrQ6whxHpTFEZCzbLZVch92-_xzTEFFWavCtwaw5Oas4_sVR0mn2W", summativeSlide: "u5d1s01summ",
      days: [{ day: 1, title: "Rise of Conservatism: Why Did Many Voters Change?", std: "US.46, 47, 49", slide: "u5d1s01" }, { day: 2, title: "Rise of Conservatism: What Did the New Right Want?", std: "US.46–49", slide: "u5d2s01" }, { day: 3, title: "Rise of Conservatism: Who Won and Lost in the New Economy?", std: "US.47–50", slide: "u5d3s01" }] },
    { course: "us-history", unit: 6, title: "Modern America", url: g("1EaHd7ZHPbGRVHsgO_DhR_iF5ZW8Wvvvjy5BLjS1qCGE"), pub: "2PACX-1vSlvsSmo7zC6y9t_Byl97k4XFJT2igQdEK7-uwl7F0MH7PRApsw4YhEN1kE5UPWLuNPzyDJNjnMgvit", summativeSlide: "u6d1s01summ",
      // 2026-11-03: last summative by Wed Jan 6. Day 3 = short lesson (bellringer + 4 slides; the rest is hidden in the deck) + test.
      plan: [
        { day: 1, title: "Modern America: What Should a Superpower Do?", std: "US.52, 53, 55, 56", slides: [{ day: 1 }] },
        { day: 2, title: "Modern America: How Should Government Handle a Crisis?", std: "US.51, 53, 55", slides: [{ day: 2 }] },
        { day: 3, title: "Short lesson: How Did Technology and Trade Change Jobs? + Summative", std: "US.51–56", slides: [{ day: 3, label: "short lesson" }] }
      ],
      days: [{ day: 1, title: "Modern America: What Should a Superpower Do?", std: "US.52, 53, 55, 56", slide: "u6d1s01" }, { day: 2, title: "Modern America: How Should Government Handle a Crisis?", std: "US.51, 53, 55", slide: "u6d2s01" }, { day: 3, title: "Modern America: How Did Technology and Trade Change Jobs?", std: "US.54–56", slide: "u6d3s01" }, { day: 4, title: "Review + Summative", std: "US.51–56", slide: "u6d4s07" }] },

    // ---- world-history ----
    { course: "world-history", part: 1, unit: 1, title: "Exploration & Global Trade", url: g("1wct6u3ZpPeNj3Y5yfAcTOEzs4jKTlziOzH3FTYJbnMA"), pub: "2PACX-1vSdTGYYUi8pFN6s7wJEXaRlwyWawsQ96LEzxEHB3grJH5PMw9WToVEP_HhjykdGkOrQuCWFaghMfrkI", summativeSlide: "p1u1d01s01summ",
      days: [{ day: 1, title: "Spices and Silk: Why Risk It All for Pepper?", std: "WH.1, 4", slide: "p1u1d01s01" }, { day: 2, title: "1492: Who Gets to Tell the Story?", std: "WH.3, 4", slide: "p1u1d02s01" }, { day: 3, title: "Columbian Exchange: What's on Your Plate?", std: "WH.2, 4", slide: "p1u1d03s01" }, { day: 4, title: "Conquistadors: How Did So Few Beat So Many?", std: "WH.3, 1", slide: "p1u1d04s01" }, { day: 5, title: "The Atlantic Slave Trade: Who Paid the Price?", std: "WH.1, 3, 4", slide: "p1u1d05s01" }] },
    { course: "world-history", part: 1, unit: 2, title: "Expanding Empires", url: g("1Cr4rGS6Tr-dSEt0uif03pjYwJtr_zW9hnZxmbIMLbbw"), pub: "2PACX-1vSoI9nzqXzF1soyxyudYclqQ4zKL3vJZBBEcNE2bhtbUVhJlkbYzyKp4GlCWykxqXo46rRZwyNMxPyo", summativeSlide: "p1u2d01s01summ",
      days: [{ day: 1, title: "Empires: Land or Sea—Which Wins?", std: "WH.5, 7", slide: "p1u2d01s01" }, { day: 2, title: "Ottomans: How Do You Break a Wall?", std: "WH.5, 6, 8", slide: "p1u2d02s01" }, { day: 3, title: "Mughals: What Makes a Ruler Fair?", std: "WH.5, 6, 8", slide: "p1u2d03s01" }, { day: 4, title: "Absolutism: Would You Pay a Beard Tax?", std: "WH.6, 8, 5", slide: "p1u2d04s01" }, { day: 5, title: "Ocean Empires: What Did They Leave Behind?", std: "WH.5, 7, 9, 6", slide: "p1u2d05s01" }] },
    { course: "world-history", part: 1, unit: 3, title: "Renaissance, Reformation & New Ideas", url: g("1BHJ5dvoTEia_1M1QHFw6uLLJOG2ociBZz3jzQT7Naco"), pub: "2PACX-1vSo5nSaQjBhGTdkSgFE6V_39--ZgYLSZAcIuyr4AUlbetyim_4idgEuJoslon5JeTiRwIU2ME3zWsoU", summativeSlide: "p1u3d01s01summ",
      days: [{ day: 1, title: "Renaissance: Why Did Italy Get a Rebirth?", std: "WH.10", slide: "p1u3d01s01" }, { day: 2, title: "Printing Press: How Do Ideas Go Viral?", std: "WH.14, 10", slide: "p1u3d02s01" }, { day: 3, title: "Reformation: Can One Person Change a Church?", std: "WH.13, 11, 14", slide: "p1u3d03s01" }, { day: 4, title: "Choosing Sides: Who Picks Your Religion?", std: "WH.13, 11", slide: "p1u3d04s01" }, { day: 5, title: "Science: How Do We Know What's True?", std: "WH.12", slide: "p1u3d05s01" }, { day: 6, title: "Enlightenment: Can We Question Kings?", std: "WH.12", slide: "p1u3d06s01" }] },
    { course: "world-history", part: 1, unit: 4, title: "Revolutions & Industrialization", url: g("1gpdf-xnu4mOxgv2mmTmwP2RliVk3TDqk5ScyAG7uSls"), pub: "2PACX-1vRSnwEbICRbdweUXyvzt7NsteoyFLSaczT3R8xbUkCQlnXEomx5AO4XBx3kKJ2sOdrMDmpYs79xTDCr", summativeSlide: "p1u4ad01s01summ",
      days: [{ day: 1, title: "Revolutions: When Do People Push Back?", std: "WH.15, 17", slide: "p1u4ad01s01" }, { day: 2, title: "France 1789: Who Pays the Bill?", std: "WH.15, 16, 18", slide: "p1u4ad02s01" }, { day: 3, title: "Look Back: How Radical Was America?", std: "WH.16, 19, 18", slide: "p1u4ad03s01" }, { day: 4, title: "Freedom for Whom?", std: "WH.16, 18, 19, 17", slide: "p1u4ad04s01" }, { day: 5, title: "Industry: Why Did Britain Go First?", std: "WH.20", slide: "p1u4bd05s01" }, { day: 6, title: "Factory Life: Would You Take This Job?", std: "WH.22", slide: "p1u4bd06s01" }, { day: 7, title: "Industry Spreads: Copy, Buy, or Build?", std: "WH.21", slide: "p1u4bd07s01" }, { day: 8, title: "Look Back: Who Should Own the Factory?", std: "WH.23", slide: "p1u4bd08s01" }] },
    { course: "world-history", unit: 1, title: "Imperialism & the World Wars", url: g("1JUfOmeu36L67ptPXmqXB3ZeM1FH4EsbW_zigcG4gAO0"), pub: "2PACX-1vRnlcNDdM7TzhtvNeQuwhmjHVvB9x4Xpp0L3RaCvkOdjrx7XXJDUk_t9ZBdjJefG8g6-B2eDjIuDQ1J", summativeSlide: "w1ad01s01summ",
      days: [{ day: 1, title: "Imperialism: Why Grab a Whole Continent?", std: "WH.24, 28", slide: "w1ad01s01" }, { day: 2, title: "Colonial Vietnam: Can a Reward Plan Backfire?", std: "WH.27, 24, 25", slide: "w1ad02s01" }, { day: 3, title: "Pacific Pressure: Fight Back or Copy Them?", std: "WH.27, 25, 26", slide: "w1ad03s01" }, { day: 4, title: "Look Back: Could Empires Start a World War?", std: "WH.29, 32, 33", slide: "w1ad04s01" }, { day: 5, title: "After WWI: How Do You Make Peace Last?", std: "WH.31, 33", slide: "w1ad05s01" }, { day: 6, title: "Look Back: Broke and Angry. Who Do You Trust?", std: "WH.31, 30", slide: "w1ad06s01" }, { day: 7, title: "Nazi Persecution: How Does Hate Grow?", std: "WH.30, 33", slide: "w1bd07s01" }, { day: 8, title: "Look Back: When Should Someone Step In?", std: "WH.29, 30", slide: "w1bd08s01" }, { day: 9, title: "The Holocaust: Why Do We Remember?", std: "WH.30, 33", slide: "w1bd09s01" }, { day: 10, title: "WWII Turning Points: What Wins a War?", std: "WH.32, 33", slide: "w1bd10s01" }, { day: 11, title: "Look Back: Punish the Losers, or Rebuild?", std: "WH.31, 29", slide: "w1bd11s01" }] },
    { course: "world-history", unit: 2, title: "Cold War & Decolonization", url: g("1C2lIeO3ujBxF6Uk0pmtRohzPkXUIjBkjLIRcFFjMRFI"), pub: "2PACX-1vQsX9d9h6D7Fmu6FhsarF44AJ2u68NwZAw-lmq4CQXh3WA6z0AKFOJl77NqHdh5CPWRrku3CoTyldW-", summativeSlide: "w2ad01s01summ",
      // 2026-11-02: days combined so the unit fits before its test (Dec 2 no school). Each row opens the deck day(s) it covers.
      plan: [
        { day: 1, title: "Cold War: How Do Allies Become Enemies, and How Do You Stop a Spread?", std: "WH.34, 35, 37", slides: [{ day: 1 }, { day: 2, label: "containment" }] },
        { day: 2, title: "Control: Can One Leader Remake a Country?", std: "WH.34, 35, 38", slides: [{ day: 3, label: "control" }, { day: 4, label: "China" }] },
        { day: 3, title: "Hot Spots: Why Fight Far From Home?", std: "WH.34, 37", slides: [{ day: 5 }] },
        { day: 4, title: "Empire's End: How Do Colonies Get Free?", std: "WH.36, 34", slides: [{ day: 6 }] },
        { day: 5, title: "Africa: What Would Freedom Day Feel Like?", std: "WH.36, 34, 37", slides: [{ day: 7 }] },
        { day: 6, title: "Vietnam: Who Should Decide a Nation's Future?", std: "WH.36, 37, 34", slides: [{ day: 8 }] },
        { day: 7, title: "Cambodia & Apartheid: Can Regular People Stop Injustice?", std: "WH.35, 37, 38", slides: [{ day: 9, label: "Cambodia" }, { day: 10, label: "apartheid" }] },
        { day: 8, title: "1989: How Does a Wall Come Down?", std: "WH.34, 37, 35", slides: [{ day: 11 }] }
      ],
      days: [{ day: 1, title: "Cold War: How Do Allies Become Enemies?", std: "WH.34, 35", slide: "w2ad01s01" }, { day: 2, title: "Containment: How Do You Stop a Spread?", std: "WH.34, 37", slide: "w2ad02s01" }, { day: 3, title: "Control: Would You Act Differently If Watched?", std: "WH.35", slide: "w2ad03s01" }, { day: 4, title: "China: Can One Leader Remake a Country?", std: "WH.34, 35, 38", slide: "w2ad04s01" }, { day: 5, title: "Hot Spots: Why Fight Far From Home?", std: "WH.34, 37", slide: "w2ad05s01" }, { day: 6, title: "Empire's End: How Do Colonies Get Free?", std: "WH.36, 34", slide: "w2ad06s01" }, { day: 7, title: "Africa: What Would Freedom Day Feel Like?", std: "WH.36, 34, 37", slide: "w2bd07s01" }, { day: 8, title: "Vietnam: Who Should Decide a Nation's Future?", std: "WH.36, 37, 34", slide: "w2bd08s01" }, { day: 9, title: "Cambodia: Can the World Keep “Never Again”?", std: "WH.38, 35", slide: "w2bd09s01" }, { day: 10, title: "Apartheid: Can Regular People Beat a System?", std: "WH.37, 38", slide: "w2bd10s01" }, { day: 11, title: "1989: How Does a Wall Come Down?", std: "WH.34, 37, 35", slide: "w2bd11s01" }] },
    { course: "world-history", unit: 3, title: "The World Since 1991", url: g("12LQppsCMxrA3K5kbT_MK4ikKpFc8b1ae88G15Gm4m-0"), pub: "2PACX-1vSG2jTkw7wEu5nfT0huHbieqedtssUqxausVy74Syc4laaZfccvnnan1SjpwTLmAUh_tiZZK4sRQOi1", summativeSlide: "w3d01s01summ",
      // 2026-11-03: last summative by Wed Jan 6. Day 7 = short lesson (bellringer + 4 slides; the rest is hidden in the deck) + test.
      plan: [
        { day: 1, title: "Globalization: How Far Did Your Stuff Travel?", std: "WH.39", slides: [{ day: 1 }] },
        { day: 2, title: "Globalization: Who Wins, Who Loses?", std: "WH.39, 42", slides: [{ day: 2 }] },
        { day: 3, title: "Global Rules: Who Should Make Them?", std: "WH.41", slides: [{ day: 3 }] },
        { day: 4, title: "Pushing Back: Would You Pay More for Local?", std: "WH.42", slides: [{ day: 4 }] },
        { day: 5, title: "Pop Culture: Where Did Your Playlist Come From?", std: "WH.40", slides: [{ day: 5 }] },
        { day: 6, title: "Terrorism: Why Do Some Groups Use Fear?", std: "WH.43", slides: [{ day: 6 }] },
        { day: 7, title: "Short lesson: Fighting Terror: Safety or Freedom? + Summative", std: "WH.39–43", slides: [{ day: 7, label: "short lesson" }] }
      ],
      days: [{ day: 1, title: "Globalization: How Far Did Your Stuff Travel?", std: "WH.39", slide: "w3d01s01" }, { day: 2, title: "Globalization: Who Wins, Who Loses?", std: "WH.39, 42", slide: "w3d02s01" }, { day: 3, title: "Global Rules: Who Should Make Them?", std: "WH.41", slide: "w3d03s01" }, { day: 4, title: "Pushing Back: Would You Pay More for Local?", std: "WH.42", slide: "w3d04s01" }, { day: 5, title: "Pop Culture: Where Did Your Playlist Come From?", std: "WH.40", slide: "w3d05s01" }, { day: 6, title: "Terrorism: Why Do Some Groups Use Fear?", std: "WH.43", slide: "w3d06s01" }, { day: 7, title: "Fighting Terror: Safety or Freedom?", std: "WH.43, 41", slide: "w3d07s01" }] },

    // ---- sociology ----
    { course: "sociology", unit: 1, title: "Foundations, Perspectives & Methods", url: g("12guCZyH2bmzsCxPOJUTXgJnAlNTMZ0EmO2JxisEFkXM"), pub: "2PACX-1vTDzaPfvX1wpxDB1KxaAAkgfpvL-LtJO1oqJMOFntS7F3uIhUQD_k4tJ8BoBHm5vb7r7udBR65fFgI0", summativeSlide: "so1summ",
      days: [{ day: 1, title: "Sociology: How Do Groups Shape What You Do?", std: "SOC.2", slide: "so1s01" }, { day: 2, title: "Sociology: Is It Just Me or a Bigger Pattern?", std: "SOC.2", slide: "so2s01" }, { day: 3, title: "Sociology: Why Do People Follow the Rules?", std: "SOC.4", slide: "so3s01" }, { day: 4, title: "Sociology: Can One Problem Have Three Causes?", std: "SOC.4", slide: "so4s01" }, { day: 5, title: "Sociology: How Can You Prove a Hot Take?", std: "SOC.1", slide: "so5s01" }, { day: 6, title: "Sociology: How Should We Study People?", std: "SOC.1", slide: "so6s01" }, { day: 7, title: "Sociology: Should Researchers Ever Lie to You?", std: "SOC.1", slide: "so7s01" }] },
    { course: "sociology", unit: 2, title: "Culture, Institutions & Society", url: g("1ARuSpvs5XwgItN44NgHMt1S9Ykjy7Nma5wQPwG1yXxw"), pub: "2PACX-1vTbt0PJta-iWO5i5S93l3Lrh8wZKvfnnEAyePl60xgS3r8qvsq0uB_O2xE7q4qfLx9ZEAmKEKzSmOnF", summativeSlide: "s21s01summ",
      days: [{ day: 1, title: "Sociology: Who Wrote the Unwritten Rules?", std: "SOC.5, 6, 7", slide: "s21s01" }, { day: 2, title: "Sociology: What Makes Your Group a Culture?", std: "SOC.5, 6", slide: "s22s01" }, { day: 3, title: "Sociology: Why Does Normal Feel So Normal?", std: "SOC.5, 6", slide: "s23s01" }, { day: 4, title: "Sociology: Why Do People Team Up for Change?", std: "SOC.7, 8", slide: "s24s01" }, { day: 5, title: "Sociology: What Shapes Your Everyday Life?", std: "SOC.5, 6, 7, 8", slide: "s25s01" }] },
    { course: "sociology", unit: 3, title: "Socialization, the Self & Groups", url: g("1IhgaaVGGyevEVLE8JeCGkWLmATK3OxWQgUZQ3WMPm1U"), pub: "2PACX-1vQDCeZOWlYRBEWUhVOacr_XUA-lSl7qPX3qC0ie-Bj-KiVuj3pQcOECkWYXV9W8B9DgIkPmfAddVoON", summativeSlide: "s31s01summ",
      // 2026-11-02: days combined so the unit fits before its test (Dec 2 no school). Each row opens the deck day(s) it covers.
      plan: [
        { day: 1, title: "Sociology: Who Taught You How to Be You?", std: "SOC.9", slides: [{ day: 1 }] },
        { day: 2, title: "Sociology: Who Shapes You the Most Right Now?", std: "SOC.9", slides: [{ day: 2 }] },
        { day: 3, title: "Sociology: Can Breaking a Rule Be Right?", std: "SOC.4, 9", slides: [{ day: 3 }] },
        { day: 4, title: "Sociology: Who Decides Who You Are?", std: "SOC.10", slides: [{ day: 4 }] },
        { day: 5, title: "Sociology: Why Do Groups Change How We Act, and Why Do We Root for Us Over Them?", std: "SOC.10, 11", slides: [{ day: 5 }, { day: 6, label: "us vs. them" }] },
        { day: 6, title: "Unit 3 Review", std: "SOC.4, 9–11" }
      ],
      days: [{ day: 1, title: "Sociology: Who Taught You How to Be You?", std: "SOC.9", slide: "s31s01" }, { day: 2, title: "Sociology: Who Shapes You the Most Right Now?", std: "SOC.9", slide: "s32s01" }, { day: 3, title: "Sociology: Can Breaking a Rule Be Right?", std: "SOC.4, 9", slide: "s33s01" }, { day: 4, title: "Sociology: Who Decides Who You Are?", std: "SOC.10", slide: "s34s01" }, { day: 5, title: "Sociology: Why Do Groups Change How We Act?", std: "SOC.11", slide: "s35s01" }, { day: 6, title: "Sociology: Why Do We Root for Us Over Them?", std: "SOC.10, 11", slide: "s36s01" }] },
    { course: "sociology", unit: 4, title: "Stratification & Inequality", url: g("1L6owAmyMqNK2gqqkbYARwXUbpR1ABUJWHpqwqrQxoCs"), pub: "2PACX-1vQbVxkdW3EO661uEnf296aoJovA58vquOF3b_wFeVttMYaTVOJktzn87sXf2SamW45n5vsYqqntaW43", summativeSlide: "s41s01summ",
      days: [{ day: 1, title: "Sociology: Does Everyone Start Out Equal?", std: "SOC.12", slide: "s41s01" }, { day: 2, title: "Sociology: Who Can Afford a Bad Day?", std: "SOC.12, 13", slide: "s42s01" }, { day: 3, title: "Sociology: Why Are Some Countries Rich?", std: "SOC.12", slide: "s43s01" }, { day: 4, title: "Sociology: Do Institutions Treat Us Equally?", std: "SOC.14", slide: "s44s01" }, { day: 5, title: "Sociology: Why Does Inequality Cause Conflict?", std: "SOC.13", slide: "s45s01" }, { day: 6, title: "Sociology: How Do People Fight Inequality?", std: "SOC.15", slide: "s46s01" }] },

    // ---- government ----
    { course: "government", unit: 1, title: "Foundations", url: g("16kOZNiGGwIK4CfQXlpSoumBXYRtuYIaL1zjc3IiWJus"), pub: "2PACX-1vRD0AQT47rhk_tccJw-EKPnNBUusxbD76uAgohgkFyfzRP_A-MZGsP5YIUWyAcUIcG0DDK0LklGrDL6", summativeSlide: "g1d1s01summ",
      // 2026-11-04: deck re-split to match Fynn's 10 Schoology day posts (slides now say DAY 1–10), so each row opens its own deck day.
      plan: [
        { day: 1, title: "Purposes and Origins of Government", std: "Gov.1, 5", slides: [{ day: 1 }] },
        { day: 2, title: "Social Contract, Popular Sovereignty, and Rule of Law", std: "Gov.2, 4", slides: [{ day: 2 }] },
        { day: 3, title: "Types and Systems of Government", std: "Gov.1", slides: [{ day: 3 }] },
        { day: 4, title: "Roots of American Government", std: "Gov.3", slides: [{ day: 4 }] },
        { day: 5, title: "Articles of Confederation", std: "Gov.3", slides: [{ day: 5 }] },
        { day: 6, title: "Constitutional Convention, Compromises, and Ratification", std: "Gov.2–4", slides: [{ day: 6 }] },
        { day: 7, title: "Constitution", std: "Gov.1, 3–5", slides: [{ day: 7 }] },
        { day: 8, title: "Bill of Rights", std: "Gov.3–4", slides: [{ day: 8 }] },
        { day: 9, title: "Federalism, the Supremacy Clause, and Iowa Government", std: "Gov.1–4, 9", slides: [{ day: 9 }] },
        { day: 10, title: "Summative", std: "Gov.1–5, 9", slides: [{ day: 10, label: "review" }] }
      ],
      days: [{ day: 1, title: "Government: Why Do People Make Rules?", std: "Gov.1, 5", slide: "g1d1s01" }, { day: 2, title: "Enlightenment: Who Gives Government Its Power?", std: "Gov.2", slide: "g1d2s01" }, { day: 3, title: "Types of Government: Who Holds the Power?", std: "Gov.1", slide: "g1d3s01" }, { day: 4, title: "American Roots: Where Did Our Rights Start?", std: "Gov.3, 4", slide: "g1d4s01" }, { day: 5, title: "Articles: Why Did Our First Government Fail?", std: "Gov.3, 4", slide: "g1u1d5bell" }, { day: 6, title: "Constitution: How Do You Make a Fair Deal?", std: "Gov.3, 4", slide: "g1d5s01" }, { day: 7, title: "Constitution: How Much Power Is Too Much?", std: "Gov.3, 4, 5", slide: "g1d8s01" }, { day: 8, title: "Bill of Rights: How Free Are You at School?", std: "Gov.3, 4, 5", slide: "g1d7s01" }, { day: 9, title: "Federalism: Who Holds the Power?", std: "Gov.3, 4, 9", slide: "g1d6s01" }, { day: 10, title: "Review: What Have We Built So Far?", std: "Gov.1–5, 9", slide: "g1d9s01" }] },
    { course: "government", unit: 2, title: "Political Beliefs, Parties & Citizenship", url: g("1r_9cfbyiq-eIJujo9HQqOoTCqDmfSucM0VhRUgc3pDE"), pub: "2PACX-1vR3QERGgirHqReDreLZfqfNMOWtQUtXyVwAiMIr6ZcfAPI0MEQAo37l0U19sJMFzmQujfjAPeX7DM0O", summativeSlide: "g2d1s01summ",
      // 2026-11-04: deck rebuilt into Fynn's 5 Schoology days, so each row opens its own deck day.
      plan: [
        { day: 1, title: "Political Ideology and Parties", std: "Gov.12", slides: [{ day: 1 }] },
        { day: 2, title: "Republican and Democratic Parties", std: "Gov.12, 11", slides: [{ day: 2 }] },
        { day: 3, title: "Major and Third Parties; Media, Bias and Misinformation", std: "Gov.12, 11", slides: [{ day: 3 }] },
        { day: 4, title: "Interest Groups, Lobbying, PACs and Civic Virtue", std: "Gov.11, 12, 15, 16", slides: [{ day: 4 }] },
        { day: 5, title: "Iowa Elections, Voting, Citizenship, Rights and Duties", std: "Gov.13, 14, 17", slides: [{ day: 5 }] },
        { day: 6, title: "Summative", std: "Gov.11–17" }
      ],
      days: [{ day: 1, title: "Political Beliefs: Where Do Our Ideas Come From?", std: "Gov.12", slide: "g2d1s01" }, { day: 2, title: "Political Parties: What Do Parties Actually Do?", std: "Gov.12, 11", slide: "g2d2s01" }, { day: 3, title: "Third Parties and Media: Who Gets Heard?", std: "Gov.12, 11", slide: "g2d3b01" }, { day: 4, title: "Interest Groups: Who Else Tries to Shape Laws?", std: "Gov.11, 12, 15, 16", slide: "g2d3s01" }, { day: 5, title: "Elections: How Do Iowans Vote, and Who Counts?", std: "Gov.13, 14, 17", slide: "g2d4s01" }] },
    { course: "government", unit: 3, title: "Judicial Branch", url: g("1OU07tOXL0fJSdysLL5_gEQdNfFMjW-CCAlIPfXPPFxk"), pub: "2PACX-1vQGl-Erbse5mtH9-_ONeJ6irGZAAv4E9FdJkWAF-NNhr50kNdNYhRahqiZ2mP9NAb59oWYeEGnwTrPk", summativeSlide: "g3d1s01summ",
      // Rows follow Fynn's Schoology day posts; each row opens the deck day(s) that teach that topic.
      plan: [
        { day: 1, title: "What Is the Judicial Branch?", std: "Gov.8", slides: [{ day: 1 }] },
        { day: 2, title: "Judicial Review: The Power of the Courts + Review Game", std: "Gov.8", slides: [{ day: 2 }, { day: 3, label: "courts & rights" }] },
        { day: 3, title: "Judicial Summative", std: "Gov.8" }   // 2026-11-02: review moved into Day 2 (Dec 2 no school)
      ],
      days: [{ day: 1, title: "Judicial Branch: How Do Courts Settle Fights?", std: "Gov.8, 10, 18", slide: "g3d1s01" }, { day: 2, title: "Judicial Branch: Who Decides What Laws Mean?", std: "Gov.8, 4", slide: "g3d2s01" }, { day: 3, title: "Judicial Branch: How Do Courts Protect Rights?", std: "Gov.8, 17, 18", slide: "g3d3s01" }] },
    { course: "government", unit: 4, title: "Legislative Branch", url: g("10YXQguXa4oD6k4s1cyA340UxQlTKwsTbSVx8cAh_wzo"), pub: "2PACX-1vTZYqFRfweehXMiF0RR2hb67TUYPkRQkKbW33bRGh1MOoS6MFg---Mw_s-5aODKWTwj5a6yhf_3k4nz", summativeSlide: "g4d1s01summ",
      // Rows follow Fynn's Schoology day posts; each row opens the deck day(s) that teach that topic.
      plan: [
        { day: 1, title: "Meet Congress — The Legislative Branch", std: "Gov.6", slides: [{ day: 1 }] },
        { day: 2, title: "How a Bill Becomes a Law", std: "Gov.6", slides: [{ day: 2 }] },
        { day: 3, title: "Congress in Action", std: "Gov.6", slides: [{ day: 3 }] },
        { day: 4, title: "Legislative Branch Review & Summative", std: "Gov.6" }
      ],
      days: [{ day: 1, title: "Legislative Branch: Who Makes Our Laws?", std: "Gov.6, 10", slide: "g4d1s01" }, { day: 2, title: "Lawmaking: Why Do So Few Bills Become Laws?", std: "Gov.6, 18", slide: "g4d2s01" }, { day: 3, title: "Power of the Purse: Who Controls the Money?", std: "Gov.6, 10, 18", slide: "g4d3s01" }] },
    { course: "government", unit: 5, title: "Executive Branch", url: g("18SaeD0mhZo4-w6G1JrwVg3qO0rxA8f_32dfyQvt_RGk"), pub: "2PACX-1vRrBbe-3cbv0JbaoeLuxKRSUpZ-SVsPvRUaNbrIngtMT3BUtRFUraajtY-KqN2XpfefvwBAe1zvqisp", summativeSlide: "g5d1s01summ",
      // Rows follow Fynn's Schoology day posts; each row opens the deck day(s) that teach that topic.
      plan: [
        { day: 1, title: "What Is the Executive Branch?", std: "Gov.7", slides: [{ day: 1 }] },
        { day: 2, title: "Roles of the President", std: "Gov.7", slides: [{ day: 2 }] },
        { day: 3, title: "Powers and Limits of the Presidency, Cabinet and Agencies", std: "Gov.7", slides: [{ day: 3 }] },
        { day: 4, title: "Executive Summative", std: "Gov.7" }
      ],
      days: [{ day: 1, title: "Executive Branch: Who Gets to Be President?", std: "Gov.7, 10", slide: "g5d1s01" }, { day: 2, title: "Presidential Power: How Far Can It Go?", std: "Gov.7", slide: "g5d2s01" }, { day: 3, title: "Executive Branch: Who Does the Daily Work?", std: "Gov.7, 18, 10", slide: "g5d3s01" }] },
    { course: "government", unit: 6, title: "Checks & Balances and Iowa Government", url: g("1P_UeMjD4NVhdZuQsBjj6fKNjICzTn2MP_4kxXcwHruQ"), pub: "2PACX-1vRov6PNcykOZ584GQlz3P1RNeJ3NSJEslmnfBslcA3UNdw2fKlkvNqzQiBV2OAPTAVgu70e5d6Dl92-", summativeSlide: "g6d1s01summ",
      days: [{ day: 1, title: "Checks & Balances: Who Keeps Power in Check?", std: "Gov.4, 9", slide: "g6d1s01" }, { day: 2, title: "Iowa Government: Who Runs Things Near You?", std: "Gov.18, 19, 20", slide: "g6d2s01" }] },
    { course: "government", unit: 1, title: "Foundations of the Constitution", note: "earlier 7-day version", url: g("1Ec44PBzUBZ8M1vsZldP_BVnRZqpDZBLLEXu50aD9q-A") },

    // ---- Civics (Friday Iowa civics-test prep) · web presentations ----
    { course: "civics", unit: 1, title: "Founders' Files (Q1–15)", url: "https://neotboy.github.io/inequalityquest/civics/civics-test-s1-presentation/" },
    { course: "civics", unit: 2, title: "How the Government Works (Q16–62)", url: "https://neotboy.github.io/inequalityquest/civics/friday2-government-presentation/" },
    { course: "civics", unit: 3, title: "Rights & Responsibilities (Q63–72)", url: "https://neotboy.github.io/inequalityquest/civics/friday3-rights-presentation/" },
    { course: "civics", unit: 4, title: "The 1776 Files (Q73–89)", url: "https://neotboy.github.io/inequalityquest/civics/friday4-1776-presentation/" },
    { course: "civics", unit: 5, title: "Civil War to Modern America (Q90–118)", url: "https://neotboy.github.io/inequalityquest/civics/friday5-1800s-civics-presentation/" },
    { course: "civics", unit: 6, title: "Symbols & Holidays (Q119–128)", url: "https://neotboy.github.io/inequalityquest/civics/friday6-geography-symbols-presentation/" }
    // Friday 7 = Iowa Civics Exam (Google Form, in shared/assignments.js), no slides. Fynn, 2026-11-03.
  ];
})();
