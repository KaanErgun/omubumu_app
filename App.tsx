import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { initDB,getRandomChoice } from './Database'; // Database fonksiyonlarını import et
import LoginScreen from './LoginScreen'; // LoginScreen bileşenini import et
import ProfileScreen from './ProfileScreen'; // Yeni eklediğiniz ekran
import PreferenceEntryScreen from './PreferenceEntryScreen';
import SettingsScreen from './SettingScreen'; // Yeni eklediğiniz ekran

const { height } = Dimensions.get('window');

//ChoiceScreen bileşenini ekleyin başlangıç
function ChoiceScreen() {
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    getRandomChoice()
      .then((selectedChoice) => {
        setChoice(selectedChoice); // Seçilen tercihi state'e kaydet
      })
      .catch((error) => {
        console.error('Error fetching random choice:', error);
      });
  }, []);

  const handleChoicePress = (choice: string) => {
    // Burada seçilen tercih ile ilgili bir işlem yapabilirsiniz
    console.log(`Seçilen tercih: ${choice}`);
  };

  if (!choice) {
    return (
      <View style={styles.screen}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.choice, { backgroundColor: '#ADD8E6' }]}
        onPress={() => handleChoicePress((choice as { choiceA: string }).choiceA)}
      >
        <Text style={styles.choiceText}>{(choice as { choiceA: string }).choiceA}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.choice, { backgroundColor: '#FFB6C1' }]}
        onPress={() => handleChoicePress((choice as { choiceB: string }).choiceB)}
      >
        <Text style={styles.choiceText}>{(choice as { choiceB: string }).choiceB}</Text>
      </TouchableOpacity>
    </View>
  );
}
//ChoiceScreen bileşenini ekleyin bitiş

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
        <Drawer.Screen name="PreferenceEntry" component={PreferenceEntryScreen} options={{ drawerLabel: 'Tercih Girişi' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  choice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height / 2, // Ekranın yarısı kadar yükseklik
  },
  choiceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
