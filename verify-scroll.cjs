const {chromium}=require('C:/Users/iyoun/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url'),path=require('path'),assert=require('assert');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
for(const motion of ['no-preference','reduce']){
const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:motion});let errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto(process.env.LIVE_URL||pathToFileURL(path.join(__dirname,'index.html')).href);
await p.evaluate(()=>show(2));await p.mouse.click(1000,820);await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>idx),3,'click');
await p.keyboard.press('ArrowRight');await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>idx),4,'right');
await p.click('[data-screen="fixed"]');assert.equal(await p.evaluate(()=>idx),4,'gallery stays');
await p.keyboard.press('ArrowLeft');await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>idx),3,'left');
await p.locator('body').click({position:{x:5,y:5}});await p.waitForTimeout(1200);await p.evaluate(()=>show(5));await p.keyboard.press('Space');await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>idx),6,'space');
await p.evaluate(()=>{scrollTo(0,unit*6.65);render()});await p.waitForTimeout(100);
if(motion==='no-preference'){const visible=await p.locator('.slide').evaluateAll(s=>s.filter(x=>getComputedStyle(x).visibility==='visible').length);assert.equal(visible,2,'scroll scrubs neighboring scenes');await p.screenshot({path:path.join(__dirname,'qa/scroll-between.png')});}
for(let i=0;i<20;i++){await p.evaluate(i=>show(i),i);assert.equal(await p.locator('.slide.active').getAttribute('id'),'s'+(i+1));}
assert.deepEqual(errors,[]);console.log(motion+' navigation and 20 scenes passed');await p.close();}
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
