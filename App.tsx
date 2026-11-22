import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LaunchScreen from './src/screens/LaunchScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import SecurityPinScreen from './src/screens/SecurityPinScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import AccountBalanceScreen from './src/screens/AccountBalanceScreen';
import QuicklyAnalysisScreen from './src/screens/QuicklyAnalysisScreen';
import MainTabs from './src/navigation/MainTabs';

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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="SecurityPin" component={SecurityPinScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        
        {/* Негізгі бет (төменгі мәзірмен бірге) */}
        <Stack.Screen name="Home" component={MainTabs} />
        
        {/* Анализ және Баланс беттері */}
        <Stack.Screen name="Analysis" component={QuicklyAnalysisScreen} />
        <Stack.Screen name="AccountBalance" component={AccountBalanceScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}