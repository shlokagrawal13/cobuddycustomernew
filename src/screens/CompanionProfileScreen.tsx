import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';
import { BottomActionBar } from '../components/ui/BottomActionBar';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

const { width } = Dimensions.get('window');

// Dummy data
const DUMMY_PROFILE = {
  id: 'c1',
  name: 'Sarah',
  age: 26,
  photos: [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
  ],
  trustScore: 98,
  bio: 'Hi! I love exploring new cafes in the city and talking about art, literature, and movies. Let\'s hang out in a nice public spot and have a great conversation!',
  activities: ['coffee', 'conversation', 'city'],
  reviews: {
    average: 4.9,
    count: 24,
    items: [
      { id: 'r1', author: 'Alex', text: 'Sarah was a great listener and knew the best cafe in town. Really enjoyed our conversation.' },
      { id: 'r2', author: 'Jamie', text: 'Super friendly and polite. Felt very safe and comfortable.' },
    ]
  }
};

export const CompanionProfileScreen = () => {
  const { t } = useTranslation(['companionProfile']);
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <SkeletonLoader height={300} borderRadius={0} />
          <View style={{ padding: 20 }}>
            <SkeletonLoader height={32} width="50%" style={{ marginBottom: 16 }} />
            <SkeletonLoader height={20} width="30%" style={{ marginBottom: 24 }} />
            <SkeletonLoader height={100} style={{ marginBottom: 24 }} />
            <SkeletonLoader height={80} style={{ marginBottom: 24 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      
      {/* Absolute Back Button over Image */}
      <TouchableOpacity 
        style={styles.absoluteBackBtn} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {DUMMY_PROFILE.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.carouselImage} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.detailsContainer}>
          {/* Header Row */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{DUMMY_PROFILE.name}, {DUMMY_PROFILE.age}</Text>
            
            <TouchableOpacity 
              style={styles.trustBadge}
              onPress={() => setShowTooltip(!showTooltip)}
              activeOpacity={0.8}
            >
              <Icon name="shield-check" size={16} color={theme.colors.background} />
              <Text style={styles.trustScore}>{DUMMY_PROFILE.trustScore}</Text>
              <Icon name="information-outline" size={14} color={theme.colors.background} style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>

          {showTooltip && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{t('trust_score_info')}</Text>
            </View>
          )}

          {/* Verification Badges */}
          <View style={styles.verificationRow}>
            <View style={styles.verifyChip}>
              <Icon name="check-decagram" size={16} color={theme.colors.success} />
              <Text style={styles.verifyText}>{t('badges.id_verified')}</Text>
            </View>
            <View style={styles.verifyChip}>
              <Icon name="file-document-check-outline" size={16} color={theme.colors.success} />
              <Text style={styles.verifyText}>{t('badges.background_checked')}</Text>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('sections.about')}</Text>
            <Text style={styles.bio}>{DUMMY_PROFILE.bio}</Text>
          </View>

          {/* Activities Offered */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('sections.activities')}</Text>
            <View style={styles.activitiesRow}>
              {DUMMY_PROFILE.activities.map(act => (
                <View key={act} style={styles.activityChip}>
                  <Text style={styles.activityChipText}>{act.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.reviewHeader}>
              <Text style={styles.sectionTitle}>{t('sections.reviews')}</Text>
              <View style={styles.reviewScoreRow}>
                <Icon name="star" size={18} color={theme.colors.primary} />
                <Text style={styles.reviewAverage}>{DUMMY_PROFILE.reviews.average}</Text>
                <Text style={styles.reviewCount}>({DUMMY_PROFILE.reviews.count})</Text>
              </View>
            </View>
            
            {DUMMY_PROFILE.reviews.items.map(rev => (
              <View key={rev.id} style={styles.reviewItem}>
                <View style={styles.reviewAuthorRow}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{rev.author.charAt(0)}</Text>
                  </View>
                  <Text style={styles.reviewAuthor}>{rev.author}</Text>
                </View>
                <Text style={styles.reviewText}>{rev.text}</Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <BottomActionBar>
        <Button
          title={t('btn_request')}
          onPress={() => navigation.navigate('BookingFlowStack')}
        />
      </BottomActionBar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  absoluteBackBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11, 13, 26, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  carouselContainer: {
    width: '100%',
    height: 380,
  },
  carouselImage: {
    width: width,
    height: 380,
  },
  detailsContainer: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  trustScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  tooltip: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: 16,
  },
  tooltipText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  verificationRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  verifyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    gap: 6,
  },
  verifyText: {
    color: theme.colors.success,
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  bio: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  activitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activityChipText: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewAverage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  reviewCount: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  reviewItem: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  reviewAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewAuthor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  reviewText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});
