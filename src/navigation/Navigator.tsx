import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import CustomTabBar from './CustomTabBar/CustomTabBar';
import MainScreen from '../screens/MainScreen/MainScreen';
import PiggyBankScreen from '../screens/PiggyBankScreen/PiggyBankScreen';
import TasksScreen from '../screens/TasksScreen/TasksScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import AdviceNotification from '../components/AdviceNotification/AdviceNotification';
import { adviceStore } from '../stores/AdviceStore';

const Tab = createBottomTabNavigator();

interface NavigatorProps {
  onBackToRoleSelection?: () => void;
}

const Navigator = observer(({ onBackToRoleSelection }: NavigatorProps) => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const openChat = () => setIsChatVisible(true);
  const closeChat = () => setIsChatVisible(false);

  const handleAdviceNotificationPress = () => {
    adviceStore.hideNotification();
    setIsChatVisible(true);
  };

  const handleAdviceNotificationClose = () => {
    adviceStore.hideNotification();
  };

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {!isChatVisible ? (
          <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
          >
            <Tab.Screen name="Главная">
              {(props) => <MainScreen {...props} openChat={openChat} onBackToRoleSelection={onBackToRoleSelection} />}
            </Tab.Screen>
            <Tab.Screen name="Копилка">
              {(props) => <PiggyBankScreen {...props} onBackToRoleSelection={onBackToRoleSelection} />}
            </Tab.Screen>
            <Tab.Screen name="Дела">
              {(props) => <TasksScreen {...props} onBackToRoleSelection={onBackToRoleSelection} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <ChatScreen 
            onClose={closeChat} 
            initialAdvice={adviceStore.currentAdvice || undefined}
          />
        )}
        
        {/* Уведомление о совете */}
        {adviceStore.currentAdvice && (
          <AdviceNotification
            advice={adviceStore.currentAdvice}
            onPress={handleAdviceNotificationPress}
            onClose={handleAdviceNotificationClose}
            visible={adviceStore.showNotification}
          />
        )}
      </View>
    </NavigationContainer>
  );
});

export default Navigator;
