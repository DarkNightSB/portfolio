from pathlib import Path
root = Path(r'C:\Users\hieuh\Documents\Codex\2026-10-21\files-pasted-by-the-user-t\outputs\assets\images')
for name in ['profile.jpg','autopump.jpg','stm32-throttle-control.jpg','certs/embedded-software-hardware-architecture.jpg','certs/automotive-cybersecurity-21434.jpg','certs/sensors-sensor-circuit-design.jpg']:
    p = root / name
    if p.exists(): p.unlink()
