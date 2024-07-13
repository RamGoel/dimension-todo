import { useTodoStore } from '@/hooks/useTodos'
import { borderRadius, COLORS } from '@/utils/styles'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'

const TodoSearchBar = () => {
    const { query, setState } = useTodoStore()

    return (
        <Searchbar
            mode="bar"
            style={styles.container}
            iconColor={COLORS.whiteLight}
            inputStyle={styles.input}
            placeholderTextColor={COLORS.whiteLight}
            placeholder="Search"
            onChangeText={(text: string) => setState({ query: text })}
            value={query}
            clearIcon={() => {
                return (
                    <AntDesign
                        name="close"
                        size={18}
                        color={COLORS.whiteLight}
                    />
                )
            }}
        />
    )
}

export default TodoSearchBar

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        color: COLORS.white,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: borderRadius,
    },
    input: {
        minHeight: 0,
        color: COLORS.white,
    },
})
