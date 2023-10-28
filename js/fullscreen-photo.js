const fullSizePhoto = document.querySelector('.big-picture');
const fullSizePhotoImg = fullSizePhoto.querySelector('.big-picture__img img');
const likesCount = fullSizePhoto.querySelector('.likes-count');
const commentsShownCount = fullSizePhoto.querySelector('.social__comment-shown-count');
const commentsTotalCount = fullSizePhoto.querySelector('.social__comment-total-count');
const commentsList = fullSizePhoto.querySelector('.social__comments');
const photoDescription = fullSizePhoto.querySelector('.social__caption');
const fullSizePhotoCloseBtn = fullSizePhoto.querySelector('.big-picture__cancel');

const openPhotoModal = (data) => {
  fullSizePhoto.classList.remove('hidden');
  fullSizePhotoImg.src = data.url;
  photoDescription.textContent = data.description;
  likesCount.textContent = data.likes;
  commentsShownCount.textContent = data.comments.length;
  commentsTotalCount.textContent = data.comments.length;
  commentsList.innerHTML = '';
  data.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentItem.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="" width="35" height="35">
    <p class="social__text">${comment.message}</p>`;
    commentsList.appendChild(commentItem);
  });
  document.body.classList.add('modal-open');
};

// const closePhotoModal = () => {
// функция закрытия модалки
// };

export {openPhotoModal};
