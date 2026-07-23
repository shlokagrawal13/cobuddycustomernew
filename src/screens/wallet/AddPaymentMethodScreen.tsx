import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const AddPaymentMethodScreen = () => {
  const navigation = useNavigation<any>();
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const maskedDisplay = () => {
    const raw = cardNumber.replace(/\s/g, '');
    if (raw.length <= 4) return cardNumber;
    return raw.slice(0, 4).replace(/./g, '*') + ' **** **** ' + raw.slice(-4).padStart(4, '*');
  };

  const handleSave = () => {
    if (cardNumber.length < 16) {
        Alert.alert('Error', 'Please enter a valid 16-digit card number.');
        return;
    }
    
    // Create new card object to pass back
    const raw = cardNumber.replace(/\s/g, '');
    const newCard = {
        id: 'pm_card_' + Date.now(),
        icon: 'credit-card-outline',
        title: 'Card ending in ' + raw.slice(-4),
        sub: 'Expires ' + (expiry || '12/29'),
        isDefault: isDefault
    };

    Alert.alert('Success', 'Your card has been securely added to your wallet.', [
        { text: 'OK', onPress: () => {
            navigation.navigate('PaymentMethodsScreen', { newMethod: newCard });
        }}
    ]);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            <View style={styles.cardPreview}>
                <View style={styles.cardPreviewTop}>
                    <Icon name="credit-card-chip-outline" size={32} color={theme.colors.textPrimary} />
                    <Icon name="contactless-payment" size={24} color={theme.colors.textPrimary} style={{opacity: 0.8}} />
                </View>
                <Text style={styles.cardNumberText}>
                    {cardNumber.trim() ? maskedDisplay() : '**** **** **** ****'}
                </Text>
                <View style={styles.cardPreviewBottom}>
                    <View>
                        <Text style={styles.cardPreviewLabel}>CARDHOLDER</Text>
                        <Text style={styles.cardPreviewValue}>{cardHolder.trim() || 'YOUR NAME'}</Text>
                    </View>
                    <View>
                        <Text style={styles.cardPreviewLabel}>EXPIRY</Text>
                        <Text style={styles.cardPreviewValue}>{expiry || 'MM/YY'}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>CARD DETAILS</Text>
                
                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Cardholder Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={cardHolder}
                        onChangeText={setCardHolder}
                        placeholder="Name as it appears on card"
                        placeholderTextColor={theme.colors.textSecondary}
                        autoCapitalize="words"
                    />
                </View>

                <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Card Number</Text>
                    <View style={styles.inputIconWrapper}>
                        <TextInput 
                            style={[styles.input, { paddingRight: 40 }]}
                            value={cardNumber}
                            onChangeText={v => setCardNumber(formatCard(v))}
                            placeholder="0000 0000 0000 0000"
                            placeholderTextColor={theme.colors.textSecondary}
                            keyboardType="number-pad"
                            maxLength={19}
                        />
                        <Icon name="lock" size={18} color={theme.colors.textSecondary} style={styles.inputInnerIcon} />
                    </View>
                </View>

                <View style={styles.rowInputs}>
                    <View style={[styles.inputBlock, { flex: 1 }]}>
                        <Text style={styles.inputLabel}>Expiry</Text>
                        <TextInput 
                            style={styles.input}
                            value={expiry}
                            onChangeText={v => setExpiry(formatExpiry(v))}
                            placeholder="MM/YY"
                            placeholderTextColor={theme.colors.textSecondary}
                            keyboardType="number-pad"
                            maxLength={5}
                        />
                    </View>
                    <View style={[styles.inputBlock, { flex: 1 }]}>
                        <Text style={styles.inputLabel}>CVV</Text>
                        <TextInput 
                            style={styles.input}
                            value={cvv}
                            onChangeText={v => setCvv(v.replace(/\D/g, '').slice(0, 4))}
                            placeholder="123"
                            placeholderTextColor={theme.colors.textSecondary}
                            keyboardType="number-pad"
                            secureTextEntry
                            maxLength={4}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.formSection}>
                <View style={styles.defaultRow}>
                    <View style={styles.defaultMeta}>
                        <Text style={styles.defaultTitle}>Set as Default Card</Text>
                        <Text style={styles.defaultSub}>Use this card automatically for session bookings</Text>
                    </View>
                    <Switch
                        value={isDefault}
                        onValueChange={setIsDefault}
                        trackColor={{ false: theme.colors.surface, true: 'rgba(212, 175, 55, 0.4)' }}
                        thumbColor={isDefault ? theme.colors.primary : theme.colors.textSecondary}
                    />
                </View>
            </View>

            <View style={styles.pciNote}>
                <Icon name="security" size={16} color={theme.colors.primary} />
                <Text style={styles.pciNoteText}>Card data is never stored on our servers. Information is tokenised by our PCI-DSS Level 1 payment partner.</Text>
            </View>

            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
                <Icon name="lock-check" size={20} color={theme.colors.surface} />
                <Text style={styles.saveBtnText}>Save Card Securely</Text>
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
  cardPreview: { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)', marginBottom: 24, minHeight: 200, justifyContent: 'space-between' },
  cardPreviewTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardNumberText: { fontSize: 22, fontWeight: 'bold', color: theme.colors.textPrimary, letterSpacing: 4, marginTop: 24 },
  cardPreviewBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  cardPreviewLabel: { fontSize: 9, color: theme.colors.textSecondary, letterSpacing: 1.5, marginBottom: 4 },
  cardPreviewValue: { fontSize: 14, fontWeight: 'bold', color: theme.colors.textPrimary, textTransform: 'uppercase' },
  formSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 16 },
  inputBlock: { marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: '500', color: theme.colors.textSecondary, marginBottom: 8 },
  input: { backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: theme.colors.textPrimary },
  inputIconWrapper: { position: 'relative' },
  inputInnerIcon: { position: 'absolute', right: 16, top: 16 },
  rowInputs: { flexDirection: 'row', gap: 16 },
  defaultRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.colors.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  defaultMeta: { flex: 1, paddingRight: 16 },
  defaultTitle: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  defaultSub: { fontSize: 12, color: theme.colors.textSecondary },
  pciNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 16, backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)', marginBottom: 24 },
  pciNoteText: { flex: 1, fontSize: 11, color: theme.colors.textSecondary, lineHeight: 16 },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 16 },
  saveBtnText: { fontSize: 15, fontWeight: 'bold', color: theme.colors.surface },
});
