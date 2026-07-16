import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
    name: 'Sarah',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    activities: ['Coffee', 'City Tours', 'Conversation'],
    trustScore: 98,
    distance: '2.5 km away',
    availability: 'Available Today',
    category: 'conversation',
  },
  {
    id: 'c2',
    name: 'Michael',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    activities: ['Movies', 'Events', 'Study'],
    trustScore: 95,
    distance: '4.0 km away',
    availability: 'Available Tomorrow',
    category: 'movie',
  },
  {
    id: 'c3',
    name: 'Priya',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    activities: ['Coffee', 'Study Buddy'],
    trustScore: 99,
    distance: '1.2 km away',
    availability: 'Available Now',
    category: 'coffee',
  },
];

export const DiscoverScreen = () => {
  const { t } = useTranslation(['discover']);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const initialCategory = route.params?.category || null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [loading, setLoading] = useState(true);

  // Re-check route params in case user navigated from Home dashboard again
  useEffect(() => {
    if (route.params?.category) {
      setActiveCategory(route.params.category);
    }
  }, [route.params?.category]);

  useEffect(() => {
    // Simulate network fetch
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory]);

  const filteredCompanions = DUMMY_COMPANIONS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.activities.some(act => act.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory ? c.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="account-search-outline" size={64} color={theme.colors.border} />
      <Text style={styles.emptyTitle}>{t('empty_state.title')}</Text>
      <Text style={styles.emptyMessage}>{t('empty_state.message')}</Text>
      <TouchableOpacity
        style={styles.clearBtn}
        onPress={() => {
          setSearchQuery('');
          setActiveCategory(null);
        }}
      >
        <Text style={styles.clearBtnText}>{t('empty_state.btn_clear')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('header')}</Text>
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

      {/* Filter Chips */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          <TouchableOpacity 
            style={[styles.filterChip, activeCategory && styles.filterChipActive]}
            onPress={() => setActiveCategory(null)}
          >
            <Text style={[styles.filterChipText, activeCategory && styles.filterChipTextActive]}>
              {activeCategory ? activeCategory.toUpperCase() : t('filters.activity')}
            </Text>
            <Icon name="chevron-down" size={16} color={activeCategory ? theme.colors.background : theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>{t('filters.distance')}</Text>
            <Icon name="chevron-down" size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>{t('filters.language')}</Text>
            <Icon name="chevron-down" size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Results List */}
      {loading ? (
        <ScrollView contentContainerStyle={styles.listContent}>
          <SkeletonLoader height={250} borderRadius={16} style={{ marginBottom: 16 }} />
          <SkeletonLoader height={250} borderRadius={16} style={{ marginBottom: 16 }} />
          <SkeletonLoader height={250} borderRadius={16} />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredCompanions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
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
  filtersWrapper: {
    marginBottom: 16,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 22,
    marginBottom: 24,
  },
  clearBtn: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  clearBtnText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
});
