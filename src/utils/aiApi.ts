import axios from 'axios';

export interface AIRequest {
  message: string;
  context?: string;
}

export interface AIResponse {
  answer: string;
  status: 'success' | 'error';
  source: 'ai' | 'mock';
}

class AIApi {
  private baseURL = 'https://8f95fc22e4f6.ngrok-free.app/ollama_get?advisor';
  private timeout = 300000; // 10 секунд

  /**
   * Отправить сообщение в AI и получить ответ
   */
  async sendMessage(message: string, context?: string): Promise<AIResponse> {
    try {
      console.log('Отправляем запрос в AI:', message);
      
      // Кодируем сообщение для URL
      const encodedMessage = encodeURIComponent(message);
      const url = `${this.baseURL}=${message}`;

      console.log(url)
      
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
      console.error('Ошибка AI API:', error);
      
      // Возвращаем моковый ответ при ошибке или таймауте
      return this.getMockResponse(message);
    }
  }

  /**
   * Получить моковый ответ
   */
  private getMockResponse(message: string): AIResponse {
    const mockResponses = [
      'Привет! Я твой виртуальный друг Тоша, я живу в твоём приложении. Чем могу помочь? С радостью тебе помогу!',
      'Отличный вопрос! Давай разберем это вместе.',
      'Я всегда готов помочь тебе с любыми вопросами!',
      'Спасибо за сообщение! Я думаю над ответом...',
      'Интересная тема! Расскажи больше.',
      'Я здесь, чтобы помочь тебе во всем!',
      'Отличная идея! Давай обсудим это подробнее.',
      'Я рад, что ты обратился ко мне за советом!',
      'Давай вместе найдем решение твоего вопроса.',
      'Я всегда готов поддержать тебя!'
    ];

    // Выбираем случайный ответ или используем первый
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    const mockAnswer = mockResponses[randomIndex];

    console.log('Используем моковый ответ:', mockAnswer);

    return {
      answer: mockAnswer,
      status: 'success',
      source: 'mock'
    };
  }

  /**
   * Проверить доступность AI API
   */
  async checkHealth(): Promise<boolean> {
    try {
      const testUrl = `${this.baseURL}=test`;
      const response = await axios.get(testUrl, {
        timeout: 5000
      });
      return response.status === 200;
    } catch (error) {
      console.error('AI API недоступен:', error);
      return false;
    }
  }
}

export const aiApi = new AIApi(); 