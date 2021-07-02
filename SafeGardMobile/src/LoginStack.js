import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LogIn from './Screens/LogIn'
import Welcome from './Screens/Welcome'
import Register from './Screens/Register'

const Stack = createStackNavigator()

export default function LoginStack(props) {
  return (
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{ header: () => null }}>
      <Stack.Screen name='LogIn' component={LogIn} />
      <Stack.Screen name='Welcome' component={Welcome} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>)
}