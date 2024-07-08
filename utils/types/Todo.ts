export interface TodoProps {
    id: string
    type: 'task' | 'subtask'
    title: string
    description: string
    completed: boolean
    parentId: null | string
}
