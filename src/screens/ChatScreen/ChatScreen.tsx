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
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { styles } from './ChatScreen.styles';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import { chatStore } from '../../stores/ChatStore';

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

const ChatScreen = observer(({ onClose, initialAdvice }: Props) => {
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Добавляем начальный совет, если он есть
  useEffect(() => {
    if (initialAdvice) {
      chatStore.addAIAdvice(initialAdvice.advice, initialAdvice.timestamp);
    }
  }, [initialAdvice]);



  // Отправка сообщения
  const sendMessage = () => {
    if (!inputText.trim() || chatStore.isLoading) return;

    // Добавляем сообщение пользователя через ChatStore
    chatStore.addUserMessage(inputText.trim());
    setInputText('');
  };

  // Автоскролл к последнему сообщению
  useEffect(() => {
    if (scrollViewRef.current && chatStore.messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chatStore.messages]);

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
          {chatStore.messages.map((message) => (
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
                {message.source && (
                  <Text style={styles.sourceText}>
                    {message.source === 'ai' ? '🤖 AI' : '📝 Mock'}
                  </Text>
                )}
              </View>
            </View>
          ))}
          
          {/* Индикатор загрузки */}
          {chatStore.isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.loadingText}>Тоша печатает...</Text>
            </View>
          )}
          
          {/* Ошибка */}
          {chatStore.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{chatStore.error}</Text>
            </View>
          )}
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
              { opacity: inputText.trim() && !chatStore.isLoading ? 1 : 0.5 }
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim() || chatStore.isLoading}
          >
            {chatStore.isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <View style={{ transform: [{ rotate: '-90deg' }] }}>
                <ArrowRightIcon width={15} height={14} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
})

export default ChatScreen;