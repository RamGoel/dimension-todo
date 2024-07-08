import { useTodoStore } from '@/hooks/useTodos'
import { DATA } from '@/utils/data'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import TodoCard from './TodoCard'

const TodoList = () => {
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
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
            {todos.map((item) => {
                return <TodoCard key={item.id} {...item} />
            })}
        </ScrollView>
    )
}

export default TodoList
