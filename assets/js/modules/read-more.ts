export function init(): void {
  document.querySelectorAll<HTMLDetailsElement>('details[data-read-more]').forEach((details) => {
    details.previousElementSibling?.classList.add('inline');
    const summary = details.querySelector('summary');
    details.addEventListener('toggle', () => {
      if (summary) {
        summary.hidden = details.open;
      }
    });
  });
}
