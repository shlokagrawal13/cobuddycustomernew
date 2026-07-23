import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { Button } from '../../components/ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');

const TRUST_PILLARS = [
  { icon: 'shield-check-outline', label: 'Verified' },
  { icon: 'lock-outline', label: 'Secure' },
  { icon: 'account-heart-outline', label: 'Respectful' },
];

export const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation(['onboarding']);
  
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroY = useRef(new Animated.Value(24)).current;
  const actionsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(heroOpacity, { toValue: 1, duration: 550, useNativeDriver: true }),
        Animated.timing(heroY, { toValue: 0, duration: 550, useNativeDriver: true }),
      ]),
      Animated.timing(actionsOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
    ]).start();
  }, [heroOpacity, heroY, actionsOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={styles.bgGlow} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
        {/* Hero */}
        <Animated.View style={[styles.hero, { opacity: heroOpacity, transform: [{ translateY: heroY }] }]}>
          <View style={styles.heroImageBox}>
            <Icon name="account-group-outline" size={72} color={theme.colors.primary} style={styles.heroGlyph} />
            <View style={styles.heroOverlay} />
          </View>

          <Text style={styles.overline}>COBUDDY CUSTOMER</Text>
          <Text style={styles.heroTitle}>{t('welcome.title')}</Text>
          <Text style={styles.heroSubtitle}>
            {t('welcome.subtitle')}
          </Text>
        </Animated.View>

        {/* Trust pillars */}
        <Animated.View style={[styles.pillars, { opacity: actionsOpacity }]}>
          {TRUST_PILLARS.map(p => (
            <View key={p.label} style={styles.pillar}>
              <Icon name={p.icon} size={20} color={theme.colors.textSecondary} />
              <Text style={styles.pillarLabel}>{p.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Actions */}
        <Animated.View style={[styles.actions, { opacity: actionsOpacity }]}>
          <Button
            title={t('welcome.get_started')}
            onPress={() => navigation.navigate('PhoneLoginScreen')}
          />
        </Animated.View>

        {/* Footer links */}
        <View style={styles.footer}>
          <Text style={styles.footerItem}>
            {t('welcome.disclaimer_part1')}
            <Text style={{ textDecorationLine: 'underline' }}>{t('welcome.terms')}</Text>
            {t('welcome.and')}
            <Text style={{ textDecorationLine: 'underline' }}>{t('welcome.privacy')}</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  bgGlow: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: SCREEN_W * 0.8,
    height: SCREEN_W * 0.8,
    borderRadius: SCREEN_W * 0.4,
    backgroundColor: 'rgba(212,175,55,0.04)', // Gold glow
  },
  safe: { flex: 1, paddingHorizontal: 20 },

  hero: { flex: 1, justifyContent: 'flex-end', paddingBottom: 20 },
  heroImageBox: {
    height: SCREEN_H * 0.36,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  heroGlyph: { opacity: 0.18 },
  heroOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '60%',
    backgroundColor: 'rgba(11,13,26,0.5)',
  },
  overline: {
    fontSize: 10,
    letterSpacing: 3,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 32,
    color: theme.colors.textPrimary,
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },

  pillars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    marginBottom: 20,
  },
  pillar: { alignItems: 'center', gap: 5 },
  pillarLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  actions: { gap: 10, marginBottom: 12 },

  footer: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 16 },
  footerItem: { fontSize: 11, color: theme.colors.textSecondary },
  footerDot: { color: theme.colors.textSecondary },
});
