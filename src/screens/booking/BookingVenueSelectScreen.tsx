import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

// MOCK: Replace with API response from Safe Venues database
const SAFE_VENUES = [
  { id: 'v1', name: 'Starbucks Reserve', address: '123 Fort, Downtown', icon: 'coffee' },
  { id: 'v2', name: 'Third Wave Coffee', address: 'Bandra West', icon: 'coffee' },
  { id: 'v3', name: 'Phoenix Palladium', address: 'Lower Parel', icon: 'shopping' },
  { id: 'v4', name: 'PVR Cinemas', address: 'Juhu', icon: 'popcorn' },
];

export const BookingVenueSelectScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const route = useRoute<any>();
  const { t } = useTranslation(['booking']);
  
  const { activity } = route.params || {};

  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNext = () => {
    if (!selectedVenueId) return;
    
    const selectedVenue = SAFE_VENUES.find(v => v.id === selectedVenueId) || { name: 'Custom Venue', address: searchQuery };
    
    navigation.navigate('BookingTimeSelectScreen', {
      activity,
      venue: selectedVenue,
    });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Top Header & Progress */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 2 of 4</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '50%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Where do you want to meet?</Text>
        <Text style={styles.subtitle}>Select a safe public venue for {activity?.title || 'this session'}.</Text>

        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search public venues..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Curated Safe Venues</Text>

        <View style={styles.listContainer}>
          {SAFE_VENUES.map((venue) => {
            const isSelected = selectedVenueId === venue.id;
            return (
              <TouchableOpacity
                key={venue.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedVenueId(venue.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
                  <Icon 
                    name={venue.icon} 
                    size={24} 
                    color={isSelected ? theme.colors.background : theme.colors.primary} 
                  />
                </View>
                
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                    {venue.name}
                  </Text>
                  <Text style={[styles.cardDesc, isSelected && styles.cardDescSelected]}>
                    {venue.address}
                  </Text>
                </View>

                {isSelected && (
                  <Icon name="check-circle" size={24} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.nextBtn, !selectedVenueId && styles.nextBtnDisabled]}
          disabled={!selectedVenueId}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={[styles.nextBtnText, !selectedVenueId && styles.nextBtnTextDisabled]}>
            Continue
          </Text>
          <Icon 
            name="arrow-right" 
            size={20} 
            color={selectedVenueId ? theme.colors.background : 'rgba(255,255,255,0.4)'} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  progressContainer: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 32,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardSelected: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: theme.colors.primary,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconWrapSelected: {
    backgroundColor: theme.colors.primary,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  cardTitleSelected: {
    color: theme.colors.primary,
  },
  cardDesc: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  cardDescSelected: {
    color: 'rgba(212, 175, 55, 0.8)',
  },
  bottomBar: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    backgroundColor: theme.colors.surface,
  },
  nextBtn: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    gap: 8,
  },
  nextBtnDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  nextBtnText: {
    color: theme.colors.background,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  nextBtnTextDisabled: {
    color: 'rgba(255,255,255,0.4)',
  },
});
