import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, TextInput, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

export const ModifyBookingScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const route = useRoute<any>();
  const bookingId = route.params?.bookingId || 'CB-REQ-8829';
  
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [amPm, setAmPm] = useState<'AM' | 'PM'>('PM');
  const [duration, setDuration] = useState(2); // Default 2 hours
  const [newVenue, setNewVenue] = useState('');
  
  const [venueModalVisible, setVenueModalVisible] = useState(false);
  const MOCK_VENUES = ['Blue Tokai Coffee, CP', 'Starbucks, Hauz Khas', 'DLF Promenade Mall', 'Keep Original Venue'];

  const handleDateChange = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }
    setNewDate(formatted);
  };

  const handleTimeChange = (text: string) => {
    // Mask to HH:MM
    let cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      // Optional: limit hours to 12 and mins to 59 here if needed, but a simple mask is usually fine for UI.
      formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
    }
    setNewTime(formatted);
  };

  const adjustDuration = (amount: number) => {
    setDuration(prev => Math.max(1, Math.min(12, prev + amount)));
  };

  const handleBack = () => smartGoBack();
  
  const handleSendRequest = () => {
    navigation.navigate('MainTabNavigator', { screen: 'BookingsTab' });
  };

  const isFormValid = newDate.length > 5 && newTime.length > 3;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modify Booking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Info Banner */}
        <View style={styles.infoCard}>
          <Icon name="information-outline" size={24} color={theme.colors.primary} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.infoTitle}>Modification Policy</Text>
            <Text style={styles.infoDesc}>Changes must be accepted by the companion. Your original booking remains active until they accept the new proposal.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>CURRENT DETAILS</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Icon name="calendar-month" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>Friday, 24 Oct 2026</Text>
          </View>
          <View style={[styles.detailRow, { marginTop: 12 }]}>
            <Icon name="clock-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>7:00 PM - 9:00 PM</Text>
          </View>
          <View style={[styles.detailRow, { marginTop: 12 }]}>
            <Icon name="map-marker-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>Blue Tokai Coffee, CP</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>PROPOSE NEW DETAILS</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Date (DD/MM/YYYY)</Text>
          <View style={styles.inputWrapper}>
            <Icon name="calendar-edit" size={20} color={theme.colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. 25/10/2026"
              placeholderTextColor={theme.colors.textSecondary}
              value={newDate}
              onChangeText={handleDateChange}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
        </View>

        <View style={styles.rowLayout}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Start Time (HH:MM)</Text>
            <View style={styles.inputWrapper}>
              <Icon name="clock-edit-outline" size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="05:00"
                placeholderTextColor={theme.colors.textSecondary}
                value={newTime}
                onChangeText={handleTimeChange}
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
          </View>
          
          <View style={[styles.inputContainer, { width: 100 }]}>
            <Text style={styles.inputLabel}>AM/PM</Text>
            <View style={styles.amPmToggle}>
              <TouchableOpacity 
                style={[styles.amPmBtn, amPm === 'AM' && styles.amPmBtnActive]} 
                onPress={() => setAmPm('AM')}
              >
                <Text style={[styles.amPmText, amPm === 'AM' && styles.amPmTextActive]}>AM</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.amPmBtn, amPm === 'PM' && styles.amPmBtnActive]} 
                onPress={() => setAmPm('PM')}
              >
                <Text style={[styles.amPmText, amPm === 'PM' && styles.amPmTextActive]}>PM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Duration (Hours)</Text>
          <View style={styles.durationWrapper}>
            <TouchableOpacity style={styles.durationBtn} onPress={() => adjustDuration(-1)}>
              <Icon name="minus" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text style={styles.durationText}>{duration} {duration === 1 ? 'Hour' : 'Hours'}</Text>
            <TouchableOpacity style={styles.durationBtn} onPress={() => adjustDuration(1)}>
              <Icon name="plus" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Venue (Optional)</Text>
          <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.7} onPress={() => setVenueModalVisible(true)}>
            <Icon name="magnify" size={20} color={theme.colors.primary} style={styles.inputIcon} />
            <Text style={[styles.input, { color: newVenue ? theme.colors.textPrimary : theme.colors.textSecondary, alignSelf: 'center', flex: 1 }]}>
              {newVenue || 'Search safe public venue...'}
            </Text>
            <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarHandle} />
        <View style={styles.actionCol}>
          <TouchableOpacity 
            style={[styles.primaryBtn, { opacity: isFormValid ? 1 : 0.5 }]} 
            disabled={!isFormValid}
            onPress={handleSendRequest}
          >
            <Text style={styles.primaryBtnText}>Send Modification Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={handleBack}>
            <Text style={styles.ghostBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet Picker Modal for Venue */}
      <Modal visible={venueModalVisible} transparent={true} animationType="slide" onRequestClose={() => setVenueModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalDismissArea} onPress={() => setVenueModalVisible(false)} activeOpacity={1} />
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select a Safe Venue</Text>
              <TouchableOpacity onPress={() => setVenueModalVisible(false)} style={styles.closeBtn}>
                <Icon name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>
            
            {/* Search Bar inside Modal */}
            <View style={styles.modalSearchContainer}>
              <Icon name="magnify" size={22} color={theme.colors.textSecondary} />
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Search cafes, malls, restaurants..."
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>
            
            <FlatList
              data={MOCK_VENUES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sheetOption} onPress={() => {
                  setNewVenue(item === 'Keep Original Venue' ? '' : item);
                  setVenueModalVisible(false);
                }}>
                  <Icon name={item === 'Keep Original Venue' ? 'restore' : 'map-marker-outline'} size={20} color={theme.colors.primary} style={{ marginRight: 12 }} />
                  <Text style={[styles.sheetOptionText, { flex: 1 }]}>{item}</Text>
                  <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  iconBtn: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, letterSpacing: 0.5 },
  
  scrollContent: { padding: 20, paddingBottom: 40, gap: 24 },
  
  infoCard: { flexDirection: 'row', backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.primary, alignItems: 'center' },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 4 },
  infoDesc: { fontSize: 13, color: theme.colors.textPrimary, lineHeight: 20 },
  
  sectionTitle: { fontSize: 12, fontWeight: '900', color: theme.colors.textSecondary, letterSpacing: 1.5, marginTop: 8 },
  
  detailsCard: { backgroundColor: theme.colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.colors.border },
  detailRow: { flexDirection: 'row', alignItems: 'center' },
  detailText: { fontSize: 15, color: theme.colors.textPrimary, marginLeft: 12, fontWeight: '500' },
  
  rowLayout: { flexDirection: 'row', gap: 12 },
  inputContainer: { gap: 8 },
  inputLabel: { fontSize: 13, color: theme.colors.textSecondary, fontWeight: '600', marginLeft: 4 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 16, height: 52 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: theme.colors.textPrimary, fontSize: 15 },

  amPmToggle: { flexDirection: 'row', backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, height: 52, overflow: 'hidden' },
  amPmBtn: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  amPmBtnActive: { backgroundColor: 'rgba(212, 175, 55, 0.1)' },
  amPmText: { color: theme.colors.textSecondary, fontSize: 14, fontWeight: 'bold' },
  amPmTextActive: { color: theme.colors.primary },

  durationWrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 16, height: 52 },
  durationBtn: { padding: 4 },
  durationText: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },

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
  primaryBtn: { width: '100%', height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  primaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
  ghostBtn: { width: '100%', height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  ghostBtnText: { color: theme.colors.error, fontSize: 15, fontWeight: '600' },

  /* Modal Styles */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalDismissArea: { flex: 1 },
  bottomSheet: { backgroundColor: theme.colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '60%', paddingBottom: 40 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  closeBtn: { padding: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12 },
  
  modalSearchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 20, marginTop: 16, marginBottom: 12, paddingHorizontal: 16, height: 50, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  modalSearchInput: { flex: 1, color: theme.colors.textPrimary, fontSize: 15, marginLeft: 12 },

  sheetOption: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  sheetOptionText: { fontSize: 16, color: theme.colors.textPrimary },
});
