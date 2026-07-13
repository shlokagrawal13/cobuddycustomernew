import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';

export const LocationPermissionScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconPlaceholder} />
        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.subtitle}>
          CoBuddy needs your location for arrival check-ins and safety monitoring during meetups. We don't share your live location with companions.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button title="Allow Location Access" onPress={() => navigation.navigate('NotificationPermissionScreen')} />
        <Button title="Not Now" variant="outline" onPress={() => navigation.navigate('NotificationPermissionScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 24 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 },
  iconPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.surface, marginBottom: 24 },
  title: { color: theme.colors.textPrimary, fontSize: theme.typography.sizes.h2, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  subtitle: { color: theme.colors.textSecondary, fontSize: theme.typography.sizes.body, textAlign: 'center', lineHeight: 24 },
  footer: { paddingBottom: 24 }
});
