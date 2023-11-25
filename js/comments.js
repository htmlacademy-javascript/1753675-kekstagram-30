const COMMENTS_CHUNK_SIZE = 5;
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

const updateCommentCount = () => {
  commentCount.textContent = loadedCommentsCount.toString();
};

const loadComments = () => {
  const comments = commentsData;
  const commentsToRender = Math.min(COMMENTS_CHUNK_SIZE, comments.length - loadedCommentsCount);
  commentsLoader.classList.remove('hidden');

  for (let i = loadedCommentsCount; i < loadedCommentsCount + commentsToRender; i++) {
    const comment = createComment(comments[i]);
    commentsList.append(comment);
  }

  loadedCommentsCount += commentsToRender;

  updateCommentCount();

  if (loadedCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
    removeCommentsLoader();
  }
};

const commentsLoaderClickHandler = () => {
  loadComments();
};

const renderComments = (comments) => {
  commentsData = comments;
  commentsList.innerHTML = '';
  loadedCommentsCount = 0;
  loadComments();
  commentsLoader.addEventListener('click', commentsLoaderClickHandler);
};

function removeCommentsLoader () {
  commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
}

export { renderComments, removeCommentsLoader };
