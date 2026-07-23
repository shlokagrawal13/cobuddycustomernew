import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Animated, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

export const ActiveSessionScreen = () => {
  const navigation = useNavigation<any>();
  const [etiquetteVisible, setEtiquetteVisible] = useState(true);
  
  // Timer State (e.g. 2 hours = 7200 seconds)
  const TOTAL_SECONDS = 7200;
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

  // Modals
  const [extendModalVisible, setExtendModalVisible] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState<30 | 60>(60);
  const [endEarlyModalVisible, setEndEarlyModalVisible] = useState(false);
  const [bookingDetailsModalVisible, setBookingDetailsModalVisible] = useState(false);
  
  // Pulse Animation for LIVE badge
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const MOCK_COMPANION = 'Elena Vasquez';

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
      ])
    ).start();

    // Countdown Timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format Time
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;

  const handleEndEarly = () => {
    setEndEarlyModalVisible(false);
    navigation.navigate('SessionCompleteScreen');
  };

  const handleConfirmExtension = () => {
    // Add time to the timer
    setTimeLeft(prev => prev + (selectedExtension * 60));
    setExtendModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Urgent Header */}
      <View style={styles.header}>
        <View style={styles.liveBadge}>
          <Animated.View style={[styles.liveDot, { opacity: pulseAnim }]} />
          <Text style={styles.liveText}>LIVE SESSION</Text>
        </View>
        <TouchableOpacity style={styles.sosBtn} onPress={() => navigation.navigate('SafetySupportStack', { screen: 'EmergencySOSScreen' })}>
          <Icon name="shield-half-full" size={18} color={theme.colors.background} />
          <Text style={styles.sosBtnText}>SOS / EMERGENCY</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Etiquette Reminder */}
        {etiquetteVisible && (
          <View style={styles.etiquetteCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Icon name="information" size={18} color={theme.colors.primary} />
                <Text style={styles.etiquetteTitle}>Etiquette Reminder</Text>
              </View>
              <TouchableOpacity onPress={() => setEtiquetteVisible(false)}>
                <Icon name="close" size={18} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.etiquetteDesc}>
              Please remain in public spaces at all times. Treat your companion with absolute respect. CoBuddy has a strict zero-tolerance policy for harassment.
            </Text>
          </View>
        )}

        {/* Live Timer Card */}
        <View style={styles.timerCard}>
          <Text style={styles.timerSub}>Time Remaining</Text>
          <Text style={styles.timerMain}>{formatTime(timeLeft)}</Text>
          
          <View style={styles.timerProgressBg}>
            <View style={[styles.timerProgressFill, { width: `${progressPercentage}%` }]} />
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
            <Text style={styles.timerLimitText}>Started: 7:00 PM</Text>
            <Text style={styles.timerLimitText}>Ends: 9:00 PM</Text>
          </View>
        </View>

        {/* Companion Snapshot */}
        <View style={styles.companionCard}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{MOCK_COMPANION.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 12 }}>
            <Text style={styles.companionName} numberOfLines={1}>{MOCK_COMPANION}</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: 'bold' }}>View Full Profile</Text>
              <Icon name="chevron-right" size={14} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={styles.circleBtn}>
              <Icon name="phone" size={18} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn}>
              <Icon name="chat" size={18} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* View Details Link */}
        <TouchableOpacity style={styles.detailsBtn} onPress={() => setBookingDetailsModalVisible(true)}>
          <Icon name="file-document-outline" size={18} color={theme.colors.textSecondary} />
          <Text style={styles.detailsText}>View Booking Details</Text>
          <Icon name="chevron-right" size={16} color={theme.colors.textSecondary} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* Action Controls */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => setExtendModalVisible(true)}>
            <Icon name="clock-plus-outline" size={24} color={theme.colors.background} />
            <Text style={styles.actionBtnPrimaryText}>Extend Session</Text>
            <Text style={styles.actionBtnPrimarySub}>Add more time</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionBtnSecondary} onPress={() => setEndEarlyModalVisible(true)}>
            <Icon name="clock-remove-outline" size={24} color={theme.colors.error} />
            <Text style={styles.actionBtnSecondaryText}>End Early</Text>
            <Text style={styles.actionBtnSecondarySub}>Pro-rata charges</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* EXTEND SESSION MODAL */}
      <Modal visible={extendModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Extend Session</Text>
              <TouchableOpacity onPress={() => setExtendModalVisible(false)} style={styles.modalCloseBtn}>
                <Icon name="close" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDesc}>How much longer would you like to extend this session?</Text>
            
            <View style={{ gap: 12, marginBottom: 24 }}>
              <TouchableOpacity 
                style={[styles.extensionOption, selectedExtension === 30 && { borderColor: theme.colors.primary, backgroundColor: 'rgba(212,175,55,0.1)' }]}
                onPress={() => setSelectedExtension(30)}
              >
                <Text style={[styles.extensionTime, selectedExtension === 30 && { color: theme.colors.primary }]}>+ 30 Mins</Text>
                <Text style={[styles.extensionPrice, selectedExtension === 30 && { color: theme.colors.primary }]}>₹750</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.extensionOption, selectedExtension === 60 && { borderColor: theme.colors.primary, backgroundColor: 'rgba(212,175,55,0.1)' }]}
                onPress={() => setSelectedExtension(60)}
              >
                <Text style={[styles.extensionTime, selectedExtension === 60 && { color: theme.colors.primary }]}>+ 1 Hour</Text>
                <Text style={[styles.extensionPrice, selectedExtension === 60 && { color: theme.colors.primary }]}>₹1,500</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleConfirmExtension}>
              <Text style={styles.primaryBtnText}>Confirm Extension (₹{selectedExtension === 30 ? '750' : '1,500'})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* END EARLY MODAL */}
      <Modal visible={endEarlyModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.error }]}>End Session Early?</Text>
              <TouchableOpacity onPress={() => setEndEarlyModalVisible(false)} style={styles.modalCloseBtn}>
                <Icon name="close" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.warningBox}>
              <Icon name="alert-circle-outline" size={20} color={theme.colors.warning} />
              <Text style={styles.warningBoxText}>
                Ending now will release escrow funds based on our Pro-Rata Policy.
              </Text>
            </View>

            <View style={{ gap: 8, marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.colors.textSecondary }}>Time completed</Text>
                <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold' }}>1 hr 15 mins</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.colors.textSecondary }}>Escrow to be released</Text>
                <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold' }}>₹1,875</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.colors.textSecondary }}>Refund to you</Text>
                <Text style={{ color: theme.colors.success, fontWeight: 'bold' }}>₹1,125</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.primaryBtn, { backgroundColor: theme.colors.error }]} 
              onPress={handleEndEarly}
            >
              <Text style={styles.primaryBtnText}>Confirm & End Session</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ marginTop: 16, alignItems: 'center' }} onPress={() => setEndEarlyModalVisible(false)}>
              <Text style={{ color: theme.colors.textSecondary, fontWeight: 'bold' }}>Keep Session Active</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* BOOKING DETAILS MODAL */}
      <Modal visible={bookingDetailsModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Booking Details</Text>
              <TouchableOpacity onPress={() => setBookingDetailsModalVisible(false)} style={styles.modalCloseBtn}>
                <Icon name="close" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={{ gap: 16, marginBottom: 24 }}>
              <View>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12, textTransform: 'uppercase', marginBottom: 4 }}>Activity</Text>
                <Text style={{ color: theme.colors.textPrimary, fontSize: 15, fontWeight: 'bold' }}>Fine Dining & Drinks</Text>
              </View>
              
              <View>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12, textTransform: 'uppercase', marginBottom: 4 }}>Date & Time</Text>
                <Text style={{ color: theme.colors.textPrimary, fontSize: 15, fontWeight: 'bold' }}>Today, 7:00 PM - 9:00 PM</Text>
              </View>

              <View>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12, textTransform: 'uppercase', marginBottom: 4 }}>Your Special Note</Text>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border }}>
                  <Text style={{ color: theme.colors.textPrimary, fontSize: 14, fontStyle: 'italic' }}>"I prefer sitting near the window. Please wear smart casuals."</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => setBookingDetailsModalVisible(false)}>
              <Text style={styles.primaryBtnText}>Back to Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.primaryBtn} 
          onPress={() => navigation.navigate('SessionCompleteScreen')}
        >
          <Text style={styles.primaryBtnText}>[MOCK] Time's Up / Auto End</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.success },
  liveText: { color: theme.colors.success, fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  
  sosBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.error, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, gap: 6, shadowColor: theme.colors.error, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  sosBtnText: { color: theme.colors.background, fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
  
  content: { padding: 20, gap: 24, paddingBottom: 40 },
  
  etiquetteCard: { backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.primary },
  etiquetteTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
  etiquetteDesc: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 20 },

  timerCard: { alignItems: 'center', padding: 32, backgroundColor: theme.colors.surface, borderRadius: 24, borderWidth: 1, borderColor: theme.colors.border },
  timerSub: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  timerMain: { fontSize: 48, fontWeight: '900', color: theme.colors.textPrimary, fontVariant: ['tabular-nums'], letterSpacing: 2, marginBottom: 24 },
  timerProgressBg: { width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' },
  timerProgressFill: { height: '100%', backgroundColor: theme.colors.primary, borderRadius: 4 },
  timerLimitText: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '500' },

  companionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.primary },
  avatarInitials: { color: theme.colors.primary, fontSize: 18, fontWeight: 'bold' },
  companionName: { fontSize: 15, fontWeight: 'bold', color: theme.colors.textPrimary },
  circleBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border },

  detailsBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, gap: 12 },
  detailsText: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '500' },

  actionGrid: { flexDirection: 'row', gap: 16 },
  actionBtnPrimary: { flex: 1, backgroundColor: theme.colors.primary, padding: 20, borderRadius: 20, alignItems: 'center', gap: 8 },
  actionBtnPrimaryText: { fontSize: 15, fontWeight: 'bold', color: theme.colors.background },
  actionBtnPrimarySub: { fontSize: 11, color: theme.colors.background, opacity: 0.8 },
  
  actionBtnSecondary: { flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.05)', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)', padding: 20, borderRadius: 20, alignItems: 'center', gap: 8 },
  actionBtnSecondaryText: { fontSize: 15, fontWeight: 'bold', color: theme.colors.error },
  actionBtnSecondarySub: { fontSize: 11, color: theme.colors.error, opacity: 0.8 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: theme.colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.textPrimary },
  modalCloseBtn: { padding: 4 },
  modalDesc: { color: theme.colors.textSecondary, fontSize: 14, marginBottom: 24, lineHeight: 22 },
  
  extensionOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.background },
  extensionTime: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },
  extensionPrice: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },

  warningBox: { flexDirection: 'row', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 16, borderRadius: 12, gap: 12, marginBottom: 24 },
  warningBoxText: { flex: 1, color: theme.colors.warning, fontSize: 13, lineHeight: 20 },

  bottomBar: { padding: 20, paddingBottom: 32, backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: theme.colors.border },
  primaryBtn: { width: '100%', backgroundColor: theme.colors.primary, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
});
