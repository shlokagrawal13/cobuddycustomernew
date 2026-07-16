import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { CompanionCard } from '../components/ui/CompanionCard';
import { CompanionCardSkeleton } from '../components/ui/CompanionCardSkeleton';

const DUMMY_FEATURED = [
  {
    id: 'f1',
    name: 'Elena Vasquez',
    initials: 'EV',
    title: 'City guide & local experiences expert',
    activities: ['Fine Dining', 'Art & Culture'],
    trustScore: 98,
    rating: 4.97,
    reviews: 124,
    sessions: 312,
    rate: '₹500 /hr',
    distance: '2.5 km away',
    isOnline: true,
  },
  {
    id: 'f2',
    name: 'Marcus Chen',
    initials: 'MC',
    title: 'Art historian & cultural explorer',
    activities: ['Art & Culture', 'Architecture'],
    trustScore: 96,
    rating: 4.92,
    reviews: 89,
    sessions: 205,
    rate: '₹450 /hr',
    distance: '4.0 km away',
    isOnline: true,
  },
];

const EXPLORE_CATEGORIES = [
  { id: 'coffee', title: 'Coffee Meetups', icon: 'coffee', color: '#D4AF37' },
  { id: 'movie', title: 'Movie Buffs', icon: 'movie', color: '#E11D48' },
  { id: 'city', title: 'City Walk', icon: 'map-marker', color: '#10B981' },
  { id: 'study', title: 'Study Buddy', icon: 'book', color: '#3B82F6' },
];

export const HomeDashboardScreen = () => {
  const { t } = useTranslation(['home']);
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);

  // In real app, this comes from global state or API
  const [hasActiveBooking, setHasActiveBooking] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>C</Text>
          </View>
          <Text style={styles.logoText}>CoBuddy</Text>
        </View>
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="magnify" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <View style={styles.notifDot} />
            <Icon name="bell-outline" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>{t('greeting')} <Text style={styles.welcomeName}>Shlok</Text></Text>
          <Text style={styles.subtitleText}>{t('subtitle')}</Text>
        </View>

        {hasActiveBooking ? (
          <>
            {/* Active Meetup Card */}
            <View style={styles.cardSection}>
              <View style={styles.cardHeader}>
                <Icon name="calendar-check" size={16} color={theme.colors.primary} />
                <Text style={styles.cardSectionTitle}>{t('upcoming.title')}</Text>
              </View>
              
              <View style={styles.activeCard}>
                <View style={styles.activeCardTop}>
                  <View style={styles.badgeRow}>
                    <View style={styles.badgeSolid}>
                      <Icon name="check" size={12} color={theme.colors.background} />
                      <Text style={styles.badgeSolidText}>{t('upcoming.status')}</Text>
                    </View>
                  </View>
                  <Text style={styles.activeMeetupTitle}>{t('upcoming.meetup_title')}</Text>
                  <Text style={styles.activeMeetupTime}>{t('upcoming.time')} · ID Verified</Text>
                </View>
                <TouchableOpacity style={styles.arrowBtn}>
                  <Icon name="arrow-right" size={20} color={theme.colors.background} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Today's Itinerary Timeline */}
            <View style={styles.itineraryCard}>
              <View style={styles.itineraryHeaderRow}>
                <Text style={styles.itineraryTitle}>{t('itinerary.title')}</Text>
                <TouchableOpacity>
                  <Icon name="dots-horizontal" size={24} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.timelineContainer}>
                {/* Start Node */}
                <View style={styles.timelineNode}>
                  <View style={styles.nodeIconContainer}>
                    <View style={styles.nodeDotActive} />
                  </View>
                  <View style={styles.nodeContent}>
                    <Text style={styles.nodeTime}>16:00 - 18:00</Text>
                    <Text style={styles.nodeTitle}>{t('itinerary.start')}</Text>
                    <Text style={styles.nodeDesc}>{t('itinerary.start_desc')}</Text>
                  </View>
                </View>

                {/* Line connecting nodes */}
                <View style={styles.timelineLine} />

                {/* End Node */}
                <View style={styles.timelineNode}>
                  <View style={styles.nodeIconContainer}>
                    <View style={styles.nodeDotInactive} />
                  </View>
                  <View style={styles.nodeContent}>
                    <Text style={styles.nodeTimeMuted}>18:00</Text>
                    <Text style={styles.nodeTitleMuted}>{t('itinerary.end')}</Text>
                    <Text style={styles.nodeDescMuted}>{t('itinerary.end_desc')}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.fullItineraryBtn}>
                <Text style={styles.fullItineraryText}>{t('itinerary.view_full')}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* Explore Activities Section */
          <View style={styles.exploreSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Explore Activities</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.exploreScroll}>
              {EXPLORE_CATEGORIES.map(cat => (
                <TouchableOpacity 
                  key={cat.id} 
                  style={styles.exploreCard}
                  onPress={() => navigation.navigate('DiscoverTab', { 
                    screen: 'DiscoverScreen', 
                    params: { category: cat.id } 
                  })}
                >
                  <View style={[styles.exploreIconBox, { backgroundColor: `${cat.color}20` }]}>
                    <Icon name={cat.icon} size={28} color={cat.color} />
                  </View>
                  <Text style={styles.exploreCardTitle}>{cat.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Quick Access Grid */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitleSmall}>{t('quick_access.title')}</Text>
          <View style={styles.gridRow}>
            
            <TouchableOpacity 
              style={styles.gridItem}
              onPress={() => navigation.navigate('DiscoverTab')}
            >
              <View style={[styles.gridIconCircle, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                <Icon name="account-search" size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.gridText}>{t('quick_access.find')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.gridIconCircle, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                <Icon name="calendar-clock" size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.gridText}>{t('quick_access.bookings')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.gridIconCircle, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                <Icon name="shield-check" size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.gridText}>{t('quick_access.safety')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.gridIconCircle, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                <Icon name="account-outline" size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.gridText}>{t('quick_access.profile')}</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Featured Companions Section */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Featured Companions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DiscoverTab')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
            {loading ? (
              <>
                <View style={[styles.featuredCardWrapper, { width: 320 }]}>
                  <CompanionCardSkeleton />
                </View>
                <View style={[styles.featuredCardWrapper, { width: 320 }]}>
                  <CompanionCardSkeleton />
                </View>
              </>
            ) : (
              DUMMY_FEATURED.map((item) => (
                <View key={item.id} style={styles.featuredCardWrapper}>
                  <CompanionCard
                    {...item}
                    onPress={(id) => navigation.navigate('DiscoverTab', {
                      screen: 'CompanionProfileScreen',
                      params: { id }
                    })}
                  />
                </View>
              ))
            )}
          </ScrollView>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  logoBadgeText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  topRightIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
    zIndex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  welcomeName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subtitleText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  sectionTitleSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  exploreSection: {
    marginBottom: 24,
  },
  exploreScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  exploreCard: {
    backgroundColor: theme.colors.surface,
    width: 120,
    height: 120,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'space-between',
  },
  exploreIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  cardSection: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
  },
  activeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activeCardTop: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  badgeSolid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  badgeSolidText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  activeMeetupTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  activeMeetupTime: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  arrowBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itineraryCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  itineraryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  itineraryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  timelineContainer: {
    paddingLeft: 8,
    marginBottom: 24,
  },
  timelineNode: {
    flexDirection: 'row',
  },
  nodeIconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  nodeDotActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    marginTop: 4,
  },
  nodeDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.textSecondary,
    marginTop: 4,
  },
  timelineLine: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginLeft: 11,
    marginVertical: -4,
  },
  nodeContent: {
    flex: 1,
  },
  nodeTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  nodeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  nodeDesc: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  nodeTimeMuted: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  nodeTitleMuted: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  nodeDescMuted: {
    fontSize: 14,
    color: 'rgba(160, 164, 184, 0.5)',
  },
  fullItineraryBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  fullItineraryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
  },
  quickAccessSection: {
    marginTop: 10,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  gridItem: {
    alignItems: 'center',
    width: '23%',
  },
  gridIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  featuredSection: {
    marginTop: 32,
  },
  featuredScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  featuredCardWrapper: {
    width: 320,
  },
  viewAllText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
