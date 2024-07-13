import Constants from 'expo-constants'

export const extractErrorMessage = (err: any) => {
    return (
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Error'
    )
}

export const getDeviceHost = () => {
    const { manifest2 } = Constants
    return `http://${manifest2?.extra?.expoGo?.debuggerHost.split(':').shift()}:3000`
}
