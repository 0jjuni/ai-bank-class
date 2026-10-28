const slides=[...document.querySelectorAll('.slide')],notes=JSON.parse(document.getElementById('notes-data').textContent),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let idx=0,stage=0,unit=innerHeight*1.35,raf=0;
const track=document.createElement('div');track.className='scroll-track';document.body.append(track);
const jump=document.getElementById('jump'),film=document.getElementById('story');
notes.forEach((n,i)=>jump.add(new Option(`${i+1}. ${n.title}`,i)));
function fit(){unit=innerHeight*1.35;track.style.height=((slides.length-1)*unit+innerHeight)+'px';render()}
const clamp=x=>Math.max(0,Math.min(1,x));
function render(){
 const raw=scrollY/unit,base=Math.floor(raw),local=raw-base,pos=base+clamp((local-.28)/.72),chosen=Math.min(slides.length-1,Math.floor(pos+.5)),scale=Math.min(innerWidth/1600,(innerHeight-56)/900);
 if(chosen!==idx){film.pause();idx=chosen}stage=0;
 slides.forEach((s,i)=>{
  const d=i-pos,near=Math.abs(d)<1,active=i===idx;
  s.classList.toggle('active',active);s.inert=!active;s.setAttribute('aria-hidden',String(!active));
  s.style.visibility=near?'visible':'hidden';
  const fade=clamp((1-Math.abs(d))*1.8);
  s.style.opacity=reduced?(active?1:0):fade;
  s.style.transform=`translateY(${reduced?0:d*innerHeight*.72}px) scale(${scale*(reduced?1:1-Math.min(Math.abs(d),1)*.045)})`;
  if(near){
   s.querySelectorAll('.mail-preview,.deck-stack,.focus-stage img,.brand,.hyperframe-feature,.revision-pair figure,.ax-question-row,.transfer-row').forEach((el,j)=>{el.style.translate=reduced?'0 0':`0 ${d*(35+(j%3)*22)}px`});
   const orbit=s.querySelector('.clock-orbit');if(orbit)orbit.style.rotate=(reduced?0:raw*140)+'deg';
   const timeline=s.querySelector('.timeline-art>div');if(timeline)timeline.style.left=(20+clamp(raw-i)*70)+'%';
   const layers=s.querySelectorAll('.mini-slide.back,.mini-slide.mid');layers.forEach((el,j)=>{el.style.translate=reduced?'0 0':`${clamp(raw-i)*60*(j?1:-1)}px ${clamp(raw-i)*-30}px`});
  }
 });
 jump.value=idx;document.getElementById('counter').textContent=`${idx+1} / ${slides.length}`;
 document.getElementById('progress').style.width=(pos/(slides.length-1)*100)+'%';
 document.getElementById('prev').disabled=pos<.01;document.getElementById('next').disabled=pos>=slides.length-1-.01;
 document.getElementById('note-title').textContent=`${idx+1}. ${notes[idx].title}`;document.getElementById('note-body').textContent=notes[idx].notes;
 if(location.hash!=='#'+(idx+1))history.replaceState(null,'','#'+(idx+1));
}
function go(n,smooth=true){n=Math.max(0,Math.min(slides.length-1,n));scrollTo({top:n*unit,behavior:smooth&&!reduced?'smooth':'instant'});if(!smooth||reduced)render()}
function show(n,end=false){go(n,false)}
function next(){go(Math.floor(scrollY/unit+.08)+1)}
function prev(){go(Math.ceil(scrollY/unit-.08)-1)}
addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;render()})},{passive:true});
addEventListener('resize',()=>{const n=idx;fit();go(n,false)});
addEventListener('hashchange',()=>go((parseInt(location.hash.slice(1))||1)-1,false));
document.getElementById('next').onclick=next;document.getElementById('prev').onclick=prev;jump.onchange=()=>go(+jump.value);
document.getElementById('all').style.display='none';
document.getElementById('note-toggle').onclick=()=>document.getElementById('notes').classList.toggle('open');
document.getElementById('source-toggle').onclick=()=>document.getElementById('sources').showModal();document.getElementById('close-sources').onclick=()=>document.getElementById('sources').close();
document.getElementById('print').onclick=()=>print();document.getElementById('fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.isContentEditable||['SELECT','INPUT','TEXTAREA','VIDEO'].includes(e.target.tagName))return;if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();next()}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();prev()}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}if(e.key==='Escape')document.getElementById('notes').classList.remove('open')});
document.getElementById('viewport').addEventListener('click',e=>{if(e.button!==0||e.target.closest('button,a,input,select,textarea,video,audio,[role="button"]')||document.querySelector('dialog[open]')||getSelection().toString())return;next()});
document.getElementById('play-film').onclick=()=>film.paused?film.play():film.pause();document.getElementById('restart-film').onclick=()=>{film.currentTime=0;film.play()};film.onplay=()=>document.getElementById('play-film').textContent='Ⅱ 일시 정지';film.onpause=()=>document.getElementById('play-film').textContent='▶ 영상 재생';
const stamp=n=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(Math.floor(n%60)).padStart(2,'0')}`;film.ontimeupdate=()=>document.getElementById('film-time').textContent=stamp(film.currentTime)+' / '+stamp(film.duration||143.333);
const captions={home:'한 달의 기록과 실수령액 확인',fixed:'매달 나가는 돈을 한눈에 확인',portfolio:'내 자산 구성을 한곳에서 확인'};
document.querySelectorAll('[data-screen]').forEach(b=>b.onclick=()=>{document.getElementById('app-screen').src='assets/payroll-'+b.dataset.screen+'.png';document.getElementById('app-caption').textContent=captions[b.dataset.screen];document.getElementById('app-desktop-screen').src='assets/payroll-desktop-'+b.dataset.screen+'.png';document.querySelectorAll('[data-screen]').forEach(x=>x.classList.toggle('selected',x===b))});
const initial=(parseInt(location.hash.slice(1))||1)-1;history.scrollRestoration='manual';fit();go(initial,false);
