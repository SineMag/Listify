import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedbackMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#72ddf7',
    borderRadius: 5,
    marginVertical: 10,
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FeedbackMessage;
