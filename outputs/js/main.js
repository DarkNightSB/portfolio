(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }
  document.querySelectorAll('img[data-placeholder]').forEach(img => {
    const imageLink = img.closest('a[data-image-link], a[data-lightbox]');
    const showPlaceholder = () => {
      img.style.display = 'none';
      const box = document.querySelector(`[data-placeholder-box="${img.dataset.placeholder}"]`);
      if (box) box.style.display = 'flex';
      if (imageLink) {
        imageLink.dataset.available = 'false';
        imageLink.setAttribute('aria-disabled', 'true');
      }
    };
    const showImage = () => {
      img.style.display = 'block';
      const box = document.querySelector(`[data-placeholder-box="${img.dataset.placeholder}"]`);
      if (box) box.style.display = 'none';
      if (imageLink) {
        imageLink.dataset.available = 'true';
        imageLink.href = imageLink.dataset.href;
        imageLink.removeAttribute('aria-disabled');
        imageLink.removeAttribute('title');
      }
    };
    img.addEventListener('error', showPlaceholder);
    img.addEventListener('load', showImage);
    if (img.dataset.available === 'true') {
      img.style.display = 'block';
      img.src = img.dataset.src;
      if (img.complete && img.naturalWidth > 0) showImage();
    } else {
      showPlaceholder();
    }
  });
  document.querySelectorAll('a[data-image-link], a[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (link.getAttribute('aria-disabled') === 'true') event.preventDefault();
    });
  });
  const lightbox = document.querySelector('#photo-lightbox');
  if (lightbox) {
    const lightboxImage = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('figcaption');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let activeItems = [];
    let activeIndex = 0;
    let returnFocus = null;

    const showItem = index => {
      activeIndex = (index + activeItems.length) % activeItems.length;
      const link = activeItems[activeIndex];
      const thumbnail = link.querySelector('img');
      lightboxImage.src = link.dataset.href;
      lightboxImage.alt = thumbnail.alt;
      lightboxCaption.textContent = link.closest('figure').querySelector('figcaption').textContent;
      const showControls = activeItems.length > 1;
      lightbox.querySelector('.lightbox-previous').hidden = !showControls;
      lightbox.querySelector('.lightbox-next').hidden = !showControls;
    };

    document.querySelectorAll('a[data-lightbox]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        activeItems = [...document.querySelectorAll('a[data-lightbox]')].filter(item => {
          const image = item.querySelector('img');
          return item.dataset.available === 'true' && image && image.complete && image.naturalWidth > 0;
        });
        const index = activeItems.indexOf(link);
        if (index < 0) return;
        returnFocus = link;
        showItem(index);
        lightbox.showModal();
        closeButton.focus();
      });
    });

    lightbox.querySelector('.lightbox-previous').addEventListener('click', () => showItem(activeIndex - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => showItem(activeIndex + 1));
    closeButton.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' && activeItems.length > 1) {
        event.preventDefault();
        showItem(activeIndex - 1);
      } else if (event.key === 'ArrowRight' && activeItems.length > 1) {
        event.preventDefault();
        showItem(activeIndex + 1);
      } else if (event.key === 'Tab') {
        const controls = [...lightbox.querySelectorAll('button:not([hidden])')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    lightbox.addEventListener('close', () => {
      lightboxImage.removeAttribute('src');
      if (returnFocus && returnFocus.isConnected) returnFocus.focus();
    });
  }
  document.querySelectorAll('[data-file-link]').forEach(link => {
    if (link.dataset.available === 'true') {
      link.classList.remove('button-disabled');
      link.href = link.dataset.href;
      link.removeAttribute('aria-disabled');
      link.removeAttribute('title');
    } else {
      link.classList.add('button-disabled');
      link.setAttribute('aria-disabled', 'true');
      link.title = 'CV coming soon';
      link.addEventListener('click', event => event.preventDefault());
    }
  });
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();


