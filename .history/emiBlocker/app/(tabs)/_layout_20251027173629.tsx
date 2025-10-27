import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // ✅ hides that "src/pages/Home" globally
        animation: "fade",  // optional, smooth screen transition
      }}
    />
  );
}
