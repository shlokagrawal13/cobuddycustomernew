import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { useAuthStore } from '../store/slices/authStore';
import { CompanionCard } from '../components/ui/CompanionCard';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

const ACTIVITIES = [
  { id: 'coffee', icon: 'coffee-outline' },
  { id: 'movie', icon: 'movie-open-outline' },
  { id: 'study', icon: 'book-open-variant' },
  { id: 'event', icon: 'ticket-confirmation-outline' },
  { id: 'city', icon: 'map-marker-path' },
  { id: 'conversation', icon: 'forum-outline' },
];

const DUMMY_COMPANIONS = [
  {
    id: 'c1',
    name: 'Sarah',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    specialty: 'Conversation & Local Tours',
    trustScore: 98,
  },
  {
    id: 'c2',
    name: 'Michael',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    specialty: 'Movie Buff & Events',
    trustScore: 95,
  },
];

export const HomeDashboardScreen = () => {
  const { t } = useTranslation(['home']);
  const navigation = useNavigation<any>();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const greetingText = firstName ? t('greeting', { name: firstName }) : t('greeting_fallback');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{greetingText}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
            <View style={styles.avatarPlaceholder}>
              <Icon name="account-outline" size={24} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Explore Activities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('sections.activities')}</Text>
          <View style={styles.activitiesGrid}>
            {ACTIVITIES.map(activity => (
              <TouchableOpacity
                key={activity.id}
                style={styles.activityCard}
                onPress={() => navigation.navigate('DiscoverTab', {
                  screen: 'DiscoverScreen',
                  params: { category: activity.id }
                })}
              >
                <View style={styles.activityIconWrap}>
                  <Icon name={activity.icon} size={28} color={theme.colors.primary} />
                </View>
                <Text style={styles.activityLabel}>{t(`activities.${activity.id}`)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Companions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('sections.featured')}</Text>
          
          {loading ? (
            <View style={styles.skeletonContainer}>
              <SkeletonLoader height={250} borderRadius={16} style={{ marginBottom: 16 }} />
              <SkeletonLoader height={250} borderRadius={16} />
            </View>
          ) : (
            <View style={styles.companionsList}>
              {DUMMY_COMPANIONS.map(companion => (
                <CompanionCard
                  key={companion.id}
                  {...companion}
                  onPress={(id) => navigation.navigate('DiscoverTab', {
                    screen: 'CompanionProfileScreen',
                    params: { id }
                  })}
                />
              ))}
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    gap: 12,
  },
  activityIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityLabel: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  skeletonContainer: {
    width: '100%',
  },
  companionsList: {
    width: '100%',
  },
});
