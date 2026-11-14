const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
 const browser = await chromium.launch({headless:true,executablePath:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"});
 const out = 'C:/Users/hieuh/Documents/Codex/2026-10-21/files-pasted-by-the-user-t/outputs';
 const shots = 'C:/Users/hieuh/Documents/Codex/2026-10-21/files-pasted-by-the-user-t/screenshots';
 const pages = [['index','index.html'],['autopump','projects/autopump.html'],['stm32-throttle-control','projects/stm32-throttle-control.html']];
 const widths=[1440,768,390]; const results=[];
 for(const [name,rel] of pages) for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
   const errs=[]; const warns=[]; const failed=[]; const bad=[];
   page.on('pageerror',e=>errs.push(e.message));
   page.on('console',m=>{if(m.type()==='error')errs.push(m.text()); if(m.type()==='warning')warns.push(m.text())});
   page.on('requestfailed',r=>failed.push(`${r.url()} ${r.failure()?.errorText}`));
   page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
   const url='http://127.0.0.1:8000/'+rel;
   await page.goto(url,{waitUntil:'networkidle'});
   await page.screenshot({path:path.join(shots,`${name}-${width}.png`),fullPage:true});
   const metrics=await page.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth, bodyWidth:document.body.scrollWidth, title:document.title, images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.naturalWidth>0,display:getComputedStyle(i).display,placeholder:document.querySelector(`[data-placeholder-box="${i.dataset.placeholder}"]`)?.getComputedStyle?.display})), links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.getAttribute('href'),resolved:a.href})), cv:[...document.querySelectorAll('[data-file-link]')].map(a=>({disabled:a.getAttribute('aria-disabled'),title:a.title,cls:a.className}))}));
   if(width===390 && name==='index') { await page.locator('.menu-toggle').click(); await page.screenshot({path:path.join(shots,'menu-mobile-open.png')}); }
   results.push({name,width,metrics,errs,warns,failed,bad});
   await page.close();
 }
 // Verify internal resources/anchor destinations while serving at the repository root.
 const check=await browser.newPage(); await check.goto('http://127.0.0.1:8000/');
 const hrefs=await check.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')).filter(h=>h && !h.startsWith('http') && !h.startsWith('mailto:') && !h.startsWith('#') && !(h.endsWith('.pdf'))));
 const pathResults=[];
 for(const h of [...new Set(hrefs)]) { const r=await check.request.get(new URL(h,'http://127.0.0.1:8000/').href); pathResults.push({href:h,status:r.status()}); }
 await browser.close(); console.log(JSON.stringify({results,pathResults},null,2));
})().catch(e=>{console.error(e);process.exit(1)});


