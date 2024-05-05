import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback } from 'react-native'
import { theme } from '../src/styles/theme'
import { useState, useLayoutEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { XMarkIcon } from 'react-native-heroicons/solid'

export default function Collection() {
    const [collection, setCollection] = useState([])

    const removeCharacter = async (character) => {
        try {
            let dataList: string | any[] = (await AsyncStorage.getItem('likedCharacters')) ?? '[]';
            dataList = JSON.parse(dataList);
            dataList = Array.isArray(dataList) ? dataList.filter((number) => number !== character.number) : [];
            await AsyncStorage.setItem('likedCharacters', JSON.stringify(dataList));
            await AsyncStorage.removeItem(`character-${character.number}`);
            setCollection(collection.filter((item) => item.number !== character.number));
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        const fetchCollection = async () => {
            try {
                let dataList = (await AsyncStorage.getItem('likedCharacters')) ?? '[]';
                dataList = JSON.parse(dataList);

                let collection = [];
                for (let number of dataList) {
                    let character: string | Object = {} = await AsyncStorage.getItem(`character-${number}`);
                    character = JSON.parse(character as string);
                    collection.push({ ...character as Object, number });
                }
                setCollection(collection);
            } catch (error) {
                console.log(error)
            }
        }
        fetchCollection()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1, width: "100%" }}
                data={collection}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                        <View
                            style={{ gap: 5, flex: 1 }}
                        >
                            <Text style={styles.text}>{item.name}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subtext}>{item.anime}</Text>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => removeCharacter(item)}>
                            <View
                                style={{ gap: 5, padding: 10, alignItems: "center", justifyContent: "center" }}
                            >
                                <XMarkIcon color={theme.color.Red} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )
                }
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color.Base,
        flexGrow: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    item: {
        flexDirection: "row",
        backgroundColor: theme.color.Surface0,
        flex: 1,
        width: "100%",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        gap: 10,
    },
    text: {
        color: theme.color.Text,
        fontFamily: theme.font.medium,
    },
    subtext: {
        color: theme.color.Subtext0,
        fontFamily: theme.font.medium,
        flex: 1,
    }
})