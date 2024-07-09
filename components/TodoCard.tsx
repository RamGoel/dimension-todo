import { useTodoStore } from '@/hooks/useTodos'
import { TodoProps } from '@/types/Todo'
import { AntDesign } from '@expo/vector-icons'
import * as React from 'react'
import { Alert, View } from 'react-native'
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
            backgroundColor: MD3Colors.tertiary50,
        }}
        onPress={() => {
            console.log(props)
        }}
    >
        <Text
            style={{
                color: 'white',
                fontSize: 20,
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
                onPress={() => deleteTodo(props.itemId)}
            />
        </View>
    )
}

const TodoCard = (props: TodoProps) => (
    <Card>
        <View>
            <Card.Title
                title={props.title}
                subtitle={props.description}
                left={(params) => (
                    <LeftContent {...params} title={props.title} />
                )}
                right={(params) => (
                    <RightContent {...params} itemId={props.id} />
                )}
            />
        </View>
    </Card>
)

export default TodoCard
