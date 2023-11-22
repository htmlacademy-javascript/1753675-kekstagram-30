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

// Переключаем состояние кнопки отправки формы
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

// Проверяем есть ли на странице сообщения об ошибках
const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

// Обрабатываем загрузку изображения
const onImageUpload = () => {
  const file = uploadInput.files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (FILE_TYPES.includes(fileExtension)) {
    // Создаём через конструктор экземпляр FileReader
    const reader = new FileReader();

    reader.onload = function () {
      // Устанавливаем полученный URL в качестве источника изображения
      uploadImagePreview.src = URL.createObjectURL(file);

      effectImagePreviews.forEach((preview) => {
        preview.style.backgroundImage = `url('${uploadImagePreview.src}')`;
      });
    };

    // Читаем данные файла в формате Data URL
    reader.readAsDataURL(file);
    // Показываем оверлей и добавляем класс к элементу body для отображения модального окна
    overlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else {
    showDataErrorMessage('Выбран некорректный формат файла. Выберите файл в формате JPG, JPEG или PNG.');
  }
};

// Закрываем окно редактора изображения
const closeImageEditor = () => {
  // Сбрасываем значения и состояние формы редактирования
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

// Обрабатываем нажатие Esca
const onKeyDown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    // Проверяем, не находится ли фокус на поле ввода комментария или хэштега
    const isCommentInputFocused = document.activeElement === commentInput;
    const isHashtagsInputFocused = document.activeElement === hashtagsInput;
    const isImageEditorClosable = !isCommentInputFocused && !isHashtagsInputFocused && !isErrorMessageExists();

    // Если фокус не находится на поле ввода комментария или хэштега, закрываем редактор изображения
    if (isImageEditorClosable) {
      closeImageEditor();
    }
  }
};

// Отправляем форму на сервер
const sendForm = (event) => {
  // Проверяем, прошла ли форма валидацию перед отправкой
  if (isValidForm()) {
    // Если форма валидна, отключаем кнопку отправки
    toggleSubmitButton(true);
    // Создаем объект FormData из целевого элемента события
    const formData = new FormData(event.target);
    // Отправляем данные формы на сервер
    sendData(formData)
      .then(() => {
        // Если отправка прошла успешно, показываем сообщение об успешной загрузке
        showUploadSuccessMessage();
        // Закрываем окно редактора изображения
        closeImageEditor();
      })
      // В случае ошибки показываем сообщение о неудачной загрузке
      .catch(showUploadFailureMessage)
      // В любом случае после попытки отправить форму включаем обратно кнопку отправки
      .finally(() => toggleSubmitButton(false));
  }
};

const onFormSubmit = (event) => {
  event.preventDefault();
  sendForm(event);
};

// Управляем масштабом загруженного изображения
const changeScaleImage = () => {
  // Навешиваем обработчики клика на кнопки
  scaleControlSmaller.addEventListener('click', onScaleDown);
  scaleControlBigger.addEventListener('click', onScaleUp);
};

// Настраиваем форму редактирования изображения
const setupUploadImageForm = () => {
  // Слушаем событие изменения значения инпута загрузки изображения
  uploadInput.addEventListener('change', onImageUpload);
  // Слушаем событие клика на кнопку
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onKeyDown);
  // Вызываем функцию для конфигурации формы валидации
  configureUploadForm(uploadImageForm, hashtagsInput, commentInput);
  // Слушаем событие отправки формы
  uploadImageForm.addEventListener('submit', onFormSubmit);
  // Включаем управление масштабом изображения
  changeScaleImage();
  initializeEffectSlider();
};

export { setupUploadImageForm, uploadImagePreview };
