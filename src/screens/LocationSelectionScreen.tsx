import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const RECENT_LOCATIONS = [
    { id: '1', mainText: 'Mumbai, MH', subText: 'Maharashtra, India', icon: 'map-marker-outline' },
    { id: '2', mainText: 'Bandra West', subText: 'Mumbai, MH', icon: 'history' },
    { id: '3', mainText: 'Andheri East', subText: 'Mumbai, MH', icon: 'history' },
];

export const LocationSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
      setIsLocating(true);
      // Simulate GPS fetch
      setTimeout(() => {
          setIsLocating(false);
          Alert.alert('Location Found', 'Detected: Bandra Kurla Complex, Mumbai.', [
              { text: 'Use this', onPress: () => {
                  navigation.navigate({
                      name: 'EditProfileScreen',
                      params: { updatedCity: 'Mumbai, MH' },
                      merge: true,
                  });
              }},
              { text: 'Cancel', style: 'cancel' }
          ]);
      }, 1500);
  };

  const handleSelectLocation = (location: string) => {
      navigation.navigate({
          name: 'EditProfileScreen',
          params: { updatedCity: location },
          merge: true,
      });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
              <Icon name="magnify" size={22} color={theme.colors.textSecondary} style={styles.searchIcon} />
              <TextInput 
                  style={styles.searchInput}
                  placeholder="Search city, area, or landmark"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={true}
              />
              {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                      <Icon name="close-circle" size={20} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
              )}
          </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {searchQuery.length === 0 && (
            <TouchableOpacity 
                style={styles.gpsBtn} 
                activeOpacity={0.7}
                onPress={handleUseCurrentLocation}
                disabled={isLocating}
            >
                {isLocating ? (
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                ) : (
                    <Icon name="crosshairs-gps" size={22} color={theme.colors.primary} />
                )}
                <View style={styles.gpsMeta}>
                    <Text style={styles.gpsTitle}>Use Current Location</Text>
                    <Text style={styles.gpsSub}>Enable GPS for accurate meetups</Text>
                </View>
                <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
        )}

        {searchQuery.length === 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>RECENT & SAVED</Text>
                <View style={styles.card}>
                    {RECENT_LOCATIONS.map((loc, index) => (
                        <TouchableOpacity 
                            key={loc.id} 
                            style={[styles.row, index !== RECENT_LOCATIONS.length - 1 && styles.borderBottom]}
                            activeOpacity={0.7}
                            onPress={() => handleSelectLocation(loc.mainText)}
                        >
                            <View style={styles.iconWrap}>
                                <Icon name={loc.icon} size={20} color={theme.colors.textSecondary} />
                            </View>
                            <View style={styles.meta}>
                                <Text style={styles.title}>{loc.mainText}</Text>
                                <Text style={styles.sub}>{loc.subText}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )}

        {searchQuery.length > 0 && (
            <View style={styles.section}>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={() => handleSelectLocation(searchQuery)}>
                        <View style={styles.iconWrap}>
                            <Icon name="map-marker" size={20} color={theme.colors.primary} />
                        </View>
                        <View style={styles.meta}>
                            <Text style={styles.title}>{searchQuery}</Text>
                            <Text style={styles.sub}>Tap to select this location</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.surface },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  searchIcon: { paddingHorizontal: 12 },
  searchInput: { flex: 1, height: 48, fontSize: 16, color: theme.colors.textPrimary },
  clearBtn: { padding: 12 },

  scrollContent: { padding: 16, paddingBottom: 40 },
  
  gpsBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(212, 175, 55, 0.08)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)', padding: 16, marginBottom: 24 },
  gpsMeta: { flex: 1, paddingLeft: 12 },
  gpsTitle: { fontSize: 15, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 2 },
  gpsSub: { fontSize: 12, color: theme.colors.textSecondary },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 12, marginLeft: 8 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  iconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  meta: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  sub: { fontSize: 13, color: theme.colors.textSecondary },
});
