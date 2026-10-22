let index = 0;
let touchStart = null;

const links = function () {
  return Array.from(document.querySelectorAll('a[data-lightbox]'));
};

const dialog = function () {
  return document.getElementById('lightbox');
};

const placeholder = function (link) {
  const match = link.querySelector('img')?.style.backgroundImage.match(/url\(["']?(data:[^"')]+)/);
  return match ? match[1] : '';
};

const fit = function (stage, width, height) {
  if (width && height) {
    stage.style.aspectRatio = `${width} / ${height}`;
    stage.style.width = `min(${width}px, calc(100vw - 2rem), calc((100dvh - 8rem) * ${width / height}))`;
  } else {
    stage.style.aspectRatio = '';
    stage.style.width = '';
  }
};

const preload = function (list) {
  if (list.length < 2) {
    return;
  }
  [index - 1, index + 1].forEach(function (i) {
    new Image().src = list[(i + list.length) % list.length].href;
  });
};

const show = function (i) {
  const box = dialog();
  const list = links();
  if (!box || !list.length) {
    return;
  }
  index = (i + list.length) % list.length;
  const link = list[index];
  const stage = box.querySelector('[data-lightbox-stage]');
  const thumb = box.querySelector('[data-lightbox-thumb]');
  const old = box.querySelector('[data-lightbox-full]');
  const full = old.cloneNode(false);
  full.removeAttribute('src');
  full.removeAttribute('data-loaded');
  old.replaceWith(full);

  const width = Number(link.dataset.width) || 0;
  const height = Number(link.dataset.height) || 0;
  fit(stage, width, height);

  const lqip = placeholder(link);
  thumb.hidden = !lqip;
  if (lqip) {
    thumb.src = lqip;
  }

  full.alt = link.querySelector('img')?.alt || '';
  full.onload = function () {
    if (!full.isConnected) {
      return;
    }
    if (!width) {
      fit(stage, full.naturalWidth, full.naturalHeight);
    }
    full.dataset.loaded = '';
    preload(list);
  };
  full.src = link.href;

  const caption = box.querySelector('[data-lightbox-caption]');
  caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent.trim() || '';
  caption.hidden = !caption.textContent;

  box.querySelector('[data-lightbox-count]').textContent = list.length > 1 ? `${index + 1} / ${list.length}` : '';
  box.querySelectorAll('[data-lightbox-prev], [data-lightbox-next]').forEach(function (button) {
    button.hidden = list.length < 2;
  });

  if (!box.open) {
    box.showModal();
  }
};

export const init = function () {
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[data-lightbox]');
    if (link) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog()) {
        return;
      }
      event.preventDefault();
      show(links().indexOf(link));
      return;
    }

    const box = event.target.closest('#lightbox');
    if (!box) {
      return;
    }
    if (event.target.closest('[data-lightbox-prev]')) {
      show(index - 1);
    } else if (event.target.closest('[data-lightbox-next]')) {
      show(index + 1);
    } else if (event.target.closest('[data-lightbox-close]') || !event.target.closest('[data-lightbox-stage]')) {
      box.close();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (!dialog()?.open || links().length < 2) {
      return;
    }
    if (event.key === 'ArrowLeft') {
      show(index - 1);
    } else if (event.key === 'ArrowRight') {
      show(index + 1);
    }
  });

  document.addEventListener('touchstart', function (event) {
    const touch = event.touches[0];
    touchStart = event.touches.length === 1 && event.target.closest('#lightbox') ? {x: touch.clientX, y: touch.clientY} : null;
  }, {passive: true});

  document.addEventListener('touchend', function (event) {
    if (!touchStart) {
      return;
    }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (links().length < 2) {
        return;
      }
      show(index + (dx < 0 ? 1 : -1));
    } else if (dy > 80) {
      dialog().close();
    }
  }, {passive: true});

  document.addEventListener('turbo:before-cache', function () {
    if (dialog()?.open) {
      dialog().close();
    }
  });
};
