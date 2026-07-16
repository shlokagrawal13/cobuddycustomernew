import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, DimensionValue, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface SkeletonLoaderProps {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle;
  borderRadius?: number;
}

export const SkeletonLoader = ({
  width = '100%',
  height = 20,
  style,
  borderRadius = 8,
}: SkeletonLoaderProps) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.surface, 'rgba(212, 175, 55, 0.1)'], // Pulses slightly with a golden hint over surface
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, backgroundColor },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
});
