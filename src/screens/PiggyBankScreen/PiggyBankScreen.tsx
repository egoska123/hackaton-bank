import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header/Header';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import PlusIcon from '../../../assets/icons/PlusIcon';
import PiggyBankCard from '../../components/PiggyBankCard/PiggyBankCard';
import { styles } from './PiggyBankScreen.styles';
import { mockOtherKidsSaving } from '../../mocks/mockOtherKidsSaving';
import OtherKidsSavingCard from '../../components/OtherKidsSavingCard/OtherKidsSavingCard';
import SavingModal from '../../components/SavingModal/SavingModal';
import AddPiggyBankModal from '../../components/AddPiggyBankModal/AddPiggyBankModal';
import TopUpPiggyBankModal from '../../components/TopUpPiggyBankModal/TopUpPiggyBankModal';
import { piggyBankStore } from '../../stores/PiggyBankStore';
import { PiggyBank } from '../../utils/piggybankApi';
import ProfileStore from '../../stores/ProfileStore';

const PiggyBankScreen = observer(() => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddPiggyBankModalVisible, setAddPiggyBankModalVisible] = useState(false);
  const [isTopUpModalVisible, setTopUpModalVisible] = useState(false);
  const [selectedPiggyBank, setSelectedPiggyBank] = useState<PiggyBank | null>(null);
  const [selectedItem, setSelectedItem] = useState<null | {
    title: string;
    price: number;
    imageSource: any;
    description: string;
    productUrl?: string;
  }>(null);

  // Загружаем копилки при монтировании компонента
  useEffect(() => {
    piggyBankStore.loadPiggyBanks();
  }, []);

  const handleLinkPress = async () => {
    console.log('Selected item:', selectedItem);
    console.log('Product URL:', selectedItem?.productUrl);
    
    if (selectedItem?.productUrl) {
      try {
        console.log('Attempting to open URL:', selectedItem.productUrl);
        await Linking.openURL(selectedItem.productUrl);
      } catch (error) {
        console.error('Error opening URL:', error);
        Alert.alert('Ошибка', 'Не удается открыть ссылку на товар');
      }
    } else {
      console.log('No product URL found');
      Alert.alert('Ошибка', 'Ссылка на товар не найдена');
    }
  };

  const handleCardPress = (item: {
    title: string;
    price: number;
    imageSource: any;
    description: string;
    productUrl?: string;
  }) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

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

  const handlePlusPress = () => {
    setAddPiggyBankModalVisible(true);
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

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <Header
          firstName={ProfileStore.firstName}
          lastName={ProfileStore.lastName}
          photoUri="https://example.com/avatar.jpg"
        />

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.piggyBankText}>
            <Text style={styles.bankText}>Копилка</Text>
            <TouchableOpacity style={styles.plusIcon} onPress={handlePlusPress}>
              <PlusIcon />
            </TouchableOpacity>
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
              <Text style={styles.emptySubtext}>Создайте первую копилку, нажав на +</Text>
            </View>
          ) : (
            piggyBankStore.piggyBanks.map((bank, index) => (
              <PiggyBankCard
                key={bank.id}
                title={bank.name}
                savedAmount={bank.balance}
                targetAmount={bank.target}
                imageSource={require('../../../assets/images/image 23.png')} // Используем дефолтное изображение
                onPress={() => handlePiggyBankPress(bank)}
              />
            ))
          )}

          {mockOtherKidsSaving.map((item, index) => (
            <OtherKidsSavingCard
              key={index}
              title={item.title}
              price={item.price}
              imageSource={item.imageSource}
              description={item.description}
              productUrl={item.productUrl}
              onPress={handleCardPress}
            />
          ))}

          {selectedItem && (
            <SavingModal
              isVisible={isModalVisible}
              onClose={() => setModalVisible(false)}
              imageSource={selectedItem.imageSource}
              title={selectedItem.title}
              description={selectedItem.description}
              productUrl={selectedItem.productUrl}
              onStartPress={() => console.log('Начать копить')}
              onLinkPress={handleLinkPress}
            />
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

export default PiggyBankScreen;
