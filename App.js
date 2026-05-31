import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { GymProvider } from './src/store/gymStore';
import { colors } from './src/theme';

export default function App() {
  return (
    <GymProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
        <AppNavigator />
      </SafeAreaView>
    </GymProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
