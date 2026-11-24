import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const TRANSACTIONS = [
  { id: '1', title: 'Salary', date: '18:27 - April 30', category: 'Monthly', amount: '$4.000,00', isIncome: true, icon: '💼' },
  { id: '2', title: 'Groceries', date: '17:00 - April 24', category: 'Pantry', amount: '-$100,00', isIncome: false, icon: '🛒' },
  { id: '3', title: 'Rent', date: '8:30 - April 15', category: 'Rent', amount: '-$674,40', isIncome: false, icon: '🔑' },
  { id: '4', title: 'Transport', date: '9:30 - April 08', category: 'Fuel', amount: '-$4,13', isIncome: false, icon: '🚌' },
];

export default function AccountBalanceScreen({ navigation }: { navigation: any }) {
  const goBackSafe = () => {
    if (navigation?.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        <View style={styles.header}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={goBackSafe} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account Balance</Text>
            <TouchableOpacity
              onPress={() => navigation?.navigate?.('Notification')}
              style={styles.bellBtn}
            >
              <Ionicons name="notifications-outline" size={20} color="#093030" />
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
            <View style={styles.progressFill}>
              <Text style={styles.progressPercent}>30%</Text>
            </View>
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
            <TouchableOpacity onPress={() => navigation?.navigate?.('Transactions')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {TRANSACTIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.transactionRow}
              activeOpacity={0.8}
              onPress={() => navigation?.navigate?.('Transactions')}
            >
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
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate?.('Home')}>
          <Ionicons name="home-outline" size={22} color="#093030" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate?.('Analysis')}>
          <Ionicons name="stats-chart-outline" size={20} color="#093030" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate?.('Transactions')}>
          <MaterialCommunityIcons name="swap-horizontal" size={24} color="#093030" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate?.('Search')}>
          <Ionicons name="layers-outline" size={22} color="#093030" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => navigation?.navigate?.('AccountBalance')}>
          <Ionicons name="person-outline" size={22} color="#093030" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#00C48C' },
  scrollBody: { backgroundColor: '#F6FFF8', flexGrow: 1 },
  header: {
    backgroundColor: '#00C48C',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  iconBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#093030' },
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    justifyContent: 'center',
    paddingLeft: 8,
  },
  progressPercent: {
    color: '#093030',
    fontSize: 10,
    fontWeight: '700',
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
  content: { padding: 20, backgroundColor: '#F6FFF8' },
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
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#DFF7E2',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  navItemActive: { backgroundColor: '#00D09E' },
});