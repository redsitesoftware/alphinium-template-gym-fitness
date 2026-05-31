import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGym } from '../store/gymStore';
import { colors, layout } from '../theme';

const emojiMap = {
 'Push Day': '',
 '5K Run': '',
 'Upper Body Power': '️',
 'Leg Day': '',
 'Leg Day Destroyer': '',
 'HIIT Cardio': '',
 'HIIT Cardio Blast': '',
};

export default function HistoryScreen() {
 const { state } = useGym();

 return (
 <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
 <Text style={styles.title}>Your Workout History</Text>
 <Text style={styles.subtitle}>Recent sessions, PRs, and volume moved.</Text>
 {state.history.map((entry, index) => (
 <View key={`${entry.workout}-${index}`} style={styles.row}>
 <Text style={styles.emoji}>{emojiMap[entry.workout] || '️'}</Text>
 <View style={styles.info}>
 <View style={styles.topLine}>
 <Text style={styles.workout}>{entry.workout}</Text>
 <Text style={styles.date}>{entry.date}</Text>
 </View>
 <Text style={styles.meta}>{entry.duration} • {entry.exercisesCompleted} exercises • {entry.totalKg.toLocaleString()}kg</Text>
 {entry.pr ? <Text style={styles.prBadge}> PR: {entry.prExercise}</Text> : null}
 </View>
 </View>
 ))}
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 screen: { flex: 1, backgroundColor: colors.bg },
 content: { padding: layout.screenPadding, paddingBottom: 120 },
 title: { color: colors.text, fontSize: 30, fontWeight: '900' },
 subtitle: { color: colors.textMuted, marginTop: 8, marginBottom: 20 },
 row: {
 flexDirection: 'row',
 alignItems: 'flex-start',
 gap: 14,
 backgroundColor: colors.card,
 borderWidth: 1,
 borderColor: colors.border,
 borderRadius: 20,
 padding: 16,
 marginBottom: 12,
 },
 emoji: { fontSize: 28, marginTop: 4 },
 info: { flex: 1 },
 topLine: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
 workout: { color: colors.text, fontSize: 18, fontWeight: '800', flex: 1 },
 date: { color: colors.textMuted, fontWeight: '600' },
 meta: { color: colors.textMuted, marginTop: 8 },
 prBadge: { color: colors.gold, fontWeight: '800', marginTop: 10 },
});
