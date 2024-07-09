import { useTodoStore } from '@/hooks/useTodos'
import { DATA } from '@/utils/data'
import { COLORS } from '@/utils/styles'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import TodoCard from './TodoCard'

const TodoList = ({ type = 'pending' }: { type: 'pending' | 'completed' }) => {
    const { todos, query, setState } = useTodoStore()

    useEffect(() => {
        if (query === '') {
            setState({
                todos: DATA,
            })
        } else {
            setState({
                todos: DATA.filter((item) =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                ),
            })
        }
    }, [query])

    let dataToRender = todos.filter((item) => {
        if (type === 'pending') {
            return item.completed === false
        }
        return item.completed
    })

    return (
        <View style={styles.container}>
            <Text variant="titleMedium" style={styles.title}>
                {type === 'pending' ? 'Pending' : 'Completed'} Tasks
            </Text>
            {dataToRender.length ? (
                dataToRender.map((item) => {
                    return <TodoCard key={item.id} {...item} />
                })
            ) : (
                <Text style={styles.emptyText}>
                    {type === 'pending'
                        ? 'No pending tasks'
                        : 'No completed tasks'}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        backgroundColor: 'transparent',
    },
    title: {
        color: COLORS.white,
        marginBottom: 10,
    },
    emptyText: {
        color: COLORS.whiteLight,
        textAlign: 'center',
    },
})
export default TodoList
