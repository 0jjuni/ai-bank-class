const {chromium}=require('C:/Users/iyoun/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url'),path=require('path'),assert=require('assert');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
for(const motion of ['no-preference','reduce']){
const p=await b.newPage({viewport:{width:1600,height:956},reducedMotion:motion});let errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto(process.env.LIVE_URL||pathToFileURL(path.join(__dirname,'index.html')).href);await p.evaluate(()=>document.fonts.ready);
await p.evaluate(()=>show(2));await p.waitForTimeout(1500);
for(let step=0;step<3;step++){
assert.equal(await p.evaluate(()=>idx),2);assert.equal(await p.evaluate(()=>stage),step);
await p.screenshot({path:path.join(__dirname,`qa/gmail-${motion}-${step}.png`)});
await p.mouse.click(300,160);await p.waitForTimeout(1200);
}
assert.equal(await p.evaluate(()=>idx),3,'3 clicks finish 3-stage mail scene');
await p.keyboard.press('ArrowLeft');await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>stage),2);assert.equal(await p.evaluate(()=>idx),2);
await p.click('#replay-scene');await p.waitForTimeout(1500);assert.equal(await p.evaluate(()=>stage),0);
await p.evaluate(()=>move(starts[2]+.5,false));await p.screenshot({path:path.join(__dirname,`qa/gmail-mid-${motion}.png`)});
for(let i=0;i<20;i++){
 await p.evaluate(i=>show(i,true),i);await p.waitForTimeout(30);
 assert.equal(await p.evaluate(()=>idx),i,'scene '+i);
 const bad=await p.locator('.slide.active img').evaluateAll(imgs=>imgs.filter(im=>!im.complete||!im.naturalWidth).map(im=>im.src));assert.deepEqual(bad,[]);
}
assert.deepEqual(errors,[]);console.log(motion+': mail 3 stages, rewind/replay, all 20 scenes and assets passed');await p.close();}
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
