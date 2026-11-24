import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CALENDAR_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function CalendarScreen({ navigation, onNavigate }: any) {
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [activeTab, setActiveTab] = useState<'Spends' | 'Categories'>('Spends');
  const [monthLabel, setMonthLabel] = useState('April');
  const [yearLabel, setYearLabel] = useState('2023');

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
      go('Analysis');
    }
  };

  const cycleMonth = () => {
    setMonthLabel((prev) => (prev === 'April' ? 'May' : 'April'));
  };

  const cycleYear = () => {
    setYearLabel((prev) => (prev === '2023' ? '2024' : '2023'));
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export type AppTabKey = "Home" | "Analysis" | "Transactions" | "Categories" | "Profile";
export type CalendarMode = "Spends" | "Categories";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const SPENDS_ITEMS = [
  { id: "1", title: "Groceries", timeAndDate: "17:00 - April 24", tag: "Pantry", amount: "-$100,00", isPositive: false },
  { id: "2", title: "Others", timeAndDate: "17:00 - April 24", tag: "Payments", amount: "$120,00", isPositive: true },
];

export interface CalendarScreenProps {
  navigation?: any;
  onNavigateTab?: (tabName: AppTabKey | string) => void;
  onBack?: () => void;
}

export default function CalendarScreen({ navigation, onNavigateTab, onBack }: CalendarScreenProps) {
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [mode, setMode] = useState<CalendarMode>("Categories");

  const handleGoBack = () => {
    if (onBack) onBack();
    else if (navigation?.canGoBack && navigation.canGoBack()) navigation.goBack();
    else if (navigation?.navigate) navigation.navigate("Analysis");
    else if (onNavigateTab) onNavigateTab("Analysis");
  };

  const handleBottomPress = (tab: AppTabKey) => {
    if (navigation?.navigate) navigation.navigate(tab);
    if (onNavigateTab) onNavigateTab(tab);
  };

  const cycleMonth = () => {
    const list = ["April", "May", "June"];
    setSelectedMonth(list[(list.indexOf(selectedMonth) + 1) % list.length]);
  };

  const cycleYear = () => {
    const list = ["2023", "2024", "2025"];
    setSelectedYear(list[(list.indexOf(selectedYear) + 1) % list.length]);

  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={goBack} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={22} color="#093030" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calender</Text>
          <TouchableOpacity onPress={() => go('Notification')} style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={20} color="#093030" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.pickerRow}>
            <TouchableOpacity style={styles.pickerBtn} onPress={cycleMonth}>
              <Text style={styles.pickerText}>{monthLabel}</Text>
              <Ionicons name="chevron-down" size={16} color="#00B074" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.pickerBtn} onPress={cycleYear}>
              <Text style={styles.pickerText}>{yearLabel}</Text>
              <Ionicons name="chevron-down" size={16} color="#00B074" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekHeader}>
            {DAYS_OF_WEEK.map((d) => (
              <Text key={d} style={styles.weekDayText}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {CALENDAR_DAYS.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, isSelected && styles.dayCellActive]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>
                    {day}
                  </Text>

      <StatusBar barStyle="dark-content" backgroundColor="#00D09E" />
      <View style={styles.headerSection}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}><Ionicons name="arrow-back" size={22} color="#FFFFFF" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Calender</Text>
          <TouchableOpacity style={styles.bellBtn}><Ionicons name="notifications-outline" size={20} color="#093030" /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.pickerRow}>
            <TouchableOpacity style={styles.pickerBtn} onPress={cycleMonth}><Text style={styles.pickerText}>{selectedMonth}</Text><Ionicons name="chevron-down" size={14} color="#00A878" /></TouchableOpacity>
            <TouchableOpacity style={styles.pickerBtn} onPress={cycleYear}><Text style={styles.pickerText}>{selectedYear}</Text><Ionicons name="chevron-down" size={14} color="#00A878" /></TouchableOpacity>
          </View>

          <View style={styles.weekHeaderRow}>{WEEK_DAYS.map((d) => (<Text key={d} style={styles.weekDayText}>{d}</Text>))}</View>

          <View style={styles.daysGrid}>
            {MONTH_DAYS.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <TouchableOpacity key={day} style={[styles.dayCell, isSelected && styles.dayCellSelected]} onPress={() => setSelectedDay(day)}>
                  <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{day}</Text>

                </TouchableOpacity>
              );
            })}
          </View>


          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, activeTab === 'Spends' && styles.toggleBtnActive]}
              onPress={() => setActiveTab('Spends')}
            >
              <Text style={[styles.toggleText, activeTab === 'Spends' && styles.toggleTextActive]}>
                Spends
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, activeTab === 'Categories' && styles.toggleBtnActive]}
              onPress={() => setActiveTab('Categories')}
            >
              <Text style={[styles.toggleText, activeTab === 'Categories' && styles.toggleTextActive]}>
                Categories
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'Spends' ? (
            <View>
              <View style={styles.spendRow}>
                <View style={styles.spendIconBlue}>
                  <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.spendMid}>
                  <Text style={styles.spendTitle}>Groceries</Text>
                  <Text style={styles.spendSub}>17:00 - {monthLabel} {selectedDay}</Text>
                </View>
                <Text style={styles.spendCat}>Pantry</Text>
                <Text style={styles.spendNeg}>-$100,00</Text>
              </View>

              <View style={styles.spendRow}>
                <View style={styles.spendIconLightBlue}>
                  <Ionicons name="layers-outline" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.spendMid}>
                  <Text style={styles.spendTitle}>Others</Text>
                  <Text style={styles.spendSub}>17:00 - {monthLabel} {selectedDay}</Text>
                </View>
                <Text style={styles.spendCat}>Payments</Text>
                <Text style={styles.spendPos}>$120,00</Text>
              </View>
            </View>
          ) : (
            <View style={styles.categoriesBox}>
              <View style={styles.pieMockRow}>
                <View style={[styles.pieSlice, { backgroundColor: '#5B9BD5', flex: 10 }]}>
                  <Text style={styles.pieLabel}>10%</Text>
                </View>
                <View style={[styles.pieSlice, { backgroundColor: '#0068FF', flex: 79 }]}>
                  <Text style={styles.pieLabel}>79%</Text>
                </View>
                <View style={[styles.pieSlice, { backgroundColor: '#76C7E8', flex: 11 }]}>
                  <Text style={styles.pieLabel}>11%</Text>

          <View style={styles.modeTabsRow}>
            {(["Spends", "Categories"] as CalendarMode[]).map((tab) => {
              const active = mode === tab;
              return (
                <TouchableOpacity key={tab} style={[styles.modeTab, active && styles.modeTabActive]} onPress={() => setMode(tab)}>
                  <Text style={[styles.modeTabText, active && styles.modeTabTextActive]}>{tab}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {mode === "Categories" ? (
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

                  <View style={[styles.legendDot, { backgroundColor: '#5B9BD5' }]} />
                  <Text style={styles.legendText}>Groceries</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#0068FF' }]} />

                  <View style={[styles.legendDot, { backgroundColor: "#0068FF" }]} />
                  <Text style={styles.legendText}>Groceries</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#388BFF" }]} />

                  <Text style={styles.legendText}>Others</Text>
                </View>
              </View>
            </View>

          ) : (
            <View style={styles.itemsList}>
              {SPENDS_ITEMS.map((item, index) => (
                <View key={item.id} style={styles.entryRow}>
                  <View style={styles.entryLeft}>
                    <View style={styles.entryIconBox}><Ionicons name={index === 0 ? "cart" : "card"} size={20} color="#FFFFFF" /></View>
                    <View><Text style={styles.entryTitle}>{item.title}</Text><Text style={styles.entrySub}>{item.timeAndDate}</Text></View>
                  </View>
                  <View style={styles.entryMiddle}><Text style={styles.entryTag}>{item.tag}</Text></View>
                  <Text style={[styles.entryAmount, item.isPositive && styles.positiveAmount]}>{item.amount}</Text>
                </View>
              ))}
            </View>

          )}
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
          <TouchableOpacity style={styles.navItem} onPress={() => go('Search')}>
            <Ionicons name="layers-outline" size={22} color="#093030" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => go('AccountBalance')}>
            <Ionicons name="person-outline" size={22} color="#093030" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => handleBottomPress("Home")}><Ionicons name="home-outline" size={24} color="#093030" /></TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => handleBottomPress("Analysis")}><Ionicons name="stats-chart-outline" size={22} color="#093030" /></TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleBottomPress("Transactions")}><MaterialCommunityIcons name="swap-horizontal" size={26} color="#093030" /></TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleBottomPress("Categories")}><Ionicons name="layers-outline" size={24} color="#093030" /></TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleBottomPress("Profile")}><Ionicons name="person-outline" size={24} color="#093030" /></TouchableOpacity>

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
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  body: {
    flex: 1,
    backgroundColor: '#F6FFF8',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: 'hidden',
  },
  content: { padding: 20, paddingBottom: 24 },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
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
  weekHeader: {
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
  dayCellActive: { backgroundColor: '#00D09E' },
  dayText: { fontSize: 13, color: '#093030', fontWeight: '500' },
  dayTextActive: { color: '#FFFFFF', fontWeight: '700' },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  toggleBtn: {
    flex: 1,
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingVertical: 11,
    alignItems: 'center',
  },
  toggleBtnActive: { backgroundColor: '#00D09E' },
  toggleText: { fontSize: 13, fontWeight: '600', color: '#093030' },
  toggleTextActive: { fontWeight: '700' },
  spendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E6F5EC',
  },
  spendIconBlue: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#5B9BD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  spendIconLightBlue: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#78B6E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  spendMid: { flex: 1 },
  spendTitle: { fontSize: 14, fontWeight: '700', color: '#093030' },
  spendSub: { fontSize: 11, color: '#4A77A8', marginTop: 2 },
  spendCat: { fontSize: 12, color: '#4B6B63', marginRight: 12 },
  spendNeg: { fontSize: 13, fontWeight: '700', color: '#0068FF' },
  spendPos: { fontSize: 13, fontWeight: '700', color: '#093030' },
  categoriesBox: {
    backgroundColor: '#EAF8EE',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
  },
  pieMockRow: {
    flexDirection: 'row',
    width: '100%',
    height: 110,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14,
  },
  pieSlice: { alignItems: 'center', justifyContent: 'center' },
  pieLabel: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  legendRow: { flexDirection: 'row', gap: 24 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: '#093030', fontWeight: '600' },
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

  safeArea: { flex: 1, backgroundColor: "#00D09E" },
  headerSection: { backgroundColor: "#00D09E", paddingHorizontal: 22, paddingTop: 12, paddingBottom: 20 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#093030" },
  bellBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#F1FFF3", alignItems: "center", justifyContent: "center" },
  bodyContainer: { flex: 1, backgroundColor: "#F6FFF8", borderTopLeftRadius: 36, borderTopRightRadius: 36, overflow: "hidden" },
  scrollContent: { paddingHorizontal: 22, paddingTop: 22, paddingBottom: 22 },
  pickerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingHorizontal: 6 },
  pickerBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  pickerText: { fontSize: 14, fontWeight: "700", color: "#093030" },
  weekHeaderRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  weekDayText: { width: "14.28%", textAlign: "center", fontSize: 11, fontWeight: "700", color: "#0068FF" },
  daysGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  dayCell: { width: "14.28%", height: 28, alignItems: "center", justifyContent: "center", borderRadius: 14 },
  dayCellSelected: { backgroundColor: "#00D09E" },
  dayText: { fontSize: 12, fontWeight: "600", color: "#093030" },
  dayTextSelected: { color: "#FFFFFF", fontWeight: "700" },
  modeTabsRow: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginBottom: 18 },
  modeTab: { flex: 1, paddingVertical: 10, borderRadius: 20, backgroundColor: "#DFF7E2", alignItems: "center" },
  modeTabActive: { backgroundColor: "#00D09E" },
  modeTabText: { fontSize: 13, fontWeight: "600", color: "#093030" },
  modeTabTextActive: { color: "#093030", fontWeight: "700" },
  chartSection: { alignItems: "center", marginTop: 4 },
  semiChartWrap: {
    width: 240,
    height: 120,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    overflow: "hidden",
    flexDirection: "row",
  },
  leftSlice: {
    width: "36%",
    height: "100%",
    backgroundColor: "#0068FF",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 22,
    borderRightWidth: 2,
    borderRightColor: "#F6FFF8",
  },
  rightStack: { flex: 1, height: "100%" },
  topRightSlice: {
    flex: 0.34,
    backgroundColor: "#4DA3FF",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#F6FFF8",
  },
  bottomRightSlice: {
    flex: 0.66,
    backgroundColor: "#2F88FF",
    justifyContent: "center",
    alignItems: "center",
  },
  slicePercentWhite: { fontSize: 12, fontWeight: "800", color: "#FFFFFF" },
  slicePercentDark: { fontSize: 13, fontWeight: "800", color: "#093030" },
  legendRow: { flexDirection: "row", gap: 28, marginTop: 14 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, fontWeight: "600", color: "#093030" },
  itemsList: { gap: 14 },
  entryRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 4 },
  entryLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1.4 },
  entryIconBox: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#6CA6FF", alignItems: "center", justifyContent: "center" },
  entryTitle: { fontSize: 14, fontWeight: "700", color: "#093030" },
  entrySub: { fontSize: 10, color: "#0068FF", fontWeight: "600", marginTop: 2 },
  entryMiddle: { flex: 0.8, alignItems: "center", borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#9AD9C3", paddingHorizontal: 6 },
  entryTag: { fontSize: 11, color: "#3C6E63", fontWeight: "500" },
  entryAmount: { flex: 0.9, textAlign: "right", fontSize: 13, fontWeight: "800", color: "#0068FF" },
  positiveAmount: { color: "#093030" },
  bottomNav: { flexDirection: "row", backgroundColor: "#DFF7E2", borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingVertical: 12, paddingHorizontal: 18, justifyContent: "space-around", alignItems: "center" },
  navItem: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  navItemActive: { backgroundColor: "#00D09E" },
});