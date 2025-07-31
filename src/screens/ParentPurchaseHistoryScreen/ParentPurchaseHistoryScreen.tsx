import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import PurchaseHistoryDay from '../../components/PurchaseHistoryDay/PurchaseHistoryDay';
import { styles } from './ParentPurchaseHistoryScreen.styles';
import { mockPurchaseHistory } from '../../mocks/mockPurchaseHistory';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';

interface ParentPurchaseHistoryScreenProps {
  onBackToRoleSelection?: () => void;
  onBackToMain?: () => void;
}

const ParentPurchaseHistoryScreen = observer(({ onBackToRoleSelection, onBackToMain }: ParentPurchaseHistoryScreenProps) => {
  const [purchaseHistory, setPurchaseHistory] = useState(mockPurchaseHistory);

  // Добавляем данные для "Сегодня" как на фото
  useEffect(() => {
    const todayData = {
      dateTitle: 'Сегодня',
      items: [
        { title: 'Бабл тии', subtitle: 'Оплата товаров и услуг', amount: '148₽' },
      ],
    };
    
    // Добавляем "Сегодня" в начало списка
    setPurchaseHistory([todayData, ...mockPurchaseHistory]);
  }, []);

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
            <Text style={styles.pageTitle}>История покупок Никиты</Text>
          </View>

          {/* История покупок */}
          <View style={styles.historyContainer}>
            {purchaseHistory.map((day, index) => (
              <PurchaseHistoryDay
                key={index}
                dateTitle={day.dateTitle}
                items={day.items}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </GradientWrapper>
  );
});

export default ParentPurchaseHistoryScreen; 