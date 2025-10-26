// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     FlatList,
//     Alert,
// } from "react-native";
// import { useRouter } from "expo-router";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const BASE_URL = "http://10.0.2.2:3000/api/devices";

// export default function SoldDevices() {
//     const router = useRouter();
//     const [devices, setDevices] = useState([]);

//     const fetchDevices = async () => {
//         try {
//             const res = await fetch(BASE_URL);
//             const data = await res.json();
//             setDevices(data);
//         } catch {
//             Alert.alert("Error", "Cannot fetch devices. Check backend connection.");
//         }
//     };

//     useEffect(() => {
//         fetchDevices();
//     }, []);

//     const handleLock = async (imei) => {
//         try {
//             const res = await fetch(`${BASE_URL}/lock/${imei}`, { method: "PATCH" });
//             const data = await res.json();
//             if (res.ok) {
//                 Alert.alert("🔒 Locked", `Device ${imei} locked. OTP: ${data.otp}`);
//                 fetchDevices();
//             } else Alert.alert("Error", data.msg || "Lock failed.");
//         } catch {
//             Alert.alert("Error", "Server not responding.");
//         }
//     };

//     const handleUnlock = async (imei) => {
//         try {
//             const res = await fetch(`${BASE_URL}/unlock/${imei}`, { method: "PATCH" });
//             const data = await res.json();
//             if (res.ok) {
//                 Alert.alert("✅ Unlocked", `Device ${imei} is now active.`);
//                 fetchDevices();
//             } else Alert.alert("Error", data.msg || "Unlock failed.");
//         } catch {
//             Alert.alert("Error", "Server not responding.");
//         }
//     };

//     const renderDevice = ({ item }) => (
//         <View style={styles.deviceCard}>
//             <Text style={styles.label}>IMEI: {item.imei}</Text>
//             <Text style={styles.label}>Owner: {item.owner}</Text>
//             <Text
//                 style={[
//                     styles.status,
//                     { color: item.status === "locked" ? "red" : "#00ff7f" },
//                 ]}
//             >
//                 {item.status === "locked" ? "🔒 Locked" : "✅ Active"}
//             </Text>
//             <View style={styles.actions}>
//                 <TouchableOpacity
//                     style={[styles.btn, { backgroundColor: "red" }]}
//                     onPress={() => handleLock(item.imei)}
//                 >
//                     <Text style={styles.btnText}>Lock</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.btn, { backgroundColor: "green" }]}
//                     onPress={() => handleUnlock(item.imei)}
//                 >
//                     <Text style={styles.btnText}>Unlock</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.page}>
//             <Navbar />
//             <Text style={styles.heading}>📱 Sold Devices</Text>
//             {devices.length === 0 ? (
//                 <Text style={{ color: "#888", marginTop: 20 }}>No devices found.</Text>
//             ) : (
//                 <FlatList
//                     data={devices}
//                     renderItem={renderDevice}
//                     keyExtractor={(item) => item.imei}
//                     horizontal={true}
//                     showsHorizontalScrollIndicator={false}
//                 />
//             )}
//             <TouchableOpacity
//                 style={[styles.backBtn, { backgroundColor: "#f9b700" }]}
//                 onPress={() => router.back()}
//             >
//                 <Text style={{ fontWeight: "bold", color: "#000" }}>⬅ Back to Dashboard</Text>
//             </TouchableOpacity>
//             <Footer />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     page: { flex: 1, backgroundColor: "#000", alignItems: "center" },
//     heading: {
//         color: "#f9b700",
//         fontSize: 22,
//         fontWeight: "bold",
//         marginTop: 20,
//         marginBottom: 10,
//     },
//     deviceCard: {
//         backgroundColor: "#1a1a1a",
//         borderRadius: 10,
//         padding: 20,
//         marginHorizontal: 10,
//         width: 260,
//     },
//     label: { color: "#fff", marginBottom: 5 },
//     status: { fontWeight: "bold", marginTop: 5 },
//     actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
//     btn: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8 },
//     btnText: { color: "#fff", fontWeight: "bold" },
//     backBtn: {
//         marginTop: 20,
//         padding: 12,
//         borderRadius: 10,
//         alignItems: "center",
//         width: "80%",
//     },
// });


