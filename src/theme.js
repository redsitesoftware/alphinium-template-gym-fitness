export const colors = {
 primary: '#EF4444',
 accent: '#F97316',
 bg: '#0A0A0A',
 card: '#1A1A1A',
 border: '#2A2A2A',
 text: '#FFFFFF',
 textMuted: '#71717A',
 gold: '#FBBF24',
 green: '#22C55E',
 danger: '#B91C1C',
};

export const layout = {
 screenPadding: 20,
 radius: 22,
};

export const shadow = {
 shadowColor: '#000000',
 shadowOpacity: 0.35,
 shadowRadius: 18,
 shadowOffset: { width: 0, height: 10 },
 elevation: 8,
};

export const formatSeconds = (seconds) => {
 const mins = Math.floor(seconds / 60);
 const secs = seconds % 60;
 return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const difficultyColors = {
 Easy: colors.green,
 Beginner: colors.green,
 Intermediate: colors.accent,
 Hard: colors.primary,
 Advanced: colors.danger,
};
