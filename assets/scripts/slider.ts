import KeenSlider from 'keen-slider'

const keenSlider = new KeenSlider(
  '#keen-slider',
  {
    loop: true,
    slides: {
      origin: 'center',
      perView: 1.25,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 1024px)': {
        slides: {
          origin: 'auto',
          perView: 2.5,
          spacing: 32,
        },
      },
    },
  },
  []
);

const keenSliderPrevious = document.getElementById('keen-slider-previous') as HTMLElement
const keenSliderNext = document.getElementById('keen-slider-next') as HTMLElement

keenSliderPrevious.addEventListener('click', () => keenSlider.prev())
keenSliderNext.addEventListener('click', () => keenSlider.next())
