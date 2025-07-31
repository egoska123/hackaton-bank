import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {styles} from "./PiggyBankCard.styles"

interface PiggyBankCardProps {
  title: string;
  savedAmount: number;
  targetAmount: number;
  imageSource: any; // require('...') или { uri: '...' }
  onPress?: () => void;
}

const PiggyBankCard: React.FC<PiggyBankCardProps> = ({
  title,
  savedAmount,
  targetAmount,
  imageSource,
  onPress,
}) => {
  const progress = Math.min(savedAmount / targetAmount, 1);

  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.card} onPress={onPress}>
      <View style={styles.innerContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.title}>{title}</Text>
           <Text style={styles.amounts}>
            <Text style={styles.savedAmount}>{savedAmount}₽ </Text>
            из {targetAmount}₽
         </Text>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PiggyBankCard

