const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware для проверки JWT токена
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.userId} connected`);

  // Отправляем подтверждение подключения
  socket.emit('connected', {
    userId: socket.userId,
    message: 'Successfully connected to WebSocket server'
  });

  // Обработка ping
  socket.on('ping', () => {
    socket.emit('pong', { timestamp: new Date().toISOString() });
  });

  // Отправляем тестовый совет через 5 секунд после подключения
  setTimeout(() => {
    const testAdvice = {
      advice: 'Привет! Я заметил, что ты часто тратишь деньги на развлечения. Попробуй откладывать 10% от любого дохода - это поможет быстрее достичь твоих финансовых целей!',
      timestamp: new Date().toISOString(),
      operation: 'default'
    };
    
    socket.emit('new_advice', testAdvice);
    console.log('Sent test advice to user:', socket.userId);
  }, 5000);

  // Отправляем случайные советы каждые 30 секунд
  const adviceInterval = setInterval(() => {
    const advices = [
      {
        advice: 'Совет дня: Попробуй вести дневник трат! Это поможет понять, куда уходят твои деньги.',
        operation: 'transaction'
      },
      {
        advice: 'Не забудь про копилку! Даже мелочь имеет значение для достижения целей.',
        operation: 'default'
      },
      {
        advice: 'Сегодня хороший день для планирования бюджета на неделю!',
        operation: 'history'
      },
      {
        advice: 'Помни: каждая копейка приближает к цели! Не пренебрегай мелочами.',
        operation: 'transaction'
      },
      {
        advice: 'Отличная идея: поставь цель накопить определенную сумму к концу месяца!',
        operation: 'default'
      },
      {
        advice: 'Не забывай про скидки и акции при покупках - это поможет сэкономить!',
        operation: 'transaction'
      },
      {
        advice: 'Совет: Попробуй метод "конвертов" для разных категорий трат.',
        operation: 'history'
      },
      {
        advice: 'Хорошо, что ты следишь за своими финансами! Продолжай в том же духе!',
        operation: 'default'
      }
    ];
    
    const randomAdvice = advices[Math.floor(Math.random() * advices.length)];
    
    socket.emit('new_advice', {
      ...randomAdvice,
      timestamp: new Date().toISOString()
    });
    
    console.log('Sent random advice to user:', socket.userId);
  }, 30000);

  socket.on('disconnect', () => {
    console.log(`User ${socket.userId} disconnected`);
    clearInterval(adviceInterval);
  });
});

// API для отправки тестовых советов
app.use(express.json());

app.post('/websocket/send-test-advice', (req, res) => {
  const { advice, targetUserId } = req.body;
  
  if (!advice) {
    return res.status(400).json({ error: 'Advice text is required' });
  }

  const adviceData = {
    advice,
    timestamp: new Date().toISOString(),
    operation: 'default'
  };

  if (targetUserId) {
    // Отправляем конкретному пользователю
    const targetSocket = Array.from(io.sockets.sockets.values())
      .find(socket => socket.userId === targetUserId);
    
    if (targetSocket) {
      targetSocket.emit('new_advice', adviceData);
      res.json({ success: true, message: 'Advice sent to specific user' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    // Отправляем всем подключенным пользователям
    io.emit('new_advice', adviceData);
    res.json({ success: true, message: 'Advice sent to all connected users' });
  }
});

app.get('/websocket/connected-users', (req, res) => {
  const connectedUsers = Array.from(io.sockets.sockets.values())
    .map(socket => socket.userId);
  
  res.json({
    connectedUsers,
    totalConnected: connectedUsers.length
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  POST http://localhost:${PORT}/websocket/send-test-advice`);
  console.log(`  GET  http://localhost:${PORT}/websocket/connected-users`);
}); 