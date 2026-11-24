import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  type: 'Income' | 'Expense';
  amount: string;
}

const CATEGORIES = ['All', 'Food', 'Groceries', 'Transport', 'Rent', 'Salary'];

const MOCK_ITEMS: SearchItem[] = [
  {
    id: '1',
    title: 'Dinner',
    subtitle: '18:27 - April 30',
    category: 'Food',
    date: '30 /APR/2023',
    type: 'Expense',
    amount: '-$26,00',
  },
  {
    id: '2',
    title: 'Groceries',
    subtitle: '17:00 - April 24',
    category: 'Groceries',
    date: '24 /APR/2023',
    type: 'Expense',
    amount: '-$100,00',
  },
  {
    id: '3',
    title: 'Monthly Salary',
    subtitle: '09:00 - April 01',
    category: 'Salary',
    date: '01 /APR/2023',
    type: 'Income',
    amount: '$4,000,00',
  },
];

export default function SearchScreen({ navigation, onNavigate }: any) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dateText, setDateText] = useState('30 /APR/2023');
  const [reportType, setReportType] = useState<'Income' | 'Expense'>('Expense');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const go = (screen: string) => {
    if (navigation?.navigate) {
      navigation.navigate(screen);
    } else if (onNavigate) {
      onNavigate(screen);
    }
  };

  const goBack = () => {
    if (navigation?.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      go('Home');
    }
  };

  const handleSearch = () => {
    const filtered = MOCK_ITEMS.filter((item) => {
      const matchType = item.type === reportType;
      const matchQuery =
        !query.trim() ||
        item.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        item.category.toLowerCase().includes(query.trim().toLowerCase());
      const matchCat =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchType && matchQuery && matchCat;
    });

    setResults(filtered.length > 0 ? filtered : [MOCK_ITEMS[0]]);
    setHasSearched(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={goBack} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
          <TouchableOpacity onPress={() => go('Notification')} style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={20} color="#093030" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#6C8A82"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.label}>Categories</Text>
          <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setDropdownOpen((prev) => !prev)}
          >
            <Text style={styles.selectText}>
              {selectedCategory === 'All' ? 'Select the category' : selectedCategory}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#00B074" />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownList}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setDropdownOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Date</Text>
          <View style={styles.dateBox}>
            <TextInput
              style={styles.dateInput}
              value={dateText}
              onChangeText={setDateText}
              placeholder="30 /APR/2023"
              placeholderTextColor="#6C8A82"
            />
            <TouchableOpacity onPress={() => go('Calendar')}>
              <Ionicons name="calendar-outline" size={20} color="#00B074" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Report</Text>
          <View style={styles.radioRow}>
            {(['Income', 'Expense'] as const).map((type) => {
              const active = reportType === type;
              return (
                <TouchableOpacity
                  key={type}
                  style={styles.radioBtn}
                  onPress={() => setReportType(type)}
                >
                  <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                    {active && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>{type}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>

          {hasSearched &&
            results.map((item) => (
              <View key={item.id} style={styles.resultCard}>
                <View style={styles.resultIconBox}>
                  <Ionicons name="restaurant-outline" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  <Text style={styles.resultSub}>{item.subtitle}</Text>
                </View>
                <Text style={styles.resultAmount}>{item.amount}</Text>
              </View>
            ))}
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => go('Home')}>
            <Ionicons name="home-outline" size={22} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => go('Analysis')}>
            <Ionicons name="stats-chart-outline" size={20} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => go('Transactions')}>
            <MaterialCommunityIcons name="swap-horizontal" size={24} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => go('Calendar')}>
            <Ionicons name="layers-outline" size={22} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => go('AccountBalance')}>
            <Ionicons name="person-outline" size={22} color="#093030" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#00D09E' },
  header: {
    backgroundColor: '#00D09E',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 24,
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
    backgroundColor: '#F1FFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 11,
    fontSize: 14,
    color: '#093030',
  },
  body: {
    flex: 1,
    backgroundColor: '#F6FFF8',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: 'hidden',
  },
  content: { padding: 22, paddingBottom: 28 },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#093030',
    marginBottom: 8,
    marginTop: 10,
  },
  selectBox: {
    backgroundColor: '#DFF7E2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: { fontSize: 13, color: '#4B6B63', fontWeight: '500' },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#DFF7E2',
  },
  dropdownItem: { paddingHorizontal: 16, paddingVertical: 10 },
  dropdownItemText: { fontSize: 13, color: '#093030', fontWeight: '500' },
  dateBox: {
    backgroundColor: '#DFF7E2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: { flex: 1, fontSize: 13, color: '#093030', paddingVertical: 2 },
  radioRow: { flexDirection: 'row', alignItems: 'center', gap: 28, marginTop: 6, marginBottom: 22 },
  radioBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#00B074',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: { borderColor: '#00B074' },
  radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00B074' },
  radioText: { fontSize: 13, color: '#093030', fontWeight: '500' },
  searchBtn: {
    backgroundColor: '#00D09E',
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
    alignSelf: 'center',
    width: 170,
    marginBottom: 20,
  },
  searchBtnText: { fontSize: 15, fontWeight: '700', color: '#093030' },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF8EE',
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
  },
  resultIconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#5B9BD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultInfo: { flex: 1 },
  resultTitle: { fontSize: 14, fontWeight: '700', color: '#093030' },
  resultSub: { fontSize: 11, color: '#3C6E9C', marginTop: 2 },
  resultAmount: { fontSize: 14, fontWeight: '700', color: '#0068FF' },
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