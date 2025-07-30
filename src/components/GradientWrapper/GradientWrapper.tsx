import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenGradient } from './GradientWrapper.styles';

interface GradientWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({ children, style }) => {
  return (
    <LinearGradient {...screenGradient} style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    // paddingTop: 16,
  },
});

export default GradientWrapper;
