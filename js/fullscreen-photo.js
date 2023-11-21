import { isEscapeKey, onOverlayClick } from './utils.js';
import { renderComments } from './comments.js';

// Получение ссылок на элементы
const fullSizePhoto = document.querySelector('.big-picture');
const fullSizePhotoImg = fullSizePhoto.querySelector('.big-picture__img img');
const likesCount = fullSizePhoto.querySelector('.likes-count');
const photoDescription = fullSizePhoto.querySelector('.social__caption');
const picturesContainer = document.querySelector('.pictures');
const fullSizePhotoCloseBtn = fullSizePhoto.querySelector('.big-picture__cancel');
const commentsTotalCount = document.querySelector('.social__comment-total-count');
let isFullSizePhotoOpen = false; // Флаг для проверки открыто ли модальное окно

// Закрываем полноразмерное фото
const closeFullSizePhotoModal = () => {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('modal-open'); // Удаляем класс для блокировки прокрутки страницы
  removeDocumentHandler();
  fullSizePhoto.removeEventListener('click', onPhotoOverlayClick);
  isFullSizePhotoOpen = false;
};

// Обрабатываем событие нажатия клавиши на документе
const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) { // Проверяем является ли нажатая клавиша Escape
    event.preventDefault();
    closeFullSizePhotoModal();
    removeDocumentHandler();
  }
};

// Открываем полноразмерное фото, передавая объект с данными изображения
const openFullSizePhotoModal = ({ url, description, likes, comments }) => {
  if (isFullSizePhotoOpen) {
    removeDocumentHandler();
  }

  fullSizePhotoImg.src = url;
  fullSizePhotoImg.alt = description;
  photoDescription.textContent = description;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;
  renderComments(comments); // Отрисовываем комментарии передавая в качестве аргумента массив данных
  fullSizePhoto.classList.remove('hidden');
  document.body.classList.add('modal-open'); // Добавляем класс для блокировки прокрутки страницы
  fullSizePhotoCloseBtn.addEventListener('click', closeFullSizePhotoModal);
  document.body.addEventListener('keydown', onDocumentKeydown);
  fullSizePhoto.addEventListener('click', onPhotoOverlayClick);
  isFullSizePhotoOpen = true;
};

// Обрабатываем событие клика на миниатюрах
const onThumbnailClick = (array) => {
  picturesContainer.addEventListener('click', (event) => {
    const thumbnailLink = event.target.closest('a.picture'); // Ищем ближайший родительский элемент по селектору

    if (thumbnailLink) {
      event.preventDefault();
      const thumbnailIndex = array[thumbnailLink.dataset.index]; // Получаем объект по атрибуту data-index

      if (thumbnailIndex) {
        openFullSizePhotoModal(thumbnailIndex);
      }
    }
  });
};

function onPhotoOverlayClick (event) {
  onOverlayClick(event, closeFullSizePhotoModal);
}

// Удаляем обработчик нажатия клавиши с document
function removeDocumentHandler () {
  document.body.removeEventListener('keydown', onDocumentKeydown);
}

export { onThumbnailClick};
