import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { theme } from "../styles/theme";
import { HomeIcon, UserIcon, Squares2X2Icon } from "react-native-heroicons/solid";
import { Link } from "expo-router";

export const Footer = () => (
    <View style={styles.container}>
        <Link href={"/collection"}>
            <Squares2X2Icon color={theme.color.Subtext0} size={24} />
        </Link>
        <Link href={"/"}>
            <HomeIcon color={theme.color.Subtext0} size={24} />
        </Link>
        <Link href={"/profile"}>
            <UserIcon color={theme.color.Subtext0} size={24} />
        </Link>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color.Mantle,
        height: 64,
        paddingHorizontal: 40,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
        color: theme.color.Subtext0,
        fontFamily: theme.font.regular
    }
});