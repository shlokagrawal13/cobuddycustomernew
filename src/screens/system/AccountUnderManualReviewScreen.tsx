import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const AccountUnderManualReviewScreen = () => {
  const { t } = useTranslation(['system']);
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="clipboard-search-outline" size={72} color={theme.colors.primary} />
        </View>
        
        <Text style={styles.title}>Under Review</Text>
        <Text style={styles.message}>
          Your account is currently under manual review by our Trust & Safety team to ensure a secure environment for everyone.
        </Text>
        
        <View style={styles.infoBox}>
          <Icon name="clock-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>This process usually takes 24-48 hours.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('SupportCenterScreen')}
        >
          <Text style={styles.primaryButtonText}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('AuthStack')}
        >
          <Text style={styles.secondaryButtonText}>Return to Login</Text>
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
    marginBottom: 24,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  infoText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  footer: {
    padding: 24,
    gap: 16,
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
  secondaryButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
