import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

interface CompanionCardProps {
  id: string;
  name: string;
  photoUrl: string;
  specialty: string;
  trustScore: number;
  onPress: (id: string) => void;
  horizontal?: boolean; // Useful if we want horizontal scroll on home and vertical on discover, but for now we'll stick to a standard card shape
}

export const CompanionCard = ({
  id,
  name,
  photoUrl,
  specialty,
  trustScore,
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
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.trustBadge}>
            <Icon name="shield-check" size={14} color={theme.colors.background} />
            <Text style={styles.trustScore}>{trustScore}</Text>
          </View>
        </View>
        <Text style={styles.specialty} numberOfLines={1}>
          {specialty}
        </Text>
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
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trustScore: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  specialty: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
