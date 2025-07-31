import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './ParentCheckTaskModal.styles';
import CheckIcon from '../../../assets/icons/CheckIcon';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  earn: number;
  description: string;
  photoUri?: any; // Может быть require() или string
  onCompleted: () => void;
  onNotCompleted: () => void;
}

const ParentCheckTaskModal: React.FC<Props> = ({
  isVisible,
  onClose,
  title,
  earn,
  description,
  photoUri,
  onCompleted,
  onNotCompleted,
}) => {
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
          <Text style={styles.parentsListText}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>

        {/* Награда и фотография */}
        <View style={styles.main}>
          <View style={styles.mainText}>
            <Text style={styles.earnText}>Награда</Text>
            <Text style={styles.earn}>{earn} ₽</Text>
          </View>

          {/* Фотография, которую прикрепил ребенок */}
          {photoUri && (
            <View style={styles.imageContainer}>
              <Image
                source={photoUri}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}

          {/* Кнопки: Выполнено и Не выполнено */}
          <View style={styles.buttonsColumn}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCompleted]}
              onPress={onCompleted}
              activeOpacity={0.6}
            >
              <Text style={styles.buttonTextCompleted}>Выполнено</Text>
              <CheckIcon />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonNotCompleted]}
              onPress={onNotCompleted}
              activeOpacity={0.6}
            >
              <Text style={styles.buttonTextNotCompleted}>Не выполнено</Text>
              <Text style={styles.xIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ParentCheckTaskModal; 