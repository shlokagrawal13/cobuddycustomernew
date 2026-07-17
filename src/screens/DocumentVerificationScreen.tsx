import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

type DocType = 'AADHAAR' | 'PAN' | 'DL' | 'PASSPORT';

export const DocumentVerificationScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation(['onboarding']);
  
  const [selectedDoc, setSelectedDoc] = useState<DocType>('AADHAAR');
  const [docNumber, setDocNumber] = useState('');
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

  const DOC_OPTIONS = [
    { id: 'AADHAAR', label: 'Aadhaar' },
    { id: 'PAN', label: 'PAN Card' },
    { id: 'DL', label: 'Driving License' },
    { id: 'PASSPORT', label: 'Passport' },
  ];

  // Auto format inputs based on type
  const formatDocNumber = (val: string, type: DocType) => {
    if (type === 'AADHAAR') {
      const cleaned = val.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
      if (match) return [match[1], match[2], match[3]].filter(v => v).join(' ');
    }
    if (type === 'PAN') {
      return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    }
    return val.toUpperCase();
  };

  const getMaxLength = () => {
    switch (selectedDoc) {
      case 'AADHAAR': return 14; // 12 + 2 spaces
      case 'PAN': return 10;
      default: return 20;
    }
  };

  const getPlaceholder = () => {
    switch (selectedDoc) {
      case 'AADHAAR': return '0000 0000 0000';
      case 'PAN': return 'ABCDE1234F';
      case 'DL': return 'DL-1420110012345';
      case 'PASSPORT': return 'A1234567';
    }
  };

  const isFormValid = () => {
    if (!frontUploaded) return false;
    if (selectedDoc !== 'PAN' && selectedDoc !== 'PASSPORT' && !backUploaded) return false;
    if (selectedDoc === 'AADHAAR' && docNumber.length < 14) return false;
    if (selectedDoc === 'PAN' && docNumber.length < 10) return false;
    if (docNumber.length < 5) return false;
    return true;
  };

  const handleNext = () => {
    navigation.navigate('SelfieCaptureScreen');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 1 of 3</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Government ID</Text>
          <Text style={styles.subtitle}>Select an ID type and upload clear photos for verification.</Text>

          {/* Document Selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.docSelector}>
            {DOC_OPTIONS.map((doc) => {
              const isSelected = selectedDoc === doc.id;
              return (
                <TouchableOpacity
                  key={doc.id}
                  style={[styles.docChip, isSelected && styles.docChipSelected]}
                  onPress={() => {
                    setSelectedDoc(doc.id as DocType);
                    setDocNumber('');
                  }}
                >
                  <Text style={[styles.docChipText, isSelected && styles.docChipTextSelected]}>
                    {doc.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Document Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{DOC_OPTIONS.find(d => d.id === selectedDoc)?.label} Number</Text>
            <TextInput
              style={styles.input}
              placeholder={getPlaceholder()}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType={selectedDoc === 'AADHAAR' ? 'number-pad' : 'default'}
              maxLength={getMaxLength()}
              value={docNumber}
              autoCapitalize="characters"
              onChangeText={(val) => setDocNumber(formatDocNumber(val, selectedDoc))}
            />
          </View>

          {/* Upload Sections */}
          <Text style={styles.sectionTitle}>Upload Documents</Text>
          <View style={styles.uploadGrid}>
            <TouchableOpacity 
              style={[styles.uploadBox, frontUploaded && styles.uploadBoxSuccess]} 
              onPress={() => setFrontUploaded(!frontUploaded)}
              activeOpacity={0.7}
            >
              <Icon 
                name={frontUploaded ? "check-circle" : "camera-plus-outline"} 
                size={32} 
                color={frontUploaded ? theme.colors.success : theme.colors.primary} 
              />
              <Text style={[styles.uploadBoxText, frontUploaded && { color: theme.colors.success }]}>
                {frontUploaded ? "Front Uploaded" : "Scan Front"}
              </Text>
            </TouchableOpacity>

            {(selectedDoc === 'AADHAAR' || selectedDoc === 'DL') && (
              <TouchableOpacity 
                style={[styles.uploadBox, backUploaded && styles.uploadBoxSuccess]} 
                onPress={() => setBackUploaded(!backUploaded)}
                activeOpacity={0.7}
              >
                <Icon 
                  name={backUploaded ? "check-circle" : "camera-plus-outline"} 
                  size={32} 
                  color={backUploaded ? theme.colors.success : theme.colors.primary} 
                />
                <Text style={[styles.uploadBoxText, backUploaded && { color: theme.colors.success }]}>
                  {backUploaded ? "Back Uploaded" : "Scan Back"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.helpText}>Ensure all text is clearly visible and there is no glare on the ID card.</Text>

        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.nextBtn, !isFormValid() && styles.nextBtnDisabled]}
            disabled={!isFormValid()}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={[styles.nextBtnText, !isFormValid() && styles.nextBtnTextDisabled]}>Continue</Text>
            <Icon name="arrow-right" size={20} color={isFormValid() ? theme.colors.background : 'rgba(255,255,255,0.4)'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 32,
  },
  docSelector: {
    gap: 12,
    marginBottom: 32,
  },
  docChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  docChipSelected: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: theme.colors.primary,
  },
  docChipText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  docChipTextSelected: {
    color: theme.colors.primary,
  },
  inputContainer: {
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    color: theme.colors.primary,
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  uploadGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  uploadBox: {
    flex: 1,
    height: 120,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    borderStyle: 'dashed',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  uploadBoxSuccess: {
    borderColor: theme.colors.success,
    backgroundColor: 'rgba(52, 199, 89, 0.05)',
    borderStyle: 'solid',
  },
  uploadBoxText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  helpText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  bottomBar: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    backgroundColor: theme.colors.surface,
  },
  nextBtn: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    gap: 8,
  },
  nextBtnDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  nextBtnText: {
    color: theme.colors.background,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  nextBtnTextDisabled: {
    color: 'rgba(255,255,255,0.4)',
  },
});
