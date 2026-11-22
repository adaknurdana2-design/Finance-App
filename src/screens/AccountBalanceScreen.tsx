import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const TRANSACTIONS = [
  { id: '1', title: 'Salary', date: '18:27 - April 30', category: 'Monthly', amount: '$4.000,00', isIncome: true, icon: '💼' },
  { id: '2', title: 'Groceries', date: '17:00 - April 24', category: 'Pantry', amount: '-$100,00', isIncome: false, icon: '🛒' },
  { id: '3', title: 'Rent', date: '8:30 - April 15', category: 'Rent', amount: '-$674,40', isIncome: false, icon: '🔑' },
  { id: '4', title: 'Transport', date: '9:30 - April 08', category: 'Fuel', amount: '-$4,13', isIncome: false, icon: '🚌' },
];

export default function AccountBalanceScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account Balance</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={styles.bellBtn}
            >
              <Text style={styles.bellIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balanceRow}>
            <View style={styles.balanceCol}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceValue}>$7,783.00</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.balanceCol}>
              <Text style={styles.balanceLabel}>Total Expense</Text>
              <Text style={styles.expenseValue}>-$1.187.40</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
            <Text style={styles.progressText}>$20,000.00</Text>
          </View>

          <View style={styles.cardsRow}>
            <View style={styles.statCard}>
              <Text style={styles.cardArrowGreen}>↙</Text>
              <Text style={styles.cardLabel}>Income</Text>
              <Text style={styles.cardValueBlack}>$4,000.00</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.cardArrowBlue}>↗</Text>
              <Text style={styles.cardLabel}>Expense</Text>
              <Text style={styles.cardValueBlue}>$1.187.40</Text>
            </View>
          </View>

          <Text style={styles.hintText}>✓ 30% Of Your Expenses, Looks Good.</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {TRANSACTIONS.map((item) => (
            <View key={item.id} style={styles.transactionRow}>
              <View style={styles.txIconCircle}>
                <Text style={styles.txEmoji}>{item.icon}</Text>
              </View>
              <View style={styles.txMain}>
                <Text style={styles.txTitle}>{item.title}</Text>
                <Text style={styles.txDate}>{item.date}</Text>
              </View>
              <Text style={styles.txCategory}>{item.category}</Text>
              <Text style={[styles.txAmount, item.isIncome && styles.txAmountIncome]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAFBF4' },
  header: {
    backgroundColor: '#00C48C',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  iconBtn: { padding: 4 },
  backArrow: { fontSize: 22, color: '#FFFFFF', fontWeight: '700' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#093030' },
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: { fontSize: 15 },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 14,
  },
  balanceCol: { alignItems: 'center' },
  balanceLabel: { fontSize: 12, color: '#093030' },
  balanceValue: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginTop: 2 },
  expenseValue: { fontSize: 22, fontWeight: '800', color: '#0068FF', marginTop: 2 },
  verticalLine: { width: 1, height: 34, backgroundColor: 'rgba(255,255,255,0.5)' },
  progressBar: {
    height: 22,
    borderRadius: 11,
    backgroundColor: '#093030',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
  },
  progressText: {
    alignSelf: 'flex-end',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  cardsRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  statCard: {
    flex: 1,
    backgroundColor: '#F1FFF3',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cardArrowGreen: { fontSize: 16, color: '#00A878', fontWeight: '700' },
  cardArrowBlue: { fontSize: 16, color: '#0068FF', fontWeight: '700' },
  cardLabel: { fontSize: 12, color: '#093030', marginTop: 2 },
  cardValueBlack: { fontSize: 17, fontWeight: '800', color: '#093030', marginTop: 2 },
  cardValueBlue: { fontSize: 17, fontWeight: '800', color: '#0068FF', marginTop: 2 },
  hintText: { fontSize: 12, color: '#093030', fontWeight: '500' },
  content: { padding: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#093030' },
  seeAllText: { fontSize: 13, color: '#475569' },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  txIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txEmoji: { fontSize: 19 },
  txMain: { flex: 1 },
  txTitle: { fontSize: 15, fontWeight: '700', color: '#093030' },
  txDate: { fontSize: 12, color: '#0068FF', marginTop: 2 },
  txCategory: { fontSize: 12, color: '#334155', marginRight: 12 },
  txAmount: { fontSize: 14, fontWeight: '700', color: '#0068FF' },
  txAmountIncome: { color: '#093030' },
});