import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#A0C1B0"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#A0C1B0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+ 123 456 789"
          placeholderTextColor="#A0C1B0"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Date Of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="DD / MM / YYYY"
          placeholderTextColor="#A0C1B0"
          value={dob}
          onChangeText={setDob}
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
            <Text style={styles.eyeIcon}>👁️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••••••"
            placeholderTextColor="#A0C1B0"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>👁️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to{'\n'}
          <Text style={styles.linkDark}>Terms of Use</Text> and <Text style={styles.linkDark}>Privacy Policy.</Text>
        </Text>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.signupBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkBlue}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#093030',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#E4F6EA',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#093030',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4F6EA',
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 13,
    color: '#093030',
  },
  eyeIcon: {
    fontSize: 15,
  },
  termsText: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
  },
  linkDark: {
    fontWeight: 'bold',
    color: '#093030',
  },
  signupBtn: {
    backgroundColor: '#35C29B',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 15,
  },
  signupBtnText: {
    color: '#093030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 30,
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