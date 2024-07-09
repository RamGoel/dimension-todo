import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import 'react-native-reanimated'

import React from 'react'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/Montserrat-Regular.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <PaperProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </PaperProvider>
    )
}
