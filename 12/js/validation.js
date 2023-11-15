const HASHTAG_REGEX = /^#[а-яёa-z0-9]{1,19}$/i;
const MAX_HASHTAGS = 5; // Максимальное количество хэштегов
const MAX_COMMENT_LENGTH = 140; // Максимальная длина комментария

let pristine;

// Сообщения об ошибках, которые будем отображать
const ErrorMessage = {
  maxHashtags: `Хэштегов не должно быть более ${MAX_HASHTAGS}`,
  hasDuplicates: 'Хэштеги не должны повторяться',
  invalidHashtag: 'Хэштег невалиден',
  maxLength: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
};

// Сохраняем в этот объект невалидные данные
const invalidData = {
  hashtags: [],
  comments: []
};

// Получаем текст ошибок для вывода в форме
const getErrorsText = (value) => () => invalidData[value].map((element) => `<p>${element}</p>`).join(' ');

// Валидируем хэштеги
const validateHashtags = (value) => {
  // Приводим хэштеги к нижнему регистру, удаляем лишние пробелы и разделяем
  const hashtags = value.toLowerCase().trim().split(' ').filter(Boolean);
  const usedTags = new Set();
  invalidData.hashtags = [];

  // Проверяем количество хэштегов
  if (hashtags.length > MAX_HASHTAGS) {
    invalidData.hashtags.push(ErrorMessage.maxHashtags);
  }

  // Проверяем валидность каждого хэштега
  const invalidHashtags = hashtags.filter((element) => !HASHTAG_REGEX.test(element));

  if (invalidHashtags.length) {
    invalidData.hashtags.push(ErrorMessage.invalidHashtag);
  }

  // Проверяем наличие повторяющихся хэштегов
  for (const hashtag of hashtags) {
    const isDuplicateError = invalidData.hashtags.includes(ErrorMessage.hasDuplicates);

    if (usedTags.has(hashtag) && !isDuplicateError) {
      invalidData.hashtags.push(ErrorMessage.hasDuplicates);
      continue;
    }

    usedTags.add(hashtag);
  }

  // Возвращаем true, если все хэштеги валидны
  return invalidData.hashtags.length === 0;
};

// Валидируем комментарии
const validateComments = (value) => {
  invalidData.comments = [];

  // Проверяем длину комментария
  if (value.length > MAX_COMMENT_LENGTH) {
    invalidData.comments.push(ErrorMessage.maxLength);
  }

  // Возвращаем true, если комментарий валиден
  return invalidData.comments.length === 0;
};

// Конфигурируем форму для валидации
const configureUploadForm = (uploadForm, hashtagsInput, commentInput) => {
  const pristineConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p'
  };

  // Создаем экземпляр Pristine и добавляем валидаторы
  pristine = new Pristine(uploadForm, pristineConfig);
  pristine.addValidator(hashtagsInput, validateHashtags, getErrorsText('hashtags'), true);
  pristine.addValidator(commentInput, validateComments, getErrorsText('comments'));
};

// Проверяем валидность формы
const isValidForm = () => pristine.validate();
// Сбрасываем валидацию
const resetValidate = () => pristine.reset();


export { configureUploadForm, isValidForm, resetValidate };
