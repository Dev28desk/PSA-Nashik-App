

import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

export default function PaymentScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const { amount, studentId } = route.params;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const options = {
        description: 'Academy Fee Payment',
        currency: 'INR',
        key: process.env.RAZORPAY_KEY_ID, // Will be set in environment
        amount: amount * 100,
        name: 'Parmanand Sports Academy',
        prefill: {
          email: 'student@academy.com',
          contact: '+919876543210',
        },
        theme: { color: '#53a20e' }
      };

      const data = await RazorpayCheckout.open(options);
      Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);
      // TODO: Call backend to verify payment
    } catch (error) {
      Alert.alert('Payment Failed', error.description || 'Payment could not be completed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Pay ₹{amount} for Monthly Fee
      </Text>
      <Button
        title={loading ? 'Processing...' : 'Pay Now'}
        onPress={handlePayment}
        disabled={loading}
      />
    </View>
  );
}

