import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as Device from "expo-device"; // to get unique device info

const BASE_URL = "https://emidpc-five.vercel.app/api/devices";

const Index = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // 🧩 Function to register device on first run
    const registerDevice = async () => {
        try {
            const imei = Device.osBuildId || Device.deviceName || "unknown-device";

            const res = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imei,
                    owner: "CustomerNameIfKnown",
                    serverId: "auto-generated",
                }),
            });

            const data = await res.json();
            
            if (res.ok) {
                console.log("✅ Device registered:", data);
            } else {
                console.warn("⚠️ Registration failed:", data.msg);
            }
        } catch (err) {
            Alert.alert("Error", "Cannot register device to server.");
        }
    };

    // 🕐 Run registration & navigation on mount
    useEffect(() => {
        (async () => {
            await registerDevice();

            // delay then move to home screen
            setTimeout(() => {
                router.replace("/src/pages/Home");
            }, 2000);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#f9b700" />
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
});
