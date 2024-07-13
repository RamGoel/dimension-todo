import { useReplicache } from '@/hooks/useReplicache'
import { useTodoStore } from '@/hooks/useTodos'
import { extractErrorMessage } from '@/utils/api'
import { borderRadius, COLORS } from '@/utils/styles'
import React, { useEffect, useRef, useState } from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    ToastAndroid,
    View,
} from 'react-native'

import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableRipple,
} from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet'
const AddTodo = ({ listId }: { listId: string }) => {
    const refRBSheet = useRef(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { setState, showAddForm, isLoading } = useTodoStore()
    const rep = useReplicache(listId || '')

    useEffect(() => {
        if (showAddForm) {
            ;(refRBSheet?.current as any).open()
        } else {
            ;(refRBSheet?.current as any).close()
        }
    }, [showAddForm])

    const handleAddTodo = async () => {
        try {
            if (title.length <= 3) {
                return ToastAndroid.show(
                    'Title must be at least 3 characters',
                    ToastAndroid.SHORT
                )
            }
            setState({ isLoading: true })
            await rep.mutate.createTodo({ title, description })
            setTitle('')
            setDescription('')
            setState({ showAddForm: false, isLoading: false })
        } catch (e) {
            console.log(e)
            ToastAndroid.show(extractErrorMessage(e), ToastAndroid.SHORT)
            setState({ isLoading: false })
        }
    }
    return (
        <KeyboardAvoidingView>
            <RBSheet
                ref={refRBSheet}
                onClose={() => {
                    setState({ showAddForm: false })
                }}
                height={400}
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

                    <TouchableRipple
                        style={{
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: title
                                ? COLORS.quaternary
                                : COLORS.whiteLight,
                            borderRadius: borderRadius,
                        }}
                        disabled={!title}
                        onPress={handleAddTodo}
                    >
                        {isLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontWeight: 'bold',
                                }}
                            >
                                Create
                            </Text>
                        )}
                    </TouchableRipple>
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
