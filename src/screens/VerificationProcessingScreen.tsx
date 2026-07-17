import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

export const VerificationProcessingScreen = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(0);

  // Pulse animation for the loader
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // MOCK: Simulate API calls for verification
    const timer1 = setTimeout(() => setStep(1), 2000); // "Matching faces..."
    const timer2 = setTimeout(() => setStep(2), 4000); // "Success!"
    const timer3 = setTimeout(() => {
      navigation.replace('VerificationPendingScreen');
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        {step < 2 ? (
          <View style={styles.loaderWrap}>
            <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]}>
              <Icon name="shield-search" size={48} color={theme.colors.primary} />
            </Animated.View>
            <Text style={styles.title}>
              {step === 0 ? "Verifying Government ID..." : "Matching biometric data..."}
            </Text>
            <Text style={styles.subtitle}>Securely processing via Digilocker. Please do not close the app.</Text>
          </View>
        ) : (
          <View style={styles.loaderWrap}>
            <View style={styles.successCircle}>
              <Icon name="check-decagram" size={64} color={theme.colors.primary} />
            </View>
            <Text style={styles.title}>Verification Complete</Text>
            <Text style={styles.subtitle}>Your profile is now trusted and secure.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loaderWrap: {
    alignItems: 'center',
  },
  pulseCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
