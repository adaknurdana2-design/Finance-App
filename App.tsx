import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Беттерді импорттау
import LaunchScreen from './src/screens/LaunchScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Launch"
        screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="Launch" component={LaunchScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        
        <Stack.Screen name="Login" component={OnboardingScreen} /> 
        <Stack.Screen name="SignUp" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}