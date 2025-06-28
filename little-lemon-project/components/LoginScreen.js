import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (contact && password) {
      // ✅ This line sends user to HomeScreen
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Please enter both contact and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email or Phone"
        style={styles.input}
        keyboardType="email-address"
        value={contact}
        onChangeText={setContact}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#495E57',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
