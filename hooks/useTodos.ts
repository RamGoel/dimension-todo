import { TodoProps } from '@/types/Todo'
import { DATA } from '@/utils/data'
import { create } from 'zustand'

interface TodoStoreProps {
    todos: TodoProps[]
    query: string
    showSearch: boolean
    setState: (state: Partial<TodoStoreProps>) => void
    sampleTodosData: TodoProps[]
}

export const useTodoStore = create<TodoStoreProps>()((set, get) => ({
    todos: DATA,
    showSearch: false,
    query: '',
    setState: (state) => set({ ...get(), ...state }),
    sampleTodosData: DATA,
}))
