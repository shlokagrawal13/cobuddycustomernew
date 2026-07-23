import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const VerificationSuccessScreen = () => {
  const navigation = useNavigation<any>();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const handleContinue = () => {
    // If KYC was opened from another flow (like Booking), return to it.
    const parent = navigation.getParent();
    if (parent && parent.canGoBack()) {
      parent.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'MainTabNavigator' }] });
    }
  };

  const isFromFlow = navigation.getParent()?.canGoBack();

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.content}>
        <Animated.View style={[
          styles.iconContainer,
          { 
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim 
          }
        ]}>
          <View style={styles.glow} />
          <Icon name="check-decagram" size={90} color={theme.colors.success} />
        </Animated.View>

        <Animated.View style={{ opacity: opacityAnim, alignItems: 'center' }}>
          <Text style={styles.title}>You are Verified!</Text>
          <Text style={styles.subtitle}>
            Your identity has been successfully verified. You now have full access to CoBuddy and can start booking companions immediately.
          </Text>

          <View style={styles.badgeRow}>
            <View style={styles.perkBadge}>
              <Icon name="star-circle" size={16} color={theme.colors.primary} />
              <Text style={styles.perkText}>Trusted Profile</Text>
            </View>
            <View style={styles.perkBadge}>
              <Icon name="shield-check" size={16} color={theme.colors.primary} />
              <Text style={styles.perkText}>Booking Access</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.btn}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>{isFromFlow ? 'Continue' : 'Start Exploring'}</Text>
          <Icon name={isFromFlow ? "check" : "arrow-right"} size={20} color={theme.colors.background} />
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.colors.success,
    opacity: 0.15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  perkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  perkText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 40,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnText: {
    color: theme.colors.background,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
