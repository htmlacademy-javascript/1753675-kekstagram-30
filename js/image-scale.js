import { uploadImagePreview } from './form.js';

const scaleControlValue = document.querySelector('.scale__control--value');

const scaleOptions = {
  defaultScale: 100,
  minScale: 25,
  maxScale: 100,
  step: 25
};

let scaleValue = scaleOptions.defaultScale;

const updateScaleStyle = () => {
  scaleControlValue.value = `${scaleValue}%`;
  uploadImagePreview.style.transform = `scale(${scaleValue / scaleOptions.maxScale})`;
};

const handleScaleDecrease = () => {
  if (scaleValue > scaleOptions.minScale) {
    scaleValue -= scaleOptions.step;
    updateScaleStyle();
  }
};

const handleScaleIncrease = () => {
  if (scaleValue < scaleOptions.maxScale) {
    scaleValue += scaleOptions.step;
    updateScaleStyle();
  }
};

const resetScale = () => {
  if (scaleValue < scaleOptions.maxScale) {
    scaleValue = scaleOptions.defaultScale;
    updateScaleStyle();
  }
};

export { handleScaleDecrease, handleScaleIncrease, resetScale };
