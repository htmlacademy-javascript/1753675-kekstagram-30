import { isEscapeKey, showUploadSuccessMessage, showUploadFailureMessage, showDataErrorMessage } from './utils.js';
import { configureUploadForm, isValidForm, resetValidate } from './validation.js';
import { initializeEffectSlider, resetEffect } from './effects.js';
import { onScaleDown, onScaleUp, resetScale } from './image-scale.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadImageForm = document.querySelector('.img-upload__form');
const uploadInput = uploadImageForm.querySelector('.img-upload__input');
const overlayElement = uploadImageForm.querySelector('.img-upload__overlay');
const cancelButton = uploadImageForm.querySelector('.img-upload__cancel');
const uploadImagePreview = uploadImageForm.querySelector('.img-upload__preview > img');
const effectImagePreviews = uploadImageForm.querySelectorAll('.effects__preview');
const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');
const scaleControlSmaller = uploadImageForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadImageForm.querySelector('.scale__control--bigger');
const submitButton = uploadImageForm.querySelector('.img-upload__submit');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

const onImageUpload = () => {
  const file = uploadInput.files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (FILE_TYPES.includes(fileExtension)) {
    const reader = new FileReader();

    reader.onload = function () {
      uploadImagePreview.src = URL.createObjectURL(file);

      effectImagePreviews.forEach((preview) => {
        preview.style.backgroundImage = `url('${uploadImagePreview.src}')`;
      });
    };

    reader.readAsDataURL(file);
    overlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else {
    showDataErrorMessage('Выбран некорректный формат файла. Выберите файл в формате JPG, JPEG или PNG.');
  }
};

const closeImageEditor = () => {
  uploadImageForm.reset();
  resetScale();
  resetEffect();
  resetValidate();
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onCancelButtonClick = () => {
  closeImageEditor();
};

const onKeyDown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    const isCommentInputFocused = document.activeElement === commentInput;
    const isHashtagsInputFocused = document.activeElement === hashtagsInput;
    const isImageEditorClosable = !isCommentInputFocused && !isHashtagsInputFocused && !isErrorMessageExists();

    if (isImageEditorClosable) {
      closeImageEditor();
    }
  }
};

const sendForm = (event) => {
  if (isValidForm()) {
    toggleSubmitButton(true);
    const formData = new FormData(event.target);
    sendData(formData)
      .then(() => {
        showUploadSuccessMessage();
        closeImageEditor();
      })
      .catch(showUploadFailureMessage)
      .finally(() => toggleSubmitButton(false));
  }
};

const onFormSubmit = (event) => {
  event.preventDefault();
  sendForm(event);
};

const changeScaleImage = () => {
  scaleControlSmaller.addEventListener('click', onScaleDown);
  scaleControlBigger.addEventListener('click', onScaleUp);
};

const setupUploadImageForm = () => {
  uploadInput.addEventListener('change', onImageUpload);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onKeyDown);
  configureUploadForm(uploadImageForm, hashtagsInput, commentInput);
  uploadImageForm.addEventListener('submit', onFormSubmit);
  changeScaleImage();
  initializeEffectSlider();
};

export { setupUploadImageForm, uploadImagePreview };
