import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getWorkoutImage } from '../media';
import { useGym } from '../store/gymStore';
import { colors, layout } from '../theme';

export default function WorkoutScreen() {
 const { state, dispatch } = useGym();
 const [expanded, setExpanded] = useState({});
 const workout = state.selectedWorkout;

 if (!workout) {
 return (
 <View style={styles.emptyWrap}>
 <Text style={styles.emptyTitle}>No workout selected</Text>
 <Pressable style={styles.backButton} onPress={() => dispatch({ type: 'NAVIGATE', phase: 'home' })}>
 <Text style={styles.backButtonText}>Go home</Text>
 </Pressable>
 </View>
 );
 }

 return (
 <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
 <Pressable style={styles.backRow} onPress={() => dispatch({ type: 'NAVIGATE', phase: 'home' })}>
 <Text style={styles.backText}>← Back</Text>
 </Pressable>
 <View style={styles.headerCard}>
 <Image source={{ uri: getWorkoutImage(workout.id) }} style={styles.headerImage} />
 <Text style={styles.title}>{workout.name}</Text>
 <Text style={styles.description}>{workout.description}</Text>
 <View style={styles.statsRow}>
 <View style={styles.statBox}><Text style={styles.statValue}>{workout.duration}</Text><Text style={styles.statLabel}>Duration</Text></View>
 <View style={styles.statBox}><Text style={styles.statValue}>{workout.exercises}</Text><Text style={styles.statLabel}>Exercises</Text></View>
 <View style={styles.statBox}><Text style={styles.statValue}>{workout.calories}</Text><Text style={styles.statLabel}>Calories est.</Text></View>
 </View>
 </View>
 <Text style={styles.sectionTitle}>Exercise list</Text>
 {workout.exercises.map((exercise, index) => {
 const isExpanded = expanded[index] ?? index === 0;
 return (
 <View key={exercise.name} style={styles.exerciseCard}>
 <Pressable style={styles.exerciseHeader} onPress={() => setExpanded((current) => ({ ...current, [index]: !isExpanded }))}>
 <View style={styles.exerciseInfo}>
 <Text style={styles.exerciseTitle}>{index + 1}. {exercise.name}</Text>
 <Text style={styles.exerciseMeta}>{exercise.sets} sets × {exercise.reps}</Text>
 </View>
 <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
 </Pressable>
 {isExpanded ? (
 <View style={styles.exerciseDetails}>
 <Text style={styles.detailText}>Weight: {exercise.weight}</Text>
 <Text style={styles.detailText}>Rest: {exercise.restSec}s</Text>
 </View>
 ) : null}
 </View>
 );
 })}
 <Pressable style={styles.startButton} onPress={() => dispatch({ type: 'START_WORKOUT' })}>
 <Text style={styles.startButtonText}>Start Workout</Text>
 </Pressable>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 screen: { flex: 1, backgroundColor: colors.bg },
 content: { padding: layout.screenPadding, paddingBottom: 120 },
 backRow: { marginBottom: 18 },
 backText: { color: colors.textMuted, fontSize: 16, fontWeight: '700' },
 headerCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: layout.radius, padding: 18, overflow: 'hidden' },
 headerImage: { width: '100%', height: 210, borderRadius: 20, marginBottom: 16 },
 title: { color: colors.text, fontSize: 28, fontWeight: '900' },
 description: { color: colors.textMuted, lineHeight: 22, marginTop: 10, marginBottom: 20 },
 statsRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
 statBox: { flex: 1, minWidth: 92, backgroundColor: '#121212', borderRadius: 18, padding: 14 },
 statValue: { color: colors.text, fontWeight: '900', fontSize: 18 },
 statLabel: { color: colors.textMuted, marginTop: 6 },
 sectionTitle: { color: colors.text, fontSize: 22, fontWeight: '900', marginVertical: 18 },
 exerciseCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 18, marginBottom: 12, overflow: 'hidden' },
 exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, gap: 12 },
 exerciseInfo: { flex: 1 },
 exerciseTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
 exerciseMeta: { color: colors.textMuted, marginTop: 6 },
 expandIcon: { color: colors.primary, fontSize: 26, fontWeight: '700' },
 exerciseDetails: { paddingHorizontal: 16, paddingBottom: 16, gap: 6 },
 detailText: { color: colors.text, fontWeight: '600' },
 startButton: { backgroundColor: colors.primary, borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
 startButtonText: { color: colors.text, fontSize: 16, fontWeight: '900' },
 emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, padding: 20 },
 emptyTitle: { color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: 14 },
 backButton: { backgroundColor: colors.primary, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 },
 backButtonText: { color: colors.text, fontWeight: '800' },
});
