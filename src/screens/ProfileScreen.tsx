import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  StatusBar, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

// Ring constants for CSS-based ring
const RING_SIZE = 110;

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  // Mock User Data with Enhanced Fields
  const user = {
    name: 'Shlok Sharma',
    age: 28,
    bio: 'Foodie & Explorer. Looking for great conversations and meeting new people across the city.',
    location: 'New Delhi, India',
    languages: 'English, Hindi',
    memberSince: 'Oct 2026',
    phone: '+91 98****1234',
    email: 'shl***@gmail.com',
    profileCompleteness: 85,
    trustScore: 98,
    kycStatus: 'unverified', // Unverified triggers the KYC checklist flow
    walletBalance: '₹4,500',
    reviewsCount: 12,
    totalMeetups: 15,
    hasActiveBooking: true,
  };

  // State for inline safety toggles
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    contact_share: true,
    live_monitor: true,
  });

  const [isBioExpanded, setIsBioExpanded] = useState(false);

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of CoBuddy?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] }) 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ── Active Booking Alert ── */}
        {user.hasActiveBooking && (
          <TouchableOpacity 
            style={styles.activeBookingBanner}
            onPress={() => navigation.navigate('LiveSessionStack', { screen: 'ActiveSessionScreen' })}
            activeOpacity={0.9}
          >
            <View style={styles.bannerIconBox}>
              <Icon name="timer-sand" size={20} color={theme.colors.background} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>Active Session Ongoing</Text>
              <Text style={styles.bannerSubtitle}>Tap to return to your live meetup.</Text>
            </View>
            <Icon name="arrow-right-circle" size={24} color={theme.colors.background} />
          </TouchableOpacity>
        )}

        {/* ── Cinematic Hero Banner ── */}
        <View style={styles.heroShadow}>
          <View style={styles.heroCard}>
            
            {/* Dark Portrait Background */}
            <View style={styles.heroImgBg}>
              <Icon name="account" size={80} color="rgba(255,255,255,0.05)" />
            </View>
            
            <View style={styles.heroGradient} />

            {/* Top Right Actions */}
            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.heroBtn} activeOpacity={0.7} onPress={() => Alert.alert('Share Profile', 'Coming soon!')}>
                <Icon name="share-variant" size={16} color={theme.colors.background} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBtn} activeOpacity={0.7} onPress={() => navigation.navigate('EditProfileScreen')}>
                <Icon name="pencil" size={16} color={theme.colors.background} />
              </TouchableOpacity>
            </View>

            {/* Bottom Overlay Content */}
            <View style={styles.heroBottom}>
              <Text style={styles.heroName}>{user.name}, {user.age}</Text>
              
              <View style={styles.heroBadgesRow}>
                {user.kycStatus === 'verified' && (
                  <View style={styles.kycBadge}>
                    <Icon name="check-decagram" size={12} color={theme.colors.primary} />
                    <Text style={styles.kycBadgeText}>Identity Verified</Text>
                  </View>
                )}
                <View style={styles.locationBadge}>
                  <Icon name="map-marker" size={12} color={theme.colors.textSecondary} />
                  <Text style={styles.locationText}>{user.location}</Text>
                </View>
              </View>

              <View style={styles.langTagsRow}>
                <View style={styles.langTag}>
                  <Text style={styles.langTagText}>English</Text>
                </View>
                <View style={styles.langTag}>
                  <Text style={styles.langTagText}>Hindi</Text>
                </View>
              </View>
              
              {/* Added Bio in Hero Banner */}
              <View style={{ marginTop: 8 }}>
                <Text style={styles.heroBio} numberOfLines={isBioExpanded ? undefined : 1}>
                  {user.bio}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setIsBioExpanded(!isBioExpanded)}>
                  <Text style={styles.readMoreText}>{isBioExpanded ? 'Show less' : 'Read more'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* ── Trust Score CSS Card (Native-Safe) ── */}
        <View style={styles.trustCard}>
          <View style={styles.trustGlow} />
          <View style={styles.trustHeader}>
            <Text style={styles.cardTitle}>Trust Score</Text>
            <Icon name="shield-star" size={20} color={theme.colors.primary} />
          </View>

          <View style={styles.circleWrapper}>
            <View style={styles.cssRingBase}>
               <View style={styles.cssRingProgress} />
            </View>
            <View style={styles.scoreTextWrapper}>
              <Text style={styles.scoreNumber}>{user.trustScore}</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
          </View>

          <View style={styles.trustStats}>
            <View style={styles.trustStatRow}>
              <Text style={styles.trustStatLabel}>Session Completion</Text>
              <Text style={styles.trustStatValue}>100%</Text>
            </View>
            <View style={[styles.trustStatRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.trustStatLabel}>Safety Rating</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={styles.trustStatValue}>4.9</Text>
                <Icon name="star" size={13} color={theme.colors.primary} />
              </View>
            </View>
          </View>
        </View>

        {/* ── Identity & Contact Card (KYC Checklist) ── */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Identity & Contact</Text>
          
          {/* Completeness Bar */}
          <View style={styles.completenessBox}>
            <View style={styles.completenessHeader}>
              <Text style={styles.completenessTitle}>Profile Completeness</Text>
              <Text style={styles.completenessValue}>{user.profileCompleteness}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${user.profileCompleteness}%` }]} />
            </View>
          </View>

          {/* Contact Details Overview */}
          <View style={styles.contactInfoBox}>
            <Text style={styles.memberSinceText}>Member since {user.memberSince}</Text>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
              onPress={() => navigation.navigate('EditProfileScreen')}
              activeOpacity={0.7}
            >
              <Text style={styles.contactEmailText}>{user.email}</Text>
              <Icon name="pencil" size={14} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          {/* KYC Checklist Flow */}
          <View style={styles.checklistContainer}>
            {/* Phone (Always Verified) */}
            <View style={styles.verifyItem}>
              <View style={styles.verifyIconBox}>
                <Icon name="check" size={16} color={theme.colors.primary} />
              </View>
              <View style={styles.verifyMeta}>
                <Text style={styles.verifyTitle}>Phone Number</Text>
                <Text style={styles.verifySub}>{user.phone} • Verified</Text>
              </View>
            </View>

            {/* Govt ID (Conditional) */}
            <View style={[styles.verifyItem, user.kycStatus !== 'verified' && { borderColor: 'rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }]}>
              <View style={[styles.verifyIconBox, user.kycStatus !== 'verified' && { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                <Icon 
                  name={user.kycStatus === 'verified' ? "card-account-details-outline" : "alert-circle-outline"} 
                  size={18} 
                  color={user.kycStatus === 'verified' ? theme.colors.primary : theme.colors.error} 
                />
              </View>
              <View style={styles.verifyMeta}>
                <Text style={styles.verifyTitle}>Government ID</Text>
                <Text style={[styles.verifySub, user.kycStatus !== 'verified' && {color: theme.colors.error}]}>
                  {user.kycStatus === 'verified' ? 'Aadhaar Verified' : 'Pending - Required for booking'}
                </Text>
              </View>
            </View>

            {/* Liveness/Selfie (Conditional) */}
            <View style={[styles.verifyItem, user.kycStatus !== 'verified' && { borderColor: 'rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }]}>
              <View style={[styles.verifyIconBox, user.kycStatus !== 'verified' && { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                <Icon 
                  name={user.kycStatus === 'verified' ? "face-recognition" : "alert-circle-outline"} 
                  size={18} 
                  color={user.kycStatus === 'verified' ? theme.colors.primary : theme.colors.error} 
                />
              </View>
              <View style={styles.verifyMeta}>
                <Text style={styles.verifyTitle}>Live Selfie</Text>
                <Text style={[styles.verifySub, user.kycStatus !== 'verified' && {color: theme.colors.error}]}>
                  {user.kycStatus === 'verified' ? 'Biometric matched' : 'Pending - Required for booking'}
                </Text>
              </View>
            </View>
          </View>

          {/* KYC Contextual CTA */}
          <TouchableOpacity 
            style={[styles.kycBtn, user.kycStatus !== 'verified' && styles.kycBtnPrimary]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('KYCStack')}
          >
            <Icon 
              name="shield-account" 
              size={18} 
              color={user.kycStatus === 'verified' ? theme.colors.primary : theme.colors.background} 
            />
            <Text style={[styles.kycBtnText, user.kycStatus !== 'verified' && { color: theme.colors.background }]}>
              {user.kycStatus === 'verified' ? 'View Identity Details' : 'Complete KYC Verification'}
            </Text>
            <Icon 
              name="chevron-right" 
              size={20} 
              color={user.kycStatus === 'verified' ? theme.colors.primary : theme.colors.background} 
            />
          </TouchableOpacity>
        </View>

        {/* ── Quick Access Links ── */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Wallet & Activity</Text>
          {[
            { id: 'wallet', icon: 'wallet-outline', label: 'My Wallet', sub: `Balance: ${user.walletBalance}`, action: () => navigation.navigate('WalletScreen') },
            { id: 'reviews', icon: 'star-circle-outline', label: 'My Reviews', sub: `${user.reviewsCount} Ratings received`, action: () => navigation.navigate('MyReviewsScreen') },
            { id: 'saved', icon: 'bookmark-outline', label: 'Saved Checklists', sub: 'Your favorite companions', action: () => navigation.navigate('SavedProfilesScreen') },
            { id: 'refer', icon: 'account-multiple-plus-outline', label: 'Refer a Friend', sub: 'Invite trusted members', action: () => navigation.navigate('ReferFriendScreen') },
          ].map((item, i, arr) => (
            <TouchableOpacity key={item.id} style={[styles.linkRow, i < arr.length - 1 && styles.linkRowBorder]} onPress={item.action} activeOpacity={0.7}>
              <View style={styles.linkIconBox}>
                <Icon name={item.icon} size={18} color={theme.colors.primary} />
              </View>
              <View style={styles.linkMeta}>
                <Text style={styles.linkLabel}>{item.label}</Text>
                <Text style={styles.linkSub}>{item.sub}</Text>
              </View>
              <Icon name="chevron-right" size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Safety Settings Inline Toggles ── */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Safety Settings</Text>
          {[
            { id: 'contact_share', title: 'Trusted Contact Sharing', sub: 'Auto-share session details.' },
            { id: 'live_monitor', title: 'Live Safety Monitoring', sub: 'Active tracking during sessions.' }
          ].map((s, i) => (
            <View key={s.id} style={[styles.safetyRow, i === 0 && styles.linkRowBorder]}>
              <View style={styles.safetyMeta}>
                <Text style={styles.safetyTitle}>{s.title}</Text>
                <Text style={styles.safetySub}>{s.sub}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleToggle(s.id)}
                style={[styles.toggleTrack, toggles[s.id] && styles.toggleTrackOn]}
                activeOpacity={0.9}
              >
                <View style={[styles.toggleThumb, toggles[s.id] && styles.toggleThumbOn]} />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.hubBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SafetyHubScreen')}
          >
            <Icon name="security" size={16} color={theme.colors.primary} />
            <Text style={styles.hubBtnText}>Open Safety Hub</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* ── Legal & App Settings ── */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Preferences & Legal</Text>
          {[
            { id: 'settings', icon: 'cog-outline', label: 'Settings Hub', sub: 'Account, Notifications, Language', action: () => navigation.navigate('SettingsHubScreen') },
            { id: 'support', icon: 'lifebuoy', label: 'Support Center', sub: 'Get help or report an issue', action: () => navigation.navigate('SupportCenterScreen') },
            { id: 'legal', icon: 'file-document-outline', label: 'Legal Agreements', sub: 'Terms of Service & Privacy', action: () => navigation.navigate('LegalAgreementsScreen') },
          ].map((item, i, arr) => (
            <TouchableOpacity key={item.id} style={[styles.linkRow, i < arr.length - 1 && styles.linkRowBorder]} onPress={item.action} activeOpacity={0.7}>
              <View style={styles.linkIconBox}>
                <Icon name={item.icon} size={18} color={theme.colors.primary} />
              </View>
              <View style={styles.linkMeta}>
                <Text style={styles.linkLabel}>{item.label}</Text>
                <Text style={styles.linkSub}>{item.sub}</Text>
              </View>
              <Icon name="chevron-right" size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.versionText}>CoBuddy v1.0.0 (Build 42)</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 16 },

  // Active Booking
  activeBookingBanner: {
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: theme.colors.primary, 
    borderRadius: 16, padding: 16,
    shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
  },
  bannerIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  bannerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.background, marginBottom: 2 },
  bannerSubtitle: { fontSize: 12, color: 'rgba(20, 20, 15, 0.7)' },

  // Cinematic Hero Banner
  heroShadow: {
    aspectRatio: 4 / 3, borderRadius: 24,
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5,
  },
  heroCard: {
    flex: 1, borderRadius: 24, overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  heroImgBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0D1A' },
  heroGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,13,26,0.6)' },
  heroActions: { position: 'absolute', top: 16, right: 16, flexDirection: 'row', gap: 10, zIndex: 2 },
  heroBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.8)', alignItems: 'center', justifyContent: 'center' },
  heroBottom: { position: 'absolute', bottom: 20, left: 20, right: 20, gap: 8, zIndex: 2 },
  heroName: { fontSize: 28, fontWeight: 'bold', color: theme.colors.textPrimary, letterSpacing: 0.5 },
  
  heroBadgesRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  kycBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(212,175,55,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)' },
  kycBadgeText: { fontSize: 11, fontWeight: 'bold', color: theme.colors.primary, textTransform: 'uppercase' },
  locationBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 12, color: theme.colors.textSecondary },

  langTagsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  langTag: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  langTagText: { fontSize: 11, color: theme.colors.textSecondary, fontWeight: '600' },
  
  heroBio: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18 },
  readMoreText: { fontSize: 12, color: theme.colors.primary, fontWeight: 'bold', marginTop: 2 },

  // Trust Score Card
  trustCard: {
    backgroundColor: theme.colors.surface, borderRadius: 24, padding: 20,
    borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.15)', overflow: 'hidden', position: 'relative'
  },
  trustGlow: { position: 'absolute', top: -40, right: -40, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(212,175,55,0.1)' },
  trustHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 8 },
  
  // Pure CSS Ring
  circleWrapper: { alignItems: 'center', justifyContent: 'center', paddingVertical: 10, height: RING_SIZE + 20 },
  cssRingBase: {
    width: RING_SIZE, height: RING_SIZE, borderRadius: RING_SIZE / 2,
    borderWidth: 6, borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center', justifyContent: 'center', position: 'absolute'
  },
  cssRingProgress: {
    width: RING_SIZE, height: RING_SIZE, borderRadius: RING_SIZE / 2,
    borderWidth: 6, borderColor: 'transparent',
    borderTopColor: theme.colors.primary, borderRightColor: theme.colors.primary, borderBottomColor: theme.colors.primary,
    position: 'absolute', transform: [{ rotate: '-45deg' }]
  },

  scoreTextWrapper: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  scoreNumber: { fontSize: 32, fontWeight: 'bold', color: theme.colors.textPrimary },
  scoreMax: { fontSize: 11, color: theme.colors.textSecondary, fontWeight: 'bold', letterSpacing: 1 },

  trustStats: { gap: 12, marginTop: 10 },
  trustStatRow: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  trustStatLabel: { fontSize: 13, color: theme.colors.textSecondary },
  trustStatValue: { fontSize: 13, fontWeight: 'bold', color: theme.colors.textPrimary },

  // General Info Card
  infoCard: { backgroundColor: theme.colors.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: theme.colors.border, gap: 12 },
  
  completenessBox: { marginBottom: 8 },
  completenessHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  completenessTitle: { fontSize: 13, color: theme.colors.textSecondary, fontWeight: '600' },
  completenessValue: { fontSize: 13, color: theme.colors.primary, fontWeight: 'bold' },
  progressBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: theme.colors.primary, borderRadius: 3 },

  contactInfoBox: { paddingVertical: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  contactEmailText: { fontSize: 12, color: theme.colors.textPrimary, fontWeight: '500' },
  memberSinceText: { fontSize: 12, color: theme.colors.textSecondary },

  // KYC Checklist
  checklistContainer: { gap: 12, marginBottom: 8 },
  verifyItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  verifyIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(212,175,55,0.1)', justifyContent: 'center', alignItems: 'center' },
  verifyMeta: { flex: 1, justifyContent: 'center' },
  verifyTitle: { fontSize: 14, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 2 },
  verifySub: { fontSize: 12, color: theme.colors.textSecondary },

  kycBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)', borderRadius: 20, paddingVertical: 14, paddingHorizontal: 16, marginTop: 4 },
  kycBtnPrimary: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  kycBtnText: { flex: 1, fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
  
  hubBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)', borderRadius: 20, paddingVertical: 14, paddingHorizontal: 16, marginTop: 4 },
  hubBtnText: { flex: 1, fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },

  // Links List
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12 },
  linkRowBorder: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  linkIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(212,175,55,0.1)', borderWidth: 1, borderColor: 'rgba(212,175,55,0.2)', alignItems: 'center', justifyContent: 'center' },
  linkMeta: { flex: 1 },
  linkLabel: { fontSize: 14, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 2 },
  linkSub: { fontSize: 12, color: theme.colors.textSecondary },

  // Inline Safety Toggles
  safetyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  safetyMeta: { flex: 1, marginRight: 12 },
  safetyTitle: { fontSize: 14, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 2 },
  safetySub: { fontSize: 12, color: theme.colors.textSecondary },
  toggleTrack: { width: 48, height: 26, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', paddingHorizontal: 3 },
  toggleTrackOn: { backgroundColor: theme.colors.primary },
  toggleThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: theme.colors.background, alignSelf: 'flex-start', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },
  toggleThumbOn: { alignSelf: 'flex-end' },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingVertical: 16, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', marginTop: 8 },
  logoutText: { color: theme.colors.error, fontSize: 15, fontWeight: 'bold', marginLeft: 8 },
  versionText: { textAlign: 'center', color: theme.colors.textSecondary, fontSize: 11, marginTop: 16, marginBottom: 16 }
});
