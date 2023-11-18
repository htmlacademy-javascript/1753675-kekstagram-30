import { getData } from './api.js';
import { showDataErrorMessage, debounce } from './utils.js';
import { renderThumbnails } from './photo-gallery.js';
import { onThumbnailClick } from './fullscreen-photo.js';
import { setupUploadImageForm } from './form.js';
import { showImagesFilter, setFilterClick, rerenderThumbmnails } from './filter.js';

const initializeApp = async () => {
  try {
    const pictures = await getData();
    showImagesFilter();
    renderThumbnails(pictures);
    onThumbnailClick(pictures);
    setFilterClick(debounce((target) => rerenderThumbmnails(pictures, target)));
    setupUploadImageForm();
  } catch {
    showDataErrorMessage();
  }
};

initializeApp();
