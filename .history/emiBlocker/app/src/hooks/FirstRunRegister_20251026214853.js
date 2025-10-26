import React, { useEffect } from "react";
import { Alert } from "react-native";

const BASE_URL = "1. this alert msg is coming from whihc coponent.
2. i had checked all the backend deployed routes they are wirking properly on the browser and the postman https://emidpc-five.vercel.app/api/devices";
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
