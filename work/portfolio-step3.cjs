const { chromium } = require('playwright');
const path = require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const pages=[['index','/index.html'],['autopump','/projects/autopump.html'],['stm32-throttle-control','/projects/stm32-throttle-control.html']];
 const report=[];
 for(const [name,url] of pages) for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const issues=[];
  page.on('console',m=>{if(['error','warning'].includes(m.type()))issues.push(`console ${m.type()}: ${m.text()}`)});
  page.on('pageerror',e=>issues.push(`pageerror: ${e.message}`));
  page.on('requestfailed',r=>issues.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  page.on('response',r=>{if(r.status()>=400)issues.push(`http ${r.status()}: ${r.url()}`)});
  await page.goto(`http://127.0.0.1:8000${url}`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:path.join(__dirname,'..','screenshots','step3',`${name}-${width}.png`),fullPage:true});
  const state=await page.evaluate(()=>({title:document.title,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,fonts:document.fonts.status,menu:!!document.querySelector('.menu-toggle'),svg:!!document.querySelector('.architecture-svg'),autopumpFigure:!!document.querySelector('.autopump-architecture-figure')}));
  report.push({name,width,state,issues});
  await page.close();
 }
 await browser.close(); console.log(JSON.stringify(report,null,2));
})();
