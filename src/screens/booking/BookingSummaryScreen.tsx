import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

export const BookingSummaryScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const route = useRoute<any>();
  const { t } = useTranslation(['booking']);
  
  const { activity, venue, date, time, duration = 1 } = route.params || {};

  // DEV MOCK: Toggle to test KYC interceptor
  const [isKycVerified, setIsKycVerified] = useState(false);
  
  // User Input State
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [agreedToSafety, setAgreedToSafety] = useState(false);

  // Pricing calculations (MOCK parsing)
  const baseRate = parseInt(activity?.price?.replace(/[^0-9]/g, '') || '500', 10);
  const baseTotal = baseRate * duration;
  const serviceFee = 50;
  const totalAmount = baseTotal + serviceFee;

  const handleSendRequest = () => {
    if (!isKycVerified) {
      // KYC Interceptor: Redirect to KYC Stack
      // Normally this would be a global modal or a navigation push
      navigation.navigate('KYCStack');
    } else {
      // Success: Proceed to Request Sent
      navigation.navigate('BookingRequestSentScreen');
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Top Header & Progress */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 4 of 4</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '100%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Review your Request</Text>
        <Text style={styles.subtitle}>Please confirm the details below before sending your request.</Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.iconWrap}>
              <Icon name={activity?.icon || 'coffee'} size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Activity</Text>
              <Text style={styles.summaryValue}>{activity?.title || 'Coffee Meetup'}</Text>
            </View>
            <Text style={styles.priceValue}>{activity?.price || '₹500/hr'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <View style={styles.iconWrap}>
              <Icon name="map-marker-outline" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Venue</Text>
              <Text style={styles.summaryValue}>{venue?.name || 'Custom Venue'}</Text>
              <Text style={styles.summarySubValue}>{venue?.address || ''}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <View style={styles.iconWrap}>
              <Icon name="calendar-clock-outline" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Date & Time</Text>
              <Text style={styles.summaryValue}>{date?.dayName}, {date?.dayNumber}</Text>
              <Text style={styles.summarySubValue}>{time} ({duration} {duration === 1 ? 'hour' : 'hours'})</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Special Instructions</Text>
        <TextInput
          style={styles.instructionInput}
          placeholder="How will the companion recognize you? Any special requests?"
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          numberOfLines={3}
          value={specialInstructions}
          onChangeText={setSpecialInstructions}
        />

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Payment Summary</Text>
        <View style={styles.pricingBox}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base Fare (₹{baseRate} x {duration} hr)</Text>
            <Text style={styles.priceAmount}>₹{baseTotal}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Safety & Service Fee</Text>
            <Text style={styles.priceAmount}>₹{serviceFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalValue}>₹{totalAmount}</Text>
          </View>
        </View>
        <Text style={styles.totalDisclaimer}>Payment is processed only after the companion accepts.</Text>

        <TouchableOpacity 
          style={styles.safetyAgreementRow} 
          onPress={() => setAgreedToSafety(!agreedToSafety)}
          activeOpacity={0.7}
        >
          <Icon 
            name={agreedToSafety ? "checkbox-marked" : "checkbox-blank-outline"} 
            size={24} 
            color={agreedToSafety ? theme.colors.primary : theme.colors.textSecondary} 
          />
          <Text style={styles.safetyAgreementText}>
            I agree to meet in a public place and strictly follow the CoBuddy safety guidelines.
          </Text>
        </TouchableOpacity>

        {/* DEV MOCK: KYC Toggle */}
        <View style={styles.devBox}>
          <Text style={styles.devTitle}>[Dev] Simulate KYC Status</Text>
          <View style={styles.devRow}>
            <Text style={styles.devText}>KYC Verified?</Text>
            <Switch 
              value={isKycVerified} 
              onValueChange={setIsKycVerified}
              trackColor={{ false: '#767577', true: theme.colors.success }}
            />
          </View>
          <Text style={styles.devDesc}>
            If FALSE, pressing "Send Request" will trigger the KYC interceptor.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.nextBtn, !agreedToSafety && styles.nextBtnDisabled]}
          disabled={!agreedToSafety}
          onPress={handleSendRequest}
          activeOpacity={0.8}
        >
          <Text style={[styles.nextBtnText, !agreedToSafety && styles.nextBtnTextDisabled]}>Send Request</Text>
          <Icon name="send-outline" size={20} color={agreedToSafety ? theme.colors.background : 'rgba(255,255,255,0.4)'} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  progressContainer: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.success, // Green for final step
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginBottom: 32,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  summarySubValue: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 24,
  },
  instructionInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    color: theme.colors.textPrimary,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  pricingBox: {
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  priceAmount: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.primary,
  },
  totalDisclaimer: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  safetyAgreementRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 59, 48, 0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    alignItems: 'center',
    marginTop: 12,
  },
  safetyAgreementText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: theme.colors.textPrimary,
    lineHeight: 18,
  },
  devBox: {
    marginTop: 40,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.error,
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  devTitle: {
    color: theme.colors.error,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  devRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  devText: {
    color: theme.colors.textPrimary,
    fontSize: 15,
  },
  devDesc: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
  bottomBar: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    backgroundColor: theme.colors.surface,
  },
  nextBtn: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    gap: 12,
  },
  nextBtnDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  nextBtnText: {
    color: theme.colors.background,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  nextBtnTextDisabled: {
    color: 'rgba(255,255,255,0.4)',
  },
});
