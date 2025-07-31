import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import TaskCard from '../../components/TaskCard/TaskCard';
import ParentCheckTaskModal from '../../components/ParentCheckTaskModal/ParentCheckTaskModal';
import { styles } from './ParentTasksScreen.styles';
import { mockParentTasks } from '../../mocks/mockParentTasks';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import CheckIcon from '../../../assets/icons/CheckIcon';

interface Task {
  id: number;
  text: string;
  earn: number;
  status: 'pending' | 'completed_unverified' | 'completed_verified';
  photoUri?: string; // Фотография, которую прикрепил ребенок
}

interface ParentTasksScreenProps {
  onBackToRoleSelection?: () => void;
  onBackToMain?: () => void;
}

const ParentTasksScreen = observer(({ onBackToRoleSelection, onBackToMain }: ParentTasksScreenProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCheckModalVisible, setCheckModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Инициализируем задачи при монтировании компонента
  useEffect(() => {
    const demoPhotos = [
      require('../../../assets/images/cat3.png'),
      require('../../../assets/images/cat4.png'),
      require('../../../assets/images/cat.png'),
      require('../../../assets/images/cat1.png'),
    ];

    const initialTasks: Task[] = mockParentTasks.map((task, index) => ({
      ...task,
      // Первые два задания делаем не проверенными для демонстрации
      status: index < 2 ? 'completed_unverified' as const : 'pending' as const,
      // Добавляем реальные фотографии для не проверенных заданий
      photoUri: index < 2 ? demoPhotos[index] : undefined
    }));
    setTasks(initialTasks);
  }, []);

  const handleSettings = () => {
    if (onBackToRoleSelection) {
      onBackToRoleSelection();
    }
  };

  const handleBackToMain = () => {
    if (onBackToMain) {
      onBackToMain();
    }
  };

  const openCheckModal = (task: Task) => {
    setSelectedTask(task);
    setCheckModalVisible(true);
  };

  const closeCheckModal = () => {
    setCheckModalVisible(false);
    setSelectedTask(null);
  };

  const handleTaskCompleted = () => {
    if (selectedTask) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === selectedTask.id 
            ? { ...task, status: 'completed_verified' as const }
            : task
        )
      );
    }
    closeCheckModal();
  };

  const handleTaskNotCompleted = () => {
    if (selectedTask) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === selectedTask.id 
            ? { ...task, status: 'pending' as const }
            : task
        )
      );
    }
    closeCheckModal();
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedUnverifiedTasks = tasks.filter(task => task.status === 'completed_unverified');
  const completedVerifiedTasks = tasks.filter(task => task.status === 'completed_verified');

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Верхний заголовок с "Детская карта Никиты" и шестеренкой */}
          <View style={styles.topHeaderSection}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Детская карта</Text>
              <Text style={styles.cardSubtitle}>Никиты</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
              <SettingsIcon />
            </TouchableOpacity>
          </View>

          {/* Заголовок страницы с кнопкой назад */}
          <View style={styles.pageHeaderSection}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToMain}>
              <ArrowLeftIcon />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Назначенные задания</Text>
          </View>

          {/* Выполненные задания (проверенные) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Выполнено</Text>
            <View style={styles.tasksList}>
              {completedVerifiedTasks.map(task => (
                <View key={task.id} style={styles.completedTaskCard}>
                  <Text style={styles.taskText}>{task.text}</Text>
                  <View style={styles.checkIconContainer}>
                    <CheckIcon />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Не проверенные задания */}
          {completedUnverifiedTasks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Не проверено</Text>
              <View style={styles.tasksList}>
                {completedUnverifiedTasks.map(task => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.unverifiedTaskCard}
                    onPress={() => openCheckModal(task)}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.taskText}>{task.text}</Text>
                    <View style={styles.pendingIconContainer}>
                      <Text style={styles.pendingIcon}>⏳</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Невыполненные задания */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Не выполнено</Text>
            <View style={styles.tasksList}>
              {pendingTasks.map(task => (
                <View key={task.id} style={styles.pendingTaskCard}>
                  <Text style={styles.taskText}>{task.text}</Text>
                  <Text style={styles.earnText}>{task.earn} ₽</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Модалка проверки задания */}
        {selectedTask && (
          <ParentCheckTaskModal
            isVisible={isCheckModalVisible}
            onClose={closeCheckModal}
            title="Родительский список"
            earn={selectedTask.earn}
            description={selectedTask.text}
            photoUri={selectedTask.photoUri}
            onCompleted={handleTaskCompleted}
            onNotCompleted={handleTaskNotCompleted}
          />
        )}
      </View>
    </GradientWrapper>
  );
});

export default ParentTasksScreen; 