import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../../components/Header/Header';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import PlusIcon from '../../../assets/icons/PlusIcon';
import PiggyBankCard from '../../components/PiggyBankCard/PiggyBankCard';
import { styles } from './PiggyBankScreen.styles';
import { mockOtherKidsSaving } from '../../mocks/mockOtherKidsSaving';
import OtherKidsSavingCard from '../../components/OtherKidsSavingCard/OtherKidsSavingCard';
import SavingModal from '../../components/SavingModal/SavingModal';
import * as Clipboard from 'expo-clipboard';
import { mockPiggyBanks } from '../../mocks/mockPiggyBanks ';

export default function PiggyBankScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | {
    title: string;
    price: number;
    imageSource: any;
    description: string;
  }>(null);

  const handleLinkPress = () => {
    Clipboard.setStringAsync('https://example.com');
    Alert.alert('Ссылка скопирована');
  };

  const handleCardPress = (item: {
    title: string;
    price: number;
    imageSource: any;
    description: string;
  }) => {
    setSelectedItem(item);
    setModalVisible(true);
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
            <TouchableOpacity style={styles.plusIcon}>
              <PlusIcon />
            </TouchableOpacity>
          </View>

          {mockPiggyBanks.map((bank, index) => (
            <PiggyBankCard
              key={index}
              title={bank.title}
              savedAmount={bank.savedAmount}
              targetAmount={bank.targetAmount}
              imageSource={bank.imageSource}
            />
          ))}

          {mockOtherKidsSaving.map((item, index) => (
            <OtherKidsSavingCard
              key={index}
              title={item.title}
              price={item.price}
              imageSource={item.imageSource}
              description={item.description}
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
              onStartPress={() => console.log('Начать копить')}
              onLinkPress={handleLinkPress}
            />
          )}
        </ScrollView>
      </View>
    </GradientWrapper>
  );
}
