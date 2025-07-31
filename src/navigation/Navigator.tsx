import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CustomTabBar from './CustomTabBar/CustomTabBar';
import MainScreen from '../screens/MainScreen/MainScreen';
import PiggyBankScreen from '../screens/PiggyBankScreen/PiggyBankScreen';
import TasksScreen from '../screens/TasksScreen/TasksScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';

const Tab = createBottomTabNavigator();

export default function Navigator() {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const openChat = () => setIsChatVisible(true);
  const closeChat = () => setIsChatVisible(false);

  return (
    <NavigationContainer>
      {!isChatVisible ? (
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <CustomTabBar {...props} />}
        >
          <Tab.Screen name="Главная">
            {(props) => <MainScreen {...props} openChat={openChat} />}
          </Tab.Screen>
          <Tab.Screen name="Копилка" component={PiggyBankScreen} />
          <Tab.Screen name="Дела" component={TasksScreen} />
        </Tab.Navigator>
      ) : (
        <ChatScreen onClose={closeChat} />
      )}
    </NavigationContainer>
  );
}
