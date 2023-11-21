// Базовый URL для запросов
const BASE_URL = 'https://30.javascript.pages.academy/kekstagram/';

const Method = {
  GET: 'GET',
  POST: 'POST'
};

// Определение маршрутов для разных HTTP-методов
const Routes = {
  [Method.GET]: `${BASE_URL}data`,
  [Method.POST]: BASE_URL
};

// Определение текстов ошибок для различных HTTP-методов
const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [Method.POST]: 'Не удалось загрузить файл. Попробуйте ещё раз'
};

// Асинхронно отправляем запросы на сервер
const fetchData = async (url, method = Method.GET, body = null) => {
  // Запрашиваем данные с сервера
  const response = await fetch(url, { method, body });

  // Если запрос завершился ошибкой, выбрасываем исключение с текстом ошибки
  if (!response.ok) {
    throw new Error(`Произошла ошибка: ${ErrorText[method]}`);
  }

  // Возвращаем данные из ответа в формате JSON
  return response.json();
};

// Получаем данные с сервера (GET запрос)
const getData = () => fetchData(Routes[Method.GET]);

// Отправляем данные на сервер (POST запрос)
const sendData = (body) => fetchData(Routes[Method.POST], Method.POST, body);

export { getData, sendData };
