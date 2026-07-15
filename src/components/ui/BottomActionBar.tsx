import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';

interface BottomActionBarProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
}

export const BottomActionBar = ({ children, style, noPadding = false }: BottomActionBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        !noPadding && { paddingBottom: Math.max(insets.bottom, 16) },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    paddingTop: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
});
