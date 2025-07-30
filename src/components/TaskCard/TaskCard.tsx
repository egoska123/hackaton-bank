import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckIcon from '../../../assets/icons/CheckIcon';
import { styles } from './TaskCard.styles';

interface Props {
  text: string;
  variant?: 'parents' | 'system' | 'completed';
   onPress?: () => void;
   earn: number;
}

const TaskCard: React.FC<Props> = ({ text, variant='system', onPress , earn}) => {
  const isParents = variant === 'parents';
  const isCompleted = variant === 'completed'

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        styles.container,
        isParents && styles.parentsContainer, // добавляем стиль при variant === 'parents'
        isCompleted && styles.completedContainer,
      ]}
    >
      <Text style={[styles.text, isCompleted && styles.completedText]}>{text}</Text>
      <CheckIcon />
    </TouchableOpacity>
  );
};

export default TaskCard;  