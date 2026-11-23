import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type PeriodKey = 'Daily' | 'Weekly' | 'Monthly' | 'Year';

interface ChartBarItem {
  label: string;
  income: number;
  expense: number;
}

const CHART_DATA: Record<
  PeriodKey,
  {
    incomeTotal: string;
    expenseTotal: string;
    bars: ChartBarItem[];
  }
> = {
  Daily: {
    incomeTotal: '$4,120.00',
    expenseTotal: '$1.187.40',
    bars: [
      { label: 'Mon', income: 4.5, expense: 8.2 },
      { label: 'Tue', income: 1.5, expense: 3.8 },
      { label: 'Wed', income: 8.0, expense: 3.8 },
      { label: 'Thu', income: 1.3, expense: 5.5 },
      { label: 'Fri', income: 10.2, expense: 9.2 },
      { label: 'Sat', income: 3.2, expense: 1.0 },
      { label: 'Sun', income: 2.2, expense: 7.0 },
    ],
  },
  Weekly: {
    incomeTotal: '$12,450.00',
    expenseTotal: '$4,320.10',
    bars: [
      { label: 'W1', income: 9.0, expense: 5.0 },
      { label: 'W2', income: 11.5, expense: 6.2 },
      { label: 'W3', income: 7.4, expense: 4.1 },
      { label: 'W4', income: 13.0, expense: 7.8 },
    ],
  },
  Monthly: {
    incomeTotal: '$48,900.00',
    expenseTotal: '$14,670.00',
    bars: [
      { label: 'Jan', income: 8.5, expense: 4.0 },
      { label: 'Feb', income: 9.2, expense: 5.1 },
      { label: 'Mar', income: 11.0, expense: 4.8 },
      { label: 'Apr', income: 10.4, expense: 6.3 },
      { label: 'May', income: 12.8, expense: 5.5 },
      { label: 'Jun', income: 13.5, expense: 7.0 },
    ],
  },
  Year: {
    incomeTotal: '$195,400.00',
    expenseTotal: '$58,620.00',
    bars: [
      { label: '2022', income: 9.5, expense: 4.5 },
      { label: '2023', income: 11.2, expense: 5.8 },
      { label: '2024', income: 12.8, expense: 6.1 },
      { label: '2025', income: 14.0, expense: 6.9 },
      { label: '2026', income: 14.8, expense: 5.4 },
    ],
  },
};

interface AnalysisScreenProps {
  navigation?: any;
  onNavigateTab?: (tabName: string) => void;
}

export default function AnalysisScreen({
  navigation,
  onNavigateTab,
}: AnalysisScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('Daily');
  const [activeBottomTab, setActiveBottomTab] = useState<string>('Analysis');

  const currentData = CHART_DATA[selectedPeriod];
  const maxChartValue = 15;
  const maxBarHeight = 96;

  const handleGoBack = () => {
    if (navigation?.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    } else if (onNavigateTab) {
      onNavigateTab('Home');
    }
  };

  const handleBottomPress = (tab: string) => {
    setActiveBottomTab(tab);
    if (navigation?.navigate) {
      navigation.navigate(tab);
    } else if (onNavigateTab) {
      onNavigateTab(tab);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#00D09E" />
      <View style={styles.headerSection}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analysis</Text>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={20} color="#093030" />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceRow}>
          <View style={styles.balanceCol}>
            <View style={styles.labelWithIcon}>
              <Feather name="arrow-up-right" size={13} color="#093030" />
              <Text style={styles.balanceLabel}>Total Balance</Text>
            </View>
            <Text style={styles.balanceAmount}>$7,783.00</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.balanceCol}>
            <View style={styles.labelWithIcon}>
              <Feather name="arrow-down-right" size={13} color="#093030" />
              <Text style={styles.balanceLabel}>Total Expense</Text>
            </View>
            <Text style={styles.expenseAmount}>-$1.187.40</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressFill}>
            <Text style={styles.progressPercentText}>30%</Text>
          </View>
          <Text style={styles.progressTargetText}>$20,000.00</Text>
        </View>
        <View style={styles.statusRow}>
          <Ionicons name="checkbox-outline" size={15} color="#093030" />
          <Text style={styles.statusText}>30% Of Your Expenses, Looks Good.</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.periodTabsWrapper}>
            {(['Daily', 'Weekly', 'Monthly', 'Year'] as PeriodKey[]).map((period) => {
              const isActive = selectedPeriod === period;
              return (
                <TouchableOpacity
                  key={period}
                  style={[styles.periodTab, isActive && styles.periodTabActive]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text style={[styles.periodTabText, isActive && styles.periodTabTextActive]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Income & Expenses</Text>
              <View style={styles.chartActionIcons}>
                <TouchableOpacity style={styles.circleActionBtn}>
                  <Ionicons name="search-outline" size={16} color="#093030" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleActionBtn}>
                  <Ionicons name="calendar-outline" size={16} color="#093030" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.chartBody}>
              <View style={styles.yAxis}>
                <Text style={styles.yLabel}>15k</Text>
                <Text style={styles.yLabel}>10k</Text>
                <Text style={styles.yLabel}>5k</Text>
                <Text style={styles.yLabel}>1k</Text>
              </View>
              <View style={styles.barsArea}>
                <View style={[styles.gridLine, { top: 6 }]} />
                <View style={[styles.gridLine, { top: 36 }]} />
                <View style={[styles.gridLine, { top: 66 }]} />
                <View style={[styles.gridLine, { top: 96 }]} />
                <View style={styles.barsRow}>
                  {currentData.bars.map((item, idx) => {
                    const incomeH = Math.max(6, (item.income / maxChartValue) * maxBarHeight);
                    const expenseH = Math.max(6, (item.expense / maxChartValue) * maxBarHeight);
                    return (
                      <View key={idx} style={styles.barGroup}>
                        <View style={styles.barPair}>
                          <View style={[styles.bar, styles.incomeBar, { height: incomeH }]} />
                          <View style={[styles.bar, styles.expenseBar, { height: expenseH }]} />
                        </View>
                        <Text style={styles.xLabel}>{item.label}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={styles.incomeIconBox}>
                <Feather name="arrow-up-right" size={16} color="#00D09E" />
              </View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryIncomeVal}>{currentData.incomeTotal}</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={styles.expenseIconBox}>
                <Feather name="arrow-down-right" size={16} color="#0068FF" />
              </View>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryExpenseVal}>{currentData.expenseTotal}</Text>
            </View>
          </View>
          <Text style={styles.targetsTitle}>My Targets</Text>
        </ScrollView>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => handleBottomPress('Home')}>
            <Ionicons name="home-outline" size={24} color={activeBottomTab === 'Home' ? '#00D09E' : '#093030'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navItem, activeBottomTab === 'Analysis' && styles.navItemActive]}
            onPress={() => handleBottomPress('Analysis')}
          >
            <Ionicons name="stats-chart-outline" size={22} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleBottomPress('Transactions')}>
            <MaterialCommunityIcons name="swap-horizontal" size={26} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleBottomPress('Categories')}>
            <Ionicons name="layers-outline" size={24} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleBottomPress('Profile')}>
            <Ionicons name="person-outline" size={24} color="#093030" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#00D09E' },
  headerSection: { backgroundColor: '#00D09E', paddingHorizontal: 22, paddingTop: 10, paddingBottom: 22 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#093030' },
  bellBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F1FFF3', alignItems: 'center', justifyContent: 'center' },
  balanceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  balanceCol: { flex: 1, paddingHorizontal: 6 },
  labelWithIcon: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  balanceLabel: { fontSize: 12, color: '#093030', fontWeight: '500' },
  balanceAmount: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  expenseAmount: { fontSize: 22, fontWeight: '800', color: '#0068FF' },
  verticalDivider: { width: 1, height: 38, backgroundColor: 'rgba(255,255,255,0.6)', marginHorizontal: 8 },
  progressContainer: { height: 24, backgroundColor: '#F1FFF3', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 12, overflow: 'hidden', marginBottom: 10 },
  progressFill: { width: '32%', height: '100%', backgroundColor: '#052224', borderRadius: 12, justifyContent: 'center', paddingLeft: 12 },
  progressPercentText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  progressTargetText: { color: '#093030', fontSize: 11, fontWeight: '700', fontStyle: 'italic' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingLeft: 4 },
  statusText: { fontSize: 12, color: '#093030', fontWeight: '500' },
  bodyContainer: { flex: 1, backgroundColor: '#F6FFF8', borderTopLeftRadius: 36, borderTopRightRadius: 36, overflow: 'hidden' },
  scrollContent: { paddingHorizontal: 22, paddingTop: 22, paddingBottom: 20 },
  periodTabsWrapper: { flexDirection: 'row', backgroundColor: '#DFF7E2', borderRadius: 20, padding: 4, justifyContent: 'space-between', marginBottom: 18 },
  periodTab: { flex: 1, paddingVertical: 10, borderRadius: 16, alignItems: 'center' },
  periodTabActive: { backgroundColor: '#00D09E' },
  periodTabText: { fontSize: 13, fontWeight: '600', color: '#093030' },
  periodTabTextActive: { color: '#093030', fontWeight: '700' },
  chartCard: { backgroundColor: '#DFF7E2', borderRadius: 26, padding: 16, marginBottom: 20 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  chartTitle: { fontSize: 14, fontWeight: '700', color: '#093030' },
  chartActionIcons: { flexDirection: 'row', gap: 8 },
  circleActionBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#00D09E', alignItems: 'center', justifyContent: 'center' },
  chartBody: { flexDirection: 'row', alignItems: 'flex-end', height: 125 },
  yAxis: { justifyContent: 'space-between', height: 100, paddingRight: 8, marginBottom: 18 },
  yLabel: { fontSize: 10, color: '#5B9BD5', fontWeight: '600' },
  barsArea: { flex: 1, height: 120, position: 'relative', justifyContent: 'flex-end' },
  gridLine: { position: 'absolute', left: 0, right: 0, height: 1, borderStyle: 'dashed', borderWidth: 0.6, borderColor: 'rgba(91, 155, 213, 0.35)' },
  barsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' },
  barGroup: { alignItems: 'center' },
  barPair: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 100, borderBottomWidth: 1, borderBottomColor: '#093030', paddingHorizontal: 3 },
  bar: { width: 5, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  incomeBar: { backgroundColor: '#00D09E' },
  expenseBar: { backgroundColor: '#0068FF' },
  xLabel: { fontSize: 10, color: '#093030', marginTop: 5, fontWeight: '600' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 18 },
  summaryItem: { alignItems: 'center' },
  incomeIconBox: { width: 26, height: 26, borderRadius: 7, borderWidth: 1.5, borderColor: '#00D09E', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  expenseIconBox: { width: 26, height: 26, borderRadius: 7, borderWidth: 1.5, borderColor: '#0068FF', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  summaryLabel: { fontSize: 13, color: '#093030', fontWeight: '500', marginBottom: 2 },
  summaryIncomeVal: { fontSize: 18, fontWeight: '800', color: '#093030' },
  summaryExpenseVal: { fontSize: 18, fontWeight: '800', color: '#0068FF' },
  targetsTitle: { fontSize: 15, fontWeight: '700', color: '#093030', marginTop: 4 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#DFF7E2', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingVertical: 12, paddingHorizontal: 18, justifyContent: 'space-around', alignItems: 'center' },
  navItem: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  navItemActive: { backgroundColor: '#00D09E' },
});
