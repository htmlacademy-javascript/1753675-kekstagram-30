import { getData } from './api.js';
import { showDataErrorMessage, debounce } from './utils.js';
import { renderThumbnails } from './photo-gallery.js';
import { setupUploadImageForm } from './form.js';
import { showImagesFilter, setFilterClick, rerenderThumbmnails } from './filter.js';

const initializeApp = async () => {
  try {
    setupUploadImageForm();
    const pictures = await getData();
    showImagesFilter();
    renderThumbnails(pictures);
    setFilterClick(debounce((target) => rerenderThumbmnails(pictures, target)));
  } catch {
    showDataErrorMessage();
  }
};

initializeApp();
