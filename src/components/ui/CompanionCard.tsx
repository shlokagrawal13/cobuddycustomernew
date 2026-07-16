import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

interface CompanionCardProps {
  id: string;
  name: string;
  photoUrl: string;
  activities: string[];
  trustScore: number;
  rating?: number;
  distance?: string;
  availability?: string;
  isVerified?: boolean;
  onPress: (id: string) => void;
}

export const CompanionCard = ({
  id,
  name,
  photoUrl,
  activities,
  trustScore,
  rating = 4.9, // Default for now
  distance = 'Nearby',
  availability = 'Available Today',
  isVerified = true,
  onPress,
}: CompanionCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress(id)}>
      
      <Image
        source={{ uri: photoUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        
        {/* Row 1: Name and Verified Badge */}
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          {isVerified && (
            <View style={styles.verifiedBadge}>
              <Icon name="check-decagram" size={14} color={theme.colors.success} />
              <Text style={styles.verifiedText}>ID Verified</Text>
            </View>
          )}
        </View>
        
        {/* Row 2: Trust & Rating Info */}
        <View style={styles.statsRow}>
          <Icon name="star" size={14} color={theme.colors.primary} />
          <Text style={styles.statsText}>{rating} · {trustScore}% Trust</Text>
        </View>

        {/* Row 3: Utility Info (Distance / Availability) */}
        <View style={styles.utilityRow}>
          <Icon name="map-marker-outline" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.utilityText}>{distance}</Text>
          <Text style={styles.dotSeparator}>·</Text>
          <Icon name="clock-outline" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.utilityText}>{availability}</Text>
        </View>

        {/* Row 4: Activity Chips */}
        <View style={styles.activitiesRow}>
          {activities.slice(0, 3).map((act, idx) => (
            <View key={idx} style={styles.activityChip}>
              <Text style={styles.activityChipText}>{act}</Text>
            </View>
          ))}
        </View>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  verifiedText: {
    fontSize: 10,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  statsText: {
    fontSize: 13,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  utilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 4,
  },
  utilityText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  dotSeparator: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginHorizontal: 2,
  },
  activitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  activityChip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activityChipText: {
    fontSize: 11,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
});
