import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import PiggyBankCard from '../../components/PiggyBankCard/PiggyBankCard';
import { styles } from './ParentPiggyBankScreen.styles';
import AddPiggyBankModal from '../../components/AddPiggyBankModal/AddPiggyBankModal';
import TopUpPiggyBankModal from '../../components/TopUpPiggyBankModal/TopUpPiggyBankModal';
import { piggyBankStore } from '../../stores/PiggyBankStore';
import { PiggyBank } from '../../utils/piggybankApi';
import ProfileStore from '../../stores/ProfileStore';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';

interface ParentPiggyBankScreenProps {
  onBackToRoleSelection?: () => void;
  onBackToMain?: () => void;
}

const ParentPiggyBankScreen = observer(({ onBackToRoleSelection, onBackToMain }: ParentPiggyBankScreenProps) => {
  const [isAddPiggyBankModalVisible, setAddPiggyBankModalVisible] = useState(false);
  const [isTopUpModalVisible, setTopUpModalVisible] = useState(false);
  const [selectedPiggyBank, setSelectedPiggyBank] = useState<PiggyBank | null>(null);

  // Загружаем копилки при монтировании компонента
  useEffect(() => {
    piggyBankStore.loadPiggyBanks();
  }, []);

  const handleAddPiggyBank = async (newPiggyBank: {
    title: string;
    targetAmount: number;
    imageSource?: any;
  }) => {
    try {
      await piggyBankStore.createPiggyBank({
        name: newPiggyBank.title,
        target: newPiggyBank.targetAmount,
        photoPath: newPiggyBank.imageSource ? '/uploads/defaultPhoto.png' : undefined,
      });
      setAddPiggyBankModalVisible(false);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать копилку');
    }
  };

  const handlePiggyBankPress = (piggyBank: PiggyBank) => {
    setSelectedPiggyBank(piggyBank);
    setTopUpModalVisible(true);
  };

  const handleTopUp = async (amount: number) => {
    if (selectedPiggyBank) {
      try {
        await piggyBankStore.topUpPiggyBank(selectedPiggyBank.id, amount);
        setTopUpModalVisible(false);
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось пополнить копилку');
      }
    }
  };

  const handleSettings = () => {
    // Переход к выбору ролей
    if (onBackToRoleSelection) {
      onBackToRoleSelection();
    }
  };

  const handleBackToMain = () => {
    // Возврат на главную страницу
    if (onBackToMain) {
      onBackToMain();
    }
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Верхний заголовок с "Детская карта Никиты" и шестеренкой */}
          <View style={styles.topHeaderSection}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Детская карта</Text>
              <Text style={styles.cardSubtitle}>Никиты</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
              <SettingsIcon />
            </TouchableOpacity>
          </View>

          {/* Заголовок страницы с кнопкой назад */}
          <View style={styles.pageHeaderSection}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToMain}>
              <ArrowLeftIcon />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Копилка</Text>
          </View>

          {piggyBankStore.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Загрузка копилок...</Text>
            </View>
          ) : piggyBankStore.error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{piggyBankStore.error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => piggyBankStore.loadPiggyBanks()}
              >
                <Text style={styles.retryButtonText}>Повторить</Text>
              </TouchableOpacity>
            </View>
          ) : piggyBankStore.piggyBanks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>У вас пока нет копилок</Text>
              <Text style={styles.emptySubtext}>Создайте первую копилку</Text>
            </View>
          ) : (
            piggyBankStore.piggyBanks.map((bank, index) => (
              <PiggyBankCard
                key={bank.id}
                title={bank.name}
                savedAmount={piggyBankStore.kopeksToRubles(bank.balance)}
                targetAmount={piggyBankStore.kopeksToRubles(bank.target)}
                imageSource={require('../../../assets/images/image 23.png')} // Используем дефолтное изображение
                onPress={() => handlePiggyBankPress(bank)}
              />
            ))
          )}

          <AddPiggyBankModal
            isVisible={isAddPiggyBankModalVisible}
            onClose={() => setAddPiggyBankModalVisible(false)}
            onAddPiggyBank={handleAddPiggyBank}
          />

          {selectedPiggyBank && (
            <TopUpPiggyBankModal
              isVisible={isTopUpModalVisible}
              onClose={() => setTopUpModalVisible(false)}
              piggyBank={selectedPiggyBank}
              onTopUp={handleTopUp}
            />
          )}
        </ScrollView>
      </View>
    </GradientWrapper>
  );
});

export default ParentPiggyBankScreen; 