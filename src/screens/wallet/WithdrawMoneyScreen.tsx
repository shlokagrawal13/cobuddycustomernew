import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

const DEFAULT_PAYOUT = {
    id: 'wm_bank1',
    type: 'bank',
    title: 'HDFC Bank',
    sub: 'Account ending in 4242',
    icon: 'bank'
};

export const WithdrawMoneyScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(DEFAULT_PAYOUT);
  
  const MAX_WITHDRAWABLE = 4500;

  useEffect(() => {
    if (route.params?.selectedMethod) {
        setSelectedMethod(route.params.selectedMethod);
        navigation.setParams({ selectedMethod: undefined });
    }
  }, [route.params?.selectedMethod]);

  const handleWithdraw = () => {
    const val = parseInt(amount);
    if (!val || val < 100) {
        Alert.alert('Error', 'Minimum withdrawal amount is ₹100.');
        return;
    }
    if (val > MAX_WITHDRAWABLE) {
        Alert.alert('Error', 'Amount exceeds your withdrawable balance.');
        return;
    }

    const destination = selectedMethod.type === 'upi' ? 'UPI ID (' + selectedMethod.sub + ')' : selectedMethod.title + ' ' + selectedMethod.sub.toLowerCase();
    
    Alert.alert(
        'Processing Withdrawal',
        '₹' + val + ' is being transferred to your ' + destination + '. It may take up to 2-3 business days to reflect.',
        [{ text: 'Got it', onPress: () => navigation.navigate('TransactionHistoryScreen') }]
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdraw Money</Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            <View style={styles.balanceInfoBox}>
                <Text style={styles.balanceInfoLabel}>WITHDRAWABLE BALANCE</Text>
                <Text style={styles.balanceInfoValue}>₹4,500</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.rupeeSymbol}>₹</Text>
                <TextInput 
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="number-pad"
                    maxLength={5}
                    autoFocus
                />
            </View>

            <View style={styles.quickSelect}>
                <TouchableOpacity style={styles.maxBtn} onPress={() => setAmount(MAX_WITHDRAWABLE.toString())}>
                    <Text style={styles.maxBtnText}>Withdraw Max (₹{MAX_WITHDRAWABLE})</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.helperText}>Minimum withdrawal is ₹100. No processing fees apply.</Text>

            <View style={styles.paymentCard}>
                <Text style={styles.sectionTitle}>TRANSFER TO</Text>
                
                <View style={styles.paymentRow}>
                    <View style={styles.paymentIconWrap}>
                        <Icon name={selectedMethod.icon} size={24} color={theme.colors.primary} />
                    </View>
                    <View style={styles.paymentMeta}>
                        <Text style={styles.paymentTitle}>{selectedMethod.title}</Text>
                        <Text style={styles.paymentSub}>{selectedMethod.sub}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.changeBtn} 
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('WithdrawalMethodsScreen', { currentId: selectedMethod.id })}
                    >
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBanner}>
                    <Icon name="clock-outline" size={16} color={theme.colors.primary} />
                    <View style={{flex: 1}}>
                        <Text style={styles.infoTitle}>Processing Time</Text>
                        <Text style={styles.infoSub}>{selectedMethod.type === 'upi' ? 'UPI transfers are usually instant, but can take up to 2 hours.' : 'Standard IMPS/NEFT transfer takes up to 2-3 business days.'}</Text>
                    </View>
                </View>
            </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
          <TouchableOpacity 
              style={[styles.proceedBtn, (!amount || parseInt(amount) < 100 || parseInt(amount) > MAX_WITHDRAWABLE) ? styles.proceedBtnDisabled : null]} 
              activeOpacity={0.8}
              onPress={handleWithdraw}
          >
              <Text style={styles.proceedText}>Withdraw ₹{amount || '0'}</Text>
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
  scrollContent: { padding: 20, paddingBottom: 40 },
  balanceInfoBox: { alignItems: 'center', marginBottom: 32 },
  balanceInfoLabel: { fontSize: 11, color: theme.colors.textSecondary, letterSpacing: 1, fontWeight: 'bold', marginBottom: 4 },
  balanceInfoValue: { fontSize: 16, color: theme.colors.primary, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  rupeeSymbol: { fontSize: 40, color: theme.colors.textPrimary, fontWeight: 'bold', marginRight: 8, marginTop: Platform.OS === 'ios' ? 0 : -4 },
  amountInput: { fontSize: 48, color: theme.colors.textPrimary, fontWeight: 'bold', minWidth: 60, textAlign: 'center', padding: 0 },
  quickSelect: { alignItems: 'center', marginBottom: 16 },
  maxBtn: { backgroundColor: 'rgba(212, 175, 55, 0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' },
  maxBtnText: { color: theme.colors.primary, fontSize: 12, fontWeight: 'bold' },
  helperText: { fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 40 },
  paymentCard: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: theme.colors.border },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 16 },
  paymentRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  paymentIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center' },
  paymentMeta: { flex: 1 },
  paymentTitle: { fontSize: 15, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 2 },
  paymentSub: { fontSize: 12, color: theme.colors.textSecondary },
  changeBtn: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: theme.colors.border },
  changeText: { fontSize: 12, fontWeight: 'bold', color: theme.colors.textPrimary },
  infoBanner: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: 'rgba(212, 175, 55, 0.05)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)' },
  infoTitle: { fontSize: 13, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 4 },
  infoSub: { fontSize: 11, color: theme.colors.textSecondary, lineHeight: 16 },
  footer: { padding: 20, paddingBottom: Platform.OS === 'ios' ? 34 : 20, borderTopWidth: 1, borderTopColor: theme.colors.border, backgroundColor: theme.colors.background },
  proceedBtn: { backgroundColor: theme.colors.primary, paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  proceedBtnDisabled: { opacity: 0.5 },
  proceedText: { fontSize: 16, fontWeight: 'bold', color: theme.colors.surface }
});
