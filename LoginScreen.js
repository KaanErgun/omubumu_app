import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { loginUser } from './Database'; // './Database' yolu kendi dosya yapınıza göre ayarlayın



const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    loginUser(email, password)
      .then((user) => {
        console.log('Login successful:', user);
        onLoginSuccess(); // Kullanıcı girişi başarılı ise bu fonksiyonu çağır
      })
      .catch((error) => {
        console.error('Login failed:', error);
        Alert.alert('Login Failed', 'Incorrect email or password.'); // Kullanıcıya hata mesajı göster
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc" // Placeholder metni için daha açık bir renk
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc" // Placeholder metni için daha açık bir renk
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {/* Button yerine TouchableOpacity kullanarak daha özelleştirilebilir bir buton oluşturabiliriz */}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#333', // Arka planı dark mod için koyu renk yapabiliriz
  },
  input: {
    height: 40,
    marginVertical: 10,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#fff', // Input metni rengi
    backgroundColor: '#555', // Input arka planı
  },
  button: {
    marginTop: 20,
    width: '80%',
    backgroundColor: '#0066cc', // Buton arka planı
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // Buton metni rengi
  },
});

export default LoginScreen;
