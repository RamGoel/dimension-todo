import React from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'

const KeyboardAvoider = ({ children }: { children: any }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )
}

export default KeyboardAvoider

const styles = StyleSheet.create({})
