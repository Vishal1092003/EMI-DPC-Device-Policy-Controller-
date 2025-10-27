// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Stack } from "expo-router";

// export default function Home() {
//     const router = useRouter();
//     return (
//         <View style={styles.page}>
//             <Navbar />
//             <View style={styles.container}>
//                 <Text style={styles.title}>Welcome to EMI Management System</Text>
//                 <Text style={styles.desc}>
//                     Control, lock, and unlock customer devices safely. A secure solution for your EMI sales.
//                 </Text>

//                 {/* ✅ use router.push() instead of navigation.navigate() */}
//                 <TouchableOpacity
//                     style={styles.btn}
//                     onPress={() => router.push("/src/pages/AdminDashboard")}
//                 >
//                     <Text style={styles.btnText}>Go to Dashboard</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={[styles.btn, { backgroundColor: "#333", marginTop: 10 }]}
//                     onPress={() => router.push("/src/pages/UnlockPage")}
//                 >
//                     <Text style={styles.btnText}>Go to Unlock Page</Text>
//                 </TouchableOpacity>
//             </View>
//             <Footer />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     page: { flex: 1, backgroundColor: "#000", justifyContent: "space-between" },
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//     },
//     title: { fontSize: 24, color: "#f9b700", fontWeight: "bold", marginBottom: 15 },
//     desc: { color: "#ccc", textAlign: "center", fontSize: 15, marginBottom: 30 },
//     btn: {
//         backgroundColor: "#f9b700",
//         paddingVertical: 14,
//         paddingHorizontal: 30,
//         borderRadius: 8,
//     },
//     btnText: { color: "#000", fontWeight: "bold", fontSize: 16 },
// });

import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
    const router = useRouter();
    const glowAnim = new Animated.Value(0);

    // Glow animation
    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    const glowColor = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#f9b700", "#fff04f"],
    });

    return (
        <View style={styles.page}>
            <ImageBackground
                source={{
                    uri: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b3?auto=format&fit=crop&w=900&q=80",
                }}
                style={styles.bgImage}
                blurRadius={20}
            >
                {/* <Navbar /> */}

                <View style={styles.overlay}>
                    <Animated.Text style={[styles.title, { color: glowColor }]}>
                        ⚡ EMI Management System
                    </Animated.Text>

                    <Text style={styles.subtitle}>
                        Control, lock, and unlock customer devices safely.{"\n"}A secure solution for your EMI sales.
                    </Text>

                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#f9b700" }]}
                        onPress={() => router.push("/src/pages/AdminDashboard")}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.btnText, { color: "#000" }]}>Go to Dashboard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#202020", borderColor: "#f9b700", borderWidth: 1.5 }]}
                        onPress={() => router.push("/src/pages/UnlockPage")}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.btnText, { color: "#f9b700" }]}>Go to Unlock Page</Text>
                    </TouchableOpacity>
                </View>

                <Footer />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#000",
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "space-between",
    },
    overlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    title: {
        fontSize: 28,
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 15,
        textShadowColor: "#f9b700",
        textShadowRadius: 15,
        textShadowOffset: { width: 0, height: 0 },
    },
    subtitle: {
        color: "#ddd",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 40,
        lineHeight: 22,
    },
    btn: {
        width: "80%",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginVertical: 8,
        elevation: 8,
        shadowColor: "#f9b700",
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    btnText: {
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
    },
});
