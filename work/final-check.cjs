const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const out='C:/Users/hieuh/Documents/Codex/2026-10-21/files-pasted-by-the-user-t/outputs/index.html';
 const p=await b.newPage({viewport:{width:390,height:844}}); const errors=[]; const warnings=[]; const bad=[];
 p.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text())});p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
 await p.goto('file:///'+out.replaceAll('\\','/'),{waitUntil:'networkidle'});
 const fileState=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,cv:{disabled:document.querySelector('[data-file-link]').getAttribute('aria-disabled'),title:document.querySelector('[data-file-link]').title},resourceSrcs:[...document.images].map(i=>i.getAttribute('src'))}));
 const btn=p.locator('.menu-toggle');await btn.click();const menuOpen=await p.evaluate(()=>({expanded:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),visible:getComputedStyle(document.querySelector('.primary-nav')).display}));
 await p.locator('.primary-nav.is-open a[href="#projects"]').click();await p.waitForTimeout(1800);const sectionTop=await p.locator('#projects').evaluate(e=>Math.round(e.getBoundingClientRect().top));
 const fileLogs={errors,warnings,bad};
 const q=await b.newPage({viewport:{width:768,height:1000}});const subErrors=[];q.on('console',m=>{if(m.type()==='error'||m.type()==='warning')subErrors.push(`${m.type()}: ${m.text()}`)});q.on('requestfailed',r=>subErrors.push(`failed: ${r.url()}`));
 const responses=[];q.on('response',r=>responses.push({status:r.status(),url:r.url()}));await q.goto('http://127.0.0.1:8001/outputs/projects/autopump.html',{waitUntil:'networkidle'});await q.goto('http://127.0.0.1:8001/outputs/projects/stm32-throttle-control.html',{waitUntil:'networkidle'});
 const subpath={errors:subErrors,failedResponses:responses.filter(x=>x.status>=400),resources:responses.map(x=>`${x.status} ${new URL(x.url).pathname}`)};
 console.log(JSON.stringify({fileState,menuOpen,projectAnchorTop:sectionTop,fileLogs,subpath},null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});

