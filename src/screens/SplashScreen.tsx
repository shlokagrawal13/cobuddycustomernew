import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

export const SplashScreen = () => {
  const { t } = useTranslation(['common']);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('SplashScreen', 'SplashScreen Placeholder')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.h3,
  },
});
