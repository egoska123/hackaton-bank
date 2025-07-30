import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/Header';
import { styles } from './MainScreen.styles';
import GradientWrapper from '../../components/GradientWrapper/GradientWrapper';
import Card from '../../components/Card/Card';
import ClockIcon from '../../../assets/icons/ClockIcon';
import PurchaseHistoryDay from '../../components/PurchaseHistoryDay/PurchaseHistoryDay';
import { ScrollView } from 'react-native-gesture-handler';
import { mockPurchaseHistory } from '../../mocks/mockPurchaseHistory';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';

export default function MainScreen() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <Header
          firstName="Никита"
          lastName="Иванов"
          photoUri="https://example.com/avatar.jpg"
        />

        {!showHistory ? (
          <View style={styles.main}>
            <Card balance={1000} />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendText}>Отправить</Text>
                <ArrowRightIcon />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.historyButton}
                onPress={() => setShowHistory(true)}
              >
                <Text style={styles.historyText}>История покупок</Text>
                <ClockIcon />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.history}>
            <View style={styles.historyTitle}>
              <TouchableOpacity
                style={styles.aroowLCont}
                onPress={() => setShowHistory(false)}
              >
                <ArrowLeftIcon />
              </TouchableOpacity>
              <Text style={styles.historyTitleText}>История покупок</Text>
            </View>

            <ScrollView>
              {mockPurchaseHistory.map((day, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <PurchaseHistoryDay
                    dateTitle={day.dateTitle}
                    items={day.items}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </GradientWrapper>
  );
}
