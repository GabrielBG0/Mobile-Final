import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';

import Home from './Screens/Home';
import Profile from './Screens/Profile';
import Colors from './Constants/Colors';

const Tabs = createBottomTabNavigator()

export default function HomeStack(props) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'information-circle' : 'information-circle-outline'
          } else if (route.name === 'Labs') {
            iconName = focused ? 'flask' : 'flask-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline'
          }

          return <Ionicons name={iconName} size={30} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.icons,
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: Colors.tooBarBG
        }
      }}
      initialRouteName='Home' >
      <Tabs.Screen name='Profile' component={Profile} />
      <Tabs.Screen name='Home' component={Home} />
      <Tabs.Screen name='Labs' component={Home} />
    </Tabs.Navigator >
  )
}



const styles = StyleSheet.create({
  content: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});