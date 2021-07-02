import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import BaseScreen from './Components/BaseScreen';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthProvider';
import LoginStack from './LoginStack';
import AppStack from './AppStack';




export default function Routes(props) {
  const { user, returning } = useContext(AuthContext)
  const [startScreen, setStartScreen] = useState('Welcome')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('user').then(userString => {
      if (userString && userString !== 'null') {
        returning(parseInt(userString))
        AsyncStorage.getItem('logged').then(logged => {
          if (logged === 'true') {
            setStartScreen('LogIn')
          }
        })
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
      {user ? <AppStack /> : <LoginStack ss={startScreen} />}
    </NavigationContainer>
  )
}