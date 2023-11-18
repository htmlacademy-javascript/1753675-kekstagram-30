// Получаем ссылку на контейнер, где будут отображаться миниатюры фотографий
const picturesContainer = document.querySelector('.pictures');
// Получаем шаблон для создания миниатюр фотографий
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Отрисовываем миниатюры фотографий на основе переданного массива данных
const renderThumbnails = (array) => {
  // Создаем фрагмент, в который будем временно добавлять миниатюры
  const thumbnailFragment = document.createDocumentFragment();

  array.forEach(({ url, description, likes, comments }, index) => {
    // Клонируем шаблон миниатюры для каждого объекта данных
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    // Устанавливаем значения на основании полученных данных
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__img').alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.setAttribute('data-index', index);
    // Добавляем миниатюру во фрагмент
    thumbnailFragment.append(thumbnailElement);
  });

  // Добавляем фрагмент с миниатюрами в контейнер
  picturesContainer.append(thumbnailFragment);
};

export { renderThumbnails };
