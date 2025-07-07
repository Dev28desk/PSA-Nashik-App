


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from '../screens/payments/PaymentScreen';
import PaymentSuccessScreen from '../screens/payments/PaymentSuccessScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Payment">
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{ title: 'Make Payment' }}
      />
      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccessScreen}
        options={{ title: 'Payment Receipt' }}
      />
    </Stack.Navigator>
  );
}


