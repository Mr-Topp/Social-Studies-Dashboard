// Teacher-only list of slide decks, shown inside each unit's dropdown on the Teacher Dashboard.
// Each link opens the live Google Slides deck. Add new decks here: { course, unit, day, title, url }.
// (day can be left off for a whole-unit deck.)
(function () {
  const g = id => "https://docs.google.com/presentation/d/" + id + "/edit";
  window.CLASS_PRESENTATIONS = [
    // ---- U.S. History ----
    { course: "us-history", unit: 1, title: "Roaring 20s & the Great Depression", url: g("1SGWhPkqqQboEAaB9OwM1X7H4KIxRzCqygMmgcWA1WBY") },
    { course: "us-history", unit: 2, title: "World War II", url: g("1pUGsmryRs7-xYkxp4rOWNMnRLewlVWJIwnw-xI-PI04") },
    { course: "us-history", unit: 3, title: "The Cold War", url: g("14ZrFkpiug0H6JDjxpser1Ug-PBBimvS_Yv8816fJfr0") },
    { course: "us-history", unit: 4, title: "Civil Rights", url: g("1aoSmu8Le_U38p2a7trtVCzRPYfPBIfBEqD0gc8TYB0E") },
    { course: "us-history", unit: 5, title: "Rise of Conservatism", url: g("1KM3NcuWpURBxiLCQdmacCDVQiZIy5f0XiWsf_Y3yGfY") },
    { course: "us-history", unit: 6, title: "Modern America", url: g("1EaHd7ZHPbGRVHsgO_DhR_iF5ZW8Wvvvjy5BLjS1qCGE") },

    // ---- Sociology ----
    { course: "sociology", unit: 1, title: "Foundations, Perspectives & Methods", url: g("12guCZyH2bmzsCxPOJUTXgJnAlNTMZ0EmO2JxisEFkXM") },

    // ---- Government ----
    { course: "government", unit: 1, title: "Foundations of the U.S. Constitution", url: g("1Ec44PBzUBZ8M1vsZldP_BVnRZqpDZBLLEXu50aD9q-A") }
  ];
})();
