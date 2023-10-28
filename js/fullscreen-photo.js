import {isEscapeKey} from './utils.js';

const fullSizePhoto = document.querySelector('.big-picture');
const fullSizePhotoImg = fullSizePhoto.querySelector('.big-picture__img img');
const likesCount = fullSizePhoto.querySelector('.likes-count');
const commentsShownCount = fullSizePhoto.querySelector('.social__comment-shown-count');
const commentsTotalCount = fullSizePhoto.querySelector('.social__comment-total-count');
const commentsList = fullSizePhoto.querySelector('.social__comments');
const photoDescription = fullSizePhoto.querySelector('.social__caption');
const picturesContainer = document.querySelector('.pictures');
const fullSizePhotoCloseBtn = fullSizePhoto.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhotoModal();
  }
};

const closeFullSizePhotoModal = () => {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', onDocumentKeydown);
};

const openFullSizePhotoModal = (dataItem) => {
  fullSizePhoto.classList.remove('hidden');
  fullSizePhotoImg.src = dataItem.url;
  photoDescription.textContent = dataItem.description;
  likesCount.textContent = dataItem.likes;
  commentsShownCount.textContent = dataItem.comments.length;
  commentsTotalCount.textContent = dataItem.comments.length;
  commentsList.innerHTML = '';

  // отрисовку комментариев нужно вынести в отдельный модуль
  dataItem.comments.forEach((comment) => {
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

  document.body.classList.add('modal-open');

  fullSizePhotoCloseBtn.addEventListener('click', closeFullSizePhotoModal);
  document.body.addEventListener('keydown', onDocumentKeydown);
};

const onThumbnailClick = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnailLink = evt.target.closest('a.picture');
    if (thumbnailLink) {
      evt.preventDefault();
      const thumbnailIndex = data[thumbnailLink.dataset.index];
      if (thumbnailIndex) {
        openFullSizePhotoModal(thumbnailIndex);
      }
    }
  });
};

export {onThumbnailClick};
