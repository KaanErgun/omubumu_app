import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addChoice } from './Database'; 


// Veritabanı işlemleri için fonksiyonları içeren dosyanızı import edin
// Örneğin: import { addPreference } from './Database';

const PreferenceEntryScreen = () => {
  const [choiceA, setChoiceA] = useState('');
  const [choiceB, setChoiceB] = useState('');

  const handleSave = () => {
    // Giriş doğrulaması
    if (!choiceA.trim() || !choiceB.trim()) {
      Alert.alert('Hata', 'Lütfen her iki tercihi de girin.');
      return;
    }

    // Veritabanına kaydetme işlemi
    // addPreference(choiceA, choiceB) fonksiyonunuzu burada çağırın
    // Bu fonksiyonun, veritabanına veri ekleyen ve bir Promise döndüren bir fonksiyon olduğunu varsayıyoruz
    addChoice(choiceA, choiceB)
      .then(() => {
        Alert.alert('Başarılı', 'Tercihler başarıyla kaydedildi.');
        // Başarıyla kaydettikten sonra metin kutularını temizleyin
        setChoiceA('');
        setChoiceB('');
      })
      .catch(error => {
        console.error('Tercih kaydetme hatası:', error);
        Alert.alert('Hata', 'Tercihleri kaydederken bir hata oluştu.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tercih 1"
        value={choiceA}
        onChangeText={setChoiceA}
        style={styles.input}
      />
      <TextInput
        placeholder="Tercih 2"
        value={choiceB}
        onChangeText={setChoiceB}
        style={styles.input}
      />
      <Button title="Kaydet" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PreferenceEntryScreen;
