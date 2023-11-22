import { uploadImagePreview } from './form.js';

const scaleControlValue = document.querySelector('.scale__control--value');

const ScaleOptions = {
  defaultScale: 100,
  minScale: 25,
  maxScale: 100,
  step: 25
};

let scaleValue = ScaleOptions.defaultScale;

const updateScaleStyle = () => {
  // Обновляем стили и применяем масштаб к изображению
  scaleControlValue.value = `${scaleValue}%`;
  uploadImagePreview.style.transform = `scale(${scaleValue / ScaleOptions.maxScale})`;
};

// Уменьшаем масштаб
const onScaleDown = () => {
  if (scaleValue > ScaleOptions.minScale) {
    scaleValue -= ScaleOptions.step;
    updateScaleStyle();
  }
};

// Увеличиваем масштаб
const onScaleUp = () => {
  if (scaleValue < ScaleOptions.maxScale) {
    scaleValue += ScaleOptions.step;
    updateScaleStyle();
  }
};

const resetScale = () => {
  if (scaleValue < ScaleOptions.maxScale) {
    scaleValue = ScaleOptions.defaultScale;
    updateScaleStyle();
  }
};

export { onScaleDown, onScaleUp, resetScale };
