import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { INTERESTS_DATA } from '../onboarding/InterestSelectionScreen'; // To map IDs to full objects
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

const MOCK_PROFILE = {
    name: 'Shlok',
    bio: 'Tech enthusiast and coffee lover. Always looking for good conversations and networking opportunities.',
    age: '24',
    gender: 'Male',
    city: 'Mumbai, MH',
    kycVerified: true,
    languages: ['English', 'Hindi'],
    langIds: ['en', 'hi'],
    interests: [
      { id: 'cafe', label: 'Cafe Meetup', icon: 'coffee-outline' },
      { id: 'network', label: 'Networking', icon: 'handshake-outline' },
      { id: 'wellness', label: 'Yoga & Wellness', icon: 'yoga' },
    ]
};

export const EditProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const route = useRoute<any>();
  
  const [form, setForm] = useState({
      name: MOCK_PROFILE.name,
      bio: MOCK_PROFILE.bio,
      city: MOCK_PROFILE.city,
      languages: MOCK_PROFILE.languages,
      langIds: MOCK_PROFILE.langIds,
      interests: MOCK_PROFILE.interests,
  });

  // Handle incoming params from sub-screens (Location, Interests, Languages)
  useEffect(() => {
      if (route.params?.updatedCity) {
          setForm(prev => ({ ...prev, city: route.params.updatedCity }));
      }
      if (route.params?.updatedInterests) {
          // Map IDs back to full interest objects for rendering the grid
          const newInterests = route.params.updatedInterests.map((id: string) => {
              return INTERESTS_DATA.find(i => i.id === id) || { id, label: id, icon: 'star' };
          });
          setForm(prev => ({ ...prev, interests: newInterests }));
      }
      if (route.params?.updatedLanguages) {
          setForm(prev => ({ 
              ...prev, 
              languages: route.params.updatedLanguages,
              langIds: route.params.updatedLangIds || prev.langIds 
          }));
      }
  }, [route.params]);

  const updateForm = (key: string, value: string) => {
      setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
      if (!form.name.trim()) {
          Alert.alert('Error', 'Display name cannot be empty.');
          return;
      }
      Alert.alert('Success', 'Profile updated successfully!', [{ text: 'OK', onPress: () => smartGoBack() }]);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveHeaderBtn} onPress={handleSave}>
            <Text style={styles.saveHeaderBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            <View style={styles.avatarSection}>
                <View style={styles.avatarWrap}>
                    <Image source={{uri: 'https://i.pravatar.cc/300?img=11'}} style={styles.avatar} />
                    <TouchableOpacity style={styles.editAvatarBtn}>
                        <Icon name="camera" size={16} color={theme.colors.surface} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.avatarSub}>Tap to change photo</Text>
            </View>

            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>BASIC INFO</Text>
                
                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Display Name</Text>
                    <TextInput style={styles.input} value={form.name} onChangeText={v => updateForm('name', v)} placeholder="First Name" placeholderTextColor={theme.colors.textSecondary} />
                </View>

                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Short Bio</Text>
                    <TextInput style={[styles.input, styles.textArea]} value={form.bio} onChangeText={v => updateForm('bio', v)} placeholder="Say something about yourself..." placeholderTextColor={theme.colors.textSecondary} multiline maxLength={150} textAlignVertical="top" />
                    <Text style={styles.helperText}>{form.bio.length}/150 characters</Text>
                </View>

                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Current City</Text>
                    <TouchableOpacity 
                        style={[styles.iconInputWrap, {paddingVertical: 14, paddingRight: 16}]} 
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('LocationSelectionScreen')}
                    >
                        <Icon name="map-marker-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
                        <Text style={[styles.iconInput, {paddingVertical: 0, paddingRight: 0}]}>{form.city || 'Select Location'}</Text>
                        <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.formSection}>
                <View style={styles.rowHeader}>
                    <Text style={styles.sectionTitle}>LANGUAGES SPOKEN</Text>
                    <TouchableOpacity 
                        style={styles.editIconBtn} 
                        onPress={() => navigation.navigate('SpokenLanguagesScreen', { initialLanguages: form.langIds })}
                    >
                        <Icon name="pencil" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                    style={styles.clickableRow} 
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('SpokenLanguagesScreen', { initialLanguages: form.langIds })}
                >
                    <Text style={styles.clickableRowText}>
                        {form.languages.length > 0 ? form.languages.join(', ') : 'Select Languages'}
                    </Text>
                    <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
            </View>

            <View style={styles.formSection}>
                <View style={styles.rowHeader}>
                    <Text style={styles.sectionTitle}>INTERESTS & ACTIVITIES</Text>
                    <TouchableOpacity 
                        style={styles.editIconBtn} 
                        onPress={() => navigation.navigate('InterestSelectionScreen', { 
                            isEditMode: true, 
                            initialInterests: form.interests.map(i => i.id) 
                        })}
                    >
                        <Icon name="pencil" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.grid}>
                    {form.interests.map(item => (
                        <View key={item.id} style={[styles.tile, styles.tileActive]}>
                            <View style={styles.tileIconWrap}>
                                <Icon name={item.icon} size={20} color={theme.colors.primary} />
                            </View>
                            <Text style={[styles.tileLabel, styles.tileLabelActive]}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.formSection}>
                <View style={styles.rowHeader}>
                    <Text style={[styles.sectionTitle, {marginBottom: 0}]}>LOCKED DEMOGRAPHICS</Text>
                    {MOCK_PROFILE.kycVerified && (
                        <View style={styles.kycBadge}>
                            <Icon name="shield-check" size={12} color={theme.colors.success} />
                            <Text style={styles.kycBadgeText}>KYC Verified</Text>
                        </View>
                    )}
                </View>

                <View style={styles.lockedBlock}>
                    <View style={styles.lockedRow}>
                        <Text style={styles.lockedLabel}>Gender</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                            <Icon name="lock" size={14} color={theme.colors.textSecondary} />
                            <Text style={styles.lockedValue}>{MOCK_PROFILE.gender}</Text>
                        </View>
                    </View>
                    <View style={styles.lockedDivider} />
                    <View style={styles.lockedRow}>
                        <Text style={styles.lockedLabel}>Age</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                            <Icon name="lock" size={14} color={theme.colors.textSecondary} />
                            <Text style={styles.lockedValue}>{MOCK_PROFILE.age} yrs</Text>
                        </View>
                    </View>
                </View>
                {MOCK_PROFILE.kycVerified && (
                    <Text style={styles.helperTextLocked}>These details are locked for safety after KYC verification. Contact support to change.</Text>
                )}
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
  saveHeaderBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(212,175,55,0.1)', borderRadius: 12 },
  saveHeaderBtnText: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  avatarSection: { alignItems: 'center', marginBottom: 32, marginTop: 10 },
  avatarWrap: { width: 100, height: 100, borderRadius: 50, backgroundColor: theme.colors.surface, borderWidth: 2, borderColor: theme.colors.primary, marginBottom: 12, position: 'relative' },
  avatar: { width: '100%', height: '100%', borderRadius: 50 },
  editAvatarBtn: { position: 'absolute', bottom: -4, right: -4, width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: theme.colors.background },
  avatarSub: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '500' },

  formSection: { marginBottom: 32 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 16 },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  editIconBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(212,175,55,0.1)', justifyContent: 'center', alignItems: 'center', marginTop: -6 },
  
  inputBlock: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 8 },
  input: { backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: theme.colors.textPrimary },
  
  iconInputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  inputIcon: { paddingHorizontal: 12 },
  iconInput: { flex: 1, paddingVertical: 14, paddingRight: 16, fontSize: 15, color: theme.colors.textPrimary },

  textArea: { height: 100 },
  helperText: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 6, marginLeft: 4 },

  clickableRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 16, paddingVertical: 16 },
  clickableRowText: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '500' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { width: '48%', backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  tileActive: { borderColor: 'rgba(212,175,55,0.8)', backgroundColor: 'rgba(212,175,55,0.08)' },
  tileIconWrap: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  tileLabel: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '600', flex: 1 },
  tileLabelActive: { color: theme.colors.primary },

  kycBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100 },
  kycBadgeText: { fontSize: 10, fontWeight: 'bold', color: theme.colors.success },
  lockedBlock: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden', marginTop: 16 },
  lockedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  lockedDivider: { height: 1, backgroundColor: theme.colors.border },
  lockedLabel: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '500' },
  lockedValue: { fontSize: 15, color: theme.colors.textSecondary, fontWeight: '600' },
  helperTextLocked: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 12, marginLeft: 4, lineHeight: 16 }
});
