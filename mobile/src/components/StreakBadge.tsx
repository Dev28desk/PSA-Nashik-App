import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StreakBadgeProps {
  streak: number;
  size?: 'small' | 'medium' | 'large';
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, size = 'medium' }) => {
  const sizes = {
    small: 24,
    medium: 32,
    large: 48
  };

  return (
    <View style={[styles.badge, { width: sizes[size], height: sizes[size] }]}>
      <Text style={styles.text}>{streak}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  }
});
