import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/slices/authStore';

export const TrustedContactsScreen = () => {
  const { t } = useTranslation(['onboarding']);
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  
  const [contacts, setContacts] = useState([{ name: '', phone: '' }]);

  const addContact = () => {
    setContacts([...contacts, { name: '', phone: '' }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('trustedContacts', 'Trusted Contacts')}</Text>
      <Text style={styles.subtitle}>{t('trustedContactsSub', 'Add at least one trusted contact for emergencies.')}</Text>

      <ScrollView style={styles.content}>
        {contacts.map((contact, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Contact {index + 1}</Text>
            <TextInput 
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={theme.colors.textSecondary}
              value={contact.name}
              onChangeText={(text) => {
                const newContacts = [...contacts];
                newContacts[index].name = text;
                setContacts(newContacts);
              }}
            />
            <TextInput 
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="phone-pad"
              value={contact.phone}
              onChangeText={(text) => {
                const newContacts = [...contacts];
                newContacts[index].phone = text;
                setContacts(newContacts);
              }}
            />
          </View>
        ))}
        
        {contacts.length < 3 && (
          <TouchableOpacity onPress={addContact} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Another Contact</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title={t('finishOnboarding', 'Finish Onboarding')} 
          disabled={!contacts[0].name || !contacts[0].phone}
          onPress={completeOnboarding} 
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
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  addButton: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  addButtonText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.typography.sizes.body,
  },
  footer: {
    paddingVertical: theme.spacing.md,
  }
});
