const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const Routes = {
  [Method.GET]: `${BASE_URL}/data`,
  [Method.POST]: BASE_URL
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [Method.POST]: 'Не удалось загрузить файл. Попробуйте ещё раз'
};

const fetchData = async (url, method = [Method.GET], body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(`Произошла ошибка: ${ErrorText[method]}`);
  }
  return response.json();
};

const getData = () => fetchData(Routes[Method.GET]);

const sendData = (body) => fetchData(Routes[Method.POST], Method.POST, body);

export { getData, sendData };
