import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const CompanionReviewScreen = () => {
  const navigation = useNavigation<any>();
  const [rating, setRating] = useState(0);
  const [publicReview, setPublicReview] = useState('');
  const [privateFeedback, setPrivateFeedback] = useState('');

  const COMPANION_NAME = 'Elena Vasquez';

  const handleFinish = () => {
    // End of Live Session Flow. Reset stack to MainTabNavigator
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabNavigator' }],
    });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <View style={styles.iconBtnPlaceholder} />
        <Text style={styles.headerTitle}>Leave a Review</Text>
        <View style={styles.iconBtnPlaceholder} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* Rating Section */}
        <View style={styles.ratingSection}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{COMPANION_NAME.charAt(0)}</Text>
          </View>
          <Text style={styles.question}>Rate your time with {COMPANION_NAME}</Text>
          
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starBtn}>
                <Icon 
                  name={rating >= star ? 'star' : 'star-outline'} 
                  size={48} 
                  color={rating >= star ? theme.colors.primary : theme.colors.textSecondary} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Public Review */}
        <View style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Icon name="comment-text-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.inputTitle}>Public Review</Text>
          </View>
          <Text style={styles.inputDesc}>This will appear on {COMPANION_NAME}'s profile.</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What did you enjoy the most?"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={publicReview}
            onChangeText={setPublicReview}
          />
        </View>

        {/* Private Feedback for Admins */}
        <View style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Icon name="lock-outline" size={20} color={theme.colors.error} />
            <Text style={styles.inputTitle}>Private Feedback (Optional)</Text>
          </View>
          <Text style={styles.inputDesc}>Share anything with the CoBuddy Safety Team. The companion will NOT see this.</Text>
          <TextInput
            style={[styles.textInput, { borderColor: 'rgba(239, 68, 68, 0.2)' }]}
            placeholder="Any concerns or private notes?"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={privateFeedback}
            onChangeText={setPrivateFeedback}
          />
        </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[styles.primaryBtn, rating === 0 && { opacity: 0.5 }]} 
          disabled={rating === 0}
          onPress={handleFinish}
        >
          <Text style={styles.primaryBtnText}>Submit & Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  iconBtnPlaceholder: { width: 40, height: 40 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  content: { padding: 24, paddingBottom: 60, flexGrow: 1 },
  
  ratingSection: { alignItems: 'center', marginBottom: 40 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: theme.colors.primary, marginBottom: 16 },
  avatarInitials: { color: theme.colors.primary, fontSize: 32, fontWeight: 'bold' },
  question: { fontSize: 20, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 24, textAlign: 'center' },
  starsRow: { flexDirection: 'row', gap: 8 },
  starBtn: { padding: 4 },

  inputCard: { backgroundColor: theme.colors.surface, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 24 },
  inputHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  inputTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },
  inputDesc: { fontSize: 13, color: theme.colors.textSecondary, marginBottom: 16, lineHeight: 20 },
  textInput: { backgroundColor: theme.colors.background, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, color: theme.colors.textPrimary, padding: 16, fontSize: 15, minHeight: 120 },

  bottomBar: { padding: 20, paddingBottom: 32, backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: theme.colors.border },
  primaryBtn: { width: '100%', backgroundColor: theme.colors.primary, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
});
