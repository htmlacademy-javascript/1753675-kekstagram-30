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

// Обрабатываем событие нажатия клавиши на документе
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) { // Проверяем является ли нажатая клавиша Escape
    evt.preventDefault();
    closeFullSizePhotoModal();
  }
};

// Закрываем полноразмерное фото
const closeFullSizePhotoModal = () => {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('modal-open'); // Удаляем класс для блокировки прокрутки страницы
  document.body.removeEventListener('keydown', onDocumentKeydown);
};

// Открываем полноразмерное фото, передавая объект с данными изображения
const openFullSizePhotoModal = (data) => {
  fullSizePhoto.classList.remove('hidden');
  fullSizePhotoImg.src = data.url;
  photoDescription.textContent = data.description;
  likesCount.textContent = data.likes;
  commentsShownCount.textContent = data.comments.length;
  commentsTotalCount.textContent = data.comments.length;
  renderComments(data.comments); // Отрисовываем комментарии передавая в качестве аргумента массив данных
  document.body.classList.add('modal-open'); // Добавляем класс для блокировки прокрутки страницы
  fullSizePhotoCloseBtn.addEventListener('click', closeFullSizePhotoModal);
  document.body.addEventListener('keydown', onDocumentKeydown);
};

// Обрабатываем событие клика на миниатюрах
const onThumbnailClick = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnailLink = evt.target.closest('a.picture'); // Ищем ближайший родительский элемент по селектору
    if (thumbnailLink) {
      evt.preventDefault();
      const thumbnailIndex = data[thumbnailLink.dataset.index]; // Получаем индекс миниатюры из атрибута data-index
      if (thumbnailIndex) {
        openFullSizePhotoModal(thumbnailIndex);
      }
    }
  });
};

export {onThumbnailClick};
