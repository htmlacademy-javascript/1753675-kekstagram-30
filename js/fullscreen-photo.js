import { isEscapeKey, handleOverlayClick } from './utils.js';
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
  removeCommentsLoader();
  removeDocumentHandler();
  fullSizePhotoElement.removeEventListener('click', photoElementClickHandler);
  isFullSizePhotoOpen = false;

};

const closeButtonClickHandler = () => {
  closeFullSizePhotoModal();
};

const documentKeydownHandler = (event) => {
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
  fullSizePhotoCloseButton.addEventListener('click', closeButtonClickHandler);
  document.body.addEventListener('keydown', documentKeydownHandler);
  fullSizePhotoElement.addEventListener('click', photoElementClickHandler);
  isFullSizePhotoOpen = true;
};

const setupThumbnailContainer = (array) => {
  const thumbnailClickHandler = (event) => {
    const thumbnailLink = event.target.closest('a.picture');

    if (thumbnailLink) {
      event.preventDefault();
      const thumbnailIndex = array[thumbnailLink.dataset.index];

      if (thumbnailIndex) {
        openFullSizePhotoModal(thumbnailIndex);
      }
    }
  };

  picturesContainer.addEventListener('click', thumbnailClickHandler);
};

function photoElementClickHandler (event) {
  handleOverlayClick(event, closeFullSizePhotoModal);
}

function removeDocumentHandler () {
  document.body.removeEventListener('keydown', documentKeydownHandler);
}

export { setupThumbnailContainer };
