import { makeAutoObservable, action } from 'mobx';
import { TransactionHistory, TransactionDay, TransactionDayItem } from '../types/transaction.types';
import { TransactionApi } from '../utils/transactionApi';

// Интерфейс для компонента PurchaseHistoryDay
interface PurchaseItem {
  title: string;
  subtitle: string;
  amount: string;
}

interface PurchaseHistoryDay {
  dateTitle: string;
  items: PurchaseItem[];
}

class TransactionStore {
  history: TransactionHistory | null = null;
  loading = false;
  error: string | null = null;
  
  // Флаг для использования mock данных при ошибках API
  private useMockFallback = false;
  
  // Интервал для автоматического обновления
  private pollingInterval: NodeJS.Timeout | null = null;
  private readonly POLLING_INTERVAL = 30000; // 30 секунд
  
  // Флаг активности polling
  private _isPollingActive = false;
  
  // Флаг для "тихого" обновления (без показа лоадера)
  private _isSilentUpdate = false;

  constructor() {
    makeAutoObservable(this, {
      fetchTransactionHistory: action,
      startPolling: action,
      stopPolling: action,
      clearHistory: action,
      setMockFallback: action,
    });
  }

  // Загрузка истории транзакций
  async fetchTransactionHistory(silent: boolean = false) {
    if (!silent) {
      this.loading = true;
    } else {
      this._isSilentUpdate = true;
    }
    
    // Только очищаем ошибку при не-тихом обновлении
    if (!silent) {
      this.error = null;
    }

    try {
      const historyData = await TransactionApi.getTransactionHistory(this.useMockFallback);
      this.history = historyData;
      
      // Очищаем ошибку при успешном обновлении (даже при тихом)
      this.error = null;
    } catch (error) {
      // При тихом обновлении не перезаписываем старую ошибку новой
      if (!silent) {
        this.error = error instanceof Error ? error.message : 'Ошибка загрузки истории транзакций';
      }
      console.warn('Ошибка при обновлении транзакций:', error);
    } finally {
      if (!silent) {
        this.loading = false;
      } else {
        this._isSilentUpdate = false;
      }
    }
  }

  // Запуск автоматического обновления
  startPolling() {
    if (this._isPollingActive) {
      console.log('⚠️ Polling уже активен');
      return;
    }

    console.log('🔄 Запуск автоматического обновления транзакций каждые 30 секунд');
    
    // Первоначальная загрузка с показом лоадера
    this.fetchTransactionHistory(false);
    
    // Запускаем интервал для тихих обновлений
    this.pollingInterval = setInterval(() => {
      console.log('🔄 Тихое автоматическое обновление транзакций...');
      this.fetchTransactionHistory(true); // silent = true
    }, this.POLLING_INTERVAL);
    
    this._isPollingActive = true;
  }

  // Остановка автоматического обновления
  stopPolling() {
    if (this.pollingInterval) {
      console.log('⏹️ Остановка автоматического обновления транзакций');
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this._isPollingActive = false;
  }

  // Сброс данных
  clearHistory() {
    this.history = null;
    this.error = null;
    this.loading = false;
  }

  // Управление mock fallback
  setMockFallback(enabled: boolean) {
    this.useMockFallback = enabled;
  }

  // Геттеры
  get isMockFallbackEnabled() {
    return this.useMockFallback;
  }

  get isPollingActive() {
    return this._isPollingActive;
  }

  // Показывать ли лоадер пользователю (не показываем при тихом обновлении)
  get isVisibleLoading() {
    return this.loading && !this._isSilentUpdate;  
  }

  // Идет ли обновление в фоне
  get isSilentUpdating() {
    return this._isSilentUpdate;
  }

  get totalTransactions() {
    return this.history?.totalTransactions || 0;
  }

  get currentBalance() {
    // Конвертируем копейки в рубли
    return this.history?.balance ? Math.round(this.history.balance / 100) : 0;
  }

  // Группировка транзакций по дням для отображения
  get transactionsByDays(): TransactionDay[] {
    if (!this.history?.transactions) return [];

    const grouped: { [key: string]: TransactionDayItem[] } = {};

    this.history.transactions.forEach(transaction => {
      const date = new Date(transaction.createdAt);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Форматируем дату для отображения
      const dateTitle = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      const item: TransactionDayItem = {
        id: transaction.id,
        amount: Math.abs(Math.round(transaction.amount / 100)), // Конвертируем в рубли и берем абсолютное значение
        category: transaction.category,
        description: transaction.description || transaction.category,
        time: date.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isIncome: transaction.amount > 0
      };

      grouped[dateKey].push(item);
    });

    // Конвертируем в массив и сортируем по датам (новые сверху)
    return Object.keys(grouped)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map(dateKey => {
        const date = new Date(dateKey);
        const dateTitle = date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });

        return {
          dateTitle,
          items: grouped[dateKey].sort((a, b) => {
            // Сортируем по времени (новые сверху)
            const timeA = a.time.split(':').map(Number);
            const timeB = b.time.split(':').map(Number);
            return (timeB[0] * 60 + timeB[1]) - (timeA[0] * 60 + timeA[1]);
          })
        };
      });
  }

  // Адаптер для компонента PurchaseHistoryDay
  get purchaseHistoryByDays(): PurchaseHistoryDay[] {
    return this.transactionsByDays.map(day => ({
      dateTitle: day.dateTitle,
      items: day.items.map(item => ({
        title: item.category,
        subtitle: item.description || `${item.time}`,
        amount: `${item.isIncome ? '+' : '-'}${item.amount} ₽`
      }))
    }));
  }

  // Cleanup при размонтировании
  destroy() {
    this.stopPolling();
  }
}

export default new TransactionStore(); 