// Тестовый файл для проверки удаления символов "*" из ответов AI

function testStarRemoval() {
  console.log('=== Тестирование удаления символов "*" ===\n');
  
  // Тестовые данные
  const testCases = [
    {
      input: 'Привет! *Как дела?*',
      expected: 'Привет! Как дела?'
    },
    {
      input: '*Важно*: Это тестовое сообщение',
      expected: 'Важно: Это тестовое сообщение'
    },
    {
      input: 'Обычный текст без звездочек',
      expected: 'Обычный текст без звездочек'
    },
    {
      input: '***Много звездочек***',
      expected: 'Много звездочек'
    },
    {
      input: 'Текст со *звездочками* в *разных* местах',
      expected: 'Текст со звездочками в разных местах'
    },
    {
      input: '*',
      expected: ''
    },
    {
      input: '**',
      expected: ''
    },
    {
      input: '',
      expected: ''
    }
  ];
  
  // Функция для удаления звездочек
  function removeStars(text) {
    return text.replace(/\*/g, '');
  }
  
  // Запускаем тесты
  testCases.forEach((testCase, index) => {
    const result = removeStars(testCase.input);
    const passed = result === testCase.expected;
    
    console.log(`Тест ${index + 1}: ${passed ? '✅' : '❌'}`);
    console.log(`Вход: "${testCase.input}"`);
    console.log(`Ожидалось: "${testCase.expected}"`);
    console.log(`Получилось: "${result}"`);
    console.log('');
  });
  
  // Дополнительные тесты с реальными примерами AI ответов
  console.log('=== Тесты с реальными примерами ===\n');
  
  const realExamples = [
    '*Привет!* Я *Тоша*, твой виртуальный помощник!',
    'Совет: *Попробуй откладывать 10% от карманных денег*',
    '*Важно помнить*: Деньги нужно тратить с умом',
    'Отличная идея! *Продолжай в том же духе*',
    'Я *рад* помочь тебе с этим вопросом!'
  ];
  
  realExamples.forEach((example, index) => {
    const cleaned = removeStars(example);
    console.log(`Пример ${index + 1}:`);
    console.log(`До: "${example}"`);
    console.log(`После: "${cleaned}"`);
    console.log('');
  });
  
  console.log('=== Тестирование завершено ===');
}

// Запускаем тесты
testStarRemoval(); 