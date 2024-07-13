import { listTodos, useReplicache } from '@/hooks/useReplicache'
import { TodoProps } from '@/types/Todo'
import { COLORS } from '@/utils/styles'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSubscribe } from 'replicache-react'
import TodoCard from './TodoCard'
const TodoList = ({
    type = 'pending',
    listId,
}: {
    type: 'pending' | 'completed'
    listId: string
}) => {
    const rep = useReplicache(listId)

    const todos = useSubscribe(rep, listTodos, [], [rep])
    todos.sort((a: any, b: any) => a.created - b.created)

    return (
        <View style={styles.container}>
            <View style={styles.headers}>
                {type === 'pending' ? (
                    <View
                        style={{
                            ...styles.statusMark,
                            backgroundColor: COLORS.quaternary,
                        }}
                    ></View>
                ) : (
                    <View
                        style={{
                            ...styles.statusMark,
                            backgroundColor: 'green',
                        }}
                    ></View>
                )}
                <Text variant="titleMedium" style={styles.title}>
                    {type === 'pending' ? 'Pending' : 'Completed'} Tasks{' '}
                </Text>
            </View>

            {todos?.length ? (
                todos?.map((item: TodoProps) => {
                    return (
                        <TodoCard listId={listId} key={item.id} todo={item} />
                    )
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
    headers: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
    },
    statusMark: {
        width: 10,
        height: 10,
        marginTop: -8,
        borderRadius: 100,
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
