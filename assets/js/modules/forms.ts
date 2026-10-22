export function init(): void {
  document.querySelectorAll<HTMLFormElement>('form[data-netlify]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const success = form.querySelector<HTMLElement>('[data-form-success]');
      const error = form.querySelector<HTMLElement>('[data-form-error]');
      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();

      if (button) {
        button.disabled = true;
      }

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });
        if (!response.ok) {
          throw new Error(`Form submission failed with ${response.status}`);
        }
        form.reset();
        if (success) success.hidden = false;
        if (error) error.hidden = true;
      } catch {
        if (error) error.hidden = false;
        if (success) success.hidden = true;
      } finally {
        if (button) {
          button.disabled = false;
        }
      }
    });
  });
}
