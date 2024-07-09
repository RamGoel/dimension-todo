export interface TodoProps {
    id: number | string
    type: 'task' | 'subtask'
    title: string
    description: string
    completed: boolean
    parentId: null | string
}
