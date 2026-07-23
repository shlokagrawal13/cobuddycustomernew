import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const CATEGORIES = [
  'Companion No-Show',
  'Unprofessional Behavior',
  'Different from Profile',
  'Other'
];

export const DisputeRefundScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const bookingId = route.params?.bookingId || 'CB-HIS-9921';
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const handleBack = () => navigation.goBack();
  
  const handleSubmit = () => {
    // In a real app, send API request, then navigate
    navigation.navigate('MainTabNavigator', { screen: 'BookingsTab' });
  };

  const isFormValid = selectedCategory && description.length > 10;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raise a Dispute</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Booking Reference */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Disputing Booking: {bookingId}</Text>
          <View style={styles.summaryRow}>
            <Icon name="account" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.summaryText}>Companion: Elena Vasquez</Text>
          </View>
          <View style={styles.summaryRow}>
            <Icon name="calendar-check" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.summaryText}>Session Date: Fri, 24 Oct 2026</Text>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoCard}>
          <Icon name="shield-alert-outline" size={24} color={theme.colors.warning} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.infoTitle}>Escrow Frozen</Text>
            <Text style={styles.infoDesc}>Submitting a dispute will freeze the escrow payment. Our safety team will review your claim within 24 hours.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ISSUE CATEGORY</Text>
        
        <View style={styles.reasonsContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category} 
              style={[styles.reasonRow, selectedCategory === category && styles.reasonRowActive]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text style={[styles.reasonText, selectedCategory === category && styles.reasonTextActive]}>{category}</Text>
              <View style={[styles.radioCircle, selectedCategory === category && styles.radioCircleActive]}>
                {selectedCategory === category && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>DETAILED DESCRIPTION</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Please describe what happened in detail (min 10 chars)..."
          placeholderTextColor={theme.colors.textSecondary}
          multiline={true}
          numberOfLines={6}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
        
        <Text style={styles.sectionTitle}>UPLOAD PROOF (OPTIONAL)</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <Icon name="camera-plus" size={32} color={theme.colors.primary} />
          <Text style={styles.uploadText}>Tap to upload screenshots or photos</Text>
        </TouchableOpacity>
        
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarHandle} />
        <View style={styles.actionCol}>
          <TouchableOpacity 
            style={[styles.primaryBtn, { opacity: isFormValid ? 1 : 0.5 }]} 
            disabled={!isFormValid}
            onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnText}>Submit Dispute</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  iconBtn: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, letterSpacing: 0.5 },
  
  scrollContent: { padding: 20, paddingBottom: 40, gap: 24 },
  
  summaryCard: { backgroundColor: theme.colors.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  summaryTitle: { fontSize: 13, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 8, letterSpacing: 0.5 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 },
  summaryText: { fontSize: 14, color: theme.colors.textSecondary },

  infoCard: { flexDirection: 'row', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.warning, alignItems: 'center' },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.warning, marginBottom: 4 },
  infoDesc: { fontSize: 13, color: theme.colors.textPrimary, lineHeight: 20 },
  
  sectionTitle: { fontSize: 12, fontWeight: '900', color: theme.colors.textSecondary, letterSpacing: 1.5, marginTop: 8 },
  
  reasonsContainer: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  reasonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  reasonRowActive: { backgroundColor: 'rgba(212, 175, 55, 0.05)' },
  reasonText: { fontSize: 15, color: theme.colors.textPrimary },
  reasonTextActive: { color: theme.colors.primary, fontWeight: '600' },
  
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: theme.colors.textSecondary, justifyContent: 'center', alignItems: 'center' },
  radioCircleActive: { borderColor: theme.colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary },

  textArea: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, padding: 16, color: theme.colors.textPrimary, fontSize: 15, minHeight: 120 },

  uploadBox: { backgroundColor: 'rgba(212, 175, 55, 0.05)', borderRadius: 16, borderWidth: 1, borderColor: theme.colors.primary, borderStyle: 'dashed', padding: 32, alignItems: 'center', justifyContent: 'center' },
  uploadText: { color: theme.colors.primary, fontSize: 13, marginTop: 12, fontWeight: '500' },

  bottomBar: { 
    padding: 20, 
    paddingBottom: 24, 
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)'
  },
  bottomBarHandle: {
    width: 36,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: -8
  },
  actionCol: { gap: 12, width: '100%' },
  primaryBtn: { width: '100%', height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  primaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
});
