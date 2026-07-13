import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({ title, onPress, variant = 'primary', loading, disabled }: Props) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        disabled && styles.disabled
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? <ActivityIndicator color={variant === 'primary' ? theme.colors.background : theme.colors.primary} /> : (
        <Text style={[
          styles.text, 
          variant === 'outline' && styles.outlineText
        ]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 8,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: theme.colors.background,
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
  },
  outlineText: {
    color: theme.colors.textPrimary,
  }
});