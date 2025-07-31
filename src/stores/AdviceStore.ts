import { makeAutoObservable } from 'mobx';
import { websocketService, AdviceData } from '../utils/websocketService';

export class AdviceStore {
  currentAdvice: AdviceData | null = null;
  showNotification = false;
  isConnected = false;

  constructor() {
    makeAutoObservable(this);
    this.initializeWebSocket();
  }

  initializeWebSocket() {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNWYxMmRhLTgxOGQtNDgyNy1iN2NlLWJlZjE1M2Y0ZmRkZiIsImlhdCI6MTc1MzkwMzIwOSwiZXhwIjoxNzU0NTA4MDA5fQ.cUYEhaiPZa-EEDlQ_heJdrKHmf-3lWCYZ1lNP9WHb5w';
      
      websocketService.connect(token);

      websocketService.on('connected', () => {
        this.isConnected = true;
        console.log('WebSocket connected successfully');
      });

      websocketService.on('new_advice', (advice: AdviceData) => {
        this.setCurrentAdvice(advice);
        this.showNotification = true;
        console.log('New advice received:', advice);
      });

      websocketService.on('disconnect', () => {
        this.isConnected = false;
        console.log('WebSocket disconnected');
      });

      websocketService.on('connect_error', (error) => {
        this.isConnected = false;
        console.error('WebSocket connection error:', error);
      });
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
    }
  }

  setCurrentAdvice(advice: AdviceData | null) {
    if (advice) {
      // Парсим совет для извлечения текста
      const parsedAdvice = this.parseAdviceText(advice.advice);
      this.currentAdvice = {
        ...advice,
        advice: parsedAdvice
      };
    } else {
      this.currentAdvice = null;
    }
  }

  /**
   * Парсит текст совета, извлекая поле answer из JSON или возвращая текст как есть
   */
  private parseAdviceText(adviceText: string): string {
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

  hideNotification() {
    this.showNotification = false;
  }

  clearAdvice() {
    this.currentAdvice = null;
    this.showNotification = false;
  }

  ping() {
    websocketService.ping();
  }

  disconnect() {
    websocketService.disconnect();
  }
}

export const adviceStore = new AdviceStore(); 