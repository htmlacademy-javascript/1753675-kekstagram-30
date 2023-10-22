// Получаем ссылку на контейнер, где будут отображаться миниатюры фотографий
const pictures = document.querySelector('.pictures');
// Получаем шаблон для создания миниатюр фотографий
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Отрисовываем миниатюры фотографий на основе переданного массива данных
const renderThumbnails = (array) => {
  // Создаем фрагмент, в который будем временно добавлять миниатюры
  const thumbnailFragment = document.createDocumentFragment();
  array.forEach(({url, description, likes, comments}) => {
    // Клонируем шаблон миниатюры для каждого объекта данных
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    // Устанавливаем значения на основании полученных данных
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__img').alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    // Добавляем миниатюру во фрагмент
    thumbnailFragment.appendChild(thumbnailElement);
  });
  // Добавляем фрагмент с миниатюрами в контейнер
  pictures.appendChild(thumbnailFragment);
};

export {renderThumbnails};
