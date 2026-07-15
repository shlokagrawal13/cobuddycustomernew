import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

export const ArrivalCheckInScreen = () => {
  const { t } = useTranslation(['onboarding']);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('ArrivalCheckInScreen', 'ArrivalCheckInScreen Placeholder')}</Text>
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
