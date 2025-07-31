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
  SafeAreaView,
} from 'react-native';
import { styles } from './ChatScreen.styles';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Props {
  onClose: () => void;
  initialAdvice?: {
    advice: string;
    timestamp: string;
    operation?: 'transaction' | 'history' | 'default';
  };
}

const ChatScreen: React.FC<Props> = ({ onClose, initialAdvice }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я твой виртуальный друг Тоша, я живу в твоём приложении. Чем могу помочь? С радостью тебе помогу!',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Привет, Тоша! Как дела?',
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: '3',
      text: 'Отлично! Что планируешь делать сегодня?',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '4',
      text: 'Хочу накопить на новую гитару',
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: '5',
      text: 'Классная цель! Гитара - это здорово. Сколько уже накопил?',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '6',
      text: 'Пока только 1000 рублей из 15000',
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: '7',
      text: 'Хорошее начало! Главное не останавливаться. Каждый рубль приближает тебя к мечте!',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '8',
      text: 'Спасибо за поддержку! А как лучше копить деньги?',
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: '9',
      text: 'Есть несколько способов: откладывать определенную сумму каждый день, собирать мелочь, экономить на ненужных покупках. Главное - регулярность!',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '10',
      text: 'Понятно! А сколько времени нужно чтобы накопить 15000?',
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: '11',
      text: 'Если откладывать по 500 рублей в месяц, то около 2.5 лет. Но если увеличить сумму или найти дополнительные источники дохода, можно быстрее!',
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: '12',
      text: 'Хорошая идея! Буду стараться откладывать больше',
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: '13',
      text: 'Отлично! Я верю в тебя. Помни - каждая гитара начинается с первого рубля в копилке! 🎸',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Добавляем начальный совет, если он есть
  useEffect(() => {
    if (initialAdvice) {
      const adviceMessage: Message = {
        id: Date.now().toString(),
        text: initialAdvice.advice,
        isUser: false,
        timestamp: new Date(initialAdvice.timestamp),
      };
      setMessages(prev => [...prev, adviceMessage]);
    }
  }, [initialAdvice]);

  // Автоматические ответы Тоши
  const getToshaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
      return 'Привет! Рад тебя видеть! Как дела?';
    }
    
    if (lowerMessage.includes('как дела') || lowerMessage.includes('как ты')) {
      return 'У меня всё отлично! Готов помочь тебе с любыми вопросами о накоплениях и финансах!';
    }
    
    if (lowerMessage.includes('спасибо') || lowerMessage.includes('благодар')) {
      return 'Всегда пожалуйста! Я здесь, чтобы помочь тебе достичь финансовых целей! 😊';
    }
    
    if (lowerMessage.includes('копить') || lowerMessage.includes('накопить') || lowerMessage.includes('сбережения')) {
      return 'Отличный вопрос! Главное в накоплениях - это регулярность. Даже небольшие суммы, отложенные постоянно, дают отличный результат!';
    }
    
    if (lowerMessage.includes('цель') || lowerMessage.includes('мечта')) {
      return 'Здорово, что у тебя есть цель! Это очень мотивирует. Расскажи подробнее, на что копишь?';
    }
    
    if (lowerMessage.includes('деньги') || lowerMessage.includes('рубл')) {
      return 'Деньги - это инструмент для достижения целей. Важно научиться ими правильно управлять!';
    }
    
    // Случайные ответы для остальных случаев
    const randomResponses = [
      'Интересно! Расскажи больше об этом.',
      'Понимаю тебя! А что ты думаешь по этому поводу?',
      'Хороший вопрос! Давай разберем это вместе.',
      'Это важная тема! Как ты к этому относишься?',
      'Замечательно! Продолжай рассказывать.',
      'Я всегда готов выслушать и помочь советом! 💪',
      'Отличная мысль! А какие у тебя планы на этот счет?',
    ];
    
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  };

  // Отправка сообщения
  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Автоматический ответ от Тоши
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
    if (scrollViewRef.current && messages.length > 0) {
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Хедер */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <ArrowLeftIcon width={21} height={18} color='#B6B6B6'/>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={styles.nameWithDot}>
              <Text style={styles.toshaName}>Тоша</Text>
              <View style={styles.onlineDot} />
            </View>
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
              placeholder="Напишите сообщение..."
              placeholderTextColor="#999999"
              multiline
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              { opacity: inputText.trim() ? 1 : 0.5 }
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
    </SafeAreaView>
  );
};

export default ChatScreen;