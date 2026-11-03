// =====================================================================
//  THE DAY AFTER FREEDOM — game rules (meters, decisions, endings).
//  Kept apart from game.js so every path can be tested. Works in the page (window.DAF_RULES) and in node.
//  Meters: money 0–10, peace 0–10, voice 0–10, experts 0–5, us 0–10, ussr 0–10 (strings), colonel 0–10 (coup anger).
// =====================================================================
(function (root) {
  "use strict";
  const START = { money: 5, peace: 6, voice: 6, experts: 1, us: 0, ussr: 0, colonel: 2 };
  const MAX = { money: 10, peace: 10, voice: 10, experts: 5, us: 10, ussr: 10, colonel: 10 };

  // Decisions by step. fx = meter changes. flag = something remembered for later.
  // need = card is locked unless the meter is at least this much.
  const D = {
    1: [
      { id: "strikes", ic: "✊", t: "Strikes + voting", d: "Protest, boycott, run for office.", fx: { money: -1, voice: 1, peace: 1 } },
      { id: "revolt", ic: "🔥", t: "Armed revolt", d: "Fight from the hills.", fx: { peace: -2, colonel: 2 } },
      { id: "wait", ic: "⏳", t: "Wait politely", d: "Trust the Governor.", fx: { voice: -2, money: 1 } }
    ],
    2: [
      { id: "buy", ic: "💵", t: "Buy the farms", d: "Pay settlers. Farmers get land.", fx: { money: -2, peace: 1 } },
      { id: "take", ic: "✊", t: "Take the farms", d: "No pay. Settlers leave.", fx: { peace: 1, experts: -1, money: -1 } },
      { id: "leave", ic: "🤝", t: "Leave them", d: "Settlers keep the best land.", fx: { money: 1, peace: -2 } }
    ],
    4: [
      { id: "keep", ic: "📏", t: "Keep the line", d: "Accept the old border.", fx: { peace: -1 } },
      { id: "claim", ic: "⚔️", t: "Claim the hills", d: "Take the other half back.", fx: { money: -2, peace: -2, colonel: 2 } },
      { id: "council", ic: "🏛️", t: "Hill council", d: "Hill people run their region.", fx: { money: -1, peace: 1, colonel: 1 } }
    ],
    5: [
      { id: "bosses", ic: "🎩", t: "Keep old bosses", d: "Colonial officials stay on.", fx: { experts: 2, voice: -1, peace: -1 } },
      { id: "promote", ic: "🚀", t: "Promote our own", d: "Fast, with lots of mistakes.", fx: { experts: 1, money: -1, peace: 1 } },
      { id: "schools", ic: "🏫", t: "Schools first", d: "Slow. Pays off later.", fx: { money: -2 }, flag: "schools" }
    ],
    6: [
      { id: "usloan", ic: "🇺🇸", t: "U.S. loan", d: "Fast cash, with strings.", fx: { money: 3, us: 2 } },
      { id: "ussrloan", ic: "☭", t: "Soviet loan", d: "Fast cash, with strings.", fx: { money: 3, ussr: 2 } },
      { id: "army", ic: "✂️", t: "Cut army pay", d: "Save money. Anger soldiers.", fx: { money: 2, colonel: 3 } },
      { id: "crops", ic: "🌱", t: "Grow new crops", d: "Slow, but less risk.", fx: { money: 1 }, need: { experts: 3 }, flag: "crops" }
    ],
    7: [
      { id: "un", ic: "🇺🇳", t: "Ask the UN", d: "Slow, but no strings.", fx: { peace: -1 }, flag: "unfix" },
      { id: "ussr", ic: "☭", t: "Ask the USSR", d: "Fast planes and trucks.", fx: { ussr: 3, peace: 1 }, flag: "usAngry" },
      { id: "us", ic: "🇺🇸", t: "Ask the U.S.", d: "Money and advisers.", fx: { us: 3, colonel: 1 } }
    ],
    8: [
      { id: "ban", ic: "🚫", t: "One party only", d: "Ban the other parties.", fx: { voice: -3, peace: 1, colonel: 2 } },
      { id: "vote", ic: "🗳️", t: "Keep elections", d: "You might lose.", fx: { voice: 2, peace: -1, colonel: -1 } },
      { id: "jail", ic: "⛓️", t: "Jail the critics", d: "No trial needed.", fx: { voice: -2, peace: -1, colonel: 1 } }
    ],
    9: [
      { id: "joinus", ic: "🇺🇸", t: "Join the U.S.", d: "Big aid. USSR turns on you.", fx: { money: 3, us: 3 }, side: "us" },
      { id: "joinussr", ic: "☭", t: "Join the USSR", d: "Big aid. U.S. turns on you.", fx: { money: 3, ussr: 3 }, side: "ussr" },
      { id: "nonaligned", ic: "🧭", t: "Non-aligned", d: "Pick neither. Less aid.", fx: { money: 1 }, side: "none" }
    ]
  };
  // Things that happen to you no matter what (shown as an event before you choose).
  const AUTO = {
    6: { money: -3 },  // cocoa price crash
    7: { money: -1 }   // copper province breaks away
  };
  // Delayed payoffs (applied when that step starts).
  function delayed(step, s) {
    const fx = {};
    if (step === 8 && s.flags.schools) fx.experts = 2;
    if (step === 9 && s.flags.crops) fx.money = (fx.money || 0) + 2;
    if (step === 9 && s.flags.unfix) fx.money = (fx.money || 0) + 1;
    return fx;
  }

  function fresh() { return { m: Object.assign({}, START), flags: {}, picks: {}, side: "" }; }
  function apply(s, fx) {
    const out = {};
    Object.keys(fx || {}).forEach(k => {
      const before = s.m[k];
      s.m[k] = Math.max(0, Math.min(MAX[k], s.m[k] + fx[k]));
      if (s.m[k] !== before) out[k] = s.m[k] - before;
    });
    return out;  // what actually changed
  }
  function card(step, id) { return (D[step] || []).find(c => c.id === id); }
  function locked(s, c) { return !!(c.need && Object.keys(c.need).some(k => s.m[k] < c.need[k])); }
  function pick(s, step, id) {
    const c = card(step, id);
    s.picks[step] = id;
    if (c.flag) s.flags[c.flag] = true;
    if (c.side) s.side = c.side;
    return apply(s, c.fx);
  }

  // Who backs a coup? A superpower that thinks you're on the other side.
  function backer(s) {
    if ((s.flags.usAngry || s.side === "ussr") && s.side !== "us") return "us";
    if (s.side === "us" && s.m.ussr >= 2) return "ussr";
    return "";
  }
  function coupScore(s) { return s.m.colonel + (s.m.money <= 2 ? 2 : 0) + (backer(s) ? 3 : 0); }
  function coup(s) { return coupScore(s) >= 8; }
  function ending(s) {
    if (s.m.peace <= 1) return "broken";
    if (coup(s)) return backer(s) ? "theirman" : "colonel";
    if (Math.max(s.m.us, s.m.ussr) >= 6) return "client";
    if (s.m.voice >= 6) return "free";
    return "quiet";
  }

  const RULES = { START, MAX, D, AUTO, delayed, fresh, apply, card, locked, pick, backer, coupScore, coup, ending, STEPS_WITH_PICKS: [1, 2, 4, 5, 6, 7, 8, 9] };
  if (typeof module !== "undefined" && module.exports) module.exports = RULES;
  else root.DAF_RULES = RULES;
})(typeof window !== "undefined" ? window : this);
