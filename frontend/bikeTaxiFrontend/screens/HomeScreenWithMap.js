import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreenWithMap = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Home Screen with Map!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreenWithMap;
