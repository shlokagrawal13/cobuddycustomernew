import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme';
import { Button } from '../../components/ui/Button';
import { BottomActionBar } from '../../components/ui/BottomActionBar';
import { OnboardingHeader } from '../../components/onboarding/OnboardingHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

export const INTERESTS_DATA = [
  { id: 'cafe', label: 'Cafe Meetup', icon: 'coffee-outline' },
  { id: 'movie', label: 'Movie Companion', icon: 'movie-open-outline' },
  { id: 'tour', label: 'Local Tour', icon: 'map-marker-path' },
  { id: 'event', label: 'Event Partner', icon: 'ticket-confirmation-outline' },
  { id: 'gym', label: 'Gym Buddy', icon: 'weight-lifter' },
  { id: 'shopping', label: 'Shopping Assistant', icon: 'shopping-outline' },
  { id: 'dining', label: 'Fine Dining', icon: 'silverware-fork-knife' },
  { id: 'art', label: 'Art Gallery', icon: 'palette-outline' },
  { id: 'network', label: 'Networking', icon: 'handshake-outline' },
  { id: 'wellness', label: 'Yoga & Wellness', icon: 'yoga' },
  { id: 'language', label: 'Language Exchange', icon: 'earth' },
  { id: 'music', label: 'Live Concerts', icon: 'music-note-outline' },
];

const MIN_SELECT = 3;
const MAX_SELECT = 10;

export const InterestSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { t } = useTranslation(['onboarding']);
  
  const isEditMode = route.params?.isEditMode || false;
  const initialInterests = route.params?.initialInterests || ['coffee', 'art', 'wellness'];

  const [selected, setSelected] = useState<Set<string>>(new Set(initialInterests));

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); }
      else if (next.size < MAX_SELECT) { next.add(id); }
      else { Alert.alert('Limit Reached', `You can select up to ${MAX_SELECT} interests.`); }
      return next;
    });
  };

  const count = selected.size;
  const isValid = count >= MIN_SELECT;

  const handleNext = () => {
      if (isEditMode) {
          // Pass data back to EditProfileScreen
          navigation.navigate({
              name: 'EditProfileScreen',
              params: { updatedInterests: Array.from(selected) },
              merge: true,
          });
      } else {
          navigation.navigate('SafetyTutorialScreen');
      }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <OnboardingHeader
        showBack={navigation.canGoBack()}
        onBack={() => navigation.goBack()}
        centerLabel={isEditMode ? 'Edit Interests' : t('interests.header')}
        showProgress={!isEditMode}
        currentStep={3}
        totalSteps={5}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.headline}>{isEditMode ? 'Update Your Interests' : t('interests.title')}</Text>
        <Text style={styles.subheadline}>{t('interests.subtitle')}</Text>

        <View style={styles.grid}>
          {INTERESTS_DATA.map(item => {
            const active = selected.has(item.id);
            return (
              <TouchableOpacity key={item.id} style={[styles.tile, active && styles.tileActive]} onPress={() => toggle(item.id)} activeOpacity={0.8}>
                <View style={[styles.tileIconWrap, active && styles.tileIconWrapActive]}>
                  <Icon name={item.icon} size={22} color={active ? theme.colors.primary : theme.colors.textSecondary} />
                </View>
                <Text style={[styles.tileLabel, active && styles.tileLabelActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Icon name="information-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.footerInfoText}>{t('interests.footer_info', { min: MIN_SELECT, count: count })}</Text>
          </View>
          <Text style={styles.footerMax}>{t('interests.footer_max', { max: MAX_SELECT })}</Text>
        </View>
      </ScrollView>

      <BottomActionBar>
        <Button
          title={isEditMode ? 'Save Interests' : t('interests.btn_continue')}
          onPress={handleNext}
          disabled={!isValid}
        />
      </BottomActionBar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20 },
  headline: { fontSize: 28, color: theme.colors.textPrimary, lineHeight: 36, letterSpacing: -0.3, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  subheadline: { fontSize: 16, color: theme.colors.textSecondary, lineHeight: 25, textAlign: 'center', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 20 },
  tile: { width: '47%', backgroundColor: theme.colors.surface, borderRadius: 24, borderWidth: 1, borderColor: theme.colors.border, padding: 20, alignItems: 'center', gap: 10 },
  tileActive: { borderColor: 'rgba(212,175,55,0.8)', backgroundColor: 'rgba(212,175,55,0.08)' },
  tileIconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  tileIconWrapActive: {},
  tileLabel: { fontSize: 11, letterSpacing: 1.5, color: theme.colors.textSecondary, fontWeight: '600', textAlign: 'center', textTransform: 'uppercase' },
  tileLabelActive: { color: theme.colors.primary },
  footer: { alignItems: 'center', gap: 6, marginBottom: 14 },
  footerInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerInfoText: { fontSize: 14, color: theme.colors.textSecondary },
  footerMax: { fontSize: 10, letterSpacing: 2, color: theme.colors.textSecondary, opacity: 0.4, textTransform: 'uppercase' },
});
