import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { theme } from '../../theme';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  autoFocus?: boolean;
  error?: boolean;
}

export const OTPInput = ({
  length = 4,
  value,
  onChange,
  autoFocus = true,
  error = false,
}: OTPInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);

  const digits = value.split('');

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => inputRef.current?.focus()}
      style={styles.container}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={text => {
          const cleaned = text.replace(/\D/g, '').slice(0, length);
          onChange(cleaned);
        }}
        keyboardType="number-pad"
        maxLength={length}
        caretHidden
        style={styles.hiddenInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <View style={styles.boxes}>
        {Array.from({ length }).map((_, i) => {
          const isActive = isFocused && digits.length === i;
          const isFilled = digits[i] !== undefined;
          return (
            <View
              key={i}
              style={[
                styles.box,
                isFilled && styles.boxFilled,
                isActive && styles.boxActive,
                error && styles.boxError,
              ]}>
              {isFilled ? (
                <Text style={styles.digit}>{digits[i]}</Text>
              ) : isActive ? (
                <View style={styles.cursor} />
              ) : null}
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignSelf: 'stretch' },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  boxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  box: {
    flex: 1,
    aspectRatio: 0.85,
    maxWidth: 54,
    height: 60,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFilled: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  boxActive: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  boxError: {
    borderColor: theme.colors.error,
  },
  digit: {
    fontSize: 24,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
  },
});
