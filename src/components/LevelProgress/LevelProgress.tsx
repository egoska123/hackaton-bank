import React from 'react';
import { View, Text } from 'react-native';

import {styles} from "./LevelProgress.styles"

interface LevelProgressProps {
  name: string;
  fillPercent: number; // от 0 до 100
  startLevel: number;
  endLevel: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  name,
  fillPercent,
  startLevel,
  endLevel,
}) => {
  const fillWidth = `${Math.min(fillPercent, 100)}%`;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: fillWidth }]} />
      </View>

      <View style={styles.levelsRow}>
        <Text style={styles.levelText}>Уровень {startLevel}</Text>
        <Text style={styles.levelText}>Уровень {endLevel}</Text>
      </View>
    </View>
  );
};

export default LevelProgress;
