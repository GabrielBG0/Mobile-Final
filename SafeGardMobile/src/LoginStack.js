import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LogIn from './Screens/LogIn'

const Stack = createStackNavigator()

export default function LoginStack(props) {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name='LogIn' component={LogIn} />
    </Stack.Navigator>)
}