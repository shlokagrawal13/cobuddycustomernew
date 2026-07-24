import React, { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, 
  StatusBar, KeyboardAvoidingView, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { ChatInputBar } from '../../components/common/ChatInputBar';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

export const ConciergeChatScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const QUICK_ACTIONS = [
    'Cancel Booking', 'Refund Status', 'Report Safety Issue', 'General Help'
  ];

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! I am the CoBuddy Support Bot. How can I help you today?', sender: 'bot', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { id: '2', text: 'If you have an emergency, please use the SOS button on the home screen or type your issue below.', sender: 'bot', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prev => [...prev, newMsg]);
    
    // Auto-scroll to bottom
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    // Mock bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Our team will assist you shortly. Please hold on.',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.surface} />
      
      {/* ── Header ── */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => smartGoBack()} style={styles.backBtn}>
              <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <View style={styles.avatarBox}>
              <Icon name="shield-star" size={20} color={theme.colors.background} />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.headerTitle}>CoBuddy Concierge</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Typically replies in 2 mins</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.callBtn}
            onPress={() => navigation.navigate('VoiceCallScreen', { callerName: 'CoBuddy Concierge', callType: 'support' })}
            activeOpacity={0.7}
          >
            <Icon name="phone" size={20} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* ── Chat Messages Area ── */}
      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={styles.chatArea} 
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        <View style={styles.dateChip}>
          <Text style={styles.dateText}>TODAY</Text>
        </View>

        {messages.map((msg) => {
          if (msg.sender === 'bot') {
            return (
              <View key={msg.id} style={styles.messageRowBot}>
                <View style={styles.botAvatarSm}>
                  <Icon name="robot-outline" size={16} color={theme.colors.background} />
                </View>
                <View style={styles.botBubble}>
                  <Text style={styles.botText}>{msg.text}</Text>
                  <Text style={styles.msgTime}>{msg.time}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View key={msg.id} style={styles.messageRowUser}>
                <View style={styles.userBubble}>
                  <Text style={styles.userText}>{msg.text}</Text>
                  <Text style={[styles.msgTime, { alignSelf: 'flex-start', color: 'rgba(20,20,15,0.6)' }]}>{msg.time}</Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>

      {/* ── Fixed Quick Actions (Above Text Input) ── */}
      <View style={styles.quickActionsWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.quickActionsContainer}
        >
          {QUICK_ACTIONS.map((action, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.actionChip}
              onPress={() => handleSend(action)}
            >
              <Text style={styles.actionText}>{action}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ChatInputBar onSend={handleSend} />

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  
  headerSafeArea: { backgroundColor: theme.colors.surface },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 16, paddingVertical: 12, 
    borderBottomWidth: 1, borderBottomColor: theme.colors.border, 
    backgroundColor: theme.colors.surface 
  },
  backBtn: { padding: 8, marginRight: 8, marginLeft: -8 },
  avatarBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.success },
  onlineText: { fontSize: 12, color: theme.colors.textSecondary },
  callBtn: { padding: 10, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20 },

  chatArea: { padding: 16, paddingBottom: 24 },
  
  dateChip: { alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 24 },
  dateText: { color: theme.colors.textSecondary, fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },

  messageRowBot: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16, maxWidth: '85%' },
  botAvatarSm: { width: 24, height: 24, borderRadius: 12, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  botBubble: { backgroundColor: theme.colors.surface, padding: 12, borderRadius: 16, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: theme.colors.border },
  botText: { color: theme.colors.textPrimary, fontSize: 14, lineHeight: 20 },
  
  messageRowUser: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16, maxWidth: '85%', alignSelf: 'flex-end' },
  userBubble: { backgroundColor: theme.colors.primary, padding: 12, borderRadius: 16, borderBottomRightRadius: 4 },
  userText: { color: theme.colors.background, fontSize: 14, lineHeight: 20, fontWeight: '500' },

  msgTime: { color: theme.colors.textSecondary, fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },

  // Fixed above input
  quickActionsWrapper: {
    backgroundColor: theme.colors.background,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  quickActionsContainer: { paddingHorizontal: 16, gap: 10 },
  actionChip: { 
    backgroundColor: 'rgba(212, 175, 55, 0.1)', 
    borderWidth: 1, borderColor: theme.colors.primary, 
    paddingHorizontal: 16, paddingVertical: 8, 
    borderRadius: 20 
  },
  actionText: { color: theme.colors.primary, fontSize: 13, fontWeight: '600' },
});
