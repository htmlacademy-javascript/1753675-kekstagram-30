import {generatePhotoArray} from './generate-data.js';
import {renderThumbnails} from './photo-gallery.js';
import {openPhotoModal} from './fullscreen-photo.js';

const OBJECTS_NUM = 25; // количество сгенерированных объектов
const photoArray = generatePhotoArray(OBJECTS_NUM); // генерируем массив с данными и сохраняем

renderThumbnails(photoArray);

photoArray.forEach((item) => {
  openPhotoModal(item);
});
