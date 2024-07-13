import { TodoProps } from '@/types/Todo'
import { getDeviceHost } from '@/utils/api'
import { createReplicacheExpoSQLiteExperimentalCreateKVStore } from '@react-native-replicache/react-native-expo-sqlite'
import { useEffect, useMemo } from 'react'
import { ToastAndroid } from 'react-native'
import EventSource from 'react-native-sse'
import { Replicache } from 'replicache'
import { v4 as uuidv4 } from 'uuid'

export async function listTodos(tx: any) {
    return await tx.scan().values().toArray()
}
export function useReplicache(listID: string) {
    const licenseKey = process.env.REPLICACHE_KEY
    if (!licenseKey) {
        throw new Error('Missing VITE_REPLICACHE_LICENSE_KEY')
    }

    const r = useMemo(() => {
        let rep = new Replicache({
            licenseKey,
            pushURL: `${getDeviceHost()}/api/replicache/push?spaceID=${listID}`,
            pullURL: `${getDeviceHost()}/api/replicache/pull?spaceID=${listID}`,
            experimentalCreateKVStore:
                createReplicacheExpoSQLiteExperimentalCreateKVStore,
            name: listID,
            mutators: {
                updateTodo: async (tx: any, update: any): Promise<void> => {
                    const prev = await tx.get(update.id as any)
                    const next: TodoProps = { ...prev, ...update }
                    await tx.put(next.id, next)
                },
                deleteTodo: async (tx: any, id: string): Promise<void> => {
                    await tx.del(id)
                    ToastAndroid.show('Deleted', ToastAndroid.SHORT)
                },
                createTodo: async (
                    tx: any,
                    {
                        title,
                        description,
                    }: {
                        title: string
                        description: string
                    }
                ): Promise<void> => {
                    let newTodoId = uuidv4()

                    let values = {
                        title,
                        description,
                        completed: false,
                        created: Date.now(),
                        id: newTodoId,
                    }

                    console.log(values)
                    await tx.put(newTodoId, values)
                },
            },
        })

        return rep
    }, [listID])

    useEffect(() => {
        const ev = new EventSource(
            `${getDeviceHost()}/api/replicache/poke?spaceID=${listID}`,
            {
                headers: {
                    withCredentials: false,
                },
            }
        )

        ev.addEventListener('message', async (evt: any) => {
            if (evt.type !== 'message') return
            if (evt.data === 'poke') {
                await r.pull()
            }
        })

        return () => {
            ev.close()
        }
    }, [listID])

    return r
}
