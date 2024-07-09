import { useAddTodoStore } from '@/hooks/useAddTodo'
import { COLORS } from '@/utils/styles'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, TouchableRipple } from 'react-native-paper'

const Header = () => {
    const { showForm, setState } = useAddTodoStore()
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

            <TouchableRipple
                onPress={() => {
                    setState({ showForm: true })
                }}
                style={styles.iconBox}
            >
                <AntDesign size={22} color={COLORS.white} name="plus" />
            </TouchableRipple>
        </Appbar>
    )
}

export default Header

const styles = StyleSheet.create({
    iconBox: {
        flex: 1,
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
})
