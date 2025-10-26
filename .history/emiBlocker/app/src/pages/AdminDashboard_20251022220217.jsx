import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";

// ⚙️ Replace this with your machine’s local IP or deployed backend URL
const BASE_URL = "http://localhost/api/devices";

export default function AdminDashboard() {
    const router = useRouter();

    // Admin info
    const [adminName] = useState("Sanjeev Kumar Sharma");
    const [shopName] = useState("Driven Pharmaceuticals & Mobile Hub");

    // Form inputs
    const [imei, setImei] = useState("");
    const [owner, setOwner] = useState("");
    const [otp, setOtp] = useState("");

    // Device list
    const [devices, setDevices] = useState([]);

    // Fetch all devices from backend on page load
    const fetchDevices = async () => {
        try {
            const res = await fetch(BASE_URL);
            const data = await res.json();
            setDevices(data);
        } catch (err) {
            Alert.alert("Error", "Cannot fetch devices. Check backend connection.");
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    // 🔹 Register device
    const handleRegister = async () => {
        if (!imei || !owner)
            return Alert.alert("Error", "Please fill both fields.");

        try {
            const res = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imei, owner }),
            });
            const data = await res.json();

            if (res.ok) {
                Alert.alert("✅ Registered", `${owner}'s device added.`);
                setImei("");
                setOwner("");
                fetchDevices();
            } else Alert.alert("Error", data.msg || "Failed to register.");
        } catch (err) {
            Alert.alert("Error", "Server not responding.");
        }
    };

    // 🔹 Lock device
    const handleLock = async (deviceImei) => {
        try {
            const res = await fetch(`${BASE_URL}/lock/${deviceImei}`, {
                method: "PATCH",
            });
            const data = await res.json();
            if (res.ok) {
                Alert.alert(
                    "🔒 Locked",
                    `Device IMEI: ${deviceImei}\nGenerated OTP: ${data.otp}\n\nSend this OTP to customer.`
                );
                fetchDevices();
            } else Alert.alert("Error", data.msg || "Lock failed.");
        } catch (err) {
            Alert.alert("Error", "Backend connection failed.");
        }
    };

    // 🔹 Unlock device
    const handleUnlock = async (deviceImei) => {
        try {
            const res = await fetch(`${BASE_URL}/unlock/${deviceImei}`, {
                method: "PATCH",
            });
            const data = await res.json();
            if (res.ok) {
                Alert.alert("✅ Unlocked", `Device IMEI: ${deviceImei} is now active.`);
                fetchDevices();
            } else Alert.alert("Error", data.msg || "Unlock failed.");
        } catch (err) {
            Alert.alert("Error", "Backend connection failed.");
        }
    };

    // 🔹 Manual OTP
    const handleOtp = () => {
        if (otp.length !== 6) return Alert.alert("Error", "Enter a 6-digit OTP.");
        Alert.alert("🔑 OTP Generated", `Manual OTP: ${otp}`);
        setOtp("");
    };

    // 🔹 Render device cards
    const renderDevice = ({ item }) => (
        <View style={styles.deviceCard}>
            <Text style={styles.deviceLabel}>IMEI:</Text>
            <Text style={styles.deviceValue}>{item.imei}</Text>

            <Text style={styles.deviceLabel}>Owner:</Text>
            <Text style={styles.deviceValue}>{item.owner}</Text>

            <Text
                style={[
                    styles.deviceStatus,
                    { color: item.status === "locked" ? "red" : "#00ff7f" },
                ]}
            >
                {item.status === "locked" ? "🔒 Locked" : "✅ Active"}
            </Text>

            {item.otp && <Text style={styles.otpText}>Current OTP: {item.otp}</Text>}

            <View style={styles.deviceActions}>
                <TouchableOpacity
                    style={[styles.smallBtn, { backgroundColor: "red" }]}
                    onPress={() => handleLock(item.imei)}
                >
                    <Text style={styles.btnText}>Lock</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.smallBtn, { backgroundColor: "green" }]}
                    onPress={() => handleUnlock(item.imei)}
                >
                    <Text style={styles.btnText}>Unlock</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.page}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Admin Dashboard</Text>

                <View style={styles.adminInfo}>
                    <Text style={styles.adminText}>👨‍💼 Admin: {adminName}</Text>
                    <Text style={styles.adminText}>🏬 Shop: {shopName}</Text>
                </View>

                <Text style={styles.sectionTitle}>➕ Register New Customer</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter IMEI"
                    placeholderTextColor="#888"
                    value={imei}
                    onChangeText={setImei}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter Customer Name"
                    placeholderTextColor="#888"
                    value={owner}
                    onChangeText={setOwner}
                />

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#f9b700" }]}
                    onPress={handleRegister}
                >
                    <Text style={[styles.btnText, { color: "#000" }]}>Register</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>📱 Sold Devices</Text>

                {devices.length === 0 ? (
                    <Text style={{ color: "#777", marginVertical: 10 }}>
                        No devices registered yet.
                    </Text>
                ) : (
                    <FlatList
                        data={devices}
                        keyExtractor={(item) => item.imei}
                        renderItem={renderDevice}
                    />
                )}

                <Text style={styles.sectionTitle}>🔐 Generate Manual OTP</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                />
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#333" }]}
                    onPress={handleOtp}
                >
                    <Text style={styles.btnText}>Generate OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#555", marginTop: 20 }]}
                    onPress={() => router.push("/src/pages/Home")}
                >
                    <Text style={styles.btnText}>🏠 Back to Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#444" }]}
                    onPress={() => router.push("/src/pages/UnlockPage")}
                >
                    <Text style={styles.btnText}>🔓 Go to Unlock Page</Text>
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
    adminInfo: {
        backgroundColor: "#1c1c1c",
        padding: 15,
        borderRadius: 10,
        width: "90%",
        marginBottom: 15,
    },
    adminText: { color: "#fff", fontSize: 15, marginVertical: 2 },
    sectionTitle: {
        color: "#f9b700",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
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
    deviceCard: {
        backgroundColor: "#1a1a1a",
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        width: "90%",
    },
    deviceLabel: { color: "#aaa", fontSize: 13 },
    deviceValue: { color: "#fff", fontSize: 16, fontWeight: "600" },
    deviceStatus: { marginTop: 5, fontWeight: "bold" },
    otpText: { color: "#f9b700", marginTop: 5, fontSize: 14 },
    deviceActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    smallBtn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
});
