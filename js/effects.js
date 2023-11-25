const effectsList = document.querySelector('.effects__list');
const uploadImagePreview = document.querySelector('.img-upload__preview > img');
const effectSliderContainer = document.querySelector('.effect-level');
const effectSliderElement = effectSliderContainer.querySelector('.effect-level__slider');
const effectLevelField = effectSliderContainer.querySelector('.effect-level__value');

const EffectConfig = {
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

const initialSliderOptions = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
};

let activeSlider = null;

const resetEffect = () => {
  effectLevelField.value = 0;
  uploadImagePreview.style.filter = '';
  effectSliderContainer.classList.add('hidden');
};

const effectSelectionHandler = (event) => {
  if (event.target.value === 'none') {
    resetEffect();
    return;
  }

  effectSliderContainer.classList.remove('hidden');
  const { style, unit, sliderOptions } = EffectConfig[event.target.value];

  if (activeSlider) {
    activeSlider.updateOptions({
      range: {
        min: sliderOptions.min,
        max: sliderOptions.max
      },
      start: sliderOptions.max,
      step: sliderOptions.step
    });

    activeSlider.on('update', () => {
      uploadImagePreview.style.filter = `${style}(${activeSlider.get()}${unit})`;
      effectLevelField.value = Number(activeSlider.get());
    });
  }
};

const initializeEffectSlider = () => {
  effectSliderContainer.classList.add('hidden');
  effectsList.addEventListener('change', effectSelectionHandler);

  if (!activeSlider) {
    activeSlider = noUiSlider.create(effectSliderElement, initialSliderOptions);
  }
};

export { initializeEffectSlider, resetEffect };
