import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

export const PostSessionFeedbackScreen = () => {
  const navigation = useNavigation<any>();
  const [sentiment, setSentiment] = useState<'up' | 'down' | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const positiveTags = ['Great Listener', 'Punctual', 'Fun & Energetic', 'Dressed Well', 'Polite', 'Safe & Comforting'];
  const negativeTags = ['Late', 'Rude/Unprofessional', 'Catfished/Fake Profile', 'Made me uncomfortable', 'Boring'];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quick Feedback</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TipGratuityScreen')}>
          <Text style={styles.skipBtn}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.question}>How was your session with Elena?</Text>
        
        <View style={styles.sentimentRow}>
          <TouchableOpacity 
            style={[styles.sentimentBtn, sentiment === 'down' && styles.sentimentBtnDown]}
            onPress={() => { setSentiment('down'); setSelectedTags([]); }}
          >
            <Icon name={sentiment === 'down' ? 'thumb-down' : 'thumb-down-outline'} size={40} color={sentiment === 'down' ? theme.colors.background : theme.colors.error} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sentimentBtn, sentiment === 'up' && styles.sentimentBtnUp]}
            onPress={() => { setSentiment('up'); setSelectedTags([]); }}
          >
            <Icon name={sentiment === 'up' ? 'thumb-up' : 'thumb-up-outline'} size={40} color={sentiment === 'up' ? theme.colors.background : theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {sentiment && (
          <View style={styles.tagsSection}>
            <Text style={styles.tagsTitle}>What stood out?</Text>
            <View style={styles.tagsContainer}>
              {(sentiment === 'up' ? positiveTags : negativeTags).map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <TouchableOpacity 
                    key={tag} 
                    style={[styles.tagBadge, isSelected && styles.tagBadgeSelected]}
                    onPress={() => handleTagToggle(tag)}
                  >
                    <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>{tag}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[styles.primaryBtn, (!sentiment || selectedTags.length === 0) && { opacity: 0.5 }]} 
          disabled={!sentiment || selectedTags.length === 0}
          onPress={() => navigation.navigate('TipGratuityScreen')}
        >
          <Text style={styles.primaryBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  iconBtn: { padding: 8, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary },
  skipBtn: { fontSize: 15, fontWeight: 'bold', color: theme.colors.textSecondary, paddingHorizontal: 8 },
  
  content: { padding: 24, paddingBottom: 60, alignItems: 'center' },
  question: { fontSize: 22, fontWeight: 'bold', color: theme.colors.textPrimary, textAlign: 'center', marginBottom: 40 },
  
  sentimentRow: { flexDirection: 'row', gap: 40, marginBottom: 40 },
  sentimentBtn: { width: 100, height: 100, borderRadius: 50, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: theme.colors.border },
  sentimentBtnUp: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  sentimentBtnDown: { backgroundColor: theme.colors.error, borderColor: theme.colors.error },

  tagsSection: { width: '100%', marginTop: 20 },
  tagsTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 16, textAlign: 'center' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  
  tagBadge: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 4 },
  tagBadgeSelected: { backgroundColor: 'rgba(212, 175, 55, 0.15)', borderColor: theme.colors.primary },
  tagText: { color: theme.colors.textSecondary, fontSize: 14, fontWeight: '500' },
  tagTextSelected: { color: theme.colors.primary, fontWeight: 'bold' },

  bottomBar: { padding: 20, paddingBottom: 32, backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: theme.colors.border },
  primaryBtn: { width: '100%', backgroundColor: theme.colors.primary, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: theme.colors.background, fontSize: 15, fontWeight: 'bold' },
});
