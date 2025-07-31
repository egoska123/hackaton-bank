# Обновление конвертации валюты

## Описание
Обновлена система работы с валютами для правильного отображения сумм в рублях вместо копеек.

## Проблема
API возвращает суммы в копейках, но пользователи должны видеть суммы в рублях.

### Пример данных с сервера:
```json
{
  "balance": 27500,  // 275 рублей в копейках
  "target": 50000    // 500 рублей в копейках
}
```

## Решение

### 1. Утилиты для работы с валютой (`src/utils/currencyUtils.ts`)

```typescript
// Конвертация копеек в рубли
export function kopeksToRubles(kopeks: number): number {
  return Math.round(kopeks / 100);
}

// Конвертация рублей в копейки
export function rublesToKopeks(rubles: number): number {
  return Math.round(rubles * 100);
}

// Форматирование с символом валюты
export function formatRubles(amount: number): string {
  return `${amount} ₽`;
}
```

### 2. Обновленный PiggyBankStore

#### Вычисляемые свойства:
```typescript
// Общий баланс в рублях
get totalBalance(): number {
  const balanceInKopeks = this.piggyBanks.reduce((total, piggyBank) => total + piggyBank.balance, 0);
  return convertKopeksToRubles(balanceInKopeks);
}

// Общая цель в рублях
get totalTarget(): number {
  const targetInKopeks = this.piggyBanks.reduce((total, piggyBank) => total + piggyBank.target, 0);
  return convertKopeksToRubles(targetInKopeks);
}
```

#### Методы конвертации:
```typescript
// Для API (рубли → копейки)
async createPiggyBank(data: { target: number }) {
  const targetInKopeks = this.rublesToKopeks(data.target);
  await piggybankApi.createPiggyBank({ ...data, target: targetInKopeks });
}

// Для UI (копейки → рубли)
kopeksToRubles(kopeks: number): number {
  return convertKopeksToRubles(kopeks);
}
```

### 3. Обновленные компоненты

#### PiggyBankScreen:
```typescript
<PiggyBankCard
  savedAmount={piggyBankStore.kopeksToRubles(bank.balance)}
  targetAmount={piggyBankStore.kopeksToRubles(bank.target)}
/>
```

#### TopUpPiggyBankModal:
```typescript
<Text style={styles.piggyBankAmount}>
  <Text style={styles.savedAmount}>{kopeksToRubles(piggyBank.balance)}</Text> 
  <Text style={styles.targetAmount}>{formatRubles(kopeksToRubles(piggyBank.target))}</Text>
</Text>
```

## Логика работы

### 🔄 Конвертация данных:

#### От сервера к UI:
```typescript
// Сервер: 27500 копеек
// UI: 275 рублей
const rubles = kopeksToRubles(27500); // 275
```

#### От UI к серверу:
```typescript
// UI: 500 рублей
// Сервер: 50000 копеек
const kopeks = rublesToKopeks(500); // 50000
```

### 📊 Примеры отображения:

#### Исходные данные:
```json
{
  "balance": 27500,  // копейки
  "target": 50000    // копейки
}
```

#### Отображение в UI:
```typescript
// Баланс: 275 ₽
// Цель: 500 ₽
// Прогресс: 55%
```

## API Endpoints

### Создание копилки:
```bash
POST /api/piggybank
{
  "name": "На велосипед",
  "target": 50000  // в копейках (500 рублей)
}
```

### Пополнение копилки:
```bash
POST /api/piggybank/{id}/topup
{
  "amount": 1000  // в копейках (10 рублей)
}
```

## Преимущества

### ✅ **Точность**
- Избегаем проблем с плавающей точкой
- Правильное округление сумм

### ✅ **Консистентность**
- Единообразное отображение во всех компонентах
- Централизованная логика конвертации

### ✅ **Производительность**
- Кэширование вычисляемых свойств
- Минимальные пересчеты

### ✅ **Читаемость**
- Понятные названия функций
- Документированная логика

## Тестирование

### Тестовые случаи:
```typescript
// Конвертация копеек в рубли
kopeksToRubles(27500) // 275
kopeksToRubles(100)   // 1
kopeksToRubles(50)    // 1 (округление)

// Конвертация рублей в копейки
rublesToKopeks(275)   // 27500
rublesToKopeks(1)     // 100
rublesToKopeks(0.5)   // 50 (округление)

// Форматирование
formatRubles(275)     // "275 ₽"
formatRubles(0)       // "0 ₽"
```

## Мониторинг

### Логирование:
```typescript
console.log('Balance in kopeks:', piggyBank.balance);
console.log('Balance in rubles:', kopeksToRubles(piggyBank.balance));
console.log('Formatted balance:', formatRubles(kopeksToRubles(piggyBank.balance)));
```

### Отладка:
- Проверка исходных данных с сервера
- Сравнение до и после конвертации
- Валидация форматирования

## Следующие шаги

### 🔄 Возможные улучшения:
1. **Локализация** - поддержка других валют
2. **Форматирование** - разделители тысяч
3. **Валидация** - проверка корректности сумм
4. **Кэширование** - кэш конвертаций

### 🎯 Цели:
- Полная интеграция с API
- Единообразное отображение валюты
- Улучшенный UX с понятными суммами 