import {COMMENTS, NAMES} from './db.js';
import {getRandomNumber, getRandomContent} from './utils.js';

const MAX_COMMENT_ID = 10000;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const generatedCommentIds = [];

// Генерируем уникальный id для комментария
const generateUniqueId = (num) => {
  const id = getRandomNumber(1, num);

  if (generatedCommentIds.includes(id)) { // Проверяем уникальность id
    return generateUniqueId(num);
  }

  generatedCommentIds.push(id); // Добавляем id в массив сгенерированных id
  return id;
};

// Создаём и возвращаем объект комментария с контентом
const generateComment = () => ({
  'id': generateUniqueId(MAX_COMMENT_ID),
  'avatar': `img/avatar-${getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  'message': getRandomContent(COMMENTS),
  'name': getRandomContent(NAMES)
});

// Создаём и возвращаем массив объектов, которые предварительно наполняем данными
const generatePhotoArray = (num) => {
  const photoArray = [];

  for (let i = 1; i <= num; i++) {
    const photoObject = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии ${i}`,
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: []
    };

    const commentsNum = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);

    for (let j = 0; j < commentsNum; j++) {
      photoObject.comments.push(generateComment());
    }

    photoArray.push(photoObject);
  }

  return photoArray;
};

export {generatePhotoArray};
