const HASHTAG_REGEX = /^#[а-яёa-z0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

let pristine;

const ErrorMessage = {
  maxHashtags: `Хэштегов не должно быть более ${MAX_HASHTAGS}`,
  hasDuplicates: 'Хэштеги не должны повторяться',
  invalidHashtag: 'Хэштег невалиден',
  maxLength: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
};

const invalidData = {
  hashtags: [],
  comments: []
};

const getErrorsText = (value) => () => invalidData[value].map((element) => `<p>${element}</p>`).join(' ');

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ').filter(Boolean);
  const usedTags = new Set();
  invalidData.hashtags = [];

  if (hashtags.length > MAX_HASHTAGS) {
    invalidData.hashtags.push(ErrorMessage.maxHashtags);
  }

  const invalidHashtags = hashtags.filter((element) => !HASHTAG_REGEX.test(element));

  if (invalidHashtags.length) {
    invalidData.hashtags.push(ErrorMessage.invalidHashtag);
  }

  for (const hashtag of hashtags) {
    const isDuplicateError = invalidData.hashtags.includes(ErrorMessage.hasDuplicates);

    if (usedTags.has(hashtag) && !isDuplicateError) {
      invalidData.hashtags.push(ErrorMessage.hasDuplicates);
      continue;
    }

    usedTags.add(hashtag);
  }

  return invalidData.hashtags.length === 0;
};

const validateComments = (value) => {
  invalidData.comments = [];

  if (value.length > MAX_COMMENT_LENGTH) {
    invalidData.comments.push(ErrorMessage.maxLength);
  }

  return invalidData.comments.length === 0;
};

const configureUploadForm = (uploadForm, hashtagsInput, commentInput) => {
  const pristineConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p'
  };

  pristine = new Pristine(uploadForm, pristineConfig);
  pristine.addValidator(hashtagsInput, validateHashtags, getErrorsText('hashtags'), true);
  pristine.addValidator(commentInput, validateComments, getErrorsText('comments'));
};

const isValidForm = () => pristine.validate();
const resetValidate = () => pristine.reset();


export { configureUploadForm, isValidForm, resetValidate };
