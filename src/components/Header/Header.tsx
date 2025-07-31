import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './Header.styles';
import QrcodeIcon from '../../../assets/icons/QrcodeIcon';
import SettingsIcon from '../../../assets/icons/SettingsIcon';


interface Props {
  firstName: string;
  lastName: string;
  photoUri?: string;
  onBackToRoleSelection?: () => void;
}

const Header: React.FC<Props> = ({ firstName, lastName, photoUri, onBackToRoleSelection }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        )}
        <View style={styles.texts}>
          <Text style={styles.hello}>Привет</Text>
          <Text style={styles.name}>{firstName}!</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <QrcodeIcon />
        {onBackToRoleSelection ? (
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={onBackToRoleSelection}
            activeOpacity={0.7}
          >
            <SettingsIcon/>
          </TouchableOpacity>
        ) : (
          <SettingsIcon/>
        )}
      </View>
    </View>
  );
};

export default Header;
