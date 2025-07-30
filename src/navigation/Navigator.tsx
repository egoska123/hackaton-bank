import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CustomTabBar from './CustomTabBar/CustomTabBar';
import MainScreen from '../screens/MainScreen/MainScreen';
import PiggyBankScreen from '../screens/PiggyBankScreen/PiggyBankScreen';
import TasksScreen from '../screens/TasksScreen/TasksScreen';



const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Главная" component={MainScreen} />
        <Tab.Screen name="Копилка" component={PiggyBankScreen} />
        <Tab.Screen name="Дела" component={TasksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
