import Header from '@/components/Header'
import TodoList from '@/components/TodoList'
import TodoSearchBar from '@/components/TodoSearchBar'
import { useTodoStore } from '@/hooks/useTodos'
import React from 'react'
import { View } from 'react-native'

export default function HomeScreen() {
    const { query, setState, showSearch } = useTodoStore()
    return (
        <View className="">
            {showSearch ? <TodoSearchBar /> : <Header />}
            <TodoList />
        </View>
    )
}
