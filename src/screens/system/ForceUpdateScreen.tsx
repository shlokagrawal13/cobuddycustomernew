import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const ForceUpdateScreen = () => {
  const { t } = useTranslation(['system']);

  const handleUpdate = () => {
    // Platform specific store URL
    const url = 'https://play.google.com/store/apps/details?id=com.cobuddy.customer';
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="cellphone-arrow-down" size={72} color={theme.colors.primary} />
        </View>
        
        <Text style={styles.title}>Update Required</Text>
        <Text style={styles.message}>
          A crucial update is available for CoBuddy. Please update the app to the latest version to continue using our services and enjoy new features.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleUpdate}
        >
          <Text style={styles.primaryButtonText}>Update Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
