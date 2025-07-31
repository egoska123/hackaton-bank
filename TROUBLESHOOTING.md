# Устранение проблем с WebSocket соединением

## Проблема: "WebSocket connection error"

### Возможные причины и решения:

#### 1. Сервер не запущен
**Решение:** Запустите тестовый сервер:
```bash
# Установите зависимости
npm install express socket.io

# Запустите простой сервер
node simple-websocket-server.js
```

#### 2. Неправильный порт
**Проверьте:** Сервер должен работать на порту 3000
```bash
# Проверьте, что порт 3000 свободен
netstat -an | grep :3000
```

#### 3. Проблемы с CORS
**Решение:** Используйте простой сервер `simple-websocket-server.js` вместо `test-websocket-server.js`

#### 4. Проблемы с JWT токеном
**Решение:** Простой сервер принимает любой токен для тестирования

## Пошаговая диагностика:

### Шаг 1: Проверьте сервер
```bash
# Запустите сервер
node simple-websocket-server.js

# Вы должны увидеть:
# Simple WebSocket server running on port 3000
# Server URL: http://localhost:3000
```

### Шаг 2: Проверьте подключение
Откройте браузер и перейдите на `http://localhost:3000`
Должен появиться JSON с информацией о сервере.

### Шаг 3: Проверьте API
```bash
# Проверьте подключенных пользователей
curl http://localhost:3000/websocket/connected-users

# Отправьте тестовый совет
curl -X POST http://localhost:3000/websocket/send-test-advice \
  -H "Content-Type: application/json" \
  -d '{"advice": "Тестовый совет!"}'
```

### Шаг 4: Проверьте приложение
1. Запустите приложение: `npm start`
2. Откройте консоль разработчика
3. Дождитесь сообщения "WebSocket connected successfully"

## Альтернативные решения:

### Решение 1: Использование локального IP
Если localhost не работает, попробуйте IP адрес:
```typescript
// В websocketService.ts
this.socket = io('http://192.168.1.100:3000', {
  // ... остальные настройки
});
```

### Решение 2: Отключение SSL проверки (только для разработки)
```typescript
// В websocketService.ts
this.socket = io('http://localhost:3000', {
  // ... остальные настройки
  rejectUnauthorized: false
});
```

### Решение 3: Использование polling вместо websocket
```typescript
// В websocketService.ts
this.socket = io('http://localhost:3000', {
  // ... остальные настройки
  transports: ['polling'] // Только polling
});
```

## Логи для диагностики:

### В консоли приложения должны быть:
```
WebSocket connected successfully
New advice received: {advice: "...", timestamp: "...", operation: "..."}
```

### В консоли сервера должны быть:
```
Simple WebSocket server running on port 3000
User test-user connected
Sent test advice to user: test-user
```

## Если ничего не помогает:

1. **Перезапустите сервер и приложение**
2. **Очистите кэш браузера/эмулятора**
3. **Проверьте файрвол и антивирус**
4. **Попробуйте другой порт** (например, 3001)

## Тестовый код для проверки:

```javascript
// В консоли браузера
const socket = io('http://localhost:3000', {
  auth: { token: 'test-token' }
});

socket.on('connect', () => {
  console.log('Connected!');
});

socket.on('new_advice', (data) => {
  console.log('Received advice:', data);
});
``` 