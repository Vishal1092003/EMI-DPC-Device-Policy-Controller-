import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";

export default function AdminDashboard() {
    const [imei, setImei] = useState("");
    const [owner, setOwner] = useState("");
    const [otp, setOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [status, setStatus] = useState("active");

    const handleRegister = () => {
        if (!imei || !owner) return setMsg("IMEI and Owner are required.");
        setMsg("✅ Device registered successfully.");
    };

    const handleLock = () => {
        setStatus("locked");
        setMsg("🔒 Device Locked successfully.");
    };

    const handleUnlock = () => {
        setStatus("active");
        setMsg("✅ Device Unlocked successfully.");
    };

    const handleOtp = () => {
        if (otp.length !== 6) return setMsg("Please enter a 6-digit OTP.");
        setMsg(`🔑 OTP ${otp} generated successfully.`);
        setOtp("");
    };

    return (
        <div style={styles.page}>
            <Navbar />
            <div style={styles.wrapper}>
                <h2 style={styles.title}>Admin Dashboard</h2>
                <InfoCard imei={imei} owner={owner} status={status} />
                <div style={styles.form}>
                    <input style={styles.input} placeholder="IMEI" value={imei} onChange={(e) => setImei(e.target.value)} />
                    <input style={styles.input} placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} />
                    <input style={styles.input} placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
                    <button style={{ ...styles.btn, backgroundColor: "#f9b700", color: "#000" }} onClick={handleRegister}>Register Device</button>
                    <button style={{ ...styles.btn, backgroundColor: "red" }} onClick={handleLock}>Lock Device</button>
                    <button style={{ ...styles.btn, backgroundColor: "green" }} onClick={handleUnlock}>Unlock Device</button>
                    <button style={{ ...styles.btn, backgroundColor: "#444" }} onClick={handleOtp}>Generate OTP</button>
                </div>
                <p style={styles.msg}>{msg}</p>
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    page: { backgroundColor: "#000", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" },
    wrapper: { marginTop: "80px", width: "90%", maxWidth: "500px", textAlign: "center" },
    title: { fontSize: "24px", color: "#f9b700", marginBottom: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" },
    input: { padding: "10px", borderRadius: "8px", border: "none", outline: "none", fontSize: "16px" },
    btn: { padding: "12px", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold", cursor: "pointer" },
    msg: { marginTop: "15px", color: "#f9b700", fontWeight: "500" },
};
