const REMOVE_ALERT_TIMEOUT = 5000;
const dataErrorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadSuccessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const uploadFailureMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isEscapeKey = (event) => event.key === 'Escape';

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    hideUploadMessage();
  }
};

const showDataErrorMessage = (text = null) => {
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true);
  if (text) {
    dataErrorMessage.querySelector('.data-error__title').textContent = text;
  }
  document.body.append(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, REMOVE_ALERT_TIMEOUT);
};

const onMessageButtonClick = () => {
  hideUploadMessage();
};

const showUploadMessage = (template, button) => {
  const uploadMessage = template.cloneNode(true);
  const uploadMessageButton = uploadMessage.querySelector(button);
  document.body.append(uploadMessage);
  uploadMessageButton.addEventListener('click', onMessageButtonClick);
  uploadMessage.addEventListener('click', onMessageOverlayClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showUploadSuccessMessage = () => {
  showUploadMessage(uploadSuccessMessageTemplate, '.success__button');
};

const showUploadFailureMessage = () => {
  showUploadMessage(uploadFailureMessageTemplate, '.error__button');
};

const onOverlayClick = (event, callback) => {
  if (event.currentTarget !== event.target.closest('div') && event.target === event.currentTarget) {
    callback();
  }
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback(...rest);
    }, timeoutDelay);
  };
};

function onMessageOverlayClick (event) {
  onOverlayClick(event, hideUploadMessage);
}

function removeDocumentKeydownHandler () {
  document.body.removeEventListener('keydown', onDocumentKeydown);
}

function hideUploadMessage () {
  const existsMessage = document.querySelector('.success') || document.querySelector('.error');
  existsMessage.remove();
  removeDocumentKeydownHandler();
}

export { getRandomNumber, isEscapeKey, showDataErrorMessage, showUploadSuccessMessage, showUploadFailureMessage, debounce, onOverlayClick};
