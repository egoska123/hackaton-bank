import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './Card.styles';
import PercentIcon from '../../../assets/icons/PercentIcon';


interface CardProps {
  balance: number;
}

const Card: React.FC<CardProps> = ({ balance }) => {
  return (
    <LinearGradient
      colors={['#F4CF49', '#40A93D']}
      start={{ x: 0.9, y: 0.8 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      <View style={styles.leftBlock}>
        <PercentIcon width={60} height={65} />
        <View style={styles.leftBlockText}>
            <Text style={styles.balanceText}>Баланс</Text>
            <Text style={styles.amount}>{balance} ₽</Text>
        </View>
      </View>
      <Image
        source={require('../../../assets/images/cat.png')} // подключаем кота
        style={styles.catImage}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

export default Card;
