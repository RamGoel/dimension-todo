import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import {
    configureFonts,
    MD3LightTheme,
    PaperProvider,
} from 'react-native-paper'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import React from 'react'
import { Platform } from 'react-native'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const colorScheme = useColorScheme()
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/Montserrat-Regular.ttf'),
    })

    const fontConfig = {
        default: {
            fontFamily: Platform.select({
                web: 'SpaceMono',
                ios: 'SpaceMono',
                default: 'SpaceMono',
            }),
            fontSize: 18,
        },
        bodyLarge: {
            fontFamily: Platform.select({
                web: 'SpaceMono',
                ios: 'SpaceMono',
                default: 'SpaceMono',
            }),
            fontSize: 17,
        },
        bodyMedium: {
            fontFamily: Platform.select({
                web: 'SpaceMono',
                ios: 'SpaceMono',
                default: 'SpaceMono',
            }),
        },
    }

    const theme = {
        ...MD3LightTheme,
        fonts: configureFonts({ config: fontConfig as any }),
    }

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <PaperProvider theme={theme}>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </ThemeProvider>
        </PaperProvider>
    )
}
