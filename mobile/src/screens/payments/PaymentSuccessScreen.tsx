

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaymentSuccessScreen({ route }) {
  const { paymentId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.receipt}>Receipt #: {paymentId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  receipt: {
    fontSize: 16,
    color: '#666'
  }
});

