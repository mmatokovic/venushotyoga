const consentKey = 'analytics-consent';

const consented = (): boolean => {
  try {
    return localStorage.getItem(consentKey) === 'granted';
  } catch {
    return false;
  }
};

const load = (placeholder: HTMLElement, focus: boolean): void => {
  const iframe = document.createElement('iframe');
  iframe.src = placeholder.dataset.src ?? '';
  iframe.title = placeholder.dataset.title ?? '';
  iframe.className = 'absolute inset-0 h-full w-full border-0';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  placeholder.replaceWith(iframe);
  if (focus) {
    iframe.focus();
  }
};

export function init(): void {
  const placeholders = document.querySelectorAll<HTMLElement>('[data-map]');
  if (!placeholders.length) {
    return;
  }

  if (consented()) {
    placeholders.forEach((placeholder) => load(placeholder, false));
    return;
  }

  placeholders.forEach((placeholder) => {
    placeholder.querySelector('[data-map-load]')?.addEventListener('click', () => load(placeholder, true));
  });

  document.addEventListener('click', (event) => {
    if ((event.target as Element).closest('[data-consent="granted"]')) {
      document.querySelectorAll<HTMLElement>('[data-map]').forEach((placeholder) => load(placeholder, false));
    }
  });
}
