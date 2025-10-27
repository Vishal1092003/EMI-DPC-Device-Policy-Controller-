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
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    // underline animation
    const glow = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glow, { toValue: 1, duration: 1800, easing: Easing.linear, useNativeDriver: false }),
                Animated.timing(glow, { toValue: 0, duration: 1800, easing: Easing.linear, useNativeDriver: false }),
            ])
        ).start();
    }, []);

    const glowColor = glow.interpolate({
        inputRange: [0, 1],
        outputRange: ["#f9b700", "#ffdd66"],
    });

    const NavLink = ({ label, route }) => (
        <TouchableOpacity onPress={() => router.push(route)} activeOpacity={0.7}>
            <View style={styles.linkWrap}>
                <Text
                    style={[
                        styles.link,
                        pathname.includes(route) && { color: "#f9b700", fontWeight: "700" },
                    ]}
                >
                    {label}
                </Text>
                {pathname.includes(route) && <Animated.View style={[styles.activeLine, { backgroundColor: glowColor }]} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.nav}>
            <View style={styles.left}>
                <Text style={styles.logoIcon}>⚡</Text>
                <Text style={styles.logo}>EMI Device Manager</Text>
            </View>

            <View style={styles.right}>
                <NavLink label="HOME" route="/src/pages/Home" />
                <NavLink label="ADMIN" route="/src/pages/AdminDashboard" />
                <NavLink label="UNLOCK" route="/src/pages/UnlockPage" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: "#0a0a0a",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderBottomColor: "#1a1a1a",
        borderBottomWidth: 1.5,
        elevation: 10,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    logoIcon: {
        color: "#f9b700",
        fontSize: 20,
        marginTop: -2,
    },
    logo: {
        color: "#f9b700",
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: 0.6,
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
        gap: 26,
    },
    linkWrap: {
        alignItems: "center",
    },
    link: {
        color: "#fff",
        fontSize: 15.5,
        fontWeight: "500",
        letterSpacing: 0.4,
    },
    activeLine: {
        height: 2.5,
        width: 28,
        marginTop: 3,
        borderRadius: 10,
    },
});
