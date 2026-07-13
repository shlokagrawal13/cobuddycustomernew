import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const PhoneLoginScreen = () => {
  const navigation = useNavigation<any>();
  const [phone, setPhone] = useState('');

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      navigation.navigate('OTPVerificationScreen', { phone });
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>Enter your phone number</Text>
      <Text style={styles.subtitle}>We will send a 4-digit code to verify your account.</Text>
      
      <View style={styles.form}>
        <Input 
          label="Phone Number" 
          placeholder="e.g. +91 9876543210" 
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          autoFocus
        />
      </View>
      
      <Button title="Send OTP" onPress={handleSendOTP} disabled={phone.length < 10} />
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
