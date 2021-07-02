import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Api from './Services/Api'

export const AuthContext = React.createContext({})

export function AunthProvider({ children }) {
  const [user, setUser] = useState(null)
  return <AuthContext.Provider value={{
    user,
    login: async (email, password) => {
      try {
        const response = await Api.post('/user/login', { email, password })
        const id = response.data.id
        setUser(id)
        AsyncStorage.setItem('user', String(user))
      } catch (e) {

      }
    },
    logout: () => {
      setUser(null)
      AsyncStorage.removeItem('user')
    }
  }}>{children}</AuthContext.Provider>
}
/*

*/