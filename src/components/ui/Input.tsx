import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../../theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: Props) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput 
        style={[styles.input, error && styles.inputError]} 
        placeholderTextColor={theme.colors.textSecondary}
        {...props} 
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    marginBottom: 6,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontSize: theme.typography.sizes.body,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.caption,
    marginTop: 4,
  }
});