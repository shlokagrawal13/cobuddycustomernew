import { useSmartNavigation } from '../../hooks/useSmartNavigation';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

const ALL_TRANSACTIONS = [
  { id: 'tx_001', icon: 'wallet-plus', label: 'Money Added', category: 'Money Added', date: 'Today, 2:30 PM', amount: '+ ₹1,000', positive: true, status: 'Successful' },
  { id: 'tx_002', icon: 'account-clock', label: 'Session with Maya', category: 'Spent', date: 'Yesterday, 8:15 PM', amount: '- ₹450', positive: false, status: 'Successful' },
  { id: 'tx_003', icon: 'arrow-u-left-top', label: 'Refund: Session Cancelled', category: 'Refunds', date: 'Oct 18, 10:00 AM', amount: '+ ₹200', positive: true, status: 'Refunded' },
  { id: 'tx_004', icon: 'wallet-plus', label: 'Money Added', category: 'Money Added', date: 'Oct 10, 1:15 PM', amount: '+ ₹2,000', positive: true, status: 'Successful' },
  { id: 'tx_005', icon: 'account-clock', label: 'Session with Rahul', category: 'Spent', date: 'Oct 05, 5:00 PM', amount: '- ₹600', positive: false, status: 'Pending' },
];

const FILTERS = ['All', 'Money Added', 'Spent', 'Refunds'];

export const TransactionHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? ALL_TRANSACTIONS
    : ALL_TRANSACTIONS.filter(t => t.category === activeFilter);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
            <Icon name="download" size={22} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTERS.map(f => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]} 
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
           <View style={styles.emptyState}>
             <Icon name="receipt" size={48} color={theme.colors.textSecondary} />
             <Text style={styles.emptyText}>No transactions found.</Text>
           </View>
        ) : (
          filtered.map((tx, index) => (
            <TouchableOpacity 
              key={tx.id} 
              style={[styles.txItem, index !== filtered.length - 1 && styles.txBorder]}
              onPress={() => navigation.navigate('TransactionDetailScreen', { transactionId: tx.id })}
              activeOpacity={0.7}
            >
              <View style={[styles.txIconWrap, tx.positive ? styles.txIconWrapPos : styles.txIconWrapNeg, tx.status === 'Refunded' && styles.txIconWrapRefund]}>
                <Icon name={tx.icon} size={20} color={tx.status === 'Refunded' ? theme.colors.warning : tx.positive ? theme.colors.success : theme.colors.error} />
              </View>
              <View style={styles.txMeta}>
                <Text style={styles.txTitle} numberOfLines={1}>{tx.label}</Text>
                <Text style={styles.txSub}>{tx.date}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[styles.txAmount, tx.positive ? styles.txAmountPos : styles.txAmountNeg, tx.status === 'Refunded' && styles.txAmountRefund]}>
                  {tx.amount}
                </Text>
                <View style={styles.statusRow}>
                  <Icon 
                    name={tx.status === 'Successful' || tx.status === 'Refunded' ? 'check-circle' : 'clock-outline'} 
                    size={12} 
                    color={tx.status === 'Pending' ? theme.colors.warning : theme.colors.success} 
                  />
                  <Text style={[styles.statusText, {color: tx.status === 'Pending' ? theme.colors.warning : theme.colors.success}]}>
                    {tx.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  filterContainer: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  filterScroll: { paddingHorizontal: 16, gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
  filterChipActive: { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.4)' },
  filterText: { fontSize: 13, color: theme.colors.textSecondary, fontWeight: '500' },
  filterTextActive: { color: theme.colors.primary, fontWeight: '600' },

  scrollContent: { padding: 16, paddingBottom: 40 },
  
  txItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 14 },
  txBorder: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  txIconWrap: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  txIconWrapPos: { backgroundColor: 'rgba(16, 185, 129, 0.1)' }, 
  txIconWrapNeg: { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
  txIconWrapRefund: { backgroundColor: 'rgba(245, 158, 11, 0.1)' },
  
  txMeta: { flex: 1 },
  txTitle: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  txSub: { fontSize: 12, color: theme.colors.textSecondary },
  
  txRight: { alignItems: 'flex-end', gap: 4 },
  txAmount: { fontSize: 15, fontWeight: 'bold' },
  txAmountPos: { color: theme.colors.success },
  txAmountNeg: { color: theme.colors.textPrimary },
  txAmountRefund: { color: theme.colors.warning },
  
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusText: { fontSize: 11, fontWeight: '500' },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 15, color: theme.colors.textSecondary }
});
