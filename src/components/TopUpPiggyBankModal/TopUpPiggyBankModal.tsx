import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './TopUpPiggyBankModal.styles';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  piggyBank: {
    title: string;
    savedAmount: number;
    targetAmount: number;
    imageSource: any;
  };
  onTopUp: (amount: number) => void;
}

const TopUpPiggyBankModal: React.FC<Props> = ({
  isVisible,
  onClose,
  piggyBank,
  onTopUp,
}) => {
  const [amount, setAmount] = useState('');

  // Сброс состояния при закрытии модалки
  useEffect(() => {
    if (!isVisible) {
      setAmount('');
    }
  }, [isVisible]);

  // Проверка валидности суммы
  const isAmountValid = () => {
    return amount.trim().length > 0 && 
           !isNaN(Number(amount)) && 
           Number(amount) > 0;
  };

  // Пополнить копилку
  const handleTopUp = () => {
    if (!isAmountValid()) {
      return;
    }

    onTopUp(Number(amount));
    onClose();
  };

  const progress = Math.min(piggyBank.savedAmount / piggyBank.targetAmount, 1);

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={styles.modalContainer}
      propagateSwipe
    >
      <View style={styles.modalContent}>
        <View style={styles.swipeIndicator} />

        {/* Информация о копилке */}
        <View style={styles.piggyBankInfo}>
          <Image source={piggyBank.imageSource} style={styles.piggyBankImage} resizeMode="contain" />
          <View style={styles.piggyBankDetails}>
            <Text style={styles.piggyBankLabel}>Копилка</Text>
            <Text style={styles.piggyBankTitle}>{piggyBank.title}</Text>
            <Text style={styles.piggyBankAmount}>
              <Text style={styles.savedAmount}>{piggyBank.savedAmount}</Text> 
              <Text style={styles.targetAmount}>₽ из {piggyBank.targetAmount} ₽</Text>
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* Поле ввода суммы */}
        <Text style={styles.caption}>Сколько успел накопить</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          placeholder="120₽"
          placeholderTextColor="#50B848"
          keyboardType="numeric"
        />

        {/* Кнопки */}
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[
              styles.greenButton, 
              !isAmountValid() && styles.disabledButton
            ]} 
            onPress={handleTopUp}
            disabled={!isAmountValid()}
          >
            <Text style={[
              styles.greenButtonText,
              !isAmountValid() && styles.disabledButtonText
            ]}>
              Пополнить
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.grayButton} onPress={onClose}>
            <Text style={styles.grayButtonText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TopUpPiggyBankModal; 