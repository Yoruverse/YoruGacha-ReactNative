import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "../styles/theme";
import Constants from "expo-constants";

export const Navbar = () => (
    <View style={styles.container}>
        <Image source={require("../../assets/icon.png")} style={{ width: 40, height: 40 }} />
        <View style={styles.group}>
            <Text style={styles.h1}>YoruGacha</Text>
            <Text style={styles.text}>v1.0.1</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        height: 64,
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        gap: 10
    },
    group: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 5
    },
    h1: {
        fontSize: 20,
        color: theme.color.Text,
        textTransform: "uppercase",
        fontWeight: "600", // "bold
        fontFamily: theme.font.bold,
    },
    text: {
        color: theme.color.Subtext0,
        fontFamily: theme.font.regular
    }
});