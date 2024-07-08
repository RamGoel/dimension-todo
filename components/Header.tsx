import { useAddTodoStore } from '@/hooks/useAddTodo'
import { useTodoStore } from '@/hooks/useTodos'
import { CONSTANTS } from '@/utils/constants'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

const Header = () => {
    const { setState: setTodoState } = useTodoStore()
    const { setState } = useAddTodoStore()
    const _handleSearch = () => {
        setTodoState({
            showSearch: true,
        })
    }

    const _handleMore = () => {
        setState({
            showForm: true,
        })
    }
    return (
        <Appbar.Header>
            <Appbar.Content title={CONSTANTS.appName} />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="plus" onPress={_handleMore} />
        </Appbar.Header>
    )
}

export default Header

const styles = StyleSheet.create({})
