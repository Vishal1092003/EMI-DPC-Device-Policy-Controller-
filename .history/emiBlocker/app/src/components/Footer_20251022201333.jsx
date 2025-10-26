import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}>
                © {new Date().getFullYear()} Driven Technologies | All Rights Reserved
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#111",
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: "#333",
        alignItems: "center",
        justifyContent: "center",
    },
    text: { color: "#999", fontSize: 13 },
});
