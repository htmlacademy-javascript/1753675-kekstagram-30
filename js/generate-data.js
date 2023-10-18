
import {COMMENTS, NAMES} from './db.js';
import {getRandomNumber, getRandomContent} from './utils.js';

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
  'id': generateUniqueId(10000),
  'avatar': `img/avatar-${getRandomNumber(1, 6)}.svg`,
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
      likes: getRandomNumber(15, 200),
      comments: []
    };

    const commentsNum = getRandomNumber(0, 30);

    for (let j = 0; j < commentsNum; j++) {
      photoObject.comments.push(generateComment());
    }

    photoArray.push(photoObject);
  }

  return photoArray;
};

export {generatePhotoArray};
