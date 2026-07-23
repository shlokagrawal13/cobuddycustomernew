import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const ReferFriendScreen = () => {
  const navigation = useNavigation<any>();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join CoBuddy to find amazing local companions and guides! Download the app now at https://cobuddy.app`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer a Friend</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Illustration */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconBox}>
            <View style={styles.heroGlow} />
            <Icon name="account-group" size={72} color={theme.colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Invite Friends</Text>
          <Text style={styles.heroDesc}>
            Love using CoBuddy? Share the experience with your friends and help grow our trusted community!
          </Text>
        </View>

        {/* Share Button Box */}
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>SPREAD THE WORD</Text>
          <Text style={styles.shareSubtext}>
            Tap below to share a direct download link with your friends via WhatsApp, SMS, or any social app.
          </Text>
          
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.8}>
            <Icon name="share-variant" size={20} color={theme.colors.background} />
            <Text style={styles.shareBtnText}>Share Invite Link</Text>
          </TouchableOpacity>
        </View>

        {/* Why Invite */}
        <Text style={styles.sectionTitle}>WHY INVITE FRIENDS?</Text>
        <View style={styles.stepsContainer}>
          <View style={styles.stepItem}>
            <View style={styles.stepIconBox}>
              <Icon name="shield-check" size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Build a safer community</Text>
              <Text style={styles.stepDesc}>Inviting people you trust helps keep our network safe and reliable.</Text>
            </View>
          </View>

          <View style={styles.stepConnector} />

          <View style={styles.stepItem}>
            <View style={styles.stepIconBox}>
              <Icon name="star" size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Better experiences</Text>
              <Text style={styles.stepDesc}>More users means more amazing companions to choose from in your city.</Text>
            </View>
          </View>
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
  
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  heroSection: { alignItems: 'center', marginBottom: 32, marginTop: 16 },
  heroIconBox: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(212,175,55,0.05)', justifyContent: 'center', alignItems: 'center', marginBottom: 24, position: 'relative' },
  heroGlow: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.primary, opacity: 0.15, transform: [{ scale: 1.5 }] },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 12 },
  heroDesc: { fontSize: 15, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: 16 },

  codeContainer: { backgroundColor: theme.colors.surface, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: 'rgba(212,175,55,0.2)', marginBottom: 40, shadowColor: theme.colors.primary, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5, alignItems: 'center' },
  codeLabel: { fontSize: 12, color: theme.colors.textSecondary, letterSpacing: 1.5, fontWeight: 'bold', marginBottom: 12 },
  shareSubtext: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  
  shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 24, gap: 12, width: '100%' },
  shareBtnText: { fontSize: 16, fontWeight: 'bold', color: theme.colors.background },

  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.textPrimary, letterSpacing: 1.5, marginBottom: 20 },
  
  stepsContainer: { backgroundColor: theme.colors.surface, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 32 },
  stepItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  stepIconBox: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(212,175,55,0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.primary },
  stepContent: { flex: 1, paddingTop: 4 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 4 },
  stepDesc: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 20 },
  stepConnector: { width: 2, height: 32, backgroundColor: theme.colors.border, marginLeft: 15, marginVertical: 4 }
});
