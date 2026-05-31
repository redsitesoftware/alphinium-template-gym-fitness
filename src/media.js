export const GYM_IMAGES = {
 hero: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80',
 coach: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1200&q=80',
 active: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
};

export const WORKOUT_IMAGES = {
 w1: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80',
 w2: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=1400&q=80',
 w3: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80',
 w4: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80',
 w5: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=1400&q=80',
 w6: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80',
 w7: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1400&q=80',
 w8: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1400&q=80',
};

export function getWorkoutImage(workoutId) {
 return WORKOUT_IMAGES[workoutId] || GYM_IMAGES.hero;
}
