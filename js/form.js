import {isEscapeKey} from './utils.js';

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadInput = uploadImageForm.querySelector('.img-upload__input');
const overlay = uploadImageForm.querySelector('.img-upload__overlay');
const cancelButton = uploadImageForm.querySelector('.img-upload__cancel');

const handleImageUpload = () => {
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

export {setupUploadImageForm};
