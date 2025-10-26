import React, { useEffect } from "react";
import { Alert } from "react-native";

const BASE_URL = "https://emidpc-five.vercel.app/api/devices";
const IMEI = "1234567890"; // replace with real or dynamically generated IMEI

export default function FirstRunRegister() {
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${BASE_URL}/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        imei: IMEI,
                        owner: "CustomerNameIfKnown",
                        serverId: "any-id-you-generate",
                    }),
                });

                const data = await res.json();
                console.log("✅ Server response:", data);

                if (res.ok) {
                    Alert.alert("✅ Registered successfully");
                } else {
                    Alert.alert("Error", data.msg || "Registration failed");
                }
            } catch (e) {
                console.log("❌ Device registration failed:", e);
                Alert.alert("Error", `Cannot register device to server.\n${e.message}`);
            }
        })();
    }, []);

    return null;
}
