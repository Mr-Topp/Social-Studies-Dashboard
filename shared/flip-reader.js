/* Flip-through graphic-novel reader (one page at a time, like the WWII and Sociology readers).
   Each page supplies window.FLIP = { ...config } before loading this file.
   Questions, answer keys and turn-in data live in the page's own config. */
(function(){
const C=window.FLIP, $=id=>document.getElementById(id), P=C.prefix, N=C.pages;
const pad=n=>String(n).padStart(2,"0");
const img=n=>"pages/p-"+pad(n)+".jpg";
const ls={get:k=>{try{return localStorage.getItem(P+k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(P+k,v)}catch(e){}},del:k=>{try{localStorage.removeItem(P+k)}catch(e){}}};
if(C.migrate)C.migrate(ls);
let read=new Set();try{read=new Set((JSON.parse(ls.get("read")||"[]")||[]).map(Number))}catch(e){}
const parts=C.parts.map((p,i)=>Object.assign({n:i+1},p));
const partOf=pg=>parts.find(p=>pg>=p.from&&pg<=p.to);
const checkDone=i=>ls.get("check"+i)==="1";
const tries=i=>Number(ls.get("tries"+i)||0);
// Multiple-choice-only pages (Fynn, 11-06): a part with "check2" swaps its writing box for a second check.
const has2=i=>!!(parts[i-1]&&parts[i-1].check2);
const check2Done=i=>ls.get("check2_"+i)==="1";
const tries2=i=>Number(ls.get("tries2_"+i)||0);
const answer=i=>has2(i)?(check2Done(i)?"✓":""):($("answer"+i)?$("answer"+i).value:(ls.get("answer"+i)||""));
const partDone=i=>checkDone(i)&&answer(i).trim()!=="";
// Junk writing ("idk", blanks left as ___) is caught before "Next part", not only at Turn in (Fynn, 11-03).
const junk=i=>{const a=$("answer"+i);return a&&window.classJunkStop&&a.value.trim()?window.classJunkStop(a,{quiet:true}):""};
let cur=1,timer=null,lockTimer=null,locked=false;
// Test T. (the teacher checking the page) can flip anywhere, no read timer, no locks (Fynn, 11-03).
const TT=()=>!!(window.classIsTestT&&window.classIsTestT());

/* ---------- build the right-hand cards ---------- */
const qcol=$("flipCards");
parts.forEach(p=>{
  const s=document.createElement("section");s.className="card qcard question flip-part";s.id="q"+p.n;s.hidden=true;
  s.innerHTML='<span class="stamp">Done</span><p class="case-tag"><span class="num">Part '+p.n+'</span> '+p.ref+'</p><h3>'+p.title+'</h3>'
   +'<p class="flip-wait" id="wait'+p.n+'"></p>'
   +'<div class="check" id="check'+p.n+'" hidden><p class="tag">'+p.check.tag+'</p><p class="q">'+p.check.q+'</p><div class="choices" id="choices'+p.n+'"></div><p class="fb" id="fb'+p.n+'" aria-live="polite"></p></div>'
   +(p.check2?'<div class="flip-write" id="write'+p.n+'"><div class="check check2"><p class="tag">'+p.check2.tag+'</p><p class="q">'+p.check2.q+'</p><div class="choices" id="choices2_'+p.n+'"></div><p class="fb" id="fb2_'+p.n+'" aria-live="polite"></p></div><p class="lockmsg" id="unlock'+p.n+'"></p></div>':
   '<div class="flip-write" id="write'+p.n+'"><label class="prompt" for="answer'+p.n+'">'+p.prompt+'</label><p class="stem">'+p.stem+'</p>'
   +(p.stemText?'<button class="stemBtn quiet" type="button" data-for="'+p.n+'">Use the sentence starter</button>':'')+'<textarea id="answer'+p.n+'" placeholder="'+p.placeholder.replace(/"/g,"&quot;")+'"></textarea><p class="lockmsg" id="unlock'+p.n+'"></p></div>');
  qcol.appendChild(s);
});
qcol.addEventListener("click",e=>{const b=e.target.closest(".stemBtn");if(!b)return;const p=parts[Number(b.dataset.for)-1],t=$("answer"+p.n);if(t.disabled)return;if(!t.value.trim())t.value=p.stemText;else if(!t.value.includes(p.stemText))t.value=p.stemText+" "+t.value;t.focus();const k=t.value.indexOf("___");if(k>=0)t.setSelectionRange(k,k+3);ls.set("answer"+p.n,t.value);refresh()});
/* route strip */
const route=$("flipRoute");
parts.forEach(p=>{const li=document.createElement("li");li.id="r"+p.n;li.innerHTML='<a href="#" data-part="'+p.n+'"><span class="dot"><span>'+p.n+'</span></span><span>'+p.short+'<small>Pages '+p.from+(p.to>p.from?"–"+p.to:"")+'</small></span></a>';route.appendChild(li)});
{const li=document.createElement("li");li.id="rFinish";li.innerHTML='<a href="#finish"><span class="dot"><span>★</span></span><span>Turn in<small>Last step</small></span></a>';route.appendChild(li)}

/* ---------- saved text ---------- */
["studentName",...parts.map(p=>"answer"+p.n)].forEach(id=>{const el=$(id);if(!el)return;el.value=ls.get(id)||"";el.addEventListener("input",()=>{ls.set(id,el.value);refresh()})});

/* ---------- checks ---------- */
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function renderChoices(p){const c=p.check,box=$("choices"+p.n);box.innerHTML="";
  const opts=checkDone(p.n)?[c.right]:shuffle([c.right,...c.wrong]);
  opts.forEach(t=>{const b=document.createElement("button");b.type="button";b.className="choice";b.textContent=t;
    if(checkDone(p.n)){b.classList.add("right");b.disabled=true}else{b.disabled=locked;b.addEventListener("click",()=>pick(p,t))}box.appendChild(b)});
  const f=$("fb"+p.n);if(checkDone(p.n)){f.className="fb ok";f.textContent=c.why}
  if(p.check2)renderChoices2(p)}
function renderChoices2(p){const c=p.check2,box=$("choices2_"+p.n),d=check2Done(p.n),open=checkDone(p.n)||TT();box.innerHTML="";
  (d?[c.right]:shuffle([c.right,...c.wrong])).forEach(t=>{const b=document.createElement("button");b.type="button";b.className="choice";b.textContent=t;
    if(d){b.classList.add("right");b.disabled=true}else{b.disabled=locked||!open;b.addEventListener("click",()=>pick(p,t,2))}box.appendChild(b)});
  const f=$("fb2_"+p.n);if(d){f.className="fb ok";f.textContent=c.why}}
function pick(p,t,k){const two=k===2,c=two?p.check2:p.check,f=$(two?"fb2_"+p.n:"fb"+p.n);
  if(two)ls.set("tries2_"+p.n,String(tries2(p.n)+1));else ls.set("tries"+p.n,String(tries(p.n)+1));
  if(t===c.right){ls.set(two?"check2_"+p.n:"check"+p.n,"1");renderChoices(p);refresh();const a=$("answer"+p.n);if(a&&!C.noAutoFocus)a.focus({preventScroll:true});return}
  f.className="fb no";
  if(C.lockSeconds){locked=true;renderChoices(p);let left=C.lockSeconds;const tick=()=>{f.textContent=C.wrongText(c,left)};tick();clearInterval(lockTimer);
    lockTimer=setInterval(()=>{left--;if(left<=0){clearInterval(lockTimer);locked=false;renderChoices(p);f.textContent=C.wrongText(c,0)}else tick()},1000)}
  else{renderChoices(p);f.textContent=C.wrongText(c,0)}
  refresh()}

/* ---------- page flow ---------- */
function blocker(pg){ // why you can't leave page pg yet ("" = free to go on)
  if(TT())return "";
  const p=partOf(pg);
  if(!read.has(pg))return "read";
  if(p.check.page===pg&&!checkDone(p.n))return "check";
  if(pg===p.to&&!partDone(p.n))return checkDone(p.n)?"write":"check";
  if(pg===p.to&&junk(p.n))return "junk";
  return "";}
function maxOpen(){for(let pg=1;pg<=N;pg++)if(blocker(pg))return pg;return N}
function show(pg,scroll){
  cur=Math.max(1,Math.min(N,pg));ls.set("at",String(cur));
  const p=partOf(cur),im=$("flipImg");
  im.src=img(cur);im.alt=(C.alts&&C.alts[cur-1]?C.alts[cur-1]+" ":"")+"("+C.title+", reader page "+cur+" of "+N+")";
  if(cur<N){const pre=new Image();pre.src=img(cur+1)}
  parts.forEach(x=>{$("q"+x.n).hidden=x.n!==p.n});
  clearInterval(timer);
  if(!read.has(cur)&&TT()){read.add(cur);ls.set("read",JSON.stringify([...read]))}
  if(!read.has(cur)){let left=C.readSeconds;
    const tick=()=>{$("flipTimer").textContent="Read this page · "+left+" sec"};tick();
    timer=setInterval(()=>{left--;if(left<=0){clearInterval(timer);read.add(cur);ls.set("read",JSON.stringify([...read]));$("flipTimer").textContent="";refresh()}else tick()},1000)}
  else $("flipTimer").textContent="";
  renderChoices(p);
  refresh();
  if(scroll){const top=$("flipReader").getBoundingClientRect().top+scrollY-70;if(Math.abs(scrollY-top)>40)scrollTo({top,behavior:"smooth"})}
}
function refresh(){
  const p=partOf(cur),b=blocker(cur),c=p.check;
  $("flipPos").textContent="Reader page "+cur+" of "+N;
  $("flipPart").textContent="Part "+p.n+" · "+p.short;
  // check visibility: on its page, or any time after it's done / passed
  const showCheck=cur>=c.page||checkDone(p.n)||TT();
  $("check"+p.n).hidden=!showCheck;
  $("wait"+p.n).textContent=showCheck?"":"Read the pages in order. This part's reading check is on reader page "+c.page+".";
  $("wait"+p.n).hidden=showCheck;
  const a=$("answer"+p.n),done=checkDone(p.n);
  if(a)a.disabled=!done&&!TT();const sb=$("q"+p.n).querySelector(".stemBtn");if(sb)sb.disabled=!done;$("unlock"+p.n).textContent=done||TT()?"":C.lockedText;
  $("write"+p.n).hidden=!(done||cur===p.to||TT());
  // nav
  // "Next page" only shows while this part still has more pages to read.
  // On a part's last (or only) page, the way forward is "Next part" under the question.
  const last=cur===N,partEnd=cur===p.to;
  const n1=$("flipNext");n1.hidden=partEnd;n1.disabled=!!b;n1.textContent="Next page →";
  const n2=$("flipNext2");n2.disabled=!!b&&b!=="junk";n2.textContent=last?"Go to Turn in ↓":partEnd?"Next part →":"Next page →";
  ["flipBack","flipBack2"].forEach(id=>{$(id).disabled=cur===1});
  const why={read:"Read this page first. Next opens in a few seconds.",check:"Get the reading check right to go on.",write:p.check2?"Get the second check right to go on.":"Write your answer for this part to go on.",junk:"Fix your answer for this part to go on (see the note under the box).","":last?"All pages done. Turn in your work below.":""}[b];
  $("flipWhy").textContent=why;$("flipWhy").hidden=!why;
  // progress marks
  const mo=maxOpen();
  parts.forEach(x=>{const d=partDone(x.n);$("r"+x.n).classList.toggle("done",d);$("r"+x.n).classList.toggle("current",x.n===p.n);
    const a2=$("r"+x.n).querySelector("a");a2.setAttribute("aria-disabled",x.from>mo?"true":"false");$("q"+x.n).classList.toggle("is-done",d)});
  $("rFinish").classList.toggle("done",/Turned in/.test($("submitBtn").textContent));
}
function next(){const bk=blocker(cur);if(bk==="junk"&&window.classJunkStop){window.classJunkStop($("answer"+partOf(cur).n));return}if(bk)return;if(cur===N){$("finish").scrollIntoView({behavior:"smooth",block:"start"});return}show(cur+1,true)}
function back(){if(cur>1)show(cur-1,true)}
["flipNext","flipNext2"].forEach(id=>$(id).addEventListener("click",next));
["flipBack","flipBack2"].forEach(id=>$(id).addEventListener("click",back));
route.addEventListener("click",e=>{const a=e.target.closest("a[data-part]");if(!a)return;e.preventDefault();const p=parts[Number(a.dataset.part)-1];if(p.from<=maxOpen())show(p.from,true)});
document.addEventListener("keydown",e=>{if(e.target.matches("input,textarea"))return;if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")back();if(e.key==="Escape")closeBig()});

/* ---------- make page bigger ---------- */
function openBig(){$("flipBigImg").src=img(cur);$("flipBigImg").alt=$("flipImg").alt;$("flipBig").hidden=false;$("flipBigClose").focus()}
function closeBig(){$("flipBig").hidden=true}
$("flipZoom").addEventListener("click",openBig);$("flipImg").addEventListener("click",openBig);
$("flipBigClose").addEventListener("click",closeBig);$("flipBig").addEventListener("click",e=>{if(e.target.id==="flipBig")closeBig()});

/* ---------- start over / turn in ---------- */
$("clearBtn").addEventListener("click",()=>{if(!confirm(C.clearConfirm))return;
  ["studentName","read","at",...parts.flatMap(p=>["answer"+p.n,"check"+p.n,"tries"+p.n,"check2_"+p.n,"tries2_"+p.n])].forEach(k=>ls.del(k));(C.clearExtra||[]).forEach(k=>ls.del(k));location.reload()});
$("submitBtn").addEventListener("click",async()=>{const status=$("submitStatus"),btn=$("submitBtn");status.className="status";
  const st={name:$("studentName").value.trim(),parts,checkDone,tries,check2Done,tries2,answer:i=>answer(i).trim()};
  if(TT()&&!st.name)st.name="Test T.";
  const err=TT()?null:C.validate(st);if(err){status.textContent=err.text;status.classList.add("error");if(err.focus)$(err.focus).focus();if(err.part){const p=parts[err.part-1];if(p.from<=maxOpen())show(Math.min(Math.max(p.check.page,p.from),maxOpen()),true)}return}
  btn.disabled=true;status.textContent="Sending your work…";
  try{const r=await classTurnIn(C.api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({studentName:st.name,assignmentId:C.assignmentId,answers:C.buildAnswers(st)})});
    const res=await r.json();if(!r.ok)throw new Error(res.error||"Could not send your work.");
    status.textContent=C.successText;status.classList.add("success");btn.textContent="Turned in ✓";refresh()}
  catch(err){status.textContent=err instanceof Error?err.message:"Could not turn in your work. Try again.";status.classList.add("error");btn.disabled=false}});

/* ---------- start (re-entry) ---------- */
const saved=Number(ls.get("at")||0),startAt=Math.min(saved||1,maxOpen());
const any=read.size||parts.some(p=>checkDone(p.n)||answer(p.n).trim());
if(any){let w=$("welcome");if(!w){w=document.createElement("p");w.className="welcome";w.id="welcome";w.setAttribute("role","status");document.querySelector("main").prepend(w)}w.style.display="block";
  w.textContent=parts.every(p=>partDone(p.n))?"Welcome back — every part is done. Check your name and press Turn in.":"Welcome back — your work was saved. You're on reader page "+startAt+" of "+N+"."}
show(startAt,false);
/* ---------- Test T. skip bar (shared/turnin.js) ---------- */
try{(window.classTestHooks=window.classTestHooks||[]).push({
  count:()=>N,index:()=>cur-1,
  label:i=>{const p=partOf(i+1);return "Part "+p.n+" · "+p.short},
  go:i=>show(i+1,true),
  solve:()=>{const p=partOf(cur);if(p.check2&&checkDone(p.n))ls.set("check2_"+p.n,"1");ls.set("check"+p.n,"1");locked=false;clearInterval(lockTimer);renderChoices(p);refresh()}
});if(window.classTestSkip)window.classTestSkip.refresh()}catch(e){}
})();
