import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeIcon from '../../../assets/icons/HomeIcon';
import { styles } from './CustomTabBar.styles';
import BusIcon from '../../../assets/icons/BusIcon';
import SuccessCheckIcon from '../../../assets/icons/SuccessCheckIcon';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.wrapper}> 
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel ??
            options.title ??
            route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          const color = isFocused ? '#40A93D' : '#000';

          const iconName = (() => {
            switch (route.name) {
              case 'Главная':
                return <HomeIcon />;
              case 'Копилка':
                return <BusIcon />;
              case 'Дела':
                return <SuccessCheckIcon />;
              default:
                return 'ellipse';
            }
          })();

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.activeTabItem]}
              activeOpacity={0.7}
            >
              {iconName}
              <Text style={[styles.label, { color }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
