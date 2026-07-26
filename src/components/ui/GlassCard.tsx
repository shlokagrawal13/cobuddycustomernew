import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glow?: boolean;
  variant?: 'default' | 'elevated' | 'outlined';
  accessible?: boolean;
  accessibilityRole?: 'none' | 'button' | 'link' | 'search' | 'image' | 'keyboardkey' | 'text' | 'adjustable' | 'imagebutton' | 'header' | 'summary';
  accessibilityLabel?: string;
}

export const GlassCard = ({
  children,
  style,
  glow = false,
  variant = 'default',
  accessible,
  accessibilityRole,
  accessibilityLabel,
}: GlassCardProps) => {
  return (
    <View
      style={[
        styles.base,
        variant === 'elevated' && styles.elevated,
        variant === 'outlined' && styles.outlined,
        glow && styles.glow,
        style,
      ]}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'rgba(11,13,26,0.6)', // matching surface color but translucent
    borderRadius: theme.borders.radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  elevated: {
    backgroundColor: theme.colors.surface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  outlined: {
    backgroundColor: 'rgba(20,20,15,0.6)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
  },
  glow: {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
});
