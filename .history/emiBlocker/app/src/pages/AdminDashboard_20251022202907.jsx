import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";
import { useRouter } from "expo-router"; // ✅ Expo Router hook
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";

export default function AdminDashboard() {
    const [imei, setImei] = useState("");
    const [owner, setOwner] = useState("");
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState("active");

    const router = useRouter(); // ✅ for navigation

    const handleRegister = () => {
        if (!imei || !owner) return Alert.alert("Error", "Please fill both fields.");
        Alert.alert("✅ Registered", `${owner}'s device added`);
    };

    const handleLock = () => {
        setStatus("locked");
        Alert.alert("🔒 Locked", "Device has been locked.");
    };

    const handleUnlock = () => {
        setStatus("active");
        Alert.alert("✅ Unlocked", "Device has been unlocked.");
    };

    const handleOtp = () => {
        if (otp.length !== 6) return Alert.alert("Error", "Enter a 6-digit OTP.");
        Alert.alert("🔑 OTP Generated", `Give this code to customer: ${otp}`);
        setOtp("");
    };

    return (
        <View style={styles.page}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Admin Dashboard</Text>

                <InfoCard imei={imei} owner={owner} status={status} />

                <TextInput
                    style={styles.input}
                    placeholder="Enter IMEI"
                    placeholderTextColor="#888"
                    value={imei}
                    onChangeText={setImei}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter Owner Name"
                    placeholderTextColor="#888"
                    value={owner}
                    onChangeText={setOwner}
                />

                <TextInput
                    style={styles.input}
                    placeholder="6-digit OTP"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                />

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#f9b700" }]}
                    onPress={handleRegister}
                >
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "red" }]}
                    onPress={handleLock}
                >
                    <Text style={styles.btnText}>Lock Device</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "green" }]}
                    onPress={handleUnlock}
                >
                    <Text style={styles.btnText}>Unlock Device</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#333" }]}
                    onPress={handleOtp}
                >
                    <Text style={styles.btnText}>Generate OTP</Text>
                </TouchableOpacity>

                {/* ✅ Navigation Buttons using router */}
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#555", marginTop: 15 }]}
                    onPress={() => router.push("/src/pages/Home")}
                >
                    <Text style={styles.btnText}>Back to Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#444" }]}
                    onPress={() => router.push("/src/pages/UnlockPage")}
                >
                    <Text style={styles.btnText}>Go to Unlock Page</Text>
                </TouchableOpacity>
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: "#000" },
    content: { alignItems: "center", paddingVertical: 30 },
    heading: {
        fontSize: 22,
        color: "#f9b700",
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: "90%",
        backgroundColor: "#1c1c1c",
        color: "#fff",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginVertical: 6,
    },
    btn: {
        width: "90%",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 5,
    },
    btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
