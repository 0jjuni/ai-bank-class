const slides=[...document.querySelectorAll('.slide')],notes=JSON.parse(document.getElementById('notes-data').textContent),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let idx=0,stage=0,unit=innerHeight*1.35,raf=0;
const track=document.createElement('div');track.className='scroll-track';document.body.append(track);
const jump=document.getElementById('jump'),film=document.getElementById('story');
notes.forEach((n,i)=>jump.add(new Option(`${i+1}. ${n.title}`,i)));
function fit(){unit=innerHeight*.9;track.style.height=(totalStops*unit+innerHeight)+'px';render()}
const clamp=x=>Math.max(0,Math.min(1,x));
function render(){
 const raw=scrollY/unit;let owner=starts.findLastIndex(n=>raw>=n-.0001);owner=Math.max(0,owner);
 const local=raw-starts[owner],transition=clamp(local-beatCounts[owner]),chosen=transition>.5?Math.min(owner+1,slides.length-1):owner;
 const changed=chosen!==idx;if(changed){film.pause();idx=chosen}
 stage=Math.round(clamp((raw-starts[idx])/Math.max(1,beatCounts[idx]))*beatCounts[idx]);
 const scale=Math.min(innerWidth/1600,(innerHeight-56)/900);
 slides.forEach((s,i)=>{
  const active=i===idx,near=i===owner||(i===owner+1&&transition>0),d=i===owner?-transition:1-transition;
  s.classList.toggle('active',active);s.inert=!active;s.setAttribute('aria-hidden',String(!active));s.style.visibility=near?'visible':'hidden';
  s.style.opacity=reduced?(active?1:0):near?clamp((1-Math.abs(d))*1.6):0;
  s.style.transform=`translateY(${reduced?0:d*innerHeight*.8}px) scale(${scale})`;
  if(near)choreograph(s,i,Math.max(0,Math.min(beatCounts[i],raw-starts[i])));
 });
 if(changed)enterScene(slides[idx]);
 jump.value=idx;document.getElementById('counter').textContent=`${idx+1} / ${slides.length}`;
 document.getElementById('progress').style.width=raw/totalStops*100+'%';
 document.getElementById('prev').disabled=raw<.01;document.getElementById('next').disabled=raw>=totalStops-.01;
 document.getElementById('next').textContent=stage<beatCounts[idx]?'계속 →':'다음 →';
 document.getElementById('note-title').textContent=`${idx+1}. ${notes[idx].title}`;document.getElementById('note-body').textContent=notes[idx].notes;
 if(location.hash!=='#'+(idx+1))history.replaceState(null,'','#'+(idx+1));
}
function move(stop,smooth=true){scrollTo({top:Math.max(0,Math.min(totalStops,stop))*unit,behavior:smooth&&!reduced?'smooth':'instant'});if(!smooth||reduced)render()}
function go(n,smooth=true){move(starts[Math.max(0,Math.min(slides.length-1,n))],smooth)}
function show(n,end=false){n=Math.max(0,Math.min(slides.length-1,n));move(starts[n]+(end?beatCounts[n]:0),false)}
function next(){move(Math.floor(scrollY/unit+.04)+1)}
function prev(){move(Math.ceil(scrollY/unit-.04)-1)}
addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;render()})},{passive:true});
addEventListener('resize',()=>{const n=idx;fit();go(n,false)});
addEventListener('hashchange',()=>go((parseInt(location.hash.slice(1))||1)-1,false));
document.getElementById('next').onclick=next;document.getElementById('prev').onclick=prev;jump.onchange=()=>go(+jump.value);
document.getElementById('all').style.display='none';
document.getElementById('note-toggle').onclick=()=>document.getElementById('notes').classList.toggle('open');
document.getElementById('source-toggle').onclick=()=>document.getElementById('sources').showModal();document.getElementById('close-sources').onclick=()=>document.getElementById('sources').close();
document.getElementById('print').onclick=()=>print();document.getElementById('fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.isContentEditable||['SELECT','INPUT','TEXTAREA','VIDEO'].includes(e.target.tagName))return;if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();next()}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();prev()}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}if(e.key==='Escape')document.getElementById('notes').classList.remove('open')});
document.getElementById('viewport').addEventListener('click',e=>{if(e.button!==0||e.target.closest('button,a,input,select,textarea,video,audio,.briefing-window,[role="button"]')||document.querySelector('dialog[open]')||getSelection().toString())return;next()});
document.getElementById('play-film').onclick=()=>film.paused?film.play():film.pause();document.getElementById('restart-film').onclick=()=>{film.currentTime=0;film.play()};film.onplay=()=>document.getElementById('play-film').textContent='Ⅱ 일시 정지';film.onpause=()=>document.getElementById('play-film').textContent='▶ 영상 재생';
const stamp=n=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(Math.floor(n%60)).padStart(2,'0')}`;film.ontimeupdate=()=>document.getElementById('film-time').textContent=stamp(film.currentTime)+' / '+stamp(film.duration||143.333);
const captions={home:'한 달의 기록과 실수령액 확인',fixed:'매달 나가는 돈을 한눈에 확인',portfolio:'내 자산 구성을 한곳에서 확인'};
document.querySelectorAll('[data-screen]').forEach(b=>b.onclick=()=>{document.getElementById('app-screen').src='assets/payroll-'+b.dataset.screen+'.png';document.getElementById('app-caption').textContent=captions[b.dataset.screen];document.getElementById('app-desktop-screen').src='assets/payroll-desktop-'+b.dataset.screen+'.png';document.querySelectorAll('[data-screen]').forEach(x=>x.classList.toggle('selected',x===b))});
document.getElementById('replay-scene').onclick=()=>{go(idx,false);enterScene(slides[idx])};
const initial=(parseInt(location.hash.slice(1))||1)-1;history.scrollRestoration='manual';fit();go(initial,false);
