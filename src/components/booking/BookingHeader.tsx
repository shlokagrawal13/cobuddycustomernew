import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { useTranslation } from 'react-i18next';

export interface BookingHeaderProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  style?: ViewStyle;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({ step, totalSteps, onBack, style }) => {
  const { t } = useTranslation('common');
  
  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={onBack} 
        accessibilityRole="button" 
        accessibilityLabel={t('a11yGoBack', 'Go back')}
      >
        <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>
          {t('stepCounter', 'Step {{step}} of {{totalSteps}}', { step, totalSteps })}
        </Text>
        
        {/* Simple Progress Bar */}
        <View style={styles.progressTrack} accessibilityRole="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={step}>
          <View style={[styles.progressFill, { width: `${(step / totalSteps) * 100}%` }]} />
        </View>
      </View>
      
      <View style={{ width: 44 }} /> {/* Spacer to center title */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    width: '60%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
});
