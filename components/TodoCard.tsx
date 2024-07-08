import { TodoProps } from '@/utils/types/Todo'
import { AntDesign } from '@expo/vector-icons'
import * as React from 'react'
import { View } from 'react-native'
import { Avatar, Card, IconButton, MD3Colors } from 'react-native-paper'

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="pen" />
const RightContent = (props: any) => (
    <View
        style={{
            width: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        <AntDesign
            name="delete"
            iconColor={MD3Colors.error50}
            size={20}
            borderless
            onPress={() => console.log('Pressed')}
        />
        <IconButton
            icon="check"
            iconColor={MD3Colors.error50}
            size={20}
            borderless
            onPress={() => console.log('Pressed')}
        />
    </View>
)

const TodoCard = (props: TodoProps) => (
    <Card>
        <View>
            <Card.Title
                title={props.title}
                subtitle={props.description}
                left={LeftContent}
                right={RightContent}
            />
        </View>
    </Card>
)

export default TodoCard
