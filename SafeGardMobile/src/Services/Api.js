import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://192.168.15.6:3333/'
})

export default Api