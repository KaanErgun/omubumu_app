// SettingScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingScreen = () => {
    return (
        <View style={styles.screen}>
          <Text>Ayarlar</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default SettingScreen;