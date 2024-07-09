import { useAddTodoStore } from '@/hooks/useAddTodo'
import { useTodoStore } from '@/hooks/useTodos'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Appbar, Text } from 'react-native-paper'

const Header = () => {
    const { setState: setTodoState, showSearch } = useTodoStore()
    const { setState } = useAddTodoStore()
    const _handleSearch = () => {
        setTodoState({
            showSearch: true,
        })
    }

    useEffect(() => {
        if (!showSearch) {
            setTodoState({ query: '' })
        }
    }, [showSearch])

    const _handleMore = () => {
        setState({
            showForm: true,
        })
    }
    return (
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
            <View
                style={{
                    flex: 1,
                    paddingLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <Image
                    style={{ width: 40, height: 40, borderRadius: 500 }}
                    src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                />
                <View>
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        Hi, Ram
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                        Your daily adventure starts now
                    </Text>
                </View>
            </View>
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="plus" onPress={_handleMore} />
        </Appbar.Header>
    )
}

export default Header

const styles = StyleSheet.create({})
