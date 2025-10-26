// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     Alert,
// } from "react-native";
// import { useRouter } from "expo-router";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const ADMIN_URL = "http://10.0.2.2:3000/api/admin";
// const DEVICE_URL = "http://10.0.2.2:3000/api/devices";

// export default function AdminDashboard() {
//     const router = useRouter();

//     // Auth states
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [isSignup, setIsSignup] = useState(false);

//     // Admin info
//     const [adminName, setAdminName] = useState("");
//     const [shopName, setShopName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [token, setToken] = useState(null);

//     // Device inputs
//     const [imei, setImei] = useState("");
//     const [owner, setOwner] = useState("");

//     // Toggle between signup and login
//     const toggleAuthMode = () => setIsSignup(!isSignup);

//     // ✅ Admin Signup
//     const handleSignup = async () => {
//         if (!adminName || !shopName || !email || !password)
//             return Alert.alert("Error", "All fields are required.");

//         try {
//             const res = await fetch(`${ADMIN_URL}/signup`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ name: adminName, shopName, email, password }),
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 Alert.alert("✅ Signup Successful", "You can now log in.");
//                 setIsSignup(false);
//             } else {
//                 Alert.alert("Error", data.msg || "Signup failed.");
//             }
//         } catch (err) {
//             Alert.alert("Error", "Server not responding.");
//         }
//     };

//     // ✅ Admin Login
//     const handleLogin = async () => {
//         if (!email || !password)
//             return Alert.alert("Error", "Enter both email and password.");

//         try {
//             const res = await fetch(`${ADMIN_URL}/login`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 setIsLoggedIn(true);
//                 setAdminName(data.admin.name);
//                 setShopName(data.admin.shopName);
//                 setToken(data.token);
//                 Alert.alert("✅ Login Successful", `Welcome ${data.admin.name}`);
//             } else {
//                 Alert.alert("Error", data.msg || "Login failed.");
//             }
//         } catch (err) {
//             Alert.alert("Error", "Server not responding.");
//         }
//     };

//     // ✅ Register a new device
//     const handleRegister = async () => {
//         if (!isLoggedIn)
//             return Alert.alert("Error", "Login required first.");
//         if (!imei || !owner)
//             return Alert.alert("Error", "Enter both IMEI and Owner name.");

//         try {
//             const res = await fetch(`${DEVICE_URL}/register`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ imei, owner }),
//             });
//             const data = await res.json();
//             if (res.ok) {
//                 Alert.alert("✅ Device Registered", `${owner}'s device added.`);
//                 setImei("");
//                 setOwner("");
//             } else {
//                 Alert.alert("Error", data.msg || "Failed to register device.");
//             }
//         } catch {
//             Alert.alert("Error", "Server not responding.");
//         }
//     };

//     // ✅ Logout
//     const handleLogout = () => {
//         setIsLoggedIn(false);
//         setAdminName("");
//         setShopName("");
//         setEmail("");
//         setPassword("");
//         setToken(null);
//     };

//     return (
//         <View style={styles.page}>
//             <Navbar />
//             <ScrollView contentContainerStyle={styles.content}>
//                 <Text style={styles.heading}>Admin Dashboard</Text>

//                 {!isLoggedIn ? (
//                     <>
//                         <Text style={styles.sectionTitle}>
//                             {isSignup ? "📝 Admin Signup" : "🔐 Admin Login"}
//                         </Text>

//                         {isSignup && (
//                             <>
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder="Admin Name"
//                                     placeholderTextColor="#888"
//                                     value={adminName}
//                                     onChangeText={setAdminName}
//                                 />
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder="Shop Name"
//                                     placeholderTextColor="#888"
//                                     value={shopName}
//                                     onChangeText={setShopName}
//                                 />
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Email"
//                             placeholderTextColor="#888"
//                             value={email}
//                             onChangeText={setEmail}
//                             autoCapitalize="none"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Password"
//                             placeholderTextColor="#888"
//                             secureTextEntry
//                             value={password}
//                             onChangeText={setPassword}
//                         />

//                         <TouchableOpacity
//                             style={[styles.btn, { backgroundColor: "#f9b700" }]}
//                             onPress={isSignup ? handleSignup : handleLogin}
//                         >
//                             <Text style={[styles.btnText, { color: "#000" }]}>
//                                 {isSignup ? "Sign Up" : "Login"}
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity onPress={toggleAuthMode}>
//                             <Text style={{ color: "#f9b700", marginTop: 10 }}>
//                                 {isSignup
//                                     ? "Already have an account? Login"
//                                     : "New admin? Sign up here"}
//                             </Text>
//                         </TouchableOpacity>
//                     </>
//                 ) : (
//                     <>
//                         <View style={styles.adminInfo}>
//                             <Text style={styles.adminText}>👨‍💼 {adminName}</Text>
//                             <Text style={styles.adminText}>🏬 {shopName}</Text>
//                         </View>

//                         <Text style={styles.sectionTitle}>➕ Register New Customer</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter IMEI"
//                             placeholderTextColor="#888"
//                             value={imei}
//                             onChangeText={setImei}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter Customer Name"
//                             placeholderTextColor="#888"
//                             value={owner}
//                             onChangeText={setOwner}
//                         />

//                         <TouchableOpacity
//                             style={[styles.btn, { backgroundColor: "#f9b700" }]}
//                             onPress={handleRegister}
//                         >
//                             <Text style={[styles.btnText, { color: "#000" }]}>Register</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={[styles.btn, { backgroundColor: "#444", marginTop: 15 }]}
//                             onPress={() => router.push("/src/pages/SoldDevices")}
//                         >
//                             <Text style={styles.btnText}>📱 View Sold Devices →</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={[styles.btn, { backgroundColor: "red", marginTop: 15 }]}
//                             onPress={handleLogout}
//                         >
//                             <Text style={styles.btnText}>Logout</Text>
//                         </TouchableOpacity>
//                     </>
//                 )}
//             </ScrollView>
//             <Footer />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     page: { flex: 1, backgroundColor: "#000" },
//     content: { alignItems: "center", paddingVertical: 30 },
//     heading: {
//         fontSize: 22,
//         color: "#f9b700",
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     adminInfo: {
//         backgroundColor: "#1c1c1c",
//         padding: 15,
//         borderRadius: 10,
//         width: "90%",
//         marginBottom: 15,
//     },
//     adminText: { color: "#fff", fontSize: 15, marginVertical: 2 },
//     sectionTitle: {
//         color: "#f9b700",
//         fontSize: 18,
//         fontWeight: "600",
//         marginTop: 20,
//         marginBottom: 10,
//     },
//     input: {
//         width: "90%",
//         backgroundColor: "#1c1c1c",
//         color: "#fff",
//         borderRadius: 10,
//         padding: 12,
//         fontSize: 16,
//         marginVertical: 6,
//     },
//     btn: {
//         width: "90%",
//         padding: 14,
//         borderRadius: 10,
//         alignItems: "center",
//         marginVertical: 5,
//     },
//     btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
// });

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ADMIN_URL = "http://10.0.2.2:3000/api/admin";
const DEVICE_URL = "http://10.0.2.2:3000/api/devices";

export default function AdminDashboard() {
    const router = useRouter();

    // Auth states
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(true);

    // Admin info
    const [adminName, setAdminName] = useState("");
    const [shopName, setShopName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);

    // Device inputs
    const [imei, setImei] = useState("");
    const [owner, setOwner] = useState("");

    const toggleAuthMode = () => setIsSignup(!isSignup);

    // 🧩 On app start, check if token exists
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const savedToken = await AsyncStorage.getItem("adminToken");
                const savedName = await AsyncStorage.getItem("adminName");
                const savedShop = await AsyncStorage.getItem("adminShop");
                if (savedToken && savedName && savedShop) {
                    setToken(savedToken);
                    setAdminName(savedName);
                    setShopName(savedShop);
                    setIsLoggedIn(true);
                }
            } catch (err) {
                console.log("Token check failed:", err);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // ✅ Signup
    const handleSignup = async () => {
        if (!adminName || !shopName || !email || !password)
            return Alert.alert("Error", "All fields are required.");

        try {
            const res = await fetch(`${ADMIN_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: adminName, shopName, email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                Alert.alert("✅ Signup Successful", "You can now log in.");
                setIsSignup(false);
            } else {
                Alert.alert("Error", data.msg || "Signup failed.");
            }
        } catch {
            Alert.alert("Error", "Server not responding.");
        }
    };

    // ✅ Login
    const handleLogin = async () => {
        if (!email || !password)
            return Alert.alert("Error", "Enter both email and password.");

        try {
            const res = await fetch(`${ADMIN_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                await AsyncStorage.setItem("adminToken", data.token);
                await AsyncStorage.setItem("adminName", data.admin.name);
                await AsyncStorage.setItem("adminShop", data.admin.shopName);

                setToken(data.token);
                setAdminName(data.admin.name);
                setShopName(data.admin.shopName);
                setIsLoggedIn(true);
                Alert.alert("✅ Login Successful", `Welcome ${data.admin.name}`);
            } else {
                Alert.alert("Error", data.msg || "Login failed.");
            }
        } catch {
            Alert.alert("Error", "Server not responding.");
        }
    };

    // ✅ Register a device
    const handleRegister = async () => {
        if (!isLoggedIn)
            return Alert.alert("Error", "Login required first.");
        if (!imei || !owner)
            return Alert.alert("Error", "Enter both IMEI and Owner name.");

        try {
            const res = await fetch(`${DEVICE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ imei, owner }),
            });
            const data = await res.json();
            if (res.ok) {
                Alert.alert("✅ Device Registered", `${owner}'s device added.`);
                setImei("");
                setOwner("");
            } else {
                Alert.alert("Error", data.msg || "Failed to register device.");
            }
        } catch {
            Alert.alert("Error", "Server not responding.");
        }
    };

    // ✅ Logout
    const handleLogout = async () => {
        await AsyncStorage.multiRemove(["adminToken", "adminName", "adminShop"]);
        setIsLoggedIn(false);
        setAdminName("");
        setShopName("");
        setEmail("");
        setPassword("");
        setToken(null);
        Alert.alert("👋 Logged Out", "You have been logged out successfully.");
    };

    if (loading) {
        return (
            <View style={[styles.page, { justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ color: "#f9b700" }}>Checking authentication...</Text>
            </View>
        );
    }

    return (
        <View style={styles.page}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Admin Dashboard</Text>

                {!isLoggedIn ? (
                    <>
                        <Text style={styles.sectionTitle}>
                            {isSignup ? "📝 Admin Signup" : "🔐 Admin Login"}
                        </Text>

                        {isSignup && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Admin Name"
                                    placeholderTextColor="#888"
                                    value={adminName}
                                    onChangeText={setAdminName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Shop Name"
                                    placeholderTextColor="#888"
                                    value={shopName}
                                    onChangeText={setShopName}
                                />
                            </>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#f9b700" }]}
                            onPress={isSignup ? handleSignup : handleLogin}
                        >
                            <Text style={[styles.btnText, { color: "#000" }]}>
                                {isSignup ? "Sign Up" : "Login"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleAuthMode}>
                            <Text style={{ color: "#f9b700", marginTop: 10 }}>
                                {isSignup
                                    ? "Already have an account? Login"
                                    : "New admin? Sign up here"}
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <View style={styles.adminInfo}>
                            <Text style={styles.adminText}>👨‍💼 {adminName}</Text>
                            <Text style={styles.adminText}>🏬 {shopName}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>➕ Register New Customer</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter IMEI"
                            placeholderTextColor="#888"
                            value={imei}
                            onChangeText={setImei}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Customer Name"
                            placeholderTextColor="#888"
                            value={owner}
                            onChangeText={setOwner}
                        />

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#f9b700" }]}
                            onPress={handleRegister}
                        >
                            <Text style={[styles.btnText, { color: "#000" }]}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#444", marginTop: 15 }]}
                            onPress={() => router.push("/src/pages/SoldDevices")}
                        >
                            <Text style={styles.btnText}>📱 View Sold Devices →</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "red", marginTop: 15 }]}
                            onPress={handleLogout}
                        >
                            <Text style={styles.btnText}>Logout</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: "#000" },
    content: { alignItems: "center", paddingVertical: 30 },
    heading: {
        fontSize: 22,
        color: "#f9b700",
        fontWeight: "bold",
        marginBottom: 10,
    },
    adminInfo: {
        backgroundColor: "#1c1c1c",
        padding: 15,
        borderRadius: 10,
        width: "90%",
        marginBottom: 15,
    },
    adminText: { color: "#fff", fontSize: 15, marginVertical: 2 },
    sectionTitle: {
        color: "#f9b700",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        width: "90%",
        backgroundColor: "#1c1c1c",
        color: "#fff",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginVertical: 6,
    },
    btn: {
        width: "90%",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 5,
    },
    btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
