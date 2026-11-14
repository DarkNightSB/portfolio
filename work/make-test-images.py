from PIL import Image
from pathlib import Path
root = Path(r'C:\Users\hieuh\Documents\Codex\2026-10-21\files-pasted-by-the-user-t\outputs\assets\images')
files = {'profile.jpg': ((400,600),(45,95,160)), 'autopump.jpg': ((800,450),(50,125,110)), 'stm32-throttle-control.jpg': ((900,500),(140,85,45)), 'certs/embedded-software-hardware-architecture.jpg': ((700,450),(95,80,150)), 'certs/automotive-cybersecurity-21434.jpg': ((700,450),(65,115,150)), 'certs/sensors-sensor-circuit-design.jpg': ((700,450),(125,95,60))}
for name,(size,color) in files.items(): Image.new('RGB',size,color).save(root/name,quality=90)
