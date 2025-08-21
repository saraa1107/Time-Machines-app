import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

export default function ClsVScreen({ navigation }) {
  const [nivel1PressCount, setNivel1PressCount] = useState(0);

  const handleNivel1Press = () => {
    if (nivel1PressCount === 0) {
      setNivel1PressCount(1);
    } else {
      navigation.navigate('LeonardoScreen');
    }
  };

  const handleBackPress = () => {
    navigation.navigate('TimeMachinesScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds/clasaV-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Exploratorii clasei a VI-a</Text>

        <TouchableOpacity style={styles.button} onPress={handleNivel1Press}>
          <Text style={styles.buttonText}>Nivel 1</Text>
          {nivel1PressCount === 1 && (
            <Text style={styles.infoText}>Renasterea</Text>
          )}
        </TouchableOpacity>

        {/* Butonul Inapoi */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Înapoi</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Chalkduster',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#fff8dc',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
    width: 220,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Chalkduster',
    color: '#333',
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    fontFamily: 'Chalkduster',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#a9a9a9',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Chalkduster',
  },
});