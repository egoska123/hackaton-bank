# WebSocket System для KidBank

## Описание
WebSocket система для real-time отправки советов пользователям при обновлении данных ИИ.

## Функциональность
- JWT аутентификация через WebSocket
- Real-time отправка советов конкретным пользователям
- Автоматическое уведомление при создании транзакций и просмотре истории
- API для тестирования подключений

## Подключение клиента

### JavaScript/Frontend
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: 'YOUR_JWT_TOKEN'
  }
});

// Подтверждение подключения
socket.on('connected', (data) => {
  console.log('Connected:', data);
});

// Получение нового совета
socket.on('new_advice', (data) => {
  console.log('New advice:', data.advice);
  console.log('Timestamp:', data.timestamp);
});

// Ping-pong для проверки соединения
socket.emit('ping');
socket.on('pong', (data) => {
  console.log('Pong received:', data);
});
```

### React Hook пример
```javascript
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useWebSocket = (token) => {
  const [socket, setSocket] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const newSocket = io('http://localhost:3000', {
      auth: { token }
    });

    newSocket.on('connected', () => setConnected(true));
    newSocket.on('new_advice', (data) => setAdvice(data));
    newSocket.on('disconnect', () => setConnected(false));

    setSocket(newSocket);

    return () => newSocket.close();
  }, [token]);

  return { socket, advice, connected };
};
```

## API Endpoints

### POST /websocket/send-test-advice
Отправить тестовый совет пользователю (для разработки/тестирования)

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "advice": "Рекомендую сократить траты на развлечения",
  "targetUserId": "optional-user-id" // если не указан, отправится текущему пользователю
}
```

### GET /websocket/connected-users
Получить список подключенных пользователей

**Response:**
```json
{
  "connectedUsers": ["user-id-1", "user-id-2"],
  "totalConnected": 2
}
```

## События WebSocket

### Клиент → Сервер
- `ping` - проверка соединения

### Сервер → Клиент
- `connected` - подтверждение подключения
- `new_advice` - новый совет от ИИ
- `pong` - ответ на ping

## Автоматические уведомления

Советы автоматически отправляются пользователям в следующих случаях:

1. **При создании транзакции** (`operation: 'transaction'`)
2. **При просмотре истории** (`operation: 'history'`)
3. **При других обращениях к ИИ** (`operation: 'default'`)

## Безопасность

- JWT токен проверяется при подключении
- Пользователи получают только свои советы
- Автоматическое отключение при невалидном токене
- Логирование всех подключений и событий

## Примеры использования

### 1. Подключение и получение советов
```javascript
const socket = io('http://localhost:3000', {
  auth: { token: localStorage.getItem('jwt_token') }
});

socket.on('new_advice', (data) => {
  // Показать уведомление пользователю
  showNotification(data.advice);
});
```

### 2. Интеграция с React компонентом
```jsx
function AdviceNotifications() {
  const token = useAuthToken();
  const { advice, connected } = useWebSocket(token);

  useEffect(() => {
    if (advice) {
      toast.success(advice.advice);
    }
  }, [advice]);

  return (
    <div>
      <div>Status: {connected ? 'Connected' : 'Disconnected'}</div>
      {advice && (
        <div className="advice-notification">
          {advice.advice}
        </div>
      )}
    </div>
  );
}
```

## Debugging

Для отладки можно использовать браузерные инструменты разработчика:

```javascript
// В консоли браузера
socket.on('connect', () => console.log('Connected to WebSocket'));
socket.on('disconnect', () => console.log('Disconnected from WebSocket'));
socket.on('new_advice', (data) => console.log('Received advice:', data));
``` 