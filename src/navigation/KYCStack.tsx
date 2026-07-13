import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { KYCIntroScreen } from '../screens/KYCIntroScreen';
import { AadhaarUploadScreen } from '../screens/AadhaarUploadScreen';
import { SelfieCaptureScreen } from '../screens/SelfieCaptureScreen';
import { LivenessDetectionScreen } from '../screens/LivenessDetectionScreen';
import { VerificationProcessingScreen } from '../screens/VerificationProcessingScreen';
import { VerificationPendingScreen } from '../screens/VerificationPendingScreen';
import { VerificationRejectedScreen } from '../screens/VerificationRejectedScreen';

const Stack = createNativeStackNavigator();

export const KYCStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="KYCIntroScreen" component={KYCIntroScreen} />
      <Stack.Screen name="AadhaarUploadScreen" component={AadhaarUploadScreen} />
      <Stack.Screen name="SelfieCaptureScreen" component={SelfieCaptureScreen} />
      <Stack.Screen name="LivenessDetectionScreen" component={LivenessDetectionScreen} />
      <Stack.Screen name="VerificationProcessingScreen" component={VerificationProcessingScreen} />
      <Stack.Screen name="VerificationPendingScreen" component={VerificationPendingScreen} />
      <Stack.Screen name="VerificationRejectedScreen" component={VerificationRejectedScreen} />
    </Stack.Navigator>
  );
};
