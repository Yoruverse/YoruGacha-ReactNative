import React from 'react'
import { Alert, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { theme } from '../src/styles/theme'

export default function Profile() {

    const deleteAllData = async () => {
        await AsyncStorage.clear();
        Alert.alert('Datos borrados', 'Todos los datos han sido borrados');
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={deleteAllData}>
                <View style={styles.button}>
                    <Text style={styles.text}>Borrar todos los datos</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        alignItems: 'center',
    },
    button: {
        backgroundColor: theme.color.Crust,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 20,
        borderColor: theme.color.Red,
        borderWidth: 1,
    },
    text: {
        color: theme.color.Red,
        fontFamily: theme.font.medium,
    },
})