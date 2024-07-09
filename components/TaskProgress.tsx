import { useTodoStore } from '@/hooks/useTodos'
import { borderRadius, COLORS } from '@/utils/styles'
import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Text } from 'react-native-paper'

const TaskProgress = () => {
    const { todos } = useTodoStore()
    let completedTasksCount = todos.length
        ? todos.filter((todo) => todo.completed).length
        : 0
    let percentage = (completedTasksCount / todos.length) * 100
    return (
        <View style={styles.container}>
            <View>
                <Text variant="titleLarge" style={styles.title}>
                    Task Progress
                </Text>
                <Text variant="titleMedium" style={styles.subtitle}>
                    {completedTasksCount}/{todos.length} task done
                </Text>

                <View style={styles.badge}>
                    <Text variant="titleSmall" style={styles.badgeText}>
                        {moment().format('MMMM DD')}
                    </Text>
                </View>
            </View>
            <CircularProgress
                value={percentage}
                radius={50}
                activeStrokeColor={COLORS.quaternary}
                duration={500}
                valueSuffix="%"
                maxValue={100}
            />
        </View>
    )
}

export default TaskProgress

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        height: 150,
        borderRadius: borderRadius,
        padding: 20,
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    subtitle: {
        color: COLORS.whiteLight,
    },
    badge: {
        backgroundColor: COLORS.quaternary,
        height: 30,
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        marginTop: 10,
    },
    badgeText: {
        color: COLORS.white,
    },
})
