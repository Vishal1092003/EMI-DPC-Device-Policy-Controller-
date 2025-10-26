import React from "react";

export default function InfoCard({ imei, owner, status }) {
    const locked = status === "locked";
    return (
        <div style={styles.card}>
            <p style={styles.label}>IMEI</p>
            <p style={styles.value}>{imei || "N/A"}</p>

            <p style={styles.label}>Owner</p>
            <p style={styles.value}>{owner || "N/A"}</p>

            <p style={{ ...styles.status, color: locked ? "red" : "#00ff7f" }}>
                {locked ? "🔒 Device Locked" : "✅ Device Active"}
            </p>
        </div>
    );
}

const styles = {
    card: {
        backgroundColor: "#1a1a1a",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    },
    label: { color: "#aaa", fontSize: "14px", marginTop: "8px" },
    value: { color: "#fff", fontSize: "18px", fontWeight: "600" },
    status: { marginTop: "15px", fontSize: "18px", fontWeight: "bold" },
};
