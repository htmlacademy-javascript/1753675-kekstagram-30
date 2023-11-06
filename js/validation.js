import {HASHTAG_REGEX} from './db.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const uploadImageForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');

let pristine;

const errorMessage = {
  maxHashtags: 'Хэштегов не должно быть более 5',
  hasDuplicates: 'Хэштеги не должны повторяться',
  invalidHashtag: 'Хэштег невалиден',
  maxLength: 'Длина комментария не должна превышать 140 символов'
};

const invalidData = {
  hashtags: [],
  comments: []
};

const getErrorsText = (value) => () => invalidData[value].map((element) => `<p>${element}</p>`).join('\n');

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ').filter(Boolean);
  const usedTags = new Set();

  invalidData.hashtags = [];

  if (hashtags.length > MAX_HASHTAGS) {
    invalidData.hashtags.push(errorMessage.maxHashtags);
  }

  const invalidHashtags = hashtags.filter((element) => !HASHTAG_REGEX.test(element));

  if (invalidHashtags.length) {
    invalidData.hashtags.push(errorMessage.invalidHashtag);
  }

  for (const hashtag of hashtags) {
    if (usedTags.has(hashtag)) {
      if (!invalidData.hashtags.includes(errorMessage.hasDuplicates)) {
        invalidData.hashtags.push(errorMessage.hasDuplicates);
      }
      console.log(invalidData.hashtags);
      continue;
    }

    usedTags.add(hashtag);
  }

  return invalidData.hashtags.length === 0;
};

const validateComments = (value) => {
  invalidData.comments = [];

  if (value.length > MAX_COMMENT_LENGTH) {
    invalidData.comments.push(errorMessage.maxLength);
  }

  return invalidData.comments.length === 0;
};

const configureUploadForm = () => {
  const pristineConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'form__error'
  };

  pristine = new Pristine(uploadImageForm, pristineConfig);

  pristine.addValidator(hashtagsInput, validateHashtags, getErrorsText('hashtags'), true);
  pristine.addValidator(commentInput, validateComments, getErrorsText('comments'));
};


const isValidForm = () => pristine.validate();

const resetValidate = () => pristine.destroy();


export {configureUploadForm, isValidForm, resetValidate};
