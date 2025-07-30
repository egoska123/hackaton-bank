export interface Transaction {
  id: string;
  childId: string;
  amount: number; // в копейках, положительные - пополнения, отрицательные - траты
  category: string;
  createdAt: string;
  description: string;
}

export interface TransactionHistory {
  childId: string;
  childName: string;
  balance: number; // в копейках
  parent: {
    id: string;
    email: string;
    profile: {
      fullName: string;
    };
  };
  transactions: Transaction[];
  totalTransactions: number;
}

export interface TransactionState {
  history: TransactionHistory | null;
  loading: boolean;
  error: string | null;
}

// Группировка транзакций по дням
export interface TransactionDay {
  dateTitle: string;
  items: TransactionDayItem[];
}

export interface TransactionDayItem {
  id: string;
  amount: number; // уже в рублях
  category: string;
  description: string;
  time: string;
  isIncome: boolean; // true для пополнений, false для трат
} 