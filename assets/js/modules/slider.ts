import KeenSlider, { type KeenSliderOptions } from 'keen-slider';

const options: Record<string, KeenSliderOptions> = {
  testimonials: {
    loop: true,
    slides: { origin: 'center', perView: 1.25, spacing: 16 },
    breakpoints: {
      '(min-width: 1024px)': {
        slides: { origin: 'auto', perView: 2.5, spacing: 32 },
      },
    },
  },
  images: {
    loop: true,
  },
};

export function init(): void {
  document.querySelectorAll<HTMLElement>('[data-slider]').forEach((container) => {
    const track = container.querySelector<HTMLElement>('[data-slider-track]');
    if (!track) {
      return;
    }
    const slider = new KeenSlider(track, options[container.dataset.slider ?? ''] ?? options.images);
    container.querySelector('[data-slider-prev]')?.addEventListener('click', () => slider.prev());
    container.querySelector('[data-slider-next]')?.addEventListener('click', () => slider.next());
  });
}
