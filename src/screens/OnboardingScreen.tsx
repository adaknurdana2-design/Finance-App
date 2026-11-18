import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationPlaceholder}>
          <Text style={styles.illustrationEmoji}>📊 💳 💰</Text>
        </View>

        <Text style={styles.title}>Welcome To Expense Manager</Text>
        <Text style={styles.subtitle}>
          Track your daily expenses, set budgets, and reach your financial goals easily with FinWise.
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.paginationDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122620',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  header: {
    alignItems: 'flex-end',
  },
  skipText: {
    color: '#A3C1AD',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  illustrationPlaceholder: {
    width: 220,
    height: 220,
    backgroundColor: '#1E3D30',
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#2E5A46',
  },
  illustrationEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#A3C1AD',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E5A46',
  },
  activeDot: {
    width: 24,
    backgroundColor: '#4E9F3D',
  },
  nextButton: {
    backgroundColor: '#4E9F3D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
