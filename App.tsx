import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import AnalysisScreen, { AppTabKey, PeriodKey } from "./src/screens/AnalysisScreen";
import CalendarScreen from "./src/screens/CalendarScreen";

type ActiveScreen = AppTabKey | "Calendar";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>("Calendar");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("Year");

  const openAnalysisWithPeriod = (period: PeriodKey) => {
    setSelectedPeriod(period);
    setCurrentScreen("Analysis");
  };

  if (currentScreen === "Calendar") {
    return (
      <CalendarScreen
        onNavigateTab={(tab) => setCurrentScreen(tab as ActiveScreen)}
        onBack={() => setCurrentScreen("Analysis")}
      />
    );
  }

  if (currentScreen === "Analysis") {
    return (
      <AnalysisScreen
        initialPeriod={selectedPeriod}
        onNavigateTab={(tab) => setCurrentScreen(tab as ActiveScreen)}
        onBack={() => setCurrentScreen("Home")}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{currentScreen} Screen</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => setCurrentScreen("Calendar")}
      >
        <Text style={styles.btnText}>Go to Calender</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => openAnalysisWithPeriod("Year")}
      >
        <Text style={styles.secondaryBtnText}>Go to Analysis (Year)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F6FFF8", gap: 12 },
  title: { fontSize: 22, fontWeight: "700", color: "#093030", marginBottom: 8 },
  btn: { backgroundColor: "#00D09E", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16 },
  btnText: { color: "#093030", fontWeight: '700', fontSize: 14 },
  secondaryBtn: { backgroundColor: "#DFF7E2", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16 },
  secondaryBtnText: { color: "#093030", fontWeight: "600", fontSize: 14 },
});
