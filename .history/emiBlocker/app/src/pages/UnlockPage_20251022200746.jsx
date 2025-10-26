import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UnlockPage() {
    const [imei, setImei] = useState("");
    const [otp, setOtp] = useState("");
    const [msg, setMsg] = useState("");

    const handleVerify = () => {
        if (!imei || !otp) return setMsg("Enter IMEI and OTP");
        if (otp === "123456") setMsg("✅ Device Unlocked!");
        else setMsg("❌ Invalid or expired code");
    };

    return (
        <div style={styles.page}>
            <Navbar />
            <div style={styles.container}>
                <h2 style={styles.title}>🔒 Unlock Your Device</h2>
                <input style={styles.input} placeholder="Enter IMEI" value={imei} onChange={(e) => setImei(e.target.value)} />
                <input style={styles.input} placeholder="Enter 6-digit Code" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
                <button style={styles.button} onClick={handleVerify}>Verify & Unlock</button>
                <p style={styles.msg}>{msg}</p>
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    page: { backgroundColor: "#000", minHeight: "100vh", color: "white", display: "flex", flexDirection: "column", alignItems: "center" },
    container: { marginTop: "100px", width: "90%", maxWidth: "400px", textAlign: "center" },
    title: { fontSize: "24px", color: "#f9b700", marginBottom: "20px" },
    input: { width: "100%", padding: "12px", borderRadius: "8px", border: "none", outline: "none", marginBottom: "10px", fontSize: "16px" },
    button: { backgroundColor: "#f9b700", color: "#000", width: "100%", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" },
    msg: { marginTop: "15px", fontWeight: "500" },
};
