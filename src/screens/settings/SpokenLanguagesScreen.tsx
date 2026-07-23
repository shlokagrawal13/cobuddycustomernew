import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

const SPOKEN_LANGUAGES = [
    { id: 'en', label: 'English', native: 'English' },
    { id: 'hi', label: 'Hindi', native: 'हिंदी' },
    { id: 'mr', label: 'Marathi', native: 'मराठी' },
    { id: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
    { id: 'bn', label: 'Bengali', native: 'বাংলা' },
    { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { id: 'te', label: 'Telugu', native: 'తెలుగు' },
    { id: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { id: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { id: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { id: 'ur', label: 'Urdu', native: 'اردو' },
    { id: 'fr', label: 'French', native: 'Français' },
    { id: 'es', label: 'Spanish', native: 'Español' },
];

export const SpokenLanguagesScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const initialLanguages = route.params?.initialLanguages || ['en', 'hi'];
  const [selected, setSelected] = useState<Set<string>>(new Set(initialLanguages));

  const toggleLang = (id: string) => {
      setSelected(prev => {
          const next = new Set(prev);
          if (next.has(id)) {
              if (next.size > 1) next.delete(id);
          } else {
              if (next.size < 5) next.add(id);
          }
          return next;
      });
  };

  const handleSave = () => {
      // Map IDs back to Labels for simple display in EditProfile
      const selectedLabels = Array.from(selected).map(
          id => SPOKEN_LANGUAGES.find(l => l.id === id)?.label || id
      );
      
      navigation.navigate({
          name: 'EditProfileScreen',
          params: { updatedLanguages: selectedLabels, updatedLangIds: Array.from(selected) },
          merge: true,
      });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spoken Languages</Text>
        <TouchableOpacity style={styles.saveHeaderBtn} onPress={handleSave}>
            <Text style={styles.saveHeaderBtnText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.infoBanner}>
            <Icon name="earth" size={24} color={theme.colors.primary} style={{marginBottom: 8}} />
            <Text style={styles.infoText}>Select up to 5 languages you can fluently converse in during a meetup.</Text>
            <Text style={styles.countText}>{selected.size}/5 selected</Text>
        </View>

        <View style={styles.grid}>
            {SPOKEN_LANGUAGES.map(lang => {
                const active = selected.has(lang.id);
                return (
                    <TouchableOpacity 
                        key={lang.id} 
                        style={[styles.tile, active && styles.tileActive]} 
                        onPress={() => toggleLang(lang.id)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.tileContent}>
                            <Text style={[styles.tileLabel, active && styles.tileLabelActive]}>{lang.label}</Text>
                            <Text style={[styles.tileNative, active && styles.tileNativeActive]}>{lang.native}</Text>
                        </View>
                        {active && <Icon name="check-circle" size={20} color={theme.colors.primary} />}
                    </TouchableOpacity>
                )
            })}
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
  saveHeaderBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(212,175,55,0.1)', borderRadius: 12 },
  saveHeaderBtnText: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  infoBanner: { backgroundColor: 'rgba(212, 175, 55, 0.05)', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)', marginBottom: 24, alignItems: 'center' },
  infoText: { fontSize: 14, color: theme.colors.textPrimary, textAlign: 'center', lineHeight: 22, marginBottom: 8 },
  countText: { fontSize: 12, color: theme.colors.primary, fontWeight: 'bold' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: { width: '48%', backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tileActive: { borderColor: 'rgba(212,175,55,0.8)', backgroundColor: 'rgba(212,175,55,0.08)' },
  tileContent: { flex: 1 },
  tileLabel: { fontSize: 15, color: theme.colors.textPrimary, fontWeight: '600', marginBottom: 2 },
  tileLabelActive: { color: theme.colors.primary },
  tileNative: { fontSize: 13, color: theme.colors.textSecondary },
  tileNativeActive: { color: theme.colors.primary, opacity: 0.8 },
});
