import { isEscapeKey, onOverlayClick } from './utils.js';
import { renderComments, removeCommentsLoader } from './comments.js';

// Получение ссылок на элементы
const fullSizePhotoElement = document.querySelector('.big-picture');
const fullSizePhotoImage = fullSizePhotoElement.querySelector('.big-picture__img img');
const likesCount = fullSizePhotoElement.querySelector('.likes-count');
const photoDescription = fullSizePhotoElement.querySelector('.social__caption');
const picturesContainer = document.querySelector('.pictures');
const fullSizePhotoCloseButton = fullSizePhotoElement.querySelector('.big-picture__cancel');
const commentsTotalCount = document.querySelector('.social__comment-total-count');
let isFullSizePhotoOpen = false; // Флаг для проверки открыто ли модальное окно

// Закрываем полноразмерное фото
const closeFullSizePhotoModal = () => {
  fullSizePhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open'); // Удаляем класс для блокировки прокрутки страницы
  removeDocumentHandler();
  removeCommentsLoader();
  fullSizePhotoElement.removeEventListener('click', onPhotoOverlayClick);
  isFullSizePhotoOpen = false;
};

const onCloseButtonClick = () => {
  closeFullSizePhotoModal();
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

  fullSizePhotoImage.src = url;
  fullSizePhotoImage.alt = description;
  photoDescription.textContent = description;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;
  renderComments(comments); // Отрисовываем комментарии передавая в качестве аргумента массив данных
  fullSizePhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open'); // Добавляем класс для блокировки прокрутки страницы
  fullSizePhotoCloseButton.addEventListener('click', onCloseButtonClick);
  document.body.addEventListener('keydown', onDocumentKeydown);
  fullSizePhotoElement.addEventListener('click', onPhotoOverlayClick);
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
