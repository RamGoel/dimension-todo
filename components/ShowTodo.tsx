import { useTodoStore } from '@/hooks/useTodos'
import { borderRadius, COLORS } from '@/utils/styles'
import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Text, TextInput, TouchableRipple } from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet'
const ShowTodo = () => {
    const refRBSheet = useRef(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { setState, clickedTodo, updateTodo } = useTodoStore()
    const [mode, setMode] = useState('view')

    useEffect(() => {
        if (clickedTodo) {
            ;(refRBSheet?.current as any).open()
        } else {
            ;(refRBSheet?.current as any).close()
        }
    }, [clickedTodo])

    return (
        <KeyboardAvoidingView>
            <RBSheet
                ref={refRBSheet}
                onClose={() => {
                    setState({ showAddForm: false })
                }}
                openDuration={300}
                closeOnPressMask
                height={clickedTodo?.completed ? 320 : 400}
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
                <View
                    style={{
                        padding: 20,
                        flexDirection: 'column',
                        gap: 20,
                    }}
                >
                    {mode === 'view' ? (
                        <View style={{ gap: 6 }}>
                            <Text
                                style={{
                                    color: COLORS.whiteLight,
                                    fontSize: 15,
                                }}
                            >
                                Title
                            </Text>
                            <Text style={{ color: COLORS.white, fontSize: 17 }}>
                                {clickedTodo?.title}
                            </Text>
                        </View>
                    ) : (
                        <TextInput
                            style={{
                                backgroundColor: 'transparent',
                                color: COLORS.white,
                                borderRadius: 20,
                            }}
                            mode="outlined"
                            placeholder="Title"
                            textColor={COLORS.white}
                            outlineColor={COLORS.whiteLight}
                            placeholderTextColor={COLORS.whiteLight}
                            activeOutlineColor={COLORS.whiteLight}
                            value={title}
                            onChangeText={setTitle}
                        />
                    )}

                    {mode === 'view' ? (
                        <View style={{ gap: 6 }}>
                            <Text
                                style={{
                                    color: COLORS.whiteLight,
                                    fontSize: 15,
                                }}
                            >
                                Description
                            </Text>
                            <Text style={{ color: COLORS.white, fontSize: 17 }}>
                                {clickedTodo?.description}
                            </Text>
                        </View>
                    ) : (
                        <TextInput
                            style={{
                                backgroundColor: 'transparent',
                                color: COLORS.white,
                                borderRadius: 20,
                                height: 140,
                                textAlignVertical: 'top',
                            }}
                            textColor={COLORS.white}
                            mode="outlined"
                            placeholder="Description"
                            outlineColor={COLORS.whiteLight}
                            placeholderTextColor={COLORS.whiteLight}
                            activeOutlineColor={COLORS.whiteLight}
                            value={description}
                            multiline
                            onChangeText={setDescription}
                        />
                    )}

                    {mode === 'view' ? (
                        <View style={{ gap: 6 }}>
                            <Text
                                style={{
                                    color: COLORS.whiteLight,
                                    fontSize: 15,
                                }}
                            >
                                Status
                            </Text>
                            <Text style={{ color: COLORS.white, fontSize: 17 }}>
                                {clickedTodo?.completed
                                    ? 'Completed'
                                    : 'Not Completed'}
                            </Text>
                        </View>
                    ) : null}

                    {mode === 'edit' ? (
                        <TouchableRipple
                            style={{
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.quaternary,
                                borderRadius: borderRadius,
                            }}
                            onPress={() => {
                                updateTodo(clickedTodo?.id || 0, {
                                    title,
                                    description,
                                })
                                setTitle('')
                                setMode('view')
                                setDescription('')
                                setState({ clickedTodo: null })
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontWeight: 'bold',
                                }}
                            >
                                Save <AntDesign name="save" size={15} />
                            </Text>
                        </TouchableRipple>
                    ) : null}

                    {mode === 'view' ? (
                        clickedTodo?.completed ? null : (
                            <TouchableRipple
                                style={{
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.quaternary,
                                    borderRadius: borderRadius,
                                }}
                                onPress={() => {
                                    setTitle(clickedTodo?.title || '')
                                    setDescription(
                                        clickedTodo?.description || ''
                                    )
                                    setMode('edit')
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Edit Details{' '}
                                    <AntDesign name="edit" size={15} />
                                </Text>
                            </TouchableRipple>
                        )
                    ) : null}
                </View>
            </RBSheet>
        </KeyboardAvoidingView>
    )
}

export default ShowTodo

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
