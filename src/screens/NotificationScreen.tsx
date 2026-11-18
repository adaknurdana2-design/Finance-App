import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function NotificationScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Жоғарғы навигация (Артқа қайту, атауы және хабарлама белгісі) */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Негізгі ақ түсті айналдырмалы аймақ */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* БҮГІН (Today) */}
        <Text style={styles.sectionHeader}>Today</Text>

        <View style={styles.notifCard}>
          <View style={styles.iconCircleGreen}>
            <Text style={styles.notifEmoji}>🔔</Text>
          </View>
          <View style={styles.notifTexts}>
            <Text style={styles.notifTitle}>Reminder!</Text>
            <Text style={styles.notifDesc}>Set up your automatic savings to meet your savings goal...</Text>
            <Text style={styles.notifTime}>17:00 - April 24</Text>
          </View>
        </View>

        <View style={styles.notifCard}>
          <View style={styles.iconCircleGreen}>
            <Text style={styles.notifEmoji}>⭐</Text>
          </View>
          <View style={styles.notifTexts}>
            <Text style={styles.notifTitle}>New Update</Text>
            <Text style={styles.notifDesc}>FinWise v2.0 is now available with enhanced security features and dark mode.</Text>
            <Text style={styles.notifTime}>14:30 - April 24</Text>
          </View>
        </View>

        {/* КЕШЕ (Yesterday) */}
        <Text style={styles.sectionHeader}>Yesterday</Text>

        <View style={styles.notifCard}>
          <View style={styles.iconCircleGreen}>
            <Text style={styles.notifEmoji}>💰</Text>
          </View>
          <View style={styles.notifTexts}>
            <Text style={styles.notifTitle}>Transactions</Text>
            <Text style={styles.notifDesc}>A new transaction has been registered</Text>
            <Text style={styles.notifSubLink}>Groceries | Pantry | -$100,00</Text>
            <Text style={styles.notifTime}>17:00 - April 23</Text>
          </View>
        </View>

        <View style={styles.notifCard}>
          <View style={styles.iconCircleGreen}>
            <Text style={styles.notifEmoji}>🔔</Text>
          </View>
          <View style={styles.notifTexts}>
            <Text style={styles.notifTitle}>Reminder!</Text>
            <Text style={styles.notifDesc}>Don't forget to review your weekly budget status to stay on track.</Text>
            <Text style={styles.notifTime}>09:15 - April 23</Text>
          </View>
        </View>

        {/* ОСЫ АПТА СОҢЫ (This Weekend / Earlier) */}
        <Text style={styles.sectionHeader}>This Weekend</Text>

        <View style={styles.notifCard}>
          <View style={styles.iconCircleGreen}>
            <Text style={styles.notifEmoji}>📉</Text>
          </View>
          <View style={styles.notifTexts}>
            <Text style={styles.notifTitle}>Expense Record</Text>
            <Text style={styles.notifDesc}>We recommend that you be more attentive to your finances.</Text>
            <Text style={styles.notifTime}>17:00 - April 20</Text>
          </View>
        </View>

        <View style={styles.notifCard}>
          <View style={styles.iconCircleGreen}>
            <Text style={styles.notifEmoji}>💰</Text>
          </View>
          <View style={styles.notifTexts}>
            <Text style={styles.notifTitle}>Transactions</Text>
            <Text style={styles.notifDesc}>A new transaction has been registered</Text>
            <Text style={styles.notifSubLink}>Food | Dinner | -$70,40</Text>
            <Text style={styles.notifTime}>20:45 - April 19</Text>
          </View>
        </View>

        {/* ҰЗАҚ УАҚЫТ ҚОЛДАНЫП ЖАТҚАНЫНЫҢ ҚҰРМЕТІНЕ (Long-term user milestone) */}
        <Text style={styles.sectionHeader}>Milestone Achievement</Text>

        <View style={styles.notifCard}>
          <View style={styles.iconCircleGold}>
            <Text style={styles.notifEmoji}>🏆</Text>
          </View>
          <View style={styles.notifTexts}>
            <Text style={styles.notifTitle}>1 Year with FinWise!</Text>
            <Text style={styles.notifDesc}>Thank you for being with us for a long time. You've successfully saved over $5,000!</Text>
            <Text style={styles.notifTime}>10:00 - April 10</Text>
          </View>
        </View>

        <View style={styles.notifCard}>
          <View style={styles.iconCircleGreen}>
            <Text style={styles.notifEmoji}>💡</Text>
          </View>
          <View style={styles.notifTexts}>
            <Text style={styles.notifTitle}>App Usage Insights</Text>
            <Text style={styles.notifDesc}>You've been actively managing your budget for over 6 months. Great financial discipline!</Text>
            <Text style={styles.notifTime}>12:00 - March 15</Text>
          </View>
        </View>

        {/* Төменгі жақтан ақпарат толық көрінуі үшін бос орын */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Төменгі Навигация Панелі (Bottom Navigation) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Analysis')}>
          <Text style={styles.navIcon}>📊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📚</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35C29B',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#093030',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#093030',
  },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F3FFF6',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
    marginBottom: 10,
  },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconCircleGreen: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E4F6EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconCircleGold: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notifEmoji: {
    fontSize: 16,
  },
  notifTexts: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#093030',
    marginBottom: 2,
  },
  notifDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 4,
  },
  notifSubLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0068FF',
    marginBottom: 4,
  },
  notifTime: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#F3FFF6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E4F6EA',
    paddingHorizontal: 10,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  navIcon: {
    fontSize: 20,
  },
});