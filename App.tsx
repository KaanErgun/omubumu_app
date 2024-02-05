import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { initDB } from './Database'; // Database fonksiyonlarını import et
import LoginScreen from './LoginScreen'; // LoginScreen bileşenini import et
import ProfileScreen from './ProfileScreen'; // Yeni eklediğiniz ekran

function ChoiceScreen() {
  return (
    <View style={styles.screen}>
      <Text>Tercih Ekranı</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text>Ayarlar</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const App = () => {
  const [isDbLoading, setIsDbLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    initDB()
      .then(() => {
        console.log('Database initialized');
        setIsDbLoading(false);
        // Giriş durumu kontrolü burada yapılabilir.
      })
      .catch((error) => {
        console.error('Database initialization failed:', error);
        setIsDbLoading(false);
      });
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // isLoggedIn state'ini güncelle
  };

  if (isDbLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ChoiceScreen">
        <Drawer.Screen name="Choice Screen" component={ChoiceScreen} options={{ drawerLabel: 'Tercih Ekranı' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ drawerLabel: 'Ayarlar' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerLabel: 'Profil' }} />
      </Drawer.Navigator>
    </NavigationContainer>
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

export default App;
