import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Reset Password?</Text>
        <Text style={styles.description}>
          Enter your email address to receive a verification code for resetting your password.
        </Text>

        <Text style={styles.label}>Enter Email Address</Text>
        <TextInput 
          autoCapitalize="none" 
          keyboardType="email-address" 
          onChangeText={setEmail} 
          placeholder="example@example.com" 
          placeholderTextColor="#A0C1B0" 
          style={styles.input} 
          value={email}
        />

        <TouchableOpacity 
          style={styles.nextBtn} 
          onPress={() => navigation.navigate('SecurityPin')}
        >
          <Text style={styles.nextBtnText}>Next Step</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signupAltBtn} 
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signupAltBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or sign up with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialIcon}>
            <Text style={styles.socialEmoji}>🌐</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Text style={styles.socialEmoji}>G</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkBlue}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35C29B',
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#093030',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#F3FFF6',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#093030',
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#E4F6EA',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#093030',
    marginBottom: 15,
  },
  nextBtn: {
    backgroundColor: '#35C29B',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  nextBtnText: {
    color: '#093030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupAltBtn: {
    backgroundColor: '#E4F6EA',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  signupAltBtnText: {
    color: '#093030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#888',
    marginTop: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 8,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E4F6EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialEmoji: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  footerText: {
    color: '#093030',
    fontSize: 12,
  },
  linkBlue: {
    color: '#0068FF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});