import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { styles } from './AdviceNotification.styles';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';

interface AdviceNotificationProps {
  advice: {
    advice: string;
    timestamp: string;
    operation?: 'transaction' | 'history' | 'default';
  };
  onPress: () => void;
  onClose: () => void;
  visible: boolean;
}

const { width } = Dimensions.get('window');

const AdviceNotification: React.FC<AdviceNotificationProps> = ({
  advice,
  onPress,
  onClose,
  visible,
}) => {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Показываем уведомление
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Автоматически скрываем через 5 секунд
      const timer = setTimeout(() => {
        hideNotification();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      hideNotification();
    }
  }, [visible]);

  const hideNotification = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handlePress = () => {
    hideNotification();
    onPress();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Обрезаем текст для уведомления
  const truncatedText = advice.advice.length > 80 
    ? advice.advice.substring(0, 80) + '...' 
    : advice.advice;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity style={styles.content} onPress={handlePress}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Совет от Тоши</Text>
          <Text style={styles.text}>{truncatedText}</Text>
          <Text style={styles.time}>{formatTime(advice.timestamp)}</Text>
        </View>
        <View style={styles.iconContainer}>
          <ArrowRightIcon width={16} height={14} color="#007AFF" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.closeButton} onPress={hideNotification}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AdviceNotification; 