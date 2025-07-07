

import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
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
      
// Verify payment with backend
await axios.post(`${API_BASE_URL}/payments/verify`, {
  paymentId: data.razorpay_payment_id,
  orderId: data.razorpay_order_id
});
// Update local state or navigation
navigation.navigate('PaymentSuccess', { 
  paymentId: data.razorpay_payment_id 
});

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

