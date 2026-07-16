import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { CompanionCard } from '../components/ui/CompanionCard';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

const DUMMY_COMPANIONS = [
  {
    id: 'c1',
    name: 'Elena Vasquez',
    initials: 'EV',
    title: 'City guide & local experiences expert',
    activities: ['Fine Dining', 'Art & Culture', 'Networking'],
    trustScore: 98,
    rating: 4.97,
    reviews: 124,
    sessions: 312,
    rate: '₹500 /hr',
    distance: '2.5 km away',
    isOnline: true,
    category: 'conversation',
  },
  {
    id: 'c2',
    name: 'Marcus Chen',
    initials: 'MC',
    title: 'Art historian & cultural explorer',
    activities: ['Art & Culture', 'Architecture', 'Wellness'],
    trustScore: 96,
    rating: 4.92,
    reviews: 89,
    sessions: 205,
    rate: '₹450 /hr',
    distance: '4.0 km away',
    isOnline: true,
    category: 'movie',
  },
  {
    id: 'c3',
    name: 'Sophia Laurent',
    initials: 'SL',
    title: 'Coffee enthusiast & deep conversations',
    activities: ['Coffee', 'Networking', 'Study Buddy'],
    trustScore: 99,
    rating: 4.99,
    reviews: 210,
    sessions: 512,
    rate: '₹600 /hr',
    distance: '1.2 km away',
    isOnline: false,
    category: 'coffee',
  },
];

export const DiscoverScreen = () => {
  const { t } = useTranslation(['discover']);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const initialCategory = route.params?.category || null;
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.params?.category) {
      setActiveCategory(route.params.category);
    }
  }, [route.params?.category]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const filteredCompanions = DUMMY_COMPANIONS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.activities.some(act => act.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory ? c.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity style={styles.filterBtn}>
            <Icon name="tune-variant" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('search_placeholder')}
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Status Indicator */}
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{t('status', { count: filteredCompanions.length })}</Text>
        </View>
      </View>

      {/* Filter Pills (Solid Design) */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          <TouchableOpacity 
            style={[styles.pillBtn, !activeCategory && styles.pillBtnActive]}
            onPress={() => setActiveCategory(null)}
          >
            <Text style={[styles.pillBtnText, !activeCategory && styles.pillBtnTextActive]}>
              {t('filters.all')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.pillBtn}>
            <Text style={styles.pillBtnText}>{t('filters.available')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pillBtn}>
            <Text style={styles.pillBtnText}>{t('filters.top_rated')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.pillBtn}>
            <Text style={styles.pillBtnText}>{t('filters.nearby')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Info Bar */}
      <View style={styles.infoBar}>
        <Text style={styles.infoBarText}>
          {t('list_info', { filter: activeCategory ? activeCategory.toUpperCase() : 'ALL', count: filteredCompanions.length, total: DUMMY_COMPANIONS.length })}
        </Text>
      </View>

      {/* Results List */}
      {loading ? (
        <ScrollView contentContainerStyle={styles.listContent}>
          <SkeletonLoader height={200} borderRadius={16} style={{ marginBottom: 16 }} />
          <SkeletonLoader height={200} borderRadius={16} style={{ marginBottom: 16 }} />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredCompanions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CompanionCard
              {...item}
              onPress={(id) => navigation.navigate('DiscoverTab', {
                screen: 'CompanionProfileScreen',
                params: { id }
              })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.success,
  },
  statusText: {
    fontSize: 15,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  filtersWrapper: {
    marginBottom: 16,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  pillBtn: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  pillBtnActive: {
    backgroundColor: theme.colors.primary,
  },
  pillBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  pillBtnTextActive: {
    color: theme.colors.background,
  },
  infoBar: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  infoBarText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
});
