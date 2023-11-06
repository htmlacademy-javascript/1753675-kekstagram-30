const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Используем число для получения количества контента
const getRandomContent = (array) => array[getRandomNumber(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, getRandomContent, isEscapeKey};
