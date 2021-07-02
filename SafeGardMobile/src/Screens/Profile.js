import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import Api from '../Services/Api';
import BaseScreen from '../Components/BaseScreen';
import StatusBarTheme from '../Components/StatusBarTheme';
import Header from '../Components/Header'
import { AuthContext } from '../AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Constants/Colors';



export default function Profile(props) {
  const [userInfo, setUserInfo] = useState([])
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const response = await Api.get('/user/' + user)
      setUserInfo(response.data)
    })()
  }, [])
  return (
    <BaseScreen >
      <StatusBarTheme />
      <Header />
      <View style={styles.content}>
        <Text>{userInfo.name}</Text>
        <Text>{userInfo.email}</Text>
        <Text>{userInfo.adress}</Text>
        <Ionicons name={userInfo.infected == 0 ? 'checkmark-sharp' : 'alert-sharp'} size={30} color={userInfo.infected == 0 ? Colors.safe : Colors.danger} />
        <Button title='logout' onPress={() => { logout() }} ></Button>
      </View>
    </BaseScreen>
  )
}



const styles = StyleSheet.create({
  content: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});