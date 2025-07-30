# API Utilities

Эта папка содержит утилиты для работы с API сервером.

## Структура

### `api.ts`
Базовая конфигурация axios:
- Создает настроенный экземпляр axios
- Автоматически добавляет токен авторизации в заголовки
- Обрабатывает ошибки HTTP запросов
- Управляет JWT токенами

### `profileApi.ts`
API методы для работы с профилем пользователя:
- `getChildProfile()` - получение профиля ребенка
- `getParentProfile()` - получение профиля родителя  
- `updateBalance()` - обновление баланса
- `updateProfile()` - обновление данных профиля

### `transactionApi.ts`
API методы для работы с историей транзакций:
- `getTransactionHistory()` - получение истории транзакций ребенка
- `createTransaction()` - создание новой транзакции

### `index.ts`
Удобный экспорт всех утилит для импорта в других частях приложения.

## Использование

```typescript
import { ProfileApi, TransactionApi, setAuthToken } from '../utils';
import ProfileStore from '../stores/ProfileStore';
import TransactionStore from '../stores/TransactionStore';

// Установка токена
setAuthToken('your-jwt-token');

// Получение профиля
const profile = await ProfileApi.getChildProfile(true); // с fallback на mock данные

// Получение истории транзакций
const history = await TransactionApi.getTransactionHistory(true);

// Использование сторов
ProfileStore.fetchProfile();
TransactionStore.startPolling(); // автоматическое обновление каждые 30 секунд
```

## Конфигурация

Базовый URL API настраивается в файле `api.ts`:
```typescript
const API_BASE_URL = 'http://192.168.0.135:4200/api';
```

## Mock данные

При ошибках подключения к API можно использовать fallback на mock данные. Они настраиваются в:
- `profileApi.ts` в константе `MOCK_PROFILE`
- `transactionApi.ts` в константе `MOCK_TRANSACTION_HISTORY`

## Автоматическое обновление

TransactionStore поддерживает автоматическое обновление истории транзакций каждые 30 секунд:

```typescript
// Запуск автоматического обновления
TransactionStore.startPolling();

// Остановка автоматического обновления  
TransactionStore.stopPolling();

// Проверка статуса
console.log(TransactionStore.isPollingActive);
```

Polling автоматически запускается при монтировании MainScreen и останавливается при размонтировании. 