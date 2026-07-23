import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const REVIEW_STEPS = [
  {icon: 'check-circle',        label: 'Document Verification', status: 'Completed',    done: true},
  {icon: 'check-circle',        label: 'Selfie & Liveness Check', status: 'Completed',    done: true},
  {icon: 'close-circle',        label: 'Profile Review',        status: 'Action Required', done: false, error: true},
  {icon: 'clock-outline',       label: 'Booking Authorization', status: 'Blocked',      done: false},
];

export const VerificationRejectedScreen = () => {
  const navigation = useNavigation<any>();

  const handleRetry = () => {
    // Reset back to KYC intro or Document verification
    navigation.reset({
      index: 0,
      routes: [{ name: 'DocumentVerificationScreen' }],
    });
  };

  const handleClose = () => {
    // If KYC was opened from another flow (like Booking), return to it.
    const parent = navigation.getParent();
    if (parent && parent.canGoBack()) {
      parent.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'MainTabNavigator' }] });
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleClose}
          hitSlop={{top:10,bottom:10,left:10,right:10}}
          activeOpacity={0.7}>
          <Icon name="close" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification Status</Text>
        <View style={styles.headerIconWrap}>
          <Icon name="shield-alert" size={24} color={theme.colors.error} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <View style={[styles.heroCard, { borderColor: theme.colors.error }]}>
          <View style={[styles.heroGlow, { backgroundColor: 'rgba(239, 68, 68, 0.05)' }]} pointerEvents="none" />
          <View style={[styles.heroIconRing, { borderColor: theme.colors.error }]}>
            <View style={[styles.heroIconInner, { borderColor: theme.colors.error }]}>
              <Icon name="shield-alert" size={44} color={theme.colors.error} />
            </View>
          </View>

          <Text style={styles.heroTitle}>Verification Failed</Text>

          <View style={styles.statusBadge}>
            <Icon name="alert-circle" size={14} color={theme.colors.error} />
            <Text style={styles.statusBadgeLabel}>STATUS</Text>
            <View style={styles.statusBadgeDivider} />
            <Text style={[styles.statusBadgeValue, { color: theme.colors.error }]}>Action Required</Text>
          </View>

          <View style={styles.etaRow}>
            <Icon name="alert" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.etaText}>
              We could not verify your identity with the provided details.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>VERIFICATION PROGRESS</Text>
          {REVIEW_STEPS.map((step, i) => (
            <View key={step.label} style={[styles.reviewRow, i < REVIEW_STEPS.length - 1 && styles.reviewRowBorder]}>
              <View style={[
                styles.reviewIconWrap, 
                step.done && styles.reviewIconWrapDone,
                step.error && { borderColor: theme.colors.error }
              ]}>
                <Icon
                  name={step.icon}
                  size={16}
                  color={step.done ? theme.colors.success : step.error ? theme.colors.error : theme.colors.textSecondary}
                />
              </View>
              <View style={styles.reviewMeta}>
                <Text style={styles.reviewLabel}>{step.label}</Text>
                <Text style={[
                  styles.reviewStatus, 
                  step.done && styles.reviewStatusDone,
                  step.error && { color: theme.colors.error }
                ]}>
                  {step.status}
                </Text>
              </View>
              {step.done ? (
                <Icon name="check-circle" size={18} color={theme.colors.success} />
              ) : step.error ? (
                <Icon name="alert-circle" size={18} color={theme.colors.error} />
              ) : (
                <Icon name="clock-outline" size={16} color={theme.colors.textSecondary} />
              )}
            </View>
          ))}
        </View>

        <View style={[styles.nextCard, { borderLeftColor: theme.colors.error }]}>
          <View style={styles.nextIconWrap}>
            <Icon name="camera-retake" size={20} color={theme.colors.error} />
          </View>
          <View style={styles.nextMeta}>
            <Text style={styles.nextTitle}>Please Try Again</Text>
            <Text style={styles.nextSub}>
              Ensure your document is clearly visible, not expired, and matches your selfie exactly.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.ctaBtn} onPress={handleRetry} activeOpacity={0.85}>
          <Icon name="refresh" size={18} color={theme.colors.background} />
          <Text style={styles.ctaBtnText}>Retry Verification</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Icon name="headset" size={13} color={theme.colors.textSecondary} />
          <Text style={styles.securityText}>
            Need help? Contact our Concierge Support for manual verification.
          </Text>
        </View>

        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.colors.background},

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1, borderColor: theme.colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {flex: 1, fontWeight: '600', fontSize: 17, color: theme.colors.textPrimary, letterSpacing: 0.2, textAlign: 'center'},
  headerIconWrap: {width: 40, alignItems: 'flex-end'},

  scroll: {flex: 1},
  scrollContent: {paddingHorizontal: 20, paddingTop: 24, gap: 20, paddingBottom: 40},

  heroCard: {
    backgroundColor: theme.colors.surface, borderRadius: 28,
    borderWidth: 1, borderColor: theme.colors.border,
    padding: 28, alignItems: 'center', gap: 16,
    position: 'relative', overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute', top: -80, left: 0, right: 0,
    height: 220, borderRadius: 200,
  },
  heroIconRing: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  heroIconInner: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  heroTitle: {fontWeight: 'bold', fontSize: 26, color: theme.colors.textPrimary, textAlign: 'center'},

  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: theme.colors.background,
    borderRadius: 100, borderWidth: 1, borderColor: theme.colors.border,
    paddingHorizontal: 16, paddingVertical: 8,
  },
  statusBadgeLabel: {fontWeight: '600', fontSize: 10, color: theme.colors.textSecondary, letterSpacing: 1.5},
  statusBadgeDivider: {width: 1, height: 12, backgroundColor: theme.colors.border},
  statusBadgeValue: {fontWeight: '600', fontSize: 13, color: theme.colors.warning},

  etaRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
  etaText: {fontSize: 12, color: theme.colors.textSecondary, flex: 1, lineHeight: 17},

  card: {
    backgroundColor: theme.colors.surface, borderRadius: 20,
    borderWidth: 1, borderColor: theme.colors.border, padding: 20,
  },
  sectionLabel: {
    fontWeight: '600', fontSize: 10,
    color: theme.colors.textSecondary, letterSpacing: 1.5, marginBottom: 14,
  },
  reviewRow: {flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12},
  reviewRowBorder: {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.border},
  reviewIconWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: theme.colors.background,
    borderWidth: 1, borderColor: theme.colors.border,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  reviewIconWrapDone: {
    borderColor: theme.colors.success,
  },
  reviewMeta: {flex: 1},
  reviewLabel: {fontWeight: '500', fontSize: 14, color: theme.colors.textPrimary},
  reviewStatus: {fontSize: 11, color: theme.colors.warning, marginTop: 2},
  reviewStatusDone: {color: theme.colors.success},

  nextCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border,
    borderLeftWidth: 3, padding: 16,
  },
  nextIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  nextMeta: {flex: 1},
  nextTitle: {fontWeight: '600', fontSize: 14, color: theme.colors.textPrimary, marginBottom: 6},
  nextSub: {fontSize: 12, color: theme.colors.textSecondary, lineHeight: 17},

  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 17, borderRadius: 100,
    backgroundColor: theme.colors.error,
  },
  ctaBtnText: {fontWeight: '600', fontSize: 16, color: theme.colors.background, letterSpacing: 0.3},

  securityNote: {flexDirection: 'row', alignItems: 'flex-start', gap: 8, opacity: 0.6},
  securityText: {flex: 1, fontSize: 11, color: theme.colors.textSecondary, lineHeight: 16},
});
