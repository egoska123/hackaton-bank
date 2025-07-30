import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import CameraIcon from '../../../assets/icons/CameraIcon';
import { styles } from './CheckTaskModal.styles';
import CheckIconD from '../../../assets/icons/CheckIconD';
import CheckIcon from '../../../assets/icons/CheckIcon';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  earn: number;
  description: string;
  onLinkPress?: (uri: string) => void;
  onDonePress: () => void;
}

const CheckTaskModal: React.FC<Props> = ({
  isVisible,
  onClose,
  title,
  earn,
  description,
  onLinkPress,
  onDonePress,
}) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Запрашиваем права на доступ к галерее
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Необходимо разрешение на доступ к фото!');
        }
      }
    })();
  }, []);

  // Открыть галерею и выбрать фото
  const handleAttach = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      onLinkPress?.(uri);
    }
  };

  // Завершить задачу
  const handleDone = () => {
    onDonePress();  // сначала родителю
    setPhotoUri(null); // сброс, если вдруг откроют заново
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

        {/* Заголовок и описание */}
        <View style={styles.textCont}>
          <Text style={styles.parentsListText}>Родительский список</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>

        {/* Награда и превью фото */}
        <View style={styles.main}>
          <View style={styles.mainText}>
            <Text style={styles.earnText}>Награда</Text>
            <Text style={styles.earn}>{earn} ₽</Text>
          </View>
          {/* {photoUri && (
            <Image
              source={{ uri: photoUri }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          )} */}

            {/* Кнопки: Прикрепить и Я выполнил */}
        <View style={styles.buttonsColumn}>
          <TouchableOpacity
            style={[styles.button, styles.buttonActive]}
            onPress={handleAttach}
            activeOpacity={0.6}
          >
            <Text style={styles.buttonTextActive}>Прикрепить</Text>
            <CameraIcon />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              photoUri ? styles.buttonActive : styles.buttonInactive,
            ]}
            onPress={photoUri ? handleDone : undefined}
            disabled={!photoUri}
            activeOpacity={0.6}
            
          >
            <Text
              style={
                photoUri
                  ? styles.buttonTextActive
                  : styles.buttonTextInactive
              }
            >
              Я выполнил
            </Text>
           {photoUri
                ? <CheckIcon />
                : <CheckIconD />
            }

          </TouchableOpacity>
        </View>
        </View>

      </View>
    </Modal>
  );
};

export default CheckTaskModal;
