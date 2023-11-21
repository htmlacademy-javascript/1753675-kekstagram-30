// Количество комментариев для вывода на каждой загрузке
const COMMENTS_CHUNK_SIZE = 5;
// Находим контейнер для комментариев и шаблон комментария
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-shown-count');
const commentsLoader = document.querySelector('.comments-loader');

// Отображаем комментарии на странице
const renderComments = (comments) => {
  let displayedComments = 0; // Количество показанных комментариев
  let remainingComments = comments.length; // Количество оставшихся комментариев
  // Очищаем контейнер с комментариями
  commentsList.innerHTML = '';

  // Обновляем счетчик показанных комментариев
  const updateCommentCount = () => {
    commentCount.textContent = displayedComments.toString();
  };

  const createComment = ({ avatar, message, name }) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentAuthor = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    commentAuthor.setAttribute('src', avatar);
    commentAuthor.setAttribute('alt', name);
    commentText.textContent = message;

    return commentElement;
  };

  const loadMoreComments = () => {
    const commentsToRender = Math.min(remainingComments, COMMENTS_CHUNK_SIZE); // Количество комментариев для загрузки
    commentsLoader.classList.remove('hidden');

    for (let i = 0; i < commentsToRender; i++) {
      const comment = createComment(comments[i]);
      commentsList.append(comment);
      displayedComments++;
      remainingComments--;
    }

    updateCommentCount();

    // Скрываем кнопку загрузки, если больше нет комментариев для показа
    if (remainingComments === 0) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', loadMoreComments);
    }
  };

  // Загружаем первую порцию комментариев
  loadMoreComments();
  // Добавляем обработчик события на кнопку загрузки
  commentsLoader.addEventListener('click', loadMoreComments);
};

export { renderComments };
