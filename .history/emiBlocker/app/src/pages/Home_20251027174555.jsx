import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Stack } from "expo-router";

export default function Home() {
    const router = useRouter();

    return (
        <Stack
      screenOptions={{
        headerShown: false, // ✅ hides that "src/pages/Home" globally
        animation: "fade",  // optional, smooth screen transition
      }}
    >

    </Stack>
      
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: "#000", justifyContent: "space-between" },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: { fontSize: 24, color: "#f9b700", fontWeight: "bold", marginBottom: 15 },
    desc: { color: "#ccc", textAlign: "center", fontSize: 15, marginBottom: 30 },
    btn: {
        backgroundColor: "#f9b700",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    btnText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});
