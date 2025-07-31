import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  onRoleSelect: (role: 'child' | 'parent') => void;
}

const RoleSelectionScreen: React.FC<Props> = ({ onRoleSelect }) => {
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
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.roleButton}
            onPress={() => onRoleSelect('child')}
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
            onPress={() => onRoleSelect('parent')}
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
    marginBottom: 60,
    opacity: 0.9,
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