import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';

// MOCK: Replace with actual companion's services from Zustand/API
const ACTIVITIES = [
  { id: 'a1', title: 'Coffee Meetup', icon: 'coffee-outline', price: '₹500/hr', description: 'A relaxed conversation over a cup of coffee.' },
  { id: 'a2', title: 'Movie Companion', icon: 'popcorn', price: '₹800/hr', description: 'Watch a movie together and discuss it later.' },
  { id: 'a3', title: 'City Tour', icon: 'city-variant-outline', price: '₹1000/hr', description: 'Explore the best local spots and hidden gems.' },
  { id: 'a4', title: 'Gaming Session', icon: 'controller-classic-outline', price: '₹600/hr', description: 'Arcade, bowling, or console gaming.' },
];

export const BookingActivitySelectScreen = () => {
  const navigation = useNavigation<any>();
  const { smartGoBack } = useSmartNavigation();
  const { t } = useTranslation(['booking']); // Use a booking namespace ideally
  
  // State for selected activity
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedActivityId) return;
    
    const selectedActivity = ACTIVITIES.find(a => a.id === selectedActivityId);
    // TODO: Dispatch selected activity to a booking flow Zustand store
    
    navigation.navigate('BookingVenueSelectScreen', {
      activity: selectedActivity,
    });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Top Header & Progress */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 1 of 4</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '25%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What would you like to do?</Text>
        <Text style={styles.subtitle}>Select an activity for your booking request.</Text>

        <View style={styles.listContainer}>
          {ACTIVITIES.map((activity) => {
            const isSelected = selectedActivityId === activity.id;
            return (
              <TouchableOpacity
                key={activity.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedActivityId(activity.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
                  <Icon 
                    name={activity.icon} 
                    size={24} 
                    color={isSelected ? theme.colors.background : theme.colors.primary} 
                  />
                </View>
                
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                    {activity.title}
                  </Text>
                  <Text style={[styles.cardDesc, isSelected && styles.cardDescSelected]}>
                    {activity.description}
                  </Text>
                </View>
                
                <Text style={[styles.cardPrice, isSelected && styles.cardPriceSelected]}>
                  {activity.price}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.nextBtn, !selectedActivityId && styles.nextBtnDisabled]}
          disabled={!selectedActivityId}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={[styles.nextBtnText, !selectedActivityId && styles.nextBtnTextDisabled]}>
            Continue
          </Text>
          <Icon 
            name="arrow-right" 
            size={20} 
            color={selectedActivityId ? theme.colors.background : 'rgba(255,255,255,0.4)'} 
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
    marginBottom: 32,
  },
  listContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardSelected: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: theme.colors.primary,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    lineHeight: 18,
  },
  cardDescSelected: {
    color: 'rgba(212, 175, 55, 0.8)',
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  cardPriceSelected: {
    color: theme.colors.primary,
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
