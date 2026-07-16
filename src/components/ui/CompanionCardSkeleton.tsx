import React from 'react';
import { View } from 'react-native';
import { theme } from '../../theme';
import { SkeletonLoader } from './SkeletonLoader';

export const CompanionCardSkeleton = () => (
  <View style={{
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  }}>
    {/* Top Section */}
    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
      {/* Avatar */}
      <SkeletonLoader width={64} height={64} borderRadius={32} />
      {/* Info Col */}
      <View style={{ marginLeft: 16, flex: 1, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <SkeletonLoader width={120} height={20} borderRadius={4} />
          <SkeletonLoader width={40} height={18} borderRadius={9} style={{ marginLeft: 8 }} />
        </View>
        <SkeletonLoader width={180} height={16} borderRadius={4} style={{ marginBottom: 8 }} />
        <SkeletonLoader width={220} height={14} borderRadius={4} style={{ marginBottom: 6 }} />
        <SkeletonLoader width={100} height={14} borderRadius={4} />
      </View>
    </View>

    {/* Chips Section */}
    <View style={{ flexDirection: 'row', marginBottom: 16, gap: 8 }}>
      <SkeletonLoader width={70} height={26} borderRadius={13} />
      <SkeletonLoader width={90} height={26} borderRadius={13} />
    </View>

    {/* Bottom Section */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <SkeletonLoader width={120} height={24} borderRadius={4} />
      <SkeletonLoader width={110} height={40} borderRadius={20} />
    </View>
  </View>
);
