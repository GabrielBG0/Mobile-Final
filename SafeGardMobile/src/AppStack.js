import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeStack from './HomeStack'
import QRCode from './Screens/QRCode'

const Stack = createStackNavigator()

export default function AppStack(props) {
  return (
    <Stack.Navigator initialRouteName='Info' screenOptions={{ header: () => null }}>
      <Stack.Screen name='Info' component={HomeStack} />
      <Stack.Screen name='QRCode' component={QRCode} />
    </Stack.Navigator>)
}