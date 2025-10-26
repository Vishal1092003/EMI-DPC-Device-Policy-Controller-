import React from "react";

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>© {new Date().getFullYear()} Driven Technologies | All Rights Reserved</p>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: "#111",
        padding: "15px",
        textAlign: "center",
        borderTop: "1px solid #333",
        position: "fixed",
        bottom: 0,
        width: "100%",
    },
    text: {
        color: "#999",
        fontSize: "14px",
    },
};
