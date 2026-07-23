import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const SessionCompleteScreen = () => {
  const navigation = useNavigation<any>();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <Animated.ScrollView contentContainerStyle={styles.scrollContent} style={{ opacity: fadeAnim }}>
        
        <View style={styles.mainArea}>
          <View style={styles.iconCircle}>
            <Icon name="check-decagram" size={64} color={theme.colors.success} />
          </View>

          <Text style={styles.title}>Session Complete!</Text>
          <Text style={styles.subtitle}>We hope you had a fantastic time with Elena.</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>FINAL RECEIPT</Text>
            
            <View style={styles.row}>
              <Text style={styles.label}>Base Session (2 Hrs)</Text>
              <Text style={styles.value}>₹3,000</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Platform Fee (5%)</Text>
              <Text style={styles.value}>₹150</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Taxes (18% GST)</Text>
              <Text style={styles.value}>₹54</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.row}>
              <Text style={[styles.label, { color: theme.colors.textPrimary, fontWeight: 'bold' }]}>Escrow Released</Text>
              <Text style={[styles.value, { color: theme.colors.success }]}>₹3,204</Text>
            </View>

            <Text style={styles.invoiceNote}>
              <Icon name="email-check-outline" size={14} color={theme.colors.textSecondary} /> An official invoice has been sent to your registered email.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.primaryBtn} 
            onPress={() => navigation.navigate('PostSessionFeedbackScreen')}
          >
            <Text style={styles.primaryBtnText}>Continue to Feedback</Text>
          </TouchableOpacity>
        </View>

      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'space-between' },
  mainArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(16, 185, 129, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  
  title: { fontSize: 28, fontWeight: '900', color: theme.colors.textPrimary, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: theme.colors.textSecondary, marginBottom: 40, textAlign: 'center' },

  card: { width: '100%', backgroundColor: theme.colors.surface, borderRadius: 20, padding: 24, borderWidth: 1, borderColor: theme.colors.border },
  cardTitle: { fontSize: 12, fontWeight: '900', color: theme.colors.textSecondary, letterSpacing: 1.5, marginBottom: 20, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  label: { fontSize: 15, color: theme.colors.textSecondary },
  value: { fontSize: 16, color: theme.colors.textPrimary, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 12 },
  
  invoiceNote: { fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', marginTop: 8 },

  footer: { width: '100%', marginTop: 40, paddingBottom: 20 },
  primaryBtn: { width: '100%', backgroundColor: theme.colors.primary, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  primaryBtnText: { color: theme.colors.background, fontSize: 16, fontWeight: 'bold' },
});
