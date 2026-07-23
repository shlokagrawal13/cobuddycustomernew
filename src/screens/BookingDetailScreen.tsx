import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const MOCK_DETAILS = {
  id: 'CB-REQ-8829',
  status: 'Accepted', // 'Awaiting Reply', 'Accepted', 'Counter-Proposed', 'Completed'
  createdAt: 'Oct 23, 10:15 AM',
  companionName: 'Elena Vasquez',
  companionId: 'EV123',
  companionRating: '4.9',
  companionReviews: '128',
  activity: 'Fine Dining & Drinks',
  date: 'Friday, 24 Oct 2026',
  time: '7:00 PM - 9:00 PM',
  duration: '2 Hours',
  venue: 'Blue Tokai Coffee',
  address: 'Connaught Place, Inner Circle, New Delhi, 110001',
  sessionRate: '₹3,000',
  platformFee: '₹150',
  taxes: '₹54',
  total: '₹3,204',
  notes: 'I prefer sitting near the window. Please wear smart casuals.',
  declineReason: 'I am so sorry, but I just got booked for a full-day event on this date.',
};

export const BookingDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const bookingId = route.params?.bookingId || MOCK_DETAILS.id;
  const bookingStatus = route.params?.status || MOCK_DETAILS.status;
  const data = { ...MOCK_DETAILS, id: bookingId, status: bookingStatus };

  const handleBack = () => navigation.goBack();

  const handleMessage = () => {
    navigation.navigate('ChatTab', { 
      screen: 'CompanionChatScreen', 
      params: { companionName: data.companionName, bookingId: data.id } 
    });
  };

  const renderStepper = () => {
    if (data.status === 'Declined') {
      return (
        <View style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.error, marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
            <Icon name="alert-circle-outline" size={20} color={theme.colors.error} />
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: theme.colors.error }}>Booking Declined</Text>
          </View>
          <Text style={{ fontSize: 13, color: theme.colors.textPrimary, lineHeight: 20 }}>
            <Text style={{ fontStyle: 'italic' }}>"{data.declineReason}"</Text>
          </Text>
        </View>
      );
    }

    const steps = [
      { label: 'Requested', time: data.createdAt },
      { label: 'Accepted', time: data.status === 'Accepted' || data.status === 'Completed' ? 'Oct 23, 11:30 AM' : '--' },
      { label: 'Meetup', time: data.status === 'Completed' ? 'Oct 24, 7:00 PM' : '--' }
    ];
    let activeIndex = 0;
    if (data.status === 'Accepted') activeIndex = 1;
    if (data.status === 'Completed' || data.status === 'History') activeIndex = 2;

    return (
      <View style={styles.stepperContainer}>
        {steps.map((step, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;
          const isLast = index === steps.length - 1;
          
          return (
            <View key={step.label} style={styles.stepWrapper}>
              <View style={styles.stepIndicator}>
                {/* Left Line */}
                <View style={[styles.stepLine, { backgroundColor: index === 0 ? 'transparent' : (isActive ? theme.colors.primary : theme.colors.border) }]} />
                
                {/* Center Dot */}
                <View style={[styles.stepDot, isActive && styles.stepDotActive, isCurrent && styles.stepDotCurrent]}>
                  {isActive && <Icon name="check" size={12} color={theme.colors.background} />}
                </View>
                
                {/* Right Line */}
                <View style={[styles.stepLine, { backgroundColor: index === steps.length - 1 ? 'transparent' : (index < activeIndex ? theme.colors.primary : theme.colors.border) }]} />
              </View>
              <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{step.label}</Text>
              <Text style={styles.stepTime}>{step.time}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderActionButtons = () => {
    if (data.status === 'Awaiting Reply' || data.status === 'Pending') {
      return (
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.secondaryBtn, { flex: 1 }]} onPress={() => navigation.navigate('CancelBookingScreen', { bookingId: data.id })}>
            <Text style={styles.secondaryBtnText}>Cancel Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={() => navigation.navigate('ModifyBookingScreen', { bookingId: data.id })}>
            <Text style={styles.primaryBtnText}>Modify</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    if (data.status === 'Accepted') {
      return (
        <View style={styles.actionCol}>
          {/* Active OTP Button for Meetup Day */}
          <View>
            <TouchableOpacity 
              style={styles.primaryBtn} 
              onPress={() => navigation.navigate('LiveSessionStack')}
            >
              <Icon name="key" size={18} color={theme.colors.background} />
              <Text style={styles.primaryBtnText}>View Upcoming Meetup</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 11, color: theme.colors.textSecondary, textAlign: 'center', marginTop: 8 }}>
              Unlocked! Share this with your companion upon meeting.
            </Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.secondaryBtn, { flex: 1, backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: theme.colors.primary }]} onPress={handleMessage}>
              <Icon name="chat" size={18} color={theme.colors.primary} />
              <Text style={[styles.secondaryBtnText, { color: theme.colors.primary, marginLeft: 4 }]}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryBtn, { flex: 1 }]} onPress={() => navigation.navigate('CancelBookingScreen', { bookingId: data.id })}>
              <Text style={[styles.secondaryBtnText, { color: theme.colors.error }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (data.status === 'Declined') {
      return (
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('DiscoverTab')}>
          <Icon name="account-search" size={20} color={theme.colors.background} />
          <Text style={styles.primaryBtnText}>Find Another Companion</Text>
        </TouchableOpacity>
      );
    }

    if (data.status === 'Completed' || data.status === 'History') {
      return (
        <View style={styles.actionCol}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => {}}>
            <Text style={styles.primaryBtnText}>Leave a Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate('DisputeRefundScreen', { bookingId: data.id })}>
            <Text style={[styles.ghostBtnText, { color: theme.colors.warning }]}>Raise a Dispute</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return null;
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Luxury Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking ID: {data.id}</Text>
        <TouchableOpacity style={styles.helpBtn} onPress={() => navigation.navigate('SafetySupportStack', { screen: 'SafetyHubScreen' })}>
          <Icon name="shield-half-full" size={16} color={theme.colors.background} />
          <Text style={styles.helpBtnText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Status Timeline */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>STATUS TIMELINE</Text>
          {renderStepper()}
        </View>

        {/* Companion Snapshot */}
        <TouchableOpacity 
          style={styles.companionCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('DiscoverTab', { screen: 'CompanionProfileScreen', params: { id: data.companionId } })}
        >
          <View style={styles.profileRow}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>{data.companionName.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1, paddingLeft: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Text style={styles.companionName}>{data.companionName}</Text>
                <Icon name="check-decagram" size={16} color={theme.colors.primary} />
              </View>
              <View style={styles.ratingRow}>
                <Icon name="star" size={14} color={theme.colors.primary} />
                <Text style={styles.ratingText}>{data.companionRating}</Text>
                <Text style={styles.reviewCount}>({data.companionReviews} reviews)</Text>
              </View>
            </View>
            <View style={styles.viewProfileBadge}>
              <Text style={styles.viewProfileText}>Profile</Text>
              <Icon name="chevron-right" size={16} color={theme.colors.primary} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Experience Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>EXPERIENCE DETAILS</Text>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIconBox}>
              <Icon name="party-popper" size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>Activity Type</Text>
              <Text style={styles.detailValue}>{data.activity}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIconBox}>
              <Icon name="calendar-clock" size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>Date & Time ({data.duration})</Text>
              <Text style={styles.detailValue}>{data.date}</Text>
              <Text style={styles.detailSubValue}>{data.time}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIconBox}>
              <Icon name="map-marker-radius" size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>Meeting Venue</Text>
              <Text style={styles.detailValue}>{data.venue}</Text>
              <Text style={styles.detailSubValue}>{data.address}</Text>
            </View>
          </View>

          {data.notes && (
            <View style={[styles.detailItem, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}>
              <View style={styles.detailIconBox}>
                <Icon name="text-box-outline" size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.detailTextContent}>
                <Text style={styles.detailLabel}>Special Requests / Notes</Text>
                <Text style={styles.detailValue}>{data.notes}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Payment Summary */}
        <View style={styles.sectionCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>PAYMENT SUMMARY</Text>
            {data.status === 'Declined' ? (
               <Text style={[styles.escrowBadge, { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: theme.colors.error }]}>Refunded</Text>
            ) : (
               <Text style={styles.escrowBadge}>Protected by Escrow</Text>
            )}
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Session Rate ({data.duration})</Text>
            <Text style={styles.paymentValue}>{data.sessionRate}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Platform Fee</Text>
            <Text style={styles.paymentValue}>{data.platformFee}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Taxes & Surcharges</Text>
            <Text style={styles.paymentValue}>{data.taxes}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.paymentTotalBox}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.paymentTotalLabel}>{data.status === 'Declined' ? 'Total Released' : 'Total Secured'}</Text>
              <Text style={styles.paymentSubtext}>
                {data.status === 'Declined' ? 'The escrow hold has been fully released.' : 'Held safely until session ends.'}
              </Text>
            </View>
            <Text style={styles.paymentTotalValue}>{data.total}</Text>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.safetyCard}>
          <Icon name="shield-check" size={24} color={theme.colors.background} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.safetyTitle}>Meetup Safety Guidelines</Text>
            <Text style={styles.safetyDesc}>Always meet in public spaces. Never share your exact home address. Use the SOS button in case of emergency.</Text>
          </View>
        </View>

        {/* Action Buttons for Inactive States */}
        {(data.status === 'Declined' || data.status === 'Completed' || data.status === 'History') && (
          <View style={styles.actionContainer}>
            {renderActionButtons()}
          </View>
        )}

      </ScrollView>

      {/* Fixed Sticky Footer for Active States */}
      {(data.status === 'Pending' || data.status === 'Awaiting Reply' || data.status === 'Accepted') && (
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarHandle} />
          {renderActionButtons()}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  iconBtn: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, letterSpacing: 0.5 },
  helpBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.error, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, gap: 4 },
  helpBtnText: { color: theme.colors.background, fontSize: 12, fontWeight: 'bold' },
  
  scrollContent: { padding: 20, paddingBottom: 40, gap: 20 },
  
  sectionCard: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 24, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  sectionTitle: { fontSize: 12, fontWeight: '900', color: theme.colors.textSecondary, letterSpacing: 1.5, marginBottom: 20, textTransform: 'uppercase' },
  
  stepperContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 10 },
  stepWrapper: { flex: 1, alignItems: 'center' },
  stepIndicator: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 12 },
  stepDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: theme.colors.surface, borderWidth: 2, borderColor: theme.colors.border, zIndex: 1, justifyContent: 'center', alignItems: 'center' },
  stepDotActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  stepDotCurrent: { shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 8, elevation: 6 },
  stepLine: { flex: 1, height: 2 },
  stepLabel: { fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', fontWeight: '600' },
  stepLabelActive: { color: theme.colors.textPrimary, fontWeight: 'bold' },
  stepTime: { fontSize: 10, color: theme.colors.textSecondary, textAlign: 'center', marginTop: 4 },

  companionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border },
  profileRow: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  avatarPlaceholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: theme.colors.primary },
  avatarInitials: { color: theme.colors.primary, fontSize: 24, fontWeight: 'bold' },
  companionName: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary, flexShrink: 1 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 14, color: theme.colors.textPrimary, fontWeight: 'bold' },
  reviewCount: { fontSize: 12, color: theme.colors.textSecondary },
  viewProfileBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(212, 175, 55, 0.1)', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20 },
  viewProfileText: { fontSize: 12, color: theme.colors.primary, fontWeight: 'bold', marginRight: 2 },
  
  detailItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  detailIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  detailTextContent: { flex: 1, paddingRight: 8 },
  detailLabel: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  detailValue: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '600', flexShrink: 1 },
  detailSubValue: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 4, lineHeight: 20, flexShrink: 1 },
  
  escrowBadge: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, overflow: 'hidden', color: theme.colors.success, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  paymentLabel: { fontSize: 15, color: theme.colors.textSecondary },
  paymentValue: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '600' },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 8, marginBottom: 20 },
  paymentTotalBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  paymentTotalLabel: { fontSize: 16, color: theme.colors.textPrimary, fontWeight: 'bold', marginBottom: 4 },
  paymentSubtext: { fontSize: 11, color: theme.colors.textSecondary },
  paymentTotalValue: { fontSize: 22, color: theme.colors.primary, fontWeight: '900' },

  safetyCard: { flexDirection: 'row', backgroundColor: theme.colors.primary, padding: 20, borderRadius: 16, alignItems: 'center' },
  safetyTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.background, marginBottom: 4 },
  safetyDesc: { fontSize: 12, color: theme.colors.background, opacity: 0.9, lineHeight: 18 },

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
  actionContainer: { paddingVertical: 24, gap: 12 },
  actionRow: { flexDirection: 'row', gap: 12 },
  actionCol: { gap: 12, width: '100%' },
  primaryBtn: { width: '100%', backgroundColor: theme.colors.primary, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  primaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
  secondaryBtn: { width: '100%', height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
  secondaryBtnText: { color: theme.colors.textPrimary, fontSize: 15, fontWeight: '600' },
  ghostBtn: { width: '100%', height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  ghostBtnText: { color: theme.colors.error, fontSize: 15, fontWeight: '600' },
});
