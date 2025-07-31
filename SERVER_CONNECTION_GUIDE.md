# Подключение к существующему серверу

## Сервер
- **Адрес:** `http://192.168.0.135:4200`
- **Токен:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNWYxMmRhLTgxOGQtNDgyNy1iN2NlLWJlZjE1M2Y0ZmRkZiIsImlhdCI6MTc1MzkwMzIwOSwiZXhwIjoxNzU0NTA4MDA5fQ.cUYEhaiPZa-EEDlQ_heJdrKHmf-3lWCYZ1lNP9WHb5w`

## Тестирование подключения

### 1. Проверьте подключение к серверу
```bash
# Установите socket.io-client если нужно
npm install socket.io-client

# Запустите тест
node test-connection.js
```

### 2. Ожидаемые результаты
При успешном подключении вы должны увидеть:
```
Testing connection to http://192.168.0.135:4200...
✅ Connected successfully!
Socket ID: [socket-id]
✅ Server confirmed connection: [data]
```

### 3. Если есть ошибки
- Проверьте, что сервер запущен на `192.168.0.135:4200`
- Убедитесь, что токен валидный
- Проверьте сетевую доступность

## События сервера

### Поддерживаемые события:
- `connected` - подтверждение подключения
- `advice` - получение совета
- `new_advice` - новый совет (альтернативное название)
- `message` - сообщение в чате
- `pong` - ответ на ping

### Отправляемые события:
- `ping` - проверка соединения

## Настройка приложения

Приложение уже настроено для работы с вашим сервером:

1. **WebSocketService** - подключается к `http://192.168.0.135:4200`
2. **AdviceStore** - слушает события `advice` и `new_advice`
3. **ChatScreen** - готов к получению сообщений

## Проверка работы

1. Запустите приложение: `npm start`
2. Откройте консоль разработчика
3. Дождитесь сообщения "WebSocket connected successfully"
4. При получении совета появится уведомление

## Отладка

### В консоли приложения должны быть:
```
WebSocket connected successfully
Advice received: {advice: "...", timestamp: "...", operation: "..."}
```

### Если проблемы:
1. Проверьте IP адрес сервера
2. Убедитесь, что порт 4200 доступен
3. Проверьте валидность токена
4. Убедитесь, что сервер отправляет события `advice` или `new_advice` 