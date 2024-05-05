import React, { Fragment } from "react";
import { GetChar as getChar } from "anime-character-random";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { XMarkIcon, HeartIcon } from "react-native-heroicons/solid";
import { useState, useLayoutEffect, useEffect } from "react";
import { theme } from "../src/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {

    const [pull, setPull] = useState(0);
    const [cooldown, setCooldown] = useState(10);
    const [loading, setLoading] = useState(false);
    const [currentCharacter, setCurrentCharacter] = useState(null);

    const pullLever = async () => {
        try {
            // Check if we have a cooldown
            // console.log(await AsyncStorage.getItem("likedCharacters"));
            const cooldown = await AsyncStorage.getItem("cooldown");
            if (cooldown) {
                const now = new Date().toISOString();
                if (new Date(cooldown) > new Date(now)) {
                    return;
                }
            }

            if (pull === 10) {
                // We set the cooldown to 10 minutes
                const cooldown = new Date(new Date().getTime() + 10 * 60000).toISOString();
                await AsyncStorage.setItem("cooldown", cooldown);
                setPull(0);
                return;
            }

            setLoading(true);
            const character = await getChar();
            if (!character) {
                return pullLever();
            }
            setCurrentCharacter(character);
            setPull(pull + 1);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const likeCharacter = async () => {
        try {
            const character = {
                name: currentCharacter.CharacterName,
                image: currentCharacter.CharacterImage,
                anime: currentCharacter.AnimeName,
                obtained_at: new Date().toISOString(),
            };

            // Get the count of liked characters
            const likedCharacters = await AsyncStorage.getItem("likedCharacters");
            const count = likedCharacters ? JSON.parse(likedCharacters).length : 0;

            const newLikedCharacters = likedCharacters ? JSON.parse(likedCharacters) : [];

            // Store the character
            await AsyncStorage.setItem(`character-${count}`, JSON.stringify(character));
            await AsyncStorage.setItem("likedCharacters", JSON.stringify([...newLikedCharacters, count.toString()]));

            pullLever();

        } catch (error) {
            console.log(error);
        }
    }

    useLayoutEffect(() => {
        const cd = async () => {
            try {
                // clear liked characters
                const cooldown = await AsyncStorage.getItem("cooldown");
                if (cooldown) {
                    const now = new Date().toISOString();
                    // calculate the difference in seconds
                    const diff = Math.floor((new Date(cooldown).getTime() - new Date(now).getTime()) / 1000);
                    if (diff > 0) {
                        setCooldown(diff);
                    } else {
                        setCooldown(null);
                    }
                } else {
                    setCooldown(null);
                }

            } catch (error) {
                console.log(error);
            }
        }
        setInterval(cd, 1000);
    }, []);

    return (
        <View style={styles.container}>
            {pull === 0 ? (
                <Fragment>
                    {!cooldown ? (
                        <TouchableWithoutFeedback
                            disabled={loading || cooldown > 0}
                            onPress={pullLever}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>{!loading ? "Probar suerte" : "Cargando personaje"}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : (
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Espera {cooldown} segundos</Text>
                        </View>
                    )}
                </Fragment>
            ) : currentCharacter && (
                <View style={styles.cardContainer} key={pull}>
                    <Text style={styles.secondaryText}>{pull}/10</Text>
                    <View style={styles.card}>
                        <View style={{ flex: 1, flexGrow: 1 }}>
                            {!loading && <Image
                                source={{ uri: currentCharacter.CharacterImage }}
                                style={{ height: "100%", width: "100%" }}
                            />}
                        </View>
                        <View style={{ paddingHorizontal: 10, height: 60, width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: theme.color.Surface1 }}>
                            <Text numberOfLines={1} style={styles.buttonText}>{!loading && currentCharacter.CharacterName}</Text>
                            <Text numberOfLines={2} style={{ textAlign: "center", color: theme.color.Subtext0, fontFamily: theme.font.medium, fontSize: 14, }}>{!loading && currentCharacter.AnimeName}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 40, justifyContent: "center" }}>
                        <TouchableWithoutFeedback
                            disabled={loading}
                            onPress={pullLever}>
                            <View style={styles.buttons}>
                                <XMarkIcon color={theme.color.Red} size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            disabled={loading}
                            onPress={likeCharacter}>
                            <View style={styles.buttons}>
                                <HeartIcon color={theme.color.Green} size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )
            }
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color.Base,
        flexGrow: 1,
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        gap: 40,
        alignItems: "center",
        flex: 1,
        width: "100%",
        padding: 40,
    },
    button: {
        backgroundColor: theme.color.Crust,
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        width: 200,
        borderRadius: 100,
        overflow: "hidden",
    },
    buttonText: {
        color: theme.color.Text,
        fontFamily: theme.font.medium,
    },
    secondaryText: {
        color: theme.color.Subtext0,
        fontFamily: theme.font.medium,
        fontSize: 14,
    },
    card: {
        flex: 1,
        width: "100%",
        backgroundColor: theme.color.Surface0,
        borderRadius: 5,
        overflow: "hidden",
    },
    buttons: {
        height: 40,
        width: 40,
        backgroundColor: theme.color.Crust,
        borderRadius: 5,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    }
});