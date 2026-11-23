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

const CATEGORIES_ITEMS = [
  { id: "c1", title: "Pantry & Food", timeAndDate: "April 2023", tag: "Groceries", amount: "-$240,00", isPositive: false },
  { id: "c2", title: "Bills & Payments", timeAndDate: "April 2023", tag: "Others", amount: "$120,00", isPositive: true },
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
  const [mode, setMode] = useState<CalendarMode>("Spends");

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

  const entries = mode === "Spends" ? SPENDS_ITEMS : CATEGORIES_ITEMS;

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <View style={styles.itemsList}>
            {entries.map((item, index) => (
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
        </ScrollView>
        <View style={styles.bottomNav}>
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
