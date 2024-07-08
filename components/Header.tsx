import { useTodoStore } from '@/hooks/useTodos'
import { CONSTANTS } from '@/utils/constants'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

const Header = () => {
    const { setState } = useTodoStore()
    const _handleSearch = () => {
        setState({
            showSearch: true,
        })
    }

    const _handleMore = () => console.log('Shown more')
    return (
        <Appbar.Header>
            <Appbar.Content title={CONSTANTS.appName} />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    )
}

export default Header

const styles = StyleSheet.create({})
