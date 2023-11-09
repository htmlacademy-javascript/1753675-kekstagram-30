import {isEscapeKey} from './utils.js';
import {configureUploadForm, isValidForm, resetValidate} from './validation.js';

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
  }
};

// Управляем масштабом загруженного изображения
const changeScaleImage = () => {
  // Инициализируем начальное значение масштаба
  let scaleValue = 100;

  const updateScaleStyle = () => {
    // Обновляем стили и применяем масштаб к изображению
    scaleControlValue.value = `${scaleValue}%`;
    uploadImagePreview.style.transform = `scale(${scaleValue / 100})`;
    // Передаём значение масштаба в форму
    scaleControlValue.value = `${scaleValue}%`;
  };

  // Уменьшаем масштаб
  const scaleDown = () => {
    if (scaleValue > 25) {
      scaleValue -= 25;
      updateScaleStyle();
    }
  };

  // Увеличиваем масштаб
  const scaleUp = () => {
    if (scaleValue < 100) {
      scaleValue += 25;
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
};

export {setupUploadImageForm};
