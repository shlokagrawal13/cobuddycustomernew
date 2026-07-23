import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

const SETTING_SECTIONS = [
  {
    title: 'ACCOUNT',
    items: [
      { id: 'acc', icon: 'account-cog-outline', title: 'Account Settings', sub: 'Phone, Email, Linked Accounts', route: 'AccountSettingsScreen' },
      { id: 'perms', icon: 'shield-account-outline', title: 'App Permissions', sub: 'Camera, Location, Microphone', route: 'AppPermissionsScreen' },
      { id: 'sessions', icon: 'devices', title: 'Active Sessions', sub: 'Manage logged-in devices', route: 'ActiveSessionsScreen' },
    ]
  },
  {
    title: 'PRIVACY & SAFETY',
    items: [
      { id: 'applock', icon: 'fingerprint', title: 'App Lock', sub: 'FaceID & Biometrics', route: 'AppLockScreen' },
      { id: 'blocked', icon: 'cancel', title: 'Blocked Users', sub: 'Manage your blocked list', route: 'BlockedUsersScreen' },
      { id: 'safety', icon: 'shield-check-outline', title: 'Safety Settings', sub: 'SOS & Trusted Contacts', route: 'SafetySettingsScreen' },
    ]
  },
  {
    title: 'DATA & NOTIFICATIONS',
    items: [
      { id: 'notif', icon: 'bell-outline', title: 'Notifications', sub: 'Push & Email preferences', route: 'NotificationPreferencesScreen' },
      { id: 'data', icon: 'database-outline', title: 'Data & Cache', sub: 'Clear cache & consent manager', route: 'DataCacheScreen' },
      { id: 'lang', icon: 'translate', title: 'App Language', sub: 'English (US)', route: 'LanguageSelectionScreen' },
    ]
  },
  {
    title: 'SUPPORT',
    items: [
      { id: 'help', icon: 'help-circle-outline', title: 'Help Center', sub: 'FAQs & Guides', route: 'HelpCenterScreen' },
      { id: 'contact', icon: 'headset', title: 'Contact Support', sub: '24/7 Concierge Chat', route: 'ConciergeChatScreen' },
      { id: 'report', icon: 'alert-circle-outline', title: 'Report a Problem', sub: 'Flag an issue or bug', route: 'CreateSupportTicketScreen' },
    ]
  },
];

const DANGER_ZONE = [
  { id: 'deactivate', icon: 'pause-circle-outline', title: 'Deactivate Account', sub: 'Temporarily hide your profile', route: 'DeactivateAccountScreen' },
  { id: 'delete', icon: 'delete-forever-outline', title: 'Delete Account', sub: 'Permanently remove all data', route: 'DeleteAccountScreen' },
];

export const SettingsHubScreen = () => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of CoBuddy?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => {
            Alert.alert('Logged Out', 'Successfully logged out.');
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Privacy Banner */}
        <View style={styles.privacyBanner}>
            <View style={styles.privacyHeader}>
                <Icon name="shield-lock-outline" size={24} color={theme.colors.success} />
                <View style={styles.privacyMeta}>
                    <Text style={styles.privacyTitle}>Your Privacy, Our Priority</Text>
                    <Text style={styles.privacySub}>CoBuddy is built on a privacy-first architecture.</Text>
                </View>
            </View>
            <View style={styles.privacyPillars}>
                <View style={styles.pillar}>
                    <Icon name="database-lock-outline" size={16} color={theme.colors.primary} />
                    <Text style={styles.pillarText}>Data Sovereignty</Text>
                </View>
                <View style={styles.pillarDivider} />
                <View style={styles.pillar}>
                    <Icon name="incognito-circle-off" size={16} color={theme.colors.primary} />
                    <Text style={styles.pillarText}>Zero-Share</Text>
                </View>
                <View style={styles.pillarDivider} />
                <View style={styles.pillar}>
                    <Icon name="key-outline" size={16} color={theme.colors.primary} />
                    <Text style={styles.pillarText}>AES-256 Auth</Text>
                </View>
            </View>
        </View>

        {SETTING_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.card}>
              {section.items.map((item, index) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.row, index !== section.items.length - 1 && styles.borderBottom]}
                  activeOpacity={0.7}
                  onPress={() => item.route ? navigation.navigate(item.route) : null}
                  disabled={!item.route}
                >
                  <View style={styles.iconWrap}>
                    <Icon name={item.icon} size={22} color={theme.colors.primary} />
                  </View>
                  <View style={styles.meta}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.sub}>{item.sub}</Text>
                  </View>
                  {item.route ? <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} /> : null}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.error}]}>DANGER ZONE</Text>
          <View style={[styles.card, {borderColor: 'rgba(239, 68, 68, 0.2)'}]}>
            {DANGER_ZONE.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.row, index !== DANGER_ZONE.length - 1 && {borderBottomWidth: 1, borderBottomColor: 'rgba(239, 68, 68, 0.1)'}]}
                activeOpacity={0.7}
                onPress={() => item.route ? navigation.navigate(item.route) : null}
              >
                <View style={[styles.iconWrap, {backgroundColor: 'rgba(239, 68, 68, 0.1)'}]}>
                  <Icon name={item.icon} size={22} color={theme.colors.error} />
                </View>
                <View style={styles.meta}>
                  <Text style={[styles.title, {color: theme.colors.error}]}>{item.title}</Text>
                  <Text style={[styles.sub, {color: theme.colors.error, opacity: 0.7}]}>{item.sub}</Text>
                </View>
                <Icon name="chevron-right" size={20} color={theme.colors.error} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8} onPress={handleLogout}>
          <Icon name="logout-variant" size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footerBrand}>
            <Text style={styles.brandText}>CoBuddy</Text>
            <Text style={styles.copyrightText}>© 2026 CoBuddy Technologies</Text>
            <Text style={styles.versionText}>v1.0.0 (Build 42)</Text>
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
  
  privacyBanner: { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)', padding: 16, marginBottom: 24 },
  privacyHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  privacyMeta: { flex: 1 },
  privacyTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.success, marginBottom: 2 },
  privacySub: { fontSize: 12, color: theme.colors.textSecondary, lineHeight: 16 },
  privacyPillars: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, overflow: 'hidden' },
  pillar: { flex: 1, paddingVertical: 10, alignItems: 'center', gap: 4 },
  pillarText: { fontSize: 10, fontWeight: 'bold', color: theme.colors.textPrimary },
  pillarDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 8 },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 12, marginLeft: 8 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  iconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center' },
  meta: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 2 },
  sub: { fontSize: 12, color: theme.colors.textSecondary },
  
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)', marginTop: 8 },
  logoutText: { fontSize: 15, fontWeight: 'bold', color: theme.colors.error },
  
  footerBrand: { alignItems: 'center', marginTop: 40, opacity: 0.5 },
  brandText: { fontSize: 14, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1 },
  copyrightText: { fontSize: 10, color: theme.colors.textSecondary, marginTop: 4 },
  versionText: { fontSize: 10, color: theme.colors.textSecondary, marginTop: 2 }
});
