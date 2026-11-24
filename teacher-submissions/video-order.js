// Puts each day's videos in the same order they show up in that unit's slides (Fynn, 2026-11-15).
// Videos that aren't on the slides go after, in their old order.
// List built from the slide decks (last refreshed 2026-11-24, all classes). A new video lands at the end of its day until this list is refreshed.
(function () {
  var ORDER = {
    "government|0|1": ["hMqEnmDp2m8", "3QGy2SbXTNE", "https://www.netflix.com/watch/81250874", "ttu8va9_x1g", "T7-Abmn9lZY", "V5enfxt8GeM", "3sgAwVpCOOI", "kkZ7B-Fv-ck", "8_TYFfkc_1U", "RSLbmtqlLLk", "7xo4tUMdAMw", "KovOrGBciQg", "pTliCI6uwmo", "LKJMWHCUoiw", "tlEoopuYny0", "lBWs9LpCg8I", "CRUqhh1tDm4", "9ZJBCC_8aV4", "uihNc_tdGbk", "C31YmCbHsX4", "VV6yOTg04zc", "YJOiEr58ESc", "HuFR5XBYLfU", "FwREAW4SlVY", "Xq4x84xUdpg", "yYEfLm5dLMQ", "VRDRNDtx9j4", "9aWYJugVTs4", "https://www.netflix.com/watch/81250871"],
    "government|0|2": ["bhkpX9ZYBO4", "GJwxa4rxjxM", "TMIB2C4tQ2w", "Fa7JqIooxK0", "cSKGa_7XJkg", "qcUIFsOu-bY", "viP1WzlYPM0", "q-Y-z6HmRgI", "hz6GULbowAk", "UAZXFELMd2w", "MjY5Zkt51wY", "QpVnXUCGZVc", "https://www.netflix.com/watch/81250866", "6_gA766lT3c", "W9H3gvnN468", "P9VdyPbbzlI"],
    "government|0|3": ["9giPmCWnepU", "https://www.netflix.com/watch/81250873", "KEjgAXxrkXY", "0xnzGSV66x4", "na6JXT_F0ZI", "Ao5k3KNURE8", "3YSypB3nP2g", "4CI2TqbPKWE"],
    "government|0|4": ["hltv8-nzcUc", "aLFeBfxzurc", "Otbml6WIQPo", "G7O9ZpJ-aiU", "u5jKL6hFNdk", "pHSttXOpvYg", "https://www.netflix.com/watch/81250868", "RbNhNojeYEs", "hSszixvo7d8"],
    "government|0|5": ["BWR2p9j9hWo", "Z9v9PEng7Xo", "oyOf3g-PJ94", "HqBTas0_ryg", "gvYFXVArG6M", "Dc4_RFeKaz4", "8oier528TrE", "qL9kqmn-dUA", "PNojm8f6Seo"],
    "government|0|6": ["https://www.netflix.com/watch/81250869", "S4ymux9l-Qo", "SiEMs9U4UGs", "HuFR5XBYLfU", "lw7eDkAL0lo", "sP54bvzocRs", "EHrNk3OyI_I"],
    "sociology|0|1": ["YnCJU6PaCio", "0jKtugVokaY", "DthAMxn8zp0", "gsgZOjCS8Ao", "IZfGGF-YYzY", "OhVamhT4Q3s", "Wg9FWxpZeJ8", "z9W0GQvONKc", "gR3igiwaeyc", "ICppFQ6Tabw", "69VF7mT4nRU", "-wny0OAz3g8", "DbTt_ySTjaY", "AskAQwOBvhc", "ZIwyNIdgJBE", "s-7pyIxz8Qg", "o4XX90lqT6E", "sxYrzzy3cq8", "QwhK-iEyXYA", "BkG70_wa4a8", "IRR7CwdHxUE", "kGn_EoHiOvc", "ZV7RzS8QRXE", "Kzd6Ew3TraA", "r7RrB8WOam4"],
    "sociology|0|2": ["UUukBV82P9A", "mhK40bkBzsc", "RV50AV7-Iwc", "w-2gC-IQl6w", "JYXF08ZS66w", "03OXcnPaLo4", "3YTMdIune-8", "yih_MiIFVbc", "DESE8x3p8Z0", "foMa-8dvFyA", "FE6Yvy--5aw", "bU2tt1h53jM", "3Apc32G4XeM", "IUbPWtEe4rg", "aBGe3rIjEEo", "xGsgXwNrjzI", "r7isb4Cu6Xc"],
    "sociology|0|3": ["WbBm_YLwowc", "uM5TQ4f7ycw", "2K-zTQRdGCU", "No149Vn4HhI", "YmVpwXH4jhA", "kVAztNx0rHQ", "UvtJja2ihYQ", "XmtSbVNnuyQ", "5lZ2AjV307U", "zBodqwAlW3A", "BOOPDY_jMC8", "06IS_X7hWWI", "WDu5nc_uEPo", "j3jUzK3p3Qo", "i3rVzhWIqSU", "YDuBh7VbGgU", "TYIh4MkcfJA", "fNUQ8RnuUFk", "ujupEUFDm3E"],
    "sociology|0|4": ["SlkIKCMt-Fs", "2KlmvmuxzYE", "D9N7QaIOkG8", "rEnf_CFoyv0", "RtxtI5IGrfw", "oklPl95DC8c", "wOBlXvVY5DE", "DeiHz5tzlws", "0a21mndoORE", "WTbo4gb_c3o", "GjuV-XdYHhA", "kQVk9RYARIc", "1YXmZvEdv6k", "b350ljkYWrU", "6rts_PWIVTU", "mwKJfNYwvm8", "v98Rh9qzmPs", "hYMk3Bk08NA", "hZZmMrFQzVs", "gSddUPkVD24", "HoKkasEyDOI", "53nAbgJdC-E", "Yb1_4FPtzrI", "HQvetA1P4Yg", "9diZJks95Ko", "13XU4fMlN3w", "D9SWRByzDSo", "VLbWnJGlyMU", "30rlOcSvZCI", "wP8zcHvQAzQ", "g8wLmj9SiKM", "zySKwvQCpXE", "TwVuQ_Llh4k", "WHWcJiNQZEw", "_gTgloPR0Aw"],
    "us-history|0|1": ["7TfgJnXlaxo", "9gboEyrj02g", "y4BDnlUQ3CA", "uWMkJ8IOHBU", "D2iuUzkKu9k", "yuOHbyuanbY", "zle3Y3LgJJQ", "-J_RbFkv82o", "k4SoSUsQK9U", "N1Gc2BxU_zQ", "cdE_EV3wnXM", "VWvA26V4wk0"],
    "us-history|0|2": ["jFICRFKtAc4", "XyN77GuzyAw", "ljDyho6AZ6A", "b-M8PdXte5o", "pECp4Czjf_k", "7fs9huKifoo", "0FDfhPMA95I", "Fxjjvrwgq0Q", "WBrWfhudElQ", "gdgPAetNY5U", "9aRVVae2i_c", "bU2tt1h53jM", "6Aye9c4SgPw", "6UI4NiaH8Cs", "WrK1j4BNmHE", "hI4NoVWq87M", "dik51bMfPaQ", "8a8fqGpHgsk", "hKIsvh59Bj4", "PF1A8NS1L9g", "hT-nVMnr-Fo", "v3Lbv0K8gCs", "j25HTJ3Aud0"],
    "us-history|0|3": ["Jb8aW46T3bg", "tMXjsVLOznc", "X1El1GVQVdc", "N35IugBYH04", "h1wFrXKanC0", "Cmv6KMsi36g", "SepPz7ODnKg", "gN6xojGcH0Y", "7WapJczNfw8", "2QxVwafUFgY", "iAEshwQmMvU", "09fNp4hVnHA", "bwWW3sbk4EU", "crALHjTiXbk", "ezuFR5OwHU8", "vVNUlOUlMeo", "9Pwro3vCUdU"],
    "us-history|0|4": ["-FcVBWIuR1U", "Tov2tLSFq5k", "_omQ841ZAWg", "c0xkUFe21Rk", "dJqA6PQRh3U", "TLberHUJgHY", "0wDU-oYQN04", "6x0l_vkjozc", "Vd6D64Ai49I", "-nrpLVgO7l4", "tFh4OloaJMo", "6UBOl5Yq-ms", "LbetS9Lk-I8", "WncN6PWEMGo", "y505KwHp4O4", "g2CewziXoDg", "KRCs9Bo1nMo"],
    "us-history|0|5": ["MX_HYL6-0Co", "OZSGMMUC7FQ", "YMb_hbt1NLw", "E-WgNf6mn2k", "NvwTfCaWK8s", "KzmrxK3BOSA", "EeyGdy_SdhQ", "e2JxB0d-UlQ", "https://www.iowapbs.org/shows/farmcrisis/clip/5259/causes-farm-crisis", "Ri5BQSFgO9c", "UpvMVTNSV6I", "A9fQPzZ1-hg"],
    "us-history|0|6": ["xl_lctDXHuQ", "kPfzwLbzVYs", "_tcUogFo9yE", "qIDkZAOjx9w", "KP9VklrXPZs", "OhpRjA35ejw", "yM0uonkloXY", "WHWcJiNQZEw", "EqcogBeAsuw"],
    "us-history|1|1": ["pTliCI6uwmo", "1cT_Z0KGhP8", "LKJMWHCUoiw", "c517cpFALXE", "tlEoopuYny0", "lBWs9LpCg8I", "CRUqhh1tDm4", "9ZJBCC_8aV4", "uihNc_tdGbk", "C31YmCbHsX4", "YJOiEr58ESc", "HuFR5XBYLfU", "FwREAW4SlVY", "aMCDikASE4o", "yYEfLm5dLMQ", "P9VdyPbbzlI", "3-gsVVa9bJ0", "3PWgcHkHFeM", "https://www.iowapbs.org/home/special/13969/meskwaki-nations-story-survival-land-and-sovereignty-iowa"],
    "us-history|1|2": ["BoyY1r39tt8", "oWww0YIf-JE", "JkHK8qDrTTM", "QYP854GAPAU", "J0OW18pIo8c", "26WYHKF3dWs", "c3IwgtrMKKM", "L6hehVbFYG8", "BfB4uwxQ1xc", "h9C67R9FzQE", "Km4K8S5RlxM", "XWrQ5VBZi2E", "lq8TNKZVEWs", "9En-HO5PjJ8", "y0HvnFVEvP4", "q_0tD7-FTEI", "Dv7YhVKFqbQ", "SMCkdSU2kXc", "iUt0OR_Nfek", "HvWVX84RBt4", "5B4cpiTYhWk", "yCB0qFaTCFA", "GnEKiw7LPvw", "KkK08I1K3HY", "6UX7HfNUqjs", "-jiR6dvXiyE", "7x_m1EkyB_E", "XP0_wnaW-a0"],
    "us-history|1|3": ["oJ8Kkgf4J3Y", "-Q4rQDN6Z4s", "9pvpe7DRBIM", "0SMNYivhGsc", "hF284J0mczQ", "oQ1YTbnvMJ8", "rUmD0jFTnCA", "UBpTohx1BOc", "XMR855zb28k", "bDNKHWzQiz8", "fHfhiBHnk9A", "2K88pWCimZg", "5hsQ0FlCxVE", "TXldnrwrBws", "E9YKqnmAGNg", "KkmD-vpQ4Qs", "UM4eQBpfGIg", "3hksFrX2K3I", "-p9GGIJdWXc", "C-fQo8zmiPQ", "kMJm04hoGg8", "KtBsT3Fj4ls", "_uA1GBzXzr4"],
    "us-history|1|4": ["eNQAvDD6tWI", "OIQ7leKjS3w", "v7QwDLTq-Ig", "SHrIhSFEPuE", "ewu-v36szlE", "2xrnu_7dRrY", "ZT_ZWCB_1cM", "YqmPE2HtkyU", "5vjdvDsEw0I", "NdiUMgavSak", "OuukM9OY-is", "whCL6xiOhTs", "PWiHtUymEhw", "UdNYqBP_5q4", "FguWSsW21CQ", "ddiOJLuu2mo", "gAD-WHUQZDM", "lw4LahAdtds", "2NSjbsWfmNM", "TTF4mMHBYHE", "dbBPAxVxqTE", "WQLbisRfs20", "a9LmBgY-F5A", "mPqBJHhP0MQ", "_KhYRqozTDE", "04KR8cPl5XI", "Rnwkmx1kl7Q", "41sF9ZTRTD4", "S8Qr62pANjc", "PfOcKn9BVuc", "DWCiEln_hNg", "6zCpRVP1DgQ", "fygjGXnaV9w", "HaLstb_t8yc"],
    "us-history|1|5": ["C2bjjwv4134", "2En9a3n9oNE", "5oZ104tr8gM", "5ZMcRzvxTMg", "Bx_o1PWHdLA", "GBkQJPCoviE", "uE_UuHRtXCY", "zCx7_VzR1Ho", "IIK9Lkf02TE", "M5z4I3aIn7E", "aRtW171kzto", "YIiPRfjIzdE", "qU9zOLIPjdI", "6UmERSpTtJc", "s_CKhzqamEo", "ybrhBWrJrkI"],
    "world-history|0|1": ["DduN1cU2p9U", "-Y3tZpAdWTc", "MU4vua2kNQY", "1VIe42pAhuA", "aUlOPH-ji5M", "NbHAWNQRV70", "5oZ104tr8gM", "GBkQJPCoviE", "GzCe4qg8K0E", "IIK9Lkf02TE", "_G4ZY66BG38", "k7v3cq1ZJjM", "aRtW171kzto", "pT8Y_Ok5V54", "R_s0heq7olw", "UqZOQK731hQ", "UBI6ZzaP2Uk", "s_CKhzqamEo", "ybrhBWrJrkI", "FGuAIzgkOUk", "hN2Jb6JoNyw", "jFICRFKtAc4", "L52e29SVyYc", "mQ1E6wO9jXQ", "4Rsz5u2bpvM", "XyN77GuzyAw", "SDtRT884DN0", "-HazLOy71Jg", "b-M8PdXte5o", "EoyUSYymLxo", "7BUrlNU9m6U", "LxZkdQfgot8", "bgS0GPQhzHg", "xXZyJGW4ekM", "NF4LQaWJRDg", "hKIsvh59Bj4", "RsA6AdCRI-k", "FnQESSTouNU"],
    "world-history|0|2": ["-7p3sNb72wM", "Jb8aW46T3bg", "tMXjsVLOznc", "X1El1GVQVdc", "g_aUFlIAtcM", "N35IugBYH04", "kXByOrRrO7c", "KCLJKncqehc", "BGxYMTftuzw", "vIJMdGQrvzg", "h1wFrXKanC0", "bwWW3sbk4EU", "rJBGjtOlAYw", "yrHNig2aIjQ", "DrcCTgwbsjc", "xf5CPacHt4Q", "poE_nNW9-yk", "8_TYFfkc_1U", "ke4kVFycpYY", "8thC4hOn_C8", "KG1m0HZ0y2A", "FaojdRThXbY"],
    "world-history|0|3": ["5SnR-e0S6Ic", "DESE8x3p8Z0", "9MpVjxxpExM", "s_iwrt7D5OA", "OTEVHykWZqk", "FnQESSTouNU", "nuuFfECMt0E", "ywJS7swbqeE", "rEopj_6i7f0", "BSdEiOYvKpE", "nEkm96eHpoQ", "hy0I_1A9R_A", "nlsnnhn3VWE", "kPfzwLbzVYs", "qIDkZAOjx9w", "BpUBqau0tVo", "KP9VklrXPZs"],
    "world-history|1|1": ["vn3e37VWc0k", "-wZENqb-g4M", "9RaWcx6S7kY", "pFdiX8mj0Es", "GD3dgiDreGc", "efIJuhM58SU", "5FpPpn086eI", "i6teBcfKpik", "uykwq3El_fI", "xROmDsULcLE", "y0fFpNyNJsM", "1FdK2bfstEs", "1P_euomdHOU", "UO5ktwPXsyM", "3NXC4Q_4JVg", "PmQvofAiZGA", "EBbYxLmCO6c"],
    "world-history|1|2": ["mqHVRgCkCDE", "23oHqNEqRyo", "MNMoi5Af1SY", "BnOS90_cwQA", "LhdFgu7C0X0", "KRPp3jzv1Tw", "fMsmCxIEQr4", "v580zy82rcE", "x1trgRlaw6Y", "SEjiw6ipwnU", "fl1i6RtM4o8", "uJ_d-UD0xPE", "5ckmXwx2n88", "OxeTFB84e2k"],
    "world-history|1|3": ["6DhaGe1DvsY", "xTDVz4y6f5Q", "xFcF_qfLHeQ", "o9Kum_Jijdk", "_YqYtdPUis4", "GOjBbkGiwq0", "OdlwmkqMpL4", "Faf6ISLbPQ8", "FhGGjRjvq7w", "xdZcqAss92w", "5dDFpHMYkI8", "zmcKS47BsAo", "BuYby8kLBtw", "IATyzSAjC1w", "9hodYUDDfsY", "35cs2mf9Ie4", "JsZlsXLBNC4", "wmhP5DYhpRw", "ttu8va9_x1g", "pXQ__V-07Ac", "_6nyX1c5jjw"],
    "world-history|1|4": ["q5O--KZ-0Ws", "1cT_Z0KGhP8", "pTliCI6uwmo", "HwWi0zdF7wk", "yb7MI8NQLoo", "CNv5GfwY6qs", "PBn7iWzrKoI", "l3sfzIDrfUY", "5D3hQS6ezXc", "8aq_gRfmjgY", "RlFuGdWT17c", "ghF-OB9XMvE", "Sn32cWUT83E", "q7lfSjjMNU8", "H1hSOdu2Qeg", "wxuxFg_8nkI", "3Efq-aNBkvc", "e5e6BVX0BIs", "xLhNP0qp38Q", "OIQ7leKjS3w", "ejc8oDOcN_o", "TLpzHHbFrHY", "s4iWOm5ZfTs", "vmbRtjN0gAk", "8fjIE43cVsM", "rUmD0jFTnCA", "tfyEGBJ1INA", "wcR815SfWOU", "RlO_iw2cvJM"]
  };
  function vidOf(u) {
    u = String(u || "");
    var m = u.match(/(?:[?&]v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : u;
  }
  function sortVideos() {
    if (typeof REG === "undefined" || !REG) return;
    var ids = Object.keys(REG), groups = {}, order = ids.slice(), moved = false;
    ids.forEach(function (id, i) {
      var a = REG[id];
      if (!a || !a.video) return;
      var g = a.course + "|" + (+a.part === 1 ? 1 : 0) + "|" + a.unit + "|" + a.day;
      (groups[g] = groups[g] || []).push(i);
    });
    Object.keys(groups).forEach(function (g) {
      var pos = groups[g];
      if (pos.length < 2) return;
      var p = g.split("|"), list = ORDER[p[0] + "|" + p[1] + "|" + p[2]] || [];
      var sorted = pos.map(function (i, k) {
        var r = list.indexOf(vidOf(REG[ids[i]].path));
        return { id: ids[i], r: r < 0 ? 1e6 : r, k: k };
      }).sort(function (x, y) { return x.r - y.r || x.k - y.k; });
      pos.forEach(function (i, k) { if (order[i] !== sorted[k].id) moved = true; order[i] = sorted[k].id; });
    });
    if (!moved) return;
    var copy = {};
    ids.forEach(function (id) { copy[id] = REG[id]; delete REG[id]; });
    order.forEach(function (id) { REG[id] = copy[id]; });
  }
  var origRender = window.render;
  if (typeof origRender !== "function") return;
  window.render = function () {
    try { sortVideos(); } catch (e) {}
    return origRender.apply(this, arguments);
  };
  try { render(); } catch (e) {}
})();
