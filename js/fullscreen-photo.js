import {isEscapeKey} from './utils.js';
import {renderComments} from './comments.js';

// Получение ссылок на элементы
const fullSizePhoto = document.querySelector('.big-picture');
const fullSizePhotoImg = fullSizePhoto.querySelector('.big-picture__img img');
const likesCount = fullSizePhoto.querySelector('.likes-count');
const photoDescription = fullSizePhoto.querySelector('.social__caption');
const picturesContainer = document.querySelector('.pictures');
const fullSizePhotoCloseBtn = fullSizePhoto.querySelector('.big-picture__cancel');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const commentsTotalCount = document.querySelector('.social__comment-total-count');
let isFullSizePhotoOpen = false; // Флаг для проверки открыто ли модальное окно

// Закрываем полноразмерное фото
const closeFullSizePhotoModal = () => {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('modal-open'); // Удаляем класс для блокировки прокрутки страницы
  removeKeydownHandler();
  isFullSizePhotoOpen = false;
};

// Обрабатываем событие нажатия клавиши на документе
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) { // Проверяем является ли нажатая клавиша Escape
    evt.preventDefault();
    closeFullSizePhotoModal();
    removeKeydownHandler();
  }
};

// Открываем полноразмерное фото, передавая объект с данными изображения
const openFullSizePhotoModal = ({url, description, likes, comments}) => {
  if (isFullSizePhotoOpen) {
    removeKeydownHandler();
  }

  fullSizePhotoImg.src = url;
  photoDescription.textContent = description;
  likesCount.textContent = likes;
  commentsShownCount.textContent = comments.length;
  commentsTotalCount.textContent = comments.length;
  renderComments(comments); // Отрисовываем комментарии передавая в качестве аргумента массив данных
  fullSizePhoto.classList.remove('hidden');
  document.body.classList.add('modal-open'); // Добавляем класс для блокировки прокрутки страницы
  fullSizePhotoCloseBtn.addEventListener('click', closeFullSizePhotoModal);
  document.body.addEventListener('keydown', onDocumentKeydown);
  isFullSizePhotoOpen = true;
};

// Обрабатываем событие клика на миниатюрах
const onThumbnailClick = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnailLink = evt.target.closest('a.picture'); // Ищем ближайший родительский элемент по селектору

    if (thumbnailLink) {
      evt.preventDefault();
      const thumbnailIndex = data[thumbnailLink.dataset.index]; // Получаем объект по атрибуту data-index

      if (thumbnailIndex) {
        openFullSizePhotoModal(thumbnailIndex);
      }
    }
  });
};

// Удаляем обработчик нажатия клавиши с document
function removeKeydownHandler () {
  document.body.removeEventListener('keydown', onDocumentKeydown);
}

export {onThumbnailClick};
