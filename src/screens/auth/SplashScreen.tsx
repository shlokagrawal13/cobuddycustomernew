import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>CoBuddy</Text>
      <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: theme.colors.primary,
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  loader: {
    marginTop: 24,
  }
});
