// =====================================================================
//  ONLINE iCIVICS WORKSHEETS — shared engine (civics/icivics/*)
//  Each packet folder has index.html + data.js (window.WS = {...}).
//  Same look and rules as Gov U2 Day 4 Interest Groups:
//   - one item at a time, big readable text, numbered buttons to move around
//   - Check when everything in a part is answered; wrong answers clear for a retry
//   - first-try score goes to the dashboard (never shown to students)
//   - writing boxes use the site's shared junk-writing check
//   - Test T. skip hooks (shared/turnin.js)
//
//  data.js shape:
//  window.WS = { id, title, std:[...], name, source, hook, plan:[...], minutes, paper,
//    parts:[ { key:"A", name:"Venn Diagram", dir:"<b>…</b> verbatim directions", ic:"📘", navLabel:"Item",
//              source:{label,title,html},           // optional pop-up chart/map/text
//              q:{type:"choice"|"type"|"write", ask, opts:[...], cols, big, unique, cap, short},  // default question
//              items:[ { text, ic, who, style:"term"|"long", ans, qs:[ {type, ask, opts, ans, ...} ] } ] } ] }
//  opts: strings or {v, label, em, sub, ltr}. type answers: string or [strings]. write: no answer.
// =====================================================================
(function(){
"use strict";
const W = window.WS;
const PARTS = W.parts.map(p=>p.key);
const KEY = "icv:" + location.pathname + ":";
const OLD_API = "https://fynn-class-assignment-submissions-20261024.neotboy.chatgpt.site/api/submit";
const SAMPLE = "Test T. preview answer: the teacher is checking this page, so this sample sentence fills the box.";
let S = null, SOLVE = null, msgAfter = null;

const $ = h=>{ const d=document.createElement("div"); d.innerHTML=h.trim(); return d.firstElementChild; };
const esc = s=>String(s==null?"":s).replace(/[<>&"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
const norm = s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
const isTestT = ()=> !!(window.classIsTestT && window.classIsTestT()) || /^test\s*t\.?$/i.test((S&&S.name)||"");
function opt(o){ return typeof o==="string" ? {v:o,label:o} : Object.assign({label:o.v}, o); }
function qsOf(part,item){
  if(item.qs) return item.qs.map((q,qi)=>Object.assign({}, part.q||{}, (qi===0&&item.ans!==undefined)?{ans:item.ans}:{}, q));
  return [Object.assign({}, part.q||{}, {ans:item.ans})];
}
function partByKey(k){ return W.parts.find(p=>p.key===k); }

/* ---------------- state ---------------- */
function fresh(name){ const s={name, part:PARTS[0], ans:{}, lock:{}, first:{}, cur:{}, done:{}, turnedIn:false};
  W.parts.forEach(p=>{ s.ans[p.key]={}; s.lock[p.key]={}; s.first[p.key]={}; s.cur[p.key]=0; }); return s; }
function save(){ try{ localStorage.setItem(KEY+S.name.toLowerCase(), JSON.stringify(S)); }catch(e){} }
function load(name){ try{ const v=JSON.parse(localStorage.getItem(KEY+name.toLowerCase())); return v&&v.ans?v:null; }catch(e){ return null; } }
const A=(pk,i,qi)=> (S.ans[pk][i]||{})[qi];
const L=(pk,i,qi)=> !!(S.lock[pk][i]||{})[qi];
function setA(pk,i,qi,v){ (S.ans[pk][i]=S.ans[pk][i]||{})[qi]=v; }
function setL(pk,i,qi){ (S.lock[pk][i]=S.lock[pk][i]||{})[qi]=true; }
function answered(pk,i,qi,q){ const v=A(pk,i,qi); return q.type==="write" ? !!(v&&String(v).trim()) : v!=null && v!==""; }
function itemDone(part,i){ return qsOf(part,part.items[i]).every((q,qi)=>answered(part.key,i,qi,q)); }
function itemLocked(part,i){ return qsOf(part,part.items[i]).every((q,qi)=>L(part.key,i,qi)); }
function partLocked(part){ return part.items.every((_,i)=>itemLocked(part,i)); }
function isRight(q,v){ if(q.type==="pick") return [].concat(q.ans).includes(v); if(q.type==="type"){ const a=[].concat(q.ans); return a.some(x=>norm(x)===norm(v)); } return v===q.ans; }

/* ---------------- frame ---------------- */
const main = document.getElementById("main");
function header(){
  const st=document.getElementById("steps"); st.innerHTML="";
  st.className = "steps" + (PARTS.length>4 ? " many" : "");
  if(!S) return;
  W.parts.forEach(p=>{ const cls=S.done[p.key]?"done":(S.part===p.key?"on":""); st.appendChild($(`<span class="step ${cls}">${S.done[p.key]?"✓ ":""}${p.key}<span class="long"> · ${esc(p.name)}</span></span>`)); });
}
function setMsg(t,cls){ const m=document.getElementById("msg"); if(m){ m.textContent=t; m.className="msg "+(cls||""); } }
function openSource(src){
  const box=$(`<div class="modal"><div class="box"><button class="close">Close ✕</button><h3>${esc(src.title||src.label)}</h3>${src.html}</div></div>`);
  box.onclick=e=>{ if(e.target===box||e.target.classList.contains("close")) box.remove(); };
  document.body.appendChild(box);
}

/* ---------------- a part ---------------- */
function renderPart(){
  const part=partByKey(S.part), pk=part.key, n=part.items.length;
  let cur=S.cur[pk]||0; if(cur>=n) cur=0; S.cur[pk]=cur;
  main.innerHTML="";
  const dir=$(`<div class="dir"><div class="tag">${pk}.</div><p>${part.dir}</p></div>`);
  if(part.source){ const b=$(`<button class="srcbtn">${esc(part.source.label)}</button>`); b.onclick=()=>openSource(part.source); dir.appendChild(b); }
  main.appendChild(dir);

  const nav=$(`<div class="nav"><span class="lbl">${esc(part.navLabel||"Item")}</span></div>`);
  part.items.forEach((it,i)=>{
    const d=$(`<button class="dot" data-i="${i}">${i+1}</button>`);
    d.onclick=()=>{ S.cur[pk]=i; save(); renderPart(); };
    nav.appendChild(d);
  });
  nav.appendChild($(`<span class="count" id="count"></span>`));
  main.appendChild(nav);

  const stage=$(`<div class="stage"></div>`); main.appendChild(stage);
  const item=part.items[cur], qs=qsOf(part,item), locked=itemLocked(part,cur);
  const ic=item.ic||part.ic||"";
  stage.appendChild($(`<div class="item ${locked?"lock":""}">${ic?`<span class="icon">${ic}</span>`:""}<div><div class="num">${esc(part.navLabel||"Item")} ${cur+1} of ${n}</div><div class="txt ${item.style||""}">${item.text}</div>${item.who?`<div class="who">${item.who}</div>`:""}</div></div>`));

  // two choice questions in a row sit side by side; a set of one-line boxes sits in a grid
  const isC = q=>q && (!q.type||q.type==="choice");
  const lines = qs.length>1 && qs.every(q=>q.type==="write"&&q.line);
  const lineGrid = lines ? stage.appendChild($(`<div class="qgrid"></div>`)) : null;
  const pairAt = {}; for(let k=0;k<qs.length-1;k++){ if(isC(qs[k]) && isC(qs[k+1]) && !(k in pairAt) && !((k-1) in pairAt)){ pairAt[k]=true; k++; } }
  let pairBox = null;
  qs.forEach((q,qi)=>{
    let holder = lineGrid || stage;
    if(pairAt[qi]){ pairBox = stage.appendChild($(`<div class="qpair"></div>`)); holder = pairBox; }
    else if(pairAt[qi-1] && pairBox){ holder = pairBox; }
    const wrap=$(`<div class="q"></div>`);
    if(q.ask) wrap.appendChild($(`<div class="ask">${q.ask}</div>`));
    const qLocked=L(pk,cur,qi);
    if(q.type==="write"){
      if(q.starter) wrap.appendChild($(`<div class="starter">Start with: “${esc(q.starter)}”</div>`));
      const ta = q.line ? $(`<input type="text" class="wl" autocomplete="off" placeholder="${esc(q.ask||"")}" aria-label="Leader info: ${esc((q.ask||item.text).replace(/<[^>]+>/g,""))}" ${qLocked?"readonly":""}>`)
                        : $(`<textarea class="w" aria-label="${esc((q.ask||item.text).replace(/<[^>]+>/g,""))}" ${qLocked?"readonly":""}></textarea>`);
      ta.value=A(pk,cur,qi)||"";
      ta.oninput=()=>{ setA(pk,cur,qi,ta.value); save(); chrome(); };
      wrap.appendChild(ta);
    } else if(q.type==="pick"){
      // passage text with [[id|words]] spans; clicking any word answers with that span's id (or "x" outside spans)
      const box=$(`<div class="passage"></div>`); const val=A(pk,cur,qi);
      String(q.passage).split(/(\[\[[^\]]+\]\])/).forEach(chunk=>{
        let id="x", txt=chunk; const m=chunk.match(/^\[\[([^|\]]+)\|([^\]]+)\]\]$/); if(m){ id=m[1]; txt=m[2]; }
        const span=document.createElement("span"); span.dataset.id=id; span.className="seg"+(val!=null&&val===id&&id!=="x"?(qLocked?" right":" sel"):"");
        txt.split(/(\s+)/).forEach(w=>{ if(!w) return; if(/^\s+$/.test(w)){ span.appendChild(document.createTextNode(w)); return; }
          const b=document.createElement("span"); b.className="w"+(val==="x:"+w&&id==="x"?" sel":""); b.textContent=w;
          b.onclick=()=>{ if(qLocked) return; setA(pk,cur,qi, id==="x" ? "x:"+w : id); save(); if(itemDone(part,cur) && qs.every(x=>x.type==="pick"||x.type==="choice"||!x.type)){ for(let s2=1;s2<=n;s2++){ const j=(cur+s2)%n; if(!itemLocked(part,j) && !itemDone(part,j)){ S.cur[pk]=j; break; } } save(); } renderPart(); };
          span.appendChild(b); });
        box.appendChild(span);
      });
      wrap.appendChild(box);
    } else if(q.type==="type"){
      const row=$(`<div class="typein"><input type="text" autocomplete="off" spellcheck="false" aria-label="Your answer" ${qLocked?"readonly":""}>${q.len?`<span class="len">${q.len} letters</span>`:""}</div>`);
      const inp=row.querySelector("input"); inp.value=A(pk,cur,qi)||""; if(qLocked) inp.classList.add("ok");
      inp.oninput=()=>{ setA(pk,cur,qi,inp.value); save(); chrome(); };
      inp.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); goNext(part); } };
      wrap.appendChild(row);
    } else {
      const opts=(q.opts||[]).map(opt);
      const box=$(`<div class="opts c${q.cols||1}${q.compact?" compact":""}"></div>`);
      const usedBy={}; if(q.unique) part.items.forEach((_,j)=>{ if(j!==cur){ const v=A(pk,j,qi); if(v!=null) usedBy[v]=j; } });
      const count={}; if(q.cap) part.items.forEach((_,j)=>{ if(j!==cur){ const v=A(pk,j,qi); if(v!=null) count[v]=(count[v]||0)+1; } });
      opts.forEach(o=>{
        const on=A(pk,cur,qi)===o.v, used=o.v in usedBy, full=q.cap && (count[o.v]||0)>=q.cap;
        const otherLocked = used && L(pk,usedBy[o.v],qi);
        let html;
        if(q.big||o.em) html=`<button class="opt big ${on?(qLocked?"right":"sel"):""} ${full&&!on?"full":""}">${o.em?`<span class="em">${o.em}</span>`:""}<span class="k">${esc(o.label)}</span>${o.sub?`<span class="d">${esc(o.sub)}</span>`:""}${q.cap?`<span class="d"><b>${(count[o.v]||0)+(on?1:0)} of ${q.cap}</b></span>`:""}</button>`;
        else html=`<button class="opt ${on?(qLocked?"right":"sel"):""} ${used&&!on?"used":""}">${o.ltr?`<span class="ltr">${esc(o.ltr)}</span>`:""}<span>${esc(o.label)}</span>${used&&!on?`<span class="note">on #${usedBy[o.v]+1}</span>`:""}</button>`;
        const b=$(html);
        if(qLocked || otherLocked) b.disabled=true;
        b.onclick=()=>{
          if(qLocked) return;
          if(full && !on){ setMsg(`“${o.label}” already has ${q.cap}. Change one of those first.`,"try"); return; }
          if(used) delete S.ans[pk][usedBy[o.v]][qi];
          setA(pk,cur,qi,o.v); save();
          // move on to the next item that still needs answers (only when this one has nothing to type)
          if(itemDone(part,cur) && qs.every(x=>x.type==="choice"||x.type==="pick"||!x.type)){
            for(let s=1;s<=n;s++){ const j=(cur+s)%n; if(!itemLocked(part,j) && !itemDone(part,j)){ S.cur[pk]=j; break; } }
          }
          save(); renderPart();
        };
        box.appendChild(b);
      });
      wrap.appendChild(box);
    }
    holder.appendChild(wrap);
  });
  if(item.reveal && answered(pk,cur,0,qs[0])) stage.appendChild($(`<div class="reveal">${item.reveal}</div>`));

  main.appendChild($(`<div class="bar"><button class="btn ghost" id="prev" title="Previous">◀</button><button class="btn ghost" id="nextI" title="Next">▶</button><div class="msg" id="msg"></div><button class="btn" id="check" disabled>Check</button></div>`));
  document.getElementById("prev").onclick=()=>{ S.cur[pk]=(cur-1+n)%n; save(); renderPart(); };
  document.getElementById("nextI").onclick=()=>goNext(part);
  if(n<2){ document.getElementById("prev").hidden=true; document.getElementById("nextI").hidden=true; }
  chrome();
  if(partLocked(part)){ finishPart(part); return; }
  if(msgAfter){ setMsg(msgAfter.t,msgAfter.c); msgAfter=null; }
  document.getElementById("check").onclick=()=>check(part);
  SOLVE=()=>{ part.items.forEach((it,i)=>qsOf(part,it).forEach((q,qi)=>{ if(!L(pk,i,qi)){ setA(pk,i,qi, q.type==="write" ? (A(pk,i,qi)||SAMPLE) : (q.type==="type"||q.type==="pick" ? [].concat(q.ans)[0] : q.ans)); setL(pk,i,qi); } })); save(); renderPart(); };
  if(window.classTestSkip) window.classTestSkip.refresh();
  const focus=stage.querySelector("textarea:not([readonly]),.typein input:not([readonly])"); if(focus && !("ontouchstart" in window)) focus.focus();
}
function goNext(part){ const pk=part.key, n=part.items.length; S.cur[pk]=(S.cur[pk]+1)%n; save(); renderPart(); }
function chrome(){
  const part=partByKey(S.part); if(!part) return; const pk=part.key, n=part.items.length;
  document.querySelectorAll(".nav .dot").forEach(d=>{ const i=+d.dataset.i; d.className="dot"+(itemLocked(part,i)?" lock":itemDone(part,i)?" ans":"")+(i===S.cur[pk]?" cur":""); d.textContent=(itemLocked(part,i)?"✓":"")+(i+1); });
  const done=part.items.filter((_,i)=>itemDone(part,i)).length;
  const c=document.getElementById("count"); if(c) c.textContent=`${done} of ${n} answered`;
  const chk=document.getElementById("check");
  if(chk && !partLocked(part)){ chk.disabled = done<n; const m=document.getElementById("msg"); if(m && !m.className.includes("try")) setMsg(done<n?"Use the numbers or ◀ ▶ to move around.":"All answered — press Check."); }
}
function check(part){
  const pk=part.key, wrong=[]; let writeProblem=null;
  part.items.forEach((it,i)=>qsOf(part,it).forEach((q,qi)=>{
    if(L(pk,i,qi)) return;
    const v=A(pk,i,qi);
    if(q.free){ setL(pk,i,qi); return; }
    if(q.type==="write"){
      if(!q.line && !isTestT() && window.classWritingCheck){ const r=window.classWritingCheck(v,{prompt:(q.ask||it.text||"").replace(/<[^>]+>/g,""), starter:q.starter||""}); if(r && !r.ok){ if(!writeProblem) writeProblem={i, m:r.message||"Write a real answer in your own words."}; return; } }
      setL(pk,i,qi); return;
    }
    const ok=isRight(q,v);
    const k=i+"."+qi; if(!(k in S.first[pk])) S.first[pk][k]=ok;
    if(ok) setL(pk,i,qi); else wrong.push([i,qi]);
  }));
  if(!wrong.length && !writeProblem){ save(); renderPart(); return; }
  const wrongItems=[...new Set(wrong.map(x=>x[0]))];
  document.querySelectorAll(".nav .dot").forEach(d=>{ if(wrongItems.includes(+d.dataset.i)) d.classList.add("shake"); });
  setTimeout(()=>{
    wrong.forEach(([i,qi])=>{ delete S.ans[pk][i][qi]; });
    const n=part.items.length;
    if(wrongItems.length){
      S.cur[pk]=wrongItems[0];
      msgAfter={t:`${n-wrongItems.length} right! Number${wrongItems.length>1?"s":""} ${wrongItems.map(i=>i+1).join(", ")} went back — try ${wrongItems.length>1?"those":"that one"} again.`, c:"try"};
    } else { S.cur[pk]=writeProblem.i; msgAfter={t:`Number ${writeProblem.i+1}: ${writeProblem.m}`, c:"try"}; }
    save(); renderPart();
  }, wrong.length?450:0);
}
function finishPart(part){
  S.done[part.key]=true; save(); header();
  setMsg(`Part ${part.key} done! ✔`,"good");
  const c=document.getElementById("check"); const i=PARTS.indexOf(part.key);
  c.textContent = i<PARTS.length-1 ? "Next part →" : "Finish →"; c.className="btn next"; c.disabled=false;
  c.onclick=()=>{ S.part = i<PARTS.length-1 ? PARTS[i+1] : "END"; save(); render(); };
  SOLVE=null; if(window.classTestSkip) window.classTestSkip.refresh();
}

/* ---------------- start ---------------- */
function renderStart(){
  S=null; header();
  let last=""; try{ last=localStorage.getItem("site-student-name")||""; }catch(e){}
  main.innerHTML="";
  main.appendChild($(`<div class="center"><div class="startcard">
      <h2>${W.hook[0]}</h2>
      <p class="hook">${W.hook[1]}</p>
      <ul class="plan">${W.parts.map(p=>`<li><b>${p.key}</b> ${esc(p.plan||p.name)}</li>`).join("")}</ul>
      ${W.paper?`<p class="note-paper">📄 ${W.paper}</p>`:""}
      <p style="margin:0 0 10px;font-size:14px;color:var(--muted)">About ${W.minutes||20} minutes · each part opens after the one before it.</p>
      <label for="nm">Your name (first name + last initial)</label>
      <input id="nm" data-student-name="1" placeholder="Example: Jordan M." value="${esc(last)}" autocomplete="off">
      <button class="btn" id="go" style="width:100%;font-size:18px;padding:12px">Start ▶</button>
  </div></div>`));
  const go=()=>{
    const box=document.getElementById("nm"), n=box.value.trim().replace(/\s+/g," ");
    const ok = window.classNameState ? window.classNameState(n)==="ok" : n.length>=2;
    if(!ok){ box.focus(); box.classList.add("shake"); setTimeout(()=>box.classList.remove("shake"),400); return; }
    S = load(n) || fresh(n); S.name=n; try{ localStorage.setItem("site-student-name", n); }catch(e){} save(); render();
  };
  document.getElementById("go").onclick=go;
  document.getElementById("nm").onkeydown=e=>{ if(e.key==="Enter") go(); };
}

/* ---------------- finish + turn in ---------------- */
function labelOf(q,v){ if(q.type==="pick"){ if(v==null) return ""; if(String(v).startsWith("x:")) return "clicked “"+String(v).slice(2)+"”"; const m=String(q.passage).match(new RegExp("\\[\\["+v+"\\|([^\\]]+)\\]\\]")); return m?"“"+m[1]+"”":String(v); } if(q.type==="choice"||!q.type){ const o=(q.opts||[]).map(opt).find(x=>x.v===v); return o ? (o.ltr? o.ltr+" "+o.label : o.label) : String(v); } return String(v||""); }
function renderEnd(){
  main.innerHTML="";
  main.appendChild($(`<div class="center"><div class="fcard">
    <div style="font-size:42px">🏛️✅</div>
    <h2>${esc(W.name)} — All Parts Done</h2>
    <p>Nice work, <b>${esc(S.name)}</b> — press the button to send your work to your teacher.</p>
    <button class="btn next" id="sendBtn" style="font-size:19px;padding:13px 30px;margin:8px 0">${S.turnedIn?"✓ Turned in":"Turn it in ▶"}</button>
    <p class="msg ${S.turnedIn?"good":""}" id="sendMsg" style="min-height:22px">${S.turnedIn?"✓ Turned in. Your teacher can see your work.":""}</p>
  </div></div>`));
  const btn=document.getElementById("sendBtn"), msg=document.getElementById("sendMsg");
  if(S.turnedIn){ btn.disabled=true; return; }
  btn.onclick=async()=>{
    if(typeof window.classTurnIn!=="function"){ msg.textContent="Turn-in isn't working right now. Keep this page open and tell your teacher."; msg.className="msg try"; return; }
    btn.disabled=true; btn.textContent="Sending…"; msg.textContent="";
    let tr=0, tt=0; const byPart=[];
    W.parts.forEach(p=>{ const f=Object.values(S.first[p.key]); if(f.length){ const r=f.filter(Boolean).length; tr+=r; tt+=f.length; byPart.push(`${p.key} · ${p.name}: ${r} of ${f.length}`); } });
    const answers={"Standard": W.std.join(", ")};
    if(tt) { answers["First-try correct"]=tr+" of "+tt; answers["First-try by part"]=byPart.join(" · "); }
    W.parts.forEach(p=>p.items.forEach((it,i)=>{
      const qs=qsOf(p,it), plain=String(it.short||it.text).replace(/<[^>]+>/g,"").replace(/\s+/g," ");
      qs.forEach((q,qi)=>{
        const k=`${p.key}${i+1}${qs.length>1?"."+(qi+1):""} · ${q.short||(plain.length>48?plain.slice(0,46)+"…":plain)}`;
        const v=A(p.key,i,qi);
        if(q.type==="write") answers["Writing: "+k]=String(v||"").trim();
        else if(q.free) answers[k]=labelOf(q,v);
        else { const f=S.first[p.key][i+"."+qi]; answers[k]=labelOf(q,v)+(f===false?" (fixed after a miss)":" (first try)"); }
      });
    }));
    try{
      const res=await window.classTurnIn(OLD_API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({studentName:S.name,assignmentId:W.id,assignmentTitle:W.title,answers})});
      const data=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(data.error||"Your work did not save. Try again.");
      S.turnedIn=true; save();
      btn.textContent="✓ Turned in"; msg.textContent="✓ Turned in. Your teacher can see your work."; msg.className="msg good";
    }catch(err){ msg.textContent=err.message||"Could not turn in. Try again."; msg.className="msg try"; btn.disabled=false; btn.textContent="Turn it in ▶"; }
  };
}

/* ---------------- router ---------------- */
function render(){ header(); if(!S) return renderStart(); if(S.part==="END") return renderEnd(); renderPart(); }
document.getElementById("restart").onclick=e=>{
  e.preventDefault(); if(!S) return;
  const box=$(`<div class="modal"><div class="box" style="max-width:380px;text-align:center"><p style="font-weight:800;font-size:17px;margin:0 0 12px">Erase your answers and start over?</p><button class="btn ghost" id="no">Keep my work</button> <button class="btn" id="yes" style="background:var(--accent2)">Start over</button></div></div>`);
  document.body.appendChild(box);
  box.querySelector("#no").onclick=()=>box.remove();
  box.querySelector("#yes").onclick=()=>{ try{ localStorage.removeItem(KEY+S.name.toLowerCase()); }catch(x){} S=null; box.remove(); render(); };
};
document.title = W.name + " (Online)";
document.querySelector("header h1").textContent = W.name;
document.getElementById("src").textContent = W.source;

/* ---------------- TEST T. SKIP MODE (shared/turnin.js) ---------------- */
try{
  const SCREENS=PARTS.concat(["END"]);
  (window.classTestHooks = window.classTestHooks || []).push({
    count: () => SCREENS.length,
    index: () => S ? Math.max(0, SCREENS.indexOf(S.part)) : 0,
    label: i => i<PARTS.length ? PARTS[i]+" · "+W.parts[i].name : "Turn in",
    go: i => { if(!S) S=fresh("Test T."); S.part=SCREENS[i]; save(); render(); },
    solve: () => { if(SOLVE) SOLVE(); }
  });
  if (window.classTestSkip) window.classTestSkip.refresh();
}catch(e){}
render();
window.__WS_STATE = ()=>S;  // for testing
window.__WS_QS = (pk,i)=>qsOf(partByKey(pk), partByKey(pk).items[i]).map(q=>({type:q.type||'choice', ans:q.free?(typeof q.opts[0]==='string'?q.opts[0]:q.opts[0].v):q.ans, free:!!q.free, uniq:!!(q.unique||q.cap), opts:(q.opts||[]).map(o=>typeof o==='string'?o:o.v)}));
})();
