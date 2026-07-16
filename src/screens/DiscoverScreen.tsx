import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
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
    gender: 'Female',
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
    gender: 'Male',
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
    gender: 'Female',
  },
];

const FILTER_STATUS = ['All', 'Available Today', 'Top Rated', 'Nearby'];
const MODAL_CATEGORIES = [
  { id: 'coffee', label: 'Coffee Meetups' },
  { id: 'movie', label: 'Movie Buffs' },
  { id: 'study', label: 'Study Buddy' },
  { id: 'city', label: 'City Walk' },
];
const GENDER_OPTIONS = ['Any', 'Male', 'Female'];
const RATING_OPTIONS = ['Any', '4.0+', '4.5+'];
const DISTANCE_OPTIONS = ['Any', '< 5 km', '< 10 km'];

// --- Custom Slider Component ---
const CustomSlider = ({ value, onValueChange, min, max, step }: any) => {
  const [width, setWidth] = useState(1);

  const updateValue = (e: any) => {
    const x = e.nativeEvent.locationX;
    let percent = x / width;
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;
    const rawVal = min + percent * (max - min);
    const stepped = Math.round(rawVal / step) * step;
    onValueChange(stepped);
  };

  const percentage = (value - min) / (max - min);

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderLabelsRow}>
        <Text style={styles.sliderLabelMinMax}>₹{min}</Text>
        <Text style={styles.sliderLabelValue}>Up to ₹{value} /hr</Text>
        <Text style={styles.sliderLabelMinMax}>₹{max}</Text>
      </View>
      <View 
        style={styles.sliderTrackContainer} 
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => true}
        onResponderMove={updateValue}
        onResponderGrant={updateValue}
      >
        <View pointerEvents="none" style={styles.sliderTrack} />
        <View pointerEvents="none" style={[styles.sliderTrackActive, { width: `${percentage * 100}%` }]} />
        <View pointerEvents="none" style={[styles.sliderThumb, { left: `${percentage * 100}%` }]} />
      </View>
    </View>
  );
};
// -------------------------------

export const DiscoverScreen = () => {
  const { t } = useTranslation(['discover']);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Advanced Filters State
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterGender, setFilterGender] = useState('Any');
  const [filterRating, setFilterRating] = useState('Any');
  const [filterMaxPrice, setFilterMaxPrice] = useState(2000);
  const [filterDistance, setFilterDistance] = useState('Any');
  
  const [loading, setLoading] = useState(true);

  // Sync navigation params to search bar whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const initialCategory = route.params?.category;
      if (initialCategory) {
        const cat = MODAL_CATEGORIES.find(c => c.id === initialCategory);
        if (cat) {
          setSearchQuery(cat.label);
        } else {
          setSearchQuery(initialCategory);
        }
        // Clear params so it doesn't get stuck if user clears search and re-focuses
        navigation.setParams({ category: undefined });
      }
    }, [route.params?.category])
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeStatus, searchQuery, filterGender, filterRating, filterMaxPrice, filterDistance]);

  const filteredCompanions = DUMMY_COMPANIONS.filter(c => {
    // Search match
    const matchesSearch = searchQuery === '' || 
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.activities.some(act => act.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          MODAL_CATEGORIES.find(m => m.label.toLowerCase() === searchQuery.toLowerCase())?.id === c.category;
    
    // Quick status filters
    let matchesStatus = true;
    if (activeStatus === 'Available Today') matchesStatus = c.isOnline === true;
    if (activeStatus === 'Top Rated') matchesStatus = c.rating >= 4.95;
    
    // Advanced Filters
    let matchesGender = true;
    if (filterGender !== 'Any') matchesGender = c.gender === filterGender;
    
    let matchesRating = true;
    if (filterRating === '4.0+') matchesRating = c.rating >= 4.0;
    if (filterRating === '4.5+') matchesRating = c.rating >= 4.5;

    let matchesPrice = true;
    const rateValue = parseInt(c.rate.replace(/\D/g, ''), 10);
    matchesPrice = rateValue <= filterMaxPrice;

    let matchesDistance = true;
    const distValue = parseFloat(c.distance);
    if (filterDistance === '< 5 km') matchesDistance = distValue < 5.0;
    if (filterDistance === '< 10 km') matchesDistance = distValue < 10.0;
    
    return matchesSearch && matchesStatus && matchesGender && matchesRating && matchesPrice && matchesDistance;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterGender('Any');
    setFilterRating('Any');
    setFilterMaxPrice(2000);
    setFilterDistance('Any');
    setActiveStatus('All');
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
            {/* Show badge if advanced filters are active */}
            {(filterGender !== 'Any' || filterRating !== 'Any' || filterMaxPrice < 2000 || filterDistance !== 'Any') && (
              <View style={styles.filterBadge} />
            )}
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
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
              <Icon name="close-circle" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Status Filters */}
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
            Showing {filteredCompanions.length} companions
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
            <Icon name="account-search-outline" size={48} color={theme.colors.border} />
            <Text style={styles.emptyText}>No companions found</Text>
            <TouchableOpacity onPress={clearAllFilters} style={styles.clearAllBtn}>
              <Text style={styles.clearAllBtnText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Polished Filter Modal */}
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
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScroll}>
              
              {/* Categories */}
              <Text style={styles.modalSectionTitle}>Activity Type</Text>
              <View style={styles.modalOptionsGrid}>
                {MODAL_CATEGORIES.map((cat) => (
                  <TouchableOpacity 
                    key={cat.id} 
                    style={[
                      styles.modalOptionBtn,
                      searchQuery === cat.label && styles.modalOptionBtnActive
                    ]}
                    onPress={() => setSearchQuery(searchQuery === cat.label ? '' : cat.label)}
                  >
                    <Text style={[
                      styles.modalOptionText,
                      searchQuery === cat.label && styles.modalOptionTextActive
                    ]}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Gender */}
              <Text style={styles.modalSectionTitle}>Gender</Text>
              <View style={styles.modalOptionsGrid}>
                {GENDER_OPTIONS.map((g) => (
                  <TouchableOpacity 
                    key={g} 
                    style={[
                      styles.modalOptionBtn,
                      filterGender === g && styles.modalOptionBtnActive
                    ]}
                    onPress={() => setFilterGender(g)}
                  >
                    <Text style={[
                      styles.modalOptionText,
                      filterGender === g && styles.modalOptionTextActive
                    ]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Price Range Slider */}
              <Text style={styles.modalSectionTitle}>Maximum Hourly Rate</Text>
              <CustomSlider 
                value={filterMaxPrice} 
                onValueChange={setFilterMaxPrice} 
                min={200} 
                max={2000} 
                step={50} 
              />

              {/* Rating */}
              <Text style={styles.modalSectionTitle}>Minimum Rating</Text>
              <View style={styles.modalOptionsGrid}>
                {RATING_OPTIONS.map((r) => (
                  <TouchableOpacity 
                    key={r} 
                    style={[
                      styles.modalOptionBtn,
                      filterRating === r && styles.modalOptionBtnActive
                    ]}
                    onPress={() => setFilterRating(r)}
                  >
                    <Text style={[
                      styles.modalOptionText,
                      filterRating === r && styles.modalOptionTextActive
                    ]}>
                      {r} {r !== 'Any' && <Icon name="star" size={14} color={filterRating === r ? theme.colors.primary : theme.colors.textSecondary} />}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Distance */}
              <Text style={styles.modalSectionTitle}>Distance</Text>
              <View style={styles.modalOptionsGrid}>
                {DISTANCE_OPTIONS.map((d) => (
                  <TouchableOpacity 
                    key={d} 
                    style={[
                      styles.modalOptionBtn,
                      filterDistance === d && styles.modalOptionBtnActive
                    ]}
                    onPress={() => setFilterDistance(d)}
                  >
                    <Text style={[
                      styles.modalOptionText,
                      filterDistance === d && styles.modalOptionTextActive
                    ]}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalClearBtn} onPress={clearAllFilters}>
                <Text style={styles.modalClearBtnText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalApplyBtn} onPress={() => setIsFilterVisible(false)}>
                <Text style={styles.modalApplyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>

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
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
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
  clearSearchBtn: {
    padding: 4,
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
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  clearAllBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  clearAllBtnText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  
  // Polished Modal Styles
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  modalScroll: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: 24,
    marginBottom: 16,
  },
  modalOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modalOptionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  modalOptionBtnActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: theme.colors.primary,
  },
  modalOptionText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  modalOptionTextActive: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    gap: 16,
  },
  modalClearBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalClearBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  modalApplyBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalApplyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  
  // Custom Slider Styles
  sliderContainer: {
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  sliderLabelsRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12,
  },
  sliderLabelMinMax: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  sliderLabelValue: {
    color: theme.colors.primary, 
    fontWeight: 'bold',
    fontSize: 14,
  },
  sliderTrackContainer: {
    height: 40, 
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 6, 
    backgroundColor: theme.colors.border, 
    borderRadius: 3,
  },
  sliderTrackActive: {
    position: 'absolute', 
    left: 0, 
    height: 6, 
    backgroundColor: theme.colors.primary, 
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute', 
    marginLeft: -12, 
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    backgroundColor: '#fff',
    borderWidth: 2, 
    borderColor: theme.colors.primary,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3, 
    elevation: 5,
  }
});
