// Which YouTube channel each dashboard video comes from (Fynn, 2026-11-15: "TED-Ed: …", "History Channel: …").
// Teacher dashboard only. Looked up from YouTube on 2026-11-15. Only well-known channels get a label;
// random personal uploads are listed under "" so they stay unlabeled.
// Videos added later are looked up automatically when the dashboard loads (see VIDEO_CHANNEL_NAMES).
// To change a label: move the video id to another line. To stop labeling one: move it to the "" line.
window.VIDEO_CHANNELS = (function () {
  const BY_LABEL = {
  "ABC News": "PNojm8f6Seo",
  "AJ+": "GJwxa4rxjxM hZZmMrFQzVs",
  "American Battlefield Trust": "3-gsVVa9bJ0 CRUqhh1tDm4",
  "AP Archive": "UpvMVTNSV6I",
  "BBC": "DduN1cU2p9U 1VIe42pAhuA NF4LQaWJRDg kVAztNx0rHQ",
  "BBC News": "sXAOTjNheVg ywJS7swbqeE",
  "Biography": "HaLstb_t8yc S8Qr62pANjc tFh4OloaJMo",
  "Black History in Two Minutes": "6UBOl5Yq-ms 7x_m1EkyB_E 9gboEyrj02g",
  "British Library": "7xo4tUMdAMw",
  "Brookings": "rEopj_6i7f0",
  "BuzzFeed": "2KlmvmuxzYE",
  "CBS News": "OTEVHykWZqk foMa-8dvFyA",
  "Center for Civic Education": "BuYby8kLBtw TTF4mMHBYHE dbBPAxVxqTE pXQ__V-07Ac",
  "CNN": "7WapJczNfw8 TwVuQ_Llh4k frLQcUYghN4 qcUIFsOu-bY viP1WzlYPM0",
  "Colonial Williamsburg": "9ZJBCC_8aV4 C31YmCbHsX4",
  "Crash Course": "5SnR-e0S6Ic 9MpVjxxpExM BGq9zW9w3Fw BsRSL3duSko DbTt_ySTjaY K-RvJQxqVQc QwhK-iEyXYA RV50AV7-Iwc S294zRodS_4 SlkIKCMt-Fs TCs_hyI15R8 T_sGTspaF4Y UUCEeC4f6ts UUukBV82P9A VEmOUHxessE ZIwyNIdgJBE _wFZ5Dbj8DA b350ljkYWrU c8PEv5SV4sU hYMk3Bk08NA j_k_k-bHigM kGrVhM_Gi8k nlsnnhn3VWE pIgb-3e8CWA s_iwrt7D5OA yaeiCEro0iU YnCJU6PaCio IZfGGF-YYzY gR3igiwaeyc -wny0OAz3g8 Wg9FWxpZeJ8 69VF7mT4nRU WbBm_YLwowc 06IS_X7hWWI zBodqwAlW3A YDuBh7VbGgU RtxtI5IGrfw DeiHz5tzlws 0a21mndoORE GjuV-XdYHhA 6rts_PWIVTU gSddUPkVD24 Yb1_4FPtzrI D9SWRByzDSo",
  "Extra History": "D2iuUzkKu9k",
  "GPB Education": "6UX7HfNUqjs 9RaWcx6S7kY",
  "History Channel": "g_aUFlIAtcM KCLJKncqehc RsA6AdCRI-k -HazLOy71Jg -nrpLVgO7l4 04KR8cPl5XI 0wDU-oYQN04 1P_euomdHOU 26WYHKF3dWs 35QYX94qz6g 3PWgcHkHFeM 4Rsz5u2bpvM 4mkqV9OcMDE 5hsQ0FlCxVE 7TfgJnXlaxo 7fs9huKifoo 8oier528TrE 9En-HO5PjJ8 9Pwro3vCUdU 9aRVVae2i_c 9giPmCWnepU A4LpLqHNOTk BWR2p9j9hWo BoyY1r39tt8 CRXrfs0f1Fo E-WgNf6mn2k EeyGdy_SdhQ FE6Yvy--5aw FguWSsW21CQ FnQESSTouNU GnEKiw7LPvw GzCe4qg8K0E HwWi0zdF7wk IIK9Lkf02TE J0OW18pIo8c Jb8aW46T3bg JkHK8qDrTTM KP9VklrXPZs Km4K8S5RlxM L6hehVbFYG8 N1Gc2BxU_zQ PF1A8NS1L9g PfOcKn9BVuc PmQvofAiZGA QYP854GAPAU RIIN0Ug8wg8 RlO_iw2cvJM TLberHUJgHY UBI6ZzaP2Uk UM4eQBpfGIg Vd6D64Ai49I WQLbisRfs20 XWrQ5VBZi2E Z9v9PEng7Xo ZT_ZWCB_1cM _G4ZY66BG38 _IB0i6bJIjw _omQ841ZAWg _yQyCTTPGuQ a9LmBgY-F5A b-M8PdXte5o bDNKHWzQiz8 bU2tt1h53jM c3IwgtrMKKM cZTioTkHcB0 dJqA6PQRh3U dik51bMfPaQ efIJuhM58SU ejc8oDOcN_o ewu-v36szlE h1wFrXKanC0 h9C67R9FzQE hKIsvh59Bj4 hN2Jb6JoNyw hltv8-nzcUc j25HTJ3Aud0 k4SoSUsQK9U k7v3cq1ZJjM lBWs9LpCg8I lO7rTOZJGFo lw4LahAdtds pT8Y_Ok5V54 q5O--KZ-0Ws rJBGjtOlAYw rUmD0jFTnCA tDbHn-zjlmE tMXjsVLOznc xXZyJGW4ekM xl_lctDXHuQ y0HvnFVEvP4 yCB0qFaTCFA yM0uonkloXY yb7MI8NQLoo ymCa1eB_qLA zle3Y3LgJJQ",
  "Holocaust Museum": "WBrWfhudElQ",
  "Imperial War Museums": "_tcUogFo9yE",
  "Infographics Show": "gxVsVA72wRU jA9neyKI62k",
  "Iowa History": "lw7eDkAL0lo",
  "Iowa PBS": "Cmv6KMsi36g SepPz7ODnKg gN6xojGcH0Y vVNUlOUlMeo",
  "IU Center on Rep. Government": "G7O9ZpJ-aiU S4ymux9l-Qo u5jKL6hFNdk",
  "Ken Burns": "-p9GGIJdWXc",
  "Khan Academy": "L72h7bk6HZs PF7m1fFr2eQ",
  "National Constitution Center": "Ao5k3KNURE8",
  "National Geographic": "FhGGjRjvq7w zySKwvQCpXE",
  "NBC News": "g2CewziXoDg w-2gC-IQl6w",
  "NBC News Learn": "-wZENqb-g4M 1FdK2bfstEs 2xrnu_7dRrY 41sF9ZTRTD4 5B4cpiTYhWk 5FpPpn086eI 5vjdvDsEw0I 9pvpe7DRBIM DWCiEln_hNg GBkQJPCoviE GF6P-zqxXXQ HvWVX84RBt4 KkK08I1K3HY LbetS9Lk-I8 PWiHtUymEhw XMR855zb28k fHfhiBHnk9A iUt0OR_Nfek v7QwDLTq-Ig whCL6xiOhTs wxuxFg_8nkI",
  "Netflix": "Xq4x84xUdpg hf8EYbVxtCY ujupEUFDm3E",
  "NPR Planet Money": "2NSjbsWfmNM",
  "OER Project": "JsZlsXLBNC4 OdlwmkqMpL4 tfyEGBJ1INA uykwq3El_fI",
  "Open University": "3kvFy_VUwfI 4TcdAkQJpQE UvtJja2ihYQ zjlR0Rqw104",
  "PBS": "7BUrlNU9m6U KzmrxK3BOSA OZUTq0noooU hF284J0mczQ hMqEnmDp2m8",
  "PBS American Experience": "-FcVBWIuR1U 5oZ104tr8gM KRCs9Bo1nMo OuukM9OY-is mPqBJHhP0MQ",
  "PBS Frontline": "HQvetA1P4Yg WTbo4gb_c3o",
  "PBS LearningMedia": "SMCkdSU2kXc WNnu2cj3-pU",
  "School of Life": "ICppFQ6Tabw OhVamhT4Q3s aGedUxTAfBk z9W0GQvONKc",
  "Scripps News": "bhkpX9ZYBO4",
  "Simple History": "xWRhPf9Qzmw QAT1KA3Xjbs crALHjTiXbk ezuFR5OwHU8",
  "Smithsonian Air and Space": "DNV8enpVwok iAEshwQmMvU",
  "Smithsonian Channel": "M5z4I3aIn7E q_0tD7-FTEI uWMkJ8IOHBU",
  "Sprouts": "XHIhkM1cAv4 vuMt8b4UrcI",
  "TED": "6zVS8HIPUng",
  "TED-Ed": "0SMNYivhGsc 1cT_Z0KGhP8 22lGbAVWhro 2K88pWCimZg 3NXC4Q_4JVg 5D3hQS6ezXc 5ckmXwx2n88 6zCpRVP1DgQ 8_TYFfkc_1U 9N8hsXQapjY BGxYMTftuzw BSdEiOYvKpE BnOS90_cwQA C-fQo8zmiPQ D9N7QaIOkG8 DrcCTgwbsjc Dv7YhVKFqbQ FwREAW4SlVY GD3dgiDreGc HuFR5XBYLfU LKJMWHCUoiw MNMoi5Af1SY MU4vua2kNQY MX_HYL6-0Co N35IugBYH04 OxeTFB84e2k P9VdyPbbzlI PBn7iWzrKoI TXldnrwrBws UBpTohx1BOc UO5ktwPXsyM VWvA26V4wk0 W9H3gvnN468 XP0_wnaW-a0 YcUDBgYodIE YmVpwXH4jhA YqmPE2HtkyU ZV7RzS8QRXE _KhYRqozTDE _YqYtdPUis4 _gTgloPR0Aw aMCDikASE4o bwWW3sbk4EU c517cpFALXE cSKGa_7XJkg c_g1BMVFcuw fKnAJCSGSdk fMsmCxIEQr4 fNUQ8RnuUFk fl1i6RtM4o8 fygjGXnaV9w hI4NoVWq87M hz6GULbowAk i6teBcfKpik jFICRFKtAc4 ke4kVFycpYY kkZ7B-Fv-ck lq8TNKZVEWs o9Kum_Jijdk oWww0YIf-JE oyOf3g-PJ94 pFdiX8mj0Es poE_nNW9-yk q-Y-z6HmRgI q7lfSjjMNU8 rEnf_CFoyv0 sMh8RCqJf9U sxYrzzy3cq8 uJ_d-UD0xPE uihNc_tdGbk v580zy82rcE wcR815SfWOU x1trgRlaw6Y xdZcqAss92w y4BDnlUQ3CA yYEfLm5dLMQ zmcKS47BsAo",
  "TEDx": "wo5eb7BjCec",
  "TIME": "EqcogBeAsuw",
  "Untold History": "-bKT5rc6rsU -jiR6dvXiyE 3hksFrX2K3I 3sgAwVpCOOI HqBTas0_ryg KovOrGBciQg NdiUMgavSak VRDRNDtx9j4 YJOiEr58ESc aRtW171kzto fgmIr3TGT9g gAD-WHUQZDM na6JXT_F0ZI pTliCI6uwmo tlEoopuYny0",
  "USA Today": "6_gA766lT3c",
  "VICE": "NbHAWNQRV70",
  "Voice of America": "Fa7JqIooxK0 TMIB2C4tQ2w",
  "Vox": "kXByOrRrO7c 13XU4fMlN3w HoKkasEyDOI KEjgAXxrkXY lejDbulJN54 xFcF_qfLHeQ",
  "Weird History": "IRR7CwdHxUE",
  "wikiHow": "A97aebAe0oU",
  "Wisecrack": "ttu8va9_x1g",
  "WWI Museum": "6UmERSpTtJc FGuAIzgkOUk GyEqUvij4Bo QvsJlWm6zsY UqZOQK731hQ YIiPRfjIzdE qU9zOLIPjdI s_CKhzqamEo ybrhBWrJrkI",
  "Weather Channel": "-J_RbFkv82o",
  "": "-Y3tZpAdWTc -gYl3nfChEM 09fNp4hVnHA 0FDfhPMA95I 2K-zTQRdGCU 2QxVwafUFgY 2yKP_IRAKaQ 35cs2mf9Ie4 3Efq-aNBkvc 3QGy2SbXTNE 5dDFpHMYkI8 5lZ2AjV307U 6x0l_vkjozc 8thC4hOn_C8 9diZJks95Ko 9hodYUDDfsY ADPpVYZm-eM BOOPDY_jMC8 CNv5GfwY6qs DESE8x3p8Z0 DthAMxn8zp0 EoyUSYymLxo FITyIpePEsQ Faf6ISLbPQ8 GOjBbkGiwq0 H1hSOdu2Qeg InMeuBdncQg JG2i_0vPkoo JYXF08ZS66w Kzd6Ew3TraA MjY5Zkt51wY No149Vn4HhI OIQ7leKjS3w OiqTffD5U2I Otbml6WIQPo PoV7GGN-u7Q QpVnXUCGZVc RSLbmtqlLLk R_s0heq7olw RlFuGdWT17c Rnwkmx1kl7Q Sn32cWUT83E TYIh4MkcfJA UAZXFELMd2w UVAaVEoxqmg UdNYqBP_5q4 VV6yOTg04zc WDu5nc_uEPo XA7oQXrPaOA XmtSbVNnuyQ XyN77GuzyAw aLFeBfxzurc bgS0GPQhzHg dqTTojTija8 e9H8pxLe74I eNQAvDD6tWI fkfwrXgfRr4 ghF-OB9XMvE gsgZOjCS8Ao hy0I_1A9R_A i3rVzhWIqSU j3jUzK3p3Qo kGn_EoHiOvc kJOU9YYMzpw kMJm04hoGg8 kPfzwLbzVYs l3sfzIDrfUY mhK40bkBzsc nEkm96eHpoQ nuuFfECMt0E o4XX90lqT6E oxEn63IJPqM pD9mk0Y_pyo pG-aVDBScUw pHSttXOpvYg pHVksFyfBks qL9kqmn-dUA r7RrB8WOam4 r7isb4Cu6Xc rHBWwSyIbig tLJKVVtiR3g tuQmpflB0Qk tyKhRAU35nA uM5TQ4f7ycw vIJMdGQrvzg wmhP5DYhpRw xTDVz4y6f5Q xf5CPacHt4Q yrHNig2aIjQ",
  };
  const out = {};
  Object.keys(BY_LABEL).forEach(label => BY_LABEL[label].split(" ").filter(Boolean).forEach(id => { out[id] = label; }));
  return out;
})();
// YouTube channel name -> label shown on the dashboard. Channels not listed here never get a label.
window.VIDEO_CHANNEL_NAMES = { "HISTORY": "History Channel", "CrashCourse": "Crash Course", "National WWI Museum and Memorial": "WWI Museum", "American Experience | PBS": "PBS American Experience", "The School of Life": "School of Life", "OpenLearn from The Open University": "Open University", "Black History in Two Minutes or so": "Black History in Two Minutes", "IU Center on Representative Government": "IU Center on Rep. Government", "PBS LearningMedia™": "PBS LearningMedia", "Smithsonian National Air and Space Museum": "Smithsonian Air and Space", "khanacademymedicine": "Khan Academy", "Khan Academy": "Khan Academy", "FRONTLINE PBS | Official": "PBS Frontline", "The Infographics Show": "Infographics Show", "NPR's Planet Money": "NPR Planet Money", "United States Holocaust Memorial Museum": "Holocaust Museum", "BBC Select": "BBC", "BBC Studios": "BBC", "BBC Global": "BBC", "BBC News": "BBC News", "BuzzFeedVideo": "BuzzFeed", "USA TODAY": "USA Today", "Brookings Institution": "Brookings", "CBS Evening News": "CBS News", "TEDx Talks": "TEDx", "PBS Presidents": "PBS", "Pritzker Military Museum & Library": "Pritzker Military Museum", "Marvel HQ": "Marvel", "World Trade Organization": "WTO", "BBC What’s New / Actu Jeunes": "BBC", "The Weather Channel": "Weather Channel", "TED-Ed": "TED-Ed", "TED": "TED", "NBC News Learn": "NBC News Learn", "NBC News": "NBC News", "Untold History": "Untold History", "Vox": "Vox", "CNN": "CNN", "PBS": "PBS", "Center for Civic Education": "Center for Civic Education", "OER Project": "OER Project", "Iowa PBS": "Iowa PBS", "Smithsonian Channel": "Smithsonian Channel", "Smithsonian": "Smithsonian", "Biography": "Biography", "Simple History": "Simple History", "Netflix": "Netflix", "Colonial Williamsburg": "Colonial Williamsburg", "American Battlefield Trust": "American Battlefield Trust", "GPB Education": "GPB Education", "National Geographic": "National Geographic", "Sprouts": "Sprouts", "AJ+": "AJ+", "Voice of America": "Voice of America", "Ken Burns": "Ken Burns", "Extra History": "Extra History", "AP Archive": "AP Archive", "VICE": "VICE", "TIME": "TIME", "Weird History": "Weird History", "British Library": "British Library", "Wisecrack": "Wisecrack", "Scripps News": "Scripps News", "wikiHow": "wikiHow", "National Constitution Center": "National Constitution Center", "ABC News": "ABC News", "Iowa History": "Iowa History", "CBS News": "CBS News", "Imperial War Museums": "Imperial War Museums", "Global News": "Global News", "Movieclips": "Movieclips", "Captivating History": "Captivating History", "Eisenhower Foundation": "Eisenhower Foundation", "PBS NewsHour": "PBS NewsHour", "C-SPAN": "C-SPAN", "iCivics": "iCivics", "History Matters": "History Matters", "Kings and Generals": "Kings and Generals", "OverSimplified": "OverSimplified", "Ted-Ed": "Ted-Ed" };
