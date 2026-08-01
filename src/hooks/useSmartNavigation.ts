import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

// Global lock to prevent double-taps that pop root screens (blank screen bug)
export let isNavigating = false;
let navigationTimeout: ReturnType<typeof setTimeout> | null = null;

export const setNavigatingLock = (duration: number = 500) => {
  isNavigating = true;
  if (navigationTimeout) clearTimeout(navigationTimeout);
  navigationTimeout = setTimeout(() => {
    isNavigating = false;
  }, duration);
};

export const useHardwareBackLock = () => {
  useEffect(() => {
    const onBackPress = () => {
      if (isNavigating) {
        // Prevent native pop if we are already in a navigation transition!
        return true; 
      }
      setNavigatingLock();
      return false; // Allow normal back action
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, []);
};

export const useSmartNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const smartGoBack = (fallbackTab: string = 'HomeTab') => {
    if (isNavigating) return;
    setNavigatingLock();

    const state = navigation.getState();
    const isStack = state && state.type === 'stack';
    
    if (isStack && state.routes.length > 1) {
      navigation.goBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      (navigation as any).navigate(fallbackTab);
    }
  };

  const smartNavigate = (routeName: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) => {
    if (isNavigating) return;
    setNavigatingLock();
    navigation.navigate(routeName as any, params);
  };

  return {
    smartGoBack,
    smartNavigate,
    navigation, // export original for advanced uses
  };
};
