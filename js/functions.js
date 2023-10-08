const getCompare = (textInput, length) => textInput.length <= length;

getCompare('проверяемая строка', 20);
getCompare('проверяемая строка', 10);
getCompare('проверяемая строка', 18);

const checkPalindrome = (textInput) => {
  const clearInput = textInput.replaceAll(' ', '').toLowerCase();
  const reversedInput = clearInput.split('').reverse().join('');
  return clearInput === reversedInput;
};

checkPalindrome('Лёша на полке клопа нашёл ');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');

const extractNumbers = (textInput) => {
  let numbers = '';
  for (let i = 0; i < textInput.length; i++) {
    if (/[0-9]/.test(textInput[i])) {
      numbers += textInput[i];
    }
  }
  if (numbers === '') {
    return NaN;
  }
  return parseInt(numbers, 10);
};

extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('а я томат');
