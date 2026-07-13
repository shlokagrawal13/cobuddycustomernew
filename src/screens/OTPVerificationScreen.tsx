import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/slices/authStore';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const OTPVerificationScreen = () => {
  const navigation = useNavigation<any>();
  const login = useAuthStore((state) => state.login);
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    login('dummy-token', { id: 'user_123', phone: 'verified' });
    navigation.reset({
      index: 0,
      routes: [{ name: 'OnboardingStack' }],
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Please enter the 4-digit code sent to your number.</Text>
      
      <View style={styles.form}>
        <Input 
          label="Secure Code" 
          placeholder="0 0 0 0" 
          keyboardType="number-pad"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
          textAlign="center"
          autoFocus
        />
      </View>
      
      <Button title="Verify & Continue" onPress={handleVerify} disabled={otp.length < 4} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.h2,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.body,
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  }
});
