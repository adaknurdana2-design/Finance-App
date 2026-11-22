import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

type FilterPeriod = 'Daily' | 'Weekly' | 'Monthly';

interface TransactionItem {
  id: string;
  title: string;
  date: string;
  category: string;
  amount: string;
  isIncome: boolean;
  icon: string;
  period: FilterPeriod;
}

const TRANSACTIONS_DATA: TransactionItem[] = [
  {
    id: '1',
    title: 'Salary',
    date: '18:27 - April 30',
    category: 'Monthly',
    amount: '$4.000,00',
    isIncome: true,
    icon: '💼',
    period: 'Monthly',
  },
  {
    id: '2',
    title: 'Groceries',
    date: '17:00 - April 24',
    category: 'Pantry',
    amount: '-$100,00',
    isIncome: false,
    icon: '🛍️',
    period: 'Weekly',
  },
  {
    id: '3',
    title: 'Rent',
    date: '8:30 - April 15',
    category: 'Rent',
    amount: '-$674,40',
    isIncome: false,
    icon: '🔑',
    period: 'Monthly',
  },
  {
    id: '4',
    title: 'Coffee',
    date: '09:15 - Today',
    category: 'Food',
    amount: '-$4,50',
    isIncome: false,
    icon: '☕',
    period: 'Daily',
  },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>('Monthly');

  const filteredTransactions = TRANSACTIONS_DATA.filter((item) => {
    if (selectedPeriod === 'Monthly') return true;
    return item.period === selectedPeriod;
  });

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

        {/* Қаржы карточкасы (Total Balance & Expense -> AccountBalance бетіне апарады) */}
        <TouchableOpacity
          style={styles.balanceCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AccountBalance')}
        >
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
        </TouchableOpacity>

        {/* Ақ түсті негізгі бөлік */}
        <View style={styles.mainContent}>
          {/* Savings & Revenue карточкасы -> Analysis бетіне апарады */}
          <TouchableOpacity
            style={styles.statsCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Analysis')}
          >
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
          </TouchableOpacity>

          {/* Күндік / Апталық / Айлық таңдау */}
          <View style={styles.filterRow}>
            {(['Daily', 'Weekly', 'Monthly'] as FilterPeriod[]).map((period) => {
              const isActive = selectedPeriod === period;
              return (
                <TouchableOpacity
                  key={period}
                  style={[styles.filterTab, isActive && styles.filterTabActive]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Транзакциялар тізімі */}
          <Text style={styles.sectionTitle}>Transactions</Text>

          {filteredTransactions.map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <View style={styles.transIconBlue}>
                <Text style={styles.transEmoji}>{item.icon}</Text>
              </View>
              <View style={styles.transDetails}>
                <Text style={styles.transTitle}>{item.title}</Text>
                <Text style={styles.transDate}>{item.date}</Text>
              </View>
              <View style={styles.transRight}>
                <Text style={styles.transCategory}>{item.category}</Text>
                <Text
                  style={item.isIncome ? styles.transAmountGreen : styles.transAmountRed}
                >
                  {item.amount}
                </Text>
              </View>
            </View>
          ))}
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
    paddingBottom: 24,
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
});