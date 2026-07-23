import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import { BottomActionBar } from '../../components/ui/BottomActionBar';
import { Button } from '../../components/ui/Button';
import { OTPInput } from '../../components/ui/OTPInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../store/slices/authStore';
import { validateOTP } from '../../utils/validation';

import { useTranslation } from 'react-i18next';

const OTP_EXPIRY = 30;

export const OTPVerificationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { t } = useTranslation(['auth']);
  const phone = route.params?.phone || '+91 0000000000';
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(OTP_EXPIRY);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const { login } = useAuthStore();

  useEffect(() => {
    if (countdown <= 0) { return; }
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  useEffect(() => {
    if (validateOTP(otp)) { handleVerify(); }
  }, [otp]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleVerify = () => {
    if (!validateOTP(otp)) return;
    
    // Hardcoded logic for invalid OTP (testing)
    if (otp !== '123456') {
      setError(t('otp.error_invalid'));
      shake();
      setOtp('');
      return;
    }

    login('dummy-token', { id: 'user_123', phone });
  };

  const handleResend = () => {
    setResending(true);
    setOtp('');
    setError('');
    setTimeout(() => {
      setResending(false);
      setCountdown(OTP_EXPIRY);
    }, 1200);
  };

  const maskedPhone = phone.length > 5
    ? `${'•'.repeat(Math.max(0, phone.length - 4))}${phone.slice(-4)}`
    : phone;

  const timerStr = `${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <OnboardingHeader showBack onBack={() => navigation.goBack()} centerLabel={t('otp.header')} />

      <View style={styles.body}>
        <View style={styles.topCopy}>
          <Text style={styles.overline}>{t('otp.overline')}</Text>
          <Text style={styles.title}>{t('otp.title')}</Text>
          <Text style={styles.subtitle}>
            {t('otp.subtitle')}
            <Text style={styles.phoneHighlight}>{maskedPhone}</Text>
          </Text>
        </View>

        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <OTPInput
            length={6}
            value={otp}
            onChange={v => { setOtp(v); if (error) { setError(''); } }}
            error={!!error}
            autoFocus
          />
        </Animated.View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.resendRow}>
          {countdown > 0 ? (
            <Text style={styles.timerText}>
              {t('otp.resend_in')}<Text style={styles.timerValue}>{timerStr}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} disabled={resending} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Icon name="refresh" size={16} color={theme.colors.primary} />
              <Text style={styles.resendBtn}>
                {resending ? t('otp.resend_active') : t('otp.resend_btn')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.devHint}>
          <Text style={styles.devText}>{t('otp.dev_hint')}</Text>
        </View>

        <View style={styles.trustNote}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <Icon name="lock-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.trustText, { flex: 1 }]}>{t('otp.trust_note')}</Text>
          </View>
        </View>
      </View>

      <BottomActionBar>
        <Button
          title={t('otp.btn_verify')}
          onPress={handleVerify}
          disabled={!validateOTP(otp)}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.changeRow}>
          <Text style={styles.changeText}>{t('otp.btn_change')}</Text>
        </TouchableOpacity>
      </BottomActionBar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
  topCopy: { marginBottom: 36 },
  overline: {
    fontSize: 10,
    letterSpacing: 3,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: 8
  },
  title: {
    fontSize: 28,
    color: theme.colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: { fontSize: 15, color: theme.colors.textSecondary, lineHeight: 22 },
  phoneHighlight: { color: theme.colors.primary, fontWeight: '600' },
  
  errorText: { color: theme.colors.error, fontSize: 13, textAlign: 'center', marginTop: 12 },
  
  resendRow: { alignItems: 'center', marginTop: 20, marginBottom: 28 },
  timerText: { fontSize: 13, color: theme.colors.textSecondary },
  timerValue: { color: theme.colors.primary, fontWeight: '600' },
  resendBtn: { fontSize: 14, color: theme.colors.primary, fontWeight: '500' },
  
  devHint: {
    backgroundColor: 'rgba(212,175,55,0.08)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  devText: { fontSize: 11, color: theme.colors.primary, textAlign: 'center', fontStyle: 'italic' },
  
  trustNote: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 14,
  },
  trustText: { fontSize: 12, color: theme.colors.textSecondary, lineHeight: 18 },
  
  changeRow: { alignItems: 'center', paddingVertical: 12 },
  changeText: { fontSize: 13, color: theme.colors.textSecondary, textDecorationLine: 'underline' },
});
