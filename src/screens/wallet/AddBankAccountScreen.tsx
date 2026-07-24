import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

export const AddBankAccountScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const [accName, setAccName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [reAccNumber, setReAccNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  const handleSave = () => {
    if (!accName.trim() || !accNumber || !reAccNumber || !ifsc) {
        Alert.alert('Error', 'Please fill all the details.');
        return;
    }
    if (accNumber !== reAccNumber) {
        Alert.alert('Error', 'Account numbers do not match.');
        return;
    }
    if (ifsc.length < 11) {
        Alert.alert('Error', 'Please enter a valid 11-digit IFSC code.');
        return;
    }
    
    const newBank = {
        id: 'wm_bank_' + Date.now(),
        type: 'bank',
        icon: 'bank',
        title: 'Verified Bank',
        sub: 'Account ending in ' + accNumber.slice(-4),
        isVerified: true
    };

    Alert.alert('Success', 'Bank account verified and added securely.', [
        { text: 'OK', onPress: () => {
            navigation.navigate('WithdrawalMethodsScreen', { newMethod: newBank });
        }}
    ]);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Bank Account</Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            <View style={styles.securityHero}>
                <View style={styles.securityIconWrap}>
                    <Icon name="bank-check" size={32} color={theme.colors.primary} />
                </View>
                <Text style={styles.securityTitle}>Secure Bank Linking</Text>
                <Text style={styles.securitySub}>We'll deposit a small amount (like ₹1) to instantly verify your account before saving.</Text>
            </View>

            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>ACCOUNT DETAILS</Text>
                
                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Account Holder Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={accName}
                        onChangeText={setAccName}
                        placeholder="As per bank records"
                        placeholderTextColor={theme.colors.textSecondary}
                        autoCapitalize="words"
                    />
                </View>

                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Account Number</Text>
                    <TextInput 
                        style={styles.input}
                        value={accNumber}
                        onChangeText={setAccNumber}
                        placeholder="000000000000"
                        placeholderTextColor={theme.colors.textSecondary}
                        keyboardType="number-pad"
                        secureTextEntry
                    />
                </View>

                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Re-enter Account Number</Text>
                    <TextInput 
                        style={styles.input}
                        value={reAccNumber}
                        onChangeText={setReAccNumber}
                        placeholder="000000000000"
                        placeholderTextColor={theme.colors.textSecondary}
                        keyboardType="number-pad"
                    />
                    {reAccNumber.length > 0 && accNumber !== reAccNumber && (
                        <Text style={styles.errorText}>Account numbers do not match</Text>
                    )}
                </View>

                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>IFSC Code</Text>
                    <TextInput 
                        style={styles.input}
                        value={ifsc}
                        onChangeText={v => setIfsc(v.toUpperCase())}
                        placeholder="e.g. HDFC0001234"
                        placeholderTextColor={theme.colors.textSecondary}
                        autoCapitalize="characters"
                        maxLength={11}
                    />
                </View>
            </View>

            <View style={styles.pciNote}>
                <Icon name="shield-check" size={16} color={theme.colors.success} />
                <Text style={styles.pciNoteText}>Your details are encrypted and securely sent directly to our banking partner.</Text>
            </View>

            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
                <Icon name="check-decagram" size={20} color={theme.colors.surface} />
                <Text style={styles.saveBtnText}>Verify & Save Account</Text>
            </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  securityHero: { alignItems: 'center', padding: 24, backgroundColor: 'rgba(212, 175, 55, 0.05)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)', marginBottom: 24 },
  securityIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  securityTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 8 },
  securitySub: { fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 18, paddingHorizontal: 20 },

  formSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 16 },
  
  inputBlock: { marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: '500', color: theme.colors.textSecondary, marginBottom: 8 },
  input: { backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: theme.colors.textPrimary, letterSpacing: 1 },
  errorText: { fontSize: 11, color: theme.colors.error, marginTop: 6, marginLeft: 4 },

  pciNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 16, backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)', marginBottom: 24 },
  pciNoteText: { flex: 1, fontSize: 11, color: theme.colors.textSecondary, lineHeight: 16 },

  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 16 },
  saveBtnText: { fontSize: 15, fontWeight: 'bold', color: theme.colors.surface },
});
