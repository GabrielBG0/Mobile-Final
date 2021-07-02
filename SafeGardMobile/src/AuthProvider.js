import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Api from './Services/Api'

export const AuthContext = React.createContext({})

export function AunthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  return <AuthContext.Provider value={{
    user,
    login: async (email, password) => {

      const response = await Api.post('/user/login', { email, password })
      if (response.status === 200) {
        const id = response.data.id
        setUser(id)
        setLoggedIn(true)
        AsyncStorage.setItem('user', String(user))
        AsyncStorage.setItem('logged', String(loggedIn))
      } else {
        alert('Não foi possivel evetuar login')
      }

    },
    logout: () => {
      setUser(null)
      setLoggedIn(true)
      AsyncStorage.removeItem('user')
      AsyncStorage.removeItem('logged')
    },
    returning: async (logedUser) => {
      setUser(logedUser)
      AsyncStorage.setItem('user', String(user))
    }
  }}>{children}</AuthContext.Provider>
}
/*

*/