import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

export const SessionReminderScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();

  const MOCK_DATA = {
    companionName: 'Elena Vasquez',
    time: 'Today, 7:00 PM',
    venue: 'Starbucks, Connaught Place',
  };

  const SAFETY_TIPS = [
    { icon: 'shield-account-outline', text: 'Meet in a public place with good lighting.' },
    { icon: 'account-cancel-outline', text: 'Do not share your personal address or last name.' },
    { icon: 'cellphone-check', text: 'Keep your phone charged and handy.' },
    { icon: 'account-group-outline', text: 'Respect boundaries and CoBuddy etiquette.' },
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => smartGoBack()} style={styles.iconBtn}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meetup Reminder</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.alertBox}>
          <Icon name="clock-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.alertText}>Your session with {MOCK_DATA.companionName} starts in <Text style={{fontWeight: 'bold', color: theme.colors.textPrimary}}>2 hours</Text>.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meetup Details</Text>
          <View style={styles.detailRow}>
            <View style={styles.iconCircleSm}>
              <Icon name="calendar-clock" size={16} color={theme.colors.primary} />
            </View>
            <Text style={styles.detailText}>{MOCK_DATA.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.iconCircleSm}>
              <Icon name="map-marker" size={16} color={theme.colors.primary} />
            </View>
            <Text style={styles.detailText}>{MOCK_DATA.venue}</Text>
          </View>
          
          <View style={styles.mapPlaceholder}>
            <Icon name="map-outline" size={40} color={theme.colors.textSecondary} />
            <Text style={{color: theme.colors.textSecondary, marginTop: 8}}>Map View Placeholder</Text>
          </View>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Icon name="directions" size={18} color={theme.colors.primary} />
            <Text style={styles.secondaryBtnText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Safety Checklist</Text>
        <View style={styles.safetyCard}>
          {SAFETY_TIPS.map((tip, index) => (
            <View key={index} style={styles.safetyRow}>
              <Icon name={tip.icon} size={20} color={theme.colors.textSecondary} />
              <Text style={styles.safetyText}>{tip.text}</Text>
            </View>
          ))}
        </View>

      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomHint}>Only confirm arrival when you are physically at the venue.</Text>
        <TouchableOpacity 
          style={styles.primaryBtn} 
          onPress={() => navigation.navigate('ArrivalCheckInScreen')}
        >
          <Text style={styles.primaryBtnText}>Simulate Arrival at Venue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  iconBtn: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  content: { padding: 20, paddingBottom: 40, gap: 24 },
  
  alertBox: { flexDirection: 'row', backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: 16, borderRadius: 16, alignItems: 'center', gap: 12, borderWidth: 1, borderColor: theme.colors.primary },
  alertText: { flex: 1, color: theme.colors.textSecondary, fontSize: 15, lineHeight: 22 },

  card: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: theme.colors.border },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  iconCircleSm: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  detailText: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '500' },
  
  mapPlaceholder: { height: 120, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginVertical: 16, borderWidth: 1, borderColor: theme.colors.border, borderStyle: 'dashed' },
  
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderRadius: 12, backgroundColor: 'rgba(212, 175, 55, 0.1)', borderWidth: 1, borderColor: theme.colors.primary },
  secondaryBtnText: { color: theme.colors.primary, fontSize: 14, fontWeight: 'bold' },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, marginLeft: 4 },
  
  safetyCard: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: theme.colors.border, gap: 16 },
  safetyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  safetyText: { flex: 1, fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20 },

  bottomBar: { padding: 20, paddingBottom: 32, backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: theme.colors.border, gap: 12 },
  bottomHint: { fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center' },
  primaryBtn: { width: '100%', backgroundColor: theme.colors.primary, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
});
