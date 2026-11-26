import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export type AppTabKey = 'Home' | 'Analysis' | 'Transactions' | 'Categories' | 'Profile';
export type CalendarMode = 'Spends' | 'Categories';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = ['April', 'May', 'June'];
const YEARS = ['2023', '2024', '2025'];

const SPENDS_ITEMS = [
  {
    id: '1',
    title: 'Groceries',
    time: '17:00',
    tag: 'Pantry',
    amount: '-$100,00',
    isPositive: false,
  },
  {
    id: '2',
    title: 'Others',
    time: '17:00',
    tag: 'Payments',
    amount: '$120,00',
    isPositive: true,
  },
];

export interface CalendarScreenProps {
  navigation?: any;
  onNavigate?: (screen: string) => void;
  onNavigateTab?: (tabName: AppTabKey | string) => void;
  onBack?: () => void;
}

export default function CalendarScreen({
  navigation,
  onNavigate,
  onNavigateTab,
  onBack,
}: CalendarScreenProps) {
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [mode, setMode] = useState<CalendarMode>('Categories');

  const navigateTo = (target: string) => {
    if (navigation?.navigate) {
      navigation.navigate(target);
    } else if (onNavigate) {
      onNavigate(target);
    } else if (onNavigateTab) {
      onNavigateTab(target);
    }
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigateTo('Analysis');
    }
  };

  const cycleMonth = () => {
    const nextIndex = (MONTHS.indexOf(selectedMonth) + 1) % MONTHS.length;
    setSelectedMonth(MONTHS[nextIndex]);
  };

  const cycleYear = () => {
    const nextIndex = (YEARS.indexOf(selectedYear) + 1) % YEARS.length;
    setSelectedYear(YEARS[nextIndex]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" /*backgroundColor="#00D09E" */ />

      <View style={styles.headerSection}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calender</Text>
          <TouchableOpacity
            onPress={() => navigateTo('Notification')}
            style={styles.bellBtn}
          >
            <Ionicons name="notifications-outline" size={20} color="#093030" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.pickerRow}>
            <TouchableOpacity style={styles.pickerBtn} onPress={cycleMonth}>
              <Text style={styles.pickerText}>{selectedMonth}</Text>
              <Ionicons name="chevron-down" size={16} color="#00B074" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.pickerBtn} onPress={cycleYear}>
              <Text style={styles.pickerText}>{selectedYear}</Text>
              <Ionicons name="chevron-down" size={16} color="#00B074" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekHeaderRow}>
            {WEEK_DAYS.map((day) => (
              <Text key={day} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {MONTH_DAYS.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.modeTabsRow}>
            {(['Spends', 'Categories'] as CalendarMode[]).map((tab) => {
              const active = mode === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.modeTab, active && styles.modeTabActive]}
                  onPress={() => setMode(tab)}
                >
                  <Text style={[styles.modeTabText, active && styles.modeTabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {mode === 'Categories' ? (
            <View style={styles.chartSection}>
              <View style={styles.semiChartWrap}>
                <View style={styles.leftSlice}>
                  <Text style={styles.slicePercentWhite}>10%</Text>
                </View>
                <View style={styles.rightStack}>
                  <View style={styles.topRightSlice}>
                    <Text style={styles.slicePercentWhite}>11%</Text>
                  </View>
                  <View style={styles.bottomRightSlice}>
                    <Text style={styles.slicePercentDark}>79%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#0068FF' }]} />
                  <Text style={styles.legendText}>Groceries</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#4DA3FF' }]} />
                  <Text style={styles.legendText}>Others</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.itemsList}>
              {SPENDS_ITEMS.map((item, index) => (
                <View key={item.id} style={styles.entryRow}>
                  <View style={styles.entryLeft}>
                    <View style={styles.entryIconBox}>
                      <Ionicons
                        name={index === 0 ? 'cart-outline' : 'layers-outline'}
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
                    <View>
                      <Text style={styles.entryTitle}>{item.title}</Text>
                      <Text style={styles.entrySub}>
                        {item.time} - {selectedMonth} {selectedDay}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.entryMiddle}>
                    <Text style={styles.entryTag}>{item.tag}</Text>
                  </View>
                  <Text
                    style={[
                      styles.entryAmount,
                      item.isPositive && styles.positiveAmount,
                    ]}
                  >
                    {item.amount}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigateTo('Home')}>
            <Ionicons name="home-outline" size={22} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navItem, styles.navItemActive]}
            onPress={() => navigateTo('Analysis')}
          >
            <Ionicons name="stats-chart-outline" size={20} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('Transactions')}
          >
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={24}
              color="#093030"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('Categories')}
          >
            <Ionicons name="layers-outline" size={22} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('AccountBalance')}
          >
            <Ionicons name="person-outline" size={22} color="#093030" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#00D09E' },
  headerSection: {
    backgroundColor: '#00D09E',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#093030' },
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1FFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#F6FFF8',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 22,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 6,
  },
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF7E2',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
    gap: 6,
  },
  pickerText: { fontSize: 13, fontWeight: '700', color: '#00B074' },
  weekHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDayText: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#00B074',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  dayCell: {
    width: '14.28%',
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    marginVertical: 1,
  },
  dayCellSelected: { backgroundColor: '#00D09E' },
  dayText: { fontSize: 13, fontWeight: '600', color: '#093030' },
  dayTextSelected: { color: '#FFFFFF', fontWeight: '700' },
  modeTabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 18,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#DFF7E2',
    alignItems: 'center',
  },
  modeTabActive: { backgroundColor: '#00D09E' },
  modeTabText: { fontSize: 13, fontWeight: '600', color: '#093030' },
  modeTabTextActive: { color: '#093030', fontWeight: '700' },
  chartSection: { alignItems: 'center', marginTop: 4 },
  semiChartWrap: {
    width: 240,
    height: 120,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  leftSlice: {
    width: '36%',
    height: '100%',
    backgroundColor: '#0068FF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 22,
    borderRightWidth: 2,
    borderRightColor: '#F6FFF8',
  },
  rightStack: { flex: 1, height: '100%' },
  topRightSlice: {
    flex: 0.34,
    backgroundColor: '#4DA3FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#F6FFF8',
  },
  bottomRightSlice: {
    flex: 0.66,
    backgroundColor: '#2F88FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slicePercentWhite: { fontSize: 12, fontWeight: '800', color: '#FFFFFF' },
  slicePercentDark: { fontSize: 13, fontWeight: '800', color: '#093030' },
  legendRow: { flexDirection: 'row', gap: 28, marginTop: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, fontWeight: '600', color: '#093030' },
  itemsList: { gap: 14 },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  entryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1.4,
  },
  entryIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#6CA6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryTitle: { fontSize: 14, fontWeight: '700', color: '#093030' },
  entrySub: { fontSize: 10, color: '#0068FF', fontWeight: '600', marginTop: 2 },
  entryMiddle: {
    flex: 0.8,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#9AD9C3',
    paddingHorizontal: 6,
  },
  entryTag: { fontSize: 11, color: '#3C6E63', fontWeight: '500' },
  entryAmount: {
    flex: 0.9,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '800',
    color: '#0068FF',
  },
  positiveAmount: { color: '#093030' },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#DFF7E2',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 18,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: { backgroundColor: '#00D09E' },
});