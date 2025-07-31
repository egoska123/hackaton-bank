import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import axios from 'axios';

@Injectable()
export class AiResponseService {
  private webSocketGateway: any;
  private userLastOperations = new Map<string, { operation: string, timestamp: number }>();

  constructor(
    private prisma: PrismaService,
  ) {}

  // Метод для установки WebSocket Gateway (избегаем циклических зависимостей)
  setWebSocketGateway(gateway: any) {
    this.webSocketGateway = gateway;
  }

  async updateUserResponse(userId: string, requestData: any, operation: string): Promise<string> {
    // Проверяем дублирование только для НЕ-default операций
    if (operation !== 'default') {
      const lastOperation = this.userLastOperations.get(userId);
      const now = Date.now();
      const fiveMinutes = 30 * 1000; // 5 минут в миллисекундах

      if (lastOperation && 
          lastOperation.operation === operation && 
          (now - lastOperation.timestamp) < fiveMinutes) {
        console.log(`Skipping duplicate operation '${operation}' for user ${userId} (within 5 minutes)`);
        
        // Получаем последний совет из БД
        const lastResponse = await this.prisma.aiResponse.findUnique({
          where: { userId },
        });
        return lastResponse?.text || this.getMockAdvice(operation, requestData);
      }
    }

    const apiResponse = await this.sendToAiApi(requestData, operation);
    await this.saveOrUpdateResponse(userId, apiResponse);
    
    // Запоминаем последнюю операцию только для НЕ-default операций
    if (operation !== 'default') {
      this.userLastOperations.set(userId, {
        operation,
        timestamp: Date.now()
      });
    }

    // Отправляем уведомление через WebSocket если gateway установлен
    if (this.webSocketGateway) {
      this.webSocketGateway.sendAdviceToUser(userId, apiResponse);
    }
    
    return apiResponse;
  }

  private async sendToAiApi(data: any, operation: string): Promise<string> {
    

    try {
      let agent : string
      switch(operation){
        case 'transaction':
          agent = `/ollama_get?general_spending=${data.text}`;
          break;
        case 'history':
          agent = `/ollama_get?history=${data.text}`;
          break;
        case 'piggybank':
          agent = `/ollama_get?piggy=${data.text}`;
          break;
        case 'balance':
          agent = `/ollama_get?balance=${data.text}`;
          break;
        case 'profile':
          agent = `/ollama_get?profile=${data.text}`;
          break;
        default:
          agent = `/ollama_get?advisor=${data.text}`;
          break;
      }
      console.log(data, "датаааа")
      console.log(`${process.env.AI_API_URL}${agent}`)
      const response = await axios.get(`${process.env.AI_API_URL}${agent}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      console.log(response.data.answer)
      return response.data.text || response.data.response || JSON.stringify(response.data);
    } catch (error) {
      console.error('AI API request failed, returning mock data:', error.message);
      return this.getMockAdvice(operation, data);
    }
  }

  private getMockAdvice(operation: string, data: any): string {
    const mockAdvices = {
      transaction: [
        "Отличная транзакция! Помните, что ведение учета расходов поможет вам лучше планировать бюджет.",
        "Хороший выбор! Рекомендую записывать все траты, чтобы видеть, на что уходят деньги.",
        "Умно тратить деньги! Не забывайте откладывать часть денег на будущие цели.",
        "При следующей покупке подумайте: действительно ли это нужно? Это поможет избежать ненужных трат."
      ],
      history: [
        "Анализируя вашу историю транзакций, вижу хорошие привычки! Продолжайте вести учет расходов.",
        "Ваша история показывает разумный подход к тратам. Рекомендую ставить цели для накоплений.",
        "Из истории видно, что вы умеете контролировать расходы. Это важный навык для финансового успеха!",
        "Хорошая динамика трат! Попробуйте составить план накоплений на месяц вперед."
      ],
      piggybank: [
        "Замечательно копите деньги! Копилка - отличный способ достичь своих целей.",
        "Каждый рубль в копилке приближает вас к мечте! Продолжайте в том же духе.",
        "Регулярные пополнения копилки формируют полезную привычку накопления денег.",
        "Отлично! Ставьте маленькие цели и достигайте их - это путь к большим достижениям."
      ],
      profile: [
        "Следите за своим балансом - это основа финансовой грамотности!",
        "У вас хороший баланс! Рекомендую 30% тратить, 70% откладывать на цели.",
        "Ваш текущий баланс позволяет планировать. Поставьте себе финансовую цель на месяц!",
        "Помните: деньги - это инструмент для достижения целей, а не самоцель."
      ],
      balance: [
        "Контроль баланса - признак финансовой ответственности! Молодец!",
        "Следите за тратами и доходами - это поможет принимать умные финансовые решения.",
        "Ваш баланс в порядке! Подумайте о новых способах накопления денег."
      ],
      default: [
        "Финансовая грамотность - это навык, который пригодится всю жизнь!",
        "Каждое финансовое решение - это урок. Учитесь на своем опыте!",
        "Планирование бюджета и постановка целей помогут достичь финансового успеха.",
        "Помните: сначала откладывайте, потом тратьте. Это золотое правило!"
      ]
    };

    const categoryAdvices = mockAdvices[operation] || mockAdvices.default;
    const randomIndex = Math.floor(Math.random() * categoryAdvices.length);
    return categoryAdvices[randomIndex];
  }

  private async saveOrUpdateResponse(userId: string, text: string): Promise<void> {
    console.log(text)
    await this.prisma.aiResponse.upsert({
      where: { userId },
      update: { text },
      create: { userId, text },
    });
  }
} 