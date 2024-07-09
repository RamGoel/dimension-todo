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
        <Appbar.Header>
            <Searchbar
                mode="bar"
                style={{
                    flex: 1,
                    marginHorizontal: 10,
                    alignItems: 'center',
                    height: 45,
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
                inputStyle={{
                    minHeight: 0,
                }}
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
