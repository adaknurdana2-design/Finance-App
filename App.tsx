import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AnalysisScreen, { AppTabKey, PeriodKey } from './src/screens/AnalysisScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTabKey>('Analysis');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('Monthly');

  const openAnalysisWithPeriod = (period: PeriodKey) => {
    setSelectedPeriod(period);
    setCurrentTab('Analysis');
  };

  if (currentTab === 'Analysis') {
    return (
      <AnalysisScreen
        initialPeriod={selectedPeriod}
        onNavigateTab={(tab) => setCurrentTab(tab as AppTabKey)}
        onBack={() => setCurrentTab('Home')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{currentTab} Screen</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => openAnalysisWithPeriod('Monthly')}
      >
        <Text style={styles.btnText}>Go to Analysis (Monthly)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => openAnalysisWithPeriod('Weekly')}
      >
        <Text style={styles.secondaryBtnText}>Go to Analysis (Weekly)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6FFF8', gap: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#093030', marginBottom: 8 },
  btn: { backgroundColor: '#00D09E', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16 },
  btnText: { color: '#093030', fontWeight: '700', fontSize: 14 },
  secondaryBtn: { backgroundColor: '#DFF7E2', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16 },
  secondaryBtnText: { color: '#093030', fontWeight: '600', fontSize: 14 },
});