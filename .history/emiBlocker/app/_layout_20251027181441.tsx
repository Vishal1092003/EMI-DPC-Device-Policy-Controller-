import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false, // ✅ hides all headers globally
              animation: "fade",  // smooth transition
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
          </Stack>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // keep your app background color consistent
  },
  container: {
    flex: 1,
    marginTop: 0, // ✅ no extra top margin — only SafeAreaView handles the camera notch
  },
});
