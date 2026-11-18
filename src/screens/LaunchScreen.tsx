import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function LaunchScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Логотип орны */}
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>📈</Text>
        </View>
        <Text style={styles.appName}>FinWise</Text>
        <Text style={styles.tagline}>Smart Finance Management</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3D30', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    width: 80,
    height: 80,
    backgroundColor: '#2E5A46',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  iconText: {
    fontSize: 40,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#A3C1AD',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#4E9F3D',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#4E9F3D',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#4E9F3D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});