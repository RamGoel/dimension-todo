import AddTodo from '@/components/AddTodo'
import Header from '@/components/Header'
import TodoList from '@/components/TodoList'
import TodoSearchBar from '@/components/TodoSearchBar'
import { useTodoStore } from '@/hooks/useTodos'
import React from 'react'
import { View } from 'react-native'

export default function HomeScreen() {
    const { showSearch } = useTodoStore()
    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1,
            }}
        >
            {showSearch ? <TodoSearchBar /> : <Header />}
            <TodoList />
            <AddTodo />
        </View>
    )
}
