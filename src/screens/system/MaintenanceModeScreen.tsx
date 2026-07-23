import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const MaintenanceModeScreen = () => {
  const { t } = useTranslation(['system']);

  const handleStatusCheck = () => {
    Linking.openURL('https://status.cobuddy.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="hammer-wrench" size={72} color={theme.colors.warning} />
        </View>
        
        <Text style={styles.title}>Under Maintenance</Text>
        <Text style={styles.message}>
          We're currently undergoing scheduled maintenance to improve your experience. Our team is working hard to bring the app back online shortly.
        </Text>
        
        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>Expected completion:</Text>
          <Text style={styles.timeValue}>~ 2 Hours</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleStatusCheck}
        >
          <Text style={styles.secondaryButtonText}>Check System Status</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  timeBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  timeLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  timeValue: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 24,
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
