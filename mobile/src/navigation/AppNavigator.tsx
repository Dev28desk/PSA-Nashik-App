


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from '../screens/payments/PaymentScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Payment">
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{ title: 'Make Payment' }}
      />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}


