from pathlib import Path
root=Path(r'C:\Users\hieuh\Documents\Codex\2026-10-21\files-pasted-by-the-user-t\outputs')
for p in [root/'index.html',root/'projects/autopump.html',root/'projects/stm32-throttle-control.html']:
    s=p.read_text(encoding='utf-8-sig').replace('Huynh Tri Hieu','Huỳnh Trí Hiếu')
    s=s.replace('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap&subset=latin,vietnamese')
    marker='  <link rel="stylesheet" href="css/style.css">' if p.name=='index.html' else '  <link rel="stylesheet" href="../css/style.css">'
    mono='  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap&subset=latin" rel="stylesheet">\n'
    s=s.replace(marker,mono+marker)
    if p.name=='index.html':
        s=s.replace('          <h1>Huỳnh Trí Hiếu</h1>','          <p class="availability-badge"><span aria-hidden="true"></span>Open to internship · Embedded Automotive Software</p>\n          <h1>Huỳnh Trí Hiếu</h1>')
        s=s.replace('<span class="activity-mark" aria-hidden="true">↗</span>', '<span class="activity-mark" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M6 21V3m0 1h14v10H6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 4h3v3H7zm6 0h3v3h-3zm6 0h1v3h-1zM10 7h3v3h-3zm6 0h3v3h-3z" fill="currentColor"/></svg></span>')
    p.write_text(s,encoding='utf-8')
