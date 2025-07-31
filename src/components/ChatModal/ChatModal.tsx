import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './ChatModal.styles';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я твой виртуальный друг Тоша, я живу в твоём приложении. Чем могу помочь? С радостью тебе помогу!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Автоматические ответы Тоши
  const getToshaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
      return 'Привет! Как дела? Что нового? 😊';
    }
    
    if (lowerMessage.includes('копилка') || lowerMessage.includes('деньги')) {
      return 'Отличная идея копить деньги! Я помогу тебе следить за твоими накоплениями. Каждый рубль важен! 💰';
    }
    
    if (lowerMessage.includes('задач') || lowerMessage.includes('дел')) {
      return 'Задачи - это здорово! Выполняй их и получай награды. Я верю в тебя! 💪';
    }
    
    if (lowerMessage.includes('гитар') || lowerMessage.includes('музык')) {
      return 'Ты много хочешь 😄 Вот подробный совет.';
    }
    
    if (lowerMessage.includes('помощь') || lowerMessage.includes('помоги')) {
      return 'Конечно помогу! Я могу рассказать о копилке, задачах или просто поболтать. О чём хочешь узнать?';
    }
    
    if (lowerMessage.includes('спасибо') || lowerMessage.includes('благодар')) {
      return 'Пожалуйста! Всегда рад помочь! 😸';
    }
    
    // Случайные дружелюбные ответы
    const randomResponses = [
      'Интересно! Расскажи подробнее 🤔',
      'Хм, понятно! А что думаешь об этом сам?',
      'Отлично! Продолжай в том же духе! 👍',
      'Я тебя понимаю! Это действительно важно',
      'Круто! А что планируешь дальше?',
      'Мяу! Я слушаю тебя внимательно 🐱',
    ];
    
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Тоша отвечает с небольшой задержкой
    setTimeout(() => {
      const toshaResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getToshaResponse(inputText.trim()),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, toshaResponse]);
    }, 1000 + Math.random() * 1000); // 1-2 секунды задержки
  };

  // Автоскролл к последнему сообщению
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
      <KeyboardAvoidingView 
        style={styles.modalContent}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.swipeIndicator} />

        {/* Хедер с Тошей */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <ArrowLeftIcon width={21} height={18} color='#B6B6B6'/>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
                <Text style={styles.toshaName}>Тоша</Text>
                <View style={styles.onlineDot} />
          </View>
          <View style={styles.toshaAvatarContainer}>
            <Image
              source={require('../../../assets/images/cat.png')}
              style={styles.toshaAvatar}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Список сообщений */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.isUser ? styles.userMessageWrapper : styles.toshaMessageWrapper,
              ]}
            >
              {!message.isUser && (
                <Image
                  source={require('../../../assets/images/cat.png')}
                  style={styles.messageAvatar}
                  resizeMode="contain"
                />
              )}
              
              <View
                style={[
                  styles.messageBubble,
                  message.isUser ? styles.userMessage : styles.toshaMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.isUser ? styles.userMessageText : styles.toshaMessageText,
                  ]}
                >
                  {message.text}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    message.isUser ? styles.userMessageTime : styles.toshaMessageTime,
                  ]}
                >
                  {formatTime(message.timestamp)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Поле ввода */}
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Текстовое сообщение"
              placeholderTextColor="#DDD"
              multiline
              maxLength={500}
            />
          </View>
                      <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <View style={{ transform: [{ rotate: '-90deg' }] }}>
                <ArrowRightIcon width={15} height={14} />
              </View>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ChatModal;