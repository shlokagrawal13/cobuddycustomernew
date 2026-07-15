import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface OnboardingHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  centerLabel?: string;
  step?: string;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  rightNode?: React.ReactNode;
  style?: ViewStyle;
}

export const OnboardingHeader = ({
  showBack = false,
  onBack,
  centerLabel,
  step,
  showProgress = false,
  currentStep = 1,
  totalSteps = 7,
  rightNode,
  style,
}: OnboardingHeaderProps) => {
  const progressPct = Math.min(1, currentStep / totalSteps);

  return (
    <View style={[styles.wrapper, style]}>
      {/* Row */}
      <View style={styles.container}>
        {/* Left */}
        <View style={styles.side}>
          {showBack ? (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={onBack}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              activeOpacity={0.7}>
              <Icon name="arrow-left" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.backPlaceholder} />
          )}
        </View>

        {/* Center */}
        <View style={styles.center}>
          {centerLabel ? (
            <Text style={styles.centerLabel} numberOfLines={1}>
              {centerLabel}
            </Text>
          ) : null}
        </View>

        {/* Right */}
        <View style={[styles.side, styles.rightSide]}>
          {rightNode ?? (
            step ? (
              <Text style={styles.stepLabel}>{step}</Text>
            ) : (
              <View style={styles.backPlaceholder} />
            )
          )}
        </View>
      </View>

      {/* Progress */}
      {showProgress && (
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct * 100}%` }]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  side: {
    width: 56,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPlaceholder: { width: 40, height: 40 },
  centerLabel: {
    fontSize: theme.typography.sizes.body,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    letterSpacing: 0.3,
  },
  stepLabel: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
});
