import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const BasicProfileSetupScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create your profile</Text>
        <Text style={styles.subtitle}>This is how companions will see you.</Text>
      </View>
      
      <View style={styles.avatarContainer}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>Add Photo</Text>
        </View>
      </View>
      
      <View style={styles.form}>
        <Input 
          label="First Name" 
          placeholder="e.g. Rahul" 
          value={name}
          onChangeText={setName}
        />
      </View>
      
      <Button 
        title="Continue" 
        onPress={() => navigation.navigate('InterestSelectionScreen')} 
        disabled={name.trim().length === 0} 
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 24, justifyContent: 'center' },
  header: { marginBottom: 32 },
  title: { color: theme.colors.textPrimary, fontSize: theme.typography.sizes.h2, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: theme.colors.textSecondary, fontSize: theme.typography.sizes.body },
  avatarContainer: { alignItems: 'center', marginBottom: 32 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, borderStyle: 'dashed' },
  avatarText: { color: theme.colors.primary, fontSize: theme.typography.sizes.caption, fontWeight: '600' },
  form: { marginBottom: 24 }
});
