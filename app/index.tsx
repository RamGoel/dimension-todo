import AddTodo from '@/components/AddTodo'
import Header from '@/components/Header'
import TaskProgress from '@/components/TaskProgress'
import TodoList from '@/components/TodoList'
import TodoSearchBar from '@/components/TodoSearchBar'
import { useTodoStore } from '@/hooks/useTodos'
import { COLORS } from '@/utils/styles'
import React from 'react'
import { ScrollView } from 'react-native'

export default function HomeScreen() {
    const { showSearch } = useTodoStore()
    return (
        <ScrollView
            contentContainerStyle={{
                backgroundColor: COLORS.primary,
                paddingHorizontal: 20,
                gap: 20,
                flexGrow: 1,
            }}
        >
            <Header />
            <TodoSearchBar />
            <TaskProgress />
            <TodoList type="pending" />
            <TodoList type="completed" />
            <AddTodo />
        </ScrollView>
    )
}
