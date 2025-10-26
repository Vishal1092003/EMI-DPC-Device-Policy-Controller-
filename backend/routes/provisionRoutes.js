const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const QRCode = require("qrcode");

const router = express.Router();

// Change to your hosted HTTPS APK URL:
const APK_URL = process.env.DPC_APK_URL || "https://yourcdn.com/emi-dpc-release.apk";

// Path where your backend can read the APK file to derive checksum (or store a precomputed one in env)
const APK_FILE_ON_DISK = process.env.DPC_APK_FILE || path.join(__dirname, "../static/emi-dpc-release.apk");

// Package + receiver from your Android app
const DPC_COMPONENT = process.env.DPC_COMPONENT || "com.vishal1092003.emiBlocker/com.vishal1092003.emiBlocker.MyDeviceAdminReceiver";

// Base64(SHA-256) of APK bytes as required by Provisioning
function apkChecksumBase64() {
    const buf = fs.readFileSync(APK_FILE_ON_DISK);
    const sha = crypto.createHash("sha256").update(buf).digest();
    return sha.toString("base64");
}

// GET /api/provision/qr
// Returns data URL PNG for the provisioning QR (for quick use in admin UI),
// plus raw JSON if you want to generate QR elsewhere.
router.get("/qr", async (req, res) => {
    try {
        const checksum = apkChecksumBase64();

        const payload = {
            "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": DPC_COMPONENT,
            "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": APK_URL,
            "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": checksum,
            // Optional Wi-Fi (uncomment if needed)
            // "android.app.extra.PROVISIONING_WIFI_SSID": "YourWiFi",
            // "android.app.extra.PROVISIONING_WIFI_PASSWORD": "YourPassword",
            // "android.app.extra.PROVISIONING_WIFI_SECURITY_TYPE": "WPA",
            // Optional to keep all system apps
            "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true
        };

        const json = JSON.stringify(payload);

        const dataUrl = await QRCode.toDataURL(json, { errorCorrectionLevel: "M", width: 600 });
        res.json({ dataUrl, payload });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "QR generation failed" });
    }
});

module.exports = router;
