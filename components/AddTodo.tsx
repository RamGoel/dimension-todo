import { useAddTodoStore } from '@/hooks/useAddTodo'
import { useTodoStore } from '@/hooks/useTodos'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet'
const AddTodo = () => {
    const refRBSheet = useRef(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { showForm, setState } = useAddTodoStore()
    const { setState: setTodoState, todos } = useTodoStore()

    useEffect(() => {
        if (showForm) {
            ;(refRBSheet?.current as any).open()
        } else {
            ;(refRBSheet?.current as any).close()
        }
    }, [showForm])

    const handleAddTodo = () => {
        setTodoState({
            todos: [
                {
                    title: title,
                    description: description,
                    completed: false,
                    id: todos.length + 1,
                    parentId: null,
                    type: 'task',
                },
                ...todos,
            ],
        })
        setTitle('')
        setDescription('')
        setState({ showForm: false })
    }
    return (
        <KeyboardAvoidingView>
            <RBSheet
                ref={refRBSheet}
                onClose={() => {
                    setState({ showForm: false, todoData: null })
                }}
                height={300}
                closeOnPressMask
                customStyles={{
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: true,
                }}
            >
                <View style={{ padding: 20, flexDirection: 'column', gap: 20 }}>
                    <Text variant="headlineSmall">Add a Todo</Text>

                    <TextInput
                        label="Title"
                        style={{
                            borderColor: '#D3D3D3',
                        }}
                        placeholderTextColor={'#D3D3D3'}
                        mode="outlined"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        label="Description"
                        style={{
                            borderColor: '#D3D3D3',
                        }}
                        mode="outlined"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <Button
                        mode="contained"
                        style={{
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        disabled={!title || !description}
                        onPress={handleAddTodo}
                    >
                        Create
                    </Button>
                </View>
            </RBSheet>
        </KeyboardAvoidingView>
    )
}

export default AddTodo

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
