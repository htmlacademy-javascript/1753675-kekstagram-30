import {isEscapeKey} from './utils.js';

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadInput = uploadImageForm.querySelector('.img-upload__input');
const overlay = uploadImageForm.querySelector('.img-upload__overlay');
const cancelButton = uploadImageForm.querySelector('.img-upload__cancel');
const uploadImagePreview = document.querySelector('.img-upload__preview > img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const handleImageUpload = () => {
  const reader = new FileReader();
  reader.onload = function (evt) {
    uploadImagePreview.src = evt.target.result;
  };
  reader.readAsDataURL(uploadInput.files[0]);
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeImageEditor = () => {
  uploadImageForm.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const setupUploadImageForm = () => {
  uploadInput.addEventListener('change', handleImageUpload);
  cancelButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeImageEditor();
    }
  });
};

const changeScaleImage = () => {
  let scaleValue = 100;

  const updateScaleStyle = () => {
    scaleControlValue.value = `${scaleValue}%`;
    uploadImagePreview.style.transform = `scale(${scaleValue / 100})`;
  };

  const scaleDown = () => {
    if (scaleValue > 25) {
      scaleValue -= 25;
      updateScaleStyle();
    }
  };

  const scaleUp = () => {
    if (scaleValue < 100) {
      scaleValue += 25;
      updateScaleStyle();
    }
  };

  scaleControlSmaller.addEventListener('click', scaleDown);
  scaleControlBigger.addEventListener('click', scaleUp);
};

export {setupUploadImageForm, changeScaleImage};
