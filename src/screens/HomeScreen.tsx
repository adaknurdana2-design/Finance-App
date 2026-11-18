import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Жоғарғы бөлік (Приветствие және хабарлама белгісі -> Notification бетіне апарады) */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingTitle}>Hi, Welcome Back</Text>
            <Text style={styles.greetingSubtitle}>Good Morning</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationBtn}
            onPress={() => navigation.navigate('Notification')}
          >
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Қаржы карточкасы (Total Balance & Expense) */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View style={styles.balanceCol}>
              <Text style={styles.balanceLabel}>↗ Total Balance</Text>
              <Text style={styles.balanceAmount}>$7,783.00</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.balanceCol}>
              <Text style={styles.expenseLabel}>↗ Total Expense</Text>
              <Text style={styles.expenseAmount}>-$1,187.40</Text>
            </View>
          </View>

          {/* Прогресс бар */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={styles.progressBarFill} />
            </View>
            <Text style={styles.progressText}>30%                 $20,000.00</Text>
          </View>

          <Text style={styles.tipText}>☑ 30% Of Your Expenses, Looks Good.</Text>
        </View>

        {/* Ақ түсті негізгі бөлік */}
        <View style={styles.mainContent}>
          {/* Savings & Revenue карточкасы */}
          <View style={styles.statsCard}>
            <View style={styles.savingsBox}>
              <View style={styles.circleProgress}>
                <Text style={styles.carEmoji}>🚗</Text>
              </View>
              <Text style={styles.savingsText}>Savings{'\n'}On Goals</Text>
            </View>

            <View style={styles.statsDivider} />

            <View style={styles.revenueBox}>
              <View style={styles.revenueItem}>
                <Text style={styles.revenueIcon}>📦</Text>
                <View>
                  <Text style={styles.revenueLabel}>Revenue Last Week</Text>
                  <Text style={styles.revenueVal}>$4,000.00</Text>
                </View>
              </View>
              <View style={styles.revenueItem}>
                <Text style={styles.revenueIcon}>🍽️</Text>
                <View>
                  <Text style={styles.revenueLabel}>Food Last Week</Text>
                  <Text style={styles.revenueValRed}>-$100.00</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Күндік / Апталық / Айлық таңдау */}
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterTab}>
              <Text style={styles.filterText}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTab}>
              <Text style={styles.filterText}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
              <Text style={[styles.filterText, styles.filterTextActive]}>Monthly</Text>
            </TouchableOpacity>
          </View>

          {/* Транзакциялар тізімі */}
          <Text style={styles.sectionTitle}>Transactions</Text>

          {/* 1-ші транзакция: Salary */}
          <View style={styles.transactionItem}>
            <View style={styles.transIconBlue}>
              <Text style={styles.transEmoji}>💼</Text>
            </View>
            <View style={styles.transDetails}>
              <Text style={styles.transTitle}>Salary</Text>
              <Text style={styles.transDate}>18:27 - April 30</Text>
            </View>
            <View style={styles.transRight}>
              <Text style={styles.transCategory}>Monthly</Text>
              <Text style={styles.transAmountGreen}>$4.000,00</Text>
            </View>
          </View>

          {/* 2-ші транзакция: Groceries */}
          <View style={styles.transactionItem}>
            <View style={styles.transIconBlue}>
              <Text style={styles.transEmoji}>🛍️</Text>
            </View>
            <View style={styles.transDetails}>
              <Text style={styles.transTitle}>Groceries</Text>
              <Text style={styles.transDate}>17:00 - April 24</Text>
            </View>
            <View style={styles.transRight}>
              <Text style={styles.transCategory}>Pantry</Text>
              <Text style={styles.transAmountRed}>-$100,00</Text>
            </View>
          </View>

          {/* 3-ші транзакция: Rent */}
          <View style={styles.transactionItem}>
            <View style={styles.transIconBlue}>
              <Text style={styles.transEmoji}>🔑</Text>
            </View>
            <View style={styles.transDetails}>
              <Text style={styles.transTitle}>Rent</Text>
              <Text style={styles.transDate}>8:30 - April 15</Text>
            </View>
            <View style={styles.transRight}>
              <Text style={styles.transCategory}>Rent</Text>
              <Text style={styles.transAmountRed}>-$674,40</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Төменгі Навигация Панелі (Bottom Navigation) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
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
    marginTop: 15,
    marginBottom: 15,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093030',
  },
  greetingSubtitle: {
    fontSize: 12,
    color: '#093030',
    opacity: 0.7,
  },
  notificationBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 16,
  },
  balanceCard: {
    marginHorizontal: 20,
    backgroundColor: '#35C29B',
    marginBottom: 15,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  balanceCol: {
    flex: 1,
  },
  verticalDivider: {
    width: 1,
    height: 35,
    backgroundColor: '#093030',
    opacity: 0.2,
    marginHorizontal: 15,
  },
  balanceLabel: {
    fontSize: 11,
    color: '#093030',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093030',
  },
  expenseLabel: {
    fontSize: 11,
    color: '#093030',
    marginBottom: 4,
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093030',
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    width: '30%',
    height: '100%',
    backgroundColor: '#093030',
  },
  progressText: {
    fontSize: 10,
    color: '#093030',
    fontWeight: '600',
  },
  tipText: {
    fontSize: 11,
    color: '#093030',
    marginTop: 5,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F3FFF6',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 90,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#35C29B',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  savingsBox: {
    alignItems: 'center',
    flex: 1,
  },
  circleProgress: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  carEmoji: {
    fontSize: 22,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#093030',
    textAlign: 'center',
  },
  statsDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#093030',
    opacity: 0.15,
    marginHorizontal: 10,
  },
  revenueBox: {
    flex: 1.5,
    gap: 10,
  },
  revenueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  revenueIcon: {
    fontSize: 16,
  },
  revenueLabel: {
    fontSize: 10,
    color: '#093030',
    opacity: 0.7,
  },
  revenueVal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#093030',
  },
  revenueValRed: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#E53935',
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#E4F6EA',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  filterTabActive: {
    backgroundColor: '#35C29B',
  },
  filterText: {
    fontSize: 12,
    color: '#093030',
    fontWeight: '600',
  },
  filterTextActive: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#093030',
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  transIconBlue: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E4F6EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transEmoji: {
    fontSize: 18,
  },
  transDetails: {
    flex: 1,
  },
  transTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#093030',
  },
  transDate: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  transRight: {
    alignItems: 'flex-end',
  },
  transCategory: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  transAmountGreen: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  transAmountRed: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#E53935',
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
  navItemActive: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#35C29B',
    justifyContent: 'center',
    alignItems: 'center',
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