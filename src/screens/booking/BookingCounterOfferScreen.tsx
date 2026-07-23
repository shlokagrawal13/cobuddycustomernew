import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

const DEFAULT_MOCK_DATA = {
  bookingId: 'CB-REQ-8830',
  companionName: 'Aisha Sharma',
  activity: 'Shopping Companion',
  venue: 'DLF Promenade, Vasant Kunj',
  date: 'Sun, 26 Oct 2026',
  
  originalTime: '5:00 PM - 8:00 PM',
  newTime: '6:00 PM - 9:00 PM',
  originalAmount: '₹4,000',
  newAmount: '₹4,500', 
  
  message: "Hi! I have another engagement that runs late. Can we shift by 1 hour? Also due to weekend peak rates, I have slightly adjusted the price. Let me know if this works!",
};

export const BookingCounterOfferScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const bookingData = { ...DEFAULT_MOCK_DATA, ...(route?.params || {}) };

  const handleAccept = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainTabNavigator' }] });
  };

  const handleDecline = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainTabNavigator' }] });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Luxury Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="close" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Counter Offer</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Icon & Title */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <View style={styles.glow} />
            <Icon name="swap-horizontal-circle" size={80} color={theme.colors.warning} />
          </View>
          <Text style={styles.title}>Action Required</Text>
          <Text style={styles.subtitle}>
            <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold' }}>{bookingData.companionName}</Text> proposed an adjustment to your {bookingData.activity} booking.
          </Text>
        </View>

        {/* Message Card */}
        <View style={styles.messageCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
            <Icon name="message-text-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.messageTitle}>Message from Companion</Text>
          </View>
          <Text style={styles.messageText}>"{bookingData.message}"</Text>
        </View>

        {/* Changes Card */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>PROPOSED CHANGES</Text>
            <Text style={styles.bookingId}>#{bookingData.bookingId}</Text>
          </View>
          
          <View style={styles.detailRowFixed}>
            <Icon name="calendar-blank" size={20} color={theme.colors.textSecondary} style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValueFixed}>{bookingData.date}</Text>
            </View>
          </View>

          <View style={styles.detailRowFixed}>
            <Icon name="map-marker-outline" size={20} color={theme.colors.textSecondary} style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Venue</Text>
              <Text style={styles.detailValueFixed}>{bookingData.venue}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Diffs */}
          {bookingData.newTime && bookingData.originalTime !== bookingData.newTime && (
            <View style={styles.changeRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={styles.diffIconBox}>
                  <Icon name="clock-outline" size={18} color={theme.colors.warning} />
                </View>
                <Text style={styles.changeLabel}>Time</Text>
              </View>
              <View style={styles.changeValuesBox}>
                <Text style={styles.oldText}>{bookingData.originalTime}</Text>
                <Icon name="arrow-down" size={14} color={theme.colors.textSecondary} style={{ marginVertical: 4 }} />
                <Text style={styles.newText}>{bookingData.newTime}</Text>
              </View>
            </View>
          )}

          {bookingData.newAmount && bookingData.originalAmount !== bookingData.newAmount && (
            <View style={styles.changeRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={styles.diffIconBox}>
                  <Icon name="cash" size={18} color={theme.colors.warning} />
                </View>
                <Text style={styles.changeLabel}>Rate</Text>
              </View>
              <View style={styles.changeValuesBox}>
                <Text style={styles.oldText}>{bookingData.originalAmount}</Text>
                <Icon name="arrow-down" size={14} color={theme.colors.textSecondary} style={{ marginVertical: 4 }} />
                <Text style={styles.newText}>{bookingData.newAmount}</Text>
              </View>
            </View>
          )}

        </View>

        {/* Escrow Note */}
        <View style={styles.escrowNote}>
          <Icon name="shield-check" size={16} color={theme.colors.success} />
          <Text style={styles.escrowNoteText}>If accepted, your Escrow hold will be updated securely.</Text>
        </View>

      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarHandle} />
        <TouchableOpacity style={styles.primaryBtn} onPress={handleAccept} activeOpacity={0.85}>
          <Icon name="check-circle" size={20} color={theme.colors.background} />
          <Text style={styles.primaryBtnText}>Accept New Offer</Text>
        </TouchableOpacity>
        
        <View style={styles.splitBtns}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleDecline} activeOpacity={0.85}>
            <Text style={styles.secondaryBtnText}>Message Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={handleDecline} activeOpacity={0.85}>
            <Text style={styles.ghostBtnText}>Decline Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  iconBtn: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  content: { padding: 20, paddingBottom: 40, alignItems: 'center' },
  
  heroSection: { alignItems: 'center', marginBottom: 24 },
  iconContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 16, position: 'relative' },
  glow: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: theme.colors.warning, opacity: 0.15 },
  title: { fontSize: 26, fontWeight: '900', color: theme.colors.textPrimary, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 },
  
  messageCard: { width: '100%', backgroundColor: 'rgba(212, 175, 55, 0.05)', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)', marginBottom: 24 },
  messageTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
  messageText: { fontSize: 15, color: theme.colors.textPrimary, fontStyle: 'italic', lineHeight: 24 },

  sectionCard: { width: '100%', backgroundColor: theme.colors.surface, borderRadius: 20, padding: 24, borderWidth: 1, borderColor: theme.colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontWeight: '900', color: theme.colors.textSecondary, letterSpacing: 1.5 },
  bookingId: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: 'bold' },
  
  detailRowFixed: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  detailIcon: { marginRight: 12, marginTop: 2 },
  detailLabel: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 2 },
  detailValueFixed: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '600' },
  
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 8, marginBottom: 24 },
  
  changeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  diffIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(245, 158, 11, 0.1)', justifyContent: 'center', alignItems: 'center' },
  changeLabel: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: 'bold' },
  
  changeValuesBox: { alignItems: 'flex-end', backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, minWidth: 160 },
  oldText: { fontSize: 13, color: theme.colors.textSecondary, textDecorationLine: 'line-through' },
  newText: { fontSize: 15, color: theme.colors.warning, fontWeight: '900' },
  
  escrowNote: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, paddingHorizontal: 20 },
  escrowNoteText: { fontSize: 12, color: theme.colors.textSecondary },

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
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)'
  },
  bottomBarHandle: {
    width: 36,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 4,
    marginTop: -8
  },
  primaryBtn: { backgroundColor: theme.colors.warning, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, shadowColor: theme.colors.warning, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  primaryBtnText: { color: theme.colors.background, fontSize: 16, fontWeight: 'bold' },
  
  splitBtns: { flexDirection: 'row', gap: 12 },
  secondaryBtn: { flex: 1, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
  secondaryBtnText: { color: theme.colors.textPrimary, fontSize: 15, fontWeight: '600' },
  ghostBtn: { flex: 1, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  ghostBtnText: { color: theme.colors.error, fontSize: 15, fontWeight: '600' },
});
