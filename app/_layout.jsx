import { Stack } from 'expo-router';

import '../global.css';
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="exercises"
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name="exerciseDetails"
        options={{ presentation: 'containedTransparentModal' }}
      />
    </Stack>
  );
}
