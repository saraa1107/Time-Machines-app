import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ClsVScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon...🕰️ Intre timp poti juca nivele de la clasa a V-a si a VII-a</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
