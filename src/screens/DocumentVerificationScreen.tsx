import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const DOC_TYPES = [
  {id: 'AADHAAR',  icon: 'card-account-details-outline', label: 'Aadhaar'},
  {id: 'PAN',      icon: 'card-account-details',         label: 'PAN Card'},
  {id: 'PASSPORT', icon: 'book-open-page-variant',       label: 'Passport'},
  {id: 'DL',       icon: 'car',                          label: 'Driving License'},
] as const;
type DocType = typeof DOC_TYPES[number]['id'];

const UPLOAD_TIPS = [
  {icon: 'white-balance-sunny', label: 'Use clear lighting'},
  {icon: 'aspect-ratio',        label: 'Keep all corners visible'},
  {icon: 'blur-off',            label: 'No blurry or cropped images'},
];

const CARD_BG = 'rgba(11,13,26,0.8)';
const CARD_BORDER = 'rgba(255,255,255,0.08)';
type UploadState = 'idle' | 'selected' | 'uploaded';

export const DocumentVerificationScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedDoc, setSelectedDoc] = useState<DocType>('AADHAAR');
  const [docNumber, setDocNumber] = useState('');
  const [frontState, setFrontState] = useState<UploadState>('idle');
  const [backState, setBackState]   = useState<UploadState>('idle');

  const formatDocNumber = (val: string, type: DocType) => {
    if (type === 'AADHAAR') {
      const cleaned = val.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
      if (match) return [match[1], match[2], match[3]].filter(v => v).join(' ');
      return cleaned; // Fallback while typing
    }
    if (type === 'PAN') return val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    return val.toUpperCase();
  };

  const getMaxLength = () => {
    switch (selectedDoc) {
      case 'AADHAAR': return 14; 
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

  const canSubmit = () => {
    if (frontState !== 'uploaded') return false;
    if (selectedDoc !== 'PAN' && selectedDoc !== 'PASSPORT' && backState !== 'uploaded') return false;
    if (selectedDoc === 'AADHAAR' && docNumber.length < 14) return false;
    if (selectedDoc === 'PAN' && docNumber.length < 10) return false;
    if (docNumber.length < 5) return false;
    return true;
  };

  const handleMockUpload = (side: 'front' | 'back') => {
    if (side === 'front') {
      setFrontState('selected');
      setTimeout(() => setFrontState('uploaded'), 600);
    } else {
      setBackState('selected');
      setTimeout(() => setBackState('uploaded'), 600);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.surface} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{top:10,bottom:10,left:10,right:10}}
          activeOpacity={0.7}>
          <Icon name="arrow-left" size={18} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.stepLabel}>VERIFICATION 1 OF 3</Text>
          <Text style={styles.headerTitle}>Complete Identity Verification</Text>
        </View>
        <View style={styles.headerIconWrap}>
          <Icon name="shield-check" size={20} color={theme.colors.primary} />
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.pageSub}>
            Upload a valid government-issued identity document to unlock verified CoBuddy experiences.
          </Text>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>SELECT DOCUMENT TYPE</Text>
            <View style={styles.docTypeGrid}>
              {DOC_TYPES.map(doc => {
                const selected = selectedDoc === doc.id;
                return (
                  <TouchableOpacity
                    key={doc.id}
                    style={[styles.docTypeCard, selected && styles.docTypeCardSelected]}
                    onPress={() => {
                      setSelectedDoc(doc.id);
                      setDocNumber('');
                      setFrontState('idle');
                      setBackState('idle');
                    }}
                    activeOpacity={0.75}>
                    <Icon name={doc.icon} size={24} color={selected ? theme.colors.primary : theme.colors.textSecondary} />
                    <Text style={[styles.docTypeLabel, selected && styles.docTypeLabelSelected]}>
                      {doc.label}
                    </Text>
                    {selected && (
                      <View style={styles.docTypeCheck}>
                        <Icon name="check-circle" size={14} color={theme.colors.primary} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{height: 20}} />
            <Text style={styles.sectionLabel}>DOCUMENT NUMBER</Text>
            <TextInput
              style={styles.input}
              placeholder={getPlaceholder()}
              placeholderTextColor="rgba(255,255,255,0.2)"
              keyboardType={selectedDoc === 'AADHAAR' ? 'number-pad' : 'default'}
              maxLength={getMaxLength()}
              value={docNumber}
              autoCapitalize="characters"
              onChangeText={(val) => setDocNumber(formatDocNumber(val, selectedDoc))}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>UPLOAD DOCUMENT</Text>
            <Text style={styles.uploadHint}>
              Clear and readable images work best. Max 5MB (JPG, PNG).
            </Text>

            <TouchableOpacity
              style={[styles.uploadSlot, frontState === 'uploaded' && styles.uploadSlotDone]}
              onPress={() => handleMockUpload('front')}
              activeOpacity={0.8}>
              <Icon
                name={frontState === 'uploaded' ? 'check-circle' : frontState === 'selected' ? 'timer-sand' : 'cloud-upload'}
                size={28}
                color={frontState === 'uploaded' ? theme.colors.success : theme.colors.primary}
              />
              <View style={styles.uploadSlotMeta}>
                <Text style={styles.uploadSlotTitle}>
                  {frontState === 'uploaded' ? 'Front Side Uploaded' : frontState === 'selected' ? 'Processing...' : 'Upload Front Side'}
                </Text>
                <Text style={styles.uploadSlotSub}>
                  {frontState === 'uploaded' ? 'Image accepted' : 'Tap to select image'}
                </Text>
              </View>
              {frontState === 'idle' && (
                <Icon name="plus-circle" size={20} color={theme.colors.primary} />
              )}
            </TouchableOpacity>

            {(selectedDoc === 'AADHAAR' || selectedDoc === 'DL') && (
              <>
                <View style={styles.uploadDivider} />
                <TouchableOpacity
                  style={[styles.uploadSlot, backState === 'uploaded' && styles.uploadSlotDone]}
                  onPress={() => handleMockUpload('back')}
                  activeOpacity={0.8}>
                  <Icon
                    name={backState === 'uploaded' ? 'check-circle' : backState === 'selected' ? 'timer-sand' : 'image'}
                    size={28}
                    color={backState === 'uploaded' ? theme.colors.success : theme.colors.textSecondary}
                  />
                  <View style={styles.uploadSlotMeta}>
                    <Text style={styles.uploadSlotTitle}>
                      {backState === 'uploaded' ? 'Back Side Uploaded' : backState === 'selected' ? 'Processing...' : 'Upload Back Side'}
                    </Text>
                    <Text style={styles.uploadSlotSub}>
                      {backState === 'uploaded' ? 'Image accepted' : 'Tap to select image'}
                    </Text>
                  </View>
                  {backState === 'idle' && (
                    <Icon name="plus-circle" size={20} color={theme.colors.textSecondary} />
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.tipsCard}>
            <Text style={styles.sectionLabel}>IMAGE REQUIREMENTS</Text>
            {UPLOAD_TIPS.map((tip, i) => (
              <View key={tip.icon} style={[styles.tipRow, i < UPLOAD_TIPS.length - 1 && styles.tipRowBorder]}>
                <View style={styles.tipIconWrap}>
                  <Icon name={tip.icon} size={16} color={theme.colors.primary} />
                </View>
                <Text style={styles.tipText}>{tip.label}</Text>
                <Icon name="check" size={14} color={theme.colors.success} />
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.ctaBtn, !canSubmit() && styles.ctaBtnDisabled]}
            disabled={!canSubmit()}
            onPress={() => navigation.navigate('SelfieCaptureScreen')}
            activeOpacity={0.85}>
            <Icon name="upload" size={18} color={theme.colors.background} />
            <Text style={styles.ctaBtnText}>Continue Verification</Text>
          </TouchableOpacity>

          <View style={styles.securityNote}>
            <Icon name="lock" size={13} color={theme.colors.textSecondary} />
            <Text style={styles.securityText}>
              Your information is encrypted and securely protected. Documents are used only for verification.
            </Text>
          </View>

          <View style={{height: 20}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.colors.background},
  
  header: {
    height: 64, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, gap: 12,
    backgroundColor: 'rgba(20,20,15,0.95)',
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: CARD_BORDER,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: CARD_BORDER,
    alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: {flex: 1, alignItems: 'center'},
  stepLabel: {fontWeight: '600', fontSize: 9, color: theme.colors.primary, letterSpacing: 2, marginBottom: 2},
  headerTitle: {fontWeight: '600', fontSize: 16, color: theme.colors.textPrimary},
  headerIconWrap: {width: 40, alignItems: 'flex-end'},

  scroll: {flex: 1},
  scrollContent: {paddingHorizontal: 20, paddingTop: 16, gap: 20},
  pageSub: {fontSize: 13, color: theme.colors.textSecondary, lineHeight: 19},

  card: {
    backgroundColor: CARD_BG, borderRadius: 20,
    borderWidth: 1, borderColor: CARD_BORDER, padding: 20,
  },
  sectionLabel: {
    fontWeight: '600', fontSize: 10,
    color: theme.colors.textSecondary, letterSpacing: 1.5, marginBottom: 14,
  },

  docTypeGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  docTypeCard: {
    flex: 1, minWidth: '45%',
    alignItems: 'center', gap: 8, padding: 16,
    borderRadius: 16, borderWidth: 1, borderColor: CARD_BORDER,
    backgroundColor: 'rgba(255,255,255,0.03)', position: 'relative',
  },
  docTypeCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
  },
  docTypeLabel: {fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center'},
  docTypeLabelSelected: {color: theme.colors.primary, fontWeight: '500'},
  docTypeCheck: {position: 'absolute', top: 8, right: 8},

  input: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: CARD_BORDER, borderRadius: 16,
    paddingHorizontal: 16, paddingVertical: 14,
    color: theme.colors.textPrimary, fontSize: 16, letterSpacing: 2, fontWeight: 'bold',
  },

  uploadHint: {fontSize: 12, color: theme.colors.textSecondary, marginBottom: 16, lineHeight: 17},
  uploadSlot: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderRadius: 14, borderWidth: 1, borderColor: CARD_BORDER,
    borderStyle: 'dashed', padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  uploadSlotDone: {
    borderStyle: 'solid',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
  },
  uploadSlotMeta: {flex: 1},
  uploadSlotTitle: {fontWeight: '500', fontSize: 14, color: theme.colors.textPrimary},
  uploadSlotSub: {fontSize: 11, color: theme.colors.textSecondary, marginTop: 2},
  uploadDivider: {height: 10},

  tipsCard: {
    backgroundColor: CARD_BG, borderRadius: 20,
    borderWidth: 1, borderColor: CARD_BORDER, padding: 20,
  },
  tipRow: {flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10},
  tipRowBorder: {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: CARD_BORDER},
  tipIconWrap: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  tipText: {flex: 1, fontSize: 13, color: theme.colors.textPrimary},

  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 17, borderRadius: 100,
    backgroundColor: theme.colors.primary,
  },
  ctaBtnDisabled: {opacity: 0.5},
  ctaBtnText: {fontWeight: '600', fontSize: 16, color: theme.colors.background, letterSpacing: 0.3},

  securityNote: {flexDirection: 'row', alignItems: 'flex-start', gap: 8, opacity: 0.6},
  securityText: {
    flex: 1, fontSize: 11, color: theme.colors.textSecondary, lineHeight: 16,
  },
});
