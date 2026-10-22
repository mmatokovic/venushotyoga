import { onPageLoad } from './page';

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

const loadAll = (): void => {
  document.querySelectorAll<HTMLElement>('[data-map]').forEach((placeholder) => load(placeholder, false));
};

export function init(): void {
  onPageLoad(() => {
    if (consented()) {
      loadAll();
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Element;
    const button = target.closest('[data-map-load]');
    if (button) {
      const placeholder = button.closest<HTMLElement>('[data-map]');
      if (placeholder) {
        load(placeholder, true);
      }
    } else if (target.closest('[data-consent="granted"]')) {
      loadAll();
    }
  });
}
