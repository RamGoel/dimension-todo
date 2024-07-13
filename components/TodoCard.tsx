import { useReplicache } from '@/hooks/useReplicache'
import { useTodoStore } from '@/hooks/useTodos'
import { TodoProps } from '@/types/Todo'
import { COLORS } from '@/utils/styles'
import { AntDesign, EvilIcons } from '@expo/vector-icons'
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
    const { updateTodo, deleteTodo } = useTodoStore()
    const rep = useReplicache(props.listId)
    const handleDelete = (id: string) => {
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
                        rep.mutate.deleteTodo(id)
                    },
                    style: 'destructive',
                },
            ]
        )
    }

    const markTodoComplete = (id: number) => {
        // updateTodo(id, { completed: true })
    }
    return (
        <View
            style={{
                width: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
            }}
        >
            {props.completed === false ? (
                <AntDesign
                    name="delete"
                    color={MD3Colors.error50}
                    size={20}
                    borderless
                    onPress={() => handleDelete(props.itemId)}
                />
            ) : (
                <EvilIcons
                    name="undo"
                    color={COLORS.white}
                    size={30}
                    borderless
                    onPress={() => {
                        updateTodo(props.itemId, { completed: false })
                    }}
                />
            )}
            {props.completed === false ? (
                <IconButton
                    icon="check"
                    iconColor="green"
                    size={20}
                    borderless
                    onPress={() => markTodoComplete(props.itemId)}
                />
            ) : null}
        </View>
    )
}

const TodoCard = ({ todo, listId }: { todo: TodoProps; listId: string }) => {
    const { setState } = useTodoStore()
    return (
        <Card
            onPress={() => {
                setState({ clickedTodo: todo })
            }}
            style={styles.container}
            elevation={0}
        >
            <Card.Title
                title={todo.title}
                subtitle={todo.description}
                subtitleNumberOfLines={1}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
                left={(params) => (
                    <LeftContent
                        {...params}
                        title={todo.title}
                        completed={todo.completed}
                    />
                )}
                right={(params) => (
                    // If the todo is completed, don't show the delete or mark as completed buttons
                    <RightContent
                        {...params}
                        listId={listId}
                        itemId={todo.id}
                        completed={todo.completed}
                    />
                )}
            />
        </Card>
    )
}

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
        overflow: 'visible',
    },
})

export default TodoCard
