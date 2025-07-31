import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './SavingModal.styles';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  imageSource: any;
  title: string;
  description: string;
  productUrl?: string;
  onStartPress?: () => void;
  onLinkPress?: () => void;
}

const SavingModal: React.FC<Props> = ({
  isVisible,
  onClose,
  imageSource,
  title,
  description,
  productUrl,
  onStartPress,
  onLinkPress,
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

        <Image source={imageSource} style={styles.image} resizeMode="contain" />

        <Text style={styles.caption}>Что копят другие?</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">{description}</Text>

        <View style={styles.buttons}>
            <TouchableOpacity style={styles.greenButton} onPress={onStartPress}>
                <Text style={styles.greenButtonText}>Начать копить</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.grayButton} onPress={onLinkPress}>
                 <Text style={styles.grayButtonText}>Открыть товар</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SavingModal;
