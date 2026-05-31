import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { GYM_IMAGES } from '../media';
import { useGym } from '../store/gymStore';
import { colors, formatSeconds, layout } from '../theme';

export default function ActiveWorkoutScreen() {
 const { state, dispatch } = useGym();
 const workout = state.workouts.find((item) => item.id === state.activeWorkoutId) || state.selectedWorkout;

 if (!workout) {
 return (
 <View style={styles.emptyWrap}>
 <Text style={styles.emptyTitle}>Workout not found</Text>
 </View>
 );
 }

 const currentExercise = workout.exercises[state.activeExerciseIndex];
 const progress = ((state.activeExerciseIndex + (state.readyForNextExercise ? 1 : 0)) / workout.exercises.length) * 100;

 return (
 <View style={styles.screen}>
 <View style={styles.card}>
 <Image source={{ uri: GYM_IMAGES.active }} style={styles.banner} />
 <Text style={styles.timer}>{formatSeconds(state.workoutTimer)}</Text>
 <Text style={styles.subhead}>Workout timer</Text>
 <Text style={styles.exerciseLabel}>Exercise {state.activeExerciseIndex + 1} of {workout.exercises.length}: {currentExercise.name}</Text>
 {!state.readyForNextExercise ? (
 <Text style={styles.setLabel}>Set {state.activeSetIndex + 1} of {currentExercise.sets} — {currentExercise.reps} reps @ {currentExercise.weight}</Text>
 ) : (
 <Text style={styles.setLabel}>All sets complete. Move when you're ready.</Text>
 )}

 <Pressable style={[styles.doneButton, state.readyForNextExercise && styles.doneButtonDisabled]} onPress={() => dispatch({ type: 'COMPLETE_SET' })} disabled={state.readyForNextExercise}>
 <Text style={styles.doneButtonText}>SET DONE </Text>
 </Pressable>

 {state.restRemaining > 0 ? (
 <View style={styles.restCard}>
 <Text style={styles.restTitle}>Rest timer</Text>
 <Text style={styles.restValue}>{formatSeconds(state.restRemaining)}</Text>
 <Text style={styles.restHint}>Recover hard. Then crush the next set.</Text>
 </View>
 ) : null}

 {state.readyForNextExercise ? (
 <Pressable style={styles.nextButton} onPress={() => dispatch({ type: 'NEXT_EXERCISE' })}>
 <Text style={styles.nextButtonText}>Next Exercise →</Text>
 </Pressable>
 ) : null}

 <View style={styles.progressTrack}>
 <View style={[styles.progressFill, { width: `${Math.max(progress, 8)}%` }]} />
 </View>
 <Text style={styles.progressText}>{Math.min(state.activeExerciseIndex + (state.readyForNextExercise ? 1 : 0), workout.exercises.length)} / {workout.exercises.length} exercises completed</Text>

 <Pressable style={styles.finishButton} onPress={() => dispatch({ type: 'FINISH_WORKOUT' })}>
 <Text style={styles.finishButtonText}>Finish Workout </Text>
 </Pressable>
 </View>
 </View>
 );
}

const styles = StyleSheet.create({
 screen: { flex: 1, backgroundColor: colors.bg, padding: layout.screenPadding, justifyContent: 'center' },
 card: { backgroundColor: colors.card, borderRadius: layout.radius, borderWidth: 1, borderColor: colors.border, padding: 24, overflow: 'hidden' },
 banner: { width: '100%', height: 170, borderRadius: 18, marginBottom: 20 },
 timer: { color: colors.primary, fontSize: 48, fontWeight: '900', textAlign: 'center' },
 subhead: { color: colors.textMuted, textAlign: 'center', marginTop: 8, marginBottom: 20 },
 exerciseLabel: { color: colors.text, fontSize: 24, fontWeight: '900', lineHeight: 32 },
 setLabel: { color: colors.textMuted, fontSize: 17, lineHeight: 24, marginTop: 14 },
 doneButton: { backgroundColor: colors.green, borderRadius: 18, paddingVertical: 18, alignItems: 'center', marginTop: 24 },
 doneButtonDisabled: { opacity: 0.55 },
 doneButtonText: { color: colors.bg, fontWeight: '900', fontSize: 20 },
 restCard: { backgroundColor: '#161616', borderRadius: 18, padding: 18, marginTop: 18, alignItems: 'center' },
 restTitle: { color: colors.textMuted, fontWeight: '700' },
 restValue: { color: colors.accent, fontSize: 34, fontWeight: '900', marginVertical: 8 },
 restHint: { color: colors.text, fontWeight: '600' },
 nextButton: { backgroundColor: '#2A1209', borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
 nextButtonText: { color: colors.accent, fontWeight: '800', fontSize: 16 },
 progressTrack: { height: 14, backgroundColor: '#101010', borderRadius: 999, overflow: 'hidden', marginTop: 24 },
 progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 999 },
 progressText: { color: colors.textMuted, marginTop: 10, fontWeight: '700' },
 finishButton: { backgroundColor: colors.primary, borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
 finishButtonText: { color: colors.text, fontWeight: '900', fontSize: 18 },
 emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
 emptyTitle: { color: colors.text, fontSize: 24, fontWeight: '800' },
});
