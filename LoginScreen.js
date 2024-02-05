import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { loginUser } from './Database';

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
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
    width: '80%',
  },
});

export default LoginScreen;
