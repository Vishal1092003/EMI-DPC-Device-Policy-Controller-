import React, { useEffect } from "react";
import { Alert } from "react-native";

const BASE_URL = "https://emidpc-five.vercel.app/api/device";
const IMEI = "put-real-imei-here"; // later replace with a real unique ID

export default function FirstRunRegister() {
    useEffect(() => {
        (async () => {
            try {
                await fetch(`${BASE_URL}/device/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        imei: IMEI,
                        owner: "CustomerNameIfKnown",
                        serverId: "any-id-you-generate",
                    }),
                });
            } catch (e) {
                Alert.alert("Cannot register device to server");
            }
        })();
    }, []);

    return null;
}
