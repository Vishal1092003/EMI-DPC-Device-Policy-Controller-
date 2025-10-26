import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useRouter } from "expo-router"; // ✅ Expo Router navigation
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UnlockPage() {
    const [imei, setImei] = useState("");
    const [otp, setOtp] = useState("");
    const router = useRouter();

    const handleVerify = () => {
        if (!imei || !otp) {
            Alert.alert("Error", "Please enter both IMEI and OTP");
            return;
        }

        // You can later replace this with a backend verify API call
        if (otp === "123456") {
            Alert.alert("✅ Device Unlocked!", "The device is now accessible.", [
                { text: "OK", onPress: () => router.push("/src/pages/Home") },
            ]);
        } else {
            Alert.alert("❌ Invalid or expired code.");
        }
    };

    return (
        <View style={styles.page}>
            <Navbar />
            <View style={styles.container}>
                <Text style={styles.title}>🔒 Unlock Your Device</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter IMEI"
                    placeholderTextColor="#888"
                    value={imei}
                    onChangeText={setImei}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter 6-digit Code"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                />

                <TouchableOpacity style={styles.btn} onPress={handleVerify}>
                    <Text style={styles.btnText}>Verify & Unlock</Text>
                </TouchableOpacity>

                {/* ✅ Navigation using router */}
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#333", marginTop: 15 }]}
                    onPress={() => router.push("/src/pages/Home")}
                >
                    <Text style={styles.btnText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: "#000" },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        color: "#f9b700",
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "90%",
        backgroundColor: "#1c1c1c",
        color: "#fff",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginVertical: 8,
    },
    btn: {
        backgroundColor: "#f9b700",
        width: "90%",
        borderRadius: 10,
        padding: 14,
        alignItems: "center",
        marginTop: 10,
    },
    btnText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});
