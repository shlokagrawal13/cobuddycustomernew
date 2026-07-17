import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

export const SelfieCaptureScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation(['onboarding']);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const handleCapture = () => {
    setPhotoCaptured(true);
  };

  const handleRetake = () => {
    setPhotoCaptured(false);
  };

  const handleNext = () => {
    navigation.navigate('LivenessDetectionScreen');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 2 of 3</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Selfie Capture</Text>
        <Text style={styles.subtitle}>
          {photoCaptured 
            ? "Ensure your face is clearly visible and not blurry." 
            : "Please remove any glasses or hats, and ensure you are in a well-lit area."}
        </Text>

        <View style={styles.cameraContainer}>
          {/* MOCK: Camera Viewport */}
          <View style={[styles.cameraFrame, photoCaptured && styles.cameraFrameSuccess]}>
            {/* Premium Corner Markers */}
            <View style={[styles.cornerMarker, styles.cornerTL]} />
            <View style={[styles.cornerMarker, styles.cornerTR]} />
            <View style={[styles.cornerMarker, styles.cornerBL]} />
            <View style={[styles.cornerMarker, styles.cornerBR]} />

            {photoCaptured ? (
              <Icon name="face-recognition" size={80} color={theme.colors.success} />
            ) : (
              <Icon name="camera-front-variant" size={80} color={theme.colors.textSecondary} />
            )}
          </View>
        </View>

        {!photoCaptured && (
          <View style={styles.tipsBox}>
            <Icon name="lightbulb-on-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.tipsText}>Face the camera directly and center your face in the oval.</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomBar}>
        {photoCaptured ? (
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake}>
              <Text style={styles.retakeBtnText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleNext}>
              <Text style={styles.confirmBtnText}>Confirm</Text>
              <Icon name="check" size={20} color={theme.colors.background} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.captureBtn} onPress={handleCapture} activeOpacity={0.8}>
            <View style={styles.captureInnerBtn} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000', // Camera usually has black bg
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
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cameraFrame: {
    width: 280,
    height: 380,
    borderRadius: 140, // Oval shape
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.4)', // Gold tint
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15182B',
    position: 'relative',
  },
  cameraFrameSuccess: {
    borderColor: theme.colors.success,
  },
  cornerMarker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: theme.colors.primary,
  },
  cornerTL: {
    top: -2,
    left: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 10,
  },
  cornerTR: {
    top: -2,
    right: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 10,
  },
  cornerBL: {
    bottom: -2,
    left: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 10,
  },
  cornerBR: {
    bottom: -2,
    right: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 10,
  },
  tipsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  tipsText: {
    color: theme.colors.primary,
    fontSize: 13,
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: theme.colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInnerBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.textPrimary,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  retakeBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeBtnText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmBtnText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
