import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

type NotificationCategory = 'All' | 'Bookings' | 'Wallet' | 'Security' | 'Support';

interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  icon: string;
  iconColor: string;
  route: string;
  stack?: string; // Optional stack for cross-tab navigation
  routeParams?: any;
}

const CATEGORIES: NotificationCategory[] = ['All', 'Bookings', 'Wallet', 'Security', 'Support'];

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: 'Bookings',
    title: 'Booking Confirmed!',
    description: 'Your evening walk with Priya has been confirmed for tomorrow at 6 PM.',
    time: '2m ago',
    isRead: false,
    icon: 'calendar-check',
    iconColor: theme.colors.success,
    route: 'BookingDetailScreen',
    stack: 'BookingsTab',
  },
  {
    id: 'n2',
    category: 'Wallet',
    title: 'Refund Processed',
    description: '₹1,500 has been successfully refunded to your CoBuddy Wallet.',
    time: '1h ago',
    isRead: false,
    icon: 'wallet-plus',
    iconColor: theme.colors.primary,
    route: 'WalletScreen',
    stack: 'ProfileTab',
  },
  {
    id: 'n3',
    category: 'Security',
    title: 'New Login Detected',
    description: 'We detected a new login from an iPhone 14 Pro in New Delhi.',
    time: '3h ago',
    isRead: true,
    icon: 'shield-alert',
    iconColor: theme.colors.error,
    route: 'ActiveSessionsScreen',
    stack: 'ProfileTab',
  },
  {
    id: 'n4',
    category: 'Bookings',
    title: 'Upcoming Meetup Reminder',
    description: 'Don\'t forget! Your coffee meetup with Rahul starts in 2 hours.',
    time: '5h ago',
    isRead: true,
    icon: 'clock-outline',
    iconColor: theme.colors.warning,
    route: 'BookingDetailScreen',
    stack: 'BookingsTab',
  },
  {
    id: 'n5',
    category: 'Support',
    title: 'Support Ticket Updated',
    description: 'Our Concierge team has responded to your ticket #402.',
    time: '1d ago',
    isRead: true,
    icon: 'headset',
    iconColor: '#3B82F6', // Blue for support
    route: 'SupportTicketDetailScreen',
    stack: 'ProfileTab',
  },
  {
    id: 'n6',
    category: 'Security',
    title: 'KYC Verified successfully',
    description: 'Your Identity verification is complete. You now have the verified badge!',
    time: '2d ago',
    isRead: true,
    icon: 'check-decagram',
    iconColor: theme.colors.success,
    route: 'ProfileScreen', // Route to Profile so they can see their badge
    stack: 'ProfileTab',
  },
];

export const NotificationsScreen = () => {
  const navigation = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('All');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const filteredNotifications = notifications.filter(n => activeCategory === 'All' || n.category === activeCategory);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationPress = (notification: NotificationItem) => {
    // Mark as read locally
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );
    // Navigate across tabs if stack is provided
    if (notification.stack) {
      navigation.navigate(notification.stack, { screen: notification.route, params: notification.routeParams });
    } else if (notification.route) {
      navigation.navigate(notification.route, notification.routeParams);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        
        {notifications.some(n => !n.isRead) && (
          <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.7}>
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Categories Horizontal Scroll */}
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map(category => {
            const isActive = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.8}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.categoryChip,
                  isActive && styles.categoryChipActive
                ]}
              >
                <Text style={[
                  styles.categoryChipText,
                  isActive && styles.categoryChipTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="bell-sleep-outline" size={64} color="rgba(255,255,255,0.1)" />
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptySub}>You have no notifications in this category right now.</Text>
          </View>
        ) : (
          filteredNotifications.map((notif, index) => (
            <TouchableOpacity 
              key={notif.id}
              activeOpacity={0.7}
              onPress={() => handleNotificationPress(notif)}
              style={[
                styles.notifCard,
                !notif.isRead && styles.notifCardUnread,
                index === filteredNotifications.length - 1 && styles.lastCard
              ]}
            >
              {/* Unread Indicator */}
              {!notif.isRead && <View style={styles.unreadDot} />}

              {/* Icon */}
              <View style={[styles.iconWrapper, { backgroundColor: `${notif.iconColor}15`, borderColor: `${notif.iconColor}30` }]}>
                <Icon name={notif.icon} size={22} color={notif.iconColor} />
              </View>

              {/* Content */}
              <View style={styles.notifContent}>
                <View style={styles.notifHeader}>
                  <Text style={[styles.notifTitle, !notif.isRead && styles.notifTitleUnread]} numberOfLines={1}>
                    {notif.title}
                  </Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
                </View>
                <Text style={styles.notifDesc} numberOfLines={2}>
                  {notif.description}
                </Text>
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
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.textPrimary },
  markReadText: { fontSize: 13, color: theme.colors.primary, fontWeight: '600' },

  categoriesWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  categoryChipTextActive: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },

  listContent: {
    padding: 16,
    paddingBottom: 40,
  },

  notifCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  notifCardUnread: {
    backgroundColor: 'rgba(212, 175, 55, 0.03)', // Subtle gold tint
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  lastCard: {
    marginBottom: 0,
  },
  
  unreadDot: {
    position: 'absolute',
    top: 16,
    left: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 16,
  },
  
  notifContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.textPrimary,
    marginRight: 8,
  },
  notifTitleUnread: {
    fontWeight: 'bold',
  },
  notifTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  notifDesc: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  }
});
