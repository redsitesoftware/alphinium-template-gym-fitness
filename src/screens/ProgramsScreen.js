import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGym } from '../store/gymStore';
import { colors, difficultyColors, layout } from '../theme';

export default function ProgramsScreen() {
 const { state, dispatch } = useGym();

 return (
 <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
 <Text style={styles.title}>Programs</Text>
 <Text style={styles.subtitle}>Choose your next lift, conditioning block, or recovery session.</Text>
 {state.workouts.map((workout) => (
 <View key={workout.id} style={styles.card}>
 <View style={styles.cardTop}>
 <Text style={styles.emoji}>{workout.emoji}</Text>
 <View style={styles.cardInfo}>
 <Text style={styles.name}>{workout.name}</Text>
 <Text style={styles.description}>{workout.description}</Text>
 </View>
 </View>
 <View style={styles.badgeRow}>
 <View style={styles.badge}><Text style={styles.badgeText}>{workout.category}</Text></View>
 <View style={[styles.badge, { backgroundColor: difficultyColors[workout.difficulty] || colors.primary }]}><Text style={styles.badgeTextStrong}>{workout.difficulty}</Text></View>
 <View style={styles.badge}><Text style={styles.badgeText}>{workout.duration}</Text></View>
 <View style={styles.badge}><Text style={styles.badgeText}>{workout.calories} cal</Text></View>
 </View>
 <Pressable style={styles.startButton} onPress={() => dispatch({ type: 'SELECT_WORKOUT', workoutId: workout.id })}>
 <Text style={styles.startButtonText}>Start</Text>
 </Pressable>
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
 card: {
 backgroundColor: colors.card,
 borderRadius: 22,
 borderWidth: 1,
 borderColor: colors.border,
 padding: 18,
 marginBottom: 12,
 },
 cardTop: { flexDirection: 'row', gap: 14 },
 emoji: { fontSize: 34 },
 cardInfo: { flex: 1 },
 name: { color: colors.text, fontSize: 20, fontWeight: '900' },
 description: { color: colors.textMuted, lineHeight: 21, marginTop: 8 },
 badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
 badge: { backgroundColor: '#111111', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
 badgeText: { color: colors.textMuted, fontWeight: '700' },
 badgeTextStrong: { color: colors.text, fontWeight: '800' },
 startButton: {
 marginTop: 16,
 backgroundColor: colors.primary,
 borderRadius: 16,
 paddingVertical: 14,
 alignItems: 'center',
 },
 startButtonText: { color: colors.text, fontWeight: '900', fontSize: 16 },
});
