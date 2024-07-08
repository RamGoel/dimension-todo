import { useAddTodoStore } from '@/hooks/useAddTodo'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet'

const AddTodo = () => {
    const refRBSheet = useRef(null)
    const { showForm, setState, todoData } = useAddTodoStore()

    useEffect(() => {
        if (showForm) {
            ;(refRBSheet?.current as any).open()
        } else {
            ;(refRBSheet?.current as any).close()
        }
    }, [showForm])
    return (
        <RBSheet
            ref={refRBSheet}
            onClose={() => {
                setState({ showForm: false })
            }}
            height={350}
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
                enabled: false,
            }}
        >
            <View style={{ padding: 20, flexDirection: 'column', gap: 20 }}>
                <Text variant="headlineSmall">Add a Todo</Text>

                <TextInput
                    label="Title"
                    value={todoData.title}
                    onChangeText={(text) =>
                        setState({
                            todoData: {
                                ...todoData,
                                title: text,
                            },
                        })
                    }
                />
                <TextInput
                    label="Description"
                    value={todoData.description}
                    onChangeText={(text) =>
                        setState({
                            todoData: {
                                ...todoData,
                                description: text,
                            },
                        })
                    }
                />

                <Button
                    mode="contained"
                    onPress={() => setState({ showForm: false })}
                >
                    Create
                </Button>
            </View>
        </RBSheet>
    )
}

export default AddTodo

const styles = StyleSheet.create({})
