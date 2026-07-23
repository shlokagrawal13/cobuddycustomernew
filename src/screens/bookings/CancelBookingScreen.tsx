import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

const REASONS = [
  'Change of plans / Schedule conflict',
  'Found another companion',
  'Booked by mistake',
  'Personal emergency',
  'Other'
];

export const CancelBookingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const bookingId = route.params?.bookingId || 'CB-REQ-8829';
  
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleBack = () => navigation.goBack();
  
  const handleConfirmCancel = () => {
    // In a real app, this would call an API, then go back to the root tab
    navigation.navigate('MainTabNavigator', { screen: 'BookingsTab' });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cancel Booking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Booking Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Cancelling Booking: {bookingId}</Text>
          <View style={styles.summaryRow}>
            <Icon name="account" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.summaryText}>Elena Vasquez</Text>
          </View>
          <View style={styles.summaryRow}>
            <Icon name="calendar-clock" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.summaryText}>Fri, 24 Oct 2026 • 7:00 PM</Text>
          </View>
        </View>

        {/* Warning Card */}
        <View style={styles.warningCard}>
          <Icon name="alert-circle-outline" size={24} color={theme.colors.error} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.warningTitle}>Cancellation Policy</Text>
            <Text style={styles.warningDesc}>Since you are cancelling more than 48 hours in advance, you will receive a <Text style={{fontWeight: 'bold', color: theme.colors.error}}>100% full refund</Text>. The escrow hold will be released immediately.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>WHY ARE YOU CANCELLING?</Text>
        
        <View style={styles.reasonsContainer}>
          {REASONS.map((reason) => (
            <TouchableOpacity 
              key={reason} 
              style={[styles.reasonRow, selectedReason === reason && styles.reasonRowActive]}
              onPress={() => setSelectedReason(reason)}
              activeOpacity={0.7}
            >
              <Text style={[styles.reasonText, selectedReason === reason && styles.reasonTextActive]}>{reason}</Text>
              <View style={[styles.radioCircle, selectedReason === reason && styles.radioCircleActive]}>
                {selectedReason === reason && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarHandle} />
        <View style={styles.actionCol}>
          <TouchableOpacity 
            style={[
              styles.primaryBtn, 
              { backgroundColor: selectedReason ? theme.colors.error : 'rgba(255,255,255,0.05)', shadowColor: theme.colors.error }
            ]} 
            disabled={!selectedReason}
            onPress={handleConfirmCancel}
          >
            <Text style={[styles.primaryBtnText, { color: selectedReason ? theme.colors.background : theme.colors.textSecondary }]}>Confirm Cancellation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleBack}>
            <Text style={styles.secondaryBtnText}>No, Keep Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  iconBtn: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, letterSpacing: 0.5 },
  
  scrollContent: { padding: 20, paddingBottom: 40, gap: 24 },
  
  summaryCard: { backgroundColor: theme.colors.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  summaryTitle: { fontSize: 13, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 8, letterSpacing: 0.5 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 },
  summaryText: { fontSize: 14, color: theme.colors.textSecondary },

  warningCard: { flexDirection: 'row', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.error, alignItems: 'center' },
  warningTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.error, marginBottom: 4 },
  warningDesc: { fontSize: 13, color: theme.colors.textPrimary, lineHeight: 20 },
  
  sectionTitle: { fontSize: 12, fontWeight: '900', color: theme.colors.textSecondary, letterSpacing: 1.5, marginTop: 8 },
  
  reasonsContainer: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  reasonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  reasonRowActive: { backgroundColor: 'rgba(212, 175, 55, 0.05)' },
  reasonText: { fontSize: 15, color: theme.colors.textPrimary },
  reasonTextActive: { color: theme.colors.primary, fontWeight: '600' },
  
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: theme.colors.textSecondary, justifyContent: 'center', alignItems: 'center' },
  radioCircleActive: { borderColor: theme.colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary },

  bottomBar: { 
    padding: 20, 
    paddingBottom: 24, 
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)'
  },
  bottomBarHandle: {
    width: 36,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: -8
  },
  actionCol: { gap: 12, width: '100%' },
  primaryBtn: { width: '100%', height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  primaryBtnText: { fontSize: 15, fontWeight: 'bold' },
  secondaryBtn: { width: '100%', height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  secondaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
});
