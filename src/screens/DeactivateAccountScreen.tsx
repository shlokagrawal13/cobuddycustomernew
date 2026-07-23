import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

export const DeactivateAccountScreen = () => {
  const navigation = useNavigation<any>();

  const handleDeactivate = () => {
      Alert.alert(
          'Deactivate Account',
          'Are you sure you want to deactivate your account? You will be logged out, and your profile will be hidden.',
          [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Yes, Deactivate', style: 'destructive', onPress: () => {
                  Alert.alert('Account Deactivated', 'Your account has been deactivated successfully. You can reactivate by logging in again.', [{ text: 'OK' }]);
              }}
          ]
      );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deactivate Account</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.iconWrapper}>
            <Icon name="account-off-outline" size={64} color={theme.colors.primary} />
        </View>

        <Text style={styles.title}>Take a break from CoBuddy</Text>
        <Text style={styles.subtitle}>
            Deactivating your account is temporary. Your profile, photos, and reviews will be hidden from other users.
        </Text>

        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.iconBox}>
                    <Icon name="eye-off-outline" size={20} color={theme.colors.textPrimary} />
                </View>
                <View style={styles.meta}>
                    <Text style={styles.rowTitle}>Profile hidden</Text>
                    <Text style={styles.rowSub}>No one will be able to see your profile or book you.</Text>
                </View>
            </View>
            
            <View style={styles.divider} />

            <View style={styles.row}>
                <View style={styles.iconBox}>
                    <Icon name="calendar-clock-outline" size={20} color={theme.colors.textPrimary} />
                </View>
                <View style={styles.meta}>
                    <Text style={styles.rowTitle}>Pending bookings</Text>
                    <Text style={styles.rowSub}>Any active or upcoming bookings will remain active. You must complete or cancel them.</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
                <View style={styles.iconBox}>
                    <Icon name="login-variant" size={20} color={theme.colors.textPrimary} />
                </View>
                <View style={styles.meta}>
                    <Text style={styles.rowTitle}>Easy reactivation</Text>
                    <Text style={styles.rowSub}>Simply log back in at any time to automatically reactivate your account.</Text>
                </View>
            </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={handleDeactivate}>
              <Text style={styles.actionBtnText}>Deactivate My Account</Text>
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  scrollContent: { padding: 24, paddingBottom: 40 },
  
  iconWrapper: { alignSelf: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.textPrimary, textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: 32 },

  card: { backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginVertical: 8 },
  iconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  meta: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 4 },
  rowSub: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.border, marginVertical: 12, marginLeft: 52 },

  footer: { padding: 24, paddingBottom: 32, borderTopWidth: 1, borderTopColor: theme.colors.border, backgroundColor: theme.colors.background },
  actionBtn: { backgroundColor: theme.colors.error, paddingVertical: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: theme.colors.error, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  actionBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
