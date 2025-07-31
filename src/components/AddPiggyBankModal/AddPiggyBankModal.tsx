import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import CameraIcon from '../../../assets/icons/CameraIcon';
import { styles } from './AddPiggyBankModal.styles';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAddPiggyBank: (piggyBank: {
    title: string;
    targetAmount: number;
    imageSource: any;
  }) => void;
}

const AddPiggyBankModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onAddPiggyBank,
}) => {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Запрашиваем права на доступ к галерее
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Необходимо разрешение на доступ к фото!');
        }
      }
    })();
  }, []);

  // Сброс состояния при закрытии модалки
  useEffect(() => {
    if (!isVisible) {
      setTitle('');
      setTargetAmount('');
      setImageUri(null);
    }
  }, [isVisible]);

  // Открыть галерею и выбрать фото
  const handleAttachPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
    }
  };

  // Проверка валидности формы
  const isFormValid = () => {
    return title.trim().length > 0 && 
           targetAmount.trim().length > 0 && 
           !isNaN(Number(targetAmount)) && 
           Number(targetAmount) > 0;
  };

  // Начать копить - создать новую копилку
  const handleStartSaving = () => {
    if (!isFormValid()) {
      return;
    }

    const newPiggyBank = {
      title: title.trim(),
      targetAmount: Number(targetAmount),
      imageSource: imageUri ? { uri: imageUri } : require('../../../assets/images/image 23.png'),
    };

    onAddPiggyBank(newPiggyBank);
    onClose();
  };

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

        <Text style={styles.caption}>Название копилки:</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Новая копилка"
          placeholderTextColor="#999"
        />

        <Text style={styles.caption}>Твоя цель накопить:</Text>
        <TextInput
          style={styles.amountInput}
          value={targetAmount}
          onChangeText={setTargetAmount}
          placeholder="120₽"
          placeholderTextColor="#50B848"
          keyboardType="numeric"
        />

<TouchableOpacity style={styles.attachButton} onPress={handleAttachPhoto}>
           <Text style={styles.attachButtonText}>Прикрепить фото</Text>
           <CameraIcon width={32} height={28} />
         </TouchableOpacity>

        
                 <View style={styles.buttons}>

           <TouchableOpacity 
             style={[
               styles.greenButton, 
               !isFormValid() && styles.disabledButton
             ]} 
             onPress={handleStartSaving}
             disabled={!isFormValid()}
           >
             <Text style={[
               styles.greenButtonText,
               !isFormValid() && styles.disabledButtonText
             ]}>
               Начать копить
             </Text>
           </TouchableOpacity>
         </View>
      </View>
    </Modal>
  );
};

export default AddPiggyBankModal;