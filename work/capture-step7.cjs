const { chromium } = require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const out='C:/Users/hieuh/Documents/Codex/2026-10-21/files-pasted-by-the-user-t/screenshots/step7';
 const errors=[],warnings=[],broken=[];
 for(const [name,path,width] of [['index-1440','index.html',1440],['index-390','index.html',390],['autopump-1440','projects/autopump.html',1440],['stm32-1440','projects/stm32-throttle-control.html',1440]]){
  const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
  page.on('console',m=>{if(m.type()==='error')errors.push(name+': '+m.text());if(m.type()==='warning')warnings.push(name+': '+m.text())});
  page.on('pageerror',e=>errors.push(name+': '+e.message));
  page.on('requestfailed',r=>{if(!r.url().includes('fonts.googleapis.com')&&!r.url().includes('fonts.gstatic.com'))errors.push(name+' request failed '+r.url())});
  const response=await page.goto('http://127.0.0.1:8000/'+path,{waitUntil:'networkidle',timeout:30000});
  await page.evaluate(()=>document.fonts.ready);
  if(path==='index.html') await page.evaluate(()=>document.querySelectorAll('img[data-available="true"]').forEach(i=>i.loading='eager'));
  const dims=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
  if(dims.scrollWidth>dims.width)errors.push(name+': overflow '+dims.scrollWidth+' > '+dims.width);
  if(path==='index.html'){
   await page.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.body.scrollHeight;y+=650){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}await Promise.all([...document.querySelectorAll('img[data-available="true"]')].map(i=>i.decode().catch(()=>{})));scrollTo(0,0);await new Promise(r=>setTimeout(r,450))});
   await page.screenshot({path:out+'/'+name+'.png',fullPage:true});
  }else await page.screenshot({path:out+'/'+name+'.png',fullPage:true});
  const hrefs=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')).filter(h=>h&&!h.startsWith('#')&&!/^https?:|^mailto:|^tel:/.test(h)));
  for(const href of hrefs){const url=new URL(href,'http://127.0.0.1:8000/'+path),res=await page.request.get(url.toString());if(!res.ok())broken.push(name+' '+href+' '+res.status())}
  console.log(name,response.status(),JSON.stringify(dims));await page.close();
 }
 console.log(JSON.stringify({errors,warnings,broken},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
