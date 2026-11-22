import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import QuicklyAnalysisScreen from '../screens/QuicklyAnalysisScreen';
import TransactionScreen from '../screens/TransactionScreen';

const Tab = createBottomTabNavigator();

function ComingSoonScreen({ name }: { name: string }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>Раздел скоро будет добавлен</Text>
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabPill, focused && styles.tabPillActive]}>
              <Text style={styles.tabIcon}>⌂</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AnalysisTab"
        component={QuicklyAnalysisScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabPill, focused && styles.tabPillActive]}>
              <Text style={styles.tabIcon}>📊</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TransactionTab"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabPill, focused && styles.tabPillActive]}>
              <Text style={styles.tabIcon}>⇄</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CategoriesTab"
        children={() => <ComingSoonScreen name="Categories" />}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabPill, focused && styles.tabPillActive]}>
              <Text style={styles.tabIcon}>🗂</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        children={() => <ComingSoonScreen name="Profile" />}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabPill, focused && styles.tabPillActive]}>
              <Text style={styles.tabIcon}>👤</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#DFF7E2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 0,
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabPill: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPillActive: {
    backgroundColor: '#00C48C',
  },
  tabIcon: {
    fontSize: 20,
    color: '#093030',
  },
  center: {
    flex: 1,
    backgroundColor: '#EAFBF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#093030',
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    marginTop: 6,
  },
});