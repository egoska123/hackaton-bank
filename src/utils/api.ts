import axios from 'axios';

// Базовая конфигурация API
const API_BASE_URL = 'http://192.168.0.135:4200/api';

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена авторизации
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Можно добавить обработку различных статусов ошибок
    if (error.response?.status === 401) {
      // Обработка ошибки авторизации
      console.warn('Unauthorized access - token may be expired');
    }
    
    return Promise.reject(error);
  }
);

// Временное хранилище токена (позже можно заменить на AsyncStorage или другое решение)
let authToken: string | null = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNWYxMmRhLTgxOGQtNDgyNy1iN2NlLWJlZjE1M2Y0ZmRkZiIsImlhdCI6MTc1Mzg5NjU5NywiZXhwIjoxNzU0NTAxMzk3fQ.kuEmb7gAauDRt7AuQEj54J0gfaiPUkv6m3h6-M4PsDM';

export const getAuthToken = (): string | null => authToken;

export const setAuthToken = (token: string | null): void => {
  authToken = token;
};

export const clearAuthToken = (): void => {
  authToken = null;
}; 