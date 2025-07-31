// Тестовый файл для проверки AI API с GET запросом

const axios = require('axios');

class TestAIApi {
  constructor() {
    this.baseURL = 'https://8f95fc22e4f6.ngrok-free.app/ollama_get?advisor';
    this.timeout = 10000;
  }

  async sendMessage(message) {
    try {
      console.log('Отправляем GET запрос в AI:', message);
      
      // Кодируем сообщение для URL
      const encodedMessage = encodeURIComponent(message);
      const url = `${this.baseURL}=${encodedMessage}`;
      
      console.log('Полный URL:', url);
      
      const response = await axios.get(url, {
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('AI ответ получен:', response.data);
      
      // Получаем ответ и удаляем все "*"
      const rawAnswer = response.data.answer || response.data.message || response.data || 'Ответ от AI';
      const cleanAnswer = rawAnswer.replace(/\*/g, '');
      
      return {
        answer: cleanAnswer,
        status: 'success',
        source: 'ai'
      };
    } catch (error) {
      console.error('Ошибка AI API:', error.message);
      
      return {
        answer: 'Моковый ответ при ошибке',
        status: 'error',
        source: 'mock'
      };
    }
  }

  async checkHealth() {
    try {
      const testUrl = `${this.baseURL}=test`;
      console.log('Проверяем доступность:', testUrl);
      
      const response = await axios.get(testUrl, {
        timeout: 5000
      });
      
      console.log('API доступен, статус:', response.status);
      return response.status === 200;
    } catch (error) {
      console.error('AI API недоступен:', error.message);
      return false;
    }
  }
}

// Тестирование
async function runTests() {
  const aiApi = new TestAIApi();
  
  console.log('=== Тестирование AI API ===\n');
  
  // Тест 1: Проверка доступности
  console.log('1. Проверка доступности API:');
  const isHealthy = await aiApi.checkHealth();
  console.log('Результат:', isHealthy ? '✅ Доступен' : '❌ Недоступен');
  console.log('');
  
  // Тест 2: Простое сообщение
  console.log('2. Тест простого сообщения:');
  const response1 = await aiApi.sendMessage('Привет');
  console.log('Ответ:', response1.answer);
  console.log('Источник:', response1.source);
  console.log('');
  
  // Тест 3: Сложное сообщение
  console.log('3. Тест сложного сообщения:');
  const response2 = await aiApi.sendMessage('Как лучше копить деньги на велосипед?');
  console.log('Ответ:', response2.answer);
  console.log('Источник:', response2.source);
  console.log('');
  
  // Тест 4: Русский текст
  console.log('4. Тест русского текста:');
  const response3 = await aiApi.sendMessage('Привет, Тоша! Как дела?');
  console.log('Ответ:', response3.answer);
  console.log('Источник:', response3.source);
  console.log('');
  
  console.log('=== Тестирование завершено ===');
}

// Запускаем тесты
runTests().catch(console.error); 