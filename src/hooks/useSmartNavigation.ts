import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export const useSmartNavigation = () => {
  const navigation = useNavigation<any>();

  const smartGoBack = (fallbackTab: string = 'HomeTab') => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // If stack is empty (cannot go back directly), we reset to the fallback tab
      // This prevents the looping or falling out of the app unexpectedly.
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: fallbackTab }],
        })
      );
    }
  };

  const smartNavigate = (routeName: string, params?: any) => {
    // Navigate is preferred over push to avoid duplicate instances of the same screen
    navigation.navigate(routeName, params);
  };

  return {
    smartGoBack,
    smartNavigate,
    navigation, // export original for advanced uses
  };
};
