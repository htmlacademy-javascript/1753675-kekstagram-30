import {generatePhotoArray} from './generate-data.js';
import {renderThumbnails} from './photo-gallery.js';

const OBJECTS_NUM = 25; // количество сгенерированных объектов
const photoArray = generatePhotoArray(OBJECTS_NUM); // генерируем массив с данными и сохраняем

renderThumbnails(photoArray);
