import React from "react";

export default function Navbar() {
    return (
        <nav style={styles.nav}>
            <h1 style={styles.title}>📱 EMI Device Manager</h1>
            <div style={styles.links}>
                <a href="/" style={styles.link}>Home</a>
                <a href="/admin" style={styles.link}>Admin</a>
                <a href="/unlock" style={styles.link}>Unlock</a>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        backgroundColor: "#111",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #f9b700",
    },
    title: {
        color: "#f9b700",
        fontSize: "20px",
        fontWeight: "bold",
    },
    links: { display: "flex", gap: "20px" },
    link: {
        color: "white",
        textDecoration: "none",
        fontWeight: "500",
    },
};
