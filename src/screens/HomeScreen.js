import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getWorkoutImage, GYM_IMAGES } from '../media';
import { useGym } from '../store/gymStore';
import { colors, difficultyColors, layout, shadow } from '../theme';

export default function HomeScreen() {
 const { state, dispatch } = useGym();
 const recommended = state.workouts.slice(0, 3);

 const startWorkout = (workoutId) => {
 dispatch({ type: 'SELECT_WORKOUT', workoutId });
 };

 return (
 <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
 <View style={styles.headerRow}>
 <View>
 <Text style={styles.logo}> IronForge</Text>
 <Text style={styles.subhead}>Intense training. Smarter progress.</Text>
 </View>
 <View style={styles.memberBadge}>
 <Text style={styles.memberBadgeText}> Gold Member</Text>
 </View>
 </View>

 <View style={styles.heroCard}>
 <Image source={{ uri: GYM_IMAGES.hero }} style={styles.heroImage} />
 <View style={styles.heroOverlay}>
 <Text style={styles.heroGreeting}>Good morning, {state.userStats.name} </Text>
 <View style={styles.statsRow}>
 <Text style={styles.statItem}> {state.userStats.currentStreak}-day streak</Text>
 <Text style={styles.statItem}>️ {state.userStats.totalWorkouts} workouts</Text>
 <Text style={styles.statItem}> {state.userStats.totalKg.toLocaleString()}kg total</Text>
 </View>
 <Text style={styles.heroText}>Today: Complete workout to maintain streak!</Text>
 <Pressable style={styles.heroButton} onPress={() => startWorkout('w1')}>
 <Text style={styles.heroButtonText}>Start Today's Workout</Text>
 </Pressable>
 </View>
 </View>

 <View style={styles.sectionHeader}>
 <Text style={styles.sectionTitle}>Quick Start</Text>
 <Text style={styles.sectionLink}>Recommended for you</Text>
 </View>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickStartRow}>
 {recommended.map((workout) => (
 <Pressable key={workout.id} style={styles.quickCard} onPress={() => startWorkout(workout.id)}>
 <Image source={{ uri: getWorkoutImage(workout.id) }} style={styles.quickImage} />
 <Text style={styles.quickTitle}>{workout.name}</Text>
 <Text style={styles.quickMeta}>{workout.duration} • {workout.calories} cal</Text>
 </Pressable>
 ))}
 </ScrollView>

 <View style={styles.coachCard}>
 <Image source={{ uri: GYM_IMAGES.coach }} style={styles.coachImage} />
 <View style={styles.coachBody}>
 <Text style={styles.coachEyebrow}>COACH SPOTLIGHT</Text>
 <Text style={styles.coachTitle}>Train with elite studio energy</Text>
 <Text style={styles.coachText}>Strength blocks, conditioning finishers, and coached recovery all inside the IronForge membership flow.</Text>
 </View>
 </View>

 <View style={styles.membershipCard}>
 <View style={styles.membershipHeader}>
 <Text style={styles.membershipTitle}> IronForge Gold Member</Text>
 <Text style={styles.membershipTier}>Current tier</Text>
 </View>
 <View style={styles.stampsRow}>
 {Array.from({ length: 10 }).map((_, index) => (
 <View key={index} style={[styles.stamp, index < state.userStats.loyaltyStamps ? styles.stampFilled : styles.stampEmpty]} />
 ))}
 </View>
 <Text style={styles.membershipText}>2 more workouts until FREE Personal Training session!</Text>
 <Text style={styles.membershipPerks}>Perks: unlimited classes, locker, towel service</Text>
 <Pressable style={styles.upgradeButton} onPress={() => dispatch({ type: 'NAVIGATE', phase: 'membership' })}>
 <Text style={styles.upgradeButtonText}>Upgrade to Platinum →</Text>
 </Pressable>
 <View style={styles.calloutBadge}>
 <Text style={styles.calloutBadgeText}>alphinium-loyalty</Text>
 </View>
 </View>

 <View style={styles.calloutCard}>
 <Text style={styles.calloutTitle}> alphinium-loyalty powers IronForge membership rewards</Text>
 <Text style={styles.calloutBody}>Stamp cards for gym visits, class bookings, PT sessions. Reward consistency, reduce churn.</Text>
 </View>

 <View style={styles.calloutCard}>
 <Text style={styles.calloutTitle}> Flex is powered by alphinium-ai</Text>
 <Text style={styles.calloutBody}>AI personal trainers, voice-guided workouts, form feedback via camera, and personalised program generation.</Text>
 </View>

 <View style={styles.sectionHeader}>
 <Text style={styles.sectionTitle}>All Programs</Text>
 <Pressable onPress={() => dispatch({ type: 'NAVIGATE', phase: 'programs' })}>
 <Text style={styles.sectionLink}>View full catalog →</Text>
 </Pressable>
 </View>
 <View style={styles.grid}>
 {state.workouts.map((workout) => (
 <View key={workout.id} style={styles.programCard}>
 <Image source={{ uri: getWorkoutImage(workout.id) }} style={styles.programImage} />
 <Text style={styles.programName}>{workout.name}</Text>
 <View style={styles.badgeRow}>
 <View style={styles.categoryBadge}><Text style={styles.categoryText}>{workout.category}</Text></View>
 <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors[workout.difficulty] || colors.primary }]}>
 <Text style={styles.difficultyText}>{workout.difficulty}</Text>
 </View>
 </View>
 <Text style={styles.programMeta}>{workout.duration} • {workout.exercises} exercises</Text>
 <Text style={styles.programMeta}>{workout.calories} calories</Text>
 <Pressable style={styles.startButton} onPress={() => startWorkout(workout.id)}>
 <Text style={styles.startButtonText}>Start</Text>
 </Pressable>
 </View>
 ))}
 </View>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 screen: { flex: 1, backgroundColor: colors.bg },
 content: { padding: layout.screenPadding, paddingBottom: 120, gap: 18 },
 headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 },
 logo: { color: colors.primary, fontSize: 28, fontWeight: '900' },
 subhead: { color: colors.textMuted, marginTop: 4 },
 memberBadge: { backgroundColor: '#21170C', borderWidth: 1, borderColor: '#57431C', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
 memberBadgeText: { color: colors.gold, fontWeight: '800' },
 heroCard: { backgroundColor: '#2A0909', borderRadius: layout.radius, overflow: 'hidden', ...shadow },
 heroImage: { width: '100%', height: 260 },
 heroOverlay: { padding: 22, backgroundColor: 'rgba(21,12,12,0.62)' },
 heroGreeting: { color: colors.text, fontSize: 26, fontWeight: '900' },
 statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
 statItem: { color: colors.text, fontWeight: '700', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
 heroText: { color: '#FECACA', marginTop: 16, marginBottom: 18, fontSize: 16, fontWeight: '600' },
 heroButton: { alignSelf: 'flex-start', backgroundColor: colors.primary, borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14 },
 heroButtonText: { color: colors.text, fontWeight: '900', fontSize: 15 },
 sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
 sectionTitle: { color: colors.text, fontSize: 22, fontWeight: '900' },
 sectionLink: { color: colors.accent, fontWeight: '700' },
 quickStartRow: { gap: 14, paddingRight: 20 },
 quickCard: { width: 180, backgroundColor: colors.card, borderRadius: 22, padding: 14, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
 quickImage: { width: '100%', height: 120, borderRadius: 16, marginBottom: 12 },
 quickTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
 quickMeta: { color: colors.textMuted, marginTop: 8 },
 coachCard: { backgroundColor: colors.card, borderRadius: layout.radius, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
 coachImage: { width: '100%', height: 210 },
 coachBody: { padding: 18 },
 coachEyebrow: { color: colors.accent, fontWeight: '800', letterSpacing: 1 },
 coachTitle: { color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 8 },
 coachText: { color: colors.textMuted, lineHeight: 22, marginTop: 10 },
 membershipCard: { backgroundColor: '#171310', borderWidth: 1, borderColor: colors.gold, borderRadius: layout.radius, padding: 20 },
 membershipHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
 membershipTitle: { color: colors.gold, fontSize: 20, fontWeight: '900', flex: 1 },
 membershipTier: { color: colors.textMuted },
 stampsRow: { flexDirection: 'row', gap: 8, marginVertical: 18, flexWrap: 'wrap' },
 stamp: { width: 22, height: 22, borderRadius: 11 },
 stampFilled: { backgroundColor: colors.primary },
 stampEmpty: { backgroundColor: '#3F3F46' },
 membershipText: { color: colors.text, fontSize: 16, fontWeight: '700' },
 membershipPerks: { color: colors.textMuted, marginTop: 10 },
 upgradeButton: { alignSelf: 'flex-start', marginTop: 16, backgroundColor: '#251313', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12 },
 upgradeButtonText: { color: colors.gold, fontWeight: '800' },
 calloutBadge: { marginTop: 14, alignSelf: 'flex-start', backgroundColor: '#291A04', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
 calloutBadgeText: { color: colors.gold, fontWeight: '700' },
 calloutCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: layout.radius, padding: 18 },
 calloutTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginBottom: 8 },
 calloutBody: { color: colors.textMuted, lineHeight: 22 },
 grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
 programCard: { width: '47.5%', backgroundColor: colors.card, borderRadius: 22, padding: 14, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
 programImage: { width: '100%', height: 110, borderRadius: 16, marginBottom: 12 },
 programName: { color: colors.text, fontSize: 17, fontWeight: '800', minHeight: 48 },
 badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
 categoryBadge: { backgroundColor: '#111111', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
 categoryText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
 difficultyBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
 difficultyText: { color: colors.text, fontSize: 12, fontWeight: '800' },
 programMeta: { color: colors.textMuted, marginTop: 8 },
 startButton: { marginTop: 14, backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
 startButtonText: { color: colors.text, fontWeight: '900' },
});
