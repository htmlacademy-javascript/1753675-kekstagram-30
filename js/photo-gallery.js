import { setupThumbnailContainer } from './fullscreen-photo.js';

const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (array, isSkipThumbnailContainerSetup) => {
  const thumbnailFragment = document.createDocumentFragment();

  array.forEach(({ url, description, likes, comments, id }) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const thumbnailPicture = thumbnailElement.querySelector('.picture__img');
    const thumbnailLikes = thumbnailElement.querySelector('.picture__likes');
    const thumbnailComments = thumbnailElement.querySelector('.picture__comments');
    thumbnailPicture.src = url;
    thumbnailPicture.alt = description;
    thumbnailLikes.textContent = likes;
    thumbnailComments.textContent = comments.length;
    thumbnailElement.setAttribute('data-index', id);
    thumbnailFragment.append(thumbnailElement);
  });

  picturesContainer.append(thumbnailFragment);

  if (!isSkipThumbnailContainerSetup) {
    setupThumbnailContainer(array);
  }
};

export { renderThumbnails };
