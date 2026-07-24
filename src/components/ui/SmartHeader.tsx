import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSmartNavigation } from '../../hooks/useSmartNavigation';
import { theme } from '../../theme';

interface SmartHeaderProps {
  title?: string;
  fallbackTab?: string;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export const SmartHeader: React.FC<SmartHeaderProps> = ({ 
  title, 
  fallbackTab = 'HomeTab',
  rightAction,
  transparent = false
}) => {
  const { smartGoBack } = useSmartNavigation();

  return (
    <View style={[styles.header, transparent && styles.transparent]}>
      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => smartGoBack(fallbackTab)} 
        activeOpacity={0.7}
      >
        <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        {rightAction || <View style={{ width: 40 }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 2,
  },
});
