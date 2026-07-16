import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { CompanionCard } from '../components/ui/CompanionCard';

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

const FILTER_STATUS = ['All', 'Available Today', 'Top Rated', 'Nearby'];
const MODAL_CATEGORIES = [
  { id: 'coffee', label: 'Coffee Meetups' },
  { id: 'movie', label: 'Movie Buffs' },
  { id: 'study', label: 'Study Buddy' },
  { id: 'city', label: 'City Walk' },
];

export const DiscoverScreen = () => {
  const { t } = useTranslation(['discover']);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Sync navigation params to search bar
  useEffect(() => {
    const initialCategory = route.params?.category;
    if (initialCategory) {
      // Find the label for the category ID to put in the search bar
      const cat = MODAL_CATEGORIES.find(c => c.id === initialCategory);
      if (cat) {
        setSearchQuery(cat.label);
      } else {
        setSearchQuery(initialCategory);
      }
    }
  }, [route.params?.category]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeStatus, searchQuery]);

  const filteredCompanions = DUMMY_COMPANIONS.filter(c => {
    const matchesSearch = searchQuery === '' || 
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.activities.some(act => act.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Simple mock logic for status filters
    let matchesStatus = true;
    if (activeStatus === 'Available Today') matchesStatus = c.isOnline === true;
    if (activeStatus === 'Top Rated') matchesStatus = c.rating >= 4.95;
    // Nearby would normally check distance logic
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectCategory = (label: string) => {
    setSearchQuery(label);
    setIsFilterVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setIsFilterVisible(true)}>
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

        {/* Quick Status Filters */}
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {filteredCompanions.length} companions available now
          </Text>
        </View>

        <View style={styles.filtersWrapper}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FILTER_STATUS}
            keyExtractor={item => item}
            contentContainerStyle={styles.filtersList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterPill,
                  activeStatus === item && styles.filterPillActive
                ]}
                onPress={() => setActiveStatus(item)}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    activeStatus === item && styles.filterPillTextActive
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoBarText}>
            Filter: {activeStatus} | Showing: {filteredCompanions.length} of {DUMMY_COMPANIONS.length}
          </Text>
        </View>
      </View>

      {/* Content */}
      <FlatList
        data={filteredCompanions}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CompanionCard
            {...item}
            onPress={(id) => navigation.navigate('CompanionProfileScreen', { id })}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('no_results')}</Text>
          </View>
        )}
      />

      {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setIsFilterVisible(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                <Icon name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSectionTitle}>Activity Types</Text>
            <View style={styles.modalCategories}>
              {MODAL_CATEGORIES.map((cat) => (
                <TouchableOpacity 
                  key={cat.id} 
                  style={[
                    styles.modalCatBtn,
                    searchQuery === cat.label && styles.modalCatBtnActive
                  ]}
                  onPress={() => handleSelectCategory(cat.label)}
                >
                  <Text style={[
                    styles.modalCatText,
                    searchQuery === cat.label && styles.modalCatTextActive
                  ]}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Placeholder for future filters */}
            <Text style={styles.modalSectionTitle}>Price Range (Hourly)</Text>
            <Text style={styles.modalPlaceholderText}>Pricing filters coming soon...</Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    marginBottom: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: '600',
  },
  filtersWrapper: {
    marginBottom: 12,
  },
  filtersList: {
    paddingRight: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterPillText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  filterPillTextActive: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  infoBar: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  infoBarText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '40%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
    marginTop: 8,
  },
  modalCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modalCatBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  modalCatBtnActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  modalCatText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  modalCatTextActive: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  modalPlaceholderText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  }
});
