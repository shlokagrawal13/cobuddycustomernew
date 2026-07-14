import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';

const INTERESTS = [
  'Movies', 'Music', 'Travel', 'Sports', 'Gaming',
  'Food', 'Art', 'Reading', 'Photography', 'Fitness',
  'Technology', 'Fashion', 'History', 'Nature'
];

export const InterestSelectionScreen = ({ navigation }: any) => {
  const { t } = useTranslation(['onboarding']);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelected(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('selectInterests', 'What are your interests?')}</Text>
      <Text style={styles.subtitle}>{t('selectInterestsSub', 'Choose at least 3 to find better matches.')}</Text>
      
      <ScrollView contentContainerStyle={styles.grid}>
        {INTERESTS.map(interest => {
          const isSelected = selected.includes(interest);
          return (
            <TouchableOpacity 
              key={interest} 
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => toggleInterest(interest)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {interest}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title={t('continue', 'Continue')} 
          disabled={selected.length < 3}
          onPress={() => navigation.navigate('SafetyTutorialScreen')} 
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
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borders.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
  },
  chipTextSelected: {
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: theme.spacing.md,
  }
});
