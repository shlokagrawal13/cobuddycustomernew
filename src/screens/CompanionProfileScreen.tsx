import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.55; 

// Dummy data enhanced with details
const DUMMY_PROFILE = {
  id: 'c1',
  name: 'Sarah',
  age: 26,
  photos: [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
  ],
  trustScore: 98,
  location: 'Mumbai, Maharashtra',
  bio: "Hi! I love exploring new cafes in the city and talking about art, literature, and movies. Let's hang out in a nice public spot and have a great conversation!",
  languages: ['English (Fluent)', 'Spanish (Basic)'],
  personality: ['Introvert', 'Good Listener', 'Foodie'],
  hobbies: ['Photography', 'Anime', 'Reading'],
  pronouns: 'She/Her',
  lastActive: 'Online now',
  responseTime: '< 1 hour',
  responseRate: '95%',
  memberSince: '2024',
  completedSessions: 154,
  distance: '2.5 km away',
  travelPreference: 'Willing to travel up to 10 km',
  pricing: [
    { activity: 'Coffee / Dining', price: '₹500/hr', icon: 'coffee-outline' },
    { activity: 'Movies / Events', price: '₹800/hr', icon: 'ticket-outline' },
    { activity: 'City Tour', price: '₹1000/hr', icon: 'city-variant-outline' },
  ],
  schedule: 'Available Today: 4 PM - 9 PM',
  cancellationPolicy: 'Free cancellation up to 24 hours before the session.',
  rules: [
    'Public places only',
    'No smoking during sessions',
    'Please book 24 hours in advance'
  ],
  verifications: [
    { label: 'ID Verified', icon: 'badge-account-horizontal-outline', color: theme.colors.success },
    { label: 'Phone Verified', icon: 'phone-check-outline', color: theme.colors.success },
    { label: 'Background Checked', icon: 'file-document-check-outline', color: theme.colors.success },
  ],
  reviews: {
    average: 4.9,
    count: 24,
    categories: { punctuality: 5.0, communication: 4.8, behavior: 4.9 },
    items: [
      { id: 'r1', author: 'Alex', date: 'Oct 2026', activity: 'Coffee / Dining', text: 'Sarah was a great listener and knew the best cafe in town. Really enjoyed our conversation.' },
      { id: 'r2', author: 'Jamie', date: 'Sep 2026', activity: 'City Tour', text: 'Super friendly and polite. Showed me some hidden gems in the city. Felt very safe and comfortable.' },
    ]
  }
};

export const CompanionProfileScreen = () => {
  const { t } = useTranslation(['companionProfile']);
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // Need false for backgroundColor/opacity interpolation if used on non-transform
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HERO_HEIGHT - 100, HERO_HEIGHT - 50],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActivePhotoIndex(index);
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 20 }}>
          <SkeletonLoader height={300} borderRadius={16} style={{ marginBottom: 24 }} />
          <SkeletonLoader height={32} width="50%" style={{ marginBottom: 16 }} />
          <SkeletonLoader height={20} width="30%" style={{ marginBottom: 24 }} />
          <SkeletonLoader height={120} borderRadius={16} style={{ marginBottom: 24 }} />
          <SkeletonLoader height={120} borderRadius={16} style={{ marginBottom: 24 }} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* Edge-to-Edge Hero Image */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.heroContainer}>
          <Animated.ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
          >
            {DUMMY_PROFILE.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.heroImage} />
            ))}
          </Animated.ScrollView>
          
          {/* Dark Overlay at bottom of image for contrast */}
          <View style={styles.heroOverlay}>
            <View style={styles.heroDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.heroName}>{DUMMY_PROFILE.name}, {DUMMY_PROFILE.age}</Text>
                <View style={styles.trustBadge}>
                  <Icon name="shield-check" size={16} color={theme.colors.background} />
                  <Text style={styles.trustScore}>{DUMMY_PROFILE.trustScore}</Text>
                </View>
              </View>
              <Text style={styles.heroSubtitle}>{DUMMY_PROFILE.location} • {DUMMY_PROFILE.distance}</Text>
              
              <View style={styles.metaRow}>
                <Text style={[styles.heroSubtitle, { fontSize: 14, opacity: 0.8 }]}>{DUMMY_PROFILE.pronouns}</Text>
                <View style={styles.dotSeparator} />
                <View style={styles.activeStatusRow}>
                  <View style={styles.activeDot} />
                  <Text style={styles.activeStatusText}>{DUMMY_PROFILE.lastActive}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Custom Pagination Dots */}
          <View style={styles.paginationContainer}>
            {DUMMY_PROFILE.photos.map((_, i) => (
              <View key={i} style={[styles.dot, activePhotoIndex === i && styles.activeDot]} />
            ))}
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.contentBody}>
          
          {/* Quick Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="star" size={24} color={theme.colors.primary} />
              <Text style={styles.statValue}>{DUMMY_PROFILE.reviews.average}</Text>
              <Text style={styles.statLabel}>{DUMMY_PROFILE.reviews.count} Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Icon name="check-decagram" size={24} color={theme.colors.success} />
              <Text style={styles.statValue}>{DUMMY_PROFILE.completedSessions}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Icon name="clock-fast" size={24} color={theme.colors.secondary} />
              <Text style={styles.statValue}>{DUMMY_PROFILE.responseTime}</Text>
              <Text style={styles.statLabel}>Response</Text>
            </View>
          </View>

          {/* About Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>About {DUMMY_PROFILE.name}</Text>
            <Text style={styles.bioText}>{DUMMY_PROFILE.bio}</Text>
            
            <View style={styles.tagsContainer}>
              {DUMMY_PROFILE.languages.map(lang => (
                <View key={lang} style={styles.tag}>
                  <Icon name="translate" size={14} color={theme.colors.textSecondary} />
                  <Text style={styles.tagText}>{lang}</Text>
                </View>
              ))}
              {DUMMY_PROFILE.hobbies.map(hobby => (
                <View key={hobby} style={styles.tag}>
                  <Icon name="heart-outline" size={14} color={theme.colors.textSecondary} />
                  <Text style={styles.tagText}>{hobby}</Text>
                </View>
              ))}
              {DUMMY_PROFILE.personality.map(trait => (
                <View key={trait} style={styles.tag}>
                  <Icon name="account-star-outline" size={14} color={theme.colors.textSecondary} />
                  <Text style={styles.tagText}>{trait}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Services & Pricing Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Services & Pricing</Text>
            {DUMMY_PROFILE.pricing.map((p, idx) => (
              <View key={idx} style={styles.pricingRow}>
                <View style={styles.pricingLeft}>
                  <View style={styles.pricingIconBox}>
                    <Icon name={p.icon} size={20} color={theme.colors.primary} />
                  </View>
                  <Text style={styles.pricingActivity}>{p.activity}</Text>
                </View>
                <Text style={styles.pricingAmount}>{p.price}</Text>
              </View>
            ))}
            <View style={styles.infoRow}>
              <Icon name="map-marker-distance" size={18} color={theme.colors.textSecondary} />
              <Text style={styles.infoText}>{DUMMY_PROFILE.travelPreference}</Text>
            </View>
          </View>

          {/* Availability & Rules Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Availability & Rules</Text>
            <View style={[styles.infoRow, { marginBottom: 16 }]}>
              <Icon name="calendar-clock" size={20} color={theme.colors.secondary} />
              <Text style={[styles.infoText, { color: theme.colors.textPrimary, fontWeight: 'bold' }]}>
                {DUMMY_PROFILE.schedule}
              </Text>
            </View>
            
            {DUMMY_PROFILE.rules.map((rule, idx) => (
              <View key={idx} style={styles.ruleRow}>
                <Icon name="check-circle-outline" size={18} color={theme.colors.textSecondary} />
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}

            <View style={[styles.ruleRow, { marginTop: 8 }]}>
              <Icon name="information-outline" size={18} color={theme.colors.error} />
              <Text style={[styles.ruleText, { color: theme.colors.error }]}>{DUMMY_PROFILE.cancellationPolicy}</Text>
            </View>
          </View>

          {/* Verifications Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trust & Verifications</Text>
            <Text style={styles.mutedText}>Member since {DUMMY_PROFILE.memberSince}</Text>
            <View style={styles.verificationList}>
              {DUMMY_PROFILE.verifications.map((v, idx) => (
                <View key={idx} style={styles.verifyItem}>
                  <Icon name={v.icon} size={20} color={v.color} />
                  <Text style={styles.verifyLabel}>{v.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Card */}
          <View style={styles.card}>
            <View style={styles.reviewHeader}>
              <Text style={styles.cardTitle}>Reviews ({DUMMY_PROFILE.reviews.count})</Text>
              <Text style={styles.reviewSeeAll}>See All</Text>
            </View>
            
            <View style={styles.reviewScoresGrid}>
              <View style={styles.reviewScoreItem}>
                <Text style={styles.reviewScoreLabel}>Punctuality</Text>
                <Text style={styles.reviewScoreValue}>{DUMMY_PROFILE.reviews.categories.punctuality}</Text>
              </View>
              <View style={styles.reviewScoreItem}>
                <Text style={styles.reviewScoreLabel}>Communication</Text>
                <Text style={styles.reviewScoreValue}>{DUMMY_PROFILE.reviews.categories.communication}</Text>
              </View>
              <View style={styles.reviewScoreItem}>
                <Text style={styles.reviewScoreLabel}>Behavior</Text>
                <Text style={styles.reviewScoreValue}>{DUMMY_PROFILE.reviews.categories.behavior}</Text>
              </View>
            </View>

            {DUMMY_PROFILE.reviews.items.map((rev, idx) => (
              <View key={rev.id} style={[styles.reviewBox, idx === DUMMY_PROFILE.reviews.items.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 }]}>
                <View style={styles.reviewAuthorRow}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{rev.author.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text style={styles.reviewAuthor}>{rev.author}</Text>
                    <Text style={styles.reviewDate}>{rev.date} • {rev.activity}</Text>
                  </View>
                </View>
                <Text style={styles.reviewText}>{rev.text}</Text>
              </View>
            ))}
          </View>

          {/* Safety / Report Section */}
          <TouchableOpacity style={styles.reportBtn}>
            <Icon name="flag-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.reportBtnText}>{t('report_profile', 'Report this profile')}</Text>
          </TouchableOpacity>

        </View>
      </Animated.ScrollView>

      {/* Glassmorphism Sticky Header */}
      <Animated.View style={[styles.stickyHeader, { paddingTop: insets.top, opacity: headerOpacity }]}>
        <Text style={styles.stickyHeaderTitle}>{DUMMY_PROFILE.name}</Text>
      </Animated.View>

      {/* Floating Header Actions */}
      <View style={[styles.floatingActions, { top: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity style={styles.iconCircle}>
            <Icon name="share-variant" size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle} onPress={() => setIsFavorite(!isFavorite)}>
            <Icon name={isFavorite ? "heart" : "heart-outline"} size={22} color={isFavorite ? theme.colors.error : theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Premium Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}>
        <View style={styles.bottomBarLeft}>
          <Text style={styles.bottomPriceLabel}>{t('starts_from', 'Starts from')}</Text>
          <Text style={styles.bottomPriceValue}>₹500 <Text style={styles.bottomPriceUnit}>/ hr</Text></Text>
        </View>
        
        <TouchableOpacity 
          style={styles.requestBtn}
          onPress={() => navigation.navigate('BookingFlowStack')}
        >
          <Text style={styles.requestBtnText}>{t('btn_request', 'Request Booking')}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // Fixed to use V2 theme
  },
  headerBar: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  heroContainer: {
    width: width,
    height: HERO_HEIGHT,
    position: 'relative',
  },
  heroImage: {
    width: width,
    height: HERO_HEIGHT,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: 'rgba(11, 13, 26, 0.65)', // Match Deep Navy base better
    justifyContent: 'flex-end',
    padding: 24,
  },
  heroDetails: {
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  heroName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  trustScore: {
    color: theme.colors.background,
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 8,
  },
  activeStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 6,
  },
  activeStatusText: {
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: '600',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  activeDot: {
    backgroundColor: '#FFF',
    width: 20,
  },
  contentBody: {
    padding: 16,
    marginTop: -20, // More overlap for depth
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)', // Subtle gold border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    fontSize: 19,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.06)', // Very faint gold
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    gap: 6,
  },
  tagText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  pricingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricingIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pricingActivity: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  pricingAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  infoText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  ruleText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
  },
  mutedText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 16,
    marginTop: -8,
  },
  verificationList: {
    gap: 12,
  },
  verifyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  verifyLabel: {
    color: theme.colors.textPrimary,
    fontSize: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reviewSeeAll: {
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  reviewScoresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: 'rgba(212, 175, 55, 0.04)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  reviewScoreItem: {
    alignItems: 'center',
  },
  reviewScoreLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  reviewScoreValue: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  reviewBox: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  reviewAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewAvatarText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewAuthor: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  reviewDate: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  reviewText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    marginTop: 8,
    marginBottom: 20,
  },
  reportBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  stickyHeaderTitle: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  floatingActions: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(21, 24, 43, 0.98)', // Deep Navy Surface with high opacity
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.2)', // Gold accent border
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 24,
  },
  bottomBarLeft: {
    flex: 1,
  },
  bottomPriceLabel: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  bottomPriceValue: {
    color: theme.colors.primary,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 2,
  },
  bottomPriceUnit: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  requestBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 32,
    height: 52, // Slightly taller for premium feel
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  requestBtnText: {
    color: theme.colors.background,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
