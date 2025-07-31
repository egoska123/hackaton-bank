// Тестовый файл для проверки парсинга советов

function parseAdviceText(adviceText) {
  try {
    // Пытаемся распарсить как JSON
    const parsed = JSON.parse(adviceText);
    
    // Если есть поле answer, возвращаем его
    if (parsed.answer) {
      return parsed.answer;
    }
    
    // Если нет поля answer, возвращаем весь объект как строку
    return JSON.stringify(parsed);
  } catch (error) {
    // Если не удалось распарсить JSON, возвращаем текст как есть
    return adviceText;
  }
}

// Тестовые случаи

// 1. JSON с полем answer
const jsonAdvice = '{"agent":"piggy","answer":"Молодец! У тебя уже 255 рублей в копилке на велосипед, ты стал на -5 рублей ближе к своей цели в 500 рублей! Продолжай в том же духе, и скоро у тебя будет новый велосипед!","status":"позитивный"}';

console.log('=== Тест 1: JSON с полем answer ===');
console.log('Входные данные:', jsonAdvice);
console.log('Результат:', parseAdviceText(jsonAdvice));
console.log('');

// 2. Простой текст
const simpleText = 'Простой совет без JSON';

console.log('=== Тест 2: Простой текст ===');
console.log('Входные данные:', simpleText);
console.log('Результат:', parseAdviceText(simpleText));
console.log('');

// 3. JSON без поля answer
const jsonWithoutAnswer = '{"agent":"piggy","status":"позитивный","message":"Тестовое сообщение"}';

console.log('=== Тест 3: JSON без поля answer ===');
console.log('Входные данные:', jsonWithoutAnswer);
console.log('Результат:', parseAdviceText(jsonWithoutAnswer));
console.log('');

// 4. Некорректный JSON
const invalidJson = '{"agent":"piggy","answer":"Тест",}';

console.log('=== Тест 4: Некорректный JSON ===');
console.log('Входные данные:', invalidJson);
console.log('Результат:', parseAdviceText(invalidJson));
console.log('');

// 5. Пустая строка
const emptyString = '';

console.log('=== Тест 5: Пустая строка ===');
console.log('Входные данные:', emptyString);
console.log('Результат:', parseAdviceText(emptyString));
console.log('');

console.log('=== Все тесты завершены ==='); 