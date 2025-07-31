import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import { styles } from './ParentMainScreen.styles';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import PercentIcon from '../../../assets/icons/PercentIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import BusIcon from '../../../assets/icons/BusIcon';
import ClockIcon from '../../../assets/icons/ClockIcon';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import ProfileStore from '../../stores/ProfileStore';
import ParentPiggyBankScreen from '../ParentPiggyBankScreen/ParentPiggyBankScreen';
import ParentPurchaseHistoryScreen from '../ParentPurchaseHistoryScreen/ParentPurchaseHistoryScreen';
import ParentTasksScreen from '../ParentTasksScreen/ParentTasksScreen';

interface ParentMainScreenProps {
  onBackToRoleSelection?: () => void;
}

const ParentMainScreen = observer(({ onBackToRoleSelection }: ParentMainScreenProps) => {
  const [balance, setBalance] = useState(1000); // Баланс в рублях
  const [showPiggyBanks, setShowPiggyBanks] = useState(false);
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  // Загружаем профиль при монтировании компонента
  useEffect(() => {
    if (!ProfileStore.profile) {
      ProfileStore.fetchProfile();
    }
  }, []);

  const handleTopUp = () => {
    // Логика пополнения баланса
    console.log('Пополнить баланс');
  };

  const handlePiggyBanks = () => {
    // Переход к копилкам
    setShowPiggyBanks(true);
  };

  const handlePurchaseHistory = () => {
    // Переход к истории покупок
    setShowPurchaseHistory(true);
  };

  const handleTasks = () => {
    // Переход к делам
    setShowTasks(true);
  };

  const handleSettings = () => {
    // Переход к выбору ролей
    if (onBackToRoleSelection) {
      onBackToRoleSelection();
    }
  };

  const handleBackFromPiggyBanks = () => {
    setShowPiggyBanks(false);
  };

  const handleBackFromPurchaseHistory = () => {
    setShowPurchaseHistory(false);
  };

  const handleBackFromTasks = () => {
    setShowTasks(false);
  };

  // Показываем страницу копилок
  if (showPiggyBanks) {
    return (
      <ParentPiggyBankScreen 
        onBackToRoleSelection={onBackToRoleSelection}
        onBackToMain={handleBackFromPiggyBanks}
      />
    );
  }

  // Показываем страницу истории покупок
  if (showPurchaseHistory) {
    return (
      <ParentPurchaseHistoryScreen 
        onBackToRoleSelection={onBackToRoleSelection}
        onBackToMain={handleBackFromPurchaseHistory}
      />
    );
  }

  // Показываем страницу заданий
  if (showTasks) {
    return (
      <ParentTasksScreen 
        onBackToRoleSelection={onBackToRoleSelection}
        onBackToMain={handleBackFromTasks}
      />
    );
  }

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Заголовок с шестеренкой */}
          <View style={styles.headerSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Детская карта</Text>
              <Text style={styles.subtitle}>Никиты</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
              <SettingsIcon />
            </TouchableOpacity>
          </View>

          {/* Карта с балансом */}
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={['#50B848', '#F4CF49']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.card}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconContainer}>
                  <PercentIcon />
                </View>
                <Text style={styles.balanceLabel}>Баланс</Text>
                <Text style={styles.balanceAmount}>{balance} ₽</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardNumber}>**4366</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Кнопки в стиле детской главной страницы */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.topUpButton} onPress={handleTopUp}>
              <Text style={styles.topUpText}>Пополнить</Text>
              <ArrowRightIcon />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={handlePiggyBanks}>
              <Text style={styles.navButtonText}>Копилки</Text>
              <BusIcon />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={handlePurchaseHistory}>
              <Text style={styles.navButtonText}>История покупок</Text>
              <ClockIcon />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={handleTasks}>
              <Text style={styles.navButtonText}>Дела</Text>
              <ClockIcon />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </GradientWrapper>
  );
});

export default ParentMainScreen; 