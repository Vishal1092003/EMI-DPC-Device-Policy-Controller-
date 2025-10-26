import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home({ navigation }) {
    return (
        <View style={styles.page}>
            <Navbar navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to EMI Management System</Text>
                <Text style={styles.desc}>
                    Control, lock, and unlock customer devices safely. A secure solution for your EMI sales.
                </Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate("AdminDashboard")}
                >
                    <Text style={styles.btnText}>Go to Dashboard</Text>
