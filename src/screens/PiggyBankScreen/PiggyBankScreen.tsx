import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
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
import { mockPiggyBanks } from '../../mocks/mockPiggyBanks ';

export default function PiggyBankScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddPiggyBankModalVisible, setAddPiggyBankModalVisible] = useState(false);
  const [isTopUpModalVisible, setTopUpModalVisible] = useState(false);
  const [selectedPiggyBank, setSelectedPiggyBank] = useState<null | {
    title: string;
    savedAmount: number;
    targetAmount: number;
    imageSource: any;
  }>(null);
  const [piggyBanks, setPiggyBanks] = useState(mockPiggyBanks);
  const [selectedItem, setSelectedItem] = useState<null | {
    title: string;
    price: number;
    imageSource: any;
    description: string;
    productUrl?: string;
  }>(null);

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

  const handleAddPiggyBank = (newPiggyBank: {
    title: string;
    targetAmount: number;
    imageSource: any;
  }) => {
    const piggyBankWithDefaults = {
      ...newPiggyBank,
      savedAmount: 0, // Начинаем с нуля
    };
    setPiggyBanks([...piggyBanks, piggyBankWithDefaults]);
  };

  const handlePlusPress = () => {
    setAddPiggyBankModalVisible(true);
  };

  const handlePiggyBankPress = (piggyBank: {
    title: string;
    savedAmount: number;
    targetAmount: number;
    imageSource: any;
  }) => {
    setSelectedPiggyBank(piggyBank);
    setTopUpModalVisible(true);
  };

  const handleTopUp = (amount: number) => {
    if (selectedPiggyBank) {
      const updatedPiggyBanks = piggyBanks.map(bank => {
        if (bank.title === selectedPiggyBank.title) {
          return {
            ...bank,
            savedAmount: bank.savedAmount + amount,
          };
        }
        return bank;
      });
      setPiggyBanks(updatedPiggyBanks);
    }
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <Header
          firstName="Никита"
          lastName="Иванов"
          photoUri="https://example.com/avatar.jpg"
        />

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.piggyBankText}>
            <Text style={styles.bankText}>Копилка</Text>
            <TouchableOpacity style={styles.plusIcon} onPress={handlePlusPress}>
              <PlusIcon />
            </TouchableOpacity>
          </View>

          {piggyBanks.map((bank, index) => (
            <PiggyBankCard
              key={index}
              title={bank.title}
              savedAmount={bank.savedAmount}
              targetAmount={bank.targetAmount}
              imageSource={bank.imageSource}
              onPress={() => handlePiggyBankPress(bank)}
            />
          ))}

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
}
