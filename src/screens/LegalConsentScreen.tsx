import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/slices/authStore';

export const LegalConsentScreen = ({ navigation }: any) => {
  const { t } = useTranslation(['onboarding']);
  const [agreed, setAgreed] = useState(false);
  const handleAccept = () => {
    navigation.navigate('LocationPermissionScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('legalConsent', 'Terms & Privacy')}</Text>
      
      <View style={styles.content}>
        <Text style={styles.text}>
          By using CoBuddy, you agree to our Terms of Service and Privacy Policy. We are committed to protecting your data and ensuring a safe environment for everyone.
        </Text>
        <Text style={styles.text}>
          Please respect other members, adhere to our community guidelines, and report any suspicious behavior immediately.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.checkboxRow} 
        onPress={() => setAgreed(!agreed)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
          {agreed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>I agree to the Terms & Privacy Policy</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Button 
          title={t('acceptContinue', 'Accept & Continue')} 
          disabled={!agreed}
          onPress={handleAccept} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes.h2,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
  },
  checkmark: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  footer: {
    paddingVertical: theme.spacing.md,
  }
});
