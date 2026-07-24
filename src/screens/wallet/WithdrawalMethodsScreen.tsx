import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

const INITIAL_METHODS = [
  { id: 'wm_bank1', type: 'bank', icon: 'bank', title: 'HDFC Bank', sub: 'Account ending in 4242', isVerified: true },
  { id: 'wm_upi1', type: 'upi', icon: 'qrcode', title: 'UPI ID', sub: 'shlok@okicici', isVerified: true },
];

export const WithdrawalMethodsScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const route = useRoute<any>();
  const [methods, setMethods] = useState(INITIAL_METHODS);
  const [upiModalVisible, setUpiModalVisible] = useState(false);
  const [newUpiId, setNewUpiId] = useState('');

  const currentSelectionId = route.params?.currentId;

  useEffect(() => {
    if (route.params?.newMethod) {
      const newMethod = route.params.newMethod;
      let updatedMethods = [...methods];
      updatedMethods.unshift(newMethod);
      setMethods(updatedMethods);
      navigation.setParams({ newMethod: undefined });
    }
  }, [route.params?.newMethod]);

  const handleMethodPress = (method: any) => {
    // Return selected method to WithdrawMoneyScreen
    navigation.navigate('WithdrawMoneyScreen', { selectedMethod: method });
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
        'Remove Payout Method',
        'Are you sure you want to remove ' + title + '?',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Remove', style: 'destructive', onPress: () => {
                setMethods(prev => prev.filter(m => m.id !== id));
            }}
        ]
    );
  };

  const handleAddUpi = () => {
    if (!newUpiId.includes('@') || newUpiId.length < 5) return;
    const upiMethod = {
        id: 'wm_upi_' + Date.now(),
        type: 'upi',
        icon: 'qrcode',
        title: 'UPI ID',
        sub: newUpiId.toLowerCase(),
        isVerified: true
    };
    let updatedMethods = [...methods];
    updatedMethods.unshift(upiMethod);
    setMethods(updatedMethods);
    setNewUpiId('');
    setUpiModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Withdrawal Method</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.infoBanner}>
            <Icon name="information-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>Withdrawals to UPI are typically instant. Bank transfers may take 1-3 business days.</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.sectionTitle}>SAVED METHODS</Text>
            
            {methods.length === 0 ? (
                <Text style={styles.emptyText}>No saved withdrawal methods.</Text>
            ) : null}

            {methods.map((wm, index) => {
                const isSelected = currentSelectionId === wm.id;
                return (
                    <TouchableOpacity 
                        key={wm.id} 
                        style={[styles.methodRow, index !== methods.length - 1 ? styles.methodBorder : null, isSelected ? styles.methodSelected : null]}
                        activeOpacity={0.8}
                        onPress={() => handleMethodPress(wm)}
                    >
                        <View style={[styles.methodIconWrap, isSelected ? styles.methodIconWrapActive : null]}>
                            <Icon name={wm.icon} size={22} color={isSelected ? theme.colors.primary : theme.colors.textSecondary} />
                        </View>
                        <View style={styles.methodMeta}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, paddingRight: 4}}>
                                <Text style={[styles.methodTitle, {flexShrink: 1}]} numberOfLines={1}>{wm.title}</Text>
                                {wm.isVerified ? (
                                    <View style={styles.verifiedBadge}>
                                        <Icon name="check-decagram" size={12} color={theme.colors.success} />
                                        <Text style={styles.verifiedBadgeText}>Verified</Text>
                                    </View>
                                ) : null}
                            </View>
                            <Text style={styles.methodSub}>{wm.sub}</Text>
                        </View>
                        
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                            <TouchableOpacity 
                                style={styles.deleteBtn} 
                                onPress={() => handleDelete(wm.id, wm.title)}
                                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            >
                                <Icon name="trash-can-outline" size={18} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                            <View style={[styles.radioOuter, isSelected ? styles.radioOuterSelected : null]}>
                                {isSelected ? <View style={styles.radioInner} /> : null}
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}

            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={styles.addMethodRow} 
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('AddBankAccountScreen')}
                >
                    <View style={styles.addIconWrap}>
                        <Icon name="bank-plus" size={22} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.addMethodText}>Add Bank Account</Text>
                    <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.addMethodRow, { borderTopWidth: 0, paddingTop: 12, marginTop: 4 }]} 
                    activeOpacity={0.7}
                    onPress={() => setUpiModalVisible(true)}
                >
                    <View style={styles.addIconWrap}>
                        <Icon name="at" size={22} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.addMethodText}>Add UPI ID</Text>
                    <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
            </View>
        </View>

      </ScrollView>

      <Modal visible={upiModalVisible} transparent animationType="slide" onRequestClose={() => setUpiModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Add UPI ID for Payouts</Text>
                    <TouchableOpacity onPress={() => setUpiModalVisible(false)} hitSlop={{top:10, bottom:10, left:10, right:10}}>
                        <Icon name="close" size={24} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.modalLabel}>Enter your UPI ID</Text>
                <View style={styles.inputWrap}>
                    <TextInput 
                        style={styles.upiInput}
                        placeholder="e.g. name@okhdfcbank"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={newUpiId}
                        onChangeText={setNewUpiId}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Icon name="check-decagram" size={20} color={newUpiId.includes('@') && newUpiId.length > 4 ? theme.colors.success : theme.colors.border} style={{position: 'absolute', right: 16}} />
                </View>

                <TouchableOpacity 
                    style={[styles.verifyBtn, (!newUpiId.includes('@') || newUpiId.length < 5) ? {opacity: 0.5} : null]}
                    activeOpacity={0.8}
                    onPress={handleAddUpi}
                >
                    <Text style={styles.verifyBtnText}>Verify & Save</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  scrollContent: { padding: 16, paddingBottom: 40, gap: 16 },
  infoBanner: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: 'rgba(212, 175, 55, 0.05)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)' },
  infoText: { flex: 1, fontSize: 12, color: theme.colors.textSecondary, lineHeight: 18 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: theme.colors.border },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 16 },
  emptyText: { fontSize: 13, color: theme.colors.textSecondary, fontStyle: 'italic', marginBottom: 16 },
  methodRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 14, borderRadius: 12, paddingHorizontal: 8 },
  methodBorder: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  methodSelected: { backgroundColor: 'rgba(255,255,255,0.03)' },
  methodIconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  methodIconWrapActive: { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.3)', borderWidth: 1 },
  methodMeta: { flex: 1 },
  methodTitle: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary },
  methodSub: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 100, gap: 4 },
  verifiedBadgeText: { fontSize: 9, fontWeight: 'bold', color: theme.colors.success, textTransform: 'uppercase' },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: theme.colors.textSecondary, justifyContent: 'center', alignItems: 'center' },
  radioOuterSelected: { borderColor: theme.colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary },
  deleteBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16 },
  actionsContainer: { paddingTop: 8, marginTop: 8, borderTopWidth: 1, borderTopColor: theme.colors.border },
  addMethodRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 8 },
  addIconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(212, 175, 55, 0.05)', borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)', justifyContent: 'center', alignItems: 'center' },
  addMethodText: { flex: 1, fontSize: 15, fontWeight: '600', color: theme.colors.primary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: theme.colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  modalLabel: { fontSize: 12, fontWeight: '500', color: theme.colors.textSecondary, marginBottom: 8 },
  inputWrap: { justifyContent: 'center', marginBottom: 24 },
  upiInput: { backgroundColor: theme.colors.background, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, color: theme.colors.textPrimary, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, paddingRight: 48 },
  verifyBtn: { backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  verifyBtnText: { color: theme.colors.surface, fontSize: 16, fontWeight: 'bold' }
});
