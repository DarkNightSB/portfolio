# Huynh Tri Hieu — Portfolio

A static portfolio built with plain HTML, CSS, and JavaScript. It has no build step and can be hosted on GitHub Pages.

## Run locally

From this directory, start a static server:

```sh
python -m http.server 8000
```

Open <http://localhost:8000>. To stop the server, press `Ctrl+C` in the terminal.

## Deploy to GitHub Pages

1. Create a GitHub repository for the site.
2. Add the contents of this folder to the repository root, including `.nojekyll`.
3. Commit and push the files to the `main` branch.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select **main** and **/(root)**, then save.
7. Wait for the Pages deployment and open the URL shown in the Pages settings. Relative asset and project links support deployment under a repository subpath.

## Files to add

- `assets/images/profile.jpg` — square display portrait; `profile-original.jpg` preserves the uncropped source dimensions.
- `assets/images/autopump.jpg` — AutoPump project image.
- `assets/images/autopump-architecture.png` — AutoPump system architecture image.
- `assets/images/stm32-throttle-control.jpg` — STM32 project image.
- `assets/images/certs/embedded-software-hardware-architecture.png` — certificate image.
- `assets/images/certs/automotive-cybersecurity-21434.jpg` — certificate image.
- `assets/images/certs/sensors-sensor-circuit-design.jpg` — certificate image.
- `assets/files/Huynh-Tri-Hieu-CV.pdf` — downloadable CV.

Image placeholders are shown until the corresponding image is enabled in the page markup. The CV download is disabled by default.

When you add the CV PDF, change the CV link's `data-available` value in `index.html` to `true` to enable the download. Its path is held in `data-href` until enabled, so the missing file is not a dead link or browser request.

When you add an image, set that image element's `data-available` value to `true`. This keeps missing optional assets from generating 404 messages in the browser console while preserving the placeholder. The AutoPump architecture image link is enabled when its image loads.
