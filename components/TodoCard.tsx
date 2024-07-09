import { useTodoStore } from '@/hooks/useTodos'
import { TodoProps } from '@/types/Todo'
import { COLORS } from '@/utils/styles'
import { AntDesign } from '@expo/vector-icons'
import * as React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import {
    Card,
    IconButton,
    MD3Colors,
    Text,
    TouchableRipple,
} from 'react-native-paper'

const LeftContent = (props: any) => (
    <TouchableRipple
        style={{
            height: props.size,
            width: props.size,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 500,
            backgroundColor: COLORS.quaternary,
        }}
        onPress={() => {
            console.log(props)
        }}
    >
        <Text
            style={{
                color: COLORS.white,
                fontSize: 17,
                fontWeight: 'bold',
            }}
        >
            {props.title[0]}
        </Text>
    </TouchableRipple>
)
const RightContent = (props: any) => {
    const { setState, todos } = useTodoStore()
    const deleteTodo = (id: string | number) => {
        Alert.alert(
            'Delete Todo',
            'Are you sure you want to delete this todo?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        setState({
                            todos: todos.filter((todo) => todo.id !== id),
                        })
                    },
                    style: 'destructive',
                },
            ]
        )
    }

    const markTodoComplete = (id: string | number) => {
        setState({
            todos: todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo
            }),
        })
    }
    return (
        <View
            style={{
                width: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <AntDesign
                name="delete"
                color={MD3Colors.error50}
                size={20}
                borderless
                onPress={() => deleteTodo(props.itemId)}
            />
            <IconButton
                icon="check"
                iconColor="green"
                size={20}
                borderless
                onPress={() => markTodoComplete(props.itemId)}
            />
        </View>
    )
}

const TodoCard = (props: TodoProps) => (
    <Card style={styles.container} elevation={0}>
        <Card.Title
            title={props.title}
            subtitle={props.description}
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
            left={(params) => <LeftContent {...params} title={props.title} />}
            right={(params) => <RightContent {...params} itemId={props.id} />}
        />
    </Card>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
    },
    title: {
        fontWeight: 'semibold',
        color: COLORS.white,
        fontSize: 15,
    },
    subtitle: {
        marginTop: -5,
        color: COLORS.whiteLight,
        fontSize: 13,
    },
})

export default TodoCard
