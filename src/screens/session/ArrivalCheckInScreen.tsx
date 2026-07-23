import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const ArrivalCheckInScreen = () => {
  const navigation = useNavigation<any>();
  const [hasArrived, setHasArrived] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const MOCK_OTP = '4921';
  const COMPANION_NAME = 'Elena Vasquez';

  const handleSimulateArrival = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setHasArrived(true);
    }, 1500); // simulate GPS check
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meetup Day</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.venueInfo}>
          <Icon name="map-marker" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.venueText}>Meeting at <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Starbucks, Connaught Place</Text></Text>
        </View>

        {!hasArrived ? (
          /* STATE 1: Pre-Arrival */
          <View style={styles.preArrivalCard}>
            <View style={styles.mapPlaceholder}>
              <Icon name="map-marker-radius" size={48} color={theme.colors.primary} />
              <Text style={{color: theme.colors.textSecondary, marginTop: 12}}>GPS Tracking Active</Text>
            </View>
            <Text style={styles.otpTitle}>Are you at the venue?</Text>
            <Text style={styles.otpDesc}>Please confirm you have physically arrived at the meeting location to unlock your Escrow OTP.</Text>
            
            <TouchableOpacity 
              style={[styles.primaryBtn, { width: '100%' }, isLocating && { opacity: 0.7 }]} 
              onPress={handleSimulateArrival}
              disabled={isLocating}
            >
              {isLocating ? (
                <ActivityIndicator color={theme.colors.background} />
              ) : (
                <Text style={styles.primaryBtnText}>I'm at the Venue (Check-In)</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          /* STATE 2: OTP Revealed */
          <View style={styles.otpCard}>
            <View style={styles.iconCircle}>
              <Icon name="shield-check" size={32} color={theme.colors.primary} />
            </View>
            <Text style={styles.otpTitle}>Escrow Unlock OTP</Text>
            <Text style={styles.otpDesc}>Share this 4-digit code with <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold' }}>{COMPANION_NAME}</Text> to start the session.</Text>
            
            <View style={styles.codeBox}>
              {MOCK_OTP.split('').map((digit, index) => (
                <View key={index} style={styles.digitBox}>
                  <Text style={styles.digitText}>{digit}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.warningText}>
              Never share this OTP over phone or chat. Only share it in person when you meet. 
              {"\n\n"}Sharing this code will instantly release Escrow funds and start the session timer.
            </Text>
          </View>
        )}

        {/* Quick Communication */}
        <View style={styles.commCard}>
          <Text style={styles.commTitle}>Can't find your companion?</Text>
          <View style={styles.commRow}>
            <TouchableOpacity style={styles.commBtn} onPress={() => {}}>
              <Icon name="phone" size={20} color={theme.colors.primary} />
              <Text style={styles.commBtnText}>Call Securely</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commBtn} onPress={() => {}}>
              <Icon name="chat" size={20} color={theme.colors.primary} />
              <Text style={styles.commBtnText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safety Issue Link */}
        <TouchableOpacity 
          style={styles.reportBtn} 
          onPress={() => navigation.navigate('SafetySupportStack', { screen: 'ReportUserScreen' })}
        >
          <Icon name="alert-circle-outline" size={16} color={theme.colors.error} />
          <Text style={styles.reportText}>Companion didn't show up or looks different? Report Issue</Text>
        </TouchableOpacity>

      </ScrollView>

      {hasArrived && (
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.primaryBtn} 
            onPress={() => navigation.navigate('ActiveSessionScreen')}
          >
            <Text style={styles.primaryBtnText}>[MOCK] Companion entered OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  iconBtn: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  content: { padding: 20, paddingBottom: 40, flexGrow: 1, justifyContent: 'center' },
  
  venueInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 12 },
  venueText: { color: theme.colors.textSecondary, fontSize: 14 },

  preArrivalCard: { backgroundColor: theme.colors.surface, borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, marginBottom: 24 },
  mapPlaceholder: { width: '100%', height: 160, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: theme.colors.border, borderStyle: 'dashed' },

  otpCard: { backgroundColor: theme.colors.surface, borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)', shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10, marginBottom: 24 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  otpTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 8 },
  otpDesc: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  
  codeBox: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  digitBox: { width: 56, height: 64, backgroundColor: theme.colors.background, borderRadius: 12, borderWidth: 2, borderColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  digitText: { fontSize: 32, fontWeight: '900', color: theme.colors.primary },
  
  warningText: { fontSize: 12, color: theme.colors.error, textAlign: 'center', lineHeight: 18, opacity: 0.9 },

  commCard: { backgroundColor: theme.colors.surface, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 24 },
  commTitle: { fontSize: 14, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 16, textAlign: 'center' },
  commRow: { flexDirection: 'row', gap: 12 },
  commBtn: { flex: 1, flexDirection: 'row', height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: theme.colors.border },
  commBtnText: { fontSize: 14, fontWeight: '600', color: theme.colors.primary },

  reportBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, paddingVertical: 12 },
  reportText: { fontSize: 13, color: theme.colors.error, fontWeight: '500', textDecorationLine: 'underline' },

  bottomBar: { padding: 20, paddingBottom: 32, backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: theme.colors.border },
  primaryBtn: { width: '100%', backgroundColor: theme.colors.primary, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
});
