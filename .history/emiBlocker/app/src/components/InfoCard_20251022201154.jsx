import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function InfoCard({ imei, owner, status }) {
    const locked = status === "locked";
    return (
        <View style={styles.card}>
            <Text style={styles.label}>IMEI</Text>
            <Text style={styles.value}>{imei || "N/A"}</Text>
            <Text style={styles.label}>Owner</Text>
            <Text style={styles.value}>{owner || "N/A"}</Text>
            <Text style={[styles.status, { color: locked ? "red" : "#00ff7f" }]}>
                {locked ? "🔒 Device Locked" : "✅ Device Active"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1a1a1a",
        borderRadius: 14,
        padding: 20,
        width: "90%",
        marginVertical: 15,
    },
    label: { color: "#aaa", fontSize: 14, marginTop: 6 },
    value: { color: "#fff", fontSize: 18, fontWeight: "600" },
    status: { marginTop: 10, fontSize: 18, fontWeight: "bold", textAlign: "center" },
});
