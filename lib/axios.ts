import axios from 'axios'
import Constants from 'expo-constants'

const { manifest2 } = Constants

const uri = `http://${manifest2?.extra?.expoGo?.debuggerHost.split(':').shift()}:4000` //this line will generate the your machine ip automatically

export const axiosRouter = axios.create({
    baseURL: uri,
})
