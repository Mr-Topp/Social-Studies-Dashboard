// Teacher-only list of slide decks, shown inside each unit's dropdown on the Teacher Dashboard.
// Each link opens the live Google Slides deck. Add new decks here: { course, unit, day, title, url }.
// (day can be left off for a whole-unit deck.)
(function () {
  const g = id => "https://docs.google.com/presentation/d/" + id + "/edit";
  window.CLASS_PRESENTATIONS = [
    // ---- U.S. History ----
    { course: "us-history", unit: 1, title: "Roaring 20s & the Great Depression", url: g("1SGWhPkqqQboEAaB9OwM1X7H4KIxRzCqygMmgcWA1WBY") },
    { course: "us-history", unit: 2, day: 1, title: "Day 1 · WWII", url: g("1pUGsmryRs7-xYkxp4rOWNMnRLewlVWJIwnw-xI-PI04") },
    { course: "us-history", unit: 2, day: 3, title: "Days 3–8 · WWII", url: g("12C_b1uDvCGQPo6LvZ88pZMkxDs3ua_jg-zwsy8WC53o") },
    { course: "us-history", unit: 3, title: "The Cold War", url: g("14ZrFkpiug0H6JDjxpser1Ug-PBBimvS_Yv8816fJfr0") },
    { course: "us-history", unit: 4, title: "Civil Rights", url: g("1aoSmu8Le_U38p2a7trtVCzRPYfPBIfBEqD0gc8TYB0E") },
    { course: "us-history", unit: 5, title: "Rise of Conservatism", url: g("1KM3NcuWpURBxiLCQdmacCDVQiZIy5f0XiWsf_Y3yGfY") },
    { course: "us-history", unit: 6, title: "Modern America", url: g("1EaHd7ZHPbGRVHsgO_DhR_iF5ZW8Wvvvjy5BLjS1qCGE") },

    // ---- Sociology · Unit 1 ----
    { course: "sociology", unit: 1, day: 1, title: "Day 1 · What Is Sociology?", url: g("1pm9sgkmBHkVdkpvSaY1wRfHRQQ_kehbxg1b0vDzbP20") },
    { course: "sociology", unit: 1, day: 2, title: "Day 2 · The Sociological Imagination", url: g("1jUj70x5Ea5--y0fAewuBbSLRbzq4ee6vNDvlwS66yqk") },
    { course: "sociology", unit: 1, day: 3, title: "Day 3 · The Founders of Sociology", url: g("1vibaGwO_eAqqSCLvwU6s8kTqW4PZNdj7RH2EMaEO1P4") },
    { course: "sociology", unit: 1, day: 4, title: "Day 4 · Major Sociological Theories", url: g("1fy4ESZLgR6YA_rMcs32idfcg6z_FAtoO22Xk-0x3HQU") },
    { course: "sociology", unit: 1, day: 5, title: "Day 5 · The Scientific Method in Sociology", url: g("1GfOidr1CMQqEwB9ArR2wvy4pRTZu8pe4iJPn2sZ7U4U") },
    { course: "sociology", unit: 1, day: 6, title: "Day 6 · Sociological Research Methods", url: g("1Nxg8joY9gwLAP_zQHY1P-bR_O-HmVLD6qRmm_sRqU60") },
    { course: "sociology", unit: 1, day: 7, title: "Day 7 · Research Ethics", url: g("1fqIMpenhu1GHn0dYSJ_DunyvRgiT6DIDEmh7_AhhlIs") },

    // ---- Government · Unit 1 ----
    { course: "government", unit: 1, day: 1, title: "Day 1 · Purposes and Origins", url: g("1RbIWvcQZ6u9cPBk_SI0IUy6DcxOUJxZBEYR8O-a1qYk") },
    { course: "government", unit: 1, day: 2, title: "Day 2 · Social Contract, Popular Sovereignty & Rule of Law", url: g("1O1vVsYsPDEOhoWh1dqJynky116QfaoScJdTp2jV-6IM") },
    { course: "government", unit: 1, day: 3, title: "Day 3 · Types and Systems of Government", url: g("1CTRMGTmHM7N-jlvBf9yElp-t2vlPdBJ7OsIFVUOC8b4") },
    { course: "government", unit: 1, day: 4, title: "Day 4 · Roots of American Government", url: g("1AvobgadDm3REf9nfA2WtbjLgrVtixP9CVZ_znCpRP9U") },
    { course: "government", unit: 1, day: 5, title: "Day 5 · Articles of Confederation", url: g("1AJgEBNDJ7nqRMER_Z_7o58RT1MUmVlLFfnDB4-FNGvY") },
    { course: "government", unit: 1, day: 6, title: "Day 6 · Constitutional Convention, Compromises & Ratification", url: g("15TUnmCkUqQ96U2WsHyjOIuYnBVecfxncK-V2X8XPWhs") },
    { course: "government", unit: 1, day: 9, title: "Day 9 · Federalism, the Supremacy Clause & Iowa Government", url: g("11c3RmUeGAAw9xpJS2gKvlKknvxyjgsXZWkMJNxrFugU") }
  ];
})();
