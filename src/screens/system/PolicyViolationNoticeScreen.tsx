import { useSmartNavigation } from '../../hooks/useSmartNavigation';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const PolicyViolationNoticeScreen = () => {
  const { t } = useTranslation(['system']);
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <Icon name="alert-circle-outline" size={32} color={theme.colors.warning} />
        <Text style={styles.headerTitle}>Policy Violation Notice</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.dateText}>Issued on: Oct 24, 2026</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Violation Type: Off-App Payment Attempt</Text>
          <Text style={styles.cardMessage}>
            Our system detected an attempt to negotiate or request payments outside of the CoBuddy platform. This violates our Community Guidelines and compromises the safety and security of our ecosystem.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>WHY THIS MATTERS</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Icon name="shield-check" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.listText}>Payments on the app are secure and protected against fraud.</Text>
          </View>
          <View style={styles.listItem}>
            <Icon name="gavel" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.listText}>Off-app payments bypass our safety checks and dispute resolution systems.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>NEXT STEPS</Text>
        <Text style={styles.paragraph}>
          This is a formal warning. Please review our Community Guidelines. Repeated violations will result in permanent account suspension.
        </Text>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => smartGoBack()}
        >
          <Text style={styles.primaryButtonText}>I Understand</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('SafetySupportStack', { screen: 'SupportCenterScreen' })}
        >
          <Text style={styles.secondaryButtonText}>Submit Appeal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: 12,
  },
  scrollContent: {
    padding: 24,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)', // Warning tint
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.warning,
    marginBottom: 8,
  },
  cardMessage: {
    fontSize: 15,
    color: theme.colors.textPrimary,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 16,
    marginTop: 8,
  },
  list: {
    gap: 12,
    marginBottom: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.textPrimary,
    lineHeight: 22,
  },
  paragraph: {
    fontSize: 15,
    color: theme.colors.textPrimary,
    lineHeight: 22,
    marginBottom: 24,
  },
  footer: {
    padding: 24,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
