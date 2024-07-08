import { create } from 'zustand'

interface AddTodoStoreProps {
    showForm: boolean
    setState: (state: Partial<AddTodoStoreProps>) => void
    todoData: {
        title: string
        description: string
        status: 'completed' | 'incomplete'
    }
}

export const useAddTodoStore = create<AddTodoStoreProps>()((set, get) => ({
    showForm: false,
    setState: (state) => set({ ...get(), ...state }),
    todoData: {
        title: '',
        description: '',
        status: 'incomplete',
    },
}))
