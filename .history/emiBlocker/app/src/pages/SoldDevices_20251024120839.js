import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    TextInput,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BASE_URL = "http://10.0.2.2:3000/api/devices";

export default function SoldDevices() {
    const router = useRouter();
    const [devices, setDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // 🔹 Fetch all devices
    const fetchDevices = async () => {
        try {
            const res = await fetch(BASE_URL);
            const data = await res.json();
            setDevices(data);
        } catch {
            Alert.alert("Error", "Cannot fetch devices. Check backend connection.");
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    // 🔹 Filter devices based on search query
    const filteredDevices = devices.filter(
        (item) =>
            item.imei.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLock = async (imei) => {
        try {
            const res = await fetch(`${BASE_URL}/lock/${imei}`, { method: "PATCH" });
            const data = await res.json();
            if (res.ok) {
                Alert.alert("🔒 Locked", `Device ${imei} locked. OTP: ${data.otp}`);
                fetchDevices();
            } else Alert.alert("Error", data.msg || "Lock failed.");
        } catch {
            Alert.alert("Error", "Server not responding.");
        }
    };

    const handleUnlock = async (imei) => {
        try {
            const res = await fetch(`${BASE_URL}/unlock/${imei}`, { method: "PATCH" });
            const data = await res.json();
            if (res.ok) {
                Alert.alert("✅ Unlocked", `Device ${imei} is now active.`);
                fetchDevices();
            } else Alert.alert("Error", data.msg || "Unlock failed.");
        } catch {
            Alert.alert("Error", "Server not responding.");
        }
    };

    const renderDevice = ({ item }) => (
        <LinearGradient
            colors={["#1c1c1c", "#121212"]}
            style={styles.deviceCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Text style={styles.imei}>📱 IMEI: {item.imei}</Text>
            <Text style={styles.owner}>👤 Owner: {item.owner}</Text>

            <Text
                style={[
                    styles.status,
                    { color: item.status === "locked" ? "#ff4d4d" : "#00ff7f" },
                ]}
            >
                {item.status === "locked" ? "🔒 Locked" : "✅ Active"}
            </Text>

            {item.otp && <Text style={styles.otp}>OTP: {item.otp}</Text>}

            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={() => handleLock(item.imei)}
                    style={[styles.actionBtn, { backgroundColor: "#ff4d4d" }]}
                >
                    <Text style={styles.btnText}>Lock</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleUnlock(item.imei)}
                    style={[styles.actionBtn, { backgroundColor: "#00b86b" }]}
                >
                    <Text style={styles.btnText}>Unlock</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );

    return (
        <View style={styles.page}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>📦 Your Sold Devices</Text>

                {/* 🔍 Search Bar */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by IMEI or Owner name..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {/* 🔹 Device List */}
                {filteredDevices.length === 0 ? (
                    <Text style={styles.emptyText}>No devices found.</Text>
                ) : (
                    <FlatList
                        data={filteredDevices}
                        renderItem={renderDevice}
                        keyExtractor={(item) => item.imei}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                )}

                <TouchableOpacity
                    style={styles.backBtn}
                    activeOpacity={0.8}
                    onPress={() => router.back()}
                >
                    <LinearGradient
                        colors={["#f9b700", "#ffcb32"]}
                        style={styles.backGradient}
                    >
                        <Text style={styles.backText}>⬅ Back to Dashboard</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#000",
    },
    content: {
        alignItems: "center",
        paddingVertical: 20,
    },
    heading: {
        color: "#f9b700",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 15,
    },
    searchInput: {
        width: "90%",
        backgroundColor: "#1c1c1c",
        color: "#fff",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#333",
    },
    deviceCard: {
        width: "90%",
        borderRadius: 16,
        padding: 20,
        marginVertical: 10,
        shadowColor: "#f9b700",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    imei: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 6,
        fontWeight: "600",
    },
    owner: {
        color: "#ccc",
        fontSize: 15,
        marginBottom: 4,
    },
    status: {
        marginTop: 8,
        fontWeight: "bold",
        fontSize: 16,
    },
    otp: {
        color: "#f9b700",
        fontSize: 14,
        marginTop: 5,
        fontStyle: "italic",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    actionBtn: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
    backBtn: {
        width: "85%",
        borderRadius: 12,
        marginTop: 25,
        overflow: "hidden",
    },
    backGradient: {
        paddingVertical: 14,
        alignItems: "center",
        borderRadius: 12,
    },
    backText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700",
    },
    emptyText: {
        color: "#777",
        fontSize: 16,
        marginTop: 30,
    },
});
