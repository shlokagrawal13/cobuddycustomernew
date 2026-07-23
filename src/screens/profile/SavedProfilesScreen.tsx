import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { AppBottomSheet } from '../../components/ui/AppBottomSheet';

const MOCK_SAVED = [
  {
    id: '1',
    name: 'Aisha',
    age: 26,
    rating: 4.9,
    reviews: 128,
    rate: '₹1500/hr',
    location: 'Bandra West, Mumbai',
    tags: ['Nightlife', 'Foodie'],
  },
  {
    id: '2',
    name: 'Kabir',
    age: 29,
    rating: 4.8,
    reviews: 84,
    rate: '₹1200/hr',
    location: 'South Delhi',
    tags: ['Movies', 'Cafes'],
  },
  {
    id: '3',
    name: 'Riya',
    age: 24,
    rating: 5.0,
    reviews: 42,
    rate: '₹2000/hr',
    location: 'Koramangala, Bangalore',
    tags: ['Events', 'Shopping'],
  }
];

export const SavedProfilesScreen = () => {
  const navigation = useNavigation<any>();
  const [savedProfiles, setSavedProfiles] = useState(MOCK_SAVED);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);

  const handleUnsave = (id: string) => {
    setSavedProfiles(prev => prev.filter(p => p.id !== id));
    setShowSheet(false);
  };

  const openOptions = (profile: any) => {
    setSelectedProfile(profile);
    setShowSheet(true);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
        <View style={styles.emptyIconBox}>
            <Icon name="bookmark-outline" size={48} color={theme.colors.primary} />
        </View>
        <Text style={styles.emptyTitle}>No Saved Checklists</Text>
        <Text style={styles.emptySub}>When you find a companion you like, tap the bookmark icon to save their profile here.</Text>
        <TouchableOpacity 
            style={styles.exploreBtn} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DiscoverTab')}
        >
            <Text style={styles.exploreBtnText}>Explore Companions</Text>
        </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CompanionProfileScreen', { companionId: item.id })}
    >
        <View style={styles.imagePlaceholder}>
            <Icon name="account" size={40} color="rgba(255,255,255,0.1)" />
            <TouchableOpacity 
                style={styles.bookmarkBtn}
                activeOpacity={0.7}
                onPress={() => openOptions(item)}
            >
                <Icon name="dots-horizontal" size={20} color={theme.colors.background} />
            </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.name}, {item.age}</Text>
                <Text style={styles.rate}>{item.rate}</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.ratingBox}>
                    <Icon name="star" size={14} color={theme.colors.background} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
                <View style={styles.dot} />
                <Icon name="map-marker" size={12} color={theme.colors.textSecondary} />
                <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
            </View>

            <View style={styles.tagsRow}>
                {item.tags.map((tag: string) => (
                    <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Checklists</Text>
        <View style={styles.backBtn} />
      </View>

      <FlatList
        data={savedProfiles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={savedProfiles.length === 0 ? styles.emptyList : styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />

      <AppBottomSheet
        visible={showSheet}
        onClose={() => setShowSheet(false)}
        title="Manage Saved Profile"
      >
        <View style={styles.sheetContent}>
            <TouchableOpacity 
                style={styles.sheetAction} 
                activeOpacity={0.7}
                onPress={() => {
                    setShowSheet(false);
                    navigation.navigate('CompanionProfileScreen', { companionId: selectedProfile?.id });
                }}
            >
                <View style={styles.sheetIconBox}>
                    <Icon name="account-outline" size={20} color={theme.colors.textPrimary} />
                </View>
                <Text style={styles.sheetActionText}>View Full Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.sheetAction} 
                activeOpacity={0.7}
                onPress={() => {
                    if(selectedProfile) handleUnsave(selectedProfile.id);
                }}
            >
                <View style={[styles.sheetIconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                    <Icon name="bookmark-off-outline" size={20} color={theme.colors.error} />
                </View>
                <Text style={[styles.sheetActionText, { color: theme.colors.error }]}>Remove from Saved</Text>
            </TouchableOpacity>
        </View>
      </AppBottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  listContent: { padding: 16, gap: 16, paddingBottom: 40 },
  emptyList: { flex: 1, justifyContent: 'center', padding: 24 },
  
  // Empty State
  emptyContainer: { alignItems: 'center', justifyContent: 'center' },
  emptyIconBox: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 12 },
  emptySub: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  exploreBtn: { backgroundColor: theme.colors.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 20, shadowColor: theme.colors.primary, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  exploreBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },

  // Card
  card: { backgroundColor: theme.colors.surface, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: theme.colors.border },
  imagePlaceholder: { height: 160, backgroundColor: '#1A1D2D', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  bookmarkBtn: { position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  
  cardContent: { padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  name: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  rate: { fontSize: 16, fontWeight: 'bold', color: theme.colors.primary },
  
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginRight: 6 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: theme.colors.background, marginLeft: 2 },
  reviewsText: { fontSize: 12, color: theme.colors.textSecondary, marginRight: 8 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: theme.colors.textSecondary, marginRight: 8 },
  locationText: { fontSize: 12, color: theme.colors.textSecondary, flex: 1, marginLeft: 4 },

  tagsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  tagText: { fontSize: 11, color: theme.colors.textSecondary },

  // Sheet
  sheetContent: { padding: 16, paddingBottom: 24, gap: 12 },
  sheetAction: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  sheetIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  sheetActionText: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary }
});
