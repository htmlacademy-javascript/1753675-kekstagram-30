const effectsList = document.querySelector('.effects__list');
const effectLevelField = document.querySelector('.effect-level__value');
const uploadImagePreview = document.querySelector('.img-upload__preview > img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectConfig = {
  chrome: {
    style: 'grayscale',
    unit: '',
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1
    },
  },

  sepia: {
    style: 'sepia',
    unit: '',
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1
    },
  },

  marvin: {
    style: 'invert',
    unit: '%',
    sliderOptions: {
      min: 0,
      max: 100,
      step: 1
    },
  },

  phobos: {
    style: 'blur',
    unit: 'px',
    sliderOptions: {
      min: 0,
      max: 3,
      step: 0.1
    },
  },

  heat: {
    style: 'brightness',
    unit: '',
    sliderOptions: {
      min: 1,
      max: 3,
      step: 0.1
    },
  },
};

const resetEffect = () => {
  effectLevelField.value = 0;
  uploadImagePreview.style.filter = '';
  effectSliderContainer.classList.add('hidden');
};

const onEffectClick = (evt) => {
  if (evt.target.value === 'none') {
    resetEffect();
    return;
  }

  effectSliderContainer.classList.remove('hidden');

  const { style, unit, sliderOptions } = effectConfig[evt.target.value];

  noUiSlider.create(effectSlider, {
    range: {
      min: sliderOptions.min,
      max: sliderOptions.max
    },
    start: sliderOptions.max,
    step: sliderOptions.step,
    connect: 'lower'
  });

  effectSlider.noUiSlider.on('update', () => {
    uploadImagePreview.style.filter = `${style}(${effectSlider.noUiSlider.get()}${unit})`;
    effectLevelField.value = effectSlider.noUiSlider.get();
  });
};

const initializeEffectSlider = () => {
  effectSliderContainer.classList.add('hidden');
  effectsList.addEventListener('change', onEffectClick);
};

export {initializeEffectSlider, resetEffect};
