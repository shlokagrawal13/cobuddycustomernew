import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';

export const WelcomeScreen = () => {
  const { t } = useTranslation(['auth']);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CoBuddy</Text>
        <Text style={styles.subtitle}>{t('welcome', 'Verified Social Experiences')}</Text>
      </View>
      <View style={styles.footer}>
        <Button title={t('login', 'Continue with Phone')} onPress={() => navigation.navigate('PhoneLoginScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.h1,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.body,
  },
  footer: {
    paddingBottom: 24,
  }
});
