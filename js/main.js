const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Константин', 'Иван', 'Павел', 'Мария', 'Александра'];
const OBJECTS_NUM = 25; // количество сгенерированных объектов
const generatedCommentIds = [];

// Получаем псевдорандомное число
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Используем число для получения количества контента
const getRandomContent = (array) => array[getRandomNumber(0, array.length - 1)];

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

generatePhotoArray(OBJECTS_NUM);
