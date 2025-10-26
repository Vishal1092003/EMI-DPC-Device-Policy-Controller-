// app/src/pages/Customer.js  (make sure there’s a default export)
import React, { useEffect } from "react";
import { NativeModules, Platform } from "react-native";

const BASE_URL = "https://emidpc-five.vercel.app

/api/devices"; // or your public API if device is remote
const { DeviceManagerModule } = NativeModules;

// You should read IMEI/serial via native; here, assume you stored it after first launch
const IMEI = "put-real-imei-here-or-store-it-after-first-register";

export default function Customer() {
    useEffect(() => {
        let t = setInterval(async () => {
            try {
                const res = await fetch(`${BASE_URL}/device/poll?imei=${IMEI}`);
                const { command } = await res.json();
                if (!command || command.type === "NONE") return;

                if (command.type === "LOCK") {
                    // Start kiosk lock screen
                    DeviceManagerModule.startKiosk();
                    // You may also display OTP in your lock screen UI or store it
                } else if (command.type === "UNLOCK") {
                    DeviceManagerModule.stopKiosk();
                }
            } catch (_) { }
        }, 4000);

        return () => clearInterval(t);
    }, []);

    return null; // Or show a tiny dashboard
}
