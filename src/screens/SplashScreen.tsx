import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import { useAuthStore } from '../store/slices/authStore';

export const SplashScreen = ({ navigation }: any) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('MainTabNavigator');
      } else {
        navigation.replace('AuthStack');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>CoBuddy</Text>
      <ActivityIndicator size="large" color={theme.colors.secondary} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary, // Navy Blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: theme.colors.secondary, // Gold
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  loader: {
    marginTop: 24,
  }
});
