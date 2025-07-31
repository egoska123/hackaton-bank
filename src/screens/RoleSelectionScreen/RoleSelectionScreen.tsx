import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { setAuthToken, getAuthToken } from '../../utils/api';

interface Props {
  onRoleSelect: (role: 'child' | 'parent') => void;
}

const RoleSelectionScreen: React.FC<Props> = ({ onRoleSelect }) => {
  const [jwtToken, setJwtToken] = useState('');

  // Загружаем сохраненный токен при монтировании компонента
  useEffect(() => {
    const savedToken = getAuthToken();
    if (savedToken) {
      setJwtToken(savedToken);
    }
  }, []);

  const handleSaveToken = () => {
    if (jwtToken.trim()) {
      setAuthToken(jwtToken.trim());
      Alert.alert('Успех', 'JWT токен сохранен!');
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, введите JWT токен');
    }
  };

  const handleRoleSelect = (role: 'child' | 'parent') => {
    if (!jwtToken.trim()) {
      Alert.alert('Внимание', 'Пожалуйста, сначала введите JWT токен');
      return;
    }
    onRoleSelect(role);
  };

  return (
    <LinearGradient
      colors={['#F4CF49', '#40A93D']}
      start={{ x: 0.9, y: 0.8 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Выберите роль</Text>
        <Text style={styles.subtitle}>Кто будет использовать приложение?</Text>
        
        {/* Поле для ввода JWT токена */}
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>JWT Токен:</Text>
          <TextInput
            style={styles.tokenInput}
            value={jwtToken}
            onChangeText={setJwtToken}
            placeholder="Введите JWT токен..."
            placeholderTextColor="#999999"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          <TouchableOpacity 
            style={styles.saveTokenButton}
            onPress={handleSaveToken}
            activeOpacity={0.8}
          >
            <Text style={styles.saveTokenButtonText}>Сохранить токен</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.roleButton}
            onPress={() => handleRoleSelect('child')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.roleTitle}>Ребёнок</Text>
              <Text style={styles.roleDescription}>
                Копилка, задачи, чат с Тошей
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.roleButton}
            onPress={() => handleRoleSelect('parent')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.roleTitle}>Родитель</Text>
              <Text style={styles.roleDescription}>
                Управление аккаунтом ребёнка
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
    fontFamily: 'Inter',
  },
  tokenContainer: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tokenLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  tokenInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#F8F8F8',
    fontFamily: 'Inter',
    minHeight: 80,
  },
  saveTokenButton: {
    backgroundColor: '#40A93D',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  saveTokenButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  buttonsContainer: {
    width: '100%',
    gap: 20,
  },
  roleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContent: {
    alignItems: 'center',
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  roleDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
});

export default RoleSelectionScreen; 