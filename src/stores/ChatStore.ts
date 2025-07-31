import { makeAutoObservable } from 'mobx';
import { aiApi, AIResponse } from '../utils/aiApi';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  source?: 'ai' | 'mock';
}

export class ChatStore {
  messages: ChatMessage[] = [
    {
      id: '1',
      text: 'Привет! Я твой виртуальный друг Тоша, я живу в твоём приложении. Чем могу помочь? С радостью тебе помогу!',
      isUser: false,
      timestamp: new Date(),
      source: 'mock'
    }
  ];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Добавить сообщение пользователя
   */
  addUserMessage(text: string) {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    this.messages.push(message);
    this.setLoading(true);
    this.setError(null);

    // Отправляем запрос в AI
    this.sendToAI(text);
  }

  /**
   * Отправить сообщение в AI
   */
  private async sendToAI(message: string) {
    try {
      console.log('Отправляем сообщение в AI:', message);
      
      const response: AIResponse = await aiApi.sendMessage(message);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        isUser: false,
        timestamp: new Date(),
        source: response.source
      };

      this.messages.push(aiMessage);
      console.log('AI ответ добавлен:', aiMessage);
      
    } catch (error) {
      console.error('Ошибка при отправке в AI:', error);
      this.setError('Ошибка при получении ответа');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Добавить сообщение от AI (для WebSocket советов)
   */
  addAIAdvice(advice: string, timestamp?: string) {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text: advice,
      isUser: false,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      source: 'ai'
    };

    this.messages.push(message);
  }

  /**
   * Очистить чат
   */
  clearChat() {
    this.messages = [
      {
        id: '1',
        text: 'Привет! Я твой виртуальный друг Тоша, я живу в твоём приложении. Чем могу помочь? С радостью тебе помогу!',
        isUser: false,
        timestamp: new Date(),
        source: 'mock'
      }
    ];
    this.setError(null);
    this.setLoading(false);
  }

  /**
   * Получить последнее сообщение
   */
  get lastMessage(): ChatMessage | null {
    return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null;
  }

  /**
   * Получить количество сообщений
   */
  get messageCount(): number {
    return this.messages.length;
  }

  /**
   * Проверить, есть ли сообщения от пользователя
   */
  get hasUserMessages(): boolean {
    return this.messages.some(msg => msg.isUser);
  }

  // Actions
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  clearError() {
    this.error = null;
  }
}

export const chatStore = new ChatStore(); 