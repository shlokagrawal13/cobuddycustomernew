import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import { AppBottomSheet } from '../../components/ui/AppBottomSheet';

// Reusable Custom Switch
const CustomSwitch = ({ value, onValueChange, disabled = false }: { value: boolean, onValueChange?: (val: boolean) => void, disabled?: boolean }) => {
    const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;
    useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? 20 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [value]);
    return (
        <TouchableOpacity 
            activeOpacity={disabled ? 1 : 0.8}
            onPress={() => !disabled && onValueChange && onValueChange(!value)}
            style={[
                styles.switchContainer, 
                { backgroundColor: value ? (disabled ? 'rgba(212,175,55,0.5)' : theme.colors.primary) : 'rgba(255,255,255,0.1)' }
            ]}
        >
            <Animated.View style={[styles.switchThumb, { transform: [{ translateX }] }]} />
        </TouchableOpacity>
    );
};

export const DataCacheScreen = () => {
  const navigation = useNavigation<any>();
  
  const [cacheSize, setCacheSize] = useState('45.2 MB');
  const [mediaSize, setMediaSize] = useState('124.8 MB');
  const [autoDownload, setAutoDownload] = useState(true);
  const [uploadQuality, setUploadQuality] = useState('Standard');
  const [showQualitySheet, setShowQualitySheet] = useState(false);

  const handleClearCache = () => {
      Alert.alert(
          "Clear Cache",
          "This will clear temporary files and speed up the app. You won't be logged out.",
          [
              { text: "Cancel", style: "cancel" },
              { text: "Clear", style: "destructive", onPress: () => setCacheSize('0 B') }
          ]
      );
  };

  const handleClearMedia = () => {
    Alert.alert(
        "Clear Media",
        "This will delete downloaded companion photos and chat media from your device to save space. They will redownload when you view them again.",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Clear Media", style: "destructive", onPress: () => setMediaSize('0 B') }
        ]
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data & Storage</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Storage Visualizer Section */}
        <View style={styles.storageCard}>
            <Text style={styles.storageCardTitle}>Storage Usage</Text>
            
            <View style={styles.barContainer}>
                <View style={[styles.barSegment, { flex: 0.15, backgroundColor: theme.colors.primary }]} />
                <View style={[styles.barSegment, { flex: 0.35, backgroundColor: theme.colors.warning }]} />
                <View style={[styles.barSegment, { flex: 0.5, backgroundColor: 'rgba(255,255,255,0.05)' }]} />
            </View>

            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
                    <View>
                        <Text style={styles.legendLabel}>Cache</Text>
                        <Text style={styles.legendValue}>{cacheSize}</Text>
                    </View>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.warning }]} />
                    <View>
                        <Text style={styles.legendLabel}>Media</Text>
                        <Text style={styles.legendValue}>{mediaSize}</Text>
                    </View>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                    <View>
                        <Text style={styles.legendLabel}>Free</Text>
                        <Text style={styles.legendValue}>2.4 GB</Text>
                    </View>
                </View>
            </View>
        </View>

        {/* Storage Management */}
        <Text style={styles.sectionTitle}>MANAGE STORAGE</Text>
        <View style={styles.card}>
            <TouchableOpacity style={[styles.row, styles.borderBottom]} activeOpacity={0.7} onPress={handleClearCache}>
                <View style={styles.iconBox}>
                    <Icon name="broom" size={20} color={theme.colors.textPrimary} />
                </View>
                <View style={styles.meta}>
                    <Text style={styles.title}>Clear Cache</Text>
                    <Text style={styles.sub}>Free up space by removing temp files</Text>
                </View>
                <Text style={styles.sizeText}>{cacheSize}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={handleClearMedia}>
                <View style={styles.iconBox}>
                    <Icon name="image-multiple-outline" size={20} color={theme.colors.textPrimary} />
                </View>
                <View style={styles.meta}>
                    <Text style={styles.title}>Clear Downloaded Media</Text>
                    <Text style={styles.sub}>Remove saved photos and chat files</Text>
                </View>
                <Text style={styles.sizeText}>{mediaSize}</Text>
            </TouchableOpacity>
        </View>

        {/* Media & Quality Preferences */}
        <Text style={styles.sectionTitle}>MEDIA PREFERENCES</Text>
        <View style={styles.card}>
            <View style={[styles.row, styles.borderBottom]}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Auto-Download Media</Text>
                    <Text style={styles.sub}>Automatically download photos on Wi-Fi</Text>
                </View>
                <CustomSwitch value={autoDownload} onValueChange={setAutoDownload} />
            </View>

            <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={() => setShowQualitySheet(true)}>
                <View style={styles.meta}>
                    <Text style={styles.title}>Photo Upload Quality</Text>
                    <Text style={styles.sub}>Adjust quality for profile & chat uploads</Text>
                </View>
                <View style={styles.rightAction}>
                    <Text style={styles.actionText}>{uploadQuality}</Text>
                    <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
                </View>
            </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Quality Selection Bottom Sheet */}
      <AppBottomSheet
        visible={showQualitySheet}
        onClose={() => setShowQualitySheet(false)}
        title="Upload Quality"
      >
        <View style={styles.sheetContent}>
            {['Data Saver', 'Standard', 'High Quality'].map((quality, index) => (
                <TouchableOpacity 
                    key={quality}
                    style={[styles.sheetRow, index > 0 && styles.sheetRowBorder]} 
                    activeOpacity={0.7} 
                    onPress={() => {
                        setUploadQuality(quality);
                        setShowQualitySheet(false);
                    }}
                >
                    <Text style={[styles.sheetRowText, uploadQuality === quality && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                        {quality}
                    </Text>
                    {uploadQuality === quality && <Icon name="check" size={20} color={theme.colors.primary} />}
                </TouchableOpacity>
            ))}
            <Text style={styles.sheetHelper}>High Quality uses more mobile data and storage.</Text>
        </View>
      </AppBottomSheet>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  // Storage Visualizer
  storageCard: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 20, marginBottom: 32, borderWidth: 1, borderColor: theme.colors.border },
  storageCardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 20 },
  barContainer: { flexDirection: 'row', height: 8, width: '100%', marginBottom: 24, borderRadius: 4, overflow: 'hidden', gap: 2, backgroundColor: theme.colors.background },
  barSegment: { height: '100%' }, 
  legendContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  legendItem: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4, marginRight: 8 },
  legendLabel: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 2 },
  legendValue: { fontSize: 14, fontWeight: 'bold', color: theme.colors.textPrimary },

  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 12, marginLeft: 8 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden', marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 },
  borderBottom: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.border },
  
  iconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  meta: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  sub: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },
  sizeText: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
  
  rightAction: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '500' },

  switchContainer: { width: 46, height: 26, borderRadius: 13, padding: 2, justifyContent: 'center' },
  switchThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },

  // Sheet
  sheetContent: { paddingBottom: 24, paddingHorizontal: 8 },
  sheetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 16 },
  sheetRowBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border },
  sheetRowText: { fontSize: 16, color: theme.colors.textPrimary },
  sheetHelper: { fontSize: 13, color: theme.colors.textSecondary, textAlign: 'center', marginTop: 24, paddingHorizontal: 20 }
});
