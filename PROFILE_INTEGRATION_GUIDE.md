# Интеграция ProfileStore в экраны

## Описание
Интеграция ProfileStore для загрузки данных профиля пользователя из API во всех экранах приложения.

## Обновленные экраны

### 1. PiggyBankScreen ✅
- **Файл**: `src/screens/PiggyBankScreen/PiggyBankScreen.tsx`
- **Изменения**:
  - Добавлен импорт `ProfileStore`
  - Header использует `ProfileStore.firstName` и `ProfileStore.lastName`
  - Автоматическая загрузка профиля при монтировании

### 2. TasksScreen ✅
- **Файл**: `src/screens/TasksScreen/TasksScreen.tsx`
- **Изменения**:
  - Добавлен импорт `ProfileStore` и `observer`
  - Компонент обернут в `observer()` для реактивности
  - Header использует данные из ProfileStore
  - Автоматическая загрузка профиля при монтировании
  - Исправлены ошибки TypeScript

## ProfileStore API

### Основные геттеры:
```typescript
// Имя пользователя
ProfileStore.firstName  // string

// Фамилия родителя
ProfileStore.lastName   // string

// Баланс в рублях
ProfileStore.balance    // number

// Роль пользователя
ProfileStore.isChild    // boolean
```

### Методы:
```typescript
// Загрузить профиль с сервера
ProfileStore.fetchProfile()

// Обновить профиль
ProfileStore.updateProfile(profileData)

// Обновить баланс
ProfileStore.updateBalance(newBalance)

// Выйти из аккаунта
ProfileStore.logout()
```

## Структура данных

### UserProfile:
```typescript
{
  id: string;
  name: string;
  role: 'CHILD' | 'PARENT';
  balance: number; // в копейках
  parent?: {
    profile: {
      fullName: string;
    };
  };
}
```

## Автоматическая загрузка

### Паттерн использования:
```typescript
const Screen = observer(() => {
  useEffect(() => {
    if (!ProfileStore.profile) {
      ProfileStore.fetchProfile();
    }
  }, []);

  return (
    <Header
      firstName={ProfileStore.firstName}
      lastName={ProfileStore.lastName}
      photoUri="https://example.com/avatar.jpg"
    />
  );
});
```

## Состояния загрузки

### ProfileStore состояния:
- `ProfileStore.loading` - идет загрузка
- `ProfileStore.error` - ошибка загрузки
- `ProfileStore.profile` - данные профиля

### Обработка состояний:
```typescript
// Показ загрузки
{ProfileStore.loading && <ActivityIndicator />}

// Показ ошибки
{ProfileStore.error && <Text>{ProfileStore.error}</Text>}

// Показ данных
{ProfileStore.profile && <Header firstName={ProfileStore.firstName} />}
```

## Интеграция с Header

### Обновленный Header:
```typescript
<Header
  firstName={ProfileStore.firstName}  // Вместо хардкода
  lastName={ProfileStore.lastName}    // Вместо хардкода
  photoUri="https://example.com/avatar.jpg"
/>
```

## Преимущества интеграции

### ✅ Централизованное управление:
- Все данные профиля в одном месте
- Автоматическая синхронизация между экранами
- Единая точка обновления данных

### ✅ Реактивность:
- Автоматическое обновление UI при изменении данных
- Использование MobX для реактивного состояния

### ✅ Обработка ошибок:
- Централизованная обработка ошибок API
- Fallback на mock данные при необходимости

### ✅ Производительность:
- Кэширование данных профиля
- Загрузка только при необходимости

## Следующие шаги

### 🔄 Планируемые обновления:
1. **MainScreen** - интеграция ProfileStore
2. **ChatScreen** - использование данных профиля
3. **Настройки** - редактирование профиля
4. **Аватар** - загрузка реального фото профиля

### 🎯 Цели:
- Полная интеграция всех экранов с API
- Единообразное отображение данных пользователя
- Улучшенный UX с реальными данными

## Тестирование

### Проверка работы:
1. Запустите приложение
2. Перейдите на экран копилок
3. Перейдите на экран задач
4. Проверьте отображение имени в Header
5. Убедитесь, что данные загружаются с сервера

### Отладка:
```typescript
// В консоли браузера
console.log('Profile:', ProfileStore.profile);
console.log('Loading:', ProfileStore.loading);
console.log('Error:', ProfileStore.error);
``` 