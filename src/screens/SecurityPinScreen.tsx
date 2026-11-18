import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function SecurityPinScreen({ navigation }: { navigation: any }) {
  const pinNumbers = ['2', '7', '3', '9', '1', '6'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Security Pin</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Enter Security Pin</Text>

        <View style={styles.pinContainer}>
          {pinNumbers.map((num, index) => (
            <View key={index} style={styles.pinCircle}>
              <Text style={styles.pinText}>{num}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.acceptBtn} 
          onPress={() => navigation.navigate('NewPassword')}
        >
          <Text style={styles.acceptBtnText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sendAgainBtn}>
          <Text style={styles.sendAgainText}>Send Again</Text>
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
    paddingTop: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#093030',
    marginBottom: 25,
  },
  pinContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  pinCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#35C29B',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  pinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#35C29B',
  },
  acceptBtn: {
    backgroundColor: '#35C29B',
    borderRadius: 22,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  acceptBtnText: {
    color: '#093030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sendAgainBtn: {
    backgroundColor: '#E4F6EA',
    borderRadius: 22,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  sendAgainText: {
    color: '#093030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 11,
    color: '#888',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
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