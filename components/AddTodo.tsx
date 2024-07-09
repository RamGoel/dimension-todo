import { useAddTodoStore } from '@/hooks/useAddTodo'
import { useTodoStore } from '@/hooks/useTodos'
import { COLORS } from '@/utils/styles'
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
                height={320}
                openDuration={300}
                closeOnPressMask
                draggable
                customStyles={{
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.primary,
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
                    <Text variant="titleLarge" style={{ color: COLORS.white }}>
                        Add a Todo
                    </Text>

                    <TextInput
                        label="Title"
                        style={{
                            backgroundColor: COLORS.secondary,
                            color: COLORS.white,
                        }}
                        mode="outlined"
                        textColor={COLORS.white}
                        outlineColor={COLORS.whiteLight}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        label="Description"
                        style={{
                            backgroundColor: COLORS.secondary,
                            color: COLORS.white,
                        }}
                        textColor={COLORS.white}
                        mode="outlined"
                        outlineColor={COLORS.whiteLight}
                        value={description}
                        onChangeText={setDescription}
                    />

                    <Button
                        mode="contained"
                        style={{
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.quaternary,
                        }}
                        labelStyle={{ color: COLORS.white }}
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
