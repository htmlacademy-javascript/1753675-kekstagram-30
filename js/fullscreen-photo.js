import {isEscapeKey} from './utils.js';

// Получение ссылок на элементы
const fullSizePhoto = document.querySelector('.big-picture');
const fullSizePhotoImg = fullSizePhoto.querySelector('.big-picture__img img');
const likesCount = fullSizePhoto.querySelector('.likes-count');
const commentsShownCount = fullSizePhoto.querySelector('.social__comment-shown-count');
const commentsTotalCount = fullSizePhoto.querySelector('.social__comment-total-count');
const commentsList = fullSizePhoto.querySelector('.social__comments');
const photoDescription = fullSizePhoto.querySelector('.social__caption');
const picturesContainer = document.querySelector('.pictures');
const fullSizePhotoCloseBtn = fullSizePhoto.querySelector('.big-picture__cancel');

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
  commentsList.innerHTML = '';

  // отрисовку комментариев нужно вынести в отдельный модуль
  data.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentItem.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="" width="35" height="35">
    <p class="social__text">${comment.message}</p>`;
    commentsList.appendChild(commentItem);
  });
  // Скрываем счетчик комментариев и кнопку загрузки новых комментариев
  const commentCount = fullSizePhoto.querySelector('.social__comment-count');
  const commentsLoader = fullSizePhoto.querySelector('.comments-loader');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

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
