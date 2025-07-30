import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import { Video } from 'expo-av';
import GrassPlatform from '../../../assets/icons/GrassPlatform';
import LevelProgress from '../LevelProgress/LevelProgress';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import { styles } from './MascotModal.styles';

// Жёстко задаём паддинг из styles.modalContent.padding
const HORIZONTAL_PADDING = 24;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Доступная ширина для слайда
const AVAILABLE_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
// Размер картинки/видео
const MEDIA_WIDTH = 119;
const MEDIA_HEIGHT = 173;

interface Props {
  isVisible: boolean;
  onClose: () => void;
  videoSource?: any;      // require(... .webm)
  imageSources: any[];    // массив require(... .png)
  title: string;
  description: string;
  onStartPress?: () => void;
  onLinkPress?: () => void;
}

const MascotModal: React.FC<Props> = ({
  isVisible,
  onClose,
  videoSource,
  imageSources = [],
  title,
  description,
  onStartPress,
  onLinkPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // если есть видео — в слайдах будет на +1
  const slidesCount = (videoSource ? 1 : 0) + imageSources.length;

  const handlePrev = () =>
    setCurrentIndex(idx => Math.max(idx - 1, 0));
  const handleNext = () =>
    setCurrentIndex(idx => Math.min(idx + 1, slidesCount - 1));

  if (slidesCount === 0) return null;

  // данные для LevelProgress
  let mascotName = '';
  let startLevel = 1;
  let endLevel = 2;
  let fillPercent = 38;
  switch (currentIndex) {
    case 0:
      mascotName = 'Котенок Тоша';
      startLevel = 1; endLevel = 2; fillPercent = 43;
      break;
    case 1:
      mascotName = 'Котик Тоша';
      startLevel = 2; endLevel = 3; fillPercent = 56;
      break;
    case 2:
      mascotName = 'Кот Тоша';
      startLevel = 3; endLevel = 4; fillPercent = 67;
      break;
    case 3:
      mascotName = 'Хомяк Хома';
      startLevel = 4; endLevel = 5; fillPercent = 11;
      break;
  }

  // собираем слайды: видео (опционально) + картинки
  const slides: { type: 'video' | 'image'; src: any }[] = [];
  if (videoSource) slides.push({ type: 'video', src: videoSource });
  imageSources.forEach(src => slides.push({ type: 'image', src }));

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

        {/* Слайдер */}
        <View
          style={[
            styles.imagesContainer,
            { width: AVAILABLE_WIDTH, height: MEDIA_HEIGHT + 40 },
          ]}
        >
          <View
            style={[
              styles.imageTrack,
              {
                width: AVAILABLE_WIDTH * slides.length,
                transform: [{ translateX: -currentIndex * AVAILABLE_WIDTH }],
              },
            ]}
          >
            {slides.map((slide, i) => (
              <View
                key={i}
                style={{
                  width: AVAILABLE_WIDTH,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {slide.type === 'video' ? (
                  <Video
                    source={slide.src}
                    style={{ width: MEDIA_WIDTH, height: MEDIA_HEIGHT }}
                    resizeMode="contain"
                    isLooping
                    isMuted
                    shouldPlay
                  />
                ) : (
                  <Image
                    source={slide.src}
                    style={{
                      width: MEDIA_WIDTH,
                      height: MEDIA_HEIGHT,
                      marginTop:
                        slide.type === 'image' &&
                        i === (videoSource ? 1 : 0) &&
                        currentIndex === i
                          ? 16
                          : 0,
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>
            ))}
          </View>

          <View style={styles.grass}>
            <GrassPlatform />
          </View>

          <View style={styles.buttonsSlider}>
            <TouchableOpacity
              onPress={handlePrev}
              style={[
                styles.buttonSlider,
                currentIndex === 0 && styles.disButtonSlider,
              ]}
              disabled={currentIndex === 0}
              activeOpacity={0.6}
            >
              <ArrowLeftIcon color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              style={[
                styles.buttonSlider,
                currentIndex === slides.length - 1 &&
                  styles.disButtonSlider,
              ]}
              disabled={currentIndex === slides.length - 1}
              activeOpacity={0.6}
            >
              <ArrowRightIcon />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.levelProgress}
          onPress={onStartPress}
        >
          <LevelProgress
            name={mascotName}
            fillPercent={fillPercent}
            startLevel={startLevel}
            endLevel={endLevel}
          />
        </TouchableOpacity>

        <View style={styles.mascotModalText}>
          <Text style={styles.title}>{title}</Text>
          <Text
            numberOfLines={7}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {description}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default MascotModal;
