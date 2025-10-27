import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "red" },
        headerTitle: "TEST HEADER",
      }}
    />
  );
}
