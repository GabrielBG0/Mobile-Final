import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import BaseScreen from './Components/BaseScreen';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthProvider';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';




export default function Routes(props) {
  const { user, login } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('user').then(userString => {
      if (userString) {
        login('teste', 'teste')
      }
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <BaseScreen>
        <ActivityIndicator size='large' />
      </BaseScreen>
    )
  }

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  )
}