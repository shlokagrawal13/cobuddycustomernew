import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

export const VerificationPendingScreen = () => {
  const navigation = useNavigation<any>();

  const handleContinue = () => {
    // Return to the main app flow
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="shield-check" size={80} color={theme.colors.success} />
        </View>

        <Text style={styles.title}>You are Verified!</Text>
        <Text style={styles.subtitle}>
          Your identity has been successfully verified. You can now send booking requests and interact with companions.
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.btn}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Continue to App</Text>
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 40,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: theme.colors.background,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
