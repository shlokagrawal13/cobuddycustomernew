import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const STEPS = [
  {id: 1, icon: 'face-recognition', label: 'Selfie Verification',  status: 'COMPLETED'},
  {id: 2, icon: 'shield-account',   label: 'Live Identity Check',  status: 'COMPLETED'},
  {id: 3, icon: 'file-document',    label: 'Document Verification', status: 'PROCESSING'},
  {id: 4, icon: 'check-decagram',   label: 'Booking Authorization', status: 'PENDING'},
];

const CARD_BG = 'rgba(11,13,26,0.8)';
const CARD_BORDER = 'rgba(255,255,255,0.08)';

export const VerificationProcessingScreen = () => {
  const navigation = useNavigation<any>();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [activeStep, setActiveStep] = useState(2); // 0=none, 1=face, 2=doc, 3=auth, 4=done

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {toValue: 1.15, duration: 900, useNativeDriver: true}),
        Animated.timing(pulseAnim, {toValue: 1.0,  duration: 900, useNativeDriver: true}),
      ]),
    ).start();

    const t1 = setTimeout(() => setActiveStep(3), 2000); // auth pending -> processing
    const t2 = setTimeout(() => setActiveStep(4), 4000); // all done
    const t3 = setTimeout(() => {
      navigation.replace('VerificationPendingScreen');
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigation, pulseAnim]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.surface} />

      <View style={styles.header}>
        <View style={styles.headerIconWrap}>
          <Icon name="lock" size={18} color={theme.colors.primary} />
        </View>
        <Text style={styles.headerTitle}>Secure Verification</Text>
        <View style={styles.headerIconWrap}>
          <Icon name="shield-check" size={18} color={theme.colors.primary} />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bgGlow} pointerEvents="none" />

        <Animated.View style={[styles.heroRing, {transform: [{scale: pulseAnim}]}]}>
          <View style={styles.heroInnerRing}>
            <Icon name={activeStep >= 4 ? "check-decagram" : "shield-search"} size={52} color={theme.colors.primary} />
          </View>
        </Animated.View>

        <Text style={styles.heroTitle}>
          {activeStep >= 4 ? `Verification\nComplete` : `Securely Verifying\nYour Identity`}
        </Text>
        <Text style={styles.heroSub}>
          {activeStep >= 4 ? 'Your profile is now trusted.' : 'Reviewing verification details...'}
        </Text>

        <View style={styles.progressBarTrack}>
          <Animated.View style={[styles.progressBarFill, { width: activeStep >= 4 ? '100%' : '65%' }]} />
        </View>

        <View style={styles.stepStack}>
          {STEPS.map((step, i) => {
            const isDone = activeStep > i;
            const isProcessing = activeStep === i;
            
            return (
              <View key={step.id} style={[styles.stepRow, i < STEPS.length - 1 && styles.stepRowBorder]}>
                <View style={[
                  styles.stepIconWrap,
                  isDone && styles.stepIconWrapDone,
                  isProcessing && styles.stepIconWrapActive,
                ]}>
                  <Icon
                    name={step.icon}
                    size={18}
                    color={
                      isDone ? theme.colors.success
                        : isProcessing ? theme.colors.primary : theme.colors.textSecondary
                    }
                  />
                </View>

                <Text style={styles.stepLabel}>{step.label}</Text>

                <View style={[
                  styles.statusBadge,
                  isDone && styles.statusBadgeDone,
                  isProcessing && styles.statusBadgeActive,
                ]}>
                  {isDone ? (
                    <Icon name="check-circle" size={12} color={theme.colors.success} />
                  ) : isProcessing ? (
                    <Icon name="sync" size={12} color={theme.colors.primary} />
                  ) : (
                    <Icon name="radiobox-blank" size={12} color={theme.colors.textSecondary} />
                  )}
                  <Text style={[
                    styles.statusText,
                    isDone && styles.statusTextDone,
                    isProcessing && styles.statusTextActive,
                  ]}>
                    {isDone ? 'COMPLETED' : isProcessing ? 'PROCESSING' : 'PENDING'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.trustBanner}>
          <Icon name="lock" size={16} color={theme.colors.primary} />
          <View style={styles.trustMeta}>
            <Text style={styles.trustTitle}>Your Information Is Protected</Text>
            <Text style={styles.trustSub}>
              We use military-grade end-to-end encryption to secure your identity data.
              Your documents are strictly used for verification purposes and are never shared.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.colors.background},

  header: {
    height: 56, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 20,
    backgroundColor: 'rgba(20,20,15,0.95)',
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: CARD_BORDER,
  },
  headerIconWrap: {width: 36, alignItems: 'center'},
  headerTitle: {fontWeight: '600', fontSize: 15, color: theme.colors.textPrimary, letterSpacing: 0.5},

  body: {
    flex: 1, alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 40, gap: 28,
    position: 'relative',
  },
  bgGlow: {
    position: 'absolute', top: -100, left: 0, right: 0,
    height: 320, backgroundColor: 'rgba(212, 175, 55, 0.03)',
    borderRadius: 200,
  },

  heroRing: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderWidth: 2, borderColor: 'rgba(212, 175, 55, 0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  heroInnerRing: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.35)',
    alignItems: 'center', justifyContent: 'center',
  },

  heroTitle: {
    fontWeight: 'bold', fontSize: 26,
    color: theme.colors.textPrimary, textAlign: 'center', lineHeight: 34,
  },
  heroSub: {fontSize: 13, color: theme.colors.primary, letterSpacing: 0.5},

  progressBarTrack: {
    width: '100%', height: 3, borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.05)', overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%', borderRadius: 2,
    backgroundColor: theme.colors.primary,
    opacity: 0.8,
  },

  stepStack: {
    width: '100%',
    backgroundColor: CARD_BG, borderRadius: 20,
    borderWidth: 1, borderColor: CARD_BORDER, padding: 16,
  },
  stepRow: {flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10},
  stepRowBorder: {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: CARD_BORDER},
  stepIconWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  stepIconWrapDone: {backgroundColor: 'rgba(16, 185, 129, 0.10)'},
  stepIconWrapActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.30)',
  },
  stepLabel: {flex: 1, fontWeight: '500', fontSize: 13, color: theme.colors.textPrimary},
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 100, paddingHorizontal: 8, paddingVertical: 3,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: CARD_BORDER,
  },
  statusBadgeDone: {backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.20)'},
  statusBadgeActive: {backgroundColor: 'rgba(212, 175, 55, 0.10)', borderColor: 'rgba(212, 175, 55, 0.25)'},
  statusText: {fontWeight: '600', fontSize: 9, color: theme.colors.textSecondary, letterSpacing: 1},
  statusTextDone: {color: theme.colors.success},
  statusTextActive: {color: theme.colors.primary},

  trustBanner: {
    width: '100%',
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    borderRadius: 16, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.15)',
    borderLeftWidth: 3, borderLeftColor: theme.colors.primary,
    padding: 16,
  },
  trustMeta: {flex: 1, gap: 6},
  trustTitle: {fontWeight: '600', fontSize: 13, color: theme.colors.textPrimary},
  trustSub: {fontSize: 11, color: theme.colors.textSecondary, lineHeight: 16},
});
