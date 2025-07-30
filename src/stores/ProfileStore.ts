import { makeAutoObservable, action } from 'mobx';
import { UserProfile } from '../types/profile.types';
import { ProfileApi } from '../utils/profileApi';
import { setAuthToken, getAuthToken, clearAuthToken } from '../utils/api';

class ProfileStore {
  profile: UserProfile | null = null;
  loading = false;
  error: string | null = null;
  
  // Флаг для использования mock данных при ошибках API
  private useMockFallback = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProfile = action(async () => {
    this.loading = true;
    this.error = null;

    try {
      const profileData = await ProfileApi.getChildProfile(this.useMockFallback);
      this.profile = profileData;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Произошла ошибка';
    } finally {
      this.loading = false;
    }
  })

  setJwtToken = action((token: string) => {
    setAuthToken(token);
    // Перезагружаем профиль с новым токеном
    this.fetchProfile();
  })

  // Геттер для получения текущего токена (для отладки)
  get currentToken() {
    return getAuthToken();
  }

  // Очистка авторизации
  logout = action(() => {
    clearAuthToken();
    this.clearProfile();
  })

  // Сброс данных профиля (для выхода из аккаунта)
  clearProfile = action(() => {
    this.profile = null;
    this.error = null;
    this.loading = false;
  })

  // Обновление баланса
  updateBalance = action(async (newBalance: number) => {
    this.loading = true;
    this.error = null;

    try {
      const updatedProfile = await ProfileApi.updateBalance(newBalance);
      this.profile = updatedProfile;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Ошибка обновления баланса';
    } finally {
      this.loading = false;
    }
  })

  // Обновление профиля
  updateProfile = action(async (profileData: Partial<UserProfile>) => {
    this.loading = true;
    this.error = null;

    try {
      const updatedProfile = await ProfileApi.updateProfile(profileData);
      this.profile = updatedProfile;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Ошибка обновления профиля';
    } finally {
      this.loading = false;
    }
  })

  // Управление mock fallback
  setMockFallback = action((enabled: boolean) => {
    this.useMockFallback = enabled;
  })

  get isMockFallbackEnabled() {
    return this.useMockFallback;
  }

  get firstName() {
    return this.profile?.name || '';
  }

  get lastName() {
    return this.profile?.parent?.profile?.fullName || '';
  }

  get balance() {
    // Конвертируем копейки в рубли
    return this.profile?.balance ? Math.round(this.profile.balance / 100) : 0;
  }

  get isChild() {
    return this.profile?.role === 'CHILD';
  }
}

export default new ProfileStore();
