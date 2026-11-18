import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Username Or Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#A0C1B0"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••••••"
            placeholderTextColor="#A0C1B0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.loginBtn} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupAltBtn}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signupAltBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.fingerprintText}>
          Use <Text style={styles.linkBlue}>Fingerprint</Text> To Access
        </Text>

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
    backgroundColor: '#35C29B', // Figma-дағы ашық жасыл фон
  },
  header: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
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
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#E4F6EA',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#093030',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4F6EA',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#093030',
  },
  eyeIcon: {
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#35C29B',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  loginBtnText: {
    color: '#093030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotBtn: {
    alignItems: 'center',
    marginTop: 10,
  },
  forgotText: {
    color: '#093030',
    fontSize: 13,
    fontWeight: '600',
  },
  signupAltBtn: {
    backgroundColor: '#E4F6EA',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  signupAltBtnText: {
    color: '#093030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fingerprintText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    marginTop: 12,
  },
  orText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#888',
    marginTop: 8,
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