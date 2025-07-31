# Интеграция API копилок

## Описание
Интеграция с API для работы с копилками пользователей через эндпоинт `/api/piggybank/my`.

## API Endpoints

### GET /api/piggybank/my
Получить копилки пользователя

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Response:**
```json
{
  "childId": "71d35053-ba1e-4a02-8052-019d5c1902f0",
  "childName": "Мирослав",
  "piggybanks": [
    {
      "id": "99c4bf6e-cef2-452a-8cb3-60a8f3e38393",
      "name": "На велосипед",
      "balance": 27500,
      "photoPath": "/uploads/defaultPhoto.png",
      "target": 50000,
      "childId": "71d35053-ba1e-4a02-8052-019d5c1902f0"
    }
  ],
  "totalPiggybanks": 1
}
```

## Компоненты

### 1. PiggyBankApi (`src/utils/piggybankApi.ts`)
- HTTP клиент для работы с API
- Методы для CRUD операций с копилками
- Обработка ошибок и логирование

### 2. PiggyBankStore (`src/stores/PiggyBankStore.ts`)
- MobX store для управления состоянием
- Автоматическая синхронизация с API
- Вычисляемые свойства (общий баланс, прогресс)

### 3. Обновленный PiggyBankScreen
- Интеграция с PiggyBankStore
- Состояния загрузки, ошибок и пустого списка
- Реальные данные вместо моков

## Функциональность

### ✅ Реализовано:
- Загрузка копилок с сервера
- Создание новых копилок
- Пополнение копилок
- Обновление копилок
- Удаление копилок
- Обработка ошибок
- Состояния загрузки

### 🔄 Состояния UI:
- **Загрузка** - ActivityIndicator с текстом
- **Ошибка** - сообщение об ошибке с кнопкой повтора
- **Пустой список** - приветственное сообщение
- **Список копилок** - отображение всех копилок

## Использование

### Загрузка копилок:
```typescript
// Автоматически при монтировании компонента
useEffect(() => {
  piggyBankStore.loadPiggyBanks();
}, []);
```

### Создание копилки:
```typescript
await piggyBankStore.createPiggyBank({
  name: 'Новая копилка',
  target: 10000,
  photoPath: '/uploads/defaultPhoto.png'
});
```

### Пополнение копилки:
```typescript
await piggyBankStore.topUpPiggyBank(piggyBankId, amount);
```

### Получение данных:
```typescript
// Все копилки
const piggyBanks = piggyBankStore.piggyBanks;

// Общий баланс
const totalBalance = piggyBankStore.totalBalance;

// Общий прогресс
const progress = piggyBankStore.totalProgress;
```

## Структура данных

### PiggyBank:
```typescript
{
  id: string;           // Уникальный идентификатор
  name: string;         // Название копилки
  balance: number;      // Текущий баланс
  photoPath: string;    // Путь к изображению
  target: number;       // Целевая сумма
  childId: string;      // ID ребенка
}
```

### PiggyBankResponse:
```typescript
{
  childId: string;           // ID ребенка
  childName: string;         // Имя ребенка
  piggybanks: PiggyBank[];   // Массив копилок
  totalPiggybanks: number;   // Общее количество
}
```

## Обработка ошибок

### Типы ошибок:
- **Сетевые ошибки** - проблемы с подключением
- **Ошибки авторизации** - невалидный токен
- **Ошибки валидации** - некорректные данные
- **Серверные ошибки** - проблемы на сервере

### UI для ошибок:
- Показ сообщения об ошибке
- Кнопка повтора операции
- Автоматическое скрытие при успехе

## Мониторинг

### Логирование:
- Все API запросы логируются
- Ошибки записываются в консоль
- Успешные операции отмечаются

### Метрики:
- Время загрузки копилок
- Количество ошибок
- Успешность операций

## Тестирование

### Тестовые данные:
```json
{
  "childId": "71d35053-ba1e-4a02-8052-019d5c1902f0",
  "childName": "Мирослав",
  "piggybanks": [
    {
      "id": "99c4bf6e-cef2-452a-8cb3-60a8f3e38393",
      "name": "На велосипед",
      "balance": 27500,
      "photoPath": "/uploads/defaultPhoto.png",
      "target": 50000,
      "childId": "71d35053-ba1e-4a02-8052-019d5c1902f0"
    }
  ],
  "totalPiggybanks": 1
}
```

### Проверка работы:
1. Запустите приложение
2. Перейдите на экран копилок
3. Дождитесь загрузки данных
4. Проверьте отображение копилки
5. Попробуйте создать новую копилку
6. Попробуйте пополнить существующую 