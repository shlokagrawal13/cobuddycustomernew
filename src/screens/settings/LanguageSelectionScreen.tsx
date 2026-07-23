import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

const LANGUAGES = [
    { id: 'en', name: 'English', sub: 'US & UK' },
    { id: 'hi', name: 'Hindi (हिंदी)', sub: 'India' },
    { id: 'mr', name: 'Marathi (मराठी)', sub: 'Maharashtra, India' },
    { id: 'gu', name: 'Gujarati (ગુજરાતી)', sub: 'Gujarat, India' },
    { id: 'bn', name: 'Bengali (বাংলা)', sub: 'West Bengal, India' },
];

export const LanguageSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.infoBanner}>
            <Icon name="translate" size={24} color={theme.colors.primary} style={{marginBottom: 8}} />
            <Text style={styles.infoText}>Select your preferred language. This will change the text across the CoBuddy app.</Text>
        </View>

        <View style={styles.card}>
            {LANGUAGES.map((lang, index) => {
                const isSelected = selectedLang === lang.id;
                return (
                    <TouchableOpacity 
                        key={lang.id} 
                        style={[styles.row, index !== LANGUAGES.length - 1 && styles.borderBottom]}
                        activeOpacity={0.7}
                        onPress={() => setSelectedLang(lang.id)}
                    >
                        <View style={styles.meta}>
                            <Text style={styles.title}>{lang.name}</Text>
                            <Text style={styles.sub}>{lang.sub}</Text>
                        </View>
                        <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                            {isSelected && <View style={styles.radioInner} />}
                        </View>
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
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  infoBanner: { backgroundColor: 'rgba(212, 175, 55, 0.05)', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)', marginBottom: 24, alignItems: 'center' },
  infoText: { fontSize: 14, color: theme.colors.textPrimary, textAlign: 'center', lineHeight: 22 },

  card: { backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  meta: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  sub: { fontSize: 13, color: theme.colors.textSecondary },
  
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: theme.colors.textSecondary, justifyContent: 'center', alignItems: 'center' },
  radioOuterSelected: { borderColor: theme.colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary }
});
