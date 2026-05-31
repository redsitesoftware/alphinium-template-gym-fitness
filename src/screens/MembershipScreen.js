import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGym } from '../store/gymStore';
import { colors, layout, shadow } from '../theme';

const tiers = [
 { name: 'Bronze', price: 'Free', perks: 'Basic tracking, 5 workouts/month' },
 { name: 'Silver', price: '$29/mo', perks: 'Unlimited, locker access' },
 { name: 'Gold', price: '$49/mo', perks: 'All Silver + PT sessions, towel service' },
 { name: 'Platinum', price: '$89/mo', perks: 'All Gold + nutrition coaching, priority booking' },
];

export default function MembershipScreen() {
 const { state } = useGym();

 return (
 <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
 <Text style={styles.title}>Membership</Text>
 <Text style={styles.subtitle}>Choose the tier that fits your training lifestyle.</Text>
 {tiers.map((tier) => {
 const isCurrent = tier.name === state.userStats.membershipTier;
 return (
 <View key={tier.name} style={[styles.card, isCurrent && styles.currentCard]}>
 <View style={styles.headerRow}>
 <Text style={[styles.name, isCurrent && styles.currentName]}>{tier.name}</Text>
 <Text style={[styles.price, isCurrent && styles.currentName]}>{tier.price}</Text>
 </View>
 <Text style={styles.perks}>{tier.perks}</Text>
 {isCurrent ? <Text style={styles.currentLabel}>← Current</Text> : null}
 </View>
 );
 })}
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
 padding: 20,
 marginBottom: 14,
 },
 currentCard: {
 borderColor: colors.gold,
 backgroundColor: '#26160C',
 ...shadow,
 },
 headerRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
 name: { color: colors.text, fontSize: 22, fontWeight: '900' },
 currentName: { color: colors.gold },
 price: { color: colors.text, fontSize: 18, fontWeight: '800' },
 perks: { color: colors.textMuted, marginTop: 10, lineHeight: 22 },
 currentLabel: { color: colors.primary, marginTop: 14, fontWeight: '900' },
});
