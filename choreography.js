// A scene owns several scroll stops. Intermediate stops change its contents,
// rather than navigating straight past the demonstration.
const beatCounts=[0,0,2,1,0,0,1,1,2,0,2,0,1,1,2,1,1,1,2,1];
const starts=[];let totalStops=0;beatCounts.forEach(n=>{starts.push(totalStops);totalStops+=n+1});totalStops--;
const mix=(a,b,t)=>a+(b-a)*t;
function paint(el,{x=0,y=0,scale=1,opacity=1,rotate=0}={}){if(!el)return;el.style.transform=`translate(${x}px,${y}px) scale(${scale}) rotate(${rotate}deg)`;el.style.opacity=opacity;el.style.visibility=opacity<.015?'hidden':'visible';el.inert=opacity<.15;}
function sequence(scene,selector,p,span=1){const els=[...scene.querySelectorAll(selector)];els.forEach((e,j)=>{const v=clamp(p/span*(els.length-1)-j+1);paint(e,{x:reduced?0:(1-v)*90,y:0,opacity:v})})}
function choreograph(s,i,p){
 if(i===2){
  const a=clamp(p),b=clamp(p-1);
  s.querySelectorAll('.news-pool article').forEach((e,j)=>paint(e,{x:a*(400-j*25),y:a*(120-j*160),scale:1-a*.65,rotate:(1-a)*[-5,3,-2][j],opacity:1-a}));
  paint(s.querySelector('.briefing-engine'),{x:-a*300,opacity:1-a});
  paint(s.querySelector('.briefing-summary'),{x:mix(160,-270,a)+b*120,y:0,scale:1-b*.45,opacity:a*(1-b)});
  paint(s.querySelector('.gmail-delivery'),{x:(1-b)*480,y:(1-b)*120,scale:.72+b*.28,opacity:b});
  const labels=['뉴스를 모읍니다','핵심을 정리합니다','Gmail로 받아봅니다'];
  const captions=['매번 검색하던 일을','주제별 요약과 기사 출처로','아침마다 도착하는 한 통의 메일로'];
  paint(s.querySelector('.briefing-statement'),{y:-b*265});
  const k=Math.min(2,Math.round(p));s.querySelector('.briefing-label').textContent=labels[k];s.querySelector('.briefing-caption').textContent=captions[k];
  s.querySelectorAll('.beat-dots i').forEach((e,j)=>e.classList.toggle('on',j===k));
 }
 if(i===3){const a=clamp(p);paint(s.querySelector('.prompt-slip'),{x:-a*60,opacity:1-a*.7});paint(s.querySelector('.deck-stack'),{x:-a*230,scale:1+a*.15});s.querySelectorAll('.mini-slide.back,.mini-slide.mid').forEach((e,j)=>{e.style.translate=`${a*(j?100:-100)}px ${a*(j?65:-45)}px`})}
 if(i===6){s.querySelectorAll('.work-destination').forEach(e=>paint(e,{x:(1-p)*80,opacity:clamp(p)}));s.querySelectorAll('.work-arrow').forEach(e=>paint(e,{x:(1-p)*-60,opacity:clamp(p)}));paint(s.querySelector('.gemini-analogy'),{y:(1-p)*50,opacity:clamp(p)})}
 if(i===7)sequence(s,'.skill-folder,.skill-how',p);
 if(i===8){const a=clamp(p),b=clamp(p-1);paint(s.querySelector('.hyperframe-feature'),{x:(1-a)*300,scale:1+(1-a)*.12});sequence(s,'.support-skills article',a);paint(s.querySelector('.install-strip'),{y:(1-b)*60,opacity:b});const line=s.querySelector('.timeline-art>div');if(line)line.style.left=(10+p*35)+'%'}
 if(i===10)sequence(s,'.prompt-paragraph',p,2);
 if(i===12)sequence(s,'.design-request > *',p);
 if(i===13)sequence(s,'.revision-pair figure',p);
 if(i===14)sequence(s,'.ax-question-row',p,2);
 if(i===15)sequence(s,'.idea-brief,.idea-chat',p);
 if(i===16){const e=s.querySelector('.bank-hall-reveal');paint(e,{y:(1-p)*45,opacity:clamp(p)})}
 if(i===17)sequence(s,'.validation-list article',p);
 if(i===18)sequence(s,'.internal-examples article',p,2);
 if(i===19)sequence(s,'.transfer-row',p);
}
let entrance=[];
function enterScene(scene){entrance.forEach(a=>a.cancel());entrance=[];if(reduced)return;
 const targets=scene.matches('.automation-scene')?scene.querySelectorAll('.news-pool article,.briefing-engine'):scene.querySelectorAll('header,.content-heading,.cover-copy,.experience-scenes article,.hyperframe-feature,.prompt-slip,.deck-stack');
 targets.forEach((el,j)=>entrance.push(el.animate([{translate:'0 55px',opacity:0},{translate:'0 0',opacity:1}],{duration:850,delay:j*140,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})));
}
