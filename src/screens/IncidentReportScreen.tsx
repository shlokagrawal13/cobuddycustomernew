import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const INCIDENT_TYPES = [
  { id: 'harassment', label: 'Inappropriate Behavior or Harassment' },
  { id: 'identity', label: 'Identity Mismatch (Fake Profile)' },
  { id: 'noshow', label: 'Companion No-Show / Scam' },
  { id: 'other', label: 'Other Safety Concern' }
];

export const IncidentReportScreen = () => {
  const navigation = useNavigation<any>();
  
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState('');
  const [description, setDescription] = useState('');
  const [hasEvidence, setHasEvidence] = useState(false);

  const handleSubmit = () => {
    if (!selectedType || !description.trim()) {
      Alert.alert('Incomplete', 'Please select an incident type and provide details.');
      return;
    }
    
    Alert.alert(
      'Report Submitted',
      'Your safety report has been escalated to our Trust & Safety team. We will review this immediately and contact you.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Incident</Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.alertBanner}>
            <Icon name="shield-alert" size={20} color={theme.colors.error} />
            <Text style={styles.alertText}>
              All reports are strictly confidential. In case of immediate physical danger, please contact local authorities (112) first.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>WHAT HAPPENED?</Text>
          <View style={styles.typeContainer}>
            {INCIDENT_TYPES.map(type => (
              <TouchableOpacity 
                key={type.id} 
                style={[styles.typeItem, selectedType === type.id && styles.typeItemActive]}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.radioBox, selectedType === type.id && styles.radioBoxActive]}>
                  {selectedType === type.id && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.typeLabel, selectedType === type.id && styles.typeLabelActive]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>BOOKING REFERENCE OR USERNAME (OPTIONAL)</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder="e.g., Booking #4412 or Companion name"
                placeholderTextColor={theme.colors.textSecondary}
                value={bookingRef}
                onChangeText={setBookingRef}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>INCIDENT DETAILS (REQUIRED)</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput 
                style={styles.textArea}
                placeholder="Please describe exactly what happened..."
                placeholderTextColor={theme.colors.textSecondary}
                value={description}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>EVIDENCE (OPTIONAL)</Text>
            <TouchableOpacity 
              style={[styles.attachmentBtn, hasEvidence && styles.attachmentBtnActive]}
              onPress={() => setHasEvidence(!hasEvidence)}
              activeOpacity={0.7}
            >
              <Icon 
                name={hasEvidence ? "check-circle" : "camera-plus"} 
                size={24} 
                color={hasEvidence ? theme.colors.primary : theme.colors.textSecondary} 
              />
              <Text style={[styles.attachmentText, hasEvidence && { color: theme.colors.primary }]}>
                {hasEvidence ? 'Evidence Attached (Tap to remove)' : 'Upload Screenshots or Audio'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>Max file size: 10MB</Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitBtn, (!selectedType || !description) && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Icon name="alert-octagon" size={20} color={theme.colors.background} />
          <Text style={styles.submitBtnText}>Submit Confidential Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  alertBanner: { flexDirection: 'row', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', marginBottom: 24, gap: 12 },
  alertText: { flex: 1, fontSize: 13, color: theme.colors.textPrimary, lineHeight: 20 },

  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1.5, marginBottom: 16 },
  
  typeContainer: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 24, overflow: 'hidden' },
  typeItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  typeItemActive: { backgroundColor: 'rgba(212, 175, 55, 0.05)' },
  radioBox: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: theme.colors.textSecondary, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  radioBoxActive: { borderColor: theme.colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary },
  typeLabel: { fontSize: 15, color: theme.colors.textPrimary },
  typeLabelActive: { fontWeight: '600', color: theme.colors.primary },

  formGroup: { marginBottom: 24 },
  inputLabel: { fontSize: 12, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1.5, marginBottom: 8 },
  inputContainer: { backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  input: { height: 50, paddingHorizontal: 16, color: theme.colors.textPrimary, fontSize: 15 },
  
  textAreaContainer: { height: 120 },
  textArea: { flex: 1, padding: 16, color: theme.colors.textPrimary, fontSize: 15 },

  attachmentBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.surface, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: theme.colors.border, borderStyle: 'dashed', gap: 12 },
  attachmentBtnActive: { borderColor: theme.colors.primary, backgroundColor: 'rgba(212, 175, 55, 0.05)', borderStyle: 'solid' },
  attachmentText: { fontSize: 14, fontWeight: '500', color: theme.colors.textSecondary },
  helperText: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 8, marginLeft: 4 },

  footer: { padding: 20, paddingBottom: 32, borderTopWidth: 1, borderTopColor: theme.colors.border, backgroundColor: theme.colors.background },
  submitBtn: { flexDirection: 'row', backgroundColor: theme.colors.error, paddingVertical: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 8 },
  submitBtnDisabled: { opacity: 0.5, backgroundColor: theme.colors.textSecondary },
  submitBtnText: { fontSize: 16, fontWeight: 'bold', color: theme.colors.background }
});
