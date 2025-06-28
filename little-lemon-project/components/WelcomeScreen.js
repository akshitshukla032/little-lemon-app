import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/kgHvcvLg/logo-background.png' }} // Replace with your image
      resizeMode="cover"
      style={styles.background}
      imageStyle={{ opacity: 0.2 }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Welcome to our restaurant!</Text>
        <Button
          title="Register Now"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#495E57',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
});
