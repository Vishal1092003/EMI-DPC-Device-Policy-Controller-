// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useRouter } from "expo-router"; // ✅ Expo Router navigation

// export default function Navbar() {
//     const router = useRouter(); // initialize router

//     return (
//         <View style={styles.nav}>
//             <Text style={styles.title}>📱 EMI Device Manager</Text>

//             <View style={styles.links}>
//                 {/* ✅ use router.push() instead of navigation.navigate() */}
//                 <TouchableOpacity onPress={() => router.push("/src/pages/Home")}>
//                     <Text style={styles.link}>Home</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => router.push("/src/pages/AdminDashboard")}>
//                     <Text style={styles.link}>Admin</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => router.push("/src/pages/UnlockPage")}>
//                     <Text style={styles.link}>Unlock</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     nav: {
//         backgroundColor: "#111",
//         paddingVertical: 15,
//         paddingHorizontal: 20,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         borderBottomColor: "#f9b700",
//         borderBottomWidth: 2,
//     },
//     title: { color: "#f9b700", fontSize: 18, fontWeight: "bold" },
//     links: { flexDirection: "row", gap: 20 },
//     link: { color: "white", fontWeight: "500", fontSize: 16 },
// });
import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
    LinearGradient,
} from "react-native";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function Navbar() {
    const router = useRouter();

    // ✨ Animated underline sweep
    const lineAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(lineAnim, {
                    toValue: screenWidth,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(lineAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.nav}>
            <View style={styles.left}>
                <Text style={styles.icon}>⚡</Text>
                <Text style={styles.title}>EMI Device Manager</Text>
            </View>

            <View style={styles.links}>
                <TouchableOpacity onPress={() => router.push("/src/pages/Home")}>
                    <Text style={styles.link}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/src/pages/AdminDashboard")}>
                    <Text style={styles.link}>Admin</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/src/pages/UnlockPage")}>
                    <Text style={styles.link}>Unlock</Text>
                </TouchableOpacity>
            </View>

            {/* 🔥 Animated golden underline */}
            <Animated.View
                style={[
                    styles.underline,
                    {
                        left: lineAnim,
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: "#000",
        paddingVertical: 14,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        elevation: 8,
        borderBottomColor: "#111",
        borderBottomWidth: 1,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        fontSize: 20,
        color: "#f9b700",
        marginRight: 6,
    },
    title: {
        color: "#f9b700",
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: 0.5,
    },
    links: {
        flexDirection: "row",
        alignItems: "center",
        gap: 22,
    },
    link: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    underline: {
        position: "absolute",
        bottom: 0,
        width: 120,
        height: 3,
        backgroundColor: "#f9b700",
        borderRadius: 4,emi device manag
        opacity: 0.9,
    },
});
