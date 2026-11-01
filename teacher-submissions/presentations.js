// Teacher-only list of slide decks, shown inside each unit's dropdown on the Teacher Dashboard.
// Each link opens the live Google Slides deck. Add new decks here: { course, unit, day, title, url }.
// (day can be left off for a whole-unit deck. part: 1 puts it in the "Part 1" section.)
(function () {
  const g = id => "https://docs.google.com/presentation/d/" + id + "/edit";
  window.CLASS_PRESENTATIONS = [
    // ---- U.S. History (current units) ----
    { course: "us-history", unit: 1, title: "Roaring 20s & the Great Depression", url: g("1SGWhPkqqQboEAaB9OwM1X7H4KIxRzCqygMmgcWA1WBY") },
    { course: "us-history", unit: 2, title: "World War II", url: g("1pUGsmryRs7-xYkxp4rOWNMnRLewlVWJIwnw-xI-PI04") },
    { course: "us-history", unit: 3, title: "The Cold War", url: g("14ZrFkpiug0H6JDjxpser1Ug-PBBimvS_Yv8816fJfr0") },
    { course: "us-history", unit: 4, title: "Civil Rights", url: g("1aoSmu8Le_U38p2a7trtVCzRPYfPBIfBEqD0gc8TYB0E") },
    { course: "us-history", unit: 5, title: "Rise of Conservatism", url: g("1KM3NcuWpURBxiLCQdmacCDVQiZIy5f0XiWsf_Y3yGfY") },
    { course: "us-history", unit: 6, title: "Modern America", url: g("1EaHd7ZHPbGRVHsgO_DhR_iF5ZW8Wvvvjy5BLjS1qCGE") },
    // ---- U.S. History · Part 1 ----
    { course: "us-history", part: 1, unit: 1, title: "Founding & Citizenship", url: g("19uFAySaTLUPMbrXUs98-N4FM5bJqW7DCORbgioLYl8E") },

    // ---- World History (current units) ----
    { course: "world-history", unit: 1, title: "Imperialism & the World Wars", url: g("1JUfOmeu36L67ptPXmqXB3ZeM1FH4EsbW_zigcG4gAO0") },
    // ---- World History · Part 1 ----
    { course: "world-history", part: 1, unit: 1, title: "Exploration & Global Trade", url: g("1wct6u3ZpPeNj3Y5yfAcTOEzs4jKTlziOzH3FTYJbnMA") },
    { course: "world-history", part: 1, unit: 4, title: "Revolutions & Industrialization", url: g("1gpdf-xnu4mOxgv2mmTmwP2RliVk3TDqk5ScyAG7uSls") },

    // ---- Sociology ----
    { course: "sociology", unit: 1, title: "Foundations, Perspectives & Methods", url: g("12guCZyH2bmzsCxPOJUTXgJnAlNTMZ0EmO2JxisEFkXM") },
    { course: "sociology", unit: 2, title: "Culture, Institutions & Society", url: g("1ARuSpvs5XwgItN44NgHMt1S9Ykjy7Nma5wQPwG1yXxw") },
    { course: "sociology", unit: 3, title: "Socialization, the Self & Groups", url: g("1IhgaaVGGyevEVLE8JeCGkWLmATK3OxWQgUZQ3WMPm1U") },
    { course: "sociology", unit: 4, title: "Stratification & Inequality", url: g("1L6owAmyMqNK2gqqkbYARwXUbpR1ABUJWHpqwqrQxoCs") },

    // ---- Government ----
    { course: "government", unit: 1, title: "Foundations (all 9 days)", url: g("16kOZNiGGwIK4CfQXlpSoumBXYRtuYIaL1zjc3IiWJus") },
    { course: "government", unit: 1, title: "Foundations of the Constitution (earlier 7-day version)", url: g("1Ec44PBzUBZ8M1vsZldP_BVnRZqpDZBLLEXu50aD9q-A") },
    { course: "government", unit: 2, title: "Political Beliefs, Parties & Citizenship", url: g("1r_9cfbyiq-eIJujo9HQqOoTCqDmfSucM0VhRUgc3pDE") },
    { course: "government", unit: 3, title: "Judicial Branch", url: g("1OU07tOXL0fJSdysLL5_gEQdNfFMjW-CCAlIPfXPPFxk") },
    { course: "government", unit: 4, title: "Legislative Branch", url: g("10YXQguXa4oD6k4s1cyA340UxQlTKwsTbSVx8cAh_wzo") },
    { course: "government", unit: 5, title: "Executive Branch", url: g("18SaeD0mhZo4-w6G1JrwVg3qO0rxA8f_32dfyQvt_RGk") },
    { course: "government", unit: 6, title: "Checks & Balances and Iowa Government", url: g("1P_UeMjD4NVhdZuQsBjj6fKNjICzTn2MP_4kxXcwHruQ") }
  ];
})();
