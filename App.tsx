import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './src/navigation/Navigator';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen/RoleSelectionScreen';
import ParentMainScreen from './src/screens/ParentMainScreen/ParentMainScreen';

type UserRole = 'child' | 'parent' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: 'child' | 'parent') => {
    setUserRole(role);
  };

  const handleBackToRoleSelection = () => {
    setUserRole(null);
  };

  // Показываем экран выбора роли, если роль не выбрана
  if (userRole === null) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RoleSelectionScreen onRoleSelect={handleRoleSelect} />
      </GestureHandlerRootView>
    );
  }

  // Показываем родительский экран
  if (userRole === 'parent') {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ParentMainScreen onBackToRoleSelection={handleBackToRoleSelection} />
      </GestureHandlerRootView>
    );
  }

  // Показываем детский интерфейс
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigator onBackToRoleSelection={handleBackToRoleSelection} />
    </GestureHandlerRootView>
  );
}


