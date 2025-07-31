const { io } = require('socket.io-client');

// Тестовый токен
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNWYxMmRhLTgxOGQtNDgyNy1iN2NlLWJlZjE1M2Y0ZmRkZiIsImlhdCI6MTc1MzkwMzIwOSwiZXhwIjoxNzU0NTA4MDA5fQ.cUYEhaiPZa-EEDlQ_heJdrKHmf-3lWCYZ1lNP9WHb5w';

console.log('Testing connection to http://192.168.0.135:4200...');

const socket = io('http://192.168.0.135:4200', {
  auth: {
    token: token
  },
  transports: ['polling', 'websocket'],
  timeout: 20000
});

socket.on('connect', () => {
  console.log('✅ Connected successfully!');
  console.log('Socket ID:', socket.id);
});

socket.on('connected', (data) => {
  console.log('✅ Server confirmed connection:', data);
});

socket.on('advice', (data) => {
  console.log('📝 Advice received:', data);
});

socket.on('new_advice', (data) => {
  console.log('📝 New advice received:', data);
});

socket.on('message', (data) => {
  console.log('💬 Message received:', data);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected');
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error);
});

// Отправляем ping через 2 секунды
setTimeout(() => {
  console.log('Sending ping...');
  socket.emit('ping');
}, 2000);

// Отключаемся через 10 секунд
setTimeout(() => {
  console.log('Disconnecting...');
  socket.disconnect();
  process.exit(0);
}, 10000); 