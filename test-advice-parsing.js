// Тестовый файл для проверки парсинга советов

function parseAdviceText(adviceText) {
  try {
    // Пытаемся распарсить как JSON
    const parsed = JSON.parse(adviceText);
    
    // Если есть поле answer, возвращаем его
    if (parsed.answer) {
      return parsed.answer;
    }
    
    // Если нет answer, но есть другие поля, возвращаем весь объект как строку
    return JSON.stringify(parsed);
  } catch (error) {
    // Если не удалось распарсить JSON, возвращаем текст как есть
    return adviceText;
  }
}

// Тестовые данные
const testCases = [
  // JSON с полем answer
  {
    input: '{"agent":"piggy","answer":"Молодец! У тебя уже 255 рублей в копилке на велосипед, ты стал на -5 рублей ближе к своей цели в 500 рублей! Продолжай в том же духе, и скоро у тебя будет новый велосипед!","status":"позитивный"}',
    expected: "Молодец! У тебя уже 255 рублей в копилке на велосипед, ты стал на -5 рублей ближе к своей цели в 500 рублей! Продолжай в том же духе, и скоро у тебя будет новый велосипед!"
  },
  // Простой текст
  {
    input: "Простой совет от Тоши",
    expected: "Простой совет от Тоши"
  },
  // JSON без поля answer
  {
    input: '{"agent":"piggy","status":"позитивный"}',
    expected: '{"agent":"piggy","status":"позитивный"}'
  },
  // Пустая строка
  {
    input: "",
    expected: ""
  }
];

// Запускаем тесты
console.log("🧪 Тестирование парсинга советов:\n");

testCases.forEach((testCase, index) => {
  const result = parseAdviceText(testCase.input);
  const isSuccess = result === testCase.expected;
  
  console.log(`Тест ${index + 1}: ${isSuccess ? '✅' : '❌'}`);
  console.log(`Входные данные: ${testCase.input}`);
  console.log(`Ожидаемый результат: ${testCase.expected}`);
  console.log(`Полученный результат: ${result}`);
  console.log(`---`);
});

console.log("🎯 Пример работы с реальными данными:");
const realAdvice = {
  advice: '{"agent":"piggy","answer":"Молодец! У тебя уже 255 рублей в копилке на велосипед, ты стал на -5 рублей ближе к своей цели в 500 рублей! Продолжай в том же духе, и скоро у тебя будет новый велосипед!","status":"позитивный"}',
  timestamp: "2025-07-31T05:31:58.445Z"
};

const parsedAdvice = parseAdviceText(realAdvice.advice);
console.log(`Исходный JSON: ${realAdvice.advice}`);
console.log(`Извлеченный текст: ${parsedAdvice}`);
console.log(`Обрезанный для уведомления: ${parsedAdvice.length > 80 ? parsedAdvice.substring(0, 80) + '...' : parsedAdvice}`); 