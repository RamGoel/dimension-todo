import { COLORS } from '@/utils/styles'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const AppLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={30} color={COLORS.white} />
        </View>
    )
}

export default AppLoader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
})
