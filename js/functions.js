const isStringLengthValid = (textInput, length) => length >= textInput.length;

isStringLengthValid('проверяемая строка', 20);
isStringLengthValid('проверяемая строка', 10);
isStringLengthValid('проверяемая строка', 18);

const isPalindrom = (textInput) => {
  const clearInput = textInput.replaceAll(' ', '').toLowerCase();
  const reversedInput = clearInput.split('').reverse().join('');
  return clearInput === reversedInput;
};

isPalindrom('Лёша на полке клопа нашёл ');
isPalindrom('ДовОд');
isPalindrom('Кекс');

const extractNumbers = (textInput) => {
  let numbers = '';

  for (const char of textInput) {
    if (/[\d]/.test(char)) {
      numbers += char;
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
