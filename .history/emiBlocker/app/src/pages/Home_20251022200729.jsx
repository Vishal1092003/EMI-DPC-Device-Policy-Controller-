import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.content}>
                <h1 style={styles.title}>Welcome to EMI Device Management System</h1>
                <p style={styles.desc}>
                    Manage, lock, and unlock customer devices seamlessly with our secure EMI control system.
                </p>
                <a href="/admin" style={styles.button}>Go to Admin Dashboard</a>
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    content: {
        marginTop: "100px",
        textAlign: "center",
        width: "90%",
        maxWidth: "600px",
    },
    title: {
        fontSize: "28px",
        color: "#f9b700",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    desc: {
        fontSize: "16px",
        color: "#ccc",
        marginBottom: "40px",
    },
    button: {
        backgroundColor: "#f9b700",
        color: "#000",
        padding: "12px 30px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
    },
};
