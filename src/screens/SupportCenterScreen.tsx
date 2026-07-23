import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const MOCK_TICKETS = [
  { id: 'TKT-8921', subject: 'Refund Request for Booking #4412', status: 'Open', date: '2 hours ago', category: 'Payment' },
  { id: 'TKT-8804', subject: 'Report: Inappropriate behavior', status: 'In Progress', date: 'Yesterday', category: 'Safety' },
  { id: 'TKT-7122', subject: 'How do I change my phone number?', status: 'Closed', date: '12 May, 2026', category: 'Account' }
];

export const SupportCenterScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'Active' | 'Closed'>('Active');

  const filteredTickets = MOCK_TICKETS.filter(t => 
    activeTab === 'Active' ? (t.status === 'Open' || t.status === 'In Progress') : t.status === 'Closed'
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return theme.colors.error;
      case 'In Progress': return theme.colors.primary;
      case 'Closed': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'Payment': return 'credit-card-outline';
      case 'Safety': return 'shield-alert-outline';
      case 'Account': return 'account-cog-outline';
      default: return 'help-circle-outline';
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support Tickets</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('HelpCenterScreen')}>
          <Icon name="help-circle-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Active' && styles.activeTab]}
          onPress={() => setActiveTab('Active')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Closed' && styles.activeTab]}
          onPress={() => setActiveTab('Closed')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'Closed' && styles.activeTabText]}>Closed</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredTickets.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="ticket-confirmation-outline" size={48} color={theme.colors.textSecondary} style={{opacity: 0.5, marginBottom: 16}} />
            <Text style={styles.emptyTitle}>No {activeTab.toLowerCase()} tickets</Text>
            <Text style={styles.emptySub}>You don't have any support tickets in this category right now.</Text>
          </View>
        ) : (
          <View style={styles.ticketList}>
            {filteredTickets.map(ticket => (
              <TouchableOpacity 
                key={ticket.id} 
                style={styles.ticketCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('SupportTicketDetailScreen', { ticketId: ticket.id })}
              >
                <View style={styles.ticketHeader}>
                  <View style={styles.ticketMeta}>
                    <Text style={styles.ticketId}>{ticket.id}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.ticketDate}>{ticket.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(ticket.status)}15` }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(ticket.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>{ticket.status}</Text>
                  </View>
                </View>

                <View style={styles.ticketBody}>
                  <View style={styles.iconBox}>
                    <Icon name={getCategoryIcon(ticket.category)} size={20} color={theme.colors.textSecondary} />
                  </View>
                  <Text style={styles.ticketSubject} numberOfLines={2}>{ticket.subject}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CreateSupportTicketScreen')}
      >
        <Icon name="plus" size={24} color={theme.colors.background} />
        <Text style={styles.fabText}>New Ticket</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: theme.colors.primary },
  tabText: { fontSize: 15, fontWeight: '600', color: theme.colors.textSecondary },
  activeTabText: { color: theme.colors.primary },

  scrollContent: { padding: 16, paddingBottom: 100 },
  
  ticketList: { gap: 12 },
  ticketCard: { backgroundColor: theme.colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.colors.border },
  ticketHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  ticketMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ticketId: { fontSize: 12, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 0.5 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: theme.colors.border },
  ticketDate: { fontSize: 12, color: theme.colors.textSecondary },
  
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: 'bold' },

  ticketBody: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  iconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  ticketSubject: { flex: 1, fontSize: 15, fontWeight: '500', color: theme.colors.textPrimary, lineHeight: 22 },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 8 },
  emptySub: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', paddingHorizontal: 40, lineHeight: 20 },

  fab: { position: 'absolute', bottom: 24, right: 24, backgroundColor: theme.colors.primary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 28, gap: 8, shadowColor: theme.colors.primary, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  fabText: { fontSize: 15, fontWeight: 'bold', color: theme.colors.background }
});
