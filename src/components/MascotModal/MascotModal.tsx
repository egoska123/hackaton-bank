// MascotModal.tsx
import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import GrassPlatform from '../../../assets/icons/GrassPlatform';
import LevelProgress from '../LevelProgress/LevelProgress';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import {styles} from "./MascotModal.styles"

// Жёстко задаём паддинг из styles.modalContent.padding
const HORIZONTAL_PADDING = 24;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Доступная ширина для слайда
const AVAILABLE_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;

// Размер картинки (можете подставить своё)
const IMAGE_WIDTH = 119;
const IMAGE_HEIGHT = 173;

interface Props {
  isVisible: boolean;
  onClose: () => void;
  imageSources: any[];    // обязательно массив из 4 (или любого) require(...)
  title: string;
  description: string;
  onStartPress?: () => void;
  onLinkPress?: () => void;
}

const MascotModal: React.FC<Props> = ({
  isVisible,
  onClose,
  imageSources = [],
  title,
  description,
  onStartPress,
  onLinkPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = imageSources.length;

  const handlePrev = () => {
    setCurrentIndex(idx => Math.max(idx - 1, 0));
  };
  const handleNext = () => {
    setCurrentIndex(idx => Math.min(idx + 1, count - 1));
  };

  if (count === 0) return null;

  let mascotName = '';
  let startLevel = 1;
  let endLevel = 2;
  let fillPercent = 38
  switch (currentIndex) {
    case 0:
      mascotName = 'Котенок Тоша';
      startLevel = 1;
      endLevel = 2;
      fillPercent = 43;
      break;
    case 1:
      mascotName = 'Котик Тоша';
      startLevel = 2;
      endLevel = 3;
      fillPercent = 56;
      break;
    case 2:
      mascotName = 'Кот Тоша';
      startLevel = 3;
      endLevel = 4;
      fillPercent = 67;
      break;
    case 3:
      mascotName = 'Кот Тоша';
      startLevel = 4;
      endLevel = 5;
      fillPercent = 11;
      break;
    default:
      mascotName = '';
      break;
  }

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

        {/* Контейнер-обёртка со скрытым overflow */}
        <View style={[styles.imagesContainer, {
          width: AVAILABLE_WIDTH,
          height: 250,
        }]}>
          {/* Трек, который двигаем */}
          <View style={[styles.imageTrack, {
            width: AVAILABLE_WIDTH * count,
            transform: [{ translateX: -currentIndex * AVAILABLE_WIDTH }],
          }]}>
            {imageSources.map((src, i) => (
              <View
                key={i}
                style={{
                  width: AVAILABLE_WIDTH,
                  alignItems: 'center',        // центрируем картинку
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={src}
                  style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT,   marginTop: i === currentIndex && currentIndex === 0 ? 16 : 0, }}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>

          {/* Платформа */}
          <View style={styles.grass}>
            <GrassPlatform />
          </View>


          {/* Стрелки */}
          <View style={styles.buttonsSlider}>
            <TouchableOpacity
              onPress={handlePrev}
              style={[styles.buttonSlider, currentIndex === 0 && styles.disButtonSlider ]}
              disabled={currentIndex === 0}
              activeOpacity={0.6}
            >
              <ArrowLeftIcon color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              style={[styles.buttonSlider, currentIndex === count - 1 && styles.disButtonSlider]}
              disabled={currentIndex === count - 1}
              activeOpacity={0.6}
            >
              <ArrowRightIcon  />
            </TouchableOpacity>
          </View>
        </View>

        {/* Прогресс */}
        <TouchableOpacity style={styles.levelProgress} onPress={onStartPress}>
          <LevelProgress
             name={mascotName}
            fillPercent={fillPercent}
            startLevel={startLevel}
            endLevel={endLevel}
          />
        </TouchableOpacity>

        <View style={styles.mascotModalText}>
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={7} ellipsizeMode="tail" style={styles.description}>{description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default MascotModal;
