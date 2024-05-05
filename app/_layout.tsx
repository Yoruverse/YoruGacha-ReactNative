import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { useFonts, SpaceGrotesk_400Regular, SpaceGrotesk_700Bold, SpaceGrotesk_500Medium } from '@expo-google-fonts/space-grotesk';
import { useEffect } from 'react';
import { SplashScreen, Slot } from 'expo-router';
import { theme } from '../src/styles/theme';
import { Navbar, Footer } from '../src/components';

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    let [fontsLoaded, fontError] = useFonts({
        SpaceGrotesk_400Regular,
        SpaceGrotesk_500Medium,
        SpaceGrotesk_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    // Prevent rendering until the font has loaded or an error was returned
    if (!fontsLoaded && !fontError) {
        return null;
    }

    // Render the children routes now that all the assets are loaded.

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Navbar />
            <Slot />
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color.Base,
        flex: 1,
    }
});