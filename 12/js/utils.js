const REMOVE_ALERT_TIMEOUT = 5000;

const dataErrorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadSuccessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const uploadFailureMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const isEscapeKey = (evt) => evt.key === 'Escape';

// Обрабатываем событие нажатия клавиши на документе
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) { // Проверяем является ли нажатая клавиша Escape
    evt.preventDefault();
    hideUploadMessage();
  }
};

const showDataErrorMessage = () => {
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true);
  document.body.append(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, REMOVE_ALERT_TIMEOUT);
};

const showUploadMessage = (template, button) => {
  const uploadMessage = template.cloneNode(true);
  const uploadMessageButton = uploadMessage.querySelector(button);
  document.body.append(uploadMessage);
  uploadMessageButton.addEventListener('click', hideUploadMessage);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showuUploadSuccessMessage = () => {
  showUploadMessage(uploadSuccessMessageTemplate, '.success__button');
};

const showuUploadFailureMessage = () => {
  showUploadMessage(uploadFailureMessageTemplate, '.error__button');
};

// Удаляем обработчик нажатия клавиши с document
function removeDocumentKeydownHandler () {
  document.body.removeEventListener('keydown', onDocumentKeydown);
}

function hideUploadMessage () {
  const existsMessage = document.querySelector('.success') || document.querySelector('.error');
  existsMessage.remove();
  removeDocumentKeydownHandler();
}

export { isEscapeKey, showDataErrorMessage, showuUploadSuccessMessage, showuUploadFailureMessage};
