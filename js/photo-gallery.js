import { setupThumbnailContainer } from './fullscreen-photo.js';

const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (array) => {
  const thumbnailFragment = document.createDocumentFragment();

  array.forEach(({ url, description, likes, comments }, index) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const thumbnailPicture = thumbnailElement.querySelector('.picture__img');
    const thumbnailLikes = thumbnailElement.querySelector('.picture__likes');
    const thumbnailComments = thumbnailElement.querySelector('.picture__comments');
    thumbnailPicture.src = url;
    thumbnailPicture.alt = description;
    thumbnailLikes.textContent = likes;
    thumbnailComments.textContent = comments.length;
    thumbnailElement.setAttribute('data-index', index);
    thumbnailFragment.append(thumbnailElement);
  });

  picturesContainer.append(thumbnailFragment);
  setupThumbnailContainer(array);
};

export { renderThumbnails };
