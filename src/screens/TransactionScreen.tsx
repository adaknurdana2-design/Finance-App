import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface TxRecord {
  id: string;
  month: 'April' | 'March';
  title: string;
  date: string;
  category: string;
  amount: number;
  icon: string;
}

const INITIAL_TRANSACTIONS: TxRecord[] = [
  {
    id: '1',
    month: 'April',
    title: 'Salary',
    date: '18:27 - April 30',
    category: 'Monthly',
    amount: 4000,
    icon: '💼',
  },
  {
    id: '2',
    month: 'April',
    title: 'Groceries',
    date: '17:00 - April 24',
    category: 'Pantry',
    amount: -100,
    icon: '🛒',
  },
  {
    id: '3',
    month: 'April',
    title: 'Rent',
    date: '8:30 - April 15',
    category: 'Rent',
    amount: -674.4,
    icon: '🔑',
  },
  {
    id: '4',
    month: 'April',
    title: 'Transport',
    date: '9:30 - April 08',
    category: 'Fuel',
    amount: -4.13,
    icon: '🚌',
  },
  {
    id: '5',
    month: 'March',
    title: 'Food',
    date: '19:40 - March 29',
    category: 'Dining',
    amount: -35.4,
    icon: '🍽️',
  },
];

function formatMoney(num: number): string {
  const abs = Math.abs(num).toFixed(2);
  return num < 0 ? `-$${abs}` : `$${abs}`;
}

export default function TransactionScreen({ navigation }: { navigation: any }) {
  const [items, setItems] = useState<TxRecord[]>(INITIAL_TRANSACTIONS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [amountInput, setAmountInput] = useState('');
  const [isExpense, setIsExpense] = useState(true);

  const incomeTotal = items
    .filter((i) => i.amount > 0)
    .reduce((acc, i) => acc + i.amount, 0);

  const expenseTotal = items
    .filter((i) => i.amount < 0)
    .reduce((acc, i) => acc + Math.abs(i.amount), 0);

  const totalBalance = 7783 + (incomeTotal - 4000) - (expenseTotal - 778.53);

  const handleAddTransaction = () => {
    const parsed = parseFloat(amountInput.replace(',', '.'));
    if (!title.trim() || Number.isNaN(parsed) || parsed <= 0) {
      return;
    }

    const signedAmount = isExpense ? -parsed : parsed;
    const newTx: TxRecord = {
      id: String(Date.now()),
      month: 'April',
      title: title.trim(),
      date: 'Just now - April',
      category: category.trim() || 'General',
      amount: signedAmount,
      icon: isExpense ? '🧾' : '💵',
    };

    setItems((prev) => [newTx, ...prev]);
    setTitle('');
    setAmountInput('');
    setShowAddForm(false);
  };

  const months: Array<'April' | 'March'> = ['April', 'March'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transaction</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={styles.bellBtn}
            >
              <Text style={styles.bellIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Balance</Text>
            <Text style={styles.totalValue}>{formatMoney(totalBalance)}</Text>
          </View>

          <View style={styles.subStatsRow}>
            <View style={styles.subStatCard}>
              <Text style={styles.subStatLabel}>↙ Income</Text>
              <Text style={styles.subStatIncome}>{formatMoney(incomeTotal)}</Text>
            </View>
            <View style={styles.subStatCard}>
              <Text style={styles.subStatLabel}>↗ Expense</Text>
              <Text style={styles.subStatExpense}>-{formatMoney(expenseTotal).replace('-', '')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.addToggleBtn}
              onPress={() => setShowAddForm((prev) => !prev)}
            >
              <Text style={styles.addToggleText}>
                {showAddForm ? '✕ Close Form' : '+ Add Transaction'}
              </Text>
            </TouchableOpacity>
          </View>

          {showAddForm && (
            <View style={styles.formCard}>
              <View style={styles.typeSwitch}>
                <TouchableOpacity
                  style={[styles.typeBtn, isExpense && styles.typeBtnActive]}
                  onPress={() => setIsExpense(true)}
                >
                  <Text style={[styles.typeText, isExpense && styles.typeTextActive]}>
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeBtn, !isExpense && styles.typeBtnActive]}
                  onPress={() => setIsExpense(false)}
                >
                  <Text style={[styles.typeText, !isExpense && styles.typeTextActive]}>
                    Income
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Title (e.g. Taxi, Bonus)"
                placeholderTextColor="#64748B"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Category (e.g. Transport, Salary)"
                placeholderTextColor="#64748B"
                value={category}
                onChangeText={setCategory}
              />
              <TextInput
                style={styles.input}
                placeholder="Amount (e.g. 25.50)"
                placeholderTextColor="#64748B"
                keyboardType="decimal-pad"
                value={amountInput}
                onChangeText={setAmountInput}
              />

              <TouchableOpacity style={styles.saveBtn} onPress={handleAddTransaction}>
                <Text style={styles.saveBtnText}>Save Transaction</Text>
              </TouchableOpacity>
            </View>
          )}

          {months.map((monthName) => {
            const monthItems = items.filter((item) => item.month === monthName);
            if (monthItems.length === 0) return null;

            return (
              <View key={monthName} style={styles.monthSection}>
                <Text style={styles.monthTitle}>{monthName}</Text>

                {monthItems.map((tx) => {
                  const positive = tx.amount >= 0;
                  return (
                    <View key={tx.id} style={styles.txRow}>
                      <View style={styles.txIconBox}>
                        <Text style={styles.txIcon}>{tx.icon}</Text>
                      </View>
                      <View style={styles.txInfo}>
                        <Text style={styles.txTitle}>{tx.title}</Text>
                        <Text style={styles.txDate}>{tx.date}</Text>
                      </View>
                      <Text style={styles.txCategory}>{tx.category}</Text>
                      <Text
                        style={[
                          styles.txAmount,
                          positive ? styles.txPositive : styles.txNegative,
                        ]}
                      >
                        {formatMoney(tx.amount)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3FFF6' },
  header: {
    backgroundColor: '#00C48C',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 22,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
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
  totalBox: {
    backgroundColor: '#F1FFF3',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: { fontSize: 12, color: '#093030' },
  totalValue: { fontSize: 22, fontWeight: '800', color: '#093030', marginTop: 2 },
  subStatsRow: { flexDirection: 'row', gap: 12 },
  subStatCard: {
    flex: 1,
    backgroundColor: '#F1FFF3',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  subStatLabel: { fontSize: 12, color: '#093030' },
  subStatIncome: { fontSize: 16, fontWeight: '800', color: '#093030', marginTop: 2 },
  subStatExpense: { fontSize: 16, fontWeight: '800', color: '#0068FF', marginTop: 2 },
  content: { padding: 20, paddingBottom: 32 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  addToggleBtn: {
    backgroundColor: '#00C48C',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  addToggleText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  formCard: {
    backgroundColor: '#E4F6EA',
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    gap: 10,
  },
  typeSwitch: { flexDirection: 'row', gap: 8 },
  typeBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  typeBtnActive: { backgroundColor: '#093030' },
  typeText: { fontWeight: '700', color: '#093030', fontSize: 13 },
  typeTextActive: { color: '#FFFFFF' },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: '#093030',
  },
  saveBtn: {
    backgroundColor: '#00C48C',
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: 'center',
  },
  saveBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  monthSection: { marginBottom: 16 },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  txIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txIcon: { fontSize: 18 },
  txInfo: { flex: 1 },
  txTitle: { fontSize: 14, fontWeight: '700', color: '#093030' },
  txDate: { fontSize: 11, color: '#0068FF', marginTop: 2 },
  txCategory: { fontSize: 12, color: '#334155', marginRight: 10 },
  txAmount: { fontSize: 14, fontWeight: '700' },
  txPositive: { color: '#093030' },
  txNegative: { color: '#0068FF' },
});