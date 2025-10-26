import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home({ navigation }) {
    return (
        <View style={styles.page}>
            <Navbar navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to EMI Management System</Text>
                <Text style={styles.desc}>
                    Control, lock, and unlock customer devices safely. A secure solution for your EMI sales.
                </Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate("AdminDashboard")}
                >
                    <Text style={styles.btnText}>Go to Dashboard</Text>
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
