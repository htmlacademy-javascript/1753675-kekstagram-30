import { isEscapeKey, onOverlayClick } from './utils.js';
import { renderComments, removeCommentsLoader } from './comments.js';

const fullSizePhotoElement = document.querySelector('.big-picture');
const fullSizePhotoImage = fullSizePhotoElement.querySelector('.big-picture__img img');
const likesCount = fullSizePhotoElement.querySelector('.likes-count');
const photoDescription = fullSizePhotoElement.querySelector('.social__caption');
const picturesContainer = document.querySelector('.pictures');
const fullSizePhotoCloseButton = fullSizePhotoElement.querySelector('.big-picture__cancel');
const commentsTotalCount = document.querySelector('.social__comment-total-count');
let isFullSizePhotoOpen = false;

const closeFullSizePhotoModal = () => {
  fullSizePhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeDocumentHandler();
  removeCommentsLoader();
  fullSizePhotoElement.removeEventListener('click', onPhotoOverlayClick);
  isFullSizePhotoOpen = false;
};

const onCloseButtonClick = () => {
  closeFullSizePhotoModal();
};

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeFullSizePhotoModal();
    removeDocumentHandler();
  }
};

const openFullSizePhotoModal = ({ url, description, likes, comments }) => {
  if (isFullSizePhotoOpen) {
    removeDocumentHandler();
  }

  fullSizePhotoImage.src = url;
  fullSizePhotoImage.alt = description;
  photoDescription.textContent = description;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;
  renderComments(comments);
  fullSizePhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullSizePhotoCloseButton.addEventListener('click', onCloseButtonClick);
  document.body.addEventListener('keydown', onDocumentKeydown);
  fullSizePhotoElement.addEventListener('click', onPhotoOverlayClick);
  isFullSizePhotoOpen = true;
};

const onThumbnailClick = (array) => {
  picturesContainer.addEventListener('click', (event) => {
    const thumbnailLink = event.target.closest('a.picture');

    if (thumbnailLink) {
      event.preventDefault();
      const thumbnailIndex = array[thumbnailLink.dataset.index];

      if (thumbnailIndex) {
        openFullSizePhotoModal(thumbnailIndex);
      }
    }
  });
};

function onPhotoOverlayClick (event) {
  onOverlayClick(event, closeFullSizePhotoModal);
}

function removeDocumentHandler () {
  document.body.removeEventListener('keydown', onDocumentKeydown);
}

export { onThumbnailClick};
