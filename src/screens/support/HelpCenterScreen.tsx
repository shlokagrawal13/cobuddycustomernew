import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

const CATEGORIES = [
  { id: '1', title: 'Bookings & Meetups', icon: 'calendar-check-outline' },
  { id: '2', title: 'Payments & Refunds', icon: 'credit-card-outline' },
  { id: '3', title: 'Trust & Safety', icon: 'shield-check-outline' },
  { id: '4', title: 'Account Settings', icon: 'account-cog-outline' }
];

const FAQS = [
  // Bookings & Meetups
  { id: 'f1', categoryId: '1', question: 'How do I cancel a booking?', answer: 'Go to your booking details and tap "Cancel Booking". Cancellations made 24 hours prior are fully refunded.' },
  { id: 'f2', categoryId: '1', question: 'What if a companion doesn\'t show up?', answer: 'If a companion is a no-show, please report it immediately. You will receive a full refund, and the companion\'s profile will be penalized.' },
  { id: 'f3', categoryId: '1', question: 'Can I reschedule my meetup?', answer: 'Yes, you can modify your booking time up to 12 hours before the meetup, provided the companion accepts the new schedule.' },
  { id: 'f4', categoryId: '1', question: 'Are there extra charges for overtime?', answer: 'Yes, if your session exceeds the booked time, you can negotiate an extension directly in the app and pay the difference.' },

  // Payments & Refunds
  { id: 'f5', categoryId: '2', question: 'How is my payment secured?', answer: 'We use bank-level AES-256 encryption. Your money is held securely in escrow until the session is successfully completed.' },
  { id: 'f6', categoryId: '2', question: 'When will I get my refund?', answer: 'Refunds are processed immediately by our system but may take 3-5 business days to reflect in your bank account depending on your bank.' },
  { id: 'f7', categoryId: '2', question: 'What payment methods do you accept?', answer: 'We accept all major Credit/Debit Cards, UPI, Net Banking, and popular mobile wallets.' },

  // Trust & Safety
  { id: 'f8', categoryId: '3', question: 'How does the SOS feature work?', answer: 'Tapping SOS immediately alerts your Trusted Contacts with your live location and notifies our 24/7 internal security team.' },
  { id: 'f9', categoryId: '3', question: 'Are the companions identity-verified?', answer: 'Yes! Look for the blue tick badge. This means they have completed a strict KYC process including Govt ID verification.' },
  { id: 'f10', categoryId: '3', question: 'Can I hide my profile?', answer: 'Yes, go to Safety Settings and enable "Incognito Mode". Your profile will only be visible to people you message.' },

  // Account Settings
  { id: 'f11', categoryId: '4', question: 'How do I change my phone number?', answer: 'Go to Profile > Settings Hub > Account Settings to update your registered phone number.' },
  { id: 'f12', categoryId: '4', question: 'How do I delete my account?', answer: 'You can delete your account from Profile > Settings Hub > Account Settings > Delete Account. Please note this action is permanent.' },
];

export const HelpCenterScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Dynamic filtering based on search text and selected category
  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? faq.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            {/* Search Banner */}
            <View style={styles.searchSection}>
                <Text style={styles.greeting}>Hi there, how can we help?</Text>
                <View style={styles.searchBox}>
                    <Icon name="magnify" size={22} color={theme.colors.textSecondary} />
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Search for help, FAQs..."
                        placeholderTextColor={theme.colors.textSecondary}
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            if (expandedFaq) setExpandedFaq(null);
                        }}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Icon name="close-circle" size={20} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Categories Grid */}
            <Text style={styles.sectionTitle}>BROWSE TOPICS</Text>
            <View style={styles.grid}>
                {CATEGORIES.map(cat => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                        <TouchableOpacity 
                            key={cat.id} 
                            style={[styles.gridItem, isSelected && styles.gridItemActive]} 
                            activeOpacity={0.7}
                            onPress={() => {
                                setSelectedCategory(isSelected ? null : cat.id);
                                setExpandedFaq(null);
                            }}
                        >
                            <View style={[styles.iconCircle, isSelected && styles.iconCircleActive]}>
                                <Icon name={cat.icon} size={24} color={isSelected ? theme.colors.background : theme.colors.primary} />
                            </View>
                            <Text style={[styles.gridTitle, isSelected && styles.gridTitleActive]}>{cat.title}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* FAQs */}
            <Text style={[styles.sectionTitle, {marginTop: 24}]}>
                {searchQuery ? 'SEARCH RESULTS' : (selectedCategory ? 'CATEGORY FAQS' : 'FREQUENTLY ASKED QUESTIONS')}
            </Text>
            
            <View style={styles.faqCard}>
                {filteredFaqs.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Icon name="file-question-outline" size={32} color={theme.colors.textSecondary} />
                        <Text style={styles.emptyStateText}>No FAQs found for this topic.</Text>
                    </View>
                ) : (
                    filteredFaqs.map((faq, index) => {
                        const isExpanded = expandedFaq === faq.id;
                        return (
                            <View key={faq.id}>
                                <TouchableOpacity 
                                    style={[styles.faqRow, index !== 0 && styles.borderTop]} 
                                    activeOpacity={0.7}
                                    onPress={() => setExpandedFaq(isExpanded ? null : faq.id)}
                                >
                                    <Text style={[styles.faqQuestion, isExpanded && {color: theme.colors.primary}]}>{faq.question}</Text>
                                    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={isExpanded ? theme.colors.primary : theme.colors.textSecondary} />
                                </TouchableOpacity>
                                {isExpanded && (
                                    <View style={styles.faqAnswerBox}>
                                        <Text style={styles.faqAnswer}>{faq.answer}</Text>
                                    </View>
                                )}
                            </View>
                        )
                    })
                )}
            </View>

            {/* Contact Support */}
            <View style={styles.contactCard}>
                <View style={styles.contactMeta}>
                    <Text style={styles.contactTitle}>Still need help?</Text>
                    <Text style={styles.contactSub}>Our 24/7 concierge team is here for you.</Text>
                </View>
                <TouchableOpacity 
                    style={styles.chatBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ConciergeChatScreen')}
                >
                    <Icon name="message-text-outline" size={20} color={theme.colors.background} />
                    <Text style={styles.chatBtnText}>Chat Now</Text>
                </TouchableOpacity>
            </View>

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
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  searchSection: { marginBottom: 32, marginTop: 10 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 16 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: 12, paddingHorizontal: 16, height: 50, borderWidth: 1, borderColor: theme.colors.border },
  searchInput: { flex: 1, marginLeft: 10, color: theme.colors.textPrimary, fontSize: 15 },
  
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridItem: { width: '48%', backgroundColor: theme.colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.colors.border, alignItems: 'center', justifyContent: 'center' },
  gridItemActive: { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: theme.colors.primary },
  iconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  iconCircleActive: { backgroundColor: theme.colors.primary },
  gridTitle: { fontSize: 13, fontWeight: '600', color: theme.colors.textPrimary, textAlign: 'center' },
  gridTitleActive: { color: theme.colors.primary },

  faqCard: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden', minHeight: 100 },
  faqRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  borderTop: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: '500', color: theme.colors.textPrimary, paddingRight: 16 },
  faqAnswerBox: { paddingHorizontal: 16, paddingBottom: 16, backgroundColor: 'rgba(255,255,255,0.02)' },
  faqAnswer: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 20 },
  
  emptyState: { padding: 32, alignItems: 'center', justifyContent: 'center' },
  emptyStateText: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 12, textAlign: 'center' },

  contactCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(212, 175, 55, 0.08)', borderRadius: 16, padding: 20, marginTop: 32, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)' },
  contactMeta: { flex: 1, marginRight: 12 },
  contactTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 4 },
  contactSub: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },
  chatBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.primary, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, gap: 6 },
  chatBtnText: { fontSize: 14, fontWeight: 'bold', color: theme.colors.background }
});
