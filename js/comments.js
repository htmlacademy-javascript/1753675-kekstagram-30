// Количество комментариев для вывода на каждой загрузке
const COMMENTS_CHUNK_SIZE = 5;
// Находим контейнер для комментариев и шаблон комментария
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-shown-count');
const commentsLoader = document.querySelector('.comments-loader');
let loadedCommentsCount = 0;
let commentsData;

const createComment = ({ avatar, message, name }) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAuthor = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');
  commentAuthor.setAttribute('src', avatar);
  commentAuthor.setAttribute('alt', name);
  commentText.textContent = message;

  return commentElement;
};

// Обновляем счетчик показанных комментариев
const updateCommentCount = () => {
  commentCount.textContent = loadedCommentsCount.toString();
};

const loadComments = () => {
  const comments = commentsData;
  // Количество комментариев для загрузки
  const commentsToRender = Math.min(COMMENTS_CHUNK_SIZE, comments.length - loadedCommentsCount);
  commentsLoader.classList.remove('hidden');

  for (let i = loadedCommentsCount; i < loadedCommentsCount + commentsToRender; i++) {
    const comment = createComment(comments[i]);
    commentsList.append(comment);
  }

  loadedCommentsCount += commentsToRender;

  updateCommentCount();

  // Скрываем кнопку загрузки, если больше нет комментариев для показа
  if (loadedCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
    removeCommentsLoader();
  }
};

// Отображаем комментарии на странице
const renderComments = (comments) => {
  commentsData = comments;
  // Очищаем контейнер с комментариями
  commentsList.innerHTML = '';
  loadedCommentsCount = 0;
  // Загружаем первую порцию комментариев
  loadComments();
  // Добавляем обработчик события на кнопку загрузки
  commentsLoader.addEventListener('click', loadComments);
};

function removeCommentsLoader () {
  commentsLoader.removeEventListener('click', loadComments);
}

export { renderComments, removeCommentsLoader };
