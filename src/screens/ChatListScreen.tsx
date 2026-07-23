import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../theme';

// Define the exact colors to match the luxury theme
const Colors = {
  background: theme.colors.background,
  surface: theme.colors.surface,
  primary: theme.colors.primary,
  textPrimary: theme.colors.textPrimary,
  textSecondary: theme.colors.textSecondary,
  success: theme.colors.success,
  border: theme.colors.border,
  goldDim: 'rgba(212,175,55,0.1)',
};

export const ChatListScreen = () => {
  const navigation = useNavigation<any>();

  const MOCK_CHATS = [
    {
      id: 'CB-REQ-8829',
      name: 'Elena Vasquez',
      lastMessage: 'I have arrived at the cafe. See you soon!',
      time: '12:45 PM',
      unread: 1,
      isOnline: true,
      isTyping: false,
      readReceipt: 'none', // sent by them, so no read receipt for us
    },
    {
      id: 'CB-REQ-7711',
      name: 'Priya Sharma',
      lastMessage: 'Thank you for the amazing session yesterday.',
      time: 'Yesterday',
      unread: 0,
      isOnline: false,
      isTyping: false,
      readReceipt: 'read', // double blue/gold tick
    },
    {
      id: 'CB-REQ-5522',
      name: 'Aisha Khan',
      lastMessage: '',
      time: 'Just now',
      unread: 0,
      isOnline: true,
      isTyping: true, // Show "typing..." animation text
      readReceipt: 'none',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* ── Polished Theme Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
          <Icon name="bell-outline" size={24} color={Colors.textPrimary} />
          <View style={styles.headerNotifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ── Live Support Card (Pinned Concierge) ── */}
        <View style={styles.liveCardShadow}>
          <View style={styles.liveCard}>
            <View style={styles.liveCardGlow} />
            
            <View style={styles.liveCardTop}>
              <View style={styles.liveIconWrap}>
                <Icon name="shield-star" size={26} color={Colors.primary} />
              </View>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveBadgeText}>Online Now</Text>
              </View>
            </View>

            <Text style={styles.liveCardTitle}>CoBuddy Concierge</Text>
            <Text style={styles.liveCardSub}>
              Connect with a dedicated specialist for immediate 24/7 assistance.
            </Text>

            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => navigation.navigate('ConciergeChatScreen')}
              activeOpacity={0.8}>
              <Icon name="message-text" size={18} color={Colors.background} />
              <Text style={styles.startBtnText}>Start Conversation</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 24}} />

        {/* ── Active Conversations List ── */}
        <View style={styles.convoHeader}>
          <Text style={styles.convoHeaderLabel}>ACTIVE CONVERSATIONS</Text>
        </View>

        {MOCK_CHATS.map((chat, index) => (
          <React.Fragment key={chat.id}>
            <TouchableOpacity
              style={styles.convoItem}
              onPress={() => navigation.navigate('CompanionChatScreen', { companionName: chat.name, bookingId: chat.id })}
              activeOpacity={0.8}>
              
              <View style={styles.convoAvatar}>
                <Text style={styles.convoAvatarText}>{chat.name.charAt(0)}</Text>
                {chat.isOnline && <View style={styles.convoOnlineDot} />}
              </View>

              <View style={styles.convoMeta}>
                <View style={styles.convoMetaRow}>
                  <Text style={[styles.convoName, chat.unread > 0 && {color: Colors.primary}]}>{chat.name}</Text>
                  <Text style={[styles.convoTime, chat.unread > 0 && {color: Colors.primary, fontWeight: 'bold'}]}>{chat.time}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8}}>
                    {/* Read Receipt Icon */}
                    {chat.readReceipt === 'read' && (
                      <Icon name="check-all" size={14} color={Colors.primary} style={{marginRight: 4}} />
                    )}
                    {chat.readReceipt === 'delivered' && (
                      <Icon name="check-all" size={14} color={Colors.textSecondary} style={{marginRight: 4}} />
                    )}
                    {chat.readReceipt === 'sent' && (
                      <Icon name="check" size={14} color={Colors.textSecondary} style={{marginRight: 4}} />
                    )}
                    
                    {chat.isTyping ? (
                      <Text style={[styles.convoPreview, {color: Colors.primary, fontStyle: 'italic'}]}>typing...</Text>
                    ) : (
                      <Text style={[styles.convoPreview, chat.unread > 0 && {color: Colors.textPrimary, opacity: 1, fontWeight: '500'}]} numberOfLines={1}>
                        {chat.lastMessage}
                      </Text>
                    )}
                  </View>

                  {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            
            {/* Divider between chats */}
            {index < MOCK_CHATS.length - 1 && <View style={styles.chatDivider} />}
          </React.Fragment>
        ))}

        {MOCK_CHATS.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="message-text-outline" size={48} color={Colors.border} />
            <Text style={styles.emptyTitle}>No active chats</Text>
            <Text style={styles.emptyDesc}>Once your booking is accepted, you can securely chat with your companion here.</Text>
          </View>
        )}

        <View style={{height: 32}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},

  // ── Polished App Theme Header ──
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  headerTitle: {fontSize: 24, fontWeight: 'bold', color: Colors.textPrimary},
  headerIconBtn: {
    padding: 8,
    position: 'relative',
  },
  headerNotifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
    borderWidth: 1.5,
    borderColor: Colors.background,
  },

  scroll: {flex: 1},
  scrollContent: {paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32},

  // ── Live support card (safe shadow/clip split) ──
  liveCardShadow: {
    borderRadius: 24,
    backgroundColor: 'rgba(212,175,55,0.05)',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  liveCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 20,
    position: 'relative',
    gap: 12,
  },
  liveCardGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.goldDim,
  },
  liveCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadge: {flexDirection: 'row', alignItems: 'center', gap: 6},
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  liveBadgeText: {fontSize: 11, letterSpacing: 1, color: Colors.textSecondary, fontWeight: 'bold', textTransform: 'uppercase'},
  liveCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    lineHeight: 28,
  },
  liveCardSub: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  startBtnText: {fontSize: 14, color: Colors.background, fontWeight: 'bold', letterSpacing: 0.5},

  // ── Active conversations ──
  convoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  convoHeaderLabel: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  chatDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 64, // Align with text
    marginVertical: 4,
  },
  convoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
  },
  convoAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  convoAvatarText: {fontSize: 18, fontWeight: 'bold', color: Colors.primary},
  convoOnlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  convoMeta: {flex: 1},
  convoMetaRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4},
  convoName: {fontSize: 15, fontWeight: 'bold', color: Colors.textPrimary},
  convoTime: {fontSize: 12, color: Colors.textSecondary},
  convoPreview: {fontSize: 13, color: Colors.textSecondary, flex: 1, marginRight: 8},
  
  unreadBadge: {
    backgroundColor: Colors.primary,
    width: 20, height: 20, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center'
  },
  unreadText: {color: Colors.background, fontSize: 10, fontWeight: 'bold'},

  emptyState: {alignItems: 'center', justifyContent: 'center', paddingVertical: 32},
  emptyTitle: {fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginTop: 12, marginBottom: 4},
  emptyDesc: {fontSize: 13, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20, paddingHorizontal: 20},
});
