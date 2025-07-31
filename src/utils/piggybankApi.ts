import axios from 'axios';

export interface PiggyBank {
  id: string;
  name: string;
  balance: number;
  photoPath: string;
  target: number;
  childId: string;
}

export interface PiggyBankResponse {
  childId: string;
  childName: string;
  piggybanks: PiggyBank[];
  totalPiggybanks: number;
}

class PiggyBankApi {
  private baseURL = 'http://192.168.0.135:4200';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNWYxMmRhLTgxOGQtNDgyNy1iN2NlLWJlZjE1M2Y0ZmRkZiIsImlhdCI6MTc1MzkwMzIwOSwiZXhwIjoxNzU0NTA4MDA5fQ.cUYEhaiPZa-EEDlQ_heJdrKHmf-3lWCYZ1lNP9WHb5w';

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Получить копилки пользователя
   */
  async getMyPiggyBanks(): Promise<PiggyBankResponse> {
    try {
      const response = await axios.get(`${this.baseURL}/api/piggybank/my`, {
        headers: this.getHeaders(),
      });
      
      console.log('PiggyBanks API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching piggy banks:', error);
      throw error;
    }
  }

  /**
   * Создать новую копилку
   */
  async createPiggyBank(data: {
    name: string;
    target: number;
    photoPath?: string;
  }): Promise<PiggyBank> {
    try {
      const response = await axios.post(`${this.baseURL}/api/piggybank`, data, {
        headers: this.getHeaders(),
      });
      
      console.log('Create piggy bank response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating piggy bank:', error);
      throw error;
    }
  }

  /**
   * Обновить копилку
   */
  async updatePiggyBank(id: string, data: {
    name?: string;
    target?: number;
    photoPath?: string;
  }): Promise<PiggyBank> {
    try {
      const response = await axios.put(`${this.baseURL}/api/piggybank/${id}`, data, {
        headers: this.getHeaders(),
      });
      
      console.log('Update piggy bank response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating piggy bank:', error);
      throw error;
    }
  }

  /**
   * Удалить копилку
   */
  async deletePiggyBank(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/api/piggybank/${id}`, {
        headers: this.getHeaders(),
      });
      
      console.log('Piggy bank deleted successfully');
    } catch (error) {
      console.error('Error deleting piggy bank:', error);
      throw error;
    }
  }

  /**
   * Пополнить копилку
   */
  async topUpPiggyBank(id: string, amount: number): Promise<PiggyBank> {
    try {
      const response = await axios.post(`${this.baseURL}/api/piggybank/${id}/topup`, {
        amount
      }, {
        headers: this.getHeaders(),
      });
      
      console.log('Top up piggy bank response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error topping up piggy bank:', error);
      throw error;
    }
  }
}

export const piggybankApi = new PiggyBankApi(); 