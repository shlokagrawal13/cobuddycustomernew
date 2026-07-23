import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';

export const KYCIntroScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation(['onboarding']);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="shield-check" size={64} color={theme.colors.primary} />
        </View>

        <Text style={styles.title}>Verify your Identity</Text>
        <Text style={styles.subtitle}>
          To ensure a safe and trustworthy community, all users must complete a quick verification before their first booking.
        </Text>

        <View style={styles.features}>
          <View style={styles.featureRow}>
            <Icon name="card-account-details-outline" size={24} color={theme.colors.primary} />
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Government ID Verification</Text>
              <Text style={styles.featureDesc}>Securely scan your Aadhaar, PAN, DL, or Passport.</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <Icon name="face-recognition" size={24} color={theme.colors.primary} />
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Liveness Check</Text>
              <Text style={styles.featureDesc}>A quick selfie to ensure you match your ID.</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.privacyText}>
          <Icon name="lock" size={12} color={theme.colors.textSecondary} /> Your data is securely encrypted and never shared.
        </Text>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('DocumentVerificationScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.nextBtnText}>Start Verification</Text>
          <Icon name="arrow-right" size={20} color={theme.colors.background} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 12,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 40,
  },
  features: {
    gap: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureTextWrap: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  bottomBar: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    backgroundColor: theme.colors.surface,
  },
  privacyText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  nextBtn: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    gap: 8,
  },
  nextBtnText: {
    color: theme.colors.background,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
