// Puts each day's videos in the same order they show up in that unit's slides (Fynn, 2026-11-15).
// Videos that aren't on the slides go after, in their old order.
// List built from the slide decks (last refreshed 2026-11-16). A new video lands at the end of its day until this list is refreshed.
(function () {
  var ORDER = {
    "government|0|1": ["hMqEnmDp2m8","3QGy2SbXTNE","ttu8va9_x1g","3sgAwVpCOOI","RSLbmtqlLLk","7xo4tUMdAMw","KovOrGBciQg","pTliCI6uwmo","LKJMWHCUoiw","tlEoopuYny0","CRUqhh1tDm4","C31YmCbHsX4","VV6yOTg04zc","YJOiEr58ESc","HuFR5XBYLfU","FwREAW4SlVY","yYEfLm5dLMQ","Xq4x84xUdpg","VRDRNDtx9j4"],
    "government|0|2": ["bhkpX9ZYBO4","GJwxa4rxjxM","TMIB2C4tQ2w","Fa7JqIooxK0","viP1WzlYPM0","qcUIFsOu-bY","q-Y-z6HmRgI","hz6GULbowAk","cSKGa_7XJkg","UAZXFELMd2w","MjY5Zkt51wY","QpVnXUCGZVc","6_gA766lT3c","W9H3gvnN468","YcUDBgYodIE","P9VdyPbbzlI"],
    "government|0|3": ["9giPmCWnepU","KEjgAXxrkXY","na6JXT_F0ZI","Ao5k3KNURE8"],
    "government|0|4": ["hltv8-nzcUc","aLFeBfxzurc","Otbml6WIQPo","G7O9ZpJ-aiU","u5jKL6hFNdk","pHSttXOpvYg"],
    "government|0|5": ["BWR2p9j9hWo","Z9v9PEng7Xo","oyOf3g-PJ94","HqBTas0_ryg","8oier528TrE","-bKT5rc6rsU","qL9kqmn-dUA","PNojm8f6Seo"],
    "government|0|6": ["S4ymux9l-Qo","lw7eDkAL0lo"],
    "sociology|0|1": ["DthAMxn8zp0","gsgZOjCS8Ao","OhVamhT4Q3s","z9W0GQvONKc","ICppFQ6Tabw","DbTt_ySTjaY","ZIwyNIdgJBE","o4XX90lqT6E","sxYrzzy3cq8","QwhK-iEyXYA","22lGbAVWhro","kGn_EoHiOvc","ZV7RzS8QRXE","vuMt8b4UrcI","IRR7CwdHxUE","r7RrB8WOam4"],
    "sociology|0|2": ["UUukBV82P9A","mhK40bkBzsc","_XI6ILZGtT4","s-FbhEUdpGY","RV50AV7-Iwc","w-2gC-IQl6w","JYXF08ZS66w","fkfwrXgfRr4","DESE8x3p8Z0","foMa-8dvFyA","P9VdyPbbzlI","FE6Yvy--5aw","r7isb4Cu6Xc","bU2tt1h53jM"],
    "sociology|0|3": ["uM5TQ4f7ycw","2K-zTQRdGCU","No149Vn4HhI","YmVpwXH4jhA","UvtJja2ihYQ","XmtSbVNnuyQ","5lZ2AjV307U","ge7i60GuNRg","WDu5nc_uEPo","j3jUzK3p3Qo","i3rVzhWIqSU","TYIh4MkcfJA","fNUQ8RnuUFk","ujupEUFDm3E"],
    "sociology|0|4": ["2KlmvmuxzYE","SlkIKCMt-Fs","D9N7QaIOkG8","rEnf_CFoyv0","c8PEv5SV4sU","WTbo4gb_c3o","b350ljkYWrU","hYMk3Bk08NA","HoKkasEyDOI","hZZmMrFQzVs","HQvetA1P4Yg","9diZJks95Ko","13XU4fMlN3w","tyKhRAU35nA","zySKwvQCpXE","TwVuQ_Llh4k","_gTgloPR0Aw"],
    "us-history|0|1": ["7TfgJnXlaxo","9gboEyrj02g","y4BDnlUQ3CA","uWMkJ8IOHBU","D2iuUzkKu9k","-J_RbFkv82o","zle3Y3LgJJQ","k4SoSUsQK9U","N1Gc2BxU_zQ","VWvA26V4wk0"],
    "us-history|0|2": ["jFICRFKtAc4","-HazLOy71Jg","b-M8PdXte5o","0FDfhPMA95I","gdgPAetNY5U","WBrWfhudElQ","9aRVVae2i_c","bU2tt1h53jM","WrK1j4BNmHE","hI4NoVWq87M","dik51bMfPaQ","PF1A8NS1L9g","j25HTJ3Aud0"],
    "us-history|0|3": ["Jb8aW46T3bg","tMXjsVLOznc","UVAaVEoxqmg","N35IugBYH04","h1wFrXKanC0","Cmv6KMsi36g","SepPz7ODnKg","gN6xojGcH0Y","7WapJczNfw8","2QxVwafUFgY","iAEshwQmMvU","09fNp4hVnHA","bwWW3sbk4EU","crALHjTiXbk","ezuFR5OwHU8","vVNUlOUlMeo"],
    "us-history|0|4": ["-FcVBWIuR1U","_omQ841ZAWg","Tov2tLSFq5k","c0xkUFe21Rk","dJqA6PQRh3U","TLberHUJgHY","0wDU-oYQN04","6x0l_vkjozc","Vd6D64Ai49I","-nrpLVgO7l4","tFh4OloaJMo","6UBOl5Yq-ms","LbetS9Lk-I8","g2CewziXoDg","WncN6PWEMGo","y505KwHp4O4","KRCs9Bo1nMo"],
    "us-history|0|5": ["MX_HYL6-0Co","OZSGMMUC7FQ","E-WgNf6mn2k","NvwTfCaWK8s","KzmrxK3BOSA","EeyGdy_SdhQ","e2JxB0d-UlQ","UpvMVTNSV6I"],
    "us-history|0|6": ["xl_lctDXHuQ","kPfzwLbzVYs","qIDkZAOjx9w","_tcUogFo9yE","KP9VklrXPZs","yM0uonkloXY","EqcogBeAsuw"],
    "us-history|1|5": ["YIiPRfjIzdE","6UmERSpTtJc","s_CKhzqamEo"],
    "world-history|0|1": ["DduN1cU2p9U","-Y3tZpAdWTc","MU4vua2kNQY","1VIe42pAhuA","NbHAWNQRV70","5oZ104tr8gM","GBkQJPCoviE","GzCe4qg8K0E","IIK9Lkf02TE","_G4ZY66BG38","k7v3cq1ZJjM","aRtW171kzto","pT8Y_Ok5V54","R_s0heq7olw","UBI6ZzaP2Uk","ybrhBWrJrkI","PoV7GGN-u7Q","hN2Jb6JoNyw","9N8hsXQapjY","jFICRFKtAc4","kkZ7B-Fv-ck","4Rsz5u2bpvM","XyN77GuzyAw","-HazLOy71Jg","b-M8PdXte5o","EoyUSYymLxo","7BUrlNU9m6U","LxZkdQfgot8","bgS0GPQhzHg","RIIN0Ug8wg8","NF4LQaWJRDg","FnQESSTouNU","rJBGjtOlAYw"],
    "world-history|0|2": ["JG2i_0vPkoo","tMXjsVLOznc","Jb8aW46T3bg","e9H8pxLe74I","BGxYMTftuzw","h1wFrXKanC0","bwWW3sbk4EU","rJBGjtOlAYw","yrHNig2aIjQ","DrcCTgwbsjc","xf5CPacHt4Q","OiqTffD5U2I","rHBWwSyIbig","d8l0J41YCoc","poE_nNW9-yk","8_TYFfkc_1U","ke4kVFycpYY","XA7oQXrPaOA","kJOU9YYMzpw","8thC4hOn_C8","oxEn63IJPqM"],
    "world-history|0|3": ["5SnR-e0S6Ic","DESE8x3p8Z0","OTEVHykWZqk","s_iwrt7D5OA","FnQESSTouNU","nuuFfECMt0E","ywJS7swbqeE","rEopj_6i7f0","BSdEiOYvKpE","nEkm96eHpoQ","hy0I_1A9R_A","kPfzwLbzVYs"],
    "world-history|1|1": ["GD3dgiDreGc","5FpPpn086eI","1FdK2bfstEs","3NXC4Q_4JVg"],
    "world-history|1|2": ["BnOS90_cwQA","fMsmCxIEQr4","SEjiw6ipwnU"],
    "world-history|1|3": ["6DhaGe1DvsY","GOjBbkGiwq0","FhGGjRjvq7w","IATyzSAjC1w"],
    "world-history|1|4": ["pTliCI6uwmo","PBn7iWzrKoI","8aq_gRfmjgY","wxuxFg_8nkI","xLhNP0qp38Q"]
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
