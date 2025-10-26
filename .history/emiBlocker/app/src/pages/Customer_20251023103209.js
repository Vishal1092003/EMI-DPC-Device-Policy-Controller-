// src/pages/Customer.js
import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, NativeModules } from "react-native";

const { DeviceManagerModule } = NativeModules;
const BASE_URL = "http://192.168.31.215:5000/api/devices"; // <-- use your local IP

export default function Customer() {
    const imei = "123456789012345"; // test IMEI
    const [status, setStatus] = useState("active");

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch(`${BASE_URL}/${imei}`);
                const data = await res.json();
                setStatus(data.status);
                if (data.status === "locked") {
                    DeviceManagerModule.lockDevice(); // 🔒 native Java lock
                }
            } catch (err) {
                console.log("Backend not reachable");
            }
        }, 15000); // check every 15 seconds

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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    text: {
        color: "#f9b700",
        fontSize: 22,
        fontWeight: "bold",
    },
});
