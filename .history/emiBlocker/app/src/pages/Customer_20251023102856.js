import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { NativeModules } from "react-native";

const { DeviceManagerModule } = NativeModules;
const BASE_URL = "http://192.168.31.215:5000/api/devices";

export default function CustomerApp() {
    const imei = "123456789012345"; // each device’s IMEI saved during register
    const [status, setStatus] = useState("active");

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch(`${BASE_URL}/${imei}`);
                const data = await res.json();
                setStatus(data.status);
                if (data.status === "locked") {
                    DeviceManagerModule.lockDevice(); // 🔒 call Java module
                }
            } catch (err) {
                console.log("Backend not reachable");
            }
        }, 20000); // every 20s

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Device Status: {status === "locked" ? "🔒 Locked" : "✅ Active"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
    text: { color: "#f9b700", fontSize: 22, fontWeight: "bold" },
});
