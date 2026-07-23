import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { KYCIntroScreen } from '../screens/verify/KYCIntroScreen';
import { DocumentVerificationScreen } from '../screens/verify/DocumentVerificationScreen';
import { SelfieCaptureScreen } from '../screens/verify/SelfieCaptureScreen';
import { LivenessDetectionScreen } from '../screens/verify/LivenessDetectionScreen';
import { VerificationProcessingScreen } from '../screens/verify/VerificationProcessingScreen';
import { VerificationPendingScreen } from '../screens/verify/VerificationPendingScreen';
import { VerificationRejectedScreen } from '../screens/verify/VerificationRejectedScreen';
import { VerificationSuccessScreen } from '../screens/verify/VerificationSuccessScreen';

const Stack = createNativeStackNavigator();

export const KYCStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="KYCIntroScreen" component={KYCIntroScreen} />
      <Stack.Screen name="DocumentVerificationScreen" component={DocumentVerificationScreen} />
      <Stack.Screen name="SelfieCaptureScreen" component={SelfieCaptureScreen} />
      <Stack.Screen name="LivenessDetectionScreen" component={LivenessDetectionScreen} />
      <Stack.Screen name="VerificationProcessingScreen" component={VerificationProcessingScreen} />
      <Stack.Screen name="VerificationPendingScreen" component={VerificationPendingScreen} />
      <Stack.Screen name="VerificationRejectedScreen" component={VerificationRejectedScreen} />
      <Stack.Screen name="VerificationSuccessScreen" component={VerificationSuccessScreen} />
    </Stack.Navigator>
  );
};
