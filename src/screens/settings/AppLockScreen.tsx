import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Animated, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

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

const TIMEOUT_OPTIONS = [
    { id: 'immediate', label: 'Immediately' },
    { id: '1min', label: 'After 1 minute' },
    { id: '5min', label: 'After 5 minutes' },
    { id: '15min', label: 'After 15 minutes' },
];

export const AppLockScreen = () => {
  const navigation = useNavigation<any>();
  
  const [appLockEnabled, setAppLockEnabled] = useState(true);
  const [hideScreenEnabled, setHideScreenEnabled] = useState(true);
  const [timeoutSelected, setTimeoutSelected] = useState('immediate');

  const biometricIcon = Platform.OS === 'ios' ? 'face-recognition' : 'fingerprint';
  const biometricName = Platform.OS === 'ios' ? 'Face ID' : 'Biometric Lock';

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Lock</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
            <View style={styles.iconWrap}>
                <Icon name={biometricIcon} size={40} color={theme.colors.primary} />
            </View>
            <Text style={styles.heroTitle}>Enhanced Security</Text>
            <Text style={styles.heroSub}>
                Protect your chats and bookings. When enabled, you'll need to use your device's biometric lock to open CoBuddy.
            </Text>
        </View>

        <Text style={styles.sectionTitle}>APP ACCESS</Text>
        
        <View style={styles.card}>
            <View style={styles.settingRow}>
                <View style={styles.settingTextContent}>
                    <Text style={styles.settingTitle}>Require {biometricName}</Text>
                    <Text style={styles.settingDesc}>Use your device credentials to unlock the app.</Text>
                </View>
                <CustomSwitch value={appLockEnabled} onValueChange={setAppLockEnabled} />
            </View>
        </View>

        {appLockEnabled && (
            <>
                <Text style={styles.sectionTitle}>AUTO-LOCK TIME</Text>
                <View style={styles.card}>
                    {TIMEOUT_OPTIONS.map((option, index) => {
                        const isSelected = timeoutSelected === option.id;
                        return (
                            <TouchableOpacity 
                                key={option.id} 
                                style={[styles.timeoutRow, index > 0 && styles.timeoutRowBorder]}
                                onPress={() => setTimeoutSelected(option.id)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.timeoutLabel}>{option.label}</Text>
                                <View style={styles.radioContainer}>
                                    {isSelected && <View style={styles.radioInner} />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </>
        )}

        <Text style={styles.sectionTitle}>PRIVACY</Text>
        
        <View style={styles.card}>
            <View style={styles.settingRow}>
                <View style={styles.settingTextContent}>
                    <Text style={styles.settingTitle}>Hide Screen in App Switcher</Text>
                    <Text style={styles.settingDesc}>Blur the app content when viewing recent apps to prevent shoulder surfing.</Text>
                </View>
                <CustomSwitch value={hideScreenEnabled} onValueChange={setHideScreenEnabled} />
            </View>
        </View>

        <View style={styles.footerNote}>
            <Icon name="shield-check-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.footerText}>
                CoBuddy never stores your biometric data. It is securely handled by your device's OS.
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
  settingTextContent: { flex: 1, marginRight: 16 },
  settingTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  settingDesc: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },

  timeoutRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  timeoutRowBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border },
  timeoutLabel: { fontSize: 15, color: theme.colors.textPrimary },
  radioContainer: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.primary },

  switchContainer: { width: 46, height: 26, borderRadius: 13, padding: 2, justifyContent: 'center' },
  switchThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },

  footerNote: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 8, marginTop: 40, paddingHorizontal: 20, opacity: 0.7 },
  footerText: { flex: 1, fontSize: 12, color: theme.colors.textSecondary, lineHeight: 18, textAlign: 'center' }
});
