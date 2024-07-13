import AddTodo from '@/components/AddTodo'
import Header from '@/components/Header'
import AppLoader from '@/components/Loader'
import TaskProgress from '@/components/TaskProgress'
import TodoList from '@/components/TodoList'
import TodoSearchBar from '@/components/TodoSearchBar'
import { useTodoStore } from '@/hooks/useTodos'
import { bootCryptoPolyfill } from '@/lib/crypto'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import 'react-native-reanimated'
bootCryptoPolyfill()

export default function RootLayout() {
    const { todos } = useTodoStore()
    if (!todos) {
        return <AppLoader />
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <TodoSearchBar />
            <TaskProgress />
            <TodoList type="pending" listId="pending" />
            <TodoList type="completed" listId="completed" />
            <AddTodo listId="pending" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})
