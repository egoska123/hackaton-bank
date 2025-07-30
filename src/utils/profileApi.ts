import { apiClient } from './api';
import { UserProfile } from '../types/profile.types';

// Mock данные для fallback
const MOCK_PROFILE: UserProfile = {
  id: "535f12da-818d-4827-b7ce-bef153f4fddf",
  name: "Мирослав",
  email: "child@test.com", 
  role: "CHILD",
  balance: 606500, // в копейках
  childId: "71d35053-ba1e-4a02-8052-019d5c1902f0",
  parent: {
    id: "d318accd-78dc-47af-9eca-9ab92d47ab4c",
    email: "parent@test.com",
    profile: {
      fullName: "Мирослав"
    }
  }
};

export class ProfileApi {
  // Получение профиля ребенка
  static async getChildProfile(useMockFallback: boolean = false): Promise<UserProfile> {
    try {
      console.log('📡 Запрос профиля ребенка...');
      
      const response = await apiClient.get<UserProfile>('/auth/me/child');
      
      console.log('✅ Профиль получен с сервера:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Ошибка получения профиля:', error);
      
      if (useMockFallback) {
        console.warn('🔄 Используем mock данные');
        return MOCK_PROFILE;
      }
      
      throw error;
    }
  }

  // Получение профиля родителя
  static async getParentProfile(): Promise<UserProfile> {
    try {
      console.log('📡 Запрос профиля родителя...');
      
      const response = await apiClient.get<UserProfile>('/auth/me/parent');
      
      console.log('✅ Профиль родителя получен:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Ошибка получения профиля родителя:', error);
      throw error;
    }
  }

  // Обновление баланса (если понадобится)
  static async updateBalance(newBalance: number): Promise<UserProfile> {
    try {
      console.log('📡 Обновление баланса...');
      
      const response = await apiClient.patch<UserProfile>('/profile/balance', {
        balance: newBalance
      });
      
      console.log('✅ Баланс обновлён:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Ошибка обновления баланса:', error);
      throw error;
    }
  }

  // Обновление профиля
  static async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      console.log('📡 Обновление профиля...');
      
      const response = await apiClient.patch<UserProfile>('/profile', profileData);
      
      console.log('✅ Профиль обновлён:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Ошибка обновления профиля:', error);
      throw error;
    }
  }
} 