import { isEscapeKey, showUploadSuccessMessage, showUploadFailureMessage, showDataErrorMessage } from './utils.js';
import { configureUploadForm, isValidForm, resetValidate } from './validation.js';
import { initializeEffectSlider, resetEffect } from './effects.js';
import { handleScaleDecrease as scaleDecreaseHandler, handleScaleIncrease as scaleIncreaseHandler, resetScale } from './image-scale.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const imageUploadForm = document.querySelector('.img-upload__form');
const imageInput = imageUploadForm.querySelector('.img-upload__input');
const overlayElement = imageUploadForm.querySelector('.img-upload__overlay');
const cancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const uploadImagePreview = imageUploadForm.querySelector('.img-upload__preview > img');
const effectImagePreviews = imageUploadForm.querySelectorAll('.effects__preview');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');
const scaleDecreaseControl = imageUploadForm.querySelector('.scale__control--smaller');
const scaleIncreaseControl = imageUploadForm.querySelector('.scale__control--bigger');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

const imageInputUploadHandler = () => {
  const file = imageInput.files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (FILE_TYPES.includes(fileExtension)) {
    uploadImagePreview.src = URL.createObjectURL(file);

    effectImagePreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${uploadImagePreview.src}')`;
    });

    overlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else {
    showDataErrorMessage('Выбран некорректный формат файла. Выберите файл в формате JPG, JPEG или PNG.');
  }
};

const closeImageEditor = () => {
  imageUploadForm.reset();
  resetScale();
  resetEffect();
  resetValidate();
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('click', keyDownHandler);
};

const cancelButtonClickHandler = () => {
  closeImageEditor();
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

const imageFormSubmitHandler = (event) => {
  event.preventDefault();
  sendForm(event);
};

const changeImageScale = () => {
  scaleDecreaseControl.addEventListener('click', scaleDecreaseHandler);
  scaleIncreaseControl.addEventListener('click', scaleIncreaseHandler);
};

const setupImageUploadForm = () => {
  imageInput.addEventListener('change', imageInputUploadHandler);
  cancelButton.addEventListener('click', cancelButtonClickHandler);
  document.addEventListener('keydown', keyDownHandler);
  configureUploadForm(imageUploadForm, hashtagsInput, commentInput);
  imageUploadForm.addEventListener('submit', imageFormSubmitHandler);
  changeImageScale();
  initializeEffectSlider();
};

function keyDownHandler (event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    const isCommentInputFocused = document.activeElement === commentInput;
    const isHashtagsInputFocused = document.activeElement === hashtagsInput;
    const isImageEditorClosable = !isCommentInputFocused && !isHashtagsInputFocused && !isErrorMessageExists();

    if (isImageEditorClosable) {
      closeImageEditor();
    }
  }
}

export { setupImageUploadForm, uploadImagePreview };
