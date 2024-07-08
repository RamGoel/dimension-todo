import { TodoProps } from '@/utils/types/Todo'
import * as React from 'react'
import { View } from 'react-native'
import { Avatar, Card, IconButton, MD3Colors } from 'react-native-paper'

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="pen" />
const RightContent = (props: any) => (
    <IconButton
        icon="delete"
        iconColor={MD3Colors.error50}
        size={20}
        borderless
        onPress={() => console.log('Pressed')}
    />
)

const TodoCard = (props: TodoProps) => (
    <Card>
        <View className="flex bg-red-200">
            <Card.Title
                title={props.title}
                subtitle={props.description}
                left={LeftContent}
            />
        </View>

        <Card.Actions>
            <IconButton
                icon="check"
                iconColor={MD3Colors.error50}
                size={20}
                borderless
                onPress={() => console.log('Pressed')}
            />
        </Card.Actions>
    </Card>
)

export default TodoCard
