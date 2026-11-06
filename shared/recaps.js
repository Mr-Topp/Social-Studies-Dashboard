// One plain sentence per lesson day: what happened in class that day.
// The student home page shows it under anything a student missed, so kids coming back
// from absences know what the class covered. Add a line when you add a lesson day.
// Format: course -> unit -> day -> sentence.
window.CLASS_RECAPS = {
  "us-history": { 1: {
    1: "The 1920s: cars, radios, and movies changed everyday life, and new music and freedoms for women spread fast.",
    2: "Business boomed, then the 1929 stock market crash started the Great Depression, when millions lost jobs and savings.",
    3: "How President Hoover and President Franklin Roosevelt's New Deal tried to fix the Depression, and how it hit Iowa farm families.",
    4: "Started the movie Cinderella Man, about a boxer whose family struggled to survive the Great Depression.",
    5: "Finished Cinderella Man and connected his family's struggles to real life in the Depression."
  } },
  "world-history": { 1: {
    1: "Why European countries raced to grab almost all of Africa in the late 1800s, drawing borders without asking Africans.",
    2: "French-ruled Vietnam: a plan to pay people for killing rats backfired when people started raising rats for the money.",
    3: "How Japan built up its own empire, and how the U.S. took over Pacific islands like Hawaii and the Philippines.",
    4: "How alliances between countries turned one assassination in 1914 into World War I.",
    5: "How World War I ended, and why the peace treaty that punished Germany made peace hard to keep.",
    6: "After World War I, countries were broke and angry, and some people turned to dictators who promised to make them strong.",
    7: "Through the graphic novel Maus, how Nazi Germany took away Jewish people's rights step by step.",
    8: "The choices leaders made as Germany grabbed land before World War II, and the warning signs people could have acted on.",
    9: "Through Maus II, what happened at Auschwitz and why we remember the Holocaust.",
    10: "The big turning points that helped the Allies win World War II.",
    11: "After World War II: punish the countries that lost, or help them rebuild, and why the world chose to rebuild."
  } },
  "sociology": { 1: {
    1: "What sociology is: the study of how groups and society shape what people do.",
    2: "The sociological imagination: seeing how a personal problem can be part of a bigger pattern in society.",
    3: "The founders of sociology, and why people follow society's unwritten rules.",
    4: "The three big sociology theories, and how one problem can be explained three different ways.",
    5: "How sociologists use evidence to test a hot take instead of just arguing opinions.",
    6: "How sociologists study people: surveys, interviews, watching people, and experiments.",
    7: "Research ethics: why researchers need permission and can't harm or lie to the people they study.",
    8: "Unit 1 review: Escape from Seahaven."
  } },
  "government": { 1: {
    1: "Why people create governments: to keep order, protect people, and provide things everyone needs.",
    2: "The social contract (giving up some freedom for protection), power coming from the people, and rule of law (nobody is above the law).",
    3: "Different types of government, like democracy, monarchy, and dictatorship, and who holds the power in each.",
    4: "Where American government's ideas came from, like the Magna Carta and Enlightenment thinkers.",
    5: "The Articles of Confederation, the first U.S. government, and why it was too weak to work.",
    6: "The Constitutional Convention: the big compromises the states made and the fight to approve the Constitution.",
    7: "How the Constitution is set up: three branches of government and checks and balances.",
    8: "The Bill of Rights: the first 10 amendments, which protect rights like free speech.",
    9: "Federalism: how power is split between the national government, Iowa, and local governments."
  } }
};

// Fynn 11-06: on a day with a reading and a game, the reading always comes first (teacher dashboard + student page).
// Both pages list same-day work in this list's order, so readings move to the front of it here.
(function () {
  const R = window.CLASS_ASSIGNMENTS; if (!R) return;
  const all = Object.keys(R).map(id => [id, R[id], /\(Reading/i.test((R[id] && R[id].title) || "")]);
  all.forEach(([id]) => { delete R[id]; });
  all.filter(x => x[2]).concat(all.filter(x => !x[2])).forEach(([id, a]) => { R[id] = a; });
})();
