import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './PurchaseHistoryDay.styles';

interface PurchaseItem {
  title: string;
  subtitle: string;
  amount: string;
}

interface Props {
  dateTitle: string;
  items: PurchaseItem[];
}

const PurchaseHistoryDay: React.FC<Props> = ({ dateTitle, items }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.dateTitle}>{dateTitle}</Text>
      {items.map((item, index) => (
        <TouchableOpacity activeOpacity={0.6} key={index} style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          </View>
          <Text style={styles.itemAmount}>{item.amount}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PurchaseHistoryDay;
