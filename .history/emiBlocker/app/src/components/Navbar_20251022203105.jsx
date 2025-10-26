import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // ✅ Expo Router navigation

export default function Navbar() {
    const router = useRouter(); // initialize router

    return (
        <View style={styles.nav}>
            <Text style={styles.title}>📱 EMI Device Manager</Text>

            <View style={styles.links}>
                {/* ✅ use router.push() instead of navigation.navigate() */}
                <TouchableOpacity onPress={() => router.push("/src/pages/Home")}>
                    <Text style={styles.link}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/src/pages/AdminDashboard")}>
                    <Text style={styles.link}>Admin</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/src/pages/UnlockPage")}>
                    <Text style={styles.link}>Unlock</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: "#111",
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#f9b700",
        borderBottomWidth: 2,
    },
    title: { color: "#f9b700", fontSize: 18, fontWeight: "bold" },
    links: { flexDirection: "row", gap: 20 },
    link: { color: "white", fontWeight: "500", fontSize: 16 },
});
