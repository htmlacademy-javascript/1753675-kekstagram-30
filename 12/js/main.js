import { getData } from './api.js';
import { showDataErrorMessage } from './utils.js';
import { renderThumbnails } from './photo-gallery.js';
import { onThumbnailClick } from './fullscreen-photo.js';
import { setupUploadImageForm } from './form.js';

const initializeApp = async () => {
  try {
    const pictures = await getData();
    renderThumbnails(pictures);
    onThumbnailClick(pictures);
    setupUploadImageForm();
  } catch {
    showDataErrorMessage();
  }
};

initializeApp();
