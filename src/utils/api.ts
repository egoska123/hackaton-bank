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

// Хранилище токена в localStorage
const TOKEN_KEY = 'auth_token';

export const getAuthToken = (): string | null => {
  try {
    // Для React Native используем временное решение
    // В реальном приложении лучше использовать AsyncStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(TOKEN_KEY);
    }
    // Fallback для React Native
    return global.authToken || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const setAuthToken = (token: string | null): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (token) {
        window.localStorage.setItem(TOKEN_KEY, token);
      } else {
        window.localStorage.removeItem(TOKEN_KEY);
      }
    }
    // Fallback для React Native
    global.authToken = token;
    console.log('Auth token saved:', token ? 'Token saved' : 'Token cleared');
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

export const clearAuthToken = (): void => {
  setAuthToken(null);
}; 