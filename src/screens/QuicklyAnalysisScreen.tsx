import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const WEEKS = [
  { label: '1st Week', percent: 25 },
  { label: '2nd Week', percent: 45 },
  { label: '3rd Week', percent: 30 },
  { label: '4th Week', percent: 85 },
];

const ITEMS = [
  { id: '1', title: 'Salary', date: '18:27 - April 30', category: 'Monthly', amount: '$4.000,00', isIncome: true, icon: '💼' },
  { id: '2', title: 'Groceries', date: '17:00 - April 24', category: 'Pantry', amount: '-$100,00', isIncome: false, icon: '🛒' },
  { id: '3', title: 'Rent', date: '8:30 - April 15', category: 'Rent', amount: '-$674,40', isIncome: false, icon: '🔑' },
];

export default function QuicklyAnalysisScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Quickly Analysis</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={styles.bellBtn}
            >
              <Text style={styles.bellIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.goalCircle}>
              <Text style={styles.carIcon}>🚗</Text>
              <Text style={styles.goalText}>Savings On Goals</Text>
            </View>
            <View style={styles.summaryStats}>
              <View style={styles.statLine}>
                <Text style={styles.statCaption}>↙ Revenue Last Week</Text>
                <Text style={styles.statRevenue}>$4.000.00</Text>
              </View>
              <View style={styles.statLineNoBorder}>
                <Text style={styles.statCaption}>↗ Food Last Week</Text>
                <Text style={styles.statFood}>-$100.00</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>April Expenses</Text>
              <View style={styles.chartIcons}>
                <View style={styles.smallGreenBtn}>
                  <Text style={styles.smallBtnText}>📊</Text>
                </View>
                <View style={styles.smallGreenBtn}>
                  <Text style={styles.smallBtnText}>🔎</Text>
                </View>
              </View>
            </View>

            <View style={styles.chartBars}>
              {WEEKS.map((w) => (
                <View key={w.label} style={styles.barItem}>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { height: `${w.percent}%` }]} />
                  </View>
                  <Text style={styles.barLabel}>{w.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {ITEMS.map((item) => (
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
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  goalCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#0068FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  carIcon: { fontSize: 22 },
  goalText: { fontSize: 10, color: '#093030', fontWeight: '700', textAlign: 'center', marginTop: 2 },
  summaryStats: { flex: 1 },
  statLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    paddingBottom: 8,
    marginBottom: 8,
  },
  statLineNoBorder: {},
  statCaption: { fontSize: 12, color: '#093030' },
  statRevenue: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginTop: 2 },
  statFood: { fontSize: 18, fontWeight: '800', color: '#0068FF', marginTop: 2 },
  content: { padding: 20 },
  chartCard: {
    backgroundColor: '#DFF7E2',
    borderRadius: 22,
    padding: 16,
    marginBottom: 18,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  chartTitle: { fontSize: 15, fontWeight: '700', color: '#093030' },
  chartIcons: { flexDirection: 'row', gap: 8 },
  smallGreenBtn: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#00C48C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBtnText: { fontSize: 13 },
  chartBars: {
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  barItem: { alignItems: 'center', flex: 1 },
  barTrack: {
    width: 10,
    height: 95,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 196, 140, 0.2)',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 6,
  },
  barFill: {
    width: '100%',
    backgroundColor: '#00C48C',
    borderRadius: 5,
  },
  barLabel: { fontSize: 11, color: '#093030' },
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