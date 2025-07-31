import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { styles } from './TasksScreen.styles';
import GrassPlatform from '../../../assets/icons/GrassPlatform';
import Header from '../../components/Header/Header';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import LevelProgress from '../../components/LevelProgress/LevelProgress';
import TaskCard from '../../components/TaskCard/TaskCard';
import CheckTaskModal from '../../components/CheckTaskModal/CheckTaskModal';
import MascotModal from '../../components/MascotModal/MascotModal';
import { mockParentTasks } from '../../mocks/mockParentTasks';
import { mockSystemTasks } from '../../mocks/mockSystemTasks';
import { mockCompleteTasks } from '../../mocks/mockCompleteTasks';
import ProfileStore from '../../stores/ProfileStore';

const TasksScreen = observer(() => {
  const [isMascotModalVisible, setMascotModalVisible] = useState(false);
  const [isCheckModalVisible, setCheckModalVisible] = useState(false);
  const [selectedTaskText, setSelectedTaskText] = useState<string>('');
  const [selectedTaskEarn, setSelectedTaskEarn] = useState<number>(0);

  // Загружаем профиль при монтировании компонента
  useEffect(() => {
    if (!ProfileStore.profile) {
      ProfileStore.fetchProfile();
    }
  }, []);

  const openModal = () => setMascotModalVisible(true);
  const closeModal = () => setMascotModalVisible(false);

  const openCheckModal = (taskText: string, taskEarn: number) => {
    setSelectedTaskText(taskText);
    setSelectedTaskEarn(taskEarn);       // <-- правильно
    setCheckModalVisible(true);
  };
  const closeCheckModal = () => setCheckModalVisible(false);

  const handleTaskDone = () => {
     setCheckModalVisible(false)
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <Header
          firstName={ProfileStore.firstName}
          lastName={ProfileStore.lastName}
          photoUri="https://example.com/avatar.jpg"
        />

        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.images} onPress={openModal}>
            <Image
              source={require('../../../assets/images/cat.png')}
              style={styles.catImage}
              resizeMode="contain"
            />
            <View style={styles.grass}>
              <GrassPlatform />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.levelProgress}
            onPress={openModal}
          >
            <LevelProgress
              name="Кот Тоша"
              fillPercent={38}
              startLevel={1}
              endLevel={2}
            />
          </TouchableOpacity>

          {/* Родительский список */}
          <View style={styles.listTasks}>
          <View style={styles.parentsTasks}>
            <Text style={styles.parentstext}>Родительский список</Text>
            <View style={styles.parentsTasksList}>
              {mockParentTasks.map(task => (
                <TaskCard
                  key={task.id}
                  variant="parents"
                  text={task.text}
                  earn={task.earn}
                  onPress={() =>
                    openCheckModal(task.text, task.earn)
                  }
                />
              ))}
            </View>
          </View>

          {/* Системные задачи */}
          <View style={styles.Tasks}>
            <Text style={styles.parentstext}>Список дел</Text>
            <View style={styles.parentsTasksList}>
              {mockSystemTasks.map((task, i) => (
                <TaskCard key={i} text={task.text} earn={0} />
              ))}
            </View>
          </View>

          {/* Выполненные задачи */}
          <View style={styles.Tasks}>
            <Text style={styles.parentstext}>Выполненные дела</Text>
            <View style={styles.parentsTasksList}>
              {mockCompleteTasks.map((task, i) => (
                <TaskCard
                  key={i}
                  variant="completed"
                  text={task.text}
                  earn={0}
                />
              ))}
            </View>
          </View>
          </View>
        </ScrollView>

        {/* Модалка проверки таска */}
        <CheckTaskModal
          isVisible={isCheckModalVisible}
          onClose={closeCheckModal}
          earn={selectedTaskEarn}
          title={selectedTaskText}
          description={selectedTaskText}
          onDonePress={handleTaskDone}
        />

        {/* MascotModal с изображениями маскотов */}
       <MascotModal
        isVisible={isMascotModalVisible}
        onClose={closeModal}
        imageSources={[
            require('../../../assets/images/cat1.png'),
            require('../../../assets/images/cat.png'),
            require('../../../assets/images/cat3.png'),
            require('../../../assets/images/cat4.png'),
          ]}
        title="Растите своего Тошу"
        description="Когда кладёте деньги в копилку, пополняется не только она, но и рост Тоши! Регулярно подкармливай копилку и кота Тошу (не могу упридумать)"
        onStartPress={() => console.log('Start pressed')}
        onLinkPress={() => console.log('Link pressed')}
      />



      </View>
    </GradientWrapper>
  );
});

export default TasksScreen;
