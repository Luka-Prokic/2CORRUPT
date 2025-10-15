import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal', // Hides back title
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />

      <Stack.Screen
        name="about"
        options={{ title: 'About' }}
      />
    </Stack>
  );
}
