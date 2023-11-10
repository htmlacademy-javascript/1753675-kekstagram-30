import {isEscapeKey} from './utils.js';
import {configureUploadForm, isValidForm, resetValidate} from './validation.js';
import {initializeEffectSlider, resetEffect} from './effects.js';

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadInput = uploadImageForm.querySelector('.img-upload__input');
const overlay = uploadImageForm.querySelector('.img-upload__overlay');
const cancelButton = uploadImageForm.querySelector('.img-upload__cancel');
const uploadImagePreview = uploadImageForm.querySelector('.img-upload__preview > img');
const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');
const scaleControlValue = uploadImageForm.querySelector('.scale__control--value');
const scaleControlSmaller = uploadImageForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadImageForm.querySelector('.scale__control--bigger');

// Обрабатываем загрузку изображения
const handleImageUpload = () => {
// Создаём через конструктор экземпляр FileReader
  const reader = new FileReader();

  reader.onload = function (evt) {
    // Устанавливаем полученный URL в качестве источника изображения
    uploadImagePreview.src = evt.target.result;
  };

  // Читаем данные файла в формате Data URL
  reader.readAsDataURL(uploadInput.files[0]);
  // Показываем оверлей и добавляем класс к элементу body для отображения модального окна
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Закрываем окно редактора изображения
const closeImageEditor = () => {
  // Сбрасываем значения и состояние формы редактирования
  uploadImageForm.reset();
  resetEffect();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Обрабатываем нажатие Esca
const handleKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // Проверяем, не находится ли фокус на поле ввода комментария или хэштега
    const isCommentInputFocused = document.activeElement === commentInput;
    const isHashtagsInputFocused = document.activeElement === hashtagsInput;

    // Если фокус не находится на поле ввода комментария или хэштега, закрываем редактор изображения
    if (!isCommentInputFocused && !isHashtagsInputFocused) {
      closeImageEditor();
    }
  }
};

const handleSubmitForm = (evt) => {
  evt.preventDefault();

  // Проверяем валидна ли форма
  if (isValidForm()) {
    // Если форма валидна, можно отправить данные
    uploadImageForm.submit();
    // Сбрасываем валидацию формы
    resetValidate();
    resetEffect();
  }
};

// Управляем масштабом загруженного изображения
const changeScaleImage = () => {
  const ScaleOptions = {
    currentScale: 100,
    minScale: 25,
    maxScale: 100,
    step: 25
  };
  // Инициализируем начальное значение масштаба
  let scaleValue = ScaleOptions.currentScale;

  const updateScaleStyle = () => {
    // Обновляем стили и применяем масштаб к изображению
    scaleControlValue.value = `${scaleValue}%`;
    uploadImagePreview.style.transform = `scale(${scaleValue / ScaleOptions.maxScale})`;
  };

  // Уменьшаем масштаб
  const scaleDown = () => {
    if (scaleValue > ScaleOptions.minScale) {
      scaleValue -= ScaleOptions.step;
      updateScaleStyle();
    }
  };

  // Увеличиваем масштаб
  const scaleUp = () => {
    if (scaleValue < ScaleOptions.maxScale) {
      scaleValue += ScaleOptions.step;
      updateScaleStyle();
    }
  };

  // Навешиваем обработчики клика на кнопки
  scaleControlSmaller.addEventListener('click', scaleDown);
  scaleControlBigger.addEventListener('click', scaleUp);
};

// Настраиваем форму редактирования изображения
const setupUploadImageForm = () => {
  // Слушаем событие изменения значения инпута загрузки изображения
  uploadInput.addEventListener('change', handleImageUpload);
  // Слушаем событие клика на кнопку
  cancelButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', handleKeyDown);
  // Вызываем функцию для конфигурации формы валидации
  configureUploadForm(uploadImageForm, hashtagsInput, commentInput);
  // Слушаем событие отправки формы
  uploadImageForm.addEventListener('submit', handleSubmitForm);
  // Включаем управление масштабом изображения
  changeScaleImage();
  initializeEffectSlider();
};

export {setupUploadImageForm};
