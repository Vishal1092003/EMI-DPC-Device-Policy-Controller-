import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet, Text, Alert } from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BASE_URL = "https://emidpc-five.vercel.app/api/provision/qr";

export default function ProvisionQR() {
    const [qr, setQr] = useState(null);
    
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(BASE_URL);
                const data = await res.json();
                setQr(data.dataUrl); // data URL PNG
            } catch {
                Alert.alert("Error", "Failed to load provisioning QR");
            }
        })();
    }, []);

    return (
        <View style={styles.page}>
            <Navbar />
            <View style={styles.body}>
                <Text style={styles.title}>📷 Scan on a NEW / Reset phone</Text>
                {!qr ? <ActivityIndicator size="large" color="#f9b700" /> :
                    <Image source={{ uri: qr }} style={styles.qr} resizeMode="contain" />}
                <Text style={styles.hint}>
                    On the customer phone, during setup, choose “Set up via QR code”.
                </Text>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: "#000" },
    body: { flex: 1, alignItems: "center", justifyContent: "center", padding: 22 },
    title: { color: "#f9b700", fontSize: 18, fontWeight: "bold", marginBottom: 14 },
    qr: { width: 320, height: 320, backgroundColor: "#111", borderRadius: 8 },
    hint: { color: "#bbb", marginTop: 12, textAlign: "center" }
});
