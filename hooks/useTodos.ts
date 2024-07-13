import { axiosRouter } from '@/lib/axios'
import { TodoProps } from '@/types/Todo'
import { extractErrorMessage } from '@/utils/api'
import { ToastAndroid } from 'react-native'
import { create } from 'zustand'

interface TodoStoreProps {
    todos: null | TodoProps[]
    query: string
    isLoading: boolean
    showAddForm: boolean
    showSearch: boolean
    setState: (state: Partial<TodoStoreProps>) => void
    getTodos: (query?: string) => void
    addTodo: (title: string, description: string) => void
    deleteTodo: (todoId: string) => void
    clickedTodo: TodoProps | null
    updateTodo: (todoId: string, newData: Partial<TodoProps>) => void
}

export const useTodoStore = create<TodoStoreProps>()((set, get) => ({
    todos: null,
    showSearch: false,
    clickedTodo: null,
    isLoading: false,
    showAddForm: false,
    query: '',
    setState: (state) => set({ ...get(), ...state }),
    getTodos: (query?: string) => {
        axiosRouter
            .get('/tasks', {
                params: query ? { search: query } : {},
            })
            .then((res) => {
                set({ todos: res.data })
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show(extractErrorMessage(err), ToastAndroid.SHORT)
            })
    },
    addTodo: (title, description) => {
        console.log({ title, description })
        axiosRouter
            .post('/tasks', {
                title,
                description,
            })
            .then((res) => {
                set({
                    todos: [...(get().todos || []), res.data],
                    showAddForm: false,
                })
                ToastAndroid.show('Added', ToastAndroid.BOTTOM)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show(extractErrorMessage(err), ToastAndroid.SHORT)
            })
    },

    deleteTodo: (todoId: string) => {
        axiosRouter
            .delete('/tasks/' + todoId)
            .then((res) => {
                set({
                    todos: get().todos?.filter((todo) => todo.id !== todoId),
                })
                ToastAndroid.show('Deleted', ToastAndroid.BOTTOM)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show(extractErrorMessage(err), ToastAndroid.SHORT)
            })
    },

    updateTodo: (todoId: string, newData: Partial<TodoProps>) => {
        console.log(newData)
        axiosRouter
            .put('/tasks/' + todoId, newData)
            .then((res) => {
                set({
                    todos: get().todos?.map((todo) => {
                        if (todo.id === todoId) {
                            return res.data
                        }
                        return todo
                    }),
                })
                ToastAndroid.show('Updated', ToastAndroid.BOTTOM)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show(extractErrorMessage(err), ToastAndroid.SHORT)
            })
    },
}))
