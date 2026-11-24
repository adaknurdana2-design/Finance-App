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
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type CategoryName =
  | 'Food'
  | 'Transport'
  | 'Medicine'
  | 'Groceries'
  | 'Rent'
  | 'Gifts'
  | 'Savings'
  | 'Entertainment';

interface CategoryMeta {
  key: CategoryName;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface CategoryTx {
  id: string;
  category: CategoryName;
  month: 'April' | 'March';
  title: string;
  date: string;
  amount: number;
  note?: string;
}

const CATEGORIES: CategoryMeta[] = [
  { key: 'Food', label: 'Food', icon: 'restaurant-outline' },
  { key: 'Transport', label: 'Transport', icon: 'bus-outline' },
  { key: 'Medicine', label: 'Medicine', icon: 'medkit-outline' },
  { key: 'Groceries', label: 'Groceries', icon: 'bag-handle-outline' },
  { key: 'Rent', label: 'Rent', icon: 'key-outline' },
  { key: 'Gifts', label: 'Gifts', icon: 'gift-outline' },
  { key: 'Savings', label: 'Savings', icon: 'wallet-outline' },
  { key: 'Entertainment', label: 'Entertainment', icon: 'ticket-outline' },
];

const INITIAL_CATEGORY_TX: CategoryTx[] = [
  {
    id: '1',
    category: 'Food',
    month: 'April',
    title: 'Dinner',
    date: '18:27 - April 30',
    amount: 26.0,
  },
  {
    id: '2',
    category: 'Food',
    month: 'April',
    title: 'Delivery Pizza',
    date: '15:00 - April 24',
    amount: 18.35,
  },
  {
    id: '3',
    category: 'Food',
    month: 'April',
    title: 'Lunch',
    date: '12:30 - April 15',
    amount: 15.4,
  },
  {
    id: '4',
    category: 'Food',
    month: 'April',
    title: 'Brunch',
    date: '9:30 - April 08',
    amount: 12.13,
  },
  {
    id: '5',
    category: 'Food',
    month: 'March',
    title: 'Dinner',
    date: '20:50 - March 31',
    amount: 27.2,
  },
  {
    id: '6',
    category: 'Transport',
    month: 'April',
    title: 'Metro & Bus',
    date: '08:45 - April 18',
    amount: 9.5,
  },
  {
    id: '7',
    category: 'Groceries',
    month: 'April',
    title: 'Supermarket',
    date: '17:00 - April 24',
    amount: 100.0,
  },
  {
    id: '8',
    category: 'Rent',
    month: 'April',
    title: 'Apartment',
    date: '8:30 - April 15',
    amount: 674.4,
  },
];

function formatExpenseAmount(num: number): string {
  return `-$${num.toFixed(2).replace('.', ',')}`;
}

export default function CategoriesScreen({
  navigation,
  onNavigate,
}: {
  navigation?: any;
  onNavigate?: (route: string, params?: any) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const [records, setRecords] = useState<CategoryTx[]>(INITIAL_CATEGORY_TX);
  const [dateInput, setDateInput] = useState('April 30 ,2024');
  const [formCategory, setFormCategory] = useState<CategoryName>('Food');
  const [amountInput, setAmountInput] = useState('$26,00');
  const [titleInput, setTitleInput] = useState('Dinner');
  const [messageInput, setMessageInput] = useState('');

  const goTo = (route: string, params?: any) => {
    if (navigation?.navigate) {
      navigation.navigate(route, params);
    } else if (onNavigate) {
      onNavigate(route, params);
    }
  };

  const handleBack = () => {
    if (isAddMode) {
      setIsAddMode(false);
      return;
    }
    if (selectedCategory) {
      setSelectedCategory(null);
      return;
    }
    if (navigation?.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      goTo('Home');
    }
  };

  const openCategoryDetail = (cat: CategoryName) => {
    setSelectedCategory(cat);
    setFormCategory(cat);
    setIsAddMode(false);
  };

  const openAddExpense = (presetCategory?: CategoryName) => {
    const targetCat = presetCategory || selectedCategory || 'Food';
    setFormCategory(targetCat);
    setTitleInput(targetCat === 'Food' ? 'Dinner' : `${targetCat} Expense`);
    setAmountInput('$26,00');
    setMessageInput('');
    setIsAddMode(true);
  };

  const handleSaveExpense = () => {
    const cleanNum = parseFloat(amountInput.replace(/[^0-9.,]/g, '').replace(',', '.'));
    if (!titleInput.trim() || Number.isNaN(cleanNum) || cleanNum <= 0) {
      return;
    }

    const newItem: CategoryTx = {
      id: String(Date.now()),
      category: formCategory,
      month: dateInput.toLowerCase().includes('mar') ? 'March' : 'April',
      title: titleInput.trim(),
      date: `18:27 - ${dateInput.trim() || 'April 30'}`,
      amount: cleanNum,
      note: messageInput.trim() || undefined,
    };

    setRecords((prev) => [newItem, ...prev]);
    setSelectedCategory(formCategory);
    setIsAddMode(false);
    setMessageInput('');
  };

  const headerTitle = isAddMode
    ? 'Add Expenses'
    : selectedCategory
      ? selectedCategory
      : 'Categories';

  const visibleCategories = showMoreCategories ? CATEGORIES : CATEGORIES.slice(0, 8);

  const categoryTransactions = selectedCategory
    ? records.filter((r) => r.category === selectedCategory)
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topGreenHeader}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <TouchableOpacity onPress={() => goTo('Notification')} style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={18} color="#093030" />
          </TouchableOpacity>
        </View>

        {!isAddMode && (
          <>
            <View style={styles.balanceRow}>
              <View style={styles.balanceCol}>
                <View style={styles.balanceLabelRow}>
                  <Feather name="arrow-up-right" size={12} color="#093030" />
                  <Text style={styles.balanceLabel}>Total Balance</Text>
                </View>
                <Text style={styles.totalBalanceText}>$7,783.00</Text>
              </View>
              <View style={styles.dividerLine} />
              <View style={styles.balanceCol}>
                <View style={styles.balanceLabelRow}>
                  <Feather name="arrow-down-right" size={12} color="#093030" />
                  <Text style={styles.balanceLabel}>Total Expense</Text>
                </View>
                <Text style={styles.totalExpenseText}>-$1.187.40</Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <View style={styles.progressFill}>
                <Text style={styles.progressPercentText}>30%</Text>
              </View>
              <Text style={styles.progressGoalText}>$20,000.00</Text>
            </View>

            <View style={styles.tipRow}>
              <Ionicons name="checkbox-outline" size={14} color="#093030" />
              <Text style={styles.tipText}>30% Of Your Expenses, Looks Good.</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.sheetContainer}>
        {isAddMode ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScroll}>
            <Text style={styles.fieldLabel}>Date</Text>
            <View style={styles.inputPillRow}>
              <TextInput
                style={styles.pillInput}
                value={dateInput}
                onChangeText={setDateInput}
                placeholder="April 30 ,2024"
                placeholderTextColor="#5A756E"
              />
              <TouchableOpacity onPress={() => goTo('Calendar')} style={styles.calendarMiniBtn}>
                <Ionicons name="calendar-outline" size={18} color="#00C48C" />
              </TouchableOpacity>
            </View>

            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.categoryPickerWrap}>
              {CATEGORIES.map((cat) => {
                const active = formCategory === cat.key;
                return (
                  <TouchableOpacity
                    key={cat.key}
                    style={[styles.categoryChip, active && styles.categoryChipActive]}
                    onPress={() => setFormCategory(cat.key)}
                  >
                    <Text style={[styles.categoryChipText, active && styles.categoryChipTextActive]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.fieldLabel}>Amount</Text>
            <TextInput
              style={styles.inputPill}
              value={amountInput}
              onChangeText={setAmountInput}
              keyboardType="decimal-pad"
              placeholder="$26,00"
              placeholderTextColor="#5A756E"
            />

            <Text style={styles.fieldLabel}>Expense Title</Text>
            <TextInput
              style={styles.inputPill}
              value={titleInput}
              onChangeText={setTitleInput}
              placeholder="Dinner"
              placeholderTextColor="#5A756E"
            />

            <Text style={styles.fieldLabel}>Enter Message</Text>
            <TextInput
              style={styles.messageBox}
              value={messageInput}
              onChangeText={setMessageInput}
              placeholder="Enter Message"
              placeholderTextColor="#00C48C"
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveExpense} activeOpacity={0.85}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : selectedCategory ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScroll}>
            {(['April', 'March'] as const).map((month) => {
              const monthList = categoryTransactions.filter((item) => item.month === month);
              if (monthList.length === 0) return null;

              return (
                <View key={month} style={styles.monthGroup}>
                  <View style={styles.monthHeaderRow}>
                    <Text style={styles.monthTitle}>{month}</Text>
                    {month === 'April' && (
                      <TouchableOpacity
                        style={styles.smallCalendarBtn}
                        onPress={() => goTo('Calendar')}
                      >
                        <Ionicons name="calendar-outline" size={16} color="#093030" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {monthList.map((tx) => {
                    const meta = CATEGORIES.find((c) => c.key === tx.category);
                    return (
                      <View key={tx.id} style={styles.txItemRow}>
                        <View style={styles.txBlueIcon}>
                          <Ionicons
                            name={meta?.icon || 'restaurant-outline'}
                            size={20}
                            color="#FFFFFF"
                          />
                        </View>
                        <View style={styles.txTitleCol}>
                          <Text style={styles.txTitle}>{tx.title}</Text>
                          <Text style={styles.txDate}>{tx.date}</Text>
                        </View>
                        <Text style={styles.txAmount}>{formatExpenseAmount(tx.amount)}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}

            <TouchableOpacity
              style={styles.addExpensesBtn}
              onPress={() => openAddExpense(selectedCategory)}
              activeOpacity={0.85}
            >
              <Text style={styles.addExpensesBtnText}>Add Expenses</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridScroll}>
            <View style={styles.gridWrap}>
              {visibleCategories.map((cat) => {
                const isHighlighted = cat.key === 'Food';
                return (
                  <TouchableOpacity
                    key={cat.key}
                    style={styles.gridCell}
                    activeOpacity={0.85}
                    onPress={() => openCategoryDetail(cat.key)}
                  >
                    <View style={[styles.tileBox, isHighlighted && styles.tileBoxSelected]}>
                      <Ionicons name={cat.icon} size={32} color="#FFFFFF" />
                    </View>
                    <Text style={styles.tileLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                style={styles.gridCell}
                activeOpacity={0.85}
                onPress={() => setShowMoreCategories((prev) => !prev)}
              >
                <View style={styles.tileBox}>
                  <Ionicons
                    name={showMoreCategories ? 'remove' : 'add'}
                    size={34}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.tileLabel}>{showMoreCategories ? 'Less' : 'More'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => goTo('Home')}>
            <Ionicons name="home-outline" size={22} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => goTo('Analysis')}>
            <Ionicons name="stats-chart-outline" size={20} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => goTo('Transactions')}>
            <MaterialCommunityIcons name="swap-horizontal" size={24} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navBtn, styles.navBtnActive]}
            onPress={() => {
              setIsAddMode(false);
              setSelectedCategory(null);
            }}
          >
            <Ionicons name="layers-outline" size={22} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => goTo('AccountBalance')}>
            <Ionicons name="person-outline" size={22} color="#093030" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00C48C',
  },
  topGreenHeader: {
    backgroundColor: '#00C48C',
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 22,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  iconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#093030',
  },
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1FFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  balanceCol: {
    flex: 1,
    alignItems: 'center',
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#093030',
    fontWeight: '500',
  },
  totalBalanceText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  totalExpenseText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0068FF',
  },
  dividerLine: {
    width: 1,
    height: 34,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  progressBar: {
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1FFF3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: '#052224',
    borderRadius: 11,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  progressPercentText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  progressGoalText: {
    color: '#093030',
    fontSize: 11,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#093030',
    fontWeight: '500',
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: '#F6FFF8',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: 'hidden',
  },
  gridScroll: {
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 20,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCell: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 20,
  },
  tileBox: {
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: '#6DB6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tileBoxSelected: {
    backgroundColor: '#0068FF',
  },
  tileLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#093030',
  },
  detailScroll: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 24,
  },
  monthGroup: {
    marginBottom: 14,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#093030',
  },
  smallCalendarBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#00D09E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  txBlueIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#5BA4FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txTitleCol: {
    flex: 1,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
  },
  txDate: {
    fontSize: 11,
    color: '#0068FF',
    marginTop: 2,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0068FF',
  },
  addExpensesBtn: {
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    paddingHorizontal: 34,
    paddingVertical: 11,
    borderRadius: 20,
    marginTop: 8,
  },
  addExpensesBtnText: {
    color: '#093030',
    fontWeight: '700',
    fontSize: 14,
  },
  formScroll: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 8,
  },
  inputPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingRight: 12,
    marginBottom: 14,
  },
  pillInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 14,
    color: '#093030',
  },
  calendarMiniBtn: {
    padding: 4,
  },
  inputPill: {
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 14,
    color: '#093030',
    marginBottom: 14,
  },
  categoryPickerWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  categoryChip: {
    backgroundColor: '#DFF7E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  categoryChipActive: {
    backgroundColor: '#0068FF',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#093030',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  messageBox: {
    height: 115,
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 14,
    color: '#093030',
    marginBottom: 18,
  },
  saveBtn: {
    alignSelf: 'center',
    backgroundColor: '#00D09E',
    paddingHorizontal: 46,
    paddingVertical: 11,
    borderRadius: 20,
  },
  saveBtnText: {
    color: '#093030',
    fontWeight: '700',
    fontSize: 14,
  },
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
  navBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnActive: {
    backgroundColor: '#00D09E',
  },
});