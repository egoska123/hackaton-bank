import { makeAutoObservable } from 'mobx';
import { piggybankApi, PiggyBank, PiggyBankResponse } from '../utils/piggybankApi';

export class PiggyBankStore {
  piggyBanks: PiggyBank[] = [];
  childName: string = '';
  childId: string = '';
  totalPiggyBanks: number = 0;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Загрузить копилки пользователя
   */
  async loadPiggyBanks() {
    this.setLoading(true);
    this.setError(null);

    try {
      const response: PiggyBankResponse = await piggybankApi.getMyPiggyBanks();
      
      this.setPiggyBanks(response.piggybanks);
      this.setChildName(response.childName);
      this.setChildId(response.childId);
      this.setTotalPiggyBanks(response.totalPiggybanks);
      
      console.log('PiggyBanks loaded successfully:', response);
    } catch (error) {
      console.error('Error loading piggy banks:', error);
      this.setError('Ошибка загрузки копилок');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Создать новую копилку
   */
  async createPiggyBank(data: {
    name: string;
    target: number;
    photoPath?: string;
  }) {
    this.setLoading(true);
    this.setError(null);

    try {
      const newPiggyBank = await piggybankApi.createPiggyBank(data);
      this.addPiggyBank(newPiggyBank);
      this.setTotalPiggyBanks(this.totalPiggyBanks + 1);
      
      console.log('PiggyBank created successfully:', newPiggyBank);
      return newPiggyBank;
    } catch (error) {
      console.error('Error creating piggy bank:', error);
      this.setError('Ошибка создания копилки');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Обновить копилку
   */
  async updatePiggyBank(id: string, data: {
    name?: string;
    target?: number;
    photoPath?: string;
  }) {
    this.setLoading(true);
    this.setError(null);

    try {
      const updatedPiggyBank = await piggybankApi.updatePiggyBank(id, data);
      this.updatePiggyBankInList(updatedPiggyBank);
      
      console.log('PiggyBank updated successfully:', updatedPiggyBank);
      return updatedPiggyBank;
    } catch (error) {
      console.error('Error updating piggy bank:', error);
      this.setError('Ошибка обновления копилки');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Удалить копилку
   */
  async deletePiggyBank(id: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      await piggybankApi.deletePiggyBank(id);
      this.removePiggyBank(id);
      this.setTotalPiggyBanks(this.totalPiggyBanks - 1);
      
      console.log('PiggyBank deleted successfully');
    } catch (error) {
      console.error('Error deleting piggy bank:', error);
      this.setError('Ошибка удаления копилки');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Пополнить копилку
   */
  async topUpPiggyBank(id: string, amount: number) {
    this.setLoading(true);
    this.setError(null);

    try {
      const updatedPiggyBank = await piggybankApi.topUpPiggyBank(id, amount);
      this.updatePiggyBankInList(updatedPiggyBank);
      
      console.log('PiggyBank topped up successfully:', updatedPiggyBank);
      return updatedPiggyBank;
    } catch (error) {
      console.error('Error topping up piggy bank:', error);
      this.setError('Ошибка пополнения копилки');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Получить копилку по ID
   */
  getPiggyBankById(id: string): PiggyBank | undefined {
    return this.piggyBanks.find(piggyBank => piggyBank.id === id);
  }

  /**
   * Получить общий баланс всех копилок
   */
  get totalBalance(): number {
    return this.piggyBanks.reduce((total, piggyBank) => total + piggyBank.balance, 0);
  }

  /**
   * Получить общую цель всех копилок
   */
  get totalTarget(): number {
    return this.piggyBanks.reduce((total, piggyBank) => total + piggyBank.target, 0);
  }

  /**
   * Получить процент прогресса всех копилок
   */
  get totalProgress(): number {
    if (this.totalTarget === 0) return 0;
    return Math.round((this.totalBalance / this.totalTarget) * 100);
  }

  // Actions
  setPiggyBanks(piggyBanks: PiggyBank[]) {
    this.piggyBanks = piggyBanks;
  }

  setChildName(name: string) {
    this.childName = name;
  }

  setChildId(id: string) {
    this.childId = id;
  }

  setTotalPiggyBanks(total: number) {
    this.totalPiggyBanks = total;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  addPiggyBank(piggyBank: PiggyBank) {
    this.piggyBanks.push(piggyBank);
  }

  updatePiggyBankInList(updatedPiggyBank: PiggyBank) {
    const index = this.piggyBanks.findIndex(pb => pb.id === updatedPiggyBank.id);
    if (index !== -1) {
      this.piggyBanks[index] = updatedPiggyBank;
    }
  }

  removePiggyBank(id: string) {
    this.piggyBanks = this.piggyBanks.filter(pb => pb.id !== id);
  }

  clearError() {
    this.error = null;
  }
}

export const piggyBankStore = new PiggyBankStore(); 