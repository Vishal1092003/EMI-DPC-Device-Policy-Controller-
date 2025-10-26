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
            colors={["#151515", "#0e0e0e"]}
            style={styles.deviceCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.imei}>📱 {item.imei}</Text>
            </View>
            <Text style={styles.owner}>👤 {item.owner}</Text>

            <Text
                style={[
                    styles.status,
                    { color: item.status === "locked" ? "#ff5757" : "#2ee87a" },
                ]}
            >
                {item.status === "locked" ? "🔒 Locked" : "✅ Active"}
            </Text>

            {item.otp && (
                <Text style={styles.otp}>
                    OTP: <Text style={{ color: "#f9b700" }}>{item.otp}</Text>
                </Text>
            )}

            <View style={styles.actions}>
                <LinearGradient
                    colors={["#ff6a6a", "#e82f2f"]}
                    style={styles.actionBtn}
                >
                    <TouchableOpacity onPress={() => handleLock(item.imei)}>
                        <Text style={styles.btnText}>Lock</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                    colors={["#00d77b", "#009e5a"]}
                    style={styles.actionBtn}
                >
                    <TouchableOpacity onPress={() => handleUnlock(item.imei)}>
                        <Text style={styles.btnText}>Unlock</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </LinearGradient>
    );

    return (
        <View style={styles.page}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>📦 Your Sold Devices</Text>

                {/* 🔍 Search */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by IMEI or Owner name..."
                        placeholderTextColor="#aaa"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

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
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#f9b700",
        paddingBottom: 5,
    },
    searchContainer: {
        width: "90%",
        marginBottom: 15,
        shadowColor: "#f9b700",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    searchInput: {
        backgroundColor: "#1a1a1a",
        color: "#fff",
        borderRadius: 14,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#2c2c2c",
    },
    deviceCard: {
        width: "100px",
        borderRadius: 18,
        padding: 30,
        marginVertical: 5,
        borderWidth: 1.2,
        borderColor: "#f9b70030",
        shadowColor: "#f9b700",
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imei: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    owner: {
        color: "#ccc",
        fontSize: 15,
        marginTop: 4,
        marginBottom: 10,
    },
    status: {
        marginTop: 8,
        fontWeight: "bold",
        fontSize: 16,
    },
    otp: {
        color: "#ccc",
        fontSize: 14,
        marginTop: 6,
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
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        elevation: 4,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
    },
    backBtn: {
        width: "85%",
        borderRadius: 12,
        marginTop: 30,
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
        marginTop: 40,
    },
});
