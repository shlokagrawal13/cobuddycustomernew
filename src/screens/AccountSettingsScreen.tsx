import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

export const AccountSettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('shlok.dev@example.com');
  const [appleConnected, setAppleConnected] = useState(false);
  const isKycVerified = true;
  
  const handleSaveEmail = () => {
      Alert.alert('Email Updated', 'Your email address has been successfully updated.');
  };

  const handleDataRequest = () => {
      Alert.alert('Request Sent', 'A link to download your data will be emailed to you within 48 hours.');
  };

  const handleSupportRedirect = () => {
      navigation.navigate('CreateSupportTicketScreen', { category: 'Identity Update' });
  };

  const handlePhoneUpdate = () => {
      navigation.navigate('PhoneLoginScreen', { isUpdate: true });
  };

  const toggleAppleConnect = () => {
      setAppleConnected(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            {/* SECTION 1: CORE IDENTITY (Private) */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CORE IDENTITY (PRIVATE)</Text>
                <View style={styles.card}>
                    <View style={styles.infoBanner}>
                        <Icon name="shield-check" size={16} color={theme.colors.success} />
                        <Text style={styles.infoBannerText}>Identity verified via KYC. Contact support to update.</Text>
                    </View>

                    <View style={styles.inputBlock}>
                        <Text style={styles.inputLabel}>Legal Name</Text>
                        <TouchableOpacity style={styles.lockedInput} activeOpacity={0.9} onPress={handleSupportRedirect}>
                            <Text style={styles.lockedText}>Shlok Sharma</Text>
                            <Icon name={isKycVerified ? "lock" : "pencil"} size={16} color={isKycVerified ? theme.colors.textSecondary : theme.colors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.helperText}>Matches your Government ID.</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.inputBlock}>
                        <Text style={styles.inputLabel}>Date of Birth</Text>
                        <TouchableOpacity style={styles.lockedInput} activeOpacity={0.9} onPress={handleSupportRedirect}>
                            <Text style={styles.lockedText}>15 Aug 1998</Text>
                            <Icon name={isKycVerified ? "lock" : "calendar-month"} size={16} color={isKycVerified ? theme.colors.textSecondary : theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.divider} />

                    <View style={styles.inputBlock}>
                        <Text style={styles.inputLabel}>Gender Identity</Text>
                        <TouchableOpacity style={styles.lockedInput} activeOpacity={0.9} onPress={handleSupportRedirect}>
                            <Text style={styles.lockedText}>Male</Text>
                            <Icon name={isKycVerified ? "lock" : "chevron-down"} size={16} color={isKycVerified ? theme.colors.textSecondary : theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* SECTION 2: CONTACT & RECOVERY */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CONTACT & RECOVERY</Text>
                <View style={styles.card}>
                    <View style={styles.inputBlock}>
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <TouchableOpacity style={styles.lockedInput} activeOpacity={0.7} onPress={handlePhoneUpdate}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                                <Text style={styles.lockedText}>+91 98****1234</Text>
                                <Icon name="check-decagram" size={16} color={theme.colors.primary} />
                            </View>
                            <Icon name="pencil" size={16} color={theme.colors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.helperText}>Verified. Change requires OTP.</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.inputBlock}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <View style={{flexDirection: 'row', gap: 8}}>
                            <TextInput 
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="name@example.com"
                                placeholderTextColor={theme.colors.textSecondary}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveEmail}>
                                <Text style={styles.saveBtnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.helperText}>Used for booking receipts and support.</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.inputBlock}>
                        <Text style={styles.inputLabel}>Linked Accounts</Text>
                        
                        <View style={styles.linkedRow}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                                <Icon name="google" size={24} color="#DB4437" />
                                <Text style={styles.linkedText}>Google</Text>
                            </View>
                            <Text style={[styles.linkStatus, {color: theme.colors.success}]}>Connected</Text>
                        </View>

                        <View style={[styles.linkedRow, {borderBottomWidth: 0, paddingBottom: 0, marginTop: 16}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                                <Icon name="apple" size={24} color={theme.colors.textPrimary} />
                                <Text style={styles.linkedText}>Apple</Text>
                            </View>
                            <TouchableOpacity onPress={toggleAppleConnect}>
                                <Text style={[styles.linkStatus, {color: appleConnected ? theme.colors.success : theme.colors.primary}]}>
                                    {appleConnected ? 'Connected' : 'Connect'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* SECTION 3: DATA & PORTABILITY */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>DATA & PRIVACY</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.downloadRow} activeOpacity={0.7} onPress={handleDataRequest}>
                        <View style={styles.iconBox}>
                            <Icon name="download-box-outline" size={24} color={theme.colors.textPrimary} />
                        </View>
                        <View style={{flex: 1, marginLeft: 16}}>
                            <Text style={styles.downloadTitle}>Download Account Info</Text>
                            <Text style={styles.downloadSub}>Request a copy of your CoBuddy data</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 12, marginLeft: 8 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, padding: 20 },
  
  infoBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)', marginBottom: 20, gap: 8 },
  infoBannerText: { fontSize: 12, color: theme.colors.success, flex: 1 },

  inputBlock: { marginBottom: 4 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 8 },
  lockedInput: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 16, paddingVertical: 14 },
  lockedText: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '500' },
  helperText: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 8 },
  
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 20 },
  
  input: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: theme.colors.textPrimary },
  saveBtn: { backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' },
  saveBtnText: { color: theme.colors.primary, fontWeight: 'bold', fontSize: 14 },

  linkedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  linkedText: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '500' },
  linkStatus: { fontSize: 13, fontWeight: '600' },

  downloadRow: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border },
  downloadTitle: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 2 },
  downloadSub: { fontSize: 12, color: theme.colors.textSecondary }
});
