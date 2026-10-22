export function init(): void {
  const popup = document.querySelector<HTMLElement>('[data-popup]');
  if (!popup) {
    return;
  }

  setTimeout(() => {
    popup.hidden = false;
  }, 4000);

  popup.querySelector('[data-popup-close]')?.addEventListener('click', () => {
    popup.hidden = true;
  });
}
