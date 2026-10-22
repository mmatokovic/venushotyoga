import KeenSlider, { type KeenSliderInstance, type KeenSliderOptions } from 'keen-slider';
import { onBeforeCache, onPageLoad } from './page';

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

let sliders: KeenSliderInstance[] = [];

const mount = (): void => {
  document.querySelectorAll<HTMLElement>('[data-slider]').forEach((container) => {
    const track = container.querySelector<HTMLElement>('[data-slider-track]');
    if (!track) {
      return;
    }
    const slider = new KeenSlider(track, options[container.dataset.slider ?? ''] ?? options.images);
    sliders.push(slider);
    container.querySelector('[data-slider-prev]')?.addEventListener('click', () => slider.prev());
    container.querySelector('[data-slider-next]')?.addEventListener('click', () => slider.next());
  });
};

const unmount = (): void => {
  sliders.forEach((slider) => slider.destroy());
  sliders = [];
};

export function init(): void {
  onPageLoad(mount);
  onBeforeCache(unmount);
}
