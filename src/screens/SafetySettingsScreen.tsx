import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const CustomSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => {
    const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? 20 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [value]);

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => onValueChange(!value)}
            style={[
                styles.switchContainer, 
                { backgroundColor: value ? theme.colors.primary : 'rgba(255,255,255,0.1)' }
            ]}
        >
            <Animated.View style={[
                styles.switchThumb,
                { transform: [{ translateX }] }
            ]} />
        </TouchableOpacity>
    );
};

export const SafetySettingsScreen = () => {
  const navigation = useNavigation<any>();
  
  const [incognito, setIncognito] = useState(false);
  const [safeChat, setSafeChat] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [contactShare, setContactShare] = useState(true);
  const [liveMonitor, setLiveMonitor] = useState(true);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Center</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
            <View style={styles.iconWrap}>
                <Icon name="shield-star" size={40} color={theme.colors.primary} />
            </View>
            <Text style={styles.heroTitle}>Your Safety First</Text>
            <Text style={styles.heroSub}>
                Customize your privacy and safety preferences to ensure a secure and comfortable experience on CoBuddy.
            </Text>
        </View>

        <Text style={styles.sectionTitle}>PROFILE VISIBILITY</Text>
        
        <View style={styles.card}>
            <View style={styles.settingRow}>
                <View style={styles.iconBox}>
                    <Icon name="incognito" size={20} color={incognito ? theme.colors.primary : theme.colors.textSecondary} />
                </View>
                <View style={styles.settingTextContent}>
                    <Text style={styles.settingTitle}>Incognito Mode</Text>
                    <Text style={styles.settingDesc}>Hide your profile from Discover. Only people you message can see you.</Text>
                </View>
                <CustomSwitch value={incognito} onValueChange={setIncognito} />
            </View>
        </View>

        <Text style={styles.sectionTitle}>INTERACTIONS & CHAT</Text>
        
        <View style={styles.card}>
            <View style={styles.settingRow}>
                <View style={styles.iconBox}>
                    <Icon name="message-alert-outline" size={20} color={safeChat ? theme.colors.primary : theme.colors.textSecondary} />
                </View>
                <View style={styles.settingTextContent}>
                    <Text style={styles.settingTitle}>Safe Chat Filter</Text>
                    <Text style={styles.settingDesc}>Automatically blur explicit images and flag offensive words in messages.</Text>
                </View>
                <CustomSwitch value={safeChat} onValueChange={setSafeChat} />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingRow}>
                <View style={styles.iconBox}>
                    <Icon name="check-decagram-outline" size={20} color={verifiedOnly ? theme.colors.primary : theme.colors.textSecondary} />
                </View>
                <View style={styles.settingTextContent}>
                    <Text style={styles.settingTitle}>Verified Users Only</Text>
                    <Text style={styles.settingDesc}>Only allow users with KYC verified profiles to send you booking requests.</Text>
                </View>
                <CustomSwitch value={verifiedOnly} onValueChange={setVerifiedOnly} />
            </View>
        </View>

        <Text style={styles.sectionTitle}>EMERGENCY FEATURES</Text>

        <View style={styles.card}>
            <TouchableOpacity 
                style={styles.actionRow} 
                activeOpacity={0.7} 
                onPress={() => navigation.navigate('TrustedContactsScreen', { fromSettings: true })}
            >
                <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                    <Icon name="car-emergency" size={20} color={theme.colors.error} />
                </View>
                <View style={styles.settingTextContent}>
                    <Text style={styles.settingTitle}>Emergency Contacts (SOS)</Text>
                    <Text style={styles.settingDesc}>Add up to 3 trusted contacts. We'll share your live location with them if you trigger an SOS.</Text>
                </View>
                <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>LIVE SAFETY MONITORING</Text>

        <View style={styles.card}>
            <View style={styles.settingRow}>
                <View style={styles.iconBox}>
                    <Icon name="share-variant-outline" size={20} color={contactShare ? theme.colors.primary : theme.colors.textSecondary} />
                </View>
                <View style={styles.settingTextContent}>
                    <Text style={styles.settingTitle}>Trusted Contact Sharing</Text>
                    <Text style={styles.settingDesc}>Automatically share your active session details and live location with your trusted contacts.</Text>
                </View>
                <CustomSwitch value={contactShare} onValueChange={setContactShare} />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingRow}>
                <View style={styles.iconBox}>
                    <Icon name="radar" size={20} color={liveMonitor ? theme.colors.primary : theme.colors.textSecondary} />
                </View>
                <View style={styles.settingTextContent}>
                    <Text style={styles.settingTitle}>Live Safety Monitoring</Text>
                    <Text style={styles.settingDesc}>Enable active tracking and anomaly detection during your meetup sessions.</Text>
                </View>
                <CustomSwitch value={liveMonitor} onValueChange={setLiveMonitor} />
            </View>
        </View>

        <TouchableOpacity 
            style={styles.hubBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SafetyHubScreen')}
        >
            <Icon name="security" size={18} color={theme.colors.background} />
            <Text style={styles.hubBtnText}>Open Safety Hub</Text>
            <Icon name="arrow-right" size={20} color={theme.colors.background} />
        </TouchableOpacity>

        <View style={styles.footerNote}>
            <Icon name="lock-check-outline" size={16} color={theme.colors.success} />
            <Text style={styles.footerText}>
                CoBuddy actively monitors reports to maintain a safe community.
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  heroSection: { alignItems: 'center', marginBottom: 32, marginTop: 10 },
  iconWrap: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(212,175,55,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)' },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 8 },
  heroSub: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 },

  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 12, marginTop: 24, marginLeft: 8 },
  
  card: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, padding: 16 },
  
  settingRow: { flexDirection: 'row', alignItems: 'center' },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  settingTextContent: { flex: 1, marginRight: 12 },
  settingTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  settingDesc: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },

  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 16 },

  switchContainer: { width: 46, height: 26, borderRadius: 13, padding: 2, justifyContent: 'center' },
  switchThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },

  hubBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: theme.colors.primary, borderRadius: 20, paddingVertical: 14, paddingHorizontal: 16, marginTop: 12 },
  hubBtnText: { fontSize: 15, fontWeight: 'bold', color: theme.colors.background },

  footerNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 40, paddingHorizontal: 20, opacity: 0.8 },
  footerText: { fontSize: 12, color: theme.colors.success, lineHeight: 18, textAlign: 'center' }
});
