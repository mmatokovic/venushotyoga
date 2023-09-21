import KeenSlider from 'keen-slider'

const imageSlider = new KeenSlider(
  '#image-keen-slider',
  {
    loop: true,
  },
);

const keenSliderPrevious = document.getElementById('keen-slider-previous') as HTMLElement
const keenSliderNext = document.getElementById('keen-slider-next') as HTMLElement

keenSliderPrevious.addEventListener('click', () => imageSlider.prev())
keenSliderNext.addEventListener('click', () => imageSlider.next())