export function init(): void {
  document.querySelectorAll<HTMLElement>('[data-map]').forEach((placeholder) => {
    placeholder.querySelector('[data-map-load]')?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = placeholder.dataset.src ?? '';
      iframe.title = placeholder.dataset.title ?? '';
      iframe.className = 'absolute inset-0 h-full w-full border-0';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      placeholder.replaceWith(iframe);
      iframe.focus();
    });
  });
}
