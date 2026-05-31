import React, { useEffect } from 'react';
import {
 KeyboardAvoidingView,
 Platform,
 Pressable,
 ScrollView,
 StyleSheet,
 Text,
 TextInput,
 View,
} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ActiveWorkoutScreen from '../screens/ActiveWorkoutScreen';
import HistoryScreen from '../screens/HistoryScreen';
import MembershipScreen from '../screens/MembershipScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import { useGym } from '../store/gymStore';
import { colors, layout, shadow } from '../theme';

const chips = [
 'Build me a program ',
 "How's my progress? ",
 "Today's workout advice ",
 'Get this for my gym ️',
];

export default function AppNavigator() {
 const { state, dispatch } = useGym();

 useEffect(() => {
 if (state.phase !== 'active') return undefined;
 const interval = setInterval(() => dispatch({ type: 'TICK_TIMER' }), 1000);
 return () => clearInterval(interval);
 }, [state.phase, dispatch]);

 const renderScreen = () => {
 switch (state.phase) {
 case 'workout':
 return <WorkoutScreen />;
 case 'active':
 return <ActiveWorkoutScreen />;
 case 'history':
 return <HistoryScreen />;
 case 'membership':
 return <MembershipScreen />;
 case 'programs':
 return <ProgramsScreen />;
 case 'home':
 default:
 return <HomeScreen />;
 }
 };

 const showBottomNav = !['workout', 'active'].includes(state.phase);

 return (
 <View style={styles.container}>
 <View style={styles.screen}>{renderScreen()}</View>
 {showBottomNav ? (
 <View style={styles.bottomNav}>
 {[
 { label: 'Home', phase: 'home', emoji: '' },
 { label: 'Programs', phase: 'programs', emoji: '' },
 { label: 'History', phase: 'history', emoji: '' },
 { label: 'Membership', phase: 'membership', emoji: '' },
 ].map((item) => {
 const active = state.phase === item.phase;
 return (
 <Pressable
 key={item.phase}
 style={[styles.navItem, active && styles.navItemActive]}
 onPress={() => dispatch({ type: 'NAVIGATE', phase: item.phase })}
 >
 <Text style={styles.navEmoji}>{item.emoji}</Text>
 <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
 </Pressable>
 );
 })}
 </View>
 ) : null}
 <Pressable style={styles.fab} onPress={() => dispatch({ type: 'TOGGLE_CHAT', open: !state.chatOpen })}>
 <Text style={styles.fabText}></Text>
 </Pressable>
 {state.chatOpen ? (
 <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.chatWrap}>
 <View style={styles.chatCard}>
 <View style={styles.chatHeader}>
 <View>
 <Text style={styles.chatTitle}>Flex AI Coach</Text>
 <Text style={styles.chatSubtitle}>alphinium-ai + ChatInstance demo</Text>
 </View>
 <Pressable onPress={() => dispatch({ type: 'TOGGLE_CHAT', open: false })}>
 <Text style={styles.chatClose}></Text>
 </Pressable>
 </View>
 <ScrollView style={styles.chatMessages} contentContainerStyle={styles.chatMessagesContent}>
 {state.chatMessages.map((message, index) => (
 <View key={`${message.role}-${index}`} style={[styles.messageBubble, message.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
 <Text style={styles.messageText}>{message.text}</Text>
 </View>
 ))}
 <Text style={styles.contextText}>
 Context: Alex is on a {state.userStats.currentStreak}-day streak, has {state.userStats.membershipTier} membership, and PRs on {state.userStats.prs.map((pr) => `${pr.exercise} ${pr.weight}`).join(', ')}.
 </Text>
 </ScrollView>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
 {chips.map((chip) => (
 <Pressable key={chip} style={styles.chip} onPress={() => dispatch({ type: 'SEND_CHAT_MESSAGE', message: chip })}>
 <Text style={styles.chipText}>{chip}</Text>
 </Pressable>
 ))}
 </ScrollView>
 <View style={styles.chatInputRow}>
 <TextInput
 style={styles.chatInput}
 value={state.chatInput}
 placeholder="Ask Flex anything..."
 placeholderTextColor={colors.textMuted}
 onChangeText={(value) => dispatch({ type: 'SET_CHAT_INPUT', value })}
 />
 <Pressable style={styles.sendButton} onPress={() => dispatch({ type: 'SEND_CHAT_MESSAGE' })}>
 <Text style={styles.sendButtonText}>Send</Text>
 </Pressable>
 </View>
 </View>
 </KeyboardAvoidingView>
 ) : null}
 </View>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: colors.bg,
 },
 screen: {
 flex: 1,
 },
 bottomNav: {
 flexDirection: 'row',
 backgroundColor: '#111111',
 borderTopWidth: 1,
 borderColor: colors.border,
 paddingHorizontal: 10,
 paddingTop: 10,
 paddingBottom: 14,
 justifyContent: 'space-between',
 },
 navItem: {
 flex: 1,
 alignItems: 'center',
 borderRadius: 18,
 paddingVertical: 8,
 },
 navItemActive: {
 backgroundColor: '#1F1111',
 },
 navEmoji: {
 fontSize: 18,
 marginBottom: 4,
 },
 navLabel: {
 color: colors.textMuted,
 fontSize: 12,
 fontWeight: '600',
 },
 navLabelActive: {
 color: colors.text,
 },
 fab: {
 position: 'absolute',
 right: 20,
 bottom: 98,
 width: 62,
 height: 62,
 borderRadius: 31,
 backgroundColor: colors.primary,
 alignItems: 'center',
 justifyContent: 'center',
 ...shadow,
 },
 fabText: {
 fontSize: 28,
 },
 chatWrap: {
 position: 'absolute',
 left: 0,
 right: 0,
 bottom: 0,
 padding: 12,
 },
 chatCard: {
 backgroundColor: '#111111',
 borderColor: colors.border,
 borderWidth: 1,
 borderRadius: 26,
 padding: 16,
 maxHeight: '76%',
 ...shadow,
 },
 chatHeader: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 marginBottom: 12,
 },
 chatTitle: {
 color: colors.text,
 fontSize: 18,
 fontWeight: '800',
 },
 chatSubtitle: {
 color: colors.textMuted,
 marginTop: 4,
 },
 chatClose: {
 color: colors.textMuted,
 fontSize: 20,
 },
 chatMessages: {
 maxHeight: 260,
 },
 chatMessagesContent: {
 gap: 10,
 paddingBottom: 10,
 },
 messageBubble: {
 borderRadius: 18,
 padding: 12,
 },
 userBubble: {
 backgroundColor: '#351616',
 alignSelf: 'flex-end',
 },
 assistantBubble: {
 backgroundColor: colors.card,
 alignSelf: 'stretch',
 },
 messageText: {
 color: colors.text,
 lineHeight: 20,
 },
 contextText: {
 color: colors.textMuted,
 fontSize: 12,
 lineHeight: 18,
 },
 chipRow: {
 gap: 10,
 paddingVertical: 12,
 paddingRight: 16,
 },
 chip: {
 backgroundColor: '#1F1111',
 borderWidth: 1,
 borderColor: '#3B1515',
 borderRadius: 999,
 paddingHorizontal: 14,
 paddingVertical: 10,
 },
 chipText: {
 color: colors.text,
 fontWeight: '600',
 },
 chatInputRow: {
 flexDirection: 'row',
 gap: 10,
 alignItems: 'center',
 },
 chatInput: {
 flex: 1,
 backgroundColor: colors.card,
 borderRadius: 16,
 borderWidth: 1,
 borderColor: colors.border,
 color: colors.text,
 paddingHorizontal: 14,
 paddingVertical: 12,
 },
 sendButton: {
 backgroundColor: colors.primary,
 borderRadius: 16,
 paddingHorizontal: 18,
 paddingVertical: 12,
 minWidth: 74,
 alignItems: 'center',
 },
 sendButtonText: {
 color: colors.text,
 fontWeight: '800',
 },
});
