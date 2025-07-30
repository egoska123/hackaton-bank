import { apiClient } from './api';
import { TransactionHistory } from '../types/transaction.types';

// Mock данные для fallback (из старых мок файлов)
const MOCK_TRANSACTION_HISTORY: TransactionHistory = {
  childId: "71d35053-ba1e-4a02-8052-019d5c1902f0",
  childName: "Мирослав",
  balance: 606500,
  parent: {
    id: "d318accd-78dc-47af-9eca-9ab92d47ab4c",
    email: "parent@test.com",
    profile: {
      fullName: "Мирослав"
    }
  },
  transactions: [
    {
      id: "fde47d49-e5cd-44b6-a692-563d59044c96",
      childId: "71d35053-ba1e-4a02-8052-019d5c1902f0",
      amount: 1000,
      category: "карманные деньги",
      createdAt: "2025-07-30T18:49:36.993Z",
      description: "Награда за хорошие оценки"
    },
    {
      id: "b30ef14f-599e-4e91-b755-74f25d41342b",
      childId: "71d35053-ba1e-4a02-8052-019d5c1902f0",
      amount: -100000,
      category: "Продукты",
      createdAt: "2025-07-30T14:09:27.337Z",
      description: ""
    },
    {
      id: "f643f351-654b-469e-8253-92de2057030c",
      childId: "71d35053-ba1e-4a02-8052-019d5c1902f0",
      amount: -100000,
      category: "Продукты маме",
      createdAt: "2025-07-30T14:06:14.177Z",
      description: "благодарность"
    }
  ],
  totalTransactions: 3
};

export class TransactionApi {
  // Получение истории транзакций
  static async getTransactionHistory(useMockFallback: boolean = false): Promise<TransactionHistory> {
    try {
      console.log('📡 Запрос истории транзакций...');
      
      const response = await apiClient.get<TransactionHistory>('/transaction/my-history');
      
      console.log('✅ История транзакций получена:', {
        totalTransactions: response.data.totalTransactions,
        balance: response.data.balance,
        childName: response.data.childName
      });
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Ошибка получения истории транзакций:', error);
      
      if (useMockFallback) {
        console.warn('🔄 Используем mock данные для транзакций');
        return MOCK_TRANSACTION_HISTORY;
      }
      
      throw error;
    }
  }

  // Создание новой транзакции (если понадобится)
  static async createTransaction(transactionData: {
    amount: number;
    category: string;
    description?: string;
  }): Promise<TransactionHistory> {
    try {
      console.log('📡 Создание транзакции...');
      
      const response = await apiClient.post<TransactionHistory>('/transaction', transactionData);
      
      console.log('✅ Транзакция создана:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Ошибка создания транзакции:', error);
      throw error;
    }
  }
} 