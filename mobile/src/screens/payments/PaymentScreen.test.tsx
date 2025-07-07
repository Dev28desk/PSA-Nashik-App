


import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PaymentScreen from './PaymentScreen';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('PaymentScreen', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('renders payment button', () => {
    const { getByText } = render(<PaymentScreen />);
    expect(getByText('Pay Now')).toBeTruthy();
  });

  it('handles successful payment', async () => {
    mockAxios.onPost('/payments/verify').reply(200);
    
    const { getByText } = render(<PaymentScreen />);
    fireEvent.press(getByText('Pay Now'));
    
    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
    });
  });
});


