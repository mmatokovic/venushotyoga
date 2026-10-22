export function init(): void {
  const menu = document.getElementById('mobile-menu');
  const opener = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!menu || !opener) {
    return;
  }

  const setOpen = (open: boolean): void => {
    menu.hidden = !open;
    opener.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('overflow-hidden', open);
    if (open) {
      menu.querySelector<HTMLElement>('[data-menu-close]')?.focus();
    } else {
      opener.focus();
    }
  };

  opener.addEventListener('click', () => setOpen(true));
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
    }
  });
}
