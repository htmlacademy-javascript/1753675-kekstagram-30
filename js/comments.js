const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const renderComments = (array) => {
  const commentFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';

  array.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').setAttribute('src', avatar);
    commentElement.querySelector('.social__picture').setAttribute('alt', name);
    commentElement.querySelector('.social__text').textContent = message;
    commentFragment.appendChild(commentElement);
  });

  commentsList.appendChild(commentFragment);
  // Скрываем счетчик комментариев и кнопку загрузки новых комментариев
  const commentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

export {renderComments};
