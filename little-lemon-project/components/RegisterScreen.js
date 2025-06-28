import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

export default function RegisterScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');

  const handleRegister = () => {
  if (firstName && lastName && contact) {
    Alert.alert('Registration Complete', `Welcome, ${firstName}!`);
    navigation.navigate('Login'); // 👈 This line navigates to the Login screen
  } else {
    Alert.alert('Please fill all fields');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Email or Phone"
        style={styles.input}
        keyboardType="email-address"
        value={contact}
        onChangeText={setContact}
      />

      <Button title="Register" onPress={handleRegister} />
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
