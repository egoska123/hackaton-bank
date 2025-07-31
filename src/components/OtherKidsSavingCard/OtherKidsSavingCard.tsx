import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './OtherKidsSavingCard.styles';
import PlusIcon from '../../../assets/icons/PlusIcon';

interface OtherKidsSavingCardProps {
  title: string;
  price: number;
  imageSource: any;
  description: string;
  productUrl?: string;
  onPress?: (item: { title: string; price: number; imageSource: any; description: string; productUrl?: string }) => void;
}

const OtherKidsSavingCard: React.FC<OtherKidsSavingCardProps> = ({ title, price, imageSource, description, productUrl, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress({ title, price, imageSource, description, productUrl });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.row}>
        <View style={styles.imageWrapper}>
          <Image source={imageSource} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.infoCont}>
          <View style={styles.info}>
            <Text style={styles.caption}>На что копят другие дети?</Text>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
          </View>

          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{price.toLocaleString()} ₽</Text>
            <TouchableOpacity style={styles.iconButton}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OtherKidsSavingCard;
