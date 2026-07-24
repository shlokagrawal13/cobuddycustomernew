import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

const CustomSwitch = ({ value, onValueChange, disabled = false }: { value: boolean, onValueChange?: (val: boolean) => void, disabled?: boolean }) => {
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
            activeOpacity={disabled ? 1 : 0.8}
            onPress={() => !disabled && onValueChange && onValueChange(!value)}
            style={[
                styles.switchContainer, 
                { backgroundColor: value ? (disabled ? 'rgba(212,175,55,0.5)' : theme.colors.primary) : 'rgba(255,255,255,0.1)' }
            ]}
        >
            <Animated.View style={[
                styles.switchThumb,
                { transform: [{ translateX }] }
            ]} />
        </TouchableOpacity>
    );
};

export const NotificationPreferencesScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  
  const [prefs, setPrefs] = useState({
      bookingPush: true,
      bookingReminders: true,
      bookingEmail: true,
      chatPush: true,
      reviewPush: true,
      walletPush: true,
      promoPush: false
  });

  const togglePref = (key: keyof typeof prefs) => {
      setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
            <View style={styles.iconWrap}>
                <Icon name="bell-ring-outline" size={40} color={theme.colors.primary} />
            </View>
            <Text style={styles.heroTitle}>Stay Updated</Text>
            <Text style={styles.heroSub}>
                Control which notifications you receive and how you receive them.
            </Text>
        </View>

        <Text style={styles.sectionTitle}>BOOKING UPDATES</Text>
        <View style={styles.card}>
            <View style={[styles.row, styles.borderBottom]}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Status Updates</Text>
                    <Text style={styles.sub}>Requests accepted, companion arrivals</Text>
                </View>
                <CustomSwitch value={prefs.bookingPush} onValueChange={() => togglePref('bookingPush')} />
            </View>
            <View style={[styles.row, styles.borderBottom]}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Session Reminders</Text>
                    <Text style={styles.sub}>"Your session starts in 1 hour"</Text>
                </View>
                <CustomSwitch value={prefs.bookingReminders} onValueChange={() => togglePref('bookingReminders')} />
            </View>
            <View style={styles.row}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Email Receipts</Text>
                    <Text style={styles.sub}>Invoices and booking summaries</Text>
                </View>
                <CustomSwitch value={prefs.bookingEmail} onValueChange={() => togglePref('bookingEmail')} />
            </View>
        </View>

        <Text style={styles.sectionTitle}>COMMUNICATION & WALLET</Text>
        <View style={styles.card}>
            <View style={[styles.row, styles.borderBottom]}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Chat Messages</Text>
                    <Text style={styles.sub}>Direct messages from companions</Text>
                </View>
                <CustomSwitch value={prefs.chatPush} onValueChange={() => togglePref('chatPush')} />
            </View>
            <View style={[styles.row, styles.borderBottom]}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Wallet Alerts</Text>
                    <Text style={styles.sub}>Money added, refunds processed</Text>
                </View>
                <CustomSwitch value={prefs.walletPush} onValueChange={() => togglePref('walletPush')} />
            </View>
            <View style={styles.row}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Review Requests</Text>
                    <Text style={styles.sub}>"How was your session with Sarah?"</Text>
                </View>
                <CustomSwitch value={prefs.reviewPush} onValueChange={() => togglePref('reviewPush')} />
            </View>
        </View>

        <Text style={styles.sectionTitle}>MARKETING</Text>
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Promotions & Offers</Text>
                    <Text style={styles.sub}>Discounts, new features, and news</Text>
                </View>
                <CustomSwitch value={prefs.promoPush} onValueChange={() => togglePref('promoPush')} />
            </View>
        </View>

        <Text style={styles.sectionTitle}>SAFETY & SECURITY</Text>
        <View style={styles.card}>
            <View style={[styles.row, {opacity: 0.8}]}>
                <View style={styles.meta}>
                    <Text style={styles.title}>SOS & Security Alerts</Text>
                    <Text style={styles.sub}>Critical account and safety notices</Text>
                </View>
                <CustomSwitch value={true} disabled={true} />
            </View>
        </View>
        <View style={styles.footerNote}>
            <Icon name="information-outline" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.helperText}>Security alerts cannot be disabled for your safety.</Text>
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

  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 12, marginTop: 16, marginLeft: 8 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  borderBottom: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.border },
  meta: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  sub: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },
  
  switchContainer: { width: 46, height: 26, borderRadius: 13, padding: 2, justifyContent: 'center' },
  switchThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },

  footerNote: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginLeft: 8, opacity: 0.8 },
  helperText: { fontSize: 12, color: theme.colors.textSecondary, marginLeft: 6 }
});
