import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const CustomSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => {
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
            activeOpacity={0.8}
            onPress={() => onValueChange(!value)}
            style={[
                styles.switchContainer, 
                { backgroundColor: value ? theme.colors.primary : 'rgba(255,255,255,0.1)' }
            ]}
        >
            <Animated.View style={[
                styles.switchThumb,
                { transform: [{ translateX }] }
            ]} />
        </TouchableOpacity>
    );
};

interface PermissionItemProps {
    icon: string;
    title: string;
    description: string;
    isGranted: boolean;
    onToggle: (val: boolean) => void;
    isRequired?: boolean;
}

const PermissionItem: React.FC<PermissionItemProps> = ({ icon, title, description, isGranted, onToggle, isRequired }) => (
    <View style={styles.permissionCard}>
        <View style={styles.permissionHeader}>
            <View style={[styles.iconWrap, { backgroundColor: isGranted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)' }]}>
                <Icon name={icon} size={22} color={isGranted ? theme.colors.success : theme.colors.textPrimary} />
            </View>
            <View style={styles.permissionTextContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={styles.permissionTitle}>{title}</Text>
                    {isRequired && <Text style={styles.requiredBadge}>REQUIRED</Text>}
                </View>
                <Text style={styles.permissionDesc}>{description}</Text>
            </View>
            <CustomSwitch value={isGranted} onValueChange={onToggle} />
        </View>
    </View>
);

export const AppPermissionsScreen = () => {
  const navigation = useNavigation<any>();
  
  // Mock States
  const [permissions, setPermissions] = useState({
      location: true,
      camera: false,
      microphone: false,
      photos: true,
      notifications: true,
      contacts: false,
      calendar: false,
  });

  const handleToggle = (key: keyof typeof permissions, newValue: boolean) => {
      if (!newValue) {
          // In native apps, you usually can't revoke permissions programmatically.
          Alert.alert(
              'Revoke Permission', 
              'To disable this permission, please go to your device Settings.',
              [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Settings', style: 'default' }
              ]
          );
          return;
      }
      
      // Simulate granting permission
      setPermissions(prev => ({ ...prev, [key]: newValue }));
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Permissions</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
            <View style={styles.shieldIconWrap}>
                <Icon name="shield-lock-outline" size={32} color={theme.colors.primary} />
            </View>
            <Text style={styles.heroTitle}>Privacy Control</Text>
            <Text style={styles.heroSub}>
                Manage what data CoBuddy can access. We only ask for permissions that are essential to providing you a safe and seamless experience.
            </Text>
        </View>

        <Text style={styles.sectionTitle}>CORE PERMISSIONS</Text>
        
        <PermissionItem 
            icon="map-marker-outline"
            title="Location Access"
            description="Used to find nearby buddies and track active sessions for safety."
            isGranted={permissions.location}
            isRequired={true}
            onToggle={(val) => handleToggle('location', val)}
        />

        <PermissionItem 
            icon="bell-outline"
            title="Push Notifications"
            description="Get instantly notified about booking requests and messages."
            isGranted={permissions.notifications}
            isRequired={true}
            onToggle={(val) => handleToggle('notifications', val)}
        />

        <Text style={styles.sectionTitle}>MEDIA & COMMUNICATION</Text>

        <PermissionItem 
            icon="camera-outline"
            title="Camera"
            description="Required for KYC verification and taking profile pictures."
            isGranted={permissions.camera}
            onToggle={(val) => handleToggle('camera', val)}
        />

        <PermissionItem 
            icon="image-outline"
            title="Photo Library"
            description="Allows you to upload ID documents and send photos in chat."
            isGranted={permissions.photos}
            onToggle={(val) => handleToggle('photos', val)}
        />

        <PermissionItem 
            icon="microphone-outline"
            title="Microphone"
            description="Used for voice calls and sending voice notes in chat."
            isGranted={permissions.microphone}
            onToggle={(val) => handleToggle('microphone', val)}
        />

        <Text style={styles.sectionTitle}>OPTIONAL</Text>

        <PermissionItem 
            icon="calendar-sync-outline"
            title="Calendar Sync"
            description="Automatically add your upcoming CoBuddy sessions to your calendar."
            isGranted={permissions.calendar}
            onToggle={(val) => handleToggle('calendar', val)}
        />

        <PermissionItem 
            icon="contacts-outline"
            title="Contacts"
            description="Find friends who are already using CoBuddy."
            isGranted={permissions.contacts}
            onToggle={(val) => handleToggle('contacts', val)}
        />

        <View style={styles.footerNote}>
            <Icon name="information-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.footerText}>
                Revoking required permissions may limit app functionality.
            </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  
  scrollContent: { padding: 16, paddingBottom: 40 },
  
  heroSection: { alignItems: 'center', marginBottom: 32, marginTop: 10 },
  shieldIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(212,175,55,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)' },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 8 },
  heroSub: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: 10 },

  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 12, marginTop: 24, marginLeft: 8 },
  
  permissionCard: { backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, padding: 16, marginBottom: 12 },
  permissionHeader: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  permissionTextContent: { flex: 1, marginRight: 12 },
  permissionTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  requiredBadge: { fontSize: 9, fontWeight: 'bold', color: theme.colors.background, backgroundColor: theme.colors.textSecondary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
  permissionDesc: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },

  footerNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 32, opacity: 0.7 },
  footerText: { fontSize: 12, color: theme.colors.textSecondary },

  switchContainer: {
      width: 46,
      height: 26,
      borderRadius: 13,
      padding: 2,
      justifyContent: 'center',
  },
  switchThumb: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
  }
});
