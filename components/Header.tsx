import { useTodoStore } from '@/hooks/useTodos'
import { COLORS } from '@/utils/styles'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, TouchableRipple } from 'react-native-paper'

const Header = () => {
    const { setState } = useTodoStore()
    return (
        <Appbar style={styles.container}>
            <View>
                <Text
                    style={{
                        fontSize: 17,
                        color: COLORS.white,
                    }}
                >
                    Hi, Ram
                </Text>
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: COLORS.white,
                    }}
                >
                    Be Productive Today
                </Text>
            </View>

            <View style={styles.actionBox}>
                <TouchableRipple
                    onPress={() => {
                        setState({ showAddForm: true })
                    }}
                    style={styles.iconBox}
                >
                    <AntDesign size={22} color={COLORS.white} name="plus" />
                </TouchableRipple>
                <TouchableRipple
                    onPress={() => {
                        setState({ showAddForm: true })
                    }}
                    style={styles.iconBox}
                >
                    <AntDesign size={22} color={COLORS.white} name="setting" />
                </TouchableRipple>
            </View>
        </Appbar>
    )
}

export default Header

const styles = StyleSheet.create({
    iconBox: {
        alignItems: 'flex-end',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'transparent',
        marginTop: 50,
        marginBottom: -15,
    },
    actionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        flex: 1,
        justifyContent: 'flex-end',
    },
})
