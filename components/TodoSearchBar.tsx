import { useTodoStore } from '@/hooks/useTodos'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, Searchbar } from 'react-native-paper'

const TodoSearchBar = () => {
    const { query, setState } = useTodoStore()

    const handleClose = () => {
        setState({ showSearch: false })
    }
    return (
        <Appbar.Header style={{ padding: 5 }}>
            <Searchbar
                mode="bar"
                style={{ height: 40, flex: 1, marginHorizontal: 10 }}
                placeholder="Search"
                onChangeText={(text: string) => setState({ query: text })}
                value={query}
                right={() => {
                    return <Appbar.Action icon="close" onPress={handleClose} />
                }}
            />
        </Appbar.Header>
    )
}

export default TodoSearchBar

const styles = StyleSheet.create({})
