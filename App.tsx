import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navigator from './src/navigation/Navigator';
import { styles } from './src/navigation/CustomTabBar/CustomTabBar.styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
      <GestureHandlerRootView>
      <Navigator />
    </GestureHandlerRootView>
  );
}


