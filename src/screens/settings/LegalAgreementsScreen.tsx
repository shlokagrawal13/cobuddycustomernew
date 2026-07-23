import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

const LEGAL_DOCS = [
    { id: 'tos', title: 'Terms of Service', sub: 'Last updated: June 2026', icon: 'file-document-outline' },
    { id: 'privacy', title: 'Privacy Policy', sub: 'Last updated: June 2026', icon: 'shield-account-outline' },
    { id: 'community', title: 'Community Guidelines', sub: 'Rules for a safe environment', icon: 'account-group-outline' },
    { id: 'refund', title: 'Refund Policy', sub: 'Cancellation and escrow rules', icon: 'cash-refund' },
];

export const LegalAgreementsScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal & Agreements</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.card}>
            {LEGAL_DOCS.map((doc, index) => (
                <TouchableOpacity 
                    key={doc.id} 
                    style={[styles.row, index !== LEGAL_DOCS.length - 1 && styles.borderBottom]}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconWrap}>
                        <Icon name={doc.icon} size={22} color={theme.colors.textSecondary} />
                    </View>
                    <View style={styles.meta}>
                        <Text style={styles.title}>{doc.title}</Text>
                        <Text style={styles.sub}>{doc.sub}</Text>
                    </View>
                    <Icon name="open-in-new" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.footerBrand}>
            <Icon name="scale-balance" size={32} color={theme.colors.textSecondary} style={{opacity: 0.3, marginBottom: 12}} />
            <Text style={styles.brandText}>CoBuddy Technologies</Text>
            <Text style={styles.copyrightText}>All rights reserved.</Text>
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
  
  card: { backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  iconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  meta: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  sub: { fontSize: 12, color: theme.colors.textSecondary },
  
  footerBrand: { alignItems: 'center', marginTop: 40, opacity: 0.7 },
  brandText: { fontSize: 14, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1 },
  copyrightText: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 4 }
});
