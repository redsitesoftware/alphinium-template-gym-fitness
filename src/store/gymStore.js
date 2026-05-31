import React, { createContext, useContext, useMemo, useReducer } from 'react';

const GymContext = createContext(null);

const w1Exercises = [
 { name: 'Bench Press', sets: 4, reps: '6-8', weight: '80kg', restSec: 120 },
 { name: 'Weighted Pull-Ups', sets: 4, reps: '6-8', weight: '+10kg', restSec: 120 },
 { name: 'Overhead Press', sets: 3, reps: '8-10', weight: '55kg', restSec: 90 },
 { name: 'Barbell Row', sets: 3, reps: '8-10', weight: '70kg', restSec: 90 },
 { name: 'Dips', sets: 3, reps: '10-12', weight: 'Bodyweight', restSec: 60 },
 { name: 'Face Pulls', sets: 3, reps: '15-20', weight: '20kg', restSec: 60 },
];

const createWorkout = (id, config, exercises) => ({ id, ...config, exercises });

export const workoutPrograms = [
 createWorkout('w1', {
 emoji: '️',
 name: 'Upper Body Power',
 category: 'Strength',
 duration: '45 min',
 difficulty: 'Intermediate',
 exercises: 6,
 calories: 320,
 description: 'Build upper body strength with compound pressing and pulling movements',
 }, w1Exercises),
 createWorkout('w2', {
 emoji: '',
 name: 'Leg Day Destroyer',
 category: 'Strength',
 duration: '55 min',
 difficulty: 'Intermediate',
 exercises: 7,
 calories: 420,
 description: 'Heavy squats, hinges, and unilateral work to grow lower body power.',
 }, [
 { name: 'Back Squat', sets: 4, reps: '5-6', weight: '110kg', restSec: 150 },
 { name: 'Romanian Deadlift', sets: 4, reps: '8-10', weight: '90kg', restSec: 120 },
 { name: 'Walking Lunges', sets: 3, reps: '12/leg', weight: '24kg', restSec: 90 },
 { name: 'Leg Press', sets: 3, reps: '10-12', weight: '180kg', restSec: 90 },
 { name: 'Hamstring Curl', sets: 3, reps: '12-15', weight: '45kg', restSec: 75 },
 { name: 'Leg Extension', sets: 3, reps: '12-15', weight: '50kg', restSec: 75 },
 { name: 'Standing Calf Raise', sets: 4, reps: '15-20', weight: '70kg', restSec: 60 },
 ]),
 createWorkout('w3', {
 emoji: '',
 name: 'HIIT Cardio Blast',
 category: 'Cardio',
 duration: '30 min',
 difficulty: 'Hard',
 exercises: 8,
 calories: 480,
 description: 'Short explosive intervals to spike heart rate and torch calories fast.',
 }, [
 { name: 'Row Sprint', sets: 4, reps: '45 sec', weight: 'Max effort', restSec: 30 },
 { name: 'Burpees', sets: 4, reps: '12', weight: 'Bodyweight', restSec: 30 },
 { name: 'Air Bike', sets: 4, reps: '40 sec', weight: 'Max effort', restSec: 25 },
 { name: 'Box Jumps', sets: 3, reps: '12', weight: '24 in', restSec: 30 },
 { name: 'Battle Ropes', sets: 3, reps: '35 sec', weight: 'Heavy', restSec: 25 },
 { name: 'Mountain Climbers', sets: 3, reps: '30 sec', weight: 'Bodyweight', restSec: 20 },
 { name: 'Kettlebell Swings', sets: 3, reps: '18', weight: '24kg', restSec: 30 },
 { name: 'Sprint Finish', sets: 2, reps: '60 sec', weight: 'Track', restSec: 45 },
 ]),
 createWorkout('w4', {
 emoji: '',
 name: 'Push Day',
 category: 'Strength',
 duration: '40 min',
 difficulty: 'Beginner',
 exercises: 5,
 calories: 280,
 description: 'A simple chest, shoulders, and triceps session for steady progression.',
 }, [
 { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', weight: '26kg', restSec: 90 },
 { name: 'Machine Chest Press', sets: 3, reps: '10-12', weight: '55kg', restSec: 75 },
 { name: 'Seated Shoulder Press', sets: 3, reps: '10-12', weight: '40kg', restSec: 75 },
 { name: 'Cable Fly', sets: 3, reps: '12-15', weight: '18kg', restSec: 60 },
 { name: 'Rope Pushdown', sets: 3, reps: '12-15', weight: '27kg', restSec: 60 },
 ]),
 createWorkout('w5', {
 emoji: '',
 name: '5K Run Program',
 category: 'Cardio',
 duration: '35 min',
 difficulty: 'Beginner',
 exercises: 1,
 calories: 380,
 description: 'Build your pacing confidence with intervals that stack into a stronger 5K.',
 }, [
 { name: 'Run Intervals', sets: 5, reps: '4 min hard / 2 min easy', weight: 'Pace target', restSec: 45 },
 ]),
 createWorkout('w6', {
 emoji: '',
 name: 'Mobility & Stretch',
 category: 'Recovery',
 duration: '25 min',
 difficulty: 'Easy',
 exercises: 10,
 calories: 120,
 description: 'Open up tight hips, shoulders, and spine so your next lift feels smoother.',
 }, [
 { name: 'Foam Roll Quads', sets: 2, reps: '60 sec', weight: 'Controlled', restSec: 20 },
 { name: 'Thoracic Rotations', sets: 2, reps: '10/side', weight: 'Bodyweight', restSec: 20 },
 { name: 'World’s Greatest Stretch', sets: 2, reps: '8/side', weight: 'Bodyweight', restSec: 20 },
 { name: 'Couch Stretch', sets: 2, reps: '45 sec/side', weight: 'Bodyweight', restSec: 20 },
 { name: 'Hamstring Floss', sets: 2, reps: '12/side', weight: 'Band', restSec: 20 },
 { name: 'Cat-Cow', sets: 2, reps: '45 sec', weight: 'Bodyweight', restSec: 20 },
 { name: 'Band Pull Apart', sets: 2, reps: '20', weight: 'Light band', restSec: 20 },
 { name: 'Ankle Mobility', sets: 2, reps: '12/side', weight: 'Bodyweight', restSec: 20 },
 { name: 'Deep Squat Hold', sets: 2, reps: '40 sec', weight: 'Bodyweight', restSec: 20 },
 { name: 'Breathing Reset', sets: 2, reps: '60 sec', weight: 'Nasal breathing', restSec: 20 },
 ]),
 createWorkout('w7', {
 emoji: '',
 name: 'Full Body Circuit',
 category: 'HIIT',
 duration: '35 min',
 difficulty: 'Hard',
 exercises: 8,
 calories: 450,
 description: 'Move through full-body stations for conditioning, sweat, and athleticism.',
 }, [
 { name: 'Goblet Squat', sets: 3, reps: '15', weight: '24kg', restSec: 30 },
 { name: 'Push-Ups', sets: 3, reps: '15', weight: 'Bodyweight', restSec: 30 },
 { name: 'TRX Row', sets: 3, reps: '12', weight: 'Bodyweight', restSec: 30 },
 { name: 'Kettlebell Swing', sets: 3, reps: '20', weight: '20kg', restSec: 30 },
 { name: 'Alternating Reverse Lunge', sets: 3, reps: '12/leg', weight: '16kg', restSec: 30 },
 { name: 'Plank Shoulder Taps', sets: 3, reps: '20', weight: 'Bodyweight', restSec: 25 },
 { name: 'Ski Erg Sprint', sets: 3, reps: '30 sec', weight: 'Max effort', restSec: 25 },
 { name: 'Bike Finisher', sets: 2, reps: '75 sec', weight: 'Threshold', restSec: 40 },
 ]),
 createWorkout('w8', {
 emoji: '',
 name: 'Powerlifting Program',
 category: 'Strength',
 duration: '70 min',
 difficulty: 'Advanced',
 exercises: 5,
 calories: 380,
 description: 'Structured competition-style squat, bench, and deadlift work for max strength.',
 }, [
 { name: 'Competition Squat', sets: 5, reps: '3', weight: '145kg', restSec: 180 },
 { name: 'Paused Bench Press', sets: 5, reps: '3', weight: '95kg', restSec: 180 },
 { name: 'Deadlift', sets: 4, reps: '3', weight: '170kg', restSec: 180 },
 { name: 'Tempo Front Squat', sets: 3, reps: '5', weight: '100kg', restSec: 120 },
 { name: 'Chest Supported Row', sets: 4, reps: '8', weight: '50kg', restSec: 90 },
 ]),
];

export const workoutHistory = [
 { date: 'Today', workout: 'Push Day', duration: '38 min', exercisesCompleted: 5, totalKg: 1840, pr: false },
 { date: 'Yesterday', workout: '5K Run', duration: '32 min', exercisesCompleted: 1, totalKg: 0, pr: false },
 { date: '2 days ago', workout: 'Upper Body Power', duration: '47 min', exercisesCompleted: 6, totalKg: 2340, pr: true, prExercise: 'Bench Press' },
 { date: '4 days ago', workout: 'Leg Day', duration: '58 min', exercisesCompleted: 7, totalKg: 3120, pr: false },
 { date: '5 days ago', workout: 'HIIT Cardio', duration: '31 min', exercisesCompleted: 8, totalKg: 0, pr: false },
];

const tierInfo = {
 Bronze: { emoji: '', color: '#A16207' },
 Silver: { emoji: '', color: '#D4D4D8' },
 Gold: { emoji: '', color: '#FBBF24' },
 Platinum: { emoji: '', color: '#E879F9' },
};

const initialState = {
 phase: 'home',
 selectedWorkout: workoutPrograms[0],
 activeWorkoutId: null,
 activeSetIndex: 0,
 activeExerciseIndex: 0,
 workoutTimer: 0,
 restRemaining: 0,
 readyForNextExercise: false,
 chatOpen: false,
 chatMessages: [
 {
 role: 'assistant',
 text: "What's up! I'm Flex, your AI fitness coach demo — powered by alphinium-ai + ChatInstance. I can create workout plans, track your progress, or answer fitness questions. Want this for your gym's app?",
 },
 {
 role: 'assistant',
 text: 'You are on a 12-day streak, sitting on Gold membership, and your latest PRs include a 100kg bench, 140kg squat, and 180kg deadlift.',
 },
 ],
 chatInput: '',
 userStats: {
 name: 'Alex',
 level: 'Intermediate',
 memberSince: 'Jan 2025',
 totalWorkouts: 87,
 totalKg: 12450,
 currentStreak: 12,
 bestStreak: 21,
 membershipTier: 'Gold',
 loyaltyStamps: 8,
 prs: [
 { exercise: 'Bench Press', weight: '100kg', date: '2 weeks ago' },
 { exercise: 'Squat', weight: '140kg', date: '1 month ago' },
 { exercise: 'Deadlift', weight: '180kg', date: '3 weeks ago' },
 ],
 },
 workouts: workoutPrograms,
 history: workoutHistory,
 tierInfo,
};

const getWorkoutById = (workouts, id) => workouts.find((workout) => workout.id === id) || null;

const createFlexReply = (message, state) => {
 const lower = message.toLowerCase();
 if (lower.includes('program')) {
 return `Absolutely. Based on your ${state.userStats.currentStreak}-day streak, I'd build a 4-day split around Upper Body Power, Leg Day Destroyer, Full Body Circuit, and Mobility & Stretch for recovery.`;
 }
 if (lower.includes('progress')) {
 return `Your consistency is elite: ${state.userStats.totalWorkouts} workouts logged, ${state.userStats.totalKg.toLocaleString()}kg moved, and recent PRs on bench, squat, and deadlift. Keep stacking Gold loyalty stamps for your free PT session.`;
 }
 if (lower.includes('advice') || lower.includes('today')) {
 return 'For today, warm up your shoulders, hit Upper Body Power, rest 2 minutes on your heavy compounds, and aim to own every rep before adding weight.';
 }
 if (lower.includes('gym')) {
 return 'IronForge can plug Flex into your gym app for AI coaching, progress insights, and upsells into memberships, PT, and loyalty rewards with alphinium-ai.';
 }
 return 'I can map a personalized plan, explain recovery, or help your gym launch Flex with memberships, loyalty, and AI coaching built in.';
};

const calculateWorkoutKg = (workout) => {
 const parsed = workout.exercises.reduce((sum, exercise) => {
 const numeric = parseInt(exercise.weight, 10);
 return Number.isNaN(numeric) ? sum : sum + numeric * exercise.sets;
 }, 0);
 return parsed || 0;
};

function reducer(state, action) {
 switch (action.type) {
 case 'NAVIGATE':
 return { ...state, phase: action.phase };
 case 'SELECT_WORKOUT': {
 const selectedWorkout = getWorkoutById(state.workouts, action.workoutId);
 return { ...state, selectedWorkout, phase: 'workout' };
 }
 case 'START_WORKOUT':
 return {
 ...state,
 phase: 'active',
 activeWorkoutId: state.selectedWorkout?.id || null,
 activeSetIndex: 0,
 activeExerciseIndex: 0,
 workoutTimer: 0,
 restRemaining: 0,
 readyForNextExercise: false,
 };
 case 'TICK_TIMER':
 if (state.phase !== 'active') return state;
 return {
 ...state,
 workoutTimer: state.workoutTimer + 1,
 restRemaining: Math.max(0, state.restRemaining - 1),
 };
 case 'COMPLETE_SET': {
 const activeWorkout = getWorkoutById(state.workouts, state.activeWorkoutId);
 if (!activeWorkout) return state;
 const exercise = activeWorkout.exercises[state.activeExerciseIndex];
 if (!exercise || state.readyForNextExercise) return state;
 const lastSet = state.activeSetIndex >= exercise.sets - 1;
 if (lastSet) {
 return {
 ...state,
 restRemaining: 0,
 readyForNextExercise: state.activeExerciseIndex < activeWorkout.exercises.length - 1,
 };
 }
 return {
 ...state,
 activeSetIndex: state.activeSetIndex + 1,
 restRemaining: exercise.restSec,
 };
 }
 case 'NEXT_EXERCISE': {
 const activeWorkout = getWorkoutById(state.workouts, state.activeWorkoutId);
 if (!activeWorkout) return state;
 if (state.activeExerciseIndex >= activeWorkout.exercises.length - 1) return state;
 return {
 ...state,
 activeExerciseIndex: state.activeExerciseIndex + 1,
 activeSetIndex: 0,
 restRemaining: 0,
 readyForNextExercise: false,
 };
 }
 case 'FINISH_WORKOUT': {
 const workout = getWorkoutById(state.workouts, state.activeWorkoutId) || state.selectedWorkout;
 if (!workout) return { ...state, phase: 'history' };
 const totalKg = calculateWorkoutKg(workout);
 const newStreak = state.userStats.currentStreak + 1;
 const newStamps = Math.min(10, state.userStats.loyaltyStamps + 1);
 const historyEntry = {
 date: 'Just now',
 workout: workout.name,
 duration: `${Math.max(20, Math.round(state.workoutTimer / 60) || 1)} min`,
 exercisesCompleted: workout.exercises.length,
 totalKg,
 pr: workout.id === 'w1',
 prExercise: workout.id === 'w1' ? 'Bench Press' : undefined,
 };
 return {
 ...state,
 phase: 'history',
 activeWorkoutId: null,
 activeSetIndex: 0,
 activeExerciseIndex: 0,
 workoutTimer: 0,
 restRemaining: 0,
 readyForNextExercise: false,
 history: [historyEntry, ...state.history].slice(0, 5),
 userStats: {
 ...state.userStats,
 totalWorkouts: state.userStats.totalWorkouts + 1,
 totalKg: state.userStats.totalKg + totalKg,
 currentStreak: newStreak,
 bestStreak: Math.max(state.userStats.bestStreak, newStreak),
 loyaltyStamps: newStamps,
 },
 };
 }
 case 'TOGGLE_CHAT':
 return { ...state, chatOpen: action.open ?? !state.chatOpen };
 case 'SET_CHAT_INPUT':
 return { ...state, chatInput: action.value };
 case 'SEND_CHAT_MESSAGE': {
 const content = action.message || state.chatInput;
 if (!content?.trim()) return state;
 const trimmed = content.trim();
 return {
 ...state,
 chatOpen: true,
 chatInput: '',
 chatMessages: [
 ...state.chatMessages,
 { role: 'user', text: trimmed },
 { role: 'assistant', text: createFlexReply(trimmed, state) },
 ],
 };
 }
 default:
 return state;
 }
}

export function GymProvider({ children }) {
 const [state, dispatch] = useReducer(reducer, initialState);
 const value = useMemo(() => ({ state, dispatch }), [state]);
 return <GymContext.Provider value={value}>{children}</GymContext.Provider>;
}

export function useGym() {
 const context = useContext(GymContext);
 if (!context) {
 throw new Error('useGym must be used within GymProvider');
 }
 return context;
}
