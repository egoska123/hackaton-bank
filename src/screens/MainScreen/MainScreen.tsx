import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, Dimensions, Vibration, Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header/Header';
import { styles } from './MainScreen.styles';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import Card from '../../components/Card/Card';
import ClockIcon from '../../../assets/icons/ClockIcon';
import PurchaseHistoryDay from '../../components/PurchaseHistoryDay/PurchaseHistoryDay';
import { ScrollView } from 'react-native-gesture-handler';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import ProfileStore from '../../stores/ProfileStore';
import TransactionStore from '../../stores/TransactionStore';
import ChatIcon from '../../../assets/icons/ChatIcon';

interface Props {
  navigation: any;
  openChat?: () => void;
  onBackToRoleSelection?: () => void;
}

const MainScreen = observer(({ navigation, openChat, onBackToRoleSelection }: Props) => {
  const [showHistory, setShowHistory] = useState(false);
  


  useEffect(() => {
    // Загружаем данные профиля при монтировании компонента
    ProfileStore.fetchProfile();
    
    // Включаем mock fallback для разработки
    TransactionStore.setMockFallback(true);
    
    // Запускаем автоматическое обновление транзакций
    TransactionStore.startPolling();
    
    // Cleanup при размонтировании
    return () => {
      TransactionStore.stopPolling();
    };
  }, []);

  // Функция для обновления данных при pull-to-refresh
  const onRefresh = useCallback(async () => {
    try {
      // Обновляем и профиль и историю транзакций
      await Promise.all([
        ProfileStore.fetchProfile(),
        TransactionStore.fetchTransactionHistory(false) // Явно показываем лоадер при pull-to-refresh
      ]);
      
      // Тактильная обратная связь при успешном обновлении
      if (Platform.OS === 'ios') {
        // На iOS используем легкую вибрацию
        Vibration.vibrate(50);
      } else {
        // На Android используем короткую вибрацию
        Vibration.vibrate(100);
      }
      
      // Небольшая задержка для лучшего UX (показываем индикатор минимум 300мс)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('✅ Данные профиля и истории транзакций обновлены через pull-to-refresh');
    } catch (error) {
      console.error('❌ Ошибка при обновлении через pull-to-refresh:', error);
      
      // Более заметная вибрация при ошибке
      if (Platform.OS === 'ios') {
        Vibration.vibrate([0, 100, 50, 100]);
      } else {
        Vibration.vibrate([0, 200, 100, 200]);
      }
    }
  }, []);

  // RefreshControl компонент для переиспользования
  const refreshControl = (
    <RefreshControl
      refreshing={ProfileStore.loading || TransactionStore.isVisibleLoading}
      onRefresh={onRefresh}
      tintColor="#666666" // Серовато-темный цвет индикатора на iOS
      colors={['#666666']} // Серовато-темный цвет индикатора на Android
      progressBackgroundColor="rgba(102,102,102,0.1)" // Серовато-темный фон индикатора на Android
    />
  );

  // Получаем высоту экрана для минимальной высоты контента
  const screenHeight = Dimensions.get('window').height;

  // Показываем загрузку если данные еще не загружены
  if (ProfileStore.loading && !ProfileStore.profile) {
    return (
      <GradientWrapper>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: 'white', fontSize: 16 }}>Загрузка...</Text>
        </View>
      </GradientWrapper>
    );
  }

  // Показываем ошибку если не удалось загрузить данные
  if (ProfileStore.error && !ProfileStore.profile) {
    return (
      <GradientWrapper>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            Ошибка загрузки данных: {ProfileStore.error}
          </Text>
          <TouchableOpacity 
            onPress={() => ProfileStore.fetchProfile()}
            style={{ marginTop: 20, padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 }}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Повторить</Text>
          </TouchableOpacity>
        </View>
      </GradientWrapper>
    );
  }

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <Header
          firstName={ProfileStore.firstName}
          lastName={ProfileStore.lastName}
          photoUri="https://example.com/avatar.jpg"
          onBackToRoleSelection={onBackToRoleSelection}
        />

        {!showHistory ? (
          <ScrollView
            style={styles.main}
            contentContainerStyle={{ 
              flexGrow: 1,
              minHeight: screenHeight * 0.7 // Минимальная высота для работы pull-to-refresh
            }}
            refreshControl={refreshControl}
            showsVerticalScrollIndicator={false}
          >
            <Card balance={ProfileStore.balance} />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendText}>Отправить</Text>
                <ArrowRightIcon />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.chatButton}
                onPress={openChat}
              >
                <Text style={styles.chatText}>Чат с Тошей</Text>
                <ChatIcon width={20} height={21} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.historyButton}
                onPress={() => setShowHistory(true)}
              >
                <Text style={styles.historyText}>История покупок</Text>
                <ClockIcon />
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.history}>
            <View style={styles.historyTitle}>
              <TouchableOpacity
                style={styles.aroowLCont}
                onPress={() => setShowHistory(false)}
              >
                <ArrowLeftIcon />
              </TouchableOpacity>
              <Text style={styles.historyTitleText}>История покупок</Text>
            </View>

            <ScrollView
              refreshControl={refreshControl}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scv}
            >
              {/* Индикатор тихого обновления (только для разработки) */}
              {TransactionStore.isSilentUpdating && __DEV__ && (
                <View style={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10, 
                  backgroundColor: 'rgba(0,0,0,0.7)', 
                  padding: 5, 
                  borderRadius: 5,
                  zIndex: 1000
                }}>
                  <Text style={{ color: 'white', fontSize: 10 }}>🔄 Обновление...</Text>
                </View>
              )}
              {(TransactionStore.isVisibleLoading && TransactionStore.purchaseHistoryByDays.length === 0) ? (
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                  <Text style={{ color: '#666666', fontSize: 16 }}>Загрузка истории...</Text>
                </View>
              ) : (TransactionStore.error && TransactionStore.purchaseHistoryByDays.length === 0) ? (
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                  <Text style={{ color: '#666666', fontSize: 16, textAlign: 'center' }}>
                    Ошибка загрузки истории: {TransactionStore.error}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => TransactionStore.fetchTransactionHistory(false)} // Показываем лоадер при ручном повторе
                    style={{ marginTop: 20, padding: 10, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 8 }}
                  >
                    <Text style={{ color: '#333', fontSize: 14 }}>Повторить</Text>
                  </TouchableOpacity>
                </View>
              ) : TransactionStore.purchaseHistoryByDays.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                  <Text style={{ color: '#666666', fontSize: 16 }}>История транзакций пуста</Text>
                </View>
              ) : (
                TransactionStore.purchaseHistoryByDays.map((day, index) => (
                  <View key={`${day.dateTitle}-${index}`} style={{ marginBottom: 20 }}>
                    <PurchaseHistoryDay
                      dateTitle={day.dateTitle}
                      items={day.items}
                    />
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </GradientWrapper>
  );
});

export default MainScreen;
