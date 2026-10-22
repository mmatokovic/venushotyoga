export function onPageLoad(callback: () => void): void {
  if ('Turbo' in window) {
    document.addEventListener('turbo:load', callback);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

export function onBeforeCache(callback: () => void): void {
  document.addEventListener('turbo:before-cache', callback);
}
