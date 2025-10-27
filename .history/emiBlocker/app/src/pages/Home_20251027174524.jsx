import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Stack } from "expo-router";

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.page}>
            <Navbar />
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to EMI Management System</Text>
                <Text style={styles.desc}>
                    Control, lock, and unlock customer devices safely. A secure solution for your EMI sales.
                </Text>

                {/* ✅ use router.push() instead of navigation.navigate() */}
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => router.push("/src/pages/AdminDashboard")}
                >
                    <Text style={styles.btnText}>Go to Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#333", marginTop: 10 }]}
                    onPress={() => router.push("/src/pages/UnlockPage")}
                >
                    <Text style={styles.btnText}>Go to Unlock Page</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
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
