import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';

export const SafetyTutorialScreen = ({ navigation }: any) => {
  const { t } = useTranslation(['onboarding']);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('safetyFirst', 'Your Safety Matters')}</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>1. Meet in Public</Text>
          <Text style={styles.cardText}>Always plan your first few meetings in busy, public places.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>2. Trusted Contacts</Text>
          <Text style={styles.cardText}>Share your live location and meeting details with friends.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. Verify Profiles</Text>
          <Text style={styles.cardText}>Look for the gold verified badge to ensure they are who they say they are.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title={t('understood', 'I Understand')} 
          onPress={() => navigation.navigate('TrustedContactsScreen')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes.h2,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.md,
    marginBottom: theme.spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  cardText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    paddingVertical: theme.spacing.md,
  }
});
